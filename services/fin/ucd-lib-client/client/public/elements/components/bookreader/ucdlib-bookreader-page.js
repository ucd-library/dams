import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-bookreader-page.tpl.js";
import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';


export default class UcdlibBookreaderPage extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      debug : { type: Boolean },
      page : { type: Number},
      buffer : { type: Number },
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
    this.page = -1;
    this.debug = false;
    this.pageData = {};
    this.buffer = 0;
    this.ocrData = [];
    this._injectModel('BookReaderModel');
    this.render = render.bind(this);

    this._onClick = this._onClick.bind(this);

    this._onBookreaderStateUpdate(this.BookReaderModel.getState());
  }

  firstUpdated() {
    this.imgEle = this.shadowRoot.querySelector('img');
    this._updatePageData();
  }

  updated(props) {
    if( props.has('currentPage') || props.has('bookData') ) {
      this._updatePageData();
    }

    if( props.has('debug') ) {
      this._debugUpdated();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._onClick);
  }

  _onClick() {
    if( this.view === 'double' ) {
      if( this.page % 2 === 0 ) {
        this.BookReaderModel.setPage(this.page+1);
      } else {
        this.BookReaderModel.setPage(this.page-1);
      }
    }
  }

  _onBookreaderStateUpdate(e) {
    if( this.view !== e.selectedView ) {
      this.view = e.selectedView;
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
    if( !this.bookData || !this.bookData.pages ) return;
    if( !this.imgEle ) return;
    if( this.page == -1 ) return;

    if( this.page < 0 || this.page >= this.bookData.pages.length ) {
      this.pageData = {};
      this.style.display = 'none';
      return;
    } else {
      this.style.display = 'block';
    }

    this.pageData = this.bookData.pages[this.page];

    this.style.top = this.pageData.renderOffsetTop+'px';
    this.style.left = this.pageData.renderOffsetLeft+'px';
    this.style.width = this.pageData.renderWidth+'px';
    this.style.height = this.pageData.renderHeight+'px';

    this.imgEle.style.width = this.pageData.renderWidth+'px';
    this.imgEle.style.height = this.pageData.renderHeight+'px';


    this.BookReaderModel.getOcrData(this.pageData)
      .then(data => this._renderOcrData(data, this.pageData));

    this.requestUpdate();
  }

  _renderOcrData(data) {
    // TODO: this might need to be async rendering

    let pageChanged = false;
    if( this.renderedOcrTo ) {
      for( let key in this.renderedOcrTo ) {
        if( this.renderedOcrTo[key] !== this.pageData[key] ) {
          pageChanged = true;
          break;
        }
      }
    }

    if( !data.parsed || pageChanged ) {

      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(data.payload, "text/xml");
      let ocrData = [];

      xmlDoc.querySelectorAll('WORD').forEach(word => {
        
        let [left, bottom, right, top] = word
          .getAttribute('coords')
          .split(',')
          .map(v => Math.round(parseInt(v)*this.pageData.renderRatio));

        let fontSize = bottom-top;
        let letterSpacing = this.getWordLetterSpacing(fontSize, word.textContent, right-left);
        ocrData.push({
          text: word.textContent,
          top: top + this.buffer, 
          left, 
          right: this.pageData.renderWidth - right, 
          bottom: (this.pageData.renderHeight - bottom)+this.buffer,
          fontSize,
          letterSpacing: letterSpacing.toFixed(2)+'px'
        });
      });

      data.parsed = ocrData;
    }

    this.renderedOcrTo = {
      top: this.pageData.renderOffsetTop,
      left: this.pageData.renderOffsetLeft,
      width: this.pageData.renderWidth,
      height: this.pageData.renderHeight
    }

    this.ocrData = data.parsed;
  }

  getWordLetterSpacing(fontSize, word, width) {
    let span = document.createElement('span');
    span.style.fontSize = fontSize+'px';
    span.style.visibility = 'hidden';
    span.innerHTML = word;
    document.body.appendChild(span);

    let spanWidth = span.offsetWidth;
    let spacing = (width - spanWidth) / (word.length-1);
    document.body.removeChild(span);
    return spacing
  }

}

customElements.define('ucdlib-bookreader-page', UcdlibBookreaderPage);