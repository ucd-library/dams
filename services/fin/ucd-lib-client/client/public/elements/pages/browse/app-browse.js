import { LitElement} from 'lit';
import render from "./app-browse.tpl.js";

import '../../utils/app-browse-by';

class AppBrowse extends Mixin(LitElement) 
      .with(LitCorkUtils) {

  static get properties() {
    return {
      page : {type: String},
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.active = true;

    this.page = '';

    this._injectModel('AppStateModel');
  }

  async firstUpdated() {
    this._onAppStateUpdate(await this.AppStateModel.get());
  }

  _onAppStateUpdate(e) {
    this.page = e.location.pathname;
  }
  
}

customElements.define('app-browse', AppBrowse);
