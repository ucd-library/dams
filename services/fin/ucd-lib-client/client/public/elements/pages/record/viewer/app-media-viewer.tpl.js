import { html } from "lit";
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

      iron-pages {
        /* flex: 1; */
        min-height: 250px;
        display: flex;
        justify-content: center;
        flex-direction: column;
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
    </style>

    <div class="wrapper">
      <app-image-viewer-lightbox id="lightbox"></app-image-viewer-lightbox>

      <iron-pages
        selected="${this.mediaType}"
        attr-for-selected="id"
        selected-attribute="visible"
      >
        <!-- <app-360-image-viewer id="360"></app-360-image-viewer> -->
        <div id="bagoffiles">
          <iron-icon
            icon="fin-icons:various-outline-stacked"
            ?hidden="${this.bagOfFilesImage}"
          ></iron-icon>
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
        ></app-bookreader-viewer>
        <app-video-viewer id="video"></app-video-viewer>
        <app-audio-viewer id="audio"></app-audio-viewer>
      </iron-pages>

      <div
        class="search-side-panel"
        style="
          position: fixed;
          top: 1rem;
          left: 0;
          width: 350px;
          background: var(--color-aggie-gold-40);
          z-index: 1000;
          border-radius: 0 30px 30px 0;
          height: calc(90vh - 100px);"
        ?hidden="${!this.brSearchOpen}"
      >
        <div class="search-content" style="padding: 1rem;">
          <h2 style="color: var(--color-aggie-blue); display: inline;">
            Search Inside
          </h2>
          <div
            style="width: 40px;
          height: 40px;
          display: inline-block;
          margin: auto;
          background-color: var(--color-aggie-blue-70);
          border-radius: 50%;
          float: right;
          cursor: pointer;"
            @click="${this._onToggleBRSearch}"
          >
            <ucdlib-icon
              icon="ucdlib-dams:fa-chevron-left"
              tabindex="0"
              icon="chevron-left"
              alt="Collapse search panel"
              style="margin: auto;
              vertical-align: middle;
              text-align: center;
              fill: var(--color-aggie-gold-40);
              padding-top: 0.6rem;"
            >
            </ucdlib-icon>
          </div>
          <div class="search-content">
            <input
              type="text"
              id="br-search-input"
              style="width: 90%; margin: 1rem 0;"
              @change="${this._onBRSearch}"
            />
            <span style="font-size: .8rem; font-style: italic; "
              >${this.searchResultsCount} results</span
            >

            ${this.searchResults.map(
              (result) => html`
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
          </div>
        </div>
      </div>

      <app-media-viewer-nav
        .isBookReader="${this.isBookReader}"
        .hideZoom="${this.mediaType === "bookreader" ||
        this.mediaType === "video"}"
        @zoom-in="${this._onZoomIn}"
        @br-bookview-toggle="${this._onToggleBookView}"
        @br-expand-view="${this._onExpandBookView}"
        @br-collapse-view="${this._onCollapseBookView}"
        @br-search-toggle="${this._onToggleBRSearch}"
        @br-zoom-in="${this._onBRZoomIn}"
        @br-zoom-out="${this._onBRZoomOut}"
      >
      </app-media-viewer-nav>
    </div>
  `;
}
