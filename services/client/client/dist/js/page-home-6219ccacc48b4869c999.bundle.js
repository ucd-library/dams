"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[628],{9197:(e,t,i)=>{var o=i(5589),a=i(2959);function l(){return o.dy`

<style>
  :host {
    display: block;
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
    transition: .3s;
  }
  .container:hover .head, .container:focus .head {
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
    width: 0;
    transition: .4s;
    border-bottom: 5px dotted var(--color-dams-secondary);
  }
  .container:hover .gold-dots, .container:focus .gold-dots {
    width: 100%;
  }

  .marketing-highlight {
    display: block;
    color: inherit;
    text-decoration: none;
  }

  .marketing-highlight:hover .marketing-highlight__image .u-background-image {
    transform: scale(1.1);
  }

  .marketing-highlight__image {
    position: relative;
    overflow: hidden;
    margin: 1rem 0;
  }

  .marketing-highlight__image .u-background-image {
    transition: transform .3s ease-in-out;
  }

  .marketing-highlight__title {
    font-size: 1.2rem;
    margin-bottom: 0;
    padding-top: 0;
    margin-top: 0;
    line-height: 1.2;
  }

  .marketing-highlight__items {
    font-size: 1rem;
    color: var(--color-aggie-blue-80);
    font-weight: 600;
    line-height: 1.25;
    margin: 0.5rem 0 1rem;
  }

  .u-background-image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .u-background-image.loading {
    background-color: #dcdcdc;
  }

  .aspect--4x3 {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding-top: 75%;
  }

  .marketing-highlight__body.dark h4 {
    color: var(--color-white);
    /* font-size: 1.5rem; */
    text-align: left;
  }

  .marketing-highlight__body.dark p {
    color: var(--color-black-30);
    /* font-size: 1.1rem; */
    text-align: left;
  }

  .marketing-highlight__body.dark {
    padding-top: 0.5rem;
  }

</style>  

<!-- <div class="container"><a href="${this.href}">
  <div class="head">
    <div class="img-container">
      ${this.imgSrc?o.dy`
        <img src="${this.imgSrc}">
      `:o.dy``}
    </div>
  </div>
  <div class="body">
    <h5>${this.cardTitle}</h5>
    <div class="subtitle">${this.itemCt} item${1===this.itemCt?"":"s"}</div>
  </div>
  <div class="footer">
    <div class="gold-dots"></div>
  </div></a>
</div> -->


<a href="${this.href}" class="marketing-highlight category-brand--secondary u-space-mb o-box">
  <div class="marketing-highlight__image">
    <div class="aspect--4x3 u-background-image ${this.loading?"loading":""}" role="img" aria-label="" style="background-image:url(${this.imgSrc})">
  </div>
  </div>
  <div class="marketing-highlight__body ${this.darkBg?"dark":""}">
    <h4 class="marketing-highlight__title">${this.cardTitle}</h4>
    <p class="marketing-highlight__items">${this.itemCt||0} items</p>
  </div>
</a>



`}class r extends((0,a.Mixin)(o.oi).with(a.LitCorkUtils)){static get properties(){return{collection:{type:Object},id:{type:String,attribute:"data-id"},imgSrc:{type:String,attribute:"img-src"},cardTitle:{type:String,attribute:"card-title"},itemCt:{type:Number,attribute:"item-ct"},href:{type:String},darkBg:{type:Boolean,attribute:"data-dark-bg"},loading:{type:Boolean}}}constructor(){super(),this.render=l.bind(this),this.collection={},this.id="",this.renderedId="",this.imgSrc="",this.cardTitle="",this.itemCt=0,this.href="",this.darkBg=!1,this.loading=!0,this._injectModel("CollectionModel","FcAppConfigModel")}async updated(e){e.has("id")&&this.id&&this.id!==this.renderedId?this._onCollectionUpdate(await this.CollectionModel.get(this.id)):e.has("href")&&!this.id&&(this.id=this.href)}async _onCollectionUpdate(e){if("loaded"!==e.state||e.id!==this.id||this.renderedId===this.id)return;this.loading=!1,this.renderedId=this.id,this.collection=e.vcData;let t=await this.CollectionModel.getFeaturedImage(this.id,this.FcAppConfigModel);if(t)this.imgSrc=t;else if(this.collection.images){let e=this.collection.images;this.imgSrc=e.medium?e.medium.url:e.original.url}else this.imgSrc="/images/tree-bike-illustration.png";this.cardTitle=this.collection.title,this.itemCt=this.collection.count,this.href=this.collection.id,this.darkBg=!!this.attributes["data-dark-bg"]}}customElements.define("dams-collection-card",r)},9379:(e,t,i)=>{var o=i(5589),a=i(2959);function l(){return o.dy`
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
  `}i(1807);class r extends((0,a.Mixin)(o.oi).with(a.LitCorkUtils)){static get properties(){return{id:{type:String,attribute:"data-itemid"},data:{type:Object},itemUrl:{type:String},thumbnailUrl:{type:String},truncatedTitle:{type:String},mediaType:{type:String}}}constructor(){super(),this.render=l.bind(this),this.id="",this.data={},this.truncatedTitle="",this.itemUrl="",this.thumbnailUrl="",this.mediaType="",this._injectModel("RecordModel")}willUpdate(e){if(this.data.id)if(this.itemUrl=this.data.id,this.thumbnailUrl=this.data.thumbnailUrl,this.mediaType=this.data.mediaType,"Image"===this.data.mediaType)this.mediaType="image";else if("Video"===this.data.mediaType)this.mediaType="video";else if("Audio"===this.mediaType)this.mediaType="audio";else{this.mediaType="imageList";let e=this.data.format[0]?.split(" ")[0];e&&parseInt(e)<2&&(this.mediaType="image")}else this._getItem(this.id);this._truncateTitle()}async _onRecordUpdate(e){if("loaded"===e.state&&e.id===this.id){if(this.record=e.vcData,this.record.images){let e=this.record.images;this.thumbnailUrl=e.medium?e.medium.url:e.original.url}this.title=this.record.name,this.itemUrl=this.record["@id"],this.id=this.record["@id"],this._truncateTitle()}}async _getItem(e){this._onRecordUpdate(await this.RecordModel.get(e))}_truncateTitle(){this.data&&this.data.title&&this.data.title.length>38?this.truncatedTitle=this.data.title.substring(0,34)+"...":this.data&&this.data.title?this.truncatedTitle=this.data.title:this.title&&this.title.length>38?this.truncatedTitle=this.title.substring(0,34)+"...":this.title?this.truncatedTitle=this.title:this.truncatedTitle=""}}customElements.define("dams-item-card",r)},2651:(e,t,i)=>{i.r(t);var o=i(5589),a=i(8077),l=i(5700),r=i(2959),n=(i(7506),i(7310),i(9215),i(1807),i(1314),i(4827),i(2841),i(7885),i(6236),i(3962),i(6819),i(9197),i(9379),i(9567));function s(){return o.dy`

<style>
  :host {
    display: block;
  }
  .container {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    z-index: 1;
  }
  .image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    animation: fadein 1.5s ease-in-out;
    z-index: -1;
  }
  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  ::slotted(*) {
    color: var(--color-white) !important;
  }
  dams-watercolor {
    display: block;
    height: 8rem;
    margin-bottom: -1px; /* hack to ensure we don't get line at bottom */
  }
  
</style>

<div class="container" style="${(0,n.V)(this.getContainerStyles())}">  
  <div class="image"></div>
  <slot></slot>
  ${this.watercolor?o.dy`
    <dams-watercolor 
      element="div"
      src-file-prefix="${this.watercolor.split("-")[0]}"
      color="${this.watercolor.split("-")[1]}">
    </dams-watercolor>
  `:o.dy``}
</div>

`}i(4993),i(8153);class c extends((0,r.Mixin)(o.oi).with(r.LitCorkUtils)){static get properties(){return{src:{type:String},srcOptions:{type:Array,attribute:"src-options"},watercolor:{type:String},selectedSrcUrl:{type:String,attribute:"selected-src-url"}}}constructor(){super(),this.render=s.bind(this),this.src="",this.srcOptions=[],this.selectedSrcUrl="",this.watercolor="border-white",this._srcChange=new CustomEvent("src-change",{detail:{message:"A new image has been loaded"}}),this._injectModel("FcAppConfigModel")}shuffleImage(){return this._setSrc(),this.selectedSrcUrl}updated(e){if(e.has("selectedSrcUrl")&&this.selectedSrcUrl.length>0){let e=new Image;e.src=this.selectedSrcUrl,e.onload=()=>{let t=this.shadowRoot.querySelector(".image");t.style.backgroundImage+="var(--gradient-ag-putah), url("+e.src+")",t.style.backgroundSize="cover",t.style.opacity="1"}}}async _setSrc(){if(!this.srcOptions||this.srcOptions.length<1)return this.selectedSrcUrl="/images/defaults/annual-winter-sale1952.jpg",void this.dispatchEvent(this._srcChange);let e=Math.floor(Math.random()*this.srcOptions.length),t=this.srcOptions[e];this.selectedSrcUrl=t.imageUrl;let i=new Image;i.src=this.selectedSrcUrl,i.onload=()=>{let e=this.shadowRoot.querySelector(".image");e.style.backgroundImage+="var(--gradient-ag-putah), url("+i.src+")",e.style.opacity="1"},this.dispatchEvent(this._srcChange)}getContainerStyles(){return{"background-image":"var(--gradient-ag-putah)"}}}customElements.define("dams-hero",c),i(5507);var d=i(7598),h=i(1479),g=i(8083);function p(){return o.dy`

<style>
  /* ${o.iv`faCss`} */
  ${d.Z}
  ${h.Z}
  ${g.Z}
  :host {
    display: block;
  }
  .container {
    display: flex;
    flex-direction: column;
  }
  .img-container {
    position: relative;
    padding-top: 75%;
    width: 100%;
    /* background-image: url(/images/logos/logo-white-512.png);
    background-color: var(--color-black-20);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center; */
  }
  .img-flex {
    flex-grow: 1;
  }
  .img-container img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .text-container {
    flex-grow: 1;
    align-self: flex-start;
    padding: 2rem;
  }
  .title {
    /* color: var(--color-h3);
    font-size: var(--fs-h3);
    font-weight: var(--fw-h3); */
    margin-bottom: 5px;
    margin-top: 40px;
  }
  .subtitle {
    color: var(--color-h5);
    font-size: var(--fs-h5);
    font-weight: var(--fw-h5);
    margin-bottom: 20px;
  }
  .description {
    color: var(--color-p);
    /* font-size: var(--fs-p); */
    font-weight: var(--fw-p);
    margin-bottom: 40px;
  }
  .btn--alt {
    padding-top: 0;
    padding-bottom: 0;
  }
  @media (min-width: 767px) {
    .container {
      flex-direction: row;
    }
    .container.image-right {
      flex-direction: row-reverse;
    }
    .img-flex {
      flex-grow: unset;
      width: calc(50% - 20px);
      min-width: calc(50% - 20px);
    }
    .title {
      margin-top: 0;
    }
    .text-container {
      align-self: center;
    }
  }

  @media (min-width: 1060px) {
    .img-flex {
      width: calc(50% - 50px);
      min-width: calc(50% - 50px);
    }
  }

  @media (min-width: 1601px) {


  }
</style>  
<div class="container${this.imageRight?" image-right":""}">

  <div class="img-flex">
    <div class="img-container">
      ${this.imgSrc?o.dy`
        <img src="${this.imgSrc}">
      `:o.dy``}
      <!-- <img src="/images/eastman-demo.jpeg"> -->
    </div>
  </div>

  <div class="text-container">
    <h3 class="title heading--primary" role="heading" aria-level="2">${this.collectionTitle}</h3>
    <div class="subtitle">${this.itemCt} item${1===this.itemCt?"":"s"}</div>
    <div class="description">
    <ucdlib-md id="md">
        <ucdlib-md-content>
          ${this.collectionDesc}
        </ucdlib-md-content>
      </ucdlib-md>  
    </div>
    <a href="${this.href}" class="btn--alt btn--round">Explore this collection</a>
  </div>

  <!-- <div class="text-container">
    <h3 class="heading--primary">Eastman's Originals</h3>
    <div class="subtitle">13,258 items</div>
    <div class="description">
      Photographs, negatives and postcards captured by Jervie Henry Eastman for a wide
      variety of northern California locations and events, including dam construction, logging, mining, food processing,
      and commmunity buildings and activities from circa 1890 - 1960.
    </div>
    <a href="${this._href}" class="btn--alt btn--round">Explore this collection</a>
  </div> -->

</div>
`}class m extends((0,r.Mixin)(o.oi).with(r.LitCorkUtils)){static get properties(){return{collection:{type:Object},collectionId:{type:String,attribute:"collection-id"},imageRight:{type:Boolean,attribute:"image-right"},collectionTitle:{type:String,attribute:"collection-title"},imgSrc:{type:String,attribute:"img-src"},collectionDesc:{type:String,attribute:"collection-desc"},itemCt:{type:Number,attribute:"item-ct"},href:{type:String}}}constructor(){super(),this.render=p.bind(this),this.collection={},this.collectionId="",this.renderedCollectionid="",this.imageRight=!1,this.collectionTitle="",this.imgSrc="",this.collectionDesc="",this.itemCt=0,this.href="",this._injectModel("CollectionModel")}willUpdate(e){Object.keys(this.collection).length?(this.collection.label?this._collectionTitle=this.collection.label:this.collection.associatedMedia.name&&(this._collectionTitle=this.collection.associatedMedia.name),this.collection.description?this._collectionDesc=this.collection.description:this.collection.associatedMedia.description&&(this._collectionDesc=this.collection.associatedMedia.description),this._imgSrc=this.collection.thumbnailUrl?this.collection.thumbnailUrl:this.collection.associatedMedia.thumbnailUrl,this._itemCt=this.collection.associatedMedia.recordCount,this._href=this.collection.associatedMedia["@id"]):this.collectionId&&this.collectionId!==this.renderedCollectionid&&(this.renderedCollectionid=this.collectionId,this._getCollection(this.collectionId))}async _getCollection(e){let t=await this.CollectionModel.get(e);if(t.vcData.images){let e=t.vcData.images;this.imgSrc=e.medium?e.medium.url:e.original.url}else this.imgSrc="/images/tree-bike-illustration.png";this.collectionTitle=t.vcData.title,this.itemCt=t.vcData.count,this.href=t.id}}customElements.define("dams-highlighted-collection",m);var u=i(7847);function b(){return o.dy`
    <style>
      ${u.F} :host {
        display: block;
        position: relative;
        z-index: 500;
        /* background-color: var(--color-aggie-blue-40) */
      }

      h2 {
        font-style: italic;
        font-weight: 700;
        text-align: center;
        color: var(--color-aggie-blue);
        font-size: 2rem;
      }

      .img-box {
        cursor: pointer;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        border: 3px solid var(--color-aggie-blue-60);
        height: 125px;
        width: 240px;
        margin: 0.5rem;
      }

      .img-box:hover {
        border: 3px solid var(--color-aggie-gold);
        background-color: var(--color-aggie-gold);
      }

      .img-box ucdlib-icon {
        fill: var(--color-aggie-blue-80);
        width: 100%;
        height: 100%;
      }

      .img-box .content-type-label {
        color: var(--color-aggie-blue-80);
        text-align: center;
        display: block;
        padding: 0.5rem;
        font-weight: bold;
      }

      .add-content-container {
        display: flex;
        width: 50%;
        margin: 0 auto;
        justify-content: space-between;
      }

      @media (max-width: 991px) {
        /* tablet and mobile, just style full width */
        .add-content-container {
          width: 90%;
        }
      }
    </style>

    ${this.panels.map((e=>o.dy`
        <admin-content-panel
          @panel-loaded="${this._updateUiStyles}"
          @trash-clicked="${this._trashPanel}"
          @up-arrow-clicked="${this._movePanelUp}"
          @down-arrow-clicked="${this._movePanelDown}"
          type="${e.type}"
          position="${e.position}"
          placement="${e.placement}"
          collectionId="${e.collectionId}"
          heading="${e.heading}"
          description="${e.description}"
          .collectionIds="${e.collectionIds}"
        >
        </admin-content-panel>
      `))}

    <h2>Add Content:</h2>
    <div class="add-content-container">
      <div class="single img-box" @click="${this._newPanel}">
        <ucdlib-icon
          icon="ucdlib-dams:dams-admin-collection-single"
        ></ucdlib-icon>
        <span class="content-type-label">Collection Single</span>
      </div>
      <div class="cards img-box" @click="${this._newPanel}">
        <ucdlib-icon
          icon="ucdlib-dams:dams-admin-collection-cards"
        ></ucdlib-icon>
        <span class="content-type-label">Collection Cards</span>
      </div>
      <div class="text img-box" @click="${this._newPanel}">
        <ucdlib-icon icon="ucdlib-dams:dams-admin-text"></ucdlib-icon>
        <span class="content-type-label">Text</span>
      </div>
    </div>
  `}var v=i(9248),f=i(5721),y=i(3205),w=i(395);function k(){return o.dy`
    <style>
      ${u.F}
        ${v.Z}
        ${f.Z}
        ${y.Z}
        ${w.Z}
        :host {
        display: block;
        position: relative;
        z-index: 500;
        padding-bottom: 5rem;
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
        margin-left: 0.3rem;
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
        margin: -25px 0.5rem 0;
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
        padding-right: 0.5rem;
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
      .heading-text,
      .single-collection {
        margin-top: 0.5rem;
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
        font-size: 0.8rem;
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
        padding-top: 0.5rem;
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
        padding-top: 0.5rem;
      }

      @media (max-width: 991px) {
        /* tablet and mobile, just style full width */
        .form-content {
          width: 90%;
        }
      }
    </style>

    <div class="editor-row-control">
      <div class="icon-wrapper edit" @click="${this._onUpArrowClicked}">
        <ucdlib-icon icon="ucdlib-dams:fa-arrow-up"></ucdlib-icon>
      </div>
      <div
        class="icon-wrapper edit"
        style="margin-left: .3rem;"
        @click="${this._onDownArrowClicked}"
      >
        <ucdlib-icon icon="ucdlib-dams:fa-arrow-down"></ucdlib-icon>
      </div>
      <div class="dots flex-expand"></div>
      <div style="background-color: var(--color-aggie-blue-40); height: 75px">
        <ucdlib-icon
          icon="ucdlib-dams:${this.controlIcons[this.type]}"
          style="width: 150px; height: 100%;"
        ></ucdlib-icon>
      </div>
      <div class="dots flex-expand"></div>
      <div class="icon-wrapper edit" @click="${this._onTrashClicked}">
        <ucdlib-icon icon="ucdlib-dams:fa-trash"></ucdlib-icon>
      </div>
    </div>

    <div class="form-content">
      <fieldset class="radio">
        <div ?hidden="${"single"!==this.type}">
          <span class="form-label">Feature Image</span>
          <ul class="list--reset">
            <li>
              <input
                id="placement-left"
                name="radio"
                type="radio"
                class="radio"
                value="left"
                ?checked="${"left"===this.placement}"
                @change="${e=>this.placement=e.currentTarget.value}"
              /><label for="placement-left">Left</label>
            </li>
            <li>
              <input
                id="placement-right"
                name="radio"
                type="radio"
                class="radio"
                value="right"
                ?checked="${"right"===this.placement}"
                @change="${e=>this.placement=e.currentTarget.value}"
              /><label for="placement-right">Right</label>
            </li>
          </ul>
        </div>

        <div ?hidden="${"text"!==this.type}">
          <span class="form-label">Text Placement</span>
          <ul class="list--reset">
            <li>
              <input
                id="placement-centered"
                name="radio"
                type="radio"
                class="radio"
                value="centered"
                ?checked="${"centered"===this.placement}"
                @change="${e=>this.placement=e.currentTarget.value}"
              /><label for="placement-centered">Centered</label>
            </li>
            <li>
              <input
                id="placement-left-aligned"
                name="radio"
                type="radio"
                class="radio"
                value="left-aligned"
                ?checked="${"left-aligned"===this.placement}"
                @change="${e=>this.placement=e.currentTarget.value}"
              /><label for="placement-left-aligned">Left-aligned</label>
            </li>
            <li>
              <input
                id="placement-split"
                name="radio"
                type="radio"
                class="radio"
                value="split"
                ?checked="${"split"===this.placement}"
                @change="${e=>this.placement=e.currentTarget.value}"
              /><label for="placement-split">Split (33/67)</label>
            </li>
          </ul>
        </div>
      </fieldset>

      <div class="content-row">
        <div ?hidden="${"single"!==this.type}">
          <span class="form-label">Collection</span>
          <ucd-theme-slim-select
            class="single-collection"
            @change="${e=>this.collectionId=e.detail.value}"
            @focusin="${this._ssSelectFocusIn}"
            @blur="${this._ssSelectBlur}"
          >
            <select>
              <option></option>
              ${this.sortedCollectionsList.map((e=>o.dy`
                  <option
                    .value=${e[0]}
                    ?selected=${this.collectionId===e[0]}
                  >
                    ${e[1]}
                  </option>
                `))}
            </select>
          </ucd-theme-slim-select>
        </div>
        <div ?hidden="${"text"!==this.type}">
          <span class="form-label">Heading</span>
          <input
            class="heading-text"
            type="text"
            .value=${this.heading}
            style="width: -webkit-fill-available; font-size: 0.9rem;";
            @change="${e=>this.heading=e.currentTarget.value}"
          />
        </div>
      </div>

      <div class="collection-list" ?hidden="${"cards"!==this.type}">
        <span class="form-label">Collections</span>
        ${this.collectionIds.map(((e,t)=>o.dy`
            <ucd-theme-slim-select
              @change="${this._onCollectionListChange}"
              @focusin="${this._ssSelectFocusIn}"
              @blur="${this._ssSelectBlur}"
              data-position="${e.position}"
              class="list"
              .options="${{settings:{openPosition:"up"}}}"
            >
              <!-- <select class="collections">
          <option></option>
        </select> -->
              <select class="collections">
                <option></option>
                ${this.sortedCollectionsList.map((e=>o.dy`
                    <option
                      .value=${e[0]}
                      ?selected="${this.collectionIds[t].selected===e[0]}"
                    >
                      ${e[1]}
                    </option>
                  `))}
              </select>
            </ucd-theme-slim-select>
          `))}

        <div class="add-collection-container">
          <span class="add-collection-label" @click="${this._addCollection}">
            <ucdlib-icon icon="ucdlib-dams:fa-plus"></ucdlib-icon>
            <span>Add Collection</span>
          </span>
        </div>
      </div>

      <div
        class="content-row"
        style="padding-top: 2rem;"
        ?hidden="${"cards"===this.type}"
      >
        <span class="form-label" style="display: block;">Description</span>
        <textarea
          class="description"
          style="height: 175px; font-size: .9rem; width: -webkit-fill-available;"
          .value=${this.description}
          @change="${e=>this.description=e.currentTarget.value}"
        >
        </textarea>
      </div>
    </div>
  `}i(4601);class x extends o.oi{static get properties(){return{type:{type:String},position:{type:Number},placement:{type:String},collectionId:{type:String},heading:{type:String},description:{type:String},collectionIds:{type:Array},controlIcon:{type:Object},sortedCollectionsList:{type:Array},isDirty:{type:Boolean}}}constructor(){super(),this.render=k.bind(this),this.active=!0,this.isDirty=!1,this.type="",this.position=0,this.placement="",this.collectionId="",this.heading="",this.description="",this.controlIcons={single:"dams-admin-collection-single",text:"dams-admin-text",cards:"dams-admin-collection-cards"},this.collectionIds=[],this.sortedCollectionsList=Object.entries(APP_CONFIG.collectionLabels).sort(((e,t)=>e[1]<t[1]?-1:1))}firstUpdated(){requestAnimationFrame((()=>{this.dispatchEvent(new CustomEvent("panel-loaded"))}))}updated(){if(this.isDirty){if(this.isDirty=!1,"single"===this.type){let e=this.shadowRoot.querySelector("ucd-theme-slim-select.single-collection");e&&e.slimSelect.setSelected(this.collectionId)}if("cards"===this.type){let e=this.shadowRoot.querySelectorAll("ucd-theme-slim-select.list");e&&e.forEach(((e,t)=>{this.collectionIds[t]&&e.slimSelect.setSelected(this.collectionIds[t].selected)}))}}requestAnimationFrame((()=>{this.dispatchEvent(new CustomEvent("panel-loaded"))})),"single"!==this.type&&"text"!==this.type||(this.shadowRoot.querySelector("#placement-"+this.placement).checked=!0)}_addCollection(){this.collectionIds.push({position:this.collectionIds.length,selected:""}),this.isDirty=!0,this.requestUpdate()}_onCollectionListChange(e){let t=e.currentTarget.dataset.position,i=e.detail.value,o=this.collectionIds.filter((e=>e.position===parseInt(t)))[0];o&&(o.selected=i,this.requestUpdate())}_onTrashClicked(e){this.dispatchEvent(new CustomEvent("trash-clicked",{detail:{position:this.position}})),requestAnimationFrame((()=>{this.dispatchEvent(new CustomEvent("panel-loaded"))}))}_onUpArrowClicked(e){this.dispatchEvent(new CustomEvent("up-arrow-clicked",{detail:{position:this.position}})),this.isDirty=!0,this.sortedCollectionsList=[...Object.entries(APP_CONFIG.collectionLabels).sort(((e,t)=>e[1]<t[1]?-1:1))],requestAnimationFrame((()=>{this.dispatchEvent(new CustomEvent("panel-loaded"))}))}_onDownArrowClicked(e){this.dispatchEvent(new CustomEvent("down-arrow-clicked",{detail:{position:this.position}})),this.isDirty=!0,this.sortedCollectionsList=[...Object.entries(APP_CONFIG.collectionLabels).sort(((e,t)=>e[1]<t[1]?-1:1))],requestAnimationFrame((()=>{this.dispatchEvent(new CustomEvent("panel-loaded"))}))}_ssSelectFocusIn(e){let t=e.currentTarget.shadowRoot.querySelector(".ss-main"),i=e.currentTarget.shadowRoot.querySelector(".ss-single-selected");"ss-single-selected ss-open-below"===i?.classList.value&&(i.style.backgroundColor="#FFF4D2",t.style.borderColor="#FFBF00")}_ssSelectBlur(e){let t=e.currentTarget.shadowRoot.querySelector(".ss-main");e.currentTarget.shadowRoot.querySelector(".ss-single-selected").style.backgroundColor="#B0D0ED",t.style.borderColor="#B0D0ED"}}customElements.define("admin-content-panel",x);class _ extends((0,r.Mixin)(o.oi).with(r.LitCorkUtils)){static get properties(){return{panels:{type:Array}}}constructor(){super(),this.render=b.bind(this),this.active=!0,this.panels=[],this._injectModel("FcAppConfigModel")}updated(){this._updateUiStyles(null,!0)}loadAdminData(e){this.panels=e}_newPanel(e){let t=e.currentTarget.classList[0];this.panels.push({position:this.panels.length,type:t,placement:"single"===t?"left":"centered",collectionId:"",heading:"",description:"",collectionIds:"cards"===t?[{position:0,selected:""}]:[]}),this.requestUpdate(),requestAnimationFrame((()=>{this._updateUiStyles(null,!0)}))}_updateUiStyles(e,t=!1){let i=e?e.currentTarget:null;if(!i&&!t)return;let o=[],a=[];t?(a=this.shadowRoot.querySelectorAll("admin-content-panel"),a.length&&a.forEach((e=>{o.push(...e.shadowRoot.querySelectorAll("ucd-theme-slim-select"))}))):o.push(...i.shadowRoot.querySelectorAll("ucd-theme-slim-select")),o.length&&o.forEach((e=>{let t=e.shadowRoot.querySelector(".ss-main");t&&(t.style.border="none",t.style.backgroundColor="transparent");let i=e.shadowRoot.querySelector(".ss-single-selected");i&&(i.style.border="none",i.style.height="49px",i.style.paddingLeft="1rem",i.style.backgroundColor="var(--color-aggie-blue-50)",i.style.borderRadius="0",i.style.fontWeight="bold",i.style.color="var(--color-aggie-blue)"),e.offsetWidth}))}_trashPanel(e){let t=e.detail.position;this.panels.splice(t,1),this.panels.forEach(((e,t)=>{e.position=t})),this.requestUpdate(),requestAnimationFrame((()=>{this._updateUiStyles(null,!0)}))}_movePanelUp(e){let t=e.detail.position;if(0===t)return;this._updatePanelsData();let i=this.panels.splice(t,1)[0];this.panels.splice(t-1,0,i),this.panels.forEach(((e,t)=>{e.position=t})),this.requestUpdate(),requestAnimationFrame((()=>{this._updateUiStyles(null,!0)}))}_movePanelDown(e){let t=e.detail.position;if(t===this.panels.length-1)return;this._updatePanelsData();let i=this.panels.splice(t,1)[0];this.panels.splice(t+1,0,i),this.panels.forEach(((e,t)=>{e.position=t})),this.requestUpdate(),requestAnimationFrame((()=>{this._updateUiStyles(null,!0)}))}_updatePanelsData(){this.shadowRoot.querySelectorAll("admin-content-panel").forEach(((e,t)=>{let i=this.panels.filter((t=>t.position===e.position))[0];i&&(i.placement="cards"!==e.type?e.placement:"",i.collectionId="single"===e.type?e.collectionId:"",i.heading="text"===e.type?e.heading:"",i.description="cards"!==e.type?e.description:"",i.collectionIds="cards"===e.type?e.collectionIds:[],e.isDirty=!0)})),this.panels=[...this.panels],requestAnimationFrame((()=>{this._updateUiStyles(null,!0)}))}}customElements.define("admin-featured-collections",_);var C=i(6030),$=i(5988),S=i(4981),I=i(2416),U=i(334),A=i(9411),T=i(7405),D=i(8987);function z(){return o.dy`
<style>
  ${u.F}
  ${S.Z}
  ${I.Z}
  ${U.Z}
  ${A.Z}
  ${T.Z}
  ${D.Z}
  ${g.Z}
  ${d.Z}
  ${h.Z}

  :host {
    display: block;
    position: relative;
    background: var(--super-light-background-color);
  }
  a {
    text-decoration: none;
  }
  input {
    padding: 15px;
    display: block;
    width: 90%;
    border: 0;
  }

  .about-link-icon {
    position: absolute;
    z-index: 5;
    top: 25px;
    right: 25px;
  }

  .about-link-icon > iron-icon {
    height: 30px;
    width: 30px;
  }
  .container {
    padding: 25px 10px;
    background: white;
  }

  .search-box {
    z-index: 5;
    color: var(--inverse-text-color);
  }

  .search-box .main {
    padding: 20px;
    background-color: rgba(0, 38, 85, .8);
  }

  .search-box .main h1 {
    margin: 5px 0;
    line-height: 2.0rem;
  }

  .search-box .footer {
    padding: 10px 20px;
    color: white;
    font-size: 0.8rem;
    font-style: italic;
    font-weight: normal;
    line-height: 1.0rem;
    background-color: rgba(51, 83, 121, .8);
  }

  .search-box .footer a {
    color: var(--default-secondary-color);
  }

  .featured-collections {
    background-color: var(--color-aggie-blue-20);
    padding: var(--spacing-md) 0;
  }

  .featured-collections h1 {
    text-align: center;
    color: var(--color-aggie-blue);
  }

  .featured-collections .card-grid {
    margin: 0 auto;
    padding: 20px 0;
  }

  .card-grid {
    max-width: var(--max-width);
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: var(--spacing-default);
  }


  iron-icon.search-icon {
    color: var(--default-primary-color);
  }

  iron-icon.info {
    fill: white;
  }

  #sample {
    background: linear-gradient(0deg, rgba(111,207,235,0.8), rgba(2, 40, 81, 0.8) 100%);
    background-size: cover;
    background-position: center;
    height: auto;
    padding:2rem 4rem 0 4rem;

  }

  #options {
    height: 150px;
    background-color:white;
    width: auto;
    padding: 2rem 4rem;
    vertical-align: middle;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #option{
    display: inline-block;
  }

  #top-header{
    display: inline-block;
    width: 100%;
  }
  #subtext{
    color:white;
    text-decoration: underline;
  }
  .hero-main .sub-search a:hover {
    text-decoration: none;
  }
  #watercolor{
    background-color:transparent;
    height: 8rem;
    margin-left:0px;
  }
  .about{
    text-align: center;
    background-color: var(--color-aggie-blue-40);
  }

  .featured-grid-container {
    display: grid;
    grid-template-columns: 40% 60%;
    background-color: transparent;
    padding: 10px;
  }
  .featured-grid-item {
    padding: 20px;
    font-size: 30px;
    text-align:left;

  }
  .about-grid-container {
    display: grid;
    grid-template-columns: 55% 45%;
    background-color: transparent;
    padding: 10px;
  }
  .about-grid-item {
    padding: 20px;
    font-size: 30px;

  }
  .collection-grid-container {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    background-color: transparent;
    padding: 10px;
  }
  .collection-grid-item {
    padding: 20px;
    font-size: 30px;
  }
  .content {
    background-color:pink;
    margin:20px;
    width:fixed;
    padding: 0px 60px;
    text-align: left;
  }

  .vertical-link--circle .vertical-link__figure:after {
    opacity: 1 !important;
  }

  .about-collections {
    display: flex;
    /* height: 35rem; */
    background-color: var(--color-aggie-blue-80);
    background-image: url(/images/watercolors/watercolor-background-ucd-blue-20opacity.png);
    /* background-position: center;
    padding: 2rem 0 2rem; */
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center top;
    /* background-attachment: fixed; */
  }

  /* STYLES BELOW ARE ACTUALLY USED. NEED TO AUDIT ANYTHING ABOVE */
  [hidden] {
    display: none;
  }
  .hero-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
    margin-top: 20px;
    padding: 0 5%;
  }
  .hero-top-left img {
    height: 32px;
    width: 186px;
  }

  .hero-top-right {
    display: inline-flex;
    align-items: center;
    font-weight: var(--fw-extrabold);
    font-weight: bold;
    font-size: 1rem;
    /* text-transform: uppercase; */
  }
  .hero-top-right a {
    color: var(--color-white);
  }
  .hero-top-right a:hover {
    color: var(--color-dams-secondary);
  }
  .hero-top-right .dot {
    margin: 0 1rem;
    width: 8px;
    height: 8px;
    min-width: 8px;
    min-height: 8px;
  }
  .hero-main h1 {
    margin-bottom: 1rem;
  }
  .hero-main .sub-heading {
    font-weight: var(--fw-p);
    margin-bottom: 3rem;
    margin-top: 1rem;
  }
  /* .hero-main .sub-heading a {
    color: var(--color-dams-secondary);
  }
  .hero-main .sub-heading a:hover, .hero-main .sub-heading a:focus {
    color: var(--color-a-hover);
  } */
  .hero-main app-search-box {
    max-width: 400px;
    margin-bottom: 1rem;
  }
  .hero-main .sub-search {
    color: var(--color-white);
    font-weight: bold;
    font-style: italic;
    font-size: .875rem;
    margin-bottom: 2rem;
  }
  .hero-main .sub-search a {
    color: var(--color-white);
    text-decoration: underline;
  }

  .priority-links {
    padding-top: 2rem;
  }

  .priority-links__item {
    padding-top: 0;
  }

  .browse-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;
    /* padding-bottom: 4rem; */
    background-color: var(--color-white);
  }
  .browse-buttons > div {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    width: 75%;
  }
  .browse-buttons app-icons {
    margin: 0 10px;
  }
  .browse-buttons .vertical-link__title {
    color: var(--color-aggie-blue);
    text-transform: capitalize;
  }
  .browse-buttons .vertical-link__figure:before,
  .browse-buttons .vertical-link__figure:after {
    box-sizing: border-box;
  }
  .browse-buttons .vertical-link--circle .vertical-link__figure {
    background-color: var(--color-white);
    margin-bottom: 0.75rem;
  }

  .browse-buttons .vertical-link--circle .vertical-link__figure:hover {
    background-color: var(--color-aggie-gold);
  }
  @media (max-width: 1070px) {
    .browse-buttons > div {
      width: 100%;
    }
  }

  .recent{
    background-color: var(--color-white);
  }
  .recent h1 {
    margin-bottom: 0;
    text-align: center;
    margin-top: 0;
  }
  .fw-light {
    font-weight: 200;
    font-style: normal;
    margin: 0.75rem 0 0.25rem;
    padding: 0;
    line-height: 1.2;
  }

  .card-trio {
    display: grid;
    grid-template-columns: auto;
    grid-gap: var(--spacing-sm);
  }
  .card-trio dams-collection-card {
    margin-bottom: var(--spacing-default);
  }
  .featured {
    background-color: var(--color-aggie-blue-20);
    padding-top: 4rem;
  }
  .featured h1 {
    margin-bottom: var(--spacing-default);
    text-align: center;
    margin-top: 0;
  }
  .featured dams-watercolor-overlay {
    height: 100px;
  }
  dams-highlighted-collection {
    margin: 40px 0;
  }
  .fg-header {
    display: grid;
    grid-gap: var(--spacing-default);
    grid-template-columns: auto;
    /* margin-bottom: var(--spacing-sm); */
    /* margin-bottom: 2rem 0; */
  }
  .fg-header h3 {
    margin: 0;
  }

  .fg-header.centered {
    display: block;
    width: 66%;
    margin: auto;
    text-align: center;
  }
  .fg-header.centered h3 {
    margin-bottom: 1rem;
  }

  .fg-header.left-aligned {
    display: block;
    width: 66%;
    margin: auto;
    text-align: left;
  }
  .fg-header.left-aligned h3 {
    text-align: left;
    margin-bottom: 1rem;
  }
  .fg-header.left-aligned div {}

  .fg-header.split {}
  .fg-header.split h3 {}
  .fg-header.split div {}

  .featured-collections-public {
    padding: 0 5%;
  }

  .featured-collections-public .featured-more {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: var(--spacing-default) 0 0;
    padding-bottom: 3rem;
  }
  .splat-stars {
    width: 9rem;
  }

  .about-content .btn--alt {
    padding-top: 0;
    padding-bottom: 0;
  }

  /* .featured-group {
    padding: 1rem 0;
  } */

  .featured-collections-public > * {
    padding: 1rem 0;
  }

  @media (max-width: 767px) {
    /* mobile */
    .featured-group .card-trio {
      margin-right: var(--spacing-sm);
      margin-left: var(--spacing-sm);
    }
    .about-collections {
      display: block;
      height: auto;
    }
    .tree-illustration {
      text-align: center;
      padding-top: 2rem;
    }
    .about-collections .tree-illustration img {
      float: none;
      padding: none;
    }    
  }
  .about-content {
    padding: 0 2rem 2rem 2rem;
  }

  @media (min-width: 768px) {
    /* tablet */
    .card-trio {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .card-trio.three-total dams-collection-card:nth-child(1) {
      grid-column: 1 / span 2;
    }

    .fg-header {
      grid-template-columns: 37% 55%;
      padding: 1rem 0;
    }
    .featured-group .card-trio {
      margin-right: 0;
      margin-left: 0;
    }
    .fg-header h3 {
      text-align: center;
    }
  }

  @media (min-width: 991px) {
    /* desktop */
    .card-trio {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .card-trio.three-total dams-collection-card:nth-child(1) {
      grid-column: auto;
    }
  }

  .featured-more a.btn--primary {
    color: var(--color-aggie-blue);
    padding-top: 0;
    padding-bottom: 0;
  }

  .tree-illustration {
    /* padding: 3rem; */
    margin: auto;
  }

  .tree-illustration img {
    float: right;
    padding-right: 1rem;
  }

  .about-content .header-dots {
    margin: 0;
    align-items: start;
    padding-bottom: 1rem;
  }

  .about-content h1 {
    margin-bottom: .3rem;
  }

  .about-content {
    padding-right: 2rem;
    margin: auto;
  }

  .about-content h1,
  .about-content p {
    color: var(--color-white);
  }

  .about-content .btn--more-about {
    background-color: var(--color-white);
    color: var(--color-aggie-blue-80);
  }

  .about-content .btn--more-about:hover {
    color: var(--color-aggie-blue-80);
  }

  dams-hero {
    position: relative;
    z-index: 1000;
  }

  .edit-overlay {
    background: white;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: .55;
    z-index: 400;
  }

  .right-panel {
    position: absolute;
    right: 4rem;
    z-index: 500;
  }

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
    z-index: 500;
  }

  .icon-wrapper.edit {
    background-color: var(--color-aggie-blue);
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

  admin-featured-collections {
    padding: 4rem 5%;
  }

  .hero-main.site-frame,
  .recent.site-frame {
    width: 90%;
    margin: 0 auto;
  }

  @media (min-width: 1060px) {
    .hero-top {
      margin-top: 40px;
    }
  }

  @media (min-width: 1601px) {
    .hero-top {
      margin-top: 40px;
    }
  }

  @media (min-width: 520px) {
    ucd-theme-header {
      display: none;
    }
  }

  @media (max-width: 519px) {
    .hero-top {
      display: none;
    }
    ucd-theme-header {
      position: relative;
      top: -19px;
    }
    h1 {
      font-size: 2rem;
      font-weight: 600;
    }
    .hero-main .sub-heading {
      font-size: 1.2rem;
      font-weight: 200;
    }
  }

  @media (max-width: 767px) {
    h1 {
      font-size: 2rem;
      font-weight: 600;
    }
    .hero-main .sub-heading {
      font-size: 1.2rem;
      font-weight: 200;
    }
  }

  .hero-top-right a {
    text-decoration: none;
  }

</style>

<dams-hero .srcOptions="${this.heroImgOptions}" selected-src-url="${this.heroUrl}" @src-change="${this._onHeroChange}">
  <div class="hero-content">

    <ucd-theme-header>
      <ucd-theme-primary-nav>
        <a href=/browse>Browse</a>
        <a href="/about">About</a>
      </ucd-theme-primary-nav>
    </ucd-theme-header>

    <div class="hero-top site-frame">
      <div class="hero-top-left"><a href="https://ucdavis.edu"><img src="/images/logos/ucdavis_logo_gold.png"></a></div>
      <div class="hero-top-right">
        <a href="/browse">Browse</a>
        <span class="dot"></span>
        <a href="/about">About</a>
      </div>
    </div>

    <div class="hero-main site-frame">
      <h1 class="color-light">Digital Collections</h1>
      <h4 class="sub-heading h4 color-light">Explore digitized items from the <a href="https://library.ucdavis.edu/">UC Davis Library</a> collections.</h4>
      <app-search-box
        id="searchBox"
        @search="${this._onSearch}"
        placeholder="search">
        <iron-icon icon="fin-icons:search" class="search-icon" slot="button-content"></iron-icon>
      </app-search-box>
      <div class="sub-search">
        Featured Image: <a href="${this.heroItemUrl}">${this.heroItemLabel}</a> | <a href="${this.heroCollectionUrl}">${this.heroCollectionLabel}</a>
      </div>
    </div>
  </div>

</dams-hero>

<div class="edit-overlay" ?hidden="${!this.editMode||!this.isUiAdmin}"></div>
<section class="browse-buttons site-frame">
  <div class="priority-links">
    <div class="priority-links__item">
      <a class="vertical-link vertical-link--circle category-brand--secondary" href="/browse/collections/15">
        <div class="vertical-link__figure">
          <ucdlib-icon class="vertical-link__image" icon="ucdlib-dams:fa-box-archive"></ucdlib-icon>
        </div>
        <div class="vertical-link__title">Collections</div>
      </a>
    </div>
    <div class="priority-links__item">
      <a class="vertical-link vertical-link--circle category-brand--secondary" href="/search">
        <div class="vertical-link__figure">
          <ucdlib-icon class="vertical-link__image" icon="ucdlib-dams:photo-stack"></ucdlib-icon>
        </div>
        <div class="vertical-link__title">All Items</div>
      </a>
    </div>
    <div class="priority-links__item">
      <a class="vertical-link vertical-link--circle category-brand--secondary" href="/browse/creator/30">
        <div class="vertical-link__figure">
          <ucdlib-icon class="vertical-link__image" icon="ucdlib-dams:fa-wand-magic-sparkles"></ucdlib-icon>
        </div>
        <div class="vertical-link__title">Creators</div>
      </a>
    </div>
    <div class="priority-links__item">
      <a class="vertical-link vertical-link--circle category-brand--secondary" href="/browse/format/30">
        <div class="vertical-link__figure">
          <ucdlib-icon class="vertical-link__image" icon="ucdlib-dams:fa-photo-film"></ucdlib-icon>
        </div>
        <div class="vertical-link__title">Formats</div>
      </a>
    </div>
    <div class="priority-links__item">
      <a class="vertical-link vertical-link--circle category-brand--secondary" href="/browse/subject/30">
        <div class="vertical-link__figure">
          <ucdlib-icon class="vertical-link__image" icon="ucdlib-dams:fa-star"></ucdlib-icon>
        </div>
        <div class="vertical-link__title">Subjects</div>
      </a>
    </div>
  </div>

</section>

<section class="recent site-frame" ?hidden="${0===this.recentCollections.length}">
  <h1>Recently Digitized<br><span class="fw-light">Collections</span></h1>
  ${$.Z.headerDots()}
  <div class="card-trio ${3===this.recentCollections.length?"three-total":""}">
  ${this.recentCollections.map((e=>o.dy`
        <dams-collection-card
          img-src="${e.vcData.images?.[0]||""}"
          card-title="${e.vcData.title||""}"
          item-ct="${e.vcData.count?e.vcData.count:0}"
          href="${e.vcData.id}"
        ></dams-collection-card>
      `))}
  </div>
</section>

<section class="featured site-frame">
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
  <h1>Featured <span class="fw-light">Collections</span></h1>
  <div style="text-align:center;">
    <img class="splat-stars" src="/images/watercolors/watercolor-splat-homepage-stars.png">
  </div>

  <admin-featured-collections ?hidden="${!this.editMode||!this.isUiAdmin}"></admin-featured-collections>
  
  <div class="featured-collections-public" ?hidden="${this.editMode}">
    ${this.displayData.map((e=>o.dy`
        ${"single"===e.type?o.dy`
              <dams-highlighted-collection
                collection-id="${e.collectionId}"
                collection-desc="${e.description}"
                ?image-right="${"right"===e.placement}"
              >
              </dams-highlighted-collection>
            `:""}
        ${"text"===e.type?o.dy`
              <div class="featured-group">
                <div class="fg-header ${e.placement}">
                  <h3 class="heading--primary">${e.heading}</h3>
                  <ucdlib-md id="md">
                    <ucdlib-md-content>
                      ${e.description}
                    </ucdlib-md-content>
                  </ucdlib-md>
                </div>
              </div>
            `:""}
        ${"cards"===e.type?o.dy`
              <div
                class="card-trio ${3===e.collectionIds.length?"three-total":""}"
              >
                ${e.collectionIds.map((e=>o.dy`
                    <dams-collection-card
                      data-id="${e.selected}"
                    ></dams-collection-card>
                  `))}
              </div>
            `:""}
      `))}

    <div class="featured-more">
      <a href="/browse/collections" class="btn btn--primary btn--lg">Browse all collections</a>
    </div>
  </section>

  <section class="about-collections">
    <div class="tree-illustration">
      <img src="/images/tree-bike-illustration.png" width="80%" />
    </div>
    <div class="about-content">
      <h1>About<br><span class="fw-light">Digital Collections</span></h1>
      ${$.Z.headerDots()}
      <p style="padding-bottom: 1rem;">
        The UC Davis Digital Collections is a locally developed repository designed
        to store and manage the digital assets of UC Davis Library, increasing access
        to previously undiscoverable digital assets.
      </p>
      <a href="/about" class="btn--more-about btn--alt btn--round">More about this project</a>
    </div>
  </section>
`}class E extends((0,a.Z)(o.oi).with(l.C,r.LitCorkUtils)){static get properties(){return{featuredCollections:{type:Array},featuredCollectionsCt:{type:Number},recentCollections:{type:Array},showCollectionGroup:{type:Boolean},textTrio:{type:Object},heroImgOptions:{type:Array},heroImgCurrent:{type:Object},heroUrl:{type:String},heroItemLabel:{type:String},heroItemUrl:{type:String},heroCollectionLabel:{type:String},heroCollectionUrl:{type:String},editMode:{type:Boolean},displayData:{type:Array},isUiAdmin:{type:Boolean}}}constructor(){super(),this.render=z.bind(this),this.active=!0,this.featuredCollections=[],this.featuredCollectionsCt=0,this.showCollectionGroup=!1,this.recentCollections=[],this.textTrio={},this.heroImgOptions=[],this.heroImgCurrent={},this.heroUrl="",this.heroItemLabel="",this.heroItemUrl="",this.heroCollectionLabel="...",this.heroCollectionUrl="...",this.displayData=[],this.editMode=!1,this.isUiAdmin=!1,this._injectModel("FcAppConfigModel","CollectionModel","RecordModel")}async firstUpdated(){this.isUiAdmin=C.Z.canEditUi(),this._setFeaturedImage();try{let e=await this.FcAppConfigModel.getFeaturedCollectionAppData();if(e&&e.body){"string"==typeof e.body&&(e.body=JSON.parse(e.body)),this.displayData=e.body;let t=document.querySelector("admin-featured-collections");t&&t.loadAdminData(this.displayData)}this.displayData.filter((e=>"cards"===e.type)).forEach((async e=>{let t=[];e.collectionIds.forEach((e=>{APP_CONFIG.collectionLabels[e.selected]&&t.push(e)})),e.collectionIds=t}))}catch(e){console.warn("No featured collections admin data found",e)}let e=await this.CollectionModel.getRecentCollections();e.response.ok&&e.body.results.length&&(this.recentCollections=e.body.results?.slice(0,3)),this.requestUpdate()}_setFeaturedImage(){this.heroImgOptions=APP_CONFIG.featuredImages||[];let e=Math.floor(Math.random()*this.heroImgOptions.length),t=this.heroImgOptions[e];this.heroUrl=t.imageUrl,this.heroItemLabel=t.itemName,this.heroItemUrl=t.itemLink,this.heroCollectionLabel=t.collectionName,this.heroCollectionUrl=t.collectionLink,this.heroItemLabel.length>75&&(this.heroItemLabel=this.heroItemLabel.substring(0,75)+"..."),this.heroCollectionLabel.length>75&&(this.heroCollectionLabel=this.heroCollectionLabel.substring(0,75)+"...")}_onHeroChange(e){let t=e.target._selectedSrc;t&&(this.heroImgCurrent=this.heroImgOptions.filter((e=>e.imageUrl===t))[0])}_onEditClicked(e){this.isUiAdmin&&(this.editMode=!0)}async _onSaveClicked(e){if(!this.isUiAdmin)return;this.editMode=!1;let t=document.querySelector("admin-featured-collections");t&&(t._updatePanelsData(),this.displayData=t.panels),await this.FcAppConfigModel.saveFeaturedCollectionAppData(this.displayData)}_onCancelEditClicked(e){this.isUiAdmin&&(this.editMode=!1)}_onSearch(e){let t=this.RecordModel.emptySearchDocument();this.RecordModel.setTextFilter(t,e.detail),this.RecordModel.setSearchLocation(t)}_onCollectionClicked(e){if("keyup"===e.type&&13!==e.which)return;let t=e.currentTarget.getAttribute("data-id");this._onCollectionSelected(t)}_onCollectionSelected(e){this._setWindowLocation(e)}}customElements.define("app-home",E)},7506:(e,t,i)=>{var o=i(5589),a=i(2959);function l(){return o.dy`

<style>
  :host {
    display: inline-block;
    margin: 15px;
    outline : 0;
    height: 320px;
    width: 320px;
  }

  :host(:hover), :host(:focus)  {
    cursor: pointer;
    margin: 13px;
    border: 2px solid var(--default-secondary-color);
  }

  .img.defaultImage {
    background-size: 65%;
  }

  .img {
    height: 320px;
    width: 320px;
    position: relative;
    background-image: url('/images/logos/logo-white-512.png'); /* fallback */
    background-color: var(--light-background-color);
    background-size: cover; /* needs to be 65% */
    background-repeat: no-repeat;
    background-position: center center;    
  }

  .img > div  {
    padding: 15px;
    position: absolute;
    left: 0;
    right: 25px;
    bottom: 25px;
    
    color: var(--default-secondary-color);
    font-weight: var(--fw-bold);

    background-color: rgba(0, 38, 85, .8);      
  }
</style>

<div 
  id="img"
  class="img" 
  role="img" 
  aria-label="${this.collection.title}">
  <div>
    <div>${this.collection.title}</div>
    <div>42 items</div>
  </div>
</div>

`}const r=new class{async load(){return!!window.IntersectionObserver||!!this.loaded||(this.loading?(await this.loading,this.loaded):(this.loading=new Promise((async(e,t)=>{await Promise.resolve().then(i.t.bind(i,5331,23)),e(!0)})),this.loading))}};class n extends((0,a.Mixin)(o.oi).with(a.LitCorkUtils)){static get properties(){return{collection:{type:Object},tabindex:{type:Number}}}constructor(){super(),this.render=l.bind(this),this.collection={},this.tabindex=0,this.shownInViewport=!1,this.active=!0}async connectedCallback(){super.connectedCallback(),"/images/logos/logo-white-512.png"===this.collection.thumbnailUrl&&(this.shadowRoot.querySelectorAll(".img")[0].className+=" defaultImage"),this.observer||(await r.load(),this.observer=new IntersectionObserver((e=>this._onViewportIntersection(e)),{rootMargin:"10px",threshold:0})),this.imageLoaded=!1,this.observer.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.observer.disconnect()}updated(){this._onCollectionChange()}_onCollectionChange(){this.shownInViewport&&this._setBackgroundImage()}_onViewportIntersection(e){0!==e.length&&(e=e[0],!this.shownInViewport&&e.isIntersecting&&(this.shownInViewport=!0,this._setBackgroundImage()))}_setBackgroundImage(){this.shadowRoot.querySelector("#img").style.backgroundImage=`url('${this.collection.thumbnailUrl}')`}}customElements.define("app-collection-card",n)},5988:(e,t,i)=>{i.d(t,{Z:()=>a});var o=i(5589);const a=new class{headerDots(){return o.dy`
      <div class="header-dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    `}}},6030:(e,t,i)=>{i.d(t,{Z:()=>a});const o=i(6794),a=new class{constructor(){this.data=o.user,this.data.roles||(this.data.roles=[]),this.editUiAccess=["admin","ui-admin"]}isLoggedIn(){return!0===this.data.loggedIn}canEditUi(){for(let e of this.editUiAccess)if(this.hasRole(e))return!0;return!1}hasRole(e){return this.data.roles.includes(e)}}}}]);