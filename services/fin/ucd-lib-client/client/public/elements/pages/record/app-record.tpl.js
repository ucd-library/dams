import { html } from "lit";

import linksCss from "@ucd-lib/theme-sass/1_base_html/_links.css";
import buttonsCss from "@ucd-lib/theme-sass/2_base_class/_buttons.css";
import headingsCss from "@ucd-lib/theme-sass/2_base_class/_headings.css";

export default function render() {
  return html`
    <style include="shared-styles">
      ${linksCss} ${buttonsCss} ${headingsCss} :host {
        display: block;
        background-color: var(--super-light-background-color);
      }

      [hidden] {
        display: none !important;
      }

      .container {
        width: 60%;
        margin: auto;
      }

      .container h3 {
        font-size: 1.7rem;
        font-weight: 700;
        text-align: center;
        color: var(--color-black-60);
        margin-bottom: 0.5rem;
      }

      .copyright {
        text-align: center;
        color: var(--color-aggie-blue-80);
      }

      .copyright span {
        font-size: 1.25rem;
        vertical-align: middle;
        font-weight: bold;
      }

      .copyright-text {
        font-size: 0.875rem;
        text-decoration: underline;
        display: inline;
      }

      .label {
        font-weight: var(--fw-bold);
        color: var(--default-primary-color);
      }

      .section {
        margin-bottom: 15px;
      }
      .section.bordered {
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px dashed var(--medium-background-color);
      }

      .metadata-row,
      .download-section {
        display: flex;
        margin: 30px 20px;
      }
      .metadata-row .attr,
      .download-section .label {
        flex: 0.25;
        color: var(--default-primary-color);
        font-weight: var(--fw-bold);
      }
      .metadata-row .value,
      .download-section .download-options {
        flex: 0.75;
        word-break: break-word;
      }

      .part-of {
        background-image: url(/images/watercolors/blue--1.webp);
        background-size: cover;
        display: flex;
        height: 12rem;
        margin: 3rem 0;
      }

      .part-of img {
        max-width: 100%;
        max-height: 100%;
      }

      .part-of div {
        margin: 2rem;
        flex: 1;
      }

      .part-of div:nth-child(1) {
        text-align: center;
      }

      .part-of .collection-info {
        flex: 2;
        margin: auto 0;
      }

      .part-of .collection-info h4 {
        margin: 0.3rem 0;
      }

      .part-of .collection-info p {
        margin: 0;
      }

      .part-of .collection-info a {
        font-weight: 800;
        text-decoration: none;
      }

      #identifierValue a,
      #fedoraValue a {
        display: block;
      }

      #identifierValue a:nth-child(1),
      #fedoraValue a:nth-child(1) {
        padding-bottom: 1rem;
      }

      @media (max-width: 756px) {
        .container {
          width: 85%;
        }
      }

      @media (max-width: 600px) {
        .container {
          width: 95%;
        }

        .metadata-row,
        .download-section {
          display: block;
        }
      }
    </style>

    <app-media-viewer></app-media-viewer>

    <div class="container" style="padding-bottom: 50px">
      <h3>${this.name}</h3>
      <div class="copyright">
        <span>&copy;</span>
        <a
          href="http://rightsstatements.org/vocab/InC-NC/1.0/"
          class="copyright-text"
          >In Copyright - Non-Commercial Use Permitted</a
        >
      </div>

      <div class="part-of">
        <div><img src="${this.collectionImg}" alt="" /></div>
        <div class="collection-info">
          <p style="font-style: italic;">part of digital collection</p>
          <h4>${this.collectionName}</h4>
          <a href="${this.collectionId}">${this.collectionItemCount} items</a>
        </div>
      </div>

      <div class="download-section">
        <div class="label">Download</div>
        <div class="download-options">
          <app-media-download
            id="download"
            ?hidden="${this.isBagOfFiles}"
          ></app-media-download>
          <app-fs-media-download
            id="download"
            ?hidden="${!this.isBagOfFiles}"
          ></app-fs-media-download>
        </div>
      </div>

      <div ?hidden="${!this.date}" class="metadata-row">
        <div class="attr">Date</div>
        <div class="value" id="dateValue">${this.date}</div>
      </div>

      <div ?hidden="${!this.publisher}" class="metadata-row" id="publisher">
        <div class="attr">Publisher</div>
        <div class="value" id="publisherValue">${this.publisher}</div>
      </div>

      <div
        ?hidden="${!this.keywords || !this.keywords.length}"
        class="metadata-row"
        id="subject"
      >
        <div class="attr">Subjects</div>
        <div class="value" id="subjectValue">
          ${this.keywords.map(
            (about, index) =>
              html`${index > 0 ? ", " : ""}<a href="${about["@id"]}"
                  >${about["name"] || about["@id"]}</a
                >`
          )}
        </div>
      </div>

      <div ?hidden="${!this.callNumber}" class="metadata-row" id="callNumber">
        <div class="attr">Call Number</div>
        <div class="value" id="callNumberValue">${this.callNumber}</div>
      </div>

      <div class="metadata-row" id="identifier">
        <div class="attr">ARK / DOI</div>
        <div class="value" id="identifierValue">
          ${this.arkDoi.map((link) => html`<a href="${link}">${link}</a>`)}
        </div>
      </div>

      <div class="metadata-row">
        <div class="attr">Fedora Link</div>
        <div class="value" id="fedoraValue">
          ${this.fedoraLinks.map((link) => html`<a href="${link}">${link}</a>`)}
        </div>
      </div>
    </div>

    <app-citation .record="${this.citationRoot}"></app-citation>
  `;
}
