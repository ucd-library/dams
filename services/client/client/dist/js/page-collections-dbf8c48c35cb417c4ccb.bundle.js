/*! For license information please see page-collections-dbf8c48c35cb417c4ccb.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[589],{9379:(i,e,t)=>{var a=t(5589),o=t(2959);function l(){return a.dy`
    <style>
      :host {
        display: block;
      }
      [hidden] {
        display: none !important;
      }
      .container {
        cursor: pointer;
      }
      a {
        text-decoration: none;
      }
      .img-container {
        width: 100%;
        position: relative;
        padding-top: 75%;
        background-image: url(/images/logos/logo-white-512.png);
        background-color: var(--color-black-20);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .img-container img {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .head {
        border: 3px solid transparent;
        transition: 0.3s;
      }
      .container:hover .head,
      .container:focus .head {
        border: 3px solid var(--color-dams-secondary);
      }
      h5 {
        margin: 10px 0 5px 0;
        color: var(--color-h5);
        font-size: var(--fs-h5);
        font-weight: var(--fw-h5);
      }
      .subtitle {
        font-size: var(--fs-p);
        font-weight: var(--fw-extra-bold);
        color: var(--color-aggie-blue-70);
        margin-bottom: 20px;
      }
      .gold-dots {
        width: 100%;
        border-bottom: 5px dotted var(--color-dams-secondary);
      }

      .marketing-highlight {
        display: block;
        background-color: #fff;
        color: inherit;
        text-decoration: none;
      }

      /* .marketing-highlight:hover .marketing-highlight__image .u-background-image {
    transform: scale(1.1);
  } */

      .marketing-highlight__image {
        position: relative;
        overflow: hidden;
        margin: 1rem 0 0;
        padding: 1rem;
        transition: background-color 0.3s ease-in-out;
      }

      .marketing-highlight__image:hover {
        background-color: var(--color-aggie-gold-30);
      }

      /* .marketing-highlight__image .u-background-image {
    transition: transform .3s ease-in-out;
  } */

      .marketing-highlight__title {
        font-size: 1rem;
        margin-bottom: 0;
        color: var(--color-aggie-blue-80);
        text-align: center;
      }

      /* .marketing-highlight__items {
    font-size: 1rem;
    color: var(--color-aggie-blue-80);
    font-weight: 600;
    line-height: 1.25;
    margin: 0.5rem 0 1rem;
  } */

      .u-background-image {
        /* background-size: cover;
    background-position: center; */
        background-repeat: no-repeat;
        object-fit: contain;
        background-size: contain;
        background-position: bottom center;
      }
      .aspect--4x3 {
        position: relative;
        width: 100%;
        overflow: hidden;
        padding-top: 75%;
      }

      .media-type {
        position: absolute;
        right: 0.25rem;
        bottom: 0.25rem;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: var(--color-aggie-blue-80);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.5rem;
      }

      .media-type__icon {
        width: 1.4rem;
      }

      ucdlib-icon {
        width: 1.2rem;
        height: 1.2rem;
        fill: white;
      }
    </style>

    <a
      href="${this.itemUrl}"
      class="marketing-highlight category-brand--secondary u-space-mb o-box"
    >
      <div class="marketing-highlight__image">
        <div
          class="aspect--4x3 u-background-image"
          role="img"
          aria-label=""
          style="background-image:url(${this.thumbnailUrl});"
        ></div>
        <div
          class="media-type"
          ?hidden="${!this.mediaType||"image"===this.mediaType}"
        >
          <ucdlib-icon
            ?hidden="${"imageList"!==this.mediaType}"
            class="vertical-link__image"
            icon="ucdlib-dams:item-stack-blank"
          ></ucdlib-icon>
          <ucdlib-icon
            style="margin-left: .2rem;"
            ?hidden="${"video"!==this.mediaType}"
            class="vertical-link__image"
            icon="ucdlib-dams:fa-play"
          ></ucdlib-icon>
          <ucdlib-icon
            ?hidden="${"audio"!==this.mediaType}"
            class="vertical-link__image"
            icon="ucdlib-dams:fa-volume-high"
          ></ucdlib-icon>
        </div>
      </div>
      <div class="gold-dots"></div>
      <div class="marketing-highlight__body">
        <p class="marketing-highlight__title">${this.truncatedTitle}</p>
      </div>
    </a>
  `}t(1807);class s extends((0,o.Mixin)(a.oi).with(o.LitCorkUtils)){static get properties(){return{id:{type:String,attribute:"data-itemid"},data:{type:Object},itemUrl:{type:String},thumbnailUrl:{type:String},truncatedTitle:{type:String},mediaType:{type:String}}}constructor(){super(),this.render=l.bind(this),this.id="",this.data={},this.truncatedTitle="",this.itemUrl="",this.thumbnailUrl="",this.mediaType="",this._injectModel("RecordModel")}willUpdate(i){if(this.data.id)if(this.itemUrl=this.data.id,this.thumbnailUrl=this.data.thumbnailUrl,this.mediaType=this.data.mediaType,"Image"===this.data.mediaType)this.mediaType="image";else if("Video"===this.data.mediaType)this.mediaType="video";else if("Audio"===this.mediaType)this.mediaType="audio";else{this.mediaType="imageList";let i=this.data.format[0]?.split(" ")[0];i&&parseInt(i)<2&&(this.mediaType="image")}else this._getItem(this.id);this._truncateTitle()}async _onRecordUpdate(i){if("loaded"===i.state&&i.id===this.id){if(this.record=i.vcData,this.record.images){let i=this.record.images;this.thumbnailUrl=i.medium?i.medium.url:i.original.url}this.title=this.record.name,this.itemUrl=this.record["@id"],this.id=this.record["@id"],this._truncateTitle()}}async _getItem(i){this._onRecordUpdate(await this.RecordModel.get(i))}_truncateTitle(){this.data&&this.data.title&&this.data.title.length>38?this.truncatedTitle=this.data.title.substring(0,34)+"...":this.data&&this.data.title?this.truncatedTitle=this.data.title:this.title&&this.title.length>38?this.truncatedTitle=this.title.substring(0,34)+"...":this.title?this.truncatedTitle=this.title:this.truncatedTitle=""}}customElements.define("dams-item-card",s)},4941:(i,e,t)=>{var a=t(5589),o=t(76),l=t(5988),s=t(7847),r=t(7598),d=t(1479),n=t(8083);function c(){return a.dy`
<style>
  ${s.F}
  ${r.Z}
  ${d.Z}
  ${n.Z}
  
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

    ${l.Z.headerDots()}

    <p>
      ${(0,o.A)(this.selectedCitation.text)}
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
`}var h=t(353);t(4287);class p extends a.oi{static get properties(){return{record:{type:Object},recordId:{type:String},citations:{type:Array},selectedCitation:{type:Object}}}constructor(){super(),this.render=c.bind(this),this.active=!0,this.record={},this.recordId="",this.citations=[],this.selectedCitation={}}async updated(){if(!Object.keys(this.record||{}).length||this.citations.length&&this.recordId===this.record["@id"])return;this.recordId=this.record["@id"];let i=[];i.push({type:"mla",text:await h.default.renderEsRecord(this.record,"mla")}),i.push({type:"apa",text:await h.default.renderEsRecord(this.record,"apa")}),i.push({type:"chicago",text:await h.default.renderEsRecord(this.record,"chicago")}),this.citations=i,this.selectedCitation=i.filter((i=>"apa"===i.type))[0]}_citeChange(i){this.selectedCitation=this.citations.filter((e=>e.type===i.target.value))[0]}async _copyCiteText(i){try{await navigator.clipboard.writeText(this.shadowRoot.querySelector(".csl-entry").innerHTML);let i=this.shadowRoot.querySelector("app-toast-popup");i&&i.showPopup()}catch(i){console.error("Failed to copy citation: ",i)}}}customElements.define("app-citation",p)},5031:(i,e,t)=>{t.r(e);var a=t(5589),o=(t(7310),t(8030)),l=t.n(o),s=t(7847),r=t(5988),d=t(7598),n=t(1479),c=t(8083),h=t(3205),p=t(395);function m(){return a.dy`
  <style>
    ${s.F}
    ${d.Z}
    ${n.Z}
    ${c.Z}
    ${h.Z}
    ${p.Z}

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

    app-collection .title-section {
      display: flex;
      min-height: 42vw;
    }

    app-collection .title-section > div {
      flex: 1;
      padding: 2rem;
      width: 50%;
    }

    app-collection .collection-header {
      margin: auto;
    }

    app-collection .collection-header h1 {
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

    .collection-label {
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
      app-collection .title-section {
        display: block;
        overflow-y: -webkit-paged-x;
        padding-top: 3rem;
      }

      app-collection .title-section .collection-header {
        height: 11rem;
      }

      app-collection .title-section > div {
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
  
    <div class="edit-overlay" ?hidden="${!this.editMode||!this.isUiAdmin}">
    </div>
    <div class="admin-edit" ?hidden="${!this.isUiAdmin}">
      <div class="left-panel">
        <div class="file-upload-container" ?hidden="${!this.editMode||!this.isUiAdmin}">            
          <label for="file-upload" class="file-upload-label">
            <ucdlib-icon icon="ucdlib-dams:fa-plus"></ucdlib-icon>
            <span>New Image</span> 
          </label>
          <input id="file-upload" type="file" accept="image/jpeg" @change="${this._onFileChange}" />
        </div>  

        <div class="color-pallette" ?hidden="${!this.editMode||!this.isUiAdmin}">
          <div class="rose color-circle" ?selected="${"rose"===this.watercolor}" style="background-color: var(--color-rose)" @click="${this._onWatercolorChanged}"></div>
          <div class="gold color-circle" ?selected="${"gold"===this.watercolor}" style="background-color: var(--color-aggie-gold)" @click="${this._onWatercolorChanged}"></div>
          <div class="sage color-circle" ?selected="${"sage"===this.watercolor}" style="background-color: var(--color-farmers-market)" @click="${this._onWatercolorChanged}"></div>
          <div class="arboretum color-circle" ?selected="${"arboretum"===this.watercolor}" style="background-color: var(--color-arboretum)" @click="${this._onWatercolorChanged}"></div>
          <div class="tahoe color-circle" ?selected="${"tahoe"===this.watercolor}" style="background-color: var(--color-tahoe)" @click="${this._onWatercolorChanged}"></div>
          <div class="thiebaud-icing color-circle" ?selected="${"thiebaud-icing"===this.watercolor}" style="background-color: var(--color-thiebaud-icing)" @click="${this._onWatercolorChanged}"></div>
        </div>
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

    <div class="title-section">
      <div class="image-overlay">
        <img ?hidden="${!this.watercolorBgUrl}" class="watercolor-bg" src="${this.watercolorBgUrl}" width="100%" />

        <!-- <img class="featured-image" src="${this.thumbnailUrl}" width="45%" alt="collection featured image" /> -->
        <div class="featured-image" style="background-image: url(${this.thumbnailUrlOverride}), url(${this.thumbnailUrl})"></div>
        <img ?hidden="${!this.watercolorFgUrl}" class="watercolor-fg" src="${this.watercolorFgUrl}" width="100%" />
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
        <span class="collection-label">Coverage: </span> ${this.yearPublished}
      </div>
      <div style="margin-bottom: .4rem;" ?hidden="${!this.subjects?.length}">
        <span class="collection-label">Subjects: </span> 
          ${this.subjects.map(((i,e)=>a.dy`${e>0?", ":""}<a href="${i["@id"]}"
                  >${i.name||i["@id"]}</a>`))}
      </div>
      <div style="margin-bottom: .4rem;" ?hidden="${!this.material}">
        <span class="collection-label">Format: </span> ${this.material}
      </div>
      <div style="margin-bottom: .4rem;" ?hidden="${!this.languages?.length}">
        <span class="collection-label">Language: </span> 
        ${this.languages?.map(((i,e)=>a.dy`<span>${i.name}</span>${e<this.languages?.length-1?", ":""} `))}
      </div>
      <div style="margin-bottom: .4rem;" ?hidden="${!this.location}">
        <span class="collection-label">Location: </span> ${this.location}
      </div>
    </div>

    <div class="collection-highlights">
      <h2 ?hidden="${(0===this.highlightedItems.length||this.itemCount<=0)&&!this.editMode}">Highlights From This Collection</h2>
      ${r.Z.headerDots()}
      
      <div class="edit-collections-container" ?hidden="${!this.editMode||!this.isUiAdmin}">

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
                ?checked="${6===this.itemCount}" 
                @change="${this._onItemDisplayChange}">
              <label for="six">6 (recommended)</label>
            </li>
            <li>
              <input id="three" 
                name="radio-items-per-page" 
                type="radio" 
                class="radio" 
                value="3" 
                ?checked="${3===this.itemCount}" 
                @change="${this._onItemDisplayChange}">
              <label for="three">3</label>
            </li>
            <li>
              <input id="zero" 
                name="radio-items-per-page" 
                type="radio" 
                class="radio" 
                value="0" 
                ?checked="${0===this.itemCount}" 
                @change="${this._onItemDisplayChange}">
              <label for="zero">0</label>
            </li>
          </ul>
        </div>
      </fieldset>

        <div class="card-trio" ?hidden="${0===this.itemCount}">      
          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-1 item-ark-input" 
              type="text" 
              .value="${this.savedItems[0]?this.savedItems[0]["@id"].split("/item")[1]:""}" 
              placeholder="/ark:/..." />
          </div>

          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-2 item-ark-input" 
              type="text" 
              .value="${this.savedItems[1]?this.savedItems[1]["@id"].split("/item")[1]:""}" 
              placeholder="/ark:/..." />
          </div>

          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-3 item-ark-input" 
              type="text" 
              .value="${this.savedItems[2]?this.savedItems[2]["@id"].split("/item")[1]:""}" 
              placeholder="/ark:/..." />
          </div>
        </div>
      
        <div class="card-trio" ?hidden="${6!==this.itemCount}">      
          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-4 item-ark-input" 
              type="text" 
              .value="${this.savedItems[3]?this.savedItems[3]["@id"].split("/item")[1]:""}" 
              placeholder="/ark:/..." />
          </div>

          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-5 item-ark-input" 
              type="text" 
              .value="${this.savedItems[4]?this.savedItems[4]["@id"].split("/item")[1]:""}" 
              placeholder="/ark:/..." />
          </div>

          <div class="collection-item">
            <span>Item ARK ID</span>
            <input class="item-6 item-ark-input" 
              type="text" 
              .value="${this.savedItems[5]?this.savedItems[5]["@id"].split("/item")[1]:""}" 
              placeholder="/ark:/..." />
          </div>
        </div>

        <div class="default-display">
          <h3>Display Settings for Collection Item Pages</h3>

          <div class="default-item-display">
            <span class="label" style="display: block;">Default Display for Multipage Items</span>
            <span style="font-style: italic; margin-bottom: 0.5rem; display: inline-block;">Single page items and multimedia are not affected by these settings.</span>
            
            <fieldset class="radio default-item-display-fs">
              <div>
                <ul class="list--reset" style="padding-inline-start: 0;">
                  <li>
                    <input id="two" 
                      name="radio-default-display" 
                      type="radio" 
                      class="radio" 
                      value="${l().itemDisplayType.brTwoPage}" 
                      ?checked="${this.itemDefaultDisplay===l().itemDisplayType.brTwoPage}" 
                      @change="${i=>this.itemDefaultDisplay=l().itemDisplayType.brTwoPage}">
                    <label for="two">${l().itemDisplayType.brTwoPage}</label>
                  </li>
                  <li>
                    <input id="one" 
                      name="radio-default-display" 
                      type="radio" 
                      class="radio" 
                      value="${l().itemDisplayType.brOnePage}" 
                      ?checked="${this.itemDefaultDisplay===l().itemDisplayType.brOnePage}" 
                      @change="${i=>this.itemDefaultDisplay=l().itemDisplayType.brOnePage}">
                    <label for="one">${l().itemDisplayType.brOnePage}</label>
                  </li>
                  <li>
                    <input id="list" 
                      name="radio-default-display" 
                      type="radio" 
                      class="radio" 
                      value="${l().itemDisplayType.imageList}" 
                      ?checked="${this.itemDefaultDisplay===l().itemDisplayType.imageList}" 
                      @change="${i=>this.itemDefaultDisplay=l().itemDisplayType.imageList}">
                    <label for="list">${l().itemDisplayType.imageList}</label>
                  </li>
                </ul>
              </div>
            </fieldset>
          </div>
          <div class="exceptions" ?hidden="${this.itemEdits.length<1}">
            <span class="label">Exceptions</span>
            <p style="margin-top: 0.3rem; padding-bottom: 0; margin-bottom: 0;">
              Checked items in this list will be reset to the default item display when saved. 
              Display overrides can also be managed directly on an item page.
            </p>
            <fieldset style="border: none; padding-left: 0; padding-top: 0; margin-top: 0;">
              <ul class="list--reset" style="padding-inline-start: 0; width: 100%;">
                <li style="width: 33%; padding-right: 0;">
                  <input id="checkbox-all" 
                    name="checkbox-all" 
                    type="checkbox" 
                    @change="${this._onSelectAllExceptionsChange}">
                  <label for="checkbox-all">Select all exceptions</label>
                </li>

                <!-- items with exceptions set -->
                ${this.itemEdits.map(((i,e)=>a.dy`
                  <li style="width: 33%; padding-right: 0;">
                    
                    <input id="checkbox${e}" 
                      name="checkbox" 
                      type="checkbox"
                      data-item-id="${i.id}">
                    <label for="checkbox${e}">
                      <a href="${i.id}">${i.linkLabel}</a>
                      <span style="font-style: italic;">
                        (${i.defaultDisplay})
                      </span>
                    </label>
                  </li>
                `))}
          
              </ul>
            </fieldset>
          </div>
        </div>
      
      </div>
      <div ?hidden="${this.editMode}" style="padding: 0 2rem;">
        <div class="card-trio" ?hidden="${this.itemCount<3}">
          ${this.highlightedItems.map(((i,e)=>a.dy`
            ${e<3?a.dy`<dams-item-card data-itemid="${"/item"+i["@id"].split("/item")[1]}"></dams-item-card>`:""}
          `))}
        </div>
        <div class="card-trio" ?hidden="${this.itemCount<6}">
          ${this.highlightedItems.map(((i,e)=>a.dy`
            ${e>=3?a.dy`<dams-item-card data-itemid="${"/item"+i["@id"].split("/item")[1]}"></dams-item-card>`:""}
          `))}
        </div>
      </div>

      <a href="${this.collectionSearchHref}" class="btn btn--primary btn--lg view-all-collections">View all collection items</a>

    </div>

    <app-citation .record="${this.citationRoot}"></app-citation>

  `}var g=t(8077),u=t(5700),b=t(2959),y=(t(1807),t(9379),t(4941),t(6030));class v extends((0,g.Z)(a.oi).with(u.C,b.LitCorkUtils)){static get properties(){return{collectionId:{type:String},description:{type:String},title:{type:String},thumbnailUrl:{type:String},thumbnailUrlOverride:{type:String},callNumber:{type:String},subjects:{type:Array},material:{type:String},languages:{type:Array},location:{type:String},items:{type:Number},yearPublished:{type:Number},highlightedItems:{type:Array},savedItems:{type:Array},dbsync:{type:Object},watercolor:{type:String},watercolorBgUrl:{type:String},watercolorFgUrl:{type:String},displayData:{type:Array},isUiAdmin:{type:Boolean},editMode:{type:Boolean},itemCount:{type:Number},collectionSearchHref:{type:String},citationRoot:{type:Object},itemDefaultDisplay:{type:String},itemEdits:{type:Array}}}constructor(){super(),this.render=m.bind(this),this.active=!0,this.appDataLoaded=!1,this.reset(),this._injectModel("AppStateModel","CollectionModel","RecordModel","FcAppConfigModel","SeoModel")}async firstUpdated(){this._onAppStateUpdate(await this.AppStateModel.get())}async _onAppStateUpdate(i){if("collection"===this.AppStateModel.location.page){if(this.collectionId!==i.location.fullpath){this.reset(),this.collectionId=i.location.fullpath;try{let i=await this.CollectionModel.get(this.collectionId);this.onCollectionUpdate(i)}catch(i){this.dispatchEvent(new CustomEvent("show-404",{}))}}}else this.reset()}async onCollectionUpdate(i){if("loaded"!==i.state)return;if("collection"!==this.AppStateModel.location.page)return;await this._parseDisplayData();let e=this.RecordModel.emptySearchDocument();this.RecordModel.appendKeywordFilter(e,"@graph.isPartOf.@id",i.vcData.id),this.collectionSearchHref="/search/"+this.RecordModel.searchDocumentToUrl(e),this.collectionId=i.vcData.id,this.description=i.vcData.description,this.title=i.vcData.title,this.thumbnailUrlOverride||(this.thumbnailUrl=i.vcData.images?.medium?.url||i.vcData.images?.original?.url||""),this.thumbnailUrl||(this.thumbnailUrl="/images/tree-bike-illustration.png"),this.watercolor||(this.watercolor="rose",this.watercolorBgUrl="/images/watercolors/collection-watercolor-"+this.watercolor+"-back-white.jpg",this.watercolorFgUrl="/images/watercolors/collection-watercolor-"+this.watercolor+"-front.png");let t=i.payload.root||{};this.callNumber=i.vcData.callNumber,this.subjects=i.vcData.subjects||[],this.material=t.material||"",this.languages=Array.isArray(t.language||[])?t.language:[t.language],this.location=t.location||"",this.items=i.vcData.count,this.yearPublished=i.vcData.yearPublished,this.citationRoot=t,this.appDataLoaded&&!this.savedItems.length&&this.getLatestItems(),this._updateDisplayData()}async getLatestItems(){if(this.loadingLatestItems||this.highlightedItems.length)return;this.loadingLatestItems=!0;let i=await this.RecordModel.getRecentItems(this.collectionId,this.itemCount);i.response.ok&&i.body.results.length&&(this.highlightedItems=i.body.results.map(((i,e)=>({"@id":i["@graph"][0]["@id"],description:i["@graph"][0].name,position:e+1,image:i["@graph"][0].thumbnailUrl})))),this.loadingLatestItems=!1}reset(){this.collectionId="",this.description="",this.title="",this.thumbnailUrl="",this.thumbnailUrlOverride="",this.callNumber="",this.subjects=[],this.material="",this.languages=[],this.location="",this.items=0,this.yearPublished=0,this.highlightedItems=[],this.savedItems=[],this.dbsync={},this.watercolor="",this.watercolorBgUrl="",this.watercolorFgUrl="",this.displayData=[],this.isUiAdmin=y.Z.canEditUi(),this.editMode=!1,this.itemCount=6,this.citationRoot={},this.itemDefaultDisplay=l().itemDisplayType.brTwoPage,this.itemEdits=[]}_onItemDisplayChange(i){this.itemCount=parseInt(i.target.value),document.querySelectorAll(".item-ark-input").forEach(((i,e)=>{e+1>this.itemCount&&(i.value="")})),this._updateDisplayData()}_onEditClicked(i){this.isUiAdmin&&(this.editMode=!0)}async _onSaveClicked(i){if(!this.isUiAdmin)return;this.editMode=!1,this.savedItems=[];let e=[];document.querySelectorAll(".item-ark-input").forEach(((i,t)=>{i.value&&e.push({"@id":"/item"+i.value.trim(),position:t+1})})),this.savedItems=[...e];let t=document.querySelector("#file-upload").files[0];this._updateDisplayData(t),await this.FcAppConfigModel.saveCollectionDisplayData(this.collectionId,this.displayData),t&&await this.FcAppConfigModel.saveCollectionFeaturedImage(this.collectionId,t);let a=[];this.querySelectorAll('.exceptions input[name="checkbox"]').forEach((i=>{if(!i.checked)return;let e=i.dataset.itemId;e&&a.push(e)})),a.length&&await this.FcAppConfigModel.updateItemDisplayExceptions(a,this.itemDefaultDisplay),this.requestUpdate(),this.AppStateModel.setLocation(this.collectionId)}_onCancelEditClicked(i){this.isUiAdmin&&(this.editMode=!1)}_onWatercolorChanged(i){this.isUiAdmin&&(this.watercolor=i.target.classList[0],this.watercolorBgUrl="/images/watercolors/collection-watercolor-"+this.watercolor+"-back-white.jpg",this.watercolorFgUrl="/images/watercolors/collection-watercolor-"+this.watercolor+"-front.png",this._updateDisplayData())}_onSelectAllExceptionsChange(i){i.currentTarget.checked&&this.querySelectorAll('.exceptions input[name="checkbox"]').forEach((i=>{i.checked=!0}))}async _parseDisplayData(){let i;try{i=await this.CollectionModel.getCollectionEdits(this.collectionId)}catch(i){console.warn("Error retrieving collection edits",i)}if("loaded"!==i.state)return;if(!Object.keys(i.payload).length)return;let e=i.payload?.collection||{},t=i.payload?.items||{};if(this.watercolor=e.watercolors?.css||"rose",this.watercolorBgUrl="/images/watercolors/collection-watercolor-"+this.watercolor+"-back-white.jpg",this.watercolorFgUrl="/images/watercolors/collection-watercolor-"+this.watercolor+"-front.png",this.thumbnailUrlOverride=e.thumbnailUrl?.["@id"]||"",this.thumbnailUrlOverride){let i=new URL(this.thumbnailUrlOverride);this.thumbnailUrlOverride=i?.pathname}this.itemCount=e.itemCount||6,this.itemDefaultDisplay=e.itemDefaultDisplay||l().itemDisplayType.brTwoPage,this.itemEdits=Object.entries(t).map((([i,e])=>({id:i,linkLabel:i.split("/").pop(),defaultDisplay:e.itemDefaultDisplay}))).filter((i=>i.defaultDisplay&&i.defaultDisplay!==this.itemDefaultDisplay)),0===this.itemCount&&(this.querySelector("#zero").checked=!0),3===this.itemCount&&(this.querySelector("#three").checked=!0),6===this.itemCount&&(this.querySelector("#six").checked=!0),this.itemDefaultDisplay===l().itemDisplayType.brTwoPage&&(this.querySelector("#two").checked=!0),this.itemDefaultDisplay===l().itemDisplayType.brOnePage&&(this.querySelector("#one").checked=!0),this.itemDefaultDisplay===l().itemDisplayType.imageList&&(this.querySelector("#list").checked=!0),this.appDataLoaded=!0,this._updateDisplayData(),this.requestUpdate()}_updateDisplayData(i=""){let e={title:this.title,watercolor:this.watercolor,itemCount:this.itemCount,itemDefaultDisplay:this.itemDefaultDisplay,savedItems:this.savedItems,newFileUploadName:i,thumbnailUrlOverride:this.thumbnailUrlOverride};this.displayData=this.FcAppConfigModel.getCollectionDisplayData(this.collectionId,e)}async _onFileChange(i){if(!i.target.value.split("\\").pop().length)return;let e=i.target.files[0];document.querySelector(".featured-image").style.backgroundImage="url("+window.URL.createObjectURL(e)+")"}}customElements.define("app-collection",v)},4287:(i,e,t)=>{var a=t(5589),o=t(2959),l=t(7847);function s(){return a.dy`

<style include="shared-styles">
  ${l.F}

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

`}class r extends((0,o.Mixin)(a.oi).with(o.LitCorkUtils)){static get properties(){return{visible:{type:Boolean}}}constructor(){super(),this.render=s.bind(this),this.active=!0,this.visible=!1}showPopup(){this.visible=!0,setTimeout((()=>{this.visible=!1}),5e3)}}customElements.define("app-toast-popup",r)},5988:(i,e,t)=>{t.d(e,{Z:()=>o});var a=t(5589);const o=new class{headerDots(){return a.dy`
      <div class="header-dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    `}}},6030:(i,e,t)=>{t.d(e,{Z:()=>o});const a=t(6794),o=new class{constructor(){this.data=a.user,this.data.roles||(this.data.roles=[]),this.editUiAccess=["admin","ui-admin"]}isLoggedIn(){return!0===this.data.loggedIn}canEditUi(){for(let i of this.editUiAccess)if(this.hasRole(i))return!0;return!1}hasRole(i){return this.data.roles.includes(i)}}},76:(i,e,t)=>{t.d(e,{A:()=>s});var a=t(543),o=t(109);class l extends o.Xe{constructor(i){if(super(i),this.et=a.Ld,i.type!==o.pX.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(i){if(i===a.Ld||null==i)return this.ft=void 0,this.et=i;if(i===a.Jb)return i;if("string"!=typeof i)throw Error(this.constructor.directiveName+"() called with a non-string value");if(i===this.et)return this.ft;this.et=i;const e=[i];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}l.directiveName="unsafeHTML",l.resultType=1;const s=(0,o.XM)(l)}}]);