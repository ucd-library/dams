import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-bookreader-page.tpl.js";
import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';


export default class UcdlibBookreaderPage extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      debug : { type: Boolean },
      viewIndex : { type: Number , attribute : 'view-index' },
      currentPage : { type: Number, attribute : 'current-page' },
      bookData : { type: Object },
      pageData : { type: Object },
      ocrData : { type: Array}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.viewIndex = -9999;
    this.currentPage = -1;
    this.debug = false;
    this.pageData = {};
    this.ocrData = [];
    this._injectModel('BookReaderModel');
    this.render = render.bind(this);
  }

  firstUpdated() {
    this.imgEle = this.shadowRoot.querySelector('img');
  }

  updated(props) {
    if( props.has('currentPage') || props.has('bookData') ) {
      this._updatePageData();
    }

    if( props.has('debug') ) {
      this._debugUpdated();
    }
  }

  _debugUpdated() {
    if( this.debug ) {
      this.style.border = '1px solid red';
      this.style.color = 'red';
    } else {
      this.style.border = 'none';
      this.style.color = 'auto';
    }
  }

  _updatePageData() {
    console.log('update page data', this.currentPage, this.viewIndex, this.bookData);

    if( !this.bookData || !this.bookData.pages ) return;
    if( this.currentPage == -1 ) return;

    let index = this.currentPage+this.viewIndex;
    if( index < 0 || index >= this.bookData.pages.length ) {
      this.pageData = {};
      this.style.display = 'none';
      return;
    } else {
      this.style.display = 'block';
    }

    this.pageData = this.bookData.pages[this.currentPage+this.viewIndex];

    this.style.top = this.pageData.renderOffsetTop+'px';
    this.style.left = this.pageData.renderOffsetLeft+'px';
    this.style.width = this.pageData.renderWidth+'px';
    this.style.height = this.pageData.renderHeight+'px';

    this.imgEle.style.width = this.pageData.renderWidth+'px';
    this.imgEle.style.height = this.pageData.renderHeight+'px';


    this.BookReaderModel.getOcrData(this.pageData)
      .then(data => this._renderOcrData(data));

    this.requestUpdate();
  }

  _renderOcrData(data) {
    if( !data.parsed ) {

      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(data.payload, "text/xml");
      let ocrData = [];
      let ocrRatio = this.pageData.renderWidth / this.pageData.originalWidth;

      xmlDoc.querySelectorAll('WORD').forEach(word => {
        
        let [left, bottom, right, top] = word
          .getAttribute('coords')
          .split(',')
          .map(v => Math.round(parseInt(v)*this.pageData.renderRatio));

        ocrData.push({
          text: word.textContent,
          top, left, right, bottom,
          fontSize: bottom-top,
        });
      });

      data.parsed = ocrData;
    }

    this.ocrData = data.parsed;
  }

}

customElements.define('ucdlib-bookreader-page', UcdlibBookreaderPage);