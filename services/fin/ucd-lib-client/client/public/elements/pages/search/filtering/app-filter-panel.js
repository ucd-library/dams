import { LitElement } from "lit";

import "@polymer/paper-tabs/paper-tabs"
import "@ucd-lib/cork-toggle-panel/cork-toggle-panel"

import "./app-range-filter"
import render from "./app-filter-panel.tpl.js"
import "./app-facet-filter"

export class AppFilterPanel extends Mixin(LitElement)
    .with(LitCorkUtils) {

  static get properties() {
    return {
      filter : { type : Object },
      opened : { type : Boolean },
      selected : { type : Array }
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this._injectModel('AppStateModel');

    this.filter = {};
    this.opened = false;
    this.selected = []
  }

  // this used to be an observer to filter changing..
  //   willUpdate doesn't work and updated renders the filters twice, but one of them works
  firstUpdated() {
    if( !this.filter ) return;

    this.innerHTML = '';
    var ele = document.createElement('app-'+this.filter.type+'-filter');
    ele.label = this.filter.label;
    ele.filter = this.filter.filter;
    ele.ignore = this.filter.ignore;
    ele.valueMap = this.filter.valueMap || {};
    ele.isDollar = this.filter.isDollar;
    ele.includeTypeahead = this.filter.includeTypeahead || false;
    ele.typeaheadField = this.filter.typeaheadField;

    ele.addEventListener('update-visibility', (e) => {
      this.style.display = e.detail.show ? 'block' : 'none';
    });
    ele.addEventListener('add-selected', (e) => {
      let index = this.selected.findIndex(item => item.label === e.detail.label);
      if( index > -1 ) return;
      e.detail.niceLabel = this._getLabel(e.detail.label);
      this.selected.push(e.detail);
    });
    ele.addEventListener('remove-selected', (e) => {
      let index = this.selected.findIndex(item => item.label === e.detail.label);
      if( index === -1 ) return;
      this.selected.splice(index, 1);
    });
    ele.addEventListener('set-selected', (e) => {
      if( e.detail.selected ) {
        e.detail.niceLabel = this._getLabel(e.detail.label);
        this.selected = [e.detail];
      } else {
        this.selected = [];
      }
    });

    this.ele = ele;
    
    this.shadowRoot.querySelector('#filters').appendChild(ele);
  }

  _getLabel(label) {
    if( !this.filter.valueMap ) return label;
    if( typeof this.filter.valueMap === 'object' ) {
      return this.filter.valueMap[label] || label;
    }
    return this.filter.valueMap(label);
  }

  /**
   * @method toggle
   * @description toggle opened state
   */
  toggle() {
    this.opened = !this.opened;
    this._toggleOpened();
  }

  /**
   * @method _toggleOpened
   * @description if opened is true, tell the child to resize
   */
  _toggleOpened() {
    if( !this.opened ) return;
    if( this.ele && this.ele.resize ) {
      this.ele.resize();
    }
  }

  /**
   * @method _onToggleClicked
   * @description bound to main label click/keyboard events. Toggle
   * the panel.
   * 
   * @param {Object} e Click/Keyword event
   */
  _onToggleClicked(e) {
    if( e.type === 'keyup' ) { // from keyboard event
      if( e.which !== 13 && e.which !== 32 ) return;
    }

    this.toggle();
  }

  /**
   * @method _onFilterClicked
   * @description called when selected filter is clicked,
   * notify child of click
   */
  _onFilterClicked(e) {
    if( e.type === 'keyup' ) { // from keyboard event
      if( e.which !== 13 ) return;
    }

    this._notifyFilterClicked(e.currentTarget.getAttribute('label'));
    this.toggle();
  }

  /**
   * @method _onFilterClicked
   * @description notify child of filter click
   */
  _notifyFilterClicked(label) {
    if( !this.ele ) return;
    if( !this.ele.onParentFilterClicked ) return;
    this.ele.onParentFilterClicked(label);
  }

}

window.customElements.define('app-filter-panel', AppFilterPanel);