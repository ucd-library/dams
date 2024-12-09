import { html, unsafeCSS } from "lit";

import { sharedStyles } from "../../styles/shared-styles";
import listsCss from "@ucd-lib/theme-sass/2_base_class/_lists.css";
import indexCss from "@ucd-lib/theme-sass/2_base_class/_index.css";
import formsHtmlCss from "@ucd-lib/theme-sass/1_base_html/_forms.css";
import formsCss from "@ucd-lib/theme-sass/2_base_class/_forms.css";

export default function render() {
  return html`
    <style>
      ${listsCss}
        ${indexCss}
        ${formsHtmlCss}
        ${formsCss}
        ${sharedStyles}
        :host {
        display: block;
      }

      [hidden] {
        display: none !important;
      }

      .info {
        margin: 10px 0;
        font-size: var(--fs-sm);
      }

      a {
        display: block;
        padding: 8px;
        color: var(--default-primary-color);
        background-color: var(--default-secondary-color);
        text-transform: uppercase;
        font-size: var(--fs-sm);
        font-weight: var(--fw-bold);
        text-decoration: none;
        white-space: nowrap;
        height: 24px;
      }

      a:focus {
        color: var(--default-primary-color);
      }

      button:focus {
        color: var(--default-primary-color);
      }

      .radio label:before {
        top: 5px;
        left: -1px;
      }

      select {
        margin-right: 15px;
        padding: 5px 40px 5px 10px;
        height: 40px;
        border: none;
        border-radius: 0;

        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        -o-appearance: none;
        appearance: none;

        background-position: right 10px center;
        background-size: 10px 6px;
        background-repeat: no-repeat;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCA2IiB3aWR0aD0iMTBweCIgaGVpZ2h0PSI2cHgiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojMDAyNjU1O308L3N0eWxlPjwvZGVmcz48Zz48cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iMCAwIDEwIDAgNSA2IDAgMCIvPjwvZz48L3N2Zz4=");
        background-color: var(--medium-background-color);
        color: var(--default-primary-color);
      }

      select.plainText {
        padding: 0;
        border: 0;
        background: transparent;
        color: black;
      }

      button {
        white-space: nowrap;
        /* text-transform: uppercase; */
        font-size: 0.9rem;
        font-weight: var(--fw-bold);
        background-color: var(--default-secondary-color);
        color: var(--default-primary-color);
        border-radius: 0;
        border: none;
        cursor: pointer;
        padding: 0.75rem 1rem;
        line-height: 1.4;
      }

      /* for IE */
      select::-ms-expand {
        display: none;
      }
      select option {
        text-transform: uppercase;
      }

      .layout {
        display: flex;
        align-items: center;
      }

      .radio {
        margin-bottom: 10px;
      }

      .downloadBtn {
        padding: 13px 0;
        font-size: 0.9rem;
        width: 6rem;
        text-transform: none;
        height: 1.5rem;
      }

      .downloadBtn:hover {
        background-color: var(--color-aggie-blue);
        color: var(--color-aggie-gold);
      }

      #format {
        height: 50px;
        background-color: var(--color-aggie-blue-50);
        font-size: 0.9rem;
        font-weight: bold;
        padding: 0 1.5rem 0 1rem;
        min-width: 35%;
        max-width: 6rem;
      }

      #media-format-label,
      #media-all-format-label,
      #multimedia-format-label {
        font-size: 0.9rem;
        margin-right: 0.75rem;
        font-weight: bold;
        padding: 11px 1rem;
        border: solid 2px var(--color-aggie-blue-50);
        height: 1.5rem;
        white-space: nowrap;
      }

      @media (max-width: 600px) {
        .downloadBtn {
          min-width: auto;
          text-overflow: clip;
          overflow: hidden;
          white-space: nowrap;
        }
      }

      #single,
      #fullset {
        display: none;
      }
    </style>

    <div id="wrapper">
      <div class="layout" ?hidden="${!this.hasMultipleDownloadMedia || this.downloadAllMedia}">
        <div class="radio" style="margin-right: 1rem">
          <input
            id="single"
            type="radio"
            name="set-size"
            checked
            @click="${this._toggleMultipleDownload}"
          />
          <label for="single">Selected Page</label>
        </div>
        <div class="radio">
          <input
            id="fullset"
            type="radio"
            name="set-size"
            @click="${this._toggleMultipleDownload}"
          />
          <label for="fullset">All Files (${this.fullSetCount})</label>
        </div>
      </div>
    </div>

    <div ?hidden="${this.fullSetSelected}">
      <div class="layout btns"
        style="margin-bottom: 5px;"
        ?hidden="${!this.selectedMediaHasSources}">
        <span id="multimedia-format-label"
          ?hidden="${!this.isMultimedia}">
        </span>
        <span id="media-format-label"
          ?hidden="${!this.showDownloadLabel || this.isMultimedia}">
        </span>
        <a class="downloadBtn"
          ?hidden="${(this.isTwoPageView || this.downloadAllMedia) && this.sources.length > 1}"
          href="${this.href}"
          @click="${this._onDownloadClicked}"
          download
          target="_blank"
          rel="noopener"
          style="white-space: nowrap; text-align: center;">
          <span> Download </span>
        </a>
        <a class="downloadBtn archive"
          ?hidden="${(!this.isTwoPageView && !this.downloadAllMedia) || this.sources.length === 1}"
          href="${this.archiveHref}"
          @click="${this._onDownloadFullSetClicked}"
          target="_blank"
          rel="noopener"
          download
          style="white-space: nowrap; text-align: center;">
          <span> Download </span>
        </a>
      </div>
    </div>

    <div ?hidden="${(this.fullSetSelected || this.isTwoPageView) && this.selectedMediaHasSources}">
      <div ?hidden="${this.selectedMediaHasSources}">
        <em>No downloadable items available</em>
      </div>
    </div>

    <div style="display: flex;">
      <span id="media-all-format-label"
        style="display: inline-block;"  
        ?hidden="${!this.fullSetSelected || !this.showDownloadLabel}">
        </span>
      <select id="format"
        style="display: inline-block"
        @change="${this._onFormatSelected}"
        ?hidden="${!this.fullSetSelected || !this.showImageFormats || this.sources.length < 2}">
      </select>
      <a class="downloadBtn archive"
        ?hidden="${!this.fullSetSelected}"
        href="${this.archiveHref}"
        @click="${this._onDownloadFullSetClicked}"
        target="_blank"
        rel="noopener"
        download
        style="white-space: nowrap; text-align: center; display: inline-block;">
        <span> Download </span>
      </a>
    </div>

    <!-- <form id="downloadZip" 
      action="/fin/archive" 
      method="get" 
      ?hidden="${!this.fullSetSelected}">    
      <input type="text" hidden name="name" value="${this.zipName}" style="display: none;">
      <input type="text" hidden name="paths" value="${this.zipConcatenatedPaths}" style="display: none;">
      <button @click="${this._onDownloadFullSetClicked}">
        <span>Download</span>
      </button>
    </form> -->

  `;
}
