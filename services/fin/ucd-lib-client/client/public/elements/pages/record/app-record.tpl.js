import { html } from 'lit';
export default function render() {
  return html`
  <style include="shared-styles">
    :host {
      display: block;
      background-color: var(--super-light-background-color);
    }

    /*
    app-media-viewer {
      position: relative;
    }
    */

    .container.top {
      padding: 20px 0;
      background-color: var(--light-background-color);
    }

    input {
      padding: 0 0 0 5px;
      display: block;
      border: none;
      height: 38px;
    }

    .copyButton {
      white-space: nowrap;
      height: 38px;
      width: 85px;
      text-transform: uppercase;
      font-size: var(--fs-sm);
      font-weight: var(--fw-bold);
      background-color: var(--default-secondary-color);
      color: var(--default-primary-color);
      border-radius: 0;
      border: none;
      cursor: pointer;
    }
    .copyButton[active] {
      text-align: center;
      background-color: var(--default-primary-color);
      color: var(--default-secondary-color);
    }
    .copyButton[active] span {
      display: none;
    }

    h3 {
      margin: 0 0 10px 0;
      /* color: var(--default-primary-color); */
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

    .overview {
      display: flex; 
      width: 100%;
    }

    .overview > div {
      flex : 1;
      padding : 0 10px;
    }

    .type-date-collection {
      display: flex;
      /* align-items: center; */
    }

    .resource-type {
      text-transform: capitalize;
    }
    .resource-type iron-icon {
      color: var(--default-primary-color);
    }

    paper-toast {
      --paper-toast-background-color: var(--default-secondary-color);
      --paper-toast-color: var(--default-primary-color);
    }

    #descriptionValue p,
    #descriptionValue h1,
    #descriptionValue h2,
    #descriptionValue h3 {
      margin-top: 0;
    }

    #link {
      width: 100%;
      box-sizing: border-box;
    }

    .metadata-row {
      display: flex;
      margin: 30px 20px;
    }
    .metadata-row .attr {
      flex: 0.25;
      color: var(--default-primary-color);
      font-weight: var(--fw-bold); 
    }
    .metadata-row .value {
      flex: 0.75;
      word-break: break-word;
    }

    .cite-container {
      padding: 15px 0;
      margin: 0 15px;
      border-bottom: 1px dashed var(--medium-background-color);
      display: flex;
    }
    .cite-container .label {
      padding-right: 10px;
      flex: 0.25;
      color: var(--default-primary-color);
      font-weight: var(--fw-bold); 
    }
    .cite-container .text {
      flex: 0.75;
    }

    .hidden {
      display: none !important;
    }

    .fc-break {
      height: 10px;
    }

    .rights {
      font-size: var(--fs-p);
      font-style: italic;
      text-transform: capitalize;
    }

    .rights-break {
      margin-top: 10px;
      margin-bottom: 10px;
      border-top: 1px dashed var(--medium-background-color);
    }

    img[rights] {
      height: 22px;
      width: 22px;
      vertical-align: sub;
    }

    @media( max-width: 550px ) {
      .metadata-row {
        display: block;
      }
    }

    @media( max-width: 768px ) {
      .overview {
        display: block;
      }
      .cite-container {
        display: block;
        padding: 15px 0 15px 15px;
        margin: 0;
      }
      .type-date-collection {
        display: block;
      }
      .type-date-collection > div {
        margin: 15px 5px;
      }
    }
  </style>

  <app-media-viewer></app-media-viewer>

  <div class="container top">
    <div class="overview">
      <div>
        <h3>${this.name}</h3>
        
        <div ?hidden="${!this.alternativeHeadline}" class="section">
          <div style="font-weight: bold;">${this.alternativeHeadline}</div>
        </div>

        <div ?hidden="${!this.rights}" class="rights">
          <div class="rights-break"></div>
          <div>
            <a href="${this.rights.link}" target="_blank">
              <img src="${this.rights.icon}" rights />&nbsp;
              <span>${this.rights.label}</span>
            </a>
          </div>
        </div>

      </div>
      <div>
        <div style="display: flex; align-items: center" class="section bordered">
          <span class="label" style="padding-right: 10px; display:inline-block">Permalink</span>
          <div style="flex:1">
            <input id="link" type="text" />
          </div>
          <button on-click="_copyLink" id="copyButton" class="copyButton">
            <iron-icon icon="content-copy" id="copyIcon"></iron-icon>
            <span>Copy</span>
          </button>
        </div>

        <div class="section">
          <div class="label">Download</div>
          <app-media-download id="download" ?hidden="${this.isBagOfFiles}"></app-media-download>
          <app-fs-media-download id="download" ?hidden="${!this.isBagOfFiles}"></app-fs-media-download>
        </div>

      </div>
    </div><!-- end overview -->
  </div>

  <div class="container" style="padding-bottom: 50px">
    <app-record-metadata-layout>
      <div slot="left">
        <div class="metadata-row">
          <div class="attr">Collection</div>
          <div class="value" id="collectionValue"></div>
        </div>

        <div class="metadata-row">
          <div class="attr">Date</div>
          <div class="value" id="dateValue"></div>
        </div>

        <div class="metadata-row" id="publisher">
          <div class="attr">Publisher</div>
          <div class="value" id="publisherValue"></div>
        </div>

        <div class="metadata-row" id="subject">
          <div class="attr">Subject</div>
          <div class="value" id="subjectValue"></div>
        </div>

        <div class="metadata-row" id="description">
          <div class="attr">Description</div>
          <div class="value" id="descriptionValue"></div>
        </div>

        <div class="metadata-row" id="callNumber">
          <div class="attr">Call Number</div>
          <div class="value" id="callNumberValue"></div>
        </div>

        <div class="metadata-row" id="identifier">
          <div class="attr">ARK / DOI</div>
          <div class="value" id="identifierValue"></div>
        </div>

        <div class="metadata-row" id="creator">
          <div class="attr">Creator</div>
          <div class="value" id="creatorValue"></div>
        </div>

        <div class="metadata-row">
          <div class="attr">Fedora Link</div>
          <div class="value" id="fedoraValue"></div>
        </div>
      </div>
      
      <div slot="right">
        <div class="cite-container">
          <div class="label">MLA</div>
          <div class="text">
            <app-copy-cite id="mla"></app-copy-cite>
          </div>
        </div>

        <div class="cite-container">
          <div class="label">APA</div>
          <div class="text">
            <app-copy-cite id="apa"></app-copy-cite>
          </div>
        </div>

        <div class="cite-container">
          <div class="label">Chicago</div>
          <div class="text">
            <app-copy-cite id="chicago"></app-copy-cite>
          </div>
        </div>
        
      </div>
    </app-record-metadata-layout>
  </div>
  `;}
