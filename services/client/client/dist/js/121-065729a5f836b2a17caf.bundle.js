"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[121],{4993:(t,e,i)=>{var a=i(5589),s=i(3557),n=i(7515),h=i(5114),r=i(2114),o=i(4927),l=i(5742),c=i(7405),d=i(8987),m=i(4192);function g(){return a.dy`
${this.isDemo?a.dy`
  <style>
    .l-navbar { top: auto !important}
  </style>
`:a.dy``}
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
    <div class="mobile-bar__fixed-site-name"><a href=${this.siteUrl}>${this.siteName}</a></div>
    <div class="mobile-bar__university">
      <a href="https://www.ucdavis.edu/" aria-label="UC Davis main website link">
        <img class="ucd-logo" src='data:image/svg+xml;utf8,${this._ucdLogo("gold")}' alt="UC Davis main website link">
      </a>
    </div>
  </div>

  <div id="branding-bar-container">
    <div class="header__bar">
        <div class="header__university">
          <a href="https://www.ucdavis.edu/" aria-label="UC Davis main website link">
            <img class="ucd-logo" src='data:image/svg+xml;utf8,${this._ucdLogo()}' alt="UC Davis main website link">
          </a>
        </div>
    </div>
    <div class="l-header__branding">
      ${this._hasSlottedBranding?a.dy`
        <slot name="branding-bar"></slot>
      `:a.dy`
        <div class="site-branding">
          <div class="site-branding__figure" ?hidden=${!this.figureSrc}>
            <a href="${this.siteUrl}" class="" aria-label="UC Davis Library website link"><img src=${this.figureSrc} class="site-logo" alt="Site Logo" /></a>
          </div>
          <div class="site-branding__body">
          <h1 class="site-branding__site-name" ?hidden=${!this.siteName}>
            <a href=${this.siteUrl}>${this.siteName}</a>
          </h1>
          <div class="site-branding__slogan" ?hidden=${!this.slogan}>${this.slogan}</div>
          </div>
        </div>
      `}
    </div>
  </div>

  <div class="${(0,s.$)(this._getNavbarClasses())}" id="nav-bar">
    <div class="l-container--navigation off-canvas off-canvas--left">
      <div class="off-canvas__container l-nav-horizontal">
        ${this._hasSearch?a.dy`
          <div class="l-nav-horizontal__search-popup">
            <slot name="search"></slot>
          </div>
        `:a.dy``}
        ${this._hasQuickLinks?a.dy`
          <div class="l-nav-horizontal__quick-links">
            <slot name="quick-links"></slot>
          </div>
        `:a.dy``}
        <div class="l-nav-horizontal__primary-nav">
          <slot name="primary-nav"></slot>
        </div>
        ${this._brandingBarLinks.length?a.dy`
          <div class='branding-bar-mobile-links'>
            <ul>
              ${this._brandingBarLinks.map((t=>a.dy`
                <li><a 
                  href=${(0,n.o)(t.href?t.href:null)}
                  target=${(0,n.o)(t.newTab?"_blank":null)}
                  >${t.linkText}</a></li>
              `))}
            </ul>

          </div>
        `:a.dy``}
      </div>
    </div>
  </div>
</header>
  

`}var v=i(8337),p=i(3333),u=i(5528);class b{constructor(t,e={},i="_onIntersection",a=!0){(this.host=t).addController(this),this.options=e,this.callback=i,this.observeSelf=a}hostConnected(){this.observer=new IntersectionObserver(this._callback.bind(this),this.options),this.observeSelf&&this.observer.observe(this.host)}hostDisconnected(){this.observer.disconnect()}_callback(t,e){this.host[this.callback]?this.host[this.callback](t,e):console.warn(`Element has no '${this.callback}' method. \n        Either add this method, or change the 'callback' argument on controller instantiation.`)}}class _ extends a.oi{static get properties(){return{siteName:{type:String,attribute:"site-name"},slogan:{type:String},figureSrc:{type:String,attribute:"figure-src"},siteUrl:{type:String,attribute:"site-url"},opened:{type:Boolean},silenceWarnings:{type:Boolean,attribute:"silence-warnings"},preventFixed:{type:Boolean,attribute:"prevent-fixed"},isDemo:{type:Boolean,attribute:"is-demo"},_transitioning:{type:Boolean,state:!0},_hasPrimaryNav:{type:Boolean,state:!0},_hasSlottedBranding:{type:Boolean,state:!0},_hasQuickLinks:{type:Boolean,state:!0},_hasSearch:{type:Boolean,state:!0},_brandingBarInView:{type:Boolean,state:!0},_brandingBarLinks:{type:Array,state:!0},_brandingBarListener:{type:Boolean,state:!0},_components:{type:Object,state:!0}}}static get styles(){return function(){const t=a.iv`
    :host {
      display: block;
    }
    [hidden] {
      display: none !important;
    }
    button {
      cursor: pointer;
    }
    ::slotted(ucdlib-branding-bar){
      width: 100%;
    }

    @media (max-width: 991px) {
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
    }

    @media (min-width: 992px) {
      .fixed-desktop .l-navbar {
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        width: 100%;
      }
      .branding-bar-mobile-links {
        display: none;
      }
    }
    .branding-bar-mobile-links ul {
      margin: 0px;
      padding: 0px;
      list-style: none;
    }
    .branding-bar-mobile-links li {
      margin: 0px;
      padding: 0px;
      list-style: none;
    }
    .branding-bar-mobile-links a {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      border-bottom: 0.15rem solid rgb(219, 234, 247);
      background-color: #fff;
      color: rgb(2, 40, 81);
      font-weight: 700;
      line-height: 1.5rem;
      text-decoration: none;
    }
    .branding-bar-mobile-links a:hover {
      background-color: rgb(255, 191, 0);
    }
    .branding-bar-mobile-links li:last-child a {
      border-bottom: none;
    }

  `;return[h.Z,r.Z,o.Z,l.Z,c.Z,d.Z,m.Z,t]}()}constructor(){super(),this.render=g.bind(this),this.mutationObserver=new v.F(this),this.wait=new p.H(this),new u.w(this,"_onLocationChange"),this.siteName="",this.siteUrl="/",this.slogan="",this.figureSrc="",this.opened=!1,this.isDemo=!1,this.silenceWarnings=!1,this._transitioning=!1,this._hasPrimaryNav=!1,this._hasSlottedBranding=!1,this._hasQuickLinks=!1,this._hasSearch=!1,this._animationDuration=500,this._brandingBarInView=!1,this._brandingBarLinks=[],this._brandingBarListener=!1,this._slottedComponents={}}connectedCallback(){super.connectedCallback(),this.preventFixed||(this.intersectionObserver=new b(this,{},"_onBrandingBarIntersection",!1))}firstUpdated(){if(!this.preventFixed){let t=this.renderRoot.getElementById("branding-bar-container");this.intersectionObserver.observer.observe(t)}}_onLocationChange(){this.close(),this._hasQuickLinks&&this._slottedComponents.quickLinks.close(),this._hasSearch&&this._slottedComponents.search.close()}_onBrandingBarIntersection(t){let e=0;try{e=this.renderRoot.getElementById("nav-bar").getBoundingClientRect().height}catch(t){}e>150&&(e=0),t.forEach((t=>{this._brandingBarInView=t.isIntersecting,this._brandingBarInView?this.style.marginBottom="0px":this.style.marginBottom=e+"px"}))}async open(){return!this._transitioning&&!this.opened&&(this.opened=!0,this._transitioning=!0,await this.wait.wait(this._animationDuration),this._transitioning=!1,!0)}async close(){return!(this._transitioning||!this.opened||(this.opened=!1,this._transitioning=!0,await this.wait.wait(this._animationDuration),this._transitioning=!1,0))}async _onBtnClick(){let t;t=this.opened?await this.close():await this.open(),t&&this.dispatchEvent(new CustomEvent("toggle",{detail:{open:this.opened}}))}_getNavbarClasses(){let t={"l-navbar":!0,header__navbar:!0};return this.opened?t["menu--open"]=!0:(this._transitioning||(t["menu--hidden"]=!0),t["menu--closed"]=!0),t}_getHeaderClasses(){let t={"l-header":!0,header:!0};return t["fixed-mobile"]=!this.preventFixed,t["fixed-desktop"]=!this.preventFixed&&!this._brandingBarInView,t}_ucdLogo(t="blue"){return encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="16.157"><path fill="${{blue:"#022851",gold:"#FFBF00"}[t]}" d="M58.865 4.877c.101.661 1.101 5.405 1.101 5.405h-2.194l1.093-5.405zm-8.328 11.03h5.806l.438-1.947h4.144l.554 1.947h5.806L61.846.403h-6.087l-5.222 15.504zM36.284.402h5.624c5.107 0 9.007 2.277 9.007 7.974 0 4.591-3.18 7.529-7.645 7.529l-6.986-.009V.402zm5.524 11.052h.376c1.843 0 3.207-1.072 3.207-3.096 0-2.179-1.21-3.395-3.234-3.395h-.349v6.491zM32.941.888l.296 2.545c.071.604.426 2.052-.011 1.858-.276-.121-.502-.776-.726-1.36-.114-.295-.658-1.695-.801-1.799-.685-.501-2.401-1.064-3.561-1.069-3.521-.013-5.847 2.509-5.847 6.982 0 3.208 1.582 7.061 5.607 7.061 1.441 0 4.201-.443 4.952-2.436.339-.9.65-1.703.876-1.459.166.177-.05.899-.15 1.289-.474 1.847-.501 2.406-.65 2.479-1.818.885-4.15 1.178-6.191 1.178-6.485 0-8.726-3.678-8.726-7.354 0-6.379 4.032-9.021 10.286-8.791 1.58.058 3.163.334 4.646.876M13.784 1.171L12.745.819c-.35-.306.075-.391.075-.391s1.5.271 5.24-.036c0 0 .328.062.103.319l-1.228.511c-.798.338-.798.143-.798.994l-.007 7.902c0 6.178-6.47 6.039-7.73 6.039-.6 0-6.488 0-6.488-4.961V2.834c0-1.46.159-1.419-.338-1.591L.071.695S-.183.347.269.368c1.227.06 3.004.316 7.133.024 0 0 .362.085.125.342l-1.201.339c-.95.414-.825.098-.849 1.045l.028 8.248c0 2.021 1.07 4.524 4.395 4.524 4.585 0 4.627-3.854 4.627-4.71l.009-8.167c.049-.77-.052-.551-.752-.842M87.65 14.715l1.6-4.111.281.23c.982.781 2.316 1.443 3.574 1.471 1.127.023 1.676-.268 1.527-1.191-.113-.693-.916-.812-1.417-.91l-1.103-.213c-2.143-.39-3.941-1.673-3.941-4.104 0-3.677 3.262-5.737 6.544-5.737 1.726 0 3.306.424 4.786 1.36L98.11 5.156c-.762-.533-1.918-1.285-3.377-1.337-.482-.018-1.58.229-1.229 1.312.152.462.833.657 1.252.755l1.241.292c2.325.526 4.003 1.81 4.003 4.432 0 3.699-3.281 5.529-6.542 5.529-1.901 0-4.106-.527-5.808-1.424M80.979.403h5.492v15.504h-5.492zM74.684.402h5.72l-5.843 15.503h-4.644L64.09.402h5.704l2.442 9.354z"/></svg>`)}_onBrandingBarUpdate(t){t.navItems?this._brandingBarLinks=t.navItems:this._brandingBarLinks=[]}_onChildListMutation(){let t=this.querySelector("ucd-theme-primary-nav");t?(t.setAttribute("slot","primary-nav"),this._hasPrimaryNav=!0,this._slottedComponents.primaryNav=t):(this.silenceWarnings||console.warn("No 'ucd-theme-primary-nav' child element found!"),this._hasPrimaryNav=!1);let e=this.querySelector("ucd-theme-quick-links");e?(e.setAttribute("slot","quick-links"),this._hasQuickLinks=!0,this._slottedComponents.quickLinks=e):this._hasQuickLinks=!1;let i=this.querySelector("ucd-theme-search-popup");i?(i.setAttribute("slot","search"),this._hasSearch=!0,this._slottedComponents.search=i):this._hasSearch=!1;let a=this.querySelector("ucdlib-branding-bar");a?(a.setAttribute("slot","branding-bar"),this._hasSlottedBranding=!0,this._slottedComponents.brandingBar=a,this._brandingBarListener||(this._onBrandingBarUpdate(a),a.addEventListener("nav-update",(t=>{this._onBrandingBarUpdate(t.target)})),this._brandingBarListener=!0)):this.querySelector("*[slot='branding-bar']")?(this._hasSlottedBranding=!0,this._brandingBarLinks=[]):(this._hasSlottedBranding=!1,this._brandingBarLinks=[])}}customElements.define("ucd-theme-header",_)},8153:(t,e,i)=>{var a=i(5589),s=i(4676),n=i(3205),h=i(2250),r=i(1644),o=i(613);function l(){return a.dy`
<style>
  ul.menu ul.menu {
    transition: opacity ${this.animationDuration+"ms"}, height ${this.animationDuration+"ms"};
  }
  ul.menu li.sf--hover > ul.menu {
    transition: opacity ${this.animationDuration+"ms"} ${this.hoverDelay+"ms"}, height ${this.animationDuration+"ms"};
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
    ${this.navItems.map(((t,e)=>this._renderNavItem(t,[e])))}
  </ul>
</nav>
`}var c=i(8279),d=i(3557),m=i(7515),g=i(8077),v=i(8405),p=i(8337),u=i(1914);class b extends((0,g.Z)(a.oi).with(v.V)){static get properties(){return{navType:{type:String,attribute:"nav-type"},styleModifiers:{type:String,attribute:"style-modifiers"},hoverDelay:{type:Number,attribute:"hover-delay"},animationDuration:{type:Number,attribute:"animation-duration"},navItems:{type:Array},maxDepth:{type:Number,attribute:"max-depth"},_megaIsOpen:{type:Boolean,state:!0}}}static get styles(){return function(){const t=a.iv`
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
  `;return[s.Z,n.Z,h.Z,r.Z,o.Z,t]}()}constructor(){super(),this.render=l.bind(this),this.mutationObserver=new p.F(this,{subtree:!0,childList:!0}),this.breakPoints=new u.P(this),this.navType="superfish",this.styleModifiers="",this.hoverDelay=300,this.animationDuration=300,this._classPrefix="primary-nav",this._acceptedNavTypes=["superfish","mega"],this._megaIsOpen=!1}openMegaNav(){this._megaIsOpen=!0}closeMegaNav(){this._megaIsOpen=!1}async openSubNav(t){if("object"!=typeof t||!Array.isArray(t)||0===t.length)return;let e=this.getNavItem(t);if(e)if(this.breakPoints.isMobile()){let i=this.renderRoot.getElementById(`nav--${t.join("-")}`);if(!i)return;let a=i.querySelector("ul");if(!a)return;if(e.isTransitioning)return;e.isTransitioning=!0,e.inlineStyles.display="block",e.inlineStyles.height="0px",this.requestUpdate(),await this.updateComplete;const s=a.scrollHeight+"px";e.inlineStyles.height=s,this.requestUpdate(),await this.updateComplete,this._completeMobileTransition(e)}else{if(this.isMegaMenu())return;if(this.clearItemInlineStyles(e),e.isClosing&&(e.isClosing=!1,this.requestUpdate()),e.timeout&&clearTimeout(e.timeout),e.isOpen)return;e.timeout=setTimeout((()=>{e.isOpen=!0,this.requestUpdate()}),this.hoverDelay)}}async closeSubNav(t){if("object"!=typeof t||!Array.isArray(t)||0===t.length)return;let e=this.getNavItem(t);if(e)if(this.breakPoints.isMobile()){let i=this.renderRoot.getElementById(`nav--${t.join("-")}`);if(!i)return;let a=i.querySelector("ul");if(!a)return;if(e.isTransitioning)return;e.isTransitioning=!0,e.inlineStyles.height=a.scrollHeight+"px",e.inlineStyles.display="block",this.requestUpdate(),await this.updateComplete,requestAnimationFrame((()=>{requestAnimationFrame((()=>{e.inlineStyles.height="0px",this.requestUpdate(),requestAnimationFrame((()=>{this._completeMobileTransition(e)}))}))}))}else{if(this.isMegaMenu())return;if(this.clearItemInlineStyles(e),e.timeout&&clearTimeout(e.timeout),!e.isOpen)return;e.isClosing=!0,this.requestUpdate(),e.timeout=setTimeout((()=>{e.isOpen=!1,e.isClosing=!1,this.requestUpdate()}),this.hoverDelay+this.animationDuration)}}closeAllSubNavs(t,e=!0){t||(t=this.navItems),t.forEach((t=>{t.isOpen&&(t.isOpen=!1,e&&this.requestUpdate()),t.subItems&&this.closeAllSubNavs(t.subItems)}))}isMegaMenu(){return"mega"===this.navType.toLowerCase().trim()}_getNavClasses(){let t=this._acceptedNavTypes[0];this._acceptedNavTypes.includes(this.navType.toLowerCase())&&(t=this.navType);let e="";this.styleModifiers&&(e=this.styleModifiers.split(" ").map((t=>`${this._classPrefix}--${t}`)).join(" "));let i=this.isMegaMenu()&&this._megaIsOpen?"is-hover":"";return`${this._classPrefix} ${this._classPrefix}--${t} ${e} ${i}`}_onChildListMutation(){let t=this.parseNavChildren();t.length&&(this.navItems=t)}_renderNavItem(t,e){const i=e.length-1;return this.itemHasSubNav(t)&&i<this.maxDepth?a.dy`
      <li 
        id="nav--${e.join("-")}"
        .key=${e}
        .hasnav=${!0}
        @mouseenter=${this._onItemMouseenter} 
        @mouseleave=${this._onItemMouseleave}
        class=${(0,d.$)(this._makeLiClassMap(t,i))}>
        <div class="submenu-toggle__wrapper ${0===i?`${this._classPrefix}__top-link`:""}">
          <a 
            href=${(0,m.o)(t.href?t.href:null)}
            tabindex=${this._setTabIndex(i)}
            @focus=${this._onItemFocus}>
            ${t.linkText}<span class="${this._classPrefix}__submenu-indicator"></span>
          </a>
          <button 
          @click=${()=>this._toggleMobileMenu(e)}
          class="submenu-toggle ${t.isOpen?"submenu-toggle--open":""}" 
          ?disabled=${t.isTransitioning}
          aria-label="Toggle Submenu">
          <span class="submenu-toggle__icon"></span>
        </button>
        </div>
        <ul class="menu ${t.isOpen?"menu--open":""}" style=${(0,c.V)(this._getItemMobileStyles(e))}>
          ${t.subItems.map(((t,i)=>this._renderNavItem(t,e.concat([i]))))}
        </ul>
      </li>
    `:a.dy`
      <li id="nav--${e.join("-")}" .key=${e} class=${(0,d.$)(this._makeLiClassMap(t,i))}>
        <div class="${0===i?`${this._classPrefix}__top-link`:""}">
          ${t.href?a.dy`
            <a 
              href=${t.href} 
              @focus=${this._onItemFocus}
              tabindex=${this._setTabIndex(i)}>
              ${t.linkText}</a>
          `:a.dy`
            <span class="${this._classPrefix}__nolink">${t.linkText}</span>
          `}
        </div>
      </li>
    `}_setTabIndex(t=0){let e=0;return this.isMegaMenu()&&t>0&&!this._megaIsOpen&&this.breakPoints.isDesktop()&&(e=-1),e}_makeLiClassMap(t,e=0){let i={};return i[`depth-${e}`]=!0,t.isOpen&&(i["sf--hover"]=!0),t.isClosing&&(i.closing=!0),t.megaFocus&&(i["mega-focus"]=!0),i}async _toggleMobileMenu(t){this.breakPoints.isDesktop()||(this.getNavItem(t).isOpen?this.closeSubNav(t):this.openSubNav(t))}_onNavMouseenter(){!this.breakPoints.isMobile()&&this.isMegaMenu()&&(this._megaTimeout&&clearTimeout(this._megaTimeout),this._megaTimeout=setTimeout((()=>{this.openMegaNav()}),this.hoverDelay))}_onNavMouseleave(){!this.breakPoints.isMobile()&&this.isMegaMenu()&&(this._megaTimeout&&clearTimeout(this._megaTimeout),this._megaTimeout=setTimeout((()=>{this.closeMegaNav()}),this.hoverDelay))}_onNavFocusin(){!this.breakPoints.isMobile()&&this.isMegaMenu()&&(this._megaIsOpen||(this._megaTimeout&&clearTimeout(this._megaTimeout),this._megaTimeout=setTimeout((()=>{this.openMegaNav()}),this.hoverDelay)))}_onItemMouseenter(t){this.breakPoints.isMobile()||this.openSubNav(t.target.key)}_onItemFocus(t){if(this.breakPoints.isMobile())return;const e=t.target.parentElement.parentElement;e.hasnav&&this.openSubNav(e.key),this.isMegaMenu()&&this._megaIsOpen&&this._setMegaFocus(e.key)}_setMegaFocus(t){this.navItems.forEach((t=>t.megaFocus=!1)),"object"!=typeof t||!Array.isArray(t)||t.length<1||(this.getNavItem([t[0]]).megaFocus=!0,this.requestUpdate())}_completeMobileTransition(t){t.timeout=setTimeout((()=>{t.inlineStyles={},t.isOpen=!t.isOpen,t.isTransitioning=!1,this.requestUpdate()}),this.animationDuration)}_onItemMouseleave(t){this.breakPoints.isMobile()||this.isMegaMenu()||this.closeSubNav(t.target.key)}_onNavFocusout(){this.breakPoints.isMobile()||(this.isMegaMenu()?(this._megaTimeout&&clearTimeout(this._megaTimeout),requestAnimationFrame((()=>{this.renderRoot.activeElement||(this._megaTimeout=setTimeout((()=>{this.navItems.forEach((t=>t.megaFocus=!1)),this.closeMegaNav()}),this.hoverDelay))}))):requestAnimationFrame((()=>{const t=this.renderRoot.activeElement;if(!t)return void this.closeAllSubNavs();let e=t;for(;e&&e.tagName!==this.tagName&&!Array.isArray(e.key);)e=e.parentElement;if(!e.key)return;let i=[...e.key],a=i.pop();(0==i.length?this.navItems:this.getNavItem(i).subItems).forEach(((t,e)=>{e!==a&&(t.isOpen=!1,this.closeAllSubNavs(t.subItems,!1))})),this.requestUpdate()})))}_getItemMobileStyles(t){if(this.breakPoints.isDesktop())return{};let e=this.getNavItem(t);return e.inlineStyles?e.inlineStyles:{}}}customElements.define("ucd-theme-primary-nav",b)},1314:(t,e,i)=>{var a=i(5589),s=i(9063);const n=a.dy`
  <svg>
    <defs>
    <g id="3d-rotation"><path d="M7.52 21.48C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32zm.89-6.52c-.19 0-.37-.03-.52-.08-.16-.06-.29-.13-.4-.24-.11-.1-.2-.22-.26-.37-.06-.14-.09-.3-.09-.47h-1.3c0 .36.07.68.21.95.14.27.33.5.56.69.24.18.51.32.82.41.3.1.62.15.96.15.37 0 .72-.05 1.03-.15.32-.1.6-.25.83-.44s.42-.43.55-.72c.13-.29.2-.61.2-.97 0-.19-.02-.38-.07-.56-.05-.18-.12-.35-.23-.51-.1-.16-.24-.3-.4-.43-.17-.13-.37-.23-.61-.31.2-.09.37-.2.52-.33.15-.13.27-.27.37-.42.1-.15.17-.3.22-.46.05-.16.07-.32.07-.48 0-.36-.06-.68-.18-.96-.12-.28-.29-.51-.51-.69-.2-.19-.47-.33-.77-.43C9.1 8.05 8.76 8 8.39 8c-.36 0-.69.05-1 .16-.3.11-.57.26-.79.45-.21.19-.38.41-.51.67-.12.26-.18.54-.18.85h1.3c0-.17.03-.32.09-.45s.14-.25.25-.34c.11-.09.23-.17.38-.22.15-.05.3-.08.48-.08.4 0 .7.1.89.31.19.2.29.49.29.86 0 .18-.03.34-.08.49-.05.15-.14.27-.25.37-.11.1-.25.18-.41.24-.16.06-.36.09-.58.09H7.5v1.03h.77c.22 0 .42.02.6.07s.33.13.45.23c.12.11.22.24.29.4.07.16.1.35.1.57 0 .41-.12.72-.35.93-.23.23-.55.33-.95.33zm8.55-5.92c-.32-.33-.7-.59-1.14-.77-.43-.18-.92-.27-1.46-.27H12v8h2.3c.55 0 1.06-.09 1.51-.27.45-.18.84-.43 1.16-.76.32-.33.57-.73.74-1.19.17-.47.26-.99.26-1.57v-.4c0-.58-.09-1.1-.26-1.57-.18-.47-.43-.87-.75-1.2zm-.39 3.16c0 .42-.05.79-.14 1.13-.1.33-.24.62-.43.85-.19.23-.43.41-.71.53-.29.12-.62.18-.99.18h-.91V9.12h.97c.72 0 1.27.23 1.64.69.38.46.57 1.12.57 1.99v.4zM12 0l-.66.03 3.81 3.81 1.33-1.33c3.27 1.55 5.61 4.72 5.96 8.48h1.5C23.44 4.84 18.29 0 12 0z"></path></g>
    <g id="accessibility"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"></path></g>
    <g id="accessible"><circle cx="12" cy="4" r="2"></circle><path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"></path></g>
    <g id="account-balance"><path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"></path></g>
    <g id="account-balance-wallet"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
    <g id="account-box"><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"></path></g>
    <g id="account-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></g>
    <g id="add"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g>
    <g id="add-alert"><path d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72C7.37 5.03 5.12 7.75 5.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z"></path></g>
    <g id="add-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
    <g id="add-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
    <g id="add-circle-outline"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
    <g id="add-shopping-cart"><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"></path></g>
    <g id="alarm"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>
    <g id="alarm-add"><path d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z"></path></g>
    <g id="alarm-off"><path d="M12 6c3.87 0 7 3.13 7 7 0 .84-.16 1.65-.43 2.4l1.52 1.52c.58-1.19.91-2.51.91-3.92 0-4.97-4.03-9-9-9-1.41 0-2.73.33-3.92.91L9.6 6.43C10.35 6.16 11.16 6 12 6zm10-.28l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM2.92 2.29L1.65 3.57 2.98 4.9l-1.11.93 1.42 1.42 1.11-.94.8.8C3.83 8.69 3 10.75 3 13c0 4.97 4.02 9 9 9 2.25 0 4.31-.83 5.89-2.2l2.2 2.2 1.27-1.27L3.89 3.27l-.97-.98zm13.55 16.1C15.26 19.39 13.7 20 12 20c-3.87 0-7-3.13-7-7 0-1.7.61-3.26 1.61-4.47l9.86 9.86zM8.02 3.28L6.6 1.86l-.86.71 1.42 1.42.86-.71z"></path></g>
    <g id="alarm-on"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-1.46-5.47L8.41 12.4l-1.06 1.06 3.18 3.18 6-6-1.06-1.06-4.93 4.95z"></path></g>
    <g id="all-out"><path d="M16.21 4.16l4 4v-4zm4 12l-4 4h4zm-12 4l-4-4v4zm-4-12l4-4h-4zm12.95-.95c-2.73-2.73-7.17-2.73-9.9 0s-2.73 7.17 0 9.9 7.17 2.73 9.9 0 2.73-7.16 0-9.9zm-1.1 8.8c-2.13 2.13-5.57 2.13-7.7 0s-2.13-5.57 0-7.7 5.57-2.13 7.7 0 2.13 5.57 0 7.7z"></path></g>
    <g id="android"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"></path></g>
    <g id="announcement"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"></path></g>
    <g id="apps"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></g>
    <g id="archive"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></g>
    <g id="arrow-back"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g>
    <g id="arrow-downward"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></g>
    <g id="arrow-drop-down"><path d="M7 10l5 5 5-5z"></path></g>
    <g id="arrow-drop-down-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 12l-4-4h8l-4 4z"></path></g>
    <g id="arrow-drop-up"><path d="M7 14l5-5 5 5z"></path></g>
    <g id="arrow-forward"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g>
    <g id="arrow-upward"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path></g>
    <g id="aspect-ratio"><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>
    <g id="assessment"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g>
    <g id="assignment"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></g>
    <g id="assignment-ind"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"></path></g>
    <g id="assignment-late"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 15h-2v-2h2v2zm0-4h-2V8h2v6zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></g>
    <g id="assignment-return"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 12h-4v3l-5-5 5-5v3h4v4z"></path></g>
    <g id="assignment-returned"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 15l-5-5h3V9h4v4h3l-5 5z"></path></g>
    <g id="assignment-turned-in"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>
    <g id="attachment"><path d="M2 12.5C2 9.46 4.46 7 7.5 7H18c2.21 0 4 1.79 4 4s-1.79 4-4 4H9.5C8.12 15 7 13.88 7 12.5S8.12 10 9.5 10H17v2H9.41c-.55 0-.55 1 0 1H18c1.1 0 2-.9 2-2s-.9-2-2-2H7.5C5.57 9 4 10.57 4 12.5S5.57 16 7.5 16H17v2H7.5C4.46 18 2 15.54 2 12.5z"></path></g>
    <g id="autorenew"><path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"></path></g>
    <g id="backspace"><path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"></path></g>
    <g id="backup"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>
    <g id="block"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"></path></g>
    <g id="book"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>
    <g id="bookmark"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>
    <g id="bookmark-border"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>
    <g id="bug-report"><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"></path></g>
    <g id="build"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"></path></g>
    <g id="cached"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"></path></g>
    <g id="camera-enhance"><path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-1l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z"></path></g>
    <g id="cancel"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g>
    <g id="card-giftcard"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>
    <g id="card-membership"><path d="M20 2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h4v5l4-2 4 2v-5h4c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zm0 13H4v-2h16v2zm0-5H4V4h16v6z"></path></g>
    <g id="card-travel"><path d="M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-2h16v2zm0-5H4V8h3v2h2V8h6v2h2V8h3v6z"></path></g>
    <g id="change-history"><path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"></path></g>
    <g id="award"><path d="M7.74,16.79c-.39-.39-.19-.28-1.13-.53a3.37,3.37,0,0,1-1.14-.6l-2,5a.72.72,0,0,0,.69,1l2.37-.09,1.63,1.72a.71.71,0,0,0,1.18-.23l2.34-5.73a3.22,3.22,0,0,1-3.9-.53Zm12.83,3.87-2-5a3.37,3.37,0,0,1-1.14.6c-.95.25-.74.14-1.13.53a3.22,3.22,0,0,1-3.9.53l2.34,5.73a.71.71,0,0,0,1.18.23l1.63-1.72,2.37.09A.72.72,0,0,0,20.57,20.66Zm-5.38-4.89c.69-.7.76-.63,1.74-.9a1.83,1.83,0,0,0,1.28-1.3,2.91,2.91,0,0,1,1.17-2.06,1.87,1.87,0,0,0,.46-1.78,3,3,0,0,1,0-2.37,1.88,1.88,0,0,0-.46-1.78,2.89,2.89,0,0,1-1.17-2.05,1.81,1.81,0,0,0-1.28-1.3,2.87,2.87,0,0,1-2-1.19A1.76,1.76,0,0,0,13.17.56a2.81,2.81,0,0,1-2.34,0A1.76,1.76,0,0,0,9.09,1a2.87,2.87,0,0,1-2,1.19,1.81,1.81,0,0,0-1.28,1.3A2.89,2.89,0,0,1,4.62,5.58a1.88,1.88,0,0,0-.46,1.78,3,3,0,0,1,0,2.37,1.87,1.87,0,0,0,.46,1.78,2.91,2.91,0,0,1,1.17,2.06,1.83,1.83,0,0,0,1.28,1.3c1,.27,1.08.23,1.74.9A1.76,1.76,0,0,0,11,16,1.8,1.8,0,0,1,13,16,1.76,1.76,0,0,0,15.19,15.77ZM7.76,8.4A4.24,4.24,0,1,1,12,12.72,4.28,4.28,0,0,1,7.76,8.4Z"></path></g>
    <g id="chalkboard-teacher"><path d="M7.8,15.6a.75.75,0,0,0-.26,0A4.93,4.93,0,0,1,6,15.9a4.93,4.93,0,0,1-1.54-.26.75.75,0,0,0-.26,0A4.2,4.2,0,0,0,0,19.82,1.79,1.79,0,0,0,1.8,21.6h8.4A1.79,1.79,0,0,0,12,19.82,4.2,4.2,0,0,0,7.8,15.6ZM6,14.4a3.6,3.6,0,1,0-3.6-3.6A3.6,3.6,0,0,0,6,14.4Zm16.2-12H7.8A1.83,1.83,0,0,0,6,4.26V6a4.68,4.68,0,0,1,2.4.67V4.8H21.6V15.6H19.2V13.2H14.4v2.4H11.54A4.79,4.79,0,0,1,13,18H22.2A1.83,1.83,0,0,0,24,16.14V4.26A1.83,1.83,0,0,0,22.2,2.4Z"></path></g>
    <g id="hand-holding-usd"><path d="M11.29,7.35l2.27.59a.36.36,0,0,1,.27.34.37.37,0,0,1-.38.35H12a1.27,1.27,0,0,1-.47-.09.61.61,0,0,0-.64.08l-.79.73a.48.48,0,0,0-.09.11.46.46,0,0,0,.16.65h0a3.66,3.66,0,0,0,1.44.48v.73a.69.69,0,0,0,.72.67H13a.7.7,0,0,0,.72-.67V10.6A2.39,2.39,0,0,0,16,8,2.52,2.52,0,0,0,14,6l-2.26-.6a.36.36,0,0,1-.28-.34.37.37,0,0,1,.38-.35h1.49a1.23,1.23,0,0,1,.46.1.59.59,0,0,0,.64-.09L15.26,4a.28.28,0,0,0,.09-.1.48.48,0,0,0-.15-.66h0a3.37,3.37,0,0,0-1.44-.48V2A.69.69,0,0,0,13,1.33h-.72a.7.7,0,0,0-.73.67v.73A2.4,2.4,0,0,0,9.35,5.36,2.54,2.54,0,0,0,11.29,7.35ZM23.55,15a1.39,1.39,0,0,0-1.77,0l-3.85,3.08a2.68,2.68,0,0,1-1.67.59H11.33a.67.67,0,0,1,0-1.34H14.6A1.38,1.38,0,0,0,16,16.22,1.64,1.64,0,0,0,16,16a1.33,1.33,0,0,0-1.33-1.33H8a4.92,4.92,0,0,0-3.09,1.09L3,17.33H.67A.67.67,0,0,0,0,18v4a.67.67,0,0,0,.67.67H15.53a2.66,2.66,0,0,0,1.67-.59l6.3-5a1.33,1.33,0,0,0,.21-1.87,1.29,1.29,0,0,0-.16-.17Z"></path></g>
    <g id="lightbulb"><path d="M4.78,6.4a2.62,2.62,0,0,1-.49-.19L2.39,5.12a.87.87,0,1,1,.85-1.51l2,1.17a.85.85,0,0,1,.36,1A1,1,0,0,1,4.78,6.4Z"/><path d="M2.5,8.81H3.61a.86.86,0,0,1,.9.82.83.83,0,0,1-.86.9c-.76,0-1.52,0-2.29,0A.83.83,0,0,1,.5,9.64a.85.85,0,0,1,.91-.83Z"/><path d="M21.18,15.88a3.66,3.66,0,0,1-.46-.18q-1-.54-1.92-1.11a.86.86,0,0,1-.34-1.17.83.83,0,0,1,1.14-.34c.7.38,1.39.78,2.08,1.19a.83.83,0,0,1,.35,1A.92.92,0,0,1,21.18,15.88Z"/><path d="M21.51,8.81h1.08a.84.84,0,0,1,.91.83.83.83,0,0,1-.87.89c-.76,0-1.51,0-2.27,0a.83.83,0,0,1-.87-.88.87.87,0,0,1,.91-.84Z"/><path d="M5.62,14a.82.82,0,0,1-.43.64c-.67.39-1.33.78-2,1.15a.86.86,0,0,1-.88-1.47c.67-.41,1.35-.81,2-1.18A.87.87,0,0,1,5.62,14Z"/><path d="M18.37,5.35a.8.8,0,0,1,.41-.59l2-1.14a.86.86,0,0,1,1.2.29.85.85,0,0,1-.33,1.21c-.65.38-1.3.76-2,1.13A.88.88,0,0,1,18.37,5.35Z"/><path d="M9.13,19.14a1.2,1.2,0,0,0,.19.64l.62.93a1.14,1.14,0,0,0,1,.51h2.22a1.14,1.14,0,0,0,1-.51l.62-.93a1.2,1.2,0,0,0,.19-.64V17.76H9.13Zm-3.46-10a6.29,6.29,0,0,0,1.57,4.17,10.61,10.61,0,0,1,1.88,3.29v0h5.77v0a10.23,10.23,0,0,1,1.88-3.29A6.34,6.34,0,1,0,5.67,9.12ZM12,6.24A2.88,2.88,0,0,0,9.13,9.12a.57.57,0,0,1-.58.57A.56.56,0,0,1,8,9.12a4,4,0,0,1,4-4,.57.57,0,0,1,.58.57A.58.58,0,0,1,12,6.24Z"></path></g>
    <g id="book-open"><path d="M22.15,3.06c-2.19.12-6.54.57-9.22,2.22a.59.59,0,0,0-.29.52V20.33a.63.63,0,0,0,.93.54c2.76-1.39,6.76-1.77,8.73-1.87a1.25,1.25,0,0,0,1.2-1.23V4.28A1.25,1.25,0,0,0,22.15,3.06ZM11.07,5.28C8.39,3.63,4,3.18,1.85,3.06A1.25,1.25,0,0,0,.5,4.28V17.77A1.25,1.25,0,0,0,1.7,19c2,.1,6,.48,8.73,1.87a.63.63,0,0,0,.93-.53V5.8A.58.58,0,0,0,11.07,5.28Z"></path></g>
    <g id="users"><path d="M3.6,10.8A2.4,2.4,0,1,0,1.2,8.4,2.41,2.41,0,0,0,3.6,10.8Zm16.8,0A2.4,2.4,0,1,0,18,8.4,2.41,2.41,0,0,0,20.4,10.8ZM21.6,12H19.2a2.39,2.39,0,0,0-1.69.7,5.47,5.47,0,0,1,2.81,4.1H22.8A1.2,1.2,0,0,0,24,15.6V14.4A2.41,2.41,0,0,0,21.6,12ZM12,12A4.2,4.2,0,1,0,7.8,7.8,4.2,4.2,0,0,0,12,12Zm2.88,1.2h-.31a5.8,5.8,0,0,1-5.14,0H9.12A4.33,4.33,0,0,0,4.8,17.52V18.6a1.81,1.81,0,0,0,1.8,1.8H17.4a1.81,1.81,0,0,0,1.8-1.8V17.52A4.33,4.33,0,0,0,14.88,13.2Zm-8.39-.5A2.39,2.39,0,0,0,4.8,12H2.4A2.41,2.41,0,0,0,0,14.4v1.2a1.2,1.2,0,0,0,1.2,1.2H3.67a5.51,5.51,0,0,1,2.82-4.1Z"></path></g>
    </defs>
  </svg>
`;(0,s.Q)(n,"ucdlib",24)}}]);