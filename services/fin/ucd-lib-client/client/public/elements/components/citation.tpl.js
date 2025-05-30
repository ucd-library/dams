import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import SharedHtml from '../utils/shared-html';
// import sharedStylesCss from "../styles/shared-styles";
import { sharedStyles } from "../styles/shared-styles";

// import { classMap } from 'lit/directives/class-map';
// import { styleMap } from 'lit/directives/style-map';

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
  
  :host {
    display: block;
    position: relative;
    background-color: var(--super-light-background-color);
  }

  .citation {
      background-color: var(--color-aggie-blue-30);
      display: flex;
      width: 100vw;
    }

    .citation .btn-copy {
      background-color: var(--color-aggie-gold);
      cursor: pointer;
      border: none;
      min-height: 1.4rem;
      height: 1.4rem;
    }

    .citation .btn-copy:hover {
      background-color: var(--color-aggie-blue);
      color: var(--color-aggie-gold);
    }

    .citation .btn-apa {
      background-color: var(--color-aggie-blue-50);
      margin-right: .5rem;
      min-width: 8ch;
      font-size: 1rem;

      /* arrow styles */
      display: inline-block;
      margin: 0;      
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-appearance: none;
      -moz-appearance: none;      
      background-image:
        linear-gradient(45deg, transparent 50%, var(--color-aggie-blue) 50%),
        linear-gradient(135deg, var(--color-aggie-blue) 50%, transparent 50%),
        linear-gradient(to right, #ccc, #ccc);
      background-position:
        calc(100% - 20px) calc(1em + 2px),
        calc(100% - 15px) calc(1em + 2px),
        calc(100% - 2.5em) 0.5em;
      background-position-y: center;
      background-size:
        5px 5px,
        5px 5px,
        1px 1.5em;
      background-repeat: no-repeat;
      outline: 0;
      padding-right: 1.5rem;
      margin-right: .7rem;
      text-align: left;
    }

    .cite-graphic {
      margin: auto;
      width: 33%;
      margin-top: 1rem;
    }

    .citation .header-dots {
      margin: 0;
      align-items: start;
      padding-bottom: 1.25rem;
      padding-top: .25rem;
    }

    .cite-collection {
      margin: auto;
      width: 67%;
      padding: 2rem;
      overflow-wrap: break-word;
    }

    .cite-collection h2,
    .collection-highlights h2 {
      margin-bottom: 1rem;
      font-weight: 600;
      color: var(--default-primary-color);
      margin-top: 0.5rem;
    }

    .cite-collection p {
      margin-bottom: 3rem;
      margin-top: 0;
    }

    @media (max-width: 756px) {
      .cite-collection {
        width: 85%;
      }
    }

    @media (max-width: 600px) {
      .citation {
        display: block;
        padding: 2rem 0;
      }

      .cite-graphic {
        width: 70%;
      }

      .cite-collection {
        /* padding-top: 0; */
        width: 95%;
        padding: 1rem;
      }

      .cite-collection h2 { 
        font-weight: 800;
        font-size: 1.7rem;
      }

      .citation-text {
        font-size: 1.1rem;
        line-height: 1.7;
      }
    }

</style>
<div class="citation">
  <div class="cite-graphic">
    <img src="/images/watercolors/citation-watercolor-800px-landscape.png" width="100%" alt="cite this collection image" />
  </div>
  <div class="cite-collection">
    <h2>Cite This ${this.citationTypeLabel}</h2>

    ${ SharedHtml.headerDots() }

    <p class="citation-text">
      ${unsafeHTML(this.selectedCitation.text)}
    </p>

    <div style="display: flex;">
      <select class="btn btn-apa" @change="${this._citeChange}">
        <option value="apa">APA</option>
        <option value="mla">MLA</option>
        <option value="chicago">Chicago</option>
      </select>
      <div class="btn btn-copy" @click="${this._copyCiteText}">Copy Text</div>
    </div>
  </div>
  <app-toast-popup></app-toast-popup>
</div>
`;}
