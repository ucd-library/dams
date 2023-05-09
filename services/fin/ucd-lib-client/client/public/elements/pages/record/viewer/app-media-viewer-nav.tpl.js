import { html } from "lit";

import { sharedStyles } from "../../../styles/shared-styles";

export default function render() {
  return html`
    <style include="shared-styles">
      ${sharedStyles} :host {
        display: block;
      }

      :host([single-image]) {
        background-color: transparent;
        padding: 0 8px 8px 8px;
      }

      :host([single-image]) paper-icon-button,
      :host([single-image]) app-share-btn,
      :host app-share-btn,
      :host paper-icon-button {
        /* background-color: var(--default-primary-color); */
        color: var(--color-aggie-blue-80);
      }

      [hidden] {
        display: none !important;
      }

      input {
        padding: 15px;
        display: block;
        width: 90%;
        border: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 1rem;
        background: white;
        border: none;
        height: 61px;
        outline: none;
        font-size: 0.8rem;
        font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial,
          sans-serif;
        font-weight: 500;
      }

      .layout {
        display: flex;
        align-items: center;
        width: 60%;
        margin: auto;
        padding-bottom: 0.7rem;
        border-bottom: 6px dotted var(--color-aggie-gold);
      }

      .layout.lightbox {
        border-bottom: none;
        background-color: var(--color-aggie-blue-30);
        width: 100%;
        padding-bottom: 0;
        height: 5rem;
      }

      .layout.fullscreen {
        border-bottom: none;
        padding-top: 0.5rem;
        margin: 0;
      }

      #thumbnailInnerContainer {
        padding-top: 7px;
      }

      #thumbnails {
        overflow: hidden;
      }

      #thumbnails > div {
        white-space: nowrap;
        margin-left: 0;
        will-change: margin-left;
        transition: margin-left 250ms ease-out;
      }

      .thumbnail {
        margin: 0 5px 5px 6px;
        display: inline-block;
        width: 48px;
        height: 48px;
        cursor: pointer;
        color: white;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        border: 3px solid transparent;
      }

      .thumbnail:active {
        border: 1px solid var(--default-secondary-color);
      }

      .thumbnail:focus {
        outline: var(--default-outline);
      }

      .thumbnail[selected] {
        border: 3px solid var(--default-secondary-color);
      }

      ucdlib-icon {
        height: 50px;
        margin: auto;
        fill: var(--color-aggie-blue-80);
        cursor: pointer;
      }

      #navLeft,
      #navRight {
        width: 36px;
      }

      iron-icon {
        shape-rendering: geometricPrecision !important;
        width: 28px !important;
        height: 28px !important;
      }

      paper-icon-button {
        color: var(--default-secondary-color);
        min-width: 40px;
      }

      paper-icon-button:focus {
        border-radius: 0 !important;
      }

      paper-icon-button[disabled] {
        color: var(--gray-text);
        min-width: 40px;
      }

      paper-icon-button[invisible] {
        visibility: hidden;
      }

      .zoom-btns[pad] {
        margin-right: 30px;
      }

      #buttonWrapper {
        padding-right: 1rem;
        z-index: 1000;
      }

      #buttonWrapper div {
        background-color: var(--color-aggie-blue-80);
        border-radius: 50%;
        display: inline-block;
        width: 50px;
        height: 50px;
        margin-left: 0.4rem;
      }

      #buttonWrapper div:hover {
        background-color: var(--color-aggie-blue);
      }

      #buttonWrapper ucdlib-icon {
        fill: white;
        width: 25px;
      }

      /* #textSearchWrapper {
        position: absolute;
        bottom: 5rem;
        right: 0;
        background-color: var(--color-aggie-blue-30);
        width: 25rem;
        height: 4.5rem;
        display: flex;
        padding-right: 0.5rem;
      }

      #textSearchWrapper::before {
        position: absolute;
        left: -1rem;
        width: 1.8rem;
        height: 100%;
        background-color: var(--color-aggie-blue-30);
        content: "";
        transform: skewX(344deg);
      } */

      .search-container {
        margin-top: 0.7rem;
        margin-left: 1.2rem;
      }

      .search-container input {
        position: relative;
        z-index: 10;
        left: -0.8rem;
        width: 17rem;
      }

      /* #textSearchWrapper::after {
    width: 1rem;
    margin-left: 0.5rem;
    background-color: blue;
    content: "";
    transform: skewX(16deg);
  } */

      .search-pagination {
        display: flex;
        margin: auto;
      }

      #buttonWrapper div.text-search {
        background-color: var(--color-aggie-gold);
      }

      #buttonWrapper div.text-search ucdlib-icon {
        fill: var(--color-aggie-blue-80);
      }

      .page-n-n {
        font-size: 0.9rem;
        font-weight: bold;
        color: var(--color-aggie-blue-80);
      }

      ucdlib-icon.single-page-book {
        width: 6% !important;
        height: 50%;
        position: relative;
        top: 25%;
        left: 1%;
      }
    </style>

    <div
      class="layout ${this.isLightbox ? "lightbox" : ""} ${this.brFullscreen
        ? "fullscreen"
        : ""}"
    >
      <div id="navLeft" ?hidden="${this.singleImage}">
        <ucdlib-icon
          icon="ucdlib-dams:fa-chevron-left"
          tabindex="0"
          icon="chevron-left"
          alt="Page thumbnails left"
          ?disabled="${!this.showNavLeft}"
          ?hidden="${!this.showNavLeft}"
          @click="${this._pageLeft}"
        >
        </ucdlib-icon>
      </div>

      <div id="thumbnails" ?hidden="${this.singleImage || this.isBookReader}">
        <div id="thumbnailInnerContainer">
          ${this.thumbnails.map((item) =>
            item.selected
              ? html`
                  <button
                    class="thumbnail"
                    alt="Page #${item.position}"
                    title="${item.id}"
                    media-id="${item.id}"
                    ?disabled="${item.disabled}"
                    selected
                    style="background-image:url(${item.src})"
                    @click="${this._onThumbnailClicked}"
                  >
                    <iron-icon icon="fin-icons:${item.icon}"></iron-icon>
                  </button>
                `
              : html`
                  <button
                    class="thumbnail"
                    alt="Page #${item.position}"
                    title="${item.id}"
                    media-id="${item.id}"
                    ?disabled="${item.disabled}"
                    style="background-image:url(${item.src})"
                    @click="${this._onThumbnailClicked}"
                  >
                    <iron-icon icon="fin-icons:${item.icon}"></iron-icon>
                  </button>
                `
          )}
        </div>
      </div>

      <div id="navRight" ?hidden="${this.singleImage || this.isBookReader}">
        <ucdlib-icon
          icon="ucdlib-dams:fa-chevron-right"
          tabindex="0"
          icon="chevron-right"
          alt="Page thumbnails right"
          ?disabled="${!this.showNavRight}"
          ?hidden="${!this.showNavRight}"
          @click="${this._pageRight}"
        >
        </ucdlib-icon>
      </div>

      <div style="flex:1"></div>

      <!-- <div id="buttonWrapper" ?hidden="${this
        .breakControls}" style="white-space: nowrap">
    <paper-icon-button id="zoomOut1" noink tabindex="0" icon="zoom-out" ?hidden="${!this
        .isLightbox}" on-click="${this._onZoomOutClicked}"></paper-icon-button>
    <paper-icon-button noink icon="zoom-in" tabindex="0" ?hidden="${!this
        .isLightbox}" on-click="${this._onZoomInClicked}"></paper-icon-button>

    <app-share-btn id="shareBtn" role="button"></app-share-btn>

    <span ?hidden="${!this.showOpenLightbox}" class="zoom-btns" pad="${!this
        .showOpenLightbox}">
      <paper-icon-button noink icon="zoom-in" tabindex="0" ?hidden="${this
        .isLightbox}" on-click="${this._onZoomInClicked}"></paper-icon-button>
      <paper-icon-button noink icon="fin-icons:close" tabindex="0" ?hidden="${!this
        .isLightbox}" on-click="${this._onCloseClicked}"></paper-icon-button>
    </span>
  </div> -->
      <div
        id="buttonWrapper"
        style="white-space: nowrap"
        ?hidden="${this.isLightbox}"
      >
        <div @click="${this._onToggleBookView}" ?hidden="${!this.isBookReader}">
          <ucdlib-icon
            icon="ucdlib-dams:fa-book-open"
            ?hidden="${!this.brSinglePage}"
          ></ucdlib-icon>
          <ucdlib-icon
            icon="ucdlib-dams:page-single"
            ?hidden="${this.brSinglePage}"
            class="single-page-book"
          ></ucdlib-icon>
        </div>

        <div
          @click="${this._onBRZoomOutClicked}"
          ?hidden="${!this.brFullscreen}"
        >
          <ucdlib-icon icon="ucdlib-dams:fa-minus"></ucdlib-icon>
        </div>
        <div
          @click="${this._onBRZoomInClicked}"
          ?hidden="${!this.brFullscreen}"
        >
          <ucdlib-icon icon="ucdlib-dams:fa-plus"></ucdlib-icon>
        </div>

        <div
          @click="${this._onExpandBookView}"
          ?hidden="${!this.isBookReader || this.brFullscreen}"
        >
          <ucdlib-icon
            icon="ucdlib-dams:fa-up-right-and-down-left-from-center"
          ></ucdlib-icon>
        </div>
        <div
          @click="${this._onCollapseBookView}"
          ?hidden="${!this.isBookReader || !this.brFullscreen}"
        >
          <ucdlib-icon
            icon="ucdlib-dams:fa-down-left-and-up-right-to-center"
          ></ucdlib-icon>
        </div>

        <div
          @click="${this._onZoomInClicked}"
          ?hidden="${this.isBookReader || this.hideZoom}"
        >
          <ucdlib-icon
            icon="ucdlib-dams:fa-magnifying-glass-plus"
          ></ucdlib-icon>
        </div>
        <div ?hidden="${this.brFullscreen}">
          <app-share-btn></app-share-btn>
        </div>

        <!-- this is moved next to the bookreader slider in app-media-viewer -->
        <div class="br-search" ?hidden="${!this.brFullscreen}">
          <div class="zoom" @click="${this._onSearchToggled}">
            <ucdlib-icon icon="ucdlib-dams:fa-magnifying-glass"></ucdlib-icon>
          </div>
          <div class="search-pagination" ?hidden="${!this.brSearch}">
            <div
              id="search-prev"
              style="padding-left: .5rem; width: 40px;"
              @click="${this._prevSearchResult}"
            >
              <ucdlib-icon icon="ucdlib-dams:fa-caret-left"></ucdlib-icon>
            </div>

            <span
              class="search-results"
              style="position: relative;
                bottom: 1rem;
                font-size: .9rem;
                font-weight: bold;"
              >${this.selectedResult} / ${this.searchResults}</span
            >

            <div
              id="search-next"
              style="padding-right: .5rem; width: 40px;"
              @click="${this._nextSearchResult}"
            >
              <ucdlib-icon icon="ucdlib-dams:fa-caret-right"></ucdlib-icon>
            </div>
          </div>
        </div>

        <!-- this is moved inside .BRcontainer in app-media-viewer -->
        <!-- <div
          class="search-side-panel"
          style="
          position: absolute;
          top: 1rem;
          bottom: 7rem;
          left: 0;
          width: 350px;
          background: var(--color-aggie-gold-40);
          z-index: 1000;
          border-radius: 0 30px 30px 0;
          display: none;"
        >
          Search
        </div> -->
      </div>
      <!-- <div id="textSearchWrapper" ?hidden="${!this.searchingText}">
        <div class="search-container" style="flex:1">
          <input id="input" type="text" placeholder="search" />
        </div>
        <div class="search-pagination" style="flex:1">
          <div>
            <ucdlib-icon
              icon="ucdlib-dams:fa-chevron-left"
              @click="${this._onTextSearchPrev}"
            ></ucdlib-icon>
          </div>
          <div style="margin:auto">
            <span class="page-n-n">1 / 3</span>
          </div>
          <div>
            <ucdlib-icon
              icon="ucdlib-dams:fa-chevron-right"
              @click="${this._onTextSearchNext}"
            ></ucdlib-icon>
          </div>
        </div>
      </div> -->
      <div
        id="buttonWrapper"
        style="white-space: nowrap"
        ?hidden="${!this.isLightbox}"
      >
        <!-- functionality not built yet for text search of images -->
        <div
          class="${this.searchingText ? "text-search" : ""}"
          style="display: none;"
          @click="${this._onSearchClicked}"
        >
          <ucdlib-icon icon="ucdlib-dams:fa-magnifying-glass"></ucdlib-icon>
        </div>

        <div @click="${this._onZoomOutClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-minus"></ucdlib-icon>
        </div>
        <div @click="${this._onZoomInClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-plus"></ucdlib-icon>
        </div>
      </div>
    </div>
    <!-- <div ?hidden="${!this.breakControls}" style="text-align: right">
  <paper-icon-button id="zoomOut2" noink tabindex="0" icon="zoom-out" ?hidden="${!this
      .isLightbox}" on-click="${this._onZoomOutClicked}"></paper-icon-button>
  <paper-icon-button noink icon="zoom-in" tabindex="0" ?hidden="${!this
      .isLightbox}" on-click="${this._onZoomInClicked}"></paper-icon-button>

  <app-share-btn></app-share-btn>

  <span ?hidden="${!this.showOpenLightbox}" class="zoom-btns">
    <paper-icon-button noink icon="zoom-in" tabindex="0" ?hidden="${this
      .isLightbox}" on-click="${this._onZoomInClicked}"></paper-icon-button>
    <paper-icon-button noink icon="fin-icons:close" tabindex="0" ?hidden="${!this
      .isLightbox}" on-click="${this._onCloseClicked}"></paper-icon-button>
  </span>
</div> -->
  `;
}
