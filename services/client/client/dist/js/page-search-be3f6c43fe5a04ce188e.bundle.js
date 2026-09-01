"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[960],{9197:(e,t,i)=>{var a=i(5589),s=i(2959);function o(){return a.dy`

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
      ${this.imgSrc?a.dy`
        <img src="${this.imgSrc}">
      `:a.dy``}
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



`}class r extends((0,s.Mixin)(a.oi).with(s.LitCorkUtils)){static get properties(){return{collection:{type:Object},id:{type:String,attribute:"data-id"},imgSrc:{type:String,attribute:"img-src"},cardTitle:{type:String,attribute:"card-title"},itemCt:{type:Number,attribute:"item-ct"},href:{type:String},darkBg:{type:Boolean,attribute:"data-dark-bg"},loading:{type:Boolean}}}constructor(){super(),this.render=o.bind(this),this.collection={},this.id="",this.renderedId="",this.imgSrc="",this.cardTitle="",this.itemCt=0,this.href="",this.darkBg=!1,this.loading=!0,this._injectModel("CollectionModel","FcAppConfigModel")}async updated(e){e.has("id")&&this.id&&this.id!==this.renderedId?this._onCollectionUpdate(await this.CollectionModel.get(this.id)):e.has("href")&&!this.id&&(this.id=this.href)}async _onCollectionUpdate(e){if("loaded"!==e.state||e.id!==this.id||this.renderedId===this.id)return;this.loading=!1,this.renderedId=this.id,this.collection=e.vcData;let t=await this.CollectionModel.getFeaturedImage(this.id,this.FcAppConfigModel);if(t)this.imgSrc=t;else if(this.collection.images){let e=this.collection.images;this.imgSrc=e.medium?e.medium.url:e.original.url}else this.imgSrc="/images/tree-bike-illustration.png";this.cardTitle=this.collection.title,this.itemCt=this.collection.count,this.href=this.collection.id,this.darkBg=!!this.attributes["data-dark-bg"]}}customElements.define("dams-collection-card",r)},9379:(e,t,i)=>{var a=i(5589),s=i(2959);function o(){return a.dy`
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
  `}i(1807);class r extends((0,s.Mixin)(a.oi).with(s.LitCorkUtils)){static get properties(){return{id:{type:String,attribute:"data-itemid"},data:{type:Object},itemUrl:{type:String},thumbnailUrl:{type:String},truncatedTitle:{type:String},mediaType:{type:String}}}constructor(){super(),this.render=o.bind(this),this.id="",this.data={},this.truncatedTitle="",this.itemUrl="",this.thumbnailUrl="",this.mediaType="",this._injectModel("RecordModel")}willUpdate(e){if(this.data.id)if(this.itemUrl=this.data.id,this.thumbnailUrl=this.data.thumbnailUrl,this.mediaType=this.data.mediaType,"Image"===this.data.mediaType)this.mediaType="image";else if("Video"===this.data.mediaType)this.mediaType="video";else if("Audio"===this.mediaType)this.mediaType="audio";else{this.mediaType="imageList";let e=this.data.format[0]?.split(" ")[0];e&&parseInt(e)<2&&(this.mediaType="image")}else this._getItem(this.id);this._truncateTitle()}async _onRecordUpdate(e){if("loaded"===e.state&&e.id===this.id){if(this.record=e.vcData,this.record.images){let e=this.record.images;this.thumbnailUrl=e.medium?e.medium.url:e.original.url}this.title=this.record.name,this.itemUrl=this.record["@id"],this.id=this.record["@id"],this._truncateTitle()}}async _getItem(e){this._onRecordUpdate(await this.RecordModel.get(e))}_truncateTitle(){this.data&&this.data.title&&this.data.title.length>38?this.truncatedTitle=this.data.title.substring(0,34)+"...":this.data&&this.data.title?this.truncatedTitle=this.data.title:this.title&&this.title.length>38?this.truncatedTitle=this.title.substring(0,34)+"...":this.title?this.truncatedTitle=this.title:this.truncatedTitle=""}}customElements.define("dams-item-card",r)},9278:(e,t,i)=>{i.r(t),i.d(t,{AppSearch:()=>F});var a=i(5589);function s(){return a.dy`
    <style include="shared-styles">
      :host {
        display: block;
        overflow: hidden;
      }
      .search-container {
        background-color: var(--super-light-background-color);
        /* min-height: 60vh; */
        display: block;
      }
      .search-content {
        flex: 1;
        padding-bottom: 35px;
        background-color: white;
      }

      /* app-filters-panel {
        width: 350px;
      }
      app-filters-panel[data-wide] {
        width: 475px;
      } */

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 0.7;
        }
      }

      /* #desktop-filter-panel {
        display: none;
      } */

      .filters-container {
        /* width: 350px; */
        background-color: var(--color-aggie-blue-40);
        transition: width 300ms linear;
      }

      @media (max-width: 1025px) {
        /* app-filters-panel {
          width: 275px;
        }
        app-filters-panel[data-wide] {
          width: 415px;
        }
        .filters-container {
          width: 275px;
        } */
      }

      /* @media (min-width: 975px) { */
      #desktop-filter-panel {
        display: block;
      }
      .search-container {
        /* display: flex; */
        display: grid;
        grid-template-areas: "first first first second second second second second second second second second";
        --l-gap: 1.5rem;
        grid-column-gap: var(--l-gap-override, var(--l-gap));
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: max-content 1fr;
      }

      .filters-container {
        grid-area: first;
        min-width: 0;
        --l-gap: 1.5rem;
      }

      .search-content {
        grid-area: second;
        min-width: 0;
        --l-gap: 1.5rem;
      }

      @media (max-width: 1023px) {
        .search-container {
          grid-template-areas: "first first first first second second second second second second second second";
        }
      }

      /* } */

      @media (max-width: 767px) {
        .search-container {
          display: block;
        }
     
        /* mobile */
        app-filters-panel {
          z-index: 2000;
          width: 90vw;
          transition: all 0.3s;

          /* prevent scrolling? */
          position: fixed;
          overflow-y: scroll;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }

        app-filters-panel.off-canvas--left {
          transform: translateX(-100%);
        }
        .filters-container {
          width: 0;
        }
      }

      @media (min-width: 768px) {
        /* tablet */
      }

      @media (min-width: 991px) {
        /* desktop */
      }
    </style>

    <div class="search-container">
      <div class="filters-container">
        <app-filters-panel
          id="desktop-filter-panel"
          class="filters-panel ${this.filtersCollapsed?"off-canvas--left":""}"
          aria-hidden="${this.filtersCollapsed}"
          data-${this.wideFiltersPanel?"wide":"normal"}
          @selected-tab-changed="${this._onFiltersTabUpdate}"
          @collapse-filters="${this._onCollapseFilters}"
        ></app-filters-panel>
      </div>
      <div class="search-content">
        <app-search-results-panel
          id="resultsPanel"
          @toggle-drawer="${this._toggleDrawer}"
          @page-change="${this._onPaginationChange}"
        >
        </app-search-results-panel>
      </div>
    </div>

    <app-search-results-collections
      id="collectionsPanel"
    ></app-search-results-collections>
  `}var o=i(8077),r=i(5700),l=i(2959);function n(){return a.dy`
    <style include="shared-styles">
      :host {
        display: block;
        position: relative;
        margin: 0 5px;
      }

      [hidden] {
        display: none !important;
      }

      .header {
        font-size: var(--fs-sm);
        display: flex;
        align-items: center;
        margin-bottom: 11px;
        margin-top: 5px;
        padding: 1.5rem;
      }

      .header > * {
        flex: 1;
      }

      select {
        margin-left: 10px;
        border: 1px solid var(--light-background-color);
        border-radius: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        -o-appearance: none;
        appearance: none;
        -webkit-border-radius: 0px;
        padding: 5px 25px 5px 10px;
        background-position: right 10px center;
        background-size: 10px 10px;
        background-repeat: no-repeat;
        background-color: transparent;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCA2Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzAwMjg1NTt9PC9zdHlsZT48L2RlZnM+PGc+PHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjAgMCAxMCAwIDUgNiAwIDAiLz48L2c+PC9zdmc+");
        background-position-y: 13px;
      }
      /* for IE */
      select::-ms-expand {
        display: none;
      }

      ucd-theme-pagination {
        display: flex;
        justify-content: center;
        box-sizing: border-box;
      }

      h3 {
        /* border-top: 1px solid var(--light-background-color); */
        margin: 15px 0 0 0;
        padding: 15px 0 0 0;
        color: var(--default-primary-color);
      }

      .grid {
        margin: 10px;
        position: relative;
        display: grid;
        flex-direction: row;
        flex-wrap: wrap;
        width: 95%;
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .grid dams-item-card {
        padding: 1.5rem;
      }

      .masonry {
        margin: 10px;
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 95%;
      }

      .list {
        margin: 10px;
      }

      .list .item {
        padding: 10px;
        margin-bottom: 15px;
        background-color: #daaa00;
        height: 250px;
      }

      .spacer {
        height: 20px;
        border-right: 1px solid var(--light-background-color);
      }

      .total {
        font-size: 0.9rem;
        padding-left: 10px;
        flex: 2;
      }

      .mobile-total {
        font-style: italic;
      }

      .error {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 250px;
        color: red;
      }

      #numPerPage {
        font-size: 0.9rem;
      }

      .drawer-toggle {
        font-size: var(--fs-sm);
        cursor: pointer;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        font-weight: var(--fw-bold);
        color: var(--default-primary-color);
        background-color: var(--light-background-color);
        border-radius: 0;
        border: 0;
        padding: 0;
      }
      .drawer-toggle > span {
        padding: 0 10px;
      }
      .drawer-toggle iron-icon {
        background-color: var(--default-secondary-color);
      }

      .drawer-toggle[disabled] {
        color: var(--light-background-color);
      }

      .collections {
        text-align: center;
      }

      .collections-content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
      }

      .collections-content dams-collection-card {
        flex: 33.33%;
      }

      ucdlib-icon {
        height: 40px;

        display: inline-block;
        position: relative;
        padding: 8px 0;

        outline: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
        z-index: 0;
        line-height: 1;
        width: 40px;
        height: 40px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
        box-sizing: border-box !important;
        justify-content: flex-end;
        fill: var(--color-aggie-blue-80);
      }

      .masonry {
        margin: 10px;
        position: relative;
      }

      .masonry .item {
        display: block;
        position: absolute;
        width: 27%;
        padding: 1.5rem;
        /* visibility: hidden; */
        top: 25px;
        left: 25px;
        /* will-change: top, left;
        transition: top 500ms ease-out, left 500ms ease-out; */
      }

      .selected-layout {
        box-shadow: inset -2px 0 0 var(--color-aggie-gold),
          inset 0 -2px 0 var(--color-aggie-gold),
          inset 2px 0 0 var(--color-aggie-gold),
          inset 0 2px 0 var(--color-aggie-gold);
      }

      .header a {
        color: var(--color-aggie-blue-70);
        cursor: pointer;
      }

      .header .photo-stack {
        display: inline-block;
      }

      .header .photo-stack ucdlib-icon {
        fill: var(--color-aggie-blue-60);
      }

      .header ucdlib-icon {
        padding: 5px;
      }

      @media (max-width: 545px) {
        .grid dams-item-card {
          flex: 100%;
          padding: 1.5rem;
          max-width: 85vw;
        }
        .header {
          padding-left: 0.5rem;
        }
      }

      @media (max-width: 1023px) {
        .masonry .item {
          width: 38% !important;
        }
      }

      @media (max-width: 768px) {
        .truncated-text-mobile {
          display: none;
        }
        
        .masonry .item {
          width: 85vw !important;
          position: initial;
          margin: auto;
          padding-bottom: 3rem;
        }
      }

      @media (min-width: 975px) {
        .header {
          display: flex;
        }
        /* .mobile-header {
          display: none;
        } */
      }

      @media (max-width: 1023px) {
        .grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 767px) {
       .grid {
            grid-template-columns: repeat(1, minmax(0, 1fr));
        }
      }

      @media (max-width: 1182px) {
        .truncated-text {
          display: none;
        }
      }

      @media (max-width: 1130px) {
        /* TODO stack pagination ABOVE result count/link */
        .header {
          flex-direction: column-reverse;
          align-items: inherit;
        }

        .header-results {
          /* padding-top: 1rem; */
        }

        .header-pagination {
          padding-bottom: 1rem;
        }
        .header-pagination .filler {
          flex: 3;
        }
      }

      .teaser {
        padding: 1.5rem; 
      }
      .teaser__image {
        background-color: #dcdcdc;
        width: 100%;
        padding-top: 75%;
      }
      .teaser__title {
        background-color: #dcdcdc;
        height: 1.5rem;
        width: 80%;
        margin: .8rem auto 0;
      }

      .masonry {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }

      .masonry .col-1,
      .masonry .col-2,
      .masonry .col-3 {
        flex: 1 1 calc(33.333% - 16px);
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        margin-bottom: 16px;
      }

      .masonry .teaser .teaser__image {
        width: 100%;
        height: auto;
        background-color: #dcdcdc;
        padding-top: 0;
      }

      .masonry .teaser .teaser__title {
        padding: 8px;
        font-size: 1rem;
        text-align: center;
        background-color: #dcdcdc;
      }

      .list .teaser {
        display: flex;
      }
      .list .teaser__image {
        height: 250px;
        width: 33%;
        padding-top: 0;
      }
      .list .teaser__content {
        width: 75%;
        margin-left: 3rem;
      }
      .list .teaser__title {
        margin: .8rem auto 0 0;
      }
      .list .teaser__content .teaser__details {
        padding-top: 1rem;
        width: 80%;
        margin: .8rem auto 0 0;
      }
      .list .teaser__content .teaser__details > * {
        margin: 0.5rem 0;
        height: 1rem;
        background-color: #dcdcdc; 
      }
    </style>

    <div class="header">
      <div class="header-results" style="flex: 2.25; display: flex;">
        <div style="flex: 2.25; margin: auto;">
          <div class="photo-stack">
            <ucdlib-icon
              style="cursor: auto;"
              class="vertical-link__image"
              icon="ucdlib-dams:photo-stack"
            ></ucdlib-icon>
          </div>
          
          <span style="font-weight: bold">${this.total} item<span class="truncated-text"> result</span>s</span><span ?hidden="${0===this.totalCollections}">
            from
            <a href="" @click="${this._scrollToCollections}">${this.totalCollections} collection${this.totalCollections>1?"s":""}</a></span>
        </div>
      </div>

      <div class="header-pagination"
        style="flex: 3; display: flex; justify-content: end">
        <span style="text-align: right; margin: auto 0; padding-right: .5rem; padding-left: 5px;">Display:</span>
        <div>
          <ucdlib-icon
            icon="ucdlib-dams:result-display-grid"
            @click="${this._onLayoutToggle}"
            type="grid"
            class="grid-layout-icon selected-layout">
          </ucdlib-icon>
        </div>
        <div>
          <ucdlib-icon
            icon="ucdlib-dams:result-display-mosaic"
            @click="${this._onLayoutToggle}"
            type="mosaic"
            class="mosaic-layout-icon">
          </ucdlib-icon>
        </div>
        <div>
          <ucdlib-icon
            icon="ucdlib-dams:result-display-list"
            @click="${this._onLayoutToggle}"
            type="list"
            class="list-layout-icon">
          </ucdlib-icon>
        </div>

        <div class="filler"></div>

        <select id="numPerPage" @change="${this._onPageSizeChange}">
          <option value="50">50</option>
          <option value="20" selected>20</option>
          <option value="10">10</option>
        </select>
        <div style="margin: 0 10px; font-size: .875rem; margin: auto 0 auto 0.5rem">
          <span class="truncated-text-mobile">items</span> per page
        </div>
      </div>
    </div>

    <div ?hidden="${this.showError}">
      <div ?hidden="${this.showLoading}">
        <div class="grid" ?hidden="${!this.loading||!this.isGridLayout}">
          ${[1,2,3,4,5,6,7,8.9,10].map((()=>a.dy`
              <div class="teaser">
                <div class="teaser__image"></div>
                <div class="teaser__title"></div>
              </div>  
            `))}
        </div>

        <div class="grid" id="gridLayout" ?hidden="${!this.isGridLayout}">
          ${this.results.map((e=>a.dy`
              <dams-item-card
                .data="${e}"
                data-url="${e.id}"
                @click=${this._onRecordClicked}
              ></dams-item-card>
            `))}
        </div>

        <div class="masonry" ?hidden="${!this.loading||!this.isMosaicLayout}">
          <div class="col-1">
            <div class="teaser">
              <div class="teaser__image" style="height: 350px;"></div>
              <div class="teaser__title"></div>
            </div>  
            <div class="teaser">
              <div class="teaser__image" style="height: 150px;"></div>
              <div class="teaser__title"></div>
            </div>  
            <div class="teaser">
              <div class="teaser__image" style="height: 300px;"></div>
              <div class="teaser__title"></div>
            </div>  
          </div>
          <div class="col-2">
            <div class="teaser">
              <div class="teaser__image" style="height: 200px;"></div>
              <div class="teaser__title"></div>
            </div>  
            <div class="teaser">
              <div class="teaser__image" style="height: 275px;"></div>
              <div class="teaser__title"></div>
            </div>  
            <div class="teaser">
              <div class="teaser__image" style="height: 200px;"></div>
              <div class="teaser__title"></div>
            </div>  
          </div>
          <div class="col-3">
            <div class="teaser">
              <div class="teaser__image" style="height: 250px;"></div>
              <div class="teaser__title"></div>
            </div>  
            <div class="teaser">
              <div class="teaser__image" style="height: 150px;"></div>
              <div class="teaser__title"></div>
            </div>  
            <div class="teaser">
              <div class="teaser__image" style="height: 250px;"></div>
              <div class="teaser__title"></div>
            </div>  
          </div>
        </div>
        
        <div class="masonry" id="layout" ?hidden="${!this.isMosaicLayout}">
          ${this.results.map((e=>a.dy`
              <app-search-grid-result
                .data="${e}"
                class="item"
                data-url="${e.id}"
                @click=${this._onRecordClicked}
                @rendered=${this._onGridItemRendered}
              ></app-search-grid-result>
            `))}
        </div>

        <div class="list" ?hidden="${!this.isListLayout}">
          <div ?hidden="${!this.loading}">
            ${[1,2,3,4,5,6,7,8.9,10].map((()=>a.dy`
                <div class="teaser">
                  <div class="teaser__image"></div>
                  <div class="teaser__content">
                    <div class="teaser__title"></div>
                    <div class="teaser__details">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>  
              `))}
          </div>
          ${this.results.map((e=>a.dy`
              <app-search-list-result
                .data="${e}"
                data-url="${e.id}"
                @click=${this._onRecordClicked}
              ></app-search-list-result>
            `))}
        </div>
      </div>
    </div>

    <div class="error" ?hidden="${!this.showError}">
      <div>${this.errorMsg}</div>
    </div>

    <ucd-theme-pagination
      ?hidden="${this.paginationTotal<2}"
      current-page=${this.currentPage}
      max-pages=${this.paginationTotal}
      @page-change=${this._onPaginationChange}
      xs-screen
      ellipses>
    </ucd-theme-pagination>

    <div
      ?hidden="${!this.totalOverMaxWindow}"
      style="text-align: center"
      class="limit-results"
    >
      Digital Collections limits results to 10,000. Use keywords and/or filters
      to refine search.
    </div>
  `}function d(){return a.dy`
    <style include="shared-styles">
      :host {
        display: block;
        width: var(--grid-cell-width);
        background-color: white;
      }

      [hidden] {
        display: none !important;
      }

      :host(:hover),
      :host(:focus) {
        /* border: 2px solid var(--default-secondary-color);
    margin: -2px 0 0 -2px;
    outline: none !important; */
      }

      @keyframes show-img {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      img {
        /* animation: show-img 300ms linear; */
        box-sizing: border-box;
        display: none;
        /* width: var(--grid-cell-width); */
        /* background-size: cover;
    background-color: transparent;
    background-position: center center; */
        /* position: absolute;
    top: 0;
    left: 0; */
        cursor: pointer;
        border: solid 2px transparent;
        /* transition: border-color 0.3s ease-in-out; */
      }

      img:hover,
      img:focus {
        border-color: var(--default-secondary-color);
        /* margin: -2px 0 0 -2px;
    outline: none !important; */
      }

      .collection-name {
        color: var(--color-aggie-blue-70);
        font-size: 0.95rem;
      }

      .year {
        color: var(--gray-text);
        font-weight: var(--fw-light);
        flex: 1;
      }

      .footer {
        display: flex;
        align-items: center;
        margin-top: 10px;
      }

      h4 {
        margin: 5px 0;
        color: var(--default-primary-color);
      }

      iron-icon {
        color: var(--default-primary-color);
      }

      .image {
        position: relative;
        background-size: cover;
        background-color: transparent;
        background-position: center center;
        /* max-width: 383px; */
      }

      .card-text {
        padding: 15px;
        line-height: 1.3;
      }

      .video-thumbnail {
        z-index: 1000;
        width: 30px;
        height: 30px;
        position: absolute;
        bottom: 0;
        right: 0;
        background-image: url("https://via.placeholder.com/25");
      }

      @media (max-width: 768px) {
        .image {
          margin: auto;
        }
        .card-text {
          text-align: center;
        }
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

      ucdlib-icon {
        width: 1.2rem;
        height: 1.2rem;
        fill: white;
      }
    </style>

    <!--hidden$="${!this.isImage}" -->
    <div class="image" id="imgRoot">
      <img
        id="img"
        src="${this.thumbnailUrl}"
        style="height: ${this.imageHeight}; width: 100%; display:
      block"
        onload="this.style.display='block';"
      />
      <div ?hidden="${!this.isVideo}" class="video-thumbnail"></div>
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

    <div class="card-text">
      <div class="collection-name">${this.title}</div>
    </div>
  `}i(981);class h extends((0,l.Mixin)(a.oi).with(l.LitCorkUtils)){static get properties(){return{id:{type:String,attribute:"data-itemid"},data:{type:Object},itemUrl:{type:String},thumbnailUrl:{type:String},title:{type:String},bounds:{type:Array},imageHeight:{type:Number},mediaType:{type:String}}}constructor(){super(),this.active=!0,this.render=d.bind(this),this.id="",this.data={},this.title="",this.itemUrl="",this.thumbnailUrl="",this.bounds=[],this.imageHeight=0,this.mediaType="",this._injectModel("RecordModel")}firstUpdated(e){if(this.data.id)if(this.title=this.data.title,this.itemUrl=this.data.id,this.thumbnailUrl=this.data.thumbnailUrl,this.thumbnailUrl&&this._renderImage(),"Image"===this.data.mediaType)this.mediaType="image";else if("Video"===this.data.mediaType)this.mediaType="video";else if("Audio"===this.mediaType)this.mediaType="audio";else{this.mediaType="imageList";let e=this.data.format[0]?.split(" ")[0];e&&parseInt(e)<2&&(this.mediaType="image")}else this._getItem(this.id)}async _onRecordUpdate(e){if("loaded"===e.state&&e.id===this.id){if(this.record=e.vcData,this.record.images){let e=this.record.images;this.thumbnailUrl=e.medium?e.medium.url:e.original.url}this.title=this.record.name,this.itemUrl=this.record["@id"],this.id=this.record["@id"],this._renderImage()}}_loadImage(e){return new Promise(((t,i)=>{var a=new Image;a.onload=()=>{let e=[a.naturalHeight,a.naturalWidth];this.bounds=[[0,0],e],t()},a.src=e}))}async _getItem(e){this._onRecordUpdate(await this.RecordModel.get(e))}async _renderImage(){await this._loadImage(this.thumbnailUrl);let e=(this.shadowRoot.querySelector("#img").width||1)*(this.bounds[1][0]/this.bounds[1][1]);this.imageHeight=e,this.dispatchEvent(new CustomEvent("rendered",{detail:this}))}}customElements.define("app-search-grid-result",h),i(8030);class c extends((0,l.Mixin)(a.oi).with(l.LitCorkUtils)){static get properties(){return{data:{type:Object},fetchId:{type:String},isVideo:{type:Boolean},isImage:{type:Boolean},imgUrl:{type:String},collectionName:{type:String},title:{type:String},description:{type:String},creator:{type:Array},year:{type:String},tabindex:{type:Number}}}constructor(){super(),this.active=!0,this.data={},this.fetchId="",this.isVideo=!1,this.isImage=!1,this.imgUrl="",this.collectionName="",this.title="",this.description="",this.creator=[],this.year="",this.tabindex=0,this._injectModel("AppStateModel","CollectionModel","MediaModel"),this.baseUrl=window.location.protocol+"//"+window.location.host+"/fcrepo/rest"}firstUpdated(){this.addEventListener("click",(e=>this._onClick())),this.addEventListener("keyup",(e=>{13===e.which&&this._onClick()}))}updated(){this._onDataUpdate()}_onClick(){this._setWindowLocation(this.fetchId)}async _onDataUpdate(){let e=Object.assign({},this.data);if(!e.id)return;this.fetchId=e.id,this.title=this.data.title||(this.data.identifier?this.data.identifier.id:""),this.data.video&&(this.isVideo=!0);let t=this.shadowRoot.querySelector("#img");t&&(t.style.display="none");let i=this.data.image;if(i){let e=i.height/i.width;this.imgHeight=Math.floor(250*e),this.imgUrl=this.MediaModel.getImgUrl(i.url,null,this.imgHeight),i.colorPalette?this.imgThumbail=i.colorPalette:this.imgThumbail="",this.isImage=!0}else this.imgUrl="",this.isImage=!1;if(this.description=this.data.description||"",this.description.length>200&&(this.description=this.description.substr(0,200)+"..."),this.year=utils.getYearFromDate(e.created),Array.isArray(e.creator)?this.creator=e.creator:this.creator=[e.creator||""],this.collectionName=this.data.collectionId||"",this.collectionName){let e=await this._getCollection(this.collectionName);this.collectionName=e.name}}}function p(){return a.dy`
    <style include="shared-styles">
      :host {
        display: block;
        background-color: white;
        margin: 2rem 10px;
        border: 2px solid transparent;
        transition: background-color 0.3s ease-in-out;
      }

      :host(:hover),
      :host(:focus) {
        cursor: pointer;
        /*border: 2px solid var(--default-secondary-color);*/
        outline: none !important;
        background-color: var(--color-aggie-gold-30);
      }

      .img {
        flex: 1;
        height: 250px;
        width: var(--grid-cell-width);
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        width: 33%;
        /* flex: 33%;         */
      }

      .collection-title {
        color: var(--color-aggie-blue-80);
        font-weight: bold;
        border-bottom: 6px dotted var(--color-dams-secondary);
        padding: 0.5rem 0;
      }

      .year {
        color: var(--gray-text);
        flex: 1;
      }

      .footer {
        display: flex;
        align-items: center;
        margin-top: 10px;
      }

      .layout {
        display: flex;
        padding: 1rem;
      }

      h4 {
        margin: 10px 0;
        color: var(--default-primary-color);
      }

      iron-icon {
        color: var(--default-primary-color);
      }

      .flex-vertical {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .data {
        padding: 0 0 0 2.5rem;
        flex: 2;
        overflow: hidden;
      }

      .collection-details {
        padding-top: 1rem;
      }

      .collection-details .label {
        font-weight: bold;
        padding-right: 0.3rem;
      }

      .collection-details p {
        margin: 0.2rem 0;
      }

      @media (max-width: 600px) {
        .img {
          height: auto;
          width: 150px;
          background-position: initial;
        }

        .data {
          padding: 0 0 0 1.5rem;
        }

        :host {
          display: block;
          background-color: white;
          margin: 10px 0;
        }
      }
    </style>

    <div class="layout">
      <div
        style="background-image: url('${this.thumbnailUrl}')"
        class="img"
      ></div>

      <div class="data">
        <div class="flex-vertical">
          <div class="collection-title">${this.title}</div>

          <!-- <div class="spacer"></div> -->

          <div class="collection-details">
            <p><span class="label">Collection:</span> ${this.collection}</p>
            <p ?hidden="${!this.creator}"><span class="label">Creator:</span> ${this.creator}</p>
            <p><span class="label">Date:</span> ${this.date}</p>
            <p><span class="label">Format:</span> ${this.format}</p>
          </div>
        </div>
      </div>
    </div>
  `}class u extends((0,l.Mixin)(a.oi).with(l.LitCorkUtils)){static get properties(){return{id:{type:String,attribute:"data-itemid"},data:{type:Object},itemUrl:{type:String},thumbnailUrl:{type:String},title:{type:String},date:{type:String},collection:{type:String},format:{type:String},creator:{type:String}}}constructor(){super(),this.active=!0,this.render=p.bind(this),this.id="",this.data={},this.itemUrl="",this.thumbnailUrl="",this.title="",this.date="",this.collection="",this.format="",this.creator="",this._injectModel("RecordModel")}willUpdate(e){if(this.data.id){let e=APP_CONFIG.collectionLabels[this.data.collectionId?.["@id"]]||"";this.itemUrl=this.data.id,this.thumbnailUrl=this.data.thumbnailUrl,this.title=this.data.title,this.date=this.data.date,this.collection=e,this.format=this.data.format,this.creator=this.data.creator}else this._getItem(this.id)}async _onRecordUpdate(e){if("loaded"===e.state&&e.id===this.id){if(this.record=e.vcData,this.record.images){let e=this.record.images;this.thumbnailUrl=e.medium?e.medium.url:e.original.url}this.title=this.record.name,this.itemUrl=this.record["@id"],this.id=this.record["@id"]}}async _getItem(e){this._onRecordUpdate(await this.RecordModel.get(e))}}customElements.define("app-search-list-result",u),i(7506),i(9197),i(9379),i(1807),i(4827);const g="search-results-layout";let m=localStorage.getItem(g);class b extends((0,l.Mixin)(a.oi).with(l.LitCorkUtils)){static get properties(){return{results:{type:Array},totalCollections:{type:Number},collectionResults:{type:Array},gridMargin:{type:Number},isGridLayout:{type:Boolean},isListLayout:{type:Boolean},isMosaicLayout:{type:Boolean},total:{type:String},numPerPage:{type:Number},currentIndex:{type:Number},showError:{type:Boolean},showLoading:{type:Boolean},errorMsg:{type:Boolean},paginationTotal:{type:Number},totalOverMaxWindow:{type:Boolean},currentPage:{type:Number},loading:{type:Boolean},lastSearch:{type:String}}}constructor(){super(),this.active=!0,this.render=n.bind(this),this.gridMargin=15,"grid"===m?(this.isGridLayout=!0,this.isListLayout=!1,this.isMosaicLayout=!1):"list"===m?(this.isGridLayout=!1,this.isListLayout=!0,this.isMosaicLayout=!1):(this.isGridLayout=!1,this.isListLayout=!1,this.isMosaicLayout=!0),this._reset(),this.resizeTimer=-1,window.addEventListener("resize",(()=>this._resizeAsync())),this._injectModel("AppStateModel","CollectionModel","RecordModel","MediaModel","SearchVcModel","FiltersModel"),this.EventBus().on("show-collection-search-results",(e=>this._updateCollectionResultsVisibility(e)))}_onAppStateUpdate(e){"search"===e.location.page&&(this.AppStateModel.location.fullpath!==this.lastSearch&&(this._reset(),this.lastSearch=this.AppStateModel.location.fullpath),this._setSelectedDisplay(),this._resizeAsync(),this.filterDisplayResults())}_reset(){this.results=[],this.collectionResults=[],this.totalCollections=0,this.total="0",this.numPerPage=20,this.currentIndex=0,this.currentPage=1,this.showCollectionResults=!1,this.showError=!1,this.showLoading=!1,this.errorMsg=!1,this.paginationTotal=!1,this.totalOverMaxWindow=!1,this.loading=!0}_onFilterBucketsUpdate(e){if("@graph.isPartOf.@id"!==e.filter)return;e.buckets=e.buckets.filter((e=>!e.key.includes("oac.cdlib.org")&&e.doc_count>0)),this.collectionResults=e.buckets.map((e=>({"@id":e.key})));let t=this.SearchVcModel.getSearch()?.searchDocument?.text,i=this.SearchVcModel.getSearch()?.searchDocument?.filters||{};t||Object.keys(i).length&&Object.keys(i).filter((e=>"@graph.isPartOf.@id"!==e)).length?(this.totalCollections=this.collectionResults.length||0,this.filterDisplayResults()):this.totalCollections=0}willUpdate(){this.SearchVcModel.getSearch()}filterDisplayResults(){let e=decodeURIComponent(this.AppStateModel.location.pathname);if(!e.includes("@graph.isPartOf.@id"))return void(this.collectionResults=[...this.collectionResults]);let t=e.split('@graph.isPartOf.@id","or","')[1].split('"]')[0].split(",");this.totalCollections=t.length}renderResults(e,t,i,a){"search"===this.AppStateModel.location.page&&(this.lastSearch=this.AppStateModel.location.fullpath,this.results=[],this.showHeaderFooter=!0,this.showError=!1,clearTimeout(this.showLoadingTimer),this.showLoading=!1,requestAnimationFrame((()=>{this.total=t;let s=Math.floor((1e4-i)/i)*i;t>s?(this.total=s+"+",this.totalOverMaxWindow=!0):this.totalOverMaxWindow=!1,this.results=e,this.numPerPage=i,this.paginationTotal=Math.ceil(this.total/i),this.shadowRoot.querySelector("#numPerPage").value=i+"",this.currentIndex=a,this.currentPage=0===this.currentIndex?1:this.currentIndex/this.numPerPage+1,requestAnimationFrame((()=>{this._resize(),this.loading=!1}))})))}numberWithCommas(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}onLoading(){this.results=[],this.showCollectionResults=!1,this.showError=!1,this.showLoadingTimer=setTimeout((()=>{this.showLoading=!0}),100)}onError(e){this.results=[],this.showCollectionResults=!1,this.showError=!0,clearTimeout(this.showLoadingTimer),this.showLoading=!1,e.showErrorMessage?this.errorMsg=e.error.message:this.errorMsg="Oops. Something went wrong with search!"}_onLayoutToggle(e){let t=e?.currentTarget?.getAttribute("type")||"mosaic";"grid"===t?(this.isGridLayout=!0,this.isListLayout=!1,this.isMosaicLayout=!1,localStorage.setItem(g,"grid"),this.shadowRoot.querySelector(".grid-layout-icon").classList.add("selected-layout"),this.shadowRoot.querySelector(".mosaic-layout-icon").classList.remove("selected-layout"),this.shadowRoot.querySelector(".list-layout-icon").classList.remove("selected-layout")):"list"===t?(this.isGridLayout=!1,this.isListLayout=!0,this.isMosaicLayout=!1,localStorage.setItem(g,"list"),this.shadowRoot.querySelector(".grid-layout-icon").classList.remove("selected-layout"),this.shadowRoot.querySelector(".mosaic-layout-icon").classList.remove("selected-layout"),this.shadowRoot.querySelector(".list-layout-icon").classList.add("selected-layout")):(this.isGridLayout=!1,this.isListLayout=!1,this.isMosaicLayout=!0,localStorage.setItem(g,"mosaic"),this.shadowRoot.querySelector(".grid-layout-icon").classList.remove("selected-layout"),this.shadowRoot.querySelector(".mosaic-layout-icon").classList.add("selected-layout"),this.shadowRoot.querySelector(".list-layout-icon").classList.remove("selected-layout")),this._setSelectedDisplay(),requestAnimationFrame((()=>this._resize()))}_setSelectedDisplay(){let e=localStorage.getItem(g);"grid"===e?(this.shadowRoot.querySelector(".grid-layout-icon").classList.add("selected-layout"),this.shadowRoot.querySelector(".mosaic-layout-icon").classList.remove("selected-layout"),this.shadowRoot.querySelector(".list-layout-icon").classList.remove("selected-layout")):"list"===e?(this.shadowRoot.querySelector(".grid-layout-icon").classList.remove("selected-layout"),this.shadowRoot.querySelector(".mosaic-layout-icon").classList.remove("selected-layout"),this.shadowRoot.querySelector(".list-layout-icon").classList.add("selected-layout")):(this.shadowRoot.querySelector(".grid-layout-icon").classList.remove("selected-layout"),this.shadowRoot.querySelector(".mosaic-layout-icon").classList.add("selected-layout"),this.shadowRoot.querySelector(".list-layout-icon").classList.remove("selected-layout"))}_resizeAsync(){"search"===this.AppStateModel.location.page&&(-1!==this.resizeTimer&&clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout((()=>{this.resizeTimer=-1,this._resize()}),50))}_onGridItemRendered(e){this._resize()}async _resize(){if("search"===this.AppStateModel.location.page&&!this.isListLayout){let e=this.shadowRoot.querySelector("#layout").querySelector("app-search-grid-result");if(!e)return;await this.updateComplete;let t=this.offsetWidth,i=e.offsetWidth+25,a=3;window.innerWidth<1024&&(a=2),window.innerWidth<768&&(a=1);let s=Math.floor((t-a*i)/2),o=[];for(let e=0;e<a;e++)o.push(0);s>20&&(s=20);let r=this.shadowRoot.querySelector("#layout").querySelectorAll("app-search-grid-result");for(let e=0;e<r.length;e++){let t=this._findMinCol(o),a=o[t];r[e].style.left=s+t*i+"px",r[e].style.top=a+"px",o[t]+=r[e].offsetHeight+25}let l=Math.max.apply(Math,o);this.shadowRoot.querySelector("#layout").style.height=l+"px"}}_findMinCol(e){let t=e[0],i=0;for(var a=1;a<e.length;a++)t>e[a]&&(t=e[a],i=a);return i}_onToggleDrawer(){this.dispatchEvent(new CustomEvent("toggle-drawer"))}_onPageSizeChange(e){let t={startIndex:0,itemsPerPage:parseInt(e.currentTarget.value)};this.dispatchEvent(new CustomEvent("page-change",{detail:t,bubbles:!0,composed:!0}))}_scrollToCollections(e){e.preventDefault();let t=this.shadowRoot.querySelector("ucd-theme-pagination");t&&window.scrollTo({top:t.offsetTop+100,left:0,behavior:"smooth"})}_updateCollectionResultsVisibility(e){this.showCollectionResults=e}_onCollectionClicked(e){if("keyup"===e.type&&13!==e.which)return;const t=e.target.dataset.collectionid;t&&this.AppStateModel.setLocation(t)}_onRecordClicked(e){if(e.preventDefault(),"keyup"===e.type&&13!==e.which)return;const t=e.target.dataset.url;t&&this.AppStateModel.setLocation(t)}_onPaginationChange(e){e.detail.startIndex=e.detail.page*this.numPerPage-this.numPerPage,this.dispatchEvent(new CustomEvent("page-change",{detail:e.detail,bubbles:!0,composed:!0}))}}customElements.define("app-search-results-panel",b),i(9100);var y=i(7847);function v(){return a.dy`


<style>
  ${y.F}
  :host {
    display: block;
    position: relative;
    height: 50px;
    margin: 0 13px;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently */
  }

  #numberLine {
    position: absolute;
    left : 0;
    right : 0;
    height: 3px;
    background-color: var(--light-background-color, #888);
  }

  #fillLine {
    position: absolute;
    cursor: move;
    background-color: var(--color-aggie-blue-80) ;
    height: 3px;
  }

  .btn {
    position: absolute;
    height: 25px;
    width: 25px;
    cursor: move;
  }

  .btn > div {
    margin: 5px;
    height: 15px;
    width: 15px;
    border-radius: 15px;
    background-color: var(--color-aggie-blue-80) ;
    transition: all 150ms linear;
  }

  .btn[moving] > div {
    margin: 0px;
    height: 25px;
    width: 25px;
    border-radius: 25px;
  }

  .label {
    width : 25px;
    font-size: 12px; 
    position: absolute;
    text-align: center;
    transform: scale(0);
    transition: transform 200ms linear;
    color: var(--default-primary-color);
  }

  .label[moving] {
    transform: scale(1);
  }

</style>

<div id="numberLine"></div>

<div id="fillLine" 
  prop="range" 
  @mousedown="${this._onMoveStart}" 
  @touchstart="${this._onMoveStart}">
</div>

<div id="lowNumberLabel" class="label" ?moving="${this.isMoving}">${this.minValueLabel}</div>
<div id="highNumberLabel" class="label" ?moving="${this.isMoving}">${this.maxValueLabel}</div>

<div id="lowNumberBtn" 
  class="btn" 
  prop="min" 
  @mousedown="${this._onMoveStart}" 
  @touchstart="${this._onMoveStart}" 
  ?moving="${this.movingMin}" >
  <div></div>
</div>

<div id="highNumberBtn" 
  class="btn" 
  prop="max" 
  @mousedown="${this._onMoveStart}" 
  @touchstart="${this._onMoveStart}" 
  ?moving="${this.movingMax}">
  <div></div>
</div>

`}class f extends((0,l.Mixin)(a.oi).with(l.LitCorkUtils)){static get properties(){return{absMinValue:{type:Number,attribute:"abs-min-value"},absMaxValue:{type:Number,attribute:"abs-max-value"},minValue:{type:Number,attribute:"min-value"},maxValue:{type:Number,attribute:"max-value"},minValueLabel:{type:String},maxValueLabel:{type:String},width:{type:Number},height:{type:Number},btnHeight:{type:Number},moving:{type:String},movingMin:{type:Boolean},movingMax:{type:Boolean},isMoving:{type:Boolean}}}constructor(){super(),this.render=v.bind(this),this.absMinValue=0,this.absMaxValue=100,this.minValue=10,this.maxValue=90,this.minValueLabel="",this.maxValueLabel="",this.width=1,this.height=50,this.btnHeight=1,this.moving="",this.movingMin=!1,this.movingMax=!1,this.isMoving=!1,this.hasRendered=!1,this._windowResizeListener=this._onResize.bind(this),this._windowMouseListener=this._onMoveStop.bind(this),this.addEventListener("mousemove",(e=>this._onMove(e))),this.addEventListener("touchmove",(e=>this._onMove(e)))}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this._windowResizeListener),window.addEventListener("mouseup",this._windowMouseListener),window.addEventListener("mouseout",this._windowMouseListener),window.addEventListener("touchend",this._windowMouseListener),window.addEventListener("touchcancel",this._windowMouseListener)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this._windowResizeListener),window.removeEventListener("mouseup",this._windowMouseListener),window.removeEventListener("mouseout",this._windowMouseListener),window.removeEventListener("touchend",this._windowMouseListener),window.removeEventListener("touchcancel",this._windowMouseListener)}willUpdate(e){this.hasRendered||(requestAnimationFrame((()=>{this._onResize(),this._renderAsync()})),this.hasRendered=!0)}_onResize(){this.width=this.offsetWidth||1,this.height=this.offsetHeight,this.left=this.offsetLeft,this.shadowRoot.querySelector("#lowNumberBtn")&&(this.height=50,this.btnHeight=25,this._render())}_valueToPx(e){e-=this.absMinValue;let t=(this.absMaxValue-this.absMinValue)/this.width;return Math.round(e/t)}_pxToValue(e){let t=(this.absMaxValue-this.absMinValue)/this.width;return Math.round(e*t)+this.absMinValue}_renderAsync(){this.renderTimer&&clearTimeout(this.renderTimer),this.renderTimer=setTimeout((()=>{this.renderTimer=0,this._render()}),0)}_render(){let e=.6*this.height;this.shadowRoot.querySelector("#numberLine").style.top=e+"px",this.shadowRoot.querySelector("#fillLine").style.top=e+"px";let t=this.btnHeight/2;this.shadowRoot.querySelector("#lowNumberBtn").style.top=e-t+"px",this.shadowRoot.querySelector("#highNumberBtn").style.top=e-t+"px",this.shadowRoot.querySelector("#lowNumberLabel").style.top=e-t-22+"px",this.shadowRoot.querySelector("#highNumberLabel").style.top=e-t-22+"px";let i=this.minValue<this.absMinValue?this.absMinValue:this.minValue,a=this.maxValue>this.absMaxValue?this.absMaxValue:this.maxValue,s=this._valueToPx(i),o=this._valueToPx(a);this.shadowRoot.querySelector("#lowNumberBtn").style.left=s-t+"px",this.shadowRoot.querySelector("#highNumberBtn").style.left=o-t+"px",this.shadowRoot.querySelector("#lowNumberLabel").style.left=s-t+"px",this.shadowRoot.querySelector("#highNumberLabel").style.left=o-t+"px",this.shadowRoot.querySelector("#fillLine").style.left=s+"px",this.shadowRoot.querySelector("#fillLine").style.width=o-s+"px",this.minValueLabel=this.minValue,this.maxValueLabel=this.maxValue}_onMoveStart(e){this.moving=e.currentTarget.getAttribute("prop"),"range"===this.moving&&(this.startRange={min:e.currentTarget.offsetLeft,max:e.currentTarget.offsetLeft+e.currentTarget.offsetWidth,left:e.pageX-this.left}),this.isMoving=!0,this.movingMin="max"!==this.moving,this.movingMax="min"!==this.moving}_onMove(e){if(!this.moving)return;let t;if(e.preventDefault(),"touchmove"===e.type){if(!e.changedTouches.length)return;t=e.changedTouches[0].pageX-this.left}else t=e.pageX-this.left;if("min"===this.moving)this.minValue=this._pxToValue(t);else if("max"===this.moving)this.maxValue=this._pxToValue(t);else if("range"===this.moving){let e=this.startRange.left-t;this.minValue=this._pxToValue(this.startRange.min-e),this.maxValue=this._pxToValue(this.startRange.max-e)}this.minValue<this.absMinValue&&(this.minValue=this.absMinValue),this.maxValue>this.absMaxValue&&(this.maxValue=this.absMaxValue),this.minValue>this.maxValue&&("min"===this.moving?this.minValue=this.maxValue:this.maxValue=this.minValue),this.hasRendered=!1}_onMoveStop(){this.moving&&(this.moving="",this.movingMin=!1,this.movingMax=!1,this.isMoving=!1,this.dispatchEvent(new CustomEvent("range-value-change",{detail:{min:this.minValue,max:this.maxValue}})),this.hasRendered=!1)}}function x(){return a.dy`


<style>
  ${y.F}
  :host {
    display: block;
  }

  [hidden] { display: none !important; }
  
  .labels {
    display: flex;
    margin: 0 23px 0 13px;
    color: var(--gray-text);
    font-size: var(--fs-sm);
  }

  .inputs {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  input[type="number"] {
    border: 0;
    width: 3rem;
    height: 61px;
    padding: 0 1rem;
    margin: 0 0.5rem;
    font-size: var(--fs-sm);
    background: var(--color-aggie-blue-30);
  }

  .unknown {
    margin-left: 9px;
    display: flex;
    align-items: center;
  }

  label {
    font-size: 0.85rem;
    padding-left: 5px;
  }

  app-range-slider {
    --light-background-color: var(--medium-background-color);
  }
</style>

<div class="inputs">
  <input id="minValueInput" type="number" @change="${this._onInputChange}">
  <span> - </span>
  <input id="maxValueInput" type="number" @change="${this._onInputChange}">
</div>

<div style="margin-right: 10px">
  <app-range-slider
    id="slider"
    @range-value-change="${this._onRangeSliderChange}"
    abs-min-value="${this.absMinValue}"
    abs-max-value="${this.absMaxValue}"
    min-value="${this.minValue}"
    max-value="${this.maxValue}">
  </app-range-slider>
</div>

<div class="labels">
  <div style="flex:1">${this.absMinValue}</div>
  <div>${this.absMaxValue}</div>
</div>

<div class="unknown" ?hidden="${this.showUnknown}">
  <input type="checkbox" id="unknown" @click="${this._onRangeNullChange}" checked />
  <label for="unknown">include unknown / unspecified</label>
</div>
`}customElements.define("app-range-slider",f);class w extends((0,l.Mixin)(a.oi).with(l.LitCorkUtils)){static get properties(){return{label:{type:String},filter:{type:String},absMinValue:{type:Number},absMaxValue:{type:Number},minValue:{type:Number},maxValue:{type:Number},showUnknown:{type:Boolean}}}constructor(){super(),this.render=x.bind(this),this.active=!0,this.label="",this.filter="",this.absMinValue=-1,this.absMaxValue=-1,this.minValue=-1,this.maxValue=Number.MAX_VALUE,this.showUnknown=!1,this._injectModel("AppStateModel","RecordModel","CollectionModel")}firstUpdated(){this.resize()}resize(){this.shadowRoot.querySelector("#slider")._onResize(),setTimeout((()=>{this.shadowRoot.querySelector("#slider")._onResize()}),100)}_isDefaultState(){if(!this._isFilterApplied()){let e=this.RecordModel.getCurrentSearchDocument();return this.RecordModel.removeRangeFilter(e,this.filter),this.RecordModel.setSearchLocation(e),!0}return!1}_onRangeSliderChange(e){this.minValue=e.detail.min,this.maxValue=e.detail.max,this.shadowRoot.querySelector("#minValueInput").value=this.minValue,this.shadowRoot.querySelector("#maxValueInput").value=this.maxValue,this._onRangeNullChange()}_onRangeNullChange(){let e={gte:this.minValue,lte:this.maxValue};if(this.shadowRoot.querySelector("#unknown").checked&&(e.includeNull=!0),this._isDefaultState())return;let t=this.RecordModel.getCurrentSearchDocument();this.RecordModel.setPaging(t,0),this.RecordModel.appendRangeFilter(t,this.filter,e),this.RecordModel.setSearchLocation(t)}_onInputChange(){let e=this.shadowRoot.querySelector("#minValueInput").value,t=this.shadowRoot.querySelector("#maxValueInput").value;e<this.absMinValue&&(this.shadowRoot.querySelector("#minValueInput").value=this.absMinValue,e=this.absMinValue),t>this.absMaxValue&&(this.shadowRoot.querySelector("#maxValueInput").value=this.absMaxValue,t=this.absMaxValue),e>t&&(e=t),this.minValue=e,this.maxValue=t,this._onRangeNullChange()}_onSelectedCollectionUpdate(e){this.selectedCollection=e?e["@id"]:"",this._renderFilters()}_onRecordSearchUpdate(e){"loaded"===e.state&&(this.currentFilters=e.searchDocument.filters||{},this._renderFilters())}async _renderFilters(){if(!this.currentFilters)return;let e=this.selectedCollection,t=await this.RecordModel.defaultSearch(this.selectedCollection);if(e!==this.selectedCollection)return;this.default=t;let i=this.default.payload.aggregations.ranges[this.filter];if(!i)return this._show(!1);if(this.absMinValue=i.min,this.absMaxValue=i.max,this._show(!0),(this.minValue<this.absMinValue||!this.currentFilters[this.filter])&&(this.minValue=this.absMinValue,this.shadowRoot.querySelector("#minValueInput").value=this.minValue),(this.maxValue>this.absMaxValue||!this.currentFilters[this.filter])&&(this.maxValue=this.absMaxValue,this.shadowRoot.querySelector("#maxValueInput").value=this.maxValue),this.currentFilters[this.filter]){let e=this.currentFilters[this.filter].value;this.minValue=e.gte,this.maxValue=e.lte,this.shadowRoot.querySelector("#minValueInput").value=this.minValue,this.shadowRoot.querySelector("#maxValueInput").value=this.maxValue,this.shadowRoot.querySelector("#unknown").checked=!!e.includeNull}let a=this.shadowRoot.querySelector("app-range-slider");a&&(a.hasRendered=!1),this._notifySelected()}_isFilterApplied(){return this.minValue!==this.absMinValue||this.maxValue!==this.absMaxValue||!0!==this.shadowRoot.querySelector("#unknown").checked}_notifySelected(){let e=!1,t="";this.minValue===this.absMinValue&&this.maxValue===this.absMaxValue&&this.shadowRoot.querySelector("#unknown").checked||(e=!0),e&&(t=this.minValue+" to "+this.maxValue),this.dispatchEvent(new CustomEvent("set-selected",{detail:{selected:e,label:t}}))}_show(e){requestAnimationFrame((()=>{this.dispatchEvent(new CustomEvent("update-visibility",{detail:{show:e}}))}))}reset(){this.minValue=this.absMinValue,this.maxValue=this.absMaxValue,this.shadowRoot.querySelector("#unknown").checked=!0,this._onRangeNullChange()}onParentFilterClicked(){this.reset()}}function k(){return a.dy`

  <style>
    ${y.F}
    :host {
      display: block;
    }

    .active-filter:hover #close ucdlib-icon {
      fill: var(--color-aggie-gold-80);
      border-radius: 50%;
      background-color: var(--color-aggie-blue-90);
      transition: background-color 0.3s ease-in-out;
      transition: fill 0.3s ease-in-out;
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

    .active-filter {
      color: var(--color-aggie-blue);
    }

    #close {
      width: 50px;
      height: 50px;
      display: inline-flex;
      align-items: center;
      margin-right: 0.5rem;
    }

    #close ucdlib-icon {
      padding: 3px;
      min-width: 1.2rem;
      min-height: 1.2rem;
    }

    .value {
      display: flex;
      align-items: center;
      line-height: normal;
    }

    .count {
      color: var(--text-disabled);
      flex: 1;
      text-align: right;
      min-width: 40px;
      padding: 0 10px;
      font-weight: 400;
    }

    .active-filter {
      flex: 2;
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

  <div id="filters"></div>
  <!-- <div id="filters" ?hidden="${!this.opened}"></div> -->
  

`}function _(){return a.dy`

<style>
  ${y.F}
  :host {
    display: block;
    padding-right: 0.8rem;
  }

  [hidden] { display: none !important; }

  .filter {
    padding: 4px 0;
    display: flex;
    align-items: center;
  }
  .filter a {
    display: inline-block;
    cursor: pointer;
    color: black;
    transition: color 250ms ease-out, transform 250ms ease-out;
    transform: scale(1);
  }
  .filter a span {
    color: var(--default-primary-color);
  }
  .filter a:hover {
    transform: scale(1.5);
    color: var(--default-primary-color);
  }

  .typehead-panel {
    margin: 0 28px 10px 5px;
  }
  #typeahead {
    width: 100%;
    box-sizing: border-box;
    padding: 0 5px;
    background: var(--color-aggie-blue-30);
    border: none;
    height: 61px;
    padding-left: 1rem;
    outline: none;
  }

  .active-filter {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: white;
    font-size: 14px;
    background: var(--primary-text-color);
    padding: 5px;
    border-radius: 3px;
    margin: 3px;
  }

  .active-filter:hover {
    color: var(--default-primary-color);
    background: #ccc;
  }

  .count {
    color: var(--text-disabled);
    flex: 1;
    text-align: right;
    min-width : 1.5rem;
    padding: 0 10px;
  }
  .count.has-count {
    color: black;
  }

  .overflow {
    overflow: auto;
    max-height: 200px;
  }

  iron-list {
    height: 200px;
    display: none;
  }

  app-normal-checkbox {
    overflow: hidden;
    padding-right: 5px;
  }

  paper-checkbox[active] .key {
    color: var(--default-primary-color);
    font-weight: bold;
  }

  paper-checkbox[disabled] .key {
    color: var(--secondary-text-color);
    font-style: italic;
  }

  .overflow {
    overflow-y: scroll;
  }

  .overflow::-webkit-scrollbar {
    width: 10px;
  }
  .overflow::-webkit-scrollbar-track {
    background: var(--color-aggie-blue-60);
    border-left: 4px solid var(--color-aggie-blue-40);
    border-right: 4px solid var(--color-aggie-blue-40);
  }
  .overflow[no-overflow]::-webkit-scrollbar-track {
    background: transparent;
    border: none;
  }
  .overflow::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: var(--color-aggie-blue-80);
  }

  /* basic support for FF. Chrome/Safari should support -webkit styles above */
  @supports(scrollbar-color: red blue) {
    * {
      scrollbar-color: var(--color-aggie-blue-80) var(--color-aggie-blue-50);
      scrollbar-width: thin;
    }
  }
</style>

<!-- typeahead search -->
<div class="typehead-panel" ?hidden="${!this.includeTypeahead}">
  <input id="typeahead" 
    type="text" 
    placeholder="Search ${this.label}s" 
    @keyup="${this._onTypeaheadKeyup}" />
</div>

<div class="overflow" ?no-overflow="${this.noOverflow}">
  <div>  
    ${this.buckets.map(((e,t)=>a.dy`
    <div class="filter">

      <app-normal-checkbox
        type="${e.label}"
        index="${t}"
        value="${e.key}"
        .labelMap="${e.valueMap}"
        ?checked="${e.active}" 
        @change="${this._toggleFilter}"
        ?disabled="${e.disabled}">
      </app-normal-checkbox>

      <div class="count ${e.doc_count>0?"has-count":""}">${e.doc_count}</div>
    </div>
    `))}
  </div>
</div>

`}function M(){return a.dy`

<style>
  ${y.F}

  :host {
    display: block;
    cursor: pointer;
  }

  :host(:focus) {
    outline: var(--default-outline);
  }

  :host(:hover) #close ucdlib-icon {
      fill: var(--color-aggie-gold-80);
      border-radius: 50%;
      background-color: var(--color-aggie-blue-90);
      transition: background-color 0.3s ease-in-out;
      transition: fill 0.3s ease-in-out;
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
    /* padding-top: 3px; */
    line-height: normal;
  }

  div[checked] iron-icon {
    display: inline-block;
  }

  div[checked] .value {
    font-weight: bold;
    display: flex;
    align-items: center;
    color: var(--color-aggie-blue);
  }

  div[disabled] #close,
  div #close {
    display: none;
  }

  div[disabled] .value {
    color: var(--gray-text);
  }
  div[checked] #close {
    max-width: 35px;
    height: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  ucdlib-icon {
    fill: var(--color-aggie-blue-80);
    width: 1rem;
    height: 1rem;
  }

  #close ucdlib-icon {
    padding: 3px;
    min-width: 1.2rem;
    min-height: 1.2rem;
    margin-right: 0.2rem;
  }

</style>

<div ?checked="${this.checked}" ?disabled="${this.disabled}">

  <div id="close">
    <ucdlib-icon icon="ucdlib-dams:fa-times" @click="${this._onClick}"></ucdlib-icon>
  </div>   

  <span class="value">${this._realLabel()}</span>
</div>
`}customElements.define("app-range-filter",w);class S extends((0,l.Mixin)(a.oi).with(l.LitCorkUtils)){static get properties(){return{value:{type:String},label:{type:String},labelMap:{type:Object},labelMapType:{type:String},realLabel:{type:String},checked:{type:Boolean},disabled:{type:Boolean},ariaChecked:{type:String},ariaDisabled:{type:String},role:{type:String},tabindex:{type:Number}}}constructor(){super(),this.render=M.bind(this),this.active=!0,this.value="",this.label="",this.labelMap=null,this.labelMapType=null,this.realLabel="",this.checked=!1,this.disabled=!1,this.ariaChecked="",this.ariaDisabled="",this.role="checkbox",this.tabindex=0,this.addEventListener("click",(e=>this._onClick(e))),this.addEventListener("keyup",(e=>{13===e.which&&this._onClick(e)}))}willUpdate(){this.checked=this.hasAttribute("checked")}_realLabel(e,t){return this._getLabel()}_computeAriaChecked(){return this.checked?"true":"false"}_computeAriaDisabled(){return this.disabled?"true":"false"}_computeTabIndex(){return this.disabled?-1:0}_getLabel(){return null===this.labelMapType&&this._onLabelMapUpdate(),this.labelMapType?"object"===this.labelMapType&&this.labelMap[this.value]?this.labelMap[this.value]:"function"===this.labelMapType?this.labelMap(this.value):this.value:this.value}_onLabelMapUpdate(){this.labelMapType="",this.labelMap&&(this.labelMapType=typeof this.labelMap)}_onClick(){this.disabled||(this.checked=!this.checked,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0})))}}window.customElements.define("app-normal-checkbox",S),i(3569);class L extends((0,l.Mixin)(a.oi).with(l.LitCorkUtils)){static get properties(){return{label:{type:String},filter:{type:String},ignore:{type:Array},valueMap:{type:Object},buckets:{type:Array},bucketsIronList:{type:Array},ironListActive:{type:Boolean},notified:{type:Object},includeTypeahead:{type:Boolean},typeaheadField:{type:String},noOverflow:{type:Boolean}}}constructor(){super(),this.active=!0,this.render=_.bind(this),this.updateTimer=-1,this.label="",this.filter="",this.ignore=[],this.valueMap=null,this.buckets=[],this.bucketsIronList=[],this.ironListActive=!1,this.notified={},this.includeTypeahead=!1,this.typeaheadField="",this.noOverflow=!0,this._injectModel("FiltersModel","RecordModel")}resize(){requestAnimationFrame((()=>{let e=this.shadowRoot.querySelector(".overflow");e&&e.offsetHeight>=200&&(this.noOverflow=!1)}))}_onFilterBucketsUpdate(e){e.filter===this.filter&&(e.buckets=e.buckets.filter((e=>!e.key.includes("oac.cdlib.org"))),e.buckets.forEach((e=>{if((this.notified[e.key]&&!e.active||!this.notified[e.key]&&e.active)&&this._notifySelected(e.active,e.key,e.doc_count),APP_CONFIG.collectionLabels[e.key]){let t={};t[e.key]=APP_CONFIG.collectionLabels[e.key],e.valueMap=t}})),this.bucketsIronList=[],this.buckets=e.buckets,this.ironListActive=!1,this.buckets.length>=15&&(this.includeTypeahead=!0),requestAnimationFrame((()=>{this.dispatchEvent(new CustomEvent("update-visibility",{detail:{show:0!==e.buckets.length}}))})))}getBuckets(){return this.ironListActive?this.bucketsIronList:this.buckets}onParentFilterClicked(e){let t=this.RecordModel.getCurrentSearchDocument();this.RecordModel.setPaging(t,0),this.RecordModel.removeKeywordFilter(t,this.filter,e),this.RecordModel.setSearchLocation(t),this._notifySelected(!1,e)}_notifySelected(e,t,i){!e&&this.notified[t]?delete this.notified[t]:e&&(this.notified[t]=!0),this.dispatchEvent(new CustomEvent((e?"add":"remove")+"-selected",{detail:{label:t,count:i}}))}_toggleFilter(e){e.currentTarget.hasAttribute("checked")?this.removeFilter(e):this.appendFilter(e)}appendFilter(e){let t=this.getBuckets()[parseInt(e.currentTarget.getAttribute("index"))];if(t.empty)return;this.shadowRoot.querySelector("#typeahead").value="",this.originalBuckets&&(this.originalBuckets=null);let i=this.RecordModel.getCurrentSearchDocument();this.RecordModel.setPaging(i,0),this.RecordModel.appendKeywordFilter(i,this.filter,t.key),this.RecordModel.setSearchLocation(i),this._notifySelected(!0,t.key,t.doc_count)}removeFilter(e){let t=this.getBuckets()[parseInt(e.currentTarget.getAttribute("index"))],i=this.RecordModel.getCurrentSearchDocument();this.RecordModel.setPaging(i,0),this.RecordModel.removeKeywordFilter(i,this.filter,t.key),this.RecordModel.setSearchLocation(i),this._notifySelected(!1,t.key,t.doc_count)}_onTypeaheadKeyup(){this._updateTypeahead()}_updateTypeahead(){let e=this.shadowRoot.querySelector("#typeahead").value;if(!e)return void(this.originalBuckets&&(this.ironListActive?this.bucketsIronList=this.originalBuckets:this.buckets=this.originalBuckets,this.originalBuckets=null));this.originalBuckets||(this.originalBuckets=[...this.ironListActive?this.bucketsIronList:this.buckets]);let t=new RegExp(".*"+e.toLowerCase()+".*","i"),i=this.originalBuckets.filter((e=>!(!e.sortKey.match(t)&&!e.valueMap?.[e.key]?.match(t))));this.ironListActive?this.bucketsIronList=i:this.buckets=i}}window.customElements.define("app-facet-filter",L);class C extends((0,l.Mixin)(a.oi).with(l.LitCorkUtils)){static get properties(){return{filter:{type:Object},opened:{type:Boolean},selected:{type:Array}}}constructor(){super(),this.render=k.bind(this),this._injectModel("AppStateModel"),this.filter={},this.opened=!1,this.selected=[]}firstUpdated(){if(this.filter){this.innerHTML="";var e=document.createElement("app-"+this.filter.type+"-filter");e.label=this.filter.label,e.filter=this.filter.filter,e.ignore=this.filter.ignore,e.valueMap=this.filter.valueMap||{},e.isDollar=this.filter.isDollar,e.includeTypeahead=this.filter.includeTypeahead||!1,e.typeaheadField=this.filter.typeaheadField,e.addEventListener("update-visibility",(e=>{this.style.display=e.detail.show?"block":"none",this._toggleViewableFacets(e)})),e.addEventListener("add-selected",(e=>{this.selected.findIndex((t=>t.label===e.detail.label))>-1||(e.detail.niceLabel=this._getLabel(e.detail.label),this.selected.push(e.detail),this._toggleViewableFacets(e))})),e.addEventListener("remove-selected",(e=>{let t=this.selected.findIndex((t=>t.label===e.detail.label));-1!==t&&(this.selected.splice(t,1),this._toggleViewableFacets(e))})),e.addEventListener("set-selected",(e=>{e.detail.selected?(e.detail.niceLabel=this._getLabel(e.detail.label),this.selected=[e.detail]):this.selected=[]})),this.ele=e,this.shadowRoot.querySelector("#filters").appendChild(e),this._toggleViewableFacets()}}_toggleViewableFacets(e){this.shadowRoot.querySelectorAll("app-facet-filter").forEach((e=>{e.shadowRoot.querySelectorAll(".filter").forEach((e=>{e.querySelector("app-normal-checkbox").hasAttribute("checked")?e.style.display="flex":e.style.display=this.opened?"flex":"none"}));let t=e.shadowRoot.querySelector(".typehead-panel");t&&(t.style.display=this.opened?"block":"none")}));let t=this.shadowRoot.querySelector("app-range-filter");t&&(t.parentElement.style.display=this.opened?"block":"none")}_getLabel(e){return this.filter.valueMap?"object"==typeof this.filter.valueMap?this.filter.valueMap[e]||e:this.filter.valueMap(e):e}toggle(){this.opened=!this.opened,this._toggleViewableFacets(),this._toggleOpened()}_toggleOpened(){this.opened&&this.ele&&this.ele.resize&&this.ele.resize()}_onToggleClicked(e){"keyup"===e.type&&13!==e.which&&32!==e.which||this.toggle()}_onFilterClicked(e){"keyup"===e.type&&13!==e.which||(this._notifyFilterClicked(e.currentTarget.getAttribute("label")),this.toggle())}_notifyFilterClicked(e){this.ele&&this.ele.onParentFilterClicked&&this.ele.onParentFilterClicked(e)}}function $(){return a.dy`
    <style>
      ${y.F} :host {
        background-color: var(--color-aggie-blue-40);
        position: relative;
      }

      #filters {
        margin-left: 10px;
      }

      .title {
        color: var(--default-primary-color);
        font-weight: bold;
        padding: 15px 0;
        margin-left: 10px;
        border-bottom: 1px solid var(--medium-background-color);
        display: none;
      }

      app-filter-panel {
        border-bottom: 1px solid white;
        padding: 0.4rem 0;
      }

      .thumbnail {
        background-size: cover;
        background-position: center center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .thumbnail-root {
        position: relative;
        height: 200px;
      }

      .label {
        padding: 10px 0;
        color: var(--default-primary-color);
        font-weight: var(--fw-bold);
      }

      .collection-filter {
        padding: 4px 5px;
        border-bottom: 1px solid var(--medium-background-color);
      }

      .outer-drawer-toggle {
        position: relative;
      }
      .outer-drawer-toggle[spacer] {
        height: 50px;
        border-bottom: 1px solid var(--medium-background-color);
        margin-left: 10px;
      }

      .drawer-toggle {
        font-size: var(--fs-sm);
        position: absolute;
        z-index: 15;
        top: 15px;
        right: -24px;
        cursor: pointer;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        font-weight: var(--fw-bold);
        color: var(--default-primary-color);
        background-color: var(--light-background-color);
        border-radius: 0;
        border: 0;
        padding: 0;
      }
      .drawer-toggle > span {
        padding: 0 10px;
      }
      .drawer-toggle iron-icon {
        background-color: var(--default-secondary-color);
      }

      @media (min-width: 975px) {
        h2 {
          display: block;
        }
        .outer-drawer-toggle {
          display: none;
        }
        .title {
          display: block;
        }
      }



      /* MOBILE LAYOUT */

      .heading {
        background-color: var(--color-aggie-blue-80);
        padding: 0 1rem;
        height: 61.75px;
      }
      .heading h5 {
        color: white;
        display: inline-block;
        margin: 0.8rem 0;
        font-weight: 600;
        font-size: 1.5rem;
      }
      .heading .collapse {
        display: inline-block;
        float: right;
        cursor: pointer;
        width: 60px;
        height: 60px;
      }

      .heading ucdlib-icon {
        fill: var(--color-aggie-gold);
        float: right;
        padding-top: 0.9rem;
      }

      .heading {
        display: none;
      }

      @media (max-width: 767px) {
        .heading {
          display: block;
          /* margin-top: 52px; */
        }
        :host {
          box-shadow: 0px 3px 6px #00000029;
        }
        .overflow {
          overflow-y: auto;
          height: calc(100vh - 100px);
        }
      }

    </style>

    <div class="heading">
      <h5>Filters</h5>
      <div class="collapse" @click="${this._collapseFilters}">
        <ucdlib-icon
          icon="ucdlib-dams:fa-times"
          tabindex="0"
          icon="fa-times"
          alt="Collapse filters"
        >
        </ucdlib-icon>
      </div>
    </div>

    <div class="thumbnail-root" ?hidden="${!this.collectionMode}">
      <div
        class="thumbnail"
        style="background-image: url('${this.selectedCollection.thumbnailUrl}')"
      ></div>
    </div>

    <div class="overflow">
      <div id="filters">
        ${this.facetFilters.map(((e,t)=>a.dy`
            <app-filter-panel .filter="${e}"></app-filter-panel>
          `))}
      </div>
    </div>


    </div>
  `}window.customElements.define("app-filter-panel",C);var R=i(6794),P=i.n(R);const V=[];for(var T in P().elasticSearch.facets){let e=P().elasticSearch.facets[T];V.push({label:e.label,type:e.type,ignore:e.ignore,valueMap:e.valueMap,isDollar:e.isDollar,includeTypeahead:!!e.typeahead,typeaheadField:e.typeahead,filter:T})}class I extends((0,l.Mixin)(a.oi).with(l.LitCorkUtils)){static get properties(){return{facetFilters:{type:Array},selectedCollection:{type:Object},collectionMode:{type:Boolean}}}constructor(){super(),this.render=$.bind(this),this.active=!0,this._injectModel("AppStateModel"),this.facetFilters=V,this.selectedCollection={},this.collectionMode=!1}_fireToggleDrawer(){this.dispatchEvent(new CustomEvent("toggle-drawer",{bubbles:!0,composed:!0,detail:"toggle-drawer"}))}_removeCollectionFilter(){let e=this._getCurrentSearchDocument();this.RecordModel.removeKeywordFilter(e,"isPartOf.@id"),this.RecordModel.setPaging(e,0),this.RecordModel.setSearchLocation(e)}_collapseFilters(e){this.dispatchEvent(new CustomEvent("collapse-filters",{bubbles:!0,composed:!0,detail:"collapse-filters"}))}}function A(){return a.dy`
  <style>
    ${y.F}

    :host {
      display: block;
      position: relative;
      background-color: var(--color-aggie-blue-80);
      background-image: url(/images/watercolors/watercolor-background-ucd-blue-20opacity.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    [hidden] { display: none !important; }

    h3 {
      color: var(--color-aggie-gold);
      font-weight: 700;
      margin: 0;
      padding: 3rem 3rem 0.5rem 4.5%;
    }

    .card-grid {
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-gap: 3rem;
      max-width: 91%;
    }

    ucd-theme-pagination {
      display: flex;
      justify-content: center;
      box-sizing: border-box;
    }

    @media (max-width: 768px) {
      .card-grid {
        grid-template-columns: repeat(1, minmax(0, 1fr));
        max-width: 90%;
      }
    }

    .collections-in-search {
      padding-bottom: 35px;
    }

  </style>

  <div class="collections collections-in-search" ?hidden="${!this.showResults}">
    <div>
      <h3>Collections Relevant to Your Search (${this.results.length})</h3>
      <div style="text-align:center" class="collections-content">
        <div class="card-grid">
          ${this.resultsDisplayed.map((e=>a.dy`
            <dams-collection-card data-dark-bg data-id="${e["@id"]}" @click=${this._onCollectionClicked}></dams-collection-card>
          `))}
        </div>  
      </div>
    </div>
    <ucd-theme-pagination
      ?hidden="${this.paginationTotal<2}"
      current-page=${this.currentPage}
      max-pages=${this.paginationTotal}
      @page-change=${this._onPageClicked}
      xs-screen
      darkmode
      ellipses>
    </ucd-theme-pagination>
  </div>

  
`}customElements.define("app-filters-panel",I);class U extends((0,l.Mixin)(a.oi).with(l.LitCorkUtils)){static get properties(){return{results:{type:Array},resultsDisplayed:{type:Array},showResults:{type:Boolean},currentPage:{type:Number},paginationTotal:{type:Number}}}constructor(){super(),this.active=!0,this.render=A.bind(this),this.resultsDisplayed=[],this.results=[],this.showResults=!1,this.currentPage=1,this.paginationTotal=1,this.resultsPerPage=6,this._injectModel("AppStateModel","FiltersModel","SearchVcModel")}_onAppStateUpdate(e){"search"===e.location.page&&(this.filterDisplayResults(),this._updateResultsDisplayed())}_onFilterBucketsUpdate(e){if("@graph.isPartOf.@id"!==e.filter)return;e.buckets=e.buckets.filter((e=>!e.key.includes("oac.cdlib.org")&&e.doc_count>0)),this.results=e.buckets.map((e=>({"@id":e.key})));let t=this.SearchVcModel.getSearch()?.searchDocument?.text,i=this.SearchVcModel.getSearch()?.searchDocument?.filters||{};t||Object.keys(i).length&&Object.keys(i).filter((e=>"@graph.isPartOf.@id"!==e)).length?(this.showResults=this.results.length>0,this.results=[...this.results],this.paginationTotal=Math.ceil(this.results.length/this.resultsPerPage),this.filterDisplayResults()):this.showResults=!1,this._updateResultsDisplayed()}filterDisplayResults(){let e=decodeURIComponent(this.AppStateModel.location.pathname);if(!e.includes("@graph.isPartOf.@id"))return void(this.resultsDisplay=[...this.results]);let t=e.split('@graph.isPartOf.@id","or","')[1].split('"]')[0].split(",");this.results=[...this.results.filter((e=>t.includes(e["@id"])))]}_updateResultsDisplayed(e=!1){let t=(this.currentPage-1)*this.resultsPerPage,i=t+this.resultsPerPage;this.resultsDisplayed=this.results.slice(t,i),console.warn("Not calling collection base scrolling: TODO"),this.requestUpdate()}_onCollectionClicked(e){if(e.preventDefault(),"keyup"===e.type&&13!==e.which)return;let t=e.currentTarget.getAttribute("data-id");this.AppStateModel.setLocation(t)}_onPageClicked(e){this.currentPage=e.detail.page,this._updateResultsDisplayed(!0)}}customElements.define("app-search-results-collections",U);class F extends((0,o.Z)(a.oi).with(r.C,l.LitCorkUtils)){static get properties(){return{visible:{type:Boolean},results:{type:Array},drawerOpen:{type:Boolean},firstLoad:{type:Boolean},appState:{type:Object},wideFiltersPanel:{type:Boolean},filtersCollapsed:{type:Boolean}}}constructor(){super(),this.active=!0,this.render=s.bind(this),this.visible=!1,this.results=[],this.drawerOpen=!1,this.firstLoad=!0,this.appState={},this.wideFiltersPanel=!1,this.filtersCollapsed=!0,this._injectModel("AppStateModel","CollectionModel","RecordModel","SearchVcModel","SeoModel")}async firstUpdated(){if("search"===this.AppStateModel.location.page){if(this._onAppStateUpdate(await this.AppStateModel.get()),"search"===this.appState.location.path[0]){let e=this.SearchVcModel.getSearch();e&&this._onSearchVcUpdate(e)}window.addEventListener("collapse-filters",this._onCollapseFilters.bind(this)),window.addEventListener("page-change",this._onPaginationChange.bind(this))}}_onAppStateUpdate(e){"search"===e.location.page&&(this.drawerOpen=!!e.filtersDrawerOpen,this.appState=e)}_onSearchVcUpdate(e){if("error"===e.state)return document.querySelector("#resultsPanel").onError(e);if("loading"===e.state)return document.querySelector("#resultsPanel").onLoading();if("loaded"!==e.state)return;let t=e.searchDocument.offset,i=e.payload,a=i.total.value;this.results=i.results,document.querySelector("#resultsPanel").renderResults(this.results,a,e.searchDocument.limit,t)}_onPaginationChange(e){let t=this.RecordModel.getCurrentSearchDocument();this.RecordModel.setPaging(t,e.detail.startIndex,e.detail.itemsPerPage||t.limit),this.RecordModel.setSearchLocation(t)}_toggleDrawer(){this.AppStateModel.set({filtersDrawerOpen:!this.drawerOpen})}_onFiltersTabUpdate(e){this.wideFiltersPanel="info"===e.detail.value,setTimeout((()=>{requestAnimationFrame((()=>{this.querySelector("#resultsPanel")._resizeAsync()}))}),300)}_onCollapseFilters(e){this.filtersCollapsed=!0,this.drawerOpen=!1,this.AppStateModel.set({filtersDrawerOpen:this.drawerOpen})}expandFilters(){this.filtersCollapsed=!1,this.drawerOpen=!0,this.AppStateModel.set({filtersDrawerOpen:this.drawerOpen})}}customElements.define("app-search",F)},7506:(e,t,i)=>{var a=i(5589),s=i(2959);function o(){return a.dy`

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

`}const r=new class{async load(){return!!window.IntersectionObserver||!!this.loaded||(this.loading?(await this.loading,this.loaded):(this.loading=new Promise((async(e,t)=>{await Promise.resolve().then(i.t.bind(i,5331,23)),e(!0)})),this.loading))}};class l extends((0,s.Mixin)(a.oi).with(s.LitCorkUtils)){static get properties(){return{collection:{type:Object},tabindex:{type:Number}}}constructor(){super(),this.render=o.bind(this),this.collection={},this.tabindex=0,this.shownInViewport=!1,this.active=!0}async connectedCallback(){super.connectedCallback(),"/images/logos/logo-white-512.png"===this.collection.thumbnailUrl&&(this.shadowRoot.querySelectorAll(".img")[0].className+=" defaultImage"),this.observer||(await r.load(),this.observer=new IntersectionObserver((e=>this._onViewportIntersection(e)),{rootMargin:"10px",threshold:0})),this.imageLoaded=!1,this.observer.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.observer.disconnect()}updated(){this._onCollectionChange()}_onCollectionChange(){this.shownInViewport&&this._setBackgroundImage()}_onViewportIntersection(e){0!==e.length&&(e=e[0],!this.shownInViewport&&e.isIntersecting&&(this.shownInViewport=!0,this._setBackgroundImage()))}_setBackgroundImage(){this.shadowRoot.querySelector("#img").style.backgroundImage=`url('${this.collection.thumbnailUrl}')`}}customElements.define("app-collection-card",l)},981:(e,t,i)=>{var a=i(5589),s=i(4676);const o=a.iv`

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

`,r=a.iv`

@charset "UTF-8";
.pager {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;
}
.pager li {
  list-style: none;
}
.pager__item {
  margin: 0.25rem 0.25rem 0.25rem 0;
}
.pager__item a, .pager__item--static {
  color: #003570;
  text-decoration: underline;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  padding: 0.25rem 0.5rem;
  color: #4c4c4c;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}
.pager__item a:hover, .pager__item--static:hover {
  color: #001124;
  text-decoration: none;
}
.pager__item a:hover {
  background: #ffbf00;
  color: #022851;
}
.pager__item--current, .pager__item--current a {
  background: #13639e;
  color: #fff;
}
.pager__item--current:hover, .pager__item--current a:hover {
  background: #ffbf00;
}
.pager__item--previous a {
  display: inline-flex;
  align-items: center;
}
.pager__item--previous a:before {
  margin-right: 0.5rem;
  content: "";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}
.pager__item--next a {
  display: inline-flex;
  align-items: center;
}
.pager__item--next a:after {
  margin-left: 0.5rem;
  content: "";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}
.pager--mini .pager__item--current {
  display: block;
  padding: 0.25rem 0.5rem;
  background: transparent;
  color: #4c4c4c;
  cursor: default;
}
.pager--mini .pager__item--current:hover {
  background: transparent;
}

`;function l(){return a.dy`

  <ul class="pager">
    ${this.xs_screen?a.dy`
        <div class="xs-screen${this.darkmode?" darkmode":""}">
          ${this._renderLink(this.currentPage-1,{label:"Prev",class:"pager__item--previous",noHighlight:!1})}

          ${this._renderLink(this.currentPage)}
          <span>of ${this.maxPages}</span>  
            ${this._renderLink(this.currentPage+1,{label:"Next",class:"pager__item--next",noHighlight:!1})} 
        </div>

        <div class="default${this.darkmode?" darkmode":""}">
          ${this._renderLink(this.currentPage-1,{label:"Prev",class:"pager__item--previous",noHighlight:!1})}
        
          ${this._pages.map((e=>this._renderLink(e)))}

          ${this._renderLink(this.currentPage+1,{label:"Next",class:"pager__item--next",noHighlight:!1})} 
        </div>
      `:a.dy`
        ${this._renderLink(this.currentPage-1,{label:"Prev",class:"pager__item--previous",noHighlight:!1})}
        
        ${this._pages.map((e=>this._renderLink(e)))}

        ${this._renderLink(this.currentPage+1,{label:"Next",class:"pager__item--next",noHighlight:!1})} 
    `}
  </ul>

      

`}var n=i(1914);class d extends a.oi{static get properties(){return{basePath:{type:String,attribute:"base-path"},queryParams:{type:String,attribute:"query-params"},useHash:{type:Boolean,attribute:"use-hash"},currentPage:{type:Number,attribute:"current-page",reflect:!0},maxPages:{type:Number,attribute:"max-pages"},visibleLinkCount:{type:Number,attribute:"visible-link-count"},disableLabel:{type:Boolean,attribute:"disable-label"},_pages:{type:Array},ellipses:{type:Boolean,attribute:"ellipses"},xs_screen:{type:Boolean,attribute:"xs-screen"},size:{type:String,attribute:"size"},darkmode:{type:Boolean,attribute:"darkmode"}}}static get styles(){return function(){const e=a.iv`
    :host {
      display: block;
    }
    .default {
      display: inherit;
    }
    .xs-screen {
      display:none;
    }

    @media (min-width: 991px) {
      .pager__item--next {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    @media (max-width: 992px) {
      .default {
        display: none;
      }
      .xs-screen {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .pager__item.darkmode a {
      color: white;
    }

    .pager .darkmode span {
      color: white;
    }

    .pager__item--current.darkmode a {
      background-color: #FFBF00;
      color: #002851;
    }

    .pager__item.darkmode:hover a {
      color: #002851 !important;
    }

    .pager__item--previous.pager__item--current.darkmode,
    .pager__item--previous.pager__item--current.darkmode:hover,
    .pager__item--next.pager__item--current.darkmode,
    .pager__item--next.pager__item--current.darkmode:hover {
      background-color: transparent;
    }

    .pager__item--previous.pager__item--current.darkmode:hover a,
    .pager__item--next.pager__item--current.darkmode:hover a {
      color: #cccccc !important;
    }
  `;return[s.Z,o,r,e]}()}constructor(){super(),this.breakPoints=new n.P(this),this._pages=[],this.useHash=!1,this.disableLabel=!1,this.type="virtual",this.basePath="",this.queryParams="",this.visibleLinkCount=7,this.currentPage=1,this.maxPages=1,this.ellipses=!1,this.xs_screen=!1,this.size="",this.darkmode=!1,this.screen_check=window.innerWidth<=this.breakPoints.mobileBreakPoint,this.render=l.bind(this)}willUpdate(e){if(e.has("currentPage")||e.has("maxPages"))if(this.ellipses&&this.maxPages>=8)this._pages=this._renderEllipse();else if(this.ellipses&&this.maxPages<8)this._pages=this._renderOriginal();else{let e=Math.floor(this.currentPage-this.visibleLinkCount/2);e<0?e=0:this.currentPage+this.visibleLinkCount/2>this.maxPages&&(e-=Math.ceil(this.currentPage+this.visibleLinkCount/2)-this.maxPages-1),e<0&&(e=0);let t=e+this.visibleLinkCount;t>this.maxPages&&(t=this.maxPages);let i=[];for(let a=e;a<t;a++)i.push(a+1);this._pages=i}}_constructClasses(){let e={main:!0};return this.size&&(e["size-"+this.size]=!0),e}_renderLink(e,t={}){if(this.ellipses&&"object"==typeof e&&(t.label=t.label||e.label||"",e=e.page||1),e<1&&(e=1),e>this.maxPages&&(e=this.maxPages),!0!==t.noHighlight&&e===this.currentPage&&(t.class||(t.class=""),t.class+=" pager__item--current"),this.darkmode&&(t.class+=" darkmode"),!this.basePath&&!this.useHash)return a.dy`<li class="pager__item ${t.class||""}">
        ${1==this.currentPage&&"Prev"==t.label||this.currentPage==this.maxPages&&"Next"==t.label?a.dy`<a style="pointer-events: none; cursor: default; color: ${this.darkmode?"#cccccc":"#999999"}; background: ${this.darkmode?"transparent":"white"}" tabindex="1" @click="${this._onPageClicked}" page="${e}">${t.label||e}</a>`:a.dy`<a style="cursor:pointer;" tabindex="1" @click="${this._onPageClicked}" page="${e}">${t.label||e}</a>`}  
        </li>`;let i=(this.useHash?"#":"")+(this.basePath||"/")+e+(this.queryParams?"?"+this.queryParams:"");return a.dy`<li class="pager__item ${t.class||""}">
        ${1==this.currentPage&&"Prev"==t.label||this.currentPage==this.maxPages&&"Next"==t.label?a.dy` <a style="pointer-events: none; cursor: default; color: ${this.darkmode?"#cccccc":"#999999"}; background: ${this.darkmode?"transparent":"white"};" href="${i}">${t.label||e}</a>`:a.dy` <a href="${i}">${t.label||e}</a>`}   
        </li>`}_renderOriginal(){let e=Math.floor(this.currentPage-this.visibleLinkCount/2);e<0?e=0:this.currentPage+this.visibleLinkCount/2>this.maxPages&&(e-=Math.ceil(this.currentPage+this.visibleLinkCount/2)-this.maxPages-1),e<0&&(e=0);let t=e+this.visibleLinkCount;t>this.maxPages&&(t=this.maxPages);let i=[];for(let a=e;a<t;a++)i.push(a+1);return i}_renderEllipse(){let e=this.maxPages,t=[];if(this.currentPage<=e-4&&this.currentPage>=4)for(let i=0;i<e;i++)if(0==i)t.push(i+1);else if(1==i)t.push({page:this.currentPage-3,label:"..."});else{if(i>1&&i<this.currentPage-3)continue;if(i>=this.currentPage-3&&i<this.currentPage+2)t.push(i+1);else{if(i<4&&i<this.currentPage+2)continue;i==e-2?t.push({page:this.currentPage+3,label:"..."}):i==e-1&&t.push(i+1)}}else if(this.currentPage>=4)for(let i=0;i<e;i++)if(0==i)t.push(i+1);else{if(i>0&&i<e-6)continue;i==e-6?t.push({page:i+1,label:"..."}):t.push(i+1)}else if(this.currentPage<=e-4)for(let i=0;i<e;i++)if(i<6)t.push(i+1);else if(6==i)t.push({page:i+1,label:"..."});else{if(i>6&&i<e-2)continue;i==e-1&&t.push(i+1)}return t}_onPageClicked(e){this.dispatchEvent(new CustomEvent("page-change",{detail:{page:parseInt(e.currentTarget.getAttribute("page"))}}))}}customElements.define("ucd-theme-pagination",d)}}]);