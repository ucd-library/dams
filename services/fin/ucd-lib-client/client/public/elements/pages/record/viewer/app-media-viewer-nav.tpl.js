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
        fill: var(--color-aggie-blue-80);
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
        /* flex-wrap: wrap; */
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
        width: auto;
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
        margin: auto;
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
        z-index: 500;
      }

      .lightbox #buttonWrapper {
        margin-right: 2rem;
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

      .br-search-non-fs div {
        display: inline-block;
      }

      .br-search-non-fs div.zoom {
        background-color: var(--color-aggie-blue-80);
        border-radius: 50%;
        display: inline-block;
        width: 50px;
        height: 50px;
        /* margin-left: 25px; */
        margin-top: 5px;
      }

      .br-search-non-fs div.zoom {
        cursor: pointer;
      }

      .br-search-non-fs ucdlib-icon {
        height: 50px;
        margin: auto;
        fill: white;
      }

      .br-search-non-fs #search-prev ucdlib-icon,
      .br-search-non-fs #search-next ucdlib-icon {
        fill: var(--ucdlib-icon-fill-color);
      }

      .br-search-non-fs div.zoom.searching {
        background-color: var(--color-aggie-gold);
      }

      .br-search-non-fs div.zoom.searching ucdlib-icon {
        fill: var(--color-aggie-blue);
      }

      @media (max-width: 767px) {
        /* mobile */
        #buttonWrapper div.zoom-controls {
          /* pinch to zoom */
          display: none;
        }



        /* this breaks something with bookreader, need to test again if below is uncommented */
        .layout {
          width: 90%;
          flex-wrap: wrap;
          justify-content: end;
        }
        .layout.lightbox {
          height: 150px;
        }

        #thumbnails {
          width: 80% !important;
        }
      }
    </style>

    <div
      class="layout ${this.isLightbox ? "lightbox" : ""} ${this.brFullscreen
        ? "fullscreen"
        : ""}">
      <div class="icon-nav" style="display: flex; max-width: 90vw;">
        <div id="navLeft">
          <ucdlib-icon
            icon="ucdlib-dams:fa-chevron-left"
            tabindex="0"
            icon="chevron-left"
            alt="Page thumbnails left"
            ?disabled="${!this.showNavLeft}"
            ?hidden="${!this.showNavLeft || this.singleImage || this.isBookReader}"
            @click="${this._pageLeft}">
          </ucdlib-icon>
          <div
            class="br-search-non-fs"
            style="min-width: 300px;"
            ?hidden="${this.brFullscreen || !this.isBookReader}">
            <div
              class="zoom ${this.searching ? "searching" : ""}"
              @click="${this._onSearchToggled}">
              <ucdlib-icon icon="ucdlib-dams:fa-magnifying-glass"></ucdlib-icon>
            </div>
            <div
              class="search-pagination"
              ?hidden="${this.searchResultsCount === 0}">

              <div id="search-prev"
                style="padding-left: .5rem; width: 40px;"
                @click="${this._prevSearchResult}">
                <ucdlib-icon icon="ucdlib-dams:fa-caret-left"></ucdlib-icon>
              </div>

              <span class="search-results"
                style="position: relative;
                  bottom: 1rem;
                  font-size: .9rem;
                  font-weight: bold;">
                ${this.selectedResult} / ${this.searchResultsCount}
              </span>

              <div
                id="search-next"
                style="padding-right: .5rem; width: 40px;"
                @click="${this._nextSearchResult}">
                <ucdlib-icon icon="ucdlib-dams:fa-caret-right"></ucdlib-icon>
              </div>
            </div>
          </div>
        </div>

        <div id="thumbnails" ?hidden="${this.singleImage || this.isBookReader || this.thumbnails.length < 2}">
          <div id="thumbnailInnerContainer">
            ${this.thumbnails.map((item) => html`
              <a
                class="thumbnail"
                href="${item.id}"
                alt="Page #${item.page}"
                ?selected="${item.selected}"
                title="${item.id}"
                media-id="${item.id}"
                ?disabled="${item.disabled}"
                style="background-image:url(${item.src})">
                <iron-icon icon="fin-icons:${item.icon}" ?hidden="${!item.icon}"></iron-icon>
              </a>
            `)}
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
      </div>

      <div style="flex:1"></div>
      <div class="break"></div>
      <div
        id="buttonWrapper"
        class="wrap"
        style="white-space: nowrap"
        ?hidden="${this.isLightbox}"
      >
        <div @click="${this._onToggleBookView}" class="page-toggle" ?hidden="${!this.isBookReader}">
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
          class="zoom-controls"
          @click="${this._onBRZoomOutClicked}"
          ?hidden="${!this.brFullscreen}"
        >
          <ucdlib-icon icon="ucdlib-dams:fa-minus"></ucdlib-icon>
        </div>
        <div
          class="zoom-controls"
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
            icon="ucdlib-dams:fa-up-right-and-down-left-from-center"
          ></ucdlib-icon>
        </div>
        <div ?hidden="${this.brFullscreen}">
          <app-share-btn></app-share-btn>
        </div>

        <!-- this is moved next to the bookreader slider in app-media-viewer in full screen -->
        <!-- <div class="br-search" style="display: none;">
          <div
            class="zoom ${this.searching ? "searching" : ""}"
            @click="${this._onSearchToggled}"
          >
            <ucdlib-icon icon="ucdlib-dams:fa-magnifying-glass" class="fullscreen-search"></ucdlib-icon>
          </div>
          <div
            class="search-pagination"
            ?hidden="${this.searchResultsCount === 0}"
          >
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
              >${this.selectedResult} / ${this.searchResultsCount}</span
            >

            <div
              id="search-next"
              style="padding-right: .5rem; width: 40px;"
              @click="${this._nextSearchResult}"
            >
              <ucdlib-icon icon="ucdlib-dams:fa-caret-right"></ucdlib-icon>
            </div>
          </div>
        </div> -->
      </div>

      <div
        id="buttonWrapper"
        style="white-space: nowrap"
        ?hidden="${!this.isLightbox}"
      >
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

        <div @click="${this._onCloseClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-down-left-and-up-right-to-center"></ucdlib-icon>
        </div>

      </div>
    </div>
  `;
}
