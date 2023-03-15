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
    display: inline-block;
    padding-top: 3px;
    line-height: normal;
  }

  div[checked] iron-icon {
    display: inline-block;
  }

  div[checked] .value {
    /* font-style: italic; */
    font-weight: bold;
  }

  div[disabled] iron-icon {
    display: none;
  }

  div[disabled] .value {
    /* font-style: italic; */
    color: var(--gray-text);
  }
</style>

<div ?checked="${this.checked}" ?disabled="${this.disabled}">

  <!-- TODO change to ucdlib-icon -->
  <iron-icon icon="fin-icons:close"></iron-icon>

  <span class="value">${this._realLabel()}</span>
</div>
`;}