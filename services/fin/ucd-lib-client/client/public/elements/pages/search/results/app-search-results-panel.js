import { LitElement } from "lit";
import render from "./app-search-results-panel.tpl.js";

import "./app-search-grid-result";
import "./app-search-list-result";
import "../../../utils/app-collection-card";
// import "../filtering/app-top-active-filters";
import "../../../components/cards/dams-collection-card";
import "../../../components/cards/dams-item-card";

import "@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon";
import "../../../utils/app-icons";

const SEARCH_RESULTS_LAYOUT = "search-results-layout";
let initIsListLayout = localStorage.getItem(SEARCH_RESULTS_LAYOUT);

class AppSearchResultsPanel extends Mixin(LitElement).with(LitCorkUtils) {
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
    };
  }

  constructor() {
    super();
    this.active = true;
    this.render = render.bind(this);

    this.results = [];
    this.collectionResults = [];
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

    this.totalCollections = 0;
    this.total = "0";
    this.numPerPage = 20;
    this.currentIndex = 0;
    this.currentPage = 1;
    this.showCollectionResults = false;
    this.showError = false;
    this.showLoading = false;
    this.errorMsg = false;
    this.paginationTotal = false;
    this.totalOverMaxWindow = false;

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

  /**
   * @method _onAppStateUpdate
   * @description from AppStateInterface, called when app state updates
   *
   * @param {Object} e
   */
  _onAppStateUpdate(e) {
    if (e.location.page !== "search") return;
    this._setSelectedDisplay();
    this._resizeAsync();
    this.filterDisplayResults();
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
    
    this.collectionResults = e.buckets.map(r => {
      return {
        '@id' : r.key,
      };
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

    let collectionIds = decodedUrl.split('@graph.isPartOf.@id","or","')[1].split('"]')[0].split(',');
    this.totalCollections = collectionIds.length;
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
    this.results = [];
    this.showHeaderFooter = true;
    this.showError = false;
    clearTimeout(this.showLoadingTimer);
    this.showLoading = false;

    requestAnimationFrame(() => {
      this.total = total;
      // make sure we don't have a page the returns results > 10000k
      let t = Math.floor((10000 - numPerPage) / numPerPage) * numPerPage;
      if (total > t) {
        total = t;
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
        this.currentIndex === 0 ? 1 : this.currentIndex / 10 + 1;

      requestAnimationFrame(() => this._resize());
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
    let type = e.currentTarget.getAttribute("type");
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

    // if( !this.isListLayout ) {
    requestAnimationFrame(() => this._resize());
    // }
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
    if (this.resizeTimer !== -1) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.resizeTimer = -1;
      this._resize();
    }, 50);
  }

  _onGridItemRendered(e) {
    this._resize();
  }

  /**
   * @method _resize
   * @description resize masonary layout
   */
  _resize() {
    if( this.isListLayout ) return;
    let firstDiv = this.shadowRoot
      .querySelector("#layout")
      .querySelector("app-search-grid-result");
    if( !firstDiv ) return;

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
    for (let i = 0; i < eles.length; i++) {
      let col = this._findMinCol(colHeights);
      let cheight = colHeights[col];

      eles[i].style.left = leftOffset + col * w + "px";
      eles[i].style.top = cheight + "px";
      // eles[i].style.visibility = 'visible';

      colHeights[col] += eles[i].offsetHeight + 25;
    }

    let maxHeight = Math.max.apply(Math, colHeights);
    this.shadowRoot.querySelector("#layout").style.height = maxHeight + "px";
    this.requestUpdate();
    window.scrollTo(0, 0);
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
    this.dispatchEvent(
      new CustomEvent("page-size-change", {
        detail: { itemsPerPage: parseInt(e.currentTarget.value) },
        bubbles: true,
        composed: true
      })
    );
  }

  _scrollToCollections(e) {
    e.preventDefault();

    let pagination = this.shadowRoot.querySelector("ucd-theme-pagination");
    if (pagination) {
      window.scrollTo({
        top: pagination.offsetTop + 100,
        left: 0,
        behavior: "smooth",
      });
    }
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

  //   console.log('e.payload.results', e.payload.results);

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
  //   console.log('this.totalCollections', this.totalCollections);

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
    e.detail.startIndex = e.detail.page * 10 - 10;
    // this.currentPage = e.detail.page - 1;
    this.dispatchEvent(
      new CustomEvent("page-change", {
        detail: e.detail,
        bubbles: true,
        composed: true
      })
    );
  }
}

customElements.define("app-search-results-panel", AppSearchResultsPanel);
