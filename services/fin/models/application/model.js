const {ElasticSearchModel} = require('@ucd-lib/fin-service-utils');

class ApplicationsModel extends ElasticSearchModel {

  constructor() {
    super('application');
  }

  is(id) {
    if( id.match(/^\/application\//) ) return true;
    return false;
  }


}

module.exports = new ApplicationsModel();