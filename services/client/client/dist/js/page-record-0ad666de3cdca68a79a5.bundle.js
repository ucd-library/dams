(self.webpackChunk=self.webpackChunk||[]).push([[704],{4941:(e,t,i)=>{"use strict";var o=i(5589),a=i(76),r=i(5988),s=i(7847),l=i(7598),n=i(1479),d=i(8083);function c(){return o.dy`
<style>
  ${s.F}
  ${l.Z}
  ${n.Z}
  ${d.Z}
  
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
      padding: .3rem;
      background-color: var(--color-aggie-gold);
      cursor: pointer;
      border: none;
    }

    .citation .btn-copy:hover {
      background-color: var(--color-aggie-blue);
      color: var(--color-aggie-gold);
    }

    .citation .btn-apa {
      background-color: var(--color-aggie-blue-50);
      margin-right: .5rem;
      min-width: 8ch;
      height: 3.18rem;

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
    }

    .cite-graphic {
      margin: auto;
      width: 33%;
      margin-top: 1rem;
    }

    .citation .header-dots {
      margin: 0;
      align-items: start;
      padding-bottom: 1rem;
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

    @media (max-width: 600px) {
      .citation {
        display: block;
      }

      .cite-graphic {
        width: 70%;
      }

      .cite-collection {
        padding-top: 0;
      }
    }

</style>
<div class="citation">
  <div class="cite-graphic">
    <img src="/images/watercolors/citation-watercolor-800px-landscape.png" width="100%" alt="cite this collection image" />
  </div>
  <div class="cite-collection">
    <h2>Cite This Collection</h2>

    ${r.Z.headerDots()}

    <p>
      ${(0,a.A)(this.selectedCitation.text)}
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
`}var h=i(353);i(4287);class p extends o.oi{static get properties(){return{record:{type:Object},recordId:{type:String},citations:{type:Array},selectedCitation:{type:Object}}}constructor(){super(),this.render=c.bind(this),this.active=!0,this.record={},this.recordId="",this.citations=[],this.selectedCitation={}}async updated(){if(!Object.keys(this.record||{}).length||this.citations.length&&this.recordId===this.record["@id"])return;this.recordId=this.record["@id"];let e=[];e.push({type:"mla",text:await h.default.renderEsRecord(this.record,"mla")}),e.push({type:"apa",text:await h.default.renderEsRecord(this.record,"apa")}),e.push({type:"chicago",text:await h.default.renderEsRecord(this.record,"chicago")}),this.citations=e,this.selectedCitation=e.filter((e=>"apa"===e.type))[0]}_citeChange(e){this.selectedCitation=this.citations.filter((t=>t.type===e.target.value))[0]}async _copyCiteText(e){try{await navigator.clipboard.writeText(this.shadowRoot.querySelector(".csl-entry").innerHTML);let e=this.shadowRoot.querySelector("app-toast-popup");e&&e.showPopup()}catch(e){console.error("Failed to copy citation: ",e)}}}customElements.define("app-citation",p)},6887:(e,t,i)=>{"use strict";i.r(t);var o=i(5589),a=i(7598),r=i(1479),s=i(8083),l=i(8030),n=i.n(l);function d(){return o.dy`
    <style include="shared-styles">
      ${a.Z} ${r.Z} ${s.Z} :host {
        display: block;
        background-color: var(--super-light-background-color);
      }

      [hidden] {
        display: none !important;
      }

      .container {
        width: 60%;
        margin: auto;
      }

      .container h3 {
        font-weight: 800;
        text-align: center;
        color: var(--color-black-60);
        margin-bottom: 0.5rem;
      }

      .copyright {
        text-align: center;
        color: var(--color-aggie-blue-80);
      }

      .copyright span {
        font-size: 1.25rem;
        vertical-align: middle;
        font-weight: bold;
      }

      .copyright-text {
        font-size: 0.875rem;
        text-decoration: underline;
        display: inline;
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

      .metadata-row,
      .download-section {
        display: flex;
        margin: 0.85rem;
      }
      .metadata-row .attr,
      .download-section .label {
        flex: 0.25;
        color: var(--default-primary-color);
        font-weight: var(--fw-bold);
      }
      .metadata-row .value,
      .download-section .download-options {
        flex: 0.75;
        word-break: break-word;
      }

      .part-of {
        background-image: url(/images/watercolors/blue--1.webp);
        background-size: cover;
        display: flex;
        min-height: 12rem;
        margin: 3rem 0;
        background-color: var(--color-aggie-blue-30);
      }

      /* .part-of img {
        max-width: 100%;
        max-height: 100%;
        height: auto;
        width: auto;
      } */

      .part-of-img-container {
        overflow: hidden;
        width: 100%;
        aspect-ratio: 4 / 3;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .part-of img {
        position: relative;
        /* top: calc(-65%); */
      }

      .part-of div {
        margin: 2rem;
        flex: 1;
      }

      .part-of div:nth-child(1) {
        text-align: center;
      }

      .part-of .collection-info {
        flex: 2;
        margin: auto 0;
      }

      .part-of .collection-info h4 {
        margin: 0.3rem 0 0;
        font-weight: 600;
      }

      .part-of .collection-info h4 a {
        color: var(--color-aggie-blue);
        text-decoration: none;
      }
      .part-of .collection-info h4 a:hover {
        text-decoration: underline;
      }

      .part-of .collection-info p {
        margin: 0;
      }

      .part-of .collection-info span {
        font-weight: 800;
        text-decoration: none;
        color: var(--color-aggie-blue-80);
      }

      #identifierValue a,
      #fedoraValue a {
        display: block;
      }

      #identifierValue a:nth-child(1),
      #fedoraValue a:nth-child(1) {
        padding-bottom: 1rem;
      }

      @media (max-width: 756px) {
        .container {
          width: 85%;
        }
      }

      @media (max-width: 600px) {
        .container {
          width: 95%;
        }

        .metadata-row,
        .download-section {
          display: block;
        }
      }

    app-record .admin-edit .left-panel {
      position: absolute;
      left: 20%;
      width: 60%;
      top: calc(170px + 3rem);
      z-index: 500;
      border-bottom: 6px dotted var(--color-aggie-gold);
      padding-bottom: 1.5rem;
    }

    app-record .admin-edit .right-panel {
      position: absolute;
      right: 3rem;
      top: calc(170px + 3rem);
      z-index: 500;
    }

    app-record .admin-edit .icon-wrapper {
      height: 50px;
      width: 50px;
      background-color: var(--color-aggie-blue-70);
      border-radius: 50%;
      display: inline-block;
      margin-left: .3rem;
      cursor: pointer;
    }

    app-record .admin-edit ucdlib-icon {
      fill: white;
      width: 50%;
      height: 50%;
      margin: auto;
      padding-top: 0.6rem;      
    }

    app-record .admin-edit .icon-wrapper.edit {
      background-color: var(--color-aggie-blue);
    }

    app-record .admin-edit .icon-wrapper:hover {
      background-color: var(--color-aggie-blue);
    }

    app-record .admin-edit .icon-wrapper.edit:hover {
      background-color: var(--color-aggie-gold);
    }

    app-record .admin-edit .icon-wrapper.edit:hover ucdlib-icon {
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

    </style>

    <div class="edit-overlay" ?hidden="${!this.editMode||!this.isUiAdmin}">
    </div>
    <div class="admin-edit" ?hidden="${!this.isUiAdmin}">
      <div class="left-panel" ?hidden="${!this.editMode||!this.isUiAdmin}">
        <span class="form-label" style="font-weight: bold;">Item Display:</span>
        <ucd-theme-slim-select
          @change="${this._ssSelectBlur}"
          @focusin="${this._ssSelectFocus}"
          @click="${this._ssSelectFocus}"
          @blur="${this._ssSelectBlur}">
          <select>
              <option .value=${this.itemDefaultDisplay} ?selected=${this.itemDisplay===this.itemDefaultDisplay}>
                Collection Default (${this.itemDefaultDisplay})
              </option>
              <option .value=${n().itemDisplayType.brTwoPage} ?selected=${this.itemDisplay!==this.itemDefaultDisplay&&this.itemDisplay===n().itemDisplayType.brTwoPage}>
                ${n().itemDisplayType.brTwoPage}
              </option>
              <option .value=${n().itemDisplayType.brOnePage} ?selected=${this.itemDisplay!==this.itemDefaultDisplay&&this.itemDisplay===n().itemDisplayType.brOnePage}>
                ${n().itemDisplayType.brOnePage}
              </option>
              <option .value=${n().itemDisplayType.imageList} ?selected=${this.itemDisplay!==this.itemDefaultDisplay&&this.itemDisplay===n().itemDisplayType.imageList}>
                ${n().itemDisplayType.imageList}
              </option>
          </select>
        </ucd-theme-slim-select>
      </div>

      <div class="right-panel">
        <div class="icon-wrapper" ?hidden="${this.editMode||!this.isUiAdmin}" @click="${this._onEditClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-pen"></ucdlib-icon>
        </div>
        <div class="icon-wrapper edit" ?hidden="${!this.editMode||!this.isUiAdmin}" @click="${this._onSaveClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-floppy-disk"></ucdlib-icon>
        </div>
        <div class="icon-wrapper edit" ?hidden="${!this.editMode||!this.isUiAdmin}" @click="${this._onCancelEditClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-xmark"></ucdlib-icon>
        </div>
      </div>
    </div>


    <app-media-viewer @br-page-change="${this._onBookViewPageChange}"></app-media-viewer>

    <div class="container" style="padding-bottom: 50px">
      <h3>${this.name}</h3>
      <div class="copyright">
        <span>&copy;</span>
        <a href="http://rightsstatements.org/vocab/InC-NC/1.0/"
          class="copyright-text">In Copyright - Non-Commercial Use Permitted</a>
      </div>

      <div class="part-of">
        <div class="part-of-img-container"><img src="${this.collectionImg}" alt="" /></div>
        <div class="collection-info">
          <p style="font-style: italic;">part of digital collection</p>
          <h4><a href="${this.collectionId}">${this.collectionName}</a></h4>
          <span>${this.collectionItemCount} items</span>
        </div>
      </div>

      <div class="download-section">
        <div class="label">Download</div>
        <div class="download-options">
          <app-media-download
            id="download"
            ?hidden="${this.isBagOfFiles}"></app-media-download>
          <app-fs-media-download
            id="download"
            ?hidden="${!this.isBagOfFiles}"></app-fs-media-download>
        </div>
      </div>

      <div ?hidden="${!this.date}" class="metadata-row">
        <div class="attr">Date</div>
        <div class="value" id="dateValue">${this.date}</div>
      </div>

      <div ?hidden="${!this.description||!this.description.length}" class="metadata-row">
        <div class="attr">Description</div>
        <div class="value" id="descriptionValue">
          <ucdlib-md id="md">
            <ucdlib-md-content>
              ${this.description}
            </ucdlib-md-content>
          </ucdlib-md>
        </div>
      </div>

      <div ?hidden="${!this.publisher}" class="metadata-row" id="publisher">
        <div class="attr">Publisher</div>
        <div class="value" id="publisherValue">${this.publisher}</div>
      </div>

      <div
        ?hidden="${!this.subjects||!this.subjects.length}"
        class="metadata-row"
        id="subject">
        <div class="attr">Subjects</div>
        <div class="value" id="subjectValue">
          ${this.subjects.map(((e,t)=>o.dy`${t>0?", ":""}<a href="${e["@id"]}"
                  >${e.name||e["@id"]}</a>`))}
        </div>
      </div>

      <div ?hidden="${!this.callNumber}" class="metadata-row" id="callNumber">
        <div class="attr">Call Number</div>
        <div class="value" id="callNumberValue">${this.callNumber}</div>
      </div>

      <div class="metadata-row" id="identifier">
        <div class="attr">ARK / DOI</div>
        <div class="value" id="identifierValue">
          ${this.arkDoi.map((e=>o.dy`<a href="${e}">${e.replace("/item","")}</a>`))}
        </div>
      </div>

      <div class="metadata-row">
        <div class="attr">Fedora Link</div>
        <div class="value" id="fedoraValue">
          ${this.fedoraLinks.map((e=>o.dy`<a href="${e}">${e.replace("/fcr:metadata","")}</a>`))}
        </div>
      </div>
    </div>

    <app-citation .record="${this.citationRoot}"></app-citation>
  `}var c=i(8077),h=i(5700),p=i(2959),u=(i(6160),i(9486),i(353),i(7310),i(4601),i(7847)),g=i(9248),m=i(5721),b=i(3205),y=i(395);function v(){return o.dy`
    <style>
      ${g.Z}
        ${m.Z}
        ${b.Z}
        ${y.Z}
        ${u.F}
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

      .layout.btns > * {
        max-width: 30%;
      }

      .radio {
        margin-bottom: 10px;
      }

      .downloadBtn {
        padding: 13px 0;
        font-size: 0.9rem;
        min-width: 6rem;
        text-transform: none;
      }

      .downloadBtn:hover {
        background-color: var(--color-aggie-blue);
        color: var(--color-aggie-gold);
      }

      .downloadBtn.archive {
        width: 115px;
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
      }

      @media (max-width: 600px) {
        .layout.btns > * {
          width: 33%;
          max-width: 33%;
        }
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
      <div class="layout" ?hidden="${!this.hasMultipleDownloadMedia||this.downloadAllMedia}">
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
          ?hidden="${!this.showDownloadLabel||this.isMultimedia}">
        </span>
        <a class="downloadBtn"
          ?hidden="${(this.isTwoPageView||this.downloadAllMedia)&&this.sources.length>1}"
          href="${this.href}"
          @click="${this._onDownloadClicked}"
          download
          target="_blank"
          rel="noopener"
          style="white-space: nowrap; text-align: center;">
          <span> Download </span>
        </a>
        <a class="downloadBtn archive"
          ?hidden="${!this.isTwoPageView&&!this.downloadAllMedia||1===this.sources.length}"
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

    <div ?hidden="${(this.fullSetSelected||this.isTwoPageView)&&this.selectedMediaHasSources}">
      <div ?hidden="${this.selectedMediaHasSources}">
        <em>No downloadable items available</em>
      </div>
    </div>

    <div style="display: flex;">
      <span id="media-all-format-label"
        style="display: inline-block;"  
        ?hidden="${!this.fullSetSelected||!this.showDownloadLabel}">
        </span>
      <select id="format"
        style="display: inline-block"
        @change="${this._onFormatSelected}"
        ?hidden="${!this.fullSetSelected||!this.showImageFormats||this.sources.length<2}">
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

  `}var f=i(6794),w=i.n(f),x=i(6343),k=i.n(x);class R extends((0,p.Mixin)(o.oi).with(p.LitCorkUtils)){static get properties(){return{defaultImage:{type:Boolean},formats:{type:Array},sources:{type:Array},href:{type:String},archiveHref:{type:String},imageSizes:{type:Array},hasMultipleDownloadMedia:{type:Boolean},selectedMediaHasSources:{type:Boolean},fullSetCount:{type:Boolean},fullSetSelected:{type:Boolean},downloadOptions:{type:Array},showImageFormats:{type:Boolean},selectedRecordMedia:{type:Object},isMultimedia:{type:Boolean},showDownloadLabel:{type:Boolean},zipConcatenatedPaths:{type:String},isTwoPageView:{type:Boolean},downloadAllMedia:{type:Boolean}}}constructor(){super(),this.render=v.bind(this),this.active=!0,this.defaultImage=!0,this.formats=[],this.sources=[],this.href="",this.archiveHref="",this.imageSizes=[],this.hasMultipleDownloadMedia=!1,this.selectedMediaHasSources=!0,this.fullSetCount=0,this.fullSetSelected=!1,this.downloadOptions=[],this.showImageFormats=!1,this.selectedRecordMedia={},this.isMultimedia=!1,this.zipConcatenatedPaths="",this.isTwoPageView=!1,this.downloadAllMedia=!1,this._injectModel("AppStateModel","MediaModel","CollectionModel")}async firstUpdated(){let e=await this.AppStateModel.getSelectedRecord();e&&this._onSelectedRecordUpdate(e)}_onSelectedRecordUpdate(e){if(!e)return;let{graph:t,clientMedia:i,selectedMedia:o,selectedMediaPage:a}=e;this.rootRecord=t.root,this.selectedMedia=o,this.clientMedia=i,this.graphIndex=t.index,this.selectedMediaPage=a,this.sources=this._getDownloadSources(),this._setDownloadHref(this.sources),this.hasMultipleDownloadMedia=this.sources.length>1,this.hasMultipleDownloadMedia&&(this.shadowRoot.querySelector("#single").checked=!0,this.shadowRoot.querySelector("#fullset").checked=!1),this.fullSetSelected=!1,0!==this.sources.length?(this.selectedMediaHasSources=!0,this.fullSetCount=this.sources.length,this._onSelectedRecordMediaUpdate(o)):this.selectedMediaHasSources=!1}_onSelectedRecordMediaUpdate(e){if(this.selectedRecordMedia=e,this.downloadOptions=[this.selectedRecordMedia],this.isMultimedia=this.downloadOptions[0]?.fileFormat?.includes("video"),this.isMultimedia){let e=this.downloadOptions[0];this.shadowRoot.querySelector("#multimedia-format-label").innerHTML=e.fileFormatSimple+" ("+k()(e.fileSize).toLowerCase()+")",this.showImageFormats=!1}else{let e=this.clientMedia.mediaGroups.filter((e=>e["@shortType"].includes("ImageList")))[0],t=this.clientMedia.mediaGroups.filter((e=>e.clientMedia?.pdf&&e.clientMedia?.pages?.length&&"pdf"===e.clientMedia?.download?.[0]?.label))[0];if(!e&&t)return this.showDownloadLabel=!0,void this._renderDownloadSingleFormat()}this._renderDownloadAllFormats(),this._renderDownloadSingleFormat()}async brPageChange(e){let{currentPage:t,onePageMode:i}=e,o=await this.AppStateModel.getSelectedRecord();if(!o)return;let a,{clientMedia:r,selectedMedia:s}=o;this.brCurrentPage=t;let l=r.mediaGroups.filter((e=>e["@shortType"].includes("ImageList")))[0];if(a=l?l.clientMedia.pages:s.clientMedia.pages,i){let e=a[t-1]?.download?.url;this.isTwoPageView=!1,e?this.href=e:this._renderDownloadSingleFormat()}else{this.isTwoPageView=!0;let e=a[t-1]?.download?.url?.replace("/fcrepo/rest",""),i=a[t]?.download?.url?.replace("/fcrepo/rest",""),o=[];e&&o.push(e),i&&o.push(i),o.length?this._setZipPaths(o):this._renderDownloadSingleFormat()}}_noSinglePageDownload(){this.zipName=this.rootRecord.name.replace(/[^a-zA-Z0-9]/g,"-").toLowerCase(),this.archiveHref="/fin/archive?paths="+this.sources.map((e=>e.url.replace("/fcrepo/rest",""))).join(",")+(this.zipName?"&name="+this.zipName:""),this.downloadAllMedia=!0;let e=[];this.sources.forEach((t=>{let i=t.url.split(".").pop();e.includes(i)||e.push(i)})),this.shadowRoot.querySelector("#media-format-label").innerHTML="image ("+e.join(", ")+")"}_getDownloadSources(){let e=[];return this.clientMedia.mediaGroups.forEach((t=>{t.clientMedia?.download&&t.clientMedia.download.forEach((t=>{e.push(t)}))})),e}_setDownloadHref(e=[]){if(!e.length)return;this.href="",this.archiveHref="";let t=this.shadowRoot.querySelector("#fullset").checked,i=this.clientMedia.mediaGroups.filter((e=>e["@shortType"].includes("ImageList")))[0],o=this.clientMedia.mediaGroups[0]?.clientMedia?.download?.[0]?.url;if(t||this.isTwoPageView)this.zipName=this.rootRecord.name.replace(/[^a-zA-Z0-9]/g,"-").toLowerCase(),this.archiveHref="/fin/archive?paths="+e.map((e=>e.url.replace("/fcrepo/rest",""))).join(",")+(this.zipName?"&name="+this.zipName:"");else if(this.AppStateModel.location.fullpath===this.rootRecord["@id"])this.href=i?.clientMedia?.download?.[0]?.url||o;else{let e=this.selectedMediaPage||0;this.href=i?.clientMedia?.download?.[e]?.url||o}}_renderDownloadSingleFormat(){let e=[],t=!1;this.sources.forEach((i=>{let o=i.label||i.url.split(".").pop();e.includes(o)||"pdf"===o||e.push(o),"pdf"===o&&(t=!0)})),t&&e.length>0&&(t=!1);let i=this.sources.find((e=>e.url===this.href))?.fileSize;this.showDownloadLabel=!0;let o=t?"pdf ":"";e.length&&(o+=e.join(", ")+" "),i&&(o+="("+k()(i).toLowerCase()+")"),this.shadowRoot.querySelector("#media-format-label").innerHTML=o}_renderDownloadAllFormats(){let e=[],t=!1;if(this.sources.forEach((i=>{let o=i.label||i.url.split(".").pop();"pdf"===o&&(t=!0);let a=e.filter((e=>e.format===o))[0];a?a.fileSize+=i.fileSize:e.push({format:o,fileSize:i.fileSize})})),t&&e.length>1)this.showImageFormats=!0,this.shadowRoot.querySelector("#format").innerHTML="",e.forEach((e=>{let t=document.createElement("option");t.innerHTML=e.format+" ("+k()(e.fileSize).toLowerCase()+")",t.value=e.format,this.shadowRoot.querySelector("#format").appendChild(t)})),this.showDownloadLabel=!1;else{this.showDownloadLabel=!0;let t="";e.length&&(t+=e.map((e=>e.format)).join(", ")+" "),t+="("+(k()(e.reduce(((e,t)=>e+t.fileSize),0))||"").toLowerCase()+")",this.shadowRoot.querySelector("#media-format-label").innerHTML=t,this.shadowRoot.querySelector("#media-all-format-label").innerHTML=t}}_getImageFormat(e){if(!e||!e.url)return;if(!(e=this.graphIndex[e.url.split("/fcrepo/rest")[1]]))return;let t=(e.fileFormat||e["@id"]?.split(".").pop()||e?.split(".").pop()||"").replace(/.*\//,"").toLowerCase();return"jpeg"===t&&(t="jpg"),t}_onFormatSelected(){let e=this.shadowRoot.querySelector("#format").value,t=this.sources.filter((t=>t.label===e));this._setZipPaths(t.map((e=>e.url.replace("/fcrepo/rest",""))))}_toggleMultipleDownload(){this.fullSetSelected=!!this.shadowRoot.querySelector("#fullset").checked;let e=this.shadowRoot.querySelector("#format").value,t=this.sources.filter((t=>t.label===e||!e)),i=[];if(this.fullSetSelected?this.showDownloadLabel=!1:this.showDownloadLabel=!0,this.brCurrentPage&&!this.fullSetSelected){let e;t=this.sources.filter((e=>"pdf"!==e.label)),this.brCurrentPage>1&&(e=t[this.brCurrentPage-1]?.url?.replace("/fcrepo/rest",""));let o=t[this.brCurrentPage]?.url?.replace("/fcrepo/rest","");e&&i.push(e),o&&this.isTwoPageView&&i.push(o)}else i=t.map((e=>e.url.replace("/fcrepo/rest","")));this._setZipPaths(i)}_setZipPaths(e=[]){this.zipName=this.rootRecord.name.replace(/[^a-zA-Z0-9]/g,"-").toLowerCase(),e.length&&(this.zipConcatenatedPaths=e.join(","),this.zipPaths=e,this.archiveHref=`/fin/archive?paths=${this.zipConcatenatedPaths}${this.zipName?"&name="+this.zipName:""}}`)}async _onDownloadFullSetClicked(e){let t=this.rootRecord["@id"].replace(w().fcrepoBasePath,"");gtag("event","download",{event_category:"fullset",event_label:t,value:1})}_onDownloadClicked(){let e=this.href.replace(w().fcrepoBasePath,"");gtag("event","download",{event_category:this.sourceType,event_label:e,value:1})}}function S(){return o.dy`

<style>
  :host {
    display: block;
  }

  .layout {
    display:flex; 
    align-items: center;
  }

  .layout.btns > * {
    width: 33%
  }

  .radio {
    margin-bottom: 10px;
  }

  a {
    cursor: pointer;
    display: inline-block;
    padding: 8px 12px 8px 8px;
    color : var(--default-primary-color);
    background-color : var(--default-secondary-color);
    text-transform: uppercase;
    font-size: var(--fs-sm);
    font-weight: var(--fw-bold);
    text-decoration: none;
    white-space: nowrap;
    height: 24px;
  }
  a iron-icon {
    vertical-align: middle;
  }
</style> 

<div id="wrapper">
  <div class="layout">
    <div class="radio" style="margin-right: 40px">
      <input id="single" type="radio" name="set-fs-dl-type" checked @click="${this._toggleMultipleDownload}" /> 
      <label for="single">Single</label>
    </div>
    <div class="radio">
      <input id="archive" type="radio" name="set-fs-dl-type" @click="${this._toggleMultipleDownload}"/> 
      <label for="archive">Archive</label>
    </div>
  </div>
</div>

<a id="downloadBtn" @click="${this._onDownloadClicked}" @keyup="${this._onDownloadClicked}" tabindex="0">
  ${this._renderDownloadBtn(this.mode)}
</a>

<app-fs-viewer></app-fs-viewer>

`}function _(){return o.dy`

<style>
  :host {
    display: none;
    position: absolute;
    z-index: 10000;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    /* animation: 300ms linear fs-viewer-animate-in; */
  }

  @keyframes fs-viewer-animate-in {
    0% {
      transform: scale(1.2);
      opacity: 0.5
    }
    100% {
      transform: scale(1);
      opacity: 1
    }
  }

  .layout {
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    justify-content: center;
  }

  .content {
    margin: 50px 0;
    height: calc(100vh - 100px);
    width: 700px;
    background-color: var(--super-light-background-color);
    display: flex;
    flex-direction: column;
  }

  h2 {
    margin: 0;
  }

  .content-body {
    flex: 1;
    padding: 20px;
  }

  .header-layout {
    color: var(--default-primary-color);
    background-color: var(--light-background-color);
    padding: 20px;
    display: flex;
  }

  .header-image {
    margin-right: 20px;
  }

  .header-image .img, .header-image iron-icon[icon="fin-icons:various-outline-stacked"] {
    height: 100px;
    width: 100px;
  }

  #searchInput {
    font-size: 16px;
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    padding: 0 5px;
    background: white;
    border: none;
    height: 45px;
    outline: none;
    background-color: white;
    border-radius: 0;
  }

  .row {
    /* height: 100%; */
  }

  .vs-row[hover] {
    background-color: var(--color-light-yellow);
  }

  .row {
    cursor: pointer;
    /* background-color: var(--color-light-yellow); */
  }

  .row > div {
    display: flex;
    align-items: center;
    height: 100%;
    margin: 0 8px;
    border-bottom: 1px solid var(--medium-background-color);
  }

  .row[selected] {
    background-color: var(--color-light-yellow);
  }

  .row .directory {
    font-size: 11px; 
    line-height: 12px; 
    color: #888;
    margin-bottom: 6px;
  }

  .row .icon {
    width: 30px;
  }

  .row .filesize {
    width: 75px;
  }

  .row .icon, .row .filesize {
    padding: 6px 0;
  }

  /* .row .file {
    flex: 1;
  } */

  .row .directory, .row .filename {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .row .selected-file {
    width: 25px;
  }

  button.search {
    background-color: white;
    color: var(--default-secondary-color);
    border: none;
    margin: 0;
    padding: 5px;
    height: 45px;
  }

  iron-icon[icon="home"] {
    cursor: pointer;
    color: var(--default-secondary-color);
  }

  iron-icon[icon="chevron-right"] {
    color: var(--medium-background-color);
  }

  iron-icon[icon="folder"] {
    color: var(--color-aggie-blue);
  }
  iron-icon[icon="fin-icons:image-solid"] {
    color: var(--color-aggie-gold);
  }
  iron-icon[icon="fin-icons:video-solid"] {
    color: var(--color-pinot);
  }
  iron-icon[icon="fin-icons:sound-solid"] {
    color: var(--color-redbud);
  }
  iron-icon[icon="fin-icons:text-solid"] {
    color: var(--color-putah-creek);
  }
  iron-icon[icon="fin-icons:spreadsheet-solid"] {
    color: var(--color-quad);
  }
  iron-icon[icon="fin-icons:pdf-solid"] {
    color: var(--double-decker);
  }
  iron-icon[icon="fin-icons:compressed-solid"] {
    color: var(--color-poppy);
  }
  iron-icon[icon="fin-icons:file-solid"] {
    color: var(--color-grey);
  }
  iron-icon[icon="check"] {
    color: var(--default-secondary-color);
  }

  .table-header {
    display: flex;
    font-size: var(--fs-p);
    color: var(--color-grey);
    font-style: italic;
    padding: 10px 0;
  }

  .table-header > div {
    padding-left: 5px;
  }

  .breadcrumbs {
    color: var(--default-primary-color);
  }

  .breadcrumbs .breadcrumb {
    cursor: pointer;
  }

  app-virtual-scroller {
    flex: 1;
    background-color: white;
  }

  .break {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed var(--medium-background-color);
  }

  .footer {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }

  .cancel-btn {
    border: 1px solid var(--default-secondary-color);
    color: var(--default-primary-color);
    padding: 6px 10px;
    margin: 0 15px 0 0;
    background-color: transparent;
    border-radius: 0;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 20px;
    cursor: pointer;
  }

  .download-btn {
    border: 1px solid var(--default-secondary-color);
    background-color: var(--default-secondary-color);
    color: var(--default-primary-color);
    padding: 6px 10px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
  }
  /* .download-button:visited {
    color: var(--default-primary-color);
  } */

  a[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 700px) {
    .content {
      margin: 0;
      flex: 1;
      width: 100%;
      height: calc(100vh);
    }
  }
</style>

<div class="layout">
<div class="content">

  
    <div class="header-layout">
      <div class="header-image">
        <iron-icon icon="fin-icons:various-outline-stacked" ?hidden="${this.thumbnail}"></iron-icon>
        <div class="img" style="background-image: url(${this.thumbnail}); background-size: cover; background-position: center center;" ?hidden="${!this.thumbnail}" ></div>
      </div>
      <div style="flex:1">
        <h2>${this.title}</h2>
        <div>${this.files.length} files</div>
        <div style="display: flex">
          <input id="searchInput" type="text" placeholder="Search Files" @keyup="${this._onInputKeyup}" />
          <button class="search">
            <iron-icon icon="${"search"===this.mode?"close":"fin-icons:search"}" @click="${this._onClearSearchClicked}"></iron-icon>
          </button>
        </div>
      </div>
    </div>

    <div class="content-body">
      <div class="breadcrumbs">
        <iron-icon icon="home" @click="${this._onBreadcrumbClicked}" dir="/"></iron-icon>
        ${this._renderBreadcrumbs()}
      </div>

      <div class="break"></div>

      <div class="table-header">
        <div style="flex:1">Name</div> 
        <div style="width: 115px">Size</div>
      </div>
      <app-virtual-scroller item-height="${this.lineHeight}" .items="${this.files}"></app-virtual-scroller>

      <div class="footer">
        <div style="flex: 1"></div>
        <div>
          <button class="cancel-btn" @click="${this.hide}">Cancel</button>
        </div>
        <div>
          <a class="download-btn" ?disabled="${!this.selectedFile}" href="${this.selectedFile}" target="_blank">Download</a>
        </div>
      </div> <!-- footer -->
    </div>


</div> <!-- content -->
</div> <!-- layout -->

`}function M(){return o.dy`

<style>
  app-virtual-scroller {
    display: block;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  app-virtual-scroller .app-virtual-scroller-scroll-panel {
    position: relative;
    /* border: 2px solid red; */
  }
</style>  

<div class="app-virtual-scroller-scroll-panel">
  ${this.renderItems()}
</div>

`}customElements.define("app-media-download",R);class C extends o.oi{static get properties(){return{itemHeight:{type:Number,attribute:"item-height"},items:{type:Array},renderedItems:{type:Array}}}constructor(){super(),this.render=M.bind(this),this.itemHeight=20,this.renderedItems=[],this.items=[],this.height=-1,this._onResize=this._onResize.bind(this),this.addEventListener("scroll",(()=>this._onViewportUpdate()))}firstUpdated(){this.positionEle=this.querySelector(".app-virtual-scroller-scroll-panel")}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this._onResize),this._cacheHeight()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this._onResize)}createRenderRoot(){return this}_onResize(e){this._cacheHeight(!0)}_cacheHeight(e=!0){this.height=this.offsetHeight,!0===e&&this._onViewportUpdate()}setItemRenderer(e,t){this.renderItem=e,this.renderItemScope=t||this}updated(e){e.has("items")&&(this.scrollTop=0,this.totalScrollHeight=this.itemHeight*this.items.length,this.positionEle.style.height=this.itemHeight*this.items.length+"px"),(e.has("itemHeight")||e.has("items"))&&this._onViewportUpdate(!0)}_onViewportUpdate(e=!1){this.height<=0&&this._cacheHeight(!1);let t=Math.floor(this.scrollTop/this.itemHeight)-1;t<0&&(t=0);let i=t+Math.ceil(this.height/this.itemHeight)+2;if(i>=this.items.length&&(i=this.items.length),this.firstItem===t&&this.lastItem===i&&!1===e)return;if(this.itemHeight*(i-1)>this.height&&this.scrollTop+this.height+5>this.totalScrollHeight)return;this.firstItem=t,this.lastItem=i;let o=[];for(let e=t;e<i;e++)o.push({index:e,top:this.itemHeight*e});this.renderedItems=o,Array.from(this.querySelectorAll(".vs-row")).forEach((e=>e.removeAttribute("hover")))}renderItems(){return this.renderedItems.length>this.items.length?o.dy``:this.renderedItems.map((e=>e.index>=this.items.length?o.dy``:o.dy`
        <div
          class="vs-row"
          @mouseover="${this._onRowMouseOver}"
          @mouseout="${this._onRowMouseOut}" 
          style="position: absolute; left: 0; right: 0; top: ${e.top}px; height: ${this.itemHeight}px">
          ${this.renderItem.apply(this.renderItemScope,[e.index])}
        </div>`))}_onRowMouseOver(e){e.currentTarget.setAttribute("hover","true")}_onRowMouseOut(e){e.currentTarget.removeAttribute("hover")}renderItem(e){throw new Error("You must override this method")}}customElements.define("app-virtual-scroller",C),i(7349);const $={folder:["folder"],"fin-icons:image-solid":["tif","tiff","gif","jpg","jp2","jpeg","webp","bmp","png"],"fin-icons:video-solid":["avi","mp4","flv","wmv","mov"],"fin-icons:sound-solid":["wav","mp3","mid","aif"],"fin-icons:text-solid":["doc","docx","txt","rtf",".odt"],"fin-icons:spreadsheet-solid":["ods","csv","tsv","xsl","xslx"],"fin-icons:pdf-solid":["pdf"],"fin-icons:compressed-solid":["zip","rar","arj","gz","tgz"]};class B extends((0,p.Mixin)(o.oi).with(p.LitCorkUtils)){static get properties(){return{title:{type:String},loadingFiles:{type:Boolean},loadingSearch:{type:Boolean},currentDir:{type:String},files:{type:Array},selectedFile:{type:String},mode:{type:String},thumbnail:{type:String},lineHeight:{type:Number}}}constructor(){super(),this.render=_.bind(this),this.reset(),this._injectModel("AppStateModel","RecordModel"),this.iconMap={};for(let e in $)for(let t of $[e])this.iconMap[t]=e;window.addEventListener("resize",(()=>this._onResize()))}firstUpdated(){this.contentBody=this.shadowRoot.querySelector(".content-body"),this.scrollPanel=this.shadowRoot.querySelector("app-virtual-scroller"),this.scrollPanel.setItemRenderer(this.renderRow,this),this.parentNode.removeChild(this),document.body.appendChild(this),this.filenameWidth="30px"}updated(e){if(e.has("selectedFile")){for(let e of this.files)e.selected=e.fullUrl===this.selectedFile;this.scrollPanel.requestUpdate()}}_onResize(){this.contentBody&&(window.innerWidth>700?this.scrollPanel.style.height=window.innerHeight-335-100+"px":this.scrollPanel.style.height=window.innerHeight-335+"px",this.filenameWidth=this.scrollPanel.offsetWidth-155+"px",this.scrollPanel.requestUpdate())}_onAppStateUpdate(e){if(this.selectedRecord!==e.selectedRecord){if(!e.selectedRecord)return this.reset();this.reset(),this.selectedRecord=e.selectedRecord,this.selectedRecordMedia=e.selectedRecordMedia,this.selectedRecord&&this.selectedRecord.selectedMedia["@type"].includes("http://digital.ucdavis.edu/schema#BagOfFiles")&&(this._browseDirectory(),this.title=this.selectedRecord.root.name||this.selectedRecord.root.title,this.thumbnail=this.selectedRecord.root.thumbnailUrl||"")}}async show(){this.style.display="block",document.body.style.overflow="hidden",this._onResize(),this._onAppStateUpdate(await this.AppStateModel.get()),setTimeout((()=>{this._onResize(),this.scrollPanel._onResize()}),50)}hide(){this.style.display="none",document.body.style.overflow="auto"}reset(){this.selectedRecord=null,this.loadingFiles=!1,this.loadingSearch=!1,this.currentDir="/",this.files=[],this.lineHeight=41,this.selectedFile=""}_renderBreadcrumbs(){if("search"===this.mode)return o.dy`<iron-icon icon="chevron-right"></iron-icon>
      <span class="breadcrumb">Search Results</span>`;let e=[];return this.currentDir.replace(/^\//,"").split("/").map((t=>(e.push(t),""===t?o.dy``:o.dy`<iron-icon icon="chevron-right"></iron-icon>
        <a class="breadcrumb" @click="${this._onBreadcrumbClicked}" dir="${"/"+e.join("/")}">${t}</a>`)))}renderRow(e){let t=this.files[e],i=this._getIcon(t);return o.dy`
      <div class="row" style="height: ${this.lineHeight-1}px" ?directory="${t.isDirectory}" ?selected="${t.selected}" index="${e}" @click="${this._onItemClicked}" .context="${this}">
        <div>
          <div class="icon">
            <iron-icon icon="${i}"></iron-icon>
          </div>
          <div class="file" style="width: ${this.filenameWidth}">
            <div class="filename">${t.filename}</div>
            <div class="directory" ?hidden="${"browse"===this.mode}">${t.directory||"/"}</div>
          </div>
          <div class="filesize">${void 0!==t.fileSize?k()(t.fileSize):"-"}</div>
          <div class="selected-file">
            <iron-icon icon="check" ?hidden="${!t.selected}"></iron-icon>
          </div>
        </div>
      </div>
    `}_getIcon(e){let t=e.isDirectory?"folder":(e.filename||"").split(".").pop();return this.iconMap[t]||"fin-icons:file-solid"}_onItemClicked(e){let t=parseInt(e.currentTarget.getAttribute("index")),i=e.currentTarget.context,o=i.files[t];o.isDirectory?i._browseDirectory(o["@id"].replace(i.selectedRecord["@id"],"")):i.selectedFile=o.fullUrl}_onInputKeyup(e){let t=e.currentTarget.value;this._autocompleteTimer&&clearTimeout(this._autocompleteTimer),this._autocompleteTimer=setTimeout((()=>{this._autocompleteTimer=null,this._typeaheadSearch(t)}),300)}async _typeaheadSearch(e){if(this.typeaheadSearchText=e,""===e)return this.files=[],void this._browseDirectory();this.mode="search",this.lineHeight=52,this.selectedFile="";let t={text:e,filters:{collectionId:{type:"keyword",value:[this.selectedRecord.collectionId],op:"or"},"@id":{type:"prefix",value:this.selectedRecord["@id"]}},sort:null,limit:9999,offset:0,facets:{},textFields:["filename"]},i=await this.RecordModel.typeaheadSearch(t,{allRecords:!0});this.typeaheadSearchText===e&&this.setFiles(i.payload.results,!1)}async _browseDirectory(e){if("browse"===this.mode&&this.currentDir===e)return;this.mode="browse",this.lineHeight=45,this.shadowRoot.querySelector("#searchInput").value="",this.selectedFile="",e||(e=this.currentDir?this.currentDir:"/"),this.currentDir=e;let t={filters:{directParent:{type:"keyword",value:[this.selectedRecord["@id"]+this.currentDir.replace(/\/$/,"")],op:"or"}},sort:null,limit:9999,offset:0,facets:{},textFields:[]},i=await this.RecordModel.typeaheadSearch(t,{debug:!0,allRecords:!0});this.setFiles(i.payload.results)}setFiles(e,t=!0){e=e.map((e=>(e.directory=e.directParent.replace(this.selectedRecord["@id"],""),e["@type"].includes("http://fedora.info/definitions/v4/repository#Binary")?e.isFile=!0:(e.isDirectory=!0,e.filename=e["@id"].split("/").pop()),e.fullUrl=this._getFullFileUrl(e),e.selected=e.fullUrl===this.selectedFile,e))),t&&e.sort(((e,t)=>e.filename.toLowerCase()>t.filename.toLowerCase()?1:-1)),this.files=e}_getFullFileUrl(e){return window.location.protocol+"//"+window.location.host+"/fcrepo/rest"+e["@id"]}_onClearSearchClicked(){this._browseDirectory(this.currentDir)}_onBreadcrumbClicked(e){this._browseDirectory(e.currentTarget.getAttribute("dir"))}}customElements.define("app-fs-viewer",B);class I extends((0,p.Mixin)(o.oi).with(p.LitCorkUtils)){static get properties(){return{mode:{type:String}}}constructor(){super(),this.render=S.bind(this),this.mode="single",this._injectModel("AppStateModel")}async firstUpdated(){this.fsViewer=this.shadowRoot.querySelector("app-fs-viewer"),this._onAppStateUpdate(await this.AppStateModel.get())}_onAppStateUpdate(e){this.selectedRecord=e.selectedRecord,this.selectedRecordMedia=e.selectedRecordMedia}_toggleMultipleDownload(e){this.mode=e.currentTarget.id}_onDownloadClicked(e){if("keyup"!==e.type||13===e.which)if("single"===this.mode)this.fsViewer.show();else if(this.selectedRecordMedia.clientMediaDownload){let e=this.selectedRecordMedia.clientMediaDownload;Array.isArray(e)&&(e=e[0]),"object"==typeof e&&(e=e["@id"]),e="/fcrepo/rest/"+e,open(e,"_blank")}else{let e="/api/zip/bag-of-files"+this.selectedRecordMedia["@id"];open(e,"_blank")}}_renderDownloadBtn(e){return"single"===this.mode?o.dy`<iron-icon icon='file-download'></iron-icon> Browse for file`:o.dy`<iron-icon icon='file-download'></iron-icon> Download Archive`}}customElements.define("app-fs-media-download",I);var T=i(76);function D(){return o.dy`
    <style>
      ${g.Z} ${m.Z} ${b.Z} ${y.Z} :host {
        display: block;
        position: relative;
        box-sizing: border-box;
      }

      [hidden] {
        display: none !important;
      }

      .wrapper {
        /* display: flex; */
        /* flex-direction: column; */
        /* min-height:250px; */
      }

      #bagoffiles {
        text-align: center;
      }

      #bagoffiles iron-icon {
        width: 100%;
        height: 100%;
        max-width: 150px;
        max-height: 150px;
        color: var(--color-grey);
      }

      img {
        max-width: 100%;
      }

      app-bookreader-viewer.fullscreen {
        background-color: white;
        position: fixed;
        padding: 0px;
        margin: 0px;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 3000;
      }

      #br-search-input,
      #br-search-input:focus {
        border: none;
      }

      .search-side-panel .overflow::-webkit-scrollbar {
        width: 10px;
      }
      .search-side-panel .overflow::-webkit-scrollbar-track {
        background: var(--color-aggie-gold-70);
        /* border-left: 4px solid var(--color-aggie-gold-70);
        border-right: 4px solid var(--color-aggie-gold-70); */
      }
      .search-side-panel .overflow[no-overflow]::-webkit-scrollbar-track {
        background: transparent;
        border: none;
      }
      .search-side-panel .overflow::-webkit-scrollbar-thumb {
        border-radius: 6px;
        background: var(--color-aggie-gold);
      }

      /* basic support for FF. Chrome/Safari should support -webkit styles above */
      @supports (scrollbar-color: red blue) {
        .search-side-panel * {
          scrollbar-color: var(--color-aggie-gold) var(--color-aggie-gold-70);
          scrollbar-width: thin;
        }
      }

      .search-result .searched-term {
        border: 2px solid var(--color-redbud);
        padding: 1px 4px;
        color: var(--color-redbud);
        font-weight: bold;
      }

      .search-side-panel.off-canvas--left {
        transform: translateX(-105%);
      }

      .search-side-panel {
        position: absolute;
        top: 1.8rem;
        width: 350px;
        height: 570px;
        background: var(--color-aggie-gold-40);
        z-index: 1000;
        border-radius: 0 30px 30px 0;
        box-shadow: 0px 3px 6px #00000029;
        transition: all 0.3s;
      }

      .search-side-panel.fullscreen {
        position: fixed;
        top: 1rem;
        left: 0;
        width: 350px;
        background: var(--color-aggie-gold-40);
        z-index: 3000;
        border-radius: 0 30px 30px 0;
        height: calc(90vh - 100px);
        box-shadow: 0px 3px 6px #00000029;
        transition: all 0.3s;
      }

      .search-collapse-btn {
        width: 40px;
        height: 40px;
        display: inline-block;
        margin: auto;
        background-color: var(--color-aggie-blue-70);
        border-radius: 50%;
        float: right;
        cursor: pointer;
      }

      .search-collapse-btn ucdlib-icon {
        margin: auto;
        vertical-align: middle;
        text-align: center;
        fill: var(--color-aggie-gold-40);
        padding-top: 0.6rem;
      }

      .search-side-panel.fullscreen .search-content {
        overflow: auto;
        max-height: calc(90vh - 250px);
        overflow-y: scroll;
        padding: 1rem;
        padding-bottom: 0;
      }

      .search-side-panel .search-content {
        overflow: auto;
        max-height: 430px;
        overflow-y: scroll;
        padding: 1rem;
        padding-bottom: 0;
        background-color: var(--color-aggie-gold-40);
      }

      #br-search-input {
        width: 90%;
        margin: 0 0 1rem;
        font-weight: bold;
        font-size: 0.9rem;
        padding-left: 1rem;
        color: var(--color-aggie-blue-90);
      }

      .search-clear-btn {
        width: 50px;
        height: 50px;
        display: inline-block;
        margin: auto;
        border-radius: 50%;
        float: right;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0.4rem;
      }
      .search-clear-btn ucdlib-icon {
        margin: auto;
        vertical-align: middle;
        text-align: center;
        fill: var(--color-aggie-blue-90);
        padding-top: 0.6rem;
      }
    </style>

    <div class="wrapper" style="position: relative;">
      <app-image-viewer-lightbox id="lightbox"></app-image-viewer-lightbox>

      <ucdlib-pages
        selected="${this.mediaType}"
        attr-for-selected="id"
        selectedAttribute="visible">
        <!-- <app-360-image-viewer id="360"></app-360-image-viewer> -->
        <div id="bagoffiles">
          <iron-icon
            icon="fin-icons:various-outline-stacked"
            ?hidden="${this.bagOfFilesImage}">
          </iron-icon>
          <img
            src="${this.bagOfFilesImage}"
            ?hidden="${!this.bagOfFilesImage}"
          />
        </div>
        <app-image-viewer id="image"></app-image-viewer>
        <app-bookreader-viewer
          id="bookreader"
          .fullscreen="${this.brFullscreen}"
          .bookData="${this.bookData}"
          bookItemId="${this.bookItemId}"
          ?brsinglepage="${this.singlePage}"
          @br-page-change="${this._onBookViewPageChange}"
          @br-cancel-search="${this._onClearSearch}">
        </app-bookreader-viewer>
        <app-video-viewer id="video"></app-video-viewer>
        <app-audio-viewer id="audio"></app-audio-viewer>
      </ucdlib-pages>

      <div
        class="search-side-panel ${this.brFullscreen?"fullscreen":""} ${this.brSearchOpen?"":"off-canvas--left"}"
        ?hidden="${!this.isBookReader}"
      >
        <div>
          <div style="padding: 1rem;">
            <h2 style="color: var(--color-aggie-blue); display: inline;">
              Search Inside
            </h2>
            <div class="search-collapse-btn" @click="${this._onToggleBRSearch}">
              <ucdlib-icon
                icon="ucdlib-dams:fa-chevron-left"
                tabindex="0"
                icon="chevron-left"
                alt="Collapse search panel"
              >
              </ucdlib-icon>
            </div>
          </div>

          <div class="search-content overflow">
            <div style="position: relative">
              <input
                type="text"
                id="br-search-input"
                @change="${this._onBRSearch}"
              />

              <div class="search-clear-btn" @click="${this._onClearSearch}">
                <ucdlib-icon
                  icon="ucdlib-dams:fa-xmark"
                  tabindex="0"
                  icon="fa-xmark"
                  alt="Cancel search"
                >
                </ucdlib-icon>
              </div>
            </div>
            <div style="text-align: center;">
              <span style="font-size: .8rem; font-style: italic; "
                >${this.searchResultsCount}
                result${1===this.searchResultsCount?"":"s"}</span
              >
            </div>

            ${this.searchResults.map(((e,t)=>o.dy`
                <div
                  class="search-result"
                  style="margin: 0 0 2rem; cursor: pointer;"
                  data-match-index="${e.matchIndex}"
                  data-array-index="${t}"
                  @click="${this._onSearchResultClick}"
                >
                  <h4 style="margin-bottom: 0">
                    Page ${parseInt(e.displayPageNumber.replace("n",""))+1}
                  </h4>
                  <p style="font-size: .9rem; margin-top: .3rem">
                    ${(0,T.A)(e.text.replace("{{{",'<span class="searched-term">').replace("}}}","</span>"))}
                  </p>
                </div>
              `))}
          </div>
        </div>
      </div>

      <app-media-viewer-nav
        ?hidden="${!this.mediaType||"audio"===this.mediaType}"
        .isBookReader="${this.isBookReader}"
        .hideZoom="${"bookreader"===this.mediaType||"video"===this.mediaType}"
        .searchResults="${this.searchResults}"
        ?brsinglepage="${this.singlePage}"
        overrideImageList="${this.overrideImageList}"
        @zoom-in="${this._onZoomIn}"
        @br-bookview-toggle="${this._onToggleBookView}"
        @br-expand-view="${this._onExpandBookView}"
        @br-collapse-view="${this._onCollapseBookView}"
        @br-search-toggle="${this._onToggleBRSearch}"
        @br-zoom-in="${this._onBRZoomIn}"
        @br-zoom-out="${this._onBRZoomOut}"
        @br-change-search-result="${this._onChangeSearchResult}"
      >
      </app-media-viewer-nav>
    </div>
  `}function z(){return o.dy`
    <style>
      :host {
        display: block;
        padding: 20px 0;
        box-sizing: border-box;
      }

      .layout {
        text-align: center;
        height: 600px;
      }

      #img {
        max-width: 100vw;
        object-fit: contain;
      }

      [hidden] {
        display: none !important;
      }

      .spinner {
        position: relative;
        top: 300px;
        left: 0;
        width: 100vw;
        /* height: 100vh; */
        display: flex;
        justify-content: center;
        align-items: center;
        background-color:  transparent;
        transition: opacity 0.75s, visibility 0.75s;
      }

      .spinner:after {
        content: '';
        width: 30px;
        height: 30px;
        border: 5px solid  var(--color-aggie-gold-70);
        border-top-color: var(--color-aggie-gold);
        border-radius: 50%;
        animation: loading 0.75s ease infinite;
      }

      @keyframes loading {
        from {
          transform: rotate(0turn); 
        }
        to {
          transform: rotate(1turn);
        }
      }
    </style>

    <div class="spinner" ?hidden="${!this.loading}"></div>

    <div class="layout" style="line-height: 0; height: ${this.height}">
      <img ?hidden="${this.loading}" id="img" style="height: ${this.height}" />
    </div>
  `}i(9100);class P extends((0,p.Mixin)(o.oi).with(p.LitCorkUtils)){static get properties(){return{record:{type:Object},media:{type:Object},loading:{type:Boolean},height:{type:String},hasMultipleImages:{type:Boolean}}}constructor(){super(),this.active=!0,this.render=z.bind(this),this._injectModel("AppStateModel","MediaModel"),this.record={},this.media={},this.loading=!1,this.height="600px",this.hasMultipleImages=!1}async firstUpdated(){await this.AppStateModel.get();let e=await this.AppStateModel.getSelectedRecord();e&&this._onSelectedRecordUpdate(e)}_onSelectedRecordUpdate(e){if(!e)return;let{graph:t,clientMedia:i,selectedMedia:o,selectedMediaPage:a}=e;this.mediaType=n().getMediaType(o),"ImageList"!==this.mediaType&&"ImageObject"!==this.mediaType||(this.loading=!0,this.media=o.clientMedia?.pages?.filter((e=>e.page===a))[0],this.media||(this.media=o.clientMedia.images),this._renderImg())}async _renderImg(){if(this.media){let e="";if(this.media.small?.url&&(e+=`${this.media.small.url} ${this.media.small.size.width}w,`),this.media.medium?.url&&(e+=`${this.media.medium.url} ${this.media.medium.size.width}w,`),this.media.large?.url&&(e+=`${this.media.large.url} ${this.media.large.size.width}w,`),this.media.original?.url){let t=await this.getImageSize(this.media.original);if(e+=`${this.media.original.url} ${t.width}w`,"ImageObject"===this.mediaType){let e=600,i=t.height/t.width*window.innerWidth;this.height=i>e?e+"px":i+"px"}}else this.height="600px";let t="600px";this.shadowRoot.querySelector("#img").srcset=e,this.shadowRoot.querySelector("#img").sizes=t,this.shadowRoot.querySelector("#img").style.height="600px",this.shadowRoot.querySelector("#img").addEventListener("load",(()=>{this.loading=!1}))}}getImageSize(e){return e.size?e.size:new Promise(((t,i)=>{let o=new Image;o.src=e.url,o.onload=()=>{t(e.size={height:o.naturalHeight,width:o.naturalWidth})}}))}destroy(){this.shadowRoot.querySelector("#img").srcset=""}}customElements.define("app-image-viewer",P),i(1699),i(426);var A=i(1727),F=(i(4986),i(41)),E=i.n(F);let q=i(7647);function U(){return o.dy`
    <style>
      ${q} :host {
        display: block;
        /* background: black; */
        padding: 20px 0;
        /* position: relative; */
        box-sizing: border-box;
        position: relative;
      }

      #loading {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      img {
        width: 100%;
      }

      .layout {
        text-align: center;
      }

      [hidden] {
        display: none !important;
      }

      #BookReader {
        background-color: transparent;
      }

      #BookReader > div.BRtoolbar.header {
        display: none;
      }

      .BRbookcover {
        box-shadow: none;
      }

      .BRcontrols .scrubber .BRpager.ui-slider {
        background-color: #ccc;
      }

      .BRnav .BRpager .ui-slider-handle {
        background: #022851;
      }

      /* hide toolbar controls other than slider */
      .BRcontrols .controls .book_left,
      .BRcontrols .controls .book_right,
      .BRcontrols .controls .onepg,
      .BRcontrols .controls .twopg,
      .BRcontrols .controls .thumb,
      .BRcontrols .controls .icon-thumb,
      .BRcontrols .controls .viewmode,
      .BRcontrols .controls .zoom_out,
      .BRcontrols .controls .zoom_in,
      .BRcontrols .controls .full {
        display: none;
      }

      .BRnav,
      .BRcontrols .controls {
        background-color: transparent;
        border-top: none;
        box-shadow: none;
      }

      .BRcontrols .scrubber {
        height: 40px;
        margin: auto;
      }

      .BRcontrols .scrubber p {
        color: #022851;
      }

      .fullscreen .BRcontrols {
        width: 97%;
        margin: auto;
      }

      .BRcontrols {
        width: calc(60% + 30px);
        margin: 0 calc(20% - 30px) 0 calc(20%);
      }


      .BRcontrols .controls {
        padding-left: 0;
        padding-right: 0;
        /* flex-direction: row-reverse; */
      }

      /* .BRcurrentpage-override  */
      .BRcurrentpage-override {
        margin: 0;
        font-size: 0.9rem;
        display: inline-block;
        position: relative;
        bottom: 6px;
      }

      .BRcurrentpage {
        display: none;
      }

      #prev,
      #next {
        width: 50px;
        height: 75px;
        display: inline-flex;
        vertical-align: sub;
        justify-content: center;
        cursor: pointer;
      }

      .zooms-in,
      .zooms-out {
        display: none;
      }

      .fullscreen .BRfooter {
        background-color: var(--color-aggie-blue-30);
        height: 75px;
      }

      .br-search {
        position: absolute;
        bottom: 75px;
        left: 0;
        /* width: 91px; */
        background-color: var(--color-aggie-blue-30);
        height: 75px;
        padding-right: 0.9rem;
      }

      .br-search div {
        display: inline-block;
      }

      .br-search div.zoom {
        background-color: var(--color-aggie-blue);
        border-radius: 50%;
        display: inline-block;
        width: 50px;
        height: 50px;
        margin-left: 25px;
        margin-top: 12.5px;
      }

      .br-search div.zoom.searching {
        background-color: var(--color-aggie-gold);
      }

      .br-search div.zoom {
        cursor: pointer;
      }

      .br-search ucdlib-icon {
        height: 50px;
        margin: auto;
      }

      .br-search .zoom ucdlib-icon {
        fill: white;
      }

      .br-search div.zoom.searching ucdlib-icon {
        fill: var(--color-aggie-blue);
      }

      .br-search::after {
        position: absolute;
        right: -1rem;
        top: 0;
        width: 1.8rem;
        height: 100%;
        background-color: var(--color-aggie-blue-30);
        content: "";
        transform: skewX(196deg);
      }

      #BookReader.fullscreen {
        height: 100%;
      }

      .BookReader .BRsearch:before,
      .BRmobileMenu .BRsearch:before,
      .BRfloat .BRsearch:before {
        width: 8px;
        height: 17px;
        background: var(--color-aggie-gold);
        bottom: -2px;
      }

      .BookReader .BRquery,
      .BRmobileMenu .BRquery,
      .BRfloat .BRquery,
      .BookReader .BRchapter > div,
      .BRmobileMenu .BRchapter > div,
      .BRfloat .BRchapter > div {
        bottom: calc(100% + 17px);
      }

      .BRprogresspopup {
        display: none;
      }

      .BookReader .searchHiliteLayer rect,
      .BRmobileMenu .searchHiliteLayer rect,
      .BRfloat .searchHiliteLayer rect {
        stroke: var(--color-redbud);
        stroke-width: 3;
        fill: #f555b140;
        fill-opacity: 0.6;
      }

      .BookReader .searchHiliteLayer rect,
      .BRmobileMenu .searchHiliteLayer rect,
      .BRfloat .searchHiliteLayer rect {
        animation: none;
      }

      .BookReader .BRquery b,
      .BRmobileMenu .BRquery b,
      .BRfloat .BRquery b {
        color: var(--color-thiebaud-icing);
        font-weight: bold;
        background-color: none;
      }

      #BookReader .BRcontainer {
        padding-bottom: 1rem;
      }

      .BookReader .BRsearch-navigation, 
      .BRmobileMenu .BRsearch-navigation, 
      .BRfloat .BRsearch-navigation {
        display: none;
      }

      .br-mode-1up__root {
        overflow: hidden;
      }

      .BRwordElement {
        color: transparent !important; /* transparent / red */
      }

      @media (max-width: 767px) {
        /* mobile */
        .BRcontrols {
          width: 92%;
          margin: 0 0 0 calc(5%);
        }
      }
    </style>

    <button class="zooms-in" @click="${this._zoomIn}">Zoom In</button>
    <button class="zooms-out" @click="${this._zoomOut}">Zoom Out</button>

    <div style="height: ${this.height}px" id="BookReader" ?fullscreen=${this.fullscreen}></div>

    <div id="prev" @click="${this._prevPage}">
      <ucdlib-icon icon="ucdlib-dams:fa-caret-left"></ucdlib-icon>
    </div>

    <span class="BRcurrentpage-override"></span>

    <div id="next" @click="${this._nextPage}">
      <ucdlib-icon icon="ucdlib-dams:fa-caret-right"></ucdlib-icon>
    </div>
  `}i(1807),i(4827);var j=i(8031);const N=E()(A.ZP);class O extends((0,c.Z)(o.oi).with(h.C,p.LitCorkUtils)){static get properties(){return{loading:{type:Boolean},height:{type:Number},fullscreen:{type:Boolean},bookData:{type:Object},bookItemId:{type:String}}}constructor(){super(),this.active=!0,this.render=U.bind(this),this._injectModel("AppStateModel","MediaModel"),this.bookData={},this.bookItemId="",this.loading=!1,this.height=634,this.onePage=!1,this.fullscreen=!1,this.viewportMultiplier=3.7,window.addEventListener("BookReader:SearchCallback",this._onSearchResultsChange.bind(this)),window.addEventListener("BookReader:SearchCallbackEmpty",this._onSearchResultsEmpty.bind(this))}firstUpdated(e){window.innerWidth<801&&(this.onePage=!0)}willUpdate(e){"item"===this.AppStateModel.location.page&&this.bookData?.pages&&this._renderBookReader()}_onAppStateUpdate(e){window.innerWidth<801&&(this.onePage=!0),"item"!==e.location.page&&(this.bookData={},this.iaInitialized=!1,this.onePage=!1,this.dispatchEvent(new CustomEvent("br-cancel-search",{detail:{onePageMode:this.onePage,closeSearch:!0}})))}_renderBookReader(e=!1){requestAnimationFrame((()=>{try{this._renderBookReaderAsync(e)}catch(e){}this._movePrevNext();let t=document.querySelector(".BRpager");j(t).on("slidechange",this._updateCurrentPageLabel.bind(this)),window.addEventListener("BookReader:1PageViewSelected",this._singlePageLoad.bind(this));let i=document.querySelector(".scrubber"),o=document.querySelector(".controls"),a=document.querySelector("app-media-viewer-nav")?.shadowRoot?.querySelector(".page-toggle");this.bookData.pages.length<2?(i.style.display="none",o.style.flexDirection="row-reverse",a?.style&&(a.style.display="none")):(i.style.display="",o.style.flexDirection="",a?.style&&(a.style.display=""))}))}_singlePageLoad(e){setTimeout((()=>{this.zoomed||(this.br.resize(),this.zoomed=!0)}),25)}_movePrevNext(){let e=document.querySelector("#prev"),t=document.querySelector("#next"),i=document.querySelector(".BRcurrentpage"),o=document.querySelector(".BRcurrentpage-override");if(this._updateCurrentPageLabel(),!i.parentElement.querySelector("#prev")&&!i.parentElement.querySelector("#next")&&!i.parentElement.querySelector(".BRcurrentpage-override")){let a=e.cloneNode(!0),r=o.cloneNode(!0),s=t.cloneNode(!0);a.style.display="inline-flex",s.style.display="inline-flex",r.style.display="inline-block",a.addEventListener("click",this._prevPage.bind(this)),s.addEventListener("click",this._nextPage.bind(this)),e.style.display="none",t.style.display="none",o.style.display="none",i.parentElement.prepend(a),i.parentElement.append(r),i.parentElement.append(s)}this.navUpdated=!0}async _prevPage(){await this.br.left(),this.br.resize()}async _nextPage(){await this.br.right(),this.br.resize()}_updateCurrentPageLabel(){let e=document.querySelector(".BRcurrentpage"),t=document.querySelector(".BRcurrentpage-override"),i=e.innerHTML.replace("(","").replace(")","");t&&(t.innerHTML=i),this.dispatchEvent(new CustomEvent("br-page-change",{detail:{onePageMode:this.onePage,currentPage:parseInt(i.split(" ")[0])}}))}_toggleBookView(){this.onePage=!this.onePage,this.br.switchMode(this.onePage?1:2),this._updateCurrentPageLabel(),this.br.resize()}_zoomIn(e,t=1){this.br.zoom(t)}_zoomOut(e,t=-1){this.br.zoom(t)}_renderBookReaderAsync(e=!1){if((this.iaInitialized||!this.bookData.pages)&&!e)return;this.iaInitialized=!0;let t=[],i=9999,o=634;e&&this.fullscreen&&(o=window.innerHeight),this.height=o;let a=document.querySelector("#BookReader").offsetWidth;console.log({offsetHeight:o,offsetWidth:a}),this.bookData.pages.forEach((e=>{let r=Number(e[e.ocr?.imageSize]?.size?.width||0),s=Number(e[e.ocr?.imageSize]?.size?.height||0),l=a/r,n=o/s,d=Math.min(l,n);s*d<i&&(i=s*d),t.push([{width:r,height:s,uri:e[e.ocr?.imageSize]?.url,ocr:e.ocr?.url}])})),o>i&&(document.querySelector("#BookReader").style.height=i+"px");let r="";window.location.host.match(/:\d+$/)&&(r=":"+window.location.host.split(":")[1]);let s={el:"#BookReader",data:t,bookTitle:"BookReader Presentation",thumbnail:t[0].uri,plugins:{textSelection:{enabled:!0,singlePageDjvuCallback:e=>t[e]?.[0]?.ocr,singlePageDjvuXmlUrl:"no-op"}},showToolbar:!1,server:window.location.host,searchInsideUrl:r+"/api/page-search/ia",searchInsideProtocol:window.location.protocol.replace(":",""),padding:20,ui:"full"};this.attributes.brsinglepage&&(this.onePage=!0),this.br=new N(s),this.br.init(),this.br.switchMode(this.onePage?1:2),this.br.resize(),this.requestUpdate()}_onSearchResultsChange(e){let t=e.detail?.props?.results,i=document.querySelector("app-media-viewer-nav");i&&(i.searchResultsCount=t.matches.length,console.log("nav.searchResultsCount",i.searchResultsCount))}_onSearchResultsEmpty(e){let t=document.querySelector("app-media-viewer-nav");t&&(t.searchResultsCount=0,console.log("nav.searchResultsCount",t.searchResultsCount))}search(e){this.br&&(this.br.bookId=this.bookItemId,this.br.search(e))}onSearchResultClick(e){let t=parseInt(e.currentTarget?.attributes["data-match-index"]?.value||0);this.br._searchPluginGoToResult(t)}onSearchPrevNext(e){this.br._searchPluginGoToResult(e,!1)}destroy(){let e=this.querySelector("#BookReader");e&&(e.innerHTML="")}}customElements.define("app-bookreader-viewer",O);var H=i(4291);function V(){return o.dy`
    <style>
        :host {
            display: block;
            box-sizing: border-box;
            width: 60%;
            margin: auto;
        }

        .container {
            padding: 10px;
        }

        video {
            max-width: 100%;
            height: auto;
            max-height: 600px;
        }

        .plyr__video-wrapper {
            text-align: center;
        }

        .plyr--full-ui input[type=range] {
            color: #daaa00 !important;
        }

        button.plyr__control.plyr__control--overlaid,
        button.plyr__control.plyr__control:hover {
            background: rgba(218,170,0,1.0) !important;
        }

        .plyr__control:focus {
            background: rgba(218,170,0,1.0) !important;
        }
        .plyr--full-ui input[type=range] {
            padding: 2px !important;
            border: 1px solid transparent !important;
        }
        .plyr--full-ui input[type=range]:focus {
            border: 1px dashed rgba(218,170,0,1.0) !important;
        }
        .plyr__tab-focus {
            outline: 0 !important;
            background: transparent !important;
        }

        @media(max-width: 768px) {
            :host {
                width: 90%;
            }
        }
    </style>
    
    <div class="container">
        <div id="sprite-plyr" style="display: none;"></div> 
        <video ?hidden="${!this.libsLoaded}" id="video" playsinline controls crossorigin>
            ${(0,H.r)(this.tracks,(e=>o.dy`<track kind="${e.kind}" label="${e.label}" src="${e.src}" srclang="${e.srclang}" default="${e.default}" />`))}
        </video>
    </div>
`}const Z=new class{async load(){return this.loaded?this.loaded:this.loading?(await this.loading,this.loaded):(this.loading=new Promise((async(e,t)=>{const o=(await i.e(969).then(i.t.bind(i,6818,23))).default,a=await i.e(969).then(i.t.bind(i,7319,23));await a.polyfill.installAll(),this.loaded={plyr:o,shaka:a},e(this.loaded)})),this.loading)}};var W=i(1802),G=i.n(W),X=i(8097),Y=i.n(X),K=i(6855),J=i.n(K);let Q=G()+Y(),ee=J();class te{constructor(e){}remove(){return!0}destroy(){}append(e){}setTextVisibility(e){}isTextVisible(){return!1}}class ie extends((0,p.Mixin)(o.oi).with(p.LitCorkUtils)){static get properties(){return{player:{type:Object},tracks:{type:Array},libsLoaded:{type:Boolean}}}constructor(){super(),this.render=V.bind(this),this._injectModel("AppStateModel","MediaModel"),this.tracks=[],this.player={},this.libsLoaded=!1}_onAppStateUpdate(e){this.fullPath!==e.location.fullpath&&this._stop(),e.selectedRecord&&(this.fullPath=e.location.fullpath,this._onSelectedRecordMediaUpdate(e.selectedRecord.clientMedia?.mediaGroups[0]))}async firstUpdated(e){this._onAppStateUpdate(await this.AppStateModel.get()),requestAnimationFrame((async()=>{ee.indexOf("data:image/svg+xml;base64")>-1&&(ee=atob(ee.replace("data:image/svg+xml;base64,",""))),this.shadowRoot.querySelector("#sprite-plyr").innerHTML=ee;let e=document.createElement("style");e.innerHTML=Q,window.ShadyDOM&&window.ShadyDOM.inUse?(document.head.appendChild(e),this.hideControls=!1):(this.shadowRoot.appendChild(e),this.hideControls=!0)}))}async _onSelectedRecordMediaUpdate(e){if(!e)return;let t=n().getMediaType(e);if("VideoObject"!==t&&"StreamingVideo"!==t)return;if(this.media=e,this.tracks=n().asArray(e,"caption").filter((e=>void 0!==e["@id"])).map((e=>{let t=e.language,i="en"===t;return{kind:"captions",label:n().getLanguage(t),srclang:t,src:e["@id"],default:i}})),this.libsLoaded)return void this._loadVideo();let{plyr:i,shaka:o}=await Z.load(),a=i.supported("video","html5",!0),r=o.Player.isBrowserSupported();if(!a||!r)return alert("Your browser does not support video playback");let s=this.shadowRoot.getElementById("video");this.plyr=new i(s,{hideControls:this.hideControls,fullscreen:{enabled:!1},captions:{update:!1},controls:["play-large","play","progress","current-time","mute","volume"]}),this.shaka=new o.Player(s),this.shaka.configure({textDisplayFactory:te}),this.shaka.addEventListener("error",(e=>console.error("shaka error",e))),this.libsLoaded=!0,await this._loadVideo()}async _loadVideo(){if(!this.media)return;let e=n().getMediaType(this.media),t=w().fcrepoBasePath+this.media["@id"];this.media.clientMedia?.streamingVideo?.manifest?t=this.media.clientMedia.streamingVideo.manifest:"StreamingVideo"===e&&(t+="/playlist.m3u8");try{await this.shaka.load(t)}catch(e){console.error("Error code: ",e.code,"object",e)}}_stop(){this.shadowRoot.querySelector("#video").pause(),void 0!==this.plyr&&null!==this.plyr&&0!=Object.entries(this.plyr).length&&this.plyr.stop()}}function oe(){return o.dy`
<style>
  :host {
    display: none;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
  }

  :host app-share-btn {
    fill: var(--color-aggie-blue-80);
  }

  .button {
    background-color: var(--color-aggie-blue-80);
    border-radius: 50%;
    display: inline-block;
    width: 50px;
    height: 50px;
    margin-left: 0.4rem;
  }

  .container {
    display: block;
    width: 100%;
  }

  #audio_poster {
    display: none;
    margin: 0 auto;
    margin-bottom: 10px;
    max-width: 400px;
    height: 400px;
    border: 1px solid black;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .layout {
    display: flex;
    justify-content: center;
    border-bottom: 6px dotted var(--color-aggie-gold);
    width: 60%;
    margin: 0 auto;
    padding-bottom: 0.7rem;
  }

  .plyr--audio {
    max-width: 500px !important;
    width: 100%;
    border-radius: 5px;
  }

  .plyr--full-ui input[type=range] {
    color: #daaa00 !important;
  }

  button.plyr__control.plyr__control--overlaid, 
  button.plyr__control.plyr__control:hover {
    background: var(--color-dams-secondary, #FFBF00);
  }
  .plyr--full-ui input[type=range] { 
    color: var(--color-dams-secondary, #FFBF00) !important;
  }

  .volume-icon {
    fill: var(--color-aggie-blue-50, #B0D0ED);
    height: 107px;
    margin: 0 auto;
  }

  @media(max-width: 768px) {

  }

  ${G()}
</style>
<div class="container">
  <ucdlib-icon class="volume-icon" icon="ucdlib-dams:fa-volume-high"></ucdlib-icon>
  <div id="sprite-plyr" style="display: none;"></div>
  <div id="audio_poster"></div>

  <div class="layout">
    <audio id="audio_player" controls>
      <source>
    </audio>
    <div class="button"><app-share-btn></app-share-btn></div>
  </div>

</div>
`}function ae(){return o.dy`

<style include="shared-styles">
  ${u.F}

  :host {
    display: inline-block;
    position: relative;
    width: 48px;
    height: 48px;
  }

  [hidden] { display: none !important; }

  #popup {
    display: block;
    z-index: 2005;
    background: var(--color-aggie-blue-30);
    padding: 10px;
    position: absolute;
    bottom: 70px;
    right: -20px;
    min-width: 325px;
  }

  /* #popup::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 150%;
    left: 0;
    top: 0;
    z-index: -1;
    border: 1px solid green;    
  } */

  .layout {
    display: flex;
    justify-content: center;
  }

  input {
    font-size: var(--fs-p);
    padding: 0 0 0 5px;
    display: block;
    border: none;
    height: 38px;
    outline: none;
  }

  #link {
    width: 100%;
    border-top: 1px solid var(--medium-background-color);
    border-left: 1px solid var(--medium-background-color);
    border-bottom: 1px solid var(--medium-background-color);
    box-sizing: border-box;
  }

  .social {
    margin: 8px;
    display: inline-block;
    cursor: pointer;
    height: 40px;
    width: 40px;
    border: 2px solid transparent;
    outline: none;
  }
  .social:focus {
    border: var(--default-outline);
    border-radius: 20px;
  }

  .copyButton {
    white-space: nowrap;
    height: 38px;
    text-transform: uppercase;
    font-size: var(--fs-sm);
    font-weight: var(--fw-bold);
    background-color: var(--default-secondary-color);
    color: var(--default-primary-color);
    border-radius: 0;
    border: none;
    cursor: pointer;
    padding: 0 5px;
  }
  .copyButton[active] {
    text-align: center;
    background-color: var(--default-primary-color);
    color: var(--default-secondary-color);
  }
  .copyButton[active] span {
    display: none;
  }

  #main {
    color: var(--default-secondary-color);
  }

  .arrow-down {
    position: absolute;
    width: 0; 
    height: 0; 
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 20px solid var(--color-aggie-blue-30);
    bottom: -20px;
    right: 27px;
  }

  paper-icon-button:focus {
    border-radius: 0 !important;
  }

  ucdlib-icon {
    fill: white;
    width: 25px;
    height: 50px;
    margin: auto;
    cursor: pointer;
  }

  .icon {
    text-align: center;
    margin: .5rem;
  }

  .icon ucdlib-icon {
    /* width: 37px; */
    height: 60px;
  }

  .circle {
    /* background-color: orange; */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin: auto;
    cursor: pointer;
  }

  .circle.copy {
    background-color: var(--color-aggie-gold);
  }
  .circle.facebook {
    background-color: #3b5998;
  }
  .circle.twitter {
    background-color: black;
  }
  .circle.pinterest {
    background-color: #cb2027;
  }

  .icon span {
    font-size: .7rem;
  }
</style>

<div id="popup" ?hidden="${!this.visible}" @click="${this._clickPopop}">
  <div class="layout">
      <div class="icon">
        <div class="circle copy"
          @click="${this._onCopyLink}">
          <ucdlib-icon icon="ucdlib-dams:fa-link"></ucdlib-icon>
        </div>
        <span>Copy Link</span>
      </div>

      <div class="icon">
        <div class="circle facebook" id="facebook"
          @click="${this._onSocialIconClick}">
          <ucdlib-icon icon="ucdlib-dams:fa-facebook-f"></ucdlib-icon>
        </div>
      <span>Facebook</span>
    </div>

    <div class="icon">
        <div class="circle twitter" id="twitter"
          @click="${this._onSocialIconClick}">
          <ucdlib-icon icon="ucdlib-dams:fa-x-twitter"></ucdlib-icon>
        </div>
      <span>X (Twitter)</span>
    </div>
    <div class="icon">
      <div class="circle pinterest" id="pinterest"
        @click="${this._onSocialIconClick}">
        <ucdlib-icon icon="ucdlib-dams:fa-pinterest-p"></ucdlib-icon>
      </div>
      <span>Pinterest</span>
    </div>
  </div>
  <div class="arrow-down"></div>
</div>

<ucdlib-icon 
  icon="ucdlib-dams:fa-share" 
  @click="${this._onShareSelected}">
</ucdlib-icon>

<app-toast-popup></app-toast-popup>
`}customElements.define("app-video-viewer",ie),i(4287);const re={facebook:"https://www.facebook.com/sharer/sharer.php",twitter:"https://twitter.com/intent/tweet",pinterest:"https://pinterest.com/pin/create/button/"};class se extends((0,p.Mixin)(o.oi).with(p.LitCorkUtils)){static get properties(){return{visible:{type:Boolean}}}constructor(){super(),this.render=ae.bind(this),this.active=!0,this.visible=!1,this._injectModel("AppStateModel","MediaModel","RecordModel")}_onAppStateUpdate(e){"item"!==e.location.page&&(this.visible=!1)}_onShareSelected(e){this.visible=!this.visible,e.preventDefault(),e.stopPropagation()}_clickPopop(e){e.stopPropagation()}async _onCopyLink(e){try{await navigator.clipboard.writeText(window.location.href);let e=this.shadowRoot.querySelector("app-toast-popup");e&&e.showPopup()}catch(e){console.error("Failed to copy url: ",e)}}_onSocialIconClick(e){let t=this.AppStateModel.getSelectedRecord(),i=t.selectedMedia;if("keyup"===e.type&&13!==e.which)return;let o=e.currentTarget.id,a=re[o],r={},s=i.name||i.title||t.name||t.title||t.graph.root.name;if("pinterest"===o){let e,i=t.clientMedia?.mediaGroups?.[0]?.clientMedia?.images;e=i?.originalMedia?.missing||!i?.originalMedia?.url?i?.large?.url||i?.medium?.url||i?.small?.url:i?.originalMedia?.url,e&&(r.media=window.location.protocol+"//"+window.location.host+e),r.description=s,r.url=window.location.href}else if("facebook"===o)r.u=window.location.href;else{if("twitter"!==o)throw new Error("Unknown social media type: "+o);{let e=s+" - "+window.location.href+" #UCDavisLibrary #DigitalCollections";if(e.length>280){let t=e.length+3-280;s=s.substr(0,s.length-t)+"...",e=s+" - "+window.location.href+" #UCDavisLibrary #DigitalCollections"}r.text=e}}a+=this._createQs(r),window.open(a,"_blank","height=400,width=500")}_createQs(e){let t=[];for(let i in e)t.push(i+"="+encodeURIComponent(e[i]));return"?"+t.join("&")}_copyLink(){this.shadowRoot.querySelector("#link").focus(),this.shadowRoot.querySelector("#link").setSelectionRange(0,9999),document.execCommand("Copy"),this.shadowRoot.querySelector("#copyIcon").icon="check",this.shadowRoot.querySelector("#copyButton").setAttribute("active","active"),setTimeout((()=>{this.shadowRoot.querySelector("#copyIcon").icon="content-copy",this.shadowRoot.querySelector("#copyButton").removeAttribute("active","active")}),3e3)}}customElements.define("app-share-btn",se);let le=G()+Y(),ne=J();class de extends((0,p.Mixin)(o.oi).with(p.LitCorkUtils)){static get properties(){return{}}constructor(){super(),this.render=oe.bind(this),this._injectModel("AppStateModel","MediaModel"),this.libsLoaded=!1,this.$={}}_onAppStateUpdate(e){this.fullPath!==e.location.fullpath&&this._stop(),this.fullPath=e.location.fullpath,this._updateStyles()}async firstUpdated(e){this.$.audio=this.shadowRoot.getElementById("audio_player"),this.$.poster=this.shadowRoot.getElementById("audio_poster");let t=await this.AppStateModel.getSelectedRecord();t&&t.selectedMedia&&this._onSelectedRecordMediaUpdate(t.selectedMedia),this.fullPath=(await this.AppStateModel.get()).location.fullpath,ne.indexOf("data:image/svg+xml;base64")>-1&&(ne=atob(ne.replace("data:image/svg+xml;base64,",""))),this.shadowRoot.querySelector("#sprite-plyr").innerHTML=ne,this._updateStyles()}_updateStyles(){let e=document.createElement("style");e.innerHTML=le,window.ShadyDOM&&window.ShadyDOM.inUse?(document.head.appendChild(e),this.hideControls=!1):(this.shadowRoot.appendChild(e),this.hideControls=!0)}async _onSelectedRecordMediaUpdate(e){if(!e)return;if("AudioObject"!==n().getMediaType(e))return;if(this.media=e,this.libsLoaded)return void this._loadAudio();let{plyr:t}=await Z.load();this.audioPlayer=new t(this.$.audio,{fullscreen:{enabled:!1},captions:{update:!1},controls:["play-large","play","progress","current-time","mute","volume"]}),this.style.display="block",this.libsLoaded=!0,this._loadAudio(),this._updateStyles()}_loadAudio(){let e=this.shadowRoot.querySelector("#audio_player source");e.src=w().fcrepoBasePath+this.media["@id"],e.type=this.media.fileFormat||this.media.hasMimeType||this.media.encodingFormat||"";try{this.audioPlayer.stop();let e=this.shadowRoot.querySelector('input[type="range"][data-plyr="seek"]');e&&(e.value=0)}catch(e){}this.shadowRoot.querySelector("#audio_player").load();let t=this.media.thumbnailUrl?this.media.thumbnailUrl+"/svc:iiif/full/,400/0/default.jpg":"";t?(this.$.poster.style.display="block",this.$.poster.style.backgroundImage="url("+t+")"):this.$.poster.style.display="none"}_stop(){this.audioPlayer&&this.audioPlayer.stop()}}function ce(){return o.dy`
    <style include="shared-styles">
      ${u.F} :host {
        display: block;
      }

      :host([single-image]) {
        background-color: transparent;
        padding: 0 8px 8px 8px;
      }

      :host([single-image]) paper-icon-button,
      :host([single-image]) app-share-btn,
      :host app-share-btn,
      :host paper-icon-button {
        fill: var(--color-aggie-blue-80);
      }

      [hidden] {
        display: none !important;
      }
      
      input {
        padding: 15px;
        display: block;
        width: 90%;
        border: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 1rem;
        background: white;
        border: none;
        height: 61px;
        outline: none;
        font-size: 0.8rem;
        font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial,
          sans-serif;
        font-weight: 500;
      }

      .layout {
        display: flex;
        align-items: center;
        /* flex-wrap: wrap; */
        width: 60%;
        margin: auto;
        padding-bottom: 0.7rem;
        border-bottom: 6px dotted var(--color-aggie-gold);
      }

      .layout.lightbox {
        border-bottom: none;
        background-color: var(--color-aggie-blue-30);
        width: 100%;
        padding-bottom: 0;
        height: 5rem;
      }

      .layout.fullscreen {
        border-bottom: none;
        padding-top: 0.5rem;
        margin: 0;
        width: auto;
      }

      #thumbnailInnerContainer {
        padding-top: 7px;
      }

      #thumbnails {
        overflow: hidden;
      }

      #thumbnails > div {
        white-space: nowrap;
        margin-left: 0;
        will-change: margin-left;
        transition: margin-left 250ms ease-out;
      }

      .thumbnail {
        margin: 0 5px 5px 6px;
        display: inline-block;
        width: 48px;
        height: 48px;
        cursor: pointer;
        color: white;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        border: 3px solid transparent;
      }

      .thumbnail:active {
        border: 1px solid var(--default-secondary-color);
      }

      .thumbnail:focus {
        outline: var(--default-outline);
      }

      .thumbnail[selected] {
        border: 3px solid var(--default-secondary-color);
      }

      ucdlib-icon {
        height: 50px;
        margin: auto;
        fill: var(--color-aggie-blue-80);
        cursor: pointer;
      }

      #navLeft,
      #navRight {
        width: 36px;
        margin: auto;
      }

      iron-icon {
        shape-rendering: geometricPrecision !important;
        width: 28px !important;
        height: 28px !important;
      }

      paper-icon-button {
        color: var(--default-secondary-color);
        min-width: 40px;
      }

      paper-icon-button:focus {
        border-radius: 0 !important;
      }

      paper-icon-button[disabled] {
        color: var(--gray-text);
        min-width: 40px;
      }

      paper-icon-button[invisible] {
        visibility: hidden;
      }

      .zoom-btns[pad] {
        margin-right: 30px;
      }

      #buttonWrapper {
        z-index: 500;
      }

      .lightbox #buttonWrapper {
        margin-right: 2rem;
      }

      #buttonWrapper div {
        background-color: var(--color-aggie-blue-80);
        border-radius: 50%;
        display: inline-block;
        width: 50px;
        height: 50px;
        margin-left: 0.4rem;
      }

      #buttonWrapper div:hover {
        background-color: var(--color-aggie-blue);
      }

      #buttonWrapper ucdlib-icon {
        fill: white;
        width: 25px;
      }

      .search-container {
        margin-top: 0.7rem;
        margin-left: 1.2rem;
      }

      .search-container input {
        position: relative;
        z-index: 10;
        left: -0.8rem;
        width: 17rem;
      }

      .search-pagination {
        display: flex;
        margin: auto;
      }

      #buttonWrapper div.text-search {
        background-color: var(--color-aggie-gold);
      }

      #buttonWrapper div.text-search ucdlib-icon {
        fill: var(--color-aggie-blue-80);
      }

      .page-n-n {
        font-size: 0.9rem;
        font-weight: bold;
        color: var(--color-aggie-blue-80);
      }

      ucdlib-icon.single-page-book {
        width: 6% !important;
        height: 50%;
        position: relative;
        top: 25%;
        left: 1%;
      }

      .br-search-non-fs div {
        display: inline-block;
      }

      .br-search-non-fs div.zoom {
        background-color: var(--color-aggie-blue);
        border-radius: 50%;
        display: inline-block;
        width: 50px;
        height: 50px;
        /* margin-left: 25px; */
        margin-top: 5px;
      }

      .br-search-non-fs div.zoom {
        cursor: pointer;
      }

      .br-search-non-fs ucdlib-icon {
        height: 50px;
        margin: auto;
        fill: white;
      }

      .br-search-non-fs #search-prev ucdlib-icon,
      .br-search-non-fs #search-next ucdlib-icon {
        fill: var(--ucdlib-icon-fill-color);
      }

      .br-search-non-fs div.zoom.searching {
        background-color: var(--color-aggie-gold);
      }

      .br-search-non-fs div.zoom.searching ucdlib-icon {
        fill: var(--color-aggie-blue);
      }

      @media (max-width: 767px) {
        /* mobile */
        #buttonWrapper div.zoom-controls {
          /* pinch to zoom */
          display: none;
        }



        /* this breaks something with bookreader, need to test again if below is uncommented */
        .layout {
          width: 90%;
          flex-wrap: wrap;
          justify-content: end;
        }
        .layout.lightbox {
          height: 150px;
        }

        /* .break {
          width: 100%;
        } */

        #buttonWrapper.wrap {
          /* padding-top: 1rem; */
          /* position: relative;
          left: 62vw; */
        }





        #thumbnails {
          width: 80% !important;
        }
      }
    </style>

    <div
      class="layout ${this.isLightbox?"lightbox":""} ${this.brFullscreen?"fullscreen":""}">
      <div class="icon-nav" style="display: flex; max-width: 90vw;">
        <div id="navLeft">
          <ucdlib-icon
            icon="ucdlib-dams:fa-chevron-left"
            tabindex="0"
            icon="chevron-left"
            alt="Page thumbnails left"
            ?disabled="${!this.showNavLeft}"
            ?hidden="${!this.showNavLeft||this.singleImage}"
            @click="${this._pageLeft}">
          </ucdlib-icon>
          <div
            class="br-search-non-fs"
            style="min-width: 300px;"
            ?hidden="${this.brFullscreen||!this.isBookReader}">
            <div
              class="zoom ${this.searching?"searching":""}"
              @click="${this._onSearchToggled}">
              <ucdlib-icon icon="ucdlib-dams:fa-magnifying-glass"></ucdlib-icon>
            </div>
            <div
              class="search-pagination"
              ?hidden="${0===this.searchResultsCount}">

              <div id="search-prev"
                style="padding-left: .5rem; width: 40px;"
                @click="${this._prevSearchResult}">
                <ucdlib-icon icon="ucdlib-dams:fa-caret-left"></ucdlib-icon>
              </div>

              <span class="search-results"
                style="position: relative;
                  bottom: 1rem;
                  font-size: .9rem;
                  font-weight: bold;">
                ${this.selectedResult} / ${this.searchResultsCount}
              </span>

              <div
                id="search-next"
                style="padding-right: .5rem; width: 40px;"
                @click="${this._nextSearchResult}">
                <ucdlib-icon icon="ucdlib-dams:fa-caret-right"></ucdlib-icon>
              </div>
            </div>
          </div>
        </div>

        <div id="thumbnails" ?hidden="${this.singleImage||this.isBookReader||this.thumbnails.length<2}">
          <div id="thumbnailInnerContainer">
            ${this.thumbnails.map((e=>o.dy`
              <a
                class="thumbnail"
                href="${e.id}"
                alt="Page #${e.page}"
                ?selected="${e.selected}"
                title="${e.id}"
                media-id="${e.id}"
                ?disabled="${e.disabled}"
                style="background-image:url(${e.src})">
                <iron-icon icon="fin-icons:${e.icon}" ?hidden="${!e.icon}"></iron-icon>
              </a>
            `))}
          </div>
        </div>

        <div id="navRight" ?hidden="${this.singleImage||this.isBookReader}">
          <ucdlib-icon
            icon="ucdlib-dams:fa-chevron-right"
            tabindex="0"
            icon="chevron-right"
            alt="Page thumbnails right"
            ?disabled="${!this.showNavRight}"
            ?hidden="${!this.showNavRight}"
            @click="${this._pageRight}"
          >
          </ucdlib-icon>
        </div>
      </div>

      <div style="flex:1"></div>
      <div class="break"></div>
      <div
        id="buttonWrapper"
        class="wrap"
        style="white-space: nowrap"
        ?hidden="${this.isLightbox}"
      >
        <div @click="${this._onToggleBookView}" class="page-toggle" ?hidden="${!this.isBookReader}">
          <ucdlib-icon
            icon="ucdlib-dams:fa-book-open"
            ?hidden="${!this.brSinglePage}"
          ></ucdlib-icon>
          <ucdlib-icon
            icon="ucdlib-dams:page-single"
            ?hidden="${this.brSinglePage}"
            class="single-page-book"
          ></ucdlib-icon>
        </div>

        <div
          class="zoom-controls"
          @click="${this._onBRZoomOutClicked}"
          ?hidden="${!this.brFullscreen}"
        >
          <ucdlib-icon icon="ucdlib-dams:fa-minus"></ucdlib-icon>
        </div>
        <div
          class="zoom-controls"
          @click="${this._onBRZoomInClicked}"
          ?hidden="${!this.brFullscreen}"
        >
          <ucdlib-icon icon="ucdlib-dams:fa-plus"></ucdlib-icon>
        </div>

        <div
          @click="${this._onExpandBookView}"
          ?hidden="${!this.isBookReader||this.brFullscreen}"
        >
          <ucdlib-icon
            icon="ucdlib-dams:fa-up-right-and-down-left-from-center"
          ></ucdlib-icon>
        </div>
        <div
          @click="${this._onCollapseBookView}"
          ?hidden="${!this.isBookReader||!this.brFullscreen}"
        >
          <ucdlib-icon
            icon="ucdlib-dams:fa-down-left-and-up-right-to-center"
          ></ucdlib-icon>
        </div>

        <div
          @click="${this._onZoomInClicked}"
          ?hidden="${this.isBookReader||this.hideZoom}"
        >
          <ucdlib-icon
            icon="ucdlib-dams:fa-up-right-and-down-left-from-center"
          ></ucdlib-icon>
        </div>
        <div ?hidden="${this.brFullscreen}">
          <app-share-btn></app-share-btn>
        </div>

        <!-- this is moved next to the bookreader slider in app-media-viewer in full screen -->
        <div class="br-search" style="display: none;">
          <div
            class="zoom ${this.searching?"searching":""}"
            @click="${this._onSearchToggled}"
          >
            <ucdlib-icon icon="ucdlib-dams:fa-magnifying-glass" class="fullscreen-search"></ucdlib-icon>
          </div>
          <div
            class="search-pagination"
            ?hidden="${0===this.searchResultsCount}"
          >
            <div
              id="search-prev"
              style="padding-left: .5rem; width: 40px;"
              @click="${this._prevSearchResult}"
            >
              <ucdlib-icon icon="ucdlib-dams:fa-caret-left"></ucdlib-icon>
            </div>

            <span
              class="search-results"
              style="position: relative;
                bottom: 1rem;
                font-size: .9rem;
                font-weight: bold;"
              >${this.selectedResult} / ${this.searchResultsCount}</span
            >

            <div
              id="search-next"
              style="padding-right: .5rem; width: 40px;"
              @click="${this._nextSearchResult}"
            >
              <ucdlib-icon icon="ucdlib-dams:fa-caret-right"></ucdlib-icon>
            </div>
          </div>
        </div>
      </div>

      <div
        id="buttonWrapper"
        style="white-space: nowrap"
        ?hidden="${!this.isLightbox}"
      >
        <div
          class="${this.searchingText?"text-search":""}"
          style="display: none;"
          @click="${this._onSearchClicked}"
        >
          <ucdlib-icon icon="ucdlib-dams:fa-magnifying-glass"></ucdlib-icon>
        </div>

        <div @click="${this._onZoomOutClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-minus"></ucdlib-icon>
        </div>
        <div @click="${this._onZoomInClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-plus"></ucdlib-icon>
        </div>

        <div @click="${this._onCloseClicked}">
          <ucdlib-icon icon="ucdlib-dams:fa-down-left-and-up-right-to-center"></ucdlib-icon>
        </div>

      </div>
    </div>
  `}customElements.define("app-audio-viewer",de);class he extends((0,p.Mixin)(o.oi).with(p.LitCorkUtils)){static get properties(){return{totalThumbnailWidth:{type:Number},icon:{type:String},iconWidth:{type:Number},thumbnails:{type:Array},thumbnailsPerFrame:{type:Number},leftMostThumbnail:{type:Number},breakControls:{type:Boolean},showNavLeft:{type:Boolean},showNavRight:{type:Boolean},isLightbox:{attribute:"is-lightbox",type:Boolean},isBookReader:{type:Boolean},hideZoom:{type:Boolean},brSinglePage:{type:Boolean},brFullscreen:{type:Boolean},overrideImageList:{type:Boolean},singleImage:{type:Boolean},mediaList:{type:Array},showOpenLightbox:{type:Boolean},searchingText:{type:Boolean},searching:{type:Boolean},brSearch:{type:Boolean},selectedResult:{type:Number},searchResults:{type:Array},searchResultsCount:{type:Number}}}constructor(){super(),this.render=ce.bind(this),this.active=!0,this.totalThumbnailWidth=64,this.icon="",this.iconWidth=40,this.thumbnails=[],this.thumbnailsPerFrame=10,this.leftMostThumbnail=0,this.breakControls=!0,this.showNavLeft=!1,this.showNavRight=!1,this.isLightbox=!1,this.isBookReader=!1,this.hideZoom=!1,this.brSinglePage=!1,this.overrideImageList=!1,this.brFullscreen=!1,this.singleImage=!1,this.mediaList=[],this.showOpenLightbox=!1,this.searchingText=!1,this.brSearch=!1,this.searching=!1,this.selectedResult=1,this.searchResults=[],this.searchResultsCount=0,window.addEventListener("resize",(()=>this._resize())),window.addEventListener("touchend",(e=>this._onTouchEnd(e))),window.addEventListener("touchcancel",(e=>this._onTouchEnd(e))),window.addEventListener("touchmove",(e=>this._onTouchMove(e))),this.addEventListener("touchstart",(e=>this._onTouchStart(e))),this._injectModel("AppStateModel","MediaModel"),window.addEventListener("BookReader:pageChanged",this._onBRPageChange.bind(this)),window.addEventListener("BookReader:SearchCallback",this._onSearchResultsChange.bind(this)),window.addEventListener("BookReader:SearchCallbackEmpty",this._onSearchResultsEmpty.bind(this))}connectedCallback(){super.connectedCallback(),this._resize()}async firstUpdated(){let e=await this.AppStateModel.getSelectedRecord();e&&this._onSelectedRecordUpdate(e),window.innerWidth<801&&(this.brSinglePage=!0)}_onAppStateUpdate(e){void 0!==e.mediaViewerNavLeftMostThumbnail&&e.mediaViewerNavLeftMostThumbnail!==this.leftMostThumbnail&&(this.leftMostThumbnail=e.mediaViewerNavLeftMostThumbnail,this._resize())}_onTouchEnd(e){if(!this.touchAction)return;this.touchAction=!1;let t=this.touchStartX-this.touchCurrentX;Math.abs(t)>this.totalThumbnailWidth/2&&(t<0?this._pageLeft():this._pageRight())}_onTouchMove(e){this.touchAction&&(this.touchCurrentX=e.touches[0].clientX)}_onTouchStart(e){this.touchAction=!0,this.touchStartX=e.touches[0].clientX,this.touchCurrentX=e.touches[0].clientX}_resize(){let e,t=window.innerWidth;if(0===t)return;t-=16,this._setNavBreak(t),this.breakControls?e=2*this.iconWidth:(e=4*this.iconWidth,this.isLightbox&&(e+=2*this.iconWidth));let i=window.innerWidth<1e3?.35:.42,o=Math.min(t-e,t*i);this.thumbnailsPerFrame=Math.max(Math.floor(o/this.totalThumbnailWidth),1),this.isLightbox&&(this.thumbnailsPerFrame*=2);let a=this.shadowRoot.querySelector("#thumbnails");a&&(a.style.width=this.thumbnailsPerFrame*this.totalThumbnailWidth+"px",this.showNavLeft=0!==this.leftMostThumbnail,this.showNavRight=!this._showingLastThumbFrame(),this._updateThumbnailContainerPos())}_getTotalIconWidth(){let e=4*this.iconWidth;return this.isLightbox&&(e+=2*this.iconWidth),e}_setNavBreak(e){let t=4*this.iconWidth;this.isLightbox&&(t+=2*this.iconWidth),t+4*this.totalThumbnailWidth>e?this.breakControls=!0:this.breakControls=!1}_pageLeft(){this.leftMostThumbnail=this.leftMostThumbnail-this.thumbnailsPerFrame,this.leftMostThumbnail<0&&(this.leftMostThumbnail=0),this._resize(),this.AppStateModel.set({mediaViewerNavLeftMostThumbnail:this.leftMostThumbnail})}_pageRight(){this._showingLastThumbFrame()||(this.leftMostThumbnail=this.leftMostThumbnail+this.thumbnailsPerFrame,this._resize(),this.AppStateModel.set({mediaViewerNavLeftMostThumbnail:this.leftMostThumbnail}))}_prevSearchResult(e){1!==this.selectedResult&&(this.selectedResult=this.selectedResult-1,this.dispatchEvent(new CustomEvent("br-change-search-result",{detail:{selectedResult:this.selectedResult}})))}_nextSearchResult(e){this.selectedResult!==this.searchResultsCount&&(this.selectedResult=this.selectedResult+1,this.dispatchEvent(new CustomEvent("br-change-search-result",{detail:{selectedResult:this.selectedResult}})))}_onSearchResultsChange(e){this.searchResults=e.detail?.props?.results?.matches||[],this.searchResultsCount=this.searchResults.length,console.log("this.searchResultsCount",this.searchResultsCount)}_onSearchResultsEmpty(e){this.searchResultsCount=0,this.searchResults=[],console.log("this.searchResultsCount",this.searchResultsCount)}_showingLastThumbFrame(){return this.leftMostThumbnail+this.thumbnailsPerFrame>this.thumbnails.length-1}_updateThumbnailContainerPos(){this.shadowRoot.querySelector("#thumbnailInnerContainer").style.marginLeft=-1*this.leftMostThumbnail*(this.totalThumbnailWidth+1)+"px";let e=this.leftMostThumbnail+this.thumbnailsPerFrame;this.thumbnails.forEach(((t,i)=>{t.disabled=i<this.leftMostThumbnail||i>=e}))}_onSelectedRecordUpdate(e){if(!e)return;let{graph:t,clientMedia:i,selectedMedia:o,selectedMediaPage:a}=e;if(1===i.mediaGroups.length&&-1===a)return void(this.singleImage=!0);let r=[];for(let e of i.mediaGroups)if(e.clientMedia.pages||this.overrideImageList){if(e.clientMedia.pages)for(let t of e.clientMedia.pages)r.push(this._renderThumbnail(o,t,a))}else r.push(this._renderThumbnail(o,e.clientMedia.images,a));const s=[];this.thumbnails=r.filter((e=>null!==e)).filter((e=>!s.includes(e.id)&&(s.push(e.id),!0))),this._resize()}_renderThumbnail(e,t,i){let{fileType:o,iconType:a}=this._getFileAndIconType(e),r=t.small?.url;return r||(r=t.medium?.url),r||(r=t.original?.url),{id:e["@id"]+(void 0===t.page?"":":"+t.page),icon:a,position:t.page,selected:t.page===i,disabled:!1,src:r}}_onSelectedRecordMediaUpdate(e){if(this.media=e,!e)return;this.thumbnails.forEach(((e,t)=>{}));let{fileType:t,iconType:i}=this._getFileAndIconType(e);this.showOpenLightbox="image"===t}_getFileAndIconType(e){let t="",i=t,o=t,a="";(e.fileFormat||e.encodingFormat)&&(t=e.fileFormat?e.fileFormat:e.encodingFormat,i=t.split("/").shift(),o=t.split("/").pop());let r=n().getMediaType(e);return"AudioObject"===r||"audio"===i?a="sound-round":"VideoObject"===r||"StreamingVideo"===r||"video"===i?a="video-round":"pdf"===o?a="blank-round":"360"===i&&(a="360-round"),{fileType:i,iconType:a}}_onZoomInClicked(e){this.dispatchEvent(new CustomEvent("zoom-in"))}_onZoomOutClicked(e){this.dispatchEvent(new CustomEvent("zoom-out"))}_onBRZoomInClicked(e){this.dispatchEvent(new CustomEvent("br-zoom-in"))}_onBRZoomOutClicked(e){this.dispatchEvent(new CustomEvent("br-zoom-out"))}_onToggleBookView(e){this.dispatchEvent(new CustomEvent("br-bookview-toggle")),this.brSinglePage=!this.brSinglePage}_onExpandBookView(e){this.dispatchEvent(new CustomEvent("br-expand-view")),this.brFullscreen=!0}_onCollapseBookView(e){this.dispatchEvent(new CustomEvent("br-collapse-view")),this.brFullscreen=!1}_onSearchClicked(e){this.searchingText=!this.searchingText}_onCloseClicked(e){this.dispatchEvent(new CustomEvent("close"))}setFocus(){if(this.singleImage)this.breakControls?this.$.zoomOut2.focus():this.$.zoomOut1.focus();else{let e=this.shadowRoot.querySelector("button");e&&e.focus()}}_onSearchToggled(e){this.searching=!this.searching,this.dispatchEvent(new CustomEvent("br-search-toggle"))}_onBRPageChange(e){if(!this.searchResults.length)return;let t=this.singleImage?1:0,i=e.detail.props.currentIndex(),o=this.searchResults.findIndex((e=>e.par[0].page===i+t));-1===o&&this.searchResults.forEach(((e,a)=>{e.par[0].page<i+t&&(o=a)})),(!o||o<0)&&(o=0),this.selectedResult=o+1}}customElements.define("app-media-viewer-nav",he);var pe=i(7508),ue=i.n(pe);function ge(){return o.dy`

<style include="shared-styles">
  ${u.F}
  ${ue()}

  [hidden] {
    display: none;
  }
  
  :host {
    display: none;
    position: absolute;
    z-index: 1000;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: white;    
    animation: show 350ms ease-out;
  }

  :host #nav.single {
    padding: 10px;
    background-color: transparent;
  }

  @keyframes show {
    from {
      /* top: -100vh; */
      opacity: 0.5;
      transform: scale(1.3);
    }
    to {
      /* top: 0; */
      opacity: 1;
      transform: scale(1);
    }
  }

  #viewer { 
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: white;
  }

  #nav {
    z-index: 2000;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }

  #close {
    z-index: 2000;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
  }

  #close ucdlib-icon {
    fill: var(--color-aggie-blue-80);
    margin: auto;
    height: 36px;
    padding-top: 7px;
  }

  #close:hover {
    background-color: var(--color-aggie-blue-80);
    cursor: pointer;
  }

  #close:hover ucdlib-icon {
    fill: var(--color-aggie-gold);
  }

  .leaflet-control-zoom {
    display: none;
  }

  .spinner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:  transparent;
    transition: opacity 0.75s, visibility 0.75s;
  }

  .spinner:after {
    content: '';
    width: 30px;
    height: 30px;
    border: 5px solid  var(--color-aggie-gold-70);
    border-top-color: var(--color-aggie-gold);
    border-radius: 50%;
    animation: loading 0.75s ease infinite;
  }

  @keyframes loading {
    from {
      transform: rotate(0turn); 
    }
    to {
      transform: rotate(1turn);
    }
  }

</style>

<!-- make sure background is blacked out... iOS hack -->
<div id="safeCover" style="display:none;position:absolute;z-index:999;top:0;left:0;width:100vw;height:100vh;background-color:white;"></div>

<div id="viewer" ?hidden="${this.loading}"></div>

<div class="spinner"></div>


<app-media-viewer-nav 
  id="nav"
  is-lightbox
  @zoom-in="${this._onZoomInClicked}"
  @zoom-out="${this._onZoomOutClicked}"
  @close="${this._onCloseClicked}">
</app-media-viewer-nav>

`}i(2807),i(1957);class me extends((0,p.Mixin)(o.oi).with(p.LitCorkUtils)){properties(){return{bounds:{type:Array},maxImageSize:{type:Number},media:{type:Object},visible:{type:Boolean},loading:{type:Boolean}}}constructor(){super(),this.active=!0,this.render=ge.bind(this),this.bounds=null,this.maxImageSize=2048,this.media={},this.visible=!1,this.loading=!1,window.addEventListener("keyup",(e=>{this.visible&&27===e.which&&this.hide()})),this._injectModel("AppStateModel","MediaModel")}async firstUpdated(){this.parentElement.removeChild(this),document.body.appendChild(this);const e=this.shadowRoot.querySelector("#safeCover");e&&(this.shadowRoot.removeChild(e),document.body.appendChild(e));let t=await this.AppStateModel.getSelectedRecord();t&&this._onSelectedRecordUpdate(t)}_onAppStateUpdate(e){e.showLightbox&&!this.visible?this.show():!e.showLightbox&&this.visible&&this.hide()}_onSelectedRecordUpdate(e){if(!e)return;let{graph:t,clientMedia:i,selectedMedia:o,selectedMediaPage:a}=e;(this.record?.selectedMedia||{})["@id"]===o["@id"]&&a===this.record?.selectedMediaPage||(this.record=e,this.visible&&this.renderCanvas())}async show(){this.visible=!0,this.style.display="block",document.querySelector("fin-app").style.display="none",document.body.style.overflow="hidden",this.renderCanvas(),setTimeout((()=>{this.shadowRoot.querySelector("#nav")._resize(),this.shadowRoot.querySelector("#nav").setFocus()}),25)}async hide(){this.visible=!1,this.AppStateModel.set({showLightbox:!1}),this.style.display="none",document.body.style.overflow="auto",document.querySelector("fin-app").style.display="block"}async renderCanvas(){if(!this.record)return;this.loading=!0;let{graph:e,clientMedia:t,selectedMedia:i,selectedMediaPage:o}=this.record;if(i["@id"]!==this.renderedMedia?.["@id"]){if(this.renderedMedia=i.clientMedia?.pages?.filter((e=>e.page===o))[0],this.renderedMedia||(this.renderedMedia=i.clientMedia.images),this.viewer||(this.viewer=L.map(this.shadowRoot.querySelector("#viewer"),{center:[0,0],crs:L.CRS.Simple,zoom:0})),this.currentLayer&&this.viewer.removeLayer(this.currentLayer),this.renderedMedia.tiled){let e=this.renderedMedia.tiled.iiif+"/info.json";this.currentLayer=L.tileLayer.iiif(e)}else{let e=this.renderedMedia.original||this.renderedMedia.large||this.renderedMedia.medium||this.renderedMedia.small,t=await this.getImageSize(e),i=parseInt(t.width),o=parseInt(t.height),a=this.viewer.getContainer(),r=a.offsetWidth,s=a.offsetHeight;if(i>r||o>s){let e=Math.min(r/i,s/o);i*=e,o*=e}let l=[[0,0],[o,i]],n=(l[0][0]+l[1][0])/2,d=(l[0][1]+l[1][1])/2,c=0;this.viewer.setView([n,d],c),this.currentLayer=L.imageOverlay(e.url,l).addTo(this.viewer)}this.currentLayer.addTo(this.viewer),this.renderedMedia.tiled?this.currentLayer.on("load",this._loaded.bind(this)):this.currentLayer.getElement().addEventListener("load",this._loaded.bind(this)),setTimeout((()=>{this.viewer.invalidateSize()}),1e3),this.shadowRoot.querySelector(".leaflet-control-attribution").style.display="none",this.shadowRoot.querySelector(".leaflet-control-container").style.display="none"}}_loaded(){this.loading=!1;let e=this.shadowRoot.querySelector(".spinner");e&&(e.style.display="none")}getImageSize(e){return e.size?e.size:new Promise(((t,i)=>{let o=new Image;o.src=e.url,o.onload=()=>{t(e.size={height:o.naturalHeight,width:o.naturalWidth})}}))}_onCloseClicked(){this.AppStateModel.set({showLightbox:!1})}_onZoomInClicked(){this.viewer.zoomIn()}_onZoomOutClicked(){this.viewer.zoomOut()}}customElements.define("app-image-viewer-lightbox",me);class be extends((0,c.Z)(o.oi).with(h.C,p.LitCorkUtils)){static get properties(){return{mediaType:{type:String},tallControls:{type:Boolean},bagOfFilesImage:{type:String},brFullscreen:{type:Boolean},brSearchOpen:{type:Boolean},singlePage:{type:Boolean},overrideImageList:{type:Boolean},bookData:{type:Object},bookItemId:{type:String},isBookReader:{type:Boolean},searchResults:{type:Array},searchResultsCount:{type:Number},selectedResult:{type:Number},queryTerm:{type:String}}}constructor(){super(),this.render=D.bind(this),this.active=!0,this._injectModel("AppStateModel","RecordModel","FcAppConfigModel","CollectionModel"),this.mediaType="",this.bagOfFilesImage="",this.brFullscreen=!1,this.brSearchOpen=!1,this.singlePage=!1,this.bookData={},this.bookItemId="",this.isBookReader=!1,this.overrideImageList=!1,this.searchResults=[],this.searchResultsCount=0,this.selectedResult=1,this.queryTerm="",this.regexPattern=/\{\{\{.*?\}\}\}/g,this.$={},window.addEventListener("BookReader:SearchCallback",this._onSearchResultsChange.bind(this)),window.addEventListener("BookReader:SearchCallbackEmpty",this._onSearchResultsEmpty.bind(this)),window.addEventListener("BookReader:SearchGoToResult",this._onBRSearchGoToResult.bind(this))}async firstUpdated(){this.$.lightbox=document.getElementById("lightbox"),this.$.lightbox||(this.$.lightbox=document.getElementById("lightbox")),this._onAppStateUpdate(await this.AppStateModel.get())}async _onAppStateUpdate(e){"item"===this.AppStateModel.location.page&&this._onRenderMedia(e),"item"!==this.AppStateModel.location.page&&this._clearMedia()}async _onRenderMedia(e){let t=e.selectedRecord?.clientMedia?.mediaGroups;if(!t||!t.length)return;let i,o=!1,a=t.filter((e=>e["@shortType"].includes("ImageList")))[0];a&&(i="image",t.filter((e=>e.clientMedia?.pdf)).length&&(o=!0)),a||t.forEach((e=>{let t=n().getMediaType(e);t&&(i=t.toLowerCase().replace(/object/i,""),a=e)})),"imagelist"===i?i="image":"streamingvideo"===i&&(i="video"),"bagoffiles"===i&&selectedRecordMedia.thumbnailUrl?this.bagOfFilesImage=selectedRecordMedia.thumbnailUrl:this.bagOfFilesImage="";let r=e.selectedRecord?.graph?.root?.["@id"],s=e.selectedRecord?.graph?.root?.isPartOf?.filter((e=>e["@id"].includes("/collection/")))?.[0]?.["@id"],l=await this._getItemDisplayType(r,s);if(this.overrideImageList=!1,"image"!==i||l?l&&l.includes("Image List")&&["image","bookreader"].includes(i)?(o=!1,i="image",this.overrideImageList=!0):l&&l.includes("1 Page")&&"image"===i?(o=!0,i="bookreader",this.singlePage=!0):l&&l.includes("2 Page")&&"image"===i&&(o=!0,i="bookreader",this.singlePage=!1):(o=!0,i="bookreader",this.singlePage=!1),(a["@shortType"].includes("ImageObject")||1===a.clientMedia?.pages?.length)&&(o=!1,i="image"),o||!this.overrideImageList&&a.clientMedia&&a.clientMedia.pdf){let t;i="bookreader",this.isBookReader=!0,o&&!a.clientMedia?.pdf?.manifest?this.bookData=n().buildIaReaderPages(a.hasPart||a,e.selectedRecord?.clientMedia?.index):(await e.selectedRecord.clientMedia.loadManifests(),e.selectedRecord.clientMedia.mediaGroups.forEach((e=>{e.clientMedia?.pdf&&e.clientMedia?.pages&&(this.bookData={pages:e.clientMedia.pages},this.mediaType="bookreader")}))),this.bookItemId=a["@id"],t&&t.body&&(this.mediaType="bookreader",this.bookData="string"==typeof t.body?JSON.parse(t.body):t.body)}else this.isBookReader=!1;this.mediaType=i}async _getItemDisplayType(e,t){let i;try{i=await this.CollectionModel.getCollectionEdits(t)}catch(e){console.warn("Error retrieving collection edits",e)}if("loaded"!==i.state)return null;if(!Object.keys(i.payload).length)return null;let o=i.payload?.collection||{},a=i.payload?.items||{};return a[e]?.itemDefaultDisplay||o.itemDefaultDisplay}_clearMedia(){let e=this.querySelector("app-image-viewer"),t=this.querySelector("app-bookreader-viewer");e&&e.destroy(),t&&t.destroy()}_onSearchResultsChange(e){this.searchResults=[...e.detail?.props?.results?.matches],console.log("in _onSearchResultsChange",this.searchResults),this.searchResults.length&&(this.searchResults=this.searchResults.sort(((e,t)=>parseInt(e.displayPageNumber.replace("n",""))-parseInt(t.displayPageNumber.replace("n",""))))),this.searchResultsCount=this.searchResults?.length,this._updateSearchNav()}_onSearchResultsEmpty(e){this.searchResults=[],this.searchResultsCount=0,this._updateSearchNav()}_updateSearchNav(){if(!this.brFullscreen)return;let e=this.querySelector(".search-pagination");e&&(this.searchResults.length?(e.removeAttribute("hidden"),e.querySelector(".search-results").innerText=`${this.selectedResult} / ${this.searchResultsCount}`):e.setAttribute("hidden",""))}_onSearchResultClick(e){let t=document.querySelector("app-bookreader-viewer");if(!t)return;t.onSearchResultClick(e);let i=this.querySelector("app-media-viewer-nav");i&&(this.selectedResult=parseInt(e.currentTarget.attributes["data-array-index"].value)+1,i.selectedResult=this.selectedResult,this._updateSearchNav())}_onBookViewPageChange(e){this.isBookReader&&this.dispatchEvent(new CustomEvent("br-page-change",{detail:e.detail}))}_onZoomIn(e){this.AppStateModel.set({showLightbox:!0}),this.$.lightbox.show()}_onBRZoomIn(e){document.querySelector("#bookreader")._zoomIn()}_onBRZoomOut(e){document.querySelector("#bookreader")._zoomOut()}_onChangeSearchResult(e){this.selectedResult=e.detail?.selectedResult;let t=document.querySelector("#bookreader");t&&t.onSearchPrevNext(this.searchResults[this.selectedResult-1].matchIndex)}_onToggleBookView(e){document.querySelector("#bookreader")._toggleBookView()}_onExpandBookView(e){this.brFullscreen=!0;let t=document.querySelector("#bookreader");t&&(t.classList.add("fullscreen"),t.querySelector("#BookReader").classList.add("fullscreen"),document.body.style.overflow="hidden",t.onePage&&t._renderBookReader(!0),requestAnimationFrame((()=>{t.height=window.innerHeight;let e=document.querySelector("app-media-viewer-nav"),i=t.querySelector(".BRfooter");if(e&&i){let t=document.createElement("li");t.appendChild(e),i.querySelector("nav > ul").appendChild(t);let o=e.shadowRoot.querySelector(".br-search");if(o){let e=o.cloneNode(!0);e.style.display="";let t=e.querySelector(".zoom .fullscreen-search"),a=e.querySelector(".search-pagination #search-prev"),r=e.querySelector(".search-pagination #search-next");t&&t.addEventListener("click",this._onToggleBRSearch.bind(this)),a&&a.addEventListener("click",this._prevSearchResult.bind(this)),r&&r.addEventListener("click",this._nextSearchResult.bind(this)),i.prepend(e)}}t.br.resize(),this.queryTerm&&this._onBRSearch({currentTarget:{value:this.queryTerm}})})))}_prevSearchResult(e){let t=document.querySelector("app-media-viewer-nav");t&&t._prevSearchResult(),this._updateSearchNav()}_nextSearchResult(e){let t=document.querySelector("app-media-viewer-nav");t&&t._nextSearchResult(),this._updateSearchNav()}_onCollapseBookView(e){this.brFullscreen=!1;let t=document.querySelector("#bookreader");if(t){t.classList.remove("fullscreen"),t.querySelector("#BookReader").classList.remove("fullscreen"),document.body.style.overflow="";let e=t.querySelector("app-media-viewer-nav");e&&document.querySelector(".wrapper").append(e);let i=t.querySelector(".BRfooter"),o=i?.querySelector(".br-search");o&&o.remove(),t.onePage?(t.fullscreen=!1,t.br._modes.mode1Up.mode1UpLit.scale=1,t._renderBookReader(!0)):t.height=634}requestAnimationFrame((()=>{t.br.resize(),this.queryTerm&&this._onBRSearch({currentTarget:{value:this.queryTerm}})}))}_onToggleBRSearch(e){this.brSearchOpen=!this.brSearchOpen;let t=document.querySelector("app-media-viewer-nav");t&&(t.searching=this.brSearchOpen)}_onBRSearch(e){let t=document.querySelector("app-media-viewer-nav");t&&(t.brSearch=!0,t.selectedResult=1,t.searchResults=[]),this.queryTerm=e.currentTarget.value,this.queryTerm||(this.searchResults=[],this.searchResultsCount=0);let i=document.querySelector("app-bookreader-viewer");i&&i.search(this.queryTerm)}_onClearSearch(e){let t=document.querySelector("#br-search-input");t&&(t.value=""),this.searchResults=[],this.searchResultsCount=0,this._onBRSearch({currentTarget:{value:""}}),e.detail.closeSearch&&(this.brSearchOpen=!1)}_onBRSearchGoToResult(e){let t=document.querySelector("app-bookreader-viewer");if(!t)return;let i=t.querySelector("app-media-viewer-nav");i&&(this.selectedResult=this.searchResults.findIndex((t=>t.matchIndex===e.detail.matchIndex))+1,i.selectedResult=this.selectedResult)}}customElements.define("app-media-viewer",be),i(4941);var ye=i(6030);class ve extends((0,c.Z)(o.oi).with(h.C,p.LitCorkUtils)){static get properties(){return{record:{type:Object},currentRecordId:{type:String},name:{type:String},collectionName:{type:String},collectionImg:{type:String},collectionId:{type:String},collectionItemCount:{type:Number},description:{type:String},date:{type:String},publisher:{type:String},subjects:{type:Array},callNumber:{type:String},size:{type:String},rights:{type:Object},metadata:{type:Array},isBagOfFiles:{type:Boolean},arkDoi:{type:Array},fedoraLinks:{type:Array},isUiAdmin:{type:Boolean},editMode:{type:Boolean},citationRoot:{type:Object},itemDefaultDisplay:{type:String},itemDisplay:{type:String},displayData:{type:Object},savedCollectionData:{type:Object}}}constructor(){super(),this.render=d.bind(this),this.active=!0,this.record={},this.currentRecordId="",this.name="",this.collectionName="",this.date="",this.publisher="",this.subjects=[],this.callNumber="",this.collectionImg="",this.collectionId="",this.renderedCollectionId="",this.description="",this.size="",this.rights={},this.metadata=[],this.isBagOfFiles=!1,this.arkDoi=[],this.fedoraLinks=[],this.citationRoot={},this.collectionItemCount=0,this.itemDefaultDisplay=n().itemDisplayType.brTwoPage,this.itemDisplay="",this.isUiAdmin=ye.Z.canEditUi(),this.editMode=!1,this.displayData={},this.savedCollectionData={},this._injectModel("AppStateModel","RecordModel","CollectionModel","SeoModel","FcAppConfigModel"),window.addEventListener("click",(()=>this._onPageClick()))}_onPageClick(e){let t=this.querySelector("app-media-viewer-nav")?.shadowRoot?.querySelector("app-share-btn");t&&(t.visible=!1)}async firstUpdated(){this._onAppStateUpdate(await this.AppStateModel.get()),this.RecordModel.currentRecordId&&this._onRecordUpdate(await this.RecordModel.get(this.RecordModel.currentRecordId)),this.collectionId&&this._onCollectionUpdate(await this.CollectionModel.get(this.collectionId)),this._updateSlimStyles()}async _onRecordUpdate(e){if("loaded"!==e.state)return;let t=e.vcData;t&&this.renderedRecordId!==t["@id"]&&(this.renderedRecordId=t["@id"],this.record=t,this.currentRecordId=this.record["@id"],this.name=this.record.name,this.collectionName=this.record.collectionName,this.description=this.record.description,this.date=this.record.date,this.publisher=this.record.publisher,this.subjects=this.record.subjects||[],this.callNumber=this.record.callNumber,this.citationRoot=this.record.root,this.collectionId=this.record.collectionId,this._updateLinks(this.AppStateModel.location,t))}async _onCollectionUpdate(e){if("loaded"!==e.state||e.id===this.renderedCollectionId)return;this.collectionItemCount=e.vcData?.count||0,this.renderedCollectionId=e.id,this.collectionId=e.id;let t=await this.CollectionModel.getFeaturedImage(this.collectionId,this.FcAppConfigModel);this.collectionImg=t||e.vcData?.images?.small?.url||e.vcData?.images?.medium?.url||e.vcData?.images?.large?.url||e.vcData?.images?.original?.url}async _onAppStateUpdate(e){if("item"!==e.location.page)return;let t=!1;if(this.RecordModel.currentRecordId)try{let e=await this.RecordModel.get(this.RecordModel.currentRecordId);this._onRecordUpdate(e)}catch(e){t=!0}if("404"===e.page||t)return console.error("calling 404 from item page",{page:e.page,hasError:t}),void this.dispatchEvent(new CustomEvent("show-404",{}));this.collectionId&&this._onCollectionUpdate(await this.CollectionModel.get(this.collectionId)),this._updateLinks(e.location),await this._parseDisplayData()}_updateSlimStyles(){let e=this.querySelector("ucd-theme-slim-select");if(!e)return;let t=e.shadowRoot.querySelector(".ss-main");t&&(t.style.border="none",t.style.backgroundColor="transparent");let i=e.shadowRoot.querySelector(".ss-single-selected");i&&(i.style.border="none",i.style.height="49px",i.style.paddingLeft="1rem",i.style.backgroundColor="var(--color-aggie-blue-50)",i.style.borderRadius="0",i.style.fontWeight="bold",i.style.color="var(--color-aggie-blue)");let o=e.shadowRoot.querySelector(".ss-search");o&&(o.style.display="none")}_ssSelectFocus(e){console.log("focus");let t=e.currentTarget.shadowRoot.querySelector(".ss-main"),i=e.currentTarget.shadowRoot.querySelector(".ss-single-selected");"ss-single-selected ss-open-below"===i?.classList.value?(i.style.backgroundColor="#FFF4D2",t.style.borderColor="#FFBF00"):(i.style.backgroundColor="#B0D0ED",t.style.borderColor="#B0D0ED")}_ssSelectBlur(e){console.log("blur");let t=e.currentTarget.shadowRoot.querySelector(".ss-main");e.currentTarget.shadowRoot.querySelector(".ss-single-selected").style.backgroundColor="#B0D0ED",t.style.borderColor="#B0D0ED"}_updateLinks(e){if("item"!==e.page)return;let t=this.AppStateModel.getSelectedRecord();if(!t)return;let i=t.clientMedia.mediaGroups[0],o=t.clientMedia?.root?.["@id"]||e.pathname,a="";if(o.indexOf("/media")>-1){let e=t.clientMedia.graph.filter((e=>e["@shortType"].includes("ImageObject")&&parseInt(e.position)===t.selectedMediaPage))[0];e?.["@id"]&&(a=e["@id"])}a=!a&&i?.["@shortType"]?.includes("ImageList")?i.encodesCreativeWork?.["@id"]||i.clientMedia?.images?.original?.url||o:t.selectedMedia?.["@id"],this.arkDoi=[o,a.replace("/fcrepo/rest","")],this.fedoraLinks=["/fcrepo/rest"+o.replace("/fcrepo/rest",""),"/fcrepo/rest"+a.replace("/fcrepo/rest","")+"/fcr:metadata"]}_onEditClicked(e){this.isUiAdmin&&(this._updateSlimStyles(),this.editMode=!0,this._changeMediaViewerDisplay("none"))}async _onSaveClicked(e){this.isUiAdmin&&(this.itemDisplay=document.querySelector("ucd-theme-slim-select")?.slimSelect?.selected(),this._updateDisplayData(),await this.FcAppConfigModel.saveItemDisplayData(this.renderedRecordId,this.displayData),this.editMode=!1,this._changeMediaViewerDisplay("",!0))}_onCancelEditClicked(e){this.isUiAdmin&&(this.editMode=!1,this._changeMediaViewerDisplay(""))}async _parseDisplayData(){if(!this.collectionId)return;let e=await this.CollectionModel.getCollectionEdits(this.collectionId);Object.keys(e.payload).length?(e=e.payload,this.itemDefaultDisplay=e?.collection?.itemDefaultDisplay||n().itemDisplayType.brTwoPage,this.itemDisplay=e?.items?.[this.currentRecordId]?.itemDefaultDisplay||this.itemDefaultDisplay,this.appDataLoaded=!0,this._updateDisplayData()):this.appDataLoaded=!0}_updateDisplayData(){this.displayData=this.FcAppConfigModel.getItemDisplayData(this.renderedRecordId,this.itemDisplay)}async _changeMediaViewerDisplay(e,t=!1){let i=this.querySelector("app-media-viewer");if(!i)return;let o=i.querySelector("ucdlib-pages"),a=i.querySelector("app-media-viewer-nav");if(a&&(a.style.display=e),o&&(e?(o.style.opacity=0,o.style.height="150px",o.style.display="block"):(o.style.opacity=100,o.style.height="",o.style.display="block"),"video"!==i.mediaType&&t)){let e="",t=!1;this.itemDisplay.includes("Image List")?e="image":this.itemDisplay.includes("1 Page")?(e="bookreader",t=!0):this.itemDisplay.includes("2 Page")&&(e="bookreader"),o&&a&&e&&(o.selected=e,i.singlePage!==t&&(i.singlePage=t,i.querySelector("app-bookreader-viewer").br?requestAnimationFrame((()=>{i._onToggleBookView()})):i._onAppStateUpdate(await this.AppStateModel.get())),i.isBookReader="bookreader"===e,i.mediaType=e)}}_getHost(){return window.location.protocol+"//"+window.location.host+"/"}_onSelectedRecordMediaUpdate(e){this.name=this.record.name||""}_addMetadataRow(e,t,i){this[t]&&e.push({attr:i||t,value:this[t]})}_copyLink(){this.$.link.focus(),this.$.link.setSelectionRange(0,9999),document.execCommand("Copy"),this.$.copyIcon.icon="check",this.$.copyButton.setAttribute("active","active"),setTimeout((()=>{this.$.copyIcon.icon="content-copy",this.$.copyButton.removeAttribute("active","active")}),3e3)}_onBookViewPageChange(e){let t=document.querySelector("app-media-download");t&&t.brPageChange(e.detail)}}customElements.define("app-record",ve)},41:(e,t,i)=>{var o=i(8031);const{poll:a}=i(2233),{DragScrollable:r}=i(7219);e.exports=function(e){function t(e,t){console.log({spacing:t});const i=this.offsetWidth,o=this.offsetHeight;console.log({widthOffset:i,heightOffset:o}),i<700&&(t+=.005*(700-i));let a=9999;e.forEach((e=>{let t=e.width,r=e.height,s=i/t,l=o/r,n=Math.min(s,l);r*n<a&&(a=r*n)}));let r=a/this.coordSpace.screenDPI;const s={};let l=t;for(const i of e)s[i.index]=l,l+=r+t;return console.log({result:s}),s}return e.prototype._searchPluginGoToResult=async function(e){const t=this.searchResults?.matches[e],i=this.book,r=i.leafNumToIndex(t.par[0].page),s=i.getPage(r),l=Math.abs(this.currentIndex()-r)<3;let n=!1;if(!s.isViewable){const e=await fetch("/services/bookreader/request_page?"+new URLSearchParams({id:this.options.bookId,subprefix:this.options.subPrefix,leafNum:s.leafNum})).then((e=>e.json()));for(const t of e.value)i.getPage(i.leafNumToIndex(t)).makeViewable();e.value.length||(i.getPage(r).makeViewable(),n=!0),this._modes.mode1Up.mode1UpLit.updatePages(),this.activeMode==this._modes.mode1Up&&await this._modes.mode1Up.mode1UpLit.updateComplete}this._isIndexDisplayed(r)||(this.suppressFragmentChange=!1,this.jumpToIndex(r)),n&&i.getPage(r).makeViewable(!1);const d=await a((()=>o(`rect.match-index-${t.matchIndex}`)),{until:e=>e.length>0});d&&d.length&&this.isFullscreenActive&&(d.css("animation","none"),d[0].scrollIntoView({block:this.isFullscreenActive?"center":"nearest",inline:"center",behavior:l?"smooth":"auto"}),await new Promise((e=>setTimeout(e,100))),d.removeAttr("style"))},e.prototype.switchMode=function(i,{suppressFragmentChange:o=!1,init:a=!1,pageFound:s=!1}={}){if(this.init.initComplete){if(i===this.mode)return;if(!this.canSwitchToMode(i))return}this.trigger(e.eventNames.stop),this.prevReadMode=this.getPrevReadMode(this.mode),this.mode!=i&&this.activeMode.unprepare?.(),this.mode=i,this.pageScale!==this.reduce&&(this.reduce=this.pageScale),this.constMode1up==i?function(e){const i=e.br.currentIndex();e.$brContainer.empty().css({overflow:"hidden"}).append(e.$el),e.mode1UpLit.renderPage=function(t){return function(e,t){let i=9999;(e.book?.br?.data||[]).forEach((e=>{let o=e[0].width,a=e[0].height,r=t.offsetWidth/o,s=t.offsetHeight/a,l=Math.min(r,s);a*l<i&&(i=a*l)}));const o=t.coordSpace.worldUnitsToRenderedPixels,a=t.coordSpace.worldUnitsToVisiblePixels,r=t.coordSpace.visiblePixelsToWorldUnits(t.htmlDimensionsCacher.clientWidth);let s=o(e.widthInches),l=o(e.heightInches);l>i&&(l=i,s=o(e.widthInches)*(i/o(e.heightInches)));let n=t.offsetWidth/s,d=t.offsetHeight/l,c=Math.min(n,d);const h=Math.max(t.SPACING_IN/2,(r-e.widthInches*c)/2),p=t.pageTops[e.index],u=`translate(${o(h)}px, ${o(p)}px)`,g=t.createPageContainer(e).update({dimensions:{width:s*c,height:l*c,top:0,left:0},reduce:e.width/a(e.widthInches)}).$container[0];return g.style.transform=u,g.classList.toggle("BRpage-visible",t.visiblePages.includes(e)),g}(t,e.mode1UpLit)},e.mode1UpLit.computePageTops=t,setTimeout((async()=>{e.everShown||(e.mode1UpLit.initFirstRender(i),e.everShown=!0,e.mode1UpLit.requestUpdate(),await e.mode1UpLit.updateComplete,new r(e.mode1UpLit,{preventDefault:!0,dragSelector:".br-mode-1up__visible-world",dragstart:"mousedown",dragcontinue:"mousemove",dragend:"mouseup"})),e.mode1UpLit.jumpToIndex(i),setTimeout((()=>{e.mode1UpLit.updateVisibleRegion()}))})),e.br.updateBrClasses()}(this._modes.mode1Up):this.constModeThumb==i?(this.reduce=this.quantizeReduce(this.reduce,this.reductionFactors),this._modes.modeThumb.prepare()):this._modes.mode2Up.prepare(),this.suppressFragmentChange||o||this.trigger(e.eventNames.fragmentChange);const l=i+"PageViewSelected";this.trigger(e.eventNames[l]),this.textSelectionPlugin?.stopPageFlip(this.refs.$brContainer)},e.prototype.right=async function(){"rl"!=this.pageProgression?await this.next():await this.prev()},e.prototype.left=async function(){"rl"!=this.pageProgression?await this.prev():await this.next()},e.prototype.next=async function({triggerStop:t=!0}={}){this.constMode2up==this.mode?(t&&this.trigger(e.eventNames.stop),await this._modes.mode2Up.mode2UpLit.flipAnimation("next")):this.firstIndex<this.book.getNumLeafs()-1&&this.jumpToIndex(this.firstIndex+1)},e.prototype.prev=async function({triggerStop:t=!0}={}){this.firstIndex<1||(this.constMode2up==this.mode?(t&&this.trigger(e.eventNames.stop),await this._modes.mode2Up.mode2UpLit.flipAnimation("prev")):this.firstIndex>=1&&this.jumpToIndex(this.firstIndex-1))},class extends e{updateFromParams(e){this.ucdHackedGetPageText||(this.textSelectionPlugin.getPageText=this.getPageText.bind(this.textSelectionPlugin),this.ucdHackedGetPageText=!0),super.updateFromParams(e)}async getPageText(e){const t=this.pageTextCache.entries.find((t=>t.index==e));if(t)return t.response;const i=await o.ajax({type:"GET",url:this.options.singlePageDjvuCallback(e),dataType:this.options.jsonp?"jsonp":"html",cache:!0,error:e=>{}});try{const t=o.parseXML(i),a=t&&o(t).find("OBJECT")[0];return this.pageTextCache.add({index:e,response:a}),a}catch(e){return}}}}},4287:(e,t,i)=>{"use strict";var o=i(5589),a=i(2959),r=i(7847);function s(){return o.dy`

<style include="shared-styles">
  ${r.F}

  :host {
    display: inline-block;
    position: fixed;
  }

  [hidden] { display: none !important; }

  #popup {
    display: block;
    z-index: 10;
    background: var(--color-aggie-blue-10);
    padding: 1rem;
    position: fixed;
    bottom: 1rem;
    right: calc(50% - 110px - 2rem);
    width: 220px;
    font-size: 1rem;
    margin: 1rem;
    border-radius: 1.5rem;
    box-shadow: 0px 3px 6px #00000029;
    transition: all 0.3s;
    color: var(--color-aggie-blue);
  }

  #popup svg {
    height: 20px;
    width: 30px;
    fill: var(--color-sage);
    position: relative;
    top: 0.2rem;
  }
</style>

<div id="popup" ?hidden="${!this.visible}">
  <svg id="fa-check" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
  Copied successfully
</div>

`}class l extends((0,a.Mixin)(o.oi).with(a.LitCorkUtils)){static get properties(){return{visible:{type:Boolean}}}constructor(){super(),this.render=s.bind(this),this.active=!0,this.visible=!1}showPopup(){this.visible=!0,setTimeout((()=>{this.visible=!1}),5e3)}}customElements.define("app-toast-popup",l)},5988:(e,t,i)=>{"use strict";i.d(t,{Z:()=>a});var o=i(5589);const a=new class{headerDots(){return o.dy`
      <div class="header-dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    `}}},6030:(e,t,i)=>{"use strict";i.d(t,{Z:()=>a});const o=i(6794),a=new class{constructor(){this.data=o.user,this.data.roles||(this.data.roles=[]),this.editUiAccess=["admin","ui-admin"]}isLoggedIn(){return!0===this.data.loggedIn}canEditUi(){for(let e of this.editUiAccess)if(this.hasRole(e))return!0;return!1}hasRole(e){return this.data.roles.includes(e)}}}}]);