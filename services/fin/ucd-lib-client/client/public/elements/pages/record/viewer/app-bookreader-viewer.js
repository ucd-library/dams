import { LitElement } from "lit";
import {Mixin, MainDomElement} from '@ucd-lib/theme-elements/utils/mixins';
import { LitCorkUtils } from '@ucd-lib/cork-app-utils';

import "@internetarchive/bookreader/src/BookReader.js";

// TODO - fix this, docs say search modifies mobile nav so that plugin needs to be loaded first. but is that true?
// import "@internetarchive/bookreader/src/plugins/plugin.mobile_nav.js";

// this just adds functionality to BookReader.prototype
import "@internetarchive/bookreader/src/plugins/search/plugin.search.js";

import BookReader from "@internetarchive/bookreader/src/plugins/plugin.text_selection.js";

/*
 * bookreader forces https and not allowing ports, and we need an event emited when slider search results are clicked.
 * submitting IA pr to fix, for now overriding 2 prototype functions
 */
import bookreaderPatch from "./app-bookreader.patch-search.js";
const UcdBookReader = bookreaderPatch(BookReader);

import render from "./app-bookreader-viewer.tpl.js";

import "@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon";
import "../../../utils/app-icons";

export default class AppBookReaderViewer extends Mixin(LitElement)
  .with(MainDomElement, LitCorkUtils) {

  static get properties() {
    return {
      loading: { type: Boolean },
      height: { type: Number },
      fullscreen: { type: Boolean },
      bookData: { type: Object },
      bookItemId: { type: String },
    };
  }

  constructor() {
    super();
    this.active = true;
    this.render = render.bind(this);
    this._injectModel("AppStateModel", "MediaModel");

    this.bookData = {};
    this.bookItemId = "";
    this.loading = false;
    this.height = 634;
    this.onePage = false;
    this.fullscreen = false;
    this.viewportMultiplier = 3.7;

    window.addEventListener(
      "BookReader:SearchCallback",
      this._onSearchResultsChange.bind(this)
    );

    window.addEventListener(
      "BookReader:SearchCallbackEmpty",
      this._onSearchResultsEmpty.bind(this)
    );
  }

  firstUpdated(e) {
    if (window.innerWidth < 801) {
      this.onePage = true;
    }
  }

  willUpdate(e) {
    if( this.AppStateModel.location.page !== 'item' ) return;
    if( this.bookData?.pages ) {
      this._renderBookReader();
    }
  }

  _onAppStateUpdate(e) {
    if (e.location.page !== 'item') {
      this.bookData = {};
      this.iaInitialized = false;

      this.dispatchEvent(new CustomEvent('br-cancel-search', {
        detail: {
          onePageMode: this.onePage,
          closeSearch: true,
        },
      }));

    }
  }

  _renderBookReader() {
    requestAnimationFrame(() => {
      this._renderBookReaderAsync();
      this._movePrevNext();

      let slider = document.querySelector(".BRpager");
      $(slider).on("slidechange", this._updateCurrentPageLabel.bind(this));

      window.addEventListener(
        `BookReader:1PageViewSelected`,
        this._singlePageLoad.bind(this)
      );

      // hide slider / pager if only a single page
      let scrubber = document.querySelector('.scrubber');
      let controls = document.querySelector('.controls');
      let twoPageToggle = document.querySelector('app-media-viewer-nav')?.shadowRoot?.querySelector('.page-toggle');

      if( this.bookData.pages.length < 2 ) {
        scrubber.style.display = 'none';
        controls.style.flexDirection = 'row-reverse';
        if( twoPageToggle?.style ) twoPageToggle.style.display = 'none';

      } else {
        scrubber.style.display = '';
        controls.style.flexDirection = '';
        if( twoPageToggle?.style ) twoPageToggle.style.display = '';
      }
    });
  }

  _singlePageLoad(e) {
    setTimeout(() => {
      if (!this.zoomed) {
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
    let prevButton = document.querySelector("#prev");
    let nextButton = document.querySelector("#next");
    let currentPage = document.querySelector(".BRcurrentpage");

    // remove parentheses from label (it's updated async so can't simply replace innerHTML, hide instead)
    let currentPageOverride = document.querySelector(
      ".BRcurrentpage-override"
    );
    this._updateCurrentPageLabel();

    if( !currentPage.parentElement.querySelector('#prev') && 
        !currentPage.parentElement.querySelector('#next') &&
        !currentPage.parentElement.querySelector('.BRcurrentpage-override') ) {
      // clone buttons and reposition them. changing between bookreader items 
      //  destroys previous original arrow/label elements if append/prepend originals
      let prevButtonClone = prevButton.cloneNode(true);
      let currentPageOverrideClone = currentPageOverride.cloneNode(true);
      let nextButtonClone = nextButton.cloneNode(true);

      prevButtonClone.style.display = "inline-flex";
      nextButtonClone.style.display = "inline-flex";
      currentPageOverrideClone.style.display = "inline-block";
      
      prevButtonClone.addEventListener("click", this._prevPage.bind(this));
      nextButtonClone.addEventListener("click", this._nextPage.bind(this));

      prevButton.style.display = "none";
      nextButton.style.display = "none";
      currentPageOverride.style.display = "none";

      currentPage.parentElement.prepend(prevButtonClone);
      currentPage.parentElement.append(currentPageOverrideClone);
      currentPage.parentElement.append(nextButtonClone);
    }

    this.navUpdated = true;
  }

  _prevPage() {
    // if( !this.onePage ) {
      this.br.left();
    //   return;
    // }

    // this.pageIndex = (this.pageIndex || 0) - 1;
    // if( this.pageIndex < 0 ) this.pageIndex = 0;
    // let brMode1up = this.querySelector('br-mode-1up');
    // if( !brMode1up ) {
    //   // this should be impossible, but just in case
    //   this.br.left();
    //   return;
    // }
    
    // brMode1up.scrollTop = brMode1up.worldUnitsToVisiblePixels(brMode1up.pageTops[this.pageIndex]);
  }

  _nextPage() {
    // if( !this.onePage ) {
      this.br.right();
    //   return;
    // }

    // this.pageIndex = (this.pageIndex || 0) + 1;
    // if( this.pageIndex > this.br.data.length - 1 ) this.pageIndex = this.br.data.length - 1;
    // let brMode1up = this.querySelector('br-mode-1up');
    // if( !brMode1up ) {
    //   // this should be impossible, but just in case
    //   this.br.right();
    //   return;
    // }

    // brMode1up.scrollTop = brMode1up.worldUnitsToVisiblePixels(brMode1up.pageTops[this.pageIndex]);
  }

  _updateCurrentPageLabel() {
    let currentPage = document.querySelector(".BRcurrentpage");
    let currentPageOverride = document.querySelector(
      ".BRcurrentpage-override"
    );
    let currentPageTrimmed = currentPage.innerHTML
      .replace("(", "")
      .replace(")", "");

    if( currentPageOverride ) currentPageOverride.innerHTML = currentPageTrimmed;

    // console.log('emitting event for br-page-change, currentPage', parseInt(currentPageTrimmed.split(' ')[0]));

    // emit event to notify app-media-download which pages to download
    // (single page mode would be 1 file, two page mode would be the 2 files being viewed)
    this.dispatchEvent(new CustomEvent('br-page-change', {
      detail: {
        onePageMode: this.onePage,
        currentPage: parseInt(currentPageTrimmed.split(' ')[0])
      },
    }));
    // this.pageIndex = parseInt(currentPageTrimmed.split(' ')[0]) - 1;
  }

  _toggleBookView() {
    this.onePage = !this.onePage;
    this.br.switchMode(this.onePage ? 1 : 2);
    this._updateCurrentPageLabel(); // trigger ui change to media download
    this.br.resize();
  }

  _zoomIn(e, amount = 1) {
    this.br.zoom(amount);
  }

  _zoomOut(e, amount = -1) {
    this.br.zoom(amount);
  }

  _renderBookReaderAsync() {
    if( this.iaInitialized || !this.bookData.pages ) return;
    this.iaInitialized = true;
    let data = [];

    let maxHeight = 0;
    let maxWidth = 0;

    this.bookData.pages.forEach((bd) => {
      data.push([
        {
          width: bd[bd.ocr?.imageSize]?.size?.width,
          height: bd[bd.ocr?.imageSize]?.size?.height,
          uri: bd[bd.ocr?.imageSize]?.url,
          ocr: bd.ocr?.url
        },
      ]);

      if( bd[bd.ocr?.imageSize]?.size?.width > maxWidth ) maxWidth = bd[bd.ocr?.imageSize]?.size?.width;
      if( bd[bd.ocr?.imageSize]?.size?.height > maxHeight ) maxHeight = bd[bd.ocr?.imageSize]?.size?.height;
    });
    
    // adjust viewport based on image dimensions
    if( window.innerWidth < maxWidth ) {
      let height = window.innerWidth / maxWidth * maxHeight + 15;
      document.querySelector('#BookReader').style.height = height + 'px';
    }
    
    let options = {
      el: "#BookReader",
      data,

      bookTitle: "BookReader Presentation",

      // thumbnail is optional, but it is used in the info dialog
      thumbnail: data[0].uri,

      // Metadata is optional, but it is used in the info dialog
      metadata: [
        { label: "Title", value: "Open Library BookReader Presentation" },
        { label: "Author", value: "Internet Archive" },
      ],

      plugins: {
        textSelection: {
          enabled: true,
          singlePageDjvuCallback: (index) => {
            return data[index]?.[0]?.ocr;
          },
          singlePageDjvuXmlUrl: "no-op"
        },
      },

      showToolbar: false,
      server: window.location.host,
      searchInsideUrl: "/api/page-search/ia",

      getPageWidth: (index) => {
        let containerWidth = document.querySelector('#BookReader').offsetWidth;
        let containerHeight = document.querySelector('#BookReader').offsetHeight;

        let imageWidth = data[index]?.[0]?.width;        
        let imageHeight = data[index]?.[0]?.height;

        let widthRatio = containerWidth / imageWidth;
        let heightRatio = containerHeight / imageHeight;
        
        let scaleRatio = Math.min(widthRatio, heightRatio);
        
        let newWidth = Math.floor(imageWidth * scaleRatio);

        return newWidth * this.viewportMultiplier;
      },
      getPageHeight: (index) => {
        let containerWidth = document.querySelector('#BookReader').offsetWidth;
        let containerHeight = document.querySelector('#BookReader').offsetHeight;

        let imageWidth = data[index]?.[0]?.width;        
        let imageHeight = data[index]?.[0]?.height;

        let widthRatio = containerWidth / imageWidth;
        let heightRatio = containerHeight / imageHeight;
        
        let scaleRatio = Math.min(widthRatio, heightRatio);
        
        let newHeight = Math.floor(imageHeight * scaleRatio);

        return newHeight * this.viewportMultiplier;
      },

      padding: 20,
      ui: "full", // embed, full (responsive)
    };
    if( this.attributes.brsinglepage ) this.onePage = true;
    this.br = new UcdBookReader(options);
    this.br.init();
    this.br.switchMode(this.onePage ? 1 : 2);
    this.br.resize();
    this.requestUpdate();
  }

  _onSearchResultsChange(e) {
    let results = e.detail?.props?.results;
    // document.querySelector('.search-pagination')
    let nav = document.querySelector("app-media-viewer-nav");
    if (nav) {
      nav.searchResultsCount = results.matches.length;
    }
  }

  _onSearchResultsEmpty(e) {
    let nav = document.querySelector("app-media-viewer-nav");
    if (nav) {
      nav.searchResultsCount = 0;
    }
  }

  search(queryTerm) {
    this.br.bookId = this.bookItemId;
    this.br.search(queryTerm);
  }

  onSearchResultClick(e) {
    let matchIndex = parseInt(
      e.currentTarget?.attributes["data-match-index"]?.value || 0
    );
    this.br._searchPluginGoToResult(matchIndex);
  }

  onSearchPrevNext(matchIndex) {
    this.br._searchPluginGoToResult(matchIndex, false);
  }
}

customElements.define("app-bookreader-viewer", AppBookReaderViewer);
