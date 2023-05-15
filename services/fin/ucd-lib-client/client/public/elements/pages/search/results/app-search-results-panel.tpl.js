import { html } from "lit";

import "@ucd-lib/theme-elements/brand/ucd-theme-pagination/ucd-theme-pagination.js";

export default function render() {
  return html`
    <style include="shared-styles">
      :host {
        display: block;
        /* max-width: 1150px; */
        position: relative;
        margin: 0 5px;
      }

      [hidden] {
        display: none !important;
      }

      .header {
        font-size: var(--fs-sm);
        display: flex;
        align-items: center;
        margin-bottom: 11px;
        margin-top: 5px;
        padding: 1.5rem;
      }

      .header > * {
        flex: 1;
      }

      select {
        margin-left: 10px;
        border: 1px solid var(--light-background-color);
        border-radius: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        -o-appearance: none;
        appearance: none;
        -webkit-border-radius: 0px;
        padding: 5px 25px 5px 10px;
        background-position: right 10px center;
        background-size: 10px 10px;
        background-repeat: no-repeat;
        background-color: transparent;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCA2Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzAwMjg1NTt9PC9zdHlsZT48L2RlZnM+PGc+PHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjAgMCAxMCAwIDUgNiAwIDAiLz48L2c+PC9zdmc+");
        background-position-y: 13px;
      }
      /* for IE */
      select::-ms-expand {
        display: none;
      }

      ucd-theme-pagination {
        display: flex;
        justify-content: center;
        box-sizing: border-box;
      }

      h3 {
        /* border-top: 1px solid var(--light-background-color); */
        margin: 15px 0 0 0;
        padding: 15px 0 0 0;
        color: var(--default-primary-color);
      }

      .grid {
        margin: 10px;
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
      }

      .grid .item {
        /* visibility: hidden; */
      }

      .grid dams-item-card {
        flex: 30%;
        padding: 1rem;
        max-width: 383px;
      }

      .masonry {
        margin: 10px;
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
      }

      .list {
        margin: 10px;
      }

      .list .item {
        padding: 10px;
        margin-bottom: 15px;
        background-color: #daaa00;
        height: 250px;
      }

      .spacer {
        height: 20px;
        border-right: 1px solid var(--light-background-color);
      }

      .total {
        font-size: 0.9rem;
        padding-left: 10px;
        flex: 2;
      }

      .mobile-total {
        font-style: italic;
      }

      paper-spinner-lite {
        --paper-spinner-color: var(--default-secondary-color);
      }

      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 250px;
      }

      .error {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 250px;
        color: red;
      }

      #numPerPage {
        font-size: 0.9rem;
      }

      .drawer-toggle {
        font-size: var(--fs-sm);
        cursor: pointer;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        font-weight: var(--fw-bold);
        color: var(--default-primary-color);
        background-color: var(--light-background-color);
        border-radius: 0;
        border: 0;
        padding: 0;
      }
      .drawer-toggle > span {
        padding: 0 10px;
      }
      .drawer-toggle iron-icon {
        background-color: var(--default-secondary-color);
      }

      .drawer-toggle[disabled] {
        color: var(--light-background-color);
      }

      .collections {
        text-align: center;
      }

      .collections-content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
      }

      .collections-content dams-collection-card {
        flex: 33.33%;
        max-width: 383px;
      }

      ucdlib-icon {
        height: 40px;

        display: inline-block;
        position: relative;
        padding: 8px 0;

        outline: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
        z-index: 0;
        line-height: 1;
        width: 45px;
        height: 45px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
        box-sizing: border-box !important;
        justify-content: flex-end;
        fill: var(--color-aggie-blue-80);
      }

      .masonry {
        margin: 10px;
        position: relative;
      }

      .masonry .item {
        display: block;
        position: absolute;
        width: 30%;
        /* visibility: hidden; */
        top: 25px;
        left: 25px;
        will-change: top, left;
        transition: top 500ms ease-out, left 500ms ease-out;
      }

      .selected-layout {
        box-shadow: inset -2px 0 0 var(--color-aggie-gold),
          inset 0 -2px 0 var(--color-aggie-gold),
          inset 2px 0 0 var(--color-aggie-gold),
          inset 0 2px 0 var(--color-aggie-gold);
      }

      .header a {
        color: var(--color-aggie-blue-70);
        cursor: pointer;
      }

      .header .photo-stack ucdlib-icon {
        fill: var(--color-aggie-blue-60);
      }

      .header ucdlib-icon {
        padding: 5px;
      }

      @media (max-width: 545px) {
        .grid dams-item-card {
          flex: 100%;
          padding: 1rem;
          max-width: 85vw;
        }
      }

      @media (min-width: 975px) {
        .header {
          display: flex;
        }
        /* .mobile-header {
          display: none;
        } */
      }

      @media (max-width: 1182px) {
        .truncated-text {
          display: none;
        }
      }

      @media (max-width: 1130px) {
        /* TODO stack pagination ABOVE result count/link */
        .header {
          flex-direction: column-reverse;
          align-items: inherit;
        }

        .header-results {
          /* padding-top: 1rem; */
        }

        .header-pagination {
          padding-bottom: 1rem;
        }
        .header-pagination .filler {
          flex: 3;
        }
      }
    </style>

    <div class="header">
      <div class="header-results" style="flex: 2.25; display: flex;">
        <div style="flex: .25" class="photo-stack">
          <ucdlib-icon
            style="cursor: auto;"
            class="vertical-link__image"
            icon="ucdlib-dams:photo-stack"
          ></ucdlib-icon>
        </div>
        <div style="flex: 2; margin: auto;">
          <span style="font-weight: bold"
            >${this.total} item<span class="truncated-text"> result</span
            >s</span
          ><span ?hidden="${this.results.length === 0}">
            from
            <a href="" @click="${this._scrollToCollections}"
              >${this.totalCollections} collections</a
            ></span
          >
        </div>
      </div>

      <div
        class="header-pagination"
        style="flex: 3; display: flex; justify-content: end"
      >
        <span style="text-align: right; margin: auto 0; padding-right: .5rem"
          >Display:</span
        >
        <div>
          <ucdlib-icon
            icon="ucdlib-dams:result-display-grid"
            @click="${this._onLayoutToggle}"
            type="grid"
            class="grid-layout-icon selected-layout"
          ></ucdlib-icon>
        </div>
        <div>
          <ucdlib-icon
            icon="ucdlib-dams:result-display-mosaic"
            @click="${this._onLayoutToggle}"
            type="mosaic"
            class="mosaic-layout-icon"
          ></ucdlib-icon>
        </div>
        <div>
          <ucdlib-icon
            icon="ucdlib-dams:result-display-list"
            @click="${this._onLayoutToggle}"
            type="list"
            class="list-layout-icon"
          ></ucdlib-icon>
        </div>

        <div class="filler"></div>

        <select id="numPerPage" @change="${this._onPageSizeChange}">
          <option value="50">50</option>
          <option value="20">20</option>
          <option value="10" selected>10</option>
        </select>
        <div style="margin: 0 10px; font-size: .9rem; margin: auto 0 auto 1rem">
          items per page
        </div>
      </div>
    </div>

    <div ?hidden="${this.showError}">
      <div ?hidden="${this.showLoading}">
        <div class="grid" id="gridLayout" ?hidden="${!this.isGridLayout}">
          ${this.results.map(
            (res) => html`
              <dams-item-card
                .data="${res}"
                data-itemid="${res.id}"
                @click=${this._onRecordClicked}
              ></dams-item-card>
            `
          )}
        </div>

        <div class="masonry" id="layout" ?hidden="${!this.isMosaicLayout}">
          ${this.results.map(
            (res) => html`
              <app-search-grid-result
                .data="${res}"
                class="item"
                data-itemid="${res.id}"
                @click=${this._onRecordClicked}
                @rendered=${this._onGridItemRendered}
              ></app-search-grid-result>
            `
          )}
        </div>

        <div class="list" ?hidden="${!this.isListLayout}">
          ${this.results.map(
            (res) => html`
              <app-search-list-result
                .data="${res}"
                data-itemid="${res.id}"
                @click=${this._onRecordClicked}
              ></app-search-list-result>
            `
          )}
        </div>
      </div>
    </div>

    <div class="error" ?hidden="${!this.showError}">
      <div>${this.errorMsg}</div>
    </div>
    <div class="loading" ?hidden="${!this.showLoading}">
      <paper-spinner-lite ?active="${this.showLoading}"></paper-spinner-lite>
    </div>

    <ucd-theme-pagination
      current-page=${this.currentPage}
      max-pages=${this.paginationTotal}
      @page-change=${this._onPaginationChange}
    >
    </ucd-theme-pagination>

    <div
      ?hidden="${!this.totalOverMaxWindow}"
      style="text-align: center"
      class="limit-results"
    >
      Digital Collections limits results to 10,000. Use keywords and/or filters
      to refine search.
    </div>

    <!-- <div class="collections" ?hidden="${!this.showCollectionResults}">
  <div>
    <h3>Collections</h3>
    <div style="text-align:center" class="collections-content">
      ${this.collectionResults.map(
      (res) => html`
        <dams-collection-card
          .collection="${res}"
          data-collectionid="${res.collectionId}"
          @click=${this._onCollectionClicked}
        ></dams-collection-card>
      `
    )}
    </div>
  </div>
</div> -->
  `;
}
