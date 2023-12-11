const {BaseService} = require('@ucd-lib/cork-app-utils');
const CollectionStore = require('../stores/CollectionStore');
const config = require('../config');
const RecordGraph = require('../utils/RecordGraph.js');

class CollectionService extends BaseService {

  constructor() {
    super();
    this.store = CollectionStore;

    this.baseUrl = '/api/collection';
  }

  get(id) {
    return this.request({
      url : `${this.baseUrl}${id.replace('/collection', '')}`,
      checkCached : () => this.store.getCollection(id),
      onLoading : request => this.store.setCollectionLoading(id, request),
      onLoad : result => this.store.setCollectionLoaded(id, new RecordGraph(result.body)),
      onError : e => this.store.setCollectionError(id, e)
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

  /**
   * @method searchCollection
   * @description Search the catalogs
   * 
   * @param {Object} searchDocument
   * 
   * @returns {Promise}
   */
  async search(searchDocument = {}, opts={}) {
    if( !opts.compact ) opts.compact = true;

    searchDocument.textFields = config.elasticSearch.textFields.collection;
    searchDocument.limit = 1000;

    return this.request({
      url : this.baseUrl,
      qs : opts,
      json : true,
      fetchOptions : {
        method : 'POST',
        body : searchDocument
      },
      onLoading : promise => this.store.setSearchLoading(searchDocument, promise),
      onLoad : result => {
        if( result.body.results ) {
          result.body.results = result.body.results.map(record => new RecordGraph(record));
        }
        this.store.setSearchLoaded(searchDocument, result.body)
      },
      onError : e => this.store.setSearchError(searchDocument, e)
    });
  }

  /**
   * @method getCollectionEdits
   * @description get all item edits for a collection
   * 
   * @param {String} id collection id
   */
  async getCollectionEdits(id) {
    return this.request({
      url : `${this.baseUrl}/edits${id}`,
      checkCached : () => null,
      onLoading : null,
      onLoad : null,
      onError : null
    });

  }

}

module.exports = new CollectionService();