import { LitElement } from 'lit';

import render from "./app-browse-by.tpl.js";

import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';

import "../components/cards/dams-collection-card";

import config from '../../lib/config';

/**
 * @class AppBrowseBy
 * @description base class for the browse by [facet] page elements
 * 
 * Bound to app-state-update, rendering when the url matches /browse/[id] where
 * element id is.  You must provide facet-query-name and label as well.
 * 
 * Three slots are available for images; 'header-icon', 'left-image' and 'right-image'
 * 
 * @property {String} id required so page is rendered on correct app-state-update event
 * @property {String} facet-query-name the record property to be queried on
 * @property {String} label nice label text for query facet
 * @property {Array} sortByOptions override this property to change the default sorts
 */
export default class AppBrowseBy extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      facetQueryName : {type: String, attribute: 'facet-query-name'},
      label : {type: String},
      sideImages : {type: Array},
      sideImageIndex : {type: Number},
      leftImgUrl : {type: String},
      rightImgUrl : {type: String},
      sortByOptions : {type: Array},
      results : {type: Array},
      collectionResults : {type: Array},
      totalResults : {type: Number},
      resultsPerPage : {type: Number},
      currentIndex : {type: Number},
      totalPages : {type: Number},
      currentPage : {type: Number},
      isCollectionPage : {type: Boolean}
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.sortByOptions = [
      {label : 'A-Z', type: 'key', dir : 'asc', selected: true},
      {label : 'Item Quantity', dir : 'dsc', type: 'count'}
    ];

    this.reset();

    this._injectModel('BrowseByModel', 'AppStateModel', 'RecordModel', 'FcAppConfigModel', 'CollectionModel');
  }

  async firstUpdated() {
    this._onAppStateUpdate(await this.AppStateModel.get());
    this.isCollectionPage = this.label.toLowerCase() === 'collection';
    if( this.isCollectionPage ) {
      this.sortByOptions = [
        {label : 'A-Z', type: 'key', dir : 'asc', selected: true},
        {label : 'Recent', dir : 'dsc', type: 'key'},
        {label : 'Item Quantity', dir : 'dsc', type: 'count'}
      ];
    }
    
    let browseByImages = await this.FcAppConfigModel.getDefaultImagesConfig();
    if( browseByImages ) {
      browseByImages = browseByImages.body.browseByImages;
      switch (this.label.toLowerCase()) {
        case 'subject':
          this.sideImages = browseByImages.subjectPage;
          break;
        case 'creator':
          this.sideImages = browseByImages.creatorPage;
          break;  
        case 'format':
          this.sideImages = browseByImages.formatPage;
          break;
        default:
          this.sideImages = [];
          break;
      }  
    }

    this._updateSideImages();
    this._loadResults();
  }

  /**
   * @method reset
   * @description reset search properties
   */
  reset() {
    this.sideImages = [];
    this.sideImageIndex = 0;
    this.leftImgUrl = '';
    this.rightImgUrl = '';
    this.results = [];
    this.collectionResults = [];
    this.totalResults = 0;
    this.resultsPerPage = 30;
    this.currentIndex = 0;
    this.totalPages = 1;
    this.currentPage = 1;
    this.label = '';
    this.isCollectionPage = false;
  }

  /**
   * @method _onAppStateUpdate
   * @description bound to AppStateModel app-state-update event
   * 
   * @param {Object} e 
   * @returns {Promise} 
   */
  _onAppStateUpdate(e) {
    if( e.location.page !== 'browse' ) return;
    if( e.location.path.length < 2 ) return;
    if( e.location.path[1] !== this.id ) return; // the page
    
    this.isCollectionPage = this.label.toLowerCase() === 'collection';
    this._loadResults();
  }

  /**
   * @method _loadResults
   * @description load results based on currentPage
   */
  async _loadResults() {    
    this.resultsPerPage = this.isCollectionPage ? 15 : 30;

    if( this.AppStateModel.location && this.AppStateModel.location.path.length > 2 ) {
      this.resultsPerPage = parseInt(this.AppStateModel.location.path[2] || this.resultsPerPage);
      this.currentIndex = parseInt(this.AppStateModel.location.path[3]) || 0;
    } else {
      this.currentIndex = 0;
    }    

    this.currentPage = this.currentIndex ? (this.currentIndex / this.resultsPerPage) + 1 : 1;
    
    if( this.totalResults === 0 ) {
      this.loading = true;
      if( this.isCollectionPage ) { 
        await this._searchBrowseByCollections();        
      } else {
        this.allResults = await this.BrowseByModel.getFacets(this.facetQueryName);
        this.totalResults = this.allResults.payload.length;
      }
      
      this.loading = false;
    }

    this.totalPages = this.totalResults / this.resultsPerPage < 1 ? 1 : Math.ceil(this.totalResults / this.resultsPerPage);
    let pagination = this.shadowRoot.querySelector('ucd-theme-pagination');
    if( pagination ) pagination.requestUpdate('maxPages', this.totalPages);

    this._renderResults();
  }

  /**
   * @method _renderResults
   * @description render the results array based on currentPage and sort
   * params
   */
  _renderResults() {
    if( this.isCollectionPage ) {
      this._renderCollections();
      return;
    }

    let sort = this.sortByOptions.find(item => item.selected);
    
    if( this.sortedAs !== sort.type ) {
      this.allResults.payload.sort((a, b) => {
        if( sort.type === 'count' ) {
          if( a[sort.type] > b[sort.type] ) return (sort.dir === 'asc') ? 1 : -1;
          if( a[sort.type] < b[sort.type] ) return (sort.dir === 'asc') ? -1 : 1;
          return 0;
        } else {
          if( a[sort.type].toLowerCase() > b[sort.type].toLowerCase() ) return (sort.dir === 'asc') ? 1 : -1;
          if( a[sort.type].toLowerCase() < b[sort.type].toLowerCase() ) return (sort.dir === 'asc') ? -1 : 1;
          return 0;   
        }
      });
      this.sortedAs = sort.type;
    }
    
    this.results = this.allResults.payload.slice(
      this.currentIndex, 
      this.currentIndex + this.resultsPerPage 
    );

    this._updateSideImages();
  }

  /**
   * @method _renderCollections
   * @description render the results array of collections based on currentPage and sort
   * params
   */
  _renderCollections() {
    let sort = this.sortByOptions.find(item => item.selected);
    
    if( this.sortedAs !== sort.type ) {
      if( sort.type === 'count' ) {
        this.allResults.sort((a, b) => {
          if( a[sort.type] > b[sort.type] ) return (sort.dir === 'asc') ? 1 : -1;
          if( a[sort.type] < b[sort.type] ) return (sort.dir === 'asc') ? -1 : 1;
          return 0;
        });
      } else {
        // sort by title
        this.allResults.sort((a, b) => {
          if( a.title.toLowerCase() > b.title.toLowerCase() ) return (sort.dir === 'asc') ? 1 : -1;
          if( a.title.toLowerCase() < b.title.toLowerCase() ) return (sort.dir === 'asc') ? -1 : 1;
          return 0;   
        });
      }
    }  

    this.collectionResults = this.allResults.slice(
      this.currentIndex, 
      this.currentIndex + this.resultsPerPage 
    );
    
    this.results = this.allResults.slice(
      this.currentIndex, 
      this.currentIndex + this.resultsPerPage 
    );

    this._updateSideImages();
  }

  async _searchBrowseByCollections() {
    let sort = {};
    let sortBy = this.sortByOptions.filter(s => s.selected)[0];
    
    if( sortBy.label === 'A-Z' ) {
      sort = {"name" : "asc"};
    } else if( sortBy.label === 'Recent' ) {
      sort = {"@graph.yearPublished" : "desc"};
    } else {
      sort = {"@graph.itemCount" : "desc"};
    }
    let searchDocument = {
      text : '',
      filters : {},
      sort : [
        sort
      ],
      limit : 0,
      offset : 0,
      facets : {}
    }

    this.allResults = await this.CollectionModel.search(searchDocument);
    this.allResults = this.allResults.payload.results.map(r => {
      return {
        thumbnailUrl : r.root.image?.['@id'], 
        title : r.root.name,
        count : r.root.itemCount,
        id : r.root['@id']
      }
    });

    if( sortBy.type === 'count' ) {
      this.allResults.sort((a, b) => {
        if( a[sortBy.type] > b[sortBy.type] ) return (sortBy.dir === 'asc') ? 1 : -1;
        if( a[sortBy.type] < b[sortBy.type] ) return (sortBy.dir === 'asc') ? -1 : 1;
        return 0;
      });
    } else {
      // sort by title
      this.allResults.sort((a, b) => {
        if( a.title.toLowerCase() > b.title.toLowerCase() ) return (sortBy.dir === 'asc') ? 1 : -1;
        if( a.title.toLowerCase() < b.title.toLowerCase() ) return (sortBy.dir === 'asc') ? -1 : 1;
        return 0;   
      });
    }
    
    this.collectionResults = this.allResults.slice(
      this.currentIndex, 
      this.currentIndex + this.resultsPerPage 
    );

    this.totalResults = this.allResults.length;
    
    // this.shadowRoot.querySelectorAll('dams-collection-card').forEach(c => c.requestUpdate());
  }

  /**
   * @method _updateSideImages
   * @description update side images based on selected page, curated groups from Kimmy
   */
  _updateSideImages() {
    if( !this.sideImages || (this.sideImages && !this.sideImages.length) ) {
      this.leftImgUrl = '';
      this.rightImgUrl = '';
      return;
    }
    this.sideImageIndex = this.currentPage - 1;
    if( this.currentPage > this.sideImages.length ) {
      while( this.sideImageIndex + 1 > this.sideImages.length ) {
        this.sideImageIndex -= this.sideImages.length;
      }
    }

    this.leftImgUrl = this.sideImages[this.sideImageIndex].leftImgUrl;
    this.rightImgUrl = this.sideImages[this.sideImageIndex].rightImgUrl;
  }

  /**
   * @method _onPageClicked
   * @description bound to ucd-theme-pagination nav event
   * 
   * @param {Object} e 
   */
  _onPageClicked(e) {
    this.currentPage = e.detail.page;
    this.currentIndex = (this.currentPage - 1) * this.resultsPerPage;
    let path = '/browse/'+this.id+'/'+this.resultsPerPage;
    if( this.currentIndex > 0 ) {
      path += '/'+this.currentIndex;
    }
    this.AppStateModel.setLocation(path);
    this._renderResults();
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
   * @method _onSortChange
   * @description bound to sort radio button change events
   * 
   * @param {Object} e 
   */
  _onSortChange(e) {
    let sortIndex = parseInt(e.currentTarget.getAttribute('index'));
    this.sortByOptions.forEach((item, index) => item.selected = (index === sortIndex));
    this.currentIndex = 0;
    this.currentPage = 1;
    if( this.isCollectionPage ) {
      this._searchBrowseByCollections();
    }
    this._renderResults();
  }

  /**
   * @method getFilterUrl
   * @description used by UI to create anchor tag urls for search queries
   * based on given facet
   * 
   * @param {Object} item facet result item 
   * @returns {String}
   */
  getFilterUrl(item) {
    let searchDocument = this.RecordModel.emptySearchDocument();
    this.RecordModel.appendKeywordFilter(searchDocument, this.facetQueryName, item.key);
    return '/search/'+this.RecordModel.searchDocumentToUrl(searchDocument);
  }

}

customElements.define('app-browse-by', AppBrowseBy);
