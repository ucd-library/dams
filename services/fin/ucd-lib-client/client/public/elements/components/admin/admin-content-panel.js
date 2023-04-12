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
      position : { type : Number },
      placement : { type : String },
      collectionId : { type : String },
      heading : { type : String },
      description : { type : String },
      collectionIds : { type : Array },
      controlIcon : { type : Object },
      collections : { type : Array },
      sortedCollectionsList : { type : Array }      
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.active = true;
    
    this.isDirty = false;
    this.type = '';
    this.position = 0;
    this.placement = '';
    this.collectionId = '';
    this.heading = '';
    this.description = '';
    this.collectionIds = [];

    this.controlIcons = {
      single : 'dams-admin-collection-single',
      text : 'dams-admin-text',
      cards : 'dams-admin-collection-cards'
    };
    this.collections = [{ id : '42', 'name' : 'Test Collection' }];
    this.sortedCollectionsList = [];
  }

  /**
   * @method firstUpdated
   * @description Lit lifecycle method
   */
  firstUpdated() {
    this.dispatchEvent(new CustomEvent('panel-loaded'));

    // append collection list to dropdowns before parent 'panel-loaded' event fires
    this.sortedCollectionsList = Object.entries(APP_CONFIG.collectionLabels).sort((a,b) => (a[1] < b[1]) ? -1 : 1);
    let slimSelects = this.shadowRoot.querySelectorAll('ucd-theme-slim-select');
    if( slimSelects ) {
      slimSelects.forEach(slimSelect => {
        this.sortedCollectionsList.forEach(collection => {
          let option = document.createElement('option');
          option.value = collection[0];
          option.innerText = collection[1];
          slimSelect.shadowRoot.querySelector('select').appendChild(option);  
        });  
      });
    }
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

  /**
   * @method _onTrashClicked
   * @description trash clicked, remove panel from admin view
   */
  _onTrashClicked(e) {
    this.dispatchEvent(new CustomEvent('trash-clicked', { detail : {
      position : this.position
    }}));
  }

  /**
   * @method _onUpArrowClicked
   * @description move panel up in admin view
   */
  _onUpArrowClicked(e) {
    this.dispatchEvent(new CustomEvent('up-arrow-clicked', { detail : {
      position : this.position,
      placement : this.placement,
      collectionId : this.collectionId,
      heading : this.heading,
      description : this.description,
      collectionIds : this.collectionIds
    }}));
    console.log('up arrow, description is ', this.description);
  }

  /**
   * @method _onDownArrowClicked
   * @description move panel down in admin view
   */
  _onDownArrowClicked(e) {
    this.dispatchEvent(new CustomEvent('down-arrow-clicked', { detail : {
      position : this.position,
      placement : this.placement,
      collectionId : this.collectionId,
      heading : this.heading,
      description : this.description,
      collectionIds : this.collectionIds
    }}));
    console.log('down arrow, description is ', this.description);
  }

  _descriptionChanged(e) {
    debugger;
    // TODO this is hacky, plus up/down only sends current data and other panel's data will get wiped.
    //  should we send events for every data input change?
    // this.description = e.currentTarget.value;
  }

}

customElements.define('admin-content-panel', AdminContentPanel);
