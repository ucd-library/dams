import { LitElement, html } from "lit";
import render from "./app-search-header.tpl.js";

import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';

import "../../components/search-box";
import "../../components/nav-bar";
// import "../../components/icon";
import "../../components/filterButton";
import "./filtering/app-top-active-filters";

class AppSearchHeader extends Mixin(LitElement).with(LitCorkUtils) {
  static get properties() {
    return {
      selectedCollection: { type: String },
      navBarChoices: { type: Array },
    };
  }

  constructor() {
    super();
    this.active = true;
    this.render = render.bind(this);

    this.selectedCollection = "";
    this.navBarChoices = [
      {
        text: "Browse",
        dropdown: [
          { text: "Collection", href: "/collections" },
          { text: "Items", href: "/search" },
          { text: "Creators", href: "/browse/search" },
          { text: "Subjects", href: "/browse/subject" },
          { text: "Format", href: "/browse/format" },
        ],
      },
      { text: "About", href: "/about" },
      // { text: "FAQ", href: "/faq" },
    ];
    // this.EventBus.on('search-controller-update', e => this._onSearchControllerUpdate(e));
    this._injectModel("AppStateModel", "CollectionModel", "RecordModel");
  }
  /**
   * @method willUpdate
   * @description Lit lifestyle function, called before render
   *
   */
  async willUpdate() {
    this._setCollections(await this.CollectionModel.overview());
  }

  /**
   * @description AppStateInterface, fired when state updates
   * @param {*} e
   */
  _onAppStateUpdate(e) {
    this.drawerOpen = e.filtersDrawerOpen ? true : false;
    this.appState = e;
    if (e.location.path[0] !== "search") {
      this.shadowRoot.querySelector("app-top-active-filters").style.display =
        "none";
      this.shadowRoot.querySelector(".add-filter-container").style.display =
        "none";
      return;
    }
    this.shadowRoot.querySelector("app-top-active-filters").style.display =
      "block";
    this.shadowRoot.querySelector(".add-filter-container").style.display =
      "block";
    this._searchFromAppState();
  }

  /**
   * @method _searchFromAppState
   * @description use current app state to preform a search, should be called on first load
   * or if state update event is from popup state (forward, back button hit)
   */
  _searchFromAppState() {
    // if (!this.drawerOpen || window.innerWidth > 975) {
    //   window.scrollTo(0, 0);
    // }
    return;
    // TODO: remove this

    this.firstLoad = false;

    let searchUrlParts = this.appState.location.path;
    let query;

    if (searchUrlParts[0] === "collection") {
      // query = this._urlToSearchDocument(['', encodeURIComponent(JSON.stringify([
      query = this.RecordModel.urlToSearchDocument([
        "",
        encodeURIComponent(
          JSON.stringify([
            // ["isPartOf.@id","or",`/collection/${searchUrlParts[1]}`]
            ["collectionId", "or", `/collection/${searchUrlParts[1]}`],
          ])
        ),
        "",
        "10",
      ]);

      if (this.lastQuery === query) return;
      this.lastQuery = query;

      // this._searchRecords(query, false);
      this.RecordModel.search(query, false);
      return;
    } else if (searchUrlParts[0] === "search" && searchUrlParts.length > 1) {
      // query = this._urlToSearchDocument(searchUrlParts.slice(1, searchUrlParts.length));
      query = this.RecordModel.urlToSearchDocument(
        searchUrlParts.slice(1, searchUrlParts.length)
      );
    } else {
      query = this.RecordModel.emptySearchDocument();
    }

    if (this.lastQuery === query) return;
    this.lastQuery = query;

    this.RecordModel.search(query, true, false, true);
  }

  /**
   * @method _setCollections
   * @description when the element is ready, the collection model is called
   * for the collection list.  this renders is.
   *
   * @param {Object} e
   */
  _setCollections(e) {
    let browse = e.payload;
    // todo
  }

  /**
   * @method _onBrowse
   * @description bound to `browse` event.  Called when user
   * selects a specific collection to browse
   *
   * @param {Object} e
   *
   * @returns {String} Window Location
   *
   */
  _onBrowse(e) {
    let id = e.detail;

    this.$.searchBox.browseValue = "Browse";

    if (!id || id === "Browse") {
      return this.RecordModel.setSearchLocation(this._getEmptySearchDocument());
    }

    this._setWindowLocation(id);
    return this._setWindowLocation;
  }

  /**
   * @method _onSearch
   * @description bound to `search` event.  called when user
   * hits enter or clicked the search icon.  start a text search
   *
   * @param {Object} e
   */
  _onSearch(e) {
    // let searchDoc = this._getCurrentSearchDocument();
    let searchDoc = this.RecordModel.getCurrentSearchDocument();
    if( this.AppStateModel.location.path.length < 3 ) searchDoc.filters = {};
    // this._setPaging(searchDoc, 0);
    this.RecordModel.setPaging(searchDoc, 0);

    // this._setTextFilter(searchDoc, e.detail);
    this.RecordModel.setTextFilter(searchDoc, e.detail);

    this.RecordModel.setSearchLocation(searchDoc);
  }

  /**
   * @method _onEsSearchUpdate
   * @description from RecordInterface, called when search state updates
   *
   * @param {*} e
   */
  _onRecordSearchUpdate(e) {
    const searchBox = this.shadowRoot.querySelector("#searchBox");
    try {
      searchBox.shadowRoot.querySelector("#input").value =
        e.searchDocument.text || "";
    } catch (e) {
      searchBox.shadowRoot.querySelector("#input").value = "";
    }
  }

  /**
   * @method _onSelectedCollectionUpdate
   * @description from CollectionInterface, called when a collection is selected.
   * This is done by setting a collection filter.
   *
   * @param {Object} selected currently selected collection
   */
  _onSelectedCollectionUpdate(selected) {
    this.selectedCollection = selected;
  }

  _onExpandFilters(e) {
    this.dispatchEvent(new CustomEvent("expand-search-filters"));
  }
}
customElements.define("app-search-header", AppSearchHeader);
