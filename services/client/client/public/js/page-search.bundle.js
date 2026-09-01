"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["page-search"],{

/***/ "./public/elements/pages/search/app-search.js":
/*!****************************************************!*\
  !*** ./public/elements/pages/search/app-search.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppSearch": () => (/* binding */ AppSearch)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_search_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-search.tpl.js */ "./public/elements/pages/search/app-search.tpl.js");
/* harmony import */ var _ucd_lib_theme_elements_utils_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/theme-elements/utils/mixins */ "./public/node_modules/@ucd-lib/theme-elements/utils/mixins/index.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _results_app_search_results_panel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./results/app-search-results-panel */ "./public/elements/pages/search/results/app-search-results-panel.js");
/* harmony import */ var _filtering_app_filters_panel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./filtering/app-filters-panel */ "./public/elements/pages/search/filtering/app-filters-panel.js");
/* harmony import */ var _results_app_search_results_collections__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./results/app-search-results-collections */ "./public/elements/pages/search/results/app-search-results-collections.js");









class AppSearch extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_theme_elements_utils_mixins__WEBPACK_IMPORTED_MODULE_2__.MainDomElement, _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__.LitCorkUtils) {
  
  static get properties() {
    return {
      visible: { type: Boolean },
      results: { type: Array },
      drawerOpen: { type: Boolean },
      firstLoad: { type: Boolean },
      appState: { type: Object },
      wideFiltersPanel: { type: Boolean },
      filtersCollapsed: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.active = true;
    this.render = _app_search_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);

    this.visible = false;
    this.results = [];
    this.drawerOpen = false;
    this.firstLoad = true;
    this.appState = {};
    this.wideFiltersPanel = false;
    this.filtersCollapsed = true;

    this._injectModel(
      "AppStateModel",
      "CollectionModel",
      "RecordModel",
      "SearchVcModel",
      "SeoModel"
    );
  }

  async firstUpdated() {
    if( this.AppStateModel.location.page !== 'search' ) return;

    this._onAppStateUpdate(await this.AppStateModel.get());

    // if( this.appState.location.path[0] === 'search' ) {
    //   let state = this.SearchVcModel.getSearch();
    //   if( state ) this._onSearchVcUpdate(state);
    // }
    window.addEventListener('collapse-filters', this._onCollapseFilters.bind(this));
    window.addEventListener("page-change", this._onPaginationChange.bind(this));
  }

  /**
   * @description AppStateInterface, fired when state updates
   * @param {*} e
   */
  _onAppStateUpdate(e) {
    if( e.location.page !== 'search' ) return;

    this.drawerOpen = e.filtersDrawerOpen ? true : false;
    this.appState = e;
  }

  /**
   * @description _onSearchVcUpdate, fired when record search viewController updates
   * @param {*} e
   */
  _onSearchVcUpdate(e) {
    if (e.state === "error") {
      return document.querySelector("#resultsPanel").onError(e);
    } else if (e.state === "loading") {
      return document.querySelector("#resultsPanel").onLoading();
    }

    if (e.state !== "loaded") return;

    let currentIndex = e.searchDocument.offset;
    let payload = e.payload;
    let total = payload.total.value;
    this.results = payload.results;

    document
      .querySelector("#resultsPanel")
      .renderResults(this.results, total, e.searchDocument.limit, currentIndex);
  }

  /**
   * @method _onPaginationChange
   * @description fired when pagination button is clicked
   *
   * @param {Object} e
   */
  _onPaginationChange(e) {
    let searchDoc = this.RecordModel.getCurrentSearchDocument();
    this.RecordModel.setPaging(searchDoc, e.detail.startIndex, e.detail.itemsPerPage || searchDoc.limit);
    this.RecordModel.setSearchLocation(searchDoc);
  }

  /**
   * @method _toggleDrawer
   * @description toggles the drawer state.  Listens to
   * toggle-drawer event from app-search-results-panel
   */
  _toggleDrawer() {
    this.AppStateModel.set({ filtersDrawerOpen: !this.drawerOpen });
  }

  _onFiltersTabUpdate(e) {
    this.wideFiltersPanel = e.detail.value === "info" ? true : false;
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.querySelector('#resultsPanel')._resizeAsync();
      });
    }, 300);
  }

  _onCollapseFilters(e) {
    this.filtersCollapsed = true;
    this.drawerOpen = false;
    this.AppStateModel.set({ filtersDrawerOpen: this.drawerOpen });
  }

  expandFilters() {
    this.filtersCollapsed = false;
    this.drawerOpen = true;
    this.AppStateModel.set({ filtersDrawerOpen: this.drawerOpen });    
  }
}

customElements.define("app-search", AppSearch);


/***/ }),

/***/ "./public/elements/pages/search/app-search.tpl.js":
/*!********************************************************!*\
  !*** ./public/elements/pages/search/app-search.tpl.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");


function render() {
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <style include="shared-styles">
      :host {
        display: block;
        overflow: hidden;
      }
      .search-container {
        background-color: var(--super-light-background-color);
        /* min-height: 60vh; */
        display: block;
      }
      .search-content {
        flex: 1;
        padding-bottom: 35px;
        background-color: white;
      }

      /* app-filters-panel {
        width: 350px;
      }
      app-filters-panel[data-wide] {
        width: 475px;
      } */

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 0.7;
        }
      }

      /* #desktop-filter-panel {
        display: none;
      } */

      .filters-container {
        /* width: 350px; */
        background-color: var(--color-aggie-blue-40);
        transition: width 300ms linear;
      }

      @media (max-width: 1025px) {
        /* app-filters-panel {
          width: 275px;
        }
        app-filters-panel[data-wide] {
          width: 415px;
        }
        .filters-container {
          width: 275px;
        } */
      }

      /* @media (min-width: 975px) { */
      #desktop-filter-panel {
        display: block;
      }
      .search-container {
        /* display: flex; */
        display: grid;
        grid-template-areas: "first first first second second second second second second second second second";
        --l-gap: 1.5rem;
        grid-column-gap: var(--l-gap-override, var(--l-gap));
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: max-content 1fr;
      }

      .filters-container {
        grid-area: first;
        min-width: 0;
        --l-gap: 1.5rem;
      }

      .search-content {
        grid-area: second;
        min-width: 0;
        --l-gap: 1.5rem;
      }

      @media (max-width: 1023px) {
        .search-container {
          grid-template-areas: "first first first first second second second second second second second second";
        }
      }

      /* } */

      @media (max-width: 767px) {
        .search-container {
          display: block;
        }
     
        /* mobile */
        app-filters-panel {
          z-index: 2000;
          width: 90vw;
          transition: all 0.3s;

          /* prevent scrolling? */
          position: fixed;
          overflow-y: scroll;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }

        app-filters-panel.off-canvas--left {
          transform: translateX(-100%);
        }
        .filters-container {
          width: 0;
        }
      }

      @media (min-width: 768px) {
        /* tablet */
      }

      @media (min-width: 991px) {
        /* desktop */
      }
    </style>

    <div class="search-container">
      <div class="filters-container">
        <app-filters-panel
          id="desktop-filter-panel"
          class="filters-panel ${this.filtersCollapsed
            ? "off-canvas--left"
            : ""}"
          data-${this.wideFiltersPanel ? "wide" : "normal"}
          @selected-tab-changed="${this._onFiltersTabUpdate}"
          @collapse-filters="${this._onCollapseFilters}"
        ></app-filters-panel>
      </div>
      <div class="search-content">
        <app-search-results-panel
          id="resultsPanel"
          @toggle-drawer="${this._toggleDrawer}"
          @page-change="${this._onPaginationChange}"
        >
        </app-search-results-panel>
      </div>
    </div>

    <app-search-results-collections
      id="collectionsPanel"
    ></app-search-results-collections>
  `;
}


/***/ }),

/***/ "./public/elements/pages/search/filtering/app-facet-filter.js":
/*!********************************************************************!*\
  !*** ./public/elements/pages/search/filtering/app-facet-filter.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_facet_filter_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-facet-filter.tpl.js */ "./public/elements/pages/search/filtering/app-facet-filter.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _app_normal_checkbox_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-normal-checkbox.js */ "./public/elements/pages/search/filtering/app-normal-checkbox.js");
/* harmony import */ var clone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! clone */ "./public/node_modules/clone/clone.js");
/* harmony import */ var clone__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(clone__WEBPACK_IMPORTED_MODULE_4__);









class AppFacetFilter extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {

  static get properties() {
    return {
      label : { type : String },
      filter : { type : String },
      ignore : { type : Array },
      valueMap : { type : Object },
      buckets : { type : Array },
      bucketsIronList : { type : Array },
      ironListActive : { type : Boolean },
      notified : { type : Object },
      includeTypeahead : { type : Boolean },
      typeaheadField : { type : String },
      noOverflow : { type : Boolean }
    };
  }

  constructor() {
    super();
    this.active = true;
    this.render = _app_facet_filter_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);

    this.updateTimer = -1;
    this.label = '';
    this.filter = '';
    this.ignore = [];
    this.valueMap = null;
    this.buckets = [];
    this.bucketsIronList = [];
    this.ironListActive = false;
    this.notified = {};
    this.includeTypeahead = false;
    this.typeaheadField = '';
    this.noOverflow = true;

    this._injectModel('FiltersModel', 'RecordModel');
  }

  resize() {
    requestAnimationFrame(() => {
      let overflowDiv = this.shadowRoot.querySelector('.overflow');

      if( overflowDiv && overflowDiv.offsetHeight >= 190 ) {
        this.noOverflow = false;
      }
    });
  }

  _onFilterBucketsUpdate(e) {
    if( e.filter !== this.filter ) return;
    
    // TODO temp remove oac isPartOf records
    e.buckets = e.buckets.filter(b => !b.key.includes('oac.cdlib.org'));

    e.buckets.forEach(item => {
      if( this.notified[item.key] && !item.active ) {
        this._notifySelected(item.active, item.key, item.doc_count);
      } else if( !this.notified[item.key] && item.active ) {
        this._notifySelected(item.active, item.key, item.doc_count);
      }
      if( APP_CONFIG.collectionLabels[item.key] ) {
        let valueMap = {};
        valueMap[item.key] = APP_CONFIG.collectionLabels[item.key];
        item.valueMap = valueMap;
      }
    });

    this.bucketsIronList = [];
    this.buckets = e.buckets;
    this.ironListActive = false;

    if( this.buckets.length >= 15 ) {
      this.includeTypeahead = true;
    }

    requestAnimationFrame(() => {
      this.dispatchEvent(
        new CustomEvent('update-visibility', {
          detail: {
            show: (e.buckets.length !== 0)
          }
        })
      );  
    });
  }

  getBuckets() {
    return this.ironListActive ? this.bucketsIronList : this.buckets;
  }

  /**
   * @method onParentFilterClicked
   * @description called from parent toggle panel when selected filter
   * is clicked
   * 
   * @param {String} key filter key 
   */
  onParentFilterClicked(key) {
    let searchDoc = this.RecordModel.getCurrentSearchDocument()
    this.RecordModel.setPaging(searchDoc, 0);
    this.RecordModel.removeKeywordFilter(searchDoc, this.filter, key);
    this.RecordModel.setSearchLocation(searchDoc);

    this._notifySelected(false, key);
  };

  /**
   * @method _notifySelected
   * @description notify parent of selected/unselected filter
   * 
   * @param {Boolean} selected is the filter selected
   * @param {String} key filter key/label
   * @param {Number} count filter count of search results
   */
  _notifySelected(selected, key, count) {
    if( !selected && this.notified[key] ) {
      delete this.notified[key];
    } else if( selected ) {
      this.notified[key] = true;
    }

    this.dispatchEvent(
      new CustomEvent(`${selected ? 'add' : 'remove'}-selected`, {
        detail: {
          label: key,
          count
        }
      })
    );
  }

  _toggleFilter(e) {
    if( !e.currentTarget.hasAttribute('checked') ) {
      this.appendFilter(e);
    } else {
      this.removeFilter(e);
    }
  }

  appendFilter(e) {
    let buckets = this.getBuckets();
    let item = buckets[parseInt(e.currentTarget.getAttribute('index'))];
    if( item.empty ) return;

    // reset typeahead incase it was active
    this.shadowRoot.querySelector('#typeahead').value = '';
    if( this.originalBuckets ) {
      this.originalBuckets = null;
    }

    let searchDoc = this.RecordModel.getCurrentSearchDocument();
    this.RecordModel.setPaging(searchDoc, 0);
    this.RecordModel.appendKeywordFilter(searchDoc, this.filter, item.key);
    this.RecordModel.setSearchLocation(searchDoc);

    this._notifySelected(true, item.key, item.doc_count);
  }

  removeFilter(e) {
    let buckets = this.getBuckets();
    let item = buckets[parseInt(e.currentTarget.getAttribute('index'))];

    let searchDoc = this.RecordModel.getCurrentSearchDocument();
    this.RecordModel.setPaging(searchDoc, 0);
    this.RecordModel.removeKeywordFilter(searchDoc, this.filter, item.key);
    this.RecordModel.setSearchLocation(searchDoc);

    this._notifySelected(false, item.key, item.doc_count);
  }

  /**
   * @method _onTypeaheadKeyup
   * @description bound to typeahead text input keyup event
   * 
   * @param {Object} e 
   */
  _onTypeaheadKeyup() {
    this._updateTypeahead();
  }

  _updateTypeahead() {
    let text = this.shadowRoot.querySelector('#typeahead').value;
    if( !text ) {
      if( this.originalBuckets ) {

        if( this.ironListActive ) {
          this.bucketsIronList = this.originalBuckets;
        } else {
          this.buckets = this.originalBuckets;
        }

        this.originalBuckets = null;
      }
      return;
    }

    if( !this.originalBuckets ) {
      this.originalBuckets = [...(this.ironListActive ? this.bucketsIronList : this.buckets)];
    }

    let re = new RegExp('.*'+text.toLowerCase()+'.*', 'i');
    let buckets = this.originalBuckets.filter(item => item.sortKey.match(re) || item.valueMap?.[item.key]?.match(re) ? true : false);

    if( this.ironListActive ) {
      this.bucketsIronList = buckets;
    } else {
      this.buckets = buckets;
    }
  }

}

window.customElements.define('app-facet-filter', AppFacetFilter);

/***/ }),

/***/ "./public/elements/pages/search/filtering/app-facet-filter.tpl.js":
/*!************************************************************************!*\
  !*** ./public/elements/pages/search/filtering/app-facet-filter.tpl.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../styles/shared-styles */ "./public/elements/styles/shared-styles.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../lib/utils */ "./public/lib/utils/index.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib_utils__WEBPACK_IMPORTED_MODULE_2__);





function render() { 
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`

<style>
  ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__.sharedStyles}
  :host {
    display: block;
  }

  [hidden] { display: none !important; }

  .filter {
    padding: 4px 0;
    display: flex;
    align-items: center;
  }
  .filter a {
    display: inline-block;
    cursor: pointer;
    color: black;
    transition: color 250ms ease-out, transform 250ms ease-out;
    transform: scale(1);
  }
  .filter a span {
    color: var(--default-primary-color);
  }
  .filter a:hover {
    transform: scale(1.5);
    color: var(--default-primary-color);
  }

  .typehead-panel {
    margin-right: 12px;
    margin-bottom: 1rem;
    position: relative;
  }
  #typeahead {
    width: 100%;
    box-sizing: border-box;
    padding: 0 5px;
    background: var(--color-aggie-blue-30);
    border: none;
    height: 55px;
    padding-left: 1rem;
    outline: none;
    font-size: 1rem;
  }

  .active-filter {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: white;
    font-size: 14px;
    background: var(--primary-text-color);
    padding: 5px;
    border-radius: 3px;
    margin: 3px;
  }

  .active-filter:hover {
    color: var(--default-primary-color);
    background: #ccc;
  }

  .count {
    color: var(--text-disabled);
    flex: 1;
    text-align: right;
    min-width : 1.5rem;
    padding: 0 0 0 10px;
    box-sizing: border-box;
    min-width: fit-content;
  }
  .count.has-count {
    color: black;
  }

  .overflow {
    overflow-y: auto;
    overflow-x: hidden;    
    max-height: 200px;
    padding-right: 12px;
  }

  iron-list {
    height: 200px;
    display: none;
  }

  app-normal-checkbox {
    overflow: hidden;
    padding-right: 5px;
  }

  paper-checkbox[active] .key {
    color: var(--default-primary-color);
    font-weight: bold;
  }

  paper-checkbox[disabled] .key {
    color: var(--secondary-text-color);
    font-style: italic;
  }

  .overflow {
    overflow-y: scroll;
  }

  .overflow::-webkit-scrollbar {
    width: 10px;
  }
  .overflow::-webkit-scrollbar-track {
    background: var(--color-aggie-blue-60);
    border-left: 4px solid var(--color-aggie-blue-40);
    border-right: 4px solid var(--color-aggie-blue-40);
  }
  .overflow[no-overflow]::-webkit-scrollbar-track {
    background: transparent;
    border: none;
  }
  .overflow[no-overflow] {
    scrollbar-color: transparent transparent;
  }
  .overflow::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: var(--color-aggie-blue-80);
  }

  /* basic support for FF. Chrome/Safari should support -webkit styles above */
  @supports(scrollbar-color: red blue) {
    * {
      scrollbar-color: var(--color-aggie-blue-80) var(--color-aggie-blue-40);
      scrollbar-width: thin;
    }
  }

  ucdlib-icon.typeahead-search-icon {
    position: absolute;
    right: 1rem;
    top: 17px;
    fill: var(--color-aggie-blue-50);
    width: 22px;
    height: 22px;
    max-width: 22px;
    max-height: 22px;
    min-width: 22px;
  }

  #typeahead::placeholder {
    color: var(--color-aggie-blue-80);
  }
</style>

<!-- typeahead search -->
<div class="typehead-panel" ?hidden="${!this.includeTypeahead}">
  <input id="typeahead" 
    type="text" 
    placeholder="Search ${this.label}s" 
    @keyup="${this._onTypeaheadKeyup}" />
    <ucdlib-icon class="typeahead-search-icon" icon="ucdlib-dams:fa-magnifying-glass"></ucdlib-icon>
</div>

<div class="overflow" ?no-overflow="${this.noOverflow}">
  <div>  
    ${this.buckets.map((item, index) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <div class="filter">

      <app-normal-checkbox
        type="${item.label}"
        index="${index}"
        value="${item.key}"
        .labelMap="${item.valueMap}"
        ?checked="${item.active}" 
        @change="${this._toggleFilter}"
        ?disabled="${item.disabled}">
      </app-normal-checkbox>

      <div class="count ${item.doc_count > 0 ? 'has-count' : ''}">${_lib_utils__WEBPACK_IMPORTED_MODULE_2___default().formatNumberWithCommas(item.doc_count)}</div>
    </div>
    `)}
  </div>
</div>

`;}

/***/ }),

/***/ "./public/elements/pages/search/filtering/app-filter-panel.js":
/*!********************************************************************!*\
  !*** ./public/elements/pages/search/filtering/app-filter-panel.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppFilterPanel": () => (/* binding */ AppFilterPanel)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_filter_panel_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-filter-panel.tpl.js */ "./public/elements/pages/search/filtering/app-filter-panel.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _app_range_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-range-filter */ "./public/elements/pages/search/filtering/app-range-filter.js");
/* harmony import */ var _app_facet_filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-facet-filter */ "./public/elements/pages/search/filtering/app-facet-filter.js");








class AppFilterPanel extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
    .with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {

  static get properties() {
    return {
      filter : { type : Object },
      opened : { type : Boolean },
      selected : { type : Array }
    };
  }

  constructor() {
    super();
    this.render = _app_filter_panel_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this._injectModel('AppStateModel');

    this.filter = {};
    this.opened = false;
    this.selected = [];
  }

  firstUpdated() {
    if( !this.filter ) return;

    this.innerHTML = '';
    var ele = document.createElement('app-'+this.filter.type+'-filter');
    ele.label = this.filter.label;
    ele.filter = this.filter.filter;
    ele.ignore = this.filter.ignore;
    ele.valueMap = this.filter.valueMap || {};
    ele.isDollar = this.filter.isDollar;

    ele.includeTypeahead = false; // initially collapsed
    ele.typeaheadField = this.filter.typeaheadField;

    ele.addEventListener('update-visibility', (e) => {
      this.style.display = e.detail.show ? 'block' : 'none';
      this._toggleViewableFacets(e);
    });
    ele.addEventListener('add-selected', (e) => {
      let index = this.selected.findIndex(item => item.label === e.detail.label);
      if( index > -1 ) return;
      e.detail.niceLabel = this._getLabel(e.detail.label);
      this.selected.push(e.detail);
      this._toggleViewableFacets(e);
    });
    ele.addEventListener('remove-selected', (e) => {
      let index = this.selected.findIndex(item => item.label === e.detail.label);
      if( index === -1 ) return;
      this.selected.splice(index, 1);
      this._toggleViewableFacets(e);
    });
    ele.addEventListener('set-selected', (e) => {
      if( e.detail.selected ) {
        e.detail.niceLabel = this._getLabel(e.detail.label);
        this.selected = [e.detail];
      } else {
        this.selected = [];
      }
    });

    this.ele = ele;
    
    this.shadowRoot.querySelector('#filters').appendChild(ele);
    this._toggleViewableFacets();
  }

  _toggleViewableFacets(e) {
    // even collapsed filter view, selected filters shouldn't be hidden
    let searchFilters = this.shadowRoot.querySelectorAll('app-facet-filter');

    searchFilters.forEach(searchFilter => {
      let filters = searchFilter.shadowRoot.querySelectorAll('.filter');
      filters.forEach(filter => {        
        let checkbox = filter.querySelector('app-normal-checkbox');
        if( checkbox.hasAttribute('checked') ) {
          filter.style.display = 'flex';
        } else {
          filter.style.display = this.opened ? 'flex' : 'none';
        }
      });
      let typeahead = searchFilter.shadowRoot.querySelector('.typehead-panel');
      if( typeahead ) {
        typeahead.style.display = this.opened ? 'block' : 'none';
      }
    });

    let rangeFilter = this.shadowRoot.querySelector('app-range-filter');
    if( rangeFilter ) {
      rangeFilter.parentElement.style.display = this.opened ? 'block' : 'none';
    }
  }

  _getLabel(label) {
    if( !this.filter.valueMap ) return label;
    if( typeof this.filter.valueMap === 'object' ) {
      return this.filter.valueMap[label] || label;
    }
    return this.filter.valueMap(label);
  }

  /**
   * @method toggle
   * @description toggle opened state
   */
  toggle() {
    this.opened = !this.opened;
    this._toggleViewableFacets();
    this._toggleOpened();
  }

  /**
   * @method _toggleOpened
   * @description if opened is true, tell the child to resize
   */
  _toggleOpened() {
    if( !this.opened ) return;
    if( this.ele && this.ele.resize ) {
      this.ele.resize();
    }
  }

  /**
   * @method _onToggleClicked
   * @description bound to main label click/keyboard events. Toggle
   * the panel.
   * 
   * @param {Object} e Click/Keyword event
   */
  _onToggleClicked(e) {
    if( e.type === 'keyup' ) { // from keyboard event
      if( e.which !== 13 && e.which !== 32 ) return;
    }

    this.toggle();
  }

  /**
   * @method _onFilterClicked
   * @description called when selected filter is clicked,
   * notify child of click
   */
  _onFilterClicked(e) {
    if( e.type === 'keyup' ) { // from keyboard event
      if( e.which !== 13 ) return;
    }

    this._notifyFilterClicked(e.currentTarget.getAttribute('label'));
    this.toggle();
  }

  /**
   * @method _onFilterClicked
   * @description notify child of filter click
   */
  _notifyFilterClicked(label) {
    if( !this.ele ) return;
    if( !this.ele.onParentFilterClicked ) return;
    this.ele.onParentFilterClicked(label);
  }

}

window.customElements.define('app-filter-panel', AppFilterPanel);

/***/ }),

/***/ "./public/elements/pages/search/filtering/app-filter-panel.tpl.js":
/*!************************************************************************!*\
  !*** ./public/elements/pages/search/filtering/app-filter-panel.tpl.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../styles/shared-styles */ "./public/elements/styles/shared-styles.js");



function render() { 
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`

  <style>
    ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__.sharedStyles}
    :host {
      display: block;
    }

    .active-filter:hover #close ucdlib-icon {
      fill: var(--color-aggie-gold-80);
      border-radius: 50%;
      background-color: var(--color-aggie-blue-90);
      transition: background-color 0.3s ease-in-out;
      transition: fill 0.3s ease-in-out;
    }

    [hidden] { display: none !important; }

    .label {
      cursor: pointer;
      display: flex;
      color: var(--default-primary-color);
      padding: 10px 0;
      font-weight: bold;
      position: relative;
      outline: none !important;
    }

    .highlight {
      position: absolute;
      left: -10px;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color:  var(--default-secondary-color);
      display: none;
    }

    .label:focus > .highlight {
      display: block;
    }

    .filter {
      display: flex;
      cursor: pointer;
      align-items: center;
      font-weight: bold;
      /* font-style: italic; */
    }

    iron-icon[closed] {
      transform: rotate(-90deg);
    }

    iron-icon[clear] {
      color: var(--color-aggie-blue-80);
      margin-right: 2px;
    }

    ucdlib-icon {
      fill: var(--color-aggie-blue-80);
      width: 18px;
      height: 18px;
    }

    .active-filter {
      color: var(--color-aggie-blue);
    }

    #close {
      width: 50px;
      height: 50px;
      display: inline-flex;
      align-items: center;
      margin-right: 0.5rem;
    }

    #close ucdlib-icon {
      padding: 3px;
      min-width: 1.2rem;
      min-height: 1.2rem;
    }

    .value {
      display: flex;
      align-items: center;
      line-height: normal;
    }

    .count {
      color: var(--text-disabled);
      flex: 1;
      text-align: right;
      min-width: 40px;
      padding: 0 10px;
      font-weight: 400;
    }

    .active-filter {
      flex: 2;
    }

    /* JM - think this is redundant, scroll inforced by app-*-filter element */
    /* #filters {
      overflow-y: auto;
      max-height: 200px;
    } */
  </style>

  <div class="label" @click="${this._onToggleClicked}" @keyup="${this._onToggleClicked}" role="button" tabindex="0">
    <div style="flex: 1; font-size: 1.15rem">${this.filter.label}</div>
    
    <!-- <iron-icon icon="arrow-drop-down" ?closed="${!this.opened}"></iron-icon> -->
    <div style="padding-right: 1rem; padding-top: .5rem;">
      <ucdlib-icon icon="ucdlib-dams:fa-caret-right" ?hidden=${this.opened}></ucdlib-icon>
      <ucdlib-icon icon="ucdlib-dams:fa-caret-down" ?hidden=${!this.opened}></ucdlib-icon>
    </div>
    
    <div class="highlight"></div>
  </div>

  <div id="filters"></div>
  <!-- <div id="filters" ?hidden="${!this.opened}"></div> -->
  

`;}

/***/ }),

/***/ "./public/elements/pages/search/filtering/app-filters-panel.js":
/*!*********************************************************************!*\
  !*** ./public/elements/pages/search/filtering/app-filters-panel.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _polymer_iron_pages_iron_pages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @polymer/iron-pages/iron-pages */ "./public/node_modules/@polymer/iron-pages/iron-pages.js");
/* harmony import */ var _app_filter_panel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-filter-panel */ "./public/elements/pages/search/filtering/app-filter-panel.js");
/* harmony import */ var _app_filters_panel_tpl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-filters-panel.tpl.js */ "./public/elements/pages/search/filtering/app-filters-panel.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../lib/config */ "./public/lib/config.js");
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lib_config__WEBPACK_IMPORTED_MODULE_5__);








// init facet filters from template

const facetFilters = [];
for (var key in (_lib_config__WEBPACK_IMPORTED_MODULE_5___default().elasticSearch.facets)) {
  let c = (_lib_config__WEBPACK_IMPORTED_MODULE_5___default().elasticSearch.facets)[key];
  facetFilters.push({
    label: c.label,
    type: c.type,
    ignore: c.ignore,
    valueMap: c.valueMap,
    isDollar: c.isDollar,
    includeTypeahead: c.typeahead ? true : false,
    typeaheadField: c.typeahead,
    filter: key,
  });
}

class AppFiltersPanel extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_4__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement).with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_4__.LitCorkUtils) {
  static get properties() {
    return {
      facetFilters: { type: Array },
      selectedCollection: { type: Object },
      collectionMode: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.render = _app_filters_panel_tpl_js__WEBPACK_IMPORTED_MODULE_3__["default"].bind(this);
    this.active = true;
    this._injectModel("AppStateModel");

    this.facetFilters = facetFilters;
    this.selectedCollection = {};
    this.collectionMode = false;
  }

  /**
   * @method _fireToggleDrawer
   * @description called from toggle button, dispatches event for app-search to handle hiding drawer;
   */
  _fireToggleDrawer() {
    this.dispatchEvent(new CustomEvent("toggle-drawer", {
      bubbles: true,
      composed: true,
      detail: 'toggle-drawer'
    }));
  }

  /**
   * @method _removeCollectionFilter
   * @description fired from hard coded collection filter checkbox.  Remove
   * collection filter when clicked
   */
  _removeCollectionFilter() {
    let searchDoc = this._getCurrentSearchDocument();
    this.RecordModel.removeKeywordFilter(searchDoc, "isPartOf.@id");
    this.RecordModel.setPaging(searchDoc, 0);
    this.RecordModel.setSearchLocation(searchDoc);
  }

  _collapseFilters(e) {
    this.dispatchEvent(new CustomEvent("collapse-filters", {
      bubbles: true,
      composed: true,
      detail: 'collapse-filters'
    }));
  }
}

customElements.define("app-filters-panel", AppFiltersPanel);

/***/ }),

/***/ "./public/elements/pages/search/filtering/app-filters-panel.tpl.js":
/*!*************************************************************************!*\
  !*** ./public/elements/pages/search/filtering/app-filters-panel.tpl.js ***!
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
    <style>
      ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__.sharedStyles} :host {
        background-color: var(--color-aggie-blue-40);
        position: relative;
      }

      #filters {
        margin-left: 12px;
      }

      .title {
        color: var(--default-primary-color);
        font-weight: bold;
        padding: 15px 0;
        margin-left: 10px;
        border-bottom: 1px solid var(--medium-background-color);
        display: none;
      }

      app-filter-panel {
        border-bottom: 1px solid white;
        padding: 0.4rem 0;
      }

      .thumbnail {
        background-size: cover;
        background-position: center center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .thumbnail-root {
        position: relative;
        height: 200px;
      }

      .label {
        padding: 10px 0;
        color: var(--default-primary-color);
        font-weight: var(--fw-bold);
      }

      .collection-filter {
        padding: 4px 5px;
        border-bottom: 1px solid var(--medium-background-color);
      }

      .outer-drawer-toggle {
        position: relative;
      }
      .outer-drawer-toggle[spacer] {
        height: 50px;
        border-bottom: 1px solid var(--medium-background-color);
        margin-left: 10px;
      }

      .drawer-toggle {
        font-size: var(--fs-sm);
        position: absolute;
        z-index: 15;
        top: 15px;
        right: -24px;
        cursor: pointer;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        font-weight: var(--fw-bold);
        color: var(--default-primary-color);
        background-color: var(--light-background-color);
        border-radius: 0;
        border: 0;
        padding: 0;
      }
      .drawer-toggle > span {
        padding: 0 10px;
      }
      .drawer-toggle iron-icon {
        background-color: var(--default-secondary-color);
      }

      @media (min-width: 975px) {
        h2 {
          display: block;
        }
        .outer-drawer-toggle {
          display: none;
        }
        .title {
          display: block;
        }
      }



      /* MOBILE LAYOUT */

      .heading {
        background-color: var(--color-aggie-blue-80);
        padding: 0 1rem;
        height: 61.75px;
      }
      .heading h5 {
        color: white;
        display: inline-block;
        margin: 0.8rem 0;
        font-weight: 600;
        font-size: 1.5rem;
      }
      .heading .collapse {
        display: inline-block;
        float: right;
        cursor: pointer;
        width: 60px;
        height: 60px;
      }

      .heading ucdlib-icon {
        fill: var(--color-aggie-gold);
        float: right;
        padding-top: 0.9rem;
      }

      .heading {
        display: none;
      }

      @media (max-width: 767px) {
        .heading {
          display: block;
          /* margin-top: 52px; */
        }
        :host {
          box-shadow: 0px 3px 6px #00000029;
        }
        .overflow {
          overflow-y: auto;
          height: calc(100vh - 100px);
        }
      }

    </style>

    <div class="heading">
      <h5>Filters</h5>
      <div class="collapse" @click="${this._collapseFilters}">
        <ucdlib-icon
          icon="ucdlib-dams:fa-times"
          tabindex="0"
          icon="fa-times"
          alt="Collapse filters"
        >
        </ucdlib-icon>
      </div>
    </div>

    <div class="thumbnail-root" ?hidden="${!this.collectionMode}">
      <div
        class="thumbnail"
        style="background-image: url('${
          this.selectedCollection.thumbnailUrl
        }')"
      ></div>
    </div>

    <div class="overflow">
      <div id="filters">
        ${this.facetFilters.map(
          (item, index) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
            <app-filter-panel .filter="${item}"></app-filter-panel>
          `
        )}
      </div>
    </div>


    </div>
  `;
}


/***/ }),

/***/ "./public/elements/pages/search/filtering/app-normal-checkbox.js":
/*!***********************************************************************!*\
  !*** ./public/elements/pages/search/filtering/app-normal-checkbox.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppNormalCheckbox": () => (/* binding */ AppNormalCheckbox)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_normal_checkbox_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-normal-checkbox.tpl.js */ "./public/elements/pages/search/filtering/app-normal-checkbox.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");






class AppNormalCheckbox extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
    .with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {
  
  static get properties() {
    return {
      value : { type : String },
      label : { type : String },
      labelMap : { type : Object },
      labelMapType : { type : String },
      realLabel: { type: String },
      checked : { type : Boolean },
      disabled : { type : Boolean },
      ariaChecked : { type : String },
      ariaDisabled : { type : String },
      role : { type : String },
      tabindex : { type : Number }
    };
  }

  constructor() {
    super();
    this.render = _app_normal_checkbox_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.active = true;

    this.value = '';
    this.label = '';
    this.labelMap = null;
    this.labelMapType = null;
    this.realLabel = '';
    this.checked = false;
    this.disabled = false;
    this.ariaChecked = '';
    this.ariaDisabled = '';
    this.role = 'checkbox';
    this.tabindex = 0;

    this.addEventListener('click', e => this._onClick(e));
    this.addEventListener('keyup', e => {
      if( e.which !== 13 ) return;
      this._onClick(e)
    });
  }

  willUpdate() {
    this.checked = this.hasAttribute('checked');
  }

  /**
   * @method _realLabel
   * @description render label
   * 
   * @param {String} value 
   * @param {String} label 
   */
  _realLabel(value, label) {
    return this._getLabel();
  }

  /**
   * @method _computeAriaChecked
   * @description Bound to 'checked' property.  set aria-checked value
   */
  _computeAriaChecked() {
    return this.checked ? 'true' : 'false';
  }

  /**
   * @method _computeAriaDisabled
   * @description Bound to 'disabled' property.  set aria-disabled value
   */
  _computeAriaDisabled() {
    return this.disabled ? 'true' : 'false';
  }

  /**
   * @method _computeTabIndex
   * @description Bound to 'disabled' property.  set tabindex value
   */
  _computeTabIndex() {
    return this.disabled ? -1 : 0;
  }

  /**
   * @method _getLabel
   * @description return label for a value
   */
  _getLabel() {
    if( this.labelMapType === null ) this._onLabelMapUpdate();
    if( !this.labelMapType ) return this.value;
    
    if( this.labelMapType === 'object' && typeof this.labelMap === 'object' && this.labelMap[this.value] ) {
      return this.labelMap[this.value];
    } else if( this.labelMapType === 'function' ) {
      return this.labelMap(this.value);
    }

    return this.value;
  }

  /**
   * @method _onLabelMapUpdate
   * @description bound to 'labelMap' property observer.  set the 
   * labelMapType property
   */
  _onLabelMapUpdate() {
    this.labelMapType = '';
    if( !this.labelMap ) return;
    this.labelMapType = typeof this.labelMap;
  }

  /**
   * @method _onClick
   * @description called when div wrapper is clicked
   * 
   * TODO: add aria checkbox role
   */
  _onClick() {
    if( this.disabled ) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('change', {bubbles: true, composed: true}));
  }

}

window.customElements.define('app-normal-checkbox', AppNormalCheckbox);

/***/ }),

/***/ "./public/elements/pages/search/filtering/app-normal-checkbox.tpl.js":
/*!***************************************************************************!*\
  !*** ./public/elements/pages/search/filtering/app-normal-checkbox.tpl.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../styles/shared-styles */ "./public/elements/styles/shared-styles.js");



function render() { 
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`

<style>
  ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__.sharedStyles}

  :host {
    display: block;
    cursor: pointer;
  }

  :host(:focus) {
    outline: var(--default-outline);
  }

  :host(:hover) #close ucdlib-icon {
      fill: var(--color-aggie-gold-80);
      border-radius: 50%;
      background-color: var(--color-aggie-blue-90);
      transition: background-color 0.3s ease-in-out;
      transition: fill 0.3s ease-in-out;
    }

  :host([disabled]) {
    cursor: default;
    outline: none !important;
  }

  [hidden] { display: none !important; }

  iron-icon {
    display: none;
    color: var(--color-aggie-blue-80);
    min-width: 24px;
    margin-right: 2px;
  }

  div {
    user-select: none;
    display: flex;
    min-height: 24px;
    align-items: top;
  }

  span {
    /* padding-top: 3px; */
    line-height: normal;
  }

  div[checked] iron-icon {
    display: inline-block;
  }

  div[checked] .value {
    font-weight: bold;
    display: flex;
    align-items: center;
    color: var(--color-aggie-blue);
  }

  div[disabled] #close,
  div #close {
    display: none;
  }

  div[disabled] .value {
    color: var(--gray-text);
  }
  div[checked] #close {
    max-width: 35px;
    height: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  ucdlib-icon {
    fill: var(--color-aggie-blue-80);
    width: 1rem;
    height: 1rem;
  }

  #close ucdlib-icon {
    padding: 3px;
    min-width: 1.2rem;
    min-height: 1.2rem;
    margin-right: 0.2rem;
  }

</style>

<div ?checked="${this.checked}" ?disabled="${this.disabled}">

  <div id="close">
    <ucdlib-icon icon="ucdlib-dams:fa-times" @click="${this._onClick}"></ucdlib-icon>
  </div>   

  <span class="value">${this._realLabel()}</span>
</div>
`;}

/***/ }),

/***/ "./public/elements/pages/search/filtering/app-range-filter.js":
/*!********************************************************************!*\
  !*** ./public/elements/pages/search/filtering/app-range-filter.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppRangeFilter)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_range_filter_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-range-filter.tpl.js */ "./public/elements/pages/search/filtering/app-range-filter.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _utils_app_range_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/app-range-slider */ "./public/elements/utils/app-range-slider.js");







class AppRangeFilter extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement).with(
  _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils
) {
  static get properties() {
    return {
      label: { type: String },
      filter: { type: String },
      absMinValue: { type: Number },
      absMaxValue: { type: Number },
      minValue: { type: Number },
      maxValue: { type: Number },
      showUnknown: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.render = _app_range_filter_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.active = true;

    this.label = "";
    this.filter = "";
    this.absMinValue = -1;
    this.absMaxValue = -1;
    this.minValue = -1;
    this.maxValue = Number.MAX_VALUE;
    this.showUnknown = false;

    this._injectModel("AppStateModel", "RecordModel", "CollectionModel", "FiltersModel");
  }

  async firstUpdated() {
    if( this.AppStateModel.location.page !== 'search' ) return;

    let searchDoc = this.RecordModel.getCurrentSearchDocument();
    if( searchDoc ) {
      this._onRecordSearchUpdate(await this.RecordModel.search(searchDoc));
    }

    this.resize();
  }

  resize() {
    this.shadowRoot.querySelector("#slider")._onResize();

    setTimeout(() => {
      this.shadowRoot.querySelector("#slider")._onResize();
    }, 100);
  }

  /**
   * @method _isDefaultState
   * @description is range filter in the default state?  ie abs min/max
   * is the same as min/max and unknown values are included?  If so
   * we don't actually need a filter on.
   */
  _isDefaultState() {
    if (!this._isFilterApplied()) {
      let searchDoc = this.RecordModel.getCurrentSearchDocument();
      this.RecordModel.removeRangeFilter(searchDoc, this.filter);
      this.RecordModel.setSearchLocation(searchDoc);

      return true;
    }
    return false;
  }

  /**
   * @method _onRangeSliderChange
   * @description bound to custom 'range-value-change' event from app-range-slider
   */
  _onRangeSliderChange(e) {
    this.minValue = e.detail.min;
    this.maxValue = e.detail.max;

    this.shadowRoot.querySelector("#minValueInput").value = this.minValue;
    this.shadowRoot.querySelector("#maxValueInput").value = this.maxValue;

    this._onRangeNullChange();
  }

  /**
   * @method _onRangeNullChange
   * @description bound to input checkbox.  Currently called by internal
   * functions as well to search after value change :/
   */
  _onRangeNullChange() {
    let value = {
      gte: this.minValue,
      lte: this.maxValue,
    };

    if (this.shadowRoot.querySelector("#unknown").checked) {
      value.includeNull = true;
    }

    // remove filter and return
    if (this._isDefaultState()) return;

    let searchDoc = this.RecordModel.getCurrentSearchDocument();
    this.RecordModel.setPaging(searchDoc, 0);
    this.RecordModel.appendRangeFilter(searchDoc, this.filter, value);
    this.RecordModel.setSearchLocation(searchDoc);
  }

  /**
   * @method _onInputChange
   * @description bound to min/max number inputs.
   */
  _onInputChange() {
    let min = this.shadowRoot.querySelector("#minValueInput").value;
    let max = this.shadowRoot.querySelector("#maxValueInput").value;

    if (min < this.absMinValue) {
      this.shadowRoot.querySelector("#minValueInput").value = this.absMinValue;
      min = this.absMinValue;
    }
    if (max > this.absMaxValue) {
      this.shadowRoot.querySelector("#maxValueInput").value = this.absMaxValue;
      max = this.absMaxValue;
    }
    if (min > max) min = max;

    this.minValue = min;
    this.maxValue = max;

    this._onRangeNullChange();
  }

  /**
   * @method _onFilterBucketsUpdate
   * @description from FilterService
   * 
   * @param {Object} e
   */
  _onFilterBucketsUpdate(e) {
    if( e.filter !== '@graph.isPartOf.@id' ) return;

    if( e.buckets.length === 1 ) {
      this.selectedCollection = e.buckets[0].key;
    } else {
      this.selectedCollection = '';
    }
    this._renderFilters();
  }

  /**
   * @method _onRecordSearchUpdate
   * @description from RecordInterface
   *
   * @param {Object} e
   */
  _onRecordSearchUpdate(e) {
    if (e.state !== "loaded") return;

    this.currentFilters = e.searchDocument.filters || {};
    this._renderFilters();
  }

  /**
   * @method _renderFilters
   * @description called after a collection is selected or a filter set updates.
   * make sure range filter is set correctly.
   *
   */
  async _renderFilters() {
    if (!this.currentFilters) return;

    // grab default aggregations for collection
    let result;
    if( this.selectedCollection ) {
      let facets = this.FiltersModel.getFacets();
      result = await this.RecordModel.defaultSearch(this.selectedCollection, null, null, facets);        
    } else {
      result = await this.RecordModel.defaultSearch('');
    }
    this.default = result;

    let rangeFilter = this.default?.payload?.aggregations?.ranges?.[this.filter];
    if (rangeFilter) {
      this.absMinValue = rangeFilter.min;
      this.absMaxValue = rangeFilter.max;
    } else {
      return this._show(false);
    }

    this._show(true);

    // make sure any current values are set correctly
    if (this.minValue < this.absMinValue || !this.currentFilters[this.filter]) {
      this.minValue = this.absMinValue;
      this.shadowRoot.querySelector("#minValueInput").value = this.minValue;
    }
    if (this.maxValue > this.absMaxValue || !this.currentFilters[this.filter]) {
      this.maxValue = this.absMaxValue;
      this.shadowRoot.querySelector("#maxValueInput").value = this.maxValue;
    }

    // now set the current filters from search
    if (this.currentFilters[this.filter]) {
      let value = this.currentFilters[this.filter].value;

      this.minValue = value.gte;
      this.maxValue = value.lte;
      this.shadowRoot.querySelector("#minValueInput").value = this.minValue;
      this.shadowRoot.querySelector("#maxValueInput").value = this.maxValue;
      this.shadowRoot.querySelector("#unknown").checked = value.includeNull
        ? true
        : false;
    }

    // to trigger slider rerender when filters are removed
    let rangeSlider = this.shadowRoot.querySelector("app-range-slider");
    if (rangeSlider) {
      rangeSlider.hasRendered = false;
    }

    this._notifySelected();
  }

  /**
   * @method _isFilterApplied
   * @description is there currenlty a filter set
   *
   * @return {Boolean}
   */
  _isFilterApplied() {
    if (
      this.minValue === this.absMinValue &&
      this.maxValue === this.absMaxValue &&
      this.shadowRoot.querySelector("#unknown").checked === true
    ) {
      return false;
    }
    return true;
  }

  /**
   * @method _notifySelected
   * @description notify parent of selected/unselected filter
   */
  _notifySelected() {
    let selected = false;
    let key = "";

    if (
      this.minValue !== this.absMinValue ||
      this.maxValue !== this.absMaxValue ||
      !this.shadowRoot.querySelector("#unknown").checked
    ) {
      selected = true;
    }

    if (selected) {
      key = this.minValue + " to " + this.maxValue;
    }

    this.dispatchEvent(
      new CustomEvent(`set-selected`, {
        detail: {
          selected,
          label: key,
        },
      })
    );
  }

  /**
   * @method _show
   * @description notify parent to hide/show filter
   *
   * @param {Boolean} show should the parent hide or show filter
   */
  _show(show) {
    requestAnimationFrame(() => {
      this.dispatchEvent(
        new CustomEvent("update-visibility", {
          detail: { show },
        })
      );  
    });
  }

  /**
   * @method reset
   * @description reset range filter
   */
  reset() {
    this.minValue = this.absMinValue;
    this.maxValue = this.absMaxValue;
    this.shadowRoot.querySelector("#unknown").checked = true;

    this._onRangeNullChange();
  }

  /**
   * @method onParentFilterClicked
   * @description called from parent toggle panel when selected filter
   * is clicked.  Reset slider
   */
  onParentFilterClicked() {
    this.reset();
  }
}

customElements.define("app-range-filter", AppRangeFilter);

/***/ }),

/***/ "./public/elements/pages/search/filtering/app-range-filter.tpl.js":
/*!************************************************************************!*\
  !*** ./public/elements/pages/search/filtering/app-range-filter.tpl.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../styles/shared-styles */ "./public/elements/styles/shared-styles.js");



function render() { 
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`


<style>
  ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__.sharedStyles}
  :host {
    display: block;
  }

  [hidden] { display: none !important; }
  
  .labels {
    display: flex;
    margin: 0 23px 0 13px;
    color: var(--gray-text);
    font-size: var(--fs-sm);
  }

  .inputs {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  input[type="number"] {
    border: 0;
    width: 3.3rem;
    height: 61px;
    padding: 0 1rem;
    margin: 0;
    font-size: var(--fs-sm);
    background: var(--color-aggie-blue-30);
  }

  .unknown {
    margin-left: 9px;
    display: flex;
    align-items: center;
  }

  label {
    font-size: 0.85rem;
    padding-left: 5px;
  }

  app-range-slider {
    --light-background-color: var(--medium-background-color);
  }
</style>

<div class="inputs">
  <input id="minValueInput" type="number" @change="${this._onInputChange}">
  <span> - </span>
  <input id="maxValueInput" type="number" @change="${this._onInputChange}">
</div>

<div style="margin-right: 10px">
  <app-range-slider
    id="slider"
    @range-value-change="${this._onRangeSliderChange}"
    abs-min-value="${this.absMinValue}"
    abs-max-value="${this.absMaxValue}"
    min-value="${this.minValue}"
    max-value="${this.maxValue}">
  </app-range-slider>
</div>

<div class="labels">
  <div style="flex:1">${this.absMinValue}</div>
  <div>${this.absMaxValue}</div>
</div>

<div class="unknown" ?hidden="${this.showUnknown}">
  <input type="checkbox" id="unknown" @click="${this._onRangeNullChange}" checked />
  <label for="unknown">include unknown / unspecified</label>
</div>
`;}

/***/ }),

/***/ "./public/elements/pages/search/results/app-search-grid-result.js":
/*!************************************************************************!*\
  !*** ./public/elements/pages/search/results/app-search-grid-result.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppSearchGridResult": () => (/* binding */ AppSearchGridResult)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_search_grid_result_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-search-grid-result.tpl.js */ "./public/elements/pages/search/results/app-search-grid-result.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");


// import AppSearchResult from "./app-search-result"




/**
 * @class AppSearchGridResult
 * @description UI component class for displaying a item preview card
 *
 * @prop {String} id - Item id
 * If used, element will query the RecordModel for the item data.
 * @prop {Object} data - Data object containing item information
 * @prop {String} itemUrl - Url to item
 * @prop {String} thumbnailUrl - Thumbnail url
 * @prop {String} title - Item title
 */
class AppSearchGridResult extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement).with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {
  static get properties() {
    return {
      id: { type: String, attribute: "data-itemid" },
      data: { type: Object },
      itemUrl: { type: String },
      thumbnailUrl: { type: String },
      title: { type: String },
      bounds: { type: Array },
      size: { type: Object },
      imageHeight: { type: Number },
      mediaTypes: { type: Array }
    };
  }

  constructor() {
    super();
    this.active = true;
    this.render = _app_search_grid_result_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);

    this.id = "";
    this.data = {};
    this.title = "";
    this.itemUrl = "";
    this.thumbnailUrl = "";
    this.bounds = [];
    this.size = {};
    this.imageHeight = 0;
    this.mediaTypes = [];

    this._injectModel("RecordModel");
  }

  /**
   * @method firstUpdated
   * @description Lit lifecycle method called when element is updated.
   * @param {Map} props - Properties that have changed.
   */
  firstUpdated(props) {
    if (this.data.id) {
      this.title = this.data.title;
      this.itemUrl = this.data.id;
      this.thumbnailUrl = this.data.thumbnailUrl || '/images/tree-bike-illustration.png';
      this.size = this.data.size;

      if (this.thumbnailUrl) this._renderImage();
      if (this.data.mediaTypes?.includes("Image")) {
        this.mediaTypes.push("image");
      } 
      if (this.data.mediaTypes?.includes("Video")) {
        this.mediaTypes.push("video");
      } 
      if (this.data.mediaTypes?.includes("Audio")) {
        this.mediaTypes.push("audio");
      }
      if( this.data.multiImage ) {
        this.mediaTypes.push("imageList");
      }
    } else {
      this._getItem(this.id);
    }
  }

  async _onRecordUpdate(e) {
    if (e.state !== "loaded" || e.id !== this.id) return;

    this.record = e.vcData;
    if( this.record.images ) {
      let images = this.record.images;
      this.thumbnailUrl = images.medium ? images.medium.url : images.original.url;
    }
    this.title = this.record.name;
    this.itemUrl = this.record['@id'];
    this.id = this.record['@id'];
    this._renderImage();
  }

  /**
   * @method _loadImage
   * @description preload image and set bounds to image dimensions
   *
   * @param {String} url url of image to load
   *
   * @returns {Promise} resolves when image is loaded and bounds array has been set
   */
  _loadImage(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();

      img.onload = () => {
        let res = [img.naturalHeight, img.naturalWidth];
        this.bounds = [[0, 0], res];
        resolve();
      };

      img.src = url;
    });
  }

  /**
   * @method _getItem
   * @description Fetches item data from RecordModel
   * @param {String} id - Item id to fetch
   */
  async _getItem(id) {
    this._onRecordUpdate(await this.RecordModel.get(id));
  }

  async _renderImage() {
    if( !this.size.width || !this.size.height ) {
      await this._loadImage(this.thumbnailUrl);
    }

    this._calcImageHeight();
    this.dispatchEvent(new CustomEvent("rendered", { detail: this }));

    requestAnimationFrame(() => {
      let img = this.shadowRoot.querySelector("#img");
      if (img.complete) {
        img.style.display = "block";
      } else {
        img.onload = () => {
          img.style.display = "block";
        };
      }
    });
  }

  _calcImageHeight() {
    let img = this.shadowRoot.querySelector("#img");
    let width = 100;
    if( img ) {
      img.style.display = "block";
      width = img.width;
      img.style.display = "none";  
    }

    let imageHeight = this.size.height || this.bounds?.[1]?.[0] || 100;
    let imageWidth = this.size.width || this.bounds?.[1]?.[1] || 100;
    let ratio = imageHeight / imageWidth;
    let height = width * ratio;
    this.imageHeight = height;
  }
}

customElements.define("app-search-grid-result", AppSearchGridResult);


/***/ }),

/***/ "./public/elements/pages/search/results/app-search-grid-result.tpl.js":
/*!****************************************************************************!*\
  !*** ./public/elements/pages/search/results/app-search-grid-result.tpl.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");


function render() {
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <style include="shared-styles">
      :host {
        display: block;
        width: var(--grid-cell-width);
        background-color: white;
      }

      [hidden] {
        display: none !important;
      }

      @keyframes show-img {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      img {
        box-sizing: border-box;
        display: none;
        cursor: pointer;
      }

      img:hover,
      img:focus {
        border-color: var(--default-secondary-color);
      }

      .collection-name {
        color: var(--color-aggie-blue-70);
        font-size: 0.95rem;
      }

      .year {
        color: var(--gray-text);
        font-weight: var(--fw-light);
        flex: 1;
      }

      .footer {
        display: flex;
        align-items: center;
        margin-top: 10px;
      }

      h4 {
        margin: 5px 0;
        color: var(--default-primary-color);
      }

      iron-icon {
        color: var(--default-primary-color);
      }

      .image {
        position: relative;
        background-size: cover;
        background-color: transparent;
        background-position: center center;
        /* max-width: 383px; */
      }

      .card-text {
        padding: 15px;
        line-height: 1.3;
      }

      .video-thumbnail {
        z-index: 1000;
        width: 30px;
        height: 30px;
        position: absolute;
        bottom: 0;
        right: 0;
        background-image: url("https://via.placeholder.com/25");
      }

      @media (max-width: 768px) {
        .image {
          margin: auto;
        }
        .card-text {
          text-align: center;
        }
      }

      .media-types {
        position: absolute;
        right: 0.25rem;
        bottom: 0.75rem;
        display: flex;
      }

      .media-type {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: var(--color-aggie-blue-80);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.5rem 0.5rem 0 0;
      }

      ucdlib-icon {
        width: 1.2rem;
        height: 1.2rem;
        fill: white;
      }
    </style>

    <div class="image" id="imgRoot" style="height: ${this.imageHeight}px;">
      <img
        id="img"
        alt="${this.title}"
        src="${this.thumbnailUrl}"
        style="height: ${this.imageHeight}px; width: 100%; display: none;"
        onload="this.style.display = 'block';"
        />
      <div ?hidden="${!this.isVideo}" class="video-thumbnail"></div>
      <div class="media-types">        
        <div class="media-type"
          ?hidden="${!this.mediaTypes.includes('video')}">
          <ucdlib-icon
            class="vertical-link__image"
            icon="ucdlib-dams:fa-play">
          </ucdlib-icon>
        </div>
        <div class="media-type"
          ?hidden="${!this.mediaTypes.includes('audio')}">
          <ucdlib-icon
            class="vertical-link__image"
            icon="ucdlib-dams:fa-volume-high">
          </ucdlib-icon>
        </div>      
        <div class="media-type"
          ?hidden="${!this.mediaTypes.includes('imageList')}">
          <ucdlib-icon
            class="vertical-link__image"
            icon="ucdlib-dams:item-stack-blank">
          </ucdlib-icon>
        </div>
      </div>
    </div>

    <div class="card-text">
      <div class="collection-name">${this.title}</div>
    </div>
  `;
}


/***/ }),

/***/ "./public/elements/pages/search/results/app-search-list-result.js":
/*!************************************************************************!*\
  !*** ./public/elements/pages/search/results/app-search-list-result.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppSearchListResult": () => (/* binding */ AppSearchListResult)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_search_list_result_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-search-list-result.tpl.js */ "./public/elements/pages/search/results/app-search-list-result.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");


// import AppSearchResult from "./app-search-result";




/**
 * @class AppSearchListResult
 * @description UI component class for displaying a item preview card
 *
 * @prop {String} id - Item id
 * If used, element will query the RecordModel for the item data.
 * @prop {Object} data - Data object containing item information
 * @prop {String} itemUrl - Url to item
 * @prop {String} thumbnailUrl - Thumbnail url
 * @prop {String} title - Title
 * @prop {String} date - Date of digitization
 * @prop {String} collection - Collection item belongs to
 * @prop {String} format - Item format
 */
class AppSearchListResult extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement).with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {
  static get properties() {
    return {
      id: { type: String, attribute: "data-itemid" },
      data: { type: Object },
      itemUrl: { type: String },
      thumbnailUrl: { type: String },
      title: { type: String },
      date: { type: String },
      collection: { type: String },
      format: { type: String },
      creator: { type: String },
    };
  }

  constructor() {
    super();
    this.active = true;
    this.render = _app_search_list_result_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);

    this.id = "";
    this.data = {};
    this.itemUrl = "";
    this.thumbnailUrl = "";
    this.title = "";
    this.date = "";
    this.collection = "";
    this.format = "";
    this.creator = "";

    this._injectModel("RecordModel");
  }

  /**
   * @method willUpdate
   * @description Lit lifecycle method called when element is updated.
   * @param {Map} props - Properties that have changed.
   */
  willUpdate(props) {
    if (this.data.id) {
      let collectionName = APP_CONFIG.collectionLabels[this.data.collectionId?.['@id']] || '';
      this.itemUrl = this.data.id;
      this.thumbnailUrl = this.data.thumbnailUrl || '/images/tree-bike-illustration.png';
      this.title = this.data.title;
      this.date = this.data.date;
      this.collection = collectionName;
      this.format = this.data.format;
      this.creator = this.data.creator;
    } else {
      this._getItem(this.id);
    }
  }

  async _onRecordUpdate(e) {
    if (e.state !== "loaded" || e.id !== this.id) return;

    this.record = e.vcData;
    if( this.record.images ) {
      let images = this.record.images;
      this.thumbnailUrl = images.medium ? images.medium.url : images.original.url;
    }
    this.title = this.record.name;
    this.itemUrl = this.record['@id'];
    this.id = this.record['@id'];

    // TODO populate
    // this.date = res.date;
    // this.collection = res.collection;
    // this.format = res.format;
    
  }

  /**
   * @method _getItem
   * @description Fetches item data from RecordModel
   * @param {String} id - Item id to fetch
   */
  async _getItem(id) {
    this._onRecordUpdate(await this.RecordModel.get(id));
  }
}

customElements.define("app-search-list-result", AppSearchListResult);


/***/ }),

/***/ "./public/elements/pages/search/results/app-search-list-result.tpl.js":
/*!****************************************************************************!*\
  !*** ./public/elements/pages/search/results/app-search-list-result.tpl.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");


function render() {
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <style include="shared-styles">
      :host {
        display: block;
        background-color: white;
        margin: 2rem 10px;
        border: 2px solid transparent;
        transition: background-color 0.3s ease-in-out;
      }

      :host(:hover),
      :host(:focus) {
        cursor: pointer;
        /*border: 2px solid var(--default-secondary-color);*/
        outline: none !important;
        background-color: var(--color-aggie-gold-30);
      }

      .img {
        flex: 1;
        height: 250px;
        width: var(--grid-cell-width);
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        width: 33%;
        /* flex: 33%;         */
      }

      .collection-title {
        color: var(--color-aggie-blue-80);
        font-weight: bold;
        border-bottom: 6px dotted var(--color-dams-secondary);
        padding: 0.5rem 0;
      }

      .year {
        color: var(--gray-text);
        flex: 1;
      }

      .footer {
        display: flex;
        align-items: center;
        margin-top: 10px;
      }

      .layout {
        display: flex;
        padding: 1rem;
      }

      h4 {
        margin: 10px 0;
        color: var(--default-primary-color);
      }

      iron-icon {
        color: var(--default-primary-color);
      }

      .flex-vertical {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .data {
        padding: 0 0 0 2.5rem;
        flex: 2;
        overflow: hidden;
      }

      .collection-details {
        padding-top: 1rem;
      }

      .collection-details .label {
        font-weight: bold;
        padding-right: 0.3rem;
      }

      .collection-details p {
        margin: 0.2rem 0;
      }

      @media (max-width: 600px) {
        .img {
          height: auto;
          width: 150px;
          background-position: initial;
        }

        .data {
          padding: 0 0 0 1.5rem;
        }

        :host {
          display: block;
          background-color: white;
          margin: 10px 0;
        }
      }
    </style>

    <div class="layout">
      <div
        style="background-image: url('${this.thumbnailUrl}')"
        class="img"
        aria-label="${this.title}"
      ></div>

      <div class="data">
        <div class="flex-vertical">
          <div class="collection-title">${this.title}</div>

          <!-- <div class="spacer"></div> -->

          <div class="collection-details">
            <p><span class="label">Collection:</span> ${this.collection}</p>
            <p ?hidden="${!this.creator}"><span class="label">Creator:</span> ${this.creator}</p>
            <p ?hidden="${!this.date}"><span class="label">Date:</span> ${this.date}</p>
            <p ?hidden="${!this.format}"><span class="label">Format:</span> ${this.format}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}


/***/ }),

/***/ "./public/elements/pages/search/results/app-search-results-collections.js":
/*!********************************************************************************!*\
  !*** ./public/elements/pages/search/results/app-search-results-collections.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_search_results_collections_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-search-results-collections.tpl.js */ "./public/elements/pages/search/results/app-search-results-collections.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _components_cards_dams_collection_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/cards/dams-collection-card */ "./public/elements/components/cards/dams-collection-card.js");
/* harmony import */ var _ucd_lib_theme_elements_ucdlib_ucdlib_icon_ucdlib_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon */ "./public/node_modules/@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon.js");
/* harmony import */ var _utils_app_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/app-icons */ "./public/elements/utils/app-icons.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../lib/utils/index.js */ "./public/lib/utils/index.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_6__);











class AppSearchResultsCollections extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
      .with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {

  static get properties() {
    return {
      results : { type : Array },
      resultsDisplayed : { type : Array }, // filtered results
      showResults : { type : Boolean },
      currentPage : { type : Number },
      paginationTotal : { type : Number }
    }
  }

  constructor() {
    super();
    this.active = true;
    this.render = _app_search_results_collections_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);

    this.resultsDisplayed = [];
    this.results = [];
    this.showResults = false;
    this.currentPage = 1;
    this.paginationTotal = 1;
    this.resultsPerPage = 6;

    this._injectModel('AppStateModel', 'FiltersModel', 'SearchVcModel', 'CollectionModel', 'RecordModel');
  }

  async _onAppStateUpdate(e) {
    if( e.location.page !== 'search' ) return;
    this.results = [];

    this.filterDisplayResults();
    this._updateResultsDisplayed();

    this._onCollectionSearchUpdate(await this.CollectionModel.search({ text: this.RecordModel.lastQuery?.text }));
  }

  _onCollectionSearchUpdate(e) {
    if( e.state !== 'loaded' ) return;
    if( !this.RecordModel.lastQuery?.text ) return;

    // combine collection search with item search 
    // (ie match collections regardless of items in search, and show collections where items are matched from them)
    let collections = (e.payload?.results || []).map(c => ({ '@id': c.root?.['@id'], score: c._score || 0 }));
    collections.forEach(c => {
      if( !this.results.find(r => r['@id'] === c['@id']) ) this.results.push(c);      
    });
  }

  /**
   * @method _onFilterBucketsUpdate
   * @description called when collection/record search events occur, aggregation query results
   * @param {Object} e
   */
  _onFilterBucketsUpdate(e) {
    if( e.filter !== '@graph.isPartOf.@id' ) return;
    // temp remove oac isPartOf records
    e.buckets = e.buckets.filter(b => !b.key.includes('oac.cdlib.org') && b.doc_count > 0);

    let results = e.buckets.map(r => {
      return {
        '@id' : r.key,
        count : r.doc_count
      };
    });
    results.forEach(r => {
      if( !this.results.find(res => res['@id'] === r['@id']) ) this.results.push(r);      
    });

    // update scores by fusing score / counts
    this.results = _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_6___default().fuseScore(this.results);

    let searchText = this.SearchVcModel.getSearch()?.searchDocument?.text;
    let searchFilters =  this.SearchVcModel.getSearch()?.searchDocument?.filters || {};
    if( searchText || ( Object.keys(searchFilters).length && Object.keys(searchFilters).filter(k => k !== '@graph.isPartOf.@id' ).length ) ) {
      this.showResults = this.results.length > 0;
      this.results = [...this.results];
      this.paginationTotal = Math.ceil(this.results.length / this.resultsPerPage);
      this.filterDisplayResults();   
    } else {
      this.showResults = false;
    }    
    this._updateResultsDisplayed();
  }

  filterDisplayResults() {    
    // need to respond to filters being clicked for collection
    // if a single collection is selected in filters, need to only show that collection in this.results
    let decodedUrl = decodeURIComponent(this.AppStateModel.location.pathname);
    if( !decodedUrl.includes('@graph.isPartOf.@id') ) {
      this.resultsDisplay = [...this.results];
      return;
    } 

    // filter this.resultsDisplay to only this.results where @id matches the collection id in the url
    let collectionIds = decodedUrl.split('@graph.isPartOf.@id","or","')[1].split('"]')[0].split(',');
    this.results = [...this.results.filter(r => collectionIds.includes(r['@id']))];
  }

  _updateResultsDisplayed(scrollTo=false) {
    let start = (this.currentPage - 1) * this.resultsPerPage;
    let end = start + this.resultsPerPage;
    this.resultsDisplayed = this.results.slice(start, end);

    this.logger.warn('Not calling collection base scrolling: TODO');
    // let collections = this.shadowRoot.querySelector(".collections-in-search");
    // if (collections && scrollTo) {
    //   window.scrollTo({
    //     top: window.scrollY + collections.getBoundingClientRect().y - 100,
    //     left: 0,
    //     behavior: "smooth",
    //   });
    // }
    
    this.requestUpdate();
  }

  /**
   * @method _onCollectionClicked
   * @description called when collection img on home page is clicked 
   * @param {Object} e
   */
  _onCollectionClicked(e) {
    e.preventDefault();
    if( e.type === 'keyup' && e.which !== 13 ) return;
    let id = e.currentTarget.getAttribute('data-id');
    this.AppStateModel.setLocation(id);
  }

  /**
   * @method _onPageClicked
   * @description called when pagination page is clicked
   * @param {Object} e
   */
  _onPageClicked(e) {
    this.currentPage = e.detail.page;
    this._updateResultsDisplayed(true);
  }
}

customElements.define('app-search-results-collections', AppSearchResultsCollections);

/***/ }),

/***/ "./public/elements/pages/search/results/app-search-results-collections.tpl.js":
/*!************************************************************************************!*\
  !*** ./public/elements/pages/search/results/app-search-results-collections.tpl.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../styles/shared-styles */ "./public/elements/styles/shared-styles.js");
/* harmony import */ var _ucd_lib_theme_elements_brand_ucd_theme_pagination_ucd_theme_pagination_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/theme-elements/brand/ucd-theme-pagination/ucd-theme-pagination.js */ "./public/node_modules/@ucd-lib/theme-elements/brand/ucd-theme-pagination/ucd-theme-pagination.js");





function render() {
return lit__WEBPACK_IMPORTED_MODULE_0__.html`
  <style>
    ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__.sharedStyles}

    :host {
      display: block;
      position: relative;
      background-color: var(--color-aggie-blue-80);
      background-image: url(/images/watercolors/watercolor-background-ucd-blue-20opacity.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    [hidden] { display: none !important; }

    h3 {
      color: var(--color-aggie-gold);
      font-weight: 700;
      margin: 0;
      padding: 3rem 3rem 0.5rem 4.5%;
    }

    .card-grid {
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-gap: 3rem;
      max-width: 91%;
    }

    ucd-theme-pagination {
      display: flex;
      justify-content: center;
      box-sizing: border-box;
    }

    @media (max-width: 768px) {
      .card-grid {
        grid-template-columns: repeat(1, minmax(0, 1fr));
        max-width: 90%;
      }
    }

    .collections-in-search {
      padding-bottom: 35px;
    }

  </style>

  <div class="collections collections-in-search" ?hidden="${!this.showResults}">
    <div>
      <h3>Collections Relevant to Your Search (${this.results.length})</h3>
      <div style="text-align:center" class="collections-content">
        <div class="card-grid">
          ${this.resultsDisplayed.map(res => lit__WEBPACK_IMPORTED_MODULE_0__.html`
            <dams-collection-card data-dark-bg data-id="${res['@id']}" @click=${this._onCollectionClicked}></dams-collection-card>
          `)}
        </div>  
      </div>
    </div>
    <ucd-theme-pagination
      ?hidden="${this.paginationTotal < 2}"
      current-page=${this.currentPage}
      max-pages=${this.paginationTotal}
      @page-change=${this._onPageClicked}
      xs-screen
      darkmode
      ellipses>
    </ucd-theme-pagination>
  </div>

  
`;}

/***/ }),

/***/ "./public/elements/pages/search/results/app-search-results-panel.js":
/*!**************************************************************************!*\
  !*** ./public/elements/pages/search/results/app-search-results-panel.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_search_results_panel_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-search-results-panel.tpl.js */ "./public/elements/pages/search/results/app-search-results-panel.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _app_search_grid_result__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-search-grid-result */ "./public/elements/pages/search/results/app-search-grid-result.js");
/* harmony import */ var _app_search_list_result__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-search-list-result */ "./public/elements/pages/search/results/app-search-list-result.js");
/* harmony import */ var _utils_app_collection_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/app-collection-card */ "./public/elements/utils/app-collection-card.js");
/* harmony import */ var _components_cards_dams_collection_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/cards/dams-collection-card */ "./public/elements/components/cards/dams-collection-card.js");
/* harmony import */ var _components_cards_dams_item_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/cards/dams-item-card */ "./public/elements/components/cards/dams-item-card.js");
/* harmony import */ var _ucd_lib_theme_elements_ucdlib_ucdlib_icon_ucdlib_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon */ "./public/node_modules/@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon.js");
/* harmony import */ var _utils_app_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../utils/app-icons */ "./public/elements/utils/app-icons.js");









// import "../filtering/app-top-active-filters";






const SEARCH_RESULTS_LAYOUT = "search-results-layout";
let initIsListLayout = localStorage.getItem(SEARCH_RESULTS_LAYOUT);

class AppSearchResultsPanel extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement).with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {
  static get properties() {
    return {
      results: { type: Array }, // array of search results
      totalCollections: { type: Number },
      collectionResults : { type: Array }, // array of collection search results
      gridMargin: { type: Number }, // size in px's between each masonary layout cell
      isGridLayout: { type: Boolean }, // are we in grid layout
      isListLayout: { type: Boolean },
      isMosaicLayout: { type: Boolean },
      total: { type: String }, // UI display of total results
      numPerPage: { type: Number },
      currentIndex: { type: Number },
      // showCollectionResults : { type: Boolean },
      showError: { type: Boolean },
      showLoading: { type: Boolean },
      errorMsg: { type: Boolean },
      paginationTotal: { type: Number }, // total number for pagination widget, we max out at 10000
      totalOverMaxWindow: { type: Boolean },
      currentPage: { type: Number },
      loading: { type: Boolean },
      lastSearch: { type: String }
    };
  }

  constructor() {
    super();
    this.active = true;
    this.render = _app_search_results_panel_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);

    this.gridMargin = 15;

    if (initIsListLayout === "grid") {
      this.isGridLayout = true;
      this.isListLayout = false;
      this.isMosaicLayout = false;
    } else if (initIsListLayout === "list") {
      this.isGridLayout = false;
      this.isListLayout = true;
      this.isMosaicLayout = false;
    } else {
      this.isGridLayout = false;
      this.isListLayout = false;
      this.isMosaicLayout = true;
    }

    this._reset();

    this.resizeTimer = -1;
    window.addEventListener("resize", () => this._resizeAsync());

    this._injectModel(
      "AppStateModel",
      "CollectionModel",
      "RecordModel",
      "MediaModel",
      "SearchVcModel",
      "FiltersModel"
    );
    this.EventBus().on("show-collection-search-results", (show) =>
      this._updateCollectionResultsVisibility(show)
    );
  }

  firstUpdated() {
    this._setSelectedDisplay();
  }

  /**
   * @method _onAppStateUpdate
   * @description from AppStateInterface, called when app state updates
   *
   * @param {Object} e
   */
  async _onAppStateUpdate(e) {
    if (e.location.page !== "search") return;

    if( this.AppStateModel.location.fullpath !== this.lastSearch ) {
      this._reset();
      this.lastSearch = this.AppStateModel.location.fullpath;
    }

    this._setSelectedDisplay();
    // this._resizeAsync();
    this.filterDisplayResults();

    this._onCollectionSearchUpdate(await this.CollectionModel.search({ text: this.RecordModel.lastQuery?.text }));
  }

  _reset() {
    this.results = [];
    this.collectionResults = [];
    this.totalCollections = 0;
    this.total = "";
    this.numPerPage = 20;
    this.currentIndex = 0;
    this.currentPage = 1;
    this.showCollectionResults = false;
    this.showError = false;
    this.showLoading = false;
    this.errorMsg = false;
    this.paginationTotal = 0;
    this.totalOverMaxWindow = false;
    this.loading = true;
  }

  _onCollectionSearchUpdate(e) {
    if( e.state !== 'loaded' ) return;
    if( !this.RecordModel.lastQuery?.text ) return;

    // combine collection search with item search 
    // (ie match collections regardless of items in search, and show collections where items are matched from them)
    let collections = (e.payload?.results || []).map(c => ({ '@id': c.root?.['@id'] }));
    collections.forEach(c => {
      if( !this.collectionResults.find(r => r['@id'] === c['@id']) ) this.collectionResults.push(c);
    });
  }

  /**
   * @method _onFilterBucketsUpdate
   * @description called when collection/record search events occur, aggregation query results
   * @param {Object} e
   */
  _onFilterBucketsUpdate(e) {
    if( e.filter !== '@graph.isPartOf.@id' ) return;
    // temp remove oac isPartOf records
    e.buckets = e.buckets.filter(b => !b.key.includes('oac.cdlib.org') && b.doc_count > 0);

    let collectionResults = e.buckets.map(r => {
      return {
        '@id' : r.key,
      };
    });

    collectionResults.forEach(r => {
      if( !this.collectionResults.find(res => res['@id'] === r['@id']) ) this.collectionResults.push(r);
    });

    let searchText = this.SearchVcModel.getSearch()?.searchDocument?.text;
    let searchFilters =  this.SearchVcModel.getSearch()?.searchDocument?.filters || {};
    if( searchText || ( Object.keys(searchFilters).length && Object.keys(searchFilters).filter(k => k !== '@graph.isPartOf.@id' ).length ) ) {
      this.totalCollections = this.collectionResults.length || 0;
      this.filterDisplayResults();      
    } else {
      this.totalCollections = 0;
    }
  }

  willUpdate() {
    let search = this.SearchVcModel.getSearch();
    // this.totalCollections = search?.payload?.matchedCollections?.length || 0;
  }

  filterDisplayResults() {    
    // need to respond to filters being clicked for collection
    // if a single collection is selected in filters, need to only show that collection in this.results
    let decodedUrl = decodeURIComponent(this.AppStateModel.location.pathname);
    if( !decodedUrl.includes('@graph.isPartOf.@id') ) {
      this.collectionResults = [...this.collectionResults];
      return;
    } 

    this.totalCollections = 0;

    let collectionIds = decodedUrl.split('@graph.isPartOf.@id","or","')[1].split('"]')[0].split(',');
    if( collectionIds.length > 1 ) {
      this.totalCollections = collectionIds.length;
    }
  }

  /**
   * @method renderResults
   * @description renderResults results of search query
   *
   * @param {Array} results results to render
   * @param {Array} total total matched results
   * @param {Array} numPerPage results to render on each page
   * @param {Array} currentIndex index
   */
  renderResults(results, total, numPerPage, currentIndex) {
    if( this.AppStateModel.location.page !== 'search' ) return;

    this.lastSearch = this.AppStateModel.location.fullpath;
    this.results = [];
    this.showHeaderFooter = true;
    this.showError = false;
    clearTimeout(this.showLoadingTimer);
    this.showLoading = false;

    requestAnimationFrame(() => {
      this.total = total;
      // make sure we don't have a page the returns results > 10000k
      let t = Math.floor(10000 / numPerPage) * numPerPage;
      if (total > t) {
        this.total = t + "+";
        this.totalOverMaxWindow = true;
      } else {
        this.totalOverMaxWindow = false;
      }

      this.results = results;
      this.numPerPage = numPerPage;
      this.paginationTotal = Math.ceil(total / numPerPage);
      // if( this.paginationTotal < 1 ) this.paginationTotal = 1;

      this.shadowRoot.querySelector("#numPerPage").value = numPerPage + "";
      // this.shadowRoot.querySelector('#numPerPageM').value = numPerPage+'';
      this.currentIndex = currentIndex;
      this.currentPage =
        this.currentIndex === 0 ? 1 : this.currentIndex / this.numPerPage + 1;

      requestAnimationFrame(() => {
        this._resize();
        this.loading = false;
      });
    });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  onLoading() {
    this.results = [];
    // this.showHeaderFooter = false;
    this.showCollectionResults = false;
    this.showError = false;
    this.showLoadingTimer = setTimeout(() => {
      this.showLoading = true;
    }, 100);
  }

  onError(state) {
    this.results = [];
    // this.showHeaderFooter = false;
    this.showCollectionResults = false;
    this.showError = true;

    clearTimeout(this.showLoadingTimer);
    this.showLoading = false;

    if (state.showErrorMessage) {
      this.errorMsg = state.error.message;
    } else {
      this.errorMsg = "Oops. Something went wrong with search!";
    }
  }

  /**
   * @method _onLayoutToggle
   * @description Toggle between grid, list and mosaic layouts
   *
   * @param {Event} e HTML click event
   */
  _onLayoutToggle(e) {
    let type = e?.currentTarget?.getAttribute("type") || 'mosaic';
    if (type === "grid") {
      this.isGridLayout = true;
      this.isListLayout = false;
      this.isMosaicLayout = false;
      localStorage.setItem(SEARCH_RESULTS_LAYOUT, "grid");
      this.shadowRoot
        .querySelector(".grid-layout-icon")
        .classList.add("selected-layout");
      this.shadowRoot
        .querySelector(".mosaic-layout-icon")
        .classList.remove("selected-layout");
      this.shadowRoot
        .querySelector(".list-layout-icon")
        .classList.remove("selected-layout");
    } else if (type === "list") {
      this.isGridLayout = false;
      this.isListLayout = true;
      this.isMosaicLayout = false;
      localStorage.setItem(SEARCH_RESULTS_LAYOUT, "list");
      this.shadowRoot
        .querySelector(".grid-layout-icon")
        .classList.remove("selected-layout");
      this.shadowRoot
        .querySelector(".mosaic-layout-icon")
        .classList.remove("selected-layout");
      this.shadowRoot
        .querySelector(".list-layout-icon")
        .classList.add("selected-layout");
    } else {
      this.isGridLayout = false;
      this.isListLayout = false;
      this.isMosaicLayout = true;
      localStorage.setItem(SEARCH_RESULTS_LAYOUT, "mosaic");
      this.shadowRoot
        .querySelector(".grid-layout-icon")
        .classList.remove("selected-layout");
      this.shadowRoot
        .querySelector(".mosaic-layout-icon")
        .classList.add("selected-layout");
      this.shadowRoot
        .querySelector(".list-layout-icon")
        .classList.remove("selected-layout");
    }
    this._setSelectedDisplay();

    requestAnimationFrame(() => this._resize());
  }

  _setSelectedDisplay() {
    let type = localStorage.getItem(SEARCH_RESULTS_LAYOUT);
    if (type === "grid") {
      this.shadowRoot
        .querySelector(".grid-layout-icon")
        .classList.add("selected-layout");
      this.shadowRoot
        .querySelector(".mosaic-layout-icon")
        .classList.remove("selected-layout");
      this.shadowRoot
        .querySelector(".list-layout-icon")
        .classList.remove("selected-layout");
    } else if (type === "list") {
      this.shadowRoot
        .querySelector(".grid-layout-icon")
        .classList.remove("selected-layout");
      this.shadowRoot
        .querySelector(".mosaic-layout-icon")
        .classList.remove("selected-layout");
      this.shadowRoot
        .querySelector(".list-layout-icon")
        .classList.add("selected-layout");
    } else {
      this.shadowRoot
        .querySelector(".grid-layout-icon")
        .classList.remove("selected-layout");
      this.shadowRoot
        .querySelector(".mosaic-layout-icon")
        .classList.add("selected-layout");
      this.shadowRoot
        .querySelector(".list-layout-icon")
        .classList.remove("selected-layout");
    }
  }

  /**
   * @method _resizeAsync
   * @description buffer resize masonary layout call
   */
  _resizeAsync() {
    if( this.AppStateModel.location.page !== 'search' ) return;

    if (this.resizeTimer !== -1) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.resizeTimer = -1;
      this._resize();
    }, 50);
  }

  /**
   * @method _resize
   * @description resize masonary layout
   */
  async _resize() {
    if( this.AppStateModel.location.page !== 'search' ) return;
    if( !this.isMosaicLayout ) return;
    let firstDiv = this.shadowRoot
      .querySelector("#layout")
      .querySelector("app-search-grid-result");
    if( !firstDiv ) return;

    // update image heights for mosaic layout
    let grids = this.shadowRoot.querySelector("#layout")?.querySelectorAll("app-search-grid-result");
    if( grids && grids.length ) {
      grids.forEach(grid => {
        grid._renderImage();
      });  
    }
    await this.updateComplete;

    let ew = this.offsetWidth;
    let w = firstDiv.offsetWidth + 25;

    let numCols = 3;
    if( window.innerWidth < 1024 ) numCols = 2;
    if( window.innerWidth < 768 ) numCols = 1;

    // this makes sure columns are centered
    let leftOffset = Math.floor((ew - numCols * w) / 2);

    let colHeights = [];
    for (let i = 0; i < numCols; i++) colHeights.push(0);

    if( leftOffset > 20 ) leftOffset = 20;
    let eles = this.shadowRoot
      .querySelector("#layout")
      .querySelectorAll("app-search-grid-result");
  
    this._estimateViewHeight(eles, w, numCols);

    // to calculate the height of the titles
    let masonaryTitlesDiv = this.shadowRoot.querySelector('.masonry-titles');
    masonaryTitlesDiv.innerHTML = '';
    for( let i = 0; i < eles.length; i++ ) {
      let div = document.createElement('div');
      div.classList.add('collection-name');
      div.style.width = eles[i].offsetWidth + 'px';
      div.innerText = this.results[i].title || 'No Title';
      masonaryTitlesDiv.appendChild(div);
    }

    for (let i = 0; i < eles.length; i++) { 
      let titleHeight = masonaryTitlesDiv.children[i].offsetHeight;
      let size = this.results[i].size || {};

      let containerWidth = eles[i].offsetWidth || (w * .92); // hack to get around offsetWidth intermittently being 0, not rendered yet?

      let naturalWidth = size.width || 1;
      let naturalHeight = size.height || 1;

      let aspectRatio = naturalHeight / naturalWidth;
      let scaledHeight = containerWidth * aspectRatio;
      
      let col = this._findMinCol(colHeights);
      let cheight = colHeights[col];
      eles[i].style.left = leftOffset + col * w + "px";
      eles[i].style.top = cheight + "px";
      colHeights[col] += Math.ceil(scaledHeight + titleHeight);
    }

    let maxHeight = Math.max.apply(Math, colHeights);
    this.shadowRoot.querySelector("#layout").style.height = maxHeight + "px";

    masonaryTitlesDiv.innerHTML = '';

    this.requestUpdate();
  }

  /**
   * @method _estimateViewHeight
   * @description estimate height of view, some items don't have sizes defined
   * 
   * @param {Array} eles array of elements
   * @param {Number} w width of each element
   * @param {Number} numCols number of columns
   */
  _estimateViewHeight(eles=[], w=300, numCols=3) {
    if( !numCols || !w ) return;

    let colHeights = [];
    for( let i = 0; i < numCols; i++ ) colHeights.push(0);

    for( let i = 0; i < eles.length; i++ ) { 
      let col = this._findMinCol(colHeights);
      let cheight = colHeights[col];
      eles[i].style.left = col * w + "px";
      eles[i].style.top = cheight + "px";
      colHeights[col] += w;
    }

    this.shadowRoot.querySelector("#layout").style.height = (eles.length / numCols * w + 100) + "px";
  }

  /**
   * @method _findMinCol
   * @description given an array of column heights, return
   * the column index that has the min height
   *
   * @param {Array} colHeights array of heights
   */
  _findMinCol(colHeights) {
    let min = colHeights[0];
    let minCol = 0;
    for (var i = 1; i < colHeights.length; i++) {
      if (min > colHeights[i]) {
        min = colHeights[i];
        minCol = i;
      }
    }
    return minCol;
  }

  /**
   * @method _onToggleDrawer
   * @description fire an event for app-search indicating the drawer toggle has
   * been clicked.
   */
  _onToggleDrawer() {
    this.dispatchEvent(new CustomEvent("toggle-drawer"));
  }

  /**
   * @method _onPageSizeChange
   * @description bound to select box change event, dispatch event to parent
   * alerting new page size
   */
  _onPageSizeChange(e) {
    let detail = {
      startIndex: 0,
      itemsPerPage: parseInt(e.currentTarget.value)
    };

    this.dispatchEvent(
      new CustomEvent("page-change", {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  _scrollToCollections(e) {
    e.preventDefault();

    window.scrollTo({
      top: this.offsetHeight + 100,
      left: 0,
      behavior: "smooth",
    });
  }

  /**
   * @method _updateCollectionResultsVisibility
   * @description bound to collection visibility updates (see contructor).  Fired
   * via CollectionModel which decides if a collection search should be preformed.
   */
  _updateCollectionResultsVisibility(show) {
    this.showCollectionResults = show;
  }

  /**
   * @description _onSearchVcUpdate, fired when record search viewController updates
   * @param {*} e
   */
  // _onSearchVcUpdate(e) {
  //   if (e.state !== "loaded") return;

  //   this.logger.info('e.payload.results', e.payload.results);

  //   let collections = [];
  //   e.payload.results.forEach((result) => {
  //     if (
  //       result.collectionId &&
  //       !collections.includes(result.collectionId["@id"])
  //     ) {
  //       collections.push(result.collectionId["@id"]);
  //     }
  //   });

  //   this.totalCollections = collections.length;
  //   this.logger.info('this.totalCollections', this.totalCollections);

  // }

  /**
   * @method _onCollectionClicked
   * @description bound to app-collection-card click event
   *
   * @param {Object} e click|keyup event
   */
  _onCollectionClicked(e) {
    if (e.type === "keyup" && e.which !== 13) return;

    const location = e.target.dataset.collectionid;
    if (location) {
      this.AppStateModel.setLocation(location);
    }
  }

  /**
   * @method _onRecordClicked
   * @description bound to click events of the search result record cards/list items
   *
   * @param {Object} e click|keyup event
   */
  _onRecordClicked(e) {
    e.preventDefault();
    if (e.type === "keyup" && e.which !== 13) return;
    const location = e.target.dataset.url;
    if (location) {
      this.AppStateModel.setLocation(location);
    }
  }

  /**
   * @method _onPaginationChange
   * @description bound to click events of the pagination element
   *
   * @param {Object} e click|keyup event
   */
  _onPaginationChange(e) {
    e.detail.startIndex = e.detail.page * this.numPerPage - this.numPerPage;
    this.dispatchEvent(
      new CustomEvent("page-change", {
        detail: e.detail,
        bubbles: true,
        composed: true
      })
    );

    window.scrollTo(0, 0);
  }
}

customElements.define("app-search-results-panel", AppSearchResultsPanel);


/***/ }),

/***/ "./public/elements/pages/search/results/app-search-results-panel.tpl.js":
/*!******************************************************************************!*\
  !*** ./public/elements/pages/search/results/app-search-results-panel.tpl.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _ucd_lib_theme_elements_brand_ucd_theme_pagination_ucd_theme_pagination_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ucd-lib/theme-elements/brand/ucd-theme-pagination/ucd-theme-pagination.js */ "./public/node_modules/@ucd-lib/theme-elements/brand/ucd-theme-pagination/ucd-theme-pagination.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../lib/utils */ "./public/lib/utils/index.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib_utils__WEBPACK_IMPORTED_MODULE_2__);





function render() {
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <style include="shared-styles">
      :host {
        display: block;
        position: relative;
        margin: 0 5px;
      }

      [hidden] {
        display: none !important;
      }

      .header {
        font-size: var(--fs-sm);
        display: flex;
        align-items: center;
        margin-bottom: 11px;
        margin-top: 5px;
        padding: 1.5rem;
      }

      .header > * {
        flex: 1;
      }

      select {
        margin-left: 10px;
        border: 1px solid var(--light-background-color);
        border-radius: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        -o-appearance: none;
        appearance: none;
        -webkit-border-radius: 0px;
        padding: 5px 25px 5px 10px;
        background-position: right 10px center;
        background-size: 10px 10px;
        background-repeat: no-repeat;
        background-color: transparent;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCA2Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzAwMjg1NTt9PC9zdHlsZT48L2RlZnM+PGc+PHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjAgMCAxMCAwIDUgNiAwIDAiLz48L2c+PC9zdmc+");
        background-position-y: 13px;
      }
      /* for IE */
      select::-ms-expand {
        display: none;
      }

      ucd-theme-pagination {
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        padding-top: 1rem;
      }

      h3 {
        /* border-top: 1px solid var(--light-background-color); */
        margin: 15px 0 0 0;
        padding: 15px 0 0 0;
        color: var(--default-primary-color);
      }

      .grid {
        margin: 10px;
        position: relative;
        display: grid;
        flex-direction: row;
        flex-wrap: wrap;
        width: 95%;
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .grid dams-item-card {
        padding: 1.5rem;
      }

      .masonry {
        margin: 10px;
        position: relative;
        /* display: flex;
        flex-direction: row;
        flex-wrap: wrap; */
        width: 95%;
      }

      .list {
        margin: 10px;
      }

      .list .item {
        padding: 10px;
        margin-bottom: 15px;
        background-color: #daaa00;
        height: 250px;
      }

      .spacer {
        height: 20px;
        border-right: 1px solid var(--light-background-color);
      }

      .total {
        font-size: 0.9rem;
        padding-left: 10px;
        flex: 2;
      }

      .mobile-total {
        font-style: italic;
      }

      .error {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 250px;
        color: red;
      }

      #numPerPage {
        font-size: 0.9rem;
      }

      .drawer-toggle {
        font-size: var(--fs-sm);
        cursor: pointer;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        font-weight: var(--fw-bold);
        color: var(--default-primary-color);
        background-color: var(--light-background-color);
        border-radius: 0;
        border: 0;
        padding: 0;
      }
      .drawer-toggle > span {
        padding: 0 10px;
      }
      .drawer-toggle iron-icon {
        background-color: var(--default-secondary-color);
      }

      .drawer-toggle[disabled] {
        color: var(--light-background-color);
      }

      .collections {
        text-align: center;
      }

      .collections-content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
      }

      .collections-content dams-collection-card {
        flex: 33.33%;
      }

      ucdlib-icon {
        height: 40px;

        display: inline-block;
        position: relative;
        padding: 8px 0;

        outline: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
        z-index: 0;
        line-height: 1;
        width: 40px;
        height: 40px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
        box-sizing: border-box !important;
        justify-content: flex-end;
        fill: var(--color-aggie-blue-80);
      }

      .masonry {
        margin: 10px;
        position: relative;
      }

      .masonry .item {
        display: block;
        position: absolute;
        width: 27%;
        padding: 1.5rem;
        /* visibility: hidden; */
        top: 25px;
        left: 25px;
        /* will-change: top, left;
        transition: top 500ms ease-out, left 500ms ease-out; */
      }

      .selected-layout {
        box-shadow: inset -2px 0 0 var(--color-aggie-gold),
          inset 0 -2px 0 var(--color-aggie-gold),
          inset 2px 0 0 var(--color-aggie-gold),
          inset 0 2px 0 var(--color-aggie-gold);
      }

      .header a {
        color: var(--color-aggie-blue-70);
        cursor: pointer;
      }

      .header .photo-stack {
        display: inline-block;
      }

      .header .photo-stack ucdlib-icon {
        fill: var(--color-aggie-blue-60);
      }

      .header ucdlib-icon {
        padding: 5px;
      }

      @media (max-width: 545px) {
        .grid dams-item-card {
          flex: 100%;
          padding: 1.5rem;
          max-width: 85vw;
        }
        .header {
          padding-left: 0.5rem;
        }
      }

      @media (max-width: 1023px) {
        .masonry .item {
          width: 38% !important;
        }
      }

      @media (max-width: 768px) {
        .truncated-text-mobile {
          display: none;
        }
        
        .masonry .item {
          width: 80vw !important;
          /* position: initial; */
          /* margin: auto; */
          /* padding-bottom: .5rem; */
        }
      }

      @media (min-width: 975px) {
        .header {
          display: flex;
        }
        /* .mobile-header {
          display: none;
        } */
      }

      @media (max-width: 1023px) {
        .grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 767px) {
       .grid {
            grid-template-columns: repeat(1, minmax(0, 1fr));
        }
      }

      @media (max-width: 1182px) {
        .truncated-text {
          display: none;
        }
      }

      @media (max-width: 1130px) {
        /* TODO stack pagination ABOVE result count/link */
        .header {
          flex-direction: column-reverse;
          align-items: inherit;
        }

        .header-results {
          /* padding-top: 1rem; */
        }

        .header-pagination {
          padding-bottom: 1rem;
        }
        .header-pagination .filler {
          flex: 3;
        }
      }

      .teaser {
        padding: 1.5rem; 
      }
      .teaser__image {
        background-color: #dcdcdc;
        width: 100%;
        padding-top: 75%;
      }
      .teaser__title {
        background-color: #dcdcdc;
        height: 1.5rem;
        width: 80%;
        margin: .8rem auto 0;
      }

      .masonry {
        /* display: flex;
        flex-wrap: wrap; */
        gap: 16px;
      }

      .masonry .col-1,
      .masonry .col-2,
      .masonry .col-3 {
        flex: 1 1 calc(33.333% - 16px);
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        margin-bottom: 16px;
      }

      .masonry .teaser .teaser__image {
        width: 100%;
        height: auto;
        background-color: #dcdcdc;
        padding-top: 0;
      }

      .masonry .teaser .teaser__title {
        padding: 8px;
        font-size: 1rem;
        text-align: center;
        background-color: #dcdcdc;
      }

      .list .teaser {
        display: flex;
      }
      .list .teaser__image {
        height: 250px;
        width: 33%;
        padding-top: 0;
      }
      .list .teaser__content {
        width: 75%;
        margin-left: 3rem;
      }
      .list .teaser__title {
        margin: .8rem auto 0 0;
      }
      .list .teaser__content .teaser__details {
        padding-top: 1rem;
        width: 80%;
        margin: .8rem auto 0 0;
      }
      .list .teaser__content .teaser__details > * {
        margin: 0.5rem 0;
        height: 1rem;
        background-color: #dcdcdc; 
      }

      .masonry-titles .collection-name {
        padding: 15px calc(1.5rem + 15px);
        box-sizing: border-box;
        line-height: 1.3;
        font-size: 0.95rem;
      }
    </style>

    <div class="header">
      <div class="header-results" style="flex: 2.25; display: flex;">
        <div style="flex: 2.25; margin: auto; min-height: 2.1rem;" ?hidden="${!this.total && this.total !== 0}">
          <div class="photo-stack">
            <ucdlib-icon
              style="cursor: auto;"
              class="vertical-link__image"
              icon="ucdlib-dams:photo-stack"
            ></ucdlib-icon>
          </div>
          
          <span style="font-weight: bold">${_lib_utils__WEBPACK_IMPORTED_MODULE_2___default().formatNumberWithCommas(this.total)}${this.total === 10000 ? '+' : ''} item<span class="truncated-text"> result</span>${this.total === 1 ? '' : 's'}</span><span ?hidden="${this.totalCollections === 0}">
            from
            <a href="" @click="${this._scrollToCollections}">${this.totalCollections} collection${this.totalCollections > 1 ? 's' : ''}</a></span>
        </div>
      </div>

      <div class="header-pagination"
        style="flex: 3; display: flex; justify-content: end">
        <span style="text-align: right; margin: auto 0; padding-right: .5rem; padding-left: 5px;">Display:</span>
        <div>
          <ucdlib-icon
            icon="ucdlib-dams:result-display-grid"
            @click="${this._onLayoutToggle}"
            type="grid"
            class="grid-layout-icon selected-layout">
          </ucdlib-icon>
        </div>
        <div>
          <ucdlib-icon
            icon="ucdlib-dams:result-display-mosaic"
            @click="${this._onLayoutToggle}"
            type="mosaic"
            class="mosaic-layout-icon">
          </ucdlib-icon>
        </div>
        <div>
          <ucdlib-icon
            icon="ucdlib-dams:result-display-list"
            @click="${this._onLayoutToggle}"
            type="list"
            class="list-layout-icon">
          </ucdlib-icon>
        </div>

        <div class="filler"></div>

        <select id="numPerPage" @change="${this._onPageSizeChange}">
          <option value="50">50</option>
          <option value="20" selected>20</option>
          <option value="10">10</option>
        </select>
        <div style="margin: 0 10px; font-size: .875rem; margin: auto 0 auto 0.5rem">
          <span class="truncated-text-mobile">items</span> per page
        </div>
      </div>
    </div>

    <div ?hidden="${this.showError}">
      <div ?hidden="${this.showLoading}">
        <div class="grid" ?hidden="${!this.loading || !this.isGridLayout}">
          ${[1,2,3,4,5,6,7,8.9,10].map(
            () => lit__WEBPACK_IMPORTED_MODULE_0__.html`
              <div class="teaser">
                <div class="teaser__image"></div>
                <div class="teaser__title"></div>
              </div>  
            `
          )}
        </div>

        <div class="grid" id="gridLayout" ?hidden="${!this.isGridLayout}">
          ${this.results.map(
            (res) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
              <dams-item-card
                .data="${res}"
                data-url="${res.id}"
                @click=${this._onRecordClicked}
              ></dams-item-card>
            `
          )}
        </div>

        <div class="masonry" ?hidden="${!this.loading || !this.isMosaicLayout}" style="display: flex;">
          <div class="col-1">
            <div class="teaser">
              <div class="teaser__image" style="height: 350px;"></div>
              <div class="teaser__title"></div>
            </div>  
            <div class="teaser">
              <div class="teaser__image" style="height: 150px;"></div>
              <div class="teaser__title"></div>
            </div>  
            <div class="teaser">
              <div class="teaser__image" style="height: 300px;"></div>
              <div class="teaser__title"></div>
            </div>  
          </div>
          <div class="col-2">
            <div class="teaser">
              <div class="teaser__image" style="height: 200px;"></div>
              <div class="teaser__title"></div>
            </div>  
            <div class="teaser">
              <div class="teaser__image" style="height: 275px;"></div>
              <div class="teaser__title"></div>
            </div>  
            <div class="teaser">
              <div class="teaser__image" style="height: 200px;"></div>
              <div class="teaser__title"></div>
            </div>  
          </div>
          <div class="col-3">
            <div class="teaser">
              <div class="teaser__image" style="height: 250px;"></div>
              <div class="teaser__title"></div>
            </div>  
            <div class="teaser">
              <div class="teaser__image" style="height: 150px;"></div>
              <div class="teaser__title"></div>
            </div>  
            <div class="teaser">
              <div class="teaser__image" style="height: 250px;"></div>
              <div class="teaser__title"></div>
            </div>  
          </div>
        </div>
        
        <div class="masonry" id="layout" ?hidden="${!this.isMosaicLayout}">
          ${this.results.map(
            (res) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
              <app-search-grid-result
                .data="${res}"
                class="item"
                data-url="${res.id}"
                @click=${this._onRecordClicked}
                @rendered=${this._onGridItemRendered}
              ></app-search-grid-result>
            `
          )}
        </div>

        <div class="list" ?hidden="${!this.isListLayout}">
          <div ?hidden="${!this.loading}">
            ${[1,2,3,4,5,6,7,8.9,10].map(
              () => lit__WEBPACK_IMPORTED_MODULE_0__.html`
                <div class="teaser">
                  <div class="teaser__image"></div>
                  <div class="teaser__content">
                    <div class="teaser__title"></div>
                    <div class="teaser__details">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>  
              `
            )}
          </div>
          ${this.results.map(
            (res) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
              <app-search-list-result
                .data="${res}"
                data-url="${res.id}"
                @click=${this._onRecordClicked}
              ></app-search-list-result>
            `
          )}
        </div>
      </div>
    </div>

    <div class="error" ?hidden="${!this.showError}">
      <div>${this.errorMsg}</div>
    </div>

    <ucd-theme-pagination
      ?hidden="${this.paginationTotal < 2}"
      current-page=${this.currentPage}
      max-pages=${this.paginationTotal}
      @page-change=${this._onPaginationChange}
      xs-screen
      ellipses>
    </ucd-theme-pagination>

    <div
      ?hidden="${!this.totalOverMaxWindow && this.total !== 10000}"
      style="text-align: center"
      class="limit-results"
    >
      Digital Collections limits results to 10,000. Use keywords and/or filters
      to refine search.
    </div>

    <div class="masonry-titles" style="visibility: hidden; position: absolute; bottom: 0;">
    </div>
  `;
}


/***/ }),

/***/ "./public/elements/utils/app-range-slider.js":
/*!***************************************************!*\
  !*** ./public/elements/utils/app-range-slider.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppRangeSlider)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_range_slider_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-range-slider.tpl.js */ "./public/elements/utils/app-range-slider.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");






class AppRangeSlider extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement).with(
  _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils
) {
  static get properties() {
    return {
      // absolute min/max values for slider
      absMinValue: { type: Number, attribute: "abs-min-value" }, // observer : '_renderAsync' },
      absMaxValue: { type: Number, attribute: "abs-max-value" }, // observer : '_renderAsync' },

      // current min/max values for slider (where the btns are)
      minValue: { type: Number, attribute: "min-value" }, // observer : '_renderAsync' },
      maxValue: { type: Number, attribute: "max-value" }, // observer : '_renderAsync' },

      // labels for slide btns
      minValueLabel: { type: String },
      maxValueLabel: { type: String },

      // current widget size info
      // used so we don't have to ask the DOM on each render
      width: { type: Number },
      height: { type: Number },
      btnHeight: { type: Number },

      // string that indicate type of move
      moving: { type: String },

      // different moving flags for binding UI element classes
      movingMin: { type: Boolean },
      movingMax: { type: Boolean },
      isMoving: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.render = _app_range_slider_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);

    this.absMinValue = 0;
    this.absMaxValue = 100;
    this.minValue = 10;
    this.maxValue = 90;
    this.minValueLabel = "";
    this.maxValueLabel = "";
    this.width = 1;
    this.height = 50;
    this.btnHeight = 1;
    this.moving = "";
    this.movingMin = false;
    this.movingMax = false;
    this.isMoving = false;
    this.hasRendered = false;

    this._windowResizeListener = this._onResize.bind(this);
    this._windowMouseListener = this._onMoveStop.bind(this);

    this.addEventListener("mousemove", (e) => this._onMove(e));
    this.addEventListener("touchmove", (e) => this._onMove(e));
  }

  /**
   * @method connectedCallback
   * @description setup our window mouse listeners, fire first render
   */
  connectedCallback() {
    super.connectedCallback();

    window.addEventListener("resize", this._windowResizeListener);
    window.addEventListener("mouseup", this._windowMouseListener);
    window.addEventListener("mouseout", this._windowMouseListener);
    window.addEventListener("touchend", this._windowMouseListener);
    window.addEventListener("touchcancel", this._windowMouseListener);
  }

  /**
   * @method disconnectedCallback
   * @description remove our window mouse listeners
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this._windowResizeListener);
    window.removeEventListener("mouseup", this._windowMouseListener);
    window.removeEventListener("mouseout", this._windowMouseListener);
    window.removeEventListener("touchend", this._windowMouseListener);
    window.removeEventListener("touchcancel", this._windowMouseListener);
  }

  willUpdate(e) {
    if (!this.hasRendered) {
      requestAnimationFrame(() => {
        this._onResize();
        this._renderAsync();
      });
      this.hasRendered = true;
    }
  }

  /**
   * @method _onResize
   * @description cache the element size so we don't have to look it up
   * on each render of btn and line positions.  Then fire render to make
   * sure everything is visually correct.
   */
  _onResize() {
    this.width = this.offsetWidth || 1;
    this.height = this.offsetHeight;
    this.left = this.offsetLeft;
    let lowNumberBtn = this.shadowRoot.querySelector("#lowNumberBtn");
    if (lowNumberBtn) {
      this.height = 50;
      this.btnHeight = 25;
      this._render();
    }
  }

  /**
   * @method _valueToPx
   * @description given a number line value, return px location relative
   * to the widget
   *
   * @param {Number} value number line value
   *
   * @returns {Number} px location
   */
  _valueToPx(value) {
    value = value - this.absMinValue;
    let range = this.absMaxValue - this.absMinValue;
    let valPerPx = range / this.width;
    return Math.round(value / valPerPx);
  }

  /**
   * @method _pxToValue
   * @description given a px location, return number line value
   *
   * @param {Number} px location
   *
   * @returns {Number} value
   */
  _pxToValue(px) {
    let range = this.absMaxValue - this.absMinValue;
    let valPerPx = range / this.width;
    return Math.round(px * valPerPx) + this.absMinValue;
  }

  _renderAsync() {
    if (this.renderTimer) {
      clearTimeout(this.renderTimer);
    }

    this.renderTimer = setTimeout(() => {
      this.renderTimer = 0;
      this._render();
    }, 0);
  }

  /**
   * @method _render
   * @description set the current top/left px values for all btns,
   * labels and lines bases on current min/max values.
   */
  _render() {
    let hh = this.height * 0.6;

    // set line heights
    this.shadowRoot.querySelector("#numberLine").style.top = hh + "px";
    this.shadowRoot.querySelector("#fillLine").style.top = hh + "px";

    // set btn heights
    let hBtnHeight = this.btnHeight / 2;
    this.shadowRoot.querySelector("#lowNumberBtn").style.top =
      hh - hBtnHeight + "px";
    this.shadowRoot.querySelector("#highNumberBtn").style.top =
      hh - hBtnHeight + "px";

    this.shadowRoot.querySelector("#lowNumberLabel").style.top =
      hh - hBtnHeight - 22 + "px";
    this.shadowRoot.querySelector("#highNumberLabel").style.top =
      hh - hBtnHeight - 22 + "px";

    // set btn left
    let lv =
      this.minValue < this.absMinValue ? this.absMinValue : this.minValue;
    let uv =
      this.maxValue > this.absMaxValue ? this.absMaxValue : this.maxValue;

    let minPxValue = this._valueToPx(lv);
    let maxPxValue = this._valueToPx(uv);

    this.shadowRoot.querySelector("#lowNumberBtn").style.left =
      minPxValue - hBtnHeight + "px";
    this.shadowRoot.querySelector("#highNumberBtn").style.left =
      maxPxValue - hBtnHeight + "px";

    this.shadowRoot.querySelector("#lowNumberLabel").style.left =
      minPxValue - hBtnHeight + "px";
    this.shadowRoot.querySelector("#highNumberLabel").style.left =
      maxPxValue - hBtnHeight + "px";

    this.shadowRoot.querySelector("#fillLine").style.left = minPxValue + "px";
    this.shadowRoot.querySelector("#fillLine").style.width =
      maxPxValue - minPxValue + "px";

    this.minValueLabel = this.minValue;
    this.maxValueLabel = this.maxValue;
  }

  /**
   * @method _onMoveStart
   * @description bound to btns and center line.  Fired when the user mouses
   * down on element indicating a move is starting
   *
   * @param {MouseEvent} e
   */
  _onMoveStart(e) {
    this.moving = e.currentTarget.getAttribute("prop");

    if (this.moving === "range") {
      this.startRange = {
        min: e.currentTarget.offsetLeft,
        max: e.currentTarget.offsetLeft + e.currentTarget.offsetWidth,
        left: e.pageX - this.left,
      };
    }

    this.isMoving = true;
    this.movingMin = this.moving === "max" ? false : true;
    this.movingMax = this.moving === "min" ? false : true;
  }

  /**
   * @method _onMove
   * @description bound to mousemove event on this element.  Update min/max
   * values based on type of move that is happening ie min, max or range.  Does
   * nothing if we are not moving.
   *
   * @param {MouseEvent} e
   */
  _onMove(e) {
    if (!this.moving) return;
    e.preventDefault();

    // handle both mouse and touch event
    let left;
    if (e.type === "touchmove") {
      if (!e.changedTouches.length) return;
      left = e.changedTouches[0].pageX - this.left;
    } else {
      left = e.pageX - this.left;
    }

    if (this.moving === "min") {
      this.minValue = this._pxToValue(left);
    } else if (this.moving === "max") {
      this.maxValue = this._pxToValue(left);
    } else if (this.moving === "range") {
      let diff = this.startRange.left - left;

      this.minValue = this._pxToValue(this.startRange.min - diff);
      this.maxValue = this._pxToValue(this.startRange.max - diff);
    }

    if (this.minValue < this.absMinValue) {
      this.minValue = this.absMinValue;
    }
    if (this.maxValue > this.absMaxValue) {
      this.maxValue = this.absMaxValue;
    }

    if (this.minValue > this.maxValue) {
      if (this.moving === "min") this.minValue = this.maxValue;
      else this.maxValue = this.minValue;
    }
    this.hasRendered = false;
  }

  /**
   * @method _onMoveStop
   * @description bound to mouseup/mouseout event on window.  It's always best to bind
   * this to the window as a catch all.  Resets all moving flags
   */
  _onMoveStop() {
    if (!this.moving) return;

    this.moving = "";
    this.movingMin = false;
    this.movingMax = false;
    this.isMoving = false;

    this.dispatchEvent(
      new CustomEvent("range-value-change", {
        detail: {
          min: this.minValue,
          max: this.maxValue,
        },
      })
    );
    this.hasRendered = false;
  }
}

customElements.define("app-range-slider", AppRangeSlider);


/***/ }),

/***/ "./public/elements/utils/app-range-slider.tpl.js":
/*!*******************************************************!*\
  !*** ./public/elements/utils/app-range-slider.tpl.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/shared-styles */ "./public/elements/styles/shared-styles.js");



function render() { 
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`


<style>
  ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__.sharedStyles}
  :host {
    display: block;
    position: relative;
    height: 50px;
    margin: 0 13px;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently */
  }

  #numberLine {
    position: absolute;
    left : 0;
    right : 0;
    height: 3px;
    background-color: var(--light-background-color, #888);
  }

  #fillLine {
    position: absolute;
    cursor: move;
    background-color: var(--color-aggie-blue-80) ;
    height: 3px;
  }

  .btn {
    position: absolute;
    height: 25px;
    width: 25px;
    cursor: move;
  }

  .btn > div {
    margin: 5px;
    height: 15px;
    width: 15px;
    border-radius: 15px;
    background-color: var(--color-aggie-blue-80) ;
    transition: all 150ms linear;
  }

  .btn[moving] > div {
    margin: 0px;
    height: 25px;
    width: 25px;
    border-radius: 25px;
  }

  .label {
    width : 25px;
    font-size: 12px; 
    position: absolute;
    text-align: center;
    transform: scale(0);
    transition: transform 200ms linear;
    color: var(--default-primary-color);
  }

  .label[moving] {
    transform: scale(1);
  }

</style>

<div id="numberLine"></div>

<div id="fillLine" 
  prop="range" 
  @mousedown="${this._onMoveStart}" 
  @touchstart="${this._onMoveStart}">
</div>

<div id="lowNumberLabel" class="label" ?moving="${this.isMoving}">${this.minValueLabel}</div>
<div id="highNumberLabel" class="label" ?moving="${this.isMoving}">${this.maxValueLabel}</div>

<div id="lowNumberBtn" 
  class="btn" 
  prop="min" 
  @mousedown="${this._onMoveStart}" 
  @touchstart="${this._onMoveStart}" 
  ?moving="${this.movingMin}" >
  <div></div>
</div>

<div id="highNumberBtn" 
  class="btn" 
  prop="max" 
  @mousedown="${this._onMoveStart}" 
  @touchstart="${this._onMoveStart}" 
  ?moving="${this.movingMax}">
  <div></div>
</div>

`;}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zZWFyY2guYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVDO0FBQ0U7QUFDNkI7QUFDUjs7QUFFbEI7QUFDTDtBQUNXOztBQUUzQyx3QkFBd0IsOERBQUssQ0FBQywyQ0FBVTtBQUMvQyxRQUFRLGdGQUFjLEVBQUUsaUVBQVk7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGVBQWU7QUFDaEMsaUJBQWlCLGFBQWE7QUFDOUIsb0JBQW9CLGVBQWU7QUFDbkMsbUJBQW1CLGVBQWU7QUFDbEMsa0JBQWtCLGNBQWM7QUFDaEMsMEJBQTBCLGVBQWU7QUFDekMsMEJBQTBCLGVBQWU7QUFDekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsK0RBQVc7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxHQUFHO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsR0FBRztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIscUNBQXFDO0FBQ2xFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixvQ0FBb0M7QUFDakU7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLG9DQUFvQztBQUNqRTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDeEkyQjs7QUFFWjtBQUNmLFNBQVMscUNBQUk7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUEscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQSxpQkFBaUI7QUFDakIsaUJBQWlCO0FBQ2pCLG1DQUFtQyx5QkFBeUI7QUFDNUQsK0JBQStCLHdCQUF3QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG1CQUFtQjtBQUMvQywwQkFBMEIseUJBQXlCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNKZ0M7O0FBRWU7QUFDZTs7QUFFNUI7O0FBRVQ7O0FBRXpCLDZCQUE2Qiw4REFBSyxDQUFDLDJDQUFVO0FBQzdDLFFBQVEsaUVBQVk7O0FBRXBCO0FBQ0E7QUFDQSxnQkFBZ0IsZUFBZTtBQUMvQixpQkFBaUIsZUFBZTtBQUNoQyxpQkFBaUIsY0FBYztBQUMvQixtQkFBbUIsZUFBZTtBQUNsQyxrQkFBa0IsY0FBYztBQUNoQywwQkFBMEIsY0FBYztBQUN4Qyx5QkFBeUIsZ0JBQWdCO0FBQ3pDLG1CQUFtQixlQUFlO0FBQ2xDLDJCQUEyQixnQkFBZ0I7QUFDM0MseUJBQXlCLGVBQWU7QUFDeEMscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHFFQUFXOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUIsNEJBQTRCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvTjJCO0FBQ2tDOztBQUVuQjs7QUFFM0I7QUFDZixTQUFTLHFDQUFJOztBQUViO0FBQ0EsSUFBSSwrREFBWTtBQUNoQjtBQUNBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsdUJBQXVCO0FBQzlEO0FBQ0E7QUFDQSwwQkFBMEIsV0FBVztBQUNyQyxjQUFjLHVCQUF1QjtBQUNyQztBQUNBOztBQUVBLHNDQUFzQyxnQkFBZ0I7QUFDdEQ7QUFDQSxNQUFNLGtDQUFrQyxxQ0FBSTtBQUM1Qzs7QUFFQTtBQUNBLGdCQUFnQixXQUFXO0FBQzNCLGlCQUFpQixNQUFNO0FBQ3ZCLGlCQUFpQixTQUFTO0FBQzFCLHFCQUFxQixjQUFjO0FBQ25DLG9CQUFvQixZQUFZO0FBQ2hDLG1CQUFtQixtQkFBbUI7QUFDdEMscUJBQXFCLGNBQWM7QUFDbkM7O0FBRUEsMEJBQTBCLHNDQUFzQyxJQUFJLHdFQUE0QixpQkFBaUI7QUFDakg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3TGlDO0FBQ2M7O0FBRWU7O0FBRWxDO0FBQ0E7O0FBRXJCLDZCQUE2Qiw4REFBSyxDQUFDLDJDQUFVO0FBQ3BELFVBQVUsaUVBQVk7O0FBRXRCO0FBQ0E7QUFDQSxpQkFBaUIsZUFBZTtBQUNoQyxpQkFBaUIsZ0JBQWdCO0FBQ2pDLG1CQUFtQjtBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IscUVBQVc7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQ0FBa0M7QUFDbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzSzJCO0FBQ2tDOztBQUU5QztBQUNmLFNBQVMscUNBQUk7O0FBRWI7QUFDQSxNQUFNLCtEQUFZO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQSwrQkFBK0Isc0JBQXNCLFlBQVksc0JBQXNCO0FBQ3ZGLHlCQUF5QixzQkFBc0Isa0JBQWtCO0FBQ2pFO0FBQ0Esc0RBQXNELGFBQWE7QUFDbkUscUNBQXFDLG1CQUFtQjtBQUN4RCwrREFBK0QsWUFBWTtBQUMzRSw4REFBOEQsYUFBYTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxhQUFhO0FBQ2pEOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqSWlDO0FBQ087QUFDWjs7QUFFb0I7O0FBRWM7O0FBRTlEO0FBQzRDO0FBQzVDO0FBQ0EsZ0JBQWdCLHlFQUEyQjtBQUMzQyxVQUFVLHlFQUEyQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsOEJBQThCLDhEQUFLLENBQUMsMkNBQVUsT0FBTyxpRUFBWTtBQUNqRTtBQUNBO0FBQ0Esc0JBQXNCLGFBQWE7QUFDbkMsNEJBQTRCLGNBQWM7QUFDMUMsd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLHNFQUFXO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUUyQjtBQUNrQzs7QUFFOUM7QUFDZixTQUFTLHFDQUFJO0FBQ2I7QUFDQSxRQUFRLCtEQUFZLEVBQUU7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esc0NBQXNDLHNCQUFzQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0Esa0JBQWtCLHFFQUFXO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNwQixhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0EsMENBQTBDLEVBQUU7QUFDNUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxZQUFZO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbFQyQjtBQUM0Qjs7QUFFeEM7QUFDZixTQUFTLHFDQUFJOzs7QUFHYjtBQUNBLElBQUksK0RBQVk7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUM7QUFDakMsK0JBQStCO0FBQy9CLDhCQUE4QjtBQUM5Qiw0QkFBNEI7QUFDNUIsMkJBQTJCO0FBQzNCLHVCQUF1QjtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixrQkFBa0I7QUFDbEMsaUJBQWlCLGtCQUFrQjtBQUNuQzs7QUFFQSxrREFBa0QsY0FBYyxJQUFJLG1CQUFtQjtBQUN2RixtREFBbUQsY0FBYyxJQUFJLG1CQUFtQjs7QUFFeEY7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGtCQUFrQjtBQUNsQyxpQkFBaUIsa0JBQWtCO0FBQ25DLGFBQWEsZUFBZTtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixrQkFBa0I7QUFDbEMsaUJBQWlCLGtCQUFrQjtBQUNuQyxhQUFhLGVBQWU7QUFDNUI7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9wYWdlcy9zZWFyY2gvYXBwLXNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvc2VhcmNoL2FwcC1zZWFyY2gudHBsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9wYWdlcy9zZWFyY2gvZmlsdGVyaW5nL2FwcC1mYWNldC1maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3BhZ2VzL3NlYXJjaC9maWx0ZXJpbmcvYXBwLWZhY2V0LWZpbHRlci50cGwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3BhZ2VzL3NlYXJjaC9maWx0ZXJpbmcvYXBwLWZpbHRlci1wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvc2VhcmNoL2ZpbHRlcmluZy9hcHAtZmlsdGVyLXBhbmVsLnRwbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvc2VhcmNoL2ZpbHRlcmluZy9hcHAtZmlsdGVycy1wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvc2VhcmNoL2ZpbHRlcmluZy9hcHAtZmlsdGVycy1wYW5lbC50cGwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3BhZ2VzL3NlYXJjaC9maWx0ZXJpbmcvYXBwLW5vcm1hbC1jaGVja2JveC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvc2VhcmNoL2ZpbHRlcmluZy9hcHAtbm9ybWFsLWNoZWNrYm94LnRwbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvc2VhcmNoL2ZpbHRlcmluZy9hcHAtcmFuZ2UtZmlsdGVyLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9wYWdlcy9zZWFyY2gvZmlsdGVyaW5nL2FwcC1yYW5nZS1maWx0ZXIudHBsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9wYWdlcy9zZWFyY2gvcmVzdWx0cy9hcHAtc2VhcmNoLWdyaWQtcmVzdWx0LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9wYWdlcy9zZWFyY2gvcmVzdWx0cy9hcHAtc2VhcmNoLWdyaWQtcmVzdWx0LnRwbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvc2VhcmNoL3Jlc3VsdHMvYXBwLXNlYXJjaC1saXN0LXJlc3VsdC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvc2VhcmNoL3Jlc3VsdHMvYXBwLXNlYXJjaC1saXN0LXJlc3VsdC50cGwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3BhZ2VzL3NlYXJjaC9yZXN1bHRzL2FwcC1zZWFyY2gtcmVzdWx0cy1jb2xsZWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvc2VhcmNoL3Jlc3VsdHMvYXBwLXNlYXJjaC1yZXN1bHRzLWNvbGxlY3Rpb25zLnRwbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvc2VhcmNoL3Jlc3VsdHMvYXBwLXNlYXJjaC1yZXN1bHRzLXBhbmVsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9wYWdlcy9zZWFyY2gvcmVzdWx0cy9hcHAtc2VhcmNoLXJlc3VsdHMtcGFuZWwudHBsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy91dGlscy9hcHAtcmFuZ2Utc2xpZGVyLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy91dGlscy9hcHAtcmFuZ2Utc2xpZGVyLnRwbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXRFbGVtZW50LCBodG1sIH0gZnJvbSBcImxpdFwiO1xuaW1wb3J0IHJlbmRlciBmcm9tIFwiLi9hcHAtc2VhcmNoLnRwbC5qc1wiO1xuaW1wb3J0IHsgTWFpbkRvbUVsZW1lbnQgfSBmcm9tICdAdWNkLWxpYi90aGVtZS1lbGVtZW50cy91dGlscy9taXhpbnMnO1xuaW1wb3J0IHsgTWl4aW4sIExpdENvcmtVdGlscyB9IGZyb20gJ0B1Y2QtbGliL2NvcmstYXBwLXV0aWxzJztcblxuaW1wb3J0IFwiLi9yZXN1bHRzL2FwcC1zZWFyY2gtcmVzdWx0cy1wYW5lbFwiO1xuaW1wb3J0IFwiLi9maWx0ZXJpbmcvYXBwLWZpbHRlcnMtcGFuZWxcIjtcbmltcG9ydCBcIi4vcmVzdWx0cy9hcHAtc2VhcmNoLXJlc3VsdHMtY29sbGVjdGlvbnNcIjtcblxuZXhwb3J0IGNsYXNzIEFwcFNlYXJjaCBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpXG4gIC53aXRoKE1haW5Eb21FbGVtZW50LCBMaXRDb3JrVXRpbHMpIHtcbiAgXG4gIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmlzaWJsZTogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICByZXN1bHRzOiB7IHR5cGU6IEFycmF5IH0sXG4gICAgICBkcmF3ZXJPcGVuOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIGZpcnN0TG9hZDogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBhcHBTdGF0ZTogeyB0eXBlOiBPYmplY3QgfSxcbiAgICAgIHdpZGVGaWx0ZXJzUGFuZWw6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgZmlsdGVyc0NvbGxhcHNlZDogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICB0aGlzLnJlc3VsdHMgPSBbXTtcbiAgICB0aGlzLmRyYXdlck9wZW4gPSBmYWxzZTtcbiAgICB0aGlzLmZpcnN0TG9hZCA9IHRydWU7XG4gICAgdGhpcy5hcHBTdGF0ZSA9IHt9O1xuICAgIHRoaXMud2lkZUZpbHRlcnNQYW5lbCA9IGZhbHNlO1xuICAgIHRoaXMuZmlsdGVyc0NvbGxhcHNlZCA9IHRydWU7XG5cbiAgICB0aGlzLl9pbmplY3RNb2RlbChcbiAgICAgIFwiQXBwU3RhdGVNb2RlbFwiLFxuICAgICAgXCJDb2xsZWN0aW9uTW9kZWxcIixcbiAgICAgIFwiUmVjb3JkTW9kZWxcIixcbiAgICAgIFwiU2VhcmNoVmNNb2RlbFwiLFxuICAgICAgXCJTZW9Nb2RlbFwiXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIGZpcnN0VXBkYXRlZCgpIHtcbiAgICBpZiggdGhpcy5BcHBTdGF0ZU1vZGVsLmxvY2F0aW9uLnBhZ2UgIT09ICdzZWFyY2gnICkgcmV0dXJuO1xuXG4gICAgdGhpcy5fb25BcHBTdGF0ZVVwZGF0ZShhd2FpdCB0aGlzLkFwcFN0YXRlTW9kZWwuZ2V0KCkpO1xuXG4gICAgLy8gaWYoIHRoaXMuYXBwU3RhdGUubG9jYXRpb24ucGF0aFswXSA9PT0gJ3NlYXJjaCcgKSB7XG4gICAgLy8gICBsZXQgc3RhdGUgPSB0aGlzLlNlYXJjaFZjTW9kZWwuZ2V0U2VhcmNoKCk7XG4gICAgLy8gICBpZiggc3RhdGUgKSB0aGlzLl9vblNlYXJjaFZjVXBkYXRlKHN0YXRlKTtcbiAgICAvLyB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbGxhcHNlLWZpbHRlcnMnLCB0aGlzLl9vbkNvbGxhcHNlRmlsdGVycy5iaW5kKHRoaXMpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2UtY2hhbmdlXCIsIHRoaXMuX29uUGFnaW5hdGlvbkNoYW5nZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gQXBwU3RhdGVJbnRlcmZhY2UsIGZpcmVkIHdoZW4gc3RhdGUgdXBkYXRlc1xuICAgKiBAcGFyYW0geyp9IGVcbiAgICovXG4gIF9vbkFwcFN0YXRlVXBkYXRlKGUpIHtcbiAgICBpZiggZS5sb2NhdGlvbi5wYWdlICE9PSAnc2VhcmNoJyApIHJldHVybjtcblxuICAgIHRoaXMuZHJhd2VyT3BlbiA9IGUuZmlsdGVyc0RyYXdlck9wZW4gPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5hcHBTdGF0ZSA9IGU7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uIF9vblNlYXJjaFZjVXBkYXRlLCBmaXJlZCB3aGVuIHJlY29yZCBzZWFyY2ggdmlld0NvbnRyb2xsZXIgdXBkYXRlc1xuICAgKiBAcGFyYW0geyp9IGVcbiAgICovXG4gIF9vblNlYXJjaFZjVXBkYXRlKGUpIHtcbiAgICBpZiAoZS5zdGF0ZSA9PT0gXCJlcnJvclwiKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZXN1bHRzUGFuZWxcIikub25FcnJvcihlKTtcbiAgICB9IGVsc2UgaWYgKGUuc3RhdGUgPT09IFwibG9hZGluZ1wiKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZXN1bHRzUGFuZWxcIikub25Mb2FkaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKGUuc3RhdGUgIT09IFwibG9hZGVkXCIpIHJldHVybjtcblxuICAgIGxldCBjdXJyZW50SW5kZXggPSBlLnNlYXJjaERvY3VtZW50Lm9mZnNldDtcbiAgICBsZXQgcGF5bG9hZCA9IGUucGF5bG9hZDtcbiAgICBsZXQgdG90YWwgPSBwYXlsb2FkLnRvdGFsLnZhbHVlO1xuICAgIHRoaXMucmVzdWx0cyA9IHBheWxvYWQucmVzdWx0cztcblxuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIiNyZXN1bHRzUGFuZWxcIilcbiAgICAgIC5yZW5kZXJSZXN1bHRzKHRoaXMucmVzdWx0cywgdG90YWwsIGUuc2VhcmNoRG9jdW1lbnQubGltaXQsIGN1cnJlbnRJbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25QYWdpbmF0aW9uQ2hhbmdlXG4gICAqIEBkZXNjcmlwdGlvbiBmaXJlZCB3aGVuIHBhZ2luYXRpb24gYnV0dG9uIGlzIGNsaWNrZWRcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGVcbiAgICovXG4gIF9vblBhZ2luYXRpb25DaGFuZ2UoZSkge1xuICAgIGxldCBzZWFyY2hEb2MgPSB0aGlzLlJlY29yZE1vZGVsLmdldEN1cnJlbnRTZWFyY2hEb2N1bWVudCgpO1xuICAgIHRoaXMuUmVjb3JkTW9kZWwuc2V0UGFnaW5nKHNlYXJjaERvYywgZS5kZXRhaWwuc3RhcnRJbmRleCwgZS5kZXRhaWwuaXRlbXNQZXJQYWdlIHx8IHNlYXJjaERvYy5saW1pdCk7XG4gICAgdGhpcy5SZWNvcmRNb2RlbC5zZXRTZWFyY2hMb2NhdGlvbihzZWFyY2hEb2MpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX3RvZ2dsZURyYXdlclxuICAgKiBAZGVzY3JpcHRpb24gdG9nZ2xlcyB0aGUgZHJhd2VyIHN0YXRlLiAgTGlzdGVucyB0b1xuICAgKiB0b2dnbGUtZHJhd2VyIGV2ZW50IGZyb20gYXBwLXNlYXJjaC1yZXN1bHRzLXBhbmVsXG4gICAqL1xuICBfdG9nZ2xlRHJhd2VyKCkge1xuICAgIHRoaXMuQXBwU3RhdGVNb2RlbC5zZXQoeyBmaWx0ZXJzRHJhd2VyT3BlbjogIXRoaXMuZHJhd2VyT3BlbiB9KTtcbiAgfVxuXG4gIF9vbkZpbHRlcnNUYWJVcGRhdGUoZSkge1xuICAgIHRoaXMud2lkZUZpbHRlcnNQYW5lbCA9IGUuZGV0YWlsLnZhbHVlID09PSBcImluZm9cIiA/IHRydWUgOiBmYWxzZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMucXVlcnlTZWxlY3RvcignI3Jlc3VsdHNQYW5lbCcpLl9yZXNpemVBc3luYygpO1xuICAgICAgfSk7XG4gICAgfSwgMzAwKTtcbiAgfVxuXG4gIF9vbkNvbGxhcHNlRmlsdGVycyhlKSB7XG4gICAgdGhpcy5maWx0ZXJzQ29sbGFwc2VkID0gdHJ1ZTtcbiAgICB0aGlzLmRyYXdlck9wZW4gPSBmYWxzZTtcbiAgICB0aGlzLkFwcFN0YXRlTW9kZWwuc2V0KHsgZmlsdGVyc0RyYXdlck9wZW46IHRoaXMuZHJhd2VyT3BlbiB9KTtcbiAgfVxuXG4gIGV4cGFuZEZpbHRlcnMoKSB7XG4gICAgdGhpcy5maWx0ZXJzQ29sbGFwc2VkID0gZmFsc2U7XG4gICAgdGhpcy5kcmF3ZXJPcGVuID0gdHJ1ZTtcbiAgICB0aGlzLkFwcFN0YXRlTW9kZWwuc2V0KHsgZmlsdGVyc0RyYXdlck9wZW46IHRoaXMuZHJhd2VyT3BlbiB9KTsgICAgXG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYXBwLXNlYXJjaFwiLCBBcHBTZWFyY2gpO1xuIiwiaW1wb3J0IHsgaHRtbCB9IGZyb20gXCJsaXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyKCkge1xuICByZXR1cm4gaHRtbGBcbiAgICA8c3R5bGUgaW5jbHVkZT1cInNoYXJlZC1zdHlsZXNcIj5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB9XG4gICAgICAuc2VhcmNoLWNvbnRhaW5lciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1cGVyLWxpZ2h0LWJhY2tncm91bmQtY29sb3IpO1xuICAgICAgICAvKiBtaW4taGVpZ2h0OiA2MHZoOyAqL1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIH1cbiAgICAgIC5zZWFyY2gtY29udGVudCB7XG4gICAgICAgIGZsZXg6IDE7XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAzNXB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgIH1cblxuICAgICAgLyogYXBwLWZpbHRlcnMtcGFuZWwge1xuICAgICAgICB3aWR0aDogMzUwcHg7XG4gICAgICB9XG4gICAgICBhcHAtZmlsdGVycy1wYW5lbFtkYXRhLXdpZGVdIHtcbiAgICAgICAgd2lkdGg6IDQ3NXB4O1xuICAgICAgfSAqL1xuXG4gICAgICBAa2V5ZnJhbWVzIGZhZGVJbiB7XG4gICAgICAgIGZyb20ge1xuICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIH1cbiAgICAgICAgdG8ge1xuICAgICAgICAgIG9wYWNpdHk6IDAuNztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiAjZGVza3RvcC1maWx0ZXItcGFuZWwge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgfSAqL1xuXG4gICAgICAuZmlsdGVycy1jb250YWluZXIge1xuICAgICAgICAvKiB3aWR0aDogMzUwcHg7ICovXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtNDApO1xuICAgICAgICB0cmFuc2l0aW9uOiB3aWR0aCAzMDBtcyBsaW5lYXI7XG4gICAgICB9XG5cbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiAxMDI1cHgpIHtcbiAgICAgICAgLyogYXBwLWZpbHRlcnMtcGFuZWwge1xuICAgICAgICAgIHdpZHRoOiAyNzVweDtcbiAgICAgICAgfVxuICAgICAgICBhcHAtZmlsdGVycy1wYW5lbFtkYXRhLXdpZGVdIHtcbiAgICAgICAgICB3aWR0aDogNDE1cHg7XG4gICAgICAgIH1cbiAgICAgICAgLmZpbHRlcnMtY29udGFpbmVyIHtcbiAgICAgICAgICB3aWR0aDogMjc1cHg7XG4gICAgICAgIH0gKi9cbiAgICAgIH1cblxuICAgICAgLyogQG1lZGlhIChtaW4td2lkdGg6IDk3NXB4KSB7ICovXG4gICAgICAjZGVza3RvcC1maWx0ZXItcGFuZWwge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIH1cbiAgICAgIC5zZWFyY2gtY29udGFpbmVyIHtcbiAgICAgICAgLyogZGlzcGxheTogZmxleDsgKi9cbiAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1hcmVhczogXCJmaXJzdCBmaXJzdCBmaXJzdCBzZWNvbmQgc2Vjb25kIHNlY29uZCBzZWNvbmQgc2Vjb25kIHNlY29uZCBzZWNvbmQgc2Vjb25kIHNlY29uZFwiO1xuICAgICAgICAtLWwtZ2FwOiAxLjVyZW07XG4gICAgICAgIGdyaWQtY29sdW1uLWdhcDogdmFyKC0tbC1nYXAtb3ZlcnJpZGUsIHZhcigtLWwtZ2FwKSk7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEyLCAxZnIpO1xuICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heC1jb250ZW50IDFmcjtcbiAgICAgIH1cblxuICAgICAgLmZpbHRlcnMtY29udGFpbmVyIHtcbiAgICAgICAgZ3JpZC1hcmVhOiBmaXJzdDtcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgICAtLWwtZ2FwOiAxLjVyZW07XG4gICAgICB9XG5cbiAgICAgIC5zZWFyY2gtY29udGVudCB7XG4gICAgICAgIGdyaWQtYXJlYTogc2Vjb25kO1xuICAgICAgICBtaW4td2lkdGg6IDA7XG4gICAgICAgIC0tbC1nYXA6IDEuNXJlbTtcbiAgICAgIH1cblxuICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDEwMjNweCkge1xuICAgICAgICAuc2VhcmNoLWNvbnRhaW5lciB7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1hcmVhczogXCJmaXJzdCBmaXJzdCBmaXJzdCBmaXJzdCBzZWNvbmQgc2Vjb25kIHNlY29uZCBzZWNvbmQgc2Vjb25kIHNlY29uZCBzZWNvbmQgc2Vjb25kXCI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyogfSAqL1xuXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgICAgICAgLnNlYXJjaC1jb250YWluZXIge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG4gICAgIFxuICAgICAgICAvKiBtb2JpbGUgKi9cbiAgICAgICAgYXBwLWZpbHRlcnMtcGFuZWwge1xuICAgICAgICAgIHotaW5kZXg6IDIwMDA7XG4gICAgICAgICAgd2lkdGg6IDkwdnc7XG4gICAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG5cbiAgICAgICAgICAvKiBwcmV2ZW50IHNjcm9sbGluZz8gKi9cbiAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgICByaWdodDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcC1maWx0ZXJzLXBhbmVsLm9mZi1jYW52YXMtLWxlZnQge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XG4gICAgICAgIH1cbiAgICAgICAgLmZpbHRlcnMtY29udGFpbmVyIHtcbiAgICAgICAgICB3aWR0aDogMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICAgICAgLyogdGFibGV0ICovXG4gICAgICB9XG5cbiAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA5OTFweCkge1xuICAgICAgICAvKiBkZXNrdG9wICovXG4gICAgICB9XG4gICAgPC9zdHlsZT5cblxuICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmlsdGVycy1jb250YWluZXJcIj5cbiAgICAgICAgPGFwcC1maWx0ZXJzLXBhbmVsXG4gICAgICAgICAgaWQ9XCJkZXNrdG9wLWZpbHRlci1wYW5lbFwiXG4gICAgICAgICAgY2xhc3M9XCJmaWx0ZXJzLXBhbmVsICR7dGhpcy5maWx0ZXJzQ29sbGFwc2VkXG4gICAgICAgICAgICA/IFwib2ZmLWNhbnZhcy0tbGVmdFwiXG4gICAgICAgICAgICA6IFwiXCJ9XCJcbiAgICAgICAgICBkYXRhLSR7dGhpcy53aWRlRmlsdGVyc1BhbmVsID8gXCJ3aWRlXCIgOiBcIm5vcm1hbFwifVxuICAgICAgICAgIEBzZWxlY3RlZC10YWItY2hhbmdlZD1cIiR7dGhpcy5fb25GaWx0ZXJzVGFiVXBkYXRlfVwiXG4gICAgICAgICAgQGNvbGxhcHNlLWZpbHRlcnM9XCIke3RoaXMuX29uQ29sbGFwc2VGaWx0ZXJzfVwiXG4gICAgICAgID48L2FwcC1maWx0ZXJzLXBhbmVsPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWNvbnRlbnRcIj5cbiAgICAgICAgPGFwcC1zZWFyY2gtcmVzdWx0cy1wYW5lbFxuICAgICAgICAgIGlkPVwicmVzdWx0c1BhbmVsXCJcbiAgICAgICAgICBAdG9nZ2xlLWRyYXdlcj1cIiR7dGhpcy5fdG9nZ2xlRHJhd2VyfVwiXG4gICAgICAgICAgQHBhZ2UtY2hhbmdlPVwiJHt0aGlzLl9vblBhZ2luYXRpb25DaGFuZ2V9XCJcbiAgICAgICAgPlxuICAgICAgICA8L2FwcC1zZWFyY2gtcmVzdWx0cy1wYW5lbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGFwcC1zZWFyY2gtcmVzdWx0cy1jb2xsZWN0aW9uc1xuICAgICAgaWQ9XCJjb2xsZWN0aW9uc1BhbmVsXCJcbiAgICA+PC9hcHAtc2VhcmNoLXJlc3VsdHMtY29sbGVjdGlvbnM+XG4gIGA7XG59XG4iLCJpbXBvcnQgeyBMaXRFbGVtZW50fSBmcm9tICdsaXQnO1xuXG5pbXBvcnQgcmVuZGVyIGZyb20gJy4vYXBwLWZhY2V0LWZpbHRlci50cGwuanMnO1xuaW1wb3J0IHsgTWl4aW4sIExpdENvcmtVdGlscyB9IGZyb20gJ0B1Y2QtbGliL2NvcmstYXBwLXV0aWxzJztcblxuaW1wb3J0ICcuL2FwcC1ub3JtYWwtY2hlY2tib3guanMnO1xuXG5pbXBvcnQgY2xvbmUgZnJvbSBcImNsb25lXCJcblxuY2xhc3MgQXBwRmFjZXRGaWx0ZXIgZXh0ZW5kcyBNaXhpbihMaXRFbGVtZW50KVxuICAud2l0aChMaXRDb3JrVXRpbHMpIHtcblxuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhYmVsIDogeyB0eXBlIDogU3RyaW5nIH0sXG4gICAgICBmaWx0ZXIgOiB7IHR5cGUgOiBTdHJpbmcgfSxcbiAgICAgIGlnbm9yZSA6IHsgdHlwZSA6IEFycmF5IH0sXG4gICAgICB2YWx1ZU1hcCA6IHsgdHlwZSA6IE9iamVjdCB9LFxuICAgICAgYnVja2V0cyA6IHsgdHlwZSA6IEFycmF5IH0sXG4gICAgICBidWNrZXRzSXJvbkxpc3QgOiB7IHR5cGUgOiBBcnJheSB9LFxuICAgICAgaXJvbkxpc3RBY3RpdmUgOiB7IHR5cGUgOiBCb29sZWFuIH0sXG4gICAgICBub3RpZmllZCA6IHsgdHlwZSA6IE9iamVjdCB9LFxuICAgICAgaW5jbHVkZVR5cGVhaGVhZCA6IHsgdHlwZSA6IEJvb2xlYW4gfSxcbiAgICAgIHR5cGVhaGVhZEZpZWxkIDogeyB0eXBlIDogU3RyaW5nIH0sXG4gICAgICBub092ZXJmbG93IDogeyB0eXBlIDogQm9vbGVhbiB9XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnVwZGF0ZVRpbWVyID0gLTE7XG4gICAgdGhpcy5sYWJlbCA9ICcnO1xuICAgIHRoaXMuZmlsdGVyID0gJyc7XG4gICAgdGhpcy5pZ25vcmUgPSBbXTtcbiAgICB0aGlzLnZhbHVlTWFwID0gbnVsbDtcbiAgICB0aGlzLmJ1Y2tldHMgPSBbXTtcbiAgICB0aGlzLmJ1Y2tldHNJcm9uTGlzdCA9IFtdO1xuICAgIHRoaXMuaXJvbkxpc3RBY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLm5vdGlmaWVkID0ge307XG4gICAgdGhpcy5pbmNsdWRlVHlwZWFoZWFkID0gZmFsc2U7XG4gICAgdGhpcy50eXBlYWhlYWRGaWVsZCA9ICcnO1xuICAgIHRoaXMubm9PdmVyZmxvdyA9IHRydWU7XG5cbiAgICB0aGlzLl9pbmplY3RNb2RlbCgnRmlsdGVyc01vZGVsJywgJ1JlY29yZE1vZGVsJyk7XG4gIH1cblxuICByZXNpemUoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGxldCBvdmVyZmxvd0RpdiA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcub3ZlcmZsb3cnKTtcblxuICAgICAgaWYoIG92ZXJmbG93RGl2ICYmIG92ZXJmbG93RGl2Lm9mZnNldEhlaWdodCA+PSAxOTAgKSB7XG4gICAgICAgIHRoaXMubm9PdmVyZmxvdyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgX29uRmlsdGVyQnVja2V0c1VwZGF0ZShlKSB7XG4gICAgaWYoIGUuZmlsdGVyICE9PSB0aGlzLmZpbHRlciApIHJldHVybjtcbiAgICBcbiAgICAvLyBUT0RPIHRlbXAgcmVtb3ZlIG9hYyBpc1BhcnRPZiByZWNvcmRzXG4gICAgZS5idWNrZXRzID0gZS5idWNrZXRzLmZpbHRlcihiID0+ICFiLmtleS5pbmNsdWRlcygnb2FjLmNkbGliLm9yZycpKTtcblxuICAgIGUuYnVja2V0cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYoIHRoaXMubm90aWZpZWRbaXRlbS5rZXldICYmICFpdGVtLmFjdGl2ZSApIHtcbiAgICAgICAgdGhpcy5fbm90aWZ5U2VsZWN0ZWQoaXRlbS5hY3RpdmUsIGl0ZW0ua2V5LCBpdGVtLmRvY19jb3VudCk7XG4gICAgICB9IGVsc2UgaWYoICF0aGlzLm5vdGlmaWVkW2l0ZW0ua2V5XSAmJiBpdGVtLmFjdGl2ZSApIHtcbiAgICAgICAgdGhpcy5fbm90aWZ5U2VsZWN0ZWQoaXRlbS5hY3RpdmUsIGl0ZW0ua2V5LCBpdGVtLmRvY19jb3VudCk7XG4gICAgICB9XG4gICAgICBpZiggQVBQX0NPTkZJRy5jb2xsZWN0aW9uTGFiZWxzW2l0ZW0ua2V5XSApIHtcbiAgICAgICAgbGV0IHZhbHVlTWFwID0ge307XG4gICAgICAgIHZhbHVlTWFwW2l0ZW0ua2V5XSA9IEFQUF9DT05GSUcuY29sbGVjdGlvbkxhYmVsc1tpdGVtLmtleV07XG4gICAgICAgIGl0ZW0udmFsdWVNYXAgPSB2YWx1ZU1hcDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYnVja2V0c0lyb25MaXN0ID0gW107XG4gICAgdGhpcy5idWNrZXRzID0gZS5idWNrZXRzO1xuICAgIHRoaXMuaXJvbkxpc3RBY3RpdmUgPSBmYWxzZTtcblxuICAgIGlmKCB0aGlzLmJ1Y2tldHMubGVuZ3RoID49IDE1ICkge1xuICAgICAgdGhpcy5pbmNsdWRlVHlwZWFoZWFkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZS12aXNpYmlsaXR5Jywge1xuICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgc2hvdzogKGUuYnVja2V0cy5sZW5ndGggIT09IDApXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTsgIFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0QnVja2V0cygpIHtcbiAgICByZXR1cm4gdGhpcy5pcm9uTGlzdEFjdGl2ZSA/IHRoaXMuYnVja2V0c0lyb25MaXN0IDogdGhpcy5idWNrZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgb25QYXJlbnRGaWx0ZXJDbGlja2VkXG4gICAqIEBkZXNjcmlwdGlvbiBjYWxsZWQgZnJvbSBwYXJlbnQgdG9nZ2xlIHBhbmVsIHdoZW4gc2VsZWN0ZWQgZmlsdGVyXG4gICAqIGlzIGNsaWNrZWRcbiAgICogXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgZmlsdGVyIGtleSBcbiAgICovXG4gIG9uUGFyZW50RmlsdGVyQ2xpY2tlZChrZXkpIHtcbiAgICBsZXQgc2VhcmNoRG9jID0gdGhpcy5SZWNvcmRNb2RlbC5nZXRDdXJyZW50U2VhcmNoRG9jdW1lbnQoKVxuICAgIHRoaXMuUmVjb3JkTW9kZWwuc2V0UGFnaW5nKHNlYXJjaERvYywgMCk7XG4gICAgdGhpcy5SZWNvcmRNb2RlbC5yZW1vdmVLZXl3b3JkRmlsdGVyKHNlYXJjaERvYywgdGhpcy5maWx0ZXIsIGtleSk7XG4gICAgdGhpcy5SZWNvcmRNb2RlbC5zZXRTZWFyY2hMb2NhdGlvbihzZWFyY2hEb2MpO1xuXG4gICAgdGhpcy5fbm90aWZ5U2VsZWN0ZWQoZmFsc2UsIGtleSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX25vdGlmeVNlbGVjdGVkXG4gICAqIEBkZXNjcmlwdGlvbiBub3RpZnkgcGFyZW50IG9mIHNlbGVjdGVkL3Vuc2VsZWN0ZWQgZmlsdGVyXG4gICAqIFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHNlbGVjdGVkIGlzIHRoZSBmaWx0ZXIgc2VsZWN0ZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBmaWx0ZXIga2V5L2xhYmVsXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBmaWx0ZXIgY291bnQgb2Ygc2VhcmNoIHJlc3VsdHNcbiAgICovXG4gIF9ub3RpZnlTZWxlY3RlZChzZWxlY3RlZCwga2V5LCBjb3VudCkge1xuICAgIGlmKCAhc2VsZWN0ZWQgJiYgdGhpcy5ub3RpZmllZFtrZXldICkge1xuICAgICAgZGVsZXRlIHRoaXMubm90aWZpZWRba2V5XTtcbiAgICB9IGVsc2UgaWYoIHNlbGVjdGVkICkge1xuICAgICAgdGhpcy5ub3RpZmllZFtrZXldID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoYCR7c2VsZWN0ZWQgPyAnYWRkJyA6ICdyZW1vdmUnfS1zZWxlY3RlZGAsIHtcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgbGFiZWw6IGtleSxcbiAgICAgICAgICBjb3VudFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBfdG9nZ2xlRmlsdGVyKGUpIHtcbiAgICBpZiggIWUuY3VycmVudFRhcmdldC5oYXNBdHRyaWJ1dGUoJ2NoZWNrZWQnKSApIHtcbiAgICAgIHRoaXMuYXBwZW5kRmlsdGVyKGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZUZpbHRlcihlKTtcbiAgICB9XG4gIH1cblxuICBhcHBlbmRGaWx0ZXIoZSkge1xuICAgIGxldCBidWNrZXRzID0gdGhpcy5nZXRCdWNrZXRzKCk7XG4gICAgbGV0IGl0ZW0gPSBidWNrZXRzW3BhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2luZGV4JykpXTtcbiAgICBpZiggaXRlbS5lbXB0eSApIHJldHVybjtcblxuICAgIC8vIHJlc2V0IHR5cGVhaGVhZCBpbmNhc2UgaXQgd2FzIGFjdGl2ZVxuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjdHlwZWFoZWFkJykudmFsdWUgPSAnJztcbiAgICBpZiggdGhpcy5vcmlnaW5hbEJ1Y2tldHMgKSB7XG4gICAgICB0aGlzLm9yaWdpbmFsQnVja2V0cyA9IG51bGw7XG4gICAgfVxuXG4gICAgbGV0IHNlYXJjaERvYyA9IHRoaXMuUmVjb3JkTW9kZWwuZ2V0Q3VycmVudFNlYXJjaERvY3VtZW50KCk7XG4gICAgdGhpcy5SZWNvcmRNb2RlbC5zZXRQYWdpbmcoc2VhcmNoRG9jLCAwKTtcbiAgICB0aGlzLlJlY29yZE1vZGVsLmFwcGVuZEtleXdvcmRGaWx0ZXIoc2VhcmNoRG9jLCB0aGlzLmZpbHRlciwgaXRlbS5rZXkpO1xuICAgIHRoaXMuUmVjb3JkTW9kZWwuc2V0U2VhcmNoTG9jYXRpb24oc2VhcmNoRG9jKTtcblxuICAgIHRoaXMuX25vdGlmeVNlbGVjdGVkKHRydWUsIGl0ZW0ua2V5LCBpdGVtLmRvY19jb3VudCk7XG4gIH1cblxuICByZW1vdmVGaWx0ZXIoZSkge1xuICAgIGxldCBidWNrZXRzID0gdGhpcy5nZXRCdWNrZXRzKCk7XG4gICAgbGV0IGl0ZW0gPSBidWNrZXRzW3BhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2luZGV4JykpXTtcblxuICAgIGxldCBzZWFyY2hEb2MgPSB0aGlzLlJlY29yZE1vZGVsLmdldEN1cnJlbnRTZWFyY2hEb2N1bWVudCgpO1xuICAgIHRoaXMuUmVjb3JkTW9kZWwuc2V0UGFnaW5nKHNlYXJjaERvYywgMCk7XG4gICAgdGhpcy5SZWNvcmRNb2RlbC5yZW1vdmVLZXl3b3JkRmlsdGVyKHNlYXJjaERvYywgdGhpcy5maWx0ZXIsIGl0ZW0ua2V5KTtcbiAgICB0aGlzLlJlY29yZE1vZGVsLnNldFNlYXJjaExvY2F0aW9uKHNlYXJjaERvYyk7XG5cbiAgICB0aGlzLl9ub3RpZnlTZWxlY3RlZChmYWxzZSwgaXRlbS5rZXksIGl0ZW0uZG9jX2NvdW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblR5cGVhaGVhZEtleXVwXG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byB0eXBlYWhlYWQgdGV4dCBpbnB1dCBrZXl1cCBldmVudFxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgXG4gICAqL1xuICBfb25UeXBlYWhlYWRLZXl1cCgpIHtcbiAgICB0aGlzLl91cGRhdGVUeXBlYWhlYWQoKTtcbiAgfVxuXG4gIF91cGRhdGVUeXBlYWhlYWQoKSB7XG4gICAgbGV0IHRleHQgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI3R5cGVhaGVhZCcpLnZhbHVlO1xuICAgIGlmKCAhdGV4dCApIHtcbiAgICAgIGlmKCB0aGlzLm9yaWdpbmFsQnVja2V0cyApIHtcblxuICAgICAgICBpZiggdGhpcy5pcm9uTGlzdEFjdGl2ZSApIHtcbiAgICAgICAgICB0aGlzLmJ1Y2tldHNJcm9uTGlzdCA9IHRoaXMub3JpZ2luYWxCdWNrZXRzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYnVja2V0cyA9IHRoaXMub3JpZ2luYWxCdWNrZXRzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcmlnaW5hbEJ1Y2tldHMgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmKCAhdGhpcy5vcmlnaW5hbEJ1Y2tldHMgKSB7XG4gICAgICB0aGlzLm9yaWdpbmFsQnVja2V0cyA9IFsuLi4odGhpcy5pcm9uTGlzdEFjdGl2ZSA/IHRoaXMuYnVja2V0c0lyb25MaXN0IDogdGhpcy5idWNrZXRzKV07XG4gICAgfVxuXG4gICAgbGV0IHJlID0gbmV3IFJlZ0V4cCgnLionK3RleHQudG9Mb3dlckNhc2UoKSsnLionLCAnaScpO1xuICAgIGxldCBidWNrZXRzID0gdGhpcy5vcmlnaW5hbEJ1Y2tldHMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5zb3J0S2V5Lm1hdGNoKHJlKSB8fCBpdGVtLnZhbHVlTWFwPy5baXRlbS5rZXldPy5tYXRjaChyZSkgPyB0cnVlIDogZmFsc2UpO1xuXG4gICAgaWYoIHRoaXMuaXJvbkxpc3RBY3RpdmUgKSB7XG4gICAgICB0aGlzLmJ1Y2tldHNJcm9uTGlzdCA9IGJ1Y2tldHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnVja2V0cyA9IGJ1Y2tldHM7XG4gICAgfVxuICB9XG5cbn1cblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYXBwLWZhY2V0LWZpbHRlcicsIEFwcEZhY2V0RmlsdGVyKTsiLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0JztcbmltcG9ydCB7IHNoYXJlZFN0eWxlcyB9IGZyb20gJy4uLy4uLy4uL3N0eWxlcy9zaGFyZWQtc3R5bGVzJztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uLy4uLy4uLy4uL2xpYi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHsgXG4gIHJldHVybiBodG1sYFxuXG48c3R5bGU+XG4gICR7c2hhcmVkU3R5bGVzfVxuICA6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH1cblxuICBbaGlkZGVuXSB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxuXG4gIC5maWx0ZXIge1xuICAgIHBhZGRpbmc6IDRweCAwO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxuICAuZmlsdGVyIGEge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIHRyYW5zaXRpb246IGNvbG9yIDI1MG1zIGVhc2Utb3V0LCB0cmFuc2Zvcm0gMjUwbXMgZWFzZS1vdXQ7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgfVxuICAuZmlsdGVyIGEgc3BhbiB7XG4gICAgY29sb3I6IHZhcigtLWRlZmF1bHQtcHJpbWFyeS1jb2xvcik7XG4gIH1cbiAgLmZpbHRlciBhOmhvdmVyIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNSk7XG4gICAgY29sb3I6IHZhcigtLWRlZmF1bHQtcHJpbWFyeS1jb2xvcik7XG4gIH1cblxuICAudHlwZWhlYWQtcGFuZWwge1xuICAgIG1hcmdpbi1yaWdodDogMTJweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuICAjdHlwZWFoZWFkIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIHBhZGRpbmc6IDAgNXB4O1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtMzApO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBoZWlnaHQ6IDU1cHg7XG4gICAgcGFkZGluZy1sZWZ0OiAxcmVtO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICB9XG5cbiAgLmFjdGl2ZS1maWx0ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1wcmltYXJ5LXRleHQtY29sb3IpO1xuICAgIHBhZGRpbmc6IDVweDtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgbWFyZ2luOiAzcHg7XG4gIH1cblxuICAuYWN0aXZlLWZpbHRlcjpob3ZlciB7XG4gICAgY29sb3I6IHZhcigtLWRlZmF1bHQtcHJpbWFyeS1jb2xvcik7XG4gICAgYmFja2dyb3VuZDogI2NjYztcbiAgfVxuXG4gIC5jb3VudCB7XG4gICAgY29sb3I6IHZhcigtLXRleHQtZGlzYWJsZWQpO1xuICAgIGZsZXg6IDE7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgbWluLXdpZHRoIDogMS41cmVtO1xuICAgIHBhZGRpbmc6IDAgMCAwIDEwcHg7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBtaW4td2lkdGg6IGZpdC1jb250ZW50O1xuICB9XG4gIC5jb3VudC5oYXMtY291bnQge1xuICAgIGNvbG9yOiBibGFjaztcbiAgfVxuXG4gIC5vdmVyZmxvdyB7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47ICAgIFxuICAgIG1heC1oZWlnaHQ6IDIwMHB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDEycHg7XG4gIH1cblxuICBpcm9uLWxpc3Qge1xuICAgIGhlaWdodDogMjAwcHg7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gIGFwcC1ub3JtYWwtY2hlY2tib3gge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgcGFkZGluZy1yaWdodDogNXB4O1xuICB9XG5cbiAgcGFwZXItY2hlY2tib3hbYWN0aXZlXSAua2V5IHtcbiAgICBjb2xvcjogdmFyKC0tZGVmYXVsdC1wcmltYXJ5LWNvbG9yKTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgfVxuXG4gIHBhcGVyLWNoZWNrYm94W2Rpc2FibGVkXSAua2V5IHtcbiAgICBjb2xvcjogdmFyKC0tc2Vjb25kYXJ5LXRleHQtY29sb3IpO1xuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgfVxuXG4gIC5vdmVyZmxvdyB7XG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICB9XG5cbiAgLm92ZXJmbG93Ojotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgd2lkdGg6IDEwcHg7XG4gIH1cbiAgLm92ZXJmbG93Ojotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS02MCk7XG4gICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTQwKTtcbiAgICBib3JkZXItcmlnaHQ6IDRweCBzb2xpZCB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTQwKTtcbiAgfVxuICAub3ZlcmZsb3dbbm8tb3ZlcmZsb3ddOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyOiBub25lO1xuICB9XG4gIC5vdmVyZmxvd1tuby1vdmVyZmxvd10ge1xuICAgIHNjcm9sbGJhci1jb2xvcjogdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7XG4gIH1cbiAgLm92ZXJmbG93Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApO1xuICB9XG5cbiAgLyogYmFzaWMgc3VwcG9ydCBmb3IgRkYuIENocm9tZS9TYWZhcmkgc2hvdWxkIHN1cHBvcnQgLXdlYmtpdCBzdHlsZXMgYWJvdmUgKi9cbiAgQHN1cHBvcnRzKHNjcm9sbGJhci1jb2xvcjogcmVkIGJsdWUpIHtcbiAgICAqIHtcbiAgICAgIHNjcm9sbGJhci1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS04MCkgdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS00MCk7XG4gICAgICBzY3JvbGxiYXItd2lkdGg6IHRoaW47XG4gICAgfVxuICB9XG5cbiAgdWNkbGliLWljb24udHlwZWFoZWFkLXNlYXJjaC1pY29uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IDFyZW07XG4gICAgdG9wOiAxN3B4O1xuICAgIGZpbGw6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtNTApO1xuICAgIHdpZHRoOiAyMnB4O1xuICAgIGhlaWdodDogMjJweDtcbiAgICBtYXgtd2lkdGg6IDIycHg7XG4gICAgbWF4LWhlaWdodDogMjJweDtcbiAgICBtaW4td2lkdGg6IDIycHg7XG4gIH1cblxuICAjdHlwZWFoZWFkOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApO1xuICB9XG48L3N0eWxlPlxuXG48IS0tIHR5cGVhaGVhZCBzZWFyY2ggLS0+XG48ZGl2IGNsYXNzPVwidHlwZWhlYWQtcGFuZWxcIiA/aGlkZGVuPVwiJHshdGhpcy5pbmNsdWRlVHlwZWFoZWFkfVwiPlxuICA8aW5wdXQgaWQ9XCJ0eXBlYWhlYWRcIiBcbiAgICB0eXBlPVwidGV4dFwiIFxuICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoICR7dGhpcy5sYWJlbH1zXCIgXG4gICAgQGtleXVwPVwiJHt0aGlzLl9vblR5cGVhaGVhZEtleXVwfVwiIC8+XG4gICAgPHVjZGxpYi1pY29uIGNsYXNzPVwidHlwZWFoZWFkLXNlYXJjaC1pY29uXCIgaWNvbj1cInVjZGxpYi1kYW1zOmZhLW1hZ25pZnlpbmctZ2xhc3NcIj48L3VjZGxpYi1pY29uPlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJvdmVyZmxvd1wiID9uby1vdmVyZmxvdz1cIiR7dGhpcy5ub092ZXJmbG93fVwiPlxuICA8ZGl2PiAgXG4gICAgJHt0aGlzLmJ1Y2tldHMubWFwKChpdGVtLCBpbmRleCkgPT4gaHRtbGBcbiAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyXCI+XG5cbiAgICAgIDxhcHAtbm9ybWFsLWNoZWNrYm94XG4gICAgICAgIHR5cGU9XCIke2l0ZW0ubGFiZWx9XCJcbiAgICAgICAgaW5kZXg9XCIke2luZGV4fVwiXG4gICAgICAgIHZhbHVlPVwiJHtpdGVtLmtleX1cIlxuICAgICAgICAubGFiZWxNYXA9XCIke2l0ZW0udmFsdWVNYXB9XCJcbiAgICAgICAgP2NoZWNrZWQ9XCIke2l0ZW0uYWN0aXZlfVwiIFxuICAgICAgICBAY2hhbmdlPVwiJHt0aGlzLl90b2dnbGVGaWx0ZXJ9XCJcbiAgICAgICAgP2Rpc2FibGVkPVwiJHtpdGVtLmRpc2FibGVkfVwiPlxuICAgICAgPC9hcHAtbm9ybWFsLWNoZWNrYm94PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiY291bnQgJHtpdGVtLmRvY19jb3VudCA+IDAgPyAnaGFzLWNvdW50JyA6ICcnfVwiPiR7dXRpbHMuZm9ybWF0TnVtYmVyV2l0aENvbW1hcyhpdGVtLmRvY19jb3VudCl9PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYCl9XG4gIDwvZGl2PlxuPC9kaXY+XG5cbmA7fSIsImltcG9ydCB7IExpdEVsZW1lbnQgfSBmcm9tIFwibGl0XCI7XG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2FwcC1maWx0ZXItcGFuZWwudHBsLmpzXCI7XG5cbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbmltcG9ydCBcIi4vYXBwLXJhbmdlLWZpbHRlclwiO1xuaW1wb3J0IFwiLi9hcHAtZmFjZXQtZmlsdGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBBcHBGaWx0ZXJQYW5lbCBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpXG4gICAgLndpdGgoTGl0Q29ya1V0aWxzKSB7XG5cbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBmaWx0ZXIgOiB7IHR5cGUgOiBPYmplY3QgfSxcbiAgICAgIG9wZW5lZCA6IHsgdHlwZSA6IEJvb2xlYW4gfSxcbiAgICAgIHNlbGVjdGVkIDogeyB0eXBlIDogQXJyYXkgfVxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5faW5qZWN0TW9kZWwoJ0FwcFN0YXRlTW9kZWwnKTtcblxuICAgIHRoaXMuZmlsdGVyID0ge307XG4gICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gIH1cblxuICBmaXJzdFVwZGF0ZWQoKSB7XG4gICAgaWYoICF0aGlzLmZpbHRlciApIHJldHVybjtcblxuICAgIHRoaXMuaW5uZXJIVE1MID0gJyc7XG4gICAgdmFyIGVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2FwcC0nK3RoaXMuZmlsdGVyLnR5cGUrJy1maWx0ZXInKTtcbiAgICBlbGUubGFiZWwgPSB0aGlzLmZpbHRlci5sYWJlbDtcbiAgICBlbGUuZmlsdGVyID0gdGhpcy5maWx0ZXIuZmlsdGVyO1xuICAgIGVsZS5pZ25vcmUgPSB0aGlzLmZpbHRlci5pZ25vcmU7XG4gICAgZWxlLnZhbHVlTWFwID0gdGhpcy5maWx0ZXIudmFsdWVNYXAgfHwge307XG4gICAgZWxlLmlzRG9sbGFyID0gdGhpcy5maWx0ZXIuaXNEb2xsYXI7XG5cbiAgICBlbGUuaW5jbHVkZVR5cGVhaGVhZCA9IGZhbHNlOyAvLyBpbml0aWFsbHkgY29sbGFwc2VkXG4gICAgZWxlLnR5cGVhaGVhZEZpZWxkID0gdGhpcy5maWx0ZXIudHlwZWFoZWFkRmllbGQ7XG5cbiAgICBlbGUuYWRkRXZlbnRMaXN0ZW5lcigndXBkYXRlLXZpc2liaWxpdHknLCAoZSkgPT4ge1xuICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gZS5kZXRhaWwuc2hvdyA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgICB0aGlzLl90b2dnbGVWaWV3YWJsZUZhY2V0cyhlKTtcbiAgICB9KTtcbiAgICBlbGUuYWRkRXZlbnRMaXN0ZW5lcignYWRkLXNlbGVjdGVkJywgKGUpID0+IHtcbiAgICAgIGxldCBpbmRleCA9IHRoaXMuc2VsZWN0ZWQuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5sYWJlbCA9PT0gZS5kZXRhaWwubGFiZWwpO1xuICAgICAgaWYoIGluZGV4ID4gLTEgKSByZXR1cm47XG4gICAgICBlLmRldGFpbC5uaWNlTGFiZWwgPSB0aGlzLl9nZXRMYWJlbChlLmRldGFpbC5sYWJlbCk7XG4gICAgICB0aGlzLnNlbGVjdGVkLnB1c2goZS5kZXRhaWwpO1xuICAgICAgdGhpcy5fdG9nZ2xlVmlld2FibGVGYWNldHMoZSk7XG4gICAgfSk7XG4gICAgZWxlLmFkZEV2ZW50TGlzdGVuZXIoJ3JlbW92ZS1zZWxlY3RlZCcsIChlKSA9PiB7XG4gICAgICBsZXQgaW5kZXggPSB0aGlzLnNlbGVjdGVkLmZpbmRJbmRleChpdGVtID0+IGl0ZW0ubGFiZWwgPT09IGUuZGV0YWlsLmxhYmVsKTtcbiAgICAgIGlmKCBpbmRleCA9PT0gLTEgKSByZXR1cm47XG4gICAgICB0aGlzLnNlbGVjdGVkLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB0aGlzLl90b2dnbGVWaWV3YWJsZUZhY2V0cyhlKTtcbiAgICB9KTtcbiAgICBlbGUuYWRkRXZlbnRMaXN0ZW5lcignc2V0LXNlbGVjdGVkJywgKGUpID0+IHtcbiAgICAgIGlmKCBlLmRldGFpbC5zZWxlY3RlZCApIHtcbiAgICAgICAgZS5kZXRhaWwubmljZUxhYmVsID0gdGhpcy5fZ2V0TGFiZWwoZS5kZXRhaWwubGFiZWwpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gW2UuZGV0YWlsXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZWxlID0gZWxlO1xuICAgIFxuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcjZmlsdGVycycpLmFwcGVuZENoaWxkKGVsZSk7XG4gICAgdGhpcy5fdG9nZ2xlVmlld2FibGVGYWNldHMoKTtcbiAgfVxuXG4gIF90b2dnbGVWaWV3YWJsZUZhY2V0cyhlKSB7XG4gICAgLy8gZXZlbiBjb2xsYXBzZWQgZmlsdGVyIHZpZXcsIHNlbGVjdGVkIGZpbHRlcnMgc2hvdWxkbid0IGJlIGhpZGRlblxuICAgIGxldCBzZWFyY2hGaWx0ZXJzID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FwcC1mYWNldC1maWx0ZXInKTtcblxuICAgIHNlYXJjaEZpbHRlcnMuZm9yRWFjaChzZWFyY2hGaWx0ZXIgPT4ge1xuICAgICAgbGV0IGZpbHRlcnMgPSBzZWFyY2hGaWx0ZXIuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yQWxsKCcuZmlsdGVyJyk7XG4gICAgICBmaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHsgICAgICAgIFxuICAgICAgICBsZXQgY2hlY2tib3ggPSBmaWx0ZXIucXVlcnlTZWxlY3RvcignYXBwLW5vcm1hbC1jaGVja2JveCcpO1xuICAgICAgICBpZiggY2hlY2tib3guaGFzQXR0cmlidXRlKCdjaGVja2VkJykgKSB7XG4gICAgICAgICAgZmlsdGVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmlsdGVyLnN0eWxlLmRpc3BsYXkgPSB0aGlzLm9wZW5lZCA/ICdmbGV4JyA6ICdub25lJztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBsZXQgdHlwZWFoZWFkID0gc2VhcmNoRmlsdGVyLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLnR5cGVoZWFkLXBhbmVsJyk7XG4gICAgICBpZiggdHlwZWFoZWFkICkge1xuICAgICAgICB0eXBlYWhlYWQuc3R5bGUuZGlzcGxheSA9IHRoaXMub3BlbmVkID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCByYW5nZUZpbHRlciA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdhcHAtcmFuZ2UtZmlsdGVyJyk7XG4gICAgaWYoIHJhbmdlRmlsdGVyICkge1xuICAgICAgcmFuZ2VGaWx0ZXIucGFyZW50RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gdGhpcy5vcGVuZWQgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgIH1cbiAgfVxuXG4gIF9nZXRMYWJlbChsYWJlbCkge1xuICAgIGlmKCAhdGhpcy5maWx0ZXIudmFsdWVNYXAgKSByZXR1cm4gbGFiZWw7XG4gICAgaWYoIHR5cGVvZiB0aGlzLmZpbHRlci52YWx1ZU1hcCA9PT0gJ29iamVjdCcgKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIudmFsdWVNYXBbbGFiZWxdIHx8IGxhYmVsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5maWx0ZXIudmFsdWVNYXAobGFiZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgdG9nZ2xlXG4gICAqIEBkZXNjcmlwdGlvbiB0b2dnbGUgb3BlbmVkIHN0YXRlXG4gICAqL1xuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5vcGVuZWQgPSAhdGhpcy5vcGVuZWQ7XG4gICAgdGhpcy5fdG9nZ2xlVmlld2FibGVGYWNldHMoKTtcbiAgICB0aGlzLl90b2dnbGVPcGVuZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF90b2dnbGVPcGVuZWRcbiAgICogQGRlc2NyaXB0aW9uIGlmIG9wZW5lZCBpcyB0cnVlLCB0ZWxsIHRoZSBjaGlsZCB0byByZXNpemVcbiAgICovXG4gIF90b2dnbGVPcGVuZWQoKSB7XG4gICAgaWYoICF0aGlzLm9wZW5lZCApIHJldHVybjtcbiAgICBpZiggdGhpcy5lbGUgJiYgdGhpcy5lbGUucmVzaXplICkge1xuICAgICAgdGhpcy5lbGUucmVzaXplKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uVG9nZ2xlQ2xpY2tlZFxuICAgKiBAZGVzY3JpcHRpb24gYm91bmQgdG8gbWFpbiBsYWJlbCBjbGljay9rZXlib2FyZCBldmVudHMuIFRvZ2dsZVxuICAgKiB0aGUgcGFuZWwuXG4gICAqIFxuICAgKiBAcGFyYW0ge09iamVjdH0gZSBDbGljay9LZXl3b3JkIGV2ZW50XG4gICAqL1xuICBfb25Ub2dnbGVDbGlja2VkKGUpIHtcbiAgICBpZiggZS50eXBlID09PSAna2V5dXAnICkgeyAvLyBmcm9tIGtleWJvYXJkIGV2ZW50XG4gICAgICBpZiggZS53aGljaCAhPT0gMTMgJiYgZS53aGljaCAhPT0gMzIgKSByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbkZpbHRlckNsaWNrZWRcbiAgICogQGRlc2NyaXB0aW9uIGNhbGxlZCB3aGVuIHNlbGVjdGVkIGZpbHRlciBpcyBjbGlja2VkLFxuICAgKiBub3RpZnkgY2hpbGQgb2YgY2xpY2tcbiAgICovXG4gIF9vbkZpbHRlckNsaWNrZWQoZSkge1xuICAgIGlmKCBlLnR5cGUgPT09ICdrZXl1cCcgKSB7IC8vIGZyb20ga2V5Ym9hcmQgZXZlbnRcbiAgICAgIGlmKCBlLndoaWNoICE9PSAxMyApIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9ub3RpZnlGaWx0ZXJDbGlja2VkKGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2xhYmVsJykpO1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25GaWx0ZXJDbGlja2VkXG4gICAqIEBkZXNjcmlwdGlvbiBub3RpZnkgY2hpbGQgb2YgZmlsdGVyIGNsaWNrXG4gICAqL1xuICBfbm90aWZ5RmlsdGVyQ2xpY2tlZChsYWJlbCkge1xuICAgIGlmKCAhdGhpcy5lbGUgKSByZXR1cm47XG4gICAgaWYoICF0aGlzLmVsZS5vblBhcmVudEZpbHRlckNsaWNrZWQgKSByZXR1cm47XG4gICAgdGhpcy5lbGUub25QYXJlbnRGaWx0ZXJDbGlja2VkKGxhYmVsKTtcbiAgfVxuXG59XG5cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2FwcC1maWx0ZXItcGFuZWwnLCBBcHBGaWx0ZXJQYW5lbCk7IiwiaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2xpdCc7XG5pbXBvcnQgeyBzaGFyZWRTdHlsZXMgfSBmcm9tICcuLi8uLi8uLi9zdHlsZXMvc2hhcmVkLXN0eWxlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHsgXG4gIHJldHVybiBodG1sYFxuXG4gIDxzdHlsZT5cbiAgICAke3NoYXJlZFN0eWxlc31cbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG5cbiAgICAuYWN0aXZlLWZpbHRlcjpob3ZlciAjY2xvc2UgdWNkbGliLWljb24ge1xuICAgICAgZmlsbDogdmFyKC0tY29sb3ItYWdnaWUtZ29sZC04MCk7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTkwKTtcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlLWluLW91dDtcbiAgICAgIHRyYW5zaXRpb246IGZpbGwgMC4zcyBlYXNlLWluLW91dDtcbiAgICB9XG5cbiAgICBbaGlkZGVuXSB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfVxuXG4gICAgLmxhYmVsIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBjb2xvcjogdmFyKC0tZGVmYXVsdC1wcmltYXJ5LWNvbG9yKTtcbiAgICAgIHBhZGRpbmc6IDEwcHggMDtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgb3V0bGluZTogbm9uZSAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC5oaWdobGlnaHQge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbGVmdDogLTEwcHg7XG4gICAgICB0b3A6IDA7XG4gICAgICBib3R0b206IDA7XG4gICAgICB3aWR0aDogNHB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIHZhcigtLWRlZmF1bHQtc2Vjb25kYXJ5LWNvbG9yKTtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gICAgLmxhYmVsOmZvY3VzID4gLmhpZ2hsaWdodCB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG5cbiAgICAuZmlsdGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAvKiBmb250LXN0eWxlOiBpdGFsaWM7ICovXG4gICAgfVxuXG4gICAgaXJvbi1pY29uW2Nsb3NlZF0ge1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcbiAgICB9XG5cbiAgICBpcm9uLWljb25bY2xlYXJdIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTgwKTtcbiAgICAgIG1hcmdpbi1yaWdodDogMnB4O1xuICAgIH1cblxuICAgIHVjZGxpYi1pY29uIHtcbiAgICAgIGZpbGw6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApO1xuICAgICAgd2lkdGg6IDE4cHg7XG4gICAgICBoZWlnaHQ6IDE4cHg7XG4gICAgfVxuXG4gICAgLmFjdGl2ZS1maWx0ZXIge1xuICAgICAgY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUpO1xuICAgIH1cblxuICAgICNjbG9zZSB7XG4gICAgICB3aWR0aDogNTBweDtcbiAgICAgIGhlaWdodDogNTBweDtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIG1hcmdpbi1yaWdodDogMC41cmVtO1xuICAgIH1cblxuICAgICNjbG9zZSB1Y2RsaWItaWNvbiB7XG4gICAgICBwYWRkaW5nOiAzcHg7XG4gICAgICBtaW4td2lkdGg6IDEuMnJlbTtcbiAgICAgIG1pbi1oZWlnaHQ6IDEuMnJlbTtcbiAgICB9XG5cbiAgICAudmFsdWUge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICAgIH1cblxuICAgIC5jb3VudCB7XG4gICAgICBjb2xvcjogdmFyKC0tdGV4dC1kaXNhYmxlZCk7XG4gICAgICBmbGV4OiAxO1xuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICBtaW4td2lkdGg6IDQwcHg7XG4gICAgICBwYWRkaW5nOiAwIDEwcHg7XG4gICAgICBmb250LXdlaWdodDogNDAwO1xuICAgIH1cblxuICAgIC5hY3RpdmUtZmlsdGVyIHtcbiAgICAgIGZsZXg6IDI7XG4gICAgfVxuXG4gICAgLyogSk0gLSB0aGluayB0aGlzIGlzIHJlZHVuZGFudCwgc2Nyb2xsIGluZm9yY2VkIGJ5IGFwcC0qLWZpbHRlciBlbGVtZW50ICovXG4gICAgLyogI2ZpbHRlcnMge1xuICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgIG1heC1oZWlnaHQ6IDIwMHB4O1xuICAgIH0gKi9cbiAgPC9zdHlsZT5cblxuICA8ZGl2IGNsYXNzPVwibGFiZWxcIiBAY2xpY2s9XCIke3RoaXMuX29uVG9nZ2xlQ2xpY2tlZH1cIiBAa2V5dXA9XCIke3RoaXMuX29uVG9nZ2xlQ2xpY2tlZH1cIiByb2xlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCIwXCI+XG4gICAgPGRpdiBzdHlsZT1cImZsZXg6IDE7IGZvbnQtc2l6ZTogMS4xNXJlbVwiPiR7dGhpcy5maWx0ZXIubGFiZWx9PC9kaXY+XG4gICAgXG4gICAgPCEtLSA8aXJvbi1pY29uIGljb249XCJhcnJvdy1kcm9wLWRvd25cIiA/Y2xvc2VkPVwiJHshdGhpcy5vcGVuZWR9XCI+PC9pcm9uLWljb24+IC0tPlxuICAgIDxkaXYgc3R5bGU9XCJwYWRkaW5nLXJpZ2h0OiAxcmVtOyBwYWRkaW5nLXRvcDogLjVyZW07XCI+XG4gICAgICA8dWNkbGliLWljb24gaWNvbj1cInVjZGxpYi1kYW1zOmZhLWNhcmV0LXJpZ2h0XCIgP2hpZGRlbj0ke3RoaXMub3BlbmVkfT48L3VjZGxpYi1pY29uPlxuICAgICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS1jYXJldC1kb3duXCIgP2hpZGRlbj0keyF0aGlzLm9wZW5lZH0+PC91Y2RsaWItaWNvbj5cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwiaGlnaGxpZ2h0XCI+PC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgaWQ9XCJmaWx0ZXJzXCI+PC9kaXY+XG4gIDwhLS0gPGRpdiBpZD1cImZpbHRlcnNcIiA/aGlkZGVuPVwiJHshdGhpcy5vcGVuZWR9XCI+PC9kaXY+IC0tPlxuICBcblxuYDt9IiwiaW1wb3J0IHsgTGl0RWxlbWVudCB9IGZyb20gXCJsaXRcIjtcbmltcG9ydCBcIkBwb2x5bWVyL2lyb24tcGFnZXMvaXJvbi1wYWdlc1wiO1xuaW1wb3J0IFwiLi9hcHAtZmlsdGVyLXBhbmVsXCI7XG5cbmltcG9ydCByZW5kZXIgZnJvbSBcIi4vYXBwLWZpbHRlcnMtcGFuZWwudHBsLmpzXCI7XG5cbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbi8vIGluaXQgZmFjZXQgZmlsdGVycyBmcm9tIHRlbXBsYXRlXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi8uLi8uLi8uLi9saWIvY29uZmlnXCI7XG5jb25zdCBmYWNldEZpbHRlcnMgPSBbXTtcbmZvciAodmFyIGtleSBpbiBjb25maWcuZWxhc3RpY1NlYXJjaC5mYWNldHMpIHtcbiAgbGV0IGMgPSBjb25maWcuZWxhc3RpY1NlYXJjaC5mYWNldHNba2V5XTtcbiAgZmFjZXRGaWx0ZXJzLnB1c2goe1xuICAgIGxhYmVsOiBjLmxhYmVsLFxuICAgIHR5cGU6IGMudHlwZSxcbiAgICBpZ25vcmU6IGMuaWdub3JlLFxuICAgIHZhbHVlTWFwOiBjLnZhbHVlTWFwLFxuICAgIGlzRG9sbGFyOiBjLmlzRG9sbGFyLFxuICAgIGluY2x1ZGVUeXBlYWhlYWQ6IGMudHlwZWFoZWFkID8gdHJ1ZSA6IGZhbHNlLFxuICAgIHR5cGVhaGVhZEZpZWxkOiBjLnR5cGVhaGVhZCxcbiAgICBmaWx0ZXI6IGtleSxcbiAgfSk7XG59XG5cbmNsYXNzIEFwcEZpbHRlcnNQYW5lbCBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpLndpdGgoTGl0Q29ya1V0aWxzKSB7XG4gIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmFjZXRGaWx0ZXJzOiB7IHR5cGU6IEFycmF5IH0sXG4gICAgICBzZWxlY3RlZENvbGxlY3Rpb246IHsgdHlwZTogT2JqZWN0IH0sXG4gICAgICBjb2xsZWN0aW9uTW9kZTogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5faW5qZWN0TW9kZWwoXCJBcHBTdGF0ZU1vZGVsXCIpO1xuXG4gICAgdGhpcy5mYWNldEZpbHRlcnMgPSBmYWNldEZpbHRlcnM7XG4gICAgdGhpcy5zZWxlY3RlZENvbGxlY3Rpb24gPSB7fTtcbiAgICB0aGlzLmNvbGxlY3Rpb25Nb2RlID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfZmlyZVRvZ2dsZURyYXdlclxuICAgKiBAZGVzY3JpcHRpb24gY2FsbGVkIGZyb20gdG9nZ2xlIGJ1dHRvbiwgZGlzcGF0Y2hlcyBldmVudCBmb3IgYXBwLXNlYXJjaCB0byBoYW5kbGUgaGlkaW5nIGRyYXdlcjtcbiAgICovXG4gIF9maXJlVG9nZ2xlRHJhd2VyKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJ0b2dnbGUtZHJhd2VyXCIsIHtcbiAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgIGRldGFpbDogJ3RvZ2dsZS1kcmF3ZXInXG4gICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX3JlbW92ZUNvbGxlY3Rpb25GaWx0ZXJcbiAgICogQGRlc2NyaXB0aW9uIGZpcmVkIGZyb20gaGFyZCBjb2RlZCBjb2xsZWN0aW9uIGZpbHRlciBjaGVja2JveC4gIFJlbW92ZVxuICAgKiBjb2xsZWN0aW9uIGZpbHRlciB3aGVuIGNsaWNrZWRcbiAgICovXG4gIF9yZW1vdmVDb2xsZWN0aW9uRmlsdGVyKCkge1xuICAgIGxldCBzZWFyY2hEb2MgPSB0aGlzLl9nZXRDdXJyZW50U2VhcmNoRG9jdW1lbnQoKTtcbiAgICB0aGlzLlJlY29yZE1vZGVsLnJlbW92ZUtleXdvcmRGaWx0ZXIoc2VhcmNoRG9jLCBcImlzUGFydE9mLkBpZFwiKTtcbiAgICB0aGlzLlJlY29yZE1vZGVsLnNldFBhZ2luZyhzZWFyY2hEb2MsIDApO1xuICAgIHRoaXMuUmVjb3JkTW9kZWwuc2V0U2VhcmNoTG9jYXRpb24oc2VhcmNoRG9jKTtcbiAgfVxuXG4gIF9jb2xsYXBzZUZpbHRlcnMoZSkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJjb2xsYXBzZS1maWx0ZXJzXCIsIHtcbiAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICAgIGRldGFpbDogJ2NvbGxhcHNlLWZpbHRlcnMnXG4gICAgfSkpO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC1maWx0ZXJzLXBhbmVsXCIsIEFwcEZpbHRlcnNQYW5lbCk7IiwiaW1wb3J0IHsgaHRtbCB9IGZyb20gXCJsaXRcIjtcbmltcG9ydCB7IHNoYXJlZFN0eWxlcyB9IGZyb20gXCIuLi8uLi8uLi9zdHlsZXMvc2hhcmVkLXN0eWxlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXIoKSB7XG4gIHJldHVybiBodG1sYFxuICAgIDxzdHlsZT5cbiAgICAgICR7c2hhcmVkU3R5bGVzfSA6aG9zdCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtNDApO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB9XG5cbiAgICAgICNmaWx0ZXJzIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDEycHg7XG4gICAgICB9XG5cbiAgICAgIC50aXRsZSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1kZWZhdWx0LXByaW1hcnktY29sb3IpO1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgcGFkZGluZzogMTVweCAwO1xuICAgICAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLW1lZGl1bS1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cblxuICAgICAgYXBwLWZpbHRlci1wYW5lbCB7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB3aGl0ZTtcbiAgICAgICAgcGFkZGluZzogMC40cmVtIDA7XG4gICAgICB9XG5cbiAgICAgIC50aHVtYm5haWwge1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgIH1cblxuICAgICAgLnRodW1ibmFpbC1yb290IHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBoZWlnaHQ6IDIwMHB4O1xuICAgICAgfVxuXG4gICAgICAubGFiZWwge1xuICAgICAgICBwYWRkaW5nOiAxMHB4IDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1kZWZhdWx0LXByaW1hcnktY29sb3IpO1xuICAgICAgICBmb250LXdlaWdodDogdmFyKC0tZnctYm9sZCk7XG4gICAgICB9XG5cbiAgICAgIC5jb2xsZWN0aW9uLWZpbHRlciB7XG4gICAgICAgIHBhZGRpbmc6IDRweCA1cHg7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1tZWRpdW0tYmFja2dyb3VuZC1jb2xvcik7XG4gICAgICB9XG5cbiAgICAgIC5vdXRlci1kcmF3ZXItdG9nZ2xlIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgfVxuICAgICAgLm91dGVyLWRyYXdlci10b2dnbGVbc3BhY2VyXSB7XG4gICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLW1lZGl1bS1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgICB9XG5cbiAgICAgIC5kcmF3ZXItdG9nZ2xlIHtcbiAgICAgICAgZm9udC1zaXplOiB2YXIoLS1mcy1zbSk7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgei1pbmRleDogMTU7XG4gICAgICAgIHRvcDogMTVweDtcbiAgICAgICAgcmlnaHQ6IC0yNHB4O1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiB2YXIoLS1mdy1ib2xkKTtcbiAgICAgICAgY29sb3I6IHZhcigtLWRlZmF1bHQtcHJpbWFyeS1jb2xvcik7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LWJhY2tncm91bmQtY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICB9XG4gICAgICAuZHJhd2VyLXRvZ2dsZSA+IHNwYW4ge1xuICAgICAgICBwYWRkaW5nOiAwIDEwcHg7XG4gICAgICB9XG4gICAgICAuZHJhd2VyLXRvZ2dsZSBpcm9uLWljb24ge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kZWZhdWx0LXNlY29uZGFyeS1jb2xvcik7XG4gICAgICB9XG5cbiAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA5NzVweCkge1xuICAgICAgICBoMiB7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIH1cbiAgICAgICAgLm91dGVyLWRyYXdlci10b2dnbGUge1xuICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIH1cbiAgICAgICAgLnRpdGxlIHtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgfVxuICAgICAgfVxuXG5cblxuICAgICAgLyogTU9CSUxFIExBWU9VVCAqL1xuXG4gICAgICAuaGVhZGluZyB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApO1xuICAgICAgICBwYWRkaW5nOiAwIDFyZW07XG4gICAgICAgIGhlaWdodDogNjEuNzVweDtcbiAgICAgIH1cbiAgICAgIC5oZWFkaW5nIGg1IHtcbiAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIG1hcmdpbjogMC44cmVtIDA7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgICAgfVxuICAgICAgLmhlYWRpbmcgLmNvbGxhcHNlIHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgd2lkdGg6IDYwcHg7XG4gICAgICAgIGhlaWdodDogNjBweDtcbiAgICAgIH1cblxuICAgICAgLmhlYWRpbmcgdWNkbGliLWljb24ge1xuICAgICAgICBmaWxsOiB2YXIoLS1jb2xvci1hZ2dpZS1nb2xkKTtcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgICBwYWRkaW5nLXRvcDogMC45cmVtO1xuICAgICAgfVxuXG4gICAgICAuaGVhZGluZyB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAgICAgICAuaGVhZGluZyB7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgLyogbWFyZ2luLXRvcDogNTJweDsgKi9cbiAgICAgICAgfVxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgYm94LXNoYWRvdzogMHB4IDNweCA2cHggIzAwMDAwMDI5O1xuICAgICAgICB9XG4gICAgICAgIC5vdmVyZmxvdyB7XG4gICAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgICAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxMDBweCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIDwvc3R5bGU+XG5cbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGluZ1wiPlxuICAgICAgPGg1PkZpbHRlcnM8L2g1PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbGxhcHNlXCIgQGNsaWNrPVwiJHt0aGlzLl9jb2xsYXBzZUZpbHRlcnN9XCI+XG4gICAgICAgIDx1Y2RsaWItaWNvblxuICAgICAgICAgIGljb249XCJ1Y2RsaWItZGFtczpmYS10aW1lc1wiXG4gICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICBpY29uPVwiZmEtdGltZXNcIlxuICAgICAgICAgIGFsdD1cIkNvbGxhcHNlIGZpbHRlcnNcIlxuICAgICAgICA+XG4gICAgICAgIDwvdWNkbGliLWljb24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJ0aHVtYm5haWwtcm9vdFwiID9oaWRkZW49XCIkeyF0aGlzLmNvbGxlY3Rpb25Nb2RlfVwiPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cInRodW1ibmFpbFwiXG4gICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCcke1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb2xsZWN0aW9uLnRodW1ibmFpbFVybFxuICAgICAgICB9JylcIlxuICAgICAgPjwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm92ZXJmbG93XCI+XG4gICAgICA8ZGl2IGlkPVwiZmlsdGVyc1wiPlxuICAgICAgICAke3RoaXMuZmFjZXRGaWx0ZXJzLm1hcChcbiAgICAgICAgICAoaXRlbSwgaW5kZXgpID0+IGh0bWxgXG4gICAgICAgICAgICA8YXBwLWZpbHRlci1wYW5lbCAuZmlsdGVyPVwiJHtpdGVtfVwiPjwvYXBwLWZpbHRlci1wYW5lbD5cbiAgICAgICAgICBgXG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuXG4gICAgPC9kaXY+XG4gIGA7XG59XG4iLCJpbXBvcnQgeyBMaXRFbGVtZW50fSBmcm9tICdsaXQnO1xuXG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2FwcC1ub3JtYWwtY2hlY2tib3gudHBsLmpzXCI7XG5cbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBBcHBOb3JtYWxDaGVja2JveCBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpXG4gICAgLndpdGgoTGl0Q29ya1V0aWxzKSB7XG4gIFxuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlIDogeyB0eXBlIDogU3RyaW5nIH0sXG4gICAgICBsYWJlbCA6IHsgdHlwZSA6IFN0cmluZyB9LFxuICAgICAgbGFiZWxNYXAgOiB7IHR5cGUgOiBPYmplY3QgfSxcbiAgICAgIGxhYmVsTWFwVHlwZSA6IHsgdHlwZSA6IFN0cmluZyB9LFxuICAgICAgcmVhbExhYmVsOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgY2hlY2tlZCA6IHsgdHlwZSA6IEJvb2xlYW4gfSxcbiAgICAgIGRpc2FibGVkIDogeyB0eXBlIDogQm9vbGVhbiB9LFxuICAgICAgYXJpYUNoZWNrZWQgOiB7IHR5cGUgOiBTdHJpbmcgfSxcbiAgICAgIGFyaWFEaXNhYmxlZCA6IHsgdHlwZSA6IFN0cmluZyB9LFxuICAgICAgcm9sZSA6IHsgdHlwZSA6IFN0cmluZyB9LFxuICAgICAgdGFiaW5kZXggOiB7IHR5cGUgOiBOdW1iZXIgfVxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuXG4gICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgIHRoaXMubGFiZWwgPSAnJztcbiAgICB0aGlzLmxhYmVsTWFwID0gbnVsbDtcbiAgICB0aGlzLmxhYmVsTWFwVHlwZSA9IG51bGw7XG4gICAgdGhpcy5yZWFsTGFiZWwgPSAnJztcbiAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgdGhpcy5hcmlhQ2hlY2tlZCA9ICcnO1xuICAgIHRoaXMuYXJpYURpc2FibGVkID0gJyc7XG4gICAgdGhpcy5yb2xlID0gJ2NoZWNrYm94JztcbiAgICB0aGlzLnRhYmluZGV4ID0gMDtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHRoaXMuX29uQ2xpY2soZSkpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlID0+IHtcbiAgICAgIGlmKCBlLndoaWNoICE9PSAxMyApIHJldHVybjtcbiAgICAgIHRoaXMuX29uQ2xpY2soZSlcbiAgICB9KTtcbiAgfVxuXG4gIHdpbGxVcGRhdGUoKSB7XG4gICAgdGhpcy5jaGVja2VkID0gdGhpcy5oYXNBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9yZWFsTGFiZWxcbiAgICogQGRlc2NyaXB0aW9uIHJlbmRlciBsYWJlbFxuICAgKiBcbiAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbGFiZWwgXG4gICAqL1xuICBfcmVhbExhYmVsKHZhbHVlLCBsYWJlbCkge1xuICAgIHJldHVybiB0aGlzLl9nZXRMYWJlbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX2NvbXB1dGVBcmlhQ2hlY2tlZFxuICAgKiBAZGVzY3JpcHRpb24gQm91bmQgdG8gJ2NoZWNrZWQnIHByb3BlcnR5LiAgc2V0IGFyaWEtY2hlY2tlZCB2YWx1ZVxuICAgKi9cbiAgX2NvbXB1dGVBcmlhQ2hlY2tlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja2VkID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9jb21wdXRlQXJpYURpc2FibGVkXG4gICAqIEBkZXNjcmlwdGlvbiBCb3VuZCB0byAnZGlzYWJsZWQnIHByb3BlcnR5LiAgc2V0IGFyaWEtZGlzYWJsZWQgdmFsdWVcbiAgICovXG4gIF9jb21wdXRlQXJpYURpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9jb21wdXRlVGFiSW5kZXhcbiAgICogQGRlc2NyaXB0aW9uIEJvdW5kIHRvICdkaXNhYmxlZCcgcHJvcGVydHkuICBzZXQgdGFiaW5kZXggdmFsdWVcbiAgICovXG4gIF9jb21wdXRlVGFiSW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyAtMSA6IDA7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfZ2V0TGFiZWxcbiAgICogQGRlc2NyaXB0aW9uIHJldHVybiBsYWJlbCBmb3IgYSB2YWx1ZVxuICAgKi9cbiAgX2dldExhYmVsKCkge1xuICAgIGlmKCB0aGlzLmxhYmVsTWFwVHlwZSA9PT0gbnVsbCApIHRoaXMuX29uTGFiZWxNYXBVcGRhdGUoKTtcbiAgICBpZiggIXRoaXMubGFiZWxNYXBUeXBlICkgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgXG4gICAgaWYoIHRoaXMubGFiZWxNYXBUeXBlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGhpcy5sYWJlbE1hcCA9PT0gJ29iamVjdCcgJiYgdGhpcy5sYWJlbE1hcFt0aGlzLnZhbHVlXSApIHtcbiAgICAgIHJldHVybiB0aGlzLmxhYmVsTWFwW3RoaXMudmFsdWVdO1xuICAgIH0gZWxzZSBpZiggdGhpcy5sYWJlbE1hcFR5cGUgPT09ICdmdW5jdGlvbicgKSB7XG4gICAgICByZXR1cm4gdGhpcy5sYWJlbE1hcCh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbkxhYmVsTWFwVXBkYXRlXG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byAnbGFiZWxNYXAnIHByb3BlcnR5IG9ic2VydmVyLiAgc2V0IHRoZSBcbiAgICogbGFiZWxNYXBUeXBlIHByb3BlcnR5XG4gICAqL1xuICBfb25MYWJlbE1hcFVwZGF0ZSgpIHtcbiAgICB0aGlzLmxhYmVsTWFwVHlwZSA9ICcnO1xuICAgIGlmKCAhdGhpcy5sYWJlbE1hcCApIHJldHVybjtcbiAgICB0aGlzLmxhYmVsTWFwVHlwZSA9IHR5cGVvZiB0aGlzLmxhYmVsTWFwO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uQ2xpY2tcbiAgICogQGRlc2NyaXB0aW9uIGNhbGxlZCB3aGVuIGRpdiB3cmFwcGVyIGlzIGNsaWNrZWRcbiAgICogXG4gICAqIFRPRE86IGFkZCBhcmlhIGNoZWNrYm94IHJvbGVcbiAgICovXG4gIF9vbkNsaWNrKCkge1xuICAgIGlmKCB0aGlzLmRpc2FibGVkICkgcmV0dXJuO1xuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2hhbmdlJywge2J1YmJsZXM6IHRydWUsIGNvbXBvc2VkOiB0cnVlfSkpO1xuICB9XG5cbn1cblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYXBwLW5vcm1hbC1jaGVja2JveCcsIEFwcE5vcm1hbENoZWNrYm94KTsiLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0JztcbmltcG9ydCB7IHNoYXJlZFN0eWxlcyB9IGZyb20gJy4uLy4uLy4uL3N0eWxlcy9zaGFyZWQtc3R5bGVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyKCkgeyBcbiAgcmV0dXJuIGh0bWxgXG5cbjxzdHlsZT5cbiAgJHtzaGFyZWRTdHlsZXN9XG5cbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gIDpob3N0KDpmb2N1cykge1xuICAgIG91dGxpbmU6IHZhcigtLWRlZmF1bHQtb3V0bGluZSk7XG4gIH1cblxuICA6aG9zdCg6aG92ZXIpICNjbG9zZSB1Y2RsaWItaWNvbiB7XG4gICAgICBmaWxsOiB2YXIoLS1jb2xvci1hZ2dpZS1nb2xkLTgwKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtOTApO1xuICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2UtaW4tb3V0O1xuICAgICAgdHJhbnNpdGlvbjogZmlsbCAwLjNzIGVhc2UtaW4tb3V0O1xuICAgIH1cblxuICA6aG9zdChbZGlzYWJsZWRdKSB7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDtcbiAgfVxuXG4gIFtoaWRkZW5dIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9XG5cbiAgaXJvbi1pY29uIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIGNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTgwKTtcbiAgICBtaW4td2lkdGg6IDI0cHg7XG4gICAgbWFyZ2luLXJpZ2h0OiAycHg7XG4gIH1cblxuICBkaXYge1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgbWluLWhlaWdodDogMjRweDtcbiAgICBhbGlnbi1pdGVtczogdG9wO1xuICB9XG5cbiAgc3BhbiB7XG4gICAgLyogcGFkZGluZy10b3A6IDNweDsgKi9cbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICB9XG5cbiAgZGl2W2NoZWNrZWRdIGlyb24taWNvbiB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB9XG5cbiAgZGl2W2NoZWNrZWRdIC52YWx1ZSB7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlKTtcbiAgfVxuXG4gIGRpdltkaXNhYmxlZF0gI2Nsb3NlLFxuICBkaXYgI2Nsb3NlIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgZGl2W2Rpc2FibGVkXSAudmFsdWUge1xuICAgIGNvbG9yOiB2YXIoLS1ncmF5LXRleHQpO1xuICB9XG4gIGRpdltjaGVja2VkXSAjY2xvc2Uge1xuICAgIG1heC13aWR0aDogMzVweDtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgfVxuICB1Y2RsaWItaWNvbiB7XG4gICAgZmlsbDogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS04MCk7XG4gICAgd2lkdGg6IDFyZW07XG4gICAgaGVpZ2h0OiAxcmVtO1xuICB9XG5cbiAgI2Nsb3NlIHVjZGxpYi1pY29uIHtcbiAgICBwYWRkaW5nOiAzcHg7XG4gICAgbWluLXdpZHRoOiAxLjJyZW07XG4gICAgbWluLWhlaWdodDogMS4ycmVtO1xuICAgIG1hcmdpbi1yaWdodDogMC4ycmVtO1xuICB9XG5cbjwvc3R5bGU+XG5cbjxkaXYgP2NoZWNrZWQ9XCIke3RoaXMuY2hlY2tlZH1cIiA/ZGlzYWJsZWQ9XCIke3RoaXMuZGlzYWJsZWR9XCI+XG5cbiAgPGRpdiBpZD1cImNsb3NlXCI+XG4gICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS10aW1lc1wiIEBjbGljaz1cIiR7dGhpcy5fb25DbGlja31cIj48L3VjZGxpYi1pY29uPlxuICA8L2Rpdj4gICBcblxuICA8c3BhbiBjbGFzcz1cInZhbHVlXCI+JHt0aGlzLl9yZWFsTGFiZWwoKX08L3NwYW4+XG48L2Rpdj5cbmA7fSIsImltcG9ydCB7IExpdEVsZW1lbnQgfSBmcm9tIFwibGl0XCI7XG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2FwcC1yYW5nZS1maWx0ZXIudHBsLmpzXCI7XG5cbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbmltcG9ydCBcIi4uLy4uLy4uL3V0aWxzL2FwcC1yYW5nZS1zbGlkZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwUmFuZ2VGaWx0ZXIgZXh0ZW5kcyBNaXhpbihMaXRFbGVtZW50KS53aXRoKFxuICBMaXRDb3JrVXRpbHNcbikge1xuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhYmVsOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgZmlsdGVyOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgYWJzTWluVmFsdWU6IHsgdHlwZTogTnVtYmVyIH0sXG4gICAgICBhYnNNYXhWYWx1ZTogeyB0eXBlOiBOdW1iZXIgfSxcbiAgICAgIG1pblZhbHVlOiB7IHR5cGU6IE51bWJlciB9LFxuICAgICAgbWF4VmFsdWU6IHsgdHlwZTogTnVtYmVyIH0sXG4gICAgICBzaG93VW5rbm93bjogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLmxhYmVsID0gXCJcIjtcbiAgICB0aGlzLmZpbHRlciA9IFwiXCI7XG4gICAgdGhpcy5hYnNNaW5WYWx1ZSA9IC0xO1xuICAgIHRoaXMuYWJzTWF4VmFsdWUgPSAtMTtcbiAgICB0aGlzLm1pblZhbHVlID0gLTE7XG4gICAgdGhpcy5tYXhWYWx1ZSA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgdGhpcy5zaG93VW5rbm93biA9IGZhbHNlO1xuXG4gICAgdGhpcy5faW5qZWN0TW9kZWwoXCJBcHBTdGF0ZU1vZGVsXCIsIFwiUmVjb3JkTW9kZWxcIiwgXCJDb2xsZWN0aW9uTW9kZWxcIiwgXCJGaWx0ZXJzTW9kZWxcIik7XG4gIH1cblxuICBhc3luYyBmaXJzdFVwZGF0ZWQoKSB7XG4gICAgaWYoIHRoaXMuQXBwU3RhdGVNb2RlbC5sb2NhdGlvbi5wYWdlICE9PSAnc2VhcmNoJyApIHJldHVybjtcblxuICAgIGxldCBzZWFyY2hEb2MgPSB0aGlzLlJlY29yZE1vZGVsLmdldEN1cnJlbnRTZWFyY2hEb2N1bWVudCgpO1xuICAgIGlmKCBzZWFyY2hEb2MgKSB7XG4gICAgICB0aGlzLl9vblJlY29yZFNlYXJjaFVwZGF0ZShhd2FpdCB0aGlzLlJlY29yZE1vZGVsLnNlYXJjaChzZWFyY2hEb2MpKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlc2l6ZSgpO1xuICB9XG5cbiAgcmVzaXplKCkge1xuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI3NsaWRlclwiKS5fb25SZXNpemUoKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjc2xpZGVyXCIpLl9vblJlc2l6ZSgpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfaXNEZWZhdWx0U3RhdGVcbiAgICogQGRlc2NyaXB0aW9uIGlzIHJhbmdlIGZpbHRlciBpbiB0aGUgZGVmYXVsdCBzdGF0ZT8gIGllIGFicyBtaW4vbWF4XG4gICAqIGlzIHRoZSBzYW1lIGFzIG1pbi9tYXggYW5kIHVua25vd24gdmFsdWVzIGFyZSBpbmNsdWRlZD8gIElmIHNvXG4gICAqIHdlIGRvbid0IGFjdHVhbGx5IG5lZWQgYSBmaWx0ZXIgb24uXG4gICAqL1xuICBfaXNEZWZhdWx0U3RhdGUoKSB7XG4gICAgaWYgKCF0aGlzLl9pc0ZpbHRlckFwcGxpZWQoKSkge1xuICAgICAgbGV0IHNlYXJjaERvYyA9IHRoaXMuUmVjb3JkTW9kZWwuZ2V0Q3VycmVudFNlYXJjaERvY3VtZW50KCk7XG4gICAgICB0aGlzLlJlY29yZE1vZGVsLnJlbW92ZVJhbmdlRmlsdGVyKHNlYXJjaERvYywgdGhpcy5maWx0ZXIpO1xuICAgICAgdGhpcy5SZWNvcmRNb2RlbC5zZXRTZWFyY2hMb2NhdGlvbihzZWFyY2hEb2MpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uUmFuZ2VTbGlkZXJDaGFuZ2VcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIGN1c3RvbSAncmFuZ2UtdmFsdWUtY2hhbmdlJyBldmVudCBmcm9tIGFwcC1yYW5nZS1zbGlkZXJcbiAgICovXG4gIF9vblJhbmdlU2xpZGVyQ2hhbmdlKGUpIHtcbiAgICB0aGlzLm1pblZhbHVlID0gZS5kZXRhaWwubWluO1xuICAgIHRoaXMubWF4VmFsdWUgPSBlLmRldGFpbC5tYXg7XG5cbiAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNtaW5WYWx1ZUlucHV0XCIpLnZhbHVlID0gdGhpcy5taW5WYWx1ZTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNtYXhWYWx1ZUlucHV0XCIpLnZhbHVlID0gdGhpcy5tYXhWYWx1ZTtcblxuICAgIHRoaXMuX29uUmFuZ2VOdWxsQ2hhbmdlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25SYW5nZU51bGxDaGFuZ2VcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIGlucHV0IGNoZWNrYm94LiAgQ3VycmVudGx5IGNhbGxlZCBieSBpbnRlcm5hbFxuICAgKiBmdW5jdGlvbnMgYXMgd2VsbCB0byBzZWFyY2ggYWZ0ZXIgdmFsdWUgY2hhbmdlIDovXG4gICAqL1xuICBfb25SYW5nZU51bGxDaGFuZ2UoKSB7XG4gICAgbGV0IHZhbHVlID0ge1xuICAgICAgZ3RlOiB0aGlzLm1pblZhbHVlLFxuICAgICAgbHRlOiB0aGlzLm1heFZhbHVlLFxuICAgIH07XG5cbiAgICBpZiAodGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjdW5rbm93blwiKS5jaGVja2VkKSB7XG4gICAgICB2YWx1ZS5pbmNsdWRlTnVsbCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIGZpbHRlciBhbmQgcmV0dXJuXG4gICAgaWYgKHRoaXMuX2lzRGVmYXVsdFN0YXRlKCkpIHJldHVybjtcblxuICAgIGxldCBzZWFyY2hEb2MgPSB0aGlzLlJlY29yZE1vZGVsLmdldEN1cnJlbnRTZWFyY2hEb2N1bWVudCgpO1xuICAgIHRoaXMuUmVjb3JkTW9kZWwuc2V0UGFnaW5nKHNlYXJjaERvYywgMCk7XG4gICAgdGhpcy5SZWNvcmRNb2RlbC5hcHBlbmRSYW5nZUZpbHRlcihzZWFyY2hEb2MsIHRoaXMuZmlsdGVyLCB2YWx1ZSk7XG4gICAgdGhpcy5SZWNvcmRNb2RlbC5zZXRTZWFyY2hMb2NhdGlvbihzZWFyY2hEb2MpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uSW5wdXRDaGFuZ2VcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIG1pbi9tYXggbnVtYmVyIGlucHV0cy5cbiAgICovXG4gIF9vbklucHV0Q2hhbmdlKCkge1xuICAgIGxldCBtaW4gPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNtaW5WYWx1ZUlucHV0XCIpLnZhbHVlO1xuICAgIGxldCBtYXggPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNtYXhWYWx1ZUlucHV0XCIpLnZhbHVlO1xuXG4gICAgaWYgKG1pbiA8IHRoaXMuYWJzTWluVmFsdWUpIHtcbiAgICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI21pblZhbHVlSW5wdXRcIikudmFsdWUgPSB0aGlzLmFic01pblZhbHVlO1xuICAgICAgbWluID0gdGhpcy5hYnNNaW5WYWx1ZTtcbiAgICB9XG4gICAgaWYgKG1heCA+IHRoaXMuYWJzTWF4VmFsdWUpIHtcbiAgICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI21heFZhbHVlSW5wdXRcIikudmFsdWUgPSB0aGlzLmFic01heFZhbHVlO1xuICAgICAgbWF4ID0gdGhpcy5hYnNNYXhWYWx1ZTtcbiAgICB9XG4gICAgaWYgKG1pbiA+IG1heCkgbWluID0gbWF4O1xuXG4gICAgdGhpcy5taW5WYWx1ZSA9IG1pbjtcbiAgICB0aGlzLm1heFZhbHVlID0gbWF4O1xuXG4gICAgdGhpcy5fb25SYW5nZU51bGxDaGFuZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbkZpbHRlckJ1Y2tldHNVcGRhdGVcbiAgICogQGRlc2NyaXB0aW9uIGZyb20gRmlsdGVyU2VydmljZVxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IGVcbiAgICovXG4gIF9vbkZpbHRlckJ1Y2tldHNVcGRhdGUoZSkge1xuICAgIGlmKCBlLmZpbHRlciAhPT0gJ0BncmFwaC5pc1BhcnRPZi5AaWQnICkgcmV0dXJuO1xuXG4gICAgaWYoIGUuYnVja2V0cy5sZW5ndGggPT09IDEgKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkQ29sbGVjdGlvbiA9IGUuYnVja2V0c1swXS5rZXk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRDb2xsZWN0aW9uID0gJyc7XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlckZpbHRlcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblJlY29yZFNlYXJjaFVwZGF0ZVxuICAgKiBAZGVzY3JpcHRpb24gZnJvbSBSZWNvcmRJbnRlcmZhY2VcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGVcbiAgICovXG4gIF9vblJlY29yZFNlYXJjaFVwZGF0ZShlKSB7XG4gICAgaWYgKGUuc3RhdGUgIT09IFwibG9hZGVkXCIpIHJldHVybjtcblxuICAgIHRoaXMuY3VycmVudEZpbHRlcnMgPSBlLnNlYXJjaERvY3VtZW50LmZpbHRlcnMgfHwge307XG4gICAgdGhpcy5fcmVuZGVyRmlsdGVycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX3JlbmRlckZpbHRlcnNcbiAgICogQGRlc2NyaXB0aW9uIGNhbGxlZCBhZnRlciBhIGNvbGxlY3Rpb24gaXMgc2VsZWN0ZWQgb3IgYSBmaWx0ZXIgc2V0IHVwZGF0ZXMuXG4gICAqIG1ha2Ugc3VyZSByYW5nZSBmaWx0ZXIgaXMgc2V0IGNvcnJlY3RseS5cbiAgICpcbiAgICovXG4gIGFzeW5jIF9yZW5kZXJGaWx0ZXJzKCkge1xuICAgIGlmICghdGhpcy5jdXJyZW50RmlsdGVycykgcmV0dXJuO1xuXG4gICAgLy8gZ3JhYiBkZWZhdWx0IGFnZ3JlZ2F0aW9ucyBmb3IgY29sbGVjdGlvblxuICAgIGxldCByZXN1bHQ7XG4gICAgaWYoIHRoaXMuc2VsZWN0ZWRDb2xsZWN0aW9uICkge1xuICAgICAgbGV0IGZhY2V0cyA9IHRoaXMuRmlsdGVyc01vZGVsLmdldEZhY2V0cygpO1xuICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5SZWNvcmRNb2RlbC5kZWZhdWx0U2VhcmNoKHRoaXMuc2VsZWN0ZWRDb2xsZWN0aW9uLCBudWxsLCBudWxsLCBmYWNldHMpOyAgICAgICAgXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuUmVjb3JkTW9kZWwuZGVmYXVsdFNlYXJjaCgnJyk7XG4gICAgfVxuICAgIHRoaXMuZGVmYXVsdCA9IHJlc3VsdDtcblxuICAgIGxldCByYW5nZUZpbHRlciA9IHRoaXMuZGVmYXVsdD8ucGF5bG9hZD8uYWdncmVnYXRpb25zPy5yYW5nZXM/Llt0aGlzLmZpbHRlcl07XG4gICAgaWYgKHJhbmdlRmlsdGVyKSB7XG4gICAgICB0aGlzLmFic01pblZhbHVlID0gcmFuZ2VGaWx0ZXIubWluO1xuICAgICAgdGhpcy5hYnNNYXhWYWx1ZSA9IHJhbmdlRmlsdGVyLm1heDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX3Nob3coZmFsc2UpO1xuICAgIH1cblxuICAgIHRoaXMuX3Nob3codHJ1ZSk7XG5cbiAgICAvLyBtYWtlIHN1cmUgYW55IGN1cnJlbnQgdmFsdWVzIGFyZSBzZXQgY29ycmVjdGx5XG4gICAgaWYgKHRoaXMubWluVmFsdWUgPCB0aGlzLmFic01pblZhbHVlIHx8ICF0aGlzLmN1cnJlbnRGaWx0ZXJzW3RoaXMuZmlsdGVyXSkge1xuICAgICAgdGhpcy5taW5WYWx1ZSA9IHRoaXMuYWJzTWluVmFsdWU7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNtaW5WYWx1ZUlucHV0XCIpLnZhbHVlID0gdGhpcy5taW5WYWx1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMubWF4VmFsdWUgPiB0aGlzLmFic01heFZhbHVlIHx8ICF0aGlzLmN1cnJlbnRGaWx0ZXJzW3RoaXMuZmlsdGVyXSkge1xuICAgICAgdGhpcy5tYXhWYWx1ZSA9IHRoaXMuYWJzTWF4VmFsdWU7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNtYXhWYWx1ZUlucHV0XCIpLnZhbHVlID0gdGhpcy5tYXhWYWx1ZTtcbiAgICB9XG5cbiAgICAvLyBub3cgc2V0IHRoZSBjdXJyZW50IGZpbHRlcnMgZnJvbSBzZWFyY2hcbiAgICBpZiAodGhpcy5jdXJyZW50RmlsdGVyc1t0aGlzLmZpbHRlcl0pIHtcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXMuY3VycmVudEZpbHRlcnNbdGhpcy5maWx0ZXJdLnZhbHVlO1xuXG4gICAgICB0aGlzLm1pblZhbHVlID0gdmFsdWUuZ3RlO1xuICAgICAgdGhpcy5tYXhWYWx1ZSA9IHZhbHVlLmx0ZTtcbiAgICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI21pblZhbHVlSW5wdXRcIikudmFsdWUgPSB0aGlzLm1pblZhbHVlO1xuICAgICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjbWF4VmFsdWVJbnB1dFwiKS52YWx1ZSA9IHRoaXMubWF4VmFsdWU7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiN1bmtub3duXCIpLmNoZWNrZWQgPSB2YWx1ZS5pbmNsdWRlTnVsbFxuICAgICAgICA/IHRydWVcbiAgICAgICAgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyB0byB0cmlnZ2VyIHNsaWRlciByZXJlbmRlciB3aGVuIGZpbHRlcnMgYXJlIHJlbW92ZWRcbiAgICBsZXQgcmFuZ2VTbGlkZXIgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcImFwcC1yYW5nZS1zbGlkZXJcIik7XG4gICAgaWYgKHJhbmdlU2xpZGVyKSB7XG4gICAgICByYW5nZVNsaWRlci5oYXNSZW5kZXJlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuX25vdGlmeVNlbGVjdGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfaXNGaWx0ZXJBcHBsaWVkXG4gICAqIEBkZXNjcmlwdGlvbiBpcyB0aGVyZSBjdXJyZW5sdHkgYSBmaWx0ZXIgc2V0XG4gICAqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBfaXNGaWx0ZXJBcHBsaWVkKCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMubWluVmFsdWUgPT09IHRoaXMuYWJzTWluVmFsdWUgJiZcbiAgICAgIHRoaXMubWF4VmFsdWUgPT09IHRoaXMuYWJzTWF4VmFsdWUgJiZcbiAgICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI3Vua25vd25cIikuY2hlY2tlZCA9PT0gdHJ1ZVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9ub3RpZnlTZWxlY3RlZFxuICAgKiBAZGVzY3JpcHRpb24gbm90aWZ5IHBhcmVudCBvZiBzZWxlY3RlZC91bnNlbGVjdGVkIGZpbHRlclxuICAgKi9cbiAgX25vdGlmeVNlbGVjdGVkKCkge1xuICAgIGxldCBzZWxlY3RlZCA9IGZhbHNlO1xuICAgIGxldCBrZXkgPSBcIlwiO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5taW5WYWx1ZSAhPT0gdGhpcy5hYnNNaW5WYWx1ZSB8fFxuICAgICAgdGhpcy5tYXhWYWx1ZSAhPT0gdGhpcy5hYnNNYXhWYWx1ZSB8fFxuICAgICAgIXRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI3Vua25vd25cIikuY2hlY2tlZFxuICAgICkge1xuICAgICAgc2VsZWN0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAga2V5ID0gdGhpcy5taW5WYWx1ZSArIFwiIHRvIFwiICsgdGhpcy5tYXhWYWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoYHNldC1zZWxlY3RlZGAsIHtcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgc2VsZWN0ZWQsXG4gICAgICAgICAgbGFiZWw6IGtleSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9zaG93XG4gICAqIEBkZXNjcmlwdGlvbiBub3RpZnkgcGFyZW50IHRvIGhpZGUvc2hvdyBmaWx0ZXJcbiAgICpcbiAgICogQHBhcmFtIHtCb29sZWFufSBzaG93IHNob3VsZCB0aGUgcGFyZW50IGhpZGUgb3Igc2hvdyBmaWx0ZXJcbiAgICovXG4gIF9zaG93KHNob3cpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJ1cGRhdGUtdmlzaWJpbGl0eVwiLCB7XG4gICAgICAgICAgZGV0YWlsOiB7IHNob3cgfSxcbiAgICAgICAgfSlcbiAgICAgICk7ICBcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBkZXNjcmlwdGlvbiByZXNldCByYW5nZSBmaWx0ZXJcbiAgICovXG4gIHJlc2V0KCkge1xuICAgIHRoaXMubWluVmFsdWUgPSB0aGlzLmFic01pblZhbHVlO1xuICAgIHRoaXMubWF4VmFsdWUgPSB0aGlzLmFic01heFZhbHVlO1xuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI3Vua25vd25cIikuY2hlY2tlZCA9IHRydWU7XG5cbiAgICB0aGlzLl9vblJhbmdlTnVsbENoYW5nZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgb25QYXJlbnRGaWx0ZXJDbGlja2VkXG4gICAqIEBkZXNjcmlwdGlvbiBjYWxsZWQgZnJvbSBwYXJlbnQgdG9nZ2xlIHBhbmVsIHdoZW4gc2VsZWN0ZWQgZmlsdGVyXG4gICAqIGlzIGNsaWNrZWQuICBSZXNldCBzbGlkZXJcbiAgICovXG4gIG9uUGFyZW50RmlsdGVyQ2xpY2tlZCgpIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYXBwLXJhbmdlLWZpbHRlclwiLCBBcHBSYW5nZUZpbHRlcik7IiwiaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2xpdCc7XG5pbXBvcnQgeyBzaGFyZWRTdHlsZXMgfSBmcm9tICcuLi8uLi8uLi9zdHlsZXMvc2hhcmVkLXN0eWxlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHsgXG4gIHJldHVybiBodG1sYFxuXG5cbjxzdHlsZT5cbiAgJHtzaGFyZWRTdHlsZXN9XG4gIDpob3N0IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuXG4gIFtoaWRkZW5dIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9XG4gIFxuICAubGFiZWxzIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIG1hcmdpbjogMCAyM3B4IDAgMTNweDtcbiAgICBjb2xvcjogdmFyKC0tZ3JheS10ZXh0KTtcbiAgICBmb250LXNpemU6IHZhcigtLWZzLXNtKTtcbiAgfVxuXG4gIC5pbnB1dHMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgfVxuXG4gIGlucHV0W3R5cGU9XCJudW1iZXJcIl0ge1xuICAgIGJvcmRlcjogMDtcbiAgICB3aWR0aDogMy4zcmVtO1xuICAgIGhlaWdodDogNjFweDtcbiAgICBwYWRkaW5nOiAwIDFyZW07XG4gICAgbWFyZ2luOiAwO1xuICAgIGZvbnQtc2l6ZTogdmFyKC0tZnMtc20pO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtMzApO1xuICB9XG5cbiAgLnVua25vd24ge1xuICAgIG1hcmdpbi1sZWZ0OiA5cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgICBwYWRkaW5nLWxlZnQ6IDVweDtcbiAgfVxuXG4gIGFwcC1yYW5nZS1zbGlkZXIge1xuICAgIC0tbGlnaHQtYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWVkaXVtLWJhY2tncm91bmQtY29sb3IpO1xuICB9XG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPVwiaW5wdXRzXCI+XG4gIDxpbnB1dCBpZD1cIm1pblZhbHVlSW5wdXRcIiB0eXBlPVwibnVtYmVyXCIgQGNoYW5nZT1cIiR7dGhpcy5fb25JbnB1dENoYW5nZX1cIj5cbiAgPHNwYW4+IC0gPC9zcGFuPlxuICA8aW5wdXQgaWQ9XCJtYXhWYWx1ZUlucHV0XCIgdHlwZT1cIm51bWJlclwiIEBjaGFuZ2U9XCIke3RoaXMuX29uSW5wdXRDaGFuZ2V9XCI+XG48L2Rpdj5cblxuPGRpdiBzdHlsZT1cIm1hcmdpbi1yaWdodDogMTBweFwiPlxuICA8YXBwLXJhbmdlLXNsaWRlclxuICAgIGlkPVwic2xpZGVyXCJcbiAgICBAcmFuZ2UtdmFsdWUtY2hhbmdlPVwiJHt0aGlzLl9vblJhbmdlU2xpZGVyQ2hhbmdlfVwiXG4gICAgYWJzLW1pbi12YWx1ZT1cIiR7dGhpcy5hYnNNaW5WYWx1ZX1cIlxuICAgIGFicy1tYXgtdmFsdWU9XCIke3RoaXMuYWJzTWF4VmFsdWV9XCJcbiAgICBtaW4tdmFsdWU9XCIke3RoaXMubWluVmFsdWV9XCJcbiAgICBtYXgtdmFsdWU9XCIke3RoaXMubWF4VmFsdWV9XCI+XG4gIDwvYXBwLXJhbmdlLXNsaWRlcj5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwibGFiZWxzXCI+XG4gIDxkaXYgc3R5bGU9XCJmbGV4OjFcIj4ke3RoaXMuYWJzTWluVmFsdWV9PC9kaXY+XG4gIDxkaXY+JHt0aGlzLmFic01heFZhbHVlfTwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJ1bmtub3duXCIgP2hpZGRlbj1cIiR7dGhpcy5zaG93VW5rbm93bn1cIj5cbiAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwidW5rbm93blwiIEBjbGljaz1cIiR7dGhpcy5fb25SYW5nZU51bGxDaGFuZ2V9XCIgY2hlY2tlZCAvPlxuICA8bGFiZWwgZm9yPVwidW5rbm93blwiPmluY2x1ZGUgdW5rbm93biAvIHVuc3BlY2lmaWVkPC9sYWJlbD5cbjwvZGl2PlxuYDt9IiwiaW1wb3J0IHsgTGl0RWxlbWVudCB9IGZyb20gXCJsaXRcIjtcblxuLy8gaW1wb3J0IEFwcFNlYXJjaFJlc3VsdCBmcm9tIFwiLi9hcHAtc2VhcmNoLXJlc3VsdFwiXG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2FwcC1zZWFyY2gtZ3JpZC1yZXN1bHQudHBsLmpzXCI7XG5cbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbi8qKlxuICogQGNsYXNzIEFwcFNlYXJjaEdyaWRSZXN1bHRcbiAqIEBkZXNjcmlwdGlvbiBVSSBjb21wb25lbnQgY2xhc3MgZm9yIGRpc3BsYXlpbmcgYSBpdGVtIHByZXZpZXcgY2FyZFxuICpcbiAqIEBwcm9wIHtTdHJpbmd9IGlkIC0gSXRlbSBpZFxuICogSWYgdXNlZCwgZWxlbWVudCB3aWxsIHF1ZXJ5IHRoZSBSZWNvcmRNb2RlbCBmb3IgdGhlIGl0ZW0gZGF0YS5cbiAqIEBwcm9wIHtPYmplY3R9IGRhdGEgLSBEYXRhIG9iamVjdCBjb250YWluaW5nIGl0ZW0gaW5mb3JtYXRpb25cbiAqIEBwcm9wIHtTdHJpbmd9IGl0ZW1VcmwgLSBVcmwgdG8gaXRlbVxuICogQHByb3Age1N0cmluZ30gdGh1bWJuYWlsVXJsIC0gVGh1bWJuYWlsIHVybFxuICogQHByb3Age1N0cmluZ30gdGl0bGUgLSBJdGVtIHRpdGxlXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBTZWFyY2hHcmlkUmVzdWx0IGV4dGVuZHMgTWl4aW4oTGl0RWxlbWVudCkud2l0aChMaXRDb3JrVXRpbHMpIHtcbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogeyB0eXBlOiBTdHJpbmcsIGF0dHJpYnV0ZTogXCJkYXRhLWl0ZW1pZFwiIH0sXG4gICAgICBkYXRhOiB7IHR5cGU6IE9iamVjdCB9LFxuICAgICAgaXRlbVVybDogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIHRodW1ibmFpbFVybDogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIHRpdGxlOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgYm91bmRzOiB7IHR5cGU6IEFycmF5IH0sXG4gICAgICBzaXplOiB7IHR5cGU6IE9iamVjdCB9LFxuICAgICAgaW1hZ2VIZWlnaHQ6IHsgdHlwZTogTnVtYmVyIH0sXG4gICAgICBtZWRpYVR5cGVzOiB7IHR5cGU6IEFycmF5IH1cbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuaWQgPSBcIlwiO1xuICAgIHRoaXMuZGF0YSA9IHt9O1xuICAgIHRoaXMudGl0bGUgPSBcIlwiO1xuICAgIHRoaXMuaXRlbVVybCA9IFwiXCI7XG4gICAgdGhpcy50aHVtYm5haWxVcmwgPSBcIlwiO1xuICAgIHRoaXMuYm91bmRzID0gW107XG4gICAgdGhpcy5zaXplID0ge307XG4gICAgdGhpcy5pbWFnZUhlaWdodCA9IDA7XG4gICAgdGhpcy5tZWRpYVR5cGVzID0gW107XG5cbiAgICB0aGlzLl9pbmplY3RNb2RlbChcIlJlY29yZE1vZGVsXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZmlyc3RVcGRhdGVkXG4gICAqIEBkZXNjcmlwdGlvbiBMaXQgbGlmZWN5Y2xlIG1ldGhvZCBjYWxsZWQgd2hlbiBlbGVtZW50IGlzIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSB7TWFwfSBwcm9wcyAtIFByb3BlcnRpZXMgdGhhdCBoYXZlIGNoYW5nZWQuXG4gICAqL1xuICBmaXJzdFVwZGF0ZWQocHJvcHMpIHtcbiAgICBpZiAodGhpcy5kYXRhLmlkKSB7XG4gICAgICB0aGlzLnRpdGxlID0gdGhpcy5kYXRhLnRpdGxlO1xuICAgICAgdGhpcy5pdGVtVXJsID0gdGhpcy5kYXRhLmlkO1xuICAgICAgdGhpcy50aHVtYm5haWxVcmwgPSB0aGlzLmRhdGEudGh1bWJuYWlsVXJsIHx8ICcvaW1hZ2VzL3RyZWUtYmlrZS1pbGx1c3RyYXRpb24ucG5nJztcbiAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuZGF0YS5zaXplO1xuXG4gICAgICBpZiAodGhpcy50aHVtYm5haWxVcmwpIHRoaXMuX3JlbmRlckltYWdlKCk7XG4gICAgICBpZiAodGhpcy5kYXRhLm1lZGlhVHlwZXM/LmluY2x1ZGVzKFwiSW1hZ2VcIikpIHtcbiAgICAgICAgdGhpcy5tZWRpYVR5cGVzLnB1c2goXCJpbWFnZVwiKTtcbiAgICAgIH0gXG4gICAgICBpZiAodGhpcy5kYXRhLm1lZGlhVHlwZXM/LmluY2x1ZGVzKFwiVmlkZW9cIikpIHtcbiAgICAgICAgdGhpcy5tZWRpYVR5cGVzLnB1c2goXCJ2aWRlb1wiKTtcbiAgICAgIH0gXG4gICAgICBpZiAodGhpcy5kYXRhLm1lZGlhVHlwZXM/LmluY2x1ZGVzKFwiQXVkaW9cIikpIHtcbiAgICAgICAgdGhpcy5tZWRpYVR5cGVzLnB1c2goXCJhdWRpb1wiKTtcbiAgICAgIH1cbiAgICAgIGlmKCB0aGlzLmRhdGEubXVsdGlJbWFnZSApIHtcbiAgICAgICAgdGhpcy5tZWRpYVR5cGVzLnB1c2goXCJpbWFnZUxpc3RcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2dldEl0ZW0odGhpcy5pZCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgX29uUmVjb3JkVXBkYXRlKGUpIHtcbiAgICBpZiAoZS5zdGF0ZSAhPT0gXCJsb2FkZWRcIiB8fCBlLmlkICE9PSB0aGlzLmlkKSByZXR1cm47XG5cbiAgICB0aGlzLnJlY29yZCA9IGUudmNEYXRhO1xuICAgIGlmKCB0aGlzLnJlY29yZC5pbWFnZXMgKSB7XG4gICAgICBsZXQgaW1hZ2VzID0gdGhpcy5yZWNvcmQuaW1hZ2VzO1xuICAgICAgdGhpcy50aHVtYm5haWxVcmwgPSBpbWFnZXMubWVkaXVtID8gaW1hZ2VzLm1lZGl1bS51cmwgOiBpbWFnZXMub3JpZ2luYWwudXJsO1xuICAgIH1cbiAgICB0aGlzLnRpdGxlID0gdGhpcy5yZWNvcmQubmFtZTtcbiAgICB0aGlzLml0ZW1VcmwgPSB0aGlzLnJlY29yZFsnQGlkJ107XG4gICAgdGhpcy5pZCA9IHRoaXMucmVjb3JkWydAaWQnXTtcbiAgICB0aGlzLl9yZW5kZXJJbWFnZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX2xvYWRJbWFnZVxuICAgKiBAZGVzY3JpcHRpb24gcHJlbG9hZCBpbWFnZSBhbmQgc2V0IGJvdW5kcyB0byBpbWFnZSBkaW1lbnNpb25zXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgdXJsIG9mIGltYWdlIHRvIGxvYWRcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IHJlc29sdmVzIHdoZW4gaW1hZ2UgaXMgbG9hZGVkIGFuZCBib3VuZHMgYXJyYXkgaGFzIGJlZW4gc2V0XG4gICAqL1xuICBfbG9hZEltYWdlKHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGxldCByZXMgPSBbaW1nLm5hdHVyYWxIZWlnaHQsIGltZy5uYXR1cmFsV2lkdGhdO1xuICAgICAgICB0aGlzLmJvdW5kcyA9IFtbMCwgMF0sIHJlc107XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH07XG5cbiAgICAgIGltZy5zcmMgPSB1cmw7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfZ2V0SXRlbVxuICAgKiBAZGVzY3JpcHRpb24gRmV0Y2hlcyBpdGVtIGRhdGEgZnJvbSBSZWNvcmRNb2RlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgLSBJdGVtIGlkIHRvIGZldGNoXG4gICAqL1xuICBhc3luYyBfZ2V0SXRlbShpZCkge1xuICAgIHRoaXMuX29uUmVjb3JkVXBkYXRlKGF3YWl0IHRoaXMuUmVjb3JkTW9kZWwuZ2V0KGlkKSk7XG4gIH1cblxuICBhc3luYyBfcmVuZGVySW1hZ2UoKSB7XG4gICAgaWYoICF0aGlzLnNpemUud2lkdGggfHwgIXRoaXMuc2l6ZS5oZWlnaHQgKSB7XG4gICAgICBhd2FpdCB0aGlzLl9sb2FkSW1hZ2UodGhpcy50aHVtYm5haWxVcmwpO1xuICAgIH1cblxuICAgIHRoaXMuX2NhbGNJbWFnZUhlaWdodCgpO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJyZW5kZXJlZFwiLCB7IGRldGFpbDogdGhpcyB9KSk7XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgbGV0IGltZyA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI2ltZ1wiKTtcbiAgICAgIGlmIChpbWcuY29tcGxldGUpIHtcbiAgICAgICAgaW1nLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgIGltZy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgX2NhbGNJbWFnZUhlaWdodCgpIHtcbiAgICBsZXQgaW1nID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjaW1nXCIpO1xuICAgIGxldCB3aWR0aCA9IDEwMDtcbiAgICBpZiggaW1nICkge1xuICAgICAgaW1nLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICB3aWR0aCA9IGltZy53aWR0aDtcbiAgICAgIGltZy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7ICBcbiAgICB9XG5cbiAgICBsZXQgaW1hZ2VIZWlnaHQgPSB0aGlzLnNpemUuaGVpZ2h0IHx8IHRoaXMuYm91bmRzPy5bMV0/LlswXSB8fCAxMDA7XG4gICAgbGV0IGltYWdlV2lkdGggPSB0aGlzLnNpemUud2lkdGggfHwgdGhpcy5ib3VuZHM/LlsxXT8uWzFdIHx8IDEwMDtcbiAgICBsZXQgcmF0aW8gPSBpbWFnZUhlaWdodCAvIGltYWdlV2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHdpZHRoICogcmF0aW87XG4gICAgdGhpcy5pbWFnZUhlaWdodCA9IGhlaWdodDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJhcHAtc2VhcmNoLWdyaWQtcmVzdWx0XCIsIEFwcFNlYXJjaEdyaWRSZXN1bHQpO1xuIiwiaW1wb3J0IHsgaHRtbCB9IGZyb20gXCJsaXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyKCkge1xuICByZXR1cm4gaHRtbGBcbiAgICA8c3R5bGUgaW5jbHVkZT1cInNoYXJlZC1zdHlsZXNcIj5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1ncmlkLWNlbGwtd2lkdGgpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgIH1cblxuICAgICAgW2hpZGRlbl0ge1xuICAgICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2hvdy1pbWcge1xuICAgICAgICBmcm9tIHtcbiAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICB9XG4gICAgICAgIHRvIHtcbiAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGltZyB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIH1cblxuICAgICAgaW1nOmhvdmVyLFxuICAgICAgaW1nOmZvY3VzIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1kZWZhdWx0LXNlY29uZGFyeS1jb2xvcik7XG4gICAgICB9XG5cbiAgICAgIC5jb2xsZWN0aW9uLW5hbWUge1xuICAgICAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS03MCk7XG4gICAgICAgIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgICAgIH1cblxuICAgICAgLnllYXIge1xuICAgICAgICBjb2xvcjogdmFyKC0tZ3JheS10ZXh0KTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IHZhcigtLWZ3LWxpZ2h0KTtcbiAgICAgICAgZmxleDogMTtcbiAgICAgIH1cblxuICAgICAgLmZvb3RlciB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgICB9XG5cbiAgICAgIGg0IHtcbiAgICAgICAgbWFyZ2luOiA1cHggMDtcbiAgICAgICAgY29sb3I6IHZhcigtLWRlZmF1bHQtcHJpbWFyeS1jb2xvcik7XG4gICAgICB9XG5cbiAgICAgIGlyb24taWNvbiB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1kZWZhdWx0LXByaW1hcnktY29sb3IpO1xuICAgICAgfVxuXG4gICAgICAuaW1hZ2Uge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICAgICAgICAvKiBtYXgtd2lkdGg6IDM4M3B4OyAqL1xuICAgICAgfVxuXG4gICAgICAuY2FyZC10ZXh0IHtcbiAgICAgICAgcGFkZGluZzogMTVweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuMztcbiAgICAgIH1cblxuICAgICAgLnZpZGVvLXRodW1ibmFpbCB7XG4gICAgICAgIHotaW5kZXg6IDEwMDA7XG4gICAgICAgIHdpZHRoOiAzMHB4O1xuICAgICAgICBoZWlnaHQ6IDMwcHg7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiaHR0cHM6Ly92aWEucGxhY2Vob2xkZXIuY29tLzI1XCIpO1xuICAgICAgfVxuXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICAgICAgLmltYWdlIHtcbiAgICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgIH1cbiAgICAgICAgLmNhcmQtdGV4dCB7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC5tZWRpYS10eXBlcyB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgcmlnaHQ6IDAuMjVyZW07XG4gICAgICAgIGJvdHRvbTogMC43NXJlbTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIH1cblxuICAgICAgLm1lZGlhLXR5cGUge1xuICAgICAgICB3aWR0aDogMnJlbTtcbiAgICAgICAgaGVpZ2h0OiAycmVtO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luOiAwLjVyZW0gMC41cmVtIDAgMDtcbiAgICAgIH1cblxuICAgICAgdWNkbGliLWljb24ge1xuICAgICAgICB3aWR0aDogMS4ycmVtO1xuICAgICAgICBoZWlnaHQ6IDEuMnJlbTtcbiAgICAgICAgZmlsbDogd2hpdGU7XG4gICAgICB9XG4gICAgPC9zdHlsZT5cblxuICAgIDxkaXYgY2xhc3M9XCJpbWFnZVwiIGlkPVwiaW1nUm9vdFwiIHN0eWxlPVwiaGVpZ2h0OiAke3RoaXMuaW1hZ2VIZWlnaHR9cHg7XCI+XG4gICAgICA8aW1nXG4gICAgICAgIGlkPVwiaW1nXCJcbiAgICAgICAgYWx0PVwiJHt0aGlzLnRpdGxlfVwiXG4gICAgICAgIHNyYz1cIiR7dGhpcy50aHVtYm5haWxVcmx9XCJcbiAgICAgICAgc3R5bGU9XCJoZWlnaHQ6ICR7dGhpcy5pbWFnZUhlaWdodH1weDsgd2lkdGg6IDEwMCU7IGRpc3BsYXk6IG5vbmU7XCJcbiAgICAgICAgb25sb2FkPVwidGhpcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcIlxuICAgICAgICAvPlxuICAgICAgPGRpdiA/aGlkZGVuPVwiJHshdGhpcy5pc1ZpZGVvfVwiIGNsYXNzPVwidmlkZW8tdGh1bWJuYWlsXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibWVkaWEtdHlwZXNcIj4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWVkaWEtdHlwZVwiXG4gICAgICAgICAgP2hpZGRlbj1cIiR7IXRoaXMubWVkaWFUeXBlcy5pbmNsdWRlcygndmlkZW8nKX1cIj5cbiAgICAgICAgICA8dWNkbGliLWljb25cbiAgICAgICAgICAgIGNsYXNzPVwidmVydGljYWwtbGlua19faW1hZ2VcIlxuICAgICAgICAgICAgaWNvbj1cInVjZGxpYi1kYW1zOmZhLXBsYXlcIj5cbiAgICAgICAgICA8L3VjZGxpYi1pY29uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lZGlhLXR5cGVcIlxuICAgICAgICAgID9oaWRkZW49XCIkeyF0aGlzLm1lZGlhVHlwZXMuaW5jbHVkZXMoJ2F1ZGlvJyl9XCI+XG4gICAgICAgICAgPHVjZGxpYi1pY29uXG4gICAgICAgICAgICBjbGFzcz1cInZlcnRpY2FsLWxpbmtfX2ltYWdlXCJcbiAgICAgICAgICAgIGljb249XCJ1Y2RsaWItZGFtczpmYS12b2x1bWUtaGlnaFwiPlxuICAgICAgICAgIDwvdWNkbGliLWljb24+XG4gICAgICAgIDwvZGl2PiAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWVkaWEtdHlwZVwiXG4gICAgICAgICAgP2hpZGRlbj1cIiR7IXRoaXMubWVkaWFUeXBlcy5pbmNsdWRlcygnaW1hZ2VMaXN0Jyl9XCI+XG4gICAgICAgICAgPHVjZGxpYi1pY29uXG4gICAgICAgICAgICBjbGFzcz1cInZlcnRpY2FsLWxpbmtfX2ltYWdlXCJcbiAgICAgICAgICAgIGljb249XCJ1Y2RsaWItZGFtczppdGVtLXN0YWNrLWJsYW5rXCI+XG4gICAgICAgICAgPC91Y2RsaWItaWNvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJjYXJkLXRleHRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2xsZWN0aW9uLW5hbWVcIj4ke3RoaXMudGl0bGV9PC9kaXY+XG4gICAgPC9kaXY+XG4gIGA7XG59XG4iLCJpbXBvcnQgeyBMaXRFbGVtZW50IH0gZnJvbSBcImxpdFwiO1xuXG4vLyBpbXBvcnQgQXBwU2VhcmNoUmVzdWx0IGZyb20gXCIuL2FwcC1zZWFyY2gtcmVzdWx0XCI7XG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2FwcC1zZWFyY2gtbGlzdC1yZXN1bHQudHBsLmpzXCI7XG5cbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbi8qKlxuICogQGNsYXNzIEFwcFNlYXJjaExpc3RSZXN1bHRcbiAqIEBkZXNjcmlwdGlvbiBVSSBjb21wb25lbnQgY2xhc3MgZm9yIGRpc3BsYXlpbmcgYSBpdGVtIHByZXZpZXcgY2FyZFxuICpcbiAqIEBwcm9wIHtTdHJpbmd9IGlkIC0gSXRlbSBpZFxuICogSWYgdXNlZCwgZWxlbWVudCB3aWxsIHF1ZXJ5IHRoZSBSZWNvcmRNb2RlbCBmb3IgdGhlIGl0ZW0gZGF0YS5cbiAqIEBwcm9wIHtPYmplY3R9IGRhdGEgLSBEYXRhIG9iamVjdCBjb250YWluaW5nIGl0ZW0gaW5mb3JtYXRpb25cbiAqIEBwcm9wIHtTdHJpbmd9IGl0ZW1VcmwgLSBVcmwgdG8gaXRlbVxuICogQHByb3Age1N0cmluZ30gdGh1bWJuYWlsVXJsIC0gVGh1bWJuYWlsIHVybFxuICogQHByb3Age1N0cmluZ30gdGl0bGUgLSBUaXRsZVxuICogQHByb3Age1N0cmluZ30gZGF0ZSAtIERhdGUgb2YgZGlnaXRpemF0aW9uXG4gKiBAcHJvcCB7U3RyaW5nfSBjb2xsZWN0aW9uIC0gQ29sbGVjdGlvbiBpdGVtIGJlbG9uZ3MgdG9cbiAqIEBwcm9wIHtTdHJpbmd9IGZvcm1hdCAtIEl0ZW0gZm9ybWF0XG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBTZWFyY2hMaXN0UmVzdWx0IGV4dGVuZHMgTWl4aW4oTGl0RWxlbWVudCkud2l0aChMaXRDb3JrVXRpbHMpIHtcbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogeyB0eXBlOiBTdHJpbmcsIGF0dHJpYnV0ZTogXCJkYXRhLWl0ZW1pZFwiIH0sXG4gICAgICBkYXRhOiB7IHR5cGU6IE9iamVjdCB9LFxuICAgICAgaXRlbVVybDogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIHRodW1ibmFpbFVybDogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIHRpdGxlOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgZGF0ZTogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIGNvbGxlY3Rpb246IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICBmb3JtYXQ6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICBjcmVhdG9yOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5pZCA9IFwiXCI7XG4gICAgdGhpcy5kYXRhID0ge307XG4gICAgdGhpcy5pdGVtVXJsID0gXCJcIjtcbiAgICB0aGlzLnRodW1ibmFpbFVybCA9IFwiXCI7XG4gICAgdGhpcy50aXRsZSA9IFwiXCI7XG4gICAgdGhpcy5kYXRlID0gXCJcIjtcbiAgICB0aGlzLmNvbGxlY3Rpb24gPSBcIlwiO1xuICAgIHRoaXMuZm9ybWF0ID0gXCJcIjtcbiAgICB0aGlzLmNyZWF0b3IgPSBcIlwiO1xuXG4gICAgdGhpcy5faW5qZWN0TW9kZWwoXCJSZWNvcmRNb2RlbFwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHdpbGxVcGRhdGVcbiAgICogQGRlc2NyaXB0aW9uIExpdCBsaWZlY3ljbGUgbWV0aG9kIGNhbGxlZCB3aGVuIGVsZW1lbnQgaXMgdXBkYXRlZC5cbiAgICogQHBhcmFtIHtNYXB9IHByb3BzIC0gUHJvcGVydGllcyB0aGF0IGhhdmUgY2hhbmdlZC5cbiAgICovXG4gIHdpbGxVcGRhdGUocHJvcHMpIHtcbiAgICBpZiAodGhpcy5kYXRhLmlkKSB7XG4gICAgICBsZXQgY29sbGVjdGlvbk5hbWUgPSBBUFBfQ09ORklHLmNvbGxlY3Rpb25MYWJlbHNbdGhpcy5kYXRhLmNvbGxlY3Rpb25JZD8uWydAaWQnXV0gfHwgJyc7XG4gICAgICB0aGlzLml0ZW1VcmwgPSB0aGlzLmRhdGEuaWQ7XG4gICAgICB0aGlzLnRodW1ibmFpbFVybCA9IHRoaXMuZGF0YS50aHVtYm5haWxVcmwgfHwgJy9pbWFnZXMvdHJlZS1iaWtlLWlsbHVzdHJhdGlvbi5wbmcnO1xuICAgICAgdGhpcy50aXRsZSA9IHRoaXMuZGF0YS50aXRsZTtcbiAgICAgIHRoaXMuZGF0ZSA9IHRoaXMuZGF0YS5kYXRlO1xuICAgICAgdGhpcy5jb2xsZWN0aW9uID0gY29sbGVjdGlvbk5hbWU7XG4gICAgICB0aGlzLmZvcm1hdCA9IHRoaXMuZGF0YS5mb3JtYXQ7XG4gICAgICB0aGlzLmNyZWF0b3IgPSB0aGlzLmRhdGEuY3JlYXRvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZ2V0SXRlbSh0aGlzLmlkKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBfb25SZWNvcmRVcGRhdGUoZSkge1xuICAgIGlmIChlLnN0YXRlICE9PSBcImxvYWRlZFwiIHx8IGUuaWQgIT09IHRoaXMuaWQpIHJldHVybjtcblxuICAgIHRoaXMucmVjb3JkID0gZS52Y0RhdGE7XG4gICAgaWYoIHRoaXMucmVjb3JkLmltYWdlcyApIHtcbiAgICAgIGxldCBpbWFnZXMgPSB0aGlzLnJlY29yZC5pbWFnZXM7XG4gICAgICB0aGlzLnRodW1ibmFpbFVybCA9IGltYWdlcy5tZWRpdW0gPyBpbWFnZXMubWVkaXVtLnVybCA6IGltYWdlcy5vcmlnaW5hbC51cmw7XG4gICAgfVxuICAgIHRoaXMudGl0bGUgPSB0aGlzLnJlY29yZC5uYW1lO1xuICAgIHRoaXMuaXRlbVVybCA9IHRoaXMucmVjb3JkWydAaWQnXTtcbiAgICB0aGlzLmlkID0gdGhpcy5yZWNvcmRbJ0BpZCddO1xuXG4gICAgLy8gVE9ETyBwb3B1bGF0ZVxuICAgIC8vIHRoaXMuZGF0ZSA9IHJlcy5kYXRlO1xuICAgIC8vIHRoaXMuY29sbGVjdGlvbiA9IHJlcy5jb2xsZWN0aW9uO1xuICAgIC8vIHRoaXMuZm9ybWF0ID0gcmVzLmZvcm1hdDtcbiAgICBcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9nZXRJdGVtXG4gICAqIEBkZXNjcmlwdGlvbiBGZXRjaGVzIGl0ZW0gZGF0YSBmcm9tIFJlY29yZE1vZGVsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZCAtIEl0ZW0gaWQgdG8gZmV0Y2hcbiAgICovXG4gIGFzeW5jIF9nZXRJdGVtKGlkKSB7XG4gICAgdGhpcy5fb25SZWNvcmRVcGRhdGUoYXdhaXQgdGhpcy5SZWNvcmRNb2RlbC5nZXQoaWQpKTtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJhcHAtc2VhcmNoLWxpc3QtcmVzdWx0XCIsIEFwcFNlYXJjaExpc3RSZXN1bHQpO1xuIiwiaW1wb3J0IHsgaHRtbCB9IGZyb20gXCJsaXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyKCkge1xuICByZXR1cm4gaHRtbGBcbiAgICA8c3R5bGUgaW5jbHVkZT1cInNoYXJlZC1zdHlsZXNcIj5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgICAgICBtYXJnaW46IDJyZW0gMTBweDtcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlLWluLW91dDtcbiAgICAgIH1cblxuICAgICAgOmhvc3QoOmhvdmVyKSxcbiAgICAgIDpob3N0KDpmb2N1cykge1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIC8qYm9yZGVyOiAycHggc29saWQgdmFyKC0tZGVmYXVsdC1zZWNvbmRhcnktY29sb3IpOyovXG4gICAgICAgIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtZ29sZC0zMCk7XG4gICAgICB9XG5cbiAgICAgIC5pbWcge1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICBoZWlnaHQ6IDI1MHB4O1xuICAgICAgICB3aWR0aDogdmFyKC0tZ3JpZC1jZWxsLXdpZHRoKTtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgICAgICB3aWR0aDogMzMlO1xuICAgICAgICAvKiBmbGV4OiAzMyU7ICAgICAgICAgKi9cbiAgICAgIH1cblxuICAgICAgLmNvbGxlY3Rpb24tdGl0bGUge1xuICAgICAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS04MCk7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICBib3JkZXItYm90dG9tOiA2cHggZG90dGVkIHZhcigtLWNvbG9yLWRhbXMtc2Vjb25kYXJ5KTtcbiAgICAgICAgcGFkZGluZzogMC41cmVtIDA7XG4gICAgICB9XG5cbiAgICAgIC55ZWFyIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWdyYXktdGV4dCk7XG4gICAgICAgIGZsZXg6IDE7XG4gICAgICB9XG5cbiAgICAgIC5mb290ZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgICAgfVxuXG4gICAgICAubGF5b3V0IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgcGFkZGluZzogMXJlbTtcbiAgICAgIH1cblxuICAgICAgaDQge1xuICAgICAgICBtYXJnaW46IDEwcHggMDtcbiAgICAgICAgY29sb3I6IHZhcigtLWRlZmF1bHQtcHJpbWFyeS1jb2xvcik7XG4gICAgICB9XG5cbiAgICAgIGlyb24taWNvbiB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1kZWZhdWx0LXByaW1hcnktY29sb3IpO1xuICAgICAgfVxuXG4gICAgICAuZmxleC12ZXJ0aWNhbCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgLmRhdGEge1xuICAgICAgICBwYWRkaW5nOiAwIDAgMCAyLjVyZW07XG4gICAgICAgIGZsZXg6IDI7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB9XG5cbiAgICAgIC5jb2xsZWN0aW9uLWRldGFpbHMge1xuICAgICAgICBwYWRkaW5nLXRvcDogMXJlbTtcbiAgICAgIH1cblxuICAgICAgLmNvbGxlY3Rpb24tZGV0YWlscyAubGFiZWwge1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMC4zcmVtO1xuICAgICAgfVxuXG4gICAgICAuY29sbGVjdGlvbi1kZXRhaWxzIHAge1xuICAgICAgICBtYXJnaW46IDAuMnJlbSAwO1xuICAgICAgfVxuXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcbiAgICAgICAgLmltZyB7XG4gICAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICAgIHdpZHRoOiAxNTBweDtcbiAgICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBpbml0aWFsO1xuICAgICAgICB9XG5cbiAgICAgICAgLmRhdGEge1xuICAgICAgICAgIHBhZGRpbmc6IDAgMCAwIDEuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICBtYXJnaW46IDEwcHggMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIDwvc3R5bGU+XG5cbiAgICA8ZGl2IGNsYXNzPVwibGF5b3V0XCI+XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCcke3RoaXMudGh1bWJuYWlsVXJsfScpXCJcbiAgICAgICAgY2xhc3M9XCJpbWdcIlxuICAgICAgICBhcmlhLWxhYmVsPVwiJHt0aGlzLnRpdGxlfVwiXG4gICAgICA+PC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJkYXRhXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LXZlcnRpY2FsXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbGxlY3Rpb24tdGl0bGVcIj4ke3RoaXMudGl0bGV9PC9kaXY+XG5cbiAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj48L2Rpdj4gLS0+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sbGVjdGlvbi1kZXRhaWxzXCI+XG4gICAgICAgICAgICA8cD48c3BhbiBjbGFzcz1cImxhYmVsXCI+Q29sbGVjdGlvbjo8L3NwYW4+ICR7dGhpcy5jb2xsZWN0aW9ufTwvcD5cbiAgICAgICAgICAgIDxwID9oaWRkZW49XCIkeyF0aGlzLmNyZWF0b3J9XCI+PHNwYW4gY2xhc3M9XCJsYWJlbFwiPkNyZWF0b3I6PC9zcGFuPiAke3RoaXMuY3JlYXRvcn08L3A+XG4gICAgICAgICAgICA8cCA/aGlkZGVuPVwiJHshdGhpcy5kYXRlfVwiPjxzcGFuIGNsYXNzPVwibGFiZWxcIj5EYXRlOjwvc3Bhbj4gJHt0aGlzLmRhdGV9PC9wPlxuICAgICAgICAgICAgPHAgP2hpZGRlbj1cIiR7IXRoaXMuZm9ybWF0fVwiPjxzcGFuIGNsYXNzPVwibGFiZWxcIj5Gb3JtYXQ6PC9zcGFuPiAke3RoaXMuZm9ybWF0fTwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYDtcbn1cbiIsImltcG9ydCB7IExpdEVsZW1lbnQgfSBmcm9tICdsaXQnO1xuXG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2FwcC1zZWFyY2gtcmVzdWx0cy1jb2xsZWN0aW9ucy50cGwuanNcIjtcblxuaW1wb3J0IHsgTWl4aW4sIExpdENvcmtVdGlscyB9IGZyb20gJ0B1Y2QtbGliL2NvcmstYXBwLXV0aWxzJztcblxuaW1wb3J0IFwiLi4vLi4vLi4vY29tcG9uZW50cy9jYXJkcy9kYW1zLWNvbGxlY3Rpb24tY2FyZFwiO1xuaW1wb3J0IFwiQHVjZC1saWIvdGhlbWUtZWxlbWVudHMvdWNkbGliL3VjZGxpYi1pY29uL3VjZGxpYi1pY29uXCI7XG5pbXBvcnQgJy4uLy4uLy4uL3V0aWxzL2FwcC1pY29ucyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vLi4vLi4vLi4vbGliL3V0aWxzL2luZGV4LmpzJztcblxuY2xhc3MgQXBwU2VhcmNoUmVzdWx0c0NvbGxlY3Rpb25zIGV4dGVuZHMgTWl4aW4oTGl0RWxlbWVudClcbiAgICAgIC53aXRoKExpdENvcmtVdGlscykge1xuXG4gIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdWx0cyA6IHsgdHlwZSA6IEFycmF5IH0sXG4gICAgICByZXN1bHRzRGlzcGxheWVkIDogeyB0eXBlIDogQXJyYXkgfSwgLy8gZmlsdGVyZWQgcmVzdWx0c1xuICAgICAgc2hvd1Jlc3VsdHMgOiB7IHR5cGUgOiBCb29sZWFuIH0sXG4gICAgICBjdXJyZW50UGFnZSA6IHsgdHlwZSA6IE51bWJlciB9LFxuICAgICAgcGFnaW5hdGlvblRvdGFsIDogeyB0eXBlIDogTnVtYmVyIH1cbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5yZXN1bHRzRGlzcGxheWVkID0gW107XG4gICAgdGhpcy5yZXN1bHRzID0gW107XG4gICAgdGhpcy5zaG93UmVzdWx0cyA9IGZhbHNlO1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSAxO1xuICAgIHRoaXMucGFnaW5hdGlvblRvdGFsID0gMTtcbiAgICB0aGlzLnJlc3VsdHNQZXJQYWdlID0gNjtcblxuICAgIHRoaXMuX2luamVjdE1vZGVsKCdBcHBTdGF0ZU1vZGVsJywgJ0ZpbHRlcnNNb2RlbCcsICdTZWFyY2hWY01vZGVsJywgJ0NvbGxlY3Rpb25Nb2RlbCcsICdSZWNvcmRNb2RlbCcpO1xuICB9XG5cbiAgYXN5bmMgX29uQXBwU3RhdGVVcGRhdGUoZSkge1xuICAgIGlmKCBlLmxvY2F0aW9uLnBhZ2UgIT09ICdzZWFyY2gnICkgcmV0dXJuO1xuICAgIHRoaXMucmVzdWx0cyA9IFtdO1xuXG4gICAgdGhpcy5maWx0ZXJEaXNwbGF5UmVzdWx0cygpO1xuICAgIHRoaXMuX3VwZGF0ZVJlc3VsdHNEaXNwbGF5ZWQoKTtcblxuICAgIHRoaXMuX29uQ29sbGVjdGlvblNlYXJjaFVwZGF0ZShhd2FpdCB0aGlzLkNvbGxlY3Rpb25Nb2RlbC5zZWFyY2goeyB0ZXh0OiB0aGlzLlJlY29yZE1vZGVsLmxhc3RRdWVyeT8udGV4dCB9KSk7XG4gIH1cblxuICBfb25Db2xsZWN0aW9uU2VhcmNoVXBkYXRlKGUpIHtcbiAgICBpZiggZS5zdGF0ZSAhPT0gJ2xvYWRlZCcgKSByZXR1cm47XG4gICAgaWYoICF0aGlzLlJlY29yZE1vZGVsLmxhc3RRdWVyeT8udGV4dCApIHJldHVybjtcblxuICAgIC8vIGNvbWJpbmUgY29sbGVjdGlvbiBzZWFyY2ggd2l0aCBpdGVtIHNlYXJjaCBcbiAgICAvLyAoaWUgbWF0Y2ggY29sbGVjdGlvbnMgcmVnYXJkbGVzcyBvZiBpdGVtcyBpbiBzZWFyY2gsIGFuZCBzaG93IGNvbGxlY3Rpb25zIHdoZXJlIGl0ZW1zIGFyZSBtYXRjaGVkIGZyb20gdGhlbSlcbiAgICBsZXQgY29sbGVjdGlvbnMgPSAoZS5wYXlsb2FkPy5yZXN1bHRzIHx8IFtdKS5tYXAoYyA9PiAoeyAnQGlkJzogYy5yb290Py5bJ0BpZCddLCBzY29yZTogYy5fc2NvcmUgfHwgMCB9KSk7XG4gICAgY29sbGVjdGlvbnMuZm9yRWFjaChjID0+IHtcbiAgICAgIGlmKCAhdGhpcy5yZXN1bHRzLmZpbmQociA9PiByWydAaWQnXSA9PT0gY1snQGlkJ10pICkgdGhpcy5yZXN1bHRzLnB1c2goYyk7ICAgICAgXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25GaWx0ZXJCdWNrZXRzVXBkYXRlXG4gICAqIEBkZXNjcmlwdGlvbiBjYWxsZWQgd2hlbiBjb2xsZWN0aW9uL3JlY29yZCBzZWFyY2ggZXZlbnRzIG9jY3VyLCBhZ2dyZWdhdGlvbiBxdWVyeSByZXN1bHRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlXG4gICAqL1xuICBfb25GaWx0ZXJCdWNrZXRzVXBkYXRlKGUpIHtcbiAgICBpZiggZS5maWx0ZXIgIT09ICdAZ3JhcGguaXNQYXJ0T2YuQGlkJyApIHJldHVybjtcbiAgICAvLyB0ZW1wIHJlbW92ZSBvYWMgaXNQYXJ0T2YgcmVjb3Jkc1xuICAgIGUuYnVja2V0cyA9IGUuYnVja2V0cy5maWx0ZXIoYiA9PiAhYi5rZXkuaW5jbHVkZXMoJ29hYy5jZGxpYi5vcmcnKSAmJiBiLmRvY19jb3VudCA+IDApO1xuXG4gICAgbGV0IHJlc3VsdHMgPSBlLmJ1Y2tldHMubWFwKHIgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ0BpZCcgOiByLmtleSxcbiAgICAgICAgY291bnQgOiByLmRvY19jb3VudFxuICAgICAgfTtcbiAgICB9KTtcbiAgICByZXN1bHRzLmZvckVhY2gociA9PiB7XG4gICAgICBpZiggIXRoaXMucmVzdWx0cy5maW5kKHJlcyA9PiByZXNbJ0BpZCddID09PSByWydAaWQnXSkgKSB0aGlzLnJlc3VsdHMucHVzaChyKTsgICAgICBcbiAgICB9KTtcblxuICAgIC8vIHVwZGF0ZSBzY29yZXMgYnkgZnVzaW5nIHNjb3JlIC8gY291bnRzXG4gICAgdGhpcy5yZXN1bHRzID0gdXRpbHMuZnVzZVNjb3JlKHRoaXMucmVzdWx0cyk7XG5cbiAgICBsZXQgc2VhcmNoVGV4dCA9IHRoaXMuU2VhcmNoVmNNb2RlbC5nZXRTZWFyY2goKT8uc2VhcmNoRG9jdW1lbnQ/LnRleHQ7XG4gICAgbGV0IHNlYXJjaEZpbHRlcnMgPSAgdGhpcy5TZWFyY2hWY01vZGVsLmdldFNlYXJjaCgpPy5zZWFyY2hEb2N1bWVudD8uZmlsdGVycyB8fCB7fTtcbiAgICBpZiggc2VhcmNoVGV4dCB8fCAoIE9iamVjdC5rZXlzKHNlYXJjaEZpbHRlcnMpLmxlbmd0aCAmJiBPYmplY3Qua2V5cyhzZWFyY2hGaWx0ZXJzKS5maWx0ZXIoayA9PiBrICE9PSAnQGdyYXBoLmlzUGFydE9mLkBpZCcgKS5sZW5ndGggKSApIHtcbiAgICAgIHRoaXMuc2hvd1Jlc3VsdHMgPSB0aGlzLnJlc3VsdHMubGVuZ3RoID4gMDtcbiAgICAgIHRoaXMucmVzdWx0cyA9IFsuLi50aGlzLnJlc3VsdHNdO1xuICAgICAgdGhpcy5wYWdpbmF0aW9uVG90YWwgPSBNYXRoLmNlaWwodGhpcy5yZXN1bHRzLmxlbmd0aCAvIHRoaXMucmVzdWx0c1BlclBhZ2UpO1xuICAgICAgdGhpcy5maWx0ZXJEaXNwbGF5UmVzdWx0cygpOyAgIFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dSZXN1bHRzID0gZmFsc2U7XG4gICAgfSAgICBcbiAgICB0aGlzLl91cGRhdGVSZXN1bHRzRGlzcGxheWVkKCk7XG4gIH1cblxuICBmaWx0ZXJEaXNwbGF5UmVzdWx0cygpIHsgICAgXG4gICAgLy8gbmVlZCB0byByZXNwb25kIHRvIGZpbHRlcnMgYmVpbmcgY2xpY2tlZCBmb3IgY29sbGVjdGlvblxuICAgIC8vIGlmIGEgc2luZ2xlIGNvbGxlY3Rpb24gaXMgc2VsZWN0ZWQgaW4gZmlsdGVycywgbmVlZCB0byBvbmx5IHNob3cgdGhhdCBjb2xsZWN0aW9uIGluIHRoaXMucmVzdWx0c1xuICAgIGxldCBkZWNvZGVkVXJsID0gZGVjb2RlVVJJQ29tcG9uZW50KHRoaXMuQXBwU3RhdGVNb2RlbC5sb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgaWYoICFkZWNvZGVkVXJsLmluY2x1ZGVzKCdAZ3JhcGguaXNQYXJ0T2YuQGlkJykgKSB7XG4gICAgICB0aGlzLnJlc3VsdHNEaXNwbGF5ID0gWy4uLnRoaXMucmVzdWx0c107XG4gICAgICByZXR1cm47XG4gICAgfSBcblxuICAgIC8vIGZpbHRlciB0aGlzLnJlc3VsdHNEaXNwbGF5IHRvIG9ubHkgdGhpcy5yZXN1bHRzIHdoZXJlIEBpZCBtYXRjaGVzIHRoZSBjb2xsZWN0aW9uIGlkIGluIHRoZSB1cmxcbiAgICBsZXQgY29sbGVjdGlvbklkcyA9IGRlY29kZWRVcmwuc3BsaXQoJ0BncmFwaC5pc1BhcnRPZi5AaWRcIixcIm9yXCIsXCInKVsxXS5zcGxpdCgnXCJdJylbMF0uc3BsaXQoJywnKTtcbiAgICB0aGlzLnJlc3VsdHMgPSBbLi4udGhpcy5yZXN1bHRzLmZpbHRlcihyID0+IGNvbGxlY3Rpb25JZHMuaW5jbHVkZXMoclsnQGlkJ10pKV07XG4gIH1cblxuICBfdXBkYXRlUmVzdWx0c0Rpc3BsYXllZChzY3JvbGxUbz1mYWxzZSkge1xuICAgIGxldCBzdGFydCA9ICh0aGlzLmN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLnJlc3VsdHNQZXJQYWdlO1xuICAgIGxldCBlbmQgPSBzdGFydCArIHRoaXMucmVzdWx0c1BlclBhZ2U7XG4gICAgdGhpcy5yZXN1bHRzRGlzcGxheWVkID0gdGhpcy5yZXN1bHRzLnNsaWNlKHN0YXJ0LCBlbmQpO1xuXG4gICAgdGhpcy5sb2dnZXIud2FybignTm90IGNhbGxpbmcgY29sbGVjdGlvbiBiYXNlIHNjcm9sbGluZzogVE9ETycpO1xuICAgIC8vIGxldCBjb2xsZWN0aW9ucyA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLmNvbGxlY3Rpb25zLWluLXNlYXJjaFwiKTtcbiAgICAvLyBpZiAoY29sbGVjdGlvbnMgJiYgc2Nyb2xsVG8pIHtcbiAgICAvLyAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgLy8gICAgIHRvcDogd2luZG93LnNjcm9sbFkgKyBjb2xsZWN0aW9ucy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55IC0gMTAwLFxuICAgIC8vICAgICBsZWZ0OiAwLFxuICAgIC8vICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIixcbiAgICAvLyAgIH0pO1xuICAgIC8vIH1cbiAgICBcbiAgICB0aGlzLnJlcXVlc3RVcGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbkNvbGxlY3Rpb25DbGlja2VkXG4gICAqIEBkZXNjcmlwdGlvbiBjYWxsZWQgd2hlbiBjb2xsZWN0aW9uIGltZyBvbiBob21lIHBhZ2UgaXMgY2xpY2tlZCBcbiAgICogQHBhcmFtIHtPYmplY3R9IGVcbiAgICovXG4gIF9vbkNvbGxlY3Rpb25DbGlja2VkKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYoIGUudHlwZSA9PT0gJ2tleXVwJyAmJiBlLndoaWNoICE9PSAxMyApIHJldHVybjtcbiAgICBsZXQgaWQgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XG4gICAgdGhpcy5BcHBTdGF0ZU1vZGVsLnNldExvY2F0aW9uKGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblBhZ2VDbGlja2VkXG4gICAqIEBkZXNjcmlwdGlvbiBjYWxsZWQgd2hlbiBwYWdpbmF0aW9uIHBhZ2UgaXMgY2xpY2tlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gZVxuICAgKi9cbiAgX29uUGFnZUNsaWNrZWQoZSkge1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSBlLmRldGFpbC5wYWdlO1xuICAgIHRoaXMuX3VwZGF0ZVJlc3VsdHNEaXNwbGF5ZWQodHJ1ZSk7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhcHAtc2VhcmNoLXJlc3VsdHMtY29sbGVjdGlvbnMnLCBBcHBTZWFyY2hSZXN1bHRzQ29sbGVjdGlvbnMpOyIsImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQnO1xuXG5pbXBvcnQgeyBzaGFyZWRTdHlsZXMgfSBmcm9tICcuLi8uLi8uLi9zdHlsZXMvc2hhcmVkLXN0eWxlcyc7XG5pbXBvcnQgJ0B1Y2QtbGliL3RoZW1lLWVsZW1lbnRzL2JyYW5kL3VjZC10aGVtZS1wYWdpbmF0aW9uL3VjZC10aGVtZS1wYWdpbmF0aW9uLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXIoKSB7XG5yZXR1cm4gaHRtbGBcbiAgPHN0eWxlPlxuICAgICR7c2hhcmVkU3R5bGVzfVxuXG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTgwKTtcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvaW1hZ2VzL3dhdGVyY29sb3JzL3dhdGVyY29sb3ItYmFja2dyb3VuZC11Y2QtYmx1ZS0yMG9wYWNpdHkucG5nKTtcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIH1cblxuICAgIFtoaWRkZW5dIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9XG5cbiAgICBoMyB7XG4gICAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtZ29sZCk7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgcGFkZGluZzogM3JlbSAzcmVtIDAuNXJlbSA0LjUlO1xuICAgIH1cblxuICAgIC5jYXJkLWdyaWQge1xuICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgbWlubWF4KDAsIDFmcikpO1xuICAgICAgZ3JpZC1nYXA6IDNyZW07XG4gICAgICBtYXgtd2lkdGg6IDkxJTtcbiAgICB9XG5cbiAgICB1Y2QtdGhlbWUtcGFnaW5hdGlvbiB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIH1cblxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgICAgLmNhcmQtZ3JpZCB7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEsIG1pbm1heCgwLCAxZnIpKTtcbiAgICAgICAgbWF4LXdpZHRoOiA5MCU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmNvbGxlY3Rpb25zLWluLXNlYXJjaCB7XG4gICAgICBwYWRkaW5nLWJvdHRvbTogMzVweDtcbiAgICB9XG5cbiAgPC9zdHlsZT5cblxuICA8ZGl2IGNsYXNzPVwiY29sbGVjdGlvbnMgY29sbGVjdGlvbnMtaW4tc2VhcmNoXCIgP2hpZGRlbj1cIiR7IXRoaXMuc2hvd1Jlc3VsdHN9XCI+XG4gICAgPGRpdj5cbiAgICAgIDxoMz5Db2xsZWN0aW9ucyBSZWxldmFudCB0byBZb3VyIFNlYXJjaCAoJHt0aGlzLnJlc3VsdHMubGVuZ3RofSk8L2gzPlxuICAgICAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyXCIgY2xhc3M9XCJjb2xsZWN0aW9ucy1jb250ZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWdyaWRcIj5cbiAgICAgICAgICAke3RoaXMucmVzdWx0c0Rpc3BsYXllZC5tYXAocmVzID0+IGh0bWxgXG4gICAgICAgICAgICA8ZGFtcy1jb2xsZWN0aW9uLWNhcmQgZGF0YS1kYXJrLWJnIGRhdGEtaWQ9XCIke3Jlc1snQGlkJ119XCIgQGNsaWNrPSR7dGhpcy5fb25Db2xsZWN0aW9uQ2xpY2tlZH0+PC9kYW1zLWNvbGxlY3Rpb24tY2FyZD5cbiAgICAgICAgICBgKX1cbiAgICAgICAgPC9kaXY+ICBcbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDx1Y2QtdGhlbWUtcGFnaW5hdGlvblxuICAgICAgP2hpZGRlbj1cIiR7dGhpcy5wYWdpbmF0aW9uVG90YWwgPCAyfVwiXG4gICAgICBjdXJyZW50LXBhZ2U9JHt0aGlzLmN1cnJlbnRQYWdlfVxuICAgICAgbWF4LXBhZ2VzPSR7dGhpcy5wYWdpbmF0aW9uVG90YWx9XG4gICAgICBAcGFnZS1jaGFuZ2U9JHt0aGlzLl9vblBhZ2VDbGlja2VkfVxuICAgICAgeHMtc2NyZWVuXG4gICAgICBkYXJrbW9kZVxuICAgICAgZWxsaXBzZXM+XG4gICAgPC91Y2QtdGhlbWUtcGFnaW5hdGlvbj5cbiAgPC9kaXY+XG5cbiAgXG5gO30iLCJpbXBvcnQgeyBMaXRFbGVtZW50IH0gZnJvbSBcImxpdFwiO1xuXG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2FwcC1zZWFyY2gtcmVzdWx0cy1wYW5lbC50cGwuanNcIjtcblxuaW1wb3J0IHsgTWl4aW4sIExpdENvcmtVdGlscyB9IGZyb20gJ0B1Y2QtbGliL2NvcmstYXBwLXV0aWxzJztcblxuaW1wb3J0IFwiLi9hcHAtc2VhcmNoLWdyaWQtcmVzdWx0XCI7XG5pbXBvcnQgXCIuL2FwcC1zZWFyY2gtbGlzdC1yZXN1bHRcIjtcbmltcG9ydCBcIi4uLy4uLy4uL3V0aWxzL2FwcC1jb2xsZWN0aW9uLWNhcmRcIjtcbi8vIGltcG9ydCBcIi4uL2ZpbHRlcmluZy9hcHAtdG9wLWFjdGl2ZS1maWx0ZXJzXCI7XG5pbXBvcnQgXCIuLi8uLi8uLi9jb21wb25lbnRzL2NhcmRzL2RhbXMtY29sbGVjdGlvbi1jYXJkXCI7XG5pbXBvcnQgXCIuLi8uLi8uLi9jb21wb25lbnRzL2NhcmRzL2RhbXMtaXRlbS1jYXJkXCI7XG5cbmltcG9ydCBcIkB1Y2QtbGliL3RoZW1lLWVsZW1lbnRzL3VjZGxpYi91Y2RsaWItaWNvbi91Y2RsaWItaWNvblwiO1xuaW1wb3J0IFwiLi4vLi4vLi4vdXRpbHMvYXBwLWljb25zXCI7XG5cbmNvbnN0IFNFQVJDSF9SRVNVTFRTX0xBWU9VVCA9IFwic2VhcmNoLXJlc3VsdHMtbGF5b3V0XCI7XG5sZXQgaW5pdElzTGlzdExheW91dCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNFQVJDSF9SRVNVTFRTX0xBWU9VVCk7XG5cbmNsYXNzIEFwcFNlYXJjaFJlc3VsdHNQYW5lbCBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpLndpdGgoTGl0Q29ya1V0aWxzKSB7XG4gIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdWx0czogeyB0eXBlOiBBcnJheSB9LCAvLyBhcnJheSBvZiBzZWFyY2ggcmVzdWx0c1xuICAgICAgdG90YWxDb2xsZWN0aW9uczogeyB0eXBlOiBOdW1iZXIgfSxcbiAgICAgIGNvbGxlY3Rpb25SZXN1bHRzIDogeyB0eXBlOiBBcnJheSB9LCAvLyBhcnJheSBvZiBjb2xsZWN0aW9uIHNlYXJjaCByZXN1bHRzXG4gICAgICBncmlkTWFyZ2luOiB7IHR5cGU6IE51bWJlciB9LCAvLyBzaXplIGluIHB4J3MgYmV0d2VlbiBlYWNoIG1hc29uYXJ5IGxheW91dCBjZWxsXG4gICAgICBpc0dyaWRMYXlvdXQ6IHsgdHlwZTogQm9vbGVhbiB9LCAvLyBhcmUgd2UgaW4gZ3JpZCBsYXlvdXRcbiAgICAgIGlzTGlzdExheW91dDogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBpc01vc2FpY0xheW91dDogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICB0b3RhbDogeyB0eXBlOiBTdHJpbmcgfSwgLy8gVUkgZGlzcGxheSBvZiB0b3RhbCByZXN1bHRzXG4gICAgICBudW1QZXJQYWdlOiB7IHR5cGU6IE51bWJlciB9LFxuICAgICAgY3VycmVudEluZGV4OiB7IHR5cGU6IE51bWJlciB9LFxuICAgICAgLy8gc2hvd0NvbGxlY3Rpb25SZXN1bHRzIDogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBzaG93RXJyb3I6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgc2hvd0xvYWRpbmc6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgZXJyb3JNc2c6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgcGFnaW5hdGlvblRvdGFsOiB7IHR5cGU6IE51bWJlciB9LCAvLyB0b3RhbCBudW1iZXIgZm9yIHBhZ2luYXRpb24gd2lkZ2V0LCB3ZSBtYXggb3V0IGF0IDEwMDAwXG4gICAgICB0b3RhbE92ZXJNYXhXaW5kb3c6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgY3VycmVudFBhZ2U6IHsgdHlwZTogTnVtYmVyIH0sXG4gICAgICBsb2FkaW5nOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIGxhc3RTZWFyY2g6IHsgdHlwZTogU3RyaW5nIH1cbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuZ3JpZE1hcmdpbiA9IDE1O1xuXG4gICAgaWYgKGluaXRJc0xpc3RMYXlvdXQgPT09IFwiZ3JpZFwiKSB7XG4gICAgICB0aGlzLmlzR3JpZExheW91dCA9IHRydWU7XG4gICAgICB0aGlzLmlzTGlzdExheW91dCA9IGZhbHNlO1xuICAgICAgdGhpcy5pc01vc2FpY0xheW91dCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoaW5pdElzTGlzdExheW91dCA9PT0gXCJsaXN0XCIpIHtcbiAgICAgIHRoaXMuaXNHcmlkTGF5b3V0ID0gZmFsc2U7XG4gICAgICB0aGlzLmlzTGlzdExheW91dCA9IHRydWU7XG4gICAgICB0aGlzLmlzTW9zYWljTGF5b3V0ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNHcmlkTGF5b3V0ID0gZmFsc2U7XG4gICAgICB0aGlzLmlzTGlzdExheW91dCA9IGZhbHNlO1xuICAgICAgdGhpcy5pc01vc2FpY0xheW91dCA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVzZXQoKTtcblxuICAgIHRoaXMucmVzaXplVGltZXIgPSAtMTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB0aGlzLl9yZXNpemVBc3luYygpKTtcblxuICAgIHRoaXMuX2luamVjdE1vZGVsKFxuICAgICAgXCJBcHBTdGF0ZU1vZGVsXCIsXG4gICAgICBcIkNvbGxlY3Rpb25Nb2RlbFwiLFxuICAgICAgXCJSZWNvcmRNb2RlbFwiLFxuICAgICAgXCJNZWRpYU1vZGVsXCIsXG4gICAgICBcIlNlYXJjaFZjTW9kZWxcIixcbiAgICAgIFwiRmlsdGVyc01vZGVsXCJcbiAgICApO1xuICAgIHRoaXMuRXZlbnRCdXMoKS5vbihcInNob3ctY29sbGVjdGlvbi1zZWFyY2gtcmVzdWx0c1wiLCAoc2hvdykgPT5cbiAgICAgIHRoaXMuX3VwZGF0ZUNvbGxlY3Rpb25SZXN1bHRzVmlzaWJpbGl0eShzaG93KVxuICAgICk7XG4gIH1cblxuICBmaXJzdFVwZGF0ZWQoKSB7XG4gICAgdGhpcy5fc2V0U2VsZWN0ZWREaXNwbGF5KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25BcHBTdGF0ZVVwZGF0ZVxuICAgKiBAZGVzY3JpcHRpb24gZnJvbSBBcHBTdGF0ZUludGVyZmFjZSwgY2FsbGVkIHdoZW4gYXBwIHN0YXRlIHVwZGF0ZXNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGVcbiAgICovXG4gIGFzeW5jIF9vbkFwcFN0YXRlVXBkYXRlKGUpIHtcbiAgICBpZiAoZS5sb2NhdGlvbi5wYWdlICE9PSBcInNlYXJjaFwiKSByZXR1cm47XG5cbiAgICBpZiggdGhpcy5BcHBTdGF0ZU1vZGVsLmxvY2F0aW9uLmZ1bGxwYXRoICE9PSB0aGlzLmxhc3RTZWFyY2ggKSB7XG4gICAgICB0aGlzLl9yZXNldCgpO1xuICAgICAgdGhpcy5sYXN0U2VhcmNoID0gdGhpcy5BcHBTdGF0ZU1vZGVsLmxvY2F0aW9uLmZ1bGxwYXRoO1xuICAgIH1cblxuICAgIHRoaXMuX3NldFNlbGVjdGVkRGlzcGxheSgpO1xuICAgIC8vIHRoaXMuX3Jlc2l6ZUFzeW5jKCk7XG4gICAgdGhpcy5maWx0ZXJEaXNwbGF5UmVzdWx0cygpO1xuXG4gICAgdGhpcy5fb25Db2xsZWN0aW9uU2VhcmNoVXBkYXRlKGF3YWl0IHRoaXMuQ29sbGVjdGlvbk1vZGVsLnNlYXJjaCh7IHRleHQ6IHRoaXMuUmVjb3JkTW9kZWwubGFzdFF1ZXJ5Py50ZXh0IH0pKTtcbiAgfVxuXG4gIF9yZXNldCgpIHtcbiAgICB0aGlzLnJlc3VsdHMgPSBbXTtcbiAgICB0aGlzLmNvbGxlY3Rpb25SZXN1bHRzID0gW107XG4gICAgdGhpcy50b3RhbENvbGxlY3Rpb25zID0gMDtcbiAgICB0aGlzLnRvdGFsID0gXCJcIjtcbiAgICB0aGlzLm51bVBlclBhZ2UgPSAyMDtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IDE7XG4gICAgdGhpcy5zaG93Q29sbGVjdGlvblJlc3VsdHMgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dFcnJvciA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd0xvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmVycm9yTXNnID0gZmFsc2U7XG4gICAgdGhpcy5wYWdpbmF0aW9uVG90YWwgPSAwO1xuICAgIHRoaXMudG90YWxPdmVyTWF4V2luZG93ID0gZmFsc2U7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgfVxuXG4gIF9vbkNvbGxlY3Rpb25TZWFyY2hVcGRhdGUoZSkge1xuICAgIGlmKCBlLnN0YXRlICE9PSAnbG9hZGVkJyApIHJldHVybjtcbiAgICBpZiggIXRoaXMuUmVjb3JkTW9kZWwubGFzdFF1ZXJ5Py50ZXh0ICkgcmV0dXJuO1xuXG4gICAgLy8gY29tYmluZSBjb2xsZWN0aW9uIHNlYXJjaCB3aXRoIGl0ZW0gc2VhcmNoIFxuICAgIC8vIChpZSBtYXRjaCBjb2xsZWN0aW9ucyByZWdhcmRsZXNzIG9mIGl0ZW1zIGluIHNlYXJjaCwgYW5kIHNob3cgY29sbGVjdGlvbnMgd2hlcmUgaXRlbXMgYXJlIG1hdGNoZWQgZnJvbSB0aGVtKVxuICAgIGxldCBjb2xsZWN0aW9ucyA9IChlLnBheWxvYWQ/LnJlc3VsdHMgfHwgW10pLm1hcChjID0+ICh7ICdAaWQnOiBjLnJvb3Q/LlsnQGlkJ10gfSkpO1xuICAgIGNvbGxlY3Rpb25zLmZvckVhY2goYyA9PiB7XG4gICAgICBpZiggIXRoaXMuY29sbGVjdGlvblJlc3VsdHMuZmluZChyID0+IHJbJ0BpZCddID09PSBjWydAaWQnXSkgKSB0aGlzLmNvbGxlY3Rpb25SZXN1bHRzLnB1c2goYyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25GaWx0ZXJCdWNrZXRzVXBkYXRlXG4gICAqIEBkZXNjcmlwdGlvbiBjYWxsZWQgd2hlbiBjb2xsZWN0aW9uL3JlY29yZCBzZWFyY2ggZXZlbnRzIG9jY3VyLCBhZ2dyZWdhdGlvbiBxdWVyeSByZXN1bHRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlXG4gICAqL1xuICBfb25GaWx0ZXJCdWNrZXRzVXBkYXRlKGUpIHtcbiAgICBpZiggZS5maWx0ZXIgIT09ICdAZ3JhcGguaXNQYXJ0T2YuQGlkJyApIHJldHVybjtcbiAgICAvLyB0ZW1wIHJlbW92ZSBvYWMgaXNQYXJ0T2YgcmVjb3Jkc1xuICAgIGUuYnVja2V0cyA9IGUuYnVja2V0cy5maWx0ZXIoYiA9PiAhYi5rZXkuaW5jbHVkZXMoJ29hYy5jZGxpYi5vcmcnKSAmJiBiLmRvY19jb3VudCA+IDApO1xuXG4gICAgbGV0IGNvbGxlY3Rpb25SZXN1bHRzID0gZS5idWNrZXRzLm1hcChyID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdAaWQnIDogci5rZXksXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgY29sbGVjdGlvblJlc3VsdHMuZm9yRWFjaChyID0+IHtcbiAgICAgIGlmKCAhdGhpcy5jb2xsZWN0aW9uUmVzdWx0cy5maW5kKHJlcyA9PiByZXNbJ0BpZCddID09PSByWydAaWQnXSkgKSB0aGlzLmNvbGxlY3Rpb25SZXN1bHRzLnB1c2gocik7XG4gICAgfSk7XG5cbiAgICBsZXQgc2VhcmNoVGV4dCA9IHRoaXMuU2VhcmNoVmNNb2RlbC5nZXRTZWFyY2goKT8uc2VhcmNoRG9jdW1lbnQ/LnRleHQ7XG4gICAgbGV0IHNlYXJjaEZpbHRlcnMgPSAgdGhpcy5TZWFyY2hWY01vZGVsLmdldFNlYXJjaCgpPy5zZWFyY2hEb2N1bWVudD8uZmlsdGVycyB8fCB7fTtcbiAgICBpZiggc2VhcmNoVGV4dCB8fCAoIE9iamVjdC5rZXlzKHNlYXJjaEZpbHRlcnMpLmxlbmd0aCAmJiBPYmplY3Qua2V5cyhzZWFyY2hGaWx0ZXJzKS5maWx0ZXIoayA9PiBrICE9PSAnQGdyYXBoLmlzUGFydE9mLkBpZCcgKS5sZW5ndGggKSApIHtcbiAgICAgIHRoaXMudG90YWxDb2xsZWN0aW9ucyA9IHRoaXMuY29sbGVjdGlvblJlc3VsdHMubGVuZ3RoIHx8IDA7XG4gICAgICB0aGlzLmZpbHRlckRpc3BsYXlSZXN1bHRzKCk7ICAgICAgXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudG90YWxDb2xsZWN0aW9ucyA9IDA7XG4gICAgfVxuICB9XG5cbiAgd2lsbFVwZGF0ZSgpIHtcbiAgICBsZXQgc2VhcmNoID0gdGhpcy5TZWFyY2hWY01vZGVsLmdldFNlYXJjaCgpO1xuICAgIC8vIHRoaXMudG90YWxDb2xsZWN0aW9ucyA9IHNlYXJjaD8ucGF5bG9hZD8ubWF0Y2hlZENvbGxlY3Rpb25zPy5sZW5ndGggfHwgMDtcbiAgfVxuXG4gIGZpbHRlckRpc3BsYXlSZXN1bHRzKCkgeyAgICBcbiAgICAvLyBuZWVkIHRvIHJlc3BvbmQgdG8gZmlsdGVycyBiZWluZyBjbGlja2VkIGZvciBjb2xsZWN0aW9uXG4gICAgLy8gaWYgYSBzaW5nbGUgY29sbGVjdGlvbiBpcyBzZWxlY3RlZCBpbiBmaWx0ZXJzLCBuZWVkIHRvIG9ubHkgc2hvdyB0aGF0IGNvbGxlY3Rpb24gaW4gdGhpcy5yZXN1bHRzXG4gICAgbGV0IGRlY29kZWRVcmwgPSBkZWNvZGVVUklDb21wb25lbnQodGhpcy5BcHBTdGF0ZU1vZGVsLmxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICBpZiggIWRlY29kZWRVcmwuaW5jbHVkZXMoJ0BncmFwaC5pc1BhcnRPZi5AaWQnKSApIHtcbiAgICAgIHRoaXMuY29sbGVjdGlvblJlc3VsdHMgPSBbLi4udGhpcy5jb2xsZWN0aW9uUmVzdWx0c107XG4gICAgICByZXR1cm47XG4gICAgfSBcblxuICAgIHRoaXMudG90YWxDb2xsZWN0aW9ucyA9IDA7XG5cbiAgICBsZXQgY29sbGVjdGlvbklkcyA9IGRlY29kZWRVcmwuc3BsaXQoJ0BncmFwaC5pc1BhcnRPZi5AaWRcIixcIm9yXCIsXCInKVsxXS5zcGxpdCgnXCJdJylbMF0uc3BsaXQoJywnKTtcbiAgICBpZiggY29sbGVjdGlvbklkcy5sZW5ndGggPiAxICkge1xuICAgICAgdGhpcy50b3RhbENvbGxlY3Rpb25zID0gY29sbGVjdGlvbklkcy5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgcmVuZGVyUmVzdWx0c1xuICAgKiBAZGVzY3JpcHRpb24gcmVuZGVyUmVzdWx0cyByZXN1bHRzIG9mIHNlYXJjaCBxdWVyeVxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSByZXN1bHRzIHJlc3VsdHMgdG8gcmVuZGVyXG4gICAqIEBwYXJhbSB7QXJyYXl9IHRvdGFsIHRvdGFsIG1hdGNoZWQgcmVzdWx0c1xuICAgKiBAcGFyYW0ge0FycmF5fSBudW1QZXJQYWdlIHJlc3VsdHMgdG8gcmVuZGVyIG9uIGVhY2ggcGFnZVxuICAgKiBAcGFyYW0ge0FycmF5fSBjdXJyZW50SW5kZXggaW5kZXhcbiAgICovXG4gIHJlbmRlclJlc3VsdHMocmVzdWx0cywgdG90YWwsIG51bVBlclBhZ2UsIGN1cnJlbnRJbmRleCkge1xuICAgIGlmKCB0aGlzLkFwcFN0YXRlTW9kZWwubG9jYXRpb24ucGFnZSAhPT0gJ3NlYXJjaCcgKSByZXR1cm47XG5cbiAgICB0aGlzLmxhc3RTZWFyY2ggPSB0aGlzLkFwcFN0YXRlTW9kZWwubG9jYXRpb24uZnVsbHBhdGg7XG4gICAgdGhpcy5yZXN1bHRzID0gW107XG4gICAgdGhpcy5zaG93SGVhZGVyRm9vdGVyID0gdHJ1ZTtcbiAgICB0aGlzLnNob3dFcnJvciA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnNob3dMb2FkaW5nVGltZXIpO1xuICAgIHRoaXMuc2hvd0xvYWRpbmcgPSBmYWxzZTtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnRvdGFsID0gdG90YWw7XG4gICAgICAvLyBtYWtlIHN1cmUgd2UgZG9uJ3QgaGF2ZSBhIHBhZ2UgdGhlIHJldHVybnMgcmVzdWx0cyA+IDEwMDAwa1xuICAgICAgbGV0IHQgPSBNYXRoLmZsb29yKDEwMDAwIC8gbnVtUGVyUGFnZSkgKiBudW1QZXJQYWdlO1xuICAgICAgaWYgKHRvdGFsID4gdCkge1xuICAgICAgICB0aGlzLnRvdGFsID0gdCArIFwiK1wiO1xuICAgICAgICB0aGlzLnRvdGFsT3Zlck1heFdpbmRvdyA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRvdGFsT3Zlck1heFdpbmRvdyA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlc3VsdHMgPSByZXN1bHRzO1xuICAgICAgdGhpcy5udW1QZXJQYWdlID0gbnVtUGVyUGFnZTtcbiAgICAgIHRoaXMucGFnaW5hdGlvblRvdGFsID0gTWF0aC5jZWlsKHRvdGFsIC8gbnVtUGVyUGFnZSk7XG4gICAgICAvLyBpZiggdGhpcy5wYWdpbmF0aW9uVG90YWwgPCAxICkgdGhpcy5wYWdpbmF0aW9uVG90YWwgPSAxO1xuXG4gICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNudW1QZXJQYWdlXCIpLnZhbHVlID0gbnVtUGVyUGFnZSArIFwiXCI7XG4gICAgICAvLyB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI251bVBlclBhZ2VNJykudmFsdWUgPSBudW1QZXJQYWdlKycnO1xuICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSBjdXJyZW50SW5kZXg7XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlID1cbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPT09IDAgPyAxIDogdGhpcy5jdXJyZW50SW5kZXggLyB0aGlzLm51bVBlclBhZ2UgKyAxO1xuXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9yZXNpemUoKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG51bWJlcldpdGhDb21tYXMoeCkge1xuICAgIHJldHVybiB4LnRvU3RyaW5nKCkucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIsXCIpO1xuICB9XG5cbiAgb25Mb2FkaW5nKCkge1xuICAgIHRoaXMucmVzdWx0cyA9IFtdO1xuICAgIC8vIHRoaXMuc2hvd0hlYWRlckZvb3RlciA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd0NvbGxlY3Rpb25SZXN1bHRzID0gZmFsc2U7XG4gICAgdGhpcy5zaG93RXJyb3IgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dMb2FkaW5nVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2hvd0xvYWRpbmcgPSB0cnVlO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBvbkVycm9yKHN0YXRlKSB7XG4gICAgdGhpcy5yZXN1bHRzID0gW107XG4gICAgLy8gdGhpcy5zaG93SGVhZGVyRm9vdGVyID0gZmFsc2U7XG4gICAgdGhpcy5zaG93Q29sbGVjdGlvblJlc3VsdHMgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dFcnJvciA9IHRydWU7XG5cbiAgICBjbGVhclRpbWVvdXQodGhpcy5zaG93TG9hZGluZ1RpbWVyKTtcbiAgICB0aGlzLnNob3dMb2FkaW5nID0gZmFsc2U7XG5cbiAgICBpZiAoc3RhdGUuc2hvd0Vycm9yTWVzc2FnZSkge1xuICAgICAgdGhpcy5lcnJvck1zZyA9IHN0YXRlLmVycm9yLm1lc3NhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXJyb3JNc2cgPSBcIk9vcHMuIFNvbWV0aGluZyB3ZW50IHdyb25nIHdpdGggc2VhcmNoIVwiO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbkxheW91dFRvZ2dsZVxuICAgKiBAZGVzY3JpcHRpb24gVG9nZ2xlIGJldHdlZW4gZ3JpZCwgbGlzdCBhbmQgbW9zYWljIGxheW91dHNcbiAgICpcbiAgICogQHBhcmFtIHtFdmVudH0gZSBIVE1MIGNsaWNrIGV2ZW50XG4gICAqL1xuICBfb25MYXlvdXRUb2dnbGUoZSkge1xuICAgIGxldCB0eXBlID0gZT8uY3VycmVudFRhcmdldD8uZ2V0QXR0cmlidXRlKFwidHlwZVwiKSB8fCAnbW9zYWljJztcbiAgICBpZiAodHlwZSA9PT0gXCJncmlkXCIpIHtcbiAgICAgIHRoaXMuaXNHcmlkTGF5b3V0ID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNMaXN0TGF5b3V0ID0gZmFsc2U7XG4gICAgICB0aGlzLmlzTW9zYWljTGF5b3V0ID0gZmFsc2U7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTRUFSQ0hfUkVTVUxUU19MQVlPVVQsIFwiZ3JpZFwiKTtcbiAgICAgIHRoaXMuc2hhZG93Um9vdFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5ncmlkLWxheW91dC1pY29uXCIpXG4gICAgICAgIC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWQtbGF5b3V0XCIpO1xuICAgICAgdGhpcy5zaGFkb3dSb290XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLm1vc2FpYy1sYXlvdXQtaWNvblwiKVxuICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkLWxheW91dFwiKTtcbiAgICAgIHRoaXMuc2hhZG93Um9vdFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5saXN0LWxheW91dC1pY29uXCIpXG4gICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWQtbGF5b3V0XCIpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJsaXN0XCIpIHtcbiAgICAgIHRoaXMuaXNHcmlkTGF5b3V0ID0gZmFsc2U7XG4gICAgICB0aGlzLmlzTGlzdExheW91dCA9IHRydWU7XG4gICAgICB0aGlzLmlzTW9zYWljTGF5b3V0ID0gZmFsc2U7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTRUFSQ0hfUkVTVUxUU19MQVlPVVQsIFwibGlzdFwiKTtcbiAgICAgIHRoaXMuc2hhZG93Um9vdFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5ncmlkLWxheW91dC1pY29uXCIpXG4gICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWQtbGF5b3V0XCIpO1xuICAgICAgdGhpcy5zaGFkb3dSb290XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLm1vc2FpYy1sYXlvdXQtaWNvblwiKVxuICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkLWxheW91dFwiKTtcbiAgICAgIHRoaXMuc2hhZG93Um9vdFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5saXN0LWxheW91dC1pY29uXCIpXG4gICAgICAgIC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWQtbGF5b3V0XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzR3JpZExheW91dCA9IGZhbHNlO1xuICAgICAgdGhpcy5pc0xpc3RMYXlvdXQgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNNb3NhaWNMYXlvdXQgPSB0cnVlO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU0VBUkNIX1JFU1VMVFNfTEFZT1VULCBcIm1vc2FpY1wiKTtcbiAgICAgIHRoaXMuc2hhZG93Um9vdFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5ncmlkLWxheW91dC1pY29uXCIpXG4gICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWQtbGF5b3V0XCIpO1xuICAgICAgdGhpcy5zaGFkb3dSb290XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLm1vc2FpYy1sYXlvdXQtaWNvblwiKVxuICAgICAgICAuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkLWxheW91dFwiKTtcbiAgICAgIHRoaXMuc2hhZG93Um9vdFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5saXN0LWxheW91dC1pY29uXCIpXG4gICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWQtbGF5b3V0XCIpO1xuICAgIH1cbiAgICB0aGlzLl9zZXRTZWxlY3RlZERpc3BsYXkoKTtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLl9yZXNpemUoKSk7XG4gIH1cblxuICBfc2V0U2VsZWN0ZWREaXNwbGF5KCkge1xuICAgIGxldCB0eXBlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU0VBUkNIX1JFU1VMVFNfTEFZT1VUKTtcbiAgICBpZiAodHlwZSA9PT0gXCJncmlkXCIpIHtcbiAgICAgIHRoaXMuc2hhZG93Um9vdFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5ncmlkLWxheW91dC1pY29uXCIpXG4gICAgICAgIC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWQtbGF5b3V0XCIpO1xuICAgICAgdGhpcy5zaGFkb3dSb290XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLm1vc2FpYy1sYXlvdXQtaWNvblwiKVxuICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkLWxheW91dFwiKTtcbiAgICAgIHRoaXMuc2hhZG93Um9vdFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5saXN0LWxheW91dC1pY29uXCIpXG4gICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWQtbGF5b3V0XCIpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJsaXN0XCIpIHtcbiAgICAgIHRoaXMuc2hhZG93Um9vdFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5ncmlkLWxheW91dC1pY29uXCIpXG4gICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWQtbGF5b3V0XCIpO1xuICAgICAgdGhpcy5zaGFkb3dSb290XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLm1vc2FpYy1sYXlvdXQtaWNvblwiKVxuICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkLWxheW91dFwiKTtcbiAgICAgIHRoaXMuc2hhZG93Um9vdFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5saXN0LWxheW91dC1pY29uXCIpXG4gICAgICAgIC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWQtbGF5b3V0XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3RcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZC1sYXlvdXQtaWNvblwiKVxuICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkLWxheW91dFwiKTtcbiAgICAgIHRoaXMuc2hhZG93Um9vdFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5tb3NhaWMtbGF5b3V0LWljb25cIilcbiAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZC1sYXlvdXRcIik7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3RcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubGlzdC1sYXlvdXQtaWNvblwiKVxuICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkLWxheW91dFwiKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfcmVzaXplQXN5bmNcbiAgICogQGRlc2NyaXB0aW9uIGJ1ZmZlciByZXNpemUgbWFzb25hcnkgbGF5b3V0IGNhbGxcbiAgICovXG4gIF9yZXNpemVBc3luYygpIHtcbiAgICBpZiggdGhpcy5BcHBTdGF0ZU1vZGVsLmxvY2F0aW9uLnBhZ2UgIT09ICdzZWFyY2gnICkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMucmVzaXplVGltZXIgIT09IC0xKSBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lcik7XG4gICAgdGhpcy5yZXNpemVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5yZXNpemVUaW1lciA9IC0xO1xuICAgICAgdGhpcy5fcmVzaXplKCk7XG4gICAgfSwgNTApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX3Jlc2l6ZVxuICAgKiBAZGVzY3JpcHRpb24gcmVzaXplIG1hc29uYXJ5IGxheW91dFxuICAgKi9cbiAgYXN5bmMgX3Jlc2l6ZSgpIHtcbiAgICBpZiggdGhpcy5BcHBTdGF0ZU1vZGVsLmxvY2F0aW9uLnBhZ2UgIT09ICdzZWFyY2gnICkgcmV0dXJuO1xuICAgIGlmKCAhdGhpcy5pc01vc2FpY0xheW91dCApIHJldHVybjtcbiAgICBsZXQgZmlyc3REaXYgPSB0aGlzLnNoYWRvd1Jvb3RcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiI2xheW91dFwiKVxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCJhcHAtc2VhcmNoLWdyaWQtcmVzdWx0XCIpO1xuICAgIGlmKCAhZmlyc3REaXYgKSByZXR1cm47XG5cbiAgICAvLyB1cGRhdGUgaW1hZ2UgaGVpZ2h0cyBmb3IgbW9zYWljIGxheW91dFxuICAgIGxldCBncmlkcyA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI2xheW91dFwiKT8ucXVlcnlTZWxlY3RvckFsbChcImFwcC1zZWFyY2gtZ3JpZC1yZXN1bHRcIik7XG4gICAgaWYoIGdyaWRzICYmIGdyaWRzLmxlbmd0aCApIHtcbiAgICAgIGdyaWRzLmZvckVhY2goZ3JpZCA9PiB7XG4gICAgICAgIGdyaWQuX3JlbmRlckltYWdlKCk7XG4gICAgICB9KTsgIFxuICAgIH1cbiAgICBhd2FpdCB0aGlzLnVwZGF0ZUNvbXBsZXRlO1xuXG4gICAgbGV0IGV3ID0gdGhpcy5vZmZzZXRXaWR0aDtcbiAgICBsZXQgdyA9IGZpcnN0RGl2Lm9mZnNldFdpZHRoICsgMjU7XG5cbiAgICBsZXQgbnVtQ29scyA9IDM7XG4gICAgaWYoIHdpbmRvdy5pbm5lcldpZHRoIDwgMTAyNCApIG51bUNvbHMgPSAyO1xuICAgIGlmKCB3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCApIG51bUNvbHMgPSAxO1xuXG4gICAgLy8gdGhpcyBtYWtlcyBzdXJlIGNvbHVtbnMgYXJlIGNlbnRlcmVkXG4gICAgbGV0IGxlZnRPZmZzZXQgPSBNYXRoLmZsb29yKChldyAtIG51bUNvbHMgKiB3KSAvIDIpO1xuXG4gICAgbGV0IGNvbEhlaWdodHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvbHM7IGkrKykgY29sSGVpZ2h0cy5wdXNoKDApO1xuXG4gICAgaWYoIGxlZnRPZmZzZXQgPiAyMCApIGxlZnRPZmZzZXQgPSAyMDtcbiAgICBsZXQgZWxlcyA9IHRoaXMuc2hhZG93Um9vdFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIjbGF5b3V0XCIpXG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcImFwcC1zZWFyY2gtZ3JpZC1yZXN1bHRcIik7XG4gIFxuICAgIHRoaXMuX2VzdGltYXRlVmlld0hlaWdodChlbGVzLCB3LCBudW1Db2xzKTtcblxuICAgIC8vIHRvIGNhbGN1bGF0ZSB0aGUgaGVpZ2h0IG9mIHRoZSB0aXRsZXNcbiAgICBsZXQgbWFzb25hcnlUaXRsZXNEaXYgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLm1hc29ucnktdGl0bGVzJyk7XG4gICAgbWFzb25hcnlUaXRsZXNEaXYuaW5uZXJIVE1MID0gJyc7XG4gICAgZm9yKCBsZXQgaSA9IDA7IGkgPCBlbGVzLmxlbmd0aDsgaSsrICkge1xuICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NvbGxlY3Rpb24tbmFtZScpO1xuICAgICAgZGl2LnN0eWxlLndpZHRoID0gZWxlc1tpXS5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICBkaXYuaW5uZXJUZXh0ID0gdGhpcy5yZXN1bHRzW2ldLnRpdGxlIHx8ICdObyBUaXRsZSc7XG4gICAgICBtYXNvbmFyeVRpdGxlc0Rpdi5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlcy5sZW5ndGg7IGkrKykgeyBcbiAgICAgIGxldCB0aXRsZUhlaWdodCA9IG1hc29uYXJ5VGl0bGVzRGl2LmNoaWxkcmVuW2ldLm9mZnNldEhlaWdodDtcbiAgICAgIGxldCBzaXplID0gdGhpcy5yZXN1bHRzW2ldLnNpemUgfHwge307XG5cbiAgICAgIGxldCBjb250YWluZXJXaWR0aCA9IGVsZXNbaV0ub2Zmc2V0V2lkdGggfHwgKHcgKiAuOTIpOyAvLyBoYWNrIHRvIGdldCBhcm91bmQgb2Zmc2V0V2lkdGggaW50ZXJtaXR0ZW50bHkgYmVpbmcgMCwgbm90IHJlbmRlcmVkIHlldD9cblxuICAgICAgbGV0IG5hdHVyYWxXaWR0aCA9IHNpemUud2lkdGggfHwgMTtcbiAgICAgIGxldCBuYXR1cmFsSGVpZ2h0ID0gc2l6ZS5oZWlnaHQgfHwgMTtcblxuICAgICAgbGV0IGFzcGVjdFJhdGlvID0gbmF0dXJhbEhlaWdodCAvIG5hdHVyYWxXaWR0aDtcbiAgICAgIGxldCBzY2FsZWRIZWlnaHQgPSBjb250YWluZXJXaWR0aCAqIGFzcGVjdFJhdGlvO1xuICAgICAgXG4gICAgICBsZXQgY29sID0gdGhpcy5fZmluZE1pbkNvbChjb2xIZWlnaHRzKTtcbiAgICAgIGxldCBjaGVpZ2h0ID0gY29sSGVpZ2h0c1tjb2xdO1xuICAgICAgZWxlc1tpXS5zdHlsZS5sZWZ0ID0gbGVmdE9mZnNldCArIGNvbCAqIHcgKyBcInB4XCI7XG4gICAgICBlbGVzW2ldLnN0eWxlLnRvcCA9IGNoZWlnaHQgKyBcInB4XCI7XG4gICAgICBjb2xIZWlnaHRzW2NvbF0gKz0gTWF0aC5jZWlsKHNjYWxlZEhlaWdodCArIHRpdGxlSGVpZ2h0KTtcbiAgICB9XG5cbiAgICBsZXQgbWF4SGVpZ2h0ID0gTWF0aC5tYXguYXBwbHkoTWF0aCwgY29sSGVpZ2h0cyk7XG4gICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjbGF5b3V0XCIpLnN0eWxlLmhlaWdodCA9IG1heEhlaWdodCArIFwicHhcIjtcblxuICAgIG1hc29uYXJ5VGl0bGVzRGl2LmlubmVySFRNTCA9ICcnO1xuXG4gICAgdGhpcy5yZXF1ZXN0VXBkYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfZXN0aW1hdGVWaWV3SGVpZ2h0XG4gICAqIEBkZXNjcmlwdGlvbiBlc3RpbWF0ZSBoZWlnaHQgb2Ygdmlldywgc29tZSBpdGVtcyBkb24ndCBoYXZlIHNpemVzIGRlZmluZWRcbiAgICogXG4gICAqIEBwYXJhbSB7QXJyYXl9IGVsZXMgYXJyYXkgb2YgZWxlbWVudHNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHcgd2lkdGggb2YgZWFjaCBlbGVtZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBudW1Db2xzIG51bWJlciBvZiBjb2x1bW5zXG4gICAqL1xuICBfZXN0aW1hdGVWaWV3SGVpZ2h0KGVsZXM9W10sIHc9MzAwLCBudW1Db2xzPTMpIHtcbiAgICBpZiggIW51bUNvbHMgfHwgIXcgKSByZXR1cm47XG5cbiAgICBsZXQgY29sSGVpZ2h0cyA9IFtdO1xuICAgIGZvciggbGV0IGkgPSAwOyBpIDwgbnVtQ29sczsgaSsrICkgY29sSGVpZ2h0cy5wdXNoKDApO1xuXG4gICAgZm9yKCBsZXQgaSA9IDA7IGkgPCBlbGVzLmxlbmd0aDsgaSsrICkgeyBcbiAgICAgIGxldCBjb2wgPSB0aGlzLl9maW5kTWluQ29sKGNvbEhlaWdodHMpO1xuICAgICAgbGV0IGNoZWlnaHQgPSBjb2xIZWlnaHRzW2NvbF07XG4gICAgICBlbGVzW2ldLnN0eWxlLmxlZnQgPSBjb2wgKiB3ICsgXCJweFwiO1xuICAgICAgZWxlc1tpXS5zdHlsZS50b3AgPSBjaGVpZ2h0ICsgXCJweFwiO1xuICAgICAgY29sSGVpZ2h0c1tjb2xdICs9IHc7XG4gICAgfVxuXG4gICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjbGF5b3V0XCIpLnN0eWxlLmhlaWdodCA9IChlbGVzLmxlbmd0aCAvIG51bUNvbHMgKiB3ICsgMTAwKSArIFwicHhcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9maW5kTWluQ29sXG4gICAqIEBkZXNjcmlwdGlvbiBnaXZlbiBhbiBhcnJheSBvZiBjb2x1bW4gaGVpZ2h0cywgcmV0dXJuXG4gICAqIHRoZSBjb2x1bW4gaW5kZXggdGhhdCBoYXMgdGhlIG1pbiBoZWlnaHRcbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gY29sSGVpZ2h0cyBhcnJheSBvZiBoZWlnaHRzXG4gICAqL1xuICBfZmluZE1pbkNvbChjb2xIZWlnaHRzKSB7XG4gICAgbGV0IG1pbiA9IGNvbEhlaWdodHNbMF07XG4gICAgbGV0IG1pbkNvbCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBjb2xIZWlnaHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobWluID4gY29sSGVpZ2h0c1tpXSkge1xuICAgICAgICBtaW4gPSBjb2xIZWlnaHRzW2ldO1xuICAgICAgICBtaW5Db2wgPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWluQ29sO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uVG9nZ2xlRHJhd2VyXG4gICAqIEBkZXNjcmlwdGlvbiBmaXJlIGFuIGV2ZW50IGZvciBhcHAtc2VhcmNoIGluZGljYXRpbmcgdGhlIGRyYXdlciB0b2dnbGUgaGFzXG4gICAqIGJlZW4gY2xpY2tlZC5cbiAgICovXG4gIF9vblRvZ2dsZURyYXdlcigpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwidG9nZ2xlLWRyYXdlclwiKSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25QYWdlU2l6ZUNoYW5nZVxuICAgKiBAZGVzY3JpcHRpb24gYm91bmQgdG8gc2VsZWN0IGJveCBjaGFuZ2UgZXZlbnQsIGRpc3BhdGNoIGV2ZW50IHRvIHBhcmVudFxuICAgKiBhbGVydGluZyBuZXcgcGFnZSBzaXplXG4gICAqL1xuICBfb25QYWdlU2l6ZUNoYW5nZShlKSB7XG4gICAgbGV0IGRldGFpbCA9IHtcbiAgICAgIHN0YXJ0SW5kZXg6IDAsXG4gICAgICBpdGVtc1BlclBhZ2U6IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC52YWx1ZSlcbiAgICB9O1xuXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KFwicGFnZS1jaGFuZ2VcIiwge1xuICAgICAgICBkZXRhaWwsXG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGNvbXBvc2VkOiB0cnVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBfc2Nyb2xsVG9Db2xsZWN0aW9ucyhlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgIHRvcDogdGhpcy5vZmZzZXRIZWlnaHQgKyAxMDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCIsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfdXBkYXRlQ29sbGVjdGlvblJlc3VsdHNWaXNpYmlsaXR5XG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byBjb2xsZWN0aW9uIHZpc2liaWxpdHkgdXBkYXRlcyAoc2VlIGNvbnRydWN0b3IpLiAgRmlyZWRcbiAgICogdmlhIENvbGxlY3Rpb25Nb2RlbCB3aGljaCBkZWNpZGVzIGlmIGEgY29sbGVjdGlvbiBzZWFyY2ggc2hvdWxkIGJlIHByZWZvcm1lZC5cbiAgICovXG4gIF91cGRhdGVDb2xsZWN0aW9uUmVzdWx0c1Zpc2liaWxpdHkoc2hvdykge1xuICAgIHRoaXMuc2hvd0NvbGxlY3Rpb25SZXN1bHRzID0gc2hvdztcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gX29uU2VhcmNoVmNVcGRhdGUsIGZpcmVkIHdoZW4gcmVjb3JkIHNlYXJjaCB2aWV3Q29udHJvbGxlciB1cGRhdGVzXG4gICAqIEBwYXJhbSB7Kn0gZVxuICAgKi9cbiAgLy8gX29uU2VhcmNoVmNVcGRhdGUoZSkge1xuICAvLyAgIGlmIChlLnN0YXRlICE9PSBcImxvYWRlZFwiKSByZXR1cm47XG5cbiAgLy8gICB0aGlzLmxvZ2dlci5pbmZvKCdlLnBheWxvYWQucmVzdWx0cycsIGUucGF5bG9hZC5yZXN1bHRzKTtcblxuICAvLyAgIGxldCBjb2xsZWN0aW9ucyA9IFtdO1xuICAvLyAgIGUucGF5bG9hZC5yZXN1bHRzLmZvckVhY2goKHJlc3VsdCkgPT4ge1xuICAvLyAgICAgaWYgKFxuICAvLyAgICAgICByZXN1bHQuY29sbGVjdGlvbklkICYmXG4gIC8vICAgICAgICFjb2xsZWN0aW9ucy5pbmNsdWRlcyhyZXN1bHQuY29sbGVjdGlvbklkW1wiQGlkXCJdKVxuICAvLyAgICAgKSB7XG4gIC8vICAgICAgIGNvbGxlY3Rpb25zLnB1c2gocmVzdWx0LmNvbGxlY3Rpb25JZFtcIkBpZFwiXSk7XG4gIC8vICAgICB9XG4gIC8vICAgfSk7XG5cbiAgLy8gICB0aGlzLnRvdGFsQ29sbGVjdGlvbnMgPSBjb2xsZWN0aW9ucy5sZW5ndGg7XG4gIC8vICAgdGhpcy5sb2dnZXIuaW5mbygndGhpcy50b3RhbENvbGxlY3Rpb25zJywgdGhpcy50b3RhbENvbGxlY3Rpb25zKTtcblxuICAvLyB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uQ29sbGVjdGlvbkNsaWNrZWRcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIGFwcC1jb2xsZWN0aW9uLWNhcmQgY2xpY2sgZXZlbnRcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgY2xpY2t8a2V5dXAgZXZlbnRcbiAgICovXG4gIF9vbkNvbGxlY3Rpb25DbGlja2VkKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSBcImtleXVwXCIgJiYgZS53aGljaCAhPT0gMTMpIHJldHVybjtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gZS50YXJnZXQuZGF0YXNldC5jb2xsZWN0aW9uaWQ7XG4gICAgaWYgKGxvY2F0aW9uKSB7XG4gICAgICB0aGlzLkFwcFN0YXRlTW9kZWwuc2V0TG9jYXRpb24obG9jYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblJlY29yZENsaWNrZWRcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIGNsaWNrIGV2ZW50cyBvZiB0aGUgc2VhcmNoIHJlc3VsdCByZWNvcmQgY2FyZHMvbGlzdCBpdGVtc1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZSBjbGlja3xrZXl1cCBldmVudFxuICAgKi9cbiAgX29uUmVjb3JkQ2xpY2tlZChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChlLnR5cGUgPT09IFwia2V5dXBcIiAmJiBlLndoaWNoICE9PSAxMykgcmV0dXJuO1xuICAgIGNvbnN0IGxvY2F0aW9uID0gZS50YXJnZXQuZGF0YXNldC51cmw7XG4gICAgaWYgKGxvY2F0aW9uKSB7XG4gICAgICB0aGlzLkFwcFN0YXRlTW9kZWwuc2V0TG9jYXRpb24obG9jYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblBhZ2luYXRpb25DaGFuZ2VcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIGNsaWNrIGV2ZW50cyBvZiB0aGUgcGFnaW5hdGlvbiBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIGNsaWNrfGtleXVwIGV2ZW50XG4gICAqL1xuICBfb25QYWdpbmF0aW9uQ2hhbmdlKGUpIHtcbiAgICBlLmRldGFpbC5zdGFydEluZGV4ID0gZS5kZXRhaWwucGFnZSAqIHRoaXMubnVtUGVyUGFnZSAtIHRoaXMubnVtUGVyUGFnZTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJwYWdlLWNoYW5nZVwiLCB7XG4gICAgICAgIGRldGFpbDogZS5kZXRhaWwsXG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGNvbXBvc2VkOiB0cnVlXG4gICAgICB9KVxuICAgICk7XG5cbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYXBwLXNlYXJjaC1yZXN1bHRzLXBhbmVsXCIsIEFwcFNlYXJjaFJlc3VsdHNQYW5lbCk7XG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSBcImxpdFwiO1xuXG5pbXBvcnQgXCJAdWNkLWxpYi90aGVtZS1lbGVtZW50cy9icmFuZC91Y2QtdGhlbWUtcGFnaW5hdGlvbi91Y2QtdGhlbWUtcGFnaW5hdGlvbi5qc1wiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi8uLi8uLi8uLi9saWIvdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyKCkge1xuICByZXR1cm4gaHRtbGBcbiAgICA8c3R5bGUgaW5jbHVkZT1cInNoYXJlZC1zdHlsZXNcIj5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgbWFyZ2luOiAwIDVweDtcbiAgICAgIH1cblxuICAgICAgW2hpZGRlbl0ge1xuICAgICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgICB9XG5cbiAgICAgIC5oZWFkZXIge1xuICAgICAgICBmb250LXNpemU6IHZhcigtLWZzLXNtKTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTFweDtcbiAgICAgICAgbWFyZ2luLXRvcDogNXB4O1xuICAgICAgICBwYWRkaW5nOiAxLjVyZW07XG4gICAgICB9XG5cbiAgICAgIC5oZWFkZXIgPiAqIHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgIH1cblxuICAgICAgc2VsZWN0IHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWxpZ2h0LWJhY2tncm91bmQtY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgLW1zLWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgIC1vLWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMHB4O1xuICAgICAgICBwYWRkaW5nOiA1cHggMjVweCA1cHggMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogcmlnaHQgMTBweCBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogMTBweCAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhacFpYZENiM2c5SWpBZ01DQXhNQ0EySWo0OFpHVm1jejQ4YzNSNWJHVStMbU5zY3kweGUyWnBiR3c2SXpBd01qZzFOVHQ5UEM5emRIbHNaVDQ4TDJSbFpuTStQR2MrUEhCdmJIbG5iMjRnWTJ4aGMzTTlJbU5zY3kweElpQndiMmx1ZEhNOUlqQWdNQ0F4TUNBd0lEVWdOaUF3SURBaUx6NDhMMmMrUEM5emRtYytcIik7XG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb24teTogMTNweDtcbiAgICAgIH1cbiAgICAgIC8qIGZvciBJRSAqL1xuICAgICAgc2VsZWN0OjotbXMtZXhwYW5kIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cblxuICAgICAgdWNkLXRoZW1lLXBhZ2luYXRpb24ge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgcGFkZGluZy10b3A6IDFyZW07XG4gICAgICB9XG5cbiAgICAgIGgzIHtcbiAgICAgICAgLyogYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLWxpZ2h0LWJhY2tncm91bmQtY29sb3IpOyAqL1xuICAgICAgICBtYXJnaW46IDE1cHggMCAwIDA7XG4gICAgICAgIHBhZGRpbmc6IDE1cHggMCAwIDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1kZWZhdWx0LXByaW1hcnktY29sb3IpO1xuICAgICAgfVxuXG4gICAgICAuZ3JpZCB7XG4gICAgICAgIG1hcmdpbjogMTBweDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICAgIHdpZHRoOiA5NSU7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIG1pbm1heCgwLCAxZnIpKTtcbiAgICAgIH1cblxuICAgICAgLmdyaWQgZGFtcy1pdGVtLWNhcmQge1xuICAgICAgICBwYWRkaW5nOiAxLjVyZW07XG4gICAgICB9XG5cbiAgICAgIC5tYXNvbnJ5IHtcbiAgICAgICAgbWFyZ2luOiAxMHB4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIC8qIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGZsZXgtd3JhcDogd3JhcDsgKi9cbiAgICAgICAgd2lkdGg6IDk1JTtcbiAgICAgIH1cblxuICAgICAgLmxpc3Qge1xuICAgICAgICBtYXJnaW46IDEwcHg7XG4gICAgICB9XG5cbiAgICAgIC5saXN0IC5pdGVtIHtcbiAgICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTVweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2RhYWEwMDtcbiAgICAgICAgaGVpZ2h0OiAyNTBweDtcbiAgICAgIH1cblxuICAgICAgLnNwYWNlciB7XG4gICAgICAgIGhlaWdodDogMjBweDtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgdmFyKC0tbGlnaHQtYmFja2dyb3VuZC1jb2xvcik7XG4gICAgICB9XG5cbiAgICAgIC50b3RhbCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gICAgICAgIGZsZXg6IDI7XG4gICAgICB9XG5cbiAgICAgIC5tb2JpbGUtdG90YWwge1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICB9XG5cbiAgICAgIC5lcnJvciB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBoZWlnaHQ6IDI1MHB4O1xuICAgICAgICBjb2xvcjogcmVkO1xuICAgICAgfVxuXG4gICAgICAjbnVtUGVyUGFnZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgfVxuXG4gICAgICAuZHJhd2VyLXRvZ2dsZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogdmFyKC0tZnMtc20pO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiB2YXIoLS1mdy1ib2xkKTtcbiAgICAgICAgY29sb3I6IHZhcigtLWRlZmF1bHQtcHJpbWFyeS1jb2xvcik7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LWJhY2tncm91bmQtY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICB9XG4gICAgICAuZHJhd2VyLXRvZ2dsZSA+IHNwYW4ge1xuICAgICAgICBwYWRkaW5nOiAwIDEwcHg7XG4gICAgICB9XG4gICAgICAuZHJhd2VyLXRvZ2dsZSBpcm9uLWljb24ge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kZWZhdWx0LXNlY29uZGFyeS1jb2xvcik7XG4gICAgICB9XG5cbiAgICAgIC5kcmF3ZXItdG9nZ2xlW2Rpc2FibGVkXSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1saWdodC1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgICAgIH1cblxuICAgICAgLmNvbGxlY3Rpb25zIHtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgfVxuXG4gICAgICAuY29sbGVjdGlvbnMtY29udGVudCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5jb2xsZWN0aW9ucy1jb250ZW50IGRhbXMtY29sbGVjdGlvbi1jYXJkIHtcbiAgICAgICAgZmxleDogMzMuMzMlO1xuICAgICAgfVxuXG4gICAgICB1Y2RsaWItaWNvbiB7XG4gICAgICAgIGhlaWdodDogNDBweDtcblxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgcGFkZGluZzogOHB4IDA7XG5cbiAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB6LWluZGV4OiAwO1xuICAgICAgICBsaW5lLWhlaWdodDogMTtcbiAgICAgICAgd2lkdGg6IDQwcHg7XG4gICAgICAgIGhlaWdodDogNDBweDtcbiAgICAgICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xuICAgICAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94ICFpbXBvcnRhbnQ7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgIGZpbGw6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApO1xuICAgICAgfVxuXG4gICAgICAubWFzb25yeSB7XG4gICAgICAgIG1hcmdpbjogMTBweDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgfVxuXG4gICAgICAubWFzb25yeSAuaXRlbSB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAyNyU7XG4gICAgICAgIHBhZGRpbmc6IDEuNXJlbTtcbiAgICAgICAgLyogdmlzaWJpbGl0eTogaGlkZGVuOyAqL1xuICAgICAgICB0b3A6IDI1cHg7XG4gICAgICAgIGxlZnQ6IDI1cHg7XG4gICAgICAgIC8qIHdpbGwtY2hhbmdlOiB0b3AsIGxlZnQ7XG4gICAgICAgIHRyYW5zaXRpb246IHRvcCA1MDBtcyBlYXNlLW91dCwgbGVmdCA1MDBtcyBlYXNlLW91dDsgKi9cbiAgICAgIH1cblxuICAgICAgLnNlbGVjdGVkLWxheW91dCB7XG4gICAgICAgIGJveC1zaGFkb3c6IGluc2V0IC0ycHggMCAwIHZhcigtLWNvbG9yLWFnZ2llLWdvbGQpLFxuICAgICAgICAgIGluc2V0IDAgLTJweCAwIHZhcigtLWNvbG9yLWFnZ2llLWdvbGQpLFxuICAgICAgICAgIGluc2V0IDJweCAwIDAgdmFyKC0tY29sb3ItYWdnaWUtZ29sZCksXG4gICAgICAgICAgaW5zZXQgMCAycHggMCB2YXIoLS1jb2xvci1hZ2dpZS1nb2xkKTtcbiAgICAgIH1cblxuICAgICAgLmhlYWRlciBhIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtNzApO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB9XG5cbiAgICAgIC5oZWFkZXIgLnBob3RvLXN0YWNrIHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgfVxuXG4gICAgICAuaGVhZGVyIC5waG90by1zdGFjayB1Y2RsaWItaWNvbiB7XG4gICAgICAgIGZpbGw6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtNjApO1xuICAgICAgfVxuXG4gICAgICAuaGVhZGVyIHVjZGxpYi1pY29uIHtcbiAgICAgICAgcGFkZGluZzogNXB4O1xuICAgICAgfVxuXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogNTQ1cHgpIHtcbiAgICAgICAgLmdyaWQgZGFtcy1pdGVtLWNhcmQge1xuICAgICAgICAgIGZsZXg6IDEwMCU7XG4gICAgICAgICAgcGFkZGluZzogMS41cmVtO1xuICAgICAgICAgIG1heC13aWR0aDogODV2dztcbiAgICAgICAgfVxuICAgICAgICAuaGVhZGVyIHtcbiAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDAuNXJlbTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogMTAyM3B4KSB7XG4gICAgICAgIC5tYXNvbnJ5IC5pdGVtIHtcbiAgICAgICAgICB3aWR0aDogMzglICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgICAgIC50cnVuY2F0ZWQtdGV4dC1tb2JpbGUge1xuICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5tYXNvbnJ5IC5pdGVtIHtcbiAgICAgICAgICB3aWR0aDogODB2dyAhaW1wb3J0YW50O1xuICAgICAgICAgIC8qIHBvc2l0aW9uOiBpbml0aWFsOyAqL1xuICAgICAgICAgIC8qIG1hcmdpbjogYXV0bzsgKi9cbiAgICAgICAgICAvKiBwYWRkaW5nLWJvdHRvbTogLjVyZW07ICovXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDk3NXB4KSB7XG4gICAgICAgIC5oZWFkZXIge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIH1cbiAgICAgICAgLyogLm1vYmlsZS1oZWFkZXIge1xuICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIH0gKi9cbiAgICAgIH1cblxuICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDEwMjNweCkge1xuICAgICAgICAuZ3JpZCB7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgbWlubWF4KDAsIDFmcikpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAgICAgIC5ncmlkIHtcbiAgICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEsIG1pbm1heCgwLCAxZnIpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogMTE4MnB4KSB7XG4gICAgICAgIC50cnVuY2F0ZWQtdGV4dCB7XG4gICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogMTEzMHB4KSB7XG4gICAgICAgIC8qIFRPRE8gc3RhY2sgcGFnaW5hdGlvbiBBQk9WRSByZXN1bHQgY291bnQvbGluayAqL1xuICAgICAgICAuaGVhZGVyIHtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGluaGVyaXQ7XG4gICAgICAgIH1cblxuICAgICAgICAuaGVhZGVyLXJlc3VsdHMge1xuICAgICAgICAgIC8qIHBhZGRpbmctdG9wOiAxcmVtOyAqL1xuICAgICAgICB9XG5cbiAgICAgICAgLmhlYWRlci1wYWdpbmF0aW9uIHtcbiAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMXJlbTtcbiAgICAgICAgfVxuICAgICAgICAuaGVhZGVyLXBhZ2luYXRpb24gLmZpbGxlciB7XG4gICAgICAgICAgZmxleDogMztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAudGVhc2VyIHtcbiAgICAgICAgcGFkZGluZzogMS41cmVtOyBcbiAgICAgIH1cbiAgICAgIC50ZWFzZXJfX2ltYWdlIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2RjZGNkYztcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIHBhZGRpbmctdG9wOiA3NSU7XG4gICAgICB9XG4gICAgICAudGVhc2VyX190aXRsZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNkY2RjZGM7XG4gICAgICAgIGhlaWdodDogMS41cmVtO1xuICAgICAgICB3aWR0aDogODAlO1xuICAgICAgICBtYXJnaW46IC44cmVtIGF1dG8gMDtcbiAgICAgIH1cblxuICAgICAgLm1hc29ucnkge1xuICAgICAgICAvKiBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7ICovXG4gICAgICAgIGdhcDogMTZweDtcbiAgICAgIH1cblxuICAgICAgLm1hc29ucnkgLmNvbC0xLFxuICAgICAgLm1hc29ucnkgLmNvbC0yLFxuICAgICAgLm1hc29ucnkgLmNvbC0zIHtcbiAgICAgICAgZmxleDogMSAxIGNhbGMoMzMuMzMzJSAtIDE2cHgpO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgICB9XG5cbiAgICAgIC5tYXNvbnJ5IC50ZWFzZXIgLnRlYXNlcl9faW1hZ2Uge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGNkY2RjO1xuICAgICAgICBwYWRkaW5nLXRvcDogMDtcbiAgICAgIH1cblxuICAgICAgLm1hc29ucnkgLnRlYXNlciAudGVhc2VyX190aXRsZSB7XG4gICAgICAgIHBhZGRpbmc6IDhweDtcbiAgICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNkY2RjZGM7XG4gICAgICB9XG5cbiAgICAgIC5saXN0IC50ZWFzZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgfVxuICAgICAgLmxpc3QgLnRlYXNlcl9faW1hZ2Uge1xuICAgICAgICBoZWlnaHQ6IDI1MHB4O1xuICAgICAgICB3aWR0aDogMzMlO1xuICAgICAgICBwYWRkaW5nLXRvcDogMDtcbiAgICAgIH1cbiAgICAgIC5saXN0IC50ZWFzZXJfX2NvbnRlbnQge1xuICAgICAgICB3aWR0aDogNzUlO1xuICAgICAgICBtYXJnaW4tbGVmdDogM3JlbTtcbiAgICAgIH1cbiAgICAgIC5saXN0IC50ZWFzZXJfX3RpdGxlIHtcbiAgICAgICAgbWFyZ2luOiAuOHJlbSBhdXRvIDAgMDtcbiAgICAgIH1cbiAgICAgIC5saXN0IC50ZWFzZXJfX2NvbnRlbnQgLnRlYXNlcl9fZGV0YWlscyB7XG4gICAgICAgIHBhZGRpbmctdG9wOiAxcmVtO1xuICAgICAgICB3aWR0aDogODAlO1xuICAgICAgICBtYXJnaW46IC44cmVtIGF1dG8gMCAwO1xuICAgICAgfVxuICAgICAgLmxpc3QgLnRlYXNlcl9fY29udGVudCAudGVhc2VyX19kZXRhaWxzID4gKiB7XG4gICAgICAgIG1hcmdpbjogMC41cmVtIDA7XG4gICAgICAgIGhlaWdodDogMXJlbTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2RjZGNkYzsgXG4gICAgICB9XG5cbiAgICAgIC5tYXNvbnJ5LXRpdGxlcyAuY29sbGVjdGlvbi1uYW1lIHtcbiAgICAgICAgcGFkZGluZzogMTVweCBjYWxjKDEuNXJlbSArIDE1cHgpO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBsaW5lLWhlaWdodDogMS4zO1xuICAgICAgICBmb250LXNpemU6IDAuOTVyZW07XG4gICAgICB9XG4gICAgPC9zdHlsZT5cblxuICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItcmVzdWx0c1wiIHN0eWxlPVwiZmxleDogMi4yNTsgZGlzcGxheTogZmxleDtcIj5cbiAgICAgICAgPGRpdiBzdHlsZT1cImZsZXg6IDIuMjU7IG1hcmdpbjogYXV0bzsgbWluLWhlaWdodDogMi4xcmVtO1wiID9oaWRkZW49XCIkeyF0aGlzLnRvdGFsICYmIHRoaXMudG90YWwgIT09IDB9XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBob3RvLXN0YWNrXCI+XG4gICAgICAgICAgICA8dWNkbGliLWljb25cbiAgICAgICAgICAgICAgc3R5bGU9XCJjdXJzb3I6IGF1dG87XCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rX19pbWFnZVwiXG4gICAgICAgICAgICAgIGljb249XCJ1Y2RsaWItZGFtczpwaG90by1zdGFja1wiXG4gICAgICAgICAgICA+PC91Y2RsaWItaWNvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgICA8c3BhbiBzdHlsZT1cImZvbnQtd2VpZ2h0OiBib2xkXCI+JHt1dGlscy5mb3JtYXROdW1iZXJXaXRoQ29tbWFzKHRoaXMudG90YWwpfSR7dGhpcy50b3RhbCA9PT0gMTAwMDAgPyAnKycgOiAnJ30gaXRlbTxzcGFuIGNsYXNzPVwidHJ1bmNhdGVkLXRleHRcIj4gcmVzdWx0PC9zcGFuPiR7dGhpcy50b3RhbCA9PT0gMSA/ICcnIDogJ3MnfTwvc3Bhbj48c3BhbiA/aGlkZGVuPVwiJHt0aGlzLnRvdGFsQ29sbGVjdGlvbnMgPT09IDB9XCI+XG4gICAgICAgICAgICBmcm9tXG4gICAgICAgICAgICA8YSBocmVmPVwiXCIgQGNsaWNrPVwiJHt0aGlzLl9zY3JvbGxUb0NvbGxlY3Rpb25zfVwiPiR7dGhpcy50b3RhbENvbGxlY3Rpb25zfSBjb2xsZWN0aW9uJHt0aGlzLnRvdGFsQ29sbGVjdGlvbnMgPiAxID8gJ3MnIDogJyd9PC9hPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1wYWdpbmF0aW9uXCJcbiAgICAgICAgc3R5bGU9XCJmbGV4OiAzOyBkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IGVuZFwiPlxuICAgICAgICA8c3BhbiBzdHlsZT1cInRleHQtYWxpZ246IHJpZ2h0OyBtYXJnaW46IGF1dG8gMDsgcGFkZGluZy1yaWdodDogLjVyZW07IHBhZGRpbmctbGVmdDogNXB4O1wiPkRpc3BsYXk6PC9zcGFuPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDx1Y2RsaWItaWNvblxuICAgICAgICAgICAgaWNvbj1cInVjZGxpYi1kYW1zOnJlc3VsdC1kaXNwbGF5LWdyaWRcIlxuICAgICAgICAgICAgQGNsaWNrPVwiJHt0aGlzLl9vbkxheW91dFRvZ2dsZX1cIlxuICAgICAgICAgICAgdHlwZT1cImdyaWRcIlxuICAgICAgICAgICAgY2xhc3M9XCJncmlkLWxheW91dC1pY29uIHNlbGVjdGVkLWxheW91dFwiPlxuICAgICAgICAgIDwvdWNkbGliLWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDx1Y2RsaWItaWNvblxuICAgICAgICAgICAgaWNvbj1cInVjZGxpYi1kYW1zOnJlc3VsdC1kaXNwbGF5LW1vc2FpY1wiXG4gICAgICAgICAgICBAY2xpY2s9XCIke3RoaXMuX29uTGF5b3V0VG9nZ2xlfVwiXG4gICAgICAgICAgICB0eXBlPVwibW9zYWljXCJcbiAgICAgICAgICAgIGNsYXNzPVwibW9zYWljLWxheW91dC1pY29uXCI+XG4gICAgICAgICAgPC91Y2RsaWItaWNvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHVjZGxpYi1pY29uXG4gICAgICAgICAgICBpY29uPVwidWNkbGliLWRhbXM6cmVzdWx0LWRpc3BsYXktbGlzdFwiXG4gICAgICAgICAgICBAY2xpY2s9XCIke3RoaXMuX29uTGF5b3V0VG9nZ2xlfVwiXG4gICAgICAgICAgICB0eXBlPVwibGlzdFwiXG4gICAgICAgICAgICBjbGFzcz1cImxpc3QtbGF5b3V0LWljb25cIj5cbiAgICAgICAgICA8L3VjZGxpYi1pY29uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsbGVyXCI+PC9kaXY+XG5cbiAgICAgICAgPHNlbGVjdCBpZD1cIm51bVBlclBhZ2VcIiBAY2hhbmdlPVwiJHt0aGlzLl9vblBhZ2VTaXplQ2hhbmdlfVwiPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI1MFwiPjUwPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjIwXCIgc2VsZWN0ZWQ+MjA8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMTBcIj4xMDwvb3B0aW9uPlxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPGRpdiBzdHlsZT1cIm1hcmdpbjogMCAxMHB4OyBmb250LXNpemU6IC44NzVyZW07IG1hcmdpbjogYXV0byAwIGF1dG8gMC41cmVtXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0cnVuY2F0ZWQtdGV4dC1tb2JpbGVcIj5pdGVtczwvc3Bhbj4gcGVyIHBhZ2VcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgP2hpZGRlbj1cIiR7dGhpcy5zaG93RXJyb3J9XCI+XG4gICAgICA8ZGl2ID9oaWRkZW49XCIke3RoaXMuc2hvd0xvYWRpbmd9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJncmlkXCIgP2hpZGRlbj1cIiR7IXRoaXMubG9hZGluZyB8fCAhdGhpcy5pc0dyaWRMYXlvdXR9XCI+XG4gICAgICAgICAgJHtbMSwyLDMsNCw1LDYsNyw4LjksMTBdLm1hcChcbiAgICAgICAgICAgICgpID0+IGh0bWxgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZWFzZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhc2VyX19pbWFnZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZWFzZXJfX3RpdGxlXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PiAgXG4gICAgICAgICAgICBgXG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdyaWRcIiBpZD1cImdyaWRMYXlvdXRcIiA/aGlkZGVuPVwiJHshdGhpcy5pc0dyaWRMYXlvdXR9XCI+XG4gICAgICAgICAgJHt0aGlzLnJlc3VsdHMubWFwKFxuICAgICAgICAgICAgKHJlcykgPT4gaHRtbGBcbiAgICAgICAgICAgICAgPGRhbXMtaXRlbS1jYXJkXG4gICAgICAgICAgICAgICAgLmRhdGE9XCIke3Jlc31cIlxuICAgICAgICAgICAgICAgIGRhdGEtdXJsPVwiJHtyZXMuaWR9XCJcbiAgICAgICAgICAgICAgICBAY2xpY2s9JHt0aGlzLl9vblJlY29yZENsaWNrZWR9XG4gICAgICAgICAgICAgID48L2RhbXMtaXRlbS1jYXJkPlxuICAgICAgICAgICAgYFxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtYXNvbnJ5XCIgP2hpZGRlbj1cIiR7IXRoaXMubG9hZGluZyB8fCAhdGhpcy5pc01vc2FpY0xheW91dH1cIiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhc2VyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZWFzZXJfX2ltYWdlXCIgc3R5bGU9XCJoZWlnaHQ6IDM1MHB4O1wiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhc2VyX190aXRsZVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+ICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZWFzZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYXNlcl9faW1hZ2VcIiBzdHlsZT1cImhlaWdodDogMTUwcHg7XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZWFzZXJfX3RpdGxlXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj4gIFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYXNlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhc2VyX19pbWFnZVwiIHN0eWxlPVwiaGVpZ2h0OiAzMDBweDtcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYXNlcl9fdGl0bGVcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PiAgXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhc2VyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZWFzZXJfX2ltYWdlXCIgc3R5bGU9XCJoZWlnaHQ6IDIwMHB4O1wiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhc2VyX190aXRsZVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+ICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZWFzZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYXNlcl9faW1hZ2VcIiBzdHlsZT1cImhlaWdodDogMjc1cHg7XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZWFzZXJfX3RpdGxlXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj4gIFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYXNlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhc2VyX19pbWFnZVwiIHN0eWxlPVwiaGVpZ2h0OiAyMDBweDtcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYXNlcl9fdGl0bGVcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PiAgXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhc2VyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZWFzZXJfX2ltYWdlXCIgc3R5bGU9XCJoZWlnaHQ6IDI1MHB4O1wiPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhc2VyX190aXRsZVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+ICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZWFzZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYXNlcl9faW1hZ2VcIiBzdHlsZT1cImhlaWdodDogMTUwcHg7XCI+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZWFzZXJfX3RpdGxlXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj4gIFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYXNlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhc2VyX19pbWFnZVwiIHN0eWxlPVwiaGVpZ2h0OiAyNTBweDtcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYXNlcl9fdGl0bGVcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PiAgXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hc29ucnlcIiBpZD1cImxheW91dFwiID9oaWRkZW49XCIkeyF0aGlzLmlzTW9zYWljTGF5b3V0fVwiPlxuICAgICAgICAgICR7dGhpcy5yZXN1bHRzLm1hcChcbiAgICAgICAgICAgIChyZXMpID0+IGh0bWxgXG4gICAgICAgICAgICAgIDxhcHAtc2VhcmNoLWdyaWQtcmVzdWx0XG4gICAgICAgICAgICAgICAgLmRhdGE9XCIke3Jlc31cIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiaXRlbVwiXG4gICAgICAgICAgICAgICAgZGF0YS11cmw9XCIke3Jlcy5pZH1cIlxuICAgICAgICAgICAgICAgIEBjbGljaz0ke3RoaXMuX29uUmVjb3JkQ2xpY2tlZH1cbiAgICAgICAgICAgICAgICBAcmVuZGVyZWQ9JHt0aGlzLl9vbkdyaWRJdGVtUmVuZGVyZWR9XG4gICAgICAgICAgICAgID48L2FwcC1zZWFyY2gtZ3JpZC1yZXN1bHQ+XG4gICAgICAgICAgICBgXG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpc3RcIiA/aGlkZGVuPVwiJHshdGhpcy5pc0xpc3RMYXlvdXR9XCI+XG4gICAgICAgICAgPGRpdiA/aGlkZGVuPVwiJHshdGhpcy5sb2FkaW5nfVwiPlxuICAgICAgICAgICAgJHtbMSwyLDMsNCw1LDYsNyw4LjksMTBdLm1hcChcbiAgICAgICAgICAgICAgKCkgPT4gaHRtbGBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhc2VyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhc2VyX19pbWFnZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYXNlcl9fY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhc2VyX190aXRsZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhc2VyX19kZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+ICBcbiAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAke3RoaXMucmVzdWx0cy5tYXAoXG4gICAgICAgICAgICAocmVzKSA9PiBodG1sYFxuICAgICAgICAgICAgICA8YXBwLXNlYXJjaC1saXN0LXJlc3VsdFxuICAgICAgICAgICAgICAgIC5kYXRhPVwiJHtyZXN9XCJcbiAgICAgICAgICAgICAgICBkYXRhLXVybD1cIiR7cmVzLmlkfVwiXG4gICAgICAgICAgICAgICAgQGNsaWNrPSR7dGhpcy5fb25SZWNvcmRDbGlja2VkfVxuICAgICAgICAgICAgICA+PC9hcHAtc2VhcmNoLWxpc3QtcmVzdWx0PlxuICAgICAgICAgICAgYFxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZXJyb3JcIiA/aGlkZGVuPVwiJHshdGhpcy5zaG93RXJyb3J9XCI+XG4gICAgICA8ZGl2PiR7dGhpcy5lcnJvck1zZ308L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDx1Y2QtdGhlbWUtcGFnaW5hdGlvblxuICAgICAgP2hpZGRlbj1cIiR7dGhpcy5wYWdpbmF0aW9uVG90YWwgPCAyfVwiXG4gICAgICBjdXJyZW50LXBhZ2U9JHt0aGlzLmN1cnJlbnRQYWdlfVxuICAgICAgbWF4LXBhZ2VzPSR7dGhpcy5wYWdpbmF0aW9uVG90YWx9XG4gICAgICBAcGFnZS1jaGFuZ2U9JHt0aGlzLl9vblBhZ2luYXRpb25DaGFuZ2V9XG4gICAgICB4cy1zY3JlZW5cbiAgICAgIGVsbGlwc2VzPlxuICAgIDwvdWNkLXRoZW1lLXBhZ2luYXRpb24+XG5cbiAgICA8ZGl2XG4gICAgICA/aGlkZGVuPVwiJHshdGhpcy50b3RhbE92ZXJNYXhXaW5kb3cgJiYgdGhpcy50b3RhbCAhPT0gMTAwMDB9XCJcbiAgICAgIHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyXCJcbiAgICAgIGNsYXNzPVwibGltaXQtcmVzdWx0c1wiXG4gICAgPlxuICAgICAgRGlnaXRhbCBDb2xsZWN0aW9ucyBsaW1pdHMgcmVzdWx0cyB0byAxMCwwMDAuIFVzZSBrZXl3b3JkcyBhbmQvb3IgZmlsdGVyc1xuICAgICAgdG8gcmVmaW5lIHNlYXJjaC5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJtYXNvbnJ5LXRpdGxlc1wiIHN0eWxlPVwidmlzaWJpbGl0eTogaGlkZGVuOyBwb3NpdGlvbjogYWJzb2x1dGU7IGJvdHRvbTogMDtcIj5cbiAgICA8L2Rpdj5cbiAgYDtcbn1cbiIsImltcG9ydCB7IExpdEVsZW1lbnQgfSBmcm9tIFwibGl0XCI7XG5cbmltcG9ydCByZW5kZXIgZnJvbSBcIi4vYXBwLXJhbmdlLXNsaWRlci50cGwuanNcIjtcblxuaW1wb3J0IHsgTWl4aW4sIExpdENvcmtVdGlscyB9IGZyb20gJ0B1Y2QtbGliL2NvcmstYXBwLXV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwUmFuZ2VTbGlkZXIgZXh0ZW5kcyBNaXhpbihMaXRFbGVtZW50KS53aXRoKFxuICBMaXRDb3JrVXRpbHNcbikge1xuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIGFic29sdXRlIG1pbi9tYXggdmFsdWVzIGZvciBzbGlkZXJcbiAgICAgIGFic01pblZhbHVlOiB7IHR5cGU6IE51bWJlciwgYXR0cmlidXRlOiBcImFicy1taW4tdmFsdWVcIiB9LCAvLyBvYnNlcnZlciA6ICdfcmVuZGVyQXN5bmMnIH0sXG4gICAgICBhYnNNYXhWYWx1ZTogeyB0eXBlOiBOdW1iZXIsIGF0dHJpYnV0ZTogXCJhYnMtbWF4LXZhbHVlXCIgfSwgLy8gb2JzZXJ2ZXIgOiAnX3JlbmRlckFzeW5jJyB9LFxuXG4gICAgICAvLyBjdXJyZW50IG1pbi9tYXggdmFsdWVzIGZvciBzbGlkZXIgKHdoZXJlIHRoZSBidG5zIGFyZSlcbiAgICAgIG1pblZhbHVlOiB7IHR5cGU6IE51bWJlciwgYXR0cmlidXRlOiBcIm1pbi12YWx1ZVwiIH0sIC8vIG9ic2VydmVyIDogJ19yZW5kZXJBc3luYycgfSxcbiAgICAgIG1heFZhbHVlOiB7IHR5cGU6IE51bWJlciwgYXR0cmlidXRlOiBcIm1heC12YWx1ZVwiIH0sIC8vIG9ic2VydmVyIDogJ19yZW5kZXJBc3luYycgfSxcblxuICAgICAgLy8gbGFiZWxzIGZvciBzbGlkZSBidG5zXG4gICAgICBtaW5WYWx1ZUxhYmVsOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgbWF4VmFsdWVMYWJlbDogeyB0eXBlOiBTdHJpbmcgfSxcblxuICAgICAgLy8gY3VycmVudCB3aWRnZXQgc2l6ZSBpbmZvXG4gICAgICAvLyB1c2VkIHNvIHdlIGRvbid0IGhhdmUgdG8gYXNrIHRoZSBET00gb24gZWFjaCByZW5kZXJcbiAgICAgIHdpZHRoOiB7IHR5cGU6IE51bWJlciB9LFxuICAgICAgaGVpZ2h0OiB7IHR5cGU6IE51bWJlciB9LFxuICAgICAgYnRuSGVpZ2h0OiB7IHR5cGU6IE51bWJlciB9LFxuXG4gICAgICAvLyBzdHJpbmcgdGhhdCBpbmRpY2F0ZSB0eXBlIG9mIG1vdmVcbiAgICAgIG1vdmluZzogeyB0eXBlOiBTdHJpbmcgfSxcblxuICAgICAgLy8gZGlmZmVyZW50IG1vdmluZyBmbGFncyBmb3IgYmluZGluZyBVSSBlbGVtZW50IGNsYXNzZXNcbiAgICAgIG1vdmluZ01pbjogeyB0eXBlOiBCb29sZWFuIH0sXG4gICAgICBtb3ZpbmdNYXg6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgaXNNb3Zpbmc6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmFic01pblZhbHVlID0gMDtcbiAgICB0aGlzLmFic01heFZhbHVlID0gMTAwO1xuICAgIHRoaXMubWluVmFsdWUgPSAxMDtcbiAgICB0aGlzLm1heFZhbHVlID0gOTA7XG4gICAgdGhpcy5taW5WYWx1ZUxhYmVsID0gXCJcIjtcbiAgICB0aGlzLm1heFZhbHVlTGFiZWwgPSBcIlwiO1xuICAgIHRoaXMud2lkdGggPSAxO1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgdGhpcy5idG5IZWlnaHQgPSAxO1xuICAgIHRoaXMubW92aW5nID0gXCJcIjtcbiAgICB0aGlzLm1vdmluZ01pbiA9IGZhbHNlO1xuICAgIHRoaXMubW92aW5nTWF4ID0gZmFsc2U7XG4gICAgdGhpcy5pc01vdmluZyA9IGZhbHNlO1xuICAgIHRoaXMuaGFzUmVuZGVyZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuX3dpbmRvd1Jlc2l6ZUxpc3RlbmVyID0gdGhpcy5fb25SZXNpemUuYmluZCh0aGlzKTtcbiAgICB0aGlzLl93aW5kb3dNb3VzZUxpc3RlbmVyID0gdGhpcy5fb25Nb3ZlU3RvcC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIChlKSA9PiB0aGlzLl9vbk1vdmUoZSkpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCAoZSkgPT4gdGhpcy5fb25Nb3ZlKGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvbm5lY3RlZENhbGxiYWNrXG4gICAqIEBkZXNjcmlwdGlvbiBzZXR1cCBvdXIgd2luZG93IG1vdXNlIGxpc3RlbmVycywgZmlyZSBmaXJzdCByZW5kZXJcbiAgICovXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLl93aW5kb3dSZXNpemVMaXN0ZW5lcik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX3dpbmRvd01vdXNlTGlzdGVuZXIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgdGhpcy5fd2luZG93TW91c2VMaXN0ZW5lcik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLl93aW5kb3dNb3VzZUxpc3RlbmVyKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsIHRoaXMuX3dpbmRvd01vdXNlTGlzdGVuZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGlzY29ubmVjdGVkQ2FsbGJhY2tcbiAgICogQGRlc2NyaXB0aW9uIHJlbW92ZSBvdXIgd2luZG93IG1vdXNlIGxpc3RlbmVyc1xuICAgKi9cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLl93aW5kb3dSZXNpemVMaXN0ZW5lcik7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX3dpbmRvd01vdXNlTGlzdGVuZXIpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgdGhpcy5fd2luZG93TW91c2VMaXN0ZW5lcik7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLl93aW5kb3dNb3VzZUxpc3RlbmVyKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsIHRoaXMuX3dpbmRvd01vdXNlTGlzdGVuZXIpO1xuICB9XG5cbiAgd2lsbFVwZGF0ZShlKSB7XG4gICAgaWYgKCF0aGlzLmhhc1JlbmRlcmVkKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9vblJlc2l6ZSgpO1xuICAgICAgICB0aGlzLl9yZW5kZXJBc3luYygpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmhhc1JlbmRlcmVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25SZXNpemVcbiAgICogQGRlc2NyaXB0aW9uIGNhY2hlIHRoZSBlbGVtZW50IHNpemUgc28gd2UgZG9uJ3QgaGF2ZSB0byBsb29rIGl0IHVwXG4gICAqIG9uIGVhY2ggcmVuZGVyIG9mIGJ0biBhbmQgbGluZSBwb3NpdGlvbnMuICBUaGVuIGZpcmUgcmVuZGVyIHRvIG1ha2VcbiAgICogc3VyZSBldmVyeXRoaW5nIGlzIHZpc3VhbGx5IGNvcnJlY3QuXG4gICAqL1xuICBfb25SZXNpemUoKSB7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMub2Zmc2V0V2lkdGggfHwgMTtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMub2Zmc2V0SGVpZ2h0O1xuICAgIHRoaXMubGVmdCA9IHRoaXMub2Zmc2V0TGVmdDtcbiAgICBsZXQgbG93TnVtYmVyQnRuID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjbG93TnVtYmVyQnRuXCIpO1xuICAgIGlmIChsb3dOdW1iZXJCdG4pIHtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgICB0aGlzLmJ0bkhlaWdodCA9IDI1O1xuICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX3ZhbHVlVG9QeFxuICAgKiBAZGVzY3JpcHRpb24gZ2l2ZW4gYSBudW1iZXIgbGluZSB2YWx1ZSwgcmV0dXJuIHB4IGxvY2F0aW9uIHJlbGF0aXZlXG4gICAqIHRvIHRoZSB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIG51bWJlciBsaW5lIHZhbHVlXG4gICAqXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IHB4IGxvY2F0aW9uXG4gICAqL1xuICBfdmFsdWVUb1B4KHZhbHVlKSB7XG4gICAgdmFsdWUgPSB2YWx1ZSAtIHRoaXMuYWJzTWluVmFsdWU7XG4gICAgbGV0IHJhbmdlID0gdGhpcy5hYnNNYXhWYWx1ZSAtIHRoaXMuYWJzTWluVmFsdWU7XG4gICAgbGV0IHZhbFBlclB4ID0gcmFuZ2UgLyB0aGlzLndpZHRoO1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlIC8gdmFsUGVyUHgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX3B4VG9WYWx1ZVxuICAgKiBAZGVzY3JpcHRpb24gZ2l2ZW4gYSBweCBsb2NhdGlvbiwgcmV0dXJuIG51bWJlciBsaW5lIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBweCBsb2NhdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSB2YWx1ZVxuICAgKi9cbiAgX3B4VG9WYWx1ZShweCkge1xuICAgIGxldCByYW5nZSA9IHRoaXMuYWJzTWF4VmFsdWUgLSB0aGlzLmFic01pblZhbHVlO1xuICAgIGxldCB2YWxQZXJQeCA9IHJhbmdlIC8gdGhpcy53aWR0aDtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChweCAqIHZhbFBlclB4KSArIHRoaXMuYWJzTWluVmFsdWU7XG4gIH1cblxuICBfcmVuZGVyQXN5bmMoKSB7XG4gICAgaWYgKHRoaXMucmVuZGVyVGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlbmRlclRpbWVyKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlclRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlclRpbWVyID0gMDtcbiAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX3JlbmRlclxuICAgKiBAZGVzY3JpcHRpb24gc2V0IHRoZSBjdXJyZW50IHRvcC9sZWZ0IHB4IHZhbHVlcyBmb3IgYWxsIGJ0bnMsXG4gICAqIGxhYmVscyBhbmQgbGluZXMgYmFzZXMgb24gY3VycmVudCBtaW4vbWF4IHZhbHVlcy5cbiAgICovXG4gIF9yZW5kZXIoKSB7XG4gICAgbGV0IGhoID0gdGhpcy5oZWlnaHQgKiAwLjY7XG5cbiAgICAvLyBzZXQgbGluZSBoZWlnaHRzXG4gICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjbnVtYmVyTGluZVwiKS5zdHlsZS50b3AgPSBoaCArIFwicHhcIjtcbiAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNmaWxsTGluZVwiKS5zdHlsZS50b3AgPSBoaCArIFwicHhcIjtcblxuICAgIC8vIHNldCBidG4gaGVpZ2h0c1xuICAgIGxldCBoQnRuSGVpZ2h0ID0gdGhpcy5idG5IZWlnaHQgLyAyO1xuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI2xvd051bWJlckJ0blwiKS5zdHlsZS50b3AgPVxuICAgICAgaGggLSBoQnRuSGVpZ2h0ICsgXCJweFwiO1xuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI2hpZ2hOdW1iZXJCdG5cIikuc3R5bGUudG9wID1cbiAgICAgIGhoIC0gaEJ0bkhlaWdodCArIFwicHhcIjtcblxuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI2xvd051bWJlckxhYmVsXCIpLnN0eWxlLnRvcCA9XG4gICAgICBoaCAtIGhCdG5IZWlnaHQgLSAyMiArIFwicHhcIjtcbiAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNoaWdoTnVtYmVyTGFiZWxcIikuc3R5bGUudG9wID1cbiAgICAgIGhoIC0gaEJ0bkhlaWdodCAtIDIyICsgXCJweFwiO1xuXG4gICAgLy8gc2V0IGJ0biBsZWZ0XG4gICAgbGV0IGx2ID1cbiAgICAgIHRoaXMubWluVmFsdWUgPCB0aGlzLmFic01pblZhbHVlID8gdGhpcy5hYnNNaW5WYWx1ZSA6IHRoaXMubWluVmFsdWU7XG4gICAgbGV0IHV2ID1cbiAgICAgIHRoaXMubWF4VmFsdWUgPiB0aGlzLmFic01heFZhbHVlID8gdGhpcy5hYnNNYXhWYWx1ZSA6IHRoaXMubWF4VmFsdWU7XG5cbiAgICBsZXQgbWluUHhWYWx1ZSA9IHRoaXMuX3ZhbHVlVG9QeChsdik7XG4gICAgbGV0IG1heFB4VmFsdWUgPSB0aGlzLl92YWx1ZVRvUHgodXYpO1xuXG4gICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjbG93TnVtYmVyQnRuXCIpLnN0eWxlLmxlZnQgPVxuICAgICAgbWluUHhWYWx1ZSAtIGhCdG5IZWlnaHQgKyBcInB4XCI7XG4gICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjaGlnaE51bWJlckJ0blwiKS5zdHlsZS5sZWZ0ID1cbiAgICAgIG1heFB4VmFsdWUgLSBoQnRuSGVpZ2h0ICsgXCJweFwiO1xuXG4gICAgdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjbG93TnVtYmVyTGFiZWxcIikuc3R5bGUubGVmdCA9XG4gICAgICBtaW5QeFZhbHVlIC0gaEJ0bkhlaWdodCArIFwicHhcIjtcbiAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNoaWdoTnVtYmVyTGFiZWxcIikuc3R5bGUubGVmdCA9XG4gICAgICBtYXhQeFZhbHVlIC0gaEJ0bkhlaWdodCArIFwicHhcIjtcblxuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI2ZpbGxMaW5lXCIpLnN0eWxlLmxlZnQgPSBtaW5QeFZhbHVlICsgXCJweFwiO1xuICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI2ZpbGxMaW5lXCIpLnN0eWxlLndpZHRoID1cbiAgICAgIG1heFB4VmFsdWUgLSBtaW5QeFZhbHVlICsgXCJweFwiO1xuXG4gICAgdGhpcy5taW5WYWx1ZUxhYmVsID0gdGhpcy5taW5WYWx1ZTtcbiAgICB0aGlzLm1heFZhbHVlTGFiZWwgPSB0aGlzLm1heFZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uTW92ZVN0YXJ0XG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byBidG5zIGFuZCBjZW50ZXIgbGluZS4gIEZpcmVkIHdoZW4gdGhlIHVzZXIgbW91c2VzXG4gICAqIGRvd24gb24gZWxlbWVudCBpbmRpY2F0aW5nIGEgbW92ZSBpcyBzdGFydGluZ1xuICAgKlxuICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGVcbiAgICovXG4gIF9vbk1vdmVTdGFydChlKSB7XG4gICAgdGhpcy5tb3ZpbmcgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwicHJvcFwiKTtcblxuICAgIGlmICh0aGlzLm1vdmluZyA9PT0gXCJyYW5nZVwiKSB7XG4gICAgICB0aGlzLnN0YXJ0UmFuZ2UgPSB7XG4gICAgICAgIG1pbjogZS5jdXJyZW50VGFyZ2V0Lm9mZnNldExlZnQsXG4gICAgICAgIG1heDogZS5jdXJyZW50VGFyZ2V0Lm9mZnNldExlZnQgKyBlLmN1cnJlbnRUYXJnZXQub2Zmc2V0V2lkdGgsXG4gICAgICAgIGxlZnQ6IGUucGFnZVggLSB0aGlzLmxlZnQsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMuaXNNb3ZpbmcgPSB0cnVlO1xuICAgIHRoaXMubW92aW5nTWluID0gdGhpcy5tb3ZpbmcgPT09IFwibWF4XCIgPyBmYWxzZSA6IHRydWU7XG4gICAgdGhpcy5tb3ZpbmdNYXggPSB0aGlzLm1vdmluZyA9PT0gXCJtaW5cIiA/IGZhbHNlIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbk1vdmVcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIG1vdXNlbW92ZSBldmVudCBvbiB0aGlzIGVsZW1lbnQuICBVcGRhdGUgbWluL21heFxuICAgKiB2YWx1ZXMgYmFzZWQgb24gdHlwZSBvZiBtb3ZlIHRoYXQgaXMgaGFwcGVuaW5nIGllIG1pbiwgbWF4IG9yIHJhbmdlLiAgRG9lc1xuICAgKiBub3RoaW5nIGlmIHdlIGFyZSBub3QgbW92aW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGVcbiAgICovXG4gIF9vbk1vdmUoZSkge1xuICAgIGlmICghdGhpcy5tb3ZpbmcpIHJldHVybjtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBoYW5kbGUgYm90aCBtb3VzZSBhbmQgdG91Y2ggZXZlbnRcbiAgICBsZXQgbGVmdDtcbiAgICBpZiAoZS50eXBlID09PSBcInRvdWNobW92ZVwiKSB7XG4gICAgICBpZiAoIWUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoKSByZXR1cm47XG4gICAgICBsZWZ0ID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIHRoaXMubGVmdDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGVmdCA9IGUucGFnZVggLSB0aGlzLmxlZnQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubW92aW5nID09PSBcIm1pblwiKSB7XG4gICAgICB0aGlzLm1pblZhbHVlID0gdGhpcy5fcHhUb1ZhbHVlKGxlZnQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb3ZpbmcgPT09IFwibWF4XCIpIHtcbiAgICAgIHRoaXMubWF4VmFsdWUgPSB0aGlzLl9weFRvVmFsdWUobGVmdCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1vdmluZyA9PT0gXCJyYW5nZVwiKSB7XG4gICAgICBsZXQgZGlmZiA9IHRoaXMuc3RhcnRSYW5nZS5sZWZ0IC0gbGVmdDtcblxuICAgICAgdGhpcy5taW5WYWx1ZSA9IHRoaXMuX3B4VG9WYWx1ZSh0aGlzLnN0YXJ0UmFuZ2UubWluIC0gZGlmZik7XG4gICAgICB0aGlzLm1heFZhbHVlID0gdGhpcy5fcHhUb1ZhbHVlKHRoaXMuc3RhcnRSYW5nZS5tYXggLSBkaWZmKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5taW5WYWx1ZSA8IHRoaXMuYWJzTWluVmFsdWUpIHtcbiAgICAgIHRoaXMubWluVmFsdWUgPSB0aGlzLmFic01pblZhbHVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5tYXhWYWx1ZSA+IHRoaXMuYWJzTWF4VmFsdWUpIHtcbiAgICAgIHRoaXMubWF4VmFsdWUgPSB0aGlzLmFic01heFZhbHVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1pblZhbHVlID4gdGhpcy5tYXhWYWx1ZSkge1xuICAgICAgaWYgKHRoaXMubW92aW5nID09PSBcIm1pblwiKSB0aGlzLm1pblZhbHVlID0gdGhpcy5tYXhWYWx1ZTtcbiAgICAgIGVsc2UgdGhpcy5tYXhWYWx1ZSA9IHRoaXMubWluVmFsdWU7XG4gICAgfVxuICAgIHRoaXMuaGFzUmVuZGVyZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbk1vdmVTdG9wXG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byBtb3VzZXVwL21vdXNlb3V0IGV2ZW50IG9uIHdpbmRvdy4gIEl0J3MgYWx3YXlzIGJlc3QgdG8gYmluZFxuICAgKiB0aGlzIHRvIHRoZSB3aW5kb3cgYXMgYSBjYXRjaCBhbGwuICBSZXNldHMgYWxsIG1vdmluZyBmbGFnc1xuICAgKi9cbiAgX29uTW92ZVN0b3AoKSB7XG4gICAgaWYgKCF0aGlzLm1vdmluZykgcmV0dXJuO1xuXG4gICAgdGhpcy5tb3ZpbmcgPSBcIlwiO1xuICAgIHRoaXMubW92aW5nTWluID0gZmFsc2U7XG4gICAgdGhpcy5tb3ZpbmdNYXggPSBmYWxzZTtcbiAgICB0aGlzLmlzTW92aW5nID0gZmFsc2U7XG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJyYW5nZS12YWx1ZS1jaGFuZ2VcIiwge1xuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBtaW46IHRoaXMubWluVmFsdWUsXG4gICAgICAgICAgbWF4OiB0aGlzLm1heFZhbHVlLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuaGFzUmVuZGVyZWQgPSBmYWxzZTtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJhcHAtcmFuZ2Utc2xpZGVyXCIsIEFwcFJhbmdlU2xpZGVyKTtcbiIsImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQnO1xuaW1wb3J0IHsgc2hhcmVkU3R5bGVzIH0gZnJvbSAnLi4vc3R5bGVzL3NoYXJlZC1zdHlsZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXIoKSB7IFxuICByZXR1cm4gaHRtbGBcblxuXG48c3R5bGU+XG4gICR7c2hhcmVkU3R5bGVzfVxuICA6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGhlaWdodDogNTBweDtcbiAgICBtYXJnaW46IDAgMTNweDtcblxuICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTsgLyogaU9TIFNhZmFyaSAqL1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7IC8qIFNhZmFyaSAqL1xuICAgIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTsgLyogS29ucXVlcm9yIEhUTUwgKi9cbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lOyAvKiBGaXJlZm94ICovXG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lOyAvKiBJbnRlcm5ldCBFeHBsb3Jlci9FZGdlICovXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7IC8qIE5vbi1wcmVmaXhlZCB2ZXJzaW9uLCBjdXJyZW50bHkgKi9cbiAgfVxuXG4gICNudW1iZXJMaW5lIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdCA6IDA7XG4gICAgcmlnaHQgOiAwO1xuICAgIGhlaWdodDogM3B4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LWJhY2tncm91bmQtY29sb3IsICM4ODgpO1xuICB9XG5cbiAgI2ZpbGxMaW5lIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgY3Vyc29yOiBtb3ZlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApIDtcbiAgICBoZWlnaHQ6IDNweDtcbiAgfVxuXG4gIC5idG4ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBoZWlnaHQ6IDI1cHg7XG4gICAgd2lkdGg6IDI1cHg7XG4gICAgY3Vyc29yOiBtb3ZlO1xuICB9XG5cbiAgLmJ0biA+IGRpdiB7XG4gICAgbWFyZ2luOiA1cHg7XG4gICAgaGVpZ2h0OiAxNXB4O1xuICAgIHdpZHRoOiAxNXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS04MCkgO1xuICAgIHRyYW5zaXRpb246IGFsbCAxNTBtcyBsaW5lYXI7XG4gIH1cblxuICAuYnRuW21vdmluZ10gPiBkaXYge1xuICAgIG1hcmdpbjogMHB4O1xuICAgIGhlaWdodDogMjVweDtcbiAgICB3aWR0aDogMjVweDtcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICB9XG5cbiAgLmxhYmVsIHtcbiAgICB3aWR0aCA6IDI1cHg7XG4gICAgZm9udC1zaXplOiAxMnB4OyBcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDIwMG1zIGxpbmVhcjtcbiAgICBjb2xvcjogdmFyKC0tZGVmYXVsdC1wcmltYXJ5LWNvbG9yKTtcbiAgfVxuXG4gIC5sYWJlbFttb3ZpbmddIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICB9XG5cbjwvc3R5bGU+XG5cbjxkaXYgaWQ9XCJudW1iZXJMaW5lXCI+PC9kaXY+XG5cbjxkaXYgaWQ9XCJmaWxsTGluZVwiIFxuICBwcm9wPVwicmFuZ2VcIiBcbiAgQG1vdXNlZG93bj1cIiR7dGhpcy5fb25Nb3ZlU3RhcnR9XCIgXG4gIEB0b3VjaHN0YXJ0PVwiJHt0aGlzLl9vbk1vdmVTdGFydH1cIj5cbjwvZGl2PlxuXG48ZGl2IGlkPVwibG93TnVtYmVyTGFiZWxcIiBjbGFzcz1cImxhYmVsXCIgP21vdmluZz1cIiR7dGhpcy5pc01vdmluZ31cIj4ke3RoaXMubWluVmFsdWVMYWJlbH08L2Rpdj5cbjxkaXYgaWQ9XCJoaWdoTnVtYmVyTGFiZWxcIiBjbGFzcz1cImxhYmVsXCIgP21vdmluZz1cIiR7dGhpcy5pc01vdmluZ31cIj4ke3RoaXMubWF4VmFsdWVMYWJlbH08L2Rpdj5cblxuPGRpdiBpZD1cImxvd051bWJlckJ0blwiIFxuICBjbGFzcz1cImJ0blwiIFxuICBwcm9wPVwibWluXCIgXG4gIEBtb3VzZWRvd249XCIke3RoaXMuX29uTW92ZVN0YXJ0fVwiIFxuICBAdG91Y2hzdGFydD1cIiR7dGhpcy5fb25Nb3ZlU3RhcnR9XCIgXG4gID9tb3Zpbmc9XCIke3RoaXMubW92aW5nTWlufVwiID5cbiAgPGRpdj48L2Rpdj5cbjwvZGl2PlxuXG48ZGl2IGlkPVwiaGlnaE51bWJlckJ0blwiIFxuICBjbGFzcz1cImJ0blwiIFxuICBwcm9wPVwibWF4XCIgXG4gIEBtb3VzZWRvd249XCIke3RoaXMuX29uTW92ZVN0YXJ0fVwiIFxuICBAdG91Y2hzdGFydD1cIiR7dGhpcy5fb25Nb3ZlU3RhcnR9XCIgXG4gID9tb3Zpbmc9XCIke3RoaXMubW92aW5nTWF4fVwiPlxuICA8ZGl2PjwvZGl2PlxuPC9kaXY+XG5cbmA7fSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==