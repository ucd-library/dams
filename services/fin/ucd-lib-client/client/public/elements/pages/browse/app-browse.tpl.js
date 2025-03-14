import { html } from "lit";

import { sharedStyles } from "../../styles/shared-styles";
import priorityLinksCss from "@ucd-lib/theme-sass/4_component/_priority-links.css";
import iconsCss from "@ucd-lib/theme-sass/4_component/_icons.css";
import categoryBrandCss from "@ucd-lib/theme-sass/4_component/_category-brand.css";
import verticalLinksCss from "@ucd-lib/theme-sass/4_component/_vertical-link.css";

export default function render() {
  return html`
    <style>
      ${sharedStyles}
        ${priorityLinksCss}
        ${categoryBrandCss}
        ${verticalLinksCss}
        ${iconsCss}
        :host {
        display: block;
        position: relative;
      }

      .vertical-link--circle .vertical-link__figure:after {
        opacity: 1 !important;
      }

      /* STYLES BELOW ARE ACTUALLY USED. NEED TO AUDIT ANYTHING ABOVE */
      [hidden] {
        display: none;
      }

      .browse-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: row wrap;
        padding-bottom: 4rem;
        background-color: var(--color-white);
      }
      .browse-buttons > div {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        width: 75%;
      }
      .browse-buttons app-icons {
        margin: 0 10px;
      }
      .browse-buttons .vertical-link__title {
        color: var(--color-aggie-blue);
        text-transform: capitalize;
      }
      .browse-buttons .vertical-link__figure:before,
      .browse-buttons .vertical-link__figure:after {
        box-sizing: border-box;
      }
      .browse-buttons .vertical-link--circle .vertical-link__figure {
        background-color: var(--color-white);
        margin-bottom: 0.75rem;
      }

      .browse-buttons .vertical-link--circle .vertical-link__figure:hover {
        background-color: var(--color-aggie-gold);
      }

      @media (max-width: 1070px) {
        .browse-buttons > div {
          width: 100%;
        }
      }

      .priority-links {
        padding: 0 0 1rem;
      }

      .fw-light {
        font-weight: 200;
        font-style: normal;
        margin: 0.75rem 0 0.25rem;
        padding: 0;
        line-height: 1.2;
      }

      app-browse .title-section {
        text-align: center;
        border: none;
      }

      .header-icon {
        width: 6rem;
      }
    </style>

    <div class="browse-selection-section" ?hidden="${this.page !== "/browse"}">
      <div class="title-section">
        <h1>Browse<br /><span class="fw-light">Digital Collections</span></h1>
      </div>
      <section class="browse-buttons site-frame">
        <div class="priority-links">
          <div class="priority-links__item">
            <a
              class="vertical-link vertical-link--circle category-brand--secondary"
              href="/browse/collections/15"
            >
              <div class="vertical-link__figure">
                <!-- <ucdlib-icon class="vertical-link__image" src="http://localhost:3000/images/ucd-logo.svg"></ucdlib-icon> -->
                <!-- <ucdlib-icon class="vertical-link__image" icon="ucd-public:fa-box-archive"></ucdlib-icon>  -->
                <ucdlib-icon
                  class="vertical-link__image"
                  icon="ucdlib-dams:fa-box-archive"
                ></ucdlib-icon>
              </div>
              <div class="vertical-link__title">Collections</div>
            </a>
          </div>
          <div class="priority-links__item">
            <a
              class="vertical-link vertical-link--circle category-brand--secondary"
              href="/search"
            >
              <div class="vertical-link__figure">
                <ucdlib-icon
                  class="vertical-link__image"
                  icon="ucdlib-dams:photo-stack"
                ></ucdlib-icon>
              </div>
              <div class="vertical-link__title">All Items</div>
            </a>
          </div>
          <div class="priority-links__item">
            <a
              class="vertical-link vertical-link--circle category-brand--secondary"
              href="/browse/creator/30"
            >
              <div class="vertical-link__figure">
                <ucdlib-icon
                  class="vertical-link__image"
                  icon="ucdlib-dams:fa-wand-magic-sparkles"
                ></ucdlib-icon>
              </div>
              <div class="vertical-link__title">Creators</div>
            </a>
          </div>
          <div class="priority-links__item">
            <a
              class="vertical-link vertical-link--circle category-brand--secondary"
              href="/browse/format/30"
            >
              <div class="vertical-link__figure">
                <ucdlib-icon
                  class="vertical-link__image"
                  icon="ucdlib-dams:fa-photo-film"
                ></ucdlib-icon>
              </div>
              <div class="vertical-link__title">Formats</div>
            </a>
          </div>
          <div class="priority-links__item">
            <a
              class="vertical-link vertical-link--circle category-brand--secondary"
              href="/browse/subject/30"
            >
              <div class="vertical-link__figure">
                <ucdlib-icon
                  class="vertical-link__image"
                  icon="ucdlib-dams:fa-star"
                ></ucdlib-icon>
              </div>
              <div class="vertical-link__title">Subjects</div>
            </a>
          </div>
        </div>
      </section>
    </div>

    <app-browse-by
      id="collections"
      label="Collection"
      facet-query-name=""
      ?hidden="${this.page !== "/browse/collections"}"
    >
      <img
        class="header-icon"
        slot="header-icon"
        src="/images/watercolors/watercolor-splat-gold-collections.png"
      />
    </app-browse-by>
    <app-browse-by
      id="subject"
      label="Subject"
      facet-query-name="@graph.subjects.name"
      ?hidden="${this.page !== "/browse/subject"}">
      <img
        class="header-icon"
        slot="header-icon"
        src="/images/watercolors/watercolor-splat-green-subjects.png"
      />
    </app-browse-by>
    <app-browse-by
      id="creator"
      label="Creator"
      facet-query-name="@graph.creator.name"
      ?hidden="${this.page !== "/browse/creator"}">
      <img
        class="header-icon"
        slot="header-icon"
        src="/images/watercolors/watercolor-splat-red-creators.png"
      />
    </app-browse-by>
    <app-browse-by
      id="format"
      label="Format"
      facet-query-name="@graph.fileFormatSimple"
      ?hidden="${this.page !== "/browse/format"}">
      <img
        class="header-icon"
        slot="header-icon"
        src="/images/watercolors/watercolor-splat-blue-formats.png"
      />
    </app-browse-by>
  `;
}
