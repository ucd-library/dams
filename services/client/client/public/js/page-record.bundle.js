"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["page-record"],{

/***/ "./public/elements/components/bookreader/ucdlib-bookreader-navbar.js":
/*!***************************************************************************!*\
  !*** ./public/elements/components/bookreader/ucdlib-bookreader-navbar.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UcdlibBookreaderNavbar)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _ucdlib_bookreader_navbar_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ucdlib-bookreader-navbar.tpl.js */ "./public/elements/components/bookreader/ucdlib-bookreader-navbar.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _ucd_lib_theme_elements_ucdlib_ucdlib_icons_ucdlib_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ucd-lib/theme-elements/ucdlib/ucdlib-icons/ucdlib-icons */ "./public/node_modules/@ucd-lib/theme-elements/ucdlib/ucdlib-icons/ucdlib-icons.js");
/* harmony import */ var _ucdlib_bookreader_slider_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ucdlib-bookreader-slider.js */ "./public/elements/components/bookreader/ucdlib-bookreader-slider.js");








class UcdlibBookreaderNavbar extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
.with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {

  static get properties() {
    return {
      selectedPage : { type: Number },
      numPages : { type: Number },
      fullscreen : { type: Boolean },
      singlePageView : { type: Boolean },
      selectedResult : { type: Number },
      searchResults : { type: Array },
      searchResultsCount : { type: Number },
      searching : { type: Boolean },
      selectedPageLabel : { type: String }
    }
  }

  static get styles() {
    return (0,_ucdlib_bookreader_navbar_tpl_js__WEBPACK_IMPORTED_MODULE_1__.styles)();
  }

  constructor() {
    super();
    this.render = _ucdlib_bookreader_navbar_tpl_js__WEBPACK_IMPORTED_MODULE_1__.render.bind(this);

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

    this._updatePageLabels();
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
    this.selectedPageLabel = '';
  }

  _prevPage(e) {
    let pageIncrement = this.singlePageView ? 1 : 2;
    if( this.selectedPage === 1 ) pageIncrement = 1;
    if( pageIncrement === 2 && this.selectedPage % 2 === 0 ) pageIncrement = 1; // if viewing odd page (0-index) in 2page mode, should only move a single page back

    if( this.selectedPage > 0 ) {
      this.BookReaderModel.setPage(this.selectedPage - pageIncrement);
    }

    this._updatePageLabels();
  }

  _nextPage(e) {
    let pageIncrement = this.singlePageView ? 1 : 2;
    if( this.selectedPage === 0 ) pageIncrement = 1;
    if( pageIncrement === 2 && this.selectedPage % 2 === 0 ) pageIncrement = 1; // if viewing odd page (0-index) in 2page mode, should only move a single page forward

    if( (this.selectedPage+pageIncrement) < this.numPages ) {
      this.BookReaderModel.setPage(this.selectedPage + pageIncrement);
    } else if( !this.singlePageView && this.selectedPage+2 === this.numPages ) {
      // update to last page if in double page view and on last page
      this.BookReaderModel.setPage(this.selectedPage + 1);
    }

    this._updatePageLabels();
  }

  _updatePageLabels() {    
    // update selected page label, the page number if single page, otherwise include the page range if double page
    // if first/last page, since we don't want to show a range if we're on the first
    if( this.singlePageView || this.selectedPage === 0 ) {
      this.selectedPageLabel = this.selectedPage+1;
    } else if( this.selectedPage === (this.numPages-1) && this.numPages % 2 === 1 ) { 
      // very last page (for odd number pages)
      this.selectedPageLabel = this.selectedPage + '-' + (this.selectedPage+1);
    } else if( this.selectedPage === (this.numPages-1) && this.numPages % 2 !== 1 ) { 
      // very last page (for even number pages)
      this.selectedPageLabel = this.selectedPage+1;
    } else {
      this.selectedPageLabel = this.selectedPage+1 + '-' + (this.selectedPage+2);
    }

    // also set custom property to help with styling so nav doesn't jump around
    let pageLabelDiv = this.shadowRoot.querySelector('.br-currentpage-override');
    if( pageLabelDiv ) pageLabelDiv.style.setProperty('--num-pages-length', this.numPages.toString().length);
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

/***/ }),

/***/ "./public/elements/components/bookreader/ucdlib-bookreader-navbar.tpl.js":
/*!*******************************************************************************!*\
  !*** ./public/elements/components/bookreader/ucdlib-bookreader-navbar.tpl.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "styles": () => (/* binding */ styles)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");


function styles() {
  const elementStyles = lit__WEBPACK_IMPORTED_MODULE_0__.css`
    :host {
      display: block;
    }

    [hidden] {
      display: none !important;
    }

    .br-nav-bar,
    .controls {
      display: flex;
      align-items: center;
    }

    .br-nav-bar.fullscreen {
      padding: 0 1.5%;
    }

    ucdlib-icon {
      height: 35px;
      width: 30px;
      max-height: 35px;
      max-width: 30px;
      cursor: pointer;
    }

    ucdlib-bookreader-slider {
      height: 60px;
      flex: 1;
      padding-right: 1.5rem;
      padding-left: 10px;
    }

    .br-currentpage-override {
      color: #022851;
      font-size: 0.9rem;
      font-weight: bold;
      text-align: center;
      min-width: calc(var(--num-pages-length, 0) * 3ch + 3ch);
    }

    #buttonWrapper div {
      background-color: var(--color-aggie-blue-80);
      border-radius: 50%;
      display: inline-block;
      width: 50px;
      height: 50px;
      margin-left: 0.4rem;
    }

    #buttonWrapper ucdlib-icon {
      fill: white;
      width: 25px;
      margin: 7px auto;
    }

    .br-search {
      position: absolute;
      bottom: 75px;
      left: 0;
      background-color: var(--color-aggie-blue-30);
      height: 75px;
      padding-right: 0.9rem;
    }

    .br-search div {
      display: inline-block;
      vertical-align: sub;
    }

    .br-search div.zoom {
      background-color: var(--color-aggie-blue-80);
      border-radius: 50%;
      display: inline-block;
      width: 50px;
      height: 50px;
      margin-left: 25px;
      margin-top: 12.5px;
      cursor: pointer;
    } 

    .br-search div.zoom.searching,
    .br-search div.zoom.searching:hover {
      background-color: var(--color-aggie-gold);
    }

    .br-search div.zoom.searching ucdlib-icon {
      fill: var(--color-aggie-blue);
    }

    .br-search div.zoom:hover,
    #buttonWrapper div:hover {
      background-color: var(--color-aggie-blue);
    }

    .br-search ucdlib-icon {
      height: 25px;
      margin: 11px auto;
      fill: white;
    }

    .br-search #search-prev ucdlib-icon,
    .br-search #search-next ucdlib-icon { 
      width: 50px;
      height: 50px;
      fill: var(--color-aggie-blue);
    }

    .br-search::after {
      position: absolute;
      right: -1rem;
      top: 0;
      width: 1.8rem;
      height: 100%;
      background-color: var(--color-aggie-blue-30);
      content: "";
      transform: skewX(196deg);
    }

    #buttonWrapper {
      white-space: nowrap; 
      padding-left: 2rem;
    }

    #buttonWrapper .single-page-book {
      width: 25px;
      height: 25px;
      margin-top: 11px;
    }

    @media (max-width: 767px) {
      #buttonWrapper .zoom-icons {
        display: none;
      }
      ucdlib-bookreader-slider {
        padding-right: .5rem;
      }
      #buttonWrapper {
        padding-left: .5rem;
      }
    }

    .tooltip {
      cursor: pointer;
      position: relative;
    }

    .tooltip:hover:before {
      content: attr(data-tooltip-text);
      position: absolute;
      bottom: 60px;
      right: 50%;
      transform: translateX(50%);
      padding: 5px 10px;
      border-radius: 5px;
      background: var(--color-aggie-blue);
      color: #fff;
      font-size: 1rem;
      font-weight: bold;
      white-space: nowrap;
      opacity: 0;
      transition: .2s opacity ease-out;
      z-index: 10;
    }

    .tooltip.right-align:hover:before {
      transform: translateX(80%);
    }

    .tooltip.left-align:hover:before {
      transform: translateX(20%);
    }

    .tooltip:hover:after {
      content: "";
      position: absolute;
      bottom: 50px;
      right: 20px;
      border: 5px solid var(--color-aggie-blue);
      border-color: var(--color-aggie-blue) transparent transparent transparent;
      opacity: 0;
      transition: .2s opacity ease-out;
    }

    .tooltip:hover:before,
    .tooltip:hover:after {
      opacity: 1;
    }

  `;

  return [elementStyles];
}

function render() { 
return lit__WEBPACK_IMPORTED_MODULE_0__.html`
  

  <div class="br-nav-bar${this.fullscreen ? ' fullscreen' : ''}">
    <ucdlib-bookreader-slider></ucdlib-bookreader-slider>
    <div class="controls">  
      <div id="prev" @click="${this._prevPage}">
        <ucdlib-icon icon="ucdlib-dams:fa-caret-left"></ucdlib-icon>
      </div>

      <span class="br-currentpage-override">${this.selectedPageLabel} of ${this.numPages}</span>

      <div id="next" style="width: 25px;" @click="${this._nextPage}">
        <ucdlib-icon icon="ucdlib-dams:fa-caret-right"></ucdlib-icon>
      </div>
    </div>

    <div id="buttonWrapper"
      ?hidden="${!this.fullscreen}">
      <div @click="${this._onToggleBookView}" 
        class="page-toggle tooltip"
        data-tooltip-text="${this.singlePageView ? 'Two-Page View' : 'Single-Page View'}">
        <ucdlib-icon
          icon="ucdlib-dams:fa-book-open"
          ?hidden="${!this.singlePageView}"
        ></ucdlib-icon>
        <ucdlib-icon
          icon="ucdlib-dams:page-single"
          ?hidden="${this.singlePageView}"
          class="single-page-book"
        ></ucdlib-icon>
      </div>

      <div class="zoom-icons tooltip" data-tooltip-text="Zoom Out" @click="${this._onZoomOutClicked}">
        <ucdlib-icon icon="ucdlib-dams:fa-minus"></ucdlib-icon>
      </div>
      <div class="zoom-icons tooltip" data-tooltip-text="Zoom In" @click="${this._onZoomInClicked}">
        <ucdlib-icon icon="ucdlib-dams:fa-plus"></ucdlib-icon>
      </div>
      <div @click="${this._onCloseClicked}" class="tooltip left-align" data-tooltip-text="Exit Fullscreen">
        <ucdlib-icon icon="ucdlib-dams:fa-down-left-and-up-right-to-center"></ucdlib-icon>
      </div>
    </div>

  </div>

  <div class="br-search" ?hidden="${!this.fullscreen}">
    <div
      class="tooltip zoom${this.searching ? " searching" : ""} right-align"
      @click="${this._onSearchClicked}"
      data-tooltip-text="${this.searching ? "Hide Search Box" : "Search Inside"}">
      <ucdlib-icon icon="ucdlib-dams:fa-magnifying-glass" class="fullscreen-search"></ucdlib-icon>
    </div>
    <div
      class="search-pagination"
      ?hidden="${this.searchResultsCount === 0}">
      <div
        id="search-prev"
        style="padding-left: .5rem; width: 40px;"
        @click="${this._prevSearchResult}">
        <ucdlib-icon icon="ucdlib-dams:fa-caret-left"></ucdlib-icon>
      </div>

      <span
        class="search-results"
        style="position: relative;
          bottom: 1rem;
          font-size: .9rem;
          font-weight: bold;">
        ${this.selectedResult} / ${this.searchResultsCount}
      </span>

      <div
        id="search-next"
        style="padding-right: .5rem; width: 40px;"
        @click="${this._nextSearchResult}">
        <ucdlib-icon icon="ucdlib-dams:fa-caret-right"></ucdlib-icon>
      </div>
    </div>
  </div>

`;}

/***/ }),

/***/ "./public/elements/components/bookreader/ucdlib-bookreader-page.js":
/*!*************************************************************************!*\
  !*** ./public/elements/components/bookreader/ucdlib-bookreader-page.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UcdlibBookreaderPage)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _ucdlib_bookreader_page_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ucdlib-bookreader-page.tpl.js */ "./public/elements/components/bookreader/ucdlib-bookreader-page.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");





class UcdlibBookreaderPage extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {

  static get properties() {
    return {
      debug : { type: Boolean },
      page : { type: Number},
      buffer : { type: Number },
      bookData : { type: Object },
      pageData : { type: Object },
      ocrData : { type: Array},
      loading : { type: Boolean },
      clickNavEnabled : { type: Boolean },
      animating : { type: Boolean }
    }
  }

  static get styles() {
    return (0,_ucdlib_bookreader_page_tpl_js__WEBPACK_IMPORTED_MODULE_1__.styles)();
  }

  constructor() {
    super();
    this.page = -1;
    this.debug = false;
    this.pageData = {};
    this.buffer = 0;
    this.ocrData = [];
    this.loading = false;
    this.wordProcessGroupSize = 25;
    this.clickNavEnabled = false;
    this._injectModel('BookReaderModel');
    this.render = _ucdlib_bookreader_page_tpl_js__WEBPACK_IMPORTED_MODULE_1__.render.bind(this);

    this._onClick = this._onClick.bind(this);
  }

  firstUpdated() {
    this.imgEle = this.shadowRoot.querySelector('img');
    this._updatePageData();
    this._onBookreaderStateUpdate(this.BookReaderModel.getState());
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
    if( !this.clickNavEnabled ) return; 

    // this makes selecting text difficult
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

    // don't render words if we are animating
    this.animating = e.animating;
    if( this.animating ) {
      this._pauseOnAnimation();
    } else {
      if( this.pauseAnimationResolve ) {
        this.pauseAnimationResolve();
        this.pauseAnimation = null;
        this.pauseAnimationResolve = null;
      }
    }

    if( e.searchResults?.state === 'loaded' && 
        e.searchResults?.itemId === this.bookData?.id ) {
      this._renderOcrData();
    }
  }

  _setLoading(src) {
    this.loading = true;
    let img = new Image();
    img.onload = () => {
      this.loading = false;
    }
    img.src = src;
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

    if( this.lastImgUrl !== this.pageData.imageUrl ) {
      this._setLoading(this.pageData.imageUrl);
      this.lastImgUrl = this.pageData.imageUrl;
    }

    this.BookReaderModel.getOcrData(this.pageData, this.bookData.id)
      .then(data => this._renderOcrData(data));

    this.requestUpdate();
  }

  async _renderOcrData(data) {
    // TODO: this might need to be async rendering
    if( !data && this.renderedOcrData ) {
      data = this.renderedOcrData;
    }
    if( !data ) return;

    let search = this.BookReaderModel.getSearchResults(this.bookData.id, this.page);

    let pageChanged = false;
    if( this.renderedOcrTo ) {
      for( let key in this.renderedOcrTo ) {
        if( this.renderedOcrTo[key] !== this.pageData[key] ) {
          pageChanged = true;
          break;
        }
      }
    }
    if( search.text !== this.renderedSearchText ) {
      pageChanged = true;
    }

    // make sure these haven't changed after render 
    let currentPage = this.page;
    let currentBookId = this.bookData.id;
    let currentSearch = search.text;

    let ocrData = [];
    let time = new Date().getTime();
    if( !this.ocrData || pageChanged ) {
      let wordGroupCount = Math.ceil(data.payload.length / this.wordProcessGroupSize);

      for( let i = 0; i < wordGroupCount; i += 1 ) {
        if( this.pauseAnimation ) {
          await this.pauseAnimation;
        }

        let words = data.payload.slice(i*this.wordProcessGroupSize, (i+1)*this.wordProcessGroupSize);
        let scaledWords = await this._renderWordGroup(words, search);
        ocrData.push(...scaledWords);
      }
    }
    this.logger.debug('page='+this.page+' rendering '+data.payload.length+' words took', new Date().getTime()-time, 'ms');

    // make sure these haven't changed after render
    if( currentPage !== this.page || currentBookId !== this.bookData.id || currentSearch !== search.text ) {
      return;
    }

    this.renderedOcrTo = {
      renderRation : this.pageData.renderRatio,
      top: this.pageData.renderOffsetTop,
      left: this.pageData.renderOffsetLeft,
      width: this.pageData.renderWidth,
      height: this.pageData.renderHeight,
    }
    this.renderedSearchText = search.text;

    this.ocrData = ocrData;
    this.renderedOcrData = data;
    this.requestUpdate();
  }

  /**
   * @method _renderWordGroup
   * @description render a group of words at a time to prevent blocking the UI
   * 
   * @param {*} words 
   * @param {*} search 
   * @returns 
   */
  _renderWordGroup(words, search) {
    return new Promise((resolve, reject) => {
      let scaledWords = words.map(word => this._renderWordSize(word, search));
      setTimeout(() => resolve(scaledWords), 0);
    });
  }

  _pauseOnAnimation() {
    if( !this.animating ) return Promise.resolve();

    this.pauseAnimation = new Promise((resolve, reject) => {
      this.pauseAnimationResolve = resolve;
    });
    return this.pauseAnimation;
  }

  /**
   * @method _renderWordSize
   * @description render a single word, scaling it to the page and search results
   * 
   * @param {*} word 
   * @param {*} search 
   * @returns 
   */
  _renderWordSize(word, search) {
    let scaledWord = {
      text : word.text,
      top : Math.round(word.bbox.top*this.pageData.renderRatio),
      left : Math.round(word.bbox.left*this.pageData.renderRatio),
      right : Math.round(word.bbox.right*this.pageData.renderRatio),
      bottom : Math.round(word.bbox.bottom*this.pageData.renderRatio)
    }

    let fontSize = scaledWord.bottom-scaledWord.top;
    let letterSpacing = this.getWordLetterSpacing(fontSize, word.text, scaledWord.right-scaledWord.left);
    
    scaledWord.letterSpacing = letterSpacing.toFixed(2)+'px';
    scaledWord.fontSize = fontSize;
    scaledWord.top += this.buffer;
    scaledWord.bottom = this.pageData.renderHeight - scaledWord.bottom + this.buffer;
    scaledWord.right = this.pageData.renderWidth - scaledWord.right;
    scaledWord.selected = this._isSelectedWord(word, search.results);

    return scaledWord;
  }

  _isSelectedWord(word, results) {
    let hit, re;
    for( hit of results ) {
      for( re of hit.regex ) {
        if( re.test(word.text) ) {
          return true;
        }
      }
    }
    return false;
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

/***/ }),

/***/ "./public/elements/components/bookreader/ucdlib-bookreader-page.tpl.js":
/*!*****************************************************************************!*\
  !*** ./public/elements/components/bookreader/ucdlib-bookreader-page.tpl.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "styles": () => (/* binding */ styles)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");


function styles() {
  const elementStyles = lit__WEBPACK_IMPORTED_MODULE_0__.css`
    :host {
      display: block;
      position: absolute;
      backface-visibility: hidden;
      transform-style: preserve-3d;
      --transition-duration: 0.25s;
    }

    :host(.page-left-prev) {
      z-index: 10;
      visibility: hidden;
    }
    
    :host(.page-right-prev) {
      z-index: 10;
      transform: rotateY(-180deg);
      transform-origin: left;
      visibility: hidden;
    }

    :host(.page-left) {
      z-index: 40;
    }

    :host(.page-right) {
      z-index: 40;
    }

    :host(.page-left-next) {
      z-index: 10;
      transform-origin: right;
      transform: rotateY(-180deg);
    }

    :host(.page-right-next) {
      z-index: 10;
      visibility: hidden;
    }

    /* animate next */

    :host(.page-left.animate-next-start) {
      z-index: 15;
    }

    :host(.page-right.animate-next-start) {
      transform: rotateY(90deg);
      transform-origin: left;
      transition: transform var(--transition-duration);
      transition-timing-function: ease-in;
    }

    :host(.page-left-next.animate-next-start) {
      transform: rotateY(-90deg);
    }

    :host(.page-right-next.animate-next-start) {
      visibility: visible;
       z-index: 20;
    }

    :host(.page-right.animate-next-end) {
      transform: rotateY(-90deg);
    }

    :host(.page-left-next.animate-next-end) {
      z-index: 50;
      transition: transform var(--transition-duration);
      transform: rotateY(0deg);
      transition-timing-function: ease-out;
    }

    :host(.page-right-next.animate-next-end) {
      visibility: visible;
       z-index: 20;
    }


    /* animate prev */

    :host(.page-left.animate-prev-start) {
      z-index: 50;
      transform: rotateY(-90deg);
      transform-origin: right;
      transition: transform var(--transition-duration);
      transition-timing-function: ease-in;
    }

    :host(.page-right.animate-prev-start) {
      z-index: 15;
    }

    :host(.page-right-prev.animate-prev-start) {
      transform: rotateY(-90deg);
      z-index: 50;
      visibility: visible;
    }

    :host(.page-left-prev.animate-prev-start) {
      visibility: visible;
      z-index: 15;
    }

    :host(.page-left.animate-prev-end) {
      transform: rotateY(-90deg);
    }

    :host(.page-right.animate-prev-end) {
      z-index: 10;
    }

    :host(.page-right-prev.animate-prev-end) {
      z-index: 50;
      transition: transform var(--transition-duration);
      transform: rotateY(0deg);
      transition-timing-function: ease-out;
      visibility: visible;
    }

    :host(.page-left-prev.animate-prev-end) {
      visibility: visible;
      z-index: 15;
    }
    
    .words[animating] {
      display: none
    }

    span.word {
      display: inline-block;
      position: absolute;
      color: transparent;
      cursor: text;
      pointer-events: all;
    }

    span.word[selected] {
      border: 3px solid var(--color-redbud);
      background-color: #f555b140;
      margin: -1px;
      border-radius: 4px;
    }

    img {
      user-select: none;
      pointer-events: auto;
    }

    .loading {
      height: 100%;
      position: relative;
    }
    .loading div {  
      position: absolute;
      left: 5px;
      top: 5px;
      right: 5px;
      bottom: 5px;
      background: #eee;
      border-radius: 10px;
    }
  `;

  return [elementStyles];
}

function render() { 
return lit__WEBPACK_IMPORTED_MODULE_0__.html`

<div ?hidden="${!this.debug}">
  <div>Page: ${this.pageData.index}</div>
  <div>Width/height: ${this.pageData.width}x${this.pageData.height}</div>
  <div>Rendered offset top/left: ${this.pageData.renderOffsetTop}x${this.pageData.renderOffsetLeft}</div>
  <div>Rendered width/height: ${this.pageData.renderWidth}x${this.pageData.renderHeight}</div>
  <div>Render ratio: ${this.pageData.renderRatio}</div>
  <div>Render ratio dimension: ${this.pageData.renderRatioDimension}</div>
</div> 

<img ?hidden="${this.debug || this.loading}" draggable="false" src="${this.pageData?.imageUrl}" alt="">
<div ?hidden="${!this.loading}" class="loading">
  <div></div>
</div>


<div class="words" ?animating="${this.animating}" aria-hidden="true">
${this.ocrData.map((word, i) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
  <span 
    class="word"
    ?selected="${word.selected}" 
    style="bottom: ${word.bottom}px; right: ${word.right}px; top: ${word.top}px; left: ${word.left}px; line-height: ${word.fontSize}px; letter-spacing: ${word.letterSpacing}; font-size: ${word.fontSize}px">
    ${word.text}
  </span>
`)}
</div>

`;}

/***/ }),

/***/ "./public/elements/components/bookreader/ucdlib-bookreader-slider.js":
/*!***************************************************************************!*\
  !*** ./public/elements/components/bookreader/ucdlib-bookreader-slider.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UcdlibBookreaderSlider)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _ucdlib_bookreader_slider_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ucdlib-bookreader-slider.tpl.js */ "./public/elements/components/bookreader/ucdlib-bookreader-slider.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");




class UcdlibBookreaderSlider extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
.with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {

  static get properties() {
    return {
      maxPage : { type: Number },
      selectedPage : { type: Number },
      width : { type: Number },
      searchResults : { type: Array },
      isMoving : { type: Boolean }
    }
  }

  static get styles() {
    return (0,_ucdlib_bookreader_slider_tpl_js__WEBPACK_IMPORTED_MODULE_1__.styles)();
  }

  constructor() {
    super();
    this.render = _ucdlib_bookreader_slider_tpl_js__WEBPACK_IMPORTED_MODULE_1__.render.bind(this);

    this._injectModel('BookReaderModel');

    this._reset();

    this._onMove = this._onMove.bind(this);
    this._onMoveStart = this._onMoveStart.bind(this);
    this._onMoveEnd = this._onMoveEnd.bind(this);
    this._onResize = this._onResize.bind(this);
  }

  firstUpdated() {
    this.track = this.shadowRoot.getElementById('track');
    this.handle = this.shadowRoot.getElementById('handle');
    if( this.handle ) {
      this.handle.addEventListener('mousedown', this._onMoveStart);
      // this.handle.addEventListener('touchstart', () => this.isDragging = true);
    } else {
      this.logger.error('Failed to find handle element');
    }

    this._calculatePages();
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('resize', this._onResize);

    window.addEventListener('mousemove', this._onMove);
    window.addEventListener('touchmove', this._onMove);

    window.addEventListener('mouseup', this._onMoveEnd);
    window.addEventListener('touchend', this._onMoveEnd);
    window.addEventListener('mouseup', this._onMoveEnd);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener('resize', this._onResize);

    window.removeEventListener('touchmove', this._onMove);
    window.removeEventListener('mousemove', this._onMove); 

    window.removeEventListener('mouseup', this._onMoveEnd);
    window.removeEventListener('touchend', this._onMoveEnd);
  }

  _onBookreaderStateUpdate(e) {
    this.selectedPage = e.selectedPage || 0;
    this.maxPage = (e.bookViewData?.pages?.length || 1) - 1;
    this._calculatePages();

    // update slider position with new page
    let newLeft = this.pages[this.selectedPage];
    this.handle.style.left = `${newLeft}px`;
  }

  _reset() {
    this.maxPage = 0;
    this.selectedPage = 0;
    this.width = this.offsetWidth;
    this.searchResults = [];
    this.isMoving = false;
  }

  _calculatePages() {
    let trackRect = this.track.getBoundingClientRect();
    this.pageWidth = trackRect.width / this.maxPage;
    this.pages = Array.from({ length: (this.maxPage+1) }, (_, i) => i * this.pageWidth);
  }

  _onResize(e) {
    this.width = this.offsetWidth || 1;
    this._calculatePages();
    this.updateSearchResults(this.searchResults);
    this.handle.style.left = `${this.pages[this.selectedPage]}px`;  
  }

  _onMoveStart(e) {
    this.isMoving = true;
    this.moveStart = {
      x : e.clientX,
      left : this.handle.offsetLeft
    }
  }

  _onClickTrack(e) {
    this.isMoving = true;
    this._onMove(e);
    this._onMoveEnd(e);
  }

  _onMove(e) {
    if( !this.isMoving ) return;
    
    let trackRect = this.track.getBoundingClientRect();
    let clientX = e.touches?.length ? e.touches[0].clientX : e.clientX;
    let newLeft = clientX - trackRect.left;

    let pageIncrement = this.BookReaderModel.store?.data?.state?.selectedView === 'double' ? 2 : 1;

    // update handle position (between 0 and max track width)
    newLeft = Math.max(0, Math.min(newLeft, trackRect.width));

    // calc new selected page
    let newPage = Math.round((newLeft / trackRect.width) * this.maxPage);
    if( newPage !== this.selectedPage ) {
      this.selectedPage = newPage;
    }

    let closestPage = this.pages.reduce((prev, curr) => 
      Math.abs(curr - newLeft) < Math.abs(prev - newLeft) ? curr : prev
    );

    // if 2page mode, need to flip to odd pages only. if even page, need to flip to next page
    if( pageIncrement === 2 && this.selectedPage % 2 === 0 ) {
      let match = this.pages.findIndex(page => page === closestPage);
      this.selectedPage = match;
    }

    // update handle position
    this.handle.style.left = `${closestPage}px`;    
  }

  _onMoveEnd(e) {
    if( !this.isMoving ) return;

    // this._onMove(e);
    this.isDragging = false;
    this.isMoving = false;
    this.BookReaderModel.setPage(this.selectedPage);
  }

  updateSearchResults(searchResults=[]) {
    // update slider with indicators of matches
    let searchIndicatorsDiv = this.shadowRoot.querySelector('.search-indicators');
    if( !searchIndicatorsDiv ) return;

    searchIndicatorsDiv.innerHTML = '';
    this.searchResults = searchResults;

    // clear all event listeners
    let indicators = searchIndicatorsDiv.querySelectorAll('.indicator');
    (indicators || []).forEach(indicator => {
      indicator.removeEventListener('click');
    });

    searchResults.forEach((result, index) => {
      let pageNumber = result.page || 0;
      let indicator = document.createElement('div');
      indicator.classList.add('indicator');
      indicator.setAttribute('data-search-result', index);
      indicator.style.left = `${(this.pages[pageNumber-1] || 0) - 4}px`;

      let searchQuery = document.createElement('div');
      searchQuery.classList.add('search-query');

      let main = document.createElement('main');
      let mainText = result.text || '';
      if( mainText.indexOf('{{{') !== -1 && mainText.indexOf('}}}') !== -1 ) {
        mainText = mainText.replace('{{{', '<mark>').replace('}}}', '</mark>');
      }
      main.innerHTML = mainText;

      let footer = document.createElement('footer');
      footer.innerText = `Page ${pageNumber}`;

      searchQuery.appendChild(main);
      searchQuery.appendChild(footer);
      indicator.appendChild(searchQuery);

      // add event listener to click/touch of indicator
      indicator.addEventListener('click', e => {
        let pageIncrement = this.BookReaderModel.store?.data?.state?.selectedView === 'double' ? 2 : 1;
        if( pageIncrement === 2 && pageNumber % 2 === 0 ) {
          pageNumber -= 1;
        }
        this.BookReaderModel.setPage(pageNumber-1);
        
        let selectedSearchResult = parseInt(indicator.getAttribute('data-search-result')) || 0;
        this.BookReaderModel.setSelectedSearchResult(selectedSearchResult);
      });

      searchIndicatorsDiv.appendChild(indicator);
    });
  }

}

customElements.define('ucdlib-bookreader-slider', UcdlibBookreaderSlider);

/***/ }),

/***/ "./public/elements/components/bookreader/ucdlib-bookreader-slider.tpl.js":
/*!*******************************************************************************!*\
  !*** ./public/elements/components/bookreader/ucdlib-bookreader-slider.tpl.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "styles": () => (/* binding */ styles)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");


function styles() {
  const elementStyles = lit__WEBPACK_IMPORTED_MODULE_0__.css`
    :host {
      display: block;
    }

    .slider {
      display: block;
      position: relative;
      height: 20px;
      top: 25px;

      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently */
    }

    #track {
      position: relative;
      width: 100%;
      height: 8px;
      background-color: #ccc;
      border-radius: 10px;
      cursor: pointer;
    }

    #handle {
      background: #022851;
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%; 
      top: -5px;
      margin-left: -9px;
      z-index: 6;
      border: none;
    }

    .search-indicators {
      position: absolute;
    }

    .search-indicators .indicator {
      background-color: var(--color-aggie-gold);
      width: 8px;
      position: absolute;
      height: 17px;
      bottom: 6px;
      border-radius: 2px;
      display: inline-block;
      cursor: pointer;
    }

    .search-indicators .search-query {
      display: none;
    }

    .search-indicators .indicator:hover .search-query {
      display: block;
      position: absolute;
      left: -14px;
      bottom: 25px;
      width: 350px;
      max-width: 100vw;
      padding: 12px 14px;
      padding-bottom: 10px;
      color: #fff;
      background: #333;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      animation: fadeUp 0.2s;
      font-size: 0.9rem;
      cursor: pointer;
      z-index: 100;
    }

    .search-indicators .search-query footer {
      font-size: .8rem;
    }

    .search-indicators .search-query mark {
      color: #adaedc;
      font-weight: bold;
      background-color: #272958;
    }

    .label {
      width : 25px;
      font-size: 12px; 
      position: absolute;
      top: -22px;
      left: -2px;
      text-align: center;
      transform: scale(0);
      transition: transform 200ms linear;
      color: var(--default-primary-color);
    }

    .label[moving] {
      transform: scale(1);
    }

  `;

  return [elementStyles];
}

function render() { 
return lit__WEBPACK_IMPORTED_MODULE_0__.html`
  <div class="slider">
    <div class="search-indicators">
      <!-- <div class="search-query">
        <main>"Lean M. <mark>Davis</mark>, B.S.; E.H. Hagermann; Henry L. Hurst"</main>
        <footer>Page 45</footer>
      </div> -->
    </div>
    <div id="track" @click="${this._onClickTrack}">
      <div id="handle"  
        @mousedown="${this._onMoveStart}"
        @touchstart="${this._onMoveStart}">
        <div id="numberLabel" class="label" ?moving="${this.isMoving}">${this.selectedPage+1}</div>
     </div>
    </div>
  </div>

`;}

/***/ }),

/***/ "./public/elements/components/bookreader/ucdlib-bookreader.js":
/*!********************************************************************!*\
  !*** ./public/elements/components/bookreader/ucdlib-bookreader.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UcdlibBookreader)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _ucdlib_bookreader_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ucdlib-bookreader.tpl.js */ "./public/elements/components/bookreader/ucdlib-bookreader.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _ucdlib_bookreader_page_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ucdlib-bookreader-page.js */ "./public/elements/components/bookreader/ucdlib-bookreader-page.js");
/* harmony import */ var _ucdlib_bookreader_navbar_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ucdlib-bookreader-navbar.js */ "./public/elements/components/bookreader/ucdlib-bookreader-navbar.js");
/* harmony import */ var _lib_stores_CollectionStore_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../lib/stores/CollectionStore.js */ "./public/lib/stores/CollectionStore.js");
/* harmony import */ var _lib_stores_CollectionStore_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lib_stores_CollectionStore_js__WEBPACK_IMPORTED_MODULE_5__);








class UcdlibBookreader extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {
  
  static get properties() {
    return {
      book : { type: String },
      bookViewData : { type: Object },
      pages : { type: Array },
      page : { type: Number },
      view : { type: String },
      fullScreen : { type: Boolean },
      maxHeight : { type: Number, attribute: 'max-height' },
      fullscreen : { type: Boolean },
      zoom : { type: Number },
      offsetX : { type: Number },
      offsetY : { type: Number }
    }
  }

  static get styles() {
    return (0,_ucdlib_bookreader_tpl_js__WEBPACK_IMPORTED_MODULE_1__.styles)();
  }

  constructor() {
    super();
    this._injectModel('BookReaderModel');
    this.bookViewData = {};
    this.debug = false;

    // TODO: don't change from 0
    this.pageBuffer = 0;

    // make sure if you change this you update the css property --transition-duration
    // to HALF the value of this.animationTime
    this.animationTime = 0.5; // seconds

    this.fullscreen = false;

    this.zoom = 0;
    this.offsetX = 0;
    this.offsetY = 0;

    this.pages = [];

    this._onResize = this._onResize.bind(this);
    this._onMousedown = this._onMousedown.bind(this);
    this._onMouseup = this._onMouseup.bind(this);
    this._onMousemove = this._onMousemove.bind(this);
    
    this.render = _ucdlib_bookreader_tpl_js__WEBPACK_IMPORTED_MODULE_1__.render.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this._onResize);
    this.addEventListener('mousedown', this._onMousedown);
    this.addEventListener('touchstart', this._onMousedown);
    window.addEventListener('mousemove', this._onMousemove);
    window.addEventListener('touchmove', this._onMousemove, {passive: false});
    window.addEventListener('mouseup', this._onMouseup);
    window.addEventListener('touchend', this._onMouseup);
    window.addEventListener('mouseout', this._onMouseup);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._onResize);
    this.removeEventListener('mousedown', this._onMousedown);
    this.removeEventListener('touchstart', this._onMousedown);
    window.removeEventListener('mousemove', this._onMousemove);
    window.removeEventListener('touchmove', this._onMousemove);
    window.removeEventListener('mouseup', this._onMouseup);
    window.removeEventListener('touchend', this._onMouseup);
    window.removeEventListener('mouseout', this._onMouseup);
  }

  firstUpdated() {
    this.pagesEle = this.shadowRoot.querySelector('#single-page-scroll');
    this.rerender({full: true, animate: false});
  }

  updated(props) {
    if( props.has('maxHeight') ) {
      this._updateHeight();
    }
    if( props.has('bookViewData') || props.has('fullscreen') ) {
      this.rerender({full: true, animate: false});
    }
    if( props.has('bookViewData') ) {
      this.pages.forEach(page => page.ele.bookData = this.bookViewData);
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

    this.animating = e.animating;

    if( this.panEle &&
      (this.lastPan?.offsetX !== e.offsetX || 
      this.lastPan?.offsetY !== e.offsetY || 
      this.lastPan?.zoom !== e.zoom) ) {

      this.zoom = e.zoom || 0;
      this.offsetX = e.offsetX || 0;
      this.offsetY = e.offsetY || 0;
      this.panEle.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px) scale(${this.zoom})`;
      this.lastPan = {offsetX: e.offsetX, offsetY: e.offsetY, zoom: e.zoom};
    }

    this.setPage(e.selectedPage);
    this.setView(e.selectedView);
  }

  _updateHeight() {
    this.style.height = this.maxHeight+'px';
    this.shadowRoot.querySelector('#single-page').style.height = this.maxHeight+'px';
    this.rerender({full: true, animate: false});
  }


  /**
   * @method rerender
   * @description rerender the book reader.  This will update the current pages.  If the 
   * view or height has changed, use opts.full = true to recalculate all page sizes then
   * render the current pages.  Use opts.animate = false to disable animations.
   * 
   * @param {Object} opts
   * @param {Boolean} opts.full run full rerender, recalculating all page sizes
   * @param {Boolean} opts.animate animate transitions between pages (default true)
   * @returns 
   */
  rerender(opts={}) {
    if( !this.bookViewData?.pages ) return;
    if( !this.maxHeight ) return;
    if( this.page < 0 ) return;

    if( this.lastRendered &&
        this.lastRendered.view === this.view &&
        this.lastRendered.page === this.page &&
        this.lastRendered.maxHeight === this.maxHeight &&
        this.lastRendered.bookViewDataId === this.bookViewData.id &&
        this.lastRendered.width === this.offsetWidth &&
        this.lastRendered.full === opts.full &&
        this.lastRendered.fullscreen === this.fullscreen ) {
      return;
    }

    if( opts.full ) {
      this._renderAllPageSizes(opts);
    }

    this._renderCurrentPages(opts);

    // because pages (elements) are already in view, just there offset/size is
    // updated, we need to make sure the elements are poked to update 
    this.pages.forEach(page => page.ele._updatePageData());

    if( opts.full ) {
      // if single view, make sure we are scrolled to the current page
      if( this.view === 'single' && this.bookViewData.pages ) {
        setTimeout(() => {
          let currentPage = this.bookViewData.pages[this.page];
          if( currentPage ) {
            this.shadowRoot.querySelector('#single-page').scrollTop = currentPage.renderOffsetTopForScroll;
          }
        }, 10);
      }
    }

    // set pan/zoom ele
    if( this.view === 'single' ) {
      this.panEle = this.pages.find(page => page.index === this.page).ele;
    } else {
      this.panEle = this.shadowRoot.querySelector('#single-page');
    }

    this.lastRendered = {
      full: opts.full,
      view: this.view,
      page: this.page,
      maxHeight: this.maxHeight,
      width: this.offsetWidth,
      bookViewDataId: this.bookViewData.id,
      fullscreen: this.fullscreen
    }
  }

  /**
   * @method _renderAllPageSizes
   * @description render all pages based on view and size. updates page container
   * element as well.
   */
  _renderAllPageSizes() {
    if( this.fullscreen ) {
      this.style.height = '';
    }

    // render pages based on view and size
    let readerWidth = this.offsetWidth;
    let readerHeight = this.fullscreen ? (this.offsetHeight-80) : this.maxHeight;
    this.renderedHeight = readerHeight;

    let renderedMaxHeight = 0;
    let renderedWidthRatioMaxHeight = 0;
    let heightRatioCount = 0;


    this.bookViewData.pages.forEach(page => {
      if( this.view === 'single' ) {
        this._renderPageSizeSingle(readerHeight, readerWidth, page)
      } else if( this.view === 'double' ) {
        this._renderPageSizeDouble(readerHeight, readerWidth, page)
      }

      if( page.renderRatioDimension === 'height' || !page.isLandscape) {
        heightRatioCount++;
      }

      if( page.renderHeight > renderedMaxHeight ) {
        renderedMaxHeight = page.renderHeight;
      }
      if( page.isLandscape && page.renderHeight > renderedWidthRatioMaxHeight ) {
        renderedWidthRatioMaxHeight = page.renderHeight;
      }
    });

    if( heightRatioCount > 0 ) {
      let percentOver = heightRatioCount / this.bookViewData.pages.length;
      if( percentOver < 0.2 ) {
        renderedMaxHeight = renderedWidthRatioMaxHeight;
      }
    }

    // update the height of the page container based on the max page height since it's smaller
    // than the widget height
    if( !this.fullscreen && renderedMaxHeight && renderedMaxHeight < this.maxHeight ) {
      this.renderedHeight = renderedMaxHeight;

      this.bookViewData.pages.forEach(page => {
        if( this.view === 'single' ) {
          this._renderPageSizeSingle(renderedMaxHeight, readerWidth, page)
        } else if( this.view === 'double' ) {
          this._renderPageSizeDouble(renderedMaxHeight, readerWidth, page)
        }
      });
    }

    if( !this.fullscreen ) {
      this.style.height = this.renderedHeight+'px';
    }
    this.shadowRoot.querySelector('#single-page').style.height = this.renderedHeight+'px';

    if( this.view === 'single' && this.bookViewData?.pages) {
      this.shadowRoot.querySelector('#single-page-scroll').style.height = this.renderedHeight*this.bookViewData.pages.length+'px';
      this.shadowRoot.querySelector('#single-page-scroll').style.overflow = 'auto';
    } else {
      this.shadowRoot.querySelector('#single-page-scroll').style.height = this.renderedHeight+'px';
      this.shadowRoot.querySelector('#single-page-scroll').style.overflow = 'hidden';
    }
  }

  /**
   * @method _setPageDimensions
   * @description calculate the dimensions of a page based on given height and width
   * 
   * @param {*} readerHeight 
   * @param {*} readerWidth 
   * @param {*} page 
   */
  _setPageDimensions(readerHeight, readerWidth, page) {
    let width = page.width;
    let height = page.height;

    readerHeight = readerHeight - (this.pageBuffer*2);

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
    page.isLandscape = isLandscape;
  }

  /**
   * @method _renderPageSizeSingle
   * @description render top/left offset of a single page
   * 
   * @param {Number} readerHeight available height for page
   * @param {Number} readerWidth available width for page
   * @param {Object} page page object
   */
  _renderPageSizeSingle(readerHeight, readerWidth, page) {
    let realReaderHeight = readerHeight;
    this._setPageDimensions(readerHeight, readerWidth, page);
    page.renderOffsetTop = (realReaderHeight*page.displayIndex)+this.pageBuffer;
    page.renderOffsetTopForScroll = realReaderHeight*page.displayIndex;
    page.renderOffsetLeft = 0;

    if( page.renderRatioDimension === 'width' ) {
      page.renderOffsetTop += Math.floor((realReaderHeight - page.renderHeight) / 2)+this.pageBuffer;
    } else {
      page.renderOffsetLeft += Math.floor((readerWidth - page.renderWidth) / 2);
    }
  }

  /**
   * @method _renderPageSizeDouble
   * @description render top/left offset of a double page
   * 
   * @param {Number} readerHeight available height for page 
   * @param {Number} readerWidth available width for page
   * @param {Object} page page object
   */
  _renderPageSizeDouble(readerHeight, readerWidth, page) {
    // even pages are on the right
    // odd pages are on the left 
    let isRight = page.displayIndex % 2 === 0;

    this._setPageDimensions(readerHeight, readerWidth/2, page);
    page.renderOffsetTop = Math.floor((readerHeight - page.renderHeight) / 2);

    let midPoint = Math.floor(readerWidth/2);
    page.renderOffsetLeft = isRight ? midPoint : midPoint - page.renderWidth;
  }

  /**
   * @method setPage
   * @description set the current page to render
   * 
   * @param {Number} page 
   * @returns 
   */
  setPage(page) {
    if( this.page === page ) return;
    this.lastPage = this.page;
    this.page = page;

    // handle animation if we are only moving one page
    if( this.view === 'single' ) {
      let scrollTop = this.shadowRoot.querySelector('#single-page').scrollTop;
      let pageData = this.bookViewData.pages[page];

      if( pageData.renderOffsetTop < scrollTop || 
          pageData.renderOffsetTop+pageData.renderHeight > scrollTop+this.renderedHeight ) {
        
        if( Math.abs(page-this.lastPage) > 1 ) {
          this.shadowRoot.querySelector('#single-page').scrollTop = this.page * this.renderedHeight;
        } else {
          this.shadowRoot.querySelector('#single-page').scrollTo({
            top: this.page * this.renderedHeight, // Replace 500 with the vertical scroll position
            left: 0,
            behavior: 'smooth'
          });
        }
      }
    }

    this.rerender();
  }

  /**
   * @method setView
   * @description set the current view to render.  either 'single' or 'double'
   * 
   * @param {*} view 
   * @returns 
   */
  setView(view) {
    if( this.view === view ) return;
    this.view = view;

    // hide pages while we update size/position
    this.shadowRoot.querySelector('#single-page-scroll').style.display = 'none';

    // render current pages based on new view
    this.rerender({full: true, animate: false});

    // show pages now that they are updated
    this.shadowRoot.querySelector('#single-page-scroll').style.display = 'block';

    // if single view, make sure we are scrolled to the current page
    if( this.view === 'single' && this.bookViewData.pages ) {
      let currentPage = this.bookViewData.pages[this.page];
      this.shadowRoot.querySelector('#single-page').scrollTop = currentPage.renderOffsetTopForScroll;
    }
  }

  /**
   * @method _renderCurrentPages
   * @description render the current pages based on the current view and page.
   * This does not update the page sizes, only the ensures the current pages are
   * in view and have proper css classes/styles applied based on position.  Position/sizes
   * are determined by the _renderAllPageSizes method.
   * 
   * @param {Object} opts
   * @param {Boolean} opts.animate animate transitions between pages (default true) 
   * @returns 
   */
  _renderCurrentPages(opts={}) {
    if( !this.bookViewData.pages ) return;
    let currentPages = [];

    if( opts.animate === undefined ) {
      opts.animate = true;
    }

    if( this.view === 'single' ) {
      for( let i = this.page-2; i <= this.page+2; i++ ) {
        if( i < 0 || i >= this.bookViewData.pages.length ) {
          continue;
        }
        currentPages.push(i);
        let pageEle = this.pages.find(p => p.index === i);
        if( pageEle ) {
          pageEle.ele.className = '';
          pageEle.ele.style.transform = '';
          continue;
        }

        let ele = document.createElement('ucdlib-bookreader-page');
        ele.setAttribute('page', i);
        ele.bookData = this.bookViewData;
        ele.debug = this.debug;
        ele.buffer = this.pageBuffer;
        ele.animating = this.animating;
        this.pagesEle.appendChild(ele);
        this.pages.push({index: i, ele});
      }

      
    } else if( this.view === 'double' ) {
      let isEven = this.page % 2 === 0;

      // check if this should be animated
      let visiblePages = [];
      let nextPages = [];
      let prevPages = [];
      if( this.lastPage % 2 === 0 ) {
        visiblePages = [this.lastPage-1, this.lastPage];
        nextPages = [this.lastPage+1, this.lastPage+2];
        prevPages = [this.lastPage-2, this.lastPage-3];
      } else {
        visiblePages = [this.lastPage, this.lastPage+1];
        nextPages = [this.lastPage+2, this.lastPage+3];
        prevPages = [this.lastPage-1, this.lastPage-2];
      }
      

      let isAnimateNext = nextPages.includes(this.page);
      let isAnimatePrev = prevPages.includes(this.page);

      let cssOrder = [
        ['page-left-prev'],
        ['page-right-prev'],
        ['page-left'],
        ['page-right'],
        ['page-left-next'],
        ['page-right-next']
      ]

      if( (isAnimateNext || isAnimatePrev) && opts.animate) {
        this._animateDoublePage({isAnimateNext, isAnimatePrev, cssOrder});
        return;
      }

      // right page
      if( isEven ) {
        for( let i = this.page-3; i <= this.page+2; i++ ) {
          currentPages.push(i);
        }
      // left page
      } else {
        for( let i = this.page-2; i <= this.page+3; i++ ) {
          currentPages.push(i);
        }
      }

      let cssIndex = 0;
      currentPages.forEach(i => {
        if( i < 0 || i >= this.bookViewData.pages.length ) {
          cssIndex++;
          return;
        }
        let pageEle = this.pages.find(p => p.index === i);
        if( pageEle ) {
          this._updateCss(pageEle.ele, cssOrder[cssIndex]);
          pageEle.cssIndex = cssIndex;
          pageEle.ele.style.transform = '';
          return cssIndex++;
        }

        let ele = document.createElement('ucdlib-bookreader-page');
        ele.setAttribute('page', i);
        this._updateCss(ele, cssOrder[cssIndex]);
        ele.bookData = this.bookViewData;
        ele.debug = this.debug;
        ele.buffer = this.pageBuffer;
        ele.animating = this.animating;
        this.pagesEle.appendChild(ele);
        this.pages.push({
          index: i, 
          ele, 
          cssIndex,
          isNext : cssOrder[cssIndex].includes('next'),
          isPrev : cssOrder[cssIndex].includes('prev')
        });
        cssIndex++;
      });
    }

    for( let i = this.pages.length-1; i >= 0; i-- ) {
      let page = this.pages[i];
      if( currentPages.indexOf(page.index) === -1 ) {
        page.ele.remove();
        this.pages.splice(i, 1);
      }
    }
  }

  /**
   * @method _animateDoublePage
   * @description animate the transition between double pages.  This will add css classes
   * to the current pages to animate them out of view.
   * 
   * @param {Object} props
   * @param {Boolean} props.isAnimateNext is the next page being animated
   * @param {Boolean} props.isAnimatePrev is the prev page being animated
   * @param {Array} props.cssOrder array of css classes to apply to each page 
   */
  _animateDoublePage(props) {
    this.BookReaderModel.setAnimating(true);

    setTimeout(() => {
      this.logger.info('animate double page start', props);
      if( props.isAnimateNext ) {
        props.cssOrder.forEach(css => css.push('animate-next-start'));
      } else if( props.isAnimatePrev ) {
        props.cssOrder.forEach(css => css.push('animate-prev-start'));
      }

      this.pages.forEach(page => {
        this._updateCss(page.ele, props.cssOrder[page.cssIndex]);
      });

      
      setTimeout(() => {
        this.logger.info('animate double page middle', props);
        this.pages.forEach(page => {
          if( props.isAnimateNext ) {
            page.ele.classList.remove('animate-next-start');
            page.ele.classList.add('animate-next-end');
          } else if( props.isAnimatePrev ) {
            page.ele.classList.remove('animate-prev-start');
            page.ele.classList.add('animate-prev-end');
          }
        });

        setTimeout(() => {
          this.logger.info('animate double page end', props);
          this._renderCurrentPages({animate: false});
          this.BookReaderModel.setAnimating(false);
        }, (this.animationTime/2)*1000);
      }, (this.animationTime/2)*1000);
    }, 25);
  }

  /**
   * @method _updateCss
   * @description helper for updating css classes on an element.
   * Clears all classes and adds the given list.
   * 
   * @param {Element} ele 
   * @param {Array} classList 
   */
  _updateCss(ele, classList) {
    ele.classList = '';
    classList.forEach(name => ele.classList.add(name));
  }

  // _onScroll(e) {
  //   if( this.view !== 'single' ) return;

  //   if( this.scrollTimeout ) {
  //     return;
  //   }
    
  //   this.scrollTimeout = setTimeout(() => {
  //     this.scrollTimeout = null;
  //     this._updatePageFromScroll();
  //   }, 200);
  // }

  _onResize() {
    if( this.resizeTimeout ) {
      return;
    }
    
    this.resizeTimeout = setTimeout(() => {
      this.resizeTimeout = null;
      this.rerender({full: true, animate: false});
    }, 100);
  }

  // _updatePageFromScroll() {
  //   let scrollTop = this.shadowRoot.querySelector('#single-page').scrollTop;
  //   let page = Math.round(scrollTop / this.height);
  
  //   if( this.page === page ) return;
  //   // cheat.  this will trick the setPage method into not scrolling
  //   this.page = page;
  //   this._renderCurrentPages({animate: false});
  //   this.BookReaderModel.setPage(page);
  //   this.logger.info('change page from scroll', {current: this.page, to: page});
  // };

  updateSearchResults(searchResults=[]) {
    let nav = this.shadowRoot.querySelector('ucdlib-bookreader-navbar');
    if( nav ) nav.updateSearchResults(searchResults);
  }

  _onMousedown(e) {
    if( !this.fullscreen ) return;
    if( this.pan ) return;

    let {clientX, clientY} = e;
    if( !clientX && e.touches && e.touches.length  ) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    this.pan = {
      startX: clientX,
      startY: clientY,
      offsetXStart: this.offsetX,
      offsetYStart: this.offsetY
    }
  }

  _onMouseup(e) {
    if( !this.pan ) return;
    this.pan = null;
  }

  _onMousemove(e) {
    if( !this.pan ) return;

    try {
      e.preventDefault();
    } catch(e) {}

    if( e.touches && e.touches.length > 1 && !this.pan.touchZoom ) {
      this.pan.touchZoom = {
        startZoom: this.BookReaderModel.store.data.state.zoomIndex,
        startXDiff: Math.abs(e.touches[0].clientX - e.touches[1].clientX),
        startYDiff: Math.abs(e.touches[0].clientY - e.touches[1].clientY)
      }
    }

    if( this.pan.touchZoom ) {
      // ignore zoom if only 1 touch
      if( e.touches && e.touches.length <= 1  ) {
        this.pan.touchZoom = null;
        return;
      }
      let newYDiff = Math.abs(e.touches[0].clientY - e.touches[1].clientY);
      let newXDiff = Math.abs(e.touches[0].clientX - e.touches[1].clientX);

      let deltaX = newXDiff - this.pan.touchZoom.startXDiff;
      let deltaY = newYDiff - this.pan.touchZoom.startYDiff;
      let zoom = this.pan.touchZoom.startZoom + (Math.floor((deltaX + deltaY) / 100) );
      this.BookReaderModel.setZoom(zoom);
      return;
    }

    let {clientX, clientY} = e;
    if( !clientX && e.touches && e.touches.length  ) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    let deltaX = clientX - this.pan.startX;
    let deltaY = clientY - this.pan.startY;
    let offsetX = this.pan.offsetXStart + deltaX;
    let offsetY = this.pan.offsetYStart + deltaY;
    this.BookReaderModel.setPan(offsetX, offsetY);
  }
}

customElements.define('ucdlib-bookreader', UcdlibBookreader);

/***/ }),

/***/ "./public/elements/components/bookreader/ucdlib-bookreader.tpl.js":
/*!************************************************************************!*\
  !*** ./public/elements/components/bookreader/ucdlib-bookreader.tpl.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "styles": () => (/* binding */ styles)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");


function styles() {
  const elementStyles = lit__WEBPACK_IMPORTED_MODULE_0__.css`
    :host {
      display: block;
    }

    ucdlib-bookreader-slider,
    ucdlib-bookreader-navbar {
      width: 60%;
      margin: 0 auto;
    }

    :host([fullscreen]) {
      background-color: white;
      position: fixed;
      padding: 0px;
      margin: 0px;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      height: calc(100vh-3.5em);
      z-index: 3000;
    }

    #single-page {
      overflow: hidden;
      position: relative;
    }

    /* #single-page[fullscreen] {
      overflow: auto;
    } */

    #single-page-scroll {
      position: relative;
    }
    
    #single-page ucdlib-bookreader-page {
      position: absolute;
    }

    ucdlib-bookreader-navbar {
      width: 60%;
      margin: 0 auto;
    }

    ucdlib-bookreader-navbar[fullscreen] {
      position: absolute;
      z-index: 4000;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      background: var(--color-aggie-blue-30);
      padding: .5rem 0;
    }

    /* ucdlib-bookreader-navbar[fullscreen] .br-nav-bar {
      width: 97%;
      margin: 0 auto;
    } */

    @media (max-width: 767px) {
      ucdlib-bookreader-slider,
      ucdlib-bookreader-navbar {
        width: 90%;
      }
    }
    
  `;

  return [elementStyles];
}

function render() { 
return lit__WEBPACK_IMPORTED_MODULE_0__.html`

  <div id="page-container">
    <div id="single-page" 
      ?fullscreen="${this.fullscreen}" 
      >
      <div id="single-page-scroll"></div>
    </div>
    <!-- <div id="double-page" ?hidden="${this.view !== 'double'}"> 
    </div> -->
  </div>
  <ucdlib-bookreader-navbar ?fullscreen="${this.fullscreen}"></ucdlib-bookreader-navbar>
`;}

/***/ }),

/***/ "./public/elements/components/citation.js":
/*!************************************************!*\
  !*** ./public/elements/components/citation.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Citation": () => (/* binding */ Citation)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _citation_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./citation.tpl.js */ "./public/elements/components/citation.tpl.js");
/* harmony import */ var _lib_models_CitationsModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/models/CitationsModel */ "./public/lib/models/CitationsModel/index.js");
/* harmony import */ var _utils_app_toast_popup_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/app-toast-popup.js */ "./public/elements/utils/app-toast-popup.js");







/**
 * @class Citation
 * @description Styleized UI component for Citations
 */
class Citation extends lit__WEBPACK_IMPORTED_MODULE_0__.LitElement {
  static get properties() {
    return {
      // count : {type : String},
      // choices: { type : Array },
      record: {type : Object},
      recordId: {type : String},
      citations : {type : Array},
      selectedCitation : {type : Object},
      citationTypeLabel : {type : String, attribute : 'citation-type-label'}
    };
  }

  constructor() {
    super();
    this.render = _citation_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.active = true;
    
    this.record = {};
    this.recordId = '';
    this.citations = [];
    this.selectedCitation = {};
    this.citationTypeLabel = 'Collection';
    
  }

  async updated() {
    if( !Object.keys(this.record || {}).length || ( this.citations.length && this.recordId === this.record['@id']) ) return;

    this.recordId = this.record['@id'];
    let newCitations = [];

    newCitations.push({
      type : 'mla',
      text : await _lib_models_CitationsModel__WEBPACK_IMPORTED_MODULE_2__["default"].renderEsRecord(this.record, 'mla')
    });
    newCitations.push({
      type : 'apa',
      text : await _lib_models_CitationsModel__WEBPACK_IMPORTED_MODULE_2__["default"].renderEsRecord(this.record, 'apa')
    });
    newCitations.push({
      type : 'chicago',
      text : await _lib_models_CitationsModel__WEBPACK_IMPORTED_MODULE_2__["default"].renderEsRecord(this.record, 'chicago')
    });

    this.citations = newCitations;
    this.selectedCitation = newCitations.filter(c => c.type === 'apa')[0];
  }

  _citeChange(e) {
    this.selectedCitation = this.citations.filter(c => c.type === e.target.value)[0];
  }

  async _copyCiteText(e) {
    try {
      await navigator.clipboard.writeText(this.shadowRoot.querySelector('.csl-entry').innerHTML);
      let toastPopup = this.shadowRoot.querySelector('app-toast-popup');
      if( toastPopup ) toastPopup.showPopup();
    } catch (err) {
      this.logger.error('Failed to copy citation: ', err);
    }
  }

}

customElements.define('app-citation', Citation);


/***/ }),

/***/ "./public/elements/components/citation.tpl.js":
/*!****************************************************!*\
  !*** ./public/elements/components/citation.tpl.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var lit_directives_unsafe_html_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit/directives/unsafe-html.js */ "./public/node_modules/lit/directives/unsafe-html.js");
/* harmony import */ var _utils_shared_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/shared-html */ "./public/elements/utils/shared-html.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/shared-styles */ "./public/elements/styles/shared-styles.js");
/* harmony import */ var _ucd_lib_theme_sass_1_base_html_links_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ucd-lib/theme-sass/1_base_html/_links.css */ "./public/node_modules/@ucd-lib/theme-sass/1_base_html/_links.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_buttons_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_buttons.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_buttons.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_headings_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_headings.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_headings.css.js");




// import sharedStylesCss from "../styles/shared-styles";


// import { classMap } from 'lit/directives/class-map';
// import { styleMap } from 'lit/directives/style-map';





function render() { 
return lit__WEBPACK_IMPORTED_MODULE_0__.html`
<style>
  ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_3__.sharedStyles}
  ${_ucd_lib_theme_sass_1_base_html_links_css__WEBPACK_IMPORTED_MODULE_4__["default"]}
  ${_ucd_lib_theme_sass_2_base_class_buttons_css__WEBPACK_IMPORTED_MODULE_5__["default"]}
  ${_ucd_lib_theme_sass_2_base_class_headings_css__WEBPACK_IMPORTED_MODULE_6__["default"]}
  
  :host {
    display: block;
    position: relative;
    background-color: var(--super-light-background-color);
  }

  .citation {
      background-color: var(--color-aggie-blue-30);
      display: flex;
      width: 100vw;
    }

    .citation .btn-copy {
      background-color: var(--color-aggie-gold);
      cursor: pointer;
      border: none;
      min-height: 1.4rem;
      height: 1.4rem;
    }

    .citation .btn-copy:hover {
      background-color: var(--color-aggie-blue);
      color: var(--color-aggie-gold);
    }

    .citation .btn-apa {
      background-color: var(--color-aggie-blue-50);
      margin-right: .5rem;
      min-width: 8ch;
      font-size: 1rem;

      /* arrow styles */
      display: inline-block;
      margin: 0;      
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-appearance: none;
      -moz-appearance: none;      
      background-image:
        linear-gradient(45deg, transparent 50%, var(--color-aggie-blue) 50%),
        linear-gradient(135deg, var(--color-aggie-blue) 50%, transparent 50%),
        linear-gradient(to right, #ccc, #ccc);
      background-position:
        calc(100% - 20px) calc(1em + 2px),
        calc(100% - 15px) calc(1em + 2px),
        calc(100% - 2.5em) 0.5em;
      background-position-y: center;
      background-size:
        5px 5px,
        5px 5px,
        1px 1.5em;
      background-repeat: no-repeat;
      outline: 0;
      padding-right: 1.5rem;
      margin-right: .7rem;
      text-align: left;
    }

    .cite-graphic {
      margin: auto;
      width: 33%;
      margin-top: 1rem;
    }

    .citation .header-dots {
      margin: 0;
      align-items: start;
      padding-bottom: 1.25rem;
      padding-top: .25rem;
    }

    .cite-collection {
      margin: auto;
      width: 67%;
      padding: 2rem;
      overflow-wrap: break-word;
    }

    .cite-collection h2,
    .collection-highlights h2 {
      margin-bottom: 1rem;
      font-weight: 600;
      color: var(--default-primary-color);
      margin-top: 0.5rem;
    }

    .cite-collection p {
      margin-bottom: 3rem;
      margin-top: 0;
    }

    @media (max-width: 756px) {
      .cite-collection {
        width: 85%;
      }
    }

    @media (max-width: 600px) {
      .citation {
        display: block;
        padding: 2rem 0;
      }

      .cite-graphic {
        width: 70%;
      }

      .cite-collection {
        /* padding-top: 0; */
        width: 95%;
        padding: 1rem;
      }

      .cite-collection h2 { 
        font-weight: 800;
        font-size: 1.7rem;
      }

      .citation-text {
        font-size: 1.1rem;
        line-height: 1.7;
      }
    }

</style>
<div class="citation">
  <div class="cite-graphic">
    <img src="/images/watercolors/citation-watercolor-800px-landscape.png" width="100%" alt="cite this collection image" />
  </div>
  <div class="cite-collection">
    <h2>Cite This ${this.citationTypeLabel}</h2>

    ${ _utils_shared_html__WEBPACK_IMPORTED_MODULE_2__["default"].headerDots() }

    <p class="citation-text">
      ${(0,lit_directives_unsafe_html_js__WEBPACK_IMPORTED_MODULE_1__.unsafeHTML)(this.selectedCitation.text)}
    </p>

    <div style="display: flex;">
      <select class="btn btn-apa" @change="${this._citeChange}">
        <option value="apa">APA</option>
        <option value="mla">MLA</option>
        <option value="chicago">Chicago</option>
      </select>
      <div class="btn btn-copy" @click="${this._copyCiteText}">Copy Text</div>
    </div>
  </div>
  <app-toast-popup></app-toast-popup>
</div>
`;}


/***/ }),

/***/ "./public/elements/pages/record/app-fs-media-download.js":
/*!***************************************************************!*\
  !*** ./public/elements/pages/record/app-fs-media-download.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppFsMediaDownload)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_fs_media_download_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-fs-media-download.tpl.js */ "./public/elements/pages/record/app-fs-media-download.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _viewer_app_fs_viewer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./viewer/app-fs-viewer */ "./public/elements/pages/record/viewer/app-fs-viewer.js");







class AppFsMediaDownload extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {

  static get properties() {
    return {
      mode : {type: String}
    }
  }

  constructor() {
    super();
    this.render = _app_fs_media_download_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.mode = 'single'

    this._injectModel('AppStateModel');
  }

  async firstUpdated() {
    this.fsViewer = this.shadowRoot.querySelector('app-fs-viewer');
    this._onAppStateUpdate(await this.AppStateModel.get());
  }

  _onAppStateUpdate(e) {
    this.selectedRecord = e.selectedRecord;
    this.selectedRecordMedia = e.selectedRecordMedia;
  }

  _toggleMultipleDownload(e) {
    this.mode = e.currentTarget.id;
  }

  _onDownloadClicked(e) {
    if( e.type === 'keyup' && e.which !== 13 ) return;

    if( this.mode === 'single' ) {
      this.fsViewer.show();
    } else {
      if( this.selectedRecordMedia.clientMediaDownload ) {
        let url = this.selectedRecordMedia.clientMediaDownload;
        if( Array.isArray(url) ) url = url[0];
        if( typeof url === 'object' ) url = url['@id'];
        url = '/fcrepo/rest/'+url;
        open(url, '_blank');
      } else {
        let url = '/api/zip/bag-of-files'+this.selectedRecordMedia['@id'];
        open(url, '_blank');
      }
    }
  }

  _renderDownloadBtn(mode) {
    if( this.mode === 'single' ) {
      return lit__WEBPACK_IMPORTED_MODULE_0__.html`<iron-icon icon='file-download'></iron-icon> Browse for file`;
    } else {
      return lit__WEBPACK_IMPORTED_MODULE_0__.html`<iron-icon icon='file-download'></iron-icon> Download Archive`;
    }
  }
}

customElements.define('app-fs-media-download', AppFsMediaDownload);


/***/ }),

/***/ "./public/elements/pages/record/app-fs-media-download.tpl.js":
/*!*******************************************************************!*\
  !*** ./public/elements/pages/record/app-fs-media-download.tpl.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");


function render() { 
return lit__WEBPACK_IMPORTED_MODULE_0__.html`

<style>
  :host {
    display: block;
  }

  .layout {
    display:flex; 
    align-items: center;
  }

  .layout.btns > * {
    width: 33%
  }

  .radio {
    margin-bottom: 10px;
  }

  a {
    cursor: pointer;
    display: inline-block;
    padding: 8px 12px 8px 8px;
    color : var(--default-primary-color);
    background-color : var(--default-secondary-color);
    text-transform: uppercase;
    font-size: var(--fs-sm);
    font-weight: var(--fw-bold);
    text-decoration: none;
    white-space: nowrap;
    height: 24px;
  }
  a iron-icon {
    vertical-align: middle;
  }
</style> 

<div id="wrapper">
  <div class="layout">
    <div class="radio" style="margin-right: 40px">
      <input id="single" type="radio" name="set-fs-dl-type" checked @click="${this._toggleMultipleDownload}" /> 
      <label for="single">Single</label>
    </div>
    <div class="radio">
      <input id="archive" type="radio" name="set-fs-dl-type" @click="${this._toggleMultipleDownload}"/> 
      <label for="archive">Archive</label>
    </div>
  </div>
</div>

<a id="downloadBtn" @click="${this._onDownloadClicked}" @keyup="${this._onDownloadClicked}" tabindex="0">
  ${this._renderDownloadBtn(this.mode)}
</a>

<app-fs-viewer></app-fs-viewer>

`;}

/***/ }),

/***/ "./public/elements/pages/record/app-media-download.js":
/*!************************************************************!*\
  !*** ./public/elements/pages/record/app-media-download.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppMediaDownload)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_media_download_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-media-download.tpl.js */ "./public/elements/pages/record/app-media-download.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/config */ "./public/lib/config.js");
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_config__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../lib/utils */ "./public/lib/utils/index.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lib_utils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bytes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bytes */ "./public/node_modules/bytes/index.js");
/* harmony import */ var bytes__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bytes__WEBPACK_IMPORTED_MODULE_5__);










class AppMediaDownload extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement).with(
  _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils
) {
  static get properties() {
    return {
      defaultImage : { type: Boolean },
      formats : { type: Array },
      sources : { type: Array },
      href : { type: String },
      archiveHref : { type: String },
      imageSizes : { type: Array },
      hasMultipleDownloadMedia : { type: Boolean },
      selectedMediaHasSources : { type: Boolean },
      fullSetCount : { type: Boolean },
      fullSetSelected : { type: Boolean },
      downloadOptions : { type: Array },
      showImageFormats : { type: Boolean },
      selectedRecordMedia : { type: Object },
      isMultimedia : { type: Boolean },
      showDownloadLabel : { type: Boolean },
      zipConcatenatedPaths : { type: String },
      isTwoPageView : { type: Boolean },
      downloadAllMedia : { type: Boolean },
      isBookreader : { type: Boolean },
      disableDownload : { type: Boolean }
    };
  }

  constructor() {
    super();

    this.render = _app_media_download_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
   
    this._reset();

    this._injectModel(
      "AppStateModel",
      "MediaModel",
      "CollectionModel",
      "BookReaderModel"
    );
  }

  async firstUpdated() {
    let selectedRecord = await this.AppStateModel.getSelectedRecord();
    if (selectedRecord) this._onSelectedRecordUpdate(selectedRecord);    
  }

  _reset() {
    this.active = true;

    this.defaultImage = true;
    this.formats = [];
    this.sources = [];
    this.href = "";
    this.archiveHref = "";
    this.imageSizes = [];
    this.hasMultipleDownloadMedia = false;
    this.selectedMediaHasSources = true;
    this.fullSetCount = 0;
    this.fullSetSelected = false;
    this.downloadOptions = [];
    this.showImageFormats = false;
    this.selectedRecordMedia = {};
    this.isMultimedia = false;
    this.zipConcatenatedPaths = "";
    this.isTwoPageView = false;
    this.downloadAllMedia = false;
    this.isBookreader = false;
    this.disableDownload = APP_CONFIG.disableFileDownloads;
  }

  _onAppStateUpdate(e) {
    if( e.location.page !== 'item' ) this._reset();
  }

  _onSelectedRecordUpdate(record) {
    if( !record ) return;

    let { graph, clientMedia, selectedMedia, selectedMediaPage } = record;    

    this.firstLoad = graph.root?.id !== this.rootRecord?.id ? true : false;

    this.rootRecord = graph.root;
    this.selectedMedia = selectedMedia;
    this.clientMedia = clientMedia;
    this.graphIndex = graph.index;
    this.selectedMediaPage = selectedMediaPage;

    this.sources = this._getDownloadSources();

    // set single/zip download hrefs
    this._setDownloadHref(this.sources);

    this.hasMultipleDownloadMedia = this.sources.length > 1;
    if( this.firstLoad && this.hasMultipleDownloadMedia ) {
      this.shadowRoot.querySelector("#single").checked = true;
      this.shadowRoot.querySelector("#fullset").checked = false;
      this.fullSetSelected = false;
    }

    if( this.sources.length === 0 ) {
      this.selectedMediaHasSources = false;
      return;
    }

    this.selectedMediaHasSources = true;
    this.fullSetCount = this.sources.length;

    this._onSelectedRecordMediaUpdate(selectedMedia)
  }

  _onSelectedRecordMediaUpdate(media) {
    this.selectedRecordMedia = media;
    this.downloadOptions = [this.selectedRecordMedia];
    this.isMultimedia = this.downloadOptions[0]?.fileFormat?.includes('video');
    let pdf;

    if( this.isMultimedia ) {
      this.fullSetSelected = false;
      let download = this.downloadOptions[0];
      this.shadowRoot.querySelector("#multimedia-format-label").innerHTML = download.fileFormatSimple + ' (' + bytes__WEBPACK_IMPORTED_MODULE_5___default()(download.fileSize).toLowerCase() + ')';
      this.showImageFormats = false;

      // update all label to include video + other media (prob just thumbnail)
      // multimedia-all-format-label
      let filesize = this.sources.reduce((a, r) => a + r.fileSize, 0);
      // let fileTypes = this.sources.map(s => s.url?.split('.')?.pop()).join(', ');
      let label = 'video (' + bytes__WEBPACK_IMPORTED_MODULE_5___default()(filesize).toLowerCase() + ')';
      this.shadowRoot.querySelector("#multimedia-all-format-label").innerHTML = label;

    } else {
      // check if the only main source with pages is pdf,
      // if so then just show archive download options instead of single page
      let imageList = this.clientMedia.mediaGroups.filter(m => m['@shortType'].includes('ImageList'))[0];
      pdf = this.clientMedia.mediaGroups.filter(m => m.clientMedia?.pdf && 
                                                         m.clientMedia?.pages?.length && 
                                                         m.clientMedia?.download?.[0]?.label === 'pdf')[0];

      if( !imageList && pdf ) {
        this.showDownloadLabel = true;
        // this._noSinglePageDownload();
        this._renderDownloadAllFormats();
        this._renderDownloadSingleFormat();
        return;
      }
    }

    this._renderDownloadAllFormats();
    this._renderDownloadSingleFormat();

    if( pdf && !this.isMultimedia && this.firstLoad ) {
      this._toggleMultipleDownload(null, true);
    }
  }

  /**
   * @method _onBookreaderStateUpdate
   * @description bookreader state update event handler
   * 
   * @param {Object} e bookreader state update event
   */
  _onBookreaderStateUpdate(e) {
    if( this.AppStateModel.location.page !== 'item' ) return;

    this.isBookreader = true;
    let pageNumber = e.selectedPage + 1;
    let onePageMode = e.selectedView === 'single';
    let pages;
    let imageList = this.clientMedia.mediaGroups.filter(m => m['@shortType'].includes('ImageList'))[0];

    if( imageList ) {
      pages = imageList.clientMedia?.pages || [];
    } else {
      pages = this.selectedMedia?.clientMedia?.pages || [];
    }

    if( !pages || !pages.length ) return;

    if( onePageMode || pageNumber === 1 ) {
      // single image download
      let href = pages[pageNumber - 1]?.download?.url;  
      this.isTwoPageView = false;
      this.href = href || '';
      this._renderDownloadSingleFormat();
  
    } else {
      // 2 page image download
      this.isTwoPageView = true;      

      // if switching from single to two page view on odd page, selected page is the second page in the displayed bookreader view
      let startIndex = pageNumber % 2 !== 0 ? pageNumber - 2 : pageNumber - 1;

      // set download href to 2 pages for archive download option
      let image1 = pages[startIndex]?.download?.url?.replace('/fcrepo/rest', '');
      let image2 = pages[startIndex + 1]?.download?.url?.replace('/fcrepo/rest', '');
      let urls = [];
      if( image1 ) urls.push(image1);
      if( image2 ) urls.push(image2);
      if( urls.length && !this.fullSetSelected ) {
        this._setZipPaths(urls);
      }
      this._renderDownloadSingleFormat(true);      
    }
  }

  _noSinglePageDownload() {
    this.zipName = this.rootRecord.name
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();
    this.archiveHref = '/fin/archive?paths=' + this.sources.map(s => s.url.replace('/fcrepo/rest', '')).join(',') + (this.zipName ? '&name='+this.zipName : '');

    this.downloadAllMedia = true;
    let formats = [];
    this.sources.forEach((source) => {
      let format = source.url.split('.').pop();
      if( !formats.includes(format) ) {
        formats.push(format);
      }
    });

    this.shadowRoot.querySelector("#media-format-label").innerHTML = 'image' + ' (' + formats.join(', ') + ')';
  }

  /**
   * @method _getDownloadSources
   * @description get all client media download sources
   *
   * @returns {Array} sources 
   */
  _getDownloadSources() {
    let sources = [];
    this.clientMedia.mediaGroups.forEach((media) => {
      if( media.clientMedia?.download ) {
        media.clientMedia.download.forEach((download) => {
          sources.push(download);
        });
      }
    });
    return sources;
  }

  /**
   * @method _setDownloadHref
   * @description set the download sourceType and href for single and fullset download options
   * @param {Array} sources the download source(s)
   */
  _setDownloadHref(sources=[]) {
    if (!sources.length) return;
    
    this.href = '';
    this.archiveHref = '';

    if( this.disableDownload ) return;

    let imageList = this.clientMedia.mediaGroups.filter(m => m['@shortType'].includes('ImageList'))[0];
    let firstMediaDownload = this.clientMedia.mediaGroups[0]?.clientMedia?.download?.[0]?.url;

    if( this.fullSetSelected || this.isTwoPageView ) {
      // build zip download url
      this.zipName = this.rootRecord.name
        .replace(/[^a-zA-Z0-9]/g, "-")
        .toLowerCase();
      this.archiveHref = '/fin/archive?paths=' + sources.map(s => s.url.replace('/fcrepo/rest', '')).join(',') + (this.zipName ? '&name='+this.zipName : '');
    } else if( this.AppStateModel.location.fullpath === this.rootRecord['@id'] ) {
      // first image from imageList if exists, or mediaObject first download
      this.href = imageList?.clientMedia?.download?.[0]?.url || firstMediaDownload;
    } else {
      // get image from selected page
      let page = this.selectedMediaPage || 0;

      // pull page from pdf if no imagelist
      let url = '';
      let imageUrl = this.AppStateModel.location.fullpath.replace(/:\d+$/, ''); // scrub :pageNumber suffix
      if( !imageList ) {
        let media = this.clientMedia.mediaGroups?.find(mg => mg['@id'] === imageUrl)?.clientMedia;
        if( media?.pages ) {
          url = media.pages[page-1]?.original?.url || media.pages[page-1]?.large?.url;
        }
      }

      this.href = imageList?.clientMedia?.download?.[page]?.url || url || firstMediaDownload;
    }
  }

  /**
   * @method _renderDownloadSingleFormat
   * @private
   * @description render image formats for single page images, ie "Image (png)"
   * 
   * @param {Boolean} multipage if true, then render for 2 pages (combine file sizes)
   */
  _renderDownloadSingleFormat(multipage=false) {
    let formats = [];
    let singlePdf = false;
    let multiImageSize = 0;
    this.sources.forEach((source) => {
      let format = source.label || source.url.split('.').pop();
      // if( formats.includes(format) ) {
      // } else 
      if( !formats.includes(format) && format !== 'pdf') {
        formats.push(format);
      }
      if( format === 'pdf' ) {
        singlePdf = true;
      }
      if( multipage ) {
        if( this.archiveHref.indexOf(source.url?.split('/fcrepo/rest')?.[1]) > -1 ) multiImageSize += source.fileSize;
      }
    });
  
    if( singlePdf && formats.length > 0 ) singlePdf = false; 

    let imageLabel = singlePdf ? 'pdf ' : '';

    let viewingPdf = this.AppStateModel.location.fullpath.replace(/:\d+$/, '')?.split('.')?.pop() === 'pdf';
    if( viewingPdf ) {
      singlePdf = true;
      imageLabel = this.href.split('.').pop(); // get format from url, could be workflow image or pdf
    }

    let fileSize = this.sources.find(s => s.url === this.href)?.fileSize;
    if( formats.length && !viewingPdf ) imageLabel += formats.join(', ') + ' ';

    // if multipage, combine file sizes
    if( multipage && multiImageSize ) {
      imageLabel += '(' + bytes__WEBPACK_IMPORTED_MODULE_5___default()(multiImageSize).toLowerCase() + ')';
    } else if( fileSize ) {
      imageLabel += '(' + bytes__WEBPACK_IMPORTED_MODULE_5___default()(fileSize).toLowerCase() + ')';
    }

    if( !this.fullSetSelected ) this.showDownloadLabel = true;
    this.shadowRoot.querySelector("#media-format-label").innerHTML = imageLabel;
  }

  /**
   * @method _renderDownloadAllFormats
   * @private
   * @description render image formats if download media exists for images and pdf
   * also render All Files image format if only images exist for download media (ie not image + pdf)
   */
  _renderDownloadAllFormats() {
    let formats = [];
    let hasPdf = false;
    this.sources.forEach((source) => {
      let format = source.label || source.url.split('.').pop();
      if( format === 'pdf' ) hasPdf = true;
      let matchedFileType = formats.filter(f => f.format === format)[0];

      if( matchedFileType ) {
        // update fileSize
        matchedFileType.fileSize += source.fileSize;
      } else {
        formats.push({
          format,
          fileSize : source.fileSize
        });
      }
    });

    if( hasPdf && formats.length > 1 ) {
      // show dropdown to select pdf vs image
      this.showImageFormats = true;
      this.shadowRoot.querySelector("#format").innerHTML = '';
      
      formats.forEach((format) => {
        let option = document.createElement("option");
        let imageLabel = format.format;
        if( format.fileSize && !isNaN(format.fileSize) ) imageLabel += ' (' + bytes__WEBPACK_IMPORTED_MODULE_5___default()(format.fileSize).toLowerCase() + ')';
        option.value = format.format;
        option.innerHTML = imageLabel
        this.shadowRoot.querySelector("#format").appendChild(option);
      });
      this.showDownloadLabel = false;
    } else {
      this.showDownloadLabel = true;
    
      let imageLabel = '';
      if( formats.length ) imageLabel += formats.map(f => f.format).join(', ') + ' ';
      imageLabel += '(' + (bytes__WEBPACK_IMPORTED_MODULE_5___default()(formats.reduce(((a, r) => a + r.fileSize), 0))||'').toLowerCase() + ')';
      
      this.shadowRoot.querySelector("#media-format-label").innerHTML = imageLabel;
      this.shadowRoot.querySelector("#media-all-format-label").innerHTML = imageLabel;      
    }
  }

  /**
   * @method _getImageFormat
   * @description get the image format. Looks at the schema.org fileFormat parameter or falls back to the url
   *
   * @returns {String}
   */
  _getImageFormat(imageRecord) {
    if (!imageRecord || !imageRecord.url) return;

    // get the graph record for the image
    imageRecord = this.graphIndex[imageRecord.url.split('/fcrepo/rest')[1]]; 

    if( !imageRecord ) return;
    
    let originalFormat = (
      imageRecord.fileFormat ||
      imageRecord["@id"]?.split(".").pop() ||
      imageRecord?.split('.').pop() ||
      ""
    )
      .replace(/.*\//, "")
      .toLowerCase();
    // hack
    if (originalFormat === "jpeg") originalFormat = "jpg";
    return originalFormat;
  }

  /**
   * @method _onFormatSelected
   * @private
   * @description when a format is selected, render the download button.
   */
  _onFormatSelected() {
    let selectedFormat = this.shadowRoot.querySelector("#format").value;
    let sources = this.sources.filter(s => s.label === selectedFormat || s.url?.split('.').pop() === selectedFormat);
    this._setZipPaths(sources.map(s => s.url.replace('/fcrepo/rest', '')));
  }

  /**
   * @method _toggleMultipleDownload
   * @description bound to radio buttons click event
   *
   * @param {Event} evt the click event
   * @param {Boolean} preselectPdf if true, then preselect the pdf format if it exists
   */
  _toggleMultipleDownload(evt, preselectPdf=false) {
    if( preselectPdf && this.firstLoad) {
      let pdfOption = Array.from(this.shadowRoot.querySelector("#format").options).filter(o => o.value === 'pdf')[0];
      if( pdfOption ) pdfOption.selected = true;

      this.shadowRoot.querySelector("#fullset").checked = true;
      this.shadowRoot.querySelector("#single").checked = false;
    }

    this.fullSetSelected = this.shadowRoot.querySelector("#fullset").checked
        ? true
        : false;
    
    let selectedFormat = this.shadowRoot.querySelector("#format").value;
    let sources = this.sources.filter(s => s.label === selectedFormat || !selectedFormat);
    let urls = [];

    if( this.fullSetSelected ) {
      this.showDownloadLabel = false;
    } else {
      this.showDownloadLabel = true;
    }
    
    this._setDownloadHref(this.sources);
    this._renderDownloadSingleFormat();

    if( this.isBookreader && !this.fullSetSelected ) {
      this._onBookreaderStateUpdate(this.BookReaderModel.getState());
    } else {
      urls = sources.map(s => s.url.replace('/fcrepo/rest', ''));
    }
    
    this._setZipPaths(urls);
  }

  /**
   * @method _setZipPaths
   * @description set the zip url based on mutlipage bookreader selected page
   */
  _setZipPaths(urls=[]) {
    this.zipName = this.rootRecord.name
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();

    if( !urls.length ) return;

    if( urls.length === 1 ) {
      this.archiveHref = '/fcrepo/rest'+urls[0];
      return;
    }

    this.zipConcatenatedPaths = urls.join(',');
    this.zipPaths = urls;

    // this.shadowRoot.querySelector("#format") to get current format, match to url label?
    this.archiveHref = `/fin/archive?paths=${this.zipConcatenatedPaths}${this.zipName ? '&name='+this.zipName : ''}`;
  }

  /**
   * @method _onDownloadFullSetClicked
   * @description bound to download set button click event
   */
  async _onDownloadFullSetClicked(e) {
    if( this.disableDownload ) {
      e.preventDefault();
      return;
    }

    let path = this.rootRecord["@id"].replace((_lib_config__WEBPACK_IMPORTED_MODULE_3___default().fcrepoBasePath), "");
    gtag("event", "download", {
      event_category: "fullset",
      event_label: path,
      value: 1,
    });
  }

  /**
   * @method _onDownloadClicked
   * @description bound to download button click event, record analytics
   */
  _onDownloadClicked(e) {
    if( this.disableDownload ) {
      e.preventDefault();
      return;
    }
    let path = this.href.replace((_lib_config__WEBPACK_IMPORTED_MODULE_3___default().fcrepoBasePath), "");

    gtag("event", "download", {
      event_category: this.sourceType,
      event_label: path,
      value: 1,
    });
  }
}

customElements.define("app-media-download", AppMediaDownload);


/***/ }),

/***/ "./public/elements/pages/record/app-media-download.tpl.js":
/*!****************************************************************!*\
  !*** ./public/elements/pages/record/app-media-download.tpl.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/shared-styles */ "./public/elements/styles/shared-styles.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_lists_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_lists.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_lists.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_index.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_index.css.js");
/* harmony import */ var _ucd_lib_theme_sass_1_base_html_forms_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ucd-lib/theme-sass/1_base_html/_forms.css */ "./public/node_modules/@ucd-lib/theme-sass/1_base_html/_forms.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_forms_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_forms.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_forms.css.js");








function render() {
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <style>
      ${_ucd_lib_theme_sass_2_base_class_lists_css__WEBPACK_IMPORTED_MODULE_2__["default"]}
        ${_ucd_lib_theme_sass_2_base_class_index_css__WEBPACK_IMPORTED_MODULE_3__["default"]}
        ${_ucd_lib_theme_sass_1_base_html_forms_css__WEBPACK_IMPORTED_MODULE_4__["default"]}
        ${_ucd_lib_theme_sass_2_base_class_forms_css__WEBPACK_IMPORTED_MODULE_5__["default"]}
        ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__.sharedStyles}
        :host {
        display: block;
      }

      [hidden] {
        display: none !important;
      }

      .info {
        margin: 10px 0;
        font-size: var(--fs-sm);
      }

      a {
        display: block;
        padding: 8px;
        color: var(--default-primary-color);
        background-color: var(--default-secondary-color);
        text-transform: uppercase;
        font-size: var(--fs-sm);
        font-weight: var(--fw-bold);
        text-decoration: none;
        white-space: nowrap;
        height: 24px;
      }

      a:focus {
        color: var(--default-primary-color);
      }

      button:focus {
        color: var(--default-primary-color);
      }

      .radio label {
        color: black;  
      }
      .radio label:before {
        top: 5px;
        left: -1px;
      }

      select {
        margin-right: 15px;
        padding: 5px 40px 5px 10px;
        height: 40px;
        border: none;
        border-radius: 0;

        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        -o-appearance: none;
        appearance: none;

        background-position: right 10px center;
        background-size: 10px 6px;
        background-repeat: no-repeat;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCA2IiB3aWR0aD0iMTBweCIgaGVpZ2h0PSI2cHgiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojMDAyNjU1O308L3N0eWxlPjwvZGVmcz48Zz48cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iMCAwIDEwIDAgNSA2IDAgMCIvPjwvZz48L3N2Zz4=");
        background-color: var(--medium-background-color);
        color: var(--default-primary-color);
      }

      select.plainText {
        padding: 0;
        border: 0;
        background: transparent;
        color: black;
      }

      button {
        white-space: nowrap;
        /* text-transform: uppercase; */
        font-size: 0.9rem;
        font-weight: var(--fw-bold);
        background-color: var(--default-secondary-color);
        color: var(--default-primary-color);
        border-radius: 0;
        border: none;
        cursor: pointer;
        padding: 0.75rem 1rem;
        line-height: 1.4;
      }

      /* for IE */
      select::-ms-expand {
        display: none;
      }
      select option {
        text-transform: uppercase;
      }

      .layout {
        display: flex;
        align-items: center;
      }

      .radio {
        margin-bottom: 10px;
      }

      .downloadBtn {
        min-height: 1.4rem;
        height: 1.4rem;
        text-transform: none;
        background-color: var(--color-aggie-gold);
        border: none;
      }

      .downloadBtn:hover {
        background-color: var(--color-aggie-blue);
        color: var(--color-aggie-gold);
      }

      #format {
        height: 2.65rem;
        background-color: var(--color-aggie-blue-50);
        font-size: 1rem;
        font-weight: bold;
        padding: 0 1.5rem 0 1rem;
        min-width: 35%;
        max-width: 6rem;
      }

      #media-format-label,
      #media-all-format-label,
      #multimedia-format-label,
      #multimedia-all-format-label {
        font-size: 1rem;
        margin-right: 0.75rem;
        height: 2.7rem;
        line-height: 2.7rem;
        text-align: center;
        border: solid 2px var(--color-aggie-blue-50);
        white-space: nowrap;
        display: inline-block;
        box-sizing: border-box;
        padding: 0 1rem;
        color: var(--color-aggie-blue);
        font-weight: bold;
      }

      #single,
      #fullset {
        display: none;
      }
    </style>

    <div id="wrapper">
      <div class="layout" ?hidden="${!this.hasMultipleDownloadMedia || this.downloadAllMedia}">
        <div class="radio" style="margin-right: 1rem">
          <input
            id="single"
            type="radio"
            name="set-size"
            ?checked="${!this.fullSetSelected}"
            @click="${this._toggleMultipleDownload}"
          />
          <label for="single">Selected Page</label>
        </div>
        <div class="radio">
          <input
            id="fullset"
            type="radio"
            name="set-size"
            ?checked="${this.fullSetSelected}"
            @click="${this._toggleMultipleDownload}"
          />
          <label for="fullset">All Files (${this.fullSetCount})</label>
        </div>
      </div>
    </div>

    <div ?hidden="${this.fullSetSelected}">
      <div class="layout btns"
        ?hidden="${!this.selectedMediaHasSources}">
        <span id="multimedia-format-label"
          ?hidden="${!this.isMultimedia}">
        </span>
        <span id="media-format-label"
          ?hidden="${!this.showDownloadLabel || this.isMultimedia}">
        </span>
        <a class="downloadBtn btn"
          ?hidden="${(this.isTwoPageView || this.downloadAllMedia) && this.sources.length > 1}"
          href="${this.href}"
          @click="${this._onDownloadClicked}"
          download
          target="_blank"
          rel="noopener"
          style="white-space: nowrap; text-align: center;">
          <span> Download </span>
        </a>
        <a class="downloadBtn archive btn"
          ?hidden="${(!this.isTwoPageView && !this.downloadAllMedia) || this.sources.length === 1}"
          href="${this.archiveHref}"
          @click="${this._onDownloadFullSetClicked}"
          target="_blank"
          rel="noopener"
          download>
          <span> Download </span>
        </a>
      </div>
    </div>

    <div ?hidden="${(this.fullSetSelected || this.isTwoPageView) && this.selectedMediaHasSources}">
      <div ?hidden="${this.selectedMediaHasSources}">
        <em>No downloadable items available</em>
      </div>
    </div>

    <div style="display: flex;">
      <span id="multimedia-all-format-label"
        ?hidden="${!this.fullSetSelected || !this.isMultimedia}">
      </span>
      <span id="media-all-format-label"
        style="display: inline-block;"  
        ?hidden="${!this.fullSetSelected || !this.showDownloadLabel}">
        </span>
      <select id="format"
        style="display: inline-block"
        @change="${this._onFormatSelected}"
        ?hidden="${!this.fullSetSelected || !this.showImageFormats || this.sources.length < 2}">
      </select>
      <a class="downloadBtn archive btn"
        ?hidden="${!this.fullSetSelected}"
        href="${this.archiveHref}"
        @click="${this._onDownloadFullSetClicked}"
        target="_blank"
        rel="noopener"
        download>
        <span> Download </span>
      </a>
    </div>

    <!-- <form id="downloadZip" 
      action="/fin/archive" 
      method="get" 
      ?hidden="${!this.fullSetSelected}">    
      <input type="text" hidden name="name" value="${this.zipName}" style="display: none;">
      <input type="text" hidden name="paths" value="${this.zipConcatenatedPaths}" style="display: none;">
      <button @click="${this._onDownloadFullSetClicked}">
        <span>Download</span>
      </button>
    </form> -->

  `;
}


/***/ }),

/***/ "./public/elements/pages/record/app-record.js":
/*!****************************************************!*\
  !*** ./public/elements/pages/record/app-record.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_record_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-record.tpl.js */ "./public/elements/pages/record/app-record.tpl.js");
/* harmony import */ var _ucd_lib_theme_elements_utils_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/theme-elements/utils/mixins */ "./public/node_modules/@ucd-lib/theme-elements/utils/mixins/index.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var markdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! markdown */ "./public/node_modules/markdown/lib/index.js");
/* harmony import */ var _lib_rights_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../lib/rights.json */ "./public/lib/rights.json");
/* harmony import */ var _lib_models_CitationsModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../lib/models/CitationsModel */ "./public/lib/models/CitationsModel/index.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../lib/utils/index.js */ "./public/lib/utils/index.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ucd_lib_theme_elements_ucdlib_ucdlib_md_ucdlib_md_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ucd-lib/theme-elements/ucdlib/ucdlib-md/ucdlib-md.js */ "./public/node_modules/@ucd-lib/theme-elements/ucdlib/ucdlib-md/ucdlib-md.js");
/* harmony import */ var _ucd_lib_theme_elements_brand_ucd_theme_slim_select_ucd_theme_slim_select_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ucd-lib/theme-elements/brand/ucd-theme-slim-select/ucd-theme-slim-select.js */ "./public/node_modules/@ucd-lib/theme-elements/brand/ucd-theme-slim-select/ucd-theme-slim-select.js");
/* harmony import */ var _app_media_download__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app-media-download */ "./public/elements/pages/record/app-media-download.js");
/* harmony import */ var _app_fs_media_download__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app-fs-media-download */ "./public/elements/pages/record/app-fs-media-download.js");
/* harmony import */ var _viewer_app_media_viewer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./viewer/app-media-viewer */ "./public/elements/pages/record/viewer/app-media-viewer.js");
/* harmony import */ var _components_citation__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/citation */ "./public/elements/components/citation.js");
/* harmony import */ var _lib_utils_user_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../lib/utils/user.js */ "./public/lib/utils/user.js");



















class AppRecord extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_theme_elements_utils_mixins__WEBPACK_IMPORTED_MODULE_2__.MainDomElement, _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__.LitCorkUtils) {
  
  static get properties() {
    return {
      record: { type: Object },
      currentRecordId: { type: String },
      name: { type: String },
      collectionName: { type: String },
      collectionImg: { type: String },
      collectionId: { type: String },
      collectionItemCount: { type: Number },
      description: { type: String },
      date: { type: String },
      publisher: { type: String },
      subjects: { type: Array },
      creator: { type: Array },
      callNumber: { type: String },
      material: { type: String },
      size: { type: String },
      rights: { type: Object },
      metadata: { type: Array },
      isBagOfFiles: { type: Boolean },
      arkDoi: { type: Array },
      fedoraLinks: { type: Array },
      isUiAdmin : { type : Boolean },
      editMode : { type : Boolean },
      // citations : {type: Array}
      citationRoot: { type: Object },
      itemDefaultDisplay: { type: String }, // collection default display
      itemDisplay: { type: String },
      displayData: { type: Object },
      savedCollectionData: { type: Object },
      disableDownload: { type: Boolean },
      showReportButton: { type: Boolean },
      githubIssueUrl: { type: String },
      deskewImages: { type: Boolean },
      imagesCurrentlyDeskewed: { type: Boolean },
      deskewMismatch: { type: Boolean },
      showGetWorkflow: { type: Boolean },
      showStartWorkflow: { type: Boolean },
      workflowStatusLoading: { type: Boolean },
      workflowAlreadyExecuted: { type: Boolean },
      workflowRunning: { type: Boolean },
      workflowStatus: { type: String },
      workflowError: { type: Boolean },
      firstStatusLoaded: { type: Boolean },
      copyright: { type: Object }
    };
  }

  constructor() {
    super();
    this.render = _app_record_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.active = true;

    this._reset();

    this._injectModel(
      "AppStateModel",
      "RecordModel",
      "CollectionModel",
      "SeoModel",
      "FcAppConfigModel",
      "WorkflowModel"
    );

    window.addEventListener('click', () => this._onPageClick());
  }

  _reset() {
    this.record = {};
    this.currentRecordId = "";
    this.name = "";
    this.collectionName = "";
    this.renderedRecordId = "";

    this.date = "";
    this.publisher = "";
    this.subjects = [];
    this.creator = [];
    this.callNumber = "";
    this.material = "";
    this.collectionImg = "";
    this.defaultCollectionImg = "/images/tree-bike-illustration.png";
    this.collectionId = "";
    this.renderedCollectionId = "";
    this.description = "";

    this.size = "";
    this.rights = {};
    this.metadata = [];
    this.isBagOfFiles = false;
    this.arkDoi = [];
    this.fedoraLinks = [];
    // this.citations = [];
    this.citationRoot = {};
    this.collectionItemCount = 0;
    this.itemDefaultDisplay = (_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_7___default().itemDisplayType.brTwoPage);
    this.itemDisplay = '';

    this.isUiAdmin = _lib_utils_user_js__WEBPACK_IMPORTED_MODULE_14__["default"].canEditUi();
    this.editMode = false;
    this.displayData = {};
    this.savedCollectionData = {};
    this.disableDownload = APP_CONFIG.disableFileDownloads;

    this.showReportButton = false;
    this.githubIssueUrl = '';
    // this.deskewImages = false;
    // this.imagesCurrentlyDeskewed = false;
    // this.deskewMismatch = false;
    this.showGetWorkflow = false;
    this.showStartWorkflow = false;
    this.workflowStatusLoading = false;
    this.workflowAlreadyExecuted = false;
    this.workflowRunning = false; 
    this.workflowStatus = '';
    this.workflowError = false;
    this.firstStatusLoaded = false;

    this.workflowIntervalId = null;
    this.copyright = {};
  }

  _onPageClick(e) {
    let appShareBtn = this.querySelector('app-media-viewer-nav')?.shadowRoot?.querySelector('app-share-btn');
    if( appShareBtn ) appShareBtn.visible = false;
  }

  async firstUpdated() {
    // this._onRecordUpdate(await this.RecordModel.get(this.AppStateModel.location.fullpath)); // this causes badness with ie /media/images:4 paths
    this._onAppStateUpdate(await this.AppStateModel.get());
    if( this.RecordModel.currentRecordId ) this._onRecordUpdate(await this.RecordModel.get(this.RecordModel.currentRecordId));
    if( this.collectionId ) this._onCollectionUpdate(await this.CollectionModel.get(this.collectionId));

    this._updateSlimStyles();
  }

  /**
   * @method _onRecordUpdate
   * @description from RecordModel, listen for loading events and reset UI.
   *
   * @param {Object} e state event
   */
  async _onRecordUpdate(e) {
    if (e.state !== "loaded") return;

    let record = e.vcData;
    if( !record || this.renderedRecordId === record['@id'] ) return;

    this.graph = e.payload.data['@graph'] || [];
    // this.parseWorkflowImages();

    this.renderedRecordId = record["@id"];
    this.record = record;

    this.currentRecordId = this.record["@id"];
    this.name = this.record.name;
    this.collectionName = this.record.collectionName;
    this.description = this.record.description;
    this.date = _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_7___default().formatDateString(this.record.date);
    this.publisher = this.record.publisher;
    this.subjects = this.record.subjects || [];
    this.callNumber = this.record.callNumber;
    this.material = this.record.material;
    this.creator = this.record.creator || [];
    if( !Array.isArray(this.creator) ) this.creator = [this.creator];

    this.citationRoot = this.record.root;
    this.collectionId = this.record.collectionId;

    this._updateLinks(this.AppStateModel.location, record);

    let license = e.payload?.root?.license?.['@id'] || '';
    let licensePath = license?.split('rightsstatements.org')?.[1] || ''; // to handle http/https
    this.copyright = _lib_rights_json__WEBPACK_IMPORTED_MODULE_5__[licensePath] || {};

    if( APP_CONFIG.user?.loggedIn ) {
      let t = await this.RecordModel.getGitInfo(this.currentRecordId);
      this.showReportButton = (t.state === 'loaded' && t.payload && t.payload.repo);
      if( this.showReportButton ) {
        let rootUrl = t.payload.repo.replace(/\.git$/, '');
        let githubFileUrl = rootUrl + '/tree/main' + t.payload.file;
        let body = '**File:** [' + t.payload.file + ']('+githubFileUrl+')\n\n**Description:**\n\n';
        this.githubIssueUrl = t.payload.repo.replace(/\.git$/, '') + '/issues/new?title=' + encodeURIComponent('Request change to ' + this.currentRecordId) + '&body=' + encodeURIComponent(body);
      }
    } else {
      this.showReportButton = false;
    }
  }

  async _onCollectionUpdate(e) {
    if( e.state !== "loaded" || e.id === this.renderedCollectionId ) return;

    this.collectionItemCount = e.vcData?.count || 0;
    this.renderedCollectionId = e.id;
    this.collectionId = e.id;

    let clientEditsId = e.vcData.clientEdits?.['@id'];
    let overriddenFeatureImage =  e.vcData.clientEdits?.thumbnailUrl?.['@id'];
    if( clientEditsId && overriddenFeatureImage ) {
      this.collectionImg = '/fcrepo/rest' + clientEditsId + '/featuredImage.jpg';
    } else {
      this.collectionImg = e.vcData?.images?.small?.url                   
      || e.vcData?.images?.medium?.url 
      || e.vcData?.images?.large?.url
      || e.vcData?.images?.original?.url;
    }

    if( !this.collectionImg ) this.collectionImg = this.defaultCollectionImg;    
  }

  /**
   * @method _onAppStateUpdate
   */
  async _onAppStateUpdate(e) {
    if( e.location.page !== 'item' ) {
      // this.stopWorkflowLoop = true;
      this._reset();
      return;
    }

    this._updateSlimStyles();

    let hasError = false;
    if( this.RecordModel.currentRecordId ) {
      try {
        let record = await this.RecordModel.get(this.RecordModel.currentRecordId);
        this._onRecordUpdate(record);
      } catch(e) {
        hasError = true;
      }
    }

    if( e.page === '404' || hasError ) {
      this.dispatchEvent(
        new CustomEvent("show-404", {})
      );
      return;
    }
    
    if( this.collectionId ) this._onCollectionUpdate(await this.CollectionModel.get(this.collectionId));

    this._updateLinks(e.location);
    
    await this._parseDisplayData();
  }

  // see issue #359, this was a stop gap that we fixed in the image processing workflow
  // will likely be removed in the future, for now just disabling the ui controls
  // _getLatestStatusFromBatch(status=[]) {
  //   // group to items ids map
  //   // then filter by created desc to get latest
  //   status = status.reduce((acc, status) => {
  //     const { finPath } = status;
  //     if (!acc[finPath]) {
  //       acc[finPath] = [];
  //     }
  //     acc[finPath].push(status);
  //     return acc;
  //   }, {});

  //   let latest = [];
  //   Object.values(status).forEach(workflow => {
  //     latest.push(workflow.sort((a,b) => new Date(b.created) - new Date(a.created))[0]);
  //   })
  //   return latest;
  // }

  // see issue #359, this was a stop gap that we fixed in the image processing workflow
  // will likely be removed in the future, for now just disabling the ui controls
  // updateWorkflowStatusMessage(status) {
  //   this.workflowStatus = '';
  //   if( this.workflowRunning ) {
  //     let pendingWorkflows = status.filter(s => s.state !== 'running' && s.state !== 'completed').length;
  //     let runningWorkflows = status.filter(s => s.state === 'running').length;
  //     let completedWorkflows = status.filter(s => s.state === 'completed').length;

  //     this.workflowStatus = `Status: ${pendingWorkflows} pending, ${runningWorkflows} processing, ${completedWorkflows} complete (of ${status.length})`;
  //   }

  //   // if( this.deskewImages ) {
  //   //   this.workflowAlreadyExecuted = this.latestWorkflowType === 'deskew';
  //   // } else {
  //   //   this.workflowAlreadyExecuted = this.latestWorkflowType === 'original';
  //   // }

  //   if( this.workflowRunning ) this.workflowAlreadyExecuted = false;
  // }

  // see issue #359, this was a stop gap that we fixed in the image processing workflow
  // will likely be removed in the future, for now just disabling the ui controls
  // async _runWorkflow() {    
  //   this.workflowRunning = true;
  //   this.workflowStatus = 'Status: Starting...';
  //   await this.WorkflowModel.batchStart('image-products', {}, this.workflowImageUrls);

  //   // get workflow status and loop
  //   // let status = await this.WorkflowModel.batchStatus('image-products', this.workflowImageUrls);
  //   // status = (status.body || []).sort((a,b) => new Date(b.created) - new Date(a.created));
  //   // this.latestWorkflowStatus = this._getLatestStatusFromBatch(status);
  //   this._startWorkflowStatusLoop();
  // }

  // see issue #359, this was a stop gap that we fixed in the image processing workflow
  // will likely be removed in the future, for now just disabling the ui controls
  // parseWorkflowImages() {
  //   let workflowImageUrls = [];

  //   this.IMAGE_WORKFLOWS = {
  //     // 'pdf-image-products' : {
  //     //   mimeTypes : ['application/pdf'],
  //     //   property : 'images',
  //     //   pageSearch : {
  //     //     multiPage : true
  //     //   }
  //     // },
  //     'image-products' : {
  //       mimeTypes : ['image/jpeg', 'image/png', 'image/tiff'],
  //       property: 'images',
  //       pageSearch : {
  //         multiPage : false
  //       }
  //     }
  //   }

  //   this.graph.forEach(node => {
  //     for( let workflow in this.IMAGE_WORKFLOWS ) {
  //       let def = this.IMAGE_WORKFLOWS[workflow];

  //       if( !node.fileFormat ) continue;
  //       if( !def.mimeTypes.includes(node.fileFormat) ) continue;

  //       workflowImageUrls.push(node['@id']);
  //     }
  //   });

  //   this.workflowImageUrls = workflowImageUrls;
  // }

  // see issue #359, this was a stop gap that we fixed in the image processing workflow
  // will likely be removed in the future, for now just disabling the ui controls
  // _startWorkflowStatusLoop() {
  //   this.workflowStatus = 'Loading workflow status...';
  //   this.workflowStatusLoading = true;

  //   if (this.workflowIntervalId !== null) {
  //     return;
  //   }
  
  //   this.workflowIntervalId = setInterval(async () => {
  //     await this._runWorkflowStatusLoop();
  //   }, 10000);
  // }
  
  // async _runWorkflowStatusLoop() {
  //   if( !this.workflowStatusLoading && !this.workflowRunning ) return;
    
  //   this.workflowRunning = true;
  //   this.workflowStatusLoading = false;
    
  //   let status = await this.WorkflowModel.batchStatus('image-products', this.workflowImageUrls);
  //   status = (status.body || []).sort((a,b) => new Date(b.created) - new Date(a.created));
  //   this.firstStatusLoaded = true;    


  //   this.latestWorkflowStatus = this._getLatestStatusFromBatch(status); 
  //   this.workflowRunning = this.latestWorkflowStatus.find(s => s.state !== 'completed') ? true : false;

  //   if( this.stopWorkflowLoop || !this.workflowRunning ) {
  //     this._stopWorkflowStatusLoop();

  //     // make sure deskew setting matches in last workflow run
  //     // let deskew = this.latestWorkflowStatus[0].params?.imagemagick?.deskew;
  //     // let allMatch = true;
  //     // this.latestWorkflowStatus.forEach(status => {
  //     //   if( status.params?.imagemagick?.deskew != deskew ) allMatch = false;
  //     // });

  //     // if( !allMatch ) {
  //     //   this.workflowError = true;
  //     //   this.imagesCurrentlyDeskewed = false;
  //     //   this.deskewMismatch = true;
  //     //   this.latestWorkflowType = 'mismatch';
  //     // } else {
  //     this.workflowError = false;
  //     // this.imagesCurrentlyDeskewed = deskew;
  //     // if( deskew === undefined ) deskew = true;
  //     // this.latestWorkflowType = deskew ? 'deskew' : 'original';
  //     // }

  //     this.workflowStatus = '';
  //     this.workflowStatusLoading = false;
  //     this.workflowRunning = false;
  //   } 
  
  //   this.updateWorkflowStatusMessage(this.latestWorkflowStatus);
  // }
  
  // _stopWorkflowStatusLoop() {
  //   if( this.workflowIntervalId !== null ) {
  //     clearInterval(this.workflowIntervalId);
  //     this.workflowIntervalId = null;
  //   }
  // }

  _arkDoiClick(e) {
    e.preventDefault();

    history.pushState(null, '', e.target.getAttribute('href'));
    window.scrollTo(0, 0);
  }

  _updateSlimStyles() {
    let selects = this.querySelectorAll('ucd-theme-slim-select');
    if( !selects ) return;

    for( let select of selects ) {
      let ssMain = select.shadowRoot.querySelector(".ss-main");
      if (ssMain) {
        ssMain.style.border = 'none';
        ssMain.style.backgroundColor = 'transparent';
      }

      let ssSingle = select.shadowRoot.querySelector(".ss-single-selected");
      if (ssSingle) {
        ssSingle.style.border = "none";
        ssSingle.style.height = "2.5em";
        ssSingle.style.paddingLeft = "1rem";
        ssSingle.style.backgroundColor = "var(--color-aggie-blue-50)";
        ssSingle.style.borderRadius = '0';
        ssSingle.style.fontWeight = "bold";
        ssSingle.style.color = "var(--color-aggie-blue)";
      }

      let search = select.shadowRoot.querySelector('.ss-search');
      if( search ) {
        search.style.display = "none";
      }
    }
  }
  
  /**
   * @method _ssSelectFocus
   * @description slim select focus change, color should be gold if active, blue if not
   * @param {Object} e
   */
  _ssSelectFocus(e) {
    let ssMain = e.currentTarget.shadowRoot.querySelector('.ss-main');
    let ssSingleSelected = e.currentTarget.shadowRoot.querySelector('.ss-single-selected');

    if( ssSingleSelected?.classList.value === 'ss-single-selected ss-open-below' ) {
      ssSingleSelected.style.backgroundColor = '#FFF4D2'; // gold-30
      ssMain.style.borderColor = '#FFBF00'; // gold
    } else {
      ssSingleSelected.style.backgroundColor = '#B0D0ED'; // blue-50
      ssMain.style.borderColor = '#B0D0ED'; // blue-50
    }
  }

  /**
   * @method _ssSelectBlur
   * @description slim select focus change, color should be gold if active, blue if not
   * @param {Object} e
   */
  _ssSelectBlur(e) {
    let ssMain = e.currentTarget.shadowRoot.querySelector('.ss-main');
    let ssSingleSelected = e.currentTarget.shadowRoot.querySelector('.ss-single-selected');

    ssSingleSelected.style.backgroundColor = '#B0D0ED'; // blue-50
    ssMain.style.borderColor = '#B0D0ED'; // blue-50
  }

  /**
   * @method _updateLinks
   * @description update ark/fedora links
   *
   * @param {Object} location location element
   */
  _updateLinks(location) {
    if( location.page !== 'item' ) return;

    let selectedRecord = this.AppStateModel.getSelectedRecord();
    if( !selectedRecord ) return;

    let mediaGroup = selectedRecord.clientMedia.mediaGroups[0];
    let path = selectedRecord.clientMedia?.root?.['@id'] || location.pathname;
    let imagePath = '';

    // check if we are on a specific /media path
    let isMediaUrl = path.indexOf('/media') > -1;
    if( isMediaUrl ) {
      // find media in graph
      let media = selectedRecord.clientMedia.graph
        .filter(
          m => m['@shortType'].includes('ImageObject') && 
          parseInt(m.position) === selectedRecord.selectedMediaPage
        )[0];
      if( media?.['@id'] ) {
        // path = media['@id'].split('/media')[0];
        imagePath = media['@id'];
      }
    } 

    if (!imagePath && mediaGroup?.['@shortType']?.includes('ImageList')) {
      imagePath = mediaGroup.encodesCreativeWork?.['@id'] || mediaGroup.clientMedia?.images?.original?.url || path;
    } else {
      imagePath = selectedRecord.selectedMedia?.['@id'];
    }

    this.arkDoi = [
      path,
      imagePath.replace('/fcrepo/rest', '')
    ];

    if( !imagePath.endsWith('/images') ) imagePath += '/fcr:metadata';
    this.fedoraLinks = [
      '/fcrepo/rest'+ path.replace('/fcrepo/rest', ''),
      '/fcrepo/rest'+ imagePath.replace('/fcrepo/rest', '')
    ];

  }

  _onSubjectClick(e) {
    this.AppStateModel.set({ resetScroll: true })
  }

  _onCreatorClick(e) {
    this.AppStateModel.set({ resetScroll: true })
  }

  /**
   * @method _onEditClicked
   * @description admin ui, edit button click event
   * 
   * @param {Object} e 
   */
  async _onEditClicked(e) {
    if( !this.isUiAdmin ) return;
    this._updateSlimStyles();
    this.editMode = true;
    
    this._changeMediaViewerDisplay('none');

    // see issue #359, this was a stop gap that we fixed in the image processing workflow
    // will likely be removed in the future, for now just disabling the ui controls
    // this._startWorkflowStatusLoop();
  }

  /**
   * @method _onSaveClicked
   * @description admin ui, save button click event
   * 
   * @param {Object} e 
   */
  async _onSaveClicked(e) {
    if( !this.isUiAdmin ) return;
    
    this.itemDisplay = document.querySelector('ucd-theme-slim-select.item-display-select')?.slimSelect?.selected();
    this._updateDisplayData();
    await this.FcAppConfigModel.saveItemDisplayData(this.renderedRecordId, this.displayData);

    this.editMode = false;
    // this.stopWorkflowLoop = true;

    this._changeMediaViewerDisplay('', true);
  }

  /**
   * @method _onCancelEditClicked
   * @description admin ui, cancel editing button click event
   * 
   * @param {Object} e 
   */
  _onCancelEditClicked(e) {
    if( !this.isUiAdmin ) return;
    this.editMode = false;
    // this.stopWorkflowLoop = true;

    this._changeMediaViewerDisplay('');
  }

  /**
   * @description _parseDisplayData, get application container data to set collection specific display data (watercolors, highlighted items, featured image)
   */
  async _parseDisplayData() {
    if( !this.collectionId ) return;

    let edits = await this.CollectionModel.getCollectionEdits(this.collectionId);
    if( !Object.keys(edits.payload).length ) {
      this.appDataLoaded = true;
      return;
    }

    edits = edits.payload;
    this.itemDefaultDisplay = edits?.collection?.itemDefaultDisplay || (_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_7___default().itemDisplayType.brTwoPage);
    this.itemDisplay = edits?.items?.[this.currentRecordId]?.itemDefaultDisplay || this.itemDefaultDisplay;

    this.appDataLoaded = true;
    this._updateDisplayData();
  }

  _updateDisplayData() {
    this.displayData = this.FcAppConfigModel.getItemDisplayData(this.renderedRecordId, this.itemDisplay);
  }

  async _changeMediaViewerDisplay(display, prefChange=false) {
    let mediaViewer = this.querySelector('app-media-viewer');
    if( !mediaViewer ) return;
    let pages = mediaViewer.querySelector('ucdlib-pages');
    let nav = mediaViewer.querySelector('app-media-viewer-nav');

    if( nav ) nav.style.display = display;

    if( !pages ) return;
    if( display ) {
      pages.style.opacity = 0;
      pages.style.height = '30rem';
      pages.style.display = 'block';
    } else {
      pages.style.opacity = 100;
      pages.style.height = '';
      pages.style.display = 'block';
    }

    if( mediaViewer.mediaType === 'video' ) return;

    // on save display pref, reload media viewer with new image display type
    if( prefChange ) {
      // reload media viewer with new image display type
      let newDisplayType = '';
      let singlePage = false;

      if( this.itemDisplay.includes('Image List') ) {
        newDisplayType = 'image';
      } else if ( this.itemDisplay.includes('1 Page') ) {
        newDisplayType = 'bookreader';
        singlePage = true;
      } else if ( this.itemDisplay.includes('2 Page') ) {
        newDisplayType = 'bookreader';
      }

      if( pages && nav && newDisplayType ) {
        pages.selected = newDisplayType;

        if( mediaViewer.singlePage !== singlePage ) {
          mediaViewer.singlePage = singlePage;
          // if( mediaViewer.querySelector('app-bookreader-viewer').br ) {
          //   requestAnimationFrame(() => {
          //     mediaViewer._onToggleBookView();
          //   });
          // } else {
          //   // to reload br if not initiated
          //   mediaViewer._onAppStateUpdate(await this.AppStateModel.get());
          // }         
        }
        mediaViewer.isBookReader = newDisplayType === 'bookreader';
        mediaViewer.mediaType = newDisplayType;
      }
    }    
  }

  /**
   * @method _getHost
   * @description helper for getting protocol/host of window
   *
   * @returns {String}
   */
  _getHost() {
    return window.location.protocol + "//" + window.location.host + "/";
  }

  /**
   * @method _onSelectedRecordMediaUpdate
   * @description from AppStateModel, called when a records media is selected
   *
   * @param {Object} record
   */
  _onSelectedRecordMediaUpdate(record) {
    // if( record._has360ImageList ) {
    //   this.$.download.style.display = 'none';
    //   return;
    // }

    this.name = this.record.name || "";

    // if (!record.image) return;

    // this.$.download.render({
    //   resolution : [record.image.width, record.image.height],
    //   fileFormat : record.image.encodingFormat,
    //   size : record.image.contentSize ? parseInt(record.image.contentSize) : 0,
    //   url : record.image.url
    // });

    // this._renderIdentifier(this.record, record);
    // this._renderFcLink(this.record, record);
  }

  /**
   * @method _addMetadataRow
   * @description update metadata table row
   *
   * @param {Array} metadata
   * @param {String} attr
   * @param {String} label
   */
  _addMetadataRow(metadata, attr, label) {
    if (!this[attr]) return;
    metadata.push({
      attr: label || attr,
      value: this[attr],
    });
  }

  /**
   * @method _copyLink
   * @description bound to click event on button.  Copy text to clipboard
   * show UI interaction.
   */
  _copyLink() {
    this.$.link.focus();
    this.$.link.setSelectionRange(0, 9999);
    document.execCommand("Copy");

    this.$.copyIcon.icon = "check";
    this.$.copyButton.setAttribute("active", "active");

    setTimeout(() => {
      this.$.copyIcon.icon = "content-copy";
      this.$.copyButton.removeAttribute("active", "active");
    }, 3000);
  }

  // _onBookViewPageChange(e) {
  //   let appMediaDownload = document.querySelector('app-media-download');
  //   if( appMediaDownload ) {
  //     appMediaDownload.brPageChange(e.detail);
  //   }
  // }
}

customElements.define("app-record", AppRecord);


/***/ }),

/***/ "./public/elements/pages/record/app-record.tpl.js":
/*!********************************************************!*\
  !*** ./public/elements/pages/record/app-record.tpl.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _ucd_lib_theme_sass_1_base_html_links_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ucd-lib/theme-sass/1_base_html/_links.css */ "./public/node_modules/@ucd-lib/theme-sass/1_base_html/_links.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_buttons_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_buttons.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_buttons.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_headings_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_headings.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_headings.css.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../lib/utils/index.js */ "./public/lib/utils/index.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4__);








function render() {
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <style include="shared-styles">
      ${_ucd_lib_theme_sass_1_base_html_links_css__WEBPACK_IMPORTED_MODULE_1__["default"]} ${_ucd_lib_theme_sass_2_base_class_buttons_css__WEBPACK_IMPORTED_MODULE_2__["default"]} ${_ucd_lib_theme_sass_2_base_class_headings_css__WEBPACK_IMPORTED_MODULE_3__["default"]} :host {
        display: block;
        background-color: var(--super-light-background-color);
      }

      [hidden] {
        display: none !important;
      }

      .container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: normal;

        width: 60%;
        margin: auto;
      }

      .container h1 {
        font-weight: 800;
        text-align: center;
        color: var(--color-black-60);
        margin-bottom: 0.5rem;
        font-size: 1.7425rem;
      }

      .copyright {
        text-align: center;
        color: var(--color-aggie-blue-80);
      }

      .copyright span {
        font-size: 1.25rem;
        vertical-align: middle;
        font-weight: bold;
      }

      .copyright-text {
        font-size: 0.875rem;
        text-decoration: underline;
        display: inline;
      }

      .label {
        font-weight: var(--fw-bold);
        color: var(--default-primary-color);
      }

      .section {
        margin-bottom: 15px;
      }
      .section.bordered {
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px dashed var(--medium-background-color);
      }

      .metadata-row,
      .download-section {
        display: flex;
        margin: 0.85rem 0;
      }
      .metadata-row .attr,
      .download-section .label {
        flex: 0.25;
        color: var(--default-primary-color);
        font-weight: var(--fw-bold);
      }
      .metadata-row .value,
      .download-section .download-options {
        flex: 0.75;
        word-break: break-word;
      }

      .part-of {
        background-image: url(/images/watercolors/blue--1.webp);
        background-size: cover;
        display: flex;
        min-height: 12rem;
        margin: 3rem 0;
        background-color: var(--color-aggie-blue-30);
      }

      /* .part-of img {
        max-width: 100%;
        max-height: 100%;
        height: auto;
        width: auto;
      } */

      .part-of-img-container {
        overflow: hidden;
        width: 100%;
        aspect-ratio: 4 / 3;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .part-of img {
        position: relative;
        /* top: calc(-65%); */
      }

      .part-of div {
        margin: 2rem;
        flex: 1;
      }

      .part-of div:nth-child(1) {
        text-align: center;
      }

      .part-of .collection-info {
        flex: 2;
        margin: auto 0;
      }

      .part-of .collection-info h4 {
        margin: 0.3rem 0 0;
        font-weight: 600;
      }

      .part-of .collection-info h4 a {
        color: var(--color-aggie-blue);
        text-decoration: none;
      }
      .part-of .collection-info h4 a:hover {
        text-decoration: underline;
      }

      .part-of .collection-info p {
        margin: 0;
      }

      .part-of .collection-info span {
        font-weight: 800;
        text-decoration: none;
        color: var(--color-aggie-blue-80);
      }

      #identifierValue a,
      #fedoraValue a {
        display: block;
      }

      #identifierValue a:nth-child(1),
      #fedoraValue a:nth-child(1) {
        padding-bottom: 1rem;
      }

      @media (max-width: 756px) {
        .container {
          width: 85%;
        }
      }

      @media (max-width: 600px) {
        .container {
          width: 95%;
        }

        .metadata-row,
        .download-section {
          display: block;
        }

        .part-of .collection-info {
          margin: 1rem 1rem 1rem 0;
        }

        .part-of {
          min-height: 0;
        }

        .part-of div {
          margin: 2rem 1.5rem 2rem 1rem;
        }

        .part-of .collection-info h4 {
          font-weight: 800;
          font-size: 1.2rem;
          margin: 0;
        }

        .part-of .collection-info > * {
          padding: .25rem 0;
        }

        .collection-info {
          font-size: 1.1rem;
        }
      }

    app-record .admin-edit .left-panel {
      position: absolute;
      left: 20%;
      width: 60%;
      top: calc(170px + 3rem);
      z-index: 500;
      border-bottom: 6px dotted var(--color-aggie-gold);
      padding-bottom: 1.5rem;
    }

    app-record .admin-edit .right-panel {
      position: absolute;
      right: 3rem;
      top: calc(170px + 3rem);
      z-index: 500;
    }

    app-record .admin-edit .icon-wrapper {
      height: 50px;
      width: 50px;
      background-color: var(--color-aggie-blue-70);
      border-radius: 50%;
      display: inline-block;
      margin-left: .3rem;
      cursor: pointer;
    }

    app-record .admin-edit ucdlib-icon {
      fill: white;
      width: 50%;
      height: 50%;
      margin: auto;
      padding-top: 0.6rem;      
    }

    app-record .admin-edit .icon-wrapper.edit {
      background-color: var(--color-aggie-blue);
    }

    app-record .admin-edit .icon-wrapper:hover {
      background-color: var(--color-aggie-blue);
    }

    app-record .admin-edit .icon-wrapper.edit:hover {
      background-color: var(--color-aggie-gold);
    }

    app-record .admin-edit .icon-wrapper.edit:hover ucdlib-icon {
      fill: var(--color-aggie-blue);
    }

    .edit-overlay {
      background: white;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: .55;
      z-index: 400;
    }

    a.create-issue {
      height: 1.4rem;
      min-height: 1.4rem;
    }

    ucdlib-md p {
      margin-top: 0;
    }

    .admin-edit h3 {
      color: var(--color-aggie-blue);
      font-style: italic;
      margin-bottom: 1rem;
    }

    .admin-edit .dropdown-label {
      font-weight: bold;
      margin-bottom: .5rem;
    }

    .admin-edit .dropdown-label.image-skew {
      margin-top: 1.5rem;
    }

    .admin-edit .deskew-status {
      margin-top: 0.6rem;
    }

    .admin-edit .deskew-status ucdlib-icon { 
      padding: 0;
      width: 24px;
      height: 24px;
      min-width: 24px;
      min-height: 24px;
    }

    .admin-edit .deskew-status .deskew-running {
      fill: var(--color-aggie-gold);
    }

    .admin-edit .deskew-status .deskew-finished {
      fill: var(--color-quad);
    }

    .admin-edit .deskew-status .deskew-error {
      fill: var(--color-double-decker);
    }

    .admin-edit .deskew-wrapper,
    .admin-edit .deskew-action-wrapper {
      display: flex;
      gap: 1rem;
    }

    .admin-edit .deskew-wrapper ucd-theme-slim-select {
      flex: 1;
      min-height: 2.5em;
    }

    .admin-edit .deskew-action-wrapper {
      flex: 0;
      white-space: nowrap;
    }

    .admin-edit .image-skew-description,
    .admin-edit .image-skew-status,
    .admin-edit .image-skew-error {
      color: var(--color-black-70);
      font-size: .9rem;
      margin: .25rem 0 .5rem 0;
    }

    .admin-edit .image-skew-status {
      font-style: italic;
      margin-top: .5rem;
    }

    .admin-edit .image-skew-error {
      color: var(--color-double-decker);
    }

    .admin-edit .apply-button {
      font-size: 1rem;
    }

    [icon="ucdlib-dams:fa-rotate"] {
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    @media (max-width: 768px) {
      app-record .admin-edit .left-panel {
        left: 5%;
        width: 90%;
      }
    }

    @media (max-width: 500px) {
      .admin-edit .deskew-wrapper {
        display: block;
      }

      .admin-edit .deskew-action-wrapper {
        padding-top: 1rem;
        display: flex;
      }
    }

    </style>

    <div class="edit-overlay" ?hidden="${!this.editMode || !this.isUiAdmin}">
    </div>
    <div class="admin-edit" ?hidden="${!this.isUiAdmin}">
      <div class="left-panel" ?hidden="${!this.editMode || !this.isUiAdmin}">
        <h3 class="form-label">Item Display</h3>
        <p class="form-label dropdown-label">Viewer</p>
        <ucd-theme-slim-select
          class="item-display-select"
          @change="${this._ssSelectBlur}"
          @focusin="${this._ssSelectFocus}"
          @click="${this._ssSelectFocus}"
          @blur="${this._ssSelectBlur}">
          <select>
              <option .value=${this.itemDefaultDisplay} ?selected=${this.itemDisplay === this.itemDefaultDisplay}>
                Collection Default (${this.itemDefaultDisplay})
              </option>
              <option .value=${(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4___default().itemDisplayType.brTwoPage)} ?selected=${this.itemDisplay !== this.itemDefaultDisplay && this.itemDisplay === (_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4___default().itemDisplayType.brTwoPage)}>
                ${(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4___default().itemDisplayType.brTwoPage)}
              </option>
              <option .value=${(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4___default().itemDisplayType.brOnePage)} ?selected=${this.itemDisplay !== this.itemDefaultDisplay && this.itemDisplay === (_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4___default().itemDisplayType.brOnePage)}>
                ${(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4___default().itemDisplayType.brOnePage)}
              </option>
              <option .value=${(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4___default().itemDisplayType.imageList)} ?selected=${this.itemDisplay !== this.itemDefaultDisplay && this.itemDisplay === (_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4___default().itemDisplayType.imageList)}>
                ${(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4___default().itemDisplayType.imageList)}
              </option>
          </select>
        </ucd-theme-slim-select>

        <!-- 
        see issue #359, this was a stop gap that we fixed in the image processing workflow
        will likely be removed in the future, for now just disabling the ui controls
        
        <p class="form-label dropdown-label image-skew">Image Tilt Correction</p>
        <p class="image-skew-description">Run this process to fix tilted images. This is a realtime process, there may be some delay.</p>
        <div class="deskew-wrapper">
          <div class="deskew-action-wrapper">
            <button class="btn apply-button" ?disabled="${this.workflowRunning || this.workflowStatusLoading}" @click="${this._runWorkflow}">Run process</button>
            <div class="deskew-status">
              <ucdlib-icon ?hidden="${this.workflowError || !this.workflowRunning || !this.firstStatusLoaded}" class="deskew-running" icon="ucdlib-dams:fa-rotate"></ucdlib-icon>
            </div>
          </div>
        </div>
        <p class="image-skew-status">${this.workflowStatus}</p> 
        -->
      </div>

      <div class="right-panel">
        <div class="icon-wrapper" ?hidden="${this.editMode || !this.isUiAdmin}" @click="${this._onEditClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-pen"></ucdlib-icon>
        </div>
        <div class="icon-wrapper edit" ?hidden="${!this.editMode || !this.isUiAdmin}" @click="${this._onSaveClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-floppy-disk"></ucdlib-icon>
        </div>
        <div class="icon-wrapper edit" ?hidden="${!this.editMode || !this.isUiAdmin}" @click="${this._onCancelEditClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-xmark"></ucdlib-icon>
        </div>
      </div>
    </div>


    <app-media-viewer></app-media-viewer>

    <div class="container" style="padding-bottom: 50px;">
      ${this.name
        ? lit__WEBPACK_IMPORTED_MODULE_0__.html`<h1>${this.name}</h1>`
        : lit__WEBPACK_IMPORTED_MODULE_0__.html``
      }
      
      <div class="copyright" ?hidden="${!this.copyright || !this.copyright.label || !this.copyright.url}">
        <span>&copy;</span>
        <a href="${this.copyright.url}"
          class="copyright-text">${this.copyright.label}</a>
      </div>

      <div class="part-of">
        <div class="part-of-img-container"><img src="${this.collectionImg}" alt="" /></div>
        <div class="collection-info">
          <p style="font-style: italic;">part of digital collection</p>
          ${this.collectionId && this.collectionName
            ? lit__WEBPACK_IMPORTED_MODULE_0__.html`<h4><a href="${this.collectionId}">${this.collectionName}</a></h4>`
            : lit__WEBPACK_IMPORTED_MODULE_0__.html``
          }
          <span>${this.collectionItemCount} items</span>
        </div>
      </div>

      <div class="download-section" ?hidden="${this.disableDownload}">
        <div class="label">Download</div>
        <div class="download-options">
          <app-media-download
            id="download"
            ?hidden="${this.isBagOfFiles}"></app-media-download>
          <app-fs-media-download
            id="download"
            ?hidden="${!this.isBagOfFiles}"></app-fs-media-download>
        </div>
      </div>

      <div ?hidden="${!this.date}" class="metadata-row">
        <div class="attr">Date</div>
        <div class="value" id="dateValue">${this.date}</div>
      </div>

      <div ?hidden="${!this.description || !this.description.length}" class="metadata-row">
        <div class="attr">Description</div>
        <div class="value" id="descriptionValue">
          <ucdlib-md id="md">
            <ucdlib-md-content>
              ${this.description}
            </ucdlib-md-content>
          </ucdlib-md>
        </div>
      </div>

      <div ?hidden="${!this.publisher}" class="metadata-row" id="publisher">
        <div class="attr">Publisher</div>
        <div class="value" id="publisherValue">${this.publisher}</div>
      </div>

      <div
        ?hidden="${!this.subjects || !this.subjects.length}"
        class="metadata-row"
        id="subject">
        <div class="attr">Subjects</div>
        <div class="value" id="subjectValue">
          ${this.subjects.map(
            (about, index) =>
              lit__WEBPACK_IMPORTED_MODULE_0__.html`${index > 0 ? ", " : ""}<a href="${_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4___default().getSubjectUrl(this.RecordModel, about["name"] || about["@id"])}" @click="${this._onSubjectClick}">${about["name"] || about["@id"]}</a>`
          )}
        </div>
      </div>

      <div ?hidden="${!this.creator || !this.creator.length}" class="metadata-row" id="creator">
        <div class="attr">Creator</div>
        <div class="value" id="creatorValue">
          ${this.creator.map(
            (c, index) =>
              lit__WEBPACK_IMPORTED_MODULE_0__.html`${index > 0 ? ", " : ""}<a href="${_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4___default().getCreatorUrl(this.RecordModel, c)}" @click="${this._onCreatorClick}">${c}</a>`
          )}
        </div>
      </div>

      <div ?hidden="${!this.callNumber}" class="metadata-row" id="callNumber">
        <div class="attr">Call Number</div>
        <div class="value" id="callNumberValue">${this.callNumber}</div>
      </div>

      <div ?hidden="${!this.material}" class="metadata-row" id="material">
        <div class="attr">Format</div>
        <div class="value" id="materialValue">${this.material}</div>
      </div>

      <div class="metadata-row" id="identifier">
        <div class="attr">ARK / DOI</div>
        <div class="value" id="identifierValue">
          ${this.arkDoi.map((link) => lit__WEBPACK_IMPORTED_MODULE_0__.html`<a @click="${this._arkDoiClick}" href="${link}">${link.replace('/item', '')}</a>`)}
        </div>
      </div>

      <div class="metadata-row">
        <div class="attr">Fedora Link</div>
        <div class="value" id="fedoraValue">
          ${this.fedoraLinks.map((link) => lit__WEBPACK_IMPORTED_MODULE_0__.html`<a href="${link}">${link.replace('/fcr:metadata', '')}</a>`)}
        </div>
      </div>

      <div class="metadata-row" ?hidden="${!this.showReportButton}">
        <div class="attr">Modify</div>
        <div class="value">
          <a class="create-issue btn btn--primary" target="_blank" href="${this.githubIssueUrl}">Request Metadata Change (via GitHub)</a>
        </div>
      </div>
    </div>

    <app-citation .record="${this.citationRoot}" citation-type-label="Item"></app-citation>
  `;
}


/***/ }),

/***/ "./public/elements/pages/record/viewer/app-audio-viewer.js":
/*!*****************************************************************!*\
  !*** ./public/elements/pages/record/viewer/app-audio-viewer.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppAudioViewer)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_audio_viewer_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-audio-viewer.tpl.js */ "./public/elements/pages/record/viewer/app-audio-viewer.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _utils_app_share_btn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/app-share-btn */ "./public/elements/utils/app-share-btn.js");
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../lib/config */ "./public/lib/config.js");
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lib_config__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../lib/utils */ "./public/lib/utils/index.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lib_utils__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lib_utils_video_lib_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../lib/utils/video-lib-loader */ "./public/lib/utils/video-lib-loader.js");
/* harmony import */ var plyr_dist_plyr_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! plyr/dist/plyr.css */ "./public/node_modules/plyr/dist/plyr.css");
/* harmony import */ var plyr_dist_plyr_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(plyr_dist_plyr_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var shaka_player_dist_controls_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! shaka-player/dist/controls.css */ "./public/node_modules/shaka-player/dist/controls.css");
/* harmony import */ var shaka_player_dist_controls_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(shaka_player_dist_controls_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var plyr_dist_plyr_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! plyr/dist/plyr.svg */ "./public/node_modules/plyr/dist/plyr.svg");
/* harmony import */ var plyr_dist_plyr_svg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(plyr_dist_plyr_svg__WEBPACK_IMPORTED_MODULE_9__);
// https://github.com/sampotts/plyr
// https://github.com/google/shaka-player/
// https://github.com/google/shaka-player/tree/master/docs/tutorials















let AUDIO_STYLES = (plyr_dist_plyr_css__WEBPACK_IMPORTED_MODULE_7___default())+(shaka_player_dist_controls_css__WEBPACK_IMPORTED_MODULE_8___default());


let SPRITE_SHEET = (plyr_dist_plyr_svg__WEBPACK_IMPORTED_MODULE_9___default());

class AppAudioViewer extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {
  
  static get properties() {
    return {
      isMultimedia : { type : Boolean }
    };
  }

  constructor() {
    super();
    this.render = _app_audio_viewer_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);

    this.isMultimedia = false;

    this._injectModel('AppStateModel', 'MediaModel');
    this.libsLoaded = false;
    this.$ = {};
  }

  async _onAppStateUpdate(e) {
    if ( this.fullPath !== e.location.fullpath ) { 
      this._stop();
    }

    this.fullPath = e.location.fullpath;
    this._updateStyles();

    let selectedRecord = await this.AppStateModel.getSelectedRecord();
    if( selectedRecord && selectedRecord.selectedMedia ) this._onSelectedRecordMediaUpdate(selectedRecord.selectedMedia);
  }

  async firstUpdated(e) {
    this.$.audio  = this.shadowRoot.getElementById('audio_player');
    this.$.poster = this.shadowRoot.getElementById('audio_poster');

    this.fullPath = (await this.AppStateModel.get()).location.fullpath;
    
    // webpack module is base64 encoded URL, check if this happened 
    // and decode, then set svg to innerHtml inside the shadow dom.
    if( SPRITE_SHEET.indexOf('data:image/svg+xml;base64') > -1 ) {
      SPRITE_SHEET = atob(SPRITE_SHEET.replace('data:image/svg+xml;base64,', ''));
    }
    this.shadowRoot.querySelector('#sprite-plyr').innerHTML = SPRITE_SHEET;

    this._updateStyles();
  }

  _updateStyles() {
    // decide where to put css
    // The PLYR library isn't aware of shadydom so we need to manually
    // place our styles in document.head w/o shadydom touching them.
    let plyrStyles = document.createElement('style');
    plyrStyles.innerHTML = AUDIO_STYLES;
    if( window.ShadyDOM && window.ShadyDOM.inUse ) {
      document.head.appendChild(plyrStyles);
      this.hideControls = false;
    } else {
      this.shadowRoot.appendChild(plyrStyles);
      this.hideControls = true;
    }
  }

  /**
   * @method _onSelectedRecordMediaUpdate
   * @description from AppStateModel, called when a records media is selected
   * 
   * @param {Object} media 
  **/
  async _onSelectedRecordMediaUpdate(media) {
    if( !media ) return;
    if ( _lib_utils__WEBPACK_IMPORTED_MODULE_5___default().getMediaType(media) !== 'AudioObject' ) return;

    this.media = media;

    if( this.libsLoaded ) {
      this._loadAudio();
      return;
    }

    // dynamically load plyr and shaka libs
    let {plyr} = await _lib_utils_video_lib_loader__WEBPACK_IMPORTED_MODULE_6__["default"].load();

    this.audioPlayer = new plyr(this.$.audio, {
      fullscreen : {enabled: false},
      captions: {update: false},
      controls : ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume']
    });

    this.style.display = 'block';
    this.libsLoaded = true;
    this._loadAudio();

    this._updateStyles();
  }

  _loadAudio() {
    let sourceEle = this.shadowRoot.querySelector('#audio_player source');
    sourceEle.src = (_lib_config__WEBPACK_IMPORTED_MODULE_4___default().fcrepoBasePath)+this.media['@id'];
    sourceEle.type = this.media.fileFormat || this.media.hasMimeType || this.media.encodingFormat || '';
    
    // FF Hack.  Range slider not going back to 0 on stop
    try {
      this.audioPlayer.stop();
      let ele = this.shadowRoot.querySelector('input[type="range"][data-plyr="seek"]');
      if( ele ) ele.value = 0;
    } catch(e) {}

    this.shadowRoot.querySelector('#audio_player').load();

    let poster = this.media.thumbnailUrl  ? this.media.thumbnailUrl+'/svc:iiif/full/,400/0/default.jpg' : '';
    if ( poster ) {
      this.$.poster.style.display = 'block';
      this.$.poster.style.backgroundImage = "url(" + poster + ")";
    } else {
      this.$.poster.style.display = 'none';
    }
  }

  /**
   * Stop playback and reset to start
   **/
  _stop() {
    if( !this.audioPlayer ) return;
    this.audioPlayer.stop();
  }
}

customElements.define('app-audio-viewer', AppAudioViewer);

/***/ }),

/***/ "./public/elements/pages/record/viewer/app-audio-viewer.tpl.js":
/*!*********************************************************************!*\
  !*** ./public/elements/pages/record/viewer/app-audio-viewer.tpl.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var plyr_dist_plyr_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! plyr/dist/plyr.css */ "./public/node_modules/plyr/dist/plyr.css");
/* harmony import */ var plyr_dist_plyr_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(plyr_dist_plyr_css__WEBPACK_IMPORTED_MODULE_1__);



function render() { 
return lit__WEBPACK_IMPORTED_MODULE_0__.html`
<style>
  :host {
    display: none;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
  }

  :host app-share-btn {
    fill: var(--color-aggie-blue-80);
  }

  [hidden] {
    display: none !important;
  }

  .button {
    background-color: var(--color-aggie-blue-80);
    border-radius: 50%;
    display: inline-block;
    width: 50px;
    height: 50px;
    margin-left: 0.4rem;
  }

  .container {
    display: block;
    width: 100%;
  }

  #audio_poster {
    display: none;
    margin: 0 auto;
    margin-bottom: 10px;
    max-width: 400px;
    height: 400px;
    border: 1px solid black;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .layout {
    display: flex;
    justify-content: center;
    border-bottom: 6px dotted var(--color-aggie-gold);
    width: 60%;
    margin: 0 auto;
    padding-bottom: 0.7rem;
  }

  .layout.multimedia {
    border-bottom: none;
  }

  .plyr--audio {
    max-width: 500px !important;
    width: 100%;
    border-radius: 5px;
  }

  .plyr--full-ui input[type=range] {
    color: #daaa00 !important;
  }

  button.plyr__control.plyr__control--overlaid, 
  button.plyr__control.plyr__control:hover {
    background: var(--color-dams-secondary, #FFBF00);
  }
  .plyr--full-ui input[type=range] { 
    color: var(--color-dams-secondary, #FFBF00) !important;
  }

  .volume-icon {
    fill: var(--color-aggie-blue-50, #B0D0ED);
    height: 107px;
    margin: 0 auto;
  }

  .tooltip {
    cursor: pointer;
    position: relative;
  }

  .tooltip:hover:before {
    content: attr(data-tooltip-text);
    position: absolute;
    bottom: 60px;
    right: 50%;
    transform: translateX(50%);
    padding: 5px 10px;
    border-radius: 5px;
    background: var(--color-aggie-blue);
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    white-space: nowrap;
    opacity: 0;
    transition: .2s opacity ease-out;
    z-index: 10;
  }

  .tooltip:hover:after {
    content: "";
    position: absolute;
    bottom: 50px;
    right: 20px;
    border: 5px solid var(--color-aggie-blue);
    border-color: var(--color-aggie-blue) transparent transparent transparent;
    opacity: 0;
    transition: .2s opacity ease-out;
  }

  .tooltip:hover:before,
  .tooltip:hover:after {
    opacity: 1;
  }

  .tooltip:has(> app-share-btn[popup]):hover:before,
  .tooltip:has(> app-share-btn[popup]):hover:after {
    display: none;
  }

  .button:hover,
  .button:has(> app-share-btn[popup]) {
    background-color: var(--color-aggie-blue);
  }

  ${(plyr_dist_plyr_css__WEBPACK_IMPORTED_MODULE_1___default())}
</style>
<div class="container">
  <ucdlib-icon class="volume-icon" icon="ucdlib-dams:fa-volume-high"></ucdlib-icon>
  <div id="sprite-plyr" style="display: none;"></div>
  <div id="audio_poster"></div>

  <div class="layout ${this.isMultimedia ? 'multimedia' : ''}">
    <audio id="audio_player" controls>
      <source>
    </audio>
    <div ?hidden="${this.isMultimedia}" class="button tooltip" data-tooltip-text="Share">
      <app-share-btn></app-share-btn>
    </div>
  </div>

</div>
`
}

/***/ }),

/***/ "./public/elements/pages/record/viewer/app-fs-viewer.js":
/*!**************************************************************!*\
  !*** ./public/elements/pages/record/viewer/app-fs-viewer.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppFsViewer)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_fs_viewer_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-fs-viewer.tpl.js */ "./public/elements/pages/record/viewer/app-fs-viewer.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _utils_app_virtual_scroller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/app-virtual-scroller */ "./public/elements/utils/app-virtual-scroller.js");
/* harmony import */ var _polymer_iron_icons_editor_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @polymer/iron-icons/editor-icons */ "./public/node_modules/@polymer/iron-icons/editor-icons.js");
/* harmony import */ var bytes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bytes */ "./public/node_modules/bytes/index.js");
/* harmony import */ var bytes__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bytes__WEBPACK_IMPORTED_MODULE_5__);










const ICONS = {
  'folder' : ['folder'],
  'fin-icons:image-solid' : ['tif', 'tiff', 'gif', 'jpg', 'jp2', 'jpeg', 'webp', 'bmp', 'png'],
  'fin-icons:video-solid' : ['avi', 'mp4', 'flv', 'wmv', 'mov'],
  'fin-icons:sound-solid' : ['wav', 'mp3', 'mid', 'aif'],
  'fin-icons:text-solid' : ['doc', 'docx', 'txt', 'rtf', '.odt'],
  'fin-icons:spreadsheet-solid' : ['ods', 'csv', 'tsv', 'xsl', 'xslx'],
  'fin-icons:pdf-solid' : ['pdf'],
  'fin-icons:compressed-solid' : ['zip', 'rar', 'arj', 'gz', 'tgz']
}
const UNKNOWN_ICON = 'fin-icons:file-solid';

class AppFsViewer extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {

  static get properties() {
    return {
      title : {type: String},
      loadingFiles : {type: Boolean},
      loadingSearch : {type: Boolean},
      currentDir : {type: String},
      files : {type: Array},
      selectedFile : {type: String},
      mode : {type: String},
      thumbnail : {type: String},
      lineHeight : {type: Number},
    }
  }

  constructor() {
    super();
    this.render = _app_fs_viewer_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);

    this.reset();

    this._injectModel('AppStateModel', 'RecordModel');

    this.iconMap = {};
    for( let icon in ICONS ) {
      for( let ext of ICONS[icon] ) {
        this.iconMap[ext] = icon;
      }
    }

    window.addEventListener('resize', () => this._onResize());
  }

  firstUpdated() {
    this.contentBody = this.shadowRoot.querySelector('.content-body');
    this.scrollPanel = this.shadowRoot.querySelector('app-virtual-scroller');
    this.scrollPanel.setItemRenderer(this.renderRow, this);

    this.parentNode.removeChild(this);
    document.body.appendChild(this);

    this.filenameWidth = '30px';

    // setTimeout(() => {
    //   this.show();
    // }, 1000)
    
  }

  updated(props) {
    if( props.has('selectedFile') ) {
      for( let file of this.files ) {
        file.selected = (file.fullUrl === this.selectedFile);
      }
      this.scrollPanel.requestUpdate();
    }
  }

  // connectedCallback() {
  //   super.connectedCallback();
  //   this.background = this.querySelector('#background');
  //   this.background.style.display = 'none';
  //   this.shadowRoot.removeChild(this.background);
  //   document.body.appendChild(this.background);
  // }

  _onResize() {
    if( !this.contentBody ) return;
    // this.scrollPanel.style.height = (this.contentBody.offsetHeight - 175)+'px';

    let baseHeight = 335;
    if( window.innerWidth > 700 ) {
      this.scrollPanel.style.height = (window.innerHeight - baseHeight - 100)+'px';
    } else {
      this.scrollPanel.style.height = (window.innerHeight - baseHeight)+'px';
    }

    
    this.filenameWidth = ( this.scrollPanel.offsetWidth - 155 )+'px';
    this.scrollPanel.requestUpdate();
  }

  _onAppStateUpdate(e) {
    if( this.selectedRecord === e.selectedRecord ) return;
    if( !e.selectedRecord ) {
      return this.reset();
    }

    this.reset();

    this.selectedRecord = e.selectedRecord;
    this.selectedRecordMedia = e.selectedRecordMedia;

    if( this.selectedRecord && this.selectedRecord.selectedMedia['@type'].includes('http://digital.ucdavis.edu/schema#BagOfFiles') ) {
      this._browseDirectory();
      this.title = this.selectedRecord.root.name || this.selectedRecord.root.title;
      this.thumbnail = this.selectedRecord.root.thumbnailUrl || '';
    }
  }

  async show() {
    this.style.display = 'block';
    document.body.style.overflow = 'hidden';
    // window.scrollTo(0, 0);

    this._onResize();

    this._onAppStateUpdate(await this.AppStateModel.get());

    setTimeout(() => {
      this._onResize();
      this.scrollPanel._onResize();
    }, 50);
  }

  hide() {
    this.style.display = 'none'
    document.body.style.overflow = 'auto';
  }

  reset() {
    this.selectedRecord = null;
    this.loadingFiles = false;
    this.loadingSearch = false;
    this.currentDir = '/';
    this.files = [];
    this.lineHeight = 41;
    this.selectedFile = '';
  }

  _renderBreadcrumbs() {
    if( this.mode === 'search' ) {
      return lit__WEBPACK_IMPORTED_MODULE_0__.html`<iron-icon icon="chevron-right"></iron-icon>
      <span class="breadcrumb">Search Results</span>`;
    }

    let fullDirPath = [];

    return this.currentDir
      .replace(/^\//, '')
      .split('/')
      .map(dir =>  {
        fullDirPath.push(dir) 
        if( dir === '' ) return lit__WEBPACK_IMPORTED_MODULE_0__.html``;

        return lit__WEBPACK_IMPORTED_MODULE_0__.html`<iron-icon icon="chevron-right"></iron-icon>
        <a class="breadcrumb" @click="${this._onBreadcrumbClicked}" dir="${'/'+fullDirPath.join('/')}">${dir}</a>`
      });
  }

  renderRow(index) {
    let file = this.files[index];
    let icon = this._getIcon(file);

    return lit__WEBPACK_IMPORTED_MODULE_0__.html`
      <div class="row" style="height: ${this.lineHeight-1}px" ?directory="${file.isDirectory}" ?selected="${file.selected}" index="${index}" @click="${this._onItemClicked}" .context="${this}">
        <div>
          <div class="icon">
            <iron-icon icon="${icon}"></iron-icon>
          </div>
          <div class="file" style="width: ${this.filenameWidth}">
            <div class="filename">${file.filename}</div>
            <div class="directory" ?hidden="${this.mode === 'browse'}">${file.directory || '/'}</div>
          </div>
          <div class="filesize">${file.fileSize !== undefined ? bytes__WEBPACK_IMPORTED_MODULE_5___default()(file.fileSize) : '-'}</div>
          <div class="selected-file">
            <iron-icon icon="check" ?hidden="${!file.selected}"></iron-icon>
          </div>
        </div>
      </div>
    `
  }

  _getIcon(file) {
    let ext = file.isDirectory ? 'folder' : (file.filename || '').split('.').pop();
    let icon = this.iconMap[ext];
    if( icon ) return icon;
    return UNKNOWN_ICON;
  }

  _onItemClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    
    // stupid hack, let html always scopes events to render host
    let $this = e.currentTarget.context;
    let file = $this.files[index];

    if( file.isDirectory ) {
      $this._browseDirectory(file['@id'].replace($this.selectedRecord['@id'], ''));
    } else {
      $this.selectedFile = file.fullUrl;
    }
  }

  _onInputKeyup(e) {
    let text = e.currentTarget.value;

    if( this._autocompleteTimer ) {
      clearTimeout(this._autocompleteTimer);
    }
    this._autocompleteTimer = setTimeout(() => {
      this._autocompleteTimer = null;
      this._typeaheadSearch(text);
    }, 300);
  }

  async _typeaheadSearch(text) {
    this.typeaheadSearchText = text;
    if( text === '' ) {
      this.files = [];
      this._browseDirectory();
      return;
    }

    this.mode = 'search';
    this.lineHeight = 52;
    this.selectedFile = '';

    let searchDoc = {
      text,
      filters : {
        'collectionId' : {
          type: 'keyword',
          value: [this.selectedRecord.collectionId],
          op: 'or'
        },
        '@id' : {
          type : 'prefix',
          value : this.selectedRecord['@id']
        }
      },
      sort : null,
      limit: 9999,
      offset: 0,
      facets: {},
      textFields : ['filename']
    }

    let resp = await this.RecordModel.typeaheadSearch(searchDoc, {allRecords: true});
    if( this.typeaheadSearchText !== text ) return;

    this.setFiles(resp.payload.results, false);
  }

  async _browseDirectory(dir) {
    if( this.mode === 'browse' && this.currentDir === dir ) return;

    this.mode = 'browse';
    this.lineHeight = 45;
    this.shadowRoot.querySelector('#searchInput').value = '';
    this.selectedFile = '';

    if( !dir ) {
      if( this.currentDir ) dir = this.currentDir;
      else dir = '/';
    }

    this.currentDir = dir;

    let searchDoc = {
      filters : {
        // 'collectionId' : {
        //   type: 'keyword',
        //   value: [this.selectedRecord.collectionId],
        //   op: 'or'
        // },
        'directParent' : {
          type : 'keyword',
          value : [this.selectedRecord['@id']+this.currentDir.replace(/\/$/, '')],
          op : 'or'
        }
      },
      sort : null,
      limit: 9999,
      offset: 0,
      facets: {},
      textFields : []
    }

    let resp = await this.RecordModel.typeaheadSearch(searchDoc, {debug: true, allRecords: true});
    this.setFiles(resp.payload.results);
  }

  setFiles(files, sort=true) {
    files = files.map(file => {
      file.directory = file.directParent.replace(this.selectedRecord['@id'], '');
      if( file['@type'].includes('http://fedora.info/definitions/v4/repository#Binary') ) {
        file.isFile = true;
      } else {
        file.isDirectory = true;
        file.filename = file['@id'].split('/').pop();
      }
      file.fullUrl = this._getFullFileUrl(file);
      file.selected = (file.fullUrl === this.selectedFile);
      return file;
    });

    if( sort ) {
      files.sort((a,b) => a.filename.toLowerCase() > b.filename.toLowerCase() ? 1 : -1);
    }

    this.files = files;
  }

  _getFullFileUrl(file) {
    return window.location.protocol + '//' + window.location.host + '/fcrepo/rest' + file['@id'];
  }

  _onClearSearchClicked() {
    this._browseDirectory(this.currentDir);
  }

  _onBreadcrumbClicked(e) {
    this._browseDirectory(e.currentTarget.getAttribute('dir'));
  }

}

customElements.define('app-fs-viewer', AppFsViewer);


/***/ }),

/***/ "./public/elements/pages/record/viewer/app-fs-viewer.tpl.js":
/*!******************************************************************!*\
  !*** ./public/elements/pages/record/viewer/app-fs-viewer.tpl.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");


function render() { 
return lit__WEBPACK_IMPORTED_MODULE_0__.html`

<style>
  :host {
    display: none;
    position: absolute;
    z-index: 10000;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    /* animation: 300ms linear fs-viewer-animate-in; */
  }

  @keyframes fs-viewer-animate-in {
    0% {
      transform: scale(1.2);
      opacity: 0.5
    }
    100% {
      transform: scale(1);
      opacity: 1
    }
  }

  .layout {
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    justify-content: center;
  }

  .content {
    margin: 50px 0;
    height: calc(100vh - 100px);
    width: 700px;
    background-color: var(--super-light-background-color);
    display: flex;
    flex-direction: column;
  }

  h2 {
    margin: 0;
  }

  .content-body {
    flex: 1;
    padding: 20px;
  }

  .header-layout {
    color: var(--default-primary-color);
    background-color: var(--light-background-color);
    padding: 20px;
    display: flex;
  }

  .header-image {
    margin-right: 20px;
  }

  .header-image .img, .header-image iron-icon[icon="fin-icons:various-outline-stacked"] {
    height: 100px;
    width: 100px;
  }

  #searchInput {
    font-size: 16px;
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    padding: 0 5px;
    background: white;
    border: none;
    height: 45px;
    outline: none;
    background-color: white;
    border-radius: 0;
  }

  .row {
    /* height: 100%; */
  }

  .vs-row[hover] {
    background-color: var(--color-light-yellow);
  }

  .row {
    cursor: pointer;
    /* background-color: var(--color-light-yellow); */
  }

  .row > div {
    display: flex;
    align-items: center;
    height: 100%;
    margin: 0 8px;
    border-bottom: 1px solid var(--medium-background-color);
  }

  .row[selected] {
    background-color: var(--color-light-yellow);
  }

  .row .directory {
    font-size: 11px; 
    line-height: 12px; 
    color: #888;
    margin-bottom: 6px;
  }

  .row .icon {
    width: 30px;
  }

  .row .filesize {
    width: 75px;
  }

  .row .icon, .row .filesize {
    padding: 6px 0;
  }

  /* .row .file {
    flex: 1;
  } */

  .row .directory, .row .filename {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .row .selected-file {
    width: 25px;
  }

  button.search {
    background-color: white;
    color: var(--default-secondary-color);
    border: none;
    margin: 0;
    padding: 5px;
    height: 45px;
  }

  iron-icon[icon="home"] {
    cursor: pointer;
    color: var(--default-secondary-color);
  }

  iron-icon[icon="chevron-right"] {
    color: var(--medium-background-color);
  }

  iron-icon[icon="folder"] {
    color: var(--color-aggie-blue);
  }
  iron-icon[icon="fin-icons:image-solid"] {
    color: var(--color-aggie-gold);
  }
  iron-icon[icon="fin-icons:video-solid"] {
    color: var(--color-pinot);
  }
  iron-icon[icon="fin-icons:sound-solid"] {
    color: var(--color-redbud);
  }
  iron-icon[icon="fin-icons:text-solid"] {
    color: var(--color-putah-creek);
  }
  iron-icon[icon="fin-icons:spreadsheet-solid"] {
    color: var(--color-quad);
  }
  iron-icon[icon="fin-icons:pdf-solid"] {
    color: var(--double-decker);
  }
  iron-icon[icon="fin-icons:compressed-solid"] {
    color: var(--color-poppy);
  }
  iron-icon[icon="fin-icons:file-solid"] {
    color: var(--color-grey);
  }
  iron-icon[icon="check"] {
    color: var(--default-secondary-color);
  }

  .table-header {
    display: flex;
    font-size: var(--fs-p);
    color: var(--color-grey);
    font-style: italic;
    padding: 10px 0;
  }

  .table-header > div {
    padding-left: 5px;
  }

  .breadcrumbs {
    color: var(--default-primary-color);
  }

  .breadcrumbs .breadcrumb {
    cursor: pointer;
  }

  app-virtual-scroller {
    flex: 1;
    background-color: white;
  }

  .break {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed var(--medium-background-color);
  }

  .footer {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }

  .cancel-btn {
    border: 1px solid var(--default-secondary-color);
    color: var(--default-primary-color);
    padding: 6px 10px;
    margin: 0 15px 0 0;
    background-color: transparent;
    border-radius: 0;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 20px;
    cursor: pointer;
  }

  .download-btn {
    border: 1px solid var(--default-secondary-color);
    background-color: var(--default-secondary-color);
    color: var(--default-primary-color);
    padding: 6px 10px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
  }
  /* .download-button:visited {
    color: var(--default-primary-color);
  } */

  a[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 700px) {
    .content {
      margin: 0;
      flex: 1;
      width: 100%;
      height: calc(100vh);
    }
  }
</style>

<div class="layout">
<div class="content">

  
    <div class="header-layout">
      <div class="header-image">
        <iron-icon icon="fin-icons:various-outline-stacked" ?hidden="${this.thumbnail}"></iron-icon>
        <div class="img" style="background-image: url(${this.thumbnail}); background-size: cover; background-position: center center;" ?hidden="${!this.thumbnail}" ></div>
      </div>
      <div style="flex:1">
        <h2>${this.title}</h2>
        <div>${this.files.length} files</div>
        <div style="display: flex">
          <input id="searchInput" type="text" placeholder="Search Files" @keyup="${this._onInputKeyup}" />
          <button class="search">
            <iron-icon icon="${this.mode === 'search' ? 'close' : 'fin-icons:search'}" @click="${this._onClearSearchClicked}"></iron-icon>
          </button>
        </div>
      </div>
    </div>

    <div class="content-body">
      <div class="breadcrumbs">
        <iron-icon icon="home" @click="${this._onBreadcrumbClicked}" dir="/"></iron-icon>
        ${this._renderBreadcrumbs()}
      </div>

      <div class="break"></div>

      <div class="table-header">
        <div style="flex:1">Name</div> 
        <div style="width: 115px">Size</div>
      </div>
      <app-virtual-scroller item-height="${this.lineHeight}" .items="${this.files}"></app-virtual-scroller>

      <div class="footer">
        <div style="flex: 1"></div>
        <div>
          <button class="cancel-btn" @click="${this.hide}">Cancel</button>
        </div>
        <div>
          <a class="download-btn" ?disabled="${!this.selectedFile}" href="${this.selectedFile}" target="_blank">Download</a>
        </div>
      </div> <!-- footer -->
    </div>


</div> <!-- content -->
</div> <!-- layout -->

`;}

/***/ }),

/***/ "./public/elements/pages/record/viewer/app-image-viewer-lightbox.js":
/*!**************************************************************************!*\
  !*** ./public/elements/pages/record/viewer/app-image-viewer-lightbox.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppImageViewer)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_image_viewer_lightbox_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-image-viewer-lightbox.tpl.js */ "./public/elements/pages/record/viewer/app-image-viewer-lightbox.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! leaflet */ "./public/node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var leaflet_iiif__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! leaflet-iiif */ "./public/node_modules/leaflet-iiif/leaflet-iiif.js");
/* harmony import */ var leaflet_iiif__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(leaflet_iiif__WEBPACK_IMPORTED_MODULE_4__);









class AppImageViewer extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement).with(
  _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils
) {
  properties() {
    return {
      bounds: { type: Array },
      maxImageSize: { type: Number },
      media: { type: Object },
      visible: { type: Boolean },
      loading: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.active = true;
    this.render = _app_image_viewer_lightbox_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);

    this.bounds = null;
    this.maxImageSize = 2048;
    this.media = {};
    this.visible = false;
    this.loading = false;

    window.addEventListener("keyup", (e) => {
      if (this.visible && e.which === 27) this.hide();
    });

    window.addEventListener('popstate', this._onPopState.bind(this));

    this._injectModel("AppStateModel", "MediaModel");
  }

  async firstUpdated() {
    this.parentElement.removeChild(this);
    document.body.appendChild(this);

    const safeCoverNode = this.shadowRoot.querySelector("#safeCover");
    if (safeCoverNode) {
      this.shadowRoot.removeChild(safeCoverNode);
      document.body.appendChild(safeCoverNode);
    }

    let selectedRecord = await this.AppStateModel.getSelectedRecord();
    if (selectedRecord ) {
      this._onSelectedRecordUpdate(selectedRecord);
    }
  }

  _onPopState(e) {
    if ( this.AppStateModel.store.data.showLightbox ) {
      this.AppStateModel.set({ showLightbox: false });
    }
  }

  /**
   * @method _onAppStateUpdate
   * @description bound to AppStateModel app-state-update event
   */
  _onAppStateUpdate(e) {
    if( this.AppStateModel.location.page !== 'item' ) {
      this._reset();
      if (this.visible || e.showLightbox || this.AppStateModel.store?.data?.showLightbox) {
        this.hide();
      }
      return;
    } 

    if (e.showLightbox && !this.visible) {
      this.show();
    } else if (!e.showLightbox && this.visible) {
      this.hide();
    }
  }

  /**
   * @method _onSelectedRecordUpdate
   * @description from AppStateModel, called when a records media is selected
   *
   * @param {Object} media
   */
  _onSelectedRecordUpdate(e) {
    if( !e ) return;
    let {graph, clientMedia, selectedMedia, selectedMediaPage} = e;

    let currentMedia = this.record?.selectedMedia || {};
    if( currentMedia['@id'] === selectedMedia['@id'] &&
      selectedMediaPage === this.record?.selectedMediaPage ) {
      return;
    }

    this.record = e;
    if (this.visible) this.renderCanvas();
  }
  
  _reset() {
    this.media = {};
    this.visible = false;
    this.loading = false;
    this.renderedMedia = null;
    this.record = null;
  }

  /**
   * @method show
   */
  async show() {
    this.visible = true;
    this.style.display = "block";
    // this.shadowRoot.querySelector('#safeCover').style.display = 'block';

    document.querySelector("fin-app").style.display = "none";
    document.body.style.overflow = "hidden";
    // window.scrollTo(0, 0);

    this.renderCanvas();

    setTimeout(() => {
      this.shadowRoot.querySelector("#nav")._resize();
      this.shadowRoot.querySelector("#nav").setFocus();
    }, 25);
  }

  /**
   * @method hide
   */
  async hide() {
    this.visible = false;
    this.AppStateModel.set({ showLightbox: false });
    this.style.display = "none";
    // this.shadowRoot.querySelector('#safeCover').style.display = 'none';
    document.body.style.overflow = "auto";
    document.querySelector("fin-app").style.display = "block";
  }

  /**
   * @method _loadImage
   * @description preload image and set bounds to image dimensions
   *
   * @param {String} url url of image to load
   *
   * @returns {Promise} resolves when image is loaded and bounds array has been set
   */
  //  _loadImage(url) {
  //   return new Promise((resolve, reject) => {
  //     var img = new Image();

  //     img.onload = () => {
  //       let res = [img.naturalHeight, img.naturalWidth];
  //       this.bounds = [[0,0], res];
  //       resolve();
  //     };

  //     img.src = url;
  //   });
  // }

  /**
   * @method renderCanvas
   * @description render leaflet canvas based on fedora id
   *
   */
  async renderCanvas() {
    if( !this.record ) return;

    this.loading = true;
    let {graph, clientMedia, selectedMedia, selectedMediaPage} = this.record;

    if (selectedMedia["@id"] === this.renderedMedia?.["@id"]) {
      return;
    }

    let pages = [];

    // prioritize imagelist, then pdf
    let imageList = (clientMedia.mediaGroups || []).filter(m => m['@shortType'].includes('ImageList'))?.[0];
    if( imageList?.clientMedia?.pages ) {
      pages = imageList.clientMedia.pages;
    }

    if( !pages.length ) {
      let pdf = (clientMedia.mediaGroups || []).filter(m => m.clientMedia.pdf)?.[0];
      if( pdf?.clientMedia?.pages ) {
        pages = pdf.clientMedia.pages;
      }
    }

    if( !pages.length && selectedMedia.clientMedia?.pages ) {
      pages = selectedMedia.clientMedia.pages;
    }

    this.renderedMedia = pages?.filter(media => media.uiPosition === selectedMediaPage)[0];
    // on first page load, selectedMediaPage is -1, so just show first page from clientMedia.images
    if( !this.renderedMedia ) {
      this.renderedMedia = selectedMedia.clientMedia.images;
    }

    if (!this.viewer) {
      this.viewer = L.map(this.shadowRoot.querySelector("#viewer"), {
        center: [0, 0],
        crs: L.CRS.Simple,
        zoom: 0
      });
    }

    if (this.currentLayer) {
      this.viewer.removeLayer(this.currentLayer);
    }

    if (this.renderedMedia.tiled) {
      let tiledUrl = this.renderedMedia.tiled.iiif + "/info.json";
      this.currentLayer = L.tileLayer.iiif(tiledUrl);
      this.currentLayer.getTileUrl = function(coords) {
        var _this = this,
          x = coords.x,
          y = (coords.y),
          zoom = _this._getZoomForUrl(),
          scale = Math.pow(2, _this.maxNativeZoom - zoom),
          tileBaseSize = _this.options.tileSize * scale,
          minx = (x * tileBaseSize),
          miny = (y * tileBaseSize),
          maxx = Math.min(minx + tileBaseSize, _this.x),
          maxy = Math.min(miny + tileBaseSize, _this.y);
        
        var xDiff = (maxx - minx);
        var yDiff = (maxy - miny);

        // Canonical URI Syntax for v2
        // var size = Math.ceil(xDiff / scale) + ',';
        // if (_this.type === 'ImageService3') {
        //   // Cannonical URI Syntax for v3
        //   size = size + Math.ceil(yDiff / scale);
        // }
        let size = Math.ceil(xDiff / scale) + ',' + Math.ceil(yDiff / scale);
    
        return L.Util.template(this._baseUrl, L.extend({
          format: _this.options.tileFormat,
          quality: _this.quality,
          region: [minx, miny, xDiff, yDiff].join(','),
          rotation: 0,
          size: size
        }, this.options));
      }
      
    } else {
      let image = (this.renderedMedia.original && !this.renderedMedia.original.missing) ? this.renderedMedia.original : this.renderedMedia.large;
      if( !image ) return;

      // we might not have size
      let size = await this.getImageSize(image);

      // determine the pixel dimensions of the image
      let imageWidthInPixels = parseInt(size.width);
      let imageHeightInPixels = parseInt(size.height);

      // calc the pixel dimensions based on the map's container size and the desired maximum dimensions
      let mapContainer = this.viewer.getContainer();
      let maxImageWidthInPixels = mapContainer.offsetWidth;
      let maxImageHeightInPixels = mapContainer.offsetHeight;

      // scale the image dimensions down if they exceed the maximum dimensions
      if (imageWidthInPixels > maxImageWidthInPixels || imageHeightInPixels > maxImageHeightInPixels) {
        let scaleFactor = Math.min(maxImageWidthInPixels / imageWidthInPixels, maxImageHeightInPixels / imageHeightInPixels);
        imageWidthInPixels *= scaleFactor;
        imageHeightInPixels *= scaleFactor;
      }
      let imageBounds = [[0, 0], [imageHeightInPixels, imageWidthInPixels]];

      // calc center of image
      let centerLat = (imageBounds[0][0] + imageBounds[1][0]) / 2;
      let centerLon = (imageBounds[0][1] + imageBounds[1][1]) / 2;

      // set the view of the map to center on the image and apply an appropriate zoom level
      let zoomLevel = 0; // Adjust as needed
      this.viewer.setView([centerLat, centerLon], zoomLevel);

      this.currentLayer = L.imageOverlay(image.url, imageBounds).addTo(this.viewer);
    }

    this.currentLayer.addTo(this.viewer);

    // listen to load event to stop spinner
    if( this.renderedMedia.tiled ) {
      this.currentLayer.on('load', this._loaded.bind(this));
    } else {
      let imageElement = this.currentLayer.getElement();
      imageElement.addEventListener('load', this._loaded.bind(this));
    }

    // TODO this is a hack to get the viewer to resize correctly
    setTimeout(() => {
      this.viewer.invalidateSize();
    }, 1000);

    this.shadowRoot.querySelector('.leaflet-control-attribution').style.display = 'none';
    this.shadowRoot.querySelector(".leaflet-control-container").style.display = 'none';
  }

  _loaded() {
    this.loading = false;
    let spinner = this.shadowRoot.querySelector('.spinner');
    if( spinner ) spinner.style.display = 'none';
  }

  getImageSize(original) {
    if( original.size ) return original.size;

    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = original.url;
      img.onload = () => {
        resolve(original.size = {
          height : img.naturalHeight,
          width : img.naturalWidth
        });
      };
    });
  }

  /**
   * @method _onCloseClicked
   * @description bound to view nav close event
   */
  _onCloseClicked() {
    this.AppStateModel.set({ showLightbox: false });
  }

  /**
   * @method _onZoomInClicked
   * @description bound to view nav zoom-in event
   */
  _onZoomInClicked() {
    this.viewer.zoomIn();
  }

  /**
   * @method _onZoomOutClicked
   * @description bound to view nav zoom-out event
   */
  _onZoomOutClicked() {
    this.viewer.zoomOut();
  }
}

customElements.define("app-image-viewer-lightbox", AppImageViewer);


/***/ }),

/***/ "./public/elements/pages/record/viewer/app-image-viewer-lightbox.tpl.js":
/*!******************************************************************************!*\
  !*** ./public/elements/pages/record/viewer/app-image-viewer-lightbox.tpl.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../styles/shared-styles */ "./public/elements/styles/shared-styles.js");
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet/dist/leaflet.css */ "./public/node_modules/leaflet/dist/leaflet.css");
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_2__);





function render() { 
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`

<style include="shared-styles">
  ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__.sharedStyles}
  ${(leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_2___default())}

  [hidden] {
    display: none;
  }
  
  :host {
    display: none;
    position: absolute;
    z-index: 1000;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: white;    
    animation: show 350ms ease-out;
  }

  :host #nav.single {
    padding: 10px;
    background-color: transparent;
  }

  @keyframes show {
    from {
      /* top: -100vh; */
      opacity: 0.5;
      transform: scale(1.3);
    }
    to {
      /* top: 0; */
      opacity: 1;
      transform: scale(1);
    }
  }

  #viewer { 
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: white;
  }

  #nav {
    z-index: 2000;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }

  #close {
    z-index: 2000;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
  }

  #close ucdlib-icon {
    fill: var(--color-aggie-blue-80);
    margin: auto;
    height: 36px;
    padding-top: 7px;
  }

  #close:hover {
    background-color: var(--color-aggie-blue-80);
    cursor: pointer;
  }

  #close:hover ucdlib-icon {
    fill: var(--color-aggie-gold);
  }

  .leaflet-control-zoom {
    display: none;
  }

  .spinner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:  transparent;
    transition: opacity 0.75s, visibility 0.75s;
  }

  .spinner:after {
    content: '';
    width: 30px;
    height: 30px;
    border: 5px solid  var(--color-aggie-gold-70);
    border-top-color: var(--color-aggie-gold);
    border-radius: 50%;
    animation: loading 0.75s ease infinite;
  }

  @keyframes loading {
    from {
      transform: rotate(0turn); 
    }
    to {
      transform: rotate(1turn);
    }
  }

</style>

<!-- make sure background is blacked out... iOS hack -->
<div id="safeCover" style="display:none;position:absolute;z-index:999;top:0;left:0;width:100vw;height:100vh;background-color:white;"></div>

<div id="viewer" ?hidden="${this.loading}"></div>

<div class="spinner"></div>


<app-media-viewer-nav 
  id="nav"
  is-lightbox
  @zoom-in="${this._onZoomInClicked}"
  @zoom-out="${this._onZoomOutClicked}"
  @close="${this._onCloseClicked}">
</app-media-viewer-nav>

`;}

/***/ }),

/***/ "./public/elements/pages/record/viewer/app-image-viewer.js":
/*!*****************************************************************!*\
  !*** ./public/elements/pages/record/viewer/app-image-viewer.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppImageViewer)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_image_viewer_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-image-viewer.tpl.js */ "./public/elements/pages/record/viewer/app-image-viewer.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../lib/utils */ "./public/lib/utils/index.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_utils__WEBPACK_IMPORTED_MODULE_3__);








class AppImageViewer extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement).with(
  _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils
) {
  static get properties() {
    return {
      record: { type: Object },
      media: { type: Object },
      loading: { type: Boolean },
      height: { type: String },
      spinnerTop: { type: Number },
      hasMultipleImages: { type: Boolean },
      title: { type: String }
    };
  }

  constructor() {
    super();
    this.active = true;
    this.render = _app_image_viewer_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this._injectModel("AppStateModel", "MediaModel");

    this.record = {};
    this.media = {};
    this.loading = false;
    this.height = '600px';
    this.spinnerTop = 300;
    this.hasMultipleImages = false;
    this.title = '';
  }

  async firstUpdated() {
    await this.AppStateModel.get();

    let selectedRecord = await this.AppStateModel.getSelectedRecord();
    if (selectedRecord)
      this._onSelectedRecordUpdate(selectedRecord);
  }

  /**
   * @method _onSelectedRecordMediaUpdate
   * @description from AppStateModel, called when a records media is selected
   *
   * @param {Object} media
   */
  _onSelectedRecordUpdate(e) {
    if( !e ) return;
    let {graph, clientMedia, selectedMedia, selectedMediaPage} = e;

    this.mediaType = _lib_utils__WEBPACK_IMPORTED_MODULE_3___default().getMediaType(selectedMedia);
    if (this.mediaType !== "ImageList" && this.mediaType !== "ImageObject") return;

    this.loading = true;
    this.title = graph.root?.name || '';

    let pages = [];

    // prioritize imagelist, then pdf
    let imageList = (clientMedia.mediaGroups || []).filter(m => m['@shortType'].includes('ImageList'))?.[0];
    if( imageList?.clientMedia?.pages ) {
      pages = imageList.clientMedia.pages;
    }

    if( !pages.length ) {
      let pdf = (clientMedia.mediaGroups || []).filter(m => m.clientMedia.pdf)?.[0];
      if( pdf?.clientMedia?.pages ) {
        pages = pdf.clientMedia.pages;
      }
    }

    if( !pages.length && selectedMedia.clientMedia?.pages ) {
      pages = selectedMedia.clientMedia.pages;
    }

    this.media = pages.filter(media => media.uiPosition === selectedMediaPage)[0];

    // this.media = selectedMedia.clientMedia?.pages?.filter(media => media.page === selectedMediaPage)[0];
    // on first page load, selectedMediaPage is -1, so just show first page from clientMedia.images
    if( !this.media ) {
      this.media = selectedMedia.clientMedia.images;
    }

    this._renderImg();
  }

  async _renderImg() {
    if( this.media ) {
      // there could be gcs errors where only some of the images are available, or only the original
      let srcset = '';
      let src = this.media.large?.url || this.media.medium?.url || this.media.small?.url || '';

      if( this.media.small?.url ) srcset += `${this.media.small.url} ${this.media.small.size.width}w,`;
      if( this.media.medium?.url ) srcset += `${this.media.medium.url} ${this.media.medium.size.width}w,`;
      if( this.media.large?.url ) srcset += `${this.media.large.url} ${this.media.large.size.width}w,`;

      let size = await this.getImageSize(this.media.large || this.media.medium || this.media.small || this.media.original);
      if( Array.isArray(size) && size.length > 1 ) size = size[0];
      if( this.mediaType === 'ImageObject' ) {
        let maxHeight = 600;
        let optimalImageHeight = (size.height / size.width * window.innerWidth);
        this.height = optimalImageHeight > maxHeight ? maxHeight + 'px' : optimalImageHeight + 'px';
        this.spinnerTop = optimalImageHeight / 2;
      } else {
        this.height = '600px';
        this.spinnerTop = 300;
      }

      if( this.spinnerTop > 500 ) this.spinnerTop = 300;

      let sizes = "600px";

      // add to img
      this.shadowRoot.querySelector("#img").srcset = srcset;
      this.shadowRoot.querySelector("#img").sizes = sizes;
      this.shadowRoot.querySelector("#img").src = src;

      this.shadowRoot.querySelector('#img').addEventListener('load', () => {
        this.loading = false;
      });
    }
  }

  getImageSize(original) {
    if( original.size ) return original.size;
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = original.url;
      img.onload = () => {
        resolve(original.size = {
          height : img.naturalHeight, 
          width : img.naturalWidth
        }); 
      };
    });
  }

  destroy() {
    this.shadowRoot.querySelector("#img").srcset = '';
  }
}

customElements.define("app-image-viewer", AppImageViewer);


/***/ }),

/***/ "./public/elements/pages/record/viewer/app-image-viewer.tpl.js":
/*!*********************************************************************!*\
  !*** ./public/elements/pages/record/viewer/app-image-viewer.tpl.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");


function render() {
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <style>
      :host {
        display: block;
        padding: 20px 0;
        box-sizing: border-box;
      }

      .layout {
        text-align: center;
        height: 600px;
      }

      #img {
        max-width: 100vw;
        object-fit: contain;
      }

      [hidden] {
        display: none !important;
      }

      .spinner {
        position: relative;
        left: 0;
        width: 100vw;
        /* height: 100vh; */
        display: flex;
        justify-content: center;
        align-items: center;
        background-color:  transparent;
        transition: opacity 0.75s, visibility 0.75s;
      }

      .spinner:after {
        content: '';
        width: 30px;
        height: 30px;
        border: 5px solid  var(--color-aggie-gold-70);
        border-top-color: var(--color-aggie-gold);
        border-radius: 50%;
        animation: loading 0.75s ease infinite;
      }

      @keyframes loading {
        from {
          transform: rotate(0turn); 
        }
        to {
          transform: rotate(1turn);
        }
      }
    </style>

    <div class="spinner" ?hidden="${!this.loading}" style="top: ${this.spinnerTop}px"></div>

    <div class="layout" style="line-height: 0; height: ${this.height}">
      <img ?hidden="${this.loading}" id="img" style="height: ${this.height}" alt="${this.title}" />
    </div>
  `;
}


/***/ }),

/***/ "./public/elements/pages/record/viewer/app-media-viewer-nav.js":
/*!*********************************************************************!*\
  !*** ./public/elements/pages/record/viewer/app-media-viewer-nav.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppMediaViewerNav)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_media_viewer_nav_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-media-viewer-nav.tpl.js */ "./public/elements/pages/record/viewer/app-media-viewer-nav.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _utils_app_share_btn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/app-share-btn */ "./public/elements/utils/app-share-btn.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../lib/utils */ "./public/lib/utils/index.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lib_utils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ucd_lib_theme_elements_ucdlib_ucdlib_icon_ucdlib_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon */ "./public/node_modules/@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon.js");
/* harmony import */ var _utils_app_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/app-icons */ "./public/elements/utils/app-icons.js");






// import "@polymer/paper-icon-button"





class AppMediaViewerNav extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement).with(
  _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils
) {
  static get properties() {
    return {
      totalThumbnailWidth: { type: Number }, // thumbnail width w/ border and margin
      icon: { type: String },
      iconWidth: { type: Number },
      thumbnails: { type: Array },
      thumbnailsPerFrame: { type: Number },
      leftMostThumbnail: { type: Number },
      breakControls: { type: Boolean },
      showNavLeft: { type: Boolean },
      showNavRight: { type: Boolean },
      isLightbox: { attribute: "is-lightbox", type: Boolean },
      isBookReader: { type: Boolean },
      hideZoom: { type: Boolean },
      brSinglePage: { type: Boolean },
      brFullscreen: { type: Boolean },
      overrideImageList: { type: Boolean },
      singleImage: { type: Boolean },
      mediaList: { type: Array },
      showOpenLightbox: { type: Boolean },
      searchingText: { type: Boolean },
      searching: { type: Boolean },
      brSearch: { type: Boolean },
      selectedResult: { type: Number },
      searchResults: { type: Array },
      searchResultsCount: { type: Number },
      isMultimedia: { type: Boolean },
      hidePageToggle: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.render = _app_media_viewer_nav_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.active = true;

    this.totalThumbnailWidth = 68;
    this.icon = "";
    this.iconWidth = 36;

    this._reset();

    window.addEventListener("resize", () => this._resize());
    window.addEventListener("touchend", (e) => this._onTouchEnd(e));
    window.addEventListener("touchcancel", (e) => this._onTouchEnd(e));
    window.addEventListener("touchmove", (e) => this._onTouchMove(e));
    this.addEventListener("touchstart", (e) => this._onTouchStart(e));

    this._injectModel("AppStateModel", "MediaModel", "BookReaderModel", "CollectionModel");
  }

  connectedCallback() {
    super.connectedCallback();
    this._syncAttributeState();
  }

  _syncAttributeState() {
    this.isLightbox = this.hasAttribute('is-lightbox');
  }

  async firstUpdated() {
    this._onSelectedRecordUpdate(await this.AppStateModel.getSelectedRecord());
    this._resize(true);

    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if( screenWidth < 800 ) {
      this.brSinglePage = true;
    }
  }

  _onAppStateUpdate(e) {
    if( this.AppStateModel.location.page !== 'item' ) this._reset();
    if (e.mediaViewerNavLeftMostThumbnail === undefined) return;
    if (e.mediaViewerNavLeftMostThumbnail === this.leftMostThumbnail) return;

    this.leftMostThumbnail = e.mediaViewerNavLeftMostThumbnail;
  }

  async _getItemDisplayType(itemId, collectionId) {
    if( !collectionId ) return;

    let edits;
    try {
      edits = await this.CollectionModel.getCollectionEdits(collectionId);
    } catch (error) {
      this.logger.warn('Error retrieving collection edits', error);
    }

    if( edits.state !== 'loaded' ) return null;
    if( !Object.keys(edits.payload).length ) return null;

    let collectionEdits = edits.payload?.collection || {};
    let itemEdits = edits.payload?.items || {};

    return itemEdits[itemId]?.itemDefaultDisplay || collectionEdits.itemDefaultDisplay;
  }

  _onBookreaderStateUpdate(e) {
    this.brFullscreen = e.fullscreen;
    this.selectedResult = e.selectedSearchResult + 1;
    this.searching = e.searchActive;

    this.searchResults = [];
    if( e.searchResults?.state === 'loaded' ) {
      let searchResults = e.searchResults.payload || {};
      searchResults = Object.keys(searchResults).map(key => searchResults[key]);
      searchResults.forEach(result => {
        this.searchResults.push(...result);
      });
    }
    this.searchResultsCount = this.searchResults.length;
  }

  /**
   * @method _onTouchEnd
   * @description bound to window touch end/cancel events. if we are
   * performing a touch (swipe) action, see if we have reached the
   * threshold for swipe and if so, page left/right
   *
   * @param {Object} e HTML touch event
   */
  _onTouchEnd(e) {
    if (!this.touchAction) return;
    this.touchAction = false;

    let diff = this.touchStartX - this.touchCurrentX;
    let sdiff = Math.abs(diff);

    if (sdiff > this.totalThumbnailWidth / 2) {
      if (diff < 0) this._pageLeft();
      else this._pageRight();
    }
  }

  /**
   * @method _onTouchMove
   * @description bound to windows touch move event. if we are performing
   * a touch (swipe) action, need to keep track of current x offset
   *
   * @param {Object} e HTML touch event
   */
  _onTouchMove(e) {
    if (!this.touchAction) return;
    this.touchCurrentX = e.touches[0].clientX;
  }

  /**
   * @method _onTouchStart
   * @description bound to this elements touchstart event.
   * start performing a touch (swipe) action
   *
   * @param {Object} e HTML touch event
   */
  _onTouchStart(e) {
    this.touchAction = true;
    this.touchStartX = e.touches[0].clientX;
    this.touchCurrentX = e.touches[0].clientX;
  }

  /**
   * @method _resize
   * @description update thumbnail preview on resize
   *
   */
  _resize(updateThumbnailWindow=false) {
    let w = window.innerWidth;

    // grrrr
    if (w === 0) {
      // setTimeout(() => this._resize(), 200);
      return;
    }

    w -= 16; // padding

    this._setNavBreak(w);

    let iconsWidth;
    if (this.breakControls) {
      iconsWidth = this.iconWidth * 2;
    } else {
      iconsWidth = this.iconWidth * 4;
      if (this.isLightbox) iconsWidth += this.iconWidth * 2;
    }

    let spaceBuffer = window.innerWidth < 1000 ? 0.35 : 0.42;
    let availableThumbSpace = Math.min(w - iconsWidth, w * spaceBuffer);

    this.thumbnailsPerFrame = Math.max(
      Math.floor(availableThumbSpace / this.totalThumbnailWidth),
      1
    );
    
    this.thumbnailContainerWidth = this.thumbnailsPerFrame * this.totalThumbnailWidth;

    if( updateThumbnailWindow ) {
      let selectedThumbnail = this.thumbnails.findIndex(t => t.selected);
      if( selectedThumbnail ) {
        this.leftMostThumbnail = Math.floor(selectedThumbnail / Math.max(this.thumbnailsPerFrame, 1)) * this.thumbnailsPerFrame;
        if( this.leftMostThumbnail < 0 ) this.leftMostThumbnail = 0;
      }  
    }

    if (this.isLightbox) this.thumbnailsPerFrame *= 2;
    let thumbnailContainer = this.shadowRoot.querySelector("#thumbnails");
    if (!thumbnailContainer) return;
    
    thumbnailContainer.style.width = this.thumbnailContainerWidth + 'px';

    this.showNavLeft = this.leftMostThumbnail !== 0;
    this.showNavRight = !this._showingLastThumbFrame();

    this._updateThumbnailContainerPos();
  }

  _getTotalIconWidth() {
    let totalIconWidth = this.iconWidth * 4; // nav icons and default icons
    if (this.isLightbox) totalIconWidth += this.iconWidth * 2;
    return totalIconWidth;
  }

  _setNavBreak(width) {
    let totalIconWidth = this.iconWidth * 4; // nav icons and default icons
    if (this.isLightbox) totalIconWidth += this.iconWidth * 2;

    if (totalIconWidth + this.totalThumbnailWidth * 4 > width) {
      this.breakControls = true;
    } else {
      this.breakControls = false;
    }
  }

  _pageLeft() {
    this.leftMostThumbnail = this.leftMostThumbnail - this.thumbnailsPerFrame;
    if (this.leftMostThumbnail < 0) this.leftMostThumbnail = 0;
    this._resize();
    this.AppStateModel.set({
      mediaViewerNavLeftMostThumbnail: this.leftMostThumbnail,
    });
  }

  _pageRight() {
    if (this._showingLastThumbFrame()) return;
    this.leftMostThumbnail = this.leftMostThumbnail + this.thumbnailsPerFrame;
    this._resize();
    this.AppStateModel.set({
      mediaViewerNavLeftMostThumbnail: this.leftMostThumbnail,
    });
  }

  _prevSearchResult(e) {
    if (this.selectedResult === 1) return;
    this.selectedResult = this.selectedResult - 1;
    this.dispatchEvent(
      new CustomEvent("br-change-search-result", {
        detail: {
          selectedResult: this.selectedResult,
        },
      })
    );
  }

  _nextSearchResult(e) {
    if (this.selectedResult === this.searchResultsCount) return;
    this.selectedResult = this.selectedResult + 1;
    this.dispatchEvent(
      new CustomEvent("br-change-search-result", {
        detail: {
          selectedResult: this.selectedResult,
        },
      })
    );
  }

  _showingLastThumbFrame() {
    if (
      this.leftMostThumbnail + this.thumbnailsPerFrame >
      this.thumbnails.length - 1
    ) {
      return true;
    }
    return false;
  }

  _updateThumbnailContainerPos() {
    // that +1 is a hack, what am I missing !?
    this.shadowRoot.querySelector("#thumbnailInnerContainer").style.marginLeft =
      -1 * this.leftMostThumbnail * (this.totalThumbnailWidth + 1) + "px";

    let lastThumb = this.leftMostThumbnail + this.thumbnailsPerFrame;
    this.thumbnails.forEach((thumbnail, index) => {
      thumbnail.disabled = index < this.leftMostThumbnail || index >= lastThumb;
    });
  }

  _reset() {
    this.thumbnails = [];
    this.thumbnailsPerFrame = 10;
    this.leftMostThumbnail = 0;
    this.breakControls = true;
    this.showNavLeft = false;
    this.showNavRight = false;
    this._syncAttributeState();
    this.isBookReader = false;
    this.hideZoom = false;
    this.brSinglePage = false;
    this.overrideImageList = false;
    this.brFullscreen = false;
    this.singleImage = false;
    this.mediaList = [];
    this.showOpenLightbox = false;
    this.searchingText = false;
    this.brSearch = false;
    this.searching = false;
    this.selectedResult = 1;
    this.searchResults = [];
    this.searchResultsCount = 0;
    this.isMultimedia = false;
    this.hidePageToggle = false;
  }

  /**
   * @method _onSelectedRecordUpdate
   * @description from AppStateInterface, called when a record is selected
   *
   * @param {Object} record selected record
   */
  async _onSelectedRecordUpdate(item) {
    if( !item ) return;

    let { graph, clientMedia, selectedMedia, selectedMediaPage} = item;

    let mediaGroups = clientMedia.mediaGroups || [];
    let audioMedia = mediaGroups.find(m => m.fileFormatSimple === 'audio');
    let videoMedia = mediaGroups.find(m => m.fileFormatSimple === 'video');
    if( audioMedia || videoMedia ) this.hideZoom = true;

    if ( clientMedia.mediaGroups.length === 1 &&
          selectedMediaPage === -1 ) {
      this.singleImage = true;
      return;
    }

    let thumbnails = [];

    // if this.isMultimedia, prepend thumbnails for video/audio media first
    if( this.isMultimedia ) {
      // check the display type for the item
      this.isBookReader = false; // for now, disable bookreader if multimedia.. aka imagelist

      let position = 1;
      if( audioMedia ) {
        let thumb = this._renderThumbnail(audioMedia, audioMedia.clientMedia.images || [], selectedMediaPage, 'audio');
        if( thumb ) {
          if( selectedMedia['@id'] === thumb.id ) {
            thumb.selected = true;
            this.hideZoom = true;
            this.hidePageToggle = true;
          } else {
            this.hideZoom = false;
            this.hidePageToggle = false;
          }
          thumb.position = position++;
          thumbnails.push(thumb);
        }
      }
    }

    let imagesFound = false;
    // prioritize imagelist, then pdf. else combine pages
    let imageList = (clientMedia.mediaGroups || []).filter(m => m['@shortType'].includes('ImageList'))?.[0];
    if( imageList?.clientMedia?.pages && !this.isBookReader ) {
      imagesFound = true;
      for( let page of imageList.clientMedia.pages ) {
        thumbnails.push(this._renderThumbnail(selectedMedia, page, selectedMediaPage));
      }
    }

    if( (!thumbnails.length || (!imagesFound && this.isMultimedia)) && !this.isBookReader ) {
      let pdf = (clientMedia.mediaGroups || []).filter(m => m.clientMedia.pdf)?.[0];
      if( pdf?.clientMedia?.pages ) {
        imagesFound = true;
        for( let page of pdf.clientMedia.pages ) {
          thumbnails.push(this._renderThumbnail(selectedMedia, page, selectedMediaPage));
        }
      }
    }

    if( (!thumbnails.length || (!imagesFound && this.isMultimedia)) && !this.isBookReader ) {
      for( let node of clientMedia.mediaGroups ) {
        if( !node.clientMedia.pages && !this.overrideImageList ) {
          thumbnails.push(this._renderThumbnail(selectedMedia, node.clientMedia.images, selectedMediaPage));
          continue;
        }
        if( !node.clientMedia.pages ) continue;
        for( let page of node.clientMedia.pages ) {
          thumbnails.push(this._renderThumbnail(selectedMedia, page, selectedMediaPage));
        }
      }
    }

    const ids = [];
    this.thumbnails = thumbnails
      .filter((element) => element !== null)
      .filter( (element) => {
        if ( ids.includes(element.id) ) {
          return false;
        }
        ids.push(element.id);
        return true;
      })

    this._resize(true);
  }

  _renderThumbnail(node, clientMediaPage, selectedMediaPage, mediaType) {
    let { fileType, iconType } = this._getFileAndIconType(node);

    // if (this.isLightbox && fileType !== "image") {
    //   return null;
    // }

    let thumbnailUrl = clientMediaPage.small?.url;
    if( !thumbnailUrl ) {
      thumbnailUrl = clientMediaPage.medium?.url;
    }
    if( !thumbnailUrl ) {
      thumbnailUrl = clientMediaPage.original?.url;
    }
    // if( thumbnailUrl && !thumbnailUrl.match(/\/svc:iiif\//) ) {
    //   thumbnailUrl += '/svc:iiif/full/,50/0/default.jpg';
    // }

    let uiPosition = clientMediaPage.uiPosition || clientMediaPage.page;

    let idRoot = node['@id'];
    if( this.isMultimedia ) {
      idRoot = clientMediaPage['@id']?.replace(/(\.[a-z0-9]+):\d+$/i, '$1') || node['@id'];
    }
    let thumbnail = {
      // id: node["@id"]+(!uiPosition || uiPosition === undefined ? '' : ':'+uiPosition),
      id: idRoot+(!uiPosition ? '' : ':'+uiPosition),
      icon: iconType,
      position: uiPosition,
      selected: uiPosition === selectedMediaPage,
      disabled: false,
      src: thumbnailUrl,
      // thumbnail: url
      mediaType
    };

    return thumbnail;
  }

  /**
   * @method _onSelectedRecordMediaUpdate
   * @description from AppStateInterface, called when a records media is selected
   *
   * @param {Object} media
   */
  _onSelectedRecordMediaUpdate(media) {
    this.media = media;
    if (!media) return;

    this.thumbnails.forEach((thumbnail, index) => {
      // this.set(`thumbnails.${index}.selected`, (this.media['@id'] === thumbnail.id));
    });

    let { fileType, iconType } = this._getFileAndIconType(media);

    this.showOpenLightbox = fileType === "image" ? true : false;
  }

  _getFileAndIconType(media) {
    let _file = "";
    let fileType = _file;
    let fileFormat = _file;
    let iconType = "";

    if (media.fileFormat || media.encodingFormat) {
      _file = media.fileFormat ? media.fileFormat : media.encodingFormat;

      fileType = _file.split("/").shift();
      fileFormat = _file.split("/").pop();
    }

    let type = _lib_utils__WEBPACK_IMPORTED_MODULE_4___default().getMediaType(media);
    if (type === "AudioObject" || fileType === "audio")
      iconType = "sound-round";
    else if (
      type === "VideoObject" ||
      type === "StreamingVideo" ||
      fileType === "video"
    )
      iconType = "video-round";
    else if (fileFormat === "pdf") iconType = "blank-round";
    // TODO: Get back to this
    else if (fileType === "360") iconType = "360-round";

    return { fileType, iconType };
  }

  /**
   * @method _onZoomInClicked
   * @description bound to zoom icon click event.  emit zoom event
   *
   * @param {Object} e HTML click event
   */
  _onZoomInClicked(e) {
    this.dispatchEvent(new CustomEvent("zoom-in"));
  }

  /**
   * @method _onZoomOutClicked
   * @description bound to zoom icon click event.  emit zoom event
   *
   * @param {Object} e HTML click event
   */
  _onZoomOutClicked(e) {
    this.dispatchEvent(new CustomEvent("zoom-out"));
  }

  /**
   * @method _onBRZoomInClicked
   * @description bound to bookreader zoom icon click event.  emit zoom event
   *
   * @param {Object} e HTML click event
   */
  _onBRZoomInClicked(e) {
    this.dispatchEvent(new CustomEvent("br-zoom-in"));
  }

  /**
   * @method _onBRZoomOutClicked
   * @description bound to bookreader zoom icon click event.  emit zoom event
   *
   * @param {Object} e HTML click event
   */
  _onBRZoomOutClicked(e) {
    this.dispatchEvent(new CustomEvent("br-zoom-out"));
  }

  /**
   * @method _onToggleBookView
   * @description bound to book view single vs book mode click event.  emit event
   *
   * @param {Object} e HTML click event
   */
  _onToggleBookView(e) {
    // this.dispatchEvent(new CustomEvent("br-bookview-toggle"));  
    this.brSinglePage = !this.brSinglePage;
    this.BookReaderModel.setView(this.brSinglePage ? 'single' : 'double');
  }

  /**
   * @method _onExpandBookView
   * @description bound to book view full page click event.  emit event
   *
   * @param {Object} e HTML click event
   */
  _onExpandBookView(e) {
    this.BookReaderModel.setFullscreen(true);
    // this.dispatchEvent(new CustomEvent("br-expand-view"));
    this.brFullscreen = true;
  }

  /**
   * @method _onCollapseBookView
   * @description bound to book view full page collapse click event.  emit event
   *
   * @param {Object} e HTML click event
   */
  _onCollapseBookView(e) {
    this.BookReaderModel.setFullscreen(false);
    // this.dispatchEvent(new CustomEvent("br-collapse-view"));
    this.brFullscreen = false;
  }

  /**
   * @method _onSearchClicked
   * @description bound to search icon click event
   *
   * @param {Object} e HTML click event
   */
  _onSearchClicked(e) {
    this.searchingText = !this.searchingText;
  }

  /**
   * @method _onCloseClicked
   * @description bound to close icon click event.  emit close event
   *
   * @param {Object} e HTML click event
   */
  _onCloseClicked(e) {
    this.dispatchEvent(new CustomEvent("close"));
  }

  /**
   * @method setFocus
   * @description set focus to first clickable element
   */
  setFocus() {
    if ( this.singleImage && this.$ ) {
      if( !this.breakControls ) this.$.zoomOut1.focus();
      else this.$.zoomOut2.focus();
    } else {
      let firstBtn = this.shadowRoot.querySelector("button");
      if (firstBtn) firstBtn.focus();
    }
    // window.scrollTo(0, 0);
  }

  /**
   * @method _onSearchToggled
   * @description show/hide search panel
   */
  _onSearchToggled(e) {
    this.searching = !this.searching;
    this.BookReaderModel.setSearchActive(this.searching);
    this.dispatchEvent(new CustomEvent("br-search-toggle"));
  }
}

customElements.define("app-media-viewer-nav", AppMediaViewerNav);


/***/ }),

/***/ "./public/elements/pages/record/viewer/app-media-viewer-nav.tpl.js":
/*!*************************************************************************!*\
  !*** ./public/elements/pages/record/viewer/app-media-viewer-nav.tpl.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../styles/shared-styles */ "./public/elements/styles/shared-styles.js");




function render() {
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <style include="shared-styles">
      ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__.sharedStyles} :host {
        display: block;
      }

      :host([single-image]) {
        background-color: transparent;
        padding: 0 8px 8px 8px;
      }

      :host([single-image]) paper-icon-button,
      :host([single-image]) app-share-btn,
      :host app-share-btn,
      :host paper-icon-button {
        fill: var(--color-aggie-blue-80);
      }

      [hidden] {
        display: none !important;
      }
      
      input {
        padding: 15px;
        display: block;
        width: 90%;
        border: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 1rem;
        background: white;
        border: none;
        height: 61px;
        outline: none;
        font-size: 0.8rem;
        font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial,
          sans-serif;
        font-weight: 500;
      }

      .layout {
        display: flex;
        align-items: center;
        /* flex-wrap: wrap; */
        width: 60%;
        margin: auto;
        padding-bottom: 0.7rem;
        border-bottom: 6px dotted var(--color-aggie-gold);
      }

      .layout.lightbox {
        border-bottom: none;
        background-color: var(--color-aggie-blue-30);
        width: 100%;
        padding-bottom: 0;
        height: 5rem;
      }

      .layout.fullscreen {
        border-bottom: none;
        padding-top: 0.5rem;
        margin: 0;
        width: auto;
      }

      #thumbnailInnerContainer {
        padding-top: 7px;
      }

      #thumbnails {
        overflow: hidden;
      }

      #thumbnails > div {
        white-space: nowrap;
        margin-left: 0;
        will-change: margin-left;
        transition: margin-left 250ms ease-out;
      }

      .thumbnail {
        margin: 0 5px 5px 6px;
        display: inline-block;
        width: 48px;
        height: 48px;
        cursor: pointer;
        color: white;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        border: 3px solid transparent;
      }

      .thumbnail:active {
        border: 1px solid var(--default-secondary-color);
      }

      .thumbnail:focus {
        outline: var(--default-outline);
      }

      .thumbnail[selected] {
        border: 3px solid var(--default-secondary-color);
      }
      
      .thumbnail-wrapper { position: relative; }
      
      .thumbnail-wrapper.audio::after,
      .thumbnail-wrapper.pdf::after { 
        content: ''; 
        position: absolute; 
        inset: 0; 
        background: rgba(2, 40, 81, 0.5); 
        pointer-events: none; 
        z-index: 2;
        margin: 3px 8px 8px 9px;
      }
      .thumbnail-wrapper a.thumbnail { position: relative; z-index: 1; }

      .thumbnail-wrapper ucdlib-icon {
        position: absolute; 
        top: 3px; 
        right: 18px; 
        z-index: 5; 
        pointer-events: none; 
        fill: white;
      }

      ucdlib-icon {
        height: 50px;
        margin: auto;
        fill: var(--color-aggie-blue-80);
        cursor: pointer;
      }

      #navLeft,
      #navRight {
        width: 36px;
        margin: auto;
      }

      #navLeft {
        margin-right: 2rem;
      }

      iron-icon {
        shape-rendering: geometricPrecision !important;
        width: 28px !important;
        height: 28px !important;
      }

      paper-icon-button {
        color: var(--default-secondary-color);
        min-width: 40px;
      }

      paper-icon-button:focus {
        border-radius: 0 !important;
      }

      paper-icon-button[disabled] {
        color: var(--gray-text);
        min-width: 40px;
      }

      paper-icon-button[invisible] {
        visibility: hidden;
      }

      .zoom-btns[pad] {
        margin-right: 30px;
      }

      #buttonWrapper {
        z-index: 500;
      }

      .lightbox #buttonWrapper {
        margin-right: 2rem;
      }

      #buttonWrapper div {
        background-color: var(--color-aggie-blue-80);
        border-radius: 50%;
        display: inline-block;
        width: 50px;
        height: 50px;
        margin-left: 0.4rem;
      }

      #buttonWrapper div:hover,
      #buttonWrapper div:has(> app-share-btn[popup]) {
        background-color: var(--color-aggie-blue);
      }

      #buttonWrapper ucdlib-icon {
        fill: white;
        width: 25px;
      }

      .search-container {
        margin-top: 0.7rem;
        margin-left: 1.2rem;
      }

      .search-container input {
        position: relative;
        z-index: 10;
        left: -0.8rem;
        width: 17rem;
      }

      .search-pagination {
        display: flex;
        margin: auto;
      }

      #buttonWrapper div.text-search {
        background-color: var(--color-aggie-gold);
      }

      #buttonWrapper div.text-search ucdlib-icon {
        fill: var(--color-aggie-blue-80);
      }

      .page-n-n {
        font-size: 0.9rem;
        font-weight: bold;
        color: var(--color-aggie-blue-80);
      }

      ucdlib-icon.single-page-book {
        width: 6% !important;
        height: 50%;
        position: relative;
        top: 25%;
        left: 1%;
      }

      .br-search-non-fs div {
        display: inline-block;
      }

      .br-search-non-fs div.zoom {
        background-color: var(--color-aggie-blue-80);
        border-radius: 50%;
        display: inline-block;
        width: 50px;
        height: 50px;
        /* margin-left: 25px; */
        margin-top: 5px;
      }

      .br-search-non-fs div.zoom {
        cursor: pointer;
      }

      .br-search-non-fs div.zoom:hover {
        background-color: var(--color-aggie-blue);
      }

      .br-search-non-fs ucdlib-icon {
        height: 50px;
        margin: auto;
        fill: white;
      }

      .br-search-non-fs #search-prev ucdlib-icon,
      .br-search-non-fs #search-next ucdlib-icon {
        fill: var(--ucdlib-icon-fill-color);
      }

      .br-search-non-fs div.zoom.searching {
        background-color: var(--color-aggie-gold);
      }

      .br-search-non-fs div.zoom.searching ucdlib-icon {
        fill: var(--color-aggie-blue);
      }

      @media (max-width: 767px) {
        /* mobile */
        #buttonWrapper div.zoom-controls {
          /* pinch to zoom */
          display: none;
        }



        /* this breaks something with bookreader, need to test again if below is uncommented */
        .layout {
          width: 90%;
          flex-wrap: wrap;
          justify-content: end;
        }
        .layout.lightbox {
          height: 150px;
        }

        #thumbnails {
          width: 80% !important;
        }
      }

      .tooltip {
        cursor: pointer;
        position: relative;
      }

      .tooltip:hover:before {
        content: attr(data-tooltip-text);
        position: absolute;
        bottom: 60px;
        right: 50%;
        transform: translateX(50%);
        padding: 5px 10px;
        border-radius: 5px;
        background: var(--color-aggie-blue);
        color: #fff;
        font-size: 1rem;
        font-weight: bold;
        white-space: nowrap;
        opacity: 0;
        transition: .2s opacity ease-out;
        z-index: 10;
      }

      .tooltip.right-align:hover:before {
        transform: translateX(80%);
      }

      .tooltip.left-align:hover:before {
        transform: translateX(20%);
      }

      .tooltip:hover:after {
        content: "";
        position: absolute;
        bottom: 50px;
        right: 20px;
        border: 5px solid var(--color-aggie-blue);
        border-color: var(--color-aggie-blue) transparent transparent transparent;
        opacity: 0;
        transition: .2s opacity ease-out;
      }

      .tooltip:hover:before,
      .tooltip:hover:after {
        opacity: 1;
      }

      .tooltip:has(> app-share-btn[popup]):hover:before,
      .tooltip:has(> app-share-btn[popup]):hover:after {
        display: none;
      }

    </style>

    <div
      class="layout ${this.isLightbox ? "lightbox" : ""} ${this.brFullscreen
        ? "fullscreen"
        : ""}">
      <div class="icon-nav" style="display: flex; max-width: 80vw;">
        <div id="navLeft">
          <ucdlib-icon
            icon="ucdlib-dams:fa-chevron-left"
            tabindex="0"
            icon="chevron-left"
            alt="Page thumbnails left"
            ?disabled="${!this.showNavLeft}"
            ?hidden="${!this.showNavLeft || this.singleImage || this.isBookReader}"
            @click="${this._pageLeft}">
          </ucdlib-icon>
          <div
            class="br-search-non-fs"
            style="min-width: 300px;"
            ?hidden="${this.brFullscreen || !this.isBookReader}">
            <div
              class="zoom ${this.searching ? "searching" : ""} tooltip"
              @click="${this._onSearchToggled}"
              data-tooltip-text="${this.searching ? "Hide Search Box" : "Search Inside"}">
              <ucdlib-icon icon="ucdlib-dams:fa-magnifying-glass"></ucdlib-icon>
            </div>
            <div
              class="search-pagination"
              ?hidden="${this.searchResultsCount === 0}">

              <div id="search-prev"
                style="padding-left: .5rem; width: 40px;"
                @click="${this._prevSearchResult}">
                <ucdlib-icon icon="ucdlib-dams:fa-caret-left"></ucdlib-icon>
              </div>

              <span class="search-results"
                style="position: relative;
                  bottom: 1rem;
                  font-size: .9rem;
                  font-weight: bold;">
                ${this.selectedResult} / ${this.searchResultsCount}
              </span>

              <div
                id="search-next"
                style="padding-right: .5rem; width: 40px;"
                @click="${this._nextSearchResult}">
                <ucdlib-icon icon="ucdlib-dams:fa-caret-right"></ucdlib-icon>
              </div>
            </div>
          </div>
        </div>

        <div id="thumbnails" ?hidden="${this.singleImage || (this.isBookReader && !this.isMultimedia) || this.thumbnails.length < 2}">
          <div id="thumbnailInnerContainer">
            ${this.thumbnails.map((item, index) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
              <div class="thumbnail-wrapper ${item.mediaType || ''}" style="position: relative; display: inline-block;">
                <a
                  class="thumbnail ${item.mediaType || ''}"
                  href="${item.id}"
                  alt="Page #${index+1}"
                  ?selected="${item.selected}"
                  title="${item.id}"
                  media-id="${item.id}"
                  ?disabled="${item.disabled}"
                  style="background-image:url(${item.src})">
                  <iron-icon icon="fin-icons:${item.icon}" ?hidden="${!item.icon}"></iron-icon>
                </a>
                ${item.mediaType === 'audio' ? lit__WEBPACK_IMPORTED_MODULE_0__.html`
                  <ucdlib-icon 
                    class="fa-volume-high" 
                    icon="ucdlib-dams:fa-volume-high">
                  </ucdlib-icon>` : lit__WEBPACK_IMPORTED_MODULE_0__.html``}
                ${item.mediaType === 'pdf' ? lit__WEBPACK_IMPORTED_MODULE_0__.html`<ucdlib-icon
                    class="item-stack-blank"
                    icon="ucdlib-dams:item-stack-blank">
                  </ucdlib-icon>` : lit__WEBPACK_IMPORTED_MODULE_0__.html``}
              </div>
            `)}
          </div>
        </div>

        <div id="navRight" ?hidden="${this.singleImage || this.isBookReader}">
          <ucdlib-icon
            icon="ucdlib-dams:fa-chevron-right"
            tabindex="0"
            icon="chevron-right"
            alt="Page thumbnails right"
            ?disabled="${!this.showNavRight}"
            ?hidden="${!this.showNavRight}"
            @click="${this._pageRight}"
          >
          </ucdlib-icon>
        </div>
      </div>

      <div style="flex:1"></div>
      <div class="break"></div>
      <div
        id="buttonWrapper"
        class="wrap"
        style="white-space: nowrap"
        ?hidden="${this.isLightbox}"
      >
        <div @click="${this._onToggleBookView}" 
          class="page-toggle tooltip ${this.brSinglePage ? 'two-page' : 'single-page'}" 
          ?hidden="${!this.isBookReader || this.hidePageToggle}"
          data-tooltip-text="${this.brSinglePage ? 'Two-Page View' : 'Single-Page View'}">
          <ucdlib-icon
            icon="ucdlib-dams:fa-book-open"
            ?hidden="${!this.brSinglePage}"
          ></ucdlib-icon>
          <ucdlib-icon
            icon="ucdlib-dams:page-single"
            ?hidden="${this.brSinglePage}"
            class="single-page-book"
          ></ucdlib-icon>
        </div>

        <div
          class="zoom-controls tooltip"
          @click="${this._onBRZoomOutClicked}"
          ?hidden="${!this.brFullscreen}"
          data-tooltip-text="Zoom Out">
          <ucdlib-icon icon="ucdlib-dams:fa-minus"></ucdlib-icon>
        </div>
        <div
          class="zoom-controls tooltip"
          @click="${this._onBRZoomInClicked}"
          ?hidden="${!this.brFullscreen}"
          data-tooltip-text="Zoom In" >
          <ucdlib-icon icon="ucdlib-dams:fa-plus"></ucdlib-icon>
        </div>

        <div
          @click="${this._onExpandBookView}"
          ?hidden="${!this.isBookReader || this.brFullscreen || this.hideZoom}"
          class="tooltip"
          data-tooltip-text="Fullscreen"
        >
          <ucdlib-icon
            icon="ucdlib-dams:fa-up-right-and-down-left-from-center"
          ></ucdlib-icon>
        </div>
        <div
          @click="${this._onCollapseBookView}"
          ?hidden="${!this.isBookReader || !this.brFullscreen}"
          class="tooltip" data-tooltip-text="Exit Fullscreen">
          <ucdlib-icon
            icon="ucdlib-dams:fa-down-left-and-up-right-to-center"
          ></ucdlib-icon>
        </div>

        <div
          @click="${this._onZoomInClicked}"
          ?hidden="${this.isBookReader || this.hideZoom}"
          class="tooltip"
          data-tooltip-text="Fullscreen"
        >
          <ucdlib-icon
            icon="ucdlib-dams:fa-up-right-and-down-left-from-center"
          ></ucdlib-icon>
        </div>
        <div ?hidden="${this.brFullscreen}" class="tooltip" data-tooltip-text="Share">
          <app-share-btn></app-share-btn>
        </div>

        <!-- this is moved next to the bookreader slider in app-media-viewer in full screen -->
        <!-- <div class="br-search" style="display: none;">
          <div
            class="zoom ${this.searching ? "searching" : ""}"
            @click="${this._onSearchToggled}"
          >
            <ucdlib-icon icon="ucdlib-dams:fa-magnifying-glass" class="fullscreen-search"></ucdlib-icon>
          </div>
          <div
            class="search-pagination"
            ?hidden="${this.searchResultsCount === 0}"
          >
            <div
              id="search-prev"
              style="padding-left: .5rem; width: 40px;"
              @click="${this._prevSearchResult}"
            >
              <ucdlib-icon icon="ucdlib-dams:fa-caret-left"></ucdlib-icon>
            </div>

            <span
              class="search-results"
              style="position: relative;
                bottom: 1rem;
                font-size: .9rem;
                font-weight: bold;"
              >${this.selectedResult} / ${this.searchResultsCount}</span
            >

            <div
              id="search-next"
              style="padding-right: .5rem; width: 40px;"
              @click="${this._nextSearchResult}"
            >
              <ucdlib-icon icon="ucdlib-dams:fa-caret-right"></ucdlib-icon>
            </div>
          </div>
        </div> -->
      </div>

      <div
        id="buttonWrapper"
        style="white-space: nowrap"
        ?hidden="${!this.isLightbox}"
      >
        <div
          class="${this.searchingText ? "text-search" : ""}"
          style="display: none;"
          @click="${this._onSearchClicked}"
        >
          <ucdlib-icon icon="ucdlib-dams:fa-magnifying-glass"></ucdlib-icon>
        </div>

        <div @click="${this._onZoomOutClicked}" class="tooltip" data-tooltip-text="Zoom Out">
          <ucdlib-icon icon="ucdlib-dams:fa-minus"></ucdlib-icon>
        </div>
        <div @click="${this._onZoomInClicked}" class="tooltip" data-tooltip-text="Zoom In">
          <ucdlib-icon icon="ucdlib-dams:fa-plus"></ucdlib-icon>
        </div>

        <div @click="${this._onCloseClicked}" class="tooltip left-align" data-tooltip-text="Exit Fullscreen">
          <ucdlib-icon icon="ucdlib-dams:fa-down-left-and-up-right-to-center"></ucdlib-icon>
        </div>

      </div>
    </div>
  `;
}


/***/ }),

/***/ "./public/elements/pages/record/viewer/app-media-viewer.js":
/*!*****************************************************************!*\
  !*** ./public/elements/pages/record/viewer/app-media-viewer.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppMediaViewer)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_media_viewer_tpl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-media-viewer.tpl */ "./public/elements/pages/record/viewer/app-media-viewer.tpl.js");
/* harmony import */ var _ucd_lib_theme_elements_utils_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/theme-elements/utils/mixins */ "./public/node_modules/@ucd-lib/theme-elements/utils/mixins/index.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _polymer_iron_pages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @polymer/iron-pages */ "./public/node_modules/@polymer/iron-pages/iron-pages.js");
/* harmony import */ var _app_image_viewer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-image-viewer */ "./public/elements/pages/record/viewer/app-image-viewer.js");
/* harmony import */ var _app_video_viewer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-video-viewer */ "./public/elements/pages/record/viewer/app-video-viewer.js");
/* harmony import */ var _app_audio_viewer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-audio-viewer */ "./public/elements/pages/record/viewer/app-audio-viewer.js");
/* harmony import */ var _app_media_viewer_nav__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app-media-viewer-nav */ "./public/elements/pages/record/viewer/app-media-viewer-nav.js");
/* harmony import */ var _app_image_viewer_lightbox__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app-image-viewer-lightbox */ "./public/elements/pages/record/viewer/app-image-viewer-lightbox.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../lib/utils */ "./public/lib/utils/index.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_lib_utils__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_bookreader_ucdlib_bookreader_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/bookreader/ucdlib-bookreader.js */ "./public/elements/components/bookreader/ucdlib-bookreader.js");









// import "./app-360-image-viewer"











class AppMediaViewer extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_theme_elements_utils_mixins__WEBPACK_IMPORTED_MODULE_2__.MainDomElement, _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__.LitCorkUtils) {

  static get properties() {
    return {
      mediaType: { type: String },
      tallControls: { type: Boolean },
      bagOfFilesImage: { type: String },
      brFullscreen: { type: Boolean },
      brSearchOpen: { type: Boolean },
      singlePage: { type: Boolean },
      overrideImageList: { type: Boolean },
      bookData: { type: Object },
      bookItemId: { type: String },
      itemId: { type: String },
      isBookReader: { type: Boolean },
      searchResults: { type: Array },
      searchResultsCount: { type: Number },
      selectedResult: { type: Number },
      queryTerm: { type: String },
      noMedia: { type: Boolean },
      isMultimedia: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.render = _app_media_viewer_tpl__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.active = true;
    this.$ = {};
    
    this._injectModel("AppStateModel", "RecordModel", "FcAppConfigModel", "CollectionModel", "BookReaderModel");
    this._reset();
  }

  _reset() {
    this.mediaType = "";
    this.bagOfFilesImage = "";
    this.brFullscreen = false;
    this.brSearchOpen = false;
    this.singlePage = false;
    this.bookData = {};
    this.bookItemId = "";
    this.itemId = "";
    this.isBookReader = false;
    this.overrideImageList = false;
    this.searchResults = [];
    this.searchResultsCount = 0;
    this.selectedResult = 1;
    this.queryTerm = "";
    this.regexPattern = /\{\{\{.*?\}\}\}/g;
    this.noMedia = false;
    this.isMultimedia = false;
  }

  async firstUpdated() {
    this.$.lightbox = document.getElementById("lightbox");
    if (!this.$.lightbox) this.$.lightbox = document.getElementById("lightbox");

    this._onAppStateUpdate(await this.AppStateModel.get());
  }

  async _onAppStateUpdate(e) {
    if( this.AppStateModel.location.page === 'item' ) this._onRenderMedia(e);
    if( this.AppStateModel.location.page !== 'item' ) this._clearMedia();
  }

  async _onRenderMedia(e) {
    if( !e.selectedRecord ) return;

    let renderAsBr = false;
    let mediaType;
    this.noMedia = false;

    let mediaGroups = e.selectedRecord?.clientMedia?.mediaGroups || [];
    let selectedMediaGroup;

    let videoMedia = mediaGroups.find(m => m.fileFormatSimple === 'video');
    let audioMedia = mediaGroups.find(m => m.fileFormatSimple === 'audio');
    let imageListMedia = mediaGroups.find(m => m['@shortType'].includes('ImageList'));
    let pdfMedia = mediaGroups.find(m => m.fileFormatSimple === 'pdf');
    let imageMedia = mediaGroups.find(m => m.fileFormatSimple === 'image' || m['@shortType'].includes('ImageObject'));

    // coerce to boolean
    this.isMultimedia = !!((audioMedia || videoMedia) && (pdfMedia || imageListMedia || imageMedia));

    if (!mediaGroups || !mediaGroups.length || !mediaGroups.filter(m => m['@type'].length > 0).length ) {
      // try to at least load a single image as fallback
      let thumbnailUrl = _lib_utils__WEBPACK_IMPORTED_MODULE_10___default().getThumbnailFromClientMedia(e?.selectedRecord?.clientMedia);
      if( thumbnailUrl ) {
        this.mediaType = 'image';
      } else {
        this.noMedia = true;        
        this.logger.error('No recognized types found in media groups for record', e.selectedRecord?.clientMedia?.id || e.selectedRecord);      
      }
      return; 
    }

    // check for any overrides at collection/item level for the image viewer
    this.itemId = e.selectedRecord?.graph?.root?.['@id'];
    let collectionId = e.selectedRecord?.graph?.root?.isPartOf?.filter(p => p['@id'].includes('/collection/'))?.[0]?.['@id'];
    let displayType = await this._getItemDisplayType(this.itemId, collectionId);

    if( this.isMultimedia ) {
      this.isBookReader = false; // for now, disable bookreader if multimedia.. aka imagelist

      // media display types to support:
      // - if single image + audio (regardless if display type is set to bookreader), show nav with audio icon and image icon
      // - if PDF / imagelist + audio, and item is set to imageList display type, show nav bar with audio icon and images
      // - if PDF / imagelist + audio, and item is bookreader display type, show nav bar with audio icon and icon for pdf
      // - TODO support video + audio/pdf/images later. no items have this yet
      // - TODO if multiple audio/video files, show nav with multiple icons for each media file. no items have this yet

      let firstLoad = (e.location.fullpath === this.itemId);

      // first load, order as:
      // video -> audio -> bookreader (depending on displayType pref) -> image(s)
      if( firstLoad ) {
        if( videoMedia ) mediaType = 'video';
        else if( audioMedia ) mediaType = 'audio';
        else mediaType = 'image'; // default if the `isMultimedia` flag is set but no audio/video found

        this.mediaType = mediaType;
        this.noMedia = false;
        return;

      } else {
        // else e.selectedRecord.selectedMedia would point to the selected media file from the url,
        // so need to load that specific media (bookreader if pdf)
        let media = e.selectedRecord.selectedMedia;
        let type = _lib_utils__WEBPACK_IMPORTED_MODULE_10___default().getMediaType(media);
        if (type && !selectedMediaGroup) {
          mediaType = type.toLowerCase().replace(/object/i, "");
          selectedMediaGroup = media;
        }
      }
    } else {
      // media display types to support:
      // - if audio only, show audio player and hide nav
      // - if PDF / imagelist / single image only, show as current, with nav only for imagelist, hide nav for bookreader and single image
      // to check for imageList first, otherwise default to pdf for bookreader
      selectedMediaGroup = mediaGroups.filter(m => m['@shortType'].includes('ImageList'))[0];
      if( selectedMediaGroup ){
        mediaType = 'image';
        let hasPdf = mediaGroups.filter(m => m.clientMedia?.pdf);
        if( hasPdf.length ) renderAsBr = true;
      }

      if( !selectedMediaGroup ) {
        mediaGroups.forEach((media) => {
          let type = _lib_utils__WEBPACK_IMPORTED_MODULE_10___default().getMediaType(media);
          if (type && !selectedMediaGroup) {
            mediaType = type.toLowerCase().replace(/object/i, "");
            selectedMediaGroup = media;
          }
        });
      }

      if (mediaType === "imagelist") {
        mediaType = "image";
      } else if (mediaType === "streamingvideo") {
        mediaType = "video";
      }

      if (mediaType === "bagoffiles" && selectedRecordMedia.thumbnailUrl) {
        this.bagOfFilesImage = selectedRecordMedia.thumbnailUrl;
      } else {
        this.bagOfFilesImage = "";
      }
    }

    this.overrideImageList = false;

    // default to BR 2 page if no displayType is set
    if( mediaType === 'image' && !displayType ) {
      renderAsBr = true;
      mediaType = 'bookreader';
      this.singlePage = false;
    } else if( displayType && displayType.includes('Image List') && ['image', 'bookreader'].includes(mediaType) ) {
      renderAsBr = false;
      mediaType = 'image';
      this.overrideImageList = true;
    } else if ( displayType && displayType.includes('1 Page') && mediaType === 'image' ) {
      renderAsBr = true;
      mediaType = 'bookreader';
      this.singlePage = true;
    } else if ( displayType && displayType.includes('2 Page') && mediaType === 'image' ) {
      renderAsBr = true;
      mediaType = 'bookreader';
      this.singlePage = false;
    }

    // single page images should use normal image viewer
    if( renderAsBr && (selectedMediaGroup?.clientMedia?.pages?.length === 1 || !selectedMediaGroup?.clientMedia.pages?.length) ) {
      renderAsBr = false;
      if( mediaType === 'bookreader' ) mediaType = 'image';
    }

    if( renderAsBr && this.isMultimedia && mediaType === 'bookreader' ) {
      // if multimedia with bookreader, and display type is bookreader,
      // then override to image viewer to show imagelist instead
      renderAsBr = false;
      mediaType = 'image';
    }

    if( renderAsBr ) {
      // if admin pref display saved for this item, then default to specific view
      // else set to single page mode if screen width < 800px, double if >= 800px
      let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if( screenWidth < 800 ) {
        this.singlePage = true;
      } else if( !displayType && screenWidth >= 800 ) {
        this.singlePage = false;
      }

      this.BookReaderModel.setSelectedBook(e.selectedRecord.clientMedia.id, e.selectedRecord);
      this.BookReaderModel.setView(this.singlePage ? 'single' : 'double');
    }

    if (
      renderAsBr ||
      (!this.overrideImageList && selectedMediaGroup.clientMedia && selectedMediaGroup.clientMedia.pdf && !this.isMultimedia)
    ) {
      mediaType = "bookreader";
      this.isBookReader = true;
      let brData;
      if (renderAsBr && !selectedMediaGroup.clientMedia?.pdf?.manifest) {
        this.bookData = _lib_utils__WEBPACK_IMPORTED_MODULE_10___default().buildIaReaderPages(
          selectedMediaGroup.hasPart || selectedMediaGroup,
          e.selectedRecord?.clientMedia?.index
        );
      } else {
        await e.selectedRecord.clientMedia.loadManifests();
        // just in case pdf isn't root mediaGroup
        e.selectedRecord.clientMedia.mediaGroups.forEach((media) => {
          if( media.clientMedia?.pdf && media.clientMedia?.pages ) {
            this.bookData = { pages : media.clientMedia.pages };
            this.mediaType = "bookreader";
          }
        });
      }
      this.bookItemId = selectedMediaGroup["@id"];

      // TODO can this be removed since we switched to loadManifests() ?
      if (brData && brData.body) {
        this.mediaType = "bookreader";
        this.bookData =
          typeof brData.body === "string"
            ? JSON.parse(brData.body)
            : brData.body;
      }
    } else {
      this.isBookReader = false;
    }

    this.mediaType = mediaType;
    this.noMedia = false;
  }

  async _getItemDisplayType(itemId, collectionId) {
    if( !collectionId ) return;

    let edits;
    try {
      edits = await this.CollectionModel.getCollectionEdits(collectionId);
    } catch (error) {
      this.logger.warn('Error retrieving collection edits', error);
    }

    if( edits.state !== 'loaded' ) return null;
    if( !Object.keys(edits.payload).length ) return null;

    let collectionEdits = edits.payload?.collection || {};
    let itemEdits = edits.payload?.items || {};

    return itemEdits[itemId]?.itemDefaultDisplay || collectionEdits.itemDefaultDisplay;
  }

  _clearMedia() {
    let imageViewer = this.querySelector("app-image-viewer");
    // let bookreaderViewer = this.querySelector("app-bookreader-viewer");    

    if( imageViewer ) imageViewer.destroy();
    // if( bookreaderViewer ) bookreaderViewer.destroy();
    this.noMedia = false;

    this._onCollapseBookView();
    this._reset();
  }

  _onSearchResultsChange(resultsByPage={}) {
    let results = [];
    for( let page in resultsByPage ) {
      results = results.concat(...resultsByPage[page]);
    }
    this.searchResults = results;

    if (this.searchResults.length) {
      this.searchResults.sort(
        (a, b) =>
          parseInt(a?.page || 0) -
          parseInt(b?.page || 0)
      );
    }

    this.searchResultsCount = this.searchResults?.length;
    this._updateSearchNav();


    let br = this.querySelector('ucdlib-bookreader');
    if( br ) br.updateSearchResults(this.searchResults);
  }

  _updateSearchNav() {
    if( !this.brFullscreen ) return;
    
    let searchPagination = this.querySelector('.search-pagination');
    if( !searchPagination ) return;
    
    // show/hide nav based on search results
    if( !this.searchResults.length ) {
      searchPagination.setAttribute('hidden', '');
    } else {
      searchPagination.removeAttribute('hidden');

      // update label of selected result and max results
      searchPagination.querySelector('.search-results').innerText = `${this.selectedResult} / ${this.searchResultsCount}`;
    }
  }

  _onSearchResultClick(e) {
    let page = e.currentTarget.dataset?.page || 1;
    try {
      page = parseInt(page);
    } catch (e) {
      page = 1;
    }

    let searchResult = parseInt(e.currentTarget.dataset?.arrayIndex) || 0;

    this.BookReaderModel.setPage(page-1);
    this.BookReaderModel.setSelectedSearchResult(searchResult);
    
    // also update selected search result in nav
    let nav = this.querySelector("app-media-viewer-nav");
    if (!nav) return;
    this.selectedResult =
      parseInt(e.currentTarget.attributes["data-array-index"].value) + 1;

    nav.selectedResult = this.selectedResult;
    this._updateSearchNav();
  }

  /**
   * @method _onZoomIn
   * @description bound to zoom event in app-media-viewer-nav.
   *
   * @param {Object} e custom HTML event
   */
  _onZoomIn(e) {
    this.AppStateModel.set({ showLightbox: true });
    this.$.lightbox.show();
  }

  /**
   * @method _onBRZoomIn
   * @description bound to bookreader zoom event in app-media-viewer-nav.
   *
   * @param {Object} e custom HTML event
   */
  _onBRZoomIn(e) {
    document.querySelector("#bookreader")._zoomIn();
  }

  /**
   * @method _onBRZoomOut
   * @description bound to bookreader zoom event out app-media-viewer-nav.
   *
   * @param {Object} e custom HTML event
   */
  _onBRZoomOut(e) {
    document.querySelector("#bookreader")._zoomOut();
  }

  /**
   * @method _onChangeSearchResult
   * @description bound to bookreader search result change event app-media-viewer-nav.
   *
   * @param {Object} e custom HTML event
   */
  _onChangeSearchResult(e) {
    this.selectedResult = e.detail?.selectedResult;

    this.BookReaderModel.setPage((this.searchResults[this.selectedResult-1]?.page || 1) - 1);
    this.BookReaderModel.setSelectedSearchResult(this.selectedResult-1)
  }

  /**
   * @method _onToggleBookView
   * @description bound to book view single vs book mode event in app-media-viewer-nav.
   *
   * @param {Object} e custom HTML event
   */
  _onToggleBookView(e) {
    document.querySelector("#bookreader")._toggleBookView();
  }

  /**
   * @method _onExpandBookView
   * @description bound to book view full page event in app-media-viewer-nav.
   *
   * @param {Object} e custom HTML event
   */
  _onExpandBookView(e) {
    this.brFullscreen = true;

    // resize bookreader to fit full screen
    let br = document.querySelector("ucdlib-bookreader");
    if( !br ) return;

    // hide scrollbars
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }

  _prevSearchResult(e) {
    let mediaNav = document.querySelector("app-media-viewer-nav");
    if( mediaNav ) mediaNav._prevSearchResult();
    this._updateSearchNav();
  }

  _nextSearchResult(e) {
    let mediaNav = document.querySelector("app-media-viewer-nav");
    if( mediaNav ) mediaNav._nextSearchResult();
    this._updateSearchNav();
  }

  /**
   * @method _onCollapseBookView
   * @description bound to book view full page collapse event in app-media-viewer-nav.
   *
   * @param {Object} e custom HTML event
   */
  _onCollapseBookView(e) {
    this.brFullscreen = false;

    // resize bookreader to fit full screen
    let br = document.querySelector("ucdlib-bookreader");
    if( !br ) return;

    br.maxHeight = 634;

    // allow scroll
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }

  /**
   * @method _onToggleBRSearch
   * @description bound to book view search button click event in app-media-viewer-nav.
   *
   * @param {Object} e custom HTML event
   */
  _onToggleBRSearch(e) {
    this.brSearchOpen = !this.brSearchOpen;
    let brNav = document.querySelector("app-media-viewer-nav");
    if (brNav) {
      // nav elements are moved into the bookreader viewer in full screen mode
      brNav.searching = this.brSearchOpen;
    }
    this.BookReaderModel.setSearchActive(this.brSearchOpen);
  }

  /**
   * @method _onToggleBRSearch
   * @description bound to book view search event.
   *
   * @param {Object} e custom HTML event
   */
  async _onBRSearch(e) {
    this.BookReaderModel.setSelectedSearchResult(0);
    let brNav = document.querySelector("app-media-viewer-nav");
    if (brNav) {
      // nav elements are moved into the bookreader viewer in full screen mode
      brNav.brSearch = true;
      brNav.selectedResult = 1;
      brNav.searchResults = [];
    }

    this.queryTerm = e.currentTarget.value;
    if (!this.queryTerm) {
      this.searchResults = [];
      this.searchResultsCount = 0;
      this.BookReaderModel.clearSearch();
    }

    if( this.itemId && this.bookItemId && this.queryTerm ) {
      this.BookReaderModel.search(this.itemId, this.bookItemId, this.queryTerm);
    }
  }

  _onBookreaderStateUpdate(e) {
    e.fullscreen ? this._onExpandBookView() : this._onCollapseBookView();
    e.searchActive ? this.brSearchOpen = true : this.brSearchOpen = false;
    this.selectedResult = e.selectedSearchResult + 1;

    let searchResults = {};
    if( e.searchResults?.state === 'loaded' ) {
      searchResults = e.searchResults.payload;
    }
    this._onSearchResultsChange(searchResults);
  }

  _onClearSearch(e) {
    let searchInput = document.querySelector("#br-search-input");
    if (searchInput) {
      searchInput.value = "";
    }

    this.searchResults = [];
    this.searchResultsCount = 0;
    this._onBRSearch({ currentTarget: { value: "" } });

    this.brSearchOpen = false;
    this.BookReaderModel.setSearchActive(false);
  }
}

customElements.define("app-media-viewer", AppMediaViewer);


/***/ }),

/***/ "./public/elements/pages/record/viewer/app-media-viewer.tpl.js":
/*!*********************************************************************!*\
  !*** ./public/elements/pages/record/viewer/app-media-viewer.tpl.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var lit_directives_unsafe_html_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit/directives/unsafe-html.js */ "./public/node_modules/lit/directives/unsafe-html.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_lists_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_lists.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_lists.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_index.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_index.css.js");
/* harmony import */ var _ucd_lib_theme_sass_1_base_html_forms_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ucd-lib/theme-sass/1_base_html/_forms.css */ "./public/node_modules/@ucd-lib/theme-sass/1_base_html/_forms.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_forms_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_forms.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_forms.css.js");








function render() {
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <style>
      ${_ucd_lib_theme_sass_2_base_class_lists_css__WEBPACK_IMPORTED_MODULE_2__["default"]} ${_ucd_lib_theme_sass_2_base_class_index_css__WEBPACK_IMPORTED_MODULE_3__["default"]} ${_ucd_lib_theme_sass_1_base_html_forms_css__WEBPACK_IMPORTED_MODULE_4__["default"]} ${_ucd_lib_theme_sass_2_base_class_forms_css__WEBPACK_IMPORTED_MODULE_5__["default"]} :host {
        display: block;
        position: relative;
        box-sizing: border-box;
      }

      [hidden] {
        display: none !important;
      }

      .wrapper {
        /* display: flex; */
        /* flex-direction: column; */
        /* min-height:250px; */
      }

      #bagoffiles {
        text-align: center;
      }

      #bagoffiles iron-icon {
        width: 100%;
        height: 100%;
        max-width: 150px;
        max-height: 150px;
        color: var(--color-grey);
      }

      img {
        max-width: 100%;
      }

      /* app-bookreader-viewer.fullscreen {
        background-color: white;
        position: fixed;
        padding: 0px;
        margin: 0px;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 3000;
      } */

      #br-search-input,
      #br-search-input:focus {
        border: none;
      }

      .search-side-panel .overflow::-webkit-scrollbar {
        width: 10px;
      }
      .search-side-panel .overflow::-webkit-scrollbar-track {
        background: var(--color-aggie-gold-70);
        /* border-left: 4px solid var(--color-aggie-gold-70);
        border-right: 4px solid var(--color-aggie-gold-70); */
      }
      .search-side-panel .overflow[no-overflow]::-webkit-scrollbar-track {
        background: transparent;
        border: none;
      }
      .search-side-panel .overflow::-webkit-scrollbar-thumb {
        border-radius: 6px;
        background: var(--color-aggie-gold);
      }

      /* basic support for FF. Chrome/Safari should support -webkit styles above */
      @supports (scrollbar-color: red blue) {
        .search-side-panel * {
          scrollbar-color: var(--color-aggie-gold) var(--color-aggie-gold-70);
          scrollbar-width: thin;
        }
      }

      .search-result .searched-term {
        border: 2px solid var(--color-redbud);
        padding: 1px 4px;
        color: var(--color-redbud);
        font-weight: bold;
      }

      .search-side-panel.off-canvas--left {
        transform: translateX(-105%);
      }

      .search-side-panel {
        position: absolute;
        top: 1.8rem;
        width: 350px;
        height: 570px;
        background: var(--color-aggie-gold-40);
        z-index: 1000;
        border-radius: 0 30px 30px 0;
        box-shadow: 0px 3px 6px #00000029;
        transition: all 0.3s;
      }

      .search-side-panel.fullscreen {
        position: fixed;
        top: 1rem;
        left: 0;
        width: 350px;
        background: var(--color-aggie-gold-40);
        z-index: 3000;
        border-radius: 0 30px 30px 0;
        height: calc(90vh - 100px);
        box-shadow: 0px 3px 6px #00000029;
        transition: all 0.3s;
      }

      .search-collapse-btn {
        width: 40px;
        height: 40px;
        display: inline-block;
        margin: auto;
        float: right;
        cursor: pointer;
        margin-top: -3px;
      }

      .search-collapse-btn ucdlib-icon {
        margin: auto;
        vertical-align: middle;
        text-align: center;
        fill: var(--color-aggie-blue-70);
        width: 1.75rem;
        height: 1.75rem;
      }

      .search-side-panel.fullscreen .search-content {
        overflow: auto;
        max-height: calc(90vh - 250px);
        overflow-y: scroll;
        padding: 1rem;
        padding-bottom: 0;
      }

      .search-side-panel .search-content {
        overflow: auto;
        max-height: 430px;
        overflow-y: scroll;
        padding: 0 1rem 1rem 1rem;
        padding-bottom: 0;
        background-color: var(--color-aggie-gold-40);
      }

      #br-search-input {
        width: 90%;
        margin: 0 0 1rem;
        font-weight: bold;
        font-size: 0.9rem;
        padding-left: 1rem;
        color: var(--color-aggie-blue-90);
      }

      .search-clear-btn {
        width: 50px;
        height: 50px;
        display: inline-block;
        margin: auto;
        border-radius: 50%;
        float: right;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0.4rem;
      }
      .search-clear-btn ucdlib-icon {
        margin: auto;
        vertical-align: middle;
        text-align: center;
        fill: var(--color-aggie-blue-90);
        padding-top: 0.6rem;
      }

      ucdlib-bookreader {
        padding-top: 1.75rem;
        padding-bottom: 3.5rem;
      }

      ucdlib-bookreader[fullscreen] {
        padding-top: .5rem;
      }

      /* .br-fullscreen-active {
          html, body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            height: 100%;
        }
      } */
    </style>

    <div class="wrapper" style="position: relative;">
      <app-image-viewer-lightbox id="lightbox"></app-image-viewer-lightbox>

      <ucdlib-pages
        selected="${this.mediaType}"
        attr-for-selected="id"
        selectedAttribute="visible">
        <!-- <app-360-image-viewer id="360"></app-360-image-viewer> -->
        <div id="bagoffiles">
          <iron-icon
            icon="fin-icons:various-outline-stacked"
            ?hidden="${this.bagOfFilesImage}">
          </iron-icon>
          <img
            src="${this.bagOfFilesImage}"
            ?hidden="${!this.bagOfFilesImage}"
          />
        </div>
        <app-image-viewer id="image"></app-image-viewer>
        <ucdlib-bookreader ?fullscreen="${this.brFullscreen}" id="bookreader" max-height="634"></ucdlib-bookreader>
        <app-video-viewer id="video"></app-video-viewer>
        <app-audio-viewer id="audio" .isMultimedia="${this.isMultimedia}"></app-audio-viewer>
      </ucdlib-pages>

      <div ?hidden="${!this.noMedia}">
        <img src="/images/tree-bike-illustration.png" style="margin: 0 auto; display: block; height: 600px;" />
      </div>

      <div
        class="search-side-panel ${this.brFullscreen
          ? "fullscreen"
          : ""} ${!this.brSearchOpen ? "off-canvas--left" : ""}"
        ?hidden="${!this.isBookReader}"
      >
        <div>
          <div style="padding: 1.5rem 1rem;">
            <h5 style="color: var(--color-aggie-blue); display: inline; font-size: 1.5rem">
              Search Inside
            </h5>
            <div class="search-collapse-btn" @click="${this._onToggleBRSearch}">
              <ucdlib-icon
                icon="ucdlib-dams:fa-chevron-circle-left"
                tabindex="0"
                icon="chevron-left"
                alt="Collapse search panel"
              >
              </ucdlib-icon>
            </div>
          </div>

          <div class="search-content overflow">
            <div style="position: relative">
              <input
                type="text"
                id="br-search-input"
                autocomplete="off"
                aria-label="Search inside this item"
                @change="${this._onBRSearch}"
              />

              <div class="search-clear-btn" @click="${this._onClearSearch}">
                <ucdlib-icon
                  icon="ucdlib-dams:fa-xmark"
                  tabindex="0"
                  icon="fa-xmark"
                  alt="Cancel search"
                >
                </ucdlib-icon>
              </div>
            </div>
            <div style="text-align: center;">
              <span style="font-size: .8rem; font-style: italic; "
                >${this.searchResultsCount}
                result${this.searchResultsCount === 1 ? "" : "s"}</span
              >
            </div>

            ${this.searchResults.map(
              (result, index) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
                <div
                  class="search-result"
                  style="margin: 0 0 2rem; cursor: pointer;"
                  data-match-index="${result.matchIndex}"
                  data-array-index="${index}"
                  data-page="${result?.page || 0}"
                  @click="${this._onSearchResultClick}"
                >
                  <h5 style="margin-bottom: 0; margin-top: 1rem">
                    Page ${parseInt(result?.page || 0)}
                  </h5>
                  <p style="font-size: .9rem; margin-top: .3rem">
                    ${(0,lit_directives_unsafe_html_js__WEBPACK_IMPORTED_MODULE_1__.unsafeHTML)(
                      result.text
                        .replace("{{{", '<span class="searched-term">')
                        .replace("}}}", "</span>")
                    )}
                  </p>
                </div>
              `
            )}
          </div>
        </div>
      </div>

      <app-media-viewer-nav
        ?hidden="${(!this.mediaType || this.mediaType === "audio") && !this.isMultimedia}"
        .isBookReader="${this.isBookReader}"
        .searchResults="${this.searchResults}"
        ?brsinglepage="${this.singlePage}"
        overrideImageList="${this.overrideImageList}"
        .isMultimedia="${this.isMultimedia}"
        @zoom-in="${this._onZoomIn}"
        @br-bookview-toggle="${this._onToggleBookView}"
        @br-expand-view="${this._onExpandBookView}"
        @br-collapse-view="${this._onCollapseBookView}"
        @br-search-toggle="${this._onToggleBRSearch}"
        @br-zoom-in="${this._onBRZoomIn}"
        @br-zoom-out="${this._onBRZoomOut}"
        @br-change-search-result="${this._onChangeSearchResult}"
      >
      </app-media-viewer-nav>
    </div>
  `;
}


/***/ }),

/***/ "./public/elements/pages/record/viewer/app-video-viewer.js":
/*!*****************************************************************!*\
  !*** ./public/elements/pages/record/viewer/app-video-viewer.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppVideoViewer)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_video_viewer_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-video-viewer.tpl.js */ "./public/elements/pages/record/viewer/app-video-viewer.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../lib/config */ "./public/lib/config.js");
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_config__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../lib/utils */ "./public/lib/utils/index.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lib_utils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_utils_video_lib_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../lib/utils/video-lib-loader */ "./public/lib/utils/video-lib-loader.js");
/* harmony import */ var plyr_dist_plyr_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! plyr/dist/plyr.css */ "./public/node_modules/plyr/dist/plyr.css");
/* harmony import */ var plyr_dist_plyr_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(plyr_dist_plyr_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var shaka_player_dist_controls_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! shaka-player/dist/controls.css */ "./public/node_modules/shaka-player/dist/controls.css");
/* harmony import */ var shaka_player_dist_controls_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(shaka_player_dist_controls_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var plyr_dist_plyr_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! plyr/dist/plyr.svg */ "./public/node_modules/plyr/dist/plyr.svg");
/* harmony import */ var plyr_dist_plyr_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(plyr_dist_plyr_svg__WEBPACK_IMPORTED_MODULE_8__);
// https://github.com/sampotts/plyr
// https://github.com/google/shaka-player/
// https://github.com/google/shaka-player/tree/master/docs/tutorials












let VIDEO_STYLES = (plyr_dist_plyr_css__WEBPACK_IMPORTED_MODULE_6___default())+(shaka_player_dist_controls_css__WEBPACK_IMPORTED_MODULE_7___default());


let SPRITE_SHEET = (plyr_dist_plyr_svg__WEBPACK_IMPORTED_MODULE_8___default())

// Very dump.  To remove the 'Shaka Player TextTrack'
// you have to override this...
class SimpleTextDisplayer {
  constructor(video) {}
  remove() {return true}
  destroy() {}
  append(cues) {}
  setTextVisibility(on) {}
  isTextVisible() {return false}
}

class AppVideoViewer extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {
  
  static get properties() {
    return {
      player: {type: Object},
      tracks: {type: Array},
      libsLoaded : {type: Boolean}
    }
  }

  constructor() {
    super();
    this.render = _app_video_viewer_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this._injectModel('AppStateModel', 'MediaModel');
    this.tracks = [];
    this.player = {};
    this.libsLoaded = false;
  }

  _onAppStateUpdate(e) {
    if ( this.fullPath !== e.location.fullpath ) { 
      this._stop();
    }

    if( !e.selectedRecord ) return;

    this.fullPath = e.location.fullpath;

    // TODO change to support multiple media groups
    this._onSelectedRecordMediaUpdate(
      e.selectedRecord.clientMedia?.mediaGroups[0]
    );
  }

  async firstUpdated(e) {
    this._onAppStateUpdate(await this.AppStateModel.get());

    requestAnimationFrame(async () => {
      // webpack module is base64 encoded URL, check if this happened 
      // and decode, then set svg to innerHtml inside the shadow dom.
      if( SPRITE_SHEET.indexOf('data:image/svg+xml;base64') > -1 ) {
        SPRITE_SHEET = atob(SPRITE_SHEET.replace('data:image/svg+xml;base64,', ''));
      }
      this.shadowRoot.querySelector('#sprite-plyr').innerHTML = SPRITE_SHEET;
    
      // decide where to put css
      // The PLYR library isn't aware of shadydom so we need to manually
      // place our styles in document.head w/o shadydom touching them.
      let plyrStyles = document.createElement('style');
      plyrStyles.innerHTML = VIDEO_STYLES;
      if( window.ShadyDOM && window.ShadyDOM.inUse ) {
        document.head.appendChild(plyrStyles);
        this.hideControls = false;
      } else {
        this.shadowRoot.appendChild(plyrStyles);
        this.hideControls = true;
      }
    });    
  }

  /**
   * @method _onSelectedRecordMediaUpdate
   * @description from AppStateModel, called when a records media is selected
   * 
   * @param {Object} media 
  **/
  async _onSelectedRecordMediaUpdate(media) {
    if( !media ) return;
    let mediaType = _lib_utils__WEBPACK_IMPORTED_MODULE_4___default().getMediaType(media);
    if (mediaType !== 'VideoObject' && mediaType !== 'StreamingVideo') return;

    this.media = media;

    // find associated captions and prep to tracks array
    this.tracks = _lib_utils__WEBPACK_IMPORTED_MODULE_4___default().asArray(media, 'caption')
      .filter(caption => caption['@id'] !== undefined )
      .map(caption => {
        let lng = caption.language;
        let setDefault = (lng === 'en' ? true : false);

        return {
          kind: 'captions',
          label: _lib_utils__WEBPACK_IMPORTED_MODULE_4___default().getLanguage(lng),
          srclang: lng,
          src: caption['@id'],
          default: setDefault
        };
      });

    // if we have already loaded the player and shaka libraries
    // then we can go ahead and load the video
    if( this.libsLoaded ) {
      this._loadVideo();
      return;
    }

    // dynamically load plyr and shaka libs
    let {plyr, shaka} = await _lib_utils_video_lib_loader__WEBPACK_IMPORTED_MODULE_5__["default"].load();

    // alert user if video playback is not supported
    let plyr_supported = plyr.supported('video', 'html5', true);
    let shaka_supported = shaka.Player.isBrowserSupported();
    if( !plyr_supported || !shaka_supported ) {
      return alert('Your browser does not support video playback');
    }

    let videoEle = this.shadowRoot.getElementById('video');

    this.plyr = new plyr(videoEle, {
      hideControls: this.hideControls,
      fullscreen : { enabled: false }, // fallback: true, iosNative: true },
      captions: {update: false},
      // keyboard: {global: true},
      controls : ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume'] //, 'fullscreen'],
    });

    // Construct a Player to wrap around the <video> tag.
    this.shaka = new shaka.Player(videoEle, );
    this.shaka.configure({
      textDisplayFactory : SimpleTextDisplayer
    });

    this.shaka.addEventListener('error', e => this.logger.error('shaka error', e));
    
    this.libsLoaded = true;
    await this._loadVideo();
  }

  /**
   * @method _loadVideo
   * @description load url into shaka for current media
   */
  async _loadVideo() {
    if( !this.media ) return;

    let mediaType = _lib_utils__WEBPACK_IMPORTED_MODULE_4___default().getMediaType(this.media);
    let manifestUri = (_lib_config__WEBPACK_IMPORTED_MODULE_3___default().fcrepoBasePath)+this.media['@id'];

    if( this.media.clientMedia?.streamingVideo?.manifest ) {
      manifestUri = this.media.clientMedia.streamingVideo.manifest;
    } else if( mediaType === 'StreamingVideo' ) {
      manifestUri += '/playlist.m3u8'
    }

    try {
      await this.shaka.load(manifestUri);
    } catch(error) {
      this.logger.error('Error code: ', error.code, 'object', error);
    }
  }

  /**
   * Stop playback and reset to start
   */
  _stop() {
    const video = this.shadowRoot.querySelector('#video');
    video.pause();

    if ( this.plyr === undefined || this.plyr === null ) return;

    if (Object.entries(this.plyr).length != 0) {
      this.plyr.stop();
    };
  }
}

customElements.define('app-video-viewer', AppVideoViewer);

/***/ }),

/***/ "./public/elements/pages/record/viewer/app-video-viewer.tpl.js":
/*!*********************************************************************!*\
  !*** ./public/elements/pages/record/viewer/app-video-viewer.tpl.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var lit_html_directives_repeat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit-html/directives/repeat.js */ "./public/node_modules/lit-html/development/directives/repeat.js");
// https://github.com/ucd-library/pgdm-ui/tree/master/app/elements/pages/connect




function render() { 
return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <style>
        :host {
            display: block;
            box-sizing: border-box;
            width: 60%;
            margin: auto;
        }

        .container {
            padding: 10px;
        }

        video {
            max-width: 100%;
            height: auto;
            max-height: 600px;
        }

        .plyr__video-wrapper {
            text-align: center;
        }

        .plyr--full-ui input[type=range] {
            color: #daaa00 !important;
        }

        button.plyr__control.plyr__control--overlaid,
        button.plyr__control.plyr__control:hover {
            background: rgba(218,170,0,1.0) !important;
        }

        .plyr__control:focus {
            background: rgba(218,170,0,1.0) !important;
        }
        .plyr--full-ui input[type=range] {
            padding: 2px !important;
            border: 1px solid transparent !important;
        }
        .plyr--full-ui input[type=range]:focus {
            border: 1px dashed rgba(218,170,0,1.0) !important;
        }
        .plyr__tab-focus {
            outline: 0 !important;
            background: transparent !important;
        }

        @media(max-width: 768px) {
            :host {
                width: 90%;
            }
        }
    </style>
    
    <div class="container">
        <div id="sprite-plyr" style="display: none;"></div> 
        <video ?hidden="${!this.libsLoaded}" id="video" playsinline controls crossorigin>
            ${(0,lit_html_directives_repeat_js__WEBPACK_IMPORTED_MODULE_1__.repeat)(this.tracks, (t) => 
                lit__WEBPACK_IMPORTED_MODULE_0__.html`<track kind="${t.kind}" label="${t.label}" src="${t.src}" srclang="${t.srclang}" default="${t.default}" />`)}
        </video>
    </div>
`
}


/***/ }),

/***/ "./public/elements/utils/app-share-btn.js":
/*!************************************************!*\
  !*** ./public/elements/utils/app-share-btn.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppShareBtn)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_share_btn_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-share-btn.tpl.js */ "./public/elements/utils/app-share-btn.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _app_toast_popup_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-toast-popup.js */ "./public/elements/utils/app-toast-popup.js");









const BASE_SHARE_LINKS = {
  facebook : 'https://www.facebook.com/sharer/sharer.php',
  bluesky : 'https://bsky.app/intent/compose',
  // pinterest can also add ?media and ?description
  pinterest : 'https://pinterest.com/pin/create/button/'
}

class AppShareBtn extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {

  static get properties() {
    return {
      visible : { type : Boolean }
    }
  }

  constructor() {
    super();
    this.render = _app_share_btn_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.active = true;

    this.visible = false;
    this.removeAttribute('popup');
    this._injectModel('AppStateModel', 'MediaModel', 'RecordModel');
  }

  willUpdate(changedProperties) {
    if( changedProperties.has('visible') ) {
      if( this.visible ) {
        this.setAttribute('popup', '');
      } else {
        this.removeAttribute('popup');
      }
    }
  }

  /**
   * @method _onAppStateUpdate
   * @description bound to AppStateModel app-state-update event
   * 
   * @param {Object} e app-state-update event
   * 
  */
  _onAppStateUpdate(e) {
    if( e.location.page !== 'item' ) {
      this.visible = false;
    }
  }

  /**
   * @method _onShareSelected
   * @description bound to main icon, toggles popup when clicked
   * 
   * @param {Object} e HTML click event
   */
  _onShareSelected(e) {
    this.visible = !this.visible;
    e.preventDefault();
    e.stopPropagation();
  }

  _clickPopop(e) {
    e.stopPropagation();
  }

  /**
   * @method _onCopyLink
   * @description bound to share icon copy link button
   * 
   * @param {Object} e HTML click event 
   */
  async _onCopyLink(e) {
    try {
      await navigator.clipboard.writeText(window.location.href);
      let toastPopup = this.shadowRoot.querySelector('app-toast-popup');
      if( toastPopup ) toastPopup.showPopup();
    } catch (err) {
      this.logger.error('Failed to copy url: ', err);
    }
  }

  /**
   * @method _onSocialIconClick
   * @description bound to social icon buttons.  Called when one os clicked
   * 
   * @param {Object} e HTML click event 
   */
  _onSocialIconClick(e) {
    let record = this.AppStateModel.getSelectedRecord();
    let media = record.selectedMedia;
    let itemName = record.graph?.root?.name || '';

    if( e.type === 'keyup' && e.which !== 13 ) return;
    let id = e.currentTarget['id'];

    let url = BASE_SHARE_LINKS[id];
    let qso = {};
    let name = (itemName || media.name || media.title || record.name || record.title);
    
    if( id === 'pinterest' ) {  
      let path;
      let images = record.clientMedia?.mediaGroups?.[0]?.clientMedia?.images;
      if( images?.originalMedia?.missing || !images?.originalMedia?.url ) {
        path = images?.large?.url ||
                images?.medium?.url ||
                images?.small?.url;
      } else {
        path = images?.originalMedia?.url;
      }

      if( path ) {
        qso.media = window.location.protocol+'//'+window.location.host+path;
      }
      qso.description = name;
      qso.url = window.location.href;
    } else if ( id === 'facebook' ) {
      qso.u = window.location.href;
    } else if( id === 'bluesky' ) {
      let text = name+' - '+window.location.href+' #UCDavisLibrary #DigitalCollections';
      if( text.length > 300) {
        let diff = (text.length + 3) - 300;
        name = name.substr(0, name.length-diff)+'...';
        text = name+' - '+window.location.href+' #UCDavisLibrary #DigitalCollections';
      }

      qso.text = text;
    } else {
      throw new Error('Unknown social media type: '+id);
    }

    url += this._createQs(qso);
    window.open(url, '_blank', 'height=400,width=500');
  }

  _createQs(qso) {
    let query = [];
    for( let key in qso ) {
      query.push(key+'='+encodeURIComponent(qso[key]));
    }
    return '?'+query.join('&');
  }

  /**
   * @method _copyLink
   * @description bound to click event on button.  Copy text to clipboard
   * show UI interaction.
   */
  _copyLink() {
    // this.$.link.select();
    this.shadowRoot.querySelector('#link').focus();
    this.shadowRoot.querySelector('#link').setSelectionRange(0, 9999);
    document.execCommand("Copy");

    this.shadowRoot.querySelector('#copyIcon').icon = 'check';
    this.shadowRoot.querySelector('#copyButton').setAttribute('active', 'active');

    setTimeout(() => {
      this.shadowRoot.querySelector('#copyIcon').icon = 'content-copy';
      this.shadowRoot.querySelector('#copyButton').removeAttribute('active', 'active');
    }, 3000);
  }

}

customElements.define('app-share-btn', AppShareBtn);

/***/ }),

/***/ "./public/elements/utils/app-share-btn.tpl.js":
/*!****************************************************!*\
  !*** ./public/elements/utils/app-share-btn.tpl.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/shared-styles */ "./public/elements/styles/shared-styles.js");




function render() { 
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`

<style include="shared-styles">
  ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__.sharedStyles}

  :host {
    display: inline-block;
    position: relative;
    width: 48px;
    height: 48px;
  }

  [hidden] { display: none !important; }

  #popup {
    display: block;
    z-index: 2005;
    background: var(--color-aggie-blue-30);
    padding: 10px;
    position: absolute;
    bottom: 70px;
    right: -20px;
    min-width: 325px;
  }

  /* #popup::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 150%;
    left: 0;
    top: 0;
    z-index: -1;
    border: 1px solid green;    
  } */

  .layout {
    display: flex;
    justify-content: center;
  }

  input {
    font-size: var(--fs-p);
    padding: 0 0 0 5px;
    display: block;
    border: none;
    height: 38px;
    outline: none;
  }

  #link {
    width: 100%;
    border-top: 1px solid var(--medium-background-color);
    border-left: 1px solid var(--medium-background-color);
    border-bottom: 1px solid var(--medium-background-color);
    box-sizing: border-box;
  }

  .social {
    margin: 8px;
    display: inline-block;
    cursor: pointer;
    height: 40px;
    width: 40px;
    border: 2px solid transparent;
    outline: none;
  }
  .social:focus {
    border: var(--default-outline);
    border-radius: 20px;
  }

  .copyButton {
    white-space: nowrap;
    height: 38px;
    text-transform: uppercase;
    font-size: var(--fs-sm);
    font-weight: var(--fw-bold);
    background-color: var(--default-secondary-color);
    color: var(--default-primary-color);
    border-radius: 0;
    border: none;
    cursor: pointer;
    padding: 0 5px;
  }
  .copyButton[active] {
    text-align: center;
    background-color: var(--default-primary-color);
    color: var(--default-secondary-color);
  }
  .copyButton[active] span {
    display: none;
  }

  #main {
    color: var(--default-secondary-color);
  }

  .arrow-down {
    position: absolute;
    width: 0; 
    height: 0; 
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 20px solid var(--color-aggie-blue-30);
    bottom: -20px;
    right: 27px;
  }

  paper-icon-button:focus {
    border-radius: 0 !important;
  }

  ucdlib-icon {
    fill: white;
    width: 25px;
    height: 50px;
    margin: auto;
    cursor: pointer;
  }

  .icon {
    text-align: center;
    margin: .5rem;
  }

  .icon ucdlib-icon {
    /* width: 37px; */
    height: 60px;
  }

  .circle {
    /* background-color: orange; */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin: auto;
    cursor: pointer;
  }

  .circle.copy {
    background-color: var(--color-aggie-gold);
  }
  .circle.facebook {
    background-color: #3b5998;
  }
  .circle.bluesky {
    background-color: #1185FE;
  }
  .circle.pinterest {
    background-color: #cb2027;
  }

  .icon span {
    font-size: .7rem;
  }
</style>

<div id="popup" ?hidden="${!this.visible}" @click="${this._clickPopop}">
  <div class="layout">
      <div class="icon">
        <div class="circle copy"
          @click="${this._onCopyLink}">
          <ucdlib-icon icon="ucdlib-dams:fa-link"></ucdlib-icon>
        </div>
        <span>Copy Link</span>
      </div>

      <div class="icon">
        <div class="circle facebook" id="facebook"
          @click="${this._onSocialIconClick}">
          <ucdlib-icon icon="ucdlib-dams:fa-facebook-f"></ucdlib-icon>
        </div>
      <span>Facebook</span>
    </div>

    <div class="icon">
        <div class="circle bluesky" id="bluesky"
          @click="${this._onSocialIconClick}">
          <ucdlib-icon icon="ucdlib-dams:fa-bluesky"></ucdlib-icon>
        </div>
      <span>Bluesky</span>
    </div>
    <div class="icon">
      <div class="circle pinterest" id="pinterest"
        @click="${this._onSocialIconClick}">
        <ucdlib-icon icon="ucdlib-dams:fa-pinterest-p"></ucdlib-icon>
      </div>
      <span>Pinterest</span>
    </div>
  </div>
  <div class="arrow-down"></div>
</div>

<ucdlib-icon 
  icon="ucdlib-dams:fa-share" 
  @click="${this._onShareSelected}">
</ucdlib-icon>

<app-toast-popup></app-toast-popup>
`;}

/***/ }),

/***/ "./public/elements/utils/app-toast-popup.js":
/*!**************************************************!*\
  !*** ./public/elements/utils/app-toast-popup.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppToastPopup)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_toast_popup_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-toast-popup.tpl.js */ "./public/elements/utils/app-toast-popup.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");






class AppToastPopup extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {

  static get properties() {
    return {
      visible : { type : Boolean }
    }
  }

  constructor() {
    super();
    this.render = _app_toast_popup_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.active = true;

    this.visible = false;
  }

  /**
   * @method showPopup
   * @description show the popup for 5 seconds
   * 
   */
  showPopup() {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, 5000);
  }
}

customElements.define('app-toast-popup', AppToastPopup);

/***/ }),

/***/ "./public/elements/utils/app-toast-popup.tpl.js":
/*!******************************************************!*\
  !*** ./public/elements/utils/app-toast-popup.tpl.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/shared-styles */ "./public/elements/styles/shared-styles.js");




function render() { 
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`

<style include="shared-styles">
  ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__.sharedStyles}

  :host {
    display: inline-block;
    position: fixed;
  }

  [hidden] { display: none !important; }

  #popup {
    display: block;
    z-index: 10;
    background: var(--color-aggie-blue-10);
    padding: 1rem;
    position: fixed;
    bottom: 1rem;
    right: calc(50% - 110px - 2rem);
    width: 11rem;
    font-size: 1rem;
    margin: 1rem;
    border-radius: 1.5rem;
    box-shadow: 0px 3px 6px #00000029;
    transition: all 0.3s;
    color: var(--color-aggie-blue);
  }

  #popup svg {
    height: 20px;
    width: 30px;
    fill: var(--color-sage);
    position: relative;
    top: 0.2rem;
  }
</style>

<div id="popup" ?hidden="${!this.visible}">
  <svg id="fa-check" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
  Copied successfully
</div>

`;}

/***/ }),

/***/ "./public/elements/utils/app-virtual-scroller.js":
/*!*******************************************************!*\
  !*** ./public/elements/utils/app-virtual-scroller.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppVirtualScroller)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_virtual_scroller_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-virtual-scroller.tpl.js */ "./public/elements/utils/app-virtual-scroller.tpl.js");




class AppVirtualScroller extends lit__WEBPACK_IMPORTED_MODULE_0__.LitElement {

  static get properties() {
    return {
      itemHeight : {
        type: Number,
        attribute: 'item-height'
      },
      items : {type: Array},
      renderedItems : {type: Array}
    }
  }

  constructor() {
    super();
    this.render = _app_virtual_scroller_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);

    this.itemHeight = 20;
    this.renderedItems = [];
    this.items = [];
    this.height = -1;

    this._onResize = this._onResize.bind(this);
    this.addEventListener('scroll', () => this._onViewportUpdate());
  }

  firstUpdated() {
    this.positionEle = this.querySelector('.app-virtual-scroller-scroll-panel');
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('resize', this._onResize);
    this._cacheHeight();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._onResize);
  }

  createRenderRoot() {
    return this;
  }

  _onResize(e) {
    this._cacheHeight(true);
  }

  _cacheHeight(callViewportUpdate=true) {
    this.height = this.offsetHeight;
    if( callViewportUpdate === true ) this._onViewportUpdate();
  }

  setItemRenderer(renderer, scope) {
    this.renderItem = renderer;
    this.renderItemScope = scope || this;
  }

  updated(props) {
    if( props.has('items') ) {
      this.scrollTop = 0;
      this.totalScrollHeight = this.itemHeight*this.items.length;
      this.positionEle.style.height = (this.itemHeight*this.items.length)+'px';
    }
    if( props.has('itemHeight') || props.has('items') ) {
      this._onViewportUpdate(true);
    }

  }

  _onViewportUpdate(force=false) {
    if( this.height <= 0 ) this._cacheHeight(false);

    let firstItem = Math.floor(this.scrollTop / this.itemHeight) - 1;
    if( firstItem < 0 ) firstItem = 0;

    let lastItem = firstItem + Math.ceil(this.height / this.itemHeight) + 2;
    if( lastItem >= this.items.length ) lastItem = this.items.length;

    if( this.firstItem === firstItem && this.lastItem === lastItem && force === false ) return;
    
    // check for iOS overscroll and ignore
    if( this.itemHeight * (lastItem-1) > this.height &&
       this.scrollTop + this.height + 5 > this.totalScrollHeight ) {
      return;
    }
    
    this.firstItem = firstItem;
    this.lastItem = lastItem;

    let items = [];
    for( let i = firstItem; i < lastItem; i++ ) {
      items.push({index: i, top: this.itemHeight*i});
    }
    this.renderedItems = items;

    Array.from(this.querySelectorAll('.vs-row'))
      .forEach(ele => ele.removeAttribute('hover'));
  }

  renderItems() {
    // update triggered from nested object
    if( this.renderedItems.length > this.items.length ) {
      return lit__WEBPACK_IMPORTED_MODULE_0__.html``;
    }

    return this.renderedItems.map(item => {
      // badness
      if( item.index >= this.items.length ) {
        return lit__WEBPACK_IMPORTED_MODULE_0__.html``;
      }

      return lit__WEBPACK_IMPORTED_MODULE_0__.html`
        <div
          class="vs-row"
          @mouseover="${this._onRowMouseOver}"
          @mouseout="${this._onRowMouseOut}" 
          style="position: absolute; left: 0; right: 0; top: ${item.top}px; height: ${this.itemHeight}px">
          ${this.renderItem.apply(this.renderItemScope, [item.index])}
        </div>`
      });
  }

  _onRowMouseOver(e) {
    e.currentTarget.setAttribute('hover', 'true');
  }

  _onRowMouseOut(e) {
    e.currentTarget.removeAttribute('hover');
  }

  renderItem(index) {
    throw new Error('You must override this method');
  }

}

customElements.define('app-virtual-scroller', AppVirtualScroller);


/***/ }),

/***/ "./public/elements/utils/app-virtual-scroller.tpl.js":
/*!***********************************************************!*\
  !*** ./public/elements/utils/app-virtual-scroller.tpl.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");


function render() { 
return lit__WEBPACK_IMPORTED_MODULE_0__.html`

<style>
  app-virtual-scroller {
    display: block;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  app-virtual-scroller .app-virtual-scroller-scroll-panel {
    position: relative;
    /* border: 2px solid red; */
  }
</style>  

<div class="app-virtual-scroller-scroll-panel">
  ${this.renderItems()}
</div>

`;}

/***/ }),

/***/ "./public/elements/utils/shared-html.js":
/*!**********************************************!*\
  !*** ./public/elements/utils/shared-html.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");


/**
 * @class SharedHtml
 * @description Lit html template strings used across the site.
 * Designed to be used with DAMS shared styles, so make sure you import those into your element
 */
class SharedHtml {

  /**
   * @method headerDots
   * @description Displays the yellow dots beneath a section header
   * @returns {TemplateResult}
   */
  headerDots(){
    return lit__WEBPACK_IMPORTED_MODULE_0__.html`
      <div class="header-dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    `;
  }

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new SharedHtml());

/***/ }),

/***/ "./public/lib/utils/user.js":
/*!**********************************!*\
  !*** ./public/lib/utils/user.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const config = __webpack_require__(/*! ../config */ "./public/lib/config.js");

/**
 * @class User
 * @description wrapper around APP_CONFIG.user
 */
class User {

  constructor() {
    this.data = config.user;
    if( !this.data.roles ) this.data.roles = [];
    this.editUiAccess = ['admin', 'ui-admin'];
  }

  isLoggedIn() {
    if( this.data.loggedIn === true ) return true;
    return false;
  }

  canEditUi() {
    for( let role of this.editUiAccess ) {
      if( this.hasRole(role) ) return true;
    }
    return false;
  }

  hasRole(role) {
    return this.data.roles.includes(role);
  }
}

let user = new User();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (user);

/***/ }),

/***/ "./public/lib/utils/video-lib-loader.js":
/*!**********************************************!*\
  !*** ./public/lib/utils/video-lib-loader.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class VideoLibLoader {
  async load() {
    if ( this.loaded ) return this.loaded;

    if ( this.loading ) {
      await this.loading;
      return this.loaded;
    }

    this.loading = new Promise(async (resolve, reject) => {
      const plyr = ( await __webpack_require__.e(/*! import() | video-libs */ "video-libs").then(__webpack_require__.t.bind(__webpack_require__, /*! plyr */ "./public/node_modules/plyr/dist/plyr.min.js", 23)) ).default;
      // const plyr = ( await import(/* webpackChunkName: "video-libs" */ 'plyr/src/js/plyr') ).default;
      const shaka = await __webpack_require__.e(/*! import() | video-libs */ "video-libs").then(__webpack_require__.t.bind(__webpack_require__, /*! shaka-player */ "./public/node_modules/shaka-player/dist/shaka-player.compiled.js", 23));
      
      // Install the polyfills before doing anything with the library
      await shaka.polyfill.installAll();

      this.loaded = {plyr, shaka};

      resolve(this.loaded);
    });

    return this.loading;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new VideoLibLoader());

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1yZWNvcmQuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFpQztBQUNnQztBQUNIOztBQUVJOztBQUUzQjs7QUFFeEIscUNBQXFDLDhEQUFLLENBQUMsMkNBQVU7QUFDcEUsTUFBTSxpRUFBWTs7QUFFbEI7QUFDQTtBQUNBLHVCQUF1QixjQUFjO0FBQ3JDLG1CQUFtQixjQUFjO0FBQ2pDLHFCQUFxQixlQUFlO0FBQ3BDLHlCQUF5QixlQUFlO0FBQ3hDLHlCQUF5QixjQUFjO0FBQ3ZDLHdCQUF3QixhQUFhO0FBQ3JDLDZCQUE2QixjQUFjO0FBQzNDLG9CQUFvQixlQUFlO0FBQ25DLDRCQUE0QjtBQUM1QjtBQUNBOztBQUVBO0FBQ0EsV0FBVyx3RUFBTTtBQUNqQjs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLHlFQUFXOztBQUU3Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0Y7O0FBRWhGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdGQUFnRjs7QUFFaEY7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQzNLZ0M7O0FBRXpCO0FBQ1Asd0JBQXdCLG9DQUFHO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBEQUEwRDtBQUMxRCw0Q0FBNEM7QUFDNUMsTUFBTTtBQUNOLDBEQUEwRDtBQUMxRCw0Q0FBNEM7QUFDNUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0RBQXdEO0FBQ3hELDBDQUEwQztBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDZCQUE2QixtQkFBbUI7QUFDaEQ7O0FBRUE7QUFDQSw2QkFBNkIsbUJBQW1CO0FBQ2hEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUVBQXVFLHNGQUErQjtBQUN0Rzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxdkIyQjs7QUFFdUM7QUFDSztBQUNFOztBQUV6Qjs7QUFFakM7QUFDZixTQUFTLHFDQUFJO0FBQ2I7QUFDQSxRQUFRLGlGQUFRLEVBQUUsRUFBRSxvRkFBVSxFQUFFLEVBQUUscUZBQVcsRUFBRTtBQUMvQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsZUFBZTtBQUN0Rix3REFBd0QsZUFBZSxHQUFHLHdCQUF3QixtQ0FBbUMsYUFBYSxnQkFBZ0I7QUFDbEs7QUFDQTtBQUNBLGNBQWMsV0FBVztBQUN6QixlQUFlLG1CQUFtQjtBQUNsQztBQUNBLG1GQUFtRixtQkFBbUI7QUFDdEc7QUFDQSwrQkFBK0Isc0RBQXNELFlBQVksMkJBQTJCO0FBQzVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5Q0FBeUMsMEJBQTBCO0FBQ25FLFVBQVU7QUFDVjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxnQkFBZ0IsWUFBWSxXQUFXOztBQUVsRjtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsVUFBVTtBQUN6RDtBQUNBO0FBQ0EsK0NBQStDLG1CQUFtQixVQUFVLGtCQUFrQjtBQUM5RjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BVaUM7O0FBRXVCOztBQUVNOztBQUU3QztBQUNLOztBQUVQLDZCQUE2Qiw4REFBSyxDQUFDLDJDQUFVO0FBQzVELEVBQUUsaUVBQVk7QUFDZDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsYUFBYTtBQUM3QixzQkFBc0IsY0FBYztBQUNwQyxlQUFlLGNBQWM7QUFDN0IsaUJBQWlCLGVBQWU7QUFDaEMsaUJBQWlCLGVBQWU7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsOEVBQVc7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0IscUJBQXFCO0FBQ3BEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLFNBQVMsc0RBQXNEOztBQUUvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHFCQUFxQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRO0FBQ1I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLHNEQUFzRDs7QUFFL0Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDO0FBQzdDOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7O0FBRUEsVUFBVSxzREFBc0Q7O0FBRWhFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0EsVUFBVSxxQkFBcUI7O0FBRS9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQyxNQUFNO0FBQ3RDLEtBQUs7O0FBRUwsVUFBVSxxQkFBcUI7O0FBRS9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLDhEQUFrQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL25CMkI7O0FBRWtDOztBQUU5QztBQUNmLFNBQVMscUNBQUk7QUFDYjtBQUNBLFFBQVEsK0RBQVksRUFBRTtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsb0JBQW9COztBQUUzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FB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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTREO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7O0FBRUEsbURBQW1EO0FBQ25EOztBQUVBO0FBQ0Esb0JBQW9CLGVBQWU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4Qyx1QkFBdUIsc0JBQXNC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OztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsV0FBVyxxQ0FBSTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUVBQWUsZ0JBQWdCOzs7Ozs7Ozs7Ozs7OztBQzVCL0IsZUFBZSxtQkFBTyxDQUFDLHlDQUFXOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUVBQWUsSUFBSTs7Ozs7Ozs7Ozs7Ozs7QUNoQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQixxTEFBbUQ7QUFDOUU7QUFDQSwwQkFBMEIsa05BQTJEO0FBQ3JGO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUI7O0FBRXJCO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsb0JBQW9CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL2NvbXBvbmVudHMvYm9va3JlYWRlci91Y2RsaWItYm9va3JlYWRlci1uYXZiYXIuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL2NvbXBvbmVudHMvYm9va3JlYWRlci91Y2RsaWItYm9va3JlYWRlci1uYXZiYXIudHBsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9jb21wb25lbnRzL2Jvb2tyZWFkZXIvdWNkbGliLWJvb2tyZWFkZXItcGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvY29tcG9uZW50cy9ib29rcmVhZGVyL3VjZGxpYi1ib29rcmVhZGVyLXBhZ2UudHBsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9jb21wb25lbnRzL2Jvb2tyZWFkZXIvdWNkbGliLWJvb2tyZWFkZXItc2xpZGVyLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9jb21wb25lbnRzL2Jvb2tyZWFkZXIvdWNkbGliLWJvb2tyZWFkZXItc2xpZGVyLnRwbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvY29tcG9uZW50cy9ib29rcmVhZGVyL3VjZGxpYi1ib29rcmVhZGVyLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9jb21wb25lbnRzL2Jvb2tyZWFkZXIvdWNkbGliLWJvb2tyZWFkZXIudHBsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9jb21wb25lbnRzL2NpdGF0aW9uLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9jb21wb25lbnRzL2NpdGF0aW9uLnRwbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvcmVjb3JkL2FwcC1mcy1tZWRpYS1kb3dubG9hZC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvcmVjb3JkL2FwcC1mcy1tZWRpYS1kb3dubG9hZC50cGwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3BhZ2VzL3JlY29yZC9hcHAtbWVkaWEtZG93bmxvYWQuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3BhZ2VzL3JlY29yZC9hcHAtbWVkaWEtZG93bmxvYWQudHBsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9wYWdlcy9yZWNvcmQvYXBwLXJlY29yZC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvcmVjb3JkL2FwcC1yZWNvcmQudHBsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9wYWdlcy9yZWNvcmQvdmlld2VyL2FwcC1hdWRpby12aWV3ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3BhZ2VzL3JlY29yZC92aWV3ZXIvYXBwLWF1ZGlvLXZpZXdlci50cGwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3BhZ2VzL3JlY29yZC92aWV3ZXIvYXBwLWZzLXZpZXdlci5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvcmVjb3JkL3ZpZXdlci9hcHAtZnMtdmlld2VyLnRwbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvcmVjb3JkL3ZpZXdlci9hcHAtaW1hZ2Utdmlld2VyLWxpZ2h0Ym94LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9wYWdlcy9yZWNvcmQvdmlld2VyL2FwcC1pbWFnZS12aWV3ZXItbGlnaHRib3gudHBsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9wYWdlcy9yZWNvcmQvdmlld2VyL2FwcC1pbWFnZS12aWV3ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3BhZ2VzL3JlY29yZC92aWV3ZXIvYXBwLWltYWdlLXZpZXdlci50cGwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3BhZ2VzL3JlY29yZC92aWV3ZXIvYXBwLW1lZGlhLXZpZXdlci1uYXYuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3BhZ2VzL3JlY29yZC92aWV3ZXIvYXBwLW1lZGlhLXZpZXdlci1uYXYudHBsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9wYWdlcy9yZWNvcmQvdmlld2VyL2FwcC1tZWRpYS12aWV3ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3BhZ2VzL3JlY29yZC92aWV3ZXIvYXBwLW1lZGlhLXZpZXdlci50cGwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3BhZ2VzL3JlY29yZC92aWV3ZXIvYXBwLXZpZGVvLXZpZXdlci5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvcmVjb3JkL3ZpZXdlci9hcHAtdmlkZW8tdmlld2VyLnRwbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvdXRpbHMvYXBwLXNoYXJlLWJ0bi5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvdXRpbHMvYXBwLXNoYXJlLWJ0bi50cGwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3V0aWxzL2FwcC10b2FzdC1wb3B1cC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvdXRpbHMvYXBwLXRvYXN0LXBvcHVwLnRwbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvdXRpbHMvYXBwLXZpcnR1YWwtc2Nyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3V0aWxzL2FwcC12aXJ0dWFsLXNjcm9sbGVyLnRwbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvdXRpbHMvc2hhcmVkLWh0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi91dGlscy91c2VyLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9saWIvdXRpbHMvdmlkZW8tbGliLWxvYWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXRFbGVtZW50IH0gZnJvbSAnbGl0JztcbmltcG9ydCB7cmVuZGVyLCBzdHlsZXN9IGZyb20gXCIuL3VjZGxpYi1ib29rcmVhZGVyLW5hdmJhci50cGwuanNcIjtcbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbmltcG9ydCAnQHVjZC1saWIvdGhlbWUtZWxlbWVudHMvdWNkbGliL3VjZGxpYi1pY29ucy91Y2RsaWItaWNvbnMnO1xuXG5pbXBvcnQgJy4vdWNkbGliLWJvb2tyZWFkZXItc2xpZGVyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVWNkbGliQm9va3JlYWRlck5hdmJhciBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpXG4ud2l0aChMaXRDb3JrVXRpbHMpIHtcblxuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNlbGVjdGVkUGFnZSA6IHsgdHlwZTogTnVtYmVyIH0sXG4gICAgICBudW1QYWdlcyA6IHsgdHlwZTogTnVtYmVyIH0sXG4gICAgICBmdWxsc2NyZWVuIDogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBzaW5nbGVQYWdlVmlldyA6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgc2VsZWN0ZWRSZXN1bHQgOiB7IHR5cGU6IE51bWJlciB9LFxuICAgICAgc2VhcmNoUmVzdWx0cyA6IHsgdHlwZTogQXJyYXkgfSxcbiAgICAgIHNlYXJjaFJlc3VsdHNDb3VudCA6IHsgdHlwZTogTnVtYmVyIH0sXG4gICAgICBzZWFyY2hpbmcgOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIHNlbGVjdGVkUGFnZUxhYmVsIDogeyB0eXBlOiBTdHJpbmcgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3R5bGVzKCkge1xuICAgIHJldHVybiBzdHlsZXMoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuX3Jlc2V0KCk7XG5cbiAgICB0aGlzLl9pbmplY3RNb2RlbCgnQm9va1JlYWRlck1vZGVsJyk7XG4gIH1cblxuICBfb25Cb29rcmVhZGVyU3RhdGVVcGRhdGUoZSkge1xuICAgIHRoaXMuc2VsZWN0ZWRQYWdlID0gZS5zZWxlY3RlZFBhZ2UgfHwgMDtcbiAgICB0aGlzLm51bVBhZ2VzID0gZS5ib29rVmlld0RhdGE/LnBhZ2VzPy5sZW5ndGggfHwgMDtcbiAgICB0aGlzLnNpbmdsZVBhZ2VWaWV3ID0gZS5zZWxlY3RlZFZpZXcgPT09ICdkb3VibGUnID8gZmFsc2UgOiB0cnVlO1xuICAgIHRoaXMuc2VsZWN0ZWRSZXN1bHQgPSAoZS5zZWxlY3RlZFNlYXJjaFJlc3VsdCB8fCAwKSArIDE7XG4gICAgdGhpcy5zZWFyY2hpbmcgPSBlLnNlYXJjaEFjdGl2ZTtcblxuICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IFtdO1xuICAgIGlmKCBlLnNlYXJjaFJlc3VsdHM/LnN0YXRlID09PSAnbG9hZGVkJyApIHtcbiAgICAgIGxldCBzZWFyY2hSZXN1bHRzID0gZS5zZWFyY2hSZXN1bHRzLnBheWxvYWQgfHwge307XG4gICAgICBsZXQgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yKCBsZXQgcGFnZSBpbiBzZWFyY2hSZXN1bHRzICkge1xuICAgICAgICByZXN1bHRzLnB1c2goLi4uc2VhcmNoUmVzdWx0c1twYWdlXSk7XG4gICAgICB9XG4gICAgICB0aGlzLnNlYXJjaFJlc3VsdHMgPSByZXN1bHRzLnNvcnQoKGEsYikgPT4gcGFyc2VJbnQoYS5wYWdlIHx8IDApIC0gcGFyc2VJbnQoYi5wYWdlIHx8IDApKTtcbiAgICB9XG4gICAgdGhpcy5zZWFyY2hSZXN1bHRzQ291bnQgPSB0aGlzLnNlYXJjaFJlc3VsdHMubGVuZ3RoO1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGxldCBzbGlkZXIgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcigndWNkbGliLWJvb2tyZWFkZXItc2xpZGVyJyk7XG4gICAgICBpZiggc2xpZGVyICkgc2xpZGVyLl9vblJlc2l6ZSgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fdXBkYXRlUGFnZUxhYmVscygpO1xuICB9XG5cbiAgX3Jlc2V0KCkge1xuICAgIHRoaXMuc2VsZWN0ZWRQYWdlID0gMDtcbiAgICB0aGlzLm51bVBhZ2VzID0gMDtcbiAgICB0aGlzLmZ1bGxzY3JlZW4gPSBmYWxzZTtcbiAgICB0aGlzLnNpbmdsZVBhZ2VWaWV3ID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RlZFJlc3VsdCA9IDA7XG4gICAgdGhpcy5zZWFyY2hSZXN1bHRzID0gW107XG4gICAgdGhpcy5zZWFyY2hSZXN1bHRzQ291bnQgPSAwO1xuICAgIHRoaXMuc2VhcmNoaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RlZFBhZ2VMYWJlbCA9ICcnO1xuICB9XG5cbiAgX3ByZXZQYWdlKGUpIHtcbiAgICBsZXQgcGFnZUluY3JlbWVudCA9IHRoaXMuc2luZ2xlUGFnZVZpZXcgPyAxIDogMjtcbiAgICBpZiggdGhpcy5zZWxlY3RlZFBhZ2UgPT09IDEgKSBwYWdlSW5jcmVtZW50ID0gMTtcbiAgICBpZiggcGFnZUluY3JlbWVudCA9PT0gMiAmJiB0aGlzLnNlbGVjdGVkUGFnZSAlIDIgPT09IDAgKSBwYWdlSW5jcmVtZW50ID0gMTsgLy8gaWYgdmlld2luZyBvZGQgcGFnZSAoMC1pbmRleCkgaW4gMnBhZ2UgbW9kZSwgc2hvdWxkIG9ubHkgbW92ZSBhIHNpbmdsZSBwYWdlIGJhY2tcblxuICAgIGlmKCB0aGlzLnNlbGVjdGVkUGFnZSA+IDAgKSB7XG4gICAgICB0aGlzLkJvb2tSZWFkZXJNb2RlbC5zZXRQYWdlKHRoaXMuc2VsZWN0ZWRQYWdlIC0gcGFnZUluY3JlbWVudCk7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlUGFnZUxhYmVscygpO1xuICB9XG5cbiAgX25leHRQYWdlKGUpIHtcbiAgICBsZXQgcGFnZUluY3JlbWVudCA9IHRoaXMuc2luZ2xlUGFnZVZpZXcgPyAxIDogMjtcbiAgICBpZiggdGhpcy5zZWxlY3RlZFBhZ2UgPT09IDAgKSBwYWdlSW5jcmVtZW50ID0gMTtcbiAgICBpZiggcGFnZUluY3JlbWVudCA9PT0gMiAmJiB0aGlzLnNlbGVjdGVkUGFnZSAlIDIgPT09IDAgKSBwYWdlSW5jcmVtZW50ID0gMTsgLy8gaWYgdmlld2luZyBvZGQgcGFnZSAoMC1pbmRleCkgaW4gMnBhZ2UgbW9kZSwgc2hvdWxkIG9ubHkgbW92ZSBhIHNpbmdsZSBwYWdlIGZvcndhcmRcblxuICAgIGlmKCAodGhpcy5zZWxlY3RlZFBhZ2UrcGFnZUluY3JlbWVudCkgPCB0aGlzLm51bVBhZ2VzICkge1xuICAgICAgdGhpcy5Cb29rUmVhZGVyTW9kZWwuc2V0UGFnZSh0aGlzLnNlbGVjdGVkUGFnZSArIHBhZ2VJbmNyZW1lbnQpO1xuICAgIH0gZWxzZSBpZiggIXRoaXMuc2luZ2xlUGFnZVZpZXcgJiYgdGhpcy5zZWxlY3RlZFBhZ2UrMiA9PT0gdGhpcy5udW1QYWdlcyApIHtcbiAgICAgIC8vIHVwZGF0ZSB0byBsYXN0IHBhZ2UgaWYgaW4gZG91YmxlIHBhZ2UgdmlldyBhbmQgb24gbGFzdCBwYWdlXG4gICAgICB0aGlzLkJvb2tSZWFkZXJNb2RlbC5zZXRQYWdlKHRoaXMuc2VsZWN0ZWRQYWdlICsgMSk7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlUGFnZUxhYmVscygpO1xuICB9XG5cbiAgX3VwZGF0ZVBhZ2VMYWJlbHMoKSB7ICAgIFxuICAgIC8vIHVwZGF0ZSBzZWxlY3RlZCBwYWdlIGxhYmVsLCB0aGUgcGFnZSBudW1iZXIgaWYgc2luZ2xlIHBhZ2UsIG90aGVyd2lzZSBpbmNsdWRlIHRoZSBwYWdlIHJhbmdlIGlmIGRvdWJsZSBwYWdlXG4gICAgLy8gaWYgZmlyc3QvbGFzdCBwYWdlLCBzaW5jZSB3ZSBkb24ndCB3YW50IHRvIHNob3cgYSByYW5nZSBpZiB3ZSdyZSBvbiB0aGUgZmlyc3RcbiAgICBpZiggdGhpcy5zaW5nbGVQYWdlVmlldyB8fCB0aGlzLnNlbGVjdGVkUGFnZSA9PT0gMCApIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRQYWdlTGFiZWwgPSB0aGlzLnNlbGVjdGVkUGFnZSsxO1xuICAgIH0gZWxzZSBpZiggdGhpcy5zZWxlY3RlZFBhZ2UgPT09ICh0aGlzLm51bVBhZ2VzLTEpICYmIHRoaXMubnVtUGFnZXMgJSAyID09PSAxICkgeyBcbiAgICAgIC8vIHZlcnkgbGFzdCBwYWdlIChmb3Igb2RkIG51bWJlciBwYWdlcylcbiAgICAgIHRoaXMuc2VsZWN0ZWRQYWdlTGFiZWwgPSB0aGlzLnNlbGVjdGVkUGFnZSArICctJyArICh0aGlzLnNlbGVjdGVkUGFnZSsxKTtcbiAgICB9IGVsc2UgaWYoIHRoaXMuc2VsZWN0ZWRQYWdlID09PSAodGhpcy5udW1QYWdlcy0xKSAmJiB0aGlzLm51bVBhZ2VzICUgMiAhPT0gMSApIHsgXG4gICAgICAvLyB2ZXJ5IGxhc3QgcGFnZSAoZm9yIGV2ZW4gbnVtYmVyIHBhZ2VzKVxuICAgICAgdGhpcy5zZWxlY3RlZFBhZ2VMYWJlbCA9IHRoaXMuc2VsZWN0ZWRQYWdlKzE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRQYWdlTGFiZWwgPSB0aGlzLnNlbGVjdGVkUGFnZSsxICsgJy0nICsgKHRoaXMuc2VsZWN0ZWRQYWdlKzIpO1xuICAgIH1cblxuICAgIC8vIGFsc28gc2V0IGN1c3RvbSBwcm9wZXJ0eSB0byBoZWxwIHdpdGggc3R5bGluZyBzbyBuYXYgZG9lc24ndCBqdW1wIGFyb3VuZFxuICAgIGxldCBwYWdlTGFiZWxEaXYgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLmJyLWN1cnJlbnRwYWdlLW92ZXJyaWRlJyk7XG4gICAgaWYoIHBhZ2VMYWJlbERpdiApIHBhZ2VMYWJlbERpdi5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1udW0tcGFnZXMtbGVuZ3RoJywgdGhpcy5udW1QYWdlcy50b1N0cmluZygpLmxlbmd0aCk7XG4gIH1cblxuICBfcHJldlNlYXJjaFJlc3VsdChlKSB7XG4gICAgaWYoIHRoaXMuc2VsZWN0ZWRSZXN1bHQgPiAxICkge1xuICAgICAgdGhpcy5Cb29rUmVhZGVyTW9kZWwuc2V0UGFnZSgodGhpcy5zZWFyY2hSZXN1bHRzW3RoaXMuc2VsZWN0ZWRSZXN1bHQgLSAyXT8ucGFnZSB8fCAxKSAtIDEpXG4gICAgICB0aGlzLkJvb2tSZWFkZXJNb2RlbC5zZXRTZWxlY3RlZFNlYXJjaFJlc3VsdCh0aGlzLnNlbGVjdGVkUmVzdWx0IC0gMik7XG4gICAgfVxuICB9XG5cbiAgX25leHRTZWFyY2hSZXN1bHQoZSkge1xuICAgIGlmKCB0aGlzLnNlbGVjdGVkUmVzdWx0IDwgdGhpcy5zZWFyY2hSZXN1bHRzQ291bnQgKSB7XG4gICAgICB0aGlzLkJvb2tSZWFkZXJNb2RlbC5zZXRQYWdlKCh0aGlzLnNlYXJjaFJlc3VsdHNbdGhpcy5zZWxlY3RlZFJlc3VsdF0/LnBhZ2UgfHwgMSkgLSAxKVxuICAgICAgdGhpcy5Cb29rUmVhZGVyTW9kZWwuc2V0U2VsZWN0ZWRTZWFyY2hSZXN1bHQodGhpcy5zZWxlY3RlZFJlc3VsdCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU2VhcmNoUmVzdWx0cyhzZWFyY2hSZXN1bHRzPVtdKSB7XG4gICAgbGV0IHNsaWRlciA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCd1Y2RsaWItYm9va3JlYWRlci1zbGlkZXInKTtcbiAgICBpZiggc2xpZGVyICkge1xuICAgICAgc2xpZGVyLnVwZGF0ZVNlYXJjaFJlc3VsdHMoc2VhcmNoUmVzdWx0cyk7XG4gICAgfVxuICB9XG5cbiAgX29uU2VhcmNoQ2xpY2tlZChlKSB7XG4gICAgbGV0IHNlYXJjaGluZyA9IHRoaXMuQm9va1JlYWRlck1vZGVsLnN0b3JlPy5kYXRhPy5zdGF0ZT8uc2VhcmNoQWN0aXZlIHx8IGZhbHNlO1xuICAgIHRoaXMuQm9va1JlYWRlck1vZGVsLnNldFNlYXJjaEFjdGl2ZSghc2VhcmNoaW5nKTtcbiAgICB0aGlzLnNlYXJjaGluZyA9ICF0aGlzLnNlYXJjaGluZztcbiAgfVxuICBcblxuICBfb25Ub2dnbGVCb29rVmlldyhlKSB7ICAgIFxuICAgIHRoaXMuQm9va1JlYWRlck1vZGVsLnNldFZpZXcodGhpcy5zaW5nbGVQYWdlVmlldyA/ICdkb3VibGUnIDogJ3NpbmdsZScpO1xuICAgIHRoaXMuc2luZ2xlUGFnZVZpZXcgPSAhdGhpcy5zaW5nbGVQYWdlVmlldztcbiAgfVxuXG4gIF9vblpvb21JbkNsaWNrZWQoZSkge1xuICAgIHRoaXMuQm9va1JlYWRlck1vZGVsLnpvb21JbigpO1xuICB9XG5cbiAgX29uWm9vbU91dENsaWNrZWQoZSkge1xuICAgIHRoaXMuQm9va1JlYWRlck1vZGVsLnpvb21PdXQoKTtcbiAgfVxuXG4gIF9vbkNsb3NlQ2xpY2tlZChlKSB7XG4gICAgdGhpcy5Cb29rUmVhZGVyTW9kZWwuc2V0RnVsbHNjcmVlbihmYWxzZSk7XG4gICAgdGhpcy5mdWxsc2NyZWVuID0gZmFsc2U7XG4gIH1cbiAgXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgndWNkbGliLWJvb2tyZWFkZXItbmF2YmFyJywgVWNkbGliQm9va3JlYWRlck5hdmJhcik7IiwiaW1wb3J0IHsgaHRtbCwgY3NzIH0gZnJvbSAnbGl0JztcblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlcygpIHtcbiAgY29uc3QgZWxlbWVudFN0eWxlcyA9IGNzc2BcbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG5cbiAgICBbaGlkZGVuXSB7XG4gICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgLmJyLW5hdi1iYXIsXG4gICAgLmNvbnRyb2xzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cblxuICAgIC5ici1uYXYtYmFyLmZ1bGxzY3JlZW4ge1xuICAgICAgcGFkZGluZzogMCAxLjUlO1xuICAgIH1cblxuICAgIHVjZGxpYi1pY29uIHtcbiAgICAgIGhlaWdodDogMzVweDtcbiAgICAgIHdpZHRoOiAzMHB4O1xuICAgICAgbWF4LWhlaWdodDogMzVweDtcbiAgICAgIG1heC13aWR0aDogMzBweDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG5cbiAgICB1Y2RsaWItYm9va3JlYWRlci1zbGlkZXIge1xuICAgICAgaGVpZ2h0OiA2MHB4O1xuICAgICAgZmxleDogMTtcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDEuNXJlbTtcbiAgICAgIHBhZGRpbmctbGVmdDogMTBweDtcbiAgICB9XG5cbiAgICAuYnItY3VycmVudHBhZ2Utb3ZlcnJpZGUge1xuICAgICAgY29sb3I6ICMwMjI4NTE7XG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgbWluLXdpZHRoOiBjYWxjKHZhcigtLW51bS1wYWdlcy1sZW5ndGgsIDApICogM2NoICsgM2NoKTtcbiAgICB9XG5cbiAgICAjYnV0dG9uV3JhcHBlciBkaXYge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS04MCk7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICB3aWR0aDogNTBweDtcbiAgICAgIGhlaWdodDogNTBweDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAwLjRyZW07XG4gICAgfVxuXG4gICAgI2J1dHRvbldyYXBwZXIgdWNkbGliLWljb24ge1xuICAgICAgZmlsbDogd2hpdGU7XG4gICAgICB3aWR0aDogMjVweDtcbiAgICAgIG1hcmdpbjogN3B4IGF1dG87XG4gICAgfVxuXG4gICAgLmJyLXNlYXJjaCB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBib3R0b206IDc1cHg7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS0zMCk7XG4gICAgICBoZWlnaHQ6IDc1cHg7XG4gICAgICBwYWRkaW5nLXJpZ2h0OiAwLjlyZW07XG4gICAgfVxuXG4gICAgLmJyLXNlYXJjaCBkaXYge1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgdmVydGljYWwtYWxpZ246IHN1YjtcbiAgICB9XG5cbiAgICAuYnItc2VhcmNoIGRpdi56b29tIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApO1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICBtYXJnaW4tbGVmdDogMjVweDtcbiAgICAgIG1hcmdpbi10b3A6IDEyLjVweDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9IFxuXG4gICAgLmJyLXNlYXJjaCBkaXYuem9vbS5zZWFyY2hpbmcsXG4gICAgLmJyLXNlYXJjaCBkaXYuem9vbS5zZWFyY2hpbmc6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtZ29sZCk7XG4gICAgfVxuXG4gICAgLmJyLXNlYXJjaCBkaXYuem9vbS5zZWFyY2hpbmcgdWNkbGliLWljb24ge1xuICAgICAgZmlsbDogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gICAgfVxuXG4gICAgLmJyLXNlYXJjaCBkaXYuem9vbTpob3ZlcixcbiAgICAjYnV0dG9uV3JhcHBlciBkaXY6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gICAgfVxuXG4gICAgLmJyLXNlYXJjaCB1Y2RsaWItaWNvbiB7XG4gICAgICBoZWlnaHQ6IDI1cHg7XG4gICAgICBtYXJnaW46IDExcHggYXV0bztcbiAgICAgIGZpbGw6IHdoaXRlO1xuICAgIH1cblxuICAgIC5ici1zZWFyY2ggI3NlYXJjaC1wcmV2IHVjZGxpYi1pY29uLFxuICAgIC5ici1zZWFyY2ggI3NlYXJjaC1uZXh0IHVjZGxpYi1pY29uIHsgXG4gICAgICB3aWR0aDogNTBweDtcbiAgICAgIGhlaWdodDogNTBweDtcbiAgICAgIGZpbGw6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUpO1xuICAgIH1cblxuICAgIC5ici1zZWFyY2g6OmFmdGVyIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHJpZ2h0OiAtMXJlbTtcbiAgICAgIHRvcDogMDtcbiAgICAgIHdpZHRoOiAxLjhyZW07XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTMwKTtcbiAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICB0cmFuc2Zvcm06IHNrZXdYKDE5NmRlZyk7XG4gICAgfVxuXG4gICAgI2J1dHRvbldyYXBwZXIge1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsgXG4gICAgICBwYWRkaW5nLWxlZnQ6IDJyZW07XG4gICAgfVxuXG4gICAgI2J1dHRvbldyYXBwZXIgLnNpbmdsZS1wYWdlLWJvb2sge1xuICAgICAgd2lkdGg6IDI1cHg7XG4gICAgICBoZWlnaHQ6IDI1cHg7XG4gICAgICBtYXJnaW4tdG9wOiAxMXB4O1xuICAgIH1cblxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAgICAgI2J1dHRvbldyYXBwZXIgLnpvb20taWNvbnMge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgfVxuICAgICAgdWNkbGliLWJvb2tyZWFkZXItc2xpZGVyIHtcbiAgICAgICAgcGFkZGluZy1yaWdodDogLjVyZW07XG4gICAgICB9XG4gICAgICAjYnV0dG9uV3JhcHBlciB7XG4gICAgICAgIHBhZGRpbmctbGVmdDogLjVyZW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLnRvb2x0aXAge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cblxuICAgIC50b29sdGlwOmhvdmVyOmJlZm9yZSB7XG4gICAgICBjb250ZW50OiBhdHRyKGRhdGEtdG9vbHRpcC10ZXh0KTtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGJvdHRvbTogNjBweDtcbiAgICAgIHJpZ2h0OiA1MCU7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNTAlKTtcbiAgICAgIHBhZGRpbmc6IDVweCAxMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gICAgICBjb2xvcjogI2ZmZjtcbiAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB0cmFuc2l0aW9uOiAuMnMgb3BhY2l0eSBlYXNlLW91dDtcbiAgICAgIHotaW5kZXg6IDEwO1xuICAgIH1cblxuICAgIC50b29sdGlwLnJpZ2h0LWFsaWduOmhvdmVyOmJlZm9yZSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoODAlKTtcbiAgICB9XG5cbiAgICAudG9vbHRpcC5sZWZ0LWFsaWduOmhvdmVyOmJlZm9yZSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjAlKTtcbiAgICB9XG5cbiAgICAudG9vbHRpcDpob3ZlcjphZnRlciB7XG4gICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgYm90dG9tOiA1MHB4O1xuICAgICAgcmlnaHQ6IDIwcHg7XG4gICAgICBib3JkZXI6IDVweCBzb2xpZCB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlKTtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSkgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgdHJhbnNpdGlvbjogLjJzIG9wYWNpdHkgZWFzZS1vdXQ7XG4gICAgfVxuXG4gICAgLnRvb2x0aXA6aG92ZXI6YmVmb3JlLFxuICAgIC50b29sdGlwOmhvdmVyOmFmdGVyIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgfVxuXG4gIGA7XG5cbiAgcmV0dXJuIFtlbGVtZW50U3R5bGVzXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcigpIHsgXG5yZXR1cm4gaHRtbGBcbiAgXG5cbiAgPGRpdiBjbGFzcz1cImJyLW5hdi1iYXIke3RoaXMuZnVsbHNjcmVlbiA/ICcgZnVsbHNjcmVlbicgOiAnJ31cIj5cbiAgICA8dWNkbGliLWJvb2tyZWFkZXItc2xpZGVyPjwvdWNkbGliLWJvb2tyZWFkZXItc2xpZGVyPlxuICAgIDxkaXYgY2xhc3M9XCJjb250cm9sc1wiPiAgXG4gICAgICA8ZGl2IGlkPVwicHJldlwiIEBjbGljaz1cIiR7dGhpcy5fcHJldlBhZ2V9XCI+XG4gICAgICAgIDx1Y2RsaWItaWNvbiBpY29uPVwidWNkbGliLWRhbXM6ZmEtY2FyZXQtbGVmdFwiPjwvdWNkbGliLWljb24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPHNwYW4gY2xhc3M9XCJici1jdXJyZW50cGFnZS1vdmVycmlkZVwiPiR7dGhpcy5zZWxlY3RlZFBhZ2VMYWJlbH0gb2YgJHt0aGlzLm51bVBhZ2VzfTwvc3Bhbj5cblxuICAgICAgPGRpdiBpZD1cIm5leHRcIiBzdHlsZT1cIndpZHRoOiAyNXB4O1wiIEBjbGljaz1cIiR7dGhpcy5fbmV4dFBhZ2V9XCI+XG4gICAgICAgIDx1Y2RsaWItaWNvbiBpY29uPVwidWNkbGliLWRhbXM6ZmEtY2FyZXQtcmlnaHRcIj48L3VjZGxpYi1pY29uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGlkPVwiYnV0dG9uV3JhcHBlclwiXG4gICAgICA/aGlkZGVuPVwiJHshdGhpcy5mdWxsc2NyZWVufVwiPlxuICAgICAgPGRpdiBAY2xpY2s9XCIke3RoaXMuX29uVG9nZ2xlQm9va1ZpZXd9XCIgXG4gICAgICAgIGNsYXNzPVwicGFnZS10b2dnbGUgdG9vbHRpcFwiXG4gICAgICAgIGRhdGEtdG9vbHRpcC10ZXh0PVwiJHt0aGlzLnNpbmdsZVBhZ2VWaWV3ID8gJ1R3by1QYWdlIFZpZXcnIDogJ1NpbmdsZS1QYWdlIFZpZXcnfVwiPlxuICAgICAgICA8dWNkbGliLWljb25cbiAgICAgICAgICBpY29uPVwidWNkbGliLWRhbXM6ZmEtYm9vay1vcGVuXCJcbiAgICAgICAgICA/aGlkZGVuPVwiJHshdGhpcy5zaW5nbGVQYWdlVmlld31cIlxuICAgICAgICA+PC91Y2RsaWItaWNvbj5cbiAgICAgICAgPHVjZGxpYi1pY29uXG4gICAgICAgICAgaWNvbj1cInVjZGxpYi1kYW1zOnBhZ2Utc2luZ2xlXCJcbiAgICAgICAgICA/aGlkZGVuPVwiJHt0aGlzLnNpbmdsZVBhZ2VWaWV3fVwiXG4gICAgICAgICAgY2xhc3M9XCJzaW5nbGUtcGFnZS1ib29rXCJcbiAgICAgICAgPjwvdWNkbGliLWljb24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cInpvb20taWNvbnMgdG9vbHRpcFwiIGRhdGEtdG9vbHRpcC10ZXh0PVwiWm9vbSBPdXRcIiBAY2xpY2s9XCIke3RoaXMuX29uWm9vbU91dENsaWNrZWR9XCI+XG4gICAgICAgIDx1Y2RsaWItaWNvbiBpY29uPVwidWNkbGliLWRhbXM6ZmEtbWludXNcIj48L3VjZGxpYi1pY29uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiem9vbS1pY29ucyB0b29sdGlwXCIgZGF0YS10b29sdGlwLXRleHQ9XCJab29tIEluXCIgQGNsaWNrPVwiJHt0aGlzLl9vblpvb21JbkNsaWNrZWR9XCI+XG4gICAgICAgIDx1Y2RsaWItaWNvbiBpY29uPVwidWNkbGliLWRhbXM6ZmEtcGx1c1wiPjwvdWNkbGliLWljb24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgQGNsaWNrPVwiJHt0aGlzLl9vbkNsb3NlQ2xpY2tlZH1cIiBjbGFzcz1cInRvb2x0aXAgbGVmdC1hbGlnblwiIGRhdGEtdG9vbHRpcC10ZXh0PVwiRXhpdCBGdWxsc2NyZWVuXCI+XG4gICAgICAgIDx1Y2RsaWItaWNvbiBpY29uPVwidWNkbGliLWRhbXM6ZmEtZG93bi1sZWZ0LWFuZC11cC1yaWdodC10by1jZW50ZXJcIj48L3VjZGxpYi1pY29uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImJyLXNlYXJjaFwiID9oaWRkZW49XCIkeyF0aGlzLmZ1bGxzY3JlZW59XCI+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJ0b29sdGlwIHpvb20ke3RoaXMuc2VhcmNoaW5nID8gXCIgc2VhcmNoaW5nXCIgOiBcIlwifSByaWdodC1hbGlnblwiXG4gICAgICBAY2xpY2s9XCIke3RoaXMuX29uU2VhcmNoQ2xpY2tlZH1cIlxuICAgICAgZGF0YS10b29sdGlwLXRleHQ9XCIke3RoaXMuc2VhcmNoaW5nID8gXCJIaWRlIFNlYXJjaCBCb3hcIiA6IFwiU2VhcmNoIEluc2lkZVwifVwiPlxuICAgICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS1tYWduaWZ5aW5nLWdsYXNzXCIgY2xhc3M9XCJmdWxsc2NyZWVuLXNlYXJjaFwiPjwvdWNkbGliLWljb24+XG4gICAgPC9kaXY+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJzZWFyY2gtcGFnaW5hdGlvblwiXG4gICAgICA/aGlkZGVuPVwiJHt0aGlzLnNlYXJjaFJlc3VsdHNDb3VudCA9PT0gMH1cIj5cbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJzZWFyY2gtcHJldlwiXG4gICAgICAgIHN0eWxlPVwicGFkZGluZy1sZWZ0OiAuNXJlbTsgd2lkdGg6IDQwcHg7XCJcbiAgICAgICAgQGNsaWNrPVwiJHt0aGlzLl9wcmV2U2VhcmNoUmVzdWx0fVwiPlxuICAgICAgICA8dWNkbGliLWljb24gaWNvbj1cInVjZGxpYi1kYW1zOmZhLWNhcmV0LWxlZnRcIj48L3VjZGxpYi1pY29uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzPVwic2VhcmNoLXJlc3VsdHNcIlxuICAgICAgICBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICBib3R0b206IDFyZW07XG4gICAgICAgICAgZm9udC1zaXplOiAuOXJlbTtcbiAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcIj5cbiAgICAgICAgJHt0aGlzLnNlbGVjdGVkUmVzdWx0fSAvICR7dGhpcy5zZWFyY2hSZXN1bHRzQ291bnR9XG4gICAgICA8L3NwYW4+XG5cbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJzZWFyY2gtbmV4dFwiXG4gICAgICAgIHN0eWxlPVwicGFkZGluZy1yaWdodDogLjVyZW07IHdpZHRoOiA0MHB4O1wiXG4gICAgICAgIEBjbGljaz1cIiR7dGhpcy5fbmV4dFNlYXJjaFJlc3VsdH1cIj5cbiAgICAgICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS1jYXJldC1yaWdodFwiPjwvdWNkbGliLWljb24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbmA7fSIsImltcG9ydCB7IExpdEVsZW1lbnQgfSBmcm9tICdsaXQnO1xuaW1wb3J0IHtyZW5kZXIsIHN0eWxlc30gZnJvbSBcIi4vdWNkbGliLWJvb2tyZWFkZXItcGFnZS50cGwuanNcIjtcbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVWNkbGliQm9va3JlYWRlclBhZ2UgZXh0ZW5kcyBNaXhpbihMaXRFbGVtZW50KVxuICAud2l0aChMaXRDb3JrVXRpbHMpIHtcblxuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRlYnVnIDogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBwYWdlIDogeyB0eXBlOiBOdW1iZXJ9LFxuICAgICAgYnVmZmVyIDogeyB0eXBlOiBOdW1iZXIgfSxcbiAgICAgIGJvb2tEYXRhIDogeyB0eXBlOiBPYmplY3QgfSxcbiAgICAgIHBhZ2VEYXRhIDogeyB0eXBlOiBPYmplY3QgfSxcbiAgICAgIG9jckRhdGEgOiB7IHR5cGU6IEFycmF5fSxcbiAgICAgIGxvYWRpbmcgOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIGNsaWNrTmF2RW5hYmxlZCA6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgYW5pbWF0aW5nIDogeyB0eXBlOiBCb29sZWFuIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0eWxlcygpIHtcbiAgICByZXR1cm4gc3R5bGVzKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucGFnZSA9IC0xO1xuICAgIHRoaXMuZGVidWcgPSBmYWxzZTtcbiAgICB0aGlzLnBhZ2VEYXRhID0ge307XG4gICAgdGhpcy5idWZmZXIgPSAwO1xuICAgIHRoaXMub2NyRGF0YSA9IFtdO1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMud29yZFByb2Nlc3NHcm91cFNpemUgPSAyNTtcbiAgICB0aGlzLmNsaWNrTmF2RW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2luamVjdE1vZGVsKCdCb29rUmVhZGVyTW9kZWwnKTtcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5fb25DbGljayA9IHRoaXMuX29uQ2xpY2suYmluZCh0aGlzKTtcbiAgfVxuXG4gIGZpcnN0VXBkYXRlZCgpIHtcbiAgICB0aGlzLmltZ0VsZSA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcbiAgICB0aGlzLl91cGRhdGVQYWdlRGF0YSgpO1xuICAgIHRoaXMuX29uQm9va3JlYWRlclN0YXRlVXBkYXRlKHRoaXMuQm9va1JlYWRlck1vZGVsLmdldFN0YXRlKCkpO1xuICB9XG5cbiAgdXBkYXRlZChwcm9wcykge1xuICAgIGlmKCBwcm9wcy5oYXMoJ2N1cnJlbnRQYWdlJykgfHwgcHJvcHMuaGFzKCdib29rRGF0YScpICkge1xuICAgICAgdGhpcy5fdXBkYXRlUGFnZURhdGEoKTtcbiAgICB9XG5cbiAgICBpZiggcHJvcHMuaGFzKCdkZWJ1ZycpICkge1xuICAgICAgdGhpcy5fZGVidWdVcGRhdGVkKCk7XG4gICAgfVxuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljayk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsaWNrKTtcbiAgfVxuXG4gIF9vbkNsaWNrKCkge1xuICAgIGlmKCAhdGhpcy5jbGlja05hdkVuYWJsZWQgKSByZXR1cm47IFxuXG4gICAgLy8gdGhpcyBtYWtlcyBzZWxlY3RpbmcgdGV4dCBkaWZmaWN1bHRcbiAgICBpZiggdGhpcy52aWV3ID09PSAnZG91YmxlJyApIHtcbiAgICAgIGlmKCB0aGlzLnBhZ2UgJSAyID09PSAwICkge1xuICAgICAgICB0aGlzLkJvb2tSZWFkZXJNb2RlbC5zZXRQYWdlKHRoaXMucGFnZSsxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuQm9va1JlYWRlck1vZGVsLnNldFBhZ2UodGhpcy5wYWdlLTEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9vbkJvb2tyZWFkZXJTdGF0ZVVwZGF0ZShlKSB7XG4gICAgaWYoIHRoaXMudmlldyAhPT0gZS5zZWxlY3RlZFZpZXcgKSB7XG4gICAgICB0aGlzLnZpZXcgPSBlLnNlbGVjdGVkVmlldztcbiAgICB9XG5cbiAgICAvLyBkb24ndCByZW5kZXIgd29yZHMgaWYgd2UgYXJlIGFuaW1hdGluZ1xuICAgIHRoaXMuYW5pbWF0aW5nID0gZS5hbmltYXRpbmc7XG4gICAgaWYoIHRoaXMuYW5pbWF0aW5nICkge1xuICAgICAgdGhpcy5fcGF1c2VPbkFuaW1hdGlvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiggdGhpcy5wYXVzZUFuaW1hdGlvblJlc29sdmUgKSB7XG4gICAgICAgIHRoaXMucGF1c2VBbmltYXRpb25SZXNvbHZlKCk7XG4gICAgICAgIHRoaXMucGF1c2VBbmltYXRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLnBhdXNlQW5pbWF0aW9uUmVzb2x2ZSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoIGUuc2VhcmNoUmVzdWx0cz8uc3RhdGUgPT09ICdsb2FkZWQnICYmIFxuICAgICAgICBlLnNlYXJjaFJlc3VsdHM/Lml0ZW1JZCA9PT0gdGhpcy5ib29rRGF0YT8uaWQgKSB7XG4gICAgICB0aGlzLl9yZW5kZXJPY3JEYXRhKCk7XG4gICAgfVxuICB9XG5cbiAgX3NldExvYWRpbmcoc3JjKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBpbWcuc3JjID0gc3JjO1xuICB9XG5cbiAgX2RlYnVnVXBkYXRlZCgpIHtcbiAgICBpZiggdGhpcy5kZWJ1ZyApIHtcbiAgICAgIHRoaXMuc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCByZWQnO1xuICAgICAgdGhpcy5zdHlsZS5jb2xvciA9ICdyZWQnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0eWxlLmJvcmRlciA9ICdub25lJztcbiAgICAgIHRoaXMuc3R5bGUuY29sb3IgPSAnYXV0byc7XG4gICAgfVxuICB9XG5cbiAgX3VwZGF0ZVBhZ2VEYXRhKCkge1xuICAgIGlmKCAhdGhpcy5ib29rRGF0YSB8fCAhdGhpcy5ib29rRGF0YS5wYWdlcyApIHJldHVybjtcbiAgICBpZiggIXRoaXMuaW1nRWxlICkgcmV0dXJuO1xuICAgIGlmKCB0aGlzLnBhZ2UgPT0gLTEgKSByZXR1cm47XG5cbiAgICBpZiggdGhpcy5wYWdlIDwgMCB8fCB0aGlzLnBhZ2UgPj0gdGhpcy5ib29rRGF0YS5wYWdlcy5sZW5ndGggKSB7XG4gICAgICB0aGlzLnBhZ2VEYXRhID0ge307XG4gICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgdGhpcy5wYWdlRGF0YSA9IHRoaXMuYm9va0RhdGEucGFnZXNbdGhpcy5wYWdlXTtcblxuICAgIHRoaXMuc3R5bGUudG9wID0gdGhpcy5wYWdlRGF0YS5yZW5kZXJPZmZzZXRUb3ArJ3B4JztcbiAgICB0aGlzLnN0eWxlLmxlZnQgPSB0aGlzLnBhZ2VEYXRhLnJlbmRlck9mZnNldExlZnQrJ3B4JztcbiAgICB0aGlzLnN0eWxlLndpZHRoID0gdGhpcy5wYWdlRGF0YS5yZW5kZXJXaWR0aCsncHgnO1xuICAgIHRoaXMuc3R5bGUuaGVpZ2h0ID0gdGhpcy5wYWdlRGF0YS5yZW5kZXJIZWlnaHQrJ3B4JztcblxuICAgIHRoaXMuaW1nRWxlLnN0eWxlLndpZHRoID0gdGhpcy5wYWdlRGF0YS5yZW5kZXJXaWR0aCsncHgnO1xuICAgIHRoaXMuaW1nRWxlLnN0eWxlLmhlaWdodCA9IHRoaXMucGFnZURhdGEucmVuZGVySGVpZ2h0KydweCc7XG5cbiAgICBpZiggdGhpcy5sYXN0SW1nVXJsICE9PSB0aGlzLnBhZ2VEYXRhLmltYWdlVXJsICkge1xuICAgICAgdGhpcy5fc2V0TG9hZGluZyh0aGlzLnBhZ2VEYXRhLmltYWdlVXJsKTtcbiAgICAgIHRoaXMubGFzdEltZ1VybCA9IHRoaXMucGFnZURhdGEuaW1hZ2VVcmw7XG4gICAgfVxuXG4gICAgdGhpcy5Cb29rUmVhZGVyTW9kZWwuZ2V0T2NyRGF0YSh0aGlzLnBhZ2VEYXRhLCB0aGlzLmJvb2tEYXRhLmlkKVxuICAgICAgLnRoZW4oZGF0YSA9PiB0aGlzLl9yZW5kZXJPY3JEYXRhKGRhdGEpKTtcblxuICAgIHRoaXMucmVxdWVzdFVwZGF0ZSgpO1xuICB9XG5cbiAgYXN5bmMgX3JlbmRlck9jckRhdGEoZGF0YSkge1xuICAgIC8vIFRPRE86IHRoaXMgbWlnaHQgbmVlZCB0byBiZSBhc3luYyByZW5kZXJpbmdcbiAgICBpZiggIWRhdGEgJiYgdGhpcy5yZW5kZXJlZE9jckRhdGEgKSB7XG4gICAgICBkYXRhID0gdGhpcy5yZW5kZXJlZE9jckRhdGE7XG4gICAgfVxuICAgIGlmKCAhZGF0YSApIHJldHVybjtcblxuICAgIGxldCBzZWFyY2ggPSB0aGlzLkJvb2tSZWFkZXJNb2RlbC5nZXRTZWFyY2hSZXN1bHRzKHRoaXMuYm9va0RhdGEuaWQsIHRoaXMucGFnZSk7XG5cbiAgICBsZXQgcGFnZUNoYW5nZWQgPSBmYWxzZTtcbiAgICBpZiggdGhpcy5yZW5kZXJlZE9jclRvICkge1xuICAgICAgZm9yKCBsZXQga2V5IGluIHRoaXMucmVuZGVyZWRPY3JUbyApIHtcbiAgICAgICAgaWYoIHRoaXMucmVuZGVyZWRPY3JUb1trZXldICE9PSB0aGlzLnBhZ2VEYXRhW2tleV0gKSB7XG4gICAgICAgICAgcGFnZUNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmKCBzZWFyY2gudGV4dCAhPT0gdGhpcy5yZW5kZXJlZFNlYXJjaFRleHQgKSB7XG4gICAgICBwYWdlQ2hhbmdlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gbWFrZSBzdXJlIHRoZXNlIGhhdmVuJ3QgY2hhbmdlZCBhZnRlciByZW5kZXIgXG4gICAgbGV0IGN1cnJlbnRQYWdlID0gdGhpcy5wYWdlO1xuICAgIGxldCBjdXJyZW50Qm9va0lkID0gdGhpcy5ib29rRGF0YS5pZDtcbiAgICBsZXQgY3VycmVudFNlYXJjaCA9IHNlYXJjaC50ZXh0O1xuXG4gICAgbGV0IG9jckRhdGEgPSBbXTtcbiAgICBsZXQgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGlmKCAhdGhpcy5vY3JEYXRhIHx8IHBhZ2VDaGFuZ2VkICkge1xuICAgICAgbGV0IHdvcmRHcm91cENvdW50ID0gTWF0aC5jZWlsKGRhdGEucGF5bG9hZC5sZW5ndGggLyB0aGlzLndvcmRQcm9jZXNzR3JvdXBTaXplKTtcblxuICAgICAgZm9yKCBsZXQgaSA9IDA7IGkgPCB3b3JkR3JvdXBDb3VudDsgaSArPSAxICkge1xuICAgICAgICBpZiggdGhpcy5wYXVzZUFuaW1hdGlvbiApIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBhdXNlQW5pbWF0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHdvcmRzID0gZGF0YS5wYXlsb2FkLnNsaWNlKGkqdGhpcy53b3JkUHJvY2Vzc0dyb3VwU2l6ZSwgKGkrMSkqdGhpcy53b3JkUHJvY2Vzc0dyb3VwU2l6ZSk7XG4gICAgICAgIGxldCBzY2FsZWRXb3JkcyA9IGF3YWl0IHRoaXMuX3JlbmRlcldvcmRHcm91cCh3b3Jkcywgc2VhcmNoKTtcbiAgICAgICAgb2NyRGF0YS5wdXNoKC4uLnNjYWxlZFdvcmRzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoJ3BhZ2U9Jyt0aGlzLnBhZ2UrJyByZW5kZXJpbmcgJytkYXRhLnBheWxvYWQubGVuZ3RoKycgd29yZHMgdG9vaycsIG5ldyBEYXRlKCkuZ2V0VGltZSgpLXRpbWUsICdtcycpO1xuXG4gICAgLy8gbWFrZSBzdXJlIHRoZXNlIGhhdmVuJ3QgY2hhbmdlZCBhZnRlciByZW5kZXJcbiAgICBpZiggY3VycmVudFBhZ2UgIT09IHRoaXMucGFnZSB8fCBjdXJyZW50Qm9va0lkICE9PSB0aGlzLmJvb2tEYXRhLmlkIHx8IGN1cnJlbnRTZWFyY2ggIT09IHNlYXJjaC50ZXh0ICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZWRPY3JUbyA9IHtcbiAgICAgIHJlbmRlclJhdGlvbiA6IHRoaXMucGFnZURhdGEucmVuZGVyUmF0aW8sXG4gICAgICB0b3A6IHRoaXMucGFnZURhdGEucmVuZGVyT2Zmc2V0VG9wLFxuICAgICAgbGVmdDogdGhpcy5wYWdlRGF0YS5yZW5kZXJPZmZzZXRMZWZ0LFxuICAgICAgd2lkdGg6IHRoaXMucGFnZURhdGEucmVuZGVyV2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMucGFnZURhdGEucmVuZGVySGVpZ2h0LFxuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVkU2VhcmNoVGV4dCA9IHNlYXJjaC50ZXh0O1xuXG4gICAgdGhpcy5vY3JEYXRhID0gb2NyRGF0YTtcbiAgICB0aGlzLnJlbmRlcmVkT2NyRGF0YSA9IGRhdGE7XG4gICAgdGhpcy5yZXF1ZXN0VXBkYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfcmVuZGVyV29yZEdyb3VwXG4gICAqIEBkZXNjcmlwdGlvbiByZW5kZXIgYSBncm91cCBvZiB3b3JkcyBhdCBhIHRpbWUgdG8gcHJldmVudCBibG9ja2luZyB0aGUgVUlcbiAgICogXG4gICAqIEBwYXJhbSB7Kn0gd29yZHMgXG4gICAqIEBwYXJhbSB7Kn0gc2VhcmNoIFxuICAgKiBAcmV0dXJucyBcbiAgICovXG4gIF9yZW5kZXJXb3JkR3JvdXAod29yZHMsIHNlYXJjaCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgc2NhbGVkV29yZHMgPSB3b3Jkcy5tYXAod29yZCA9PiB0aGlzLl9yZW5kZXJXb3JkU2l6ZSh3b3JkLCBzZWFyY2gpKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZShzY2FsZWRXb3JkcyksIDApO1xuICAgIH0pO1xuICB9XG5cbiAgX3BhdXNlT25BbmltYXRpb24oKSB7XG4gICAgaWYoICF0aGlzLmFuaW1hdGluZyApIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgIHRoaXMucGF1c2VBbmltYXRpb24gPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnBhdXNlQW5pbWF0aW9uUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMucGF1c2VBbmltYXRpb247XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfcmVuZGVyV29yZFNpemVcbiAgICogQGRlc2NyaXB0aW9uIHJlbmRlciBhIHNpbmdsZSB3b3JkLCBzY2FsaW5nIGl0IHRvIHRoZSBwYWdlIGFuZCBzZWFyY2ggcmVzdWx0c1xuICAgKiBcbiAgICogQHBhcmFtIHsqfSB3b3JkIFxuICAgKiBAcGFyYW0geyp9IHNlYXJjaCBcbiAgICogQHJldHVybnMgXG4gICAqL1xuICBfcmVuZGVyV29yZFNpemUod29yZCwgc2VhcmNoKSB7XG4gICAgbGV0IHNjYWxlZFdvcmQgPSB7XG4gICAgICB0ZXh0IDogd29yZC50ZXh0LFxuICAgICAgdG9wIDogTWF0aC5yb3VuZCh3b3JkLmJib3gudG9wKnRoaXMucGFnZURhdGEucmVuZGVyUmF0aW8pLFxuICAgICAgbGVmdCA6IE1hdGgucm91bmQod29yZC5iYm94LmxlZnQqdGhpcy5wYWdlRGF0YS5yZW5kZXJSYXRpbyksXG4gICAgICByaWdodCA6IE1hdGgucm91bmQod29yZC5iYm94LnJpZ2h0KnRoaXMucGFnZURhdGEucmVuZGVyUmF0aW8pLFxuICAgICAgYm90dG9tIDogTWF0aC5yb3VuZCh3b3JkLmJib3guYm90dG9tKnRoaXMucGFnZURhdGEucmVuZGVyUmF0aW8pXG4gICAgfVxuXG4gICAgbGV0IGZvbnRTaXplID0gc2NhbGVkV29yZC5ib3R0b20tc2NhbGVkV29yZC50b3A7XG4gICAgbGV0IGxldHRlclNwYWNpbmcgPSB0aGlzLmdldFdvcmRMZXR0ZXJTcGFjaW5nKGZvbnRTaXplLCB3b3JkLnRleHQsIHNjYWxlZFdvcmQucmlnaHQtc2NhbGVkV29yZC5sZWZ0KTtcbiAgICBcbiAgICBzY2FsZWRXb3JkLmxldHRlclNwYWNpbmcgPSBsZXR0ZXJTcGFjaW5nLnRvRml4ZWQoMikrJ3B4JztcbiAgICBzY2FsZWRXb3JkLmZvbnRTaXplID0gZm9udFNpemU7XG4gICAgc2NhbGVkV29yZC50b3AgKz0gdGhpcy5idWZmZXI7XG4gICAgc2NhbGVkV29yZC5ib3R0b20gPSB0aGlzLnBhZ2VEYXRhLnJlbmRlckhlaWdodCAtIHNjYWxlZFdvcmQuYm90dG9tICsgdGhpcy5idWZmZXI7XG4gICAgc2NhbGVkV29yZC5yaWdodCA9IHRoaXMucGFnZURhdGEucmVuZGVyV2lkdGggLSBzY2FsZWRXb3JkLnJpZ2h0O1xuICAgIHNjYWxlZFdvcmQuc2VsZWN0ZWQgPSB0aGlzLl9pc1NlbGVjdGVkV29yZCh3b3JkLCBzZWFyY2gucmVzdWx0cyk7XG5cbiAgICByZXR1cm4gc2NhbGVkV29yZDtcbiAgfVxuXG4gIF9pc1NlbGVjdGVkV29yZCh3b3JkLCByZXN1bHRzKSB7XG4gICAgbGV0IGhpdCwgcmU7XG4gICAgZm9yKCBoaXQgb2YgcmVzdWx0cyApIHtcbiAgICAgIGZvciggcmUgb2YgaGl0LnJlZ2V4ICkge1xuICAgICAgICBpZiggcmUudGVzdCh3b3JkLnRleHQpICkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldFdvcmRMZXR0ZXJTcGFjaW5nKGZvbnRTaXplLCB3b3JkLCB3aWR0aCkge1xuICAgIGxldCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHNwYW4uc3R5bGUuZm9udFNpemUgPSBmb250U2l6ZSsncHgnO1xuICAgIHNwYW4uc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIHNwYW4uaW5uZXJIVE1MID0gd29yZDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNwYW4pO1xuXG4gICAgbGV0IHNwYW5XaWR0aCA9IHNwYW4ub2Zmc2V0V2lkdGg7XG4gICAgbGV0IHNwYWNpbmcgPSAod2lkdGggLSBzcGFuV2lkdGgpIC8gKHdvcmQubGVuZ3RoLTEpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc3Bhbik7XG4gICAgcmV0dXJuIHNwYWNpbmdcbiAgfVxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgndWNkbGliLWJvb2tyZWFkZXItcGFnZScsIFVjZGxpYkJvb2tyZWFkZXJQYWdlKTsiLCJpbXBvcnQgeyBodG1sLCBjc3MgfSBmcm9tICdsaXQnO1xuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVzKCkge1xuICBjb25zdCBlbGVtZW50U3R5bGVzID0gY3NzYFxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcbiAgICAgIC0tdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4yNXM7XG4gICAgfVxuXG4gICAgOmhvc3QoLnBhZ2UtbGVmdC1wcmV2KSB7XG4gICAgICB6LWluZGV4OiAxMDtcbiAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICB9XG4gICAgXG4gICAgOmhvc3QoLnBhZ2UtcmlnaHQtcHJldikge1xuICAgICAgei1pbmRleDogMTA7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoLTE4MGRlZyk7XG4gICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0O1xuICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIH1cblxuICAgIDpob3N0KC5wYWdlLWxlZnQpIHtcbiAgICAgIHotaW5kZXg6IDQwO1xuICAgIH1cblxuICAgIDpob3N0KC5wYWdlLXJpZ2h0KSB7XG4gICAgICB6LWluZGV4OiA0MDtcbiAgICB9XG5cbiAgICA6aG9zdCgucGFnZS1sZWZ0LW5leHQpIHtcbiAgICAgIHotaW5kZXg6IDEwO1xuICAgICAgdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQ7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoLTE4MGRlZyk7XG4gICAgfVxuXG4gICAgOmhvc3QoLnBhZ2UtcmlnaHQtbmV4dCkge1xuICAgICAgei1pbmRleDogMTA7XG4gICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgfVxuXG4gICAgLyogYW5pbWF0ZSBuZXh0ICovXG5cbiAgICA6aG9zdCgucGFnZS1sZWZ0LmFuaW1hdGUtbmV4dC1zdGFydCkge1xuICAgICAgei1pbmRleDogMTU7XG4gICAgfVxuXG4gICAgOmhvc3QoLnBhZ2UtcmlnaHQuYW5pbWF0ZS1uZXh0LXN0YXJ0KSB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoOTBkZWcpO1xuICAgICAgdHJhbnNmb3JtLW9yaWdpbjogbGVmdDtcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS10cmFuc2l0aW9uLWR1cmF0aW9uKTtcbiAgICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluO1xuICAgIH1cblxuICAgIDpob3N0KC5wYWdlLWxlZnQtbmV4dC5hbmltYXRlLW5leHQtc3RhcnQpIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlWSgtOTBkZWcpO1xuICAgIH1cblxuICAgIDpob3N0KC5wYWdlLXJpZ2h0LW5leHQuYW5pbWF0ZS1uZXh0LXN0YXJ0KSB7XG4gICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgICAgIHotaW5kZXg6IDIwO1xuICAgIH1cblxuICAgIDpob3N0KC5wYWdlLXJpZ2h0LmFuaW1hdGUtbmV4dC1lbmQpIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlWSgtOTBkZWcpO1xuICAgIH1cblxuICAgIDpob3N0KC5wYWdlLWxlZnQtbmV4dC5hbmltYXRlLW5leHQtZW5kKSB7XG4gICAgICB6LWluZGV4OiA1MDtcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS10cmFuc2l0aW9uLWR1cmF0aW9uKTtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlWSgwZGVnKTtcbiAgICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcbiAgICB9XG5cbiAgICA6aG9zdCgucGFnZS1yaWdodC1uZXh0LmFuaW1hdGUtbmV4dC1lbmQpIHtcbiAgICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgICAgei1pbmRleDogMjA7XG4gICAgfVxuXG5cbiAgICAvKiBhbmltYXRlIHByZXYgKi9cblxuICAgIDpob3N0KC5wYWdlLWxlZnQuYW5pbWF0ZS1wcmV2LXN0YXJ0KSB7XG4gICAgICB6LWluZGV4OiA1MDtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlWSgtOTBkZWcpO1xuICAgICAgdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQ7XG4gICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gdmFyKC0tdHJhbnNpdGlvbi1kdXJhdGlvbik7XG4gICAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbjtcbiAgICB9XG5cbiAgICA6aG9zdCgucGFnZS1yaWdodC5hbmltYXRlLXByZXYtc3RhcnQpIHtcbiAgICAgIHotaW5kZXg6IDE1O1xuICAgIH1cblxuICAgIDpob3N0KC5wYWdlLXJpZ2h0LXByZXYuYW5pbWF0ZS1wcmV2LXN0YXJ0KSB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoLTkwZGVnKTtcbiAgICAgIHotaW5kZXg6IDUwO1xuICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICB9XG5cbiAgICA6aG9zdCgucGFnZS1sZWZ0LXByZXYuYW5pbWF0ZS1wcmV2LXN0YXJ0KSB7XG4gICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgICAgei1pbmRleDogMTU7XG4gICAgfVxuXG4gICAgOmhvc3QoLnBhZ2UtbGVmdC5hbmltYXRlLXByZXYtZW5kKSB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoLTkwZGVnKTtcbiAgICB9XG5cbiAgICA6aG9zdCgucGFnZS1yaWdodC5hbmltYXRlLXByZXYtZW5kKSB7XG4gICAgICB6LWluZGV4OiAxMDtcbiAgICB9XG5cbiAgICA6aG9zdCgucGFnZS1yaWdodC1wcmV2LmFuaW1hdGUtcHJldi1lbmQpIHtcbiAgICAgIHotaW5kZXg6IDUwO1xuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIHZhcigtLXRyYW5zaXRpb24tZHVyYXRpb24pO1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGVZKDBkZWcpO1xuICAgICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xuICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICB9XG5cbiAgICA6aG9zdCgucGFnZS1sZWZ0LXByZXYuYW5pbWF0ZS1wcmV2LWVuZCkge1xuICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICAgIHotaW5kZXg6IDE1O1xuICAgIH1cbiAgICBcbiAgICAud29yZHNbYW5pbWF0aW5nXSB7XG4gICAgICBkaXNwbGF5OiBub25lXG4gICAgfVxuXG4gICAgc3Bhbi53b3JkIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIGN1cnNvcjogdGV4dDtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7XG4gICAgfVxuXG4gICAgc3Bhbi53b3JkW3NlbGVjdGVkXSB7XG4gICAgICBib3JkZXI6IDNweCBzb2xpZCB2YXIoLS1jb2xvci1yZWRidWQpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y1NTViMTQwO1xuICAgICAgbWFyZ2luOiAtMXB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIH1cblxuICAgIGltZyB7XG4gICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICAgIH1cblxuICAgIC5sb2FkaW5nIHtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG4gICAgLmxvYWRpbmcgZGl2IHsgIFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbGVmdDogNXB4O1xuICAgICAgdG9wOiA1cHg7XG4gICAgICByaWdodDogNXB4O1xuICAgICAgYm90dG9tOiA1cHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjZWVlO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICB9XG4gIGA7XG5cbiAgcmV0dXJuIFtlbGVtZW50U3R5bGVzXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcigpIHsgXG5yZXR1cm4gaHRtbGBcblxuPGRpdiA/aGlkZGVuPVwiJHshdGhpcy5kZWJ1Z31cIj5cbiAgPGRpdj5QYWdlOiAke3RoaXMucGFnZURhdGEuaW5kZXh9PC9kaXY+XG4gIDxkaXY+V2lkdGgvaGVpZ2h0OiAke3RoaXMucGFnZURhdGEud2lkdGh9eCR7dGhpcy5wYWdlRGF0YS5oZWlnaHR9PC9kaXY+XG4gIDxkaXY+UmVuZGVyZWQgb2Zmc2V0IHRvcC9sZWZ0OiAke3RoaXMucGFnZURhdGEucmVuZGVyT2Zmc2V0VG9wfXgke3RoaXMucGFnZURhdGEucmVuZGVyT2Zmc2V0TGVmdH08L2Rpdj5cbiAgPGRpdj5SZW5kZXJlZCB3aWR0aC9oZWlnaHQ6ICR7dGhpcy5wYWdlRGF0YS5yZW5kZXJXaWR0aH14JHt0aGlzLnBhZ2VEYXRhLnJlbmRlckhlaWdodH08L2Rpdj5cbiAgPGRpdj5SZW5kZXIgcmF0aW86ICR7dGhpcy5wYWdlRGF0YS5yZW5kZXJSYXRpb308L2Rpdj5cbiAgPGRpdj5SZW5kZXIgcmF0aW8gZGltZW5zaW9uOiAke3RoaXMucGFnZURhdGEucmVuZGVyUmF0aW9EaW1lbnNpb259PC9kaXY+XG48L2Rpdj4gXG5cbjxpbWcgP2hpZGRlbj1cIiR7dGhpcy5kZWJ1ZyB8fCB0aGlzLmxvYWRpbmd9XCIgZHJhZ2dhYmxlPVwiZmFsc2VcIiBzcmM9XCIke3RoaXMucGFnZURhdGE/LmltYWdlVXJsfVwiIGFsdD1cIlwiPlxuPGRpdiA/aGlkZGVuPVwiJHshdGhpcy5sb2FkaW5nfVwiIGNsYXNzPVwibG9hZGluZ1wiPlxuICA8ZGl2PjwvZGl2PlxuPC9kaXY+XG5cblxuPGRpdiBjbGFzcz1cIndvcmRzXCIgP2FuaW1hdGluZz1cIiR7dGhpcy5hbmltYXRpbmd9XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4ke3RoaXMub2NyRGF0YS5tYXAoKHdvcmQsIGkpID0+IGh0bWxgXG4gIDxzcGFuIFxuICAgIGNsYXNzPVwid29yZFwiXG4gICAgP3NlbGVjdGVkPVwiJHt3b3JkLnNlbGVjdGVkfVwiIFxuICAgIHN0eWxlPVwiYm90dG9tOiAke3dvcmQuYm90dG9tfXB4OyByaWdodDogJHt3b3JkLnJpZ2h0fXB4OyB0b3A6ICR7d29yZC50b3B9cHg7IGxlZnQ6ICR7d29yZC5sZWZ0fXB4OyBsaW5lLWhlaWdodDogJHt3b3JkLmZvbnRTaXplfXB4OyBsZXR0ZXItc3BhY2luZzogJHt3b3JkLmxldHRlclNwYWNpbmd9OyBmb250LXNpemU6ICR7d29yZC5mb250U2l6ZX1weFwiPlxuICAgICR7d29yZC50ZXh0fVxuICA8L3NwYW4+XG5gKX1cbjwvZGl2PlxuXG5gO30iLCJpbXBvcnQgeyBMaXRFbGVtZW50IH0gZnJvbSAnbGl0JztcbmltcG9ydCB7cmVuZGVyLCBzdHlsZXN9IGZyb20gXCIuL3VjZGxpYi1ib29rcmVhZGVyLXNsaWRlci50cGwuanNcIjtcbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVjZGxpYkJvb2tyZWFkZXJTbGlkZXIgZXh0ZW5kcyBNaXhpbihMaXRFbGVtZW50KVxuLndpdGgoTGl0Q29ya1V0aWxzKSB7XG5cbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtYXhQYWdlIDogeyB0eXBlOiBOdW1iZXIgfSxcbiAgICAgIHNlbGVjdGVkUGFnZSA6IHsgdHlwZTogTnVtYmVyIH0sXG4gICAgICB3aWR0aCA6IHsgdHlwZTogTnVtYmVyIH0sXG4gICAgICBzZWFyY2hSZXN1bHRzIDogeyB0eXBlOiBBcnJheSB9LFxuICAgICAgaXNNb3ZpbmcgOiB7IHR5cGU6IEJvb2xlYW4gfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3R5bGVzKCkge1xuICAgIHJldHVybiBzdHlsZXMoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuX2luamVjdE1vZGVsKCdCb29rUmVhZGVyTW9kZWwnKTtcblxuICAgIHRoaXMuX3Jlc2V0KCk7XG5cbiAgICB0aGlzLl9vbk1vdmUgPSB0aGlzLl9vbk1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbk1vdmVTdGFydCA9IHRoaXMuX29uTW92ZVN0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25Nb3ZlRW5kID0gdGhpcy5fb25Nb3ZlRW5kLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25SZXNpemUgPSB0aGlzLl9vblJlc2l6ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgZmlyc3RVcGRhdGVkKCkge1xuICAgIHRoaXMudHJhY2sgPSB0aGlzLnNoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoJ3RyYWNrJyk7XG4gICAgdGhpcy5oYW5kbGUgPSB0aGlzLnNoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoJ2hhbmRsZScpO1xuICAgIGlmKCB0aGlzLmhhbmRsZSApIHtcbiAgICAgIHRoaXMuaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX29uTW92ZVN0YXJ0KTtcbiAgICAgIC8vIHRoaXMuaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoKSA9PiB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoJ0ZhaWxlZCB0byBmaW5kIGhhbmRsZSBlbGVtZW50Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2FsY3VsYXRlUGFnZXMoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fb25SZXNpemUpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uTW92ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX29uTW92ZSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uTW92ZUVuZCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5fb25Nb3ZlRW5kKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uTW92ZUVuZCk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX29uUmVzaXplKTtcblxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLl9vbk1vdmUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdmUpOyBcblxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25Nb3ZlRW5kKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLl9vbk1vdmVFbmQpO1xuICB9XG5cbiAgX29uQm9va3JlYWRlclN0YXRlVXBkYXRlKGUpIHtcbiAgICB0aGlzLnNlbGVjdGVkUGFnZSA9IGUuc2VsZWN0ZWRQYWdlIHx8IDA7XG4gICAgdGhpcy5tYXhQYWdlID0gKGUuYm9va1ZpZXdEYXRhPy5wYWdlcz8ubGVuZ3RoIHx8IDEpIC0gMTtcbiAgICB0aGlzLl9jYWxjdWxhdGVQYWdlcygpO1xuXG4gICAgLy8gdXBkYXRlIHNsaWRlciBwb3NpdGlvbiB3aXRoIG5ldyBwYWdlXG4gICAgbGV0IG5ld0xlZnQgPSB0aGlzLnBhZ2VzW3RoaXMuc2VsZWN0ZWRQYWdlXTtcbiAgICB0aGlzLmhhbmRsZS5zdHlsZS5sZWZ0ID0gYCR7bmV3TGVmdH1weGA7XG4gIH1cblxuICBfcmVzZXQoKSB7XG4gICAgdGhpcy5tYXhQYWdlID0gMDtcbiAgICB0aGlzLnNlbGVjdGVkUGFnZSA9IDA7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMub2Zmc2V0V2lkdGg7XG4gICAgdGhpcy5zZWFyY2hSZXN1bHRzID0gW107XG4gICAgdGhpcy5pc01vdmluZyA9IGZhbHNlO1xuICB9XG5cbiAgX2NhbGN1bGF0ZVBhZ2VzKCkge1xuICAgIGxldCB0cmFja1JlY3QgPSB0aGlzLnRyYWNrLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMucGFnZVdpZHRoID0gdHJhY2tSZWN0LndpZHRoIC8gdGhpcy5tYXhQYWdlO1xuICAgIHRoaXMucGFnZXMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAodGhpcy5tYXhQYWdlKzEpIH0sIChfLCBpKSA9PiBpICogdGhpcy5wYWdlV2lkdGgpO1xuICB9XG5cbiAgX29uUmVzaXplKGUpIHtcbiAgICB0aGlzLndpZHRoID0gdGhpcy5vZmZzZXRXaWR0aCB8fCAxO1xuICAgIHRoaXMuX2NhbGN1bGF0ZVBhZ2VzKCk7XG4gICAgdGhpcy51cGRhdGVTZWFyY2hSZXN1bHRzKHRoaXMuc2VhcmNoUmVzdWx0cyk7XG4gICAgdGhpcy5oYW5kbGUuc3R5bGUubGVmdCA9IGAke3RoaXMucGFnZXNbdGhpcy5zZWxlY3RlZFBhZ2VdfXB4YDsgIFxuICB9XG5cbiAgX29uTW92ZVN0YXJ0KGUpIHtcbiAgICB0aGlzLmlzTW92aW5nID0gdHJ1ZTtcbiAgICB0aGlzLm1vdmVTdGFydCA9IHtcbiAgICAgIHggOiBlLmNsaWVudFgsXG4gICAgICBsZWZ0IDogdGhpcy5oYW5kbGUub2Zmc2V0TGVmdFxuICAgIH1cbiAgfVxuXG4gIF9vbkNsaWNrVHJhY2soZSkge1xuICAgIHRoaXMuaXNNb3ZpbmcgPSB0cnVlO1xuICAgIHRoaXMuX29uTW92ZShlKTtcbiAgICB0aGlzLl9vbk1vdmVFbmQoZSk7XG4gIH1cblxuICBfb25Nb3ZlKGUpIHtcbiAgICBpZiggIXRoaXMuaXNNb3ZpbmcgKSByZXR1cm47XG4gICAgXG4gICAgbGV0IHRyYWNrUmVjdCA9IHRoaXMudHJhY2suZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IGNsaWVudFggPSBlLnRvdWNoZXM/Lmxlbmd0aCA/IGUudG91Y2hlc1swXS5jbGllbnRYIDogZS5jbGllbnRYO1xuICAgIGxldCBuZXdMZWZ0ID0gY2xpZW50WCAtIHRyYWNrUmVjdC5sZWZ0O1xuXG4gICAgbGV0IHBhZ2VJbmNyZW1lbnQgPSB0aGlzLkJvb2tSZWFkZXJNb2RlbC5zdG9yZT8uZGF0YT8uc3RhdGU/LnNlbGVjdGVkVmlldyA9PT0gJ2RvdWJsZScgPyAyIDogMTtcblxuICAgIC8vIHVwZGF0ZSBoYW5kbGUgcG9zaXRpb24gKGJldHdlZW4gMCBhbmQgbWF4IHRyYWNrIHdpZHRoKVxuICAgIG5ld0xlZnQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihuZXdMZWZ0LCB0cmFja1JlY3Qud2lkdGgpKTtcblxuICAgIC8vIGNhbGMgbmV3IHNlbGVjdGVkIHBhZ2VcbiAgICBsZXQgbmV3UGFnZSA9IE1hdGgucm91bmQoKG5ld0xlZnQgLyB0cmFja1JlY3Qud2lkdGgpICogdGhpcy5tYXhQYWdlKTtcbiAgICBpZiggbmV3UGFnZSAhPT0gdGhpcy5zZWxlY3RlZFBhZ2UgKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkUGFnZSA9IG5ld1BhZ2U7XG4gICAgfVxuXG4gICAgbGV0IGNsb3Nlc3RQYWdlID0gdGhpcy5wYWdlcy5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IFxuICAgICAgTWF0aC5hYnMoY3VyciAtIG5ld0xlZnQpIDwgTWF0aC5hYnMocHJldiAtIG5ld0xlZnQpID8gY3VyciA6IHByZXZcbiAgICApO1xuXG4gICAgLy8gaWYgMnBhZ2UgbW9kZSwgbmVlZCB0byBmbGlwIHRvIG9kZCBwYWdlcyBvbmx5LiBpZiBldmVuIHBhZ2UsIG5lZWQgdG8gZmxpcCB0byBuZXh0IHBhZ2VcbiAgICBpZiggcGFnZUluY3JlbWVudCA9PT0gMiAmJiB0aGlzLnNlbGVjdGVkUGFnZSAlIDIgPT09IDAgKSB7XG4gICAgICBsZXQgbWF0Y2ggPSB0aGlzLnBhZ2VzLmZpbmRJbmRleChwYWdlID0+IHBhZ2UgPT09IGNsb3Nlc3RQYWdlKTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRQYWdlID0gbWF0Y2g7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGhhbmRsZSBwb3NpdGlvblxuICAgIHRoaXMuaGFuZGxlLnN0eWxlLmxlZnQgPSBgJHtjbG9zZXN0UGFnZX1weGA7ICAgIFxuICB9XG5cbiAgX29uTW92ZUVuZChlKSB7XG4gICAgaWYoICF0aGlzLmlzTW92aW5nICkgcmV0dXJuO1xuXG4gICAgLy8gdGhpcy5fb25Nb3ZlKGUpO1xuICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgIHRoaXMuaXNNb3ZpbmcgPSBmYWxzZTtcbiAgICB0aGlzLkJvb2tSZWFkZXJNb2RlbC5zZXRQYWdlKHRoaXMuc2VsZWN0ZWRQYWdlKTtcbiAgfVxuXG4gIHVwZGF0ZVNlYXJjaFJlc3VsdHMoc2VhcmNoUmVzdWx0cz1bXSkge1xuICAgIC8vIHVwZGF0ZSBzbGlkZXIgd2l0aCBpbmRpY2F0b3JzIG9mIG1hdGNoZXNcbiAgICBsZXQgc2VhcmNoSW5kaWNhdG9yc0RpdiA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWluZGljYXRvcnMnKTtcbiAgICBpZiggIXNlYXJjaEluZGljYXRvcnNEaXYgKSByZXR1cm47XG5cbiAgICBzZWFyY2hJbmRpY2F0b3JzRGl2LmlubmVySFRNTCA9ICcnO1xuICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IHNlYXJjaFJlc3VsdHM7XG5cbiAgICAvLyBjbGVhciBhbGwgZXZlbnQgbGlzdGVuZXJzXG4gICAgbGV0IGluZGljYXRvcnMgPSBzZWFyY2hJbmRpY2F0b3JzRGl2LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbmRpY2F0b3InKTtcbiAgICAoaW5kaWNhdG9ycyB8fCBbXSkuZm9yRWFjaChpbmRpY2F0b3IgPT4ge1xuICAgICAgaW5kaWNhdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJyk7XG4gICAgfSk7XG5cbiAgICBzZWFyY2hSZXN1bHRzLmZvckVhY2goKHJlc3VsdCwgaW5kZXgpID0+IHtcbiAgICAgIGxldCBwYWdlTnVtYmVyID0gcmVzdWx0LnBhZ2UgfHwgMDtcbiAgICAgIGxldCBpbmRpY2F0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGluZGljYXRvci5jbGFzc0xpc3QuYWRkKCdpbmRpY2F0b3InKTtcbiAgICAgIGluZGljYXRvci5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2VhcmNoLXJlc3VsdCcsIGluZGV4KTtcbiAgICAgIGluZGljYXRvci5zdHlsZS5sZWZ0ID0gYCR7KHRoaXMucGFnZXNbcGFnZU51bWJlci0xXSB8fCAwKSAtIDR9cHhgO1xuXG4gICAgICBsZXQgc2VhcmNoUXVlcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHNlYXJjaFF1ZXJ5LmNsYXNzTGlzdC5hZGQoJ3NlYXJjaC1xdWVyeScpO1xuXG4gICAgICBsZXQgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcbiAgICAgIGxldCBtYWluVGV4dCA9IHJlc3VsdC50ZXh0IHx8ICcnO1xuICAgICAgaWYoIG1haW5UZXh0LmluZGV4T2YoJ3t7eycpICE9PSAtMSAmJiBtYWluVGV4dC5pbmRleE9mKCd9fX0nKSAhPT0gLTEgKSB7XG4gICAgICAgIG1haW5UZXh0ID0gbWFpblRleHQucmVwbGFjZSgne3t7JywgJzxtYXJrPicpLnJlcGxhY2UoJ319fScsICc8L21hcms+Jyk7XG4gICAgICB9XG4gICAgICBtYWluLmlubmVySFRNTCA9IG1haW5UZXh0O1xuXG4gICAgICBsZXQgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJyk7XG4gICAgICBmb290ZXIuaW5uZXJUZXh0ID0gYFBhZ2UgJHtwYWdlTnVtYmVyfWA7XG5cbiAgICAgIHNlYXJjaFF1ZXJ5LmFwcGVuZENoaWxkKG1haW4pO1xuICAgICAgc2VhcmNoUXVlcnkuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbiAgICAgIGluZGljYXRvci5hcHBlbmRDaGlsZChzZWFyY2hRdWVyeSk7XG5cbiAgICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lciB0byBjbGljay90b3VjaCBvZiBpbmRpY2F0b3JcbiAgICAgIGluZGljYXRvci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBsZXQgcGFnZUluY3JlbWVudCA9IHRoaXMuQm9va1JlYWRlck1vZGVsLnN0b3JlPy5kYXRhPy5zdGF0ZT8uc2VsZWN0ZWRWaWV3ID09PSAnZG91YmxlJyA/IDIgOiAxO1xuICAgICAgICBpZiggcGFnZUluY3JlbWVudCA9PT0gMiAmJiBwYWdlTnVtYmVyICUgMiA9PT0gMCApIHtcbiAgICAgICAgICBwYWdlTnVtYmVyIC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5Cb29rUmVhZGVyTW9kZWwuc2V0UGFnZShwYWdlTnVtYmVyLTEpO1xuICAgICAgICBcbiAgICAgICAgbGV0IHNlbGVjdGVkU2VhcmNoUmVzdWx0ID0gcGFyc2VJbnQoaW5kaWNhdG9yLmdldEF0dHJpYnV0ZSgnZGF0YS1zZWFyY2gtcmVzdWx0JykpIHx8IDA7XG4gICAgICAgIHRoaXMuQm9va1JlYWRlck1vZGVsLnNldFNlbGVjdGVkU2VhcmNoUmVzdWx0KHNlbGVjdGVkU2VhcmNoUmVzdWx0KTtcbiAgICAgIH0pO1xuXG4gICAgICBzZWFyY2hJbmRpY2F0b3JzRGl2LmFwcGVuZENoaWxkKGluZGljYXRvcik7XG4gICAgfSk7XG4gIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3VjZGxpYi1ib29rcmVhZGVyLXNsaWRlcicsIFVjZGxpYkJvb2tyZWFkZXJTbGlkZXIpOyIsImltcG9ydCB7IGh0bWwsIGNzcyB9IGZyb20gJ2xpdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZXMoKSB7XG4gIGNvbnN0IGVsZW1lbnRTdHlsZXMgPSBjc3NgXG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuXG4gICAgLnNsaWRlciB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGhlaWdodDogMjBweDtcbiAgICAgIHRvcDogMjVweDtcblxuICAgICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lOyAvKiBpT1MgU2FmYXJpICovXG4gICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOyAvKiBTYWZhcmkgKi9cbiAgICAgIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTsgLyogS29ucXVlcm9yIEhUTUwgKi9cbiAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7IC8qIEZpcmVmb3ggKi9cbiAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTsgLyogSW50ZXJuZXQgRXhwbG9yZXIvRWRnZSAqL1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7IC8qIE5vbi1wcmVmaXhlZCB2ZXJzaW9uLCBjdXJyZW50bHkgKi9cbiAgICB9XG5cbiAgICAjdHJhY2sge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBoZWlnaHQ6IDhweDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIH1cblxuICAgICNoYW5kbGUge1xuICAgICAgYmFja2dyb3VuZDogIzAyMjg1MTtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHdpZHRoOiAyMHB4O1xuICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlOyBcbiAgICAgIHRvcDogLTVweDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAtOXB4O1xuICAgICAgei1pbmRleDogNjtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICB9XG5cbiAgICAuc2VhcmNoLWluZGljYXRvcnMge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIH1cblxuICAgIC5zZWFyY2gtaW5kaWNhdG9ycyAuaW5kaWNhdG9yIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWdvbGQpO1xuICAgICAgd2lkdGg6IDhweDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGhlaWdodDogMTdweDtcbiAgICAgIGJvdHRvbTogNnB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIH1cblxuICAgIC5zZWFyY2gtaW5kaWNhdG9ycyAuc2VhcmNoLXF1ZXJ5IHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gICAgLnNlYXJjaC1pbmRpY2F0b3JzIC5pbmRpY2F0b3I6aG92ZXIgLnNlYXJjaC1xdWVyeSB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGxlZnQ6IC0xNHB4O1xuICAgICAgYm90dG9tOiAyNXB4O1xuICAgICAgd2lkdGg6IDM1MHB4O1xuICAgICAgbWF4LXdpZHRoOiAxMDB2dztcbiAgICAgIHBhZGRpbmc6IDEycHggMTRweDtcbiAgICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICAgICAgY29sb3I6ICNmZmY7XG4gICAgICBiYWNrZ3JvdW5kOiAjMzMzO1xuICAgICAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgIGFuaW1hdGlvbjogZmFkZVVwIDAuMnM7XG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHotaW5kZXg6IDEwMDtcbiAgICB9XG5cbiAgICAuc2VhcmNoLWluZGljYXRvcnMgLnNlYXJjaC1xdWVyeSBmb290ZXIge1xuICAgICAgZm9udC1zaXplOiAuOHJlbTtcbiAgICB9XG5cbiAgICAuc2VhcmNoLWluZGljYXRvcnMgLnNlYXJjaC1xdWVyeSBtYXJrIHtcbiAgICAgIGNvbG9yOiAjYWRhZWRjO1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjcyOTU4O1xuICAgIH1cblxuICAgIC5sYWJlbCB7XG4gICAgICB3aWR0aCA6IDI1cHg7XG4gICAgICBmb250LXNpemU6IDEycHg7IFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAtMjJweDtcbiAgICAgIGxlZnQ6IC0ycHg7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDIwMG1zIGxpbmVhcjtcbiAgICAgIGNvbG9yOiB2YXIoLS1kZWZhdWx0LXByaW1hcnktY29sb3IpO1xuICAgIH1cblxuICAgIC5sYWJlbFttb3ZpbmddIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxuXG4gIGA7XG5cbiAgcmV0dXJuIFtlbGVtZW50U3R5bGVzXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcigpIHsgXG5yZXR1cm4gaHRtbGBcbiAgPGRpdiBjbGFzcz1cInNsaWRlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtaW5kaWNhdG9yc1wiPlxuICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwic2VhcmNoLXF1ZXJ5XCI+XG4gICAgICAgIDxtYWluPlwiTGVhbiBNLiA8bWFyaz5EYXZpczwvbWFyaz4sIEIuUy47IEUuSC4gSGFnZXJtYW5uOyBIZW5yeSBMLiBIdXJzdFwiPC9tYWluPlxuICAgICAgICA8Zm9vdGVyPlBhZ2UgNDU8L2Zvb3Rlcj5cbiAgICAgIDwvZGl2PiAtLT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGlkPVwidHJhY2tcIiBAY2xpY2s9XCIke3RoaXMuX29uQ2xpY2tUcmFja31cIj5cbiAgICAgIDxkaXYgaWQ9XCJoYW5kbGVcIiAgXG4gICAgICAgIEBtb3VzZWRvd249XCIke3RoaXMuX29uTW92ZVN0YXJ0fVwiXG4gICAgICAgIEB0b3VjaHN0YXJ0PVwiJHt0aGlzLl9vbk1vdmVTdGFydH1cIj5cbiAgICAgICAgPGRpdiBpZD1cIm51bWJlckxhYmVsXCIgY2xhc3M9XCJsYWJlbFwiID9tb3Zpbmc9XCIke3RoaXMuaXNNb3Zpbmd9XCI+JHt0aGlzLnNlbGVjdGVkUGFnZSsxfTwvZGl2PlxuICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbmA7fSIsImltcG9ydCB7IGNzcywgTGl0RWxlbWVudCB9IGZyb20gJ2xpdCc7XG5pbXBvcnQge3JlbmRlciwgc3R5bGVzfSBmcm9tIFwiLi91Y2RsaWItYm9va3JlYWRlci50cGwuanNcIjtcbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbmltcG9ydCBcIi4vdWNkbGliLWJvb2tyZWFkZXItcGFnZS5qc1wiO1xuaW1wb3J0IFwiLi91Y2RsaWItYm9va3JlYWRlci1uYXZiYXIuanNcIjtcbmltcG9ydCB7IHNldCB9IGZyb20gJy4uLy4uLy4uL2xpYi9zdG9yZXMvQ29sbGVjdGlvblN0b3JlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVWNkbGliQm9va3JlYWRlciBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpXG4gIC53aXRoKExpdENvcmtVdGlscykge1xuICBcbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBib29rIDogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIGJvb2tWaWV3RGF0YSA6IHsgdHlwZTogT2JqZWN0IH0sXG4gICAgICBwYWdlcyA6IHsgdHlwZTogQXJyYXkgfSxcbiAgICAgIHBhZ2UgOiB7IHR5cGU6IE51bWJlciB9LFxuICAgICAgdmlldyA6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICBmdWxsU2NyZWVuIDogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBtYXhIZWlnaHQgOiB7IHR5cGU6IE51bWJlciwgYXR0cmlidXRlOiAnbWF4LWhlaWdodCcgfSxcbiAgICAgIGZ1bGxzY3JlZW4gOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIHpvb20gOiB7IHR5cGU6IE51bWJlciB9LFxuICAgICAgb2Zmc2V0WCA6IHsgdHlwZTogTnVtYmVyIH0sXG4gICAgICBvZmZzZXRZIDogeyB0eXBlOiBOdW1iZXIgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3R5bGVzKCkge1xuICAgIHJldHVybiBzdHlsZXMoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5faW5qZWN0TW9kZWwoJ0Jvb2tSZWFkZXJNb2RlbCcpO1xuICAgIHRoaXMuYm9va1ZpZXdEYXRhID0ge307XG4gICAgdGhpcy5kZWJ1ZyA9IGZhbHNlO1xuXG4gICAgLy8gVE9ETzogZG9uJ3QgY2hhbmdlIGZyb20gMFxuICAgIHRoaXMucGFnZUJ1ZmZlciA9IDA7XG5cbiAgICAvLyBtYWtlIHN1cmUgaWYgeW91IGNoYW5nZSB0aGlzIHlvdSB1cGRhdGUgdGhlIGNzcyBwcm9wZXJ0eSAtLXRyYW5zaXRpb24tZHVyYXRpb25cbiAgICAvLyB0byBIQUxGIHRoZSB2YWx1ZSBvZiB0aGlzLmFuaW1hdGlvblRpbWVcbiAgICB0aGlzLmFuaW1hdGlvblRpbWUgPSAwLjU7IC8vIHNlY29uZHNcblxuICAgIHRoaXMuZnVsbHNjcmVlbiA9IGZhbHNlO1xuXG4gICAgdGhpcy56b29tID0gMDtcbiAgICB0aGlzLm9mZnNldFggPSAwO1xuICAgIHRoaXMub2Zmc2V0WSA9IDA7XG5cbiAgICB0aGlzLnBhZ2VzID0gW107XG5cbiAgICB0aGlzLl9vblJlc2l6ZSA9IHRoaXMuX29uUmVzaXplLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25Nb3VzZWRvd24gPSB0aGlzLl9vbk1vdXNlZG93bi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uTW91c2V1cCA9IHRoaXMuX29uTW91c2V1cC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uTW91c2Vtb3ZlID0gdGhpcy5fb25Nb3VzZW1vdmUuYmluZCh0aGlzKTtcbiAgICBcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlci5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fb25SZXNpemUpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZWRvd24pO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX29uTW91c2Vkb3duKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3VzZW1vdmUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLl9vbk1vdXNlbW92ZSwge3Bhc3NpdmU6IGZhbHNlfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9vbk1vdXNldXApO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX29uTW91c2V1cCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5fb25Nb3VzZXVwKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX29uUmVzaXplKTtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2Vkb3duKTtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9vbk1vdXNlZG93bik7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uTW91c2Vtb3ZlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fb25Nb3VzZW1vdmUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZXVwKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLl9vbk1vdXNldXApO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIHRoaXMuX29uTW91c2V1cCk7XG4gIH1cblxuICBmaXJzdFVwZGF0ZWQoKSB7XG4gICAgdGhpcy5wYWdlc0VsZSA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjc2luZ2xlLXBhZ2Utc2Nyb2xsJyk7XG4gICAgdGhpcy5yZXJlbmRlcih7ZnVsbDogdHJ1ZSwgYW5pbWF0ZTogZmFsc2V9KTtcbiAgfVxuXG4gIHVwZGF0ZWQocHJvcHMpIHtcbiAgICBpZiggcHJvcHMuaGFzKCdtYXhIZWlnaHQnKSApIHtcbiAgICAgIHRoaXMuX3VwZGF0ZUhlaWdodCgpO1xuICAgIH1cbiAgICBpZiggcHJvcHMuaGFzKCdib29rVmlld0RhdGEnKSB8fCBwcm9wcy5oYXMoJ2Z1bGxzY3JlZW4nKSApIHtcbiAgICAgIHRoaXMucmVyZW5kZXIoe2Z1bGw6IHRydWUsIGFuaW1hdGU6IGZhbHNlfSk7XG4gICAgfVxuICAgIGlmKCBwcm9wcy5oYXMoJ2Jvb2tWaWV3RGF0YScpICkge1xuICAgICAgdGhpcy5wYWdlcy5mb3JFYWNoKHBhZ2UgPT4gcGFnZS5lbGUuYm9va0RhdGEgPSB0aGlzLmJvb2tWaWV3RGF0YSk7XG4gICAgfVxuICB9XG5cbiAgX29uQm9va3JlYWRlclN0YXRlVXBkYXRlKGUpIHtcbiAgICBpZiggZS5zZWxlY3RlZEJvb2sgIT09IHRoaXMuYm9vayApIHtcbiAgICAgIHRoaXMuYm9vayA9IGUuc2VsZWN0ZWRCb29rO1xuICAgIH1cblxuICAgIGlmKCBlLmJvb2tWaWV3RGF0YSApIHtcbiAgICAgIGlmKCB0aGlzLmJvb2tWaWV3RGF0YT8uaWQgIT09IGUuYm9va1ZpZXdEYXRhLmlkICkge1xuICAgICAgICB0aGlzLmJvb2tWaWV3RGF0YSA9IGUuYm9va1ZpZXdEYXRhO1xuICAgICAgICB0aGlzLl91cGRhdGVIZWlnaHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmFuaW1hdGluZyA9IGUuYW5pbWF0aW5nO1xuXG4gICAgaWYoIHRoaXMucGFuRWxlICYmXG4gICAgICAodGhpcy5sYXN0UGFuPy5vZmZzZXRYICE9PSBlLm9mZnNldFggfHwgXG4gICAgICB0aGlzLmxhc3RQYW4/Lm9mZnNldFkgIT09IGUub2Zmc2V0WSB8fCBcbiAgICAgIHRoaXMubGFzdFBhbj8uem9vbSAhPT0gZS56b29tKSApIHtcblxuICAgICAgdGhpcy56b29tID0gZS56b29tIHx8IDA7XG4gICAgICB0aGlzLm9mZnNldFggPSBlLm9mZnNldFggfHwgMDtcbiAgICAgIHRoaXMub2Zmc2V0WSA9IGUub2Zmc2V0WSB8fCAwO1xuICAgICAgdGhpcy5wYW5FbGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMub2Zmc2V0WH1weCwgJHt0aGlzLm9mZnNldFl9cHgpIHNjYWxlKCR7dGhpcy56b29tfSlgO1xuICAgICAgdGhpcy5sYXN0UGFuID0ge29mZnNldFg6IGUub2Zmc2V0WCwgb2Zmc2V0WTogZS5vZmZzZXRZLCB6b29tOiBlLnpvb219O1xuICAgIH1cblxuICAgIHRoaXMuc2V0UGFnZShlLnNlbGVjdGVkUGFnZSk7XG4gICAgdGhpcy5zZXRWaWV3KGUuc2VsZWN0ZWRWaWV3KTtcbiAgfVxuXG4gIF91cGRhdGVIZWlnaHQoKSB7XG4gICAgdGhpcy5zdHlsZS5oZWlnaHQgPSB0aGlzLm1heEhlaWdodCsncHgnO1xuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjc2luZ2xlLXBhZ2UnKS5zdHlsZS5oZWlnaHQgPSB0aGlzLm1heEhlaWdodCsncHgnO1xuICAgIHRoaXMucmVyZW5kZXIoe2Z1bGw6IHRydWUsIGFuaW1hdGU6IGZhbHNlfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHJlcmVuZGVyXG4gICAqIEBkZXNjcmlwdGlvbiByZXJlbmRlciB0aGUgYm9vayByZWFkZXIuICBUaGlzIHdpbGwgdXBkYXRlIHRoZSBjdXJyZW50IHBhZ2VzLiAgSWYgdGhlIFxuICAgKiB2aWV3IG9yIGhlaWdodCBoYXMgY2hhbmdlZCwgdXNlIG9wdHMuZnVsbCA9IHRydWUgdG8gcmVjYWxjdWxhdGUgYWxsIHBhZ2Ugc2l6ZXMgdGhlblxuICAgKiByZW5kZXIgdGhlIGN1cnJlbnQgcGFnZXMuICBVc2Ugb3B0cy5hbmltYXRlID0gZmFsc2UgdG8gZGlzYWJsZSBhbmltYXRpb25zLlxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRzLmZ1bGwgcnVuIGZ1bGwgcmVyZW5kZXIsIHJlY2FsY3VsYXRpbmcgYWxsIHBhZ2Ugc2l6ZXNcbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRzLmFuaW1hdGUgYW5pbWF0ZSB0cmFuc2l0aW9ucyBiZXR3ZWVuIHBhZ2VzIChkZWZhdWx0IHRydWUpXG4gICAqIEByZXR1cm5zIFxuICAgKi9cbiAgcmVyZW5kZXIob3B0cz17fSkge1xuICAgIGlmKCAhdGhpcy5ib29rVmlld0RhdGE/LnBhZ2VzICkgcmV0dXJuO1xuICAgIGlmKCAhdGhpcy5tYXhIZWlnaHQgKSByZXR1cm47XG4gICAgaWYoIHRoaXMucGFnZSA8IDAgKSByZXR1cm47XG5cbiAgICBpZiggdGhpcy5sYXN0UmVuZGVyZWQgJiZcbiAgICAgICAgdGhpcy5sYXN0UmVuZGVyZWQudmlldyA9PT0gdGhpcy52aWV3ICYmXG4gICAgICAgIHRoaXMubGFzdFJlbmRlcmVkLnBhZ2UgPT09IHRoaXMucGFnZSAmJlxuICAgICAgICB0aGlzLmxhc3RSZW5kZXJlZC5tYXhIZWlnaHQgPT09IHRoaXMubWF4SGVpZ2h0ICYmXG4gICAgICAgIHRoaXMubGFzdFJlbmRlcmVkLmJvb2tWaWV3RGF0YUlkID09PSB0aGlzLmJvb2tWaWV3RGF0YS5pZCAmJlxuICAgICAgICB0aGlzLmxhc3RSZW5kZXJlZC53aWR0aCA9PT0gdGhpcy5vZmZzZXRXaWR0aCAmJlxuICAgICAgICB0aGlzLmxhc3RSZW5kZXJlZC5mdWxsID09PSBvcHRzLmZ1bGwgJiZcbiAgICAgICAgdGhpcy5sYXN0UmVuZGVyZWQuZnVsbHNjcmVlbiA9PT0gdGhpcy5mdWxsc2NyZWVuICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmKCBvcHRzLmZ1bGwgKSB7XG4gICAgICB0aGlzLl9yZW5kZXJBbGxQYWdlU2l6ZXMob3B0cyk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVuZGVyQ3VycmVudFBhZ2VzKG9wdHMpO1xuXG4gICAgLy8gYmVjYXVzZSBwYWdlcyAoZWxlbWVudHMpIGFyZSBhbHJlYWR5IGluIHZpZXcsIGp1c3QgdGhlcmUgb2Zmc2V0L3NpemUgaXNcbiAgICAvLyB1cGRhdGVkLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGUgZWxlbWVudHMgYXJlIHBva2VkIHRvIHVwZGF0ZSBcbiAgICB0aGlzLnBhZ2VzLmZvckVhY2gocGFnZSA9PiBwYWdlLmVsZS5fdXBkYXRlUGFnZURhdGEoKSk7XG5cbiAgICBpZiggb3B0cy5mdWxsICkge1xuICAgICAgLy8gaWYgc2luZ2xlIHZpZXcsIG1ha2Ugc3VyZSB3ZSBhcmUgc2Nyb2xsZWQgdG8gdGhlIGN1cnJlbnQgcGFnZVxuICAgICAgaWYoIHRoaXMudmlldyA9PT0gJ3NpbmdsZScgJiYgdGhpcy5ib29rVmlld0RhdGEucGFnZXMgKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGxldCBjdXJyZW50UGFnZSA9IHRoaXMuYm9va1ZpZXdEYXRhLnBhZ2VzW3RoaXMucGFnZV07XG4gICAgICAgICAgaWYoIGN1cnJlbnRQYWdlICkge1xuICAgICAgICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNzaW5nbGUtcGFnZScpLnNjcm9sbFRvcCA9IGN1cnJlbnRQYWdlLnJlbmRlck9mZnNldFRvcEZvclNjcm9sbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXQgcGFuL3pvb20gZWxlXG4gICAgaWYoIHRoaXMudmlldyA9PT0gJ3NpbmdsZScgKSB7XG4gICAgICB0aGlzLnBhbkVsZSA9IHRoaXMucGFnZXMuZmluZChwYWdlID0+IHBhZ2UuaW5kZXggPT09IHRoaXMucGFnZSkuZWxlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhbkVsZSA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjc2luZ2xlLXBhZ2UnKTtcbiAgICB9XG5cbiAgICB0aGlzLmxhc3RSZW5kZXJlZCA9IHtcbiAgICAgIGZ1bGw6IG9wdHMuZnVsbCxcbiAgICAgIHZpZXc6IHRoaXMudmlldyxcbiAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgIG1heEhlaWdodDogdGhpcy5tYXhIZWlnaHQsXG4gICAgICB3aWR0aDogdGhpcy5vZmZzZXRXaWR0aCxcbiAgICAgIGJvb2tWaWV3RGF0YUlkOiB0aGlzLmJvb2tWaWV3RGF0YS5pZCxcbiAgICAgIGZ1bGxzY3JlZW46IHRoaXMuZnVsbHNjcmVlblxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9yZW5kZXJBbGxQYWdlU2l6ZXNcbiAgICogQGRlc2NyaXB0aW9uIHJlbmRlciBhbGwgcGFnZXMgYmFzZWQgb24gdmlldyBhbmQgc2l6ZS4gdXBkYXRlcyBwYWdlIGNvbnRhaW5lclxuICAgKiBlbGVtZW50IGFzIHdlbGwuXG4gICAqL1xuICBfcmVuZGVyQWxsUGFnZVNpemVzKCkge1xuICAgIGlmKCB0aGlzLmZ1bGxzY3JlZW4gKSB7XG4gICAgICB0aGlzLnN0eWxlLmhlaWdodCA9ICcnO1xuICAgIH1cblxuICAgIC8vIHJlbmRlciBwYWdlcyBiYXNlZCBvbiB2aWV3IGFuZCBzaXplXG4gICAgbGV0IHJlYWRlcldpZHRoID0gdGhpcy5vZmZzZXRXaWR0aDtcbiAgICBsZXQgcmVhZGVySGVpZ2h0ID0gdGhpcy5mdWxsc2NyZWVuID8gKHRoaXMub2Zmc2V0SGVpZ2h0LTgwKSA6IHRoaXMubWF4SGVpZ2h0O1xuICAgIHRoaXMucmVuZGVyZWRIZWlnaHQgPSByZWFkZXJIZWlnaHQ7XG5cbiAgICBsZXQgcmVuZGVyZWRNYXhIZWlnaHQgPSAwO1xuICAgIGxldCByZW5kZXJlZFdpZHRoUmF0aW9NYXhIZWlnaHQgPSAwO1xuICAgIGxldCBoZWlnaHRSYXRpb0NvdW50ID0gMDtcblxuXG4gICAgdGhpcy5ib29rVmlld0RhdGEucGFnZXMuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgIGlmKCB0aGlzLnZpZXcgPT09ICdzaW5nbGUnICkge1xuICAgICAgICB0aGlzLl9yZW5kZXJQYWdlU2l6ZVNpbmdsZShyZWFkZXJIZWlnaHQsIHJlYWRlcldpZHRoLCBwYWdlKVxuICAgICAgfSBlbHNlIGlmKCB0aGlzLnZpZXcgPT09ICdkb3VibGUnICkge1xuICAgICAgICB0aGlzLl9yZW5kZXJQYWdlU2l6ZURvdWJsZShyZWFkZXJIZWlnaHQsIHJlYWRlcldpZHRoLCBwYWdlKVxuICAgICAgfVxuXG4gICAgICBpZiggcGFnZS5yZW5kZXJSYXRpb0RpbWVuc2lvbiA9PT0gJ2hlaWdodCcgfHwgIXBhZ2UuaXNMYW5kc2NhcGUpIHtcbiAgICAgICAgaGVpZ2h0UmF0aW9Db3VudCsrO1xuICAgICAgfVxuXG4gICAgICBpZiggcGFnZS5yZW5kZXJIZWlnaHQgPiByZW5kZXJlZE1heEhlaWdodCApIHtcbiAgICAgICAgcmVuZGVyZWRNYXhIZWlnaHQgPSBwYWdlLnJlbmRlckhlaWdodDtcbiAgICAgIH1cbiAgICAgIGlmKCBwYWdlLmlzTGFuZHNjYXBlICYmIHBhZ2UucmVuZGVySGVpZ2h0ID4gcmVuZGVyZWRXaWR0aFJhdGlvTWF4SGVpZ2h0ICkge1xuICAgICAgICByZW5kZXJlZFdpZHRoUmF0aW9NYXhIZWlnaHQgPSBwYWdlLnJlbmRlckhlaWdodDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmKCBoZWlnaHRSYXRpb0NvdW50ID4gMCApIHtcbiAgICAgIGxldCBwZXJjZW50T3ZlciA9IGhlaWdodFJhdGlvQ291bnQgLyB0aGlzLmJvb2tWaWV3RGF0YS5wYWdlcy5sZW5ndGg7XG4gICAgICBpZiggcGVyY2VudE92ZXIgPCAwLjIgKSB7XG4gICAgICAgIHJlbmRlcmVkTWF4SGVpZ2h0ID0gcmVuZGVyZWRXaWR0aFJhdGlvTWF4SGVpZ2h0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSB0aGUgaGVpZ2h0IG9mIHRoZSBwYWdlIGNvbnRhaW5lciBiYXNlZCBvbiB0aGUgbWF4IHBhZ2UgaGVpZ2h0IHNpbmNlIGl0J3Mgc21hbGxlclxuICAgIC8vIHRoYW4gdGhlIHdpZGdldCBoZWlnaHRcbiAgICBpZiggIXRoaXMuZnVsbHNjcmVlbiAmJiByZW5kZXJlZE1heEhlaWdodCAmJiByZW5kZXJlZE1heEhlaWdodCA8IHRoaXMubWF4SGVpZ2h0ICkge1xuICAgICAgdGhpcy5yZW5kZXJlZEhlaWdodCA9IHJlbmRlcmVkTWF4SGVpZ2h0O1xuXG4gICAgICB0aGlzLmJvb2tWaWV3RGF0YS5wYWdlcy5mb3JFYWNoKHBhZ2UgPT4ge1xuICAgICAgICBpZiggdGhpcy52aWV3ID09PSAnc2luZ2xlJyApIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJQYWdlU2l6ZVNpbmdsZShyZW5kZXJlZE1heEhlaWdodCwgcmVhZGVyV2lkdGgsIHBhZ2UpXG4gICAgICAgIH0gZWxzZSBpZiggdGhpcy52aWV3ID09PSAnZG91YmxlJyApIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJQYWdlU2l6ZURvdWJsZShyZW5kZXJlZE1heEhlaWdodCwgcmVhZGVyV2lkdGgsIHBhZ2UpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmKCAhdGhpcy5mdWxsc2NyZWVuICkge1xuICAgICAgdGhpcy5zdHlsZS5oZWlnaHQgPSB0aGlzLnJlbmRlcmVkSGVpZ2h0KydweCc7XG4gICAgfVxuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjc2luZ2xlLXBhZ2UnKS5zdHlsZS5oZWlnaHQgPSB0aGlzLnJlbmRlcmVkSGVpZ2h0KydweCc7XG5cbiAgICBpZiggdGhpcy52aWV3ID09PSAnc2luZ2xlJyAmJiB0aGlzLmJvb2tWaWV3RGF0YT8ucGFnZXMpIHtcbiAgICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjc2luZ2xlLXBhZ2Utc2Nyb2xsJykuc3R5bGUuaGVpZ2h0ID0gdGhpcy5yZW5kZXJlZEhlaWdodCp0aGlzLmJvb2tWaWV3RGF0YS5wYWdlcy5sZW5ndGgrJ3B4JztcbiAgICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjc2luZ2xlLXBhZ2Utc2Nyb2xsJykuc3R5bGUub3ZlcmZsb3cgPSAnYXV0byc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjc2luZ2xlLXBhZ2Utc2Nyb2xsJykuc3R5bGUuaGVpZ2h0ID0gdGhpcy5yZW5kZXJlZEhlaWdodCsncHgnO1xuICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNzaW5nbGUtcGFnZS1zY3JvbGwnKS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9zZXRQYWdlRGltZW5zaW9uc1xuICAgKiBAZGVzY3JpcHRpb24gY2FsY3VsYXRlIHRoZSBkaW1lbnNpb25zIG9mIGEgcGFnZSBiYXNlZCBvbiBnaXZlbiBoZWlnaHQgYW5kIHdpZHRoXG4gICAqIFxuICAgKiBAcGFyYW0geyp9IHJlYWRlckhlaWdodCBcbiAgICogQHBhcmFtIHsqfSByZWFkZXJXaWR0aCBcbiAgICogQHBhcmFtIHsqfSBwYWdlIFxuICAgKi9cbiAgX3NldFBhZ2VEaW1lbnNpb25zKHJlYWRlckhlaWdodCwgcmVhZGVyV2lkdGgsIHBhZ2UpIHtcbiAgICBsZXQgd2lkdGggPSBwYWdlLndpZHRoO1xuICAgIGxldCBoZWlnaHQgPSBwYWdlLmhlaWdodDtcblxuICAgIHJlYWRlckhlaWdodCA9IHJlYWRlckhlaWdodCAtICh0aGlzLnBhZ2VCdWZmZXIqMik7XG5cbiAgICBsZXQgaXNMYW5kc2NhcGUgPSAod2lkdGgvaGVpZ2h0ID4gMSk7XG4gICAgbGV0IG5ld0hlaWdodCwgbmV3V2lkdGgsIHJhdGlvLCByYXRpb0RpbWVuc2lvbjtcblxuICAgIGlmKCBpc0xhbmRzY2FwZSApIHtcbiAgICAgIHJhdGlvRGltZW5zaW9uID0gJ3dpZHRoJztcbiAgICAgIHJhdGlvID0gcmVhZGVyV2lkdGggLyB3aWR0aDtcbiAgICAgIG5ld1dpZHRoID0gcmVhZGVyV2lkdGg7ICAgICBcbiAgICAgIG5ld0hlaWdodCA9IGhlaWdodCAqIHJhdGlvO1xuXG4gICAgICBpZiggbmV3SGVpZ2h0ID4gcmVhZGVySGVpZ2h0ICkge1xuICAgICAgICByYXRpb0RpbWVuc2lvbiA9ICdoZWlnaHQnO1xuICAgICAgICByYXRpbyA9IHJlYWRlckhlaWdodCAvIGhlaWdodDtcbiAgICAgICAgbmV3SGVpZ2h0ID0gcmVhZGVySGVpZ2h0O1xuICAgICAgICBuZXdXaWR0aCA9IHdpZHRoICogcmF0aW87XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhdGlvRGltZW5zaW9uID0gJ2hlaWdodCc7XG4gICAgICByYXRpbyA9IHJlYWRlckhlaWdodCAvIGhlaWdodDtcbiAgICAgIG5ld0hlaWdodCA9IHJlYWRlckhlaWdodDtcbiAgICAgIG5ld1dpZHRoID0gd2lkdGggKiByYXRpbztcblxuICAgICAgaWYoIG5ld1dpZHRoID4gcmVhZGVyV2lkdGggKSB7XG4gICAgICAgIHJhdGlvRGltZW5zaW9uID0gJ3dpZHRoJztcbiAgICAgICAgcmF0aW8gPSByZWFkZXJXaWR0aCAvIHdpZHRoO1xuICAgICAgICBuZXdXaWR0aCA9IHJlYWRlcldpZHRoO1xuICAgICAgICBuZXdIZWlnaHQgPSBoZWlnaHQgKiByYXRpbztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYWdlLnJlbmRlclJhdGlvRGltZW5zaW9uID0gcmF0aW9EaW1lbnNpb247XG4gICAgcGFnZS5yZW5kZXJSYXRpbyA9IHJhdGlvO1xuICAgIHBhZ2UucmVuZGVySGVpZ2h0ID0gTWF0aC5mbG9vcihuZXdIZWlnaHQpO1xuICAgIHBhZ2UucmVuZGVyV2lkdGggPSBNYXRoLmZsb29yKG5ld1dpZHRoKTtcbiAgICBwYWdlLmlzTGFuZHNjYXBlID0gaXNMYW5kc2NhcGU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfcmVuZGVyUGFnZVNpemVTaW5nbGVcbiAgICogQGRlc2NyaXB0aW9uIHJlbmRlciB0b3AvbGVmdCBvZmZzZXQgb2YgYSBzaW5nbGUgcGFnZVxuICAgKiBcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJlYWRlckhlaWdodCBhdmFpbGFibGUgaGVpZ2h0IGZvciBwYWdlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByZWFkZXJXaWR0aCBhdmFpbGFibGUgd2lkdGggZm9yIHBhZ2VcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhZ2UgcGFnZSBvYmplY3RcbiAgICovXG4gIF9yZW5kZXJQYWdlU2l6ZVNpbmdsZShyZWFkZXJIZWlnaHQsIHJlYWRlcldpZHRoLCBwYWdlKSB7XG4gICAgbGV0IHJlYWxSZWFkZXJIZWlnaHQgPSByZWFkZXJIZWlnaHQ7XG4gICAgdGhpcy5fc2V0UGFnZURpbWVuc2lvbnMocmVhZGVySGVpZ2h0LCByZWFkZXJXaWR0aCwgcGFnZSk7XG4gICAgcGFnZS5yZW5kZXJPZmZzZXRUb3AgPSAocmVhbFJlYWRlckhlaWdodCpwYWdlLmRpc3BsYXlJbmRleCkrdGhpcy5wYWdlQnVmZmVyO1xuICAgIHBhZ2UucmVuZGVyT2Zmc2V0VG9wRm9yU2Nyb2xsID0gcmVhbFJlYWRlckhlaWdodCpwYWdlLmRpc3BsYXlJbmRleDtcbiAgICBwYWdlLnJlbmRlck9mZnNldExlZnQgPSAwO1xuXG4gICAgaWYoIHBhZ2UucmVuZGVyUmF0aW9EaW1lbnNpb24gPT09ICd3aWR0aCcgKSB7XG4gICAgICBwYWdlLnJlbmRlck9mZnNldFRvcCArPSBNYXRoLmZsb29yKChyZWFsUmVhZGVySGVpZ2h0IC0gcGFnZS5yZW5kZXJIZWlnaHQpIC8gMikrdGhpcy5wYWdlQnVmZmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYWdlLnJlbmRlck9mZnNldExlZnQgKz0gTWF0aC5mbG9vcigocmVhZGVyV2lkdGggLSBwYWdlLnJlbmRlcldpZHRoKSAvIDIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9yZW5kZXJQYWdlU2l6ZURvdWJsZVxuICAgKiBAZGVzY3JpcHRpb24gcmVuZGVyIHRvcC9sZWZ0IG9mZnNldCBvZiBhIGRvdWJsZSBwYWdlXG4gICAqIFxuICAgKiBAcGFyYW0ge051bWJlcn0gcmVhZGVySGVpZ2h0IGF2YWlsYWJsZSBoZWlnaHQgZm9yIHBhZ2UgXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByZWFkZXJXaWR0aCBhdmFpbGFibGUgd2lkdGggZm9yIHBhZ2VcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhZ2UgcGFnZSBvYmplY3RcbiAgICovXG4gIF9yZW5kZXJQYWdlU2l6ZURvdWJsZShyZWFkZXJIZWlnaHQsIHJlYWRlcldpZHRoLCBwYWdlKSB7XG4gICAgLy8gZXZlbiBwYWdlcyBhcmUgb24gdGhlIHJpZ2h0XG4gICAgLy8gb2RkIHBhZ2VzIGFyZSBvbiB0aGUgbGVmdCBcbiAgICBsZXQgaXNSaWdodCA9IHBhZ2UuZGlzcGxheUluZGV4ICUgMiA9PT0gMDtcblxuICAgIHRoaXMuX3NldFBhZ2VEaW1lbnNpb25zKHJlYWRlckhlaWdodCwgcmVhZGVyV2lkdGgvMiwgcGFnZSk7XG4gICAgcGFnZS5yZW5kZXJPZmZzZXRUb3AgPSBNYXRoLmZsb29yKChyZWFkZXJIZWlnaHQgLSBwYWdlLnJlbmRlckhlaWdodCkgLyAyKTtcblxuICAgIGxldCBtaWRQb2ludCA9IE1hdGguZmxvb3IocmVhZGVyV2lkdGgvMik7XG4gICAgcGFnZS5yZW5kZXJPZmZzZXRMZWZ0ID0gaXNSaWdodCA/IG1pZFBvaW50IDogbWlkUG9pbnQgLSBwYWdlLnJlbmRlcldpZHRoO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0UGFnZVxuICAgKiBAZGVzY3JpcHRpb24gc2V0IHRoZSBjdXJyZW50IHBhZ2UgdG8gcmVuZGVyXG4gICAqIFxuICAgKiBAcGFyYW0ge051bWJlcn0gcGFnZSBcbiAgICogQHJldHVybnMgXG4gICAqL1xuICBzZXRQYWdlKHBhZ2UpIHtcbiAgICBpZiggdGhpcy5wYWdlID09PSBwYWdlICkgcmV0dXJuO1xuICAgIHRoaXMubGFzdFBhZ2UgPSB0aGlzLnBhZ2U7XG4gICAgdGhpcy5wYWdlID0gcGFnZTtcblxuICAgIC8vIGhhbmRsZSBhbmltYXRpb24gaWYgd2UgYXJlIG9ubHkgbW92aW5nIG9uZSBwYWdlXG4gICAgaWYoIHRoaXMudmlldyA9PT0gJ3NpbmdsZScgKSB7XG4gICAgICBsZXQgc2Nyb2xsVG9wID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNzaW5nbGUtcGFnZScpLnNjcm9sbFRvcDtcbiAgICAgIGxldCBwYWdlRGF0YSA9IHRoaXMuYm9va1ZpZXdEYXRhLnBhZ2VzW3BhZ2VdO1xuXG4gICAgICBpZiggcGFnZURhdGEucmVuZGVyT2Zmc2V0VG9wIDwgc2Nyb2xsVG9wIHx8IFxuICAgICAgICAgIHBhZ2VEYXRhLnJlbmRlck9mZnNldFRvcCtwYWdlRGF0YS5yZW5kZXJIZWlnaHQgPiBzY3JvbGxUb3ArdGhpcy5yZW5kZXJlZEhlaWdodCApIHtcbiAgICAgICAgXG4gICAgICAgIGlmKCBNYXRoLmFicyhwYWdlLXRoaXMubGFzdFBhZ2UpID4gMSApIHtcbiAgICAgICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI3NpbmdsZS1wYWdlJykuc2Nyb2xsVG9wID0gdGhpcy5wYWdlICogdGhpcy5yZW5kZXJlZEhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI3NpbmdsZS1wYWdlJykuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgdG9wOiB0aGlzLnBhZ2UgKiB0aGlzLnJlbmRlcmVkSGVpZ2h0LCAvLyBSZXBsYWNlIDUwMCB3aXRoIHRoZSB2ZXJ0aWNhbCBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucmVyZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFZpZXdcbiAgICogQGRlc2NyaXB0aW9uIHNldCB0aGUgY3VycmVudCB2aWV3IHRvIHJlbmRlci4gIGVpdGhlciAnc2luZ2xlJyBvciAnZG91YmxlJ1xuICAgKiBcbiAgICogQHBhcmFtIHsqfSB2aWV3IFxuICAgKiBAcmV0dXJucyBcbiAgICovXG4gIHNldFZpZXcodmlldykge1xuICAgIGlmKCB0aGlzLnZpZXcgPT09IHZpZXcgKSByZXR1cm47XG4gICAgdGhpcy52aWV3ID0gdmlldztcblxuICAgIC8vIGhpZGUgcGFnZXMgd2hpbGUgd2UgdXBkYXRlIHNpemUvcG9zaXRpb25cbiAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI3NpbmdsZS1wYWdlLXNjcm9sbCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAvLyByZW5kZXIgY3VycmVudCBwYWdlcyBiYXNlZCBvbiBuZXcgdmlld1xuICAgIHRoaXMucmVyZW5kZXIoe2Z1bGw6IHRydWUsIGFuaW1hdGU6IGZhbHNlfSk7XG5cbiAgICAvLyBzaG93IHBhZ2VzIG5vdyB0aGF0IHRoZXkgYXJlIHVwZGF0ZWRcbiAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI3NpbmdsZS1wYWdlLXNjcm9sbCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgLy8gaWYgc2luZ2xlIHZpZXcsIG1ha2Ugc3VyZSB3ZSBhcmUgc2Nyb2xsZWQgdG8gdGhlIGN1cnJlbnQgcGFnZVxuICAgIGlmKCB0aGlzLnZpZXcgPT09ICdzaW5nbGUnICYmIHRoaXMuYm9va1ZpZXdEYXRhLnBhZ2VzICkge1xuICAgICAgbGV0IGN1cnJlbnRQYWdlID0gdGhpcy5ib29rVmlld0RhdGEucGFnZXNbdGhpcy5wYWdlXTtcbiAgICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjc2luZ2xlLXBhZ2UnKS5zY3JvbGxUb3AgPSBjdXJyZW50UGFnZS5yZW5kZXJPZmZzZXRUb3BGb3JTY3JvbGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX3JlbmRlckN1cnJlbnRQYWdlc1xuICAgKiBAZGVzY3JpcHRpb24gcmVuZGVyIHRoZSBjdXJyZW50IHBhZ2VzIGJhc2VkIG9uIHRoZSBjdXJyZW50IHZpZXcgYW5kIHBhZ2UuXG4gICAqIFRoaXMgZG9lcyBub3QgdXBkYXRlIHRoZSBwYWdlIHNpemVzLCBvbmx5IHRoZSBlbnN1cmVzIHRoZSBjdXJyZW50IHBhZ2VzIGFyZVxuICAgKiBpbiB2aWV3IGFuZCBoYXZlIHByb3BlciBjc3MgY2xhc3Nlcy9zdHlsZXMgYXBwbGllZCBiYXNlZCBvbiBwb3NpdGlvbi4gIFBvc2l0aW9uL3NpemVzXG4gICAqIGFyZSBkZXRlcm1pbmVkIGJ5IHRoZSBfcmVuZGVyQWxsUGFnZVNpemVzIG1ldGhvZC5cbiAgICogXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0cy5hbmltYXRlIGFuaW1hdGUgdHJhbnNpdGlvbnMgYmV0d2VlbiBwYWdlcyAoZGVmYXVsdCB0cnVlKSBcbiAgICogQHJldHVybnMgXG4gICAqL1xuICBfcmVuZGVyQ3VycmVudFBhZ2VzKG9wdHM9e30pIHtcbiAgICBpZiggIXRoaXMuYm9va1ZpZXdEYXRhLnBhZ2VzICkgcmV0dXJuO1xuICAgIGxldCBjdXJyZW50UGFnZXMgPSBbXTtcblxuICAgIGlmKCBvcHRzLmFuaW1hdGUgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIG9wdHMuYW5pbWF0ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYoIHRoaXMudmlldyA9PT0gJ3NpbmdsZScgKSB7XG4gICAgICBmb3IoIGxldCBpID0gdGhpcy5wYWdlLTI7IGkgPD0gdGhpcy5wYWdlKzI7IGkrKyApIHtcbiAgICAgICAgaWYoIGkgPCAwIHx8IGkgPj0gdGhpcy5ib29rVmlld0RhdGEucGFnZXMubGVuZ3RoICkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRQYWdlcy5wdXNoKGkpO1xuICAgICAgICBsZXQgcGFnZUVsZSA9IHRoaXMucGFnZXMuZmluZChwID0+IHAuaW5kZXggPT09IGkpO1xuICAgICAgICBpZiggcGFnZUVsZSApIHtcbiAgICAgICAgICBwYWdlRWxlLmVsZS5jbGFzc05hbWUgPSAnJztcbiAgICAgICAgICBwYWdlRWxlLmVsZS5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1Y2RsaWItYm9va3JlYWRlci1wYWdlJyk7XG4gICAgICAgIGVsZS5zZXRBdHRyaWJ1dGUoJ3BhZ2UnLCBpKTtcbiAgICAgICAgZWxlLmJvb2tEYXRhID0gdGhpcy5ib29rVmlld0RhdGE7XG4gICAgICAgIGVsZS5kZWJ1ZyA9IHRoaXMuZGVidWc7XG4gICAgICAgIGVsZS5idWZmZXIgPSB0aGlzLnBhZ2VCdWZmZXI7XG4gICAgICAgIGVsZS5hbmltYXRpbmcgPSB0aGlzLmFuaW1hdGluZztcbiAgICAgICAgdGhpcy5wYWdlc0VsZS5hcHBlbmRDaGlsZChlbGUpO1xuICAgICAgICB0aGlzLnBhZ2VzLnB1c2goe2luZGV4OiBpLCBlbGV9KTtcbiAgICAgIH1cblxuICAgICAgXG4gICAgfSBlbHNlIGlmKCB0aGlzLnZpZXcgPT09ICdkb3VibGUnICkge1xuICAgICAgbGV0IGlzRXZlbiA9IHRoaXMucGFnZSAlIDIgPT09IDA7XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoaXMgc2hvdWxkIGJlIGFuaW1hdGVkXG4gICAgICBsZXQgdmlzaWJsZVBhZ2VzID0gW107XG4gICAgICBsZXQgbmV4dFBhZ2VzID0gW107XG4gICAgICBsZXQgcHJldlBhZ2VzID0gW107XG4gICAgICBpZiggdGhpcy5sYXN0UGFnZSAlIDIgPT09IDAgKSB7XG4gICAgICAgIHZpc2libGVQYWdlcyA9IFt0aGlzLmxhc3RQYWdlLTEsIHRoaXMubGFzdFBhZ2VdO1xuICAgICAgICBuZXh0UGFnZXMgPSBbdGhpcy5sYXN0UGFnZSsxLCB0aGlzLmxhc3RQYWdlKzJdO1xuICAgICAgICBwcmV2UGFnZXMgPSBbdGhpcy5sYXN0UGFnZS0yLCB0aGlzLmxhc3RQYWdlLTNdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmlzaWJsZVBhZ2VzID0gW3RoaXMubGFzdFBhZ2UsIHRoaXMubGFzdFBhZ2UrMV07XG4gICAgICAgIG5leHRQYWdlcyA9IFt0aGlzLmxhc3RQYWdlKzIsIHRoaXMubGFzdFBhZ2UrM107XG4gICAgICAgIHByZXZQYWdlcyA9IFt0aGlzLmxhc3RQYWdlLTEsIHRoaXMubGFzdFBhZ2UtMl07XG4gICAgICB9XG4gICAgICBcblxuICAgICAgbGV0IGlzQW5pbWF0ZU5leHQgPSBuZXh0UGFnZXMuaW5jbHVkZXModGhpcy5wYWdlKTtcbiAgICAgIGxldCBpc0FuaW1hdGVQcmV2ID0gcHJldlBhZ2VzLmluY2x1ZGVzKHRoaXMucGFnZSk7XG5cbiAgICAgIGxldCBjc3NPcmRlciA9IFtcbiAgICAgICAgWydwYWdlLWxlZnQtcHJldiddLFxuICAgICAgICBbJ3BhZ2UtcmlnaHQtcHJldiddLFxuICAgICAgICBbJ3BhZ2UtbGVmdCddLFxuICAgICAgICBbJ3BhZ2UtcmlnaHQnXSxcbiAgICAgICAgWydwYWdlLWxlZnQtbmV4dCddLFxuICAgICAgICBbJ3BhZ2UtcmlnaHQtbmV4dCddXG4gICAgICBdXG5cbiAgICAgIGlmKCAoaXNBbmltYXRlTmV4dCB8fCBpc0FuaW1hdGVQcmV2KSAmJiBvcHRzLmFuaW1hdGUpIHtcbiAgICAgICAgdGhpcy5fYW5pbWF0ZURvdWJsZVBhZ2Uoe2lzQW5pbWF0ZU5leHQsIGlzQW5pbWF0ZVByZXYsIGNzc09yZGVyfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gcmlnaHQgcGFnZVxuICAgICAgaWYoIGlzRXZlbiApIHtcbiAgICAgICAgZm9yKCBsZXQgaSA9IHRoaXMucGFnZS0zOyBpIDw9IHRoaXMucGFnZSsyOyBpKysgKSB7XG4gICAgICAgICAgY3VycmVudFBhZ2VzLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgIC8vIGxlZnQgcGFnZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKCBsZXQgaSA9IHRoaXMucGFnZS0yOyBpIDw9IHRoaXMucGFnZSszOyBpKysgKSB7XG4gICAgICAgICAgY3VycmVudFBhZ2VzLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGNzc0luZGV4ID0gMDtcbiAgICAgIGN1cnJlbnRQYWdlcy5mb3JFYWNoKGkgPT4ge1xuICAgICAgICBpZiggaSA8IDAgfHwgaSA+PSB0aGlzLmJvb2tWaWV3RGF0YS5wYWdlcy5sZW5ndGggKSB7XG4gICAgICAgICAgY3NzSW5kZXgrKztcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBhZ2VFbGUgPSB0aGlzLnBhZ2VzLmZpbmQocCA9PiBwLmluZGV4ID09PSBpKTtcbiAgICAgICAgaWYoIHBhZ2VFbGUgKSB7XG4gICAgICAgICAgdGhpcy5fdXBkYXRlQ3NzKHBhZ2VFbGUuZWxlLCBjc3NPcmRlcltjc3NJbmRleF0pO1xuICAgICAgICAgIHBhZ2VFbGUuY3NzSW5kZXggPSBjc3NJbmRleDtcbiAgICAgICAgICBwYWdlRWxlLmVsZS5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICAgICAgICByZXR1cm4gY3NzSW5kZXgrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1Y2RsaWItYm9va3JlYWRlci1wYWdlJyk7XG4gICAgICAgIGVsZS5zZXRBdHRyaWJ1dGUoJ3BhZ2UnLCBpKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ3NzKGVsZSwgY3NzT3JkZXJbY3NzSW5kZXhdKTtcbiAgICAgICAgZWxlLmJvb2tEYXRhID0gdGhpcy5ib29rVmlld0RhdGE7XG4gICAgICAgIGVsZS5kZWJ1ZyA9IHRoaXMuZGVidWc7XG4gICAgICAgIGVsZS5idWZmZXIgPSB0aGlzLnBhZ2VCdWZmZXI7XG4gICAgICAgIGVsZS5hbmltYXRpbmcgPSB0aGlzLmFuaW1hdGluZztcbiAgICAgICAgdGhpcy5wYWdlc0VsZS5hcHBlbmRDaGlsZChlbGUpO1xuICAgICAgICB0aGlzLnBhZ2VzLnB1c2goe1xuICAgICAgICAgIGluZGV4OiBpLCBcbiAgICAgICAgICBlbGUsIFxuICAgICAgICAgIGNzc0luZGV4LFxuICAgICAgICAgIGlzTmV4dCA6IGNzc09yZGVyW2Nzc0luZGV4XS5pbmNsdWRlcygnbmV4dCcpLFxuICAgICAgICAgIGlzUHJldiA6IGNzc09yZGVyW2Nzc0luZGV4XS5pbmNsdWRlcygncHJldicpXG4gICAgICAgIH0pO1xuICAgICAgICBjc3NJbmRleCsrO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yKCBsZXQgaSA9IHRoaXMucGFnZXMubGVuZ3RoLTE7IGkgPj0gMDsgaS0tICkge1xuICAgICAgbGV0IHBhZ2UgPSB0aGlzLnBhZ2VzW2ldO1xuICAgICAgaWYoIGN1cnJlbnRQYWdlcy5pbmRleE9mKHBhZ2UuaW5kZXgpID09PSAtMSApIHtcbiAgICAgICAgcGFnZS5lbGUucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMucGFnZXMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9hbmltYXRlRG91YmxlUGFnZVxuICAgKiBAZGVzY3JpcHRpb24gYW5pbWF0ZSB0aGUgdHJhbnNpdGlvbiBiZXR3ZWVuIGRvdWJsZSBwYWdlcy4gIFRoaXMgd2lsbCBhZGQgY3NzIGNsYXNzZXNcbiAgICogdG8gdGhlIGN1cnJlbnQgcGFnZXMgdG8gYW5pbWF0ZSB0aGVtIG91dCBvZiB2aWV3LlxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gcHJvcHMuaXNBbmltYXRlTmV4dCBpcyB0aGUgbmV4dCBwYWdlIGJlaW5nIGFuaW1hdGVkXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gcHJvcHMuaXNBbmltYXRlUHJldiBpcyB0aGUgcHJldiBwYWdlIGJlaW5nIGFuaW1hdGVkXG4gICAqIEBwYXJhbSB7QXJyYXl9IHByb3BzLmNzc09yZGVyIGFycmF5IG9mIGNzcyBjbGFzc2VzIHRvIGFwcGx5IHRvIGVhY2ggcGFnZSBcbiAgICovXG4gIF9hbmltYXRlRG91YmxlUGFnZShwcm9wcykge1xuICAgIHRoaXMuQm9va1JlYWRlck1vZGVsLnNldEFuaW1hdGluZyh0cnVlKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbygnYW5pbWF0ZSBkb3VibGUgcGFnZSBzdGFydCcsIHByb3BzKTtcbiAgICAgIGlmKCBwcm9wcy5pc0FuaW1hdGVOZXh0ICkge1xuICAgICAgICBwcm9wcy5jc3NPcmRlci5mb3JFYWNoKGNzcyA9PiBjc3MucHVzaCgnYW5pbWF0ZS1uZXh0LXN0YXJ0JykpO1xuICAgICAgfSBlbHNlIGlmKCBwcm9wcy5pc0FuaW1hdGVQcmV2ICkge1xuICAgICAgICBwcm9wcy5jc3NPcmRlci5mb3JFYWNoKGNzcyA9PiBjc3MucHVzaCgnYW5pbWF0ZS1wcmV2LXN0YXJ0JykpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBhZ2VzLmZvckVhY2gocGFnZSA9PiB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNzcyhwYWdlLmVsZSwgcHJvcHMuY3NzT3JkZXJbcGFnZS5jc3NJbmRleF0pO1xuICAgICAgfSk7XG5cbiAgICAgIFxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ2FuaW1hdGUgZG91YmxlIHBhZ2UgbWlkZGxlJywgcHJvcHMpO1xuICAgICAgICB0aGlzLnBhZ2VzLmZvckVhY2gocGFnZSA9PiB7XG4gICAgICAgICAgaWYoIHByb3BzLmlzQW5pbWF0ZU5leHQgKSB7XG4gICAgICAgICAgICBwYWdlLmVsZS5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRlLW5leHQtc3RhcnQnKTtcbiAgICAgICAgICAgIHBhZ2UuZWxlLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtbmV4dC1lbmQnKTtcbiAgICAgICAgICB9IGVsc2UgaWYoIHByb3BzLmlzQW5pbWF0ZVByZXYgKSB7XG4gICAgICAgICAgICBwYWdlLmVsZS5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRlLXByZXYtc3RhcnQnKTtcbiAgICAgICAgICAgIHBhZ2UuZWxlLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtcHJldi1lbmQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ2FuaW1hdGUgZG91YmxlIHBhZ2UgZW5kJywgcHJvcHMpO1xuICAgICAgICAgIHRoaXMuX3JlbmRlckN1cnJlbnRQYWdlcyh7YW5pbWF0ZTogZmFsc2V9KTtcbiAgICAgICAgICB0aGlzLkJvb2tSZWFkZXJNb2RlbC5zZXRBbmltYXRpbmcoZmFsc2UpO1xuICAgICAgICB9LCAodGhpcy5hbmltYXRpb25UaW1lLzIpKjEwMDApO1xuICAgICAgfSwgKHRoaXMuYW5pbWF0aW9uVGltZS8yKSoxMDAwKTtcbiAgICB9LCAyNSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfdXBkYXRlQ3NzXG4gICAqIEBkZXNjcmlwdGlvbiBoZWxwZXIgZm9yIHVwZGF0aW5nIGNzcyBjbGFzc2VzIG9uIGFuIGVsZW1lbnQuXG4gICAqIENsZWFycyBhbGwgY2xhc3NlcyBhbmQgYWRkcyB0aGUgZ2l2ZW4gbGlzdC5cbiAgICogXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlIFxuICAgKiBAcGFyYW0ge0FycmF5fSBjbGFzc0xpc3QgXG4gICAqL1xuICBfdXBkYXRlQ3NzKGVsZSwgY2xhc3NMaXN0KSB7XG4gICAgZWxlLmNsYXNzTGlzdCA9ICcnO1xuICAgIGNsYXNzTGlzdC5mb3JFYWNoKG5hbWUgPT4gZWxlLmNsYXNzTGlzdC5hZGQobmFtZSkpO1xuICB9XG5cbiAgLy8gX29uU2Nyb2xsKGUpIHtcbiAgLy8gICBpZiggdGhpcy52aWV3ICE9PSAnc2luZ2xlJyApIHJldHVybjtcblxuICAvLyAgIGlmKCB0aGlzLnNjcm9sbFRpbWVvdXQgKSB7XG4gIC8vICAgICByZXR1cm47XG4gIC8vICAgfVxuICAgIFxuICAvLyAgIHRoaXMuc2Nyb2xsVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAvLyAgICAgdGhpcy5zY3JvbGxUaW1lb3V0ID0gbnVsbDtcbiAgLy8gICAgIHRoaXMuX3VwZGF0ZVBhZ2VGcm9tU2Nyb2xsKCk7XG4gIC8vICAgfSwgMjAwKTtcbiAgLy8gfVxuXG4gIF9vblJlc2l6ZSgpIHtcbiAgICBpZiggdGhpcy5yZXNpemVUaW1lb3V0ICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLnJlc2l6ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucmVzaXplVGltZW91dCA9IG51bGw7XG4gICAgICB0aGlzLnJlcmVuZGVyKHtmdWxsOiB0cnVlLCBhbmltYXRlOiBmYWxzZX0pO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICAvLyBfdXBkYXRlUGFnZUZyb21TY3JvbGwoKSB7XG4gIC8vICAgbGV0IHNjcm9sbFRvcCA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjc2luZ2xlLXBhZ2UnKS5zY3JvbGxUb3A7XG4gIC8vICAgbGV0IHBhZ2UgPSBNYXRoLnJvdW5kKHNjcm9sbFRvcCAvIHRoaXMuaGVpZ2h0KTtcbiAgXG4gIC8vICAgaWYoIHRoaXMucGFnZSA9PT0gcGFnZSApIHJldHVybjtcbiAgLy8gICAvLyBjaGVhdC4gIHRoaXMgd2lsbCB0cmljayB0aGUgc2V0UGFnZSBtZXRob2QgaW50byBub3Qgc2Nyb2xsaW5nXG4gIC8vICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgLy8gICB0aGlzLl9yZW5kZXJDdXJyZW50UGFnZXMoe2FuaW1hdGU6IGZhbHNlfSk7XG4gIC8vICAgdGhpcy5Cb29rUmVhZGVyTW9kZWwuc2V0UGFnZShwYWdlKTtcbiAgLy8gICB0aGlzLmxvZ2dlci5pbmZvKCdjaGFuZ2UgcGFnZSBmcm9tIHNjcm9sbCcsIHtjdXJyZW50OiB0aGlzLnBhZ2UsIHRvOiBwYWdlfSk7XG4gIC8vIH07XG5cbiAgdXBkYXRlU2VhcmNoUmVzdWx0cyhzZWFyY2hSZXN1bHRzPVtdKSB7XG4gICAgbGV0IG5hdiA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCd1Y2RsaWItYm9va3JlYWRlci1uYXZiYXInKTtcbiAgICBpZiggbmF2ICkgbmF2LnVwZGF0ZVNlYXJjaFJlc3VsdHMoc2VhcmNoUmVzdWx0cyk7XG4gIH1cblxuICBfb25Nb3VzZWRvd24oZSkge1xuICAgIGlmKCAhdGhpcy5mdWxsc2NyZWVuICkgcmV0dXJuO1xuICAgIGlmKCB0aGlzLnBhbiApIHJldHVybjtcblxuICAgIGxldCB7Y2xpZW50WCwgY2xpZW50WX0gPSBlO1xuICAgIGlmKCAhY2xpZW50WCAmJiBlLnRvdWNoZXMgJiYgZS50b3VjaGVzLmxlbmd0aCAgKSB7XG4gICAgICBjbGllbnRYID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgICBjbGllbnRZID0gZS50b3VjaGVzWzBdLmNsaWVudFk7XG4gICAgfVxuXG4gICAgdGhpcy5wYW4gPSB7XG4gICAgICBzdGFydFg6IGNsaWVudFgsXG4gICAgICBzdGFydFk6IGNsaWVudFksXG4gICAgICBvZmZzZXRYU3RhcnQ6IHRoaXMub2Zmc2V0WCxcbiAgICAgIG9mZnNldFlTdGFydDogdGhpcy5vZmZzZXRZXG4gICAgfVxuICB9XG5cbiAgX29uTW91c2V1cChlKSB7XG4gICAgaWYoICF0aGlzLnBhbiApIHJldHVybjtcbiAgICB0aGlzLnBhbiA9IG51bGw7XG4gIH1cblxuICBfb25Nb3VzZW1vdmUoZSkge1xuICAgIGlmKCAhdGhpcy5wYW4gKSByZXR1cm47XG5cbiAgICB0cnkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0gY2F0Y2goZSkge31cblxuICAgIGlmKCBlLnRvdWNoZXMgJiYgZS50b3VjaGVzLmxlbmd0aCA+IDEgJiYgIXRoaXMucGFuLnRvdWNoWm9vbSApIHtcbiAgICAgIHRoaXMucGFuLnRvdWNoWm9vbSA9IHtcbiAgICAgICAgc3RhcnRab29tOiB0aGlzLkJvb2tSZWFkZXJNb2RlbC5zdG9yZS5kYXRhLnN0YXRlLnpvb21JbmRleCxcbiAgICAgICAgc3RhcnRYRGlmZjogTWF0aC5hYnMoZS50b3VjaGVzWzBdLmNsaWVudFggLSBlLnRvdWNoZXNbMV0uY2xpZW50WCksXG4gICAgICAgIHN0YXJ0WURpZmY6IE1hdGguYWJzKGUudG91Y2hlc1swXS5jbGllbnRZIC0gZS50b3VjaGVzWzFdLmNsaWVudFkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoIHRoaXMucGFuLnRvdWNoWm9vbSApIHtcbiAgICAgIC8vIGlnbm9yZSB6b29tIGlmIG9ubHkgMSB0b3VjaFxuICAgICAgaWYoIGUudG91Y2hlcyAmJiBlLnRvdWNoZXMubGVuZ3RoIDw9IDEgICkge1xuICAgICAgICB0aGlzLnBhbi50b3VjaFpvb20gPSBudWxsO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBsZXQgbmV3WURpZmYgPSBNYXRoLmFicyhlLnRvdWNoZXNbMF0uY2xpZW50WSAtIGUudG91Y2hlc1sxXS5jbGllbnRZKTtcbiAgICAgIGxldCBuZXdYRGlmZiA9IE1hdGguYWJzKGUudG91Y2hlc1swXS5jbGllbnRYIC0gZS50b3VjaGVzWzFdLmNsaWVudFgpO1xuXG4gICAgICBsZXQgZGVsdGFYID0gbmV3WERpZmYgLSB0aGlzLnBhbi50b3VjaFpvb20uc3RhcnRYRGlmZjtcbiAgICAgIGxldCBkZWx0YVkgPSBuZXdZRGlmZiAtIHRoaXMucGFuLnRvdWNoWm9vbS5zdGFydFlEaWZmO1xuICAgICAgbGV0IHpvb20gPSB0aGlzLnBhbi50b3VjaFpvb20uc3RhcnRab29tICsgKE1hdGguZmxvb3IoKGRlbHRhWCArIGRlbHRhWSkgLyAxMDApICk7XG4gICAgICB0aGlzLkJvb2tSZWFkZXJNb2RlbC5zZXRab29tKHpvb20pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB7Y2xpZW50WCwgY2xpZW50WX0gPSBlO1xuICAgIGlmKCAhY2xpZW50WCAmJiBlLnRvdWNoZXMgJiYgZS50b3VjaGVzLmxlbmd0aCAgKSB7XG4gICAgICBjbGllbnRYID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgICBjbGllbnRZID0gZS50b3VjaGVzWzBdLmNsaWVudFk7XG4gICAgfVxuXG4gICAgbGV0IGRlbHRhWCA9IGNsaWVudFggLSB0aGlzLnBhbi5zdGFydFg7XG4gICAgbGV0IGRlbHRhWSA9IGNsaWVudFkgLSB0aGlzLnBhbi5zdGFydFk7XG4gICAgbGV0IG9mZnNldFggPSB0aGlzLnBhbi5vZmZzZXRYU3RhcnQgKyBkZWx0YVg7XG4gICAgbGV0IG9mZnNldFkgPSB0aGlzLnBhbi5vZmZzZXRZU3RhcnQgKyBkZWx0YVk7XG4gICAgdGhpcy5Cb29rUmVhZGVyTW9kZWwuc2V0UGFuKG9mZnNldFgsIG9mZnNldFkpO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgndWNkbGliLWJvb2tyZWFkZXInLCBVY2RsaWJCb29rcmVhZGVyKTsiLCJpbXBvcnQgeyBodG1sLCBjc3MgfSBmcm9tICdsaXQnO1xuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVzKCkge1xuICBjb25zdCBlbGVtZW50U3R5bGVzID0gY3NzYFxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cblxuICAgIHVjZGxpYi1ib29rcmVhZGVyLXNsaWRlcixcbiAgICB1Y2RsaWItYm9va3JlYWRlci1uYXZiYXIge1xuICAgICAgd2lkdGg6IDYwJTtcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIH1cblxuICAgIDpob3N0KFtmdWxsc2NyZWVuXSkge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICBwYWRkaW5nOiAwcHg7XG4gICAgICBtYXJnaW46IDBweDtcbiAgICAgIHRvcDogMHB4O1xuICAgICAgbGVmdDogMHB4O1xuICAgICAgcmlnaHQ6IDBweDtcbiAgICAgIGJvdHRvbTogMHB4O1xuICAgICAgaGVpZ2h0OiBjYWxjKDEwMHZoLTMuNWVtKTtcbiAgICAgIHotaW5kZXg6IDMwMDA7XG4gICAgfVxuXG4gICAgI3NpbmdsZS1wYWdlIHtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuXG4gICAgLyogI3NpbmdsZS1wYWdlW2Z1bGxzY3JlZW5dIHtcbiAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIH0gKi9cblxuICAgICNzaW5nbGUtcGFnZS1zY3JvbGwge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cbiAgICBcbiAgICAjc2luZ2xlLXBhZ2UgdWNkbGliLWJvb2tyZWFkZXItcGFnZSB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgfVxuXG4gICAgdWNkbGliLWJvb2tyZWFkZXItbmF2YmFyIHtcbiAgICAgIHdpZHRoOiA2MCU7XG4gICAgICBtYXJnaW46IDAgYXV0bztcbiAgICB9XG5cbiAgICB1Y2RsaWItYm9va3JlYWRlci1uYXZiYXJbZnVsbHNjcmVlbl0ge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgei1pbmRleDogNDAwMDtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICByaWdodDogMDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS0zMCk7XG4gICAgICBwYWRkaW5nOiAuNXJlbSAwO1xuICAgIH1cblxuICAgIC8qIHVjZGxpYi1ib29rcmVhZGVyLW5hdmJhcltmdWxsc2NyZWVuXSAuYnItbmF2LWJhciB7XG4gICAgICB3aWR0aDogOTclO1xuICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgfSAqL1xuXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gICAgICB1Y2RsaWItYm9va3JlYWRlci1zbGlkZXIsXG4gICAgICB1Y2RsaWItYm9va3JlYWRlci1uYXZiYXIge1xuICAgICAgICB3aWR0aDogOTAlO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgYDtcblxuICByZXR1cm4gW2VsZW1lbnRTdHlsZXNdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKCkgeyBcbnJldHVybiBodG1sYFxuXG4gIDxkaXYgaWQ9XCJwYWdlLWNvbnRhaW5lclwiPlxuICAgIDxkaXYgaWQ9XCJzaW5nbGUtcGFnZVwiIFxuICAgICAgP2Z1bGxzY3JlZW49XCIke3RoaXMuZnVsbHNjcmVlbn1cIiBcbiAgICAgID5cbiAgICAgIDxkaXYgaWQ9XCJzaW5nbGUtcGFnZS1zY3JvbGxcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIDxkaXYgaWQ9XCJkb3VibGUtcGFnZVwiID9oaWRkZW49XCIke3RoaXMudmlldyAhPT0gJ2RvdWJsZSd9XCI+IFxuICAgIDwvZGl2PiAtLT5cbiAgPC9kaXY+XG4gIDx1Y2RsaWItYm9va3JlYWRlci1uYXZiYXIgP2Z1bGxzY3JlZW49XCIke3RoaXMuZnVsbHNjcmVlbn1cIj48L3VjZGxpYi1ib29rcmVhZGVyLW5hdmJhcj5cbmA7fSIsImltcG9ydCB7IExpdEVsZW1lbnR9IGZyb20gJ2xpdCc7XG5pbXBvcnQgcmVuZGVyIGZyb20gJy4vY2l0YXRpb24udHBsLmpzJztcblxuaW1wb3J0IGNpdGF0aW9ucyBmcm9tICcuLi8uLi9saWIvbW9kZWxzL0NpdGF0aW9uc01vZGVsJztcblxuaW1wb3J0ICcuLi91dGlscy9hcHAtdG9hc3QtcG9wdXAuanMnO1xuXG4vKipcbiAqIEBjbGFzcyBDaXRhdGlvblxuICogQGRlc2NyaXB0aW9uIFN0eWxlaXplZCBVSSBjb21wb25lbnQgZm9yIENpdGF0aW9uc1xuICovXG5leHBvcnQgY2xhc3MgQ2l0YXRpb24gZXh0ZW5kcyBMaXRFbGVtZW50IHtcbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBjb3VudCA6IHt0eXBlIDogU3RyaW5nfSxcbiAgICAgIC8vIGNob2ljZXM6IHsgdHlwZSA6IEFycmF5IH0sXG4gICAgICByZWNvcmQ6IHt0eXBlIDogT2JqZWN0fSxcbiAgICAgIHJlY29yZElkOiB7dHlwZSA6IFN0cmluZ30sXG4gICAgICBjaXRhdGlvbnMgOiB7dHlwZSA6IEFycmF5fSxcbiAgICAgIHNlbGVjdGVkQ2l0YXRpb24gOiB7dHlwZSA6IE9iamVjdH0sXG4gICAgICBjaXRhdGlvblR5cGVMYWJlbCA6IHt0eXBlIDogU3RyaW5nLCBhdHRyaWJ1dGUgOiAnY2l0YXRpb24tdHlwZS1sYWJlbCd9XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgXG4gICAgdGhpcy5yZWNvcmQgPSB7fTtcbiAgICB0aGlzLnJlY29yZElkID0gJyc7XG4gICAgdGhpcy5jaXRhdGlvbnMgPSBbXTtcbiAgICB0aGlzLnNlbGVjdGVkQ2l0YXRpb24gPSB7fTtcbiAgICB0aGlzLmNpdGF0aW9uVHlwZUxhYmVsID0gJ0NvbGxlY3Rpb24nO1xuICAgIFxuICB9XG5cbiAgYXN5bmMgdXBkYXRlZCgpIHtcbiAgICBpZiggIU9iamVjdC5rZXlzKHRoaXMucmVjb3JkIHx8IHt9KS5sZW5ndGggfHwgKCB0aGlzLmNpdGF0aW9ucy5sZW5ndGggJiYgdGhpcy5yZWNvcmRJZCA9PT0gdGhpcy5yZWNvcmRbJ0BpZCddKSApIHJldHVybjtcblxuICAgIHRoaXMucmVjb3JkSWQgPSB0aGlzLnJlY29yZFsnQGlkJ107XG4gICAgbGV0IG5ld0NpdGF0aW9ucyA9IFtdO1xuXG4gICAgbmV3Q2l0YXRpb25zLnB1c2goe1xuICAgICAgdHlwZSA6ICdtbGEnLFxuICAgICAgdGV4dCA6IGF3YWl0IGNpdGF0aW9ucy5yZW5kZXJFc1JlY29yZCh0aGlzLnJlY29yZCwgJ21sYScpXG4gICAgfSk7XG4gICAgbmV3Q2l0YXRpb25zLnB1c2goe1xuICAgICAgdHlwZSA6ICdhcGEnLFxuICAgICAgdGV4dCA6IGF3YWl0IGNpdGF0aW9ucy5yZW5kZXJFc1JlY29yZCh0aGlzLnJlY29yZCwgJ2FwYScpXG4gICAgfSk7XG4gICAgbmV3Q2l0YXRpb25zLnB1c2goe1xuICAgICAgdHlwZSA6ICdjaGljYWdvJyxcbiAgICAgIHRleHQgOiBhd2FpdCBjaXRhdGlvbnMucmVuZGVyRXNSZWNvcmQodGhpcy5yZWNvcmQsICdjaGljYWdvJylcbiAgICB9KTtcblxuICAgIHRoaXMuY2l0YXRpb25zID0gbmV3Q2l0YXRpb25zO1xuICAgIHRoaXMuc2VsZWN0ZWRDaXRhdGlvbiA9IG5ld0NpdGF0aW9ucy5maWx0ZXIoYyA9PiBjLnR5cGUgPT09ICdhcGEnKVswXTtcbiAgfVxuXG4gIF9jaXRlQ2hhbmdlKGUpIHtcbiAgICB0aGlzLnNlbGVjdGVkQ2l0YXRpb24gPSB0aGlzLmNpdGF0aW9ucy5maWx0ZXIoYyA9PiBjLnR5cGUgPT09IGUudGFyZ2V0LnZhbHVlKVswXTtcbiAgfVxuXG4gIGFzeW5jIF9jb3B5Q2l0ZVRleHQoZSkge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLmNzbC1lbnRyeScpLmlubmVySFRNTCk7XG4gICAgICBsZXQgdG9hc3RQb3B1cCA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdhcHAtdG9hc3QtcG9wdXAnKTtcbiAgICAgIGlmKCB0b2FzdFBvcHVwICkgdG9hc3RQb3B1cC5zaG93UG9wdXAoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKCdGYWlsZWQgdG8gY29weSBjaXRhdGlvbjogJywgZXJyKTtcbiAgICB9XG4gIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2FwcC1jaXRhdGlvbicsIENpdGF0aW9uKTtcbiIsImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQnO1xuaW1wb3J0IHsgdW5zYWZlSFRNTCB9IGZyb20gJ2xpdC9kaXJlY3RpdmVzL3Vuc2FmZS1odG1sLmpzJztcblxuaW1wb3J0IFNoYXJlZEh0bWwgZnJvbSAnLi4vdXRpbHMvc2hhcmVkLWh0bWwnO1xuLy8gaW1wb3J0IHNoYXJlZFN0eWxlc0NzcyBmcm9tIFwiLi4vc3R5bGVzL3NoYXJlZC1zdHlsZXNcIjtcbmltcG9ydCB7IHNoYXJlZFN0eWxlcyB9IGZyb20gXCIuLi9zdHlsZXMvc2hhcmVkLXN0eWxlc1wiO1xuXG4vLyBpbXBvcnQgeyBjbGFzc01hcCB9IGZyb20gJ2xpdC9kaXJlY3RpdmVzL2NsYXNzLW1hcCc7XG4vLyBpbXBvcnQgeyBzdHlsZU1hcCB9IGZyb20gJ2xpdC9kaXJlY3RpdmVzL3N0eWxlLW1hcCc7XG5cbmltcG9ydCBsaW5rc0NzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy8xX2Jhc2VfaHRtbC9fbGlua3MuY3NzXCI7XG5pbXBvcnQgYnV0dG9uc0NzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy8yX2Jhc2VfY2xhc3MvX2J1dHRvbnMuY3NzXCI7XG5pbXBvcnQgaGVhZGluZ3NDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvMl9iYXNlX2NsYXNzL19oZWFkaW5ncy5jc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyKCkgeyBcbnJldHVybiBodG1sYFxuPHN0eWxlPlxuICAke3NoYXJlZFN0eWxlc31cbiAgJHtsaW5rc0Nzc31cbiAgJHtidXR0b25zQ3NzfVxuICAke2hlYWRpbmdzQ3NzfVxuICBcbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zdXBlci1saWdodC1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgfVxuXG4gIC5jaXRhdGlvbiB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTMwKTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICB3aWR0aDogMTAwdnc7XG4gICAgfVxuXG4gICAgLmNpdGF0aW9uIC5idG4tY29weSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1nb2xkKTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIG1pbi1oZWlnaHQ6IDEuNHJlbTtcbiAgICAgIGhlaWdodDogMS40cmVtO1xuICAgIH1cblxuICAgIC5jaXRhdGlvbiAuYnRuLWNvcHk6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gICAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtZ29sZCk7XG4gICAgfVxuXG4gICAgLmNpdGF0aW9uIC5idG4tYXBhIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtNTApO1xuICAgICAgbWFyZ2luLXJpZ2h0OiAuNXJlbTtcbiAgICAgIG1pbi13aWR0aDogOGNoO1xuICAgICAgZm9udC1zaXplOiAxcmVtO1xuXG4gICAgICAvKiBhcnJvdyBzdHlsZXMgKi9cbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIG1hcmdpbjogMDsgICAgICBcbiAgICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7ICAgICAgXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOlxuICAgICAgICBsaW5lYXItZ3JhZGllbnQoNDVkZWcsIHRyYW5zcGFyZW50IDUwJSwgdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSkgNTAlKSxcbiAgICAgICAgbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSkgNTAlLCB0cmFuc3BhcmVudCA1MCUpLFxuICAgICAgICBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICNjY2MsICNjY2MpO1xuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjpcbiAgICAgICAgY2FsYygxMDAlIC0gMjBweCkgY2FsYygxZW0gKyAycHgpLFxuICAgICAgICBjYWxjKDEwMCUgLSAxNXB4KSBjYWxjKDFlbSArIDJweCksXG4gICAgICAgIGNhbGMoMTAwJSAtIDIuNWVtKSAwLjVlbTtcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb24teTogY2VudGVyO1xuICAgICAgYmFja2dyb3VuZC1zaXplOlxuICAgICAgICA1cHggNXB4LFxuICAgICAgICA1cHggNXB4LFxuICAgICAgICAxcHggMS41ZW07XG4gICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgICAgb3V0bGluZTogMDtcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDEuNXJlbTtcbiAgICAgIG1hcmdpbi1yaWdodDogLjdyZW07XG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIH1cblxuICAgIC5jaXRlLWdyYXBoaWMge1xuICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgd2lkdGg6IDMzJTtcbiAgICAgIG1hcmdpbi10b3A6IDFyZW07XG4gICAgfVxuXG4gICAgLmNpdGF0aW9uIC5oZWFkZXItZG90cyB7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBhbGlnbi1pdGVtczogc3RhcnQ7XG4gICAgICBwYWRkaW5nLWJvdHRvbTogMS4yNXJlbTtcbiAgICAgIHBhZGRpbmctdG9wOiAuMjVyZW07XG4gICAgfVxuXG4gICAgLmNpdGUtY29sbGVjdGlvbiB7XG4gICAgICBtYXJnaW46IGF1dG87XG4gICAgICB3aWR0aDogNjclO1xuICAgICAgcGFkZGluZzogMnJlbTtcbiAgICAgIG92ZXJmbG93LXdyYXA6IGJyZWFrLXdvcmQ7XG4gICAgfVxuXG4gICAgLmNpdGUtY29sbGVjdGlvbiBoMixcbiAgICAuY29sbGVjdGlvbi1oaWdobGlnaHRzIGgyIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLWRlZmF1bHQtcHJpbWFyeS1jb2xvcik7XG4gICAgICBtYXJnaW4tdG9wOiAwLjVyZW07XG4gICAgfVxuXG4gICAgLmNpdGUtY29sbGVjdGlvbiBwIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDNyZW07XG4gICAgICBtYXJnaW4tdG9wOiAwO1xuICAgIH1cblxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NTZweCkge1xuICAgICAgLmNpdGUtY29sbGVjdGlvbiB7XG4gICAgICAgIHdpZHRoOiA4NSU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gICAgICAuY2l0YXRpb24ge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgcGFkZGluZzogMnJlbSAwO1xuICAgICAgfVxuXG4gICAgICAuY2l0ZS1ncmFwaGljIHtcbiAgICAgICAgd2lkdGg6IDcwJTtcbiAgICAgIH1cblxuICAgICAgLmNpdGUtY29sbGVjdGlvbiB7XG4gICAgICAgIC8qIHBhZGRpbmctdG9wOiAwOyAqL1xuICAgICAgICB3aWR0aDogOTUlO1xuICAgICAgICBwYWRkaW5nOiAxcmVtO1xuICAgICAgfVxuXG4gICAgICAuY2l0ZS1jb2xsZWN0aW9uIGgyIHsgXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMS43cmVtO1xuICAgICAgfVxuXG4gICAgICAuY2l0YXRpb24tdGV4dCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgICAgICBsaW5lLWhlaWdodDogMS43O1xuICAgICAgfVxuICAgIH1cblxuPC9zdHlsZT5cbjxkaXYgY2xhc3M9XCJjaXRhdGlvblwiPlxuICA8ZGl2IGNsYXNzPVwiY2l0ZS1ncmFwaGljXCI+XG4gICAgPGltZyBzcmM9XCIvaW1hZ2VzL3dhdGVyY29sb3JzL2NpdGF0aW9uLXdhdGVyY29sb3ItODAwcHgtbGFuZHNjYXBlLnBuZ1wiIHdpZHRoPVwiMTAwJVwiIGFsdD1cImNpdGUgdGhpcyBjb2xsZWN0aW9uIGltYWdlXCIgLz5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjaXRlLWNvbGxlY3Rpb25cIj5cbiAgICA8aDI+Q2l0ZSBUaGlzICR7dGhpcy5jaXRhdGlvblR5cGVMYWJlbH08L2gyPlxuXG4gICAgJHsgU2hhcmVkSHRtbC5oZWFkZXJEb3RzKCkgfVxuXG4gICAgPHAgY2xhc3M9XCJjaXRhdGlvbi10ZXh0XCI+XG4gICAgICAke3Vuc2FmZUhUTUwodGhpcy5zZWxlY3RlZENpdGF0aW9uLnRleHQpfVxuICAgIDwvcD5cblxuICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4O1wiPlxuICAgICAgPHNlbGVjdCBjbGFzcz1cImJ0biBidG4tYXBhXCIgQGNoYW5nZT1cIiR7dGhpcy5fY2l0ZUNoYW5nZX1cIj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFwYVwiPkFQQTwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwibWxhXCI+TUxBPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJjaGljYWdvXCI+Q2hpY2Fnbzwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuIGJ0bi1jb3B5XCIgQGNsaWNrPVwiJHt0aGlzLl9jb3B5Q2l0ZVRleHR9XCI+Q29weSBUZXh0PC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8YXBwLXRvYXN0LXBvcHVwPjwvYXBwLXRvYXN0LXBvcHVwPlxuPC9kaXY+XG5gO31cbiIsImltcG9ydCB7IExpdEVsZW1lbnQsIGh0bWwgfSBmcm9tICdsaXQnO1xuaW1wb3J0IHJlbmRlciBmcm9tIFwiLi9hcHAtZnMtbWVkaWEtZG93bmxvYWQudHBsLmpzXCI7XG5cbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbmltcG9ydCBcIi4vdmlld2VyL2FwcC1mcy12aWV3ZXJcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBGc01lZGlhRG93bmxvYWQgZXh0ZW5kcyBNaXhpbihMaXRFbGVtZW50KVxuICAud2l0aChMaXRDb3JrVXRpbHMpIHtcblxuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1vZGUgOiB7dHlwZTogU3RyaW5nfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vZGUgPSAnc2luZ2xlJ1xuXG4gICAgdGhpcy5faW5qZWN0TW9kZWwoJ0FwcFN0YXRlTW9kZWwnKTtcbiAgfVxuXG4gIGFzeW5jIGZpcnN0VXBkYXRlZCgpIHtcbiAgICB0aGlzLmZzVmlld2VyID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ2FwcC1mcy12aWV3ZXInKTtcbiAgICB0aGlzLl9vbkFwcFN0YXRlVXBkYXRlKGF3YWl0IHRoaXMuQXBwU3RhdGVNb2RlbC5nZXQoKSk7XG4gIH1cblxuICBfb25BcHBTdGF0ZVVwZGF0ZShlKSB7XG4gICAgdGhpcy5zZWxlY3RlZFJlY29yZCA9IGUuc2VsZWN0ZWRSZWNvcmQ7XG4gICAgdGhpcy5zZWxlY3RlZFJlY29yZE1lZGlhID0gZS5zZWxlY3RlZFJlY29yZE1lZGlhO1xuICB9XG5cbiAgX3RvZ2dsZU11bHRpcGxlRG93bmxvYWQoZSkge1xuICAgIHRoaXMubW9kZSA9IGUuY3VycmVudFRhcmdldC5pZDtcbiAgfVxuXG4gIF9vbkRvd25sb2FkQ2xpY2tlZChlKSB7XG4gICAgaWYoIGUudHlwZSA9PT0gJ2tleXVwJyAmJiBlLndoaWNoICE9PSAxMyApIHJldHVybjtcblxuICAgIGlmKCB0aGlzLm1vZGUgPT09ICdzaW5nbGUnICkge1xuICAgICAgdGhpcy5mc1ZpZXdlci5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKCB0aGlzLnNlbGVjdGVkUmVjb3JkTWVkaWEuY2xpZW50TWVkaWFEb3dubG9hZCApIHtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuc2VsZWN0ZWRSZWNvcmRNZWRpYS5jbGllbnRNZWRpYURvd25sb2FkO1xuICAgICAgICBpZiggQXJyYXkuaXNBcnJheSh1cmwpICkgdXJsID0gdXJsWzBdO1xuICAgICAgICBpZiggdHlwZW9mIHVybCA9PT0gJ29iamVjdCcgKSB1cmwgPSB1cmxbJ0BpZCddO1xuICAgICAgICB1cmwgPSAnL2ZjcmVwby9yZXN0LycrdXJsO1xuICAgICAgICBvcGVuKHVybCwgJ19ibGFuaycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHVybCA9ICcvYXBpL3ppcC9iYWctb2YtZmlsZXMnK3RoaXMuc2VsZWN0ZWRSZWNvcmRNZWRpYVsnQGlkJ107XG4gICAgICAgIG9wZW4odXJsLCAnX2JsYW5rJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3JlbmRlckRvd25sb2FkQnRuKG1vZGUpIHtcbiAgICBpZiggdGhpcy5tb2RlID09PSAnc2luZ2xlJyApIHtcbiAgICAgIHJldHVybiBodG1sYDxpcm9uLWljb24gaWNvbj0nZmlsZS1kb3dubG9hZCc+PC9pcm9uLWljb24+IEJyb3dzZSBmb3IgZmlsZWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBodG1sYDxpcm9uLWljb24gaWNvbj0nZmlsZS1kb3dubG9hZCc+PC9pcm9uLWljb24+IERvd25sb2FkIEFyY2hpdmVgO1xuICAgIH1cbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2FwcC1mcy1tZWRpYS1kb3dubG9hZCcsIEFwcEZzTWVkaWFEb3dubG9hZCk7XG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyKCkgeyBcbnJldHVybiBodG1sYFxuXG48c3R5bGU+XG4gIDpob3N0IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuXG4gIC5sYXlvdXQge1xuICAgIGRpc3BsYXk6ZmxleDsgXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxuXG4gIC5sYXlvdXQuYnRucyA+ICoge1xuICAgIHdpZHRoOiAzMyVcbiAgfVxuXG4gIC5yYWRpbyB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgfVxuXG4gIGEge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgcGFkZGluZzogOHB4IDEycHggOHB4IDhweDtcbiAgICBjb2xvciA6IHZhcigtLWRlZmF1bHQtcHJpbWFyeS1jb2xvcik7XG4gICAgYmFja2dyb3VuZC1jb2xvciA6IHZhcigtLWRlZmF1bHQtc2Vjb25kYXJ5LWNvbG9yKTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGZvbnQtc2l6ZTogdmFyKC0tZnMtc20pO1xuICAgIGZvbnQtd2VpZ2h0OiB2YXIoLS1mdy1ib2xkKTtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICBoZWlnaHQ6IDI0cHg7XG4gIH1cbiAgYSBpcm9uLWljb24ge1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIH1cbjwvc3R5bGU+IFxuXG48ZGl2IGlkPVwid3JhcHBlclwiPlxuICA8ZGl2IGNsYXNzPVwibGF5b3V0XCI+XG4gICAgPGRpdiBjbGFzcz1cInJhZGlvXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDQwcHhcIj5cbiAgICAgIDxpbnB1dCBpZD1cInNpbmdsZVwiIHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJzZXQtZnMtZGwtdHlwZVwiIGNoZWNrZWQgQGNsaWNrPVwiJHt0aGlzLl90b2dnbGVNdWx0aXBsZURvd25sb2FkfVwiIC8+IFxuICAgICAgPGxhYmVsIGZvcj1cInNpbmdsZVwiPlNpbmdsZTwvbGFiZWw+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInJhZGlvXCI+XG4gICAgICA8aW5wdXQgaWQ9XCJhcmNoaXZlXCIgdHlwZT1cInJhZGlvXCIgbmFtZT1cInNldC1mcy1kbC10eXBlXCIgQGNsaWNrPVwiJHt0aGlzLl90b2dnbGVNdWx0aXBsZURvd25sb2FkfVwiLz4gXG4gICAgICA8bGFiZWwgZm9yPVwiYXJjaGl2ZVwiPkFyY2hpdmU8L2xhYmVsPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48YSBpZD1cImRvd25sb2FkQnRuXCIgQGNsaWNrPVwiJHt0aGlzLl9vbkRvd25sb2FkQ2xpY2tlZH1cIiBAa2V5dXA9XCIke3RoaXMuX29uRG93bmxvYWRDbGlja2VkfVwiIHRhYmluZGV4PVwiMFwiPlxuICAke3RoaXMuX3JlbmRlckRvd25sb2FkQnRuKHRoaXMubW9kZSl9XG48L2E+XG5cbjxhcHAtZnMtdmlld2VyPjwvYXBwLWZzLXZpZXdlcj5cblxuYDt9IiwiaW1wb3J0IHsgTGl0RWxlbWVudCB9IGZyb20gXCJsaXRcIjtcblxuaW1wb3J0IHJlbmRlciBmcm9tIFwiLi9hcHAtbWVkaWEtZG93bmxvYWQudHBsLmpzXCI7XG5cbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbmltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uLy4uL2xpYi9jb25maWdcIjtcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vLi4vLi4vbGliL3V0aWxzXCI7XG5pbXBvcnQgYnl0ZXMgZnJvbSBcImJ5dGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcE1lZGlhRG93bmxvYWQgZXh0ZW5kcyBNaXhpbihMaXRFbGVtZW50KS53aXRoKFxuICBMaXRDb3JrVXRpbHNcbikge1xuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRlZmF1bHRJbWFnZSA6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgZm9ybWF0cyA6IHsgdHlwZTogQXJyYXkgfSxcbiAgICAgIHNvdXJjZXMgOiB7IHR5cGU6IEFycmF5IH0sXG4gICAgICBocmVmIDogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIGFyY2hpdmVIcmVmIDogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIGltYWdlU2l6ZXMgOiB7IHR5cGU6IEFycmF5IH0sXG4gICAgICBoYXNNdWx0aXBsZURvd25sb2FkTWVkaWEgOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIHNlbGVjdGVkTWVkaWFIYXNTb3VyY2VzIDogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBmdWxsU2V0Q291bnQgOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIGZ1bGxTZXRTZWxlY3RlZCA6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgZG93bmxvYWRPcHRpb25zIDogeyB0eXBlOiBBcnJheSB9LFxuICAgICAgc2hvd0ltYWdlRm9ybWF0cyA6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgc2VsZWN0ZWRSZWNvcmRNZWRpYSA6IHsgdHlwZTogT2JqZWN0IH0sXG4gICAgICBpc011bHRpbWVkaWEgOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIHNob3dEb3dubG9hZExhYmVsIDogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICB6aXBDb25jYXRlbmF0ZWRQYXRocyA6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICBpc1R3b1BhZ2VWaWV3IDogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBkb3dubG9hZEFsbE1lZGlhIDogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBpc0Jvb2tyZWFkZXIgOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIGRpc2FibGVEb3dubG9hZCA6IHsgdHlwZTogQm9vbGVhbiB9XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlci5iaW5kKHRoaXMpO1xuICAgXG4gICAgdGhpcy5fcmVzZXQoKTtcblxuICAgIHRoaXMuX2luamVjdE1vZGVsKFxuICAgICAgXCJBcHBTdGF0ZU1vZGVsXCIsXG4gICAgICBcIk1lZGlhTW9kZWxcIixcbiAgICAgIFwiQ29sbGVjdGlvbk1vZGVsXCIsXG4gICAgICBcIkJvb2tSZWFkZXJNb2RlbFwiXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIGZpcnN0VXBkYXRlZCgpIHtcbiAgICBsZXQgc2VsZWN0ZWRSZWNvcmQgPSBhd2FpdCB0aGlzLkFwcFN0YXRlTW9kZWwuZ2V0U2VsZWN0ZWRSZWNvcmQoKTtcbiAgICBpZiAoc2VsZWN0ZWRSZWNvcmQpIHRoaXMuX29uU2VsZWN0ZWRSZWNvcmRVcGRhdGUoc2VsZWN0ZWRSZWNvcmQpOyAgICBcbiAgfVxuXG4gIF9yZXNldCgpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLmRlZmF1bHRJbWFnZSA9IHRydWU7XG4gICAgdGhpcy5mb3JtYXRzID0gW107XG4gICAgdGhpcy5zb3VyY2VzID0gW107XG4gICAgdGhpcy5ocmVmID0gXCJcIjtcbiAgICB0aGlzLmFyY2hpdmVIcmVmID0gXCJcIjtcbiAgICB0aGlzLmltYWdlU2l6ZXMgPSBbXTtcbiAgICB0aGlzLmhhc011bHRpcGxlRG93bmxvYWRNZWRpYSA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0ZWRNZWRpYUhhc1NvdXJjZXMgPSB0cnVlO1xuICAgIHRoaXMuZnVsbFNldENvdW50ID0gMDtcbiAgICB0aGlzLmZ1bGxTZXRTZWxlY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuZG93bmxvYWRPcHRpb25zID0gW107XG4gICAgdGhpcy5zaG93SW1hZ2VGb3JtYXRzID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RlZFJlY29yZE1lZGlhID0ge307XG4gICAgdGhpcy5pc011bHRpbWVkaWEgPSBmYWxzZTtcbiAgICB0aGlzLnppcENvbmNhdGVuYXRlZFBhdGhzID0gXCJcIjtcbiAgICB0aGlzLmlzVHdvUGFnZVZpZXcgPSBmYWxzZTtcbiAgICB0aGlzLmRvd25sb2FkQWxsTWVkaWEgPSBmYWxzZTtcbiAgICB0aGlzLmlzQm9va3JlYWRlciA9IGZhbHNlO1xuICAgIHRoaXMuZGlzYWJsZURvd25sb2FkID0gQVBQX0NPTkZJRy5kaXNhYmxlRmlsZURvd25sb2FkcztcbiAgfVxuXG4gIF9vbkFwcFN0YXRlVXBkYXRlKGUpIHtcbiAgICBpZiggZS5sb2NhdGlvbi5wYWdlICE9PSAnaXRlbScgKSB0aGlzLl9yZXNldCgpO1xuICB9XG5cbiAgX29uU2VsZWN0ZWRSZWNvcmRVcGRhdGUocmVjb3JkKSB7XG4gICAgaWYoICFyZWNvcmQgKSByZXR1cm47XG5cbiAgICBsZXQgeyBncmFwaCwgY2xpZW50TWVkaWEsIHNlbGVjdGVkTWVkaWEsIHNlbGVjdGVkTWVkaWFQYWdlIH0gPSByZWNvcmQ7ICAgIFxuXG4gICAgdGhpcy5maXJzdExvYWQgPSBncmFwaC5yb290Py5pZCAhPT0gdGhpcy5yb290UmVjb3JkPy5pZCA/IHRydWUgOiBmYWxzZTtcblxuICAgIHRoaXMucm9vdFJlY29yZCA9IGdyYXBoLnJvb3Q7XG4gICAgdGhpcy5zZWxlY3RlZE1lZGlhID0gc2VsZWN0ZWRNZWRpYTtcbiAgICB0aGlzLmNsaWVudE1lZGlhID0gY2xpZW50TWVkaWE7XG4gICAgdGhpcy5ncmFwaEluZGV4ID0gZ3JhcGguaW5kZXg7XG4gICAgdGhpcy5zZWxlY3RlZE1lZGlhUGFnZSA9IHNlbGVjdGVkTWVkaWFQYWdlO1xuXG4gICAgdGhpcy5zb3VyY2VzID0gdGhpcy5fZ2V0RG93bmxvYWRTb3VyY2VzKCk7XG5cbiAgICAvLyBzZXQgc2luZ2xlL3ppcCBkb3dubG9hZCBocmVmc1xuICAgIHRoaXMuX3NldERvd25sb2FkSHJlZih0aGlzLnNvdXJjZXMpO1xuXG4gICAgdGhpcy5oYXNNdWx0aXBsZURvd25sb2FkTWVkaWEgPSB0aGlzLnNvdXJjZXMubGVuZ3RoID4gMTtcbiAgICBpZiggdGhpcy5maXJzdExvYWQgJiYgdGhpcy5oYXNNdWx0aXBsZURvd25sb2FkTWVkaWEgKSB7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNzaW5nbGVcIikuY2hlY2tlZCA9IHRydWU7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNmdWxsc2V0XCIpLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZnVsbFNldFNlbGVjdGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYoIHRoaXMuc291cmNlcy5sZW5ndGggPT09IDAgKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkTWVkaWFIYXNTb3VyY2VzID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZE1lZGlhSGFzU291cmNlcyA9IHRydWU7XG4gICAgdGhpcy5mdWxsU2V0Q291bnQgPSB0aGlzLnNvdXJjZXMubGVuZ3RoO1xuXG4gICAgdGhpcy5fb25TZWxlY3RlZFJlY29yZE1lZGlhVXBkYXRlKHNlbGVjdGVkTWVkaWEpXG4gIH1cblxuICBfb25TZWxlY3RlZFJlY29yZE1lZGlhVXBkYXRlKG1lZGlhKSB7XG4gICAgdGhpcy5zZWxlY3RlZFJlY29yZE1lZGlhID0gbWVkaWE7XG4gICAgdGhpcy5kb3dubG9hZE9wdGlvbnMgPSBbdGhpcy5zZWxlY3RlZFJlY29yZE1lZGlhXTtcbiAgICB0aGlzLmlzTXVsdGltZWRpYSA9IHRoaXMuZG93bmxvYWRPcHRpb25zWzBdPy5maWxlRm9ybWF0Py5pbmNsdWRlcygndmlkZW8nKTtcbiAgICBsZXQgcGRmO1xuXG4gICAgaWYoIHRoaXMuaXNNdWx0aW1lZGlhICkge1xuICAgICAgdGhpcy5mdWxsU2V0U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIGxldCBkb3dubG9hZCA9IHRoaXMuZG93bmxvYWRPcHRpb25zWzBdO1xuICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjbXVsdGltZWRpYS1mb3JtYXQtbGFiZWxcIikuaW5uZXJIVE1MID0gZG93bmxvYWQuZmlsZUZvcm1hdFNpbXBsZSArICcgKCcgKyBieXRlcyhkb3dubG9hZC5maWxlU2l6ZSkudG9Mb3dlckNhc2UoKSArICcpJztcbiAgICAgIHRoaXMuc2hvd0ltYWdlRm9ybWF0cyA9IGZhbHNlO1xuXG4gICAgICAvLyB1cGRhdGUgYWxsIGxhYmVsIHRvIGluY2x1ZGUgdmlkZW8gKyBvdGhlciBtZWRpYSAocHJvYiBqdXN0IHRodW1ibmFpbClcbiAgICAgIC8vIG11bHRpbWVkaWEtYWxsLWZvcm1hdC1sYWJlbFxuICAgICAgbGV0IGZpbGVzaXplID0gdGhpcy5zb3VyY2VzLnJlZHVjZSgoYSwgcikgPT4gYSArIHIuZmlsZVNpemUsIDApO1xuICAgICAgLy8gbGV0IGZpbGVUeXBlcyA9IHRoaXMuc291cmNlcy5tYXAocyA9PiBzLnVybD8uc3BsaXQoJy4nKT8ucG9wKCkpLmpvaW4oJywgJyk7XG4gICAgICBsZXQgbGFiZWwgPSAndmlkZW8gKCcgKyBieXRlcyhmaWxlc2l6ZSkudG9Mb3dlckNhc2UoKSArICcpJztcbiAgICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI211bHRpbWVkaWEtYWxsLWZvcm1hdC1sYWJlbFwiKS5pbm5lckhUTUwgPSBsYWJlbDtcblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjaGVjayBpZiB0aGUgb25seSBtYWluIHNvdXJjZSB3aXRoIHBhZ2VzIGlzIHBkZixcbiAgICAgIC8vIGlmIHNvIHRoZW4ganVzdCBzaG93IGFyY2hpdmUgZG93bmxvYWQgb3B0aW9ucyBpbnN0ZWFkIG9mIHNpbmdsZSBwYWdlXG4gICAgICBsZXQgaW1hZ2VMaXN0ID0gdGhpcy5jbGllbnRNZWRpYS5tZWRpYUdyb3Vwcy5maWx0ZXIobSA9PiBtWydAc2hvcnRUeXBlJ10uaW5jbHVkZXMoJ0ltYWdlTGlzdCcpKVswXTtcbiAgICAgIHBkZiA9IHRoaXMuY2xpZW50TWVkaWEubWVkaWFHcm91cHMuZmlsdGVyKG0gPT4gbS5jbGllbnRNZWRpYT8ucGRmICYmIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbS5jbGllbnRNZWRpYT8ucGFnZXM/Lmxlbmd0aCAmJiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0uY2xpZW50TWVkaWE/LmRvd25sb2FkPy5bMF0/LmxhYmVsID09PSAncGRmJylbMF07XG5cbiAgICAgIGlmKCAhaW1hZ2VMaXN0ICYmIHBkZiApIHtcbiAgICAgICAgdGhpcy5zaG93RG93bmxvYWRMYWJlbCA9IHRydWU7XG4gICAgICAgIC8vIHRoaXMuX25vU2luZ2xlUGFnZURvd25sb2FkKCk7XG4gICAgICAgIHRoaXMuX3JlbmRlckRvd25sb2FkQWxsRm9ybWF0cygpO1xuICAgICAgICB0aGlzLl9yZW5kZXJEb3dubG9hZFNpbmdsZUZvcm1hdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fcmVuZGVyRG93bmxvYWRBbGxGb3JtYXRzKCk7XG4gICAgdGhpcy5fcmVuZGVyRG93bmxvYWRTaW5nbGVGb3JtYXQoKTtcblxuICAgIGlmKCBwZGYgJiYgIXRoaXMuaXNNdWx0aW1lZGlhICYmIHRoaXMuZmlyc3RMb2FkICkge1xuICAgICAgdGhpcy5fdG9nZ2xlTXVsdGlwbGVEb3dubG9hZChudWxsLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25Cb29rcmVhZGVyU3RhdGVVcGRhdGVcbiAgICogQGRlc2NyaXB0aW9uIGJvb2tyZWFkZXIgc3RhdGUgdXBkYXRlIGV2ZW50IGhhbmRsZXJcbiAgICogXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIGJvb2tyZWFkZXIgc3RhdGUgdXBkYXRlIGV2ZW50XG4gICAqL1xuICBfb25Cb29rcmVhZGVyU3RhdGVVcGRhdGUoZSkge1xuICAgIGlmKCB0aGlzLkFwcFN0YXRlTW9kZWwubG9jYXRpb24ucGFnZSAhPT0gJ2l0ZW0nICkgcmV0dXJuO1xuXG4gICAgdGhpcy5pc0Jvb2tyZWFkZXIgPSB0cnVlO1xuICAgIGxldCBwYWdlTnVtYmVyID0gZS5zZWxlY3RlZFBhZ2UgKyAxO1xuICAgIGxldCBvbmVQYWdlTW9kZSA9IGUuc2VsZWN0ZWRWaWV3ID09PSAnc2luZ2xlJztcbiAgICBsZXQgcGFnZXM7XG4gICAgbGV0IGltYWdlTGlzdCA9IHRoaXMuY2xpZW50TWVkaWEubWVkaWFHcm91cHMuZmlsdGVyKG0gPT4gbVsnQHNob3J0VHlwZSddLmluY2x1ZGVzKCdJbWFnZUxpc3QnKSlbMF07XG5cbiAgICBpZiggaW1hZ2VMaXN0ICkge1xuICAgICAgcGFnZXMgPSBpbWFnZUxpc3QuY2xpZW50TWVkaWE/LnBhZ2VzIHx8IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYWdlcyA9IHRoaXMuc2VsZWN0ZWRNZWRpYT8uY2xpZW50TWVkaWE/LnBhZ2VzIHx8IFtdO1xuICAgIH1cblxuICAgIGlmKCAhcGFnZXMgfHwgIXBhZ2VzLmxlbmd0aCApIHJldHVybjtcblxuICAgIGlmKCBvbmVQYWdlTW9kZSB8fCBwYWdlTnVtYmVyID09PSAxICkge1xuICAgICAgLy8gc2luZ2xlIGltYWdlIGRvd25sb2FkXG4gICAgICBsZXQgaHJlZiA9IHBhZ2VzW3BhZ2VOdW1iZXIgLSAxXT8uZG93bmxvYWQ/LnVybDsgIFxuICAgICAgdGhpcy5pc1R3b1BhZ2VWaWV3ID0gZmFsc2U7XG4gICAgICB0aGlzLmhyZWYgPSBocmVmIHx8ICcnO1xuICAgICAgdGhpcy5fcmVuZGVyRG93bmxvYWRTaW5nbGVGb3JtYXQoKTtcbiAgXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIDIgcGFnZSBpbWFnZSBkb3dubG9hZFxuICAgICAgdGhpcy5pc1R3b1BhZ2VWaWV3ID0gdHJ1ZTsgICAgICBcblxuICAgICAgLy8gaWYgc3dpdGNoaW5nIGZyb20gc2luZ2xlIHRvIHR3byBwYWdlIHZpZXcgb24gb2RkIHBhZ2UsIHNlbGVjdGVkIHBhZ2UgaXMgdGhlIHNlY29uZCBwYWdlIGluIHRoZSBkaXNwbGF5ZWQgYm9va3JlYWRlciB2aWV3XG4gICAgICBsZXQgc3RhcnRJbmRleCA9IHBhZ2VOdW1iZXIgJSAyICE9PSAwID8gcGFnZU51bWJlciAtIDIgOiBwYWdlTnVtYmVyIC0gMTtcblxuICAgICAgLy8gc2V0IGRvd25sb2FkIGhyZWYgdG8gMiBwYWdlcyBmb3IgYXJjaGl2ZSBkb3dubG9hZCBvcHRpb25cbiAgICAgIGxldCBpbWFnZTEgPSBwYWdlc1tzdGFydEluZGV4XT8uZG93bmxvYWQ/LnVybD8ucmVwbGFjZSgnL2ZjcmVwby9yZXN0JywgJycpO1xuICAgICAgbGV0IGltYWdlMiA9IHBhZ2VzW3N0YXJ0SW5kZXggKyAxXT8uZG93bmxvYWQ/LnVybD8ucmVwbGFjZSgnL2ZjcmVwby9yZXN0JywgJycpO1xuICAgICAgbGV0IHVybHMgPSBbXTtcbiAgICAgIGlmKCBpbWFnZTEgKSB1cmxzLnB1c2goaW1hZ2UxKTtcbiAgICAgIGlmKCBpbWFnZTIgKSB1cmxzLnB1c2goaW1hZ2UyKTtcbiAgICAgIGlmKCB1cmxzLmxlbmd0aCAmJiAhdGhpcy5mdWxsU2V0U2VsZWN0ZWQgKSB7XG4gICAgICAgIHRoaXMuX3NldFppcFBhdGhzKHVybHMpO1xuICAgICAgfVxuICAgICAgdGhpcy5fcmVuZGVyRG93bmxvYWRTaW5nbGVGb3JtYXQodHJ1ZSk7ICAgICAgXG4gICAgfVxuICB9XG5cbiAgX25vU2luZ2xlUGFnZURvd25sb2FkKCkge1xuICAgIHRoaXMuemlwTmFtZSA9IHRoaXMucm9vdFJlY29yZC5uYW1lXG4gICAgICAucmVwbGFjZSgvW15hLXpBLVowLTldL2csIFwiLVwiKVxuICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgdGhpcy5hcmNoaXZlSHJlZiA9ICcvZmluL2FyY2hpdmU/cGF0aHM9JyArIHRoaXMuc291cmNlcy5tYXAocyA9PiBzLnVybC5yZXBsYWNlKCcvZmNyZXBvL3Jlc3QnLCAnJykpLmpvaW4oJywnKSArICh0aGlzLnppcE5hbWUgPyAnJm5hbWU9Jyt0aGlzLnppcE5hbWUgOiAnJyk7XG5cbiAgICB0aGlzLmRvd25sb2FkQWxsTWVkaWEgPSB0cnVlO1xuICAgIGxldCBmb3JtYXRzID0gW107XG4gICAgdGhpcy5zb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xuICAgICAgbGV0IGZvcm1hdCA9IHNvdXJjZS51cmwuc3BsaXQoJy4nKS5wb3AoKTtcbiAgICAgIGlmKCAhZm9ybWF0cy5pbmNsdWRlcyhmb3JtYXQpICkge1xuICAgICAgICBmb3JtYXRzLnB1c2goZm9ybWF0KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI21lZGlhLWZvcm1hdC1sYWJlbFwiKS5pbm5lckhUTUwgPSAnaW1hZ2UnICsgJyAoJyArIGZvcm1hdHMuam9pbignLCAnKSArICcpJztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9nZXREb3dubG9hZFNvdXJjZXNcbiAgICogQGRlc2NyaXB0aW9uIGdldCBhbGwgY2xpZW50IG1lZGlhIGRvd25sb2FkIHNvdXJjZXNcbiAgICpcbiAgICogQHJldHVybnMge0FycmF5fSBzb3VyY2VzIFxuICAgKi9cbiAgX2dldERvd25sb2FkU291cmNlcygpIHtcbiAgICBsZXQgc291cmNlcyA9IFtdO1xuICAgIHRoaXMuY2xpZW50TWVkaWEubWVkaWFHcm91cHMuZm9yRWFjaCgobWVkaWEpID0+IHtcbiAgICAgIGlmKCBtZWRpYS5jbGllbnRNZWRpYT8uZG93bmxvYWQgKSB7XG4gICAgICAgIG1lZGlhLmNsaWVudE1lZGlhLmRvd25sb2FkLmZvckVhY2goKGRvd25sb2FkKSA9PiB7XG4gICAgICAgICAgc291cmNlcy5wdXNoKGRvd25sb2FkKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHNvdXJjZXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfc2V0RG93bmxvYWRIcmVmXG4gICAqIEBkZXNjcmlwdGlvbiBzZXQgdGhlIGRvd25sb2FkIHNvdXJjZVR5cGUgYW5kIGhyZWYgZm9yIHNpbmdsZSBhbmQgZnVsbHNldCBkb3dubG9hZCBvcHRpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZXMgdGhlIGRvd25sb2FkIHNvdXJjZShzKVxuICAgKi9cbiAgX3NldERvd25sb2FkSHJlZihzb3VyY2VzPVtdKSB7XG4gICAgaWYgKCFzb3VyY2VzLmxlbmd0aCkgcmV0dXJuO1xuICAgIFxuICAgIHRoaXMuaHJlZiA9ICcnO1xuICAgIHRoaXMuYXJjaGl2ZUhyZWYgPSAnJztcblxuICAgIGlmKCB0aGlzLmRpc2FibGVEb3dubG9hZCApIHJldHVybjtcblxuICAgIGxldCBpbWFnZUxpc3QgPSB0aGlzLmNsaWVudE1lZGlhLm1lZGlhR3JvdXBzLmZpbHRlcihtID0+IG1bJ0BzaG9ydFR5cGUnXS5pbmNsdWRlcygnSW1hZ2VMaXN0JykpWzBdO1xuICAgIGxldCBmaXJzdE1lZGlhRG93bmxvYWQgPSB0aGlzLmNsaWVudE1lZGlhLm1lZGlhR3JvdXBzWzBdPy5jbGllbnRNZWRpYT8uZG93bmxvYWQ/LlswXT8udXJsO1xuXG4gICAgaWYoIHRoaXMuZnVsbFNldFNlbGVjdGVkIHx8IHRoaXMuaXNUd29QYWdlVmlldyApIHtcbiAgICAgIC8vIGJ1aWxkIHppcCBkb3dubG9hZCB1cmxcbiAgICAgIHRoaXMuemlwTmFtZSA9IHRoaXMucm9vdFJlY29yZC5uYW1lXG4gICAgICAgIC5yZXBsYWNlKC9bXmEtekEtWjAtOV0vZywgXCItXCIpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgICAgdGhpcy5hcmNoaXZlSHJlZiA9ICcvZmluL2FyY2hpdmU/cGF0aHM9JyArIHNvdXJjZXMubWFwKHMgPT4gcy51cmwucmVwbGFjZSgnL2ZjcmVwby9yZXN0JywgJycpKS5qb2luKCcsJykgKyAodGhpcy56aXBOYW1lID8gJyZuYW1lPScrdGhpcy56aXBOYW1lIDogJycpO1xuICAgIH0gZWxzZSBpZiggdGhpcy5BcHBTdGF0ZU1vZGVsLmxvY2F0aW9uLmZ1bGxwYXRoID09PSB0aGlzLnJvb3RSZWNvcmRbJ0BpZCddICkge1xuICAgICAgLy8gZmlyc3QgaW1hZ2UgZnJvbSBpbWFnZUxpc3QgaWYgZXhpc3RzLCBvciBtZWRpYU9iamVjdCBmaXJzdCBkb3dubG9hZFxuICAgICAgdGhpcy5ocmVmID0gaW1hZ2VMaXN0Py5jbGllbnRNZWRpYT8uZG93bmxvYWQ/LlswXT8udXJsIHx8IGZpcnN0TWVkaWFEb3dubG9hZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZ2V0IGltYWdlIGZyb20gc2VsZWN0ZWQgcGFnZVxuICAgICAgbGV0IHBhZ2UgPSB0aGlzLnNlbGVjdGVkTWVkaWFQYWdlIHx8IDA7XG5cbiAgICAgIC8vIHB1bGwgcGFnZSBmcm9tIHBkZiBpZiBubyBpbWFnZWxpc3RcbiAgICAgIGxldCB1cmwgPSAnJztcbiAgICAgIGxldCBpbWFnZVVybCA9IHRoaXMuQXBwU3RhdGVNb2RlbC5sb2NhdGlvbi5mdWxscGF0aC5yZXBsYWNlKC86XFxkKyQvLCAnJyk7IC8vIHNjcnViIDpwYWdlTnVtYmVyIHN1ZmZpeFxuICAgICAgaWYoICFpbWFnZUxpc3QgKSB7XG4gICAgICAgIGxldCBtZWRpYSA9IHRoaXMuY2xpZW50TWVkaWEubWVkaWFHcm91cHM/LmZpbmQobWcgPT4gbWdbJ0BpZCddID09PSBpbWFnZVVybCk/LmNsaWVudE1lZGlhO1xuICAgICAgICBpZiggbWVkaWE/LnBhZ2VzICkge1xuICAgICAgICAgIHVybCA9IG1lZGlhLnBhZ2VzW3BhZ2UtMV0/Lm9yaWdpbmFsPy51cmwgfHwgbWVkaWEucGFnZXNbcGFnZS0xXT8ubGFyZ2U/LnVybDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmhyZWYgPSBpbWFnZUxpc3Q/LmNsaWVudE1lZGlhPy5kb3dubG9hZD8uW3BhZ2VdPy51cmwgfHwgdXJsIHx8IGZpcnN0TWVkaWFEb3dubG9hZDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfcmVuZGVyRG93bmxvYWRTaW5nbGVGb3JtYXRcbiAgICogQHByaXZhdGVcbiAgICogQGRlc2NyaXB0aW9uIHJlbmRlciBpbWFnZSBmb3JtYXRzIGZvciBzaW5nbGUgcGFnZSBpbWFnZXMsIGllIFwiSW1hZ2UgKHBuZylcIlxuICAgKiBcbiAgICogQHBhcmFtIHtCb29sZWFufSBtdWx0aXBhZ2UgaWYgdHJ1ZSwgdGhlbiByZW5kZXIgZm9yIDIgcGFnZXMgKGNvbWJpbmUgZmlsZSBzaXplcylcbiAgICovXG4gIF9yZW5kZXJEb3dubG9hZFNpbmdsZUZvcm1hdChtdWx0aXBhZ2U9ZmFsc2UpIHtcbiAgICBsZXQgZm9ybWF0cyA9IFtdO1xuICAgIGxldCBzaW5nbGVQZGYgPSBmYWxzZTtcbiAgICBsZXQgbXVsdGlJbWFnZVNpemUgPSAwO1xuICAgIHRoaXMuc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICAgIGxldCBmb3JtYXQgPSBzb3VyY2UubGFiZWwgfHwgc291cmNlLnVybC5zcGxpdCgnLicpLnBvcCgpO1xuICAgICAgLy8gaWYoIGZvcm1hdHMuaW5jbHVkZXMoZm9ybWF0KSApIHtcbiAgICAgIC8vIH0gZWxzZSBcbiAgICAgIGlmKCAhZm9ybWF0cy5pbmNsdWRlcyhmb3JtYXQpICYmIGZvcm1hdCAhPT0gJ3BkZicpIHtcbiAgICAgICAgZm9ybWF0cy5wdXNoKGZvcm1hdCk7XG4gICAgICB9XG4gICAgICBpZiggZm9ybWF0ID09PSAncGRmJyApIHtcbiAgICAgICAgc2luZ2xlUGRmID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmKCBtdWx0aXBhZ2UgKSB7XG4gICAgICAgIGlmKCB0aGlzLmFyY2hpdmVIcmVmLmluZGV4T2Yoc291cmNlLnVybD8uc3BsaXQoJy9mY3JlcG8vcmVzdCcpPy5bMV0pID4gLTEgKSBtdWx0aUltYWdlU2l6ZSArPSBzb3VyY2UuZmlsZVNpemU7XG4gICAgICB9XG4gICAgfSk7XG4gIFxuICAgIGlmKCBzaW5nbGVQZGYgJiYgZm9ybWF0cy5sZW5ndGggPiAwICkgc2luZ2xlUGRmID0gZmFsc2U7IFxuXG4gICAgbGV0IGltYWdlTGFiZWwgPSBzaW5nbGVQZGYgPyAncGRmICcgOiAnJztcblxuICAgIGxldCB2aWV3aW5nUGRmID0gdGhpcy5BcHBTdGF0ZU1vZGVsLmxvY2F0aW9uLmZ1bGxwYXRoLnJlcGxhY2UoLzpcXGQrJC8sICcnKT8uc3BsaXQoJy4nKT8ucG9wKCkgPT09ICdwZGYnO1xuICAgIGlmKCB2aWV3aW5nUGRmICkge1xuICAgICAgc2luZ2xlUGRmID0gdHJ1ZTtcbiAgICAgIGltYWdlTGFiZWwgPSB0aGlzLmhyZWYuc3BsaXQoJy4nKS5wb3AoKTsgLy8gZ2V0IGZvcm1hdCBmcm9tIHVybCwgY291bGQgYmUgd29ya2Zsb3cgaW1hZ2Ugb3IgcGRmXG4gICAgfVxuXG4gICAgbGV0IGZpbGVTaXplID0gdGhpcy5zb3VyY2VzLmZpbmQocyA9PiBzLnVybCA9PT0gdGhpcy5ocmVmKT8uZmlsZVNpemU7XG4gICAgaWYoIGZvcm1hdHMubGVuZ3RoICYmICF2aWV3aW5nUGRmICkgaW1hZ2VMYWJlbCArPSBmb3JtYXRzLmpvaW4oJywgJykgKyAnICc7XG5cbiAgICAvLyBpZiBtdWx0aXBhZ2UsIGNvbWJpbmUgZmlsZSBzaXplc1xuICAgIGlmKCBtdWx0aXBhZ2UgJiYgbXVsdGlJbWFnZVNpemUgKSB7XG4gICAgICBpbWFnZUxhYmVsICs9ICcoJyArIGJ5dGVzKG11bHRpSW1hZ2VTaXplKS50b0xvd2VyQ2FzZSgpICsgJyknO1xuICAgIH0gZWxzZSBpZiggZmlsZVNpemUgKSB7XG4gICAgICBpbWFnZUxhYmVsICs9ICcoJyArIGJ5dGVzKGZpbGVTaXplKS50b0xvd2VyQ2FzZSgpICsgJyknO1xuICAgIH1cblxuICAgIGlmKCAhdGhpcy5mdWxsU2V0U2VsZWN0ZWQgKSB0aGlzLnNob3dEb3dubG9hZExhYmVsID0gdHJ1ZTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNtZWRpYS1mb3JtYXQtbGFiZWxcIikuaW5uZXJIVE1MID0gaW1hZ2VMYWJlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9yZW5kZXJEb3dubG9hZEFsbEZvcm1hdHNcbiAgICogQHByaXZhdGVcbiAgICogQGRlc2NyaXB0aW9uIHJlbmRlciBpbWFnZSBmb3JtYXRzIGlmIGRvd25sb2FkIG1lZGlhIGV4aXN0cyBmb3IgaW1hZ2VzIGFuZCBwZGZcbiAgICogYWxzbyByZW5kZXIgQWxsIEZpbGVzIGltYWdlIGZvcm1hdCBpZiBvbmx5IGltYWdlcyBleGlzdCBmb3IgZG93bmxvYWQgbWVkaWEgKGllIG5vdCBpbWFnZSArIHBkZilcbiAgICovXG4gIF9yZW5kZXJEb3dubG9hZEFsbEZvcm1hdHMoKSB7XG4gICAgbGV0IGZvcm1hdHMgPSBbXTtcbiAgICBsZXQgaGFzUGRmID0gZmFsc2U7XG4gICAgdGhpcy5zb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xuICAgICAgbGV0IGZvcm1hdCA9IHNvdXJjZS5sYWJlbCB8fCBzb3VyY2UudXJsLnNwbGl0KCcuJykucG9wKCk7XG4gICAgICBpZiggZm9ybWF0ID09PSAncGRmJyApIGhhc1BkZiA9IHRydWU7XG4gICAgICBsZXQgbWF0Y2hlZEZpbGVUeXBlID0gZm9ybWF0cy5maWx0ZXIoZiA9PiBmLmZvcm1hdCA9PT0gZm9ybWF0KVswXTtcblxuICAgICAgaWYoIG1hdGNoZWRGaWxlVHlwZSApIHtcbiAgICAgICAgLy8gdXBkYXRlIGZpbGVTaXplXG4gICAgICAgIG1hdGNoZWRGaWxlVHlwZS5maWxlU2l6ZSArPSBzb3VyY2UuZmlsZVNpemU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3JtYXRzLnB1c2goe1xuICAgICAgICAgIGZvcm1hdCxcbiAgICAgICAgICBmaWxlU2l6ZSA6IHNvdXJjZS5maWxlU2l6ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmKCBoYXNQZGYgJiYgZm9ybWF0cy5sZW5ndGggPiAxICkge1xuICAgICAgLy8gc2hvdyBkcm9wZG93biB0byBzZWxlY3QgcGRmIHZzIGltYWdlXG4gICAgICB0aGlzLnNob3dJbWFnZUZvcm1hdHMgPSB0cnVlO1xuICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybWF0XCIpLmlubmVySFRNTCA9ICcnO1xuICAgICAgXG4gICAgICBmb3JtYXRzLmZvckVhY2goKGZvcm1hdCkgPT4ge1xuICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgbGV0IGltYWdlTGFiZWwgPSBmb3JtYXQuZm9ybWF0O1xuICAgICAgICBpZiggZm9ybWF0LmZpbGVTaXplICYmICFpc05hTihmb3JtYXQuZmlsZVNpemUpICkgaW1hZ2VMYWJlbCArPSAnICgnICsgYnl0ZXMoZm9ybWF0LmZpbGVTaXplKS50b0xvd2VyQ2FzZSgpICsgJyknO1xuICAgICAgICBvcHRpb24udmFsdWUgPSBmb3JtYXQuZm9ybWF0O1xuICAgICAgICBvcHRpb24uaW5uZXJIVE1MID0gaW1hZ2VMYWJlbFxuICAgICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNmb3JtYXRcIikuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zaG93RG93bmxvYWRMYWJlbCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dEb3dubG9hZExhYmVsID0gdHJ1ZTtcbiAgICBcbiAgICAgIGxldCBpbWFnZUxhYmVsID0gJyc7XG4gICAgICBpZiggZm9ybWF0cy5sZW5ndGggKSBpbWFnZUxhYmVsICs9IGZvcm1hdHMubWFwKGYgPT4gZi5mb3JtYXQpLmpvaW4oJywgJykgKyAnICc7XG4gICAgICBpbWFnZUxhYmVsICs9ICcoJyArIChieXRlcyhmb3JtYXRzLnJlZHVjZSgoKGEsIHIpID0+IGEgKyByLmZpbGVTaXplKSwgMCkpfHwnJykudG9Mb3dlckNhc2UoKSArICcpJztcbiAgICAgIFxuICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjbWVkaWEtZm9ybWF0LWxhYmVsXCIpLmlubmVySFRNTCA9IGltYWdlTGFiZWw7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNtZWRpYS1hbGwtZm9ybWF0LWxhYmVsXCIpLmlubmVySFRNTCA9IGltYWdlTGFiZWw7ICAgICAgXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX2dldEltYWdlRm9ybWF0XG4gICAqIEBkZXNjcmlwdGlvbiBnZXQgdGhlIGltYWdlIGZvcm1hdC4gTG9va3MgYXQgdGhlIHNjaGVtYS5vcmcgZmlsZUZvcm1hdCBwYXJhbWV0ZXIgb3IgZmFsbHMgYmFjayB0byB0aGUgdXJsXG4gICAqXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAqL1xuICBfZ2V0SW1hZ2VGb3JtYXQoaW1hZ2VSZWNvcmQpIHtcbiAgICBpZiAoIWltYWdlUmVjb3JkIHx8ICFpbWFnZVJlY29yZC51cmwpIHJldHVybjtcblxuICAgIC8vIGdldCB0aGUgZ3JhcGggcmVjb3JkIGZvciB0aGUgaW1hZ2VcbiAgICBpbWFnZVJlY29yZCA9IHRoaXMuZ3JhcGhJbmRleFtpbWFnZVJlY29yZC51cmwuc3BsaXQoJy9mY3JlcG8vcmVzdCcpWzFdXTsgXG5cbiAgICBpZiggIWltYWdlUmVjb3JkICkgcmV0dXJuO1xuICAgIFxuICAgIGxldCBvcmlnaW5hbEZvcm1hdCA9IChcbiAgICAgIGltYWdlUmVjb3JkLmZpbGVGb3JtYXQgfHxcbiAgICAgIGltYWdlUmVjb3JkW1wiQGlkXCJdPy5zcGxpdChcIi5cIikucG9wKCkgfHxcbiAgICAgIGltYWdlUmVjb3JkPy5zcGxpdCgnLicpLnBvcCgpIHx8XG4gICAgICBcIlwiXG4gICAgKVxuICAgICAgLnJlcGxhY2UoLy4qXFwvLywgXCJcIilcbiAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgIC8vIGhhY2tcbiAgICBpZiAob3JpZ2luYWxGb3JtYXQgPT09IFwianBlZ1wiKSBvcmlnaW5hbEZvcm1hdCA9IFwianBnXCI7XG4gICAgcmV0dXJuIG9yaWdpbmFsRm9ybWF0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uRm9ybWF0U2VsZWN0ZWRcbiAgICogQHByaXZhdGVcbiAgICogQGRlc2NyaXB0aW9uIHdoZW4gYSBmb3JtYXQgaXMgc2VsZWN0ZWQsIHJlbmRlciB0aGUgZG93bmxvYWQgYnV0dG9uLlxuICAgKi9cbiAgX29uRm9ybWF0U2VsZWN0ZWQoKSB7XG4gICAgbGV0IHNlbGVjdGVkRm9ybWF0ID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybWF0XCIpLnZhbHVlO1xuICAgIGxldCBzb3VyY2VzID0gdGhpcy5zb3VyY2VzLmZpbHRlcihzID0+IHMubGFiZWwgPT09IHNlbGVjdGVkRm9ybWF0IHx8IHMudXJsPy5zcGxpdCgnLicpLnBvcCgpID09PSBzZWxlY3RlZEZvcm1hdCk7XG4gICAgdGhpcy5fc2V0WmlwUGF0aHMoc291cmNlcy5tYXAocyA9PiBzLnVybC5yZXBsYWNlKCcvZmNyZXBvL3Jlc3QnLCAnJykpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF90b2dnbGVNdWx0aXBsZURvd25sb2FkXG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byByYWRpbyBidXR0b25zIGNsaWNrIGV2ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2dCB0aGUgY2xpY2sgZXZlbnRcbiAgICogQHBhcmFtIHtCb29sZWFufSBwcmVzZWxlY3RQZGYgaWYgdHJ1ZSwgdGhlbiBwcmVzZWxlY3QgdGhlIHBkZiBmb3JtYXQgaWYgaXQgZXhpc3RzXG4gICAqL1xuICBfdG9nZ2xlTXVsdGlwbGVEb3dubG9hZChldnQsIHByZXNlbGVjdFBkZj1mYWxzZSkge1xuICAgIGlmKCBwcmVzZWxlY3RQZGYgJiYgdGhpcy5maXJzdExvYWQpIHtcbiAgICAgIGxldCBwZGZPcHRpb24gPSBBcnJheS5mcm9tKHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm1hdFwiKS5vcHRpb25zKS5maWx0ZXIobyA9PiBvLnZhbHVlID09PSAncGRmJylbMF07XG4gICAgICBpZiggcGRmT3B0aW9uICkgcGRmT3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjZnVsbHNldFwiKS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI3NpbmdsZVwiKS5jaGVja2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5mdWxsU2V0U2VsZWN0ZWQgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNmdWxsc2V0XCIpLmNoZWNrZWRcbiAgICAgICAgPyB0cnVlXG4gICAgICAgIDogZmFsc2U7XG4gICAgXG4gICAgbGV0IHNlbGVjdGVkRm9ybWF0ID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybWF0XCIpLnZhbHVlO1xuICAgIGxldCBzb3VyY2VzID0gdGhpcy5zb3VyY2VzLmZpbHRlcihzID0+IHMubGFiZWwgPT09IHNlbGVjdGVkRm9ybWF0IHx8ICFzZWxlY3RlZEZvcm1hdCk7XG4gICAgbGV0IHVybHMgPSBbXTtcblxuICAgIGlmKCB0aGlzLmZ1bGxTZXRTZWxlY3RlZCApIHtcbiAgICAgIHRoaXMuc2hvd0Rvd25sb2FkTGFiZWwgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93RG93bmxvYWRMYWJlbCA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuX3NldERvd25sb2FkSHJlZih0aGlzLnNvdXJjZXMpO1xuICAgIHRoaXMuX3JlbmRlckRvd25sb2FkU2luZ2xlRm9ybWF0KCk7XG5cbiAgICBpZiggdGhpcy5pc0Jvb2tyZWFkZXIgJiYgIXRoaXMuZnVsbFNldFNlbGVjdGVkICkge1xuICAgICAgdGhpcy5fb25Cb29rcmVhZGVyU3RhdGVVcGRhdGUodGhpcy5Cb29rUmVhZGVyTW9kZWwuZ2V0U3RhdGUoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybHMgPSBzb3VyY2VzLm1hcChzID0+IHMudXJsLnJlcGxhY2UoJy9mY3JlcG8vcmVzdCcsICcnKSk7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuX3NldFppcFBhdGhzKHVybHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX3NldFppcFBhdGhzXG4gICAqIEBkZXNjcmlwdGlvbiBzZXQgdGhlIHppcCB1cmwgYmFzZWQgb24gbXV0bGlwYWdlIGJvb2tyZWFkZXIgc2VsZWN0ZWQgcGFnZVxuICAgKi9cbiAgX3NldFppcFBhdGhzKHVybHM9W10pIHtcbiAgICB0aGlzLnppcE5hbWUgPSB0aGlzLnJvb3RSZWNvcmQubmFtZVxuICAgICAgLnJlcGxhY2UoL1teYS16QS1aMC05XS9nLCBcIi1cIilcbiAgICAgIC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYoICF1cmxzLmxlbmd0aCApIHJldHVybjtcblxuICAgIGlmKCB1cmxzLmxlbmd0aCA9PT0gMSApIHtcbiAgICAgIHRoaXMuYXJjaGl2ZUhyZWYgPSAnL2ZjcmVwby9yZXN0Jyt1cmxzWzBdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuemlwQ29uY2F0ZW5hdGVkUGF0aHMgPSB1cmxzLmpvaW4oJywnKTtcbiAgICB0aGlzLnppcFBhdGhzID0gdXJscztcblxuICAgIC8vIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm1hdFwiKSB0byBnZXQgY3VycmVudCBmb3JtYXQsIG1hdGNoIHRvIHVybCBsYWJlbD9cbiAgICB0aGlzLmFyY2hpdmVIcmVmID0gYC9maW4vYXJjaGl2ZT9wYXRocz0ke3RoaXMuemlwQ29uY2F0ZW5hdGVkUGF0aHN9JHt0aGlzLnppcE5hbWUgPyAnJm5hbWU9Jyt0aGlzLnppcE5hbWUgOiAnJ31gO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uRG93bmxvYWRGdWxsU2V0Q2xpY2tlZFxuICAgKiBAZGVzY3JpcHRpb24gYm91bmQgdG8gZG93bmxvYWQgc2V0IGJ1dHRvbiBjbGljayBldmVudFxuICAgKi9cbiAgYXN5bmMgX29uRG93bmxvYWRGdWxsU2V0Q2xpY2tlZChlKSB7XG4gICAgaWYoIHRoaXMuZGlzYWJsZURvd25sb2FkICkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBwYXRoID0gdGhpcy5yb290UmVjb3JkW1wiQGlkXCJdLnJlcGxhY2UoY29uZmlnLmZjcmVwb0Jhc2VQYXRoLCBcIlwiKTtcbiAgICBndGFnKFwiZXZlbnRcIiwgXCJkb3dubG9hZFwiLCB7XG4gICAgICBldmVudF9jYXRlZ29yeTogXCJmdWxsc2V0XCIsXG4gICAgICBldmVudF9sYWJlbDogcGF0aCxcbiAgICAgIHZhbHVlOiAxLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uRG93bmxvYWRDbGlja2VkXG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byBkb3dubG9hZCBidXR0b24gY2xpY2sgZXZlbnQsIHJlY29yZCBhbmFseXRpY3NcbiAgICovXG4gIF9vbkRvd25sb2FkQ2xpY2tlZChlKSB7XG4gICAgaWYoIHRoaXMuZGlzYWJsZURvd25sb2FkICkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcGF0aCA9IHRoaXMuaHJlZi5yZXBsYWNlKGNvbmZpZy5mY3JlcG9CYXNlUGF0aCwgXCJcIik7XG5cbiAgICBndGFnKFwiZXZlbnRcIiwgXCJkb3dubG9hZFwiLCB7XG4gICAgICBldmVudF9jYXRlZ29yeTogdGhpcy5zb3VyY2VUeXBlLFxuICAgICAgZXZlbnRfbGFiZWw6IHBhdGgsXG4gICAgICB2YWx1ZTogMSxcbiAgICB9KTtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJhcHAtbWVkaWEtZG93bmxvYWRcIiwgQXBwTWVkaWFEb3dubG9hZCk7XG4iLCJpbXBvcnQgeyBodG1sLCB1bnNhZmVDU1MgfSBmcm9tIFwibGl0XCI7XG5cbmltcG9ydCB7IHNoYXJlZFN0eWxlcyB9IGZyb20gXCIuLi8uLi9zdHlsZXMvc2hhcmVkLXN0eWxlc1wiO1xuaW1wb3J0IGxpc3RzQ3NzIGZyb20gXCJAdWNkLWxpYi90aGVtZS1zYXNzLzJfYmFzZV9jbGFzcy9fbGlzdHMuY3NzXCI7XG5pbXBvcnQgaW5kZXhDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvMl9iYXNlX2NsYXNzL19pbmRleC5jc3NcIjtcbmltcG9ydCBmb3Jtc0h0bWxDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvMV9iYXNlX2h0bWwvX2Zvcm1zLmNzc1wiO1xuaW1wb3J0IGZvcm1zQ3NzIGZyb20gXCJAdWNkLWxpYi90aGVtZS1zYXNzLzJfYmFzZV9jbGFzcy9fZm9ybXMuY3NzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgcmV0dXJuIGh0bWxgXG4gICAgPHN0eWxlPlxuICAgICAgJHtsaXN0c0Nzc31cbiAgICAgICAgJHtpbmRleENzc31cbiAgICAgICAgJHtmb3Jtc0h0bWxDc3N9XG4gICAgICAgICR7Zm9ybXNDc3N9XG4gICAgICAgICR7c2hhcmVkU3R5bGVzfVxuICAgICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuXG4gICAgICBbaGlkZGVuXSB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgIH1cblxuICAgICAgLmluZm8ge1xuICAgICAgICBtYXJnaW46IDEwcHggMDtcbiAgICAgICAgZm9udC1zaXplOiB2YXIoLS1mcy1zbSk7XG4gICAgICB9XG5cbiAgICAgIGEge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgcGFkZGluZzogOHB4O1xuICAgICAgICBjb2xvcjogdmFyKC0tZGVmYXVsdC1wcmltYXJ5LWNvbG9yKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGVmYXVsdC1zZWNvbmRhcnktY29sb3IpO1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICBmb250LXNpemU6IHZhcigtLWZzLXNtKTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IHZhcigtLWZ3LWJvbGQpO1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIGhlaWdodDogMjRweDtcbiAgICAgIH1cblxuICAgICAgYTpmb2N1cyB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1kZWZhdWx0LXByaW1hcnktY29sb3IpO1xuICAgICAgfVxuXG4gICAgICBidXR0b246Zm9jdXMge1xuICAgICAgICBjb2xvcjogdmFyKC0tZGVmYXVsdC1wcmltYXJ5LWNvbG9yKTtcbiAgICAgIH1cblxuICAgICAgLnJhZGlvIGxhYmVsIHtcbiAgICAgICAgY29sb3I6IGJsYWNrOyAgXG4gICAgICB9XG4gICAgICAucmFkaW8gbGFiZWw6YmVmb3JlIHtcbiAgICAgICAgdG9wOiA1cHg7XG4gICAgICAgIGxlZnQ6IC0xcHg7XG4gICAgICB9XG5cbiAgICAgIHNlbGVjdCB7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMTVweDtcbiAgICAgICAgcGFkZGluZzogNXB4IDQwcHggNXB4IDEwcHg7XG4gICAgICAgIGhlaWdodDogNDBweDtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuXG4gICAgICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICAgICAgICAtbXMtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgLW8tYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgYXBwZWFyYW5jZTogbm9uZTtcblxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCAxMHB4IGNlbnRlcjtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiAxMHB4IDZweDtcbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhacFpYZENiM2c5SWpBZ01DQXhNQ0EySWlCM2FXUjBhRDBpTVRCd2VDSWdhR1ZwWjJoMFBTSTJjSGdpUGp4a1pXWnpQanh6ZEhsc1pUNHVZMnh6TFRGN1ptbHNiRG9qTURBeU5qVTFPMzA4TDNOMGVXeGxQand2WkdWbWN6NDhaejQ4Y0c5c2VXZHZiaUJqYkdGemN6MGlZMnh6TFRFaUlIQnZhVzUwY3owaU1DQXdJREV3SURBZ05TQTJJREFnTUNJdlBqd3ZaejQ4TDNOMlp6ND1cIik7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1lZGl1bS1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgICAgICAgY29sb3I6IHZhcigtLWRlZmF1bHQtcHJpbWFyeS1jb2xvcik7XG4gICAgICB9XG5cbiAgICAgIHNlbGVjdC5wbGFpblRleHQge1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgICBjb2xvcjogYmxhY2s7XG4gICAgICB9XG5cbiAgICAgIGJ1dHRvbiB7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIC8qIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7ICovXG4gICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgICBmb250LXdlaWdodDogdmFyKC0tZnctYm9sZCk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRlZmF1bHQtc2Vjb25kYXJ5LWNvbG9yKTtcbiAgICAgICAgY29sb3I6IHZhcigtLWRlZmF1bHQtcHJpbWFyeS1jb2xvcik7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBwYWRkaW5nOiAwLjc1cmVtIDFyZW07XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxLjQ7XG4gICAgICB9XG5cbiAgICAgIC8qIGZvciBJRSAqL1xuICAgICAgc2VsZWN0OjotbXMtZXhwYW5kIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cbiAgICAgIHNlbGVjdCBvcHRpb24ge1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgfVxuXG4gICAgICAubGF5b3V0IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIH1cblxuICAgICAgLnJhZGlvIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICAgIH1cblxuICAgICAgLmRvd25sb2FkQnRuIHtcbiAgICAgICAgbWluLWhlaWdodDogMS40cmVtO1xuICAgICAgICBoZWlnaHQ6IDEuNHJlbTtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWdvbGQpO1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIC5kb3dubG9hZEJ0bjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUpO1xuICAgICAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtZ29sZCk7XG4gICAgICB9XG5cbiAgICAgICNmb3JtYXQge1xuICAgICAgICBoZWlnaHQ6IDIuNjVyZW07XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtNTApO1xuICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICBwYWRkaW5nOiAwIDEuNXJlbSAwIDFyZW07XG4gICAgICAgIG1pbi13aWR0aDogMzUlO1xuICAgICAgICBtYXgtd2lkdGg6IDZyZW07XG4gICAgICB9XG5cbiAgICAgICNtZWRpYS1mb3JtYXQtbGFiZWwsXG4gICAgICAjbWVkaWEtYWxsLWZvcm1hdC1sYWJlbCxcbiAgICAgICNtdWx0aW1lZGlhLWZvcm1hdC1sYWJlbCxcbiAgICAgICNtdWx0aW1lZGlhLWFsbC1mb3JtYXQtbGFiZWwge1xuICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICAgIG1hcmdpbi1yaWdodDogMC43NXJlbTtcbiAgICAgICAgaGVpZ2h0OiAyLjdyZW07XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyLjdyZW07XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgYm9yZGVyOiBzb2xpZCAycHggdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS01MCk7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgcGFkZGluZzogMCAxcmVtO1xuICAgICAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgfVxuXG4gICAgICAjc2luZ2xlLFxuICAgICAgI2Z1bGxzZXQge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgfVxuICAgIDwvc3R5bGU+XG5cbiAgICA8ZGl2IGlkPVwid3JhcHBlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cImxheW91dFwiID9oaWRkZW49XCIkeyF0aGlzLmhhc011bHRpcGxlRG93bmxvYWRNZWRpYSB8fCB0aGlzLmRvd25sb2FkQWxsTWVkaWF9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyYWRpb1wiIHN0eWxlPVwibWFyZ2luLXJpZ2h0OiAxcmVtXCI+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBpZD1cInNpbmdsZVwiXG4gICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgbmFtZT1cInNldC1zaXplXCJcbiAgICAgICAgICAgID9jaGVja2VkPVwiJHshdGhpcy5mdWxsU2V0U2VsZWN0ZWR9XCJcbiAgICAgICAgICAgIEBjbGljaz1cIiR7dGhpcy5fdG9nZ2xlTXVsdGlwbGVEb3dubG9hZH1cIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cInNpbmdsZVwiPlNlbGVjdGVkIFBhZ2U8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJhZGlvXCI+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBpZD1cImZ1bGxzZXRcIlxuICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgIG5hbWU9XCJzZXQtc2l6ZVwiXG4gICAgICAgICAgICA/Y2hlY2tlZD1cIiR7dGhpcy5mdWxsU2V0U2VsZWN0ZWR9XCJcbiAgICAgICAgICAgIEBjbGljaz1cIiR7dGhpcy5fdG9nZ2xlTXVsdGlwbGVEb3dubG9hZH1cIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cImZ1bGxzZXRcIj5BbGwgRmlsZXMgKCR7dGhpcy5mdWxsU2V0Q291bnR9KTwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2ID9oaWRkZW49XCIke3RoaXMuZnVsbFNldFNlbGVjdGVkfVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImxheW91dCBidG5zXCJcbiAgICAgICAgP2hpZGRlbj1cIiR7IXRoaXMuc2VsZWN0ZWRNZWRpYUhhc1NvdXJjZXN9XCI+XG4gICAgICAgIDxzcGFuIGlkPVwibXVsdGltZWRpYS1mb3JtYXQtbGFiZWxcIlxuICAgICAgICAgID9oaWRkZW49XCIkeyF0aGlzLmlzTXVsdGltZWRpYX1cIj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3BhbiBpZD1cIm1lZGlhLWZvcm1hdC1sYWJlbFwiXG4gICAgICAgICAgP2hpZGRlbj1cIiR7IXRoaXMuc2hvd0Rvd25sb2FkTGFiZWwgfHwgdGhpcy5pc011bHRpbWVkaWF9XCI+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPGEgY2xhc3M9XCJkb3dubG9hZEJ0biBidG5cIlxuICAgICAgICAgID9oaWRkZW49XCIkeyh0aGlzLmlzVHdvUGFnZVZpZXcgfHwgdGhpcy5kb3dubG9hZEFsbE1lZGlhKSAmJiB0aGlzLnNvdXJjZXMubGVuZ3RoID4gMX1cIlxuICAgICAgICAgIGhyZWY9XCIke3RoaXMuaHJlZn1cIlxuICAgICAgICAgIEBjbGljaz1cIiR7dGhpcy5fb25Eb3dubG9hZENsaWNrZWR9XCJcbiAgICAgICAgICBkb3dubG9hZFxuICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgcmVsPVwibm9vcGVuZXJcIlxuICAgICAgICAgIHN0eWxlPVwid2hpdGUtc3BhY2U6IG5vd3JhcDsgdGV4dC1hbGlnbjogY2VudGVyO1wiPlxuICAgICAgICAgIDxzcGFuPiBEb3dubG9hZCA8L3NwYW4+XG4gICAgICAgIDwvYT5cbiAgICAgICAgPGEgY2xhc3M9XCJkb3dubG9hZEJ0biBhcmNoaXZlIGJ0blwiXG4gICAgICAgICAgP2hpZGRlbj1cIiR7KCF0aGlzLmlzVHdvUGFnZVZpZXcgJiYgIXRoaXMuZG93bmxvYWRBbGxNZWRpYSkgfHwgdGhpcy5zb3VyY2VzLmxlbmd0aCA9PT0gMX1cIlxuICAgICAgICAgIGhyZWY9XCIke3RoaXMuYXJjaGl2ZUhyZWZ9XCJcbiAgICAgICAgICBAY2xpY2s9XCIke3RoaXMuX29uRG93bmxvYWRGdWxsU2V0Q2xpY2tlZH1cIlxuICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgcmVsPVwibm9vcGVuZXJcIlxuICAgICAgICAgIGRvd25sb2FkPlxuICAgICAgICAgIDxzcGFuPiBEb3dubG9hZCA8L3NwYW4+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiA/aGlkZGVuPVwiJHsodGhpcy5mdWxsU2V0U2VsZWN0ZWQgfHwgdGhpcy5pc1R3b1BhZ2VWaWV3KSAmJiB0aGlzLnNlbGVjdGVkTWVkaWFIYXNTb3VyY2VzfVwiPlxuICAgICAgPGRpdiA/aGlkZGVuPVwiJHt0aGlzLnNlbGVjdGVkTWVkaWFIYXNTb3VyY2VzfVwiPlxuICAgICAgICA8ZW0+Tm8gZG93bmxvYWRhYmxlIGl0ZW1zIGF2YWlsYWJsZTwvZW0+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4O1wiPlxuICAgICAgPHNwYW4gaWQ9XCJtdWx0aW1lZGlhLWFsbC1mb3JtYXQtbGFiZWxcIlxuICAgICAgICA/aGlkZGVuPVwiJHshdGhpcy5mdWxsU2V0U2VsZWN0ZWQgfHwgIXRoaXMuaXNNdWx0aW1lZGlhfVwiPlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gaWQ9XCJtZWRpYS1hbGwtZm9ybWF0LWxhYmVsXCJcbiAgICAgICAgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgIFxuICAgICAgICA/aGlkZGVuPVwiJHshdGhpcy5mdWxsU2V0U2VsZWN0ZWQgfHwgIXRoaXMuc2hvd0Rvd25sb2FkTGFiZWx9XCI+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDxzZWxlY3QgaWQ9XCJmb3JtYXRcIlxuICAgICAgICBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9ja1wiXG4gICAgICAgIEBjaGFuZ2U9XCIke3RoaXMuX29uRm9ybWF0U2VsZWN0ZWR9XCJcbiAgICAgICAgP2hpZGRlbj1cIiR7IXRoaXMuZnVsbFNldFNlbGVjdGVkIHx8ICF0aGlzLnNob3dJbWFnZUZvcm1hdHMgfHwgdGhpcy5zb3VyY2VzLmxlbmd0aCA8IDJ9XCI+XG4gICAgICA8L3NlbGVjdD5cbiAgICAgIDxhIGNsYXNzPVwiZG93bmxvYWRCdG4gYXJjaGl2ZSBidG5cIlxuICAgICAgICA/aGlkZGVuPVwiJHshdGhpcy5mdWxsU2V0U2VsZWN0ZWR9XCJcbiAgICAgICAgaHJlZj1cIiR7dGhpcy5hcmNoaXZlSHJlZn1cIlxuICAgICAgICBAY2xpY2s9XCIke3RoaXMuX29uRG93bmxvYWRGdWxsU2V0Q2xpY2tlZH1cIlxuICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICByZWw9XCJub29wZW5lclwiXG4gICAgICAgIGRvd25sb2FkPlxuICAgICAgICA8c3Bhbj4gRG93bmxvYWQgPC9zcGFuPlxuICAgICAgPC9hPlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSA8Zm9ybSBpZD1cImRvd25sb2FkWmlwXCIgXG4gICAgICBhY3Rpb249XCIvZmluL2FyY2hpdmVcIiBcbiAgICAgIG1ldGhvZD1cImdldFwiIFxuICAgICAgP2hpZGRlbj1cIiR7IXRoaXMuZnVsbFNldFNlbGVjdGVkfVwiPiAgICBcbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGhpZGRlbiBuYW1lPVwibmFtZVwiIHZhbHVlPVwiJHt0aGlzLnppcE5hbWV9XCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaGlkZGVuIG5hbWU9XCJwYXRoc1wiIHZhbHVlPVwiJHt0aGlzLnppcENvbmNhdGVuYXRlZFBhdGhzfVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj5cbiAgICAgIDxidXR0b24gQGNsaWNrPVwiJHt0aGlzLl9vbkRvd25sb2FkRnVsbFNldENsaWNrZWR9XCI+XG4gICAgICAgIDxzcGFuPkRvd25sb2FkPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9mb3JtPiAtLT5cblxuICBgO1xufVxuIiwiaW1wb3J0IHsgTGl0RWxlbWVudCB9IGZyb20gXCJsaXRcIjtcbmltcG9ydCByZW5kZXIgZnJvbSBcIi4vYXBwLXJlY29yZC50cGwuanNcIjtcbmltcG9ydCB7IE1haW5Eb21FbGVtZW50IH0gZnJvbSAnQHVjZC1saWIvdGhlbWUtZWxlbWVudHMvdXRpbHMvbWl4aW5zJztcbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbmltcG9ydCB7IG1hcmtkb3duIH0gZnJvbSBcIm1hcmtkb3duXCI7XG5pbXBvcnQgcmlnaHRzRGVmaW5pdGlvbnMgZnJvbSBcIi4uLy4uLy4uL2xpYi9yaWdodHMuanNvblwiO1xuaW1wb3J0IGNpdGF0aW9ucyBmcm9tIFwiLi4vLi4vLi4vbGliL21vZGVscy9DaXRhdGlvbnNNb2RlbFwiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi8uLi8uLi9saWIvdXRpbHMvaW5kZXguanNcIjtcblxuaW1wb3J0ICdAdWNkLWxpYi90aGVtZS1lbGVtZW50cy91Y2RsaWIvdWNkbGliLW1kL3VjZGxpYi1tZC5qcyc7XG5pbXBvcnQgXCJAdWNkLWxpYi90aGVtZS1lbGVtZW50cy9icmFuZC91Y2QtdGhlbWUtc2xpbS1zZWxlY3QvdWNkLXRoZW1lLXNsaW0tc2VsZWN0LmpzXCI7XG5cbmltcG9ydCBcIi4vYXBwLW1lZGlhLWRvd25sb2FkXCI7XG5pbXBvcnQgXCIuL2FwcC1mcy1tZWRpYS1kb3dubG9hZFwiO1xuaW1wb3J0IFwiLi92aWV3ZXIvYXBwLW1lZGlhLXZpZXdlclwiO1xuaW1wb3J0IFwiLi4vLi4vY29tcG9uZW50cy9jaXRhdGlvblwiO1xuXG5pbXBvcnQgdXNlciBmcm9tICcuLi8uLi8uLi9saWIvdXRpbHMvdXNlci5qcyc7XG5jbGFzcyBBcHBSZWNvcmQgZXh0ZW5kcyBNaXhpbihMaXRFbGVtZW50KVxuICAud2l0aChNYWluRG9tRWxlbWVudCwgTGl0Q29ya1V0aWxzKSB7XG4gIFxuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlY29yZDogeyB0eXBlOiBPYmplY3QgfSxcbiAgICAgIGN1cnJlbnRSZWNvcmRJZDogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIG5hbWU6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICBjb2xsZWN0aW9uTmFtZTogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIGNvbGxlY3Rpb25JbWc6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICBjb2xsZWN0aW9uSWQ6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICBjb2xsZWN0aW9uSXRlbUNvdW50OiB7IHR5cGU6IE51bWJlciB9LFxuICAgICAgZGVzY3JpcHRpb246IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICBkYXRlOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgcHVibGlzaGVyOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgc3ViamVjdHM6IHsgdHlwZTogQXJyYXkgfSxcbiAgICAgIGNyZWF0b3I6IHsgdHlwZTogQXJyYXkgfSxcbiAgICAgIGNhbGxOdW1iZXI6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICBtYXRlcmlhbDogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIHNpemU6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICByaWdodHM6IHsgdHlwZTogT2JqZWN0IH0sXG4gICAgICBtZXRhZGF0YTogeyB0eXBlOiBBcnJheSB9LFxuICAgICAgaXNCYWdPZkZpbGVzOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIGFya0RvaTogeyB0eXBlOiBBcnJheSB9LFxuICAgICAgZmVkb3JhTGlua3M6IHsgdHlwZTogQXJyYXkgfSxcbiAgICAgIGlzVWlBZG1pbiA6IHsgdHlwZSA6IEJvb2xlYW4gfSxcbiAgICAgIGVkaXRNb2RlIDogeyB0eXBlIDogQm9vbGVhbiB9LFxuICAgICAgLy8gY2l0YXRpb25zIDoge3R5cGU6IEFycmF5fVxuICAgICAgY2l0YXRpb25Sb290OiB7IHR5cGU6IE9iamVjdCB9LFxuICAgICAgaXRlbURlZmF1bHREaXNwbGF5OiB7IHR5cGU6IFN0cmluZyB9LCAvLyBjb2xsZWN0aW9uIGRlZmF1bHQgZGlzcGxheVxuICAgICAgaXRlbURpc3BsYXk6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICBkaXNwbGF5RGF0YTogeyB0eXBlOiBPYmplY3QgfSxcbiAgICAgIHNhdmVkQ29sbGVjdGlvbkRhdGE6IHsgdHlwZTogT2JqZWN0IH0sXG4gICAgICBkaXNhYmxlRG93bmxvYWQ6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgc2hvd1JlcG9ydEJ1dHRvbjogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBnaXRodWJJc3N1ZVVybDogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIGRlc2tld0ltYWdlczogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBpbWFnZXNDdXJyZW50bHlEZXNrZXdlZDogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBkZXNrZXdNaXNtYXRjaDogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBzaG93R2V0V29ya2Zsb3c6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgc2hvd1N0YXJ0V29ya2Zsb3c6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgd29ya2Zsb3dTdGF0dXNMb2FkaW5nOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIHdvcmtmbG93QWxyZWFkeUV4ZWN1dGVkOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIHdvcmtmbG93UnVubmluZzogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICB3b3JrZmxvd1N0YXR1czogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIHdvcmtmbG93RXJyb3I6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgZmlyc3RTdGF0dXNMb2FkZWQ6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgY29weXJpZ2h0OiB7IHR5cGU6IE9iamVjdCB9XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLl9yZXNldCgpO1xuXG4gICAgdGhpcy5faW5qZWN0TW9kZWwoXG4gICAgICBcIkFwcFN0YXRlTW9kZWxcIixcbiAgICAgIFwiUmVjb3JkTW9kZWxcIixcbiAgICAgIFwiQ29sbGVjdGlvbk1vZGVsXCIsXG4gICAgICBcIlNlb01vZGVsXCIsXG4gICAgICBcIkZjQXBwQ29uZmlnTW9kZWxcIixcbiAgICAgIFwiV29ya2Zsb3dNb2RlbFwiXG4gICAgKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuX29uUGFnZUNsaWNrKCkpO1xuICB9XG5cbiAgX3Jlc2V0KCkge1xuICAgIHRoaXMucmVjb3JkID0ge307XG4gICAgdGhpcy5jdXJyZW50UmVjb3JkSWQgPSBcIlwiO1xuICAgIHRoaXMubmFtZSA9IFwiXCI7XG4gICAgdGhpcy5jb2xsZWN0aW9uTmFtZSA9IFwiXCI7XG4gICAgdGhpcy5yZW5kZXJlZFJlY29yZElkID0gXCJcIjtcblxuICAgIHRoaXMuZGF0ZSA9IFwiXCI7XG4gICAgdGhpcy5wdWJsaXNoZXIgPSBcIlwiO1xuICAgIHRoaXMuc3ViamVjdHMgPSBbXTtcbiAgICB0aGlzLmNyZWF0b3IgPSBbXTtcbiAgICB0aGlzLmNhbGxOdW1iZXIgPSBcIlwiO1xuICAgIHRoaXMubWF0ZXJpYWwgPSBcIlwiO1xuICAgIHRoaXMuY29sbGVjdGlvbkltZyA9IFwiXCI7XG4gICAgdGhpcy5kZWZhdWx0Q29sbGVjdGlvbkltZyA9IFwiL2ltYWdlcy90cmVlLWJpa2UtaWxsdXN0cmF0aW9uLnBuZ1wiO1xuICAgIHRoaXMuY29sbGVjdGlvbklkID0gXCJcIjtcbiAgICB0aGlzLnJlbmRlcmVkQ29sbGVjdGlvbklkID0gXCJcIjtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJcIjtcblxuICAgIHRoaXMuc2l6ZSA9IFwiXCI7XG4gICAgdGhpcy5yaWdodHMgPSB7fTtcbiAgICB0aGlzLm1ldGFkYXRhID0gW107XG4gICAgdGhpcy5pc0JhZ09mRmlsZXMgPSBmYWxzZTtcbiAgICB0aGlzLmFya0RvaSA9IFtdO1xuICAgIHRoaXMuZmVkb3JhTGlua3MgPSBbXTtcbiAgICAvLyB0aGlzLmNpdGF0aW9ucyA9IFtdO1xuICAgIHRoaXMuY2l0YXRpb25Sb290ID0ge307XG4gICAgdGhpcy5jb2xsZWN0aW9uSXRlbUNvdW50ID0gMDtcbiAgICB0aGlzLml0ZW1EZWZhdWx0RGlzcGxheSA9IHV0aWxzLml0ZW1EaXNwbGF5VHlwZS5iclR3b1BhZ2U7XG4gICAgdGhpcy5pdGVtRGlzcGxheSA9ICcnO1xuXG4gICAgdGhpcy5pc1VpQWRtaW4gPSB1c2VyLmNhbkVkaXRVaSgpO1xuICAgIHRoaXMuZWRpdE1vZGUgPSBmYWxzZTtcbiAgICB0aGlzLmRpc3BsYXlEYXRhID0ge307XG4gICAgdGhpcy5zYXZlZENvbGxlY3Rpb25EYXRhID0ge307XG4gICAgdGhpcy5kaXNhYmxlRG93bmxvYWQgPSBBUFBfQ09ORklHLmRpc2FibGVGaWxlRG93bmxvYWRzO1xuXG4gICAgdGhpcy5zaG93UmVwb3J0QnV0dG9uID0gZmFsc2U7XG4gICAgdGhpcy5naXRodWJJc3N1ZVVybCA9ICcnO1xuICAgIC8vIHRoaXMuZGVza2V3SW1hZ2VzID0gZmFsc2U7XG4gICAgLy8gdGhpcy5pbWFnZXNDdXJyZW50bHlEZXNrZXdlZCA9IGZhbHNlO1xuICAgIC8vIHRoaXMuZGVza2V3TWlzbWF0Y2ggPSBmYWxzZTtcbiAgICB0aGlzLnNob3dHZXRXb3JrZmxvdyA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd1N0YXJ0V29ya2Zsb3cgPSBmYWxzZTtcbiAgICB0aGlzLndvcmtmbG93U3RhdHVzTG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMud29ya2Zsb3dBbHJlYWR5RXhlY3V0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLndvcmtmbG93UnVubmluZyA9IGZhbHNlOyBcbiAgICB0aGlzLndvcmtmbG93U3RhdHVzID0gJyc7XG4gICAgdGhpcy53b3JrZmxvd0Vycm9yID0gZmFsc2U7XG4gICAgdGhpcy5maXJzdFN0YXR1c0xvYWRlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy53b3JrZmxvd0ludGVydmFsSWQgPSBudWxsO1xuICAgIHRoaXMuY29weXJpZ2h0ID0ge307XG4gIH1cblxuICBfb25QYWdlQ2xpY2soZSkge1xuICAgIGxldCBhcHBTaGFyZUJ0biA9IHRoaXMucXVlcnlTZWxlY3RvcignYXBwLW1lZGlhLXZpZXdlci1uYXYnKT8uc2hhZG93Um9vdD8ucXVlcnlTZWxlY3RvcignYXBwLXNoYXJlLWJ0bicpO1xuICAgIGlmKCBhcHBTaGFyZUJ0biApIGFwcFNoYXJlQnRuLnZpc2libGUgPSBmYWxzZTtcbiAgfVxuXG4gIGFzeW5jIGZpcnN0VXBkYXRlZCgpIHtcbiAgICAvLyB0aGlzLl9vblJlY29yZFVwZGF0ZShhd2FpdCB0aGlzLlJlY29yZE1vZGVsLmdldCh0aGlzLkFwcFN0YXRlTW9kZWwubG9jYXRpb24uZnVsbHBhdGgpKTsgLy8gdGhpcyBjYXVzZXMgYmFkbmVzcyB3aXRoIGllIC9tZWRpYS9pbWFnZXM6NCBwYXRoc1xuICAgIHRoaXMuX29uQXBwU3RhdGVVcGRhdGUoYXdhaXQgdGhpcy5BcHBTdGF0ZU1vZGVsLmdldCgpKTtcbiAgICBpZiggdGhpcy5SZWNvcmRNb2RlbC5jdXJyZW50UmVjb3JkSWQgKSB0aGlzLl9vblJlY29yZFVwZGF0ZShhd2FpdCB0aGlzLlJlY29yZE1vZGVsLmdldCh0aGlzLlJlY29yZE1vZGVsLmN1cnJlbnRSZWNvcmRJZCkpO1xuICAgIGlmKCB0aGlzLmNvbGxlY3Rpb25JZCApIHRoaXMuX29uQ29sbGVjdGlvblVwZGF0ZShhd2FpdCB0aGlzLkNvbGxlY3Rpb25Nb2RlbC5nZXQodGhpcy5jb2xsZWN0aW9uSWQpKTtcblxuICAgIHRoaXMuX3VwZGF0ZVNsaW1TdHlsZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblJlY29yZFVwZGF0ZVxuICAgKiBAZGVzY3JpcHRpb24gZnJvbSBSZWNvcmRNb2RlbCwgbGlzdGVuIGZvciBsb2FkaW5nIGV2ZW50cyBhbmQgcmVzZXQgVUkuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIHN0YXRlIGV2ZW50XG4gICAqL1xuICBhc3luYyBfb25SZWNvcmRVcGRhdGUoZSkge1xuICAgIGlmIChlLnN0YXRlICE9PSBcImxvYWRlZFwiKSByZXR1cm47XG5cbiAgICBsZXQgcmVjb3JkID0gZS52Y0RhdGE7XG4gICAgaWYoICFyZWNvcmQgfHwgdGhpcy5yZW5kZXJlZFJlY29yZElkID09PSByZWNvcmRbJ0BpZCddICkgcmV0dXJuO1xuXG4gICAgdGhpcy5ncmFwaCA9IGUucGF5bG9hZC5kYXRhWydAZ3JhcGgnXSB8fCBbXTtcbiAgICAvLyB0aGlzLnBhcnNlV29ya2Zsb3dJbWFnZXMoKTtcblxuICAgIHRoaXMucmVuZGVyZWRSZWNvcmRJZCA9IHJlY29yZFtcIkBpZFwiXTtcbiAgICB0aGlzLnJlY29yZCA9IHJlY29yZDtcblxuICAgIHRoaXMuY3VycmVudFJlY29yZElkID0gdGhpcy5yZWNvcmRbXCJAaWRcIl07XG4gICAgdGhpcy5uYW1lID0gdGhpcy5yZWNvcmQubmFtZTtcbiAgICB0aGlzLmNvbGxlY3Rpb25OYW1lID0gdGhpcy5yZWNvcmQuY29sbGVjdGlvbk5hbWU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMucmVjb3JkLmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZGF0ZSA9IHV0aWxzLmZvcm1hdERhdGVTdHJpbmcodGhpcy5yZWNvcmQuZGF0ZSk7XG4gICAgdGhpcy5wdWJsaXNoZXIgPSB0aGlzLnJlY29yZC5wdWJsaXNoZXI7XG4gICAgdGhpcy5zdWJqZWN0cyA9IHRoaXMucmVjb3JkLnN1YmplY3RzIHx8IFtdO1xuICAgIHRoaXMuY2FsbE51bWJlciA9IHRoaXMucmVjb3JkLmNhbGxOdW1iZXI7XG4gICAgdGhpcy5tYXRlcmlhbCA9IHRoaXMucmVjb3JkLm1hdGVyaWFsO1xuICAgIHRoaXMuY3JlYXRvciA9IHRoaXMucmVjb3JkLmNyZWF0b3IgfHwgW107XG4gICAgaWYoICFBcnJheS5pc0FycmF5KHRoaXMuY3JlYXRvcikgKSB0aGlzLmNyZWF0b3IgPSBbdGhpcy5jcmVhdG9yXTtcblxuICAgIHRoaXMuY2l0YXRpb25Sb290ID0gdGhpcy5yZWNvcmQucm9vdDtcbiAgICB0aGlzLmNvbGxlY3Rpb25JZCA9IHRoaXMucmVjb3JkLmNvbGxlY3Rpb25JZDtcblxuICAgIHRoaXMuX3VwZGF0ZUxpbmtzKHRoaXMuQXBwU3RhdGVNb2RlbC5sb2NhdGlvbiwgcmVjb3JkKTtcblxuICAgIGxldCBsaWNlbnNlID0gZS5wYXlsb2FkPy5yb290Py5saWNlbnNlPy5bJ0BpZCddIHx8ICcnO1xuICAgIGxldCBsaWNlbnNlUGF0aCA9IGxpY2Vuc2U/LnNwbGl0KCdyaWdodHNzdGF0ZW1lbnRzLm9yZycpPy5bMV0gfHwgJyc7IC8vIHRvIGhhbmRsZSBodHRwL2h0dHBzXG4gICAgdGhpcy5jb3B5cmlnaHQgPSByaWdodHNEZWZpbml0aW9uc1tsaWNlbnNlUGF0aF0gfHwge307XG5cbiAgICBpZiggQVBQX0NPTkZJRy51c2VyPy5sb2dnZWRJbiApIHtcbiAgICAgIGxldCB0ID0gYXdhaXQgdGhpcy5SZWNvcmRNb2RlbC5nZXRHaXRJbmZvKHRoaXMuY3VycmVudFJlY29yZElkKTtcbiAgICAgIHRoaXMuc2hvd1JlcG9ydEJ1dHRvbiA9ICh0LnN0YXRlID09PSAnbG9hZGVkJyAmJiB0LnBheWxvYWQgJiYgdC5wYXlsb2FkLnJlcG8pO1xuICAgICAgaWYoIHRoaXMuc2hvd1JlcG9ydEJ1dHRvbiApIHtcbiAgICAgICAgbGV0IHJvb3RVcmwgPSB0LnBheWxvYWQucmVwby5yZXBsYWNlKC9cXC5naXQkLywgJycpO1xuICAgICAgICBsZXQgZ2l0aHViRmlsZVVybCA9IHJvb3RVcmwgKyAnL3RyZWUvbWFpbicgKyB0LnBheWxvYWQuZmlsZTtcbiAgICAgICAgbGV0IGJvZHkgPSAnKipGaWxlOioqIFsnICsgdC5wYXlsb2FkLmZpbGUgKyAnXSgnK2dpdGh1YkZpbGVVcmwrJylcXG5cXG4qKkRlc2NyaXB0aW9uOioqXFxuXFxuJztcbiAgICAgICAgdGhpcy5naXRodWJJc3N1ZVVybCA9IHQucGF5bG9hZC5yZXBvLnJlcGxhY2UoL1xcLmdpdCQvLCAnJykgKyAnL2lzc3Vlcy9uZXc/dGl0bGU9JyArIGVuY29kZVVSSUNvbXBvbmVudCgnUmVxdWVzdCBjaGFuZ2UgdG8gJyArIHRoaXMuY3VycmVudFJlY29yZElkKSArICcmYm9keT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGJvZHkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dSZXBvcnRCdXR0b24gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBfb25Db2xsZWN0aW9uVXBkYXRlKGUpIHtcbiAgICBpZiggZS5zdGF0ZSAhPT0gXCJsb2FkZWRcIiB8fCBlLmlkID09PSB0aGlzLnJlbmRlcmVkQ29sbGVjdGlvbklkICkgcmV0dXJuO1xuXG4gICAgdGhpcy5jb2xsZWN0aW9uSXRlbUNvdW50ID0gZS52Y0RhdGE/LmNvdW50IHx8IDA7XG4gICAgdGhpcy5yZW5kZXJlZENvbGxlY3Rpb25JZCA9IGUuaWQ7XG4gICAgdGhpcy5jb2xsZWN0aW9uSWQgPSBlLmlkO1xuXG4gICAgbGV0IGNsaWVudEVkaXRzSWQgPSBlLnZjRGF0YS5jbGllbnRFZGl0cz8uWydAaWQnXTtcbiAgICBsZXQgb3ZlcnJpZGRlbkZlYXR1cmVJbWFnZSA9ICBlLnZjRGF0YS5jbGllbnRFZGl0cz8udGh1bWJuYWlsVXJsPy5bJ0BpZCddO1xuICAgIGlmKCBjbGllbnRFZGl0c0lkICYmIG92ZXJyaWRkZW5GZWF0dXJlSW1hZ2UgKSB7XG4gICAgICB0aGlzLmNvbGxlY3Rpb25JbWcgPSAnL2ZjcmVwby9yZXN0JyArIGNsaWVudEVkaXRzSWQgKyAnL2ZlYXR1cmVkSW1hZ2UuanBnJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb2xsZWN0aW9uSW1nID0gZS52Y0RhdGE/LmltYWdlcz8uc21hbGw/LnVybCAgICAgICAgICAgICAgICAgICBcbiAgICAgIHx8IGUudmNEYXRhPy5pbWFnZXM/Lm1lZGl1bT8udXJsIFxuICAgICAgfHwgZS52Y0RhdGE/LmltYWdlcz8ubGFyZ2U/LnVybFxuICAgICAgfHwgZS52Y0RhdGE/LmltYWdlcz8ub3JpZ2luYWw/LnVybDtcbiAgICB9XG5cbiAgICBpZiggIXRoaXMuY29sbGVjdGlvbkltZyApIHRoaXMuY29sbGVjdGlvbkltZyA9IHRoaXMuZGVmYXVsdENvbGxlY3Rpb25JbWc7ICAgIFxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uQXBwU3RhdGVVcGRhdGVcbiAgICovXG4gIGFzeW5jIF9vbkFwcFN0YXRlVXBkYXRlKGUpIHtcbiAgICBpZiggZS5sb2NhdGlvbi5wYWdlICE9PSAnaXRlbScgKSB7XG4gICAgICAvLyB0aGlzLnN0b3BXb3JrZmxvd0xvb3AgPSB0cnVlO1xuICAgICAgdGhpcy5fcmVzZXQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVTbGltU3R5bGVzKCk7XG5cbiAgICBsZXQgaGFzRXJyb3IgPSBmYWxzZTtcbiAgICBpZiggdGhpcy5SZWNvcmRNb2RlbC5jdXJyZW50UmVjb3JkSWQgKSB7XG4gICAgICB0cnkge1xuICAgICAgICBsZXQgcmVjb3JkID0gYXdhaXQgdGhpcy5SZWNvcmRNb2RlbC5nZXQodGhpcy5SZWNvcmRNb2RlbC5jdXJyZW50UmVjb3JkSWQpO1xuICAgICAgICB0aGlzLl9vblJlY29yZFVwZGF0ZShyZWNvcmQpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIGhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiggZS5wYWdlID09PSAnNDA0JyB8fCBoYXNFcnJvciApIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFwic2hvdy00MDRcIiwge30pXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICBpZiggdGhpcy5jb2xsZWN0aW9uSWQgKSB0aGlzLl9vbkNvbGxlY3Rpb25VcGRhdGUoYXdhaXQgdGhpcy5Db2xsZWN0aW9uTW9kZWwuZ2V0KHRoaXMuY29sbGVjdGlvbklkKSk7XG5cbiAgICB0aGlzLl91cGRhdGVMaW5rcyhlLmxvY2F0aW9uKTtcbiAgICBcbiAgICBhd2FpdCB0aGlzLl9wYXJzZURpc3BsYXlEYXRhKCk7XG4gIH1cblxuICAvLyBzZWUgaXNzdWUgIzM1OSwgdGhpcyB3YXMgYSBzdG9wIGdhcCB0aGF0IHdlIGZpeGVkIGluIHRoZSBpbWFnZSBwcm9jZXNzaW5nIHdvcmtmbG93XG4gIC8vIHdpbGwgbGlrZWx5IGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSwgZm9yIG5vdyBqdXN0IGRpc2FibGluZyB0aGUgdWkgY29udHJvbHNcbiAgLy8gX2dldExhdGVzdFN0YXR1c0Zyb21CYXRjaChzdGF0dXM9W10pIHtcbiAgLy8gICAvLyBncm91cCB0byBpdGVtcyBpZHMgbWFwXG4gIC8vICAgLy8gdGhlbiBmaWx0ZXIgYnkgY3JlYXRlZCBkZXNjIHRvIGdldCBsYXRlc3RcbiAgLy8gICBzdGF0dXMgPSBzdGF0dXMucmVkdWNlKChhY2MsIHN0YXR1cykgPT4ge1xuICAvLyAgICAgY29uc3QgeyBmaW5QYXRoIH0gPSBzdGF0dXM7XG4gIC8vICAgICBpZiAoIWFjY1tmaW5QYXRoXSkge1xuICAvLyAgICAgICBhY2NbZmluUGF0aF0gPSBbXTtcbiAgLy8gICAgIH1cbiAgLy8gICAgIGFjY1tmaW5QYXRoXS5wdXNoKHN0YXR1cyk7XG4gIC8vICAgICByZXR1cm4gYWNjO1xuICAvLyAgIH0sIHt9KTtcblxuICAvLyAgIGxldCBsYXRlc3QgPSBbXTtcbiAgLy8gICBPYmplY3QudmFsdWVzKHN0YXR1cykuZm9yRWFjaCh3b3JrZmxvdyA9PiB7XG4gIC8vICAgICBsYXRlc3QucHVzaCh3b3JrZmxvdy5zb3J0KChhLGIpID0+IG5ldyBEYXRlKGIuY3JlYXRlZCkgLSBuZXcgRGF0ZShhLmNyZWF0ZWQpKVswXSk7XG4gIC8vICAgfSlcbiAgLy8gICByZXR1cm4gbGF0ZXN0O1xuICAvLyB9XG5cbiAgLy8gc2VlIGlzc3VlICMzNTksIHRoaXMgd2FzIGEgc3RvcCBnYXAgdGhhdCB3ZSBmaXhlZCBpbiB0aGUgaW1hZ2UgcHJvY2Vzc2luZyB3b3JrZmxvd1xuICAvLyB3aWxsIGxpa2VseSBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUsIGZvciBub3cganVzdCBkaXNhYmxpbmcgdGhlIHVpIGNvbnRyb2xzXG4gIC8vIHVwZGF0ZVdvcmtmbG93U3RhdHVzTWVzc2FnZShzdGF0dXMpIHtcbiAgLy8gICB0aGlzLndvcmtmbG93U3RhdHVzID0gJyc7XG4gIC8vICAgaWYoIHRoaXMud29ya2Zsb3dSdW5uaW5nICkge1xuICAvLyAgICAgbGV0IHBlbmRpbmdXb3JrZmxvd3MgPSBzdGF0dXMuZmlsdGVyKHMgPT4gcy5zdGF0ZSAhPT0gJ3J1bm5pbmcnICYmIHMuc3RhdGUgIT09ICdjb21wbGV0ZWQnKS5sZW5ndGg7XG4gIC8vICAgICBsZXQgcnVubmluZ1dvcmtmbG93cyA9IHN0YXR1cy5maWx0ZXIocyA9PiBzLnN0YXRlID09PSAncnVubmluZycpLmxlbmd0aDtcbiAgLy8gICAgIGxldCBjb21wbGV0ZWRXb3JrZmxvd3MgPSBzdGF0dXMuZmlsdGVyKHMgPT4gcy5zdGF0ZSA9PT0gJ2NvbXBsZXRlZCcpLmxlbmd0aDtcblxuICAvLyAgICAgdGhpcy53b3JrZmxvd1N0YXR1cyA9IGBTdGF0dXM6ICR7cGVuZGluZ1dvcmtmbG93c30gcGVuZGluZywgJHtydW5uaW5nV29ya2Zsb3dzfSBwcm9jZXNzaW5nLCAke2NvbXBsZXRlZFdvcmtmbG93c30gY29tcGxldGUgKG9mICR7c3RhdHVzLmxlbmd0aH0pYDtcbiAgLy8gICB9XG5cbiAgLy8gICAvLyBpZiggdGhpcy5kZXNrZXdJbWFnZXMgKSB7XG4gIC8vICAgLy8gICB0aGlzLndvcmtmbG93QWxyZWFkeUV4ZWN1dGVkID0gdGhpcy5sYXRlc3RXb3JrZmxvd1R5cGUgPT09ICdkZXNrZXcnO1xuICAvLyAgIC8vIH0gZWxzZSB7XG4gIC8vICAgLy8gICB0aGlzLndvcmtmbG93QWxyZWFkeUV4ZWN1dGVkID0gdGhpcy5sYXRlc3RXb3JrZmxvd1R5cGUgPT09ICdvcmlnaW5hbCc7XG4gIC8vICAgLy8gfVxuXG4gIC8vICAgaWYoIHRoaXMud29ya2Zsb3dSdW5uaW5nICkgdGhpcy53b3JrZmxvd0FscmVhZHlFeGVjdXRlZCA9IGZhbHNlO1xuICAvLyB9XG5cbiAgLy8gc2VlIGlzc3VlICMzNTksIHRoaXMgd2FzIGEgc3RvcCBnYXAgdGhhdCB3ZSBmaXhlZCBpbiB0aGUgaW1hZ2UgcHJvY2Vzc2luZyB3b3JrZmxvd1xuICAvLyB3aWxsIGxpa2VseSBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUsIGZvciBub3cganVzdCBkaXNhYmxpbmcgdGhlIHVpIGNvbnRyb2xzXG4gIC8vIGFzeW5jIF9ydW5Xb3JrZmxvdygpIHsgICAgXG4gIC8vICAgdGhpcy53b3JrZmxvd1J1bm5pbmcgPSB0cnVlO1xuICAvLyAgIHRoaXMud29ya2Zsb3dTdGF0dXMgPSAnU3RhdHVzOiBTdGFydGluZy4uLic7XG4gIC8vICAgYXdhaXQgdGhpcy5Xb3JrZmxvd01vZGVsLmJhdGNoU3RhcnQoJ2ltYWdlLXByb2R1Y3RzJywge30sIHRoaXMud29ya2Zsb3dJbWFnZVVybHMpO1xuXG4gIC8vICAgLy8gZ2V0IHdvcmtmbG93IHN0YXR1cyBhbmQgbG9vcFxuICAvLyAgIC8vIGxldCBzdGF0dXMgPSBhd2FpdCB0aGlzLldvcmtmbG93TW9kZWwuYmF0Y2hTdGF0dXMoJ2ltYWdlLXByb2R1Y3RzJywgdGhpcy53b3JrZmxvd0ltYWdlVXJscyk7XG4gIC8vICAgLy8gc3RhdHVzID0gKHN0YXR1cy5ib2R5IHx8IFtdKS5zb3J0KChhLGIpID0+IG5ldyBEYXRlKGIuY3JlYXRlZCkgLSBuZXcgRGF0ZShhLmNyZWF0ZWQpKTtcbiAgLy8gICAvLyB0aGlzLmxhdGVzdFdvcmtmbG93U3RhdHVzID0gdGhpcy5fZ2V0TGF0ZXN0U3RhdHVzRnJvbUJhdGNoKHN0YXR1cyk7XG4gIC8vICAgdGhpcy5fc3RhcnRXb3JrZmxvd1N0YXR1c0xvb3AoKTtcbiAgLy8gfVxuXG4gIC8vIHNlZSBpc3N1ZSAjMzU5LCB0aGlzIHdhcyBhIHN0b3AgZ2FwIHRoYXQgd2UgZml4ZWQgaW4gdGhlIGltYWdlIHByb2Nlc3Npbmcgd29ya2Zsb3dcbiAgLy8gd2lsbCBsaWtlbHkgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlLCBmb3Igbm93IGp1c3QgZGlzYWJsaW5nIHRoZSB1aSBjb250cm9sc1xuICAvLyBwYXJzZVdvcmtmbG93SW1hZ2VzKCkge1xuICAvLyAgIGxldCB3b3JrZmxvd0ltYWdlVXJscyA9IFtdO1xuXG4gIC8vICAgdGhpcy5JTUFHRV9XT1JLRkxPV1MgPSB7XG4gIC8vICAgICAvLyAncGRmLWltYWdlLXByb2R1Y3RzJyA6IHtcbiAgLy8gICAgIC8vICAgbWltZVR5cGVzIDogWydhcHBsaWNhdGlvbi9wZGYnXSxcbiAgLy8gICAgIC8vICAgcHJvcGVydHkgOiAnaW1hZ2VzJyxcbiAgLy8gICAgIC8vICAgcGFnZVNlYXJjaCA6IHtcbiAgLy8gICAgIC8vICAgICBtdWx0aVBhZ2UgOiB0cnVlXG4gIC8vICAgICAvLyAgIH1cbiAgLy8gICAgIC8vIH0sXG4gIC8vICAgICAnaW1hZ2UtcHJvZHVjdHMnIDoge1xuICAvLyAgICAgICBtaW1lVHlwZXMgOiBbJ2ltYWdlL2pwZWcnLCAnaW1hZ2UvcG5nJywgJ2ltYWdlL3RpZmYnXSxcbiAgLy8gICAgICAgcHJvcGVydHk6ICdpbWFnZXMnLFxuICAvLyAgICAgICBwYWdlU2VhcmNoIDoge1xuICAvLyAgICAgICAgIG11bHRpUGFnZSA6IGZhbHNlXG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH1cbiAgLy8gICB9XG5cbiAgLy8gICB0aGlzLmdyYXBoLmZvckVhY2gobm9kZSA9PiB7XG4gIC8vICAgICBmb3IoIGxldCB3b3JrZmxvdyBpbiB0aGlzLklNQUdFX1dPUktGTE9XUyApIHtcbiAgLy8gICAgICAgbGV0IGRlZiA9IHRoaXMuSU1BR0VfV09SS0ZMT1dTW3dvcmtmbG93XTtcblxuICAvLyAgICAgICBpZiggIW5vZGUuZmlsZUZvcm1hdCApIGNvbnRpbnVlO1xuICAvLyAgICAgICBpZiggIWRlZi5taW1lVHlwZXMuaW5jbHVkZXMobm9kZS5maWxlRm9ybWF0KSApIGNvbnRpbnVlO1xuXG4gIC8vICAgICAgIHdvcmtmbG93SW1hZ2VVcmxzLnB1c2gobm9kZVsnQGlkJ10pO1xuICAvLyAgICAgfVxuICAvLyAgIH0pO1xuXG4gIC8vICAgdGhpcy53b3JrZmxvd0ltYWdlVXJscyA9IHdvcmtmbG93SW1hZ2VVcmxzO1xuICAvLyB9XG5cbiAgLy8gc2VlIGlzc3VlICMzNTksIHRoaXMgd2FzIGEgc3RvcCBnYXAgdGhhdCB3ZSBmaXhlZCBpbiB0aGUgaW1hZ2UgcHJvY2Vzc2luZyB3b3JrZmxvd1xuICAvLyB3aWxsIGxpa2VseSBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUsIGZvciBub3cganVzdCBkaXNhYmxpbmcgdGhlIHVpIGNvbnRyb2xzXG4gIC8vIF9zdGFydFdvcmtmbG93U3RhdHVzTG9vcCgpIHtcbiAgLy8gICB0aGlzLndvcmtmbG93U3RhdHVzID0gJ0xvYWRpbmcgd29ya2Zsb3cgc3RhdHVzLi4uJztcbiAgLy8gICB0aGlzLndvcmtmbG93U3RhdHVzTG9hZGluZyA9IHRydWU7XG5cbiAgLy8gICBpZiAodGhpcy53b3JrZmxvd0ludGVydmFsSWQgIT09IG51bGwpIHtcbiAgLy8gICAgIHJldHVybjtcbiAgLy8gICB9XG4gIFxuICAvLyAgIHRoaXMud29ya2Zsb3dJbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuICAvLyAgICAgYXdhaXQgdGhpcy5fcnVuV29ya2Zsb3dTdGF0dXNMb29wKCk7XG4gIC8vICAgfSwgMTAwMDApO1xuICAvLyB9XG4gIFxuICAvLyBhc3luYyBfcnVuV29ya2Zsb3dTdGF0dXNMb29wKCkge1xuICAvLyAgIGlmKCAhdGhpcy53b3JrZmxvd1N0YXR1c0xvYWRpbmcgJiYgIXRoaXMud29ya2Zsb3dSdW5uaW5nICkgcmV0dXJuO1xuICAgIFxuICAvLyAgIHRoaXMud29ya2Zsb3dSdW5uaW5nID0gdHJ1ZTtcbiAgLy8gICB0aGlzLndvcmtmbG93U3RhdHVzTG9hZGluZyA9IGZhbHNlO1xuICAgIFxuICAvLyAgIGxldCBzdGF0dXMgPSBhd2FpdCB0aGlzLldvcmtmbG93TW9kZWwuYmF0Y2hTdGF0dXMoJ2ltYWdlLXByb2R1Y3RzJywgdGhpcy53b3JrZmxvd0ltYWdlVXJscyk7XG4gIC8vICAgc3RhdHVzID0gKHN0YXR1cy5ib2R5IHx8IFtdKS5zb3J0KChhLGIpID0+IG5ldyBEYXRlKGIuY3JlYXRlZCkgLSBuZXcgRGF0ZShhLmNyZWF0ZWQpKTtcbiAgLy8gICB0aGlzLmZpcnN0U3RhdHVzTG9hZGVkID0gdHJ1ZTsgICAgXG5cblxuICAvLyAgIHRoaXMubGF0ZXN0V29ya2Zsb3dTdGF0dXMgPSB0aGlzLl9nZXRMYXRlc3RTdGF0dXNGcm9tQmF0Y2goc3RhdHVzKTsgXG4gIC8vICAgdGhpcy53b3JrZmxvd1J1bm5pbmcgPSB0aGlzLmxhdGVzdFdvcmtmbG93U3RhdHVzLmZpbmQocyA9PiBzLnN0YXRlICE9PSAnY29tcGxldGVkJykgPyB0cnVlIDogZmFsc2U7XG5cbiAgLy8gICBpZiggdGhpcy5zdG9wV29ya2Zsb3dMb29wIHx8ICF0aGlzLndvcmtmbG93UnVubmluZyApIHtcbiAgLy8gICAgIHRoaXMuX3N0b3BXb3JrZmxvd1N0YXR1c0xvb3AoKTtcblxuICAvLyAgICAgLy8gbWFrZSBzdXJlIGRlc2tldyBzZXR0aW5nIG1hdGNoZXMgaW4gbGFzdCB3b3JrZmxvdyBydW5cbiAgLy8gICAgIC8vIGxldCBkZXNrZXcgPSB0aGlzLmxhdGVzdFdvcmtmbG93U3RhdHVzWzBdLnBhcmFtcz8uaW1hZ2VtYWdpY2s/LmRlc2tldztcbiAgLy8gICAgIC8vIGxldCBhbGxNYXRjaCA9IHRydWU7XG4gIC8vICAgICAvLyB0aGlzLmxhdGVzdFdvcmtmbG93U3RhdHVzLmZvckVhY2goc3RhdHVzID0+IHtcbiAgLy8gICAgIC8vICAgaWYoIHN0YXR1cy5wYXJhbXM/LmltYWdlbWFnaWNrPy5kZXNrZXcgIT0gZGVza2V3ICkgYWxsTWF0Y2ggPSBmYWxzZTtcbiAgLy8gICAgIC8vIH0pO1xuXG4gIC8vICAgICAvLyBpZiggIWFsbE1hdGNoICkge1xuICAvLyAgICAgLy8gICB0aGlzLndvcmtmbG93RXJyb3IgPSB0cnVlO1xuICAvLyAgICAgLy8gICB0aGlzLmltYWdlc0N1cnJlbnRseURlc2tld2VkID0gZmFsc2U7XG4gIC8vICAgICAvLyAgIHRoaXMuZGVza2V3TWlzbWF0Y2ggPSB0cnVlO1xuICAvLyAgICAgLy8gICB0aGlzLmxhdGVzdFdvcmtmbG93VHlwZSA9ICdtaXNtYXRjaCc7XG4gIC8vICAgICAvLyB9IGVsc2Uge1xuICAvLyAgICAgdGhpcy53b3JrZmxvd0Vycm9yID0gZmFsc2U7XG4gIC8vICAgICAvLyB0aGlzLmltYWdlc0N1cnJlbnRseURlc2tld2VkID0gZGVza2V3O1xuICAvLyAgICAgLy8gaWYoIGRlc2tldyA9PT0gdW5kZWZpbmVkICkgZGVza2V3ID0gdHJ1ZTtcbiAgLy8gICAgIC8vIHRoaXMubGF0ZXN0V29ya2Zsb3dUeXBlID0gZGVza2V3ID8gJ2Rlc2tldycgOiAnb3JpZ2luYWwnO1xuICAvLyAgICAgLy8gfVxuXG4gIC8vICAgICB0aGlzLndvcmtmbG93U3RhdHVzID0gJyc7XG4gIC8vICAgICB0aGlzLndvcmtmbG93U3RhdHVzTG9hZGluZyA9IGZhbHNlO1xuICAvLyAgICAgdGhpcy53b3JrZmxvd1J1bm5pbmcgPSBmYWxzZTtcbiAgLy8gICB9IFxuICBcbiAgLy8gICB0aGlzLnVwZGF0ZVdvcmtmbG93U3RhdHVzTWVzc2FnZSh0aGlzLmxhdGVzdFdvcmtmbG93U3RhdHVzKTtcbiAgLy8gfVxuICBcbiAgLy8gX3N0b3BXb3JrZmxvd1N0YXR1c0xvb3AoKSB7XG4gIC8vICAgaWYoIHRoaXMud29ya2Zsb3dJbnRlcnZhbElkICE9PSBudWxsICkge1xuICAvLyAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLndvcmtmbG93SW50ZXJ2YWxJZCk7XG4gIC8vICAgICB0aGlzLndvcmtmbG93SW50ZXJ2YWxJZCA9IG51bGw7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgX2Fya0RvaUNsaWNrKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgfVxuXG4gIF91cGRhdGVTbGltU3R5bGVzKCkge1xuICAgIGxldCBzZWxlY3RzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCd1Y2QtdGhlbWUtc2xpbS1zZWxlY3QnKTtcbiAgICBpZiggIXNlbGVjdHMgKSByZXR1cm47XG5cbiAgICBmb3IoIGxldCBzZWxlY3Qgb2Ygc2VsZWN0cyApIHtcbiAgICAgIGxldCBzc01haW4gPSBzZWxlY3Quc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLnNzLW1haW5cIik7XG4gICAgICBpZiAoc3NNYWluKSB7XG4gICAgICAgIHNzTWFpbi5zdHlsZS5ib3JkZXIgPSAnbm9uZSc7XG4gICAgICAgIHNzTWFpbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3NTaW5nbGUgPSBzZWxlY3Quc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLnNzLXNpbmdsZS1zZWxlY3RlZFwiKTtcbiAgICAgIGlmIChzc1NpbmdsZSkge1xuICAgICAgICBzc1NpbmdsZS5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIjtcbiAgICAgICAgc3NTaW5nbGUuc3R5bGUuaGVpZ2h0ID0gXCIyLjVlbVwiO1xuICAgICAgICBzc1NpbmdsZS5zdHlsZS5wYWRkaW5nTGVmdCA9IFwiMXJlbVwiO1xuICAgICAgICBzc1NpbmdsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWNvbG9yLWFnZ2llLWJsdWUtNTApXCI7XG4gICAgICAgIHNzU2luZ2xlLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcwJztcbiAgICAgICAgc3NTaW5nbGUuc3R5bGUuZm9udFdlaWdodCA9IFwiYm9sZFwiO1xuICAgICAgICBzc1NpbmdsZS5zdHlsZS5jb2xvciA9IFwidmFyKC0tY29sb3ItYWdnaWUtYmx1ZSlcIjtcbiAgICAgIH1cblxuICAgICAgbGV0IHNlYXJjaCA9IHNlbGVjdC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5zcy1zZWFyY2gnKTtcbiAgICAgIGlmKCBzZWFyY2ggKSB7XG4gICAgICAgIHNlYXJjaC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICAvKipcbiAgICogQG1ldGhvZCBfc3NTZWxlY3RGb2N1c1xuICAgKiBAZGVzY3JpcHRpb24gc2xpbSBzZWxlY3QgZm9jdXMgY2hhbmdlLCBjb2xvciBzaG91bGQgYmUgZ29sZCBpZiBhY3RpdmUsIGJsdWUgaWYgbm90XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlXG4gICAqL1xuICBfc3NTZWxlY3RGb2N1cyhlKSB7XG4gICAgbGV0IHNzTWFpbiA9IGUuY3VycmVudFRhcmdldC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5zcy1tYWluJyk7XG4gICAgbGV0IHNzU2luZ2xlU2VsZWN0ZWQgPSBlLmN1cnJlbnRUYXJnZXQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcuc3Mtc2luZ2xlLXNlbGVjdGVkJyk7XG5cbiAgICBpZiggc3NTaW5nbGVTZWxlY3RlZD8uY2xhc3NMaXN0LnZhbHVlID09PSAnc3Mtc2luZ2xlLXNlbGVjdGVkIHNzLW9wZW4tYmVsb3cnICkge1xuICAgICAgc3NTaW5nbGVTZWxlY3RlZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI0ZGRjREMic7IC8vIGdvbGQtMzBcbiAgICAgIHNzTWFpbi5zdHlsZS5ib3JkZXJDb2xvciA9ICcjRkZCRjAwJzsgLy8gZ29sZFxuICAgIH0gZWxzZSB7XG4gICAgICBzc1NpbmdsZVNlbGVjdGVkLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjQjBEMEVEJzsgLy8gYmx1ZS01MFxuICAgICAgc3NNYWluLnN0eWxlLmJvcmRlckNvbG9yID0gJyNCMEQwRUQnOyAvLyBibHVlLTUwXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX3NzU2VsZWN0Qmx1clxuICAgKiBAZGVzY3JpcHRpb24gc2xpbSBzZWxlY3QgZm9jdXMgY2hhbmdlLCBjb2xvciBzaG91bGQgYmUgZ29sZCBpZiBhY3RpdmUsIGJsdWUgaWYgbm90XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlXG4gICAqL1xuICBfc3NTZWxlY3RCbHVyKGUpIHtcbiAgICBsZXQgc3NNYWluID0gZS5jdXJyZW50VGFyZ2V0LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLnNzLW1haW4nKTtcbiAgICBsZXQgc3NTaW5nbGVTZWxlY3RlZCA9IGUuY3VycmVudFRhcmdldC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5zcy1zaW5nbGUtc2VsZWN0ZWQnKTtcblxuICAgIHNzU2luZ2xlU2VsZWN0ZWQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNCMEQwRUQnOyAvLyBibHVlLTUwXG4gICAgc3NNYWluLnN0eWxlLmJvcmRlckNvbG9yID0gJyNCMEQwRUQnOyAvLyBibHVlLTUwXG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfdXBkYXRlTGlua3NcbiAgICogQGRlc2NyaXB0aW9uIHVwZGF0ZSBhcmsvZmVkb3JhIGxpbmtzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBsb2NhdGlvbiBsb2NhdGlvbiBlbGVtZW50XG4gICAqL1xuICBfdXBkYXRlTGlua3MobG9jYXRpb24pIHtcbiAgICBpZiggbG9jYXRpb24ucGFnZSAhPT0gJ2l0ZW0nICkgcmV0dXJuO1xuXG4gICAgbGV0IHNlbGVjdGVkUmVjb3JkID0gdGhpcy5BcHBTdGF0ZU1vZGVsLmdldFNlbGVjdGVkUmVjb3JkKCk7XG4gICAgaWYoICFzZWxlY3RlZFJlY29yZCApIHJldHVybjtcblxuICAgIGxldCBtZWRpYUdyb3VwID0gc2VsZWN0ZWRSZWNvcmQuY2xpZW50TWVkaWEubWVkaWFHcm91cHNbMF07XG4gICAgbGV0IHBhdGggPSBzZWxlY3RlZFJlY29yZC5jbGllbnRNZWRpYT8ucm9vdD8uWydAaWQnXSB8fCBsb2NhdGlvbi5wYXRobmFtZTtcbiAgICBsZXQgaW1hZ2VQYXRoID0gJyc7XG5cbiAgICAvLyBjaGVjayBpZiB3ZSBhcmUgb24gYSBzcGVjaWZpYyAvbWVkaWEgcGF0aFxuICAgIGxldCBpc01lZGlhVXJsID0gcGF0aC5pbmRleE9mKCcvbWVkaWEnKSA+IC0xO1xuICAgIGlmKCBpc01lZGlhVXJsICkge1xuICAgICAgLy8gZmluZCBtZWRpYSBpbiBncmFwaFxuICAgICAgbGV0IG1lZGlhID0gc2VsZWN0ZWRSZWNvcmQuY2xpZW50TWVkaWEuZ3JhcGhcbiAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICBtID0+IG1bJ0BzaG9ydFR5cGUnXS5pbmNsdWRlcygnSW1hZ2VPYmplY3QnKSAmJiBcbiAgICAgICAgICBwYXJzZUludChtLnBvc2l0aW9uKSA9PT0gc2VsZWN0ZWRSZWNvcmQuc2VsZWN0ZWRNZWRpYVBhZ2VcbiAgICAgICAgKVswXTtcbiAgICAgIGlmKCBtZWRpYT8uWydAaWQnXSApIHtcbiAgICAgICAgLy8gcGF0aCA9IG1lZGlhWydAaWQnXS5zcGxpdCgnL21lZGlhJylbMF07XG4gICAgICAgIGltYWdlUGF0aCA9IG1lZGlhWydAaWQnXTtcbiAgICAgIH1cbiAgICB9IFxuXG4gICAgaWYgKCFpbWFnZVBhdGggJiYgbWVkaWFHcm91cD8uWydAc2hvcnRUeXBlJ10/LmluY2x1ZGVzKCdJbWFnZUxpc3QnKSkge1xuICAgICAgaW1hZ2VQYXRoID0gbWVkaWFHcm91cC5lbmNvZGVzQ3JlYXRpdmVXb3JrPy5bJ0BpZCddIHx8IG1lZGlhR3JvdXAuY2xpZW50TWVkaWE/LmltYWdlcz8ub3JpZ2luYWw/LnVybCB8fCBwYXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbWFnZVBhdGggPSBzZWxlY3RlZFJlY29yZC5zZWxlY3RlZE1lZGlhPy5bJ0BpZCddO1xuICAgIH1cblxuICAgIHRoaXMuYXJrRG9pID0gW1xuICAgICAgcGF0aCxcbiAgICAgIGltYWdlUGF0aC5yZXBsYWNlKCcvZmNyZXBvL3Jlc3QnLCAnJylcbiAgICBdO1xuXG4gICAgaWYoICFpbWFnZVBhdGguZW5kc1dpdGgoJy9pbWFnZXMnKSApIGltYWdlUGF0aCArPSAnL2ZjcjptZXRhZGF0YSc7XG4gICAgdGhpcy5mZWRvcmFMaW5rcyA9IFtcbiAgICAgICcvZmNyZXBvL3Jlc3QnKyBwYXRoLnJlcGxhY2UoJy9mY3JlcG8vcmVzdCcsICcnKSxcbiAgICAgICcvZmNyZXBvL3Jlc3QnKyBpbWFnZVBhdGgucmVwbGFjZSgnL2ZjcmVwby9yZXN0JywgJycpXG4gICAgXTtcblxuICB9XG5cbiAgX29uU3ViamVjdENsaWNrKGUpIHtcbiAgICB0aGlzLkFwcFN0YXRlTW9kZWwuc2V0KHsgcmVzZXRTY3JvbGw6IHRydWUgfSlcbiAgfVxuXG4gIF9vbkNyZWF0b3JDbGljayhlKSB7XG4gICAgdGhpcy5BcHBTdGF0ZU1vZGVsLnNldCh7IHJlc2V0U2Nyb2xsOiB0cnVlIH0pXG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25FZGl0Q2xpY2tlZFxuICAgKiBAZGVzY3JpcHRpb24gYWRtaW4gdWksIGVkaXQgYnV0dG9uIGNsaWNrIGV2ZW50XG4gICAqIFxuICAgKiBAcGFyYW0ge09iamVjdH0gZSBcbiAgICovXG4gIGFzeW5jIF9vbkVkaXRDbGlja2VkKGUpIHtcbiAgICBpZiggIXRoaXMuaXNVaUFkbWluICkgcmV0dXJuO1xuICAgIHRoaXMuX3VwZGF0ZVNsaW1TdHlsZXMoKTtcbiAgICB0aGlzLmVkaXRNb2RlID0gdHJ1ZTtcbiAgICBcbiAgICB0aGlzLl9jaGFuZ2VNZWRpYVZpZXdlckRpc3BsYXkoJ25vbmUnKTtcblxuICAgIC8vIHNlZSBpc3N1ZSAjMzU5LCB0aGlzIHdhcyBhIHN0b3AgZ2FwIHRoYXQgd2UgZml4ZWQgaW4gdGhlIGltYWdlIHByb2Nlc3Npbmcgd29ya2Zsb3dcbiAgICAvLyB3aWxsIGxpa2VseSBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUsIGZvciBub3cganVzdCBkaXNhYmxpbmcgdGhlIHVpIGNvbnRyb2xzXG4gICAgLy8gdGhpcy5fc3RhcnRXb3JrZmxvd1N0YXR1c0xvb3AoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblNhdmVDbGlja2VkXG4gICAqIEBkZXNjcmlwdGlvbiBhZG1pbiB1aSwgc2F2ZSBidXR0b24gY2xpY2sgZXZlbnRcbiAgICogXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIFxuICAgKi9cbiAgYXN5bmMgX29uU2F2ZUNsaWNrZWQoZSkge1xuICAgIGlmKCAhdGhpcy5pc1VpQWRtaW4gKSByZXR1cm47XG4gICAgXG4gICAgdGhpcy5pdGVtRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VjZC10aGVtZS1zbGltLXNlbGVjdC5pdGVtLWRpc3BsYXktc2VsZWN0Jyk/LnNsaW1TZWxlY3Q/LnNlbGVjdGVkKCk7XG4gICAgdGhpcy5fdXBkYXRlRGlzcGxheURhdGEoKTtcbiAgICBhd2FpdCB0aGlzLkZjQXBwQ29uZmlnTW9kZWwuc2F2ZUl0ZW1EaXNwbGF5RGF0YSh0aGlzLnJlbmRlcmVkUmVjb3JkSWQsIHRoaXMuZGlzcGxheURhdGEpO1xuXG4gICAgdGhpcy5lZGl0TW9kZSA9IGZhbHNlO1xuICAgIC8vIHRoaXMuc3RvcFdvcmtmbG93TG9vcCA9IHRydWU7XG5cbiAgICB0aGlzLl9jaGFuZ2VNZWRpYVZpZXdlckRpc3BsYXkoJycsIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uQ2FuY2VsRWRpdENsaWNrZWRcbiAgICogQGRlc2NyaXB0aW9uIGFkbWluIHVpLCBjYW5jZWwgZWRpdGluZyBidXR0b24gY2xpY2sgZXZlbnRcbiAgICogXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIFxuICAgKi9cbiAgX29uQ2FuY2VsRWRpdENsaWNrZWQoZSkge1xuICAgIGlmKCAhdGhpcy5pc1VpQWRtaW4gKSByZXR1cm47XG4gICAgdGhpcy5lZGl0TW9kZSA9IGZhbHNlO1xuICAgIC8vIHRoaXMuc3RvcFdvcmtmbG93TG9vcCA9IHRydWU7XG5cbiAgICB0aGlzLl9jaGFuZ2VNZWRpYVZpZXdlckRpc3BsYXkoJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBfcGFyc2VEaXNwbGF5RGF0YSwgZ2V0IGFwcGxpY2F0aW9uIGNvbnRhaW5lciBkYXRhIHRvIHNldCBjb2xsZWN0aW9uIHNwZWNpZmljIGRpc3BsYXkgZGF0YSAod2F0ZXJjb2xvcnMsIGhpZ2hsaWdodGVkIGl0ZW1zLCBmZWF0dXJlZCBpbWFnZSlcbiAgICovXG4gIGFzeW5jIF9wYXJzZURpc3BsYXlEYXRhKCkge1xuICAgIGlmKCAhdGhpcy5jb2xsZWN0aW9uSWQgKSByZXR1cm47XG5cbiAgICBsZXQgZWRpdHMgPSBhd2FpdCB0aGlzLkNvbGxlY3Rpb25Nb2RlbC5nZXRDb2xsZWN0aW9uRWRpdHModGhpcy5jb2xsZWN0aW9uSWQpO1xuICAgIGlmKCAhT2JqZWN0LmtleXMoZWRpdHMucGF5bG9hZCkubGVuZ3RoICkge1xuICAgICAgdGhpcy5hcHBEYXRhTG9hZGVkID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlZGl0cyA9IGVkaXRzLnBheWxvYWQ7XG4gICAgdGhpcy5pdGVtRGVmYXVsdERpc3BsYXkgPSBlZGl0cz8uY29sbGVjdGlvbj8uaXRlbURlZmF1bHREaXNwbGF5IHx8IHV0aWxzLml0ZW1EaXNwbGF5VHlwZS5iclR3b1BhZ2U7XG4gICAgdGhpcy5pdGVtRGlzcGxheSA9IGVkaXRzPy5pdGVtcz8uW3RoaXMuY3VycmVudFJlY29yZElkXT8uaXRlbURlZmF1bHREaXNwbGF5IHx8IHRoaXMuaXRlbURlZmF1bHREaXNwbGF5O1xuXG4gICAgdGhpcy5hcHBEYXRhTG9hZGVkID0gdHJ1ZTtcbiAgICB0aGlzLl91cGRhdGVEaXNwbGF5RGF0YSgpO1xuICB9XG5cbiAgX3VwZGF0ZURpc3BsYXlEYXRhKCkge1xuICAgIHRoaXMuZGlzcGxheURhdGEgPSB0aGlzLkZjQXBwQ29uZmlnTW9kZWwuZ2V0SXRlbURpc3BsYXlEYXRhKHRoaXMucmVuZGVyZWRSZWNvcmRJZCwgdGhpcy5pdGVtRGlzcGxheSk7XG4gIH1cblxuICBhc3luYyBfY2hhbmdlTWVkaWFWaWV3ZXJEaXNwbGF5KGRpc3BsYXksIHByZWZDaGFuZ2U9ZmFsc2UpIHtcbiAgICBsZXQgbWVkaWFWaWV3ZXIgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2FwcC1tZWRpYS12aWV3ZXInKTtcbiAgICBpZiggIW1lZGlhVmlld2VyICkgcmV0dXJuO1xuICAgIGxldCBwYWdlcyA9IG1lZGlhVmlld2VyLnF1ZXJ5U2VsZWN0b3IoJ3VjZGxpYi1wYWdlcycpO1xuICAgIGxldCBuYXYgPSBtZWRpYVZpZXdlci5xdWVyeVNlbGVjdG9yKCdhcHAtbWVkaWEtdmlld2VyLW5hdicpO1xuXG4gICAgaWYoIG5hdiApIG5hdi5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcblxuICAgIGlmKCAhcGFnZXMgKSByZXR1cm47XG4gICAgaWYoIGRpc3BsYXkgKSB7XG4gICAgICBwYWdlcy5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgIHBhZ2VzLnN0eWxlLmhlaWdodCA9ICczMHJlbSc7XG4gICAgICBwYWdlcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9IGVsc2Uge1xuICAgICAgcGFnZXMuc3R5bGUub3BhY2l0eSA9IDEwMDtcbiAgICAgIHBhZ2VzLnN0eWxlLmhlaWdodCA9ICcnO1xuICAgICAgcGFnZXMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgaWYoIG1lZGlhVmlld2VyLm1lZGlhVHlwZSA9PT0gJ3ZpZGVvJyApIHJldHVybjtcblxuICAgIC8vIG9uIHNhdmUgZGlzcGxheSBwcmVmLCByZWxvYWQgbWVkaWEgdmlld2VyIHdpdGggbmV3IGltYWdlIGRpc3BsYXkgdHlwZVxuICAgIGlmKCBwcmVmQ2hhbmdlICkge1xuICAgICAgLy8gcmVsb2FkIG1lZGlhIHZpZXdlciB3aXRoIG5ldyBpbWFnZSBkaXNwbGF5IHR5cGVcbiAgICAgIGxldCBuZXdEaXNwbGF5VHlwZSA9ICcnO1xuICAgICAgbGV0IHNpbmdsZVBhZ2UgPSBmYWxzZTtcblxuICAgICAgaWYoIHRoaXMuaXRlbURpc3BsYXkuaW5jbHVkZXMoJ0ltYWdlIExpc3QnKSApIHtcbiAgICAgICAgbmV3RGlzcGxheVR5cGUgPSAnaW1hZ2UnO1xuICAgICAgfSBlbHNlIGlmICggdGhpcy5pdGVtRGlzcGxheS5pbmNsdWRlcygnMSBQYWdlJykgKSB7XG4gICAgICAgIG5ld0Rpc3BsYXlUeXBlID0gJ2Jvb2tyZWFkZXInO1xuICAgICAgICBzaW5nbGVQYWdlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoIHRoaXMuaXRlbURpc3BsYXkuaW5jbHVkZXMoJzIgUGFnZScpICkge1xuICAgICAgICBuZXdEaXNwbGF5VHlwZSA9ICdib29rcmVhZGVyJztcbiAgICAgIH1cblxuICAgICAgaWYoIHBhZ2VzICYmIG5hdiAmJiBuZXdEaXNwbGF5VHlwZSApIHtcbiAgICAgICAgcGFnZXMuc2VsZWN0ZWQgPSBuZXdEaXNwbGF5VHlwZTtcblxuICAgICAgICBpZiggbWVkaWFWaWV3ZXIuc2luZ2xlUGFnZSAhPT0gc2luZ2xlUGFnZSApIHtcbiAgICAgICAgICBtZWRpYVZpZXdlci5zaW5nbGVQYWdlID0gc2luZ2xlUGFnZTtcbiAgICAgICAgICAvLyBpZiggbWVkaWFWaWV3ZXIucXVlcnlTZWxlY3RvcignYXBwLWJvb2tyZWFkZXItdmlld2VyJykuYnIgKSB7XG4gICAgICAgICAgLy8gICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIC8vICAgICBtZWRpYVZpZXdlci5fb25Ub2dnbGVCb29rVmlldygpO1xuICAgICAgICAgIC8vICAgfSk7XG4gICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAvLyAgIC8vIHRvIHJlbG9hZCBiciBpZiBub3QgaW5pdGlhdGVkXG4gICAgICAgICAgLy8gICBtZWRpYVZpZXdlci5fb25BcHBTdGF0ZVVwZGF0ZShhd2FpdCB0aGlzLkFwcFN0YXRlTW9kZWwuZ2V0KCkpO1xuICAgICAgICAgIC8vIH0gICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBtZWRpYVZpZXdlci5pc0Jvb2tSZWFkZXIgPSBuZXdEaXNwbGF5VHlwZSA9PT0gJ2Jvb2tyZWFkZXInO1xuICAgICAgICBtZWRpYVZpZXdlci5tZWRpYVR5cGUgPSBuZXdEaXNwbGF5VHlwZTtcbiAgICAgIH1cbiAgICB9ICAgIFxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX2dldEhvc3RcbiAgICogQGRlc2NyaXB0aW9uIGhlbHBlciBmb3IgZ2V0dGluZyBwcm90b2NvbC9ob3N0IG9mIHdpbmRvd1xuICAgKlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgKi9cbiAgX2dldEhvc3QoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvXCI7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25TZWxlY3RlZFJlY29yZE1lZGlhVXBkYXRlXG4gICAqIEBkZXNjcmlwdGlvbiBmcm9tIEFwcFN0YXRlTW9kZWwsIGNhbGxlZCB3aGVuIGEgcmVjb3JkcyBtZWRpYSBpcyBzZWxlY3RlZFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVjb3JkXG4gICAqL1xuICBfb25TZWxlY3RlZFJlY29yZE1lZGlhVXBkYXRlKHJlY29yZCkge1xuICAgIC8vIGlmKCByZWNvcmQuX2hhczM2MEltYWdlTGlzdCApIHtcbiAgICAvLyAgIHRoaXMuJC5kb3dubG9hZC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIC8vICAgcmV0dXJuO1xuICAgIC8vIH1cblxuICAgIHRoaXMubmFtZSA9IHRoaXMucmVjb3JkLm5hbWUgfHwgXCJcIjtcblxuICAgIC8vIGlmICghcmVjb3JkLmltYWdlKSByZXR1cm47XG5cbiAgICAvLyB0aGlzLiQuZG93bmxvYWQucmVuZGVyKHtcbiAgICAvLyAgIHJlc29sdXRpb24gOiBbcmVjb3JkLmltYWdlLndpZHRoLCByZWNvcmQuaW1hZ2UuaGVpZ2h0XSxcbiAgICAvLyAgIGZpbGVGb3JtYXQgOiByZWNvcmQuaW1hZ2UuZW5jb2RpbmdGb3JtYXQsXG4gICAgLy8gICBzaXplIDogcmVjb3JkLmltYWdlLmNvbnRlbnRTaXplID8gcGFyc2VJbnQocmVjb3JkLmltYWdlLmNvbnRlbnRTaXplKSA6IDAsXG4gICAgLy8gICB1cmwgOiByZWNvcmQuaW1hZ2UudXJsXG4gICAgLy8gfSk7XG5cbiAgICAvLyB0aGlzLl9yZW5kZXJJZGVudGlmaWVyKHRoaXMucmVjb3JkLCByZWNvcmQpO1xuICAgIC8vIHRoaXMuX3JlbmRlckZjTGluayh0aGlzLnJlY29yZCwgcmVjb3JkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9hZGRNZXRhZGF0YVJvd1xuICAgKiBAZGVzY3JpcHRpb24gdXBkYXRlIG1ldGFkYXRhIHRhYmxlIHJvd1xuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBtZXRhZGF0YVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYXR0clxuICAgKiBAcGFyYW0ge1N0cmluZ30gbGFiZWxcbiAgICovXG4gIF9hZGRNZXRhZGF0YVJvdyhtZXRhZGF0YSwgYXR0ciwgbGFiZWwpIHtcbiAgICBpZiAoIXRoaXNbYXR0cl0pIHJldHVybjtcbiAgICBtZXRhZGF0YS5wdXNoKHtcbiAgICAgIGF0dHI6IGxhYmVsIHx8IGF0dHIsXG4gICAgICB2YWx1ZTogdGhpc1thdHRyXSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9jb3B5TGlua1xuICAgKiBAZGVzY3JpcHRpb24gYm91bmQgdG8gY2xpY2sgZXZlbnQgb24gYnV0dG9uLiAgQ29weSB0ZXh0IHRvIGNsaXBib2FyZFxuICAgKiBzaG93IFVJIGludGVyYWN0aW9uLlxuICAgKi9cbiAgX2NvcHlMaW5rKCkge1xuICAgIHRoaXMuJC5saW5rLmZvY3VzKCk7XG4gICAgdGhpcy4kLmxpbmsuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgOTk5OSk7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJDb3B5XCIpO1xuXG4gICAgdGhpcy4kLmNvcHlJY29uLmljb24gPSBcImNoZWNrXCI7XG4gICAgdGhpcy4kLmNvcHlCdXR0b24uc2V0QXR0cmlidXRlKFwiYWN0aXZlXCIsIFwiYWN0aXZlXCIpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLiQuY29weUljb24uaWNvbiA9IFwiY29udGVudC1jb3B5XCI7XG4gICAgICB0aGlzLiQuY29weUJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJhY3RpdmVcIiwgXCJhY3RpdmVcIik7XG4gICAgfSwgMzAwMCk7XG4gIH1cblxuICAvLyBfb25Cb29rVmlld1BhZ2VDaGFuZ2UoZSkge1xuICAvLyAgIGxldCBhcHBNZWRpYURvd25sb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXBwLW1lZGlhLWRvd25sb2FkJyk7XG4gIC8vICAgaWYoIGFwcE1lZGlhRG93bmxvYWQgKSB7XG4gIC8vICAgICBhcHBNZWRpYURvd25sb2FkLmJyUGFnZUNoYW5nZShlLmRldGFpbCk7XG4gIC8vICAgfVxuICAvLyB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC1yZWNvcmRcIiwgQXBwUmVjb3JkKTtcbiIsImltcG9ydCB7IGh0bWwgfSBmcm9tIFwibGl0XCI7XG5cbmltcG9ydCBsaW5rc0NzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy8xX2Jhc2VfaHRtbC9fbGlua3MuY3NzXCI7XG5pbXBvcnQgYnV0dG9uc0NzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy8yX2Jhc2VfY2xhc3MvX2J1dHRvbnMuY3NzXCI7XG5pbXBvcnQgaGVhZGluZ3NDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvMl9iYXNlX2NsYXNzL19oZWFkaW5ncy5jc3NcIjtcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uLy4uLy4uL2xpYi91dGlscy9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgcmV0dXJuIGh0bWxgXG4gICAgPHN0eWxlIGluY2x1ZGU9XCJzaGFyZWQtc3R5bGVzXCI+XG4gICAgICAke2xpbmtzQ3NzfSAke2J1dHRvbnNDc3N9ICR7aGVhZGluZ3NDc3N9IDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1cGVyLWxpZ2h0LWJhY2tncm91bmQtY29sb3IpO1xuICAgICAgfVxuXG4gICAgICBbaGlkZGVuXSB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgIH1cblxuICAgICAgLmNvbnRhaW5lciB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBhbGlnbi1pdGVtczogbm9ybWFsO1xuXG4gICAgICAgIHdpZHRoOiA2MCU7XG4gICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgIH1cblxuICAgICAgLmNvbnRhaW5lciBoMSB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgY29sb3I6IHZhcigtLWNvbG9yLWJsYWNrLTYwKTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICAgICAgICBmb250LXNpemU6IDEuNzQyNXJlbTtcbiAgICAgIH1cblxuICAgICAgLmNvcHlyaWdodCB7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApO1xuICAgICAgfVxuXG4gICAgICAuY29weXJpZ2h0IHNwYW4ge1xuICAgICAgICBmb250LXNpemU6IDEuMjVyZW07XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgfVxuXG4gICAgICAuY29weXJpZ2h0LXRleHQge1xuICAgICAgICBmb250LXNpemU6IDAuODc1cmVtO1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lO1xuICAgICAgfVxuXG4gICAgICAubGFiZWwge1xuICAgICAgICBmb250LXdlaWdodDogdmFyKC0tZnctYm9sZCk7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1kZWZhdWx0LXByaW1hcnktY29sb3IpO1xuICAgICAgfVxuXG4gICAgICAuc2VjdGlvbiB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XG4gICAgICB9XG4gICAgICAuc2VjdGlvbi5ib3JkZXJlZCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggZGFzaGVkIHZhcigtLW1lZGl1bS1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgICAgIH1cblxuICAgICAgLm1ldGFkYXRhLXJvdyxcbiAgICAgIC5kb3dubG9hZC1zZWN0aW9uIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgbWFyZ2luOiAwLjg1cmVtIDA7XG4gICAgICB9XG4gICAgICAubWV0YWRhdGEtcm93IC5hdHRyLFxuICAgICAgLmRvd25sb2FkLXNlY3Rpb24gLmxhYmVsIHtcbiAgICAgICAgZmxleDogMC4yNTtcbiAgICAgICAgY29sb3I6IHZhcigtLWRlZmF1bHQtcHJpbWFyeS1jb2xvcik7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiB2YXIoLS1mdy1ib2xkKTtcbiAgICAgIH1cbiAgICAgIC5tZXRhZGF0YS1yb3cgLnZhbHVlLFxuICAgICAgLmRvd25sb2FkLXNlY3Rpb24gLmRvd25sb2FkLW9wdGlvbnMge1xuICAgICAgICBmbGV4OiAwLjc1O1xuICAgICAgICB3b3JkLWJyZWFrOiBicmVhay13b3JkO1xuICAgICAgfVxuXG4gICAgICAucGFydC1vZiB7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvaW1hZ2VzL3dhdGVyY29sb3JzL2JsdWUtLTEud2VicCk7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIG1pbi1oZWlnaHQ6IDEycmVtO1xuICAgICAgICBtYXJnaW46IDNyZW0gMDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS0zMCk7XG4gICAgICB9XG5cbiAgICAgIC8qIC5wYXJ0LW9mIGltZyB7XG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgICAgbWF4LWhlaWdodDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICB3aWR0aDogYXV0bztcbiAgICAgIH0gKi9cblxuICAgICAgLnBhcnQtb2YtaW1nLWNvbnRhaW5lciB7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBhc3BlY3QtcmF0aW86IDQgLyAzO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIH1cblxuICAgICAgLnBhcnQtb2YgaW1nIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAvKiB0b3A6IGNhbGMoLTY1JSk7ICovXG4gICAgICB9XG5cbiAgICAgIC5wYXJ0LW9mIGRpdiB7XG4gICAgICAgIG1hcmdpbjogMnJlbTtcbiAgICAgICAgZmxleDogMTtcbiAgICAgIH1cblxuICAgICAgLnBhcnQtb2YgZGl2Om50aC1jaGlsZCgxKSB7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIH1cblxuICAgICAgLnBhcnQtb2YgLmNvbGxlY3Rpb24taW5mbyB7XG4gICAgICAgIGZsZXg6IDI7XG4gICAgICAgIG1hcmdpbjogYXV0byAwO1xuICAgICAgfVxuXG4gICAgICAucGFydC1vZiAuY29sbGVjdGlvbi1pbmZvIGg0IHtcbiAgICAgICAgbWFyZ2luOiAwLjNyZW0gMCAwO1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgfVxuXG4gICAgICAucGFydC1vZiAuY29sbGVjdGlvbi1pbmZvIGg0IGEge1xuICAgICAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgIH1cbiAgICAgIC5wYXJ0LW9mIC5jb2xsZWN0aW9uLWluZm8gaDQgYTpob3ZlciB7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgICAgfVxuXG4gICAgICAucGFydC1vZiAuY29sbGVjdGlvbi1pbmZvIHAge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICB9XG5cbiAgICAgIC5wYXJ0LW9mIC5jb2xsZWN0aW9uLWluZm8gc3BhbiB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApO1xuICAgICAgfVxuXG4gICAgICAjaWRlbnRpZmllclZhbHVlIGEsXG4gICAgICAjZmVkb3JhVmFsdWUgYSB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuXG4gICAgICAjaWRlbnRpZmllclZhbHVlIGE6bnRoLWNoaWxkKDEpLFxuICAgICAgI2ZlZG9yYVZhbHVlIGE6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDFyZW07XG4gICAgICB9XG5cbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NTZweCkge1xuICAgICAgICAuY29udGFpbmVyIHtcbiAgICAgICAgICB3aWR0aDogODUlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xuICAgICAgICAuY29udGFpbmVyIHtcbiAgICAgICAgICB3aWR0aDogOTUlO1xuICAgICAgICB9XG5cbiAgICAgICAgLm1ldGFkYXRhLXJvdyxcbiAgICAgICAgLmRvd25sb2FkLXNlY3Rpb24ge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG5cbiAgICAgICAgLnBhcnQtb2YgLmNvbGxlY3Rpb24taW5mbyB7XG4gICAgICAgICAgbWFyZ2luOiAxcmVtIDFyZW0gMXJlbSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLnBhcnQtb2Yge1xuICAgICAgICAgIG1pbi1oZWlnaHQ6IDA7XG4gICAgICAgIH1cblxuICAgICAgICAucGFydC1vZiBkaXYge1xuICAgICAgICAgIG1hcmdpbjogMnJlbSAxLjVyZW0gMnJlbSAxcmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgLnBhcnQtb2YgLmNvbGxlY3Rpb24taW5mbyBoNCB7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgICAgICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIH1cblxuICAgICAgICAucGFydC1vZiAuY29sbGVjdGlvbi1pbmZvID4gKiB7XG4gICAgICAgICAgcGFkZGluZzogLjI1cmVtIDA7XG4gICAgICAgIH1cblxuICAgICAgICAuY29sbGVjdGlvbi1pbmZvIHtcbiAgICAgICAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgYXBwLXJlY29yZCAuYWRtaW4tZWRpdCAubGVmdC1wYW5lbCB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBsZWZ0OiAyMCU7XG4gICAgICB3aWR0aDogNjAlO1xuICAgICAgdG9wOiBjYWxjKDE3MHB4ICsgM3JlbSk7XG4gICAgICB6LWluZGV4OiA1MDA7XG4gICAgICBib3JkZXItYm90dG9tOiA2cHggZG90dGVkIHZhcigtLWNvbG9yLWFnZ2llLWdvbGQpO1xuICAgICAgcGFkZGluZy1ib3R0b206IDEuNXJlbTtcbiAgICB9XG5cbiAgICBhcHAtcmVjb3JkIC5hZG1pbi1lZGl0IC5yaWdodC1wYW5lbCB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICByaWdodDogM3JlbTtcbiAgICAgIHRvcDogY2FsYygxNzBweCArIDNyZW0pO1xuICAgICAgei1pbmRleDogNTAwO1xuICAgIH1cblxuICAgIGFwcC1yZWNvcmQgLmFkbWluLWVkaXQgLmljb24td3JhcHBlciB7XG4gICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICB3aWR0aDogNTBweDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtNzApO1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgbWFyZ2luLWxlZnQ6IC4zcmVtO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIH1cblxuICAgIGFwcC1yZWNvcmQgLmFkbWluLWVkaXQgdWNkbGliLWljb24ge1xuICAgICAgZmlsbDogd2hpdGU7XG4gICAgICB3aWR0aDogNTAlO1xuICAgICAgaGVpZ2h0OiA1MCU7XG4gICAgICBtYXJnaW46IGF1dG87XG4gICAgICBwYWRkaW5nLXRvcDogMC42cmVtOyAgICAgIFxuICAgIH1cblxuICAgIGFwcC1yZWNvcmQgLmFkbWluLWVkaXQgLmljb24td3JhcHBlci5lZGl0IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUpO1xuICAgIH1cblxuICAgIGFwcC1yZWNvcmQgLmFkbWluLWVkaXQgLmljb24td3JhcHBlcjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlKTtcbiAgICB9XG5cbiAgICBhcHAtcmVjb3JkIC5hZG1pbi1lZGl0IC5pY29uLXdyYXBwZXIuZWRpdDpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1nb2xkKTtcbiAgICB9XG5cbiAgICBhcHAtcmVjb3JkIC5hZG1pbi1lZGl0IC5pY29uLXdyYXBwZXIuZWRpdDpob3ZlciB1Y2RsaWItaWNvbiB7XG4gICAgICBmaWxsOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlKTtcbiAgICB9XG5cbiAgICAuZWRpdC1vdmVybGF5IHtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgdG9wOiAwO1xuICAgICAgcmlnaHQ6IDA7XG4gICAgICBib3R0b206IDA7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgb3BhY2l0eTogLjU1O1xuICAgICAgei1pbmRleDogNDAwO1xuICAgIH1cblxuICAgIGEuY3JlYXRlLWlzc3VlIHtcbiAgICAgIGhlaWdodDogMS40cmVtO1xuICAgICAgbWluLWhlaWdodDogMS40cmVtO1xuICAgIH1cblxuICAgIHVjZGxpYi1tZCBwIHtcbiAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgfVxuXG4gICAgLmFkbWluLWVkaXQgaDMge1xuICAgICAgY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUpO1xuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgICB9XG5cbiAgICAuYWRtaW4tZWRpdCAuZHJvcGRvd24tbGFiZWwge1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICBtYXJnaW4tYm90dG9tOiAuNXJlbTtcbiAgICB9XG5cbiAgICAuYWRtaW4tZWRpdCAuZHJvcGRvd24tbGFiZWwuaW1hZ2Utc2tldyB7XG4gICAgICBtYXJnaW4tdG9wOiAxLjVyZW07XG4gICAgfVxuXG4gICAgLmFkbWluLWVkaXQgLmRlc2tldy1zdGF0dXMge1xuICAgICAgbWFyZ2luLXRvcDogMC42cmVtO1xuICAgIH1cblxuICAgIC5hZG1pbi1lZGl0IC5kZXNrZXctc3RhdHVzIHVjZGxpYi1pY29uIHsgXG4gICAgICBwYWRkaW5nOiAwO1xuICAgICAgd2lkdGg6IDI0cHg7XG4gICAgICBoZWlnaHQ6IDI0cHg7XG4gICAgICBtaW4td2lkdGg6IDI0cHg7XG4gICAgICBtaW4taGVpZ2h0OiAyNHB4O1xuICAgIH1cblxuICAgIC5hZG1pbi1lZGl0IC5kZXNrZXctc3RhdHVzIC5kZXNrZXctcnVubmluZyB7XG4gICAgICBmaWxsOiB2YXIoLS1jb2xvci1hZ2dpZS1nb2xkKTtcbiAgICB9XG5cbiAgICAuYWRtaW4tZWRpdCAuZGVza2V3LXN0YXR1cyAuZGVza2V3LWZpbmlzaGVkIHtcbiAgICAgIGZpbGw6IHZhcigtLWNvbG9yLXF1YWQpO1xuICAgIH1cblxuICAgIC5hZG1pbi1lZGl0IC5kZXNrZXctc3RhdHVzIC5kZXNrZXctZXJyb3Ige1xuICAgICAgZmlsbDogdmFyKC0tY29sb3ItZG91YmxlLWRlY2tlcik7XG4gICAgfVxuXG4gICAgLmFkbWluLWVkaXQgLmRlc2tldy13cmFwcGVyLFxuICAgIC5hZG1pbi1lZGl0IC5kZXNrZXctYWN0aW9uLXdyYXBwZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogMXJlbTtcbiAgICB9XG5cbiAgICAuYWRtaW4tZWRpdCAuZGVza2V3LXdyYXBwZXIgdWNkLXRoZW1lLXNsaW0tc2VsZWN0IHtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBtaW4taGVpZ2h0OiAyLjVlbTtcbiAgICB9XG5cbiAgICAuYWRtaW4tZWRpdCAuZGVza2V3LWFjdGlvbi13cmFwcGVyIHtcbiAgICAgIGZsZXg6IDA7XG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIH1cblxuICAgIC5hZG1pbi1lZGl0IC5pbWFnZS1za2V3LWRlc2NyaXB0aW9uLFxuICAgIC5hZG1pbi1lZGl0IC5pbWFnZS1za2V3LXN0YXR1cyxcbiAgICAuYWRtaW4tZWRpdCAuaW1hZ2Utc2tldy1lcnJvciB7XG4gICAgICBjb2xvcjogdmFyKC0tY29sb3ItYmxhY2stNzApO1xuICAgICAgZm9udC1zaXplOiAuOXJlbTtcbiAgICAgIG1hcmdpbjogLjI1cmVtIDAgLjVyZW0gMDtcbiAgICB9XG5cbiAgICAuYWRtaW4tZWRpdCAuaW1hZ2Utc2tldy1zdGF0dXMge1xuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgbWFyZ2luLXRvcDogLjVyZW07XG4gICAgfVxuXG4gICAgLmFkbWluLWVkaXQgLmltYWdlLXNrZXctZXJyb3Ige1xuICAgICAgY29sb3I6IHZhcigtLWNvbG9yLWRvdWJsZS1kZWNrZXIpO1xuICAgIH1cblxuICAgIC5hZG1pbi1lZGl0IC5hcHBseS1idXR0b24ge1xuICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgIH1cblxuICAgIFtpY29uPVwidWNkbGliLWRhbXM6ZmEtcm90YXRlXCJdIHtcbiAgICAgIGFuaW1hdGlvbjogc3BpbiAycyBsaW5lYXIgaW5maW5pdGU7XG4gICAgfVxuXG4gICAgQGtleWZyYW1lcyBzcGluIHtcbiAgICAgIDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgICB9XG4gICAgICAxMDAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICAgIGFwcC1yZWNvcmQgLmFkbWluLWVkaXQgLmxlZnQtcGFuZWwge1xuICAgICAgICBsZWZ0OiA1JTtcbiAgICAgICAgd2lkdGg6IDkwJTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgKG1heC13aWR0aDogNTAwcHgpIHtcbiAgICAgIC5hZG1pbi1lZGl0IC5kZXNrZXctd3JhcHBlciB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuXG4gICAgICAuYWRtaW4tZWRpdCAuZGVza2V3LWFjdGlvbi13cmFwcGVyIHtcbiAgICAgICAgcGFkZGluZy10b3A6IDFyZW07XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgPC9zdHlsZT5cblxuICAgIDxkaXYgY2xhc3M9XCJlZGl0LW92ZXJsYXlcIiA/aGlkZGVuPVwiJHshdGhpcy5lZGl0TW9kZSB8fCAhdGhpcy5pc1VpQWRtaW59XCI+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImFkbWluLWVkaXRcIiA/aGlkZGVuPVwiJHshdGhpcy5pc1VpQWRtaW59XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibGVmdC1wYW5lbFwiID9oaWRkZW49XCIkeyF0aGlzLmVkaXRNb2RlIHx8ICF0aGlzLmlzVWlBZG1pbn1cIj5cbiAgICAgICAgPGgzIGNsYXNzPVwiZm9ybS1sYWJlbFwiPkl0ZW0gRGlzcGxheTwvaDM+XG4gICAgICAgIDxwIGNsYXNzPVwiZm9ybS1sYWJlbCBkcm9wZG93bi1sYWJlbFwiPlZpZXdlcjwvcD5cbiAgICAgICAgPHVjZC10aGVtZS1zbGltLXNlbGVjdFxuICAgICAgICAgIGNsYXNzPVwiaXRlbS1kaXNwbGF5LXNlbGVjdFwiXG4gICAgICAgICAgQGNoYW5nZT1cIiR7dGhpcy5fc3NTZWxlY3RCbHVyfVwiXG4gICAgICAgICAgQGZvY3VzaW49XCIke3RoaXMuX3NzU2VsZWN0Rm9jdXN9XCJcbiAgICAgICAgICBAY2xpY2s9XCIke3RoaXMuX3NzU2VsZWN0Rm9jdXN9XCJcbiAgICAgICAgICBAYmx1cj1cIiR7dGhpcy5fc3NTZWxlY3RCbHVyfVwiPlxuICAgICAgICAgIDxzZWxlY3Q+XG4gICAgICAgICAgICAgIDxvcHRpb24gLnZhbHVlPSR7dGhpcy5pdGVtRGVmYXVsdERpc3BsYXl9ID9zZWxlY3RlZD0ke3RoaXMuaXRlbURpc3BsYXkgPT09IHRoaXMuaXRlbURlZmF1bHREaXNwbGF5fT5cbiAgICAgICAgICAgICAgICBDb2xsZWN0aW9uIERlZmF1bHQgKCR7dGhpcy5pdGVtRGVmYXVsdERpc3BsYXl9KVxuICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiAudmFsdWU9JHt1dGlscy5pdGVtRGlzcGxheVR5cGUuYnJUd29QYWdlfSA/c2VsZWN0ZWQ9JHt0aGlzLml0ZW1EaXNwbGF5ICE9PSB0aGlzLml0ZW1EZWZhdWx0RGlzcGxheSAmJiB0aGlzLml0ZW1EaXNwbGF5ID09PSB1dGlscy5pdGVtRGlzcGxheVR5cGUuYnJUd29QYWdlfT5cbiAgICAgICAgICAgICAgICAke3V0aWxzLml0ZW1EaXNwbGF5VHlwZS5iclR3b1BhZ2V9XG4gICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIC52YWx1ZT0ke3V0aWxzLml0ZW1EaXNwbGF5VHlwZS5ick9uZVBhZ2V9ID9zZWxlY3RlZD0ke3RoaXMuaXRlbURpc3BsYXkgIT09IHRoaXMuaXRlbURlZmF1bHREaXNwbGF5ICYmIHRoaXMuaXRlbURpc3BsYXkgPT09IHV0aWxzLml0ZW1EaXNwbGF5VHlwZS5ick9uZVBhZ2V9PlxuICAgICAgICAgICAgICAgICR7dXRpbHMuaXRlbURpc3BsYXlUeXBlLmJyT25lUGFnZX1cbiAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gLnZhbHVlPSR7dXRpbHMuaXRlbURpc3BsYXlUeXBlLmltYWdlTGlzdH0gP3NlbGVjdGVkPSR7dGhpcy5pdGVtRGlzcGxheSAhPT0gdGhpcy5pdGVtRGVmYXVsdERpc3BsYXkgJiYgdGhpcy5pdGVtRGlzcGxheSA9PT0gdXRpbHMuaXRlbURpc3BsYXlUeXBlLmltYWdlTGlzdH0+XG4gICAgICAgICAgICAgICAgJHt1dGlscy5pdGVtRGlzcGxheVR5cGUuaW1hZ2VMaXN0fVxuICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC91Y2QtdGhlbWUtc2xpbS1zZWxlY3Q+XG5cbiAgICAgICAgPCEtLSBcbiAgICAgICAgc2VlIGlzc3VlICMzNTksIHRoaXMgd2FzIGEgc3RvcCBnYXAgdGhhdCB3ZSBmaXhlZCBpbiB0aGUgaW1hZ2UgcHJvY2Vzc2luZyB3b3JrZmxvd1xuICAgICAgICB3aWxsIGxpa2VseSBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUsIGZvciBub3cganVzdCBkaXNhYmxpbmcgdGhlIHVpIGNvbnRyb2xzXG4gICAgICAgIFxuICAgICAgICA8cCBjbGFzcz1cImZvcm0tbGFiZWwgZHJvcGRvd24tbGFiZWwgaW1hZ2Utc2tld1wiPkltYWdlIFRpbHQgQ29ycmVjdGlvbjwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJpbWFnZS1za2V3LWRlc2NyaXB0aW9uXCI+UnVuIHRoaXMgcHJvY2VzcyB0byBmaXggdGlsdGVkIGltYWdlcy4gVGhpcyBpcyBhIHJlYWx0aW1lIHByb2Nlc3MsIHRoZXJlIG1heSBiZSBzb21lIGRlbGF5LjwvcD5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRlc2tldy13cmFwcGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRlc2tldy1hY3Rpb24td3JhcHBlclwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBhcHBseS1idXR0b25cIiA/ZGlzYWJsZWQ9XCIke3RoaXMud29ya2Zsb3dSdW5uaW5nIHx8IHRoaXMud29ya2Zsb3dTdGF0dXNMb2FkaW5nfVwiIEBjbGljaz1cIiR7dGhpcy5fcnVuV29ya2Zsb3d9XCI+UnVuIHByb2Nlc3M8L2J1dHRvbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXNrZXctc3RhdHVzXCI+XG4gICAgICAgICAgICAgIDx1Y2RsaWItaWNvbiA/aGlkZGVuPVwiJHt0aGlzLndvcmtmbG93RXJyb3IgfHwgIXRoaXMud29ya2Zsb3dSdW5uaW5nIHx8ICF0aGlzLmZpcnN0U3RhdHVzTG9hZGVkfVwiIGNsYXNzPVwiZGVza2V3LXJ1bm5pbmdcIiBpY29uPVwidWNkbGliLWRhbXM6ZmEtcm90YXRlXCI+PC91Y2RsaWItaWNvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHAgY2xhc3M9XCJpbWFnZS1za2V3LXN0YXR1c1wiPiR7dGhpcy53b3JrZmxvd1N0YXR1c308L3A+IFxuICAgICAgICAtLT5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwicmlnaHQtcGFuZWxcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImljb24td3JhcHBlclwiID9oaWRkZW49XCIke3RoaXMuZWRpdE1vZGUgfHwgIXRoaXMuaXNVaUFkbWlufVwiIEBjbGljaz1cIiR7dGhpcy5fb25FZGl0Q2xpY2tlZH1cIj5cbiAgICAgICAgICA8dWNkbGliLWljb24gaWNvbj1cInVjZGxpYi1kYW1zOmZhLXBlblwiPjwvdWNkbGliLWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvbi13cmFwcGVyIGVkaXRcIiA/aGlkZGVuPVwiJHshdGhpcy5lZGl0TW9kZSB8fCAhdGhpcy5pc1VpQWRtaW59XCIgQGNsaWNrPVwiJHt0aGlzLl9vblNhdmVDbGlja2VkfVwiPlxuICAgICAgICAgIDx1Y2RsaWItaWNvbiBpY29uPVwidWNkbGliLWRhbXM6ZmEtZmxvcHB5LWRpc2tcIj48L3VjZGxpYi1pY29uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImljb24td3JhcHBlciBlZGl0XCIgP2hpZGRlbj1cIiR7IXRoaXMuZWRpdE1vZGUgfHwgIXRoaXMuaXNVaUFkbWlufVwiIEBjbGljaz1cIiR7dGhpcy5fb25DYW5jZWxFZGl0Q2xpY2tlZH1cIj5cbiAgICAgICAgICA8dWNkbGliLWljb24gaWNvbj1cInVjZGxpYi1kYW1zOmZhLXhtYXJrXCI+PC91Y2RsaWItaWNvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuXG4gICAgPGFwcC1tZWRpYS12aWV3ZXI+PC9hcHAtbWVkaWEtdmlld2VyPlxuXG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiIHN0eWxlPVwicGFkZGluZy1ib3R0b206IDUwcHg7XCI+XG4gICAgICAke3RoaXMubmFtZVxuICAgICAgICA/IGh0bWxgPGgxPiR7dGhpcy5uYW1lfTwvaDE+YFxuICAgICAgICA6IGh0bWxgYFxuICAgICAgfVxuICAgICAgXG4gICAgICA8ZGl2IGNsYXNzPVwiY29weXJpZ2h0XCIgP2hpZGRlbj1cIiR7IXRoaXMuY29weXJpZ2h0IHx8ICF0aGlzLmNvcHlyaWdodC5sYWJlbCB8fCAhdGhpcy5jb3B5cmlnaHQudXJsfVwiPlxuICAgICAgICA8c3Bhbj4mY29weTs8L3NwYW4+XG4gICAgICAgIDxhIGhyZWY9XCIke3RoaXMuY29weXJpZ2h0LnVybH1cIlxuICAgICAgICAgIGNsYXNzPVwiY29weXJpZ2h0LXRleHRcIj4ke3RoaXMuY29weXJpZ2h0LmxhYmVsfTwvYT5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwicGFydC1vZlwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFydC1vZi1pbWctY29udGFpbmVyXCI+PGltZyBzcmM9XCIke3RoaXMuY29sbGVjdGlvbkltZ31cIiBhbHQ9XCJcIiAvPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sbGVjdGlvbi1pbmZvXCI+XG4gICAgICAgICAgPHAgc3R5bGU9XCJmb250LXN0eWxlOiBpdGFsaWM7XCI+cGFydCBvZiBkaWdpdGFsIGNvbGxlY3Rpb248L3A+XG4gICAgICAgICAgJHt0aGlzLmNvbGxlY3Rpb25JZCAmJiB0aGlzLmNvbGxlY3Rpb25OYW1lXG4gICAgICAgICAgICA/IGh0bWxgPGg0PjxhIGhyZWY9XCIke3RoaXMuY29sbGVjdGlvbklkfVwiPiR7dGhpcy5jb2xsZWN0aW9uTmFtZX08L2E+PC9oND5gXG4gICAgICAgICAgICA6IGh0bWxgYFxuICAgICAgICAgIH1cbiAgICAgICAgICA8c3Bhbj4ke3RoaXMuY29sbGVjdGlvbkl0ZW1Db3VudH0gaXRlbXM8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJkb3dubG9hZC1zZWN0aW9uXCIgP2hpZGRlbj1cIiR7dGhpcy5kaXNhYmxlRG93bmxvYWR9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPkRvd25sb2FkPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkb3dubG9hZC1vcHRpb25zXCI+XG4gICAgICAgICAgPGFwcC1tZWRpYS1kb3dubG9hZFxuICAgICAgICAgICAgaWQ9XCJkb3dubG9hZFwiXG4gICAgICAgICAgICA/aGlkZGVuPVwiJHt0aGlzLmlzQmFnT2ZGaWxlc31cIj48L2FwcC1tZWRpYS1kb3dubG9hZD5cbiAgICAgICAgICA8YXBwLWZzLW1lZGlhLWRvd25sb2FkXG4gICAgICAgICAgICBpZD1cImRvd25sb2FkXCJcbiAgICAgICAgICAgID9oaWRkZW49XCIkeyF0aGlzLmlzQmFnT2ZGaWxlc31cIj48L2FwcC1mcy1tZWRpYS1kb3dubG9hZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiA/aGlkZGVuPVwiJHshdGhpcy5kYXRlfVwiIGNsYXNzPVwibWV0YWRhdGEtcm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhdHRyXCI+RGF0ZTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidmFsdWVcIiBpZD1cImRhdGVWYWx1ZVwiPiR7dGhpcy5kYXRlfTwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgP2hpZGRlbj1cIiR7IXRoaXMuZGVzY3JpcHRpb24gfHwgIXRoaXMuZGVzY3JpcHRpb24ubGVuZ3RofVwiIGNsYXNzPVwibWV0YWRhdGEtcm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhdHRyXCI+RGVzY3JpcHRpb248L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlXCIgaWQ9XCJkZXNjcmlwdGlvblZhbHVlXCI+XG4gICAgICAgICAgPHVjZGxpYi1tZCBpZD1cIm1kXCI+XG4gICAgICAgICAgICA8dWNkbGliLW1kLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICR7dGhpcy5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgIDwvdWNkbGliLW1kLWNvbnRlbnQ+XG4gICAgICAgICAgPC91Y2RsaWItbWQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgP2hpZGRlbj1cIiR7IXRoaXMucHVibGlzaGVyfVwiIGNsYXNzPVwibWV0YWRhdGEtcm93XCIgaWQ9XCJwdWJsaXNoZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImF0dHJcIj5QdWJsaXNoZXI8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlXCIgaWQ9XCJwdWJsaXNoZXJWYWx1ZVwiPiR7dGhpcy5wdWJsaXNoZXJ9PC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdlxuICAgICAgICA/aGlkZGVuPVwiJHshdGhpcy5zdWJqZWN0cyB8fCAhdGhpcy5zdWJqZWN0cy5sZW5ndGh9XCJcbiAgICAgICAgY2xhc3M9XCJtZXRhZGF0YS1yb3dcIlxuICAgICAgICBpZD1cInN1YmplY3RcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImF0dHJcIj5TdWJqZWN0czwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidmFsdWVcIiBpZD1cInN1YmplY3RWYWx1ZVwiPlxuICAgICAgICAgICR7dGhpcy5zdWJqZWN0cy5tYXAoXG4gICAgICAgICAgICAoYWJvdXQsIGluZGV4KSA9PlxuICAgICAgICAgICAgICBodG1sYCR7aW5kZXggPiAwID8gXCIsIFwiIDogXCJcIn08YSBocmVmPVwiJHt1dGlscy5nZXRTdWJqZWN0VXJsKHRoaXMuUmVjb3JkTW9kZWwsIGFib3V0W1wibmFtZVwiXSB8fCBhYm91dFtcIkBpZFwiXSl9XCIgQGNsaWNrPVwiJHt0aGlzLl9vblN1YmplY3RDbGlja31cIj4ke2Fib3V0W1wibmFtZVwiXSB8fCBhYm91dFtcIkBpZFwiXX08L2E+YFxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgP2hpZGRlbj1cIiR7IXRoaXMuY3JlYXRvciB8fCAhdGhpcy5jcmVhdG9yLmxlbmd0aH1cIiBjbGFzcz1cIm1ldGFkYXRhLXJvd1wiIGlkPVwiY3JlYXRvclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXR0clwiPkNyZWF0b3I8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlXCIgaWQ9XCJjcmVhdG9yVmFsdWVcIj5cbiAgICAgICAgICAke3RoaXMuY3JlYXRvci5tYXAoXG4gICAgICAgICAgICAoYywgaW5kZXgpID0+XG4gICAgICAgICAgICAgIGh0bWxgJHtpbmRleCA+IDAgPyBcIiwgXCIgOiBcIlwifTxhIGhyZWY9XCIke3V0aWxzLmdldENyZWF0b3JVcmwodGhpcy5SZWNvcmRNb2RlbCwgYyl9XCIgQGNsaWNrPVwiJHt0aGlzLl9vbkNyZWF0b3JDbGlja31cIj4ke2N9PC9hPmBcbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2ID9oaWRkZW49XCIkeyF0aGlzLmNhbGxOdW1iZXJ9XCIgY2xhc3M9XCJtZXRhZGF0YS1yb3dcIiBpZD1cImNhbGxOdW1iZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImF0dHJcIj5DYWxsIE51bWJlcjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidmFsdWVcIiBpZD1cImNhbGxOdW1iZXJWYWx1ZVwiPiR7dGhpcy5jYWxsTnVtYmVyfTwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgP2hpZGRlbj1cIiR7IXRoaXMubWF0ZXJpYWx9XCIgY2xhc3M9XCJtZXRhZGF0YS1yb3dcIiBpZD1cIm1hdGVyaWFsXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhdHRyXCI+Rm9ybWF0PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZVwiIGlkPVwibWF0ZXJpYWxWYWx1ZVwiPiR7dGhpcy5tYXRlcmlhbH08L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwibWV0YWRhdGEtcm93XCIgaWQ9XCJpZGVudGlmaWVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhdHRyXCI+QVJLIC8gRE9JPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZVwiIGlkPVwiaWRlbnRpZmllclZhbHVlXCI+XG4gICAgICAgICAgJHt0aGlzLmFya0RvaS5tYXAoKGxpbmspID0+IGh0bWxgPGEgQGNsaWNrPVwiJHt0aGlzLl9hcmtEb2lDbGlja31cIiBocmVmPVwiJHtsaW5rfVwiPiR7bGluay5yZXBsYWNlKCcvaXRlbScsICcnKX08L2E+YCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZXRhZGF0YS1yb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImF0dHJcIj5GZWRvcmEgTGluazwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidmFsdWVcIiBpZD1cImZlZG9yYVZhbHVlXCI+XG4gICAgICAgICAgJHt0aGlzLmZlZG9yYUxpbmtzLm1hcCgobGluaykgPT4gaHRtbGA8YSBocmVmPVwiJHtsaW5rfVwiPiR7bGluay5yZXBsYWNlKCcvZmNyOm1ldGFkYXRhJywgJycpfTwvYT5gKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cIm1ldGFkYXRhLXJvd1wiID9oaWRkZW49XCIkeyF0aGlzLnNob3dSZXBvcnRCdXR0b259XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhdHRyXCI+TW9kaWZ5PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZVwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwiY3JlYXRlLWlzc3VlIGJ0biBidG4tLXByaW1hcnlcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiJHt0aGlzLmdpdGh1Yklzc3VlVXJsfVwiPlJlcXVlc3QgTWV0YWRhdGEgQ2hhbmdlICh2aWEgR2l0SHViKTwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxhcHAtY2l0YXRpb24gLnJlY29yZD1cIiR7dGhpcy5jaXRhdGlvblJvb3R9XCIgY2l0YXRpb24tdHlwZS1sYWJlbD1cIkl0ZW1cIj48L2FwcC1jaXRhdGlvbj5cbiAgYDtcbn1cbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zYW1wb3R0cy9wbHlyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL3NoYWthLXBsYXllci9cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvc2hha2EtcGxheWVyL3RyZWUvbWFzdGVyL2RvY3MvdHV0b3JpYWxzXG5cbmltcG9ydCB7IExpdEVsZW1lbnQgfSBmcm9tIFwibGl0XCI7XG5cbmltcG9ydCByZW5kZXIgZnJvbSBcIi4vYXBwLWF1ZGlvLXZpZXdlci50cGwuanNcIjtcblxuaW1wb3J0IHsgTWl4aW4sIExpdENvcmtVdGlscyB9IGZyb20gJ0B1Y2QtbGliL2NvcmstYXBwLXV0aWxzJztcblxuaW1wb3J0IFwiLi4vLi4vLi4vdXRpbHMvYXBwLXNoYXJlLWJ0blwiO1xuXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi8uLi8uLi9saWIvY29uZmlnXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL2xpYi91dGlsc1wiO1xuaW1wb3J0IHZpZGVvTGlicyBmcm9tIFwiLi4vLi4vLi4vLi4vbGliL3V0aWxzL3ZpZGVvLWxpYi1sb2FkZXJcIjtcblxuaW1wb3J0IHBseXJDc3MgZnJvbSBcInBseXIvZGlzdC9wbHlyLmNzc1wiO1xuaW1wb3J0IHNoYWthQ3NzIGZyb20gXCJzaGFrYS1wbGF5ZXIvZGlzdC9jb250cm9scy5jc3NcIjtcbmxldCBBVURJT19TVFlMRVMgPSBwbHlyQ3NzK3NoYWthQ3NzO1xuXG5pbXBvcnQgc3ByaXRlU2hlZXQgZnJvbSBcInBseXIvZGlzdC9wbHlyLnN2Z1wiO1xubGV0IFNQUklURV9TSEVFVCA9IHNwcml0ZVNoZWV0O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBBdWRpb1ZpZXdlciBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpXG4gIC53aXRoKExpdENvcmtVdGlscykge1xuICBcbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc011bHRpbWVkaWEgOiB7IHR5cGUgOiBCb29sZWFuIH1cbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5pc011bHRpbWVkaWEgPSBmYWxzZTtcblxuICAgIHRoaXMuX2luamVjdE1vZGVsKCdBcHBTdGF0ZU1vZGVsJywgJ01lZGlhTW9kZWwnKTtcbiAgICB0aGlzLmxpYnNMb2FkZWQgPSBmYWxzZTtcbiAgICB0aGlzLiQgPSB7fTtcbiAgfVxuXG4gIGFzeW5jIF9vbkFwcFN0YXRlVXBkYXRlKGUpIHtcbiAgICBpZiAoIHRoaXMuZnVsbFBhdGggIT09IGUubG9jYXRpb24uZnVsbHBhdGggKSB7IFxuICAgICAgdGhpcy5fc3RvcCgpO1xuICAgIH1cblxuICAgIHRoaXMuZnVsbFBhdGggPSBlLmxvY2F0aW9uLmZ1bGxwYXRoO1xuICAgIHRoaXMuX3VwZGF0ZVN0eWxlcygpO1xuXG4gICAgbGV0IHNlbGVjdGVkUmVjb3JkID0gYXdhaXQgdGhpcy5BcHBTdGF0ZU1vZGVsLmdldFNlbGVjdGVkUmVjb3JkKCk7XG4gICAgaWYoIHNlbGVjdGVkUmVjb3JkICYmIHNlbGVjdGVkUmVjb3JkLnNlbGVjdGVkTWVkaWEgKSB0aGlzLl9vblNlbGVjdGVkUmVjb3JkTWVkaWFVcGRhdGUoc2VsZWN0ZWRSZWNvcmQuc2VsZWN0ZWRNZWRpYSk7XG4gIH1cblxuICBhc3luYyBmaXJzdFVwZGF0ZWQoZSkge1xuICAgIHRoaXMuJC5hdWRpbyAgPSB0aGlzLnNoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoJ2F1ZGlvX3BsYXllcicpO1xuICAgIHRoaXMuJC5wb3N0ZXIgPSB0aGlzLnNoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoJ2F1ZGlvX3Bvc3RlcicpO1xuXG4gICAgdGhpcy5mdWxsUGF0aCA9IChhd2FpdCB0aGlzLkFwcFN0YXRlTW9kZWwuZ2V0KCkpLmxvY2F0aW9uLmZ1bGxwYXRoO1xuICAgIFxuICAgIC8vIHdlYnBhY2sgbW9kdWxlIGlzIGJhc2U2NCBlbmNvZGVkIFVSTCwgY2hlY2sgaWYgdGhpcyBoYXBwZW5lZCBcbiAgICAvLyBhbmQgZGVjb2RlLCB0aGVuIHNldCBzdmcgdG8gaW5uZXJIdG1sIGluc2lkZSB0aGUgc2hhZG93IGRvbS5cbiAgICBpZiggU1BSSVRFX1NIRUVULmluZGV4T2YoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQnKSA+IC0xICkge1xuICAgICAgU1BSSVRFX1NIRUVUID0gYXRvYihTUFJJVEVfU0hFRVQucmVwbGFjZSgnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCwnLCAnJykpO1xuICAgIH1cbiAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI3Nwcml0ZS1wbHlyJykuaW5uZXJIVE1MID0gU1BSSVRFX1NIRUVUO1xuXG4gICAgdGhpcy5fdXBkYXRlU3R5bGVzKCk7XG4gIH1cblxuICBfdXBkYXRlU3R5bGVzKCkge1xuICAgIC8vIGRlY2lkZSB3aGVyZSB0byBwdXQgY3NzXG4gICAgLy8gVGhlIFBMWVIgbGlicmFyeSBpc24ndCBhd2FyZSBvZiBzaGFkeWRvbSBzbyB3ZSBuZWVkIHRvIG1hbnVhbGx5XG4gICAgLy8gcGxhY2Ugb3VyIHN0eWxlcyBpbiBkb2N1bWVudC5oZWFkIHcvbyBzaGFkeWRvbSB0b3VjaGluZyB0aGVtLlxuICAgIGxldCBwbHlyU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBwbHlyU3R5bGVzLmlubmVySFRNTCA9IEFVRElPX1NUWUxFUztcbiAgICBpZiggd2luZG93LlNoYWR5RE9NICYmIHdpbmRvdy5TaGFkeURPTS5pblVzZSApIHtcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocGx5clN0eWxlcyk7XG4gICAgICB0aGlzLmhpZGVDb250cm9scyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQocGx5clN0eWxlcyk7XG4gICAgICB0aGlzLmhpZGVDb250cm9scyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uU2VsZWN0ZWRSZWNvcmRNZWRpYVVwZGF0ZVxuICAgKiBAZGVzY3JpcHRpb24gZnJvbSBBcHBTdGF0ZU1vZGVsLCBjYWxsZWQgd2hlbiBhIHJlY29yZHMgbWVkaWEgaXMgc2VsZWN0ZWRcbiAgICogXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtZWRpYSBcbiAgKiovXG4gIGFzeW5jIF9vblNlbGVjdGVkUmVjb3JkTWVkaWFVcGRhdGUobWVkaWEpIHtcbiAgICBpZiggIW1lZGlhICkgcmV0dXJuO1xuICAgIGlmICggdXRpbHMuZ2V0TWVkaWFUeXBlKG1lZGlhKSAhPT0gJ0F1ZGlvT2JqZWN0JyApIHJldHVybjtcblxuICAgIHRoaXMubWVkaWEgPSBtZWRpYTtcblxuICAgIGlmKCB0aGlzLmxpYnNMb2FkZWQgKSB7XG4gICAgICB0aGlzLl9sb2FkQXVkaW8oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBkeW5hbWljYWxseSBsb2FkIHBseXIgYW5kIHNoYWthIGxpYnNcbiAgICBsZXQge3BseXJ9ID0gYXdhaXQgdmlkZW9MaWJzLmxvYWQoKTtcblxuICAgIHRoaXMuYXVkaW9QbGF5ZXIgPSBuZXcgcGx5cih0aGlzLiQuYXVkaW8sIHtcbiAgICAgIGZ1bGxzY3JlZW4gOiB7ZW5hYmxlZDogZmFsc2V9LFxuICAgICAgY2FwdGlvbnM6IHt1cGRhdGU6IGZhbHNlfSxcbiAgICAgIGNvbnRyb2xzIDogWydwbGF5LWxhcmdlJywgJ3BsYXknLCAncHJvZ3Jlc3MnLCAnY3VycmVudC10aW1lJywgJ211dGUnLCAndm9sdW1lJ11cbiAgICB9KTtcblxuICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdGhpcy5saWJzTG9hZGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9sb2FkQXVkaW8oKTtcblxuICAgIHRoaXMuX3VwZGF0ZVN0eWxlcygpO1xuICB9XG5cbiAgX2xvYWRBdWRpbygpIHtcbiAgICBsZXQgc291cmNlRWxlID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNhdWRpb19wbGF5ZXIgc291cmNlJyk7XG4gICAgc291cmNlRWxlLnNyYyA9IGNvbmZpZy5mY3JlcG9CYXNlUGF0aCt0aGlzLm1lZGlhWydAaWQnXTtcbiAgICBzb3VyY2VFbGUudHlwZSA9IHRoaXMubWVkaWEuZmlsZUZvcm1hdCB8fCB0aGlzLm1lZGlhLmhhc01pbWVUeXBlIHx8IHRoaXMubWVkaWEuZW5jb2RpbmdGb3JtYXQgfHwgJyc7XG4gICAgXG4gICAgLy8gRkYgSGFjay4gIFJhbmdlIHNsaWRlciBub3QgZ29pbmcgYmFjayB0byAwIG9uIHN0b3BcbiAgICB0cnkge1xuICAgICAgdGhpcy5hdWRpb1BsYXllci5zdG9wKCk7XG4gICAgICBsZXQgZWxlID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJyYW5nZVwiXVtkYXRhLXBseXI9XCJzZWVrXCJdJyk7XG4gICAgICBpZiggZWxlICkgZWxlLnZhbHVlID0gMDtcbiAgICB9IGNhdGNoKGUpIHt9XG5cbiAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI2F1ZGlvX3BsYXllcicpLmxvYWQoKTtcblxuICAgIGxldCBwb3N0ZXIgPSB0aGlzLm1lZGlhLnRodW1ibmFpbFVybCAgPyB0aGlzLm1lZGlhLnRodW1ibmFpbFVybCsnL3N2YzppaWlmL2Z1bGwvLDQwMC8wL2RlZmF1bHQuanBnJyA6ICcnO1xuICAgIGlmICggcG9zdGVyICkge1xuICAgICAgdGhpcy4kLnBvc3Rlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIHRoaXMuJC5wb3N0ZXIuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoXCIgKyBwb3N0ZXIgKyBcIilcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kLnBvc3Rlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIHBsYXliYWNrIGFuZCByZXNldCB0byBzdGFydFxuICAgKiovXG4gIF9zdG9wKCkge1xuICAgIGlmKCAhdGhpcy5hdWRpb1BsYXllciApIHJldHVybjtcbiAgICB0aGlzLmF1ZGlvUGxheWVyLnN0b3AoKTtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2FwcC1hdWRpby12aWV3ZXInLCBBcHBBdWRpb1ZpZXdlcik7IiwiaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2xpdCc7XG5pbXBvcnQgcGx5ckNzcyBmcm9tIFwicGx5ci9kaXN0L3BseXIuY3NzXCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyKCkgeyBcbnJldHVybiBodG1sYFxuPHN0eWxlPlxuICA6aG9zdCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICBwYWRkaW5nOiAyMHB4IDIwcHggMCAyMHB4O1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIH1cblxuICA6aG9zdCBhcHAtc2hhcmUtYnRuIHtcbiAgICBmaWxsOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTgwKTtcbiAgfVxuXG4gIFtoaWRkZW5dIHtcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gIH1cblxuICAuYnV0dG9uIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTgwKTtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHdpZHRoOiA1MHB4O1xuICAgIGhlaWdodDogNTBweDtcbiAgICBtYXJnaW4tbGVmdDogMC40cmVtO1xuICB9XG5cbiAgLmNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAjYXVkaW9fcG9zdGVyIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgbWF4LXdpZHRoOiA0MDBweDtcbiAgICBoZWlnaHQ6IDQwMHB4O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIH1cblxuICAubGF5b3V0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGJvcmRlci1ib3R0b206IDZweCBkb3R0ZWQgdmFyKC0tY29sb3ItYWdnaWUtZ29sZCk7XG4gICAgd2lkdGg6IDYwJTtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICBwYWRkaW5nLWJvdHRvbTogMC43cmVtO1xuICB9XG5cbiAgLmxheW91dC5tdWx0aW1lZGlhIHtcbiAgICBib3JkZXItYm90dG9tOiBub25lO1xuICB9XG5cbiAgLnBseXItLWF1ZGlvIHtcbiAgICBtYXgtd2lkdGg6IDUwMHB4ICFpbXBvcnRhbnQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICB9XG5cbiAgLnBseXItLWZ1bGwtdWkgaW5wdXRbdHlwZT1yYW5nZV0ge1xuICAgIGNvbG9yOiAjZGFhYTAwICFpbXBvcnRhbnQ7XG4gIH1cblxuICBidXR0b24ucGx5cl9fY29udHJvbC5wbHlyX19jb250cm9sLS1vdmVybGFpZCwgXG4gIGJ1dHRvbi5wbHlyX19jb250cm9sLnBseXJfX2NvbnRyb2w6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yLWRhbXMtc2Vjb25kYXJ5LCAjRkZCRjAwKTtcbiAgfVxuICAucGx5ci0tZnVsbC11aSBpbnB1dFt0eXBlPXJhbmdlXSB7IFxuICAgIGNvbG9yOiB2YXIoLS1jb2xvci1kYW1zLXNlY29uZGFyeSwgI0ZGQkYwMCkgIWltcG9ydGFudDtcbiAgfVxuXG4gIC52b2x1bWUtaWNvbiB7XG4gICAgZmlsbDogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS01MCwgI0IwRDBFRCk7XG4gICAgaGVpZ2h0OiAxMDdweDtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgfVxuXG4gIC50b29sdGlwIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG5cbiAgLnRvb2x0aXA6aG92ZXI6YmVmb3JlIHtcbiAgICBjb250ZW50OiBhdHRyKGRhdGEtdG9vbHRpcC10ZXh0KTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiA2MHB4O1xuICAgIHJpZ2h0OiA1MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDUwJSk7XG4gICAgcGFkZGluZzogNXB4IDEwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUpO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNpdGlvbjogLjJzIG9wYWNpdHkgZWFzZS1vdXQ7XG4gICAgei1pbmRleDogMTA7XG4gIH1cblxuICAudG9vbHRpcDpob3ZlcjphZnRlciB7XG4gICAgY29udGVudDogXCJcIjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiA1MHB4O1xuICAgIHJpZ2h0OiAyMHB4O1xuICAgIGJvcmRlcjogNXB4IHNvbGlkIHZhcigtLWNvbG9yLWFnZ2llLWJsdWUpO1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSkgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2l0aW9uOiAuMnMgb3BhY2l0eSBlYXNlLW91dDtcbiAgfVxuXG4gIC50b29sdGlwOmhvdmVyOmJlZm9yZSxcbiAgLnRvb2x0aXA6aG92ZXI6YWZ0ZXIge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cblxuICAudG9vbHRpcDpoYXMoPiBhcHAtc2hhcmUtYnRuW3BvcHVwXSk6aG92ZXI6YmVmb3JlLFxuICAudG9vbHRpcDpoYXMoPiBhcHAtc2hhcmUtYnRuW3BvcHVwXSk6aG92ZXI6YWZ0ZXIge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICAuYnV0dG9uOmhvdmVyLFxuICAuYnV0dG9uOmhhcyg+IGFwcC1zaGFyZS1idG5bcG9wdXBdKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gIH1cblxuICAke3BseXJDc3N9XG48L3N0eWxlPlxuPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICA8dWNkbGliLWljb24gY2xhc3M9XCJ2b2x1bWUtaWNvblwiIGljb249XCJ1Y2RsaWItZGFtczpmYS12b2x1bWUtaGlnaFwiPjwvdWNkbGliLWljb24+XG4gIDxkaXYgaWQ9XCJzcHJpdGUtcGx5clwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj48L2Rpdj5cbiAgPGRpdiBpZD1cImF1ZGlvX3Bvc3RlclwiPjwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJsYXlvdXQgJHt0aGlzLmlzTXVsdGltZWRpYSA/ICdtdWx0aW1lZGlhJyA6ICcnfVwiPlxuICAgIDxhdWRpbyBpZD1cImF1ZGlvX3BsYXllclwiIGNvbnRyb2xzPlxuICAgICAgPHNvdXJjZT5cbiAgICA8L2F1ZGlvPlxuICAgIDxkaXYgP2hpZGRlbj1cIiR7dGhpcy5pc011bHRpbWVkaWF9XCIgY2xhc3M9XCJidXR0b24gdG9vbHRpcFwiIGRhdGEtdG9vbHRpcC10ZXh0PVwiU2hhcmVcIj5cbiAgICAgIDxhcHAtc2hhcmUtYnRuPjwvYXBwLXNoYXJlLWJ0bj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuYFxufSIsImltcG9ydCB7IExpdEVsZW1lbnQsIGh0bWwgfSBmcm9tICdsaXQnO1xuXG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2FwcC1mcy12aWV3ZXIudHBsLmpzXCJcblxuaW1wb3J0IHsgTWl4aW4sIExpdENvcmtVdGlscyB9IGZyb20gJ0B1Y2QtbGliL2NvcmstYXBwLXV0aWxzJztcblxuaW1wb3J0IFwiLi4vLi4vLi4vdXRpbHMvYXBwLXZpcnR1YWwtc2Nyb2xsZXJcIlxuaW1wb3J0IFwiQHBvbHltZXIvaXJvbi1pY29ucy9lZGl0b3ItaWNvbnNcIlxuaW1wb3J0IGJ5dGVzIGZyb20gXCJieXRlc1wiXG5cbmNvbnN0IElDT05TID0ge1xuICAnZm9sZGVyJyA6IFsnZm9sZGVyJ10sXG4gICdmaW4taWNvbnM6aW1hZ2Utc29saWQnIDogWyd0aWYnLCAndGlmZicsICdnaWYnLCAnanBnJywgJ2pwMicsICdqcGVnJywgJ3dlYnAnLCAnYm1wJywgJ3BuZyddLFxuICAnZmluLWljb25zOnZpZGVvLXNvbGlkJyA6IFsnYXZpJywgJ21wNCcsICdmbHYnLCAnd212JywgJ21vdiddLFxuICAnZmluLWljb25zOnNvdW5kLXNvbGlkJyA6IFsnd2F2JywgJ21wMycsICdtaWQnLCAnYWlmJ10sXG4gICdmaW4taWNvbnM6dGV4dC1zb2xpZCcgOiBbJ2RvYycsICdkb2N4JywgJ3R4dCcsICdydGYnLCAnLm9kdCddLFxuICAnZmluLWljb25zOnNwcmVhZHNoZWV0LXNvbGlkJyA6IFsnb2RzJywgJ2NzdicsICd0c3YnLCAneHNsJywgJ3hzbHgnXSxcbiAgJ2Zpbi1pY29uczpwZGYtc29saWQnIDogWydwZGYnXSxcbiAgJ2Zpbi1pY29uczpjb21wcmVzc2VkLXNvbGlkJyA6IFsnemlwJywgJ3JhcicsICdhcmonLCAnZ3onLCAndGd6J11cbn1cbmNvbnN0IFVOS05PV05fSUNPTiA9ICdmaW4taWNvbnM6ZmlsZS1zb2xpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcEZzVmlld2VyIGV4dGVuZHMgTWl4aW4oTGl0RWxlbWVudClcbiAgLndpdGgoTGl0Q29ya1V0aWxzKSB7XG5cbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZSA6IHt0eXBlOiBTdHJpbmd9LFxuICAgICAgbG9hZGluZ0ZpbGVzIDoge3R5cGU6IEJvb2xlYW59LFxuICAgICAgbG9hZGluZ1NlYXJjaCA6IHt0eXBlOiBCb29sZWFufSxcbiAgICAgIGN1cnJlbnREaXIgOiB7dHlwZTogU3RyaW5nfSxcbiAgICAgIGZpbGVzIDoge3R5cGU6IEFycmF5fSxcbiAgICAgIHNlbGVjdGVkRmlsZSA6IHt0eXBlOiBTdHJpbmd9LFxuICAgICAgbW9kZSA6IHt0eXBlOiBTdHJpbmd9LFxuICAgICAgdGh1bWJuYWlsIDoge3R5cGU6IFN0cmluZ30sXG4gICAgICBsaW5lSGVpZ2h0IDoge3R5cGU6IE51bWJlcn0sXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5yZXNldCgpO1xuXG4gICAgdGhpcy5faW5qZWN0TW9kZWwoJ0FwcFN0YXRlTW9kZWwnLCAnUmVjb3JkTW9kZWwnKTtcblxuICAgIHRoaXMuaWNvbk1hcCA9IHt9O1xuICAgIGZvciggbGV0IGljb24gaW4gSUNPTlMgKSB7XG4gICAgICBmb3IoIGxldCBleHQgb2YgSUNPTlNbaWNvbl0gKSB7XG4gICAgICAgIHRoaXMuaWNvbk1hcFtleHRdID0gaWNvbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4gdGhpcy5fb25SZXNpemUoKSk7XG4gIH1cblxuICBmaXJzdFVwZGF0ZWQoKSB7XG4gICAgdGhpcy5jb250ZW50Qm9keSA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC1ib2R5Jyk7XG4gICAgdGhpcy5zY3JvbGxQYW5lbCA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdhcHAtdmlydHVhbC1zY3JvbGxlcicpO1xuICAgIHRoaXMuc2Nyb2xsUGFuZWwuc2V0SXRlbVJlbmRlcmVyKHRoaXMucmVuZGVyUm93LCB0aGlzKTtcblxuICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMpO1xuXG4gICAgdGhpcy5maWxlbmFtZVdpZHRoID0gJzMwcHgnO1xuXG4gICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgLy8gICB0aGlzLnNob3coKTtcbiAgICAvLyB9LCAxMDAwKVxuICAgIFxuICB9XG5cbiAgdXBkYXRlZChwcm9wcykge1xuICAgIGlmKCBwcm9wcy5oYXMoJ3NlbGVjdGVkRmlsZScpICkge1xuICAgICAgZm9yKCBsZXQgZmlsZSBvZiB0aGlzLmZpbGVzICkge1xuICAgICAgICBmaWxlLnNlbGVjdGVkID0gKGZpbGUuZnVsbFVybCA9PT0gdGhpcy5zZWxlY3RlZEZpbGUpO1xuICAgICAgfVxuICAgICAgdGhpcy5zY3JvbGxQYW5lbC5yZXF1ZXN0VXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gIC8vICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgLy8gICB0aGlzLmJhY2tncm91bmQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJyNiYWNrZ3JvdW5kJyk7XG4gIC8vICAgdGhpcy5iYWNrZ3JvdW5kLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIC8vICAgdGhpcy5zaGFkb3dSb290LnJlbW92ZUNoaWxkKHRoaXMuYmFja2dyb3VuZCk7XG4gIC8vICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmQpO1xuICAvLyB9XG5cbiAgX29uUmVzaXplKCkge1xuICAgIGlmKCAhdGhpcy5jb250ZW50Qm9keSApIHJldHVybjtcbiAgICAvLyB0aGlzLnNjcm9sbFBhbmVsLnN0eWxlLmhlaWdodCA9ICh0aGlzLmNvbnRlbnRCb2R5Lm9mZnNldEhlaWdodCAtIDE3NSkrJ3B4JztcblxuICAgIGxldCBiYXNlSGVpZ2h0ID0gMzM1O1xuICAgIGlmKCB3aW5kb3cuaW5uZXJXaWR0aCA+IDcwMCApIHtcbiAgICAgIHRoaXMuc2Nyb2xsUGFuZWwuc3R5bGUuaGVpZ2h0ID0gKHdpbmRvdy5pbm5lckhlaWdodCAtIGJhc2VIZWlnaHQgLSAxMDApKydweCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2Nyb2xsUGFuZWwuc3R5bGUuaGVpZ2h0ID0gKHdpbmRvdy5pbm5lckhlaWdodCAtIGJhc2VIZWlnaHQpKydweCc7XG4gICAgfVxuXG4gICAgXG4gICAgdGhpcy5maWxlbmFtZVdpZHRoID0gKCB0aGlzLnNjcm9sbFBhbmVsLm9mZnNldFdpZHRoIC0gMTU1ICkrJ3B4JztcbiAgICB0aGlzLnNjcm9sbFBhbmVsLnJlcXVlc3RVcGRhdGUoKTtcbiAgfVxuXG4gIF9vbkFwcFN0YXRlVXBkYXRlKGUpIHtcbiAgICBpZiggdGhpcy5zZWxlY3RlZFJlY29yZCA9PT0gZS5zZWxlY3RlZFJlY29yZCApIHJldHVybjtcbiAgICBpZiggIWUuc2VsZWN0ZWRSZWNvcmQgKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXNldCgpO1xuICAgIH1cblxuICAgIHRoaXMucmVzZXQoKTtcblxuICAgIHRoaXMuc2VsZWN0ZWRSZWNvcmQgPSBlLnNlbGVjdGVkUmVjb3JkO1xuICAgIHRoaXMuc2VsZWN0ZWRSZWNvcmRNZWRpYSA9IGUuc2VsZWN0ZWRSZWNvcmRNZWRpYTtcblxuICAgIGlmKCB0aGlzLnNlbGVjdGVkUmVjb3JkICYmIHRoaXMuc2VsZWN0ZWRSZWNvcmQuc2VsZWN0ZWRNZWRpYVsnQHR5cGUnXS5pbmNsdWRlcygnaHR0cDovL2RpZ2l0YWwudWNkYXZpcy5lZHUvc2NoZW1hI0JhZ09mRmlsZXMnKSApIHtcbiAgICAgIHRoaXMuX2Jyb3dzZURpcmVjdG9yeSgpO1xuICAgICAgdGhpcy50aXRsZSA9IHRoaXMuc2VsZWN0ZWRSZWNvcmQucm9vdC5uYW1lIHx8IHRoaXMuc2VsZWN0ZWRSZWNvcmQucm9vdC50aXRsZTtcbiAgICAgIHRoaXMudGh1bWJuYWlsID0gdGhpcy5zZWxlY3RlZFJlY29yZC5yb290LnRodW1ibmFpbFVybCB8fCAnJztcbiAgICB9XG4gIH1cblxuICBhc3luYyBzaG93KCkge1xuICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIC8vIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcblxuICAgIHRoaXMuX29uUmVzaXplKCk7XG5cbiAgICB0aGlzLl9vbkFwcFN0YXRlVXBkYXRlKGF3YWl0IHRoaXMuQXBwU3RhdGVNb2RlbC5nZXQoKSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX29uUmVzaXplKCk7XG4gICAgICB0aGlzLnNjcm9sbFBhbmVsLl9vblJlc2l6ZSgpO1xuICAgIH0sIDUwKTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuc2VsZWN0ZWRSZWNvcmQgPSBudWxsO1xuICAgIHRoaXMubG9hZGluZ0ZpbGVzID0gZmFsc2U7XG4gICAgdGhpcy5sb2FkaW5nU2VhcmNoID0gZmFsc2U7XG4gICAgdGhpcy5jdXJyZW50RGlyID0gJy8nO1xuICAgIHRoaXMuZmlsZXMgPSBbXTtcbiAgICB0aGlzLmxpbmVIZWlnaHQgPSA0MTtcbiAgICB0aGlzLnNlbGVjdGVkRmlsZSA9ICcnO1xuICB9XG5cbiAgX3JlbmRlckJyZWFkY3J1bWJzKCkge1xuICAgIGlmKCB0aGlzLm1vZGUgPT09ICdzZWFyY2gnICkge1xuICAgICAgcmV0dXJuIGh0bWxgPGlyb24taWNvbiBpY29uPVwiY2hldnJvbi1yaWdodFwiPjwvaXJvbi1pY29uPlxuICAgICAgPHNwYW4gY2xhc3M9XCJicmVhZGNydW1iXCI+U2VhcmNoIFJlc3VsdHM8L3NwYW4+YDtcbiAgICB9XG5cbiAgICBsZXQgZnVsbERpclBhdGggPSBbXTtcblxuICAgIHJldHVybiB0aGlzLmN1cnJlbnREaXJcbiAgICAgIC5yZXBsYWNlKC9eXFwvLywgJycpXG4gICAgICAuc3BsaXQoJy8nKVxuICAgICAgLm1hcChkaXIgPT4gIHtcbiAgICAgICAgZnVsbERpclBhdGgucHVzaChkaXIpIFxuICAgICAgICBpZiggZGlyID09PSAnJyApIHJldHVybiBodG1sYGA7XG5cbiAgICAgICAgcmV0dXJuIGh0bWxgPGlyb24taWNvbiBpY29uPVwiY2hldnJvbi1yaWdodFwiPjwvaXJvbi1pY29uPlxuICAgICAgICA8YSBjbGFzcz1cImJyZWFkY3J1bWJcIiBAY2xpY2s9XCIke3RoaXMuX29uQnJlYWRjcnVtYkNsaWNrZWR9XCIgZGlyPVwiJHsnLycrZnVsbERpclBhdGguam9pbignLycpfVwiPiR7ZGlyfTwvYT5gXG4gICAgICB9KTtcbiAgfVxuXG4gIHJlbmRlclJvdyhpbmRleCkge1xuICAgIGxldCBmaWxlID0gdGhpcy5maWxlc1tpbmRleF07XG4gICAgbGV0IGljb24gPSB0aGlzLl9nZXRJY29uKGZpbGUpO1xuXG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCIgc3R5bGU9XCJoZWlnaHQ6ICR7dGhpcy5saW5lSGVpZ2h0LTF9cHhcIiA/ZGlyZWN0b3J5PVwiJHtmaWxlLmlzRGlyZWN0b3J5fVwiID9zZWxlY3RlZD1cIiR7ZmlsZS5zZWxlY3RlZH1cIiBpbmRleD1cIiR7aW5kZXh9XCIgQGNsaWNrPVwiJHt0aGlzLl9vbkl0ZW1DbGlja2VkfVwiIC5jb250ZXh0PVwiJHt0aGlzfVwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uXCI+XG4gICAgICAgICAgICA8aXJvbi1pY29uIGljb249XCIke2ljb259XCI+PC9pcm9uLWljb24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZpbGVcIiBzdHlsZT1cIndpZHRoOiAke3RoaXMuZmlsZW5hbWVXaWR0aH1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWxlbmFtZVwiPiR7ZmlsZS5maWxlbmFtZX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXJlY3RvcnlcIiA/aGlkZGVuPVwiJHt0aGlzLm1vZGUgPT09ICdicm93c2UnfVwiPiR7ZmlsZS5kaXJlY3RvcnkgfHwgJy8nfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWxlc2l6ZVwiPiR7ZmlsZS5maWxlU2l6ZSAhPT0gdW5kZWZpbmVkID8gYnl0ZXMoZmlsZS5maWxlU2l6ZSkgOiAnLSd9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdGVkLWZpbGVcIj5cbiAgICAgICAgICAgIDxpcm9uLWljb24gaWNvbj1cImNoZWNrXCIgP2hpZGRlbj1cIiR7IWZpbGUuc2VsZWN0ZWR9XCI+PC9pcm9uLWljb24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYFxuICB9XG5cbiAgX2dldEljb24oZmlsZSkge1xuICAgIGxldCBleHQgPSBmaWxlLmlzRGlyZWN0b3J5ID8gJ2ZvbGRlcicgOiAoZmlsZS5maWxlbmFtZSB8fCAnJykuc3BsaXQoJy4nKS5wb3AoKTtcbiAgICBsZXQgaWNvbiA9IHRoaXMuaWNvbk1hcFtleHRdO1xuICAgIGlmKCBpY29uICkgcmV0dXJuIGljb247XG4gICAgcmV0dXJuIFVOS05PV05fSUNPTjtcbiAgfVxuXG4gIF9vbkl0ZW1DbGlja2VkKGUpIHtcbiAgICBsZXQgaW5kZXggPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdpbmRleCcpKTtcbiAgICBcbiAgICAvLyBzdHVwaWQgaGFjaywgbGV0IGh0bWwgYWx3YXlzIHNjb3BlcyBldmVudHMgdG8gcmVuZGVyIGhvc3RcbiAgICBsZXQgJHRoaXMgPSBlLmN1cnJlbnRUYXJnZXQuY29udGV4dDtcbiAgICBsZXQgZmlsZSA9ICR0aGlzLmZpbGVzW2luZGV4XTtcblxuICAgIGlmKCBmaWxlLmlzRGlyZWN0b3J5ICkge1xuICAgICAgJHRoaXMuX2Jyb3dzZURpcmVjdG9yeShmaWxlWydAaWQnXS5yZXBsYWNlKCR0aGlzLnNlbGVjdGVkUmVjb3JkWydAaWQnXSwgJycpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJHRoaXMuc2VsZWN0ZWRGaWxlID0gZmlsZS5mdWxsVXJsO1xuICAgIH1cbiAgfVxuXG4gIF9vbklucHV0S2V5dXAoZSkge1xuICAgIGxldCB0ZXh0ID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuXG4gICAgaWYoIHRoaXMuX2F1dG9jb21wbGV0ZVRpbWVyICkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2F1dG9jb21wbGV0ZVRpbWVyKTtcbiAgICB9XG4gICAgdGhpcy5fYXV0b2NvbXBsZXRlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2F1dG9jb21wbGV0ZVRpbWVyID0gbnVsbDtcbiAgICAgIHRoaXMuX3R5cGVhaGVhZFNlYXJjaCh0ZXh0KTtcbiAgICB9LCAzMDApO1xuICB9XG5cbiAgYXN5bmMgX3R5cGVhaGVhZFNlYXJjaCh0ZXh0KSB7XG4gICAgdGhpcy50eXBlYWhlYWRTZWFyY2hUZXh0ID0gdGV4dDtcbiAgICBpZiggdGV4dCA9PT0gJycgKSB7XG4gICAgICB0aGlzLmZpbGVzID0gW107XG4gICAgICB0aGlzLl9icm93c2VEaXJlY3RvcnkoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm1vZGUgPSAnc2VhcmNoJztcbiAgICB0aGlzLmxpbmVIZWlnaHQgPSA1MjtcbiAgICB0aGlzLnNlbGVjdGVkRmlsZSA9ICcnO1xuXG4gICAgbGV0IHNlYXJjaERvYyA9IHtcbiAgICAgIHRleHQsXG4gICAgICBmaWx0ZXJzIDoge1xuICAgICAgICAnY29sbGVjdGlvbklkJyA6IHtcbiAgICAgICAgICB0eXBlOiAna2V5d29yZCcsXG4gICAgICAgICAgdmFsdWU6IFt0aGlzLnNlbGVjdGVkUmVjb3JkLmNvbGxlY3Rpb25JZF0sXG4gICAgICAgICAgb3A6ICdvcidcbiAgICAgICAgfSxcbiAgICAgICAgJ0BpZCcgOiB7XG4gICAgICAgICAgdHlwZSA6ICdwcmVmaXgnLFxuICAgICAgICAgIHZhbHVlIDogdGhpcy5zZWxlY3RlZFJlY29yZFsnQGlkJ11cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNvcnQgOiBudWxsLFxuICAgICAgbGltaXQ6IDk5OTksXG4gICAgICBvZmZzZXQ6IDAsXG4gICAgICBmYWNldHM6IHt9LFxuICAgICAgdGV4dEZpZWxkcyA6IFsnZmlsZW5hbWUnXVxuICAgIH1cblxuICAgIGxldCByZXNwID0gYXdhaXQgdGhpcy5SZWNvcmRNb2RlbC50eXBlYWhlYWRTZWFyY2goc2VhcmNoRG9jLCB7YWxsUmVjb3JkczogdHJ1ZX0pO1xuICAgIGlmKCB0aGlzLnR5cGVhaGVhZFNlYXJjaFRleHQgIT09IHRleHQgKSByZXR1cm47XG5cbiAgICB0aGlzLnNldEZpbGVzKHJlc3AucGF5bG9hZC5yZXN1bHRzLCBmYWxzZSk7XG4gIH1cblxuICBhc3luYyBfYnJvd3NlRGlyZWN0b3J5KGRpcikge1xuICAgIGlmKCB0aGlzLm1vZGUgPT09ICdicm93c2UnICYmIHRoaXMuY3VycmVudERpciA9PT0gZGlyICkgcmV0dXJuO1xuXG4gICAgdGhpcy5tb2RlID0gJ2Jyb3dzZSc7XG4gICAgdGhpcy5saW5lSGVpZ2h0ID0gNDU7XG4gICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2hJbnB1dCcpLnZhbHVlID0gJyc7XG4gICAgdGhpcy5zZWxlY3RlZEZpbGUgPSAnJztcblxuICAgIGlmKCAhZGlyICkge1xuICAgICAgaWYoIHRoaXMuY3VycmVudERpciApIGRpciA9IHRoaXMuY3VycmVudERpcjtcbiAgICAgIGVsc2UgZGlyID0gJy8nO1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudERpciA9IGRpcjtcblxuICAgIGxldCBzZWFyY2hEb2MgPSB7XG4gICAgICBmaWx0ZXJzIDoge1xuICAgICAgICAvLyAnY29sbGVjdGlvbklkJyA6IHtcbiAgICAgICAgLy8gICB0eXBlOiAna2V5d29yZCcsXG4gICAgICAgIC8vICAgdmFsdWU6IFt0aGlzLnNlbGVjdGVkUmVjb3JkLmNvbGxlY3Rpb25JZF0sXG4gICAgICAgIC8vICAgb3A6ICdvcidcbiAgICAgICAgLy8gfSxcbiAgICAgICAgJ2RpcmVjdFBhcmVudCcgOiB7XG4gICAgICAgICAgdHlwZSA6ICdrZXl3b3JkJyxcbiAgICAgICAgICB2YWx1ZSA6IFt0aGlzLnNlbGVjdGVkUmVjb3JkWydAaWQnXSt0aGlzLmN1cnJlbnREaXIucmVwbGFjZSgvXFwvJC8sICcnKV0sXG4gICAgICAgICAgb3AgOiAnb3InXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzb3J0IDogbnVsbCxcbiAgICAgIGxpbWl0OiA5OTk5LFxuICAgICAgb2Zmc2V0OiAwLFxuICAgICAgZmFjZXRzOiB7fSxcbiAgICAgIHRleHRGaWVsZHMgOiBbXVxuICAgIH1cblxuICAgIGxldCByZXNwID0gYXdhaXQgdGhpcy5SZWNvcmRNb2RlbC50eXBlYWhlYWRTZWFyY2goc2VhcmNoRG9jLCB7ZGVidWc6IHRydWUsIGFsbFJlY29yZHM6IHRydWV9KTtcbiAgICB0aGlzLnNldEZpbGVzKHJlc3AucGF5bG9hZC5yZXN1bHRzKTtcbiAgfVxuXG4gIHNldEZpbGVzKGZpbGVzLCBzb3J0PXRydWUpIHtcbiAgICBmaWxlcyA9IGZpbGVzLm1hcChmaWxlID0+IHtcbiAgICAgIGZpbGUuZGlyZWN0b3J5ID0gZmlsZS5kaXJlY3RQYXJlbnQucmVwbGFjZSh0aGlzLnNlbGVjdGVkUmVjb3JkWydAaWQnXSwgJycpO1xuICAgICAgaWYoIGZpbGVbJ0B0eXBlJ10uaW5jbHVkZXMoJ2h0dHA6Ly9mZWRvcmEuaW5mby9kZWZpbml0aW9ucy92NC9yZXBvc2l0b3J5I0JpbmFyeScpICkge1xuICAgICAgICBmaWxlLmlzRmlsZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaWxlLmlzRGlyZWN0b3J5ID0gdHJ1ZTtcbiAgICAgICAgZmlsZS5maWxlbmFtZSA9IGZpbGVbJ0BpZCddLnNwbGl0KCcvJykucG9wKCk7XG4gICAgICB9XG4gICAgICBmaWxlLmZ1bGxVcmwgPSB0aGlzLl9nZXRGdWxsRmlsZVVybChmaWxlKTtcbiAgICAgIGZpbGUuc2VsZWN0ZWQgPSAoZmlsZS5mdWxsVXJsID09PSB0aGlzLnNlbGVjdGVkRmlsZSk7XG4gICAgICByZXR1cm4gZmlsZTtcbiAgICB9KTtcblxuICAgIGlmKCBzb3J0ICkge1xuICAgICAgZmlsZXMuc29ydCgoYSxiKSA9PiBhLmZpbGVuYW1lLnRvTG93ZXJDYXNlKCkgPiBiLmZpbGVuYW1lLnRvTG93ZXJDYXNlKCkgPyAxIDogLTEpO1xuICAgIH1cblxuICAgIHRoaXMuZmlsZXMgPSBmaWxlcztcbiAgfVxuXG4gIF9nZXRGdWxsRmlsZVVybChmaWxlKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArICcvZmNyZXBvL3Jlc3QnICsgZmlsZVsnQGlkJ107XG4gIH1cblxuICBfb25DbGVhclNlYXJjaENsaWNrZWQoKSB7XG4gICAgdGhpcy5fYnJvd3NlRGlyZWN0b3J5KHRoaXMuY3VycmVudERpcik7XG4gIH1cblxuICBfb25CcmVhZGNydW1iQ2xpY2tlZChlKSB7XG4gICAgdGhpcy5fYnJvd3NlRGlyZWN0b3J5KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RpcicpKTtcbiAgfVxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYXBwLWZzLXZpZXdlcicsIEFwcEZzVmlld2VyKTtcbiIsImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXIoKSB7IFxucmV0dXJuIGh0bWxgXG5cbjxzdHlsZT5cbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHotaW5kZXg6IDEwMDAwO1xuICAgIHRvcDogMDtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbGVmdDogMDtcbiAgICAvKiBhbmltYXRpb246IDMwMG1zIGxpbmVhciBmcy12aWV3ZXItYW5pbWF0ZS1pbjsgKi9cbiAgfVxuXG4gIEBrZXlmcmFtZXMgZnMtdmlld2VyLWFuaW1hdGUtaW4ge1xuICAgIDAlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcbiAgICAgIG9wYWNpdHk6IDAuNVxuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICBvcGFjaXR5OiAxXG4gICAgfVxuICB9XG5cbiAgLmxheW91dCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbGVmdDogMDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgfVxuXG4gIC5jb250ZW50IHtcbiAgICBtYXJnaW46IDUwcHggMDtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxMDBweCk7XG4gICAgd2lkdGg6IDcwMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1cGVyLWxpZ2h0LWJhY2tncm91bmQtY29sb3IpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuXG4gIGgyIHtcbiAgICBtYXJnaW46IDA7XG4gIH1cblxuICAuY29udGVudC1ib2R5IHtcbiAgICBmbGV4OiAxO1xuICAgIHBhZGRpbmc6IDIwcHg7XG4gIH1cblxuICAuaGVhZGVyLWxheW91dCB7XG4gICAgY29sb3I6IHZhcigtLWRlZmF1bHQtcHJpbWFyeS1jb2xvcik7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQtYmFja2dyb3VuZC1jb2xvcik7XG4gICAgcGFkZGluZzogMjBweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICB9XG5cbiAgLmhlYWRlci1pbWFnZSB7XG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICB9XG5cbiAgLmhlYWRlci1pbWFnZSAuaW1nLCAuaGVhZGVyLWltYWdlIGlyb24taWNvbltpY29uPVwiZmluLWljb25zOnZhcmlvdXMtb3V0bGluZS1zdGFja2VkXCJdIHtcbiAgICBoZWlnaHQ6IDEwMHB4O1xuICAgIHdpZHRoOiAxMDBweDtcbiAgfVxuXG4gICNzZWFyY2hJbnB1dCB7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGZsZXg6IDE7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBwYWRkaW5nOiAwIDVweDtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgaGVpZ2h0OiA0NXB4O1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgYm9yZGVyLXJhZGl1czogMDtcbiAgfVxuXG4gIC5yb3cge1xuICAgIC8qIGhlaWdodDogMTAwJTsgKi9cbiAgfVxuXG4gIC52cy1yb3dbaG92ZXJdIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1saWdodC15ZWxsb3cpO1xuICB9XG5cbiAgLnJvdyB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWxpZ2h0LXllbGxvdyk7ICovXG4gIH1cblxuICAucm93ID4gZGl2IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG1hcmdpbjogMCA4cHg7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLW1lZGl1bS1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgfVxuXG4gIC5yb3dbc2VsZWN0ZWRdIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1saWdodC15ZWxsb3cpO1xuICB9XG5cbiAgLnJvdyAuZGlyZWN0b3J5IHtcbiAgICBmb250LXNpemU6IDExcHg7IFxuICAgIGxpbmUtaGVpZ2h0OiAxMnB4OyBcbiAgICBjb2xvcjogIzg4ODtcbiAgICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gIH1cblxuICAucm93IC5pY29uIHtcbiAgICB3aWR0aDogMzBweDtcbiAgfVxuXG4gIC5yb3cgLmZpbGVzaXplIHtcbiAgICB3aWR0aDogNzVweDtcbiAgfVxuXG4gIC5yb3cgLmljb24sIC5yb3cgLmZpbGVzaXplIHtcbiAgICBwYWRkaW5nOiA2cHggMDtcbiAgfVxuXG4gIC8qIC5yb3cgLmZpbGUge1xuICAgIGZsZXg6IDE7XG4gIH0gKi9cblxuICAucm93IC5kaXJlY3RvcnksIC5yb3cgLmZpbGVuYW1lIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIH1cblxuICAucm93IC5zZWxlY3RlZC1maWxlIHtcbiAgICB3aWR0aDogMjVweDtcbiAgfVxuXG4gIGJ1dHRvbi5zZWFyY2gge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIGNvbG9yOiB2YXIoLS1kZWZhdWx0LXNlY29uZGFyeS1jb2xvcik7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiA1cHg7XG4gICAgaGVpZ2h0OiA0NXB4O1xuICB9XG5cbiAgaXJvbi1pY29uW2ljb249XCJob21lXCJdIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgY29sb3I6IHZhcigtLWRlZmF1bHQtc2Vjb25kYXJ5LWNvbG9yKTtcbiAgfVxuXG4gIGlyb24taWNvbltpY29uPVwiY2hldnJvbi1yaWdodFwiXSB7XG4gICAgY29sb3I6IHZhcigtLW1lZGl1bS1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgfVxuXG4gIGlyb24taWNvbltpY29uPVwiZm9sZGVyXCJdIHtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gIH1cbiAgaXJvbi1pY29uW2ljb249XCJmaW4taWNvbnM6aW1hZ2Utc29saWRcIl0ge1xuICAgIGNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1nb2xkKTtcbiAgfVxuICBpcm9uLWljb25baWNvbj1cImZpbi1pY29uczp2aWRlby1zb2xpZFwiXSB7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLXBpbm90KTtcbiAgfVxuICBpcm9uLWljb25baWNvbj1cImZpbi1pY29uczpzb3VuZC1zb2xpZFwiXSB7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLXJlZGJ1ZCk7XG4gIH1cbiAgaXJvbi1pY29uW2ljb249XCJmaW4taWNvbnM6dGV4dC1zb2xpZFwiXSB7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLXB1dGFoLWNyZWVrKTtcbiAgfVxuICBpcm9uLWljb25baWNvbj1cImZpbi1pY29uczpzcHJlYWRzaGVldC1zb2xpZFwiXSB7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLXF1YWQpO1xuICB9XG4gIGlyb24taWNvbltpY29uPVwiZmluLWljb25zOnBkZi1zb2xpZFwiXSB7XG4gICAgY29sb3I6IHZhcigtLWRvdWJsZS1kZWNrZXIpO1xuICB9XG4gIGlyb24taWNvbltpY29uPVwiZmluLWljb25zOmNvbXByZXNzZWQtc29saWRcIl0ge1xuICAgIGNvbG9yOiB2YXIoLS1jb2xvci1wb3BweSk7XG4gIH1cbiAgaXJvbi1pY29uW2ljb249XCJmaW4taWNvbnM6ZmlsZS1zb2xpZFwiXSB7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLWdyZXkpO1xuICB9XG4gIGlyb24taWNvbltpY29uPVwiY2hlY2tcIl0ge1xuICAgIGNvbG9yOiB2YXIoLS1kZWZhdWx0LXNlY29uZGFyeS1jb2xvcik7XG4gIH1cblxuICAudGFibGUtaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZvbnQtc2l6ZTogdmFyKC0tZnMtcCk7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLWdyZXkpO1xuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICBwYWRkaW5nOiAxMHB4IDA7XG4gIH1cblxuICAudGFibGUtaGVhZGVyID4gZGl2IHtcbiAgICBwYWRkaW5nLWxlZnQ6IDVweDtcbiAgfVxuXG4gIC5icmVhZGNydW1icyB7XG4gICAgY29sb3I6IHZhcigtLWRlZmF1bHQtcHJpbWFyeS1jb2xvcik7XG4gIH1cblxuICAuYnJlYWRjcnVtYnMgLmJyZWFkY3J1bWIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gIGFwcC12aXJ0dWFsLXNjcm9sbGVyIHtcbiAgICBmbGV4OiAxO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICB9XG5cbiAgLmJyZWFrIHtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICAgIGJvcmRlci1ib3R0b206IDFweCBkYXNoZWQgdmFyKC0tbWVkaXVtLWJhY2tncm91bmQtY29sb3IpO1xuICB9XG5cbiAgLmZvb3RlciB7XG4gICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cblxuICAuY2FuY2VsLWJ0biB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tZGVmYXVsdC1zZWNvbmRhcnktY29sb3IpO1xuICAgIGNvbG9yOiB2YXIoLS1kZWZhdWx0LXByaW1hcnktY29sb3IpO1xuICAgIHBhZGRpbmc6IDZweCAxMHB4O1xuICAgIG1hcmdpbjogMCAxNXB4IDAgMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gIC5kb3dubG9hZC1idG4ge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWRlZmF1bHQtc2Vjb25kYXJ5LWNvbG9yKTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kZWZhdWx0LXNlY29uZGFyeS1jb2xvcik7XG4gICAgY29sb3I6IHZhcigtLWRlZmF1bHQtcHJpbWFyeS1jb2xvcik7XG4gICAgcGFkZGluZzogNnB4IDEwcHg7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIH1cbiAgLyogLmRvd25sb2FkLWJ1dHRvbjp2aXNpdGVkIHtcbiAgICBjb2xvcjogdmFyKC0tZGVmYXVsdC1wcmltYXJ5LWNvbG9yKTtcbiAgfSAqL1xuXG4gIGFbZGlzYWJsZWRdIHtcbiAgICBvcGFjaXR5OiAwLjU7XG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgfVxuXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xuICAgIC5jb250ZW50IHtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGZsZXg6IDE7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGhlaWdodDogY2FsYygxMDB2aCk7XG4gICAgfVxuICB9XG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPVwibGF5b3V0XCI+XG48ZGl2IGNsYXNzPVwiY29udGVudFwiPlxuXG4gIFxuICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItbGF5b3V0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWltYWdlXCI+XG4gICAgICAgIDxpcm9uLWljb24gaWNvbj1cImZpbi1pY29uczp2YXJpb3VzLW91dGxpbmUtc3RhY2tlZFwiID9oaWRkZW49XCIke3RoaXMudGh1bWJuYWlsfVwiPjwvaXJvbi1pY29uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW1nXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHt0aGlzLnRodW1ibmFpbH0pOyBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyOyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1wiID9oaWRkZW49XCIkeyF0aGlzLnRodW1ibmFpbH1cIiA+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgc3R5bGU9XCJmbGV4OjFcIj5cbiAgICAgICAgPGgyPiR7dGhpcy50aXRsZX08L2gyPlxuICAgICAgICA8ZGl2PiR7dGhpcy5maWxlcy5sZW5ndGh9IGZpbGVzPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4XCI+XG4gICAgICAgICAgPGlucHV0IGlkPVwic2VhcmNoSW5wdXRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIEZpbGVzXCIgQGtleXVwPVwiJHt0aGlzLl9vbklucHV0S2V5dXB9XCIgLz5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2VhcmNoXCI+XG4gICAgICAgICAgICA8aXJvbi1pY29uIGljb249XCIke3RoaXMubW9kZSA9PT0gJ3NlYXJjaCcgPyAnY2xvc2UnIDogJ2Zpbi1pY29uczpzZWFyY2gnfVwiIEBjbGljaz1cIiR7dGhpcy5fb25DbGVhclNlYXJjaENsaWNrZWR9XCI+PC9pcm9uLWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGVudC1ib2R5XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYnJlYWRjcnVtYnNcIj5cbiAgICAgICAgPGlyb24taWNvbiBpY29uPVwiaG9tZVwiIEBjbGljaz1cIiR7dGhpcy5fb25CcmVhZGNydW1iQ2xpY2tlZH1cIiBkaXI9XCIvXCI+PC9pcm9uLWljb24+XG4gICAgICAgICR7dGhpcy5fcmVuZGVyQnJlYWRjcnVtYnMoKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiYnJlYWtcIj48L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cInRhYmxlLWhlYWRlclwiPlxuICAgICAgICA8ZGl2IHN0eWxlPVwiZmxleDoxXCI+TmFtZTwvZGl2PiBcbiAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMTVweFwiPlNpemU8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGFwcC12aXJ0dWFsLXNjcm9sbGVyIGl0ZW0taGVpZ2h0PVwiJHt0aGlzLmxpbmVIZWlnaHR9XCIgLml0ZW1zPVwiJHt0aGlzLmZpbGVzfVwiPjwvYXBwLXZpcnR1YWwtc2Nyb2xsZXI+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXJcIj5cbiAgICAgICAgPGRpdiBzdHlsZT1cImZsZXg6IDFcIj48L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2FuY2VsLWJ0blwiIEBjbGljaz1cIiR7dGhpcy5oaWRlfVwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YSBjbGFzcz1cImRvd25sb2FkLWJ0blwiID9kaXNhYmxlZD1cIiR7IXRoaXMuc2VsZWN0ZWRGaWxlfVwiIGhyZWY9XCIke3RoaXMuc2VsZWN0ZWRGaWxlfVwiIHRhcmdldD1cIl9ibGFua1wiPkRvd25sb2FkPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiA8IS0tIGZvb3RlciAtLT5cbiAgICA8L2Rpdj5cblxuXG48L2Rpdj4gPCEtLSBjb250ZW50IC0tPlxuPC9kaXY+IDwhLS0gbGF5b3V0IC0tPlxuXG5gO30iLCJpbXBvcnQgeyBMaXRFbGVtZW50IH0gZnJvbSBcImxpdFwiO1xuXG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2FwcC1pbWFnZS12aWV3ZXItbGlnaHRib3gudHBsLmpzXCI7XG5cbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbmltcG9ydCBcImxlYWZsZXRcIjtcbmltcG9ydCBcImxlYWZsZXQtaWlpZlwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBJbWFnZVZpZXdlciBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpLndpdGgoXG4gIExpdENvcmtVdGlsc1xuKSB7XG4gIHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJvdW5kczogeyB0eXBlOiBBcnJheSB9LFxuICAgICAgbWF4SW1hZ2VTaXplOiB7IHR5cGU6IE51bWJlciB9LFxuICAgICAgbWVkaWE6IHsgdHlwZTogT2JqZWN0IH0sXG4gICAgICB2aXNpYmxlOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIGxvYWRpbmc6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5ib3VuZHMgPSBudWxsO1xuICAgIHRoaXMubWF4SW1hZ2VTaXplID0gMjA0ODtcbiAgICB0aGlzLm1lZGlhID0ge307XG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4gICAgICBpZiAodGhpcy52aXNpYmxlICYmIGUud2hpY2ggPT09IDI3KSB0aGlzLmhpZGUoKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMuX29uUG9wU3RhdGUuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLl9pbmplY3RNb2RlbChcIkFwcFN0YXRlTW9kZWxcIiwgXCJNZWRpYU1vZGVsXCIpO1xuICB9XG5cbiAgYXN5bmMgZmlyc3RVcGRhdGVkKCkge1xuICAgIHRoaXMucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMpO1xuXG4gICAgY29uc3Qgc2FmZUNvdmVyTm9kZSA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI3NhZmVDb3ZlclwiKTtcbiAgICBpZiAoc2FmZUNvdmVyTm9kZSkge1xuICAgICAgdGhpcy5zaGFkb3dSb290LnJlbW92ZUNoaWxkKHNhZmVDb3Zlck5vZGUpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzYWZlQ292ZXJOb2RlKTtcbiAgICB9XG5cbiAgICBsZXQgc2VsZWN0ZWRSZWNvcmQgPSBhd2FpdCB0aGlzLkFwcFN0YXRlTW9kZWwuZ2V0U2VsZWN0ZWRSZWNvcmQoKTtcbiAgICBpZiAoc2VsZWN0ZWRSZWNvcmQgKSB7XG4gICAgICB0aGlzLl9vblNlbGVjdGVkUmVjb3JkVXBkYXRlKHNlbGVjdGVkUmVjb3JkKTtcbiAgICB9XG4gIH1cblxuICBfb25Qb3BTdGF0ZShlKSB7XG4gICAgaWYgKCB0aGlzLkFwcFN0YXRlTW9kZWwuc3RvcmUuZGF0YS5zaG93TGlnaHRib3ggKSB7XG4gICAgICB0aGlzLkFwcFN0YXRlTW9kZWwuc2V0KHsgc2hvd0xpZ2h0Ym94OiBmYWxzZSB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25BcHBTdGF0ZVVwZGF0ZVxuICAgKiBAZGVzY3JpcHRpb24gYm91bmQgdG8gQXBwU3RhdGVNb2RlbCBhcHAtc3RhdGUtdXBkYXRlIGV2ZW50XG4gICAqL1xuICBfb25BcHBTdGF0ZVVwZGF0ZShlKSB7XG4gICAgaWYoIHRoaXMuQXBwU3RhdGVNb2RlbC5sb2NhdGlvbi5wYWdlICE9PSAnaXRlbScgKSB7XG4gICAgICB0aGlzLl9yZXNldCgpO1xuICAgICAgaWYgKHRoaXMudmlzaWJsZSB8fCBlLnNob3dMaWdodGJveCB8fCB0aGlzLkFwcFN0YXRlTW9kZWwuc3RvcmU/LmRhdGE/LnNob3dMaWdodGJveCkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9IFxuXG4gICAgaWYgKGUuc2hvd0xpZ2h0Ym94ICYmICF0aGlzLnZpc2libGUpIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH0gZWxzZSBpZiAoIWUuc2hvd0xpZ2h0Ym94ICYmIHRoaXMudmlzaWJsZSkge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uU2VsZWN0ZWRSZWNvcmRVcGRhdGVcbiAgICogQGRlc2NyaXB0aW9uIGZyb20gQXBwU3RhdGVNb2RlbCwgY2FsbGVkIHdoZW4gYSByZWNvcmRzIG1lZGlhIGlzIHNlbGVjdGVkXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtZWRpYVxuICAgKi9cbiAgX29uU2VsZWN0ZWRSZWNvcmRVcGRhdGUoZSkge1xuICAgIGlmKCAhZSApIHJldHVybjtcbiAgICBsZXQge2dyYXBoLCBjbGllbnRNZWRpYSwgc2VsZWN0ZWRNZWRpYSwgc2VsZWN0ZWRNZWRpYVBhZ2V9ID0gZTtcblxuICAgIGxldCBjdXJyZW50TWVkaWEgPSB0aGlzLnJlY29yZD8uc2VsZWN0ZWRNZWRpYSB8fCB7fTtcbiAgICBpZiggY3VycmVudE1lZGlhWydAaWQnXSA9PT0gc2VsZWN0ZWRNZWRpYVsnQGlkJ10gJiZcbiAgICAgIHNlbGVjdGVkTWVkaWFQYWdlID09PSB0aGlzLnJlY29yZD8uc2VsZWN0ZWRNZWRpYVBhZ2UgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5yZWNvcmQgPSBlO1xuICAgIGlmICh0aGlzLnZpc2libGUpIHRoaXMucmVuZGVyQ2FudmFzKCk7XG4gIH1cbiAgXG4gIF9yZXNldCgpIHtcbiAgICB0aGlzLm1lZGlhID0ge307XG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5yZW5kZXJlZE1lZGlhID0gbnVsbDtcbiAgICB0aGlzLnJlY29yZCA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzaG93XG4gICAqL1xuICBhc3luYyBzaG93KCkge1xuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIC8vIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjc2FmZUNvdmVyJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZmluLWFwcFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgLy8gd2luZG93LnNjcm9sbFRvKDAsIDApO1xuXG4gICAgdGhpcy5yZW5kZXJDYW52YXMoKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2XCIpLl9yZXNpemUoKTtcbiAgICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI25hdlwiKS5zZXRGb2N1cygpO1xuICAgIH0sIDI1KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGhpZGVcbiAgICovXG4gIGFzeW5jIGhpZGUoKSB7XG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5BcHBTdGF0ZU1vZGVsLnNldCh7IHNob3dMaWdodGJveDogZmFsc2UgfSk7XG4gICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgLy8gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNzYWZlQ292ZXInKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZmluLWFwcFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX2xvYWRJbWFnZVxuICAgKiBAZGVzY3JpcHRpb24gcHJlbG9hZCBpbWFnZSBhbmQgc2V0IGJvdW5kcyB0byBpbWFnZSBkaW1lbnNpb25zXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgdXJsIG9mIGltYWdlIHRvIGxvYWRcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IHJlc29sdmVzIHdoZW4gaW1hZ2UgaXMgbG9hZGVkIGFuZCBib3VuZHMgYXJyYXkgaGFzIGJlZW4gc2V0XG4gICAqL1xuICAvLyAgX2xvYWRJbWFnZSh1cmwpIHtcbiAgLy8gICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAvLyAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuXG4gIC8vICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAvLyAgICAgICBsZXQgcmVzID0gW2ltZy5uYXR1cmFsSGVpZ2h0LCBpbWcubmF0dXJhbFdpZHRoXTtcbiAgLy8gICAgICAgdGhpcy5ib3VuZHMgPSBbWzAsMF0sIHJlc107XG4gIC8vICAgICAgIHJlc29sdmUoKTtcbiAgLy8gICAgIH07XG5cbiAgLy8gICAgIGltZy5zcmMgPSB1cmw7XG4gIC8vICAgfSk7XG4gIC8vIH1cblxuICAvKipcbiAgICogQG1ldGhvZCByZW5kZXJDYW52YXNcbiAgICogQGRlc2NyaXB0aW9uIHJlbmRlciBsZWFmbGV0IGNhbnZhcyBiYXNlZCBvbiBmZWRvcmEgaWRcbiAgICpcbiAgICovXG4gIGFzeW5jIHJlbmRlckNhbnZhcygpIHtcbiAgICBpZiggIXRoaXMucmVjb3JkICkgcmV0dXJuO1xuXG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICBsZXQge2dyYXBoLCBjbGllbnRNZWRpYSwgc2VsZWN0ZWRNZWRpYSwgc2VsZWN0ZWRNZWRpYVBhZ2V9ID0gdGhpcy5yZWNvcmQ7XG5cbiAgICBpZiAoc2VsZWN0ZWRNZWRpYVtcIkBpZFwiXSA9PT0gdGhpcy5yZW5kZXJlZE1lZGlhPy5bXCJAaWRcIl0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcGFnZXMgPSBbXTtcblxuICAgIC8vIHByaW9yaXRpemUgaW1hZ2VsaXN0LCB0aGVuIHBkZlxuICAgIGxldCBpbWFnZUxpc3QgPSAoY2xpZW50TWVkaWEubWVkaWFHcm91cHMgfHwgW10pLmZpbHRlcihtID0+IG1bJ0BzaG9ydFR5cGUnXS5pbmNsdWRlcygnSW1hZ2VMaXN0JykpPy5bMF07XG4gICAgaWYoIGltYWdlTGlzdD8uY2xpZW50TWVkaWE/LnBhZ2VzICkge1xuICAgICAgcGFnZXMgPSBpbWFnZUxpc3QuY2xpZW50TWVkaWEucGFnZXM7XG4gICAgfVxuXG4gICAgaWYoICFwYWdlcy5sZW5ndGggKSB7XG4gICAgICBsZXQgcGRmID0gKGNsaWVudE1lZGlhLm1lZGlhR3JvdXBzIHx8IFtdKS5maWx0ZXIobSA9PiBtLmNsaWVudE1lZGlhLnBkZik/LlswXTtcbiAgICAgIGlmKCBwZGY/LmNsaWVudE1lZGlhPy5wYWdlcyApIHtcbiAgICAgICAgcGFnZXMgPSBwZGYuY2xpZW50TWVkaWEucGFnZXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoICFwYWdlcy5sZW5ndGggJiYgc2VsZWN0ZWRNZWRpYS5jbGllbnRNZWRpYT8ucGFnZXMgKSB7XG4gICAgICBwYWdlcyA9IHNlbGVjdGVkTWVkaWEuY2xpZW50TWVkaWEucGFnZXM7XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJlZE1lZGlhID0gcGFnZXM/LmZpbHRlcihtZWRpYSA9PiBtZWRpYS51aVBvc2l0aW9uID09PSBzZWxlY3RlZE1lZGlhUGFnZSlbMF07XG4gICAgLy8gb24gZmlyc3QgcGFnZSBsb2FkLCBzZWxlY3RlZE1lZGlhUGFnZSBpcyAtMSwgc28ganVzdCBzaG93IGZpcnN0IHBhZ2UgZnJvbSBjbGllbnRNZWRpYS5pbWFnZXNcbiAgICBpZiggIXRoaXMucmVuZGVyZWRNZWRpYSApIHtcbiAgICAgIHRoaXMucmVuZGVyZWRNZWRpYSA9IHNlbGVjdGVkTWVkaWEuY2xpZW50TWVkaWEuaW1hZ2VzO1xuICAgIH1cblxuICAgIGlmICghdGhpcy52aWV3ZXIpIHtcbiAgICAgIHRoaXMudmlld2VyID0gTC5tYXAodGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjdmlld2VyXCIpLCB7XG4gICAgICAgIGNlbnRlcjogWzAsIDBdLFxuICAgICAgICBjcnM6IEwuQ1JTLlNpbXBsZSxcbiAgICAgICAgem9vbTogMFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY3VycmVudExheWVyKSB7XG4gICAgICB0aGlzLnZpZXdlci5yZW1vdmVMYXllcih0aGlzLmN1cnJlbnRMYXllcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVuZGVyZWRNZWRpYS50aWxlZCkge1xuICAgICAgbGV0IHRpbGVkVXJsID0gdGhpcy5yZW5kZXJlZE1lZGlhLnRpbGVkLmlpaWYgKyBcIi9pbmZvLmpzb25cIjtcbiAgICAgIHRoaXMuY3VycmVudExheWVyID0gTC50aWxlTGF5ZXIuaWlpZih0aWxlZFVybCk7XG4gICAgICB0aGlzLmN1cnJlbnRMYXllci5nZXRUaWxlVXJsID0gZnVuY3Rpb24oY29vcmRzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgICAgeCA9IGNvb3Jkcy54LFxuICAgICAgICAgIHkgPSAoY29vcmRzLnkpLFxuICAgICAgICAgIHpvb20gPSBfdGhpcy5fZ2V0Wm9vbUZvclVybCgpLFxuICAgICAgICAgIHNjYWxlID0gTWF0aC5wb3coMiwgX3RoaXMubWF4TmF0aXZlWm9vbSAtIHpvb20pLFxuICAgICAgICAgIHRpbGVCYXNlU2l6ZSA9IF90aGlzLm9wdGlvbnMudGlsZVNpemUgKiBzY2FsZSxcbiAgICAgICAgICBtaW54ID0gKHggKiB0aWxlQmFzZVNpemUpLFxuICAgICAgICAgIG1pbnkgPSAoeSAqIHRpbGVCYXNlU2l6ZSksXG4gICAgICAgICAgbWF4eCA9IE1hdGgubWluKG1pbnggKyB0aWxlQmFzZVNpemUsIF90aGlzLngpLFxuICAgICAgICAgIG1heHkgPSBNYXRoLm1pbihtaW55ICsgdGlsZUJhc2VTaXplLCBfdGhpcy55KTtcbiAgICAgICAgXG4gICAgICAgIHZhciB4RGlmZiA9IChtYXh4IC0gbWlueCk7XG4gICAgICAgIHZhciB5RGlmZiA9IChtYXh5IC0gbWlueSk7XG5cbiAgICAgICAgLy8gQ2Fub25pY2FsIFVSSSBTeW50YXggZm9yIHYyXG4gICAgICAgIC8vIHZhciBzaXplID0gTWF0aC5jZWlsKHhEaWZmIC8gc2NhbGUpICsgJywnO1xuICAgICAgICAvLyBpZiAoX3RoaXMudHlwZSA9PT0gJ0ltYWdlU2VydmljZTMnKSB7XG4gICAgICAgIC8vICAgLy8gQ2Fubm9uaWNhbCBVUkkgU3ludGF4IGZvciB2M1xuICAgICAgICAvLyAgIHNpemUgPSBzaXplICsgTWF0aC5jZWlsKHlEaWZmIC8gc2NhbGUpO1xuICAgICAgICAvLyB9XG4gICAgICAgIGxldCBzaXplID0gTWF0aC5jZWlsKHhEaWZmIC8gc2NhbGUpICsgJywnICsgTWF0aC5jZWlsKHlEaWZmIC8gc2NhbGUpO1xuICAgIFxuICAgICAgICByZXR1cm4gTC5VdGlsLnRlbXBsYXRlKHRoaXMuX2Jhc2VVcmwsIEwuZXh0ZW5kKHtcbiAgICAgICAgICBmb3JtYXQ6IF90aGlzLm9wdGlvbnMudGlsZUZvcm1hdCxcbiAgICAgICAgICBxdWFsaXR5OiBfdGhpcy5xdWFsaXR5LFxuICAgICAgICAgIHJlZ2lvbjogW21pbngsIG1pbnksIHhEaWZmLCB5RGlmZl0uam9pbignLCcpLFxuICAgICAgICAgIHJvdGF0aW9uOiAwLFxuICAgICAgICAgIHNpemU6IHNpemVcbiAgICAgICAgfSwgdGhpcy5vcHRpb25zKSk7XG4gICAgICB9XG4gICAgICBcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGltYWdlID0gKHRoaXMucmVuZGVyZWRNZWRpYS5vcmlnaW5hbCAmJiAhdGhpcy5yZW5kZXJlZE1lZGlhLm9yaWdpbmFsLm1pc3NpbmcpID8gdGhpcy5yZW5kZXJlZE1lZGlhLm9yaWdpbmFsIDogdGhpcy5yZW5kZXJlZE1lZGlhLmxhcmdlO1xuICAgICAgaWYoICFpbWFnZSApIHJldHVybjtcblxuICAgICAgLy8gd2UgbWlnaHQgbm90IGhhdmUgc2l6ZVxuICAgICAgbGV0IHNpemUgPSBhd2FpdCB0aGlzLmdldEltYWdlU2l6ZShpbWFnZSk7XG5cbiAgICAgIC8vIGRldGVybWluZSB0aGUgcGl4ZWwgZGltZW5zaW9ucyBvZiB0aGUgaW1hZ2VcbiAgICAgIGxldCBpbWFnZVdpZHRoSW5QaXhlbHMgPSBwYXJzZUludChzaXplLndpZHRoKTtcbiAgICAgIGxldCBpbWFnZUhlaWdodEluUGl4ZWxzID0gcGFyc2VJbnQoc2l6ZS5oZWlnaHQpO1xuXG4gICAgICAvLyBjYWxjIHRoZSBwaXhlbCBkaW1lbnNpb25zIGJhc2VkIG9uIHRoZSBtYXAncyBjb250YWluZXIgc2l6ZSBhbmQgdGhlIGRlc2lyZWQgbWF4aW11bSBkaW1lbnNpb25zXG4gICAgICBsZXQgbWFwQ29udGFpbmVyID0gdGhpcy52aWV3ZXIuZ2V0Q29udGFpbmVyKCk7XG4gICAgICBsZXQgbWF4SW1hZ2VXaWR0aEluUGl4ZWxzID0gbWFwQ29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgICAgbGV0IG1heEltYWdlSGVpZ2h0SW5QaXhlbHMgPSBtYXBDb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAvLyBzY2FsZSB0aGUgaW1hZ2UgZGltZW5zaW9ucyBkb3duIGlmIHRoZXkgZXhjZWVkIHRoZSBtYXhpbXVtIGRpbWVuc2lvbnNcbiAgICAgIGlmIChpbWFnZVdpZHRoSW5QaXhlbHMgPiBtYXhJbWFnZVdpZHRoSW5QaXhlbHMgfHwgaW1hZ2VIZWlnaHRJblBpeGVscyA+IG1heEltYWdlSGVpZ2h0SW5QaXhlbHMpIHtcbiAgICAgICAgbGV0IHNjYWxlRmFjdG9yID0gTWF0aC5taW4obWF4SW1hZ2VXaWR0aEluUGl4ZWxzIC8gaW1hZ2VXaWR0aEluUGl4ZWxzLCBtYXhJbWFnZUhlaWdodEluUGl4ZWxzIC8gaW1hZ2VIZWlnaHRJblBpeGVscyk7XG4gICAgICAgIGltYWdlV2lkdGhJblBpeGVscyAqPSBzY2FsZUZhY3RvcjtcbiAgICAgICAgaW1hZ2VIZWlnaHRJblBpeGVscyAqPSBzY2FsZUZhY3RvcjtcbiAgICAgIH1cbiAgICAgIGxldCBpbWFnZUJvdW5kcyA9IFtbMCwgMF0sIFtpbWFnZUhlaWdodEluUGl4ZWxzLCBpbWFnZVdpZHRoSW5QaXhlbHNdXTtcblxuICAgICAgLy8gY2FsYyBjZW50ZXIgb2YgaW1hZ2VcbiAgICAgIGxldCBjZW50ZXJMYXQgPSAoaW1hZ2VCb3VuZHNbMF1bMF0gKyBpbWFnZUJvdW5kc1sxXVswXSkgLyAyO1xuICAgICAgbGV0IGNlbnRlckxvbiA9IChpbWFnZUJvdW5kc1swXVsxXSArIGltYWdlQm91bmRzWzFdWzFdKSAvIDI7XG5cbiAgICAgIC8vIHNldCB0aGUgdmlldyBvZiB0aGUgbWFwIHRvIGNlbnRlciBvbiB0aGUgaW1hZ2UgYW5kIGFwcGx5IGFuIGFwcHJvcHJpYXRlIHpvb20gbGV2ZWxcbiAgICAgIGxldCB6b29tTGV2ZWwgPSAwOyAvLyBBZGp1c3QgYXMgbmVlZGVkXG4gICAgICB0aGlzLnZpZXdlci5zZXRWaWV3KFtjZW50ZXJMYXQsIGNlbnRlckxvbl0sIHpvb21MZXZlbCk7XG5cbiAgICAgIHRoaXMuY3VycmVudExheWVyID0gTC5pbWFnZU92ZXJsYXkoaW1hZ2UudXJsLCBpbWFnZUJvdW5kcykuYWRkVG8odGhpcy52aWV3ZXIpO1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudExheWVyLmFkZFRvKHRoaXMudmlld2VyKTtcblxuICAgIC8vIGxpc3RlbiB0byBsb2FkIGV2ZW50IHRvIHN0b3Agc3Bpbm5lclxuICAgIGlmKCB0aGlzLnJlbmRlcmVkTWVkaWEudGlsZWQgKSB7XG4gICAgICB0aGlzLmN1cnJlbnRMYXllci5vbignbG9hZCcsIHRoaXMuX2xvYWRlZC5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGltYWdlRWxlbWVudCA9IHRoaXMuY3VycmVudExheWVyLmdldEVsZW1lbnQoKTtcbiAgICAgIGltYWdlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgdGhpcy5fbG9hZGVkLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIC8vIFRPRE8gdGhpcyBpcyBhIGhhY2sgdG8gZ2V0IHRoZSB2aWV3ZXIgdG8gcmVzaXplIGNvcnJlY3RseVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy52aWV3ZXIuaW52YWxpZGF0ZVNpemUoKTtcbiAgICB9LCAxMDAwKTtcblxuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcubGVhZmxldC1jb250cm9sLWF0dHJpYnV0aW9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIi5sZWFmbGV0LWNvbnRyb2wtY29udGFpbmVyXCIpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cblxuICBfbG9hZGVkKCkge1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIGxldCBzcGlubmVyID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5zcGlubmVyJyk7XG4gICAgaWYoIHNwaW5uZXIgKSBzcGlubmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cblxuICBnZXRJbWFnZVNpemUob3JpZ2luYWwpIHtcbiAgICBpZiggb3JpZ2luYWwuc2l6ZSApIHJldHVybiBvcmlnaW5hbC5zaXplO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltZy5zcmMgPSBvcmlnaW5hbC51cmw7XG4gICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICByZXNvbHZlKG9yaWdpbmFsLnNpemUgPSB7XG4gICAgICAgICAgaGVpZ2h0IDogaW1nLm5hdHVyYWxIZWlnaHQsXG4gICAgICAgICAgd2lkdGggOiBpbWcubmF0dXJhbFdpZHRoXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbkNsb3NlQ2xpY2tlZFxuICAgKiBAZGVzY3JpcHRpb24gYm91bmQgdG8gdmlldyBuYXYgY2xvc2UgZXZlbnRcbiAgICovXG4gIF9vbkNsb3NlQ2xpY2tlZCgpIHtcbiAgICB0aGlzLkFwcFN0YXRlTW9kZWwuc2V0KHsgc2hvd0xpZ2h0Ym94OiBmYWxzZSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblpvb21JbkNsaWNrZWRcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIHZpZXcgbmF2IHpvb20taW4gZXZlbnRcbiAgICovXG4gIF9vblpvb21JbkNsaWNrZWQoKSB7XG4gICAgdGhpcy52aWV3ZXIuem9vbUluKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25ab29tT3V0Q2xpY2tlZFxuICAgKiBAZGVzY3JpcHRpb24gYm91bmQgdG8gdmlldyBuYXYgem9vbS1vdXQgZXZlbnRcbiAgICovXG4gIF9vblpvb21PdXRDbGlja2VkKCkge1xuICAgIHRoaXMudmlld2VyLnpvb21PdXQoKTtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJhcHAtaW1hZ2Utdmlld2VyLWxpZ2h0Ym94XCIsIEFwcEltYWdlVmlld2VyKTtcbiIsImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQnO1xuXG5pbXBvcnQgeyBzaGFyZWRTdHlsZXMgfSBmcm9tICcuLi8uLi8uLi9zdHlsZXMvc2hhcmVkLXN0eWxlcyc7XG5pbXBvcnQgbGVhZmxldENzcyBmcm9tIFwibGVhZmxldC9kaXN0L2xlYWZsZXQuY3NzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHsgXG4gIHJldHVybiBodG1sYFxuXG48c3R5bGUgaW5jbHVkZT1cInNoYXJlZC1zdHlsZXNcIj5cbiAgJHtzaGFyZWRTdHlsZXN9XG4gICR7bGVhZmxldENzc31cblxuICBbaGlkZGVuXSB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuICBcbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHotaW5kZXg6IDEwMDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOyAgICBcbiAgICBhbmltYXRpb246IHNob3cgMzUwbXMgZWFzZS1vdXQ7XG4gIH1cblxuICA6aG9zdCAjbmF2LnNpbmdsZSB7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgfVxuXG4gIEBrZXlmcmFtZXMgc2hvdyB7XG4gICAgZnJvbSB7XG4gICAgICAvKiB0b3A6IC0xMDB2aDsgKi9cbiAgICAgIG9wYWNpdHk6IDAuNTtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4zKTtcbiAgICB9XG4gICAgdG8ge1xuICAgICAgLyogdG9wOiAwOyAqL1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgfVxuICB9XG5cbiAgI3ZpZXdlciB7IFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIH1cblxuICAjbmF2IHtcbiAgICB6LWluZGV4OiAyMDAwO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGJvdHRvbTogMDtcbiAgfVxuXG4gICNjbG9zZSB7XG4gICAgei1pbmRleDogMjAwMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAxLjVyZW07XG4gICAgcmlnaHQ6IDEuNXJlbTtcbiAgICB3aWR0aDogNTBweDtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB9XG5cbiAgI2Nsb3NlIHVjZGxpYi1pY29uIHtcbiAgICBmaWxsOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTgwKTtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgaGVpZ2h0OiAzNnB4O1xuICAgIHBhZGRpbmctdG9wOiA3cHg7XG4gIH1cblxuICAjY2xvc2U6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gICNjbG9zZTpob3ZlciB1Y2RsaWItaWNvbiB7XG4gICAgZmlsbDogdmFyKC0tY29sb3ItYWdnaWUtZ29sZCk7XG4gIH1cblxuICAubGVhZmxldC1jb250cm9sLXpvb20ge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICAuc3Bpbm5lciB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBoZWlnaHQ6IDEwMHZoO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAgdHJhbnNwYXJlbnQ7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjc1cywgdmlzaWJpbGl0eSAwLjc1cztcbiAgfVxuXG4gIC5zcGlubmVyOmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICB3aWR0aDogMzBweDtcbiAgICBoZWlnaHQ6IDMwcHg7XG4gICAgYm9yZGVyOiA1cHggc29saWQgIHZhcigtLWNvbG9yLWFnZ2llLWdvbGQtNzApO1xuICAgIGJvcmRlci10b3AtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWdvbGQpO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBhbmltYXRpb246IGxvYWRpbmcgMC43NXMgZWFzZSBpbmZpbml0ZTtcbiAgfVxuXG4gIEBrZXlmcmFtZXMgbG9hZGluZyB7XG4gICAgZnJvbSB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwdHVybik7IFxuICAgIH1cbiAgICB0byB7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxdHVybik7XG4gICAgfVxuICB9XG5cbjwvc3R5bGU+XG5cbjwhLS0gbWFrZSBzdXJlIGJhY2tncm91bmQgaXMgYmxhY2tlZCBvdXQuLi4gaU9TIGhhY2sgLS0+XG48ZGl2IGlkPVwic2FmZUNvdmVyXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDo5OTk7dG9wOjA7bGVmdDowO3dpZHRoOjEwMHZ3O2hlaWdodDoxMDB2aDtiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO1wiPjwvZGl2PlxuXG48ZGl2IGlkPVwidmlld2VyXCIgP2hpZGRlbj1cIiR7dGhpcy5sb2FkaW5nfVwiPjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwic3Bpbm5lclwiPjwvZGl2PlxuXG5cbjxhcHAtbWVkaWEtdmlld2VyLW5hdiBcbiAgaWQ9XCJuYXZcIlxuICBpcy1saWdodGJveFxuICBAem9vbS1pbj1cIiR7dGhpcy5fb25ab29tSW5DbGlja2VkfVwiXG4gIEB6b29tLW91dD1cIiR7dGhpcy5fb25ab29tT3V0Q2xpY2tlZH1cIlxuICBAY2xvc2U9XCIke3RoaXMuX29uQ2xvc2VDbGlja2VkfVwiPlxuPC9hcHAtbWVkaWEtdmlld2VyLW5hdj5cblxuYDt9IiwiaW1wb3J0IHsgTGl0RWxlbWVudCB9IGZyb20gXCJsaXRcIjtcblxuaW1wb3J0IHJlbmRlciBmcm9tIFwiLi9hcHAtaW1hZ2Utdmlld2VyLnRwbC5qc1wiO1xuXG5pbXBvcnQgeyBNaXhpbiwgTGl0Q29ya1V0aWxzIH0gZnJvbSAnQHVjZC1saWIvY29yay1hcHAtdXRpbHMnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL2xpYi91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBJbWFnZVZpZXdlciBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpLndpdGgoXG4gIExpdENvcmtVdGlsc1xuKSB7XG4gIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVjb3JkOiB7IHR5cGU6IE9iamVjdCB9LFxuICAgICAgbWVkaWE6IHsgdHlwZTogT2JqZWN0IH0sXG4gICAgICBsb2FkaW5nOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIGhlaWdodDogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIHNwaW5uZXJUb3A6IHsgdHlwZTogTnVtYmVyIH0sXG4gICAgICBoYXNNdWx0aXBsZUltYWdlczogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICB0aXRsZTogeyB0eXBlOiBTdHJpbmcgfVxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2luamVjdE1vZGVsKFwiQXBwU3RhdGVNb2RlbFwiLCBcIk1lZGlhTW9kZWxcIik7XG5cbiAgICB0aGlzLnJlY29yZCA9IHt9O1xuICAgIHRoaXMubWVkaWEgPSB7fTtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmhlaWdodCA9ICc2MDBweCc7XG4gICAgdGhpcy5zcGlubmVyVG9wID0gMzAwO1xuICAgIHRoaXMuaGFzTXVsdGlwbGVJbWFnZXMgPSBmYWxzZTtcbiAgICB0aGlzLnRpdGxlID0gJyc7XG4gIH1cblxuICBhc3luYyBmaXJzdFVwZGF0ZWQoKSB7XG4gICAgYXdhaXQgdGhpcy5BcHBTdGF0ZU1vZGVsLmdldCgpO1xuXG4gICAgbGV0IHNlbGVjdGVkUmVjb3JkID0gYXdhaXQgdGhpcy5BcHBTdGF0ZU1vZGVsLmdldFNlbGVjdGVkUmVjb3JkKCk7XG4gICAgaWYgKHNlbGVjdGVkUmVjb3JkKVxuICAgICAgdGhpcy5fb25TZWxlY3RlZFJlY29yZFVwZGF0ZShzZWxlY3RlZFJlY29yZCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25TZWxlY3RlZFJlY29yZE1lZGlhVXBkYXRlXG4gICAqIEBkZXNjcmlwdGlvbiBmcm9tIEFwcFN0YXRlTW9kZWwsIGNhbGxlZCB3aGVuIGEgcmVjb3JkcyBtZWRpYSBpcyBzZWxlY3RlZFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbWVkaWFcbiAgICovXG4gIF9vblNlbGVjdGVkUmVjb3JkVXBkYXRlKGUpIHtcbiAgICBpZiggIWUgKSByZXR1cm47XG4gICAgbGV0IHtncmFwaCwgY2xpZW50TWVkaWEsIHNlbGVjdGVkTWVkaWEsIHNlbGVjdGVkTWVkaWFQYWdlfSA9IGU7XG5cbiAgICB0aGlzLm1lZGlhVHlwZSA9IHV0aWxzLmdldE1lZGlhVHlwZShzZWxlY3RlZE1lZGlhKTtcbiAgICBpZiAodGhpcy5tZWRpYVR5cGUgIT09IFwiSW1hZ2VMaXN0XCIgJiYgdGhpcy5tZWRpYVR5cGUgIT09IFwiSW1hZ2VPYmplY3RcIikgcmV0dXJuO1xuXG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnRpdGxlID0gZ3JhcGgucm9vdD8ubmFtZSB8fCAnJztcblxuICAgIGxldCBwYWdlcyA9IFtdO1xuXG4gICAgLy8gcHJpb3JpdGl6ZSBpbWFnZWxpc3QsIHRoZW4gcGRmXG4gICAgbGV0IGltYWdlTGlzdCA9IChjbGllbnRNZWRpYS5tZWRpYUdyb3VwcyB8fCBbXSkuZmlsdGVyKG0gPT4gbVsnQHNob3J0VHlwZSddLmluY2x1ZGVzKCdJbWFnZUxpc3QnKSk/LlswXTtcbiAgICBpZiggaW1hZ2VMaXN0Py5jbGllbnRNZWRpYT8ucGFnZXMgKSB7XG4gICAgICBwYWdlcyA9IGltYWdlTGlzdC5jbGllbnRNZWRpYS5wYWdlcztcbiAgICB9XG5cbiAgICBpZiggIXBhZ2VzLmxlbmd0aCApIHtcbiAgICAgIGxldCBwZGYgPSAoY2xpZW50TWVkaWEubWVkaWFHcm91cHMgfHwgW10pLmZpbHRlcihtID0+IG0uY2xpZW50TWVkaWEucGRmKT8uWzBdO1xuICAgICAgaWYoIHBkZj8uY2xpZW50TWVkaWE/LnBhZ2VzICkge1xuICAgICAgICBwYWdlcyA9IHBkZi5jbGllbnRNZWRpYS5wYWdlcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiggIXBhZ2VzLmxlbmd0aCAmJiBzZWxlY3RlZE1lZGlhLmNsaWVudE1lZGlhPy5wYWdlcyApIHtcbiAgICAgIHBhZ2VzID0gc2VsZWN0ZWRNZWRpYS5jbGllbnRNZWRpYS5wYWdlcztcbiAgICB9XG5cbiAgICB0aGlzLm1lZGlhID0gcGFnZXMuZmlsdGVyKG1lZGlhID0+IG1lZGlhLnVpUG9zaXRpb24gPT09IHNlbGVjdGVkTWVkaWFQYWdlKVswXTtcblxuICAgIC8vIHRoaXMubWVkaWEgPSBzZWxlY3RlZE1lZGlhLmNsaWVudE1lZGlhPy5wYWdlcz8uZmlsdGVyKG1lZGlhID0+IG1lZGlhLnBhZ2UgPT09IHNlbGVjdGVkTWVkaWFQYWdlKVswXTtcbiAgICAvLyBvbiBmaXJzdCBwYWdlIGxvYWQsIHNlbGVjdGVkTWVkaWFQYWdlIGlzIC0xLCBzbyBqdXN0IHNob3cgZmlyc3QgcGFnZSBmcm9tIGNsaWVudE1lZGlhLmltYWdlc1xuICAgIGlmKCAhdGhpcy5tZWRpYSApIHtcbiAgICAgIHRoaXMubWVkaWEgPSBzZWxlY3RlZE1lZGlhLmNsaWVudE1lZGlhLmltYWdlcztcbiAgICB9XG5cbiAgICB0aGlzLl9yZW5kZXJJbWcoKTtcbiAgfVxuXG4gIGFzeW5jIF9yZW5kZXJJbWcoKSB7XG4gICAgaWYoIHRoaXMubWVkaWEgKSB7XG4gICAgICAvLyB0aGVyZSBjb3VsZCBiZSBnY3MgZXJyb3JzIHdoZXJlIG9ubHkgc29tZSBvZiB0aGUgaW1hZ2VzIGFyZSBhdmFpbGFibGUsIG9yIG9ubHkgdGhlIG9yaWdpbmFsXG4gICAgICBsZXQgc3Jjc2V0ID0gJyc7XG4gICAgICBsZXQgc3JjID0gdGhpcy5tZWRpYS5sYXJnZT8udXJsIHx8IHRoaXMubWVkaWEubWVkaXVtPy51cmwgfHwgdGhpcy5tZWRpYS5zbWFsbD8udXJsIHx8ICcnO1xuXG4gICAgICBpZiggdGhpcy5tZWRpYS5zbWFsbD8udXJsICkgc3Jjc2V0ICs9IGAke3RoaXMubWVkaWEuc21hbGwudXJsfSAke3RoaXMubWVkaWEuc21hbGwuc2l6ZS53aWR0aH13LGA7XG4gICAgICBpZiggdGhpcy5tZWRpYS5tZWRpdW0/LnVybCApIHNyY3NldCArPSBgJHt0aGlzLm1lZGlhLm1lZGl1bS51cmx9ICR7dGhpcy5tZWRpYS5tZWRpdW0uc2l6ZS53aWR0aH13LGA7XG4gICAgICBpZiggdGhpcy5tZWRpYS5sYXJnZT8udXJsICkgc3Jjc2V0ICs9IGAke3RoaXMubWVkaWEubGFyZ2UudXJsfSAke3RoaXMubWVkaWEubGFyZ2Uuc2l6ZS53aWR0aH13LGA7XG5cbiAgICAgIGxldCBzaXplID0gYXdhaXQgdGhpcy5nZXRJbWFnZVNpemUodGhpcy5tZWRpYS5sYXJnZSB8fCB0aGlzLm1lZGlhLm1lZGl1bSB8fCB0aGlzLm1lZGlhLnNtYWxsIHx8IHRoaXMubWVkaWEub3JpZ2luYWwpO1xuICAgICAgaWYoIEFycmF5LmlzQXJyYXkoc2l6ZSkgJiYgc2l6ZS5sZW5ndGggPiAxICkgc2l6ZSA9IHNpemVbMF07XG4gICAgICBpZiggdGhpcy5tZWRpYVR5cGUgPT09ICdJbWFnZU9iamVjdCcgKSB7XG4gICAgICAgIGxldCBtYXhIZWlnaHQgPSA2MDA7XG4gICAgICAgIGxldCBvcHRpbWFsSW1hZ2VIZWlnaHQgPSAoc2l6ZS5oZWlnaHQgLyBzaXplLndpZHRoICogd2luZG93LmlubmVyV2lkdGgpO1xuICAgICAgICB0aGlzLmhlaWdodCA9IG9wdGltYWxJbWFnZUhlaWdodCA+IG1heEhlaWdodCA/IG1heEhlaWdodCArICdweCcgOiBvcHRpbWFsSW1hZ2VIZWlnaHQgKyAncHgnO1xuICAgICAgICB0aGlzLnNwaW5uZXJUb3AgPSBvcHRpbWFsSW1hZ2VIZWlnaHQgLyAyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAnNjAwcHgnO1xuICAgICAgICB0aGlzLnNwaW5uZXJUb3AgPSAzMDA7XG4gICAgICB9XG5cbiAgICAgIGlmKCB0aGlzLnNwaW5uZXJUb3AgPiA1MDAgKSB0aGlzLnNwaW5uZXJUb3AgPSAzMDA7XG5cbiAgICAgIGxldCBzaXplcyA9IFwiNjAwcHhcIjtcblxuICAgICAgLy8gYWRkIHRvIGltZ1xuICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjaW1nXCIpLnNyY3NldCA9IHNyY3NldDtcbiAgICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI2ltZ1wiKS5zaXplcyA9IHNpemVzO1xuICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjaW1nXCIpLnNyYyA9IHNyYztcblxuICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNpbWcnKS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldEltYWdlU2l6ZShvcmlnaW5hbCkge1xuICAgIGlmKCBvcmlnaW5hbC5zaXplICkgcmV0dXJuIG9yaWdpbmFsLnNpemU7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltZy5zcmMgPSBvcmlnaW5hbC51cmw7XG4gICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICByZXNvbHZlKG9yaWdpbmFsLnNpemUgPSB7XG4gICAgICAgICAgaGVpZ2h0IDogaW1nLm5hdHVyYWxIZWlnaHQsIFxuICAgICAgICAgIHdpZHRoIDogaW1nLm5hdHVyYWxXaWR0aFxuICAgICAgICB9KTsgXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNpbWdcIikuc3Jjc2V0ID0gJyc7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYXBwLWltYWdlLXZpZXdlclwiLCBBcHBJbWFnZVZpZXdlcik7XG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSBcImxpdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXIoKSB7XG4gIHJldHVybiBodG1sYFxuICAgIDxzdHlsZT5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHBhZGRpbmc6IDIwcHggMDtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIH1cblxuICAgICAgLmxheW91dCB7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgaGVpZ2h0OiA2MDBweDtcbiAgICAgIH1cblxuICAgICAgI2ltZyB7XG4gICAgICAgIG1heC13aWR0aDogMTAwdnc7XG4gICAgICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gICAgICB9XG5cbiAgICAgIFtoaWRkZW5dIHtcbiAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgfVxuXG4gICAgICAuc3Bpbm5lciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgICAgICAvKiBoZWlnaHQ6IDEwMHZoOyAqL1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIHRyYW5zcGFyZW50O1xuICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuNzVzLCB2aXNpYmlsaXR5IDAuNzVzO1xuICAgICAgfVxuXG4gICAgICAuc3Bpbm5lcjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICB3aWR0aDogMzBweDtcbiAgICAgICAgaGVpZ2h0OiAzMHB4O1xuICAgICAgICBib3JkZXI6IDVweCBzb2xpZCAgdmFyKC0tY29sb3ItYWdnaWUtZ29sZC03MCk7XG4gICAgICAgIGJvcmRlci10b3AtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWdvbGQpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGFuaW1hdGlvbjogbG9hZGluZyAwLjc1cyBlYXNlIGluZmluaXRlO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGxvYWRpbmcge1xuICAgICAgICBmcm9tIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwdHVybik7IFxuICAgICAgICB9XG4gICAgICAgIHRvIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxdHVybik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICA8L3N0eWxlPlxuXG4gICAgPGRpdiBjbGFzcz1cInNwaW5uZXJcIiA/aGlkZGVuPVwiJHshdGhpcy5sb2FkaW5nfVwiIHN0eWxlPVwidG9wOiAke3RoaXMuc3Bpbm5lclRvcH1weFwiPjwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImxheW91dFwiIHN0eWxlPVwibGluZS1oZWlnaHQ6IDA7IGhlaWdodDogJHt0aGlzLmhlaWdodH1cIj5cbiAgICAgIDxpbWcgP2hpZGRlbj1cIiR7dGhpcy5sb2FkaW5nfVwiIGlkPVwiaW1nXCIgc3R5bGU9XCJoZWlnaHQ6ICR7dGhpcy5oZWlnaHR9XCIgYWx0PVwiJHt0aGlzLnRpdGxlfVwiIC8+XG4gICAgPC9kaXY+XG4gIGA7XG59XG4iLCJpbXBvcnQgeyBMaXRFbGVtZW50IH0gZnJvbSBcImxpdFwiO1xuXG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2FwcC1tZWRpYS12aWV3ZXItbmF2LnRwbC5qc1wiO1xuXG5pbXBvcnQgeyBNaXhpbiwgTGl0Q29ya1V0aWxzIH0gZnJvbSAnQHVjZC1saWIvY29yay1hcHAtdXRpbHMnO1xuXG4vLyBpbXBvcnQgXCJAcG9seW1lci9wYXBlci1pY29uLWJ1dHRvblwiXG5pbXBvcnQgXCIuLi8uLi8uLi91dGlscy9hcHAtc2hhcmUtYnRuXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL2xpYi91dGlsc1wiO1xuaW1wb3J0IFwiQHVjZC1saWIvdGhlbWUtZWxlbWVudHMvdWNkbGliL3VjZGxpYi1pY29uL3VjZGxpYi1pY29uXCI7XG5pbXBvcnQgXCIuLi8uLi8uLi91dGlscy9hcHAtaWNvbnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwTWVkaWFWaWV3ZXJOYXYgZXh0ZW5kcyBNaXhpbihMaXRFbGVtZW50KS53aXRoKFxuICBMaXRDb3JrVXRpbHNcbikge1xuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvdGFsVGh1bWJuYWlsV2lkdGg6IHsgdHlwZTogTnVtYmVyIH0sIC8vIHRodW1ibmFpbCB3aWR0aCB3LyBib3JkZXIgYW5kIG1hcmdpblxuICAgICAgaWNvbjogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIGljb25XaWR0aDogeyB0eXBlOiBOdW1iZXIgfSxcbiAgICAgIHRodW1ibmFpbHM6IHsgdHlwZTogQXJyYXkgfSxcbiAgICAgIHRodW1ibmFpbHNQZXJGcmFtZTogeyB0eXBlOiBOdW1iZXIgfSxcbiAgICAgIGxlZnRNb3N0VGh1bWJuYWlsOiB7IHR5cGU6IE51bWJlciB9LFxuICAgICAgYnJlYWtDb250cm9sczogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBzaG93TmF2TGVmdDogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBzaG93TmF2UmlnaHQ6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgaXNMaWdodGJveDogeyBhdHRyaWJ1dGU6IFwiaXMtbGlnaHRib3hcIiwgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgaXNCb29rUmVhZGVyOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIGhpZGVab29tOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIGJyU2luZ2xlUGFnZTogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBickZ1bGxzY3JlZW46IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgb3ZlcnJpZGVJbWFnZUxpc3Q6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgc2luZ2xlSW1hZ2U6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgbWVkaWFMaXN0OiB7IHR5cGU6IEFycmF5IH0sXG4gICAgICBzaG93T3BlbkxpZ2h0Ym94OiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIHNlYXJjaGluZ1RleHQ6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgc2VhcmNoaW5nOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIGJyU2VhcmNoOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIHNlbGVjdGVkUmVzdWx0OiB7IHR5cGU6IE51bWJlciB9LFxuICAgICAgc2VhcmNoUmVzdWx0czogeyB0eXBlOiBBcnJheSB9LFxuICAgICAgc2VhcmNoUmVzdWx0c0NvdW50OiB7IHR5cGU6IE51bWJlciB9LFxuICAgICAgaXNNdWx0aW1lZGlhOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIGhpZGVQYWdlVG9nZ2xlOiB7IHR5cGU6IEJvb2xlYW4gfVxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuXG4gICAgdGhpcy50b3RhbFRodW1ibmFpbFdpZHRoID0gNjg7XG4gICAgdGhpcy5pY29uID0gXCJcIjtcbiAgICB0aGlzLmljb25XaWR0aCA9IDM2O1xuXG4gICAgdGhpcy5fcmVzZXQoKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHRoaXMuX3Jlc2l6ZSgpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIChlKSA9PiB0aGlzLl9vblRvdWNoRW5kKGUpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsIChlKSA9PiB0aGlzLl9vblRvdWNoRW5kKGUpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCAoZSkgPT4gdGhpcy5fb25Ub3VjaE1vdmUoZSkpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgKGUpID0+IHRoaXMuX29uVG91Y2hTdGFydChlKSk7XG5cbiAgICB0aGlzLl9pbmplY3RNb2RlbChcIkFwcFN0YXRlTW9kZWxcIiwgXCJNZWRpYU1vZGVsXCIsIFwiQm9va1JlYWRlck1vZGVsXCIsIFwiQ29sbGVjdGlvbk1vZGVsXCIpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLl9zeW5jQXR0cmlidXRlU3RhdGUoKTtcbiAgfVxuXG4gIF9zeW5jQXR0cmlidXRlU3RhdGUoKSB7XG4gICAgdGhpcy5pc0xpZ2h0Ym94ID0gdGhpcy5oYXNBdHRyaWJ1dGUoJ2lzLWxpZ2h0Ym94Jyk7XG4gIH1cblxuICBhc3luYyBmaXJzdFVwZGF0ZWQoKSB7XG4gICAgdGhpcy5fb25TZWxlY3RlZFJlY29yZFVwZGF0ZShhd2FpdCB0aGlzLkFwcFN0YXRlTW9kZWwuZ2V0U2VsZWN0ZWRSZWNvcmQoKSk7XG4gICAgdGhpcy5fcmVzaXplKHRydWUpO1xuXG4gICAgbGV0IHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG4gICAgaWYoIHNjcmVlbldpZHRoIDwgODAwICkge1xuICAgICAgdGhpcy5iclNpbmdsZVBhZ2UgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIF9vbkFwcFN0YXRlVXBkYXRlKGUpIHtcbiAgICBpZiggdGhpcy5BcHBTdGF0ZU1vZGVsLmxvY2F0aW9uLnBhZ2UgIT09ICdpdGVtJyApIHRoaXMuX3Jlc2V0KCk7XG4gICAgaWYgKGUubWVkaWFWaWV3ZXJOYXZMZWZ0TW9zdFRodW1ibmFpbCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgaWYgKGUubWVkaWFWaWV3ZXJOYXZMZWZ0TW9zdFRodW1ibmFpbCA9PT0gdGhpcy5sZWZ0TW9zdFRodW1ibmFpbCkgcmV0dXJuO1xuXG4gICAgdGhpcy5sZWZ0TW9zdFRodW1ibmFpbCA9IGUubWVkaWFWaWV3ZXJOYXZMZWZ0TW9zdFRodW1ibmFpbDtcbiAgfVxuXG4gIGFzeW5jIF9nZXRJdGVtRGlzcGxheVR5cGUoaXRlbUlkLCBjb2xsZWN0aW9uSWQpIHtcbiAgICBpZiggIWNvbGxlY3Rpb25JZCApIHJldHVybjtcblxuICAgIGxldCBlZGl0cztcbiAgICB0cnkge1xuICAgICAgZWRpdHMgPSBhd2FpdCB0aGlzLkNvbGxlY3Rpb25Nb2RlbC5nZXRDb2xsZWN0aW9uRWRpdHMoY29sbGVjdGlvbklkKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5sb2dnZXIud2FybignRXJyb3IgcmV0cmlldmluZyBjb2xsZWN0aW9uIGVkaXRzJywgZXJyb3IpO1xuICAgIH1cblxuICAgIGlmKCBlZGl0cy5zdGF0ZSAhPT0gJ2xvYWRlZCcgKSByZXR1cm4gbnVsbDtcbiAgICBpZiggIU9iamVjdC5rZXlzKGVkaXRzLnBheWxvYWQpLmxlbmd0aCApIHJldHVybiBudWxsO1xuXG4gICAgbGV0IGNvbGxlY3Rpb25FZGl0cyA9IGVkaXRzLnBheWxvYWQ/LmNvbGxlY3Rpb24gfHwge307XG4gICAgbGV0IGl0ZW1FZGl0cyA9IGVkaXRzLnBheWxvYWQ/Lml0ZW1zIHx8IHt9O1xuXG4gICAgcmV0dXJuIGl0ZW1FZGl0c1tpdGVtSWRdPy5pdGVtRGVmYXVsdERpc3BsYXkgfHwgY29sbGVjdGlvbkVkaXRzLml0ZW1EZWZhdWx0RGlzcGxheTtcbiAgfVxuXG4gIF9vbkJvb2tyZWFkZXJTdGF0ZVVwZGF0ZShlKSB7XG4gICAgdGhpcy5ickZ1bGxzY3JlZW4gPSBlLmZ1bGxzY3JlZW47XG4gICAgdGhpcy5zZWxlY3RlZFJlc3VsdCA9IGUuc2VsZWN0ZWRTZWFyY2hSZXN1bHQgKyAxO1xuICAgIHRoaXMuc2VhcmNoaW5nID0gZS5zZWFyY2hBY3RpdmU7XG5cbiAgICB0aGlzLnNlYXJjaFJlc3VsdHMgPSBbXTtcbiAgICBpZiggZS5zZWFyY2hSZXN1bHRzPy5zdGF0ZSA9PT0gJ2xvYWRlZCcgKSB7XG4gICAgICBsZXQgc2VhcmNoUmVzdWx0cyA9IGUuc2VhcmNoUmVzdWx0cy5wYXlsb2FkIHx8IHt9O1xuICAgICAgc2VhcmNoUmVzdWx0cyA9IE9iamVjdC5rZXlzKHNlYXJjaFJlc3VsdHMpLm1hcChrZXkgPT4gc2VhcmNoUmVzdWx0c1trZXldKTtcbiAgICAgIHNlYXJjaFJlc3VsdHMuZm9yRWFjaChyZXN1bHQgPT4ge1xuICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdHMucHVzaCguLi5yZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuc2VhcmNoUmVzdWx0c0NvdW50ID0gdGhpcy5zZWFyY2hSZXN1bHRzLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblRvdWNoRW5kXG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byB3aW5kb3cgdG91Y2ggZW5kL2NhbmNlbCBldmVudHMuIGlmIHdlIGFyZVxuICAgKiBwZXJmb3JtaW5nIGEgdG91Y2ggKHN3aXBlKSBhY3Rpb24sIHNlZSBpZiB3ZSBoYXZlIHJlYWNoZWQgdGhlXG4gICAqIHRocmVzaG9sZCBmb3Igc3dpcGUgYW5kIGlmIHNvLCBwYWdlIGxlZnQvcmlnaHRcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgSFRNTCB0b3VjaCBldmVudFxuICAgKi9cbiAgX29uVG91Y2hFbmQoZSkge1xuICAgIGlmICghdGhpcy50b3VjaEFjdGlvbikgcmV0dXJuO1xuICAgIHRoaXMudG91Y2hBY3Rpb24gPSBmYWxzZTtcblxuICAgIGxldCBkaWZmID0gdGhpcy50b3VjaFN0YXJ0WCAtIHRoaXMudG91Y2hDdXJyZW50WDtcbiAgICBsZXQgc2RpZmYgPSBNYXRoLmFicyhkaWZmKTtcblxuICAgIGlmIChzZGlmZiA+IHRoaXMudG90YWxUaHVtYm5haWxXaWR0aCAvIDIpIHtcbiAgICAgIGlmIChkaWZmIDwgMCkgdGhpcy5fcGFnZUxlZnQoKTtcbiAgICAgIGVsc2UgdGhpcy5fcGFnZVJpZ2h0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uVG91Y2hNb3ZlXG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byB3aW5kb3dzIHRvdWNoIG1vdmUgZXZlbnQuIGlmIHdlIGFyZSBwZXJmb3JtaW5nXG4gICAqIGEgdG91Y2ggKHN3aXBlKSBhY3Rpb24sIG5lZWQgdG8ga2VlcCB0cmFjayBvZiBjdXJyZW50IHggb2Zmc2V0XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIEhUTUwgdG91Y2ggZXZlbnRcbiAgICovXG4gIF9vblRvdWNoTW92ZShlKSB7XG4gICAgaWYgKCF0aGlzLnRvdWNoQWN0aW9uKSByZXR1cm47XG4gICAgdGhpcy50b3VjaEN1cnJlbnRYID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25Ub3VjaFN0YXJ0XG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byB0aGlzIGVsZW1lbnRzIHRvdWNoc3RhcnQgZXZlbnQuXG4gICAqIHN0YXJ0IHBlcmZvcm1pbmcgYSB0b3VjaCAoc3dpcGUpIGFjdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZSBIVE1MIHRvdWNoIGV2ZW50XG4gICAqL1xuICBfb25Ub3VjaFN0YXJ0KGUpIHtcbiAgICB0aGlzLnRvdWNoQWN0aW9uID0gdHJ1ZTtcbiAgICB0aGlzLnRvdWNoU3RhcnRYID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgdGhpcy50b3VjaEN1cnJlbnRYID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfcmVzaXplXG4gICAqIEBkZXNjcmlwdGlvbiB1cGRhdGUgdGh1bWJuYWlsIHByZXZpZXcgb24gcmVzaXplXG4gICAqXG4gICAqL1xuICBfcmVzaXplKHVwZGF0ZVRodW1ibmFpbFdpbmRvdz1mYWxzZSkge1xuICAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGg7XG5cbiAgICAvLyBncnJyclxuICAgIGlmICh3ID09PSAwKSB7XG4gICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX3Jlc2l6ZSgpLCAyMDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHcgLT0gMTY7IC8vIHBhZGRpbmdcblxuICAgIHRoaXMuX3NldE5hdkJyZWFrKHcpO1xuXG4gICAgbGV0IGljb25zV2lkdGg7XG4gICAgaWYgKHRoaXMuYnJlYWtDb250cm9scykge1xuICAgICAgaWNvbnNXaWR0aCA9IHRoaXMuaWNvbldpZHRoICogMjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWNvbnNXaWR0aCA9IHRoaXMuaWNvbldpZHRoICogNDtcbiAgICAgIGlmICh0aGlzLmlzTGlnaHRib3gpIGljb25zV2lkdGggKz0gdGhpcy5pY29uV2lkdGggKiAyO1xuICAgIH1cblxuICAgIGxldCBzcGFjZUJ1ZmZlciA9IHdpbmRvdy5pbm5lcldpZHRoIDwgMTAwMCA/IDAuMzUgOiAwLjQyO1xuICAgIGxldCBhdmFpbGFibGVUaHVtYlNwYWNlID0gTWF0aC5taW4odyAtIGljb25zV2lkdGgsIHcgKiBzcGFjZUJ1ZmZlcik7XG5cbiAgICB0aGlzLnRodW1ibmFpbHNQZXJGcmFtZSA9IE1hdGgubWF4KFxuICAgICAgTWF0aC5mbG9vcihhdmFpbGFibGVUaHVtYlNwYWNlIC8gdGhpcy50b3RhbFRodW1ibmFpbFdpZHRoKSxcbiAgICAgIDFcbiAgICApO1xuICAgIFxuICAgIHRoaXMudGh1bWJuYWlsQ29udGFpbmVyV2lkdGggPSB0aGlzLnRodW1ibmFpbHNQZXJGcmFtZSAqIHRoaXMudG90YWxUaHVtYm5haWxXaWR0aDtcblxuICAgIGlmKCB1cGRhdGVUaHVtYm5haWxXaW5kb3cgKSB7XG4gICAgICBsZXQgc2VsZWN0ZWRUaHVtYm5haWwgPSB0aGlzLnRodW1ibmFpbHMuZmluZEluZGV4KHQgPT4gdC5zZWxlY3RlZCk7XG4gICAgICBpZiggc2VsZWN0ZWRUaHVtYm5haWwgKSB7XG4gICAgICAgIHRoaXMubGVmdE1vc3RUaHVtYm5haWwgPSBNYXRoLmZsb29yKHNlbGVjdGVkVGh1bWJuYWlsIC8gTWF0aC5tYXgodGhpcy50aHVtYm5haWxzUGVyRnJhbWUsIDEpKSAqIHRoaXMudGh1bWJuYWlsc1BlckZyYW1lO1xuICAgICAgICBpZiggdGhpcy5sZWZ0TW9zdFRodW1ibmFpbCA8IDAgKSB0aGlzLmxlZnRNb3N0VGh1bWJuYWlsID0gMDtcbiAgICAgIH0gIFxuICAgIH1cblxuICAgIGlmICh0aGlzLmlzTGlnaHRib3gpIHRoaXMudGh1bWJuYWlsc1BlckZyYW1lICo9IDI7XG4gICAgbGV0IHRodW1ibmFpbENvbnRhaW5lciA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI3RodW1ibmFpbHNcIik7XG4gICAgaWYgKCF0aHVtYm5haWxDb250YWluZXIpIHJldHVybjtcbiAgICBcbiAgICB0aHVtYm5haWxDb250YWluZXIuc3R5bGUud2lkdGggPSB0aGlzLnRodW1ibmFpbENvbnRhaW5lcldpZHRoICsgJ3B4JztcblxuICAgIHRoaXMuc2hvd05hdkxlZnQgPSB0aGlzLmxlZnRNb3N0VGh1bWJuYWlsICE9PSAwO1xuICAgIHRoaXMuc2hvd05hdlJpZ2h0ID0gIXRoaXMuX3Nob3dpbmdMYXN0VGh1bWJGcmFtZSgpO1xuXG4gICAgdGhpcy5fdXBkYXRlVGh1bWJuYWlsQ29udGFpbmVyUG9zKCk7XG4gIH1cblxuICBfZ2V0VG90YWxJY29uV2lkdGgoKSB7XG4gICAgbGV0IHRvdGFsSWNvbldpZHRoID0gdGhpcy5pY29uV2lkdGggKiA0OyAvLyBuYXYgaWNvbnMgYW5kIGRlZmF1bHQgaWNvbnNcbiAgICBpZiAodGhpcy5pc0xpZ2h0Ym94KSB0b3RhbEljb25XaWR0aCArPSB0aGlzLmljb25XaWR0aCAqIDI7XG4gICAgcmV0dXJuIHRvdGFsSWNvbldpZHRoO1xuICB9XG5cbiAgX3NldE5hdkJyZWFrKHdpZHRoKSB7XG4gICAgbGV0IHRvdGFsSWNvbldpZHRoID0gdGhpcy5pY29uV2lkdGggKiA0OyAvLyBuYXYgaWNvbnMgYW5kIGRlZmF1bHQgaWNvbnNcbiAgICBpZiAodGhpcy5pc0xpZ2h0Ym94KSB0b3RhbEljb25XaWR0aCArPSB0aGlzLmljb25XaWR0aCAqIDI7XG5cbiAgICBpZiAodG90YWxJY29uV2lkdGggKyB0aGlzLnRvdGFsVGh1bWJuYWlsV2lkdGggKiA0ID4gd2lkdGgpIHtcbiAgICAgIHRoaXMuYnJlYWtDb250cm9scyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnJlYWtDb250cm9scyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIF9wYWdlTGVmdCgpIHtcbiAgICB0aGlzLmxlZnRNb3N0VGh1bWJuYWlsID0gdGhpcy5sZWZ0TW9zdFRodW1ibmFpbCAtIHRoaXMudGh1bWJuYWlsc1BlckZyYW1lO1xuICAgIGlmICh0aGlzLmxlZnRNb3N0VGh1bWJuYWlsIDwgMCkgdGhpcy5sZWZ0TW9zdFRodW1ibmFpbCA9IDA7XG4gICAgdGhpcy5fcmVzaXplKCk7XG4gICAgdGhpcy5BcHBTdGF0ZU1vZGVsLnNldCh7XG4gICAgICBtZWRpYVZpZXdlck5hdkxlZnRNb3N0VGh1bWJuYWlsOiB0aGlzLmxlZnRNb3N0VGh1bWJuYWlsLFxuICAgIH0pO1xuICB9XG5cbiAgX3BhZ2VSaWdodCgpIHtcbiAgICBpZiAodGhpcy5fc2hvd2luZ0xhc3RUaHVtYkZyYW1lKCkpIHJldHVybjtcbiAgICB0aGlzLmxlZnRNb3N0VGh1bWJuYWlsID0gdGhpcy5sZWZ0TW9zdFRodW1ibmFpbCArIHRoaXMudGh1bWJuYWlsc1BlckZyYW1lO1xuICAgIHRoaXMuX3Jlc2l6ZSgpO1xuICAgIHRoaXMuQXBwU3RhdGVNb2RlbC5zZXQoe1xuICAgICAgbWVkaWFWaWV3ZXJOYXZMZWZ0TW9zdFRodW1ibmFpbDogdGhpcy5sZWZ0TW9zdFRodW1ibmFpbCxcbiAgICB9KTtcbiAgfVxuXG4gIF9wcmV2U2VhcmNoUmVzdWx0KGUpIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZFJlc3VsdCA9PT0gMSkgcmV0dXJuO1xuICAgIHRoaXMuc2VsZWN0ZWRSZXN1bHQgPSB0aGlzLnNlbGVjdGVkUmVzdWx0IC0gMTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJici1jaGFuZ2Utc2VhcmNoLXJlc3VsdFwiLCB7XG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIHNlbGVjdGVkUmVzdWx0OiB0aGlzLnNlbGVjdGVkUmVzdWx0LFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgX25leHRTZWFyY2hSZXN1bHQoZSkge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkUmVzdWx0ID09PSB0aGlzLnNlYXJjaFJlc3VsdHNDb3VudCkgcmV0dXJuO1xuICAgIHRoaXMuc2VsZWN0ZWRSZXN1bHQgPSB0aGlzLnNlbGVjdGVkUmVzdWx0ICsgMTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJici1jaGFuZ2Utc2VhcmNoLXJlc3VsdFwiLCB7XG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIHNlbGVjdGVkUmVzdWx0OiB0aGlzLnNlbGVjdGVkUmVzdWx0LFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgX3Nob3dpbmdMYXN0VGh1bWJGcmFtZSgpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmxlZnRNb3N0VGh1bWJuYWlsICsgdGhpcy50aHVtYm5haWxzUGVyRnJhbWUgPlxuICAgICAgdGhpcy50aHVtYm5haWxzLmxlbmd0aCAtIDFcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBfdXBkYXRlVGh1bWJuYWlsQ29udGFpbmVyUG9zKCkge1xuICAgIC8vIHRoYXQgKzEgaXMgYSBoYWNrLCB3aGF0IGFtIEkgbWlzc2luZyAhP1xuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI3RodW1ibmFpbElubmVyQ29udGFpbmVyXCIpLnN0eWxlLm1hcmdpbkxlZnQgPVxuICAgICAgLTEgKiB0aGlzLmxlZnRNb3N0VGh1bWJuYWlsICogKHRoaXMudG90YWxUaHVtYm5haWxXaWR0aCArIDEpICsgXCJweFwiO1xuXG4gICAgbGV0IGxhc3RUaHVtYiA9IHRoaXMubGVmdE1vc3RUaHVtYm5haWwgKyB0aGlzLnRodW1ibmFpbHNQZXJGcmFtZTtcbiAgICB0aGlzLnRodW1ibmFpbHMuZm9yRWFjaCgodGh1bWJuYWlsLCBpbmRleCkgPT4ge1xuICAgICAgdGh1bWJuYWlsLmRpc2FibGVkID0gaW5kZXggPCB0aGlzLmxlZnRNb3N0VGh1bWJuYWlsIHx8IGluZGV4ID49IGxhc3RUaHVtYjtcbiAgICB9KTtcbiAgfVxuXG4gIF9yZXNldCgpIHtcbiAgICB0aGlzLnRodW1ibmFpbHMgPSBbXTtcbiAgICB0aGlzLnRodW1ibmFpbHNQZXJGcmFtZSA9IDEwO1xuICAgIHRoaXMubGVmdE1vc3RUaHVtYm5haWwgPSAwO1xuICAgIHRoaXMuYnJlYWtDb250cm9scyA9IHRydWU7XG4gICAgdGhpcy5zaG93TmF2TGVmdCA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd05hdlJpZ2h0ID0gZmFsc2U7XG4gICAgdGhpcy5fc3luY0F0dHJpYnV0ZVN0YXRlKCk7XG4gICAgdGhpcy5pc0Jvb2tSZWFkZXIgPSBmYWxzZTtcbiAgICB0aGlzLmhpZGVab29tID0gZmFsc2U7XG4gICAgdGhpcy5iclNpbmdsZVBhZ2UgPSBmYWxzZTtcbiAgICB0aGlzLm92ZXJyaWRlSW1hZ2VMaXN0ID0gZmFsc2U7XG4gICAgdGhpcy5ickZ1bGxzY3JlZW4gPSBmYWxzZTtcbiAgICB0aGlzLnNpbmdsZUltYWdlID0gZmFsc2U7XG4gICAgdGhpcy5tZWRpYUxpc3QgPSBbXTtcbiAgICB0aGlzLnNob3dPcGVuTGlnaHRib3ggPSBmYWxzZTtcbiAgICB0aGlzLnNlYXJjaGluZ1RleHQgPSBmYWxzZTtcbiAgICB0aGlzLmJyU2VhcmNoID0gZmFsc2U7XG4gICAgdGhpcy5zZWFyY2hpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdGVkUmVzdWx0ID0gMTtcbiAgICB0aGlzLnNlYXJjaFJlc3VsdHMgPSBbXTtcbiAgICB0aGlzLnNlYXJjaFJlc3VsdHNDb3VudCA9IDA7XG4gICAgdGhpcy5pc011bHRpbWVkaWEgPSBmYWxzZTtcbiAgICB0aGlzLmhpZGVQYWdlVG9nZ2xlID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25TZWxlY3RlZFJlY29yZFVwZGF0ZVxuICAgKiBAZGVzY3JpcHRpb24gZnJvbSBBcHBTdGF0ZUludGVyZmFjZSwgY2FsbGVkIHdoZW4gYSByZWNvcmQgaXMgc2VsZWN0ZWRcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlY29yZCBzZWxlY3RlZCByZWNvcmRcbiAgICovXG4gIGFzeW5jIF9vblNlbGVjdGVkUmVjb3JkVXBkYXRlKGl0ZW0pIHtcbiAgICBpZiggIWl0ZW0gKSByZXR1cm47XG5cbiAgICBsZXQgeyBncmFwaCwgY2xpZW50TWVkaWEsIHNlbGVjdGVkTWVkaWEsIHNlbGVjdGVkTWVkaWFQYWdlfSA9IGl0ZW07XG5cbiAgICBsZXQgbWVkaWFHcm91cHMgPSBjbGllbnRNZWRpYS5tZWRpYUdyb3VwcyB8fCBbXTtcbiAgICBsZXQgYXVkaW9NZWRpYSA9IG1lZGlhR3JvdXBzLmZpbmQobSA9PiBtLmZpbGVGb3JtYXRTaW1wbGUgPT09ICdhdWRpbycpO1xuICAgIGxldCB2aWRlb01lZGlhID0gbWVkaWFHcm91cHMuZmluZChtID0+IG0uZmlsZUZvcm1hdFNpbXBsZSA9PT0gJ3ZpZGVvJyk7XG4gICAgaWYoIGF1ZGlvTWVkaWEgfHwgdmlkZW9NZWRpYSApIHRoaXMuaGlkZVpvb20gPSB0cnVlO1xuXG4gICAgaWYgKCBjbGllbnRNZWRpYS5tZWRpYUdyb3Vwcy5sZW5ndGggPT09IDEgJiZcbiAgICAgICAgICBzZWxlY3RlZE1lZGlhUGFnZSA9PT0gLTEgKSB7XG4gICAgICB0aGlzLnNpbmdsZUltYWdlID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgdGh1bWJuYWlscyA9IFtdO1xuXG4gICAgLy8gaWYgdGhpcy5pc011bHRpbWVkaWEsIHByZXBlbmQgdGh1bWJuYWlscyBmb3IgdmlkZW8vYXVkaW8gbWVkaWEgZmlyc3RcbiAgICBpZiggdGhpcy5pc011bHRpbWVkaWEgKSB7XG4gICAgICAvLyBjaGVjayB0aGUgZGlzcGxheSB0eXBlIGZvciB0aGUgaXRlbVxuICAgICAgdGhpcy5pc0Jvb2tSZWFkZXIgPSBmYWxzZTsgLy8gZm9yIG5vdywgZGlzYWJsZSBib29rcmVhZGVyIGlmIG11bHRpbWVkaWEuLiBha2EgaW1hZ2VsaXN0XG5cbiAgICAgIGxldCBwb3NpdGlvbiA9IDE7XG4gICAgICBpZiggYXVkaW9NZWRpYSApIHtcbiAgICAgICAgbGV0IHRodW1iID0gdGhpcy5fcmVuZGVyVGh1bWJuYWlsKGF1ZGlvTWVkaWEsIGF1ZGlvTWVkaWEuY2xpZW50TWVkaWEuaW1hZ2VzIHx8IFtdLCBzZWxlY3RlZE1lZGlhUGFnZSwgJ2F1ZGlvJyk7XG4gICAgICAgIGlmKCB0aHVtYiApIHtcbiAgICAgICAgICBpZiggc2VsZWN0ZWRNZWRpYVsnQGlkJ10gPT09IHRodW1iLmlkICkge1xuICAgICAgICAgICAgdGh1bWIuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5oaWRlWm9vbSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmhpZGVQYWdlVG9nZ2xlID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWRlWm9vbSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5oaWRlUGFnZVRvZ2dsZSA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHVtYi5wb3NpdGlvbiA9IHBvc2l0aW9uKys7XG4gICAgICAgICAgdGh1bWJuYWlscy5wdXNoKHRodW1iKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBpbWFnZXNGb3VuZCA9IGZhbHNlO1xuICAgIC8vIHByaW9yaXRpemUgaW1hZ2VsaXN0LCB0aGVuIHBkZi4gZWxzZSBjb21iaW5lIHBhZ2VzXG4gICAgbGV0IGltYWdlTGlzdCA9IChjbGllbnRNZWRpYS5tZWRpYUdyb3VwcyB8fCBbXSkuZmlsdGVyKG0gPT4gbVsnQHNob3J0VHlwZSddLmluY2x1ZGVzKCdJbWFnZUxpc3QnKSk/LlswXTtcbiAgICBpZiggaW1hZ2VMaXN0Py5jbGllbnRNZWRpYT8ucGFnZXMgJiYgIXRoaXMuaXNCb29rUmVhZGVyICkge1xuICAgICAgaW1hZ2VzRm91bmQgPSB0cnVlO1xuICAgICAgZm9yKCBsZXQgcGFnZSBvZiBpbWFnZUxpc3QuY2xpZW50TWVkaWEucGFnZXMgKSB7XG4gICAgICAgIHRodW1ibmFpbHMucHVzaCh0aGlzLl9yZW5kZXJUaHVtYm5haWwoc2VsZWN0ZWRNZWRpYSwgcGFnZSwgc2VsZWN0ZWRNZWRpYVBhZ2UpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiggKCF0aHVtYm5haWxzLmxlbmd0aCB8fCAoIWltYWdlc0ZvdW5kICYmIHRoaXMuaXNNdWx0aW1lZGlhKSkgJiYgIXRoaXMuaXNCb29rUmVhZGVyICkge1xuICAgICAgbGV0IHBkZiA9IChjbGllbnRNZWRpYS5tZWRpYUdyb3VwcyB8fCBbXSkuZmlsdGVyKG0gPT4gbS5jbGllbnRNZWRpYS5wZGYpPy5bMF07XG4gICAgICBpZiggcGRmPy5jbGllbnRNZWRpYT8ucGFnZXMgKSB7XG4gICAgICAgIGltYWdlc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgZm9yKCBsZXQgcGFnZSBvZiBwZGYuY2xpZW50TWVkaWEucGFnZXMgKSB7XG4gICAgICAgICAgdGh1bWJuYWlscy5wdXNoKHRoaXMuX3JlbmRlclRodW1ibmFpbChzZWxlY3RlZE1lZGlhLCBwYWdlLCBzZWxlY3RlZE1lZGlhUGFnZSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoICghdGh1bWJuYWlscy5sZW5ndGggfHwgKCFpbWFnZXNGb3VuZCAmJiB0aGlzLmlzTXVsdGltZWRpYSkpICYmICF0aGlzLmlzQm9va1JlYWRlciApIHtcbiAgICAgIGZvciggbGV0IG5vZGUgb2YgY2xpZW50TWVkaWEubWVkaWFHcm91cHMgKSB7XG4gICAgICAgIGlmKCAhbm9kZS5jbGllbnRNZWRpYS5wYWdlcyAmJiAhdGhpcy5vdmVycmlkZUltYWdlTGlzdCApIHtcbiAgICAgICAgICB0aHVtYm5haWxzLnB1c2godGhpcy5fcmVuZGVyVGh1bWJuYWlsKHNlbGVjdGVkTWVkaWEsIG5vZGUuY2xpZW50TWVkaWEuaW1hZ2VzLCBzZWxlY3RlZE1lZGlhUGFnZSkpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKCAhbm9kZS5jbGllbnRNZWRpYS5wYWdlcyApIGNvbnRpbnVlO1xuICAgICAgICBmb3IoIGxldCBwYWdlIG9mIG5vZGUuY2xpZW50TWVkaWEucGFnZXMgKSB7XG4gICAgICAgICAgdGh1bWJuYWlscy5wdXNoKHRoaXMuX3JlbmRlclRodW1ibmFpbChzZWxlY3RlZE1lZGlhLCBwYWdlLCBzZWxlY3RlZE1lZGlhUGFnZSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaWRzID0gW107XG4gICAgdGhpcy50aHVtYm5haWxzID0gdGh1bWJuYWlsc1xuICAgICAgLmZpbHRlcigoZWxlbWVudCkgPT4gZWxlbWVudCAhPT0gbnVsbClcbiAgICAgIC5maWx0ZXIoIChlbGVtZW50KSA9PiB7XG4gICAgICAgIGlmICggaWRzLmluY2x1ZGVzKGVsZW1lbnQuaWQpICkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZHMucHVzaChlbGVtZW50LmlkKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KVxuXG4gICAgdGhpcy5fcmVzaXplKHRydWUpO1xuICB9XG5cbiAgX3JlbmRlclRodW1ibmFpbChub2RlLCBjbGllbnRNZWRpYVBhZ2UsIHNlbGVjdGVkTWVkaWFQYWdlLCBtZWRpYVR5cGUpIHtcbiAgICBsZXQgeyBmaWxlVHlwZSwgaWNvblR5cGUgfSA9IHRoaXMuX2dldEZpbGVBbmRJY29uVHlwZShub2RlKTtcblxuICAgIC8vIGlmICh0aGlzLmlzTGlnaHRib3ggJiYgZmlsZVR5cGUgIT09IFwiaW1hZ2VcIikge1xuICAgIC8vICAgcmV0dXJuIG51bGw7XG4gICAgLy8gfVxuXG4gICAgbGV0IHRodW1ibmFpbFVybCA9IGNsaWVudE1lZGlhUGFnZS5zbWFsbD8udXJsO1xuICAgIGlmKCAhdGh1bWJuYWlsVXJsICkge1xuICAgICAgdGh1bWJuYWlsVXJsID0gY2xpZW50TWVkaWFQYWdlLm1lZGl1bT8udXJsO1xuICAgIH1cbiAgICBpZiggIXRodW1ibmFpbFVybCApIHtcbiAgICAgIHRodW1ibmFpbFVybCA9IGNsaWVudE1lZGlhUGFnZS5vcmlnaW5hbD8udXJsO1xuICAgIH1cbiAgICAvLyBpZiggdGh1bWJuYWlsVXJsICYmICF0aHVtYm5haWxVcmwubWF0Y2goL1xcL3N2YzppaWlmXFwvLykgKSB7XG4gICAgLy8gICB0aHVtYm5haWxVcmwgKz0gJy9zdmM6aWlpZi9mdWxsLyw1MC8wL2RlZmF1bHQuanBnJztcbiAgICAvLyB9XG5cbiAgICBsZXQgdWlQb3NpdGlvbiA9IGNsaWVudE1lZGlhUGFnZS51aVBvc2l0aW9uIHx8IGNsaWVudE1lZGlhUGFnZS5wYWdlO1xuXG4gICAgbGV0IGlkUm9vdCA9IG5vZGVbJ0BpZCddO1xuICAgIGlmKCB0aGlzLmlzTXVsdGltZWRpYSApIHtcbiAgICAgIGlkUm9vdCA9IGNsaWVudE1lZGlhUGFnZVsnQGlkJ10/LnJlcGxhY2UoLyhcXC5bYS16MC05XSspOlxcZCskL2ksICckMScpIHx8IG5vZGVbJ0BpZCddO1xuICAgIH1cbiAgICBsZXQgdGh1bWJuYWlsID0ge1xuICAgICAgLy8gaWQ6IG5vZGVbXCJAaWRcIl0rKCF1aVBvc2l0aW9uIHx8IHVpUG9zaXRpb24gPT09IHVuZGVmaW5lZCA/ICcnIDogJzonK3VpUG9zaXRpb24pLFxuICAgICAgaWQ6IGlkUm9vdCsoIXVpUG9zaXRpb24gPyAnJyA6ICc6Jyt1aVBvc2l0aW9uKSxcbiAgICAgIGljb246IGljb25UeXBlLFxuICAgICAgcG9zaXRpb246IHVpUG9zaXRpb24sXG4gICAgICBzZWxlY3RlZDogdWlQb3NpdGlvbiA9PT0gc2VsZWN0ZWRNZWRpYVBhZ2UsXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICBzcmM6IHRodW1ibmFpbFVybCxcbiAgICAgIC8vIHRodW1ibmFpbDogdXJsXG4gICAgICBtZWRpYVR5cGVcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRodW1ibmFpbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblNlbGVjdGVkUmVjb3JkTWVkaWFVcGRhdGVcbiAgICogQGRlc2NyaXB0aW9uIGZyb20gQXBwU3RhdGVJbnRlcmZhY2UsIGNhbGxlZCB3aGVuIGEgcmVjb3JkcyBtZWRpYSBpcyBzZWxlY3RlZFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbWVkaWFcbiAgICovXG4gIF9vblNlbGVjdGVkUmVjb3JkTWVkaWFVcGRhdGUobWVkaWEpIHtcbiAgICB0aGlzLm1lZGlhID0gbWVkaWE7XG4gICAgaWYgKCFtZWRpYSkgcmV0dXJuO1xuXG4gICAgdGhpcy50aHVtYm5haWxzLmZvckVhY2goKHRodW1ibmFpbCwgaW5kZXgpID0+IHtcbiAgICAgIC8vIHRoaXMuc2V0KGB0aHVtYm5haWxzLiR7aW5kZXh9LnNlbGVjdGVkYCwgKHRoaXMubWVkaWFbJ0BpZCddID09PSB0aHVtYm5haWwuaWQpKTtcbiAgICB9KTtcblxuICAgIGxldCB7IGZpbGVUeXBlLCBpY29uVHlwZSB9ID0gdGhpcy5fZ2V0RmlsZUFuZEljb25UeXBlKG1lZGlhKTtcblxuICAgIHRoaXMuc2hvd09wZW5MaWdodGJveCA9IGZpbGVUeXBlID09PSBcImltYWdlXCIgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBfZ2V0RmlsZUFuZEljb25UeXBlKG1lZGlhKSB7XG4gICAgbGV0IF9maWxlID0gXCJcIjtcbiAgICBsZXQgZmlsZVR5cGUgPSBfZmlsZTtcbiAgICBsZXQgZmlsZUZvcm1hdCA9IF9maWxlO1xuICAgIGxldCBpY29uVHlwZSA9IFwiXCI7XG5cbiAgICBpZiAobWVkaWEuZmlsZUZvcm1hdCB8fCBtZWRpYS5lbmNvZGluZ0Zvcm1hdCkge1xuICAgICAgX2ZpbGUgPSBtZWRpYS5maWxlRm9ybWF0ID8gbWVkaWEuZmlsZUZvcm1hdCA6IG1lZGlhLmVuY29kaW5nRm9ybWF0O1xuXG4gICAgICBmaWxlVHlwZSA9IF9maWxlLnNwbGl0KFwiL1wiKS5zaGlmdCgpO1xuICAgICAgZmlsZUZvcm1hdCA9IF9maWxlLnNwbGl0KFwiL1wiKS5wb3AoKTtcbiAgICB9XG5cbiAgICBsZXQgdHlwZSA9IHV0aWxzLmdldE1lZGlhVHlwZShtZWRpYSk7XG4gICAgaWYgKHR5cGUgPT09IFwiQXVkaW9PYmplY3RcIiB8fCBmaWxlVHlwZSA9PT0gXCJhdWRpb1wiKVxuICAgICAgaWNvblR5cGUgPSBcInNvdW5kLXJvdW5kXCI7XG4gICAgZWxzZSBpZiAoXG4gICAgICB0eXBlID09PSBcIlZpZGVvT2JqZWN0XCIgfHxcbiAgICAgIHR5cGUgPT09IFwiU3RyZWFtaW5nVmlkZW9cIiB8fFxuICAgICAgZmlsZVR5cGUgPT09IFwidmlkZW9cIlxuICAgIClcbiAgICAgIGljb25UeXBlID0gXCJ2aWRlby1yb3VuZFwiO1xuICAgIGVsc2UgaWYgKGZpbGVGb3JtYXQgPT09IFwicGRmXCIpIGljb25UeXBlID0gXCJibGFuay1yb3VuZFwiO1xuICAgIC8vIFRPRE86IEdldCBiYWNrIHRvIHRoaXNcbiAgICBlbHNlIGlmIChmaWxlVHlwZSA9PT0gXCIzNjBcIikgaWNvblR5cGUgPSBcIjM2MC1yb3VuZFwiO1xuXG4gICAgcmV0dXJuIHsgZmlsZVR5cGUsIGljb25UeXBlIH07XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25ab29tSW5DbGlja2VkXG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byB6b29tIGljb24gY2xpY2sgZXZlbnQuICBlbWl0IHpvb20gZXZlbnRcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgSFRNTCBjbGljayBldmVudFxuICAgKi9cbiAgX29uWm9vbUluQ2xpY2tlZChlKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcInpvb20taW5cIikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uWm9vbU91dENsaWNrZWRcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIHpvb20gaWNvbiBjbGljayBldmVudC4gIGVtaXQgem9vbSBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZSBIVE1MIGNsaWNrIGV2ZW50XG4gICAqL1xuICBfb25ab29tT3V0Q2xpY2tlZChlKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcInpvb20tb3V0XCIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbkJSWm9vbUluQ2xpY2tlZFxuICAgKiBAZGVzY3JpcHRpb24gYm91bmQgdG8gYm9va3JlYWRlciB6b29tIGljb24gY2xpY2sgZXZlbnQuICBlbWl0IHpvb20gZXZlbnRcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgSFRNTCBjbGljayBldmVudFxuICAgKi9cbiAgX29uQlJab29tSW5DbGlja2VkKGUpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiYnItem9vbS1pblwiKSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25CUlpvb21PdXRDbGlja2VkXG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byBib29rcmVhZGVyIHpvb20gaWNvbiBjbGljayBldmVudC4gIGVtaXQgem9vbSBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZSBIVE1MIGNsaWNrIGV2ZW50XG4gICAqL1xuICBfb25CUlpvb21PdXRDbGlja2VkKGUpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiYnItem9vbS1vdXRcIikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uVG9nZ2xlQm9va1ZpZXdcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIGJvb2sgdmlldyBzaW5nbGUgdnMgYm9vayBtb2RlIGNsaWNrIGV2ZW50LiAgZW1pdCBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZSBIVE1MIGNsaWNrIGV2ZW50XG4gICAqL1xuICBfb25Ub2dnbGVCb29rVmlldyhlKSB7XG4gICAgLy8gdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcImJyLWJvb2t2aWV3LXRvZ2dsZVwiKSk7ICBcbiAgICB0aGlzLmJyU2luZ2xlUGFnZSA9ICF0aGlzLmJyU2luZ2xlUGFnZTtcbiAgICB0aGlzLkJvb2tSZWFkZXJNb2RlbC5zZXRWaWV3KHRoaXMuYnJTaW5nbGVQYWdlID8gJ3NpbmdsZScgOiAnZG91YmxlJyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25FeHBhbmRCb29rVmlld1xuICAgKiBAZGVzY3JpcHRpb24gYm91bmQgdG8gYm9vayB2aWV3IGZ1bGwgcGFnZSBjbGljayBldmVudC4gIGVtaXQgZXZlbnRcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgSFRNTCBjbGljayBldmVudFxuICAgKi9cbiAgX29uRXhwYW5kQm9va1ZpZXcoZSkge1xuICAgIHRoaXMuQm9va1JlYWRlck1vZGVsLnNldEZ1bGxzY3JlZW4odHJ1ZSk7XG4gICAgLy8gdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcImJyLWV4cGFuZC12aWV3XCIpKTtcbiAgICB0aGlzLmJyRnVsbHNjcmVlbiA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25Db2xsYXBzZUJvb2tWaWV3XG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byBib29rIHZpZXcgZnVsbCBwYWdlIGNvbGxhcHNlIGNsaWNrIGV2ZW50LiAgZW1pdCBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZSBIVE1MIGNsaWNrIGV2ZW50XG4gICAqL1xuICBfb25Db2xsYXBzZUJvb2tWaWV3KGUpIHtcbiAgICB0aGlzLkJvb2tSZWFkZXJNb2RlbC5zZXRGdWxsc2NyZWVuKGZhbHNlKTtcbiAgICAvLyB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiYnItY29sbGFwc2Utdmlld1wiKSk7XG4gICAgdGhpcy5ickZ1bGxzY3JlZW4gPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblNlYXJjaENsaWNrZWRcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIHNlYXJjaCBpY29uIGNsaWNrIGV2ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIEhUTUwgY2xpY2sgZXZlbnRcbiAgICovXG4gIF9vblNlYXJjaENsaWNrZWQoZSkge1xuICAgIHRoaXMuc2VhcmNoaW5nVGV4dCA9ICF0aGlzLnNlYXJjaGluZ1RleHQ7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25DbG9zZUNsaWNrZWRcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIGNsb3NlIGljb24gY2xpY2sgZXZlbnQuICBlbWl0IGNsb3NlIGV2ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIEhUTUwgY2xpY2sgZXZlbnRcbiAgICovXG4gIF9vbkNsb3NlQ2xpY2tlZChlKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcImNsb3NlXCIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldEZvY3VzXG4gICAqIEBkZXNjcmlwdGlvbiBzZXQgZm9jdXMgdG8gZmlyc3QgY2xpY2thYmxlIGVsZW1lbnRcbiAgICovXG4gIHNldEZvY3VzKCkge1xuICAgIGlmICggdGhpcy5zaW5nbGVJbWFnZSAmJiB0aGlzLiQgKSB7XG4gICAgICBpZiggIXRoaXMuYnJlYWtDb250cm9scyApIHRoaXMuJC56b29tT3V0MS5mb2N1cygpO1xuICAgICAgZWxzZSB0aGlzLiQuem9vbU91dDIuZm9jdXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGZpcnN0QnRuID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIik7XG4gICAgICBpZiAoZmlyc3RCdG4pIGZpcnN0QnRuLmZvY3VzKCk7XG4gICAgfVxuICAgIC8vIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblNlYXJjaFRvZ2dsZWRcbiAgICogQGRlc2NyaXB0aW9uIHNob3cvaGlkZSBzZWFyY2ggcGFuZWxcbiAgICovXG4gIF9vblNlYXJjaFRvZ2dsZWQoZSkge1xuICAgIHRoaXMuc2VhcmNoaW5nID0gIXRoaXMuc2VhcmNoaW5nO1xuICAgIHRoaXMuQm9va1JlYWRlck1vZGVsLnNldFNlYXJjaEFjdGl2ZSh0aGlzLnNlYXJjaGluZyk7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcImJyLXNlYXJjaC10b2dnbGVcIikpO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC1tZWRpYS12aWV3ZXItbmF2XCIsIEFwcE1lZGlhVmlld2VyTmF2KTtcbiIsImltcG9ydCB7IGh0bWwgfSBmcm9tIFwibGl0XCI7XG5cbmltcG9ydCB7IHNoYXJlZFN0eWxlcyB9IGZyb20gXCIuLi8uLi8uLi9zdHlsZXMvc2hhcmVkLXN0eWxlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXIoKSB7XG4gIHJldHVybiBodG1sYFxuICAgIDxzdHlsZSBpbmNsdWRlPVwic2hhcmVkLXN0eWxlc1wiPlxuICAgICAgJHtzaGFyZWRTdHlsZXN9IDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG5cbiAgICAgIDpob3N0KFtzaW5nbGUtaW1hZ2VdKSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBwYWRkaW5nOiAwIDhweCA4cHggOHB4O1xuICAgICAgfVxuXG4gICAgICA6aG9zdChbc2luZ2xlLWltYWdlXSkgcGFwZXItaWNvbi1idXR0b24sXG4gICAgICA6aG9zdChbc2luZ2xlLWltYWdlXSkgYXBwLXNoYXJlLWJ0bixcbiAgICAgIDpob3N0IGFwcC1zaGFyZS1idG4sXG4gICAgICA6aG9zdCBwYXBlci1pY29uLWJ1dHRvbiB7XG4gICAgICAgIGZpbGw6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApO1xuICAgICAgfVxuXG4gICAgICBbaGlkZGVuXSB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaW5wdXQge1xuICAgICAgICBwYWRkaW5nOiAxNXB4O1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgd2lkdGg6IDkwJTtcbiAgICAgICAgYm9yZGVyOiAwO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgcGFkZGluZzogMXJlbTtcbiAgICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgaGVpZ2h0OiA2MXB4O1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgICAgZm9udC1mYW1pbHk6IHByb3hpbWEtbm92YSwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBIZWx2ZXRpY2EsIEFyaWFsLFxuICAgICAgICAgIHNhbnMtc2VyaWY7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICB9XG5cbiAgICAgIC5sYXlvdXQge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAvKiBmbGV4LXdyYXA6IHdyYXA7ICovXG4gICAgICAgIHdpZHRoOiA2MCU7XG4gICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDAuN3JlbTtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogNnB4IGRvdHRlZCB2YXIoLS1jb2xvci1hZ2dpZS1nb2xkKTtcbiAgICAgIH1cblxuICAgICAgLmxheW91dC5saWdodGJveCB7XG4gICAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtMzApO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDA7XG4gICAgICAgIGhlaWdodDogNXJlbTtcbiAgICAgIH1cblxuICAgICAgLmxheW91dC5mdWxsc2NyZWVuIHtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgICAgICAgcGFkZGluZy10b3A6IDAuNXJlbTtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICB3aWR0aDogYXV0bztcbiAgICAgIH1cblxuICAgICAgI3RodW1ibmFpbElubmVyQ29udGFpbmVyIHtcbiAgICAgICAgcGFkZGluZy10b3A6IDdweDtcbiAgICAgIH1cblxuICAgICAgI3RodW1ibmFpbHMge1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgfVxuXG4gICAgICAjdGh1bWJuYWlscyA+IGRpdiB7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgICAgICB3aWxsLWNoYW5nZTogbWFyZ2luLWxlZnQ7XG4gICAgICAgIHRyYW5zaXRpb246IG1hcmdpbi1sZWZ0IDI1MG1zIGVhc2Utb3V0O1xuICAgICAgfVxuXG4gICAgICAudGh1bWJuYWlsIHtcbiAgICAgICAgbWFyZ2luOiAwIDVweCA1cHggNnB4O1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIHdpZHRoOiA0OHB4O1xuICAgICAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICAgICAgICBib3JkZXI6IDNweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgIH1cblxuICAgICAgLnRodW1ibmFpbDphY3RpdmUge1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1kZWZhdWx0LXNlY29uZGFyeS1jb2xvcik7XG4gICAgICB9XG5cbiAgICAgIC50aHVtYm5haWw6Zm9jdXMge1xuICAgICAgICBvdXRsaW5lOiB2YXIoLS1kZWZhdWx0LW91dGxpbmUpO1xuICAgICAgfVxuXG4gICAgICAudGh1bWJuYWlsW3NlbGVjdGVkXSB7XG4gICAgICAgIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLWRlZmF1bHQtc2Vjb25kYXJ5LWNvbG9yKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLnRodW1ibmFpbC13cmFwcGVyIHsgcG9zaXRpb246IHJlbGF0aXZlOyB9XG4gICAgICBcbiAgICAgIC50aHVtYm5haWwtd3JhcHBlci5hdWRpbzo6YWZ0ZXIsXG4gICAgICAudGh1bWJuYWlsLXdyYXBwZXIucGRmOjphZnRlciB7IFxuICAgICAgICBjb250ZW50OiAnJzsgXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgXG4gICAgICAgIGluc2V0OiAwOyBcbiAgICAgICAgYmFja2dyb3VuZDogcmdiYSgyLCA0MCwgODEsIDAuNSk7IFxuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTsgXG4gICAgICAgIHotaW5kZXg6IDI7XG4gICAgICAgIG1hcmdpbjogM3B4IDhweCA4cHggOXB4O1xuICAgICAgfVxuICAgICAgLnRodW1ibmFpbC13cmFwcGVyIGEudGh1bWJuYWlsIHsgcG9zaXRpb246IHJlbGF0aXZlOyB6LWluZGV4OiAxOyB9XG5cbiAgICAgIC50aHVtYm5haWwtd3JhcHBlciB1Y2RsaWItaWNvbiB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgXG4gICAgICAgIHRvcDogM3B4OyBcbiAgICAgICAgcmlnaHQ6IDE4cHg7IFxuICAgICAgICB6LWluZGV4OiA1OyBcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7IFxuICAgICAgICBmaWxsOiB3aGl0ZTtcbiAgICAgIH1cblxuICAgICAgdWNkbGliLWljb24ge1xuICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgZmlsbDogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS04MCk7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIH1cblxuICAgICAgI25hdkxlZnQsXG4gICAgICAjbmF2UmlnaHQge1xuICAgICAgICB3aWR0aDogMzZweDtcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgfVxuXG4gICAgICAjbmF2TGVmdCB7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMnJlbTtcbiAgICAgIH1cblxuICAgICAgaXJvbi1pY29uIHtcbiAgICAgICAgc2hhcGUtcmVuZGVyaW5nOiBnZW9tZXRyaWNQcmVjaXNpb24gIWltcG9ydGFudDtcbiAgICAgICAgd2lkdGg6IDI4cHggIWltcG9ydGFudDtcbiAgICAgICAgaGVpZ2h0OiAyOHB4ICFpbXBvcnRhbnQ7XG4gICAgICB9XG5cbiAgICAgIHBhcGVyLWljb24tYnV0dG9uIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWRlZmF1bHQtc2Vjb25kYXJ5LWNvbG9yKTtcbiAgICAgICAgbWluLXdpZHRoOiA0MHB4O1xuICAgICAgfVxuXG4gICAgICBwYXBlci1pY29uLWJ1dHRvbjpmb2N1cyB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDAgIWltcG9ydGFudDtcbiAgICAgIH1cblxuICAgICAgcGFwZXItaWNvbi1idXR0b25bZGlzYWJsZWRdIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWdyYXktdGV4dCk7XG4gICAgICAgIG1pbi13aWR0aDogNDBweDtcbiAgICAgIH1cblxuICAgICAgcGFwZXItaWNvbi1idXR0b25baW52aXNpYmxlXSB7XG4gICAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgIH1cblxuICAgICAgLnpvb20tYnRuc1twYWRdIHtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xuICAgICAgfVxuXG4gICAgICAjYnV0dG9uV3JhcHBlciB7XG4gICAgICAgIHotaW5kZXg6IDUwMDtcbiAgICAgIH1cblxuICAgICAgLmxpZ2h0Ym94ICNidXR0b25XcmFwcGVyIHtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAycmVtO1xuICAgICAgfVxuXG4gICAgICAjYnV0dG9uV3JhcHBlciBkaXYge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTgwKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwLjRyZW07XG4gICAgICB9XG5cbiAgICAgICNidXR0b25XcmFwcGVyIGRpdjpob3ZlcixcbiAgICAgICNidXR0b25XcmFwcGVyIGRpdjpoYXMoPiBhcHAtc2hhcmUtYnRuW3BvcHVwXSkge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlKTtcbiAgICAgIH1cblxuICAgICAgI2J1dHRvbldyYXBwZXIgdWNkbGliLWljb24ge1xuICAgICAgICBmaWxsOiB3aGl0ZTtcbiAgICAgICAgd2lkdGg6IDI1cHg7XG4gICAgICB9XG5cbiAgICAgIC5zZWFyY2gtY29udGFpbmVyIHtcbiAgICAgICAgbWFyZ2luLXRvcDogMC43cmVtO1xuICAgICAgICBtYXJnaW4tbGVmdDogMS4ycmVtO1xuICAgICAgfVxuXG4gICAgICAuc2VhcmNoLWNvbnRhaW5lciBpbnB1dCB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgei1pbmRleDogMTA7XG4gICAgICAgIGxlZnQ6IC0wLjhyZW07XG4gICAgICAgIHdpZHRoOiAxN3JlbTtcbiAgICAgIH1cblxuICAgICAgLnNlYXJjaC1wYWdpbmF0aW9uIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgfVxuXG4gICAgICAjYnV0dG9uV3JhcHBlciBkaXYudGV4dC1zZWFyY2gge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1nb2xkKTtcbiAgICAgIH1cblxuICAgICAgI2J1dHRvbldyYXBwZXIgZGl2LnRleHQtc2VhcmNoIHVjZGxpYi1pY29uIHtcbiAgICAgICAgZmlsbDogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS04MCk7XG4gICAgICB9XG5cbiAgICAgIC5wYWdlLW4tbiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApO1xuICAgICAgfVxuXG4gICAgICB1Y2RsaWItaWNvbi5zaW5nbGUtcGFnZS1ib29rIHtcbiAgICAgICAgd2lkdGg6IDYlICFpbXBvcnRhbnQ7XG4gICAgICAgIGhlaWdodDogNTAlO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRvcDogMjUlO1xuICAgICAgICBsZWZ0OiAxJTtcbiAgICAgIH1cblxuICAgICAgLmJyLXNlYXJjaC1ub24tZnMgZGl2IHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgfVxuXG4gICAgICAuYnItc2VhcmNoLW5vbi1mcyBkaXYuem9vbSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgLyogbWFyZ2luLWxlZnQ6IDI1cHg7ICovXG4gICAgICAgIG1hcmdpbi10b3A6IDVweDtcbiAgICAgIH1cblxuICAgICAgLmJyLXNlYXJjaC1ub24tZnMgZGl2Lnpvb20ge1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB9XG5cbiAgICAgIC5ici1zZWFyY2gtbm9uLWZzIGRpdi56b29tOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gICAgICB9XG5cbiAgICAgIC5ici1zZWFyY2gtbm9uLWZzIHVjZGxpYi1pY29uIHtcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgIGZpbGw6IHdoaXRlO1xuICAgICAgfVxuXG4gICAgICAuYnItc2VhcmNoLW5vbi1mcyAjc2VhcmNoLXByZXYgdWNkbGliLWljb24sXG4gICAgICAuYnItc2VhcmNoLW5vbi1mcyAjc2VhcmNoLW5leHQgdWNkbGliLWljb24ge1xuICAgICAgICBmaWxsOiB2YXIoLS11Y2RsaWItaWNvbi1maWxsLWNvbG9yKTtcbiAgICAgIH1cblxuICAgICAgLmJyLXNlYXJjaC1ub24tZnMgZGl2Lnpvb20uc2VhcmNoaW5nIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtZ29sZCk7XG4gICAgICB9XG5cbiAgICAgIC5ici1zZWFyY2gtbm9uLWZzIGRpdi56b29tLnNlYXJjaGluZyB1Y2RsaWItaWNvbiB7XG4gICAgICAgIGZpbGw6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUpO1xuICAgICAgfVxuXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgICAgICAgLyogbW9iaWxlICovXG4gICAgICAgICNidXR0b25XcmFwcGVyIGRpdi56b29tLWNvbnRyb2xzIHtcbiAgICAgICAgICAvKiBwaW5jaCB0byB6b29tICovXG4gICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvKiB0aGlzIGJyZWFrcyBzb21ldGhpbmcgd2l0aCBib29rcmVhZGVyLCBuZWVkIHRvIHRlc3QgYWdhaW4gaWYgYmVsb3cgaXMgdW5jb21tZW50ZWQgKi9cbiAgICAgICAgLmxheW91dCB7XG4gICAgICAgICAgd2lkdGg6IDkwJTtcbiAgICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBlbmQ7XG4gICAgICAgIH1cbiAgICAgICAgLmxheW91dC5saWdodGJveCB7XG4gICAgICAgICAgaGVpZ2h0OiAxNTBweDtcbiAgICAgICAgfVxuXG4gICAgICAgICN0aHVtYm5haWxzIHtcbiAgICAgICAgICB3aWR0aDogODAlICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLnRvb2x0aXAge1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgLnRvb2x0aXA6aG92ZXI6YmVmb3JlIHtcbiAgICAgICAgY29udGVudDogYXR0cihkYXRhLXRvb2x0aXAtdGV4dCk7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm90dG9tOiA2MHB4O1xuICAgICAgICByaWdodDogNTAlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNTAlKTtcbiAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICB0cmFuc2l0aW9uOiAuMnMgb3BhY2l0eSBlYXNlLW91dDtcbiAgICAgICAgei1pbmRleDogMTA7XG4gICAgICB9XG5cbiAgICAgIC50b29sdGlwLnJpZ2h0LWFsaWduOmhvdmVyOmJlZm9yZSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg4MCUpO1xuICAgICAgfVxuXG4gICAgICAudG9vbHRpcC5sZWZ0LWFsaWduOmhvdmVyOmJlZm9yZSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyMCUpO1xuICAgICAgfVxuXG4gICAgICAudG9vbHRpcDpob3ZlcjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm90dG9tOiA1MHB4O1xuICAgICAgICByaWdodDogMjBweDtcbiAgICAgICAgYm9yZGVyOiA1cHggc29saWQgdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSkgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIHRyYW5zaXRpb246IC4ycyBvcGFjaXR5IGVhc2Utb3V0O1xuICAgICAgfVxuXG4gICAgICAudG9vbHRpcDpob3ZlcjpiZWZvcmUsXG4gICAgICAudG9vbHRpcDpob3ZlcjphZnRlciB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB9XG5cbiAgICAgIC50b29sdGlwOmhhcyg+IGFwcC1zaGFyZS1idG5bcG9wdXBdKTpob3ZlcjpiZWZvcmUsXG4gICAgICAudG9vbHRpcDpoYXMoPiBhcHAtc2hhcmUtYnRuW3BvcHVwXSk6aG92ZXI6YWZ0ZXIge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgfVxuXG4gICAgPC9zdHlsZT5cblxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwibGF5b3V0ICR7dGhpcy5pc0xpZ2h0Ym94ID8gXCJsaWdodGJveFwiIDogXCJcIn0gJHt0aGlzLmJyRnVsbHNjcmVlblxuICAgICAgICA/IFwiZnVsbHNjcmVlblwiXG4gICAgICAgIDogXCJcIn1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpY29uLW5hdlwiIHN0eWxlPVwiZGlzcGxheTogZmxleDsgbWF4LXdpZHRoOiA4MHZ3O1wiPlxuICAgICAgICA8ZGl2IGlkPVwibmF2TGVmdFwiPlxuICAgICAgICAgIDx1Y2RsaWItaWNvblxuICAgICAgICAgICAgaWNvbj1cInVjZGxpYi1kYW1zOmZhLWNoZXZyb24tbGVmdFwiXG4gICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgaWNvbj1cImNoZXZyb24tbGVmdFwiXG4gICAgICAgICAgICBhbHQ9XCJQYWdlIHRodW1ibmFpbHMgbGVmdFwiXG4gICAgICAgICAgICA/ZGlzYWJsZWQ9XCIkeyF0aGlzLnNob3dOYXZMZWZ0fVwiXG4gICAgICAgICAgICA/aGlkZGVuPVwiJHshdGhpcy5zaG93TmF2TGVmdCB8fCB0aGlzLnNpbmdsZUltYWdlIHx8IHRoaXMuaXNCb29rUmVhZGVyfVwiXG4gICAgICAgICAgICBAY2xpY2s9XCIke3RoaXMuX3BhZ2VMZWZ0fVwiPlxuICAgICAgICAgIDwvdWNkbGliLWljb24+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJici1zZWFyY2gtbm9uLWZzXCJcbiAgICAgICAgICAgIHN0eWxlPVwibWluLXdpZHRoOiAzMDBweDtcIlxuICAgICAgICAgICAgP2hpZGRlbj1cIiR7dGhpcy5ickZ1bGxzY3JlZW4gfHwgIXRoaXMuaXNCb29rUmVhZGVyfVwiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cInpvb20gJHt0aGlzLnNlYXJjaGluZyA/IFwic2VhcmNoaW5nXCIgOiBcIlwifSB0b29sdGlwXCJcbiAgICAgICAgICAgICAgQGNsaWNrPVwiJHt0aGlzLl9vblNlYXJjaFRvZ2dsZWR9XCJcbiAgICAgICAgICAgICAgZGF0YS10b29sdGlwLXRleHQ9XCIke3RoaXMuc2VhcmNoaW5nID8gXCJIaWRlIFNlYXJjaCBCb3hcIiA6IFwiU2VhcmNoIEluc2lkZVwifVwiPlxuICAgICAgICAgICAgICA8dWNkbGliLWljb24gaWNvbj1cInVjZGxpYi1kYW1zOmZhLW1hZ25pZnlpbmctZ2xhc3NcIj48L3VjZGxpYi1pY29uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzPVwic2VhcmNoLXBhZ2luYXRpb25cIlxuICAgICAgICAgICAgICA/aGlkZGVuPVwiJHt0aGlzLnNlYXJjaFJlc3VsdHNDb3VudCA9PT0gMH1cIj5cblxuICAgICAgICAgICAgICA8ZGl2IGlkPVwic2VhcmNoLXByZXZcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwicGFkZGluZy1sZWZ0OiAuNXJlbTsgd2lkdGg6IDQwcHg7XCJcbiAgICAgICAgICAgICAgICBAY2xpY2s9XCIke3RoaXMuX3ByZXZTZWFyY2hSZXN1bHR9XCI+XG4gICAgICAgICAgICAgICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS1jYXJldC1sZWZ0XCI+PC91Y2RsaWItaWNvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZWFyY2gtcmVzdWx0c1wiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICAgICAgICBib3R0b206IDFyZW07XG4gICAgICAgICAgICAgICAgICBmb250LXNpemU6IC45cmVtO1xuICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XCI+XG4gICAgICAgICAgICAgICAgJHt0aGlzLnNlbGVjdGVkUmVzdWx0fSAvICR7dGhpcy5zZWFyY2hSZXN1bHRzQ291bnR9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgaWQ9XCJzZWFyY2gtbmV4dFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJwYWRkaW5nLXJpZ2h0OiAuNXJlbTsgd2lkdGg6IDQwcHg7XCJcbiAgICAgICAgICAgICAgICBAY2xpY2s9XCIke3RoaXMuX25leHRTZWFyY2hSZXN1bHR9XCI+XG4gICAgICAgICAgICAgICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS1jYXJldC1yaWdodFwiPjwvdWNkbGliLWljb24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgaWQ9XCJ0aHVtYm5haWxzXCIgP2hpZGRlbj1cIiR7dGhpcy5zaW5nbGVJbWFnZSB8fCAodGhpcy5pc0Jvb2tSZWFkZXIgJiYgIXRoaXMuaXNNdWx0aW1lZGlhKSB8fCB0aGlzLnRodW1ibmFpbHMubGVuZ3RoIDwgMn1cIj5cbiAgICAgICAgICA8ZGl2IGlkPVwidGh1bWJuYWlsSW5uZXJDb250YWluZXJcIj5cbiAgICAgICAgICAgICR7dGhpcy50aHVtYm5haWxzLm1hcCgoaXRlbSwgaW5kZXgpID0+IGh0bWxgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aHVtYm5haWwtd3JhcHBlciAke2l0ZW0ubWVkaWFUeXBlIHx8ICcnfVwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCI+XG4gICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGh1bWJuYWlsICR7aXRlbS5tZWRpYVR5cGUgfHwgJyd9XCJcbiAgICAgICAgICAgICAgICAgIGhyZWY9XCIke2l0ZW0uaWR9XCJcbiAgICAgICAgICAgICAgICAgIGFsdD1cIlBhZ2UgIyR7aW5kZXgrMX1cIlxuICAgICAgICAgICAgICAgICAgP3NlbGVjdGVkPVwiJHtpdGVtLnNlbGVjdGVkfVwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIiR7aXRlbS5pZH1cIlxuICAgICAgICAgICAgICAgICAgbWVkaWEtaWQ9XCIke2l0ZW0uaWR9XCJcbiAgICAgICAgICAgICAgICAgID9kaXNhYmxlZD1cIiR7aXRlbS5kaXNhYmxlZH1cIlxuICAgICAgICAgICAgICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOnVybCgke2l0ZW0uc3JjfSlcIj5cbiAgICAgICAgICAgICAgICAgIDxpcm9uLWljb24gaWNvbj1cImZpbi1pY29uczoke2l0ZW0uaWNvbn1cIiA/aGlkZGVuPVwiJHshaXRlbS5pY29ufVwiPjwvaXJvbi1pY29uPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAke2l0ZW0ubWVkaWFUeXBlID09PSAnYXVkaW8nID8gaHRtbGBcbiAgICAgICAgICAgICAgICAgIDx1Y2RsaWItaWNvbiBcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmYS12b2x1bWUtaGlnaFwiIFxuICAgICAgICAgICAgICAgICAgICBpY29uPVwidWNkbGliLWRhbXM6ZmEtdm9sdW1lLWhpZ2hcIj5cbiAgICAgICAgICAgICAgICAgIDwvdWNkbGliLWljb24+YCA6IGh0bWxgYH1cbiAgICAgICAgICAgICAgICAke2l0ZW0ubWVkaWFUeXBlID09PSAncGRmJyA/IGh0bWxgPHVjZGxpYi1pY29uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaXRlbS1zdGFjay1ibGFua1wiXG4gICAgICAgICAgICAgICAgICAgIGljb249XCJ1Y2RsaWItZGFtczppdGVtLXN0YWNrLWJsYW5rXCI+XG4gICAgICAgICAgICAgICAgICA8L3VjZGxpYi1pY29uPmAgOiBodG1sYGB9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgaWQ9XCJuYXZSaWdodFwiID9oaWRkZW49XCIke3RoaXMuc2luZ2xlSW1hZ2UgfHwgdGhpcy5pc0Jvb2tSZWFkZXJ9XCI+XG4gICAgICAgICAgPHVjZGxpYi1pY29uXG4gICAgICAgICAgICBpY29uPVwidWNkbGliLWRhbXM6ZmEtY2hldnJvbi1yaWdodFwiXG4gICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgaWNvbj1cImNoZXZyb24tcmlnaHRcIlxuICAgICAgICAgICAgYWx0PVwiUGFnZSB0aHVtYm5haWxzIHJpZ2h0XCJcbiAgICAgICAgICAgID9kaXNhYmxlZD1cIiR7IXRoaXMuc2hvd05hdlJpZ2h0fVwiXG4gICAgICAgICAgICA/aGlkZGVuPVwiJHshdGhpcy5zaG93TmF2UmlnaHR9XCJcbiAgICAgICAgICAgIEBjbGljaz1cIiR7dGhpcy5fcGFnZVJpZ2h0fVwiXG4gICAgICAgICAgPlxuICAgICAgICAgIDwvdWNkbGliLWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgc3R5bGU9XCJmbGV4OjFcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJicmVha1wiPjwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBpZD1cImJ1dHRvbldyYXBwZXJcIlxuICAgICAgICBjbGFzcz1cIndyYXBcIlxuICAgICAgICBzdHlsZT1cIndoaXRlLXNwYWNlOiBub3dyYXBcIlxuICAgICAgICA/aGlkZGVuPVwiJHt0aGlzLmlzTGlnaHRib3h9XCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBAY2xpY2s9XCIke3RoaXMuX29uVG9nZ2xlQm9va1ZpZXd9XCIgXG4gICAgICAgICAgY2xhc3M9XCJwYWdlLXRvZ2dsZSB0b29sdGlwICR7dGhpcy5iclNpbmdsZVBhZ2UgPyAndHdvLXBhZ2UnIDogJ3NpbmdsZS1wYWdlJ31cIiBcbiAgICAgICAgICA/aGlkZGVuPVwiJHshdGhpcy5pc0Jvb2tSZWFkZXIgfHwgdGhpcy5oaWRlUGFnZVRvZ2dsZX1cIlxuICAgICAgICAgIGRhdGEtdG9vbHRpcC10ZXh0PVwiJHt0aGlzLmJyU2luZ2xlUGFnZSA/ICdUd28tUGFnZSBWaWV3JyA6ICdTaW5nbGUtUGFnZSBWaWV3J31cIj5cbiAgICAgICAgICA8dWNkbGliLWljb25cbiAgICAgICAgICAgIGljb249XCJ1Y2RsaWItZGFtczpmYS1ib29rLW9wZW5cIlxuICAgICAgICAgICAgP2hpZGRlbj1cIiR7IXRoaXMuYnJTaW5nbGVQYWdlfVwiXG4gICAgICAgICAgPjwvdWNkbGliLWljb24+XG4gICAgICAgICAgPHVjZGxpYi1pY29uXG4gICAgICAgICAgICBpY29uPVwidWNkbGliLWRhbXM6cGFnZS1zaW5nbGVcIlxuICAgICAgICAgICAgP2hpZGRlbj1cIiR7dGhpcy5iclNpbmdsZVBhZ2V9XCJcbiAgICAgICAgICAgIGNsYXNzPVwic2luZ2xlLXBhZ2UtYm9va1wiXG4gICAgICAgICAgPjwvdWNkbGliLWljb24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cInpvb20tY29udHJvbHMgdG9vbHRpcFwiXG4gICAgICAgICAgQGNsaWNrPVwiJHt0aGlzLl9vbkJSWm9vbU91dENsaWNrZWR9XCJcbiAgICAgICAgICA/aGlkZGVuPVwiJHshdGhpcy5ickZ1bGxzY3JlZW59XCJcbiAgICAgICAgICBkYXRhLXRvb2x0aXAtdGV4dD1cIlpvb20gT3V0XCI+XG4gICAgICAgICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS1taW51c1wiPjwvdWNkbGliLWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJ6b29tLWNvbnRyb2xzIHRvb2x0aXBcIlxuICAgICAgICAgIEBjbGljaz1cIiR7dGhpcy5fb25CUlpvb21JbkNsaWNrZWR9XCJcbiAgICAgICAgICA/aGlkZGVuPVwiJHshdGhpcy5ickZ1bGxzY3JlZW59XCJcbiAgICAgICAgICBkYXRhLXRvb2x0aXAtdGV4dD1cIlpvb20gSW5cIiA+XG4gICAgICAgICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS1wbHVzXCI+PC91Y2RsaWItaWNvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIEBjbGljaz1cIiR7dGhpcy5fb25FeHBhbmRCb29rVmlld31cIlxuICAgICAgICAgID9oaWRkZW49XCIkeyF0aGlzLmlzQm9va1JlYWRlciB8fCB0aGlzLmJyRnVsbHNjcmVlbiB8fCB0aGlzLmhpZGVab29tfVwiXG4gICAgICAgICAgY2xhc3M9XCJ0b29sdGlwXCJcbiAgICAgICAgICBkYXRhLXRvb2x0aXAtdGV4dD1cIkZ1bGxzY3JlZW5cIlxuICAgICAgICA+XG4gICAgICAgICAgPHVjZGxpYi1pY29uXG4gICAgICAgICAgICBpY29uPVwidWNkbGliLWRhbXM6ZmEtdXAtcmlnaHQtYW5kLWRvd24tbGVmdC1mcm9tLWNlbnRlclwiXG4gICAgICAgICAgPjwvdWNkbGliLWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgQGNsaWNrPVwiJHt0aGlzLl9vbkNvbGxhcHNlQm9va1ZpZXd9XCJcbiAgICAgICAgICA/aGlkZGVuPVwiJHshdGhpcy5pc0Jvb2tSZWFkZXIgfHwgIXRoaXMuYnJGdWxsc2NyZWVufVwiXG4gICAgICAgICAgY2xhc3M9XCJ0b29sdGlwXCIgZGF0YS10b29sdGlwLXRleHQ9XCJFeGl0IEZ1bGxzY3JlZW5cIj5cbiAgICAgICAgICA8dWNkbGliLWljb25cbiAgICAgICAgICAgIGljb249XCJ1Y2RsaWItZGFtczpmYS1kb3duLWxlZnQtYW5kLXVwLXJpZ2h0LXRvLWNlbnRlclwiXG4gICAgICAgICAgPjwvdWNkbGliLWljb24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBAY2xpY2s9XCIke3RoaXMuX29uWm9vbUluQ2xpY2tlZH1cIlxuICAgICAgICAgID9oaWRkZW49XCIke3RoaXMuaXNCb29rUmVhZGVyIHx8IHRoaXMuaGlkZVpvb219XCJcbiAgICAgICAgICBjbGFzcz1cInRvb2x0aXBcIlxuICAgICAgICAgIGRhdGEtdG9vbHRpcC10ZXh0PVwiRnVsbHNjcmVlblwiXG4gICAgICAgID5cbiAgICAgICAgICA8dWNkbGliLWljb25cbiAgICAgICAgICAgIGljb249XCJ1Y2RsaWItZGFtczpmYS11cC1yaWdodC1hbmQtZG93bi1sZWZ0LWZyb20tY2VudGVyXCJcbiAgICAgICAgICA+PC91Y2RsaWItaWNvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgP2hpZGRlbj1cIiR7dGhpcy5ickZ1bGxzY3JlZW59XCIgY2xhc3M9XCJ0b29sdGlwXCIgZGF0YS10b29sdGlwLXRleHQ9XCJTaGFyZVwiPlxuICAgICAgICAgIDxhcHAtc2hhcmUtYnRuPjwvYXBwLXNoYXJlLWJ0bj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLSB0aGlzIGlzIG1vdmVkIG5leHQgdG8gdGhlIGJvb2tyZWFkZXIgc2xpZGVyIGluIGFwcC1tZWRpYS12aWV3ZXIgaW4gZnVsbCBzY3JlZW4gLS0+XG4gICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImJyLXNlYXJjaFwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cInpvb20gJHt0aGlzLnNlYXJjaGluZyA/IFwic2VhcmNoaW5nXCIgOiBcIlwifVwiXG4gICAgICAgICAgICBAY2xpY2s9XCIke3RoaXMuX29uU2VhcmNoVG9nZ2xlZH1cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDx1Y2RsaWItaWNvbiBpY29uPVwidWNkbGliLWRhbXM6ZmEtbWFnbmlmeWluZy1nbGFzc1wiIGNsYXNzPVwiZnVsbHNjcmVlbi1zZWFyY2hcIj48L3VjZGxpYi1pY29uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwic2VhcmNoLXBhZ2luYXRpb25cIlxuICAgICAgICAgICAgP2hpZGRlbj1cIiR7dGhpcy5zZWFyY2hSZXN1bHRzQ291bnQgPT09IDB9XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGlkPVwic2VhcmNoLXByZXZcIlxuICAgICAgICAgICAgICBzdHlsZT1cInBhZGRpbmctbGVmdDogLjVyZW07IHdpZHRoOiA0MHB4O1wiXG4gICAgICAgICAgICAgIEBjbGljaz1cIiR7dGhpcy5fcHJldlNlYXJjaFJlc3VsdH1cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8dWNkbGliLWljb24gaWNvbj1cInVjZGxpYi1kYW1zOmZhLWNhcmV0LWxlZnRcIj48L3VjZGxpYi1pY29uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgIGNsYXNzPVwic2VhcmNoLXJlc3VsdHNcIlxuICAgICAgICAgICAgICBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgICAgICBib3R0b206IDFyZW07XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAuOXJlbTtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcIlxuICAgICAgICAgICAgICA+JHt0aGlzLnNlbGVjdGVkUmVzdWx0fSAvICR7dGhpcy5zZWFyY2hSZXN1bHRzQ291bnR9PC9zcGFuXG4gICAgICAgICAgICA+XG5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgaWQ9XCJzZWFyY2gtbmV4dFwiXG4gICAgICAgICAgICAgIHN0eWxlPVwicGFkZGluZy1yaWdodDogLjVyZW07IHdpZHRoOiA0MHB4O1wiXG4gICAgICAgICAgICAgIEBjbGljaz1cIiR7dGhpcy5fbmV4dFNlYXJjaFJlc3VsdH1cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8dWNkbGliLWljb24gaWNvbj1cInVjZGxpYi1kYW1zOmZhLWNhcmV0LXJpZ2h0XCI+PC91Y2RsaWItaWNvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj4gLS0+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdlxuICAgICAgICBpZD1cImJ1dHRvbldyYXBwZXJcIlxuICAgICAgICBzdHlsZT1cIndoaXRlLXNwYWNlOiBub3dyYXBcIlxuICAgICAgICA/aGlkZGVuPVwiJHshdGhpcy5pc0xpZ2h0Ym94fVwiXG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cIiR7dGhpcy5zZWFyY2hpbmdUZXh0ID8gXCJ0ZXh0LXNlYXJjaFwiIDogXCJcIn1cIlxuICAgICAgICAgIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIlxuICAgICAgICAgIEBjbGljaz1cIiR7dGhpcy5fb25TZWFyY2hDbGlja2VkfVwiXG4gICAgICAgID5cbiAgICAgICAgICA8dWNkbGliLWljb24gaWNvbj1cInVjZGxpYi1kYW1zOmZhLW1hZ25pZnlpbmctZ2xhc3NcIj48L3VjZGxpYi1pY29uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IEBjbGljaz1cIiR7dGhpcy5fb25ab29tT3V0Q2xpY2tlZH1cIiBjbGFzcz1cInRvb2x0aXBcIiBkYXRhLXRvb2x0aXAtdGV4dD1cIlpvb20gT3V0XCI+XG4gICAgICAgICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS1taW51c1wiPjwvdWNkbGliLWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IEBjbGljaz1cIiR7dGhpcy5fb25ab29tSW5DbGlja2VkfVwiIGNsYXNzPVwidG9vbHRpcFwiIGRhdGEtdG9vbHRpcC10ZXh0PVwiWm9vbSBJblwiPlxuICAgICAgICAgIDx1Y2RsaWItaWNvbiBpY29uPVwidWNkbGliLWRhbXM6ZmEtcGx1c1wiPjwvdWNkbGliLWljb24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgQGNsaWNrPVwiJHt0aGlzLl9vbkNsb3NlQ2xpY2tlZH1cIiBjbGFzcz1cInRvb2x0aXAgbGVmdC1hbGlnblwiIGRhdGEtdG9vbHRpcC10ZXh0PVwiRXhpdCBGdWxsc2NyZWVuXCI+XG4gICAgICAgICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS1kb3duLWxlZnQtYW5kLXVwLXJpZ2h0LXRvLWNlbnRlclwiPjwvdWNkbGliLWljb24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYDtcbn1cbiIsImltcG9ydCB7IExpdEVsZW1lbnQgfSBmcm9tIFwibGl0XCI7XG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2FwcC1tZWRpYS12aWV3ZXIudHBsXCI7XG5pbXBvcnQgeyBNYWluRG9tRWxlbWVudCB9IGZyb20gJ0B1Y2QtbGliL3RoZW1lLWVsZW1lbnRzL3V0aWxzL21peGlucyc7XG5pbXBvcnQgeyBNaXhpbiwgTGl0Q29ya1V0aWxzIH0gZnJvbSAnQHVjZC1saWIvY29yay1hcHAtdXRpbHMnO1xuXG5cbmltcG9ydCBcIkBwb2x5bWVyL2lyb24tcGFnZXNcIjtcblxuaW1wb3J0IFwiLi9hcHAtaW1hZ2Utdmlld2VyXCI7XG4vLyBpbXBvcnQgXCIuL2FwcC0zNjAtaW1hZ2Utdmlld2VyXCJcbmltcG9ydCBcIi4vYXBwLXZpZGVvLXZpZXdlclwiO1xuaW1wb3J0IFwiLi9hcHAtYXVkaW8tdmlld2VyXCI7XG5cbmltcG9ydCBcIi4vYXBwLW1lZGlhLXZpZXdlci1uYXZcIjtcbmltcG9ydCBcIi4vYXBwLWltYWdlLXZpZXdlci1saWdodGJveFwiO1xuXG5pbXBvcnQgXCJAdWNkLWxpYi9jb3JrLWFwcC11dGlsc1wiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi8uLi8uLi8uLi9saWIvdXRpbHNcIjtcblxuaW1wb3J0IFwiLi4vLi4vLi4vY29tcG9uZW50cy9ib29rcmVhZGVyL3VjZGxpYi1ib29rcmVhZGVyLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcE1lZGlhVmlld2VyIGV4dGVuZHMgTWl4aW4oTGl0RWxlbWVudClcbiAgLndpdGgoTWFpbkRvbUVsZW1lbnQsIExpdENvcmtVdGlscykge1xuXG4gIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVkaWFUeXBlOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgdGFsbENvbnRyb2xzOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIGJhZ09mRmlsZXNJbWFnZTogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIGJyRnVsbHNjcmVlbjogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBiclNlYXJjaE9wZW46IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgc2luZ2xlUGFnZTogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBvdmVycmlkZUltYWdlTGlzdDogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBib29rRGF0YTogeyB0eXBlOiBPYmplY3QgfSxcbiAgICAgIGJvb2tJdGVtSWQ6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICBpdGVtSWQ6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICBpc0Jvb2tSZWFkZXI6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgc2VhcmNoUmVzdWx0czogeyB0eXBlOiBBcnJheSB9LFxuICAgICAgc2VhcmNoUmVzdWx0c0NvdW50OiB7IHR5cGU6IE51bWJlciB9LFxuICAgICAgc2VsZWN0ZWRSZXN1bHQ6IHsgdHlwZTogTnVtYmVyIH0sXG4gICAgICBxdWVyeVRlcm06IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICBub01lZGlhOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIGlzTXVsdGltZWRpYTogeyB0eXBlOiBCb29sZWFuIH1cbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLiQgPSB7fTtcbiAgICBcbiAgICB0aGlzLl9pbmplY3RNb2RlbChcIkFwcFN0YXRlTW9kZWxcIiwgXCJSZWNvcmRNb2RlbFwiLCBcIkZjQXBwQ29uZmlnTW9kZWxcIiwgXCJDb2xsZWN0aW9uTW9kZWxcIiwgXCJCb29rUmVhZGVyTW9kZWxcIik7XG4gICAgdGhpcy5fcmVzZXQoKTtcbiAgfVxuXG4gIF9yZXNldCgpIHtcbiAgICB0aGlzLm1lZGlhVHlwZSA9IFwiXCI7XG4gICAgdGhpcy5iYWdPZkZpbGVzSW1hZ2UgPSBcIlwiO1xuICAgIHRoaXMuYnJGdWxsc2NyZWVuID0gZmFsc2U7XG4gICAgdGhpcy5iclNlYXJjaE9wZW4gPSBmYWxzZTtcbiAgICB0aGlzLnNpbmdsZVBhZ2UgPSBmYWxzZTtcbiAgICB0aGlzLmJvb2tEYXRhID0ge307XG4gICAgdGhpcy5ib29rSXRlbUlkID0gXCJcIjtcbiAgICB0aGlzLml0ZW1JZCA9IFwiXCI7XG4gICAgdGhpcy5pc0Jvb2tSZWFkZXIgPSBmYWxzZTtcbiAgICB0aGlzLm92ZXJyaWRlSW1hZ2VMaXN0ID0gZmFsc2U7XG4gICAgdGhpcy5zZWFyY2hSZXN1bHRzID0gW107XG4gICAgdGhpcy5zZWFyY2hSZXN1bHRzQ291bnQgPSAwO1xuICAgIHRoaXMuc2VsZWN0ZWRSZXN1bHQgPSAxO1xuICAgIHRoaXMucXVlcnlUZXJtID0gXCJcIjtcbiAgICB0aGlzLnJlZ2V4UGF0dGVybiA9IC9cXHtcXHtcXHsuKj9cXH1cXH1cXH0vZztcbiAgICB0aGlzLm5vTWVkaWEgPSBmYWxzZTtcbiAgICB0aGlzLmlzTXVsdGltZWRpYSA9IGZhbHNlO1xuICB9XG5cbiAgYXN5bmMgZmlyc3RVcGRhdGVkKCkge1xuICAgIHRoaXMuJC5saWdodGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlnaHRib3hcIik7XG4gICAgaWYgKCF0aGlzLiQubGlnaHRib3gpIHRoaXMuJC5saWdodGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlnaHRib3hcIik7XG5cbiAgICB0aGlzLl9vbkFwcFN0YXRlVXBkYXRlKGF3YWl0IHRoaXMuQXBwU3RhdGVNb2RlbC5nZXQoKSk7XG4gIH1cblxuICBhc3luYyBfb25BcHBTdGF0ZVVwZGF0ZShlKSB7XG4gICAgaWYoIHRoaXMuQXBwU3RhdGVNb2RlbC5sb2NhdGlvbi5wYWdlID09PSAnaXRlbScgKSB0aGlzLl9vblJlbmRlck1lZGlhKGUpO1xuICAgIGlmKCB0aGlzLkFwcFN0YXRlTW9kZWwubG9jYXRpb24ucGFnZSAhPT0gJ2l0ZW0nICkgdGhpcy5fY2xlYXJNZWRpYSgpO1xuICB9XG5cbiAgYXN5bmMgX29uUmVuZGVyTWVkaWEoZSkge1xuICAgIGlmKCAhZS5zZWxlY3RlZFJlY29yZCApIHJldHVybjtcblxuICAgIGxldCByZW5kZXJBc0JyID0gZmFsc2U7XG4gICAgbGV0IG1lZGlhVHlwZTtcbiAgICB0aGlzLm5vTWVkaWEgPSBmYWxzZTtcblxuICAgIGxldCBtZWRpYUdyb3VwcyA9IGUuc2VsZWN0ZWRSZWNvcmQ/LmNsaWVudE1lZGlhPy5tZWRpYUdyb3VwcyB8fCBbXTtcbiAgICBsZXQgc2VsZWN0ZWRNZWRpYUdyb3VwO1xuXG4gICAgbGV0IHZpZGVvTWVkaWEgPSBtZWRpYUdyb3Vwcy5maW5kKG0gPT4gbS5maWxlRm9ybWF0U2ltcGxlID09PSAndmlkZW8nKTtcbiAgICBsZXQgYXVkaW9NZWRpYSA9IG1lZGlhR3JvdXBzLmZpbmQobSA9PiBtLmZpbGVGb3JtYXRTaW1wbGUgPT09ICdhdWRpbycpO1xuICAgIGxldCBpbWFnZUxpc3RNZWRpYSA9IG1lZGlhR3JvdXBzLmZpbmQobSA9PiBtWydAc2hvcnRUeXBlJ10uaW5jbHVkZXMoJ0ltYWdlTGlzdCcpKTtcbiAgICBsZXQgcGRmTWVkaWEgPSBtZWRpYUdyb3Vwcy5maW5kKG0gPT4gbS5maWxlRm9ybWF0U2ltcGxlID09PSAncGRmJyk7XG4gICAgbGV0IGltYWdlTWVkaWEgPSBtZWRpYUdyb3Vwcy5maW5kKG0gPT4gbS5maWxlRm9ybWF0U2ltcGxlID09PSAnaW1hZ2UnIHx8IG1bJ0BzaG9ydFR5cGUnXS5pbmNsdWRlcygnSW1hZ2VPYmplY3QnKSk7XG5cbiAgICAvLyBjb2VyY2UgdG8gYm9vbGVhblxuICAgIHRoaXMuaXNNdWx0aW1lZGlhID0gISEoKGF1ZGlvTWVkaWEgfHwgdmlkZW9NZWRpYSkgJiYgKHBkZk1lZGlhIHx8IGltYWdlTGlzdE1lZGlhIHx8IGltYWdlTWVkaWEpKTtcblxuICAgIGlmICghbWVkaWFHcm91cHMgfHwgIW1lZGlhR3JvdXBzLmxlbmd0aCB8fCAhbWVkaWFHcm91cHMuZmlsdGVyKG0gPT4gbVsnQHR5cGUnXS5sZW5ndGggPiAwKS5sZW5ndGggKSB7XG4gICAgICAvLyB0cnkgdG8gYXQgbGVhc3QgbG9hZCBhIHNpbmdsZSBpbWFnZSBhcyBmYWxsYmFja1xuICAgICAgbGV0IHRodW1ibmFpbFVybCA9IHV0aWxzLmdldFRodW1ibmFpbEZyb21DbGllbnRNZWRpYShlPy5zZWxlY3RlZFJlY29yZD8uY2xpZW50TWVkaWEpO1xuICAgICAgaWYoIHRodW1ibmFpbFVybCApIHtcbiAgICAgICAgdGhpcy5tZWRpYVR5cGUgPSAnaW1hZ2UnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ub01lZGlhID0gdHJ1ZTsgICAgICAgIFxuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcignTm8gcmVjb2duaXplZCB0eXBlcyBmb3VuZCBpbiBtZWRpYSBncm91cHMgZm9yIHJlY29yZCcsIGUuc2VsZWN0ZWRSZWNvcmQ/LmNsaWVudE1lZGlhPy5pZCB8fCBlLnNlbGVjdGVkUmVjb3JkKTsgICAgICBcbiAgICAgIH1cbiAgICAgIHJldHVybjsgXG4gICAgfVxuXG4gICAgLy8gY2hlY2sgZm9yIGFueSBvdmVycmlkZXMgYXQgY29sbGVjdGlvbi9pdGVtIGxldmVsIGZvciB0aGUgaW1hZ2Ugdmlld2VyXG4gICAgdGhpcy5pdGVtSWQgPSBlLnNlbGVjdGVkUmVjb3JkPy5ncmFwaD8ucm9vdD8uWydAaWQnXTtcbiAgICBsZXQgY29sbGVjdGlvbklkID0gZS5zZWxlY3RlZFJlY29yZD8uZ3JhcGg/LnJvb3Q/LmlzUGFydE9mPy5maWx0ZXIocCA9PiBwWydAaWQnXS5pbmNsdWRlcygnL2NvbGxlY3Rpb24vJykpPy5bMF0/LlsnQGlkJ107XG4gICAgbGV0IGRpc3BsYXlUeXBlID0gYXdhaXQgdGhpcy5fZ2V0SXRlbURpc3BsYXlUeXBlKHRoaXMuaXRlbUlkLCBjb2xsZWN0aW9uSWQpO1xuXG4gICAgaWYoIHRoaXMuaXNNdWx0aW1lZGlhICkge1xuICAgICAgdGhpcy5pc0Jvb2tSZWFkZXIgPSBmYWxzZTsgLy8gZm9yIG5vdywgZGlzYWJsZSBib29rcmVhZGVyIGlmIG11bHRpbWVkaWEuLiBha2EgaW1hZ2VsaXN0XG5cbiAgICAgIC8vIG1lZGlhIGRpc3BsYXkgdHlwZXMgdG8gc3VwcG9ydDpcbiAgICAgIC8vIC0gaWYgc2luZ2xlIGltYWdlICsgYXVkaW8gKHJlZ2FyZGxlc3MgaWYgZGlzcGxheSB0eXBlIGlzIHNldCB0byBib29rcmVhZGVyKSwgc2hvdyBuYXYgd2l0aCBhdWRpbyBpY29uIGFuZCBpbWFnZSBpY29uXG4gICAgICAvLyAtIGlmIFBERiAvIGltYWdlbGlzdCArIGF1ZGlvLCBhbmQgaXRlbSBpcyBzZXQgdG8gaW1hZ2VMaXN0IGRpc3BsYXkgdHlwZSwgc2hvdyBuYXYgYmFyIHdpdGggYXVkaW8gaWNvbiBhbmQgaW1hZ2VzXG4gICAgICAvLyAtIGlmIFBERiAvIGltYWdlbGlzdCArIGF1ZGlvLCBhbmQgaXRlbSBpcyBib29rcmVhZGVyIGRpc3BsYXkgdHlwZSwgc2hvdyBuYXYgYmFyIHdpdGggYXVkaW8gaWNvbiBhbmQgaWNvbiBmb3IgcGRmXG4gICAgICAvLyAtIFRPRE8gc3VwcG9ydCB2aWRlbyArIGF1ZGlvL3BkZi9pbWFnZXMgbGF0ZXIuIG5vIGl0ZW1zIGhhdmUgdGhpcyB5ZXRcbiAgICAgIC8vIC0gVE9ETyBpZiBtdWx0aXBsZSBhdWRpby92aWRlbyBmaWxlcywgc2hvdyBuYXYgd2l0aCBtdWx0aXBsZSBpY29ucyBmb3IgZWFjaCBtZWRpYSBmaWxlLiBubyBpdGVtcyBoYXZlIHRoaXMgeWV0XG5cbiAgICAgIGxldCBmaXJzdExvYWQgPSAoZS5sb2NhdGlvbi5mdWxscGF0aCA9PT0gdGhpcy5pdGVtSWQpO1xuXG4gICAgICAvLyBmaXJzdCBsb2FkLCBvcmRlciBhczpcbiAgICAgIC8vIHZpZGVvIC0+IGF1ZGlvIC0+IGJvb2tyZWFkZXIgKGRlcGVuZGluZyBvbiBkaXNwbGF5VHlwZSBwcmVmKSAtPiBpbWFnZShzKVxuICAgICAgaWYoIGZpcnN0TG9hZCApIHtcbiAgICAgICAgaWYoIHZpZGVvTWVkaWEgKSBtZWRpYVR5cGUgPSAndmlkZW8nO1xuICAgICAgICBlbHNlIGlmKCBhdWRpb01lZGlhICkgbWVkaWFUeXBlID0gJ2F1ZGlvJztcbiAgICAgICAgZWxzZSBtZWRpYVR5cGUgPSAnaW1hZ2UnOyAvLyBkZWZhdWx0IGlmIHRoZSBgaXNNdWx0aW1lZGlhYCBmbGFnIGlzIHNldCBidXQgbm8gYXVkaW8vdmlkZW8gZm91bmRcblxuICAgICAgICB0aGlzLm1lZGlhVHlwZSA9IG1lZGlhVHlwZTtcbiAgICAgICAgdGhpcy5ub01lZGlhID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZWxzZSBlLnNlbGVjdGVkUmVjb3JkLnNlbGVjdGVkTWVkaWEgd291bGQgcG9pbnQgdG8gdGhlIHNlbGVjdGVkIG1lZGlhIGZpbGUgZnJvbSB0aGUgdXJsLFxuICAgICAgICAvLyBzbyBuZWVkIHRvIGxvYWQgdGhhdCBzcGVjaWZpYyBtZWRpYSAoYm9va3JlYWRlciBpZiBwZGYpXG4gICAgICAgIGxldCBtZWRpYSA9IGUuc2VsZWN0ZWRSZWNvcmQuc2VsZWN0ZWRNZWRpYTtcbiAgICAgICAgbGV0IHR5cGUgPSB1dGlscy5nZXRNZWRpYVR5cGUobWVkaWEpO1xuICAgICAgICBpZiAodHlwZSAmJiAhc2VsZWN0ZWRNZWRpYUdyb3VwKSB7XG4gICAgICAgICAgbWVkaWFUeXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL29iamVjdC9pLCBcIlwiKTtcbiAgICAgICAgICBzZWxlY3RlZE1lZGlhR3JvdXAgPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBtZWRpYSBkaXNwbGF5IHR5cGVzIHRvIHN1cHBvcnQ6XG4gICAgICAvLyAtIGlmIGF1ZGlvIG9ubHksIHNob3cgYXVkaW8gcGxheWVyIGFuZCBoaWRlIG5hdlxuICAgICAgLy8gLSBpZiBQREYgLyBpbWFnZWxpc3QgLyBzaW5nbGUgaW1hZ2Ugb25seSwgc2hvdyBhcyBjdXJyZW50LCB3aXRoIG5hdiBvbmx5IGZvciBpbWFnZWxpc3QsIGhpZGUgbmF2IGZvciBib29rcmVhZGVyIGFuZCBzaW5nbGUgaW1hZ2VcbiAgICAgIC8vIHRvIGNoZWNrIGZvciBpbWFnZUxpc3QgZmlyc3QsIG90aGVyd2lzZSBkZWZhdWx0IHRvIHBkZiBmb3IgYm9va3JlYWRlclxuICAgICAgc2VsZWN0ZWRNZWRpYUdyb3VwID0gbWVkaWFHcm91cHMuZmlsdGVyKG0gPT4gbVsnQHNob3J0VHlwZSddLmluY2x1ZGVzKCdJbWFnZUxpc3QnKSlbMF07XG4gICAgICBpZiggc2VsZWN0ZWRNZWRpYUdyb3VwICl7XG4gICAgICAgIG1lZGlhVHlwZSA9ICdpbWFnZSc7XG4gICAgICAgIGxldCBoYXNQZGYgPSBtZWRpYUdyb3Vwcy5maWx0ZXIobSA9PiBtLmNsaWVudE1lZGlhPy5wZGYpO1xuICAgICAgICBpZiggaGFzUGRmLmxlbmd0aCApIHJlbmRlckFzQnIgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiggIXNlbGVjdGVkTWVkaWFHcm91cCApIHtcbiAgICAgICAgbWVkaWFHcm91cHMuZm9yRWFjaCgobWVkaWEpID0+IHtcbiAgICAgICAgICBsZXQgdHlwZSA9IHV0aWxzLmdldE1lZGlhVHlwZShtZWRpYSk7XG4gICAgICAgICAgaWYgKHR5cGUgJiYgIXNlbGVjdGVkTWVkaWFHcm91cCkge1xuICAgICAgICAgICAgbWVkaWFUeXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL29iamVjdC9pLCBcIlwiKTtcbiAgICAgICAgICAgIHNlbGVjdGVkTWVkaWFHcm91cCA9IG1lZGlhO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVR5cGUgPT09IFwiaW1hZ2VsaXN0XCIpIHtcbiAgICAgICAgbWVkaWFUeXBlID0gXCJpbWFnZVwiO1xuICAgICAgfSBlbHNlIGlmIChtZWRpYVR5cGUgPT09IFwic3RyZWFtaW5ndmlkZW9cIikge1xuICAgICAgICBtZWRpYVR5cGUgPSBcInZpZGVvXCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVR5cGUgPT09IFwiYmFnb2ZmaWxlc1wiICYmIHNlbGVjdGVkUmVjb3JkTWVkaWEudGh1bWJuYWlsVXJsKSB7XG4gICAgICAgIHRoaXMuYmFnT2ZGaWxlc0ltYWdlID0gc2VsZWN0ZWRSZWNvcmRNZWRpYS50aHVtYm5haWxVcmw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmJhZ09mRmlsZXNJbWFnZSA9IFwiXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5vdmVycmlkZUltYWdlTGlzdCA9IGZhbHNlO1xuXG4gICAgLy8gZGVmYXVsdCB0byBCUiAyIHBhZ2UgaWYgbm8gZGlzcGxheVR5cGUgaXMgc2V0XG4gICAgaWYoIG1lZGlhVHlwZSA9PT0gJ2ltYWdlJyAmJiAhZGlzcGxheVR5cGUgKSB7XG4gICAgICByZW5kZXJBc0JyID0gdHJ1ZTtcbiAgICAgIG1lZGlhVHlwZSA9ICdib29rcmVhZGVyJztcbiAgICAgIHRoaXMuc2luZ2xlUGFnZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiggZGlzcGxheVR5cGUgJiYgZGlzcGxheVR5cGUuaW5jbHVkZXMoJ0ltYWdlIExpc3QnKSAmJiBbJ2ltYWdlJywgJ2Jvb2tyZWFkZXInXS5pbmNsdWRlcyhtZWRpYVR5cGUpICkge1xuICAgICAgcmVuZGVyQXNCciA9IGZhbHNlO1xuICAgICAgbWVkaWFUeXBlID0gJ2ltYWdlJztcbiAgICAgIHRoaXMub3ZlcnJpZGVJbWFnZUxpc3QgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIGRpc3BsYXlUeXBlICYmIGRpc3BsYXlUeXBlLmluY2x1ZGVzKCcxIFBhZ2UnKSAmJiBtZWRpYVR5cGUgPT09ICdpbWFnZScgKSB7XG4gICAgICByZW5kZXJBc0JyID0gdHJ1ZTtcbiAgICAgIG1lZGlhVHlwZSA9ICdib29rcmVhZGVyJztcbiAgICAgIHRoaXMuc2luZ2xlUGFnZSA9IHRydWU7XG4gICAgfSBlbHNlIGlmICggZGlzcGxheVR5cGUgJiYgZGlzcGxheVR5cGUuaW5jbHVkZXMoJzIgUGFnZScpICYmIG1lZGlhVHlwZSA9PT0gJ2ltYWdlJyApIHtcbiAgICAgIHJlbmRlckFzQnIgPSB0cnVlO1xuICAgICAgbWVkaWFUeXBlID0gJ2Jvb2tyZWFkZXInO1xuICAgICAgdGhpcy5zaW5nbGVQYWdlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gc2luZ2xlIHBhZ2UgaW1hZ2VzIHNob3VsZCB1c2Ugbm9ybWFsIGltYWdlIHZpZXdlclxuICAgIGlmKCByZW5kZXJBc0JyICYmIChzZWxlY3RlZE1lZGlhR3JvdXA/LmNsaWVudE1lZGlhPy5wYWdlcz8ubGVuZ3RoID09PSAxIHx8ICFzZWxlY3RlZE1lZGlhR3JvdXA/LmNsaWVudE1lZGlhLnBhZ2VzPy5sZW5ndGgpICkge1xuICAgICAgcmVuZGVyQXNCciA9IGZhbHNlO1xuICAgICAgaWYoIG1lZGlhVHlwZSA9PT0gJ2Jvb2tyZWFkZXInICkgbWVkaWFUeXBlID0gJ2ltYWdlJztcbiAgICB9XG5cbiAgICBpZiggcmVuZGVyQXNCciAmJiB0aGlzLmlzTXVsdGltZWRpYSAmJiBtZWRpYVR5cGUgPT09ICdib29rcmVhZGVyJyApIHtcbiAgICAgIC8vIGlmIG11bHRpbWVkaWEgd2l0aCBib29rcmVhZGVyLCBhbmQgZGlzcGxheSB0eXBlIGlzIGJvb2tyZWFkZXIsXG4gICAgICAvLyB0aGVuIG92ZXJyaWRlIHRvIGltYWdlIHZpZXdlciB0byBzaG93IGltYWdlbGlzdCBpbnN0ZWFkXG4gICAgICByZW5kZXJBc0JyID0gZmFsc2U7XG4gICAgICBtZWRpYVR5cGUgPSAnaW1hZ2UnO1xuICAgIH1cblxuICAgIGlmKCByZW5kZXJBc0JyICkge1xuICAgICAgLy8gaWYgYWRtaW4gcHJlZiBkaXNwbGF5IHNhdmVkIGZvciB0aGlzIGl0ZW0sIHRoZW4gZGVmYXVsdCB0byBzcGVjaWZpYyB2aWV3XG4gICAgICAvLyBlbHNlIHNldCB0byBzaW5nbGUgcGFnZSBtb2RlIGlmIHNjcmVlbiB3aWR0aCA8IDgwMHB4LCBkb3VibGUgaWYgPj0gODAwcHhcbiAgICAgIGxldCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuICAgICAgaWYoIHNjcmVlbldpZHRoIDwgODAwICkge1xuICAgICAgICB0aGlzLnNpbmdsZVBhZ2UgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmKCAhZGlzcGxheVR5cGUgJiYgc2NyZWVuV2lkdGggPj0gODAwICkge1xuICAgICAgICB0aGlzLnNpbmdsZVBhZ2UgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5Cb29rUmVhZGVyTW9kZWwuc2V0U2VsZWN0ZWRCb29rKGUuc2VsZWN0ZWRSZWNvcmQuY2xpZW50TWVkaWEuaWQsIGUuc2VsZWN0ZWRSZWNvcmQpO1xuICAgICAgdGhpcy5Cb29rUmVhZGVyTW9kZWwuc2V0Vmlldyh0aGlzLnNpbmdsZVBhZ2UgPyAnc2luZ2xlJyA6ICdkb3VibGUnKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICByZW5kZXJBc0JyIHx8XG4gICAgICAoIXRoaXMub3ZlcnJpZGVJbWFnZUxpc3QgJiYgc2VsZWN0ZWRNZWRpYUdyb3VwLmNsaWVudE1lZGlhICYmIHNlbGVjdGVkTWVkaWFHcm91cC5jbGllbnRNZWRpYS5wZGYgJiYgIXRoaXMuaXNNdWx0aW1lZGlhKVxuICAgICkge1xuICAgICAgbWVkaWFUeXBlID0gXCJib29rcmVhZGVyXCI7XG4gICAgICB0aGlzLmlzQm9va1JlYWRlciA9IHRydWU7XG4gICAgICBsZXQgYnJEYXRhO1xuICAgICAgaWYgKHJlbmRlckFzQnIgJiYgIXNlbGVjdGVkTWVkaWFHcm91cC5jbGllbnRNZWRpYT8ucGRmPy5tYW5pZmVzdCkge1xuICAgICAgICB0aGlzLmJvb2tEYXRhID0gdXRpbHMuYnVpbGRJYVJlYWRlclBhZ2VzKFxuICAgICAgICAgIHNlbGVjdGVkTWVkaWFHcm91cC5oYXNQYXJ0IHx8IHNlbGVjdGVkTWVkaWFHcm91cCxcbiAgICAgICAgICBlLnNlbGVjdGVkUmVjb3JkPy5jbGllbnRNZWRpYT8uaW5kZXhcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IGUuc2VsZWN0ZWRSZWNvcmQuY2xpZW50TWVkaWEubG9hZE1hbmlmZXN0cygpO1xuICAgICAgICAvLyBqdXN0IGluIGNhc2UgcGRmIGlzbid0IHJvb3QgbWVkaWFHcm91cFxuICAgICAgICBlLnNlbGVjdGVkUmVjb3JkLmNsaWVudE1lZGlhLm1lZGlhR3JvdXBzLmZvckVhY2goKG1lZGlhKSA9PiB7XG4gICAgICAgICAgaWYoIG1lZGlhLmNsaWVudE1lZGlhPy5wZGYgJiYgbWVkaWEuY2xpZW50TWVkaWE/LnBhZ2VzICkge1xuICAgICAgICAgICAgdGhpcy5ib29rRGF0YSA9IHsgcGFnZXMgOiBtZWRpYS5jbGllbnRNZWRpYS5wYWdlcyB9O1xuICAgICAgICAgICAgdGhpcy5tZWRpYVR5cGUgPSBcImJvb2tyZWFkZXJcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5ib29rSXRlbUlkID0gc2VsZWN0ZWRNZWRpYUdyb3VwW1wiQGlkXCJdO1xuXG4gICAgICAvLyBUT0RPIGNhbiB0aGlzIGJlIHJlbW92ZWQgc2luY2Ugd2Ugc3dpdGNoZWQgdG8gbG9hZE1hbmlmZXN0cygpID9cbiAgICAgIGlmIChickRhdGEgJiYgYnJEYXRhLmJvZHkpIHtcbiAgICAgICAgdGhpcy5tZWRpYVR5cGUgPSBcImJvb2tyZWFkZXJcIjtcbiAgICAgICAgdGhpcy5ib29rRGF0YSA9XG4gICAgICAgICAgdHlwZW9mIGJyRGF0YS5ib2R5ID09PSBcInN0cmluZ1wiXG4gICAgICAgICAgICA/IEpTT04ucGFyc2UoYnJEYXRhLmJvZHkpXG4gICAgICAgICAgICA6IGJyRGF0YS5ib2R5O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzQm9va1JlYWRlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMubWVkaWFUeXBlID0gbWVkaWFUeXBlO1xuICAgIHRoaXMubm9NZWRpYSA9IGZhbHNlO1xuICB9XG5cbiAgYXN5bmMgX2dldEl0ZW1EaXNwbGF5VHlwZShpdGVtSWQsIGNvbGxlY3Rpb25JZCkge1xuICAgIGlmKCAhY29sbGVjdGlvbklkICkgcmV0dXJuO1xuXG4gICAgbGV0IGVkaXRzO1xuICAgIHRyeSB7XG4gICAgICBlZGl0cyA9IGF3YWl0IHRoaXMuQ29sbGVjdGlvbk1vZGVsLmdldENvbGxlY3Rpb25FZGl0cyhjb2xsZWN0aW9uSWQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKCdFcnJvciByZXRyaWV2aW5nIGNvbGxlY3Rpb24gZWRpdHMnLCBlcnJvcik7XG4gICAgfVxuXG4gICAgaWYoIGVkaXRzLnN0YXRlICE9PSAnbG9hZGVkJyApIHJldHVybiBudWxsO1xuICAgIGlmKCAhT2JqZWN0LmtleXMoZWRpdHMucGF5bG9hZCkubGVuZ3RoICkgcmV0dXJuIG51bGw7XG5cbiAgICBsZXQgY29sbGVjdGlvbkVkaXRzID0gZWRpdHMucGF5bG9hZD8uY29sbGVjdGlvbiB8fCB7fTtcbiAgICBsZXQgaXRlbUVkaXRzID0gZWRpdHMucGF5bG9hZD8uaXRlbXMgfHwge307XG5cbiAgICByZXR1cm4gaXRlbUVkaXRzW2l0ZW1JZF0/Lml0ZW1EZWZhdWx0RGlzcGxheSB8fCBjb2xsZWN0aW9uRWRpdHMuaXRlbURlZmF1bHREaXNwbGF5O1xuICB9XG5cbiAgX2NsZWFyTWVkaWEoKSB7XG4gICAgbGV0IGltYWdlVmlld2VyID0gdGhpcy5xdWVyeVNlbGVjdG9yKFwiYXBwLWltYWdlLXZpZXdlclwiKTtcbiAgICAvLyBsZXQgYm9va3JlYWRlclZpZXdlciA9IHRoaXMucXVlcnlTZWxlY3RvcihcImFwcC1ib29rcmVhZGVyLXZpZXdlclwiKTsgICAgXG5cbiAgICBpZiggaW1hZ2VWaWV3ZXIgKSBpbWFnZVZpZXdlci5kZXN0cm95KCk7XG4gICAgLy8gaWYoIGJvb2tyZWFkZXJWaWV3ZXIgKSBib29rcmVhZGVyVmlld2VyLmRlc3Ryb3koKTtcbiAgICB0aGlzLm5vTWVkaWEgPSBmYWxzZTtcblxuICAgIHRoaXMuX29uQ29sbGFwc2VCb29rVmlldygpO1xuICAgIHRoaXMuX3Jlc2V0KCk7XG4gIH1cblxuICBfb25TZWFyY2hSZXN1bHRzQ2hhbmdlKHJlc3VsdHNCeVBhZ2U9e30pIHtcbiAgICBsZXQgcmVzdWx0cyA9IFtdO1xuICAgIGZvciggbGV0IHBhZ2UgaW4gcmVzdWx0c0J5UGFnZSApIHtcbiAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdCguLi5yZXN1bHRzQnlQYWdlW3BhZ2VdKTtcbiAgICB9XG4gICAgdGhpcy5zZWFyY2hSZXN1bHRzID0gcmVzdWx0cztcblxuICAgIGlmICh0aGlzLnNlYXJjaFJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnNlYXJjaFJlc3VsdHMuc29ydChcbiAgICAgICAgKGEsIGIpID0+XG4gICAgICAgICAgcGFyc2VJbnQoYT8ucGFnZSB8fCAwKSAtXG4gICAgICAgICAgcGFyc2VJbnQoYj8ucGFnZSB8fCAwKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlYXJjaFJlc3VsdHNDb3VudCA9IHRoaXMuc2VhcmNoUmVzdWx0cz8ubGVuZ3RoO1xuICAgIHRoaXMuX3VwZGF0ZVNlYXJjaE5hdigpO1xuXG5cbiAgICBsZXQgYnIgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ3VjZGxpYi1ib29rcmVhZGVyJyk7XG4gICAgaWYoIGJyICkgYnIudXBkYXRlU2VhcmNoUmVzdWx0cyh0aGlzLnNlYXJjaFJlc3VsdHMpO1xuICB9XG5cbiAgX3VwZGF0ZVNlYXJjaE5hdigpIHtcbiAgICBpZiggIXRoaXMuYnJGdWxsc2NyZWVuICkgcmV0dXJuO1xuICAgIFxuICAgIGxldCBzZWFyY2hQYWdpbmF0aW9uID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLXBhZ2luYXRpb24nKTtcbiAgICBpZiggIXNlYXJjaFBhZ2luYXRpb24gKSByZXR1cm47XG4gICAgXG4gICAgLy8gc2hvdy9oaWRlIG5hdiBiYXNlZCBvbiBzZWFyY2ggcmVzdWx0c1xuICAgIGlmKCAhdGhpcy5zZWFyY2hSZXN1bHRzLmxlbmd0aCApIHtcbiAgICAgIHNlYXJjaFBhZ2luYXRpb24uc2V0QXR0cmlidXRlKCdoaWRkZW4nLCAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlYXJjaFBhZ2luYXRpb24ucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcblxuICAgICAgLy8gdXBkYXRlIGxhYmVsIG9mIHNlbGVjdGVkIHJlc3VsdCBhbmQgbWF4IHJlc3VsdHNcbiAgICAgIHNlYXJjaFBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnNlYXJjaC1yZXN1bHRzJykuaW5uZXJUZXh0ID0gYCR7dGhpcy5zZWxlY3RlZFJlc3VsdH0gLyAke3RoaXMuc2VhcmNoUmVzdWx0c0NvdW50fWA7XG4gICAgfVxuICB9XG5cbiAgX29uU2VhcmNoUmVzdWx0Q2xpY2soZSkge1xuICAgIGxldCBwYWdlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ/LnBhZ2UgfHwgMTtcbiAgICB0cnkge1xuICAgICAgcGFnZSA9IHBhcnNlSW50KHBhZ2UpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHBhZ2UgPSAxO1xuICAgIH1cblxuICAgIGxldCBzZWFyY2hSZXN1bHQgPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZGF0YXNldD8uYXJyYXlJbmRleCkgfHwgMDtcblxuICAgIHRoaXMuQm9va1JlYWRlck1vZGVsLnNldFBhZ2UocGFnZS0xKTtcbiAgICB0aGlzLkJvb2tSZWFkZXJNb2RlbC5zZXRTZWxlY3RlZFNlYXJjaFJlc3VsdChzZWFyY2hSZXN1bHQpO1xuICAgIFxuICAgIC8vIGFsc28gdXBkYXRlIHNlbGVjdGVkIHNlYXJjaCByZXN1bHQgaW4gbmF2XG4gICAgbGV0IG5hdiA9IHRoaXMucXVlcnlTZWxlY3RvcihcImFwcC1tZWRpYS12aWV3ZXItbmF2XCIpO1xuICAgIGlmICghbmF2KSByZXR1cm47XG4gICAgdGhpcy5zZWxlY3RlZFJlc3VsdCA9XG4gICAgICBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuYXR0cmlidXRlc1tcImRhdGEtYXJyYXktaW5kZXhcIl0udmFsdWUpICsgMTtcblxuICAgIG5hdi5zZWxlY3RlZFJlc3VsdCA9IHRoaXMuc2VsZWN0ZWRSZXN1bHQ7XG4gICAgdGhpcy5fdXBkYXRlU2VhcmNoTmF2KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25ab29tSW5cbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIHpvb20gZXZlbnQgaW4gYXBwLW1lZGlhLXZpZXdlci1uYXYuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIGN1c3RvbSBIVE1MIGV2ZW50XG4gICAqL1xuICBfb25ab29tSW4oZSkge1xuICAgIHRoaXMuQXBwU3RhdGVNb2RlbC5zZXQoeyBzaG93TGlnaHRib3g6IHRydWUgfSk7XG4gICAgdGhpcy4kLmxpZ2h0Ym94LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbkJSWm9vbUluXG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byBib29rcmVhZGVyIHpvb20gZXZlbnQgaW4gYXBwLW1lZGlhLXZpZXdlci1uYXYuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIGN1c3RvbSBIVE1MIGV2ZW50XG4gICAqL1xuICBfb25CUlpvb21JbihlKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNib29rcmVhZGVyXCIpLl96b29tSW4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbkJSWm9vbU91dFxuICAgKiBAZGVzY3JpcHRpb24gYm91bmQgdG8gYm9va3JlYWRlciB6b29tIGV2ZW50IG91dCBhcHAtbWVkaWEtdmlld2VyLW5hdi5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgY3VzdG9tIEhUTUwgZXZlbnRcbiAgICovXG4gIF9vbkJSWm9vbU91dChlKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNib29rcmVhZGVyXCIpLl96b29tT3V0KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25DaGFuZ2VTZWFyY2hSZXN1bHRcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIGJvb2tyZWFkZXIgc2VhcmNoIHJlc3VsdCBjaGFuZ2UgZXZlbnQgYXBwLW1lZGlhLXZpZXdlci1uYXYuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIGN1c3RvbSBIVE1MIGV2ZW50XG4gICAqL1xuICBfb25DaGFuZ2VTZWFyY2hSZXN1bHQoZSkge1xuICAgIHRoaXMuc2VsZWN0ZWRSZXN1bHQgPSBlLmRldGFpbD8uc2VsZWN0ZWRSZXN1bHQ7XG5cbiAgICB0aGlzLkJvb2tSZWFkZXJNb2RlbC5zZXRQYWdlKCh0aGlzLnNlYXJjaFJlc3VsdHNbdGhpcy5zZWxlY3RlZFJlc3VsdC0xXT8ucGFnZSB8fCAxKSAtIDEpO1xuICAgIHRoaXMuQm9va1JlYWRlck1vZGVsLnNldFNlbGVjdGVkU2VhcmNoUmVzdWx0KHRoaXMuc2VsZWN0ZWRSZXN1bHQtMSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblRvZ2dsZUJvb2tWaWV3XG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byBib29rIHZpZXcgc2luZ2xlIHZzIGJvb2sgbW9kZSBldmVudCBpbiBhcHAtbWVkaWEtdmlld2VyLW5hdi5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgY3VzdG9tIEhUTUwgZXZlbnRcbiAgICovXG4gIF9vblRvZ2dsZUJvb2tWaWV3KGUpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Jvb2tyZWFkZXJcIikuX3RvZ2dsZUJvb2tWaWV3KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25FeHBhbmRCb29rVmlld1xuICAgKiBAZGVzY3JpcHRpb24gYm91bmQgdG8gYm9vayB2aWV3IGZ1bGwgcGFnZSBldmVudCBpbiBhcHAtbWVkaWEtdmlld2VyLW5hdi5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgY3VzdG9tIEhUTUwgZXZlbnRcbiAgICovXG4gIF9vbkV4cGFuZEJvb2tWaWV3KGUpIHtcbiAgICB0aGlzLmJyRnVsbHNjcmVlbiA9IHRydWU7XG5cbiAgICAvLyByZXNpemUgYm9va3JlYWRlciB0byBmaXQgZnVsbCBzY3JlZW5cbiAgICBsZXQgYnIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidWNkbGliLWJvb2tyZWFkZXJcIik7XG4gICAgaWYoICFiciApIHJldHVybjtcblxuICAgIC8vIGhpZGUgc2Nyb2xsYmFyc1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gIH1cblxuICBfcHJldlNlYXJjaFJlc3VsdChlKSB7XG4gICAgbGV0IG1lZGlhTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImFwcC1tZWRpYS12aWV3ZXItbmF2XCIpO1xuICAgIGlmKCBtZWRpYU5hdiApIG1lZGlhTmF2Ll9wcmV2U2VhcmNoUmVzdWx0KCk7XG4gICAgdGhpcy5fdXBkYXRlU2VhcmNoTmF2KCk7XG4gIH1cblxuICBfbmV4dFNlYXJjaFJlc3VsdChlKSB7XG4gICAgbGV0IG1lZGlhTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImFwcC1tZWRpYS12aWV3ZXItbmF2XCIpO1xuICAgIGlmKCBtZWRpYU5hdiApIG1lZGlhTmF2Ll9uZXh0U2VhcmNoUmVzdWx0KCk7XG4gICAgdGhpcy5fdXBkYXRlU2VhcmNoTmF2KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25Db2xsYXBzZUJvb2tWaWV3XG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byBib29rIHZpZXcgZnVsbCBwYWdlIGNvbGxhcHNlIGV2ZW50IGluIGFwcC1tZWRpYS12aWV3ZXItbmF2LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZSBjdXN0b20gSFRNTCBldmVudFxuICAgKi9cbiAgX29uQ29sbGFwc2VCb29rVmlldyhlKSB7XG4gICAgdGhpcy5ickZ1bGxzY3JlZW4gPSBmYWxzZTtcblxuICAgIC8vIHJlc2l6ZSBib29rcmVhZGVyIHRvIGZpdCBmdWxsIHNjcmVlblxuICAgIGxldCBiciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1Y2RsaWItYm9va3JlYWRlclwiKTtcbiAgICBpZiggIWJyICkgcmV0dXJuO1xuXG4gICAgYnIubWF4SGVpZ2h0ID0gNjM0O1xuXG4gICAgLy8gYWxsb3cgc2Nyb2xsXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiXCI7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gXCJcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblRvZ2dsZUJSU2VhcmNoXG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byBib29rIHZpZXcgc2VhcmNoIGJ1dHRvbiBjbGljayBldmVudCBpbiBhcHAtbWVkaWEtdmlld2VyLW5hdi5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgY3VzdG9tIEhUTUwgZXZlbnRcbiAgICovXG4gIF9vblRvZ2dsZUJSU2VhcmNoKGUpIHtcbiAgICB0aGlzLmJyU2VhcmNoT3BlbiA9ICF0aGlzLmJyU2VhcmNoT3BlbjtcbiAgICBsZXQgYnJOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYXBwLW1lZGlhLXZpZXdlci1uYXZcIik7XG4gICAgaWYgKGJyTmF2KSB7XG4gICAgICAvLyBuYXYgZWxlbWVudHMgYXJlIG1vdmVkIGludG8gdGhlIGJvb2tyZWFkZXIgdmlld2VyIGluIGZ1bGwgc2NyZWVuIG1vZGVcbiAgICAgIGJyTmF2LnNlYXJjaGluZyA9IHRoaXMuYnJTZWFyY2hPcGVuO1xuICAgIH1cbiAgICB0aGlzLkJvb2tSZWFkZXJNb2RlbC5zZXRTZWFyY2hBY3RpdmUodGhpcy5iclNlYXJjaE9wZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uVG9nZ2xlQlJTZWFyY2hcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIGJvb2sgdmlldyBzZWFyY2ggZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIGN1c3RvbSBIVE1MIGV2ZW50XG4gICAqL1xuICBhc3luYyBfb25CUlNlYXJjaChlKSB7XG4gICAgdGhpcy5Cb29rUmVhZGVyTW9kZWwuc2V0U2VsZWN0ZWRTZWFyY2hSZXN1bHQoMCk7XG4gICAgbGV0IGJyTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImFwcC1tZWRpYS12aWV3ZXItbmF2XCIpO1xuICAgIGlmIChick5hdikge1xuICAgICAgLy8gbmF2IGVsZW1lbnRzIGFyZSBtb3ZlZCBpbnRvIHRoZSBib29rcmVhZGVyIHZpZXdlciBpbiBmdWxsIHNjcmVlbiBtb2RlXG4gICAgICBick5hdi5iclNlYXJjaCA9IHRydWU7XG4gICAgICBick5hdi5zZWxlY3RlZFJlc3VsdCA9IDE7XG4gICAgICBick5hdi5zZWFyY2hSZXN1bHRzID0gW107XG4gICAgfVxuXG4gICAgdGhpcy5xdWVyeVRlcm0gPSBlLmN1cnJlbnRUYXJnZXQudmFsdWU7XG4gICAgaWYgKCF0aGlzLnF1ZXJ5VGVybSkge1xuICAgICAgdGhpcy5zZWFyY2hSZXN1bHRzID0gW107XG4gICAgICB0aGlzLnNlYXJjaFJlc3VsdHNDb3VudCA9IDA7XG4gICAgICB0aGlzLkJvb2tSZWFkZXJNb2RlbC5jbGVhclNlYXJjaCgpO1xuICAgIH1cblxuICAgIGlmKCB0aGlzLml0ZW1JZCAmJiB0aGlzLmJvb2tJdGVtSWQgJiYgdGhpcy5xdWVyeVRlcm0gKSB7XG4gICAgICB0aGlzLkJvb2tSZWFkZXJNb2RlbC5zZWFyY2godGhpcy5pdGVtSWQsIHRoaXMuYm9va0l0ZW1JZCwgdGhpcy5xdWVyeVRlcm0pO1xuICAgIH1cbiAgfVxuXG4gIF9vbkJvb2tyZWFkZXJTdGF0ZVVwZGF0ZShlKSB7XG4gICAgZS5mdWxsc2NyZWVuID8gdGhpcy5fb25FeHBhbmRCb29rVmlldygpIDogdGhpcy5fb25Db2xsYXBzZUJvb2tWaWV3KCk7XG4gICAgZS5zZWFyY2hBY3RpdmUgPyB0aGlzLmJyU2VhcmNoT3BlbiA9IHRydWUgOiB0aGlzLmJyU2VhcmNoT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0ZWRSZXN1bHQgPSBlLnNlbGVjdGVkU2VhcmNoUmVzdWx0ICsgMTtcblxuICAgIGxldCBzZWFyY2hSZXN1bHRzID0ge307XG4gICAgaWYoIGUuc2VhcmNoUmVzdWx0cz8uc3RhdGUgPT09ICdsb2FkZWQnICkge1xuICAgICAgc2VhcmNoUmVzdWx0cyA9IGUuc2VhcmNoUmVzdWx0cy5wYXlsb2FkO1xuICAgIH1cbiAgICB0aGlzLl9vblNlYXJjaFJlc3VsdHNDaGFuZ2Uoc2VhcmNoUmVzdWx0cyk7XG4gIH1cblxuICBfb25DbGVhclNlYXJjaChlKSB7XG4gICAgbGV0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNici1zZWFyY2gtaW5wdXRcIik7XG4gICAgaWYgKHNlYXJjaElucHV0KSB7XG4gICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgfVxuXG4gICAgdGhpcy5zZWFyY2hSZXN1bHRzID0gW107XG4gICAgdGhpcy5zZWFyY2hSZXN1bHRzQ291bnQgPSAwO1xuICAgIHRoaXMuX29uQlJTZWFyY2goeyBjdXJyZW50VGFyZ2V0OiB7IHZhbHVlOiBcIlwiIH0gfSk7XG5cbiAgICB0aGlzLmJyU2VhcmNoT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuQm9va1JlYWRlck1vZGVsLnNldFNlYXJjaEFjdGl2ZShmYWxzZSk7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYXBwLW1lZGlhLXZpZXdlclwiLCBBcHBNZWRpYVZpZXdlcik7XG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSBcImxpdFwiO1xuaW1wb3J0IHsgdW5zYWZlSFRNTCB9IGZyb20gXCJsaXQvZGlyZWN0aXZlcy91bnNhZmUtaHRtbC5qc1wiO1xuXG5pbXBvcnQgbGlzdHNDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvMl9iYXNlX2NsYXNzL19saXN0cy5jc3NcIjtcbmltcG9ydCBpbmRleENzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy8yX2Jhc2VfY2xhc3MvX2luZGV4LmNzc1wiO1xuaW1wb3J0IGZvcm1zSHRtbENzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy8xX2Jhc2VfaHRtbC9fZm9ybXMuY3NzXCI7XG5pbXBvcnQgZm9ybXNDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvMl9iYXNlX2NsYXNzL19mb3Jtcy5jc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyKCkge1xuICByZXR1cm4gaHRtbGBcbiAgICA8c3R5bGU+XG4gICAgICAke2xpc3RzQ3NzfSAke2luZGV4Q3NzfSAke2Zvcm1zSHRtbENzc30gJHtmb3Jtc0Nzc30gOmhvc3Qge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgfVxuXG4gICAgICBbaGlkZGVuXSB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgIH1cblxuICAgICAgLndyYXBwZXIge1xuICAgICAgICAvKiBkaXNwbGF5OiBmbGV4OyAqL1xuICAgICAgICAvKiBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyAqL1xuICAgICAgICAvKiBtaW4taGVpZ2h0OjI1MHB4OyAqL1xuICAgICAgfVxuXG4gICAgICAjYmFnb2ZmaWxlcyB7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIH1cblxuICAgICAgI2JhZ29mZmlsZXMgaXJvbi1pY29uIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgbWF4LXdpZHRoOiAxNTBweDtcbiAgICAgICAgbWF4LWhlaWdodDogMTUwcHg7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1jb2xvci1ncmV5KTtcbiAgICAgIH1cblxuICAgICAgaW1nIHtcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAvKiBhcHAtYm9va3JlYWRlci12aWV3ZXIuZnVsbHNjcmVlbiB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgIHBhZGRpbmc6IDBweDtcbiAgICAgICAgbWFyZ2luOiAwcHg7XG4gICAgICAgIHRvcDogMHB4O1xuICAgICAgICBsZWZ0OiAwcHg7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHotaW5kZXg6IDMwMDA7XG4gICAgICB9ICovXG5cbiAgICAgICNici1zZWFyY2gtaW5wdXQsXG4gICAgICAjYnItc2VhcmNoLWlucHV0OmZvY3VzIHtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgfVxuXG4gICAgICAuc2VhcmNoLXNpZGUtcGFuZWwgLm92ZXJmbG93Ojotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICAgIHdpZHRoOiAxMHB4O1xuICAgICAgfVxuICAgICAgLnNlYXJjaC1zaWRlLXBhbmVsIC5vdmVyZmxvdzo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvci1hZ2dpZS1nb2xkLTcwKTtcbiAgICAgICAgLyogYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1jb2xvci1hZ2dpZS1nb2xkLTcwKTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiA0cHggc29saWQgdmFyKC0tY29sb3ItYWdnaWUtZ29sZC03MCk7ICovXG4gICAgICB9XG4gICAgICAuc2VhcmNoLXNpZGUtcGFuZWwgLm92ZXJmbG93W25vLW92ZXJmbG93XTo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgfVxuICAgICAgLnNlYXJjaC1zaWRlLXBhbmVsIC5vdmVyZmxvdzo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yLWFnZ2llLWdvbGQpO1xuICAgICAgfVxuXG4gICAgICAvKiBiYXNpYyBzdXBwb3J0IGZvciBGRi4gQ2hyb21lL1NhZmFyaSBzaG91bGQgc3VwcG9ydCAtd2Via2l0IHN0eWxlcyBhYm92ZSAqL1xuICAgICAgQHN1cHBvcnRzIChzY3JvbGxiYXItY29sb3I6IHJlZCBibHVlKSB7XG4gICAgICAgIC5zZWFyY2gtc2lkZS1wYW5lbCAqIHtcbiAgICAgICAgICBzY3JvbGxiYXItY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWdvbGQpIHZhcigtLWNvbG9yLWFnZ2llLWdvbGQtNzApO1xuICAgICAgICAgIHNjcm9sbGJhci13aWR0aDogdGhpbjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAuc2VhcmNoLXJlc3VsdCAuc2VhcmNoZWQtdGVybSB7XG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWNvbG9yLXJlZGJ1ZCk7XG4gICAgICAgIHBhZGRpbmc6IDFweCA0cHg7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1jb2xvci1yZWRidWQpO1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIH1cblxuICAgICAgLnNlYXJjaC1zaWRlLXBhbmVsLm9mZi1jYW52YXMtLWxlZnQge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwNSUpO1xuICAgICAgfVxuXG4gICAgICAuc2VhcmNoLXNpZGUtcGFuZWwge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMS44cmVtO1xuICAgICAgICB3aWR0aDogMzUwcHg7XG4gICAgICAgIGhlaWdodDogNTcwcHg7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yLWFnZ2llLWdvbGQtNDApO1xuICAgICAgICB6LWluZGV4OiAxMDAwO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwIDMwcHggMzBweCAwO1xuICAgICAgICBib3gtc2hhZG93OiAwcHggM3B4IDZweCAjMDAwMDAwMjk7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzO1xuICAgICAgfVxuXG4gICAgICAuc2VhcmNoLXNpZGUtcGFuZWwuZnVsbHNjcmVlbiB7XG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgdG9wOiAxcmVtO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB3aWR0aDogMzUwcHg7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yLWFnZ2llLWdvbGQtNDApO1xuICAgICAgICB6LWluZGV4OiAzMDAwO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwIDMwcHggMzBweCAwO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoOTB2aCAtIDEwMHB4KTtcbiAgICAgICAgYm94LXNoYWRvdzogMHB4IDNweCA2cHggIzAwMDAwMDI5O1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcbiAgICAgIH1cblxuICAgICAgLnNlYXJjaC1jb2xsYXBzZS1idG4ge1xuICAgICAgICB3aWR0aDogNDBweDtcbiAgICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIG1hcmdpbi10b3A6IC0zcHg7XG4gICAgICB9XG5cbiAgICAgIC5zZWFyY2gtY29sbGFwc2UtYnRuIHVjZGxpYi1pY29uIHtcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGZpbGw6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtNzApO1xuICAgICAgICB3aWR0aDogMS43NXJlbTtcbiAgICAgICAgaGVpZ2h0OiAxLjc1cmVtO1xuICAgICAgfVxuXG4gICAgICAuc2VhcmNoLXNpZGUtcGFuZWwuZnVsbHNjcmVlbiAuc2VhcmNoLWNvbnRlbnQge1xuICAgICAgICBvdmVyZmxvdzogYXV0bztcbiAgICAgICAgbWF4LWhlaWdodDogY2FsYyg5MHZoIC0gMjUwcHgpO1xuICAgICAgICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gICAgICAgIHBhZGRpbmc6IDFyZW07XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAwO1xuICAgICAgfVxuXG4gICAgICAuc2VhcmNoLXNpZGUtcGFuZWwgLnNlYXJjaC1jb250ZW50IHtcbiAgICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgICAgIG1heC1oZWlnaHQ6IDQzMHB4O1xuICAgICAgICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gICAgICAgIHBhZGRpbmc6IDAgMXJlbSAxcmVtIDFyZW07XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAwO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1nb2xkLTQwKTtcbiAgICAgIH1cblxuICAgICAgI2JyLXNlYXJjaC1pbnB1dCB7XG4gICAgICAgIHdpZHRoOiA5MCU7XG4gICAgICAgIG1hcmdpbjogMCAwIDFyZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxcmVtO1xuICAgICAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS05MCk7XG4gICAgICB9XG5cbiAgICAgIC5zZWFyY2gtY2xlYXItYnRuIHtcbiAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIHRvcDogMC40cmVtO1xuICAgICAgfVxuICAgICAgLnNlYXJjaC1jbGVhci1idG4gdWNkbGliLWljb24ge1xuICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgZmlsbDogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS05MCk7XG4gICAgICAgIHBhZGRpbmctdG9wOiAwLjZyZW07XG4gICAgICB9XG5cbiAgICAgIHVjZGxpYi1ib29rcmVhZGVyIHtcbiAgICAgICAgcGFkZGluZy10b3A6IDEuNzVyZW07XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAzLjVyZW07XG4gICAgICB9XG5cbiAgICAgIHVjZGxpYi1ib29rcmVhZGVyW2Z1bGxzY3JlZW5dIHtcbiAgICAgICAgcGFkZGluZy10b3A6IC41cmVtO1xuICAgICAgfVxuXG4gICAgICAvKiAuYnItZnVsbHNjcmVlbi1hY3RpdmUge1xuICAgICAgICAgIGh0bWwsIGJvZHkge1xuICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cbiAgICAgIH0gKi9cbiAgICA8L3N0eWxlPlxuXG4gICAgPGRpdiBjbGFzcz1cIndyYXBwZXJcIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIj5cbiAgICAgIDxhcHAtaW1hZ2Utdmlld2VyLWxpZ2h0Ym94IGlkPVwibGlnaHRib3hcIj48L2FwcC1pbWFnZS12aWV3ZXItbGlnaHRib3g+XG5cbiAgICAgIDx1Y2RsaWItcGFnZXNcbiAgICAgICAgc2VsZWN0ZWQ9XCIke3RoaXMubWVkaWFUeXBlfVwiXG4gICAgICAgIGF0dHItZm9yLXNlbGVjdGVkPVwiaWRcIlxuICAgICAgICBzZWxlY3RlZEF0dHJpYnV0ZT1cInZpc2libGVcIj5cbiAgICAgICAgPCEtLSA8YXBwLTM2MC1pbWFnZS12aWV3ZXIgaWQ9XCIzNjBcIj48L2FwcC0zNjAtaW1hZ2Utdmlld2VyPiAtLT5cbiAgICAgICAgPGRpdiBpZD1cImJhZ29mZmlsZXNcIj5cbiAgICAgICAgICA8aXJvbi1pY29uXG4gICAgICAgICAgICBpY29uPVwiZmluLWljb25zOnZhcmlvdXMtb3V0bGluZS1zdGFja2VkXCJcbiAgICAgICAgICAgID9oaWRkZW49XCIke3RoaXMuYmFnT2ZGaWxlc0ltYWdlfVwiPlxuICAgICAgICAgIDwvaXJvbi1pY29uPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz1cIiR7dGhpcy5iYWdPZkZpbGVzSW1hZ2V9XCJcbiAgICAgICAgICAgID9oaWRkZW49XCIkeyF0aGlzLmJhZ09mRmlsZXNJbWFnZX1cIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YXBwLWltYWdlLXZpZXdlciBpZD1cImltYWdlXCI+PC9hcHAtaW1hZ2Utdmlld2VyPlxuICAgICAgICA8dWNkbGliLWJvb2tyZWFkZXIgP2Z1bGxzY3JlZW49XCIke3RoaXMuYnJGdWxsc2NyZWVufVwiIGlkPVwiYm9va3JlYWRlclwiIG1heC1oZWlnaHQ9XCI2MzRcIj48L3VjZGxpYi1ib29rcmVhZGVyPlxuICAgICAgICA8YXBwLXZpZGVvLXZpZXdlciBpZD1cInZpZGVvXCI+PC9hcHAtdmlkZW8tdmlld2VyPlxuICAgICAgICA8YXBwLWF1ZGlvLXZpZXdlciBpZD1cImF1ZGlvXCIgLmlzTXVsdGltZWRpYT1cIiR7dGhpcy5pc011bHRpbWVkaWF9XCI+PC9hcHAtYXVkaW8tdmlld2VyPlxuICAgICAgPC91Y2RsaWItcGFnZXM+XG5cbiAgICAgIDxkaXYgP2hpZGRlbj1cIiR7IXRoaXMubm9NZWRpYX1cIj5cbiAgICAgICAgPGltZyBzcmM9XCIvaW1hZ2VzL3RyZWUtYmlrZS1pbGx1c3RyYXRpb24ucG5nXCIgc3R5bGU9XCJtYXJnaW46IDAgYXV0bzsgZGlzcGxheTogYmxvY2s7IGhlaWdodDogNjAwcHg7XCIgLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwic2VhcmNoLXNpZGUtcGFuZWwgJHt0aGlzLmJyRnVsbHNjcmVlblxuICAgICAgICAgID8gXCJmdWxsc2NyZWVuXCJcbiAgICAgICAgICA6IFwiXCJ9ICR7IXRoaXMuYnJTZWFyY2hPcGVuID8gXCJvZmYtY2FudmFzLS1sZWZ0XCIgOiBcIlwifVwiXG4gICAgICAgID9oaWRkZW49XCIkeyF0aGlzLmlzQm9va1JlYWRlcn1cIlxuICAgICAgPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJwYWRkaW5nOiAxLjVyZW0gMXJlbTtcIj5cbiAgICAgICAgICAgIDxoNSBzdHlsZT1cImNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlKTsgZGlzcGxheTogaW5saW5lOyBmb250LXNpemU6IDEuNXJlbVwiPlxuICAgICAgICAgICAgICBTZWFyY2ggSW5zaWRlXG4gICAgICAgICAgICA8L2g1PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1jb2xsYXBzZS1idG5cIiBAY2xpY2s9XCIke3RoaXMuX29uVG9nZ2xlQlJTZWFyY2h9XCI+XG4gICAgICAgICAgICAgIDx1Y2RsaWItaWNvblxuICAgICAgICAgICAgICAgIGljb249XCJ1Y2RsaWItZGFtczpmYS1jaGV2cm9uLWNpcmNsZS1sZWZ0XCJcbiAgICAgICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgICAgIGljb249XCJjaGV2cm9uLWxlZnRcIlxuICAgICAgICAgICAgICAgIGFsdD1cIkNvbGxhcHNlIHNlYXJjaCBwYW5lbFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPC91Y2RsaWItaWNvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1jb250ZW50IG92ZXJmbG93XCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICBpZD1cImJyLXNlYXJjaC1pbnB1dFwiXG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiU2VhcmNoIGluc2lkZSB0aGlzIGl0ZW1cIlxuICAgICAgICAgICAgICAgIEBjaGFuZ2U9XCIke3RoaXMuX29uQlJTZWFyY2h9XCJcbiAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWNsZWFyLWJ0blwiIEBjbGljaz1cIiR7dGhpcy5fb25DbGVhclNlYXJjaH1cIj5cbiAgICAgICAgICAgICAgICA8dWNkbGliLWljb25cbiAgICAgICAgICAgICAgICAgIGljb249XCJ1Y2RsaWItZGFtczpmYS14bWFya1wiXG4gICAgICAgICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgICAgICAgaWNvbj1cImZhLXhtYXJrXCJcbiAgICAgICAgICAgICAgICAgIGFsdD1cIkNhbmNlbCBzZWFyY2hcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8L3VjZGxpYi1pY29uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjtcIj5cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJmb250LXNpemU6IC44cmVtOyBmb250LXN0eWxlOiBpdGFsaWM7IFwiXG4gICAgICAgICAgICAgICAgPiR7dGhpcy5zZWFyY2hSZXN1bHRzQ291bnR9XG4gICAgICAgICAgICAgICAgcmVzdWx0JHt0aGlzLnNlYXJjaFJlc3VsdHNDb3VudCA9PT0gMSA/IFwiXCIgOiBcInNcIn08L3NwYW5cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICR7dGhpcy5zZWFyY2hSZXN1bHRzLm1hcChcbiAgICAgICAgICAgICAgKHJlc3VsdCwgaW5kZXgpID0+IGh0bWxgXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJzZWFyY2gtcmVzdWx0XCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPVwibWFyZ2luOiAwIDAgMnJlbTsgY3Vyc29yOiBwb2ludGVyO1wiXG4gICAgICAgICAgICAgICAgICBkYXRhLW1hdGNoLWluZGV4PVwiJHtyZXN1bHQubWF0Y2hJbmRleH1cIlxuICAgICAgICAgICAgICAgICAgZGF0YS1hcnJheS1pbmRleD1cIiR7aW5kZXh9XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtcGFnZT1cIiR7cmVzdWx0Py5wYWdlIHx8IDB9XCJcbiAgICAgICAgICAgICAgICAgIEBjbGljaz1cIiR7dGhpcy5fb25TZWFyY2hSZXN1bHRDbGlja31cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxoNSBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDA7IG1hcmdpbi10b3A6IDFyZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgUGFnZSAke3BhcnNlSW50KHJlc3VsdD8ucGFnZSB8fCAwKX1cbiAgICAgICAgICAgICAgICAgIDwvaDU+XG4gICAgICAgICAgICAgICAgICA8cCBzdHlsZT1cImZvbnQtc2l6ZTogLjlyZW07IG1hcmdpbi10b3A6IC4zcmVtXCI+XG4gICAgICAgICAgICAgICAgICAgICR7dW5zYWZlSFRNTChcbiAgICAgICAgICAgICAgICAgICAgICByZXN1bHQudGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7e3tcIiwgJzxzcGFuIGNsYXNzPVwic2VhcmNoZWQtdGVybVwiPicpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShcIn19fVwiLCBcIjwvc3Bhbj5cIilcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGFwcC1tZWRpYS12aWV3ZXItbmF2XG4gICAgICAgID9oaWRkZW49XCIkeyghdGhpcy5tZWRpYVR5cGUgfHwgdGhpcy5tZWRpYVR5cGUgPT09IFwiYXVkaW9cIikgJiYgIXRoaXMuaXNNdWx0aW1lZGlhfVwiXG4gICAgICAgIC5pc0Jvb2tSZWFkZXI9XCIke3RoaXMuaXNCb29rUmVhZGVyfVwiXG4gICAgICAgIC5zZWFyY2hSZXN1bHRzPVwiJHt0aGlzLnNlYXJjaFJlc3VsdHN9XCJcbiAgICAgICAgP2Jyc2luZ2xlcGFnZT1cIiR7dGhpcy5zaW5nbGVQYWdlfVwiXG4gICAgICAgIG92ZXJyaWRlSW1hZ2VMaXN0PVwiJHt0aGlzLm92ZXJyaWRlSW1hZ2VMaXN0fVwiXG4gICAgICAgIC5pc011bHRpbWVkaWE9XCIke3RoaXMuaXNNdWx0aW1lZGlhfVwiXG4gICAgICAgIEB6b29tLWluPVwiJHt0aGlzLl9vblpvb21Jbn1cIlxuICAgICAgICBAYnItYm9va3ZpZXctdG9nZ2xlPVwiJHt0aGlzLl9vblRvZ2dsZUJvb2tWaWV3fVwiXG4gICAgICAgIEBici1leHBhbmQtdmlldz1cIiR7dGhpcy5fb25FeHBhbmRCb29rVmlld31cIlxuICAgICAgICBAYnItY29sbGFwc2Utdmlldz1cIiR7dGhpcy5fb25Db2xsYXBzZUJvb2tWaWV3fVwiXG4gICAgICAgIEBici1zZWFyY2gtdG9nZ2xlPVwiJHt0aGlzLl9vblRvZ2dsZUJSU2VhcmNofVwiXG4gICAgICAgIEBici16b29tLWluPVwiJHt0aGlzLl9vbkJSWm9vbUlufVwiXG4gICAgICAgIEBici16b29tLW91dD1cIiR7dGhpcy5fb25CUlpvb21PdXR9XCJcbiAgICAgICAgQGJyLWNoYW5nZS1zZWFyY2gtcmVzdWx0PVwiJHt0aGlzLl9vbkNoYW5nZVNlYXJjaFJlc3VsdH1cIlxuICAgICAgPlxuICAgICAgPC9hcHAtbWVkaWEtdmlld2VyLW5hdj5cbiAgICA8L2Rpdj5cbiAgYDtcbn1cbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zYW1wb3R0cy9wbHlyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL3NoYWthLXBsYXllci9cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvc2hha2EtcGxheWVyL3RyZWUvbWFzdGVyL2RvY3MvdHV0b3JpYWxzXG5cbmltcG9ydCB7IExpdEVsZW1lbnQgfSBmcm9tIFwibGl0XCJcbmltcG9ydCByZW5kZXIgZnJvbSBcIi4vYXBwLXZpZGVvLXZpZXdlci50cGwuanNcIjtcblxuaW1wb3J0IHsgTWl4aW4sIExpdENvcmtVdGlscyB9IGZyb20gJ0B1Y2QtbGliL2NvcmstYXBwLXV0aWxzJztcblxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vLi4vLi4vbGliL2NvbmZpZ1wiXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL2xpYi91dGlsc1wiXG5pbXBvcnQgdmlkZW9MaWJzIGZyb20gXCIuLi8uLi8uLi8uLi9saWIvdXRpbHMvdmlkZW8tbGliLWxvYWRlclwiXG5cbmltcG9ydCBwbHlyQ3NzIGZyb20gXCJwbHlyL2Rpc3QvcGx5ci5jc3NcIlxuaW1wb3J0IHNoYWthQ3NzIGZyb20gXCJzaGFrYS1wbGF5ZXIvZGlzdC9jb250cm9scy5jc3NcIlxubGV0IFZJREVPX1NUWUxFUyA9IHBseXJDc3Mrc2hha2FDc3M7XG5cbmltcG9ydCBzcHJpdGVTaGVldCBmcm9tIFwicGx5ci9kaXN0L3BseXIuc3ZnXCJcbmxldCBTUFJJVEVfU0hFRVQgPSBzcHJpdGVTaGVldFxuXG4vLyBWZXJ5IGR1bXAuICBUbyByZW1vdmUgdGhlICdTaGFrYSBQbGF5ZXIgVGV4dFRyYWNrJ1xuLy8geW91IGhhdmUgdG8gb3ZlcnJpZGUgdGhpcy4uLlxuY2xhc3MgU2ltcGxlVGV4dERpc3BsYXllciB7XG4gIGNvbnN0cnVjdG9yKHZpZGVvKSB7fVxuICByZW1vdmUoKSB7cmV0dXJuIHRydWV9XG4gIGRlc3Ryb3koKSB7fVxuICBhcHBlbmQoY3Vlcykge31cbiAgc2V0VGV4dFZpc2liaWxpdHkob24pIHt9XG4gIGlzVGV4dFZpc2libGUoKSB7cmV0dXJuIGZhbHNlfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBWaWRlb1ZpZXdlciBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpXG4gIC53aXRoKExpdENvcmtVdGlscykge1xuICBcbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwbGF5ZXI6IHt0eXBlOiBPYmplY3R9LFxuICAgICAgdHJhY2tzOiB7dHlwZTogQXJyYXl9LFxuICAgICAgbGlic0xvYWRlZCA6IHt0eXBlOiBCb29sZWFufVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9pbmplY3RNb2RlbCgnQXBwU3RhdGVNb2RlbCcsICdNZWRpYU1vZGVsJyk7XG4gICAgdGhpcy50cmFja3MgPSBbXTtcbiAgICB0aGlzLnBsYXllciA9IHt9O1xuICAgIHRoaXMubGlic0xvYWRlZCA9IGZhbHNlO1xuICB9XG5cbiAgX29uQXBwU3RhdGVVcGRhdGUoZSkge1xuICAgIGlmICggdGhpcy5mdWxsUGF0aCAhPT0gZS5sb2NhdGlvbi5mdWxscGF0aCApIHsgXG4gICAgICB0aGlzLl9zdG9wKCk7XG4gICAgfVxuXG4gICAgaWYoICFlLnNlbGVjdGVkUmVjb3JkICkgcmV0dXJuO1xuXG4gICAgdGhpcy5mdWxsUGF0aCA9IGUubG9jYXRpb24uZnVsbHBhdGg7XG5cbiAgICAvLyBUT0RPIGNoYW5nZSB0byBzdXBwb3J0IG11bHRpcGxlIG1lZGlhIGdyb3Vwc1xuICAgIHRoaXMuX29uU2VsZWN0ZWRSZWNvcmRNZWRpYVVwZGF0ZShcbiAgICAgIGUuc2VsZWN0ZWRSZWNvcmQuY2xpZW50TWVkaWE/Lm1lZGlhR3JvdXBzWzBdXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIGZpcnN0VXBkYXRlZChlKSB7XG4gICAgdGhpcy5fb25BcHBTdGF0ZVVwZGF0ZShhd2FpdCB0aGlzLkFwcFN0YXRlTW9kZWwuZ2V0KCkpO1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFzeW5jICgpID0+IHtcbiAgICAgIC8vIHdlYnBhY2sgbW9kdWxlIGlzIGJhc2U2NCBlbmNvZGVkIFVSTCwgY2hlY2sgaWYgdGhpcyBoYXBwZW5lZCBcbiAgICAgIC8vIGFuZCBkZWNvZGUsIHRoZW4gc2V0IHN2ZyB0byBpbm5lckh0bWwgaW5zaWRlIHRoZSBzaGFkb3cgZG9tLlxuICAgICAgaWYoIFNQUklURV9TSEVFVC5pbmRleE9mKCdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0JykgPiAtMSApIHtcbiAgICAgICAgU1BSSVRFX1NIRUVUID0gYXRvYihTUFJJVEVfU0hFRVQucmVwbGFjZSgnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCwnLCAnJykpO1xuICAgICAgfVxuICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNzcHJpdGUtcGx5cicpLmlubmVySFRNTCA9IFNQUklURV9TSEVFVDtcbiAgICBcbiAgICAgIC8vIGRlY2lkZSB3aGVyZSB0byBwdXQgY3NzXG4gICAgICAvLyBUaGUgUExZUiBsaWJyYXJ5IGlzbid0IGF3YXJlIG9mIHNoYWR5ZG9tIHNvIHdlIG5lZWQgdG8gbWFudWFsbHlcbiAgICAgIC8vIHBsYWNlIG91ciBzdHlsZXMgaW4gZG9jdW1lbnQuaGVhZCB3L28gc2hhZHlkb20gdG91Y2hpbmcgdGhlbS5cbiAgICAgIGxldCBwbHlyU3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIHBseXJTdHlsZXMuaW5uZXJIVE1MID0gVklERU9fU1RZTEVTO1xuICAgICAgaWYoIHdpbmRvdy5TaGFkeURPTSAmJiB3aW5kb3cuU2hhZHlET00uaW5Vc2UgKSB7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocGx5clN0eWxlcyk7XG4gICAgICAgIHRoaXMuaGlkZUNvbnRyb2xzID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQocGx5clN0eWxlcyk7XG4gICAgICAgIHRoaXMuaGlkZUNvbnRyb2xzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTsgICAgXG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25TZWxlY3RlZFJlY29yZE1lZGlhVXBkYXRlXG4gICAqIEBkZXNjcmlwdGlvbiBmcm9tIEFwcFN0YXRlTW9kZWwsIGNhbGxlZCB3aGVuIGEgcmVjb3JkcyBtZWRpYSBpcyBzZWxlY3RlZFxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IG1lZGlhIFxuICAqKi9cbiAgYXN5bmMgX29uU2VsZWN0ZWRSZWNvcmRNZWRpYVVwZGF0ZShtZWRpYSkge1xuICAgIGlmKCAhbWVkaWEgKSByZXR1cm47XG4gICAgbGV0IG1lZGlhVHlwZSA9IHV0aWxzLmdldE1lZGlhVHlwZShtZWRpYSk7XG4gICAgaWYgKG1lZGlhVHlwZSAhPT0gJ1ZpZGVvT2JqZWN0JyAmJiBtZWRpYVR5cGUgIT09ICdTdHJlYW1pbmdWaWRlbycpIHJldHVybjtcblxuICAgIHRoaXMubWVkaWEgPSBtZWRpYTtcblxuICAgIC8vIGZpbmQgYXNzb2NpYXRlZCBjYXB0aW9ucyBhbmQgcHJlcCB0byB0cmFja3MgYXJyYXlcbiAgICB0aGlzLnRyYWNrcyA9IHV0aWxzLmFzQXJyYXkobWVkaWEsICdjYXB0aW9uJylcbiAgICAgIC5maWx0ZXIoY2FwdGlvbiA9PiBjYXB0aW9uWydAaWQnXSAhPT0gdW5kZWZpbmVkIClcbiAgICAgIC5tYXAoY2FwdGlvbiA9PiB7XG4gICAgICAgIGxldCBsbmcgPSBjYXB0aW9uLmxhbmd1YWdlO1xuICAgICAgICBsZXQgc2V0RGVmYXVsdCA9IChsbmcgPT09ICdlbicgPyB0cnVlIDogZmFsc2UpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAga2luZDogJ2NhcHRpb25zJyxcbiAgICAgICAgICBsYWJlbDogdXRpbHMuZ2V0TGFuZ3VhZ2UobG5nKSxcbiAgICAgICAgICBzcmNsYW5nOiBsbmcsXG4gICAgICAgICAgc3JjOiBjYXB0aW9uWydAaWQnXSxcbiAgICAgICAgICBkZWZhdWx0OiBzZXREZWZhdWx0XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgIC8vIGlmIHdlIGhhdmUgYWxyZWFkeSBsb2FkZWQgdGhlIHBsYXllciBhbmQgc2hha2EgbGlicmFyaWVzXG4gICAgLy8gdGhlbiB3ZSBjYW4gZ28gYWhlYWQgYW5kIGxvYWQgdGhlIHZpZGVvXG4gICAgaWYoIHRoaXMubGlic0xvYWRlZCApIHtcbiAgICAgIHRoaXMuX2xvYWRWaWRlbygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGR5bmFtaWNhbGx5IGxvYWQgcGx5ciBhbmQgc2hha2EgbGlic1xuICAgIGxldCB7cGx5ciwgc2hha2F9ID0gYXdhaXQgdmlkZW9MaWJzLmxvYWQoKTtcblxuICAgIC8vIGFsZXJ0IHVzZXIgaWYgdmlkZW8gcGxheWJhY2sgaXMgbm90IHN1cHBvcnRlZFxuICAgIGxldCBwbHlyX3N1cHBvcnRlZCA9IHBseXIuc3VwcG9ydGVkKCd2aWRlbycsICdodG1sNScsIHRydWUpO1xuICAgIGxldCBzaGFrYV9zdXBwb3J0ZWQgPSBzaGFrYS5QbGF5ZXIuaXNCcm93c2VyU3VwcG9ydGVkKCk7XG4gICAgaWYoICFwbHlyX3N1cHBvcnRlZCB8fCAhc2hha2Ffc3VwcG9ydGVkICkge1xuICAgICAgcmV0dXJuIGFsZXJ0KCdZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB2aWRlbyBwbGF5YmFjaycpO1xuICAgIH1cblxuICAgIGxldCB2aWRlb0VsZSA9IHRoaXMuc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZCgndmlkZW8nKTtcblxuICAgIHRoaXMucGx5ciA9IG5ldyBwbHlyKHZpZGVvRWxlLCB7XG4gICAgICBoaWRlQ29udHJvbHM6IHRoaXMuaGlkZUNvbnRyb2xzLFxuICAgICAgZnVsbHNjcmVlbiA6IHsgZW5hYmxlZDogZmFsc2UgfSwgLy8gZmFsbGJhY2s6IHRydWUsIGlvc05hdGl2ZTogdHJ1ZSB9LFxuICAgICAgY2FwdGlvbnM6IHt1cGRhdGU6IGZhbHNlfSxcbiAgICAgIC8vIGtleWJvYXJkOiB7Z2xvYmFsOiB0cnVlfSxcbiAgICAgIGNvbnRyb2xzIDogWydwbGF5LWxhcmdlJywgJ3BsYXknLCAncHJvZ3Jlc3MnLCAnY3VycmVudC10aW1lJywgJ211dGUnLCAndm9sdW1lJ10gLy8sICdmdWxsc2NyZWVuJ10sXG4gICAgfSk7XG5cbiAgICAvLyBDb25zdHJ1Y3QgYSBQbGF5ZXIgdG8gd3JhcCBhcm91bmQgdGhlIDx2aWRlbz4gdGFnLlxuICAgIHRoaXMuc2hha2EgPSBuZXcgc2hha2EuUGxheWVyKHZpZGVvRWxlLCApO1xuICAgIHRoaXMuc2hha2EuY29uZmlndXJlKHtcbiAgICAgIHRleHREaXNwbGF5RmFjdG9yeSA6IFNpbXBsZVRleHREaXNwbGF5ZXJcbiAgICB9KTtcblxuICAgIHRoaXMuc2hha2EuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlID0+IHRoaXMubG9nZ2VyLmVycm9yKCdzaGFrYSBlcnJvcicsIGUpKTtcbiAgICBcbiAgICB0aGlzLmxpYnNMb2FkZWQgPSB0cnVlO1xuICAgIGF3YWl0IHRoaXMuX2xvYWRWaWRlbygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX2xvYWRWaWRlb1xuICAgKiBAZGVzY3JpcHRpb24gbG9hZCB1cmwgaW50byBzaGFrYSBmb3IgY3VycmVudCBtZWRpYVxuICAgKi9cbiAgYXN5bmMgX2xvYWRWaWRlbygpIHtcbiAgICBpZiggIXRoaXMubWVkaWEgKSByZXR1cm47XG5cbiAgICBsZXQgbWVkaWFUeXBlID0gdXRpbHMuZ2V0TWVkaWFUeXBlKHRoaXMubWVkaWEpO1xuICAgIGxldCBtYW5pZmVzdFVyaSA9IGNvbmZpZy5mY3JlcG9CYXNlUGF0aCt0aGlzLm1lZGlhWydAaWQnXTtcblxuICAgIGlmKCB0aGlzLm1lZGlhLmNsaWVudE1lZGlhPy5zdHJlYW1pbmdWaWRlbz8ubWFuaWZlc3QgKSB7XG4gICAgICBtYW5pZmVzdFVyaSA9IHRoaXMubWVkaWEuY2xpZW50TWVkaWEuc3RyZWFtaW5nVmlkZW8ubWFuaWZlc3Q7XG4gICAgfSBlbHNlIGlmKCBtZWRpYVR5cGUgPT09ICdTdHJlYW1pbmdWaWRlbycgKSB7XG4gICAgICBtYW5pZmVzdFVyaSArPSAnL3BsYXlsaXN0Lm0zdTgnXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuc2hha2EubG9hZChtYW5pZmVzdFVyaSk7XG4gICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoJ0Vycm9yIGNvZGU6ICcsIGVycm9yLmNvZGUsICdvYmplY3QnLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgcGxheWJhY2sgYW5kIHJlc2V0IHRvIHN0YXJ0XG4gICAqL1xuICBfc3RvcCgpIHtcbiAgICBjb25zdCB2aWRlbyA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjdmlkZW8nKTtcbiAgICB2aWRlby5wYXVzZSgpO1xuXG4gICAgaWYgKCB0aGlzLnBseXIgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnBseXIgPT09IG51bGwgKSByZXR1cm47XG5cbiAgICBpZiAoT2JqZWN0LmVudHJpZXModGhpcy5wbHlyKS5sZW5ndGggIT0gMCkge1xuICAgICAgdGhpcy5wbHlyLnN0b3AoKTtcbiAgICB9O1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYXBwLXZpZGVvLXZpZXdlcicsIEFwcFZpZGVvVmlld2VyKTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdWNkLWxpYnJhcnkvcGdkbS11aS90cmVlL21hc3Rlci9hcHAvZWxlbWVudHMvcGFnZXMvY29ubmVjdFxuXG5pbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0JztcbmltcG9ydCB7IHJlcGVhdCB9IGZyb20gJ2xpdC1odG1sL2RpcmVjdGl2ZXMvcmVwZWF0LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyKCkgeyBcbnJldHVybiBodG1sYFxuICAgIDxzdHlsZT5cbiAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgICAgd2lkdGg6IDYwJTtcbiAgICAgICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWluZXIge1xuICAgICAgICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZpZGVvIHtcbiAgICAgICAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogYXV0bztcbiAgICAgICAgICAgIG1heC1oZWlnaHQ6IDYwMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLnBseXJfX3ZpZGVvLXdyYXBwZXIge1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLnBseXItLWZ1bGwtdWkgaW5wdXRbdHlwZT1yYW5nZV0ge1xuICAgICAgICAgICAgY29sb3I6ICNkYWFhMDAgIWltcG9ydGFudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGJ1dHRvbi5wbHlyX19jb250cm9sLnBseXJfX2NvbnRyb2wtLW92ZXJsYWlkLFxuICAgICAgICBidXR0b24ucGx5cl9fY29udHJvbC5wbHlyX19jb250cm9sOmhvdmVyIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjE4LDE3MCwwLDEuMCkgIWltcG9ydGFudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5wbHlyX19jb250cm9sOmZvY3VzIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjE4LDE3MCwwLDEuMCkgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgICAucGx5ci0tZnVsbC11aSBpbnB1dFt0eXBlPXJhbmdlXSB7XG4gICAgICAgICAgICBwYWRkaW5nOiAycHggIWltcG9ydGFudDtcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLnBseXItLWZ1bGwtdWkgaW5wdXRbdHlwZT1yYW5nZV06Zm9jdXMge1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggZGFzaGVkIHJnYmEoMjE4LDE3MCwwLDEuMCkgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgICAucGx5cl9fdGFiLWZvY3VzIHtcbiAgICAgICAgICAgIG91dGxpbmU6IDAgIWltcG9ydGFudDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBAbWVkaWEobWF4LXdpZHRoOiA3NjhweCkge1xuICAgICAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgICAgIHdpZHRoOiA5MCU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICA8L3N0eWxlPlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBpZD1cInNwcml0ZS1wbHlyXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPjwvZGl2PiBcbiAgICAgICAgPHZpZGVvID9oaWRkZW49XCIkeyF0aGlzLmxpYnNMb2FkZWR9XCIgaWQ9XCJ2aWRlb1wiIHBsYXlzaW5saW5lIGNvbnRyb2xzIGNyb3Nzb3JpZ2luPlxuICAgICAgICAgICAgJHtyZXBlYXQodGhpcy50cmFja3MsICh0KSA9PiBcbiAgICAgICAgICAgICAgICBodG1sYDx0cmFjayBraW5kPVwiJHt0LmtpbmR9XCIgbGFiZWw9XCIke3QubGFiZWx9XCIgc3JjPVwiJHt0LnNyY31cIiBzcmNsYW5nPVwiJHt0LnNyY2xhbmd9XCIgZGVmYXVsdD1cIiR7dC5kZWZhdWx0fVwiIC8+YCl9XG4gICAgICAgIDwvdmlkZW8+XG4gICAgPC9kaXY+XG5gXG59XG4iLCJpbXBvcnQgeyBMaXRFbGVtZW50IH0gZnJvbSAnbGl0JztcblxuaW1wb3J0IHJlbmRlciBmcm9tIFwiLi9hcHAtc2hhcmUtYnRuLnRwbC5qc1wiO1xuXG5pbXBvcnQgeyBNaXhpbiwgTGl0Q29ya1V0aWxzIH0gZnJvbSAnQHVjZC1saWIvY29yay1hcHAtdXRpbHMnO1xuXG5pbXBvcnQgJy4vYXBwLXRvYXN0LXBvcHVwLmpzJztcblxuXG5jb25zdCBCQVNFX1NIQVJFX0xJTktTID0ge1xuICBmYWNlYm9vayA6ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHAnLFxuICBibHVlc2t5IDogJ2h0dHBzOi8vYnNreS5hcHAvaW50ZW50L2NvbXBvc2UnLFxuICAvLyBwaW50ZXJlc3QgY2FuIGFsc28gYWRkID9tZWRpYSBhbmQgP2Rlc2NyaXB0aW9uXG4gIHBpbnRlcmVzdCA6ICdodHRwczovL3BpbnRlcmVzdC5jb20vcGluL2NyZWF0ZS9idXR0b24vJ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBTaGFyZUJ0biBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpXG4gIC53aXRoKExpdENvcmtVdGlscykge1xuXG4gIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmlzaWJsZSA6IHsgdHlwZSA6IEJvb2xlYW4gfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncG9wdXAnKTtcbiAgICB0aGlzLl9pbmplY3RNb2RlbCgnQXBwU3RhdGVNb2RlbCcsICdNZWRpYU1vZGVsJywgJ1JlY29yZE1vZGVsJyk7XG4gIH1cblxuICB3aWxsVXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKSB7XG4gICAgaWYoIGNoYW5nZWRQcm9wZXJ0aWVzLmhhcygndmlzaWJsZScpICkge1xuICAgICAgaWYoIHRoaXMudmlzaWJsZSApIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3BvcHVwJywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3BvcHVwJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uQXBwU3RhdGVVcGRhdGVcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIEFwcFN0YXRlTW9kZWwgYXBwLXN0YXRlLXVwZGF0ZSBldmVudFxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgYXBwLXN0YXRlLXVwZGF0ZSBldmVudFxuICAgKiBcbiAgKi9cbiAgX29uQXBwU3RhdGVVcGRhdGUoZSkge1xuICAgIGlmKCBlLmxvY2F0aW9uLnBhZ2UgIT09ICdpdGVtJyApIHtcbiAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblNoYXJlU2VsZWN0ZWRcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIG1haW4gaWNvbiwgdG9nZ2xlcyBwb3B1cCB3aGVuIGNsaWNrZWRcbiAgICogXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIEhUTUwgY2xpY2sgZXZlbnRcbiAgICovXG4gIF9vblNoYXJlU2VsZWN0ZWQoZSkge1xuICAgIHRoaXMudmlzaWJsZSA9ICF0aGlzLnZpc2libGU7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBfY2xpY2tQb3BvcChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbkNvcHlMaW5rXG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byBzaGFyZSBpY29uIGNvcHkgbGluayBidXR0b25cbiAgICogXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIEhUTUwgY2xpY2sgZXZlbnQgXG4gICAqL1xuICBhc3luYyBfb25Db3B5TGluayhlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgIGxldCB0b2FzdFBvcHVwID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ2FwcC10b2FzdC1wb3B1cCcpO1xuICAgICAgaWYoIHRvYXN0UG9wdXAgKSB0b2FzdFBvcHVwLnNob3dQb3B1cCgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoJ0ZhaWxlZCB0byBjb3B5IHVybDogJywgZXJyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25Tb2NpYWxJY29uQ2xpY2tcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIHNvY2lhbCBpY29uIGJ1dHRvbnMuICBDYWxsZWQgd2hlbiBvbmUgb3MgY2xpY2tlZFxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgSFRNTCBjbGljayBldmVudCBcbiAgICovXG4gIF9vblNvY2lhbEljb25DbGljayhlKSB7XG4gICAgbGV0IHJlY29yZCA9IHRoaXMuQXBwU3RhdGVNb2RlbC5nZXRTZWxlY3RlZFJlY29yZCgpO1xuICAgIGxldCBtZWRpYSA9IHJlY29yZC5zZWxlY3RlZE1lZGlhO1xuICAgIGxldCBpdGVtTmFtZSA9IHJlY29yZC5ncmFwaD8ucm9vdD8ubmFtZSB8fCAnJztcblxuICAgIGlmKCBlLnR5cGUgPT09ICdrZXl1cCcgJiYgZS53aGljaCAhPT0gMTMgKSByZXR1cm47XG4gICAgbGV0IGlkID0gZS5jdXJyZW50VGFyZ2V0WydpZCddO1xuXG4gICAgbGV0IHVybCA9IEJBU0VfU0hBUkVfTElOS1NbaWRdO1xuICAgIGxldCBxc28gPSB7fTtcbiAgICBsZXQgbmFtZSA9IChpdGVtTmFtZSB8fCBtZWRpYS5uYW1lIHx8IG1lZGlhLnRpdGxlIHx8IHJlY29yZC5uYW1lIHx8IHJlY29yZC50aXRsZSk7XG4gICAgXG4gICAgaWYoIGlkID09PSAncGludGVyZXN0JyApIHsgIFxuICAgICAgbGV0IHBhdGg7XG4gICAgICBsZXQgaW1hZ2VzID0gcmVjb3JkLmNsaWVudE1lZGlhPy5tZWRpYUdyb3Vwcz8uWzBdPy5jbGllbnRNZWRpYT8uaW1hZ2VzO1xuICAgICAgaWYoIGltYWdlcz8ub3JpZ2luYWxNZWRpYT8ubWlzc2luZyB8fCAhaW1hZ2VzPy5vcmlnaW5hbE1lZGlhPy51cmwgKSB7XG4gICAgICAgIHBhdGggPSBpbWFnZXM/LmxhcmdlPy51cmwgfHxcbiAgICAgICAgICAgICAgICBpbWFnZXM/Lm1lZGl1bT8udXJsIHx8XG4gICAgICAgICAgICAgICAgaW1hZ2VzPy5zbWFsbD8udXJsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGF0aCA9IGltYWdlcz8ub3JpZ2luYWxNZWRpYT8udXJsO1xuICAgICAgfVxuXG4gICAgICBpZiggcGF0aCApIHtcbiAgICAgICAgcXNvLm1lZGlhID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sKycvLycrd2luZG93LmxvY2F0aW9uLmhvc3QrcGF0aDtcbiAgICAgIH1cbiAgICAgIHFzby5kZXNjcmlwdGlvbiA9IG5hbWU7XG4gICAgICBxc28udXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgfSBlbHNlIGlmICggaWQgPT09ICdmYWNlYm9vaycgKSB7XG4gICAgICBxc28udSA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIH0gZWxzZSBpZiggaWQgPT09ICdibHVlc2t5JyApIHtcbiAgICAgIGxldCB0ZXh0ID0gbmFtZSsnIC0gJyt3aW5kb3cubG9jYXRpb24uaHJlZisnICNVQ0RhdmlzTGlicmFyeSAjRGlnaXRhbENvbGxlY3Rpb25zJztcbiAgICAgIGlmKCB0ZXh0Lmxlbmd0aCA+IDMwMCkge1xuICAgICAgICBsZXQgZGlmZiA9ICh0ZXh0Lmxlbmd0aCArIDMpIC0gMzAwO1xuICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMCwgbmFtZS5sZW5ndGgtZGlmZikrJy4uLic7XG4gICAgICAgIHRleHQgPSBuYW1lKycgLSAnK3dpbmRvdy5sb2NhdGlvbi5ocmVmKycgI1VDRGF2aXNMaWJyYXJ5ICNEaWdpdGFsQ29sbGVjdGlvbnMnO1xuICAgICAgfVxuXG4gICAgICBxc28udGV4dCA9IHRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBzb2NpYWwgbWVkaWEgdHlwZTogJytpZCk7XG4gICAgfVxuXG4gICAgdXJsICs9IHRoaXMuX2NyZWF0ZVFzKHFzbyk7XG4gICAgd2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJywgJ2hlaWdodD00MDAsd2lkdGg9NTAwJyk7XG4gIH1cblxuICBfY3JlYXRlUXMocXNvKSB7XG4gICAgbGV0IHF1ZXJ5ID0gW107XG4gICAgZm9yKCBsZXQga2V5IGluIHFzbyApIHtcbiAgICAgIHF1ZXJ5LnB1c2goa2V5Kyc9JytlbmNvZGVVUklDb21wb25lbnQocXNvW2tleV0pKTtcbiAgICB9XG4gICAgcmV0dXJuICc/JytxdWVyeS5qb2luKCcmJyk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfY29weUxpbmtcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIGNsaWNrIGV2ZW50IG9uIGJ1dHRvbi4gIENvcHkgdGV4dCB0byBjbGlwYm9hcmRcbiAgICogc2hvdyBVSSBpbnRlcmFjdGlvbi5cbiAgICovXG4gIF9jb3B5TGluaygpIHtcbiAgICAvLyB0aGlzLiQubGluay5zZWxlY3QoKTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI2xpbmsnKS5mb2N1cygpO1xuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjbGluaycpLnNldFNlbGVjdGlvblJhbmdlKDAsIDk5OTkpO1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiQ29weVwiKTtcblxuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjY29weUljb24nKS5pY29uID0gJ2NoZWNrJztcbiAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI2NvcHlCdXR0b24nKS5zZXRBdHRyaWJ1dGUoJ2FjdGl2ZScsICdhY3RpdmUnKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJyNjb3B5SWNvbicpLmljb24gPSAnY29udGVudC1jb3B5JztcbiAgICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjY29weUJ1dHRvbicpLnJlbW92ZUF0dHJpYnV0ZSgnYWN0aXZlJywgJ2FjdGl2ZScpO1xuICAgIH0sIDMwMDApO1xuICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhcHAtc2hhcmUtYnRuJywgQXBwU2hhcmVCdG4pOyIsImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQnO1xuXG5pbXBvcnQgeyBzaGFyZWRTdHlsZXMgfSBmcm9tICcuLi9zdHlsZXMvc2hhcmVkLXN0eWxlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHsgXG4gIHJldHVybiBodG1sYFxuXG48c3R5bGUgaW5jbHVkZT1cInNoYXJlZC1zdHlsZXNcIj5cbiAgJHtzaGFyZWRTdHlsZXN9XG5cbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6IDQ4cHg7XG4gICAgaGVpZ2h0OiA0OHB4O1xuICB9XG5cbiAgW2hpZGRlbl0geyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH1cblxuICAjcG9wdXAge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHotaW5kZXg6IDIwMDU7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS0zMCk7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiA3MHB4O1xuICAgIHJpZ2h0OiAtMjBweDtcbiAgICBtaW4td2lkdGg6IDMyNXB4O1xuICB9XG5cbiAgLyogI3BvcHVwOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDE1MCU7XG4gICAgbGVmdDogMDtcbiAgICB0b3A6IDA7XG4gICAgei1pbmRleDogLTE7XG4gICAgYm9yZGVyOiAxcHggc29saWQgZ3JlZW47ICAgIFxuICB9ICovXG5cbiAgLmxheW91dCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgfVxuXG4gIGlucHV0IHtcbiAgICBmb250LXNpemU6IHZhcigtLWZzLXApO1xuICAgIHBhZGRpbmc6IDAgMCAwIDVweDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgaGVpZ2h0OiAzOHB4O1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cblxuICAjbGluayB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLW1lZGl1bS1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHZhcigtLW1lZGl1bS1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tbWVkaXVtLWJhY2tncm91bmQtY29sb3IpO1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIH1cblxuICAuc29jaWFsIHtcbiAgICBtYXJnaW46IDhweDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGhlaWdodDogNDBweDtcbiAgICB3aWR0aDogNDBweDtcbiAgICBib3JkZXI6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICBvdXRsaW5lOiBub25lO1xuICB9XG4gIC5zb2NpYWw6Zm9jdXMge1xuICAgIGJvcmRlcjogdmFyKC0tZGVmYXVsdC1vdXRsaW5lKTtcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICB9XG5cbiAgLmNvcHlCdXR0b24ge1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgaGVpZ2h0OiAzOHB4O1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgZm9udC1zaXplOiB2YXIoLS1mcy1zbSk7XG4gICAgZm9udC13ZWlnaHQ6IHZhcigtLWZ3LWJvbGQpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRlZmF1bHQtc2Vjb25kYXJ5LWNvbG9yKTtcbiAgICBjb2xvcjogdmFyKC0tZGVmYXVsdC1wcmltYXJ5LWNvbG9yKTtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgcGFkZGluZzogMCA1cHg7XG4gIH1cbiAgLmNvcHlCdXR0b25bYWN0aXZlXSB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRlZmF1bHQtcHJpbWFyeS1jb2xvcik7XG4gICAgY29sb3I6IHZhcigtLWRlZmF1bHQtc2Vjb25kYXJ5LWNvbG9yKTtcbiAgfVxuICAuY29weUJ1dHRvblthY3RpdmVdIHNwYW4ge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICAjbWFpbiB7XG4gICAgY29sb3I6IHZhcigtLWRlZmF1bHQtc2Vjb25kYXJ5LWNvbG9yKTtcbiAgfVxuXG4gIC5hcnJvdy1kb3duIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDA7IFxuICAgIGhlaWdodDogMDsgXG4gICAgYm9yZGVyLWxlZnQ6IDE1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyLXJpZ2h0OiAxNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgIGJvcmRlci10b3A6IDIwcHggc29saWQgdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS0zMCk7XG4gICAgYm90dG9tOiAtMjBweDtcbiAgICByaWdodDogMjdweDtcbiAgfVxuXG4gIHBhcGVyLWljb24tYnV0dG9uOmZvY3VzIHtcbiAgICBib3JkZXItcmFkaXVzOiAwICFpbXBvcnRhbnQ7XG4gIH1cblxuICB1Y2RsaWItaWNvbiB7XG4gICAgZmlsbDogd2hpdGU7XG4gICAgd2lkdGg6IDI1cHg7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIG1hcmdpbjogYXV0bztcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cblxuICAuaWNvbiB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIG1hcmdpbjogLjVyZW07XG4gIH1cblxuICAuaWNvbiB1Y2RsaWItaWNvbiB7XG4gICAgLyogd2lkdGg6IDM3cHg7ICovXG4gICAgaGVpZ2h0OiA2MHB4O1xuICB9XG5cbiAgLmNpcmNsZSB7XG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlOyAqL1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICB3aWR0aDogNjBweDtcbiAgICBoZWlnaHQ6IDYwcHg7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gIC5jaXJjbGUuY29weSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtZ29sZCk7XG4gIH1cbiAgLmNpcmNsZS5mYWNlYm9vayB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNiNTk5ODtcbiAgfVxuICAuY2lyY2xlLmJsdWVza3kge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMxMTg1RkU7XG4gIH1cbiAgLmNpcmNsZS5waW50ZXJlc3Qge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNjYjIwMjc7XG4gIH1cblxuICAuaWNvbiBzcGFuIHtcbiAgICBmb250LXNpemU6IC43cmVtO1xuICB9XG48L3N0eWxlPlxuXG48ZGl2IGlkPVwicG9wdXBcIiA/aGlkZGVuPVwiJHshdGhpcy52aXNpYmxlfVwiIEBjbGljaz1cIiR7dGhpcy5fY2xpY2tQb3BvcH1cIj5cbiAgPGRpdiBjbGFzcz1cImxheW91dFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImljb25cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZSBjb3B5XCJcbiAgICAgICAgICBAY2xpY2s9XCIke3RoaXMuX29uQ29weUxpbmt9XCI+XG4gICAgICAgICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS1saW5rXCI+PC91Y2RsaWItaWNvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzcGFuPkNvcHkgTGluazwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlIGZhY2Vib29rXCIgaWQ9XCJmYWNlYm9va1wiXG4gICAgICAgICAgQGNsaWNrPVwiJHt0aGlzLl9vblNvY2lhbEljb25DbGlja31cIj5cbiAgICAgICAgICA8dWNkbGliLWljb24gaWNvbj1cInVjZGxpYi1kYW1zOmZhLWZhY2Vib29rLWZcIj48L3VjZGxpYi1pY29uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDxzcGFuPkZhY2Vib29rPC9zcGFuPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImljb25cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZSBibHVlc2t5XCIgaWQ9XCJibHVlc2t5XCJcbiAgICAgICAgICBAY2xpY2s9XCIke3RoaXMuX29uU29jaWFsSWNvbkNsaWNrfVwiPlxuICAgICAgICAgIDx1Y2RsaWItaWNvbiBpY29uPVwidWNkbGliLWRhbXM6ZmEtYmx1ZXNreVwiPjwvdWNkbGliLWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPHNwYW4+Qmx1ZXNreTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZSBwaW50ZXJlc3RcIiBpZD1cInBpbnRlcmVzdFwiXG4gICAgICAgIEBjbGljaz1cIiR7dGhpcy5fb25Tb2NpYWxJY29uQ2xpY2t9XCI+XG4gICAgICAgIDx1Y2RsaWItaWNvbiBpY29uPVwidWNkbGliLWRhbXM6ZmEtcGludGVyZXN0LXBcIj48L3VjZGxpYi1pY29uPlxuICAgICAgPC9kaXY+XG4gICAgICA8c3Bhbj5QaW50ZXJlc3Q8L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiYXJyb3ctZG93blwiPjwvZGl2PlxuPC9kaXY+XG5cbjx1Y2RsaWItaWNvbiBcbiAgaWNvbj1cInVjZGxpYi1kYW1zOmZhLXNoYXJlXCIgXG4gIEBjbGljaz1cIiR7dGhpcy5fb25TaGFyZVNlbGVjdGVkfVwiPlxuPC91Y2RsaWItaWNvbj5cblxuPGFwcC10b2FzdC1wb3B1cD48L2FwcC10b2FzdC1wb3B1cD5cbmA7fSIsImltcG9ydCB7IExpdEVsZW1lbnQgfSBmcm9tICdsaXQnO1xuXG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2FwcC10b2FzdC1wb3B1cC50cGwuanNcIjtcblxuaW1wb3J0IHsgTWl4aW4sIExpdENvcmtVdGlscyB9IGZyb20gJ0B1Y2QtbGliL2NvcmstYXBwLXV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwVG9hc3RQb3B1cCBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpXG4gIC53aXRoKExpdENvcmtVdGlscykge1xuXG4gIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmlzaWJsZSA6IHsgdHlwZSA6IEJvb2xlYW4gfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNob3dQb3B1cFxuICAgKiBAZGVzY3JpcHRpb24gc2hvdyB0aGUgcG9wdXAgZm9yIDUgc2Vjb25kc1xuICAgKiBcbiAgICovXG4gIHNob3dQb3B1cCgpIHtcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgfSwgNTAwMCk7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhcHAtdG9hc3QtcG9wdXAnLCBBcHBUb2FzdFBvcHVwKTsiLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0JztcblxuaW1wb3J0IHsgc2hhcmVkU3R5bGVzIH0gZnJvbSAnLi4vc3R5bGVzL3NoYXJlZC1zdHlsZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXIoKSB7IFxuICByZXR1cm4gaHRtbGBcblxuPHN0eWxlIGluY2x1ZGU9XCJzaGFyZWQtc3R5bGVzXCI+XG4gICR7c2hhcmVkU3R5bGVzfVxuXG4gIDpob3N0IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICB9XG5cbiAgW2hpZGRlbl0geyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH1cblxuICAjcG9wdXAge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHotaW5kZXg6IDEwO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtMTApO1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGJvdHRvbTogMXJlbTtcbiAgICByaWdodDogY2FsYyg1MCUgLSAxMTBweCAtIDJyZW0pO1xuICAgIHdpZHRoOiAxMXJlbTtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgbWFyZ2luOiAxcmVtO1xuICAgIGJvcmRlci1yYWRpdXM6IDEuNXJlbTtcbiAgICBib3gtc2hhZG93OiAwcHggM3B4IDZweCAjMDAwMDAwMjk7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUpO1xuICB9XG5cbiAgI3BvcHVwIHN2ZyB7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIHdpZHRoOiAzMHB4O1xuICAgIGZpbGw6IHZhcigtLWNvbG9yLXNhZ2UpO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0b3A6IDAuMnJlbTtcbiAgfVxuPC9zdHlsZT5cblxuPGRpdiBpZD1cInBvcHVwXCIgP2hpZGRlbj1cIiR7IXRoaXMudmlzaWJsZX1cIj5cbiAgPHN2ZyBpZD1cImZhLWNoZWNrXCIgaGVpZ2h0PVwiMWVtXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNi40LjIgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UgKENvbW1lcmNpYWwgTGljZW5zZSkgQ29weXJpZ2h0IDIwMjMgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGQ9XCJNNDM4LjYgMTA1LjRjMTIuNSAxMi41IDEyLjUgMzIuOCAwIDQ1LjNsLTI1NiAyNTZjLTEyLjUgMTIuNS0zMi44IDEyLjUtNDUuMyAwbC0xMjgtMTI4Yy0xMi41LTEyLjUtMTIuNS0zMi44IDAtNDUuM3MzMi44LTEyLjUgNDUuMyAwTDE2MCAzMzguNyAzOTMuNCAxMDUuNGMxMi41LTEyLjUgMzIuOC0xMi41IDQ1LjMgMHpcIi8+PC9zdmc+XG4gIENvcGllZCBzdWNjZXNzZnVsbHlcbjwvZGl2PlxuXG5gO30iLCJpbXBvcnQgeyBMaXRFbGVtZW50LCBodG1sIH0gZnJvbSAnbGl0JztcbmltcG9ydCByZW5kZXIgZnJvbSBcIi4vYXBwLXZpcnR1YWwtc2Nyb2xsZXIudHBsLmpzXCJcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBWaXJ0dWFsU2Nyb2xsZXIgZXh0ZW5kcyBMaXRFbGVtZW50IHtcblxuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1IZWlnaHQgOiB7XG4gICAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgICAgYXR0cmlidXRlOiAnaXRlbS1oZWlnaHQnXG4gICAgICB9LFxuICAgICAgaXRlbXMgOiB7dHlwZTogQXJyYXl9LFxuICAgICAgcmVuZGVyZWRJdGVtcyA6IHt0eXBlOiBBcnJheX1cbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLml0ZW1IZWlnaHQgPSAyMDtcbiAgICB0aGlzLnJlbmRlcmVkSXRlbXMgPSBbXTtcbiAgICB0aGlzLml0ZW1zID0gW107XG4gICAgdGhpcy5oZWlnaHQgPSAtMTtcblxuICAgIHRoaXMuX29uUmVzaXplID0gdGhpcy5fb25SZXNpemUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHRoaXMuX29uVmlld3BvcnRVcGRhdGUoKSk7XG4gIH1cblxuICBmaXJzdFVwZGF0ZWQoKSB7XG4gICAgdGhpcy5wb3NpdGlvbkVsZSA9IHRoaXMucXVlcnlTZWxlY3RvcignLmFwcC12aXJ0dWFsLXNjcm9sbGVyLXNjcm9sbC1wYW5lbCcpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9vblJlc2l6ZSk7XG4gICAgdGhpcy5fY2FjaGVIZWlnaHQoKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX29uUmVzaXplKTtcbiAgfVxuXG4gIGNyZWF0ZVJlbmRlclJvb3QoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBfb25SZXNpemUoZSkge1xuICAgIHRoaXMuX2NhY2hlSGVpZ2h0KHRydWUpO1xuICB9XG5cbiAgX2NhY2hlSGVpZ2h0KGNhbGxWaWV3cG9ydFVwZGF0ZT10cnVlKSB7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLm9mZnNldEhlaWdodDtcbiAgICBpZiggY2FsbFZpZXdwb3J0VXBkYXRlID09PSB0cnVlICkgdGhpcy5fb25WaWV3cG9ydFVwZGF0ZSgpO1xuICB9XG5cbiAgc2V0SXRlbVJlbmRlcmVyKHJlbmRlcmVyLCBzY29wZSkge1xuICAgIHRoaXMucmVuZGVySXRlbSA9IHJlbmRlcmVyO1xuICAgIHRoaXMucmVuZGVySXRlbVNjb3BlID0gc2NvcGUgfHwgdGhpcztcbiAgfVxuXG4gIHVwZGF0ZWQocHJvcHMpIHtcbiAgICBpZiggcHJvcHMuaGFzKCdpdGVtcycpICkge1xuICAgICAgdGhpcy5zY3JvbGxUb3AgPSAwO1xuICAgICAgdGhpcy50b3RhbFNjcm9sbEhlaWdodCA9IHRoaXMuaXRlbUhlaWdodCp0aGlzLml0ZW1zLmxlbmd0aDtcbiAgICAgIHRoaXMucG9zaXRpb25FbGUuc3R5bGUuaGVpZ2h0ID0gKHRoaXMuaXRlbUhlaWdodCp0aGlzLml0ZW1zLmxlbmd0aCkrJ3B4JztcbiAgICB9XG4gICAgaWYoIHByb3BzLmhhcygnaXRlbUhlaWdodCcpIHx8IHByb3BzLmhhcygnaXRlbXMnKSApIHtcbiAgICAgIHRoaXMuX29uVmlld3BvcnRVcGRhdGUodHJ1ZSk7XG4gICAgfVxuXG4gIH1cblxuICBfb25WaWV3cG9ydFVwZGF0ZShmb3JjZT1mYWxzZSkge1xuICAgIGlmKCB0aGlzLmhlaWdodCA8PSAwICkgdGhpcy5fY2FjaGVIZWlnaHQoZmFsc2UpO1xuXG4gICAgbGV0IGZpcnN0SXRlbSA9IE1hdGguZmxvb3IodGhpcy5zY3JvbGxUb3AgLyB0aGlzLml0ZW1IZWlnaHQpIC0gMTtcbiAgICBpZiggZmlyc3RJdGVtIDwgMCApIGZpcnN0SXRlbSA9IDA7XG5cbiAgICBsZXQgbGFzdEl0ZW0gPSBmaXJzdEl0ZW0gKyBNYXRoLmNlaWwodGhpcy5oZWlnaHQgLyB0aGlzLml0ZW1IZWlnaHQpICsgMjtcbiAgICBpZiggbGFzdEl0ZW0gPj0gdGhpcy5pdGVtcy5sZW5ndGggKSBsYXN0SXRlbSA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuXG4gICAgaWYoIHRoaXMuZmlyc3RJdGVtID09PSBmaXJzdEl0ZW0gJiYgdGhpcy5sYXN0SXRlbSA9PT0gbGFzdEl0ZW0gJiYgZm9yY2UgPT09IGZhbHNlICkgcmV0dXJuO1xuICAgIFxuICAgIC8vIGNoZWNrIGZvciBpT1Mgb3ZlcnNjcm9sbCBhbmQgaWdub3JlXG4gICAgaWYoIHRoaXMuaXRlbUhlaWdodCAqIChsYXN0SXRlbS0xKSA+IHRoaXMuaGVpZ2h0ICYmXG4gICAgICAgdGhpcy5zY3JvbGxUb3AgKyB0aGlzLmhlaWdodCArIDUgPiB0aGlzLnRvdGFsU2Nyb2xsSGVpZ2h0ICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLmZpcnN0SXRlbSA9IGZpcnN0SXRlbTtcbiAgICB0aGlzLmxhc3RJdGVtID0gbGFzdEl0ZW07XG5cbiAgICBsZXQgaXRlbXMgPSBbXTtcbiAgICBmb3IoIGxldCBpID0gZmlyc3RJdGVtOyBpIDwgbGFzdEl0ZW07IGkrKyApIHtcbiAgICAgIGl0ZW1zLnB1c2goe2luZGV4OiBpLCB0b3A6IHRoaXMuaXRlbUhlaWdodCppfSk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZWRJdGVtcyA9IGl0ZW1zO1xuXG4gICAgQXJyYXkuZnJvbSh0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJy52cy1yb3cnKSlcbiAgICAgIC5mb3JFYWNoKGVsZSA9PiBlbGUucmVtb3ZlQXR0cmlidXRlKCdob3ZlcicpKTtcbiAgfVxuXG4gIHJlbmRlckl0ZW1zKCkge1xuICAgIC8vIHVwZGF0ZSB0cmlnZ2VyZWQgZnJvbSBuZXN0ZWQgb2JqZWN0XG4gICAgaWYoIHRoaXMucmVuZGVyZWRJdGVtcy5sZW5ndGggPiB0aGlzLml0ZW1zLmxlbmd0aCApIHtcbiAgICAgIHJldHVybiBodG1sYGA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVuZGVyZWRJdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAvLyBiYWRuZXNzXG4gICAgICBpZiggaXRlbS5pbmRleCA+PSB0aGlzLml0ZW1zLmxlbmd0aCApIHtcbiAgICAgICAgcmV0dXJuIGh0bWxgYDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGh0bWxgXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cInZzLXJvd1wiXG4gICAgICAgICAgQG1vdXNlb3Zlcj1cIiR7dGhpcy5fb25Sb3dNb3VzZU92ZXJ9XCJcbiAgICAgICAgICBAbW91c2VvdXQ9XCIke3RoaXMuX29uUm93TW91c2VPdXR9XCIgXG4gICAgICAgICAgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IGxlZnQ6IDA7IHJpZ2h0OiAwOyB0b3A6ICR7aXRlbS50b3B9cHg7IGhlaWdodDogJHt0aGlzLml0ZW1IZWlnaHR9cHhcIj5cbiAgICAgICAgICAke3RoaXMucmVuZGVySXRlbS5hcHBseSh0aGlzLnJlbmRlckl0ZW1TY29wZSwgW2l0ZW0uaW5kZXhdKX1cbiAgICAgICAgPC9kaXY+YFxuICAgICAgfSk7XG4gIH1cblxuICBfb25Sb3dNb3VzZU92ZXIoZSkge1xuICAgIGUuY3VycmVudFRhcmdldC5zZXRBdHRyaWJ1dGUoJ2hvdmVyJywgJ3RydWUnKTtcbiAgfVxuXG4gIF9vblJvd01vdXNlT3V0KGUpIHtcbiAgICBlLmN1cnJlbnRUYXJnZXQucmVtb3ZlQXR0cmlidXRlKCdob3ZlcicpO1xuICB9XG5cbiAgcmVuZGVySXRlbShpbmRleCkge1xuICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3Qgb3ZlcnJpZGUgdGhpcyBtZXRob2QnKTtcbiAgfVxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYXBwLXZpcnR1YWwtc2Nyb2xsZXInLCBBcHBWaXJ0dWFsU2Nyb2xsZXIpO1xuIiwiaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2xpdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHsgXG5yZXR1cm4gaHRtbGBcblxuPHN0eWxlPlxuICBhcHAtdmlydHVhbC1zY3JvbGxlciB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XG4gIH1cblxuICBhcHAtdmlydHVhbC1zY3JvbGxlciAuYXBwLXZpcnR1YWwtc2Nyb2xsZXItc2Nyb2xsLXBhbmVsIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgLyogYm9yZGVyOiAycHggc29saWQgcmVkOyAqL1xuICB9XG48L3N0eWxlPiAgXG5cbjxkaXYgY2xhc3M9XCJhcHAtdmlydHVhbC1zY3JvbGxlci1zY3JvbGwtcGFuZWxcIj5cbiAgJHt0aGlzLnJlbmRlckl0ZW1zKCl9XG48L2Rpdj5cblxuYDt9IiwiaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2xpdCc7XG5cbi8qKlxuICogQGNsYXNzIFNoYXJlZEh0bWxcbiAqIEBkZXNjcmlwdGlvbiBMaXQgaHRtbCB0ZW1wbGF0ZSBzdHJpbmdzIHVzZWQgYWNyb3NzIHRoZSBzaXRlLlxuICogRGVzaWduZWQgdG8gYmUgdXNlZCB3aXRoIERBTVMgc2hhcmVkIHN0eWxlcywgc28gbWFrZSBzdXJlIHlvdSBpbXBvcnQgdGhvc2UgaW50byB5b3VyIGVsZW1lbnRcbiAqL1xuY2xhc3MgU2hhcmVkSHRtbCB7XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgaGVhZGVyRG90c1xuICAgKiBAZGVzY3JpcHRpb24gRGlzcGxheXMgdGhlIHllbGxvdyBkb3RzIGJlbmVhdGggYSBzZWN0aW9uIGhlYWRlclxuICAgKiBAcmV0dXJucyB7VGVtcGxhdGVSZXN1bHR9XG4gICAqL1xuICBoZWFkZXJEb3RzKCl7XG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWRvdHNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG90XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkb3RcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG90XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkb3RcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IFNoYXJlZEh0bWwoKTsiLCJjb25zdCBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcblxuLyoqXG4gKiBAY2xhc3MgVXNlclxuICogQGRlc2NyaXB0aW9uIHdyYXBwZXIgYXJvdW5kIEFQUF9DT05GSUcudXNlclxuICovXG5jbGFzcyBVc2VyIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRhdGEgPSBjb25maWcudXNlcjtcbiAgICBpZiggIXRoaXMuZGF0YS5yb2xlcyApIHRoaXMuZGF0YS5yb2xlcyA9IFtdO1xuICAgIHRoaXMuZWRpdFVpQWNjZXNzID0gWydhZG1pbicsICd1aS1hZG1pbiddO1xuICB9XG5cbiAgaXNMb2dnZWRJbigpIHtcbiAgICBpZiggdGhpcy5kYXRhLmxvZ2dlZEluID09PSB0cnVlICkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY2FuRWRpdFVpKCkge1xuICAgIGZvciggbGV0IHJvbGUgb2YgdGhpcy5lZGl0VWlBY2Nlc3MgKSB7XG4gICAgICBpZiggdGhpcy5oYXNSb2xlKHJvbGUpICkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGhhc1JvbGUocm9sZSkge1xuICAgIHJldHVybiB0aGlzLmRhdGEucm9sZXMuaW5jbHVkZXMocm9sZSk7XG4gIH1cbn1cblxubGV0IHVzZXIgPSBuZXcgVXNlcigpO1xuZXhwb3J0IGRlZmF1bHQgdXNlcjsiLCJjbGFzcyBWaWRlb0xpYkxvYWRlciB7XG4gIGFzeW5jIGxvYWQoKSB7XG4gICAgaWYgKCB0aGlzLmxvYWRlZCApIHJldHVybiB0aGlzLmxvYWRlZDtcblxuICAgIGlmICggdGhpcy5sb2FkaW5nICkge1xuICAgICAgYXdhaXQgdGhpcy5sb2FkaW5nO1xuICAgICAgcmV0dXJuIHRoaXMubG9hZGVkO1xuICAgIH1cblxuICAgIHRoaXMubG9hZGluZyA9IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHBseXIgPSAoIGF3YWl0IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcInZpZGVvLWxpYnNcIiAqLyAncGx5cicpICkuZGVmYXVsdDtcbiAgICAgIC8vIGNvbnN0IHBseXIgPSAoIGF3YWl0IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcInZpZGVvLWxpYnNcIiAqLyAncGx5ci9zcmMvanMvcGx5cicpICkuZGVmYXVsdDtcbiAgICAgIGNvbnN0IHNoYWthID0gYXdhaXQgaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwidmlkZW8tbGlic1wiICovICdzaGFrYS1wbGF5ZXInKTtcbiAgICAgIFxuICAgICAgLy8gSW5zdGFsbCB0aGUgcG9seWZpbGxzIGJlZm9yZSBkb2luZyBhbnl0aGluZyB3aXRoIHRoZSBsaWJyYXJ5XG4gICAgICBhd2FpdCBzaGFrYS5wb2x5ZmlsbC5pbnN0YWxsQWxsKCk7XG5cbiAgICAgIHRoaXMubG9hZGVkID0ge3BseXIsIHNoYWthfTtcblxuICAgICAgcmVzb2x2ZSh0aGlzLmxvYWRlZCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5sb2FkaW5nO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBWaWRlb0xpYkxvYWRlcigpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==