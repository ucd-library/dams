import { LitElement } from 'lit';

import render from "./app-search-breadcrumb.tpl.js";

import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';

class AppSearchBreadcrumb extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      collection : {type: Object},
      record : {type: Object},
      name : {type: String}
    }
  }

  constructor() {
    super();
    this.active = true;
    this.render = render.bind(this);
    
    this.collection = null;
    this.record = null;
    this.name = '';

    this.lastSearchForCollection = {};

    this._injectModel('AppStateModel', 'CollectionModel', 'RecordModel');
  }

  async ready() {
    super.ready();
    this.$.layout.style.width = (window.innerWidth-55)+'px';
    window.addEventListener('resize', () => {
      this.$.layout.style.width = (window.innerWidth-55)+'px';
    });

    this._onAppStateUpdate(await this.AppStateModel.get());
  }

  /**
   * @method _onAppStateUpdate
   * @description listen to app state update events and if this is a record, set record collection
   * as the current collection
   */
  async _onAppStateUpdate(e) {
    if( e.lastLocation && e.lastLocation.page === 'search' ) {
      this.lastSearch = e.lastLocation.pathname;
    } else {
      this.lastSearch = null;
    }

    this.record = null;
    this.collection =  null;

    if( e.location.page === 'search' && e.searchCollection ) {
      this.searchCollection = e.searchCollection;
      this.lastSearchForCollection[e.searchCollection['@id']] = e.location.pathname; 
    } else if( e.location.page === 'search' ) {
      this.searchCollection = null;
    }

    if( e.location.page === 'item' ) {
      this.currentRecordId = e.location.pathname;

      this.record = await this.RecordModel.get(this.currentRecordId);
      this.record = this.record.payload;

      if( this.record.collectionId ) {
        this.collection = await this.CollectionModel.get(this.record.collectionId);
      } else {
        this.collection = null;
      }
    }
  }

  /**
   * @method _onSearchClicked
   * @description bound to search anchor tag click event.  nav to search
   */
  _onSearchClicked(e) {
    if( e.type === 'keyup' && e.which !== 13 ) return;
    this.AppStateModel.setLocation(this.lastSearch || '/search');
  }

  /**
   * @method _onCollectionClicked
   * @description bound to collection anchor tag click event.  start a collection query
   */
  _onCollectionClicked(e) {
    if( e.type === 'keyup' && e.which !== 13 ) return;

    let lastSearch = this.lastSearch || '/search';
    if( this.searchCollection && this.lastSearchForCollection[this.searchCollection['@id']] ) {
      lastSearch = this.lastSearchForCollection[this.searchCollection['@id']];
    } else if( this.collection && this.collection['@id'] ) {
      lastSearch = this.collection['@id'];
    }

    this.AppStateModel.setLocation(lastSearch);
  }

  /**
   * @method _onSelectedCollectionUpdate
   * @description CollectionInterface, fired when selected collection updates
   */
  // _onSelectedCollectionUpdate(e) {
  //   this.logger.info(e);
  //   if( !e ) {
  //     if( !this.record ) {
  //       this.collection = null;
  //     }
  //     return;
  //   }

  //   if( this.collection && this.collection['@id'] === e['@id'] ) return;
  //   this.collection = e;
  //   this.record = null;
  // }

}
customElements.define('app-search-breadcrumb', AppSearchBreadcrumb);