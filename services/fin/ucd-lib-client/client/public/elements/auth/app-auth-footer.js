import { LitElement } from "lit";
import AuthInterface from "../interfaces/AuthInterface"
import render from "./app-auth-footer.tpl.js"

class AppAuthFooter extends Mixin(LitElement).with(LitCorkUtils) {

  static get properties() {
    return {
      loggedIn : { type : Boolean },
      user : { type : Object },
      path : { type : String }
    }
  }

  constructor() {
    super();
    this.active = true;
    this.render = render.bind(this);

    this.loggedIn = false;
    this.user = {};

    this._injectModel("AppStateModel", "AuthModel");
  }

  _onAppStateUpdate(e) {
    this.user = APP_CONFIG.user;
    this.loggedIn = this.user.loggedIn;
    console.log(e)
    this.path = e.location.fullpath;
  }

  _login() {
    this.AuthModel.login();
  }

  _logout() {
    this.AuthModel.logout();
  }

}

customElements.define('app-auth-footer', AppAuthFooter);