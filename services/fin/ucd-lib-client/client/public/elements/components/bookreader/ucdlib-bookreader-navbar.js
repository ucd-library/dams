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
      numPages : { type: Number }
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
  }

  _reset() {
    this.selectedPage = 0;
    this.numPages = 0;
  }

  _prevPage(e) {
    if( this.selectedPage > 0 ) {
      this.selectedPage--;
      this.BookReaderModel.setPage(this.selectedPage);
    }
  }

  _nextPage(e) {
    if( this.selectedPage < this.numPages ) {
      this.selectedPage++;
      this.BookReaderModel.setPage(this.selectedPage);
    }    
  }
  
}

customElements.define('ucdlib-bookreader-navbar', UcdlibBookreaderNavbar);