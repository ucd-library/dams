import { html } from "lit";

export default function render() {
  return html`
    <style include="shared-styles">
      :host {
        display: block;
      }
      .search-container {
        background-color: var(--super-light-background-color);
        min-height: 60vh;
        display: block;
      }
      .search-content {
        flex: 1;
        padding-bottom: 35px;
        background-color: white;
      }

      app-filters-panel {
        width: 350px;
        transition: width 300ms linear;
      }
      app-filters-panel[wide] {
        width: 475px;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 0.7;
        }
      }

      /* #desktop-filter-panel {
        display: none;
      } */

      @media (max-width: 1025px) {
        app-filters-panel[wide] {
          width: 415px;
        }
      }

      /* @media (min-width: 975px) { */
      #desktop-filter-panel {
        display: block;
      }
      .search-container {
        display: flex;
      }
      /* } */

      @media (max-width: 767px) {
        /* mobile */
        app-filters-panel {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 1000;
          /* prevent scrolling? */
        }
      }

      @media (min-width: 768px) {
        /* tablet */
      }

      @media (min-width: 991px) {
        /* desktop */
      }
    </style>

    <div class="search-container">
      <div style="width: 350px; background-color: var(--color-aggie-blue-40);">
        <app-filters-panel
          id="desktop-filter-panel"
          ${this.wideFiltersPanel ? "wide" : ""}
          @selected-tab-changed="${this._onFiltersTabUpdate}"
        ></app-filters-panel>
      </div>
      <div class="search-content">
        <app-search-results-panel
          id="resultsPanel"
          @toggle-drawer="${this._toggleDrawer}"
          @page-size-change="${this._onPageSizeChange}"
          @page-change="${this._onPaginationChange}"
        >
        </app-search-results-panel>
      </div>
    </div>

    <app-search-results-collections
      id="collectionsPanel"
    ></app-search-results-collections>
  `;
}
