import { LitElement} from 'lit';
import render from './admin-content-panel.tpl.js';

import '@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon';
import '@ucd-lib/theme-elements/brand/ucd-theme-slim-select/ucd-theme-slim-select.js';

/**
 * @class AdminContentPanel
 * @description admin UI for customizing featured collections on the homepage
 */
export class AdminContentPanel extends LitElement {
  static get properties() {
    return {
      type : { type : String },
      controlIcon : { type : Object },
      collections : { type : Array }
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.active = true;
    
    this.isDirty = false;
    this.type = '';
    this.controlIcons = {
      single : 'dams-admin-collection-single.svg',
      text : 'dams-admin-text.svg',
      cards : 'dams-admin-collection-cards.svg'
    };
    this.collections = [{ id : '42', 'name' : 'Test Collection' }];
  }

  /**
   * @method firstUpdated
   * @description Lit lifecycle method
   */
  firstUpdated() {
    this.dispatchEvent(new CustomEvent('panel-loaded'));
    
  }

  /**
   * @method updated
   * @description Lit lifecycle method
   */
  updated() {
    if( this.isDirty ) {
      this.isDirty = false;
      this.dispatchEvent(new CustomEvent('panel-loaded'));
    }
  }

  /**
   * @method _addCollection
   * @description Add Collection button press event, add collection dropdown to ui
   */
  _addCollection() {
    console.log('in add collection woot');
    this.collections.push({ id : '42', 'name' : 'Test Collection' });
    this.isDirty = true;
    this.requestUpdate();
  }

}

customElements.define('admin-content-panel', AdminContentPanel);
