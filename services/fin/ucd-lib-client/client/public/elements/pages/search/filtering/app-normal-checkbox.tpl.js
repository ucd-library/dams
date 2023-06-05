import { html } from 'lit';
import { sharedStyles } from '../../../styles/shared-styles';

export default function render() { 
  return html`

<style>
  ${sharedStyles}

  :host {
    display: block;
    cursor: pointer;
  }

  :host(:focus) {
    outline: var(--default-outline);
  }

  :host([disabled]) {
    cursor: default;
    outline: none !important;
  }

  [hidden] { display: none !important; }

  iron-icon {
    display: none;
    color: var(--color-aggie-blue-80);
    min-width: 24px;
    margin-right: 2px;
  }

  div {
    user-select: none;
    display: flex;
    min-height: 24px;
    align-items: top;
  }

  span {
    padding-top: 3px;
    line-height: normal;
  }

  div[checked] iron-icon {
    display: inline-block;
  }

  div[checked] .value {
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  div[disabled] #close,
  div #close {
    display: none;
  }

  div[disabled] .value {
    color: var(--gray-text);
  }
  div[checked] #close {
    width: 50px;
    height: 50px;
    display: inline-flex;
    align-items: center;
    /* justify-content: center; */
  }
  ucdlib-icon {
    fill: var(--color-aggie-blue-80);
  }
</style>

<div ?checked="${this.checked}" ?disabled="${this.disabled}">

  <div id="close">
    <ucdlib-icon icon="ucdlib-dams:fa-xmark" @click="${this._onClick}"></ucdlib-icon>
  </div>   

  <span class="value">${this._realLabel()}</span>
</div>
`;}