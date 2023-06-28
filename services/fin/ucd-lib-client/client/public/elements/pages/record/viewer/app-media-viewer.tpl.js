import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import listsCss from "@ucd-lib/theme-sass/2_base_class/_lists.css";
import indexCss from "@ucd-lib/theme-sass/2_base_class/_index.css";
import formsHtmlCss from "@ucd-lib/theme-sass/1_base_html/_forms.css";
import formsCss from "@ucd-lib/theme-sass/2_base_class/_forms.css";

export default function render() {
  return html`
    <style>
      ${listsCss} ${indexCss} ${formsHtmlCss} ${formsCss} :host {
        display: block;
        position: relative;
        box-sizing: border-box;
      }

      [hidden] {
        display: none !important;
      }

      .wrapper {
        /* display: flex; */
        /* flex-direction: column; */
        /* min-height:250px; */
      }

      #bagoffiles {
        text-align: center;
      }

      #bagoffiles iron-icon {
        width: 100%;
        height: 100%;
        max-width: 150px;
        max-height: 150px;
        color: var(--color-grey);
      }

      img {
        max-width: 100%;
      }

      app-bookreader-viewer.fullscreen {
        background-color: white;
        position: fixed;
        padding: 0px;
        margin: 0px;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 1000;
      }

      #br-search-input,
      #br-search-input:focus {
        border: none;
      }

      .overflow::-webkit-scrollbar {
        width: 10px;
      }
      .overflow::-webkit-scrollbar-track {
        background: var(--color-aggie-gold-70);
        /* border-left: 4px solid var(--color-aggie-gold-70);
        border-right: 4px solid var(--color-aggie-gold-70); */
      }
      .overflow[no-overflow]::-webkit-scrollbar-track {
        background: transparent;
        border: none;
      }
      .overflow::-webkit-scrollbar-thumb {
        border-radius: 6px;
        background: var(--color-aggie-gold);
      }

      /* basic support for FF. Chrome/Safari should support -webkit styles above */
      @supports (scrollbar-color: red blue) {
        * {
          scrollbar-color: var(--color-aggie-gold) var(--color-aggie-gold-70);
          scrollbar-width: thin;
        }
      }

      .search-result .searched-term {
        border: 2px solid var(--color-redbud);
        padding: 1px 4px;
        color: var(--color-redbud);
        font-weight: bold;
      }

      .search-side-panel.off-canvas--left {
        transform: translateX(-105%);
      }

      .search-side-panel {
        position: absolute;
        top: 1.8rem;
        width: 350px;
        height: 570px;
        background: var(--color-aggie-gold-40);
        z-index: 500;
        border-radius: 0 30px 30px 0;
        box-shadow: 0px 3px 6px #00000029;
        transition: all 0.3s;
      }

      .search-side-panel.fullscreen {
        position: fixed;
        top: 1rem;
        left: 0;
        width: 350px;
        background: var(--color-aggie-gold-40);
        z-index: 1000;
        border-radius: 0 30px 30px 0;
        height: calc(90vh - 100px);
        box-shadow: 0px 3px 6px #00000029;
        transition: all 0.3s;
      }

      .search-collapse-btn {
        width: 40px;
        height: 40px;
        display: inline-block;
        margin: auto;
        background-color: var(--color-aggie-blue-70);
        border-radius: 50%;
        float: right;
        cursor: pointer;
      }

      .search-collapse-btn ucdlib-icon {
        margin: auto;
        vertical-align: middle;
        text-align: center;
        fill: var(--color-aggie-gold-40);
        padding-top: 0.6rem;
      }

      .search-side-panel.fullscreen .search-content {
        overflow: auto;
        max-height: calc(90vh - 250px);
        overflow-y: scroll;
        padding: 1rem;
        padding-bottom: 0;
      }

      .search-side-panel .search-content {
        overflow: auto;
        max-height: 430px;
        overflow-y: scroll;
        padding: 1rem;
        padding-bottom: 0;
        background-color: var(--color-aggie-gold-40);
      }

      #br-search-input {
        width: 90%;
        margin: 0 0 1rem;
        font-weight: bold;
        font-size: 0.9rem;
        padding-left: 1rem;
        color: var(--color-aggie-blue-90);
      }

      .search-clear-btn {
        width: 50px;
        height: 50px;
        display: inline-block;
        margin: auto;
        border-radius: 50%;
        float: right;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0.4rem;
      }
      .search-clear-btn ucdlib-icon {
        margin: auto;
        vertical-align: middle;
        text-align: center;
        fill: var(--color-aggie-blue-90);
        padding-top: 0.6rem;
      }
    </style>

    <div class="wrapper" style="position: relative;">
      <app-image-viewer-lightbox id="lightbox"></app-image-viewer-lightbox>

      <ucdlib-pages
        selected="${this.mediaType}"
        attr-for-selected="id"
        selectedAttribute="visible">
        <!-- <app-360-image-viewer id="360"></app-360-image-viewer> -->
        <div id="bagoffiles">
          <iron-icon
            icon="fin-icons:various-outline-stacked"
            ?hidden="${this.bagOfFilesImage}">
          </iron-icon>
          <img
            src="${this.bagOfFilesImage}"
            ?hidden="${!this.bagOfFilesImage}"
          />
        </div>
        <app-image-viewer id="image"></app-image-viewer>
        <app-bookreader-viewer
          id="bookreader"
          .fullscreen="${this.brFullscreen}"
          .bookData="${this.bookData}"
          bookItemId="${this.bookItemId}"
          @br-page-change="${this._onBookViewPageChange}">
        </app-bookreader-viewer>
        <app-video-viewer id="video"></app-video-viewer>
        <app-audio-viewer id="audio"></app-audio-viewer>
      </ucdlib-pages>

      <div
        class="search-side-panel ${this.brFullscreen
          ? "fullscreen"
          : ""} ${!this.brSearchOpen ? "off-canvas--left" : ""}"
        ?hidden="${!this.isBookReader}"
      >
        <div>
          <div style="padding: 1rem;">
            <h2 style="color: var(--color-aggie-blue); display: inline;">
              Search Inside
            </h2>
            <div class="search-collapse-btn" @click="${this._onToggleBRSearch}">
              <ucdlib-icon
                icon="ucdlib-dams:fa-chevron-left"
                tabindex="0"
                icon="chevron-left"
                alt="Collapse search panel"
              >
              </ucdlib-icon>
            </div>
          </div>

          <div class="search-content overflow">
            <div style="position: relative">
              <input
                type="text"
                id="br-search-input"
                @change="${this._onBRSearch}"
              />

              <div class="search-clear-btn" @click="${this._onClearSearch}">
                <ucdlib-icon
                  icon="ucdlib-dams:fa-xmark"
                  tabindex="0"
                  icon="fa-xmark"
                  alt="Cancel search"
                >
                </ucdlib-icon>
              </div>
            </div>
            <div style="text-align: center;">
              <span style="font-size: .8rem; font-style: italic; "
                >${this.searchResultsCount}
                result${this.searchResultsCount === 1 ? "" : "s"}</span
              >
            </div>

            ${this.searchResults.map(
              (result, index) => html`
                <div
                  class="search-result"
                  style="margin: 0 0 2rem; cursor: pointer;"
                  data-match-index="${result.matchIndex}"
                  data-array-index="${index}"
                  @click="${this._onSearchResultClick}"
                >
                  <h4 style="margin-bottom: 0">
                    Page ${result.displayPageNumber.replace("n", "")}
                  </h4>
                  <p style="font-size: .9rem; margin-top: .3rem">
                    ${unsafeHTML(
                      result.text
                        .replace("{{{", '<span class="searched-term">')
                        .replace("}}}", "</span>")
                    )}
                  </p>
                </div>
              `
            )}
          </div>
        </div>
      </div>

      <app-media-viewer-nav
        .isBookReader="${this.isBookReader}"
        .hideZoom="${this.mediaType === "bookreader" ||
        this.mediaType === "video"}"
        .searchResults="${this.searchResults}"
        @zoom-in="${this._onZoomIn}"
        @br-bookview-toggle="${this._onToggleBookView}"
        @br-expand-view="${this._onExpandBookView}"
        @br-collapse-view="${this._onCollapseBookView}"
        @br-search-toggle="${this._onToggleBRSearch}"
        @br-zoom-in="${this._onBRZoomIn}"
        @br-zoom-out="${this._onBRZoomOut}"
        @br-change-search-result="${this._onChangeSearchResult}"
      >
      </app-media-viewer-nav>
    </div>
  `;
}
