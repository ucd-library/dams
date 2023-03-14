import { LitElement} from 'lit';
import "@polymer/iron-pages/iron-pages"
import "./app-filter-panel"
import "../app-collection-info-panel"
import "../../../utils/app-tabs"

import render from "./app-filters-panel.tpl.js"

// init facet filters from template
import config from "../../../../lib/config"
const facetFilters = [];
for( var key in config.elasticSearch.facets ) {
  let c = config.elasticSearch.facets[key];
  facetFilters.push({
    label : c.label,
    type : c.type,
    ignore : c.ignore,
    valueMap : c.valueMap,
    isDollar : c.isDollar,
    includeTypeahead : c.typeahead ? true : false,
    typeaheadField : c.typeahead,
    filter : key
  });
}


class AppFiltersPanel extends Mixin(LitElement)
      .with(LitCorkUtils) {

  static get properties() {
    return {
      facetFilters : { type : Array },
      selectedTab : { type : String },
      selectedCollection : { type : Object },
      collectionMode : { type : Boolean },
      tabs : { type : Array }
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.active = true;
    this._injectModel('AppStateModel');

    this.facetFilters = facetFilters;
    this.selectedTab = '';
    this.selectedCollection = {};
    this.collectionMode = false;
    this.tabs = [
      {label : 'Information', value: 'info'},
      {label : 'Filters', value: 'filters'}
    ];
  }

  firstUpdated() {
    this._onSelectedCollectionUpdate();
  }

  /**
   * @method _onSelectedCollectionUpdate
   * @description CollectionInterface, render the iron-pages and current collection
   */
  _onSelectedCollectionUpdate(selected) {
    if( !selected ) {
      this.selectedTab = 'filters';
      this.collectionMode = false;
      return;
    } 
    
    this.collectionMode = true;
    this.selectedCollection = selected;
    
    if( !this.selectedTab ) this.selectedTab = 'info';
  }

  /**
   * @method _fireToggleDrawer
   * @description called from toggle button, dispatches event for app-search to handle hiding drawer;
   */
  _fireToggleDrawer() {
    this.dispatchEvent(new CustomEvent('toggle-drawer'));
  }

  /**
   * @method _removeCollectionFilter
   * @description fired from hard coded collection filter checkbox.  Remove
   * collection filter when clicked
   */
  _removeCollectionFilter() {
    let searchDoc = this._getCurrentSearchDocument();
    this._removeKeywordFilter(searchDoc, 'isPartOf.@id');
    this._setPaging(searchDoc, 0);
    this.RecordModel.setSearchLocation(searchDoc);
  }
}

customElements.define('app-filters-panel', AppFiltersPanel);