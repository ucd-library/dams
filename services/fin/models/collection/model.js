const {dataModels, models, logger, pg} = require('@ucd-lib/fin-service-utils');
const schema = require('./schema.json');
const {FinEsDataModel} = dataModels;
const workflowUtils = require('../workflows.js');
const validate = require('../validate.js');
const clientEdits = require('../client-edits');
const clientEditsModel = clientEdits.model;

class CollectionsModel extends FinEsDataModel {

  constructor() {
    super('collection');

    // we lookup item counts for a collection by querying the item index
    // since this is used for a write op, we need to use the write alias
    this.itemAlias = 'item-write';
    this.itemReadAlias = 'item-read';
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
    await this._appendClientEdits(collection);
    return this._appendImageNode(collection);    
  }

  async search(searchDocument = {}, opts={}, index) { 
    let result = await super.search(searchDocument, opts, index);
    if( result.results ) {
      for( let collection of result.results ) {
        await this._appendClientEdits(collection);
        await this._appendImageNode(collection);
      }
    }
    return result;
  }

  async _appendClientEdits(collection) {
    if( !collection ) return collection;
    let resp = await clientEditsModel.get(collection['@id']);

    if( resp?.collection ) {
      if( !resp.collection['@type'] ) resp.collection['@type'] = [];
      if( !Array.isArray(resp.collection['@type']) ) resp.collection['@type'] = [resp.collection['@type']];
      resp.collection['@type'].push('http://digital.ucdavis.edu/schema#ClientEdit');
      collection['@graph'].push(resp.collection);
    }
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
    // if( !id.match(/^info:fedora/) ) {
    if( !id.startsWith('/') ) id = '/'+id;
    //   if( !id.startsWith('/') ) id = '/'+id;
    //   id = 'info:fedora'+id;
    // }
    // let result = await pg.query(`select * from fin_cache.dams_links where collection = $1`, [id]);

    let result = await this.client.search({
      index : this.itemReadAlias,
      body: {
        _source: ["@graph.damsEdits", '@id'],
        query: {
          bool : {
            must : [
              {term: {"@graph.damsEdits.exists": true}},
              {term: {'@graph.isPartOf.@id': id}}
            ]
          }
        }
      }
    });

    let itemOverrides = (result?.hits?.hits || []).map(hit => {
      let item = hit._source['@graph'][0];
      let keys = Object.keys(item.damsEdits);
      keys.splice(keys.indexOf('exists'), 1);

      let props = {};
      for( let key of keys ) {
        props[key] = item.damsEdits[key].value;
      }

      return Object.assign(props, {item : hit._source['@id']});
    });

    let resp = {
      collection : id,
      edits : null,
      itemOverrides,
    };
    
    // resp.itemOverrides = (result.rows || []).map(row => {
    //   delete row.collection;
    //   delete row.edit;
    //   return row;
    // });
    
    result = await this.client.search({
      index : this.readIndexAlias,
      body: {
        _source: ["@graph.damsEdits"],
        query: {
          bool : {
            must : [
              {term: {'@graph.@id': id}}
            ]
          }
        }
      }
    });

    if( result.hits.hits.length ) {
      let collection = result.hits.hits[0]._source['@graph'];
      if( collection && collection.length && collection[0].damsEdits ) {
        let keys = Object.keys(collection[0].damsEdits);
        let props = {};
        for( let key of keys ) {
          props[key] = collection[0].damsEdits[key].value;
        }
        delete props.exists;
        resp.edits = props;
      }
    }

    // result = await pg.query(`
    //   select 
    //     count(*) as count 
    //   from 
    //     fin_cache.quads_view qv
    //   where
    //     qv.fedora_id = $1 and
    //     object != ''`, 
    //   [id.replace('info:fedora', 'info:fedora/application/ucd-lib-client')]
    // );

    // if( result.rows.length && result.rows[0].count > 0 ) {
    //   resp.edits = id.replace('info:fedora', 'info:fedora/application/ucd-lib-client');
    // }

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
      map[hit._source['@id']] = Array.isArray(hit._source.name) ? hit._source.name[0] : hit._source.name;
    }

    return map;
  }

  async validate(jsonld) {
    return validate.validateItem(jsonld);
  }
}

module.exports = new CollectionsModel();