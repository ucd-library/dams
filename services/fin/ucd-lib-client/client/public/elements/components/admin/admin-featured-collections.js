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
      panels: {type : Array}
      /*
        // ie
        panels : [
          {
            position : 1,
            type : 'single',
            imagePlacement : 'left', // or 'right'
            collectionId : '/collection/sherry-lehmann',
            description : 'This is a description of the collection',
          },
          {
            position : 2,
            type : 'text',
            textPlacement : 'centered', // or 'left-aligned', 'split'
            heading : 'This is a heading',
            description : 'This is a description of the collection',
          },
          {
            position : 3,
            type : 'cards',
            collectionIds : [
              '/collection/sherry-lehmann',
              '/collection/uc-davis-archives',
            ],
            description : 'This is a description of the collection',
          }
        ]
      */
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.active = true;
    
    this.panels = [];
  }

  /**
   * @method firstUpdated
   * @description Lit lifecycle method
   */
  firstUpdated() {}

  
  /**
   * @method _newPanel
   * @description Add Content panel click handler, creates new panel and adds to panels array
   * @param {CustomEvent} e 
   */
  _newPanel(e) {
    let type = e.currentTarget.classList[0];
    this.panels.push({
      position : this.panels.length,
      type,
      placement : type === 'single' ? 'left' : 'centered',
      collectionId : '',
      heading : '',
      description : '',
      collectionIds : type === 'cards' ? [''] : null,
    });
    this.requestUpdate();
  }

  /**
   * @method _updateUiStyles
   * @description Listener attached to <admin-content-panel> updated events
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

  /**
   * @method _trashPanel
   * @description Listener attached to <admin-content-panel> trash events, remove panel
   * @param {CustomEvent} e 
   */
  _trashPanel(e) {
    let position = e.detail.position;
    this.panels.splice(position, 1);

    // update position of remaining panels
    this.panels.forEach((panel, i) => {
      panel.position = i;
    });
    this.requestUpdate();
  }

  /**
   * @method _movePanelUp
   * @description Listener attached to <admin-content-panel> arrow events, reposition panel
   * @param {CustomEvent} e 
   */
  _movePanelUp(e) {
    let position = e.detail.position;
    if( position === 0 ) return;

    this._updatePanelsData();

    let panel = this.panels.splice(position, 1)[0];
    // panel.placement = e.detail.placement;
    // panel.collectionId = e.detail.collectionId;
    // panel.heading = e.detail.heading;
    // panel.description = e.detail.description;
    // panel.collectionIds = e.detail.collectionIds;

    this.panels.splice(position-1, 0, panel);

    // update position of remaining panels
    this.panels.forEach((panel, i) => {
      panel.position = i;
    });
    this.requestUpdate();
  }

  /**
   * @method _movePanelUp
   * @description Listener attached to <admin-content-panel> arrow events, reposition panel
   * @param {CustomEvent} e 
   */
  _movePanelDown(e) {
    let position = e.detail.position;
    if( position === this.panels.length-1 ) return;

    this._updatePanelsData();

    let panel = this.panels.splice(position, 1)[0];
    // panel.placement = e.detail.placement;
    // panel.collectionId = e.detail.collectionId;
    // panel.heading = e.detail.heading;
    // panel.description = e.detail.description;
    // panel.collectionIds = e.detail.collectionIds;

    this.panels.splice(position+1, 0, panel);

    // update position of remaining panels
    this.panels.forEach((panel, i) => {
      panel.position = i;
    });
    this.requestUpdate();
  }

  /**
   * @method _updatePanelsData
   * @description loop through panel ui elements and set panels array with currently set data
   */
  _updatePanelsData() {
    let panels = this.shadowRoot.querySelectorAll('admin-content-panel');
    panels.forEach((panel, i) => {
      let collectionIds = [];
      panel.shadowRoot.querySelector('.collection-list > ucd-theme-slim-select').shadowRoot.querySelectorAll('select').forEach(select => {
        collectionIds.push(select.value.trim());
      });
      // this.panels[i].placement = panel.shadowRoot.querySelector('input[type="radio"]:checked').value.trim();
      this.panels[i].collectionId = panel.shadowRoot.querySelector('ucd-theme-slim-select.single-collection').shadowRoot.querySelector('select').value.trim();
      this.panels[i].heading = panel.shadowRoot.querySelector('input.heading-text').value.trim();
      this.panels[i].description = panel.shadowRoot.querySelector('textarea.description').value.trim();
      this.panels[i].collectionIds = collectionIds;
    });
  }

}

customElements.define('admin-featured-collections', AdminFeaturedCollections);
