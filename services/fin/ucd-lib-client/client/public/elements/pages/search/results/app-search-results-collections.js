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
      showResults : { type : Boolean },
      currentPage : { type : Number },
      paginationTotal : { type : Number }
    }
  }

  constructor() {
    super();
    this.active = true;
    this.render = render.bind(this);

    this.results = [];
    this.showResults = false;
    this.currentPage = 1;
    this.paginationTotal = 1;

    this._injectModel('AppStateModel', 'SearchVcModel', 'CollectionModel');
  }

  willUpdate(e) {
    let pagination = this.shadowRoot.querySelector('ucd-theme-pagination');
    if( pagination ) {
      pagination.shadowRoot.querySelector('.pager__item--previous > a').style.backgroundColor = '';
      pagination.shadowRoot.querySelector('.pager__item--next > a').style.backgroundColor = '';
    }
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
   * @description _onSearchVcUpdate, fired when record search viewController updates
   * @param {*} e 
   */
  _onSearchVcUpdate(e) {
    if( e.state !== 'loaded' ) return;

    this.results = e.payload.matchedCollections;
    this.showResults = this.results.length > 0;
  }

}

customElements.define('app-search-results-collections', AppSearchResultsCollections);