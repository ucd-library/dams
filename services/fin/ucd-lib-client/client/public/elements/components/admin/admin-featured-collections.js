import { LitElement} from 'lit';
import render from './admin-featured-collections.tpl.js';
import "./admin-content-panel";

import "@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon";

/**
 * @class AdminFeaturedCollections
 * @description admin UI for customizing featured collections on the homepage
 */
export class AdminFeaturedCollections extends LitElement {
  static get properties() {
    return {
    //   record: {type : Object},
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.active = true;
    
    // this.record = {};
  }

  /**
   * @method firstUpdated
   * @description Lit lifecycle method
   */
  firstUpdated() {}

  /**
   * @method _updateUiStyles
   * @description Listener attached to <admin-content-panel> firstUpdated events
   * @param {CustomEvent} e 
   */
  _updateUiStyles(e) {
    let panel = e.currentTarget;
    if( !panel ) return;

    // TODO hack overriding styles of slim select, should we update the brand component to allow custom styles instead?
    let selects = [];
    selects.push(...panel.shadowRoot.querySelectorAll('ucd-theme-slim-select'));
    if( !selects ) return;

    selects.forEach(select => {
        let ssMain = select.shadowRoot.querySelector('.ss-main');
        if( ssMain ) {
            ssMain.style.borderColor = 'var(--color-aggie-gold)';
        }
    
        let ssSingle = select.shadowRoot.querySelector('.ss-single-selected');
        if( ssSingle ) {
            ssSingle.style.border = 'none';
            ssSingle.style.height = '49px';
            ssSingle.style.paddingLeft = '1rem';
            ssSingle.style.backgroundColor = 'var(--color-aggie-gold-20)';
            ssSingle.style.fontWeight = 'bold';
            ssSingle.style.color = 'var(--color-aggie-blue)';
        }
    
        // make description text area same width (-padding etc) as select input
        let selectWidth = select.offsetWidth - 30;
        let description = panel.shadowRoot.querySelector('.description');
        description.style.width = selectWidth+'px';   
    });
  }

}

customElements.define('admin-featured-collections', AdminFeaturedCollections);
