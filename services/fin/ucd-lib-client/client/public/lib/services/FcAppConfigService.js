const {BaseService} = require('@ucd-lib/cork-app-utils');
const config = require('../config');
const FcAppConfigStore = require('../stores/FcAppConfigStore');

class FcAppConfigService extends BaseService {

  constructor() {
    super();
    this.store = FcAppConfigStore;

    this.baseFcrepoUrl = '/fcrepo/rest/application/ucd-lib-client';
    this.baseApiUrl = '/api/application/ucd-lib-client';
  }

  getDefaultImagesConfig() {
    return this.request({
      url : `${this.baseFcrepoUrl}/default-images/config.json`,
      checkCached : () => null,
      onLoading : null,
      onLoad : null,
      onError : null
    });
  }

  getApiApplication() {
    return this.request({
      url : `${this.baseApiUrl}`,
      checkCached : () => null,
      onLoading : null,
      onLoad : null,
      onError : null
    });
  }

  getAdminData(id) {
    return this.request({
      url : `${this.baseApiUrl}${id}`,
      checkCached : () => null,
      onLoading : null,
      onLoad : null,
      onError : null
    });
  }

  getCollectionAppData(id) {
    return this.request({
      url : `${this.baseFcrepoUrl}${id}`,
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
      url : `${this.baseFcrepoUrl}${id}`,
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

  async saveCollectionDisplayData(id, displayData) {    
    return this.request({
      url : `${this.baseFcrepoUrl}${id}`,
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

  async saveCollectionFeaturedImage(id, featuredImage) {
    if( featuredImage ) {
      await fetch(`${this.baseFcrepoUrl}${id}/featuredImage.jpg`, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'image/jpg',
        },
        body: featuredImage,
        duplex: 'half'
      }); 
    }
  }

  getFeaturedCollectionAppData() {
    return this.request({
      url : `${this.baseFcrepoUrl}/featured-collections/config.json`,
      checkCached : () => null,
      onLoading : null,
      onLoad : null,
      onError : null
    });
  }

  async saveFeaturedCollectionDisplayData(displayData) {
    return this.request({
      url : `${this.baseFcrepoUrl}/featured-collections/config.json`,
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
    return this.request({
      url : `${this.baseFcrepoUrl}${id}`,
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