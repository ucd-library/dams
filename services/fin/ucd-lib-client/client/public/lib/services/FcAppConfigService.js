const {BaseService} = require('@ucd-lib/cork-app-utils');
const config = require('../config');
const FcAppConfigStore = require('../stores/FcAppConfigStore');

class FcAppConfigService extends BaseService {

  constructor() {
    super();
    this.store = FcAppConfigStore;

    this.baseUrl = '/fcrepo/rest/application/ucd-lib-client';
  }

  getCollectionAppData(id) {
    return this.request({
      url : `${this.baseUrl}${id}`,
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

  getItemAppData(id) {
    return this.request({
      url : `${this.baseUrl}${id}`,
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

  async saveCollectionDisplayData(id, displayData, featuredImage) {    
    if( featuredImage ) {
      await fetch(`${this.baseUrl}${id}/featuredImage.jpg`, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'image/jpg',
        },
        body: featuredImage,
        duplex: 'half'
      }); 
    }
    
    return this.request({
      url : `${this.baseUrl}${id}`,
      fetchOptions : {
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/ld+json'
        },
        body : JSON.stringify(displayData)
      },
      checkCached : () => null,
      onLoading : null,
      onLoad : null,
      onError : null
    });
  }

  getFeaturedCollectionAppData() {
    return this.request({
      url : `${this.baseUrl}/featured-collections/config.json`,
      checkCached : () => null,
      onLoading : null,
      onLoad : null,
      onError : null
    });
  }

  async saveFeaturedCollectionDisplayData(displayData) {
    return this.request({
      url : `${this.baseUrl}/featured-collections/config.json`,
      fetchOptions : {
        method : 'PUT',
        headers : {
          'Accept' : 'application/json',
          // 'Prefer' : 'handling=lenient',
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(displayData)
      },
      checkCached : () => null,
      onLoading : null,
      onLoad : null,
      onError : null
    });
  }

  async saveItemDisplayData(id, displayData) {
    debugger;
    return this.request({
      url : `${this.baseUrl}${id}`,
      fetchOptions : {
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/ld+json'
        },
        body : JSON.stringify(displayData)
      },
      checkCached : () => null,
      onLoading : null,
      onLoad : null,
      onError : null
    });
  }

}

module.exports = new FcAppConfigService();