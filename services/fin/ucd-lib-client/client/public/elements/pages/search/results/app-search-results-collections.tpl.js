import { html } from 'lit';

import { sharedStyles } from '../../../styles/shared-styles';
import '@ucd-lib/theme-elements/brand/ucd-theme-pagination/ucd-theme-pagination.js'

export default function render() {
return html`
  <style>
    ${sharedStyles}

    :host {
      display: block;
      position: relative;
      background-color: var(--color-aggie-blue-80);
      background-image: url(/images/watercolors/watercolor-background-ucd-blue-20opacity.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    [hidden] { display: none !important; }

    h4 {
      color: var(--color-aggie-gold);
      font-weight: 700;
      margin: 0;
      padding: 3rem 3rem 0.5rem 4rem;
    }

    .card-grid {
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-gap: var(--spacing-default);
      max-width: 93%;
    }

    ucd-theme-pagination {
      display: flex;
      justify-content: center;
      box-sizing: border-box;
    }

  </style>

  <div class="collections" ?hidden="${!this.showResults}">
    <div>
      <h4>Collections Relevant to Your Search (${this.results.length})</h4>
      <div style="text-align:center" class="collections-content">
        <div class="card-grid">
          ${this.results.map(res => html`
            <dams-collection-card .darkBg="${true}" data-id="${res['@id']}" @click=${this._onCollectionClicked}></dams-collection-card>
          `)}
        </div>  
      </div>
    </div>
  </div>

  <ucd-theme-pagination
    current-page=${this.currentPage}
    max-pages=${this.paginationTotal}
    @page-change=${this._onPageClicked}>
  </ucd-theme-pagination>
`;}