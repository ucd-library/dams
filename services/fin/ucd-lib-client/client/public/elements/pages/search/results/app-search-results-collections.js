import { LitElement } from 'lit';
import render from "./app-search-results-collections.tpl.js";

import "../../../components/cards/dams-collection-card";
import "@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon";
import '../../../utils/app-icons';

class AppSearchResultsCollections extends Mixin(LitElement)
      .with(LitCorkUtils) {

  static get properties() {
    return {
      results : { type : Array },
      showResults : { type : Boolean },
      currentPage : { type : Number },
      paginationTotal : { type : Number }
    }
  }

  constructor() {
    super();
    this.active = true;
    this.render = render.bind(this);

    this.results = [];
    this.showResults = false;
    this.currentPage = 1;
    this.paginationTotal = 1;

    this._injectModel('AppStateModel', 'SearchVcModel', 'CollectionModel');
  }

  willUpdate(e) {
    let pagination = this.shadowRoot.querySelector('ucd-theme-pagination');
    if( pagination ) {
      pagination.shadowRoot.querySelector('.pager__item--previous > a').style.backgroundColor = '';
      pagination.shadowRoot.querySelector('.pager__item--next > a').style.backgroundColor = '';
    }
  }

  /**
   * @method _onCollectionClicked
   * @description called when collection img on home page is clicked 
   * @param {Object} e
   */
  _onCollectionClicked(e) {
    e.preventDefault();
    if( e.type === 'keyup' && e.which !== 13 ) return;
    let id = e.currentTarget.getAttribute('data-id');
    this.AppStateModel.setLocation(id);
  }

  /**
   * @description _onSearchVcUpdate, fired when record search viewController updates
   * @param {*} e 
   */
   _onSearchVcUpdate(e) {
    if( e.state !== 'loaded' ) return;

    // if( !e.payload.matchedCollections.length ) {
    //   this.results = [];
    // } else {
    //   debugger;
    //   // TODO: transform data in view controller? data's pretty simple
    //   // this.results.push(e.payload.results[0]['node'][0]);
    //   // this.results[0]['title'] = this.results[0]['name'];
    //   this.results = e.payload.matchedCollections;
  
    // }
    // console.log('results: ', this.results);
    // this.showResults = this.results.length > 0;
  }

  _onCollectionSearchUpdate(e) {
    if( e.state !== 'loaded' ) return;
    if( !e.payload.results.length ) {
      this.results = [];
    } else {
      debugger;
      // TODO: transform data in view controller? data's pretty simple
      this.results.push(e.payload.results[0]['node'][0]);
      this.results[0]['title'] = this.results[0]['name'];
      // this.results = e.payload.matchedCollections;
  
    }
    console.log('results: ', this.results);
    this.showResults = this.results.length > 0;
  }

  // /**
  //  * @method _onCollectionClicked
  //  * @description bound to app-collection-card click event
  //  * 
  //  * @param {Object} e click|keyup event
  //  */
  // _onCollectionClicked(e) {
  //   if( e.type === 'keyup' && e.which !== 13 ) return;

  //   const location = e.target.dataset.collectionid;
  //   if( location ) {
  //     this.AppStateModel.setLocation(location);
  //   }
  // }

}

customElements.define('app-search-results-collections', AppSearchResultsCollections);