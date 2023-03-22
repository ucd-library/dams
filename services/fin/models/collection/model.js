const {dataModels} = require('@ucd-lib/fin-service-utils');
const schema = require('./schema.json');
const {FinEsDataModel} = dataModels;

class CollectionsModel extends FinEsDataModel {

  constructor() {
    super('collection');
    this.schema = schema;
    this.transformService = 'es-collection-transform';
  }

  is(id, types, workflows) {
    if( id.match(/^\/collection\//) ) return true;
    return false;
  }

  // get(id, opts={}) {
  //   return super.get(id, opts);
  // }

  // getItemCount(collection) {
  //   let ids = []; 
  //   let node = utils.singleNode(id, result['@graph'])
  //   collection['@graph'].map(item => item['@id']);
  // }
}

module.exports = new CollectionsModel();