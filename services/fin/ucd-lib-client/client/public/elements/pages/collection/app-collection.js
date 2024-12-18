import { LitElement} from 'lit';
import render from "./app-collection.tpl.js";
import {MainDomElement} from '@ucd-lib/theme-elements/utils/mixins';

import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';

import "@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon";

import "../../components/cards/dams-item-card";
import '../../components/citation';

import user from '../../../lib/utils/user.js';
import utils from '../../../lib/utils/index.js';

class AppCollection extends Mixin(LitElement)
  .with(MainDomElement, LitCorkUtils) {

  static get properties() {
    return {
      collectionId : { type : String },
      // adminRendered : { type : Boolean },
      description : { type : String },
      title : { type : String },
      thumbnailUrl : { type : String },
      thumbnailUrlOverride : { type : String },
      callNumber : { type : String },
      subjects : { type : Array },
      material : { type : String },
      languages : { type : Array },
      location : { type : String },
      items : { type : Number },
      publishedDateRange : { type : String },
      highlightedItems : { type : Array },
      savedItems : { type : Array },
      dbsync : { type : Object },
      watercolor : { type : String },
      watercolorBgUrl : { type : String },
      watercolorFgUrl : { type : String },
      displayData : { type : Array },
      // isAdmin : { type : Boolean },
      isUiAdmin : { type : Boolean },
      editMode : { type : Boolean },
      itemCount : { type : Number },
      collectionSearchHref : {type: String},
      citationRoot : { type: Object },
      itemDefaultDisplay : { type: String },
      itemEdits : { type: Array },
      showDisclaimer : { type: Boolean }
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.active = true;

    this.appDataLoaded = false;
    this.reset();

    this._injectModel('AppStateModel', 'CollectionModel', 'RecordModel', 'FcAppConfigModel', 'SeoModel');
  }

  async firstUpdated() {
    this._onAppStateUpdate(await this.AppStateModel.get());
    // this._onCollectionUpdate(await this.CollectionModel.get(this.AppStateModel.location.pathname));
  }

  /**
   * @method _onAppStateUpdate
   * @description on the App update, the state is determined and by checking
   * the location
   *
   * @param {Object} e
   */
   async _onAppStateUpdate(e) {
    if( this.AppStateModel.location.page !== 'collection' ) {
      this.reset();
      return;
    }
    if( this.collectionId === e.location.fullpath ) return;
    this.reset();

    this.collectionId = e.location.fullpath;

    try {
      let recordData = await this.CollectionModel.get(this.collectionId);
      this.onCollectionUpdate(recordData);
    } catch(e) {
      this.dispatchEvent(
        new CustomEvent("show-404", {})
      );
    }
  }

  /**
   * @method onCollectionUpdate
   * @description fired when collection updates
   *
   * @param {Object} e
   */
   async onCollectionUpdate(e) {
    if( e.state !== 'loaded' ) return;
    if( this.AppStateModel.location.page !== 'collection' ) return;

    await this._parseDisplayData();
    let searchObj = this.RecordModel.emptySearchDocument();
    this.RecordModel.appendKeywordFilter(searchObj, '@graph.isPartOf.@id', e.vcData.id);
    this.collectionSearchHref = '/search/'+this.RecordModel.searchDocumentToUrl(searchObj);

    this.collectionId = e.vcData.id;

    this.description = e.vcData.description
    this.title = e.vcData.title;

    if( !this.thumbnailUrlOverride ) {
      this.thumbnailUrl = e.vcData.images?.medium?.url || e.vcData.images?.original?.url || '';
    }
    if( !this.thumbnailUrl ) {
      this.thumbnailUrl = '/images/tree-bike-illustration.png';
    }

    if( !this.watercolor ) {
      this.watercolor = 'rose';
      this.watercolorBgUrl = '/images/watercolors/collection-watercolor-' + this.watercolor + '-back-white.jpg';
      this.watercolorFgUrl = '/images/watercolors/collection-watercolor-' + this.watercolor + '-front.png';  
    }

    // set background image
    let featuredImageElement = document.querySelector('.featured-image');
    if( featuredImageElement && this.thumbnailUrlOverride ) {
      let img = new Image();
      img.src = this.thumbnailUrlOverride;
      img.onload = function() {
        featuredImageElement.style.backgroundImage = `url(${this.src})`;
      };
    } else if ( featuredImageElement ) {
      featuredImageElement.style.backgroundImage = `url(${this.thumbnailUrl})`;
    }

    let root = e.payload.root || {};
    this.callNumber = e.vcData.callNumber;
    this.subjects = (e.vcData.subjects || []);
    this.material = root.material || '';
    this.languages = !Array.isArray(root.language || []) ? [root.language] : root.language;
    this.location = root.location || '';
    this.items = utils.formatNumberWithCommas(e.vcData.count);
    this.publishedDateRange = e.vcData.publishedDateRange;

    this.citationRoot = root;

    if( this.appDataLoaded && !this.savedItems.length ) {
      this.getLatestItems();
    } else if( this.savedItems.length ) {
      this.highlightedItems = this.savedItems;
    }

    this._updateDisplayData();
  }

  async getLatestItems() {
    if( this.loadingLatestItems || this.highlightedItems.length ) return;

    this.loadingLatestItems = true;
    // default to most recent items by year published descending
    let highlightedItems = await this.RecordModel.getRecentItems(this.collectionId, this.itemCount);
    if( highlightedItems.response.ok && highlightedItems.body.results.length ) {
      this.highlightedItems = highlightedItems.body.results.map((item, index) => {
        return {
          '@id' : item['@graph'][0]['@id'],
          description : item['@graph'][0].name,
          position : index+1,
          image : item['@graph'][0].thumbnailUrl
        };
      });
    }
    this.loadingLatestItems = false;
  }

  reset() {
    this.collectionId = '';
    // this.adminRendered = false;
    this.description = '';
    this.title = '';
    this.thumbnailUrl = '';
    this.thumbnailUrlOverride = '';
    this.callNumber = '';
    this.subjects = [];
    this.material = '';
    this.languages = [];
    this.location = '';
    this.items = 0;
    this.publishedDateRange = '';
    this.highlightedItems = [];
    this.savedItems = [];
    this.dbsync = {};
    this.watercolor = '';
    this.watercolorBgUrl = '';
    this.watercolorFgUrl = '';
    this.displayData = [];
    // this.isAdmin = user.hasRole('admin');
    this.isUiAdmin = user.canEditUi();
    this.editMode = false;
    this.itemCount = 6;
    this.citationRoot = {};
    this.itemDefaultDisplay = utils.itemDisplayType.brTwoPage; // one, list.. for admin pref on BR display type for items in this collection
    this.itemEdits = [];
    this.showDisclaimer = false;

    let featuredImageElement = document.querySelector('.featured-image');
    if( featuredImageElement ) featuredImageElement.style.backgroundImage = '';
    if( document.querySelector('#file-upload')?.value ) document.querySelector('#file-upload').value = '';
  }

  _onItemDisplayChange(e) {
    this.itemCount = parseInt(e.target.value);

    let itemInputs = document.querySelectorAll('.item-ark-input');
    itemInputs.forEach((input, index) => {
      if( index+1 > this.itemCount ) {
        input.value = '';
      }
    });

    this._updateDisplayData();
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

    // parse highlighted items
    this.savedItems = [];
    let newSavedItems = [];
    let itemArkRegex = /^\/?(item\/)?(ark:\/)?/;

    let itemInputs = document.querySelectorAll('.item-ark-input');
    itemInputs.forEach((input, index) => {
      if( input.value ) {
        let val = input.value.trim();
        newSavedItems.push({
          '@id' : `/item/ark:/${val.replace(itemArkRegex, '')}`,
          position : index+1
        });
      }
    });
    this.savedItems = [...newSavedItems];

    let featuredImage = '';
    let fileElement = document.querySelector('#file-upload');
    if( fileElement?.files?.length ) {
      featuredImage = fileElement.files[0];
    }
    this._updateDisplayData(featuredImage);


    await this.FcAppConfigModel.saveCollectionDisplayData(this.collectionId, this.displayData);
    if( fileElement && featuredImage ) {
      await this.FcAppConfigModel.saveCollectionFeaturedImage(this.collectionId, featuredImage);
      fileElement.value = '';
    }

    // parse checked item exceptions to reset them to collection default display type
    let itemExceptions = [];
    let checkboxes = this.querySelectorAll('.exceptions input[name="checkbox"]');
    checkboxes.forEach(checkbox => {
      if( !checkbox.checked ) return;

      let itemId = checkbox.dataset.itemId;
      if( itemId ) itemExceptions.push(itemId);
    });

    if( itemExceptions.length ) {
      await this.FcAppConfigModel.updateItemDisplayExceptions(itemExceptions, this.itemDefaultDisplay);
    }

    this.requestUpdate();
    this.AppStateModel.setLocation(this.collectionId);
    // this._parseDisplayData();
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
    document.querySelector('#file-upload').value = '';
  }

  /**
   * @method _onWatercolorChanged
   * @description admin ui, change to featured image watercolor
   *
   * @param {Object} e
   */
  _onWatercolorChanged(e) {
    if( !this.isUiAdmin ) return;
    this.watercolor = e.target.classList[0];
    this.watercolorBgUrl = '/images/watercolors/collection-watercolor-' + this.watercolor + '-back-white.jpg';
    this.watercolorFgUrl = '/images/watercolors/collection-watercolor-' + this.watercolor + '-front.png';

    this._updateDisplayData();
  }

  /**
   * @method _onDisclaimerToggle
   * @description admin ui, change to show/hide disclaimer for this collection
   */
  _onDisclaimerToggle(e) {
    if( !this.isUiAdmin ) return;
    
    this.showDisclaimer = e.currentTarget.checked;
    // this.displayData.showDisclaimer = e.currentTarget.checked;
    this._updateDisplayData();
  }

  /**
   * @method _onSelectAllExceptionsChange
   * @description admin ui, change to 'select all exceptions' checkbox
   *
   * @param {Object} e
   */
  _onSelectAllExceptionsChange(e) {
    let checked = e.currentTarget.checked;
    if( !checked ) return;

    let checkboxes = this.querySelectorAll('.exceptions input[name="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = true;
    });
  }

  /**
   * @description _parseDisplayData, get application container data to set collection specific display data (watercolors, highlighted items, featured image)
   */
  async _parseDisplayData() {
    if( !this.collectionId ) return;

    let edits;
    try {
      edits = await this.CollectionModel.getCollectionEdits(this.collectionId);
    } catch (error) {
      this.logger.warn('Error retrieving collection edits', error);
    }

    if( edits.state !== 'loaded' ) return;
    if( !Object.keys(edits.payload).length ) return;

    let collectionEdits = edits.payload?.collection || {};
    let itemEdits = edits.payload?.items || {};

    // set collection prefs
    this.watercolor = collectionEdits.watercolors?.css || 'rose';
    this.watercolorBgUrl = '/images/watercolors/collection-watercolor-' + this.watercolor + '-back-white.jpg';
    this.watercolorFgUrl = '/images/watercolors/collection-watercolor-' + this.watercolor + '-front.png';

    this.thumbnailUrlOverride = collectionEdits.thumbnailUrl?.['@id'] || '';
    if( this.thumbnailUrlOverride ) {
      // remove domain
      let url = new URL(this.thumbnailUrlOverride);
      this.thumbnailUrlOverride = url?.pathname;
    }

    this.itemCount = typeof collectionEdits.itemCount === 'number' ? collectionEdits.itemCount : 6;

    this.itemDefaultDisplay = collectionEdits.itemDefaultDisplay || utils.itemDisplayType.brTwoPage;

    this.showDisclaimer = collectionEdits.showDisclaimer || false;

    this.savedItems = collectionEdits.exampleOfWork || [];
    if( !Array.isArray(this.savedItems) ) this.savedItems = [this.savedItems];
    this.savedItems.sort((a,b) => a.position - b.position);

    // set item prefs
    this.itemEdits = Object.entries(itemEdits).map(
      ([key, value]) => ({ id: key, linkLabel: key.split('/').pop(), defaultDisplay: value.itemDefaultDisplay })
    ).filter(item => item.defaultDisplay && item.defaultDisplay !== this.itemDefaultDisplay);

    // hack for radios occasionally not being selected, styles coming from brand css
    if( this.itemCount === 0 ) this.querySelector('#zero').checked = true;
    if( this.itemCount === 3 ) this.querySelector('#three').checked = true;
    if( this.itemCount === 6 ) this.querySelector('#six').checked = true;
    if( this.itemDefaultDisplay === utils.itemDisplayType.brTwoPage ) this.querySelector('#two').checked = true;
    if( this.itemDefaultDisplay === utils.itemDisplayType.brOnePage ) this.querySelector('#one').checked = true;
    if( this.itemDefaultDisplay === utils.itemDisplayType.imageList ) this.querySelector('#list').checked = true;

    this.appDataLoaded = true;
    this._updateDisplayData();
    this.requestUpdate();
  }

  _updateDisplayData(newFileUploadName='') {
    let opts = {
      title : this.title,
      watercolor : this.watercolor,
      itemCount : this.itemCount,
      itemDefaultDisplay : this.itemDefaultDisplay,
      savedItems : this.savedItems,
      newFileUploadName,
      thumbnailUrlOverride : this.thumbnailUrlOverride,
      showDisclaimer : this.showDisclaimer
    };
    this.displayData = this.FcAppConfigModel.getCollectionDisplayData(this.collectionId, opts);
  }

  async _onFileChange(e) {
    let selectedFilename = e.target.value.split('\\').pop();
    if( !selectedFilename.length ) return;


    // replace current thumbnail with new image
    let file = e.target.files[0];
    document.querySelector('.featured-image').style.backgroundImage = 'url('+window.URL.createObjectURL(file)+')';
  }

}

customElements.define('app-collection', AppCollection);
