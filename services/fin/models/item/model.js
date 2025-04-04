const {dataModels, MessagingClients, config} = require('@ucd-lib/fin-service-utils');
const schema = require('./schema.json');
const {FinEsDataModel} = dataModels;
const {RabbitMqClient, MessageWrapper} = MessagingClients;
const workflowUtils = require('../workflows.js');
const validate = require('../validate.js');

class ItemsModel extends FinEsDataModel {

  constructor() {
    super('item');
    this.schema = schema;
    this.transformService = 'es-item-transform';
  }

  connect() {
    this.messaging = new RabbitMqClient('item');
  }

  is(id) {
    if( id.match(/^\/item\//) ) return true;
    return false;
  }

  search(searchDocument, options, index) {
    if( !searchDocument.sort ) {
      searchDocument.sort = [
        '_score',
        { 'name.raw' : 'asc' }
      ]
    }
    return super.search(searchDocument, options, index);
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

    if( !this.messaging ) {
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
      await this.messaging.sendMessage(MessageWrapper.createMessage(
        ['http://digital.ucdavis.edu/schema#Reindex'],
        {'@id': id}
      ));
    }

    let node = jsonld['@graph'][0];
    await workflowUtils.autoTriggerWorkflow(node);

    return result;
  }

  async getByArk(ark) {
    let searchDocument = {
      "filters":{
        "@graph.identifier.raw":{
            type:"keyword",
            op:"and",
            value:[ark]
        }
      },
      limit: 1
    }
    let resp = await this.search(searchDocument);
    return resp;
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

  async validate(jsonld) {
    return validate.validateItem(jsonld, config.gateway.host);
  }


  getDefaultIndexConfig(schema) {
    let config = super.getDefaultIndexConfig(schema);
    config.body.settings.analysis.char_filter = {
      "remove_special_chars": {
        "type": "pattern_replace",
        "pattern": "[^\\w\\s]",
        "replacement": ""
      }
    };
    config.body.settings.analysis.normalizer = {
      "lowercase_normalizer": {
        "type": "custom",
        "char_filter": [],
        "filter": ["lowercase"]
      }
    };
    config.body.settings.analysis.normalizer = {
      "lowercase_remove_punctuation_normalizer": {
        "type": "custom",
        "char_filter": ["remove_special_chars"],
        "filter": ["lowercase"]
      }
    };

    return config;
  }


}

module.exports = new ItemsModel();