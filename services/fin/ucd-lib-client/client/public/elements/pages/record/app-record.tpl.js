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
        font-weight: 800;
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
        margin: 0.85rem;
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
        min-height: 12rem;
        margin: 3rem 0;
        background-color: var(--color-aggie-blue-30);
      }

      /* .part-of img {
        max-width: 100%;
        max-height: 100%;
        height: auto;
        width: auto;
      } */

      .part-of-img-container {
        overflow: hidden;
        width: 100%;
        aspect-ratio: 4 / 3;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .part-of img {
        position: relative;
        /* top: calc(-65%); */
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
        margin: 0.3rem 0 0;
        font-weight: 600;
      }

      .part-of .collection-info h4 a {
        color: var(--color-aggie-blue);
        text-decoration: none;
      }
      .part-of .collection-info h4 a:hover {
        text-decoration: underline;
      }

      .part-of .collection-info p {
        margin: 0;
      }

      .part-of .collection-info span {
        font-weight: 800;
        text-decoration: none;
        color: var(--color-aggie-blue-80);
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

    app-record .admin-edit .left-panel {
      position: absolute;
      left: 20%;
      width: 60%;
      top: calc(170px + 3rem);
      z-index: 500;
      border-bottom: 6px dotted var(--color-aggie-gold);
      padding-bottom: 1.5rem;
    }

    app-record .admin-edit .right-panel {
      position: absolute;
      right: 3rem;
      top: calc(170px + 3rem);
      z-index: 500;
    }

    app-record .admin-edit .icon-wrapper {
      height: 50px;
      width: 50px;
      background-color: var(--color-aggie-blue-70);
      border-radius: 50%;
      display: inline-block;
      margin-left: .3rem;
      cursor: pointer;
    }

    app-record .admin-edit ucdlib-icon {
      fill: white;
      width: 50%;
      height: 50%;
      margin: auto;
      padding-top: 0.6rem;      
    }

    app-record .admin-edit .icon-wrapper.edit {
      background-color: var(--color-aggie-blue);
    }

    app-record .admin-edit .icon-wrapper:hover {
      background-color: var(--color-aggie-blue);
    }

    app-record .admin-edit .icon-wrapper.edit:hover {
      background-color: var(--color-aggie-gold);
    }

    app-record .admin-edit .icon-wrapper.edit:hover ucdlib-icon {
      fill: var(--color-aggie-blue);
    }

    .edit-overlay {
      background: white;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: .55;
      z-index: 400;
    }

    </style>

    <div class="edit-overlay" ?hidden="${!this.editMode || !this.isUiAdmin}">
    </div>
    <div class="admin-edit" ?hidden="${!this.isUiAdmin}">
      <div class="left-panel" ?hidden="${!this.editMode || !this.isUiAdmin}">
        <span class="form-label" style="font-weight: bold;">Item Display:</span>
        <ucd-theme-slim-select
          @change="${this._ssSelectBlur}"
          @focusin="${this._ssSelectFocus}"
          @click="${this._ssSelectFocus}"
          @blur="${this._ssSelectBlur}">
          <select>
              <option .value=${''} ?selected=${this.itemDisplay === ''}>
                Collection Default (${this.itemDefaultDisplay})
              </option>
              <option .value=${'Book Reader - 2 Page'} ?selected=${this.itemDisplay === 'Book Reader - 2 Page'}>
                Book Reader - 2 Page
              </option>
              <option .value=${'Book Reader - Single Page'} ?selected=${this.itemDisplay === 'Book Reader - Single Page'}>
                Book Reader - Single Page
              </option>
              <option .value=${'Image List'} ?selected=${this.itemDisplay === 'Image List'}>
                Image List
              </option>
          </select>
        </ucd-theme-slim-select>
      </div>

      <div class="right-panel">
        <div class="icon-wrapper" ?hidden="${this.editMode || !this.isUiAdmin}" @click="${this._onEditClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-pen"></ucdlib-icon>
        </div>
        <div class="icon-wrapper edit" ?hidden="${!this.editMode || !this.isUiAdmin}" @click="${this._onSaveClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-floppy-disk"></ucdlib-icon>
        </div>
        <div class="icon-wrapper edit" ?hidden="${!this.editMode || !this.isUiAdmin}" @click="${this._onCancelEditClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-xmark"></ucdlib-icon>
        </div>
      </div>
    </div>


    <app-media-viewer @br-page-change="${this._onBookViewPageChange}"></app-media-viewer>

    <div class="container" style="padding-bottom: 50px">
      <h3>${this.name}</h3>
      <div class="copyright">
        <span>&copy;</span>
        <a href="http://rightsstatements.org/vocab/InC-NC/1.0/"
          class="copyright-text">In Copyright - Non-Commercial Use Permitted</a>
      </div>

      <div class="part-of">
        <div class="part-of-img-container"><img src="${this.collectionImg}" alt="" /></div>
        <div class="collection-info">
          <p style="font-style: italic;">part of digital collection</p>
          <h4><a href="${this.collectionId}">${this.collectionName}</a></h4>
          <span>${this.collectionItemCount} items</span>
        </div>
      </div>

      <div class="download-section">
        <div class="label">Download</div>
        <div class="download-options">
          <app-media-download
            id="download"
            ?hidden="${this.isBagOfFiles}"></app-media-download>
          <app-fs-media-download
            id="download"
            ?hidden="${!this.isBagOfFiles}"></app-fs-media-download>
        </div>
      </div>

      <div ?hidden="${!this.date}" class="metadata-row">
        <div class="attr">Date</div>
        <div class="value" id="dateValue">${this.date}</div>
      </div>

      <div ?hidden="${!this.description || !this.description.length}" class="metadata-row">
        <div class="attr">Description</div>
        <div class="value" id="descriptionValue">${this.description}</div>
      </div>

      <div ?hidden="${!this.publisher}" class="metadata-row" id="publisher">
        <div class="attr">Publisher</div>
        <div class="value" id="publisherValue">${this.publisher}</div>
      </div>

      <div
        ?hidden="${!this.subjects || !this.subjects.length}"
        class="metadata-row"
        id="subject">
        <div class="attr">Subjects</div>
        <div class="value" id="subjectValue">
          ${this.subjects.map(
            (about, index) =>
              html`${index > 0 ? ", " : ""}<a href="${about["@id"]}"
                  >${about["name"] || about["@id"]}</a>`
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
          ${this.arkDoi.map((link) => html`<a href="${link}">${link.replace('/item', '')}</a>`)}
        </div>
      </div>

      <div class="metadata-row">
        <div class="attr">Fedora Link</div>
        <div class="value" id="fedoraValue">
          ${this.fedoraLinks.map((link) => html`<a href="${link}">${link.replace('/fcr:metadata', '')}</a>`)}
        </div>
      </div>
    </div>

    <app-citation .record="${this.citationRoot}"></app-citation>
  `;
}
