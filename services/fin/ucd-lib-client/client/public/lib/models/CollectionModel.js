const {BaseModel} = require('@ucd-lib/cork-app-utils');
const CollectionStore = require('../stores/CollectionStore');
const CollectionService = require('../services/CollectionService');
// it's ok to import other stores & services, just not models
const RecordStore = require('../stores/RecordStore');
const AppStateModel = require('./AppStateModel');

const {getLogger} = require('@ucd-lib/cork-app-utils');

class CollectionModel extends BaseModel {
  
    constructor() {
      super();
      this.store = CollectionStore;
      this.service = CollectionService;

      // this.logger = getLogger('CollectionModel');

      // the selected collection functionality is just a shortcut for listening
      // to es filters and seeing if a collection is being filtered on. This is
      // where we wire up the event listener for es events.
      this.EventBus.on(
        RecordStore.events.RECORD_SEARCH_UPDATE, 
        this._onSearchDocumentUpdate.bind(this)
      );

      // if we pre-loaded collections, set them
      if( APP_CONFIG.collections && APP_CONFIG.collections.length > 0 ) {
        this.store.setCollectionOverviewLoaded(APP_CONFIG.collections);
      }

      this.register('CollectionModel');
    }

    /**
     * @method overview
     * @description get all collections
     * 
     * @returns {Promise} resolves to array of collections
     */
    async overview() {
      return APP_CONFIG.collectionLabels;
    }

    /**
     * @method get
     * @description get a collection by id
     * 
     * @param {String} id id of the collection
     */
    // async get(id) {
    //   if( this.store.data.overview.state !== 'loaded' ) {
    //     await this.overview();
    //   }

    //   return this.store.data.byId[id];
    // }

    /**
     * @method get
     * @description load a record by id from elastic search
     * 
     * @param {String} id record id
     * 
     * @returns {Promise} resolves to record
     */
    async get(id) {
      let state = this.store.getCollection(id);

      if( state && state.request ) {
        await state.request;
      } else if( state && state.state === 'loaded' ) {
        if( state.id !== id ) {
          this.store.setCollectionLoaded(id, state.payload)
        }
      } else {
        await this.service.get(id);
      }

      return this.store.getCollection(id);
    }

    /**
     * @method getAdminData
     * @description load a records admin data by id
     * 
     * @param {String} id record id
     * 
     * @returns {Promise} resolves to record
     */
    async getAdminData(id) {
      return await this.service.getAdminData(id);
    }

    /**
     * @method getSelectedCollection
     * @description get the selected collection
     */
    getSelectedCollection() {
      return this.store.data.selected;
    }

    async search(searchDocument) {
      let resp = await this.service.search(searchDocument);
      if( resp.request ) await resp.request;
      console.log('search id', resp.id);
      return this.store.data.search.get(resp.id);
    }

    getRecentCollections(limit=3) {
      // TODO: change to 'uploadDate'
      let searchDocument = {
        limit,
        sort: [{
          '@graph.datePublished': {order : "desc", "unmapped_type": "date"} 
        }]
      };
      // searchDocument = {limit: 3};
      return this.service.search(searchDocument);
    }

    getHomepageDefaultCollections() {
      let searchDocument = {limit: 3};
      return this.service.search(searchDocument);
    }

    /**
     * @method _onSearchDocumentUpdate
     * @description listen to search document updates, if we have isPartOf filter,
     * then there is a selected collection
     */
    async _onSearchDocumentUpdate(e) {
      let selected = null;

      // if( e.searchDocument.filters['isPartOf.@id'] ) {
      //   selected = await this.get(e.searchDocument.filters['isPartOf.@id'].value[0]);
      // }
      // is there one and only one collection filter set
      if( e.searchDocument.filters['collectionId'] && e.searchDocument.filters['collectionId'].value.length === 1 ) {
        selected = await this.get(e.searchDocument.filters['collectionId'].value[0]);
      }

      // if( !e.searchDocument.filters['isPartOf.@id'] && e.searchDocument.text ) {
      if( !e.searchDocument.filters['collectionId'] && e.searchDocument.text ) {
        if( e.state === 'loading' ) {
          this.search({text: e.searchDocument.text});
        }
        this.emit('show-collection-search-results', true);
      } else {
        this.emit('show-collection-search-results', false);
      }

      AppStateModel.setSelectedCollection(selected);
      AppStateModel.set({searchCollection: selected});
    }

    /**
     * @method getFeaturedImage
     * @description get overridden featured image for collection if exists
     * 
     * @param {String} id collection id
     * @param {Object} fcAppConfigModel instance of FcAppConfigModel
     * 
     * @returns {String} image url
     */
    async getFeaturedImage(id, fcAppConfigModel) {
      let thumbnailUrl = '';
      let edits;

      if( !id || !fcAppConfigModel ) return;

      try {
        edits = await this.getCollectionEdits(id);
      } catch (error) {
        this.logger.warn('Error retrieving collection edits', error);
      }
      if (!Object.keys(edits.payload).length) return;
      edits = edits.payload;


      let collectionEdit = edits.edits;
      if( !collectionEdit ) return;

      let savedDisplayData = await fcAppConfigModel.getAdminData(id);
      if( !savedDisplayData ) return;

      savedDisplayData = savedDisplayData.body['@graph'];
      let graphRoot = savedDisplayData.filter(d => d['@id'] === '/application/ucd-lib-client' + id)[0];
      if( !graphRoot ) return;

      if( graphRoot['thumbnailUrl']?.split('/fcrepo/rest')?.[1] ) {
        thumbnailUrl = '/fcrepo/rest'+ graphRoot['thumbnailUrl'].split('/fcrepo/rest')[1];
      }

      return thumbnailUrl;
    }

    /**
     * @method getCollectionEdits
     * @description get all item edits for a collection
     * 
     * @param {String} id collection id
     */
    async getCollectionEdits(id) {
      let state = await this.service.getCollectionEdits(id);

      if( state && state.request ) {
        await state.request;
      }

      return this.store.data.edits[id];
    }
}

module.exports = new CollectionModel();