import { LitElement } from "lit"
import render from "./app-media-viewer.tpl"

import '@polymer/iron-pages'

import "./app-image-viewer"
import "./app-bookreader-viewer"
// import "./app-360-image-viewer"
import "./app-video-viewer"
import "./app-audio-viewer"

import "./app-media-viewer-nav"
import "./app-image-viewer-lightbox"

import "@ucd-lib/cork-app-utils"
import utils from "../../../../lib/utils"

export default class AppMediaViewer extends Mixin(LitElement)
  .with(LitCorkUtils) {

    static get properties() {
      return {
        mediaType: { type : String },
        tallControls : { type : Boolean },
        bagOfFilesImage : { type : String },
        brFullscreen : { type : Boolean },
        bookData : { type : Object },
        isBookReader : { type : Boolean }
      }
    }

    constructor() {
      super();
      this.render = render.bind(this);
      this.active = true;

      this._injectModel('AppStateModel', 'RecordModel');
      this.mediaType = 'image';
      this.bagOfFilesImage = '';
      this.brFullscreen = false;
      this.bookData = {};
      this.isBookReader = false;
    }

    async firstUpdated() {
      this.$.lightbox = this.shadowRoot.getElementById('lightbox');
      if( !this.$.lightbox ) this.$.lightbox = document.getElementById('lightbox');

      this._onAppStateUpdate(await this.AppStateModel.get());

      let selectedRecord = await this.AppStateModel.getSelectedRecord();
      if( selectedRecord ) {
        await this._onSelectedRecordUpdate(selectedRecord);
        let selectedRecordMedia = await this.AppStateModel.getSelectedRecordMedia();
        if( selectedRecordMedia ) this._onSelectedRecordMediaUpdate(selectedRecordMedia);
      }
    }

    /**
     * @method _onRecordUpdate
     * @description from RecordModel, listen for loading events and reset UI.
     * 
     * @param {Object} e state event 
     */
    async _onRecordUpdate(e) {
      if( e.state === 'loading' ) {
        this.mediaType = '';
        return;
      }
      // if( e.state !== 'loaded' ) return;
 
    }

    /**
     * @method _onSelectedRecordUpdate
     * @description from RecordModel
     * 
     * @param {Object} e state event 
     */
    async _onSelectedRecordUpdate(e) {
      let bookTitle = '';
      this.isBookReader = false;
      e.clientMedia.mediaGroups.forEach(media => {
        if( media.display.clientMedia.iaReader ) {
          this.isBookReader = true;
          bookTitle = media.display.filename;
        }
      });

      if( !e.root['@id'] || !bookTitle ) return;

      let brData = await this.RecordModel.getIaBookManifest(e.root['@id'], bookTitle);
      if( brData && brData.body ) {
        this.mediaType = 'bookreader';
        this.bookData = JSON.parse(brData.body);
      }
    }

    _onAppStateUpdate(e) {
      if( e.selectedRecord && e.selectedRecord.index[e.location.pathname] !== e.selectedRecordMedia && e.selectedRecord.root['@id'] !== e.location.pathname ) {
        let selectedRecordMedia = e.selectedRecord.index[e.location.pathname];
        this.selectedRecordMediaId = selectedRecordMedia.id;
        // }
        // if( !e.selectedRecordMedia ) {
        //   this.selectedRecordMediaId = '';
        //   return this.mediaType = '';
        // }
        // if( e.selectedRecordMedia['@id'] === this.selectedRecordMediaId ) {
        //   return;
        // }
  
        // this.selectedRecordMediaId = e.selectedRecordMedia['@id'];
  
        let mediaType = utils.getMediaType(selectedRecordMedia).toLowerCase().replace(/object/i, '');
        if ( mediaType === "imagelist" ) {
          mediaType = "image";
        } else if ( mediaType === "streamingvideo" ){
          mediaType = "video";
        }
  
        if( mediaType === 'bagoffiles' && selectedRecordMedia.thumbnailUrl ) {
          this.bagOfFilesImage = selectedRecordMedia.thumbnailUrl;
        } else {
          this.bagOfFilesImage = '';
        }
  
        this.mediaType = mediaType;
        this.AppStateModel.setSelectedRecordMedia(selectedRecordMedia);
      }

    }


    /**
     * @method _onZoomIn
     * @description bound to zoom event in app-media-viewer-nav. 
     * 
     * @param {Object} e custom HTML event
     */
    _onZoomIn(e) {
      this.AppStateModel.set({showLightbox: true});
      this.$.lightbox.show();
    }

    /**
     * @method _onBRZoomIn
     * @description bound to bookreader zoom event in app-media-viewer-nav. 
     * 
     * @param {Object} e custom HTML event
     */
    _onBRZoomIn(e) {
      this.shadowRoot.querySelector('#bookreader')._zoomIn();
    }

    /**
     * @method _onBRZoomOut
     * @description bound to bookreader zoom event out app-media-viewer-nav. 
     * 
     * @param {Object} e custom HTML event
     */
    _onBRZoomOut(e) {
      this.shadowRoot.querySelector('#bookreader')._zoomOut();
    }

    /**
     * @method _onToggleBookView
     * @description bound to book view single vs book mode event in app-media-viewer-nav. 
     * 
     * @param {Object} e custom HTML event
     */
    _onToggleBookView(e) {
      this.shadowRoot.querySelector('#bookreader')._toggleBookView();
    }

    /**
     * @method _onExpandBookView
     * @description bound to book view full page event in app-media-viewer-nav. 
     * 
     * @param {Object} e custom HTML event
     */
    _onExpandBookView(e) {
      this.brFullscreen = true;

      let brView = this.shadowRoot.querySelector('#bookreader');
      if( brView ) {
        brView.classList.add('fullscreen');
        brView.shadowRoot.querySelector('#BookReader').classList.add('fullscreen');
        document.body.style.overflow = 'hidden';

        let mediaNav = this.shadowRoot.querySelector('app-media-viewer-nav');
        let brNav = brView.shadowRoot.querySelector('.BRfooter');
        if( mediaNav && brNav ) {
          // append media nav in brNav to display inline
          let li = document.createElement('li');
          li.appendChild(mediaNav);
          brNav.querySelector('nav > ul').appendChild(li);
        
          // also move search button as first child
          let brSearch = mediaNav.shadowRoot.querySelector('.br-search');
          if( brSearch ) brNav.prepend(brSearch);
        }
        brView.br.resize();
      }
    }

    /**
     * @method _onCollapseBookView
     * @description bound to book view full page collapse event in app-media-viewer-nav. 
     * 
     * @param {Object} e custom HTML event
     */
    _onCollapseBookView(e) {
      this.brFullscreen = false;
      let brView = this.shadowRoot.querySelector('#bookreader');
      if( brView ) {
        brView.classList.remove('fullscreen');
        brView.shadowRoot.querySelector('#BookReader').classList.remove('fullscreen');
        document.body.style.overflow = '';
        let mediaNav = brView.shadowRoot.querySelector('app-media-viewer-nav');
        if( mediaNav ) {
          this.shadowRoot.querySelector('.wrapper').append(mediaNav);
        }

        brView.br.resize();
      }
    }
  }

  customElements.define('app-media-viewer', AppMediaViewer);