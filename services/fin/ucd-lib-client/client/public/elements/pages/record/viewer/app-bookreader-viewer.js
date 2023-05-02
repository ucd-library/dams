import { LitElement } from "lit"
import "@polymer/paper-spinner/paper-spinner-lite"

import '@internetarchive/bookreader/src/BookReader.js';
import BookReader from '@internetarchive/bookreader/src/plugins/plugin.text_selection.js';

import render from "./app-bookreader-viewer.tpl.js"

import "@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon";
import '../../../utils/app-icons';

export default class AppBookReaderViewer extends Mixin(LitElement)
  .with(LitCorkUtils) {
  
  static get properties() {
    return {
      loading: { type : Boolean },
      height : { type : Number },
      fullscreen : { type : Boolean },
      bookData : { type : Object }
    }
  }

  constructor() {
    super();
    this.active = true;
    this.render = render.bind(this);
    this._injectModel('AppStateModel', 'MediaModel');

    this.bookData = {};
    this.loading = false;
    this.height = 634;
    this.onePage = false;
    this.fullscreen = false;
  }

  willUpdate(e) {
    if( this.bookData?.pages ) {
      this._renderBookReader();
    }
  }

  _renderBookReader() {
    requestAnimationFrame(() => {
      this._renderBookReaderAsync();
      this._movePrevNext();
      
      let slider = this.shadowRoot.querySelector('.BRpager');
      $(slider).on( 
        'slidechange', 
        this._updateCurrentPageLabel.bind(this)
      );

      window.addEventListener(`BookReader:1PageViewSelected`, this._singlePageLoad.bind(this));
    });
  }

  _singlePageLoad(e) {
    setTimeout(() => {
      if( !this.zoomed ) {
        // this is annoying, but the ia-bookmarks.js > setBREventListeners() has a timeout of 100ms on render, if no timeout used here it tries to zoom before rendering
        this.br.zoom(1);
        this.br.zoom(1);
        this.br.zoom(1);
        this.br.zoom(1);
        this.br.zoom(1);
        this.br.zoom(1);
        this.br.zoom(1);
        this.br.zoom(1);

        this.br.resize();
        this.zoomed = true;
      }

    }, 25);
  }

  _movePrevNext() {
    // move buttons to row with slider, and position page label
    //  the slider is baked into the BR code pretty heavily with animations and the dom structure
    //  moving it out of the nav bar breaks functionility, and creating our own slider doesn't play nicely
    //  instead we'll just hide all the other native nav, and restyle the BR slider (jquery ui slider)
    let prevButton = this.shadowRoot.querySelector('#prev');
    let nextButton = this.shadowRoot.querySelector('#next');
    let currentPage = this.shadowRoot.querySelector('.BRcurrentpage');

    // remove parentheses from label (it's updated async so can't simply replace innerHTML, hide instead)
    let currentPageOverride = this.shadowRoot.querySelector('.BRcurrentpage-override');
    this._updateCurrentPageLabel();

    currentPage.parentElement.prepend(prevButton);
    currentPage.parentElement.append(currentPageOverride);
    currentPage.parentElement.append(nextButton);
  }

  _prevPage() {
    this.br.left();
  }

  _nextPage() {
    this.br.right();
  }

  _updateCurrentPageLabel() {
    let currentPage = this.shadowRoot.querySelector('.BRcurrentpage');
    let currentPageOverride = this.shadowRoot.querySelector('.BRcurrentpage-override');
    currentPageOverride.innerHTML = currentPage.innerHTML.replace('(', '').replace(')', '');
  }

  _toggleBookView() {   
    this.onePage = !this.onePage;
    this.br.switchMode(this.onePage ? 1 : 2);
  }

  _zoomIn(e, amount=1) {
    this.br.zoom(amount);
  }

  _zoomOut(e, amount=-1) {
    this.br.zoom(amount);
  }

  _renderBookReaderAsync() {
    if( this.iaInitialized || !this.bookData.pages ) return;
    this.iaInitialized = true;
    let data = [];

    let djvuPath = this.bookData.pages[0].ocr.url;
    djvuPath = djvuPath.split('/');
    djvuPath = djvuPath.splice(0, djvuPath.length - 2).join('/'); // remove page number and extension    

    this.bookData.pages.forEach(bd => {
      data.push([{
        width: bd[bd.ocr.imageSize].size.width, 
        height: bd[bd.ocr.imageSize].size.height,
        uri: bd[bd.ocr.imageSize].url
      }])
    })

    let options = {
      el: this.shadowRoot.querySelector('#BookReader'),
      data,

      bookTitle: 'BookReader Presentation',

      // thumbnail is optional, but it is used in the info dialog
      thumbnail: data[0].uri,

      // Metadata is optional, but it is used in the info dialog
      metadata: [
        {label: 'Title', value: 'Open Library BookReader Presentation'},
        {label: 'Author', value: 'Internet Archive'},
        // {label: 'Demo Info', value: 'This demo shows how one could use BookReader with their own content.'},
      ],

      plugins: {
        textSelection: {
          enabled: true,
          singlePageDjvuXmlUrl: djvuPath + '/{{pageIndex}}/ocr.djvu'
        },
      },

      ui: 'full', // embed, full (responsive)

    };

    this.br = new BookReader(options);
    this.br.init();
  }
}

customElements.define('app-bookreader-viewer', AppBookReaderViewer);