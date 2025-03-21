import { html } from "lit";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { sharedStyles } from '../styles/shared-styles';
import buttonsCss from "@ucd-lib/theme-sass/2_base_class/_buttons.css";

export default function render() {
  return html`
    <style>
      ${sharedStyles}
      ${buttonsCss}

      :host {
        display: block;
      }

      [hidden] {
        display: none !important;
      }

      .container {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
      }

      .container.error-mode .overlay {
        background-color: var(--color-double-decker);
      }

      .container.error-mode .overlay h4,
      .container.error-mode .overlay p,
      .container.error-mode .overlay a {
        color: white;
      }

      .container.error-mode .overlay .header-section ucdlib-icon {
        fill: white;
      }

      .overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 2rem;
        justify-content: center;
        align-items: center;
        width: 60%;
        margin: auto;
        max-width: 650px;
        background-color: white;
        border-radius: 25px;
      }

      .overlay h4 {
        padding: 0;
        margin: 0;
      }

      .overlay .header-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1rem;
        border-bottom: 4px dotted var(--color-aggie-gold);
      }

      .overlay .header-section h4 {
        flex-grow: 1;
        margin: 0;
      }

      .overlay .header-section ucdlib-icon {
        flex-shrink: 0;
        cursor: pointer;
        fill: var(--color-aggie-blue-80);
        width: 1.5rem;
        height: 1.5rem;
      }

      .overlay .header-section ucdlib-icon:hover {
        fill: var(--color-aggie-gold);
      }

      .overlay .footer-section {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 1rem;
      }

      .overlay .footer-buttons button {
        font-size: .9rem;
        margin-left: .6rem;
      }

      .footer-buttons a.btn--primary {
        padding-top: 0;
        padding-bottom: 0;
        margin-left: 0.5rem;
        font-size: .9rem;
      }

      button.ok {
        padding-left: 1rem;
      }

      @media (max-width: 600px) {
        .overlay .footer-section {
          display: block;
        }

        .overlay .footer-section .footer-buttons {
          display: flex;
          flex-direction: column-reverse;
        }

        .overlay .footer-buttons button {
          margin-left: 0;
          display: block;
          width: 100%;
          margin-top: 1rem;
        }

        .btn--primary:before,
        .btn--invert:before {
          padding-right: .3rem;
        }
      }

      input[type="checkbox"] {
        height: 1rem;
        width: 1rem;
      }
    </style>


    <div class="container">
      <div class="overlay">
        <div class="header-section">
          <h4>${this.title}</h4>
          <div><ucdlib-icon icon="ucdlib-dams:fa-xmark" @click="${this._onOk}"></ucdlib-icon></div>
        </div>
        <div class="body-section">
          ${unsafeHTML(this.content)}
        </div>
        <div class="footer-section">
          <div class="footer-buttons">
            <button class="btn btn--primary ok" @click="${this._onOk}">Got it!</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
