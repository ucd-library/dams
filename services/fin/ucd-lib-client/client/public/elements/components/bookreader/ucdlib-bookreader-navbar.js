import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-bookreader-navbar.tpl.js";

import '@ucd-lib/theme-elements/ucdlib/ucdlib-icons/ucdlib-icons';

export default class UcdlibBookreaderNavbar extends LitElement {

  static get properties() {
    return {
      brSinglePage : { type: Boolean },
      brFullscreen : { type: Boolean }
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.brSinglePage = false;
    this.brFullscreen = false;
  }

  _onToggleBookView(e) {
    console.log('TODO: _onToggleBookView');
  }

  _onExpandBookView(e) {
    console.log('TODO: _onExpandBookView');
  }

  _onCollapseBookView(e) {
    console.log('TODO: _onCollapseBookView');
  }
  
  _onBRZoomInClicked(e) {
    console.log('TODO: _onBRZoomInClicked');
  }

  _onBRZoomOutClicked(e) {
    console.log('TODO: _onBRZoomOutClicked');
  }
  
}

customElements.define('ucdlib-bookreader-navbar', UcdlibBookreaderNavbar);