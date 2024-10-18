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
      queryTerm: { type: String }
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

    this.$ = {};

    // window.addEventListener(
    //   "BookReader:SearchCallback",
    //   this._onSearchResultsChange.bind(this)
    // );

    // window.addEventListener(
    //   "BookReader:SearchCallbackEmpty",
    //   this._onSearchResultsEmpty.bind(this)
    // );

    // window.addEventListener(
    //   "BookReader:SearchGoToResult",
    //   this._onBRSearchGoToResult.bind(this)
    // );
  }

  async firstUpdated() {
    this.$.lightbox = document.getElementById("lightbox");
    if (!this.$.lightbox) this.$.lightbox = document.getElementById("lightbox");

    this._onAppStateUpdate(await this.AppStateModel.get());
  }

  async _onAppStateUpdate(e) {
    // debugger;
    // this.brFullscreen = false;
    if( this.AppStateModel.location.page === 'item' ) this._onRenderMedia(e);
    if( this.AppStateModel.location.page !== 'item' ) this._clearMedia();
    // if( this.AppStateModel.location.page !== 'item' ) this._onSearchResultsEmpty();
  }

  async _onRenderMedia(e) {
    // TODO eventually support mutiple mediaGroups, combine different media types into same viewer/nav?
    let mediaGroups = e.selectedRecord?.clientMedia?.mediaGroups;
    if (!mediaGroups || !mediaGroups.length) return;
    // mediaGroup = mediaGroup[0];

    this.itemId = e.selectedRecord?.graph?.root?.['@id'];
    let renderAsBr = false;
    let mediaType;

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
        if (type) {
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

    // if /item/ark:/87287/d7rw8x then renderAsBr = false
    // if( mediaGroup['@id'] === '/item/ark:/87287/d7rw8x/media/images' ) {
    //   renderAsBr = false;
    //   mediaType = 'image';
    // }

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
    if( mediaGroup['@shortType'].includes('ImageObject') || mediaGroup.clientMedia?.pages?.length === 1 ) {
      renderAsBr = false;
      mediaType = 'image';
    }

    if( renderAsBr ) {
      this.BookReaderModel.setSelectedBook(e.selectedRecord.clientMedia.id, e.selectedRecord);
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

  _onSearchResultsEmpty(e) {
    this.searchResults = [];
    this.searchResultsCount = 0;
    this._updateSearchNav();
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

  _onBookViewPageChange(e) {
    // emit event to notify app-media-download which pages to download
    // (single page mode would be 1 file, two page mode would be the 2 files being viewed)
    if( !this.isBookReader ) return;
    this.dispatchEvent(new CustomEvent('br-page-change', {
      detail: e.detail
    }));
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

    // br.maxHeight = window.innerHeight + 5; // TODO spacing from navbar
    // br.classList.add("fullscreen");

    // hide scrollbars
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";


    // let brView = document.querySelector("#bookreader");
    // if (brView) {
    //   brView.classList.add("fullscreen");
    //   brView
    //     .querySelector("#BookReader")
    //     .classList.add("fullscreen");
    //   document.body.style.overflow = "hidden";

    //   if( brView.onePage ) {
    //     // need to recalc pagetops and render for mode1
    //     brView._renderBookReader(true);
    //   }
      
    //   requestAnimationFrame(() => {
    //     brView.height = window.innerHeight;
    //     let mediaNav = document.querySelector("app-media-viewer-nav"); 
    //     let brNav = brView.querySelector(".BRfooter");
    //     if (mediaNav && brNav) {
    //       // append media nav in brNav to display inline
    //       let li = document.createElement("li");
    //       li.appendChild(mediaNav);
    //       brNav.querySelector("nav > ul").appendChild(li);
  
    //       // also move search button as first child
    //       let brSearch = mediaNav.shadowRoot.querySelector(".br-search");
    //       if (brSearch) {
    //         let brSearchCopy = brSearch.cloneNode(true);
    //         brSearchCopy.style.display = ''; // remove display none

    //         let searchButton = brSearchCopy.querySelector('.zoom .fullscreen-search');
    //         let prevButton = brSearchCopy.querySelector('.search-pagination #search-prev');
    //         let nextButton = brSearchCopy.querySelector('.search-pagination #search-next');

    //         if( searchButton ) searchButton.addEventListener('click', this._onToggleBRSearch.bind(this));
    //         if( prevButton ) prevButton.addEventListener('click', this._prevSearchResult.bind(this));
    //         if( nextButton ) nextButton.addEventListener('click', this._nextSearchResult.bind(this));

    //         brNav.prepend(brSearchCopy);
    //       }
    //     }
  
    //     brView.br.resize();
    //     if( this.queryTerm ) this._onBRSearch({ currentTarget: { value: this.queryTerm } });
    //   });
      
    // }
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
    // br.classList.remove("fullscreen");

    // allow scroll
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    

    // let brView = document.querySelector("#bookreader");
    // if (brView) {
    //   brView.classList.remove("fullscreen");
    //   brView
    //     .querySelector("#BookReader")
    //     .classList.remove("fullscreen");
    //   document.body.style.overflow = "";
    //   let mediaNav = brView.querySelector("app-media-viewer-nav");
    //   if (mediaNav) {
    //     document.querySelector(".wrapper").append(mediaNav);
    //   }

    //   // remove search button (that we cloned in expand) 
    //   let brNav = brView.querySelector(".BRfooter");
    //   let brSearch = brNav?.querySelector('.br-search');
    //   if( brSearch ) brSearch.remove();

    //   // if br onePage, need to autofit scale. twoPage already resets
    //   if( brView.onePage ) {     
    //     brView.fullscreen = false;   
    //     brView.br._modes.mode1Up.mode1UpLit.scale = 1;
    //     // need to recalc pagetops and render for mode1
    //     brView._renderBookReader(true);
    //   } else {
    //     brView.height = 634;
    //   }
    // }

    // requestAnimationFrame(() => {
    //   brView.br.resize();
    //   if( this.queryTerm ) this._onBRSearch({ currentTarget: { value: this.queryTerm } });
    // });
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
    console.log('setting this.selectedResult to ', e.selectedSearchResult + 1);
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

  _onBRSearchGoToResult(e) {
    let br = document.querySelector("app-bookreader-viewer");
    if (!br) return;

    // also update selected search result in nav
    let nav = br.querySelector("app-media-viewer-nav");
    if (!nav) return;
    this.selectedResult =
      this.searchResults.findIndex(
        (r) => r.matchIndex === e.detail.matchIndex
      ) + 1;
    nav.selectedResult = this.selectedResult;
  }
}

customElements.define("app-media-viewer", AppMediaViewer);
