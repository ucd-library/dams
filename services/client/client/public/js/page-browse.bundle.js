"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["page-browse"],{

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

/***/ "./public/elements/components/ucdlib-browse-az.js":
/*!********************************************************!*\
  !*** ./public/elements/components/ucdlib-browse-az.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UcdlibBrowseAZ)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _ucdlib_browse_az_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ucdlib-browse-az.tpl.js */ "./public/elements/components/ucdlib-browse-az.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");



// sets globals Mixin and EventInterface


class UcdlibBrowseAZ extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {

  static get properties() {
    return {
        selectedLetter : { type : String, attribute : 'selected-letter' },
        results : { type : Array },
        alpha : { type : Array },
    }
  }

  static get styles() {
    return (0,_ucdlib_browse_az_tpl_js__WEBPACK_IMPORTED_MODULE_1__.styles)();
  }

  constructor() {
    super();
    this._injectModel('AppStateModel');
    this.render = _ucdlib_browse_az_tpl_js__WEBPACK_IMPORTED_MODULE_1__.render.bind(this);
    this.reset();
  }

  reset() {
    this.alpha = [
        {display: '#', value: '1', exists: true},
        {display: 'A', value: 'a', exists: true},
        {display: 'B', value: 'b', exists: true},
        {display: 'C', value: 'c', exists: true},
        {display: 'D', value: 'd', exists: true},
        {display: 'E', value: 'e', exists: true},
        {display: 'F', value: 'f', exists: true},
        {display: 'G', value: 'g', exists: true},
        {display: 'H', value: 'h', exists: true},
        {display: 'I', value: 'i', exists: true},
        {display: 'J', value: 'j', exists: true},
        {display: 'K', value: 'k', exists: true},
        {display: 'L', value: 'l', exists: true},
        {display: 'M', value: 'm', exists: true},
        {display: 'N', value: 'n', exists: true},
        {display: 'O', value: 'o', exists: true},
        {display: 'P', value: 'p', exists: true},
        {display: 'Q', value: 'q', exists: true},
        {display: 'R', value: 'r', exists: true},
        {display: 'S', value: 's', exists: true},
        {display: 'T', value: 't', exists: true},
        {display: 'U', value: 'u', exists: true},
        {display: 'V', value: 'v', exists: true},
        {display: 'W', value: 'w', exists: true},
        {display: 'X', value: 'x', exists: true},
        {display: 'Y', value: 'y', exists: true},
        {display: 'Z', value: 'z', exists: true}
    ];

    this.selectedLetter = '';
    this.results = [];
  }

  async firstUpdated() {
    await this._onAppStateUpdate(await this.AppStateModel.get());
  }

  willUpdate(changedProperties) {
    if (changedProperties.has('results')) {
      this._updateSelectableLetters();
    }
  }

  async _onAppStateUpdate(e) {
    if( e.location.page !== 'browse' || e.location.path.length < 2 ) {
      this.reset();
      return;
    }
  }

  _updateSelectableLetters() {
    if (!this.results || this.results.length === 0) {
      // If there are no results, disable all letters
      this.alpha.forEach(letter => letter.exists = false);
      this.requestUpdate();
      return;
    }

    this.alpha.forEach(letter => {
      if (letter.value === '1') {
        // match numbers and special characters for the '#' element
        letter.exists = this.results.some(result => {
          const firstChar = result.key?.trim()?.[0]?.toLowerCase() || result.title?.trim()?.[0]?.toLowerCase();
          return firstChar && !/[a-z]/.test(firstChar);
        });
      } else {
        // match alphabetic characters for other letters
        letter.exists = this.results.some(result => {
          return (result.key?.toLowerCase()?.trim()?.startsWith(letter.value) || result.title?.toLowerCase()?.trim()?.startsWith(letter.value)) 
          && result.count > 0;
        });
      }
    });
  }

  onAlphaInput(v) {
    if( !v || !v.exists ) return;

    // emit event to parent
    this.dispatchEvent(new CustomEvent('letter-change', {
      detail: { letter : v.value },
      bubbles: true,
      composed: true
    }));

    if( v.value === this.selectedLetter ) this.selectedLetter = '';
    else this.selectedLetter = v.value;
  }

}

customElements.define('ucdlib-browse-az', UcdlibBrowseAZ);


/***/ }),

/***/ "./public/elements/components/ucdlib-browse-az.tpl.js":
/*!************************************************************!*\
  !*** ./public/elements/components/ucdlib-browse-az.tpl.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "styles": () => (/* binding */ styles)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");


function styles() {
  const elementStyles = lit__WEBPACK_IMPORTED_MODULE_0__.css`
    :host {
      display: block;
    }

    [hidden] {
      display: none !important;
    }

    .alphaContainer {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .box {
      color: rgb(76, 76, 76);
      width: 2rem;
      height: 2rem;
      margin: 5px 5px;
      display: inline-block;
      vertical-align: middle;
      line-height: 2rem;
      text-align:center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    .box.selected, .box.selected.disabled {
      color: white;
      background-color: #13639E;
    }

    .box:hover, .box.selected.disabled:hover {
      background: #ffbf00;
      color: #022851;
    }

    .box.selected {
      cursor: auto;
    }

    .box.disabled {
      color: #A9A9A9;
      cursor: auto;
    }

    .box.disabled:hover {
      background-color: transparent;
      color: #A9A9A9;
    }

  `;

  return [
    elementStyles,
  ];
}

function render() {
return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <div class="alphaContainer">
      ${this.alpha.map((alp, i) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
        <span 
          @click=${() => this.onAlphaInput(alp)} 
          @keydown=${(e) => { if (e.key === 'Enter' || e.key === ' ') this.onAlphaInput(alp); }}
          tabindex="${alp.exists ? '0' : '-1'}"
          role="button"
          aria-label="${alp.display}"
          aria-pressed="${this.selectedLetter == alp.value}"
          aria-disabled="${!alp.exists}"
          aria-selected="${this.selectedLetter == alp.value}"
          class="box ${alp.value == this.selectedLetter ? 'selected' : ''} ${alp.exists ? '' : 'disabled'}">
          ${alp.display}
        </span>
      `)}
    </div>
`;}


/***/ }),

/***/ "./public/elements/pages/browse/app-browse.js":
/*!****************************************************!*\
  !*** ./public/elements/pages/browse/app-browse.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_browse_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-browse.tpl.js */ "./public/elements/pages/browse/app-browse.tpl.js");
/* harmony import */ var _ucd_lib_theme_elements_utils_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/theme-elements/utils/mixins */ "./public/node_modules/@ucd-lib/theme-elements/utils/mixins/index.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _utils_app_browse_by__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/app-browse-by */ "./public/elements/utils/app-browse-by.js");








class AppBrowse extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement) 
  .with(_ucd_lib_theme_elements_utils_mixins__WEBPACK_IMPORTED_MODULE_2__.MainDomElement, _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__.LitCorkUtils) {

  static get properties() {
    return {
      page : {type: String},
    };
  }

  constructor() {
    super();
    this.render = _app_browse_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.active = true;

    this.page = '';

    this._injectModel('AppStateModel');
  }

  async firstUpdated() {
    this._onAppStateUpdate(await this.AppStateModel.get());
  }

  _onAppStateUpdate(e) {
    let page = '/'+e.location.path[0];
    if( e.location.path.length > 1 ) page += '/'+e.location.path[1];
    this.page = page;
  }
  
}

customElements.define('app-browse', AppBrowse);


/***/ }),

/***/ "./public/elements/pages/browse/app-browse.tpl.js":
/*!********************************************************!*\
  !*** ./public/elements/pages/browse/app-browse.tpl.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/shared-styles */ "./public/elements/styles/shared-styles.js");
/* harmony import */ var _utils_shared_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/shared-html */ "./public/elements/utils/shared-html.js");
/* harmony import */ var _ucd_lib_theme_sass_4_component_priority_links_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ucd-lib/theme-sass/4_component/_priority-links.css */ "./public/node_modules/@ucd-lib/theme-sass/4_component/_priority-links.css.js");
/* harmony import */ var _ucd_lib_theme_sass_4_component_icons_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ucd-lib/theme-sass/4_component/_icons.css */ "./public/node_modules/@ucd-lib/theme-sass/4_component/_icons.css.js");
/* harmony import */ var _ucd_lib_theme_sass_4_component_category_brand_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ucd-lib/theme-sass/4_component/_category-brand.css */ "./public/node_modules/@ucd-lib/theme-sass/4_component/_category-brand.css.js");
/* harmony import */ var _ucd_lib_theme_sass_4_component_vertical_link_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ucd-lib/theme-sass/4_component/_vertical-link.css */ "./public/node_modules/@ucd-lib/theme-sass/4_component/_vertical-link.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_buttons_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_buttons.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_buttons.css.js");











function render() {
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <style>
      ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__.sharedStyles}
        ${_ucd_lib_theme_sass_4_component_priority_links_css__WEBPACK_IMPORTED_MODULE_3__["default"]}
        ${_ucd_lib_theme_sass_4_component_category_brand_css__WEBPACK_IMPORTED_MODULE_5__["default"]}
        ${_ucd_lib_theme_sass_4_component_vertical_link_css__WEBPACK_IMPORTED_MODULE_6__["default"]}
        ${_ucd_lib_theme_sass_4_component_icons_css__WEBPACK_IMPORTED_MODULE_4__["default"]}
        ${_ucd_lib_theme_sass_2_base_class_buttons_css__WEBPACK_IMPORTED_MODULE_7__["default"]}
        :host {
        display: block;
        position: relative;
      }

      .vertical-link--circle .vertical-link__figure:after {
        opacity: 1 !important;
      }

      /* STYLES BELOW ARE ACTUALLY USED. NEED TO AUDIT ANYTHING ABOVE */
      [hidden] {
        display: none;
      }

      .browse-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: row wrap;
        background-color: var(--color-white);
      }
      .browse-buttons > div {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        width: 75%;
      }
      .browse-buttons app-icons {
        margin: 0 10px;
      }
      .browse-buttons .vertical-link__title {
        color: var(--color-aggie-blue);
        text-transform: capitalize;
      }
      .browse-buttons .vertical-link__figure:before,
      .browse-buttons .vertical-link__figure:after {
        box-sizing: border-box;
      }
      .browse-buttons .vertical-link--circle .vertical-link__figure {
        background-color: var(--color-white);
        margin-bottom: 0.75rem;
      }

      .browse-buttons .vertical-link--circle .vertical-link__figure:hover {
        background-color: var(--color-aggie-gold);
      }

      @media (max-width: 1070px) {
        .browse-buttons > div {
          width: 100%;
        }
      }

      .priority-links {
        padding: 0 0 1rem;
      }

      .fw-light {
        font-weight: 200;
        font-style: normal;
        margin: 0.75rem 0 0.25rem;
        padding: 0;
        line-height: 1.2;
      }

      app-browse .title-section {
        text-align: center;
        border: none;
      }

      .header-icon {
        width: 6rem;
      }

      .calisphere-section {
        display: flex;
        align-items: center;
        padding: 0 2rem;
        gap: 2rem;
      }

      .calisphere-section > div {
        flex: 1;
      }

      .calisphere-section img {
        max-width: 100%;
      }

      .calisphere-extra-info {
        margin-bottom: 0;
        color: var(--black, #000);
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 30.74px;
      }

      .calisphere-section h2 {
        color: var(--ucd-blue-100, #022851);
        margin-bottom: 1rem;
      }

      .calisphere-section .header-dots {
        margin: 0;
      }

      .browse-selection-section p.calisphere-link {
        color: var(--ucd-black-70, #4C4C4C);
        font-size: .875rem;
        font-style: italic;
        line-height: 26px;
        padding: 2rem 0 3rem 2rem;
      }

      .browse-selection-section p.calisphere-link a {
        text-decoration: underline;
      }

      .browse-selection-section p.calisphere-link a:hover {
        color: #00b2e3;
      }

      a.explore-calisphere {
        padding: 0 1.5rem 0 .75rem;
        margin-top: 2rem;
      }

      @media (max-width: 768px) {
        .calisphere-section {
          display: block;
        }
      } 
    </style>

    <div class="browse-selection-section" ?hidden="${this.page !== "/browse"}">
      <div class="title-section">
        <h1>Browse<br /><span class="fw-light">Digital Collections</span></h1>
      </div>
      <section class="browse-buttons site-frame">
        <div class="priority-links">
          <div class="priority-links__item">
            <a
              class="vertical-link vertical-link--circle category-brand--secondary"
              href="/browse/collections/15"
            >
              <div class="vertical-link__figure">
                <!-- <ucdlib-icon class="vertical-link__image" src="http://localhost:3000/images/ucd-logo.svg"></ucdlib-icon> -->
                <!-- <ucdlib-icon class="vertical-link__image" icon="ucd-public:fa-box-archive"></ucdlib-icon>  -->
                <ucdlib-icon
                  class="vertical-link__image"
                  icon="ucdlib-dams:fa-box-archive"
                ></ucdlib-icon>
              </div>
              <div class="vertical-link__title">Collections</div>
            </a>
          </div>
          <div class="priority-links__item">
            <a
              class="vertical-link vertical-link--circle category-brand--secondary"
              href="/search"
            >
              <div class="vertical-link__figure">
                <ucdlib-icon
                  class="vertical-link__image"
                  icon="ucdlib-dams:photo-stack"
                ></ucdlib-icon>
              </div>
              <div class="vertical-link__title">All Items</div>
            </a>
          </div>
          <div class="priority-links__item">
            <a
              class="vertical-link vertical-link--circle category-brand--secondary"
              href="/browse/creator/30"
            >
              <div class="vertical-link__figure">
                <ucdlib-icon
                  class="vertical-link__image"
                  icon="ucdlib-dams:fa-wand-magic-sparkles"
                ></ucdlib-icon>
              </div>
              <div class="vertical-link__title">Creators</div>
            </a>
          </div>
          <div class="priority-links__item">
            <a
              class="vertical-link vertical-link--circle category-brand--secondary"
              href="/browse/format/30"
            >
              <div class="vertical-link__figure">
                <ucdlib-icon
                  class="vertical-link__image"
                  icon="ucdlib-dams:fa-photo-film"
                ></ucdlib-icon>
              </div>
              <div class="vertical-link__title">Formats</div>
            </a>
          </div>
          <div class="priority-links__item">
            <a
              class="vertical-link vertical-link--circle category-brand--secondary"
              href="/browse/subject/30"
            >
              <div class="vertical-link__figure">
                <ucdlib-icon
                  class="vertical-link__image"
                  icon="ucdlib-dams:fa-star"
                ></ucdlib-icon>
              </div>
              <div class="vertical-link__title">Subjects</div>
            </a>
          </div>
        </div>
      </section>
      <div class="calisphere-section">
        <div class="current-index-panel">
          <img src="/images/watercolor-schwier-87293-d31v5bn6t.jpg" alt="Calisphere Logo" />
        </div>
        <div>
          <h2>Looking for more?</h2>

          ${_utils_shared_html__WEBPACK_IMPORTED_MODULE_2__["default"].headerDots()}

          <p class="calisphere-extra-info">
            Additional items from the library's Archives and Special Collections 
            are available through the University of California's Calisphere.
          </p>
          <a href="https://calisphere.org/UCD/collections" alt="Explore Calisphere" class="btn btn--alt btn--round explore-calisphere">Explore Calisphere</a>
        </div>
      </div>

      <p class="calisphere-link">Featured Image: <a href="/item/ark:/87293/d31v5bn6t" alt="Schwier (Hilda) Photograph Album">Schwier (Hilda) Photograph Album</a></p>
    </div>

    <app-browse-by
      id="collections"
      label="Collection"
      facet-query-name=""
      ?hidden="${this.page !== "/browse/collections"}"
    >
      <img
        class="header-icon"
        slot="header-icon"
        src="/images/watercolors/watercolor-splat-gold-collections.png"
      />
    </app-browse-by>
    <app-browse-by
      id="subject"
      label="Subject"
      facet-query-name="@graph.subjects.name"
      ?hidden="${this.page !== "/browse/subject"}">
      <img
        class="header-icon"
        slot="header-icon"
        src="/images/watercolors/watercolor-splat-green-subjects.png"
      />
    </app-browse-by>
    <app-browse-by
      id="creator"
      label="Creator"
      facet-query-name="@graph.creator.name"
      ?hidden="${this.page !== "/browse/creator"}">
      <img
        class="header-icon"
        slot="header-icon"
        src="/images/watercolors/watercolor-splat-red-creators.png"
      />
    </app-browse-by>
    <app-browse-by
      id="format"
      label="Format"
      facet-query-name="@graph.fileFormatSimple"
      ?hidden="${this.page !== "/browse/format"}">
      <img
        class="header-icon"
        slot="header-icon"
        src="/images/watercolors/watercolor-splat-blue-formats.png"
      />
    </app-browse-by>
  `;
}


/***/ }),

/***/ "./public/elements/utils/app-browse-by.js":
/*!************************************************!*\
  !*** ./public/elements/utils/app-browse-by.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppBrowseBy)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_browse_by_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-browse-by.tpl.js */ "./public/elements/utils/app-browse-by.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _components_cards_dams_collection_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/cards/dams-collection-card */ "./public/elements/components/cards/dams-collection-card.js");
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/config */ "./public/lib/config.js");
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lib_config__WEBPACK_IMPORTED_MODULE_4__);










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
class AppBrowseBy extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {

  static get properties() {
    return {
      facetQueryName : {type: String, attribute: 'facet-query-name'},
      label : {type: String},
      sideImages : {type: Array},
      sideImageIndex : {type: Number},
      leftImgUrl : {type: String},
      rightImgUrl : {type: String},
      leftItemLink : {type: String},
      rightItemLink : {type: String},
      leftLabel : {type: String},
      rightLabel : {type: String},
      sortByOptions : {type: Array},
      results : {type: Array},
      collectionResults : {type: Array},
      totalResults : {type: Number},
      resultsPerPage : {type: Number},
      currentIndex : {type: Number},
      totalPages : {type: Number},
      currentPage : {type: Number},
      isCollectionPage : {type: Boolean},
      selectedLetter : {type: String},
    };
  }

  constructor() {
    super();
    this.render = _app_browse_by_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);

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
    this.leftItemLink = '';
    this.rightItemLink = '';
    this.leftLabel = '';
    this.rightLabel = '';
    this.results = [];
    this.collectionResults = [];
    this.totalResults = 0;
    this.resultsPerPage = 30;
    this.currentIndex = 0;
    this.totalPages = 1;
    this.currentPage = 1;
    this.label = '';
    this.isCollectionPage = false;
    this.selectedLetter = '';
  }

  /**
   * @method _onAppStateUpdate
   * @description bound to AppStateModel app-state-update event
   * 
   * @param {Object} e 
   * @returns {Promise} 
   */
  _onAppStateUpdate(e) {
    if( e.location.page !== 'browse' || e.location.path.length < 2 || e.location.path[1] !== this.id ) {
      this.selectedLetter = '';
      return;
    }
    
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

    this.updatePagination();
    this._renderResults();
  }

  updatePagination() {
    if( this.selectedLetter ) {
      this.totalPages = this.results.length === 0 ? 1 : Math.ceil(this.results.length / this.resultsPerPage);
    } else {
      this.totalPages = this.totalResults / this.resultsPerPage < 1 ? 1 : Math.ceil(this.totalResults / this.resultsPerPage);
    }

    let pagination = this.shadowRoot.querySelector('ucd-theme-pagination');
    if( pagination ) pagination.requestUpdate('maxPages', this.totalPages);
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

    let filterResultsTo = this.allResults.payload;

    if( this.selectedLetter ) {
      // filter by selected letter
      filterResultsTo = filterResultsTo.filter(item => {
        const firstChar = item.key?.trim()?.[0]?.toLowerCase() || item.title?.trim()?.[0]?.toLowerCase();
        if( this.selectedLetter === '1' ) {
          return firstChar && !/[a-z]/.test(firstChar) && item.count > 0;
        }

        return firstChar && firstChar === this.selectedLetter && item.count > 0;
      });
    }

    let sort = this.sortByOptions.find(item => item.selected);
    
    if( this.sortedAs !== sort.type ) {
      filterResultsTo.sort((a, b) => {
        if( sort.type === 'count' ) {
          if( a[sort.type] > b[sort.type] ) return (sort.dir === 'asc') ? 1 : -1;
          if( a[sort.type] < b[sort.type] ) return (sort.dir === 'asc') ? -1 : 1;
          return 0;
        } else {
          return sort.dir === 'asc'
            ? a[sort.type].trim().toLowerCase().localeCompare(b[sort.type].trim().toLowerCase())
            : b[sort.type].trim().toLowerCase().localeCompare(a[sort.type].trim().toLowerCase());
        }
      });
      this.sortedAs = sort.type;
    }
    
    this.results = filterResultsTo.slice(
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
   
    let filterResultsTo = this.allResults;

    if( this.selectedLetter ) {
      // filter by selected letter
      filterResultsTo = filterResultsTo.filter(item => {
        return (item.key?.toLowerCase()?.trim()?.startsWith(this.selectedLetter) || item.title?.toLowerCase()?.trim()?.startsWith(this.selectedLetter)) 
          && item.count > 0;
      });
    }

    if( this.sortedAs !== sort.type ) {
      if( sort.type === 'count' ) {
        filterResultsTo.sort((a, b) => {
          if( a[sort.type] > b[sort.type] ) return (sort.dir === 'asc') ? 1 : -1;
          if( a[sort.type] < b[sort.type] ) return (sort.dir === 'asc') ? -1 : 1;
          return 0;
        });
      } else if ( sort.label === 'A-Z' ) {
        // sort by title
        filterResultsTo.sort((a, b) => {
          if( a.title.toLowerCase().trim() > b.title.toLowerCase().trim() ) return (sort.dir === 'asc') ? 1 : -1;
          if( a.title.toLowerCase().trim() < b.title.toLowerCase().trim() ) return (sort.dir === 'asc') ? -1 : 1;
          return 0;   
        });
      } // else recent, just sort by date, but already sorted (in _searchBrowseByCollections(), we sort using the es searchDocument)
    }  

    this.collectionResults = filterResultsTo.slice(
      this.currentIndex, 
      this.currentIndex + this.resultsPerPage 
    );

    this.results = filterResultsTo.slice(
      this.currentIndex,
      this.currentIndex + this.resultsPerPage
    );

    this._updateSideImages();
  }

  _onLetterChange(e) {
    if( this.selectedLetter === e.detail.letter ) this.selectedLetter = '';
    else this.selectedLetter = e.detail.letter;
    
    this.currentPage = 1;
    this.currentIndex = (this.currentPage - 1) * this.resultsPerPage;

    this._renderResults();
    this.updatePagination();
  }

  async _searchBrowseByCollections() {
    let sort = {};
    let sortBy = this.sortByOptions.filter(s => s.selected)[0];
    
    if( sortBy.label === 'A-Z' ) {
      sort = {"name" : "asc"};
    } else if( sortBy.label === 'Recent' ) {
      sort = [
          {'@graph.yearPublished': {order : "desc" }},
          {'@graph.lastModified': {order : "desc" }}
        ];
    } else {
      sort = {"@graph.itemCount" : "desc"};
    }

    if (!Array.isArray(sort)) {
      sort = [sort];
    }
    let searchDocument = {
      text : '',
      filters : {},
      sort : sort,
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
    } else if ( sortBy.label === 'A-Z' ) {
      // sort by title
      this.allResults.sort((a, b) => {
        if( a.title.toLowerCase() > b.title.toLowerCase() ) return (sortBy.dir === 'asc') ? 1 : -1;
        if( a.title.toLowerCase() < b.title.toLowerCase() ) return (sortBy.dir === 'asc') ? -1 : 1;
        return 0;   
      });
    } // else recent, just sort by date, but already sorted above
    
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
      this.leftItemLink = '';
      this.rightItemLink = '';
      this.leftLabel = '';
      this.rightLabel = '';
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
    this.leftItemLink = this.sideImages[this.sideImageIndex].leftItemLink;
    this.rightItemLink = this.sideImages[this.sideImageIndex].rightItemLink;
    this.leftLabel = this.sideImages[this.sideImageIndex].leftLabel;
    this.rightLabel = this.sideImages[this.sideImageIndex].rightLabel;
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
  
    // reset to first page
    if( this.currentPage !== 1 ) {
      let path = '/browse/'+this.id+'/'+this.resultsPerPage;
      this.AppStateModel.setLocation(path);
      this.currentPage = 1;
    }

    this.currentIndex = 0;
  
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


/***/ }),

/***/ "./public/elements/utils/app-browse-by.tpl.js":
/*!****************************************************!*\
  !*** ./public/elements/utils/app-browse-by.tpl.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/shared-styles */ "./public/elements/styles/shared-styles.js");
/* harmony import */ var _ucd_lib_theme_elements_brand_ucd_theme_pagination_ucd_theme_pagination_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/theme-elements/brand/ucd-theme-pagination/ucd-theme-pagination.js */ "./public/node_modules/@ucd-lib/theme-elements/brand/ucd-theme-pagination/ucd-theme-pagination.js");
/* harmony import */ var _components_ucdlib_browse_az_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/ucdlib-browse-az.js */ "./public/elements/components/ucdlib-browse-az.js");





function render() {
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <style>
      ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__.sharedStyles}
    </style>
    <style>
      :host {
        display: block;
        padding-bottom: 4rem;
      }

      .header {
        width: 50%;
        margin: auto;
        padding: 2rem 2rem 0;
        justify-content: center;
      }

      .header-layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 1.5rem;
        margin: 0 3rem;
      }

      h1 {
        margin: 0.5rem 1rem;
      }

      h1 .regular-wt {
        font-weight: var(--fw-regular);
      }

      a {
        text-decoration: none;
      }

      .radio-btn-container {
        margin-left: 15px;
      }

      .sort {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .body {
        display: flex;
        position: relative;
        overflow-x: hidden;
      }

      [hidden] {
        display: none;
      }

      .side-image {
        flex: 1;
      }

      .side-image.no-flex {
        flex: 0;
      }

      .results {
        width: 100%;
        box-sizing: border-box;
        flex: 2;
        padding: 2rem;
        z-index: 10;
        border-bottom: 5px dotted var(--color-dams-secondary);
        border-top: 5px dotted var(--color-dams-secondary);
      }

      .results.collection {
        border-bottom: none;
        border-top: none;
      }

      .results > .table > * {
        display: flex;
        box-sizing: border-box;
        width: 100%;
      }

      .results h5 {
        margin: 0;
      }

      .results > .table > * > *:first-child {
        flex: 1;
      }

      .results h5,
      .results .list-item {
        padding: 0 1rem;
      }

      .list-item {
        margin-top: 1rem;
      }

      .list-key {
        font-weight: var(--fw-bold);
        color: var(--color-aggie-blue);
      }

      ucd-theme-pagination {
        justify-content: center;
        display: flex;
        box-sizing: border-box;
        width: 100%;
      }

      .left-image-container {
        position: absolute;
        left: -12.5vw;
        bottom: 0;
      }

      .left-image-container .creator-info-label img {
        transform: scaleX(-1);
      }

      .right-image-container {
        position: absolute;
        right: -12.5vw;
        top: 0;
      }

      .left-image-container img,
      .right-image-container img {
        width: 37.5vw;
      }

      .left-image-container a,
      .right-image-container a {
        cursor: pointer;
      }

      div.creator-info-label {
        position: absolute;
        bottom: 1rem;
        right: 0;

        width: auto;
        z-index: 20;
        height: auto;
      }

      .creator-info-label {
        position: relative;
        display: inline-block;
      }

      /* hover transitions */
      .left-image-container .creator-info-label {
        transform: translateX(-50vw);
        transition: transform 0.55s ease-in-out;
      }

      .right-image-container .creator-info-label {
        transform: translateX(50vw);
        transition: transform 0.55s ease-in-out;
      }

      .left-image-container:hover .creator-info-label,
      .right-image-container:hover .creator-info-label {
        transform: translateX(0);
      }

      .right-image-container .creator-info-label {
        left: 0;
        right: auto;
      }

      .creator-info-label img {
        width: 10rem;
      }

      .creator-info-label h5 {
        position: absolute;
        color: var(--white, #FFF);
        left: 50%;
        transform: translateX(-50%);
        margin: 0;
        width: 100%;
        text-align: center;
        z-index: 1;
      }

      .creator-info-label h5 {
        top: 0;
        height: 3rem;
        width: 8rem;
        font-weight: 800;
        font-size: 0.875rem;
        line-height: 1.2;

        display: flex;
        align-items: center;
        justify-content: center;
      }

      .card-grid {
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-gap: 2rem;
        max-width: 93%;
      }

      .results-footer {
        margin: 0 auto;
        width: 65%;
        padding: 2rem 2rem 0;
      }

      .header-dots,
      .footer-dots {
        display: none;
      }

      .header-dots.collection,
      .footer-dots.collection {
        display: block;
        border-bottom: 5px dotted var(--color-dams-secondary); 
        width: calc(50% + 2rem);
        margin: 0 auto;
        position: relative;
      }

      ucdlib-browse-az {
        padding-bottom: 1.5rem;
        width: 100%; 
        margin: auto;
      }

      @media (max-width: 1310px) {
        .header,
        .results-footer {
          width: 65%;
        }
        h1 {
          margin: 0.5rem 0;
        }

        ucdlib-browse-az {
          width: calc(50% / 0.65 - 2rem); 
        }
      }
      @media (max-width: 767px) {
        .header,
        .results-footer {
          width: auto;
        }

        ucdlib-browse-az {
          width: 100%; 
        }
        .header-dots.collection,
        .footer-dots.collection {
          width: 90%;
          margin: auto;
        }
      }
      @media (max-width: 990px) {
        /* tablet */
        .card-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        h1 {
          font-size: 2rem;
          font-weight: 600;
        }
      }

      @media (max-width: 767px) {
        /* mobile */
        .card-grid {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        .sort {
          flex-wrap: wrap;
          font-size: 0.9rem;
        }
        .sort > div:first-child {
          text-align: center;
        }
        .header {
          padding: 2rem 1rem 0;
        }
        .header-layout {
          margin: auto;
          width: 60%;
        }
        .results-footer {
          padding: 2rem 1rem 0;
        }

        .side-image {
          display: none;
        }
        .body {
          width: 90%;
          margin: auto;
        }
        .results {
          padding: 2rem 0;
        }
        .results h5, .results .list-item {
          padding: 0;
        }
        .table-heading {
          font-size: 1.2rem;
        }
      }

      @media (max-width: 500px) {
        .header-layout {
          width: 90%;
        }
      }

      .left-image,
      .right-image {
        clip-path: inset(0 0 5px 0);
      }
    </style>

    <div class="header">
      <div class="header-layout">
        <div><slot name="header-icon"></slot></div>
        <div>
          <h1>Browse <span>${this.label}s</span></h1>
        </div>

        <div class="sort">
          <div style="font-weight: var(--fw-bold)">Sort By:</div>
          ${this.sortByOptions.map(
            (item, index) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
              <div class="radio-btn-container">
                <input
                  type="radio"
                  id="browse-by-${this.facetQueryName}-${item.label}"
                  name="browse-by-${this.facetQueryName}"
                  index="${index}"
                  .checked="${item.selected}"
                  @change="${this._onSortChange}"
                />
                <label for="browse-by-${this.facetQueryName}-${item.label}"
                  >${item.label}</label
                >
              </div>
            `
          )}
        </div>
      </div>
      <ucdlib-browse-az
        ?hidden="${this.totalPages < 6 && !this.selectedLetter}"
        .results="${(this.allResults?.payload || this.allResults || [])}"
        @letter-change="${this._onLetterChange}"
        .selected-letter="${this.selectedLetter}">
      </ucdlib-browse-az>      
    </div>

    <div class="header-dots ${this.isCollectionPage ? 'collection' : ''}"></div>

    <div class="body">
      <div class="side-image ${this.isCollectionPage ? "no-flex" : ""}">
        <div class="left-image-container">
          <a href="${this.leftItemLink}">
            <img
              class="left-image"
              ?hidden=${this.results.length < 12 || this.isCollectionPage}
              src="${this.leftImgUrl}"
            />
            <div class="creator-info-label">
              <img src="/images/watercolors/Label-Watercolor-Blue_v2.png" alt="label background"/>
              <h5>${this.leftLabel}</h5>
            </div>
          </a>
  
        </div>
      </div>

      <div class="results ${this.isCollectionPage ? 'collection' : ''}">
        <div class="table" ?hidden="${this.isCollectionPage}">
          <h5>
            <div class="table-heading">${this.label}</div>
            <div class="table-heading">Items</div>
          </h5>

          ${this.results.map(
            (item) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
              <div class="list-item">
                <div class="list-key">
                  <a href="${this.getFilterUrl(item)}">${item.key}</a>
                </div>
                <div class="list-count">${item.count}</div>
              </div>
            `
          )}
        </div>

        <div ?hidden="${this.label.toLowerCase() !== "collection"}">
          <div class="card-grid">
            ${this.collectionResults.map(
              (res) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
                <dams-collection-card
                  data-id="${this.isCollectionPage ? res.id : ""}"
                  @click=${this._onCollectionClicked}
                ></dams-collection-card>
              `
            )}
          </div>
        </div>
      </div>
      <div class="side-image ${this.isCollectionPage ? "no-flex" : ""}">
        <div class="right-image-container">
          <a href="${this.rightItemLink}">
            <img
              class="right-image"
              ?hidden=${this.results.length < 12 || this.isCollectionPage}
              src="${this.rightImgUrl}"
            />
            <div class="creator-info-label">
              <img src="/images/watercolors/Label-Watercolor-Blue_v2.png" alt="label background"/>
              <h5>${this.rightLabel}</h5>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="footer-dots ${this.isCollectionPage ? 'collection' : ''}"></div>
    <div class="results-footer">
      
      <ucd-theme-pagination
        ?hidden="${this.totalPages < 2 && !this.selectedLetter}"
        current-page=${this.currentPage}
        max-pages=${this.totalPages}
        @page-change=${this._onPageClicked}
        xs-screen
        ellipses>
      </ucd-theme-pagination>
    </div>
  `;
}


/***/ }),

/***/ "./public/elements/utils/shared-html.js":
/*!**********************************************!*\
  !*** ./public/elements/utils/shared-html.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");


/**
 * @class SharedHtml
 * @description Lit html template strings used across the site.
 * Designed to be used with DAMS shared styles, so make sure you import those into your element
 */
class SharedHtml {

  /**
   * @method headerDots
   * @description Displays the yellow dots beneath a section header
   * @returns {TemplateResult}
   */
  headerDots(){
    return lit__WEBPACK_IMPORTED_MODULE_0__.html`
      <div class="header-dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    `;
  }

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new SharedHtml());

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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Z0JBQWdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL2NvbXBvbmVudHMvY2FyZHMvZGFtcy1jb2xsZWN0aW9uLWNhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL2NvbXBvbmVudHMvY2FyZHMvZGFtcy1jb2xsZWN0aW9uLWNhcmQudHBsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9jb21wb25lbnRzL3VjZGxpYi1icm93c2UtYXouanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL2NvbXBvbmVudHMvdWNkbGliLWJyb3dzZS1hei50cGwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3BhZ2VzL2Jyb3dzZS9hcHAtYnJvd3NlLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9wYWdlcy9icm93c2UvYXBwLWJyb3dzZS50cGwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3V0aWxzL2FwcC1icm93c2UtYnkuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3V0aWxzL2FwcC1icm93c2UtYnkudHBsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy91dGlscy9zaGFyZWQtaHRtbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXRFbGVtZW50IH0gZnJvbSBcImxpdFwiO1xuXG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2RhbXMtY29sbGVjdGlvbi1jYXJkLnRwbC5qc1wiO1xuXG5pbXBvcnQgeyBNaXhpbiwgTGl0Q29ya1V0aWxzIH0gZnJvbSAnQHVjZC1saWIvY29yay1hcHAtdXRpbHMnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uLy4uLy4uL2xpYi91dGlscy9pbmRleC5qc1wiO1xuXG4vKipcbiAqIEBjbGFzcyBEYW1zQ29sbGVjdGlvbkNhcmRcbiAqIEBkZXNjcmlwdGlvbiBVSSBjb21wb25lbnQgY2xhc3MgZm9yIGRpc3BsYXlpbmcgYSBjb2xsZWN0aW9uIHByZXZpZXcgY2FyZFxuICpcbiAqIEBwcm9wIHtPYmplY3R9IGNvbGxlY3Rpb24gLSBBbiBvYmplY3QgZGVzY3JpYmluZyBhIERBTVMgY29sbGVjdGlvbi5cbiAqIElmIHVzZWQsIGVsZW1lbnQgd2lsbCBzZXQgYWxsIHN1YnNlcXVlbnQgcHJvcGVydGllcyB3aXRoIGRhdGEgZnJvbSBjb2xsZWN0aW9ucyBvYmplY3QuXG4gKiBAcHJvcCB7U3RyaW5nfSBpbWdTcmMgLSBUaGUgY29sbGVjdGlvbiB0aHVtYm5haWwgc3JjLlxuICogQHByb3Age1N0cmluZ30gY2FyZFRpdGxlIC0gVGhlIHRpdGxlIG9mIHRoZSBjb2xsZWN0aW9uLlxuICogQHByb3Age051bWJlcn0gaXRlbUN0IC0gVGhlIHRvdGFsIG51bWJlciBvZiBpdGVtcyBpbiB0aGUgY29sbGVjdGlvbnMuXG4gKiBAcHJvcCB7U3RyaW5nfSBocmVmIC0gTGluayB0byB0aGUgY29sbGVjdGlvbiBsYW5kaW5nIHBhZ2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhbXNDb2xsZWN0aW9uQ2FyZCBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpLndpdGgoXG4gIExpdENvcmtVdGlsc1xuKSB7XG4gIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sbGVjdGlvbjogeyB0eXBlOiBPYmplY3QgfSxcbiAgICAgIGlkOiB7IHR5cGU6IFN0cmluZywgYXR0cmlidXRlOiBcImRhdGEtaWRcIiB9LFxuICAgICAgaW1nU3JjOiB7IHR5cGU6IFN0cmluZywgYXR0cmlidXRlOiBcImltZy1zcmNcIiB9LFxuICAgICAgY2FyZFRpdGxlOiB7IHR5cGU6IFN0cmluZywgYXR0cmlidXRlOiBcImNhcmQtdGl0bGVcIiB9LFxuICAgICAgaXRlbUN0OiB7IHR5cGU6IE51bWJlciwgYXR0cmlidXRlOiBcIml0ZW0tY3RcIiB9LFxuICAgICAgaHJlZjogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIGRhcmtCZzogeyB0eXBlOiBCb29sZWFuLCBhdHRyaWJ1dGU6IFwiZGF0YS1kYXJrLWJnXCIgfSxcbiAgICAgIGxvYWRpbmc6IHsgdHlwZTogQm9vbGVhbiB9XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuY29sbGVjdGlvbiA9IHt9O1xuICAgIHRoaXMuaWQgPSBcIlwiO1xuICAgIHRoaXMucmVuZGVyZWRJZCA9IFwiXCI7XG4gICAgdGhpcy5pbWdTcmMgPSBcIlwiO1xuICAgIHRoaXMuY2FyZFRpdGxlID0gXCJcIjtcbiAgICB0aGlzLml0ZW1DdCA9IDA7XG4gICAgdGhpcy5ocmVmID0gXCJcIjtcbiAgICB0aGlzLmRhcmtCZyA9IGZhbHNlO1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICB0aGlzLl9pbmplY3RNb2RlbChcIkNvbGxlY3Rpb25Nb2RlbFwiLCBcIkZjQXBwQ29uZmlnTW9kZWxcIik7XG4gIH1cblxuICBhc3luYyB1cGRhdGVkKHByb3BzKSB7ICAgIFxuICAgIGlmIChwcm9wcy5oYXMoXCJpZFwiKSAmJiB0aGlzLmlkICYmIHRoaXMuaWQgIT09IHRoaXMucmVuZGVyZWRJZCApIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuX29uQ29sbGVjdGlvblVwZGF0ZShhd2FpdCB0aGlzLkNvbGxlY3Rpb25Nb2RlbC5nZXQodGhpcy5pZCkpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ0NvbGxlY3Rpb24gbm90IGZvdW5kJywgZSk7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiggcHJvcHMuaGFzKFwiaHJlZlwiKSAmJiAhdGhpcy5pZCApIHtcbiAgICAgIHRoaXMuaWQgPSB0aGlzLmhyZWY7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgX29uQ29sbGVjdGlvblVwZGF0ZShlKSB7XG4gICAgaWYoIGUuc3RhdGUgIT09IFwibG9hZGVkXCIgfHwgZS5pZCAhPT0gdGhpcy5pZCB8fCB0aGlzLnJlbmRlcmVkSWQgPT09IHRoaXMuaWQgKSByZXR1cm47XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5yZW5kZXJlZElkID0gdGhpcy5pZDtcblxuICAgIHRoaXMuY29sbGVjdGlvbiA9IGUudmNEYXRhO1xuXG4gICAgbGV0IGNsaWVudEVkaXRzSWQgPSB0aGlzLmNvbGxlY3Rpb24uY2xpZW50RWRpdHM/LlsnQGlkJ107XG4gICAgbGV0IG92ZXJyaWRkZW5GZWF0dXJlSW1hZ2UgPSAgdGhpcy5jb2xsZWN0aW9uLmNsaWVudEVkaXRzPy50aHVtYm5haWxVcmw/LlsnQGlkJ107XG4gICAgaWYoIGNsaWVudEVkaXRzSWQgJiYgb3ZlcnJpZGRlbkZlYXR1cmVJbWFnZSApIHtcbiAgICAgIHRoaXMuaW1nU3JjID0gJy9mY3JlcG8vcmVzdCcgKyBjbGllbnRFZGl0c0lkICsgJy9mZWF0dXJlZEltYWdlLmpwZyc7XG4gICAgfSBlbHNlIGlmKCB0aGlzLmNvbGxlY3Rpb24uaW1hZ2VzICkge1xuICAgICAgbGV0IGltYWdlcyA9IHRoaXMuY29sbGVjdGlvbi5pbWFnZXM7XG4gICAgICB0aGlzLmltZ1NyYyA9IGltYWdlcy5tZWRpdW0gPyBpbWFnZXMubWVkaXVtLnVybCA6IGltYWdlcy5vcmlnaW5hbC51cmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW1nU3JjID0gXCIvaW1hZ2VzL3RyZWUtYmlrZS1pbGx1c3RyYXRpb24ucG5nXCI7XG4gICAgfVxuICAgIHRoaXMuY2FyZFRpdGxlID0gdGhpcy5jb2xsZWN0aW9uLnRpdGxlO1xuICAgIHRoaXMuaXRlbUN0ID0gdXRpbHMuZm9ybWF0TnVtYmVyV2l0aENvbW1hcyh0aGlzLmNvbGxlY3Rpb24uY291bnQpO1xuICAgIHRoaXMuaHJlZiA9IHRoaXMuY29sbGVjdGlvbi5pZDtcbiAgICB0aGlzLmRhcmtCZyA9IHRoaXMuYXR0cmlidXRlc1tcImRhdGEtZGFyay1iZ1wiXSA/IHRydWUgOiBmYWxzZTtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJkYW1zLWNvbGxlY3Rpb24tY2FyZFwiLCBEYW1zQ29sbGVjdGlvbkNhcmQpO1xuIiwiaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2xpdCc7XG4vLyBpbXBvcnQgeyBzdHlsZU1hcCB9IGZyb20gJ2xpdC9kaXJlY3RpdmVzL3N0eWxlLW1hcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHsgXG5yZXR1cm4gaHRtbGBcblxuPHN0eWxlPlxuICA6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH1cbiAgLmNvbnRhaW5lciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG4gIGEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgfVxuICAuaW1nLWNvbnRhaW5lciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHBhZGRpbmctdG9wOiA3NSU7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC9pbWFnZXMvbG9nb3MvbG9nby13aGl0ZS01MTIucG5nKTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1ibGFjay0yMCk7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcbiAgfVxuICAuaW1nLWNvbnRhaW5lciBpbWcge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICB9XG4gIC5oZWFkIHtcbiAgICBib3JkZXI6IDNweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICB0cmFuc2l0aW9uOiAuM3M7XG4gIH1cbiAgLmNvbnRhaW5lcjpob3ZlciAuaGVhZCwgLmNvbnRhaW5lcjpmb2N1cyAuaGVhZCB7XG4gICAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0tY29sb3ItZGFtcy1zZWNvbmRhcnkpO1xuICB9XG4gIGg1IHtcbiAgICBtYXJnaW46IDEwcHggMCA1cHggMDtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItaDUpO1xuICAgIGZvbnQtc2l6ZTogdmFyKC0tZnMtaDUpO1xuICAgIGZvbnQtd2VpZ2h0OiB2YXIoLS1mdy1oNSk7XG4gIH1cbiAgLnN1YnRpdGxlIHtcbiAgICBmb250LXNpemU6IHZhcigtLWZzLXApO1xuICAgIGZvbnQtd2VpZ2h0OiB2YXIoLS1mdy1leHRyYS1ib2xkKTtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS03MCk7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgfVxuICAuZ29sZC1kb3RzIHtcbiAgICB3aWR0aDogMDtcbiAgICB0cmFuc2l0aW9uOiAuNHM7XG4gICAgYm9yZGVyLWJvdHRvbTogNXB4IGRvdHRlZCB2YXIoLS1jb2xvci1kYW1zLXNlY29uZGFyeSk7XG4gIH1cbiAgLmNvbnRhaW5lcjpob3ZlciAuZ29sZC1kb3RzLCAuY29udGFpbmVyOmZvY3VzIC5nb2xkLWRvdHMge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLm1hcmtldGluZy1oaWdobGlnaHQge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGNvbG9yOiBpbmhlcml0O1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgfVxuXG4gIC5tYXJrZXRpbmctaGlnaGxpZ2h0OmhvdmVyIC5tYXJrZXRpbmctaGlnaGxpZ2h0X19pbWFnZSAudS1iYWNrZ3JvdW5kLWltYWdlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XG4gIH1cblxuICAubWFya2V0aW5nLWhpZ2hsaWdodF9faW1hZ2Uge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIG1hcmdpbjogMXJlbSAwO1xuICB9XG5cbiAgLm1hcmtldGluZy1oaWdobGlnaHRfX2ltYWdlIC51LWJhY2tncm91bmQtaW1hZ2Uge1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuM3MgZWFzZS1pbi1vdXQ7XG4gIH1cblxuICAubWFya2V0aW5nLWhpZ2hsaWdodF9fdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgcGFkZGluZy10b3A6IDA7XG4gICAgbWFyZ2luLXRvcDogMDtcbiAgICBsaW5lLWhlaWdodDogMS4yO1xuICB9XG5cbiAgLm1hcmtldGluZy1oaWdobGlnaHRfX2l0ZW1zIHtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgbGluZS1oZWlnaHQ6IDEuMjU7XG4gICAgbWFyZ2luOiAwLjVyZW0gMCAxcmVtO1xuICB9XG5cbiAgLnUtYmFja2dyb3VuZC1pbWFnZSB7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgfVxuICAudS1iYWNrZ3JvdW5kLWltYWdlLmxvYWRpbmcge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNkY2RjZGM7XG4gIH1cblxuICAuYXNwZWN0LS00eDMge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHBhZGRpbmctdG9wOiA3NSU7XG4gIH1cblxuICAubWFya2V0aW5nLWhpZ2hsaWdodF9fYm9keS5kYXJrIGg0IHtcbiAgICBjb2xvcjogdmFyKC0tY29sb3Itd2hpdGUpO1xuICAgIC8qIGZvbnQtc2l6ZTogMS41cmVtOyAqL1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gIH1cblxuICAubWFya2V0aW5nLWhpZ2hsaWdodF9fYm9keS5kYXJrIHAge1xuICAgIGNvbG9yOiB2YXIoLS1jb2xvci1ibGFjay0zMCk7XG4gICAgLyogZm9udC1zaXplOiAxLjFyZW07ICovXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgfVxuXG4gIC5tYXJrZXRpbmctaGlnaGxpZ2h0X19ib2R5LmRhcmsge1xuICAgIHBhZGRpbmctdG9wOiAwLjVyZW07XG4gIH1cblxuPC9zdHlsZT4gIFxuXG48IS0tIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj48YSBocmVmPVwiJHt0aGlzLmhyZWZ9XCI+XG4gIDxkaXYgY2xhc3M9XCJoZWFkXCI+XG4gICAgPGRpdiBjbGFzcz1cImltZy1jb250YWluZXJcIj5cbiAgICAgICR7dGhpcy5pbWdTcmMgPyBodG1sYFxuICAgICAgICA8aW1nIHNyYz1cIiR7dGhpcy5pbWdTcmN9XCI+XG4gICAgICBgIDogaHRtbGBgfVxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImJvZHlcIj5cbiAgICA8aDU+JHt0aGlzLmNhcmRUaXRsZX08L2g1PlxuICAgIDxkaXYgY2xhc3M9XCJzdWJ0aXRsZVwiPiR7dGhpcy5pdGVtQ3R9IGl0ZW0ke3RoaXMuaXRlbUN0ID09PSAxID8gXCJcIiA6IFwic1wifTwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImZvb3RlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJnb2xkLWRvdHNcIj48L2Rpdj5cbiAgPC9kaXY+PC9hPlxuPC9kaXY+IC0tPlxuXG4ke3RoaXMuaHJlZiA/IGh0bWxgXG4gIDxhIGhyZWY9XCIke3RoaXMuaHJlZn1cIiBjbGFzcz1cIm1hcmtldGluZy1oaWdobGlnaHQgY2F0ZWdvcnktYnJhbmQtLXNlY29uZGFyeSB1LXNwYWNlLW1iIG8tYm94XCI+XG4gICAgPGRpdiBjbGFzcz1cIm1hcmtldGluZy1oaWdobGlnaHRfX2ltYWdlXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYXNwZWN0LS00eDMgdS1iYWNrZ3JvdW5kLWltYWdlICR7dGhpcy5sb2FkaW5nID8gJ2xvYWRpbmcnIDogJyd9XCIgcm9sZT1cImltZ1wiIGFyaWEtbGFiZWw9XCJcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6dXJsKCR7dGhpcy5pbWdTcmN9KVwiPlxuICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtYXJrZXRpbmctaGlnaGxpZ2h0X19ib2R5ICR7dGhpcy5kYXJrQmcgPyAnZGFyaycgOiAnJ31cIj5cbiAgICAgICR7dGhpcy5jYXJkVGl0bGVcbiAgICAgICAgPyBodG1sYDxoNCBjbGFzcz1cIm1hcmtldGluZy1oaWdobGlnaHRfX3RpdGxlXCI+JHt0aGlzLmNhcmRUaXRsZX08L2g0PmBcbiAgICAgICAgOiBodG1sYGBcbiAgICAgIH1cbiAgICAgIDxwIGNsYXNzPVwibWFya2V0aW5nLWhpZ2hsaWdodF9faXRlbXNcIj48c3BhbiA/aGlkZGVuPVwiJHshdGhpcy5pdGVtQ3R9XCI+JHt0aGlzLml0ZW1DdCB8fCAwfSBpdGVtJHt0aGlzLml0ZW1DdCA9PSAxID8gJycgOiAncyd9PC9zcGFuPjwvcD5cbiAgICA8L2Rpdj5cbiAgPC9hPmAgOiBodG1sYGB9XG5cblxuXG5gfSIsImltcG9ydCB7IExpdEVsZW1lbnQgfSBmcm9tICdsaXQnO1xuaW1wb3J0IHtyZW5kZXIsIHN0eWxlc30gZnJvbSBcIi4vdWNkbGliLWJyb3dzZS1hei50cGwuanNcIjtcblxuLy8gc2V0cyBnbG9iYWxzIE1peGluIGFuZCBFdmVudEludGVyZmFjZVxuaW1wb3J0IHtNaXhpbiwgTGl0Q29ya1V0aWxzfSBmcm9tIFwiQHVjZC1saWIvY29yay1hcHAtdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVWNkbGliQnJvd3NlQVogZXh0ZW5kcyBNaXhpbihMaXRFbGVtZW50KVxuICAud2l0aChMaXRDb3JrVXRpbHMpIHtcblxuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0ZWRMZXR0ZXIgOiB7IHR5cGUgOiBTdHJpbmcsIGF0dHJpYnV0ZSA6ICdzZWxlY3RlZC1sZXR0ZXInIH0sXG4gICAgICAgIHJlc3VsdHMgOiB7IHR5cGUgOiBBcnJheSB9LFxuICAgICAgICBhbHBoYSA6IHsgdHlwZSA6IEFycmF5IH0sXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldCBzdHlsZXMoKSB7XG4gICAgcmV0dXJuIHN0eWxlcygpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9pbmplY3RNb2RlbCgnQXBwU3RhdGVNb2RlbCcpO1xuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5yZXNldCgpO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5hbHBoYSA9IFtcbiAgICAgICAge2Rpc3BsYXk6ICcjJywgdmFsdWU6ICcxJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdBJywgdmFsdWU6ICdhJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdCJywgdmFsdWU6ICdiJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdDJywgdmFsdWU6ICdjJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdEJywgdmFsdWU6ICdkJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdFJywgdmFsdWU6ICdlJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdGJywgdmFsdWU6ICdmJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdHJywgdmFsdWU6ICdnJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdIJywgdmFsdWU6ICdoJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdJJywgdmFsdWU6ICdpJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdKJywgdmFsdWU6ICdqJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdLJywgdmFsdWU6ICdrJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdMJywgdmFsdWU6ICdsJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdNJywgdmFsdWU6ICdtJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdOJywgdmFsdWU6ICduJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdPJywgdmFsdWU6ICdvJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdQJywgdmFsdWU6ICdwJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdRJywgdmFsdWU6ICdxJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdSJywgdmFsdWU6ICdyJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdTJywgdmFsdWU6ICdzJywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdUJywgdmFsdWU6ICd0JywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdVJywgdmFsdWU6ICd1JywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdWJywgdmFsdWU6ICd2JywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdXJywgdmFsdWU6ICd3JywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdYJywgdmFsdWU6ICd4JywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdZJywgdmFsdWU6ICd5JywgZXhpc3RzOiB0cnVlfSxcbiAgICAgICAge2Rpc3BsYXk6ICdaJywgdmFsdWU6ICd6JywgZXhpc3RzOiB0cnVlfVxuICAgIF07XG5cbiAgICB0aGlzLnNlbGVjdGVkTGV0dGVyID0gJyc7XG4gICAgdGhpcy5yZXN1bHRzID0gW107XG4gIH1cblxuICBhc3luYyBmaXJzdFVwZGF0ZWQoKSB7XG4gICAgYXdhaXQgdGhpcy5fb25BcHBTdGF0ZVVwZGF0ZShhd2FpdCB0aGlzLkFwcFN0YXRlTW9kZWwuZ2V0KCkpO1xuICB9XG5cbiAgd2lsbFVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcykge1xuICAgIGlmIChjaGFuZ2VkUHJvcGVydGllcy5oYXMoJ3Jlc3VsdHMnKSkge1xuICAgICAgdGhpcy5fdXBkYXRlU2VsZWN0YWJsZUxldHRlcnMoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBfb25BcHBTdGF0ZVVwZGF0ZShlKSB7XG4gICAgaWYoIGUubG9jYXRpb24ucGFnZSAhPT0gJ2Jyb3dzZScgfHwgZS5sb2NhdGlvbi5wYXRoLmxlbmd0aCA8IDIgKSB7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgX3VwZGF0ZVNlbGVjdGFibGVMZXR0ZXJzKCkge1xuICAgIGlmICghdGhpcy5yZXN1bHRzIHx8IHRoaXMucmVzdWx0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIElmIHRoZXJlIGFyZSBubyByZXN1bHRzLCBkaXNhYmxlIGFsbCBsZXR0ZXJzXG4gICAgICB0aGlzLmFscGhhLmZvckVhY2gobGV0dGVyID0+IGxldHRlci5leGlzdHMgPSBmYWxzZSk7XG4gICAgICB0aGlzLnJlcXVlc3RVcGRhdGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmFscGhhLmZvckVhY2gobGV0dGVyID0+IHtcbiAgICAgIGlmIChsZXR0ZXIudmFsdWUgPT09ICcxJykge1xuICAgICAgICAvLyBtYXRjaCBudW1iZXJzIGFuZCBzcGVjaWFsIGNoYXJhY3RlcnMgZm9yIHRoZSAnIycgZWxlbWVudFxuICAgICAgICBsZXR0ZXIuZXhpc3RzID0gdGhpcy5yZXN1bHRzLnNvbWUocmVzdWx0ID0+IHtcbiAgICAgICAgICBjb25zdCBmaXJzdENoYXIgPSByZXN1bHQua2V5Py50cmltKCk/LlswXT8udG9Mb3dlckNhc2UoKSB8fCByZXN1bHQudGl0bGU/LnRyaW0oKT8uWzBdPy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIHJldHVybiBmaXJzdENoYXIgJiYgIS9bYS16XS8udGVzdChmaXJzdENoYXIpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG1hdGNoIGFscGhhYmV0aWMgY2hhcmFjdGVycyBmb3Igb3RoZXIgbGV0dGVyc1xuICAgICAgICBsZXR0ZXIuZXhpc3RzID0gdGhpcy5yZXN1bHRzLnNvbWUocmVzdWx0ID0+IHtcbiAgICAgICAgICByZXR1cm4gKHJlc3VsdC5rZXk/LnRvTG93ZXJDYXNlKCk/LnRyaW0oKT8uc3RhcnRzV2l0aChsZXR0ZXIudmFsdWUpIHx8IHJlc3VsdC50aXRsZT8udG9Mb3dlckNhc2UoKT8udHJpbSgpPy5zdGFydHNXaXRoKGxldHRlci52YWx1ZSkpIFxuICAgICAgICAgICYmIHJlc3VsdC5jb3VudCA+IDA7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25BbHBoYUlucHV0KHYpIHtcbiAgICBpZiggIXYgfHwgIXYuZXhpc3RzICkgcmV0dXJuO1xuXG4gICAgLy8gZW1pdCBldmVudCB0byBwYXJlbnRcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdsZXR0ZXItY2hhbmdlJywge1xuICAgICAgZGV0YWlsOiB7IGxldHRlciA6IHYudmFsdWUgfSxcbiAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICBjb21wb3NlZDogdHJ1ZVxuICAgIH0pKTtcblxuICAgIGlmKCB2LnZhbHVlID09PSB0aGlzLnNlbGVjdGVkTGV0dGVyICkgdGhpcy5zZWxlY3RlZExldHRlciA9ICcnO1xuICAgIGVsc2UgdGhpcy5zZWxlY3RlZExldHRlciA9IHYudmFsdWU7XG4gIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3VjZGxpYi1icm93c2UtYXonLCBVY2RsaWJCcm93c2VBWik7XG4iLCJpbXBvcnQgeyBodG1sLCBjc3MgfSBmcm9tICdsaXQnO1xuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVzKCkge1xuICBjb25zdCBlbGVtZW50U3R5bGVzID0gY3NzYFxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cblxuICAgIFtoaWRkZW5dIHtcbiAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICAuYWxwaGFDb250YWluZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIH1cblxuICAgIC5ib3gge1xuICAgICAgY29sb3I6IHJnYig3NiwgNzYsIDc2KTtcbiAgICAgIHdpZHRoOiAycmVtO1xuICAgICAgaGVpZ2h0OiAycmVtO1xuICAgICAgbWFyZ2luOiA1cHggNXB4O1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAycmVtO1xuICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcbiAgICB9XG5cbiAgICAuYm94LnNlbGVjdGVkLCAuYm94LnNlbGVjdGVkLmRpc2FibGVkIHtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMxMzYzOUU7XG4gICAgfVxuXG4gICAgLmJveDpob3ZlciwgLmJveC5zZWxlY3RlZC5kaXNhYmxlZDpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZmZiZjAwO1xuICAgICAgY29sb3I6ICMwMjI4NTE7XG4gICAgfVxuXG4gICAgLmJveC5zZWxlY3RlZCB7XG4gICAgICBjdXJzb3I6IGF1dG87XG4gICAgfVxuXG4gICAgLmJveC5kaXNhYmxlZCB7XG4gICAgICBjb2xvcjogI0E5QTlBOTtcbiAgICAgIGN1cnNvcjogYXV0bztcbiAgICB9XG5cbiAgICAuYm94LmRpc2FibGVkOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgY29sb3I6ICNBOUE5QTk7XG4gICAgfVxuXG4gIGA7XG5cbiAgcmV0dXJuIFtcbiAgICBlbGVtZW50U3R5bGVzLFxuICBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKCkge1xucmV0dXJuIGh0bWxgXG4gICAgPGRpdiBjbGFzcz1cImFscGhhQ29udGFpbmVyXCI+XG4gICAgICAke3RoaXMuYWxwaGEubWFwKChhbHAsIGkpID0+IGh0bWxgXG4gICAgICAgIDxzcGFuIFxuICAgICAgICAgIEBjbGljaz0keygpID0+IHRoaXMub25BbHBoYUlucHV0KGFscCl9IFxuICAgICAgICAgIEBrZXlkb3duPSR7KGUpID0+IHsgaWYgKGUua2V5ID09PSAnRW50ZXInIHx8IGUua2V5ID09PSAnICcpIHRoaXMub25BbHBoYUlucHV0KGFscCk7IH19XG4gICAgICAgICAgdGFiaW5kZXg9XCIke2FscC5leGlzdHMgPyAnMCcgOiAnLTEnfVwiXG4gICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgYXJpYS1sYWJlbD1cIiR7YWxwLmRpc3BsYXl9XCJcbiAgICAgICAgICBhcmlhLXByZXNzZWQ9XCIke3RoaXMuc2VsZWN0ZWRMZXR0ZXIgPT0gYWxwLnZhbHVlfVwiXG4gICAgICAgICAgYXJpYS1kaXNhYmxlZD1cIiR7IWFscC5leGlzdHN9XCJcbiAgICAgICAgICBhcmlhLXNlbGVjdGVkPVwiJHt0aGlzLnNlbGVjdGVkTGV0dGVyID09IGFscC52YWx1ZX1cIlxuICAgICAgICAgIGNsYXNzPVwiYm94ICR7YWxwLnZhbHVlID09IHRoaXMuc2VsZWN0ZWRMZXR0ZXIgPyAnc2VsZWN0ZWQnIDogJyd9ICR7YWxwLmV4aXN0cyA/ICcnIDogJ2Rpc2FibGVkJ31cIj5cbiAgICAgICAgICAke2FscC5kaXNwbGF5fVxuICAgICAgICA8L3NwYW4+XG4gICAgICBgKX1cbiAgICA8L2Rpdj5cbmA7fVxuIiwiaW1wb3J0IHsgTGl0RWxlbWVudH0gZnJvbSAnbGl0JztcbmltcG9ydCByZW5kZXIgZnJvbSBcIi4vYXBwLWJyb3dzZS50cGwuanNcIjtcbmltcG9ydCB7TWFpbkRvbUVsZW1lbnR9IGZyb20gJ0B1Y2QtbGliL3RoZW1lLWVsZW1lbnRzL3V0aWxzL21peGlucyc7XG5cbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbmltcG9ydCAnLi4vLi4vdXRpbHMvYXBwLWJyb3dzZS1ieSc7XG5cbmNsYXNzIEFwcEJyb3dzZSBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpIFxuICAud2l0aChNYWluRG9tRWxlbWVudCwgTGl0Q29ya1V0aWxzKSB7XG5cbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwYWdlIDoge3R5cGU6IFN0cmluZ30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLnBhZ2UgPSAnJztcblxuICAgIHRoaXMuX2luamVjdE1vZGVsKCdBcHBTdGF0ZU1vZGVsJyk7XG4gIH1cblxuICBhc3luYyBmaXJzdFVwZGF0ZWQoKSB7XG4gICAgdGhpcy5fb25BcHBTdGF0ZVVwZGF0ZShhd2FpdCB0aGlzLkFwcFN0YXRlTW9kZWwuZ2V0KCkpO1xuICB9XG5cbiAgX29uQXBwU3RhdGVVcGRhdGUoZSkge1xuICAgIGxldCBwYWdlID0gJy8nK2UubG9jYXRpb24ucGF0aFswXTtcbiAgICBpZiggZS5sb2NhdGlvbi5wYXRoLmxlbmd0aCA+IDEgKSBwYWdlICs9ICcvJytlLmxvY2F0aW9uLnBhdGhbMV07XG4gICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgfVxuICBcbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhcHAtYnJvd3NlJywgQXBwQnJvd3NlKTtcbiIsImltcG9ydCB7IGh0bWwgfSBmcm9tIFwibGl0XCI7XG5cbmltcG9ydCB7IHNoYXJlZFN0eWxlcyB9IGZyb20gXCIuLi8uLi9zdHlsZXMvc2hhcmVkLXN0eWxlc1wiO1xuaW1wb3J0IFNoYXJlZEh0bWwgZnJvbSAnLi4vLi4vdXRpbHMvc2hhcmVkLWh0bWwnO1xuXG5pbXBvcnQgcHJpb3JpdHlMaW5rc0NzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy80X2NvbXBvbmVudC9fcHJpb3JpdHktbGlua3MuY3NzXCI7XG5pbXBvcnQgaWNvbnNDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvNF9jb21wb25lbnQvX2ljb25zLmNzc1wiO1xuaW1wb3J0IGNhdGVnb3J5QnJhbmRDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvNF9jb21wb25lbnQvX2NhdGVnb3J5LWJyYW5kLmNzc1wiO1xuaW1wb3J0IHZlcnRpY2FsTGlua3NDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvNF9jb21wb25lbnQvX3ZlcnRpY2FsLWxpbmsuY3NzXCI7XG5pbXBvcnQgYnV0dG9uc0NzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy8yX2Jhc2VfY2xhc3MvX2J1dHRvbnMuY3NzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgcmV0dXJuIGh0bWxgXG4gICAgPHN0eWxlPlxuICAgICAgJHtzaGFyZWRTdHlsZXN9XG4gICAgICAgICR7cHJpb3JpdHlMaW5rc0Nzc31cbiAgICAgICAgJHtjYXRlZ29yeUJyYW5kQ3NzfVxuICAgICAgICAke3ZlcnRpY2FsTGlua3NDc3N9XG4gICAgICAgICR7aWNvbnNDc3N9XG4gICAgICAgICR7YnV0dG9uc0Nzc31cbiAgICAgICAgOmhvc3Qge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgfVxuXG4gICAgICAudmVydGljYWwtbGluay0tY2lyY2xlIC52ZXJ0aWNhbC1saW5rX19maWd1cmU6YWZ0ZXIge1xuICAgICAgICBvcGFjaXR5OiAxICFpbXBvcnRhbnQ7XG4gICAgICB9XG5cbiAgICAgIC8qIFNUWUxFUyBCRUxPVyBBUkUgQUNUVUFMTFkgVVNFRC4gTkVFRCBUTyBBVURJVCBBTllUSElORyBBQk9WRSAqL1xuICAgICAgW2hpZGRlbl0ge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgfVxuXG4gICAgICAuYnJvd3NlLWJ1dHRvbnMge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgZmxleC1mbG93OiByb3cgd3JhcDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3Itd2hpdGUpO1xuICAgICAgfVxuICAgICAgLmJyb3dzZS1idXR0b25zID4gZGl2IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgICAgd2lkdGg6IDc1JTtcbiAgICAgIH1cbiAgICAgIC5icm93c2UtYnV0dG9ucyBhcHAtaWNvbnMge1xuICAgICAgICBtYXJnaW46IDAgMTBweDtcbiAgICAgIH1cbiAgICAgIC5icm93c2UtYnV0dG9ucyAudmVydGljYWwtbGlua19fdGl0bGUge1xuICAgICAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICAgICAgfVxuICAgICAgLmJyb3dzZS1idXR0b25zIC52ZXJ0aWNhbC1saW5rX19maWd1cmU6YmVmb3JlLFxuICAgICAgLmJyb3dzZS1idXR0b25zIC52ZXJ0aWNhbC1saW5rX19maWd1cmU6YWZ0ZXIge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgfVxuICAgICAgLmJyb3dzZS1idXR0b25zIC52ZXJ0aWNhbC1saW5rLS1jaXJjbGUgLnZlcnRpY2FsLWxpbmtfX2ZpZ3VyZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLXdoaXRlKTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMC43NXJlbTtcbiAgICAgIH1cblxuICAgICAgLmJyb3dzZS1idXR0b25zIC52ZXJ0aWNhbC1saW5rLS1jaXJjbGUgLnZlcnRpY2FsLWxpbmtfX2ZpZ3VyZTpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWdvbGQpO1xuICAgICAgfVxuXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogMTA3MHB4KSB7XG4gICAgICAgIC5icm93c2UtYnV0dG9ucyA+IGRpdiB7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLnByaW9yaXR5LWxpbmtzIHtcbiAgICAgICAgcGFkZGluZzogMCAwIDFyZW07XG4gICAgICB9XG5cbiAgICAgIC5mdy1saWdodCB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAyMDA7XG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgbWFyZ2luOiAwLjc1cmVtIDAgMC4yNXJlbTtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgICAgIH1cblxuICAgICAgYXBwLWJyb3dzZSAudGl0bGUtc2VjdGlvbiB7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgfVxuXG4gICAgICAuaGVhZGVyLWljb24ge1xuICAgICAgICB3aWR0aDogNnJlbTtcbiAgICAgIH1cblxuICAgICAgLmNhbGlzcGhlcmUtc2VjdGlvbiB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIHBhZGRpbmc6IDAgMnJlbTtcbiAgICAgICAgZ2FwOiAycmVtO1xuICAgICAgfVxuXG4gICAgICAuY2FsaXNwaGVyZS1zZWN0aW9uID4gZGl2IHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgIH1cblxuICAgICAgLmNhbGlzcGhlcmUtc2VjdGlvbiBpbWcge1xuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5jYWxpc3BoZXJlLWV4dHJhLWluZm8ge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgICBjb2xvcjogdmFyKC0tYmxhY2ssICMwMDApO1xuICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDMwLjc0cHg7XG4gICAgICB9XG5cbiAgICAgIC5jYWxpc3BoZXJlLXNlY3Rpb24gaDIge1xuICAgICAgICBjb2xvcjogdmFyKC0tdWNkLWJsdWUtMTAwLCAjMDIyODUxKTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgICAgIH1cblxuICAgICAgLmNhbGlzcGhlcmUtc2VjdGlvbiAuaGVhZGVyLWRvdHMge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICB9XG5cbiAgICAgIC5icm93c2Utc2VsZWN0aW9uLXNlY3Rpb24gcC5jYWxpc3BoZXJlLWxpbmsge1xuICAgICAgICBjb2xvcjogdmFyKC0tdWNkLWJsYWNrLTcwLCAjNEM0QzRDKTtcbiAgICAgICAgZm9udC1zaXplOiAuODc1cmVtO1xuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyNnB4O1xuICAgICAgICBwYWRkaW5nOiAycmVtIDAgM3JlbSAycmVtO1xuICAgICAgfVxuXG4gICAgICAuYnJvd3NlLXNlbGVjdGlvbi1zZWN0aW9uIHAuY2FsaXNwaGVyZS1saW5rIGEge1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICAgIH1cblxuICAgICAgLmJyb3dzZS1zZWxlY3Rpb24tc2VjdGlvbiBwLmNhbGlzcGhlcmUtbGluayBhOmhvdmVyIHtcbiAgICAgICAgY29sb3I6ICMwMGIyZTM7XG4gICAgICB9XG5cbiAgICAgIGEuZXhwbG9yZS1jYWxpc3BoZXJlIHtcbiAgICAgICAgcGFkZGluZzogMCAxLjVyZW0gMCAuNzVyZW07XG4gICAgICAgIG1hcmdpbi10b3A6IDJyZW07XG4gICAgICB9XG5cbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgICAgICAuY2FsaXNwaGVyZS1zZWN0aW9uIHtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgfVxuICAgICAgfSBcbiAgICA8L3N0eWxlPlxuXG4gICAgPGRpdiBjbGFzcz1cImJyb3dzZS1zZWxlY3Rpb24tc2VjdGlvblwiID9oaWRkZW49XCIke3RoaXMucGFnZSAhPT0gXCIvYnJvd3NlXCJ9XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGl0bGUtc2VjdGlvblwiPlxuICAgICAgICA8aDE+QnJvd3NlPGJyIC8+PHNwYW4gY2xhc3M9XCJmdy1saWdodFwiPkRpZ2l0YWwgQ29sbGVjdGlvbnM8L3NwYW4+PC9oMT5cbiAgICAgIDwvZGl2PlxuICAgICAgPHNlY3Rpb24gY2xhc3M9XCJicm93c2UtYnV0dG9ucyBzaXRlLWZyYW1lXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcmlvcml0eS1saW5rc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmlvcml0eS1saW5rc19faXRlbVwiPlxuICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rIHZlcnRpY2FsLWxpbmstLWNpcmNsZSBjYXRlZ29yeS1icmFuZC0tc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgaHJlZj1cIi9icm93c2UvY29sbGVjdGlvbnMvMTVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmVydGljYWwtbGlua19fZmlndXJlXCI+XG4gICAgICAgICAgICAgICAgPCEtLSA8dWNkbGliLWljb24gY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rX19pbWFnZVwiIHNyYz1cImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9pbWFnZXMvdWNkLWxvZ28uc3ZnXCI+PC91Y2RsaWItaWNvbj4gLS0+XG4gICAgICAgICAgICAgICAgPCEtLSA8dWNkbGliLWljb24gY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rX19pbWFnZVwiIGljb249XCJ1Y2QtcHVibGljOmZhLWJveC1hcmNoaXZlXCI+PC91Y2RsaWItaWNvbj4gIC0tPlxuICAgICAgICAgICAgICAgIDx1Y2RsaWItaWNvblxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rX19pbWFnZVwiXG4gICAgICAgICAgICAgICAgICBpY29uPVwidWNkbGliLWRhbXM6ZmEtYm94LWFyY2hpdmVcIlxuICAgICAgICAgICAgICAgID48L3VjZGxpYi1pY29uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWxpbmtfX3RpdGxlXCI+Q29sbGVjdGlvbnM8L2Rpdj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpb3JpdHktbGlua3NfX2l0ZW1cIj5cbiAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgIGNsYXNzPVwidmVydGljYWwtbGluayB2ZXJ0aWNhbC1saW5rLS1jaXJjbGUgY2F0ZWdvcnktYnJhbmQtLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAgIGhyZWY9XCIvc2VhcmNoXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWxpbmtfX2ZpZ3VyZVwiPlxuICAgICAgICAgICAgICAgIDx1Y2RsaWItaWNvblxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rX19pbWFnZVwiXG4gICAgICAgICAgICAgICAgICBpY29uPVwidWNkbGliLWRhbXM6cGhvdG8tc3RhY2tcIlxuICAgICAgICAgICAgICAgID48L3VjZGxpYi1pY29uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWxpbmtfX3RpdGxlXCI+QWxsIEl0ZW1zPC9kaXY+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInByaW9yaXR5LWxpbmtzX19pdGVtXCI+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICBjbGFzcz1cInZlcnRpY2FsLWxpbmsgdmVydGljYWwtbGluay0tY2lyY2xlIGNhdGVnb3J5LWJyYW5kLS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBocmVmPVwiL2Jyb3dzZS9jcmVhdG9yLzMwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWxpbmtfX2ZpZ3VyZVwiPlxuICAgICAgICAgICAgICAgIDx1Y2RsaWItaWNvblxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rX19pbWFnZVwiXG4gICAgICAgICAgICAgICAgICBpY29uPVwidWNkbGliLWRhbXM6ZmEtd2FuZC1tYWdpYy1zcGFya2xlc1wiXG4gICAgICAgICAgICAgICAgPjwvdWNkbGliLWljb24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmVydGljYWwtbGlua19fdGl0bGVcIj5DcmVhdG9yczwvZGl2PlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmlvcml0eS1saW5rc19faXRlbVwiPlxuICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rIHZlcnRpY2FsLWxpbmstLWNpcmNsZSBjYXRlZ29yeS1icmFuZC0tc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgaHJlZj1cIi9icm93c2UvZm9ybWF0LzMwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWxpbmtfX2ZpZ3VyZVwiPlxuICAgICAgICAgICAgICAgIDx1Y2RsaWItaWNvblxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rX19pbWFnZVwiXG4gICAgICAgICAgICAgICAgICBpY29uPVwidWNkbGliLWRhbXM6ZmEtcGhvdG8tZmlsbVwiXG4gICAgICAgICAgICAgICAgPjwvdWNkbGliLWljb24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmVydGljYWwtbGlua19fdGl0bGVcIj5Gb3JtYXRzPC9kaXY+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInByaW9yaXR5LWxpbmtzX19pdGVtXCI+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICBjbGFzcz1cInZlcnRpY2FsLWxpbmsgdmVydGljYWwtbGluay0tY2lyY2xlIGNhdGVnb3J5LWJyYW5kLS1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBocmVmPVwiL2Jyb3dzZS9zdWJqZWN0LzMwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWxpbmtfX2ZpZ3VyZVwiPlxuICAgICAgICAgICAgICAgIDx1Y2RsaWItaWNvblxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rX19pbWFnZVwiXG4gICAgICAgICAgICAgICAgICBpY29uPVwidWNkbGliLWRhbXM6ZmEtc3RhclwiXG4gICAgICAgICAgICAgICAgPjwvdWNkbGliLWljb24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmVydGljYWwtbGlua19fdGl0bGVcIj5TdWJqZWN0czwvZGl2PlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWxpc3BoZXJlLXNlY3Rpb25cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImN1cnJlbnQtaW5kZXgtcGFuZWxcIj5cbiAgICAgICAgICA8aW1nIHNyYz1cIi9pbWFnZXMvd2F0ZXJjb2xvci1zY2h3aWVyLTg3MjkzLWQzMXY1Ym42dC5qcGdcIiBhbHQ9XCJDYWxpc3BoZXJlIExvZ29cIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDI+TG9va2luZyBmb3IgbW9yZT88L2gyPlxuXG4gICAgICAgICAgJHtTaGFyZWRIdG1sLmhlYWRlckRvdHMoKX1cblxuICAgICAgICAgIDxwIGNsYXNzPVwiY2FsaXNwaGVyZS1leHRyYS1pbmZvXCI+XG4gICAgICAgICAgICBBZGRpdGlvbmFsIGl0ZW1zIGZyb20gdGhlIGxpYnJhcnkncyBBcmNoaXZlcyBhbmQgU3BlY2lhbCBDb2xsZWN0aW9ucyBcbiAgICAgICAgICAgIGFyZSBhdmFpbGFibGUgdGhyb3VnaCB0aGUgVW5pdmVyc2l0eSBvZiBDYWxpZm9ybmlhJ3MgQ2FsaXNwaGVyZS5cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vY2FsaXNwaGVyZS5vcmcvVUNEL2NvbGxlY3Rpb25zXCIgYWx0PVwiRXhwbG9yZSBDYWxpc3BoZXJlXCIgY2xhc3M9XCJidG4gYnRuLS1hbHQgYnRuLS1yb3VuZCBleHBsb3JlLWNhbGlzcGhlcmVcIj5FeHBsb3JlIENhbGlzcGhlcmU8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxwIGNsYXNzPVwiY2FsaXNwaGVyZS1saW5rXCI+RmVhdHVyZWQgSW1hZ2U6IDxhIGhyZWY9XCIvaXRlbS9hcms6Lzg3MjkzL2QzMXY1Ym42dFwiIGFsdD1cIlNjaHdpZXIgKEhpbGRhKSBQaG90b2dyYXBoIEFsYnVtXCI+U2Nod2llciAoSGlsZGEpIFBob3RvZ3JhcGggQWxidW08L2E+PC9wPlxuICAgIDwvZGl2PlxuXG4gICAgPGFwcC1icm93c2UtYnlcbiAgICAgIGlkPVwiY29sbGVjdGlvbnNcIlxuICAgICAgbGFiZWw9XCJDb2xsZWN0aW9uXCJcbiAgICAgIGZhY2V0LXF1ZXJ5LW5hbWU9XCJcIlxuICAgICAgP2hpZGRlbj1cIiR7dGhpcy5wYWdlICE9PSBcIi9icm93c2UvY29sbGVjdGlvbnNcIn1cIlxuICAgID5cbiAgICAgIDxpbWdcbiAgICAgICAgY2xhc3M9XCJoZWFkZXItaWNvblwiXG4gICAgICAgIHNsb3Q9XCJoZWFkZXItaWNvblwiXG4gICAgICAgIHNyYz1cIi9pbWFnZXMvd2F0ZXJjb2xvcnMvd2F0ZXJjb2xvci1zcGxhdC1nb2xkLWNvbGxlY3Rpb25zLnBuZ1wiXG4gICAgICAvPlxuICAgIDwvYXBwLWJyb3dzZS1ieT5cbiAgICA8YXBwLWJyb3dzZS1ieVxuICAgICAgaWQ9XCJzdWJqZWN0XCJcbiAgICAgIGxhYmVsPVwiU3ViamVjdFwiXG4gICAgICBmYWNldC1xdWVyeS1uYW1lPVwiQGdyYXBoLnN1YmplY3RzLm5hbWVcIlxuICAgICAgP2hpZGRlbj1cIiR7dGhpcy5wYWdlICE9PSBcIi9icm93c2Uvc3ViamVjdFwifVwiPlxuICAgICAgPGltZ1xuICAgICAgICBjbGFzcz1cImhlYWRlci1pY29uXCJcbiAgICAgICAgc2xvdD1cImhlYWRlci1pY29uXCJcbiAgICAgICAgc3JjPVwiL2ltYWdlcy93YXRlcmNvbG9ycy93YXRlcmNvbG9yLXNwbGF0LWdyZWVuLXN1YmplY3RzLnBuZ1wiXG4gICAgICAvPlxuICAgIDwvYXBwLWJyb3dzZS1ieT5cbiAgICA8YXBwLWJyb3dzZS1ieVxuICAgICAgaWQ9XCJjcmVhdG9yXCJcbiAgICAgIGxhYmVsPVwiQ3JlYXRvclwiXG4gICAgICBmYWNldC1xdWVyeS1uYW1lPVwiQGdyYXBoLmNyZWF0b3IubmFtZVwiXG4gICAgICA/aGlkZGVuPVwiJHt0aGlzLnBhZ2UgIT09IFwiL2Jyb3dzZS9jcmVhdG9yXCJ9XCI+XG4gICAgICA8aW1nXG4gICAgICAgIGNsYXNzPVwiaGVhZGVyLWljb25cIlxuICAgICAgICBzbG90PVwiaGVhZGVyLWljb25cIlxuICAgICAgICBzcmM9XCIvaW1hZ2VzL3dhdGVyY29sb3JzL3dhdGVyY29sb3Itc3BsYXQtcmVkLWNyZWF0b3JzLnBuZ1wiXG4gICAgICAvPlxuICAgIDwvYXBwLWJyb3dzZS1ieT5cbiAgICA8YXBwLWJyb3dzZS1ieVxuICAgICAgaWQ9XCJmb3JtYXRcIlxuICAgICAgbGFiZWw9XCJGb3JtYXRcIlxuICAgICAgZmFjZXQtcXVlcnktbmFtZT1cIkBncmFwaC5maWxlRm9ybWF0U2ltcGxlXCJcbiAgICAgID9oaWRkZW49XCIke3RoaXMucGFnZSAhPT0gXCIvYnJvd3NlL2Zvcm1hdFwifVwiPlxuICAgICAgPGltZ1xuICAgICAgICBjbGFzcz1cImhlYWRlci1pY29uXCJcbiAgICAgICAgc2xvdD1cImhlYWRlci1pY29uXCJcbiAgICAgICAgc3JjPVwiL2ltYWdlcy93YXRlcmNvbG9ycy93YXRlcmNvbG9yLXNwbGF0LWJsdWUtZm9ybWF0cy5wbmdcIlxuICAgICAgLz5cbiAgICA8L2FwcC1icm93c2UtYnk+XG4gIGA7XG59XG4iLCJpbXBvcnQgeyBMaXRFbGVtZW50IH0gZnJvbSAnbGl0JztcblxuaW1wb3J0IHJlbmRlciBmcm9tIFwiLi9hcHAtYnJvd3NlLWJ5LnRwbC5qc1wiO1xuXG5pbXBvcnQgeyBNaXhpbiwgTGl0Q29ya1V0aWxzIH0gZnJvbSAnQHVjZC1saWIvY29yay1hcHAtdXRpbHMnO1xuXG5pbXBvcnQgXCIuLi9jb21wb25lbnRzL2NhcmRzL2RhbXMtY29sbGVjdGlvbi1jYXJkXCI7XG5cbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vbGliL2NvbmZpZyc7XG5cbi8qKlxuICogQGNsYXNzIEFwcEJyb3dzZUJ5XG4gKiBAZGVzY3JpcHRpb24gYmFzZSBjbGFzcyBmb3IgdGhlIGJyb3dzZSBieSBbZmFjZXRdIHBhZ2UgZWxlbWVudHNcbiAqIFxuICogQm91bmQgdG8gYXBwLXN0YXRlLXVwZGF0ZSwgcmVuZGVyaW5nIHdoZW4gdGhlIHVybCBtYXRjaGVzIC9icm93c2UvW2lkXSB3aGVyZVxuICogZWxlbWVudCBpZCBpcy4gIFlvdSBtdXN0IHByb3ZpZGUgZmFjZXQtcXVlcnktbmFtZSBhbmQgbGFiZWwgYXMgd2VsbC5cbiAqIFxuICogVGhyZWUgc2xvdHMgYXJlIGF2YWlsYWJsZSBmb3IgaW1hZ2VzOyAnaGVhZGVyLWljb24nLCAnbGVmdC1pbWFnZScgYW5kICdyaWdodC1pbWFnZSdcbiAqIFxuICogQHByb3BlcnR5IHtTdHJpbmd9IGlkIHJlcXVpcmVkIHNvIHBhZ2UgaXMgcmVuZGVyZWQgb24gY29ycmVjdCBhcHAtc3RhdGUtdXBkYXRlIGV2ZW50XG4gKiBAcHJvcGVydHkge1N0cmluZ30gZmFjZXQtcXVlcnktbmFtZSB0aGUgcmVjb3JkIHByb3BlcnR5IHRvIGJlIHF1ZXJpZWQgb25cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBsYWJlbCBuaWNlIGxhYmVsIHRleHQgZm9yIHF1ZXJ5IGZhY2V0XG4gKiBAcHJvcGVydHkge0FycmF5fSBzb3J0QnlPcHRpb25zIG92ZXJyaWRlIHRoaXMgcHJvcGVydHkgdG8gY2hhbmdlIHRoZSBkZWZhdWx0IHNvcnRzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcEJyb3dzZUJ5IGV4dGVuZHMgTWl4aW4oTGl0RWxlbWVudClcbiAgLndpdGgoTGl0Q29ya1V0aWxzKSB7XG5cbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBmYWNldFF1ZXJ5TmFtZSA6IHt0eXBlOiBTdHJpbmcsIGF0dHJpYnV0ZTogJ2ZhY2V0LXF1ZXJ5LW5hbWUnfSxcbiAgICAgIGxhYmVsIDoge3R5cGU6IFN0cmluZ30sXG4gICAgICBzaWRlSW1hZ2VzIDoge3R5cGU6IEFycmF5fSxcbiAgICAgIHNpZGVJbWFnZUluZGV4IDoge3R5cGU6IE51bWJlcn0sXG4gICAgICBsZWZ0SW1nVXJsIDoge3R5cGU6IFN0cmluZ30sXG4gICAgICByaWdodEltZ1VybCA6IHt0eXBlOiBTdHJpbmd9LFxuICAgICAgbGVmdEl0ZW1MaW5rIDoge3R5cGU6IFN0cmluZ30sXG4gICAgICByaWdodEl0ZW1MaW5rIDoge3R5cGU6IFN0cmluZ30sXG4gICAgICBsZWZ0TGFiZWwgOiB7dHlwZTogU3RyaW5nfSxcbiAgICAgIHJpZ2h0TGFiZWwgOiB7dHlwZTogU3RyaW5nfSxcbiAgICAgIHNvcnRCeU9wdGlvbnMgOiB7dHlwZTogQXJyYXl9LFxuICAgICAgcmVzdWx0cyA6IHt0eXBlOiBBcnJheX0sXG4gICAgICBjb2xsZWN0aW9uUmVzdWx0cyA6IHt0eXBlOiBBcnJheX0sXG4gICAgICB0b3RhbFJlc3VsdHMgOiB7dHlwZTogTnVtYmVyfSxcbiAgICAgIHJlc3VsdHNQZXJQYWdlIDoge3R5cGU6IE51bWJlcn0sXG4gICAgICBjdXJyZW50SW5kZXggOiB7dHlwZTogTnVtYmVyfSxcbiAgICAgIHRvdGFsUGFnZXMgOiB7dHlwZTogTnVtYmVyfSxcbiAgICAgIGN1cnJlbnRQYWdlIDoge3R5cGU6IE51bWJlcn0sXG4gICAgICBpc0NvbGxlY3Rpb25QYWdlIDoge3R5cGU6IEJvb2xlYW59LFxuICAgICAgc2VsZWN0ZWRMZXR0ZXIgOiB7dHlwZTogU3RyaW5nfSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5zb3J0QnlPcHRpb25zID0gW1xuICAgICAge2xhYmVsIDogJ0EtWicsIHR5cGU6ICdrZXknLCBkaXIgOiAnYXNjJywgc2VsZWN0ZWQ6IHRydWV9LFxuICAgICAge2xhYmVsIDogJ0l0ZW0gUXVhbnRpdHknLCBkaXIgOiAnZHNjJywgdHlwZTogJ2NvdW50J31cbiAgICBdO1xuXG4gICAgdGhpcy5yZXNldCgpO1xuXG4gICAgdGhpcy5faW5qZWN0TW9kZWwoJ0Jyb3dzZUJ5TW9kZWwnLCAnQXBwU3RhdGVNb2RlbCcsICdSZWNvcmRNb2RlbCcsICdGY0FwcENvbmZpZ01vZGVsJywgJ0NvbGxlY3Rpb25Nb2RlbCcpO1xuICB9XG5cbiAgYXN5bmMgZmlyc3RVcGRhdGVkKCkge1xuICAgIHRoaXMuX29uQXBwU3RhdGVVcGRhdGUoYXdhaXQgdGhpcy5BcHBTdGF0ZU1vZGVsLmdldCgpKTtcbiAgICB0aGlzLmlzQ29sbGVjdGlvblBhZ2UgPSB0aGlzLmxhYmVsLnRvTG93ZXJDYXNlKCkgPT09ICdjb2xsZWN0aW9uJztcblxuICAgIGlmKCB0aGlzLmlzQ29sbGVjdGlvblBhZ2UgKSB7XG4gICAgICB0aGlzLnNvcnRCeU9wdGlvbnMgPSBbXG4gICAgICAgIHtsYWJlbCA6ICdBLVonLCB0eXBlOiAna2V5JywgZGlyIDogJ2FzYycsIHNlbGVjdGVkOiB0cnVlfSxcbiAgICAgICAge2xhYmVsIDogJ1JlY2VudCcsIGRpciA6ICdkc2MnLCB0eXBlOiAna2V5J30sXG4gICAgICAgIHtsYWJlbCA6ICdJdGVtIFF1YW50aXR5JywgZGlyIDogJ2RzYycsIHR5cGU6ICdjb3VudCd9XG4gICAgICBdO1xuICAgIH1cbiAgICBcbiAgICBsZXQgYnJvd3NlQnlJbWFnZXMgPSBhd2FpdCB0aGlzLkZjQXBwQ29uZmlnTW9kZWwuZ2V0RGVmYXVsdEltYWdlc0NvbmZpZygpO1xuICAgIGlmKCBicm93c2VCeUltYWdlcyApIHtcbiAgICAgIGJyb3dzZUJ5SW1hZ2VzID0gYnJvd3NlQnlJbWFnZXMuYm9keS5icm93c2VCeUltYWdlcztcbiAgICAgIHN3aXRjaCAodGhpcy5sYWJlbC50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIGNhc2UgJ3N1YmplY3QnOlxuICAgICAgICAgIHRoaXMuc2lkZUltYWdlcyA9IGJyb3dzZUJ5SW1hZ2VzLnN1YmplY3RQYWdlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjcmVhdG9yJzpcbiAgICAgICAgICB0aGlzLnNpZGVJbWFnZXMgPSBicm93c2VCeUltYWdlcy5jcmVhdG9yUGFnZTtcbiAgICAgICAgICBicmVhazsgIFxuICAgICAgICBjYXNlICdmb3JtYXQnOlxuICAgICAgICAgIHRoaXMuc2lkZUltYWdlcyA9IGJyb3dzZUJ5SW1hZ2VzLmZvcm1hdFBhZ2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhpcy5zaWRlSW1hZ2VzID0gW107XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9ICBcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVTaWRlSW1hZ2VzKCk7XG4gICAgdGhpcy5fbG9hZFJlc3VsdHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHJlc2V0XG4gICAqIEBkZXNjcmlwdGlvbiByZXNldCBzZWFyY2ggcHJvcGVydGllc1xuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5zaWRlSW1hZ2VzID0gW107XG4gICAgdGhpcy5zaWRlSW1hZ2VJbmRleCA9IDA7XG4gICAgdGhpcy5sZWZ0SW1nVXJsID0gJyc7XG4gICAgdGhpcy5yaWdodEltZ1VybCA9ICcnO1xuICAgIHRoaXMubGVmdEl0ZW1MaW5rID0gJyc7XG4gICAgdGhpcy5yaWdodEl0ZW1MaW5rID0gJyc7XG4gICAgdGhpcy5sZWZ0TGFiZWwgPSAnJztcbiAgICB0aGlzLnJpZ2h0TGFiZWwgPSAnJztcbiAgICB0aGlzLnJlc3VsdHMgPSBbXTtcbiAgICB0aGlzLmNvbGxlY3Rpb25SZXN1bHRzID0gW107XG4gICAgdGhpcy50b3RhbFJlc3VsdHMgPSAwO1xuICAgIHRoaXMucmVzdWx0c1BlclBhZ2UgPSAzMDtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgdGhpcy50b3RhbFBhZ2VzID0gMTtcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gMTtcbiAgICB0aGlzLmxhYmVsID0gJyc7XG4gICAgdGhpcy5pc0NvbGxlY3Rpb25QYWdlID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RlZExldHRlciA9ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uQXBwU3RhdGVVcGRhdGVcbiAgICogQGRlc2NyaXB0aW9uIGJvdW5kIHRvIEFwcFN0YXRlTW9kZWwgYXBwLXN0YXRlLXVwZGF0ZSBldmVudFxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBcbiAgICovXG4gIF9vbkFwcFN0YXRlVXBkYXRlKGUpIHtcbiAgICBpZiggZS5sb2NhdGlvbi5wYWdlICE9PSAnYnJvd3NlJyB8fCBlLmxvY2F0aW9uLnBhdGgubGVuZ3RoIDwgMiB8fCBlLmxvY2F0aW9uLnBhdGhbMV0gIT09IHRoaXMuaWQgKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkTGV0dGVyID0gJyc7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIHRoaXMuaXNDb2xsZWN0aW9uUGFnZSA9IHRoaXMubGFiZWwudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbGxlY3Rpb24nO1xuICAgIHRoaXMuX2xvYWRSZXN1bHRzKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfbG9hZFJlc3VsdHNcbiAgICogQGRlc2NyaXB0aW9uIGxvYWQgcmVzdWx0cyBiYXNlZCBvbiBjdXJyZW50UGFnZVxuICAgKi9cbiAgYXN5bmMgX2xvYWRSZXN1bHRzKCkgeyAgICBcbiAgICB0aGlzLnJlc3VsdHNQZXJQYWdlID0gdGhpcy5pc0NvbGxlY3Rpb25QYWdlID8gMTUgOiAzMDtcblxuICAgIGlmKCB0aGlzLkFwcFN0YXRlTW9kZWwubG9jYXRpb24gJiYgdGhpcy5BcHBTdGF0ZU1vZGVsLmxvY2F0aW9uLnBhdGgubGVuZ3RoID4gMiApIHtcbiAgICAgIHRoaXMucmVzdWx0c1BlclBhZ2UgPSBwYXJzZUludCh0aGlzLkFwcFN0YXRlTW9kZWwubG9jYXRpb24ucGF0aFsyXSB8fCB0aGlzLnJlc3VsdHNQZXJQYWdlKTtcbiAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gcGFyc2VJbnQodGhpcy5BcHBTdGF0ZU1vZGVsLmxvY2F0aW9uLnBhdGhbM10pIHx8IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gMDtcbiAgICB9ICAgIFxuXG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuY3VycmVudEluZGV4ID8gKHRoaXMuY3VycmVudEluZGV4IC8gdGhpcy5yZXN1bHRzUGVyUGFnZSkgKyAxIDogMTtcbiAgICBcbiAgICBpZiggdGhpcy50b3RhbFJlc3VsdHMgPT09IDAgKSB7XG4gICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgaWYoIHRoaXMuaXNDb2xsZWN0aW9uUGFnZSApIHsgXG4gICAgICAgIGF3YWl0IHRoaXMuX3NlYXJjaEJyb3dzZUJ5Q29sbGVjdGlvbnMoKTsgICAgICAgIFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hbGxSZXN1bHRzID0gYXdhaXQgdGhpcy5Ccm93c2VCeU1vZGVsLmdldEZhY2V0cyh0aGlzLmZhY2V0UXVlcnlOYW1lKTtcbiAgICAgICAgdGhpcy50b3RhbFJlc3VsdHMgPSB0aGlzLmFsbFJlc3VsdHMucGF5bG9hZC5sZW5ndGg7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbigpO1xuICAgIHRoaXMuX3JlbmRlclJlc3VsdHMoKTtcbiAgfVxuXG4gIHVwZGF0ZVBhZ2luYXRpb24oKSB7XG4gICAgaWYoIHRoaXMuc2VsZWN0ZWRMZXR0ZXIgKSB7XG4gICAgICB0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLnJlc3VsdHMubGVuZ3RoID09PSAwID8gMSA6IE1hdGguY2VpbCh0aGlzLnJlc3VsdHMubGVuZ3RoIC8gdGhpcy5yZXN1bHRzUGVyUGFnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudG90YWxQYWdlcyA9IHRoaXMudG90YWxSZXN1bHRzIC8gdGhpcy5yZXN1bHRzUGVyUGFnZSA8IDEgPyAxIDogTWF0aC5jZWlsKHRoaXMudG90YWxSZXN1bHRzIC8gdGhpcy5yZXN1bHRzUGVyUGFnZSk7XG4gICAgfVxuXG4gICAgbGV0IHBhZ2luYXRpb24gPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcigndWNkLXRoZW1lLXBhZ2luYXRpb24nKTtcbiAgICBpZiggcGFnaW5hdGlvbiApIHBhZ2luYXRpb24ucmVxdWVzdFVwZGF0ZSgnbWF4UGFnZXMnLCB0aGlzLnRvdGFsUGFnZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX3JlbmRlclJlc3VsdHNcbiAgICogQGRlc2NyaXB0aW9uIHJlbmRlciB0aGUgcmVzdWx0cyBhcnJheSBiYXNlZCBvbiBjdXJyZW50UGFnZSBhbmQgc29ydFxuICAgKiBwYXJhbXNcbiAgICovXG4gIF9yZW5kZXJSZXN1bHRzKCkge1xuICAgIGlmKCB0aGlzLmlzQ29sbGVjdGlvblBhZ2UgKSB7XG4gICAgICB0aGlzLl9yZW5kZXJDb2xsZWN0aW9ucygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBmaWx0ZXJSZXN1bHRzVG8gPSB0aGlzLmFsbFJlc3VsdHMucGF5bG9hZDtcblxuICAgIGlmKCB0aGlzLnNlbGVjdGVkTGV0dGVyICkge1xuICAgICAgLy8gZmlsdGVyIGJ5IHNlbGVjdGVkIGxldHRlclxuICAgICAgZmlsdGVyUmVzdWx0c1RvID0gZmlsdGVyUmVzdWx0c1RvLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgY29uc3QgZmlyc3RDaGFyID0gaXRlbS5rZXk/LnRyaW0oKT8uWzBdPy50b0xvd2VyQ2FzZSgpIHx8IGl0ZW0udGl0bGU/LnRyaW0oKT8uWzBdPy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiggdGhpcy5zZWxlY3RlZExldHRlciA9PT0gJzEnICkge1xuICAgICAgICAgIHJldHVybiBmaXJzdENoYXIgJiYgIS9bYS16XS8udGVzdChmaXJzdENoYXIpICYmIGl0ZW0uY291bnQgPiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpcnN0Q2hhciAmJiBmaXJzdENoYXIgPT09IHRoaXMuc2VsZWN0ZWRMZXR0ZXIgJiYgaXRlbS5jb3VudCA+IDA7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBsZXQgc29ydCA9IHRoaXMuc29ydEJ5T3B0aW9ucy5maW5kKGl0ZW0gPT4gaXRlbS5zZWxlY3RlZCk7XG4gICAgXG4gICAgaWYoIHRoaXMuc29ydGVkQXMgIT09IHNvcnQudHlwZSApIHtcbiAgICAgIGZpbHRlclJlc3VsdHNUby5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmKCBzb3J0LnR5cGUgPT09ICdjb3VudCcgKSB7XG4gICAgICAgICAgaWYoIGFbc29ydC50eXBlXSA+IGJbc29ydC50eXBlXSApIHJldHVybiAoc29ydC5kaXIgPT09ICdhc2MnKSA/IDEgOiAtMTtcbiAgICAgICAgICBpZiggYVtzb3J0LnR5cGVdIDwgYltzb3J0LnR5cGVdICkgcmV0dXJuIChzb3J0LmRpciA9PT0gJ2FzYycpID8gLTEgOiAxO1xuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBzb3J0LmRpciA9PT0gJ2FzYydcbiAgICAgICAgICAgID8gYVtzb3J0LnR5cGVdLnRyaW0oKS50b0xvd2VyQ2FzZSgpLmxvY2FsZUNvbXBhcmUoYltzb3J0LnR5cGVdLnRyaW0oKS50b0xvd2VyQ2FzZSgpKVxuICAgICAgICAgICAgOiBiW3NvcnQudHlwZV0udHJpbSgpLnRvTG93ZXJDYXNlKCkubG9jYWxlQ29tcGFyZShhW3NvcnQudHlwZV0udHJpbSgpLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc29ydGVkQXMgPSBzb3J0LnR5cGU7XG4gICAgfVxuICAgIFxuICAgIHRoaXMucmVzdWx0cyA9IGZpbHRlclJlc3VsdHNUby5zbGljZShcbiAgICAgIHRoaXMuY3VycmVudEluZGV4LCBcbiAgICAgIHRoaXMuY3VycmVudEluZGV4ICsgdGhpcy5yZXN1bHRzUGVyUGFnZSBcbiAgICApO1xuXG4gICAgdGhpcy5fdXBkYXRlU2lkZUltYWdlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX3JlbmRlckNvbGxlY3Rpb25zXG4gICAqIEBkZXNjcmlwdGlvbiByZW5kZXIgdGhlIHJlc3VsdHMgYXJyYXkgb2YgY29sbGVjdGlvbnMgYmFzZWQgb24gY3VycmVudFBhZ2UgYW5kIHNvcnRcbiAgICogcGFyYW1zXG4gICAqL1xuICBfcmVuZGVyQ29sbGVjdGlvbnMoKSB7XG4gICAgbGV0IHNvcnQgPSB0aGlzLnNvcnRCeU9wdGlvbnMuZmluZChpdGVtID0+IGl0ZW0uc2VsZWN0ZWQpO1xuICAgXG4gICAgbGV0IGZpbHRlclJlc3VsdHNUbyA9IHRoaXMuYWxsUmVzdWx0cztcblxuICAgIGlmKCB0aGlzLnNlbGVjdGVkTGV0dGVyICkge1xuICAgICAgLy8gZmlsdGVyIGJ5IHNlbGVjdGVkIGxldHRlclxuICAgICAgZmlsdGVyUmVzdWx0c1RvID0gZmlsdGVyUmVzdWx0c1RvLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIChpdGVtLmtleT8udG9Mb3dlckNhc2UoKT8udHJpbSgpPy5zdGFydHNXaXRoKHRoaXMuc2VsZWN0ZWRMZXR0ZXIpIHx8IGl0ZW0udGl0bGU/LnRvTG93ZXJDYXNlKCk/LnRyaW0oKT8uc3RhcnRzV2l0aCh0aGlzLnNlbGVjdGVkTGV0dGVyKSkgXG4gICAgICAgICAgJiYgaXRlbS5jb3VudCA+IDA7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiggdGhpcy5zb3J0ZWRBcyAhPT0gc29ydC50eXBlICkge1xuICAgICAgaWYoIHNvcnQudHlwZSA9PT0gJ2NvdW50JyApIHtcbiAgICAgICAgZmlsdGVyUmVzdWx0c1RvLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICBpZiggYVtzb3J0LnR5cGVdID4gYltzb3J0LnR5cGVdICkgcmV0dXJuIChzb3J0LmRpciA9PT0gJ2FzYycpID8gMSA6IC0xO1xuICAgICAgICAgIGlmKCBhW3NvcnQudHlwZV0gPCBiW3NvcnQudHlwZV0gKSByZXR1cm4gKHNvcnQuZGlyID09PSAnYXNjJykgPyAtMSA6IDE7XG4gICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICggc29ydC5sYWJlbCA9PT0gJ0EtWicgKSB7XG4gICAgICAgIC8vIHNvcnQgYnkgdGl0bGVcbiAgICAgICAgZmlsdGVyUmVzdWx0c1RvLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICBpZiggYS50aXRsZS50b0xvd2VyQ2FzZSgpLnRyaW0oKSA+IGIudGl0bGUudG9Mb3dlckNhc2UoKS50cmltKCkgKSByZXR1cm4gKHNvcnQuZGlyID09PSAnYXNjJykgPyAxIDogLTE7XG4gICAgICAgICAgaWYoIGEudGl0bGUudG9Mb3dlckNhc2UoKS50cmltKCkgPCBiLnRpdGxlLnRvTG93ZXJDYXNlKCkudHJpbSgpICkgcmV0dXJuIChzb3J0LmRpciA9PT0gJ2FzYycpID8gLTEgOiAxO1xuICAgICAgICAgIHJldHVybiAwOyAgIFxuICAgICAgICB9KTtcbiAgICAgIH0gLy8gZWxzZSByZWNlbnQsIGp1c3Qgc29ydCBieSBkYXRlLCBidXQgYWxyZWFkeSBzb3J0ZWQgKGluIF9zZWFyY2hCcm93c2VCeUNvbGxlY3Rpb25zKCksIHdlIHNvcnQgdXNpbmcgdGhlIGVzIHNlYXJjaERvY3VtZW50KVxuICAgIH0gIFxuXG4gICAgdGhpcy5jb2xsZWN0aW9uUmVzdWx0cyA9IGZpbHRlclJlc3VsdHNUby5zbGljZShcbiAgICAgIHRoaXMuY3VycmVudEluZGV4LCBcbiAgICAgIHRoaXMuY3VycmVudEluZGV4ICsgdGhpcy5yZXN1bHRzUGVyUGFnZSBcbiAgICApO1xuXG4gICAgdGhpcy5yZXN1bHRzID0gZmlsdGVyUmVzdWx0c1RvLnNsaWNlKFxuICAgICAgdGhpcy5jdXJyZW50SW5kZXgsXG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCArIHRoaXMucmVzdWx0c1BlclBhZ2VcbiAgICApO1xuXG4gICAgdGhpcy5fdXBkYXRlU2lkZUltYWdlcygpO1xuICB9XG5cbiAgX29uTGV0dGVyQ2hhbmdlKGUpIHtcbiAgICBpZiggdGhpcy5zZWxlY3RlZExldHRlciA9PT0gZS5kZXRhaWwubGV0dGVyICkgdGhpcy5zZWxlY3RlZExldHRlciA9ICcnO1xuICAgIGVsc2UgdGhpcy5zZWxlY3RlZExldHRlciA9IGUuZGV0YWlsLmxldHRlcjtcbiAgICBcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gMTtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9ICh0aGlzLmN1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLnJlc3VsdHNQZXJQYWdlO1xuXG4gICAgdGhpcy5fcmVuZGVyUmVzdWx0cygpO1xuICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbigpO1xuICB9XG5cbiAgYXN5bmMgX3NlYXJjaEJyb3dzZUJ5Q29sbGVjdGlvbnMoKSB7XG4gICAgbGV0IHNvcnQgPSB7fTtcbiAgICBsZXQgc29ydEJ5ID0gdGhpcy5zb3J0QnlPcHRpb25zLmZpbHRlcihzID0+IHMuc2VsZWN0ZWQpWzBdO1xuICAgIFxuICAgIGlmKCBzb3J0QnkubGFiZWwgPT09ICdBLVonICkge1xuICAgICAgc29ydCA9IHtcIm5hbWVcIiA6IFwiYXNjXCJ9O1xuICAgIH0gZWxzZSBpZiggc29ydEJ5LmxhYmVsID09PSAnUmVjZW50JyApIHtcbiAgICAgIHNvcnQgPSBbXG4gICAgICAgICAgeydAZ3JhcGgueWVhclB1Ymxpc2hlZCc6IHtvcmRlciA6IFwiZGVzY1wiIH19LFxuICAgICAgICAgIHsnQGdyYXBoLmxhc3RNb2RpZmllZCc6IHtvcmRlciA6IFwiZGVzY1wiIH19XG4gICAgICAgIF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHNvcnQgPSB7XCJAZ3JhcGguaXRlbUNvdW50XCIgOiBcImRlc2NcIn07XG4gICAgfVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHNvcnQpKSB7XG4gICAgICBzb3J0ID0gW3NvcnRdO1xuICAgIH1cbiAgICBsZXQgc2VhcmNoRG9jdW1lbnQgPSB7XG4gICAgICB0ZXh0IDogJycsXG4gICAgICBmaWx0ZXJzIDoge30sXG4gICAgICBzb3J0IDogc29ydCxcbiAgICAgIGxpbWl0IDogMCxcbiAgICAgIG9mZnNldCA6IDAsXG4gICAgICBmYWNldHMgOiB7fVxuICAgIH1cblxuICAgIHRoaXMuYWxsUmVzdWx0cyA9IGF3YWl0IHRoaXMuQ29sbGVjdGlvbk1vZGVsLnNlYXJjaChzZWFyY2hEb2N1bWVudCk7XG4gICAgdGhpcy5hbGxSZXN1bHRzID0gdGhpcy5hbGxSZXN1bHRzLnBheWxvYWQucmVzdWx0cy5tYXAociA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aHVtYm5haWxVcmwgOiByLnJvb3QuaW1hZ2U/LlsnQGlkJ10sIFxuICAgICAgICB0aXRsZSA6IHIucm9vdC5uYW1lLFxuICAgICAgICBjb3VudCA6IHIucm9vdC5pdGVtQ291bnQsXG4gICAgICAgIGlkIDogci5yb290WydAaWQnXVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYoIHNvcnRCeS50eXBlID09PSAnY291bnQnICkge1xuICAgICAgdGhpcy5hbGxSZXN1bHRzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYoIGFbc29ydEJ5LnR5cGVdID4gYltzb3J0QnkudHlwZV0gKSByZXR1cm4gKHNvcnRCeS5kaXIgPT09ICdhc2MnKSA/IDEgOiAtMTtcbiAgICAgICAgaWYoIGFbc29ydEJ5LnR5cGVdIDwgYltzb3J0QnkudHlwZV0gKSByZXR1cm4gKHNvcnRCeS5kaXIgPT09ICdhc2MnKSA/IC0xIDogMTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKCBzb3J0QnkubGFiZWwgPT09ICdBLVonICkge1xuICAgICAgLy8gc29ydCBieSB0aXRsZVxuICAgICAgdGhpcy5hbGxSZXN1bHRzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYoIGEudGl0bGUudG9Mb3dlckNhc2UoKSA+IGIudGl0bGUudG9Mb3dlckNhc2UoKSApIHJldHVybiAoc29ydEJ5LmRpciA9PT0gJ2FzYycpID8gMSA6IC0xO1xuICAgICAgICBpZiggYS50aXRsZS50b0xvd2VyQ2FzZSgpIDwgYi50aXRsZS50b0xvd2VyQ2FzZSgpICkgcmV0dXJuIChzb3J0QnkuZGlyID09PSAnYXNjJykgPyAtMSA6IDE7XG4gICAgICAgIHJldHVybiAwOyAgIFxuICAgICAgfSk7XG4gICAgfSAvLyBlbHNlIHJlY2VudCwganVzdCBzb3J0IGJ5IGRhdGUsIGJ1dCBhbHJlYWR5IHNvcnRlZCBhYm92ZVxuICAgIFxuICAgIHRoaXMuY29sbGVjdGlvblJlc3VsdHMgPSB0aGlzLmFsbFJlc3VsdHMuc2xpY2UoXG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCwgXG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCArIHRoaXMucmVzdWx0c1BlclBhZ2UgXG4gICAgKTtcblxuICAgIHRoaXMudG90YWxSZXN1bHRzID0gdGhpcy5hbGxSZXN1bHRzLmxlbmd0aDtcbiAgICAvLyB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvckFsbCgnZGFtcy1jb2xsZWN0aW9uLWNhcmQnKS5mb3JFYWNoKGMgPT4gYy5yZXF1ZXN0VXBkYXRlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX3VwZGF0ZVNpZGVJbWFnZXNcbiAgICogQGRlc2NyaXB0aW9uIHVwZGF0ZSBzaWRlIGltYWdlcyBiYXNlZCBvbiBzZWxlY3RlZCBwYWdlLCBjdXJhdGVkIGdyb3VwcyBmcm9tIEtpbW15XG4gICAqL1xuICBfdXBkYXRlU2lkZUltYWdlcygpIHtcbiAgICBpZiggIXRoaXMuc2lkZUltYWdlcyB8fCAodGhpcy5zaWRlSW1hZ2VzICYmICF0aGlzLnNpZGVJbWFnZXMubGVuZ3RoKSApIHtcbiAgICAgIHRoaXMubGVmdEltZ1VybCA9ICcnO1xuICAgICAgdGhpcy5yaWdodEltZ1VybCA9ICcnO1xuICAgICAgdGhpcy5sZWZ0SXRlbUxpbmsgPSAnJztcbiAgICAgIHRoaXMucmlnaHRJdGVtTGluayA9ICcnO1xuICAgICAgdGhpcy5sZWZ0TGFiZWwgPSAnJztcbiAgICAgIHRoaXMucmlnaHRMYWJlbCA9ICcnO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNpZGVJbWFnZUluZGV4ID0gdGhpcy5jdXJyZW50UGFnZSAtIDE7XG4gICAgaWYoIHRoaXMuY3VycmVudFBhZ2UgPiB0aGlzLnNpZGVJbWFnZXMubGVuZ3RoICkge1xuICAgICAgd2hpbGUoIHRoaXMuc2lkZUltYWdlSW5kZXggKyAxID4gdGhpcy5zaWRlSW1hZ2VzLmxlbmd0aCApIHtcbiAgICAgICAgdGhpcy5zaWRlSW1hZ2VJbmRleCAtPSB0aGlzLnNpZGVJbWFnZXMubGVuZ3RoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubGVmdEltZ1VybCA9IHRoaXMuc2lkZUltYWdlc1t0aGlzLnNpZGVJbWFnZUluZGV4XS5sZWZ0SW1nVXJsO1xuICAgIHRoaXMucmlnaHRJbWdVcmwgPSB0aGlzLnNpZGVJbWFnZXNbdGhpcy5zaWRlSW1hZ2VJbmRleF0ucmlnaHRJbWdVcmw7XG4gICAgdGhpcy5sZWZ0SXRlbUxpbmsgPSB0aGlzLnNpZGVJbWFnZXNbdGhpcy5zaWRlSW1hZ2VJbmRleF0ubGVmdEl0ZW1MaW5rO1xuICAgIHRoaXMucmlnaHRJdGVtTGluayA9IHRoaXMuc2lkZUltYWdlc1t0aGlzLnNpZGVJbWFnZUluZGV4XS5yaWdodEl0ZW1MaW5rO1xuICAgIHRoaXMubGVmdExhYmVsID0gdGhpcy5zaWRlSW1hZ2VzW3RoaXMuc2lkZUltYWdlSW5kZXhdLmxlZnRMYWJlbDtcbiAgICB0aGlzLnJpZ2h0TGFiZWwgPSB0aGlzLnNpZGVJbWFnZXNbdGhpcy5zaWRlSW1hZ2VJbmRleF0ucmlnaHRMYWJlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblBhZ2VDbGlja2VkXG4gICAqIEBkZXNjcmlwdGlvbiBib3VuZCB0byB1Y2QtdGhlbWUtcGFnaW5hdGlvbiBuYXYgZXZlbnRcbiAgICogXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIFxuICAgKi9cbiAgX29uUGFnZUNsaWNrZWQoZSkge1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSBlLmRldGFpbC5wYWdlO1xuICAgIHRoaXMuY3VycmVudEluZGV4ID0gKHRoaXMuY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMucmVzdWx0c1BlclBhZ2U7XG4gICAgbGV0IHBhdGggPSAnL2Jyb3dzZS8nK3RoaXMuaWQrJy8nK3RoaXMucmVzdWx0c1BlclBhZ2U7XG4gICAgaWYoIHRoaXMuY3VycmVudEluZGV4ID4gMCApIHtcbiAgICAgIHBhdGggKz0gJy8nK3RoaXMuY3VycmVudEluZGV4O1xuICAgIH1cbiAgICB0aGlzLkFwcFN0YXRlTW9kZWwuc2V0TG9jYXRpb24ocGF0aCk7XG4gICAgdGhpcy5fcmVuZGVyUmVzdWx0cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uQ29sbGVjdGlvbkNsaWNrZWRcbiAgICogQGRlc2NyaXB0aW9uIGNhbGxlZCB3aGVuIGNvbGxlY3Rpb24gaW1nIG9uIGhvbWUgcGFnZSBpcyBjbGlja2VkIFxuICAgKiBAcGFyYW0ge09iamVjdH0gZVxuICAgKi9cbiAgX29uQ29sbGVjdGlvbkNsaWNrZWQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiggZS50eXBlID09PSAna2V5dXAnICYmIGUud2hpY2ggIT09IDEzICkgcmV0dXJuO1xuICAgIGxldCBpZCA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgICB0aGlzLkFwcFN0YXRlTW9kZWwuc2V0TG9jYXRpb24oaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uU29ydENoYW5nZVxuICAgKiBAZGVzY3JpcHRpb24gYm91bmQgdG8gc29ydCByYWRpbyBidXR0b24gY2hhbmdlIGV2ZW50c1xuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgXG4gICAqL1xuICBfb25Tb3J0Q2hhbmdlKGUpIHtcbiAgICBsZXQgc29ydEluZGV4ID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnaW5kZXgnKSk7XG4gICAgdGhpcy5zb3J0QnlPcHRpb25zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiBpdGVtLnNlbGVjdGVkID0gKGluZGV4ID09PSBzb3J0SW5kZXgpKTtcbiAgXG4gICAgLy8gcmVzZXQgdG8gZmlyc3QgcGFnZVxuICAgIGlmKCB0aGlzLmN1cnJlbnRQYWdlICE9PSAxICkge1xuICAgICAgbGV0IHBhdGggPSAnL2Jyb3dzZS8nK3RoaXMuaWQrJy8nK3RoaXMucmVzdWx0c1BlclBhZ2U7XG4gICAgICB0aGlzLkFwcFN0YXRlTW9kZWwuc2V0TG9jYXRpb24ocGF0aCk7XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMTtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XG4gIFxuICAgIGlmKCB0aGlzLmlzQ29sbGVjdGlvblBhZ2UgKSB7XG4gICAgICB0aGlzLl9zZWFyY2hCcm93c2VCeUNvbGxlY3Rpb25zKCk7XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlclJlc3VsdHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGdldEZpbHRlclVybFxuICAgKiBAZGVzY3JpcHRpb24gdXNlZCBieSBVSSB0byBjcmVhdGUgYW5jaG9yIHRhZyB1cmxzIGZvciBzZWFyY2ggcXVlcmllc1xuICAgKiBiYXNlZCBvbiBnaXZlbiBmYWNldFxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZmFjZXQgcmVzdWx0IGl0ZW0gXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAqL1xuICBnZXRGaWx0ZXJVcmwoaXRlbSkge1xuICAgIGxldCBzZWFyY2hEb2N1bWVudCA9IHRoaXMuUmVjb3JkTW9kZWwuZW1wdHlTZWFyY2hEb2N1bWVudCgpO1xuICAgIHRoaXMuUmVjb3JkTW9kZWwuYXBwZW5kS2V5d29yZEZpbHRlcihzZWFyY2hEb2N1bWVudCwgdGhpcy5mYWNldFF1ZXJ5TmFtZSwgaXRlbS5rZXkpO1xuICAgIHJldHVybiAnL3NlYXJjaC8nK3RoaXMuUmVjb3JkTW9kZWwuc2VhcmNoRG9jdW1lbnRUb1VybChzZWFyY2hEb2N1bWVudCk7XG4gIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2FwcC1icm93c2UtYnknLCBBcHBCcm93c2VCeSk7XG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSBcImxpdFwiO1xuaW1wb3J0IHsgc2hhcmVkU3R5bGVzIH0gZnJvbSBcIi4uL3N0eWxlcy9zaGFyZWQtc3R5bGVzXCI7XG5pbXBvcnQgXCJAdWNkLWxpYi90aGVtZS1lbGVtZW50cy9icmFuZC91Y2QtdGhlbWUtcGFnaW5hdGlvbi91Y2QtdGhlbWUtcGFnaW5hdGlvbi5qc1wiO1xuaW1wb3J0ICcuLi9jb21wb25lbnRzL3VjZGxpYi1icm93c2UtYXouanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXIoKSB7XG4gIHJldHVybiBodG1sYFxuICAgIDxzdHlsZT5cbiAgICAgICR7c2hhcmVkU3R5bGVzfVxuICAgIDwvc3R5bGU+XG4gICAgPHN0eWxlPlxuICAgICAgOmhvc3Qge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDRyZW07XG4gICAgICB9XG5cbiAgICAgIC5oZWFkZXIge1xuICAgICAgICB3aWR0aDogNTAlO1xuICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgIHBhZGRpbmc6IDJyZW0gMnJlbSAwO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIH1cblxuICAgICAgLmhlYWRlci1sYXlvdXQge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMS41cmVtO1xuICAgICAgICBtYXJnaW46IDAgM3JlbTtcbiAgICAgIH1cblxuICAgICAgaDEge1xuICAgICAgICBtYXJnaW46IDAuNXJlbSAxcmVtO1xuICAgICAgfVxuXG4gICAgICBoMSAucmVndWxhci13dCB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiB2YXIoLS1mdy1yZWd1bGFyKTtcbiAgICAgIH1cblxuICAgICAgYSB7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgIH1cblxuICAgICAgLnJhZGlvLWJ0bi1jb250YWluZXIge1xuICAgICAgICBtYXJnaW4tbGVmdDogMTVweDtcbiAgICAgIH1cblxuICAgICAgLnNvcnQge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIH1cblxuICAgICAgLmJvZHkge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgICAgIH1cblxuICAgICAgW2hpZGRlbl0ge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgfVxuXG4gICAgICAuc2lkZS1pbWFnZSB7XG4gICAgICAgIGZsZXg6IDE7XG4gICAgICB9XG5cbiAgICAgIC5zaWRlLWltYWdlLm5vLWZsZXgge1xuICAgICAgICBmbGV4OiAwO1xuICAgICAgfVxuXG4gICAgICAucmVzdWx0cyB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBmbGV4OiAyO1xuICAgICAgICBwYWRkaW5nOiAycmVtO1xuICAgICAgICB6LWluZGV4OiAxMDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogNXB4IGRvdHRlZCB2YXIoLS1jb2xvci1kYW1zLXNlY29uZGFyeSk7XG4gICAgICAgIGJvcmRlci10b3A6IDVweCBkb3R0ZWQgdmFyKC0tY29sb3ItZGFtcy1zZWNvbmRhcnkpO1xuICAgICAgfVxuXG4gICAgICAucmVzdWx0cy5jb2xsZWN0aW9uIHtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgICAgICAgYm9yZGVyLXRvcDogbm9uZTtcbiAgICAgIH1cblxuICAgICAgLnJlc3VsdHMgPiAudGFibGUgPiAqIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5yZXN1bHRzIGg1IHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgfVxuXG4gICAgICAucmVzdWx0cyA+IC50YWJsZSA+ICogPiAqOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgIH1cblxuICAgICAgLnJlc3VsdHMgaDUsXG4gICAgICAucmVzdWx0cyAubGlzdC1pdGVtIHtcbiAgICAgICAgcGFkZGluZzogMCAxcmVtO1xuICAgICAgfVxuXG4gICAgICAubGlzdC1pdGVtIHtcbiAgICAgICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICAgIH1cblxuICAgICAgLmxpc3Qta2V5IHtcbiAgICAgICAgZm9udC13ZWlnaHQ6IHZhcigtLWZ3LWJvbGQpO1xuICAgICAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHVjZC10aGVtZS1wYWdpbmF0aW9uIHtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAubGVmdC1pbWFnZS1jb250YWluZXIge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGxlZnQ6IC0xMi41dnc7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgIH1cblxuICAgICAgLmxlZnQtaW1hZ2UtY29udGFpbmVyIC5jcmVhdG9yLWluZm8tbGFiZWwgaW1nIHtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVgoLTEpO1xuICAgICAgfVxuXG4gICAgICAucmlnaHQtaW1hZ2UtY29udGFpbmVyIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICByaWdodDogLTEyLjV2dztcbiAgICAgICAgdG9wOiAwO1xuICAgICAgfVxuXG4gICAgICAubGVmdC1pbWFnZS1jb250YWluZXIgaW1nLFxuICAgICAgLnJpZ2h0LWltYWdlLWNvbnRhaW5lciBpbWcge1xuICAgICAgICB3aWR0aDogMzcuNXZ3O1xuICAgICAgfVxuXG4gICAgICAubGVmdC1pbWFnZS1jb250YWluZXIgYSxcbiAgICAgIC5yaWdodC1pbWFnZS1jb250YWluZXIgYSB7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIH1cblxuICAgICAgZGl2LmNyZWF0b3ItaW5mby1sYWJlbCB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm90dG9tOiAxcmVtO1xuICAgICAgICByaWdodDogMDtcblxuICAgICAgICB3aWR0aDogYXV0bztcbiAgICAgICAgei1pbmRleDogMjA7XG4gICAgICAgIGhlaWdodDogYXV0bztcbiAgICAgIH1cblxuICAgICAgLmNyZWF0b3ItaW5mby1sYWJlbCB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgfVxuXG4gICAgICAvKiBob3ZlciB0cmFuc2l0aW9ucyAqL1xuICAgICAgLmxlZnQtaW1hZ2UtY29udGFpbmVyIC5jcmVhdG9yLWluZm8tbGFiZWwge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwdncpO1xuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC41NXMgZWFzZS1pbi1vdXQ7XG4gICAgICB9XG5cbiAgICAgIC5yaWdodC1pbWFnZS1jb250YWluZXIgLmNyZWF0b3ItaW5mby1sYWJlbCB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg1MHZ3KTtcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNTVzIGVhc2UtaW4tb3V0O1xuICAgICAgfVxuXG4gICAgICAubGVmdC1pbWFnZS1jb250YWluZXI6aG92ZXIgLmNyZWF0b3ItaW5mby1sYWJlbCxcbiAgICAgIC5yaWdodC1pbWFnZS1jb250YWluZXI6aG92ZXIgLmNyZWF0b3ItaW5mby1sYWJlbCB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcbiAgICAgIH1cblxuICAgICAgLnJpZ2h0LWltYWdlLWNvbnRhaW5lciAuY3JlYXRvci1pbmZvLWxhYmVsIHtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IGF1dG87XG4gICAgICB9XG5cbiAgICAgIC5jcmVhdG9yLWluZm8tbGFiZWwgaW1nIHtcbiAgICAgICAgd2lkdGg6IDEwcmVtO1xuICAgICAgfVxuXG4gICAgICAuY3JlYXRvci1pbmZvLWxhYmVsIGg1IHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBjb2xvcjogdmFyKC0td2hpdGUsICNGRkYpO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgfVxuXG4gICAgICAuY3JlYXRvci1pbmZvLWxhYmVsIGg1IHtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBoZWlnaHQ6IDNyZW07XG4gICAgICAgIHdpZHRoOiA4cmVtO1xuICAgICAgICBmb250LXdlaWdodDogODAwO1xuICAgICAgICBmb250LXNpemU6IDAuODc1cmVtO1xuICAgICAgICBsaW5lLWhlaWdodDogMS4yO1xuXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgfVxuXG4gICAgICAuY2FyZC1ncmlkIHtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIG1pbm1heCgwLCAxZnIpKTtcbiAgICAgICAgZ3JpZC1nYXA6IDJyZW07XG4gICAgICAgIG1heC13aWR0aDogOTMlO1xuICAgICAgfVxuXG4gICAgICAucmVzdWx0cy1mb290ZXIge1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgd2lkdGg6IDY1JTtcbiAgICAgICAgcGFkZGluZzogMnJlbSAycmVtIDA7XG4gICAgICB9XG5cbiAgICAgIC5oZWFkZXItZG90cyxcbiAgICAgIC5mb290ZXItZG90cyB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIC5oZWFkZXItZG90cy5jb2xsZWN0aW9uLFxuICAgICAgLmZvb3Rlci1kb3RzLmNvbGxlY3Rpb24ge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogNXB4IGRvdHRlZCB2YXIoLS1jb2xvci1kYW1zLXNlY29uZGFyeSk7IFxuICAgICAgICB3aWR0aDogY2FsYyg1MCUgKyAycmVtKTtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgdWNkbGliLWJyb3dzZS1heiB7XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAxLjVyZW07XG4gICAgICAgIHdpZHRoOiAxMDAlOyBcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgfVxuXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogMTMxMHB4KSB7XG4gICAgICAgIC5oZWFkZXIsXG4gICAgICAgIC5yZXN1bHRzLWZvb3RlciB7XG4gICAgICAgICAgd2lkdGg6IDY1JTtcbiAgICAgICAgfVxuICAgICAgICBoMSB7XG4gICAgICAgICAgbWFyZ2luOiAwLjVyZW0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHVjZGxpYi1icm93c2UtYXoge1xuICAgICAgICAgIHdpZHRoOiBjYWxjKDUwJSAvIDAuNjUgLSAycmVtKTsgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAgICAgICAuaGVhZGVyLFxuICAgICAgICAucmVzdWx0cy1mb290ZXIge1xuICAgICAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgICB9XG5cbiAgICAgICAgdWNkbGliLWJyb3dzZS1heiB7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7IFxuICAgICAgICB9XG4gICAgICAgIC5oZWFkZXItZG90cy5jb2xsZWN0aW9uLFxuICAgICAgICAuZm9vdGVyLWRvdHMuY29sbGVjdGlvbiB7XG4gICAgICAgICAgd2lkdGg6IDkwJTtcbiAgICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA5OTBweCkge1xuICAgICAgICAvKiB0YWJsZXQgKi9cbiAgICAgICAgLmNhcmQtZ3JpZCB7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgbWlubWF4KDAsIDFmcikpO1xuICAgICAgICB9XG4gICAgICAgIGgxIHtcbiAgICAgICAgICBmb250LXNpemU6IDJyZW07XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgICAgICAgLyogbW9iaWxlICovXG4gICAgICAgIC5jYXJkLWdyaWQge1xuICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEsIG1pbm1heCgwLCAxZnIpKTtcbiAgICAgICAgfVxuICAgICAgICAuc29ydCB7XG4gICAgICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgICB9XG4gICAgICAgIC5zb3J0ID4gZGl2OmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlciB7XG4gICAgICAgICAgcGFkZGluZzogMnJlbSAxcmVtIDA7XG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlci1sYXlvdXQge1xuICAgICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgICB3aWR0aDogNjAlO1xuICAgICAgICB9XG4gICAgICAgIC5yZXN1bHRzLWZvb3RlciB7XG4gICAgICAgICAgcGFkZGluZzogMnJlbSAxcmVtIDA7XG4gICAgICAgIH1cblxuICAgICAgICAuc2lkZS1pbWFnZSB7XG4gICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICAgICAgICAuYm9keSB7XG4gICAgICAgICAgd2lkdGg6IDkwJTtcbiAgICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgIH1cbiAgICAgICAgLnJlc3VsdHMge1xuICAgICAgICAgIHBhZGRpbmc6IDJyZW0gMDtcbiAgICAgICAgfVxuICAgICAgICAucmVzdWx0cyBoNSwgLnJlc3VsdHMgLmxpc3QtaXRlbSB7XG4gICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgfVxuICAgICAgICAudGFibGUtaGVhZGluZyB7XG4gICAgICAgICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDUwMHB4KSB7XG4gICAgICAgIC5oZWFkZXItbGF5b3V0IHtcbiAgICAgICAgICB3aWR0aDogOTAlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC5sZWZ0LWltYWdlLFxuICAgICAgLnJpZ2h0LWltYWdlIHtcbiAgICAgICAgY2xpcC1wYXRoOiBpbnNldCgwIDAgNXB4IDApO1xuICAgICAgfVxuICAgIDwvc3R5bGU+XG5cbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWxheW91dFwiPlxuICAgICAgICA8ZGl2PjxzbG90IG5hbWU9XCJoZWFkZXItaWNvblwiPjwvc2xvdD48L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDE+QnJvd3NlIDxzcGFuPiR7dGhpcy5sYWJlbH1zPC9zcGFuPjwvaDE+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzb3J0XCI+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtd2VpZ2h0OiB2YXIoLS1mdy1ib2xkKVwiPlNvcnQgQnk6PC9kaXY+XG4gICAgICAgICAgJHt0aGlzLnNvcnRCeU9wdGlvbnMubWFwKFxuICAgICAgICAgICAgKGl0ZW0sIGluZGV4KSA9PiBodG1sYFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmFkaW8tYnRuLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICAgIGlkPVwiYnJvd3NlLWJ5LSR7dGhpcy5mYWNldFF1ZXJ5TmFtZX0tJHtpdGVtLmxhYmVsfVwiXG4gICAgICAgICAgICAgICAgICBuYW1lPVwiYnJvd3NlLWJ5LSR7dGhpcy5mYWNldFF1ZXJ5TmFtZX1cIlxuICAgICAgICAgICAgICAgICAgaW5kZXg9XCIke2luZGV4fVwiXG4gICAgICAgICAgICAgICAgICAuY2hlY2tlZD1cIiR7aXRlbS5zZWxlY3RlZH1cIlxuICAgICAgICAgICAgICAgICAgQGNoYW5nZT1cIiR7dGhpcy5fb25Tb3J0Q2hhbmdlfVwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiYnJvd3NlLWJ5LSR7dGhpcy5mYWNldFF1ZXJ5TmFtZX0tJHtpdGVtLmxhYmVsfVwiXG4gICAgICAgICAgICAgICAgICA+JHtpdGVtLmxhYmVsfTwvbGFiZWxcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYFxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8dWNkbGliLWJyb3dzZS1helxuICAgICAgICA/aGlkZGVuPVwiJHt0aGlzLnRvdGFsUGFnZXMgPCA2ICYmICF0aGlzLnNlbGVjdGVkTGV0dGVyfVwiXG4gICAgICAgIC5yZXN1bHRzPVwiJHsodGhpcy5hbGxSZXN1bHRzPy5wYXlsb2FkIHx8IHRoaXMuYWxsUmVzdWx0cyB8fCBbXSl9XCJcbiAgICAgICAgQGxldHRlci1jaGFuZ2U9XCIke3RoaXMuX29uTGV0dGVyQ2hhbmdlfVwiXG4gICAgICAgIC5zZWxlY3RlZC1sZXR0ZXI9XCIke3RoaXMuc2VsZWN0ZWRMZXR0ZXJ9XCI+XG4gICAgICA8L3VjZGxpYi1icm93c2UtYXo+ICAgICAgXG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWRvdHMgJHt0aGlzLmlzQ29sbGVjdGlvblBhZ2UgPyAnY29sbGVjdGlvbicgOiAnJ31cIj48L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJib2R5XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic2lkZS1pbWFnZSAke3RoaXMuaXNDb2xsZWN0aW9uUGFnZSA/IFwibm8tZmxleFwiIDogXCJcIn1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxlZnQtaW1hZ2UtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGEgaHJlZj1cIiR7dGhpcy5sZWZ0SXRlbUxpbmt9XCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIGNsYXNzPVwibGVmdC1pbWFnZVwiXG4gICAgICAgICAgICAgID9oaWRkZW49JHt0aGlzLnJlc3VsdHMubGVuZ3RoIDwgMTIgfHwgdGhpcy5pc0NvbGxlY3Rpb25QYWdlfVxuICAgICAgICAgICAgICBzcmM9XCIke3RoaXMubGVmdEltZ1VybH1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdG9yLWluZm8tbGFiZWxcIj5cbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvaW1hZ2VzL3dhdGVyY29sb3JzL0xhYmVsLVdhdGVyY29sb3ItQmx1ZV92Mi5wbmdcIiBhbHQ9XCJsYWJlbCBiYWNrZ3JvdW5kXCIvPlxuICAgICAgICAgICAgICA8aDU+JHt0aGlzLmxlZnRMYWJlbH08L2g1PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9hPlxuICBcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdHMgJHt0aGlzLmlzQ29sbGVjdGlvblBhZ2UgPyAnY29sbGVjdGlvbicgOiAnJ31cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlXCIgP2hpZGRlbj1cIiR7dGhpcy5pc0NvbGxlY3Rpb25QYWdlfVwiPlxuICAgICAgICAgIDxoNT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS1oZWFkaW5nXCI+JHt0aGlzLmxhYmVsfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlLWhlYWRpbmdcIj5JdGVtczwvZGl2PlxuICAgICAgICAgIDwvaDU+XG5cbiAgICAgICAgICAke3RoaXMucmVzdWx0cy5tYXAoXG4gICAgICAgICAgICAoaXRlbSkgPT4gaHRtbGBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWtleVwiPlxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7dGhpcy5nZXRGaWx0ZXJVcmwoaXRlbSl9XCI+JHtpdGVtLmtleX08L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtY291bnRcIj4ke2l0ZW0uY291bnR9PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYFxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgP2hpZGRlbj1cIiR7dGhpcy5sYWJlbC50b0xvd2VyQ2FzZSgpICE9PSBcImNvbGxlY3Rpb25cIn1cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ncmlkXCI+XG4gICAgICAgICAgICAke3RoaXMuY29sbGVjdGlvblJlc3VsdHMubWFwKFxuICAgICAgICAgICAgICAocmVzKSA9PiBodG1sYFxuICAgICAgICAgICAgICAgIDxkYW1zLWNvbGxlY3Rpb24tY2FyZFxuICAgICAgICAgICAgICAgICAgZGF0YS1pZD1cIiR7dGhpcy5pc0NvbGxlY3Rpb25QYWdlID8gcmVzLmlkIDogXCJcIn1cIlxuICAgICAgICAgICAgICAgICAgQGNsaWNrPSR7dGhpcy5fb25Db2xsZWN0aW9uQ2xpY2tlZH1cbiAgICAgICAgICAgICAgICA+PC9kYW1zLWNvbGxlY3Rpb24tY2FyZD5cbiAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzaWRlLWltYWdlICR7dGhpcy5pc0NvbGxlY3Rpb25QYWdlID8gXCJuby1mbGV4XCIgOiBcIlwifVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmlnaHQtaW1hZ2UtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGEgaHJlZj1cIiR7dGhpcy5yaWdodEl0ZW1MaW5rfVwiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBjbGFzcz1cInJpZ2h0LWltYWdlXCJcbiAgICAgICAgICAgICAgP2hpZGRlbj0ke3RoaXMucmVzdWx0cy5sZW5ndGggPCAxMiB8fCB0aGlzLmlzQ29sbGVjdGlvblBhZ2V9XG4gICAgICAgICAgICAgIHNyYz1cIiR7dGhpcy5yaWdodEltZ1VybH1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdG9yLWluZm8tbGFiZWxcIj5cbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvaW1hZ2VzL3dhdGVyY29sb3JzL0xhYmVsLVdhdGVyY29sb3ItQmx1ZV92Mi5wbmdcIiBhbHQ9XCJsYWJlbCBiYWNrZ3JvdW5kXCIvPlxuICAgICAgICAgICAgICA8aDU+JHt0aGlzLnJpZ2h0TGFiZWx9PC9oNT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJmb290ZXItZG90cyAke3RoaXMuaXNDb2xsZWN0aW9uUGFnZSA/ICdjb2xsZWN0aW9uJyA6ICcnfVwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHRzLWZvb3RlclwiPlxuICAgICAgXG4gICAgICA8dWNkLXRoZW1lLXBhZ2luYXRpb25cbiAgICAgICAgP2hpZGRlbj1cIiR7dGhpcy50b3RhbFBhZ2VzIDwgMiAmJiAhdGhpcy5zZWxlY3RlZExldHRlcn1cIlxuICAgICAgICBjdXJyZW50LXBhZ2U9JHt0aGlzLmN1cnJlbnRQYWdlfVxuICAgICAgICBtYXgtcGFnZXM9JHt0aGlzLnRvdGFsUGFnZXN9XG4gICAgICAgIEBwYWdlLWNoYW5nZT0ke3RoaXMuX29uUGFnZUNsaWNrZWR9XG4gICAgICAgIHhzLXNjcmVlblxuICAgICAgICBlbGxpcHNlcz5cbiAgICAgIDwvdWNkLXRoZW1lLXBhZ2luYXRpb24+XG4gICAgPC9kaXY+XG4gIGA7XG59XG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0JztcblxuLyoqXG4gKiBAY2xhc3MgU2hhcmVkSHRtbFxuICogQGRlc2NyaXB0aW9uIExpdCBodG1sIHRlbXBsYXRlIHN0cmluZ3MgdXNlZCBhY3Jvc3MgdGhlIHNpdGUuXG4gKiBEZXNpZ25lZCB0byBiZSB1c2VkIHdpdGggREFNUyBzaGFyZWQgc3R5bGVzLCBzbyBtYWtlIHN1cmUgeW91IGltcG9ydCB0aG9zZSBpbnRvIHlvdXIgZWxlbWVudFxuICovXG5jbGFzcyBTaGFyZWRIdG1sIHtcblxuICAvKipcbiAgICogQG1ldGhvZCBoZWFkZXJEb3RzXG4gICAqIEBkZXNjcmlwdGlvbiBEaXNwbGF5cyB0aGUgeWVsbG93IGRvdHMgYmVuZWF0aCBhIHNlY3Rpb24gaGVhZGVyXG4gICAqIEByZXR1cm5zIHtUZW1wbGF0ZVJlc3VsdH1cbiAgICovXG4gIGhlYWRlckRvdHMoKXtcbiAgICByZXR1cm4gaHRtbGBcbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItZG90c1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG90XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkb3RcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG90XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkb3RcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBuZXcgU2hhcmVkSHRtbCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==