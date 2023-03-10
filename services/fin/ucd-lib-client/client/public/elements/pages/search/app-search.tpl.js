import { html } from 'lit';

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
      opacity: .7;
    }
  }

  #desktop-filter-panel {
    display: none;
  }

  @media( max-width: 1025px ) {
    app-filters-panel[wide] {
      width: 415px;
    }
  }

  @media( min-width: 975px ) {
    #desktop-filter-panel {
      display: block;
    }
    .search-container {
      display: flex;
    }
  }
</style>

<div class="search-container">
  <app-filters-panel id="desktop-filter-panel" ${this.wideFiltersPanel ? 'wide' : ''} on-selected-tab-changed="${this._onFiltersTabUpdate}"></app-filters-panel>
  <div class="search-content">
    <app-search-results-panel 
      id="resultsPanel" 
      on-toggle-drawer="${this._toggleDrawer}" 
      on-page-size-change="${this._onPageSizeChange}"
      on-page-change="${this._onPaginationChange}">
    </app-search-results-panel>
  </div>
</div>
`;}