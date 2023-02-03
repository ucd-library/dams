import { html } from 'lit';
import { sharedStyles } from "../styles/shared-styles";
import '@ucd-lib/theme-elements/brand/ucd-theme-pagination/ucd-theme-pagination.js'

export default function render() { 
return html`
<style>${sharedStyles}</style>
<style>
  :host {
    display: block;
    padding-bottom: 4rem;
  }

  .header {
    width: 50%;
    margin: auto;
    padding: 2rem 2rem 0;
    justify-content: center;
  }

  .header-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1.5rem;
    border-bottom: 5px dotted var(--color-dams-secondary);
    margin: 0 3rem;
  }

  h1 {
    margin: .5rem 1rem;
  }

  h1 .regular-wt {
    font-weight: var(--fw-regular);
  }

  a {
    text-decoration: none;
  }

  .radio-btn-container {
    margin-left: 15px;
  }

  .sort {
    display: flex;
    align-items: center;
  }

  .body {
    display: flex;
    position: relative;
    overflow-x: hidden;
  }

  .side-image {
    flex: 1;
  }

  .results {
    width: 100%;
    box-sizing: border-box;
    flex: 2;
    padding: 2rem 10rem 0;
  }

  .results > * {
    display: flex;
    box-sizing: border-box;
    width: 100%;
  }

  .results h5 {
    margin: 0;
  }

  .results > * > *:first-child {
    flex: 1;
  }

  .results h5,
  .results .list-item {
    padding: 0 1rem;
  }

  .list-item {
    margin-top: 1rem;
  }

  .list-key {
    font-weight: var(--fw-bold);
    color: var(--color-aggie-blue);
  }

  .dotted-line-break {
    border-bottom: 5px dotted var(--color-dams-secondary);
    padding-top: 2rem;
  }

  ucd-theme-pagination {
    justify-content: center;
  }

  @media (max-width: 1310px) {
    .results {
      padding: 2rem 2rem 0;
    }
    .side-image .left-image,
    .side-image .right-image {
      display: none;
    }
    .header {
      width: 65%;
    }
    h1 {
      margin: .5rem 0;
    }
  }
  @media (max-width: 844px) {
    .side-image {
      display: none;
    }
    .results {
      padding: 2rem 5rem 0;
    }
    .header {
      width: auto;
    }
  }

</style>

<div class="header">
  <div class="header-layout">
    <div><slot name="header-icon"></slot></div>
    <div>
      <h1>Browse <span>${this.label}s</span></h1>
    </div>

    <div class="sort">
      <div style="font-weight: var(--fw-bold)">Sort By:</div> 
      ${this.sortByOptions.map((item, index) => html`
        <div class="radio-btn-container">
          <input type="radio" 
            id="browse-by-${this.facetQueryName}-${item.label}"
            name="browse-by-${this.facetQueryName}" 
            index="${index}"
            .checked="${item.selected}"
            @change="${this._onSortChange}" />
          <label for="browse-by-${this.facetQueryName}-${item.label}">${item.label}</label> 
        </div>
      `)}
    </div>
  </div>
</div>

<div class="body">
  <div class="side-image">
    <slot name="left-image" ?hidden=${this.totalResults < 12}></slot>
  </div>
  <div class="results">
    <h5>
      <div>${this.label}</div>
      <div>Items</div>
    </h5>
    ${this.results.map(item => html`
      <div class="list-item">
        <div class="list-key"><a href="${this.getFilterUrl(item)}">${item.key}</a></div>
        <div class="list-count">${item.count}</div>
      </div>
    `)}

    <div class="dotted-line-break"></div>

    <ucd-theme-pagination
      current-page=${this.currentPage}
      max-pages=${this.totalPages}
      @page-change=${this._onPageClicked}>
    </ucd-theme-pagination>

  </div>
  <div class="side-image">
    <slot name="right-image" ?hidden=${this.totalResults < 12}></slot>
  </div>
</div>

`;}