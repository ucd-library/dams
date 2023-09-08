import { html } from "lit";
import { sharedStyles } from "../styles/shared-styles";
import "@ucd-lib/theme-elements/brand/ucd-theme-pagination/ucd-theme-pagination.js";

export default function render() {
  return html`
    <style>
      ${sharedStyles}
    </style>
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
        margin: 0 3rem;
      }

      h1 {
        margin: 0.5rem 1rem;
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

      [hidden] {
        display: none;
      }

      .side-image {
        flex: 1;
      }

      .side-image.no-flex {
        flex: 0;
      }

      .results {
        width: 100%;
        box-sizing: border-box;
        flex: 2;
        padding: 2rem;
        z-index: 10;
        border-bottom: 5px dotted var(--color-dams-secondary);
        border-top: 5px dotted var(--color-dams-secondary);
      }

      .results.collection {
        border-bottom: none;
        border-top: none;
      }

      .results > .table > * {
        display: flex;
        box-sizing: border-box;
        width: 100%;
      }

      .results h5 {
        margin: 0;
      }

      .results > .table > * > *:first-child {
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

      ucd-theme-pagination {
        justify-content: center;
        display: flex;
        box-sizing: border-box;
        width: 100%;
      }

      .left-image {
        width: 37.5vw;
        position: absolute;
        left: -12.5vw;
        bottom: 0;
      }

      .right-image {
        width: 37.5vw;
        position: absolute;
        right: -14.3vw;
        top: 0;
      }

      .card-grid {
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-gap: 2rem;
        max-width: 93%;
      }

      .results-footer {
        margin: 0 auto;
        width: 65%;
        padding: 2rem 2rem 0;
      }

      .header-dots,
      .footer-dots {
        display: none;
      }

      .header-dots.collection,
      .footer-dots.collection {
        display: block;
        border-bottom: 5px dotted var(--color-dams-secondary); 
        width: 650px;
        margin: 0 auto;
      }

      @media (max-width: 1310px) {
        .header,
        .results-footer {
          width: 65%;
        }
        h1 {
          margin: 0.5rem 0;
        }
      }
      @media (max-width: 767px) {
        .header,
        .results-footer {
          width: auto;
        }
      }
      @media (max-width: 990px) {
        /* tablet */
        .card-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        h1 {
          font-size: 2rem;
          font-weight: 600;
        }
        .header-dots.collection,
        .footer-dots.collection {
          width: 500px;
        }
      }

      @media (max-width: 767px) {
        /* mobile */
        .card-grid {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        .sort {
          flex-wrap: wrap;
          font-size: 0.9rem;
        }
        .sort > div:first-child {
          flex: 0 0 100%;
          text-align: center;
        }
        .header {
          padding: 2rem 1rem 0;
        }
        .header-layout {
          margin: auto;
          width: 60%;
        }
        .results-footer {
          padding: 2rem 1rem 0;
        }
        /* .results-footer > * {
          margin: auto;
        } */
        .header-dots.collection,
        .footer-dots.collection {
          width: 400px;
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
          ${this.sortByOptions.map(
            (item, index) => html`
              <div class="radio-btn-container">
                <input
                  type="radio"
                  id="browse-by-${this.facetQueryName}-${item.label}"
                  name="browse-by-${this.facetQueryName}"
                  index="${index}"
                  .checked="${item.selected}"
                  @change="${this._onSortChange}"
                />
                <label for="browse-by-${this.facetQueryName}-${item.label}"
                  >${item.label}</label
                >
              </div>
            `
          )}
        </div>
      </div>
      <div class="header-dots ${this.isCollectionPage ? 'collection' : ''}"></div>
    </div>

    <div class="body">
      <div class="side-image ${this.isCollectionPage ? "no-flex" : ""}">
        <img
          class="left-image"
          ?hidden=${this.results.length < 12 || this.isCollectionPage}
          src="${this.leftImgUrl}"
        />
      </div>

      <div class="results ${this.isCollectionPage ? 'collection' : ''}">
        <div class="table" ?hidden="${this.isCollectionPage}">
          <h5>
            <div>${this.label}</div>
            <div>Items</div>
          </h5>

          ${this.results.map(
            (item) => html`
              <div class="list-item">
                <div class="list-key">
                  <a href="${this.getFilterUrl(item)}">${item.key}</a>
                </div>
                <div class="list-count">${item.count}</div>
              </div>
            `
          )}
        </div>

        <div ?hidden="${this.label.toLowerCase() !== "collection"}">
          <div class="card-grid">
            ${this.collectionResults.map(
              (res) => html`
                <dams-collection-card
                  data-id="${this.isCollectionPage ? res.id : ""}"
                  @click=${this._onCollectionClicked}
                ></dams-collection-card>
              `
            )}
          </div>
        </div>
      </div>
      <div class="side-image ${this.isCollectionPage ? "no-flex" : ""}">
        <img
          class="right-image"
          ?hidden=${this.results.length < 12 || this.isCollectionPage}
          src="${this.rightImgUrl}"
        />
      </div>
    </div>

    <div class="results-footer">
      <div class="footer-dots ${this.isCollectionPage ? 'collection' : ''}"></div>
      <ucd-theme-pagination
        ?hidden="${this.totalPages < 2}"
        current-page=${this.currentPage}
        max-pages=${this.totalPages}
        @page-change=${this._onPageClicked}>
      </ucd-theme-pagination>
    </div>
  `;
}
