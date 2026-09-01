"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[329],{9197:(e,t,i)=>{var s=i(5589),a=i(2959);function r(){return s.dy`

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
      ${this.imgSrc?s.dy`
        <img src="${this.imgSrc}">
      `:s.dy``}
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



`}class l extends((0,a.Mixin)(s.oi).with(a.LitCorkUtils)){static get properties(){return{collection:{type:Object},id:{type:String,attribute:"data-id"},imgSrc:{type:String,attribute:"img-src"},cardTitle:{type:String,attribute:"card-title"},itemCt:{type:Number,attribute:"item-ct"},href:{type:String},darkBg:{type:Boolean,attribute:"data-dark-bg"},loading:{type:Boolean}}}constructor(){super(),this.render=r.bind(this),this.collection={},this.id="",this.renderedId="",this.imgSrc="",this.cardTitle="",this.itemCt=0,this.href="",this.darkBg=!1,this.loading=!0,this._injectModel("CollectionModel","FcAppConfigModel")}async updated(e){e.has("id")&&this.id&&this.id!==this.renderedId?this._onCollectionUpdate(await this.CollectionModel.get(this.id)):e.has("href")&&!this.id&&(this.id=this.href)}async _onCollectionUpdate(e){if("loaded"!==e.state||e.id!==this.id||this.renderedId===this.id)return;this.loading=!1,this.renderedId=this.id,this.collection=e.vcData;let t=await this.CollectionModel.getFeaturedImage(this.id,this.FcAppConfigModel);if(t)this.imgSrc=t;else if(this.collection.images){let e=this.collection.images;this.imgSrc=e.medium?e.medium.url:e.original.url}else this.imgSrc="/images/tree-bike-illustration.png";this.cardTitle=this.collection.title,this.itemCt=this.collection.count,this.href=this.collection.id,this.darkBg=!!this.attributes["data-dark-bg"]}}customElements.define("dams-collection-card",l)},5295:(e,t,i)=>{i.r(t);var s=i(5589),a=i(7847),r=i(4981),l=i(2416),o=i(334),n=i(9411);function c(){return s.dy`
    <style>
      ${a.F}
        ${r.Z}
        ${o.Z}
        ${n.Z}
        ${l.Z}
        :host {
        display: block;
        position: relative;
      }

      .vertical-link--circle .vertical-link__figure:after {
        opacity: 1;
      }

      /* STYLES BELOW ARE ACTUALLY USED. NEED TO AUDIT ANYTHING ABOVE */
      [hidden] {
        display: none;
      }

      .browse-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: row wrap;
        padding-bottom: 4rem;
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

      .priority-links {
        padding: 0 0 1rem;
      }

      .fw-light {
        font-weight: 200;
        font-style: normal;
        margin: 0.75rem 0 0.25rem;
        padding: 0;
        line-height: 1.2;
      }

      app-browse .title-section {
        text-align: center;
        border: none;
      }

      .header-icon {
        width: 6rem;
      }
    </style>

    <div ?hidden="${"/browse"!==this.page}">
      <div class="title-section">
        <h1>Browse<br /><span class="fw-light">Digital Collections</span></h1>
      </div>
      <section class="browse-buttons site-frame">
        <div class="priority-links">
          <div class="priority-links__item">
            <a
              class="vertical-link vertical-link--circle category-brand--secondary"
              href="/browse/collections/15"
            >
              <div class="vertical-link__figure">
                <!-- <ucdlib-icon class="vertical-link__image" src="http://localhost:3000/images/ucd-logo.svg"></ucdlib-icon> -->
                <!-- <ucdlib-icon class="vertical-link__image" icon="ucd-public:fa-box-archive"></ucdlib-icon>  -->
                <ucdlib-icon
                  class="vertical-link__image"
                  icon="ucdlib-dams:fa-box-archive"
                ></ucdlib-icon>
              </div>
              <div class="vertical-link__title">Collections</div>
            </a>
          </div>
          <div class="priority-links__item">
            <a
              class="vertical-link vertical-link--circle category-brand--secondary"
              href="/search"
            >
              <div class="vertical-link__figure">
                <ucdlib-icon
                  class="vertical-link__image"
                  icon="ucdlib-dams:photo-stack"
                ></ucdlib-icon>
              </div>
              <div class="vertical-link__title">All Items</div>
            </a>
          </div>
          <div class="priority-links__item">
            <a
              class="vertical-link vertical-link--circle category-brand--secondary"
              href="/browse/creator/30"
            >
              <div class="vertical-link__figure">
                <ucdlib-icon
                  class="vertical-link__image"
                  icon="ucdlib-dams:fa-wand-magic-sparkles"
                ></ucdlib-icon>
              </div>
              <div class="vertical-link__title">Creators</div>
            </a>
          </div>
          <div class="priority-links__item">
            <a
              class="vertical-link vertical-link--circle category-brand--secondary"
              href="/browse/format/30"
            >
              <div class="vertical-link__figure">
                <ucdlib-icon
                  class="vertical-link__image"
                  icon="ucdlib-dams:fa-photo-film"
                ></ucdlib-icon>
              </div>
              <div class="vertical-link__title">Formats</div>
            </a>
          </div>
          <div class="priority-links__item">
            <a
              class="vertical-link vertical-link--circle category-brand--secondary"
              href="/browse/subject/30"
            >
              <div class="vertical-link__figure">
                <ucdlib-icon
                  class="vertical-link__image"
                  icon="ucdlib-dams:fa-star"
                ></ucdlib-icon>
              </div>
              <div class="vertical-link__title">Subjects</div>
            </a>
          </div>
        </div>
      </section>
    </div>

    <app-browse-by
      id="collections"
      label="Collection"
      facet-query-name=""
      ?hidden="${"/browse/collections"!==this.page}"
    >
      <img
        class="header-icon"
        slot="header-icon"
        src="/images/watercolors/watercolor-splat-gold-collections.png"
      />
    </app-browse-by>
    <app-browse-by
      id="subject"
      label="Subject"
      facet-query-name="@graph.subjects.name"
      ?hidden="${"/browse/subject"!==this.page}">
      <img
        class="header-icon"
        slot="header-icon"
        src="/images/watercolors/watercolor-splat-green-subjects.png"
      />
    </app-browse-by>
    <app-browse-by
      id="creator"
      label="Creator"
      facet-query-name="@graph.creator.name"
      ?hidden="${"/browse/creator"!==this.page}">
      <img
        class="header-icon"
        slot="header-icon"
        src="/images/watercolors/watercolor-splat-red-creators.png"
      />
    </app-browse-by>
    <app-browse-by
      id="format"
      label="Format"
      facet-query-name="@graph.fileFormatSimple"
      ?hidden="${"/browse/format"!==this.page}">
      <img
        class="header-icon"
        slot="header-icon"
        src="/images/watercolors/watercolor-splat-blue-formats.png"
      />
    </app-browse-by>
  `}var d=i(8077),h=i(5700),g=i(2959);function p(){return s.dy`
    <style>
      ${a.F}
    </style>
    <style>
      :host {
        display: block;
        padding-bottom: 4rem;
      }

      .header {
        width: 50%;
        margin: auto;
        padding: 2rem 2rem 0;
        justify-content: center;
      }

      .header-layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 1.5rem;
        margin: 0 3rem;
      }

      h1 {
        margin: 0.5rem 1rem;
      }

      h1 .regular-wt {
        font-weight: var(--fw-regular);
      }

      a {
        text-decoration: none;
      }

      .radio-btn-container {
        margin-left: 15px;
      }

      .sort {
        display: flex;
        align-items: center;
      }

      .body {
        display: flex;
        position: relative;
        overflow-x: hidden;
      }

      [hidden] {
        display: none;
      }

      .side-image {
        flex: 1;
      }

      .side-image.no-flex {
        flex: 0;
      }

      .results {
        width: 100%;
        box-sizing: border-box;
        flex: 2;
        padding: 2rem;
        z-index: 10;
        border-bottom: 5px dotted var(--color-dams-secondary);
        border-top: 5px dotted var(--color-dams-secondary);
      }

      .results.collection {
        border-bottom: none;
        border-top: none;
      }

      .results > .table > * {
        display: flex;
        box-sizing: border-box;
        width: 100%;
      }

      .results h5 {
        margin: 0;
      }

      .results > .table > * > *:first-child {
        flex: 1;
      }

      .results h5,
      .results .list-item {
        padding: 0 1rem;
      }

      .list-item {
        margin-top: 1rem;
      }

      .list-key {
        font-weight: var(--fw-bold);
        color: var(--color-aggie-blue);
      }

      ucd-theme-pagination {
        justify-content: center;
        display: flex;
        box-sizing: border-box;
        width: 100%;
      }

      .left-image {
        width: 37.5vw;
        position: absolute;
        left: -12.5vw;
        bottom: 0;
      }

      .right-image {
        width: 37.5vw;
        position: absolute;
        right: -14.3vw;
        top: 0;
      }

      .card-grid {
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-gap: 2rem;
        max-width: 93%;
      }

      .results-footer {
        margin: 0 auto;
        width: 65%;
        padding: 2rem 2rem 0;
      }

      .header-dots,
      .footer-dots {
        display: none;
      }

      .header-dots.collection,
      .footer-dots.collection {
        display: block;
        border-bottom: 5px dotted var(--color-dams-secondary); 
        width: 650px;
        margin: 0 auto;
      }

      @media (max-width: 1310px) {
        .header,
        .results-footer {
          width: 65%;
        }
        h1 {
          margin: 0.5rem 0;
        }
      }
      @media (max-width: 767px) {
        .header,
        .results-footer {
          width: auto;
        }
      }
      @media (max-width: 990px) {
        /* tablet */
        .card-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        h1 {
          font-size: 2rem;
          font-weight: 600;
        }
        .header-dots.collection,
        .footer-dots.collection {
          width: 500px;
        }
      }

      @media (max-width: 767px) {
        /* mobile */
        .card-grid {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        .sort {
          flex-wrap: wrap;
          font-size: 0.9rem;
        }
        .sort > div:first-child {
          text-align: center;
        }
        .header {
          padding: 2rem 1rem 0;
        }
        .header-layout {
          margin: auto;
          width: 60%;
        }
        .results-footer {
          padding: 2rem 1rem 0;
        }
        /* .results-footer > * {
          margin: auto;
        } */
        .header-dots.collection,
        .footer-dots.collection {
          width: 400px;
        }

        .side-image {
          display: none;
        }
        .body {
          width: 90%;
          margin: auto;
        }
        .results {
          padding: 2rem 0;
        }
        .results h5, .results .list-item {
          padding: 0;
        }
        .table-heading {
          font-size: 1.2rem;
        }
      }

      @media (max-width: 500px) {
        .header-layout {
          width: 90%;
        }
      }
    </style>

    <div class="header">
      <div class="header-layout">
        <div><slot name="header-icon"></slot></div>
        <div>
          <h1>Browse <span>${this.label}s</span></h1>
        </div>

        <div class="sort">
          <div style="font-weight: var(--fw-bold)">Sort By:</div>
          ${this.sortByOptions.map(((e,t)=>s.dy`
              <div class="radio-btn-container">
                <input
                  type="radio"
                  id="browse-by-${this.facetQueryName}-${e.label}"
                  name="browse-by-${this.facetQueryName}"
                  index="${t}"
                  .checked="${e.selected}"
                  @change="${this._onSortChange}"
                />
                <label for="browse-by-${this.facetQueryName}-${e.label}"
                  >${e.label}</label
                >
              </div>
            `))}
        </div>
      </div>
      <div class="header-dots ${this.isCollectionPage?"collection":""}"></div>
    </div>

    <div class="body">
      <div class="side-image ${this.isCollectionPage?"no-flex":""}">
        <img
          class="left-image"
          ?hidden=${this.results.length<12||this.isCollectionPage}
          src="${this.leftImgUrl}"
        />
      </div>

      <div class="results ${this.isCollectionPage?"collection":""}">
        <div class="table" ?hidden="${this.isCollectionPage}">
          <h5>
            <div class="table-heading">${this.label}</div>
            <div class="table-heading">Items</div>
          </h5>

          ${this.results.map((e=>s.dy`
              <div class="list-item">
                <div class="list-key">
                  <a href="${this.getFilterUrl(e)}">${e.key}</a>
                </div>
                <div class="list-count">${e.count}</div>
              </div>
            `))}
        </div>

        <div ?hidden="${"collection"!==this.label.toLowerCase()}">
          <div class="card-grid">
            ${this.collectionResults.map((e=>s.dy`
                <dams-collection-card
                  data-id="${this.isCollectionPage?e.id:""}"
                  @click=${this._onCollectionClicked}
                ></dams-collection-card>
              `))}
          </div>
        </div>
      </div>
      <div class="side-image ${this.isCollectionPage?"no-flex":""}">
        <img
          class="right-image"
          ?hidden=${this.results.length<12||this.isCollectionPage}
          src="${this.rightImgUrl}"
        />
      </div>
    </div>

    <div class="results-footer">
      <div class="footer-dots ${this.isCollectionPage?"collection":""}"></div>
      <ucd-theme-pagination
        ?hidden="${this.totalPages<2}"
        current-page=${this.currentPage}
        max-pages=${this.totalPages}
        @page-change=${this._onPageClicked}
        xs-screen
        ellipses>
      </ucd-theme-pagination>
    </div>
  `}i(981),i(9197),i(6794);class u extends((0,g.Mixin)(s.oi).with(g.LitCorkUtils)){static get properties(){return{facetQueryName:{type:String,attribute:"facet-query-name"},label:{type:String},sideImages:{type:Array},sideImageIndex:{type:Number},leftImgUrl:{type:String},rightImgUrl:{type:String},sortByOptions:{type:Array},results:{type:Array},collectionResults:{type:Array},totalResults:{type:Number},resultsPerPage:{type:Number},currentIndex:{type:Number},totalPages:{type:Number},currentPage:{type:Number},isCollectionPage:{type:Boolean}}}constructor(){super(),this.render=p.bind(this),this.sortByOptions=[{label:"A-Z",type:"key",dir:"asc",selected:!0},{label:"Item Quantity",dir:"dsc",type:"count"}],this.reset(),this._injectModel("BrowseByModel","AppStateModel","RecordModel","FcAppConfigModel","CollectionModel")}async firstUpdated(){this._onAppStateUpdate(await this.AppStateModel.get()),this.isCollectionPage="collection"===this.label.toLowerCase(),this.isCollectionPage&&(this.sortByOptions=[{label:"A-Z",type:"key",dir:"asc",selected:!0},{label:"Recent",dir:"dsc",type:"key"},{label:"Item Quantity",dir:"dsc",type:"count"}]);let e=await this.FcAppConfigModel.getDefaultImagesConfig();if(e)switch(e=e.body.browseByImages,this.label.toLowerCase()){case"subject":this.sideImages=e.subjectPage;break;case"creator":this.sideImages=e.creatorPage;break;case"format":this.sideImages=e.formatPage;break;default:this.sideImages=[]}this._updateSideImages(),this._loadResults()}reset(){this.sideImages=[],this.sideImageIndex=0,this.leftImgUrl="",this.rightImgUrl="",this.results=[],this.collectionResults=[],this.totalResults=0,this.resultsPerPage=30,this.currentIndex=0,this.totalPages=1,this.currentPage=1,this.label="",this.isCollectionPage=!1}_onAppStateUpdate(e){"browse"===e.location.page&&(e.location.path.length<2||e.location.path[1]===this.id&&(this.isCollectionPage="collection"===this.label.toLowerCase(),this._loadResults(e)))}async _loadResults(e){this.resultsPerPage=this.isCollectionPage?15:30,e&&e.location.path.length>2?(this.resultsPerPage=parseInt(e.location.path[2]||this.resultsPerPage),this.currentIndex=parseInt(e.location.path[3])||0):this.currentIndex=0,0===this.totalResults&&(this.loading=!0,this.isCollectionPage?await this._searchBrowseByCollections():(this.allResults=await this.BrowseByModel.getFacets(this.facetQueryName),this.totalResults=this.allResults.payload.length),this.loading=!1),this.totalPages=this.totalResults/this.resultsPerPage<1?1:Math.ceil(this.totalResults/this.resultsPerPage);let t=this.shadowRoot.querySelector("ucd-theme-pagination");t&&t.requestUpdate("maxPages",this.totalPages),this._renderResults()}_renderResults(){if(this.isCollectionPage)return void this._renderCollections();let e=this.sortByOptions.find((e=>e.selected));this.sortedAs!==e.type&&(this.allResults.payload.sort(((t,i)=>"count"===e.type?t[e.type]>i[e.type]?"asc"===e.dir?1:-1:t[e.type]<i[e.type]?"asc"===e.dir?-1:1:0:t[e.type].toLowerCase()>i[e.type].toLowerCase()?"asc"===e.dir?1:-1:t[e.type].toLowerCase()<i[e.type].toLowerCase()?"asc"===e.dir?-1:1:0)),this.sortedAs=e.type),this.results=this.allResults.payload.slice(this.currentIndex,this.currentIndex+this.resultsPerPage),this._updateSideImages(),window.scrollTo(0,0)}_renderCollections(){let e=this.sortByOptions.find((e=>e.selected));this.sortedAs!==e.type&&("count"===e.type?this.allResults.sort(((t,i)=>t[e.type]>i[e.type]?"asc"===e.dir?1:-1:t[e.type]<i[e.type]?"asc"===e.dir?-1:1:0)):this.allResults.sort(((t,i)=>t.title.toLowerCase()>i.title.toLowerCase()?"asc"===e.dir?1:-1:t.title.toLowerCase()<i.title.toLowerCase()?"asc"===e.dir?-1:1:0))),this.collectionResults=this.allResults.slice(this.currentIndex,this.currentIndex+this.resultsPerPage),this.results=this.allResults.slice(this.currentIndex,this.currentIndex+this.resultsPerPage),this._updateSideImages(),window.scrollTo(0,0)}async _searchBrowseByCollections(){let e={},t=this.sortByOptions.filter((e=>e.selected))[0];e="A-Z"===t.label?{name:"asc"}:"Recent"===t.label?{"@graph.yearPublished":"desc"}:{"@graph.itemCount":"desc"};let i={text:"",filters:{},sort:[e],limit:this.resultsPerPage,offset:this.currentIndex,facets:{}};this.allResults=await this.CollectionModel.search(i),this.allResults=this.allResults.body.results.map((e=>({thumbnailUrl:e.root.image?.["@id"],title:e.root.name,count:e.root.itemCount,id:e.root["@id"]}))),"count"===t.type?this.allResults.sort(((e,i)=>e[t.type]>i[t.type]?"asc"===t.dir?1:-1:e[t.type]<i[t.type]?"asc"===t.dir?-1:1:0)):this.allResults.sort(((e,i)=>e.title.toLowerCase()>i.title.toLowerCase()?"asc"===t.dir?1:-1:e.title.toLowerCase()<i.title.toLowerCase()?"asc"===t.dir?-1:1:0)),this.collectionResults=this.allResults.slice(this.currentIndex,this.currentIndex+this.resultsPerPage),this.totalResults=this.allResults.length}_updateSideImages(){if(!this.sideImages||this.sideImages&&!this.sideImages.length)return this.leftImgUrl="",void(this.rightImgUrl="");if(this.sideImageIndex=this.currentPage-1,this.currentPage>this.sideImages.length)for(;this.sideImageIndex+1>this.sideImages.length;)this.sideImageIndex-=this.sideImages.length;this.leftImgUrl=this.sideImages[this.sideImageIndex].leftImgUrl,this.rightImgUrl=this.sideImages[this.sideImageIndex].rightImgUrl}_onPageClicked(e){this.currentPage=e.detail.page,this.currentIndex=(this.currentPage-1)*this.resultsPerPage;let t="/browse/"+this.id+"/"+this.resultsPerPage;this.currentIndex>0&&(t+="/"+this.currentIndex),this.AppStateModel.setLocation(t),this._renderResults()}_onCollectionClicked(e){if(e.preventDefault(),"keyup"===e.type&&13!==e.which)return;let t=e.currentTarget.getAttribute("data-id");this.AppStateModel.setLocation(t)}_onSortChange(e){let t=parseInt(e.currentTarget.getAttribute("index"));this.sortByOptions.forEach(((e,i)=>e.selected=i===t)),this.currentIndex=0,this.currentPage=1,this.isCollectionPage&&this._searchBrowseByCollections(),this._renderResults()}getFilterUrl(e){let t=this.RecordModel.emptySearchDocument();return this.RecordModel.appendKeywordFilter(t,this.facetQueryName,e.key),"/search/"+this.RecordModel.searchDocumentToUrl(t)}}customElements.define("app-browse-by",u);class m extends((0,d.Z)(s.oi).with(h.C,g.LitCorkUtils)){static get properties(){return{page:{type:String}}}constructor(){super(),this.render=c.bind(this),this.active=!0,this.page="",this._injectModel("AppStateModel")}async firstUpdated(){this._onAppStateUpdate(await this.AppStateModel.get())}_onAppStateUpdate(e){let t="/"+e.location.path[0];e.location.path.length>1&&(t+="/"+e.location.path[1]),this.page=t}}customElements.define("app-browse",m)},981:(e,t,i)=>{var s=i(5589),a=i(4676);const r=s.iv`

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

`,l=s.iv`

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

`;function o(){return s.dy`

  <ul class="pager">
    ${this.xs_screen?s.dy`
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
      `:s.dy`
        ${this._renderLink(this.currentPage-1,{label:"Prev",class:"pager__item--previous",noHighlight:!1})}
        
        ${this._pages.map((e=>this._renderLink(e)))}

        ${this._renderLink(this.currentPage+1,{label:"Next",class:"pager__item--next",noHighlight:!1})} 
    `}
  </ul>

      

`}var n=i(1914);class c extends s.oi{static get properties(){return{basePath:{type:String,attribute:"base-path"},queryParams:{type:String,attribute:"query-params"},useHash:{type:Boolean,attribute:"use-hash"},currentPage:{type:Number,attribute:"current-page",reflect:!0},maxPages:{type:Number,attribute:"max-pages"},visibleLinkCount:{type:Number,attribute:"visible-link-count"},disableLabel:{type:Boolean,attribute:"disable-label"},_pages:{type:Array},ellipses:{type:Boolean,attribute:"ellipses"},xs_screen:{type:Boolean,attribute:"xs-screen"},size:{type:String,attribute:"size"},darkmode:{type:Boolean,attribute:"darkmode"}}}static get styles(){return function(){const e=s.iv`
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
  `;return[a.Z,r,l,e]}()}constructor(){super(),this.breakPoints=new n.P(this),this._pages=[],this.useHash=!1,this.disableLabel=!1,this.type="virtual",this.basePath="",this.queryParams="",this.visibleLinkCount=7,this.currentPage=1,this.maxPages=1,this.ellipses=!1,this.xs_screen=!1,this.size="",this.darkmode=!1,this.screen_check=window.innerWidth<=this.breakPoints.mobileBreakPoint,this.render=o.bind(this)}willUpdate(e){if(e.has("currentPage")||e.has("maxPages"))if(this.ellipses&&this.maxPages>=8)this._pages=this._renderEllipse();else if(this.ellipses&&this.maxPages<8)this._pages=this._renderOriginal();else{let e=Math.floor(this.currentPage-this.visibleLinkCount/2);e<0?e=0:this.currentPage+this.visibleLinkCount/2>this.maxPages&&(e-=Math.ceil(this.currentPage+this.visibleLinkCount/2)-this.maxPages-1),e<0&&(e=0);let t=e+this.visibleLinkCount;t>this.maxPages&&(t=this.maxPages);let i=[];for(let s=e;s<t;s++)i.push(s+1);this._pages=i}}_constructClasses(){let e={main:!0};return this.size&&(e["size-"+this.size]=!0),e}_renderLink(e,t={}){if(this.ellipses&&"object"==typeof e&&(t.label=t.label||e.label||"",e=e.page||1),e<1&&(e=1),e>this.maxPages&&(e=this.maxPages),!0!==t.noHighlight&&e===this.currentPage&&(t.class||(t.class=""),t.class+=" pager__item--current"),this.darkmode&&(t.class+=" darkmode"),!this.basePath&&!this.useHash)return s.dy`<li class="pager__item ${t.class||""}">
        ${1==this.currentPage&&"Prev"==t.label||this.currentPage==this.maxPages&&"Next"==t.label?s.dy`<a style="pointer-events: none; cursor: default; color: ${this.darkmode?"#cccccc":"#999999"}; background: ${this.darkmode?"transparent":"white"}" tabindex="1" @click="${this._onPageClicked}" page="${e}">${t.label||e}</a>`:s.dy`<a style="cursor:pointer;" tabindex="1" @click="${this._onPageClicked}" page="${e}">${t.label||e}</a>`}  
        </li>`;let i=(this.useHash?"#":"")+(this.basePath||"/")+e+(this.queryParams?"?"+this.queryParams:"");return s.dy`<li class="pager__item ${t.class||""}">
        ${1==this.currentPage&&"Prev"==t.label||this.currentPage==this.maxPages&&"Next"==t.label?s.dy` <a style="pointer-events: none; cursor: default; color: ${this.darkmode?"#cccccc":"#999999"}; background: ${this.darkmode?"transparent":"white"};" href="${i}">${t.label||e}</a>`:s.dy` <a href="${i}">${t.label||e}</a>`}   
        </li>`}_renderOriginal(){let e=Math.floor(this.currentPage-this.visibleLinkCount/2);e<0?e=0:this.currentPage+this.visibleLinkCount/2>this.maxPages&&(e-=Math.ceil(this.currentPage+this.visibleLinkCount/2)-this.maxPages-1),e<0&&(e=0);let t=e+this.visibleLinkCount;t>this.maxPages&&(t=this.maxPages);let i=[];for(let s=e;s<t;s++)i.push(s+1);return i}_renderEllipse(){let e=this.maxPages,t=[];if(this.currentPage<=e-4&&this.currentPage>=4)for(let i=0;i<e;i++)if(0==i)t.push(i+1);else if(1==i)t.push({page:this.currentPage-3,label:"..."});else{if(i>1&&i<this.currentPage-3)continue;if(i>=this.currentPage-3&&i<this.currentPage+2)t.push(i+1);else{if(i<4&&i<this.currentPage+2)continue;i==e-2?t.push({page:this.currentPage+3,label:"..."}):i==e-1&&t.push(i+1)}}else if(this.currentPage>=4)for(let i=0;i<e;i++)if(0==i)t.push(i+1);else{if(i>0&&i<e-6)continue;i==e-6?t.push({page:i+1,label:"..."}):t.push(i+1)}else if(this.currentPage<=e-4)for(let i=0;i<e;i++)if(i<6)t.push(i+1);else if(6==i)t.push({page:i+1,label:"..."});else{if(i>6&&i<e-2)continue;i==e-1&&t.push(i+1)}return t}_onPageClicked(e){this.dispatchEvent(new CustomEvent("page-change",{detail:{page:parseInt(e.currentTarget.getAttribute("page"))}}))}}customElements.define("ucd-theme-pagination",c)}}]);