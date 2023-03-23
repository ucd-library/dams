const {dataModels} = require('@ucd-lib/fin-service-utils');
const schema = require('./schema.json');
const {FinEsDataModel} = dataModels;

class ApplicationsModel extends FinEsDataModel {

  constructor() {
    super('application');
    this.schema = schema;
  }

  is(id) {
    if( id.match(/^\/application\//) ) return true;
    return false;
  }


}

module.exports = new ApplicationsModel();