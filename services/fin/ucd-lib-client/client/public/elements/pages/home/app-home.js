import { LitElement} from 'lit';
import { MainDomElement} from '@ucd-lib/theme-elements/utils/mixins';
import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';

import "../../utils/app-collection-card";

import '@ucd-lib/theme-elements/ucdlib/ucdlib-md/ucdlib-md';
import "@ucd-lib/theme-elements/ucdlib/ucdlib-iconset/ucdlib-iconset";
import "@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon";
import '@ucd-lib/theme-elements/ucdlib/ucdlib-icons/ucdlib-icons';
import '../../utils/app-icons';

import "../../components/search-box";
import "../../components/nav-bar";
import "../../components/filterButton";
import "../../components/graphics/dams-watercolor";
import "../../components/graphics/dams-watercolor-overlay";

import "../../components/cards/dams-collection-card";
import "../../components/cards/dams-item-card";
import "../../components/graphics/dams-hero";
import "../../components/sections/dams-highlighted-collection";
import "../../components/admin/admin-featured-collections";

import user from "../../../lib/utils/user";

import render from './app-home.tpl.js';

/**
 * @class AppHome
 * @description home page is rendered to the DAMS v2
 * 
 * @prop {Object[]} featuredCollections - Collections to  be displayed on homepage. Retrieved by model.
 * @prop {Number} featuredCollectionsCt - Total number of featured collections.
 * @prop {Object[]} recentCollections - Array of recently uploaded collections.
 * @prop {Boolean} showCollectionGroup - Displays the featured multi-collection section.
 * @prop {Object} textTrio - ApplicationTextContainer for the collection group.
 * @prop {Array} heroImgOptions - Data options for the hero image (src, collection name, etc)
 * @prop {Object} heroImgCurrent - The currently displayed hero image.
 */
class AppHome extends Mixin(LitElement)
  .with(MainDomElement, LitCorkUtils) {
  
  static get properties() {
    return {
      featuredCollections: {type : Array},
      featuredCollectionsCt: {type: Number},
      recentCollections: {type: Array},
      showCollectionGroup: {type: Boolean},
      textTrio: {type: Object},
      heroImgOptions: {type: Array},
      heroImgCurrent: {type: Object},
      heroUrl: {type: String},
      heroItemLabel: {type: String},
      heroItemUrl: {type: String},
      heroCollectionLabel: {type: String},
      heroCollectionUrl: {type: String},
      editMode: {type: Boolean},
      displayData: {type: Array},
      isUiAdmin: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.active = true;
    this.featuredCollections = [];
    this.featuredCollectionsCt = 0;
    this.showCollectionGroup = false;
    this.recentCollections = [];
    this.textTrio = {};
    this.heroImgOptions = [];
    this.heroImgCurrent = {};
    this.heroUrl = '';
    this.heroItemLabel = '';
    this.heroItemUrl = '';
    this.heroCollectionLabel = '...';
    this.heroCollectionUrl = '...';
    this.displayData = [];
    this.editMode = false;
    this.isUiAdmin = false;
    this._injectModel('FcAppConfigModel', 'CollectionModel', 'RecordModel');
  }

  /**
   * @method firstUpdated
   * @description Lit lifecycle method called when element is first updated
   */
  async firstUpdated() {
    this.isUiAdmin = user.canEditUi();

    this._setFeaturedImage();

    try {
      let displayData = await this.FcAppConfigModel.getFeaturedCollectionAppData();
      if( displayData && displayData.body ) {
        if( typeof displayData.body === 'string' ) displayData.body = JSON.parse(displayData.body);
        this.displayData = displayData.body;

        let adminPanel = document.querySelector('admin-featured-collections');
        if( adminPanel ) {
          adminPanel.loadAdminData(this.displayData);
        }
      }
  
      // filter out collections that don't exist in fcrepo
      let cardsPanels = this.displayData.filter(d => d.type === 'cards');
      cardsPanels.forEach(async panel => {
        let collectionIds = [];
  
        panel.collectionIds.forEach(collectionId => {
          if( APP_CONFIG.collectionLabels[collectionId.selected] ) collectionIds.push(collectionId);
        });
        panel.collectionIds = collectionIds;
      });
    } catch(e) {
      this.logger.warn('No featured collections admin data found', e);
    }

    // get recent collections
    let data = await this.CollectionModel.getRecentCollections();
    
    if( data.response?.ok && data.body?.results?.length ) {
      this.recentCollections = data.body.results?.slice(0, 3);
    }

    this.requestUpdate();
  }

  _setFeaturedImage() {
    this.heroImgOptions = (APP_CONFIG.featuredImages || []);

    let i = Math.floor(Math.random() *  this.heroImgOptions.length);
    let src = this.heroImgOptions[i];

    this.heroUrl = src.imageUrl;
    this.heroItemLabel = src.itemName;
    this.heroItemUrl = src.itemLink;
    this.heroCollectionLabel = src.collectionName;
    this.heroCollectionUrl = src.collectionLink;

    if( this.heroItemLabel.length > 75 ) this.heroItemLabel = this.heroItemLabel.substring(0, 75) + '...';
    if( this.heroCollectionLabel.length > 75 ) this.heroCollectionLabel = this.heroCollectionLabel.substring(0, 75) + '...';
  }

  /**
   * @method _onHeroChange
   * @description Listener attached to <dams-hero> image change
   * @param {CustomEvent} e 
   */
  _onHeroChange(e) {
    let imageUrl = e.target._selectedSrc;
    if ( !imageUrl ) return;
    this.heroImgCurrent = this.heroImgOptions.filter(i => i.imageUrl === imageUrl)[0];
  }

  /**
   * @method _onEditClicked
   * @description admin ui, edit button click event
   * 
   * @param {Object} e 
   */
  _onEditClicked(e) {
    if( !this.isUiAdmin ) return;
    this.editMode = true;
  }

  /**
   * @method _onSaveClicked
   * @description admin ui, save button click event
   * 
   * @param {Object} e 
   */
  async _onSaveClicked(e) {
    if( !this.isUiAdmin ) return;
    this.editMode = false;
    // save to fcrepo container
    //   also how to handle validation that all 6 featured items are populated? or more like how to alert user
    let adminPanel = document.querySelector('admin-featured-collections');
    if( adminPanel ) {
      adminPanel._updatePanelsData();
      this.displayData = adminPanel.panels;
    }
    await this.FcAppConfigModel.saveFeaturedCollectionAppData(this.displayData);
  }

  /**
   * @method _onCancelEditClicked
   * @description admin ui, cancel editing button click event
   * 
   * @param {Object} e 
   */
  _onCancelEditClicked(e) {
    if( !this.isUiAdmin ) return;
    this.editMode = false;
  }

  /**
   * @method _onSearch
   * @description called from the search box button is clicked or
   * the enter key is hit.  set the text filter
   * @param {Object} e
   */
  _onSearch(e) {
    // let searchDoc = this._getEmptySearchDocument();
    let searchDoc = this.RecordModel.emptySearchDocument();
    // this._setTextFilter(searchDoc, e.detail);
    this.RecordModel.setTextFilter(searchDoc, e.detail);
    this.RecordModel.setSearchLocation(searchDoc);
  }

  /**
   * @method _onCollectionClicked
   * @description called when collection img on home page is clicked 
   * @param {Object} e
   */
  _onCollectionClicked(e) {
    if( e.type === 'keyup' && e.which !== 13 ) return;
    let id = e.currentTarget.getAttribute('data-id');
    this._onCollectionSelected(id);
  }

  /**
   * @method _onCollectionSelected
   * @description filter based on a collection using short ids.
   * @param {String} id
   * 
   */
  _onCollectionSelected(id) {
    this._setWindowLocation(id);
  }
  
}

customElements.define('app-home', AppHome);