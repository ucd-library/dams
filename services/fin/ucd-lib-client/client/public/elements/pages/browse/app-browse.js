import { LitElement} from 'lit';
import render from "./app-browse.tpl.js";

class AppBrowse extends Mixin(LitElement) 
      .with(LitCorkUtils) {

  static get properties() {
    return {
    
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.active = true;
    this._injectModel('AppStateModel');
  }
  
}

customElements.define('app-browse', AppBrowse);