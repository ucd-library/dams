import { LitElement} from 'lit';

import render from './nav-bar.tpl.js';

import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';

import '@ucd-lib/theme-elements/ucdlib/ucdlib-header/ucdlib-header.js';
import '@ucd-lib/theme-elements/ucdlib/ucdlib-primary-nav/ucdlib-primary-nav.js';
// import '@ucd-lib/theme-elements/brand/ucd-theme-primary-nav/ucd-theme-primary-nav.js';

/**
 * @class AppNavBar
 * @description UI component for the Navigation Bar
 */
export class AppNavBar extends Mixin(LitElement)
.with(LitCorkUtils) {

  static get properties() {
    return {
      placeholder : { type : String },
      browse : { type : Object },
      background : { type: String },
      choices: { type: Array },
      currentPage: { type: String }
    };

  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.placeholder = "";
    this.searchValue = "";
    this.background = '/images/home-gradient.png';
    this.choices = [];
    this.currentPage = '';

    this._injectModel('AppStateModel');

    window.addEventListener('click', () => this.hideDropdowns());
  }

  async _onAppStateUpdate(e) {
    // close nav on page change, for mobile in particular
    if( e.location.fullpath !== this.currentPage ) {
      this.currentPage = e.location.fullpath;
      let headerNav = this.shadowRoot.querySelector('ucdlib-header');
      if( headerNav ) {
        await headerNav.close();
      }
    }
  }

  /**
   * @method _onBtnClick
   * @description bound to click events on nav buttons, show menu
   * if there are choices (dropdown) for this menu
   * 
   * @param {MouseEvent} e 
   */
  _onBtnClick(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    this.showBtnDropdownByIndex(index);    

    e.stopPropagation();
    e.preventDefault();
  }

  updated(e) {
    // hide home link if not mobile (width < 768px)
    if( window.innerWidth > 767 ) {
      let header = this.shadowRoot.querySelector('ucdlib-header');
      if( header ) {
        // header.querySelector('#nav--0').style.display = 'none';
      }
    }
  }

  /**
   * @method _onBtnKeyDown
   * @description bound to key down events on main button.  Show
   * dropdown if enter key is pressed
   * 
   * @param {KeyboardEvent} e 
   */
  _onBtnKeyDown(e) {
    if( e.which === 13 ) {
      let index = parseInt(e.currentTarget.getAttribute('index'));
      this.showBtnDropdownByIndex(index);
    }
  }

  /**
   * @method _onBtnMouseOver
   * @description bound to mouse over event on main button.
   * Show dropdown on mouse over
   * 
   * @param {MouseEvent} e 
   */
  _onBtnMouseOver(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    this.showBtnDropdownByIndex(index);    
  }

  /**
   * @method _onBtnMouseOut
   * @description bound to mouse out events on main button.
   * Hide the dropdown
   */
  _onBtnMouseOut() {
    this.hideDropdowns();    
  }

  /**
   * @method _onBtnFocusOut
   * @description bound to focusout events on main button.  Hide
   * dropdown if a child element doesn't have focus.
   * 
   * @param {FocusEvent} e 
   * @returns 
   */
  _onBtnFocusOut(e) {
    if( e.currentTarget.contains(e.relatedTarget) ) {
      return;
    }
    this.hideDropdowns();
  }

  /**
   * @method showBtnDropdownByIndex
   * @description down a dropdown based on choice index in choices array.
   * If the choice doesn't have a dropdown, this opp is ignored
   * 
   * @param {Number} index 
   */
  showBtnDropdownByIndex(index) {
    let choice = this.choices[index];
    if( !choice.dropdown ) return;

    this.choices.forEach((choice,i) => choice.dropdownVisible = (i === index));
    this.dropdownVisible = true;
    this.requestUpdate();
  }

  /**
   * @method hideDropdowns
   * @description hide all dropdowns
   */
  hideDropdowns() {
    if( !this.dropdownVisible ) return;
    this.choices.forEach(choice => choice.dropdownVisible = false);
    this.dropdownVisible = false;
    this.requestUpdate();
  }

}
customElements.define('app-nav-bar', AppNavBar);