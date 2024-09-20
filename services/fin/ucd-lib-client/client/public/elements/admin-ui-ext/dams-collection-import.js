import { LitElement } from 'lit';
import {render, styles} from "./dams-collection-import.tpl.js";
import {Mixin, MainDomElement} from '@ucd-lib/theme-elements/utils/mixins';
import {LitCorkUtils} from '@ucd-lib/cork-app-utils';

export default class DamsCollectionImport extends Mixin(LitElement)
  .with(MainDomElement, LitCorkUtils) {

  static get properties() {
    return {
      
    }
  }

  static get styles() {
    return styles();
  }


  constructor() {
    super();
    this.render = render.bind(this);
    this._injectModel('AppStateModel');
  }

  _onAppStateUpdate(e) {
    console.log(this.nodeName, 'onAppStateUpdate', e);
  }

}

customElements.define('dams-collection-import', DamsCollectionImport);