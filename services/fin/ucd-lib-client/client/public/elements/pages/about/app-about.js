import { LitElement, html } from 'lit';
import render from "./app-about.tpl.js";
import {MainDomElement} from '@ucd-lib/theme-elements/utils/mixins';

import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';

import "../../components/search-box";

class AppAbout extends Mixin(LitElement) 
  .with(LitCorkUtils, MainDomElement) {

  static get properties() {
    return {
    
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.active = true;
    this._injectModel('AppStateModel', 'CollectionModel', 'RecordModel');
  }

  /**
   * @method _onSearch
   * @description called from the search box button is clicked or
   * the enter key is hit.  set the text filter
   * @param {Object} e
   */
   _onSearch(e) {
    let searchDoc = this.RecordModel.emptySearchDocument();
    this.RecordModel.setTextFilter(searchDoc, e.detail);
    this.RecordModel.setSearchLocation(searchDoc);
  }
  
}

customElements.define('app-about', AppAbout);