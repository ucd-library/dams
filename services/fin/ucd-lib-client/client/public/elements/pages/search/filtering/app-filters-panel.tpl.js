import { html } from "lit";
import { sharedStyles } from "../../../styles/shared-styles";

export default function render() {
  return html`
    <style>
      ${sharedStyles} :host {
        background-color: var(--color-aggie-blue-40);
        position: relative;
      }

      #filters {
        margin-left: 10px;
      }

      .title {
        color: var(--default-primary-color);
        font-weight: bold;
        padding: 15px 0;
        margin-left: 10px;
        border-bottom: 1px solid var(--medium-background-color);
        display: none;
      }

      app-filter-panel {
        border-bottom: 1px solid white;
        padding: 0.4rem 0;
      }

      .thumbnail {
        background-size: cover;
        background-position: center center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .thumbnail-root {
        position: relative;
        height: 200px;
      }

      .label {
        padding: 10px 0;
        color: var(--default-primary-color);
        font-weight: var(--fw-bold);
      }

      .collection-filter {
        padding: 4px 5px;
        border-bottom: 1px solid var(--medium-background-color);
      }

      .outer-drawer-toggle {
        position: relative;
      }
      .outer-drawer-toggle[spacer] {
        height: 50px;
        border-bottom: 1px solid var(--medium-background-color);
        margin-left: 10px;
      }

      .drawer-toggle {
        font-size: var(--fs-sm);
        position: absolute;
        z-index: 15;
        top: 15px;
        right: -24px;
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

      @media (min-width: 975px) {
        h2 {
          display: block;
        }
        .outer-drawer-toggle {
          display: none;
        }
        .title {
          display: block;
        }
      }
    </style>

    <!-- <div class="title" ?hidden="${this.collectionMode}" >FILTERS</div> -->

    <!-- <div class="outer-drawer-toggle" ?spacer="${!this
      .collectionMode}" on-click="_fireToggleDrawer">
    <button class="drawer-toggle">
      <span><span ?hidden="${!this.collectionMode}">Info / </span>Filters</span>
      <iron-icon icon="fin-icons:close"></iron-icon>
    </button>
  </div> -->
    <div class="thumbnail-root" ?hidden="${!this.collectionMode}">
      <div
        class="thumbnail"
        style="background-image: url('${this.selectedCollection.thumbnailUrl}')"
      ></div>
      <!-- <div class="thumbnail" style="background-image: url('${this
        .selectedCollection.thumbnail}')"></div>  -->
    </div>

    <app-tabs
      .tabs="${this.tabs}"
      selected="${this.selectedTab}"
      ?hidden="${!this.collectionMode}"
    >
    </app-tabs>

    <iron-pages
      selected="${this.selectedTab}"
      attr-for-selected="id"
      selected-attribute="showing"
    >
      <div id="filters">
        <!-- <div ?hidden="${!this
          .collectionMode}" class="label">Collection</div>
      <div ?hidden="${!this.collectionMode}" class="collection-filter">
        <app-facet-checkbox
          type="collection"
          value="${this.selectedCollection.name}"
          checked="${this.collectionMode}"
          on-click="_removeCollectionFilter">
        </app-facet-checkbox>
      </div> -->

        ${this.facetFilters.map(
          (item, index) => html`
            <app-filter-panel .filter="${item}"></app-filter-panel>
          `
        )}
      </div>
      <app-collection-info-panel id="info"></app-collection-info-panel>
    </iron-pages>
  `;
}
