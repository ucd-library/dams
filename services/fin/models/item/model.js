const {dataModels, ActiveMqClient, logger, gc} = require('@ucd-lib/fin-service-utils');
const schema = require('./schema.json');
const {FinEsDataModel} = dataModels;
const {ActiveMqStompClient} = ActiveMqClient;

const {workflowModel} = gc;

class ItemsModel extends FinEsDataModel {

  constructor() {
    super('item');
    this.schema = schema;
    this.transformService = 'es-item-transform';

    this.COMPRESS_TYPES = ['image/jpeg', 'image/png', 'image/tiff'];
    this.COMPRESSED_WORKFLOW = 'client-image-sizes';
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
    await super.update(jsonld, index);

    if( !jsonld['@graph'] ) return;

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

    // check if this graph is an image but doesn't have the clientMedia.compressed property.
    // if so, we need need to kick off the workflow for this image
    let node = jsonld['@graph'][0];
    await this.triggerCompressedImageWorkflow(node);
  }

  async triggerCompressedImageWorkflow(node) {
    return;
    if( node.clientMedia && node.clientMedia.compressed ) return;
    if( !node.fileFormat ) return;
    if( !this.COMPRESS_TYPES.includes(node.fileFormat) ) return;

    logger.info('Triggering compressed image workflow for '+node['@id']);
    await workflowModel.createWorkflow(this.COMPRESSED_WORKFLOW, node['@id']);
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

}

module.exports = new ItemsModel();