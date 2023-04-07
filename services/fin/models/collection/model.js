const {dataModels, RDF_URIS} = require('@ucd-lib/fin-service-utils');
const schema = require('./schema.json');
const {FinEsDataModel} = dataModels;

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

    return super.update(jsonld, index);
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
}

module.exports = new CollectionsModel();