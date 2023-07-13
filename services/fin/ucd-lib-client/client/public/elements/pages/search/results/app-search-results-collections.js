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
      resultsDisplay : { type : Array }, // filtered results
      showResults : { type : Boolean },
      currentPage : { type : Number },
      paginationTotal : { type : Number }
    }
  }

  constructor() {
    super();
    this.active = true;
    this.render = render.bind(this);

    this.resultsDisplay = [];
    this.results = [];
    this.showResults = false;
    this.currentPage = 1;
    this.paginationTotal = 1;

    this._injectModel('AppStateModel', 'FiltersModel');
  }

  willUpdate(e) {
    let pagination = this.shadowRoot.querySelector('ucd-theme-pagination');
    if( pagination ) {
      pagination.shadowRoot.querySelector('.pager__item--previous > a').style.backgroundColor = '';
      pagination.shadowRoot.querySelector('.pager__item--next > a').style.backgroundColor = '';
    }
  }

  _onAppStateUpdate(e) {
    if( e.location.page !== 'search' ) return;
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
    e.buckets = e.buckets.filter(b => !b.key.includes('oac.cdlib.org'));

    this.results = e.buckets.map(r => {
      return {
        '@id' : r.key,
        // todo other data needed?
      };
    });
    this.showResults = this.results.length > 0;
    this.resultsDisplay = [...this.results];
    this.filterDisplayResults();
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
    this.resultsDisplay = [...this.results.filter(r => collectionIds.includes(r['@id']))];
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
}

customElements.define('app-search-results-collections', AppSearchResultsCollections);