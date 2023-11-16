import { LitElement } from 'lit';
import render from "./app-search-results-collections.tpl.js";

import "../../../components/cards/dams-collection-card";
import "@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon";
import '../../../utils/app-icons';

class AppSearchResultsCollections extends Mixin(LitElement)
      .with(LitCorkUtils) {

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
    this.render = render.bind(this);

    this.resultsDisplayed = [];
    this.results = [];
    this.showResults = false;
    this.currentPage = 1;
    this.paginationTotal = 1;
    this.resultsPerPage = 6;

    this._injectModel('AppStateModel', 'FiltersModel', 'SearchVcModel');
  }

  _onAppStateUpdate(e) {
    if( e.location.page !== 'search' ) return;
    this.filterDisplayResults();
    this._updateResultsDisplayed();
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

    this.results = e.buckets.map(r => {
      return {
        '@id' : r.key,
        // todo other data needed?
      };
    });

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

    let collections = this.shadowRoot.querySelector(".collections-in-search");
    if (collections && scrollTo) {
      window.scrollTo({
        top: window.scrollY + collections.getBoundingClientRect().y - 100,
        left: 0,
        behavior: "smooth",
      });
    }
    
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