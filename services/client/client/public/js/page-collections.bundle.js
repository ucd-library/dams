"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["page-collections"],{

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

/***/ "./public/elements/components/citation.js":
/*!************************************************!*\
  !*** ./public/elements/components/citation.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Citation": () => (/* binding */ Citation)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _citation_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./citation.tpl.js */ "./public/elements/components/citation.tpl.js");
/* harmony import */ var _lib_models_CitationsModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/models/CitationsModel */ "./public/lib/models/CitationsModel/index.js");
/* harmony import */ var _utils_app_toast_popup_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/app-toast-popup.js */ "./public/elements/utils/app-toast-popup.js");







/**
 * @class Citation
 * @description Styleized UI component for Citations
 */
class Citation extends lit__WEBPACK_IMPORTED_MODULE_0__.LitElement {
  static get properties() {
    return {
      // count : {type : String},
      // choices: { type : Array },
      record: {type : Object},
      recordId: {type : String},
      citations : {type : Array},
      selectedCitation : {type : Object},
      citationTypeLabel : {type : String, attribute : 'citation-type-label'}
    };
  }

  constructor() {
    super();
    this.render = _citation_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.active = true;
    
    this.record = {};
    this.recordId = '';
    this.citations = [];
    this.selectedCitation = {};
    this.citationTypeLabel = 'Collection';
    
  }

  async updated() {
    if( !Object.keys(this.record || {}).length || ( this.citations.length && this.recordId === this.record['@id']) ) return;

    this.recordId = this.record['@id'];
    let newCitations = [];

    newCitations.push({
      type : 'mla',
      text : await _lib_models_CitationsModel__WEBPACK_IMPORTED_MODULE_2__["default"].renderEsRecord(this.record, 'mla')
    });
    newCitations.push({
      type : 'apa',
      text : await _lib_models_CitationsModel__WEBPACK_IMPORTED_MODULE_2__["default"].renderEsRecord(this.record, 'apa')
    });
    newCitations.push({
      type : 'chicago',
      text : await _lib_models_CitationsModel__WEBPACK_IMPORTED_MODULE_2__["default"].renderEsRecord(this.record, 'chicago')
    });

    this.citations = newCitations;
    this.selectedCitation = newCitations.filter(c => c.type === 'apa')[0];
  }

  _citeChange(e) {
    this.selectedCitation = this.citations.filter(c => c.type === e.target.value)[0];
  }

  async _copyCiteText(e) {
    try {
      await navigator.clipboard.writeText(this.shadowRoot.querySelector('.csl-entry').innerHTML);
      let toastPopup = this.shadowRoot.querySelector('app-toast-popup');
      if( toastPopup ) toastPopup.showPopup();
    } catch (err) {
      this.logger.error('Failed to copy citation: ', err);
    }
  }

}

customElements.define('app-citation', Citation);


/***/ }),

/***/ "./public/elements/components/citation.tpl.js":
/*!****************************************************!*\
  !*** ./public/elements/components/citation.tpl.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var lit_directives_unsafe_html_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit/directives/unsafe-html.js */ "./public/node_modules/lit/directives/unsafe-html.js");
/* harmony import */ var _utils_shared_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/shared-html */ "./public/elements/utils/shared-html.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/shared-styles */ "./public/elements/styles/shared-styles.js");
/* harmony import */ var _ucd_lib_theme_sass_1_base_html_links_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ucd-lib/theme-sass/1_base_html/_links.css */ "./public/node_modules/@ucd-lib/theme-sass/1_base_html/_links.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_buttons_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_buttons.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_buttons.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_headings_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_headings.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_headings.css.js");




// import sharedStylesCss from "../styles/shared-styles";


// import { classMap } from 'lit/directives/class-map';
// import { styleMap } from 'lit/directives/style-map';





function render() { 
return lit__WEBPACK_IMPORTED_MODULE_0__.html`
<style>
  ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_3__.sharedStyles}
  ${_ucd_lib_theme_sass_1_base_html_links_css__WEBPACK_IMPORTED_MODULE_4__["default"]}
  ${_ucd_lib_theme_sass_2_base_class_buttons_css__WEBPACK_IMPORTED_MODULE_5__["default"]}
  ${_ucd_lib_theme_sass_2_base_class_headings_css__WEBPACK_IMPORTED_MODULE_6__["default"]}
  
  :host {
    display: block;
    position: relative;
    background-color: var(--super-light-background-color);
  }

  .citation {
      background-color: var(--color-aggie-blue-30);
      display: flex;
      width: 100vw;
    }

    .citation .btn-copy {
      background-color: var(--color-aggie-gold);
      cursor: pointer;
      border: none;
      min-height: 1.4rem;
      height: 1.4rem;
    }

    .citation .btn-copy:hover {
      background-color: var(--color-aggie-blue);
      color: var(--color-aggie-gold);
    }

    .citation .btn-apa {
      background-color: var(--color-aggie-blue-50);
      margin-right: .5rem;
      min-width: 8ch;
      font-size: 1rem;

      /* arrow styles */
      display: inline-block;
      margin: 0;      
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-appearance: none;
      -moz-appearance: none;      
      background-image:
        linear-gradient(45deg, transparent 50%, var(--color-aggie-blue) 50%),
        linear-gradient(135deg, var(--color-aggie-blue) 50%, transparent 50%),
        linear-gradient(to right, #ccc, #ccc);
      background-position:
        calc(100% - 20px) calc(1em + 2px),
        calc(100% - 15px) calc(1em + 2px),
        calc(100% - 2.5em) 0.5em;
      background-position-y: center;
      background-size:
        5px 5px,
        5px 5px,
        1px 1.5em;
      background-repeat: no-repeat;
      outline: 0;
      padding-right: 1.5rem;
      margin-right: .7rem;
      text-align: left;
    }

    .cite-graphic {
      margin: auto;
      width: 33%;
      margin-top: 1rem;
    }

    .citation .header-dots {
      margin: 0;
      align-items: start;
      padding-bottom: 1.25rem;
      padding-top: .25rem;
    }

    .cite-collection {
      margin: auto;
      width: 67%;
      padding: 2rem;
      overflow-wrap: break-word;
    }

    .cite-collection h2,
    .collection-highlights h2 {
      margin-bottom: 1rem;
      font-weight: 600;
      color: var(--default-primary-color);
      margin-top: 0.5rem;
    }

    .cite-collection p {
      margin-bottom: 3rem;
      margin-top: 0;
    }

    @media (max-width: 756px) {
      .cite-collection {
        width: 85%;
      }
    }

    @media (max-width: 600px) {
      .citation {
        display: block;
        padding: 2rem 0;
      }

      .cite-graphic {
        width: 70%;
      }

      .cite-collection {
        /* padding-top: 0; */
        width: 95%;
        padding: 1rem;
      }

      .cite-collection h2 { 
        font-weight: 800;
        font-size: 1.7rem;
      }

      .citation-text {
        font-size: 1.1rem;
        line-height: 1.7;
      }
    }

</style>
<div class="citation">
  <div class="cite-graphic">
    <img src="/images/watercolors/citation-watercolor-800px-landscape.png" width="100%" alt="cite this collection image" />
  </div>
  <div class="cite-collection">
    <h2>Cite This ${this.citationTypeLabel}</h2>

    ${ _utils_shared_html__WEBPACK_IMPORTED_MODULE_2__["default"].headerDots() }

    <p class="citation-text">
      ${(0,lit_directives_unsafe_html_js__WEBPACK_IMPORTED_MODULE_1__.unsafeHTML)(this.selectedCitation.text)}
    </p>

    <div style="display: flex;">
      <select class="btn btn-apa" @change="${this._citeChange}">
        <option value="apa">APA</option>
        <option value="mla">MLA</option>
        <option value="chicago">Chicago</option>
      </select>
      <div class="btn btn-copy" @click="${this._copyCiteText}">Copy Text</div>
    </div>
  </div>
  <app-toast-popup></app-toast-popup>
</div>
`;}


/***/ }),

/***/ "./public/elements/components/modal-overlay.js":
/*!*****************************************************!*\
  !*** ./public/elements/components/modal-overlay.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalOverlay": () => (/* binding */ ModalOverlay)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _modal_overlay_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal-overlay.tpl.js */ "./public/elements/components/modal-overlay.tpl.js");
/* harmony import */ var _ucd_lib_theme_elements_ucdlib_ucdlib_icon_ucdlib_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon */ "./public/node_modules/@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon.js");
/* harmony import */ var _utils_app_icons_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/app-icons.js */ "./public/elements/utils/app-icons.js");







/**
 * @class ModalOverlay
 * @description modal overlay component
 */
class ModalOverlay extends lit__WEBPACK_IMPORTED_MODULE_0__.LitElement {

  static get properties() {
    return {
      title : { type : String },
      content : { type : String },
    };
  }

  constructor() {
    super();
    this.render = _modal_overlay_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);

    this.title = '';
    this.content = '';

    window.addEventListener('keydown', (e) => {
      if( !this.visible ) return;

      if( e.key === 'Escape' || e.key === 'Esc') {
        e.stopPropagation();
        this._onOk();
      }
    });
  }

  /**
   * @method _onOk
   * @description dismiss modal
   *
   */
  _onOk(e) {
    this.dispatchEvent(
      new CustomEvent('ok', {})
    );
  }
}

customElements.define('app-modal-overlay', ModalOverlay);


/***/ }),

/***/ "./public/elements/components/modal-overlay.tpl.js":
/*!*********************************************************!*\
  !*** ./public/elements/components/modal-overlay.tpl.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var lit_directives_unsafe_html_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit/directives/unsafe-html.js */ "./public/node_modules/lit/directives/unsafe-html.js");
/* harmony import */ var lit_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lit/directives/if-defined.js */ "./public/node_modules/lit/directives/if-defined.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/shared-styles */ "./public/elements/styles/shared-styles.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_buttons_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_buttons.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_buttons.css.js");







function render() {
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <style>
      ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_3__.sharedStyles}
      ${_ucd_lib_theme_sass_2_base_class_buttons_css__WEBPACK_IMPORTED_MODULE_4__["default"]}

      :host {
        display: block;
      }

      [hidden] {
        display: none !important;
      }

      .container {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
      }

      .container.error-mode .overlay {
        background-color: var(--color-double-decker);
      }

      .container.error-mode .overlay h4,
      .container.error-mode .overlay p,
      .container.error-mode .overlay a {
        color: white;
      }

      .container.error-mode .overlay .header-section ucdlib-icon {
        fill: white;
      }

      .overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 2rem;
        justify-content: center;
        align-items: center;
        width: 60%;
        margin: auto;
        max-width: 650px;
        background-color: white;
        border-radius: 25px;
      }

      .overlay h4 {
        padding: 0;
        margin: 0;
      }

      .overlay .header-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1rem;
        border-bottom: 4px dotted var(--color-aggie-gold);
      }

      .overlay .header-section h4 {
        flex-grow: 1;
        margin: 0;
      }

      .overlay .header-section ucdlib-icon {
        flex-shrink: 0;
        cursor: pointer;
        fill: var(--color-aggie-blue-80);
        width: 1.5rem;
        height: 1.5rem;
      }

      .overlay .header-section ucdlib-icon:hover {
        fill: var(--color-aggie-gold);
      }

      .overlay .footer-section {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 1rem;
      }

      .overlay .footer-buttons button {
        font-size: .9rem;
        margin-left: .6rem;
      }

      .footer-buttons a.btn--primary {
        padding-top: 0;
        padding-bottom: 0;
        margin-left: 0.5rem;
        font-size: .9rem;
      }

      button.ok {
        padding-left: 1rem;
      }

      @media (max-width: 600px) {
        .overlay .footer-section {
          display: block;
        }

        .overlay .footer-section .footer-buttons {
          display: flex;
          flex-direction: column-reverse;
        }

        .overlay .footer-buttons button {
          margin-left: 0;
          display: block;
          width: 100%;
          margin-top: 1rem;
        }

        .btn--primary:before,
        .btn--invert:before {
          padding-right: .3rem;
        }
      }

      input[type="checkbox"] {
        height: 1rem;
        width: 1rem;
      }
    </style>


    <div class="container">
      <div class="overlay">
        <div class="header-section">
          <h4>${this.title}</h4>
          <div><ucdlib-icon icon="ucdlib-dams:fa-xmark" @click="${this._onOk}"></ucdlib-icon></div>
        </div>
        <div class="body-section">
          ${(0,lit_directives_unsafe_html_js__WEBPACK_IMPORTED_MODULE_1__.unsafeHTML)(this.content)}
        </div>
        <div class="footer-section">
          <div class="footer-buttons">
            <button class="btn btn--primary ok" @click="${this._onOk}">Got it!</button>
          </div>
        </div>
      </div>
    </div>
  `;
}


/***/ }),

/***/ "./public/elements/pages/collection/app-collection.js":
/*!************************************************************!*\
  !*** ./public/elements/pages/collection/app-collection.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_collection_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-collection.tpl.js */ "./public/elements/pages/collection/app-collection.tpl.js");
/* harmony import */ var _ucd_lib_theme_elements_utils_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/theme-elements/utils/mixins */ "./public/node_modules/@ucd-lib/theme-elements/utils/mixins/index.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _ucd_lib_theme_elements_ucdlib_ucdlib_icon_ucdlib_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon */ "./public/node_modules/@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon.js");
/* harmony import */ var _ucd_lib_theme_elements_brand_ucd_theme_slim_select_ucd_theme_slim_select_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ucd-lib/theme-elements/brand/ucd-theme-slim-select/ucd-theme-slim-select.js */ "./public/node_modules/@ucd-lib/theme-elements/brand/ucd-theme-slim-select/ucd-theme-slim-select.js");
/* harmony import */ var _components_cards_dams_item_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/cards/dams-item-card */ "./public/elements/components/cards/dams-item-card.js");
/* harmony import */ var _components_citation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/citation */ "./public/elements/components/citation.js");
/* harmony import */ var _components_modal_overlay_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/modal-overlay.js */ "./public/elements/components/modal-overlay.js");
/* harmony import */ var _lib_utils_user_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../lib/utils/user.js */ "./public/lib/utils/user.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../lib/utils/index.js */ "./public/lib/utils/index.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_10__);
















class AppCollection extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_theme_elements_utils_mixins__WEBPACK_IMPORTED_MODULE_2__.MainDomElement, _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__.LitCorkUtils) {

  static get properties() {
    return {
      collectionId : { type : String },
      // adminRendered : { type : Boolean },
      description : { type : String },
      title : { type : String },
      thumbnailUrl : { type : String },
      thumbnailUrlOverride : { type : String },
      callNumber : { type : String },
      subjects : { type : Array },
      material : { type : String },
      languages : { type : Array },
      location : { type : String },
      items : { type : Number },
      publishedDateRange : { type : String },
      highlightedItems : { type : Array },
      savedItems : { type : Array },
      dbsync : { type : Object },
      watercolor : { type : String },
      watercolorBgUrl : { type : String },
      watercolorFgUrl : { type : String },
      displayData : { type : Array },
      // isAdmin : { type : Boolean },
      isUiAdmin : { type : Boolean },
      editMode : { type : Boolean },
      itemCount : { type : Number },
      collectionSearchHref : {type: String},
      citationRoot : { type: Object },
      itemDefaultDisplay : { type: String },
      itemEdits : { type: Array },
      showDisclaimer : { type: Boolean },
      showModal : { type: Boolean },
      modalTitle : { type: String },
      modalContent : { type: String },
    };
  }

  constructor() {
    super();
    this.render = _app_collection_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.active = true;

    this.appDataLoaded = false;
    this.reset();

    this._injectModel('AppStateModel', 'CollectionModel', 'RecordModel', 'FcAppConfigModel', 'SeoModel');
  }

  async firstUpdated() {
    this._onAppStateUpdate(await this.AppStateModel.get());
    // this._onCollectionUpdate(await this.CollectionModel.get(this.AppStateModel.location.pathname));

    this._updateSlimStyles();
  }

  /**
   * @method _onAppStateUpdate
   * @description on the App update, the state is determined and by checking
   * the location
   *
   * @param {Object} e
   */
   async _onAppStateUpdate(e) {
    if( this.AppStateModel.location.page !== 'collection' ) {
      this.reset();
      return;
    }
    if( this.collectionId === e.location.pathname ) return;
    this.reset();

    this._updateSlimStyles();
    this.collectionId = e.location.pathname;

    try {
      let recordData = await this.CollectionModel.get(this.collectionId);
      this.onCollectionUpdate(recordData);
    } catch(e) {
      this.dispatchEvent(
        new CustomEvent("show-404", {})
      );
    }

    this.showModal = false;
    // if page path has '?from=v1', show modal with warning of url changes in new site
    if( this.AppStateModel.location.fullpath.includes('?from=v1') ) {
      this.showModal = true;
    }    
  }

  _onModalClose(e) {
    this.AppStateModel.setLocation(this.collectionId);
    this.showModal = false
  }

  /**
   * @method onCollectionUpdate
   * @description fired when collection updates
   *
   * @param {Object} e
   */
   async onCollectionUpdate(e) {
    if( this.AppStateModel.location.page !== 'collection' ) return;

    // TODO: make proper 404
    if( e.state === 'error' && e.error.details.message === 'null body response from service' ) {
      // this.dispatchEvent(
      //   new CustomEvent("show-404", {})
      // );
      window.location.href = '/';
      return;
    }

    if( e.state !== 'loaded' ) return;
    
    await this._parseDisplayData();
    let searchObj = this.RecordModel.emptySearchDocument();
    this.RecordModel.appendKeywordFilter(searchObj, '@graph.isPartOf.@id', e.vcData.id);
    this.collectionSearchHref = '/search/'+this.RecordModel.searchDocumentToUrl(searchObj);

    this.collectionId = e.vcData.id;

    this.description = e.vcData.description
    this.title = e.vcData.title;

    if( !this.thumbnailUrlOverride ) {
      this.thumbnailUrl = e.vcData.images?.medium?.url || e.vcData.images?.original?.url || '';
    }
    if( !this.thumbnailUrl ) {
      this.thumbnailUrl = '/images/tree-bike-illustration.png';
    }

    if( !this.watercolor ) {
      this.watercolor = 'rose';
      this.watercolorBgUrl = '/images/watercolors/collection-watercolor-' + this.watercolor + '-back-white.jpg';
      this.watercolorFgUrl = '/images/watercolors/collection-watercolor-' + this.watercolor + '-front.png';  
    }

    // set background image
    let featuredImageElement = document.querySelector('.featured-image');
    if( featuredImageElement && this.thumbnailUrlOverride ) {
      let img = new Image();
      img.src = this.thumbnailUrlOverride;
      img.onload = function() {
        featuredImageElement.style.backgroundImage = `url(${this.src})`;
      };
    } else if ( featuredImageElement ) {
      featuredImageElement.style.backgroundImage = `url(${this.thumbnailUrl})`;
    }

    let root = e.payload.root || {};
    this.callNumber = e.vcData.callNumber;
    this.subjects = (e.vcData.subjects || []);
    this.material = root.material || '';
    this.languages = !Array.isArray(root.language || []) ? [root.language] : root.language;
    this.location = root.location || '';
    this.items = _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_10___default().formatNumberWithCommas(e.vcData.count);
    this.publishedDateRange = e.vcData.publishedDateRange;

    this.citationRoot = root;

    if( this.appDataLoaded && !this.savedItems.length ) {
      this.getLatestItems();
    } else if( this.savedItems.length ) {
      this.highlightedItems = this.savedItems;
    }

    this._updateDisplayData();
  }

  async getLatestItems() {
    if( this.loadingLatestItems || this.highlightedItems.length ) return;

    this.loadingLatestItems = true;
    // default to most recent items by year published descending
    let highlightedItems = await this.RecordModel.getRecentItems(this.collectionId, this.itemCount);
    if( highlightedItems.response.ok && highlightedItems.body.results.length ) {
      this.highlightedItems = highlightedItems.body.results.map((item, index) => {
        return {
          '@id' : item['@graph'][0]['@id'],
          description : item['@graph'][0].name,
          position : index+1,
          image : item['@graph'][0].thumbnailUrl
        };
      });
    }
    this.loadingLatestItems = false;
  }

  reset() {
    this.collectionId = '';
    // this.adminRendered = false;
    this.description = '';
    this.title = '';
    this.thumbnailUrl = '';
    this.thumbnailUrlOverride = '';
    this.callNumber = '';
    this.subjects = [];
    this.material = '';
    this.languages = [];
    this.location = '';
    this.items = 0;
    this.publishedDateRange = '';
    this.highlightedItems = [];
    this.savedItems = [];
    this.dbsync = {};
    this.watercolor = '';
    this.watercolorBgUrl = '';
    this.watercolorFgUrl = '';
    this.displayData = [];
    // this.isAdmin = user.hasRole('admin');
    this.isUiAdmin = _lib_utils_user_js__WEBPACK_IMPORTED_MODULE_9__["default"].canEditUi();
    this.editMode = false;
    this.itemCount = 6;
    this.citationRoot = {};
    this.itemDefaultDisplay = (_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_10___default().itemDisplayType.brTwoPage); // one, list.. for admin pref on BR display type for items in this collection
    this.itemEdits = [];
    this.showDisclaimer = false;
    this.showModal = false;
    this.modalTitle = 'Welcome to the new Digital Collections!';
    this.modalContent = `<p>We've recently updated this website, so some webpage addresses (URLs) may have changed. Please search within this collection for the item you're looking for.</p> <p>We apologize for the inconvenience.</p>`;

    let featuredImageElement = document.querySelector('.featured-image');
    if( featuredImageElement ) featuredImageElement.style.backgroundImage = '';
    if( document.querySelector('#file-upload')?.value ) document.querySelector('#file-upload').value = '';
  }

  _onItemDisplayChange(e) {
    this.itemCount = parseInt(e.detail.value);

    let itemInputs = this._getHighlightedItemInputs();
    itemInputs.forEach((input, index) => {
      if( index+1 > this.itemCount ) {
        input.value = '';
      } else {
        let item = this.savedItems[index];
        if( item ) {
          input.value = item['@id'].replace(/^\/item\//, '');
        }
      }
    });

    requestAnimationFrame(() => {
      this._ssSelectBlur();
      this._updateSlimStyles();
      this._updateDisplayData();  
    });
  }

  _getHighlightedItemInputs() {
    // parse to inputs for the selcted item count: 0, 1, 2, 3, 6
    let itemInputs;
    if( this.itemCount === 1 ) {
      itemInputs = document.querySelectorAll('.card-single .item-ark-input');
    } else if( this.itemCount === 2 ) {
      itemInputs = document.querySelectorAll('.card-2 .item-ark-input');
    } else {
      itemInputs = document.querySelectorAll('.card-trio .item-ark-input');
    }

    return itemInputs;
  }

  /**
   * @method _onEditClicked
   * @description admin ui, edit button click event
   *
   * @param {Object} e
   */
  _onEditClicked(e) {
    if( !this.isUiAdmin ) return;
    this._updateSlimStyles();
    this.editMode = true;
  }

  /**
   * @method _onSaveClicked
   * @description admin ui, save button click event
   *
   * @param {Object} e
   */
  async _onSaveClicked(e) {
    if( !this.isUiAdmin ) return;

    this.editMode = false;

    // parse highlighted items
    this.savedItems = [];
    let newSavedItems = [];
    let itemArkRegex = /^\/?(item\/)?(ark:\/)?/;

    let itemInputs = this._getHighlightedItemInputs();

    itemInputs.forEach((input, index) => {
      if( input.value ) {
        let val = input.value.trim();
        newSavedItems.push({
          '@id' : `/item/ark:/${val.replace(itemArkRegex, '')}`,
          position : index+1
        });
      }
    });
    this.savedItems = [...newSavedItems];

    let featuredImage = '';
    let fileElement = document.querySelector('#file-upload');
    if( fileElement?.files?.length ) {
      featuredImage = fileElement.files[0];
    }
    this._updateDisplayData(featuredImage);


    await this.FcAppConfigModel.saveCollectionDisplayData(this.collectionId, this.displayData);
    if( fileElement && featuredImage ) {
      await this.FcAppConfigModel.saveCollectionFeaturedImage(this.collectionId, featuredImage);
      fileElement.value = '';
    }

    // parse checked item exceptions to reset them to collection default display type
    let itemExceptions = [];
    let checkboxes = this.querySelectorAll('.exceptions input[name="checkbox"]');
    checkboxes.forEach(checkbox => {
      if( !checkbox.checked ) return;

      let itemId = checkbox.dataset.itemId;
      if( itemId ) itemExceptions.push(itemId);
    });

    if( itemExceptions.length ) {
      await this.FcAppConfigModel.updateItemDisplayExceptions(itemExceptions, this.itemDefaultDisplay);
    }

    this.AppStateModel.setLocation(this.collectionId);
    // this._parseDisplayData();
    
    // refresh this.highlightedItems
    this.highlightedItems = [];
    if( this.savedItems.length ) {
      this.highlightedItems = this.savedItems;
    } else {
      this.getLatestItems();
    }
 
    this.requestUpdate();
  }

  /**
   * @method _onCancelEditClicked
   * @description admin ui, cancel editing button click event
   *
   * @param {Object} e
   */
  _onCancelEditClicked(e) {
    if( !this.isUiAdmin ) return;
    this.editMode = false;
    document.querySelector('#file-upload').value = '';
  }

  /**
   * @method _onWatercolorChanged
   * @description admin ui, change to featured image watercolor
   *
   * @param {Object} e
   */
  _onWatercolorChanged(e) {
    if( !this.isUiAdmin ) return;
    this.watercolor = e.target.classList[0];
    this.watercolorBgUrl = '/images/watercolors/collection-watercolor-' + this.watercolor + '-back-white.jpg';
    this.watercolorFgUrl = '/images/watercolors/collection-watercolor-' + this.watercolor + '-front.png';

    this._updateDisplayData();
  }

  /**
   * @method _onDisclaimerToggle
   * @description admin ui, change to show/hide disclaimer for this collection
   */
  _onDisclaimerToggle(e) {
    if( !this.isUiAdmin ) return;
    
    this.showDisclaimer = e.currentTarget.checked;
    // this.displayData.showDisclaimer = e.currentTarget.checked;
    this._updateDisplayData();
  }

  /**
   * @method _onSelectAllExceptionsChange
   * @description admin ui, change to 'select all exceptions' checkbox
   *
   * @param {Object} e
   */
  _onSelectAllExceptionsChange(e) {
    let checked = e.currentTarget.checked;
    if( !checked ) return;

    let checkboxes = this.querySelectorAll('.exceptions input[name="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = true;
    });
  }

  /**
   * @description _parseDisplayData, get application container data to set collection specific display data (watercolors, highlighted items, featured image)
   */
  async _parseDisplayData() {
    if( !this.collectionId ) return;

    let edits;
    try {
      edits = await this.CollectionModel.getCollectionEdits(this.collectionId);
    } catch (error) {
      this.logger.warn('Error retrieving collection edits', error);
    }

    if( edits.state !== 'loaded' ) return;
    if( !Object.keys(edits.payload).length ) return;

    let collectionEdits = edits.payload?.collection || {};
    let itemEdits = edits.payload?.items || {};

    // set collection prefs
    this.watercolor = collectionEdits.watercolors?.css || 'rose';
    this.watercolorBgUrl = '/images/watercolors/collection-watercolor-' + this.watercolor + '-back-white.jpg';
    this.watercolorFgUrl = '/images/watercolors/collection-watercolor-' + this.watercolor + '-front.png';

    this.thumbnailUrlOverride = collectionEdits.thumbnailUrl?.['@id'] || '';
    if( this.thumbnailUrlOverride ) {
      // remove domain
      let url = new URL(this.thumbnailUrlOverride);
      this.thumbnailUrlOverride = url?.pathname;
    }

    this.itemCount = typeof collectionEdits.itemCount === 'number' ? collectionEdits.itemCount : 6;

    this.itemDefaultDisplay = collectionEdits.itemDefaultDisplay || (_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_10___default().itemDisplayType.brTwoPage);

    this.showDisclaimer = collectionEdits.showDisclaimer || false;

    this.savedItems = collectionEdits.exampleOfWork || [];
    if( !Array.isArray(this.savedItems) ) this.savedItems = [this.savedItems];
    this.savedItems.sort((a,b) => a.position - b.position);

    // set item prefs
    this.itemEdits = Object.entries(itemEdits).map(
      ([key, value]) => ({ id: key, linkLabel: key.split('/').pop(), defaultDisplay: value.itemDefaultDisplay })
    ).filter(item => item.defaultDisplay && item.defaultDisplay !== this.itemDefaultDisplay);

    // hack for radios occasionally not being selected, styles coming from brand css
    if( this.itemDefaultDisplay === (_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_10___default().itemDisplayType.brTwoPage) ) this.querySelector('#two').checked = true;
    if( this.itemDefaultDisplay === (_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_10___default().itemDisplayType.brOnePage) ) this.querySelector('#one').checked = true;
    if( this.itemDefaultDisplay === (_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_10___default().itemDisplayType.imageList) ) this.querySelector('#list').checked = true;

    this.appDataLoaded = true;
    this._updateDisplayData();
    this.requestUpdate();
  }

  _updateDisplayData(newFileUploadName='') {
    let opts = {
      title : this.title,
      watercolor : this.watercolor,
      itemCount : this.itemCount,
      itemDefaultDisplay : this.itemDefaultDisplay,
      savedItems : this.savedItems,
      newFileUploadName,
      thumbnailUrlOverride : this.thumbnailUrlOverride,
      showDisclaimer : this.showDisclaimer
    };
    this.displayData = this.FcAppConfigModel.getCollectionDisplayData(this.collectionId, opts);
  }

  _updateSlimStyles() {
    let select = this.querySelector('ucd-theme-slim-select');
    if( !select ) return;

    let ssMain = select.shadowRoot.querySelector(".ss-main");
    if (ssMain) {
      ssMain.style.border = 'none';
      ssMain.style.backgroundColor = 'transparent';
    }

    let ssSingle = select.shadowRoot.querySelector(".ss-single-selected");
    if (ssSingle) {
      ssSingle.style.border = "none";
      ssSingle.style.height = "49px";
      ssSingle.style.paddingLeft = "1rem";
      ssSingle.style.backgroundColor = "var(--color-aggie-blue-50)";
      ssSingle.style.borderRadius = '0';
      ssSingle.style.fontWeight = "bold";
      ssSingle.style.color = "var(--color-aggie-blue)";
    }

    let search = select.shadowRoot.querySelector('.ss-search');
    if( search ) {
      search.style.display = "none";
    }
  }

  /**
   * @method _ssSelectFocus
   * @description slim select focus change, color should be gold if active, blue if not
   * @param {Object} e
   */
  _ssSelectFocus(e) {
    let ssMain = e.currentTarget.shadowRoot.querySelector('.ss-main');
    let ssSingleSelected = e.currentTarget.shadowRoot.querySelector('.ss-single-selected');

    if( ssSingleSelected?.classList.value === 'ss-single-selected ss-open-below' ) {
      ssSingleSelected.style.backgroundColor = '#FFF4D2'; // gold-30
      ssMain.style.borderColor = '#FFBF00'; // gold
    } else {
      ssSingleSelected.style.backgroundColor = '#B0D0ED'; // blue-50
      ssMain.style.borderColor = '#B0D0ED'; // blue-50
    }

    let search = this.querySelector('ucd-theme-slim-select')?.shadowRoot.querySelector('.ss-search');
    if( search ) {
      search.style.display = "none";
    }
  }

  /**
   * @method _ssSelectBlur
   * @description slim select focus change, color should be gold if active, blue if not
   * @param {Object} e
   */
  _ssSelectBlur(e) {
    let slimSelect = this.querySelector('.highlight-display-select');
    let ssMain = slimSelect?.shadowRoot?.querySelector('.ss-main');
    let ssSingleSelected = slimSelect?.shadowRoot.querySelector('.ss-single-selected');

    ssSingleSelected.style.backgroundColor = '#B0D0ED'; // blue-50
    ssMain.style.borderColor = '#B0D0ED'; // blue-50
  }

  async _onFileChange(e) {
    let selectedFilename = e.target.value.split('\\').pop();
    if( !selectedFilename.length ) return;


    // replace current thumbnail with new image
    let file = e.target.files[0];
    document.querySelector('.featured-image').style.backgroundImage = 'url('+window.URL.createObjectURL(file)+')';
  }

}

customElements.define('app-collection', AppCollection);


/***/ }),

/***/ "./public/elements/pages/collection/app-collection.tpl.js":
/*!****************************************************************!*\
  !*** ./public/elements/pages/collection/app-collection.tpl.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _ucd_lib_theme_elements_ucdlib_ucdlib_md_ucdlib_md_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ucd-lib/theme-elements/ucdlib/ucdlib-md/ucdlib-md.js */ "./public/node_modules/@ucd-lib/theme-elements/ucdlib/ucdlib-md/ucdlib-md.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/utils/index.js */ "./public/lib/utils/index.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../styles/shared-styles */ "./public/elements/styles/shared-styles.js");
/* harmony import */ var _utils_shared_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/shared-html */ "./public/elements/utils/shared-html.js");
/* harmony import */ var _ucd_lib_theme_sass_1_base_html_links_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ucd-lib/theme-sass/1_base_html/_links.css */ "./public/node_modules/@ucd-lib/theme-sass/1_base_html/_links.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_buttons_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_buttons.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_buttons.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_headings_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_headings.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_headings.css.js");
/* harmony import */ var _ucd_lib_theme_sass_1_base_html_forms_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ucd-lib/theme-sass/1_base_html/_forms.css */ "./public/node_modules/@ucd-lib/theme-sass/1_base_html/_forms.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_forms_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_forms.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_forms.css.js");














function render() { 
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`
  <style>
    ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_3__.sharedStyles}
    ${_ucd_lib_theme_sass_1_base_html_links_css__WEBPACK_IMPORTED_MODULE_5__["default"]}
    ${_ucd_lib_theme_sass_2_base_class_buttons_css__WEBPACK_IMPORTED_MODULE_6__["default"]}
    ${_ucd_lib_theme_sass_2_base_class_headings_css__WEBPACK_IMPORTED_MODULE_7__["default"]}
    ${_ucd_lib_theme_sass_1_base_html_forms_css__WEBPACK_IMPORTED_MODULE_8__["default"]}
    ${_ucd_lib_theme_sass_2_base_class_forms_css__WEBPACK_IMPORTED_MODULE_9__["default"]}

    :host {
      display: block;
      position: relative;
      font-size: .9rem;
      width: 100vw;
    }

    [hidden] { display: none !important; }

    :host > div {
      padding: 0 40px;
    }

    h2 {
      font-weight: 700;
      color: var(--color-aggie-blue);
    }

    h3 {
      font-weight: 700;
    }

    app-collection .title-section {
      display: flex;
      min-height: 42vw;
    }

    app-collection .title-section > div {
      flex: 1;
      padding: 2rem;
      width: 50%;
    }

    app-collection .collection-header {
      margin: auto;
    }

    app-collection .collection-header h1 {
      margin: 0.5rem 0;
    }

    .collection-header h3 {
      margin: 0;
    }

    a.btn--alt {
      padding-top: 0;
      padding-bottom: 0;
      margin-top: 1rem;
      color: white;
    }

    .image-overlay {
      position: relative;
      z-index: 450;
    }

    .watercolor-bg {
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }

    .featured-image {
      z-index: 50;
      top: 17%;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      transform: rotate(356deg);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
      width: 70%;
      overflow: hidden;
      padding-top: 52.5%;
    }

    .watercolor-fg {
      z-index: 100;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }

    .content-warning {
      padding: 2rem;
      margin-top: 2rem;
      background-color: var(--color-aggie-gold-30);
      font-style: italic;
    }

    .disclaimer-admin-toggle {
      margin-top: 2rem;
    }

    .detail-section {
      line-height: 1.7rem;
      width: 60%;
      margin: 0 auto;
    }

    .description {
      margin: 0 0 2rem 0;
    }

    .collection-label {
      font-weight: bold;
      padding-right: 0.3rem;
    }

    .collection-highlights {
      text-align: center;
    }

    .card-2,
    .card-2-4 {
      width: 75%;
      margin: 0 auto;
    }
    .card-single,
    .card-2,
    .card-2-4,
    .card-trio,
    .card-5-plus {
      display: grid;
      grid-template-columns: auto;
      grid-gap: var(--spacing-sm);
    }
    .card-single dams-collection-card,
    .card-2 dams-collection-card,
    .card-2-4 dams-collection-card,
    .card-trio dams-collection-card,
    .card-5-plus dams-collection-card {
      margin-bottom: var(--spacing-default);
    }

    .collection-highlights a.btn--primary {
      color: var(--color-aggie-blue);
      padding-top: .3rem;
      padding-bottom: .3rem;
      margin: 3rem 0 3rem;
      height: 2.4rem;
      min-height: 2.4rem;
    }

    @media (min-width: 767px) {
      .card-2,
      .card-2-4 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .card-single,
      .card-trio,
      .card-5-plus {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .card-single .collection-item,
      .card-single dams-item-card {
        grid-column: 2;
      }
      
      .card-trio {
        margin-right: 0;
        margin-left: 0;
      }
    }

    @media (max-width: 600px) {
      app-collection .title-section {
        display: block;
        overflow-y: -webkit-paged-x;
        padding-top: 3rem;
      }

      app-collection .title-section > div {
        width: 80%;
        margin: auto;
      }
      
      .detail-section {
        width: 80%;
      }

      .citation {
        display: block;
      }

      .cite-graphic,
      .cite-collection {
        width: 80%;
        padding-top: 0;
      }
    }

    .file-upload-container ucdlib-icon {
      display: inline-block;

    }
    
    input[type="file"] {
        display: none;
    }

    .file-upload-label {
      cursor: pointer;
      background-color: var(--color-aggie-blue-80);
      color: white;
      height: 50px;
      border-radius: 1.5rem;
      /* padding: 0 1.5rem; */
      display: inline-block;
      /* align-items: center;
      justify-content: center; */
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      white-space: nowrap;
      min-width: 150px;
    }

    .left-panel {
      display: flex;
    }

    .left-panel .file-upload-label ucdlib-icon {
      height: 50%;
      width: 25px;
      position: relative;
      top: 5%;
      left: -5%;
      fill: var(--color-aggie-gold);
    }

    .left-panel .file-upload-label:hover {
      background-color: var(--color-aggie-blue);
    }

    .left-panel .file-upload-label span {
      position: relative;
      top: 20%;
      right: 20%;
      padding-left: .2rem;
    }

    .selected-file {
      padding: 0 2rem 2rem;
      font-weight: bold;
    }

    .admin-edit .left-panel {
      position: absolute;
      left: 3rem;
      top: calc(170px + 3rem);
      z-index: 500;
    }

    .admin-edit .right-panel {
      position: absolute;
      right: 3rem;
      top: calc(170px + 3rem);
      z-index: 500;
    }

    .admin-edit .icon-wrapper {
      height: 50px;
      width: 50px;
      background-color: var(--color-aggie-blue-70);
      border-radius: 50%;
      display: inline-block;
      margin-left: .3rem;
      cursor: pointer;
    }

    .admin-edit ucdlib-icon {
      fill: white;
      width: 50%;
      height: 50%;
      margin: auto;
      padding-top: 0.6rem;      
    }

    .admin-edit .icon-wrapper.edit {
      background-color: var(--color-aggie-blue);
    }

    .admin-edit .icon-wrapper:hover {
      background-color: var(--color-aggie-blue);
    }

    .admin-edit .icon-wrapper.edit:hover {
      background-color: var(--color-aggie-gold);
    }

    .admin-edit .icon-wrapper.edit:hover ucdlib-icon {
      fill: var(--color-aggie-blue);
    }

    .edit-overlay {
      background: white;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: .55;
      z-index: 400;
    }

    .color-pallette {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 2rem;
      padding: 0 .6rem;
      background-color: var(--color-aggie-blue-30);
      border-radius: 1.5rem;
    }

    .color-circle {
      width: 27px;
      height: 27px;
      border-radius: 50%;
      margin: 0 3px;
      cursor: pointer;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }

    .color-circle:hover {
      border: 3px solid var(--color-aggie-blue-70);
    }

    .color-circle[selected] {
      border: 3px solid var(--color-aggie-blue);
    }

    .edit-collections-container {
      z-index: 500;
      position: relative;
    }

    .edit-collections-container .collection-item {
      position: relative;
    }

    .edit-collections-container .collection-item {
      height: 135px;
      /* width: 401px; */
      background-color: var(--color-aggie-blue-30);
      position: relative;
      margin: 1rem;
    }

    .edit-collections-container .collection-item span {
      display: block;
      text-align: start;
      padding: 1rem 1rem .5rem 1rem;
      font-size: 1rem;
      font-weight: bold;
    }

    .edit-collections-container .collection-item input {
      position: absolute;
      left: 1rem;
      right: 1rem;
      border: none;
      height: 2rem;
      /* padding: 0 .5rem; */
      box-sizing: border-box;
      outline: none;
      font-size: .8rem;

      width: auto;
    }

    .collection-highlights h2, 
    .collection-highlights .header-dots {
      position: relative;
      z-index: 500;
    }

    .collection-highlights h2 {
      margin-bottom: 0;
      margin-top: 4rem;
    }

    .edit-collections-container > fieldset {
      border-top: none;
      padding-top: 0;
      margin-top: 0;
    }

    .edit-collections-container > fieldset span {
      font-weight: bold;
    }

    .list--reset {
      margin: 0;
      padding: 0 0 0 1.25rem;
      padding-left: 0;
      list-style: none;
    }

    .list--reset > li {
      display: inline-block;
      padding-right: .5rem;
    }

    .radio label {
      padding-top: .2rem;
    }

    .radio label:before {
     top: 5px;
     left: -1px;
    }
    
    .default-display {
      background-color: var(--color-aggie-gold-30);
      margin: 1rem;
      padding: 2rem;
    }

    .default-display h3 {
      font-style: italic;
      color: var(--color-aggie-blue);
      text-align: left;
      padding: 0;
      margin-bottom: 1rem;
      margin-top: 0;
    }

    .default-display span.label {
      font-weight: bold;
    }

    .default-item-display {
      text-align: left;
    }

    .exceptions {
      text-align: left;
      padding-left: 1rem;
    }

    .default-item-display .default-item-display-fs {
      border: none; 
      padding-left: 0; 
      padding-top: 0; 
      margin-top: 0;
      padding-bottom: 0;
      margin-bottom: 0; 
      position: relative; 
      left: -0.5rem;
      top: -0.5rem;
    }    

    .exceptions fieldset li,
    .default-item-display fieldset li {
      padding-top: .5rem;
    }

    .exceptions fieldset label,
    .default-item-display fieldset label {
      display: inline-block;
    }

    .exceptions fieldset label {
      font-weight: normal;
      color: inherit;
    }



    .disclaimer-admin-toggle {
      background-color: var(--color-aggie-gold-30);
      /* margin: 1rem; */
      padding: 2rem;
      text-align: left;
      position: relative;
      z-index: 500;
    }

    .disclaimer-admin-toggle .disclaimer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .disclaimer-admin-toggle .disclaimer-header span {
      font-weight: bold;
    }

    .disclaimer-admin-toggle .disclaimer-content {
      font-style: italic;
      line-height: 1.7rem;
    }

    .toggle-switch {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .toggle-button {
      width: 35px;
      height: 13px;
      border-radius: 30px;
      cursor: pointer;
      position: relative;
      background-color: var(--color-black-20);
    }

    .toggle-button::before {
      position: absolute;
      content: '';
      background-color: white;
      width: 22px;
      height: 22px;
      border-radius: 22px;
      margin-top: -2px;
      transition: 0.3s ease-in-out;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }

    .toggle-switch input:checked + .toggle-button {
      background-color: var(--color-aggie-blue-60);
    }
    .toggle-switch input:checked + .toggle-button::before {
      transform: translateX(.8rem);
      background-color: var(--color-aggie-blue-80);
    }
    .toggle-switch input {
      display: none;
    }

    .highlight-display-select {
      display: inline-block;
      margin-left: 1rem;
      min-width: 3.5rem;
    }
  </style>
    <app-modal-overlay
      ?hidden="${!this.showModal}"
      .title="${this.modalTitle}"
      .content="${this.modalContent}"
      @ok=${this._onModalClose}>
    </app-modal-overlay>
    <div class="edit-overlay" ?hidden="${!this.editMode || !this.isUiAdmin}">
    </div>
    <div class="admin-edit" ?hidden="${!this.isUiAdmin}">
      <div class="left-panel">
        <div class="file-upload-container" ?hidden="${!this.editMode || !this.isUiAdmin}">            
          <label for="file-upload" class="file-upload-label">
            <ucdlib-icon icon="ucdlib-dams:fa-plus"></ucdlib-icon>
            <span>New Image</span> 
          </label>
          <input id="file-upload" type="file" accept="image/jpeg" @change="${this._onFileChange}" />
        </div>  

        <div class="color-pallette" ?hidden="${!this.editMode || !this.isUiAdmin}">
          <div class="rose color-circle" ?selected="${this.watercolor === 'rose'}" style="background-color: var(--color-rose)" @click="${this._onWatercolorChanged}"></div>
          <div class="gold color-circle" ?selected="${this.watercolor === 'gold'}" style="background-color: var(--color-aggie-gold)" @click="${this._onWatercolorChanged}"></div>
          <div class="sage color-circle" ?selected="${this.watercolor === 'sage'}" style="background-color: var(--color-farmers-market)" @click="${this._onWatercolorChanged}"></div>
          <div class="arboretum color-circle" ?selected="${this.watercolor === 'arboretum'}" style="background-color: var(--color-arboretum)" @click="${this._onWatercolorChanged}"></div>
          <div class="tahoe color-circle" ?selected="${this.watercolor === 'tahoe'}" style="background-color: var(--color-tahoe)" @click="${this._onWatercolorChanged}"></div>
          <div class="thiebaud-icing color-circle" ?selected="${this.watercolor === 'thiebaud-icing'}" style="background-color: var(--color-thiebaud-icing)" @click="${this._onWatercolorChanged}"></div>
        </div>
      </div>

      <div class="right-panel">
        <div class="icon-wrapper" ?hidden="${this.editMode || !this.isUiAdmin}" @click="${this._onEditClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-pen"></ucdlib-icon>
        </div>
        <div class="icon-wrapper edit" ?hidden="${!this.editMode || !this.isUiAdmin}" @click="${this._onSaveClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-floppy-disk"></ucdlib-icon>
        </div>
        <div class="icon-wrapper edit" ?hidden="${!this.editMode || !this.isUiAdmin}" @click="${this._onCancelEditClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-xmark"></ucdlib-icon>
        </div>
      </div>
    </div>

    <div class="title-section">
      <div class="image-overlay">
        <img ?hidden="${!this.watercolorBgUrl}" class="watercolor-bg" src="${this.watercolorBgUrl}" width="100%" />

        <div class="featured-image"></div>
        <img ?hidden="${!this.watercolorFgUrl}" class="watercolor-fg" src="${this.watercolorFgUrl}" width="100%" />
      </div>
      <div class="collection-header">
        
        <h1>${this.title}</h1>
        <h3 ?hidden="${!this.callNumber}">Collection ${this.callNumber}</h3>
        <a href="${this.collectionSearchHref}" class="btn--alt btn--round">View ${this.items} item${this.items == 1 ? '' : 's'}</a>
      </div>
    </div>

    <div class="detail-section">

      <p class="description">
      <ucdlib-md id="md">
        <ucdlib-md-content>
          ${this.description}
        </ucdlib-md-content>
      </ucdlib-md>
      </p>

      <div style="margin-bottom: .4rem;" ?hidden="${!this.publishedDateRange}">
        <span class="collection-label">Coverage: </span> ${this.publishedDateRange}
      </div>
      <div style="margin-bottom: .4rem;" ?hidden="${!this.subjects?.length}">
        <span class="collection-label">Subjects: </span> 
          ${this.subjects.map(
            (about, index) =>
              lit__WEBPACK_IMPORTED_MODULE_0__.html`${index > 0 ? ", " : ""}<a href="${_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2___default().getSubjectUrl(this.RecordModel, about["name"] || about["@id"])}">${about["name"] || about["@id"]}</a>`
          )}
      </div>
      <div style="margin-bottom: .4rem;" ?hidden="${!this.material}">
        <span class="collection-label">Format: </span> ${this.material}
      </div>
      <div style="margin-bottom: .4rem;" ?hidden="${!this.languages?.length}">
        <span class="collection-label">Language: </span> 
        ${this.languages?.map(
          (language, index) => lit__WEBPACK_IMPORTED_MODULE_0__.html`<span>${language.name}</span>${index < (this.languages?.length - 1) ? ', ' : ''} `
        )}
      </div>
      <div style="margin-bottom: .4rem;" ?hidden="${!this.location}">
        <span class="collection-label">Location: </span> ${this.location}
      </div>

      <div class="disclaimer-admin-toggle" ?hidden="${!this.editMode || !this.isUiAdmin}">
        <div class="disclaimer-header">
          <span>Disclaimer</span>
          <div class="toggle-switch">
            <input 
              type="checkbox" 
              id="toggle"
              ?checked="${this.showDisclaimer}" 
              @change="${this._onDisclaimerToggle}">
            <label for="toggle" class="toggle-button"></label>
          </div>
        </div>
        <div class="disclaimer-content">
          <p>
            Due to the nature of the historical items in this collection, some materials may be considered harmful, offensive or misrepresentative.
            There may be occurences of language, positions and values that do not align with our current values and practices at UC Davis.
          </p>
        </div>
      </div>

      <div class="content-warning" ?hidden="${this.editMode || !this.showDisclaimer}">
        Due to the nature of the historical items in this collection, some materials may be considered harmful, offensive or misrepresentative.
        There may be occurences of language, positions and values that do not align with our current values and practices at UC Davis.
      </div>


    </div>

    <div class="collection-highlights">
      <h2 ?hidden="${(this.highlightedItems.length === 0  || this.itemCount <= 0) && !this.editMode}">Highlights From This Collection</h2>
      ${ this.highlightedItems.length !== 0  && this.itemCount > 0 ? _utils_shared_html__WEBPACK_IMPORTED_MODULE_4__["default"].headerDots() : '' }
      
      <div class="edit-collections-container" ?hidden="${!this.editMode || !this.isUiAdmin}">

      <fieldset class="radio" style="border: none; margin: 0; padding: 0;">      
        <div>
          <span class="form-label">Highlight Display:</span>
          <ucd-theme-slim-select
            class="highlight-display-select"
            @change="${this._onItemDisplayChange}"
            @focusin="${this._ssSelectFocus}"
            @click="${this._ssSelectFocus}"
            @blur="${this._ssSelectBlur}">
            <select>
                <option value="6" ?selected="${this.itemCount === 6}">6</option>
                <option value="3" ?selected="${this.itemCount === 3}">3</option>
                <option value="2" ?selected="${this.itemCount === 2}">2</option>
                <option value="1" ?selected="${this.itemCount === 1}">1</option>
                <option value="0" ?selected="${this.itemCount === 0}">0</option>
            </select>
          </ucd-theme-slim-select>
        </div>
      </fieldset>

        <div class="card-single" ?hidden="${this.itemCount !== 1}">      
          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-1 item-ark-input" 
              type="text" 
              .value="${this.savedItems[0] ? this.savedItems[0]['@id'].split('/item')[1] : ''}" 
              placeholder="/ark:/..." />
          </div>
        </div>
        <div class="card-2" ?hidden="${this.itemCount !== 2}">      
          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-1 item-ark-input" 
              type="text" 
              .value="${this.savedItems[0] ? this.savedItems[0]['@id'].split('/item')[1] : ''}" 
              placeholder="/ark:/..." />
          </div>
          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-2 item-ark-input" 
              type="text" 
              .value="${this.savedItems[1] ? this.savedItems[1]['@id'].split('/item')[1] : ''}" 
              placeholder="/ark:/..." />
          </div>
        </div>

        <div class="card-trio" ?hidden="${this.itemCount < 3}">      
          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-1 item-ark-input" 
              type="text" 
              .value="${this.savedItems[0] ? this.savedItems[0]['@id'].split('/item')[1] : ''}" 
              placeholder="/ark:/..." />
          </div>

          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-2 item-ark-input" 
              type="text" 
              .value="${this.savedItems[1] ? this.savedItems[1]['@id'].split('/item')[1] : ''}" 
              placeholder="/ark:/..." />
          </div>

          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-3 item-ark-input" 
              type="text" 
              .value="${this.savedItems[2] ? this.savedItems[2]['@id'].split('/item')[1] : ''}" 
              placeholder="/ark:/..." />
          </div>
        </div>
      
        <div class="card-trio" ?hidden="${this.itemCount !== 6}">      
          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-4 item-ark-input" 
              type="text" 
              .value="${this.savedItems[3] ? this.savedItems[3]['@id'].split('/item')[1] : ''}" 
              placeholder="/ark:/..." />
          </div>

          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-5 item-ark-input" 
              type="text" 
              .value="${this.savedItems[4] ? this.savedItems[4]['@id'].split('/item')[1] : ''}" 
              placeholder="/ark:/..." />
          </div>

          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-6 item-ark-input" 
              type="text" 
              .value="${this.savedItems[5] ? this.savedItems[5]['@id'].split('/item')[1] : ''}" 
              placeholder="/ark:/..." />
          </div>
        </div>

        <div class="default-display">
          <h3>Display Settings for Collection Item Pages</h3>

          <div class="default-item-display">
            <span class="label" style="display: block;">Default Display for Multipage Items</span>
            <span style="font-style: italic; margin-bottom: 0.5rem; display: inline-block;">Single page items and multimedia are not affected by these settings.</span>
            
            <fieldset class="radio default-item-display-fs">
              <div>
                <ul class="list--reset" style="padding-inline-start: 0;">
                  <li>
                    <input id="two" 
                      name="radio-default-display" 
                      type="radio" 
                      class="radio" 
                      value="${(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2___default().itemDisplayType.brTwoPage)}" 
                      ?checked="${this.itemDefaultDisplay === (_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2___default().itemDisplayType.brTwoPage)}" 
                      @change="${(e) => (this.itemDefaultDisplay = (_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2___default().itemDisplayType.brTwoPage))}">
                    <label for="two">${(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2___default().itemDisplayType.brTwoPage)}</label>
                  </li>
                  <li>
                    <input id="one" 
                      name="radio-default-display" 
                      type="radio" 
                      class="radio" 
                      value="${(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2___default().itemDisplayType.brOnePage)}" 
                      ?checked="${this.itemDefaultDisplay === (_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2___default().itemDisplayType.brOnePage)}" 
                      @change="${(e) => (this.itemDefaultDisplay = (_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2___default().itemDisplayType.brOnePage))}">
                    <label for="one">${(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2___default().itemDisplayType.brOnePage)}</label>
                  </li>
                  <li>
                    <input id="list" 
                      name="radio-default-display" 
                      type="radio" 
                      class="radio" 
                      value="${(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2___default().itemDisplayType.imageList)}" 
                      ?checked="${this.itemDefaultDisplay === (_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2___default().itemDisplayType.imageList)}" 
                      @change="${(e) => (this.itemDefaultDisplay = (_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2___default().itemDisplayType.imageList))}">
                    <label for="list">${(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2___default().itemDisplayType.imageList)}</label>
                  </li>
                </ul>
              </div>
            </fieldset>
          </div>
          <div class="exceptions" ?hidden="${this.itemEdits.length < 1}">
            <span class="label">Exceptions</span>
            <p style="margin-top: 0.3rem; padding-bottom: 0; margin-bottom: 0;">
              Checked items in this list will be reset to the default item display when saved. 
              Display overrides can also be managed directly on an item page.
            </p>
            <fieldset style="border: none; padding-left: 0; padding-top: 0; margin-top: 0;">
              <ul class="list--reset" style="padding-inline-start: 0; width: 100%;">
                <li style="width: 33%; padding-right: 0;">
                  <input id="checkbox-all" 
                    name="checkbox-all" 
                    type="checkbox" 
                    @change="${this._onSelectAllExceptionsChange}">
                  <label for="checkbox-all">Select all exceptions</label>
                </li>

                <!-- items with exceptions set -->
                ${this.itemEdits.map((item, index) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
                  <li style="width: 33%; padding-right: 0;">
                    
                    <input id="checkbox${index}" 
                      name="checkbox" 
                      type="checkbox"
                      data-item-id="${item.id}">
                    <label for="checkbox${index}">
                      <a href="${item.id}">${item.linkLabel}</a>
                      <span style="font-style: italic;">
                        (${item.defaultDisplay})
                      </span>
                    </label>
                  </li>
                `)}
          
              </ul>
            </fieldset>
          </div>
        </div>
      
      </div>
      <div ?hidden="${this.editMode}" style="padding: 0 2rem;">
        <div class="card-single" ?hidden="${this.itemCount !== 1}">
          ${this.highlightedItems.map((item, index) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
            ${index < 3 ? lit__WEBPACK_IMPORTED_MODULE_0__.html`<dams-item-card data-itemid="${'/item'+item['@id'].split('/item')[1]}"></dams-item-card>` : ''}
          `)}
        </div>
        <div class="card-2" ?hidden="${this.itemCount !== 2}">
          ${this.highlightedItems.map((item, index) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
            ${index < 3 ? lit__WEBPACK_IMPORTED_MODULE_0__.html`<dams-item-card data-itemid="${'/item'+item['@id'].split('/item')[1]}"></dams-item-card>` : ''}
          `)}
        </div>
        <div class="card-trio" ?hidden="${this.itemCount < 3}">
          ${this.highlightedItems.map((item, index) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
            ${index < 3 ? lit__WEBPACK_IMPORTED_MODULE_0__.html`<dams-item-card data-itemid="${'/item'+item['@id'].split('/item')[1]}"></dams-item-card>` : ''}
          `)}
        </div>
        <div class="card-trio" ?hidden="${this.itemCount < 6}">
          ${this.highlightedItems.map((item, index) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
            ${index >= 3 ? lit__WEBPACK_IMPORTED_MODULE_0__.html`<dams-item-card data-itemid="${'/item'+item['@id'].split('/item')[1]}"></dams-item-card>` : ''}
          `)}
        </div>
      </div>

      <a href="${this.collectionSearchHref}" class="btn btn--primary btn--lg view-all-collections">View all collection items</a>

    </div>

    <app-citation .record="${this.citationRoot}"></app-citation>

  `;}

/***/ }),

/***/ "./public/elements/utils/app-toast-popup.js":
/*!**************************************************!*\
  !*** ./public/elements/utils/app-toast-popup.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppToastPopup)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_toast_popup_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-toast-popup.tpl.js */ "./public/elements/utils/app-toast-popup.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");






class AppToastPopup extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {

  static get properties() {
    return {
      visible : { type : Boolean }
    }
  }

  constructor() {
    super();
    this.render = _app_toast_popup_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.active = true;

    this.visible = false;
  }

  /**
   * @method showPopup
   * @description show the popup for 5 seconds
   * 
   */
  showPopup() {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, 5000);
  }
}

customElements.define('app-toast-popup', AppToastPopup);

/***/ }),

/***/ "./public/elements/utils/app-toast-popup.tpl.js":
/*!******************************************************!*\
  !*** ./public/elements/utils/app-toast-popup.tpl.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/shared-styles */ "./public/elements/styles/shared-styles.js");




function render() { 
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`

<style include="shared-styles">
  ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__.sharedStyles}

  :host {
    display: inline-block;
    position: fixed;
  }

  [hidden] { display: none !important; }

  #popup {
    display: block;
    z-index: 10;
    background: var(--color-aggie-blue-10);
    padding: 1rem;
    position: fixed;
    bottom: 1rem;
    right: calc(50% - 110px - 2rem);
    width: 11rem;
    font-size: 1rem;
    margin: 1rem;
    border-radius: 1.5rem;
    box-shadow: 0px 3px 6px #00000029;
    transition: all 0.3s;
    color: var(--color-aggie-blue);
  }

  #popup svg {
    height: 20px;
    width: 30px;
    fill: var(--color-sage);
    position: relative;
    top: 0.2rem;
  }
</style>

<div id="popup" ?hidden="${!this.visible}">
  <svg id="fa-check" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
  Copied successfully
</div>

`;}

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

/***/ }),

/***/ "./public/lib/utils/user.js":
/*!**********************************!*\
  !*** ./public/lib/utils/user.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const config = __webpack_require__(/*! ../config */ "./public/lib/config.js");

/**
 * @class User
 * @description wrapper around APP_CONFIG.user
 */
class User {

  constructor() {
    this.data = config.user;
    if( !this.data.roles ) this.data.roles = [];
    this.editUiAccess = ['admin', 'ui-admin'];
  }

  isLoggedIn() {
    if( this.data.loggedIn === true ) return true;
    return false;
  }

  canEditUi() {
    for( let role of this.editUiAccess ) {
      if( this.hasRole(role) ) return true;
    }
    return false;
  }

  hasRole(role) {
    return this.data.roles.includes(role);
  }
}

let user = new User();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (user);

/***/ }),

/***/ "./public/node_modules/lit-html/development/directives/unsafe-html.js":
/*!****************************************************************************!*\
  !*** ./public/node_modules/lit-html/development/directives/unsafe-html.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnsafeHTMLDirective": () => (/* binding */ UnsafeHTMLDirective),
/* harmony export */   "unsafeHTML": () => (/* binding */ unsafeHTML)
/* harmony export */ });
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lit-html.js */ "./public/node_modules/lit-html/development/lit-html.js");
/* harmony import */ var _directive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../directive.js */ "./public/node_modules/lit-html/development/directive.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */


const HTML_RESULT = 1;
class UnsafeHTMLDirective extends _directive_js__WEBPACK_IMPORTED_MODULE_1__.Directive {
    constructor(partInfo) {
        super(partInfo);
        this._value = _lit_html_js__WEBPACK_IMPORTED_MODULE_0__.nothing;
        if (partInfo.type !== _directive_js__WEBPACK_IMPORTED_MODULE_1__.PartType.CHILD) {
            throw new Error(`${this.constructor.directiveName}() can only be used in child bindings`);
        }
    }
    render(value) {
        if (value === _lit_html_js__WEBPACK_IMPORTED_MODULE_0__.nothing || value == null) {
            this._templateResult = undefined;
            return (this._value = value);
        }
        if (value === _lit_html_js__WEBPACK_IMPORTED_MODULE_0__.noChange) {
            return value;
        }
        if (typeof value != 'string') {
            throw new Error(`${this.constructor.directiveName}() called with a non-string value`);
        }
        if (value === this._value) {
            return this._templateResult;
        }
        this._value = value;
        const strings = [value];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        strings.raw = strings;
        // WARNING: impersonating a TemplateResult like this is extremely
        // dangerous. Third-party directives should not do this.
        return (this._templateResult = {
            // Cast to a known set of integers that satisfy ResultType so that we
            // don't have to export ResultType and possibly encourage this pattern.
            // This property needs to remain unminified.
            ['_$litType$']: this.constructor
                .resultType,
            strings,
            values: [],
        });
    }
}
UnsafeHTMLDirective.directiveName = 'unsafeHTML';
UnsafeHTMLDirective.resultType = HTML_RESULT;
/**
 * Renders the result as HTML, rather than text.
 *
 * The values `undefined`, `null`, and `nothing`, will all result in no content
 * (empty string) being rendered.
 *
 * Note, this is unsafe to use with any user-provided input that hasn't been
 * sanitized or escaped, as it may lead to cross-site-scripting
 * vulnerabilities.
 */
const unsafeHTML = (0,_directive_js__WEBPACK_IMPORTED_MODULE_1__.directive)(UnsafeHTMLDirective);
//# sourceMappingURL=unsafe-html.js.map

/***/ }),

/***/ "./public/node_modules/lit/directives/unsafe-html.js":
/*!***********************************************************!*\
  !*** ./public/node_modules/lit/directives/unsafe-html.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnsafeHTMLDirective": () => (/* reexport safe */ lit_html_directives_unsafe_html_js__WEBPACK_IMPORTED_MODULE_0__.UnsafeHTMLDirective),
/* harmony export */   "unsafeHTML": () => (/* reexport safe */ lit_html_directives_unsafe_html_js__WEBPACK_IMPORTED_MODULE_0__.unsafeHTML)
/* harmony export */ });
/* harmony import */ var lit_html_directives_unsafe_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-html/directives/unsafe-html.js */ "./public/node_modules/lit-html/development/directives/unsafe-html.js");

//# sourceMappingURL=unsafe-html.js.map


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyw4QkFBOEI7QUFDOUQ7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvRUFBb0UsdUZBQStCOztBQUVuRzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJCQUEyQixvRkFBb0Y7QUFDL0c7O0FBRUE7QUFDQSxvQ0FBb0MsdUZBQStCO0FBQ25FLG9DQUFvQyx1RkFBK0I7QUFDbkUsb0NBQW9DLHVGQUErQjs7QUFFbkU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwREFBMEQ7QUFDMUQsNENBQTRDO0FBQzVDLE1BQU07QUFDTiwwREFBMEQ7QUFDMUQsNENBQTRDO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0RBQXdEO0FBQ3hELDBDQUEwQztBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JqQnNDOztBQUV5Qjs7QUFFZjs7QUFFVTtBQUNUO0FBQ2lCO0FBQ0s7QUFDRTtBQUNIO0FBQ0g7O0FBRXBEO0FBQ2YsU0FBUyxxQ0FBSTtBQUNiO0FBQ0EsTUFBTSwrREFBWTtBQUNsQixNQUFNLGlGQUFRO0FBQ2QsTUFBTSxvRkFBVTtBQUNoQixNQUFNLHFGQUFXO0FBQ2pCLE1BQU0saUZBQVk7QUFDbEIsTUFBTSxrRkFBUTs7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZTs7QUFFZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakMsZ0JBQWdCLGdCQUFnQjtBQUNoQyxrQkFBa0Isa0JBQWtCO0FBQ3BDLFlBQVksbUJBQW1CO0FBQy9CO0FBQ0EseUNBQXlDLGtDQUFrQztBQUMzRTtBQUNBLHVDQUF1QyxnQkFBZ0I7QUFDdkQ7QUFDQSxzREFBc0Qsa0NBQWtDO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkVBQTZFLG1CQUFtQjtBQUNoRzs7QUFFQSwrQ0FBK0Msa0NBQWtDO0FBQ2pGLHNEQUFzRCwyQkFBMkIsd0RBQXdELDBCQUEwQjtBQUNuSyxzREFBc0QsMkJBQTJCLDhEQUE4RCwwQkFBMEI7QUFDekssc0RBQXNELDJCQUEyQixrRUFBa0UsMEJBQTBCO0FBQzdLLDJEQUEyRCxnQ0FBZ0MsNkRBQTZELDBCQUEwQjtBQUNsTCx1REFBdUQsNEJBQTRCLHlEQUF5RCwwQkFBMEI7QUFDdEssZ0VBQWdFLHFDQUFxQyxrRUFBa0UsMEJBQTBCO0FBQ2pNO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkMsaUNBQWlDLFlBQVksb0JBQW9CO0FBQzlHO0FBQ0E7QUFDQSxrREFBa0Qsa0NBQWtDLFlBQVksb0JBQW9CO0FBQ3BIO0FBQ0E7QUFDQSxrREFBa0Qsa0NBQWtDLFlBQVksMEJBQTBCO0FBQzFIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0Isc0JBQXNCLCtCQUErQixxQkFBcUI7O0FBRWxHO0FBQ0Esd0JBQXdCLHNCQUFzQiwrQkFBK0IscUJBQXFCO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBLGNBQWMsV0FBVztBQUN6Qix1QkFBdUIsaUJBQWlCLGVBQWUsZ0JBQWdCO0FBQ3ZFLG1CQUFtQiwwQkFBMEIscUNBQXFDLFlBQVksTUFBTSwyQkFBMkI7QUFDL0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBLHVDQUF1QyxhQUFhLHlCQUF5QjtBQUM3RSwyREFBMkQ7QUFDM0Q7QUFDQSx1Q0FBdUMsYUFBYSx1QkFBdUI7QUFDM0U7QUFDQSxZQUFZO0FBQ1o7QUFDQSxjQUFjLHFDQUFJLEdBQUcsc0JBQXNCLFdBQVcsd0VBQW1CLGtEQUFrRCxJQUFJLDhCQUE4QjtBQUM3SjtBQUNBO0FBQ0EsdUNBQXVDLGFBQWEsZUFBZTtBQUNuRSx5REFBeUQ7QUFDekQ7QUFDQSx1Q0FBdUMsYUFBYSx3QkFBd0I7QUFDNUU7QUFDQSxVQUFVO0FBQ1YsK0JBQStCLHFDQUFJLFNBQVMsY0FBYyxTQUFTLGtEQUFrRDtBQUNySDtBQUNBO0FBQ0EsdUNBQXVDLGFBQWEsZUFBZTtBQUNuRSwyREFBMkQ7QUFDM0Q7O0FBRUEsc0RBQXNELGtDQUFrQztBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsb0JBQW9CO0FBQzlDLHlCQUF5Qix5QkFBeUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOENBQThDLHNDQUFzQztBQUNwRjtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0EscUJBQXFCLCtFQUErRTtBQUNwRyxTQUFTLDREQUE0RCxxRUFBcUI7QUFDMUY7QUFDQSx5REFBeUQsa0NBQWtDOztBQUUzRixtREFBbUQsV0FBVyxXQUFXO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDBCQUEwQjtBQUNqRCx3QkFBd0Isb0JBQW9CO0FBQzVDLHNCQUFzQixvQkFBb0I7QUFDMUMscUJBQXFCLG1CQUFtQjtBQUN4QztBQUNBLCtDQUErQyxxQkFBcUI7QUFDcEUsK0NBQStDLHFCQUFxQjtBQUNwRSwrQ0FBK0MscUJBQXFCO0FBQ3BFLCtDQUErQyxxQkFBcUI7QUFDcEUsK0NBQStDLHFCQUFxQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0Q0FBNEMscUJBQXFCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNFQUFzRTtBQUM5RjtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMscUJBQXFCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNFQUFzRTtBQUM5RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0VBQXNFO0FBQzlGO0FBQ0E7QUFDQTs7QUFFQSwwQ0FBMEMsbUJBQW1CO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNFQUFzRTtBQUM5RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNFQUFzRTtBQUM5RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNFQUFzRTtBQUM5RjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxxQkFBcUI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0VBQXNFO0FBQzlGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0VBQXNFO0FBQzlGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0VBQXNFO0FBQzlGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0RBQXNEO0FBQ3RELDZDQUE2Qyx1QkFBdUIsc0JBQXNCO0FBQzFGO0FBQ0E7QUFDQTtBQUNBLHVFQUF1RTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHNGQUErQixDQUFDO0FBQy9ELGtDQUFrQyw0QkFBNEIsc0ZBQStCLENBQUM7QUFDOUYsaUNBQWlDLGtDQUFrQyxzRkFBK0IsRUFBRTtBQUNwRyx1Q0FBdUMsc0ZBQStCLENBQUM7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHNGQUErQixDQUFDO0FBQy9ELGtDQUFrQyw0QkFBNEIsc0ZBQStCLENBQUM7QUFDOUYsaUNBQWlDLGtDQUFrQyxzRkFBK0IsRUFBRTtBQUNwRyx1Q0FBdUMsc0ZBQStCLENBQUM7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHNGQUErQixDQUFDO0FBQy9ELGtDQUFrQyw0QkFBNEIsc0ZBQStCLENBQUM7QUFDOUYsaUNBQWlDLGtDQUFrQyxzRkFBK0IsRUFBRTtBQUNwRyx3Q0FBd0Msc0ZBQStCLENBQUM7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QywwQkFBMEI7QUFDdkU7QUFDQSwwQ0FBMEMsbUJBQW1CLGlCQUFpQjtBQUM5RTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsaUJBQWlCLGdCQUFnQixjQUFjO0FBQzFGLHNFQUFzRSxZQUFZO0FBQ2xGLHVDQUF1QyxpQkFBaUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGtDQUFrQztBQUNqRTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLG9DQUFvQyxxQ0FBSTtBQUMxRCx5Q0FBeUMsaUJBQWlCO0FBQzFEO0FBQ0EseUNBQXlDLE1BQU07QUFDL0M7QUFDQTtBQUNBLHNDQUFzQyxRQUFRO0FBQzlDLDBDQUEwQyxNQUFNO0FBQ2hELGlDQUFpQyxRQUFRLElBQUksZUFBZTtBQUM1RCxzREFBc0Q7QUFDdEQsMkJBQTJCLG9CQUFvQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGNBQWMseUJBQXlCO0FBQzdELDRDQUE0QyxxQkFBcUI7QUFDakUsWUFBWSwyQ0FBMkMscUNBQUk7QUFDM0QsY0FBYyxZQUFZLHFDQUFJLGdDQUFnQyxzQ0FBc0M7QUFDcEc7QUFDQTtBQUNBLHVDQUF1QyxxQkFBcUI7QUFDNUQsWUFBWSwyQ0FBMkMscUNBQUk7QUFDM0QsY0FBYyxZQUFZLHFDQUFJLGdDQUFnQyxzQ0FBc0M7QUFDcEc7QUFDQTtBQUNBLDBDQUEwQyxtQkFBbUI7QUFDN0QsWUFBWSwyQ0FBMkMscUNBQUk7QUFDM0QsY0FBYyxZQUFZLHFDQUFJLGdDQUFnQyxzQ0FBc0M7QUFDcEc7QUFDQTtBQUNBLDBDQUEwQyxtQkFBbUI7QUFDN0QsWUFBWSwyQ0FBMkMscUNBQUk7QUFDM0QsY0FBYyxhQUFhLHFDQUFJLGdDQUFnQyxzQ0FBc0M7QUFDckc7QUFDQTtBQUNBOztBQUVBLGlCQUFpQiwwQkFBMEI7O0FBRTNDOztBQUVBLDZCQUE2QixrQkFBa0I7O0FBRS9DOzs7Ozs7Ozs7Ozs7Ozs7OztBQzc0QmlDOztBQUVhOztBQUVnQjs7QUFFL0MsNEJBQTRCLDhEQUFLLENBQUMsMkNBQVU7QUFDM0QsUUFBUSxpRUFBWTs7QUFFcEI7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0Isb0VBQVc7QUFDN0I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDMkI7O0FBRTRCOztBQUV4QztBQUNmLFNBQVMscUNBQUk7O0FBRWI7QUFDQSxJQUFJLCtEQUFZOztBQUVoQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCLGNBQWM7QUFDekM7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUNoRDJCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxXQUFXLHFDQUFJO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpRUFBZSxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7O0FDNUIvQixlQUFlLG1CQUFPLENBQUMseUNBQVc7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpRUFBZSxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNtRDtBQUNjO0FBQ2pFO0FBQ08sa0NBQWtDLG9EQUFTO0FBQ2xEO0FBQ0E7QUFDQSxzQkFBc0IsaURBQU87QUFDN0IsOEJBQThCLHlEQUFjO0FBQzVDLCtCQUErQiwrQkFBK0I7QUFDOUQ7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlEQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixrREFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsK0JBQStCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sbUJBQW1CLHdEQUFTO0FBQ25DOzs7Ozs7Ozs7Ozs7Ozs7O0FDNURnRDtBQUNoRCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9jb21wb25lbnRzL2NhcmRzL2RhbXMtaXRlbS1jYXJkLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9jb21wb25lbnRzL2NhcmRzL2RhbXMtaXRlbS1jYXJkLnRwbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvY29tcG9uZW50cy9jaXRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvY29tcG9uZW50cy9jaXRhdGlvbi50cGwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL2NvbXBvbmVudHMvbW9kYWwtb3ZlcmxheS5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvY29tcG9uZW50cy9tb2RhbC1vdmVybGF5LnRwbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvY29sbGVjdGlvbi9hcHAtY29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvY29sbGVjdGlvbi9hcHAtY29sbGVjdGlvbi50cGwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3V0aWxzL2FwcC10b2FzdC1wb3B1cC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvdXRpbHMvYXBwLXRvYXN0LXBvcHVwLnRwbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvdXRpbHMvc2hhcmVkLWh0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi91dGlscy91c2VyLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9ub2RlX21vZHVsZXMvbGl0LWh0bWwvZGV2ZWxvcG1lbnQvZGlyZWN0aXZlcy91bnNhZmUtaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvbm9kZV9tb2R1bGVzL2xpdC9kaXJlY3RpdmVzL3Vuc2FmZS1odG1sLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpdEVsZW1lbnQgfSBmcm9tIFwibGl0XCI7XG5cbmltcG9ydCByZW5kZXIgZnJvbSBcIi4vZGFtcy1pdGVtLWNhcmQudHBsLmpzXCI7XG5cbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbmltcG9ydCBcIkB1Y2QtbGliL3RoZW1lLWVsZW1lbnRzL3VjZGxpYi91Y2RsaWItaWNvbi91Y2RsaWItaWNvblwiO1xuXG4vKipcbiAqIEBjbGFzcyBEYW1zSXRlbUNhcmRcbiAqIEBkZXNjcmlwdGlvbiBVSSBjb21wb25lbnQgY2xhc3MgZm9yIGRpc3BsYXlpbmcgYSBpdGVtIHByZXZpZXcgY2FyZFxuICpcbiAqIEBwcm9wIHtTdHJpbmd9IGlkIC0gSXRlbSBpZFxuICogSWYgdXNlZCwgZWxlbWVudCB3aWxsIHF1ZXJ5IHRoZSBSZWNvcmRNb2RlbCBmb3IgdGhlIGl0ZW0gZGF0YS5cbiAqIEBwcm9wIHtPYmplY3R9IGRhdGEgLSBEYXRhIG9iamVjdCBjb250YWluaW5nIGl0ZW0gaW5mb3JtYXRpb25cbiAqIEBwcm9wIHtTdHJpbmd9IGl0ZW1VcmwgLSBVcmwgdG8gaXRlbVxuICogQHByb3Age1N0cmluZ30gdGh1bWJuYWlsVXJsIC0gVGh1bWJuYWlsIHVybFxuICogQHByb3Age1N0cmluZ30gdHJ1bmNhdGVkVGl0bGUgLSBUaXRsZXMgb3ZlciAzOCBjaGFyYWN0ZXJzIHdpbGwgYmUgdHJ1bmNhdGVkIHRvIGZpdCBhIHNpbmdsZSBsaW5lXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhbXNJdGVtQ2FyZCBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpLndpdGgoTGl0Q29ya1V0aWxzKSB7XG4gIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHsgdHlwZTogU3RyaW5nLCBhdHRyaWJ1dGU6IFwiZGF0YS1pdGVtaWRcIiB9LFxuICAgICAgLy8gcmVjb3JkOiB7IHR5cGU6IE9iamVjdCB9LFxuICAgICAgZGF0YTogeyB0eXBlOiBPYmplY3QgfSxcbiAgICAgIGl0ZW1Vcmw6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICB0aHVtYm5haWxVcmw6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICB0cnVuY2F0ZWRUaXRsZTogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIG1lZGlhVHlwZXM6IHsgdHlwZTogQXJyYXkgfSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5pZCA9IFwiXCI7XG4gICAgLy8gdGhpcy5yZWNvcmQgPSB7fTtcbiAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICB0aGlzLnRydW5jYXRlZFRpdGxlID0gXCJcIjtcbiAgICB0aGlzLml0ZW1VcmwgPSBcIlwiO1xuICAgIHRoaXMudGh1bWJuYWlsVXJsID0gXCJcIjtcbiAgICB0aGlzLm1lZGlhVHlwZXMgPSBbXTtcblxuICAgIHRoaXMuX2luamVjdE1vZGVsKFwiUmVjb3JkTW9kZWxcIik7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB3aWxsVXBkYXRlXG4gICAqIEBkZXNjcmlwdGlvbiBMaXQgbGlmZWN5Y2xlIG1ldGhvZCBjYWxsZWQgd2hlbiBlbGVtZW50IGlzIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSB7TWFwfSBwcm9wcyAtIFByb3BlcnRpZXMgdGhhdCBoYXZlIGNoYW5nZWQuXG4gICAqL1xuICB3aWxsVXBkYXRlKHByb3BzKSB7XG4gICAgaWYgKHRoaXMuZGF0YS5pZCkge1xuICAgICAgdGhpcy5pdGVtVXJsID0gdGhpcy5kYXRhLmlkO1xuICAgICAgdGhpcy50aHVtYm5haWxVcmwgPSB0aGlzLmRhdGEudGh1bWJuYWlsVXJsIHx8ICcvaW1hZ2VzL3RyZWUtYmlrZS1pbGx1c3RyYXRpb24ucG5nJztcblxuICAgICAgdGhpcy5tZWRpYVR5cGVzID0gdGhpcy5kYXRhLm1lZGlhVHlwZXM7XG4gICAgICBpZiAodGhpcy5kYXRhLm1lZGlhVHlwZXM/LmluY2x1ZGVzKFwiSW1hZ2VcIikpIHtcbiAgICAgICAgdGhpcy5tZWRpYVR5cGVzLnB1c2goXCJpbWFnZVwiKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRhdGEubWVkaWFUeXBlcz8uaW5jbHVkZXMoXCJWaWRlb1wiKSkge1xuICAgICAgICB0aGlzLm1lZGlhVHlwZXMucHVzaChcInZpZGVvXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZGF0YS5tZWRpYVR5cGVzPy5pbmNsdWRlcyhcIkF1ZGlvXCIpKSB7XG4gICAgICAgIHRoaXMubWVkaWFUeXBlcy5wdXNoKFwiYXVkaW9cIik7XG4gICAgICB9XG4gICAgICBpZiggdGhpcy5kYXRhLm11bHRpSW1hZ2UgKSB7XG4gICAgICAgIHRoaXMubWVkaWFUeXBlcy5wdXNoKFwiaW1hZ2VMaXN0XCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9nZXRJdGVtKHRoaXMuaWQpO1xuICAgIH1cblxuICAgIHRoaXMuX3RydW5jYXRlVGl0bGUoKTtcbiAgfVxuXG4gIGFzeW5jIF9vblJlY29yZFVwZGF0ZShlKSB7XG4gICAgaWYgKGUuc3RhdGUgIT09IFwibG9hZGVkXCIgfHwgZS5pZCAhPT0gdGhpcy5pZCkgcmV0dXJuO1xuXG4gICAgdGhpcy5yZWNvcmQgPSBlLnZjRGF0YTtcbiAgICBpZiggdGhpcy5yZWNvcmQuaW1hZ2VzICkge1xuICAgICAgbGV0IGltYWdlcyA9IHRoaXMucmVjb3JkLmltYWdlcztcbiAgICAgIHRoaXMudGh1bWJuYWlsVXJsID0gaW1hZ2VzLm1lZGl1bSA/IGltYWdlcy5tZWRpdW0udXJsIDogaW1hZ2VzLm9yaWdpbmFsLnVybDtcbiAgICB9XG4gICAgdGhpcy50aXRsZSA9IHRoaXMucmVjb3JkLm5hbWU7XG4gICAgdGhpcy5pdGVtVXJsID0gdGhpcy5yZWNvcmRbJ0BpZCddO1xuICAgIHRoaXMuaWQgPSB0aGlzLnJlY29yZFsnQGlkJ107XG4gICAgdGhpcy5tZWRpYVR5cGUgPSB0aGlzLnJlY29yZC5tZWRpYVR5cGU7XG5cbiAgICB0aGlzLl90cnVuY2F0ZVRpdGxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfZ2V0SXRlbVxuICAgKiBAZGVzY3JpcHRpb24gRmV0Y2hlcyBpdGVtIGRhdGEgZnJvbSBSZWNvcmRNb2RlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgLSBJdGVtIGlkIHRvIGZldGNoXG4gICAqL1xuICBhc3luYyBfZ2V0SXRlbShpZCkge1xuICAgIHRoaXMuX29uUmVjb3JkVXBkYXRlKGF3YWl0IHRoaXMuUmVjb3JkTW9kZWwuZ2V0KGlkKSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfdHJ1bmNhdGVUaXRsZVxuICAgKiBAZGVzY3JpcHRpb24gVHJ1bmNhdGVzIHRpdGxlcyBvdmVyIDM4IGNoYXJhY3RlcnMgdG8gZml0IGEgc2luZ2xlIGxpbmVcbiAgICovXG4gIF90cnVuY2F0ZVRpdGxlKCkge1xuICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLnRpdGxlICYmIHRoaXMuZGF0YS50aXRsZS5sZW5ndGggPiAzOCkge1xuICAgICAgdGhpcy50cnVuY2F0ZWRUaXRsZSA9IHRoaXMuZGF0YS50aXRsZS5zdWJzdHJpbmcoMCwgMzQpICsgXCIuLi5cIjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEudGl0bGUpIHtcbiAgICAgIHRoaXMudHJ1bmNhdGVkVGl0bGUgPSB0aGlzLmRhdGEudGl0bGU7XG4gICAgfSBlbHNlIGlmICggdGhpcy50aXRsZSAmJiB0aGlzLnRpdGxlLmxlbmd0aCA+IDM4ICkge1xuICAgICAgdGhpcy50cnVuY2F0ZWRUaXRsZSA9IHRoaXMudGl0bGUuc3Vic3RyaW5nKDAsIDM0KSArIFwiLi4uXCI7XG4gICAgfSBlbHNlIGlmICggdGhpcy50aXRsZSApIHtcbiAgICAgIHRoaXMudHJ1bmNhdGVkVGl0bGUgPSB0aGlzLnRpdGxlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRydW5jYXRlZFRpdGxlID0gXCJcIjtcbiAgICB9XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiZGFtcy1pdGVtLWNhcmRcIiwgRGFtc0l0ZW1DYXJkKTtcbiIsImltcG9ydCB7IGh0bWwgfSBmcm9tIFwibGl0XCI7XG4vLyBpbXBvcnQgeyBzdHlsZU1hcCB9IGZyb20gJ2xpdC9kaXJlY3RpdmVzL3N0eWxlLW1hcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgcmV0dXJuIGh0bWxgXG4gICAgPHN0eWxlPlxuICAgICAgOmhvc3Qge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIH1cbiAgICAgIFtoaWRkZW5dIHtcbiAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgICAgLmNvbnRhaW5lciB7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIH1cbiAgICAgIGEge1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICB9XG4gICAgICAuaW1nLWNvbnRhaW5lciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHBhZGRpbmctdG9wOiA3NSU7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvaW1hZ2VzL2xvZ29zL2xvZ28td2hpdGUtNTEyLnBuZyk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWJsYWNrLTIwKTtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICAgICAgfVxuICAgICAgLmltZy1jb250YWluZXIgaW1nIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgICAgfVxuICAgICAgLmhlYWQge1xuICAgICAgICBib3JkZXI6IDNweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgdHJhbnNpdGlvbjogMC4zcztcbiAgICAgIH1cbiAgICAgIC5jb250YWluZXI6aG92ZXIgLmhlYWQsXG4gICAgICAuY29udGFpbmVyOmZvY3VzIC5oZWFkIHtcbiAgICAgICAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0tY29sb3ItZGFtcy1zZWNvbmRhcnkpO1xuICAgICAgfVxuICAgICAgaDUge1xuICAgICAgICBtYXJnaW46IDEwcHggMCA1cHggMDtcbiAgICAgICAgY29sb3I6IHZhcigtLWNvbG9yLWg1KTtcbiAgICAgICAgZm9udC1zaXplOiB2YXIoLS1mcy1oNSk7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiB2YXIoLS1mdy1oNSk7XG4gICAgICB9XG4gICAgICAuc3VidGl0bGUge1xuICAgICAgICBmb250LXNpemU6IHZhcigtLWZzLXApO1xuICAgICAgICBmb250LXdlaWdodDogdmFyKC0tZnctZXh0cmEtYm9sZCk7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTcwKTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgIH1cbiAgICAgIC5nb2xkLWRvdHMge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogNXB4IGRvdHRlZCB2YXIoLS1jb2xvci1kYW1zLXNlY29uZGFyeSk7XG4gICAgICB9XG5cbiAgICAgIC5tYXJrZXRpbmctaGlnaGxpZ2h0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIC8qIC5tYXJrZXRpbmctaGlnaGxpZ2h0OmhvdmVyIC5tYXJrZXRpbmctaGlnaGxpZ2h0X19pbWFnZSAudS1iYWNrZ3JvdW5kLWltYWdlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XG4gIH0gKi9cblxuICAgICAgLm1hcmtldGluZy1oaWdobGlnaHRfX2ltYWdlIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBtYXJnaW46IDFyZW0gMCAwO1xuICAgICAgICBwYWRkaW5nOiAxcmVtO1xuICAgICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZS1pbi1vdXQ7XG4gICAgICB9XG5cbiAgICAgIC5tYXJrZXRpbmctaGlnaGxpZ2h0X19pbWFnZTpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWdvbGQtMzApO1xuICAgICAgfVxuXG4gICAgICAvKiAubWFya2V0aW5nLWhpZ2hsaWdodF9faW1hZ2UgLnUtYmFja2dyb3VuZC1pbWFnZSB7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC4zcyBlYXNlLWluLW91dDtcbiAgfSAqL1xuXG4gICAgICAubWFya2V0aW5nLWhpZ2hsaWdodF9fdGl0bGUge1xuICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTgwKTtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgfVxuXG4gICAgICAvKiAubWFya2V0aW5nLWhpZ2hsaWdodF9faXRlbXMge1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS04MCk7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBsaW5lLWhlaWdodDogMS4yNTtcbiAgICBtYXJnaW46IDAuNXJlbSAwIDFyZW07XG4gIH0gKi9cblxuICAgICAgLnUtYmFja2dyb3VuZC1pbWFnZSB7XG4gICAgICAgIC8qIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyOyAqL1xuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgICAgICBvYmplY3QtZml0OiBjb250YWluO1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGJvdHRvbSBjZW50ZXI7XG4gICAgICB9XG4gICAgICAuYXNwZWN0LS00eDMge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBwYWRkaW5nLXRvcDogNzUlO1xuICAgICAgfVxuXG4gICAgICAubWVkaWEtdHlwZXMge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHJpZ2h0OiAwLjI1cmVtO1xuICAgICAgICBib3R0b206IDAuMjVyZW07XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICB9XG5cbiAgICAgIC5tZWRpYS10eXBlIHtcbiAgICAgICAgd2lkdGg6IDJyZW07XG4gICAgICAgIGhlaWdodDogMnJlbTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTgwKTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIG1hcmdpbjogMC41cmVtIDAuNXJlbSAwIDA7XG4gICAgICB9XG5cbiAgICAgIC5tZWRpYS10eXBlX19pY29uIHtcbiAgICAgICAgd2lkdGg6IDEuNHJlbTtcbiAgICAgIH1cblxuICAgICAgdWNkbGliLWljb24ge1xuICAgICAgICB3aWR0aDogMS4ycmVtO1xuICAgICAgICBoZWlnaHQ6IDEuMnJlbTtcbiAgICAgICAgZmlsbDogd2hpdGU7XG4gICAgICB9XG4gICAgPC9zdHlsZT5cblxuICAgIDxhIGhyZWY9XCIke3RoaXMuaXRlbVVybH1cIlxuICAgICAgY2xhc3M9XCJtYXJrZXRpbmctaGlnaGxpZ2h0IGNhdGVnb3J5LWJyYW5kLS1zZWNvbmRhcnkgdS1zcGFjZS1tYiBvLWJveFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1hcmtldGluZy1oaWdobGlnaHRfX2ltYWdlXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImFzcGVjdC0tNHgzIHUtYmFja2dyb3VuZC1pbWFnZVwiXG4gICAgICAgICAgcm9sZT1cImltZ1wiXG4gICAgICAgICAgYXJpYS1sYWJlbD1cIiR7dGhpcy50cnVuY2F0ZWRUaXRsZX1cIlxuICAgICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTp1cmwoJHt0aGlzLnRodW1ibmFpbFVybH0pO1wiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lZGlhLXR5cGVzXCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJtZWRpYS10eXBlXCJcbiAgICAgICAgICAgID9oaWRkZW49XCIkeyF0aGlzLm1lZGlhVHlwZXMuaW5jbHVkZXMoXCJ2aWRlb1wiKX1cIj5cbiAgICAgICAgICAgIDx1Y2RsaWItaWNvblxuICAgICAgICAgICAgICBzdHlsZT1cIm1hcmdpbi1sZWZ0OiAuMnJlbTtcIlxuICAgICAgICAgICAgICBjbGFzcz1cInZlcnRpY2FsLWxpbmtfX2ltYWdlXCJcbiAgICAgICAgICAgICAgaWNvbj1cInVjZGxpYi1kYW1zOmZhLXBsYXlcIj5cbiAgICAgICAgICAgIDwvdWNkbGliLWljb24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJtZWRpYS10eXBlXCJcbiAgICAgICAgICAgID9oaWRkZW49XCIkeyF0aGlzLm1lZGlhVHlwZXMuaW5jbHVkZXMoXCJhdWRpb1wiKX1cIj5cbiAgICAgICAgICAgIDx1Y2RsaWItaWNvblxuICAgICAgICAgICAgICBjbGFzcz1cInZlcnRpY2FsLWxpbmtfX2ltYWdlXCJcbiAgICAgICAgICAgICAgaWNvbj1cInVjZGxpYi1kYW1zOmZhLXZvbHVtZS1oaWdoXCI+XG4gICAgICAgICAgICA8L3VjZGxpYi1pY29uPiAgXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJtZWRpYS10eXBlXCJcbiAgICAgICAgICAgID9oaWRkZW49XCIkeyF0aGlzLm1lZGlhVHlwZXMuaW5jbHVkZXMoXCJpbWFnZUxpc3RcIil9XCI+XG4gICAgICAgICAgICA8dWNkbGliLWljb25cbiAgICAgICAgICAgICAgY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rX19pbWFnZVwiXG4gICAgICAgICAgICAgIGljb249XCJ1Y2RsaWItZGFtczppdGVtLXN0YWNrLWJsYW5rXCI+XG4gICAgICAgICAgICA8L3VjZGxpYi1pY29uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImdvbGQtZG90c1wiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1hcmtldGluZy1oaWdobGlnaHRfX2JvZHlcIj5cbiAgICAgICAgPHAgY2xhc3M9XCJtYXJrZXRpbmctaGlnaGxpZ2h0X190aXRsZVwiPiR7dGhpcy50cnVuY2F0ZWRUaXRsZX08L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2E+XG4gIGA7XG59XG4iLCJpbXBvcnQgeyBMaXRFbGVtZW50fSBmcm9tICdsaXQnO1xuaW1wb3J0IHJlbmRlciBmcm9tICcuL2NpdGF0aW9uLnRwbC5qcyc7XG5cbmltcG9ydCBjaXRhdGlvbnMgZnJvbSAnLi4vLi4vbGliL21vZGVscy9DaXRhdGlvbnNNb2RlbCc7XG5cbmltcG9ydCAnLi4vdXRpbHMvYXBwLXRvYXN0LXBvcHVwLmpzJztcblxuLyoqXG4gKiBAY2xhc3MgQ2l0YXRpb25cbiAqIEBkZXNjcmlwdGlvbiBTdHlsZWl6ZWQgVUkgY29tcG9uZW50IGZvciBDaXRhdGlvbnNcbiAqL1xuZXhwb3J0IGNsYXNzIENpdGF0aW9uIGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gY291bnQgOiB7dHlwZSA6IFN0cmluZ30sXG4gICAgICAvLyBjaG9pY2VzOiB7IHR5cGUgOiBBcnJheSB9LFxuICAgICAgcmVjb3JkOiB7dHlwZSA6IE9iamVjdH0sXG4gICAgICByZWNvcmRJZDoge3R5cGUgOiBTdHJpbmd9LFxuICAgICAgY2l0YXRpb25zIDoge3R5cGUgOiBBcnJheX0sXG4gICAgICBzZWxlY3RlZENpdGF0aW9uIDoge3R5cGUgOiBPYmplY3R9LFxuICAgICAgY2l0YXRpb25UeXBlTGFiZWwgOiB7dHlwZSA6IFN0cmluZywgYXR0cmlidXRlIDogJ2NpdGF0aW9uLXR5cGUtbGFiZWwnfVxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIFxuICAgIHRoaXMucmVjb3JkID0ge307XG4gICAgdGhpcy5yZWNvcmRJZCA9ICcnO1xuICAgIHRoaXMuY2l0YXRpb25zID0gW107XG4gICAgdGhpcy5zZWxlY3RlZENpdGF0aW9uID0ge307XG4gICAgdGhpcy5jaXRhdGlvblR5cGVMYWJlbCA9ICdDb2xsZWN0aW9uJztcbiAgICBcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZWQoKSB7XG4gICAgaWYoICFPYmplY3Qua2V5cyh0aGlzLnJlY29yZCB8fCB7fSkubGVuZ3RoIHx8ICggdGhpcy5jaXRhdGlvbnMubGVuZ3RoICYmIHRoaXMucmVjb3JkSWQgPT09IHRoaXMucmVjb3JkWydAaWQnXSkgKSByZXR1cm47XG5cbiAgICB0aGlzLnJlY29yZElkID0gdGhpcy5yZWNvcmRbJ0BpZCddO1xuICAgIGxldCBuZXdDaXRhdGlvbnMgPSBbXTtcblxuICAgIG5ld0NpdGF0aW9ucy5wdXNoKHtcbiAgICAgIHR5cGUgOiAnbWxhJyxcbiAgICAgIHRleHQgOiBhd2FpdCBjaXRhdGlvbnMucmVuZGVyRXNSZWNvcmQodGhpcy5yZWNvcmQsICdtbGEnKVxuICAgIH0pO1xuICAgIG5ld0NpdGF0aW9ucy5wdXNoKHtcbiAgICAgIHR5cGUgOiAnYXBhJyxcbiAgICAgIHRleHQgOiBhd2FpdCBjaXRhdGlvbnMucmVuZGVyRXNSZWNvcmQodGhpcy5yZWNvcmQsICdhcGEnKVxuICAgIH0pO1xuICAgIG5ld0NpdGF0aW9ucy5wdXNoKHtcbiAgICAgIHR5cGUgOiAnY2hpY2FnbycsXG4gICAgICB0ZXh0IDogYXdhaXQgY2l0YXRpb25zLnJlbmRlckVzUmVjb3JkKHRoaXMucmVjb3JkLCAnY2hpY2FnbycpXG4gICAgfSk7XG5cbiAgICB0aGlzLmNpdGF0aW9ucyA9IG5ld0NpdGF0aW9ucztcbiAgICB0aGlzLnNlbGVjdGVkQ2l0YXRpb24gPSBuZXdDaXRhdGlvbnMuZmlsdGVyKGMgPT4gYy50eXBlID09PSAnYXBhJylbMF07XG4gIH1cblxuICBfY2l0ZUNoYW5nZShlKSB7XG4gICAgdGhpcy5zZWxlY3RlZENpdGF0aW9uID0gdGhpcy5jaXRhdGlvbnMuZmlsdGVyKGMgPT4gYy50eXBlID09PSBlLnRhcmdldC52YWx1ZSlbMF07XG4gIH1cblxuICBhc3luYyBfY29weUNpdGVUZXh0KGUpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5jc2wtZW50cnknKS5pbm5lckhUTUwpO1xuICAgICAgbGV0IHRvYXN0UG9wdXAgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignYXBwLXRvYXN0LXBvcHVwJyk7XG4gICAgICBpZiggdG9hc3RQb3B1cCApIHRvYXN0UG9wdXAuc2hvd1BvcHVwKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcignRmFpbGVkIHRvIGNvcHkgY2l0YXRpb246ICcsIGVycik7XG4gICAgfVxuICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhcHAtY2l0YXRpb24nLCBDaXRhdGlvbik7XG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0JztcbmltcG9ydCB7IHVuc2FmZUhUTUwgfSBmcm9tICdsaXQvZGlyZWN0aXZlcy91bnNhZmUtaHRtbC5qcyc7XG5cbmltcG9ydCBTaGFyZWRIdG1sIGZyb20gJy4uL3V0aWxzL3NoYXJlZC1odG1sJztcbi8vIGltcG9ydCBzaGFyZWRTdHlsZXNDc3MgZnJvbSBcIi4uL3N0eWxlcy9zaGFyZWQtc3R5bGVzXCI7XG5pbXBvcnQgeyBzaGFyZWRTdHlsZXMgfSBmcm9tIFwiLi4vc3R5bGVzL3NoYXJlZC1zdHlsZXNcIjtcblxuLy8gaW1wb3J0IHsgY2xhc3NNYXAgfSBmcm9tICdsaXQvZGlyZWN0aXZlcy9jbGFzcy1tYXAnO1xuLy8gaW1wb3J0IHsgc3R5bGVNYXAgfSBmcm9tICdsaXQvZGlyZWN0aXZlcy9zdHlsZS1tYXAnO1xuXG5pbXBvcnQgbGlua3NDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvMV9iYXNlX2h0bWwvX2xpbmtzLmNzc1wiO1xuaW1wb3J0IGJ1dHRvbnNDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvMl9iYXNlX2NsYXNzL19idXR0b25zLmNzc1wiO1xuaW1wb3J0IGhlYWRpbmdzQ3NzIGZyb20gXCJAdWNkLWxpYi90aGVtZS1zYXNzLzJfYmFzZV9jbGFzcy9faGVhZGluZ3MuY3NzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHsgXG5yZXR1cm4gaHRtbGBcbjxzdHlsZT5cbiAgJHtzaGFyZWRTdHlsZXN9XG4gICR7bGlua3NDc3N9XG4gICR7YnV0dG9uc0Nzc31cbiAgJHtoZWFkaW5nc0Nzc31cbiAgXG4gIDpob3N0IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc3VwZXItbGlnaHQtYmFja2dyb3VuZC1jb2xvcik7XG4gIH1cblxuICAuY2l0YXRpb24ge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS0zMCk7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgIH1cblxuICAgIC5jaXRhdGlvbiAuYnRuLWNvcHkge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtZ29sZCk7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBtaW4taGVpZ2h0OiAxLjRyZW07XG4gICAgICBoZWlnaHQ6IDEuNHJlbTtcbiAgICB9XG5cbiAgICAuY2l0YXRpb24gLmJ0bi1jb3B5OmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUpO1xuICAgICAgY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWdvbGQpO1xuICAgIH1cblxuICAgIC5jaXRhdGlvbiAuYnRuLWFwYSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTUwKTtcbiAgICAgIG1hcmdpbi1yaWdodDogLjVyZW07XG4gICAgICBtaW4td2lkdGg6IDhjaDtcbiAgICAgIGZvbnQtc2l6ZTogMXJlbTtcblxuICAgICAgLyogYXJyb3cgc3R5bGVzICovXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICBtYXJnaW46IDA7ICAgICAgXG4gICAgICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgICAgLW1vei1hcHBlYXJhbmNlOiBub25lOyAgICAgIFxuICAgICAgYmFja2dyb3VuZC1pbWFnZTpcbiAgICAgICAgbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCB0cmFuc3BhcmVudCA1MCUsIHZhcigtLWNvbG9yLWFnZ2llLWJsdWUpIDUwJSksXG4gICAgICAgIGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHZhcigtLWNvbG9yLWFnZ2llLWJsdWUpIDUwJSwgdHJhbnNwYXJlbnQgNTAlKSxcbiAgICAgICAgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAjY2NjLCAjY2NjKTtcbiAgICAgIGJhY2tncm91bmQtcG9zaXRpb246XG4gICAgICAgIGNhbGMoMTAwJSAtIDIwcHgpIGNhbGMoMWVtICsgMnB4KSxcbiAgICAgICAgY2FsYygxMDAlIC0gMTVweCkgY2FsYygxZW0gKyAycHgpLFxuICAgICAgICBjYWxjKDEwMCUgLSAyLjVlbSkgMC41ZW07XG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXk6IGNlbnRlcjtcbiAgICAgIGJhY2tncm91bmQtc2l6ZTpcbiAgICAgICAgNXB4IDVweCxcbiAgICAgICAgNXB4IDVweCxcbiAgICAgICAgMXB4IDEuNWVtO1xuICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICAgIG91dGxpbmU6IDA7XG4gICAgICBwYWRkaW5nLXJpZ2h0OiAxLjVyZW07XG4gICAgICBtYXJnaW4tcmlnaHQ6IC43cmVtO1xuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICB9XG5cbiAgICAuY2l0ZS1ncmFwaGljIHtcbiAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgIHdpZHRoOiAzMyU7XG4gICAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICAgIH1cblxuICAgIC5jaXRhdGlvbiAuaGVhZGVyLWRvdHMge1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgYWxpZ24taXRlbXM6IHN0YXJ0O1xuICAgICAgcGFkZGluZy1ib3R0b206IDEuMjVyZW07XG4gICAgICBwYWRkaW5nLXRvcDogLjI1cmVtO1xuICAgIH1cblxuICAgIC5jaXRlLWNvbGxlY3Rpb24ge1xuICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgd2lkdGg6IDY3JTtcbiAgICAgIHBhZGRpbmc6IDJyZW07XG4gICAgICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkO1xuICAgIH1cblxuICAgIC5jaXRlLWNvbGxlY3Rpb24gaDIsXG4gICAgLmNvbGxlY3Rpb24taGlnaGxpZ2h0cyBoMiB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1kZWZhdWx0LXByaW1hcnktY29sb3IpO1xuICAgICAgbWFyZ2luLXRvcDogMC41cmVtO1xuICAgIH1cblxuICAgIC5jaXRlLWNvbGxlY3Rpb24gcCB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAzcmVtO1xuICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICB9XG5cbiAgICBAbWVkaWEgKG1heC13aWR0aDogNzU2cHgpIHtcbiAgICAgIC5jaXRlLWNvbGxlY3Rpb24ge1xuICAgICAgICB3aWR0aDogODUlO1xuICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xuICAgICAgLmNpdGF0aW9uIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHBhZGRpbmc6IDJyZW0gMDtcbiAgICAgIH1cblxuICAgICAgLmNpdGUtZ3JhcGhpYyB7XG4gICAgICAgIHdpZHRoOiA3MCU7XG4gICAgICB9XG5cbiAgICAgIC5jaXRlLWNvbGxlY3Rpb24ge1xuICAgICAgICAvKiBwYWRkaW5nLXRvcDogMDsgKi9cbiAgICAgICAgd2lkdGg6IDk1JTtcbiAgICAgICAgcGFkZGluZzogMXJlbTtcbiAgICAgIH1cblxuICAgICAgLmNpdGUtY29sbGVjdGlvbiBoMiB7IFxuICAgICAgICBmb250LXdlaWdodDogODAwO1xuICAgICAgICBmb250LXNpemU6IDEuN3JlbTtcbiAgICAgIH1cblxuICAgICAgLmNpdGF0aW9uLXRleHQge1xuICAgICAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuNztcbiAgICAgIH1cbiAgICB9XG5cbjwvc3R5bGU+XG48ZGl2IGNsYXNzPVwiY2l0YXRpb25cIj5cbiAgPGRpdiBjbGFzcz1cImNpdGUtZ3JhcGhpY1wiPlxuICAgIDxpbWcgc3JjPVwiL2ltYWdlcy93YXRlcmNvbG9ycy9jaXRhdGlvbi13YXRlcmNvbG9yLTgwMHB4LWxhbmRzY2FwZS5wbmdcIiB3aWR0aD1cIjEwMCVcIiBhbHQ9XCJjaXRlIHRoaXMgY29sbGVjdGlvbiBpbWFnZVwiIC8+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiY2l0ZS1jb2xsZWN0aW9uXCI+XG4gICAgPGgyPkNpdGUgVGhpcyAke3RoaXMuY2l0YXRpb25UeXBlTGFiZWx9PC9oMj5cblxuICAgICR7IFNoYXJlZEh0bWwuaGVhZGVyRG90cygpIH1cblxuICAgIDxwIGNsYXNzPVwiY2l0YXRpb24tdGV4dFwiPlxuICAgICAgJHt1bnNhZmVIVE1MKHRoaXMuc2VsZWN0ZWRDaXRhdGlvbi50ZXh0KX1cbiAgICA8L3A+XG5cbiAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDtcIj5cbiAgICAgIDxzZWxlY3QgY2xhc3M9XCJidG4gYnRuLWFwYVwiIEBjaGFuZ2U9XCIke3RoaXMuX2NpdGVDaGFuZ2V9XCI+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJhcGFcIj5BUEE8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm1sYVwiPk1MQTwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiY2hpY2Fnb1wiPkNoaWNhZ288L29wdGlvbj5cbiAgICAgIDwvc2VsZWN0PlxuICAgICAgPGRpdiBjbGFzcz1cImJ0biBidG4tY29weVwiIEBjbGljaz1cIiR7dGhpcy5fY29weUNpdGVUZXh0fVwiPkNvcHkgVGV4dDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGFwcC10b2FzdC1wb3B1cD48L2FwcC10b2FzdC1wb3B1cD5cbjwvZGl2PlxuYDt9XG4iLCJpbXBvcnQgeyBMaXRFbGVtZW50fSBmcm9tICdsaXQnO1xuXG5pbXBvcnQgcmVuZGVyIGZyb20gJy4vbW9kYWwtb3ZlcmxheS50cGwuanMnO1xuXG5pbXBvcnQgXCJAdWNkLWxpYi90aGVtZS1lbGVtZW50cy91Y2RsaWIvdWNkbGliLWljb24vdWNkbGliLWljb25cIjtcbmltcG9ydCAnLi4vdXRpbHMvYXBwLWljb25zLmpzJztcblxuLyoqXG4gKiBAY2xhc3MgTW9kYWxPdmVybGF5XG4gKiBAZGVzY3JpcHRpb24gbW9kYWwgb3ZlcmxheSBjb21wb25lbnRcbiAqL1xuZXhwb3J0IGNsYXNzIE1vZGFsT3ZlcmxheSBleHRlbmRzIExpdEVsZW1lbnQge1xuXG4gIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGUgOiB7IHR5cGUgOiBTdHJpbmcgfSxcbiAgICAgIGNvbnRlbnQgOiB7IHR5cGUgOiBTdHJpbmcgfSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy50aXRsZSA9ICcnO1xuICAgIHRoaXMuY29udGVudCA9ICcnO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgaWYoICF0aGlzLnZpc2libGUgKSByZXR1cm47XG5cbiAgICAgIGlmKCBlLmtleSA9PT0gJ0VzY2FwZScgfHwgZS5rZXkgPT09ICdFc2MnKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuX29uT2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbk9rXG4gICAqIEBkZXNjcmlwdGlvbiBkaXNtaXNzIG1vZGFsXG4gICAqXG4gICAqL1xuICBfb25PayhlKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KCdvaycsIHt9KVxuICAgICk7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhcHAtbW9kYWwtb3ZlcmxheScsIE1vZGFsT3ZlcmxheSk7XG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSBcImxpdFwiO1xuaW1wb3J0IHsgdW5zYWZlSFRNTCB9IGZyb20gJ2xpdC9kaXJlY3RpdmVzL3Vuc2FmZS1odG1sLmpzJztcbmltcG9ydCB7IGlmRGVmaW5lZCB9IGZyb20gJ2xpdC9kaXJlY3RpdmVzL2lmLWRlZmluZWQuanMnO1xuXG5pbXBvcnQgeyBzaGFyZWRTdHlsZXMgfSBmcm9tICcuLi9zdHlsZXMvc2hhcmVkLXN0eWxlcyc7XG5pbXBvcnQgYnV0dG9uc0NzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy8yX2Jhc2VfY2xhc3MvX2J1dHRvbnMuY3NzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgcmV0dXJuIGh0bWxgXG4gICAgPHN0eWxlPlxuICAgICAgJHtzaGFyZWRTdHlsZXN9XG4gICAgICAke2J1dHRvbnNDc3N9XG5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG5cbiAgICAgIFtoaWRkZW5dIHtcbiAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgfVxuXG4gICAgICAuY29udGFpbmVyIHtcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHotaW5kZXg6IDEwMDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC41KTtcbiAgICAgIH1cblxuICAgICAgLmNvbnRhaW5lci5lcnJvci1tb2RlIC5vdmVybGF5IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItZG91YmxlLWRlY2tlcik7XG4gICAgICB9XG5cbiAgICAgIC5jb250YWluZXIuZXJyb3ItbW9kZSAub3ZlcmxheSBoNCxcbiAgICAgIC5jb250YWluZXIuZXJyb3ItbW9kZSAub3ZlcmxheSBwLFxuICAgICAgLmNvbnRhaW5lci5lcnJvci1tb2RlIC5vdmVybGF5IGEge1xuICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICB9XG5cbiAgICAgIC5jb250YWluZXIuZXJyb3ItbW9kZSAub3ZlcmxheSAuaGVhZGVyLXNlY3Rpb24gdWNkbGliLWljb24ge1xuICAgICAgICBmaWxsOiB3aGl0ZTtcbiAgICAgIH1cblxuICAgICAgLm92ZXJsYXkge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgICAgICBwYWRkaW5nOiAycmVtO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgd2lkdGg6IDYwJTtcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgICBtYXgtd2lkdGg6IDY1MHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgICAgIH1cblxuICAgICAgLm92ZXJsYXkgaDQge1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICB9XG5cbiAgICAgIC5vdmVybGF5IC5oZWFkZXItc2VjdGlvbiB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDFyZW07XG4gICAgICAgIGJvcmRlci1ib3R0b206IDRweCBkb3R0ZWQgdmFyKC0tY29sb3ItYWdnaWUtZ29sZCk7XG4gICAgICB9XG5cbiAgICAgIC5vdmVybGF5IC5oZWFkZXItc2VjdGlvbiBoNCB7XG4gICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgfVxuXG4gICAgICAub3ZlcmxheSAuaGVhZGVyLXNlY3Rpb24gdWNkbGliLWljb24ge1xuICAgICAgICBmbGV4LXNocmluazogMDtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBmaWxsOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTgwKTtcbiAgICAgICAgd2lkdGg6IDEuNXJlbTtcbiAgICAgICAgaGVpZ2h0OiAxLjVyZW07XG4gICAgICB9XG5cbiAgICAgIC5vdmVybGF5IC5oZWFkZXItc2VjdGlvbiB1Y2RsaWItaWNvbjpob3ZlciB7XG4gICAgICAgIGZpbGw6IHZhcigtLWNvbG9yLWFnZ2llLWdvbGQpO1xuICAgICAgfVxuXG4gICAgICAub3ZlcmxheSAuZm9vdGVyLXNlY3Rpb24ge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBwYWRkaW5nLXRvcDogMXJlbTtcbiAgICAgIH1cblxuICAgICAgLm92ZXJsYXkgLmZvb3Rlci1idXR0b25zIGJ1dHRvbiB7XG4gICAgICAgIGZvbnQtc2l6ZTogLjlyZW07XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAuNnJlbTtcbiAgICAgIH1cblxuICAgICAgLmZvb3Rlci1idXR0b25zIGEuYnRuLS1wcmltYXJ5IHtcbiAgICAgICAgcGFkZGluZy10b3A6IDA7XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAwO1xuICAgICAgICBtYXJnaW4tbGVmdDogMC41cmVtO1xuICAgICAgICBmb250LXNpemU6IC45cmVtO1xuICAgICAgfVxuXG4gICAgICBidXR0b24ub2sge1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDFyZW07XG4gICAgICB9XG5cbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xuICAgICAgICAub3ZlcmxheSAuZm9vdGVyLXNlY3Rpb24ge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG5cbiAgICAgICAgLm92ZXJsYXkgLmZvb3Rlci1zZWN0aW9uIC5mb290ZXItYnV0dG9ucyB7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uLXJldmVyc2U7XG4gICAgICAgIH1cblxuICAgICAgICAub3ZlcmxheSAuZm9vdGVyLWJ1dHRvbnMgYnV0dG9uIHtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogMDtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgLmJ0bi0tcHJpbWFyeTpiZWZvcmUsXG4gICAgICAgIC5idG4tLWludmVydDpiZWZvcmUge1xuICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IC4zcmVtO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXSB7XG4gICAgICAgIGhlaWdodDogMXJlbTtcbiAgICAgICAgd2lkdGg6IDFyZW07XG4gICAgICB9XG4gICAgPC9zdHlsZT5cblxuXG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm92ZXJsYXlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1zZWN0aW9uXCI+XG4gICAgICAgICAgPGg0PiR7dGhpcy50aXRsZX08L2g0PlxuICAgICAgICAgIDxkaXY+PHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS14bWFya1wiIEBjbGljaz1cIiR7dGhpcy5fb25Pa31cIj48L3VjZGxpYi1pY29uPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJvZHktc2VjdGlvblwiPlxuICAgICAgICAgICR7dW5zYWZlSFRNTCh0aGlzLmNvbnRlbnQpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvb3Rlci1zZWN0aW9uXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvb3Rlci1idXR0b25zXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi0tcHJpbWFyeSBva1wiIEBjbGljaz1cIiR7dGhpcy5fb25Pa31cIj5Hb3QgaXQhPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGA7XG59XG4iLCJpbXBvcnQgeyBMaXRFbGVtZW50fSBmcm9tICdsaXQnO1xuaW1wb3J0IHJlbmRlciBmcm9tIFwiLi9hcHAtY29sbGVjdGlvbi50cGwuanNcIjtcbmltcG9ydCB7TWFpbkRvbUVsZW1lbnR9IGZyb20gJ0B1Y2QtbGliL3RoZW1lLWVsZW1lbnRzL3V0aWxzL21peGlucyc7XG5cbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbmltcG9ydCBcIkB1Y2QtbGliL3RoZW1lLWVsZW1lbnRzL3VjZGxpYi91Y2RsaWItaWNvbi91Y2RsaWItaWNvblwiO1xuaW1wb3J0IFwiQHVjZC1saWIvdGhlbWUtZWxlbWVudHMvYnJhbmQvdWNkLXRoZW1lLXNsaW0tc2VsZWN0L3VjZC10aGVtZS1zbGltLXNlbGVjdC5qc1wiO1xuXG5pbXBvcnQgXCIuLi8uLi9jb21wb25lbnRzL2NhcmRzL2RhbXMtaXRlbS1jYXJkXCI7XG5pbXBvcnQgJy4uLy4uL2NvbXBvbmVudHMvY2l0YXRpb24nO1xuaW1wb3J0ICcuLi8uLi9jb21wb25lbnRzL21vZGFsLW92ZXJsYXkuanMnO1xuXG5pbXBvcnQgdXNlciBmcm9tICcuLi8uLi8uLi9saWIvdXRpbHMvdXNlci5qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vLi4vLi4vbGliL3V0aWxzL2luZGV4LmpzJztcblxuY2xhc3MgQXBwQ29sbGVjdGlvbiBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpXG4gIC53aXRoKE1haW5Eb21FbGVtZW50LCBMaXRDb3JrVXRpbHMpIHtcblxuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbGxlY3Rpb25JZCA6IHsgdHlwZSA6IFN0cmluZyB9LFxuICAgICAgLy8gYWRtaW5SZW5kZXJlZCA6IHsgdHlwZSA6IEJvb2xlYW4gfSxcbiAgICAgIGRlc2NyaXB0aW9uIDogeyB0eXBlIDogU3RyaW5nIH0sXG4gICAgICB0aXRsZSA6IHsgdHlwZSA6IFN0cmluZyB9LFxuICAgICAgdGh1bWJuYWlsVXJsIDogeyB0eXBlIDogU3RyaW5nIH0sXG4gICAgICB0aHVtYm5haWxVcmxPdmVycmlkZSA6IHsgdHlwZSA6IFN0cmluZyB9LFxuICAgICAgY2FsbE51bWJlciA6IHsgdHlwZSA6IFN0cmluZyB9LFxuICAgICAgc3ViamVjdHMgOiB7IHR5cGUgOiBBcnJheSB9LFxuICAgICAgbWF0ZXJpYWwgOiB7IHR5cGUgOiBTdHJpbmcgfSxcbiAgICAgIGxhbmd1YWdlcyA6IHsgdHlwZSA6IEFycmF5IH0sXG4gICAgICBsb2NhdGlvbiA6IHsgdHlwZSA6IFN0cmluZyB9LFxuICAgICAgaXRlbXMgOiB7IHR5cGUgOiBOdW1iZXIgfSxcbiAgICAgIHB1Ymxpc2hlZERhdGVSYW5nZSA6IHsgdHlwZSA6IFN0cmluZyB9LFxuICAgICAgaGlnaGxpZ2h0ZWRJdGVtcyA6IHsgdHlwZSA6IEFycmF5IH0sXG4gICAgICBzYXZlZEl0ZW1zIDogeyB0eXBlIDogQXJyYXkgfSxcbiAgICAgIGRic3luYyA6IHsgdHlwZSA6IE9iamVjdCB9LFxuICAgICAgd2F0ZXJjb2xvciA6IHsgdHlwZSA6IFN0cmluZyB9LFxuICAgICAgd2F0ZXJjb2xvckJnVXJsIDogeyB0eXBlIDogU3RyaW5nIH0sXG4gICAgICB3YXRlcmNvbG9yRmdVcmwgOiB7IHR5cGUgOiBTdHJpbmcgfSxcbiAgICAgIGRpc3BsYXlEYXRhIDogeyB0eXBlIDogQXJyYXkgfSxcbiAgICAgIC8vIGlzQWRtaW4gOiB7IHR5cGUgOiBCb29sZWFuIH0sXG4gICAgICBpc1VpQWRtaW4gOiB7IHR5cGUgOiBCb29sZWFuIH0sXG4gICAgICBlZGl0TW9kZSA6IHsgdHlwZSA6IEJvb2xlYW4gfSxcbiAgICAgIGl0ZW1Db3VudCA6IHsgdHlwZSA6IE51bWJlciB9LFxuICAgICAgY29sbGVjdGlvblNlYXJjaEhyZWYgOiB7dHlwZTogU3RyaW5nfSxcbiAgICAgIGNpdGF0aW9uUm9vdCA6IHsgdHlwZTogT2JqZWN0IH0sXG4gICAgICBpdGVtRGVmYXVsdERpc3BsYXkgOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgaXRlbUVkaXRzIDogeyB0eXBlOiBBcnJheSB9LFxuICAgICAgc2hvd0Rpc2NsYWltZXIgOiB7IHR5cGU6IEJvb2xlYW4gfSxcbiAgICAgIHNob3dNb2RhbCA6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgICAgbW9kYWxUaXRsZSA6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgICBtb2RhbENvbnRlbnQgOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuXG4gICAgdGhpcy5hcHBEYXRhTG9hZGVkID0gZmFsc2U7XG4gICAgdGhpcy5yZXNldCgpO1xuXG4gICAgdGhpcy5faW5qZWN0TW9kZWwoJ0FwcFN0YXRlTW9kZWwnLCAnQ29sbGVjdGlvbk1vZGVsJywgJ1JlY29yZE1vZGVsJywgJ0ZjQXBwQ29uZmlnTW9kZWwnLCAnU2VvTW9kZWwnKTtcbiAgfVxuXG4gIGFzeW5jIGZpcnN0VXBkYXRlZCgpIHtcbiAgICB0aGlzLl9vbkFwcFN0YXRlVXBkYXRlKGF3YWl0IHRoaXMuQXBwU3RhdGVNb2RlbC5nZXQoKSk7XG4gICAgLy8gdGhpcy5fb25Db2xsZWN0aW9uVXBkYXRlKGF3YWl0IHRoaXMuQ29sbGVjdGlvbk1vZGVsLmdldCh0aGlzLkFwcFN0YXRlTW9kZWwubG9jYXRpb24ucGF0aG5hbWUpKTtcblxuICAgIHRoaXMuX3VwZGF0ZVNsaW1TdHlsZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbkFwcFN0YXRlVXBkYXRlXG4gICAqIEBkZXNjcmlwdGlvbiBvbiB0aGUgQXBwIHVwZGF0ZSwgdGhlIHN0YXRlIGlzIGRldGVybWluZWQgYW5kIGJ5IGNoZWNraW5nXG4gICAqIHRoZSBsb2NhdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZVxuICAgKi9cbiAgIGFzeW5jIF9vbkFwcFN0YXRlVXBkYXRlKGUpIHtcbiAgICBpZiggdGhpcy5BcHBTdGF0ZU1vZGVsLmxvY2F0aW9uLnBhZ2UgIT09ICdjb2xsZWN0aW9uJyApIHtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYoIHRoaXMuY29sbGVjdGlvbklkID09PSBlLmxvY2F0aW9uLnBhdGhuYW1lICkgcmV0dXJuO1xuICAgIHRoaXMucmVzZXQoKTtcblxuICAgIHRoaXMuX3VwZGF0ZVNsaW1TdHlsZXMoKTtcbiAgICB0aGlzLmNvbGxlY3Rpb25JZCA9IGUubG9jYXRpb24ucGF0aG5hbWU7XG5cbiAgICB0cnkge1xuICAgICAgbGV0IHJlY29yZERhdGEgPSBhd2FpdCB0aGlzLkNvbGxlY3Rpb25Nb2RlbC5nZXQodGhpcy5jb2xsZWN0aW9uSWQpO1xuICAgICAgdGhpcy5vbkNvbGxlY3Rpb25VcGRhdGUocmVjb3JkRGF0YSk7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgIG5ldyBDdXN0b21FdmVudChcInNob3ctNDA0XCIsIHt9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLnNob3dNb2RhbCA9IGZhbHNlO1xuICAgIC8vIGlmIHBhZ2UgcGF0aCBoYXMgJz9mcm9tPXYxJywgc2hvdyBtb2RhbCB3aXRoIHdhcm5pbmcgb2YgdXJsIGNoYW5nZXMgaW4gbmV3IHNpdGVcbiAgICBpZiggdGhpcy5BcHBTdGF0ZU1vZGVsLmxvY2F0aW9uLmZ1bGxwYXRoLmluY2x1ZGVzKCc/ZnJvbT12MScpICkge1xuICAgICAgdGhpcy5zaG93TW9kYWwgPSB0cnVlO1xuICAgIH0gICAgXG4gIH1cblxuICBfb25Nb2RhbENsb3NlKGUpIHtcbiAgICB0aGlzLkFwcFN0YXRlTW9kZWwuc2V0TG9jYXRpb24odGhpcy5jb2xsZWN0aW9uSWQpO1xuICAgIHRoaXMuc2hvd01vZGFsID0gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIG9uQ29sbGVjdGlvblVwZGF0ZVxuICAgKiBAZGVzY3JpcHRpb24gZmlyZWQgd2hlbiBjb2xsZWN0aW9uIHVwZGF0ZXNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGVcbiAgICovXG4gICBhc3luYyBvbkNvbGxlY3Rpb25VcGRhdGUoZSkge1xuICAgIGlmKCB0aGlzLkFwcFN0YXRlTW9kZWwubG9jYXRpb24ucGFnZSAhPT0gJ2NvbGxlY3Rpb24nICkgcmV0dXJuO1xuXG4gICAgLy8gVE9ETzogbWFrZSBwcm9wZXIgNDA0XG4gICAgaWYoIGUuc3RhdGUgPT09ICdlcnJvcicgJiYgZS5lcnJvci5kZXRhaWxzLm1lc3NhZ2UgPT09ICdudWxsIGJvZHkgcmVzcG9uc2UgZnJvbSBzZXJ2aWNlJyApIHtcbiAgICAgIC8vIHRoaXMuZGlzcGF0Y2hFdmVudChcbiAgICAgIC8vICAgbmV3IEN1c3RvbUV2ZW50KFwic2hvdy00MDRcIiwge30pXG4gICAgICAvLyApO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLyc7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYoIGUuc3RhdGUgIT09ICdsb2FkZWQnICkgcmV0dXJuO1xuICAgIFxuICAgIGF3YWl0IHRoaXMuX3BhcnNlRGlzcGxheURhdGEoKTtcbiAgICBsZXQgc2VhcmNoT2JqID0gdGhpcy5SZWNvcmRNb2RlbC5lbXB0eVNlYXJjaERvY3VtZW50KCk7XG4gICAgdGhpcy5SZWNvcmRNb2RlbC5hcHBlbmRLZXl3b3JkRmlsdGVyKHNlYXJjaE9iaiwgJ0BncmFwaC5pc1BhcnRPZi5AaWQnLCBlLnZjRGF0YS5pZCk7XG4gICAgdGhpcy5jb2xsZWN0aW9uU2VhcmNoSHJlZiA9ICcvc2VhcmNoLycrdGhpcy5SZWNvcmRNb2RlbC5zZWFyY2hEb2N1bWVudFRvVXJsKHNlYXJjaE9iaik7XG5cbiAgICB0aGlzLmNvbGxlY3Rpb25JZCA9IGUudmNEYXRhLmlkO1xuXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGUudmNEYXRhLmRlc2NyaXB0aW9uXG4gICAgdGhpcy50aXRsZSA9IGUudmNEYXRhLnRpdGxlO1xuXG4gICAgaWYoICF0aGlzLnRodW1ibmFpbFVybE92ZXJyaWRlICkge1xuICAgICAgdGhpcy50aHVtYm5haWxVcmwgPSBlLnZjRGF0YS5pbWFnZXM/Lm1lZGl1bT8udXJsIHx8IGUudmNEYXRhLmltYWdlcz8ub3JpZ2luYWw/LnVybCB8fCAnJztcbiAgICB9XG4gICAgaWYoICF0aGlzLnRodW1ibmFpbFVybCApIHtcbiAgICAgIHRoaXMudGh1bWJuYWlsVXJsID0gJy9pbWFnZXMvdHJlZS1iaWtlLWlsbHVzdHJhdGlvbi5wbmcnO1xuICAgIH1cblxuICAgIGlmKCAhdGhpcy53YXRlcmNvbG9yICkge1xuICAgICAgdGhpcy53YXRlcmNvbG9yID0gJ3Jvc2UnO1xuICAgICAgdGhpcy53YXRlcmNvbG9yQmdVcmwgPSAnL2ltYWdlcy93YXRlcmNvbG9ycy9jb2xsZWN0aW9uLXdhdGVyY29sb3ItJyArIHRoaXMud2F0ZXJjb2xvciArICctYmFjay13aGl0ZS5qcGcnO1xuICAgICAgdGhpcy53YXRlcmNvbG9yRmdVcmwgPSAnL2ltYWdlcy93YXRlcmNvbG9ycy9jb2xsZWN0aW9uLXdhdGVyY29sb3ItJyArIHRoaXMud2F0ZXJjb2xvciArICctZnJvbnQucG5nJzsgIFxuICAgIH1cblxuICAgIC8vIHNldCBiYWNrZ3JvdW5kIGltYWdlXG4gICAgbGV0IGZlYXR1cmVkSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlYXR1cmVkLWltYWdlJyk7XG4gICAgaWYoIGZlYXR1cmVkSW1hZ2VFbGVtZW50ICYmIHRoaXMudGh1bWJuYWlsVXJsT3ZlcnJpZGUgKSB7XG4gICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICBpbWcuc3JjID0gdGhpcy50aHVtYm5haWxVcmxPdmVycmlkZTtcbiAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZmVhdHVyZWRJbWFnZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke3RoaXMuc3JjfSlgO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKCBmZWF0dXJlZEltYWdlRWxlbWVudCApIHtcbiAgICAgIGZlYXR1cmVkSW1hZ2VFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHt0aGlzLnRodW1ibmFpbFVybH0pYDtcbiAgICB9XG5cbiAgICBsZXQgcm9vdCA9IGUucGF5bG9hZC5yb290IHx8IHt9O1xuICAgIHRoaXMuY2FsbE51bWJlciA9IGUudmNEYXRhLmNhbGxOdW1iZXI7XG4gICAgdGhpcy5zdWJqZWN0cyA9IChlLnZjRGF0YS5zdWJqZWN0cyB8fCBbXSk7XG4gICAgdGhpcy5tYXRlcmlhbCA9IHJvb3QubWF0ZXJpYWwgfHwgJyc7XG4gICAgdGhpcy5sYW5ndWFnZXMgPSAhQXJyYXkuaXNBcnJheShyb290Lmxhbmd1YWdlIHx8IFtdKSA/IFtyb290Lmxhbmd1YWdlXSA6IHJvb3QubGFuZ3VhZ2U7XG4gICAgdGhpcy5sb2NhdGlvbiA9IHJvb3QubG9jYXRpb24gfHwgJyc7XG4gICAgdGhpcy5pdGVtcyA9IHV0aWxzLmZvcm1hdE51bWJlcldpdGhDb21tYXMoZS52Y0RhdGEuY291bnQpO1xuICAgIHRoaXMucHVibGlzaGVkRGF0ZVJhbmdlID0gZS52Y0RhdGEucHVibGlzaGVkRGF0ZVJhbmdlO1xuXG4gICAgdGhpcy5jaXRhdGlvblJvb3QgPSByb290O1xuXG4gICAgaWYoIHRoaXMuYXBwRGF0YUxvYWRlZCAmJiAhdGhpcy5zYXZlZEl0ZW1zLmxlbmd0aCApIHtcbiAgICAgIHRoaXMuZ2V0TGF0ZXN0SXRlbXMoKTtcbiAgICB9IGVsc2UgaWYoIHRoaXMuc2F2ZWRJdGVtcy5sZW5ndGggKSB7XG4gICAgICB0aGlzLmhpZ2hsaWdodGVkSXRlbXMgPSB0aGlzLnNhdmVkSXRlbXM7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlRGlzcGxheURhdGEoKTtcbiAgfVxuXG4gIGFzeW5jIGdldExhdGVzdEl0ZW1zKCkge1xuICAgIGlmKCB0aGlzLmxvYWRpbmdMYXRlc3RJdGVtcyB8fCB0aGlzLmhpZ2hsaWdodGVkSXRlbXMubGVuZ3RoICkgcmV0dXJuO1xuXG4gICAgdGhpcy5sb2FkaW5nTGF0ZXN0SXRlbXMgPSB0cnVlO1xuICAgIC8vIGRlZmF1bHQgdG8gbW9zdCByZWNlbnQgaXRlbXMgYnkgeWVhciBwdWJsaXNoZWQgZGVzY2VuZGluZ1xuICAgIGxldCBoaWdobGlnaHRlZEl0ZW1zID0gYXdhaXQgdGhpcy5SZWNvcmRNb2RlbC5nZXRSZWNlbnRJdGVtcyh0aGlzLmNvbGxlY3Rpb25JZCwgdGhpcy5pdGVtQ291bnQpO1xuICAgIGlmKCBoaWdobGlnaHRlZEl0ZW1zLnJlc3BvbnNlLm9rICYmIGhpZ2hsaWdodGVkSXRlbXMuYm9keS5yZXN1bHRzLmxlbmd0aCApIHtcbiAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRJdGVtcyA9IGhpZ2hsaWdodGVkSXRlbXMuYm9keS5yZXN1bHRzLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAnQGlkJyA6IGl0ZW1bJ0BncmFwaCddWzBdWydAaWQnXSxcbiAgICAgICAgICBkZXNjcmlwdGlvbiA6IGl0ZW1bJ0BncmFwaCddWzBdLm5hbWUsXG4gICAgICAgICAgcG9zaXRpb24gOiBpbmRleCsxLFxuICAgICAgICAgIGltYWdlIDogaXRlbVsnQGdyYXBoJ11bMF0udGh1bWJuYWlsVXJsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5sb2FkaW5nTGF0ZXN0SXRlbXMgPSBmYWxzZTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuY29sbGVjdGlvbklkID0gJyc7XG4gICAgLy8gdGhpcy5hZG1pblJlbmRlcmVkID0gZmFsc2U7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9ICcnO1xuICAgIHRoaXMudGl0bGUgPSAnJztcbiAgICB0aGlzLnRodW1ibmFpbFVybCA9ICcnO1xuICAgIHRoaXMudGh1bWJuYWlsVXJsT3ZlcnJpZGUgPSAnJztcbiAgICB0aGlzLmNhbGxOdW1iZXIgPSAnJztcbiAgICB0aGlzLnN1YmplY3RzID0gW107XG4gICAgdGhpcy5tYXRlcmlhbCA9ICcnO1xuICAgIHRoaXMubGFuZ3VhZ2VzID0gW107XG4gICAgdGhpcy5sb2NhdGlvbiA9ICcnO1xuICAgIHRoaXMuaXRlbXMgPSAwO1xuICAgIHRoaXMucHVibGlzaGVkRGF0ZVJhbmdlID0gJyc7XG4gICAgdGhpcy5oaWdobGlnaHRlZEl0ZW1zID0gW107XG4gICAgdGhpcy5zYXZlZEl0ZW1zID0gW107XG4gICAgdGhpcy5kYnN5bmMgPSB7fTtcbiAgICB0aGlzLndhdGVyY29sb3IgPSAnJztcbiAgICB0aGlzLndhdGVyY29sb3JCZ1VybCA9ICcnO1xuICAgIHRoaXMud2F0ZXJjb2xvckZnVXJsID0gJyc7XG4gICAgdGhpcy5kaXNwbGF5RGF0YSA9IFtdO1xuICAgIC8vIHRoaXMuaXNBZG1pbiA9IHVzZXIuaGFzUm9sZSgnYWRtaW4nKTtcbiAgICB0aGlzLmlzVWlBZG1pbiA9IHVzZXIuY2FuRWRpdFVpKCk7XG4gICAgdGhpcy5lZGl0TW9kZSA9IGZhbHNlO1xuICAgIHRoaXMuaXRlbUNvdW50ID0gNjtcbiAgICB0aGlzLmNpdGF0aW9uUm9vdCA9IHt9O1xuICAgIHRoaXMuaXRlbURlZmF1bHREaXNwbGF5ID0gdXRpbHMuaXRlbURpc3BsYXlUeXBlLmJyVHdvUGFnZTsgLy8gb25lLCBsaXN0Li4gZm9yIGFkbWluIHByZWYgb24gQlIgZGlzcGxheSB0eXBlIGZvciBpdGVtcyBpbiB0aGlzIGNvbGxlY3Rpb25cbiAgICB0aGlzLml0ZW1FZGl0cyA9IFtdO1xuICAgIHRoaXMuc2hvd0Rpc2NsYWltZXIgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dNb2RhbCA9IGZhbHNlO1xuICAgIHRoaXMubW9kYWxUaXRsZSA9ICdXZWxjb21lIHRvIHRoZSBuZXcgRGlnaXRhbCBDb2xsZWN0aW9ucyEnO1xuICAgIHRoaXMubW9kYWxDb250ZW50ID0gYDxwPldlJ3ZlIHJlY2VudGx5IHVwZGF0ZWQgdGhpcyB3ZWJzaXRlLCBzbyBzb21lIHdlYnBhZ2UgYWRkcmVzc2VzIChVUkxzKSBtYXkgaGF2ZSBjaGFuZ2VkLiBQbGVhc2Ugc2VhcmNoIHdpdGhpbiB0aGlzIGNvbGxlY3Rpb24gZm9yIHRoZSBpdGVtIHlvdSdyZSBsb29raW5nIGZvci48L3A+IDxwPldlIGFwb2xvZ2l6ZSBmb3IgdGhlIGluY29udmVuaWVuY2UuPC9wPmA7XG5cbiAgICBsZXQgZmVhdHVyZWRJbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVhdHVyZWQtaW1hZ2UnKTtcbiAgICBpZiggZmVhdHVyZWRJbWFnZUVsZW1lbnQgKSBmZWF0dXJlZEltYWdlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAnJztcbiAgICBpZiggZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbGUtdXBsb2FkJyk/LnZhbHVlICkgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbGUtdXBsb2FkJykudmFsdWUgPSAnJztcbiAgfVxuXG4gIF9vbkl0ZW1EaXNwbGF5Q2hhbmdlKGUpIHtcbiAgICB0aGlzLml0ZW1Db3VudCA9IHBhcnNlSW50KGUuZGV0YWlsLnZhbHVlKTtcblxuICAgIGxldCBpdGVtSW5wdXRzID0gdGhpcy5fZ2V0SGlnaGxpZ2h0ZWRJdGVtSW5wdXRzKCk7XG4gICAgaXRlbUlucHV0cy5mb3JFYWNoKChpbnB1dCwgaW5kZXgpID0+IHtcbiAgICAgIGlmKCBpbmRleCsxID4gdGhpcy5pdGVtQ291bnQgKSB7XG4gICAgICAgIGlucHV0LnZhbHVlID0gJyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2F2ZWRJdGVtc1tpbmRleF07XG4gICAgICAgIGlmKCBpdGVtICkge1xuICAgICAgICAgIGlucHV0LnZhbHVlID0gaXRlbVsnQGlkJ10ucmVwbGFjZSgvXlxcL2l0ZW1cXC8vLCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLl9zc1NlbGVjdEJsdXIoKTtcbiAgICAgIHRoaXMuX3VwZGF0ZVNsaW1TdHlsZXMoKTtcbiAgICAgIHRoaXMuX3VwZGF0ZURpc3BsYXlEYXRhKCk7ICBcbiAgICB9KTtcbiAgfVxuXG4gIF9nZXRIaWdobGlnaHRlZEl0ZW1JbnB1dHMoKSB7XG4gICAgLy8gcGFyc2UgdG8gaW5wdXRzIGZvciB0aGUgc2VsY3RlZCBpdGVtIGNvdW50OiAwLCAxLCAyLCAzLCA2XG4gICAgbGV0IGl0ZW1JbnB1dHM7XG4gICAgaWYoIHRoaXMuaXRlbUNvdW50ID09PSAxICkge1xuICAgICAgaXRlbUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJkLXNpbmdsZSAuaXRlbS1hcmstaW5wdXQnKTtcbiAgICB9IGVsc2UgaWYoIHRoaXMuaXRlbUNvdW50ID09PSAyICkge1xuICAgICAgaXRlbUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJkLTIgLml0ZW0tYXJrLWlucHV0Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZW1JbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FyZC10cmlvIC5pdGVtLWFyay1pbnB1dCcpO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtSW5wdXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uRWRpdENsaWNrZWRcbiAgICogQGRlc2NyaXB0aW9uIGFkbWluIHVpLCBlZGl0IGJ1dHRvbiBjbGljayBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZVxuICAgKi9cbiAgX29uRWRpdENsaWNrZWQoZSkge1xuICAgIGlmKCAhdGhpcy5pc1VpQWRtaW4gKSByZXR1cm47XG4gICAgdGhpcy5fdXBkYXRlU2xpbVN0eWxlcygpO1xuICAgIHRoaXMuZWRpdE1vZGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uU2F2ZUNsaWNrZWRcbiAgICogQGRlc2NyaXB0aW9uIGFkbWluIHVpLCBzYXZlIGJ1dHRvbiBjbGljayBldmVudFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZVxuICAgKi9cbiAgYXN5bmMgX29uU2F2ZUNsaWNrZWQoZSkge1xuICAgIGlmKCAhdGhpcy5pc1VpQWRtaW4gKSByZXR1cm47XG5cbiAgICB0aGlzLmVkaXRNb2RlID0gZmFsc2U7XG5cbiAgICAvLyBwYXJzZSBoaWdobGlnaHRlZCBpdGVtc1xuICAgIHRoaXMuc2F2ZWRJdGVtcyA9IFtdO1xuICAgIGxldCBuZXdTYXZlZEl0ZW1zID0gW107XG4gICAgbGV0IGl0ZW1BcmtSZWdleCA9IC9eXFwvPyhpdGVtXFwvKT8oYXJrOlxcLyk/LztcblxuICAgIGxldCBpdGVtSW5wdXRzID0gdGhpcy5fZ2V0SGlnaGxpZ2h0ZWRJdGVtSW5wdXRzKCk7XG5cbiAgICBpdGVtSW5wdXRzLmZvckVhY2goKGlucHV0LCBpbmRleCkgPT4ge1xuICAgICAgaWYoIGlucHV0LnZhbHVlICkge1xuICAgICAgICBsZXQgdmFsID0gaW5wdXQudmFsdWUudHJpbSgpO1xuICAgICAgICBuZXdTYXZlZEl0ZW1zLnB1c2goe1xuICAgICAgICAgICdAaWQnIDogYC9pdGVtL2FyazovJHt2YWwucmVwbGFjZShpdGVtQXJrUmVnZXgsICcnKX1gLFxuICAgICAgICAgIHBvc2l0aW9uIDogaW5kZXgrMVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnNhdmVkSXRlbXMgPSBbLi4ubmV3U2F2ZWRJdGVtc107XG5cbiAgICBsZXQgZmVhdHVyZWRJbWFnZSA9ICcnO1xuICAgIGxldCBmaWxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXVwbG9hZCcpO1xuICAgIGlmKCBmaWxlRWxlbWVudD8uZmlsZXM/Lmxlbmd0aCApIHtcbiAgICAgIGZlYXR1cmVkSW1hZ2UgPSBmaWxlRWxlbWVudC5maWxlc1swXTtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlRGlzcGxheURhdGEoZmVhdHVyZWRJbWFnZSk7XG5cblxuICAgIGF3YWl0IHRoaXMuRmNBcHBDb25maWdNb2RlbC5zYXZlQ29sbGVjdGlvbkRpc3BsYXlEYXRhKHRoaXMuY29sbGVjdGlvbklkLCB0aGlzLmRpc3BsYXlEYXRhKTtcbiAgICBpZiggZmlsZUVsZW1lbnQgJiYgZmVhdHVyZWRJbWFnZSApIHtcbiAgICAgIGF3YWl0IHRoaXMuRmNBcHBDb25maWdNb2RlbC5zYXZlQ29sbGVjdGlvbkZlYXR1cmVkSW1hZ2UodGhpcy5jb2xsZWN0aW9uSWQsIGZlYXR1cmVkSW1hZ2UpO1xuICAgICAgZmlsZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB9XG5cbiAgICAvLyBwYXJzZSBjaGVja2VkIGl0ZW0gZXhjZXB0aW9ucyB0byByZXNldCB0aGVtIHRvIGNvbGxlY3Rpb24gZGVmYXVsdCBkaXNwbGF5IHR5cGVcbiAgICBsZXQgaXRlbUV4Y2VwdGlvbnMgPSBbXTtcbiAgICBsZXQgY2hlY2tib3hlcyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgnLmV4Y2VwdGlvbnMgaW5wdXRbbmFtZT1cImNoZWNrYm94XCJdJyk7XG4gICAgY2hlY2tib3hlcy5mb3JFYWNoKGNoZWNrYm94ID0+IHtcbiAgICAgIGlmKCAhY2hlY2tib3guY2hlY2tlZCApIHJldHVybjtcblxuICAgICAgbGV0IGl0ZW1JZCA9IGNoZWNrYm94LmRhdGFzZXQuaXRlbUlkO1xuICAgICAgaWYoIGl0ZW1JZCApIGl0ZW1FeGNlcHRpb25zLnB1c2goaXRlbUlkKTtcbiAgICB9KTtcblxuICAgIGlmKCBpdGVtRXhjZXB0aW9ucy5sZW5ndGggKSB7XG4gICAgICBhd2FpdCB0aGlzLkZjQXBwQ29uZmlnTW9kZWwudXBkYXRlSXRlbURpc3BsYXlFeGNlcHRpb25zKGl0ZW1FeGNlcHRpb25zLCB0aGlzLml0ZW1EZWZhdWx0RGlzcGxheSk7XG4gICAgfVxuXG4gICAgdGhpcy5BcHBTdGF0ZU1vZGVsLnNldExvY2F0aW9uKHRoaXMuY29sbGVjdGlvbklkKTtcbiAgICAvLyB0aGlzLl9wYXJzZURpc3BsYXlEYXRhKCk7XG4gICAgXG4gICAgLy8gcmVmcmVzaCB0aGlzLmhpZ2hsaWdodGVkSXRlbXNcbiAgICB0aGlzLmhpZ2hsaWdodGVkSXRlbXMgPSBbXTtcbiAgICBpZiggdGhpcy5zYXZlZEl0ZW1zLmxlbmd0aCApIHtcbiAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRJdGVtcyA9IHRoaXMuc2F2ZWRJdGVtcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXRMYXRlc3RJdGVtcygpO1xuICAgIH1cbiBcbiAgICB0aGlzLnJlcXVlc3RVcGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbkNhbmNlbEVkaXRDbGlja2VkXG4gICAqIEBkZXNjcmlwdGlvbiBhZG1pbiB1aSwgY2FuY2VsIGVkaXRpbmcgYnV0dG9uIGNsaWNrIGV2ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlXG4gICAqL1xuICBfb25DYW5jZWxFZGl0Q2xpY2tlZChlKSB7XG4gICAgaWYoICF0aGlzLmlzVWlBZG1pbiApIHJldHVybjtcbiAgICB0aGlzLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbGUtdXBsb2FkJykudmFsdWUgPSAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbldhdGVyY29sb3JDaGFuZ2VkXG4gICAqIEBkZXNjcmlwdGlvbiBhZG1pbiB1aSwgY2hhbmdlIHRvIGZlYXR1cmVkIGltYWdlIHdhdGVyY29sb3JcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGVcbiAgICovXG4gIF9vbldhdGVyY29sb3JDaGFuZ2VkKGUpIHtcbiAgICBpZiggIXRoaXMuaXNVaUFkbWluICkgcmV0dXJuO1xuICAgIHRoaXMud2F0ZXJjb2xvciA9IGUudGFyZ2V0LmNsYXNzTGlzdFswXTtcbiAgICB0aGlzLndhdGVyY29sb3JCZ1VybCA9ICcvaW1hZ2VzL3dhdGVyY29sb3JzL2NvbGxlY3Rpb24td2F0ZXJjb2xvci0nICsgdGhpcy53YXRlcmNvbG9yICsgJy1iYWNrLXdoaXRlLmpwZyc7XG4gICAgdGhpcy53YXRlcmNvbG9yRmdVcmwgPSAnL2ltYWdlcy93YXRlcmNvbG9ycy9jb2xsZWN0aW9uLXdhdGVyY29sb3ItJyArIHRoaXMud2F0ZXJjb2xvciArICctZnJvbnQucG5nJztcblxuICAgIHRoaXMuX3VwZGF0ZURpc3BsYXlEYXRhKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25EaXNjbGFpbWVyVG9nZ2xlXG4gICAqIEBkZXNjcmlwdGlvbiBhZG1pbiB1aSwgY2hhbmdlIHRvIHNob3cvaGlkZSBkaXNjbGFpbWVyIGZvciB0aGlzIGNvbGxlY3Rpb25cbiAgICovXG4gIF9vbkRpc2NsYWltZXJUb2dnbGUoZSkge1xuICAgIGlmKCAhdGhpcy5pc1VpQWRtaW4gKSByZXR1cm47XG4gICAgXG4gICAgdGhpcy5zaG93RGlzY2xhaW1lciA9IGUuY3VycmVudFRhcmdldC5jaGVja2VkO1xuICAgIC8vIHRoaXMuZGlzcGxheURhdGEuc2hvd0Rpc2NsYWltZXIgPSBlLmN1cnJlbnRUYXJnZXQuY2hlY2tlZDtcbiAgICB0aGlzLl91cGRhdGVEaXNwbGF5RGF0YSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uU2VsZWN0QWxsRXhjZXB0aW9uc0NoYW5nZVxuICAgKiBAZGVzY3JpcHRpb24gYWRtaW4gdWksIGNoYW5nZSB0byAnc2VsZWN0IGFsbCBleGNlcHRpb25zJyBjaGVja2JveFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZVxuICAgKi9cbiAgX29uU2VsZWN0QWxsRXhjZXB0aW9uc0NoYW5nZShlKSB7XG4gICAgbGV0IGNoZWNrZWQgPSBlLmN1cnJlbnRUYXJnZXQuY2hlY2tlZDtcbiAgICBpZiggIWNoZWNrZWQgKSByZXR1cm47XG5cbiAgICBsZXQgY2hlY2tib3hlcyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgnLmV4Y2VwdGlvbnMgaW5wdXRbbmFtZT1cImNoZWNrYm94XCJdJyk7XG4gICAgY2hlY2tib3hlcy5mb3JFYWNoKGNoZWNrYm94ID0+IHtcbiAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBfcGFyc2VEaXNwbGF5RGF0YSwgZ2V0IGFwcGxpY2F0aW9uIGNvbnRhaW5lciBkYXRhIHRvIHNldCBjb2xsZWN0aW9uIHNwZWNpZmljIGRpc3BsYXkgZGF0YSAod2F0ZXJjb2xvcnMsIGhpZ2hsaWdodGVkIGl0ZW1zLCBmZWF0dXJlZCBpbWFnZSlcbiAgICovXG4gIGFzeW5jIF9wYXJzZURpc3BsYXlEYXRhKCkge1xuICAgIGlmKCAhdGhpcy5jb2xsZWN0aW9uSWQgKSByZXR1cm47XG5cbiAgICBsZXQgZWRpdHM7XG4gICAgdHJ5IHtcbiAgICAgIGVkaXRzID0gYXdhaXQgdGhpcy5Db2xsZWN0aW9uTW9kZWwuZ2V0Q29sbGVjdGlvbkVkaXRzKHRoaXMuY29sbGVjdGlvbklkKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5sb2dnZXIud2FybignRXJyb3IgcmV0cmlldmluZyBjb2xsZWN0aW9uIGVkaXRzJywgZXJyb3IpO1xuICAgIH1cblxuICAgIGlmKCBlZGl0cy5zdGF0ZSAhPT0gJ2xvYWRlZCcgKSByZXR1cm47XG4gICAgaWYoICFPYmplY3Qua2V5cyhlZGl0cy5wYXlsb2FkKS5sZW5ndGggKSByZXR1cm47XG5cbiAgICBsZXQgY29sbGVjdGlvbkVkaXRzID0gZWRpdHMucGF5bG9hZD8uY29sbGVjdGlvbiB8fCB7fTtcbiAgICBsZXQgaXRlbUVkaXRzID0gZWRpdHMucGF5bG9hZD8uaXRlbXMgfHwge307XG5cbiAgICAvLyBzZXQgY29sbGVjdGlvbiBwcmVmc1xuICAgIHRoaXMud2F0ZXJjb2xvciA9IGNvbGxlY3Rpb25FZGl0cy53YXRlcmNvbG9ycz8uY3NzIHx8ICdyb3NlJztcbiAgICB0aGlzLndhdGVyY29sb3JCZ1VybCA9ICcvaW1hZ2VzL3dhdGVyY29sb3JzL2NvbGxlY3Rpb24td2F0ZXJjb2xvci0nICsgdGhpcy53YXRlcmNvbG9yICsgJy1iYWNrLXdoaXRlLmpwZyc7XG4gICAgdGhpcy53YXRlcmNvbG9yRmdVcmwgPSAnL2ltYWdlcy93YXRlcmNvbG9ycy9jb2xsZWN0aW9uLXdhdGVyY29sb3ItJyArIHRoaXMud2F0ZXJjb2xvciArICctZnJvbnQucG5nJztcblxuICAgIHRoaXMudGh1bWJuYWlsVXJsT3ZlcnJpZGUgPSBjb2xsZWN0aW9uRWRpdHMudGh1bWJuYWlsVXJsPy5bJ0BpZCddIHx8ICcnO1xuICAgIGlmKCB0aGlzLnRodW1ibmFpbFVybE92ZXJyaWRlICkge1xuICAgICAgLy8gcmVtb3ZlIGRvbWFpblxuICAgICAgbGV0IHVybCA9IG5ldyBVUkwodGhpcy50aHVtYm5haWxVcmxPdmVycmlkZSk7XG4gICAgICB0aGlzLnRodW1ibmFpbFVybE92ZXJyaWRlID0gdXJsPy5wYXRobmFtZTtcbiAgICB9XG5cbiAgICB0aGlzLml0ZW1Db3VudCA9IHR5cGVvZiBjb2xsZWN0aW9uRWRpdHMuaXRlbUNvdW50ID09PSAnbnVtYmVyJyA/IGNvbGxlY3Rpb25FZGl0cy5pdGVtQ291bnQgOiA2O1xuXG4gICAgdGhpcy5pdGVtRGVmYXVsdERpc3BsYXkgPSBjb2xsZWN0aW9uRWRpdHMuaXRlbURlZmF1bHREaXNwbGF5IHx8IHV0aWxzLml0ZW1EaXNwbGF5VHlwZS5iclR3b1BhZ2U7XG5cbiAgICB0aGlzLnNob3dEaXNjbGFpbWVyID0gY29sbGVjdGlvbkVkaXRzLnNob3dEaXNjbGFpbWVyIHx8IGZhbHNlO1xuXG4gICAgdGhpcy5zYXZlZEl0ZW1zID0gY29sbGVjdGlvbkVkaXRzLmV4YW1wbGVPZldvcmsgfHwgW107XG4gICAgaWYoICFBcnJheS5pc0FycmF5KHRoaXMuc2F2ZWRJdGVtcykgKSB0aGlzLnNhdmVkSXRlbXMgPSBbdGhpcy5zYXZlZEl0ZW1zXTtcbiAgICB0aGlzLnNhdmVkSXRlbXMuc29ydCgoYSxiKSA9PiBhLnBvc2l0aW9uIC0gYi5wb3NpdGlvbik7XG5cbiAgICAvLyBzZXQgaXRlbSBwcmVmc1xuICAgIHRoaXMuaXRlbUVkaXRzID0gT2JqZWN0LmVudHJpZXMoaXRlbUVkaXRzKS5tYXAoXG4gICAgICAoW2tleSwgdmFsdWVdKSA9PiAoeyBpZDoga2V5LCBsaW5rTGFiZWw6IGtleS5zcGxpdCgnLycpLnBvcCgpLCBkZWZhdWx0RGlzcGxheTogdmFsdWUuaXRlbURlZmF1bHREaXNwbGF5IH0pXG4gICAgKS5maWx0ZXIoaXRlbSA9PiBpdGVtLmRlZmF1bHREaXNwbGF5ICYmIGl0ZW0uZGVmYXVsdERpc3BsYXkgIT09IHRoaXMuaXRlbURlZmF1bHREaXNwbGF5KTtcblxuICAgIC8vIGhhY2sgZm9yIHJhZGlvcyBvY2Nhc2lvbmFsbHkgbm90IGJlaW5nIHNlbGVjdGVkLCBzdHlsZXMgY29taW5nIGZyb20gYnJhbmQgY3NzXG4gICAgaWYoIHRoaXMuaXRlbURlZmF1bHREaXNwbGF5ID09PSB1dGlscy5pdGVtRGlzcGxheVR5cGUuYnJUd29QYWdlICkgdGhpcy5xdWVyeVNlbGVjdG9yKCcjdHdvJykuY2hlY2tlZCA9IHRydWU7XG4gICAgaWYoIHRoaXMuaXRlbURlZmF1bHREaXNwbGF5ID09PSB1dGlscy5pdGVtRGlzcGxheVR5cGUuYnJPbmVQYWdlICkgdGhpcy5xdWVyeVNlbGVjdG9yKCcjb25lJykuY2hlY2tlZCA9IHRydWU7XG4gICAgaWYoIHRoaXMuaXRlbURlZmF1bHREaXNwbGF5ID09PSB1dGlscy5pdGVtRGlzcGxheVR5cGUuaW1hZ2VMaXN0ICkgdGhpcy5xdWVyeVNlbGVjdG9yKCcjbGlzdCcpLmNoZWNrZWQgPSB0cnVlO1xuXG4gICAgdGhpcy5hcHBEYXRhTG9hZGVkID0gdHJ1ZTtcbiAgICB0aGlzLl91cGRhdGVEaXNwbGF5RGF0YSgpO1xuICAgIHRoaXMucmVxdWVzdFVwZGF0ZSgpO1xuICB9XG5cbiAgX3VwZGF0ZURpc3BsYXlEYXRhKG5ld0ZpbGVVcGxvYWROYW1lPScnKSB7XG4gICAgbGV0IG9wdHMgPSB7XG4gICAgICB0aXRsZSA6IHRoaXMudGl0bGUsXG4gICAgICB3YXRlcmNvbG9yIDogdGhpcy53YXRlcmNvbG9yLFxuICAgICAgaXRlbUNvdW50IDogdGhpcy5pdGVtQ291bnQsXG4gICAgICBpdGVtRGVmYXVsdERpc3BsYXkgOiB0aGlzLml0ZW1EZWZhdWx0RGlzcGxheSxcbiAgICAgIHNhdmVkSXRlbXMgOiB0aGlzLnNhdmVkSXRlbXMsXG4gICAgICBuZXdGaWxlVXBsb2FkTmFtZSxcbiAgICAgIHRodW1ibmFpbFVybE92ZXJyaWRlIDogdGhpcy50aHVtYm5haWxVcmxPdmVycmlkZSxcbiAgICAgIHNob3dEaXNjbGFpbWVyIDogdGhpcy5zaG93RGlzY2xhaW1lclxuICAgIH07XG4gICAgdGhpcy5kaXNwbGF5RGF0YSA9IHRoaXMuRmNBcHBDb25maWdNb2RlbC5nZXRDb2xsZWN0aW9uRGlzcGxheURhdGEodGhpcy5jb2xsZWN0aW9uSWQsIG9wdHMpO1xuICB9XG5cbiAgX3VwZGF0ZVNsaW1TdHlsZXMoKSB7XG4gICAgbGV0IHNlbGVjdCA9IHRoaXMucXVlcnlTZWxlY3RvcigndWNkLXRoZW1lLXNsaW0tc2VsZWN0Jyk7XG4gICAgaWYoICFzZWxlY3QgKSByZXR1cm47XG5cbiAgICBsZXQgc3NNYWluID0gc2VsZWN0LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIi5zcy1tYWluXCIpO1xuICAgIGlmIChzc01haW4pIHtcbiAgICAgIHNzTWFpbi5zdHlsZS5ib3JkZXIgPSAnbm9uZSc7XG4gICAgICBzc01haW4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgICB9XG5cbiAgICBsZXQgc3NTaW5nbGUgPSBzZWxlY3Quc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLnNzLXNpbmdsZS1zZWxlY3RlZFwiKTtcbiAgICBpZiAoc3NTaW5nbGUpIHtcbiAgICAgIHNzU2luZ2xlLnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xuICAgICAgc3NTaW5nbGUuc3R5bGUuaGVpZ2h0ID0gXCI0OXB4XCI7XG4gICAgICBzc1NpbmdsZS5zdHlsZS5wYWRkaW5nTGVmdCA9IFwiMXJlbVwiO1xuICAgICAgc3NTaW5nbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTUwKVwiO1xuICAgICAgc3NTaW5nbGUuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzAnO1xuICAgICAgc3NTaW5nbGUuc3R5bGUuZm9udFdlaWdodCA9IFwiYm9sZFwiO1xuICAgICAgc3NTaW5nbGUuc3R5bGUuY29sb3IgPSBcInZhcigtLWNvbG9yLWFnZ2llLWJsdWUpXCI7XG4gICAgfVxuXG4gICAgbGV0IHNlYXJjaCA9IHNlbGVjdC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5zcy1zZWFyY2gnKTtcbiAgICBpZiggc2VhcmNoICkge1xuICAgICAgc2VhcmNoLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfc3NTZWxlY3RGb2N1c1xuICAgKiBAZGVzY3JpcHRpb24gc2xpbSBzZWxlY3QgZm9jdXMgY2hhbmdlLCBjb2xvciBzaG91bGQgYmUgZ29sZCBpZiBhY3RpdmUsIGJsdWUgaWYgbm90XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlXG4gICAqL1xuICBfc3NTZWxlY3RGb2N1cyhlKSB7XG4gICAgbGV0IHNzTWFpbiA9IGUuY3VycmVudFRhcmdldC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5zcy1tYWluJyk7XG4gICAgbGV0IHNzU2luZ2xlU2VsZWN0ZWQgPSBlLmN1cnJlbnRUYXJnZXQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcuc3Mtc2luZ2xlLXNlbGVjdGVkJyk7XG5cbiAgICBpZiggc3NTaW5nbGVTZWxlY3RlZD8uY2xhc3NMaXN0LnZhbHVlID09PSAnc3Mtc2luZ2xlLXNlbGVjdGVkIHNzLW9wZW4tYmVsb3cnICkge1xuICAgICAgc3NTaW5nbGVTZWxlY3RlZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI0ZGRjREMic7IC8vIGdvbGQtMzBcbiAgICAgIHNzTWFpbi5zdHlsZS5ib3JkZXJDb2xvciA9ICcjRkZCRjAwJzsgLy8gZ29sZFxuICAgIH0gZWxzZSB7XG4gICAgICBzc1NpbmdsZVNlbGVjdGVkLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjQjBEMEVEJzsgLy8gYmx1ZS01MFxuICAgICAgc3NNYWluLnN0eWxlLmJvcmRlckNvbG9yID0gJyNCMEQwRUQnOyAvLyBibHVlLTUwXG4gICAgfVxuXG4gICAgbGV0IHNlYXJjaCA9IHRoaXMucXVlcnlTZWxlY3RvcigndWNkLXRoZW1lLXNsaW0tc2VsZWN0Jyk/LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLnNzLXNlYXJjaCcpO1xuICAgIGlmKCBzZWFyY2ggKSB7XG4gICAgICBzZWFyY2guc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9zc1NlbGVjdEJsdXJcbiAgICogQGRlc2NyaXB0aW9uIHNsaW0gc2VsZWN0IGZvY3VzIGNoYW5nZSwgY29sb3Igc2hvdWxkIGJlIGdvbGQgaWYgYWN0aXZlLCBibHVlIGlmIG5vdFxuICAgKiBAcGFyYW0ge09iamVjdH0gZVxuICAgKi9cbiAgX3NzU2VsZWN0Qmx1cihlKSB7XG4gICAgbGV0IHNsaW1TZWxlY3QgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5oaWdobGlnaHQtZGlzcGxheS1zZWxlY3QnKTtcbiAgICBsZXQgc3NNYWluID0gc2xpbVNlbGVjdD8uc2hhZG93Um9vdD8ucXVlcnlTZWxlY3RvcignLnNzLW1haW4nKTtcbiAgICBsZXQgc3NTaW5nbGVTZWxlY3RlZCA9IHNsaW1TZWxlY3Q/LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLnNzLXNpbmdsZS1zZWxlY3RlZCcpO1xuXG4gICAgc3NTaW5nbGVTZWxlY3RlZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI0IwRDBFRCc7IC8vIGJsdWUtNTBcbiAgICBzc01haW4uc3R5bGUuYm9yZGVyQ29sb3IgPSAnI0IwRDBFRCc7IC8vIGJsdWUtNTBcbiAgfVxuXG4gIGFzeW5jIF9vbkZpbGVDaGFuZ2UoZSkge1xuICAgIGxldCBzZWxlY3RlZEZpbGVuYW1lID0gZS50YXJnZXQudmFsdWUuc3BsaXQoJ1xcXFwnKS5wb3AoKTtcbiAgICBpZiggIXNlbGVjdGVkRmlsZW5hbWUubGVuZ3RoICkgcmV0dXJuO1xuXG5cbiAgICAvLyByZXBsYWNlIGN1cnJlbnQgdGh1bWJuYWlsIHdpdGggbmV3IGltYWdlXG4gICAgbGV0IGZpbGUgPSBlLnRhcmdldC5maWxlc1swXTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVhdHVyZWQtaW1hZ2UnKS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcrd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSkrJyknO1xuICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhcHAtY29sbGVjdGlvbicsIEFwcENvbGxlY3Rpb24pO1xuIiwiaW1wb3J0IHsgaHRtbCwgdW5zYWZlQ1NTIH0gZnJvbSAnbGl0JztcblxuaW1wb3J0ICdAdWNkLWxpYi90aGVtZS1lbGVtZW50cy91Y2RsaWIvdWNkbGliLW1kL3VjZGxpYi1tZC5qcyc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi8uLi8uLi9saWIvdXRpbHMvaW5kZXguanMnO1xuXG5pbXBvcnQgeyBzaGFyZWRTdHlsZXMgfSBmcm9tIFwiLi4vLi4vc3R5bGVzL3NoYXJlZC1zdHlsZXNcIjtcbmltcG9ydCBTaGFyZWRIdG1sIGZyb20gJy4uLy4uL3V0aWxzL3NoYXJlZC1odG1sJztcbmltcG9ydCBsaW5rc0NzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy8xX2Jhc2VfaHRtbC9fbGlua3MuY3NzXCI7XG5pbXBvcnQgYnV0dG9uc0NzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy8yX2Jhc2VfY2xhc3MvX2J1dHRvbnMuY3NzXCI7XG5pbXBvcnQgaGVhZGluZ3NDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvMl9iYXNlX2NsYXNzL19oZWFkaW5ncy5jc3NcIjtcbmltcG9ydCBmb3Jtc0h0bWxDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvMV9iYXNlX2h0bWwvX2Zvcm1zLmNzc1wiO1xuaW1wb3J0IGZvcm1zQ3NzIGZyb20gXCJAdWNkLWxpYi90aGVtZS1zYXNzLzJfYmFzZV9jbGFzcy9fZm9ybXMuY3NzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHsgXG4gIHJldHVybiBodG1sYFxuICA8c3R5bGU+XG4gICAgJHtzaGFyZWRTdHlsZXN9XG4gICAgJHtsaW5rc0Nzc31cbiAgICAke2J1dHRvbnNDc3N9XG4gICAgJHtoZWFkaW5nc0Nzc31cbiAgICAke2Zvcm1zSHRtbENzc31cbiAgICAke2Zvcm1zQ3NzfVxuXG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBmb250LXNpemU6IC45cmVtO1xuICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgIH1cblxuICAgIFtoaWRkZW5dIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9XG5cbiAgICA6aG9zdCA+IGRpdiB7XG4gICAgICBwYWRkaW5nOiAwIDQwcHg7XG4gICAgfVxuXG4gICAgaDIge1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlKTtcbiAgICB9XG5cbiAgICBoMyB7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgIH1cblxuICAgIGFwcC1jb2xsZWN0aW9uIC50aXRsZS1zZWN0aW9uIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBtaW4taGVpZ2h0OiA0MnZ3O1xuICAgIH1cblxuICAgIGFwcC1jb2xsZWN0aW9uIC50aXRsZS1zZWN0aW9uID4gZGl2IHtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBwYWRkaW5nOiAycmVtO1xuICAgICAgd2lkdGg6IDUwJTtcbiAgICB9XG5cbiAgICBhcHAtY29sbGVjdGlvbiAuY29sbGVjdGlvbi1oZWFkZXIge1xuICAgICAgbWFyZ2luOiBhdXRvO1xuICAgIH1cblxuICAgIGFwcC1jb2xsZWN0aW9uIC5jb2xsZWN0aW9uLWhlYWRlciBoMSB7XG4gICAgICBtYXJnaW46IDAuNXJlbSAwO1xuICAgIH1cblxuICAgIC5jb2xsZWN0aW9uLWhlYWRlciBoMyB7XG4gICAgICBtYXJnaW46IDA7XG4gICAgfVxuXG4gICAgYS5idG4tLWFsdCB7XG4gICAgICBwYWRkaW5nLXRvcDogMDtcbiAgICAgIHBhZGRpbmctYm90dG9tOiAwO1xuICAgICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICB9XG5cbiAgICAuaW1hZ2Utb3ZlcmxheSB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB6LWluZGV4OiA0NTA7XG4gICAgfVxuXG4gICAgLndhdGVyY29sb3ItYmcge1xuICAgICAgei1pbmRleDogMTtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICByaWdodDogMDtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIG1hcmdpbjogYXV0bztcbiAgICB9XG5cbiAgICAuZmVhdHVyZWQtaW1hZ2Uge1xuICAgICAgei1pbmRleDogNTA7XG4gICAgICB0b3A6IDE3JTtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICByaWdodDogMDtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM1NmRlZyk7XG4gICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIHdpZHRoOiA3MCU7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgcGFkZGluZy10b3A6IDUyLjUlO1xuICAgIH1cblxuICAgIC53YXRlcmNvbG9yLWZnIHtcbiAgICAgIHotaW5kZXg6IDEwMDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICByaWdodDogMDtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIG1hcmdpbjogYXV0bztcbiAgICB9XG5cbiAgICAuY29udGVudC13YXJuaW5nIHtcbiAgICAgIHBhZGRpbmc6IDJyZW07XG4gICAgICBtYXJnaW4tdG9wOiAycmVtO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtZ29sZC0zMCk7XG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgfVxuXG4gICAgLmRpc2NsYWltZXItYWRtaW4tdG9nZ2xlIHtcbiAgICAgIG1hcmdpbi10b3A6IDJyZW07XG4gICAgfVxuXG4gICAgLmRldGFpbC1zZWN0aW9uIHtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjdyZW07XG4gICAgICB3aWR0aDogNjAlO1xuICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgfVxuXG4gICAgLmRlc2NyaXB0aW9uIHtcbiAgICAgIG1hcmdpbjogMCAwIDJyZW0gMDtcbiAgICB9XG5cbiAgICAuY29sbGVjdGlvbi1sYWJlbCB7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDAuM3JlbTtcbiAgICB9XG5cbiAgICAuY29sbGVjdGlvbi1oaWdobGlnaHRzIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG5cbiAgICAuY2FyZC0yLFxuICAgIC5jYXJkLTItNCB7XG4gICAgICB3aWR0aDogNzUlO1xuICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgfVxuICAgIC5jYXJkLXNpbmdsZSxcbiAgICAuY2FyZC0yLFxuICAgIC5jYXJkLTItNCxcbiAgICAuY2FyZC10cmlvLFxuICAgIC5jYXJkLTUtcGx1cyB7XG4gICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvO1xuICAgICAgZ3JpZC1nYXA6IHZhcigtLXNwYWNpbmctc20pO1xuICAgIH1cbiAgICAuY2FyZC1zaW5nbGUgZGFtcy1jb2xsZWN0aW9uLWNhcmQsXG4gICAgLmNhcmQtMiBkYW1zLWNvbGxlY3Rpb24tY2FyZCxcbiAgICAuY2FyZC0yLTQgZGFtcy1jb2xsZWN0aW9uLWNhcmQsXG4gICAgLmNhcmQtdHJpbyBkYW1zLWNvbGxlY3Rpb24tY2FyZCxcbiAgICAuY2FyZC01LXBsdXMgZGFtcy1jb2xsZWN0aW9uLWNhcmQge1xuICAgICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tc3BhY2luZy1kZWZhdWx0KTtcbiAgICB9XG5cbiAgICAuY29sbGVjdGlvbi1oaWdobGlnaHRzIGEuYnRuLS1wcmltYXJ5IHtcbiAgICAgIGNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlKTtcbiAgICAgIHBhZGRpbmctdG9wOiAuM3JlbTtcbiAgICAgIHBhZGRpbmctYm90dG9tOiAuM3JlbTtcbiAgICAgIG1hcmdpbjogM3JlbSAwIDNyZW07XG4gICAgICBoZWlnaHQ6IDIuNHJlbTtcbiAgICAgIG1pbi1oZWlnaHQ6IDIuNHJlbTtcbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNzY3cHgpIHtcbiAgICAgIC5jYXJkLTIsXG4gICAgICAuY2FyZC0yLTQge1xuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCBtaW5tYXgoMCwgMWZyKSk7XG4gICAgICB9XG4gICAgICAuY2FyZC1zaW5nbGUsXG4gICAgICAuY2FyZC10cmlvLFxuICAgICAgLmNhcmQtNS1wbHVzIHtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgbWlubWF4KDAsIDFmcikpO1xuICAgICAgfVxuICAgICAgLmNhcmQtc2luZ2xlIC5jb2xsZWN0aW9uLWl0ZW0sXG4gICAgICAuY2FyZC1zaW5nbGUgZGFtcy1pdGVtLWNhcmQge1xuICAgICAgICBncmlkLWNvbHVtbjogMjtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLmNhcmQtdHJpbyB7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gICAgICBhcHAtY29sbGVjdGlvbiAudGl0bGUtc2VjdGlvbiB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBvdmVyZmxvdy15OiAtd2Via2l0LXBhZ2VkLXg7XG4gICAgICAgIHBhZGRpbmctdG9wOiAzcmVtO1xuICAgICAgfVxuXG4gICAgICBhcHAtY29sbGVjdGlvbiAudGl0bGUtc2VjdGlvbiA+IGRpdiB7XG4gICAgICAgIHdpZHRoOiA4MCU7XG4gICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLmRldGFpbC1zZWN0aW9uIHtcbiAgICAgICAgd2lkdGg6IDgwJTtcbiAgICAgIH1cblxuICAgICAgLmNpdGF0aW9uIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG5cbiAgICAgIC5jaXRlLWdyYXBoaWMsXG4gICAgICAuY2l0ZS1jb2xsZWN0aW9uIHtcbiAgICAgICAgd2lkdGg6IDgwJTtcbiAgICAgICAgcGFkZGluZy10b3A6IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmZpbGUtdXBsb2FkLWNvbnRhaW5lciB1Y2RsaWItaWNvbiB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG5cbiAgICB9XG4gICAgXG4gICAgaW5wdXRbdHlwZT1cImZpbGVcIl0ge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgIC5maWxlLXVwbG9hZC1sYWJlbCB7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTgwKTtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIGhlaWdodDogNTBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEuNXJlbTtcbiAgICAgIC8qIHBhZGRpbmc6IDAgMS41cmVtOyAqL1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgLyogYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyAqL1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgbWluLXdpZHRoOiAxNTBweDtcbiAgICB9XG5cbiAgICAubGVmdC1wYW5lbCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgIH1cblxuICAgIC5sZWZ0LXBhbmVsIC5maWxlLXVwbG9hZC1sYWJlbCB1Y2RsaWItaWNvbiB7XG4gICAgICBoZWlnaHQ6IDUwJTtcbiAgICAgIHdpZHRoOiAyNXB4O1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgdG9wOiA1JTtcbiAgICAgIGxlZnQ6IC01JTtcbiAgICAgIGZpbGw6IHZhcigtLWNvbG9yLWFnZ2llLWdvbGQpO1xuICAgIH1cblxuICAgIC5sZWZ0LXBhbmVsIC5maWxlLXVwbG9hZC1sYWJlbDpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlKTtcbiAgICB9XG5cbiAgICAubGVmdC1wYW5lbCAuZmlsZS11cGxvYWQtbGFiZWwgc3BhbiB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB0b3A6IDIwJTtcbiAgICAgIHJpZ2h0OiAyMCU7XG4gICAgICBwYWRkaW5nLWxlZnQ6IC4ycmVtO1xuICAgIH1cblxuICAgIC5zZWxlY3RlZC1maWxlIHtcbiAgICAgIHBhZGRpbmc6IDAgMnJlbSAycmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuXG4gICAgLmFkbWluLWVkaXQgLmxlZnQtcGFuZWwge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbGVmdDogM3JlbTtcbiAgICAgIHRvcDogY2FsYygxNzBweCArIDNyZW0pO1xuICAgICAgei1pbmRleDogNTAwO1xuICAgIH1cblxuICAgIC5hZG1pbi1lZGl0IC5yaWdodC1wYW5lbCB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICByaWdodDogM3JlbTtcbiAgICAgIHRvcDogY2FsYygxNzBweCArIDNyZW0pO1xuICAgICAgei1pbmRleDogNTAwO1xuICAgIH1cblxuICAgIC5hZG1pbi1lZGl0IC5pY29uLXdyYXBwZXIge1xuICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTcwKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIG1hcmdpbi1sZWZ0OiAuM3JlbTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG5cbiAgICAuYWRtaW4tZWRpdCB1Y2RsaWItaWNvbiB7XG4gICAgICBmaWxsOiB3aGl0ZTtcbiAgICAgIHdpZHRoOiA1MCU7XG4gICAgICBoZWlnaHQ6IDUwJTtcbiAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgIHBhZGRpbmctdG9wOiAwLjZyZW07ICAgICAgXG4gICAgfVxuXG4gICAgLmFkbWluLWVkaXQgLmljb24td3JhcHBlci5lZGl0IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUpO1xuICAgIH1cblxuICAgIC5hZG1pbi1lZGl0IC5pY29uLXdyYXBwZXI6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gICAgfVxuXG4gICAgLmFkbWluLWVkaXQgLmljb24td3JhcHBlci5lZGl0OmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWdvbGQpO1xuICAgIH1cblxuICAgIC5hZG1pbi1lZGl0IC5pY29uLXdyYXBwZXIuZWRpdDpob3ZlciB1Y2RsaWItaWNvbiB7XG4gICAgICBmaWxsOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlKTtcbiAgICB9XG5cbiAgICAuZWRpdC1vdmVybGF5IHtcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgdG9wOiAwO1xuICAgICAgcmlnaHQ6IDA7XG4gICAgICBib3R0b206IDA7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgb3BhY2l0eTogLjU1O1xuICAgICAgei1pbmRleDogNDAwO1xuICAgIH1cblxuICAgIC5jb2xvci1wYWxsZXR0ZSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgbWFyZ2luLWxlZnQ6IDJyZW07XG4gICAgICBwYWRkaW5nOiAwIC42cmVtO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS0zMCk7XG4gICAgICBib3JkZXItcmFkaXVzOiAxLjVyZW07XG4gICAgfVxuXG4gICAgLmNvbG9yLWNpcmNsZSB7XG4gICAgICB3aWR0aDogMjdweDtcbiAgICAgIGhlaWdodDogMjdweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIG1hcmdpbjogMCAzcHg7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIH1cblxuICAgIC5jb2xvci1jaXJjbGU6aG92ZXIge1xuICAgICAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS03MCk7XG4gICAgfVxuXG4gICAgLmNvbG9yLWNpcmNsZVtzZWxlY3RlZF0ge1xuICAgICAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gICAgfVxuXG4gICAgLmVkaXQtY29sbGVjdGlvbnMtY29udGFpbmVyIHtcbiAgICAgIHotaW5kZXg6IDUwMDtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG5cbiAgICAuZWRpdC1jb2xsZWN0aW9ucy1jb250YWluZXIgLmNvbGxlY3Rpb24taXRlbSB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuXG4gICAgLmVkaXQtY29sbGVjdGlvbnMtY29udGFpbmVyIC5jb2xsZWN0aW9uLWl0ZW0ge1xuICAgICAgaGVpZ2h0OiAxMzVweDtcbiAgICAgIC8qIHdpZHRoOiA0MDFweDsgKi9cbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtMzApO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgbWFyZ2luOiAxcmVtO1xuICAgIH1cblxuICAgIC5lZGl0LWNvbGxlY3Rpb25zLWNvbnRhaW5lciAuY29sbGVjdGlvbi1pdGVtIHNwYW4ge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB0ZXh0LWFsaWduOiBzdGFydDtcbiAgICAgIHBhZGRpbmc6IDFyZW0gMXJlbSAuNXJlbSAxcmVtO1xuICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuXG4gICAgLmVkaXQtY29sbGVjdGlvbnMtY29udGFpbmVyIC5jb2xsZWN0aW9uLWl0ZW0gaW5wdXQge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbGVmdDogMXJlbTtcbiAgICAgIHJpZ2h0OiAxcmVtO1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgaGVpZ2h0OiAycmVtO1xuICAgICAgLyogcGFkZGluZzogMCAuNXJlbTsgKi9cbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgZm9udC1zaXplOiAuOHJlbTtcblxuICAgICAgd2lkdGg6IGF1dG87XG4gICAgfVxuXG4gICAgLmNvbGxlY3Rpb24taGlnaGxpZ2h0cyBoMiwgXG4gICAgLmNvbGxlY3Rpb24taGlnaGxpZ2h0cyAuaGVhZGVyLWRvdHMge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgei1pbmRleDogNTAwO1xuICAgIH1cblxuICAgIC5jb2xsZWN0aW9uLWhpZ2hsaWdodHMgaDIge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgIG1hcmdpbi10b3A6IDRyZW07XG4gICAgfVxuXG4gICAgLmVkaXQtY29sbGVjdGlvbnMtY29udGFpbmVyID4gZmllbGRzZXQge1xuICAgICAgYm9yZGVyLXRvcDogbm9uZTtcbiAgICAgIHBhZGRpbmctdG9wOiAwO1xuICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICB9XG5cbiAgICAuZWRpdC1jb2xsZWN0aW9ucy1jb250YWluZXIgPiBmaWVsZHNldCBzcGFuIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cblxuICAgIC5saXN0LS1yZXNldCB7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBwYWRkaW5nOiAwIDAgMCAxLjI1cmVtO1xuICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICB9XG5cbiAgICAubGlzdC0tcmVzZXQgPiBsaSB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICBwYWRkaW5nLXJpZ2h0OiAuNXJlbTtcbiAgICB9XG5cbiAgICAucmFkaW8gbGFiZWwge1xuICAgICAgcGFkZGluZy10b3A6IC4ycmVtO1xuICAgIH1cblxuICAgIC5yYWRpbyBsYWJlbDpiZWZvcmUge1xuICAgICB0b3A6IDVweDtcbiAgICAgbGVmdDogLTFweDtcbiAgICB9XG4gICAgXG4gICAgLmRlZmF1bHQtZGlzcGxheSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1nb2xkLTMwKTtcbiAgICAgIG1hcmdpbjogMXJlbTtcbiAgICAgIHBhZGRpbmc6IDJyZW07XG4gICAgfVxuXG4gICAgLmRlZmF1bHQtZGlzcGxheSBoMyB7XG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgcGFkZGluZzogMDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgICBtYXJnaW4tdG9wOiAwO1xuICAgIH1cblxuICAgIC5kZWZhdWx0LWRpc3BsYXkgc3Bhbi5sYWJlbCB7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG5cbiAgICAuZGVmYXVsdC1pdGVtLWRpc3BsYXkge1xuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICB9XG5cbiAgICAuZXhjZXB0aW9ucyB7XG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgcGFkZGluZy1sZWZ0OiAxcmVtO1xuICAgIH1cblxuICAgIC5kZWZhdWx0LWl0ZW0tZGlzcGxheSAuZGVmYXVsdC1pdGVtLWRpc3BsYXktZnMge1xuICAgICAgYm9yZGVyOiBub25lOyBcbiAgICAgIHBhZGRpbmctbGVmdDogMDsgXG4gICAgICBwYWRkaW5nLXRvcDogMDsgXG4gICAgICBtYXJnaW4tdG9wOiAwO1xuICAgICAgcGFkZGluZy1ib3R0b206IDA7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwOyBcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgXG4gICAgICBsZWZ0OiAtMC41cmVtO1xuICAgICAgdG9wOiAtMC41cmVtO1xuICAgIH0gICAgXG5cbiAgICAuZXhjZXB0aW9ucyBmaWVsZHNldCBsaSxcbiAgICAuZGVmYXVsdC1pdGVtLWRpc3BsYXkgZmllbGRzZXQgbGkge1xuICAgICAgcGFkZGluZy10b3A6IC41cmVtO1xuICAgIH1cblxuICAgIC5leGNlcHRpb25zIGZpZWxkc2V0IGxhYmVsLFxuICAgIC5kZWZhdWx0LWl0ZW0tZGlzcGxheSBmaWVsZHNldCBsYWJlbCB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuXG4gICAgLmV4Y2VwdGlvbnMgZmllbGRzZXQgbGFiZWwge1xuICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgIH1cblxuXG5cbiAgICAuZGlzY2xhaW1lci1hZG1pbi10b2dnbGUge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtZ29sZC0zMCk7XG4gICAgICAvKiBtYXJnaW46IDFyZW07ICovXG4gICAgICBwYWRkaW5nOiAycmVtO1xuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIHotaW5kZXg6IDUwMDtcbiAgICB9XG5cbiAgICAuZGlzY2xhaW1lci1hZG1pbi10b2dnbGUgLmRpc2NsYWltZXItaGVhZGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cblxuICAgIC5kaXNjbGFpbWVyLWFkbWluLXRvZ2dsZSAuZGlzY2xhaW1lci1oZWFkZXIgc3BhbiB7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG5cbiAgICAuZGlzY2xhaW1lci1hZG1pbi10b2dnbGUgLmRpc2NsYWltZXItY29udGVudCB7XG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICBsaW5lLWhlaWdodDogMS43cmVtO1xuICAgIH1cblxuICAgIC50b2dnbGUtc3dpdGNoIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLnRvZ2dsZS1idXR0b24ge1xuICAgICAgd2lkdGg6IDM1cHg7XG4gICAgICBoZWlnaHQ6IDEzcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYmxhY2stMjApO1xuICAgIH1cblxuICAgIC50b2dnbGUtYnV0dG9uOjpiZWZvcmUge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgIHdpZHRoOiAyMnB4O1xuICAgICAgaGVpZ2h0OiAyMnB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogMjJweDtcbiAgICAgIG1hcmdpbi10b3A6IC0ycHg7XG4gICAgICB0cmFuc2l0aW9uOiAwLjNzIGVhc2UtaW4tb3V0O1xuICAgICAgYm94LXNoYWRvdzogMCAycHggNXB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgICB9XG5cbiAgICAudG9nZ2xlLXN3aXRjaCBpbnB1dDpjaGVja2VkICsgLnRvZ2dsZS1idXR0b24ge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS02MCk7XG4gICAgfVxuICAgIC50b2dnbGUtc3dpdGNoIGlucHV0OmNoZWNrZWQgKyAudG9nZ2xlLWJ1dHRvbjo6YmVmb3JlIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCguOHJlbSk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTgwKTtcbiAgICB9XG4gICAgLnRvZ2dsZS1zd2l0Y2ggaW5wdXQge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG5cbiAgICAuaGlnaGxpZ2h0LWRpc3BsYXktc2VsZWN0IHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIG1hcmdpbi1sZWZ0OiAxcmVtO1xuICAgICAgbWluLXdpZHRoOiAzLjVyZW07XG4gICAgfVxuICA8L3N0eWxlPlxuICAgIDxhcHAtbW9kYWwtb3ZlcmxheVxuICAgICAgP2hpZGRlbj1cIiR7IXRoaXMuc2hvd01vZGFsfVwiXG4gICAgICAudGl0bGU9XCIke3RoaXMubW9kYWxUaXRsZX1cIlxuICAgICAgLmNvbnRlbnQ9XCIke3RoaXMubW9kYWxDb250ZW50fVwiXG4gICAgICBAb2s9JHt0aGlzLl9vbk1vZGFsQ2xvc2V9PlxuICAgIDwvYXBwLW1vZGFsLW92ZXJsYXk+XG4gICAgPGRpdiBjbGFzcz1cImVkaXQtb3ZlcmxheVwiID9oaWRkZW49XCIkeyF0aGlzLmVkaXRNb2RlIHx8ICF0aGlzLmlzVWlBZG1pbn1cIj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYWRtaW4tZWRpdFwiID9oaWRkZW49XCIkeyF0aGlzLmlzVWlBZG1pbn1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0LXBhbmVsXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWxlLXVwbG9hZC1jb250YWluZXJcIiA/aGlkZGVuPVwiJHshdGhpcy5lZGl0TW9kZSB8fCAhdGhpcy5pc1VpQWRtaW59XCI+ICAgICAgICAgICAgXG4gICAgICAgICAgPGxhYmVsIGZvcj1cImZpbGUtdXBsb2FkXCIgY2xhc3M9XCJmaWxlLXVwbG9hZC1sYWJlbFwiPlxuICAgICAgICAgICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS1wbHVzXCI+PC91Y2RsaWItaWNvbj5cbiAgICAgICAgICAgIDxzcGFuPk5ldyBJbWFnZTwvc3Bhbj4gXG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgaWQ9XCJmaWxlLXVwbG9hZFwiIHR5cGU9XCJmaWxlXCIgYWNjZXB0PVwiaW1hZ2UvanBlZ1wiIEBjaGFuZ2U9XCIke3RoaXMuX29uRmlsZUNoYW5nZX1cIiAvPlxuICAgICAgICA8L2Rpdj4gIFxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2xvci1wYWxsZXR0ZVwiID9oaWRkZW49XCIkeyF0aGlzLmVkaXRNb2RlIHx8ICF0aGlzLmlzVWlBZG1pbn1cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm9zZSBjb2xvci1jaXJjbGVcIiA/c2VsZWN0ZWQ9XCIke3RoaXMud2F0ZXJjb2xvciA9PT0gJ3Jvc2UnfVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3Itcm9zZSlcIiBAY2xpY2s9XCIke3RoaXMuX29uV2F0ZXJjb2xvckNoYW5nZWR9XCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImdvbGQgY29sb3ItY2lyY2xlXCIgP3NlbGVjdGVkPVwiJHt0aGlzLndhdGVyY29sb3IgPT09ICdnb2xkJ31cIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWdvbGQpXCIgQGNsaWNrPVwiJHt0aGlzLl9vbldhdGVyY29sb3JDaGFuZ2VkfVwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzYWdlIGNvbG9yLWNpcmNsZVwiID9zZWxlY3RlZD1cIiR7dGhpcy53YXRlcmNvbG9yID09PSAnc2FnZSd9XCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1mYXJtZXJzLW1hcmtldClcIiBAY2xpY2s9XCIke3RoaXMuX29uV2F0ZXJjb2xvckNoYW5nZWR9XCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFyYm9yZXR1bSBjb2xvci1jaXJjbGVcIiA/c2VsZWN0ZWQ9XCIke3RoaXMud2F0ZXJjb2xvciA9PT0gJ2FyYm9yZXR1bSd9XCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hcmJvcmV0dW0pXCIgQGNsaWNrPVwiJHt0aGlzLl9vbldhdGVyY29sb3JDaGFuZ2VkfVwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWhvZSBjb2xvci1jaXJjbGVcIiA/c2VsZWN0ZWQ9XCIke3RoaXMud2F0ZXJjb2xvciA9PT0gJ3RhaG9lJ31cIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLXRhaG9lKVwiIEBjbGljaz1cIiR7dGhpcy5fb25XYXRlcmNvbG9yQ2hhbmdlZH1cIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGhpZWJhdWQtaWNpbmcgY29sb3ItY2lyY2xlXCIgP3NlbGVjdGVkPVwiJHt0aGlzLndhdGVyY29sb3IgPT09ICd0aGllYmF1ZC1pY2luZyd9XCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci10aGllYmF1ZC1pY2luZylcIiBAY2xpY2s9XCIke3RoaXMuX29uV2F0ZXJjb2xvckNoYW5nZWR9XCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJyaWdodC1wYW5lbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvbi13cmFwcGVyXCIgP2hpZGRlbj1cIiR7dGhpcy5lZGl0TW9kZSB8fCAhdGhpcy5pc1VpQWRtaW59XCIgQGNsaWNrPVwiJHt0aGlzLl9vbkVkaXRDbGlja2VkfVwiPlxuICAgICAgICAgIDx1Y2RsaWItaWNvbiBpY29uPVwidWNkbGliLWRhbXM6ZmEtcGVuXCI+PC91Y2RsaWItaWNvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpY29uLXdyYXBwZXIgZWRpdFwiID9oaWRkZW49XCIkeyF0aGlzLmVkaXRNb2RlIHx8ICF0aGlzLmlzVWlBZG1pbn1cIiBAY2xpY2s9XCIke3RoaXMuX29uU2F2ZUNsaWNrZWR9XCI+XG4gICAgICAgICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS1mbG9wcHktZGlza1wiPjwvdWNkbGliLWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvbi13cmFwcGVyIGVkaXRcIiA/aGlkZGVuPVwiJHshdGhpcy5lZGl0TW9kZSB8fCAhdGhpcy5pc1VpQWRtaW59XCIgQGNsaWNrPVwiJHt0aGlzLl9vbkNhbmNlbEVkaXRDbGlja2VkfVwiPlxuICAgICAgICAgIDx1Y2RsaWItaWNvbiBpY29uPVwidWNkbGliLWRhbXM6ZmEteG1hcmtcIj48L3VjZGxpYi1pY29uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInRpdGxlLXNlY3Rpb25cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS1vdmVybGF5XCI+XG4gICAgICAgIDxpbWcgP2hpZGRlbj1cIiR7IXRoaXMud2F0ZXJjb2xvckJnVXJsfVwiIGNsYXNzPVwid2F0ZXJjb2xvci1iZ1wiIHNyYz1cIiR7dGhpcy53YXRlcmNvbG9yQmdVcmx9XCIgd2lkdGg9XCIxMDAlXCIgLz5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmVhdHVyZWQtaW1hZ2VcIj48L2Rpdj5cbiAgICAgICAgPGltZyA/aGlkZGVuPVwiJHshdGhpcy53YXRlcmNvbG9yRmdVcmx9XCIgY2xhc3M9XCJ3YXRlcmNvbG9yLWZnXCIgc3JjPVwiJHt0aGlzLndhdGVyY29sb3JGZ1VybH1cIiB3aWR0aD1cIjEwMCVcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sbGVjdGlvbi1oZWFkZXJcIj5cbiAgICAgICAgXG4gICAgICAgIDxoMT4ke3RoaXMudGl0bGV9PC9oMT5cbiAgICAgICAgPGgzID9oaWRkZW49XCIkeyF0aGlzLmNhbGxOdW1iZXJ9XCI+Q29sbGVjdGlvbiAke3RoaXMuY2FsbE51bWJlcn08L2gzPlxuICAgICAgICA8YSBocmVmPVwiJHt0aGlzLmNvbGxlY3Rpb25TZWFyY2hIcmVmfVwiIGNsYXNzPVwiYnRuLS1hbHQgYnRuLS1yb3VuZFwiPlZpZXcgJHt0aGlzLml0ZW1zfSBpdGVtJHt0aGlzLml0ZW1zID09IDEgPyAnJyA6ICdzJ308L2E+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJkZXRhaWwtc2VjdGlvblwiPlxuXG4gICAgICA8cCBjbGFzcz1cImRlc2NyaXB0aW9uXCI+XG4gICAgICA8dWNkbGliLW1kIGlkPVwibWRcIj5cbiAgICAgICAgPHVjZGxpYi1tZC1jb250ZW50PlxuICAgICAgICAgICR7dGhpcy5kZXNjcmlwdGlvbn1cbiAgICAgICAgPC91Y2RsaWItbWQtY29udGVudD5cbiAgICAgIDwvdWNkbGliLW1kPlxuICAgICAgPC9wPlxuXG4gICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogLjRyZW07XCIgP2hpZGRlbj1cIiR7IXRoaXMucHVibGlzaGVkRGF0ZVJhbmdlfVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNvbGxlY3Rpb24tbGFiZWxcIj5Db3ZlcmFnZTogPC9zcGFuPiAke3RoaXMucHVibGlzaGVkRGF0ZVJhbmdlfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogLjRyZW07XCIgP2hpZGRlbj1cIiR7IXRoaXMuc3ViamVjdHM/Lmxlbmd0aH1cIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjb2xsZWN0aW9uLWxhYmVsXCI+U3ViamVjdHM6IDwvc3Bhbj4gXG4gICAgICAgICAgJHt0aGlzLnN1YmplY3RzLm1hcChcbiAgICAgICAgICAgIChhYm91dCwgaW5kZXgpID0+XG4gICAgICAgICAgICAgIGh0bWxgJHtpbmRleCA+IDAgPyBcIiwgXCIgOiBcIlwifTxhIGhyZWY9XCIke3V0aWxzLmdldFN1YmplY3RVcmwodGhpcy5SZWNvcmRNb2RlbCwgYWJvdXRbXCJuYW1lXCJdIHx8IGFib3V0W1wiQGlkXCJdKX1cIj4ke2Fib3V0W1wibmFtZVwiXSB8fCBhYm91dFtcIkBpZFwiXX08L2E+YFxuICAgICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAuNHJlbTtcIiA/aGlkZGVuPVwiJHshdGhpcy5tYXRlcmlhbH1cIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjb2xsZWN0aW9uLWxhYmVsXCI+Rm9ybWF0OiA8L3NwYW4+ICR7dGhpcy5tYXRlcmlhbH1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IC40cmVtO1wiID9oaWRkZW49XCIkeyF0aGlzLmxhbmd1YWdlcz8ubGVuZ3RofVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNvbGxlY3Rpb24tbGFiZWxcIj5MYW5ndWFnZTogPC9zcGFuPiBcbiAgICAgICAgJHt0aGlzLmxhbmd1YWdlcz8ubWFwKFxuICAgICAgICAgIChsYW5ndWFnZSwgaW5kZXgpID0+IGh0bWxgPHNwYW4+JHtsYW5ndWFnZS5uYW1lfTwvc3Bhbj4ke2luZGV4IDwgKHRoaXMubGFuZ3VhZ2VzPy5sZW5ndGggLSAxKSA/ICcsICcgOiAnJ30gYFxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogLjRyZW07XCIgP2hpZGRlbj1cIiR7IXRoaXMubG9jYXRpb259XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY29sbGVjdGlvbi1sYWJlbFwiPkxvY2F0aW9uOiA8L3NwYW4+ICR7dGhpcy5sb2NhdGlvbn1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZGlzY2xhaW1lci1hZG1pbi10b2dnbGVcIiA/aGlkZGVuPVwiJHshdGhpcy5lZGl0TW9kZSB8fCAhdGhpcy5pc1VpQWRtaW59XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkaXNjbGFpbWVyLWhlYWRlclwiPlxuICAgICAgICAgIDxzcGFuPkRpc2NsYWltZXI8L3NwYW4+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRvZ2dsZS1zd2l0Y2hcIj5cbiAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCIgXG4gICAgICAgICAgICAgIGlkPVwidG9nZ2xlXCJcbiAgICAgICAgICAgICAgP2NoZWNrZWQ9XCIke3RoaXMuc2hvd0Rpc2NsYWltZXJ9XCIgXG4gICAgICAgICAgICAgIEBjaGFuZ2U9XCIke3RoaXMuX29uRGlzY2xhaW1lclRvZ2dsZX1cIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0b2dnbGVcIiBjbGFzcz1cInRvZ2dsZS1idXR0b25cIj48L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2NsYWltZXItY29udGVudFwiPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgRHVlIHRvIHRoZSBuYXR1cmUgb2YgdGhlIGhpc3RvcmljYWwgaXRlbXMgaW4gdGhpcyBjb2xsZWN0aW9uLCBzb21lIG1hdGVyaWFscyBtYXkgYmUgY29uc2lkZXJlZCBoYXJtZnVsLCBvZmZlbnNpdmUgb3IgbWlzcmVwcmVzZW50YXRpdmUuXG4gICAgICAgICAgICBUaGVyZSBtYXkgYmUgb2NjdXJlbmNlcyBvZiBsYW5ndWFnZSwgcG9zaXRpb25zIGFuZCB2YWx1ZXMgdGhhdCBkbyBub3QgYWxpZ24gd2l0aCBvdXIgY3VycmVudCB2YWx1ZXMgYW5kIHByYWN0aWNlcyBhdCBVQyBEYXZpcy5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LXdhcm5pbmdcIiA/aGlkZGVuPVwiJHt0aGlzLmVkaXRNb2RlIHx8ICF0aGlzLnNob3dEaXNjbGFpbWVyfVwiPlxuICAgICAgICBEdWUgdG8gdGhlIG5hdHVyZSBvZiB0aGUgaGlzdG9yaWNhbCBpdGVtcyBpbiB0aGlzIGNvbGxlY3Rpb24sIHNvbWUgbWF0ZXJpYWxzIG1heSBiZSBjb25zaWRlcmVkIGhhcm1mdWwsIG9mZmVuc2l2ZSBvciBtaXNyZXByZXNlbnRhdGl2ZS5cbiAgICAgICAgVGhlcmUgbWF5IGJlIG9jY3VyZW5jZXMgb2YgbGFuZ3VhZ2UsIHBvc2l0aW9ucyBhbmQgdmFsdWVzIHRoYXQgZG8gbm90IGFsaWduIHdpdGggb3VyIGN1cnJlbnQgdmFsdWVzIGFuZCBwcmFjdGljZXMgYXQgVUMgRGF2aXMuXG4gICAgICA8L2Rpdj5cblxuXG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiY29sbGVjdGlvbi1oaWdobGlnaHRzXCI+XG4gICAgICA8aDIgP2hpZGRlbj1cIiR7KHRoaXMuaGlnaGxpZ2h0ZWRJdGVtcy5sZW5ndGggPT09IDAgIHx8IHRoaXMuaXRlbUNvdW50IDw9IDApICYmICF0aGlzLmVkaXRNb2RlfVwiPkhpZ2hsaWdodHMgRnJvbSBUaGlzIENvbGxlY3Rpb248L2gyPlxuICAgICAgJHsgdGhpcy5oaWdobGlnaHRlZEl0ZW1zLmxlbmd0aCAhPT0gMCAgJiYgdGhpcy5pdGVtQ291bnQgPiAwID8gU2hhcmVkSHRtbC5oZWFkZXJEb3RzKCkgOiAnJyB9XG4gICAgICBcbiAgICAgIDxkaXYgY2xhc3M9XCJlZGl0LWNvbGxlY3Rpb25zLWNvbnRhaW5lclwiID9oaWRkZW49XCIkeyF0aGlzLmVkaXRNb2RlIHx8ICF0aGlzLmlzVWlBZG1pbn1cIj5cblxuICAgICAgPGZpZWxkc2V0IGNsYXNzPVwicmFkaW9cIiBzdHlsZT1cImJvcmRlcjogbm9uZTsgbWFyZ2luOiAwOyBwYWRkaW5nOiAwO1wiPiAgICAgIFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9ybS1sYWJlbFwiPkhpZ2hsaWdodCBEaXNwbGF5Ojwvc3Bhbj5cbiAgICAgICAgICA8dWNkLXRoZW1lLXNsaW0tc2VsZWN0XG4gICAgICAgICAgICBjbGFzcz1cImhpZ2hsaWdodC1kaXNwbGF5LXNlbGVjdFwiXG4gICAgICAgICAgICBAY2hhbmdlPVwiJHt0aGlzLl9vbkl0ZW1EaXNwbGF5Q2hhbmdlfVwiXG4gICAgICAgICAgICBAZm9jdXNpbj1cIiR7dGhpcy5fc3NTZWxlY3RGb2N1c31cIlxuICAgICAgICAgICAgQGNsaWNrPVwiJHt0aGlzLl9zc1NlbGVjdEZvY3VzfVwiXG4gICAgICAgICAgICBAYmx1cj1cIiR7dGhpcy5fc3NTZWxlY3RCbHVyfVwiPlxuICAgICAgICAgICAgPHNlbGVjdD5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNlwiID9zZWxlY3RlZD1cIiR7dGhpcy5pdGVtQ291bnQgPT09IDZ9XCI+Njwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIzXCIgP3NlbGVjdGVkPVwiJHt0aGlzLml0ZW1Db3VudCA9PT0gM31cIj4zPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjJcIiA/c2VsZWN0ZWQ9XCIke3RoaXMuaXRlbUNvdW50ID09PSAyfVwiPjI8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMVwiID9zZWxlY3RlZD1cIiR7dGhpcy5pdGVtQ291bnQgPT09IDF9XCI+MTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIwXCIgP3NlbGVjdGVkPVwiJHt0aGlzLml0ZW1Db3VudCA9PT0gMH1cIj4wPC9vcHRpb24+XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L3VjZC10aGVtZS1zbGltLXNlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2ZpZWxkc2V0PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLXNpbmdsZVwiID9oaWRkZW49XCIke3RoaXMuaXRlbUNvdW50ICE9PSAxfVwiPiAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xsZWN0aW9uLWl0ZW1cIj5cbiAgICAgICAgICAgIDxzcGFuPkl0ZW0gQVJLIElEPC9zcGFuPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaXRlbS0xIGl0ZW0tYXJrLWlucHV0XCIgXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgIC52YWx1ZT1cIiR7dGhpcy5zYXZlZEl0ZW1zWzBdID8gdGhpcy5zYXZlZEl0ZW1zWzBdWydAaWQnXS5zcGxpdCgnL2l0ZW0nKVsxXSA6ICcnfVwiIFxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIi9hcms6Ly4uLlwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC0yXCIgP2hpZGRlbj1cIiR7dGhpcy5pdGVtQ291bnQgIT09IDJ9XCI+ICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbGxlY3Rpb24taXRlbVwiPlxuICAgICAgICAgICAgPHNwYW4+SXRlbSBBUksgSUQ8L3NwYW4+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpdGVtLTEgaXRlbS1hcmstaW5wdXRcIiBcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgLnZhbHVlPVwiJHt0aGlzLnNhdmVkSXRlbXNbMF0gPyB0aGlzLnNhdmVkSXRlbXNbMF1bJ0BpZCddLnNwbGl0KCcvaXRlbScpWzFdIDogJyd9XCIgXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiL2FyazovLi4uXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sbGVjdGlvbi1pdGVtXCI+XG4gICAgICAgICAgICA8c3Bhbj5JdGVtIEFSSyBJRDwvc3Bhbj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIml0ZW0tMiBpdGVtLWFyay1pbnB1dFwiIFxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAudmFsdWU9XCIke3RoaXMuc2F2ZWRJdGVtc1sxXSA/IHRoaXMuc2F2ZWRJdGVtc1sxXVsnQGlkJ10uc3BsaXQoJy9pdGVtJylbMV0gOiAnJ31cIiBcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIvYXJrOi8uLi5cIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC10cmlvXCIgP2hpZGRlbj1cIiR7dGhpcy5pdGVtQ291bnQgPCAzfVwiPiAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xsZWN0aW9uLWl0ZW1cIj5cbiAgICAgICAgICAgIDxzcGFuPkl0ZW0gQVJLIElEPC9zcGFuPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaXRlbS0xIGl0ZW0tYXJrLWlucHV0XCIgXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgIC52YWx1ZT1cIiR7dGhpcy5zYXZlZEl0ZW1zWzBdID8gdGhpcy5zYXZlZEl0ZW1zWzBdWydAaWQnXS5zcGxpdCgnL2l0ZW0nKVsxXSA6ICcnfVwiIFxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIi9hcms6Ly4uLlwiIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sbGVjdGlvbi1pdGVtXCI+XG4gICAgICAgICAgICA8c3Bhbj5JdGVtIEFSSyBJRDwvc3Bhbj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIml0ZW0tMiBpdGVtLWFyay1pbnB1dFwiIFxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAudmFsdWU9XCIke3RoaXMuc2F2ZWRJdGVtc1sxXSA/IHRoaXMuc2F2ZWRJdGVtc1sxXVsnQGlkJ10uc3BsaXQoJy9pdGVtJylbMV0gOiAnJ31cIiBcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIvYXJrOi8uLi5cIiAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbGxlY3Rpb24taXRlbVwiPlxuICAgICAgICAgICAgPHNwYW4+SXRlbSBBUksgSUQ8L3NwYW4+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpdGVtLTMgaXRlbS1hcmstaW5wdXRcIiBcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgLnZhbHVlPVwiJHt0aGlzLnNhdmVkSXRlbXNbMl0gPyB0aGlzLnNhdmVkSXRlbXNbMl1bJ0BpZCddLnNwbGl0KCcvaXRlbScpWzFdIDogJyd9XCIgXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiL2FyazovLi4uXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtdHJpb1wiID9oaWRkZW49XCIke3RoaXMuaXRlbUNvdW50ICE9PSA2fVwiPiAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xsZWN0aW9uLWl0ZW1cIj5cbiAgICAgICAgICAgIDxzcGFuPkl0ZW0gQVJLIElEPC9zcGFuPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaXRlbS00IGl0ZW0tYXJrLWlucHV0XCIgXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgIC52YWx1ZT1cIiR7dGhpcy5zYXZlZEl0ZW1zWzNdID8gdGhpcy5zYXZlZEl0ZW1zWzNdWydAaWQnXS5zcGxpdCgnL2l0ZW0nKVsxXSA6ICcnfVwiIFxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIi9hcms6Ly4uLlwiIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sbGVjdGlvbi1pdGVtXCI+XG4gICAgICAgICAgICA8c3Bhbj5JdGVtIEFSSyBJRDwvc3Bhbj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIml0ZW0tNSBpdGVtLWFyay1pbnB1dFwiIFxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAudmFsdWU9XCIke3RoaXMuc2F2ZWRJdGVtc1s0XSA/IHRoaXMuc2F2ZWRJdGVtc1s0XVsnQGlkJ10uc3BsaXQoJy9pdGVtJylbMV0gOiAnJ31cIiBcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIvYXJrOi8uLi5cIiAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbGxlY3Rpb24taXRlbVwiPlxuICAgICAgICAgICAgPHNwYW4+SXRlbSBBUksgSUQ8L3NwYW4+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpdGVtLTYgaXRlbS1hcmstaW5wdXRcIiBcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgLnZhbHVlPVwiJHt0aGlzLnNhdmVkSXRlbXNbNV0gPyB0aGlzLnNhdmVkSXRlbXNbNV1bJ0BpZCddLnNwbGl0KCcvaXRlbScpWzFdIDogJyd9XCIgXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiL2FyazovLi4uXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRlZmF1bHQtZGlzcGxheVwiPlxuICAgICAgICAgIDxoMz5EaXNwbGF5IFNldHRpbmdzIGZvciBDb2xsZWN0aW9uIEl0ZW0gUGFnZXM8L2gzPlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRlZmF1bHQtaXRlbS1kaXNwbGF5XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCIgc3R5bGU9XCJkaXNwbGF5OiBibG9jaztcIj5EZWZhdWx0IERpc3BsYXkgZm9yIE11bHRpcGFnZSBJdGVtczwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiZm9udC1zdHlsZTogaXRhbGljOyBtYXJnaW4tYm90dG9tOiAwLjVyZW07IGRpc3BsYXk6IGlubGluZS1ibG9jaztcIj5TaW5nbGUgcGFnZSBpdGVtcyBhbmQgbXVsdGltZWRpYSBhcmUgbm90IGFmZmVjdGVkIGJ5IHRoZXNlIHNldHRpbmdzLjwvc3Bhbj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzPVwicmFkaW8gZGVmYXVsdC1pdGVtLWRpc3BsYXktZnNcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJsaXN0LS1yZXNldFwiIHN0eWxlPVwicGFkZGluZy1pbmxpbmUtc3RhcnQ6IDA7XCI+XG4gICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInR3b1wiIFxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJyYWRpby1kZWZhdWx0LWRpc3BsYXlcIiBcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIiBcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInJhZGlvXCIgXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCIke3V0aWxzLml0ZW1EaXNwbGF5VHlwZS5iclR3b1BhZ2V9XCIgXG4gICAgICAgICAgICAgICAgICAgICAgP2NoZWNrZWQ9XCIke3RoaXMuaXRlbURlZmF1bHREaXNwbGF5ID09PSB1dGlscy5pdGVtRGlzcGxheVR5cGUuYnJUd29QYWdlfVwiIFxuICAgICAgICAgICAgICAgICAgICAgIEBjaGFuZ2U9XCIkeyhlKSA9PiAodGhpcy5pdGVtRGVmYXVsdERpc3BsYXkgPSB1dGlscy5pdGVtRGlzcGxheVR5cGUuYnJUd29QYWdlKX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInR3b1wiPiR7dXRpbHMuaXRlbURpc3BsYXlUeXBlLmJyVHdvUGFnZX08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwib25lXCIgXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInJhZGlvLWRlZmF1bHQtZGlzcGxheVwiIFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiIFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicmFkaW9cIiBcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cIiR7dXRpbHMuaXRlbURpc3BsYXlUeXBlLmJyT25lUGFnZX1cIiBcbiAgICAgICAgICAgICAgICAgICAgICA/Y2hlY2tlZD1cIiR7dGhpcy5pdGVtRGVmYXVsdERpc3BsYXkgPT09IHV0aWxzLml0ZW1EaXNwbGF5VHlwZS5ick9uZVBhZ2V9XCIgXG4gICAgICAgICAgICAgICAgICAgICAgQGNoYW5nZT1cIiR7KGUpID0+ICh0aGlzLml0ZW1EZWZhdWx0RGlzcGxheSA9IHV0aWxzLml0ZW1EaXNwbGF5VHlwZS5ick9uZVBhZ2UpfVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwib25lXCI+JHt1dGlscy5pdGVtRGlzcGxheVR5cGUuYnJPbmVQYWdlfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJsaXN0XCIgXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInJhZGlvLWRlZmF1bHQtZGlzcGxheVwiIFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiIFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicmFkaW9cIiBcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cIiR7dXRpbHMuaXRlbURpc3BsYXlUeXBlLmltYWdlTGlzdH1cIiBcbiAgICAgICAgICAgICAgICAgICAgICA/Y2hlY2tlZD1cIiR7dGhpcy5pdGVtRGVmYXVsdERpc3BsYXkgPT09IHV0aWxzLml0ZW1EaXNwbGF5VHlwZS5pbWFnZUxpc3R9XCIgXG4gICAgICAgICAgICAgICAgICAgICAgQGNoYW5nZT1cIiR7KGUpID0+ICh0aGlzLml0ZW1EZWZhdWx0RGlzcGxheSA9IHV0aWxzLml0ZW1EaXNwbGF5VHlwZS5pbWFnZUxpc3QpfVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibGlzdFwiPiR7dXRpbHMuaXRlbURpc3BsYXlUeXBlLmltYWdlTGlzdH08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImV4Y2VwdGlvbnNcIiA/aGlkZGVuPVwiJHt0aGlzLml0ZW1FZGl0cy5sZW5ndGggPCAxfVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPkV4Y2VwdGlvbnM8L3NwYW4+XG4gICAgICAgICAgICA8cCBzdHlsZT1cIm1hcmdpbi10b3A6IDAuM3JlbTsgcGFkZGluZy1ib3R0b206IDA7IG1hcmdpbi1ib3R0b206IDA7XCI+XG4gICAgICAgICAgICAgIENoZWNrZWQgaXRlbXMgaW4gdGhpcyBsaXN0IHdpbGwgYmUgcmVzZXQgdG8gdGhlIGRlZmF1bHQgaXRlbSBkaXNwbGF5IHdoZW4gc2F2ZWQuIFxuICAgICAgICAgICAgICBEaXNwbGF5IG92ZXJyaWRlcyBjYW4gYWxzbyBiZSBtYW5hZ2VkIGRpcmVjdGx5IG9uIGFuIGl0ZW0gcGFnZS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxmaWVsZHNldCBzdHlsZT1cImJvcmRlcjogbm9uZTsgcGFkZGluZy1sZWZ0OiAwOyBwYWRkaW5nLXRvcDogMDsgbWFyZ2luLXRvcDogMDtcIj5cbiAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibGlzdC0tcmVzZXRcIiBzdHlsZT1cInBhZGRpbmctaW5saW5lLXN0YXJ0OiAwOyB3aWR0aDogMTAwJTtcIj5cbiAgICAgICAgICAgICAgICA8bGkgc3R5bGU9XCJ3aWR0aDogMzMlOyBwYWRkaW5nLXJpZ2h0OiAwO1wiPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiY2hlY2tib3gtYWxsXCIgXG4gICAgICAgICAgICAgICAgICAgIG5hbWU9XCJjaGVja2JveC1hbGxcIiBcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCIgXG4gICAgICAgICAgICAgICAgICAgIEBjaGFuZ2U9XCIke3RoaXMuX29uU2VsZWN0QWxsRXhjZXB0aW9uc0NoYW5nZX1cIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGVja2JveC1hbGxcIj5TZWxlY3QgYWxsIGV4Y2VwdGlvbnM8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvbGk+XG5cbiAgICAgICAgICAgICAgICA8IS0tIGl0ZW1zIHdpdGggZXhjZXB0aW9ucyBzZXQgLS0+XG4gICAgICAgICAgICAgICAgJHt0aGlzLml0ZW1FZGl0cy5tYXAoKGl0ZW0sIGluZGV4KSA9PiBodG1sYFxuICAgICAgICAgICAgICAgICAgPGxpIHN0eWxlPVwid2lkdGg6IDMzJTsgcGFkZGluZy1yaWdodDogMDtcIj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImNoZWNrYm94JHtpbmRleH1cIiBcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiY2hlY2tib3hcIiBcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgIGRhdGEtaXRlbS1pZD1cIiR7aXRlbS5pZH1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrYm94JHtpbmRleH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHtpdGVtLmlkfVwiPiR7aXRlbS5saW5rTGFiZWx9PC9hPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiZm9udC1zdHlsZTogaXRhbGljO1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgKCR7aXRlbS5kZWZhdWx0RGlzcGxheX0pXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICBgKX1cbiAgICAgICAgICBcbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgP2hpZGRlbj1cIiR7dGhpcy5lZGl0TW9kZX1cIiBzdHlsZT1cInBhZGRpbmc6IDAgMnJlbTtcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtc2luZ2xlXCIgP2hpZGRlbj1cIiR7dGhpcy5pdGVtQ291bnQgIT09IDF9XCI+XG4gICAgICAgICAgJHt0aGlzLmhpZ2hsaWdodGVkSXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gaHRtbGBcbiAgICAgICAgICAgICR7aW5kZXggPCAzID8gaHRtbGA8ZGFtcy1pdGVtLWNhcmQgZGF0YS1pdGVtaWQ9XCIkeycvaXRlbScraXRlbVsnQGlkJ10uc3BsaXQoJy9pdGVtJylbMV19XCI+PC9kYW1zLWl0ZW0tY2FyZD5gIDogJyd9XG4gICAgICAgICAgYCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC0yXCIgP2hpZGRlbj1cIiR7dGhpcy5pdGVtQ291bnQgIT09IDJ9XCI+XG4gICAgICAgICAgJHt0aGlzLmhpZ2hsaWdodGVkSXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gaHRtbGBcbiAgICAgICAgICAgICR7aW5kZXggPCAzID8gaHRtbGA8ZGFtcy1pdGVtLWNhcmQgZGF0YS1pdGVtaWQ9XCIkeycvaXRlbScraXRlbVsnQGlkJ10uc3BsaXQoJy9pdGVtJylbMV19XCI+PC9kYW1zLWl0ZW0tY2FyZD5gIDogJyd9XG4gICAgICAgICAgYCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC10cmlvXCIgP2hpZGRlbj1cIiR7dGhpcy5pdGVtQ291bnQgPCAzfVwiPlxuICAgICAgICAgICR7dGhpcy5oaWdobGlnaHRlZEl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IGh0bWxgXG4gICAgICAgICAgICAke2luZGV4IDwgMyA/IGh0bWxgPGRhbXMtaXRlbS1jYXJkIGRhdGEtaXRlbWlkPVwiJHsnL2l0ZW0nK2l0ZW1bJ0BpZCddLnNwbGl0KCcvaXRlbScpWzFdfVwiPjwvZGFtcy1pdGVtLWNhcmQ+YCA6ICcnfVxuICAgICAgICAgIGApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtdHJpb1wiID9oaWRkZW49XCIke3RoaXMuaXRlbUNvdW50IDwgNn1cIj5cbiAgICAgICAgICAke3RoaXMuaGlnaGxpZ2h0ZWRJdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiBodG1sYFxuICAgICAgICAgICAgJHtpbmRleCA+PSAzID8gaHRtbGA8ZGFtcy1pdGVtLWNhcmQgZGF0YS1pdGVtaWQ9XCIkeycvaXRlbScraXRlbVsnQGlkJ10uc3BsaXQoJy9pdGVtJylbMV19XCI+PC9kYW1zLWl0ZW0tY2FyZD5gIDogJyd9XG4gICAgICAgICAgYCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxhIGhyZWY9XCIke3RoaXMuY29sbGVjdGlvblNlYXJjaEhyZWZ9XCIgY2xhc3M9XCJidG4gYnRuLS1wcmltYXJ5IGJ0bi0tbGcgdmlldy1hbGwtY29sbGVjdGlvbnNcIj5WaWV3IGFsbCBjb2xsZWN0aW9uIGl0ZW1zPC9hPlxuXG4gICAgPC9kaXY+XG5cbiAgICA8YXBwLWNpdGF0aW9uIC5yZWNvcmQ9XCIke3RoaXMuY2l0YXRpb25Sb290fVwiPjwvYXBwLWNpdGF0aW9uPlxuXG4gIGA7fSIsImltcG9ydCB7IExpdEVsZW1lbnQgfSBmcm9tICdsaXQnO1xuXG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2FwcC10b2FzdC1wb3B1cC50cGwuanNcIjtcblxuaW1wb3J0IHsgTWl4aW4sIExpdENvcmtVdGlscyB9IGZyb20gJ0B1Y2QtbGliL2NvcmstYXBwLXV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwVG9hc3RQb3B1cCBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpXG4gIC53aXRoKExpdENvcmtVdGlscykge1xuXG4gIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmlzaWJsZSA6IHsgdHlwZSA6IEJvb2xlYW4gfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNob3dQb3B1cFxuICAgKiBAZGVzY3JpcHRpb24gc2hvdyB0aGUgcG9wdXAgZm9yIDUgc2Vjb25kc1xuICAgKiBcbiAgICovXG4gIHNob3dQb3B1cCgpIHtcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgfSwgNTAwMCk7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhcHAtdG9hc3QtcG9wdXAnLCBBcHBUb2FzdFBvcHVwKTsiLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0JztcblxuaW1wb3J0IHsgc2hhcmVkU3R5bGVzIH0gZnJvbSAnLi4vc3R5bGVzL3NoYXJlZC1zdHlsZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXIoKSB7IFxuICByZXR1cm4gaHRtbGBcblxuPHN0eWxlIGluY2x1ZGU9XCJzaGFyZWQtc3R5bGVzXCI+XG4gICR7c2hhcmVkU3R5bGVzfVxuXG4gIDpob3N0IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICB9XG5cbiAgW2hpZGRlbl0geyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH1cblxuICAjcG9wdXAge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHotaW5kZXg6IDEwO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtMTApO1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGJvdHRvbTogMXJlbTtcbiAgICByaWdodDogY2FsYyg1MCUgLSAxMTBweCAtIDJyZW0pO1xuICAgIHdpZHRoOiAxMXJlbTtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgbWFyZ2luOiAxcmVtO1xuICAgIGJvcmRlci1yYWRpdXM6IDEuNXJlbTtcbiAgICBib3gtc2hhZG93OiAwcHggM3B4IDZweCAjMDAwMDAwMjk7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUpO1xuICB9XG5cbiAgI3BvcHVwIHN2ZyB7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIHdpZHRoOiAzMHB4O1xuICAgIGZpbGw6IHZhcigtLWNvbG9yLXNhZ2UpO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0b3A6IDAuMnJlbTtcbiAgfVxuPC9zdHlsZT5cblxuPGRpdiBpZD1cInBvcHVwXCIgP2hpZGRlbj1cIiR7IXRoaXMudmlzaWJsZX1cIj5cbiAgPHN2ZyBpZD1cImZhLWNoZWNrXCIgaGVpZ2h0PVwiMWVtXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCI+PCEtLSEgRm9udCBBd2Vzb21lIEZyZWUgNi40LjIgYnkgQGZvbnRhd2Vzb21lIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20gTGljZW5zZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2xpY2Vuc2UgKENvbW1lcmNpYWwgTGljZW5zZSkgQ29weXJpZ2h0IDIwMjMgRm9udGljb25zLCBJbmMuIC0tPjxwYXRoIGQ9XCJNNDM4LjYgMTA1LjRjMTIuNSAxMi41IDEyLjUgMzIuOCAwIDQ1LjNsLTI1NiAyNTZjLTEyLjUgMTIuNS0zMi44IDEyLjUtNDUuMyAwbC0xMjgtMTI4Yy0xMi41LTEyLjUtMTIuNS0zMi44IDAtNDUuM3MzMi44LTEyLjUgNDUuMyAwTDE2MCAzMzguNyAzOTMuNCAxMDUuNGMxMi41LTEyLjUgMzIuOC0xMi41IDQ1LjMgMHpcIi8+PC9zdmc+XG4gIENvcGllZCBzdWNjZXNzZnVsbHlcbjwvZGl2PlxuXG5gO30iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0JztcblxuLyoqXG4gKiBAY2xhc3MgU2hhcmVkSHRtbFxuICogQGRlc2NyaXB0aW9uIExpdCBodG1sIHRlbXBsYXRlIHN0cmluZ3MgdXNlZCBhY3Jvc3MgdGhlIHNpdGUuXG4gKiBEZXNpZ25lZCB0byBiZSB1c2VkIHdpdGggREFNUyBzaGFyZWQgc3R5bGVzLCBzbyBtYWtlIHN1cmUgeW91IGltcG9ydCB0aG9zZSBpbnRvIHlvdXIgZWxlbWVudFxuICovXG5jbGFzcyBTaGFyZWRIdG1sIHtcblxuICAvKipcbiAgICogQG1ldGhvZCBoZWFkZXJEb3RzXG4gICAqIEBkZXNjcmlwdGlvbiBEaXNwbGF5cyB0aGUgeWVsbG93IGRvdHMgYmVuZWF0aCBhIHNlY3Rpb24gaGVhZGVyXG4gICAqIEByZXR1cm5zIHtUZW1wbGF0ZVJlc3VsdH1cbiAgICovXG4gIGhlYWRlckRvdHMoKXtcbiAgICByZXR1cm4gaHRtbGBcbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItZG90c1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG90XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkb3RcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG90XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkb3RcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBuZXcgU2hhcmVkSHRtbCgpOyIsImNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xuXG4vKipcbiAqIEBjbGFzcyBVc2VyXG4gKiBAZGVzY3JpcHRpb24gd3JhcHBlciBhcm91bmQgQVBQX0NPTkZJRy51c2VyXG4gKi9cbmNsYXNzIFVzZXIge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZGF0YSA9IGNvbmZpZy51c2VyO1xuICAgIGlmKCAhdGhpcy5kYXRhLnJvbGVzICkgdGhpcy5kYXRhLnJvbGVzID0gW107XG4gICAgdGhpcy5lZGl0VWlBY2Nlc3MgPSBbJ2FkbWluJywgJ3VpLWFkbWluJ107XG4gIH1cblxuICBpc0xvZ2dlZEluKCkge1xuICAgIGlmKCB0aGlzLmRhdGEubG9nZ2VkSW4gPT09IHRydWUgKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjYW5FZGl0VWkoKSB7XG4gICAgZm9yKCBsZXQgcm9sZSBvZiB0aGlzLmVkaXRVaUFjY2VzcyApIHtcbiAgICAgIGlmKCB0aGlzLmhhc1JvbGUocm9sZSkgKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaGFzUm9sZShyb2xlKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5yb2xlcy5pbmNsdWRlcyhyb2xlKTtcbiAgfVxufVxuXG5sZXQgdXNlciA9IG5ldyBVc2VyKCk7XG5leHBvcnQgZGVmYXVsdCB1c2VyOyIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xuaW1wb3J0IHsgbm90aGluZywgbm9DaGFuZ2UgfSBmcm9tICcuLi9saXQtaHRtbC5qcyc7XG5pbXBvcnQgeyBkaXJlY3RpdmUsIERpcmVjdGl2ZSwgUGFydFR5cGUgfSBmcm9tICcuLi9kaXJlY3RpdmUuanMnO1xuY29uc3QgSFRNTF9SRVNVTFQgPSAxO1xuZXhwb3J0IGNsYXNzIFVuc2FmZUhUTUxEaXJlY3RpdmUgZXh0ZW5kcyBEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHBhcnRJbmZvKSB7XG4gICAgICAgIHN1cGVyKHBhcnRJbmZvKTtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBub3RoaW5nO1xuICAgICAgICBpZiAocGFydEluZm8udHlwZSAhPT0gUGFydFR5cGUuQ0hJTEQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLmRpcmVjdGl2ZU5hbWV9KCkgY2FuIG9ubHkgYmUgdXNlZCBpbiBjaGlsZCBiaW5kaW5nc2ApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcih2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IG5vdGhpbmcgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fdGVtcGxhdGVSZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuX3ZhbHVlID0gdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbm9DaGFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5kaXJlY3RpdmVOYW1lfSgpIGNhbGxlZCB3aXRoIGEgbm9uLXN0cmluZyB2YWx1ZWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90ZW1wbGF0ZVJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICBjb25zdCBzdHJpbmdzID0gW3ZhbHVlXTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgc3RyaW5ncy5yYXcgPSBzdHJpbmdzO1xuICAgICAgICAvLyBXQVJOSU5HOiBpbXBlcnNvbmF0aW5nIGEgVGVtcGxhdGVSZXN1bHQgbGlrZSB0aGlzIGlzIGV4dHJlbWVseVxuICAgICAgICAvLyBkYW5nZXJvdXMuIFRoaXJkLXBhcnR5IGRpcmVjdGl2ZXMgc2hvdWxkIG5vdCBkbyB0aGlzLlxuICAgICAgICByZXR1cm4gKHRoaXMuX3RlbXBsYXRlUmVzdWx0ID0ge1xuICAgICAgICAgICAgLy8gQ2FzdCB0byBhIGtub3duIHNldCBvZiBpbnRlZ2VycyB0aGF0IHNhdGlzZnkgUmVzdWx0VHlwZSBzbyB0aGF0IHdlXG4gICAgICAgICAgICAvLyBkb24ndCBoYXZlIHRvIGV4cG9ydCBSZXN1bHRUeXBlIGFuZCBwb3NzaWJseSBlbmNvdXJhZ2UgdGhpcyBwYXR0ZXJuLlxuICAgICAgICAgICAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgICAgICAgICAgIFsnXyRsaXRUeXBlJCddOiB0aGlzLmNvbnN0cnVjdG9yXG4gICAgICAgICAgICAgICAgLnJlc3VsdFR5cGUsXG4gICAgICAgICAgICBzdHJpbmdzLFxuICAgICAgICAgICAgdmFsdWVzOiBbXSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuVW5zYWZlSFRNTERpcmVjdGl2ZS5kaXJlY3RpdmVOYW1lID0gJ3Vuc2FmZUhUTUwnO1xuVW5zYWZlSFRNTERpcmVjdGl2ZS5yZXN1bHRUeXBlID0gSFRNTF9SRVNVTFQ7XG4vKipcbiAqIFJlbmRlcnMgdGhlIHJlc3VsdCBhcyBIVE1MLCByYXRoZXIgdGhhbiB0ZXh0LlxuICpcbiAqIFRoZSB2YWx1ZXMgYHVuZGVmaW5lZGAsIGBudWxsYCwgYW5kIGBub3RoaW5nYCwgd2lsbCBhbGwgcmVzdWx0IGluIG5vIGNvbnRlbnRcbiAqIChlbXB0eSBzdHJpbmcpIGJlaW5nIHJlbmRlcmVkLlxuICpcbiAqIE5vdGUsIHRoaXMgaXMgdW5zYWZlIHRvIHVzZSB3aXRoIGFueSB1c2VyLXByb3ZpZGVkIGlucHV0IHRoYXQgaGFzbid0IGJlZW5cbiAqIHNhbml0aXplZCBvciBlc2NhcGVkLCBhcyBpdCBtYXkgbGVhZCB0byBjcm9zcy1zaXRlLXNjcmlwdGluZ1xuICogdnVsbmVyYWJpbGl0aWVzLlxuICovXG5leHBvcnQgY29uc3QgdW5zYWZlSFRNTCA9IGRpcmVjdGl2ZShVbnNhZmVIVE1MRGlyZWN0aXZlKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVuc2FmZS1odG1sLmpzLm1hcCIsImV4cG9ydCpmcm9tXCJsaXQtaHRtbC9kaXJlY3RpdmVzL3Vuc2FmZS1odG1sLmpzXCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11bnNhZmUtaHRtbC5qcy5tYXBcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==