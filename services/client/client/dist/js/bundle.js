/*! For license information please see bundle.js.LICENSE.txt */
(()=>{var __webpack_modules__={1655:(e,t,i)=>{const r=i(1336),o="http://schema.org/Dataset";e.exports=(e,t="https://digital.ucdavis.edu")=>{let i=(e=r(e))["@type"];return i&&-1===i.indexOf(o)&&i.push(o),e.hasPart&&delete e.hasPart,e.url=t+e["@id"],e.provider={"@type":"Organization",email:"library@ucdavis.edu",url:t,name:"University of California, Davis, Library",description:"UC Davis Library, Digital Collections",image:t+"/images/ucd-lib-logo-rgb.png"},e.publisher||(e.publisher={"@type":"Organization",name:"University of California, Davis, Library",description:"UC Davis Library, Digital Collections",image:t+"/images/ucd-lib-logo-rgb.png"}),e.includedInDataCatalog={"@type":"DataCatalog",name:"UC Davis Library, Digital Collections"},e.distribution={"@type":"DataDownload",name:e["@id"].replace(/\/collection\//,""),contentUrl:t+"/fcrepo/rest"+e["@id"],encodingFormat:"text/html"},e.creator&&delete e.creator,e}},1093:e=>{const t=["hasPart","associatedMedia","caption","transcript"];function i(e,t,r){let o;for(let n of r)if(o=e[n],o){Array.isArray(o)||(o=[o]);for(let e=0;e<o.length;e++){let n=o[e];n instanceof Object&&n["@id"]&&1===Object.keys(n).length&&t[n["@id"]]&&(o[e]=t[n["@id"]],i(o[e],t,r))}1===o.length?e[n]=o[0]:e[n]=o}}e.exports=(e,r,o)=>{o||(o=t);let n={};if(r.forEach((t=>{n[t["@id"]]=t,!e&&t.isRootRecord&&(e=t["@id"])})),r=n,!e)throw new Error("No id provided and no root record found in graph");let a=r[e];return a?(i(a,r,o),a):{}}},1318:(e,t,i)=>{e.exports={collectionTransform:i(1655),graphConcat:i(1093),recordTransform:i(1336)}},1336:e=>{const t=["createdBy","lastModifiedBy","yearPublished","collectionId","isRootRecord","parent","creators","abouts","identifiers","fileFormats","indexableContents","indexableContent","type","textIndexable","media","clientMedia","clientMediaDownload","itemCount","_"],i=["associatedMedia","hasPart"],r={lastModified:"dateModified"};e.exports=function e(o,n,a){if(o["@context"]={"@vocab":"http://schema.org/"},!0===o.error)return o.error={description:o.message},delete o.message,o;o.image?(o.image["@type"]="ImageObject",o.image.colorPalette&&delete o.image.colorPalette,o.image.iiif&&delete o.image.iiif,o.image.filename&&(o.image.name||(o.image.name=o.image.filename),delete o.image.filename),o.fileSize&&(o.image.contentSize||(o.image.contentSize=o.fileSize),delete o.fileSize),o.image.fileFormat&&(o.image.encodingFormat||(o.image.encodingFormat=o.image.fileFormat),delete o.image.fileFormat),o.image.clientMedia&&delete o.image.clientMedia,o.image._&&delete o.image._,o.image["@shortType"]&&delete o.image["@shortType"],o.image.id&&delete o.image.id,o.image["@id"]&&(o.image.url="/fcrepo/rest"+o.image["@id"],delete o.image["@id"])):(o.filename||o.fileSize||o.fileFormat)&&(o.filename&&(o.name||(o.name=o.filename),delete o.filename),o.fileSize&&(o.contentSize||(o.contentSize=o.fileSize),delete o.fileSize),o.fileFormat&&(o.encodingFormat||(o.encodingFormat=o.fileFormat),delete o.fileFormat)),o.license&&(o.license["@id"]?o.license=o.license["@id"]:o.license.name?o.license=o.license.name:delete o.license);let s=o["@type"];if(s)for(let e=s.length-1;e>=0;e--)s[e].match(/^http:\/\/schema.org/)||s.splice(e,1);t.forEach((e=>{o[e]&&delete o[e]}));for(let e in r)o[e]&&(o[r[e]]||(o[r[e]]=o[e]),delete o[e]);return i.forEach((t=>{let i=o[t]||[];Array.isArray(i)||(i=[i]),i.forEach((t=>e(t,n)))})),o}},6236:(e,t,i)=>{"use strict";var r=i(5589);function o(){return r.dy`
  <style>
    :host {
      display: inline-block;
    }
    .hidden {
      display: none !important;
    }
    .container {
      font-size: .84rem;
      background-color: red;
      align-items: center;
      width: auto;
      height: 1.5rem;
      border-radius: 2rem;
      padding-left:.5rem;
      padding-top:.5rem;
      padding-bottom:.5rem;
      padding-right:1rem;
      display:flex;
      background-color: var(--color-aggie-blue-50);
      font-weight: bold;
      font-size: 0.84rem;
      color: var(--default-primary-color);


    }
    .container:hover .icon-container{
      background-color: var(--color-aggie-blue-70);
    }
    .container:hover iron-icon{
      fill: var(--color-aggie-gold);
    }
    .icon-container {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 1rem;
      background-color:transparent;
      display: inline-block;
      transition: 0.3s;



    }
    iron-icon {
      fill: var(--color-aggie-blue-70);
    }

  </style>
  <div class="container">
    <div class="icon-container">
      <iron-icon @click=${this._deleteFilter} icon="icons:close"></iron-icon>
    </div>
    <span style="padding-left:.2rem">
      <slot name="filter-button-text"></slot>
    </span>
  </div>
  `}class n extends r.oi{static get properties(){return{themeColor:{type:String,attribute:"theme-color"},choices:{type:Array}}}constructor(){super(),this.render=o.bind(this),this.choices=[],this.themeColor="outline-primary"}_constructClasses(){let e={};return this.filterIcon&&(e["has-filter-icon"]=!0),this.themeColor&&(e["color-"+this.themeColor]=!0),e}_deleteFilter(e){e.target.parentNode.parentNode.remove(),this.requestUpdate()}_handleClick(e){let t=e.target.getAttribute("index");(t!=this.chosen||this.stickyTitle)&&(this.chosen=t,this.shadowRoot.getElementById("dropdown").close(),this.dispatchEvent(new CustomEvent("new-selection",{detail:{index:t,selected:this.choices[t]}})))}}customElements.define("app-filter-button",n)},6819:(e,t,i)=>{"use strict";var r=i(5589),o=i(9567);function n(){return r.dy`

<style>
  :host {
    display: inline-block;
    position: relative;
  }
  .img-container {
    border-radius: 50%;
    background-size: cover;
    position: absolute;
  }
  iron-icon {
    position: absolute;
  }
  dams-watercolor {
    height: 100%;
    width: 100%;
  }
  .gold {
    color: var(--color-aggie-gold);
  }
  .white {
    color: var(--color-white);
  }
</style>
<dams-watercolor
  rotate="${this.wcRotation}"
  color="${this.wcColor}"
  src-file-prefix="${this.wcPattern}">
</dams-watercolor>
${this.imgSrc?r.dy`
  <div class="img-container" style="${(0,o.V)(this.getImgStyles())}"></div>
`:r.dy``}
${this.icon?r.dy`
  <iron-icon icon="${this.icon}" style="${(0,o.V)(this.getIconStyles())}"></iron-icon>
`:r.dy``}
${"stars"===this.overlayTemplate?r.dy`
  <iron-icon style="width:50px;height:50px;top:35%;left:30%;" icon="star" class="gold"></iron-icon>
  <iron-icon style="width:25px;height:25px;top:20%;left:50%;" icon="star" class="white"></iron-icon>
  <iron-icon style="width:25px;height:25px;top:40%;left:60%;" icon="star" class="white"></iron-icon>
`:r.dy``}
`}i(3962);class a extends r.oi{static get properties(){return{wcPattern:{type:String,attribute:"wc-pattern"},wcColor:{type:String,attribute:"wc-color"},wcRotation:{type:Number,attribute:"wc-rotation"},overlayTemplate:{type:String,attribute:"overlay-template"},overlayWidth:{type:Number,attribute:"overlay-width"},overlayHeight:{type:Number,attribute:"overlay-height"},imgSrc:{type:String,attribute:"img-src"},imgPosition:{type:String,attribute:"img-position"},overlayTop:{type:String,attribute:"overlay-top"},overlayLeft:{type:String,attribute:"overlay-left"},icon:{type:String}}}constructor(){super(),this.render=n.bind(this),this.wcPattern="",this.wcColor="",this.wcRotation=0,this.overlayWidth=100,this.overlayHeight=100,this.imgSrc="",this.overlayTop="",this.overlayLeft="",this.imgPosition="center center",this.icon="",this.iconColor="#ffffff",this.overlayTemplate=""}getImgStyles(){return this.imgSrc?{width:`${this.overlayWidth}px`,height:`${this.overlayHeight}px`,"background-image":`url(${this.imgSrc})`,"background-position":this.imgPosition,top:this.overlayTop?this.overlayTop:`calc(50% - ${this.overlayWidth/2}px)`,left:this.overlayLeft?this.overlayLeft:`calc(50% - ${this.overlayHeight/2}px)`}:{}}getIconStyles(){return this.icon?{width:`${this.overlayWidth}px`,height:`${this.overlayHeight}px`,top:this.overlayTop?this.overlayTop:`calc(50% - ${this.overlayWidth/2}px)`,left:this.overlayLeft?this.overlayLeft:`calc(50% - ${this.overlayHeight/2}px)`,color:this.iconColor}:{}}}customElements.define("dams-watercolor-overlay",a)},3962:(e,t,i)=>{"use strict";var r=i(5589),o=i(9567);function n(){return r.dy`

<style>
  :host {
    display: inline-block;
  }
  img {
    object-fit: contain;
  }
  .bg-img {
    background-repeat: repeat-x;
    background-size: auto 100%;
    background-position: bottom;
    width: 100%;
    height: 100%;
  }
</style> 
${"img"===this.element?r.dy`
  <img 
    src="${this.getImgSrc()}" 
    srcset="${this.getImgSrcSet()}"
    height="100%"
    width="100%"
    alt="" 
    style="${(0,o.V)(this.getImgStyles())}">
`:r.dy`
  <div class="bg-img" style="${(0,o.V)(this.getBgImgStyles())}"></div>
`}


`}class a extends r.oi{static get properties(){return{srcDir:{type:String,attribute:"src-dir"},srcFilePrefix:{type:String,attribute:"src-file-prefix"},srcExt:{type:String,attribute:"src-ext"},color:{type:String},rotate:{type:Number},element:{type:String}}}constructor(){super(),this.render=n.bind(this),this.validateImgSrc(),this.height="",this.width="",this.rotate=0,this.element="img"}validateImgSrc(){let e={srcDir:"/images/watercolors",srcFilePrefix:"watercolor",srcExt:"png",color:"blue"};for(const t in e)this[t]||(this[t]=e[t])}getImgSrc(e="1x"){this.validateImgSrc();let t=`${this.srcDir}/${this.srcFilePrefix}-${this.color}`;return e&&"1x"!==e&&(t+=`-${e}`),t+=`.${this.srcExt}`,t}getImgSrcSet(){return`${this.getImgSrc()}, ${this.getImgSrc("2x")} 2x`}getImgStyles(){let e={};return e.transform=`rotate(${this.rotate}deg)`,e}getBgImgStyles(){let e={"background-image":`url(${this.getImgSrc()})`};return this.rotate&&(e.transform=`rotate(${this.rotate}deg)`),e}}customElements.define("dams-watercolor",a)},7885:(e,t,i)=>{"use strict";var r=i(5589),o=i(2959),n=i(7847);function a(){return r.dy`
<style>${n.F}</style>
<style>
  :host {
    display: block;
    --header-height: 76px;
  }
  .nav {
    display: flex;
    background: var(--default-primary-color);
    background-size: cover;
    background-position: center;
    height: var(--header-height);
    align-items: center;
  }
  h4 {
    padding: 0px 30px;
  }
  h4 a {
    text-decoration: none;
    color: var(--color-aggie-gold);
  }

  .btn {
    position: relative;
    transform: skew(-20deg);
  }

  .parallelogram {
    height: var(--header-height);
    /* transform: skew(-20deg); */
    background: transparent;
    display: flex;
    justify-content: center;
  	align-items: center;
    transition: 0.3s;
    padding: 0 20px;
    text-decoration: none;
    text-transform: uppercase;
    min-width: 74px;
  }

  .parallelogram > * {
    color: white;
    transform: skew(20deg); /* UNSKEW */
    font-size: .84rem;
  }

  .btn:active .parallelogram, 
  .btn:focus .parallelogram, 
  .btn:hover .parallelogram,
  .btn:focus-within .parallelogram, 
  .parallelogram:focus {
    background: var(--color-aggie-gold);
    color: var(--color-dams-primary);
  }

  btn:active .parallelogram > *, 
  .btn:focus .parallelogram > *, 
  .btn:hover .parallelogram > *,
  .btn:focus-within .parallelogram > *, 
  .parallelogram:focus > * {
    color: var(--color-dams-primary);
  }

  .dropdown-content {
    list-style: none;
    margin: 0;
    padding: 0;
    transform: skew(20deg); /* UNSKEW */
    display: none;
    position: absolute;
    left: 31px;
    background-color: var(--color-aggie-gold-20);
    width: 100%;
    z-index: 1000;
  }

  .dropdown-content[visible] {
    display: block;
  }

  .dropdown-content a {
    color: var(--color-dams-primary);
    /* color: black; */
    padding: 2px 10px;
    text-decoration: none;
    display: block;
    text-align: left;
  }
  .dropdown-content a:hover,
  .dropdown-content a:focus {
    background-color: var(--color-aggie-gold);
  }

  .ucd-logo-container {
    display: flex;
    align-self: stretch;
    align-items: center;
    background-image: linear-gradient( 110deg, 
      var(--default-primary-color) 15%, 
      var(--color-aggie-blue-80) 15% 22%, 
      var(--color-aggie-blue-70) 18%
    );
    padding: 0 10px 0 50px;
  }
  .ucd-logo-container img {
    height: 20px;
  }
  .ucd-logo-container a {
    line-height: 0;
  }

  @media (min-width: 768px) {
    .home-link {
      display: none;
    }
  }
  
</style>

<ucdlib-header site-name="Digital Collections">
  <ucdlib-primary-nav hover-delay="200">
    <a href="/" class="home-link" mobile-only>Home</a>
    <ul link-text="Browse" href="/browse">
      <li><a href="/browse/collections/15">Collections</a></li>
      <li><a href="/search">Items</a></li>
      <li><a href="/browse/creator/30">Creators</a></li>
      <li><a href="/browse/format/30">Formats</a></li>
      <li><a href="/browse/subject/30">Subjects</a></li>
    </ul>
    <a href="/about">About</a>
  </ucdlib-primary-nav>
  </ucdlib-header>
`}var s=i(3557),l=i(5114),c=i(2114),d=i(4927),h=i(5742),p=i(7405),u=i(8987),m=i(4192);function g(){return r.dy`
${this.isDemo?r.dy`
  <style>
    .l-navbar { top: auto !important}
  </style>
`:r.dy``}

<style>
@media (min-width: ${this.mobileWidth}px) {
  .l-header .mobile-bar {
    display: none;
  }
}

@media (max-width: ${this.mobileWidth-1}px) {
  .fixed-mobile .mobile-bar {
    position: fixed;
    width: 100%;
    z-index: 1000;
    top: 0;
  }
  .fixed-mobile .off-canvas {
    position: fixed;
    overflow: auto;
    z-index: 1000;
    top: 55px;
  }
  .fixed-mobile .l-header__branding {
    margin-top: 55px;
  }
  .branding-bar-mobile-links {
    display: block;
  }
  .site-branding__site-name,
  .logo-container {
    display: none !important;
  }
}

@media (min-width: ${this.mobileWidth}px) {
  .fixed-desktop .l-navbar {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
  }
}

.l-header .l-navbar {
  position: relative;
  z-index: 830;
  height: 100%;
  min-height: 3.25rem;
}
@media (max-width: ${this.mobileWidth-1}px) {
  .l-header .l-navbar {
    position: absolute;
    top: 3.25rem;
    left: 0;
  }
  .off-canvas--left {
    left: 0;
  }
  .off-canvas {
    position: absolute;
    z-index: 830;
    width: 70vw;
    min-width: 15rem;
    height: 100%;
    background: #fff;
    transition: all 0.3s;
  }
  .off-canvas__container {
    position: static;
  }
  .menu--hidden .off-canvas__container {
    display: none;
  }
  .off-canvas--fixed, .l-header--fixed .off-canvas {
    position: fixed;
    z-index: 1000;
    overflow: auto;
  }
  .off-canvas--fixed .off-canvas__container, .l-header--fixed .off-canvas .off-canvas__container {
    padding-bottom: 9rem;
  }
  .menu--closed .off-canvas--left {
    transform: translateX(-105%);
  }
  .l-header .mobile-bar {
    display: flex;
    align-items: center;
    overflow: hidden;
    min-height: 3.25rem;
    background-color: #022851;
  }
}
@media (min-width: ${this.mobileWidth}px) {
  .menu--closed .off-canvas--left {
    transform: none !important;
  }
  .off-canvas {
    position: initial !important;
    width: auto !important;
    background-color: transparent !important;
  }
  .l-header .l-navbar {
    width: 100%;
    height: auto;
  }
  .l-header--fixed .l-navbar.is-fixed {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
  }
  .menu--hidden .off-canvas__container {
    display: grid !important;
    grid-template-areas: "nav quick search logo";
  }
  .l-nav-horizontal {
    display: grid;
    grid-template-areas: "nav search quick";
    grid-template-columns: 1fr max-content max-content;
  }
  .l-nav-horizontal__primary-nav {
    grid-area: nav;
  }
  .l-nav-horizontal__search-popup {
    z-index: 3;
    grid-area: search;
  }
  .l-nav-horizontal__search-popup .search-popup__open {
    position: relative;
  }
  .l-nav-horizontal__quick-links {
    z-index: 2;
    grid-area: quick;
  }
  .site-branding__site-name {
    font-size: 2rem !important;
  }
}
</style>

<header class=${(0,s.$)(this._getHeaderClasses())}>
  <div class="mobile-bar">
    <div class="mobile-bar__nav-toggle">
      <button 
        @click=${this._onBtnClick}
        class="nav-toggle ${this.opened?"nav-toggle--active":""}" 
        aria-controls="primary-nav" 
        aria-expanded="${this.opened?"true":"false"}" 
        aria-label="Toggle Main Menu">
        <span class="nav-toggle__icon nav-toggle__icon--menu">Menu</span>
      </button>
    </div>
    <div class="mobile-bar__fixed-site-name"><a href="/">${this.siteName}</a></div>
    <div class="mobile-bar__university">
      <a href="https://www.ucdavis.edu/" aria-label="UC Davis main website link">
        <img class="ucd-logo" src='data:image/svg+xml;utf8,${this._ucdLogo("gold")}' alt="UC Davis main website link">
      </a>
    </div>
  </div>

  <div class="${(0,s.$)(this._getNavbarClasses())}" id="nav-bar">
    <div class="l-container--navigation off-canvas off-canvas--left">
      <div class="off-canvas__container l-nav-horizontal">
        <div class="site-name-container">
          <h1 class="site-branding__site-name" ?hidden=${!this.siteName}>
            <a href="/">${this.siteName}</a>
          </h1>
        </div>
        <div>
          <slot name="primary-nav"></slot>
        </div>
        ${this._hasSearch?r.dy`
          <div class="l-nav-horizontal__search-popup">      
            <slot name="search"></slot>
          </div>
        `:r.dy``}
        
        <div class="logo-container">
          <div ?hidden=${this._hasSearch} class="logo-border"></div>
          <div class="website-link-container">
            <a class="logo-link" href="https://www.ucdavis.edu/" aria-label="UC Davis main website link">
              <div class="ucd-logo"></div>
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</header>
  

`}var f=i(8337),y=i(3333),v=i(5528);class b extends r.oi{static get properties(){return{siteName:{type:String,attribute:"site-name"},opened:{type:Boolean},silenceWarnings:{type:Boolean,attribute:"silence-warnings"},preventFixed:{type:Boolean,attribute:"prevent-fixed"},mobileWidth:{type:Number,attribute:"mobile-width"},isDemo:{type:Boolean,attribute:"is-demo"},_transitioning:{type:Boolean,state:!0},_hasPrimaryNav:{type:Boolean,state:!0},_hasQuickLinks:{type:Boolean,state:!0},_hasSearch:{type:Boolean,state:!0},_components:{type:Object,state:!0}}}static get styles(){return function(){const e=r.iv`
    :host {
      display: block;
    }
    [hidden] {
      display: none !important;
    }
    button {
      cursor: pointer;
    }

    #nav-bar .ucd-logo {
      height: 1.25rem;
      position: relative;
      top: -10px;
      margin: 0 1rem;
      background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="16.157"><path fill="white" d="M58.865 4.877c.101.661 1.101 5.405 1.101 5.405h-2.194l1.093-5.405zm-8.328 11.03h5.806l.438-1.947h4.144l.554 1.947h5.806L61.846.403h-6.087l-5.222 15.504zM36.284.402h5.624c5.107 0 9.007 2.277 9.007 7.974 0 4.591-3.18 7.529-7.645 7.529l-6.986-.009V.402zm5.524 11.052h.376c1.843 0 3.207-1.072 3.207-3.096 0-2.179-1.21-3.395-3.234-3.395h-.349v6.491zM32.941.888l.296 2.545c.071.604.426 2.052-.011 1.858-.276-.121-.502-.776-.726-1.36-.114-.295-.658-1.695-.801-1.799-.685-.501-2.401-1.064-3.561-1.069-3.521-.013-5.847 2.509-5.847 6.982 0 3.208 1.582 7.061 5.607 7.061 1.441 0 4.201-.443 4.952-2.436.339-.9.65-1.703.876-1.459.166.177-.05.899-.15 1.289-.474 1.847-.501 2.406-.65 2.479-1.818.885-4.15 1.178-6.191 1.178-6.485 0-8.726-3.678-8.726-7.354 0-6.379 4.032-9.021 10.286-8.791 1.58.058 3.163.334 4.646.876M13.784 1.171L12.745.819c-.35-.306.075-.391.075-.391s1.5.271 5.24-.036c0 0 .328.062.103.319l-1.228.511c-.798.338-.798.143-.798.994l-.007 7.902c0 6.178-6.47 6.039-7.73 6.039-.6 0-6.488 0-6.488-4.961V2.834c0-1.46.159-1.419-.338-1.591L.071.695S-.183.347.269.368c1.227.06 3.004.316 7.133.024 0 0 .362.085.125.342l-1.201.339c-.95.414-.825.098-.849 1.045l.028 8.248c0 2.021 1.07 4.524 4.395 4.524 4.585 0 4.627-3.854 4.627-4.71l.009-8.167c.049-.77-.052-.551-.752-.842M87.65 14.715l1.6-4.111.281.23c.982.781 2.316 1.443 3.574 1.471 1.127.023 1.676-.268 1.527-1.191-.113-.693-.916-.812-1.417-.91l-1.103-.213c-2.143-.39-3.941-1.673-3.941-4.104 0-3.677 3.262-5.737 6.544-5.737 1.726 0 3.306.424 4.786 1.36L98.11 5.156c-.762-.533-1.918-1.285-3.377-1.337-.482-.018-1.58.229-1.229 1.312.152.462.833.657 1.252.755l1.241.292c2.325.526 4.003 1.81 4.003 4.432 0 3.699-3.281 5.529-6.542 5.529-1.901 0-4.106-.527-5.808-1.424M80.979.403h5.492v15.504h-5.492zM74.684.402h5.72l-5.843 15.503h-4.644L64.09.402h5.704l2.442 9.354z"/></svg>') no-repeat;
      width: 7.7rem;
      background-size: 7.7rem;
    }

    #nav-bar .logo-container:hover .ucd-logo {
      background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="16.157"><path fill="%23022851" d="M58.865 4.877c.101.661 1.101 5.405 1.101 5.405h-2.194l1.093-5.405zm-8.328 11.03h5.806l.438-1.947h4.144l.554 1.947h5.806L61.846.403h-6.087l-5.222 15.504zM36.284.402h5.624c5.107 0 9.007 2.277 9.007 7.974 0 4.591-3.18 7.529-7.645 7.529l-6.986-.009V.402zm5.524 11.052h.376c1.843 0 3.207-1.072 3.207-3.096 0-2.179-1.21-3.395-3.234-3.395h-.349v6.491zM32.941.888l.296 2.545c.071.604.426 2.052-.011 1.858-.276-.121-.502-.776-.726-1.36-.114-.295-.658-1.695-.801-1.799-.685-.501-2.401-1.064-3.561-1.069-3.521-.013-5.847 2.509-5.847 6.982 0 3.208 1.582 7.061 5.607 7.061 1.441 0 4.201-.443 4.952-2.436.339-.9.65-1.703.876-1.459.166.177-.05.899-.15 1.289-.474 1.847-.501 2.406-.65 2.479-1.818.885-4.15 1.178-6.191 1.178-6.485 0-8.726-3.678-8.726-7.354 0-6.379 4.032-9.021 10.286-8.791 1.58.058 3.163.334 4.646.876M13.784 1.171L12.745.819c-.35-.306.075-.391.075-.391s1.5.271 5.24-.036c0 0 .328.062.103.319l-1.228.511c-.798.338-.798.143-.798.994l-.007 7.902c0 6.178-6.47 6.039-7.73 6.039-.6 0-6.488 0-6.488-4.961V2.834c0-1.46.159-1.419-.338-1.591L.071.695S-.183.347.269.368c1.227.06 3.004.316 7.133.024 0 0 .362.085.125.342l-1.201.339c-.95.414-.825.098-.849 1.045l.028 8.248c0 2.021 1.07 4.524 4.395 4.524 4.585 0 4.627-3.854 4.627-4.71l.009-8.167c.049-.77-.052-.551-.752-.842M87.65 14.715l1.6-4.111.281.23c.982.781 2.316 1.443 3.574 1.471 1.127.023 1.676-.268 1.527-1.191-.113-.693-.916-.812-1.417-.91l-1.103-.213c-2.143-.39-3.941-1.673-3.941-4.104 0-3.677 3.262-5.737 6.544-5.737 1.726 0 3.306.424 4.786 1.36L98.11 5.156c-.762-.533-1.918-1.285-3.377-1.337-.482-.018-1.58.229-1.229 1.312.152.462.833.657 1.252.755l1.241.292c2.325.526 4.003 1.81 4.003 4.432 0 3.699-3.281 5.529-6.542 5.529-1.901 0-4.106-.527-5.808-1.424M80.979.403h5.492v15.504h-5.492zM74.684.402h5.72l-5.843 15.503h-4.644L64.09.402h5.704l2.442 9.354z"/></svg>') no-repeat;
      width: 7.7rem;
      background-size: 7.7rem;
    }

    .logo-container {
      display: flex;
      
    }

    .website-link-container {
      padding-left: 0.5rem;
      background-color: #13639E;
      clip-path: polygon(1rem 0px, 110% 0px, 110% 104%, 0% 104%);
    }

    .website-link-container::before {      
      margin-left: 0.5rem;
      content: "";
    }

    .logo-link::before {
      width: 1rem;
      color: white;
    }

    .website-link-container:hover {
      background-color: #FFBF00;
    }

    .logo-border {
      background-color: #14447A;
      width: 1rem;
      transform: skewX(-16deg);
      position: relative;
      left: 0.55rem;
    }

    .logo-link img {
      fill: #FFFFFF;
    }
    .logo-container:hover img {
      fill: #022851;
    }

    .site-name-container {
      margin: auto 0;
    }

    .site-branding__site-name a,
    .site-branding__site-name a:hover {
      color: #FFBF00;
      text-decoration: none;
    }

    .site-branding__site-name a {
      font-size: 1.5rem;
      padding: 1rem;
    }

  `;return[l.Z,c.Z,d.Z,h.Z,p.Z,u.Z,m.Z,e]}()}constructor(){super(),this.render=g.bind(this),this.mutationObserver=new f.F(this),this.wait=new y.H(this),new v.w(this,"_onLocationChange"),this.siteName="",this.opened=!1,this.silenceWarnings=!1,this.mobileWidth=755,this.isDemo=!1,this._transitioning=!1,this._hasPrimaryNav=!1,this._hasQuickLinks=!1,this._hasSearch=!1,this._animationDuration=500,this._slottedComponents={}}_onLocationChange(){this.close(),this._hasQuickLinks&&this._slottedComponents.quickLinks.close()}async open(){return!this._transitioning&&!this.opened&&(this.opened=!0,this._transitioning=!0,await this.wait.wait(this._animationDuration),this._transitioning=!1,!0)}async close(){return!(this._transitioning||!this.opened||(this.opened=!1,this._transitioning=!0,await this.wait.wait(this._animationDuration),this._transitioning=!1,0))}async _onBtnClick(){let e;e=this.opened?await this.close():await this.open(),e&&this.dispatchEvent(new CustomEvent("toggle",{detail:{open:this.opened}}))}_getNavbarClasses(){let e={"l-navbar":!0,header__navbar:!0};return this.opened?e["menu--open"]=!0:(this._transitioning||(e["menu--hidden"]=!0),e["menu--closed"]=!0),e}_getHeaderClasses(){let e={"l-header":!0,header:!0};return e["fixed-mobile"]=!this.preventFixed,e["fixed-desktop"]=!this.preventFixed,e}_ucdLogo(e="blue"){return encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="16.157"><path fill="${{blue:"#022851",gold:"#FFBF00",white:"#FFFFFF"}[e]}" d="M58.865 4.877c.101.661 1.101 5.405 1.101 5.405h-2.194l1.093-5.405zm-8.328 11.03h5.806l.438-1.947h4.144l.554 1.947h5.806L61.846.403h-6.087l-5.222 15.504zM36.284.402h5.624c5.107 0 9.007 2.277 9.007 7.974 0 4.591-3.18 7.529-7.645 7.529l-6.986-.009V.402zm5.524 11.052h.376c1.843 0 3.207-1.072 3.207-3.096 0-2.179-1.21-3.395-3.234-3.395h-.349v6.491zM32.941.888l.296 2.545c.071.604.426 2.052-.011 1.858-.276-.121-.502-.776-.726-1.36-.114-.295-.658-1.695-.801-1.799-.685-.501-2.401-1.064-3.561-1.069-3.521-.013-5.847 2.509-5.847 6.982 0 3.208 1.582 7.061 5.607 7.061 1.441 0 4.201-.443 4.952-2.436.339-.9.65-1.703.876-1.459.166.177-.05.899-.15 1.289-.474 1.847-.501 2.406-.65 2.479-1.818.885-4.15 1.178-6.191 1.178-6.485 0-8.726-3.678-8.726-7.354 0-6.379 4.032-9.021 10.286-8.791 1.58.058 3.163.334 4.646.876M13.784 1.171L12.745.819c-.35-.306.075-.391.075-.391s1.5.271 5.24-.036c0 0 .328.062.103.319l-1.228.511c-.798.338-.798.143-.798.994l-.007 7.902c0 6.178-6.47 6.039-7.73 6.039-.6 0-6.488 0-6.488-4.961V2.834c0-1.46.159-1.419-.338-1.591L.071.695S-.183.347.269.368c1.227.06 3.004.316 7.133.024 0 0 .362.085.125.342l-1.201.339c-.95.414-.825.098-.849 1.045l.028 8.248c0 2.021 1.07 4.524 4.395 4.524 4.585 0 4.627-3.854 4.627-4.71l.009-8.167c.049-.77-.052-.551-.752-.842M87.65 14.715l1.6-4.111.281.23c.982.781 2.316 1.443 3.574 1.471 1.127.023 1.676-.268 1.527-1.191-.113-.693-.916-.812-1.417-.91l-1.103-.213c-2.143-.39-3.941-1.673-3.941-4.104 0-3.677 3.262-5.737 6.544-5.737 1.726 0 3.306.424 4.786 1.36L98.11 5.156c-.762-.533-1.918-1.285-3.377-1.337-.482-.018-1.58.229-1.229 1.312.152.462.833.657 1.252.755l1.241.292c2.325.526 4.003 1.81 4.003 4.432 0 3.699-3.281 5.529-6.542 5.529-1.901 0-4.106-.527-5.808-1.424M80.979.403h5.492v15.504h-5.492zM74.684.402h5.72l-5.843 15.503h-4.644L64.09.402h5.704l2.442 9.354z"/></svg>`)}_onChildListMutation(){let e=this.querySelector("ucdlib-primary-nav");e?(e.setAttribute("slot","primary-nav"),this._hasPrimaryNav=!0,this._slottedComponents.primaryNav=e):(this.silenceWarnings||console.warn("No 'ucdlib-primary-nav' child element found!"),this._hasPrimaryNav=!1);let t=this.querySelector("ucd-theme-search-popup");t?(t.setAttribute("slot","search"),this._hasSearch=!0,this._slottedComponents.search=t):this._hasSearch=!1}}customElements.define("ucdlib-header",b);var _=i(4676),w=i(3205),x=i(2250),A=i(1644),S=i(613);function E(){return r.dy`
<style>
  ul.menu ul.menu {
    transition: opacity ${this.animationDuration+"ms"}, height ${this.animationDuration+"ms"};
  }
  ul.menu li.sf--hover > ul.menu {
    transition: opacity ${this.animationDuration+"ms"} ${this.hoverDelay+"ms"}, height ${this.animationDuration+"ms"};
  }


  @media (max-width: ${this.mobileWidth-1}px) {
    .primary-nav li.alt-size li a, li.alt-size li .primary-nav__nolink {
      display: flex;
      align-items: center;
    }
    .primary-nav li.alt-size li a:before, li.alt-size li .primary-nav__nolink:before {
      margin-right: 0.5rem;
      font-family: "Font Awesome 5 Free";
      font-weight: 900;
    }
    .primary-nav li.alt-size li a:before, li.alt-size li .primary-nav__nolink:before {
      color: #ffbf00;
      content: "";
      font-size: 1.25em;
    }
    .primary-nav li.alt-size li a:focus:before, .primary-nav li.alt-size li a:hover:before, li.alt-size li .primary-nav__nolink:focus:before, li.alt-size li .primary-nav__nolink:hover:before {
      color: #022851;
    }
  }
  
  @media (min-width: ${this.mobileWidth}px) {
    .primary-nav {
      background-color: transparent !important;
      font-size: 0.85rem !important;
    }
    .primary-nav ul ul {
      display: none !important;
    }
    .primary-nav li {
      float: left !important;
    }
    .primary-nav li:hover ul {
      background-color: #fffbed !important;
    }
    .primary-nav li li {
      float: none !important;
    }
    .primary-nav li:hover > .primary-nav__top-link a, .primary-nav li:focus-within > .primary-nav__top-link a, .primary-nav li:hover > .primary-nav__top-link .primary-nav__nolink {
      color: #022851 !important;
    }
    .primary-nav .submenu-toggle {
      display: none !important;
    }

    .primary-nav a, .primary-nav__nolink {
      margin-left: 1rem !important;
      padding: 0 !important;
      border-bottom: 0 !important;
      background-color: transparent !important;
      line-height: 3.25rem !important;
    }
    .primary-nav a:before, .primary-nav__nolink:before {
      width: 1rem !important;
      height: 3.25rem !important;
      margin-right: 0.5rem !important;
      margin-left: -1rem !important;
      background-color: transparent !important;
      clip-path: polygon(93% 0, 110% 0, 110% 102%, 0% 102%) !important;
      content: "" !important;
    }
    .primary-nav a:focus:before, .primary-nav a:hover:before, .primary-nav__nolink:focus:before, .primary-nav__nolink:hover:before {
      background-color: #ffbf00 !important;
    }
    .primary-nav a:after, .primary-nav__nolink:after {
      z-index: 1 !important;
      width: 1rem !important;
      height: 3.25rem !important;
      margin-right: -1rem !important;
      margin-left: 0.5rem !important;
      background-color: transparent !important;
      clip-path: polygon(-2px -2px, 100% -2px, 7% 102%, -2px 100%) !important;
      content: "" !important;
    }
    .primary-nav a:focus {
      background-color: #ffbf00 !important;
      color: rgb(2, 40, 81) !important;
    }
    .primary-nav a:focus:after, .primary-nav a:hover:after, .primary-nav__nolink:focus:after, .primary-nav__nolink:hover:after {
      background-color: #ffbf00 !important;
    }

    .primary-nav__top-link a, .primary-nav__top-link .primary-nav__nolink {
      color: #fff !important;
      white-space: nowrap !important;
    }
    .primary-nav__top-link a:hover, .primary-nav__top-link .primary-nav__nolink:hover {
      color: #022851 !important;
    }

    .primary-nav li li a, li li .primary-nav__nolink {
      margin-left: 0 !important;
      padding: 0.5rem 1rem !important;
      font-size: 0.9375em !important;
      line-height: 1.35 !important;
    }
    .primary-nav li li a:focus, li li .primary-nav__nolink:focus {
      background-color: #ffbf00 !important;
    }
    .primary-nav li li a:before, .primary-nav li li a:after, li li .primary-nav__nolink:before, li li .primary-nav__nolink:after {
      display: none !important;
    }

    .primary-nav--justify > .menu {
      display: flex !important;
      flex-wrap: wrap !important;
      justify-content: flex-start !important;
    }
    .primary-nav--justify li {
      float: none !important;
      flex-basis: 0 !important;
      flex-grow: 1 !important;
      width: auto !important;
    }
    .primary-nav--justify li:last-child .primary-nav__top-link a, .primary-nav--justify li:last-child .primary-nav__top-link .primary-nav__nolink {
      margin-right: 1rem !important;
    }
    .primary-nav--justify a:after,
    .primary-nav--justify .primary-nav__nolink:after {
      margin-left: auto !important;
    }

    .primary-nav--mega {
      overflow: hidden !important;
      max-height: 3.25rem !important;
      margin-right: -1rem !important;
      transition: max-height 0.3s !important;
    }
    .primary-nav--mega.is-hover {
      max-height: 600px !important;
    }
    .primary-nav--mega a:after,
    .primary-nav--mega .primary-nav__nolink:after {
      margin-left: auto !important;
    }
    .primary-nav--mega > .menu {
      display: flex !important;
      flex-wrap: wrap !important;
    }
    .primary-nav--mega li {
      float: none !important;
      width: auto !important;
      min-width: 9em !important;
    }
    .primary-nav--mega li li a,
    .primary-nav--mega li li .primary-nav__nolink {
      background: none !important;
    }
    .primary-nav--mega li:hover .primary-nav__top-link a,
    .primary-nav--mega li:hover .primary-nav__top-link .primary-nav__nolink {
      background-color: #ffdf80 !important;
    }
    .primary-nav--mega li:hover .primary-nav__top-link a:before, .primary-nav--mega li:hover .primary-nav__top-link a:after,
    .primary-nav--mega li:hover .primary-nav__top-link .primary-nav__nolink:before,
    .primary-nav--mega li:hover .primary-nav__top-link .primary-nav__nolink:after {
      background-color: #ffdf80 !important;
    }
    .primary-nav--mega li .primary-nav__top-link a:hover {
      background-color: #ffbf00 !important;
    }
    .primary-nav--mega li .primary-nav__top-link a:hover:before, .primary-nav--mega li .primary-nav__top-link a:hover:after {
      background-color: #ffbf00 !important;
    }
    .primary-nav--mega .primary-nav__top-link {
      background-color: #022851 !important;
    }

    .primary-nav--superfish {
      box-shadow: inset 0 -1px 0 #14447a !important;
    }
    .primary-nav--superfish li {
      position: relative !important;
    }
    .primary-nav--superfish ul ul {
      position: absolute !important;
      z-index: 840 !important;
      top: 100% !important;
      left: 0 !important;
      display: none !important;
      min-width: 12em !important;
      background-color: #fff !important;
    }
    .primary-nav--superfish ul ul ul {
      top: 0 !important;
      left: 100% !important;
    }
    .primary-nav--superfish li li a,
    .primary-nav--superfish li li .primary-nav__nolink {
      background-color: #fffbed !important;
    }
    .primary-nav--superfish li li li a,
    .primary-nav--superfish li li li .primary-nav__nolink {
      background-color: #fffbed !important;
    }
    .primary-nav--superfish li li li li a,
    .primary-nav--superfish li li li li .primary-nav__nolink {
      background-color: #fff9e6 !important;
    }
    .primary-nav--superfish .primary-nav__submenu-indicator {
      display: flex !important;
      align-items: center !important;
      width: 1rem !important;
      height: auto !important;
      margin-right: -0.5rem !important;
      margin-left: auto !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      background-color: transparent !important;
    }
    .primary-nav--superfish .primary-nav__submenu-indicator:after {
      margin-left: 0.5rem !important;
      font-family: "Font Awesome 5 Free" !important;
      font-weight: 900 !important;
    }
    .primary-nav--superfish .primary-nav__submenu-indicator:focus {
      box-shadow: none !important;
    }
    .primary-nav--superfish .primary-nav__submenu-indicator:after {
      color: #ffbf00 !important;
      content: "" !important;
      font-size: 0.75em !important;
    }
    .primary-nav--superfish li li .primary-nav__submenu-indicator:after {
      color: #022851 !important;
    }
    .primary-nav--superfish li li li .primary-nav__submenu-indicator {
      display: none !important;
    }
    .primary-nav--superfish li:hover > ul,
    .primary-nav--superfish .sf--hover > ul {
      display: block !important;
    }
    .primary-nav--superfish li:hover > .primary-nav__top-link a,
    .primary-nav--superfish li:hover > .primary-nav__top-link .primary-nav__nolink,
    .primary-nav--superfish .sf--hover > .primary-nav__top-link a,
    .primary-nav--superfish .sf--hover > .primary-nav__top-link .primary-nav__nolink {
      background-color: #ffbf00 !important;
    }
    .primary-nav--superfish li:hover > .primary-nav__top-link a:before, .primary-nav--superfish li:hover > .primary-nav__top-link a:after,
    .primary-nav--superfish li:hover > .primary-nav__top-link .primary-nav__nolink:before,
    .primary-nav--superfish li:hover > .primary-nav__top-link .primary-nav__nolink:after,
    .primary-nav--superfish .sf--hover > .primary-nav__top-link a:before,
    .primary-nav--superfish .sf--hover > .primary-nav__top-link a:after,
    .primary-nav--superfish .sf--hover > .primary-nav__top-link .primary-nav__nolink:before,
    .primary-nav--superfish .sf--hover > .primary-nav__top-link .primary-nav__nolink:after {
      background-color: #ffbf00 !important;
    }
    .primary-nav--superfish li:hover > .primary-nav__top-link a .primary-nav__submenu-indicator:after,
    .primary-nav--superfish li:hover > .primary-nav__top-link .primary-nav__nolink .primary-nav__submenu-indicator:after,
    .primary-nav--superfish .sf--hover > .primary-nav__top-link a .primary-nav__submenu-indicator:after,
    .primary-nav--superfish .sf--hover > .primary-nav__top-link .primary-nav__nolink .primary-nav__submenu-indicator:after {
      color: #022851 !important;
    }
    .primary-nav--superfish li:hover > .primary-nav__top-link a,
    .primary-nav--superfish .sf--hover > .primary-nav__top-link a,
    .primary-nav--superfish li:hover > .primary-nav__top-link .primary-nav__nolink {
      color: #022851 !important;
    }
  }

  @media (max-width: ${this.mobileWidth-1}px) {
    .desktop-only {
      display: none !important;
    }
  }
  @media (min-width: ${this.mobileWidth}px) {
    .mobile-only {
      display: none !important;
    }
  }

  .primary-nav a:hover, .primary-nav__nolink:hover {
    background-color: #ffbf00 !important;
  }

</style>
<nav 
  id=${this._classPrefix}
  class="${this._getNavClasses()}" 
  @mouseenter=${this._onNavMouseenter}
  @mouseleave=${this._onNavMouseleave}
  @focusout=${this._onNavFocusout}
  @focusin=${this._onNavFocusin}
  aria-label="Main Menu">
  <ul class="menu">
    ${this.navItems.map(((e,t)=>this._renderNavItem(e,[t])))}
  </ul>
</nav>
`}var C=i(8279),k=i(7515),L=i(8077),I=i(8405),M=i(1914);class O extends((0,L.Z)(r.oi).with(I.V)){static get properties(){return{navType:{type:String,attribute:"nav-type"},styleModifiers:{type:String,attribute:"style-modifiers"},hoverDelay:{type:Number,attribute:"hover-delay"},animationDuration:{type:Number,attribute:"animation-duration"},navItems:{type:Array},maxDepth:{type:Number,attribute:"max-depth"},mobileWidth:{type:Number,attribute:"mobile-width"},mobileOnly:{type:Boolean,attribute:"mobile-only"},desktopOnly:{type:Boolean,attribute:"desktop-only"},_megaIsOpen:{type:Boolean,state:!0}}}static get styles(){return function(){const e=r.iv`
    :host {
      display: block;
    }
    .submenu-toggle * {
      pointer-events: none;
    }
    button[disabled] {
      pointer-events: none;
    }
    @media (min-width: 992px) {
      nav.primary-nav--mega li.depth-0 > ul.menu {
        opacity: 1;
        display: block;
      }

      ul.menu ul.menu {
        opacity: 0;
        display: none;
      }
      ul.menu li.sf--hover > ul.menu {
        display: block;
        opacity: 1;
      }
      ul.menu li.closing > ul.menu {
        display: block;
        opacity: 0;
      }
      .mega-focus .primary-nav__top-link a, 
      .mega-focus .primary-nav__top-link a::before, .mega-focus 
      .primary-nav__top-link a::after {
        background-color: rgb(255, 223, 128);
      }
      .mega-focus .primary-nav__top-link a:focus, 
      .mega-focus .primary-nav__top-link a:focus::before, 
      .mega-focus .primary-nav__top-link a:focus::after {
        background-color: rgb(255, 191, 0);
      }
      .mega-focus > ul {
        background-color: rgb(255, 251, 237);
      }

    }

    @media (max-width: 991px) {
      ul.menu ul.menu {
        display: none;
        overflow-y: hidden;
        visibility: visible;
        height: auto;
        border-top-width: 0px;
        border-bottom-width: 0px;
        padding-top: 0px;
        padding-bottom: 0px;
      }

      ul.menu ul.menu.menu--open {
        display: block;
      }

    }
  `;return[_.Z,w.Z,x.Z,A.Z,S.Z,e]}()}constructor(){super(),this.render=E.bind(this),this.mutationObserver=new f.F(this,{subtree:!0,childList:!0}),this.breakPoints=new M.P(this,755),this.navType="superfish",this.styleModifiers="",this.hoverDelay=300,this.animationDuration=300,this.mobileWidth=755,this.mobileOnly=!1,this.desktopOnly=!1,this._classPrefix="primary-nav",this._acceptedNavTypes=["superfish","mega"],this._megaIsOpen=!1}openMegaNav(){this._megaIsOpen=!0}closeMegaNav(){this._megaIsOpen=!1}async openSubNav(e){if("object"!=typeof e||!Array.isArray(e)||0===e.length)return;let t=this.getNavItem(e);if(t)if(this.breakPoints.isMobile()){let i=this.renderRoot.getElementById(`nav--${e.join("-")}`);if(!i)return;let r=i.querySelector("ul");if(!r)return;if(t.isTransitioning)return;t.isTransitioning=!0,t.inlineStyles.display="block",t.inlineStyles.height="0px",this.requestUpdate(),await this.updateComplete;const o=r.scrollHeight+"px";t.inlineStyles.height=o,this.requestUpdate(),await this.updateComplete,this._completeMobileTransition(t)}else{if(this.isMegaMenu())return;if(this.clearItemInlineStyles(t),t.isClosing&&(t.isClosing=!1,this.requestUpdate()),t.timeout&&clearTimeout(t.timeout),t.isOpen)return;t.timeout=setTimeout((()=>{t.isOpen=!0,this.requestUpdate()}),this.hoverDelay)}}async closeSubNav(e){if("object"!=typeof e||!Array.isArray(e)||0===e.length)return;let t=this.getNavItem(e);if(t)if(this.breakPoints.isMobile()){let i=this.renderRoot.getElementById(`nav--${e.join("-")}`);if(!i)return;let r=i.querySelector("ul");if(!r)return;if(t.isTransitioning)return;t.isTransitioning=!0,t.inlineStyles.height=r.scrollHeight+"px",t.inlineStyles.display="block",this.requestUpdate(),await this.updateComplete,requestAnimationFrame((()=>{requestAnimationFrame((()=>{t.inlineStyles.height="0px",this.requestUpdate(),requestAnimationFrame((()=>{this._completeMobileTransition(t)}))}))}))}else{if(this.isMegaMenu())return;if(this.clearItemInlineStyles(t),t.timeout&&clearTimeout(t.timeout),!t.isOpen)return;t.isClosing=!0,this.requestUpdate(),t.timeout=setTimeout((()=>{t.isOpen=!1,t.isClosing=!1,this.requestUpdate()}),this.hoverDelay+this.animationDuration)}}closeAllSubNavs(e,t=!0){e||(e=this.navItems),e.forEach((e=>{e.isOpen&&(e.isOpen=!1,t&&this.requestUpdate()),e.subItems&&this.closeAllSubNavs(e.subItems)}))}isMegaMenu(){return"mega"===this.navType.toLowerCase().trim()}_getNavClasses(){let e=this._acceptedNavTypes[0];this._acceptedNavTypes.includes(this.navType.toLowerCase())&&(e=this.navType);let t="";this.styleModifiers&&(t=this.styleModifiers.split(" ").map((e=>`${this._classPrefix}--${e}`)).join(" "));let i=this.isMegaMenu()&&this._megaIsOpen?"is-hover":"";return`${this._classPrefix} ${this._classPrefix}--${e} ${t} ${i}`}_onChildListMutation(){let e=this.parseNavChildren();e.length&&(this.navItems=e)}_renderNavItem(e,t){const i=t.length-1;return this.itemHasSubNav(e)&&i<this.maxDepth?r.dy`
      <li 
        id="nav--${t.join("-")}"
        .key=${t}
        .hasnav=${!0}
        @mouseenter=${this._onItemMouseenter} 
        @mouseleave=${this._onItemMouseleave}
        class=${(0,s.$)(this._makeLiClassMap(e,i))}>
        <div class="submenu-toggle__wrapper ${0===i?`${this._classPrefix}__top-link`:""}">
          <a 
            href=${(0,k.o)(e.href?e.href:null)}
            tabindex=${this._setTabIndex(i)}
            @focus=${this._onItemFocus}>
            ${e.linkText}<span class="${this._classPrefix}__submenu-indicator"></span>
          </a>
          <button 
          @click=${()=>this._toggleMobileMenu(t)}
          class="submenu-toggle ${e.isOpen?"submenu-toggle--open":""}" 
          ?disabled=${e.isTransitioning}
          aria-label="Toggle Submenu">
          <span class="submenu-toggle__icon"></span>
        </button>
        </div>
        <ul class="menu ${e.isOpen?"menu--open":""}" style=${(0,C.V)(this._getItemMobileStyles(t))}>
          ${e.subItems.map(((e,i)=>this._renderNavItem(e,t.concat([i]))))}
        </ul>
      </li>
    `:r.dy`
      <li id="nav--${t.join("-")}" .key=${t} class=${(0,s.$)(this._makeLiClassMap(e,i))}>
        <div class="${0===i?`${this._classPrefix}__top-link`:""}">
          ${e.href?r.dy`
            <a 
              href=${e.href} 
              @focus=${this._onItemFocus}
              tabindex=${this._setTabIndex(i)}>
              ${e.linkText}</a>
          `:r.dy`
            <span class="${this._classPrefix}__nolink">${e.linkText}</span>
          `}
        </div>
      </li>
    `}_setTabIndex(e=0){let t=0;return this.isMegaMenu()&&e>0&&!this._megaIsOpen&&this.breakPoints.isDesktop()&&(t=-1),t}_makeLiClassMap(e,t=0){let i={};return i[`depth-${t}`]=!0,e.isOpen&&(i["sf--hover"]=!0),e.isClosing&&(i.closing=!0),e.megaFocus&&(i["mega-focus"]=!0),e.mobileOnly&&(i["mobile-only"]=!0),e.desktopOnly&&(i["desktop-only"]=!0),i}async _toggleMobileMenu(e){this.breakPoints.isDesktop()||(this.getNavItem(e).isOpen?this.closeSubNav(e):this.openSubNav(e))}_onNavMouseenter(){!this.breakPoints.isMobile()&&this.isMegaMenu()&&(this._megaTimeout&&clearTimeout(this._megaTimeout),this._megaTimeout=setTimeout((()=>{this.openMegaNav()}),this.hoverDelay))}_onNavMouseleave(){!this.breakPoints.isMobile()&&this.isMegaMenu()&&(this._megaTimeout&&clearTimeout(this._megaTimeout),this._megaTimeout=setTimeout((()=>{this.closeMegaNav()}),this.hoverDelay))}_onNavFocusin(){!this.breakPoints.isMobile()&&this.isMegaMenu()&&(this._megaIsOpen||(this._megaTimeout&&clearTimeout(this._megaTimeout),this._megaTimeout=setTimeout((()=>{this.openMegaNav()}),this.hoverDelay)))}_onItemMouseenter(e){this.breakPoints.isMobile()||this.openSubNav(e.target.key)}_onItemFocus(e){if(this.breakPoints.isMobile())return;const t=e.target.parentElement.parentElement;t.hasnav&&this.openSubNav(t.key),this.isMegaMenu()&&this._megaIsOpen&&this._setMegaFocus(t.key)}_setMegaFocus(e){this.navItems.forEach((e=>e.megaFocus=!1)),"object"!=typeof e||!Array.isArray(e)||e.length<1||(this.getNavItem([e[0]]).megaFocus=!0,this.requestUpdate())}_completeMobileTransition(e){e.timeout=setTimeout((()=>{e.inlineStyles={},e.isOpen=!e.isOpen,e.isTransitioning=!1,this.requestUpdate()}),this.animationDuration)}_onItemMouseleave(e){this.breakPoints.isMobile()||this.isMegaMenu()||this.closeSubNav(e.target.key)}_onNavFocusout(){this.breakPoints.isMobile()||(this.isMegaMenu()?(this._megaTimeout&&clearTimeout(this._megaTimeout),requestAnimationFrame((()=>{this.renderRoot.activeElement||(this._megaTimeout=setTimeout((()=>{this.navItems.forEach((e=>e.megaFocus=!1)),this.closeMegaNav()}),this.hoverDelay))}))):requestAnimationFrame((()=>{const e=this.renderRoot.activeElement;if(!e)return void this.closeAllSubNavs();let t=e;for(;t&&t.tagName!==this.tagName&&!Array.isArray(t.key);)t=t.parentElement;if(!t.key)return;let i=[...t.key],r=i.pop();(0==i.length?this.navItems:this.getNavItem(i).subItems).forEach(((e,t)=>{t!==r&&(e.isOpen=!1,this.closeAllSubNavs(e.subItems,!1))})),this.requestUpdate()})))}_getItemMobileStyles(e){if(this.breakPoints.isDesktop())return{};let t=this.getNavItem(e);return t.inlineStyles?t.inlineStyles:{}}}customElements.define("ucdlib-primary-nav",O);class P extends((0,o.Mixin)(r.oi).with(o.LitCorkUtils)){static get properties(){return{placeholder:{type:String},browse:{type:Object},background:{type:String},choices:{type:Array},currentPage:{type:String}}}constructor(){super(),this.render=a.bind(this),this.placeholder="",this.searchValue="",this.background="/images/home-gradient.png",this.choices=[],this.currentPage="",this._injectModel("AppStateModel"),window.addEventListener("click",(()=>this.hideDropdowns()))}async _onAppStateUpdate(e){if(e.location.fullpath!==this.currentPage){this.currentPage=e.location.fullpath;let t=this.shadowRoot.querySelector("ucdlib-header");t&&await t.close()}}_onBtnClick(e){let t=parseInt(e.currentTarget.getAttribute("index"));this.showBtnDropdownByIndex(t),e.stopPropagation(),e.preventDefault()}updated(e){window.innerWidth>767&&this.shadowRoot.querySelector("ucdlib-header")}_onBtnKeyDown(e){if(13===e.which){let t=parseInt(e.currentTarget.getAttribute("index"));this.showBtnDropdownByIndex(t)}}_onBtnMouseOver(e){let t=parseInt(e.currentTarget.getAttribute("index"));this.showBtnDropdownByIndex(t)}_onBtnMouseOut(){this.hideDropdowns()}_onBtnFocusOut(e){e.currentTarget.contains(e.relatedTarget)||this.hideDropdowns()}showBtnDropdownByIndex(e){this.choices[e].dropdown&&(this.choices.forEach(((t,i)=>t.dropdownVisible=i===e)),this.dropdownVisible=!0,this.requestUpdate())}hideDropdowns(){this.dropdownVisible&&(this.choices.forEach((e=>e.dropdownVisible=!1)),this.dropdownVisible=!1,this.requestUpdate())}}customElements.define("app-nav-bar",P)},2841:(e,t,i)=>{"use strict";var r=i(5589);function o(){return r.dy`
    <style include="shared-styles">
      :host {
        display: block;
      }
      .root {
        display: flex;
        align-items: center;
      }
      input {
        width: 100%;
        box-sizing: border-box;
        padding: 1rem;
        background: white;
        border: none;
        height: 61px;
        outline: none;
        font-size: 1rem;
        font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial,
          sans-serif;
        font-weight: 500;
      }
      input::placeholder {
        color: var(--color-aggie-blue-70);
      }

      button {
        background: var(--color-aggie-gold);
        height: 61px;
        width: 61px;
        border: none;
        margin: 0;
        padding: 0 10px;
        border-radius: 0;
        cursor: pointer;
      }

      button:hover > ::slotted(*) {
        fill: var(--color-aggie-gold);
      }

      .search-container {
        width: 25rem;
      }

      ucdlib-icon {
        width: 70%;
        height: 70%;
        margin: auto;
      }

      #input {
        border-radius: unset;
      }
    </style>
    <div class="root search-bar">
      <div class="search-container" style="flex:1">
        <input
          id="input"
          type="text"
          @keyup="${this._onKeyUp}"
          placeholder="${this.placeholder}"
          @change="${this._handleChange}"
        />
      </div>
      <button @click="${this._fireSearch}" class="search-button">
        <ucdlib-icon icon="ucdlib-dams:fa-search"></ucdlib-icon>
      </button>
    </div>
  `}i(1807),i(4827);class n extends r.oi{static get properties(){return{placeholder:{type:String,value:""},browse:{type:Object,observer:"_onBrowseOptionsChange",value:()=>({})}}}constructor(){super(),this.render=o.bind(this),this.placeholder="",this.searchValue=""}get value(){return this.$.input.value}set value(e){this.$.input.value=e}_handleChange(e){this.searchValue=e.target.value}_fireSearch(){this.dispatchEvent(new CustomEvent("search",{detail:this.searchValue,bubbles:!0,composed:!0}))}_onKeyUp(e){13===e.which&&(this._handleChange(e),this._fireSearch())}_onBrowseOptionsChange(){this.$.select.innerHTML="";var e=document.createElement("option");e.value="Browse",e.textContent="Browse",e.setAttribute("selected","selected"),this.$.select.appendChild(e),(e=document.createElement("option")).value="",e.textContent="All Items",this.$.select.appendChild(e);for(let t in this.browse)(e=document.createElement("option")).textContent=this.browse[t],e.value=t,this.$.select.appendChild(e)}}customElements.define("app-search-box",n)},7847:(e,t,i)=>{"use strict";i.d(t,{F:()=>m});var r=i(3396),o=i.n(r),n=i(6665),a=i.n(n),s=i(2291),l=i.n(s),c=i(962),d=i.n(c);let h=document.createElement("style");h.id="foobar",h.innerHTML=a()+o()+l(),document.head.appendChild(h);let p=document.createElement("template");p.innerHTML=`<style>${a()+d()}</style>`;let u=document.createElement("dom-module");u.id="shared-styles",u.appendChild(p),document.head.appendChild(u);const m=`${a()+d()}`},4827:(e,t,i)=>{"use strict";var r=i(5589),o=i(9063);const n=r.dy`
  <svg>
    <defs>
      <g id="photo-stack">
        <path
          id="photo-film-solid"
          d="M9.36,2.82h11.25c1.24,0,2.25,1.01,2.25,2.25v7.88c0,1.24-1.01,2.25-2.25,2.25H9.36c-1.24,0-2.25-1.01-2.25-2.25V5.08c0-1.24,1.01-2.25,2.25-2.25Zm7.74,3.75c-.26-.39-.78-.49-1.17-.23-.09,.06-.17,.14-.23,.23l-1.97,2.95-.61-.76c-.29-.36-.82-.42-1.18-.13-.05,.04-.09,.08-.13,.13l-2.25,2.81c-.29,.36-.23,.9,.13,1.19,.15,.12,.34,.19,.53,.19h9.57c.47,0,.84-.38,.85-.84,0-.17-.05-.33-.14-.47l-3.38-5.06Zm-4.92-.38c0-.62-.5-1.13-1.13-1.13s-1.13,.5-1.13,1.13,.5,1.13,1.13,1.13,1.13-.5,1.13-1.13Z"
        />
        <path
          d="M19.36,16.34H8.1c-1.24,0-2.25-1.01-2.25-2.25V6.21c0-.12,.02-.24,.04-.35-1,.23-1.76,1.12-1.76,2.19v7.88c0,1.24,1.01,2.25,2.25,2.25h11.25c1.12,0,2.04-.82,2.21-1.9-.16,.04-.32,.06-.49,.06Z"
        />
        <path
          d="M16.36,19.34H5.1c-1.24,0-2.25-1.01-2.25-2.25v-7.88c0-.12,.02-.24,.04-.35-1,.23-1.76,1.12-1.76,2.19v7.88c0,1.24,1.01,2.25,2.25,2.25H14.64c1.12,0,2.04-.82,2.21-1.9-.16,.04-.32,.06-.49,.06Z"
        />
      </g>
      <g id="item-stack-blank" viewBox="0 0 24 24">
        <path
          id="photo-film-solid"
          d="M16.89,5.08v7.88c0,1.24-1.01,2.25-2.25,2.25H3.38c-1.24,0-2.25-1.01-2.25-2.25V5.08c0-1.24,1.01-2.25,2.25-2.25H14.64c1.24,0,2.25,1.01,2.25,2.25Z"
          fill="#fff"
        />
        <path
          d="M4.64,16.34H15.9c1.24,0,2.25-1.01,2.25-2.25V6.21c0-.12-.02-.24-.04-.35,1,.23,1.76,1.12,1.76,2.19v7.88c0,1.24-1.01,2.25-2.25,2.25H6.36c-1.12,0-2.04-.82-2.21-1.9,.16,.04,.32,.06,.49,.06Z"
          fill="#fff"
        />
        <path
          d="M7.64,19.34h11.25c1.24,0,2.25-1.01,2.25-2.25v-7.88c0-.12-.02-.24-.04-.35,1,.23,1.76,1.12,1.76,2.19v7.88c0,1.24-1.01,2.25-2.25,2.25H9.36c-1.12,0-2.04-.82-2.21-1.9,.16,.04,.32,.06,.49,.06Z"
          fill="#fff"
        />
      </g>
      <g id="result-display-grid" viewBox="0 0 24 24">
        <rect
          id="Rectangle_719"
          data-name="Rectangle 719"
          x="6"
          y="6"
          width="3"
          height="3"
        />
        <rect
          id="Rectangle_720"
          data-name="Rectangle 720"
          x="10.5"
          y="6"
          width="3"
          height="3"
        />
        <rect
          id="Rectangle_721"
          data-name="Rectangle 721"
          x="15"
          y="6"
          width="3"
          height="3"
        />
        <rect
          id="Rectangle_722"
          data-name="Rectangle 722"
          x="6"
          y="10.5"
          width="3"
          height="3"
        />
        <rect
          id="Rectangle_723"
          data-name="Rectangle 723"
          x="10.5"
          y="10.5"
          width="3"
          height="3"
        />
        <rect
          id="Rectangle_724"
          data-name="Rectangle 724"
          x="15"
          y="10.5"
          width="3"
          height="3"
        />
        <rect
          id="Rectangle_725"
          data-name="Rectangle 725"
          x="6"
          y="15"
          width="3"
          height="3"
        />
        <rect
          id="Rectangle_726"
          data-name="Rectangle 726"
          x="10.5"
          y="15"
          width="3"
          height="3"
        />
        <rect
          id="Rectangle_727"
          data-name="Rectangle 727"
          x="15"
          y="15"
          width="3"
          height="3"
        />
      </g>
      <g id="result-display-list" viewBox="0 0 24 24">
        <rect
          id="Rectangle_719"
          data-name="Rectangle 719"
          x="6"
          y="6"
          width="3"
          height="3"
        />
        <rect
          id="Rectangle_722"
          data-name="Rectangle 722"
          x="6"
          y="10.5"
          width="3"
          height="3"
        />
        <rect
          id="Rectangle_725"
          data-name="Rectangle 725"
          x="6"
          y="15"
          width="3"
          height="3"
        />
        <rect x="10.5" y="6" width="7.5" height="3" />
        <rect x="10.5" y="10.5" width="7.5" height="3" />
        <rect x="10.5" y="15" width="7.5" height="3" />
      </g>
      <g id="result-display-mosaic" viewBox="0 0 24 24">
        <rect x="15" y="6" width="3" height="7.5" />
        <rect
          id="Rectangle_720"
          data-name="Rectangle 720"
          x="10.5"
          y="6"
          width="3"
          height="3"
        />
        <rect
          id="Rectangle_725"
          data-name="Rectangle 725"
          x="6"
          y="15"
          width="3"
          height="3"
        />
        <rect x="10.5" y="10.5" width="3" height="7.5" />
        <rect
          id="Rectangle_727"
          data-name="Rectangle 727"
          x="15"
          y="15"
          width="3"
          height="3"
        />
        <rect x="6" y="6" width="3" height="7.5" />
      </g>
      <g id="dams-admin-collection-single" viewBox="0 0 224 112">
        <g id="Group_2692">
          <g id="Group_2621">
            <g id="Group_2619">
              <rect
                id="Rectangle_1805-5"
                x="116.91"
                y="73.15"
                width="39.29"
                height="1.96"
              />
              <rect
                id="Rectangle_1808-2"
                x="116.91"
                y="67.47"
                width="78.57"
                height="1.96"
              />
              <rect
                id="Rectangle_1807-2"
                x="116.91"
                y="61.8"
                width="62.86"
                height="1.96"
              />
              <rect
                id="Rectangle_1809-2"
                x="116.91"
                y="56.12"
                width="78.57"
                height="1.96"
              />
              <rect
                id="Rectangle_1806-2"
                x="116.91"
                y="50.58"
                width="73.66"
                height="1.96"
              />
              <rect
                id="Rectangle_1804-5"
                x="116.91"
                y="36.89"
                width="62.86"
                height="7.37"
              />
            </g>
            <rect
              id="Rectangle_1810"
              x="28.52"
              y="26.42"
              width="78.57"
              height="59.16"
            />
          </g>
        </g>
      </g>
      <g id="dams-admin-text" viewBox="0 0 224 112">
        <g id="Group_2694">
          <g id="Group_2641">
            <rect
              id="Rectangle_1805"
              x="86"
              y="78.11"
              width="50.64"
              height="2.53"
            />
            <rect
              id="Rectangle_1808"
              x="61.36"
              y="70.79"
              width="101.29"
              height="2.53"
            />
            <rect
              id="Rectangle_1807"
              x="71.44"
              y="63.47"
              width="81.03"
              height="2.53"
            />
            <rect
              id="Rectangle_1809"
              x="61.36"
              y="56.15"
              width="101.29"
              height="2.53"
            />
            <rect
              id="Rectangle_1806"
              x="63.6"
              y="49.01"
              width="94.96"
              height="2.53"
            />
            <rect
              id="Rectangle_1804"
              x="71.44"
              y="31.36"
              width="81.03"
              height="9.5"
            />
          </g>
        </g>
      </g>
      <g id="dams-admin-collection-cards" viewBox="0 0 224 112">
        <g id="Group_2693">
          <g id="Group_2640">
            <g id="Group_2615">
              <rect
                id="Rectangle_1805-2"
                x="147.04"
                y="78.4"
                width="24.48"
                height="2.24"
              />
              <rect
                id="Rectangle_1804-2"
                x="147.04"
                y="70.56"
                width="47.84"
                height="4.48"
              />
              <rect
                id="Rectangle_1803"
                x="147.04"
                y="31.36"
                width="47.84"
                height="35.84"
              />
            </g>
            <g id="Group_2614">
              <rect
                id="Rectangle_1805-3"
                x="88.08"
                y="78.4"
                width="23.36"
                height="2.24"
              />
              <rect
                id="Rectangle_1804-3"
                x="88.08"
                y="70.56"
                width="47.84"
                height="4.48"
              />
              <rect
                id="Rectangle_1803-2"
                x="88.08"
                y="31.36"
                width="47.84"
                height="35.84"
              />
            </g>
            <g id="Group_2613">
              <rect
                id="Rectangle_1805-4"
                x="29.12"
                y="78.4"
                width="23.36"
                height="2.24"
              />
              <rect
                id="Rectangle_1804-4"
                x="29.12"
                y="70.56"
                width="47.84"
                height="4.48"
              />
              <rect
                id="Rectangle_1803-3"
                x="29.12"
                y="31.36"
                width="47.84"
                height="35.84"
              />
            </g>
          </g>
        </g>
      </g>
      <g id="fa-box-archive" viewBox="0 0 512 512">
        <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M32 32H480c17.7 0 32 14.3 32 32V96c0 17.7-14.3 32-32 32H32C14.3 128 0 113.7 0 96V64C0 46.3 14.3 32 32 32zm0 128H480V416c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V160zm128 80c0 8.8 7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z"
        />
      </g>
      <g id="fa-wand-magic-sparkles" viewBox="0 0 576 512">
        <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"
        />
      </g>
      <g id="fa-photo-film" viewBox="0 0 640 512">
        <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M256 0H576c35.3 0 64 28.7 64 64V288c0 35.3-28.7 64-64 64H256c-35.3 0-64-28.7-64-64V64c0-35.3 28.7-64 64-64zM476 106.7C471.5 100 464 96 456 96s-15.5 4-20 10.7l-56 84L362.7 169c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h80 48H552c8.9 0 17-4.9 21.2-12.7s3.7-17.3-1.2-24.6l-96-144zM336 96c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM64 128h96V384v32c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V384H512v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64zm8 64c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16H88c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H72zm0 104c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16H88c8.8 0 16-7.2 16-16V312c0-8.8-7.2-16-16-16H72zm0 104c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16H88c8.8 0 16-7.2 16-16V416c0-8.8-7.2-16-16-16H72zm336 16v16c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V416c0-8.8-7.2-16-16-16H424c-8.8 0-16 7.2-16 16z"
        />
      </g>
      <g id="fa-star" viewBox="0 0 576 512">
        <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
        />
      </g>
      <g id="fa-search" viewBox="0 0 512 512">
        <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
        <path
          d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
        />
      </g>
      <g id="fa-chevron-left" viewBox="0 0 384 512">
        <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
        />
      </g>
      <g id="fa-chevron-right" viewBox="0 0 384 512">
        <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
        />
      </g>
      <g id="fa-share" viewBox="0 0 512 512">
        <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"
        />
      </g>
      <g id="fa-link" viewBox="0 0 640 512">
        <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"
        />
      </g>
      <g id="fa-facebook-f" viewBox="0 0 320 512">
        <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
        />
      </g>
      <g id="fa-twitter" viewBox="0 0 512 512">
        <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
        />
      </g>
      <g id="fa-pinterest-p" viewBox="0 0 384 512">
        <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"
        />
      </g>
      <g id="fa-magnifying-glass" viewBox="0 0 512 512">
        <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
        />
      </g>
      <g id="fa-minus" viewBox="0 0 448 512">
        <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
        />
      </g>
      <g id="fa-plus" viewBox="0 0 448 512">
        <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
        />
      </g>
      <g id="fa-times" height="1em" viewBox="0 0 352 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></g>
      <g id="fa-xmark" viewBox="0 0 320 512">
        <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
        />
      </g>
      <g id="fa-up-right-and-down-left-from-center" viewBox="0 0 512 512">
        <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M344 0H488c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87L327 41c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512H24c-13.3 0-24-10.7-24-24V344c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8z"
        />
      </g>
      <g id="fa-down-left-and-up-right-to-center" viewBox="0 0 512 512">
        <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M439 7c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H296c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39L439 7zM72 272H216c13.3 0 24 10.7 24 24V440c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39L73 505c-9.4 9.4-24.6 9.4-33.9 0L7 473c-9.4-9.4-9.4-24.6 0-33.9l87-87L55 313c-6.9-6.9-8.9-17.2-5.2-26.2s12.5-14.8 22.2-14.8z"
        />
      </g>
      <g id="fa-book-open" viewBox="0 0 576 512">
        <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z"
        />
      </g>
      <g id="fa-caret-right" viewBox="0 0 256 512">
        <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
        />
      </g>
      <g id="fa-caret-left" viewBox="0 0 256 512">
        <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
        />
      </g>
      <g id="fa-caret-down" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></g>
      <g id="page-single" viewBox="0 0 384 512">
        <path
          d="m320,0H64C28.7,0,0,28.7,0,64v384c0,35.3,28.7,64,64,64h256c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64Z"
        />
      </g>
      <g id="fa-pen" viewBox="0 0 512 512">
        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
        />
      </g>
      <g id="fa-floppy-disk" viewBox="0 0 448 512">
        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
        />
      </g>
      <g id="fa-trash" viewBox="0 0 448 512">
        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
        />
      </g>
      <g id="fa-arrow-down" viewBox="0 0 384 512">
        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
        />
      </g>
      <g id="fa-arrow-up" viewBox="0 0 384 512">
        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
        />
      </g>
      <g id="fa-play" viewBox="0 0 384 512">
        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
        />
      </g>
      <g id="fa-volume-high" viewBox="0 0 640 512">
        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"
        />
      </g>

      <g id="fa-check" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></g>
      <g id="fa-x-twitter" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></g>
    </defs>
  </svg>
`;(0,o.Q)(n,"ucdlib-dams",24)},6794:(e,t,i)=>{let r=i(9486),o=APP_CONFIG,n={};for(var a in r)n[a]=r[a].text;o.fcrepoBasePath="/fcrepo/rest",o.elasticSearch={facets:{"@graph.isPartOf.@id":{label:"Collection",type:"facet",valueMap:e=>APP_CONFIG.collectionLabels[e]?"Collection: "+APP_CONFIG.collectionLabels[e]:"Collection: "+e},"@graph.fileFormatSimple":{label:"File Format",type:"facet"},"@graph.creator.name":{label:"Creator",type:"facet",valueMap:e=>"Creator: "+e},"@graph.subjects.name":{label:"Subject",type:"facet",typeahead:"abouts",valueMap:e=>"Subject: "+e},"@graph.yearPublished":{label:"Published",type:"range"}},textFields:{record:["@graph.name","@graph.description","@graph.identifier","@graph.about","@graph.keywords","@graph.alternativeHeadline","@graph.indexableContent"],collection:["@graph.name","@graph.description","@graph.about","@graph.keywords"]},maxFacetCount:50},e.exports=o},4672:(e,t,i)=>{let{Registry:r}=i(2959);const o={AuthModel:i(689),AppStateModel:i(8145),RecordModel:i(5761),SearchVcModel:i(2103),CollectionModel:i(4218),MediaModel:i(7568),CitationModel:i(353),SeoModel:i(3194),FiltersModel:i(4268),FcAppConfigModel:i(917),BrowseByModel:i(2109)};"undefined"!=typeof window&&(window.damsClientModels=o,window.recordData=o.RecordModel.store.data.byId),r.ready(),e.exports=o},8145:(e,t,i)=>{const{AppStateModel:r}=i(2065),o=i(6470),n=i(6794),a=i(3569);e.exports=new class extends r{constructor(){super(),this.store=o,this.init(APP_CONFIG.appRoutes),this._sendGA()}set(e){if(e.location){e.lastLocation=a(this.store.data.location),this.store.data.showLightbox&&(e.showLightbox=!1);let t=e.location.path?e.location.path[0]:"home";t||(t="home"),e.location.page=t}return this._sendGA(),super.set(e)}_sendGA(){if(!window.gtag)return console.warn("No global gtag variable set for analytics events");this.lastGaLocation!==window.location.pathname&&(this.lastGaLocation=window.location.pathname,gtag("config",n.gaCode,{page_path:window.location.pathname}))}setSelectedRecord(e){this.store.setSelectedRecord(e)}getSelectedRecord(){return this.store.getSelectedRecord()}setSelectedCollection(e){this.store.setSelectedCollection(e)}getSelectedCollection(){return this.store.getSelectedCollection()}}},689:(e,t,i)=>{var{BaseModel:r}=i(2959),o=i(2977),n=i(5512);e.exports=new class extends r{constructor(){super(),this.store=o,this.service=n,this.register("AuthModel")}async getUser(){return await this.service.getUser()}login(){window.location="/auth/login"}logout(){window.location="/auth/logout"}}},2109:(e,t,i)=>{const{BaseModel:r}=i(2959),o=i(283),n=i(5647);e.exports=new class extends r{constructor(){super(),this.store=n,this.service=o,this.register("BrowseByModel")}async getFacets(e,t="facet"){let i=this.store.data.facets[e];try{i&&i.request?await i.request:await this.service.getFacets(e,t)}catch(e){console.error("Failed to load facets",e)}return this.store.data.facets[e]}}},353:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>r});const r=new class{constructor(){this.data={},this.engineList=["apa","mla","chicago"],this.engineListLabels=["APA","MLA","Chicago"]}retrieveLocale(){return this.locale}retrieveItem(e){return this.data[e]}async render(e,t){if(await this._loadEngines(),!this.engines[t])throw new Error("Invalid citation format: "+t);this.data[e.id]=e;let i=this.engines[t];return i.updateItems([e.id]),i.makeBibliography()[1].join("\n")}async _loadEngines(){if(!this.engines){if(!this.loadingEngines)return this.loadingEngines=new Promise((async(e,t)=>{const r=await Promise.all([i.e(749),i.e(6)]).then(i.t.bind(i,9749,23));this.locale=(await Promise.all([i.e(749),i.e(6)]).then(i.bind(i,9277))).default;const o=await Promise.all([i.e(749),i.e(6)]).then(i.bind(i,4579)),n=await Promise.all([i.e(749),i.e(6)]).then(i.bind(i,3986)),a=await Promise.all([i.e(749),i.e(6)]).then(i.bind(i,5462));this.engines={apa:new r.Engine(this,o.default),mla:new r.Engine(this,n.default),chicago:new r.Engine(this,a.default)},e()})),this.loadingEngines;await this.loadingEngines}}esRecordToCslJson(e){let t=new Date,i=this._getRecordValue(e,"publisher");i&&(i=i.find((e=>!!e.name)),i&&(i=i.name));let r={id:e["@id"],URL:e["@type"].includes("http://schema.org/Collection")?window.location.origin+e["@id"]:window.location.href,title:this._getRecordValue(e,"name",!0),type:"webpage",publisher:i,source:window.location.host,accessed:{"date-parts":[[t.getFullYear(),t.getMonth()+1,t.getDate()]]}};e.collectionName&&(r["collection-title"]=e.collectionName);let o=(this._getRecordValue(e,"creator")||[]).filter((e=>!!e.name)).map((e=>e.name));o.length&&(r.author=o.map((e=>({family:e}))));let n=this._getRecordValue(e,"datePublished",!0),a=this._getRecordValue(e,"yearPublished",!0);return n?r.issued={raw:n}:a&&(r.issued={raw:a+""}),r}_getRecordValue(e,t,i){if(e[t]){if(t=e[t],Array.isArray(t)||(t=[t]),i){if(!t.length)return;return t[0]}return t}}renderEsRecord(e,t){return this.render(this.esRecordToCslJson(e),t)}}},4218:(e,t,i)=>{const{BaseModel:r}=i(2959),o=i(3863),n=i(1689),a=i(463),s=i(8145);e.exports=new class extends r{constructor(){super(),this.store=o,this.service=n,this.EventBus.on(a.events.RECORD_SEARCH_UPDATE,this._onSearchDocumentUpdate.bind(this)),APP_CONFIG.collections&&APP_CONFIG.collections.length>0&&this.store.setCollectionOverviewLoaded(APP_CONFIG.collections),this.register("CollectionModel")}async overview(){return APP_CONFIG.collectionLabels}async get(e){let t=this.store.getCollection(e);return t&&t.request?await t.request:t&&"loaded"===t.state?t.id!==e&&this.store.setCollectionLoaded(e,t.payload):await this.service.get(e),this.store.getCollection(e)}async getAdminData(e){return await this.service.getAdminData(e)}getSelectedCollection(){return this.store.data.selected}search(e){return this.service.search(e)}getRecentCollections(e=3){let t={limit:e,sort:[{"@graph.datePublished":{order:"desc",unmapped_type:"date"}}]};return this.service.search(t)}getHomepageDefaultCollections(){return this.service.search({limit:3})}async _onSearchDocumentUpdate(e){let t=null;e.searchDocument.filters.collectionId&&1===e.searchDocument.filters.collectionId.value.length&&(t=await this.get(e.searchDocument.filters.collectionId.value[0])),!e.searchDocument.filters.collectionId&&e.searchDocument.text?("loading"===e.state&&this.search({text:e.searchDocument.text}),this.emit("show-collection-search-results",!0)):this.emit("show-collection-search-results",!1),s.setSelectedCollection(t),s.set({searchCollection:t})}async getFeaturedImage(e,t){let i,r="";try{i=await this.getCollectionEdits(e)}catch(e){console.log("Error retrieving collection edits",e)}if(!Object.keys(i.payload).length)return;if(i=i.payload,!i.edits)return;let o=await t.getAdminData(e);if(!o)return;o=o.body["@graph"];let n=o.filter((t=>t["@id"]==="/application/ucd-lib-client"+e))[0];return n?(n.thumbnailUrl?.split("/fcrepo/rest")?.[1]&&(r="/fcrepo/rest"+n.thumbnailUrl.split("/fcrepo/rest")[1]),r):void 0}async getCollectionEdits(e){let t=await this.service.getCollectionEdits(e);return t&&t.request&&await t.request,this.store.data.edits[e]}}},2885:e=>{e.exports=new class{renderCollection(e){const t=e.payload.root;let i,r="";if(t.identifier&&(Array.isArray(t.identifier)||(t.identifier=[t.identifier]),t.identifier.forEach((e=>{let t=e.match(/[a-zA-Z]{1,2}-\d{3}/g);t&&(r=t[0])}))),e.payload?.clientMedia?.mediaGroups){let t=e.payload.clientMedia.mediaGroups.find((e=>e.clientMedia?.images));t&&(i=t?.clientMedia?.images)}t.subjects&&!Array.isArray(t.subjects)&&(t.subjects=[t.subjects]);const o={id:t["@id"],description:t.description,title:t.name,images:i,subjects:t.subjects||[],callNumber:r,count:t.itemCount,yearPublished:t.yearPublished};e.vcData=o}renderCollections(e){(e.payload.results||[]).forEach((e=>{let t,i=e.root,r="";if(i.identifier&&(Array.isArray(i.identifier)||(i.identifier=[i.identifier]),i.identifier.forEach((e=>{let t=e.match(/[a-zA-Z]{1,2}-\d{3}/g);t&&(r=t[0])}))),e.clientMedia?.mediaGroups){let i=e.clientMedia.mediaGroups.find((e=>e.clientMedia?.images));i&&(t=i?.clientMedia?.images)}const o={id:i["@id"],description:i.description,title:i.name,images:t,subjects:i.subjects||[],callNumber:r,count:i.itemCount,yearPublished:i.yearPublished};e.vcData=o}))}}},8785:(e,t,i)=>{const{BaseModel:r}=i(2959),o=i(6794);e.exports=class extends r{constructor(){for(var e in super(),this.defaultTextFields=["title","description"],this.facets={},o.elasticSearch.facets)this.facets[e]={type:o.elasticSearch.facets[e].type}}emptySearchDocument(){return{text:"",filters:{},sort:null,limit:20,offset:0,facets:this.facets}}urlToSearchDocument(e){if(!Array.isArray(e))throw new Error("UrlParts should be an array");let t=this.emptySearchDocument(),i=0;for(;e.length>0;){let r=decodeURIComponent(e.splice(0,1)[0]);switch(i){case 0:t.text=r;break;case 1:t.filters=r?this._parseUrlFilters(r):{};break;case 2:t.sort=r?JSON.parse(r):null;break;case 3:t.limit=r?parseInt(r):20;break;case 4:t.offset=r?parseInt(r):0}i++}return t}_parseUrlFilters(e=""){let t={};return JSON.parse(e).forEach((e=>{t[e[0]]=this._setUrlFilterOp({type:this._parseUrlFilterType(e[1]),value:this._parseUrlFilterValue(e)},e[1])})),t}_setUrlFilterOp(e,t){return"range"!==t&&(e.op=t),e}_parseUrlFilterType(e){return"or"===e||"and"===e?"keyword":e}_parseUrlFilterValue(e){return"range"===e[1]?e[2]:e.splice(2,e.length)}searchDocumentToUrl(e,t=!1){let i=[];if(e.filters)for(var r in e.filters){let t=e.filters[r],o=[r,t.op||t.type];Array.isArray(t.value)?o=o.concat(t.value):o.push(t.value),i.push(o)}return!t||e.text||e.sort||e.offset||1!==i.length||10!==e.limit||3!==i[0].length||"collectionId"!==i[0][0]||"or"!==i[0][1]||!i[0][2].match(/^\/collection\//)?[encodeURIComponent(e.text),encodeURIComponent(JSON.stringify(i)),encodeURIComponent(e.sort?JSON.stringify(e.sort):""),e.limit||"",e.offset||""].join("/"):i[0][2]}setSort(e,t,i){return t?"object"==typeof t?e.sort=key:i&&(e.sort={[t]:i}):e.sort=null,e.offset=0,e}setPaging(e,t,i){return void 0!==t&&(e.offset=t),void 0!==i&&(e.limit=i),e}setTextFilter(e,t){return e.text=t,e}clearFilters(e){return e.text="",e.filters={},e}appendKeywordFilter(e,t,i,r="or"){return e.filters[t]?e.filters[t].value.push(i):e.filters[t]={type:"keyword",op:r,value:[i]},e}setKeywordFilter(e,t,i,r="or"){return e.filters[t]={type:"keyword",op:r,value:[i]},e}async removeKeywordFilter(e,t,i){if(!e.filters[t])return e;if(void 0===i)delete e.filters[t];else{let r=e.filters[t],o=r.value.indexOf(i);if(-1===o)return e;r.value.splice(o,1),0===r.value.length&&delete e.filters[t]}return e}appendRangeFilter(e,t,i){return e.filters[t]={type:"range",value:i},e}removeRangeFilter(e,t){return e.filters[t]?(delete e.filters[t],e):e}}},917:(e,t,i)=>{const{BaseModel:r}=i(2959),o=i(5104),n=i(1377);function a(e){return void 0===e?[]:Array.isArray(e)?e:[e]}function s(e){return e.forEach((e=>{e&&"number"!=typeof e.position&&(e.position=e.position?parseInt(e.position):9999)})),e.sort(((e,t)=>e.position<t.position?-1:1)),e}e.exports=new class extends r{constructor(){super(),this.store=o,this.service=n,this.TYPES={APPLICATION_CONTAINER:"http://digital.ucdavis.edu/schema#ApplicationContainer"},this.byId={},this.defaultHomepageHero={imgSrc:"/images/defaults/annual-winter-sale1952.jpg",itemName:"Annual Winter Sale 1952",itemLink:"/collection/sherry-lehmann/D-202/d7hg6v",collectionName:"Sherry Lehmann Wine Catalogs",collectionLink:"/collection/sherry-lehmann"},this.register("FcAppConfigModel")}async getDefaultImagesConfig(){let e=await this.service.getDefaultImagesConfig();return e&&"loading"===e.state&&await e.request,this.store.data.defaultImages}async getApiAppData(){let e=await this.service.getApiAppData();return e&&"loading"===e.state&&await e.request,this.store.data.apiApplication}async getAdminData(e){return await this.service.getAdminData(e)}getFeaturedCollections(){return this.enabled?s(a(this.getApplicationContainer().featuredCollection).map((e=>this.byId[e["@id"]]))):[]}getFeaturedImages(){return this.enabled?s(a(this.getApplicationContainer().featuredImage).map((e=>this.byId[e["@id"]]))):[]}getHomepageHeroOptions(){let e={};return e[this.defaultHomepageHero.imgSrc]=this.defaultHomepageHero,this.enabled?(console.warn("Featured images not set up. Currently serving default hero image!"),e):e}getAppText(e){e="/application/ucd-lib-client/text-"+e;let t=this.byId[e];return t?{text:t.description||"",label:t.label||""}:null}getApplicationContainer(){return APP_CONFIG.fcAppConfig.find((e=>e["@type"].includes(this.TYPES.APPLICATION_CONTAINER)))}async getCollectionAppData(e){let t=await this.service.getCollectionAppData(e);return t&&"loading"===t.state&&await t.request,this.store.data.collectionAppData[e]}async getItemAppData(e){let t=await this.service.getItemAppData(e);return t&&"loading"===t.state&&await t.request,this.store.data.itemAppData[e]}getCollectionDisplayData(e,t={}){const{title:i,watercolor:r,itemCount:o,itemDefaultDisplay:n,savedItems:a}=t;let s={"@context":{"@vocab":"http://schema.org/",fedora:"http://fedora.info/definitions/v4/repository#",ldp:"www.w3.org/ns/ldp#",schema:"http://schema.org/",ucdlib:"http://digital.ucdavis.edu/schema#",xsd:"http://www.w3.org/2001/XMLSchema#",collection:{"@type":"@id","@id":"ucdlib:collection"},watercolors:{"@type":"@id","@id":"ucdlib:watercolors"},foreground:{"@type":"xsd:text","@id":"ucdlib:foreground"},background:{"@type":"xsd:text","@id":"ucdlib:background"},"ldp:membershipResource":{"@type":"@id"},"ldp:hasMemberRelation":{"@type":"@id"}},"@id":"",watercolors:[{"@id":`info:fedora/application/ucd-lib-client${e}#watercolor`,css:r,foreground:"",background:""}],"schema:isPartOf":{"@id":`info:fedora${e}`},name:i,"ucdlib:itemCount":o,"ucdlib:itemDefaultDisplay":n,exampleOfWork:a,isPartOf:{"@id":`info:fedora${e}`}};return(t.newFileUploadName||t.thumbnailUrlOverride)&&(s.thumbnailUrl={"@id":`info:fedora/application/ucd-lib-client${e}/featuredImage.jpg`}),s}async saveCollectionDisplayData(e,t){return await this.service.saveCollectionDisplayData(e,t)}async saveCollectionFeaturedImage(e,t){return await this.service.saveCollectionFeaturedImage(e,t)}async getFeaturedCollectionAppData(){return await this.service.getFeaturedCollectionAppData()}async saveFeaturedCollectionAppData(e){return await this.service.saveFeaturedCollectionDisplayData(e)}getItemDisplayData(e,t){return{"@context":{"@vocab":"http://schema.org/",fedora:"http://fedora.info/definitions/v4/repository#",ldp:"www.w3.org/ns/ldp#",schema:"http://schema.org/",ucdlib:"http://digital.ucdavis.edu/schema#",xsd:"http://www.w3.org/2001/XMLSchema#",item:{"@type":"@id","@id":"ucdlib:item"},"ldp:membershipResource":{"@type":"@id"},"ldp:hasMemberRelation":{"@type":"@id"}},"@id":"","ucdlib:itemDefaultDisplay":t,isPartOf:{"@id":`info:fedora${e}`}}}async updateItemDisplayExceptions(e){for(let t of e){let e=this.getItemDisplayData(t,"");await this.service.saveItemDisplayData(t,e)}}async saveItemDisplayData(e,t){return await this.service.saveItemDisplayData(e,t)}}},4268:(e,t,i)=>{const{BaseModel:r}=i(2959),o=i(5761),n=i(4218),a=i(6794);e.exports=new class extends r{constructor(){super(),this.updateTimer=-1,this.selectedCollection=null,this.EventBus.on(o.store.events.RECORD_SEARCH_UPDATE,(e=>this._update())),this.EventBus.on(n.store.events.COLLECTION_SEARCH_UPDATE,(e=>{this.selectedCollection=e?e["@id"]:"",this._update()})),this.events={FILTER_BUCKETS_UPDATE:"filter-buckets-update"},this.register("FiltersModel")}_update(){-1!==this.updateTimer&&clearTimeout(this.updateTimer),this.updateTimer=setTimeout((()=>{for(var e in this.updateTimer=-1,a.elasticSearch.facets)this._updateFilter(e)}),100)}_updateFilter(e){let t=o.store.data.search.default;t&&"loaded"===t.state&&setTimeout((()=>this._updateFilterAsync(e)),0)}async _updateFilterAsync(e){let t=o.store.data.search.default;if("loaded"!==t.state)return;var i=[];if(t.searchDocument.filters[e]&&(i=t.searchDocument.filters[e].value||[]),!i)return this._fireUpdate({filter:e,buckets:[]});let r=t.payload.aggregations.facets[e]||{},n=this.selectedCollection,s=await o.defaultSearch(this.selectedCollection);if(n!==this.selectedCollection)return;let l=s.payload.aggregations.facets[e]||{},c=a.elasticSearch.facets[e].ignore;c&&c.length&&c.forEach((e=>{l[e]&&delete l[e]}));let d=[];for(var h in l){let e={key:h,sortKey:h.toLowerCase().replace(/\W/g,""),doc_count:r[h]||0};i.indexOf(h)>-1?e.active=!0:e.active=!1,e.empty=!e.doc_count,e.disabled=!e.active&&e.empty,d.push(e)}d.sort(((e,t)=>e.active&&0===e.doc_count?-1:t.active&&0===t.doc_count||e.doc_count<t.doc_count?1:e.doc_count>t.doc_count?-1:e.sortKey>t.sortKey?1:e.sortKey<t.sortKey?-1:0)),this._fireUpdate({filter:e,buckets:d})}_fireUpdate(e){this.emit(this.events.FILTER_BUCKETS_UPDATE,e)}}},5761:(e,t,i)=>{const r=i(8785),o=i(463),n=i(4245),a=i(8145),s=i(6794);i(8030),e.exports=new class extends r{constructor(){super(),this.service=n,this.store=o,this.store.config=s.elasticSearch,this.MAX_WINDOW=1e4,this.currentLocation=null,this.EventBus.on("app-state-update",(e=>this._onAppStateUpdate(e))),this.service.setModel(this),this.register("RecordModel")}async _onAppStateUpdate(e){if(e.location.fullpath===this.currentLocation)return;this.currentLocation=e.location.fullpath;let t=e.location.path;this.handleSelectingRecord(e),["search","collection"].includes(t[0])&&this.handleSearch(e)}async handleSelectingRecord(e){if("item"!==e.location.page)return this.currentRecordId=null,this.selectedMediaPage=null,void a.setSelectedRecord(null);a.set({page:"item"});let t,i="/"+e.location.path.join("/"),r=-1;i.match(/:\d+$/)&&(r=parseInt(i.split(":").pop()),i=i.replace(/:\d+$/,""));try{t=await this.get(i),await t.payload.clientMedia.loadManifests()}catch(e){console.warn("Error retrieving item",e),a.setSelectedRecord(null),a.set({page:"404"})}if(t&&(t.id!==this.currentRecordId||this.selectedMediaPage!==r)){this.currentRecordId=t.id,this.selectedMediaPage=r;let e=t.payload.clientMedia.mediaGroups.find((e=>e["@id"]===i));e||(i!==t.id&&console.warn("Unable to find selected media",i),e=t.payload.clientMedia.mediaGroups.find((e=>e.clientMedia?.pdf&&e.clientMedia?.pages)),e||(e=t.payload.clientMedia.mediaGroups[0]),r=e.clientMedia.pages?0:-1),a.setSelectedRecord({graph:t.payload,clientMedia:t.payload.clientMedia,selectedMedia:e,selectedMediaPage:r})}}async handleSearch(e){let t,i=e.location.path,r=e.location.pathname;if("collection"===i[0]){if(t=this.urlToSearchDocument(["",encodeURIComponent(JSON.stringify([["collectionId","or",r]])),"","20"]),this.lastQuery===t)return;return this.lastQuery=t,void this.search(t)}t="search"===i[0]&&i.length>1?this.urlToSearchDocument(i.slice(1,i.length)):this.emptySearchDocument(),this.lastQuery!==t&&(this.lastQuery=t,this.search(t))}async defaultSearch(e,t=!1,i=!1){let r=e;r||(r="default");let o=[];if(t&&o.push("compact=true"),i&&o.push("single-node=true"),o.length&&(r+="?"+o.join("&")),this.store.getDefaultSearch(r)){let e=this.store.getDefaultSearch(r);return e.state===this.store.STATE.LOADING&&await e.request,this.store.getDefaultSearch(r)}let n=this.emptySearchDocument();return e&&this.appendKeywordFilter(n,"collectionId",e,"and"),await this.service.defaultSearch(r,n,t,i),this.store.getDefaultSearch(r)}async searchHighlighted(e,t=!1,i=!1){let r=e,o=[];t&&o.push("compact=true"),i&&o.push("single-node=true"),o.length&&(r+="?"+o.join("&"));let n=this.emptySearchDocument();return this.appendKeywordFilter(n,"node.isPartOf.@id",e,"and"),n.limit=6,await this.service.defaultSearch(r,n,t,i),this.store.getDefaultSearch(r)}async getIaBookManifest(e){return await this.service.getIaBookManifest(e)}async get(e){let t=this.store.getRecord(e);return t&&t.request?await t.request:t&&"loaded"===t.state?t.id!==e&&this.store.setRecordLoaded(e,t.payload):await this.service.get(e),this.store.getRecord(e)}setSearchLocation(e){a.setLocation("/search/"+this.searchDocumentToUrl(e))}async search(e={},t={}){if(t.compact||(t.compact=!1),t.singleNode||(t.singleNode=!1),t.ignoreClientMedia||(t.ignoreClientMedia=!1),t.debug||(t.debug=!1),t.name||(t.name="default"),e.filters||(e.filters={}),e.limit+e.offset>this.MAX_WINDOW)return this.store.setSearchError(e,new Error("Sorry, digital.ucdavis.edu does not serve more than 10,000 results for a query"),!0),this.store.getSearch();try{await this.service.search(e,t)}catch(e){}return this.store.getSearch()}getCurrentSearchDocument(){return this.store.data.search?.default?.searchDocument?this.store.getSearch().searchDocument:this.emptySearchDocument()}getRecentItems(e,t=3){let i={filters:{"@graph.isPartOf.@id":{type:"keyword",value:[e],op:"or"}},limit:t};return this.service.searchRecentItems(i)}typeaheadSearch(e,t={}){try{return this.service.typeaheadSearch(e,t)}catch(t){return{searchDocument:e,error:t,state:"error"}}}}},7996:(e,t,i)=>{const r=i(6794);e.exports=new class{renderRecord(e){let{root:t,clientMedia:i,data:o}=e.payload;if(t&&i){let o="";t&&t.identifier&&(Array.isArray(t.identifier)||(t.identifier=[t.identifier]),t.identifier.forEach((e=>{e.match(/[a-zA-Z]{1,2}-\d{3}/g)&&(o=e)})));let n="";if(t.isPartOf){Array.isArray(t.isPartOf)||(t.isPartOf=[t.isPartOf]);for(let e of t.isPartOf)if(e["@id"].startsWith("/collection/")){n=e["@id"];break}}let a,s=t.subjects||[];if(Array.isArray(s)||(s=[s]),e.payload?.clientMedia?.mediaGroups){let t=e.payload.clientMedia.mediaGroups,i=t.find((e=>e["@type"].includes("ImageObject")||(e.filename||"").match(/\.(png|jpg)$/)));i?a=i.clientMedia?.images:t[0]?.clientMedia?.images&&(a=t[0].clientMedia.images)}const l={"@id":t["@id"],name:t.name,collectionId:n,collectionName:r.collectionLabels[n]||"",clientMedia:i,images:a,date:t.yearPublished||"Undated",description:t.description||"",publisher:t?.publisher?.name,subjects:s,callNumber:o,arkDoi:["?"],fedoraLinks:["?"],citationText:"?",root:t};e.vcData=l}}}},2103:(e,t,i)=>{const{BaseModel:r}=i(2959),o=i(2759),n=i(8030);e.exports=new class extends r{constructor(){super(),this.store=o,this.EventBus.on("record-search-update",(e=>{this._onRecordSearchUpdate(e)})),this.register("SearchVcModel")}getSearch(e="default"){return this.store.getSearch(e)}async _onRecordSearchUpdate(e){if("loaded"!==e.state)return;const t=[];let i=[];e.payload.results.forEach((e=>{if(!e.root)return;let r,o=n.getThumbnailFromClientMedia(e.clientMedia);Array.isArray(e.root.isPartOf)?r=e.root.isPartOf.filter((e=>e["@id"].indexOf("/collection")>-1))[0]:e.root.isPartOf&&(r={"@id":e.root.isPartOf["@id"]}),r&&!i.find((e=>e["@id"]===r["@id"]))&&i.push({"@id":r["@id"],title:e.root.publisher?e.root.publisher.name:"",name:e.root.publisher?e.root.publisher.name:"",thumbnailUrl:o,recordCount:e.root.itemCount});let a=e?.clientMedia?.mediaGroups||[],s="",l=a.filter((e=>"ImageList"===n.getMediaType(e)))[0];if(l&&l.hasPart&&l.hasPart.length?s=l.hasPart.length+" page"+(l.hasPart.length>1?"s":"")+", Image":l&&l.hasPart&&(s="Multi-page, Image"),!s)for(const e of a)if(s=n.getMediaType(e),s)break;s&&(s=s.replace("Object","")),t.push({id:e.root["@id"],collectionId:r,title:e.root.name,thumbnailUrl:o,mediaType:s,collection:e.root.publisher?e.root.publisher.name:"",creator:e.root.creator?e.root.creator.name:"",date:e.root.yearPublished||"Undated",format:[s]})})),e.payload.results=t,e.payload.matchedCollections=i,this.store.setSearchLoaded(e.name,e.searchDocument,e.payload)}}},3194:(e,t,i)=>{const{BaseModel:r}=i(2959),o=i(8145),n=i(4218),a=i(6794),s=i(3569),l=i(1318),c=l.recordTransform,d=l.collectionTransform;e.exports=new class extends r{constructor(){super(),"undefined"!=typeof window&&(this.ele=document.querySelector("#seo-jsonld"),this.EventBus.on(o.store.events.APP_STATE_UPDATE,(e=>this._onAppStateUpdate(e))),this.EventBus.on(o.store.events.SELECTED_RECORD_UPDATE,(e=>this._onAppStateUpdate(e))),this.EventBus.on(n.store.events.COLLECTION_UPDATE,(e=>this._onAppStateUpdate(e))),this.EventBus.on(n.store.events.COLLECTION_UPDATE,(e=>this._onCollectionUpdate(e))),this.register("SeoModel"))}async _onAppStateUpdate(e){}async _onCollectionUpdate(e){if("loaded"!==e.state)return;if("collection"!==o.location.page)return;let t=e.payload?.root;t&&(this._setCollectionJsonLd(t),this._setMetaTags({title:t.name+" - "+a?.metadata?.title,description:t.description||"",keywords:(t.abouts||[]).join(", ")}))}_setMetaTags(e){document.title=e.title||"",this._setMetaTag("description",e.description||""),this._setMetaTag("keywords",e.keywords||"")}_setMetaTag(e,t){let i=document.head.querySelector(`meta[name=${e}]`);i&&i.setAttribute("content",t)}_setJsonLd(e){let t=s(e);for(var i in t.root)"_"===i[0]&&delete t[i];if(t.root.associatedMedia){Array.isArray(t.root.associatedMedia)||(t.root.associatedMedia=[t.root.associatedMedia]);let e=[...t.root.associatedMedia];e.forEach(((i,r)=>{let o=t.clientMedia.graph.filter((e=>e["@id"]===i["@id"]))[0];o&&(e[r]=o,o.hasPart&&o.hasPart.forEach(((n,a)=>{if(o=t.clientMedia.graph.filter((e=>e["@id"]===n["@id"]))[0],o){let t=e[r].hasPart[a];t.image=o,t["@type"]=o["@type"],o.position&&(t.position=parseInt(o.position),delete o.position);let n=o.clientMedia?.images?.original?.size;n&&(t.image.width=parseInt(n.width),t.image.height=parseInt(n.height));let s=o.clientMedia?.images?.small?.url;s&&(t.thumbnailUrl=s),t.isPartOf=i,t.directParent=i["@id"]}})))})),t.root.associatedMedia=e}t=c(t.root,t.clientMedia),this.ele.innerHTML=JSON.stringify(t,"  ","  ")}_setCollectionJsonLd(e){let t=s(e);for(var i in t)"_"===i[0]&&delete t[i];t=d(t,window.location.protocol+"//"+window.location.host),this.ele.innerHTML=JSON.stringify(t,"  ","  ")}_clearJsonLd(){this.ele.innerHTML=""}}},5512:(e,t,i)=>{const{BaseService:r}=i(2959),o=i(2977);e.exports=new class extends r{constructor(){super(),this.store=o,this.initAuthRequested=!1}async getUser(){return this.initAuthRequested?this.store.data:(this.initAuthRequested=!0,this.request({url:"/auth/user",onLoad:e=>{e.body.loggedIn?this.store.setUser(e.body):this.store.notLoggedIn()},onError:e=>{throw e}}))}}},283:(e,t,i)=>{const{BaseService:r}=i(2959),o=i(5647);e.exports=new class extends r{constructor(){super(),this.store=o,this.recordsBaseUrl="/api/item"}getFacets(e,t="facet"){let i={text:"",filters:{},sort:null,limit:0,offset:0,facets:{[e]:{type:t}}};return this.request({url:this.recordsBaseUrl,fetchOptions:{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)},checkCached:()=>this.store.data.facets[e],onLoading:t=>this.store.setFacetLoading(e,t),onLoad:t=>this.store.setFacetLoaded(e,t.body),onError:t=>this.store.setFacetError(e,t)})}}},1689:(e,t,i)=>{const{BaseService:r}=i(2959),o=i(3863),n=i(6794),a=i(9251);e.exports=new class extends r{constructor(){super(),this.store=o,this.baseUrl="/api/collection"}get(e){return this.request({url:`${this.baseUrl}${e.replace("/collection","")}`,checkCached:()=>this.store.getCollection(e),onLoading:t=>this.store.setCollectionLoading(e,t),onLoad:t=>this.store.setCollectionLoaded(e,new a(t.body)),onError:t=>this.store.setCollectionError(e,t)})}getAdminData(e){return this.request({url:`${this.baseUrl}${e.replace("/collection","")}?admin=true`,checkCached:()=>null,onLoading:null,onLoad:null,onError:null})}getDisplayData(e){return this.request({url:"/fcrepo/rest/application/ucd-lib-client"+e,fetchOptions:{headers:{Accept:"application/ld+json",Prefer:'return=representation; omit="http://fedora.info/definitions/fcrepo#ServerManaged"'}},checkCached:()=>null,onLoading:null,onLoad:null,onError:null})}saveDisplayData(e,t){return this.request({url:"/fcrepo/rest/application/ucd-lib-client"+e,fetchOptions:{method:"PUT",headers:{Accept:"application/ld+json",Prefer:"handling=lenient"},body:"{"+JSON.stringify(t)+"}"},checkCached:()=>null,onLoading:null,onLoad:null,onError:null})}async search(e={},t={}){return t.compact||(t.compact=!0),e.textFields=n.elasticSearch.textFields.collection,e.limit=1e3,this.request({url:this.baseUrl,qs:t,json:!0,fetchOptions:{method:"POST",body:e},onLoading:t=>this.store.setSearchLoading(e,t),onLoad:t=>{t.body.results&&(t.body.results=t.body.results.map((e=>new a(e)))),this.store.setSearchLoaded(e,t.body)},onError:t=>this.store.setSearchError(e,t)})}async getCollectionEdits(e){return this.request({url:`/api/client-edits${e}`,checkCached:()=>this.store.data.edits[e],onLoading:t=>this.store.setCollectionEditLoading(e,t),onLoad:t=>this.store.setCollectionEditLoaded(e,t.body),onError:t=>this.store.setCollectionEditError(e,t)})}}},1377:(e,t,i)=>{const{BaseService:r}=i(2959),o=(i(6794),i(5104));e.exports=new class extends r{constructor(){super(),this.store=o,this.baseFcrepoUrl="/fcrepo/rest/application/ucd-lib-client",this.baseApiUrl="/api/application/ucd-lib-client"}getDefaultImagesConfig(){return this.request({url:`${this.baseFcrepoUrl}/default-images/config.json`,checkCached:()=>this.store.data.defaultImages,onLoading:e=>this.store.setDefaultImagesConfigLoading(e),onLoad:e=>this.store.setDefaultImagesConfig(e),onError:e=>this.store.setDefaultImagesConfigError(e)})}getApiApplication(){return this.request({url:`${this.baseApiUrl}`,checkCached:()=>this.store.data.apiApplication,onLoading:e=>this.store.setApiApplicationLoading(e),onLoad:e=>this.store.setApiApplication(e),onError:e=>this.store.setApiApplicationError(e)})}getAdminData(e){return this.request({url:`${this.baseApiUrl}${e}`,checkCached:()=>null,onLoading:null,onLoad:null,onError:null})}getCollectionAppData(e){return this.request({url:`${this.baseFcrepoUrl}${e}`,fetchOptions:{headers:{Accept:"application/ld+json",Prefer:'return=representation; omit="http://fedora.info/definitions/fcrepo#ServerManaged"'}},checkCached:()=>this.store.data.collectionAppData[e],onLoading:t=>this.store.setCollectionAppDataLoading(e,t),onLoad:t=>this.store.setCollectionAppData(e,t),onError:t=>this.store.setCollectionAppDataError(e,t)})}getItemAppData(e){return this.request({url:`${this.baseFcrepoUrl}${e}`,fetchOptions:{headers:{Accept:"application/ld+json",Prefer:'return=representation; omit="http://fedora.info/definitions/fcrepo#ServerManaged"'}},checkCached:()=>this.store.data.itemAppData[e],onLoading:t=>this.store.setItemAppDataLoading(e,t),onLoad:t=>this.store.setItemAppData(e,t),onError:t=>this.store.setItemAppDataError(e,t)})}async saveCollectionDisplayData(e,t){return this.request({url:`${this.baseFcrepoUrl}${e}`,fetchOptions:{method:"PUT",headers:{"Content-Type":"application/ld+json"},body:JSON.stringify(t)},checkCached:()=>null,onLoading:null,onLoad:null,onError:null})}async saveCollectionFeaturedImage(e,t){t&&await fetch(`${this.baseFcrepoUrl}${e}/featuredImage.jpg`,{method:"PUT",headers:{"Content-Type":"image/jpg"},body:t,duplex:"half"})}getFeaturedCollectionAppData(){return this.request({url:`${this.baseFcrepoUrl}/featured-collections/config.json`,checkCached:()=>null,onLoading:null,onLoad:null,onError:null})}async saveFeaturedCollectionDisplayData(e){return this.request({url:`${this.baseFcrepoUrl}/featured-collections/config.json`,fetchOptions:{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)},checkCached:()=>null,onLoading:null,onLoad:null,onError:null})}async saveItemDisplayData(e,t){return this.request({url:`${this.baseFcrepoUrl}${e}`,fetchOptions:{method:"PUT",headers:{"Content-Type":"application/ld+json"},body:JSON.stringify(t)},checkCached:()=>null,onLoading:null,onLoad:null,onError:null})}}},4245:(e,t,i)=>{const{BaseService:r}=i(2959),o=i(463),n=i(6794),a=i(9251);e.exports=new class extends r{constructor(){super(),this.store=o,this.baseUrl="/api/item"}setModel(e){this.model=e}get(e){return this.request({url:`${this.baseUrl}${e.replace(/^\/item/,"")}?compact=true`,checkCached:()=>this.store.getRecord(e),onLoading:t=>this.store.setRecordLoading(e,t),onLoad:t=>this.store.setRecordLoaded(e,new a(t.body)),onError:t=>this.store.setRecordError(e,t)})}getIaBookManifest(e){return this.request({url:e,checkCached:()=>null,onLoading:null,onLoad:null,onError:null})}search(e={},t={}){e.textFields||(e.textFields=n.elasticSearch.textFields.record);let i={};return t.debug&&(i.debug=!0),t.compact&&(i.compact=!0),t.singleNode&&(i["single-node"]=!0),this.request({url:this.baseUrl,qs:i,json:!0,fetchOptions:{method:"POST",body:e},onLoading:i=>this.store.setSearchLoading(t,e,i),onLoad:i=>{i.body.results&&(i.body.results=i.body.results.map((e=>new a(e)))),this.store.setSearchLoaded(t,e,i.body)},onError:i=>this.store.setSearchError(t,e,i)})}async searchRecentItems(e={}){return this.request({url:this.baseUrl+"?debug=true&single-node=true&compact=true",fetchOptions:{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)},onLoading:null,onLoad:null,onError:null})}typeaheadSearch(e={},t={}){e.textFields||(e.textFields=n.elasticSearch.textFields.record);let i={};return t.debug&&(i.debug=!0),t.allRecords&&(i.all=!0),new Promise(((t,r)=>{this.request({url:`${this.baseUrl}`,fetchOptions:{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)},qs:i,onLoad:i=>t({searchDocument:e,payload:i.body,state:"loaded"}),onError:t=>r({searchDocument:e,error:t,state:"error"})})}))}defaultSearch(e,t={},i=!1,r=!1){return this.request({url:`${this.baseUrl}?debug=true${i?"&compact=true":""}${r?"&single-node=true":""}`,fetchOptions:{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)},onLoading:i=>this.store.setDefaultSearchLoading(e,t,i),onLoad:i=>{i.body.results&&(i.body.results=i.body.results.map((e=>new a(e))),i.body.results.map((e=>e.getChildren(e.root))),this.store.setDefaultSearchLoaded(e,t,i.body))},onError:i=>this.store.setDefaultSearchError(e,t,i)})}}},6470:(e,t,i)=>{const{AppStateStore:r}=i(2065);e.exports=new class extends r{constructor(){super(),this.data.selectedRecord=null,this.data.selectedRecordMedia=null,this.data.selectedCollection=null,this.events.SELECTED_RECORD_UPDATE="selected-record-update",this.events.SELECTED_COLLECTION_UPDATE="selected-collection-update"}set(e){super.set(e)}setSelectedRecord(e){this.set({selectedRecord:e}),this.emit(this.events.SELECTED_RECORD_UPDATE,e)}getSelectedRecord(){return this.data.selectedRecord}setSelectedCollection(e){this.data.selectedCollection!==e&&(this.set({selectedCollection:e}),this.emit(this.events.SELECTED_COLLECTION_UPDATE,e))}getSelectedCollection(){return this.data.selectedCollection}}},2977:(e,t,i)=>{var{BaseStore:r}=i(2959);e.exports=new class extends r{constructor(){super(),this.CUSTOM_STATES={PENDING:"pending",NOT_LOGGED_IN:"notLoggedIn",LOGGED_IN:"loggedIn"},this.events={AUTH_UPDATE:"auth-update"},this.data={state:this.CUSTOM_STATES.PENDING,user:null}}getUser(){return this.data}setUser(e){this.data={user:e,state:e.loggedIn?this.CUSTOM_STATES.LOGGED_IN:this.CUSTOM_STATES.NOT_LOGGED_IN},this.emit(this.events.AUTH_UPDATE,this.data)}notLoggedIn(){this.data={user:null,state:this.CUSTOM_STATES.NOT_LOGGED_IN},this.emit(this.events.AUTH_UPDATE,this.data)}}},5647:(e,t,i)=>{const{BaseStore:r}=i(2959);e.exports=new class extends r{constructor(){super(),this.data={facets:{}},this.events={BROWSE_BY_FACET_UPDATE:"browse-by-facet-update"}}setFacetLoading(e,t){this._setFacetState({state:this.STATE.LOADING,request:t,id:e})}setFacetLoaded(e,t){if(t.aggregations.facets[e]){t=t.aggregations.facets[e];let i=[];for(let e in t)i.push({key:e,count:t[e]});t=i}this._setFacetState({state:this.STATE.LOADED,payload:t,id:e})}setFacetError(e,t){this._setFacetState({state:this.STATE.ERROR,error:t,id:e})}_setFacetState(e){this.data.facets[e.id]=e,this.emit(this.events.BROWSE_BY_FACET_UPDATE,e)}}},3863:(e,t,i)=>{var{BaseStore:r}=i(2959);const o=i(2885);e.exports=new class extends r{constructor(){super(),this.data={byId:{},edits:{},overview:{state:this.STATE.INIT},search:{state:this.STATE.INIT}},this.events={COLLECTION_OVERVIEW_UPDATE:"collection-overview-update",COLLECTION_UPDATE:"collection-update",COLLECTION_SEARCH_UPDATE:"collection-search-update"}}getCollection(e=""){return this.data.byId[e]}setSearchLoading(e,t){this._setSearchState({state:this.STATE.LOADING,request:t,searchDocument:e})}setSearchLoaded(e,t){this._setSearchState({state:this.STATE.LOADED,searchDocument:e,payload:t})}setSearchError(e,t){this._setSearchState({state:this.STATE.ERROR,searchDocument:e,error:t})}_setSearchState(e){e.state===this.STATE.LOADED&&o.renderCollections(e),this.data.search=e,this.emit(this.events.COLLECTION_SEARCH_UPDATE,this.data.search)}setCollectionOverviewLoading(e){this._setCollectionOverviewState({state:this.STATE.LOADING,request:e})}setCollectionOverviewLoaded(e){e.forEach((e=>{e._id=e["@id"],this.data.byId[e["@id"]]=e})),e.sort(((e,t)=>e.name>t.name?1:e.name<t.name?-1:0)),this._setCollectionOverviewState({state:this.STATE.LOADED,payload:e})}setCollectionOverviewError(e){this._setCollectionOverviewState({state:this.STATE.ERROR,error:e})}_setCollectionOverviewState(e){this.data.overview=e,this.emit(this.events.COLLECTION_OVERVIEW_UPDATE,this.data.overview)}setCollectionLoading(e,t){this._setCollectionState({id:e,state:this.STATE.LOADING,request:t})}setCollectionLoaded(e,t){this._setCollectionState({id:e,state:this.STATE.LOADED,payload:t})}setCollectionError(e,t){this._setCollectionState({id:e,state:this.STATE.ERROR,error:t})}_setCollectionState(e){e.state===this.STATE.LOADED&&o.renderCollection(e),this.data.byId[e.id]=e,this.emit(this.events.COLLECTION_UPDATE,e)}setCollectionEditLoading(e,t){this._setCollectionEditState({id:e,state:this.STATE.LOADING,request:t})}setCollectionEditLoaded(e,t){this._setCollectionEditState({id:e,payload:t,state:this.STATE.LOADED})}setCollectionEditError(e,t){this._setCollectionEditState({id:e,state:this.STATE.ERROR,error:t})}_setCollectionEditState(e){this.data.edits[e.id]=e,this.emit(this.events.COLLECTION_UPDATE,e)}}},5104:(e,t,i)=>{const{BaseStore:r}=i(2959);i(3569),e.exports=new class extends r{constructor(){super(),this.data={itemAppData:{},collectionAppData:{}},this.events={}}setDefaultImagesConfig(e){this.data.defaultImages=e}setDefaultImagesConfigLoading(e){this.data.defaultImages={state:"loading",request:e}}setDefaultImagesConfigError(e){this.data.defaultImages={state:"error",error:e}}setApiApplicationLoading(e){this.data.apiApplication={state:"loading",request:e}}setApiApplicationError(e){this.data.apiApplication={state:"error",error:e}}setApiApplication(e){this.data.apiApplication=e}setCollectionAppDataLoading(e,t){this._setCollectionAppData(e,{state:"loading",request:t})}setCollectionAppData(e,t){this._setCollectionAppData(e,{state:"loaded",data:t})}setCollectionAppDataError(e,t){this._setCollectionAppData(e,{state:"error",error:t})}_setCollectionAppData(e,t){this.data.collectionAppData[e]=t}setItemAppDataLoading(e,t){this._setItemAppData(e,{state:"loading",request:t})}setItemAppData(e,t){this._setItemAppData(e,{state:"loaded",data:t})}setItemAppDataError(e,t){this._setItemAppData(e,{state:"error",error:t})}_setItemAppData(e,t){this.data.itemAppData[e]=t}}},463:(e,t,i)=>{const{BaseStore:r}=i(2959),o=(i(3569),i(7996));e.exports=new class extends r{constructor(){super(),this.data={byId:{},defaultSearch:{},search:{}},this.events={RECORD_UPDATE:"record-update",RECORD_SEARCH_UPDATE:"record-search-update",DEFAULT_RECORD_SEARCH_UPDATE:"default-record-search-update"}}getRecord(e){if(!e)return null;let t=e.split("/").filter((e=>""!==e));for(let e=t.length-1;e>=0;e--){let i="/"+t.join("/");if(this.data.byId[i])return this.data.byId[i];t.splice(e,1)}return null}setRecordLoading(e,t){this._setRecordState({state:this.STATE.LOADING,id:e,request:t})}setRecordLoaded(e,t){this._setRecordState({state:this.STATE.LOADED,id:e,payload:t,payload:t})}setRecordError(e,t){this._setRecordState({state:this.STATE.ERROR,error:t,id:e})}_setRecordState(e){this.data.byId[e.id]=e,e.state===this.STATE.LOADED&&o.renderRecord(e),this.emit(this.events.RECORD_UPDATE,e)}setSearchLoaded(e,t,i){this._setSearchState({name:e.name,opts:e,state:this.STATE.LOADED,searchDocument:t,payload:i})}setSearchLoading(e,t,i){this._setSearchState({name:e.name,opts:e,state:this.STATE.LOADING,searchDocument:t,request:i})}setSearchError(e,t,i,r=!1){this._setSearchState({name:e.name,opts:e,state:this.STATE.ERROR,searchDocument:t,error:i,showErrorMessage:r})}_setSearchState(e){this.data.search[e.name]=e,this.emit(this.events.RECORD_SEARCH_UPDATE,e)}getSearch(e="default"){return this.data.search[e]||{}}setDefaultSearchLoading(e,t,i){this._setDefaultSearchState({id:e,searchDocument:t,state:this.STATE.LOADING,request:i})}setDefaultSearchLoaded(e,t,i){this._setDefaultSearchState({id:e,searchDocument:t,state:this.STATE.LOADED,payload:i})}setDefaultSearchError(e,t,i){this._setDefaultSearchState({id:e,searchDocument:t,state:this.STATE.ERROR,error:i})}getDefaultSearch(e){return this.data.defaultSearch[e]}_setDefaultSearchState(e){this.data.defaultSearch[e.id]=e,this.emit(this.events.DEFAULT_RECORD_SEARCH_UPDATE,this.data.defaultSearch[e.id])}}},2759:(e,t,i)=>{const{BaseStore:r}=i(2959);i(3569),e.exports=new class extends r{constructor(){super(),this.data={search:{}},this.events={SEARCH_VC_UPDATE:"search-vc-update"}}setSearchLoaded(e,t,i){this._setSearchState({name:e,state:this.STATE.LOADED,searchDocument:t,payload:i})}_setSearchState(e){this.data.search[e.name]=e,this.emit(this.events.SEARCH_VC_UPDATE,e)}getSearch(e="default"){return this.data.search[e]}}},9251:(e,t,i)=>{const r=i(2597),o=["hasPart","associatedMedia","image"];e.exports=class{constructor(e,t={}){this.data=e,this.CHILD_LINKS=o,this.opts={},this.index={},this.root=null,this.init()}init(){for(let e of this.data["@graph"])e.id=e["@id"],e["@id"]===this.data["@id"]&&(this.root=e),e["@shortType"]=(e["@type"]||[]).map((e=>e.replace(/.*#/,"").replace(/.*\//,""))),this.index[e["@id"]]=e;this.root&&(this.clientMedia=new r(this.root["@id"],this.data["@graph"],this.opts)),Array.isArray(this.root.name)&&(this.root.name=this.root.name[0])}getChildren(e){let t={};if(!e)return t;let i=this.getContainer(e);return i?(o.forEach((e=>{t[e]=[],this.asArray(i[e]).forEach((i=>{let r=this.getContainer(i);r&&t[e].push(r)}))})),t):t}getContainer(e){return"string"==typeof e?this.index[e]:this.index[e["@id"]]}asArray(e){return null==e?[]:Array.isArray(e)?e:[e]}}},7317:e=>{e.exports={MEDIA_TYPES:["http://digital.ucdavis.edu/schema#StreamingVideo","http://digital.ucdavis.edu/schema#ImageList","http://schema.org/ImageObject","http://schema.org/VideoObject","http://schema.org/AudioObject"],MEDIA_LINK:["associatedMedia","image"],CRAWL_LINKS:["hasPart"],DISPLAY_ORDER:{DISPLAY_TYPES:["pdf","imagelist","video","image","audio"],FILE_TYPES:{image:["pdf","webp","png","jpg","jpeg"],video:["streamingvideo","video"]}}}},2597:(e,t,i)=>{const r=i(7317);let o,n=Promise.resolve().then(i.bind(i,7568));n.then((e=>{o=e.default})),e.exports=class{constructor(e,t,i={}){this.id=e,this.opts=i,this.missingNodes=new Set,t["@graph"]&&(t=t["@graph"]),Array.isArray(t)||(t=[t]),this.graph=t,this.index=[];for(let i of t)this.index[i["@id"]]=i,i["@id"]==e&&(this.root=i);if(!this.root&&t.length)throw new Error("Root "+e+" not found in graph");this.mediaGroups=new Set,this.parse(),this.mediaGroups=Array.from(this.mediaGroups),0===this.mediaGroups.length&&"undefined"!=typeof window&&console.warn("No media found for "+e,t),this.ensureClientMedia();let r=new Set,o=new Set,n=new Set;this.mediaGroups.forEach((e=>{let t=this.getDisplayType(e);"pdf"===t?n.add(e):"imagelist"===t&&o.add(e)})),o=Array.from(o),n=Array.from(n);for(let e of o){let t=this.getMediaLinks(e);for(let i of t)n.includes(i)&&(r.add(i),e.clientMedia.pdf=i.clientMedia,e.clientMedia.download=i.clientMedia.download)}for(let e of n){let t=this.getMediaLinks(e);for(let i of t)o.includes(i)&&(r.add(e),i.clientMedia.pdf=e.clientMedia,i.clientMedia.download=e.clientMedia.download)}this.mediaGroups=this.mediaGroups.filter((e=>!r.has(e)));for(let e of this.mediaGroups){let t=this.getDisplayType(e);e.clientMedia||(e.clientMedia={}),e.clientMedia.images||(e.clientMedia.images={}),!e.clientMedia.images.original&&t&&(e.clientMedia.images.original={missing:!0,url:"/images/tree-bike-illustration.png"}),e.clientMedia.download||(e.clientMedia.download="imagelist"!==t?[{url:"/fcrepo/rest"+e["@id"],fileSize:e.fileSize}]:[{archive:{binary:!0,metadata:!1}}])}}async loadManifests(){for(let e of this.mediaGroups)if(e.clientMedia.pdf&&e.clientMedia.pdf.manifest){if(e.clientMedia.pdf.loaded)continue;o||await n;let t=await o.getManifest(e.clientMedia.pdf.manifest);e.clientMedia=Object.assign(e.clientMedia,t.payload),e.clientMedia.pdf.loaded=!0,e.clientMedia.pages&&e.clientMedia.pages.sort(((e,t)=>e.page<t.page?-1:e.page>t.page?1:0))}this.ensureClientMedia()}ensureClientMedia(){for(let e=0;e<this.mediaGroups.length;e++){let t=this.mediaGroups[e],i=this.getMediaType(t),r=this.getFileType(t);"ImageList"===i?this.handleImageList(t):"image"===r?this.handleImage(t):"pdf"===r&&this.handlePdf(t)}}handleImageList(e){e.clientMedia||(e.clientMedia={}),e.clientMedia.pages=this.getCrawlLinks(e).map((e=>(e=this.getNode(e))?(this.handleImage(e),e.clientMedia.images["@id"]=e["@id"],e.clientMedia.images.page=parseInt(e.position),e.clientMedia.images.download=e.clientMedia.download,e.clientMedia.images):null)).filter((e=>e)),e.clientMedia.pages||(console.warn("No images found for list "+e["@id"]),e.clientMedia.pages=[]),e.clientMedia.pages.sort(((e,t)=>e.page<t.page?-1:e.page>t.page?1:0)),e.clientMedia.download=e.clientMedia.pages.map((e=>e.download)),e.clientMedia.images||(e.clientMedia.images=e.clientMedia.pages[0])}handlePdf(e){e.clientMedia||("undefined"!=typeof window&&console.warn("No clientMedia for pdf "+e["@id"]),e.clientMedia={}),e.clientMedia.pages&&e.clientMedia.pages.forEach(((t,i)=>{t["@id"]||(t["@id"]=e["@id"]+":"+i)})),e.clientMedia.download||(e.clientMedia.download=[{url:"/fcrepo/rest"+e["@id"],label:"pdf",fileSize:e.fileSize}])}handleImage(e){e.clientMedia||("undefined"!=typeof window&&console.warn("No clientMedia for "+e["@id"]),e.clientMedia={}),e.clientMedia.images||(e.clientMedia.images={}),e.clientMedia.images.original||(e.clientMedia.images.original={url:"/fcrepo/rest"+e["@id"]}),e.clientMedia.download||(e.clientMedia.download={url:e.clientMedia.images.original.url,label:e.clientMedia.images.original.url.split(".").pop(),fileSize:e.fileSize})}getNode(e){return"string"==typeof e?(void 0===this.index[e]&&this.missingNodes.add(e),this.index[e]):(void 0===this.index[e["@id"]]&&this.missingNodes.add(e["@id"]),this.index[e["@id"]])}parse(e,t={}){if(e||(e=this.root),t[e["@id"]])return;t[e["@id"]]=!0;let i=this.getMediaLinks(e);for(let e of i)this._crawlMedia(e);let r=this.getCrawlLinks(e);for(let e of r)this.parse(e,t)}_crawlMedia(e,t={}){if(!(e=this.getNode(e)))return void console.warn("Could not find media node for ",e);if(t[e["@id"]])return;t[e["@id"]]=!0;let i=this.getDisplayType(e);i&&r.DISPLAY_ORDER.DISPLAY_TYPES.includes(i)&&this.mediaGroups.add(e);let o=this.getMediaLinks(e);for(let e of o)this._crawlMedia(e,t)}getMediaType(e){return e?(r.MEDIA_TYPES.find((t=>e["@type"]?.includes(t)))||"").split(/(#|\/)/).pop():""}getDisplayType(e){if(!e)return"";let t,i=this.getMediaType(e);if(i){let e=i.replace(/(object|streaming)/gi,"").toLowerCase();if("media"!==e)return e}return e.hasMimeType&&(t=e.hasMimeType.split("/"),t.length)||e.encodingFormat&&(t=e.encodingFormat.split("/"),t.length)||e.fileFormat&&(t=e.fileFormat.split("/"),t.length)?t[0].toLowerCase():""}getFileType(e,t=""){if(t.match("list")){let t=!1;for(let i of r.CRAWL_LINKS)if(e[i]&&(Array.isArray(e[i])||(e[i]=[e[i]]),e=this.getNode(e[i][0]))){t=!0;break}if(!t)return""}let i;return e.fileFormat&&(i=e.fileFormat.split("/"),i.length)||e.hasMimeType&&(i=e.hasMimeType.split("/"),i.length)||e.encodingFormat&&(i=e.encodingFormat.split("/"),i.length)?i[1]:(i=e["@id"].split("/").pop().split("."),i.length>1||e.filename&&(i=e.filename.split("."),i.length>1)?i.pop():"")}getMediaLinks(e){let t=new Set;return r.MEDIA_LINK.forEach((i=>{if(!e[i])return;let r=e[i];Array.isArray(r)||(r=[r]),r.map((e=>this.getNode(e))).filter((e=>e)).forEach((e=>t.add(e)))})),Array.from(t)}getCrawlLinks(e){let t=new Set;return r.CRAWL_LINKS.forEach((i=>{if(!e[i])return;let r=e[i];Array.isArray(r)||(r=[r]),r.map((e=>this.getNode(e))).filter((e=>e)).forEach((e=>t.add(e)))})),Array.from(t)}}},8030:e=>{const t={en:"English",fr:"French"};e.exports=new class{itemDisplayType={imageList:"Image List",brOnePage:"Book Reader - 1 Page",brTwoPage:"Book Reader - 2 Page"};getYearFromDate(e){return e&&(e=(e+="").match(/^(\d{4})/))?e[0]:""}asArray(e={},t){let i=e[t]||[];return Array.isArray(i)?i:[i]}findMediaFromId(e=[],t){return!!Array.isArray(e)&&e.filter((e=>e["@id"]===t))}getMediaType(e){if(e.error)return null;let t=e["@type"]||[];return t.includes("http://digital.ucdavis.edu/schema#ImageList")?"ImageList":t.includes("http://schema.org/ImageObject")?"ImageObject":t.includes("http://digital.ucdavis.edu/schema#StreamingVideo")?"StreamingVideo":t.includes("http://schema.org/VideoObject")?"VideoObject":t.includes("http://schema.org/AudioObject")?"AudioObject":t.includes("http://digital.ucdavis.edu/schema#BagOfFiles")?"BagOfFiles":null}getThumbnailFromClientMedia(e){let t="",i=e.graph;for(const r of e.mediaGroups){if(r.clientMedia?.images?.medium?.url){t=r.clientMedia.images.medium.url;continue}let o=this.getMediaType(r);if("ImageObject"===o)t="/fcrepo/rest"+r["@id"];else if("ImageList"===o){let e=i.filter((e=>1===parseInt(e.position)&&e.clientMedia))[0];t=e?.clientMedia?.images?.medium?.url}else if("VideoObject"===o){let r=i.filter((t=>t["@id"]===e.id))[0];r&&(t="/fcrepo/rest"+r.image?.["@id"])}}return t}getLanguage(e){return t[e]}countMediaItems(e){if(!e)return!1;let t=0;for(let i in e)"imageList"===i?e.imageList.forEach((e=>t+=e.hasPart.length)):t+=e[i].length;return t}flattenMediaList(e){let t=[];return Object.keys(e).forEach((i=>{e[i].forEach((e=>{e.hasPart&&"ImageList"===this.getMediaType(e)?e.hasPart.forEach((e=>{t.push(e)})):t.push(e)}))})),t}getImages(e){let t=[];for(let i in e)"image"===i?t=t.concat(e[i]):"imageList"===i&&(t=t.concat(...e[i].map((e=>e.hasPart))));return t}organizeMediaList(e){return e.sort(((e,t)=>e.position>t.position?1:e.position<t.position?-1:1))}buildIaReaderPages(e,t){let i=[];return Array.isArray(e)||(e=[e]),e.forEach(((e,r)=>{let o=t[e["@id"]];if(!o.clientMedia)return void console.error("no clientMedia images for ",o);let n=o.clientMedia.images;n.page=parseInt(o.position),i.push(n)})),i.sort(((e,t)=>e.page>t.page?1:e.page<t.page?-1:1)),{pages:i}}async getAppConfigCollectionGraph(e,t){let i;try{i=await t.getCollectionAppData(e)}catch(t){console.warn("Error getting app config collection graph for "+e,t)}return i&&i.body?JSON.parse(i.body):null}async getAppConfigItemGraph(e,t){let i;try{i=await t.getItemAppData(e)}catch(t){console.warn("Error getting app config item graph for "+e,t)}return i&&i.body?JSON.parse(i.body):null}}},1807:(e,t,i)=>{"use strict";var r=i(5589);function o(){return r.dy`


`}class n extends r.oi{static get properties(){return{icon:{type:String},src:{type:String},_iconName:{type:String,state:!0},_iconsetName:{type:String,state:!0}}}static get styles(){return[r.iv`
    :host {
      display: block;
      vertical-align: middle;
      fill: var(--ucdlib-icon-fill-color, currentcolor);
      stroke: var(--ucdlib-icon-stroke-color, none);
      width: var(--ucdlib-icon-width, 24px);
      height: var(--ucdlib-icon-height, 24px);
      min-width: var(--ucdlib-icon-width, 24px);
      min-height: var(--ucdlib-icon-height, 24px);
    }
  `]}constructor(){super(),this.render=o.bind(this),this.icon="",this.src="",this._iconName="",this._iconsetName="",this._default_iconset="ucdlib",this._onAddedIconset=this._onAddedIconset.bind(this)}disconnectedCallback(){this._setListener&&window.removeEventListener("ucdlib-iconset-added",this._onAddedIconset),super.disconnectedCallback()}willUpdate(e){if(e.has("icon")||e.has("src"))if(this.src)this._updateIcon();else if(this.icon){let e=this.icon.split(":");this._iconName=e.pop(),this._iconsetName=e.pop()||this._default_iconset,this._updateIcon()}}_onAddedIconset(){this._updateIcon()}_updateIcon(){this._usesIconSet()?(this._img&&this._img.parentNode&&this.renderRoot.removeChild(this._img),""===this._iconName?this._iconset&&this._iconset.removeIcon(this):this._iconsetName&&(this._iconset=this._getIconset(),this._iconset&&this._iconset.applyIcon?(this._iconset.applyIcon(this,this._iconName),this._setListener&&(window.removeEventListener("ucdlib-iconset-added",this._onAddedIconset),this._setListener=!1)):this._setListener||(this._setListener=window.addEventListener("ucdlib-iconset-added",this._onAddedIconset)))):(this._iconset&&this._iconset.removeIcon(this),this._img||(this._img=document.createElement("img"),this._img.style.width="100%",this._img.style.height="100%",this._img.draggable=!1),this._img.src=this.src,this.renderRoot.appendChild(this._img))}_usesIconSet(){return this.icon||!this.src}_getIconset(){return document.head.querySelector(`ucdlib-iconset[name=${this._iconsetName}]`)}}customElements.define("ucdlib-icon",n)},9063:(e,t,i)=>{"use strict";i.d(t,{Q:()=>o}),i(9215),i(1807);var r=i(543);function o(e,t,i=24,o=""){const n=`ucdlib-icons--${t}`;let a=document.getElementById(n);a||(a=document.createElement("div"),a.style.display="none",a.id=n,document.head.appendChild(a));const s=r.dy`
    <ucdlib-iconset name=${t} size=${i} label=${o}>
      ${e}
    </ucdlib-iconset>
  `;(0,r.sY)(s,a)}},9215:(e,t,i)=>{"use strict";var r=i(5589),o=i(8077),n=i(5700),a=i(8337);class s extends((0,o.Z)(r.oi).with(n.C)){static get properties(){return{name:{type:String},size:{type:Number},label:{type:String},suppressWarnings:{type:Boolean,attribute:"suppress-warnings"},_iconMap:{type:Object,state:!0}}}constructor(){super(),this.mutationObserver=new a.F(this,{subtree:!0,childList:!0}),this.name="",this.label="",this.size=24,this._iconMap={},this.suppressWarnings=!1}updated(e){e.has("name")&&this.name&&this.dispatchLoadEvent()}firstUpdated(){this.style.display="none"}dispatchLoadEvent(){this.dispatchEvent(new CustomEvent("ucdlib-iconset-added",{bubbles:!0,composed:!0}))}getIconNames(){return Object.keys(this._iconMap)}getLabel(){return this.label?this.label:this.name.replace(/-/g," ")}applyIcon(e,t){this.removeIcon(e);let i=this._cloneIcon(t);if(i){let t=this._getElementRoot(e);return t.insertBefore(i,t.childNodes[0]),e._svgIcon=i}return null}removeIcon(e){e._svgIcon&&(this._getElementRoot(e).removeChild(e._svgIcon),e._svgIcon=null)}_cloneIcon(e){if(this._iconMap||this._updateIconMap(),this._iconMap[e]){let t=this._iconMap[e].cloneNode(!0),i=document.createElementNS("http://www.w3.org/2000/svg","svg"),r=t.getAttribute("viewBox")||"0 0 "+this.size+" "+this.size,o="pointer-events: none; display: block; width: 100%; height: 100%;";return i.setAttribute("viewBox",r),i.setAttribute("preserveAspectRatio","xMidYMid meet"),i.setAttribute("focusable","false"),i.style.cssText=o,i.appendChild(t).removeAttribute("id"),i}return null}_getElementRoot(e){return e.renderRoot?e.renderRoot:e.shadowRoot?e.shadowRoot:e}_onChildListMutation(){this._updateIconMap()}_updateIconMap(){let e={};this.querySelectorAll("g[id]").forEach((t=>{e[t.id]=t})),Object.keys(e).length||this.suppressWarnings||console.warn("No g elements with an id attribute found!."),this._iconMap=e}}customElements.define("ucdlib-iconset",s)},1914:(e,t,i)=>{"use strict";i.d(t,{P:()=>r});class r{constructor(e,t=992){(this.host=e).addController(this),this.mobileBreakPoint=t}isDesktop(){return window.innerWidth>=this.mobileBreakPoint}isMobile(){return!this.isDesktop()}}},8337:(e,t,i)=>{"use strict";i.d(t,{F:()=>r});class r{constructor(e,t={childList:!0},i="_onChildListMutation"){(this.host=e).addController(this),this.options=t,this.callback=i}hostConnected(){this._observer=new MutationObserver(((e,t)=>this._onMutation(e,t))),this._observer.observe(this.host,this.options),this._onMutation()}hostDisconnected(){this._observer.disconnect()}_onMutation(e,t){this.host[this.callback]?this.host[this.callback](e,t):console.warn(`Element has no '${this.callback}' method. \n        Either add this method, or change the 'callback' argument on instantiation.`)}}},5528:(e,t,i)=>{"use strict";i.d(t,{w:()=>r});class r{constructor(e,t="_onPopstate"){(this.host=e).addController(this),this.callback=t,this._onPopstate=this._onPopstate.bind(this)}hostConnected(){window.addEventListener("popstate",this._onPopstate)}hostDisconnected(){window.removeEventListener("popstate",this._onPopstate)}_onPopstate(e){if(!this.host[this.callback])return void console.warn(`Element has no '${this.callback}' method. \n        Either add this method, or change the 'callback' argument on instantiation.`);let t=this._getLocationObject();this.host[this.callback](t,e)}_getLocationObject(){return{fullpath:window.location.href.replace(window.location.origin,"").replace(/^\/+/,"/"),pathname:window.location.pathname.replace(/^\/+/,"/"),path:window.location.pathname.replace(/(^\/+|\/+$)/g,"").split("/"),query:new URLSearchParams(window.location.search),hash:window.location.hash.replace(/^#/,"")}}}},3333:(e,t,i)=>{"use strict";i.d(t,{H:()=>r});class r{constructor(e){(this.host=e).addController(this)}async wait(e){return new Promise((t=>{setTimeout(t,e)}))}async waitForUpdate(){this.host.requestUpdate(),await this.host.updateComplete}async waitForFrames(e=1){for(let t=0;t<e;t++)await new Promise((e=>{requestAnimationFrame(e)}))}}},5700:(e,t,i)=>{"use strict";i.d(t,{C:()=>r});const r=e=>class extends e{createRenderRoot(){return this}}},8077:(e,t,i)=>{"use strict";i.d(t,{Z:()=>o});class r{constructor(e){this.superclass=e}with(...e){return e.reduce(((e,t)=>t(e)),this.superclass)}}const o=e=>new r(e)},8405:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{V:()=>NavElement});const NavElement=superClass=>class extends superClass{constructor(){super(),this.navItems=[],this.maxDepth=2}parseNavChildren(e=this.children){return e?(e=Array.from(this.children)).map((e=>this._makeNavItemTree(e))).filter((e=>e.linkText)):[]}_makeNavItemTree(e){let t,i,r=[],o=!1,n=!1,a=!1,s=!1;if("LI"===e.tagName&&e.children.length>0&&(e=e.children[0]),"A"===e.tagName)t=e.innerText,i=e.href;else if("LI"===e.tagName)t=e.innerText;else if("OL"===e.tagName||"UL"===e.tagName){t=e.getAttribute("link-text"),i=e.getAttribute("href"),o=e.hasAttribute("is-open");for(const t of Array.from(e.children)){let e=this._makeNavItemTree(t);e.linkText&&r.push(e)}}return"_blank"==e.getAttribute("target")&&(n=!0),e.hasAttribute("mobile-only")&&(a=!0),e.hasAttribute("desktop-only")&&(s=!0),t&&(t=t.trim()),{linkText:t,href:i,subItems:r,isOpen:o,inlineStyles:{},newTab:n,mobileOnly:a,desktopOnly:s}}getNavItem(location){let accessor="this.navItems";return location&&location.length>0&&(accessor+="["+location.join("].subItems[")+"]"),eval(accessor)}itemHasSubNav(e){return!!(e&&e.subItems&&e.subItems.length)}clearItemInlineStyles(e){e&&e.inlineStyles&&Object.keys(e.inlineStyles).length>0&&(e.inlineStyles={},this.requestUpdate())}}},3205:(e,t,i)=>{"use strict";i.d(t,{Z:()=>r});const r=i(5589).iv`

fieldset {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #f7fafd;
  border-top: 3px solid #022851;
}
fieldset > legend {
  padding: 0.25rem;
  font-size: 1.125rem;
}

label {
  display: block;
  padding-bottom: 0.25rem;
  color: #022851;
  font-weight: 700;
}

input,
select,
textarea {
  margin: 0;
  padding: 0.25rem 0.75rem;
  border: 1px solid #999;
  border-radius: 0;
  background-color: #fff;
  background-image: none;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
  color: #13639e;
  font-family: inherit;
  outline: 0;
}
input:focus,
select:focus,
textarea:focus {
  border-color: #ffbf00;
  background-color: #fffbed;
  outline: none;
}

input,
select {
  height: 2.5rem;
}

input,
textarea,
select {
  width: 100%;
}

[type=text],
[type=search],
[type=url],
[type=number],
textarea {
  appearance: none;
}

button,
[type=submit] {
  cursor: pointer;
}
button:focus,
[type=submit]:focus {
  color: #00b2e3;
}

[type=checkbox],
[type=radio] {
  width: auto;
  height: auto;
  margin-right: 0.3em;
}

[type=search] {
  box-sizing: border-box;
}

`},5114:(e,t,i)=>{"use strict";i.d(t,{Z:()=>r});const r=i(5589).iv`

h1 {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  font-size: 1.91rem;
}
h1:first-child {
  margin-top: 0;
}
h1 a {
  color: #022851;
  text-decoration: underline;
}
h1 a:hover, h1 a:focus {
  color: #022851;
  text-decoration: none;
}
@media (min-width: 768px) {
  h1 {
    font-size: 2.94rem;
  }
}

h2 {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #13639e;
  font-size: 1.6055rem;
}
h2:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  h2 {
    font-size: 2.0995rem;
  }
}
h2 a {
  color: #13639e;
  text-decoration: underline;
}
h2 a:hover, h2 a:focus {
  color: #13639e;
  text-decoration: none;
}

h3 {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #666;
  font-size: 1.3325rem;
}
h3:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  h3 {
    font-size: 1.7425rem;
  }
}
h3 a {
  color: #666;
  text-decoration: underline;
}
h3 a:hover, h3 a:focus {
  color: #666;
  text-decoration: none;
}

h4 {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  font-size: 1.092rem;
}
h4:first-child {
  margin-top: 0;
}
h4 a {
  color: #022851;
  text-decoration: underline;
}
h4 a:hover, h4 a:focus {
  color: #022851;
  text-decoration: none;
}
@media (min-width: 768px) {
  h4 {
    font-size: 1.428rem;
  }
}

h5 {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  font-size: 1rem;
}
h5:first-child {
  margin-top: 0;
}
h5 a {
  color: #022851;
  text-decoration: underline;
}
h5 a:hover, h5 a:focus {
  color: #022851;
  text-decoration: none;
}
@media (min-width: 768px) {
  h5 {
    font-size: 1.207rem;
  }
}

h6 {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  font-size: 1rem;
}
h6:first-child {
  margin-top: 0;
}
h6 a {
  color: #022851;
  text-decoration: underline;
}
h6 a:hover, h6 a:focus {
  color: #022851;
  text-decoration: none;
}

`},2250:(e,t,i)=>{"use strict";i.d(t,{Z:()=>r});const r=i(5589).iv`

.menu {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.menu li {
  list-style: none;
}
.menu li {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.menu li li {
  list-style: none;
}

.view-all {
  display: block;
  padding-top: 0.5rem;
  border-top: 1px solid #cce0f3;
}

.sf-underline {
  border-bottom: 1px solid #f7fafd;
}

`},2114:(e,t,i)=>{"use strict";i.d(t,{Z:()=>r});const r=i(5589).iv`

.header {
  background-color: #fff;
  box-shadow: 0 1px 1px rgba(2, 40, 81, 0.15);
}
.header__bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 2rem;
  background-color: #d8d8d8;
}
@media (max-width: 991px) {
  .header__bar {
    display: none;
  }
}
.header__university {
  display: flex;
  align-items: center;
  height: 2rem;
  padding-right: 0.75rem;
  background-color: #e5e5e5;
}
.header__university:before {
  width: 0.75rem;
  height: 2rem;
  margin-right: 0.75rem;
  margin-left: -0.75rem;
  background-color: #e5e5e5;
  clip-path: polygon(93% 0, 110% 0, 110% 102%, 0% 102%);
  content: "";
}
.header__university a {
  display: flex;
  margin-left: 0.5rem;
}
.header .ucd-logo {
  width: auto;
  height: 1.25rem;
}
@media (min-width: 992px) {
  .header .ucd-logo {
    height: 0.75rem;
  }
}
.header__navbar {
  background-color: #022851;
  box-shadow: 0 2px 1px rgba(2, 40, 81, 0.15);
}
.has-mega .header__navbar {
  background-color: #fff;
}

.site-logo {
  max-height: 6.25rem;
}

`},7405:(e,t,i)=>{"use strict";i.d(t,{Z:()=>r});const r=i(5589).iv`

.mobile-bar {
  display: flex;
  align-items: center;
  overflow: hidden;
  min-height: 3.25rem;
  background-color: #022851;
}
@media (min-width: 992px) {
  .mobile-bar {
    display: none;
  }
}
.mobile-bar__nav-toggle {
  position: relative;
  display: flex;
  flex-shrink: 0;
  margin-right: 1rem;
  background-color: #13639e;
}
.mobile-bar__nav-toggle:before {
  position: absolute;
  right: -1rem;
  width: 1rem;
  height: 100%;
  background-color: #022851;
  content: "";
  transform: skewX(16deg);
}
.mobile-bar__nav-toggle:after {
  width: 1rem;
  margin-left: 0.5rem;
  background-color: #14447a;
  content: "";
  transform: skewX(16deg);
}
.mobile-bar__fixed-site-name {
  z-index: 1;
  visibility: hidden;
  width: 0;
  height: 0;
  padding-right: 1rem;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}
@media (min-width: 768px) {
  .mobile-bar__fixed-site-name {
    font-size: 1.25rem;
    line-height: 1;
  }
}
.is-fixed .mobile-bar__fixed-site-name {
  visibility: visible;
  width: auto;
  height: auto;
  opacity: 1;
}
.mobile-bar__fixed-site-name a {
  color: #fff;
  text-decoration: none;
}
.mobile-bar__fixed-site-name a:hover {
  text-decoration: none;
}
.mobile-bar__university {
  margin-right: 1rem;
  margin-left: auto;
  line-height: 1;
}
.is-fixed .mobile-bar__university {
  display: none;
}

`},4192:(e,t,i)=>{"use strict";i.d(t,{Z:()=>r});const r=i(5589).iv`

@media (max-width: 991px) {
  .off-canvas {
    position: absolute;
    z-index: 830;
    width: 70vw;
    min-width: 15rem;
    height: 100%;
    background: #fff;
    transition: all 0.3s;
  }
  .off-canvas__container {
    position: static;
  }
  .menu--hidden .off-canvas__container {
    display: none;
  }
  .off-canvas--fixed, .l-header--fixed .off-canvas {
    position: fixed;
    z-index: 1000;
    overflow: auto;
  }
  .off-canvas--fixed .off-canvas__container, .l-header--fixed .off-canvas .off-canvas__container {
    padding-bottom: 9rem;
  }
  .off-canvas--left {
    left: 0;
  }
  .menu--closed .off-canvas--left {
    transform: translateX(-105%);
  }
  .off-canvas--right {
    right: 0;
  }
  .menu--closed .off-canvas--right {
    transform: translateX(105%);
  }
  .menu--open .off-canvas {
    box-shadow: 0 10px 10px 5px rgba(25, 25, 25, 0.4);
  }
}

`},1644:(e,t,i)=>{"use strict";i.d(t,{Z:()=>r});const r=i(5589).iv`

@charset "UTF-8";
.primary-nav {
  min-height: 3.25rem;
  background-color: #fff;
}
@media (min-width: 992px) {
  .primary-nav {
    background-color: transparent;
    font-size: 0.85rem;
  }
  .primary-nav ul ul {
    display: none;
  }
  .primary-nav li {
    float: left;
  }
  .primary-nav li:hover ul {
    background-color: #fffbed;
  }
  .primary-nav li li {
    float: none;
  }
  .primary-nav li:hover > .primary-nav__top-link a, .primary-nav li:focus-within > .primary-nav__top-link a, .primary-nav li:hover > .primary-nav__top-link .primary-nav__nolink {
    color: #022851;
  }
  .primary-nav .submenu-toggle {
    display: none;
  }
}
.primary-nav a, .primary-nav__nolink {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 0.15rem solid #fff;
  background-color: #dbeaf7;
  color: #022851;
  font-weight: 700;
  line-height: 1.5rem;
  text-decoration: none;
}
@media (min-width: 992px) {
  .primary-nav a, .primary-nav__nolink {
    margin-left: 1rem;
    padding: 0;
    border-bottom: 0;
    background-color: transparent;
    font-weight: 700;
    line-height: 3.25rem;
  }
  .primary-nav a:before, .primary-nav__nolink:before {
    width: 1rem;
    height: 3.25rem;
    margin-right: 0.5rem;
    margin-left: -1rem;
    background-color: transparent;
    clip-path: polygon(93% 0, 110% 0, 110% 102%, 0% 102%);
    content: "";
  }
  .primary-nav a:focus:before, .primary-nav a:hover:before, .primary-nav__nolink:focus:before, .primary-nav__nolink:hover:before {
    background-color: #ffbf00;
  }
  .primary-nav a:after, .primary-nav__nolink:after {
    z-index: 1;
    width: 1rem;
    height: 3.25rem;
    margin-right: -1rem;
    margin-left: 0.5rem;
    background-color: transparent;
    clip-path: polygon(-2px -2px, 100% -2px, 7% 102%, -2px 100%);
    content: "";
  }
  .primary-nav a:focus:after, .primary-nav a:hover:after, .primary-nav__nolink:focus:after, .primary-nav__nolink:hover:after {
    background-color: #ffbf00;
  }
}
.primary-nav a:hover, .primary-nav__nolink:hover {
  background-color: #ffbf00;
}
.primary-nav a:focus,
.primary-nav a .active, .primary-nav__nolink:focus,
.primary-nav__nolink .active {
  background-color: #ffbf00;
}
@media (min-width: 992px) {
  .primary-nav__top-link a, .primary-nav__top-link .primary-nav__nolink {
    color: #fff;
    white-space: nowrap;
  }
  .primary-nav__top-link a:hover, .primary-nav__top-link .primary-nav__nolink:hover {
    color: #022851;
  }
}
.primary-nav li li a, li li .primary-nav__nolink {
  flex-grow: 1;
  border-color: #fff;
  background-color: #fde9ac;
  font-weight: 400;
}
@media (max-width: 991px) {
  .primary-nav li li a, li li .primary-nav__nolink {
    display: flex;
    align-items: center;
  }
  .primary-nav li li a:before, li li .primary-nav__nolink:before {
    margin-right: 0.5rem;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
  }
  .primary-nav li li a:before, li li .primary-nav__nolink:before {
    color: #ffbf00;
    content: "";
    font-size: 1.25em;
  }
  .primary-nav li li a:focus:before, .primary-nav li li a:hover:before, li li .primary-nav__nolink:focus:before, li li .primary-nav__nolink:hover:before {
    color: #022851;
  }
}
@media (min-width: 992px) {
  .primary-nav li li a, li li .primary-nav__nolink {
    margin-left: 0;
    padding: 0.5rem 1rem;
    font-size: 0.9375em;
    line-height: 1.35;
  }
  .primary-nav li li a:focus, li li .primary-nav__nolink:focus {
    background-color: #ffbf00;
  }
  .primary-nav li li a:before, .primary-nav li li a:after, li li .primary-nav__nolink:before, li li .primary-nav__nolink:after {
    display: none;
  }
}
.primary-nav li li li a {
  background-color: #fff9e6;
}
@media (min-width: 992px) {
  .primary-nav--justify > .menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .primary-nav--justify li {
    float: none;
    flex-basis: 0;
    flex-grow: 1;
    width: auto;
  }
  .primary-nav--justify li:last-child .primary-nav__top-link a, .primary-nav--justify li:last-child .primary-nav__top-link .primary-nav__nolink {
    margin-right: 1rem;
  }
  .primary-nav--justify a:after,
.primary-nav--justify .primary-nav__nolink:after {
    margin-left: auto;
  }
}
@media (min-width: 992px) {
  .primary-nav--mega {
    overflow: hidden;
    max-height: 3.25rem;
    margin-right: -1rem;
    transition: max-height 0.3s;
  }
  .primary-nav--mega.is-hover {
    max-height: 600px;
  }
  .primary-nav--mega a:after,
.primary-nav--mega .primary-nav__nolink:after {
    margin-left: auto;
  }
  .primary-nav--mega > .menu {
    display: flex;
    flex-wrap: wrap;
  }
  .primary-nav--mega li {
    float: none;
    width: auto;
    min-width: 9em;
  }
  .primary-nav--mega li li a,
.primary-nav--mega li li .primary-nav__nolink {
    background: none;
  }
  .primary-nav--mega li:hover .primary-nav__top-link a,
.primary-nav--mega li:hover .primary-nav__top-link .primary-nav__nolink {
    background-color: #ffdf80;
  }
  .primary-nav--mega li:hover .primary-nav__top-link a:before, .primary-nav--mega li:hover .primary-nav__top-link a:after,
.primary-nav--mega li:hover .primary-nav__top-link .primary-nav__nolink:before,
.primary-nav--mega li:hover .primary-nav__top-link .primary-nav__nolink:after {
    background-color: #ffdf80;
  }
  .primary-nav--mega li .primary-nav__top-link a:hover {
    background-color: #ffbf00;
  }
  .primary-nav--mega li .primary-nav__top-link a:hover:before, .primary-nav--mega li .primary-nav__top-link a:hover:after {
    background-color: #ffbf00;
  }
  .primary-nav--mega .primary-nav__top-link {
    background-color: #022851;
  }
}
@media (min-width: 992px) {
  .primary-nav--superfish {
    box-shadow: inset 0 -1px 0 #14447a;
  }
  .primary-nav--superfish li {
    position: relative;
  }
  .primary-nav--superfish ul ul {
    position: absolute;
    z-index: 840;
    top: 100%;
    left: 0;
    display: none;
    min-width: 12em;
    background-color: #fff;
  }
  .primary-nav--superfish ul ul ul {
    top: 0;
    left: 100%;
  }
  .primary-nav--superfish li li a,
.primary-nav--superfish li li .primary-nav__nolink {
    background-color: #fffbed;
  }
  .primary-nav--superfish li li li a,
.primary-nav--superfish li li li .primary-nav__nolink {
    background-color: #fffbed;
  }
  .primary-nav--superfish li li li li a,
.primary-nav--superfish li li li li .primary-nav__nolink {
    background-color: #fff9e6;
  }
  .primary-nav--superfish .primary-nav__submenu-indicator {
    display: flex;
    align-items: center;
    width: 1rem;
    height: auto;
    margin-right: -0.5rem;
    margin-left: auto;
    padding-top: 0;
    padding-bottom: 0;
    background-color: transparent;
  }
  .primary-nav--superfish .primary-nav__submenu-indicator:after {
    margin-left: 0.5rem;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
  }
  .primary-nav--superfish .primary-nav__submenu-indicator:focus {
    box-shadow: none;
  }
  .primary-nav--superfish .primary-nav__submenu-indicator:after {
    color: #ffbf00;
    content: "";
    font-size: 0.75em;
  }
  .primary-nav--superfish li li .primary-nav__submenu-indicator:after {
    color: #022851;
  }
  .primary-nav--superfish li li li .primary-nav__submenu-indicator {
    display: none;
  }
  .primary-nav--superfish li:hover > ul,
.primary-nav--superfish .sf--hover > ul {
    display: block;
  }
  .primary-nav--superfish li:hover > .primary-nav__top-link a,
.primary-nav--superfish li:hover > .primary-nav__top-link .primary-nav__nolink,
.primary-nav--superfish .sf--hover > .primary-nav__top-link a,
.primary-nav--superfish .sf--hover > .primary-nav__top-link .primary-nav__nolink {
    background-color: #ffbf00;
  }
  .primary-nav--superfish li:hover > .primary-nav__top-link a:before, .primary-nav--superfish li:hover > .primary-nav__top-link a:after,
.primary-nav--superfish li:hover > .primary-nav__top-link .primary-nav__nolink:before,
.primary-nav--superfish li:hover > .primary-nav__top-link .primary-nav__nolink:after,
.primary-nav--superfish .sf--hover > .primary-nav__top-link a:before,
.primary-nav--superfish .sf--hover > .primary-nav__top-link a:after,
.primary-nav--superfish .sf--hover > .primary-nav__top-link .primary-nav__nolink:before,
.primary-nav--superfish .sf--hover > .primary-nav__top-link .primary-nav__nolink:after {
    background-color: #ffbf00;
  }
  .primary-nav--superfish li:hover > .primary-nav__top-link a .primary-nav__submenu-indicator:after,
.primary-nav--superfish li:hover > .primary-nav__top-link .primary-nav__nolink .primary-nav__submenu-indicator:after,
.primary-nav--superfish .sf--hover > .primary-nav__top-link a .primary-nav__submenu-indicator:after,
.primary-nav--superfish .sf--hover > .primary-nav__top-link .primary-nav__nolink .primary-nav__submenu-indicator:after {
    color: #022851;
  }
  .primary-nav--superfish li:hover > .primary-nav__top-link a,
.primary-nav--superfish .sf--hover > .primary-nav__top-link a,
.primary-nav--superfish li:hover > .primary-nav__top-link .primary-nav__nolink {
    color: #022851;
  }
}
.primary-nav .submenu-toggle:focus {
  box-shadow: inset 0 0 0 3px #ffbf00;
  outline: none;
}

`},8987:(e,t,i)=>{"use strict";i.d(t,{Z:()=>r});const r=i(5589).iv`

.nav-toggle {
  overflow: hidden;
  text-indent: 110%;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.75rem;
  height: 3.25rem;
  padding: 0;
  border: 0;
  appearance: none;
  background: transparent;
  text-indent: 300%;
}
.nav-toggle:focus {
  outline: dotted #ffbf00;
  outline-offset: -0.5rem;
}
.nav-toggle__icon--menu {
  position: relative;
  margin-top: 8px;
  margin-bottom: 8px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin: 0;
}
.nav-toggle__icon--menu, .nav-toggle__icon--menu::before, .nav-toggle__icon--menu::after {
  display: block;
  width: 1.4444444444rem;
  height: 3px;
  background-color: #fff;
  outline: 1px solid transparent;
  -webkit-transition-property: background-color, -webkit-transform;
  -moz-transition-property: background-color, -moz-transform;
  -o-transition-property: background-color, -o-transform;
  transition-property: background-color, transform;
  -webkit-transition-duration: 0.3s;
  -moz-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
}
.nav-toggle__icon--menu::before, .nav-toggle__icon--menu::after {
  position: absolute;
  content: "";
}
.nav-toggle__icon--menu::before {
  top: -8px;
}
.nav-toggle__icon--menu::after {
  top: 8px;
}
.nav-toggle--active .nav-toggle__icon--menu {
  background-color: transparent;
}
.nav-toggle--active .nav-toggle__icon--menu::before {
  -webkit-transform: translateY(8px) rotate(45deg);
  -moz-transform: translateY(8px) rotate(45deg);
  -ms-transform: translateY(8px) rotate(45deg);
  -o-transform: translateY(8px) rotate(45deg);
  transform: translateY(8px) rotate(45deg);
}
.nav-toggle--active .nav-toggle__icon--menu::after {
  -webkit-transform: translateY(-8px) rotate(-45deg);
  -moz-transform: translateY(-8px) rotate(-45deg);
  -ms-transform: translateY(-8px) rotate(-45deg);
  -o-transform: translateY(-8px) rotate(-45deg);
  transform: translateY(-8px) rotate(-45deg);
}

`},5742:(e,t,i)=>{"use strict";i.d(t,{Z:()=>r});const r=i(5589).iv`

.site-branding {
  --o-media-gutter: var(--o-media-gutter-default, 1rem);
  --o-media-gutter--right: var(--o-media-gutter-default, 1rem);
  --o-media-gutter--left: 0;
  display: flex;
  align-items: flex-start;
  align-items: center;
}
.site-branding__figure {
  margin-right: var(--o-media-gutter--right);
  margin-left: var(--o-media-gutter--left);
}
.site-branding__body {
  display: block;
  flex: 1;
}
.site-branding__body,
.site-branding__body > :last-child {
  margin-bottom: 0;
}
.site-branding--small {
  --o-media-gutter: 0.5rem;
  --o-media-gutter--right: var(--o-media-gutter);
}
.site-branding--large {
  --o-media-gutter: 2rem;
  --o-media-gutter--right: var(--o-media-gutter);
}
.site-branding--rev {
  --o-media-gutter--right: 0;
  --o-media-gutter--left: var(--o-media-gutter, 1rem);
  flex-direction: row-reverse;
}
.site-branding--flush {
  --o-media-gutter--right: 0;
  --o-media-gutter--left: 0;
}
.site-branding__figure {
  margin-right: var(--o-media-gutter--right);
  margin-left: var(--o-media-gutter--left);
}
.site-branding__body {
  display: block;
  flex: 1;
}
.site-branding__body,
.site-branding__body > :last-child {
  margin-bottom: 0;
}
.site-branding__site-name {
  margin-bottom: 0.25rem;
  color: #022851;
  font-size: 1.5rem;
  font-weight: 700;
}
@media (min-width: 992px) {
  .site-branding__site-name {
    font-size: 2rem;
  }
}
.site-branding__site-name a {
  color: #022851;
  text-decoration: none;
}
.site-branding__site-name a:hover, .site-branding__site-name a:focus {
  color: #022851;
  text-decoration: underline;
}
.site-branding__slogan {
  color: #022851;
  font-size: 1.375rem;
  line-height: 1;
}
@media (min-width: 992px) {
  .site-branding__slogan {
    font-size: 1.5rem;
  }
}
.site-branding a {
  color: #022851;
  text-decoration: none;
}
.site-branding a:hover, .site-branding a:focus {
  color: #022851;
  text-decoration: underline;
}

`},613:(e,t,i)=>{"use strict";i.d(t,{Z:()=>r});const r=i(5589).iv`

.submenu-toggle {
  display: flex;
  float: right;
  flex-shrink: 0;
  width: 50px;
  margin-left: auto;
  padding-bottom: 1px;
  border: 0;
  border-bottom: 0.15rem solid #fff;
  appearance: none;
  background-color: #022851;
  text-align: center;
}
@media (min-width: 310px) {
  .submenu-toggle {
    width: 3rem;
  }
}
@media (min-width: 992px) {
  .submenu-toggle {
    display: none;
  }
  .submenu-toggle__icon {
    display: none;
  }
}
@media (min-width: 992px) {
  .submenu-toggle {
    display: flex;
  }
  .submenu-toggle__icon {
    display: block;
  }
}
.submenu-toggle:focus {
  box-shadow: inset 0 0 0 3px #022851;
  outline: none;
}
a:hover .submenu-toggle {
  background-color: #997300;
}
.submenu-toggle--open .submenu-toggle__icon:before {
  transform: rotate(0deg);
}
.submenu-toggle__wrapper {
  display: flex;
  align-items: stretch;
}
.submenu-toggle__wrapper a:first-child,
.submenu-toggle__wrapper .nolink:first-child {
  flex-grow: 1;
}
.submenu-toggle__icon {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  z-index: 830;
  left: 30%;
  display: block;
  width: 40%;
  height: 3px;
  background-color: #fff;
  font-size: 0;
}
.submenu-toggle__icon:before {
  position: absolute;
  z-index: 830;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  content: "";
  transform: rotate(90deg);
  transition: all 0.3s;
}
a:hover .submenu-toggle__icon {
  background-color: #fff;
}
a:hover .submenu-toggle__icon:before {
  background-color: #fff;
}

`},4927:(e,t,i)=>{"use strict";i.d(t,{Z:()=>r});const r=i(5589).iv`

:host {
  --fixed-page-offset: 3.25rem;
  --fixed-header-scroll-offset: 4.0625rem;
}

.l-header__branding {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
}
@media (min-width: 992px) {
  .l-header__branding {
    min-height: 7.5rem;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
}
@media (max-width: 991px) {
  .l-header--fixed {
    padding-top: 3.25rem;
  }
}
@media (min-width: 992px) {
  .l-header--fixed.is-fixed .l-main {
    padding-top: var(--fixed-page-offset);
  }
}
.l-header--fixed .mobile-bar {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
}
.l-header--fixed [id] {
  scroll-margin-top: var(--fixed-header-scroll-offset);
}

.l-navbar {
  position: relative;
  z-index: 830;
  height: 100%;
  min-height: 3.25rem;
}
@media (max-width: 991px) {
  .l-navbar {
    position: absolute;
    top: 3.25rem;
    left: 0;
  }
}
@media (min-width: 992px) {
  .l-navbar {
    width: 100%;
    height: auto;
  }
}
@media (min-width: 992px) {
  .l-header--fixed .l-navbar.is-fixed {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
  }
}

@media (min-width: 992px) {
  .l-nav-horizontal {
    display: grid;
    grid-template-areas: "nav search quick";
    grid-template-columns: 1fr max-content max-content;
  }
  .l-nav-horizontal__primary-nav {
    grid-area: nav;
  }
  .l-nav-horizontal__search-popup {
    z-index: 3;
    grid-area: search;
  }
  .l-nav-horizontal__search-popup .search-popup__open {
    position: relative;
  }
  .l-nav-horizontal__quick-links {
    z-index: 2;
    grid-area: quick;
  }
}

.has-mega .l-navbar {
  position: absolute;
}
@media (min-width: 992px) {
  .has-mega .l-main {
    padding-top: 3.25rem;
  }
}

`},4676:(e,t,i)=>{"use strict";i.d(t,{Z:()=>r});const r=i(5589).iv`

/*! normalize-scss | MIT/GPLv2 License | bit.ly/normalize-scss */
/* Document
   ========================================================================== */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in
 *    IE on Windows Phone and in iOS.
 */
html {
  line-height: 1.15;
  /* 1 */
  -ms-text-size-adjust: 100%;
  /* 2 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
}

/* Sections
   ========================================================================== */
/**
 * Remove the margin in all browsers (opinionated).
 */
body {
  margin: 0;
}

/**
 * Add the correct display in IE 9-.
 */
article,
aside,
footer,
header,
nav,
section {
  display: block;
}

/**
 * Correct the font size and margin on 'h1' elements within 'section' and
 * 'article' contexts in Chrome, Firefox, and Safari.
 */
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* Grouping content
   ========================================================================== */
/**
 * Add the correct display in IE 9-.
 */
figcaption,
figure {
  display: block;
}

/**
 * Add the correct margin in IE 8.
 */
figure {
  margin: 1em 40px;
}

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box;
  /* 1 */
  height: 0;
  /* 1 */
  overflow: visible;
  /* 2 */
}

/**
 * Add the correct display in IE.
 */
main {
  display: block;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd 'em' font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

/* Links
   ========================================================================== */
/**
 * 1. Remove the gray background on active links in IE 10.
 * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.
 */
a {
  background-color: transparent;
  /* 1 */
  -webkit-text-decoration-skip: objects;
  /* 2 */
}

/* Text-level semantics
   ========================================================================== */
/**
 * 1. Remove the bottom border in Chrome 57- and Firefox 39-.
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  border-bottom: none;
  /* 1 */
  text-decoration: underline;
  /* 2 */
  text-decoration: underline dotted;
  /* 2 */
}

/**
 * Prevent the duplicate application of 'bolder' by the next rule in Safari 6.
 */
b,
strong {
  font-weight: inherit;
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd 'em' font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

/**
 * Add the correct font style in Android 4.3-.
 */
dfn {
  font-style: italic;
}

/**
 * Add the correct background and color in IE 9-.
 */
mark {
  background-color: #ff0;
  color: #000;
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent 'sub' and 'sup' elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
   ========================================================================== */
/**
 * Add the correct display in IE 9-.
 */
audio,
video {
  display: inline-block;
}

/**
 * Add the correct display in iOS 4-7.
 */
audio:not([controls]) {
  display: none;
  height: 0;
}

/**
 * Remove the border on images inside links in IE 10-.
 */
img {
  border-style: none;
}

/**
 * Hide the overflow in IE.
 */
svg:not(:root) {
  overflow: hidden;
}

/* Forms
   ========================================================================== */
/**
 * 1. Change the font styles in all browsers (opinionated).
 * 2. Remove the margin in Firefox and Safari.
 */
button,
input,
optgroup,
select,
textarea {
  font-family: sans-serif;
  /* 1 */
  font-size: 100%;
  /* 1 */
  line-height: 1.15;
  /* 1 */
  margin: 0;
  /* 2 */
}

/**
 * Show the overflow in IE.
 */
button {
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */
button,
select {
  /* 1 */
  text-transform: none;
}

/**
 * 1. Prevent a WebKit bug where (2) destroys native 'audio' and 'video'
 *    controls in Android 4.
 * 2. Correct the inability to style clickable types in iOS and Safari.
 */
button,
html [type=button],
[type=reset],
[type=submit] {
  -webkit-appearance: button;
  /* 2 */
}

button,
[type=button],
[type=reset],
[type=submit] {
  /**
   * Remove the inner border and padding in Firefox.
   */
  /**
   * Restore the focus styles unset by the previous rule.
   */
}
button::-moz-focus-inner,
[type=button]::-moz-focus-inner,
[type=reset]::-moz-focus-inner,
[type=submit]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}
button:-moz-focusring,
[type=button]:-moz-focusring,
[type=reset]:-moz-focusring,
[type=submit]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Show the overflow in Edge.
 */
input {
  overflow: visible;
}

/**
 * 1. Add the correct box sizing in IE 10-.
 * 2. Remove the padding in IE 10-.
 */
[type=checkbox],
[type=radio] {
  box-sizing: border-box;
  /* 1 */
  padding: 0;
  /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */
[type=search] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
  /**
   * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.
   */
}
[type=search]::-webkit-search-cancel-button, [type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to 'inherit' in Safari.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}

/**
 * Correct the padding in Firefox.
 */
fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from 'fieldset' elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    'fieldset' elements in all browsers.
 */
legend {
  box-sizing: border-box;
  /* 1 */
  display: table;
  /* 1 */
  max-width: 100%;
  /* 1 */
  padding: 0;
  /* 3 */
  color: inherit;
  /* 2 */
  white-space: normal;
  /* 1 */
}

/**
 * 1. Add the correct display in IE 9-.
 * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  display: inline-block;
  /* 1 */
  vertical-align: baseline;
  /* 2 */
}

/**
 * Remove the default vertical scrollbar in IE.
 */
textarea {
  overflow: auto;
}

/* Interactive
   ========================================================================== */
/*
 * Add the correct display in Edge, IE, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Add the correct display in IE 9-.
 */
menu {
  display: block;
}

/* Scripting
   ========================================================================== */
/**
 * Add the correct display in IE 9-.
 */
canvas {
  display: inline-block;
}

/**
 * Add the correct display in IE.
 */
template {
  display: none;
}

/* Hidden
   ========================================================================== */
/**
 * Add the correct display in IE 10-.
 */
[hidden] {
  display: none;
}

`},3569:e=>{var t=function(){"use strict";function e(e,t){return null!=t&&e instanceof t}var t,i,r;try{t=Map}catch(e){t=function(){}}try{i=Set}catch(e){i=function(){}}try{r=Promise}catch(e){r=function(){}}function o(n,s,l,c,d){"object"==typeof s&&(l=s.depth,c=s.prototype,d=s.includeNonEnumerable,s=s.circular);var h=[],p=[],u="undefined"!=typeof Buffer;return void 0===s&&(s=!0),void 0===l&&(l=1/0),function n(l,m){if(null===l)return null;if(0===m)return l;var g,f;if("object"!=typeof l)return l;if(e(l,t))g=new t;else if(e(l,i))g=new i;else if(e(l,r))g=new r((function(e,t){l.then((function(t){e(n(t,m-1))}),(function(e){t(n(e,m-1))}))}));else if(o.__isArray(l))g=[];else if(o.__isRegExp(l))g=new RegExp(l.source,a(l)),l.lastIndex&&(g.lastIndex=l.lastIndex);else if(o.__isDate(l))g=new Date(l.getTime());else{if(u&&Buffer.isBuffer(l))return g=Buffer.allocUnsafe?Buffer.allocUnsafe(l.length):new Buffer(l.length),l.copy(g),g;e(l,Error)?g=Object.create(l):void 0===c?(f=Object.getPrototypeOf(l),g=Object.create(f)):(g=Object.create(c),f=c)}if(s){var y=h.indexOf(l);if(-1!=y)return p[y];h.push(l),p.push(g)}for(var v in e(l,t)&&l.forEach((function(e,t){var i=n(t,m-1),r=n(e,m-1);g.set(i,r)})),e(l,i)&&l.forEach((function(e){var t=n(e,m-1);g.add(t)})),l){var b;f&&(b=Object.getOwnPropertyDescriptor(f,v)),b&&null==b.set||(g[v]=n(l[v],m-1))}if(Object.getOwnPropertySymbols){var _=Object.getOwnPropertySymbols(l);for(v=0;v<_.length;v++){var w=_[v];(!(A=Object.getOwnPropertyDescriptor(l,w))||A.enumerable||d)&&(g[w]=n(l[w],m-1),A.enumerable||Object.defineProperty(g,w,{enumerable:!1}))}}if(d){var x=Object.getOwnPropertyNames(l);for(v=0;v<x.length;v++){var A,S=x[v];(A=Object.getOwnPropertyDescriptor(l,S))&&A.enumerable||(g[S]=n(l[S],m-1),Object.defineProperty(g,S,{enumerable:!1}))}}return g}(n,l)}function n(e){return Object.prototype.toString.call(e)}function a(e){var t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),t}return o.clonePrototype=function(e){if(null===e)return null;var t=function(){};return t.prototype=e,new t},o.__objToStr=n,o.__isDate=function(e){return"object"==typeof e&&"[object Date]"===n(e)},o.__isArray=function(e){return"object"==typeof e&&"[object Array]"===n(e)},o.__isRegExp=function(e){return"object"==typeof e&&"[object RegExp]"===n(e)},o.__getRegExpFlags=a,o}();e.exports&&(e.exports=t)},1979:e=>{"use strict";var t="%[a-f0-9]{2}",i=new RegExp("("+t+")|([^%]+?)","gi"),r=new RegExp("("+t+")+","gi");function o(e,t){try{return[decodeURIComponent(e.join(""))]}catch(e){}if(1===e.length)return e;t=t||1;var i=e.slice(0,t),r=e.slice(t);return Array.prototype.concat.call([],o(i),o(r))}function n(e){try{return decodeURIComponent(e)}catch(n){for(var t=e.match(i)||[],r=1;r<t.length;r++)t=(e=o(t,r).join("")).match(i)||[];return e}}e.exports=function(e){if("string"!=typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return function(e){for(var t={"%FE%FF":"��","%FF%FE":"��"},i=r.exec(e);i;){try{t[i[0]]=decodeURIComponent(i[0])}catch(e){var o=n(i[0]);o!==i[0]&&(t[i[0]]=o)}i=r.exec(e)}t["%C2"]="�";for(var a=Object.keys(t),s=0;s<a.length;s++){var l=a[s];e=e.replace(new RegExp(l,"g"),t[l])}return e}(e)}}},8427:(e,t,i)=>{"use strict";var r=i(3947),o="function"==typeof Symbol&&"symbol"==typeof Symbol("foo"),n=Object.prototype.toString,a=Array.prototype.concat,s=Object.defineProperty,l=i(6661)(),c=s&&l,d=function(e,t,i,r){var o;(!(t in e)||"function"==typeof(o=r)&&"[object Function]"===n.call(o)&&r())&&(c?s(e,t,{configurable:!0,enumerable:!1,value:i,writable:!0}):e[t]=i)},h=function(e,t){var i=arguments.length>2?arguments[2]:{},n=r(t);o&&(n=a.call(n,Object.getOwnPropertySymbols(t)));for(var s=0;s<n.length;s+=1)d(e,n[s],t[n[s]],i[n[s]])};h.supportsDescriptors=!!c,e.exports=h},2442:e=>{"use strict";var t,i="object"==typeof Reflect?Reflect:null,r=i&&"function"==typeof i.apply?i.apply:function(e,t,i){return Function.prototype.apply.call(e,t,i)};t=i&&"function"==typeof i.ownKeys?i.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var o=Number.isNaN||function(e){return e!=e};function n(){n.init.call(this)}e.exports=n,e.exports.once=function(e,t){return new Promise((function(i,r){function o(i){e.removeListener(t,n),r(i)}function n(){"function"==typeof e.removeListener&&e.removeListener("error",o),i([].slice.call(arguments))}g(e,t,n,{once:!0}),"error"!==t&&function(e,t,i){"function"==typeof e.on&&g(e,"error",t,{once:!0})}(e,o)}))},n.EventEmitter=n,n.prototype._events=void 0,n.prototype._eventsCount=0,n.prototype._maxListeners=void 0;var a=10;function s(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function l(e){return void 0===e._maxListeners?n.defaultMaxListeners:e._maxListeners}function c(e,t,i,r){var o,n,a,c;if(s(i),void 0===(n=e._events)?(n=e._events=Object.create(null),e._eventsCount=0):(void 0!==n.newListener&&(e.emit("newListener",t,i.listener?i.listener:i),n=e._events),a=n[t]),void 0===a)a=n[t]=i,++e._eventsCount;else if("function"==typeof a?a=n[t]=r?[i,a]:[a,i]:r?a.unshift(i):a.push(i),(o=l(e))>0&&a.length>o&&!a.warned){a.warned=!0;var d=new Error("Possible EventEmitter memory leak detected. "+a.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");d.name="MaxListenersExceededWarning",d.emitter=e,d.type=t,d.count=a.length,c=d,console&&console.warn&&console.warn(c)}return e}function d(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function h(e,t,i){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:i},o=d.bind(r);return o.listener=i,r.wrapFn=o,o}function p(e,t,i){var r=e._events;if(void 0===r)return[];var o=r[t];return void 0===o?[]:"function"==typeof o?i?[o.listener||o]:[o]:i?function(e){for(var t=new Array(e.length),i=0;i<t.length;++i)t[i]=e[i].listener||e[i];return t}(o):m(o,o.length)}function u(e){var t=this._events;if(void 0!==t){var i=t[e];if("function"==typeof i)return 1;if(void 0!==i)return i.length}return 0}function m(e,t){for(var i=new Array(t),r=0;r<t;++r)i[r]=e[r];return i}function g(e,t,i,r){if("function"==typeof e.on)r.once?e.once(t,i):e.on(t,i);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function o(n){r.once&&e.removeEventListener(t,o),i(n)}))}}Object.defineProperty(n,"defaultMaxListeners",{enumerable:!0,get:function(){return a},set:function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");a=e}}),n.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},n.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},n.prototype.getMaxListeners=function(){return l(this)},n.prototype.emit=function(e){for(var t=[],i=1;i<arguments.length;i++)t.push(arguments[i]);var o="error"===e,n=this._events;if(void 0!==n)o=o&&void 0===n.error;else if(!o)return!1;if(o){var a;if(t.length>0&&(a=t[0]),a instanceof Error)throw a;var s=new Error("Unhandled error."+(a?" ("+a.message+")":""));throw s.context=a,s}var l=n[e];if(void 0===l)return!1;if("function"==typeof l)r(l,this,t);else{var c=l.length,d=m(l,c);for(i=0;i<c;++i)r(d[i],this,t)}return!0},n.prototype.addListener=function(e,t){return c(this,e,t,!1)},n.prototype.on=n.prototype.addListener,n.prototype.prependListener=function(e,t){return c(this,e,t,!0)},n.prototype.once=function(e,t){return s(t),this.on(e,h(this,e,t)),this},n.prototype.prependOnceListener=function(e,t){return s(t),this.prependListener(e,h(this,e,t)),this},n.prototype.removeListener=function(e,t){var i,r,o,n,a;if(s(t),void 0===(r=this._events))return this;if(void 0===(i=r[e]))return this;if(i===t||i.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,i.listener||t));else if("function"!=typeof i){for(o=-1,n=i.length-1;n>=0;n--)if(i[n]===t||i[n].listener===t){a=i[n].listener,o=n;break}if(o<0)return this;0===o?i.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(i,o),1===i.length&&(r[e]=i[0]),void 0!==r.removeListener&&this.emit("removeListener",e,a||t)}return this},n.prototype.off=n.prototype.removeListener,n.prototype.removeAllListeners=function(e){var t,i,r;if(void 0===(i=this._events))return this;if(void 0===i.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==i[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete i[e]),this;if(0===arguments.length){var o,n=Object.keys(i);for(r=0;r<n.length;++r)"removeListener"!==(o=n[r])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=i[e]))this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},n.prototype.listeners=function(e){return p(this,e,!0)},n.prototype.rawListeners=function(e){return p(this,e,!1)},n.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):u.call(e,t)},n.prototype.listenerCount=u,n.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}},1951:e=>{"use strict";var t=Array.isArray,i=Object.keys,r=Object.prototype.hasOwnProperty;e.exports=function e(o,n){if(o===n)return!0;if(o&&n&&"object"==typeof o&&"object"==typeof n){var a,s,l,c=t(o),d=t(n);if(c&&d){if((s=o.length)!=n.length)return!1;for(a=s;0!=a--;)if(!e(o[a],n[a]))return!1;return!0}if(c!=d)return!1;var h=o instanceof Date,p=n instanceof Date;if(h!=p)return!1;if(h&&p)return o.getTime()==n.getTime();var u=o instanceof RegExp,m=n instanceof RegExp;if(u!=m)return!1;if(u&&m)return o.toString()==n.toString();var g=i(o);if((s=g.length)!==i(n).length)return!1;for(a=s;0!=a--;)if(!r.call(n,g[a]))return!1;for(a=s;0!=a--;)if(!e(o[l=g[a]],n[l]))return!1;return!0}return o!=o&&n!=n}},625:e=>{"use strict";e.exports=function(e,t){for(var i={},r=Object.keys(e),o=Array.isArray(t),n=0;n<r.length;n++){var a=r[n],s=e[a];(o?-1!==t.indexOf(a):t(a,s,e))&&(i[a]=s)}return i}},3197:e=>{"use strict";var t=Array.prototype.slice,i=Object.prototype.toString;e.exports=function(e){var r=this;if("function"!=typeof r||"[object Function]"!==i.call(r))throw new TypeError("Function.prototype.bind called on incompatible "+r);for(var o,n=t.call(arguments,1),a=Math.max(0,r.length-n.length),s=[],l=0;l<a;l++)s.push("$"+l);if(o=Function("binder","return function ("+s.join(",")+"){ return binder.apply(this,arguments); }")((function(){if(this instanceof o){var i=r.apply(this,n.concat(t.call(arguments)));return Object(i)===i?i:this}return r.apply(e,n.concat(t.call(arguments)))})),r.prototype){var c=function(){};c.prototype=r.prototype,o.prototype=new c,c.prototype=null}return o}},965:(e,t,i)=>{"use strict";var r=i(3197);e.exports=Function.prototype.bind||r},9978:(e,t,i)=>{"use strict";var r,o=SyntaxError,n=Function,a=TypeError,s=function(e){try{return n('"use strict"; return ('+e+").constructor;")()}catch(e){}},l=Object.getOwnPropertyDescriptor;if(l)try{l({},"")}catch(e){l=null}var c=function(){throw new a},d=l?function(){try{return c}catch(e){try{return l(arguments,"callee").get}catch(e){return c}}}():c,h=i(9069)(),p=Object.getPrototypeOf||function(e){return e.__proto__},u={},m="undefined"==typeof Uint8Array?r:p(Uint8Array),g={"%AggregateError%":"undefined"==typeof AggregateError?r:AggregateError,"%Array%":Array,"%ArrayBuffer%":"undefined"==typeof ArrayBuffer?r:ArrayBuffer,"%ArrayIteratorPrototype%":h?p([][Symbol.iterator]()):r,"%AsyncFromSyncIteratorPrototype%":r,"%AsyncFunction%":u,"%AsyncGenerator%":u,"%AsyncGeneratorFunction%":u,"%AsyncIteratorPrototype%":u,"%Atomics%":"undefined"==typeof Atomics?r:Atomics,"%BigInt%":"undefined"==typeof BigInt?r:BigInt,"%Boolean%":Boolean,"%DataView%":"undefined"==typeof DataView?r:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":"undefined"==typeof Float32Array?r:Float32Array,"%Float64Array%":"undefined"==typeof Float64Array?r:Float64Array,"%FinalizationRegistry%":"undefined"==typeof FinalizationRegistry?r:FinalizationRegistry,"%Function%":n,"%GeneratorFunction%":u,"%Int8Array%":"undefined"==typeof Int8Array?r:Int8Array,"%Int16Array%":"undefined"==typeof Int16Array?r:Int16Array,"%Int32Array%":"undefined"==typeof Int32Array?r:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":h?p(p([][Symbol.iterator]())):r,"%JSON%":"object"==typeof JSON?JSON:r,"%Map%":"undefined"==typeof Map?r:Map,"%MapIteratorPrototype%":"undefined"!=typeof Map&&h?p((new Map)[Symbol.iterator]()):r,"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":"undefined"==typeof Promise?r:Promise,"%Proxy%":"undefined"==typeof Proxy?r:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":"undefined"==typeof Reflect?r:Reflect,"%RegExp%":RegExp,"%Set%":"undefined"==typeof Set?r:Set,"%SetIteratorPrototype%":"undefined"!=typeof Set&&h?p((new Set)[Symbol.iterator]()):r,"%SharedArrayBuffer%":"undefined"==typeof SharedArrayBuffer?r:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":h?p(""[Symbol.iterator]()):r,"%Symbol%":h?Symbol:r,"%SyntaxError%":o,"%ThrowTypeError%":d,"%TypedArray%":m,"%TypeError%":a,"%Uint8Array%":"undefined"==typeof Uint8Array?r:Uint8Array,"%Uint8ClampedArray%":"undefined"==typeof Uint8ClampedArray?r:Uint8ClampedArray,"%Uint16Array%":"undefined"==typeof Uint16Array?r:Uint16Array,"%Uint32Array%":"undefined"==typeof Uint32Array?r:Uint32Array,"%URIError%":URIError,"%WeakMap%":"undefined"==typeof WeakMap?r:WeakMap,"%WeakRef%":"undefined"==typeof WeakRef?r:WeakRef,"%WeakSet%":"undefined"==typeof WeakSet?r:WeakSet},f=function e(t){var i;if("%AsyncFunction%"===t)i=s("async function () {}");else if("%GeneratorFunction%"===t)i=s("function* () {}");else if("%AsyncGeneratorFunction%"===t)i=s("async function* () {}");else if("%AsyncGenerator%"===t){var r=e("%AsyncGeneratorFunction%");r&&(i=r.prototype)}else if("%AsyncIteratorPrototype%"===t){var o=e("%AsyncGenerator%");o&&(i=p(o.prototype))}return g[t]=i,i},y={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},v=i(965),b=i(7765),_=v.call(Function.call,Array.prototype.concat),w=v.call(Function.apply,Array.prototype.splice),x=v.call(Function.call,String.prototype.replace),A=v.call(Function.call,String.prototype.slice),S=v.call(Function.call,RegExp.prototype.exec),E=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,C=/\\(\\)?/g,k=function(e,t){var i,r=e;if(b(y,r)&&(r="%"+(i=y[r])[0]+"%"),b(g,r)){var n=g[r];if(n===u&&(n=f(r)),void 0===n&&!t)throw new a("intrinsic "+e+" exists, but is not available. Please file an issue!");return{alias:i,name:r,value:n}}throw new o("intrinsic "+e+" does not exist!")};e.exports=function(e,t){if("string"!=typeof e||0===e.length)throw new a("intrinsic name must be a non-empty string");if(arguments.length>1&&"boolean"!=typeof t)throw new a('"allowMissing" argument must be a boolean');if(null===S(/^%?[^%]*%?$/,e))throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var i=function(e){var t=A(e,0,1),i=A(e,-1);if("%"===t&&"%"!==i)throw new o("invalid intrinsic syntax, expected closing `%`");if("%"===i&&"%"!==t)throw new o("invalid intrinsic syntax, expected opening `%`");var r=[];return x(e,E,(function(e,t,i,o){r[r.length]=i?x(o,C,"$1"):t||e})),r}(e),r=i.length>0?i[0]:"",n=k("%"+r+"%",t),s=n.name,c=n.value,d=!1,h=n.alias;h&&(r=h[0],w(i,_([0,1],h)));for(var p=1,u=!0;p<i.length;p+=1){var m=i[p],f=A(m,0,1),y=A(m,-1);if(('"'===f||"'"===f||"`"===f||'"'===y||"'"===y||"`"===y)&&f!==y)throw new o("property names with quotes must have matching quotes");if("constructor"!==m&&u||(d=!0),b(g,s="%"+(r+="."+m)+"%"))c=g[s];else if(null!=c){if(!(m in c)){if(!t)throw new a("base intrinsic for "+e+" exists, but the property is not available.");return}if(l&&p+1>=i.length){var v=l(c,m);c=(u=!!v)&&"get"in v&&!("originalValue"in v.get)?v.get:c[m]}else u=b(c,m),c=c[m];u&&!d&&(g[s]=c)}}return c}},6661:(e,t,i)=>{"use strict";var r=i(9978)("%Object.defineProperty%",!0),o=function(){if(r)try{return r({},"a",{value:1}),!0}catch(e){return!1}return!1};o.hasArrayLengthDefineBug=function(){if(!o())return null;try{return 1!==r([],"length",{value:1}).length}catch(e){return!0}},e.exports=o},9069:(e,t,i)=>{"use strict";var r="undefined"!=typeof Symbol&&Symbol,o=i(4915);e.exports=function(){return"function"==typeof r&&"function"==typeof Symbol&&"symbol"==typeof r("foo")&&"symbol"==typeof Symbol("bar")&&o()}},4915:e=>{"use strict";e.exports=function(){if("function"!=typeof Symbol||"function"!=typeof Object.getOwnPropertySymbols)return!1;if("symbol"==typeof Symbol.iterator)return!0;var e={},t=Symbol("test"),i=Object(t);if("string"==typeof t)return!1;if("[object Symbol]"!==Object.prototype.toString.call(t))return!1;if("[object Symbol]"!==Object.prototype.toString.call(i))return!1;for(t in e[t]=42,e)return!1;if("function"==typeof Object.keys&&0!==Object.keys(e).length)return!1;if("function"==typeof Object.getOwnPropertyNames&&0!==Object.getOwnPropertyNames(e).length)return!1;var r=Object.getOwnPropertySymbols(e);if(1!==r.length||r[0]!==t)return!1;if(!Object.prototype.propertyIsEnumerable.call(e,t))return!1;if("function"==typeof Object.getOwnPropertyDescriptor){var o=Object.getOwnPropertyDescriptor(e,t);if(42!==o.value||!0!==o.enumerable)return!1}return!0}},7765:(e,t,i)=>{"use strict";var r=i(965);e.exports=r.call(Function.call,Object.prototype.hasOwnProperty)},5331:()=>{!function(){"use strict";if("object"==typeof window)if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)"isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}});else{var e=window.document,t=[];r.prototype.THROTTLE_TIMEOUT=100,r.prototype.POLL_INTERVAL=null,r.prototype.USE_MUTATION_OBSERVER=!0,r.prototype.observe=function(e){if(!this._observationTargets.some((function(t){return t.element==e}))){if(!e||1!=e.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:e,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},r.prototype.unobserve=function(e){this._observationTargets=this._observationTargets.filter((function(t){return t.element!=e})),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},r.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},r.prototype.takeRecords=function(){var e=this._queuedEntries.slice();return this._queuedEntries=[],e},r.prototype._initThresholds=function(e){var t=e||[0];return Array.isArray(t)||(t=[t]),t.sort().filter((function(e,t,i){if("number"!=typeof e||isNaN(e)||e<0||e>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return e!==i[t-1]}))},r.prototype._parseRootMargin=function(e){var t=(e||"0px").split(/\s+/).map((function(e){var t=/^(-?\d*\.?\d+)(px|%)$/.exec(e);if(!t)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(t[1]),unit:t[2]}}));return t[1]=t[1]||t[0],t[2]=t[2]||t[0],t[3]=t[3]||t[1],t},r.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(o(window,"resize",this._checkForIntersections,!0),o(e,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in window&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},r.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,n(window,"resize",this._checkForIntersections,!0),n(e,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},r.prototype._checkForIntersections=function(){var e=this._rootIsInDom(),t=e?this._getRootRect():{top:0,bottom:0,left:0,right:0,width:0,height:0};this._observationTargets.forEach((function(r){var o=r.element,n=a(o),s=this._rootContainsTarget(o),l=r.entry,c=e&&s&&this._computeTargetAndRootIntersection(o,t),d=r.entry=new i({time:window.performance&&performance.now&&performance.now(),target:o,boundingClientRect:n,rootBounds:t,intersectionRect:c});l?e&&s?this._hasCrossedThreshold(l,d)&&this._queuedEntries.push(d):l&&l.isIntersecting&&this._queuedEntries.push(d):this._queuedEntries.push(d)}),this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},r.prototype._computeTargetAndRootIntersection=function(t,i){if("none"!=window.getComputedStyle(t).display){for(var r,o,n,s,c,d,h,p,u=a(t),m=l(t),g=!1;!g;){var f=null,y=1==m.nodeType?window.getComputedStyle(m):{};if("none"==y.display)return;if(m==this.root||m==e?(g=!0,f=i):m!=e.body&&m!=e.documentElement&&"visible"!=y.overflow&&(f=a(m)),f&&(r=f,o=u,void 0,void 0,void 0,void 0,void 0,void 0,n=Math.max(r.top,o.top),s=Math.min(r.bottom,o.bottom),c=Math.max(r.left,o.left),p=s-n,!(u=(h=(d=Math.min(r.right,o.right))-c)>=0&&p>=0&&{top:n,bottom:s,left:c,right:d,width:h,height:p})))break;m=l(m)}return u}},r.prototype._getRootRect=function(){var t;if(this.root)t=a(this.root);else{var i=e.documentElement,r=e.body;t={top:0,left:0,right:i.clientWidth||r.clientWidth,width:i.clientWidth||r.clientWidth,bottom:i.clientHeight||r.clientHeight,height:i.clientHeight||r.clientHeight}}return this._expandRectByRootMargin(t)},r.prototype._expandRectByRootMargin=function(e){var t=this._rootMarginValues.map((function(t,i){return"px"==t.unit?t.value:t.value*(i%2?e.width:e.height)/100})),i={top:e.top-t[0],right:e.right+t[1],bottom:e.bottom+t[2],left:e.left-t[3]};return i.width=i.right-i.left,i.height=i.bottom-i.top,i},r.prototype._hasCrossedThreshold=function(e,t){var i=e&&e.isIntersecting?e.intersectionRatio||0:-1,r=t.isIntersecting?t.intersectionRatio||0:-1;if(i!==r)for(var o=0;o<this.thresholds.length;o++){var n=this.thresholds[o];if(n==i||n==r||n<i!=n<r)return!0}},r.prototype._rootIsInDom=function(){return!this.root||s(e,this.root)},r.prototype._rootContainsTarget=function(t){return s(this.root||e,t)},r.prototype._registerInstance=function(){t.indexOf(this)<0&&t.push(this)},r.prototype._unregisterInstance=function(){var e=t.indexOf(this);-1!=e&&t.splice(e,1)},window.IntersectionObserver=r,window.IntersectionObserverEntry=i}function i(e){this.time=e.time,this.target=e.target,this.rootBounds=e.rootBounds,this.boundingClientRect=e.boundingClientRect,this.intersectionRect=e.intersectionRect||{top:0,bottom:0,left:0,right:0,width:0,height:0},this.isIntersecting=!!e.intersectionRect;var t=this.boundingClientRect,i=t.width*t.height,r=this.intersectionRect,o=r.width*r.height;this.intersectionRatio=i?Number((o/i).toFixed(4)):this.isIntersecting?1:0}function r(e,t){var i,r,o,n=t||{};if("function"!=typeof e)throw new Error("callback must be a function");if(n.root&&1!=n.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=(i=this._checkForIntersections.bind(this),r=this.THROTTLE_TIMEOUT,o=null,function(){o||(o=setTimeout((function(){i(),o=null}),r))}),this._callback=e,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(n.rootMargin),this.thresholds=this._initThresholds(n.threshold),this.root=n.root||null,this.rootMargin=this._rootMarginValues.map((function(e){return e.value+e.unit})).join(" ")}function o(e,t,i,r){"function"==typeof e.addEventListener?e.addEventListener(t,i,r||!1):"function"==typeof e.attachEvent&&e.attachEvent("on"+t,i)}function n(e,t,i,r){"function"==typeof e.removeEventListener?e.removeEventListener(t,i,r||!1):"function"==typeof e.detatchEvent&&e.detatchEvent("on"+t,i)}function a(e){var t;try{t=e.getBoundingClientRect()}catch(e){}return t?(t.width&&t.height||(t={top:t.top,right:t.right,bottom:t.bottom,left:t.left,width:t.right-t.left,height:t.bottom-t.top}),t):{top:0,bottom:0,left:0,right:0,width:0,height:0}}function s(e,t){for(var i=t;i;){if(i==e)return!0;i=l(i)}return!1}function l(e){var t=e.parentNode;return t&&11==t.nodeType&&t.host?t.host:t&&t.assignedSlot?t.assignedSlot.parentNode:t}}()},2451:(e,t,i)=>{"use strict";var r;if(!Object.keys){var o=Object.prototype.hasOwnProperty,n=Object.prototype.toString,a=i(2754),s=Object.prototype.propertyIsEnumerable,l=!s.call({toString:null},"toString"),c=s.call((function(){}),"prototype"),d=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],h=function(e){var t=e.constructor;return t&&t.prototype===e},p={$applicationCache:!0,$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$onmozfullscreenchange:!0,$onmozfullscreenerror:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},u=function(){if("undefined"==typeof window)return!1;for(var e in window)try{if(!p["$"+e]&&o.call(window,e)&&null!==window[e]&&"object"==typeof window[e])try{h(window[e])}catch(e){return!0}}catch(e){return!0}return!1}();r=function(e){var t=null!==e&&"object"==typeof e,i="[object Function]"===n.call(e),r=a(e),s=t&&"[object String]"===n.call(e),p=[];if(!t&&!i&&!r)throw new TypeError("Object.keys called on a non-object");var m=c&&i;if(s&&e.length>0&&!o.call(e,0))for(var g=0;g<e.length;++g)p.push(String(g));if(r&&e.length>0)for(var f=0;f<e.length;++f)p.push(String(f));else for(var y in e)m&&"prototype"===y||!o.call(e,y)||p.push(String(y));if(l)for(var v=function(e){if("undefined"==typeof window||!u)return h(e);try{return h(e)}catch(e){return!1}}(e),b=0;b<d.length;++b)v&&"constructor"===d[b]||!o.call(e,d[b])||p.push(d[b]);return p}}e.exports=r},3947:(e,t,i)=>{"use strict";var r=Array.prototype.slice,o=i(2754),n=Object.keys,a=n?function(e){return n(e)}:i(2451),s=Object.keys;a.shim=function(){if(Object.keys){var e=function(){var e=Object.keys(arguments);return e&&e.length===arguments.length}(1,2);e||(Object.keys=function(e){return o(e)?s(r.call(e)):s(e)})}else Object.keys=a;return Object.keys||a},e.exports=a},2754:e=>{"use strict";var t=Object.prototype.toString;e.exports=function(e){var i=t.call(e),r="[object Arguments]"===i;return r||(r="[object Array]"!==i&&null!==e&&"object"==typeof e&&"number"==typeof e.length&&e.length>=0&&"[object Function]"===t.call(e.callee)),r}},5444:(e,t,i)=>{"use strict";const r=i(5887),o=i(1979),n=i(5778),a=i(625),s=Symbol("encodeFragmentIdentifier");function l(e){if("string"!=typeof e||1!==e.length)throw new TypeError("arrayFormatSeparator must be single character string")}function c(e,t){return t.encode?t.strict?r(e):encodeURIComponent(e):e}function d(e,t){return t.decode?o(e):e}function h(e){return Array.isArray(e)?e.sort():"object"==typeof e?h(Object.keys(e)).sort(((e,t)=>Number(e)-Number(t))).map((t=>e[t])):e}function p(e){const t=e.indexOf("#");return-1!==t&&(e=e.slice(0,t)),e}function u(e){const t=(e=p(e)).indexOf("?");return-1===t?"":e.slice(t+1)}function m(e,t){return t.parseNumbers&&!Number.isNaN(Number(e))&&"string"==typeof e&&""!==e.trim()?e=Number(e):!t.parseBooleans||null===e||"true"!==e.toLowerCase()&&"false"!==e.toLowerCase()||(e="true"===e.toLowerCase()),e}function g(e,t){l((t=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},t)).arrayFormatSeparator);const i=function(e){let t;switch(e.arrayFormat){case"index":return(e,i,r)=>{t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===r[e]&&(r[e]={}),r[e][t[1]]=i):r[e]=i};case"bracket":return(e,i,r)=>{t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==r[e]?r[e]=[].concat(r[e],i):r[e]=[i]:r[e]=i};case"colon-list-separator":return(e,i,r)=>{t=/(:list)$/.exec(e),e=e.replace(/:list$/,""),t?void 0!==r[e]?r[e]=[].concat(r[e],i):r[e]=[i]:r[e]=i};case"comma":case"separator":return(t,i,r)=>{const o="string"==typeof i&&i.includes(e.arrayFormatSeparator),n="string"==typeof i&&!o&&d(i,e).includes(e.arrayFormatSeparator);i=n?d(i,e):i;const a=o||n?i.split(e.arrayFormatSeparator).map((t=>d(t,e))):null===i?i:d(i,e);r[t]=a};case"bracket-separator":return(t,i,r)=>{const o=/(\[\])$/.test(t);if(t=t.replace(/\[\]$/,""),!o)return void(r[t]=i?d(i,e):i);const n=null===i?[]:i.split(e.arrayFormatSeparator).map((t=>d(t,e)));void 0!==r[t]?r[t]=[].concat(r[t],n):r[t]=n};default:return(e,t,i)=>{void 0!==i[e]?i[e]=[].concat(i[e],t):i[e]=t}}}(t),r=Object.create(null);if("string"!=typeof e)return r;if(!(e=e.trim().replace(/^[?#&]/,"")))return r;for(const o of e.split("&")){if(""===o)continue;let[e,a]=n(t.decode?o.replace(/\+/g," "):o,"=");a=void 0===a?null:["comma","separator","bracket-separator"].includes(t.arrayFormat)?a:d(a,t),i(d(e,t),a,r)}for(const e of Object.keys(r)){const i=r[e];if("object"==typeof i&&null!==i)for(const e of Object.keys(i))i[e]=m(i[e],t);else r[e]=m(i,t)}return!1===t.sort?r:(!0===t.sort?Object.keys(r).sort():Object.keys(r).sort(t.sort)).reduce(((e,t)=>{const i=r[t];return Boolean(i)&&"object"==typeof i&&!Array.isArray(i)?e[t]=h(i):e[t]=i,e}),Object.create(null))}t.extract=u,t.parse=g,t.stringify=(e,t)=>{if(!e)return"";l((t=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},t)).arrayFormatSeparator);const i=i=>t.skipNull&&null==e[i]||t.skipEmptyString&&""===e[i],r=function(e){switch(e.arrayFormat){case"index":return t=>(i,r)=>{const o=i.length;return void 0===r||e.skipNull&&null===r||e.skipEmptyString&&""===r?i:null===r?[...i,[c(t,e),"[",o,"]"].join("")]:[...i,[c(t,e),"[",c(o,e),"]=",c(r,e)].join("")]};case"bracket":return t=>(i,r)=>void 0===r||e.skipNull&&null===r||e.skipEmptyString&&""===r?i:null===r?[...i,[c(t,e),"[]"].join("")]:[...i,[c(t,e),"[]=",c(r,e)].join("")];case"colon-list-separator":return t=>(i,r)=>void 0===r||e.skipNull&&null===r||e.skipEmptyString&&""===r?i:null===r?[...i,[c(t,e),":list="].join("")]:[...i,[c(t,e),":list=",c(r,e)].join("")];case"comma":case"separator":case"bracket-separator":{const t="bracket-separator"===e.arrayFormat?"[]=":"=";return i=>(r,o)=>void 0===o||e.skipNull&&null===o||e.skipEmptyString&&""===o?r:(o=null===o?"":o,0===r.length?[[c(i,e),t,c(o,e)].join("")]:[[r,c(o,e)].join(e.arrayFormatSeparator)])}default:return t=>(i,r)=>void 0===r||e.skipNull&&null===r||e.skipEmptyString&&""===r?i:null===r?[...i,c(t,e)]:[...i,[c(t,e),"=",c(r,e)].join("")]}}(t),o={};for(const t of Object.keys(e))i(t)||(o[t]=e[t]);const n=Object.keys(o);return!1!==t.sort&&n.sort(t.sort),n.map((i=>{const o=e[i];return void 0===o?"":null===o?c(i,t):Array.isArray(o)?0===o.length&&"bracket-separator"===t.arrayFormat?c(i,t)+"[]":o.reduce(r(i),[]).join("&"):c(i,t)+"="+c(o,t)})).filter((e=>e.length>0)).join("&")},t.parseUrl=(e,t)=>{t=Object.assign({decode:!0},t);const[i,r]=n(e,"#");return Object.assign({url:i.split("?")[0]||"",query:g(u(e),t)},t&&t.parseFragmentIdentifier&&r?{fragmentIdentifier:d(r,t)}:{})},t.stringifyUrl=(e,i)=>{i=Object.assign({encode:!0,strict:!0,[s]:!0},i);const r=p(e.url).split("?")[0]||"",o=t.extract(e.url),n=t.parse(o,{sort:!1}),a=Object.assign(n,e.query);let l=t.stringify(a,i);l&&(l=`?${l}`);let d=function(e){let t="";const i=e.indexOf("#");return-1!==i&&(t=e.slice(i)),t}(e.url);return e.fragmentIdentifier&&(d=`#${i[s]?c(e.fragmentIdentifier,i):e.fragmentIdentifier}`),`${r}${l}${d}`},t.pick=(e,i,r)=>{r=Object.assign({parseFragmentIdentifier:!0,[s]:!1},r);const{url:o,query:n,fragmentIdentifier:l}=t.parseUrl(e,r);return t.stringifyUrl({url:o,query:a(n,i),fragmentIdentifier:l},r)},t.exclude=(e,i,r)=>{const o=Array.isArray(i)?e=>!i.includes(e):(e,t)=>!i(e,t);return t.pick(e,o,r)}},5778:e=>{"use strict";e.exports=(e,t)=>{if("string"!=typeof e||"string"!=typeof t)throw new TypeError("Expected the arguments to be of type `string`");if(""===t)return[e];const i=e.indexOf(t);return-1===i?[e]:[e.slice(0,i),e.slice(i+t.length)]}},5887:e=>{"use strict";e.exports=e=>encodeURIComponent(e).replace(/[!'()*]/g,(e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`))},6085:(e,t,i)=>{(e.exports=i(1506)(!1)).push([e.id,"/*\n * CUSTOM CSS PROPERTIES FOR THE UC DAVIS CAMPUS THEME\n*/\nhtml {\n  /* PRIMARY COLORS */\n  --color-aggie-blue        : #002851;\n  --color-aggie-blue-90     : #14447A;\n  --color-aggie-blue-80     : #13639E;\n  --color-aggie-blue-70     : #13639E;\n  --color-aggie-blue-60     : #73ABDD;\n  --color-aggie-blue-50     : #B0D0ED;\n  --color-aggie-blue-40     : #CCE0F3;\n  --color-aggie-blue-30     : #EBF3FA;\n  --color-aggie-blue-20     : #EBF3FA;\n  --color-aggie-blue-10     : #F7FAFD;\n  --color-aggie-gold        : #FFBF00;\n  --color-aggie-gold-80     : #FFC519;\n  --color-aggie-gold-70     : #FFDF80;\n  --color-aggie-gold-60     : #FFECB2;\n  --color-aggie-gold-40     : #FDE9AC;\n  --color-aggie-gold-30     : #FFF4D2;\n  --color-aggie-gold-20     : #FFF9E6;\n  --color-aggie-gold-10     : #FFFBED;\n\n  /* SECONDARY COLORS */\n  --color-arboretum         : #00C4B3;\n  --color-bodega            : #003A5D;\n  --color-cabernet          : #481268;\n  --color-california        : #8A532F;\n  --color-delta             : #00524C;\n  --color-double-decker     : #C10230;\n  --color-farmers-market    : #AADA91;\n  --color-golden-state      : #FFFF3B;\n  --color-gunrock           : #0047BA;\n  --color-merlot            : #79242F;\n  --color-pinot             : #76236C;\n  --color-poppy             : #F18A00;\n  --color-putah-creek       : #008EAA;\n  --color-quad              : #3DAE2B;\n  --color-rain              : #03F9E6;\n  --color-rec-pool          : #6FCFEB;\n  --color-redbud            : #C6007E;\n  --color-redwood           : #266041;\n  --color-rose              : #FF8189;\n  --color-sage              : #6CCA98;\n  --color-strawberry        : #F93549;\n  --color-sunflower         : #FFDC00;\n  --color-tahoe             : #00B2E3;\n  --color-thiebaud-icing    : #F095CD;\n\n  /* BLACK TONES */\n  --color-black             : #000000;\n  --color-black-90          : #191919;\n  --color-black-80          : #333333;\n  --color-black-70          : #4C4C4C;\n  --color-black-60          : #666666;\n  --color-black-50          : #7F7F7F;\n  --color-black-40          : #999999;\n  --color-black-30          : #B2B2B2;\n  --color-black-20          : #CCCCCC;\n  --color-black-10          : #E5E5E5;\n  --color-white             : #FFFFFF;\n\n  /* DEFAULT ELEMENT COLORS */\n  --color-p                 : var(--color-black);\n  --color-html              : var(--color-black);\n  --color-h1                : var(--color-aggie-blue);\n  --color-h2                : var(--color-aggie-blue-70);\n  --color-h3                : var(--color-black-60);\n  --color-h4                : var(--color-aggie-blue);\n  --color-h5                : var(--color-aggie-blue);\n  --color-h6                : var(--color-aggie-blue);\n  --color-h1-light          : var(--color-white);\n  --color-h2-light          : var(--color-white);\n  --color-h3-light          : var(--color-white);\n  --color-h4-light          : var(--color-white);\n  --color-h5-light          : var(--color-white);\n  --color-h6-light          : var(--color-white);\n  --color-a                 : var(--color-aggie-blue-70);\n  --color-a-hover           : var(--color-tahoe);\n  --color-a-active          : #035369; /* Wrong in the spec? */\n  --color-a-visited         : var(--color-pinot);\n  --color-a-focus           : var(--color-tahoe);\n\n  --list-arrow-color        : var(--color-aggie-gold);\n\n  /* COLOR GRADIENTS */\n  --gradient-ag-putah       : linear-gradient(0deg, rgba(111,207,235,0.8), rgba(2, 40, 81, 0.8) 100%);\n\n  /* FONT SIZES */\n  --fs-p                    : 19px;\n  --fs-html                 : var(--fs-p);\n  --fs-h1                   : 2.94rem;\n  --fs-h2                   : 2.47rem;\n  --fs-h3                   : 2.05rem;\n  --fs-h4                   : 1.68rem;\n  --fs-h5                   : 1.42rem;\n  --fs-h6                   : 1.15rem;\n  --fs-small                : 14px;\n\n  /* FONT WEIGHTS */\n  --fw-regular              : 400;\n  --fw-bold                 : 700;\n  --fw-extra-bold           : 800;\n  --fw-p                    : var(--fw-extra-regular);\n  --fw-html                 : var(--fw-extra-regular);\n  --fw-h1                   : var(--fw-extra-bold);\n  --fw-h2                   : var(--fw-extra-bold);\n  --fw-h3                   : var(--fw-extra-bold);\n  --fw-h4                   : var(--fw-extra-bold);\n  --fw-h5                   : var(--fw-extra-bold);\n  --fw-h6                   : var(--fw-extra-bold);\n\n  /* LINE HEIGHT */\n  --lh-p                    : 1.6;\n  --lh-html                 : var(--lh-p);\n  --lh-h1                   : 1.25;\n  --lh-h2                   : 1.25;\n  --lh-h3                   : 1.25;\n  --lh-h4                   : 1.25;\n  --lh-h5                   : 1.25;\n  --lh-h6                   : 1.25;\n\n  /* SPACING */\n  --spacing-default         : 19px;\n  --spacing-html            : var(--spacing-default);\n  --spacing-flush           : 0px;\n  --spacing-half            : .5rem;\n  --spacing-sm              : 2rem;\n  --spacing-md              : 4rem;\n  --spacing-lg              : 6rem;\n}\n",""])},2449:(e,t,i)=>{(e.exports=i(1506)(!1)).push([e.id,'/* \n * STYLES FOR THE UC DAVIS CAMPUS THEME\n * DEPENDENT ON FELLOW CSS CUSTOM PROPERTIES FILE\n*/\nbody, html {\n  font-family      : proxima-nova,"Helvetica Neue",Helvetica,Arial,sans-serif;\n  font-size        : 16px;\n  font-weight      : var(--fw-html);\n  line-height      : var(--lh-html);\n  margin           : 0;\n  padding          : 0;\n  background-color : var(--color-white);\n  color            : var(--color-html);\n  max-width        : 100vw;\n  overflow-x: hidden;\n}\n\n/* body {\n  position: relative;\n} */\n\n@media screen and (min-width: 768px) {\n  body, html {\n    font-size: calc(16px + 14 * ((100vw - 768px) / 3072));\n  }\n  h1 {\n    font-size: 2.94rem;\n    font-weight: 700;\n  }\n  h2 {\n    font-size: 2.0995rem;\n  }\n  h3 {\n    font-size: 1.7425rem;\n  }\n  h4 {\n    font-size: 1.428rem;\n  }\n  h5 {\n    font-size: 1.207rem;\n  }\n  h6 {\n    font-size: 1rem;\n  }\n}\n@media screen and (min-width: 3840px) {\n  body, html {\n    font-size: 30px;\n  }\n}\n\n/* BASIC TYPOGRAPHY */\np, .p {\n  /* font-size: var(--fs-p); */\n  font-weight: var(--fw-p);\n  line-height: var(--lh-p);\n  color: var(--color-p);\n}\n\n/* HEADINGS */\nh1, .h1 {\n  /* font-size: var(--fs-h1); */\n  /* font-weight: var(--fw-h1); */\n  /* font-size: 1.91rem; */\n  color: var(--color-h1);\n  line-height: var(--lh-h1);\n}\nh2, .h2 {\n  /* font-size: var(--fs-h2); */\n  /* font-weight: var(--fw-h2); */\n  /* font-size: 1.6055rem; */\n  color: var(--color-h2);\n  line-height: var(--lh-h2);\n}\nh3, .h3 {\n  /* font-size: var(--fs-h3); */\n  /* font-weight: var(--fw-h3); */\n  /* font-size: 1.3325rem; */\n  color: var(--color-h3);\n  line-height: var(--lh-h3);\n}\nh4, .h4 {\n  /* font-size: var(--fs-h4); */\n  /* font-weight: var(--fw-h4); */\n  /* font-weight: 1.092rem; */\n  color: var(--color-h4);\n  line-height: var(--lh-h4);\n}\nh5, .h5 {\n  /* font-size: var(--fs-h5); */\n  /* font-weight: var(--fw-h5); */\n  /* font-weight: 1rem; */\n  color: var(--color-h5);\n  line-height: var(--lh-h5);\n}\nh6, .h6 {\n  /* font-size: var(--fs-h6); */\n  /* font-weight: var(--fw-h6); */\n  color: var(--color-h6);\n  line-height: var(--lh-h6);\n}\nh1.color-light, .h1.color-light {\n  color: var(--color-h1-light);\n}\nh2.color-light, .h2.color-light {\n  color: var(--color-h2-light);\n}\nh3.color-light, .h3.color-light {\n  color: var(--color-h3-light);\n}\nh4.color-light, .h4.color-light {\n  color: var(--color-h4-light);\n}\nh5.color-light, .h5.color-light {\n  color: var(--color-h5-light);\n}\nh6.color-light, .h6.color-light {\n  color: var(--color-h6-light);\n}\n\n/* LINKS */\na {\n  color: var(--color-a);\n}\na:visited {\n  /* color: var(--color-a-visited); */\n}\na:hover {\n  color: var(--color-a-hover);\n}\na:active {\n  color: var(--color-a-active);\n}\na:focus {\n  color: var(--color-a-focus);\n}\nh1 > a, .h1 > a, \nh2 > a, .h2 > a, \nh3 > a, .h3 > a, \nh4 > a, .h4 > a, \nh5 > a, .h5 > a, \nh6 > a, .h6 > a {\n  text-decoration: underline;\n  color: inherit;\n}\nh1 > a:hover, .h1 > a:hover,\nh2 > a:hover, .h2 > a:hover,\nh3 > a:hover, .h3 > a:hover,\nh4 > a:hover, .h4 > a:hover,\nh5 > a:hover, .h5 > a:hover,\nh6 > a:hover, .h6 > a:hover {\n  text-decoration: none;\n  color: inherit;\n}\nh1 > a:active, .h1 > a:active,\nh2 > a:active, .h2 > a:active,\nh3 > a:active, .h3 > a:active,\nh4 > a:active, .h4 > a:active,\nh5 > a:active, .h5 > a:active,\nh6 > a:active, .h6 > a:active {\n  text-decoration: none;\n  color: inherit;\n}\nh1 > a:focus, .h1 > a:focus,\nh2 > a:focus, .h2 > a:focus,\nh3 > a:focus, .h3 > a:focus,\nh4 > a:focus, .h4 > a:focus,\nh5 > a:focus, .h5 > a:focus,\nh6 > a:focus, .h6 > a:focus {\n  text-decoration: none;\n  color: inherit;\n}\n/* h1 > a:visited, .h1 > a:visited,\nh2 > a:visited, .h2 > a:visited,\nh3 > a:visited, .h3 > a:visited,\nh4 > a:visited, .h4 > a:visited,\nh5 > a:visited, .h5 > a:visited,\nh6 > a:visited, .h6 > a:visited {\n  text-decoration: underline;\n} */\n\n/* */\n[hidden] {\n  display: none !important;\n}',""])},6491:(e,t,i)=>{(e.exports=i(1506)(!1)).push([e.id,"html {\n\n  /* DAMS PRIMARY INTERFACE COLOR PALETTE */\n  --color-dams-primary          : var(--color-aggie-blue);\n  --color-dams-primary-g1       : var(--color-aggie-blue-60);\n  --color-dams-primary-g2       : var(--color-aggie-blue-50);\n  --color-dams-primary-g3       : var(--color-aggie-blue-40);\n  --color-dams-primary-g4       : var(--color-aggie-blue-20);\n  --color-dams-secondary        : var(--color-aggie-gold);\n  --color-dams-alt              : var(--color-putah-creek);\n  --color-dams-text             : var(--color-html);\n\n  /* DAMS WATER COLORS */\n  --color-dams-wc-1             : var(--color-quad);\n  --color-dams-wc-2             : var(--color-arboretum);\n  --color-dams-wc-3             : var(--color-pinot);\n  --color-dams-wc-4             : var(--color-strawberry);\n\n  /* DAMS GRADIENTS */\n  --gradient-dams-blue          : linear-gradient(0deg, rgba(111,207,235,0.8), rgba(2, 40, 81, 0.8) 100%);\n\n  /* CAMPUS STYLE OVERRIDES */\n  --color-a-hover               : var(--color-dams-alt);\n\n  /* POLYMER COLOR VARIABLES?? */\n  --default-primary-color : var(--color-dams-primary) !important;\n  --light-primary-color   : var(--color-dams-primary-g1) !important;\n\n  --default-secondary-color : var(--color-dams-secondary) !important;\n  --light-secondary-color   : var(--color-dams-alt ,#9be7ff) !important;\n  --dark-secondary-color    : var(--color-gunrock , #2286c3) !important;\n\n  --medium-background-color : #B2BDCF !important;\n  --light-background-color : #D6DCE6 !important;\n  --super-light-background-color: #ffffff !important;\n\n  --text-primary-color      : var(--color-dams-text) !important;\n  --primary-text-color      : var(--color-dams-text) !important;\n  --secondary-text-color    : var(--color-dams-secondary) !important;\n  --inverse-text-color      : var(--color-white) !important;\n  --gray-text               : var(--color-black-50) !important;\n  --text-disabled           : var(--gray-text) !important;\n\n  --color-grey              : #808080;\n  --color-light-yellow      : #ede2c0;\n\n  --max-width               : 1200px;\n  --max-text-width          : 650px;\n\n  --layout-sm               : 768px;\n  --grid-cell-width         : 250px;\n\n  --default-outline         : 0px dotted var(--default-secondary-color);\n\n  --paper-icon-button-ink-color : transparent;\n\n  /*\n  * ucdlib-icon styles\n  */\n  --ucdlib-icon-width       : 45%;\n  --ucdlib-icon-height      : 45%;\n  --ucdlib-icon-fill-color  : var(--color-dams-primary);\n  /* stroke: var(--ucdlib-icon-stroke-color, none); */\n\n  /**\n  * Custom mixins\n  */\n  --cork-drop-down-arrow-color: var(--default-primary-color);\n}\n",""])},1063:(e,t,i)=>{(e.exports=i(1506)(!1)).push([e.id,'/* Default typography */\n\nbutton {\n  margin: 0;\n  padding: 0;\n}\n\ninput {\n  border-radius: 0;\n}\n\ninput, select, button {\n  font-size        : var(--fs-p);\n  font-weight      : var(--fw-regular);\n  color            : var(--text-primary-color);\n  font-family      : proxima-nova,"Lucida Grande","Lucida Sans","Helvetica Neue",Helvetica,Arial,sans-serif;\n  }\n\na:focus, button:focus, select:focus, div[tabindex]:focus {\n  outline: var(--default-outline);\n}\n\npaper-icon-button {\n  border: 2px solid transparent;\n  /*background-color: var(--default-primary-color);*/\n}\n\npaper-icon-button:focus {\n  border: var(--default-outline);\n  border-radius: 20px;\n}\n\nmain {\n  display: flex;\n  justify-content: center;\n}\n\nmain > * {\n  max-width: 1000px;\n  width: 100%;\n}\n\nul.menu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n\na.italic {\n  color: var(--default-secondary-color);\n  font-style: italic;\n}\n\na.gold {\n  color: var(--default-secondary-color);\n}\n\n.text-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.text-container > * {\n  max-width: var(--max-text-width);\n  width: 100%;\n}\n\n.container {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n}\n\n.container > * {\n  max-width: var(--max-width);\n  width: 100%;\n  justify-content: center;\n}\n\n/** EVERYTHING BELOW HERE IS BEING USED. NEED TO AUDIT ABOVE RULES **/\n\ncork-pagination {\n  --cork-color : var(--color-dams-primary);\n  --cork-background-color : var(--color-dams-secondary);\n}\n\n.solid-line-break {\n  margin: 1rem 0;\n  height: 2px;\n  background-color: var(--color-aggie-blue-40);\n}\n\n.header-dots {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 90px;\n  margin: var(--spacing-default) auto var(--spacing-sm) auto;\n}\n.dot {\n  border-radius: 50%;\n  background-color: var(--color-dams-secondary);\n  max-width: 7px;\n  padding: 0;\n  margin: 0;\n}\n.header-dots .dot {\n  width: 7px;\n  height: 7px;\n}\nh2 .fw-light {\n  font-weight: var(--fw-regular);\n}\n@media (min-width: 767px) {\n}\n\n@media (min-width: 1601px) {\n\n}',""])},1506:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var i=function(e,t){var i,r=e[1]||"",o=e[3];if(!o)return r;if(t&&"function"==typeof btoa){var n=(i=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),a=o.sources.map((function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"}));return[r].concat(a).concat([n]).join("\n")}return[r].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+i+"}":i})).join("")},t.i=function(e,i){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var n=this[o][0];"number"==typeof n&&(r[n]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(i&&!a[2]?a[2]=i:i&&(a[2]="("+a[2]+") and ("+i+")"),t.push(a))}},t}},1403:e=>{"use strict";"undefined"!=typeof self?e.exports=self:"undefined"!=typeof window?e.exports=window:e.exports=Function("return this")()},1913:(e,t,i)=>{"use strict";var r=i(8427),o=i(1403),n=i(9958),a=i(4101),s=n(),l=function(){return s};r(l,{getPolyfill:n,implementation:o,shim:a}),e.exports=l},9958:(e,t,i)=>{"use strict";var r=i(1403);e.exports=function(){return"object"==typeof i.g&&i.g&&i.g.Math===Math&&i.g.Array===Array?i.g:r}},4101:(e,t,i)=>{"use strict";var r=i(8427),o=i(9958);e.exports=function(){var e=o();if(r.supportsDescriptors){var t=Object.getOwnPropertyDescriptor(e,"globalThis");t&&(!t.configurable||!t.enumerable&&t.writable&&globalThis===e)||Object.defineProperty(e,"globalThis",{configurable:!0,enumerable:!1,value:e,writable:!0})}else"object"==typeof globalThis&&globalThis===e||(e.globalThis=e);return e}},3396:(e,t,i)=>{var r=i(6085);r&&r.__esModule&&(r=r.default),e.exports="string"==typeof r?r:r.toString()},6665:(e,t,i)=>{var r=i(2449);r&&r.__esModule&&(r=r.default),e.exports="string"==typeof r?r:r.toString()},2291:(e,t,i)=>{var r=i(6491);r&&r.__esModule&&(r=r.default),e.exports="string"==typeof r?r:r.toString()},962:(e,t,i)=>{var r=i(1063);r&&r.__esModule&&(r=r.default),e.exports="string"==typeof r?r:r.toString()},7568:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>d});var r=i(2959),o=i(3569);class n extends r.BaseStore{constructor(){super(),this.data={manifest:{}},this.events={CLIENT_MEDIA_MANIFEST_UPDATE:"client-media-manifest-update"}}setManifestLoading(e,t){this._setManifest(e,{id:e,state:this.STATE.LOADING,request:t})}setManifestError(e,t){this._setManifest(e,{id:e,state:this.STATE.ERROR,error:t})}setManifestLoaded(e,t){this._setManifest(e,{id:e,state:this.STATE.LOADED,payload:t})}_setManifest(e,t){this.data.manifest[e]=o(t),this.emit(this.events.CLIENT_MEDIA_MANIFEST_UPDATE,e)}}const a=new n;class s extends r.BaseService{constructor(){super(),this.store=a,this.baseUrl="/fin/archive"}async downloadMediaZip(e,t){return this.request({url:`${this.baseUrl}${e?"?name="+e:""}}`,json:!0,fetchOptions:{method:"POST",body:t},checkCached:()=>null,onLoading:null,onLoad:null,onError:null})}async getManifest(e){return this.request({url:e,json:!0,checkCached:()=>this.store.data.manifest[e],onLoading:t=>this.store.setManifestLoading(e,t),onLoad:t=>this.store.setManifestLoaded(e,t.body),onError:t=>this.store.setManifestError(e,t)})}}const l=new s;class c extends r.BaseModel{constructor(){super(),this.TYPES={IMAGE_LIST:"http://digital.ucdavis.edu/schema#ImageList",IMAGE_LIST_360:"http://digital.ucdavis.edu/schema#ImageList360"},this.service=l,this.store=a,this.register("MediaModel")}async downloadMediaZip(e="",t=[]){return await this.service.downloadMediaZip(e,t)}async getManifest(e){let t=this.store.data.manifest[e];return t?t.state===this.store.STATE.LOADING&&await t.request:await this.service.getManifest(e),this.store.data.manifest[e]}}const d=new c},2065:(e,t,i)=>{"use strict";i.r(t),i.d(t,{AppStateModel:()=>p,AppStateStore:()=>m});var r=i(2959),o=i(5444);let n,a,s,l=window.location;function c(e){if(!e.defaultPrevented){var t=function(e){if(0!==e.button)return null;if(e.metaKey||e.ctrlKey)return null;for(var t=e.composedPath(),i=null,r=0;r<t.length;r++){var o=t[r];if("A"===o.tagName&&o.href){i=o;break}}if(!i)return null;if("_blank"===i.target)return null;if(("_top"===i.target||"_parent"===i.target)&&window.top!==window)return null;if(i.download)return null;var a,s,c,d=i.href;if(a=null!=document.baseURI?new URL(d,document.baseURI):new URL(d),s=l.origin?l.origin:l.protocol+"//"+l.host,a.origin)c=a.origin;else{var h=a.host,p=a.port,u=a.protocol;("https:"===u&&"443"===p||"http:"===u&&"80"===p)&&(h=a.hostname),c=u+"//"+h}if(c!==s)return null;var m=a.pathname+a.search+a.hash;return"/"!==m[0]&&(m="/"+m),n&&!n.test(m)?null:new URL(m,l.href).href}(e);t&&(e.preventDefault(),t!==l.href&&(window.history.pushState({},"",t),a()))}}const d=function(e){n=function(e){let t=e.map((e=>"/"+e+"(\\?|#|/|$).*"));t.push("/(\\?|#)+.*"),t.push("/");let i="^("+t.join("|")+")$";return i=new RegExp(i,"i"),i}(e.appRoutes),s=e.appRoutes,a=e.callback,e.debug&&function(){let e=history.pushState,t=history.replaceState;history.pushState=function(t){let i=new CustomEvent("history-push-state",{detail:t});return window.dispatchEvent(i),e.apply(history,arguments)},history.replaceState=function(e){let i=new CustomEvent("history-replace-state",{detail:e});return window.dispatchEvent(i),t.apply(history,arguments)},window.addEventListener("history-push-state",(e=>console.log("history-push-state",e.detail))),window.addEventListener("history-replace-state",(e=>console.log("history-replace-state",e.detail)))}(),document.addEventListener("click",c)};class h extends r.BaseModel{constructor(){super(),this.register("AppStateModel")}init(e){d({appRoutes:e,callback:e=>{this._replaceHistoryState(),this._onLocationChange()}}),this._setLocationObject();let t=this._getFullPath();window.history.replaceState({location:this.location},null,t),this._onLocationChange(),window.addEventListener("popstate",(e=>{e.state&&(this.location=e.state.location,this._onLocationChange())}))}_replaceHistoryState(e){this._setLocationObject(e),window.history.replaceState({location:this.location},null,this.location.fullpath)}setLocation(e){if("object"==typeof e){let t=e.path;if(e.qs){let i=[];for(let t in e.qs)i.push(encodeURIComponent(t)+"="+encodeURIComponent(e.qs[t]));t+="?"+i.join("&")}e.hash&&(t+="#"+e.hash),e=t}window.history.state&&window.history.state.location&&window.history.state.location.fullpath===e||(window.history.pushState({},null,e),this._replaceHistoryState(e),this._onLocationChange())}_setLocationObject(e){return this.location={fullpath:e||this._getFullPath(),pathname:window.location.pathname.replace(/^\/+/,"/"),path:window.location.pathname.replace(/(^\/+|\/+$)/g,"").split("/"),query:o.parse(window.location.search),hash:window.location.hash.replace(/^#/,"")},location}_getFullPath(){return window.location.href.replace(window.location.origin,"").replace(/^\/+/,"/")}_onLocationChange(){this.set({location:this.location})}async get(){return this.store.data}set(e){return this.store.set(e),this.get()}}const p=h;class u extends r.BaseStore{constructor(){super(),this.data={location:{}},this.events={APP_STATE_UPDATE:"app-state-update"}}set(e){this.stateChanged(this.data,e)&&(this.data=Object.assign({},this.data,e),this.emit(this.events.APP_STATE_UPDATE,this.data))}get(){return this.data}}const m=u},2959:(e,t,i)=>{"use strict";i.r(t),i.d(t,{BaseMixin:()=>A,BaseModel:()=>v,BaseService:()=>w,BaseStore:()=>_,EventBus:()=>c,LitCorkUtils:()=>C,LruStore:()=>k,Mixin:()=>E,PayloadUtils:()=>I,Registry:()=>h,getLogger:()=>y,setLoggerConfig:()=>g});var r=i(2442);let o="undefined"!=typeof window;function n(e,t){o&&(window._corkAppUtils[e]=t)}function a(e){return o?window._corkAppUtils[e]:null}o&&!window._corkAppUtils&&(window._corkAppUtils={});class s extends r.EventEmitter{constructor(){super();let e=1e4;"undefined"!=typeof window&&window.EVENT_BUS_MAX_LISTENERS&&(e=window.EVENT_BUS_MAX_LISTENERS),this.setMaxListeners(e)}}let l=a("EventBus");l||(l=new s,n("EventBus",l));const c=l;let d=a("Registery");d?console.log("Registry already exists"):(d=new class{constructor(){this.models={},this.onLoadHandlers=[],this.injectHandlers=[],this.isReady=!1}addLoadHandler(e){if(!0===this.isReady)return e();this.onLoadHandlers.push(e)}addInjectHandler(e){if(!0===this.isReady)throw new Error("addInjectHandler needs to be called before ready()");this.injectHandlers.push(e)}registerModel(e,t){if(this.models[e])throw new Error(`A model has already been registered with name: ${e}`);this.models[e]=t}getModel(e){if(!this.models[e])throw new Error(`No model has been registered with name: ${e}`);return this.models[e]}ready(){for(let e of this.injectHandlers)e(this);this.isReady=!0;for(let e of this.onLoadHandlers)e(this)}},n("Registery",d),console.log("Registry created"));const h=d,p={};let u={};if("undefined"!=typeof window){let e=new URLSearchParams(window.location.search);e.has("loglevels")&&(window.logLevels||(window.logLevels={}),e.get("loglevels").split(",").forEach((e=>{let[t,i]=e.split(":");window.logLevels[t.trim()]=i.trim()}))),e.has("loglevel")&&(window.logLevel=e.get("loglevel")),e.has("disablecallerinfo")&&(window.disableLoggerCallerInfo="true"===e.get("disablecallerinfo"))}class m{constructor(e){this.name=e,this._initDefaultLevel()}_initDefaultLevel(){u.logLevels?.[this.name]?this.defaultLevel=u.logLevels[this.name]:this.defaultLevel=u.logLevel||"info"}get levelInt(){switch(this.level){case"debug":return 0;case"info":return 1;case"warn":return 2;case"error":return 3}}get level(){return window.logLevels&&window.logLevels[this.name]?window.logLevels[this.name]:this.defaultLevel}debug(...e){this.levelInt>0||console.log(`[${this.name}] debug ${this._getCallerLine()}:${this._twoLineFormat()}`,...e)}info(...e){this.levelInt>1||console.log(`[${this.name}] info ${this._getCallerLine()}:${this._twoLineFormat()}`,...e)}warn(...e){this.levelInt>2||console.warn(`[${this.name}] warn ${this._getCallerLine()}:${this._twoLineFormat()}`,...e)}error(...e){this.levelInt>3||(console.error(`[${this.name}] error ${this._getCallerLine()}:${this._twoLineFormat()}`,...e),u.reportErrors&&(e.unshift(`[${this.name}] error ${this._getCallerLine(!0)}:\n`),this.reportError(e)))}_twoLineFormat(){return u.disableCallerInfo?"":"\n"}_getCallerLine(e=!1){if(u.disableCallerInfo&&!1===e)return"";try{throw new Error}catch(e){let t,i,r,o=e.stack.split("\n");return o[0]&&0===o[0].indexOf("Error")?([t,i,r]=o[3].trim().split(" "),`${i} ${r}`):o.length>=3?([i,r]=o[2].trim().split("@"),`${i} ${r}`):""}}reportError(e){f(this.name,e)}}function g(e={}){u=e,u.logLevels||(u.logLevels={}),window.logLevel&&(u.logLevel=window.logLevel),window.disableLoggerCallerInfo&&(u.disableCallerInfo=window.disableLoggerCallerInfo);for(let e in p)p[e]._initDefaultLevel();u.reportErrors&&u.reportErrors.enabled&&(u.reportErrors.url||(console.warn("No error reporting URL set, ignoring error reporting"),u.reportErrors=null),window.addEventListener("error",(e=>{let{message:t,filename:i,lineno:r,colno:o,error:n}=e;f("window",{message:t,filename:i,lineno:r,colno:o,stack:n.stack,event:"error"})}),{passive:!0}),window.addEventListener("unhandledrejection",(e=>{let t=e.reason;t instanceof Error?f("window",{message:t.message,stack:t.stack,event:"unhandledrejection"}):f("window",t)}),{passive:!0}))}function f(e,t){if(!u.reportErrors)return;if(!u.reportErrors.enabled)return;let i={"Content-Type":"application/json"};u.reportErrors.key&&(i["x-api-key"]=u.reportErrors.key),u.reportErrors.headers&&(i=Object.assign(i,u.reportErrors.headers));let r={error:t,name:e,pathname:window.location.pathname,search:window.location.search,sourceMapUrl:u.reportErrors.sourceMapUrl,sourceMapExtension:u.reportErrors.sourceMapExtension};r.sourceMapUrl&&0!==r.sourceMapUrl.indexOf("http")&&(r.sourceMapUrl=window.location.origin+r.sourceMapUrl),u.reportErrors.customAttributes&&(r=Object.assign(r,u.reportErrors.customAttributes)),fetch(u.reportErrors.url,{method:u.reportErrors.method||"POST",headers:i,body:JSON.stringify(r)}).catch((e=>{console.error("Error reporting failed:",e)}))}function y(e){return p[e]||(p[e]=new m(e)),p[e]}"undefined"!=typeof window&&(window.LOGGER_CONFIG_VAR?g(window[window.LOGGER_CONFIG_VAR]):window.APP_CONFIG&&window.APP_CONFIG.logger&&g(window.APP_CONFIG.logger));class v{get EventBus(){return c}get Registry(){return h}_initLogger(e){this._logger||(e||(e=this.constructor.name),this._logger=y(e))}get logger(){return this._initLogger(),this._logger}register(e){e||console.warn("Name not passed to register().  This will fail in IE, cause, you know, IE.");var t=e||this.__proto__.constructor.name;h.registerModel(t,this)}inject(...e){this.Registry.addInjectHandler((()=>{e.forEach((e=>{this[e]=h.getModel(e)}))}))}emit(e,t){setTimeout((()=>{c.emit(e,t)}),0)}}var b=i(1951);class _{constructor(){this.STATE={INIT:"init",LOADING:"loading",LOADED:"loaded",ERROR:"error",SAVING:"saving",SAVE_ERROR:"save-error",SAVE_SUCCESS:"save-success",DELETING:"deleting",DELETE_ERROR:"delete-error",DELETED:"deleted"}}get EventBus(){return c}set(e,t,i){if(!e.id)throw new Error("Cannot set data without an id");if(!e.state)throw new Error("Cannot set data without a state");if(!t)throw new Error("Cannot set data without a store");t.set(e.id,e),i||(i=t.name.replace(/[\s\._]/g,"-").toLowerCase()+"-updated"),this.emit(i,e)}emit(e,t){setTimeout((()=>{c.emit(e,t)}),0)}stateChanged(e,t){return!((e||!t)&&(!e||t)&&(!e&&!t||e.state===t.state&&b(e,t)))}}class w{constructor(){this.rootUrl="","undefined"!=typeof window&&(this.rootUrl=window.location.protocol+"//"+window.location.host),this.ERROR_MESSAGES={REQUEST:"Request Error",STATUS_CODE:"Invalid status code",JSON:"Invalid JSON response",APPLICATION_ERROR:"Application Error"}}async request(e){if(!e.store){if(!this.store)return console.error(new Error("No store provided"));e.store=this.store}if(e.fetchOptions||(e.fetchOptions={}),e.fetchOptions.credentials||(e.fetchOptions.credentials="include"),e.json&&e.fetchOptions&&e.fetchOptions.body&&"object"==typeof e.fetchOptions.body&&(e.fetchOptions.body=JSON.stringify(e.fetchOptions.body),e.fetchOptions.headers||(e.fetchOptions.headers={}),e.fetchOptions.headers["Content-Type"]="application/json"),e.qs){let i=[];for(var t in e.qs)i.push(`${t}=${encodeURIComponent(e.qs[t])}`);e.url+="?"+i.join("&")}if(e.checkCached){var i=e.checkCached();if(this.isLoaded(i))return i;if(this.isLoading(i)){if(!i.request)throw new Error("checkCached set but no request object found",i);return i.request}}let r=this._request(e);return e.onLoading&&e.onLoading(r),e.onUpdate&&e.onUpdate({request:r}),await r}_request(e){return e.fetchOptions||(e.fetchOptions={}),new Promise((async(t,i)=>{var r=null;try{r=await fetch(e.url,e.fetchOptions)}catch(i){return this._handleError(e,t,{error:!0,details:i,response:r,message:this.ERROR_MESSAGES.REQUEST})}if(r.status<200||r.status>299)return this._handleError(e,t,{error:!0,response:r,message:this.ERROR_MESSAGES.STATUS_CODE});if(r.headers.has("Content-Type")&&r.headers.get("Content-Type").match(/application\/json/i)){var o=null;try{o=await r.text(),o=JSON.parse(o)}catch(i){return this._handleError(e,t,{error:!0,details:i,response:r,message:this.ERROR_MESSAGES.JSON})}if(null===o&&(o={error:!0,message:"null body response from service"}),o.error)return this._handleError(e,t,{error:!0,details:o,response:r,message:this.ERROR_MESSAGES.APPLICATION_ERROR})}else o=await r.text();e.onLoad&&e.onLoad({response:r,body:o}),e.onUpdate&&e.onUpdate({payload:o}),t({response:r,body:o})}))}async _handleError(e,t,i){if(i.response&&!i.payload)try{if(i.payload=await i.response.text(),i.response.headers.has("Content-Type")&&i.response.headers.get("Content-Type").match(/application\/json/i))try{i.payload=JSON.parse(i.payload)}catch(e){}}catch(e){}e.onError&&e.onError(i),e.onUpdate&&e.onUpdate({error:i}),t(i)}isLoaded(e){return this.store?!(!e||e.state!==this.store.STATE.LOADED):console.warn("Checking LOADED state but no store set for service")}isLoading(e){return this.store?!(!e||e.state!==this.store.STATE.LOADING):console.warn("Checking LOADED state but no store set for service")}async checkRequesting(e,t,i){let r=t.get(e);this.isLoading(r)?await r.request:await i()}}class x{ready(){this.listening=!0}}"undefined"!=typeof window&&(window.BaseMixin=x);const A=x;class S{constructor(e){this.superclass=e}with(...e){return e.reduce(((e,t)=>t(e)),this.superclass)}}const E=e=>new S(e),C=e=>class extends e{static get properties(){return{listening:{type:Boolean}}}set bind(e){this._bind=Object.assign(this.bind,e)}get bind(){return this._bind||(this._bind={}),this._bind}constructor(){super(),this.bind={},this._eb_handlers={},this._eb_handlersSet=!1,this._eb_unregisterOnDetach=!0,this._debounce_handlers={},this.listening=!0}connectedCallback(){super.connectedCallback(),this._eb_init()}_initLogger(e){this._logger||(e||(e=this.nodeName.toLowerCase()),this._logger=y(e))}get logger(){return this._initLogger(),this._logger}_eb_init(){if(!this._eb_handlersSet)for(var e in this._eb_handlersSet=!0,this.logger.debug(this.nodeName,"ready and connected to DOM, attaching event listeners",this.bind),this.bind)this[this.bind[e]]?this._eb_init_fn(e):this.logger.warn(`${this.nodeName} could not bind event ${e} to ${this.bind[e]}`)}_eb_init_fn(e){this[this.bind[e]]=this[this.bind[e]].bind(this),this._eb_handlers[e]=(...t)=>{this.listening?(this.logger.debug(this.nodeName,"received event",e,", triggering function:",this.bind[e]),this[this.bind[e]].apply(this,t)):this.logger.debug(this.nodeName,"ignoring",e,"event, element not listening")},c.on(e,this._eb_handlers[e])}disconnectedCallback(){if(super.disconnectedCallback(),this.logger.debug(this.nodeName,"disconnected from DOM, removing event listeners"),this._eb_unregisterOnDetach&&this._eb_handlersSet)for(var e in this._eb_handlersSet=!1,this.bind){if(!this[this.bind[e]])continue;let t=c.listenerCount(e);c.removeListener(e,this._eb_handlers[e]),c.listenerCount(e)!==t-1&&this.logger.warn(this.nodeName,"On element detach, failed to remove event listener for: ",e),this.logger.debug(this.nodeName,"removing event listener for:",e)}}EventBus(){return c}_injectModel(...e){e.forEach((e=>{"string"==typeof e?this._injectModelStr(e):this._bindModelObj(e)}))}_injectModelStr(e){this[e]=h.getModel(e),this._bindModelObj(this[e])}_bindModelObj(e){e.events&&this._registerModelEvents(e.events),e.store&&e.store.events&&this._registerModelEvents(e.store.events)}_registerModelEvents(e){for(var t in e){var i=this._getMethodNameFromEvent(e[t]);this[i]?(this.logger.debug(this.nodeName,"auto-bind:",i+" -> "+e[t],!0),this.bind[e[t]]=i):this.logger.debug(this.nodeName,"auto-bind:",i+" -> "+e[t],!1)}}_getMethodNameFromEvent(e){return"_on"+e.split("-").map((e=>e.charAt(0).toUpperCase()+e.slice(1))).join("")}emit(e,t){c.emit(e,t)}fire(e,t={}){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}updated(e){e.has("listening")&&this._onListenUpdate(),super.updated()}_onListenUpdate(){}},k=class{constructor(e={}){if(!e.name)throw new Error("LruStore requires a name");e.maxSize||(e.maxSize=50),this.logger=y("lru-store"),this.name=e.name,this.maxSize=e.maxSize,this.cache=new Map}get(e){if(!this.cache.has(e))return null;const t=this.cache.get(e);return t.lastUsed=Date.now(),t.value}set(e,t){this.cache.set(e,{value:t,lastUsed:Date.now()}),this.clean()}clean(){this.debounceTimer&&clearTimeout(this.debounceTimer),this.debounceTimer=setTimeout((()=>{this.debounceTimer=null,this._clean()}),1e3)}_clean(){if(this.cache.size<=this.maxSize)return;let e=[];this.cache.forEach(((t,i)=>{e.push({key:i,lastUsed:t.lastUsed})})),e.sort(((e,t)=>t.lastUsed-e.lastUsed));let t=Date.now();for(let i=this.maxSize;i<e.length;i++)e[i].lastUsed=t-e[i].lastUsed,this.logger.debug(this.name+" removing ",e[i])}},L=["id","state","request","payload","error"],I=class{constructor(e={}){if(this.idParts=e.idParts,this.customKeyFormat=e.customKeyFormat,this.separator=e.separator||"/",this.asJson=e.asJson||!1,!this.idParts)throw new Error("idParts is required")}getKey(e){let t=this.asJson?{}:[];for(let i of this.idParts)void 0!==e[i]&&(this.customKeyFormat&&this.customKeyFormat[i]?this._addKeyPart(t,i,this.customKeyFormat[i](e[i])):this._addKeyPart(t,i,e[i]));return t.join(this.separator)}_addKeyPart(e,t,i){this.isJson?e[t]=i:e.push(t+":"+i)}generate(e,t={},i){let r=this.getKey(e);if(!i)if(void 0!==t.error)i="ERROR";else if(void 0!==t.request)i="LOADING";else{if(void 0===t.payload)throw new Error("No state provided");i="LOADED"}let o={id:r,state:i,request:t.request,payload:t.payload,error:t.error};for(let t in e)L.indexOf(t)>-1||void 0===o[t]&&(o[t]=e[t]);return o}};n("lib",{BaseModel:v,BaseStore:_,BaseService:w,BaseMixin:A,Mixin:E,EventBus:c,LitCorkUtils:C,Registry:h,LruStore:k,getLogger:y,setLoggerConfig:g,PayloadUtils:I})},109:(e,t,i)=>{"use strict";i.d(t,{XM:()=>o,Xe:()=>n,pX:()=>r});const r={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},o=e=>(...t)=>({_$litDirective$:e,values:t});class n{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}},5507:(e,t,i)=>{"use strict";i.d(t,{$:()=>n});var r=i(543),o=i(109);const n=(0,o.XM)(class extends o.Xe{constructor(e){var t;if(super(e),e.type!==o.pX.ATTRIBUTE||"class"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){var i,o;if(void 0===this.it){this.it=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((e=>""!==e))));for(const e in t)t[e]&&!(null===(i=this.nt)||void 0===i?void 0:i.has(e))&&this.it.add(e);return this.render(t)}const n=e.element.classList;this.it.forEach((e=>{e in t||(n.remove(e),this.it.delete(e))}));for(const e in t){const i=!!t[e];i===this.it.has(e)||(null===(o=this.nt)||void 0===o?void 0:o.has(e))||(i?(n.add(e),this.it.add(e)):(n.remove(e),this.it.delete(e)))}return r.Jb}})},9567:(e,t,i)=>{"use strict";i.d(t,{V:()=>s});var r=i(543),o=i(109);const n="important",a=" !"+n,s=(0,o.XM)(class extends o.Xe{constructor(e){var t;if(super(e),e.type!==o.pX.ATTRIBUTE||"style"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,i)=>{const r=e[i];return null==r?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`}),"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ht){this.ht=new Set;for(const e in t)this.ht.add(e);return this.render(t)}this.ht.forEach((e=>{null==t[e]&&(this.ht.delete(e),e.includes("-")?i.removeProperty(e):i[e]="")}));for(const e in t){const r=t[e];if(null!=r){this.ht.add(e);const t="string"==typeof r&&r.endsWith(a);e.includes("-")||t?i.setProperty(e,t?r.slice(0,-11):r,t?n:""):i[e]=r}}return r.Jb}})},543:(e,t,i)=>{"use strict";var r;i.d(t,{Al:()=>H,Jb:()=>k,Ld:()=>L,YP:()=>C,dy:()=>E,sY:()=>G});const o=window,n=o.trustedTypes,a=n?n.createPolicy("lit-html",{createHTML:e=>e}):void 0,s="$lit$",l=`lit$${(Math.random()+"").slice(9)}$`,c="?"+l,d=`<${c}>`,h=document,p=()=>h.createComment(""),u=e=>null===e||"object"!=typeof e&&"function"!=typeof e,m=Array.isArray,g=e=>m(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]),f="[ \t\n\f\r]",y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,b=/>/g,_=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),w=/'/g,x=/"/g,A=/^(?:script|style|textarea|title)$/i,S=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),E=S(1),C=S(2),k=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),I=new WeakMap,M=h.createTreeWalker(h,129,null,!1);function O(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==a?a.createHTML(t):t}const P=(e,t)=>{const i=e.length-1,r=[];let o,n=2===t?"<svg>":"",a=y;for(let t=0;t<i;t++){const i=e[t];let c,h,p=-1,u=0;for(;u<i.length&&(a.lastIndex=u,h=a.exec(i),null!==h);)u=a.lastIndex,a===y?"!--"===h[1]?a=v:void 0!==h[1]?a=b:void 0!==h[2]?(A.test(h[2])&&(o=RegExp("</"+h[2],"g")),a=_):void 0!==h[3]&&(a=_):a===_?">"===h[0]?(a=null!=o?o:y,p=-1):void 0===h[1]?p=-2:(p=a.lastIndex-h[2].length,c=h[1],a=void 0===h[3]?_:'"'===h[3]?x:w):a===x||a===w?a=_:a===v||a===b?a=y:(a=_,o=void 0);const m=a===_&&e[t+1].startsWith("/>")?" ":"";n+=a===y?i+d:p>=0?(r.push(c),i.slice(0,p)+s+i.slice(p)+l+m):i+l+(-2===p?(r.push(void 0),t):m)}return[O(e,n+(e[i]||"<?>")+(2===t?"</svg>":"")),r]};class T{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,a=0;const d=e.length-1,h=this.parts,[u,m]=P(e,t);if(this.el=T.createElement(u,i),M.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(r=M.nextNode())&&h.length<d;){if(1===r.nodeType){if(r.hasAttributes()){const e=[];for(const t of r.getAttributeNames())if(t.endsWith(s)||t.startsWith(l)){const i=m[a++];if(e.push(t),void 0!==i){const e=r.getAttribute(i.toLowerCase()+s).split(l),t=/([.?@])?(.*)/.exec(i);h.push({type:1,index:o,name:t[2],strings:e,ctor:"."===t[1]?N:"?"===t[1]?j:"@"===t[1]?B:$})}else h.push({type:6,index:o})}for(const t of e)r.removeAttribute(t)}if(A.test(r.tagName)){const e=r.textContent.split(l),t=e.length-1;if(t>0){r.textContent=n?n.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],p()),M.nextNode(),h.push({type:2,index:++o});r.append(e[t],p())}}}else if(8===r.nodeType)if(r.data===c)h.push({type:2,index:o});else{let e=-1;for(;-1!==(e=r.data.indexOf(l,e+1));)h.push({type:7,index:o}),e+=l.length-1}o++}}static createElement(e,t){const i=h.createElement("template");return i.innerHTML=e,i}}function R(e,t,i=e,r){var o,n,a,s;if(t===k)return t;let l=void 0!==r?null===(o=i._$Co)||void 0===o?void 0:o[r]:i._$Cl;const c=u(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,r)),void 0!==r?(null!==(a=(s=i)._$Co)&&void 0!==a?a:s._$Co=[])[r]=l:i._$Cl=l),void 0!==l&&(t=R(e,l._$AS(e,t.values),l,r)),t}class D{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:r}=this._$AD,o=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:h).importNode(i,!0);M.currentNode=o;let n=M.nextNode(),a=0,s=0,l=r[0];for(;void 0!==l;){if(a===l.index){let t;2===l.type?t=new F(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new z(n,this,e)),this._$AV.push(t),l=r[++s]}a!==(null==l?void 0:l.index)&&(n=M.nextNode(),a++)}return M.currentNode=h,o}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class F{constructor(e,t,i,r){var o;this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cp=null===(o=null==r?void 0:r.isConnected)||void 0===o||o}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=R(this,e,t),u(e)?e===L||null==e||""===e?(this._$AH!==L&&this._$AR(),this._$AH=L):e!==this._$AH&&e!==k&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):g(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==L&&u(this._$AH)?this._$AA.nextSibling.data=e:this.$(h.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:r}=e,o="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=T.createElement(O(r.h,r.h[0]),this.options)),r);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===o)this._$AH.v(i);else{const e=new D(o,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=I.get(e.strings);return void 0===t&&I.set(e.strings,t=new T(e)),t}T(e){m(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const o of e)r===t.length?t.push(i=new F(this.k(p()),this.k(p()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class ${constructor(e,t,i,r,o){this.type=1,this._$AH=L,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=L}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const o=this.strings;let n=!1;if(void 0===o)e=R(this,e,t,0),n=!u(e)||e!==this._$AH&&e!==k,n&&(this._$AH=e);else{const r=e;let a,s;for(e=o[0],a=0;a<o.length-1;a++)s=R(this,r[i+a],t,a),s===k&&(s=this._$AH[a]),n||(n=!u(s)||s!==this._$AH[a]),s===L?e=L:e!==L&&(e+=(null!=s?s:"")+o[a+1]),this._$AH[a]=s}n&&!r&&this.j(e)}j(e){e===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class N extends ${constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===L?void 0:e}}const U=n?n.emptyScript:"";class j extends ${constructor(){super(...arguments),this.type=4}j(e){e&&e!==L?this.element.setAttribute(this.name,U):this.element.removeAttribute(this.name)}}class B extends ${constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=R(this,e,t,0))&&void 0!==i?i:L)===k)return;const r=this._$AH,o=e===L&&r!==L||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,n=e!==L&&(r===L||o);o&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class z{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){R(this,e)}}const H={O:s,P:l,A:c,C:1,M:P,L:D,R:g,D:R,I:F,V:$,H:j,N:B,U:N,F:z},q=o.litHtmlPolyfillSupport;null==q||q(T,F),(null!==(r=o.litHtmlVersions)&&void 0!==r?r:o.litHtmlVersions=[]).push("2.8.0");const G=(e,t,i)=>{var r,o;const n=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:t;let a=n._$litPart$;if(void 0===a){const e=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=a=new F(t.insertBefore(p(),e),e,void 0,null!=i?i:{})}return a._$AI(e),a}},3557:(e,t,i)=>{"use strict";i.d(t,{$:()=>r.$});var r=i(5507)},7515:(e,t,i)=>{"use strict";i.d(t,{o:()=>o});var r=i(543);const o=e=>null!=e?e:r.Ld},8279:(e,t,i)=>{"use strict";i.d(t,{V:()=>r.V});var r=i(9567)},5589:(e,t,i)=>{"use strict";i.d(t,{oi:()=>x,iv:()=>l,dy:()=>w.dy,YP:()=>w.YP});const r=window,o=r.ShadowRoot&&(void 0===r.ShadyCSS||r.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),a=new WeakMap;class s{constructor(e,t,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(o&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}}const l=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1]),e[0]);return new s(i,e,n)},c=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,n))(t)})(e):e;var d;const h=window,p=h.trustedTypes,u=p?p.emptyScript:"",m=h.reactiveElementPolyfillSupport,g={toAttribute(e,t){switch(t){case Boolean:e=e?u:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},f=(e,t)=>t!==e&&(t==t||e==e),y={attribute:!0,type:String,converter:g,reflect:!1,hasChanged:f};class v extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const r=this._$Ep(i,t);void 0!==r&&(this._$Ev.set(r,i),e.push(r))})),e}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const o=this[e];this[t]=r,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||y}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(c(e))}else void 0!==e&&t.push(c(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{o?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const i=document.createElement("style"),o=r.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=t.cssText,e.appendChild(i)}))})(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=y){var r;const o=this.constructor._$Ep(e,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(r=i.converter)||void 0===r?void 0:r.toAttribute)?i.converter:g).toAttribute(t,i.type);this._$El=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(e,t){var i;const r=this.constructor,o=r._$Ev.get(e);if(void 0!==o&&this._$El!==o){const e=r.getPropertyOptions(o),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:g;this._$El=o,this[o]=n.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let r=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||f)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}v.finalized=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==m||m({ReactiveElement:v}),(null!==(d=h.reactiveElementVersions)&&void 0!==d?d:h.reactiveElementVersions=[]).push("1.6.1");var b,_,w=i(543);class x extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=(0,w.sY)(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return w.Jb}}x.finalized=!0,x._$litElement$=!0,null===(b=globalThis.litElementHydrateSupport)||void 0===b||b.call(globalThis,{LitElement:x});const A=globalThis.litElementPolyfillSupport;null==A||A({LitElement:x}),(null!==(_=globalThis.litElementVersions)&&void 0!==_?_:globalThis.litElementVersions=[]).push("3.3.3")},3930:(e,t,i)=>{"use strict";i.r(t),Array.prototype.flat||Object.defineProperty(Array.prototype,"flat",{configurable:!0,value:function e(){var t=isNaN(arguments[0])?1:Number(arguments[0]);return t?Array.prototype.reduce.call(this,(function(i,r){return Array.isArray(r)?i.push.apply(i,e.call(r,t-1)):i.push(r),i}),[]):Array.prototype.slice.call(this)},writable:!0}),Array.prototype.flatMap||Object.defineProperty(Array.prototype,"flatMap",{configurable:!0,value:function(e){return Array.prototype.map.apply(this,arguments).flat()},writable:!0})},9486:e=>{"use strict";e.exports=JSON.parse('{"http://rightsstatements.org/vocab/InC/1.0/":{"text":"IN COPYRIGHT","icon":"InC"},"http://rightsstatements.org/vocab/InC-OW-EU/1.0/":{"text":"IN COPYRIGHT - EU ORPHAN WORK","icon":"InC"},"http://rightsstatements.org/vocab/InC-EDU/1.0/":{"text":"IN COPYRIGHT - EDUCATIONAL USE PERMITTED","icon":"InC"},"http://rightsstatements.org/vocab/InC-NC/1.0/":{"text":"IN COPYRIGHT - NON-COMMERCIAL USE PERMITTED","icon":"InC"},"http://rightsstatements.org/vocab/InC-RUU/1.0/":{"text":"IN COPYRIGHT - RIGHTS-HOLDER(S) UNLOCATABLE OR UNIDENTIFIABLE","icon":"InC"},"http://rightsstatements.org/vocab/NoC-NC/1.0/":{"text":"NO COPYRIGHT - NON-COMMERCIAL USE ONLY","icon":"NoC"},"http://rightsstatements.org/vocab/NoC-OKLR/1.0/":{"text":"NO COPYRIGHT - OTHER KNOWN LEGAL RESTRICTIONS","icon":"NoC"},"http://rightsstatements.org/vocab/NoC-US/1.0/":{"text":"NO COPYRIGHT - UNITED STATES","icon":"NoC"},"http://rightsstatements.org/vocab/CNE/1.0/":{"text":"COPYRIGHT NOT EVALUATED","icon":"Other"},"http://rightsstatements.org/vocab/UND/1.0/":{"text":"COPYRIGHT UNDETERMINED","icon":"Other"},"http://rightsstatements.org/vocab/NKC/1.0/":{"text":"NO KNOWN COPYRIGHT","icon":"Other"}}')}},__webpack_module_cache__={},leafPrototypes,getProto,inProgress;function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var i=__webpack_module_cache__[e]={id:e,loaded:!1,exports:{}};return __webpack_modules__[e].call(i.exports,i,i.exports,__webpack_require__),i.loaded=!0,i.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(t,{a:t}),t},getProto=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,__webpack_require__.t=function(e,t){if(1&t&&(e=this(e)),8&t)return e;if("object"==typeof e&&e){if(4&t&&e.__esModule)return e;if(16&t&&"function"==typeof e.then)return e}var i=Object.create(null);__webpack_require__.r(i);var r={};leafPrototypes=leafPrototypes||[null,getProto({}),getProto([]),getProto(getProto)];for(var o=2&t&&e;"object"==typeof o&&!~leafPrototypes.indexOf(o);o=getProto(o))Object.getOwnPropertyNames(o).forEach((t=>r[t]=()=>e[t]));return r.default=()=>e,__webpack_require__.d(i,r),i},__webpack_require__.d=(e,t)=>{for(var i in t)__webpack_require__.o(t,i)&&!__webpack_require__.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},__webpack_require__.f={},__webpack_require__.e=e=>Promise.all(Object.keys(__webpack_require__.f).reduce(((t,i)=>(__webpack_require__.f[i](e,t),t)),[])),__webpack_require__.u=e=>(({6:"csl",329:"page-browse",485:"page-about",589:"page-collections",628:"page-home",704:"page-record",960:"page-search",969:"video-libs"}[e]||e)+"-"+{6:"92b0bb18a2f8b51cc1e5",22:"62c661d8167ad8e07283",100:"e5613dcfde04e66f3709",121:"065729a5f836b2a17caf",329:"6907c1c7cea6abf2a00e",380:"b385450e6f80074e1bc2",485:"de4684852305b20705a5",492:"e13f40740c742edb7c2e",539:"080791ae7cac343258fa",589:"dbf8c48c35cb417c4ccb",628:"6219ccacc48b4869c999",704:"0ad666de3cdca68a79a5",749:"18ce7885df0f5d13b154",960:"be3f6c43fe5a04ce188e",969:"b3a6ee58cb8666166190"}[e]+".bundle.js"),__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),inProgress={},__webpack_require__.l=(e,t,i,r)=>{if(inProgress[e])inProgress[e].push(t);else{var o,n;if(void 0!==i)for(var a=document.getElementsByTagName("script"),s=0;s<a.length;s++){var l=a[s];if(l.getAttribute("src")==e){o=l;break}}o||(n=!0,(o=document.createElement("script")).charset="utf-8",o.timeout=120,__webpack_require__.nc&&o.setAttribute("nonce",__webpack_require__.nc),o.src=e),inProgress[e]=[t];var c=(t,i)=>{o.onerror=o.onload=null,clearTimeout(d);var r=inProgress[e];if(delete inProgress[e],o.parentNode&&o.parentNode.removeChild(o),r&&r.forEach((e=>e(i))),t)return t(i)},d=setTimeout(c.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=c.bind(null,o.onerror),o.onload=c.bind(null,o.onload),n&&document.head.appendChild(o)}},__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),__webpack_require__.p="/js/",(()=>{var e={179:0};__webpack_require__.f.j=(t,i)=>{var r=__webpack_require__.o(e,t)?e[t]:void 0;if(0!==r)if(r)i.push(r[2]);else{var o=new Promise(((i,o)=>r=e[t]=[i,o]));i.push(r[2]=o);var n=__webpack_require__.p+__webpack_require__.u(t),a=new Error;__webpack_require__.l(n,(i=>{if(__webpack_require__.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var o=i&&("load"===i.type?"missing":i.type),n=i&&i.target&&i.target.src;a.message="Loading chunk "+t+" failed.\n("+o+": "+n+")",a.name="ChunkLoadError",a.type=o,a.request=n,r[1](a)}}),"chunk-"+t,t)}};var t=(t,i)=>{var r,o,[n,a,s]=i,l=0;if(n.some((t=>0!==e[t]))){for(r in a)__webpack_require__.o(a,r)&&(__webpack_require__.m[r]=a[r]);s&&s(__webpack_require__)}for(t&&t(i);l<n.length;l++)o=n[l],__webpack_require__.o(e,o)&&e[o]&&e[o][0](),e[o]=0},i=self.webpackChunk=self.webpackChunk||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var __webpack_exports__={};(()=>{__webpack_require__(5331),__webpack_require__(3930);const e=__webpack_require__(1913);"undefined"==typeof globalThis&&(window.globalThis=e())})(),(()=>{"use strict";var e=__webpack_require__(5589);function t(){return e.dy`
    <style include="shared-styles">
      :host {
        display: block;
        /* background: var(--default-primary-color); */
        overflow: hidden;
      }

      [hidden] {
        display: none !important;
      }

      #loading {
        width: 100%;
        min-height: 700px;
        height: 75vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: white;
      }

      #loading img {
        animation: showLoading 400ms ease-in;
      }

      @keyframes showLoading {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      .footer {
        background-color: var(--color-dams-primary);
        position: absolute;
        left: 0;
        right: 0;
        z-index: -1;
      }

      .main-content {
        flex: 1;
        width: 100%;
      }

      app-search-header {
        position: relative;
        z-index: 2000;
      }

      .loading-dots {
        text-align: center;
        z-index: 5;
        color: var(--default-primary-color);
      }

      .dot {
        display: inline;
        margin-left: 0.2em;
        margin-right: 0.2em;
        position: relative;
        font-size: 3.5em;
        opacity: 1;
      }

      .dot.one {
        animation-delay: 0.2s;
      }
      .dot.two {
        animation-delay: 0.4s;
      }
      .dot.three {
        animation-delay: 0.6s;
      }

      @keyframes showHideDot {
        0% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        60% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      @media (max-width: 768px) {
        .footer.site-frame {
          padding: 0.5rem;
        }
      }
    </style>

    <app-search-header
      ?hidden="${!this.showSearchHeader}"
      @expand-search-filters=${this._expandSearchFilters}
    ></app-search-header>

      <div class="main-content">
        <ucdlib-pages
          selected="${this.page}"
          selectedAttribute="visible"
        >
        <div id="loading" ?hidden="${this.page}">
          <img src="/images/logos/logo-icon.svg" style="max-width: 128px" />
          <div class="loading-dots">
            <h1 class="dot one">.</h1>
            <h1 class="dot two">.</h1>
            <h1 class="dot three">.</h1>
          </div>
        </div>
        <app-home id="home"></app-home>
        <app-search id="search"></app-search>
        <app-record id="item" @show-404="${e=>this.page="404"}"></app-record>
        <app-browse id="browse"></app-browse>
        <app-about id="about"></app-about>
        <app-collection id="collection" @show-404="${e=>this.page="404"}"></app-collection>        
      </ucdlib-pages>

      <app-404 id="404" ?hidden="${"404"!==this.page}"></app-404>

      <div class="footer site-frame">
        <ucdlib-site-footer>
          <ucdlib-site-footer-column header="Digital Collections">
            <ul>
              <li><a href="/browse/collections">Collections</a></li>
              <li><a href="/search">Items</a></li>
              <li><a href="/about">About Digital Collections</a></li>
              <!-- <li><a href="">FAQ</a></li> -->
            </ul>
          </ucdlib-site-footer-column>
          <ucdlib-site-footer-column header="Library Info">
            <ul>
              <li>
                <a
                  href="https://library.ucdavis.edu/special-collections/"
                  target="_blank"
                  rel="noopener"
                  >Archives and Special Collections</a
                >
              </li>
              <li>
                <a
                  href="https://library.ucdavis.edu/library/"
                  target="_blank"
                  rel="noopener"
                  >Visit the Library</a
                >
              </li>
              <li>
                <a
                  href="https://library.ucdavis.edu/news/"
                  target="_blank"
                  rel="noopener"
                  >Library News</a
                >
              </li>
              <li>
                <a
                  href="http://give.ucdavis.edu/ULIB"
                  target="_blank"
                  rel="noopener"
                  >Give to the Library</a
                >
              </li>
            </ul>
          </ucdlib-site-footer-column>
          <ucdlib-site-footer-column header="Account">
            <ul>
              <li><app-auth-footer></app-auth-footer></li>
              <li class="fin-admin" ?hidden="${!this.isAdmin}">
                <a href="/fin/admin/${this.pathInfo.length>1?"#path-info"+this.pathInfo:""}">Fin Admin</a>
              </li>
            </ul>
          </ucdlib-site-footer-column>
          <div insert-into="below-address" ?hidden="${this.showVersion}">
            <div><b>Build Information</b></div>
            <div>App Version: ${this.appVersion}</div>
            <div>Build Time: ${this.localBuildTime}</div>
            <div>Build Number: ${this.buildNum}</div>
            <div>Client Env: ${this.clientEnv}</div>
            <div>Fin App Version: ${this.finAppVersion}</div>
            <div>Fin Branch Name: ${this.finBranchName}</div>
            <div>Fin Repo Tag: ${this.finRepoTag}</div>
            <div>Fin Server Image: ${this.finServerImage}</div>
            <div>Fin Server Repo Hash: ${this.finServerRepoHash}</div>
            <div>DAMS Deployment Branch: ${this.damsDeployBranch}</div>
            <div>DAMS Deployment SHA: ${this.damsDeploySha}</div>
            <div>DAMS Deployment Tag: ${this.damsDeployTag}</div>
            <div>DAMS Repo Branch: ${this.damsRepoBranch}</div>
            <div>DAMS Repo SHA: ${this.damsRepoSha}</div>
            <div>DAMS Repo Tag: ${this.damsRepoTag}</div>
          </div>
        </ucdlib-site-footer>
      </div>
    </div>
  `}var i=__webpack_require__(8077),r=__webpack_require__(5700),o=__webpack_require__(2959),n=__webpack_require__(8337);class a extends e.oi{static get properties(){return{selected:{type:String},attrForSelected:{attribute:"attr-for-selected",type:String},selectedAttribute:{attribute:"selected-attribute",type:String}}}constructor(){super(),this.mutationObserver=new n.F(this)}createRenderRoot(){return this}updated(e){(e.has("attrForSelected")||e.has("selectedAttribute")||e.has("selected"))&&this._onChange()}_onChildListMutation(){this._onChange()}_onChange(){let e=this.attrForSelected||"id",t=0;void 0===this.selected&&null===this.selected||(t="string"==typeof this.selected&&/^\d+$/.test(this.selected)?parseInt(this.selected):this.selected);let i=this._updateVisibility(t,e);!i&&this.fallbackSelection&&(t="string"==typeof this.selected&&this.selected.match(/\d+/)?parseInt(this.fallbackSelection):this.fallbackSelection,i=this._updateVisibility(t,e)),i||console.warn("ucdlib-pages was unable match: ",t)}_updateVisibility(e,t){let i,r=[...this.children],o=!1,n="number"==typeof e;for(let a=0;a<r.length;a++)n?(this._select(a===e,r[a],this.selectedAttribute),o||(o=a===e)):(i=r[a].getAttribute(t),this._select(i===e,r[a],this.selectedAttribute),o||(o=i===e));return o}_select(e,t,i){e?(i&&t.setAttribute(i,i),t.style.display="block"):(i&&t.removeAttribute(i,i),t.style.display="none")}}function s(){return e.dy`
    <style>

      .layout {
        width: 100%;
        align-items: center;
      }

      h2 {
        margin: 0;
        white-space: nowrap;
      }
      h2 a {
        color: var(--default-secondary-color);
        text-decoration: none;
      }
      /* h2 a:visited {
        color: var(--default-secondary-color);
        text-decoration: none;
      } */

      img {
        height: 50px;
      }

      .logo,
      h2 {
        padding-right: 20px;
        display: none;
      }

      .filler {
        flex: 0.25;
        display: none;
      }

      .logo-sm {
        margin-right: 10px;
      }

      iron-icon.search-icon {
        color: var(--default-primary-color);
      }

      @media (min-width: 700px) {
        .logo {
          display: block;
        }
        .logo-sm {
          display: none;
        }
      }

      @media (min-width: 815px) {
        h2 {
          display: block;
        }
      }

      @media (min-width: 1100px) {
        .filler {
          display: block;
        }
      }
      #options {
        height: 150px;
        background-color: white;
        width: 100%;
        padding: 2rem 4rem;
        vertical-align: middle;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #option {
        display: inline-block;
      }

      .searchContainer {
        padding: 1rem 0 0;
        display: flex;
        justify-content: center;
        background-color: var(--color-aggie-blue-30);
      }
      #filter-box {
        width: 100%;
        text-align: center;
        align-items: center;
        background-color: var(--color-aggie-blue-30);
        padding-bottom: 1rem;
        min-height: 16px;
      }
      .site-name-search {
        display: none;
      }
      @media (max-width: 754px) {
        .searchContainer {
          padding-top: 1rem;
        }
        .site-name-search {
          display: block;
          text-align: center;
          margin-bottom: 1rem;
          padding-top: 2rem;
        }
        .site-name-search a {
          color: var(--color-aggie-blue) !important;
        }
        app-search-box {
          width: 80%;
          margin: 0 auto;
        }
      }
      @media (max-width: 450px) {
        app-search-box {
          width: 90%;
          margin: 0 auto;
        }
      }

      .add-filter {
        width: 150px;
        height: 52px;
        background-color: var(--color-aggie-blue-80);
        color: white;
        border-radius: 35px;
        cursor: pointer;
        margin: 0 auto;
        display: flex;
      }
      .add-filter:hover {
        background-color: var(--color-aggie-blue);
      }

      .add-filter .add {
        width: 50px;
        height: 50px;
        /* display: inline-block; */
      }

      .add-filter p {
        margin: auto;
        padding-top: 1rem;
        font-size: 0.85rem;
        font-weight: bold;
      }

      .add-filter ucdlib-icon {
        fill: var(--color-aggie-gold);
        padding-top: 1rem;
        padding-left: 1rem;
      }

      .add-filter {
        display: none;
      }
      @media (max-width: 767px) {
        .add-filter {
          display: flex;
        }
      }
    </style>

    <div class="layout">
      <app-nav-bar id="foo" choices="${this.navBarChoices}"></app-nav-bar>
    </div>

    <div class="searchContainer">
      <div style="margin: 1rem auto 0; max-width: 100%;">
        <h2 class="site-name-search"><a href="/">Digital Collections</a></h2>
        <app-search-box
          id="searchBox"
          @search="${this._onSearch}"
          on-browse="${this._onBrowse}"
          placeholder="search digital collections"
        >
          <!-- <button class="search-icon" slot="button-content"></button> -->
          <!-- <iron-icon icon="fin-icons:search" class="search-icon" slot="button-content"></iron-icon> -->
        </app-search-box>
      </div>
      <br />
    </div>

    <div id="filter-box">
      <app-top-active-filters></app-top-active-filters>
      <div class="add-filter-container">
        <div class="add-filter" @click="${this._onExpandFilters}">
          <div class="add">
            <ucdlib-icon
              icon="ucdlib-dams:fa-plus"
              tabindex="0"
              icon="fa-plus"
              alt="Add filter"
            >
            </ucdlib-icon>
          </div>
          <div>
            <p>Add Filter</p>
          </div>
        </div>
      </div>
    </div>
  `}function l(){return e.dy`
    <style>
      :host {
        display: none;
        margin-left: 10px;
        padding-top: 10px;
        padding-bottom: 5px;
        font-size: var(--fs-sm);
      }

      #close {
        display: inline-block;
        vertical-align: middle;
        /* padding-right: 5px; */
      }

      ucdlib-icon {
        fill: var(--color-aggie-blue-80);
        margin-left: -6px;
        width: 1.2rem;
        height: 1.2rem;
        padding: 3px;
      }

      .title {
        margin-right: 10px;
        font-style: italic;
      }

      .rm-btn {
        color: var(--color-aggie-blue);
        font-weight: bold;
        display: inline-block;
        margin: 0.5rem;
        cursor: pointer;
        font-size: 0.85rem;
        padding: 0.85rem;
        border-radius: 35px;
        background-color: var(--color-aggie-blue-40);

      }

      .rm-btn:hover ucdlib-icon {
        fill: var(--color-aggie-gold-80);
        border-radius: 50%;
        background-color: var(--color-aggie-blue-90);
        transition: background-color 0.3s ease-in-out;
        transition: fill 0.3s ease-in-out;
      }
    </style>

    <div class="layout">
      ${this.activeFilters.map(((t,i)=>e.dy`
          <div
            @click="${this._onRemoveFilterClicked}"
            class="rm-btn"
            index="${i}"
            role="button"
            tabindex="0"
          >
          <div id="close">
            <ucdlib-icon icon="ucdlib-dams:fa-times"></ucdlib-icon>
          </div> ${t.label}
          </div>
        `))}
    </div>
  `}customElements.define("ucdlib-pages",a),__webpack_require__(7847),__webpack_require__(4672),__webpack_require__(2841),__webpack_require__(7885),__webpack_require__(6236);var c=__webpack_require__(6794),d=__webpack_require__.n(c);class h extends((0,o.Mixin)(e.oi).with(o.LitCorkUtils)){static get properties(){return{activeFilters:{type:Array}}}constructor(){super(),this.render=l.bind(this),this.filters={},this.activeFilters=[],this._injectModel("AppStateModel","FiltersModel","RecordModel")}_onRecordSearchUpdate(e){if("loaded"!==e.state)return;"search"!==this.AppStateModel.location.page&&(e.searchDocument.filters={});let t=[];this.currentFilters=e.searchDocument.filters||{};for(let e in this.currentFilters){let i=this.currentFilters[e];if("keyword"===i.type)this.currentFilters[e].value.forEach((i=>{t.push({bucket:e,type:"keyword",value:i,label:this._getLabel(e,i)})}));else if("range"===i.type){let i=this.currentFilters[e].value;t.push({bucket:e,type:"range",value:i,label:"published: "+i.gte+" to "+i.lte})}}t.sort(((e,t)=>e.label.toLowerCase()<t.label.toLowerCase()?-1:1)),this.activeFilters=t,this.style.display=t.length?"block":"none"}_getLabel(e,t){let i=d().elasticSearch.facets[e]||{};return i.valueMap?"object"==typeof i.valueMap?i.valueMap[t]||t:i.valueMap(t):t}_onRemoveFilterClicked(e){let t=this.activeFilters.splice(parseInt(e.currentTarget.getAttribute("index")),1)[0],i=this.RecordModel.getCurrentSearchDocument();this.RecordModel.setPaging(i,0),"keyword"===t.type?this.RecordModel.removeKeywordFilter(i,t.bucket,t.value):"range"===t.type&&this.RecordModel.removeRangeFilter(i,t.bucket),this.RecordModel.setSearchLocation(i),this.requestUpdate()}}customElements.define("app-top-active-filters",h);class p extends((0,o.Mixin)(e.oi).with(o.LitCorkUtils)){static get properties(){return{selectedCollection:{type:String},navBarChoices:{type:Array}}}constructor(){super(),this.active=!0,this.render=s.bind(this),this.selectedCollection="",this.navBarChoices=[{text:"Browse",dropdown:[{text:"Collection",href:"/collections"},{text:"Items",href:"/search"},{text:"Creators",href:"/browse/search"},{text:"Subjects",href:"/browse/subject"},{text:"Format",href:"/browse/format"}]},{text:"About",href:"/about"}],this._injectModel("AppStateModel","CollectionModel","RecordModel")}async willUpdate(){this._setCollections(await this.CollectionModel.overview())}_onAppStateUpdate(e){if(this.drawerOpen=!!e.filtersDrawerOpen,this.appState=e,"search"!==e.location.path[0])return this.shadowRoot.querySelector("app-top-active-filters").style.display="none",void(this.shadowRoot.querySelector(".add-filter-container").style.display="none");this.shadowRoot.querySelector("app-top-active-filters").style.display="block",this.shadowRoot.querySelector(".add-filter-container").style.display="block",this._searchFromAppState()}_searchFromAppState(){}_setCollections(e){e.payload}_onBrowse(e){let t=e.detail;return this.$.searchBox.browseValue="Browse",t&&"Browse"!==t?(this._setWindowLocation(t),this._setWindowLocation):this.RecordModel.setSearchLocation(this._getEmptySearchDocument())}_onSearch(e){let t=this.RecordModel.getCurrentSearchDocument();this.AppStateModel.location.path.length<3&&(t.filters={}),this.RecordModel.setPaging(t,0),this.RecordModel.setTextFilter(t,e.detail),this.RecordModel.setSearchLocation(t)}_onRecordSearchUpdate(e){const t=this.shadowRoot.querySelector("#searchBox");try{t.shadowRoot.querySelector("#input").value=e.searchDocument.text||""}catch(e){t.shadowRoot.querySelector("#input").value=""}}_onSelectedCollectionUpdate(e){this.selectedCollection=e}_onExpandFilters(e){this.dispatchEvent(new CustomEvent("expand-search-filters"))}}function u(){return e.dy`
<style>
  :host {
    display: block;
    color: var(--default-primary-color);
    background-image: url('/images/header-colorbar.png');
    background-size: cover;
    background-position: left center;    
  }

  .layout {
    padding: 0 15px;
  }

  .layout > div {
    margin: 0 5px;
  }

  a,
  iron-icon {
    cursor: pointer;
  }

  a:focus {
    outline-color: var(--default-primary-color);
  }
</style>

<div class="layout" ?hidden="${!this.selected}" id="layout">
  <a on-click="${this._onSearchClicked}" tabindex="0">Search</a>
  
  <span ?hidden="${!this.collection}">&gt;</span>
  <span ?hidden="${!this.collection}"><a on-click="${this._onCollectionClicked}" tabindex="0">${this.collection.name}</a></span>

  <span ?hidden="${!this.record}">&gt;</span>
  <span ?hidden="${!this.record}">Item</span>
</div>
`}customElements.define("app-search-header",p);class m extends((0,o.Mixin)(e.oi).with(o.LitCorkUtils)){static get properties(){return{collection:{type:Object},record:{type:Object},name:{type:String}}}constructor(){super(),this.active=!0,this.render=u.bind(this),this.collection=null,this.record=null,this.name="",this.lastSearchForCollection={},this._injectModel("AppStateModel","CollectionModel","RecordModel")}async ready(){super.ready(),this.$.layout.style.width=window.innerWidth-55+"px",window.addEventListener("resize",(()=>{this.$.layout.style.width=window.innerWidth-55+"px"})),this._onAppStateUpdate(await this.AppStateModel.get())}async _onAppStateUpdate(e){e.lastLocation&&"search"===e.lastLocation.page?this.lastSearch=e.lastLocation.pathname:this.lastSearch=null,this.record=null,this.collection=null,"search"===e.location.page&&e.searchCollection?(this.searchCollection=e.searchCollection,this.lastSearchForCollection[e.searchCollection["@id"]]=e.location.pathname):"search"===e.location.page&&(this.searchCollection=null),"item"===e.location.page&&(this.currentRecordId=e.location.pathname,this.record=await this.RecordModel.get(this.currentRecordId),this.record=this.record.payload,this.record.collectionId?this.collection=await this.CollectionModel.get(this.record.collectionId):this.collection=null)}_onSearchClicked(e){"keyup"===e.type&&13!==e.which||this.AppStateModel.setLocation(this.lastSearch||"/search")}_onCollectionClicked(e){if("keyup"===e.type&&13!==e.which)return;let t=this.lastSearch||"/search";this.searchCollection&&this.lastSearchForCollection[this.searchCollection["@id"]]?t=this.lastSearchForCollection[this.searchCollection["@id"]]:this.collection&&this.collection["@id"]&&(t=this.collection["@id"]),this.AppStateModel.setLocation(t)}}function g(){return e.dy`

<style>
  [hidden] {
    display: none !important;
  }
  .container-error {
    background-color:white;
    background-image: url("/images/watercolorbg.png") ;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    padding: 0 20px 40px 20px;
  }

  .topic{
    color: var(--ae-color-blue);
    font-size: 100px;
    margin: 40px 0 0 0;
  }
  .subtext1{
    font-size: 26px;
    margin-top: 40px;
    margin-bottom: 20px;
    text-align: center;
  }
  .subtext2{
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 40px;
    text-align: center;
  }

  .content-space{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .horseImg {
    width: 500px;
    max-width: 100%;
  }

  @media(max-width: 600px) {
    .topic {
      margin: 20px 0 0 0;
    }
    .subtext1 {
      margin-top: 20px;
    }
  }

</style>

<div class="container-error">
  <div class="content-space">
    <h1 class="topic">404</h1>
    <div class="subtext1">Oh no! This page has bolted away!</div>
    <div class="subtext2">Don't worry, we'll get you <a href="/">home</a></div>

    <img class="horseImg" src="/images/gunrock-running.png" alt="Horse Image">
  </div>
</div>

`}customElements.define("app-search-breadcrumb",m);class f extends e.oi{constructor(){super(),this.render=g.bind(this)}}function y(){return e.dy`
    <style>
      :host {
        display: block;
        margin: 0;
        padding: 0;
        width: 100%;
        max-width: var(--max-width);

        color: white;
        background: var(--default-primary-color);
      }

      footer {
        padding: 70px 35px 20px 20px;
      }

      a {
        cursor: pointer;
        color: var(--inverse-text-color);
        text-decoration: none;
      }

      .lib-logo {
        margin-bottom: 30px;
      }

      .lib-logo img {
        height: 45px;
        max-width: 200px;
      }

      .lib-email:hover {
        text-decoration: underline;
      }

      .row {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }

      ul,
      ul li {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .menu.vertical a {
        display: block;
        padding: 4px;
      }

      .menu.vertical a:hover {
        background-color: var(--default-primary-color);
        -webkit-transition: all 0.2s ease-in-out;
        -moz-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
      }

      .menu.horizontal {
        display: block;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .menu.horizontal li {
        display: inline-block;
        white-space: nowrap;
      }
      .menu.horizontal li a {
        display: block;
      }
      .menu.horizontal li a::after {
        content: "|";
        padding: 0 10px;
      }
      .menu.horizontal li:last-child a::after {
        content: " ";
      }

      .donate {
        margin-top: 15px;
      }
      .donate > a {
        display: inline-block !important;
        padding: 8px !important;
        font-weight: 700;
        border: 1px solid white;
        white-space: normal !important;
      }
      .donate > a:hover {
        background: rgba(21, 118, 240, 0.32) !important;
      }

      .ucd-logo {
        display: inline-block;
        margin-top: 70px;
        margin-bottom: 30px;
        width: 100%;
        position: relative;
      }
      .ucd-logo > hr {
        margin-top: 0;
        margin-bottom: 0;
        top: 50%;
        width: 100%;
        position: absolute;
        border-top: 1px solid rgba(255, 255, 255, 0.25);
        border-bottom: none;
        border-right: none;
        border-left: none;
      }
      .ucd-logo > div {
        display: inline-block;
        position: relative;
      }
      .ucd-logo > div > img {
        padding: 0 25px;
        height: 100px;
        background: var(--default-primary-color);
      }

      @media (max-width: 768px) {
        .row {
          flex-direction: column;
          text-align: left;
        }

        h2 {
          margin-top: 30px;
          margin-bottom: 10px;
        }

        .menu.vertical li a {
          padding: 0;
        }
      }
    </style>

    <footer role="contentinfo">
      <div class="row">
        <div class="col">
          <!-- col start -->
          <div class="lib-logo">
            <a
              href="https://library.ucdavis.edu"
              target="_blank"
              rel="noopener"
            >
              <img
                src="/images/ucd-lib-logo-white.png"
                alt="UC Davis Library Logo"
              />
            </a>
          </div>
          <p>
            UC Davis Library<br />
            100 NW Quad<br />
            University of California, Davis<br />
            Davis, CA 95616<br />
            (530) 752-8792<br /><br />
            <a href="mailto:library@ucdavis.edu" class="lib-email"
              >library@ucdavis.edu</a
            >
          </p>

          <!-- Build Info -->
          <div ?hidden="${this.showVersion}">
            <div><b>Build Information</b></div>
            <div>App Version: ${this.appVersion}</div>
            <div>Build Time: ${this.localBuildTime}</div>
            <div>Build Number: ${this.buildNum}</div>
            <div>Client Env: ${this.clientEnv}</div>
            <div>Fin App Version: ${this.finAppVersion}</div>
            <div>Fin Branch Name: ${this.finBranchName}</div>
            <div>Fin Repo Tag: ${this.finRepoTag}</div>
            <div>Fin Server Image: ${this.finServerImage}</div>
            <div>Fin Server Repo Hash: ${this.finServerRepoHash}</div>
            <div>DAMS Deployment Branch: ${this.damsDeployBranch}</div>
            <div>DAMS Deployment SHA: ${this.damsDeploySha}</div>
            <div>DAMS Deployment Tag: ${this.damsDeployTag}</div>
            <div>DAMS Repo Branch: ${this.damsRepoBranch}</div>
            <div>DAMS Repo SHA: ${this.damsRepoSha}</div>
            <div>DAMS Repo Tag: ${this.damsRepoTag}</div>
          </div>
        </div>
        <!-- col end -->

        <div class="col" role="navigation">
          <!-- col start -->
          <h2>Digital Collections</h2>
          <ul class="menu vertical">
            <li><a href="/collections">Collections</a></li>
            <li><a href="/search">Items</a></li>
            <li><a href="/about">About Digital Collections</a></li>
          </ul>
        </div>
        <!-- col end -->

        <div class="col" role="navigation">
          <!-- col start -->
          <h2>Library Info</h2>
          <ul class="menu vertical">
            <li>
              <a
                href="https://library.ucdavis.edu/special-collections/"
                target="_blank"
                rel="noopener"
                >Special Collections</a
              >
            </li>
            <li>
              <a
                href="https://library.ucdavis.edu/news/"
                target="_blank"
                rel="noopener"
                >News</a
              >
            </li>
            <li>
              <a
                href="https://library.ucdavis.edu/about/"
                target="_blank"
                rel="noopener"
                >About the Library</a
              >
            </li>
            <li>
              <a
                href="https://library.ucdavis.edu/library/"
                target="_blank"
                rel="noopener"
                >Visit</a
              >
            </li>
            <li>
              <a
                href="https://library.ucdavis.edu/service/careers/"
                target="_blank"
                rel="noopener"
                >Careers</a
              >
            </li>
            <li class="donate">
              <a
                href="http://give.ucdavis.edu/ULIB"
                target="_blank"
                rel="noopener"
                >Give to the UC Davis Library</a
              >
            </li>
          </ul>
        </div>
        <!-- col end -->

        <div class="col" role="navigation">
          <!-- col start -->
          <h2>Account</h2>
          <ul class="menu vertical">
            <li>
              <app-auth-footer></app-auth-footer>
            </li>
          </ul>
        </div>
        <!-- col end -->
      </div>
      <!-- row end -->

      <div class="bottom-links" style="text-align: center;">
        <div class="ucd-logo">
          <!-- ucd-logo -->
          <hr />
          <div>
            <img src="/images/ucd-logo.svg" alt="UC Davis Logo" />
          </div>
        </div>

        <div>
          <p>
            University of California, Davis, One Shields Avenue, Davis, CA 95616
            | 530-752-1011
          </p>
          <ul class="menu horizontal">
            <li><a href="/help/">Help</a></li>
            <li><a href="/general-support/">Questions or comments?</a></li>
            <li>
              <a
                href="https://www.ucdavis.edu/help/privacy-accessibility/"
                target="_blank"
                rel="noopener"
                >Privacy &amp; Accessibility</a
              >
            </li>
            <li>
              <a
                href="https://occr.ucdavis.edu/poc/"
                target="_blank"
                rel="noopener"
                >Principles of Community</a
              >
            </li>
            <li>
              <a href="https://www.ucdavis.edu/" target="_blank" rel="noopener"
                >UC Davis</a
              >
            </li>
            <li>
              <a
                href="https://www.universityofcalifornia.edu/"
                target="_blank"
                rel="noopener"
                >University of California</a
              >
            </li>
          </ul>
          <p>
            Copyright &copy; 2020 The Regents of the University of California,
            Davis campus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `}function v(){return e.dy`
    <style include="shared-styles">
  :host {
    display: block;
    color: var(--color-white);
  }
  [hidden] {
    display: none !important;
  }
  a {
    color: var(--color-white);
    cursor: pointer;
    display: block;
    padding: var(--spacing-half);
    text-decoration: underline;
    padding-left: 0;
  }
  @media (max-width: 768px) {
    .gold,
    span.logged-in-as {
      padding-left: 0;
    }
  }
</style>

<div>
  <span class="logged-in-as" ?hidden="${!this.loggedIn}">Logged in as: ${this.user.preferred_username}</span>
  <a ?hidden="${this.loggedIn}" href="/auth/login?redirectUrl=${this.path}">Login</a>
  <div ?hidden="${!this.loggedIn}">
    <a @click="${this._logout}" class="gold">Log Out</a>
  </div>
</div>
`}customElements.define("app-404",f);class b extends((0,o.Mixin)(e.oi).with(o.LitCorkUtils)){static get properties(){return{loggedIn:{type:Boolean},user:{type:Object},path:{type:String}}}constructor(){super(),this.active=!0,this.render=v.bind(this),this.loggedIn=!1,this.user={},this._injectModel("AppStateModel","AuthModel")}_onAppStateUpdate(e){this.user=APP_CONFIG.user,this.loggedIn=this.user.loggedIn,this.path=e.location.fullpath}_logout(){this.AuthModel.logout()}}customElements.define("app-auth-footer",b);class _ extends((0,o.Mixin)(e.oi).with(o.LitCorkUtils)){static get properties(){return{localBuildTime:{type:String},appVersion:{type:String},showVersion:{type:Boolean},buildNum:{type:String},clientEnv:{type:String},finAppVersion:{type:String},finBranchName:{type:String},finRepoTag:{type:String},finServerImage:{type:String},finServerRepoHash:{type:String},damsDeployBranch:{type:String},damsDeploySha:{type:String},damsDeployTag:{type:String},damsRepoBranch:{type:String},damsRepoSha:{type:String},damsRepoTag:{type:String}}}constructor(){super(),this.active=!0,this.render=y.bind(this),this.showVersion="main"!==APP_CONFIG.env.UCD_DAMS_DEPLOYMENT_BRANCH,this.appVersion=APP_CONFIG.env.APP_VERSION,this.buildNum=APP_CONFIG.env.BUILD_NUM,this.clientEnv=APP_CONFIG.env.CLIENT_ENV,this.finAppVersion=APP_CONFIG.env.FIN_APP_VERSION,this.finBranchName=APP_CONFIG.env.FIN_BRANCH_NAME,this.finRepoTag=APP_CONFIG.env.FIN_REPO_TAG,this.finServerImage=APP_CONFIG.env.FIN_SERVER_IMAGE,this.finServerRepoHash=APP_CONFIG.env.FIN_SERVER_REPO_HASH,this.damsDeployBranch=APP_CONFIG.env.UCD_DAMS_DEPLOYMENT_BRANCH,this.damsDeploySha=APP_CONFIG.env.UCD_DAMS_DEPLOYMENT_SHA,this.damsDeployTag=APP_CONFIG.env.UCD_DAMS_DEPLOYMENT_TAG,this.damsRepoBranch=APP_CONFIG.env.UCD_DAMS_REPO_BRANCH,this.damsRepoSha=APP_CONFIG.env.UCD_DAMS_REPO_SHA,this.damsRepoTag=APP_CONFIG.env.UCD_DAMS_REPO_TAG,APP_CONFIG.env.BUILD_TIME?this.localBuildTime=new Date(APP_CONFIG.env.BUILD_TIME).toISOString().replace("T"," "):this.localBuildTime="Not set",this._injectModel("AppStateModel")}getLocalTime(e){return e?(e=new Date(e+".000Z")).getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()+" "+(e.getHours()>12?e.getHours()-12:e.getHours())+":"+(e.getMinutes()<10?"0":"")+e.getMinutes()+(e.getHours()>11?"pm":"am"):""}}function w(){const t=e.iv`var(--spacing-half)`;return e.iv`
    :host {
      display: block;
      background-color: var(--color-aggie-blue);
      color: var(--color-white);
      font-size: var(--fs-html);
    }
    a {
      color: var(--color-white);
    }
    .kt {
      white-space: nowrap;
      text-decoration: none;
    }
    .underline {
      text-decoration: underline;
    }
    h2 {
      color: var(--color-white);
      margin-bottom: ${t};
      margin-top: 0;
      margin-left: var(--spacing-half);
    }
    #lib-logo {
      margin-bottom: ${t};
      height: 60px;
      min-height: 60px;
      padding-bottom: 1rem;
    }
    #section-columns {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 4rem;
    }

    #section-columns > * {
      margin-right: var(--spacing-default) var(--spacing-default);
      flex-grow: 1;
      margin-bottom: 2rem;
    }
    #section-columns > *:last-child {
      margin-right: 0;
    }

    ucdlib-site-footer-column ul {
      margin: 0;
      padding: 0;
    }
    ucdlib-site-footer-column li:not([hidden]) {
      display: block;
      margin-bottom: 0;
    }
    ucdlib-site-footer-column a {
      display: block;
      padding: var(--spacing-half);
      padding-left: 0;
    }

    .container-footer {
      width: 90%;
      margin: 0 auto;
    }
    .button {
      margin-top: 15px;
    }
    .button > a {
      display: inline !important;
      padding: 8px !important;
      font-weight: var(--fw-bold);
      border: 1px solid white;
      text-decoration: none;
      padding: 8px;
      white-space: normal !important;
      text-align: center;
    }
    .button > a:hover {
      background: var(--color-a-hover);
    }
    address {
      font-style: normal;
    }
    @media (max-width: 1200px) {
      address {
        font-size: 1rem;
      }
    }

    #below-address {
      margin-top: var(--spacing-default);
    }
    #below-address:empty {
      margin: 0;
    }
    .section-aggie-logo {
      display: flex;
      justify-content: center;
      margin: 1rem 0;
    }
    .container-aggie-logo {
      max-width: 100%;
    }
    .campus-info {
      display: flex;
      align-items: center;
      flex-flow: column wrap;
    }
    .campus-info a {
      text-decoration: underline;
    }
    .campus-info .row {
      margin-bottom: var(--spacing-default);
      display: flex;
    }
    .campus-info a:hover {
      text-decoration: underline;
    }
    .campus-info ul {
      list-style: none;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
    }
    .campus-info ul li {
      display: inline-block;
    }
    .campus-info ul a.pipe {
      border-right: 1px solid var(--color-aggie-blue-70);
      margin-right: 0.5rem;
      padding-right: 0.5rem;
      line-height: 0.9;
    }
    .campus-info span {
      text-align: center;
    }

    @media (max-width: 992px) {
      #section-columns > * {
        width: 50%;
      }
    }

    @media (max-width: 768px) {
      #section-columns > * {
        width: 100%;
      }
      ucdlib-site-footer-column a {
        padding-left: 0;
      }
      h2 {
        margin-left: 0;
      }
    }    
  `}function x(){return e.dy`
    <div class="container container-footer">

      <div id="section-columns" shadow-anchor="section-columns">
        <div id="address-column">
          <div class="lib-logo-container">
            <a href="https://library.ucdavis.edu" target="_blank">${this._renderLibraryLogo()}</a>
          </div>
          <address>
            UC Davis Library <br />
            100 NW Quad <br />
            University of California, Davis <br />
            Davis, CA 95616 <br /><br />
            <a href="tel:+1-530-752-8792" class="underline">530-752-8792</a><br /><br />
            <a href="mailto:library@ucdavis.edu" class="underline">library@ucdavis.edu</a>
          </address>
          <div id="below-address" shadow-anchor="below-address"></div>
        </div>
      </div>

      <div class="section-aggie-logo">
        <div class="container-aggie-logo">
          <a href="https://www.ucdavis.edu">${this._renderAggieLogo()}</a>
        </div>
      </div>
      <div class="section-campus-info">${this._renderCampusInfo()}</div>
    </div>
  `}customElements.define("app-footer",_);const A=e=>class extends e{connectedCallback(){super.connectedCallback(),this.childrenToRender=[...this.children],this.childListObserver=new MutationObserver(((e,t)=>this._onChildListMutation(e,t))),this.childListObserver.observe(this,{childList:!0})}disconnectedCallback(){this.childListObserver.disconnect(),super.disconnectedCallback()}firstUpdated(){super.firstUpdated(),[...this.childrenToRender].forEach((e=>{this._insertIntoShadowDom(e)}))}_onChildListMutation(e){for(const t of e)for(const e of t.addedNodes)this._insertIntoShadowDom(e)}_insertIntoShadowDom(e){if(!e||3===e.nodeType||e.getAttribute("hidden"))return;let t=e.getAttribute("insert-into")?e.getAttribute("insert-into"):this.defaultShadowAnchor,i=this.shadowRoot.querySelector(`[shadow-anchor=${t}]`);i?i.appendChild(e):console.warn(`Shadow anchor '${t}' doesn't exist.`)}};class S extends((0,o.Mixin)(e.oi).with(A)){static get properties(){return{lastUpdate:{type:String,attribute:"last-update"}}}static get styles(){return w()}constructor(){super(),this.render=x.bind(this),this.lastUpdate="",this.defaultShadowAnchor="section-columns"}_renderCampusInfo(){return e.dy`
      <div class="campus-info">
        <div class="row">
          <span><a href="https://www.ucdavis.edu/">University of California, Davis</a>, One Shields Avenue, Davis, CA 95616 | <a class="kt plain" href="tel:+1-530-752-1011">530-752-1011</a></span>
        </div>
        <div class="row">
          <ul>
            <li><a href="https://www.ucdavis.edu/contact" class="pipe" target="_blank">Questions or Comments?</a></li>
            <li><a href="https://www.ucdavis.edu/help/privacy-accessibility" class="pipe" target="_blank">Privacy & Accessibility</a></li>
            <li><a href="http://www.universityofcalifornia.edu/" class="${this.lastUpdate?"pipe":""}" target="_blank">University of California</a></li>
            ${this.lastUpdate?e.dy`
              <li>Last Updated: ${this.lastUpdate}</li>
            `:e.dy``}
          </ul>
        </div>
        <div class="row">
          <span>Copyright © The Regents of the University of California, Davis campus. All rights reserved.</span>
        </div>
      </div>
      
    `}_renderLibraryLogo(){return e.YP`
    <svg id="lib-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1512 436.85">
      <title>ucd_lib-logo-signature-reverse-cmyk</title>
      <rect width="1512" height="436.84" style="fill:none"/>
      <path d="M1369.7,174.66l18.45-48.81,3.21,2.78c11.33,9.23,26.7,17.09,41.19,17.41,13,.29,19.31-3.16,17.59-14.13-1.28-8.19-10.54-9.64-16.31-10.78l-12.69-2.53c-24.68-4.61-45.44-19.84-45.44-48.68,0-43.61,37.61-68.07,75.4-68.07A98.39,98.39,0,0,1,1506.24,18l-16,43.25c-8.78-6.33-22.06-15.23-38.92-15.84-5.53-.21-18.19,2.69-14.13,15.57,1.75,5.46,9.61,7.76,14.42,8.94l14.31,3.45C1492.63,79.6,1512,94.82,1512,126c0,43.83-37.82,65.53-75.39,65.53-21.92,0-47.31-6.23-66.91-16.84" style="fill:#fff"/>
      <rect x="1291.72" y="4.85" width="64.38" height="183.9" style="fill:#fff"/>
      <polygon points="1219.15 4.85 1285.1 4.85 1217.76 188.75 1164.24 188.75 1097.11 4.85 1162.84 4.85 1190.99 115.81 1219.15 4.85" style="fill:#fff"/>
      <path d="M941,188.75h66.9l5.08-23.09h47.74l6.33,23.09h66.91L1071.27,4.85H1001.1Zm96-130.82h0c1.18,7.82,12.71,64.11,12.71,64.11H1024.3Z" style="fill:#fff"/>
      <path d="M840.4,135.93h4.31c21.22,0,37-12.72,37-36.71,0-25.85-13.95-40.26-37.25-40.26h-4ZM775.61,4.85h65.93c58.82,0,103.79,27,103.79,94.6,0,54.46-36.66,89.3-88.11,89.3l-81.61-.1Z" style="fill:#fff"/>
      <path d="M737.11,10.62l3.43,30.17c.81,7.16,4.89,24.35-.16,22.05-3.16-1.42-5.76-9.22-8.35-16.12-1.31-3.52-7.59-20.13-9.22-21.36-7.93-5.92-27.69-12.6-41-12.67-40.54-.15-67.37,29.77-67.37,82.84,0,38.07,18.23,83.73,64.59,83.73,16.61,0,48.42-5.22,57.09-28.86,3.9-10.71,7.49-20.21,10.08-17.32,1.93,2.1-.57,10.67-1.73,15.28-5.45,21.91-5.75,28.55-7.49,29.4-20.95,10.52-47.81,14-71.32,14-74.76,0-100.57-43.62-100.57-87.22C565,28.86,611.51-3,683.58.24a169.72,169.72,0,0,1,53.53,10.38" style="fill:#fff"/>
      <path d="M516.37,14l-12-4.18c-4-3.62.87-4.63.87-4.63s17.31,3.21,60.41-.44c0,0,3.74.75,1.15,3.78l-14.13,6c-9.23,4.05-9.23,1.73-9.23,11.83l-.07,93.72c0,73.3-74.56,71.66-89.08,71.66-6.91,0-75.29,0-75.29-58.86V33.69c0-17.3,1.84-16.84-3.92-18.87L357.82,8.33s-2.92-4.15,2.3-3.89c14.11.72,34.61,3.76,82.73.28,0,0,4.18,1,1.44,4.05l-14.38,4c-11,4.91-9.52,1.16-9.81,12.4l.34,97.82c0,24,12.33,53.68,51.18,53.68,52.83,0,53.32-45.7,53.32-55.86L525,24c.56-9.13-.59-6.53-8.67-10" style="fill:#fff"/>
      <rect x="379.05" y="229.5" width="1132.95" height="7.66" style="fill:#fff"/>
      <path d="M419,403h48v33.89H379V282.92h40Z" style="fill:#fff"/>
      <path d="M551.25,436.84h-40V282.92h40Z" style="fill:#fff"/>
      <path d="M601.88,436.84V282.92H659c27.36,0,45.73,10.61,45.73,40,0,13.88-4.49,25.11-16.94,31.44v.41c22,2.85,31.44,17.76,31.44,39.19,0,32.26-27.56,42.87-55.73,42.87Zm40-93.5h4.49c10.61,0,21.64-1.83,21.64-14.9,0-14.09-12.46-14.9-23.28-14.9H641.9Zm0,62.88H647c11.84,0,31.85.61,31.85-16.33,0-18.58-19.81-16.74-32.87-16.74H641.9Z" style="fill:#fff"/>
      <path d="M886.67,436.84H836.86l-37.77-59.2h-.41v59.2h-40V282.92h59.82c30.41,0,53.48,14.49,53.48,47.36,0,21.23-11.84,39.6-33.68,43.48Zm-88-84.92h3.88c13.07,0,27.77-2.45,27.77-19.19s-14.7-19.19-27.77-19.19h-3.88Z" style="fill:#fff"/>
      <path d="M951.59,410.1,941,436.84H898.52l59.2-153.92h43.69l58,153.92h-42.66l-10-26.74Zm28-79.62h-.41l-16.53,49h33.27Z" style="fill:#fff"/>
      <path d="M1210.87,436.84h-49.82l-37.76-59.2h-.41v59.2h-40V282.92h59.81c30.42,0,53.49,14.49,53.49,47.36,0,21.23-11.84,39.6-33.69,43.48Zm-88-84.92h3.88c13.06,0,27.76-2.45,27.76-19.19s-14.7-19.19-27.76-19.19h-3.88Z" style="fill:#fff"/>
      <path d="M1216.38,282.92h48l28.78,41.85,28.79-41.85h48l-56.75,80v73.9h-40v-73.9Z" style="fill:#fff"/>
      <path d="M148,330.23l-45.6,12.41v33.62l141,22.18V137.22L171.94,126V298.29C171.94,312.79,161.65,326.52,148,330.23Z" style="fill:none"/>
      <path d="M102.39,342.64,148,330.23c13.66-3.71,23.95-17.44,23.95-31.94V126L102.39,115Z" style="fill:#fff"/>
      <path d="M171.94,92.74V4.85L24.87,36C10.69,39,0,52.66,0,67.81v302.7l69.55-18.93V76.63Z" style="fill:#fff"/>
      <path d="M250.56,105.1,171.94,92.74V126l71.49,11.24V398.44l-141-22.18V342.64l-32.84,8.94v25.48c0,15.3,11.3,29.06,25.72,31.33l181,28.46V136.43C276.27,121.13,265,107.37,250.56,105.1Z" style="fill:#fff"/>
    </svg>
    `}_renderAggieLogo(){return e.YP`
    <svg id="aggie-logo" data-name="Group 1648" xmlns="http://www.w3.org/2000/svg" width="272.123" height="205.617" viewBox="0 0 272.123 205.617">
      <path id="Path_1799" data-name="Path 1799" d="M366.856,180.831l.029-60.673-76.545-.037-.656-.387-.33,1.056.329.9,1.31,1.048.328.909.491,1.952,1.148,1.655h-.656l.816,1.805-.491,1.2-.66,2.555v1.8l-.653-.3-.329,1.055.98,2.559L287.7,146.65l-.987,2.256v1.2l.654.912.331.9-.332,1.2.162.446,3.285,2.861,1.475.757.491,1.5.984.9,1.477,1.958.491.9,1.64,1.349v1.21l.49,1.047.329,3.007-.491,1.208-.494,1.349v1.959l.493,1.355.98,2.405.986,1.951-.66,2.256.33.755.985.9,1.31,1.2,1.642,1.5.329.6.981.3.819,1.2,1.643,2.258,1.148.75,2.295,1.356.98,2.413h.659l.985.748.325.6.988,1.5H313.6l-.492-.6-.326.154.326.746-.657,3.46.161.454.82-.453.168-.747.492-.455.329.9h.82l.821.6.49.755.823.449.984.6.491-.3,1.311,1.057,1.316.9.491.154-.164-1.355h.165l.651.446.333-.146-.656-1.057-.327-1.047.328-.6-.818-.456.492-1.8-.658-.6.985.3.818-1.055.495.154,2.131.749v.609l.659.146.819.453.821.45v.3l-.49-.146-1.319-.155-.651.754h-1.314l-.819,1.357,1.8,1.35v.446l.163,1.509.5.748,1.965,1.359.823,2.4.489,1.055,2.132,1.357-.493.3h-.489l-.821-.153-.167-.3-.981-.9-1.48-.6-1.148-.9-1.64-.454.165-.9-.493-.9.658-.9-.329-.3v-.9h-.654l-.656-.153-.659.3-.652.3.49,1.658-.165.753.326.895-.652.3.325,1.958.656.154.329.448.324,1.509.495.148v1.2l-.33,1.957.329.748.655.754.656.9.167.6h.652l.824,1.356,1.964,1.5,1.315.3.983-.155.981.308.334-.453,1.311.6,1.314,1.5v2.259l-.493,2.557-1.807.147-.82,1.2v1.055l.819,1.65,1.148,3.615.819.756,1.64.749,1.148,1.056,2.952,3.76.492,1.355,2.951,3.008.489,1.5,2.468,1.656,2.784,3.307,2.3.149.325,2.41-.66.6.827,1.951,2.129,1.056,1.477.147.49.909-.492,2.4v1.054l-.166.448.819,1.505-.327,1.054.326,1.5-.655,2.557.163,1.05,2.13.455,1.149,1.656,8.868.151,1.141.6,4.1.457,1.475-.454,2.628.756,1.969,1.8,1.639.6,1.312,2.859,1.146.9,2.958.75.325.154,2.133.448.66.3,4.428-.3,1.312.6,1.637,3.315v.6l-.491,1.055,2.3,1.048.652-.9,1.15-.448,1.477.449,2.788,2.258.982.749.988.3,2.784,2.714,1.8,1.047,2.628,2.559,3.442,6.02.493,2.257-.494,1.35.814,1.8-.488.454v.9l.327.3.659-.752.33-.147,1.31,1.055.163,1.048-1.312-1.048h-.329l.328.448.655.9V316.5l18.543-1.793,25.1-2.246,2.631-.039.664-.534.507-1.508.836-.941-.007-2.552-1.032-1.049-2.3-.149-.777-.607-.171-1.063.314-2.837-.861-.869.387-1.108-.159-1,.655-.515,1.6-1.474-.34-.581.983-.2.822-1.95-.34-1.449.513-.648L467,287.334l1.6-1.469-.181-.452.725-1.343,4.379-3.478.974-.341-.141-.734-4.279-3.475-1.487-5.111-2.289-2.1.551-1.049-1.142-.581-.518-1.7.015-1.2Z" transform="translate(-209.125 -119.734)" fill="#ffbf00"/>
      <g id="Group_1638" data-name="Group 1638" transform="translate(109.547 47.615)">
        <path id="Path_1800" data-name="Path 1800" d="M365.863,237.344l-11.094,5.832,2.119-12.352-8.975-8.748,12.4-1.8,5.547-11.239,5.547,11.239,12.4,1.8-8.975,8.748,2.119,12.352Z" transform="translate(-345.499 -206.496)" fill="#fff"/>
        <path id="Path_1801" data-name="Path 1801" d="M363.979,209.591l4.8,9.727,10.735,1.56-7.768,7.572,1.834,10.692-9.6-5.048-9.6,5.048,1.834-10.692-7.768-7.572,10.735-1.56,4.8-9.727m0-5.076-2.015,4.082-4.278,8.668-9.566,1.39-4.5.655,3.26,3.177,6.922,6.747-1.634,9.527-.769,4.487,4.029-2.118,8.556-4.5,8.556,4.5,4.029,2.118-.769-4.487-1.634-9.527,6.923-6.747,3.259-3.177-4.5-.655-9.566-1.39-4.278-8.668-2.015-4.082Z" transform="translate(-343.615 -204.515)" fill="#06203f"/>
      </g>
      <g id="Group_1641" data-name="Group 1641" transform="translate(0 69.521)">
        <g id="Group_1639" data-name="Group 1639" transform="translate(184.293 22.131)">
        <path id="Path_1802" data-name="Path 1802" d="M483.043,303.162c-2.276,0-3.956-1.641-4.279-4.18a10.286,10.286,0,0,1,.914-5.332c1.939-4.878,6.16-8.725,9.6-8.725,2.312,0,3.951,1.6,4.279,4.18a10.751,10.751,0,0,1-.9,5.441C490.742,299.363,486.513,303.162,483.043,303.162Z" transform="translate(-477.579 -283.802)" fill="#fff"/>
        <path id="Path_1803" data-name="Path 1803" d="M488.4,285.172c1.765,0,2.912,1.213,3.164,3.2a9.58,9.58,0,0,1-.815,4.852c-1.754,4.412-5.605,7.94-8.583,7.94-1.764,0-2.926-1.323-3.164-3.2a9.208,9.208,0,0,1,.829-4.742c1.753-4.411,5.591-8.05,8.568-8.05m0-2.247c-3.336,0-8.194,3.306-10.643,9.434a11.375,11.375,0,0,0-.983,5.89c.393,3.086,2.56,5.16,5.393,5.16,3.954,0,8.531-4.006,10.657-9.324a11.9,11.9,0,0,0,.969-6c-.4-3.135-2.515-5.161-5.393-5.161Z" transform="translate(-476.703 -282.925)" fill="#06203f"/>
        </g>
        <g id="Group_1640" data-name="Group 1640" transform="translate(0 0)">
          <path id="Path_1804" data-name="Path 1804" d="M276.36,379.369a22.508,22.508,0,0,1-3.346-.24c-6.5-.912-11.564-5.026-13.22-10.524a30.879,30.879,0,0,1-23.024,10.764,22.462,22.462,0,0,1-3.342-.239c-7.343-1.029-12.847-6.143-13.686-12.721a16.82,16.82,0,0,1,1.295-8.856l.027-.067.036-.063c6.218-10.847,19.8-15.27,32.941-19.547,1.49-.485,2.978-.97,4.454-1.464.177-.859.341-1.66.485-2.375-2.9,2.273-6.857,4.1-10.41,4.1a8.411,8.411,0,0,1-4.354-1.159,7.681,7.681,0,0,1-2.669-2.842,22.2,22.2,0,0,1-15.539,7.426c-.19.007-.376.01-.562.01-6.478,0-11.357-4.121-12.138-10.254a18.791,18.791,0,0,1,.815-7.28c.024-.1.829-3.378,4.137-12.94l-.458-.035c-.611-.047-1.448-.112-1.621-.112a67.266,67.266,0,0,1-11.055-1.719c-13.32,20.056-21.824,31.389-38.666,31.389-5,0-9.158-1.748-12.033-5.055-3.17-3.647-4.454-8.945-3.615-14.917a30.592,30.592,0,0,1,11.454-19.717c6.319-5.011,13.021-7.149,22.411-7.149a78.488,78.488,0,0,1,12.553,1.314c1.369.221,2.67.431,3.857.589,14.733-20.987,21.83-29.792,28.254-34.845-3.947-1.729-8.729-3.641-14.191-3.641-11.452,0-15.5,7.054-16.056,10.824-.135,2.015-2.634,2.918-5.075,2.918-.855,0-2.954-.128-3.984-1.313a2.147,2.147,0,0,1-.521-1.728,24.342,24.342,0,0,1,10.5-16.635,34.123,34.123,0,0,1,19.367-5.749,74.368,74.368,0,0,1,21.656,3.345,30.443,30.443,0,0,0,7.428,1.528,14.592,14.592,0,0,0,6.8-1.816,9.038,9.038,0,0,1,3.866-1.193,3.18,3.18,0,0,1,2.526.978,4.085,4.085,0,0,1,.64,3.3,6.8,6.8,0,0,1-2.683,4.188l-.094.078c-1.5,1.361-5.083,4.734-6.358,6.209-3.175,3.636-6.552,7.929-9.894,16.858l-4.452,11.871c1.026-.721,1.826-1.327,2.276-1.7a1.85,1.85,0,0,1,1.231-.472c1.107,0,2.134.994,2.819,2.726,1.038,2.629,1.062,6.24-1.226,8.379a42.2,42.2,0,0,1-10.816,7.6l-.513,1.426c-.4,1.164-.777,2.249-1.087,3.136-.924,3.132-3.379,11.1-3.4,11.177-1.087,3.789-.445,6.032.334,6.349a3.769,3.769,0,0,0,1.6.365c4.679,0,9.807-9.138,11.512-14.03.3-1,.643-1.966,1-2.823,4.321-10.7,13.968-21.539,24.039-21.539h.162a7.968,7.968,0,0,1,5.032,1.465l.061-.145a2.08,2.08,0,0,1,1.93-1.616,1.925,1.925,0,0,1,.355.034,5.3,5.3,0,0,0,.956.071c2.841,0,7.74-1.257,9.037-2.321a1.48,1.48,0,0,1,.944-.354,1.413,1.413,0,0,1,1.217.727,2.292,2.292,0,0,1,0,2.149c-7.039,12.518-11.006,26.327-14.141,39.543a37.889,37.889,0,0,0,7.34-4.728,38.03,38.03,0,0,1,2.651-13.289c4.321-10.7,13.968-21.538,24.039-21.538h.162a7.966,7.966,0,0,1,5.032,1.466l.062-.145a2.079,2.079,0,0,1,1.929-1.616,1.921,1.921,0,0,1,.355.034,5.3,5.3,0,0,0,.956.071c2.841,0,7.74-1.257,9.037-2.32a1.478,1.478,0,0,1,.944-.354,1.414,1.414,0,0,1,1.217.728,2.291,2.291,0,0,1,0,2.149c-7.037,12.515-11,26.325-14.137,39.541a36.853,36.853,0,0,0,7.878-5.2,18.459,18.459,0,0,1,.65-5.139c.8-3.894,4.6-14.151,10.171-27.47a2.26,2.26,0,0,1,2.111-1.763,2.055,2.055,0,0,1,.3.023,7.647,7.647,0,0,0,1.062.066c3.171,0,7.854-1.359,9.279-2.692a1.5,1.5,0,0,1,1.036-.436,1.409,1.409,0,0,1,1.2.686,2.638,2.638,0,0,1,.1,2.341c-.9,1.933-1.829,3.87-2.752,5.8-3.659,7.664-7.444,15.589-9.613,22.8-.985,3.433.4,5.927,1.455,6.355a3.7,3.7,0,0,0,1.562.365c1.3,0,2.674-.767,4.095-2.282-.009-.07-.019-.139-.028-.209-.936-7.341,2.287-16.221,8.409-23.173,5.514-6.261,12.394-9.852,18.876-9.852,5.26,0,8.451,2.307,8.985,6.5,1.491,11.71-12.982,22.81-21.805,25.973l.014.376c.3,3.76,2.421,5.534,6.668,5.534a12.917,12.917,0,0,0,7.545-2.514,11.448,11.448,0,0,1,2.924-8.128c4.93-5.521,11.011-16.674,14.475-24.843a17.807,17.807,0,0,0,1.234-3.429,6.429,6.429,0,0,1,6.334-5.517,6.229,6.229,0,0,1,2.8.663c2.555,1.447,3.279,4.222,1.939,7.271a7.511,7.511,0,0,1-2.153,3c-.115.107-.227.213-.339.322l-.16.181a3.313,3.313,0,0,0-1.065,1.939c-.1,1.044.406,1.664,1.381,2.756.231.259.468.525.7.807.6.737,1.271,1.465,1.98,2.236,2.651,2.882,5.657,6.149,6.319,11.347a20.1,20.1,0,0,1-2.017,11.753,14.92,14.92,0,0,0,4.351-4.123,48.028,48.028,0,0,0,5.353-10.789,1.867,1.867,0,0,1,1.932-1.307,6.5,6.5,0,0,1,4.473,2.474,4.277,4.277,0,0,1,.943,3.719,30.5,30.5,0,0,1-9,15.682,20.7,20.7,0,0,1-13.021,5.25,13.16,13.16,0,0,1-5.465-1.1,23.819,23.819,0,0,1-9.311,1.984,17.952,17.952,0,0,1-7.368-1.531,12.369,12.369,0,0,1-3.124-1.989,29.18,29.18,0,0,1-14.154,3.41c-6.041,0-11.115-1.924-14.433-5.444a19.6,19.6,0,0,1-12,4.507q-.283.01-.561.01a11.968,11.968,0,0,1-10.324-5.22,39.622,39.622,0,0,1-11.951,7.232c-1.99,8.828-3.735,16.45-6.207,21.932C298.04,374.044,285.956,379.369,276.36,379.369Zm19.97-34.825c-12.921,4.667-21.2,9.773-22.287,13.793-.747,2.766-.573,4.969.5,6.373a5.084,5.084,0,0,0,4.157,1.732,10.294,10.294,0,0,0,2.817-.422c2.1-.568,9.11-2.932,11.687-9.7A106.107,106.107,0,0,0,296.331,344.544Zm-39.585,0c-12.922,4.668-21.2,9.774-22.287,13.793-.747,2.766-.574,4.969.5,6.373a5.086,5.086,0,0,0,4.157,1.732,10.3,10.3,0,0,0,2.817-.422c2.1-.568,9.11-2.932,11.687-9.7A106.3,106.3,0,0,0,256.746,344.544Zm13.279-4.327c-.72,3.192-1.415,6.26-2.13,9.137,6.968-5.367,16.5-8.471,25.753-11.485q2.225-.724,4.434-1.457c.177-.859.341-1.66.486-2.375-2.9,2.273-6.857,4.1-10.41,4.1a8.415,8.415,0,0,1-4.355-1.159,7.79,7.79,0,0,1-2.828-3.141A40.087,40.087,0,0,1,270.025,340.217Zm110.87-7.912a5.42,5.42,0,0,0,1.287.169l.185,0c2.4,0,8.1-1.118,9.24-11.463a27.5,27.5,0,0,0-.108-5.8,20.95,20.95,0,0,0-1.431-5.543,46.672,46.672,0,0,1-6.02,10.214,6.859,6.859,0,0,1,1.784,7.422A7.015,7.015,0,0,1,380.895,332.305ZM182.573,304.79c-9.905,0-21.071,4.136-22.7,15.743-.443,3.149-.016,5.494,1.268,6.971,1.324,1.524,3.707,2.3,7.08,2.3,8.028,0,14.883-7.866,25.227-23.36A40.461,40.461,0,0,0,182.573,304.79Zm124.306-5.8c-3.137,0-9.06,3.473-12.517,13.043-1.911,4.959-2.043,8.087-1.819,9.843.133,1.041.573,2.847,2.034,3.25a4.139,4.139,0,0,0,1.165.154,6.032,6.032,0,0,0,5.847-4.431c.039-.138,3.195-10.853,6.414-19.3l.024-.057a2.054,2.054,0,0,0,.092-1.925A1.425,1.425,0,0,0,306.879,298.989Zm-39.585,0c-3.137,0-9.06,3.473-12.516,13.043-1.911,4.957-2.044,8.086-1.82,9.843.133,1.041.573,2.847,2.034,3.25a4.146,4.146,0,0,0,1.165.154A6.032,6.032,0,0,0,262,320.848c.04-.138,3.2-10.853,6.414-19.3l.024-.057a2.055,2.055,0,0,0,.092-1.925A1.425,1.425,0,0,0,267.294,298.989Zm101.2-.441c-4.093,0-10.048,10.394-12.4,16.621a46.8,46.8,0,0,0,7.968-5.948c2.718-2.565,5.865-6.365,5.415-9.89C369.424,298.924,369.269,298.548,368.491,298.548Zm-157.27-.6a64.313,64.313,0,0,0,6.934.667,23.684,23.684,0,0,0,4.626-.3c1.311-3.592,8.026-21.978,9.206-25.067a39.569,39.569,0,0,1,3.414-6.721,74.709,74.709,0,0,0-7.351,7.549c-1.1,1.329-2.305,2.837-3.672,4.6-2.922,3.876-5.613,7.958-8.216,11.905C214.563,293.005,212.92,295.5,211.221,297.947Z" transform="translate(-149.439 -244.396)" fill="#fff"/>
          <path id="Path_1805" data-name="Path 1805" d="M218.509,245.766a73.4,73.4,0,0,1,21.352,3.3,31.039,31.039,0,0,0,7.731,1.57,15.758,15.758,0,0,0,7.288-1.926,8.123,8.123,0,0,1,3.381-1.084c1.86,0,2.318,1.112,2.053,2.994a5.776,5.776,0,0,1-2.281,3.474l-.1.08c-1.6,1.447-5.169,4.811-6.494,6.342-3.139,3.594-6.662,8.022-10.1,17.2l-5.255,14.014-.373,1.094a57.929,57.929,0,0,0,5.227-3.688.753.753,0,0,1,.508-.208c1.722,0,3.881,6.3.826,9.164a41.446,41.446,0,0,1-10.956,7.608l-.078.23-.585,1.626c-.406,1.177-.781,2.26-1.09,3.147-.949,3.214-3.416,11.216-3.416,11.216-1.153,4.02-.644,7.057.984,7.72a4.837,4.837,0,0,0,2.018.447c5.809,0,11.124-10.629,12.573-14.783.3-1,.632-1.934.974-2.764,4.253-10.531,13.662-20.845,23-20.844h.148c4.412,0,5.382,2.427,5.382,2.427l.795-1.875c.062-.3.349-.847.859-.847a.766.766,0,0,1,.145.014,6.421,6.421,0,0,0,1.166.09c2.974,0,8.173-1.284,9.749-2.575a.372.372,0,0,1,.231-.1c.348,0,.483.769.24,1.2-7.653,13.611-11.693,28.763-14.791,42.124a41.462,41.462,0,0,0,10.1-6.246,36.357,36.357,0,0,1,2.562-13.372c4.253-10.531,13.662-20.845,23-20.844h.149c4.411,0,5.382,2.427,5.382,2.427l.795-1.875c.062-.3.349-.847.859-.847a.766.766,0,0,1,.145.014,6.422,6.422,0,0,0,1.167.09c2.974,0,8.173-1.284,9.749-2.575a.372.372,0,0,1,.231-.1c.349,0,.483.769.24,1.2-7.651,13.609-11.691,28.761-14.789,42.124a40.331,40.331,0,0,0,10.645-6.741,17.509,17.509,0,0,1,.606-5.362c.763-3.75,4.514-13.911,10.149-27.384a1.185,1.185,0,0,1,1.04-.988,1.019,1.019,0,0,1,.139.01,8.8,8.8,0,0,0,1.222.078c3.315,0,8.342-1.4,10.045-2.995a.407.407,0,0,1,.269-.133c.38,0,.53.9.285,1.428-4.577,9.787-9.691,19.67-12.423,28.755-1.153,4.02.479,7.058,2.107,7.72a4.76,4.76,0,0,0,1.985.447c1.926,0,3.712-1.245,5.288-3.048-.038-.233-.076-.467-.106-.706-1.771-13.9,12.054-31.761,26.17-31.761,3.749,0,7.323,1.214,7.871,5.514,1.4,11.028-12.725,22.167-21.844,25.034l.044,1.213c.37,4.632,3.269,6.616,7.791,6.616a14.277,14.277,0,0,0,8.69-3.084v0a10.429,10.429,0,0,1,2.628-7.94c4.826-5.4,11.015-16.542,14.662-25.144a18.375,18.375,0,0,0,1.3-3.639,5.287,5.287,0,0,1,5.234-4.622,5.079,5.079,0,0,1,2.3.541c2.139,1.212,2.435,3.529,1.406,5.845a7.423,7.423,0,0,1-2.267,2.978,4.747,4.747,0,0,0-1.524,2.756c-.188,1.985,1.151,2.978,2.326,4.412,2.877,3.529,7.268,6.837,8.055,13.012a19.263,19.263,0,0,1-2.246,11.8c-.261.551-.329.882-.08,1.1a.549.549,0,0,0,.476.165,2.693,2.693,0,0,0,.848-.165,14.371,14.371,0,0,0,5.351-4.743,49.093,49.093,0,0,0,5.529-11.138c.095-.35.416-.507.857-.507,1.644,0,4.947,2.2,4.323,4.808A29.334,29.334,0,0,1,409.7,331.4a19.658,19.658,0,0,1-12.27,4.962,11.9,11.9,0,0,1-5.448-1.213,22.77,22.77,0,0,1-9.327,2.1,16.942,16.942,0,0,1-6.91-1.433,11.333,11.333,0,0,1-3.424-2.351,27.785,27.785,0,0,1-14.312,3.675c-5.72,0-11.033-1.807-14.321-5.9a18.559,18.559,0,0,1-12.155,4.966c-.175.006-.348.009-.52.009-4.671,0-8.322-2.257-10.044-5.891a38.089,38.089,0,0,1-13.2,8.191c-2.029,9-3.8,16.838-6.267,22.305-5.388,11.946-17.368,16.56-26.022,16.56a21.415,21.415,0,0,1-3.177-.227c-6.947-.974-11.974-5.742-12.739-11.753-.015-.112-.021-.227-.033-.34-6.03,8.81-16.1,12.319-23.64,12.319a21.361,21.361,0,0,1-3.173-.226c-6.947-.974-11.973-5.742-12.739-11.753A15.761,15.761,0,0,1,221.2,357.1c6.781-11.829,22.769-15.787,37.389-20.709.784-3.776,1.318-6.542,1.318-6.542-2.281,2.867-7.58,6.286-12.212,6.286a6.715,6.715,0,0,1-6.718-4.925c-3.718,4.5-9,8.1-15.884,8.351-.176.006-.349.009-.522.009-5.988,0-10.314-3.7-11.025-9.273a17.891,17.891,0,0,1,.783-6.837s.8-3.29,4.175-13.046c.139-.4.271-.779.4-1.162l-.217-.075h-.013c-.42,0-2.946-.227-3.375-.227-2.314,0-7.288-.941-11.569-1.853-13.744,20.723-21.993,31.524-38.152,31.524-10.1,0-16.082-7.686-14.535-18.693a29.468,29.468,0,0,1,11.04-18.992c6.256-4.961,12.825-6.906,21.713-6.906,6.15,0,12.217,1.4,16.719,1.951l.223.028c15.251-21.747,22.812-31.258,29.938-36.3l-.684-.3c-4.241-1.876-9.519-4.211-15.72-4.211-12.27,0-16.6,7.743-17.176,11.837-.052,1.268-2.053,1.905-3.956,1.905-1.824,0-3.557-.586-3.392-1.761a23.234,23.234,0,0,1,10.031-15.869,33,33,0,0,1,18.726-5.548m-1.231,53.095a24.25,24.25,0,0,0,5.46-.43s8.107-22.217,9.421-25.657a30.476,30.476,0,0,1,7.744-11.754,25.091,25.091,0,0,0-5.081,2.884,75.405,75.405,0,0,0-8.5,8.569c-1.133,1.368-2.359,2.9-3.7,4.639-5.125,6.8-9.367,13.95-14.225,20.792a70.079,70.079,0,0,0,8.89.958M353.3,316.62c5.6-2.758,17.342-11.029,16.415-18.307a1.921,1.921,0,0,0-2.1-1.764c-5.845,0-13.17,15.219-14.316,20.071m-58.432,8.906a7.188,7.188,0,0,0,6.933-5.268s3.137-10.684,6.377-19.189c1.1-2.462-.3-4.08-2.174-4.08-3.86,0-10.067,4.08-13.573,13.785-1.657,4.3-2.2,7.83-1.877,10.366.281,2.206,1.25,3.749,2.85,4.191a5.237,5.237,0,0,0,1.464.195m-39.585,0a7.188,7.188,0,0,0,6.933-5.268s3.138-10.684,6.377-19.189c1.1-2.462-.3-4.08-2.174-4.08-3.86,0-10.067,4.08-13.572,13.785-1.658,4.3-2.2,7.83-1.878,10.366.281,2.206,1.25,3.749,2.85,4.191a5.237,5.237,0,0,0,1.464.195m-87.938,4.522c8.6,0,15.742-8.124,27.022-25.156a45.33,45.33,0,0,0-12.669-2.1c-15.827,0-22.679,8.632-23.814,16.711-1,7.1,2.1,10.547,9.461,10.547m210.319.592a6.13,6.13,0,0,1-1.269-.125,6.544,6.544,0,0,0,4.913,2.206l.185,0c6.29,0,9.6-5.583,10.358-12.463a28.684,28.684,0,0,0-.111-6.066,19.183,19.183,0,0,0-2.68-8.05,44.94,44.94,0,0,1-7.495,13.013,5.761,5.761,0,0,1,2.319,6.947,6.174,6.174,0,0,1-6.219,4.537m-90.381,5.5a6.727,6.727,0,0,1-6.754-5.032,38.429,38.429,0,0,1-12.342,7.4c-1.078,4.783-2.084,9.237-3.16,13.179,7.975-7.788,21.03-11.208,33.149-15.289.785-3.776,1.319-6.542,1.319-6.542-2.281,2.867-7.581,6.286-12.212,6.286m-9.456,30.55a11.441,11.441,0,0,0,3.125-.465c4.646-1.254,10.2-4.534,12.428-10.378a128.3,128.3,0,0,0,3.613-13.914c-10.715,3.706-23.37,9.539-24.909,15.235-1.748,6.469,1.364,9.522,5.742,9.522m-39.585,0a11.442,11.442,0,0,0,3.126-.465c4.646-1.254,10.2-4.534,12.428-10.378a128.444,128.444,0,0,0,3.614-13.914c-10.715,3.706-23.37,9.539-24.909,15.235-1.748,6.469,1.364,9.522,5.742,9.522m-19.731-123.17a35.262,35.262,0,0,0-20.01,5.95,25.455,25.455,0,0,0-10.972,17.4,3.253,3.253,0,0,0,.785,2.621c1.285,1.479,3.579,1.7,4.832,1.7,3.537,0,6-1.567,6.192-3.915.525-3.444,4.293-9.827,14.94-9.827a31.354,31.354,0,0,1,12.053,2.824c-6.108,5.254-13.181,14.181-26.642,33.333-.986-.141-2.048-.313-3.154-.492a79.358,79.358,0,0,0-12.731-1.328c-9.664,0-16.575,2.211-23.109,7.393a31.7,31.7,0,0,0-11.868,20.44c-.886,6.3.493,11.914,3.88,15.811,3.095,3.56,7.548,5.442,12.88,5.442,8.363,0,14.993-2.646,21.5-8.578,5.92-5.4,11.541-13.448,17.685-22.681a63.746,63.746,0,0,0,10.541,1.589c.078,0,.288.015.543.033-2.785,8.136-3.592,11.261-3.692,11.661a19.8,19.8,0,0,0-.839,7.69c.857,6.722,6.183,11.236,13.253,11.236q.3,0,.6-.011a22.9,22.9,0,0,0,15.333-6.773,8.456,8.456,0,0,0,2.248,2.023,9.062,9.062,0,0,0,3.152,1.168c-10.973,3.8-21.333,8.475-26.655,17.759l-.072.126-.056.134a18.141,18.141,0,0,0-1.37,9.426c.9,7.087,6.793,12.59,14.656,13.693a23.571,23.571,0,0,0,3.485.248,32.245,32.245,0,0,0,22.629-9.746c2.254,4.991,7.244,8.625,13.472,9.5a23.536,23.536,0,0,0,3.489.249c9.957,0,22.5-5.53,28.07-17.883,2.464-5.464,4.2-12.926,6.148-21.568a40.969,40.969,0,0,0,10.8-6.411,13.249,13.249,0,0,0,10.517,4.7c.2,0,.4,0,.6-.011a20.672,20.672,0,0,0,11.875-4.134c3.52,3.287,8.586,5.072,14.521,5.072a30.61,30.61,0,0,0,14.021-3.189,13.488,13.488,0,0,0,2.806,1.674,19.062,19.062,0,0,0,7.819,1.625,24.848,24.848,0,0,0,9.308-1.889,14.387,14.387,0,0,0,5.468,1.006,21.834,21.834,0,0,0,13.742-5.512l.015-.013.015-.014a31.716,31.716,0,0,0,9.353-16.293,5.437,5.437,0,0,0-1.163-4.639,7.6,7.6,0,0,0-5.354-2.9,3,3,0,0,0-3.013,2.121,47.02,47.02,0,0,1-5.191,10.45q-.411.548-.815,1.018a20.67,20.67,0,0,0,.513-8.142c-.707-5.553-3.979-9.108-6.607-11.964-.7-.758-1.356-1.474-1.934-2.183-.254-.311-.5-.584-.734-.847-.907-1.017-1.143-1.348-1.1-1.9.063-.464.245-.689.787-1.3l.133-.151c.1-.093.194-.185.293-.277a8.6,8.6,0,0,0,2.425-3.4c1.552-3.558.622-6.948-2.379-8.648l-.045-.026-.047-.024a7.358,7.358,0,0,0-3.311-.784,7.545,7.545,0,0,0-7.442,6.449,16.83,16.83,0,0,1-1.166,3.192c-3.339,7.876-9.476,19.15-14.265,24.513a12.431,12.431,0,0,0-3.217,8.29,11.661,11.661,0,0,1-6.424,1.989c-4.218,0-5.225-1.957-5.5-4.026a43.045,43.045,0,0,0,14.123-9.43c5.621-5.652,8.324-11.847,7.612-17.445-.606-4.751-4.287-7.476-10.1-7.476-6.8,0-13.992,3.73-19.719,10.233-6.237,7.083-9.558,16.139-8.719,23.725a4.649,4.649,0,0,1-2.913,1.559,2.519,2.519,0,0,1-1.056-.246l-.042-.019-.042-.017c-.4-.185-1.659-1.983-.8-5.005,2.145-7.127,5.909-15.01,9.55-22.634.908-1.9,1.847-3.867,2.752-5.8a3.741,3.741,0,0,0-.175-3.42,2.545,2.545,0,0,0-2.145-1.206,2.6,2.6,0,0,0-1.8.737c-1.115,1.044-5.442,2.39-8.511,2.39a6.547,6.547,0,0,1-.905-.055,3.193,3.193,0,0,0-.456-.033,3.378,3.378,0,0,0-3.175,2.515c-5.563,13.311-9.367,23.6-10.2,27.578a19.546,19.546,0,0,0-.68,4.891,33.439,33.439,0,0,1-5.074,3.524c3.026-12.383,6.9-25.176,13.436-36.809a3.384,3.384,0,0,0-.011-3.266,2.524,2.524,0,0,0-2.186-1.284,2.594,2.594,0,0,0-1.656.608c-1.019.835-5.579,2.066-8.325,2.066a4.171,4.171,0,0,1-.747-.051,2.984,2.984,0,0,0-3,1.216,10.032,10.032,0,0,0-4.6-.974h-.149c-10.568,0-20.618,11.193-25.084,22.249a38.716,38.716,0,0,0-2.723,13.167,34.2,34.2,0,0,1-4.542,3.08c3.027-12.383,6.9-25.177,13.439-36.81a3.385,3.385,0,0,0-.011-3.267,2.525,2.525,0,0,0-2.186-1.283,2.6,2.6,0,0,0-1.656.608c-1.019.835-5.579,2.066-8.325,2.066a4.172,4.172,0,0,1-.748-.051,2.985,2.985,0,0,0-3,1.215,10.04,10.04,0,0,0-4.6-.973H265.7c-10.569,0-20.619,11.193-25.085,22.249-.356.862-.7,1.845-1.027,2.908-1.676,4.773-6.572,13.235-10.437,13.235a2.581,2.581,0,0,1-1.073-.239c-.209-.315-.678-1.879.225-5.041.144-.469,2.474-8.028,3.4-11.167.3-.875.673-1.937,1.07-3.088l.019-.051.337-.936a43.481,43.481,0,0,0,10.7-7.606c2.647-2.5,2.652-6.615,1.479-9.589-.863-2.184-2.271-3.438-3.863-3.438a2.923,2.923,0,0,0-1.159.237l3.155-8.413c3.275-8.753,6.581-12.956,9.685-16.51,1.147-1.327,4.415-4.44,6.269-6.118l.057-.047a7.958,7.958,0,0,0,3.079-4.9,5.248,5.248,0,0,0-.9-4.189,4.249,4.249,0,0,0-3.373-1.365,10.026,10.026,0,0,0-4.35,1.3,13.653,13.653,0,0,1-6.319,1.706,29.915,29.915,0,0,1-7.124-1.486,75.359,75.359,0,0,0-21.959-3.387Zm9.529,30.4q1.134-1.332,2.28-2.569c-.08.189-.159.381-.239.576l-.01.024-.01.024c-1.142,2.988-7.25,19.709-8.984,24.46a24.467,24.467,0,0,1-3.8.183c-.838,0-2.781-.151-4.971-.417,1.338-1.964,2.64-3.94,3.914-5.872,2.59-3.929,5.269-7.992,8.176-11.849,1.353-1.744,2.544-3.236,3.641-4.56ZM357.7,311.36a56.671,56.671,0,0,1,2.908-5.421c3.14-5.12,5.646-7.033,6.9-7.139.3,3.825-4.594,8.885-9.8,12.56Zm-62.835,11.92a3.025,3.025,0,0,1-.832-.1l-.017-.005-.017,0c-.865-.239-1.14-1.694-1.218-2.309-.294-2.3.326-5.593,1.744-9.274l.008-.022.008-.022c3.237-8.962,8.747-12.3,11.46-12.3a.513.513,0,0,1,.3.068,1.381,1.381,0,0,1-.18.852l-.025.056-.022.058c-3.234,8.489-6.4,19.248-6.433,19.356l-.009.03-.008.03a4.941,4.941,0,0,1-4.761,3.594Zm-39.585,0a3.026,3.026,0,0,1-.832-.1l-.017-.005-.017,0c-.865-.239-1.14-1.694-1.218-2.309-.293-2.3.326-5.594,1.745-9.274l.008-.022.008-.022c3.237-8.962,8.747-12.3,11.459-12.3a.517.517,0,0,1,.3.068,1.383,1.383,0,0,1-.18.852l-.025.056-.022.058c-3.234,8.489-6.4,19.248-6.433,19.356l-.009.029-.008.03a4.941,4.941,0,0,1-4.761,3.594ZM167.343,327.8c-3.034,0-5.131-.642-6.233-1.91-1.061-1.221-1.4-3.266-1-6.078a15.76,15.76,0,0,1,5.6-9.966c3.863-3.192,9.242-4.811,15.986-4.811a36.808,36.808,0,0,1,9.055,1.217C179.9,322.3,173.847,327.8,167.343,327.8Zm217.312-8.865a46.659,46.659,0,0,0,4.358-7.128,23.015,23.015,0,0,1,.5,2.668,26.474,26.474,0,0,1,.1,5.566c-.29,2.585-1.344,7.912-5.14,9.773a8.593,8.593,0,0,0,1.566-3.084,8.075,8.075,0,0,0-1.383-7.8ZM270.113,340.165a41.457,41.457,0,0,0,9.685-5.526,8.522,8.522,0,0,0,2.54,2.421,9.055,9.055,0,0,0,3.155,1.169c-5.974,2.07-11.778,4.4-16.68,7.6.432-1.831.862-3.725,1.3-5.666Zm7.712,24.277a4.021,4.021,0,0,1-3.265-1.292c-.842-1.1-.952-3.017-.309-5.4.91-3.366,8.472-8.062,19.643-12.309a88.784,88.784,0,0,1-2.615,9.6c-2.388,6.27-8.958,8.481-10.915,9.009l-.016,0-.016,0a9.166,9.166,0,0,1-2.507.378Zm-39.585,0a4.021,4.021,0,0,1-3.265-1.292c-.842-1.1-.951-3.017-.308-5.4.909-3.366,8.471-8.06,19.643-12.308a88.99,88.99,0,0,1-2.616,9.6c-2.388,6.27-8.957,8.481-10.914,9.008l-.016,0-.016,0a9.177,9.177,0,0,1-2.508.378Z" transform="translate(-148.562 -243.519)" fill="#06203f"/>
        </g>
      </g>
    </svg>
    `}}function E(){return e.dy`
    <style>
      :host {
        display: block;
      }

      [hidden] {
        display: none !important;
      }
      li {
        display: block;
        margin-bottom: var(--spacing-default);
        text-transform: lowercase;
      }
      ul {
        margin: 0;
        padding: 0;
      }
      h2 {
        padding-left: 0 !important;
        margin-left: 0 !important;
      }
    </style>
    <h2>${this.header}</h2>
    <slot></slot>
    ${"libraries"==this.template?e.dy`
          <ul>
            <li>
              <a href="https://www.library.ucdavis.edu/library/peter-j-shields/"
                >Peter J. Shields Library</a
              >
            </li>
            <li>
              <a
                href="https://www.library.ucdavis.edu/library/carlson-health-sciences/"
                >Carlson Health Sciences Library</a
              >
            </li>
            <li>
              <a
                href="https://www.library.ucdavis.edu/library/blaisdell-medical/"
                >Blaisdell Medical Library</a
              >
            </li>
            <li>
              <a href="https://law.ucdavis.edu/library/">Mabie Law Library</a>
            </li>
            <li>
              <a
                href="https://www.library.ucdavis.edu/archives-and-special-collections/"
                >Archives and Special Collections at Shields Library</a
              >
            </li>
          </ul>
        `:e.dy``}
  `}customElements.define("ucdlib-site-footer",S);class C extends e.oi{static get properties(){return{header:{type:String},role:{type:String,reflect:!0},template:{type:String}}}static get styles(){return w()}constructor(){super(),this.render=E.bind(this),this.header="Footer Column Header",this.role="navigation",this.template=""}}customElements.define("ucdlib-site-footer-column",C),__webpack_require__(6819);class k extends((0,i.Z)(e.oi).with(r.C,o.LitCorkUtils)){static get properties(){return{page:{type:String},appRoutes:{type:Array},showSearchHeader:{type:Boolean},showBreadcrumb:{type:Boolean},localBuildTime:{type:String},appVersion:{type:String},clientTag:{type:String},clientHash:{type:String},coreTag:{type:String},coreHash:{type:String},showVersion:{type:Boolean},isAdmin:{type:Boolean},pathInfo:{type:String}}}constructor(){super(),this.active=!0,this.render=t.bind(this),this.SEARCH_HEADER_PAGES=["about","item","search","collections","collection","components","browse"],this.BREADCRUMB_PAGES=["item","search","collections"],this.loadedPages={},this.page="loading",this.appRoutes=APP_CONFIG.appRoutes,this.showSearchHeader=!1,this.showBreadcrumb=!1,this.showVersion="main"!==APP_CONFIG.env.UCD_DAMS_DEPLOYMENT_BRANCH,this.appVersion=APP_CONFIG.env.APP_VERSION,this.buildNum=APP_CONFIG.env.BUILD_NUM,this.clientEnv=APP_CONFIG.env.CLIENT_ENV,this.finAppVersion=APP_CONFIG.env.FIN_APP_VERSION,this.finBranchName=APP_CONFIG.env.FIN_BRANCH_NAME,this.finRepoTag=APP_CONFIG.env.FIN_REPO_TAG,this.finServerImage=APP_CONFIG.env.FIN_SERVER_IMAGE,this.finServerRepoHash=APP_CONFIG.env.FIN_SERVER_REPO_HASH,this.damsDeployBranch=APP_CONFIG.env.UCD_DAMS_DEPLOYMENT_BRANCH,this.damsDeploySha=APP_CONFIG.env.UCD_DAMS_DEPLOYMENT_SHA,this.damsDeployTag=APP_CONFIG.env.UCD_DAMS_DEPLOYMENT_TAG,this.damsRepoBranch=APP_CONFIG.env.UCD_DAMS_REPO_BRANCH,this.damsRepoSha=APP_CONFIG.env.UCD_DAMS_REPO_SHA,this.damsRepoTag=APP_CONFIG.env.UCD_DAMS_REPO_TAG,APP_CONFIG.env.BUILD_TIME?this.localBuildTime=new Date(APP_CONFIG.env.BUILD_TIME).toISOString().replace("T"," "):this.localBuildTime="Not set",this.isAdmin=APP_CONFIG.user?.roles?.includes("admin"),this.pathInfo="",this._injectModel("AppStateModel","AuthModel","CollectionModel","RecordModel"),window.addEventListener("expand-search-filters",this._expandSearchFilters.bind(this))}ready(){let e=document.querySelector("#loading");e&&document.body.removeChild(e),super.ready(),this.AuthModel.store.setUser(APP_CONFIG.user)}async _onAppStateUpdate(e){if(e.location.page===this.currentPage)return;this.currentPage=e.location.page,this.showBreadcrumb=this.BREADCRUMB_PAGES.includes(e.location.page),this.showSearchHeader=this.SEARCH_HEADER_PAGES.includes(e.location.page),this.appState=e,window.scrollTo(0,0);let t=e.location.page;if(this.loadedPages[t]||(this.page="loading",this.loadedPages[t]=this.loadPage(t)),await this.loadedPages[t],this.page=t,this.pathInfo=e.location.pathname.split("/media")[0],"collection"===this.page){let t=e.location.fullpath;this._onCollectionUpdate(await this.CollectionModel.get(t))}else if("item"===this.page){let t=e.location.fullpath;this._onRecordUpdate(await this.RecordModel.get(t))}["item","collection"].includes(this.page)||this._updatePageMetadata()}loadPage(e){return"home"===e?Promise.all([__webpack_require__.e(380),__webpack_require__.e(539),__webpack_require__.e(22),__webpack_require__.e(121),__webpack_require__.e(628)]).then(__webpack_require__.bind(__webpack_require__,2651)):"search"===e?Promise.all([__webpack_require__.e(100),__webpack_require__.e(960)]).then(__webpack_require__.bind(__webpack_require__,9278)):"item"===e?Promise.all([__webpack_require__.e(380),__webpack_require__.e(100),__webpack_require__.e(22),__webpack_require__.e(492),__webpack_require__.e(704)]).then(__webpack_require__.bind(__webpack_require__,6887)):"browse"===e?Promise.all([__webpack_require__.e(539),__webpack_require__.e(329)]).then(__webpack_require__.bind(__webpack_require__,5295)):"about"===e?Promise.all([__webpack_require__.e(539),__webpack_require__.e(485)]).then(__webpack_require__.bind(__webpack_require__,8715)):"collection"===e?Promise.all([__webpack_require__.e(380),__webpack_require__.e(589)]).then(__webpack_require__.bind(__webpack_require__,5031)):e}_updatePageMetadata(e="",t="",i=APP_CONFIG.title){e.length>21&&(e=e.slice(0,18)+"..."),e.length>0&&(e=e+" - "+i),document.title=e||i,document.head.querySelector('[name="description"]').content=t}async _onCollectionUpdate(e){if("loaded"!==e.state)return;if("collection"!==this.AppStateModel.location.page)return;let t=APP_CONFIG.title,i=e.vcData?.title||APP_CONFIG.collectionLabels[e.id]||"";i&&(t=i+" - "+t);let r=e.vcData?.description||"";this._updatePageMetadata(t,r)}async _onRecordUpdate(e){if("loaded"!==e.state)return;if("item"!==this.AppStateModel.location.page)return;let t=APP_CONFIG.title,i=e.vcData?.name||"";i&&(t=i+" - "+t);let r=e.vcData?.description||"";this._updatePageMetadata(t,r)}_expandSearchFilters(e){let t=document.querySelector("app-search");t&&t.expandFilters()}}customElements.define("fin-app",k)})()})();