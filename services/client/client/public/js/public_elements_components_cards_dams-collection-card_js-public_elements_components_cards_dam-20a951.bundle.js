"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["public_elements_components_cards_dams-collection-card_js-public_elements_components_cards_dam-20a951"],{

/***/ "./public/elements/components/cards/dams-collection-card.js":
/*!******************************************************************!*\
  !*** ./public/elements/components/cards/dams-collection-card.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DamsCollectionCard)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _dams_collection_card_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dams-collection-card.tpl.js */ "./public/elements/components/cards/dams-collection-card.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/utils/index.js */ "./public/lib/utils/index.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__);








/**
 * @class DamsCollectionCard
 * @description UI component class for displaying a collection preview card
 *
 * @prop {Object} collection - An object describing a DAMS collection.
 * If used, element will set all subsequent properties with data from collections object.
 * @prop {String} imgSrc - The collection thumbnail src.
 * @prop {String} cardTitle - The title of the collection.
 * @prop {Number} itemCt - The total number of items in the collections.
 * @prop {String} href - Link to the collection landing page.
 */
class DamsCollectionCard extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement).with(
  _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils
) {
  static get properties() {
    return {
      collection: { type: Object },
      id: { type: String, attribute: "data-id" },
      imgSrc: { type: String, attribute: "img-src" },
      cardTitle: { type: String, attribute: "card-title" },
      itemCt: { type: Number, attribute: "item-ct" },
      href: { type: String },
      darkBg: { type: Boolean, attribute: "data-dark-bg" },
      loading: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.render = _dams_collection_card_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);

    this.collection = {};
    this.id = "";
    this.renderedId = "";
    this.imgSrc = "";
    this.cardTitle = "";
    this.itemCt = 0;
    this.href = "";
    this.darkBg = false;
    this.loading = true;

    this._injectModel("CollectionModel", "FcAppConfigModel");
  }

  async updated(props) {    
    if (props.has("id") && this.id && this.id !== this.renderedId ) {
      try {
        this._onCollectionUpdate(await this.CollectionModel.get(this.id));
      } catch(e) {
        this.logger.warn('Collection not found', e);
        this.loading = false;
      }
    } else if( props.has("href") && !this.id ) {
      this.id = this.href;
    }
  }

  async _onCollectionUpdate(e) {
    if( e.state !== "loaded" || e.id !== this.id || this.renderedId === this.id ) return;
    this.loading = false;
    this.renderedId = this.id;

    this.collection = e.vcData;

    let clientEditsId = this.collection.clientEdits?.['@id'];
    let overriddenFeatureImage =  this.collection.clientEdits?.thumbnailUrl?.['@id'];
    if( clientEditsId && overriddenFeatureImage ) {
      this.imgSrc = '/fcrepo/rest' + clientEditsId + '/featuredImage.jpg';
    } else if( this.collection.images ) {
      let images = this.collection.images;
      this.imgSrc = images.medium ? images.medium.url : images.original.url;
    } else {
      this.imgSrc = "/images/tree-bike-illustration.png";
    }
    this.cardTitle = this.collection.title;
    this.itemCt = _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3___default().formatNumberWithCommas(this.collection.count);
    this.href = this.collection.id;
    this.darkBg = this.attributes["data-dark-bg"] ? true : false;
  }
}

customElements.define("dams-collection-card", DamsCollectionCard);


/***/ }),

/***/ "./public/elements/components/cards/dams-collection-card.tpl.js":
/*!**********************************************************************!*\
  !*** ./public/elements/components/cards/dams-collection-card.tpl.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");

// import { styleMap } from 'lit/directives/style-map';

function render() { 
return lit__WEBPACK_IMPORTED_MODULE_0__.html`

<style>
  :host {
    display: block;
  }
  .container {
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
  .img-container {
    width: 100%;
    position: relative;
    padding-top: 75%;
    background-image: url(/images/logos/logo-white-512.png);
    background-color: var(--color-black-20);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .img-container img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .head {
    border: 3px solid transparent;
    transition: .3s;
  }
  .container:hover .head, .container:focus .head {
    border: 3px solid var(--color-dams-secondary);
  }
  h5 {
    margin: 10px 0 5px 0;
    color: var(--color-h5);
    font-size: var(--fs-h5);
    font-weight: var(--fw-h5);
  }
  .subtitle {
    font-size: var(--fs-p);
    font-weight: var(--fw-extra-bold);
    color: var(--color-aggie-blue-70);
    margin-bottom: 20px;
  }
  .gold-dots {
    width: 0;
    transition: .4s;
    border-bottom: 5px dotted var(--color-dams-secondary);
  }
  .container:hover .gold-dots, .container:focus .gold-dots {
    width: 100%;
  }

  .marketing-highlight {
    display: block;
    color: inherit;
    text-decoration: none;
  }

  .marketing-highlight:hover .marketing-highlight__image .u-background-image {
    transform: scale(1.1);
  }

  .marketing-highlight__image {
    position: relative;
    overflow: hidden;
    margin: 1rem 0;
  }

  .marketing-highlight__image .u-background-image {
    transition: transform .3s ease-in-out;
  }

  .marketing-highlight__title {
    font-size: 1.2rem;
    margin-bottom: 0;
    padding-top: 0;
    margin-top: 0;
    line-height: 1.2;
  }

  .marketing-highlight__items {
    font-size: 1rem;
    color: var(--color-aggie-blue-80);
    font-weight: 600;
    line-height: 1.25;
    margin: 0.5rem 0 1rem;
  }

  .u-background-image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .u-background-image.loading {
    background-color: #dcdcdc;
  }

  .aspect--4x3 {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding-top: 75%;
  }

  .marketing-highlight__body.dark h4 {
    color: var(--color-white);
    /* font-size: 1.5rem; */
    text-align: left;
  }

  .marketing-highlight__body.dark p {
    color: var(--color-black-30);
    /* font-size: 1.1rem; */
    text-align: left;
  }

  .marketing-highlight__body.dark {
    padding-top: 0.5rem;
  }

</style>  

<!-- <div class="container"><a href="${this.href}">
  <div class="head">
    <div class="img-container">
      ${this.imgSrc ? lit__WEBPACK_IMPORTED_MODULE_0__.html`
        <img src="${this.imgSrc}">
      ` : lit__WEBPACK_IMPORTED_MODULE_0__.html``}
    </div>
  </div>
  <div class="body">
    <h5>${this.cardTitle}</h5>
    <div class="subtitle">${this.itemCt} item${this.itemCt === 1 ? "" : "s"}</div>
  </div>
  <div class="footer">
    <div class="gold-dots"></div>
  </div></a>
</div> -->

${this.href ? lit__WEBPACK_IMPORTED_MODULE_0__.html`
  <a href="${this.href}" class="marketing-highlight category-brand--secondary u-space-mb o-box">
    <div class="marketing-highlight__image">
      <div class="aspect--4x3 u-background-image ${this.loading ? 'loading' : ''}" role="img" aria-label="" style="background-image:url(${this.imgSrc})">
    </div>
    </div>
    <div class="marketing-highlight__body ${this.darkBg ? 'dark' : ''}">
      ${this.cardTitle
        ? lit__WEBPACK_IMPORTED_MODULE_0__.html`<h4 class="marketing-highlight__title">${this.cardTitle}</h4>`
        : lit__WEBPACK_IMPORTED_MODULE_0__.html``
      }
      <p class="marketing-highlight__items"><span ?hidden="${!this.itemCt}">${this.itemCt || 0} item${this.itemCt == 1 ? '' : 's'}</span></p>
    </div>
  </a>` : lit__WEBPACK_IMPORTED_MODULE_0__.html``}



`}

/***/ }),

/***/ "./public/elements/components/cards/dams-item-card.js":
/*!************************************************************!*\
  !*** ./public/elements/components/cards/dams-item-card.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DamsItemCard)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _dams_item_card_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dams-item-card.tpl.js */ "./public/elements/components/cards/dams-item-card.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _ucd_lib_theme_elements_ucdlib_ucdlib_icon_ucdlib_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon */ "./public/node_modules/@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon.js");








/**
 * @class DamsItemCard
 * @description UI component class for displaying a item preview card
 *
 * @prop {String} id - Item id
 * If used, element will query the RecordModel for the item data.
 * @prop {Object} data - Data object containing item information
 * @prop {String} itemUrl - Url to item
 * @prop {String} thumbnailUrl - Thumbnail url
 * @prop {String} truncatedTitle - Titles over 38 characters will be truncated to fit a single line
 */
class DamsItemCard extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement).with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {
  static get properties() {
    return {
      id: { type: String, attribute: "data-itemid" },
      // record: { type: Object },
      data: { type: Object },
      itemUrl: { type: String },
      thumbnailUrl: { type: String },
      truncatedTitle: { type: String },
      mediaTypes: { type: Array },
    };
  }

  constructor() {
    super();
    this.render = _dams_item_card_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);

    this.id = "";
    // this.record = {};
    this.data = {};
    this.truncatedTitle = "";
    this.itemUrl = "";
    this.thumbnailUrl = "";
    this.mediaTypes = [];

    this._injectModel("RecordModel");
  }

  /**
   * @method willUpdate
   * @description Lit lifecycle method called when element is updated.
   * @param {Map} props - Properties that have changed.
   */
  willUpdate(props) {
    if (this.data.id) {
      this.itemUrl = this.data.id;
      this.thumbnailUrl = this.data.thumbnailUrl || '/images/tree-bike-illustration.png';

      this.mediaTypes = this.data.mediaTypes;
      if (this.data.mediaTypes?.includes("Image")) {
        this.mediaTypes.push("image");
      }
      if (this.data.mediaTypes?.includes("Video")) {
        this.mediaTypes.push("video");
      }
      if (this.data.mediaTypes?.includes("Audio")) {
        this.mediaTypes.push("audio");
      }
      if( this.data.multiImage ) {
        this.mediaTypes.push("imageList");
      }
    } else {
      this._getItem(this.id);
    }

    this._truncateTitle();
  }

  async _onRecordUpdate(e) {
    if (e.state !== "loaded" || e.id !== this.id) return;

    this.record = e.vcData;
    if( this.record.images ) {
      let images = this.record.images;
      this.thumbnailUrl = images.medium ? images.medium.url : images.original.url;
    }
    this.title = this.record.name;
    this.itemUrl = this.record['@id'];
    this.id = this.record['@id'];
    this.mediaType = this.record.mediaType;

    this._truncateTitle();
  }

  /**
   * @method _getItem
   * @description Fetches item data from RecordModel
   * @param {String} id - Item id to fetch
   */
  async _getItem(id) {
    this._onRecordUpdate(await this.RecordModel.get(id));
  }

  /**
   * @method _truncateTitle
   * @description Truncates titles over 38 characters to fit a single line
   */
  _truncateTitle() {
    if (this.data && this.data.title && this.data.title.length > 38) {
      this.truncatedTitle = this.data.title.substring(0, 34) + "...";
    } else if (this.data && this.data.title) {
      this.truncatedTitle = this.data.title;
    } else if ( this.title && this.title.length > 38 ) {
      this.truncatedTitle = this.title.substring(0, 34) + "...";
    } else if ( this.title ) {
      this.truncatedTitle = this.title;
    } else {
      this.truncatedTitle = "";
    }
  }
}

customElements.define("dams-item-card", DamsItemCard);


/***/ }),

/***/ "./public/elements/components/cards/dams-item-card.tpl.js":
/*!****************************************************************!*\
  !*** ./public/elements/components/cards/dams-item-card.tpl.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");

// import { styleMap } from 'lit/directives/style-map';

function render() {
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <style>
      :host {
        display: block;
      }
      [hidden] {
        display: none !important;
      }
      .container {
        cursor: pointer;
      }
      a {
        text-decoration: none;
      }
      .img-container {
        width: 100%;
        position: relative;
        padding-top: 75%;
        background-image: url(/images/logos/logo-white-512.png);
        background-color: var(--color-black-20);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .img-container img {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .head {
        border: 3px solid transparent;
        transition: 0.3s;
      }
      .container:hover .head,
      .container:focus .head {
        border: 3px solid var(--color-dams-secondary);
      }
      h5 {
        margin: 10px 0 5px 0;
        color: var(--color-h5);
        font-size: var(--fs-h5);
        font-weight: var(--fw-h5);
      }
      .subtitle {
        font-size: var(--fs-p);
        font-weight: var(--fw-extra-bold);
        color: var(--color-aggie-blue-70);
        margin-bottom: 20px;
      }
      .gold-dots {
        width: 100%;
        border-bottom: 5px dotted var(--color-dams-secondary);
      }

      .marketing-highlight {
        display: block;
        background-color: #fff;
        color: inherit;
        text-decoration: none;
      }

      /* .marketing-highlight:hover .marketing-highlight__image .u-background-image {
    transform: scale(1.1);
  } */

      .marketing-highlight__image {
        position: relative;
        overflow: hidden;
        margin: 1rem 0 0;
        padding: 1rem;
        transition: background-color 0.3s ease-in-out;
      }

      .marketing-highlight__image:hover {
        background-color: var(--color-aggie-gold-30);
      }

      /* .marketing-highlight__image .u-background-image {
    transition: transform .3s ease-in-out;
  } */

      .marketing-highlight__title {
        font-size: 1rem;
        margin-bottom: 0;
        color: var(--color-aggie-blue-80);
        text-align: center;
      }

      /* .marketing-highlight__items {
    font-size: 1rem;
    color: var(--color-aggie-blue-80);
    font-weight: 600;
    line-height: 1.25;
    margin: 0.5rem 0 1rem;
  } */

      .u-background-image {
        /* background-size: cover;
    background-position: center; */
        background-repeat: no-repeat;
        object-fit: contain;
        background-size: contain;
        background-position: bottom center;
      }
      .aspect--4x3 {
        position: relative;
        width: 100%;
        overflow: hidden;
        padding-top: 75%;
      }

      .media-types {
        position: absolute;
        right: 0.25rem;
        bottom: 0.25rem;
        display: flex;
      }

      .media-type {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: var(--color-aggie-blue-80);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.5rem 0.5rem 0 0;
      }

      .media-type__icon {
        width: 1.4rem;
      }

      ucdlib-icon {
        width: 1.2rem;
        height: 1.2rem;
        fill: white;
      }
    </style>

    <a href="${this.itemUrl}"
      class="marketing-highlight category-brand--secondary u-space-mb o-box">
      <div class="marketing-highlight__image">
        <div
          class="aspect--4x3 u-background-image"
          role="img"
          aria-label="${this.truncatedTitle}"
          style="background-image:url(${this.thumbnailUrl});">
        </div>
        <div class="media-types">
          <div
            class="media-type"
            ?hidden="${!this.mediaTypes.includes("video")}">
            <ucdlib-icon
              style="margin-left: .2rem;"
              class="vertical-link__image"
              icon="ucdlib-dams:fa-play">
            </ucdlib-icon>
          </div>
          <div
            class="media-type"
            ?hidden="${!this.mediaTypes.includes("audio")}">
            <ucdlib-icon
              class="vertical-link__image"
              icon="ucdlib-dams:fa-volume-high">
            </ucdlib-icon>  
          </div>
          <div
            class="media-type"
            ?hidden="${!this.mediaTypes.includes("imageList")}">
            <ucdlib-icon
              class="vertical-link__image"
              icon="ucdlib-dams:item-stack-blank">
            </ucdlib-icon>
          </div>
        </div>
      </div>
      <div class="gold-dots"></div>
      <div class="marketing-highlight__body">
        <p class="marketing-highlight__title">${this.truncatedTitle}</p>
      </div>
    </a>
  `;
}


/***/ }),

/***/ "./public/elements/utils/app-collection-card.js":
/*!******************************************************!*\
  !*** ./public/elements/utils/app-collection-card.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppCollectionCard)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_collection_card_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-collection-card.tpl.js */ "./public/elements/utils/app-collection-card.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _lib_utils_intersection_observer_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/utils/intersection-observer-loader */ "./public/lib/utils/intersection-observer-loader.js");








class AppCollectionCard extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {

  static get properties() {
    return {
      collection : { type : Object },
      tabindex : { type : Number },
    };
  }

  constructor() {
    super();
    this.render = _app_collection_card_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);

    this.collection = {};
    this.tabindex = 0;

    this.shownInViewport = false;
    this.active = true;
  }

  async connectedCallback() {    
    super.connectedCallback();
    if ( this.collection.thumbnailUrl === '/images/logos/logo-white-512.png' ) {
      let cards = this.shadowRoot.querySelectorAll('.img')[0];
      cards.className += ' defaultImage';
    }

    if( !this.observer ) {
      await _lib_utils_intersection_observer_loader__WEBPACK_IMPORTED_MODULE_3__["default"].load();
      this.observer = new IntersectionObserver(
        e => this._onViewportIntersection(e), 
        {
          rootMargin: '10px', 
          threshold: 0
        }
      );
    }

    this.imageLoaded = false;
    this.observer.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();
  }

  updated() {
    this._onCollectionChange();
  }

  _onCollectionChange() {
    if( !this.shownInViewport ) return;
    this._setBackgroundImage();
  }

  _onViewportIntersection(e) {
    if( e.length === 0 ) return;
    e = e[0];
    
    if( this.shownInViewport || !e.isIntersecting ) return;
    this.shownInViewport = true;

    this._setBackgroundImage();
  }

  _setBackgroundImage() {
    this.shadowRoot.querySelector('#img').style.backgroundImage = `url('${this.collection.thumbnailUrl}')`;
  }
}

customElements.define('app-collection-card', AppCollectionCard);

/***/ }),

/***/ "./public/elements/utils/app-collection-card.tpl.js":
/*!**********************************************************!*\
  !*** ./public/elements/utils/app-collection-card.tpl.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");


function render() {
return lit__WEBPACK_IMPORTED_MODULE_0__.html`

<style>
  :host {
    display: inline-block;
    margin: 15px;
    outline : 0;
    height: 320px;
    width: 320px;
  }

  :host(:hover), :host(:focus)  {
    cursor: pointer;
    margin: 13px;
    border: 2px solid var(--default-secondary-color);
  }

  .img.defaultImage {
    background-size: 65%;
  }

  .img {
    height: 320px;
    width: 320px;
    position: relative;
    background-image: url('/images/logos/logo-white-512.png'); /* fallback */
    background-color: var(--light-background-color);
    background-size: cover; /* needs to be 65% */
    background-repeat: no-repeat;
    background-position: center center;    
  }

  .img > div  {
    padding: 15px;
    position: absolute;
    left: 0;
    right: 25px;
    bottom: 25px;
    
    color: var(--default-secondary-color);
    font-weight: var(--fw-bold);

    background-color: rgba(0, 38, 85, .8);      
  }
</style>

<div 
  id="img"
  class="img" 
  role="img" 
  aria-label="${this.collection.title}">
  <div>
    <div>${this.collection.title}</div>
    <div>42 items</div>
  </div>
</div>

`;}

/***/ }),

/***/ "./public/lib/utils/intersection-observer-loader.js":
/*!**********************************************************!*\
  !*** ./public/lib/utils/intersection-observer-loader.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class IntersectionObserverLoader {
  async load() {
    if( window.IntersectionObserver ) return true;

    if ( this.loaded ) return true;

    if ( this.loading ) {
      await this.loading;
      return this.loaded;
    }

    this.loading = new Promise(async (resolve, reject) => {
      await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! intersection-observer */ "./public/node_modules/intersection-observer/intersection-observer.js", 23));
      resolve(true);
    });

    return this.loading;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new IntersectionObserverLoader());

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2VsZW1lbnRzX2NvbXBvbmVudHNfY2FyZHNfZGFtcy1jb2xsZWN0aW9uLWNhcmRfanMtcHVibGljX2VsZW1lbnRzX2NvbXBvbmVudHNfY2FyZHNfZGFtLTIwYTk1MS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWlDOztBQUVrQjs7QUFFVzs7QUFFZDs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFFBQVE7QUFDbEI7QUFDQSxVQUFVLFFBQVE7QUFDbEIsVUFBVSxRQUFRO0FBQ2xCLFVBQVUsUUFBUTtBQUNsQixVQUFVLFFBQVE7QUFDbEI7QUFDZSxpQ0FBaUMsOERBQUssQ0FBQywyQ0FBVTtBQUNoRSxFQUFFLGlFQUFZO0FBQ2Q7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGNBQWM7QUFDbEMsWUFBWSxvQ0FBb0M7QUFDaEQsZ0JBQWdCLG9DQUFvQztBQUNwRCxtQkFBbUIsdUNBQXVDO0FBQzFELGdCQUFnQixvQ0FBb0M7QUFDcEQsY0FBYyxjQUFjO0FBQzVCLGdCQUFnQiwwQ0FBMEM7QUFDMUQsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQix5RUFBVzs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpRkFBNEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RjJCO0FBQzNCLFlBQVksV0FBVzs7QUFFUjtBQUNmLE9BQU8scUNBQUk7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLHVDQUF1QyxVQUFVO0FBQ2pEO0FBQ0E7QUFDQSxRQUFRLGNBQWMscUNBQUk7QUFDMUIsb0JBQW9CLFlBQVk7QUFDaEMsVUFBVSxxQ0FBSTtBQUNkO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZUFBZTtBQUN6Qiw0QkFBNEIsYUFBYSxNQUFNLDZCQUE2QjtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUUsWUFBWSxxQ0FBSTtBQUNsQixhQUFhLFVBQVU7QUFDdkI7QUFDQSxtREFBbUQsOEJBQThCLHlEQUF5RCxZQUFZO0FBQ3RKO0FBQ0E7QUFDQSw0Q0FBNEMsMEJBQTBCO0FBQ3RFLFFBQVE7QUFDUixVQUFVLHFDQUFJLDBDQUEwQyxlQUFlO0FBQ3ZFLFVBQVUscUNBQUk7QUFDZDtBQUNBLDZEQUE2RCxhQUFhLElBQUksa0JBQWtCLE1BQU0sNEJBQTRCO0FBQ2xJO0FBQ0EsVUFBVSxxQ0FBSTs7OztBQUlkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyS2lDOztBQUVZOztBQUVpQjs7QUFFRTs7QUFFaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFFBQVE7QUFDbEI7QUFDQSxVQUFVLFFBQVE7QUFDbEIsVUFBVSxRQUFRO0FBQ2xCLFVBQVUsUUFBUTtBQUNsQixVQUFVLFFBQVE7QUFDbEI7QUFDZSwyQkFBMkIsOERBQUssQ0FBQywyQ0FBVSxPQUFPLGlFQUFZO0FBQzdFO0FBQ0E7QUFDQSxZQUFZLHdDQUF3QztBQUNwRCxtQkFBbUIsY0FBYztBQUNqQyxjQUFjLGNBQWM7QUFDNUIsaUJBQWlCLGNBQWM7QUFDL0Isc0JBQXNCLGNBQWM7QUFDcEMsd0JBQXdCLGNBQWM7QUFDdEMsb0JBQW9CLGFBQWE7QUFDakM7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLG1FQUFXOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3pIMkI7QUFDM0IsWUFBWSxXQUFXOztBQUVSO0FBQ2YsU0FBUyxxQ0FBSTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLGFBQWE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixvQkFBb0I7QUFDNUMsd0NBQXdDLGtCQUFrQixFQUFFO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1DQUFtQztBQUMxRDtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsbUNBQW1DO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVDQUF1QztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Qsb0JBQW9CO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0xpQzs7QUFFaUI7O0FBRVk7O0FBRU07O0FBRXJELGdDQUFnQyw4REFBSyxDQUFDLDJDQUFVO0FBQy9ELFFBQVEsaUVBQVk7O0FBRXBCO0FBQ0E7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQyxtQkFBbUIsZUFBZTtBQUNsQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0Isd0VBQVc7O0FBRTdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksb0ZBQWE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsMEVBQTBFLDZCQUE2QjtBQUN2RztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUNoRjJCOztBQUVaO0FBQ2YsT0FBTyxxQ0FBSTs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStEO0FBQy9EO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHNCQUFzQjtBQUN0QztBQUNBLFdBQVcsc0JBQXNCO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUM1REE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSwrTEFBMkU7QUFDdkY7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxnQ0FBZ0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvY29tcG9uZW50cy9jYXJkcy9kYW1zLWNvbGxlY3Rpb24tY2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvY29tcG9uZW50cy9jYXJkcy9kYW1zLWNvbGxlY3Rpb24tY2FyZC50cGwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL2NvbXBvbmVudHMvY2FyZHMvZGFtcy1pdGVtLWNhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL2NvbXBvbmVudHMvY2FyZHMvZGFtcy1pdGVtLWNhcmQudHBsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy91dGlscy9hcHAtY29sbGVjdGlvbi1jYXJkLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy91dGlscy9hcHAtY29sbGVjdGlvbi1jYXJkLnRwbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvbGliL3V0aWxzL2ludGVyc2VjdGlvbi1vYnNlcnZlci1sb2FkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGl0RWxlbWVudCB9IGZyb20gXCJsaXRcIjtcblxuaW1wb3J0IHJlbmRlciBmcm9tIFwiLi9kYW1zLWNvbGxlY3Rpb24tY2FyZC50cGwuanNcIjtcblxuaW1wb3J0IHsgTWl4aW4sIExpdENvcmtVdGlscyB9IGZyb20gJ0B1Y2QtbGliL2NvcmstYXBwLXV0aWxzJztcblxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi8uLi8uLi9saWIvdXRpbHMvaW5kZXguanNcIjtcblxuLyoqXG4gKiBAY2xhc3MgRGFtc0NvbGxlY3Rpb25DYXJkXG4gKiBAZGVzY3JpcHRpb24gVUkgY29tcG9uZW50IGNsYXNzIGZvciBkaXNwbGF5aW5nIGEgY29sbGVjdGlvbiBwcmV2aWV3IGNhcmRcbiAqXG4gKiBAcHJvcCB7T2JqZWN0fSBjb2xsZWN0aW9uIC0gQW4gb2JqZWN0IGRlc2NyaWJpbmcgYSBEQU1TIGNvbGxlY3Rpb24uXG4gKiBJZiB1c2VkLCBlbGVtZW50IHdpbGwgc2V0IGFsbCBzdWJzZXF1ZW50IHByb3BlcnRpZXMgd2l0aCBkYXRhIGZyb20gY29sbGVjdGlvbnMgb2JqZWN0LlxuICogQHByb3Age1N0cmluZ30gaW1nU3JjIC0gVGhlIGNvbGxlY3Rpb24gdGh1bWJuYWlsIHNyYy5cbiAqIEBwcm9wIHtTdHJpbmd9IGNhcmRUaXRsZSAtIFRoZSB0aXRsZSBvZiB0aGUgY29sbGVjdGlvbi5cbiAqIEBwcm9wIHtOdW1iZXJ9IGl0ZW1DdCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgaXRlbXMgaW4gdGhlIGNvbGxlY3Rpb25zLlxuICogQHByb3Age1N0cmluZ30gaHJlZiAtIExpbmsgdG8gdGhlIGNvbGxlY3Rpb24gbGFuZGluZyBwYWdlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYW1zQ29sbGVjdGlvbkNhcmQgZXh0ZW5kcyBNaXhpbihMaXRFbGVtZW50KS53aXRoKFxuICBMaXRDb3JrVXRpbHNcbikge1xuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbGxlY3Rpb246IHsgdHlwZTogT2JqZWN0IH0sXG4gICAgICBpZDogeyB0eXBlOiBTdHJpbmcsIGF0dHJpYnV0ZTogXCJkYXRhLWlkXCIgfSxcbiAgICAgIGltZ1NyYzogeyB0eXBlOiBTdHJpbmcsIGF0dHJpYnV0ZTogXCJpbWctc3JjXCIgfSxcbiAgICAgIGNhcmRUaXRsZTogeyB0eXBlOiBTdHJpbmcsIGF0dHJpYnV0ZTogXCJjYXJkLXRpdGxlXCIgfSxcbiAgICAgIGl0ZW1DdDogeyB0eXBlOiBOdW1iZXIsIGF0dHJpYnV0ZTogXCJpdGVtLWN0XCIgfSxcbiAgICAgIGhyZWY6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICBkYXJrQmc6IHsgdHlwZTogQm9vbGVhbiwgYXR0cmlidXRlOiBcImRhdGEtZGFyay1iZ1wiIH0sXG4gICAgICBsb2FkaW5nOiB7IHR5cGU6IEJvb2xlYW4gfVxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmNvbGxlY3Rpb24gPSB7fTtcbiAgICB0aGlzLmlkID0gXCJcIjtcbiAgICB0aGlzLnJlbmRlcmVkSWQgPSBcIlwiO1xuICAgIHRoaXMuaW1nU3JjID0gXCJcIjtcbiAgICB0aGlzLmNhcmRUaXRsZSA9IFwiXCI7XG4gICAgdGhpcy5pdGVtQ3QgPSAwO1xuICAgIHRoaXMuaHJlZiA9IFwiXCI7XG4gICAgdGhpcy5kYXJrQmcgPSBmYWxzZTtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgdGhpcy5faW5qZWN0TW9kZWwoXCJDb2xsZWN0aW9uTW9kZWxcIiwgXCJGY0FwcENvbmZpZ01vZGVsXCIpO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlZChwcm9wcykgeyAgICBcbiAgICBpZiAocHJvcHMuaGFzKFwiaWRcIikgJiYgdGhpcy5pZCAmJiB0aGlzLmlkICE9PSB0aGlzLnJlbmRlcmVkSWQgKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLl9vbkNvbGxlY3Rpb25VcGRhdGUoYXdhaXQgdGhpcy5Db2xsZWN0aW9uTW9kZWwuZ2V0KHRoaXMuaWQpKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdDb2xsZWN0aW9uIG5vdCBmb3VuZCcsIGUpO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoIHByb3BzLmhhcyhcImhyZWZcIikgJiYgIXRoaXMuaWQgKSB7XG4gICAgICB0aGlzLmlkID0gdGhpcy5ocmVmO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIF9vbkNvbGxlY3Rpb25VcGRhdGUoZSkge1xuICAgIGlmKCBlLnN0YXRlICE9PSBcImxvYWRlZFwiIHx8IGUuaWQgIT09IHRoaXMuaWQgfHwgdGhpcy5yZW5kZXJlZElkID09PSB0aGlzLmlkICkgcmV0dXJuO1xuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMucmVuZGVyZWRJZCA9IHRoaXMuaWQ7XG5cbiAgICB0aGlzLmNvbGxlY3Rpb24gPSBlLnZjRGF0YTtcblxuICAgIGxldCBjbGllbnRFZGl0c0lkID0gdGhpcy5jb2xsZWN0aW9uLmNsaWVudEVkaXRzPy5bJ0BpZCddO1xuICAgIGxldCBvdmVycmlkZGVuRmVhdHVyZUltYWdlID0gIHRoaXMuY29sbGVjdGlvbi5jbGllbnRFZGl0cz8udGh1bWJuYWlsVXJsPy5bJ0BpZCddO1xuICAgIGlmKCBjbGllbnRFZGl0c0lkICYmIG92ZXJyaWRkZW5GZWF0dXJlSW1hZ2UgKSB7XG4gICAgICB0aGlzLmltZ1NyYyA9ICcvZmNyZXBvL3Jlc3QnICsgY2xpZW50RWRpdHNJZCArICcvZmVhdHVyZWRJbWFnZS5qcGcnO1xuICAgIH0gZWxzZSBpZiggdGhpcy5jb2xsZWN0aW9uLmltYWdlcyApIHtcbiAgICAgIGxldCBpbWFnZXMgPSB0aGlzLmNvbGxlY3Rpb24uaW1hZ2VzO1xuICAgICAgdGhpcy5pbWdTcmMgPSBpbWFnZXMubWVkaXVtID8gaW1hZ2VzLm1lZGl1bS51cmwgOiBpbWFnZXMub3JpZ2luYWwudXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmltZ1NyYyA9IFwiL2ltYWdlcy90cmVlLWJpa2UtaWxsdXN0cmF0aW9uLnBuZ1wiO1xuICAgIH1cbiAgICB0aGlzLmNhcmRUaXRsZSA9IHRoaXMuY29sbGVjdGlvbi50aXRsZTtcbiAgICB0aGlzLml0ZW1DdCA9IHV0aWxzLmZvcm1hdE51bWJlcldpdGhDb21tYXModGhpcy5jb2xsZWN0aW9uLmNvdW50KTtcbiAgICB0aGlzLmhyZWYgPSB0aGlzLmNvbGxlY3Rpb24uaWQ7XG4gICAgdGhpcy5kYXJrQmcgPSB0aGlzLmF0dHJpYnV0ZXNbXCJkYXRhLWRhcmstYmdcIl0gPyB0cnVlIDogZmFsc2U7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiZGFtcy1jb2xsZWN0aW9uLWNhcmRcIiwgRGFtc0NvbGxlY3Rpb25DYXJkKTtcbiIsImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQnO1xuLy8gaW1wb3J0IHsgc3R5bGVNYXAgfSBmcm9tICdsaXQvZGlyZWN0aXZlcy9zdHlsZS1tYXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXIoKSB7IFxucmV0dXJuIGh0bWxgXG5cbjxzdHlsZT5cbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG4gIC5jb250YWluZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuICBhIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIH1cbiAgLmltZy1jb250YWluZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBwYWRkaW5nLXRvcDogNzUlO1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvaW1hZ2VzL2xvZ29zL2xvZ28td2hpdGUtNTEyLnBuZyk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmxhY2stMjApO1xuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XG4gIH1cbiAgLmltZy1jb250YWluZXIgaW1nIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgfVxuICAuaGVhZCB7XG4gICAgYm9yZGVyOiAzcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgdHJhbnNpdGlvbjogLjNzO1xuICB9XG4gIC5jb250YWluZXI6aG92ZXIgLmhlYWQsIC5jb250YWluZXI6Zm9jdXMgLmhlYWQge1xuICAgIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLWNvbG9yLWRhbXMtc2Vjb25kYXJ5KTtcbiAgfVxuICBoNSB7XG4gICAgbWFyZ2luOiAxMHB4IDAgNXB4IDA7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLWg1KTtcbiAgICBmb250LXNpemU6IHZhcigtLWZzLWg1KTtcbiAgICBmb250LXdlaWdodDogdmFyKC0tZnctaDUpO1xuICB9XG4gIC5zdWJ0aXRsZSB7XG4gICAgZm9udC1zaXplOiB2YXIoLS1mcy1wKTtcbiAgICBmb250LXdlaWdodDogdmFyKC0tZnctZXh0cmEtYm9sZCk7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtNzApO1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIH1cbiAgLmdvbGQtZG90cyB7XG4gICAgd2lkdGg6IDA7XG4gICAgdHJhbnNpdGlvbjogLjRzO1xuICAgIGJvcmRlci1ib3R0b206IDVweCBkb3R0ZWQgdmFyKC0tY29sb3ItZGFtcy1zZWNvbmRhcnkpO1xuICB9XG4gIC5jb250YWluZXI6aG92ZXIgLmdvbGQtZG90cywgLmNvbnRhaW5lcjpmb2N1cyAuZ29sZC1kb3RzIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5tYXJrZXRpbmctaGlnaGxpZ2h0IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIH1cblxuICAubWFya2V0aW5nLWhpZ2hsaWdodDpob3ZlciAubWFya2V0aW5nLWhpZ2hsaWdodF9faW1hZ2UgLnUtYmFja2dyb3VuZC1pbWFnZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xuICB9XG5cbiAgLm1hcmtldGluZy1oaWdobGlnaHRfX2ltYWdlIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBtYXJnaW46IDFyZW0gMDtcbiAgfVxuXG4gIC5tYXJrZXRpbmctaGlnaGxpZ2h0X19pbWFnZSAudS1iYWNrZ3JvdW5kLWltYWdlIHtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjNzIGVhc2UtaW4tb3V0O1xuICB9XG5cbiAgLm1hcmtldGluZy1oaWdobGlnaHRfX3RpdGxlIHtcbiAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIHBhZGRpbmctdG9wOiAwO1xuICAgIG1hcmdpbi10b3A6IDA7XG4gICAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgfVxuXG4gIC5tYXJrZXRpbmctaGlnaGxpZ2h0X19pdGVtcyB7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIGNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTgwKTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjI1O1xuICAgIG1hcmdpbjogMC41cmVtIDAgMXJlbTtcbiAgfVxuXG4gIC51LWJhY2tncm91bmQtaW1hZ2Uge1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIH1cbiAgLnUtYmFja2dyb3VuZC1pbWFnZS5sb2FkaW5nIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGNkY2RjO1xuICB9XG5cbiAgLmFzcGVjdC0tNHgzIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBwYWRkaW5nLXRvcDogNzUlO1xuICB9XG5cbiAgLm1hcmtldGluZy1oaWdobGlnaHRfX2JvZHkuZGFyayBoNCB7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLXdoaXRlKTtcbiAgICAvKiBmb250LXNpemU6IDEuNXJlbTsgKi9cbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICB9XG5cbiAgLm1hcmtldGluZy1oaWdobGlnaHRfX2JvZHkuZGFyayBwIHtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItYmxhY2stMzApO1xuICAgIC8qIGZvbnQtc2l6ZTogMS4xcmVtOyAqL1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gIH1cblxuICAubWFya2V0aW5nLWhpZ2hsaWdodF9fYm9keS5kYXJrIHtcbiAgICBwYWRkaW5nLXRvcDogMC41cmVtO1xuICB9XG5cbjwvc3R5bGU+ICBcblxuPCEtLSA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+PGEgaHJlZj1cIiR7dGhpcy5ocmVmfVwiPlxuICA8ZGl2IGNsYXNzPVwiaGVhZFwiPlxuICAgIDxkaXYgY2xhc3M9XCJpbWctY29udGFpbmVyXCI+XG4gICAgICAke3RoaXMuaW1nU3JjID8gaHRtbGBcbiAgICAgICAgPGltZyBzcmM9XCIke3RoaXMuaW1nU3JjfVwiPlxuICAgICAgYCA6IGh0bWxgYH1cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJib2R5XCI+XG4gICAgPGg1PiR7dGhpcy5jYXJkVGl0bGV9PC9oNT5cbiAgICA8ZGl2IGNsYXNzPVwic3VidGl0bGVcIj4ke3RoaXMuaXRlbUN0fSBpdGVtJHt0aGlzLml0ZW1DdCA9PT0gMSA/IFwiXCIgOiBcInNcIn08L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJmb290ZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZ29sZC1kb3RzXCI+PC9kaXY+XG4gIDwvZGl2PjwvYT5cbjwvZGl2PiAtLT5cblxuJHt0aGlzLmhyZWYgPyBodG1sYFxuICA8YSBocmVmPVwiJHt0aGlzLmhyZWZ9XCIgY2xhc3M9XCJtYXJrZXRpbmctaGlnaGxpZ2h0IGNhdGVnb3J5LWJyYW5kLS1zZWNvbmRhcnkgdS1zcGFjZS1tYiBvLWJveFwiPlxuICAgIDxkaXYgY2xhc3M9XCJtYXJrZXRpbmctaGlnaGxpZ2h0X19pbWFnZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImFzcGVjdC0tNHgzIHUtYmFja2dyb3VuZC1pbWFnZSAke3RoaXMubG9hZGluZyA/ICdsb2FkaW5nJyA6ICcnfVwiIHJvbGU9XCJpbWdcIiBhcmlhLWxhYmVsPVwiXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOnVybCgke3RoaXMuaW1nU3JjfSlcIj5cbiAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibWFya2V0aW5nLWhpZ2hsaWdodF9fYm9keSAke3RoaXMuZGFya0JnID8gJ2RhcmsnIDogJyd9XCI+XG4gICAgICAke3RoaXMuY2FyZFRpdGxlXG4gICAgICAgID8gaHRtbGA8aDQgY2xhc3M9XCJtYXJrZXRpbmctaGlnaGxpZ2h0X190aXRsZVwiPiR7dGhpcy5jYXJkVGl0bGV9PC9oND5gXG4gICAgICAgIDogaHRtbGBgXG4gICAgICB9XG4gICAgICA8cCBjbGFzcz1cIm1hcmtldGluZy1oaWdobGlnaHRfX2l0ZW1zXCI+PHNwYW4gP2hpZGRlbj1cIiR7IXRoaXMuaXRlbUN0fVwiPiR7dGhpcy5pdGVtQ3QgfHwgMH0gaXRlbSR7dGhpcy5pdGVtQ3QgPT0gMSA/ICcnIDogJ3MnfTwvc3Bhbj48L3A+XG4gICAgPC9kaXY+XG4gIDwvYT5gIDogaHRtbGBgfVxuXG5cblxuYH0iLCJpbXBvcnQgeyBMaXRFbGVtZW50IH0gZnJvbSBcImxpdFwiO1xuXG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2RhbXMtaXRlbS1jYXJkLnRwbC5qc1wiO1xuXG5pbXBvcnQgeyBNaXhpbiwgTGl0Q29ya1V0aWxzIH0gZnJvbSAnQHVjZC1saWIvY29yay1hcHAtdXRpbHMnO1xuXG5pbXBvcnQgXCJAdWNkLWxpYi90aGVtZS1lbGVtZW50cy91Y2RsaWIvdWNkbGliLWljb24vdWNkbGliLWljb25cIjtcblxuLyoqXG4gKiBAY2xhc3MgRGFtc0l0ZW1DYXJkXG4gKiBAZGVzY3JpcHRpb24gVUkgY29tcG9uZW50IGNsYXNzIGZvciBkaXNwbGF5aW5nIGEgaXRlbSBwcmV2aWV3IGNhcmRcbiAqXG4gKiBAcHJvcCB7U3RyaW5nfSBpZCAtIEl0ZW0gaWRcbiAqIElmIHVzZWQsIGVsZW1lbnQgd2lsbCBxdWVyeSB0aGUgUmVjb3JkTW9kZWwgZm9yIHRoZSBpdGVtIGRhdGEuXG4gKiBAcHJvcCB7T2JqZWN0fSBkYXRhIC0gRGF0YSBvYmplY3QgY29udGFpbmluZyBpdGVtIGluZm9ybWF0aW9uXG4gKiBAcHJvcCB7U3RyaW5nfSBpdGVtVXJsIC0gVXJsIHRvIGl0ZW1cbiAqIEBwcm9wIHtTdHJpbmd9IHRodW1ibmFpbFVybCAtIFRodW1ibmFpbCB1cmxcbiAqIEBwcm9wIHtTdHJpbmd9IHRydW5jYXRlZFRpdGxlIC0gVGl0bGVzIG92ZXIgMzggY2hhcmFjdGVycyB3aWxsIGJlIHRydW5jYXRlZCB0byBmaXQgYSBzaW5nbGUgbGluZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYW1zSXRlbUNhcmQgZXh0ZW5kcyBNaXhpbihMaXRFbGVtZW50KS53aXRoKExpdENvcmtVdGlscykge1xuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiB7IHR5cGU6IFN0cmluZywgYXR0cmlidXRlOiBcImRhdGEtaXRlbWlkXCIgfSxcbiAgICAgIC8vIHJlY29yZDogeyB0eXBlOiBPYmplY3QgfSxcbiAgICAgIGRhdGE6IHsgdHlwZTogT2JqZWN0IH0sXG4gICAgICBpdGVtVXJsOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgdGh1bWJuYWlsVXJsOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgdHJ1bmNhdGVkVGl0bGU6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICBtZWRpYVR5cGVzOiB7IHR5cGU6IEFycmF5IH0sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuaWQgPSBcIlwiO1xuICAgIC8vIHRoaXMucmVjb3JkID0ge307XG4gICAgdGhpcy5kYXRhID0ge307XG4gICAgdGhpcy50cnVuY2F0ZWRUaXRsZSA9IFwiXCI7XG4gICAgdGhpcy5pdGVtVXJsID0gXCJcIjtcbiAgICB0aGlzLnRodW1ibmFpbFVybCA9IFwiXCI7XG4gICAgdGhpcy5tZWRpYVR5cGVzID0gW107XG5cbiAgICB0aGlzLl9pbmplY3RNb2RlbChcIlJlY29yZE1vZGVsXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd2lsbFVwZGF0ZVxuICAgKiBAZGVzY3JpcHRpb24gTGl0IGxpZmVjeWNsZSBtZXRob2QgY2FsbGVkIHdoZW4gZWxlbWVudCBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0ge01hcH0gcHJvcHMgLSBQcm9wZXJ0aWVzIHRoYXQgaGF2ZSBjaGFuZ2VkLlxuICAgKi9cbiAgd2lsbFVwZGF0ZShwcm9wcykge1xuICAgIGlmICh0aGlzLmRhdGEuaWQpIHtcbiAgICAgIHRoaXMuaXRlbVVybCA9IHRoaXMuZGF0YS5pZDtcbiAgICAgIHRoaXMudGh1bWJuYWlsVXJsID0gdGhpcy5kYXRhLnRodW1ibmFpbFVybCB8fCAnL2ltYWdlcy90cmVlLWJpa2UtaWxsdXN0cmF0aW9uLnBuZyc7XG5cbiAgICAgIHRoaXMubWVkaWFUeXBlcyA9IHRoaXMuZGF0YS5tZWRpYVR5cGVzO1xuICAgICAgaWYgKHRoaXMuZGF0YS5tZWRpYVR5cGVzPy5pbmNsdWRlcyhcIkltYWdlXCIpKSB7XG4gICAgICAgIHRoaXMubWVkaWFUeXBlcy5wdXNoKFwiaW1hZ2VcIik7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kYXRhLm1lZGlhVHlwZXM/LmluY2x1ZGVzKFwiVmlkZW9cIikpIHtcbiAgICAgICAgdGhpcy5tZWRpYVR5cGVzLnB1c2goXCJ2aWRlb1wiKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRhdGEubWVkaWFUeXBlcz8uaW5jbHVkZXMoXCJBdWRpb1wiKSkge1xuICAgICAgICB0aGlzLm1lZGlhVHlwZXMucHVzaChcImF1ZGlvXCIpO1xuICAgICAgfVxuICAgICAgaWYoIHRoaXMuZGF0YS5tdWx0aUltYWdlICkge1xuICAgICAgICB0aGlzLm1lZGlhVHlwZXMucHVzaChcImltYWdlTGlzdFwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZ2V0SXRlbSh0aGlzLmlkKTtcbiAgICB9XG5cbiAgICB0aGlzLl90cnVuY2F0ZVRpdGxlKCk7XG4gIH1cblxuICBhc3luYyBfb25SZWNvcmRVcGRhdGUoZSkge1xuICAgIGlmIChlLnN0YXRlICE9PSBcImxvYWRlZFwiIHx8IGUuaWQgIT09IHRoaXMuaWQpIHJldHVybjtcblxuICAgIHRoaXMucmVjb3JkID0gZS52Y0RhdGE7XG4gICAgaWYoIHRoaXMucmVjb3JkLmltYWdlcyApIHtcbiAgICAgIGxldCBpbWFnZXMgPSB0aGlzLnJlY29yZC5pbWFnZXM7XG4gICAgICB0aGlzLnRodW1ibmFpbFVybCA9IGltYWdlcy5tZWRpdW0gPyBpbWFnZXMubWVkaXVtLnVybCA6IGltYWdlcy5vcmlnaW5hbC51cmw7XG4gICAgfVxuICAgIHRoaXMudGl0bGUgPSB0aGlzLnJlY29yZC5uYW1lO1xuICAgIHRoaXMuaXRlbVVybCA9IHRoaXMucmVjb3JkWydAaWQnXTtcbiAgICB0aGlzLmlkID0gdGhpcy5yZWNvcmRbJ0BpZCddO1xuICAgIHRoaXMubWVkaWFUeXBlID0gdGhpcy5yZWNvcmQubWVkaWFUeXBlO1xuXG4gICAgdGhpcy5fdHJ1bmNhdGVUaXRsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX2dldEl0ZW1cbiAgICogQGRlc2NyaXB0aW9uIEZldGNoZXMgaXRlbSBkYXRhIGZyb20gUmVjb3JkTW9kZWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IGlkIC0gSXRlbSBpZCB0byBmZXRjaFxuICAgKi9cbiAgYXN5bmMgX2dldEl0ZW0oaWQpIHtcbiAgICB0aGlzLl9vblJlY29yZFVwZGF0ZShhd2FpdCB0aGlzLlJlY29yZE1vZGVsLmdldChpZCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX3RydW5jYXRlVGl0bGVcbiAgICogQGRlc2NyaXB0aW9uIFRydW5jYXRlcyB0aXRsZXMgb3ZlciAzOCBjaGFyYWN0ZXJzIHRvIGZpdCBhIHNpbmdsZSBsaW5lXG4gICAqL1xuICBfdHJ1bmNhdGVUaXRsZSgpIHtcbiAgICBpZiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YS50aXRsZSAmJiB0aGlzLmRhdGEudGl0bGUubGVuZ3RoID4gMzgpIHtcbiAgICAgIHRoaXMudHJ1bmNhdGVkVGl0bGUgPSB0aGlzLmRhdGEudGl0bGUuc3Vic3RyaW5nKDAsIDM0KSArIFwiLi4uXCI7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLnRpdGxlKSB7XG4gICAgICB0aGlzLnRydW5jYXRlZFRpdGxlID0gdGhpcy5kYXRhLnRpdGxlO1xuICAgIH0gZWxzZSBpZiAoIHRoaXMudGl0bGUgJiYgdGhpcy50aXRsZS5sZW5ndGggPiAzOCApIHtcbiAgICAgIHRoaXMudHJ1bmNhdGVkVGl0bGUgPSB0aGlzLnRpdGxlLnN1YnN0cmluZygwLCAzNCkgKyBcIi4uLlwiO1xuICAgIH0gZWxzZSBpZiAoIHRoaXMudGl0bGUgKSB7XG4gICAgICB0aGlzLnRydW5jYXRlZFRpdGxlID0gdGhpcy50aXRsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cnVuY2F0ZWRUaXRsZSA9IFwiXCI7XG4gICAgfVxuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImRhbXMtaXRlbS1jYXJkXCIsIERhbXNJdGVtQ2FyZCk7XG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSBcImxpdFwiO1xuLy8gaW1wb3J0IHsgc3R5bGVNYXAgfSBmcm9tICdsaXQvZGlyZWN0aXZlcy9zdHlsZS1tYXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXIoKSB7XG4gIHJldHVybiBodG1sYFxuICAgIDxzdHlsZT5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG4gICAgICBbaGlkZGVuXSB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICAgIC5jb250YWluZXIge1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB9XG4gICAgICBhIHtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgfVxuICAgICAgLmltZy1jb250YWluZXIge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBwYWRkaW5nLXRvcDogNzUlO1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL2ltYWdlcy9sb2dvcy9sb2dvLXdoaXRlLTUxMi5wbmcpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1ibGFjay0yMCk7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcbiAgICAgIH1cbiAgICAgIC5pbWctY29udGFpbmVyIGltZyB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICAgIH1cbiAgICAgIC5oZWFkIHtcbiAgICAgICAgYm9yZGVyOiAzcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIHRyYW5zaXRpb246IDAuM3M7XG4gICAgICB9XG4gICAgICAuY29udGFpbmVyOmhvdmVyIC5oZWFkLFxuICAgICAgLmNvbnRhaW5lcjpmb2N1cyAuaGVhZCB7XG4gICAgICAgIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLWNvbG9yLWRhbXMtc2Vjb25kYXJ5KTtcbiAgICAgIH1cbiAgICAgIGg1IHtcbiAgICAgICAgbWFyZ2luOiAxMHB4IDAgNXB4IDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1jb2xvci1oNSk7XG4gICAgICAgIGZvbnQtc2l6ZTogdmFyKC0tZnMtaDUpO1xuICAgICAgICBmb250LXdlaWdodDogdmFyKC0tZnctaDUpO1xuICAgICAgfVxuICAgICAgLnN1YnRpdGxlIHtcbiAgICAgICAgZm9udC1zaXplOiB2YXIoLS1mcy1wKTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IHZhcigtLWZ3LWV4dHJhLWJvbGQpO1xuICAgICAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS03MCk7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICB9XG4gICAgICAuZ29sZC1kb3RzIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDVweCBkb3R0ZWQgdmFyKC0tY29sb3ItZGFtcy1zZWNvbmRhcnkpO1xuICAgICAgfVxuXG4gICAgICAubWFya2V0aW5nLWhpZ2hsaWdodCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgfVxuXG4gICAgICAvKiAubWFya2V0aW5nLWhpZ2hsaWdodDpob3ZlciAubWFya2V0aW5nLWhpZ2hsaWdodF9faW1hZ2UgLnUtYmFja2dyb3VuZC1pbWFnZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xuICB9ICovXG5cbiAgICAgIC5tYXJrZXRpbmctaGlnaGxpZ2h0X19pbWFnZSB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgbWFyZ2luOiAxcmVtIDAgMDtcbiAgICAgICAgcGFkZGluZzogMXJlbTtcbiAgICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2UtaW4tb3V0O1xuICAgICAgfVxuXG4gICAgICAubWFya2V0aW5nLWhpZ2hsaWdodF9faW1hZ2U6aG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1nb2xkLTMwKTtcbiAgICAgIH1cblxuICAgICAgLyogLm1hcmtldGluZy1oaWdobGlnaHRfX2ltYWdlIC51LWJhY2tncm91bmQtaW1hZ2Uge1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuM3MgZWFzZS1pbi1vdXQ7XG4gIH0gKi9cblxuICAgICAgLm1hcmtldGluZy1oaWdobGlnaHRfX3RpdGxlIHtcbiAgICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS04MCk7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIH1cblxuICAgICAgLyogLm1hcmtldGluZy1oaWdobGlnaHRfX2l0ZW1zIHtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgbGluZS1oZWlnaHQ6IDEuMjU7XG4gICAgbWFyZ2luOiAwLjVyZW0gMCAxcmVtO1xuICB9ICovXG5cbiAgICAgIC51LWJhY2tncm91bmQtaW1hZ2Uge1xuICAgICAgICAvKiBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjsgKi9cbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICAgICAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBib3R0b20gY2VudGVyO1xuICAgICAgfVxuICAgICAgLmFzcGVjdC0tNHgzIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgcGFkZGluZy10b3A6IDc1JTtcbiAgICAgIH1cblxuICAgICAgLm1lZGlhLXR5cGVzIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICByaWdodDogMC4yNXJlbTtcbiAgICAgICAgYm90dG9tOiAwLjI1cmVtO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgfVxuXG4gICAgICAubWVkaWEtdHlwZSB7XG4gICAgICAgIHdpZHRoOiAycmVtO1xuICAgICAgICBoZWlnaHQ6IDJyZW07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS04MCk7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBtYXJnaW46IDAuNXJlbSAwLjVyZW0gMCAwO1xuICAgICAgfVxuXG4gICAgICAubWVkaWEtdHlwZV9faWNvbiB7XG4gICAgICAgIHdpZHRoOiAxLjRyZW07XG4gICAgICB9XG5cbiAgICAgIHVjZGxpYi1pY29uIHtcbiAgICAgICAgd2lkdGg6IDEuMnJlbTtcbiAgICAgICAgaGVpZ2h0OiAxLjJyZW07XG4gICAgICAgIGZpbGw6IHdoaXRlO1xuICAgICAgfVxuICAgIDwvc3R5bGU+XG5cbiAgICA8YSBocmVmPVwiJHt0aGlzLml0ZW1Vcmx9XCJcbiAgICAgIGNsYXNzPVwibWFya2V0aW5nLWhpZ2hsaWdodCBjYXRlZ29yeS1icmFuZC0tc2Vjb25kYXJ5IHUtc3BhY2UtbWIgby1ib3hcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtYXJrZXRpbmctaGlnaGxpZ2h0X19pbWFnZVwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJhc3BlY3QtLTR4MyB1LWJhY2tncm91bmQtaW1hZ2VcIlxuICAgICAgICAgIHJvbGU9XCJpbWdcIlxuICAgICAgICAgIGFyaWEtbGFiZWw9XCIke3RoaXMudHJ1bmNhdGVkVGl0bGV9XCJcbiAgICAgICAgICBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6dXJsKCR7dGhpcy50aHVtYm5haWxVcmx9KTtcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZWRpYS10eXBlc1wiPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwibWVkaWEtdHlwZVwiXG4gICAgICAgICAgICA/aGlkZGVuPVwiJHshdGhpcy5tZWRpYVR5cGVzLmluY2x1ZGVzKFwidmlkZW9cIil9XCI+XG4gICAgICAgICAgICA8dWNkbGliLWljb25cbiAgICAgICAgICAgICAgc3R5bGU9XCJtYXJnaW4tbGVmdDogLjJyZW07XCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rX19pbWFnZVwiXG4gICAgICAgICAgICAgIGljb249XCJ1Y2RsaWItZGFtczpmYS1wbGF5XCI+XG4gICAgICAgICAgICA8L3VjZGxpYi1pY29uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwibWVkaWEtdHlwZVwiXG4gICAgICAgICAgICA/aGlkZGVuPVwiJHshdGhpcy5tZWRpYVR5cGVzLmluY2x1ZGVzKFwiYXVkaW9cIil9XCI+XG4gICAgICAgICAgICA8dWNkbGliLWljb25cbiAgICAgICAgICAgICAgY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rX19pbWFnZVwiXG4gICAgICAgICAgICAgIGljb249XCJ1Y2RsaWItZGFtczpmYS12b2x1bWUtaGlnaFwiPlxuICAgICAgICAgICAgPC91Y2RsaWItaWNvbj4gIFxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwibWVkaWEtdHlwZVwiXG4gICAgICAgICAgICA/aGlkZGVuPVwiJHshdGhpcy5tZWRpYVR5cGVzLmluY2x1ZGVzKFwiaW1hZ2VMaXN0XCIpfVwiPlxuICAgICAgICAgICAgPHVjZGxpYi1pY29uXG4gICAgICAgICAgICAgIGNsYXNzPVwidmVydGljYWwtbGlua19faW1hZ2VcIlxuICAgICAgICAgICAgICBpY29uPVwidWNkbGliLWRhbXM6aXRlbS1zdGFjay1ibGFua1wiPlxuICAgICAgICAgICAgPC91Y2RsaWItaWNvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnb2xkLWRvdHNcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtYXJrZXRpbmctaGlnaGxpZ2h0X19ib2R5XCI+XG4gICAgICAgIDxwIGNsYXNzPVwibWFya2V0aW5nLWhpZ2hsaWdodF9fdGl0bGVcIj4ke3RoaXMudHJ1bmNhdGVkVGl0bGV9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9hPlxuICBgO1xufVxuIiwiaW1wb3J0IHsgTGl0RWxlbWVudCB9IGZyb20gJ2xpdCc7XG5cbmltcG9ydCByZW5kZXIgZnJvbSBcIi4vYXBwLWNvbGxlY3Rpb24tY2FyZC50cGwuanNcIjtcblxuaW1wb3J0IHsgTWl4aW4sIExpdENvcmtVdGlscyB9IGZyb20gJ0B1Y2QtbGliL2NvcmstYXBwLXV0aWxzJztcblxuaW1wb3J0IGlvTG9hZGVyIGZyb20gXCIuLi8uLi9saWIvdXRpbHMvaW50ZXJzZWN0aW9uLW9ic2VydmVyLWxvYWRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBDb2xsZWN0aW9uQ2FyZCBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpXG4gIC53aXRoKExpdENvcmtVdGlscykge1xuXG4gIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sbGVjdGlvbiA6IHsgdHlwZSA6IE9iamVjdCB9LFxuICAgICAgdGFiaW5kZXggOiB7IHR5cGUgOiBOdW1iZXIgfSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5jb2xsZWN0aW9uID0ge307XG4gICAgdGhpcy50YWJpbmRleCA9IDA7XG5cbiAgICB0aGlzLnNob3duSW5WaWV3cG9ydCA9IGZhbHNlO1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNvbm5lY3RlZENhbGxiYWNrKCkgeyAgICBcbiAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIGlmICggdGhpcy5jb2xsZWN0aW9uLnRodW1ibmFpbFVybCA9PT0gJy9pbWFnZXMvbG9nb3MvbG9nby13aGl0ZS01MTIucG5nJyApIHtcbiAgICAgIGxldCBjYXJkcyA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yQWxsKCcuaW1nJylbMF07XG4gICAgICBjYXJkcy5jbGFzc05hbWUgKz0gJyBkZWZhdWx0SW1hZ2UnO1xuICAgIH1cblxuICAgIGlmKCAhdGhpcy5vYnNlcnZlciApIHtcbiAgICAgIGF3YWl0IGlvTG9hZGVyLmxvYWQoKTtcbiAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG4gICAgICAgIGUgPT4gdGhpcy5fb25WaWV3cG9ydEludGVyc2VjdGlvbihlKSwgXG4gICAgICAgIHtcbiAgICAgICAgICByb290TWFyZ2luOiAnMTBweCcsIFxuICAgICAgICAgIHRocmVzaG9sZDogMFxuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuaW1hZ2VMb2FkZWQgPSBmYWxzZTtcbiAgICB0aGlzLm9ic2VydmVyLm9ic2VydmUodGhpcyk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICB9XG5cbiAgdXBkYXRlZCgpIHtcbiAgICB0aGlzLl9vbkNvbGxlY3Rpb25DaGFuZ2UoKTtcbiAgfVxuXG4gIF9vbkNvbGxlY3Rpb25DaGFuZ2UoKSB7XG4gICAgaWYoICF0aGlzLnNob3duSW5WaWV3cG9ydCApIHJldHVybjtcbiAgICB0aGlzLl9zZXRCYWNrZ3JvdW5kSW1hZ2UoKTtcbiAgfVxuXG4gIF9vblZpZXdwb3J0SW50ZXJzZWN0aW9uKGUpIHtcbiAgICBpZiggZS5sZW5ndGggPT09IDAgKSByZXR1cm47XG4gICAgZSA9IGVbMF07XG4gICAgXG4gICAgaWYoIHRoaXMuc2hvd25JblZpZXdwb3J0IHx8ICFlLmlzSW50ZXJzZWN0aW5nICkgcmV0dXJuO1xuICAgIHRoaXMuc2hvd25JblZpZXdwb3J0ID0gdHJ1ZTtcblxuICAgIHRoaXMuX3NldEJhY2tncm91bmRJbWFnZSgpO1xuICB9XG5cbiAgX3NldEJhY2tncm91bmRJbWFnZSgpIHtcbiAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignI2ltZycpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJyR7dGhpcy5jb2xsZWN0aW9uLnRodW1ibmFpbFVybH0nKWA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhcHAtY29sbGVjdGlvbi1jYXJkJywgQXBwQ29sbGVjdGlvbkNhcmQpOyIsImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXIoKSB7XG5yZXR1cm4gaHRtbGBcblxuPHN0eWxlPlxuICA6aG9zdCB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIG1hcmdpbjogMTVweDtcbiAgICBvdXRsaW5lIDogMDtcbiAgICBoZWlnaHQ6IDMyMHB4O1xuICAgIHdpZHRoOiAzMjBweDtcbiAgfVxuXG4gIDpob3N0KDpob3ZlciksIDpob3N0KDpmb2N1cykgIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgbWFyZ2luOiAxM3B4O1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWRlZmF1bHQtc2Vjb25kYXJ5LWNvbG9yKTtcbiAgfVxuXG4gIC5pbWcuZGVmYXVsdEltYWdlIHtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDY1JTtcbiAgfVxuXG4gIC5pbWcge1xuICAgIGhlaWdodDogMzIwcHg7XG4gICAgd2lkdGg6IDMyMHB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9pbWFnZXMvbG9nb3MvbG9nby13aGl0ZS01MTIucG5nJyk7IC8qIGZhbGxiYWNrICovXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQtYmFja2dyb3VuZC1jb2xvcik7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjsgLyogbmVlZHMgdG8gYmUgNjUlICovXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyOyAgICBcbiAgfVxuXG4gIC5pbWcgPiBkaXYgIHtcbiAgICBwYWRkaW5nOiAxNXB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAyNXB4O1xuICAgIGJvdHRvbTogMjVweDtcbiAgICBcbiAgICBjb2xvcjogdmFyKC0tZGVmYXVsdC1zZWNvbmRhcnktY29sb3IpO1xuICAgIGZvbnQtd2VpZ2h0OiB2YXIoLS1mdy1ib2xkKTtcblxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMzgsIDg1LCAuOCk7ICAgICAgXG4gIH1cbjwvc3R5bGU+XG5cbjxkaXYgXG4gIGlkPVwiaW1nXCJcbiAgY2xhc3M9XCJpbWdcIiBcbiAgcm9sZT1cImltZ1wiIFxuICBhcmlhLWxhYmVsPVwiJHt0aGlzLmNvbGxlY3Rpb24udGl0bGV9XCI+XG4gIDxkaXY+XG4gICAgPGRpdj4ke3RoaXMuY29sbGVjdGlvbi50aXRsZX08L2Rpdj5cbiAgICA8ZGl2PjQyIGl0ZW1zPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbmA7fSIsImNsYXNzIEludGVyc2VjdGlvbk9ic2VydmVyTG9hZGVyIHtcbiAgYXN5bmMgbG9hZCgpIHtcbiAgICBpZiggd2luZG93LkludGVyc2VjdGlvbk9ic2VydmVyICkgcmV0dXJuIHRydWU7XG5cbiAgICBpZiAoIHRoaXMubG9hZGVkICkgcmV0dXJuIHRydWU7XG5cbiAgICBpZiAoIHRoaXMubG9hZGluZyApIHtcbiAgICAgIGF3YWl0IHRoaXMubG9hZGluZztcbiAgICAgIHJldHVybiB0aGlzLmxvYWRlZDtcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRpbmcgPSBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJvYnNlcnZlci1wb2x5ZmlsbFwiICovICdpbnRlcnNlY3Rpb24tb2JzZXJ2ZXInKTtcbiAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5sb2FkaW5nO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlckxvYWRlcigpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==