import { LitElement, html } from "lit";
import render from "./fin-app.tpl.js";
import {Mixin, MainDomElement} from '@ucd-lib/theme-elements/utils/mixins';
import { LitCorkUtils } from '@ucd-lib/cork-app-utils';

// sets globals Mixin and EventInterface
import "@ucd-lib/cork-app-utils";

import '@ucd-lib/theme-elements/ucdlib/ucdlib-pages/ucdlib-pages.js'

// styles
import "./styles/shared-styles";

// main library
import "../lib";

// app elements
import "./pages/search/app-search-header";
import "./pages/search/app-search-breadcrumb";
import "./app-footer";
import "./auth/app-auth-footer";
import "./components/site/ucdlib-site-footer";
import "./components/site/ucdlib-site-footer-column";
import "./components/graphics/dams-watercolor-overlay";

export class FinApp extends Mixin(LitElement)
  .with(MainDomElement, LitCorkUtils) {
  
  static get properties() {
    return {
      page: { type: String },
      appRoutes: { type: Array },
      showSearchHeader: { type: Boolean },
      showBreadcrumb: { type: Boolean },
      localBuildTime: { type: String },
      appVersion: { type: String },
      clientTag: { type: String },
      clientHash: { type: String },
      coreTag: { type: String },
      coreHash: { type: String },
      showVersion: { type: Boolean },
      isAdmin: { type: Boolean },
      pathInfo: { type: String },
    };
  }

  constructor() {
    super();
    this.active = true;
    this.render = render.bind(this);
    this.SEARCH_HEADER_PAGES = [
      "about",
      "item",
      "search",
      "collections",
      "collection",
      "components",
      "browse",
    ];
    this.BREADCRUMB_PAGES = ["item", "search", "collections"];

    this.loadedPages = {};

    this.page = "loading";
    this.appRoutes = APP_CONFIG.appRoutes;
    this.showSearchHeader = false;
    this.showBreadcrumb = false;

    // App Version variables
    this.showVersion = APP_CONFIG.env.UCD_DAMS_DEPLOYMENT_BRANCH !== "main";

    this.appVersion = APP_CONFIG.env.APP_VERSION;
    this.buildNum = APP_CONFIG.env.BUILD_NUM;
    this.clientEnv = APP_CONFIG.env.CLIENT_ENV;
    this.finAppVersion = APP_CONFIG.env.FIN_APP_VERSION;
    this.finBranchName = APP_CONFIG.env.FIN_BRANCH_NAME;
    this.finRepoTag = APP_CONFIG.env.FIN_REPO_TAG;
    this.finServerImage = APP_CONFIG.env.FIN_SERVER_IMAGE;
    this.finServerRepoHash = APP_CONFIG.env.FIN_SERVER_REPO_HASH;
    this.damsDeployBranch = APP_CONFIG.env.UCD_DAMS_DEPLOYMENT_BRANCH;
    this.damsDeploySha = APP_CONFIG.env.UCD_DAMS_DEPLOYMENT_SHA;
    this.damsDeployTag = APP_CONFIG.env.UCD_DAMS_DEPLOYMENT_TAG;
    this.damsRepoBranch = APP_CONFIG.env.UCD_DAMS_REPO_BRANCH;
    this.damsRepoSha = APP_CONFIG.env.UCD_DAMS_REPO_SHA;
    this.damsRepoTag = APP_CONFIG.env.UCD_DAMS_REPO_TAG;

    if (APP_CONFIG.env.BUILD_TIME) {
      this.localBuildTime = new Date(APP_CONFIG.env.BUILD_TIME)
        .toISOString()
        .replace("T", " ");
    } else {
      this.localBuildTime = "Not set";
    }

    this.isAdmin = APP_CONFIG.user?.roles?.includes("admin");
    this.pathInfo = '';
    this._injectModel(
      "AppStateModel",
      "AuthModel",
      "CollectionModel",
      "RecordModel"
    );

    // app header event to pass to app-search, to toggle filters in mobile view
    window.addEventListener('expand-search-filters', this._expandSearchFilters.bind(this));
  }
  
  ready() {
    let loadingEle = document.querySelector("#loading");
    if (loadingEle) document.body.removeChild(loadingEle);

    super.ready();

    // set initial user state
    this.AuthModel.store.setUser(APP_CONFIG.user);
  }

  /**
   * @method _onAppStateUpdate
   */
  async _onAppStateUpdate(e) {
    if (e.location.page === this.currentPage) return;
    this.currentPage = e.location.page;

    this.showBreadcrumb = this.BREADCRUMB_PAGES.includes(e.location.page);
    this.showSearchHeader = this.SEARCH_HEADER_PAGES.includes(e.location.page);

    this.appState = e;
    window.scrollTo(0, 0);
    let page = e.location.page;
    if (!this.loadedPages[page]) {
      this.page = "loading";
      this.loadedPages[page] = this.loadPage(page);
    }
    await this.loadedPages[page];

    this.page = page;
    this.pathInfo = e.location.pathname.split('/media')[0];
  }

  /**
   * @method loadPage
   * @description code splitting done here.  dynamic import a page based on route
   *
   * @param {String} page page to load
   * @returns {String} import()
   */
  loadPage(page) {
    if (page === "home") {
      return import(
        /* webpackChunkName: "page-home" */ "./pages/home/app-home"
      );
    } else if (page === "search") {
      return import(
        /* webpackChunkName: "page-search" */ "./pages/search/app-search"
      );
    } else if (page === "item") {
      return import(
        /* webpackChunkName: "page-record" */ "./pages/record/app-record"
      );
    } else if (page === "browse") {
      return import(
        /* webpackChunkName: "page-browse" */ "./pages/browse/app-browse"
      );
    } else if (page === "about") {
      return import(
        /* webpackChunkName: "page-about" */ "./pages/about/app-about"
      );
    } else if (page === "collection") {
      return import(
        /* webpackChunkName: "page-collections" */ "./pages/collection/app-collection"
      );
    }
    return page;
  }

  /**
   * @method _expandSearchFilters
   * @description expands the search filters.  Listens to
   * expand-filters event from app-search-results-panel
   * @param {Object} e event object
   */
  _expandSearchFilters(e) {
    let appSearch = document.querySelector("app-search");
    if (appSearch) {
      appSearch.expandFilters();
    }
  }
}

customElements.define("fin-app", FinApp);
