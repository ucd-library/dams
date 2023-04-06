import { html, unsafeCSS } from 'lit';

import '@ucd-lib/theme-elements/ucdlib/ucdlib-md/ucdlib-md.js';

import { sharedStyles } from "../../styles/shared-styles";
import SharedHtml from '../../utils/shared-html';
import jsonStyles from 'json-formatter-js/dist/json-formatter.css';
import linksCss from "@ucd-lib/theme-sass/1_base_html/_links.css";
import buttonsCss from "@ucd-lib/theme-sass/2_base_class/_buttons.css";
import headingsCss from "@ucd-lib/theme-sass/2_base_class/_headings.css";

export default function render() { 
  return html`
  <style>
    ${sharedStyles}
    ${linksCss}
    ${buttonsCss}
    ${headingsCss}
    ${unsafeCSS(jsonStyles)}
    :host {
      display: block;
      position: relative;
      font-size: .9rem;
      width: 100vw;
    }

    :host > div {
      padding: 0 40px;
    }

    h1 {
      font-size: 2.5rem;
    }

    h2 {
      font-size: 2.1rem;
      font-weight: 700;
      color: var(--color-aggie-blue);
    }

    h3 {
      font-size: 1.7rem;
      font-weight: 700;
    }

    .title-section {
      display: flex;
      min-height: 42vw;
    }

    .title-section > div {
      flex: 1;
      padding: 2rem;
      width: 50%;
    }

    .collection-header {
      margin: auto;
    }

    a.btn--alt {
      padding-top: 0;
      padding-bottom: 0;
      color: white;
    }

    .image-overlay {
      position: relative;
      z-index: 450;
    }

    .watercolor-bg {
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }

    .featured-image {
      z-index: 50;
      top: 27%;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      transform: rotate(356deg);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
      width: 70%;
      overflow: hidden;
      padding-top: 52.5%;
    }

    .watercolor-fg {
      z-index: 100;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }

    .content-warning {
      padding: 2rem;
      background-color: var(--color-aggie-gold-30);
      font-style: italic;
    }

    .detail-section {
      line-height: 1.7rem;
      width: 60%;
      margin: 0 auto;
    }

    .description {
      margin: 2rem 0;
    }

    .label {
      font-weight: bold;
      padding-right: 0.3rem;
    }

    .collection-highlights {
      text-align: center;
    }

    .card-2-4 {
      width: 75%;
      margin: 0 auto;
    }
    .card-2,
    .card-2-4,
    .card-trio,
    .card-5-plus {
      display: grid;
      grid-template-columns: auto;
      grid-gap: var(--spacing-sm);
    }
    .card-2 dams-collection-card,
    .card-2-4 dams-collection-card,
    .card-trio dams-collection-card,
    .card-5-plus dams-collection-card {
      margin-bottom: var(--spacing-default);
    }

    .collection-highlights a.btn--primary {
      color: var(--color-aggie-blue);
      padding-top: .3rem;
      padding-bottom: .3rem;
      margin: 1rem 0 3rem;
    }

    /* .citation {
      background-color: var(--color-aggie-blue-30);
      display: flex;
      width: 100vw;
    }

    .citation a {
      padding: .3rem;
    }

    .citation a.btn-copy {
      background-color: var(--color-aggie-gold);
    }

    .citation a.btn-copy:hover {
      background-color: var(--color-aggie-blue);
      color: var(--color-aggie-gold);
    }

    .citation a.btn-apa {
      background-color: var(--color-aggie-blue-50);
      margin-right: .5rem;
      min-width: 8ch;
    }

    .citation a.btn-apa::after {
      content: ' ';
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid black;
      margin-left: 0.8rem;
    }

    .cite-graphic {
      margin: auto;
      width: 33%;
    }

    .citation .header-dots {
      margin: 0;
    }

    .cite-collection {
      margin: auto;
      width: 67%;
      padding: 2rem;
    }

    .cite-collection h2,
    .collection-highlights h2 {
      margin-bottom: .3rem;
    }

    .cite-collection p {
      margin-bottom: 3rem;
    } */

    .admin-heading {
      margin-top: 5rem;
      text-align: center;
    }

    .admin-content {
      border-style: inset;
      border-color: rgb(235, 243, 250);
      margin: 2rem;
    }

    .admin-box-title {
      text-align: center;
      font-weight: normal;
      margin: 0;
    }

    @media (min-width: 767px) {
      .card-2,
      .card-2-4 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .card-trio,
      .card-5-plus {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      
      .card-trio {
        margin-right: 0;
        margin-left: 0;
      }
    }

    @media (max-width: 600px) {
      
      .title-section {
        display: block;
        min-height: 90vh;
      }

      .title-section > div {
        width: 80%;
        margin: auto;
        height: 30vh;
      }
      
      .detail-section {
        width: 80%;
      }

      .citation {
        display: block;
      }

      .cite-graphic,
      .cite-collection {
        width: 80%;
        padding-top: 0;
      }

    }

    .display-editor-root {
      height: 500px;
      margin: 2rem;
    }

    .display-pref-heading {
      margin: 2rem;
    }

    /* input[type=file]::file-selector-button {
      align-content: center;
      align-items: center;
      border-radius: 4px;
      border-color: $blue;
      background-color: $blue;
      border-width: 1px;
      cursor: pointer;
      display: inline-flex;
      font-size: 1.1rem;
      height: $base-spacing*2;
      line-height: 1.6rem;
      text-align: center;
      white-space: nowrap;
      width: 100%;
  } */

    /* .file-upload-container > * {
      display: block;
    } */

    .file-upload-container ucdlib-icon {
      display: inline-block;

    }
    
    input[type="file"] {
        display: none;
    }

    .file-upload-label {
      cursor: pointer;
      background-color: var(--color-aggie-blue-80);
      color: white;
      height: 50px;
      border-radius: 1.5rem;
      /* padding: 0 1.5rem; */
      display: inline-block;
      /* align-items: center;
      justify-content: center; */
      text-align: center;
      font-size: .8rem;
      font-weight: bold;
      white-space: nowrap;
      min-width: 150px;
    }

    .left-panel {
      display: flex;
    }

    .left-panel .file-upload-label ucdlib-icon {
      height: 50%;
      position: relative;
      top: 5%;
      left: -5%;
      fill: var(--color-aggie-gold);
    }

    .left-panel .file-upload-label:hover {
      background-color: var(--color-aggie-blue);
    }

    .left-panel  .file-upload-label span {
      position: relative;
      top: 20%;
      right: 20%;
    }

    .selected-file {
      padding: 0 2rem 2rem;
      font-weight: bold;
    }

    .admin-edit .left-panel {
      position: absolute;
      left: 3rem;
      top: 2rem;
      z-index: 500;
    }

    .admin-edit .right-panel {
      position: absolute;
      right: 3rem;
      top: 2rem;
      z-index: 500;
    }

    .admin-edit .icon-wrapper {
      height: 50px;
      width: 50px;
      background-color: var(--color-aggie-blue-70);
      border-radius: 50%;
      display: inline-block;
      margin-left: .3rem;
      cursor: pointer;
    }

    .admin-edit ucdlib-icon {
      fill: white;
      width: 50%;
      height: 50%;
      margin: auto;
      padding-top: 0.6rem;      
    }

    .admin-edit .icon-wrapper.edit {
      background-color: var(--color-aggie-blue);
    }

    .admin-edit .icon-wrapper:hover {
      background-color: var(--color-aggie-blue);
    }

    .admin-edit .icon-wrapper.edit:hover {
      background-color: var(--color-aggie-gold);
    }

    .admin-edit .icon-wrapper.edit:hover ucdlib-icon {
      fill: var(--color-aggie-blue);
    }

    .edit-overlay {
      background: white;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: .55;
      z-index: 400;
    }

    .color-pallette {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 2rem;
      padding: 0 .6rem;
      background-color: var(--color-aggie-blue-30);
      border-radius: 1.5rem;
    }

    .color-circle {
      width: 27px;
      height: 27px;
      border-radius: 50%;
      margin: 0 3px;
      cursor: pointer;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }

    .color-circle:hover {
      border: 3px solid var(--color-aggie-blue-70);
    }

    .color-circle[selected] {
      border: 3px solid var(--color-aggie-blue);
    }

    .edit-collections-container {
      z-index: 500;
      position: relative;
    }

    .edit-collections-container .collection-item {
      height: 135px;
      /* width: 401px; */
      background-color: var(--color-aggie-blue-30);
      position: relative;
      margin: 1rem;
    }

    .edit-collections-container .collection-item span {
      display: block;
      text-align: start;
      padding: 1rem;
      font-size: 1rem;
      font-weight: bold;
    }

    .edit-collections-container .collection-item input {
      position: absolute;
      left: 1rem;
      right: 1rem;
      border: none;
      height: 2rem;
      padding: 0 .5rem;
      box-sizing: border-box;
      outline: none;
      font-size: .8rem;
    }

    .collection-highlights h2, 
    .collection-highlights .header-dots {
      position: relative;
      z-index: 500;
    }

    .collection-highlights h2 {
      margin-bottom: 0;
    }
    

    /* TODO transitions for admin icons and hovering */


  </style>
  
    <div class="edit-overlay" ?hidden="${!this.editMode}">
    </div>
    <div class="admin-edit" ?hidden="${!this.isAdmin}">
      <div class="left-panel">
        <div class="file-upload-container" ?hidden="${!this.editMode}">            
          <label for="file-upload" class="file-upload-label">
            <ucdlib-icon icon="ucdlib-dams:fa-plus"></ucdlib-icon>
            <span>New Image</span> 
          </label>
          <input id="file-upload" type="file" accept="image/jpeg" @change="${this._onFileChange}" />
        </div>  

        <div class="color-pallette" ?hidden="${!this.editMode}">
          <div class="rose color-circle" ?selected="${this.watercolor === 'rose'}" style="background-color: var(--color-rose)" @click="${this._onWatercolorChanged}"></div>
          <div class="gold color-circle" ?selected="${this.watercolor === 'gold'}" style="background-color: var(--color-aggie-gold)" @click="${this._onWatercolorChanged}"></div>
          <div class="sage color-circle" ?selected="${this.watercolor === 'sage'}" style="background-color: var(--color-farmers-market)" @click="${this._onWatercolorChanged}"></div>
          <div class="arboretum color-circle" ?selected="${this.watercolor === 'arboretum'}" style="background-color: var(--color-arboretum)" @click="${this._onWatercolorChanged}"></div>
          <div class="tahoe color-circle" ?selected="${this.watercolor === 'tahoe'}" style="background-color: var(--color-tahoe)" @click="${this._onWatercolorChanged}"></div>
          <div class="thiebaud-icing color-circle" ?selected="${this.watercolor === 'thiebaud-icing'}" style="background-color: var(--color-thiebaud-icing)" @click="${this._onWatercolorChanged}"></div>
        </div>
      </div>

      <div class="right-panel">
        <div class="icon-wrapper" ?hidden="${this.editMode}" @click="${this._onEditClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-pen"></ucdlib-icon>
        </div>
        <div class="icon-wrapper edit" ?hidden="${!this.editMode}" @click="${this._onSaveClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-floppy-disk"></ucdlib-icon>
        </div>
        <div class="icon-wrapper edit" ?hidden="${!this.editMode}" @click="${this._onCancelEditClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-xmark"></ucdlib-icon>
        </div>
      </div>
    </div>

    <div class="title-section">
      <div class="image-overlay">
        <img class="watercolor-bg" src="/images/watercolors/collection-watercolor-${this.watercolor}-back.png" width="100%" alt="watercolor background" />

        <!-- <img class="featured-image" src="${this.thumbnailUrl}" width="45%" alt="collection featured image" /> -->
        <div class="featured-image" style="background-image:url(${this.thumbnailUrl})"></div>
        <img class="watercolor-fg" src="/images/watercolors/collection-watercolor-${this.watercolor}-front.png" width="100%" alt="watercolor foreground" />
      </div>
      <div class="collection-header">
        
        <h1>${this.title}</h1>
        <h3 ?hidden="${!this.callNumber}">Collection #${this.callNumber}</h3>
        <a href="${this._href}" class="btn--alt btn--round">View ${this.items} items</a>
      </div>
    </div>

    <div class="detail-section">
      <div class="content-warning">
        Due to the nature of the historical items in this collection, some materials may be considered harmful, offensive or misrepresentative.
        There may be occurences of language, positions and values that do not align with our current values and practices at UC Davis.
      </div>
      <p class="description">
      <ucdlib-md id="md">
        <ucdlib-md-content>
          ${this.description}
        </ucdlib-md-content>
      </ucdlib-md>
      </p>

      <div style="margin-bottom: .4rem;">
        <span class="label">Coverage: </span> ${this.yearPublished}
      </div>
      <div style="margin-bottom: .4rem;">
        <span class="label">Subjects: </span> 
        ${this.keywords.map((item, index) => html`${index > 0 ? ', ' : ''}<a href="">${item}</a>`)}
      </div>
      <div style="margin-bottom: 3rem;">
        <span class="label">Finding Aid: </span> <a href="">Online Archive of California</a>
      </div>
    </div>

    <div class="collection-highlights">
      <h2>Highlights From This Collection</h2>
      ${ SharedHtml.headerDots() }
      
      <div class="edit-collections-container" ?hidden="${!this.editMode}">
        <div class="card-trio">      
          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-ark-input" type="text" placeholder="ark:/..." />
          </div>

          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-ark-input" type="text" placeholder="ark:/..." />
          </div>

          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-ark-input" type="text" placeholder="ark:/..." />
          </div>
        </div>
      
        <div class="card-trio">      
          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-ark-input" type="text" placeholder="ark:/..." />
          </div>

          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-ark-input" type="text" placeholder="ark:/..." />
          </div>

          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-ark-input" type="text" placeholder="ark:/..." />
          </div>
        </div>
      
      </div>
      <div ?hidden="${this.editMode}">
        <div class="card-trio">
          ${this.highlightedItems.map((item, index) => html`
            ${index < 3 ? html`<dams-item-card .data="${item}"></dams-item-card>` : ''}
          `)}
        </div>
        <div class="card-trio">
          ${this.highlightedItems.map((item, index) => html`
            ${index >= 3 ? html`<dams-item-card .data="${item}"></dams-item-card>` : ''}
          `)}
        </div>
      </div>

      <a href="" class="btn btn--primary view-all-collections">View all collection items</a>

    </div>

    <app-citation></app-citation>

    <h2 class="admin-heading">Debug ${this.collectionId}</h2>
    <div class="admin-content">
      <h4 class="admin-box-title">dbsync</h4>
      <!-- json injected admin data -->
    </div>

    <h2 class="display-pref-heading">Admin Display Preferences</h2>
    <div class="display-editor-root">
    
    </div>
    
    <!-- <div class="file-upload-container">    
      <label for="file-upload" class="file-upload-label">
        Upload Featured Image 
      </label>
      <input id="file-upload" type="file" accept="image/jpeg" @change="${this._onFileChange}" />
      <span class="selected-file">
      </span>
    </div>

    <a href="" class="btn--alt" style="margin: 0 2rem 2rem 2rem" @click="${this._onSave}">Save</a> -->

  `;}