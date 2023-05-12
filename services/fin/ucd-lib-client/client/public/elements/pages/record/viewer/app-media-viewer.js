import { LitElement } from "lit";
import render from "./app-media-viewer.tpl";

import "@polymer/iron-pages";

import "./app-image-viewer";
import "./app-bookreader-viewer";
// import "./app-360-image-viewer"
import "./app-video-viewer";
import "./app-audio-viewer";

import "./app-media-viewer-nav";
import "./app-image-viewer-lightbox";

import "@ucd-lib/cork-app-utils";
import utils from "../../../../lib/utils";

export default class AppMediaViewer extends Mixin(LitElement).with(
  LitCorkUtils
) {
  static get properties() {
    return {
      mediaType: { type: String },
      tallControls: { type: Boolean },
      bagOfFilesImage: { type: String },
      brFullscreen: { type: Boolean },
      brSearchOpen: { type: Boolean },
      bookData: { type: Object },
      bookItemId: { type: String },
      isBookReader: { type: Boolean },
      searchResults: { type: Array },
      searchResultsCount: { type: Number },
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.active = true;

    this._injectModel("AppStateModel", "RecordModel");
    this.mediaType = "image";
    this.bagOfFilesImage = "";
    this.brFullscreen = false;
    this.brSearchOpen = false;
    this.bookData = {};
    this.bookItemId = "";
    this.isBookReader = false;
    this.searchResults = [];
    this.searchResultsCount = 0;
    this.regexPattern = /\{\{\{.*?\}\}\}/g;

    window.addEventListener(
      "BookReader:SearchCallback",
      this._onSearchResultsChange.bind(this)
    );

    window.addEventListener(
      "BookReader:SearchCallbackEmpty",
      this._onSearchResultsEmpty.bind(this)
    );

    window.addEventListener(
      "BookReader:SearchGoToResult",
      this._onBRSearchGoToResult.bind(this)
    );
  }

  async firstUpdated() {
    this.$.lightbox = this.shadowRoot.getElementById("lightbox");
    if (!this.$.lightbox) this.$.lightbox = document.getElementById("lightbox");

    this._onAppStateUpdate(await this.AppStateModel.get());
  }

  async _onAppStateUpdate(e) {
    // TODO eventually support mutiple mediaGroups, combine different media types into same viewer/nav?
    let mediaGroup = e.selectedRecord?.clientMedia?.mediaGroups;
    if (!mediaGroup || !mediaGroup.length) return;
    // mediaGroup = mediaGroup[0];

    let mediaType;
    mediaGroup.forEach((media) => {
      let type = utils.getMediaType(media.display);
      if (type) {
        mediaType = type.toLowerCase().replace(/object/i, "");
        mediaGroup = media;
      }
    });

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

    // TODO hack to test for specific item, but should change to use app container config?
    let renderAsBr = false; // mediaGroup.display.hasPart && mediaGroup.display.encodesCreativeWork && mediaGroup.display.encodesCreativeWork['@id'] === '/item/ark:/87287/d7k06n';

    if (
      renderAsBr ||
      (mediaGroup.display?.clientMedia && mediaGroup.display?.clientMedia.pdf)
    ) {
      mediaType = "bookreader";
      this.isBookReader = true;
      let brData;
      if (renderAsBr && !mediaGroup.display?.clientMedia?.pdf?.manifest) {
        this.bookData = utils.buildIaReaderPages(
          mediaGroup.display.hasPart,
          e.selectedRecord?.clientMedia?.index
        );
      } else {
        brData = await this.RecordModel.getIaBookManifest(
          mediaGroup.display.clientMedia.pdf.manifest
        );
      }
      this.bookItemId = mediaGroup.display["@id"];

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
    this.AppStateModel.setSelectedRecordMedia(
      e.selectedRecord.index[e.location.pathname]
    );
  }

  _onSearchResultsChange(e) {
    this.searchResults = [...e.detail?.props?.results?.matches];
    if (this.searchResults.length) {
      this.searchResults = this.searchResults.sort(
        (a, b) =>
          parseInt(a.displayPageNumber.replace("n", "")) -
          parseInt(b.displayPageNumber.replace("n", ""))
      );
    }
    this.searchResultsCount = this.searchResults?.length;
  }

  _onSearchResultsEmpty(e) {
    this.searchResults = [];
    this.searchResultsCount = 0;
  }

  _onSearchResultClick(e) {
    let br = this.shadowRoot.querySelector("app-bookreader-viewer");
    if (!br) return;
    // navigate to search result in viewer
    br.onSearchResultClick(e);

    // also update selected search result in nav
    let nav = br.shadowRoot.querySelector("app-media-viewer-nav");
    if (!nav) return;
    let selectedResult =
      parseInt(e.currentTarget.attributes["data-array-index"].value) + 1;
    nav.selectedResult = selectedResult;
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
    this.shadowRoot.querySelector("#bookreader")._zoomIn();
  }

  /**
   * @method _onBRZoomOut
   * @description bound to bookreader zoom event out app-media-viewer-nav.
   *
   * @param {Object} e custom HTML event
   */
  _onBRZoomOut(e) {
    this.shadowRoot.querySelector("#bookreader")._zoomOut();
  }

  /**
   * @method _onChangeSearchResult
   * @description bound to bookreader search result change event app-media-viewer-nav.
   *
   * @param {Object} e custom HTML event
   */
  _onChangeSearchResult(e) {
    let selectedResult = e.detail?.selectedResult;
    let brView = this.shadowRoot.querySelector("#bookreader");
    if (brView) {
      brView.onSearchPrevNext(
        this.searchResults[selectedResult - 1].matchIndex
      );
    }
  }

  /**
   * @method _onToggleBookView
   * @description bound to book view single vs book mode event in app-media-viewer-nav.
   *
   * @param {Object} e custom HTML event
   */
  _onToggleBookView(e) {
    this.shadowRoot.querySelector("#bookreader")._toggleBookView();
  }

  /**
   * @method _onExpandBookView
   * @description bound to book view full page event in app-media-viewer-nav.
   *
   * @param {Object} e custom HTML event
   */
  _onExpandBookView(e) {
    this.brFullscreen = true;

    let brView = this.shadowRoot.querySelector("#bookreader");
    if (brView) {
      brView.classList.add("fullscreen");
      brView.shadowRoot
        .querySelector("#BookReader")
        .classList.add("fullscreen");
      document.body.style.overflow = "hidden";

      let mediaNav = this.shadowRoot.querySelector("app-media-viewer-nav");
      let brNav = brView.shadowRoot.querySelector(".BRfooter");
      if (mediaNav && brNav) {
        // append media nav in brNav to display inline
        let li = document.createElement("li");
        li.appendChild(mediaNav);
        brNav.querySelector("nav > ul").appendChild(li);

        // also move search button as first child
        let brSearch = mediaNav.shadowRoot.querySelector(".br-search");
        if (brSearch) brNav.prepend(brSearch);
      }

      brView.br.resize();
    }
  }

  /**
   * @method _onCollapseBookView
   * @description bound to book view full page collapse event in app-media-viewer-nav.
   *
   * @param {Object} e custom HTML event
   */
  _onCollapseBookView(e) {
    this.brFullscreen = false;
    // this.brSearchOpen = false;
    let brView = this.shadowRoot.querySelector("#bookreader");
    if (brView) {
      brView.classList.remove("fullscreen");
      brView.shadowRoot
        .querySelector("#BookReader")
        .classList.remove("fullscreen");
      document.body.style.overflow = "";
      let mediaNav = brView.shadowRoot.querySelector("app-media-viewer-nav");
      if (mediaNav) {
        this.shadowRoot.querySelector(".wrapper").append(mediaNav);
      }

      brView.br.resize();
    }
  }

  /**
   * @method _onToggleBRSearch
   * @description bound to book view search button click event in app-media-viewer-nav.
   *
   * @param {Object} e custom HTML event
   */
  _onToggleBRSearch(e) {
    this.brSearchOpen = !this.brSearchOpen;
  }

  /**
   * @method _onToggleBRSearch
   * @description bound to book view search event.
   *
   * @param {Object} e custom HTML event
   */
  _onBRSearch(e) {
    let brNav = this.shadowRoot
      .querySelector("app-bookreader-viewer")
      ?.shadowRoot.querySelector("app-media-viewer-nav");
    if (brNav) {
      // nav elements are moved into the bookreader viewer in full screen mode
      brNav.brSearch = true;
      brNav.selectedResult = 1;
      brNav.searchResults = [];
    } else {
      brNav = this.shadowRoot.querySelector("app-media-viewer-nav");
      if (brNav) {
        brNav.brSearch = true;
        brNav.selectedResult = 1;
        brNav.searchResults = [];
      }
    }
    let queryTerm = e.currentTarget.value;
    if (!queryTerm) {
      this.searchResults = [];
      this.searchResultsCount = 0;
    }

    let bookreader = this.shadowRoot.querySelector("app-bookreader-viewer");
    if (bookreader) {
      bookreader.search(queryTerm);
    }
  }

  _onClearSearch(e) {
    let searchInput = this.shadowRoot.querySelector("#br-search-input");
    if (searchInput) {
      searchInput.value = "";
    }
    this.searchResults = [];
    this.searchResultsCount = 0;
    this._onBRSearch({ currentTarget: { value: "" } });
  }

  _onBRSearchGoToResult(e) {
    let br = this.shadowRoot.querySelector("app-bookreader-viewer");
    if (!br) return;

    // also update selected search result in nav
    let nav = br.shadowRoot.querySelector("app-media-viewer-nav");
    if (!nav) return;
    let selectedResult =
      this.searchResults.findIndex(
        (r) => r.matchIndex === e.detail.matchIndex
      ) + 1;
    nav.selectedResult = selectedResult;
  }
}

customElements.define("app-media-viewer", AppMediaViewer);
