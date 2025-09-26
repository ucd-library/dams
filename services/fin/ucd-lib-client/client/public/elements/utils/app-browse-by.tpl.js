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

      .left-image-container {
        position: absolute;
        left: -12.5vw;
        bottom: 0;
      }

      .left-image-container .creator-info-label img {
        transform: scaleX(-1);
      }

      .right-image-container {
        position: absolute;
        right: -12.5vw;
        top: 0;
      }

      .left-image-container img,
      .right-image-container img {
        width: 37.5vw;
      }

      div.creator-info-label {
        position: absolute;
        bottom: 0;
        right: 0;

        width: auto;
        z-index: 20;
        height: auto;
      }

      .creator-info-label {
        position: relative;
        display: inline-block;
      }

      /* hover transitions */
      /* bring back after fixing positions/sizing on different screen sizes */
      /* .left-image-container .creator-info-label {
        transform: translateX(-150%);
        transition: transform 0.3s ease-in-out;
      }

      .right-image-container .creator-info-label {
        transform: translateX(150%);
        transition: transform 0.3s ease-in-out;
      }

      .left-image-container:hover .creator-info-label,
      .right-image-container:hover .creator-info-label {
        transform: translateX(0);
      } */

      .right-image-container .creator-info-label {
        left: 0;
        right: auto;
      }

      .creator-info-label img {
        /* width: 16.875rem; */
        width: 15rem;
        height: 5.3125rem;
        /* display: block; */
        
        /* position: absolute;
        right: 0; */
      }

      .creator-info-label h5,
      .creator-info-label p {
        position: absolute;
        color: var(--white, #FFF);
        left: 50%;
        transform: translateX(-50%);
        margin: 0;
        width: 100%;
        text-align: center;
        z-index: 1;
      }

      .creator-info-label h5 {
        /* top: 1.8rem; */
        top: 1rem;
        /* font-size: 1.2rem; */
        font-size: 1rem;
        font-weight: 800;
        line-height: 2rem;
      }

      .creator-info-label p {
        top: 2.875rem;
        font-size: .875rem;
        line-height: 1.4rem;
      }

      /* TODO When screen gets too narrow, position label on the left */
      @media (max-width: 1200px) { /* Adjust this breakpoint as needed */
        div.creator-info-label {
          /* position: absolute;
          bottom: 0;
          left: 0;
          width: auto;
          height: auto; */
        }
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

        .side-image {
          display: none;
        }
        .body {
          width: 90%;
          margin: auto;
        }
        .results {
          padding: 2rem 0;
        }
        .results h5, .results .list-item {
          padding: 0;
        }
        .table-heading {
          font-size: 1.2rem;
        }
      }

      @media (max-width: 500px) {
        .header-layout {
          width: 90%;
        }
      }

      .left-image,
      .right-image {
        clip-path: inset(0 0 5px 0);
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
        <div class="left-image-container">
          <a href="/item/ark:/87293/d3d02x">
            <img
              class="left-image"
              ?hidden=${this.results.length < 12 || this.isCollectionPage}
              src="${this.leftImgUrl}"
            />
            <div class="creator-info-label">
              <img src="/images/watercolors/Label-Watercolor-Blue.png" alt="label background"/>
              <h5>Hari Singh Everest</h5>
              <p>ark:/99999/fk4/abcd1234</p>
            </div>
          </a>
  
        </div>
      </div>

      <div class="results ${this.isCollectionPage ? 'collection' : ''}">
        <div class="table" ?hidden="${this.isCollectionPage}">
          <h5>
            <div class="table-heading">${this.label}</div>
            <div class="table-heading">Items</div>
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
        <div class="right-image-container">
          <a href="/item/ark:/87293/d3d02x">
            <img
              class="right-image"
              ?hidden=${this.results.length < 12 || this.isCollectionPage}
              src="${this.rightImgUrl}"
            />
            <div class="creator-info-label">
              <img src="/images/watercolors/Label-Watercolor-Blue.png" alt="label background"/>
              <h5 style="top: 1.6rem;">Jancis Robinson</h5>
              <!-- <p>ark:/87293/d3d80x</p> -->
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="results-footer">
      <div class="footer-dots ${this.isCollectionPage ? 'collection' : ''}"></div>
      <ucd-theme-pagination
        ?hidden="${this.totalPages < 2}"
        current-page=${this.currentPage}
        max-pages=${this.totalPages}
        @page-change=${this._onPageClicked}
        xs-screen
        ellipses>
      </ucd-theme-pagination>
    </div>
  `;
}
