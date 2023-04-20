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

    this.controlIcons = {
      single : 'dams-admin-collection-single',
      text : 'dams-admin-text',
      cards : 'dams-admin-collection-cards'
    };
    this.collectionIds = [{ position : 0, selected : '' }];
    this.sortedCollectionsList = Object.entries(APP_CONFIG.collectionLabels).sort((a,b) => (a[1] < b[1]) ? -1 : 1);
  }

  /**
   * @method firstUpdated
   * @description Lit lifecycle method
   */
  firstUpdated() {
    this.dispatchEvent(new CustomEvent('panel-loaded'));
    
    // build option lists here instead of using an array map in the template because
    //  the style overrides get messed up as the component renders after changes
    // this._updateCollectionOptions();
    // this._updateCollectionListOptions();
  }

  // willUpdate() {
  //   debugger
  //   this.sortedCollectionsList = Object.entries(APP_CONFIG.collectionLabels).sort((a,b) => (a[1] < b[1]) ? -1 : 1);
  // }

  /**
   * @method updated
   * @description Lit lifecycle method
   */
  updated() {
    if( this.isDirty ) {
      console.log('panel-loaded event called on panel ', this.position)
      this.isDirty = false;
      // this.dispatchEvent(new CustomEvent('panel-loaded'));
      // this._updateCollectionOptions();
      // this._updateCollectionListOptions();

      this._reset();
    }
  }

  _reset() {
    // TODO this kinda works, but still the dropdowns don't get updated with the correct styling
    if( this.type === 'single' ) {
      this.collectionIds = [];
      this.heading = '';
    } else if( this.type === 'text' ) {
      this.collectionId = '';
      this.collectionIds = [];
    } else if( this.type === 'cards' ) {
      this.heading = '';
      this.description = '';
      this.placement = '';
    }
    this.dispatchEvent(new CustomEvent('panel-loaded'));
  }

  /**
   * @method _updateCollectionOptions
   * @description build collection dropdown options
   */
  _updateCollectionOptions() {
    let slimSelects = this.shadowRoot.querySelectorAll('ucd-theme-slim-select.single-collection');
    if( slimSelects ) {
      slimSelects.forEach(slimSelect => {
        slimSelect.shadowRoot.querySelectorAll('select > option').forEach(option => {
          option.remove();
        });
        slimSelect.shadowRoot.querySelector('select').appendChild(document.createElement('option'));

        this.sortedCollectionsList.forEach(collection => {
          let option = document.createElement('option');
          option.value = collection[0];
          option.innerText = collection[1];
          if( collection[0] === this.collectionId ) { 
            option.selected = true;
          }
          slimSelect.shadowRoot.querySelector('select').appendChild(option);  
        });
      });
    }
  }

  /**
   * @method _updateCollectionListOptions
   * @description build collection dropdown options for each collection list panel
   */
  _updateCollectionListOptions() {
    let slimSelects = this.shadowRoot.querySelectorAll('ucd-theme-slim-select.list');
    if( slimSelects ) {
      slimSelects.forEach(slimSelect => {
        slimSelect.shadowRoot.querySelectorAll('select > option').forEach(option => {
          option.remove();
        });
        slimSelect.shadowRoot.querySelector('select').appendChild(document.createElement('option'));

        let position = slimSelect.dataset.position;
        let matchedCollection = this.collectionIds.filter(c => c.position === parseInt(position))[0];

        this.sortedCollectionsList.forEach(collection => {
          let option = document.createElement('option');
          option.value = collection[0];
          option.innerText = collection[1];
          if( matchedCollection && collection[0] === matchedCollection.selected ) { 
            option.selected = true;
          }
          slimSelect.shadowRoot.querySelector('select').appendChild(option);  
        });
      });
    }
  }

  /**
   * @method _addCollection
   * @description Add Collection button press event, add collection dropdown to ui
   */
  _addCollection() {
    this.collectionIds.push({ position : this.collectionIds.length, selected : '' });
    this.isDirty = true;
    this.requestUpdate();
  }

  /**
   * @method _onCollectionListChange
   * @description collection dropdown value change, save to collectionIds data array
   */
  _onCollectionListChange(e) {
    let position = e.currentTarget.dataset.position;
    let selected = e.detail.value;
    let match = this.collectionIds.filter(c => c.position === parseInt(position))[0];
    if( match ) {
      match.selected = selected;
    //   this.isDirty = true;
    //   this.requestUpdate();
    }
  }

  /**
   * @method _onTrashClicked
   * @description trash clicked, remove panel from admin view
   */
  _onTrashClicked(e) {
    this.dispatchEvent(new CustomEvent('trash-clicked', { detail : {
      position : this.position
    }}));
    // this.isDirty = true;
  }

  /**
   * @method _onUpArrowClicked
   * @description move panel up in admin view
   */
  _onUpArrowClicked(e) {
    this.dispatchEvent(new CustomEvent('up-arrow-clicked', { detail : {
      position : this.position
    }}));
    this.isDirty = true;
    this.sortedCollectionsList = [...Object.entries(APP_CONFIG.collectionLabels).sort((a,b) => (a[1] < b[1]) ? -1 : 1)]
    this.requestUpdate();
  }

  /**
   * @method _onDownArrowClicked
   * @description move panel down in admin view
   */
  _onDownArrowClicked(e) {
    this.dispatchEvent(new CustomEvent('down-arrow-clicked', { detail : {
      position : this.position
    }}));
    this.isDirty = true;
    this.sortedCollectionsList = [...Object.entries(APP_CONFIG.collectionLabels).sort((a,b) => (a[1] < b[1]) ? -1 : 1)]
    this.requestUpdate();
  }

}

customElements.define('admin-content-panel', AdminContentPanel);
