import { LitElement } from "lit";
import render from "./app-record.tpl.js";
import {Mixin, MainDomElement} from '@ucd-lib/theme-elements/utils/mixins';
import { LitCorkUtils } from '@ucd-lib/cork-app-utils';

import { markdown } from "markdown";
import rightsDefinitions from "../../../lib/rights.json";
import citations from "../../../lib/models/CitationsModel";
import utils from "../../../lib/utils";

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

    this.size = "";
    this.rights = {};
    this.metadata = [];
    this.isBagOfFiles = false;
    this.arkDoi = [];
    this.fedoraLinks = [];
    // this.citations = [];
    this.citationRoot = {};
    this.collectionItemCount = 0;

    this.isUiAdmin = user.canEditUi();
    this.editMode = false;

    this._injectModel(
      "AppStateModel",
      "RecordModel",
      "CollectionModel",
      "SeoModel"
    );
  }

  async firstUpdated() {
    // this._onRecordUpdate(await this.RecordModel.get(this.AppStateModel.location.fullpath)); // this causes badness with ie /media/images:4 paths
    this._onRecordUpdate(await this.RecordModel.get(this.RecordModel.currentRecordId));
    this._onCollectionUpdate(await this.CollectionModel.get(this.collectionId));
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
    if( !record ) return;

    this.renderedRecordId = record["@id"];
    this.record = record;

    this.currentRecordId = this.record["@id"];
    this.name = this.record.name;
    this.collectionName = this.record.collectionName;
    this.date = this.record.date;
    this.publisher = this.record.publisher;
    this.subjects = this.record.subjects || [];
    this.callNumber = this.record.callNumber;

    this.citationRoot = this.record.root;
    this.collectionId = this.record.collectionId;

    this._updateLinks(this.AppStateModel.location, record);
  }

  _onCollectionUpdate(e) {
    if (e.state !== "loaded") return;
    this.collectionItemCount = e.vcData?.count || 0;
    this.collectionImg = e.vcData?.images?.small?.url                   
                      || e.vcData?.images?.medium?.url 
                      || e.vcData?.images?.large?.url
                      || e.vcData?.images?.original?.url;
  }

  /**
   * @method _onAppStateUpdate
   */
  async _onAppStateUpdate(e) {
    // if (e.state !== "loaded") return;
    this._updateLinks(e.location);
    if( this.RecordModel.currentRecordId ) this._onRecordUpdate(await this.RecordModel.get(this.RecordModel.currentRecordId));
    if( this.collectionId ) this._onCollectionUpdate(await this.CollectionModel.get(this.collectionId));
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
    let isMediaUrl = location.pathname; // path.indexOf('/media') > -1;
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

    } else if (mediaGroup?.['@shortType']?.includes('ImageList')) {
      imagePath = mediaGroup.clientMedia?.images?.original?.url || path;

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

    // TODO things

    
    // parse highlighted items
    // this.savedItems = [];
    // let newSavedItems = [];
    // let itemInputs = document.querySelectorAll('.item-ark-input');
    // itemInputs.forEach((input, index) => {
    //   if( input.value ) {
    //     newSavedItems.push({
    //       '@id' : input.value,
    //       position : index+1
    //     });
    //   }
    // });
    // this.savedItems = [...newSavedItems];
    
    // this._updateDisplayData();
    // let featuredImage = document.querySelector('#file-upload').files[0];
    // await this.FcAppConfigModel.saveCollectionDisplayData(this.collectionId, this.displayData, featuredImage);
    
    // this.editMode = false;

    // this.requestUpdate(); 
    // // TODO for some reason this.savedItems isn't updating the view, even with requestUpdate()
    // //  so the ordering doesn't update until page load
    // // this._onAppStateUpdate(await this.AppStateModel.get()); // also doesn't work
    // this.AppStateModel.setLocation(this.collectionId);
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
