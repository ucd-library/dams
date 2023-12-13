const {dataModels, models, logger, pg} = require('@ucd-lib/fin-service-utils');
const schema = require('./schema.json');
const {FinEsDataModel} = dataModels;
const workflowUtils = require('../workflows.js');
const validate = require('../validate.js');

class CollectionsModel extends FinEsDataModel {

  constructor() {
    super('collection');

    // we lookup item counts for a collection by querying the item index
    // since this is used for a write op, we need to use the write alias
    this.itemAlias = 'item-write';
    this.collectionType = 'http://schema.org/Collection';

    this.schema = schema;
    this.transformService = 'es-collection-transform';
  }

  is(id, types, workflows) {
    if( id.match(/^\/collection\//) ) return true;
    return false;
  }

  /**
   * @method update
   * @description override update to add itemCount to collection
   * 
   * @param {Object} jsonld 
   * @param {String} index 
   * @returns {Promise}
   */
  async update(jsonld, index) {
    // find the collection node
    if( jsonld['@graph'] ) {
      let collection = jsonld['@graph'].find(node => {
        return node['@type'] && node['@type'].includes(this.collectionType);
      });

      if( collection ) {
        collection.itemCount = await this.getItemCount(collection['@id']);
      }
    }

    let result = await super.update(jsonld, index);

    if( !jsonld['@graph'] ) return result;

    let node = jsonld['@graph'][0];
    await workflowUtils.autoTriggerWorkflow(node);

    return result;
  }

  /**
   * @method get
   * @description override to add image node to collection graph
   * if image node exists in different graph.
   * 
   * @param {String} id 
   * @param {Object} opts 
   * @param {String} index
   *  
   * @returns {Promise}
   */
  async get(id, opts={}, index) {
    let collection = await super.get(id, opts, index);
    return this._appendImageNode(collection);    
  }

  async search(searchDocument = {}, opts={}, index) { 
    let result = await super.search(searchDocument, opts, index);
    if( result.results ) {
      for( let collection of result.results ) {
        await this._appendImageNode(collection);
      }
    }
    return result;
  }

  async _appendImageNode(collection) {
    if( !collection ) return collection;

    let id = collection['@id'];
    let root = collection['@graph'].find(node => node['@id'] === id);

    if( !root ) return collection;
    if( !root.image ) return collection;

    try {
      if( root.image['@id'].startsWith(id) ) {
        return collection;
      }

      let model = root.image['@id']
        .replace(/\//, '')
        .split('/')[0];
      model = (await models.get(model)).model;

      let imageGraph = await model.get(
        root.image['@id'], 
        {compact: true, singleNode: true}
      );
      
      if( !imageGraph ) return collection;

      collection['@graph'].push(imageGraph['@graph'][0]);
    } catch(e) {
      logger.error('Error appending image node to collection graph', e)
    }

    return collection;
  }

  /**
   * @method getItemCount
   * @description set the itemCount property on a collections root node
   * 
   * @param {Object} collection collection graph
   * 
   * @returns {Promise}
   */
  async getItemCount(id) {
    let result = await this.client.count({
      index : this.itemAlias,
      body: {
        query: {
          bool : {
            must : [
              {term: {'@graph.isPartOf.@id': id}}
            ]
          }
        }
      }
    });

    return result.count;
  }

  /**
   * 
   */
  async getEdits(id) {
    if( !id.match(/^info:fedora/) ) {
      if( !id.startsWith('/') ) id = '/'+id;
      id = 'info:fedora'+id;
    }
    let result = await pg.query(`select * from fin_cache.dams_links where collection = $1`, [id]);
    
    let resp = {
      collection : id,
      edits : null,
      itemOverrides : [],
    };
    
    resp.itemOverrides = result.rows.map(row => {
      delete row.collection;
      delete row.edit;
      return row;
    });
    
    result = await pg.query(`
      select 
        count(*) as count 
      from 
        fin_cache.quads_view qv
      where 
        qv.fedora_id = $1 and
        object != ''`, 
      [id.replace('info:fedora', 'info:fedora/application/ucd-lib-client')]
    );
    if( result.rows.length &&  result.rows[0].count > 0 ) {
      resp.edits = id.replace('info:fedora', 'info:fedora/application/ucd-lib-client');
    }

    return resp; 
  }

  /**
   * @method allLabels
   * @description get all labels for collections
   * 
   * @returns {Promise} resolves to map of id to label
   */
  async allLabels() {
    let result = await this.esSearch(
      {
        from : 0,
        size : 10000
      },
      {
        _source_excludes : false,
        _source_includes : ['@id', 'name']
      }   
    );

    let map = {};
    for( let hit of result.hits.hits ) {
      map[hit._source['@id']] = hit._source.name;
    }

    return map;
  }

  async validate(jsonld) {
    return validate.validateItem(jsonld);
  }
}

module.exports = new CollectionsModel();