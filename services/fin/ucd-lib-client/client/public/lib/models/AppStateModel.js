const {AppStateModel} = require('@ucd-lib/cork-app-state');
const AppStateStore = require('../stores/AppStateStore');
const config = require('../config');
const clone = require('clone');

class AppStateModelImpl extends AppStateModel {

  constructor() {
    super();
    this.store = AppStateStore;


    this.init(APP_CONFIG.appRoutes);

    this._sendGA();
  }

  set(update) {
    if( update.location ) {
      update.lastLocation = clone(this.store.data.location);

      // the lightbox element manages its own state
      // so if there is any app-state-update event after lightbox has opened,
      // that means the lightbox has been closed.
      if ( this.store.data.showLightbox ) {
        update.showLightbox = false;
      }

      // /collection/* is an alias for a base collection search
      // ^ this might change, since collection in v2 will be a placeholder page with a summary of the collection and links
      // to highlighted items in the collection, and citation copy link section

      let page = update.location.path ? update.location.path[0] : 'home';
      if( !page ) page = 'home'

      // if( page === 'collection' ) {
      //   if( update.location.path.length === 2 ) {
      //     page = 'search';
      //   } else {
      //     page = 'record';
      //   }
      // }

      update.location.page = page;
    }

    this._sendGA();

    // console.log('AppStateModel.set()', update);
    return super.set(update);
  }

  /**
   * @method _sendGA
   * @description send a google analytics event if pathname has changed
   */
  _sendGA() {
    if( !window.gtag ) return console.warn('No global gtag variable set for analytics events');
    if( this.lastGaLocation === window.location.pathname ) return;
    this.lastGaLocation = window.location.pathname;

    gtag('config', config.gaCode, {
      page_path: window.location.pathname
    });
  }

  setSelectedRecord(record) {
    this.store.setSelectedRecord(record);
  }

  getSelectedRecord() {
    return this.store.getSelectedRecord();
  }

  setSelectedCollection(collection) {
    this.store.setSelectedCollection(collection);
  }

  getSelectedCollection() {
    return this.store.getSelectedCollection();
  }

}

module.exports = new AppStateModelImpl();
