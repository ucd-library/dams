import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-bookreader-navbar.tpl.js";
import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';

import '@ucd-lib/theme-elements/ucdlib/ucdlib-icons/ucdlib-icons';

import './ucdlib-bookreader-slider.js';

export default class UcdlibBookreaderNavbar extends Mixin(LitElement)
.with(LitCorkUtils) {

  static get properties() {
    return {
      selectedPage : { type: Number },
      numPages : { type: Number },
      fullscreen : { type: Boolean },
      singlePageView : { type: Boolean },
      selectedResult : { type: Number },
      searchResults : { type: Array },
      searchResultsCount : { type: Number },
      searching : { type: Boolean }
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this._reset();

    this._injectModel('BookReaderModel');
  }

  _onBookreaderStateUpdate(e) {
    this.selectedPage = e.selectedPage || 0;
    this.numPages = e.bookViewData?.pages?.length || 0;
    this.singlePageView = e.selectedView === 'double' ? false : true;
    this.selectedResult = (e.selectedSearchResult || 0) + 1;
    this.searching = e.searchActive;

    this.searchResults = [];
    if( e.searchResults?.state === 'loaded' ) {
      let searchResults = e.searchResults.payload || {};
      let results = [];
      for( let page in searchResults ) {
        results.push(...searchResults[page]);
      }
      this.searchResults = results.sort((a,b) => parseInt(a.page || 0) - parseInt(b.page || 0));
    }
    this.searchResultsCount = this.searchResults.length;

    requestAnimationFrame(() => {
      let slider = this.shadowRoot.querySelector('ucdlib-bookreader-slider');
      if( slider ) slider._onResize();
    });
  }

  _reset() {
    this.selectedPage = 0;
    this.numPages = 0;
    this.fullscreen = false;
    this.singlePageView = false;
    this.selectedResult = 0;
    this.searchResults = [];
    this.searchResultsCount = 0;
    this.searching = false;
  }

  _prevPage(e) {
    let pageIncrement = this.singlePageView ? 1 : 2;
    if( this.selectedPage === 1 ) pageIncrement = 1;
    if( pageIncrement === 2 && this.selectedPage % 2 === 0 ) pageIncrement = 1; // if viewing odd page (0-index) in 2page mode, should only move a single page back

    if( this.selectedPage > 0 ) {
      this.BookReaderModel.setPage(this.selectedPage - pageIncrement);
    }
  }

  _nextPage(e) {
    let pageIncrement = this.singlePageView ? 1 : 2;
    if( this.selectedPage === 0 ) pageIncrement = 1;
    if( pageIncrement === 2 && this.selectedPage % 2 === 0 ) pageIncrement = 1; // if viewing odd page (0-index) in 2page mode, should only move a single page forward

    if( (this.selectedPage+pageIncrement) < this.numPages ) {
      this.BookReaderModel.setPage(this.selectedPage + pageIncrement);
    }
  }

  _prevSearchResult(e) {
    if( this.selectedResult > 1 ) {
      this.BookReaderModel.setPage((this.searchResults[this.selectedResult - 2]?.page || 1) - 1)
      this.BookReaderModel.setSelectedSearchResult(this.selectedResult - 2);
    }
  }

  _nextSearchResult(e) {
    if( this.selectedResult < this.searchResultsCount ) {
      this.BookReaderModel.setPage((this.searchResults[this.selectedResult]?.page || 1) - 1)
      this.BookReaderModel.setSelectedSearchResult(this.selectedResult);
    }
  }

  updateSearchResults(searchResults=[]) {
    let slider = this.shadowRoot.querySelector('ucdlib-bookreader-slider');
    if( slider ) {
      slider.updateSearchResults(searchResults);
    }
  }

  _onSearchClicked(e) {
    let searching = this.BookReaderModel.store?.data?.state?.searchActive || false;
    this.BookReaderModel.setSearchActive(!searching);
    this.searching = !this.searching;
  }
  

  _onToggleBookView(e) {    
    this.BookReaderModel.setView(this.singlePageView ? 'double' : 'single');
    this.singlePageView = !this.singlePageView;
  }

  _onZoomInClicked(e) {
    this.BookReaderModel.zoomIn();
  }

  _onZoomOutClicked(e) {
    this.BookReaderModel.zoomOut();
  }

  _onCloseClicked(e) {
    this.BookReaderModel.setFullscreen(false);
    this.fullscreen = false;
  }
  
}

customElements.define('ucdlib-bookreader-navbar', UcdlibBookreaderNavbar);