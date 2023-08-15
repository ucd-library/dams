import { html, unsafeCSS } from 'lit';

import '@ucd-lib/theme-elements/ucdlib/ucdlib-md/ucdlib-md.js';

import { sharedStyles } from "../../styles/shared-styles";
import SharedHtml from '../../utils/shared-html';
import linksCss from "@ucd-lib/theme-sass/1_base_html/_links.css";
import buttonsCss from "@ucd-lib/theme-sass/2_base_class/_buttons.css";
import headingsCss from "@ucd-lib/theme-sass/2_base_class/_headings.css";
import formsHtmlCss from "@ucd-lib/theme-sass/1_base_html/_forms.css";
import formsCss from "@ucd-lib/theme-sass/2_base_class/_forms.css";

export default function render() { 
  return html`
  <style>
    ${sharedStyles}
    ${linksCss}
    ${buttonsCss}
    ${headingsCss}
    ${formsHtmlCss}
    ${formsCss}

    :host {
      display: block;
      position: relative;
      font-size: .9rem;
      width: 100vw;
    }

    [hidden] { display: none !important; }

    :host > div {
      padding: 0 40px;
    }

    h2 {
      font-weight: 700;
      color: var(--color-aggie-blue);
    }

    h3 {
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

    .collection-header h1 {
      margin: 0.5rem 0;
    }

    .collection-header h3 {
      margin: 0;
    }

    a.btn--alt {
      padding-top: 0;
      padding-bottom: 0;
      margin-top: 1rem;
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
      top: 17%;
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
      margin: 3rem 0 3rem;
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
        overflow-y: -webkit-paged-x;
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
      top: calc(170px + 3rem);
      z-index: 500;
    }

    .admin-edit .right-panel {
      position: absolute;
      right: 3rem;
      top: calc(170px + 3rem);
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
      position: fixed;
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
      padding: 1rem 1rem .5rem 1rem;
      font-size: 1rem;
      font-weight: bold;
    }

    .edit-collections-container .collection-item input {
      position: absolute;
      left: 1rem;
      right: 1rem;
      border: none;
      height: 2rem;
      /* padding: 0 .5rem; */
      box-sizing: border-box;
      outline: none;
      font-size: .8rem;

      width: auto;
    }

    .collection-highlights h2, 
    .collection-highlights .header-dots {
      position: relative;
      z-index: 500;
    }

    .collection-highlights h2 {
      margin-bottom: 0;
    }

    .edit-collections-container > fieldset {
      border-top: none;
      padding-top: 0;
      margin-top: 0;
    }

    .edit-collections-container > fieldset span {
      font-weight: bold;
    }

    .list--reset {
      margin: 0;
      padding: 0 0 0 1.25rem;
      padding-left: 0;
      list-style: none;
    }

    .list--reset > li {
      display: inline-block;
      padding-right: .5rem;
    }

    .radio label {
      padding-top: .2rem;
    }

    .radio label:before {
     top: 5px;
     left: -1px;
    }
    
    .default-display {
      background-color: var(--color-aggie-gold-20);
      margin: 1rem;
      padding-bottom: 1rem;
    }

    .default-display h3 {
      font-style: italic;
      color: var(--color-aggie-blue);
      text-align: left;
      padding: 2rem 0 0 1rem;
      margin-bottom: 1rem;
    }

    .default-display span.label {
      font-weight: bold;
    }

    .default-item-display,
    .exceptions {
      text-align: left;
      padding-left: 1rem;
    }

    .default-item-display .default-item-display-fs {
      border: none; 
      padding-left: 0; 
      padding-top: 0; 
      margin-top: 0;
      padding-bottom: 0;
      margin-bottom: 0; 
      position: relative; 
      left: -0.5rem;
      top: -0.5rem;
    }    

    .exceptions fieldset li,
    .default-item-display fieldset li {
      padding-top: .5rem;
    }

    .exceptions fieldset label,
    .default-item-display fieldset label {
      display: inline-block;
    }

    .exceptions fieldset label {
      font-weight: normal;
      color: inherit;
    }

  </style>
  
    <div class="edit-overlay" ?hidden="${!this.editMode || !this.isUiAdmin}">
    </div>
    <div class="admin-edit" ?hidden="${!this.isUiAdmin}">
      <div class="left-panel">
        <div class="file-upload-container" ?hidden="${!this.editMode || !this.isUiAdmin}">            
          <label for="file-upload" class="file-upload-label">
            <ucdlib-icon icon="ucdlib-dams:fa-plus"></ucdlib-icon>
            <span>New Image</span> 
          </label>
          <input id="file-upload" type="file" accept="image/jpeg" @change="${this._onFileChange}" />
        </div>  

        <div class="color-pallette" ?hidden="${!this.editMode || !this.isUiAdmin}">
          <div class="rose color-circle" ?selected="${this.watercolor === 'rose'}" style="background-color: var(--color-rose)" @click="${this._onWatercolorChanged}"></div>
          <div class="gold color-circle" ?selected="${this.watercolor === 'gold'}" style="background-color: var(--color-aggie-gold)" @click="${this._onWatercolorChanged}"></div>
          <div class="sage color-circle" ?selected="${this.watercolor === 'sage'}" style="background-color: var(--color-farmers-market)" @click="${this._onWatercolorChanged}"></div>
          <div class="arboretum color-circle" ?selected="${this.watercolor === 'arboretum'}" style="background-color: var(--color-arboretum)" @click="${this._onWatercolorChanged}"></div>
          <div class="tahoe color-circle" ?selected="${this.watercolor === 'tahoe'}" style="background-color: var(--color-tahoe)" @click="${this._onWatercolorChanged}"></div>
          <div class="thiebaud-icing color-circle" ?selected="${this.watercolor === 'thiebaud-icing'}" style="background-color: var(--color-thiebaud-icing)" @click="${this._onWatercolorChanged}"></div>
        </div>
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

    <div class="title-section">
      <div class="image-overlay">
        <img class="watercolor-bg" src="/images/watercolors/collection-watercolor-${this.watercolor}-back-white.jpg" width="100%" alt="watercolor background" />

        <!-- <img class="featured-image" src="${this.thumbnailUrl}" width="45%" alt="collection featured image" /> -->
        <div class="featured-image" style="background-image: url(${this.thumbnailUrlOverride}), url(${this.thumbnailUrl})"></div>
        <img class="watercolor-fg" src="/images/watercolors/collection-watercolor-${this.watercolor}-front.png" width="100%" alt="watercolor foreground" />
      </div>
      <div class="collection-header">
        
        <h1>${this.title}</h1>
        <h3 ?hidden="${!this.callNumber}">Collection #${this.callNumber}</h3>
        <a href="${this.collectionSearchHref}" class="btn--alt btn--round">View ${this.items} items</a>
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
      <div style="margin-bottom: .4rem;" ?hidden="${!this.keywords || !this.keywords.length}">
        <span class="label">Subjects: </span> 
        ${this.keywords.map((item, index) => html`${index > 0 ? ', ' : ''}<a href="${item.href}">${item.label}</a>`)}
      </div>
      <div style="margin-bottom: 3rem;">
        <span class="label">Finding Aid: </span> <a href="">Online Archive of California</a>
      </div>
    </div>

    <div class="collection-highlights">
      <h2 ?hidden="${(this.highlightedItems.length === 0  || this.itemCount <= 0) && !this.editMode}">Highlights From This Collection</h2>
      ${ SharedHtml.headerDots() }
      
      <div class="edit-collections-container" ?hidden="${!this.editMode || !this.isUiAdmin}">

      <fieldset class="radio" style="border: none; margin: 0; padding: 0;">      
        <div>
          <span class="form-label">Highlight Display:</span>
          <ul class="list--reset" style="display: inline;">
            <li>
              <input id="six" 
                name="radio-items-per-page" 
                type="radio" 
                class="radio" 
                value="6" 
                ?checked="${this.itemCount === 6}" 
                @change="${this._onItemDisplayChange}">
              <label for="six">6 (recommended)</label>
            </li>
            <li>
              <input id="three" 
                name="radio-items-per-page" 
                type="radio" 
                class="radio" 
                value="3" 
                ?checked="${this.itemCount === 3}" 
                @change="${this._onItemDisplayChange}">
              <label for="three">3</label>
            </li>
            <li>
              <input id="zero" 
                name="radio-items-per-page" 
                type="radio" 
                class="radio" 
                value="0" 
                ?checked="${this.itemCount === 0}" 
                @change="${this._onItemDisplayChange}">
              <label for="zero">0</label>
            </li>
          </ul>
        </div>
      </fieldset>

        <div class="card-trio" ?hidden="${this.itemCount === 0}">      
          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-1 item-ark-input" 
              type="text" 
              .value="${this.savedItems[0] ? '/item'+this.savedItems[0]['@id'].split('/item')[1] : ''}" 
              placeholder="/item/ark:/..." />
          </div>

          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-2 item-ark-input" 
              type="text" 
              .value="${this.savedItems[1] ? '/item'+this.savedItems[1]['@id'].split('/item')[1] : ''}" 
              placeholder="/item/ark:/..." />
          </div>

          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-3 item-ark-input" 
              type="text" 
              .value="${this.savedItems[2] ? '/item'+this.savedItems[2]['@id'].split('/item')[1] : ''}" 
              placeholder="/item/ark:/..." />
          </div>
        </div>
      
        <div class="card-trio" ?hidden="${this.itemCount !== 6}">      
          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-4 item-ark-input" 
              type="text" 
              .value="${this.savedItems[3] ? '/item'+this.savedItems[3]['@id'].split('/item')[1] : ''}" 
              placeholder="/item/ark:/..." />
          </div>

          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-5 item-ark-input" 
              type="text" 
              .value="${this.savedItems[4] ? '/item'+this.savedItems[4]['@id'].split('/item')[1] : ''}" 
              placeholder="/item/ark:/..." />
          </div>

          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-6 item-ark-input" 
              type="text" 
              .value="${this.savedItems[5] ? '/item'+this.savedItems[5]['@id'].split('/item')[1] : ''}" 
              placeholder="/item/ark:/..." />
          </div>
        </div>

        <div class="default-display">
          <h3>Default Display on Collection Item Pages</h3>

          <div class="default-item-display">
            <span class="label">Default Item Display</span>
            <fieldset class="radio default-item-display-fs">
              <div>
                <ul class="list--reset" style="padding-inline-start: 0;">
                  <li>
                    <input id="two" 
                      name="radio-default-display" 
                      type="radio" 
                      class="radio" 
                      value="Book Reader - 2 Page" 
                      ?checked="${this.itemDefaultDisplay === 'Book Reader - 2 Page'}" 
                      @change="${(e) => (this.itemDefaultDisplay = 'Book Reader - 2 Page')}">
                    <label for="two">Book Reader - 2 Page</label>
                  </li>
                  <li>
                    <input id="one" 
                      name="radio-default-display" 
                      type="radio" 
                      class="radio" 
                      value="Book Reader - Single Page" 
                      ?checked="${this.itemDefaultDisplay === 'Book Reader - Single Page'}" 
                      @change="${(e) => (this.itemDefaultDisplay = 'Book Reader - Single Page')}">
                    <label for="one">Book Reader - 1 Page</label>
                  </li>
                  <li>
                    <input id="list" 
                      name="radio-default-display" 
                      type="radio" 
                      class="radio" 
                      value="Image List" 
                      ?checked="${this.itemDefaultDisplay === 'Image List'}" 
                      @change="${(e) => (this.itemDefaultDisplay = 'Image List')}">
                    <label for="list">Image List</label>
                  </li>
                </ul>
              </div>
            </fieldset>
          </div>
          <div class="exceptions" ?hidden="${this.itemEdits.length < 1}">
            <span class="label">Exceptions</span>
            <p style="margin-top: 0.3rem; padding-bottom: 0; margin-bottom: 0;">
              Checked items in this list will be reset to the default item display when saved. 
              Display overrides can also be managed directly on an item page.
            </p>
            <fieldset style="border: none; padding-left: 0; padding-top: 0; margin-top: 0;">
              <ul class="list--reset" style="padding-inline-start: 0; width: 100%;">
                <li style="width: 30%;">
                  <input id="checkbox-all" 
                    name="checkbox-all" 
                    type="checkbox" 
                    @change="${this._onSelectAllExceptionsChange}">
                  <label for="checkbox-all">Select all exceptions</label>
                </li>

                <!-- items with exceptions set -->
                ${this.itemEdits.map((item, index) => html`
                  <li style="width: 33%;">
                    
                    <input id="checkbox${index}" 
                      name="checkbox" 
                      type="checkbox"
                      data-item-id="${item.item.split(':fedora')[1]}">
                    <label for="checkbox${index}">
                      <a href="${item.item.split(':fedora')[1]}">${item.edit.split('/').pop()}</a>
                      <span style="font-style: italic;">
                        (${item['item_default_display']})
                      </span>
                    </label>
                  </li>
                `)}
          
              </ul>
            </fieldset>
          </div>
        </div>
      
      </div>
      <div ?hidden="${this.editMode}" style="padding: 0 2rem;">
        <div class="card-trio" ?hidden="${this.itemCount < 3}">
          ${this.highlightedItems.map((item, index) => html`
            ${index < 3 ? html`<dams-item-card data-itemid="${'/item'+item['@id'].split('/item')[1]}"></dams-item-card>` : ''}
          `)}
        </div>
        <div class="card-trio" ?hidden="${this.itemCount < 6}">
          ${this.highlightedItems.map((item, index) => html`
            ${index >= 3 ? html`<dams-item-card data-itemid="${'/item'+item['@id'].split('/item')[1]}"></dams-item-card>` : ''}
          `)}
        </div>
      </div>

      <a href="${this.collectionSearchHref}" class="btn btn--primary btn--lg view-all-collections">View all collection items</a>

    </div>

    <app-citation .record="${this.citationRoot}"></app-citation>

  `;}