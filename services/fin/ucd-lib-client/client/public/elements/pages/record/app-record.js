import { LitElement } from "lit";
import render from "./app-record.tpl.js";
import {Mixin, MainDomElement} from '@ucd-lib/theme-elements/utils/mixins';
import { LitCorkUtils } from '@ucd-lib/cork-app-utils';

import { markdown } from "markdown";
import rightsDefinitions from "../../../lib/rights.json";
import citations from "../../../lib/models/CitationsModel";
import utils from "../../../lib/utils/index.js";

import '@ucd-lib/theme-elements/ucdlib/ucdlib-md/ucdlib-md.js';
import "@ucd-lib/theme-elements/brand/ucd-theme-slim-select/ucd-theme-slim-select.js";

import "./app-media-download";
import "./app-fs-media-download";
import "./viewer/app-media-viewer";
import "../../components/citation";

import user from '../../../lib/utils/user.js';
class AppRecord extends Mixin(LitElement)
  .with(MainDomElement, LitCorkUtils) {
  
  static get properties() {
    return {
      record: { type: Object },
      currentRecordId: { type: String },
      name: { type: String },
      collectionName: { type: String },
      collectionImg: { type: String },
      collectionId: { type: String },
      collectionItemCount: { type: Number },
      description: { type: String },
      date: { type: String },
      publisher: { type: String },
      subjects: { type: Array },
      callNumber: { type: String },
      size: { type: String },
      rights: { type: Object },
      metadata: { type: Array },
      isBagOfFiles: { type: Boolean },
      arkDoi: { type: Array },
      fedoraLinks: { type: Array },
      isUiAdmin : { type : Boolean },
      editMode : { type : Boolean },
      // citations : {type: Array}
      citationRoot: { type: Object },
      itemDefaultDisplay: { type: String }, // collection default display
      itemDisplay: { type: String },
      displayData: { type: Object },
      savedCollectionData: { type: Object },
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.active = true;

    this.record = {};
    this.currentRecordId = "";
    this.name = "";
    this.collectionName = "";

    this.date = "";
    this.publisher = "";
    this.subjects = [];
    this.callNumber = "";
    this.collectionImg = "";
    this.collectionId = "";
    this.renderedCollectionId = "";
    this.description = "";

    this.size = "";
    this.rights = {};
    this.metadata = [];
    this.isBagOfFiles = false;
    this.arkDoi = [];
    this.fedoraLinks = [];
    // this.citations = [];
    this.citationRoot = {};
    this.collectionItemCount = 0;
    this.itemDefaultDisplay = utils.itemDisplayType.brTwoPage;
    this.itemDisplay = '';

    this.isUiAdmin = user.canEditUi();
    this.editMode = false;
    this.displayData = {};
    this.savedCollectionData = {};

    this._injectModel(
      "AppStateModel",
      "RecordModel",
      "CollectionModel",
      "SeoModel",
      "FcAppConfigModel"
    );

    window.addEventListener('click', () => this._onPageClick());
  }

  _onPageClick(e) {
    let appShareBtn = this.querySelector('app-media-viewer-nav')?.shadowRoot?.querySelector('app-share-btn');
    if( appShareBtn ) appShareBtn.visible = false;
  }

  async firstUpdated() {
    // this._onRecordUpdate(await this.RecordModel.get(this.AppStateModel.location.fullpath)); // this causes badness with ie /media/images:4 paths
    this._onAppStateUpdate(await this.AppStateModel.get());
    if( this.RecordModel.currentRecordId ) this._onRecordUpdate(await this.RecordModel.get(this.RecordModel.currentRecordId));
    if( this.collectionId ) this._onCollectionUpdate(await this.CollectionModel.get(this.collectionId));

    this._updateSlimStyles();
  }

  /**
   * @method _onRecordUpdate
   * @description from RecordModel, listen for loading events and reset UI.
   *
   * @param {Object} e state event
   */
  async _onRecordUpdate(e) {
    if (e.state !== "loaded") return;

    let record = e.vcData;
    if( !record || this.renderedRecordId === record['@id'] ) return;

    this.renderedRecordId = record["@id"];
    this.record = record;

    this.currentRecordId = this.record["@id"];
    this.name = this.record.name;
    this.collectionName = this.record.collectionName;
    this.description = this.record.description;
    this.date = this.record.date;
    this.publisher = this.record.publisher;
    this.subjects = this.record.subjects || [];
    this.callNumber = this.record.callNumber;

    this.citationRoot = this.record.root;
    this.collectionId = this.record.collectionId;

    this._updateLinks(this.AppStateModel.location, record);
  }

  async _onCollectionUpdate(e) {
    if( e.state !== "loaded" || e.id === this.renderedCollectionId ) return;

    this.collectionItemCount = e.vcData?.count || 0;
    this.renderedCollectionId = e.id;
    this.collectionId = e.id;

    let overriddenFeatureImage = await this.CollectionModel.getFeaturedImage(this.collectionId, this.FcAppConfigModel);
    if (overriddenFeatureImage) {
      this.collectionImg = overriddenFeatureImage;
    } else {
      this.collectionImg = e.vcData?.images?.small?.url                   
      || e.vcData?.images?.medium?.url 
      || e.vcData?.images?.large?.url
      || e.vcData?.images?.original?.url;
    }
  }

  /**
   * @method _onAppStateUpdate
   */
  async _onAppStateUpdate(e) {
    if( e.location.page !== 'item' ) return;

    let hasError = false;
    if( this.RecordModel.currentRecordId ) {
      try {
        let record = await this.RecordModel.get(this.RecordModel.currentRecordId);
        this._onRecordUpdate(record);
      } catch(e) {
        hasError = true;
      }
    }

    if( e.page === '404' || hasError ) {
      console.error('calling 404 from item page', { page : e.page, hasError });
      this.dispatchEvent(
        new CustomEvent("show-404", {})
      );
      return;
    }
    
    if( this.collectionId ) this._onCollectionUpdate(await this.CollectionModel.get(this.collectionId));

    this._updateLinks(e.location);
    
    await this._parseDisplayData();
  }

  _updateSlimStyles() {
    let select = this.querySelector('ucd-theme-slim-select');
    if( !select ) return;

    let ssMain = select.shadowRoot.querySelector(".ss-main");
    if (ssMain) {
      ssMain.style.border = 'none';
      ssMain.style.backgroundColor = 'transparent';
    }

    let ssSingle = select.shadowRoot.querySelector(".ss-single-selected");
    if (ssSingle) {
      ssSingle.style.border = "none";
      ssSingle.style.height = "49px";
      ssSingle.style.paddingLeft = "1rem";
      ssSingle.style.backgroundColor = "var(--color-aggie-blue-50)";
      ssSingle.style.borderRadius = '0';
      ssSingle.style.fontWeight = "bold";
      ssSingle.style.color = "var(--color-aggie-blue)";
    }

    let search = select.shadowRoot.querySelector('.ss-search');
    if( search ) {
      search.style.display = "none";
    }
  }
  
  /**
   * @method _ssSelectFocus
   * @description slim select focus change, color should be gold if active, blue if not
   * @param {Object} e
   */
  _ssSelectFocus(e) {
    console.log('focus')
    let ssMain = e.currentTarget.shadowRoot.querySelector('.ss-main');
    let ssSingleSelected = e.currentTarget.shadowRoot.querySelector('.ss-single-selected');

    if( ssSingleSelected?.classList.value === 'ss-single-selected ss-open-below' ) {
      ssSingleSelected.style.backgroundColor = '#FFF4D2'; // gold-30
      ssMain.style.borderColor = '#FFBF00'; // gold
    } else {
      ssSingleSelected.style.backgroundColor = '#B0D0ED'; // blue-50
      ssMain.style.borderColor = '#B0D0ED'; // blue-50
    }
  }

  /**
   * @method _ssSelectBlur
   * @description slim select focus change, color should be gold if active, blue if not
   * @param {Object} e
   */
  _ssSelectBlur(e) {
    console.log('blur')
    let ssMain = e.currentTarget.shadowRoot.querySelector('.ss-main');
    let ssSingleSelected = e.currentTarget.shadowRoot.querySelector('.ss-single-selected');

    ssSingleSelected.style.backgroundColor = '#B0D0ED'; // blue-50
    ssMain.style.borderColor = '#B0D0ED'; // blue-50
  }

  /**
   * @method _updateLinks
   * @description update ark/fedora links
   *
   * @param {Object} location location element
   */
  _updateLinks(location) {
    if( location.page !== 'item' ) return;

    let selectedRecord = this.AppStateModel.getSelectedRecord();
    if( !selectedRecord ) return;

    let mediaGroup = selectedRecord.clientMedia.mediaGroups[0];
    let path = selectedRecord.clientMedia?.root?.['@id'] || location.pathname;
    let imagePath = '';

    // check if we are on a specific /media path
    let isMediaUrl = path.indexOf('/media') > -1;
    if( isMediaUrl ) {
      // find media in graph
      let media = selectedRecord.clientMedia.graph
        .filter(
          m => m['@shortType'].includes('ImageObject') && 
          parseInt(m.position) === selectedRecord.selectedMediaPage
        )[0];
      if( media?.['@id'] ) {
        // path = media['@id'].split('/media')[0];
        imagePath = media['@id'];
      }
    } 

    if (!imagePath && mediaGroup?.['@shortType']?.includes('ImageList')) {
      imagePath = mediaGroup.encodesCreativeWork?.['@id'] || mediaGroup.clientMedia?.images?.original?.url || path;
    } else {
      imagePath = selectedRecord.selectedMedia?.['@id'];
    }

    this.arkDoi = [
      path,
      imagePath.replace('/fcrepo/rest', '')
    ];

    this.fedoraLinks = [
      '/fcrepo/rest'+ path.replace('/fcrepo/rest', ''),
      '/fcrepo/rest'+ imagePath.replace('/fcrepo/rest', '') +'/fcr:metadata'
    ];

  }

  /**
   * @method _onEditClicked
   * @description admin ui, edit button click event
   * 
   * @param {Object} e 
   */
  _onEditClicked(e) {
    if( !this.isUiAdmin ) return;
    this._updateSlimStyles();
    this.editMode = true;
    
    this._changeMediaViewerDisplay('none');
  }

  /**
   * @method _onSaveClicked
   * @description admin ui, save button click event
   * 
   * @param {Object} e 
   */
  async _onSaveClicked(e) {
    if( !this.isUiAdmin ) return;
    
    this.itemDisplay = document.querySelector('ucd-theme-slim-select')?.slimSelect?.selected();
    this._updateDisplayData();
    await this.FcAppConfigModel.saveItemDisplayData(this.renderedRecordId, this.displayData);

    this.editMode = false;

    this._changeMediaViewerDisplay('', true);
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

    this._changeMediaViewerDisplay('');
  }

  /**
   * @description _parseDisplayData, get application container data to set collection specific display data (watercolors, highlighted items, featured image)
   */
  async _parseDisplayData() {
    if( !this.collectionId ) return;

    let edits = await this.CollectionModel.getCollectionEdits(this.collectionId);
    if( !Object.keys(edits.payload).length ) {
      this.appDataLoaded = true;
      return;
    }

    edits = edits.payload;
    this.itemDefaultDisplay = edits?.collection?.itemDefaultDisplay || utils.itemDisplayType.brTwoPage;
    this.itemDisplay = edits?.items?.[this.currentRecordId]?.itemDefaultDisplay || this.itemDefaultDisplay;

    this.appDataLoaded = true;
    this._updateDisplayData();
  }

  _updateDisplayData() {
    this.displayData = this.FcAppConfigModel.getItemDisplayData(this.renderedRecordId, this.itemDisplay);
  }

  async _changeMediaViewerDisplay(display, prefChange=false) {
    let mediaViewer = this.querySelector('app-media-viewer');
    if( !mediaViewer ) return;
    let pages = mediaViewer.querySelector('ucdlib-pages');
    let nav = mediaViewer.querySelector('app-media-viewer-nav');

    if( nav ) nav.style.display = display;

    if( !pages ) return;
    if( display ) {
      pages.style.opacity = 0;
      pages.style.height = '150px';
      pages.style.display = 'block';
    } else {
      pages.style.opacity = 100;
      pages.style.height = '';
      pages.style.display = 'block';
    }

    if( mediaViewer.mediaType === 'video' ) return;

    // on save display pref, reload media viewer with new image display type
    if( prefChange ) {
      // reload media viewer with new image display type
      let newDisplayType = '';
      let singlePage = false;

      if( this.itemDisplay.includes('Image List') ) {
        newDisplayType = 'image';
      } else if ( this.itemDisplay.includes('1 Page') ) {
        newDisplayType = 'bookreader';
        singlePage = true;
      } else if ( this.itemDisplay.includes('2 Page') ) {
        newDisplayType = 'bookreader';
      }

      if( pages && nav && newDisplayType ) {
        pages.selected = newDisplayType;

        if( mediaViewer.singlePage !== singlePage ) {
          mediaViewer.singlePage = singlePage;
          if( mediaViewer.querySelector('app-bookreader-viewer').br ) {
            requestAnimationFrame(() => {
              mediaViewer._onToggleBookView();
            });
          } else {
            // to reload br if not initiated
            mediaViewer._onAppStateUpdate(await this.AppStateModel.get());
          }         
        }
        mediaViewer.isBookReader = newDisplayType === 'bookreader';
        mediaViewer.mediaType = newDisplayType;
      }
    }    
  }

  /**
   * @method _getHost
   * @description helper for getting protocol/host of window
   *
   * @returns {String}
   */
  _getHost() {
    return window.location.protocol + "//" + window.location.host + "/";
  }

  /**
   * @method _onSelectedRecordMediaUpdate
   * @description from AppStateModel, called when a records media is selected
   *
   * @param {Object} record
   */
  _onSelectedRecordMediaUpdate(record) {
    // if( record._has360ImageList ) {
    //   this.$.download.style.display = 'none';
    //   return;
    // }

    this.name = this.record.name || "";

    // if (!record.image) return;

    // this.$.download.render({
    //   resolution : [record.image.width, record.image.height],
    //   fileFormat : record.image.encodingFormat,
    //   size : record.image.contentSize ? parseInt(record.image.contentSize) : 0,
    //   url : record.image.url
    // });

    // this._renderIdentifier(this.record, record);
    // this._renderFcLink(this.record, record);
  }

  /**
   * @method _addMetadataRow
   * @description update metadata table row
   *
   * @param {Array} metadata
   * @param {String} attr
   * @param {String} label
   */
  _addMetadataRow(metadata, attr, label) {
    if (!this[attr]) return;
    metadata.push({
      attr: label || attr,
      value: this[attr],
    });
  }

  /**
   * @method _copyLink
   * @description bound to click event on button.  Copy text to clipboard
   * show UI interaction.
   */
  _copyLink() {
    this.$.link.focus();
    this.$.link.setSelectionRange(0, 9999);
    document.execCommand("Copy");

    this.$.copyIcon.icon = "check";
    this.$.copyButton.setAttribute("active", "active");

    setTimeout(() => {
      this.$.copyIcon.icon = "content-copy";
      this.$.copyButton.removeAttribute("active", "active");
    }, 3000);
  }

  _onBookViewPageChange(e) {
    let appMediaDownload = document.querySelector('app-media-download');
    if( appMediaDownload ) {
      appMediaDownload.brPageChange(e.detail);
    }
  }
}

customElements.define("app-record", AppRecord);
