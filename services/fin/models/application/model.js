const {dataModels} = require('@ucd-lib/fin-service-utils');
const schema = require('./schema.json');
const {FinEsDataModel} = dataModels;

class ApplicationsModel extends FinEsDataModel {

  constructor() {
    super('application');
    this.schema = schema;

    this.REMOVE_TYPES = ['http://digital.ucdavis.edu/schema#FinIoGcsMetadata'];
  }

  is(id) {
    if( id.match(/^\/application\//) ) return true;
    return false;
  }

  update(jsonld) {
    delete jsonld['@context'];

    jsonld['@graph'] = jsonld['@graph']
      .filter(node => {
        let types = node['@type'] || [];
        if( !Array.isArray(types) ) {
          types = [types];
        }

        for( let type of types ) {
          if( this.REMOVE_TYPES.includes(type) ) {
            return false;
          }
        }
        return true;
      })

    jsonld['@graph'].forEach(node => {
      node['@id'] = node['@id'].replace(/^.*\/fcrepo\/rest/, '');
    });

    jsonld['@id'] = jsonld['@id'].replace(/\/fcr:metadata$/, '');

    return super.update(jsonld);
  }

}

module.exports = new ApplicationsModel();