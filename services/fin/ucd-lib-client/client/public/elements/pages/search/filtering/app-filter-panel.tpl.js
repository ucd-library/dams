import { html } from 'lit';
import { sharedStyles } from '../../../styles/shared-styles';

export default function render() { 
  return html`

  <style>
    ${sharedStyles}
    :host {
      display: block;
    }

    [hidden] { display: none !important; }

    .label {
      cursor: pointer;
      display: flex;
      color: var(--default-primary-color);
      padding: 10px 0;
      font-weight: bold;
      position: relative;
      outline: none !important;
    }

    .highlight {
      position: absolute;
      left: -10px;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color:  var(--default-secondary-color);
      display: none;
    }

    .label:focus > .highlight {
      display: block;
    }

    #activeFilters > div {
      padding: 4px 5px;
    }

    .filter {
      display: flex;
      cursor: pointer;
      align-items: center;
      font-weight: bold;
      /* font-style: italic; */
    }

    iron-icon[closed] {
      transform: rotate(-90deg);
    }

    iron-icon[clear] {
      color: var(--color-aggie-blue-80);
      margin-right: 2px;
    }

    ucdlib-icon {
      fill: var(--color-aggie-blue-80);
      width: 18px;
      height: 18px;
    }

    /* JM - think this is redundant, scroll inforced by app-*-filter element */
    /* #filters {
      overflow-y: auto;
      max-height: 200px;
    } */
  </style>

  <div class="label" @click="${this._onToggleClicked}" @keyup="${this._onToggleClicked}" role="button" tabindex="0">
    <div style="flex: 1; font-size: 1.15rem">${this.filter.label}</div>
    
    <!-- <iron-icon icon="arrow-drop-down" ?closed="${!this.opened}"></iron-icon> -->
    <div style="padding-right: 1rem; padding-top: .5rem;">
      <ucdlib-icon icon="ucdlib-dams:fa-caret-right" ?hidden=${this.opened}></ucdlib-icon>
      <ucdlib-icon icon="ucdlib-dams:fa-caret-down" ?hidden=${!this.opened}></ucdlib-icon>
    </div>
    
    <div class="highlight"></div>
  </div>

  <div id="activeFilters" ?hidden="${this.opened}">
    <div ?hidden="${!this.selected.length}">

      ${this.selected.map((item, index) => html`
        <div class="filter" 
          @click="${this._onFilterClicked}"
          @keyup="${this._onFilterClicked}" 
          ?label="${item.label}"
          tabindex="0" 
          role="button">
            <!-- <iron-icon icon="fin-icons:close" clear></iron-icon> -->
            

          <div>${item.niceLabel}</div>
        </div>
      `)}

    </div>
  </div>

  <div id="filters" ?hidden="${!this.opened}"></div>

`;}