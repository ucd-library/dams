"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["page-about"],{

/***/ "./public/elements/pages/about/app-about.js":
/*!**************************************************!*\
  !*** ./public/elements/pages/about/app-about.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./public/node_modules/lit/index.js");
/* harmony import */ var _app_about_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-about.tpl.js */ "./public/elements/pages/about/app-about.tpl.js");
/* harmony import */ var _ucd_lib_theme_elements_utils_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ucd-lib/theme-elements/utils/mixins */ "./public/node_modules/@ucd-lib/theme-elements/utils/mixins/index.js");
/* harmony import */ var _ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ucd-lib/cork-app-utils */ "./public/node_modules/@ucd-lib/cork-app-utils/index.js");
/* harmony import */ var _components_search_box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/search-box */ "./public/elements/components/search-box.js");








class AppAbout extends (0,_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__.Mixin)(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement) 
  .with(_ucd_lib_cork_app_utils__WEBPACK_IMPORTED_MODULE_3__.LitCorkUtils, _ucd_lib_theme_elements_utils_mixins__WEBPACK_IMPORTED_MODULE_2__.MainDomElement) {

  static get properties() {
    return {
    
    };
  }

  constructor() {
    super();
    this.render = _app_about_tpl_js__WEBPACK_IMPORTED_MODULE_1__["default"].bind(this);
    this.active = true;
    this._injectModel('AppStateModel', 'CollectionModel', 'RecordModel');
  }

  /**
   * @method _onSearch
   * @description called from the search box button is clicked or
   * the enter key is hit.  set the text filter
   * @param {Object} e
   */
   _onSearch(e) {
    let searchDoc = this.RecordModel.emptySearchDocument();
    this.RecordModel.setTextFilter(searchDoc, e.detail);
    this.RecordModel.setSearchLocation(searchDoc);
  }
  
}

customElements.define('app-about', AppAbout);

/***/ }),

/***/ "./public/elements/pages/about/app-about.tpl.js":
/*!******************************************************!*\
  !*** ./public/elements/pages/about/app-about.tpl.js ***!
  \******************************************************/
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
/* harmony import */ var _ucd_lib_theme_sass_2_base_class_lists_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ucd-lib/theme-sass/2_base_class/_lists.css */ "./public/node_modules/@ucd-lib/theme-sass/2_base_class/_lists.css.js");















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
      ${_ucd_lib_theme_sass_2_base_class_lists_css__WEBPACK_IMPORTED_MODULE_12__["default"]}
      :host {
        display: block;
        position: relative;
        background-color: var(--super-light-background-color);
      }

      .text-container {
        margin: 0;
        padding: 0 10px 50px 10px;
      }

      h1, h4 {
        color: var(--default-primary-color);
      }

      h4 {
        margin: 15px 0 0 0px;
      }

      .yellow-line {
        margin: 0 auto 0 0;
        text-align: left;
        width: 50px;
        height: 4px;

        border-color: var(--default-secondary-color);
        background-color: var(--default-secondary-color);
      }

      .fw-light {
        font-weight: 200;
        font-style: normal;
        margin: 0.75rem 0 0.25rem;
        padding: 0;
        line-height: 1.2;
      }

      app-about .title-section {
        text-align: center;
        border-bottom: dotted 5px var(--default-secondary-color);
      }

      app-about .title-section h1 {
        margin-top: 0.5rem;
      }

      app-about .splat-icon-container {
        display: flex;
        justify-content: center;
        padding-top: 2rem;
      }

      app-about .splat-icon-container img {
        width: 6rem;
      }


    </style>
    <div class="splat-icon-container">
      <img
        class="header-icon"
        slot="header-icon"
        src="/images/watercolors/watercolor-splat-sunset-about.png"
      />
    </div>
    <div class="text-container">  
      <div class="title-section">
        <h1>About<br><span class="fw-light">Digital Collections</span></h1>
      </div>
      
      <p>
        UC Davis Digital Collections provide online access to digitized or born-digital materials from the UC Davis Library, 
        with a particular focus on the rare and unique materials in its Archives and Special Collections. 
        These documents, images, audio and video files offer a rich resource for exploration by scholars and the public alike.
      </p>
      
      <h4>How We Determine What to Share Online</h4>
      
      <p>      
        We consider materials based on criteria including the library's collecting strengths and priorities, rarity, 
        research value, demonstrated demand, support of areas of excellence for UC Davis, and the desire to elevate the 
        narratives, perspectives, and expertise of communities historically underrepresented in the scholarly record. 
      </p>

      <p>
        We acknowledge that some materials presented in our collections may reflect views that are considered outdated, 
        biased or offensive today. Although some of these materials may be difficult to encounter, we believe it is 
        important to document history without censorship, so that students and scholars can reflect on and learn from the past. 
        The library's stewardship and preservation of the breadth of the historical record does not imply support for any views expressed therein.
      </p>

      <h4>Contact</h4>
      <p>
        Please contact us with questions or to report potential errors. Regarding requests to remove materials published 
        in our digital collections, it is generally the policy of the UC Davis Library to provide access as broadly as possible 
        to the materials we hold, consistent with our legal and ethical obligations, and to remove materials only for 
        compelling legal or ethical reasons. Given our commitment to the integrity of the historical record, we are unable 
        to alter errors or inaccuracies in original materials. The ultimate authority to make decisions regarding takedown 
        requests lies with the University Librarian or their designee. All questions, corrections, or requests should be directed to:
      </p>      
      <div>
        <ul class="list--arrow" style="margin-top: 0;">
          <li><a href="mailto:digitalcollections@ucdavis.edu">digitalcollections@ucdavis.edu</a></li>
        </ul>
      </div>

      <h4>Platform</h4>
      <p>
        The UC Davis Digital Collections platform is actively developed by the UC Davis Library.  
        The platform runs using multiple web standards, including primarily the Fedora Linked Data Platform 
        server and Web Components for user interface design.
      </p>
      
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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1hYm91dC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXVDO0FBQ0M7QUFDNEI7O0FBRU47O0FBRXpCOztBQUVyQyx1QkFBdUIsOERBQUssQ0FBQywyQ0FBVTtBQUN2QyxRQUFRLGlFQUFZLEVBQUUsZ0ZBQWM7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQiw4REFBVztBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEMyQjs7QUFFc0I7QUFDUztBQUN5QjtBQUNqQjtBQUNpQjtBQUNEO0FBQ1A7QUFDQTtBQUNGO0FBQ1A7QUFDSztBQUNKOztBQUVwRDtBQUNmLFNBQVMscUNBQUk7QUFDYjtBQUNBLFFBQVEsK0RBQVk7QUFDcEIsUUFBUSwwRkFBZ0I7QUFDeEIsUUFBUSxpRkFBUTtBQUNoQixRQUFRLDBGQUFnQjtBQUN4QixRQUFRLHlGQUFnQjtBQUN4QixRQUFRLHNGQUFZO0FBQ3BCLFFBQVEsc0ZBQVk7QUFDcEIsUUFBUSxxRkFBVztBQUNuQixRQUFRLGtGQUFRO0FBQ2hCLFFBQVEscUZBQVU7QUFDbEIsUUFBUSxtRkFBUTtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMvSTJCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxXQUFXLHFDQUFJO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpRUFBZSxnQkFBZ0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvZWxlbWVudHMvcGFnZXMvYWJvdXQvYXBwLWFib3V0LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy9wYWdlcy9hYm91dC9hcHAtYWJvdXQudHBsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9lbGVtZW50cy91dGlscy9zaGFyZWQtaHRtbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXRFbGVtZW50LCBodG1sIH0gZnJvbSAnbGl0JztcbmltcG9ydCByZW5kZXIgZnJvbSBcIi4vYXBwLWFib3V0LnRwbC5qc1wiO1xuaW1wb3J0IHtNYWluRG9tRWxlbWVudH0gZnJvbSAnQHVjZC1saWIvdGhlbWUtZWxlbWVudHMvdXRpbHMvbWl4aW5zJztcblxuaW1wb3J0IHsgTWl4aW4sIExpdENvcmtVdGlscyB9IGZyb20gJ0B1Y2QtbGliL2NvcmstYXBwLXV0aWxzJztcblxuaW1wb3J0IFwiLi4vLi4vY29tcG9uZW50cy9zZWFyY2gtYm94XCI7XG5cbmNsYXNzIEFwcEFib3V0IGV4dGVuZHMgTWl4aW4oTGl0RWxlbWVudCkgXG4gIC53aXRoKExpdENvcmtVdGlscywgTWFpbkRvbUVsZW1lbnQpIHtcblxuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICBcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLl9pbmplY3RNb2RlbCgnQXBwU3RhdGVNb2RlbCcsICdDb2xsZWN0aW9uTW9kZWwnLCAnUmVjb3JkTW9kZWwnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIF9vblNlYXJjaFxuICAgKiBAZGVzY3JpcHRpb24gY2FsbGVkIGZyb20gdGhlIHNlYXJjaCBib3ggYnV0dG9uIGlzIGNsaWNrZWQgb3JcbiAgICogdGhlIGVudGVyIGtleSBpcyBoaXQuICBzZXQgdGhlIHRleHQgZmlsdGVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlXG4gICAqL1xuICAgX29uU2VhcmNoKGUpIHtcbiAgICBsZXQgc2VhcmNoRG9jID0gdGhpcy5SZWNvcmRNb2RlbC5lbXB0eVNlYXJjaERvY3VtZW50KCk7XG4gICAgdGhpcy5SZWNvcmRNb2RlbC5zZXRUZXh0RmlsdGVyKHNlYXJjaERvYywgZS5kZXRhaWwpO1xuICAgIHRoaXMuUmVjb3JkTW9kZWwuc2V0U2VhcmNoTG9jYXRpb24oc2VhcmNoRG9jKTtcbiAgfVxuICBcbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhcHAtYWJvdXQnLCBBcHBBYm91dCk7IiwiaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2xpdCc7XG5cbmltcG9ydCBTaGFyZWRIdG1sIGZyb20gJy4uLy4uL3V0aWxzL3NoYXJlZC1odG1sJztcbmltcG9ydCB7IHNoYXJlZFN0eWxlcyB9IGZyb20gXCIuLi8uLi9zdHlsZXMvc2hhcmVkLXN0eWxlc1wiO1xuaW1wb3J0IHByaW9yaXR5TGlua3NDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvNF9jb21wb25lbnQvX3ByaW9yaXR5LWxpbmtzLmNzc1wiO1xuaW1wb3J0IGljb25zQ3NzIGZyb20gXCJAdWNkLWxpYi90aGVtZS1zYXNzLzRfY29tcG9uZW50L19pY29ucy5jc3NcIjtcbmltcG9ydCBjYXRlZ29yeUJyYW5kQ3NzIGZyb20gXCJAdWNkLWxpYi90aGVtZS1zYXNzLzRfY29tcG9uZW50L19jYXRlZ29yeS1icmFuZC5jc3NcIjtcbmltcG9ydCB2ZXJ0aWNhbExpbmtzQ3NzIGZyb20gXCJAdWNkLWxpYi90aGVtZS1zYXNzLzRfY29tcG9uZW50L192ZXJ0aWNhbC1saW5rLmNzc1wiO1xuaW1wb3J0IG1vYmlsZUJhckNzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy80X2NvbXBvbmVudC9fbW9iaWxlLWJhci5jc3NcIjtcbmltcG9ydCBuYXZUb2dnbGVDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvNF9jb21wb25lbnQvX25hdi10b2dnbGUuY3NzXCI7XG5pbXBvcnQgaGVhZGluZ3NDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvMl9iYXNlX2NsYXNzL19oZWFkaW5ncy5jc3NcIjtcbmltcG9ydCBsaW5rc0NzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy8xX2Jhc2VfaHRtbC9fbGlua3MuY3NzXCI7XG5pbXBvcnQgYnV0dG9uc0NzcyBmcm9tIFwiQHVjZC1saWIvdGhlbWUtc2Fzcy8yX2Jhc2VfY2xhc3MvX2J1dHRvbnMuY3NzXCI7XG5pbXBvcnQgbGlzdHNDc3MgZnJvbSBcIkB1Y2QtbGliL3RoZW1lLXNhc3MvMl9iYXNlX2NsYXNzL19saXN0cy5jc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyKCkge1xuICByZXR1cm4gaHRtbGBcbiAgICA8c3R5bGU+XG4gICAgICAke3NoYXJlZFN0eWxlc31cbiAgICAgICR7cHJpb3JpdHlMaW5rc0Nzc31cbiAgICAgICR7aWNvbnNDc3N9XG4gICAgICAke2NhdGVnb3J5QnJhbmRDc3N9XG4gICAgICAke3ZlcnRpY2FsTGlua3NDc3N9XG4gICAgICAke21vYmlsZUJhckNzc31cbiAgICAgICR7bmF2VG9nZ2xlQ3NzfVxuICAgICAgJHtoZWFkaW5nc0Nzc31cbiAgICAgICR7bGlua3NDc3N9XG4gICAgICAke2J1dHRvbnNDc3N9XG4gICAgICAke2xpc3RzQ3NzfVxuICAgICAgOmhvc3Qge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zdXBlci1saWdodC1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgICAgIH1cblxuICAgICAgLnRleHQtY29udGFpbmVyIHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBwYWRkaW5nOiAwIDEwcHggNTBweCAxMHB4O1xuICAgICAgfVxuXG4gICAgICBoMSwgaDQge1xuICAgICAgICBjb2xvcjogdmFyKC0tZGVmYXVsdC1wcmltYXJ5LWNvbG9yKTtcbiAgICAgIH1cblxuICAgICAgaDQge1xuICAgICAgICBtYXJnaW46IDE1cHggMCAwIDBweDtcbiAgICAgIH1cblxuICAgICAgLnllbGxvdy1saW5lIHtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG8gMCAwO1xuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgaGVpZ2h0OiA0cHg7XG5cbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1kZWZhdWx0LXNlY29uZGFyeS1jb2xvcik7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRlZmF1bHQtc2Vjb25kYXJ5LWNvbG9yKTtcbiAgICAgIH1cblxuICAgICAgLmZ3LWxpZ2h0IHtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDIwMDtcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgICBtYXJnaW46IDAuNzVyZW0gMCAwLjI1cmVtO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBsaW5lLWhlaWdodDogMS4yO1xuICAgICAgfVxuXG4gICAgICBhcHAtYWJvdXQgLnRpdGxlLXNlY3Rpb24ge1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGJvcmRlci1ib3R0b206IGRvdHRlZCA1cHggdmFyKC0tZGVmYXVsdC1zZWNvbmRhcnktY29sb3IpO1xuICAgICAgfVxuXG4gICAgICBhcHAtYWJvdXQgLnRpdGxlLXNlY3Rpb24gaDEge1xuICAgICAgICBtYXJnaW4tdG9wOiAwLjVyZW07XG4gICAgICB9XG5cbiAgICAgIGFwcC1hYm91dCAuc3BsYXQtaWNvbi1jb250YWluZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgcGFkZGluZy10b3A6IDJyZW07XG4gICAgICB9XG5cbiAgICAgIGFwcC1hYm91dCAuc3BsYXQtaWNvbi1jb250YWluZXIgaW1nIHtcbiAgICAgICAgd2lkdGg6IDZyZW07XG4gICAgICB9XG5cblxuICAgIDwvc3R5bGU+XG4gICAgPGRpdiBjbGFzcz1cInNwbGF0LWljb24tY29udGFpbmVyXCI+XG4gICAgICA8aW1nXG4gICAgICAgIGNsYXNzPVwiaGVhZGVyLWljb25cIlxuICAgICAgICBzbG90PVwiaGVhZGVyLWljb25cIlxuICAgICAgICBzcmM9XCIvaW1hZ2VzL3dhdGVyY29sb3JzL3dhdGVyY29sb3Itc3BsYXQtc3Vuc2V0LWFib3V0LnBuZ1wiXG4gICAgICAvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNvbnRhaW5lclwiPiAgXG4gICAgICA8ZGl2IGNsYXNzPVwidGl0bGUtc2VjdGlvblwiPlxuICAgICAgICA8aDE+QWJvdXQ8YnI+PHNwYW4gY2xhc3M9XCJmdy1saWdodFwiPkRpZ2l0YWwgQ29sbGVjdGlvbnM8L3NwYW4+PC9oMT5cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgICA8cD5cbiAgICAgICAgVUMgRGF2aXMgRGlnaXRhbCBDb2xsZWN0aW9ucyBwcm92aWRlIG9ubGluZSBhY2Nlc3MgdG8gZGlnaXRpemVkIG9yIGJvcm4tZGlnaXRhbCBtYXRlcmlhbHMgZnJvbSB0aGUgVUMgRGF2aXMgTGlicmFyeSwgXG4gICAgICAgIHdpdGggYSBwYXJ0aWN1bGFyIGZvY3VzIG9uIHRoZSByYXJlIGFuZCB1bmlxdWUgbWF0ZXJpYWxzIGluIGl0cyBBcmNoaXZlcyBhbmQgU3BlY2lhbCBDb2xsZWN0aW9ucy4gXG4gICAgICAgIFRoZXNlIGRvY3VtZW50cywgaW1hZ2VzLCBhdWRpbyBhbmQgdmlkZW8gZmlsZXMgb2ZmZXIgYSByaWNoIHJlc291cmNlIGZvciBleHBsb3JhdGlvbiBieSBzY2hvbGFycyBhbmQgdGhlIHB1YmxpYyBhbGlrZS5cbiAgICAgIDwvcD5cbiAgICAgIFxuICAgICAgPGg0PkhvdyBXZSBEZXRlcm1pbmUgV2hhdCB0byBTaGFyZSBPbmxpbmU8L2g0PlxuICAgICAgXG4gICAgICA8cD4gICAgICBcbiAgICAgICAgV2UgY29uc2lkZXIgbWF0ZXJpYWxzIGJhc2VkIG9uIGNyaXRlcmlhIGluY2x1ZGluZyB0aGUgbGlicmFyeSdzIGNvbGxlY3Rpbmcgc3RyZW5ndGhzIGFuZCBwcmlvcml0aWVzLCByYXJpdHksIFxuICAgICAgICByZXNlYXJjaCB2YWx1ZSwgZGVtb25zdHJhdGVkIGRlbWFuZCwgc3VwcG9ydCBvZiBhcmVhcyBvZiBleGNlbGxlbmNlIGZvciBVQyBEYXZpcywgYW5kIHRoZSBkZXNpcmUgdG8gZWxldmF0ZSB0aGUgXG4gICAgICAgIG5hcnJhdGl2ZXMsIHBlcnNwZWN0aXZlcywgYW5kIGV4cGVydGlzZSBvZiBjb21tdW5pdGllcyBoaXN0b3JpY2FsbHkgdW5kZXJyZXByZXNlbnRlZCBpbiB0aGUgc2Nob2xhcmx5IHJlY29yZC4gXG4gICAgICA8L3A+XG5cbiAgICAgIDxwPlxuICAgICAgICBXZSBhY2tub3dsZWRnZSB0aGF0IHNvbWUgbWF0ZXJpYWxzIHByZXNlbnRlZCBpbiBvdXIgY29sbGVjdGlvbnMgbWF5IHJlZmxlY3Qgdmlld3MgdGhhdCBhcmUgY29uc2lkZXJlZCBvdXRkYXRlZCwgXG4gICAgICAgIGJpYXNlZCBvciBvZmZlbnNpdmUgdG9kYXkuIEFsdGhvdWdoIHNvbWUgb2YgdGhlc2UgbWF0ZXJpYWxzIG1heSBiZSBkaWZmaWN1bHQgdG8gZW5jb3VudGVyLCB3ZSBiZWxpZXZlIGl0IGlzIFxuICAgICAgICBpbXBvcnRhbnQgdG8gZG9jdW1lbnQgaGlzdG9yeSB3aXRob3V0IGNlbnNvcnNoaXAsIHNvIHRoYXQgc3R1ZGVudHMgYW5kIHNjaG9sYXJzIGNhbiByZWZsZWN0IG9uIGFuZCBsZWFybiBmcm9tIHRoZSBwYXN0LiBcbiAgICAgICAgVGhlIGxpYnJhcnkncyBzdGV3YXJkc2hpcCBhbmQgcHJlc2VydmF0aW9uIG9mIHRoZSBicmVhZHRoIG9mIHRoZSBoaXN0b3JpY2FsIHJlY29yZCBkb2VzIG5vdCBpbXBseSBzdXBwb3J0IGZvciBhbnkgdmlld3MgZXhwcmVzc2VkIHRoZXJlaW4uXG4gICAgICA8L3A+XG5cbiAgICAgIDxoND5Db250YWN0PC9oND5cbiAgICAgIDxwPlxuICAgICAgICBQbGVhc2UgY29udGFjdCB1cyB3aXRoIHF1ZXN0aW9ucyBvciB0byByZXBvcnQgcG90ZW50aWFsIGVycm9ycy4gUmVnYXJkaW5nIHJlcXVlc3RzIHRvIHJlbW92ZSBtYXRlcmlhbHMgcHVibGlzaGVkIFxuICAgICAgICBpbiBvdXIgZGlnaXRhbCBjb2xsZWN0aW9ucywgaXQgaXMgZ2VuZXJhbGx5IHRoZSBwb2xpY3kgb2YgdGhlIFVDIERhdmlzIExpYnJhcnkgdG8gcHJvdmlkZSBhY2Nlc3MgYXMgYnJvYWRseSBhcyBwb3NzaWJsZSBcbiAgICAgICAgdG8gdGhlIG1hdGVyaWFscyB3ZSBob2xkLCBjb25zaXN0ZW50IHdpdGggb3VyIGxlZ2FsIGFuZCBldGhpY2FsIG9ibGlnYXRpb25zLCBhbmQgdG8gcmVtb3ZlIG1hdGVyaWFscyBvbmx5IGZvciBcbiAgICAgICAgY29tcGVsbGluZyBsZWdhbCBvciBldGhpY2FsIHJlYXNvbnMuIEdpdmVuIG91ciBjb21taXRtZW50IHRvIHRoZSBpbnRlZ3JpdHkgb2YgdGhlIGhpc3RvcmljYWwgcmVjb3JkLCB3ZSBhcmUgdW5hYmxlIFxuICAgICAgICB0byBhbHRlciBlcnJvcnMgb3IgaW5hY2N1cmFjaWVzIGluIG9yaWdpbmFsIG1hdGVyaWFscy4gVGhlIHVsdGltYXRlIGF1dGhvcml0eSB0byBtYWtlIGRlY2lzaW9ucyByZWdhcmRpbmcgdGFrZWRvd24gXG4gICAgICAgIHJlcXVlc3RzIGxpZXMgd2l0aCB0aGUgVW5pdmVyc2l0eSBMaWJyYXJpYW4gb3IgdGhlaXIgZGVzaWduZWUuIEFsbCBxdWVzdGlvbnMsIGNvcnJlY3Rpb25zLCBvciByZXF1ZXN0cyBzaG91bGQgYmUgZGlyZWN0ZWQgdG86XG4gICAgICA8L3A+ICAgICAgXG4gICAgICA8ZGl2PlxuICAgICAgICA8dWwgY2xhc3M9XCJsaXN0LS1hcnJvd1wiIHN0eWxlPVwibWFyZ2luLXRvcDogMDtcIj5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIm1haWx0bzpkaWdpdGFsY29sbGVjdGlvbnNAdWNkYXZpcy5lZHVcIj5kaWdpdGFsY29sbGVjdGlvbnNAdWNkYXZpcy5lZHU8L2E+PC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8aDQ+UGxhdGZvcm08L2g0PlxuICAgICAgPHA+XG4gICAgICAgIFRoZSBVQyBEYXZpcyBEaWdpdGFsIENvbGxlY3Rpb25zIHBsYXRmb3JtIGlzIGFjdGl2ZWx5IGRldmVsb3BlZCBieSB0aGUgVUMgRGF2aXMgTGlicmFyeS4gIFxuICAgICAgICBUaGUgcGxhdGZvcm0gcnVucyB1c2luZyBtdWx0aXBsZSB3ZWIgc3RhbmRhcmRzLCBpbmNsdWRpbmcgcHJpbWFyaWx5IHRoZSBGZWRvcmEgTGlua2VkIERhdGEgUGxhdGZvcm0gXG4gICAgICAgIHNlcnZlciBhbmQgV2ViIENvbXBvbmVudHMgZm9yIHVzZXIgaW50ZXJmYWNlIGRlc2lnbi5cbiAgICAgIDwvcD5cbiAgICAgIFxuICAgIDwvZGl2PlxuYDt9IiwiaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2xpdCc7XG5cbi8qKlxuICogQGNsYXNzIFNoYXJlZEh0bWxcbiAqIEBkZXNjcmlwdGlvbiBMaXQgaHRtbCB0ZW1wbGF0ZSBzdHJpbmdzIHVzZWQgYWNyb3NzIHRoZSBzaXRlLlxuICogRGVzaWduZWQgdG8gYmUgdXNlZCB3aXRoIERBTVMgc2hhcmVkIHN0eWxlcywgc28gbWFrZSBzdXJlIHlvdSBpbXBvcnQgdGhvc2UgaW50byB5b3VyIGVsZW1lbnRcbiAqL1xuY2xhc3MgU2hhcmVkSHRtbCB7XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgaGVhZGVyRG90c1xuICAgKiBAZGVzY3JpcHRpb24gRGlzcGxheXMgdGhlIHllbGxvdyBkb3RzIGJlbmVhdGggYSBzZWN0aW9uIGhlYWRlclxuICAgKiBAcmV0dXJucyB7VGVtcGxhdGVSZXN1bHR9XG4gICAqL1xuICBoZWFkZXJEb3RzKCl7XG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWRvdHNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG90XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkb3RcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG90XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkb3RcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IFNoYXJlZEh0bWwoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=