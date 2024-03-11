import { LitElement } from "lit";
import {Mixin, MainDomElement} from '@ucd-lib/theme-elements/utils/mixins';
import { LitCorkUtils } from '@ucd-lib/cork-app-utils';

import "@internetarchive/bookreader/src/BookReader.js";

// this just adds functionality to BookReader.prototype
import "@internetarchive/bookreader/src/plugins/search/plugin.search.js";

import BookReader from "@internetarchive/bookreader/src/plugins/plugin.text_selection.js";
import { PageContainer } from '@internetarchive/bookreader/src/BookReader/PageContainer.js';

import bookreaderPatch from "./app-bookreader.patch-search.js";
const UcdBookReader = bookreaderPatch(BookReader);

import render from "./app-bookreader-viewer.tpl.js";

import "@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon";
import "../../../utils/app-icons";

export default class AppBookReaderViewer extends Mixin(LitElement)
  .with(MainDomElement, LitCorkUtils) {

  static get properties() {
    return {
      loading: { type: Boolean },
      height: { type: Number },
      fullscreen: { type: Boolean },
      bookData: { type: Object },
      bookItemId: { type: String },
    };
  }

  constructor() {
    super();
    this.active = true;
    this.render = render.bind(this);
    this._injectModel("AppStateModel", "MediaModel");

    this.bookData = {};
    this.bookItemId = "";
    this.loading = false;
    this.height = 634;
    this.onePage = false;
    this.fullscreen = false;
    this.viewportMultiplier = 3.7;

    window.addEventListener(
      "BookReader:SearchCallback",
      this._onSearchResultsChange.bind(this)
    );

    window.addEventListener(
      "BookReader:SearchCallbackEmpty",
      this._onSearchResultsEmpty.bind(this)
    );
  }

  firstUpdated(e) {
    if (window.innerWidth < 801) {
      this.onePage = true;
    }
  }

  willUpdate(e) {
    if( this.AppStateModel.location.page !== 'item' ) return;
    if( this.bookData?.pages ) {
      this._renderBookReader();
    }
  }

  _onAppStateUpdate(e) {
    if (e.location.page !== 'item') {
      this.bookData = {};
      this.iaInitialized = false;
      this.onePage = false;

      this.dispatchEvent(new CustomEvent('br-cancel-search', {
        detail: {
          onePageMode: this.onePage,
          closeSearch: true,
        },
      }));

    }
  }

  _renderBookReader() {
    requestAnimationFrame(() => {
      try {
        this._renderBookReaderAsync();
      } catch (e) {}

      this._movePrevNext();
      let slider = document.querySelector(".BRpager");
      $(slider).on("slidechange", this._updateCurrentPageLabel.bind(this));

      window.addEventListener(
        `BookReader:1PageViewSelected`,
        this._singlePageLoad.bind(this)
      );

      // hide slider / pager if only a single page
      let scrubber = document.querySelector('.scrubber');
      let controls = document.querySelector('.controls');
      let twoPageToggle = document.querySelector('app-media-viewer-nav')?.shadowRoot?.querySelector('.page-toggle');

      if( this.bookData.pages.length < 2 ) {
        scrubber.style.display = 'none';
        controls.style.flexDirection = 'row-reverse';
        if( twoPageToggle?.style ) twoPageToggle.style.display = 'none';

      } else {
        scrubber.style.display = '';
        controls.style.flexDirection = '';
        if( twoPageToggle?.style ) twoPageToggle.style.display = '';
      }
    });
  }

  _singlePageLoad(e) {
    setTimeout(() => {
      if (!this.zoomed) {
        this.br.resize();
        this.zoomed = true;

      }
    }, 25);
  }

  _movePrevNext() {
    // move buttons to row with slider, and position page label
    //  the slider is baked into the BR code pretty heavily with animations and the dom structure
    //  moving it out of the nav bar breaks functionility, and creating our own slider doesn't play nicely
    //  instead we'll just hide all the other native nav, and restyle the BR slider (jquery ui slider)
    let prevButton = document.querySelector("#prev");
    let nextButton = document.querySelector("#next");
    let currentPage = document.querySelector(".BRcurrentpage");

    // remove parentheses from label (it's updated async so can't simply replace innerHTML, hide instead)
    let currentPageOverride = document.querySelector(
      ".BRcurrentpage-override"
    );
    this._updateCurrentPageLabel();

    if( !currentPage.parentElement.querySelector('#prev') && 
        !currentPage.parentElement.querySelector('#next') &&
        !currentPage.parentElement.querySelector('.BRcurrentpage-override') ) {
      // clone buttons and reposition them. changing between bookreader items 
      //  destroys previous original arrow/label elements if append/prepend originals
      let prevButtonClone = prevButton.cloneNode(true);
      let currentPageOverrideClone = currentPageOverride.cloneNode(true);
      let nextButtonClone = nextButton.cloneNode(true);

      prevButtonClone.style.display = "inline-flex";
      nextButtonClone.style.display = "inline-flex";
      currentPageOverrideClone.style.display = "inline-block";
      
      prevButtonClone.addEventListener("click", this._prevPage.bind(this));
      nextButtonClone.addEventListener("click", this._nextPage.bind(this));

      prevButton.style.display = "none";
      nextButton.style.display = "none";
      currentPageOverride.style.display = "none";

      currentPage.parentElement.prepend(prevButtonClone);
      currentPage.parentElement.append(currentPageOverrideClone);
      currentPage.parentElement.append(nextButtonClone);
    }

    this.navUpdated = true;
  }

  async _prevPage() {
    await this.br.left();    
    this.br.resize();
  }

  async _nextPage() {
    await this.br.right();
    this.br.resize();
  }

  _updateCurrentPageLabel() {
    let currentPage = document.querySelector(".BRcurrentpage");
    let currentPageOverride = document.querySelector(
      ".BRcurrentpage-override"
    );
    let currentPageTrimmed = currentPage.innerHTML
      .replace("(", "")
      .replace(")", "");

    if( currentPageOverride ) currentPageOverride.innerHTML = currentPageTrimmed;

    // emit event to notify app-media-download which pages to download
    // (single page mode would be 1 file, two page mode would be the 2 files being viewed)
    this.dispatchEvent(new CustomEvent('br-page-change', {
      detail: {
        onePageMode: this.onePage,
        currentPage: parseInt(currentPageTrimmed.split(' ')[0])
      },
    }));
  }

  _toggleBookView() {
    this.onePage = !this.onePage;
    this.br.switchMode(this.onePage ? 1 : 2);
    this._updateCurrentPageLabel(); // trigger ui change to media download
    this.br.resize();
  }

  _zoomIn(e, amount = 1) {
    this.br.zoom(amount);
  }

  _zoomOut(e, amount = -1) {
    this.br.zoom(amount);
  }

  _renderBookReaderAsync() {
    if( this.iaInitialized || !this.bookData.pages ) return;

    this.iaInitialized = true;
    let data = [];
    let minHeight = 9999;
    let offsetHeight = document.querySelector('#BookReader').offsetHeight;
    let offsetWidth = document.querySelector('#BookReader').offsetWidth;
    console.log({ offsetHeight, offsetWidth });

    this.bookData.pages.forEach((bd) => {
      let width = Number(bd[bd.ocr?.imageSize]?.size?.width || 0)
      let height = Number(bd[bd.ocr?.imageSize]?.size?.height || 0);
      let widthRatio = offsetWidth / width;
      let heightRatio = offsetHeight / height;
      let scaleRatio = Math.min(widthRatio, heightRatio);
      if( height * scaleRatio < minHeight ) {
        minHeight = height * scaleRatio;
      }

      data.push([
        {
          width,
          height,
          uri: bd[bd.ocr?.imageSize]?.url,
          ocr: bd.ocr?.url
        },
      ]);
    });
    
    // adjust br viewport based on image dimensions
    if( offsetHeight > minHeight ) {
      document.querySelector('#BookReader').style.height = minHeight + 'px';
    }

    let port = '';
    if( window.location.host.match(/:\d+$/) ) {
      port = ':' + window.location.host.split(':')[1];
    }
    let options = {
      el: "#BookReader",
      data,

      bookTitle: "BookReader Presentation",

      // thumbnail is optional, but it is used in the info dialog
      thumbnail: data[0].uri,

      plugins: {
        textSelection: {
          enabled: true,
          singlePageDjvuCallback: (index) => {
            return data[index]?.[0]?.ocr;
          },
          singlePageDjvuXmlUrl: "no-op"
        },
      },

      showToolbar: false,
      server: window.location.host,
      searchInsideUrl: port+"/api/page-search/ia",
      searchInsideProtocol: window.location.protocol.replace(":", ""),

      // ppi: 200,

      // using _calcPageWidth/Height does scale images successfully, however breaks plugins
      // can same calc be made in patch-search.js to fix plugins?
      // getPageWidth: (index) => {
      //   let w = this._calcPageWidth(data, index);
      //   // let w = this._calcPageSize(data, index, 'width');
      //   // console.log('getPageWidth', w);
      //   return w;
      // },
      // getPageHeight: (index) => {
      //   // method 1, doesn't work because it's scaling image to fit container but not scaling svg/ocr text selection layers
      //   let h = this._calcPageHeight(data, index);

      //   // method 2, use max width/height of image to scale, but not scale over height of container
      //   // let h = this._calcPageSize(data, index, 'height');
      //   // console.log('getPageHeight', h);
      //   return h;
      // },

      padding: 20,
      ui: "full", // embed, full (responsive)
    };

    if( this.attributes.brsinglepage ) this.onePage = true;
    this.br = new UcdBookReader(options);

    this.br.init();
    this.br.switchMode(this.onePage ? 1 : 2);
    this.br.resize();
    this.requestUpdate();
  }

  // _calcPageSize(data, index, returnType) {
  //   let containerWidth = document.querySelector('#BookReader').offsetWidth;
  //   let containerHeight = document.querySelector('#BookReader').offsetHeight;

  //   let imageWidth = data[index]?.[0]?.width || data.width || 0;     
  //   let imageHeight = data[index]?.[0]?.height || data.height || 0;

  //   let hScaled, wScaled;
  //   if( imageHeight > imageWidth ) {
  //     hScaled = containerHeight;
  //     wScaled = imageWidth * (containerHeight / imageHeight);
  //   } else {
  //     wScaled = containerWidth;
  //     hScaled = imageHeight * (containerWidth / imageWidth);
  //   }

  //   if( returnType === 'width' ) return wScaled;
  //   if( returnType === 'height' ) return hScaled;
  //   throw new Error('returnType must be width or height');
  // }

  // _calcPageWidth(data, index) {
  //   // if( index === 1 ) console.log('IN _calcPageWidth FOR INDEX 1');

  //   // first get the width and height of the #BookReader container
  //   let containerWidth = document.querySelector('#BookReader').offsetWidth;
  //   let containerHeight = document.querySelector('#BookReader').offsetHeight;

  //   // if( index === 1 ) console.log({ containerHeight, containerWidth });
    
  //   // get the width and height of the image
  //   let imageWidth = data[index]?.[0]?.width || data.width || 0;     
  //   let imageHeight = data[index]?.[0]?.height || data.height || 0;

  //   // if( index === 1 ) console.log({ imageWidth, imageHeight });

  //   // calc scale ratio by dividing container size by image size
  //   let widthRatio = containerWidth / imageWidth;
  //   let heightRatio = containerHeight / imageHeight;

  //   // if( index === 1 ) console.log({ widthRatio, heightRatio });

  //   // use the smaller of the two ratios to scale the image
  //   let scaleRatio = Math.min(widthRatio, heightRatio);
    
  //   // scale the image width by the ratio
  //   let newWidth = Math.floor(imageWidth * scaleRatio);

  //   // if( index === 1 ) console.log({ scaleRatio, newWidth });

  //   // don't scale image for wider screens
  //   if( window.innerWidth > 800 ) {
  //     return imageWidth;
  //   }

  //   // if( index === 1 ) console.log({ returnedWidth: newWidth * this.viewportMultiplier });

  //   // return imageWidth; // this works for normal view, not when scaling for mobile
  //   return newWidth * this.viewportMultiplier; // this scales well with mobile and desktop orientations, but breaks text selection plugin and search plugin
  // }

  // _calcPageHeight(data, index) {
  //   let containerWidth = document.querySelector('#BookReader').offsetWidth;
  //   let containerHeight = document.querySelector('#BookReader').offsetHeight;

  //   let imageWidth = data[index]?.[0]?.width || data.width || 0;     
  //   let imageHeight = data[index]?.[0]?.height || data.height || 0;
  //   // console.log('imageHeight before scaling: ', imageHeight);

  //   let widthRatio = containerWidth / imageWidth;
  //   let heightRatio = containerHeight / imageHeight;
    
  //   let scaleRatio = Math.min(widthRatio, heightRatio);
    
  //   let newHeight = Math.floor(imageHeight * scaleRatio);
  //   // console.log('imageHeight after scaling: ', newHeight * this.viewportMultiplier);

  //   if( window.innerWidth > 800 ) {
  //     // don't scale image for wider screens
  //     return imageHeight;
  //   }

  //   // return imageHeight; // this works for normal view, not when scaling for mobile
  //   return newHeight * this.viewportMultiplier; // this scales well with mobile and desktop orientations, but breaks text selection plugin and search plugin
  // }

  _onSearchResultsChange(e) {
    let results = e.detail?.props?.results;
    // document.querySelector('.search-pagination')
    let nav = document.querySelector("app-media-viewer-nav");
    if (nav) {
      nav.searchResultsCount = results.matches.length;
    }
  }

  _onSearchResultsEmpty(e) {
    let nav = document.querySelector("app-media-viewer-nav");
    if (nav) {
      nav.searchResultsCount = 0;
    }
  }

  search(queryTerm) {
    if( !this.br ) return;
    this.br.bookId = this.bookItemId;
    this.br.search(queryTerm);
  }

  onSearchResultClick(e) {
    let matchIndex = parseInt(
      e.currentTarget?.attributes["data-match-index"]?.value || 0
    );
    this.br._searchPluginGoToResult(matchIndex);
  }

  onSearchPrevNext(matchIndex) {
    this.br._searchPluginGoToResult(matchIndex, false);
  }

  destroy() {
    let br = this.querySelector('#BookReader');
    if( br ) br.innerHTML = '';
  }
}

customElements.define("app-bookreader-viewer", AppBookReaderViewer);
