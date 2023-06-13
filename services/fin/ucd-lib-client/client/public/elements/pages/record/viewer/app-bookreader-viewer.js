import { LitElement } from "lit";

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

export default class AppBookReaderViewer extends Mixin(LitElement).with(
  LitCorkUtils
) {
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
    if (this.bookData?.pages) {
      this._renderBookReader();
    }
  }

  _onAppStateUpdate(e) {
    if (e.location.page !== 'item') {
      this.bookData = {};
      this.iaInitialized = false;
    }
  }

  _renderBookReader() {
    requestAnimationFrame(() => {
      this._renderBookReaderAsync();
      this._movePrevNext();

      let slider = this.shadowRoot.querySelector(".BRpager");
      $(slider).on("slidechange", this._updateCurrentPageLabel.bind(this));

      window.addEventListener(
        `BookReader:1PageViewSelected`,
        this._singlePageLoad.bind(this)
      );
    });
  }

  _singlePageLoad(e) {
    setTimeout(() => {
      if (!this.zoomed) {
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
    let prevButton = this.shadowRoot.querySelector("#prev");
    let nextButton = this.shadowRoot.querySelector("#next");
    let currentPage = this.shadowRoot.querySelector(".BRcurrentpage");

    // remove parentheses from label (it's updated async so can't simply replace innerHTML, hide instead)
    let currentPageOverride = this.shadowRoot.querySelector(
      ".BRcurrentpage-override"
    );
    this._updateCurrentPageLabel();

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

    this.navUpdated = true;
  }

  _prevPage() {
    this.br.left();
  }

  _nextPage() {
    this.br.right();
  }

  _updateCurrentPageLabel() {
    let currentPage = this.shadowRoot.querySelector(".BRcurrentpage");
    let currentPageOverride = this.shadowRoot.querySelector(
      ".BRcurrentpage-override"
    );
    let currentPageTrimmed = currentPage.innerHTML
      .replace("(", "")
      .replace(")", "");

    if( currentPageOverride ) currentPageOverride.innerHTML = currentPageTrimmed;

    // emit event to notify app-media-download which pages to download
    // (single page mode would be 1 file, two page mode would be the 2 files being viewed)
    this.dispatchEvent(new CustomEvent('br-page-change', {
      detail: {
        onePageMode: this.onePage,
        currentPage: parseInt(currentPageTrimmed.split(' ')[0])
      },
    }));
  }

  _toggleBookView() {
    this.onePage = !this.onePage;
    this.br.switchMode(this.onePage ? 1 : 2);
    this._updateCurrentPageLabel(); // trigger ui change to media download
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

    this.bookData.pages.forEach((bd) => {
      data.push([
        {
          width: bd[bd.ocr?.imageSize]?.size?.width,
          height: bd[bd.ocr?.imageSize]?.size?.height,
          uri: bd[bd.ocr?.imageSize]?.url,
          ocr: bd.ocr?.url
        },
      ]);
    });

    let options = {
      el: this.shadowRoot.querySelector("#BookReader"),
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

      // controls zoom levels
      reductionFactors: [
        { reduce: 3000, autofit: null },
        { reduce: 3500, autofit: null },
        { reduce: 4500, autofit: null },
        { reduce: 5500, autofit: null },
        { reduce: 7000, autofit: null },
        { reduce: 8500, autofit: null },
        { reduce: 10000, autofit: "auto" },
      ],

      ui: "full", // embed, full (responsive)
    };

    this.br = new UcdBookReader(options);
    
    this.br.init();
  }

  _onSearchResultsChange(e) {
    let results = e.detail?.props?.results;
    // this.shadowRoot.querySelector('.search-pagination')
    let nav = this.shadowRoot.querySelector("app-media-viewer-nav");
    if (nav) {
      nav.searchResultsCount = results.matches.length;
    }
  }

  _onSearchResultsEmpty(e) {
    let nav = this.shadowRoot.querySelector("app-media-viewer-nav");
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
