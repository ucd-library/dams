import { LitElement } from "lit";
import render from "./app-media-viewer.tpl";
import { MainDomElement } from '@ucd-lib/theme-elements/utils/mixins';
import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';


import "@polymer/iron-pages";

import "./app-image-viewer";
// import "./app-360-image-viewer"
import "./app-video-viewer";
import "./app-audio-viewer";

import "./app-media-viewer-nav";
import "./app-image-viewer-lightbox";

import "@ucd-lib/cork-app-utils";
import utils from "../../../../lib/utils";

import "../../../components/bookreader/ucdlib-bookreader.js";

export default class AppMediaViewer extends Mixin(LitElement)
  .with(MainDomElement, LitCorkUtils) {

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
      noMedia: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.active = true;

    this._injectModel("AppStateModel", "RecordModel", "FcAppConfigModel", "CollectionModel", "BookReaderModel");
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

    this.$ = {};
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

    let mediaGroups = e.selectedRecord?.clientMedia?.mediaGroups;
    
    if (!mediaGroups || !mediaGroups.length || !mediaGroups.filter(m => m['@type'].length > 0).length ) {
      // try to at least load a single image as fallback
      let thumbnailUrl = utils.getThumbnailFromClientMedia(e?.selectedRecord?.clientMedia);
      if( thumbnailUrl ) {
        this.mediaType = 'image';
      } else {
        this.noMedia = true;        
        this.logger.error('No recognized types found in media groups for record', e.selectedRecord?.clientMedia?.id || e.selectedRecord);      
      }
      return; 
    }

    this.itemId = e.selectedRecord?.graph?.root?.['@id'];    

    // to check for imageList first, otherwise default to pdf for bookreader
    let mediaGroup = mediaGroups.filter(m => m['@shortType'].includes('ImageList'))[0];
    if( mediaGroup ){
      mediaType = 'image';
      let hasPdf = mediaGroups.filter(m => m.clientMedia?.pdf);
      if( hasPdf.length ) renderAsBr = true;
    }

    if( !mediaGroup ) {
      mediaGroups.forEach((media) => {
        let type = utils.getMediaType(media);
        if (type && !mediaGroup) {
          mediaType = type.toLowerCase().replace(/object/i, "");
          mediaGroup = media;
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

    // check for any overrides at collection/item level for the image viewer
    let itemId = e.selectedRecord?.graph?.root?.['@id'];
    let collectionId = e.selectedRecord?.graph?.root?.isPartOf?.filter(p => p['@id'].includes('/collection/'))?.[0]?.['@id'];

    let displayType = await this._getItemDisplayType(itemId, collectionId);

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
    if( (mediaGroup?.['@shortType'] || []).includes('ImageObject') || mediaGroup?.clientMedia?.pages?.length === 1 ) {
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
      (!this.overrideImageList && mediaGroup.clientMedia && mediaGroup.clientMedia.pdf)
    ) {
      mediaType = "bookreader";
      this.isBookReader = true;
      let brData;
      if (renderAsBr && !mediaGroup.clientMedia?.pdf?.manifest) {
        this.bookData = utils.buildIaReaderPages(
          mediaGroup.hasPart || mediaGroup,
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
      this.bookItemId = mediaGroup["@id"];

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
