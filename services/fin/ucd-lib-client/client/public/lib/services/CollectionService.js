const {BaseService} = require('@ucd-lib/cork-app-utils');
const CollectionStore = require('../stores/CollectionStore');
const config = require('../config');

class CollectionService extends BaseService {

  constructor() {
    super();
    this.store = CollectionStore;

    this.baseUrl = '/api/collection';
  }

  get(id) {
    return this.request({
      url : `${this.baseUrl}${id.replace('/collection', '')}?root=true`,
      checkCached : () => this.store.getCollection(id),
      onLoading : request => this.store.setCollectionLoading(request),
      onLoad : result => this.store.setCollectionLoaded(result.body),
      onError : e => this.store.setCollectionError(e)
    });
  }

  getAdminData(id) {
    return this.request({
      url : `${this.baseUrl}${id.replace('/collection', '')}?admin=true`,
      checkCached : () => null,
      onLoading : null,
      onLoad : null,
      onError : null
    });
  }

  getDisplayData(id) {
    return this.request({
      url : '/fcrepo/rest/application/ucd-lib-client'+id,
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

  saveDisplayData(id, displayData) {
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

  async overview() {
    return this.request({
      url : `${this.baseUrl}/all`,
      checkCached : () => this.store.data.overview,
      onLoading : request => this.store.setCollectionOverviewLoading(request),
      onLoad : result => this.store.setCollectionOverviewLoaded(result.body),
      onError : e => this.store.setCollectionOverviewError(e)
    });
  }

  /**
   * @method searchCollection
   * @description Search the catalogs
   * 
   * @param {Object} searchDocument
   * 
   * @returns {Promise}
   */
  async search(searchDocument = {}) {
    searchDocument.textFields = config.elasticSearch.textFields.collection;
    return this.request({
      url : this.baseUrl+'?debug=true',
      fetchOptions : {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(searchDocument)
      },
      onLoading : promise => this.store.setSearchLoading(searchDocument, promise),
      onLoad : result => this.store.setSearchLoaded(searchDocument, result.body),
      onError : e => this.store.setSearchError(searchDocument, e)
    });
  }

}

module.exports = new CollectionService();