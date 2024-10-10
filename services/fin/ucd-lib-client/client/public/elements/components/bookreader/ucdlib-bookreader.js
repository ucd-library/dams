import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-bookreader.tpl.js";
import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';

import "./ucdlib-bookreader-page.js";
import "./ucdlib-bookreader-slider.js";
import "./ucdlib-bookreader-navbar.js";

export default class UcdlibBookreader extends Mixin(LitElement)
  .with(LitCorkUtils) {
  
  static get properties() {
    return {
      book : { type: String },
      bookViewData : { type: Object },
      page : { type: Number },
      view : { type: String },
      height : { type: Number },
      fullscreen : { type: Boolean }
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this._injectModel('BookReaderModel');
    this.bookViewData = {};
    this.debug = false;
    this.render = render.bind(this);
  }

  updated(props) {
    if( props.has('height') ) {
      this._updateHeight();
    }
  }

  _onBookreaderStateUpdate(e) {
    if( e.selectedBook !== this.book ) {
      this.book = e.selectedBook;
    }

    if( e.bookViewData ) {
      if( this.bookViewData?.id !== e.bookViewData.id ) {
        this.bookViewData = e.bookViewData;
        this._updateHeight();
      }
    }

    this.setPage(e.selectedPage);
    this.setView(e.selectedView);
  }

  _updateHeight() {
    this.style.height = this.height+'px';
    this.shadowRoot.querySelector('#single-page').style.height = this.height+'px';
    this.shadowRoot.querySelector('#double-page').style.height = this.height+'px';
    this._renderPageSizes();

    if( this.bookViewData?.pages ) {
      this.shadowRoot.querySelector('#single-page-scroll').style.height = this.height*this.bookViewData.pages.length+'px';
    }
  }

  _renderPageSizes() {
    if( !this.bookViewData?.pages ) return;
    if( !this.height ) return;

    let readerWidth = this.offsetWidth;
    let readerHeight = this.height;
    this.bookViewData.pages.forEach(page => {
      if( this.view === 'single' ) {
        this._renderPageSizeSingle(readerHeight, readerWidth, page)
      }
    });
  }

  _renderPageSizeSingle(readerHeight, readerWidth, page) {
    let width = page.width;
    let height = page.height;

    let isLandscape = (width/height > 1);

    let newHeight, newWidth, ratio, ratioDimension;

    if( isLandscape ) {
      ratioDimension = 'width';
      ratio = readerWidth / width;
      newWidth = readerWidth;     
      newHeight = height * ratio;

      if( newHeight > readerHeight ) {
        ratioDimension = 'height';
        ratio = readerHeight / height;
        newHeight = readerHeight;
        newWidth = width * ratio;
      }
    } else {
      ratioDimension = 'height';
      ratio = readerHeight / height;
      newHeight = readerHeight;
      newWidth = width * ratio;

      if( newWidth > readerWidth ) {
        ratioDimension = 'width';
        ratio = readerWidth / width;
        newWidth = readerWidth;
        newHeight = height * ratio;
      }
    }

    page.renderRatioDimension = ratioDimension;
    page.renderRatio = ratio;
    page.renderHeight = Math.floor(newHeight);
    page.renderWidth = Math.floor(newWidth);

    page.renderOffsetTop = readerHeight*page.index;
    page.renderOffsetLeft = 0;

    if( this.renderedRatioDimension === 'height' ) {
      page.renderOffsetTop += Math.floor((readerHeight - newHeight) / 2);
    } else {
      page.renderOffsetLeft += Math.floor((readerWidth - newWidth) / 2);
    }
  }

  setPage(page) {
    if( this.page === page ) return;
    this.page = page;

    if( this.view === 'single' ) {
      let scrollTop = this.shadowRoot.querySelector('#single-page').scrollTop;
      let buffer = Math.floor(this.height/4);
      let pageData = this.bookViewData.pages[page];

      // TODO: add buffer
      if( pageData.renderOffsetTop < scrollTop || 
          pageData.renderOffsetTop+pageData.renderHeight > scrollTop+this.height ) {
        this.shadowRoot.querySelector('#single-page').scrollTop = this.page * this.height;
      }
    }
  }

  setView(view) {
    if( this.view === view ) return;
    this.view = view;
    this._renderPageSizes();
  }

  _onScroll(e) {
    if( this.scrollTimeout ) {
      return;
    }
    
    this.scrollTimeout = setTimeout(() => {
      this.scrollTimeout = null;
      this._updatePageFromScroll();
    }, 200);
  }

  _updatePageFromScroll() {
    let scrollTop = this.shadowRoot.querySelector('#single-page').scrollTop;
    let page = Math.round(scrollTop / this.height);
  
    if( this.page === page ) return;
    this.BookReaderModel.setPage(page);
    this.logger.info('change page from scroll', {current: this.page, to: page});
  };

}

customElements.define('ucdlib-bookreader', UcdlibBookreader);