import { html } from 'lit';
import { sharedStyles } from '../../styles/shared-styles';

import listsCss from "@ucd-lib/theme-sass/2_base_class/_lists.css";
import indexCss from "@ucd-lib/theme-sass/2_base_class/_index.css";
import formsHtmlCss from "@ucd-lib/theme-sass/1_base_html/_forms.css";
import formsCss from "@ucd-lib/theme-sass/2_base_class/_forms.css";


export default function render() {
  return html`
<style>
  ${sharedStyles}
  ${listsCss}
  ${indexCss}
  ${formsHtmlCss}
  ${formsCss}

  :host {
    display: block;
    position: relative;
    z-index: 500;
  }
/* 
  input,
  textarea {
    border: none;
  } */

  .icon-wrapper {
    height: 50px;
    width: 50px;
    background-color: var(--color-aggie-blue-70);
    border-radius: 50%;
    display: inline-block;
    margin-left: .3rem;
    cursor: pointer;
  }

  .icon-wrapper ucdlib-icon {
    fill: white;
    width: 50%;
    height: 50%;
    margin: auto;
    padding-top: 0.6rem;
  }

  .icon-wrapper.edit {
    background-color: var(--color-aggie-blue-80);
  }

  .icon-wrapper:hover {
    background-color: var(--color-aggie-blue);
  }

  .icon-wrapper.edit:hover {
    background-color: var(--color-aggie-gold);
  }

  .icon-wrapper.edit:hover ucdlib-icon {
    fill: var(--color-aggie-blue);
  }

  .editor-row-control {
    display: flex;
    align-items: center;
    z-index: 500;
    position: relative;
  }

  .dots {
    height: 25px;
    border-bottom: 5px dotted var(--color-dams-secondary);
    margin: -25px .5rem 0;
    
  }

  .flex-expand {
    flex: 1;
  }

  .form-content {
    width: 50%;
    margin: 0 auto;
    padding-bottom: 3rem;
  }

  .form-label {
    font-weight: bold;
  }

  .content-row,
  .collection-list {
    padding-left: 1rem;
  }

  .list--reset > li {
    display: inline-block;
    padding-right: .5rem;
  }

  fieldset {
    border: none;
  }

  .radio label:before {
    top: 5px;
    left: -1px;
  }

  .list--reset, 
  ucd-theme-slim-select,
  .description,
  .heading-text { 
    margin-top: .3rem;
  }

  .add-collection-container {
    padding-top: 1rem;
  }

  .add-collection-container ucdlib-icon {
    display: inline-block;
  }

  .add-collection-label {
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
    min-width: 175px;
  }

  .add-collection-label ucdlib-icon {
    height: 50%;
    position: relative;
    top: 5%;
    left: -5%;
    fill: var(--color-aggie-gold);
    padding-top: .5rem;
  }

  .add-collection-label:hover {
    background-color: var(--color-aggie-blue);
  }
  
  .add-collection-label span {
    position: relative;
    top: 20%;
    right: 20%;
  }

  .collection-list ucd-theme-slim-select {
    padding-top: .5rem;
  }

  /* ucdlib-icon {
    fill: white;
    width: 50%;
    height: 50%;
    margin: auto;
    padding-top: 0.6rem;      
  } */

  
</style>

<div class="editor-row-control">
    <div class="icon-wrapper edit" @click="${this._onUpArrowClicked}">
        <ucdlib-icon icon="ucdlib-dams:fa-arrow-up"></ucdlib-icon>
    </div>
    <div class="icon-wrapper edit" style="margin-left: .3rem;" @click="${this._onDownArrowClicked}">
        <ucdlib-icon icon="ucdlib-dams:fa-arrow-down"></ucdlib-icon>
    </div>
    <div class="dots flex-expand"></div>
    <div style="background-color: var(--color-aggie-blue-40); height: 75px">
        <ucdlib-icon icon="ucdlib-dams:${this.controlIcons[this.type]}" style="width: 150px; height: 100%;"></ucdlib-icon>
    </div>
    <div class="dots flex-expand"></div>
    <div class="icon-wrapper edit" @click="${this._onTrashClicked}">
        <ucdlib-icon icon="ucdlib-dams:fa-trash"></ucdlib-icon>
    </div>
</div>

<div class="form-content">
  
  <fieldset class="radio">      
    <div ?hidden="${this.type !== 'single'}">
      <span class="form-label">Feature Image</span>
      <ul class="list--reset">
        <li><input id="styled-radio1" name="radio" type="radio" class="radio" checked="checked"><label for="styled-radio1">Left</label></li>
        <li><input id="styled-radio2" name="radio" type="radio" class="radio"><label for="styled-radio2">Right</label></li>
      </ul>
    </div>

    <div ?hidden="${this.type !== 'text'}">
      <span class="form-label">Text Placement</span>
      <ul class="list--reset">
        <li><input id="styled-radio3" name="radio" type="radio" class="radio" checked="checked"><label for="styled-radio3">Centered</label></li>
        <li><input id="styled-radio4" name="radio" type="radio" class="radio"><label for="styled-radio4">Left-aligned</label></li>
        <li><input id="styled-radio5" name="radio" type="radio" class="radio"><label for="styled-radio5">Split (33/67)</label></li>
      </ul>
    </div>

  </fieldset>

  <div class="content-row">
  <div ?hidden="${this.type !== 'single'}">
    <span class="form-label">Collection</span>    
      <ucd-theme-slim-select @change="${this._collectionSelected}">
        <select>
          <option></option>
          <!-- options added in js -->
        </select>
      </ucd-theme-slim-select>
    </div>
    <div ?hidden="${this.type !== 'text'}">
      <span class="form-label">Heading</span>
      <input class="heading-text" type="text" .value=${this.heading}>
    </div>
  </div>

  <div class="collection-list" ?hidden="${this.type !== 'cards'}">
    <span class="form-label">Collections</span>
    ${this.collections.map(collection => html`
      <ucd-theme-slim-select @change="${this._collectionCardSelected}">
        <select class="collections">
          <option></option>
          <!-- options added in js -->
        </select>
      </ucd-theme-slim-select>
    `)}

    <div class="add-collection-container">
      <span class="add-collection-label" @click="${this._addCollection}">
        <ucdlib-icon icon="ucdlib-dams:fa-plus"></ucdlib-icon>
        <span>Add Collection</span> 
      </span>
    </div>  
  </div>

  <div class="content-row" style="padding-top: 2rem;" ?hidden="${this.type === 'cards'}">
    <span class="form-label">Description</span>    
    <textarea class="description" style="height: 175px; font-size: .9rem" .value="${this.description}" @change="${this._descriptionChanged}"></textarea>
  </div>
  

</div>

`;
}
