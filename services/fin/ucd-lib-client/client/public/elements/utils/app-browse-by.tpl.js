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
        border-bottom: 5px dotted var(--color-dams-secondary);
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
        padding: 2rem 10rem 0;
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

      .dotted-line-break {
        border-bottom: 5px dotted var(--color-dams-secondary);
        padding-top: 2rem;
        margin: 0 1rem;
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
        right: -12.5vw;
        top: 0;
      }

      .card-grid {
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-gap: var(--spacing-default);
        max-width: 93%;
      }

      .results-footer {
        margin: 0 auto;
        width: 65%;
        padding: 2rem 2rem 0;
      }

      /* .results-footer > * {
        margin: 0 3rem;
      } */

      @media (max-width: 1310px) {
        .results {
          padding: 2rem 2rem 0;
        }
        .side-image .left-image,
        .side-image .right-image {
          display: none;
        }
        .header,
        .results-footer {
          width: 65%;
        }
        h1 {
          margin: 0.5rem 0;
        }
      }
      @media (max-width: 844px) {
        .side-image {
          display: none;
        }
        .results {
          padding: 2rem 5rem 0;
        }
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
          margin: 0 1rem;
        }
        .results {
          padding: 2rem 1rem 0;
        }
        .results-footer {
          padding: 2rem 1rem 0;
        }
        /* .results-footer > * {
          margin: auto;
        } */
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
    </div>

    <div class="body">
      <div class="side-image ${this.isCollectionPage ? "no-flex" : ""}">
        <img
          class="left-image"
          ?hidden=${this.results.length < 12 || this.isCollectionPage}
          src="${this.leftImgUrl}"
        />
      </div>

      <div class="results">
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

        <div class="results-footer">
          <div class="dotted-line-break"></div>

          <ucd-theme-pagination
            current-page=${this.currentPage}
            max-pages=${this.totalPages}
            @page-change=${this._onPageClicked}
          >
          </ucd-theme-pagination>
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
  `;
}
