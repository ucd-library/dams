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
    }

    async _onAppStateUpdate(e) {
      // TODO eventually support mutiple mediaGroups, combine different media types into same viewer/nav?
      let mediaGroup = e.selectedRecord?.clientMedia?.mediaGroups;
      if( !mediaGroup || !mediaGroup.length ) return;
      // mediaGroup = mediaGroup[0];
      
      let mediaType;
      mediaGroup.forEach(media => {
        let type = utils.getMediaType(media.display);
        if( type ) {
          mediaType = type.toLowerCase().replace(/object/i, '');
          mediaGroup = media;
        }
      });

      if ( mediaType === "imagelist" ) {
        mediaType = "image";
      } else if ( mediaType === "streamingvideo" ) {
        mediaType = "video";
      }

      if( mediaType === 'bagoffiles' && selectedRecordMedia.thumbnailUrl ) {
        this.bagOfFilesImage = selectedRecordMedia.thumbnailUrl;
      } else {
        this.bagOfFilesImage = '';
      }

      if( mediaGroup.display.clientMedia && mediaGroup.display.clientMedia.iaReader ) {
        mediaType = 'bookreader';
        this.isBookReader = true;
        let brData = await this.RecordModel.getIaBookManifest(mediaGroup.display.clientMedia.iaReader.manifest);
        if( brData && brData.body ) {
          this.mediaType = 'bookreader';
          this.bookData = typeof brData.body === 'string' ? JSON.parse(brData.body) : brData.body;
        }
      }

      this.mediaType = mediaType;
      this.AppStateModel.setSelectedRecordMedia(e.selectedRecord.index[e.location.pathname]);
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