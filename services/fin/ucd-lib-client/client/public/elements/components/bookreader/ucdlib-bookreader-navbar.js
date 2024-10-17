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
      singlePageView : { type: Boolean }
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this._injectModel('BookReaderModel');

    this._reset();
  }

  _onBookreaderStateUpdate(e) {
    this.selectedPage = e.selectedPage || 0;
    this.numPages = e.bookViewData?.pages?.length || 0;
    this.singlePageView = e.selectedView === 'double' ? false : true;

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
  }

  _prevPage(e) {
    let pageIncrement = this.singlePageView ? 1 : 2;
    if( this.selectedPage > 0 ) {
      this.BookReaderModel.setPage(this.selectedPage - pageIncrement);
    }
  }

  _nextPage(e) {
    let pageIncrement = this.singlePageView ? 1 : 2;
    if( (this.selectedPage+pageIncrement) < this.numPages ) {
      this.BookReaderModel.setPage(this.selectedPage + pageIncrement);
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
  }
  

  _onToggleBookView(e) {    
    this.BookReaderModel.setView(this.singlePageView ? 'double' : 'single');
    this.singlePageView = !this.singlePageView;
  }

  _onZoomInClicked(e) {
    console.log('TODO zoom in');
  }

  _onZoomOutClicked(e) {
    console.log('TODO zoom out');
  }

  _onCloseClicked(e) {
    console.log('close fullscreen, setting fullscreen to false');
    this.BookReaderModel.setFullscreen(false);
    this.fullscreen = false;
  }
  
}

customElements.define('ucdlib-bookreader-navbar', UcdlibBookreaderNavbar);