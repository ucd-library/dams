const {dataModels} = require('@ucd-lib/fin-service-utils');
const schema = require('./schema.json');
const {FinEsDataModel} = dataModels;

class CollectionsModel extends FinEsDataModel {

  constructor() {
    super('collection');

    // we lookup item counts for a collection by querying the item index
    this.itemAlias = 'item-read';

    this.schema = schema;
    this.transformService = 'es-collection-transform';
  }

  is(id, types, workflows) {
    if( id.match(/^\/collection\//) ) return true;
    return false;
  }

  /**
   * @method get
   * @description override get to add itemCount to collection
   * 
   * @param {*} id 
   * @param {*} opts 
   * @param {*} index 
   * @returns 
   */
  async get(id, opts={}, index) {
    let result = await super.get(id, opts={}, index);
    if( result ) await this.getItemCount(result);
    return result;
  }

  /**
   * @method search
   * @description override search to add itemCount to collection
   * 
   * @param {*} searchDocument 
   * @param {*} options 
   * @param {*} index 
   */
  async search(searchDocument, options={debug:false}, index) {
    let response = await super.search(searchDocument, options, index);
    for( let result of response.results ) {
      await this.getItemCount(result);
      console.log(result);
    }
    return response;
  }

  /**
   * @method getItemCount
   * @description set the itemCount property on a collections root node
   * 
   * @param {Object} collection collection graph
   * 
   * @returns {Promise}
   */
  async getItemCount(collection) {
    let result = await this.client.count({
      index : this.itemAlias,
      body: {
        query: {
          bool : {
            must : [
              {term: {'@graph.isPartOf.@id': collection['@id']}}
            ]
          }
        }
      }
    });

    let graph = this.utils.singleNode(collection['@id'], collection['@graph']);
    if( graph.length ) {
      graph[0].itemCount = result.count;
    }
  }
}

module.exports = new CollectionsModel();