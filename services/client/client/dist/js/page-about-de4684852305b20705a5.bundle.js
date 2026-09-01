"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[485],{8715:(r,e,t)=>{t.r(e);var o=t(5589),i=(t(5988),t(7847)),a=t(4981),n=t(2416),l=t(334),d=t(9411),s=t(7405),c=t(8987),g=t(8083),p=t(7598),b=t(1479),m=t(9248);function h(){return o.dy`
    <style>
      ${i.F}
      ${a.Z}
      ${n.Z}
      ${l.Z}
      ${d.Z}
      ${s.Z}
      ${c.Z}
      ${g.Z}
      ${p.Z}
      ${b.Z}
      ${m.Z}
      :host {
        display: block;
        position: relative;
        background-color: var(--super-light-background-color);
      }

      .text-container {
        margin: 0;
        padding: 0 10px 50px 10px;
      }

      h1, h4 {
        color: var(--default-primary-color);
      }

      h4 {
        margin: 15px 0 0 0px;
      }

      .yellow-line {
        margin: 0 auto 0 0;
        text-align: left;
        width: 50px;
        height: 4px;

        border-color: var(--default-secondary-color);
        background-color: var(--default-secondary-color);
      }

      .fw-light {
        font-weight: 200;
        font-style: normal;
        margin: 0.75rem 0 0.25rem;
        padding: 0;
        line-height: 1.2;
      }

      app-about .title-section {
        text-align: center;
        border-bottom: dotted 5px var(--default-secondary-color);
      }

      app-about .title-section h1 {
        margin-top: 0.5rem;
      }

      app-about .splat-icon-container {
        display: flex;
        justify-content: center;
        padding-top: 2rem;
      }

      app-about .splat-icon-container img {
        width: 6rem;
      }


    </style>
    <div class="splat-icon-container">
      <img
        class="header-icon"
        slot="header-icon"
        src="/images/watercolors/watercolor-splat-sunset-about.png"
      />
    </div>
    <div class="text-container">  
      <div class="title-section">
        <h1>About<br><span class="fw-light">Digital Collections</span></h1>
      </div>
      
      <p>
        The UC Davis Digital Collections is a locally developed digital repository that 
        was designed to store and manage the digital assets of UC Davis. These Digital 
        Collections are intended to increase access to previously undiscoverable digital 
        assets held by the University Library.
      </p>
      
      <p>
        Initially launched in 2018, the repository currently stores <span>${this.count}</span> digital assets. 
        Assests will be added continually as they are ready.
      </p>
      
      <h4>Platform</h4>
      
      <p>
        The Digital Asset Management System is built on the Fedora Linked Data Platform. 
        Custom microservices are implemented using a Fedora (API-X) extension method as a general 
        methodology. The User Interface was built with web-components anticipating a need for 
        UI flexibility as the digital collection grows. For a more detailed explanation of 
        the development, see our code repositories:
        <a href="https://github.com/ucd-library/fin/blob/main/docs/README.md">Fin Server</a> or
        <a href="https://github.com/ucd-library/dams">DAMS Fin Implementation.</a>
      </p>
      
      <h4>Contact</h4>
      <div>
        <ul class="list--arrow">
          <li><a href="mailto:eanebeker@ucdavis.edu">Eric A Nebeker</a> (Digital Assets Specialist)</li>
        </ul>
      </div>
      
      <h4>Implementation Team</h4>
      <div>
        <ul class="list--arrow">
          <li><a href="https://www.library.ucdavis.edu/person/quinn-hart">Quinn Hart</a> (Team Lead)</li>
          <li><a href="https://www.library.ucdavis.edu/person/justin-merz">Justin Merz</a> (Lead Developer)</li>
          <li><a href="https://www.library.ucdavis.edu/person/dusty-cartwright">Dusty Cartwright</a> (Developer)</li>
          <li><a href="https://www.library.ucdavis.edu/person/kimmy-hescock">Kimmy Hescock</a> (User Experience Designer)</li>
        </ul>
      </div>
      
      <h4>DAMS Steering Committee Members</h4>
      <div>
        <ul class="list--arrow">
          <li><a href="https://www.library.ucdavis.edu/person/peter-brantley">Peter Brantley</a></li>
          <li><a href="https://www.library.ucdavis.edu/person/vessela-ensberg">Vessela Ensberg</a></li>
          <li><a href="https://www.library.ucdavis.edu/person/xiaoli-li">Xiaoli Li</a></li>
          <li><a href="https://www.library.ucdavis.edu/person/kevin-miller">Kevin Miller</a></li>
          <li><a href="https://www.library.ucdavis.edu/person/eric-nebeker">Eric Nebeker</a></li>
          <li><a href="https://www.library.ucdavis.edu/person/dale-snapp">Dale Snapp</a></li>
          <li><a href="https://www.library.ucdavis.edu/person/carl-stahmer">Carl Stahmer</a></li>
          <li><a href="https://www.library.ucdavis.edu/person/neil-weingarten">Neil Weingarten</a></li>
        </ul>
      </div>
      
      <p>
        The UC Davis Digital Collections was a project of the UC Davis Library's 
        <a href="https://www.library.ucdavis.edu/online-strategy/">Online Strategy team.</a>
      </p>
    </div>
`}var f=t(8077),u=t(5700),w=t(2959);t(2841);class y extends((0,f.Z)(o.oi).with(w.LitCorkUtils,u.C)){static get properties(){return{}}constructor(){super(),this.render=h.bind(this),this.active=!0,this._injectModel("AppStateModel","CollectionModel","RecordModel")}_onSearch(r){let e=this.RecordModel.emptySearchDocument();this.RecordModel.setTextFilter(e,r.detail),this.RecordModel.setSearchLocation(e)}}customElements.define("app-about",y)},5988:(r,e,t)=>{t.d(e,{Z:()=>i});var o=t(5589);const i=new class{headerDots(){return o.dy`
      <div class="header-dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    `}}},7598:(r,e,t)=>{t.d(e,{Z:()=>o});const o=t(5589).iv`

a {
  color: #13639e;
  text-decoration: underline;
  outline: 0;
}
a:hover {
  color: #00b2e3;
}
a:focus {
  color: #00b2e3;
}
a:active {
  color: #035369;
  outline: none;
}

`},1479:(r,e,t)=>{t.d(e,{Z:()=>o});const o=t(5589).iv`

@charset "UTF-8";
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 10ch;
  min-height: 2.5em;
  margin-bottom: 0;
  padding: 0.625em 1em;
  border: 1px solid #b0d0ed;
  background-color: transparent;
  color: #022851;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  text-decoration: none;
}
.btn:hover, .btn:focus {
  color: #022851;
  text-decoration: none;
}
.btn:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px #022851;
  outline-color: transparent;
  outline-style: solid;
}
.category-brand__background .btn, .dark-background .btn {
  border-color: var(--category-brand-contrast-color);
  color: var(--category-brand-contrast-color);
}

.btn--primary,
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 10ch;
  min-height: 2.5em;
  margin-bottom: 0;
  padding: 0.625em 1em;
  border: 1px solid #b0d0ed;
  background-color: transparent;
  color: #022851;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  text-decoration: none;
  --btn-arrow-color: #ffbf00;
  padding-right: 1.5em;
  padding-left: 0.75em;
  transition: 0.2s padding ease-out;
  --btn-arrow-color: #fff;
  border-color: transparent;
  background-color: #ffbf00;
}
.btn--primary:hover, .btn--primary:focus,
.button:hover,
.button:focus {
  color: #022851;
  text-decoration: none;
}
.btn--primary:focus,
.button:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px #022851;
  outline-color: transparent;
  outline-style: solid;
}
.category-brand__background .btn--primary, .dark-background .btn--primary,
.category-brand__background .button,
.dark-background .button {
  border-color: var(--category-brand-contrast-color);
  color: var(--category-brand-contrast-color);
}
.btn--primary:before,
.button:before {
  width: 1em;
  color: var(--btn-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.75em;
  font-weight: 900;
  opacity: 0;
  transform: translateX(-100%);
  transition: 0.2s all ease-out;
}
.btn--primary:hover,
.button:hover {
  padding-right: 1.125em;
  padding-left: 1.125em;
}
.btn--primary:hover:before,
.button:hover:before {
  opacity: 1;
  transform: translateX(-45%);
}
.category-brand__background .btn--primary, .dark-background .btn--primary,
.category-brand__background .button,
.dark-background .button {
  --btn-arrow-color: var(--category-brand-featured, var(--category-brand, #13639e));
  border-color: transparent;
  background-color: #fff;
  color: var(--category-brand-featured, var(--category-brand, #13639e));
}
.category-brand__background .btn--primary:hover, .dark-background .btn--primary:hover,
.category-brand__background .button:hover,
.dark-background .button:hover {
  color: var(--category-brand-featured, var(--category-brand, #13639e));
}
.category-brand__background--lighten .btn--primary,
.category-brand__background--lighten .button {
  --btn-arrow-color: var(--category-brand-contrast-color, #fff);
  border-color: transparent;
  background-color: var(--category-brand, #ffbf00);
  color: var(--category-brand-contrast-color, #022851);
}
.category-brand__background--lighten .btn--primary:hover, .category-brand__background--lighten .btn--primary:active,
.category-brand__background--lighten .button:hover,
.category-brand__background--lighten .button:active {
  color: var(--category-brand-contrast-color, #022851);
}

.btn--primary-input {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 10ch;
  min-height: 2.5em;
  margin-bottom: 0;
  padding: 0.625em 1em;
  border: 1px solid #b0d0ed;
  background-color: transparent;
  color: #022851;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  text-decoration: none;
  padding-right: 1.5em;
  padding-left: 1.5em;
  border-color: transparent;
  background-color: #ffbf00;
}
.btn--primary-input:hover, .btn--primary-input:focus {
  color: #022851;
  text-decoration: none;
}
.btn--primary-input:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px #022851;
  outline-color: transparent;
  outline-style: solid;
}
.category-brand__background .btn--primary-input, .dark-background .btn--primary-input {
  border-color: var(--category-brand-contrast-color);
  color: var(--category-brand-contrast-color);
}
.btn--primary-input:hover {
  padding-right: 1.5em;
  padding-left: 1.5em;
}
.category-brand__background .btn--primary-input, .dark-background .btn--primary-input {
  border-color: transparent;
  background-color: #fff;
  color: var(--category-brand-featured, var(--category-brand, #13639e));
}
.category-brand__background .btn--primary-input:hover, .dark-background .btn--primary-input:hover {
  color: var(--category-brand-featured, var(--category-brand, #13639e));
}

.btn--alt {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 10ch;
  min-height: 2.5em;
  margin-bottom: 0;
  padding: 0.625em 1em;
  border: 1px solid #b0d0ed;
  background-color: transparent;
  color: #022851;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  text-decoration: none;
  --btn-arrow-color: #ffbf00;
  padding-right: 1.5em;
  padding-left: 0.75em;
  transition: 0.2s padding ease-out;
  border-color: transparent;
  background-color: #022851;
  color: #fff;
}
.btn--alt:hover, .btn--alt:focus {
  color: #022851;
  text-decoration: none;
}
.btn--alt:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px #022851;
  outline-color: transparent;
  outline-style: solid;
}
.category-brand__background .btn--alt, .dark-background .btn--alt {
  border-color: var(--category-brand-contrast-color);
  color: var(--category-brand-contrast-color);
}
.btn--alt:before {
  width: 1em;
  color: var(--btn-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.75em;
  font-weight: 900;
  opacity: 0;
  transform: translateX(-100%);
  transition: 0.2s all ease-out;
}
.btn--alt:hover {
  padding-right: 1.125em;
  padding-left: 1.125em;
}
.btn--alt:hover:before {
  opacity: 1;
  transform: translateX(-45%);
}
.btn--alt:hover, .btn--alt:focus {
  color: #fff;
}
.btn--alt:focus {
  box-shadow: 0 0 0 3px #ffbf00;
}
.category-brand__background .btn--alt, .dark-background .btn--alt {
  --btn-arrow-color: var(--category-brand-contrast-color);
  border: 2px solid var(--category-brand-contrast-color, #fff);
  background-color: transparent;
}
.category-brand__background .btn--alt:hover, .category-brand__background .btn--alt:focus, .dark-background .btn--alt:hover, .dark-background .btn--alt:focus {
  background-color: rgba(var(--category-brand-rgb--dark, transparent), 0.1);
}

.btn--alt2 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 10ch;
  min-height: 2.5em;
  margin-bottom: 0;
  padding: 0.625em 1em;
  border: 1px solid #b0d0ed;
  background-color: transparent;
  color: #022851;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  text-decoration: none;
  --btn-arrow-color: #ffbf00;
  padding-right: 1.5em;
  padding-left: 0.75em;
  transition: 0.2s padding ease-out;
  border-color: transparent;
  background-color: #022851;
  color: #fff;
  background-color: #13639e;
}
.btn--alt2:hover, .btn--alt2:focus {
  color: #022851;
  text-decoration: none;
}
.btn--alt2:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px #022851;
  outline-color: transparent;
  outline-style: solid;
}
.category-brand__background .btn--alt2, .dark-background .btn--alt2 {
  border-color: var(--category-brand-contrast-color);
  color: var(--category-brand-contrast-color);
}
.btn--alt2:before {
  width: 1em;
  color: var(--btn-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.75em;
  font-weight: 900;
  opacity: 0;
  transform: translateX(-100%);
  transition: 0.2s all ease-out;
}
.btn--alt2:hover {
  padding-right: 1.125em;
  padding-left: 1.125em;
}
.btn--alt2:hover:before {
  opacity: 1;
  transform: translateX(-45%);
}
.btn--alt2:hover, .btn--alt2:focus {
  color: #fff;
}
.btn--alt2:focus {
  box-shadow: 0 0 0 3px #ffbf00;
}
.category-brand__background .btn--alt2, .dark-background .btn--alt2 {
  --btn-arrow-color: var(--category-brand-contrast-color);
  border: 2px solid var(--category-brand-contrast-color, #fff);
  background-color: transparent;
}
.category-brand__background .btn--alt2:hover, .category-brand__background .btn--alt2:focus, .dark-background .btn--alt2:hover, .dark-background .btn--alt2:focus {
  background-color: rgba(var(--category-brand-rgb--dark, transparent), 0.1);
}

.btn--alt3 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 10ch;
  min-height: 2.5em;
  margin-bottom: 0;
  padding: 0.625em 1em;
  border: 1px solid #b0d0ed;
  background-color: transparent;
  color: #022851;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  text-decoration: none;
  --btn-arrow-color: #ffbf00;
  padding-right: 1.5em;
  padding-left: 0.75em;
  transition: 0.2s padding ease-out;
  --btn-arrow-color: #13639e;
  border-color: transparent;
  background-color: #dbeaf7;
}
.btn--alt3:hover, .btn--alt3:focus {
  color: #022851;
  text-decoration: none;
}
.btn--alt3:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px #022851;
  outline-color: transparent;
  outline-style: solid;
}
.category-brand__background .btn--alt3, .dark-background .btn--alt3 {
  border-color: var(--category-brand-contrast-color);
  color: var(--category-brand-contrast-color);
}
.btn--alt3:before {
  width: 1em;
  color: var(--btn-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.75em;
  font-weight: 900;
  opacity: 0;
  transform: translateX(-100%);
  transition: 0.2s all ease-out;
}
.btn--alt3:hover {
  padding-right: 1.125em;
  padding-left: 1.125em;
}
.btn--alt3:hover:before {
  opacity: 1;
  transform: translateX(-45%);
}

.btn--invert {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 10ch;
  min-height: 2.5em;
  margin-bottom: 0;
  padding: 0.625em 1em;
  border: 1px solid #b0d0ed;
  background-color: transparent;
  color: #022851;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  text-decoration: none;
  --btn-arrow-color: #ffbf00;
  padding-right: 1.5em;
  padding-left: 0.75em;
  transition: 0.2s padding ease-out;
  border-color: #ffbf00;
  background-color: transparent;
}
.btn--invert:hover, .btn--invert:focus {
  color: #022851;
  text-decoration: none;
}
.btn--invert:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px #022851;
  outline-color: transparent;
  outline-style: solid;
}
.category-brand__background .btn--invert, .dark-background .btn--invert {
  border-color: var(--category-brand-contrast-color);
  color: var(--category-brand-contrast-color);
}
.btn--invert:before {
  width: 1em;
  color: var(--btn-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.75em;
  font-weight: 900;
  opacity: 0;
  transform: translateX(-100%);
  transition: 0.2s all ease-out;
}
.btn--invert:hover {
  padding-right: 1.125em;
  padding-left: 1.125em;
}
.btn--invert:hover:before {
  opacity: 1;
  transform: translateX(-45%);
}

.btn--disabled,
.btn[disabled],
[disabled] .btn {
  box-shadow: none;
  cursor: not-allowed;
  opacity: 0.3;
  pointer-events: none;
}

.btn--lg {
  font-size: 1.25rem;
}

.btn--sm {
  font-size: 0.875rem;
}

.btn--round {
  border-radius: 1.25em;
}

.btn--block {
  display: flex;
  width: 100%;
}

.btn--input {
  padding-right: 1em;
  padding-left: 1em;
}
.btn--input:hover {
  padding-right: 0.75em;
  padding-left: 0.75em;
}

`},8083:(r,e,t)=>{t.d(e,{Z:()=>o});const o=t(5589).iv`

.heading {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
}
.heading:first-child {
  margin-top: 0;
}

.heading--primary {
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
.heading--primary:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--primary {
    font-size: 2.0995rem;
  }
}

.heading--secondary {
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
.heading--secondary:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--secondary {
    font-size: 1.7425rem;
  }
}

.heading--highlight {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #022851;
  font-size: 1.42rem;
  font-style: inherit;
}
.heading--highlight:first-child {
  margin-top: 0;
}

.heading--auxiliary {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #666;
  font-size: 1.3325rem;
  margin-bottom: 0.5rem;
  color: #022851;
  font-style: italic;
  font-weight: 700;
}
.heading--auxiliary:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--auxiliary {
    font-size: 1.7425rem;
  }
}

.heading--weighted {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #13639e;
  font-size: 1.6055rem;
  color: #022851;
  font-weight: 200;
}
.heading--weighted:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--weighted {
    font-size: 2.0995rem;
  }
}
.heading--weighted--weighted {
  font-weight: 700;
}

.heading--underline {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #13639e;
  font-size: 1.6055rem;
  color: #022851;
  font-weight: 200;
}
.heading--underline:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--underline {
    font-size: 2.0995rem;
  }
}
.heading--underline:after {
  display: block;
  width: 4rem;
  margin: 0.5rem 0 1rem;
  border-top: 0.42rem dotted #ffbf00;
  content: "";
}
.panel--center .heading--underline:after {
  margin: 0.5rem auto;
}
[class^=category-brand--] .heading--underline:after {
  border-color: #fff;
}

.heading--weighted-underline {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #13639e;
  font-size: 1.6055rem;
  color: #022851;
  font-weight: 200;
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #13639e;
  font-size: 1.6055rem;
  color: #022851;
  font-weight: 200;
}
.heading--weighted-underline:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--weighted-underline {
    font-size: 2.0995rem;
  }
}
.heading--weighted-underline:after {
  display: block;
  width: 4rem;
  margin: 0.5rem 0 1rem;
  border-top: 0.42rem dotted #ffbf00;
  content: "";
}
.panel--center .heading--weighted-underline:after {
  margin: 0.5rem auto;
}
[class^=category-brand--] .heading--weighted-underline:after {
  border-color: #fff;
}
.heading--weighted-underline:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--weighted-underline {
    font-size: 2.0995rem;
  }
}
.heading--weighted-underline--weighted {
  font-weight: 700;
}

.heading--invert {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #666;
  font-size: 1.3325rem;
  color: var(--category-brand-contrast-color, #fff);
}
.heading--invert:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--invert {
    font-size: 1.7425rem;
  }
}

.heading--invert-box {
  margin: 0.75em 0 0.25em;
  padding: 0;
  color: #022851;
  font-size: 1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.2;
  color: #666;
  font-size: 1.3325rem;
  color: var(--category-brand-contrast-color, #fff);
  margin: 0;
  padding: 1rem;
  background-color: var(--category-brand, #022851);
}
.heading--invert-box:first-child {
  margin-top: 0;
}
@media (min-width: 768px) {
  .heading--invert-box {
    font-size: 1.7425rem;
  }
}
@media (min-width: 992px) {
  .heading--invert-box {
    padding: 1rem;
  }
}

`},9248:(r,e,t)=>{t.d(e,{Z:()=>o});const o=t(5589).iv`

@charset "UTF-8";
:host {
  --list-arrow-color: #ffc519;
  --list-bordered-border: #dbeaf7;
  --list-faq-question: #13639e;
  --list-faq-question-hover: #001124;
  --list-faq-a: #022851;
  --list-pipe-pipe: #4c4c4c;
  --list-faq-prefix-spacing: 1.5rem;
  --list-bordered-vertical-spacing: 0.5rem;
}

.list--flush,
.list-wrapper--flush ul {
  margin: 0;
  padding: 0 0 0 1.25rem;
}

.list--arrow li,
.list-wrapper--arrow ul li {
  position: relative;
  margin-left: -1ch;
  padding-left: 1ch;
}
.list--arrow li::marker,
.list-wrapper--arrow ul li::marker {
  color: var(--list-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.8em;
  font-weight: 900;
}
.list--arrow li li::marker,
.list-wrapper--arrow ul li li::marker {
  content: "";
  font-size: 1em;
}
.list--arrow li li li::marker,
.list-wrapper--arrow ul li li li::marker {
  content: "";
  font-size: 0.8em;
}

.list--white-arrow,
.list-wrapper--white-arrow ul {
  --list-arrow-color: #fff;
}
.list--white-arrow li,
.list-wrapper--white-arrow ul li {
  position: relative;
  margin-left: -1ch;
  padding-left: 1ch;
}
.list--white-arrow li::marker,
.list-wrapper--white-arrow ul li::marker {
  color: var(--list-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.8em;
  font-weight: 900;
}
.list--white-arrow li li::marker,
.list-wrapper--white-arrow ul li li::marker {
  content: "";
  font-size: 1em;
}
.list--white-arrow li li li::marker,
.list-wrapper--white-arrow ul li li li::marker {
  content: "";
  font-size: 0.8em;
}

.list--bordered,
.list-wrapper--bordered ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list--bordered ul,
.list-wrapper--bordered ul ul {
  margin-top: var(--list-bordered-vertical-spacing);
  border-top: 1px solid var(--list-bordered-border);
}
.list--bordered ul li:first-child,
.list-wrapper--bordered ul ul li:first-child {
  padding-top: var(--list-bordered-vertical-spacing);
}
.list--bordered li,
.list--bordered > div,
.list-wrapper--bordered ul li,
.list-wrapper--bordered ul > div {
  position: relative;
  margin-bottom: var(--list-bordered-vertical-spacing);
  padding: 0 0 var(--list-bordered-vertical-spacing) 2rem;
  border-bottom: 1px solid var(--list-bordered-border);
}
.list--bordered li:last-child,
.list--bordered > div:last-child,
.list-wrapper--bordered ul li:last-child,
.list-wrapper--bordered ul > div:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: 0;
}
.list--bordered li:before,
.list--bordered > div:before,
.list-wrapper--bordered ul li:before,
.list-wrapper--bordered ul > div:before {
  position: absolute;
  margin: 0 0 0 -1.7em;
  color: var(--list-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.8em;
  font-weight: 900;
  line-height: 2.1;
}
.list--bordered li li,
.list--bordered > div li,
.list-wrapper--bordered ul li li,
.list-wrapper--bordered ul > div li {
  padding-left: 0;
}
.list--bordered li li:before,
.list--bordered > div li:before,
.list-wrapper--bordered ul li li:before,
.list-wrapper--bordered ul > div li:before {
  content: "";
}

.list--faq,
.list-wrapper--faq ul {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
  margin-left: 1rem;
}
.list--faq li,
.list-wrapper--faq ul li {
  list-style: none;
}
.list--faq > li,
.list-wrapper--faq ul > li {
  padding: 0 0.5rem 0.5rem var(--list-faq-prefix-spacing);
}
.list--faq > li:nth-child(odd),
.list-wrapper--faq ul > li:nth-child(odd) {
  padding-top: 0.5rem;
  color: var(--category-brand-contrast-color, var(--list-faq-question));
  cursor: pointer;
  font-weight: 800;
  text-decoration: none;
}
.list--faq > li:nth-child(odd):hover,
.list-wrapper--faq ul > li:nth-child(odd):hover {
  color: var(--category-brand-contrast-color, var(--list-faq-question-hover));
  opacity: 0.8;
}
.list--faq > li:nth-child(odd):not(:first-child),
.list-wrapper--faq ul > li:nth-child(odd):not(:first-child) {
  border-top: 1px solid var(--list-bordered-border);
}
.list--faq > li:nth-child(odd):before,
.list-wrapper--faq ul > li:nth-child(odd):before {
  display: inline-block;
  width: var(--list-faq-prefix-spacing);
  margin-left: calc(-1 * var(--list-faq-prefix-spacing));
  content: "Q:";
  font-weight: 800;
}
.list--faq > li:nth-child(odd) > p,
.list-wrapper--faq ul > li:nth-child(odd) > p {
  margin: 0;
}
.list--faq > li:nth-child(even),
.list-wrapper--faq ul > li:nth-child(even) {
  padding-bottom: 1rem;
}
.list--faq > li:nth-child(even):before,
.list-wrapper--faq ul > li:nth-child(even):before {
  display: inline-block;
  float: left;
  width: var(--list-faq-prefix-spacing);
  margin-left: calc(-1 * var(--list-faq-prefix-spacing));
  color: var(--category-brand-contrast-color, var(--list-faq-a));
  content: "A:";
  font-weight: 800;
}

.list--pipe,
.list-wrapper--pipe ul {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.list--pipe li,
.list-wrapper--pipe ul li {
  list-style: none;
}
.list--pipe li,
.list-wrapper--pipe ul li {
  display: inline-block;
  margin-right: 0.25rem;
  padding-right: 0.5rem;
  border-right: 1px solid var(--category-brand-contrast-color, var(--list-pipe-pipe));
  line-height: 1;
}
.list--pipe li:last-child,
.list-wrapper--pipe ul li:last-child {
  margin-right: 0;
  padding-right: 0;
  border-right: 0;
}

.list--comment {
  margin: 0;
  padding: 0;
  list-style: none;
  margin: 0;
  padding: 0 0 2rem;
}
.list--comment ul {
  margin-top: var(--list-bordered-vertical-spacing);
  border-top: 1px solid var(--list-bordered-border);
}
.list--comment ul li:first-child {
  padding-top: var(--list-bordered-vertical-spacing);
}
.list--comment li,
.list--comment > div {
  position: relative;
  margin-bottom: var(--list-bordered-vertical-spacing);
  padding: 0 0 var(--list-bordered-vertical-spacing) 2rem;
  border-bottom: 1px solid var(--list-bordered-border);
}
.list--comment li:last-child,
.list--comment > div:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: 0;
}
.list--comment li:before,
.list--comment > div:before {
  position: absolute;
  margin: 0 0 0 -1.7em;
  color: var(--list-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.8em;
  font-weight: 900;
  line-height: 2.1;
}
.list--comment li li,
.list--comment > div li {
  padding-left: 0;
}
.list--comment li li:before,
.list--comment > div li:before {
  content: "";
}

.list--simple,
.list-wrapper--simple ul {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.list--simple li,
.list-wrapper--simple ul li {
  list-style: none;
}
.list--simple li,
.list-wrapper--simple ul li {
  margin-bottom: 0;
  font-size: 1rem;
  font-style: normal;
  margin-bottom: 1rem;
}
.list--simple li ul,
.list-wrapper--simple ul li ul {
  margin-top: 1rem;
}
.list--simple a,
.list-wrapper--simple ul a {
  font-weight: 400;
}

.list--filter {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.list--filter li {
  list-style: none;
}
.list--filter li {
  padding: 0.25rem 0 0.25rem 0.5rem;
}

.list--multilevel {
  list-style-type: decimal;
}
.list--multilevel ol {
  list-style-type: lower-alpha;
}
.list--multilevel ol ol {
  list-style-type: lower-roman;
}

.list--outline {
  list-style-type: upper-roman;
}
.list--outline ol {
  list-style-type: upper-alpha;
}
.list--outline ol ol {
  list-style-type: decimal;
}
.list--outline ol ol ol {
  list-style-type: lower-latin;
}
.list--outline ol ol ol ol {
  list-style-type: lower-roman;
}

.list--reset {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.list--reset li {
  list-style: none;
}

.list--accordion {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
  margin-bottom: 1rem;
}
.list--accordion li {
  list-style: none;
}
.list--accordion > li {
  padding: 0 0.5rem 0.5rem var(--list-faq-prefix-spacing);
}
.list--accordion > li:nth-child(odd) {
  position: relative;
  display: block;
  padding: 0.5rem 2rem;
  border: 0;
  border-bottom: 1px solid #cce0f3;
  background-color: #022851;
  color: #fff;
  cursor: pointer;
  font-style: normal;
  font-weight: 800;
  text-align: left;
  white-space: normal;
}
.list--accordion > li:nth-child(odd):before {
  position: absolute;
  margin: -0.15em 0 0 -1.43em;
  color: var(--list-arrow-color);
  content: "";
  font-family: "Font Awesome 5 Free";
  font-size: 0.8em;
  font-weight: 900;
  line-height: 2.5;
}
.list--accordion > li:nth-child(odd) > p {
  margin: 0;
}
.list--accordion > li:nth-child(even) {
  padding: 0.5rem 2rem;
  background-color: #ebf3fa;
  color: #000;
}
.list--accordion .active:before {
  transform: rotate(90deg);
}

.list--download {
  margin: 0;
  padding: 0 0 0 1.25rem;
  padding-left: 0;
  list-style: none;
}
.list--download li {
  list-style: none;
}
.list--download a {
  color: #13639e;
  text-decoration: underline;
}
.list--download a:hover {
  color: #00b2e3;
}

`}}]);