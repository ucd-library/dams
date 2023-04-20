const {BaseService} = require('@ucd-lib/cork-app-utils');
const config = require('../config');
const FcAppConfigStore = require('../stores/FcAppConfigStore');

class FcAppConfigService extends BaseService {

  constructor() {
    super();
    this.store = FcAppConfigStore;

    this.baseUrl = '/fcrepo/rest/application/ucd-lib-client';
  }

  // this can come from APP_CONFIG.fcAppConfig
  getCollectionAppData(id) {
    return this.request({
      url : `${this.baseUrl}${id}${id.replace('/collection','')}.jsonld.json`,
      fetchOptions : {
        headers : {
          'Accept' : 'application/ld+json',
          // 'Accept' : 'application/ld+json; profile="http://www.w3.org/ns/json-ld#flattened"',
          'Prefer' : 'return=representation; omit="http://fedora.info/definitions/fcrepo#ServerManaged"'
        },
      },
      checkCached : () => null,
      onLoading : null,
      onLoad : null,
      onError : null
    });
  }

  saveCollectionDisplayData(id, displayData) {
    return this.request({
      url : `${this.baseUrl}${id}${id.replace('/collection','')}.jsonld.json`,
      fetchOptions : {
        method : 'PUT',
        headers : {
          'Accept' : 'application/ld+json',
          'Prefer' : 'handling=lenient'
        },
        body : JSON.stringify(displayData)
      },
      checkCached : () => null,
      onLoading : null,
      onLoad : null,
      onError : null
    });
  }

  saveCollectionFeaturedImage(id, displayData) {
    // TODO post binary data
    return;
    return this.request({
      url : '/fcrepo/rest/application/ucd-lib-client'+id,
      fetchOptions : {
        method : 'PUT',
        headers : {
          'Accept' : 'application/ld+json',
          'Prefer' : 'handling=lenient'
        },
        body : '{' + JSON.stringify(displayData) + '}'
      },
      checkCached : () => null,
      onLoading : null,
      onLoad : null,
      onError : null
    });
  }

}

module.exports = new FcAppConfigService();