"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["page-home"],{

/***/ "./public/elements/components/admin/admin-content-panel.js":
/*!*****************************************************************!*\
  !*** ./public/elements/components/admin/admin-content-panel.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminContentPanel": () => (/* binding */ AdminContentPanel)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _admin_content_panel_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin-content-panel.tpl.js */ "./public/elements/components/admin/admin-content-panel.tpl.js");
/* harmony import */ var _ucd_lib_theme_elements_ucdlib_ucdlib_icon_ucdlib_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon */ "./public/node_modules/@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon.js");
/* harmony import */ var _ucd_lib_theme_elements_brand_ucd_theme_slim_select_ucd_theme_slim_select_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ucd-lib/theme-elements/brand/ucd-theme-slim-select/ucd-theme-slim-select.js */ "./public/node_modules/@ucd-lib/theme-elements/brand/ucd-theme-slim-select/ucd-theme-slim-select.js");






/**
 * @class AdminContentPanel
 * @description admin UI for customizing featured collections on the homepage
 */
class AdminContentPanel extends lit__WEBPACK_IMPORTED_MODULE_0__.LitElement {
  static get properties() {
    return {
      type: { type: String },
      position: { type: Number },
      placement: { type: String },
      collectionId: { type: String },
      heading: { type: String },
      description: { type: String },
      collectionIds: { type: Array },
      controlIcon: { type: Object },
      sortedCollectionsList: { type: Array },
      isDirty: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.render = _admin_content_panel_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.active = true;

    this.isDirty = false;
    this.type = "";
    this.position = 0;
    this.placement = "";
    this.collectionId = "";
    this.heading = "";
    this.description = "";

    this.controlIcons = {
      single: "dams-admin-collection-single",
      text: "dams-admin-text",
      cards: "dams-admin-collection-cards",
    };
    this.collectionIds = [];
    this.sortedCollectionsList = Object.entries(
      APP_CONFIG.collectionLabels
    ).sort((a, b) => (a[1] < b[1] ? -1 : 1));
  }

  /**
   * @method firstUpdated
   * @description Lit lifecycle method
   */
  firstUpdated() {
    requestAnimationFrame(() => {
      this.dispatchEvent(new CustomEvent("panel-loaded"));
    });
  }

  /**
   * @method updated
   * @description Lit lifecycle method
   */
  updated() {
    if (this.isDirty) {
      this.isDirty = false;

      // hack annoying but the slimselect doesn't update consistently based on property values
      //  set selected manually just in case
      if (this.type === "single") {
        let collectionDropdown = this.shadowRoot.querySelector(
          "ucd-theme-slim-select.single-collection"
        );
        if (collectionDropdown) {
          collectionDropdown.slimSelect.setSelected(this.collectionId);
        }
      }

      if (this.type === "cards") {
        let collectionsDropdowns = this.shadowRoot.querySelectorAll(
          "ucd-theme-slim-select.list"
        );
        if (collectionsDropdowns) {
          collectionsDropdowns.forEach((dropdown, index) => {
            if (this.collectionIds[index]) {
              dropdown.slimSelect.setSelected(
                this.collectionIds[index].selected
              );
            }
          });
        }
      }
    }
    requestAnimationFrame(() => {
      this.dispatchEvent(new CustomEvent("panel-loaded"));
    });

    if (this.type === "single" || this.type === "text") {
      this.shadowRoot.querySelector(
        "#placement-" + this.placement
      ).checked = true;
    }
  }

  /**
   * @method _removeCollection
   * @description Remove Collection button press event, remove collection dropdown from ui
   */
  _removeCollection(e) {
    let position = e.currentTarget.dataset.index;
    this.collectionIds = this.collectionIds.filter(c => c.position != position); // remove collection from collectionIds
    this.collectionIds = this.collectionIds.map((c,index) => { return { position: index, selected: c.selected }}); // reindex positions
    this.isDirty = true;
    this.requestUpdate();
  }

  /**
   * @method _addCollection
   * @description Add Collection button press event, add collection dropdown to ui
   */
  _addCollection() {
    this.collectionIds.push({
      position: this.collectionIds.length,
      selected: "",
    });
    this.isDirty = true;
    this.requestUpdate();
  }

  /**
   * @method _onCollectionListChange
   * @description collection dropdown value change, save to collectionIds data array
   */
  _onCollectionListChange(e) {
    let position = e.currentTarget.dataset.position;
    let selected = e.detail.value;
    let match = this.collectionIds.filter(
      (c) => c.position === parseInt(position)
    )[0];
    if (match) {
      match.selected = selected;
      //   this.isDirty = true;
      this.requestUpdate();
    }
  }

  /**
   * @method _onTrashClicked
   * @description trash clicked, remove panel from admin view
   */
  _onTrashClicked(e) {
    this.dispatchEvent(
      new CustomEvent("trash-clicked", {
        detail: {
          position: this.position,
        },
      })
    );
    // this.isDirty = true;
    requestAnimationFrame(() => {
      this.dispatchEvent(new CustomEvent("panel-loaded"));
    });
  }

  /**
   * @method _onUpArrowClicked
   * @description move panel up in admin view
   */
  _onUpArrowClicked(e) {
    this.dispatchEvent(
      new CustomEvent("up-arrow-clicked", {
        detail: {
          position: this.position,
        },
      })
    );
    this.isDirty = true;
    this.sortedCollectionsList = [
      ...Object.entries(APP_CONFIG.collectionLabels).sort((a, b) =>
        a[1] < b[1] ? -1 : 1
      ),
    ];
    // this.requestUpdate();
    requestAnimationFrame(() => {
      this.dispatchEvent(new CustomEvent("panel-loaded"));
    });
  }

  /**
   * @method _onDownArrowClicked
   * @description move panel down in admin view
   */
  _onDownArrowClicked(e) {
    this.dispatchEvent(
      new CustomEvent("down-arrow-clicked", {
        detail: {
          position: this.position,
        },
      })
    );
    this.isDirty = true;
    this.sortedCollectionsList = [
      ...Object.entries(APP_CONFIG.collectionLabels).sort((a, b) =>
        a[1] < b[1] ? -1 : 1
      ),
    ];
    // this.requestUpdate();
    requestAnimationFrame(() => {
      this.dispatchEvent(new CustomEvent("panel-loaded"));
    });
  }

  /**
   * @method _ssSelectFocusIn
   * @description slim select focus change, color should be gold if active, blue if not
   * @param {Object} e
   */
  _ssSelectFocusIn(e) {
    let ssMain = e.currentTarget.shadowRoot.querySelector('.ss-main');
    let ssSingleSelected = e.currentTarget.shadowRoot.querySelector('.ss-single-selected');

    if( ssSingleSelected?.classList.value === 'ss-single-selected ss-open-below' ) {
      ssSingleSelected.style.backgroundColor = '#FFF4D2'; // gold-30
      ssMain.style.borderColor = '#FFBF00'; // gold
    }
  }

  /**
   * @method _ssSelectBlur
   * @description slim select focus change, color should be gold if active, blue if not
   * @param {Object} e
   */
  _ssSelectBlur(e) {
    let ssMain = e.currentTarget.shadowRoot.querySelector('.ss-main');
    let ssSingleSelected = e.currentTarget.shadowRoot.querySelector('.ss-single-selected');

    ssSingleSelected.style.backgroundColor = '#B0D0ED'; // blue-50
    ssMain.style.borderColor = '#B0D0ED'; // blue-50
  }
}

customElements.define("admin-content-panel", AdminContentPanel);


/***/ }),

/***/ "./public/elements/components/admin/admin-content-panel.tpl.js":
/*!*********************************************************************!*\
  !*** ./public/elements/components/admin/admin-content-panel.tpl.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/shared-styles */ "./public/elements/styles/shared-styles.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_lists_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_lists.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_lists.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_index.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_index.css.js");
/* harmony import */ var _ucd_lib_theme_sass_1_base_html_forms_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ucd-lib/theme-sass/1_base_html/_forms.css */ "./public/node_modules/@ucd-lib/theme-sass/1_base_html/_forms.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_forms_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_forms.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_forms.css.js");








function render() {
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <style>
      ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__.sharedStyles}
        ${_ucd_lib_theme_sass_2_base_class_lists_css__WEBPACK_IMPORTED_MODULE_2__["default"]}
        ${_ucd_lib_theme_sass_2_base_class_index_css__WEBPACK_IMPORTED_MODULE_3__["default"]}
        ${_ucd_lib_theme_sass_1_base_html_forms_css__WEBPACK_IMPORTED_MODULE_4__["default"]}
        ${_ucd_lib_theme_sass_2_base_class_forms_css__WEBPACK_IMPORTED_MODULE_5__["default"]}
        :host {
        display: block;
        position: relative;
        z-index: 500;
        padding-bottom: 5rem;
      }
      /*
  input,
  textarea {
    border: none;
  } */

      .icon-wrapper {
        height: 50px;
        width: 50px;
        background-color: var(--color-aggie-blue-70);
        border-radius: 50%;
        display: inline-block;
        margin-left: 0.3rem;
        cursor: pointer;
      }

      .icon-wrapper ucdlib-icon {
        fill: white;
        width: 50%;
        height: 50%;
        margin: auto;
        padding-top: 0.6rem;
      }

      .icon-wrapper.edit {
        background-color: var(--color-aggie-blue-80);
      }

      .icon-wrapper:hover {
        background-color: var(--color-aggie-blue);
      }

      .icon-wrapper.edit:hover {
        background-color: var(--color-aggie-gold);
      }

      .icon-wrapper.edit:hover ucdlib-icon {
        fill: var(--color-aggie-blue);
      }

      .editor-row-control {
        display: flex;
        align-items: center;
        z-index: 500;
        position: relative;
      }

      .dots {
        height: 25px;
        border-bottom: 5px dotted var(--color-dams-secondary);
        margin: -25px 0.5rem 0;
      }

      .flex-expand {
        flex: 1;
      }

      .form-content {
        width: 50%;
        margin: 0 auto;
        padding-bottom: 3rem;
      }

      .form-label {
        font-weight: bold;
      }

      .content-row,
      .collection-list {
        padding-left: 1rem;
      }

      .list--reset > li {
        display: inline-block;
        padding-right: 0.5rem;
      }

      fieldset {
        border: none;
      }

      .radio label:before {
        top: 5px;
        left: -1px;
      }

      .list--reset,
      ucd-theme-slim-select,
      .description,
      .heading-text,
      .single-collection {
        margin-top: 0.5rem;
      }

      .add-collection-container {
        padding-top: 1rem;
      }

      .add-collection-container ucdlib-icon {
        display: inline-block;
      }

      .add-collection-label {
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
        font-size: 0.8rem;
        font-weight: bold;
        white-space: nowrap;
        min-width: 9rem;
      }

      .add-collection-label ucdlib-icon {
        height: 50%;
        position: relative;
        top: 5%;
        left: -5%;
        fill: var(--color-aggie-gold);
        padding-top: 0.5rem;
      }

      .add-collection-label:hover {
        background-color: var(--color-aggie-blue);
      }

      .add-collection-label span {
        position: relative;
        top: 20%;
        right: 20%;
      }

      .collection-list ucd-theme-slim-select {
        padding-top: 0.5rem;
      }

      .remove-collection ucdlib-icon {
        fill: var(--color-aggie-blue-80)
      }

      @media (max-width: 991px) {
        /* tablet and mobile, just style full width */
        .form-content {
          width: 90%;
        }
      }
    </style>

    <div class="editor-row-control">
      <div class="icon-wrapper edit" @click="${this._onUpArrowClicked}">
        <ucdlib-icon icon="ucdlib-dams:fa-arrow-up"></ucdlib-icon>
      </div>
      <div
        class="icon-wrapper edit"
        style="margin-left: .3rem;"
        @click="${this._onDownArrowClicked}"
      >
        <ucdlib-icon icon="ucdlib-dams:fa-arrow-down"></ucdlib-icon>
      </div>
      <div class="dots flex-expand"></div>
      <div style="background-color: var(--color-aggie-blue-40); height: 75px">
        <ucdlib-icon
          icon="ucdlib-dams:${this.controlIcons[this.type]}"
          style="width: 150px; height: 100%;"
        ></ucdlib-icon>
      </div>
      <div class="dots flex-expand"></div>
      <div class="icon-wrapper edit" @click="${this._onTrashClicked}">
        <ucdlib-icon icon="ucdlib-dams:fa-trash"></ucdlib-icon>
      </div>
    </div>

    <div class="form-content">
      <fieldset class="radio">
        <div ?hidden="${this.type !== "single"}">
          <span class="form-label">Feature Image</span>
          <ul class="list--reset">
            <li>
              <input
                id="placement-left"
                name="radio"
                type="radio"
                class="radio"
                value="left"
                ?checked="${this.placement === "left"}"
                @change="${(e) => (this.placement = e.currentTarget.value)}"
              /><label for="placement-left">Left</label>
            </li>
            <li>
              <input
                id="placement-right"
                name="radio"
                type="radio"
                class="radio"
                value="right"
                ?checked="${this.placement === "right"}"
                @change="${(e) => (this.placement = e.currentTarget.value)}"
              /><label for="placement-right">Right</label>
            </li>
          </ul>
        </div>

        <div ?hidden="${this.type !== "text"}">
          <span class="form-label">Text Placement</span>
          <ul class="list--reset">
            <li>
              <input
                id="placement-centered"
                name="radio"
                type="radio"
                class="radio"
                value="centered"
                ?checked="${this.placement === "centered"}"
                @change="${(e) => (this.placement = e.currentTarget.value)}"
              /><label for="placement-centered">Centered</label>
            </li>
            <li>
              <input
                id="placement-left-aligned"
                name="radio"
                type="radio"
                class="radio"
                value="left-aligned"
                ?checked="${this.placement === "left-aligned"}"
                @change="${(e) => (this.placement = e.currentTarget.value)}"
              /><label for="placement-left-aligned">Left-aligned</label>
            </li>
            <li>
              <input
                id="placement-split"
                name="radio"
                type="radio"
                class="radio"
                value="split"
                ?checked="${this.placement === "split"}"
                @change="${(e) => (this.placement = e.currentTarget.value)}"
              /><label for="placement-split">Split (33/67)</label>
            </li>
          </ul>
        </div>
      </fieldset>

      <div class="content-row">
        <div ?hidden="${this.type !== "single"}">
          <span class="form-label">Collection</span>
          <ucd-theme-slim-select
            class="single-collection"
            @change="${(e) => (this.collectionId = e.detail.value)}"
            @focusin="${this._ssSelectFocusIn}"
            @blur="${this._ssSelectBlur}"
          >
            <select>
              <option></option>
              ${this.sortedCollectionsList.map(
                (sc) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
                  <option
                    .value=${sc[0]}
                    ?selected=${this.collectionId === sc[0]}
                  >
                    ${sc[1]}
                  </option>
                `
              )}
            </select>
          </ucd-theme-slim-select>
        </div>
        <div ?hidden="${this.type !== "text"}">
          <span class="form-label">Heading</span>
          <input
            class="heading-text"
            type="text"
            .value=${this.heading}
            style="width: -webkit-fill-available; font-size: 0.9rem;";
            @change="${(e) => (this.heading = e.currentTarget.value)}"
          />
        </div>
      </div>

      <div class="collection-list" ?hidden="${this.type !== "cards"}">
        <span class="form-label">Collections</span>
        ${this.collectionIds.map(
          (c, index) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
            <div class="collection-list-row" style="display: flex; align-items: center; padding-top: .5rem; margin-top: .5rem">
              <ucd-theme-slim-select
                style="flex: 1; padding-top: 0; margin-top: 0"
                @change="${this._onCollectionListChange}"
                @focusin="${this._ssSelectFocusIn}"
                @blur="${this._ssSelectBlur}"
                data-position="${c.position}"
                class="list"
                .options="${{
                  settings: {
                    openPosition: "up",
                  },
                }}"
              >
                <select class="collections">
                  <option></option>
                  ${this.sortedCollectionsList.map(
                    (sc) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
                      <option
                        .value=${sc[0]}
                        ?selected="${this.collectionIds[index].selected ===
                        sc[0]}"
                      >
                        ${sc[1]}
                      </option>
                    `
                  )}
                </select>
              </ucd-theme-slim-select>
              <div class="remove-collection" data-index="${index}" @click="${this._removeCollection}" style="cursor: pointer; flex: .1; margin-left: 1rem"> 
                <ucdlib-icon icon="ucdlib-dams:fa-trash"></ucdlib-icon>              
              </div>
            </div>
          `
        )}

        <div class="add-collection-container">
          <span class="add-collection-label" @click="${this._addCollection}">
            <ucdlib-icon icon="ucdlib-dams:fa-plus"></ucdlib-icon>
            <span>Add Collection</span>
          </span>
        </div>
      </div>

      <div
        class="content-row"
        style="padding-top: 2rem;"
        ?hidden="${this.type === "cards"}"
      >
        <span class="form-label" style="display: block;">Description</span>
        <textarea
          class="description"
          style="height: 175px; font-size: .9rem; width: -webkit-fill-available;"
          .value=${this.description}
          @change="${(e) => (this.description = e.currentTarget.value)}"
        >
        </textarea>
      </div>
    </div>
  `;
}


/***/ }),

/***/ "./public/elements/components/admin/admin-featured-collections.js":
/*!************************************************************************!*\
  !*** ./public/elements/components/admin/admin-featured-collections.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminFeaturedCollections": () => (/* binding */ AdminFeaturedCollections)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _admin_featured_collections_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin-featured-collections.tpl.js */ "./public/elements/components/admin/admin-featured-collections.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _admin_content_panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./admin-content-panel */ "./public/elements/components/admin/admin-content-panel.js");
/* harmony import */ var _ucd_lib_theme_elements_ucdlib_ucdlib_icon_ucdlib_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon */ "./public/node_modules/@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon.js");









/**
 * @class AdminFeaturedCollections
 * @description admin UI for customizing featured collections on the homepage
 */
class AdminFeaturedCollections extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement).with(
  _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils
) {
  static get properties() {
    return {
      panels : { type : Array },
    };
  }

  constructor() {
    super();
    this.render = _admin_featured_collections_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.active = true;

    this.panels = [];
    // this.isDirty = false;
    this._injectModel("FcAppConfigModel");
  }

  /**
   * @method updated
   * @description Lit lifecycle method
   */
  updated() {
    this._updateUiStyles(null, true);
  }

  /**
   * @method loadAdminData
   * @description load admin panel data
   * 
   * @param {Array} data
   */
  loadAdminData(data) {
    this.panels = data;
  }

  /**
   * @method _newPanel
   * @description Add Content panel click handler, creates new panel and adds to panels array
   * @param {CustomEvent} e
   */
  _newPanel(e) {
    let type = e.currentTarget.classList[0];
    this.panels.push({
      position: this.panels.length,
      type,
      placement: type === "single" ? "left" : "centered",
      collectionId: "",
      heading: "",
      description: "",
      collectionIds: type === "cards" ? [{ position: 0, selected: "" }] : [],
    });
    this.requestUpdate();
    requestAnimationFrame(() => {
      this._updateUiStyles(null, true);
    });
  }

  /**
   * @method _updateUiStyles
   * @description Listener attached to <admin-content-panel> updated events
   * @param {CustomEvent} e
   * @param {Boolean} allPanels set to true to refresh all admin panels
   */
  _updateUiStyles(e, allPanels = false) {
    let panel = e ? e.currentTarget : null;
    if (!panel && !allPanels) return;

    // TODO hack overriding styles of slim select, should we update the brand component to allow custom styles instead?
    let selects = [];
    let panels = [];
    if (allPanels) {
      panels = this.shadowRoot.querySelectorAll("admin-content-panel");
      if (panels.length) {
        panels.forEach((p) => {
          selects.push(
            ...p.shadowRoot.querySelectorAll("ucd-theme-slim-select")
          );
        });
      }
    } else {
      selects.push(
        ...panel.shadowRoot.querySelectorAll("ucd-theme-slim-select")
      );
    }
    if (!selects.length) return;

    selects.forEach((select) => {
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

      // make description text area same width (-padding etc) as select input
      let selectWidth = select.offsetWidth - 30;
      // let description = panel.shadowRoot.querySelector('.description');
      // description.style.width = selectWidth+'px';
    });
  }

  /**
   * @method _trashPanel
   * @description Listener attached to <admin-content-panel> trash events, remove panel
   * @param {CustomEvent} e
   */
  _trashPanel(e) {
    let position = e.detail.position;
    this.panels.splice(position, 1);

    // update position of remaining panels
    this.panels.forEach((panel, i) => {
      panel.position = i;
    });
    this.requestUpdate();
    requestAnimationFrame(() => {
      this._updateUiStyles(null, true);
    });
  }

  /**
   * @method _movePanelUp
   * @description Listener attached to <admin-content-panel> arrow events, reposition panel
   * @param {CustomEvent} e
   */
  _movePanelUp(e) {
    let position = e.detail.position;
    if (position === 0) return;

    this._updatePanelsData();

    let panel = this.panels.splice(position, 1)[0];

    this.panels.splice(position - 1, 0, panel);

    // update position of remaining panels
    this.panels.forEach((panel, i) => {
      panel.position = i;
    });
    // this.isDirty = true;
    this.requestUpdate();
    requestAnimationFrame(() => {
      this._updateUiStyles(null, true);
    });
  }

  /**
   * @method _movePanelUp
   * @description Listener attached to <admin-content-panel> arrow events, reposition panel
   * @param {CustomEvent} e
   */
  _movePanelDown(e) {
    let position = e.detail.position;
    if (position === this.panels.length - 1) return;

    this._updatePanelsData();

    let panel = this.panels.splice(position, 1)[0];

    this.panels.splice(position + 1, 0, panel);

    // update position of remaining panels
    this.panels.forEach((panel, i) => {
      panel.position = i;
    });
    // this.isDirty = true;
    this.requestUpdate();
    requestAnimationFrame(() => {
      this._updateUiStyles(null, true);
    });
  }

  /**
   * @method _updatePanelsData
   * @description loop through panel ui elements and set panels array with currently set data
   */
  _updatePanelsData() {
    let panels = this.shadowRoot.querySelectorAll("admin-content-panel");
    panels.forEach((panel, i) => {
      let match = this.panels.filter((p) => p.position === panel.position)[0];
      if (match) {
        match.placement = panel.type !== "cards" ? panel.placement : "";
        match.collectionId = panel.type === "single" ? panel.collectionId : "";
        match.heading = panel.type === "text" ? panel.heading : "";
        match.description = panel.type !== "cards" ? panel.description : "";
        match.collectionIds = panel.type === "cards" ? panel.collectionIds : [];

        panel.isDirty = true;
      }
    });
    this.panels = [...this.panels];
    requestAnimationFrame(() => {
      this._updateUiStyles(null, true);
    });
  }
}

customElements.define("admin-featured-collections", AdminFeaturedCollections);


/***/ }),

/***/ "./public/elements/components/admin/admin-featured-collections.tpl.js":
/*!****************************************************************************!*\
  !*** ./public/elements/components/admin/admin-featured-collections.tpl.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/shared-styles */ "./public/elements/styles/shared-styles.js");



function render() {
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <style>
      ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_1__.sharedStyles} :host {
        display: block;
        position: relative;
        z-index: 500;
        /* background-color: var(--color-aggie-blue-40) */
      }

      h2 {
        font-style: italic;
        font-weight: 700;
        text-align: center;
        color: var(--color-aggie-blue);
        font-size: 2rem;
      }

      .img-box {
        cursor: pointer;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        border: 3px solid var(--color-aggie-blue-60);
        height: 125px;
        width: 240px;
        margin: 0.5rem;
      }

      .img-box:hover {
        border: 3px solid var(--color-aggie-gold);
        background-color: var(--color-aggie-gold);
      }

      .img-box ucdlib-icon {
        fill: var(--color-aggie-blue-80);
        width: 100%;
        height: 100%;
      }

      .img-box .content-type-label {
        color: var(--color-aggie-blue-80);
        text-align: center;
        display: block;
        padding: 0.5rem;
        font-weight: bold;
      }

      .add-content-container {
        display: flex;
        width: 50%;
        margin: 0 auto;
        justify-content: space-between;
      }

      @media (max-width: 991px) {
        /* tablet and mobile, just style full width */
        .add-content-container {
          width: 90%;
        }
      }
    </style>

    ${this.panels.map(
      (panel) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
        <admin-content-panel
          @panel-loaded="${this._updateUiStyles}"
          @trash-clicked="${this._trashPanel}"
          @up-arrow-clicked="${this._movePanelUp}"
          @down-arrow-clicked="${this._movePanelDown}"
          type="${panel.type}"
          position="${panel.position}"
          placement="${panel.placement}"
          collectionId="${panel.collectionId}"
          heading="${panel.heading}"
          description="${panel.description}"
          .collectionIds="${panel.collectionIds}"
        >
        </admin-content-panel>
      `
    )}

    <h2>Add Content:</h2>
    <div class="add-content-container">
      <div class="single img-box" @click="${this._newPanel}">
        <ucdlib-icon
          icon="ucdlib-dams:dams-admin-collection-single"
        ></ucdlib-icon>
        <span class="content-type-label">Collection Single</span>
      </div>
      <div class="cards img-box" @click="${this._newPanel}">
        <ucdlib-icon
          icon="ucdlib-dams:dams-admin-collection-cards"
        ></ucdlib-icon>
        <span class="content-type-label">Collection Cards</span>
      </div>
      <div class="text img-box" @click="${this._newPanel}">
        <ucdlib-icon icon="ucdlib-dams:dams-admin-text"></ucdlib-icon>
        <span class="content-type-label">Text</span>
      </div>
    </div>
  `;
}


/***/ }),

/***/ "./public/elements/components/graphics/dams-hero.js":
/*!**********************************************************!*\
  !*** ./public/elements/components/graphics/dams-hero.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DamsHero)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _dams_hero_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dams-hero.tpl.js */ "./public/elements/components/graphics/dams-hero.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _ucd_lib_theme_elements_brand_ucd_theme_header_ucd_theme_header_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ucd-lib/theme-elements/brand/ucd-theme-header/ucd-theme-header.js */ "./public/node_modules/@ucd-lib/theme-elements/brand/ucd-theme-header/ucd-theme-header.js");
/* harmony import */ var _ucd_lib_theme_elements_brand_ucd_theme_primary_nav_ucd_theme_primary_nav_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ucd-lib/theme-elements/brand/ucd-theme-primary-nav/ucd-theme-primary-nav.js */ "./public/node_modules/@ucd-lib/theme-elements/brand/ucd-theme-primary-nav/ucd-theme-primary-nav.js");
/* harmony import */ var _dams_watercolor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dams-watercolor */ "./public/elements/components/graphics/dams-watercolor.js");











/**
 * @class DamsHero
 * @description UI component for displaying a hero image
 * @prop {Array} srcOptions - Set of image sources to randomly display
 * @prop {String} src - Fallback background image source
 * @prop {String} watercolor - Watercolor type
 * @prop {String} selectedSrcUrl - The currently displayed image source
 */
class DamsHero extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
.with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {

  static get properties() {
    return {
      src: {type: String},
      srcOptions: {type: Array, attribute: "src-options"},
      watercolor: {type: String},
      selectedSrcUrl: {type: String, attribute: "selected-src-url"}
    };
  }

  constructor() {
    super();
    this.render = _dams_hero_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.src = "";
    this.srcOptions = [];
    this.selectedSrcUrl = "";
    this.watercolor = "border-white";

    this._srcChange = new CustomEvent('src-change', {
      detail: {
        message: 'A new image has been loaded'
      }
    });

    this._injectModel('FcAppConfigModel');
  }


  /**
   * @method shuffleImage
   * @description Randomly displays a new hero image.
   * 
   * @returns {String} The new img src
   */
  shuffleImage(){
    this._setSrc();
    return this.selectedSrcUrl;
  }

  updated(changedProperties) {
    if( changedProperties.has('selectedSrcUrl') && this.selectedSrcUrl.length > 0 ) {
      let img = new Image();
      img.src = this.selectedSrcUrl;

      img.onload = () => {
        let element = this.shadowRoot.querySelector('.image');
        element.style.backgroundImage += 'var(--gradient-ag-putah), url(' + img.src + ')';
        element.style.backgroundSize = 'cover';
        element.style.opacity = '1';
      };
    }
  }

  /**
   * @method _setSrc
   * @description Sets the background image src property.
   */
  async _setSrc(){
    // let featuredImages = await this.FcAppConfigModel.getDefaultImagesConfig();
    // this.srcOptions = featuredImages?.body?.featuredImages;

    if( !this.srcOptions || this.srcOptions.length < 1 ) {
      this.selectedSrcUrl = '/images/defaults/annual-winter-sale1952.jpg';
      this.dispatchEvent(this._srcChange);
      return;
    }

    let i = Math.floor(Math.random() *  this.srcOptions.length);
    let src = this.srcOptions[i];
    this.selectedSrcUrl = src.imageUrl;

    let img = new Image();
    img.src = this.selectedSrcUrl;

    img.onload = () => {
      let element = this.shadowRoot.querySelector('.image');
      element.style.backgroundImage += 'var(--gradient-ag-putah), url(' + img.src + ')';
      element.style.opacity = '1';
    };

    
    this.dispatchEvent(this._srcChange);
  }

  /**
   * @method getContainerStyles
   * @description Inline styles for element's base container
   * 
   * @returns {Object}
   */
  getContainerStyles(){
    let styles = {
      'background-image': 'var(--gradient-ag-putah)'
    };
    return styles;
  }

}

customElements.define('dams-hero', DamsHero);


/***/ }),

/***/ "./public/elements/components/graphics/dams-hero.tpl.js":
/*!**************************************************************!*\
  !*** ./public/elements/components/graphics/dams-hero.tpl.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var lit_html_directives_style_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit-html/directives/style-map.js */ "./public/node_modules/lit-html/development/directives/style-map.js");



function render() { 
return lit__WEBPACK_IMPORTED_MODULE_0__.html`

<style>
  :host {
    display: block;
  }
  .container {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    z-index: 1;
  }
  .image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    animation: fadein 1.5s ease-in-out;
    z-index: -1;
  }
  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  ::slotted(*) {
    color: var(--color-white) !important;
  }
  dams-watercolor {
    display: block;
    height: 8rem;
    margin-bottom: -1px; /* hack to ensure we don't get line at bottom */
  }
  
</style>

<div class="container" style="${(0,lit_html_directives_style_map_js__WEBPACK_IMPORTED_MODULE_1__.styleMap)(this.getContainerStyles())}">  
  <div class="image"></div>
  <slot></slot>
  ${this.watercolor ? lit__WEBPACK_IMPORTED_MODULE_0__.html`
    <dams-watercolor 
      element="div"
      src-file-prefix="${this.watercolor.split("-")[0]}"
      color="${this.watercolor.split("-")[1]}">
    </dams-watercolor>
  `: lit__WEBPACK_IMPORTED_MODULE_0__.html``}
</div>

`;}

/***/ }),

/***/ "./public/elements/components/sections/dams-highlighted-collection.js":
/*!****************************************************************************!*\
  !*** ./public/elements/components/sections/dams-highlighted-collection.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DamsHighlightedCollection)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _dams_highlighted_collection_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dams-highlighted-collection.tpl.js */ "./public/elements/components/sections/dams-highlighted-collection.tpl.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/utils/index.js */ "./public/lib/utils/index.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__);








/**
 * @class DamsHighlightedCollection
 * @description Homepage UI component class for displaying a page section higlighting a collection.
 *
 * @prop {Object} collection - A featured collection from the FcAppConfigModel.
 * @prop {Boolean} imageRight - Should the image be on the right or left?
 */
class DamsHighlightedCollection extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement).with(
  _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils
) {
  static get properties() {
    return {
      collection: { type: Object },
      collectionId: { type: String, attribute: "collection-id" },
      imageRight: { type: Boolean, attribute: "image-right" },
      collectionTitle: { type: String, attribute: "collection-title" },
      imgSrc: { type: String, attribute: "img-src" },
      collectionDesc: { type: String, attribute: "collection-desc" },
      itemCt: { type: Number, attribute: "item-ct" },
      href: { type: String },
    };
  }

  constructor() {
    super();
    this.render = _dams_highlighted_collection_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.collection = {};
    this.collectionId = "";
    this.renderedCollectionid = "";
    this.imageRight = false;
    this.collectionTitle = "";
    this.imgSrc = "";
    this.collectionDesc = "";
    this.itemCt = 0;
    this.href = "";

    this._injectModel("CollectionModel");
  }

  /**
   * @method willUpdate
   * @description Lit lifecycle method called when element is updated.
   * @param {Map} props - Properties that have changed.
   */
  willUpdate(props) {
    if (Object.keys(this.collection).length) {
      if (this.collection.label) {
        this._collectionTitle = this.collection.label;
      } else if (this.collection.associatedMedia.name) {
        this._collectionTitle = this.collection.associatedMedia.name;
      }
      if (this.collection.description) {
        this._collectionDesc = this.collection.description;
      } else if (this.collection.associatedMedia.description) {
        this._collectionDesc = this.collection.associatedMedia.description;
      }
      this._imgSrc = this.collection.thumbnailUrl
        ? this.collection.thumbnailUrl
        : this.collection.associatedMedia.thumbnailUrl;
      this._itemCt = this.collection.associatedMedia.recordCount;
      this._href = this.collection.associatedMedia["@id"];
    } else if (this.collectionId && this.collectionId !== this.renderedCollectionid) {
      this.renderedCollectionid = this.collectionId;
      this._getCollection(this.collectionId);
    }
  }

  async _getCollection(id) {
    let res = await this.CollectionModel.get(id);

    let clientEditsId = res.vcData.clientEdits?.['@id'];
    let overriddenFeatureImage =  res.vcData.clientEdits?.thumbnailUrl?.['@id'];
    if( clientEditsId && overriddenFeatureImage ) {
      this.imgSrc = '/fcrepo/rest' + clientEditsId + '/featuredImage.jpg';
    } else if( res.vcData.images ) {
      let images = res.vcData.images;
      this.imgSrc = images.medium ? images.medium.url : images.original.url;
    } else {
      this.imgSrc = "/images/tree-bike-illustration.png";
    }
    this.collectionTitle = res.vcData.title;
    this.itemCt = _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3___default().formatNumberWithCommas(res.vcData.count);
    this.href = res.id;
  }
}

customElements.define("dams-highlighted-collection", DamsHighlightedCollection);


/***/ }),

/***/ "./public/elements/components/sections/dams-highlighted-collection.tpl.js":
/*!********************************************************************************!*\
  !*** ./public/elements/components/sections/dams-highlighted-collection.tpl.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var lit_html_directives_class_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit-html/directives/class-map.js */ "./public/node_modules/lit-html/development/directives/class-map.js");
/* harmony import */ var _ucd_lib_theme_sass_1_base_html_links_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/theme-sass/1_base_html/_links.css */ "./public/node_modules/@ucd-lib/theme-sass/1_base_html/_links.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_buttons_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_buttons.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_buttons.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_headings_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_headings.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_headings.css.js");



// import index1Css from "@ucd-lib/theme-sass/1_base_html/_index.css";


// import index2Css from "@ucd-lib/theme-sass/2_base_class/_index.css";
// import index3Css from "@ucd-lib/theme-sass/3_objects/_index.css";
// import index4Css from "@ucd-lib/theme-sass/4_component/_index.css";
// import index5Css from "@ucd-lib/theme-sass/5_layout/_index.css";
// import index6Css from "@ucd-lib/theme-sass/6_utility/_index.css";
// import faCss from "@fortawesome/fontawesome-free/css/all.css";
// this.logger.info(faCss);

function render() { 
return lit__WEBPACK_IMPORTED_MODULE_0__.html`

<style>
  /* ${lit__WEBPACK_IMPORTED_MODULE_0__.css`faCss`} */
  ${_ucd_lib_theme_sass_1_base_html_links_css__WEBPACK_IMPORTED_MODULE_2__["default"]}
  ${_ucd_lib_theme_sass_2_base_class_buttons_css__WEBPACK_IMPORTED_MODULE_3__["default"]}
  ${_ucd_lib_theme_sass_2_base_class_headings_css__WEBPACK_IMPORTED_MODULE_4__["default"]}
  :host {
    display: block;
  }
  .container {
    display: flex;
    flex-direction: column;
  }
  .img-container {
    position: relative;
    padding-top: 75%;
    width: 100%;
    /* background-image: url(/images/logos/logo-white-512.png);
    background-color: var(--color-black-20);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center; */
  }
  .img-flex {
    flex-grow: 1;
  }
  .img-container img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .text-container {
    flex-grow: 1;
    align-self: flex-start;
    padding: 2rem 0;
  }
  .title {
    /* color: var(--color-h3);
    font-size: var(--fs-h3);
    font-weight: var(--fw-h3); */
    margin-bottom: 5px;
    margin-top: 40px;
  }
  .subtitle {
    color: var(--color-h5);
    font-size: var(--fs-h5);
    font-weight: var(--fw-h5);
    margin-bottom: 20px;
  }
  .description {
    color: var(--color-p);
    /* font-size: var(--fs-p); */
    font-weight: var(--fw-p);
    margin-bottom: 40px;
  }
  .btn--alt {
    padding-top: 0;
    padding-bottom: 0;
  }
  @media (min-width: 767px) {
    .container {
      flex-direction: row;
    }
    .container.image-right {
      flex-direction: row-reverse;
    }
    .img-flex {
      flex-grow: unset;
      width: calc(50% - 20px);
      min-width: calc(50% - 20px);
    }
    .title {
      margin-top: 0;
    }
    .text-container {
      align-self: center;
      padding: 2rem;
    }
  }

  @media (min-width: 1060px) {
    .img-flex {
      width: calc(50% - 50px);
      min-width: calc(50% - 50px);
    }
  }

  @media (min-width: 1601px) {


  }
</style>  
<div class="container${this.imageRight ? ' image-right' : ''}">

  <div class="img-flex">
    <div class="img-container">
      ${this.imgSrc ? lit__WEBPACK_IMPORTED_MODULE_0__.html`
        <img src="${this.imgSrc}">
      ` : lit__WEBPACK_IMPORTED_MODULE_0__.html``}
      <!-- <img src="/images/eastman-demo.jpeg"> -->
    </div>
  </div>

  <div class="text-container">
    <h3 class="title heading--primary" role="heading" aria-level="2">${this.collectionTitle}</h3>
    <div class="subtitle">${this.itemCt} item${this.itemCt === 1 ? "" : "s"}</div>
    <div class="description">
    <ucdlib-md id="md">
        <ucdlib-md-content>
          ${this.collectionDesc}
        </ucdlib-md-content>
      </ucdlib-md>  
    </div>
    <a href="${this.href}" class="btn--alt btn--round">Explore this collection</a>
  </div>

  <!-- <div class="text-container">
    <h3 class="heading--primary">Eastman's Originals</h3>
    <div class="subtitle">13,258 items</div>
    <div class="description">
      Photographs, negatives and postcards captured by Jervie Henry Eastman for a wide
      variety of northern California locations and events, including dam construction, logging, mining, food processing,
      and commmunity buildings and activities from circa 1890 - 1960.
    </div>
    <a href="${this._href}" class="btn--alt btn--round">Explore this collection</a>
  </div> -->

</div>
`;}

/***/ }),

/***/ "./public/elements/pages/home/app-home.js":
/*!************************************************!*\
  !*** ./public/elements/pages/home/app-home.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _ucd_lib_theme_elements_utils_mixins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ucd-lib/theme-elements/utils/mixins */ "./public/node_modules/@ucd-lib/theme-elements/utils/mixins/index.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _utils_app_collection_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/app-collection-card */ "./public/elements/utils/app-collection-card.js");
/* harmony import */ var _ucd_lib_theme_elements_ucdlib_ucdlib_md_ucdlib_md__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ucd-lib/theme-elements/ucdlib/ucdlib-md/ucdlib-md */ "./public/node_modules/@ucd-lib/theme-elements/ucdlib/ucdlib-md/ucdlib-md.js");
/* harmony import */ var _ucd_lib_theme_elements_ucdlib_ucdlib_iconset_ucdlib_iconset__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ucd-lib/theme-elements/ucdlib/ucdlib-iconset/ucdlib-iconset */ "./public/node_modules/@ucd-lib/theme-elements/ucdlib/ucdlib-iconset/ucdlib-iconset.js");
/* harmony import */ var _ucd_lib_theme_elements_ucdlib_ucdlib_icon_ucdlib_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon */ "./public/node_modules/@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon.js");
/* harmony import */ var _ucd_lib_theme_elements_ucdlib_ucdlib_icons_ucdlib_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ucd-lib/theme-elements/ucdlib/ucdlib-icons/ucdlib-icons */ "./public/node_modules/@ucd-lib/theme-elements/ucdlib/ucdlib-icons/ucdlib-icons.js");
/* harmony import */ var _utils_app_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/app-icons */ "./public/elements/utils/app-icons.js");
/* harmony import */ var _components_search_box__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/search-box */ "./public/elements/components/search-box.js");
/* harmony import */ var _components_nav_bar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/nav-bar */ "./public/elements/components/nav-bar.js");
/* harmony import */ var _components_filterButton__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/filterButton */ "./public/elements/components/filterButton.js");
/* harmony import */ var _components_graphics_dams_watercolor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/graphics/dams-watercolor */ "./public/elements/components/graphics/dams-watercolor.js");
/* harmony import */ var _components_graphics_dams_watercolor_overlay__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/graphics/dams-watercolor-overlay */ "./public/elements/components/graphics/dams-watercolor-overlay.js");
/* harmony import */ var _components_cards_dams_collection_card__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../components/cards/dams-collection-card */ "./public/elements/components/cards/dams-collection-card.js");
/* harmony import */ var _components_cards_dams_item_card__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../components/cards/dams-item-card */ "./public/elements/components/cards/dams-item-card.js");
/* harmony import */ var _components_graphics_dams_hero__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../components/graphics/dams-hero */ "./public/elements/components/graphics/dams-hero.js");
/* harmony import */ var _components_sections_dams_highlighted_collection__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../components/sections/dams-highlighted-collection */ "./public/elements/components/sections/dams-highlighted-collection.js");
/* harmony import */ var _components_admin_admin_featured_collections__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../components/admin/admin-featured-collections */ "./public/elements/components/admin/admin-featured-collections.js");
/* harmony import */ var _lib_utils_user__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../lib/utils/user */ "./public/lib/utils/user.js");
/* harmony import */ var _app_home_tpl_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./app-home.tpl.js */ "./public/elements/pages/home/app-home.tpl.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../lib/utils/index.js */ "./public/lib/utils/index.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_21__);

















// import "../../components/welcome-modal.js";













/**
 * @class AppHome
 * @description home page is rendered to the DAMS v2
 * 
 * @prop {Object[]} featuredCollections - Collections to  be displayed on homepage. Retrieved by model.
 * @prop {Number} featuredCollectionsCt - Total number of featured collections.
 * @prop {Object[]} recentCollections - Array of recently uploaded collections.
 * @prop {Boolean} showCollectionGroup - Displays the featured multi-collection section.
 * @prop {Object} textTrio - ApplicationTextContainer for the collection group.
 * @prop {Array} heroImgOptions - Data options for the hero image (src, collection name, etc)
 * @prop {Object} heroImgCurrent - The currently displayed hero image.
 */
class AppHome extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement)
  .with(_ucd_lib_theme_elements_utils_mixins__WEBPACK_IMPORTED_MODULE_1__.MainDomElement, _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_2__.LitCorkUtils) {
  
  static get properties() {
    return {
      featuredCollections: {type : Array},
      featuredCollectionsCt: {type: Number},
      recentCollections: {type: Array},
      showCollectionGroup: {type: Boolean},
      textTrio: {type: Object},
      heroImgOptions: {type: Array},
      heroImgCurrent: {type: Object},
      heroUrl: {type: String},
      heroItemLabel: {type: String},
      heroItemUrl: {type: String},
      heroCollectionLabel: {type: String},
      heroCollectionUrl: {type: String},
      editMode: {type: Boolean},
      displayData: {type: Array},
      isUiAdmin: {type: Boolean},
      // showWelcomeModal: {type: Boolean},
      // welcomeModalTitle: {type: String},
      // welcomeModalContent: {type: String}
    };
  }

  constructor() {
    super();
    this.render = _app_home_tpl_js__WEBPACK_IMPORTED_MODULE_20__["default"].bind(this);
    this.active = true;
    this.featuredCollections = [];
    this.featuredCollectionsCt = 0;
    this.showCollectionGroup = false;
    this.recentCollections = [];
    this.textTrio = {};
    this.heroImgOptions = [];
    this.heroImgCurrent = {};
    this.heroUrl = '';
    this.heroItemLabel = '';
    this.heroItemUrl = '';
    this.heroCollectionLabel = '...';
    this.heroCollectionUrl = '...';
    this.displayData = [];
    this.editMode = false;
    this.isUiAdmin = false;
    // this.showWelcomeModal = false;
    // this.welcomeModalTitle = 'Welcome to the new Digital Collections!';
    // this.welcomeModalContent = `We've recently updated this site. Pardon our dust as we put on the finishing touches.`;
    this._injectModel('AppStateModel', 'FcAppConfigModel', 'CollectionModel', 'RecordModel');
  }

  /**
   * @method firstUpdated
   * @description Lit lifecycle method called when element is first updated
   */
  async firstUpdated() {
    this.isUiAdmin = _lib_utils_user__WEBPACK_IMPORTED_MODULE_19__["default"].canEditUi();

    this._setFeaturedImage();

    try {
      let displayData = await this.FcAppConfigModel.getFeaturedCollectionAppData();
      if( displayData && displayData.body ) {
        if( typeof displayData.body === 'string' ) displayData.body = JSON.parse(displayData.body);
        this.displayData = displayData.body;

        let adminPanel = document.querySelector('admin-featured-collections');
        if( adminPanel ) {
          adminPanel.loadAdminData(this.displayData);
        }
      }
  
      // filter out collections that don't exist in fcrepo
      let cardsPanels = this.displayData.filter(d => d.type === 'cards');
      cardsPanels.forEach(async panel => {
        let collectionIds = [];
  
        panel.collectionIds.forEach(collectionId => {
          if( APP_CONFIG.collectionLabels[collectionId.selected] ) collectionIds.push(collectionId);
        });
        panel.collectionIds = collectionIds;
      });
    } catch(e) {
      this.logger.warn('No featured collections admin data found', e);
    }

    // get recent collections
    let data = await this.CollectionModel.getRecentCollections();
    if( data?.payload?.results?.length ) {
      this.recentCollections = data?.payload?.results?.slice(0, 3);
    }

    this.requestUpdate();
  }

  /**
   * @method _onAppStateUpdate
   * @description on the App update, the state is determined and by checking
   * the location
   *
   * @param {Object} e
   */
    async _onAppStateUpdate(e) {
      if( this.AppStateModel.location.page !== 'home' && this.visitedHome ) {
        // this._onWelcomeModalClose(); // nav away from home is enough to close modal
      }
      this.visitedHome = true;
    }

  _setFeaturedImage() {
    this.heroImgOptions = (APP_CONFIG.featuredImages || []);

    // if collection doesn't exist for a featured image, remove it from the list
    this.heroImgOptions = this.heroImgOptions.filter(i => {
      return APP_CONFIG.collectionLabels[i.collectionLink];
    });

    let i = Math.floor(Math.random() *  this.heroImgOptions.length);
    let src = this.heroImgOptions[i];

    this.heroUrl = src.imageUrl;
    this.heroItemLabel = src.itemName;
    this.heroItemUrl = src.itemLink;
    this.heroCollectionLabel = src.collectionName;
    this.heroCollectionUrl = src.collectionLink;

    if( this.heroItemLabel.length > 75 ) this.heroItemLabel = this.heroItemLabel.substring(0, 75) + '...';
    if( this.heroCollectionLabel.length > 75 ) this.heroCollectionLabel = this.heroCollectionLabel.substring(0, 75) + '...';
  }

  /**
   * @method _onHeroChange
   * @description Listener attached to <dams-hero> image change
   * @param {CustomEvent} e 
   */
  _onHeroChange(e) {
    let imageUrl = e.target._selectedSrc;
    if ( !imageUrl ) return;
    this.heroImgCurrent = this.heroImgOptions.filter(i => i.imageUrl === imageUrl)[0];
  }  

  /**
   * @method _onHeroChange
   * @description Listener attached to <dams-hero> image change
   * @param {CustomEvent} e 
   */
  // _onWelcomeModalClose(e) {
  //   utils.setCookie('welcome_modal_dismissed', 'true', 365)
  //   this.showWelcomeModal = false;
  // }

  /**
   * @method _onEditClicked
   * @description admin ui, edit button click event
   * 
   * @param {Object} e 
   */
  _onEditClicked(e) {
    if( !this.isUiAdmin ) return;
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
    // save to fcrepo container
    //   also how to handle validation that all 6 featured items are populated? or more like how to alert user
    let adminPanel = document.querySelector('admin-featured-collections');
    if( adminPanel ) {
      adminPanel._updatePanelsData();
      this.displayData = adminPanel.panels;
    }
    await this.FcAppConfigModel.saveFeaturedCollectionAppData(this.displayData);
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
  }

  /**
   * @method _onSearch
   * @description called from the search box button is clicked or
   * the enter key is hit.  set the text filter
   * @param {Object} e
   */
  _onSearch(e) {
    // let searchDoc = this._getEmptySearchDocument();
    let searchDoc = this.RecordModel.emptySearchDocument();
    // this._setTextFilter(searchDoc, e.detail);
    this.RecordModel.setTextFilter(searchDoc, e.detail);
    this.RecordModel.setSearchLocation(searchDoc);
  }

  /**
   * @method _onCollectionClicked
   * @description called when collection img on home page is clicked 
   * @param {Object} e
   */
  _onCollectionClicked(e) {
    if( e.type === 'keyup' && e.which !== 13 ) return;
    let id = e.currentTarget.getAttribute('data-id');
    this._onCollectionSelected(id);
  }

  /**
   * @method _onCollectionSelected
   * @description filter based on a collection using short ids.
   * @param {String} id
   * 
   */
  _onCollectionSelected(id) {
    this._setWindowLocation(id);
  }
  
}

customElements.define('app-home', AppHome);

/***/ }),

/***/ "./public/elements/pages/home/app-home.tpl.js":
/*!****************************************************!*\
  !*** ./public/elements/pages/home/app-home.tpl.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _utils_shared_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/shared-html */ "./public/elements/utils/shared-html.js");
/* harmony import */ var _styles_shared_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/shared-styles */ "./public/elements/styles/shared-styles.js");
/* harmony import */ var _ucd_lib_theme_sass_4_component_priority_links_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ucd-lib/theme-sass/4_component/_priority-links.css */ "./public/node_modules/@ucd-lib/theme-sass/4_component/_priority-links.css.js");
/* harmony import */ var _ucd_lib_theme_sass_4_component_icons_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ucd-lib/theme-sass/4_component/_icons.css */ "./public/node_modules/@ucd-lib/theme-sass/4_component/_icons.css.js");
/* harmony import */ var _ucd_lib_theme_sass_4_component_category_brand_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ucd-lib/theme-sass/4_component/_category-brand.css */ "./public/node_modules/@ucd-lib/theme-sass/4_component/_category-brand.css.js");
/* harmony import */ var _ucd_lib_theme_sass_4_component_vertical_link_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ucd-lib/theme-sass/4_component/_vertical-link.css */ "./public/node_modules/@ucd-lib/theme-sass/4_component/_vertical-link.css.js");
/* harmony import */ var _ucd_lib_theme_sass_4_component_mobile_bar_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ucd-lib/theme-sass/4_component/_mobile-bar.css */ "./public/node_modules/@ucd-lib/theme-sass/4_component/_mobile-bar.css.js");
/* harmony import */ var _ucd_lib_theme_sass_4_component_nav_toggle_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ucd-lib/theme-sass/4_component/_nav-toggle.css */ "./public/node_modules/@ucd-lib/theme-sass/4_component/_nav-toggle.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_headings_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_headings.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_headings.css.js");
/* harmony import */ var _ucd_lib_theme_sass_1_base_html_links_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ucd-lib/theme-sass/1_base_html/_links.css */ "./public/node_modules/@ucd-lib/theme-sass/1_base_html/_links.css.js");
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_buttons_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_buttons.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_buttons.css.js");














function render() {
  return lit__WEBPACK_IMPORTED_MODULE_0__.html`
<style>
  ${_styles_shared_styles__WEBPACK_IMPORTED_MODULE_2__.sharedStyles}
  ${_ucd_lib_theme_sass_4_component_priority_links_css__WEBPACK_IMPORTED_MODULE_3__["default"]}
  ${_ucd_lib_theme_sass_4_component_icons_css__WEBPACK_IMPORTED_MODULE_4__["default"]}
  ${_ucd_lib_theme_sass_4_component_category_brand_css__WEBPACK_IMPORTED_MODULE_5__["default"]}
  ${_ucd_lib_theme_sass_4_component_vertical_link_css__WEBPACK_IMPORTED_MODULE_6__["default"]}
  ${_ucd_lib_theme_sass_4_component_mobile_bar_css__WEBPACK_IMPORTED_MODULE_7__["default"]}
  ${_ucd_lib_theme_sass_4_component_nav_toggle_css__WEBPACK_IMPORTED_MODULE_8__["default"]}
  ${_ucd_lib_theme_sass_2_base_class_headings_css__WEBPACK_IMPORTED_MODULE_9__["default"]}
  ${_ucd_lib_theme_sass_1_base_html_links_css__WEBPACK_IMPORTED_MODULE_10__["default"]}
  ${_ucd_lib_theme_sass_2_base_class_buttons_css__WEBPACK_IMPORTED_MODULE_11__["default"]}

  :host {
    display: block;
    position: relative;
    background: var(--super-light-background-color);
  }
  a {
    text-decoration: none;
  }
  input {
    padding: 15px;
    display: block;
    width: 90%;
    border: 0;
  }

  .about-link-icon {
    position: absolute;
    z-index: 5;
    top: 25px;
    right: 25px;
  }

  .about-link-icon > iron-icon {
    height: 30px;
    width: 30px;
  }
  .container {
    padding: 25px 10px;
    background: white;
  }

  .search-box {
    z-index: 5;
    color: var(--inverse-text-color);
  }

  .search-box .main {
    padding: 20px;
    background-color: rgba(0, 38, 85, .8);
  }

  .search-box .main h1 {
    margin: 5px 0;
    line-height: 2.0rem;
  }

  .search-box .footer {
    padding: 10px 20px;
    color: white;
    font-size: 0.8rem;
    font-style: italic;
    font-weight: normal;
    line-height: 1.0rem;
    background-color: rgba(51, 83, 121, .8);
  }

  .search-box .footer a {
    color: var(--default-secondary-color);
  }

  .featured-collections {
    background-color: var(--color-aggie-blue-20);
    padding: var(--spacing-md) 0;
  }

  .featured-collections h1 {
    text-align: center;
    color: var(--color-aggie-blue);
  }

  .featured-collections .card-grid {
    margin: 0 auto;
    padding: 20px 0;
  }

  .card-grid {
    max-width: var(--max-width);
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: var(--spacing-default);
  }


  iron-icon.search-icon {
    color: var(--default-primary-color);
  }

  iron-icon.info {
    fill: white;
  }

  #sample {
    background: linear-gradient(0deg, rgba(111,207,235,0.8), rgba(2, 40, 81, 0.8) 100%);
    background-size: cover;
    background-position: center;
    height: auto;
    padding:2rem 4rem 0 4rem;

  }

  #options {
    height: 150px;
    background-color:white;
    width: auto;
    padding: 2rem 4rem;
    vertical-align: middle;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #option{
    display: inline-block;
  }

  #top-header{
    display: inline-block;
    width: 100%;
  }
  #subtext{
    color:white;
    text-decoration: underline;
  }
  .hero-main .sub-search a:hover {
    text-decoration: none;
  }
  #watercolor{
    background-color:transparent;
    height: 8rem;
    margin-left:0px;
  }
  .about{
    text-align: center;
    background-color: var(--color-aggie-blue-40);
  }

  .featured-grid-container {
    display: grid;
    grid-template-columns: 40% 60%;
    background-color: transparent;
    padding: 10px;
  }
  .featured-grid-item {
    padding: 20px;
    font-size: 30px;
    text-align:left;

  }
  .about-grid-container {
    display: grid;
    grid-template-columns: 55% 45%;
    background-color: transparent;
    padding: 10px;
  }
  .about-grid-item {
    padding: 20px;
    font-size: 30px;

  }
  .collection-grid-container {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    background-color: transparent;
    padding: 10px;
  }
  .collection-grid-item {
    padding: 20px;
    font-size: 30px;
  }
  .content {
    background-color:pink;
    margin:20px;
    width:fixed;
    padding: 0px 60px;
    text-align: left;
  }

  .vertical-link--circle .vertical-link__figure:after {
    opacity: 1 !important;
  }

  .about-collections {
    display: flex;
    /* height: 35rem; */
    background-color: var(--color-aggie-blue-80);
    background-image: url(/images/watercolors/watercolor-background-ucd-blue-20opacity.png);
    /* background-position: center;
    padding: 2rem 0 2rem; */
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center top;
    /* background-attachment: fixed; */
  }

  /* STYLES BELOW ARE ACTUALLY USED. NEED TO AUDIT ANYTHING ABOVE */
  [hidden] {
    display: none;
  }
  .hero-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
    margin-top: 20px;
    padding: 0 5%;
  }
  .hero-top-left img {
    height: 32px;
    width: 186px;
  }

  .hero-top-right {
    display: inline-flex;
    align-items: center;
    font-weight: var(--fw-extrabold);
    font-weight: bold;
    font-size: 1rem;
    /* text-transform: uppercase; */
  }
  .hero-top-right a {
    color: var(--color-white);
  }
  .hero-top-right a:hover {
    color: var(--color-dams-secondary);
  }
  .hero-top-right .dot {
    margin: 0 1rem;
    width: 8px;
    height: 8px;
    min-width: 8px;
    min-height: 8px;
  }
  .hero-main h1 {
    margin-bottom: 1rem;
  }
  .hero-main .sub-heading {
    font-weight: var(--fw-p);
    margin-bottom: 3rem;
    margin-top: 1rem;
  }
  /* .hero-main .sub-heading a {
    color: var(--color-dams-secondary);
  }
  .hero-main .sub-heading a:hover, .hero-main .sub-heading a:focus {
    color: var(--color-a-hover);
  } */
  .hero-main app-search-box {
    max-width: 400px;
    margin-bottom: 1rem;
  }
  .hero-main .sub-search {
    color: var(--color-white);
    font-weight: bold;
    font-style: italic;
    font-size: .875rem;
    margin-bottom: 2rem;
  }
  .hero-main .sub-search a {
    color: var(--color-white);
    text-decoration: underline;
  }

  .priority-links {
    padding-top: 2rem;
  }

  .priority-links__item {
    padding-top: 0;
  }

  .browse-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;
    /* padding-bottom: 4rem; */
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

  .recent{
    background-color: var(--color-white);
  }
  .recent h1 {
    margin-bottom: 0;
    text-align: center;
    margin-top: 0;
  }
  .fw-light {
    font-weight: 200;
    font-style: normal;
    margin: 0.75rem 0 0.25rem;
    padding: 0;
    line-height: 1.2;
  }

  .card-trio {
    display: grid;
    grid-template-columns: auto;
    grid-gap: var(--spacing-sm);
  }
  .card-trio dams-collection-card {
    margin-bottom: var(--spacing-default);
  }
  .featured {
    background-color: var(--color-aggie-blue-20);
    padding-top: 4rem;
  }
  .featured h1 {
    margin-bottom: var(--spacing-default);
    text-align: center;
    margin-top: 0;
  }
  .featured dams-watercolor-overlay {
    height: 100px;
  }
  dams-highlighted-collection {
    margin: 40px 0;
  }
  .fg-header {
    display: grid;
    grid-gap: var(--spacing-default);
    grid-template-columns: auto;
    /* margin-bottom: var(--spacing-sm); */
    /* margin-bottom: 2rem 0; */
  }
  .fg-header h3 {
    margin: 0;
  }

  .fg-header.centered {
    display: block;
    width: 66%;
    margin: auto;
    text-align: center;
  }
  .fg-header.centered h3 {
    margin-bottom: 1rem;
  }

  .fg-header.left-aligned {
    display: block;
    width: 66%;
    margin: auto;
    text-align: left;
  }
  .fg-header.left-aligned h3 {
    text-align: left;
    margin-bottom: 1rem;
  }
  .fg-header.left-aligned div {}

  .fg-header.split {}
  .fg-header.split h3 {}
  .fg-header.split div {}

  .featured-collections-public {
    padding: 0 5%;
  }

  .featured-collections-public .featured-more {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: var(--spacing-default) 0 0;
    padding-bottom: 3rem;
  }
  .splat-stars {
    width: 9rem;
  }

  .about-content .btn--alt {
    padding-top: 0;
    padding-bottom: 0;
  }

  /* .featured-group {
    padding: 1rem 0;
  } */

  .featured-collections-public > * {
    padding: 1rem 0;
  }

  .featured-collections-public .two-four,
  .featured-collections-public .three-five {
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: auto;
    grid-gap: var(--spacing-sm);
  }

  .featured-collections-public .three-five {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .featured-collections-public .two-four {    
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 75%;
  }

  @media (max-width: 992px) {
    .featured-collections-public .three-five {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .featured-collections-public .two-four {    
      grid-template-columns: repeat(2, minmax(0, 1fr));
      width: 100%;
    }
  }

  @media (max-width: 767px) {
    /* mobile */
    .featured-group .card-trio {
      margin-right: var(--spacing-sm);
      margin-left: var(--spacing-sm);
    }
    .about-collections {
      display: block;
      height: auto;
    }
    .tree-illustration {
      text-align: center;
      padding-top: 2rem;
    }
    .about-collections .tree-illustration img {
      float: none;
      padding: none;
    }    
    .fg-header.centered {
      display: block;
      width: 100%;
      margin: initial;
      text-align: left
    }

    .featured-collections-public .three-five {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    .featured-collections-public .two-four {    
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
  .about-content {
    padding: 0 5% 2rem 5%;
  }

  @media (min-width: 768px) {
    /* tablet */
    .card-trio {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .card-trio.three-total dams-collection-card:nth-child(1) {
      grid-column: 1 / span 2;
    }

    .fg-header {
      grid-template-columns: 37% 55%;
      padding: 1rem 0;
    }
    .featured-group .card-trio {
      margin-right: 0;
      margin-left: 0;
    }
    .fg-header h3 {
      text-align: center;
    }
  }

  @media (min-width: 991px) {
    /* desktop */
    .card-trio {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .card-trio.three-total dams-collection-card:nth-child(1) {
      grid-column: auto;
    }
  }

  .featured-more a.btn--primary {
    color: var(--color-aggie-blue);
    padding-top: 0;
    padding-bottom: 0;
  }

  .tree-illustration {
    /* padding: 3rem; */
    margin: auto;
  }

  .tree-illustration img {
    float: right;
    padding-right: 1rem;
  }

  .about-content .header-dots {
    margin: 0;
    align-items: start;
    padding-bottom: 1rem;
  }

  .about-content h1 {
    margin-bottom: .3rem;
  }

  .about-content {
    /* padding-right: 2rem; */
    margin: auto;
  }

  .about-content h1,
  .about-content p {
    color: var(--color-white);
  }

  .about-content .btn--more-about {
    background-color: var(--color-white);
    color: var(--color-aggie-blue-80);
  }

  .about-content .btn--more-about:hover {
    color: var(--color-aggie-blue-80);
  }

  dams-hero {
    position: relative;
    z-index: 1000;
  }

  .edit-overlay {
    background: white;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: .55;
    z-index: 400;
  }

  .right-panel {
    position: absolute;
    right: 4rem;
    z-index: 500;
  }

  .icon-wrapper {
    height: 50px;
    width: 50px;
    background-color: var(--color-aggie-blue-70);
    border-radius: 50%;
    display: inline-block;
    margin-left: .3rem;
    cursor: pointer;
  }

  .icon-wrapper ucdlib-icon {
    fill: white;
    width: 50%;
    height: 50%;
    margin: auto;
    padding-top: 0.6rem;
    z-index: 500;
  }

  .icon-wrapper.edit {
    background-color: var(--color-aggie-blue);
  }

  .icon-wrapper:hover {
    background-color: var(--color-aggie-blue);
  }

  .icon-wrapper.edit:hover {
    background-color: var(--color-aggie-gold);
  }

  .icon-wrapper.edit:hover ucdlib-icon {
    fill: var(--color-aggie-blue);
  }

  admin-featured-collections {
    padding: 4rem 5%;
  }

  .hero-main.site-frame,
  .recent.site-frame {
    width: 90%;
    margin: 0 auto;
  }

  @media (min-width: 1060px) {
    .hero-top {
      margin-top: 40px;
    }
  }

  @media (min-width: 1601px) {
    .hero-top {
      margin-top: 40px;
    }
  }

  @media (min-width: 520px) {
    ucd-theme-header {
      display: none;
    }
  }

  @media (max-width: 519px) {
    .hero-top {
      display: none;
    }
    ucd-theme-header {
      position: relative;
      top: -19px;
    }
    h1 {
      font-size: 2rem;
      font-weight: 600;
    }
    .hero-main .sub-heading {
      font-size: 1.2rem;
      font-weight: 200;
    }
  }

  @media (max-width: 767px) {
    h1 {
      font-size: 2rem;
      font-weight: 600;
    }
    .hero-main .sub-heading {
      font-size: 1.2rem;
      font-weight: 200;
    }
  }

  .hero-top-right a {
    text-decoration: none;
  }

  a.browse-collections {
    height: 3rem;
    min-height: 3rem;
  }

</style>

<dams-hero .srcOptions="${this.heroImgOptions}" selected-src-url="${this.heroUrl}" @src-change="${
    this._onHeroChange
  }">
  <div class="hero-content">

    <ucd-theme-header>
      <ucd-theme-primary-nav>
        <a href="/" class="home-link" mobile-only>Home</a>
        <ul link-text="Browse" href="/browse">
          <li><a href="/browse/collections/15">Collections</a></li>
          <li><a href="/search">Items</a></li>
          <li><a href="/browse/creator/30">Creators</a></li>
          <li><a href="/browse/format/30">Formats</a></li>
          <li><a href="/browse/subject/30">Subjects</a></li>
        </ul>
        <a href="/about">About</a>
      </ucd-theme-primary-nav>
    </ucd-theme-header>

    <div class="hero-top site-frame">
      <div class="hero-top-left"><a href="https://ucdavis.edu"><img src="/images/logos/ucdavis_logo_gold.png"></a></div>
      <div class="hero-top-right">
        <a href="/browse">Browse</a>
        <span class="dot"></span>
        <a href="/search-tips">Search Tips</a>
        <span class="dot"></span>
        <a href="/about">About</a>
      </div>
    </div>

    <div class="hero-main site-frame">
      <h1 class="color-light">Digital Collections</h1>
      <h4 class="sub-heading h4 color-light">Explore digitized items from the <a href="https://library.ucdavis.edu/">UC Davis Library</a> collections.</h4>
      <app-search-box
        id="searchBox"
        @search="${this._onSearch}"
        placeholder="search">
        <iron-icon icon="fin-icons:search" class="search-icon" slot="button-content"></iron-icon>
      </app-search-box>
      <div class="sub-search">
        Featured Image: <a href="${this.heroItemUrl}">${this.heroItemLabel}</a> | <a href="${this.heroCollectionUrl}">${this.heroCollectionLabel}</a>
      </div>
    </div>
  </div>

</dams-hero>

<!-- <app-welcome-modal
  ?hidden="${!this.showWelcomeModal}"
  .title="${this.welcomeModalTitle}"
  .content="${this.welcomeModalContent}"
  @ok=${this._onWelcomeModalClose}>
</app-welcome-modal> -->

<div class="edit-overlay" ?hidden="${!this.editMode || !this.isUiAdmin}"></div>
<section class="browse-buttons site-frame">
  <div class="priority-links">
    <div class="priority-links__item">
      <a class="vertical-link vertical-link--circle category-brand--secondary" href="/browse/collections/15">
        <div class="vertical-link__figure">
          <ucdlib-icon class="vertical-link__image" icon="ucdlib-dams:fa-box-archive"></ucdlib-icon>
        </div>
        <div class="vertical-link__title">Collections</div>
      </a>
    </div>
    <div class="priority-links__item">
      <a class="vertical-link vertical-link--circle category-brand--secondary" href="/search">
        <div class="vertical-link__figure">
          <ucdlib-icon class="vertical-link__image" icon="ucdlib-dams:photo-stack"></ucdlib-icon>
        </div>
        <div class="vertical-link__title">All Items</div>
      </a>
    </div>
    <div class="priority-links__item">
      <a class="vertical-link vertical-link--circle category-brand--secondary" href="/browse/creator/30">
        <div class="vertical-link__figure">
          <ucdlib-icon class="vertical-link__image" icon="ucdlib-dams:fa-wand-magic-sparkles"></ucdlib-icon>
        </div>
        <div class="vertical-link__title">Creators</div>
      </a>
    </div>
    <div class="priority-links__item">
      <a class="vertical-link vertical-link--circle category-brand--secondary" href="/browse/format/30">
        <div class="vertical-link__figure">
          <ucdlib-icon class="vertical-link__image" icon="ucdlib-dams:fa-photo-film"></ucdlib-icon>
        </div>
        <div class="vertical-link__title">Formats</div>
      </a>
    </div>
    <div class="priority-links__item">
      <a class="vertical-link vertical-link--circle category-brand--secondary" href="/browse/subject/30">
        <div class="vertical-link__figure">
          <ucdlib-icon class="vertical-link__image" icon="ucdlib-dams:fa-star"></ucdlib-icon>
        </div>
        <div class="vertical-link__title">Subjects</div>
      </a>
    </div>
  </div>

</section>

<section class="recent site-frame" ?hidden="${
    this.recentCollections.length === 0
  }">
  <h1>Recently Added<br><span class="fw-light">Collections</span></h1>
  ${_utils_shared_html__WEBPACK_IMPORTED_MODULE_1__["default"].headerDots()}
  <div class="card-trio ${
    this.recentCollections.length === 3 ? "three-total" : ""
  }">
  ${this.recentCollections.map(
    (graph) =>
      lit__WEBPACK_IMPORTED_MODULE_0__.html`
        <dams-collection-card
          img-src="${graph.vcData.images?.[0] || ''}"
          card-title="${graph.vcData.title || ''}"
          item-ct="${graph.vcData.count ? graph.vcData.count : 0}"
          href="${graph.vcData.id}"
        ></dams-collection-card>
      `
  )}
  </div>
</section>

<section class="featured site-frame">
  <div class="right-panel">
    <div class="icon-wrapper" ?hidden="${
      this.editMode || !this.isUiAdmin
    }" @click="${this._onEditClicked}">
      <ucdlib-icon icon="ucdlib-dams:fa-pen"></ucdlib-icon>
    </div>
    <div class="icon-wrapper edit" ?hidden="${
      !this.editMode || !this.isUiAdmin
    }" @click="${this._onSaveClicked}">
      <ucdlib-icon icon="ucdlib-dams:fa-floppy-disk"></ucdlib-icon>
    </div>
    <div class="icon-wrapper edit" ?hidden="${
      !this.editMode || !this.isUiAdmin
    }" @click="${this._onCancelEditClicked}">
      <ucdlib-icon icon="ucdlib-dams:fa-xmark"></ucdlib-icon>
    </div>
  </div>
  <h1>Featured <span class="fw-light">Collections</span></h1>
  <div style="text-align:center;">
    <img class="splat-stars" src="/images/watercolors/watercolor-splat-homepage-stars.png">
  </div>

  <admin-featured-collections ?hidden="${
    !this.editMode || !this.isUiAdmin
  }"></admin-featured-collections>
  
  <div class="featured-collections-public" ?hidden="${this.editMode}">
    ${this.displayData.map(
      (data) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
        ${data.type === "single"
          ? lit__WEBPACK_IMPORTED_MODULE_0__.html`
              <dams-highlighted-collection
                collection-id="${data.collectionId}"
                collection-desc="${data.description}"
                ?image-right="${data.placement === "right"}"
              >
              </dams-highlighted-collection>
            `
          : ""}
        ${data.type === "text"
          ? lit__WEBPACK_IMPORTED_MODULE_0__.html`
              <div class="featured-group">
                <div class="fg-header ${data.placement}">
                  <h3 class="heading--primary">${data.heading}</h3>
                  <ucdlib-md id="md">
                    <ucdlib-md-content>
                      ${data.description}
                    </ucdlib-md-content>
                  </ucdlib-md>
                </div>
              </div>
            `
          : ""}
        ${data.type === "cards"
          ? lit__WEBPACK_IMPORTED_MODULE_0__.html`
              <div
                class="card-trio ${data.collectionIds.length === 3 ? "three-total" : ""} ${[3, 5].includes(data.collectionIds.length) ? "three-five" : ""} ${[2, 4].includes(data.collectionIds.length) ? "two-four" : ""}">
                ${data.collectionIds.map(
                  (collection) => lit__WEBPACK_IMPORTED_MODULE_0__.html`
                    <dams-collection-card
                      data-id="${collection.selected}"
                    ></dams-collection-card>
                  `
                )}
              </div>
            `
          : ""}
      `
    )}

    <div class="featured-more">
      <a href="/browse/collections" class="btn btn--primary btn--lg browse-collections">Browse all collections</a>
    </div>
  </section>

  <section class="about-collections">
    <div class="tree-illustration">
      <img src="/images/tree-bike-illustration.png" width="80%" />
    </div>
    <div class="about-content">
      <h1>About<br><span class="fw-light">Digital Collections</span></h1>
      ${_utils_shared_html__WEBPACK_IMPORTED_MODULE_1__["default"].headerDots()}
      <p style="padding-bottom: 1rem;">
        UC Davis Digital Collections provide online access to digitized or born-digital materials 
        from the UC Davis Library, with a particular focus on the rare and unique materials in 
        its Archives and Special Collections. These documents, images, audio and video files 
        offer a rich resource for exploration by scholars and the public alike.
      </p>
      <a href="/about" class="btn--more-about btn--alt btn--round">More about this project</a>
    </div>
  </section>
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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsMkNBQTJDLDJCQUEyQjtBQUN0RSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsYUFBYTtBQUMxQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGFBQWE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5TjJCO0FBQytCOztBQUUzQztBQUNmLFNBQVMscUNBQUk7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LGlGQUFRO0FBQ1osSUFBSSwwRkFBZ0I7QUFDcEIsSUFBSSx5RkFBZ0I7QUFDcEIsSUFBSSxzRkFBWTtBQUNoQixJQUFJLHNGQUFZO0FBQ2hCLElBQUkscUZBQVc7QUFDZixJQUFJLGtGQUFRO0FBQ1osSUFBSSxxRkFBVTs7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6Qyw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7O0FBRUE7QUFD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QUNBLFVBQVU7QUFDVixZQUFZLHFDQUFJO0FBQ2hCO0FBQ0Esd0NBQXdDLGVBQWU7QUFDdkQsaURBQWlELGFBQWE7QUFDOUQ7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsWUFBWSxxQ0FBSTtBQUNoQjtBQUNBLG1DQUFtQyxzREFBc0QsRUFBRSxnRUFBZ0UsRUFBRSw2REFBNkQ7QUFDMU4sa0JBQWtCO0FBQ2xCLGtDQUFrQyxxQ0FBSTtBQUN0QztBQUNBLGlDQUFpQyxvQkFBb0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFFQUFxQjtBQUM3QixxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvNUIyQjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsV0FBVyxxQ0FBSTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUVBQWUsZ0JBQWdCOzs7Ozs7Ozs7Ozs7OztBQzVCL0IsZUFBZSxtQkFBTyxDQUFDLHlDQUFXOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUVBQWUsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9jb21wb25lbnRzL2FkbWluL2FkbWluLWNvbnRlbnQtcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL2NvbXBvbmVudHMvYWRtaW4vYWRtaW4tY29udGVudC1wYW5lbC50cGwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL2NvbXBvbmVudHMvYWRtaW4vYWRtaW4tZmVhdHVyZWQtY29sbGVjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL2NvbXBvbmVudHMvYWRtaW4vYWRtaW4tZmVhdHVyZWQtY29sbGVjdGlvbnMudHBsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9jb21wb25lbnRzL2dyYXBoaWNzL2RhbXMtaGVyby5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvY29tcG9uZW50cy9ncmFwaGljcy9kYW1zLWhlcm8udHBsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9jb21wb25lbnRzL3NlY3Rpb25zL2RhbXMtaGlnaGxpZ2h0ZWQtY29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvY29tcG9uZW50cy9zZWN0aW9ucy9kYW1zLWhpZ2hsaWdodGVkLWNvbGxlY3Rpb24udHBsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9wYWdlcy9ob21lL2FwcC1ob21lLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9wYWdlcy9ob21lL2FwcC1ob21lLnRwbC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvdXRpbHMvc2hhcmVkLWh0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2xpYi91dGlscy91c2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpdEVsZW1lbnQgfSBmcm9tIFwibGl0XCI7XG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2FkbWluLWNvbnRlbnQtcGFuZWwudHBsLmpzXCI7XG5cbmltcG9ydCBcIkB1Y2QtbGliL3RoZW1lLWVsZW1lbnRzL3VjZGxpYi91Y2RsaWItaWNvbi91Y2RsaWItaWNvblwiO1xuaW1wb3J0IFwiQHVjZC1saWIvdGhlbWUtZWxlbWVudHMvYnJhbmQvdWNkLXRoZW1lLXNsaW0tc2VsZWN0L3VjZC10aGVtZS1zbGltLXNlbGVjdC5qc1wiO1xuXG4vKipcbiAqIEBjbGFzcyBBZG1pbkNvbnRlbnRQYW5lbFxuICogQGRlc2NyaXB0aW9uIGFkbWluIFVJIGZvciBjdXN0b21pemluZyBmZWF0dXJlZCBjb2xsZWN0aW9ucyBvbiB0aGUgaG9tZXBhZ2VcbiAqL1xuZXhwb3J0IGNsYXNzIEFkbWluQ29udGVudFBhbmVsIGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIHBvc2l0aW9uOiB7IHR5cGU6IE51bWJlciB9LFxuICAgICAgcGxhY2VtZW50OiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgY29sbGVjdGlvbklkOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgaGVhZGluZzogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICAgIGRlc2NyaXB0aW9uOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgY29sbGVjdGlvbklkczogeyB0eXBlOiBBcnJheSB9LFxuICAgICAgY29udHJvbEljb246IHsgdHlwZTogT2JqZWN0IH0sXG4gICAgICBzb3J0ZWRDb2xsZWN0aW9uc0xpc3Q6IHsgdHlwZTogQXJyYXkgfSxcbiAgICAgIGlzRGlydHk6IHsgdHlwZTogQm9vbGVhbiB9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuXG4gICAgdGhpcy5pc0RpcnR5ID0gZmFsc2U7XG4gICAgdGhpcy50eXBlID0gXCJcIjtcbiAgICB0aGlzLnBvc2l0aW9uID0gMDtcbiAgICB0aGlzLnBsYWNlbWVudCA9IFwiXCI7XG4gICAgdGhpcy5jb2xsZWN0aW9uSWQgPSBcIlwiO1xuICAgIHRoaXMuaGVhZGluZyA9IFwiXCI7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiXCI7XG5cbiAgICB0aGlzLmNvbnRyb2xJY29ucyA9IHtcbiAgICAgIHNpbmdsZTogXCJkYW1zLWFkbWluLWNvbGxlY3Rpb24tc2luZ2xlXCIsXG4gICAgICB0ZXh0OiBcImRhbXMtYWRtaW4tdGV4dFwiLFxuICAgICAgY2FyZHM6IFwiZGFtcy1hZG1pbi1jb2xsZWN0aW9uLWNhcmRzXCIsXG4gICAgfTtcbiAgICB0aGlzLmNvbGxlY3Rpb25JZHMgPSBbXTtcbiAgICB0aGlzLnNvcnRlZENvbGxlY3Rpb25zTGlzdCA9IE9iamVjdC5lbnRyaWVzKFxuICAgICAgQVBQX0NPTkZJRy5jb2xsZWN0aW9uTGFiZWxzXG4gICAgKS5zb3J0KChhLCBiKSA9PiAoYVsxXSA8IGJbMV0gPyAtMSA6IDEpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGZpcnN0VXBkYXRlZFxuICAgKiBAZGVzY3JpcHRpb24gTGl0IGxpZmVjeWNsZSBtZXRob2RcbiAgICovXG4gIGZpcnN0VXBkYXRlZCgpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcInBhbmVsLWxvYWRlZFwiKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVkXG4gICAqIEBkZXNjcmlwdGlvbiBMaXQgbGlmZWN5Y2xlIG1ldGhvZFxuICAgKi9cbiAgdXBkYXRlZCgpIHtcbiAgICBpZiAodGhpcy5pc0RpcnR5KSB7XG4gICAgICB0aGlzLmlzRGlydHkgPSBmYWxzZTtcblxuICAgICAgLy8gaGFjayBhbm5veWluZyBidXQgdGhlIHNsaW1zZWxlY3QgZG9lc24ndCB1cGRhdGUgY29uc2lzdGVudGx5IGJhc2VkIG9uIHByb3BlcnR5IHZhbHVlc1xuICAgICAgLy8gIHNldCBzZWxlY3RlZCBtYW51YWxseSBqdXN0IGluIGNhc2VcbiAgICAgIGlmICh0aGlzLnR5cGUgPT09IFwic2luZ2xlXCIpIHtcbiAgICAgICAgbGV0IGNvbGxlY3Rpb25Ecm9wZG93biA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIFwidWNkLXRoZW1lLXNsaW0tc2VsZWN0LnNpbmdsZS1jb2xsZWN0aW9uXCJcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGNvbGxlY3Rpb25Ecm9wZG93bikge1xuICAgICAgICAgIGNvbGxlY3Rpb25Ecm9wZG93bi5zbGltU2VsZWN0LnNldFNlbGVjdGVkKHRoaXMuY29sbGVjdGlvbklkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy50eXBlID09PSBcImNhcmRzXCIpIHtcbiAgICAgICAgbGV0IGNvbGxlY3Rpb25zRHJvcGRvd25zID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJ1Y2QtdGhlbWUtc2xpbS1zZWxlY3QubGlzdFwiXG4gICAgICAgICk7XG4gICAgICAgIGlmIChjb2xsZWN0aW9uc0Ryb3Bkb3ducykge1xuICAgICAgICAgIGNvbGxlY3Rpb25zRHJvcGRvd25zLmZvckVhY2goKGRyb3Bkb3duLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29sbGVjdGlvbklkc1tpbmRleF0pIHtcbiAgICAgICAgICAgICAgZHJvcGRvd24uc2xpbVNlbGVjdC5zZXRTZWxlY3RlZChcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb25JZHNbaW5kZXhdLnNlbGVjdGVkXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJwYW5lbC1sb2FkZWRcIikpO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gXCJzaW5nbGVcIiB8fCB0aGlzLnR5cGUgPT09IFwidGV4dFwiKSB7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIjcGxhY2VtZW50LVwiICsgdGhpcy5wbGFjZW1lbnRcbiAgICAgICkuY2hlY2tlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX3JlbW92ZUNvbGxlY3Rpb25cbiAgICogQGRlc2NyaXB0aW9uIFJlbW92ZSBDb2xsZWN0aW9uIGJ1dHRvbiBwcmVzcyBldmVudCwgcmVtb3ZlIGNvbGxlY3Rpb24gZHJvcGRvd24gZnJvbSB1aVxuICAgKi9cbiAgX3JlbW92ZUNvbGxlY3Rpb24oZSkge1xuICAgIGxldCBwb3NpdGlvbiA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgIHRoaXMuY29sbGVjdGlvbklkcyA9IHRoaXMuY29sbGVjdGlvbklkcy5maWx0ZXIoYyA9PiBjLnBvc2l0aW9uICE9IHBvc2l0aW9uKTsgLy8gcmVtb3ZlIGNvbGxlY3Rpb24gZnJvbSBjb2xsZWN0aW9uSWRzXG4gICAgdGhpcy5jb2xsZWN0aW9uSWRzID0gdGhpcy5jb2xsZWN0aW9uSWRzLm1hcCgoYyxpbmRleCkgPT4geyByZXR1cm4geyBwb3NpdGlvbjogaW5kZXgsIHNlbGVjdGVkOiBjLnNlbGVjdGVkIH19KTsgLy8gcmVpbmRleCBwb3NpdGlvbnNcbiAgICB0aGlzLmlzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMucmVxdWVzdFVwZGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX2FkZENvbGxlY3Rpb25cbiAgICogQGRlc2NyaXB0aW9uIEFkZCBDb2xsZWN0aW9uIGJ1dHRvbiBwcmVzcyBldmVudCwgYWRkIGNvbGxlY3Rpb24gZHJvcGRvd24gdG8gdWlcbiAgICovXG4gIF9hZGRDb2xsZWN0aW9uKCkge1xuICAgIHRoaXMuY29sbGVjdGlvbklkcy5wdXNoKHtcbiAgICAgIHBvc2l0aW9uOiB0aGlzLmNvbGxlY3Rpb25JZHMubGVuZ3RoLFxuICAgICAgc2VsZWN0ZWQ6IFwiXCIsXG4gICAgfSk7XG4gICAgdGhpcy5pc0RpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLnJlcXVlc3RVcGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbkNvbGxlY3Rpb25MaXN0Q2hhbmdlXG4gICAqIEBkZXNjcmlwdGlvbiBjb2xsZWN0aW9uIGRyb3Bkb3duIHZhbHVlIGNoYW5nZSwgc2F2ZSB0byBjb2xsZWN0aW9uSWRzIGRhdGEgYXJyYXlcbiAgICovXG4gIF9vbkNvbGxlY3Rpb25MaXN0Q2hhbmdlKGUpIHtcbiAgICBsZXQgcG9zaXRpb24gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5wb3NpdGlvbjtcbiAgICBsZXQgc2VsZWN0ZWQgPSBlLmRldGFpbC52YWx1ZTtcbiAgICBsZXQgbWF0Y2ggPSB0aGlzLmNvbGxlY3Rpb25JZHMuZmlsdGVyKFxuICAgICAgKGMpID0+IGMucG9zaXRpb24gPT09IHBhcnNlSW50KHBvc2l0aW9uKVxuICAgIClbMF07XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICBtYXRjaC5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgICAgLy8gICB0aGlzLmlzRGlydHkgPSB0cnVlO1xuICAgICAgdGhpcy5yZXF1ZXN0VXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uVHJhc2hDbGlja2VkXG4gICAqIEBkZXNjcmlwdGlvbiB0cmFzaCBjbGlja2VkLCByZW1vdmUgcGFuZWwgZnJvbSBhZG1pbiB2aWV3XG4gICAqL1xuICBfb25UcmFzaENsaWNrZWQoZSkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcbiAgICAgIG5ldyBDdXN0b21FdmVudChcInRyYXNoLWNsaWNrZWRcIiwge1xuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBwb3NpdGlvbjogdGhpcy5wb3NpdGlvbixcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgKTtcbiAgICAvLyB0aGlzLmlzRGlydHkgPSB0cnVlO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwicGFuZWwtbG9hZGVkXCIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblVwQXJyb3dDbGlja2VkXG4gICAqIEBkZXNjcmlwdGlvbiBtb3ZlIHBhbmVsIHVwIGluIGFkbWluIHZpZXdcbiAgICovXG4gIF9vblVwQXJyb3dDbGlja2VkKGUpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJ1cC1hcnJvdy1jbGlja2VkXCIsIHtcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgcG9zaXRpb246IHRoaXMucG9zaXRpb24sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5pc0RpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLnNvcnRlZENvbGxlY3Rpb25zTGlzdCA9IFtcbiAgICAgIC4uLk9iamVjdC5lbnRyaWVzKEFQUF9DT05GSUcuY29sbGVjdGlvbkxhYmVscykuc29ydCgoYSwgYikgPT5cbiAgICAgICAgYVsxXSA8IGJbMV0gPyAtMSA6IDFcbiAgICAgICksXG4gICAgXTtcbiAgICAvLyB0aGlzLnJlcXVlc3RVcGRhdGUoKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcInBhbmVsLWxvYWRlZFwiKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25Eb3duQXJyb3dDbGlja2VkXG4gICAqIEBkZXNjcmlwdGlvbiBtb3ZlIHBhbmVsIGRvd24gaW4gYWRtaW4gdmlld1xuICAgKi9cbiAgX29uRG93bkFycm93Q2xpY2tlZChlKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgbmV3IEN1c3RvbUV2ZW50KFwiZG93bi1hcnJvdy1jbGlja2VkXCIsIHtcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgcG9zaXRpb246IHRoaXMucG9zaXRpb24sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5pc0RpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLnNvcnRlZENvbGxlY3Rpb25zTGlzdCA9IFtcbiAgICAgIC4uLk9iamVjdC5lbnRyaWVzKEFQUF9DT05GSUcuY29sbGVjdGlvbkxhYmVscykuc29ydCgoYSwgYikgPT5cbiAgICAgICAgYVsxXSA8IGJbMV0gPyAtMSA6IDFcbiAgICAgICksXG4gICAgXTtcbiAgICAvLyB0aGlzLnJlcXVlc3RVcGRhdGUoKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcInBhbmVsLWxvYWRlZFwiKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfc3NTZWxlY3RGb2N1c0luXG4gICAqIEBkZXNjcmlwdGlvbiBzbGltIHNlbGVjdCBmb2N1cyBjaGFuZ2UsIGNvbG9yIHNob3VsZCBiZSBnb2xkIGlmIGFjdGl2ZSwgYmx1ZSBpZiBub3RcbiAgICogQHBhcmFtIHtPYmplY3R9IGVcbiAgICovXG4gIF9zc1NlbGVjdEZvY3VzSW4oZSkge1xuICAgIGxldCBzc01haW4gPSBlLmN1cnJlbnRUYXJnZXQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcuc3MtbWFpbicpO1xuICAgIGxldCBzc1NpbmdsZVNlbGVjdGVkID0gZS5jdXJyZW50VGFyZ2V0LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLnNzLXNpbmdsZS1zZWxlY3RlZCcpO1xuXG4gICAgaWYoIHNzU2luZ2xlU2VsZWN0ZWQ/LmNsYXNzTGlzdC52YWx1ZSA9PT0gJ3NzLXNpbmdsZS1zZWxlY3RlZCBzcy1vcGVuLWJlbG93JyApIHtcbiAgICAgIHNzU2luZ2xlU2VsZWN0ZWQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNGRkY0RDInOyAvLyBnb2xkLTMwXG4gICAgICBzc01haW4uc3R5bGUuYm9yZGVyQ29sb3IgPSAnI0ZGQkYwMCc7IC8vIGdvbGRcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfc3NTZWxlY3RCbHVyXG4gICAqIEBkZXNjcmlwdGlvbiBzbGltIHNlbGVjdCBmb2N1cyBjaGFuZ2UsIGNvbG9yIHNob3VsZCBiZSBnb2xkIGlmIGFjdGl2ZSwgYmx1ZSBpZiBub3RcbiAgICogQHBhcmFtIHtPYmplY3R9IGVcbiAgICovXG4gIF9zc1NlbGVjdEJsdXIoZSkge1xuICAgIGxldCBzc01haW4gPSBlLmN1cnJlbnRUYXJnZXQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcuc3MtbWFpbicpO1xuICAgIGxldCBzc1NpbmdsZVNlbGVjdGVkID0gZS5jdXJyZW50VGFyZ2V0LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLnNzLXNpbmdsZS1zZWxlY3RlZCcpO1xuXG4gICAgc3NTaW5nbGVTZWxlY3RlZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI0IwRDBFRCc7IC8vIGJsdWUtNTBcbiAgICBzc01haW4uc3R5bGUuYm9yZGVyQ29sb3IgPSAnI0IwRDBFRCc7IC8vIGJsdWUtNTBcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJhZG1pbi1jb250ZW50LXBhbmVsXCIsIEFkbWluQ29udGVudFBhbmVsKTtcbiIsImltcG9ydCB7IGh0bWwgfSBmcm9tIFwibGl0XCI7XG5pbXBvcnQgeyBzaGFyZWRTdHlsZXMgfSBmcm9tIFwiLi4vLi4vc3R5bGVzL3NoYXJlZC1zdHlsZXNcIjtcblxuaW1wb3J0IGxpc3RzQ3NzIGZyb20gXCJAdWNkLWxpYi90aGVtZS1zYXNzLzJfYmFzZV9jbGFzcy9fbGlzdHMuY3NzXCI7XG5pbXBvcnQgaW5kZXhDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvMl9iYXNlX2NsYXNzL19pbmRleC5jc3NcIjtcbmltcG9ydCBmb3Jtc0h0bWxDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvMV9iYXNlX2h0bWwvX2Zvcm1zLmNzc1wiO1xuaW1wb3J0IGZvcm1zQ3NzIGZyb20gXCJAdWNkLWxpYi90aGVtZS1zYXNzLzJfYmFzZV9jbGFzcy9fZm9ybXMuY3NzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgcmV0dXJuIGh0bWxgXG4gICAgPHN0eWxlPlxuICAgICAgJHtzaGFyZWRTdHlsZXN9XG4gICAgICAgICR7bGlzdHNDc3N9XG4gICAgICAgICR7aW5kZXhDc3N9XG4gICAgICAgICR7Zm9ybXNIdG1sQ3NzfVxuICAgICAgICAke2Zvcm1zQ3NzfVxuICAgICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHotaW5kZXg6IDUwMDtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDVyZW07XG4gICAgICB9XG4gICAgICAvKlxuICBpbnB1dCxcbiAgdGV4dGFyZWEge1xuICAgIGJvcmRlcjogbm9uZTtcbiAgfSAqL1xuXG4gICAgICAuaWNvbi13cmFwcGVyIHtcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS03MCk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBtYXJnaW4tbGVmdDogMC4zcmVtO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB9XG5cbiAgICAgIC5pY29uLXdyYXBwZXIgdWNkbGliLWljb24ge1xuICAgICAgICBmaWxsOiB3aGl0ZTtcbiAgICAgICAgd2lkdGg6IDUwJTtcbiAgICAgICAgaGVpZ2h0OiA1MCU7XG4gICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgcGFkZGluZy10b3A6IDAuNnJlbTtcbiAgICAgIH1cblxuICAgICAgLmljb24td3JhcHBlci5lZGl0IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS04MCk7XG4gICAgICB9XG5cbiAgICAgIC5pY29uLXdyYXBwZXI6aG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlKTtcbiAgICAgIH1cblxuICAgICAgLmljb24td3JhcHBlci5lZGl0OmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtZ29sZCk7XG4gICAgICB9XG5cbiAgICAgIC5pY29uLXdyYXBwZXIuZWRpdDpob3ZlciB1Y2RsaWItaWNvbiB7XG4gICAgICAgIGZpbGw6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUpO1xuICAgICAgfVxuXG4gICAgICAuZWRpdG9yLXJvdy1jb250cm9sIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgei1pbmRleDogNTAwO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB9XG5cbiAgICAgIC5kb3RzIHtcbiAgICAgICAgaGVpZ2h0OiAyNXB4O1xuICAgICAgICBib3JkZXItYm90dG9tOiA1cHggZG90dGVkIHZhcigtLWNvbG9yLWRhbXMtc2Vjb25kYXJ5KTtcbiAgICAgICAgbWFyZ2luOiAtMjVweCAwLjVyZW0gMDtcbiAgICAgIH1cblxuICAgICAgLmZsZXgtZXhwYW5kIHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgIH1cblxuICAgICAgLmZvcm0tY29udGVudCB7XG4gICAgICAgIHdpZHRoOiA1MCU7XG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogM3JlbTtcbiAgICAgIH1cblxuICAgICAgLmZvcm0tbGFiZWwge1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIH1cblxuICAgICAgLmNvbnRlbnQtcm93LFxuICAgICAgLmNvbGxlY3Rpb24tbGlzdCB7XG4gICAgICAgIHBhZGRpbmctbGVmdDogMXJlbTtcbiAgICAgIH1cblxuICAgICAgLmxpc3QtLXJlc2V0ID4gbGkge1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDAuNXJlbTtcbiAgICAgIH1cblxuICAgICAgZmllbGRzZXQge1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICB9XG5cbiAgICAgIC5yYWRpbyBsYWJlbDpiZWZvcmUge1xuICAgICAgICB0b3A6IDVweDtcbiAgICAgICAgbGVmdDogLTFweDtcbiAgICAgIH1cblxuICAgICAgLmxpc3QtLXJlc2V0LFxuICAgICAgdWNkLXRoZW1lLXNsaW0tc2VsZWN0LFxuICAgICAgLmRlc2NyaXB0aW9uLFxuICAgICAgLmhlYWRpbmctdGV4dCxcbiAgICAgIC5zaW5nbGUtY29sbGVjdGlvbiB7XG4gICAgICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcbiAgICAgIH1cblxuICAgICAgLmFkZC1jb2xsZWN0aW9uLWNvbnRhaW5lciB7XG4gICAgICAgIHBhZGRpbmctdG9wOiAxcmVtO1xuICAgICAgfVxuXG4gICAgICAuYWRkLWNvbGxlY3Rpb24tY29udGFpbmVyIHVjZGxpYi1pY29uIHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgfVxuXG4gICAgICAuYWRkLWNvbGxlY3Rpb24tbGFiZWwge1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApO1xuICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMS41cmVtO1xuICAgICAgICAvKiBwYWRkaW5nOiAwIDEuNXJlbTsgKi9cbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAvKiBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyAqL1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgbWluLXdpZHRoOiA5cmVtO1xuICAgICAgfVxuXG4gICAgICAuYWRkLWNvbGxlY3Rpb24tbGFiZWwgdWNkbGliLWljb24ge1xuICAgICAgICBoZWlnaHQ6IDUwJTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0b3A6IDUlO1xuICAgICAgICBsZWZ0OiAtNSU7XG4gICAgICAgIGZpbGw6IHZhcigtLWNvbG9yLWFnZ2llLWdvbGQpO1xuICAgICAgICBwYWRkaW5nLXRvcDogMC41cmVtO1xuICAgICAgfVxuXG4gICAgICAuYWRkLWNvbGxlY3Rpb24tbGFiZWw6aG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlKTtcbiAgICAgIH1cblxuICAgICAgLmFkZC1jb2xsZWN0aW9uLWxhYmVsIHNwYW4ge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRvcDogMjAlO1xuICAgICAgICByaWdodDogMjAlO1xuICAgICAgfVxuXG4gICAgICAuY29sbGVjdGlvbi1saXN0IHVjZC10aGVtZS1zbGltLXNlbGVjdCB7XG4gICAgICAgIHBhZGRpbmctdG9wOiAwLjVyZW07XG4gICAgICB9XG5cbiAgICAgIC5yZW1vdmUtY29sbGVjdGlvbiB1Y2RsaWItaWNvbiB7XG4gICAgICAgIGZpbGw6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApXG4gICAgICB9XG5cbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA5OTFweCkge1xuICAgICAgICAvKiB0YWJsZXQgYW5kIG1vYmlsZSwganVzdCBzdHlsZSBmdWxsIHdpZHRoICovXG4gICAgICAgIC5mb3JtLWNvbnRlbnQge1xuICAgICAgICAgIHdpZHRoOiA5MCU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICA8L3N0eWxlPlxuXG4gICAgPGRpdiBjbGFzcz1cImVkaXRvci1yb3ctY29udHJvbFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImljb24td3JhcHBlciBlZGl0XCIgQGNsaWNrPVwiJHt0aGlzLl9vblVwQXJyb3dDbGlja2VkfVwiPlxuICAgICAgICA8dWNkbGliLWljb24gaWNvbj1cInVjZGxpYi1kYW1zOmZhLWFycm93LXVwXCI+PC91Y2RsaWItaWNvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImljb24td3JhcHBlciBlZGl0XCJcbiAgICAgICAgc3R5bGU9XCJtYXJnaW4tbGVmdDogLjNyZW07XCJcbiAgICAgICAgQGNsaWNrPVwiJHt0aGlzLl9vbkRvd25BcnJvd0NsaWNrZWR9XCJcbiAgICAgID5cbiAgICAgICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS1hcnJvdy1kb3duXCI+PC91Y2RsaWItaWNvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImRvdHMgZmxleC1leHBhbmRcIj48L2Rpdj5cbiAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTQwKTsgaGVpZ2h0OiA3NXB4XCI+XG4gICAgICAgIDx1Y2RsaWItaWNvblxuICAgICAgICAgIGljb249XCJ1Y2RsaWItZGFtczoke3RoaXMuY29udHJvbEljb25zW3RoaXMudHlwZV19XCJcbiAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxNTBweDsgaGVpZ2h0OiAxMDAlO1wiXG4gICAgICAgID48L3VjZGxpYi1pY29uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZG90cyBmbGV4LWV4cGFuZFwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImljb24td3JhcHBlciBlZGl0XCIgQGNsaWNrPVwiJHt0aGlzLl9vblRyYXNoQ2xpY2tlZH1cIj5cbiAgICAgICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS10cmFzaFwiPjwvdWNkbGliLWljb24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWNvbnRlbnRcIj5cbiAgICAgIDxmaWVsZHNldCBjbGFzcz1cInJhZGlvXCI+XG4gICAgICAgIDxkaXYgP2hpZGRlbj1cIiR7dGhpcy50eXBlICE9PSBcInNpbmdsZVwifVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9ybS1sYWJlbFwiPkZlYXR1cmUgSW1hZ2U8L3NwYW4+XG4gICAgICAgICAgPHVsIGNsYXNzPVwibGlzdC0tcmVzZXRcIj5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgaWQ9XCJwbGFjZW1lbnQtbGVmdFwiXG4gICAgICAgICAgICAgICAgbmFtZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgIHZhbHVlPVwibGVmdFwiXG4gICAgICAgICAgICAgICAgP2NoZWNrZWQ9XCIke3RoaXMucGxhY2VtZW50ID09PSBcImxlZnRcIn1cIlxuICAgICAgICAgICAgICAgIEBjaGFuZ2U9XCIkeyhlKSA9PiAodGhpcy5wbGFjZW1lbnQgPSBlLmN1cnJlbnRUYXJnZXQudmFsdWUpfVwiXG4gICAgICAgICAgICAgIC8+PGxhYmVsIGZvcj1cInBsYWNlbWVudC1sZWZ0XCI+TGVmdDwvbGFiZWw+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBpZD1cInBsYWNlbWVudC1yaWdodFwiXG4gICAgICAgICAgICAgICAgbmFtZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgIHZhbHVlPVwicmlnaHRcIlxuICAgICAgICAgICAgICAgID9jaGVja2VkPVwiJHt0aGlzLnBsYWNlbWVudCA9PT0gXCJyaWdodFwifVwiXG4gICAgICAgICAgICAgICAgQGNoYW5nZT1cIiR7KGUpID0+ICh0aGlzLnBsYWNlbWVudCA9IGUuY3VycmVudFRhcmdldC52YWx1ZSl9XCJcbiAgICAgICAgICAgICAgLz48bGFiZWwgZm9yPVwicGxhY2VtZW50LXJpZ2h0XCI+UmlnaHQ8L2xhYmVsPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2ID9oaWRkZW49XCIke3RoaXMudHlwZSAhPT0gXCJ0ZXh0XCJ9XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb3JtLWxhYmVsXCI+VGV4dCBQbGFjZW1lbnQ8L3NwYW4+XG4gICAgICAgICAgPHVsIGNsYXNzPVwibGlzdC0tcmVzZXRcIj5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgaWQ9XCJwbGFjZW1lbnQtY2VudGVyZWRcIlxuICAgICAgICAgICAgICAgIG5hbWU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT1cImNlbnRlcmVkXCJcbiAgICAgICAgICAgICAgICA/Y2hlY2tlZD1cIiR7dGhpcy5wbGFjZW1lbnQgPT09IFwiY2VudGVyZWRcIn1cIlxuICAgICAgICAgICAgICAgIEBjaGFuZ2U9XCIkeyhlKSA9PiAodGhpcy5wbGFjZW1lbnQgPSBlLmN1cnJlbnRUYXJnZXQudmFsdWUpfVwiXG4gICAgICAgICAgICAgIC8+PGxhYmVsIGZvcj1cInBsYWNlbWVudC1jZW50ZXJlZFwiPkNlbnRlcmVkPC9sYWJlbD5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGlkPVwicGxhY2VtZW50LWxlZnQtYWxpZ25lZFwiXG4gICAgICAgICAgICAgICAgbmFtZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgIHZhbHVlPVwibGVmdC1hbGlnbmVkXCJcbiAgICAgICAgICAgICAgICA/Y2hlY2tlZD1cIiR7dGhpcy5wbGFjZW1lbnQgPT09IFwibGVmdC1hbGlnbmVkXCJ9XCJcbiAgICAgICAgICAgICAgICBAY2hhbmdlPVwiJHsoZSkgPT4gKHRoaXMucGxhY2VtZW50ID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlKX1cIlxuICAgICAgICAgICAgICAvPjxsYWJlbCBmb3I9XCJwbGFjZW1lbnQtbGVmdC1hbGlnbmVkXCI+TGVmdC1hbGlnbmVkPC9sYWJlbD5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGlkPVwicGxhY2VtZW50LXNwbGl0XCJcbiAgICAgICAgICAgICAgICBuYW1lPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJyYWRpb1wiXG4gICAgICAgICAgICAgICAgdmFsdWU9XCJzcGxpdFwiXG4gICAgICAgICAgICAgICAgP2NoZWNrZWQ9XCIke3RoaXMucGxhY2VtZW50ID09PSBcInNwbGl0XCJ9XCJcbiAgICAgICAgICAgICAgICBAY2hhbmdlPVwiJHsoZSkgPT4gKHRoaXMucGxhY2VtZW50ID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlKX1cIlxuICAgICAgICAgICAgICAvPjxsYWJlbCBmb3I9XCJwbGFjZW1lbnQtc3BsaXRcIj5TcGxpdCAoMzMvNjcpPC9sYWJlbD5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2ZpZWxkc2V0PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGVudC1yb3dcIj5cbiAgICAgICAgPGRpdiA/aGlkZGVuPVwiJHt0aGlzLnR5cGUgIT09IFwic2luZ2xlXCJ9XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb3JtLWxhYmVsXCI+Q29sbGVjdGlvbjwvc3Bhbj5cbiAgICAgICAgICA8dWNkLXRoZW1lLXNsaW0tc2VsZWN0XG4gICAgICAgICAgICBjbGFzcz1cInNpbmdsZS1jb2xsZWN0aW9uXCJcbiAgICAgICAgICAgIEBjaGFuZ2U9XCIkeyhlKSA9PiAodGhpcy5jb2xsZWN0aW9uSWQgPSBlLmRldGFpbC52YWx1ZSl9XCJcbiAgICAgICAgICAgIEBmb2N1c2luPVwiJHt0aGlzLl9zc1NlbGVjdEZvY3VzSW59XCJcbiAgICAgICAgICAgIEBibHVyPVwiJHt0aGlzLl9zc1NlbGVjdEJsdXJ9XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c2VsZWN0PlxuICAgICAgICAgICAgICA8b3B0aW9uPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAke3RoaXMuc29ydGVkQ29sbGVjdGlvbnNMaXN0Lm1hcChcbiAgICAgICAgICAgICAgICAoc2MpID0+IGh0bWxgXG4gICAgICAgICAgICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgICAgICAgICAgIC52YWx1ZT0ke3NjWzBdfVxuICAgICAgICAgICAgICAgICAgICA/c2VsZWN0ZWQ9JHt0aGlzLmNvbGxlY3Rpb25JZCA9PT0gc2NbMF19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICR7c2NbMV19XG4gICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L3VjZC10aGVtZS1zbGltLXNlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgP2hpZGRlbj1cIiR7dGhpcy50eXBlICE9PSBcInRleHRcIn1cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImZvcm0tbGFiZWxcIj5IZWFkaW5nPC9zcGFuPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJoZWFkaW5nLXRleHRcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgLnZhbHVlPSR7dGhpcy5oZWFkaW5nfVxuICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogLXdlYmtpdC1maWxsLWF2YWlsYWJsZTsgZm9udC1zaXplOiAwLjlyZW07XCI7XG4gICAgICAgICAgICBAY2hhbmdlPVwiJHsoZSkgPT4gKHRoaXMuaGVhZGluZyA9IGUuY3VycmVudFRhcmdldC52YWx1ZSl9XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sbGVjdGlvbi1saXN0XCIgP2hpZGRlbj1cIiR7dGhpcy50eXBlICE9PSBcImNhcmRzXCJ9XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZm9ybS1sYWJlbFwiPkNvbGxlY3Rpb25zPC9zcGFuPlxuICAgICAgICAke3RoaXMuY29sbGVjdGlvbklkcy5tYXAoXG4gICAgICAgICAgKGMsIGluZGV4KSA9PiBodG1sYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbGxlY3Rpb24tbGlzdC1yb3dcIiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IHBhZGRpbmctdG9wOiAuNXJlbTsgbWFyZ2luLXRvcDogLjVyZW1cIj5cbiAgICAgICAgICAgICAgPHVjZC10aGVtZS1zbGltLXNlbGVjdFxuICAgICAgICAgICAgICAgIHN0eWxlPVwiZmxleDogMTsgcGFkZGluZy10b3A6IDA7IG1hcmdpbi10b3A6IDBcIlxuICAgICAgICAgICAgICAgIEBjaGFuZ2U9XCIke3RoaXMuX29uQ29sbGVjdGlvbkxpc3RDaGFuZ2V9XCJcbiAgICAgICAgICAgICAgICBAZm9jdXNpbj1cIiR7dGhpcy5fc3NTZWxlY3RGb2N1c0lufVwiXG4gICAgICAgICAgICAgICAgQGJsdXI9XCIke3RoaXMuX3NzU2VsZWN0Qmx1cn1cIlxuICAgICAgICAgICAgICAgIGRhdGEtcG9zaXRpb249XCIke2MucG9zaXRpb259XCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImxpc3RcIlxuICAgICAgICAgICAgICAgIC5vcHRpb25zPVwiJHt7XG4gICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBvcGVuUG9zaXRpb246IFwidXBcIixcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfX1cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImNvbGxlY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgJHt0aGlzLnNvcnRlZENvbGxlY3Rpb25zTGlzdC5tYXAoXG4gICAgICAgICAgICAgICAgICAgIChzYykgPT4gaHRtbGBcbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAudmFsdWU9JHtzY1swXX1cbiAgICAgICAgICAgICAgICAgICAgICAgID9zZWxlY3RlZD1cIiR7dGhpcy5jb2xsZWN0aW9uSWRzW2luZGV4XS5zZWxlY3RlZCA9PT1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNjWzBdfVwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgJHtzY1sxXX1cbiAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgPC91Y2QtdGhlbWUtc2xpbS1zZWxlY3Q+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZW1vdmUtY29sbGVjdGlvblwiIGRhdGEtaW5kZXg9XCIke2luZGV4fVwiIEBjbGljaz1cIiR7dGhpcy5fcmVtb3ZlQ29sbGVjdGlvbn1cIiBzdHlsZT1cImN1cnNvcjogcG9pbnRlcjsgZmxleDogLjE7IG1hcmdpbi1sZWZ0OiAxcmVtXCI+IFxuICAgICAgICAgICAgICAgIDx1Y2RsaWItaWNvbiBpY29uPVwidWNkbGliLWRhbXM6ZmEtdHJhc2hcIj48L3VjZGxpYi1pY29uPiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgYFxuICAgICAgICApfVxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZGQtY29sbGVjdGlvbi1jb250YWluZXJcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImFkZC1jb2xsZWN0aW9uLWxhYmVsXCIgQGNsaWNrPVwiJHt0aGlzLl9hZGRDb2xsZWN0aW9ufVwiPlxuICAgICAgICAgICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS1wbHVzXCI+PC91Y2RsaWItaWNvbj5cbiAgICAgICAgICAgIDxzcGFuPkFkZCBDb2xsZWN0aW9uPC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImNvbnRlbnQtcm93XCJcbiAgICAgICAgc3R5bGU9XCJwYWRkaW5nLXRvcDogMnJlbTtcIlxuICAgICAgICA/aGlkZGVuPVwiJHt0aGlzLnR5cGUgPT09IFwiY2FyZHNcIn1cIlxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZvcm0tbGFiZWxcIiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrO1wiPkRlc2NyaXB0aW9uPC9zcGFuPlxuICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICBjbGFzcz1cImRlc2NyaXB0aW9uXCJcbiAgICAgICAgICBzdHlsZT1cImhlaWdodDogMTc1cHg7IGZvbnQtc2l6ZTogLjlyZW07IHdpZHRoOiAtd2Via2l0LWZpbGwtYXZhaWxhYmxlO1wiXG4gICAgICAgICAgLnZhbHVlPSR7dGhpcy5kZXNjcmlwdGlvbn1cbiAgICAgICAgICBAY2hhbmdlPVwiJHsoZSkgPT4gKHRoaXMuZGVzY3JpcHRpb24gPSBlLmN1cnJlbnRUYXJnZXQudmFsdWUpfVwiXG4gICAgICAgID5cbiAgICAgICAgPC90ZXh0YXJlYT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgO1xufVxuIiwiaW1wb3J0IHsgTGl0RWxlbWVudCB9IGZyb20gXCJsaXRcIjtcbmltcG9ydCByZW5kZXIgZnJvbSBcIi4vYWRtaW4tZmVhdHVyZWQtY29sbGVjdGlvbnMudHBsLmpzXCI7XG5cbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbmltcG9ydCBcIi4vYWRtaW4tY29udGVudC1wYW5lbFwiO1xuXG5pbXBvcnQgXCJAdWNkLWxpYi90aGVtZS1lbGVtZW50cy91Y2RsaWIvdWNkbGliLWljb24vdWNkbGliLWljb25cIjtcblxuLyoqXG4gKiBAY2xhc3MgQWRtaW5GZWF0dXJlZENvbGxlY3Rpb25zXG4gKiBAZGVzY3JpcHRpb24gYWRtaW4gVUkgZm9yIGN1c3RvbWl6aW5nIGZlYXR1cmVkIGNvbGxlY3Rpb25zIG9uIHRoZSBob21lcGFnZVxuICovXG5leHBvcnQgY2xhc3MgQWRtaW5GZWF0dXJlZENvbGxlY3Rpb25zIGV4dGVuZHMgTWl4aW4oTGl0RWxlbWVudCkud2l0aChcbiAgTGl0Q29ya1V0aWxzXG4pIHtcbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwYW5lbHMgOiB7IHR5cGUgOiBBcnJheSB9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuXG4gICAgdGhpcy5wYW5lbHMgPSBbXTtcbiAgICAvLyB0aGlzLmlzRGlydHkgPSBmYWxzZTtcbiAgICB0aGlzLl9pbmplY3RNb2RlbChcIkZjQXBwQ29uZmlnTW9kZWxcIik7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVkXG4gICAqIEBkZXNjcmlwdGlvbiBMaXQgbGlmZWN5Y2xlIG1ldGhvZFxuICAgKi9cbiAgdXBkYXRlZCgpIHtcbiAgICB0aGlzLl91cGRhdGVVaVN0eWxlcyhudWxsLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGxvYWRBZG1pbkRhdGFcbiAgICogQGRlc2NyaXB0aW9uIGxvYWQgYWRtaW4gcGFuZWwgZGF0YVxuICAgKiBcbiAgICogQHBhcmFtIHtBcnJheX0gZGF0YVxuICAgKi9cbiAgbG9hZEFkbWluRGF0YShkYXRhKSB7XG4gICAgdGhpcy5wYW5lbHMgPSBkYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX25ld1BhbmVsXG4gICAqIEBkZXNjcmlwdGlvbiBBZGQgQ29udGVudCBwYW5lbCBjbGljayBoYW5kbGVyLCBjcmVhdGVzIG5ldyBwYW5lbCBhbmQgYWRkcyB0byBwYW5lbHMgYXJyYXlcbiAgICogQHBhcmFtIHtDdXN0b21FdmVudH0gZVxuICAgKi9cbiAgX25ld1BhbmVsKGUpIHtcbiAgICBsZXQgdHlwZSA9IGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3RbMF07XG4gICAgdGhpcy5wYW5lbHMucHVzaCh7XG4gICAgICBwb3NpdGlvbjogdGhpcy5wYW5lbHMubGVuZ3RoLFxuICAgICAgdHlwZSxcbiAgICAgIHBsYWNlbWVudDogdHlwZSA9PT0gXCJzaW5nbGVcIiA/IFwibGVmdFwiIDogXCJjZW50ZXJlZFwiLFxuICAgICAgY29sbGVjdGlvbklkOiBcIlwiLFxuICAgICAgaGVhZGluZzogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgY29sbGVjdGlvbklkczogdHlwZSA9PT0gXCJjYXJkc1wiID8gW3sgcG9zaXRpb246IDAsIHNlbGVjdGVkOiBcIlwiIH1dIDogW10sXG4gICAgfSk7XG4gICAgdGhpcy5yZXF1ZXN0VXBkYXRlKCk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuX3VwZGF0ZVVpU3R5bGVzKG51bGwsIHRydWUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX3VwZGF0ZVVpU3R5bGVzXG4gICAqIEBkZXNjcmlwdGlvbiBMaXN0ZW5lciBhdHRhY2hlZCB0byA8YWRtaW4tY29udGVudC1wYW5lbD4gdXBkYXRlZCBldmVudHNcbiAgICogQHBhcmFtIHtDdXN0b21FdmVudH0gZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGFsbFBhbmVscyBzZXQgdG8gdHJ1ZSB0byByZWZyZXNoIGFsbCBhZG1pbiBwYW5lbHNcbiAgICovXG4gIF91cGRhdGVVaVN0eWxlcyhlLCBhbGxQYW5lbHMgPSBmYWxzZSkge1xuICAgIGxldCBwYW5lbCA9IGUgPyBlLmN1cnJlbnRUYXJnZXQgOiBudWxsO1xuICAgIGlmICghcGFuZWwgJiYgIWFsbFBhbmVscykgcmV0dXJuO1xuXG4gICAgLy8gVE9ETyBoYWNrIG92ZXJyaWRpbmcgc3R5bGVzIG9mIHNsaW0gc2VsZWN0LCBzaG91bGQgd2UgdXBkYXRlIHRoZSBicmFuZCBjb21wb25lbnQgdG8gYWxsb3cgY3VzdG9tIHN0eWxlcyBpbnN0ZWFkP1xuICAgIGxldCBzZWxlY3RzID0gW107XG4gICAgbGV0IHBhbmVscyA9IFtdO1xuICAgIGlmIChhbGxQYW5lbHMpIHtcbiAgICAgIHBhbmVscyA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yQWxsKFwiYWRtaW4tY29udGVudC1wYW5lbFwiKTtcbiAgICAgIGlmIChwYW5lbHMubGVuZ3RoKSB7XG4gICAgICAgIHBhbmVscy5mb3JFYWNoKChwKSA9PiB7XG4gICAgICAgICAgc2VsZWN0cy5wdXNoKFxuICAgICAgICAgICAgLi4ucC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ1Y2QtdGhlbWUtc2xpbS1zZWxlY3RcIilcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0cy5wdXNoKFxuICAgICAgICAuLi5wYW5lbC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ1Y2QtdGhlbWUtc2xpbS1zZWxlY3RcIilcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghc2VsZWN0cy5sZW5ndGgpIHJldHVybjtcblxuICAgIHNlbGVjdHMuZm9yRWFjaCgoc2VsZWN0KSA9PiB7XG4gICAgICBsZXQgc3NNYWluID0gc2VsZWN0LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIi5zcy1tYWluXCIpO1xuICAgICAgaWYgKHNzTWFpbikge1xuICAgICAgICBzc01haW4uc3R5bGUuYm9yZGVyID0gJ25vbmUnO1xuICAgICAgICBzc01haW4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgICAgIH1cblxuICAgICAgbGV0IHNzU2luZ2xlID0gc2VsZWN0LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIi5zcy1zaW5nbGUtc2VsZWN0ZWRcIik7XG4gICAgICBpZiAoc3NTaW5nbGUpIHtcbiAgICAgICAgc3NTaW5nbGUuc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XG4gICAgICAgIHNzU2luZ2xlLnN0eWxlLmhlaWdodCA9IFwiNDlweFwiO1xuICAgICAgICBzc1NpbmdsZS5zdHlsZS5wYWRkaW5nTGVmdCA9IFwiMXJlbVwiO1xuICAgICAgICBzc1NpbmdsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInZhcigtLWNvbG9yLWFnZ2llLWJsdWUtNTApXCI7XG4gICAgICAgIHNzU2luZ2xlLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcwJztcbiAgICAgICAgc3NTaW5nbGUuc3R5bGUuZm9udFdlaWdodCA9IFwiYm9sZFwiO1xuICAgICAgICBzc1NpbmdsZS5zdHlsZS5jb2xvciA9IFwidmFyKC0tY29sb3ItYWdnaWUtYmx1ZSlcIjtcbiAgICAgIH1cblxuICAgICAgLy8gbWFrZSBkZXNjcmlwdGlvbiB0ZXh0IGFyZWEgc2FtZSB3aWR0aCAoLXBhZGRpbmcgZXRjKSBhcyBzZWxlY3QgaW5wdXRcbiAgICAgIGxldCBzZWxlY3RXaWR0aCA9IHNlbGVjdC5vZmZzZXRXaWR0aCAtIDMwO1xuICAgICAgLy8gbGV0IGRlc2NyaXB0aW9uID0gcGFuZWwuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcuZGVzY3JpcHRpb24nKTtcbiAgICAgIC8vIGRlc2NyaXB0aW9uLnN0eWxlLndpZHRoID0gc2VsZWN0V2lkdGgrJ3B4JztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF90cmFzaFBhbmVsXG4gICAqIEBkZXNjcmlwdGlvbiBMaXN0ZW5lciBhdHRhY2hlZCB0byA8YWRtaW4tY29udGVudC1wYW5lbD4gdHJhc2ggZXZlbnRzLCByZW1vdmUgcGFuZWxcbiAgICogQHBhcmFtIHtDdXN0b21FdmVudH0gZVxuICAgKi9cbiAgX3RyYXNoUGFuZWwoZSkge1xuICAgIGxldCBwb3NpdGlvbiA9IGUuZGV0YWlsLnBvc2l0aW9uO1xuICAgIHRoaXMucGFuZWxzLnNwbGljZShwb3NpdGlvbiwgMSk7XG5cbiAgICAvLyB1cGRhdGUgcG9zaXRpb24gb2YgcmVtYWluaW5nIHBhbmVsc1xuICAgIHRoaXMucGFuZWxzLmZvckVhY2goKHBhbmVsLCBpKSA9PiB7XG4gICAgICBwYW5lbC5wb3NpdGlvbiA9IGk7XG4gICAgfSk7XG4gICAgdGhpcy5yZXF1ZXN0VXBkYXRlKCk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuX3VwZGF0ZVVpU3R5bGVzKG51bGwsIHRydWUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX21vdmVQYW5lbFVwXG4gICAqIEBkZXNjcmlwdGlvbiBMaXN0ZW5lciBhdHRhY2hlZCB0byA8YWRtaW4tY29udGVudC1wYW5lbD4gYXJyb3cgZXZlbnRzLCByZXBvc2l0aW9uIHBhbmVsXG4gICAqIEBwYXJhbSB7Q3VzdG9tRXZlbnR9IGVcbiAgICovXG4gIF9tb3ZlUGFuZWxVcChlKSB7XG4gICAgbGV0IHBvc2l0aW9uID0gZS5kZXRhaWwucG9zaXRpb247XG4gICAgaWYgKHBvc2l0aW9uID09PSAwKSByZXR1cm47XG5cbiAgICB0aGlzLl91cGRhdGVQYW5lbHNEYXRhKCk7XG5cbiAgICBsZXQgcGFuZWwgPSB0aGlzLnBhbmVscy5zcGxpY2UocG9zaXRpb24sIDEpWzBdO1xuXG4gICAgdGhpcy5wYW5lbHMuc3BsaWNlKHBvc2l0aW9uIC0gMSwgMCwgcGFuZWwpO1xuXG4gICAgLy8gdXBkYXRlIHBvc2l0aW9uIG9mIHJlbWFpbmluZyBwYW5lbHNcbiAgICB0aGlzLnBhbmVscy5mb3JFYWNoKChwYW5lbCwgaSkgPT4ge1xuICAgICAgcGFuZWwucG9zaXRpb24gPSBpO1xuICAgIH0pO1xuICAgIC8vIHRoaXMuaXNEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5yZXF1ZXN0VXBkYXRlKCk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuX3VwZGF0ZVVpU3R5bGVzKG51bGwsIHRydWUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX21vdmVQYW5lbFVwXG4gICAqIEBkZXNjcmlwdGlvbiBMaXN0ZW5lciBhdHRhY2hlZCB0byA8YWRtaW4tY29udGVudC1wYW5lbD4gYXJyb3cgZXZlbnRzLCByZXBvc2l0aW9uIHBhbmVsXG4gICAqIEBwYXJhbSB7Q3VzdG9tRXZlbnR9IGVcbiAgICovXG4gIF9tb3ZlUGFuZWxEb3duKGUpIHtcbiAgICBsZXQgcG9zaXRpb24gPSBlLmRldGFpbC5wb3NpdGlvbjtcbiAgICBpZiAocG9zaXRpb24gPT09IHRoaXMucGFuZWxzLmxlbmd0aCAtIDEpIHJldHVybjtcblxuICAgIHRoaXMuX3VwZGF0ZVBhbmVsc0RhdGEoKTtcblxuICAgIGxldCBwYW5lbCA9IHRoaXMucGFuZWxzLnNwbGljZShwb3NpdGlvbiwgMSlbMF07XG5cbiAgICB0aGlzLnBhbmVscy5zcGxpY2UocG9zaXRpb24gKyAxLCAwLCBwYW5lbCk7XG5cbiAgICAvLyB1cGRhdGUgcG9zaXRpb24gb2YgcmVtYWluaW5nIHBhbmVsc1xuICAgIHRoaXMucGFuZWxzLmZvckVhY2goKHBhbmVsLCBpKSA9PiB7XG4gICAgICBwYW5lbC5wb3NpdGlvbiA9IGk7XG4gICAgfSk7XG4gICAgLy8gdGhpcy5pc0RpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLnJlcXVlc3RVcGRhdGUoKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5fdXBkYXRlVWlTdHlsZXMobnVsbCwgdHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfdXBkYXRlUGFuZWxzRGF0YVxuICAgKiBAZGVzY3JpcHRpb24gbG9vcCB0aHJvdWdoIHBhbmVsIHVpIGVsZW1lbnRzIGFuZCBzZXQgcGFuZWxzIGFycmF5IHdpdGggY3VycmVudGx5IHNldCBkYXRhXG4gICAqL1xuICBfdXBkYXRlUGFuZWxzRGF0YSgpIHtcbiAgICBsZXQgcGFuZWxzID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3JBbGwoXCJhZG1pbi1jb250ZW50LXBhbmVsXCIpO1xuICAgIHBhbmVscy5mb3JFYWNoKChwYW5lbCwgaSkgPT4ge1xuICAgICAgbGV0IG1hdGNoID0gdGhpcy5wYW5lbHMuZmlsdGVyKChwKSA9PiBwLnBvc2l0aW9uID09PSBwYW5lbC5wb3NpdGlvbilbMF07XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgbWF0Y2gucGxhY2VtZW50ID0gcGFuZWwudHlwZSAhPT0gXCJjYXJkc1wiID8gcGFuZWwucGxhY2VtZW50IDogXCJcIjtcbiAgICAgICAgbWF0Y2guY29sbGVjdGlvbklkID0gcGFuZWwudHlwZSA9PT0gXCJzaW5nbGVcIiA/IHBhbmVsLmNvbGxlY3Rpb25JZCA6IFwiXCI7XG4gICAgICAgIG1hdGNoLmhlYWRpbmcgPSBwYW5lbC50eXBlID09PSBcInRleHRcIiA/IHBhbmVsLmhlYWRpbmcgOiBcIlwiO1xuICAgICAgICBtYXRjaC5kZXNjcmlwdGlvbiA9IHBhbmVsLnR5cGUgIT09IFwiY2FyZHNcIiA/IHBhbmVsLmRlc2NyaXB0aW9uIDogXCJcIjtcbiAgICAgICAgbWF0Y2guY29sbGVjdGlvbklkcyA9IHBhbmVsLnR5cGUgPT09IFwiY2FyZHNcIiA/IHBhbmVsLmNvbGxlY3Rpb25JZHMgOiBbXTtcblxuICAgICAgICBwYW5lbC5pc0RpcnR5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnBhbmVscyA9IFsuLi50aGlzLnBhbmVsc107XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuX3VwZGF0ZVVpU3R5bGVzKG51bGwsIHRydWUpO1xuICAgIH0pO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFkbWluLWZlYXR1cmVkLWNvbGxlY3Rpb25zXCIsIEFkbWluRmVhdHVyZWRDb2xsZWN0aW9ucyk7XG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSBcImxpdFwiO1xuaW1wb3J0IHsgc2hhcmVkU3R5bGVzIH0gZnJvbSBcIi4uLy4uL3N0eWxlcy9zaGFyZWQtc3R5bGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgcmV0dXJuIGh0bWxgXG4gICAgPHN0eWxlPlxuICAgICAgJHtzaGFyZWRTdHlsZXN9IDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgei1pbmRleDogNTAwO1xuICAgICAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTQwKSAqL1xuICAgICAgfVxuXG4gICAgICBoMiB7XG4gICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gICAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICAgIH1cblxuICAgICAgLmltZy1ib3gge1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBib3JkZXI6IDNweCBzb2xpZCB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTYwKTtcbiAgICAgICAgaGVpZ2h0OiAxMjVweDtcbiAgICAgICAgd2lkdGg6IDI0MHB4O1xuICAgICAgICBtYXJnaW46IDAuNXJlbTtcbiAgICAgIH1cblxuICAgICAgLmltZy1ib3g6aG92ZXIge1xuICAgICAgICBib3JkZXI6IDNweCBzb2xpZCB2YXIoLS1jb2xvci1hZ2dpZS1nb2xkKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtZ29sZCk7XG4gICAgICB9XG5cbiAgICAgIC5pbWctYm94IHVjZGxpYi1pY29uIHtcbiAgICAgICAgZmlsbDogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS04MCk7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5pbWctYm94IC5jb250ZW50LXR5cGUtbGFiZWwge1xuICAgICAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS04MCk7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICB9XG5cbiAgICAgIC5hZGQtY29udGVudC1jb250YWluZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB3aWR0aDogNTAlO1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgfVxuXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogOTkxcHgpIHtcbiAgICAgICAgLyogdGFibGV0IGFuZCBtb2JpbGUsIGp1c3Qgc3R5bGUgZnVsbCB3aWR0aCAqL1xuICAgICAgICAuYWRkLWNvbnRlbnQtY29udGFpbmVyIHtcbiAgICAgICAgICB3aWR0aDogOTAlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgPC9zdHlsZT5cblxuICAgICR7dGhpcy5wYW5lbHMubWFwKFxuICAgICAgKHBhbmVsKSA9PiBodG1sYFxuICAgICAgICA8YWRtaW4tY29udGVudC1wYW5lbFxuICAgICAgICAgIEBwYW5lbC1sb2FkZWQ9XCIke3RoaXMuX3VwZGF0ZVVpU3R5bGVzfVwiXG4gICAgICAgICAgQHRyYXNoLWNsaWNrZWQ9XCIke3RoaXMuX3RyYXNoUGFuZWx9XCJcbiAgICAgICAgICBAdXAtYXJyb3ctY2xpY2tlZD1cIiR7dGhpcy5fbW92ZVBhbmVsVXB9XCJcbiAgICAgICAgICBAZG93bi1hcnJvdy1jbGlja2VkPVwiJHt0aGlzLl9tb3ZlUGFuZWxEb3dufVwiXG4gICAgICAgICAgdHlwZT1cIiR7cGFuZWwudHlwZX1cIlxuICAgICAgICAgIHBvc2l0aW9uPVwiJHtwYW5lbC5wb3NpdGlvbn1cIlxuICAgICAgICAgIHBsYWNlbWVudD1cIiR7cGFuZWwucGxhY2VtZW50fVwiXG4gICAgICAgICAgY29sbGVjdGlvbklkPVwiJHtwYW5lbC5jb2xsZWN0aW9uSWR9XCJcbiAgICAgICAgICBoZWFkaW5nPVwiJHtwYW5lbC5oZWFkaW5nfVwiXG4gICAgICAgICAgZGVzY3JpcHRpb249XCIke3BhbmVsLmRlc2NyaXB0aW9ufVwiXG4gICAgICAgICAgLmNvbGxlY3Rpb25JZHM9XCIke3BhbmVsLmNvbGxlY3Rpb25JZHN9XCJcbiAgICAgICAgPlxuICAgICAgICA8L2FkbWluLWNvbnRlbnQtcGFuZWw+XG4gICAgICBgXG4gICAgKX1cblxuICAgIDxoMj5BZGQgQ29udGVudDo8L2gyPlxuICAgIDxkaXYgY2xhc3M9XCJhZGQtY29udGVudC1jb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzaW5nbGUgaW1nLWJveFwiIEBjbGljaz1cIiR7dGhpcy5fbmV3UGFuZWx9XCI+XG4gICAgICAgIDx1Y2RsaWItaWNvblxuICAgICAgICAgIGljb249XCJ1Y2RsaWItZGFtczpkYW1zLWFkbWluLWNvbGxlY3Rpb24tc2luZ2xlXCJcbiAgICAgICAgPjwvdWNkbGliLWljb24+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY29udGVudC10eXBlLWxhYmVsXCI+Q29sbGVjdGlvbiBTaW5nbGU8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkcyBpbWctYm94XCIgQGNsaWNrPVwiJHt0aGlzLl9uZXdQYW5lbH1cIj5cbiAgICAgICAgPHVjZGxpYi1pY29uXG4gICAgICAgICAgaWNvbj1cInVjZGxpYi1kYW1zOmRhbXMtYWRtaW4tY29sbGVjdGlvbi1jYXJkc1wiXG4gICAgICAgID48L3VjZGxpYi1pY29uPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImNvbnRlbnQtdHlwZS1sYWJlbFwiPkNvbGxlY3Rpb24gQ2FyZHM8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0IGltZy1ib3hcIiBAY2xpY2s9XCIke3RoaXMuX25ld1BhbmVsfVwiPlxuICAgICAgICA8dWNkbGliLWljb24gaWNvbj1cInVjZGxpYi1kYW1zOmRhbXMtYWRtaW4tdGV4dFwiPjwvdWNkbGliLWljb24+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY29udGVudC10eXBlLWxhYmVsXCI+VGV4dDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgO1xufVxuIiwiaW1wb3J0IHsgTGl0RWxlbWVudCB9IGZyb20gJ2xpdCc7XG5cbmltcG9ydCByZW5kZXIgZnJvbSBcIi4vZGFtcy1oZXJvLnRwbC5qc1wiO1xuXG5pbXBvcnQgeyBNaXhpbiwgTGl0Q29ya1V0aWxzIH0gZnJvbSAnQHVjZC1saWIvY29yay1hcHAtdXRpbHMnO1xuXG5pbXBvcnQgJ0B1Y2QtbGliL3RoZW1lLWVsZW1lbnRzL2JyYW5kL3VjZC10aGVtZS1oZWFkZXIvdWNkLXRoZW1lLWhlYWRlci5qcyc7XG5pbXBvcnQgJ0B1Y2QtbGliL3RoZW1lLWVsZW1lbnRzL2JyYW5kL3VjZC10aGVtZS1wcmltYXJ5LW5hdi91Y2QtdGhlbWUtcHJpbWFyeS1uYXYuanMnO1xuXG5pbXBvcnQgXCIuL2RhbXMtd2F0ZXJjb2xvclwiO1xuXG4vKipcbiAqIEBjbGFzcyBEYW1zSGVyb1xuICogQGRlc2NyaXB0aW9uIFVJIGNvbXBvbmVudCBmb3IgZGlzcGxheWluZyBhIGhlcm8gaW1hZ2VcbiAqIEBwcm9wIHtBcnJheX0gc3JjT3B0aW9ucyAtIFNldCBvZiBpbWFnZSBzb3VyY2VzIHRvIHJhbmRvbWx5IGRpc3BsYXlcbiAqIEBwcm9wIHtTdHJpbmd9IHNyYyAtIEZhbGxiYWNrIGJhY2tncm91bmQgaW1hZ2Ugc291cmNlXG4gKiBAcHJvcCB7U3RyaW5nfSB3YXRlcmNvbG9yIC0gV2F0ZXJjb2xvciB0eXBlXG4gKiBAcHJvcCB7U3RyaW5nfSBzZWxlY3RlZFNyY1VybCAtIFRoZSBjdXJyZW50bHkgZGlzcGxheWVkIGltYWdlIHNvdXJjZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYW1zSGVybyBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpXG4ud2l0aChMaXRDb3JrVXRpbHMpIHtcblxuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNyYzoge3R5cGU6IFN0cmluZ30sXG4gICAgICBzcmNPcHRpb25zOiB7dHlwZTogQXJyYXksIGF0dHJpYnV0ZTogXCJzcmMtb3B0aW9uc1wifSxcbiAgICAgIHdhdGVyY29sb3I6IHt0eXBlOiBTdHJpbmd9LFxuICAgICAgc2VsZWN0ZWRTcmNVcmw6IHt0eXBlOiBTdHJpbmcsIGF0dHJpYnV0ZTogXCJzZWxlY3RlZC1zcmMtdXJsXCJ9XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNyYyA9IFwiXCI7XG4gICAgdGhpcy5zcmNPcHRpb25zID0gW107XG4gICAgdGhpcy5zZWxlY3RlZFNyY1VybCA9IFwiXCI7XG4gICAgdGhpcy53YXRlcmNvbG9yID0gXCJib3JkZXItd2hpdGVcIjtcblxuICAgIHRoaXMuX3NyY0NoYW5nZSA9IG5ldyBDdXN0b21FdmVudCgnc3JjLWNoYW5nZScsIHtcbiAgICAgIGRldGFpbDoge1xuICAgICAgICBtZXNzYWdlOiAnQSBuZXcgaW1hZ2UgaGFzIGJlZW4gbG9hZGVkJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5faW5qZWN0TW9kZWwoJ0ZjQXBwQ29uZmlnTW9kZWwnKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2h1ZmZsZUltYWdlXG4gICAqIEBkZXNjcmlwdGlvbiBSYW5kb21seSBkaXNwbGF5cyBhIG5ldyBoZXJvIGltYWdlLlxuICAgKiBcbiAgICogQHJldHVybnMge1N0cmluZ30gVGhlIG5ldyBpbWcgc3JjXG4gICAqL1xuICBzaHVmZmxlSW1hZ2UoKXtcbiAgICB0aGlzLl9zZXRTcmMoKTtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFNyY1VybDtcbiAgfVxuXG4gIHVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpIHtcbiAgICBpZiggY2hhbmdlZFByb3BlcnRpZXMuaGFzKCdzZWxlY3RlZFNyY1VybCcpICYmIHRoaXMuc2VsZWN0ZWRTcmNVcmwubGVuZ3RoID4gMCApIHtcbiAgICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltZy5zcmMgPSB0aGlzLnNlbGVjdGVkU3JjVXJsO1xuXG4gICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcuaW1hZ2UnKTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgKz0gJ3ZhcigtLWdyYWRpZW50LWFnLXB1dGFoKSwgdXJsKCcgKyBpbWcuc3JjICsgJyknO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRTaXplID0gJ2NvdmVyJztcbiAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfc2V0U3JjXG4gICAqIEBkZXNjcmlwdGlvbiBTZXRzIHRoZSBiYWNrZ3JvdW5kIGltYWdlIHNyYyBwcm9wZXJ0eS5cbiAgICovXG4gIGFzeW5jIF9zZXRTcmMoKXtcbiAgICAvLyBsZXQgZmVhdHVyZWRJbWFnZXMgPSBhd2FpdCB0aGlzLkZjQXBwQ29uZmlnTW9kZWwuZ2V0RGVmYXVsdEltYWdlc0NvbmZpZygpO1xuICAgIC8vIHRoaXMuc3JjT3B0aW9ucyA9IGZlYXR1cmVkSW1hZ2VzPy5ib2R5Py5mZWF0dXJlZEltYWdlcztcblxuICAgIGlmKCAhdGhpcy5zcmNPcHRpb25zIHx8IHRoaXMuc3JjT3B0aW9ucy5sZW5ndGggPCAxICkge1xuICAgICAgdGhpcy5zZWxlY3RlZFNyY1VybCA9ICcvaW1hZ2VzL2RlZmF1bHRzL2FubnVhbC13aW50ZXItc2FsZTE5NTIuanBnJztcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9zcmNDaGFuZ2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogIHRoaXMuc3JjT3B0aW9ucy5sZW5ndGgpO1xuICAgIGxldCBzcmMgPSB0aGlzLnNyY09wdGlvbnNbaV07XG4gICAgdGhpcy5zZWxlY3RlZFNyY1VybCA9IHNyYy5pbWFnZVVybDtcblxuICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcuc3JjID0gdGhpcy5zZWxlY3RlZFNyY1VybDtcblxuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBsZXQgZWxlbWVudCA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcuaW1hZ2UnKTtcbiAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlICs9ICd2YXIoLS1ncmFkaWVudC1hZy1wdXRhaCksIHVybCgnICsgaW1nLnNyYyArICcpJztcbiAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICB9O1xuXG4gICAgXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NyY0NoYW5nZSk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBnZXRDb250YWluZXJTdHlsZXNcbiAgICogQGRlc2NyaXB0aW9uIElubGluZSBzdHlsZXMgZm9yIGVsZW1lbnQncyBiYXNlIGNvbnRhaW5lclxuICAgKiBcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIGdldENvbnRhaW5lclN0eWxlcygpe1xuICAgIGxldCBzdHlsZXMgPSB7XG4gICAgICAnYmFja2dyb3VuZC1pbWFnZSc6ICd2YXIoLS1ncmFkaWVudC1hZy1wdXRhaCknXG4gICAgfTtcbiAgICByZXR1cm4gc3R5bGVzO1xuICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdkYW1zLWhlcm8nLCBEYW1zSGVybyk7XG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0JztcbmltcG9ydCB7IHN0eWxlTWFwIH0gZnJvbSAnbGl0LWh0bWwvZGlyZWN0aXZlcy9zdHlsZS1tYXAuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXIoKSB7IFxucmV0dXJuIGh0bWxgXG5cbjxzdHlsZT5cbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG4gIC5jb250YWluZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB6LWluZGV4OiAxO1xuICB9XG4gIC5pbWFnZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBhbmltYXRpb246IGZhZGVpbiAxLjVzIGVhc2UtaW4tb3V0O1xuICAgIHotaW5kZXg6IC0xO1xuICB9XG4gIEBrZXlmcmFtZXMgZmFkZWluIHtcbiAgICBmcm9tIHsgb3BhY2l0eTogMDsgfVxuICAgIHRvICAgeyBvcGFjaXR5OiAxOyB9XG4gIH1cblxuICA6OnNsb3R0ZWQoKikge1xuICAgIGNvbG9yOiB2YXIoLS1jb2xvci13aGl0ZSkgIWltcG9ydGFudDtcbiAgfVxuICBkYW1zLXdhdGVyY29sb3Ige1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGhlaWdodDogOHJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAtMXB4OyAvKiBoYWNrIHRvIGVuc3VyZSB3ZSBkb24ndCBnZXQgbGluZSBhdCBib3R0b20gKi9cbiAgfVxuICBcbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJjb250YWluZXJcIiBzdHlsZT1cIiR7c3R5bGVNYXAodGhpcy5nZXRDb250YWluZXJTdHlsZXMoKSl9XCI+ICBcbiAgPGRpdiBjbGFzcz1cImltYWdlXCI+PC9kaXY+XG4gIDxzbG90Pjwvc2xvdD5cbiAgJHt0aGlzLndhdGVyY29sb3IgPyBodG1sYFxuICAgIDxkYW1zLXdhdGVyY29sb3IgXG4gICAgICBlbGVtZW50PVwiZGl2XCJcbiAgICAgIHNyYy1maWxlLXByZWZpeD1cIiR7dGhpcy53YXRlcmNvbG9yLnNwbGl0KFwiLVwiKVswXX1cIlxuICAgICAgY29sb3I9XCIke3RoaXMud2F0ZXJjb2xvci5zcGxpdChcIi1cIilbMV19XCI+XG4gICAgPC9kYW1zLXdhdGVyY29sb3I+XG4gIGA6IGh0bWxgYH1cbjwvZGl2PlxuXG5gO30iLCJpbXBvcnQgeyBMaXRFbGVtZW50IH0gZnJvbSBcImxpdFwiO1xuXG5pbXBvcnQgcmVuZGVyIGZyb20gXCIuL2RhbXMtaGlnaGxpZ2h0ZWQtY29sbGVjdGlvbi50cGwuanNcIjtcblxuaW1wb3J0IHsgTWl4aW4sIExpdENvcmtVdGlscyB9IGZyb20gJ0B1Y2QtbGliL2NvcmstYXBwLXV0aWxzJztcblxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi8uLi8uLi9saWIvdXRpbHMvaW5kZXguanNcIjtcblxuLyoqXG4gKiBAY2xhc3MgRGFtc0hpZ2hsaWdodGVkQ29sbGVjdGlvblxuICogQGRlc2NyaXB0aW9uIEhvbWVwYWdlIFVJIGNvbXBvbmVudCBjbGFzcyBmb3IgZGlzcGxheWluZyBhIHBhZ2Ugc2VjdGlvbiBoaWdsaWdodGluZyBhIGNvbGxlY3Rpb24uXG4gKlxuICogQHByb3Age09iamVjdH0gY29sbGVjdGlvbiAtIEEgZmVhdHVyZWQgY29sbGVjdGlvbiBmcm9tIHRoZSBGY0FwcENvbmZpZ01vZGVsLlxuICogQHByb3Age0Jvb2xlYW59IGltYWdlUmlnaHQgLSBTaG91bGQgdGhlIGltYWdlIGJlIG9uIHRoZSByaWdodCBvciBsZWZ0P1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYW1zSGlnaGxpZ2h0ZWRDb2xsZWN0aW9uIGV4dGVuZHMgTWl4aW4oTGl0RWxlbWVudCkud2l0aChcbiAgTGl0Q29ya1V0aWxzXG4pIHtcbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xsZWN0aW9uOiB7IHR5cGU6IE9iamVjdCB9LFxuICAgICAgY29sbGVjdGlvbklkOiB7IHR5cGU6IFN0cmluZywgYXR0cmlidXRlOiBcImNvbGxlY3Rpb24taWRcIiB9LFxuICAgICAgaW1hZ2VSaWdodDogeyB0eXBlOiBCb29sZWFuLCBhdHRyaWJ1dGU6IFwiaW1hZ2UtcmlnaHRcIiB9LFxuICAgICAgY29sbGVjdGlvblRpdGxlOiB7IHR5cGU6IFN0cmluZywgYXR0cmlidXRlOiBcImNvbGxlY3Rpb24tdGl0bGVcIiB9LFxuICAgICAgaW1nU3JjOiB7IHR5cGU6IFN0cmluZywgYXR0cmlidXRlOiBcImltZy1zcmNcIiB9LFxuICAgICAgY29sbGVjdGlvbkRlc2M6IHsgdHlwZTogU3RyaW5nLCBhdHRyaWJ1dGU6IFwiY29sbGVjdGlvbi1kZXNjXCIgfSxcbiAgICAgIGl0ZW1DdDogeyB0eXBlOiBOdW1iZXIsIGF0dHJpYnV0ZTogXCJpdGVtLWN0XCIgfSxcbiAgICAgIGhyZWY6IHsgdHlwZTogU3RyaW5nIH0sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNvbGxlY3Rpb24gPSB7fTtcbiAgICB0aGlzLmNvbGxlY3Rpb25JZCA9IFwiXCI7XG4gICAgdGhpcy5yZW5kZXJlZENvbGxlY3Rpb25pZCA9IFwiXCI7XG4gICAgdGhpcy5pbWFnZVJpZ2h0ID0gZmFsc2U7XG4gICAgdGhpcy5jb2xsZWN0aW9uVGl0bGUgPSBcIlwiO1xuICAgIHRoaXMuaW1nU3JjID0gXCJcIjtcbiAgICB0aGlzLmNvbGxlY3Rpb25EZXNjID0gXCJcIjtcbiAgICB0aGlzLml0ZW1DdCA9IDA7XG4gICAgdGhpcy5ocmVmID0gXCJcIjtcblxuICAgIHRoaXMuX2luamVjdE1vZGVsKFwiQ29sbGVjdGlvbk1vZGVsXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgd2lsbFVwZGF0ZVxuICAgKiBAZGVzY3JpcHRpb24gTGl0IGxpZmVjeWNsZSBtZXRob2QgY2FsbGVkIHdoZW4gZWxlbWVudCBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0ge01hcH0gcHJvcHMgLSBQcm9wZXJ0aWVzIHRoYXQgaGF2ZSBjaGFuZ2VkLlxuICAgKi9cbiAgd2lsbFVwZGF0ZShwcm9wcykge1xuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNvbGxlY3Rpb24pLmxlbmd0aCkge1xuICAgICAgaWYgKHRoaXMuY29sbGVjdGlvbi5sYWJlbCkge1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uVGl0bGUgPSB0aGlzLmNvbGxlY3Rpb24ubGFiZWw7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY29sbGVjdGlvbi5hc3NvY2lhdGVkTWVkaWEubmFtZSkge1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uVGl0bGUgPSB0aGlzLmNvbGxlY3Rpb24uYXNzb2NpYXRlZE1lZGlhLm5hbWU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jb2xsZWN0aW9uLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb25EZXNjID0gdGhpcy5jb2xsZWN0aW9uLmRlc2NyaXB0aW9uO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbGxlY3Rpb24uYXNzb2NpYXRlZE1lZGlhLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb25EZXNjID0gdGhpcy5jb2xsZWN0aW9uLmFzc29jaWF0ZWRNZWRpYS5kZXNjcmlwdGlvbjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2ltZ1NyYyA9IHRoaXMuY29sbGVjdGlvbi50aHVtYm5haWxVcmxcbiAgICAgICAgPyB0aGlzLmNvbGxlY3Rpb24udGh1bWJuYWlsVXJsXG4gICAgICAgIDogdGhpcy5jb2xsZWN0aW9uLmFzc29jaWF0ZWRNZWRpYS50aHVtYm5haWxVcmw7XG4gICAgICB0aGlzLl9pdGVtQ3QgPSB0aGlzLmNvbGxlY3Rpb24uYXNzb2NpYXRlZE1lZGlhLnJlY29yZENvdW50O1xuICAgICAgdGhpcy5faHJlZiA9IHRoaXMuY29sbGVjdGlvbi5hc3NvY2lhdGVkTWVkaWFbXCJAaWRcIl07XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbGxlY3Rpb25JZCAmJiB0aGlzLmNvbGxlY3Rpb25JZCAhPT0gdGhpcy5yZW5kZXJlZENvbGxlY3Rpb25pZCkge1xuICAgICAgdGhpcy5yZW5kZXJlZENvbGxlY3Rpb25pZCA9IHRoaXMuY29sbGVjdGlvbklkO1xuICAgICAgdGhpcy5fZ2V0Q29sbGVjdGlvbih0aGlzLmNvbGxlY3Rpb25JZCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgX2dldENvbGxlY3Rpb24oaWQpIHtcbiAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5Db2xsZWN0aW9uTW9kZWwuZ2V0KGlkKTtcblxuICAgIGxldCBjbGllbnRFZGl0c0lkID0gcmVzLnZjRGF0YS5jbGllbnRFZGl0cz8uWydAaWQnXTtcbiAgICBsZXQgb3ZlcnJpZGRlbkZlYXR1cmVJbWFnZSA9ICByZXMudmNEYXRhLmNsaWVudEVkaXRzPy50aHVtYm5haWxVcmw/LlsnQGlkJ107XG4gICAgaWYoIGNsaWVudEVkaXRzSWQgJiYgb3ZlcnJpZGRlbkZlYXR1cmVJbWFnZSApIHtcbiAgICAgIHRoaXMuaW1nU3JjID0gJy9mY3JlcG8vcmVzdCcgKyBjbGllbnRFZGl0c0lkICsgJy9mZWF0dXJlZEltYWdlLmpwZyc7XG4gICAgfSBlbHNlIGlmKCByZXMudmNEYXRhLmltYWdlcyApIHtcbiAgICAgIGxldCBpbWFnZXMgPSByZXMudmNEYXRhLmltYWdlcztcbiAgICAgIHRoaXMuaW1nU3JjID0gaW1hZ2VzLm1lZGl1bSA/IGltYWdlcy5tZWRpdW0udXJsIDogaW1hZ2VzLm9yaWdpbmFsLnVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbWdTcmMgPSBcIi9pbWFnZXMvdHJlZS1iaWtlLWlsbHVzdHJhdGlvbi5wbmdcIjtcbiAgICB9XG4gICAgdGhpcy5jb2xsZWN0aW9uVGl0bGUgPSByZXMudmNEYXRhLnRpdGxlO1xuICAgIHRoaXMuaXRlbUN0ID0gdXRpbHMuZm9ybWF0TnVtYmVyV2l0aENvbW1hcyhyZXMudmNEYXRhLmNvdW50KTtcbiAgICB0aGlzLmhyZWYgPSByZXMuaWQ7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiZGFtcy1oaWdobGlnaHRlZC1jb2xsZWN0aW9uXCIsIERhbXNIaWdobGlnaHRlZENvbGxlY3Rpb24pO1xuIiwiaW1wb3J0IHsgaHRtbCwgY3NzIH0gZnJvbSAnbGl0JztcbmltcG9ydCB7IGNsYXNzTWFwIH0gZnJvbSAnbGl0LWh0bWwvZGlyZWN0aXZlcy9jbGFzcy1tYXAuanMnO1xuaW1wb3J0IGxpbmtzQ3NzIGZyb20gXCJAdWNkLWxpYi90aGVtZS1zYXNzLzFfYmFzZV9odG1sL19saW5rcy5jc3NcIjtcbi8vIGltcG9ydCBpbmRleDFDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvMV9iYXNlX2h0bWwvX2luZGV4LmNzc1wiO1xuaW1wb3J0IGJ1dHRvbnNDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvMl9iYXNlX2NsYXNzL19idXR0b25zLmNzc1wiO1xuaW1wb3J0IGhlYWRpbmdzQ3NzIGZyb20gXCJAdWNkLWxpYi90aGVtZS1zYXNzLzJfYmFzZV9jbGFzcy9faGVhZGluZ3MuY3NzXCI7XG4vLyBpbXBvcnQgaW5kZXgyQ3NzIGZyb20gXCJAdWNkLWxpYi90aGVtZS1zYXNzLzJfYmFzZV9jbGFzcy9faW5kZXguY3NzXCI7XG4vLyBpbXBvcnQgaW5kZXgzQ3NzIGZyb20gXCJAdWNkLWxpYi90aGVtZS1zYXNzLzNfb2JqZWN0cy9faW5kZXguY3NzXCI7XG4vLyBpbXBvcnQgaW5kZXg0Q3NzIGZyb20gXCJAdWNkLWxpYi90aGVtZS1zYXNzLzRfY29tcG9uZW50L19pbmRleC5jc3NcIjtcbi8vIGltcG9ydCBpbmRleDVDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvNV9sYXlvdXQvX2luZGV4LmNzc1wiO1xuLy8gaW1wb3J0IGluZGV4NkNzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy82X3V0aWxpdHkvX2luZGV4LmNzc1wiO1xuLy8gaW1wb3J0IGZhQ3NzIGZyb20gXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLmNzc1wiO1xuLy8gdGhpcy5sb2dnZXIuaW5mbyhmYUNzcyk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHsgXG5yZXR1cm4gaHRtbGBcblxuPHN0eWxlPlxuICAvKiAke2Nzc2BmYUNzc2B9ICovXG4gICR7bGlua3NDc3N9XG4gICR7YnV0dG9uc0Nzc31cbiAgJHtoZWFkaW5nc0Nzc31cbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG4gIC5jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuICAuaW1nLWNvbnRhaW5lciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHBhZGRpbmctdG9wOiA3NSU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgLyogYmFja2dyb3VuZC1pbWFnZTogdXJsKC9pbWFnZXMvbG9nb3MvbG9nby13aGl0ZS01MTIucG5nKTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1ibGFjay0yMCk7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjsgKi9cbiAgfVxuICAuaW1nLWZsZXgge1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgfVxuICAuaW1nLWNvbnRhaW5lciBpbWcge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICB9XG4gIC50ZXh0LWNvbnRhaW5lciB7XG4gICAgZmxleC1ncm93OiAxO1xuICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XG4gICAgcGFkZGluZzogMnJlbSAwO1xuICB9XG4gIC50aXRsZSB7XG4gICAgLyogY29sb3I6IHZhcigtLWNvbG9yLWgzKTtcbiAgICBmb250LXNpemU6IHZhcigtLWZzLWgzKTtcbiAgICBmb250LXdlaWdodDogdmFyKC0tZnctaDMpOyAqL1xuICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgICBtYXJnaW4tdG9wOiA0MHB4O1xuICB9XG4gIC5zdWJ0aXRsZSB7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLWg1KTtcbiAgICBmb250LXNpemU6IHZhcigtLWZzLWg1KTtcbiAgICBmb250LXdlaWdodDogdmFyKC0tZnctaDUpO1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIH1cbiAgLmRlc2NyaXB0aW9uIHtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItcCk7XG4gICAgLyogZm9udC1zaXplOiB2YXIoLS1mcy1wKTsgKi9cbiAgICBmb250LXdlaWdodDogdmFyKC0tZnctcCk7XG4gICAgbWFyZ2luLWJvdHRvbTogNDBweDtcbiAgfVxuICAuYnRuLS1hbHQge1xuICAgIHBhZGRpbmctdG9wOiAwO1xuICAgIHBhZGRpbmctYm90dG9tOiAwO1xuICB9XG4gIEBtZWRpYSAobWluLXdpZHRoOiA3NjdweCkge1xuICAgIC5jb250YWluZXIge1xuICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICB9XG4gICAgLmNvbnRhaW5lci5pbWFnZS1yaWdodCB7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG4gICAgfVxuICAgIC5pbWctZmxleCB7XG4gICAgICBmbGV4LWdyb3c6IHVuc2V0O1xuICAgICAgd2lkdGg6IGNhbGMoNTAlIC0gMjBweCk7XG4gICAgICBtaW4td2lkdGg6IGNhbGMoNTAlIC0gMjBweCk7XG4gICAgfVxuICAgIC50aXRsZSB7XG4gICAgICBtYXJnaW4tdG9wOiAwO1xuICAgIH1cbiAgICAudGV4dC1jb250YWluZXIge1xuICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgICAgcGFkZGluZzogMnJlbTtcbiAgICB9XG4gIH1cblxuICBAbWVkaWEgKG1pbi13aWR0aDogMTA2MHB4KSB7XG4gICAgLmltZy1mbGV4IHtcbiAgICAgIHdpZHRoOiBjYWxjKDUwJSAtIDUwcHgpO1xuICAgICAgbWluLXdpZHRoOiBjYWxjKDUwJSAtIDUwcHgpO1xuICAgIH1cbiAgfVxuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAxNjAxcHgpIHtcblxuXG4gIH1cbjwvc3R5bGU+ICBcbjxkaXYgY2xhc3M9XCJjb250YWluZXIke3RoaXMuaW1hZ2VSaWdodCA/ICcgaW1hZ2UtcmlnaHQnIDogJyd9XCI+XG5cbiAgPGRpdiBjbGFzcz1cImltZy1mbGV4XCI+XG4gICAgPGRpdiBjbGFzcz1cImltZy1jb250YWluZXJcIj5cbiAgICAgICR7dGhpcy5pbWdTcmMgPyBodG1sYFxuICAgICAgICA8aW1nIHNyYz1cIiR7dGhpcy5pbWdTcmN9XCI+XG4gICAgICBgIDogaHRtbGBgfVxuICAgICAgPCEtLSA8aW1nIHNyYz1cIi9pbWFnZXMvZWFzdG1hbi1kZW1vLmpwZWdcIj4gLS0+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJ0ZXh0LWNvbnRhaW5lclwiPlxuICAgIDxoMyBjbGFzcz1cInRpdGxlIGhlYWRpbmctLXByaW1hcnlcIiByb2xlPVwiaGVhZGluZ1wiIGFyaWEtbGV2ZWw9XCIyXCI+JHt0aGlzLmNvbGxlY3Rpb25UaXRsZX08L2gzPlxuICAgIDxkaXYgY2xhc3M9XCJzdWJ0aXRsZVwiPiR7dGhpcy5pdGVtQ3R9IGl0ZW0ke3RoaXMuaXRlbUN0ID09PSAxID8gXCJcIiA6IFwic1wifTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPlxuICAgIDx1Y2RsaWItbWQgaWQ9XCJtZFwiPlxuICAgICAgICA8dWNkbGliLW1kLWNvbnRlbnQ+XG4gICAgICAgICAgJHt0aGlzLmNvbGxlY3Rpb25EZXNjfVxuICAgICAgICA8L3VjZGxpYi1tZC1jb250ZW50PlxuICAgICAgPC91Y2RsaWItbWQ+ICBcbiAgICA8L2Rpdj5cbiAgICA8YSBocmVmPVwiJHt0aGlzLmhyZWZ9XCIgY2xhc3M9XCJidG4tLWFsdCBidG4tLXJvdW5kXCI+RXhwbG9yZSB0aGlzIGNvbGxlY3Rpb248L2E+XG4gIDwvZGl2PlxuXG4gIDwhLS0gPGRpdiBjbGFzcz1cInRleHQtY29udGFpbmVyXCI+XG4gICAgPGgzIGNsYXNzPVwiaGVhZGluZy0tcHJpbWFyeVwiPkVhc3RtYW4ncyBPcmlnaW5hbHM8L2gzPlxuICAgIDxkaXYgY2xhc3M9XCJzdWJ0aXRsZVwiPjEzLDI1OCBpdGVtczwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPlxuICAgICAgUGhvdG9ncmFwaHMsIG5lZ2F0aXZlcyBhbmQgcG9zdGNhcmRzIGNhcHR1cmVkIGJ5IEplcnZpZSBIZW5yeSBFYXN0bWFuIGZvciBhIHdpZGVcbiAgICAgIHZhcmlldHkgb2Ygbm9ydGhlcm4gQ2FsaWZvcm5pYSBsb2NhdGlvbnMgYW5kIGV2ZW50cywgaW5jbHVkaW5nIGRhbSBjb25zdHJ1Y3Rpb24sIGxvZ2dpbmcsIG1pbmluZywgZm9vZCBwcm9jZXNzaW5nLFxuICAgICAgYW5kIGNvbW1tdW5pdHkgYnVpbGRpbmdzIGFuZCBhY3Rpdml0aWVzIGZyb20gY2lyY2EgMTg5MCAtIDE5NjAuXG4gICAgPC9kaXY+XG4gICAgPGEgaHJlZj1cIiR7dGhpcy5faHJlZn1cIiBjbGFzcz1cImJ0bi0tYWx0IGJ0bi0tcm91bmRcIj5FeHBsb3JlIHRoaXMgY29sbGVjdGlvbjwvYT5cbiAgPC9kaXY+IC0tPlxuXG48L2Rpdj5cbmA7fSIsImltcG9ydCB7IExpdEVsZW1lbnR9IGZyb20gJ2xpdCc7XG5pbXBvcnQgeyBNYWluRG9tRWxlbWVudH0gZnJvbSAnQHVjZC1saWIvdGhlbWUtZWxlbWVudHMvdXRpbHMvbWl4aW5zJztcbmltcG9ydCB7IE1peGluLCBMaXRDb3JrVXRpbHMgfSBmcm9tICdAdWNkLWxpYi9jb3JrLWFwcC11dGlscyc7XG5cbmltcG9ydCBcIi4uLy4uL3V0aWxzL2FwcC1jb2xsZWN0aW9uLWNhcmRcIjtcblxuaW1wb3J0ICdAdWNkLWxpYi90aGVtZS1lbGVtZW50cy91Y2RsaWIvdWNkbGliLW1kL3VjZGxpYi1tZCc7XG5pbXBvcnQgXCJAdWNkLWxpYi90aGVtZS1lbGVtZW50cy91Y2RsaWIvdWNkbGliLWljb25zZXQvdWNkbGliLWljb25zZXRcIjtcbmltcG9ydCBcIkB1Y2QtbGliL3RoZW1lLWVsZW1lbnRzL3VjZGxpYi91Y2RsaWItaWNvbi91Y2RsaWItaWNvblwiO1xuaW1wb3J0ICdAdWNkLWxpYi90aGVtZS1lbGVtZW50cy91Y2RsaWIvdWNkbGliLWljb25zL3VjZGxpYi1pY29ucyc7XG5pbXBvcnQgJy4uLy4uL3V0aWxzL2FwcC1pY29ucyc7XG5cbmltcG9ydCBcIi4uLy4uL2NvbXBvbmVudHMvc2VhcmNoLWJveFwiO1xuaW1wb3J0IFwiLi4vLi4vY29tcG9uZW50cy9uYXYtYmFyXCI7XG5pbXBvcnQgXCIuLi8uLi9jb21wb25lbnRzL2ZpbHRlckJ1dHRvblwiO1xuaW1wb3J0IFwiLi4vLi4vY29tcG9uZW50cy9ncmFwaGljcy9kYW1zLXdhdGVyY29sb3JcIjtcbmltcG9ydCBcIi4uLy4uL2NvbXBvbmVudHMvZ3JhcGhpY3MvZGFtcy13YXRlcmNvbG9yLW92ZXJsYXlcIjtcbi8vIGltcG9ydCBcIi4uLy4uL2NvbXBvbmVudHMvd2VsY29tZS1tb2RhbC5qc1wiO1xuXG5pbXBvcnQgXCIuLi8uLi9jb21wb25lbnRzL2NhcmRzL2RhbXMtY29sbGVjdGlvbi1jYXJkXCI7XG5pbXBvcnQgXCIuLi8uLi9jb21wb25lbnRzL2NhcmRzL2RhbXMtaXRlbS1jYXJkXCI7XG5pbXBvcnQgXCIuLi8uLi9jb21wb25lbnRzL2dyYXBoaWNzL2RhbXMtaGVyb1wiO1xuaW1wb3J0IFwiLi4vLi4vY29tcG9uZW50cy9zZWN0aW9ucy9kYW1zLWhpZ2hsaWdodGVkLWNvbGxlY3Rpb25cIjtcbmltcG9ydCBcIi4uLy4uL2NvbXBvbmVudHMvYWRtaW4vYWRtaW4tZmVhdHVyZWQtY29sbGVjdGlvbnNcIjtcblxuaW1wb3J0IHVzZXIgZnJvbSBcIi4uLy4uLy4uL2xpYi91dGlscy91c2VyXCI7XG5cbmltcG9ydCByZW5kZXIgZnJvbSAnLi9hcHAtaG9tZS50cGwuanMnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vLi4vLi4vbGliL3V0aWxzL2luZGV4LmpzJztcblxuLyoqXG4gKiBAY2xhc3MgQXBwSG9tZVxuICogQGRlc2NyaXB0aW9uIGhvbWUgcGFnZSBpcyByZW5kZXJlZCB0byB0aGUgREFNUyB2MlxuICogXG4gKiBAcHJvcCB7T2JqZWN0W119IGZlYXR1cmVkQ29sbGVjdGlvbnMgLSBDb2xsZWN0aW9ucyB0byAgYmUgZGlzcGxheWVkIG9uIGhvbWVwYWdlLiBSZXRyaWV2ZWQgYnkgbW9kZWwuXG4gKiBAcHJvcCB7TnVtYmVyfSBmZWF0dXJlZENvbGxlY3Rpb25zQ3QgLSBUb3RhbCBudW1iZXIgb2YgZmVhdHVyZWQgY29sbGVjdGlvbnMuXG4gKiBAcHJvcCB7T2JqZWN0W119IHJlY2VudENvbGxlY3Rpb25zIC0gQXJyYXkgb2YgcmVjZW50bHkgdXBsb2FkZWQgY29sbGVjdGlvbnMuXG4gKiBAcHJvcCB7Qm9vbGVhbn0gc2hvd0NvbGxlY3Rpb25Hcm91cCAtIERpc3BsYXlzIHRoZSBmZWF0dXJlZCBtdWx0aS1jb2xsZWN0aW9uIHNlY3Rpb24uXG4gKiBAcHJvcCB7T2JqZWN0fSB0ZXh0VHJpbyAtIEFwcGxpY2F0aW9uVGV4dENvbnRhaW5lciBmb3IgdGhlIGNvbGxlY3Rpb24gZ3JvdXAuXG4gKiBAcHJvcCB7QXJyYXl9IGhlcm9JbWdPcHRpb25zIC0gRGF0YSBvcHRpb25zIGZvciB0aGUgaGVybyBpbWFnZSAoc3JjLCBjb2xsZWN0aW9uIG5hbWUsIGV0YylcbiAqIEBwcm9wIHtPYmplY3R9IGhlcm9JbWdDdXJyZW50IC0gVGhlIGN1cnJlbnRseSBkaXNwbGF5ZWQgaGVybyBpbWFnZS5cbiAqL1xuY2xhc3MgQXBwSG9tZSBleHRlbmRzIE1peGluKExpdEVsZW1lbnQpXG4gIC53aXRoKE1haW5Eb21FbGVtZW50LCBMaXRDb3JrVXRpbHMpIHtcbiAgXG4gIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmVhdHVyZWRDb2xsZWN0aW9uczoge3R5cGUgOiBBcnJheX0sXG4gICAgICBmZWF0dXJlZENvbGxlY3Rpb25zQ3Q6IHt0eXBlOiBOdW1iZXJ9LFxuICAgICAgcmVjZW50Q29sbGVjdGlvbnM6IHt0eXBlOiBBcnJheX0sXG4gICAgICBzaG93Q29sbGVjdGlvbkdyb3VwOiB7dHlwZTogQm9vbGVhbn0sXG4gICAgICB0ZXh0VHJpbzoge3R5cGU6IE9iamVjdH0sXG4gICAgICBoZXJvSW1nT3B0aW9uczoge3R5cGU6IEFycmF5fSxcbiAgICAgIGhlcm9JbWdDdXJyZW50OiB7dHlwZTogT2JqZWN0fSxcbiAgICAgIGhlcm9Vcmw6IHt0eXBlOiBTdHJpbmd9LFxuICAgICAgaGVyb0l0ZW1MYWJlbDoge3R5cGU6IFN0cmluZ30sXG4gICAgICBoZXJvSXRlbVVybDoge3R5cGU6IFN0cmluZ30sXG4gICAgICBoZXJvQ29sbGVjdGlvbkxhYmVsOiB7dHlwZTogU3RyaW5nfSxcbiAgICAgIGhlcm9Db2xsZWN0aW9uVXJsOiB7dHlwZTogU3RyaW5nfSxcbiAgICAgIGVkaXRNb2RlOiB7dHlwZTogQm9vbGVhbn0sXG4gICAgICBkaXNwbGF5RGF0YToge3R5cGU6IEFycmF5fSxcbiAgICAgIGlzVWlBZG1pbjoge3R5cGU6IEJvb2xlYW59LFxuICAgICAgLy8gc2hvd1dlbGNvbWVNb2RhbDoge3R5cGU6IEJvb2xlYW59LFxuICAgICAgLy8gd2VsY29tZU1vZGFsVGl0bGU6IHt0eXBlOiBTdHJpbmd9LFxuICAgICAgLy8gd2VsY29tZU1vZGFsQ29udGVudDoge3R5cGU6IFN0cmluZ31cbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmZlYXR1cmVkQ29sbGVjdGlvbnMgPSBbXTtcbiAgICB0aGlzLmZlYXR1cmVkQ29sbGVjdGlvbnNDdCA9IDA7XG4gICAgdGhpcy5zaG93Q29sbGVjdGlvbkdyb3VwID0gZmFsc2U7XG4gICAgdGhpcy5yZWNlbnRDb2xsZWN0aW9ucyA9IFtdO1xuICAgIHRoaXMudGV4dFRyaW8gPSB7fTtcbiAgICB0aGlzLmhlcm9JbWdPcHRpb25zID0gW107XG4gICAgdGhpcy5oZXJvSW1nQ3VycmVudCA9IHt9O1xuICAgIHRoaXMuaGVyb1VybCA9ICcnO1xuICAgIHRoaXMuaGVyb0l0ZW1MYWJlbCA9ICcnO1xuICAgIHRoaXMuaGVyb0l0ZW1VcmwgPSAnJztcbiAgICB0aGlzLmhlcm9Db2xsZWN0aW9uTGFiZWwgPSAnLi4uJztcbiAgICB0aGlzLmhlcm9Db2xsZWN0aW9uVXJsID0gJy4uLic7XG4gICAgdGhpcy5kaXNwbGF5RGF0YSA9IFtdO1xuICAgIHRoaXMuZWRpdE1vZGUgPSBmYWxzZTtcbiAgICB0aGlzLmlzVWlBZG1pbiA9IGZhbHNlO1xuICAgIC8vIHRoaXMuc2hvd1dlbGNvbWVNb2RhbCA9IGZhbHNlO1xuICAgIC8vIHRoaXMud2VsY29tZU1vZGFsVGl0bGUgPSAnV2VsY29tZSB0byB0aGUgbmV3IERpZ2l0YWwgQ29sbGVjdGlvbnMhJztcbiAgICAvLyB0aGlzLndlbGNvbWVNb2RhbENvbnRlbnQgPSBgV2UndmUgcmVjZW50bHkgdXBkYXRlZCB0aGlzIHNpdGUuIFBhcmRvbiBvdXIgZHVzdCBhcyB3ZSBwdXQgb24gdGhlIGZpbmlzaGluZyB0b3VjaGVzLmA7XG4gICAgdGhpcy5faW5qZWN0TW9kZWwoJ0FwcFN0YXRlTW9kZWwnLCAnRmNBcHBDb25maWdNb2RlbCcsICdDb2xsZWN0aW9uTW9kZWwnLCAnUmVjb3JkTW9kZWwnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGZpcnN0VXBkYXRlZFxuICAgKiBAZGVzY3JpcHRpb24gTGl0IGxpZmVjeWNsZSBtZXRob2QgY2FsbGVkIHdoZW4gZWxlbWVudCBpcyBmaXJzdCB1cGRhdGVkXG4gICAqL1xuICBhc3luYyBmaXJzdFVwZGF0ZWQoKSB7XG4gICAgdGhpcy5pc1VpQWRtaW4gPSB1c2VyLmNhbkVkaXRVaSgpO1xuXG4gICAgdGhpcy5fc2V0RmVhdHVyZWRJbWFnZSgpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGxldCBkaXNwbGF5RGF0YSA9IGF3YWl0IHRoaXMuRmNBcHBDb25maWdNb2RlbC5nZXRGZWF0dXJlZENvbGxlY3Rpb25BcHBEYXRhKCk7XG4gICAgICBpZiggZGlzcGxheURhdGEgJiYgZGlzcGxheURhdGEuYm9keSApIHtcbiAgICAgICAgaWYoIHR5cGVvZiBkaXNwbGF5RGF0YS5ib2R5ID09PSAnc3RyaW5nJyApIGRpc3BsYXlEYXRhLmJvZHkgPSBKU09OLnBhcnNlKGRpc3BsYXlEYXRhLmJvZHkpO1xuICAgICAgICB0aGlzLmRpc3BsYXlEYXRhID0gZGlzcGxheURhdGEuYm9keTtcblxuICAgICAgICBsZXQgYWRtaW5QYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FkbWluLWZlYXR1cmVkLWNvbGxlY3Rpb25zJyk7XG4gICAgICAgIGlmKCBhZG1pblBhbmVsICkge1xuICAgICAgICAgIGFkbWluUGFuZWwubG9hZEFkbWluRGF0YSh0aGlzLmRpc3BsYXlEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfVxuICBcbiAgICAgIC8vIGZpbHRlciBvdXQgY29sbGVjdGlvbnMgdGhhdCBkb24ndCBleGlzdCBpbiBmY3JlcG9cbiAgICAgIGxldCBjYXJkc1BhbmVscyA9IHRoaXMuZGlzcGxheURhdGEuZmlsdGVyKGQgPT4gZC50eXBlID09PSAnY2FyZHMnKTtcbiAgICAgIGNhcmRzUGFuZWxzLmZvckVhY2goYXN5bmMgcGFuZWwgPT4ge1xuICAgICAgICBsZXQgY29sbGVjdGlvbklkcyA9IFtdO1xuICBcbiAgICAgICAgcGFuZWwuY29sbGVjdGlvbklkcy5mb3JFYWNoKGNvbGxlY3Rpb25JZCA9PiB7XG4gICAgICAgICAgaWYoIEFQUF9DT05GSUcuY29sbGVjdGlvbkxhYmVsc1tjb2xsZWN0aW9uSWQuc2VsZWN0ZWRdICkgY29sbGVjdGlvbklkcy5wdXNoKGNvbGxlY3Rpb25JZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBwYW5lbC5jb2xsZWN0aW9uSWRzID0gY29sbGVjdGlvbklkcztcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgdGhpcy5sb2dnZXIud2FybignTm8gZmVhdHVyZWQgY29sbGVjdGlvbnMgYWRtaW4gZGF0YSBmb3VuZCcsIGUpO1xuICAgIH1cblxuICAgIC8vIGdldCByZWNlbnQgY29sbGVjdGlvbnNcbiAgICBsZXQgZGF0YSA9IGF3YWl0IHRoaXMuQ29sbGVjdGlvbk1vZGVsLmdldFJlY2VudENvbGxlY3Rpb25zKCk7XG4gICAgaWYoIGRhdGE/LnBheWxvYWQ/LnJlc3VsdHM/Lmxlbmd0aCApIHtcbiAgICAgIHRoaXMucmVjZW50Q29sbGVjdGlvbnMgPSBkYXRhPy5wYXlsb2FkPy5yZXN1bHRzPy5zbGljZSgwLCAzKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlcXVlc3RVcGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbkFwcFN0YXRlVXBkYXRlXG4gICAqIEBkZXNjcmlwdGlvbiBvbiB0aGUgQXBwIHVwZGF0ZSwgdGhlIHN0YXRlIGlzIGRldGVybWluZWQgYW5kIGJ5IGNoZWNraW5nXG4gICAqIHRoZSBsb2NhdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZVxuICAgKi9cbiAgICBhc3luYyBfb25BcHBTdGF0ZVVwZGF0ZShlKSB7XG4gICAgICBpZiggdGhpcy5BcHBTdGF0ZU1vZGVsLmxvY2F0aW9uLnBhZ2UgIT09ICdob21lJyAmJiB0aGlzLnZpc2l0ZWRIb21lICkge1xuICAgICAgICAvLyB0aGlzLl9vbldlbGNvbWVNb2RhbENsb3NlKCk7IC8vIG5hdiBhd2F5IGZyb20gaG9tZSBpcyBlbm91Z2ggdG8gY2xvc2UgbW9kYWxcbiAgICAgIH1cbiAgICAgIHRoaXMudmlzaXRlZEhvbWUgPSB0cnVlO1xuICAgIH1cblxuICBfc2V0RmVhdHVyZWRJbWFnZSgpIHtcbiAgICB0aGlzLmhlcm9JbWdPcHRpb25zID0gKEFQUF9DT05GSUcuZmVhdHVyZWRJbWFnZXMgfHwgW10pO1xuXG4gICAgLy8gaWYgY29sbGVjdGlvbiBkb2Vzbid0IGV4aXN0IGZvciBhIGZlYXR1cmVkIGltYWdlLCByZW1vdmUgaXQgZnJvbSB0aGUgbGlzdFxuICAgIHRoaXMuaGVyb0ltZ09wdGlvbnMgPSB0aGlzLmhlcm9JbWdPcHRpb25zLmZpbHRlcihpID0+IHtcbiAgICAgIHJldHVybiBBUFBfQ09ORklHLmNvbGxlY3Rpb25MYWJlbHNbaS5jb2xsZWN0aW9uTGlua107XG4gICAgfSk7XG5cbiAgICBsZXQgaSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICB0aGlzLmhlcm9JbWdPcHRpb25zLmxlbmd0aCk7XG4gICAgbGV0IHNyYyA9IHRoaXMuaGVyb0ltZ09wdGlvbnNbaV07XG5cbiAgICB0aGlzLmhlcm9VcmwgPSBzcmMuaW1hZ2VVcmw7XG4gICAgdGhpcy5oZXJvSXRlbUxhYmVsID0gc3JjLml0ZW1OYW1lO1xuICAgIHRoaXMuaGVyb0l0ZW1VcmwgPSBzcmMuaXRlbUxpbms7XG4gICAgdGhpcy5oZXJvQ29sbGVjdGlvbkxhYmVsID0gc3JjLmNvbGxlY3Rpb25OYW1lO1xuICAgIHRoaXMuaGVyb0NvbGxlY3Rpb25VcmwgPSBzcmMuY29sbGVjdGlvbkxpbms7XG5cbiAgICBpZiggdGhpcy5oZXJvSXRlbUxhYmVsLmxlbmd0aCA+IDc1ICkgdGhpcy5oZXJvSXRlbUxhYmVsID0gdGhpcy5oZXJvSXRlbUxhYmVsLnN1YnN0cmluZygwLCA3NSkgKyAnLi4uJztcbiAgICBpZiggdGhpcy5oZXJvQ29sbGVjdGlvbkxhYmVsLmxlbmd0aCA+IDc1ICkgdGhpcy5oZXJvQ29sbGVjdGlvbkxhYmVsID0gdGhpcy5oZXJvQ29sbGVjdGlvbkxhYmVsLnN1YnN0cmluZygwLCA3NSkgKyAnLi4uJztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbkhlcm9DaGFuZ2VcbiAgICogQGRlc2NyaXB0aW9uIExpc3RlbmVyIGF0dGFjaGVkIHRvIDxkYW1zLWhlcm8+IGltYWdlIGNoYW5nZVxuICAgKiBAcGFyYW0ge0N1c3RvbUV2ZW50fSBlIFxuICAgKi9cbiAgX29uSGVyb0NoYW5nZShlKSB7XG4gICAgbGV0IGltYWdlVXJsID0gZS50YXJnZXQuX3NlbGVjdGVkU3JjO1xuICAgIGlmICggIWltYWdlVXJsICkgcmV0dXJuO1xuICAgIHRoaXMuaGVyb0ltZ0N1cnJlbnQgPSB0aGlzLmhlcm9JbWdPcHRpb25zLmZpbHRlcihpID0+IGkuaW1hZ2VVcmwgPT09IGltYWdlVXJsKVswXTtcbiAgfSAgXG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uSGVyb0NoYW5nZVxuICAgKiBAZGVzY3JpcHRpb24gTGlzdGVuZXIgYXR0YWNoZWQgdG8gPGRhbXMtaGVybz4gaW1hZ2UgY2hhbmdlXG4gICAqIEBwYXJhbSB7Q3VzdG9tRXZlbnR9IGUgXG4gICAqL1xuICAvLyBfb25XZWxjb21lTW9kYWxDbG9zZShlKSB7XG4gIC8vICAgdXRpbHMuc2V0Q29va2llKCd3ZWxjb21lX21vZGFsX2Rpc21pc3NlZCcsICd0cnVlJywgMzY1KVxuICAvLyAgIHRoaXMuc2hvd1dlbGNvbWVNb2RhbCA9IGZhbHNlO1xuICAvLyB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgX29uRWRpdENsaWNrZWRcbiAgICogQGRlc2NyaXB0aW9uIGFkbWluIHVpLCBlZGl0IGJ1dHRvbiBjbGljayBldmVudFxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IGUgXG4gICAqL1xuICBfb25FZGl0Q2xpY2tlZChlKSB7XG4gICAgaWYoICF0aGlzLmlzVWlBZG1pbiApIHJldHVybjtcbiAgICB0aGlzLmVkaXRNb2RlID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblNhdmVDbGlja2VkXG4gICAqIEBkZXNjcmlwdGlvbiBhZG1pbiB1aSwgc2F2ZSBidXR0b24gY2xpY2sgZXZlbnRcbiAgICogXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlIFxuICAgKi9cbiAgYXN5bmMgX29uU2F2ZUNsaWNrZWQoZSkge1xuICAgIGlmKCAhdGhpcy5pc1VpQWRtaW4gKSByZXR1cm47XG4gICAgdGhpcy5lZGl0TW9kZSA9IGZhbHNlO1xuICAgIC8vIHNhdmUgdG8gZmNyZXBvIGNvbnRhaW5lclxuICAgIC8vICAgYWxzbyBob3cgdG8gaGFuZGxlIHZhbGlkYXRpb24gdGhhdCBhbGwgNiBmZWF0dXJlZCBpdGVtcyBhcmUgcG9wdWxhdGVkPyBvciBtb3JlIGxpa2UgaG93IHRvIGFsZXJ0IHVzZXJcbiAgICBsZXQgYWRtaW5QYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FkbWluLWZlYXR1cmVkLWNvbGxlY3Rpb25zJyk7XG4gICAgaWYoIGFkbWluUGFuZWwgKSB7XG4gICAgICBhZG1pblBhbmVsLl91cGRhdGVQYW5lbHNEYXRhKCk7XG4gICAgICB0aGlzLmRpc3BsYXlEYXRhID0gYWRtaW5QYW5lbC5wYW5lbHM7XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuRmNBcHBDb25maWdNb2RlbC5zYXZlRmVhdHVyZWRDb2xsZWN0aW9uQXBwRGF0YSh0aGlzLmRpc3BsYXlEYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbkNhbmNlbEVkaXRDbGlja2VkXG4gICAqIEBkZXNjcmlwdGlvbiBhZG1pbiB1aSwgY2FuY2VsIGVkaXRpbmcgYnV0dG9uIGNsaWNrIGV2ZW50XG4gICAqIFxuICAgKiBAcGFyYW0ge09iamVjdH0gZSBcbiAgICovXG4gIF9vbkNhbmNlbEVkaXRDbGlja2VkKGUpIHtcbiAgICBpZiggIXRoaXMuaXNVaUFkbWluICkgcmV0dXJuO1xuICAgIHRoaXMuZWRpdE1vZGUgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblNlYXJjaFxuICAgKiBAZGVzY3JpcHRpb24gY2FsbGVkIGZyb20gdGhlIHNlYXJjaCBib3ggYnV0dG9uIGlzIGNsaWNrZWQgb3JcbiAgICogdGhlIGVudGVyIGtleSBpcyBoaXQuICBzZXQgdGhlIHRleHQgZmlsdGVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlXG4gICAqL1xuICBfb25TZWFyY2goZSkge1xuICAgIC8vIGxldCBzZWFyY2hEb2MgPSB0aGlzLl9nZXRFbXB0eVNlYXJjaERvY3VtZW50KCk7XG4gICAgbGV0IHNlYXJjaERvYyA9IHRoaXMuUmVjb3JkTW9kZWwuZW1wdHlTZWFyY2hEb2N1bWVudCgpO1xuICAgIC8vIHRoaXMuX3NldFRleHRGaWx0ZXIoc2VhcmNoRG9jLCBlLmRldGFpbCk7XG4gICAgdGhpcy5SZWNvcmRNb2RlbC5zZXRUZXh0RmlsdGVyKHNlYXJjaERvYywgZS5kZXRhaWwpO1xuICAgIHRoaXMuUmVjb3JkTW9kZWwuc2V0U2VhcmNoTG9jYXRpb24oc2VhcmNoRG9jKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vbkNvbGxlY3Rpb25DbGlja2VkXG4gICAqIEBkZXNjcmlwdGlvbiBjYWxsZWQgd2hlbiBjb2xsZWN0aW9uIGltZyBvbiBob21lIHBhZ2UgaXMgY2xpY2tlZCBcbiAgICogQHBhcmFtIHtPYmplY3R9IGVcbiAgICovXG4gIF9vbkNvbGxlY3Rpb25DbGlja2VkKGUpIHtcbiAgICBpZiggZS50eXBlID09PSAna2V5dXAnICYmIGUud2hpY2ggIT09IDEzICkgcmV0dXJuO1xuICAgIGxldCBpZCA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgICB0aGlzLl9vbkNvbGxlY3Rpb25TZWxlY3RlZChpZCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBfb25Db2xsZWN0aW9uU2VsZWN0ZWRcbiAgICogQGRlc2NyaXB0aW9uIGZpbHRlciBiYXNlZCBvbiBhIGNvbGxlY3Rpb24gdXNpbmcgc2hvcnQgaWRzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICogXG4gICAqL1xuICBfb25Db2xsZWN0aW9uU2VsZWN0ZWQoaWQpIHtcbiAgICB0aGlzLl9zZXRXaW5kb3dMb2NhdGlvbihpZCk7XG4gIH1cbiAgXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYXBwLWhvbWUnLCBBcHBIb21lKTsiLCJpbXBvcnQgeyBodG1sIH0gZnJvbSBcImxpdFwiO1xuXG5pbXBvcnQgU2hhcmVkSHRtbCBmcm9tIFwiLi4vLi4vdXRpbHMvc2hhcmVkLWh0bWxcIjtcbmltcG9ydCB7IHNoYXJlZFN0eWxlcyB9IGZyb20gXCIuLi8uLi9zdHlsZXMvc2hhcmVkLXN0eWxlc1wiO1xuaW1wb3J0IHByaW9yaXR5TGlua3NDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvNF9jb21wb25lbnQvX3ByaW9yaXR5LWxpbmtzLmNzc1wiO1xuaW1wb3J0IGljb25zQ3NzIGZyb20gXCJAdWNkLWxpYi90aGVtZS1zYXNzLzRfY29tcG9uZW50L19pY29ucy5jc3NcIjtcbmltcG9ydCBjYXRlZ29yeUJyYW5kQ3NzIGZyb20gXCJAdWNkLWxpYi90aGVtZS1zYXNzLzRfY29tcG9uZW50L19jYXRlZ29yeS1icmFuZC5jc3NcIjtcbmltcG9ydCB2ZXJ0aWNhbExpbmtzQ3NzIGZyb20gXCJAdWNkLWxpYi90aGVtZS1zYXNzLzRfY29tcG9uZW50L192ZXJ0aWNhbC1saW5rLmNzc1wiO1xuaW1wb3J0IG1vYmlsZUJhckNzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy80X2NvbXBvbmVudC9fbW9iaWxlLWJhci5jc3NcIjtcbmltcG9ydCBuYXZUb2dnbGVDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvNF9jb21wb25lbnQvX25hdi10b2dnbGUuY3NzXCI7XG5pbXBvcnQgaGVhZGluZ3NDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvMl9iYXNlX2NsYXNzL19oZWFkaW5ncy5jc3NcIjtcbmltcG9ydCBsaW5rc0NzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy8xX2Jhc2VfaHRtbC9fbGlua3MuY3NzXCI7XG5pbXBvcnQgYnV0dG9uc0NzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy8yX2Jhc2VfY2xhc3MvX2J1dHRvbnMuY3NzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgcmV0dXJuIGh0bWxgXG48c3R5bGU+XG4gICR7c2hhcmVkU3R5bGVzfVxuICAke3ByaW9yaXR5TGlua3NDc3N9XG4gICR7aWNvbnNDc3N9XG4gICR7Y2F0ZWdvcnlCcmFuZENzc31cbiAgJHt2ZXJ0aWNhbExpbmtzQ3NzfVxuICAke21vYmlsZUJhckNzc31cbiAgJHtuYXZUb2dnbGVDc3N9XG4gICR7aGVhZGluZ3NDc3N9XG4gICR7bGlua3NDc3N9XG4gICR7YnV0dG9uc0Nzc31cblxuICA6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXN1cGVyLWxpZ2h0LWJhY2tncm91bmQtY29sb3IpO1xuICB9XG4gIGEge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgfVxuICBpbnB1dCB7XG4gICAgcGFkZGluZzogMTVweDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogOTAlO1xuICAgIGJvcmRlcjogMDtcbiAgfVxuXG4gIC5hYm91dC1saW5rLWljb24ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB6LWluZGV4OiA1O1xuICAgIHRvcDogMjVweDtcbiAgICByaWdodDogMjVweDtcbiAgfVxuXG4gIC5hYm91dC1saW5rLWljb24gPiBpcm9uLWljb24ge1xuICAgIGhlaWdodDogMzBweDtcbiAgICB3aWR0aDogMzBweDtcbiAgfVxuICAuY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiAyNXB4IDEwcHg7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gIH1cblxuICAuc2VhcmNoLWJveCB7XG4gICAgei1pbmRleDogNTtcbiAgICBjb2xvcjogdmFyKC0taW52ZXJzZS10ZXh0LWNvbG9yKTtcbiAgfVxuXG4gIC5zZWFyY2gtYm94IC5tYWluIHtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMzgsIDg1LCAuOCk7XG4gIH1cblxuICAuc2VhcmNoLWJveCAubWFpbiBoMSB7XG4gICAgbWFyZ2luOiA1cHggMDtcbiAgICBsaW5lLWhlaWdodDogMi4wcmVtO1xuICB9XG5cbiAgLnNlYXJjaC1ib3ggLmZvb3RlciB7XG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICBsaW5lLWhlaWdodDogMS4wcmVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNTEsIDgzLCAxMjEsIC44KTtcbiAgfVxuXG4gIC5zZWFyY2gtYm94IC5mb290ZXIgYSB7XG4gICAgY29sb3I6IHZhcigtLWRlZmF1bHQtc2Vjb25kYXJ5LWNvbG9yKTtcbiAgfVxuXG4gIC5mZWF0dXJlZC1jb2xsZWN0aW9ucyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS0yMCk7XG4gICAgcGFkZGluZzogdmFyKC0tc3BhY2luZy1tZCkgMDtcbiAgfVxuXG4gIC5mZWF0dXJlZC1jb2xsZWN0aW9ucyBoMSB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlKTtcbiAgfVxuXG4gIC5mZWF0dXJlZC1jb2xsZWN0aW9ucyAuY2FyZC1ncmlkIHtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICBwYWRkaW5nOiAyMHB4IDA7XG4gIH1cblxuICAuY2FyZC1ncmlkIHtcbiAgICBtYXgtd2lkdGg6IHZhcigtLW1heC13aWR0aCk7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCBtaW5tYXgoMCwgMWZyKSk7XG4gICAgZ3JpZC1nYXA6IHZhcigtLXNwYWNpbmctZGVmYXVsdCk7XG4gIH1cblxuXG4gIGlyb24taWNvbi5zZWFyY2gtaWNvbiB7XG4gICAgY29sb3I6IHZhcigtLWRlZmF1bHQtcHJpbWFyeS1jb2xvcik7XG4gIH1cblxuICBpcm9uLWljb24uaW5mbyB7XG4gICAgZmlsbDogd2hpdGU7XG4gIH1cblxuICAjc2FtcGxlIHtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgcmdiYSgxMTEsMjA3LDIzNSwwLjgpLCByZ2JhKDIsIDQwLCA4MSwgMC44KSAxMDAlKTtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgcGFkZGluZzoycmVtIDRyZW0gMCA0cmVtO1xuXG4gIH1cblxuICAjb3B0aW9ucyB7XG4gICAgaGVpZ2h0OiAxNTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO1xuICAgIHdpZHRoOiBhdXRvO1xuICAgIHBhZGRpbmc6IDJyZW0gNHJlbTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cblxuICAjb3B0aW9ue1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgfVxuXG4gICN0b3AtaGVhZGVye1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICAjc3VidGV4dHtcbiAgICBjb2xvcjp3aGl0ZTtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgfVxuICAuaGVyby1tYWluIC5zdWItc2VhcmNoIGE6aG92ZXIge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgfVxuICAjd2F0ZXJjb2xvcntcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O1xuICAgIGhlaWdodDogOHJlbTtcbiAgICBtYXJnaW4tbGVmdDowcHg7XG4gIH1cbiAgLmFib3V0e1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlLTQwKTtcbiAgfVxuXG4gIC5mZWF0dXJlZC1ncmlkLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDQwJSA2MCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgcGFkZGluZzogMTBweDtcbiAgfVxuICAuZmVhdHVyZWQtZ3JpZC1pdGVtIHtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgICB0ZXh0LWFsaWduOmxlZnQ7XG5cbiAgfVxuICAuYWJvdXQtZ3JpZC1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA1NSUgNDUlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gIH1cbiAgLmFib3V0LWdyaWQtaXRlbSB7XG4gICAgcGFkZGluZzogMjBweDtcbiAgICBmb250LXNpemU6IDMwcHg7XG5cbiAgfVxuICAuY29sbGVjdGlvbi1ncmlkLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMzJSAzMyUgMzMlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gIH1cbiAgLmNvbGxlY3Rpb24tZ3JpZC1pdGVtIHtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgfVxuICAuY29udGVudCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjpwaW5rO1xuICAgIG1hcmdpbjoyMHB4O1xuICAgIHdpZHRoOmZpeGVkO1xuICAgIHBhZGRpbmc6IDBweCA2MHB4O1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gIH1cblxuICAudmVydGljYWwtbGluay0tY2lyY2xlIC52ZXJ0aWNhbC1saW5rX19maWd1cmU6YWZ0ZXIge1xuICAgIG9wYWNpdHk6IDEgIWltcG9ydGFudDtcbiAgfVxuXG4gIC5hYm91dC1jb2xsZWN0aW9ucyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICAvKiBoZWlnaHQ6IDM1cmVtOyAqL1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtODApO1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgvaW1hZ2VzL3dhdGVyY29sb3JzL3dhdGVyY29sb3ItYmFja2dyb3VuZC11Y2QtYmx1ZS0yMG9wYWNpdHkucG5nKTtcbiAgICAvKiBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMnJlbSAwIDJyZW07ICovXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgYXV0bztcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgdG9wO1xuICAgIC8qIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7ICovXG4gIH1cblxuICAvKiBTVFlMRVMgQkVMT1cgQVJFIEFDVFVBTExZIFVTRUQuIE5FRUQgVE8gQVVESVQgQU5ZVEhJTkcgQUJPVkUgKi9cbiAgW2hpZGRlbl0ge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbiAgLmhlcm8tdG9wIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDRyZW07XG4gICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICBwYWRkaW5nOiAwIDUlO1xuICB9XG4gIC5oZXJvLXRvcC1sZWZ0IGltZyB7XG4gICAgaGVpZ2h0OiAzMnB4O1xuICAgIHdpZHRoOiAxODZweDtcbiAgfVxuXG4gIC5oZXJvLXRvcC1yaWdodCB7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmb250LXdlaWdodDogdmFyKC0tZnctZXh0cmFib2xkKTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgLyogdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgKi9cbiAgfVxuICAuaGVyby10b3AtcmlnaHQgYSB7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLXdoaXRlKTtcbiAgfVxuICAuaGVyby10b3AtcmlnaHQgYTpob3ZlciB7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLWRhbXMtc2Vjb25kYXJ5KTtcbiAgfVxuICAuaGVyby10b3AtcmlnaHQgLmRvdCB7XG4gICAgbWFyZ2luOiAwIDFyZW07XG4gICAgd2lkdGg6IDhweDtcbiAgICBoZWlnaHQ6IDhweDtcbiAgICBtaW4td2lkdGg6IDhweDtcbiAgICBtaW4taGVpZ2h0OiA4cHg7XG4gIH1cbiAgLmhlcm8tbWFpbiBoMSB7XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgfVxuICAuaGVyby1tYWluIC5zdWItaGVhZGluZyB7XG4gICAgZm9udC13ZWlnaHQ6IHZhcigtLWZ3LXApO1xuICAgIG1hcmdpbi1ib3R0b206IDNyZW07XG4gICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgfVxuICAvKiAuaGVyby1tYWluIC5zdWItaGVhZGluZyBhIHtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItZGFtcy1zZWNvbmRhcnkpO1xuICB9XG4gIC5oZXJvLW1haW4gLnN1Yi1oZWFkaW5nIGE6aG92ZXIsIC5oZXJvLW1haW4gLnN1Yi1oZWFkaW5nIGE6Zm9jdXMge1xuICAgIGNvbG9yOiB2YXIoLS1jb2xvci1hLWhvdmVyKTtcbiAgfSAqL1xuICAuaGVyby1tYWluIGFwcC1zZWFyY2gtYm94IHtcbiAgICBtYXgtd2lkdGg6IDQwMHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIH1cbiAgLmhlcm8tbWFpbiAuc3ViLXNlYXJjaCB7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLXdoaXRlKTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgZm9udC1zaXplOiAuODc1cmVtO1xuICAgIG1hcmdpbi1ib3R0b206IDJyZW07XG4gIH1cbiAgLmhlcm8tbWFpbiAuc3ViLXNlYXJjaCBhIHtcbiAgICBjb2xvcjogdmFyKC0tY29sb3Itd2hpdGUpO1xuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICB9XG5cbiAgLnByaW9yaXR5LWxpbmtzIHtcbiAgICBwYWRkaW5nLXRvcDogMnJlbTtcbiAgfVxuXG4gIC5wcmlvcml0eS1saW5rc19faXRlbSB7XG4gICAgcGFkZGluZy10b3A6IDA7XG4gIH1cblxuICAuYnJvd3NlLWJ1dHRvbnMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xuICAgIC8qIHBhZGRpbmctYm90dG9tOiA0cmVtOyAqL1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLXdoaXRlKTtcbiAgfVxuICAuYnJvd3NlLWJ1dHRvbnMgPiBkaXYge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgIHdpZHRoOiA3NSU7XG4gIH1cbiAgLmJyb3dzZS1idXR0b25zIGFwcC1pY29ucyB7XG4gICAgbWFyZ2luOiAwIDEwcHg7XG4gIH1cbiAgLmJyb3dzZS1idXR0b25zIC52ZXJ0aWNhbC1saW5rX190aXRsZSB7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUpO1xuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICB9XG4gIC5icm93c2UtYnV0dG9ucyAudmVydGljYWwtbGlua19fZmlndXJlOmJlZm9yZSxcbiAgLmJyb3dzZS1idXR0b25zIC52ZXJ0aWNhbC1saW5rX19maWd1cmU6YWZ0ZXIge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIH1cbiAgLmJyb3dzZS1idXR0b25zIC52ZXJ0aWNhbC1saW5rLS1jaXJjbGUgLnZlcnRpY2FsLWxpbmtfX2ZpZ3VyZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3Itd2hpdGUpO1xuICAgIG1hcmdpbi1ib3R0b206IDAuNzVyZW07XG4gIH1cblxuICAuYnJvd3NlLWJ1dHRvbnMgLnZlcnRpY2FsLWxpbmstLWNpcmNsZSAudmVydGljYWwtbGlua19fZmlndXJlOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1nb2xkKTtcbiAgfVxuICBAbWVkaWEgKG1heC13aWR0aDogMTA3MHB4KSB7XG4gICAgLmJyb3dzZS1idXR0b25zID4gZGl2IHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgfVxuXG4gIC5yZWNlbnR7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3Itd2hpdGUpO1xuICB9XG4gIC5yZWNlbnQgaDEge1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIG1hcmdpbi10b3A6IDA7XG4gIH1cbiAgLmZ3LWxpZ2h0IHtcbiAgICBmb250LXdlaWdodDogMjAwO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBtYXJnaW46IDAuNzVyZW0gMCAwLjI1cmVtO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgfVxuXG4gIC5jYXJkLXRyaW8ge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvO1xuICAgIGdyaWQtZ2FwOiB2YXIoLS1zcGFjaW5nLXNtKTtcbiAgfVxuICAuY2FyZC10cmlvIGRhbXMtY29sbGVjdGlvbi1jYXJkIHtcbiAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1zcGFjaW5nLWRlZmF1bHQpO1xuICB9XG4gIC5mZWF0dXJlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS0yMCk7XG4gICAgcGFkZGluZy10b3A6IDRyZW07XG4gIH1cbiAgLmZlYXR1cmVkIGgxIHtcbiAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1zcGFjaW5nLWRlZmF1bHQpO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICB9XG4gIC5mZWF0dXJlZCBkYW1zLXdhdGVyY29sb3Itb3ZlcmxheSB7XG4gICAgaGVpZ2h0OiAxMDBweDtcbiAgfVxuICBkYW1zLWhpZ2hsaWdodGVkLWNvbGxlY3Rpb24ge1xuICAgIG1hcmdpbjogNDBweCAwO1xuICB9XG4gIC5mZy1oZWFkZXIge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC1nYXA6IHZhcigtLXNwYWNpbmctZGVmYXVsdCk7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvO1xuICAgIC8qIG1hcmdpbi1ib3R0b206IHZhcigtLXNwYWNpbmctc20pOyAqL1xuICAgIC8qIG1hcmdpbi1ib3R0b206IDJyZW0gMDsgKi9cbiAgfVxuICAuZmctaGVhZGVyIGgzIHtcbiAgICBtYXJnaW46IDA7XG4gIH1cblxuICAuZmctaGVhZGVyLmNlbnRlcmVkIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogNjYlO1xuICAgIG1hcmdpbjogYXV0bztcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cbiAgLmZnLWhlYWRlci5jZW50ZXJlZCBoMyB7XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgfVxuXG4gIC5mZy1oZWFkZXIubGVmdC1hbGlnbmVkIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogNjYlO1xuICAgIG1hcmdpbjogYXV0bztcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICB9XG4gIC5mZy1oZWFkZXIubGVmdC1hbGlnbmVkIGgzIHtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIH1cbiAgLmZnLWhlYWRlci5sZWZ0LWFsaWduZWQgZGl2IHt9XG5cbiAgLmZnLWhlYWRlci5zcGxpdCB7fVxuICAuZmctaGVhZGVyLnNwbGl0IGgzIHt9XG4gIC5mZy1oZWFkZXIuc3BsaXQgZGl2IHt9XG5cbiAgLmZlYXR1cmVkLWNvbGxlY3Rpb25zLXB1YmxpYyB7XG4gICAgcGFkZGluZzogMCA1JTtcbiAgfVxuXG4gIC5mZWF0dXJlZC1jb2xsZWN0aW9ucy1wdWJsaWMgLmZlYXR1cmVkLW1vcmUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBtYXJnaW46IHZhcigtLXNwYWNpbmctZGVmYXVsdCkgMCAwO1xuICAgIHBhZGRpbmctYm90dG9tOiAzcmVtO1xuICB9XG4gIC5zcGxhdC1zdGFycyB7XG4gICAgd2lkdGg6IDlyZW07XG4gIH1cblxuICAuYWJvdXQtY29udGVudCAuYnRuLS1hbHQge1xuICAgIHBhZGRpbmctdG9wOiAwO1xuICAgIHBhZGRpbmctYm90dG9tOiAwO1xuICB9XG5cbiAgLyogLmZlYXR1cmVkLWdyb3VwIHtcbiAgICBwYWRkaW5nOiAxcmVtIDA7XG4gIH0gKi9cblxuICAuZmVhdHVyZWQtY29sbGVjdGlvbnMtcHVibGljID4gKiB7XG4gICAgcGFkZGluZzogMXJlbSAwO1xuICB9XG5cbiAgLmZlYXR1cmVkLWNvbGxlY3Rpb25zLXB1YmxpYyAudHdvLWZvdXIsXG4gIC5mZWF0dXJlZC1jb2xsZWN0aW9ucy1wdWJsaWMgLnRocmVlLWZpdmUge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvO1xuICAgIGdyaWQtZ2FwOiB2YXIoLS1zcGFjaW5nLXNtKTtcbiAgfVxuXG4gIC5mZWF0dXJlZC1jb2xsZWN0aW9ucy1wdWJsaWMgLnRocmVlLWZpdmUge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIG1pbm1heCgwLCAxZnIpKTtcbiAgfVxuXG4gIC5mZWF0dXJlZC1jb2xsZWN0aW9ucy1wdWJsaWMgLnR3by1mb3VyIHsgICAgXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgbWlubWF4KDAsIDFmcikpO1xuICAgIHdpZHRoOiA3NSU7XG4gIH1cblxuICBAbWVkaWEgKG1heC13aWR0aDogOTkycHgpIHtcbiAgICAuZmVhdHVyZWQtY29sbGVjdGlvbnMtcHVibGljIC50aHJlZS1maXZlIHtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIG1pbm1heCgwLCAxZnIpKTtcbiAgICB9XG5cbiAgICAuZmVhdHVyZWQtY29sbGVjdGlvbnMtcHVibGljIC50d28tZm91ciB7ICAgIFxuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgbWlubWF4KDAsIDFmcikpO1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuICB9XG5cbiAgQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gICAgLyogbW9iaWxlICovXG4gICAgLmZlYXR1cmVkLWdyb3VwIC5jYXJkLXRyaW8ge1xuICAgICAgbWFyZ2luLXJpZ2h0OiB2YXIoLS1zcGFjaW5nLXNtKTtcbiAgICAgIG1hcmdpbi1sZWZ0OiB2YXIoLS1zcGFjaW5nLXNtKTtcbiAgICB9XG4gICAgLmFib3V0LWNvbGxlY3Rpb25zIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgIH1cbiAgICAudHJlZS1pbGx1c3RyYXRpb24ge1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgcGFkZGluZy10b3A6IDJyZW07XG4gICAgfVxuICAgIC5hYm91dC1jb2xsZWN0aW9ucyAudHJlZS1pbGx1c3RyYXRpb24gaW1nIHtcbiAgICAgIGZsb2F0OiBub25lO1xuICAgICAgcGFkZGluZzogbm9uZTtcbiAgICB9ICAgIFxuICAgIC5mZy1oZWFkZXIuY2VudGVyZWQge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIG1hcmdpbjogaW5pdGlhbDtcbiAgICAgIHRleHQtYWxpZ246IGxlZnRcbiAgICB9XG5cbiAgICAuZmVhdHVyZWQtY29sbGVjdGlvbnMtcHVibGljIC50aHJlZS1maXZlIHtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEsIG1pbm1heCgwLCAxZnIpKTtcbiAgICB9XG5cbiAgICAuZmVhdHVyZWQtY29sbGVjdGlvbnMtcHVibGljIC50d28tZm91ciB7ICAgIFxuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgbWlubWF4KDAsIDFmcikpO1xuICAgIH1cbiAgfVxuICAuYWJvdXQtY29udGVudCB7XG4gICAgcGFkZGluZzogMCA1JSAycmVtIDUlO1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgLyogdGFibGV0ICovXG4gICAgLmNhcmQtdHJpbyB7XG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCBtaW5tYXgoMCwgMWZyKSk7XG4gICAgfVxuXG4gICAgLmNhcmQtdHJpby50aHJlZS10b3RhbCBkYW1zLWNvbGxlY3Rpb24tY2FyZDpudGgtY2hpbGQoMSkge1xuICAgICAgZ3JpZC1jb2x1bW46IDEgLyBzcGFuIDI7XG4gICAgfVxuXG4gICAgLmZnLWhlYWRlciB7XG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDM3JSA1NSU7XG4gICAgICBwYWRkaW5nOiAxcmVtIDA7XG4gICAgfVxuICAgIC5mZWF0dXJlZC1ncm91cCAuY2FyZC10cmlvIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgIH1cbiAgICAuZmctaGVhZGVyIGgzIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG4gIH1cblxuICBAbWVkaWEgKG1pbi13aWR0aDogOTkxcHgpIHtcbiAgICAvKiBkZXNrdG9wICovXG4gICAgLmNhcmQtdHJpbyB7XG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCBtaW5tYXgoMCwgMWZyKSk7XG4gICAgfVxuICAgIC5jYXJkLXRyaW8udGhyZWUtdG90YWwgZGFtcy1jb2xsZWN0aW9uLWNhcmQ6bnRoLWNoaWxkKDEpIHtcbiAgICAgIGdyaWQtY29sdW1uOiBhdXRvO1xuICAgIH1cbiAgfVxuXG4gIC5mZWF0dXJlZC1tb3JlIGEuYnRuLS1wcmltYXJ5IHtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gICAgcGFkZGluZy10b3A6IDA7XG4gICAgcGFkZGluZy1ib3R0b206IDA7XG4gIH1cblxuICAudHJlZS1pbGx1c3RyYXRpb24ge1xuICAgIC8qIHBhZGRpbmc6IDNyZW07ICovXG4gICAgbWFyZ2luOiBhdXRvO1xuICB9XG5cbiAgLnRyZWUtaWxsdXN0cmF0aW9uIGltZyB7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIHBhZGRpbmctcmlnaHQ6IDFyZW07XG4gIH1cblxuICAuYWJvdXQtY29udGVudCAuaGVhZGVyLWRvdHMge1xuICAgIG1hcmdpbjogMDtcbiAgICBhbGlnbi1pdGVtczogc3RhcnQ7XG4gICAgcGFkZGluZy1ib3R0b206IDFyZW07XG4gIH1cblxuICAuYWJvdXQtY29udGVudCBoMSB7XG4gICAgbWFyZ2luLWJvdHRvbTogLjNyZW07XG4gIH1cblxuICAuYWJvdXQtY29udGVudCB7XG4gICAgLyogcGFkZGluZy1yaWdodDogMnJlbTsgKi9cbiAgICBtYXJnaW46IGF1dG87XG4gIH1cblxuICAuYWJvdXQtY29udGVudCBoMSxcbiAgLmFib3V0LWNvbnRlbnQgcCB7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yLXdoaXRlKTtcbiAgfVxuXG4gIC5hYm91dC1jb250ZW50IC5idG4tLW1vcmUtYWJvdXQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLXdoaXRlKTtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS04MCk7XG4gIH1cblxuICAuYWJvdXQtY29udGVudCAuYnRuLS1tb3JlLWFib3V0OmhvdmVyIHtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZS04MCk7XG4gIH1cblxuICBkYW1zLWhlcm8ge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB6LWluZGV4OiAxMDAwO1xuICB9XG5cbiAgLmVkaXQtb3ZlcmxheSB7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICByaWdodDogMDtcbiAgICBib3R0b206IDA7XG4gICAgbGVmdDogMDtcbiAgICBvcGFjaXR5OiAuNTU7XG4gICAgei1pbmRleDogNDAwO1xuICB9XG5cbiAgLnJpZ2h0LXBhbmVsIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IDRyZW07XG4gICAgei1pbmRleDogNTAwO1xuICB9XG5cbiAgLmljb24td3JhcHBlciB7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIHdpZHRoOiA1MHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUtNzApO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgbWFyZ2luLWxlZnQ6IC4zcmVtO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gIC5pY29uLXdyYXBwZXIgdWNkbGliLWljb24ge1xuICAgIGZpbGw6IHdoaXRlO1xuICAgIHdpZHRoOiA1MCU7XG4gICAgaGVpZ2h0OiA1MCU7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIHBhZGRpbmctdG9wOiAwLjZyZW07XG4gICAgei1pbmRleDogNTAwO1xuICB9XG5cbiAgLmljb24td3JhcHBlci5lZGl0IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1ibHVlKTtcbiAgfVxuXG4gIC5pY29uLXdyYXBwZXI6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWFnZ2llLWJsdWUpO1xuICB9XG5cbiAgLmljb24td3JhcHBlci5lZGl0OmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1hZ2dpZS1nb2xkKTtcbiAgfVxuXG4gIC5pY29uLXdyYXBwZXIuZWRpdDpob3ZlciB1Y2RsaWItaWNvbiB7XG4gICAgZmlsbDogdmFyKC0tY29sb3ItYWdnaWUtYmx1ZSk7XG4gIH1cblxuICBhZG1pbi1mZWF0dXJlZC1jb2xsZWN0aW9ucyB7XG4gICAgcGFkZGluZzogNHJlbSA1JTtcbiAgfVxuXG4gIC5oZXJvLW1haW4uc2l0ZS1mcmFtZSxcbiAgLnJlY2VudC5zaXRlLWZyYW1lIHtcbiAgICB3aWR0aDogOTAlO1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDEwNjBweCkge1xuICAgIC5oZXJvLXRvcCB7XG4gICAgICBtYXJnaW4tdG9wOiA0MHB4O1xuICAgIH1cbiAgfVxuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAxNjAxcHgpIHtcbiAgICAuaGVyby10b3Age1xuICAgICAgbWFyZ2luLXRvcDogNDBweDtcbiAgICB9XG4gIH1cblxuICBAbWVkaWEgKG1pbi13aWR0aDogNTIwcHgpIHtcbiAgICB1Y2QtdGhlbWUtaGVhZGVyIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICB9XG5cbiAgQG1lZGlhIChtYXgtd2lkdGg6IDUxOXB4KSB7XG4gICAgLmhlcm8tdG9wIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICAgIHVjZC10aGVtZS1oZWFkZXIge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgdG9wOiAtMTlweDtcbiAgICB9XG4gICAgaDEge1xuICAgICAgZm9udC1zaXplOiAycmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICB9XG4gICAgLmhlcm8tbWFpbiAuc3ViLWhlYWRpbmcge1xuICAgICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgICBmb250LXdlaWdodDogMjAwO1xuICAgIH1cbiAgfVxuXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAgIGgxIHtcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgfVxuICAgIC5oZXJvLW1haW4gLnN1Yi1oZWFkaW5nIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDIwMDtcbiAgICB9XG4gIH1cblxuICAuaGVyby10b3AtcmlnaHQgYSB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB9XG5cbiAgYS5icm93c2UtY29sbGVjdGlvbnMge1xuICAgIGhlaWdodDogM3JlbTtcbiAgICBtaW4taGVpZ2h0OiAzcmVtO1xuICB9XG5cbjwvc3R5bGU+XG5cbjxkYW1zLWhlcm8gLnNyY09wdGlvbnM9XCIke3RoaXMuaGVyb0ltZ09wdGlvbnN9XCIgc2VsZWN0ZWQtc3JjLXVybD1cIiR7dGhpcy5oZXJvVXJsfVwiIEBzcmMtY2hhbmdlPVwiJHtcbiAgICB0aGlzLl9vbkhlcm9DaGFuZ2VcbiAgfVwiPlxuICA8ZGl2IGNsYXNzPVwiaGVyby1jb250ZW50XCI+XG5cbiAgICA8dWNkLXRoZW1lLWhlYWRlcj5cbiAgICAgIDx1Y2QtdGhlbWUtcHJpbWFyeS1uYXY+XG4gICAgICAgIDxhIGhyZWY9XCIvXCIgY2xhc3M9XCJob21lLWxpbmtcIiBtb2JpbGUtb25seT5Ib21lPC9hPlxuICAgICAgICA8dWwgbGluay10ZXh0PVwiQnJvd3NlXCIgaHJlZj1cIi9icm93c2VcIj5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIi9icm93c2UvY29sbGVjdGlvbnMvMTVcIj5Db2xsZWN0aW9uczwvYT48L2xpPlxuICAgICAgICAgIDxsaT48YSBocmVmPVwiL3NlYXJjaFwiPkl0ZW1zPC9hPjwvbGk+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIvYnJvd3NlL2NyZWF0b3IvMzBcIj5DcmVhdG9yczwvYT48L2xpPlxuICAgICAgICAgIDxsaT48YSBocmVmPVwiL2Jyb3dzZS9mb3JtYXQvMzBcIj5Gb3JtYXRzPC9hPjwvbGk+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIvYnJvd3NlL3N1YmplY3QvMzBcIj5TdWJqZWN0czwvYT48L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgICA8YSBocmVmPVwiL2Fib3V0XCI+QWJvdXQ8L2E+XG4gICAgICA8L3VjZC10aGVtZS1wcmltYXJ5LW5hdj5cbiAgICA8L3VjZC10aGVtZS1oZWFkZXI+XG5cbiAgICA8ZGl2IGNsYXNzPVwiaGVyby10b3Agc2l0ZS1mcmFtZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImhlcm8tdG9wLWxlZnRcIj48YSBocmVmPVwiaHR0cHM6Ly91Y2RhdmlzLmVkdVwiPjxpbWcgc3JjPVwiL2ltYWdlcy9sb2dvcy91Y2RhdmlzX2xvZ29fZ29sZC5wbmdcIj48L2E+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiaGVyby10b3AtcmlnaHRcIj5cbiAgICAgICAgPGEgaHJlZj1cIi9icm93c2VcIj5Ccm93c2U8L2E+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuICAgICAgICA8YSBocmVmPVwiL3NlYXJjaC10aXBzXCI+U2VhcmNoIFRpcHM8L2E+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuICAgICAgICA8YSBocmVmPVwiL2Fib3V0XCI+QWJvdXQ8L2E+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJoZXJvLW1haW4gc2l0ZS1mcmFtZVwiPlxuICAgICAgPGgxIGNsYXNzPVwiY29sb3ItbGlnaHRcIj5EaWdpdGFsIENvbGxlY3Rpb25zPC9oMT5cbiAgICAgIDxoNCBjbGFzcz1cInN1Yi1oZWFkaW5nIGg0IGNvbG9yLWxpZ2h0XCI+RXhwbG9yZSBkaWdpdGl6ZWQgaXRlbXMgZnJvbSB0aGUgPGEgaHJlZj1cImh0dHBzOi8vbGlicmFyeS51Y2RhdmlzLmVkdS9cIj5VQyBEYXZpcyBMaWJyYXJ5PC9hPiBjb2xsZWN0aW9ucy48L2g0PlxuICAgICAgPGFwcC1zZWFyY2gtYm94XG4gICAgICAgIGlkPVwic2VhcmNoQm94XCJcbiAgICAgICAgQHNlYXJjaD1cIiR7dGhpcy5fb25TZWFyY2h9XCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJzZWFyY2hcIj5cbiAgICAgICAgPGlyb24taWNvbiBpY29uPVwiZmluLWljb25zOnNlYXJjaFwiIGNsYXNzPVwic2VhcmNoLWljb25cIiBzbG90PVwiYnV0dG9uLWNvbnRlbnRcIj48L2lyb24taWNvbj5cbiAgICAgIDwvYXBwLXNlYXJjaC1ib3g+XG4gICAgICA8ZGl2IGNsYXNzPVwic3ViLXNlYXJjaFwiPlxuICAgICAgICBGZWF0dXJlZCBJbWFnZTogPGEgaHJlZj1cIiR7dGhpcy5oZXJvSXRlbVVybH1cIj4ke3RoaXMuaGVyb0l0ZW1MYWJlbH08L2E+IHwgPGEgaHJlZj1cIiR7dGhpcy5oZXJvQ29sbGVjdGlvblVybH1cIj4ke3RoaXMuaGVyb0NvbGxlY3Rpb25MYWJlbH08L2E+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbjwvZGFtcy1oZXJvPlxuXG48IS0tIDxhcHAtd2VsY29tZS1tb2RhbFxuICA/aGlkZGVuPVwiJHshdGhpcy5zaG93V2VsY29tZU1vZGFsfVwiXG4gIC50aXRsZT1cIiR7dGhpcy53ZWxjb21lTW9kYWxUaXRsZX1cIlxuICAuY29udGVudD1cIiR7dGhpcy53ZWxjb21lTW9kYWxDb250ZW50fVwiXG4gIEBvaz0ke3RoaXMuX29uV2VsY29tZU1vZGFsQ2xvc2V9PlxuPC9hcHAtd2VsY29tZS1tb2RhbD4gLS0+XG5cbjxkaXYgY2xhc3M9XCJlZGl0LW92ZXJsYXlcIiA/aGlkZGVuPVwiJHshdGhpcy5lZGl0TW9kZSB8fCAhdGhpcy5pc1VpQWRtaW59XCI+PC9kaXY+XG48c2VjdGlvbiBjbGFzcz1cImJyb3dzZS1idXR0b25zIHNpdGUtZnJhbWVcIj5cbiAgPGRpdiBjbGFzcz1cInByaW9yaXR5LWxpbmtzXCI+XG4gICAgPGRpdiBjbGFzcz1cInByaW9yaXR5LWxpbmtzX19pdGVtXCI+XG4gICAgICA8YSBjbGFzcz1cInZlcnRpY2FsLWxpbmsgdmVydGljYWwtbGluay0tY2lyY2xlIGNhdGVnb3J5LWJyYW5kLS1zZWNvbmRhcnlcIiBocmVmPVwiL2Jyb3dzZS9jb2xsZWN0aW9ucy8xNVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidmVydGljYWwtbGlua19fZmlndXJlXCI+XG4gICAgICAgICAgPHVjZGxpYi1pY29uIGNsYXNzPVwidmVydGljYWwtbGlua19faW1hZ2VcIiBpY29uPVwidWNkbGliLWRhbXM6ZmEtYm94LWFyY2hpdmVcIj48L3VjZGxpYi1pY29uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWxpbmtfX3RpdGxlXCI+Q29sbGVjdGlvbnM8L2Rpdj5cbiAgICAgIDwvYT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicHJpb3JpdHktbGlua3NfX2l0ZW1cIj5cbiAgICAgIDxhIGNsYXNzPVwidmVydGljYWwtbGluayB2ZXJ0aWNhbC1saW5rLS1jaXJjbGUgY2F0ZWdvcnktYnJhbmQtLXNlY29uZGFyeVwiIGhyZWY9XCIvc2VhcmNoXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rX19maWd1cmVcIj5cbiAgICAgICAgICA8dWNkbGliLWljb24gY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rX19pbWFnZVwiIGljb249XCJ1Y2RsaWItZGFtczpwaG90by1zdGFja1wiPjwvdWNkbGliLWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidmVydGljYWwtbGlua19fdGl0bGVcIj5BbGwgSXRlbXM8L2Rpdj5cbiAgICAgIDwvYT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicHJpb3JpdHktbGlua3NfX2l0ZW1cIj5cbiAgICAgIDxhIGNsYXNzPVwidmVydGljYWwtbGluayB2ZXJ0aWNhbC1saW5rLS1jaXJjbGUgY2F0ZWdvcnktYnJhbmQtLXNlY29uZGFyeVwiIGhyZWY9XCIvYnJvd3NlL2NyZWF0b3IvMzBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWxpbmtfX2ZpZ3VyZVwiPlxuICAgICAgICAgIDx1Y2RsaWItaWNvbiBjbGFzcz1cInZlcnRpY2FsLWxpbmtfX2ltYWdlXCIgaWNvbj1cInVjZGxpYi1kYW1zOmZhLXdhbmQtbWFnaWMtc3BhcmtsZXNcIj48L3VjZGxpYi1pY29uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWxpbmtfX3RpdGxlXCI+Q3JlYXRvcnM8L2Rpdj5cbiAgICAgIDwvYT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicHJpb3JpdHktbGlua3NfX2l0ZW1cIj5cbiAgICAgIDxhIGNsYXNzPVwidmVydGljYWwtbGluayB2ZXJ0aWNhbC1saW5rLS1jaXJjbGUgY2F0ZWdvcnktYnJhbmQtLXNlY29uZGFyeVwiIGhyZWY9XCIvYnJvd3NlL2Zvcm1hdC8zMFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidmVydGljYWwtbGlua19fZmlndXJlXCI+XG4gICAgICAgICAgPHVjZGxpYi1pY29uIGNsYXNzPVwidmVydGljYWwtbGlua19faW1hZ2VcIiBpY29uPVwidWNkbGliLWRhbXM6ZmEtcGhvdG8tZmlsbVwiPjwvdWNkbGliLWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidmVydGljYWwtbGlua19fdGl0bGVcIj5Gb3JtYXRzPC9kaXY+XG4gICAgICA8L2E+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInByaW9yaXR5LWxpbmtzX19pdGVtXCI+XG4gICAgICA8YSBjbGFzcz1cInZlcnRpY2FsLWxpbmsgdmVydGljYWwtbGluay0tY2lyY2xlIGNhdGVnb3J5LWJyYW5kLS1zZWNvbmRhcnlcIiBocmVmPVwiL2Jyb3dzZS9zdWJqZWN0LzMwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rX19maWd1cmVcIj5cbiAgICAgICAgICA8dWNkbGliLWljb24gY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rX19pbWFnZVwiIGljb249XCJ1Y2RsaWItZGFtczpmYS1zdGFyXCI+PC91Y2RsaWItaWNvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ2ZXJ0aWNhbC1saW5rX190aXRsZVwiPlN1YmplY3RzPC9kaXY+XG4gICAgICA8L2E+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG48L3NlY3Rpb24+XG5cbjxzZWN0aW9uIGNsYXNzPVwicmVjZW50IHNpdGUtZnJhbWVcIiA/aGlkZGVuPVwiJHtcbiAgICB0aGlzLnJlY2VudENvbGxlY3Rpb25zLmxlbmd0aCA9PT0gMFxuICB9XCI+XG4gIDxoMT5SZWNlbnRseSBBZGRlZDxicj48c3BhbiBjbGFzcz1cImZ3LWxpZ2h0XCI+Q29sbGVjdGlvbnM8L3NwYW4+PC9oMT5cbiAgJHtTaGFyZWRIdG1sLmhlYWRlckRvdHMoKX1cbiAgPGRpdiBjbGFzcz1cImNhcmQtdHJpbyAke1xuICAgIHRoaXMucmVjZW50Q29sbGVjdGlvbnMubGVuZ3RoID09PSAzID8gXCJ0aHJlZS10b3RhbFwiIDogXCJcIlxuICB9XCI+XG4gICR7dGhpcy5yZWNlbnRDb2xsZWN0aW9ucy5tYXAoXG4gICAgKGdyYXBoKSA9PlxuICAgICAgaHRtbGBcbiAgICAgICAgPGRhbXMtY29sbGVjdGlvbi1jYXJkXG4gICAgICAgICAgaW1nLXNyYz1cIiR7Z3JhcGgudmNEYXRhLmltYWdlcz8uWzBdIHx8ICcnfVwiXG4gICAgICAgICAgY2FyZC10aXRsZT1cIiR7Z3JhcGgudmNEYXRhLnRpdGxlIHx8ICcnfVwiXG4gICAgICAgICAgaXRlbS1jdD1cIiR7Z3JhcGgudmNEYXRhLmNvdW50ID8gZ3JhcGgudmNEYXRhLmNvdW50IDogMH1cIlxuICAgICAgICAgIGhyZWY9XCIke2dyYXBoLnZjRGF0YS5pZH1cIlxuICAgICAgICA+PC9kYW1zLWNvbGxlY3Rpb24tY2FyZD5cbiAgICAgIGBcbiAgKX1cbiAgPC9kaXY+XG48L3NlY3Rpb24+XG5cbjxzZWN0aW9uIGNsYXNzPVwiZmVhdHVyZWQgc2l0ZS1mcmFtZVwiPlxuICA8ZGl2IGNsYXNzPVwicmlnaHQtcGFuZWxcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaWNvbi13cmFwcGVyXCIgP2hpZGRlbj1cIiR7XG4gICAgICB0aGlzLmVkaXRNb2RlIHx8ICF0aGlzLmlzVWlBZG1pblxuICAgIH1cIiBAY2xpY2s9XCIke3RoaXMuX29uRWRpdENsaWNrZWR9XCI+XG4gICAgICA8dWNkbGliLWljb24gaWNvbj1cInVjZGxpYi1kYW1zOmZhLXBlblwiPjwvdWNkbGliLWljb24+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImljb24td3JhcHBlciBlZGl0XCIgP2hpZGRlbj1cIiR7XG4gICAgICAhdGhpcy5lZGl0TW9kZSB8fCAhdGhpcy5pc1VpQWRtaW5cbiAgICB9XCIgQGNsaWNrPVwiJHt0aGlzLl9vblNhdmVDbGlja2VkfVwiPlxuICAgICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS1mbG9wcHktZGlza1wiPjwvdWNkbGliLWljb24+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImljb24td3JhcHBlciBlZGl0XCIgP2hpZGRlbj1cIiR7XG4gICAgICAhdGhpcy5lZGl0TW9kZSB8fCAhdGhpcy5pc1VpQWRtaW5cbiAgICB9XCIgQGNsaWNrPVwiJHt0aGlzLl9vbkNhbmNlbEVkaXRDbGlja2VkfVwiPlxuICAgICAgPHVjZGxpYi1pY29uIGljb249XCJ1Y2RsaWItZGFtczpmYS14bWFya1wiPjwvdWNkbGliLWljb24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8aDE+RmVhdHVyZWQgPHNwYW4gY2xhc3M9XCJmdy1saWdodFwiPkNvbGxlY3Rpb25zPC9zcGFuPjwvaDE+XG4gIDxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjtcIj5cbiAgICA8aW1nIGNsYXNzPVwic3BsYXQtc3RhcnNcIiBzcmM9XCIvaW1hZ2VzL3dhdGVyY29sb3JzL3dhdGVyY29sb3Itc3BsYXQtaG9tZXBhZ2Utc3RhcnMucG5nXCI+XG4gIDwvZGl2PlxuXG4gIDxhZG1pbi1mZWF0dXJlZC1jb2xsZWN0aW9ucyA/aGlkZGVuPVwiJHtcbiAgICAhdGhpcy5lZGl0TW9kZSB8fCAhdGhpcy5pc1VpQWRtaW5cbiAgfVwiPjwvYWRtaW4tZmVhdHVyZWQtY29sbGVjdGlvbnM+XG4gIFxuICA8ZGl2IGNsYXNzPVwiZmVhdHVyZWQtY29sbGVjdGlvbnMtcHVibGljXCIgP2hpZGRlbj1cIiR7dGhpcy5lZGl0TW9kZX1cIj5cbiAgICAke3RoaXMuZGlzcGxheURhdGEubWFwKFxuICAgICAgKGRhdGEpID0+IGh0bWxgXG4gICAgICAgICR7ZGF0YS50eXBlID09PSBcInNpbmdsZVwiXG4gICAgICAgICAgPyBodG1sYFxuICAgICAgICAgICAgICA8ZGFtcy1oaWdobGlnaHRlZC1jb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbi1pZD1cIiR7ZGF0YS5jb2xsZWN0aW9uSWR9XCJcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uLWRlc2M9XCIke2RhdGEuZGVzY3JpcHRpb259XCJcbiAgICAgICAgICAgICAgICA/aW1hZ2UtcmlnaHQ9XCIke2RhdGEucGxhY2VtZW50ID09PSBcInJpZ2h0XCJ9XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8L2RhbXMtaGlnaGxpZ2h0ZWQtY29sbGVjdGlvbj5cbiAgICAgICAgICAgIGBcbiAgICAgICAgICA6IFwiXCJ9XG4gICAgICAgICR7ZGF0YS50eXBlID09PSBcInRleHRcIlxuICAgICAgICAgID8gaHRtbGBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZlYXR1cmVkLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZnLWhlYWRlciAke2RhdGEucGxhY2VtZW50fVwiPlxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwiaGVhZGluZy0tcHJpbWFyeVwiPiR7ZGF0YS5oZWFkaW5nfTwvaDM+XG4gICAgICAgICAgICAgICAgICA8dWNkbGliLW1kIGlkPVwibWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHVjZGxpYi1tZC1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgPC91Y2RsaWItbWQtY29udGVudD5cbiAgICAgICAgICAgICAgICAgIDwvdWNkbGliLW1kPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIGBcbiAgICAgICAgICA6IFwiXCJ9XG4gICAgICAgICR7ZGF0YS50eXBlID09PSBcImNhcmRzXCJcbiAgICAgICAgICA/IGh0bWxgXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzcz1cImNhcmQtdHJpbyAke2RhdGEuY29sbGVjdGlvbklkcy5sZW5ndGggPT09IDMgPyBcInRocmVlLXRvdGFsXCIgOiBcIlwifSAke1szLCA1XS5pbmNsdWRlcyhkYXRhLmNvbGxlY3Rpb25JZHMubGVuZ3RoKSA/IFwidGhyZWUtZml2ZVwiIDogXCJcIn0gJHtbMiwgNF0uaW5jbHVkZXMoZGF0YS5jb2xsZWN0aW9uSWRzLmxlbmd0aCkgPyBcInR3by1mb3VyXCIgOiBcIlwifVwiPlxuICAgICAgICAgICAgICAgICR7ZGF0YS5jb2xsZWN0aW9uSWRzLm1hcChcbiAgICAgICAgICAgICAgICAgIChjb2xsZWN0aW9uKSA9PiBodG1sYFxuICAgICAgICAgICAgICAgICAgICA8ZGFtcy1jb2xsZWN0aW9uLWNhcmRcbiAgICAgICAgICAgICAgICAgICAgICBkYXRhLWlkPVwiJHtjb2xsZWN0aW9uLnNlbGVjdGVkfVwiXG4gICAgICAgICAgICAgICAgICAgID48L2RhbXMtY29sbGVjdGlvbi1jYXJkPlxuICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYFxuICAgICAgICAgIDogXCJcIn1cbiAgICAgIGBcbiAgICApfVxuXG4gICAgPGRpdiBjbGFzcz1cImZlYXR1cmVkLW1vcmVcIj5cbiAgICAgIDxhIGhyZWY9XCIvYnJvd3NlL2NvbGxlY3Rpb25zXCIgY2xhc3M9XCJidG4gYnRuLS1wcmltYXJ5IGJ0bi0tbGcgYnJvd3NlLWNvbGxlY3Rpb25zXCI+QnJvd3NlIGFsbCBjb2xsZWN0aW9uczwvYT5cbiAgICA8L2Rpdj5cbiAgPC9zZWN0aW9uPlxuXG4gIDxzZWN0aW9uIGNsYXNzPVwiYWJvdXQtY29sbGVjdGlvbnNcIj5cbiAgICA8ZGl2IGNsYXNzPVwidHJlZS1pbGx1c3RyYXRpb25cIj5cbiAgICAgIDxpbWcgc3JjPVwiL2ltYWdlcy90cmVlLWJpa2UtaWxsdXN0cmF0aW9uLnBuZ1wiIHdpZHRoPVwiODAlXCIgLz5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYWJvdXQtY29udGVudFwiPlxuICAgICAgPGgxPkFib3V0PGJyPjxzcGFuIGNsYXNzPVwiZnctbGlnaHRcIj5EaWdpdGFsIENvbGxlY3Rpb25zPC9zcGFuPjwvaDE+XG4gICAgICAke1NoYXJlZEh0bWwuaGVhZGVyRG90cygpfVxuICAgICAgPHAgc3R5bGU9XCJwYWRkaW5nLWJvdHRvbTogMXJlbTtcIj5cbiAgICAgICAgVUMgRGF2aXMgRGlnaXRhbCBDb2xsZWN0aW9ucyBwcm92aWRlIG9ubGluZSBhY2Nlc3MgdG8gZGlnaXRpemVkIG9yIGJvcm4tZGlnaXRhbCBtYXRlcmlhbHMgXG4gICAgICAgIGZyb20gdGhlIFVDIERhdmlzIExpYnJhcnksIHdpdGggYSBwYXJ0aWN1bGFyIGZvY3VzIG9uIHRoZSByYXJlIGFuZCB1bmlxdWUgbWF0ZXJpYWxzIGluIFxuICAgICAgICBpdHMgQXJjaGl2ZXMgYW5kIFNwZWNpYWwgQ29sbGVjdGlvbnMuIFRoZXNlIGRvY3VtZW50cywgaW1hZ2VzLCBhdWRpbyBhbmQgdmlkZW8gZmlsZXMgXG4gICAgICAgIG9mZmVyIGEgcmljaCByZXNvdXJjZSBmb3IgZXhwbG9yYXRpb24gYnkgc2Nob2xhcnMgYW5kIHRoZSBwdWJsaWMgYWxpa2UuXG4gICAgICA8L3A+XG4gICAgICA8YSBocmVmPVwiL2Fib3V0XCIgY2xhc3M9XCJidG4tLW1vcmUtYWJvdXQgYnRuLS1hbHQgYnRuLS1yb3VuZFwiPk1vcmUgYWJvdXQgdGhpcyBwcm9qZWN0PC9hPlxuICAgIDwvZGl2PlxuICA8L3NlY3Rpb24+XG5gO1xufVxuIiwiaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2xpdCc7XG5cbi8qKlxuICogQGNsYXNzIFNoYXJlZEh0bWxcbiAqIEBkZXNjcmlwdGlvbiBMaXQgaHRtbCB0ZW1wbGF0ZSBzdHJpbmdzIHVzZWQgYWNyb3NzIHRoZSBzaXRlLlxuICogRGVzaWduZWQgdG8gYmUgdXNlZCB3aXRoIERBTVMgc2hhcmVkIHN0eWxlcywgc28gbWFrZSBzdXJlIHlvdSBpbXBvcnQgdGhvc2UgaW50byB5b3VyIGVsZW1lbnRcbiAqL1xuY2xhc3MgU2hhcmVkSHRtbCB7XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgaGVhZGVyRG90c1xuICAgKiBAZGVzY3JpcHRpb24gRGlzcGxheXMgdGhlIHllbGxvdyBkb3RzIGJlbmVhdGggYSBzZWN0aW9uIGhlYWRlclxuICAgKiBAcmV0dXJucyB7VGVtcGxhdGVSZXN1bHR9XG4gICAqL1xuICBoZWFkZXJEb3RzKCl7XG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWRvdHNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG90XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkb3RcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG90XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkb3RcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IFNoYXJlZEh0bWwoKTsiLCJjb25zdCBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcblxuLyoqXG4gKiBAY2xhc3MgVXNlclxuICogQGRlc2NyaXB0aW9uIHdyYXBwZXIgYXJvdW5kIEFQUF9DT05GSUcudXNlclxuICovXG5jbGFzcyBVc2VyIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRhdGEgPSBjb25maWcudXNlcjtcbiAgICBpZiggIXRoaXMuZGF0YS5yb2xlcyApIHRoaXMuZGF0YS5yb2xlcyA9IFtdO1xuICAgIHRoaXMuZWRpdFVpQWNjZXNzID0gWydhZG1pbicsICd1aS1hZG1pbiddO1xuICB9XG5cbiAgaXNMb2dnZWRJbigpIHtcbiAgICBpZiggdGhpcy5kYXRhLmxvZ2dlZEluID09PSB0cnVlICkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY2FuRWRpdFVpKCkge1xuICAgIGZvciggbGV0IHJvbGUgb2YgdGhpcy5lZGl0VWlBY2Nlc3MgKSB7XG4gICAgICBpZiggdGhpcy5oYXNSb2xlKHJvbGUpICkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGhhc1JvbGUocm9sZSkge1xuICAgIHJldHVybiB0aGlzLmRhdGEucm9sZXMuaW5jbHVkZXMocm9sZSk7XG4gIH1cbn1cblxubGV0IHVzZXIgPSBuZXcgVXNlcigpO1xuZXhwb3J0IGRlZmF1bHQgdXNlcjsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=