const {dataModels, ActiveMqClient} = require('@ucd-lib/fin-service-utils');
const schema = require('./schema.json');
const {FinEsDataModel} = dataModels;
const {ActiveMqStompClient} = ActiveMqClient;
const workflowUtils = require('../workflows.js');
const RecordGraph = require('../../ucd-lib-client/client/public/lib/utils/RecordGraph');

class ItemsModel extends FinEsDataModel {

  constructor() {
    super('item');
    this.schema = schema;
    this.transformService = 'es-item-transform';
  }

  connect() {
    this.activemq = new ActiveMqStompClient('item');
    this.activemq.connect({listen: false});
  }

  is(id) {
    if( id.match(/^\/item\//) ) return true;
    return false;
  }

  /**
   * @method update
   * @description adding additional logic to update to send a message reindex messages to any collection
   * for this item so the itemCount is correct.
   * 
   * @param {*} jsonld 
   * @param {*} index 
   * @returns 
   */
  async update(jsonld, index) {
    let result = await super.update(jsonld, index);

    if( !jsonld['@graph'] ) return result;

    if( !this.activemq ) {
      await this.connect();
    }

    let reindex = [];
    for( let node of jsonld['@graph'] ) {
      if( !node.isPartOf ) continue;

      let isPartOf = node.isPartOf;
      if( !Array.isArray(isPartOf) ) {
        isPartOf = [isPartOf];
      }

      for( let part of isPartOf ) {
        if( part['@id'] && part['@id'].match(/^\/collection\//) ) {
          reindex.push(part['@id']);
        }
      }
    }

    for( let id of reindex ) {
      await this.activemq.sendMessage(
        {'@id' : id},
        {'edu.ucdavis.library.eventType' : 'Reindex'}
      );
    }

    let node = jsonld['@graph'][0];
    await workflowUtils.autoTriggerWorkflow(node);

    return result;
  }

  async getFiles(id, files=[]) {
    let searchDocument = {
      "filters":{
        "directParent":{
            type:"keyword",
            value:[id],
            "op":"or"
        }
      }
    }
    let resp = await this.search(searchDocument, {allRecords: true, noLimit: true});

    let types;
    for( let result of resp.results ) {
      types = result['@type'] || [];
      if( types.includes('http://fedora.info/definitions/v4/repository#Resource') ) {
        files.push({
          filename: result.filename, 
          path: result['@id'],
          fileFormat : result.fileFormat,
          fileSize : result.fileSize
        });
      } else if( types.includes('http://www.w3.org/ns/ldp#BasicContainer') ) {
        await this.getFiles(result['@id'], files);
      }
    }

    return files;
  }

  validate(jsonld) {
    if( !jsonld ) {
      throw new Error('Elastic search response is empty');
    }

    let result = {
      id : jsonld['@id'],
      errors : [],
      warnings : [],
      comments : []
    };

    let graph = new RecordGraph(jsonld);

    // graph checks
    if( !graph.root ) {
      result.errors.push('No root node found in graph');
    }
    if( !graph.data['@graph'] ) {
      result.errors.push('No @graph found');
    } else {
      // check that all nodes are crawlable from root
      let nodeCount = jsonld['@graph'].length;
      let crawled = this._validateCrawlable(graph, graph.root);
      if( crawled.length !== nodeCount ) {
        let missing = [];
        for( let node of jsonld['@graph'] ) {
          if( !crawled.includes(node['@id']) ) {
            // skip direct containers
            if( !node['@shortType'].includes('DirectContainer') && !node['@shortType'].includes('IndirectContainer') ) {
              missing.push(node['@id']);
            }
          }
        }

        result.warnings.push('Not all nodes are crawlable from root: '+missing.join(', '));
      }
    }

    // media checks
    if( graph.clientMedia.mediaGroups.length === 0 ) {
      result.errors.push('No media groups found');
    }

    // check that all media groups have images
    for( let node of graph.clientMedia.mediaGroups ) {
      if( !node.clientMedia ) {
        result.errors.push('Media group has no clientMedia: '+node['@id']);
        continue;
      }

      // check for a download
      if( !node.clientMedia.download ) {
        result.errors.push('Media group has no download: '+node['@id']);
      }

      if( !node.clientMedia.images ) {
        result.errors.push('Media group has no images: '+node['@id']);
        continue;
      }
      let images = node.clientMedia.images;

      if( !images.original ) {
        result.errors.push('Media group has no original image: '+node['@id']);
      } else if( images.original.missing === true ) {
        result.errors.push('Media group has no original image: '+node['@id']);
      }

      if( !images.large || !images.medium || !images.small ) {
        result.warnings.push('Media group is missing sized image: '+node['@id']);
      }
    }

    return result;
  }

  _validateCrawlable(graph, currentNode, crawled=[]) {
    if( !crawled.includes(currentNode['@id']) ) {
      crawled.push(currentNode['@id']);
    }
    let links = graph.getChildren(currentNode);

    for( let link in links ) {
      for( let child of links[link] ) {
        if( crawled.includes(child['@id']) ) continue;
        crawled.push(child['@id']);
        this._validateCrawlable(graph, child, crawled);
      }
    }

    return crawled;
  }

}

module.exports = new ItemsModel();