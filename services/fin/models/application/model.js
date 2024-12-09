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

  async update(jsonld, index) {
    if( !index ) index = this.writeIndexAlias;
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
    try {
      await this.client.delete({
        index,
        id : jsonld['@id']
      });
    } catch(e) {}

    // update edits count
    let reindex = [];
    for( let node of jsonld['@graph'] ) {
      if( !node.isPartOf ) continue;

      let isPartOf = node.isPartOf;
      if( !Array.isArray(isPartOf) ) {
        isPartOf = [isPartOf];
      }

      for( let part of isPartOf ) {
        if( part['@id'] && (part['@id'].match(/^\/collection\//) ||
            part['@id'].match(/^\/item\//)) ) {
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

    return super.update(jsonld);
  }

}

module.exports = new ApplicationsModel();