const RecordGraph = require('../ucd-lib-client/client/public/lib/utils/RecordGraph');
const fetch = require('node-fetch');
const {config} = require('@ucd-lib/fin-service-utils');


class Validate {

  /**
   * @method validateItem
   * @description validate an data model item or collection
   * 
   * @param {Object} jsonld 
   * @returns {Object}
   */
  async validateItem(jsonld) {
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
      return result;
    }

    if( !graph.data['@graph'] ) {
      result.errors.push('No @graph found');
    } else if( !graph.root['@shortType'].includes('Collection') ) {
      // check that all nodes are crawlable from root
      let nodeCount = jsonld['@graph'].length;

      try {
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

          if( missing.length ) {
            result.warnings.push('Not all nodes are crawlable from root: '+missing.join(', '));
          }
        }
      } catch(e) { 
        result.errors.push('Error validating crawlable nodes: '+e.message+' '+e.stack);
      }
    }

    // check subjects
    if( !graph.root.subjects ) {
      result.warnings.push('No subjects found');
    } else {
      let found = false;

      if( !Array.isArray(graph.root.subjects) ) {
        graph.root.subjects = [graph.root.subjects];
      }

      for( let subject of graph.root.subjects ) {
        if( subject.name ) {
          found = true;
        } else {
          result.comments.push('Subject has no name: '+JSON.stringify(subject));
        }
      }
      if( !found ) {
        result.warnings.push('No subjects found with a name');
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

      let missingOriginal = false;
      if( !images.original ) {
        missingOriginal = true;
      } else if( images.original.missing === true ) {
        missingOriginal = true;
      }

      // if( missingOriginal ) {
      //   result.errors.push('Media has no original image: '+node['@id']);
      //   continue;
      // }

      if( !images.large || !images.medium || !images.small ) {
        if( missingOriginal ) {
          result.errors.push('Media group is missing sized image and has no original: '+node['@id']);
        } else {
          result.warnings.push('Media group is missing sized image: '+node['@id']);
        }
      }

      if( !images.ocr ) {
        result.warnings.push('Image is missing ocr file: '+node['@id']);
      }

      let pdf = node.clientMedia.pdf;
      if( !pdf && node.fileFormat && node.fileFormat.includes('pdf') ) {
        result.errors.push('No pdf client media found for: '+node['@id']);
      }
      if( pdf && pdf.manifest ) {
        let url = config.server.url+pdf.manifest;
        let hResp = await fetch(config.gateway.host+pdf.manifest, {method: 'HEAD'});
        if( hResp.status !== 200 ) {
          result.errors.push('Pdf client media manifest is not available; node='+node['@id']+' manifest='+url+' status='+hResp.status);
        }
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
        if( !child['@id'] ) continue;
        if( crawled.includes(child['@id']) ) continue;
        crawled.push(child['@id']);
        this._validateCrawlable(graph, child, crawled);
      }
    }

    return crawled;
  }

}

module.exports = new Validate();