import { LitElement } from "lit";

import render from "./app-image-viewer.tpl.js";

import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';

import utils from "../../../../lib/utils";

export default class AppImageViewer extends Mixin(LitElement).with(
  LitCorkUtils
) {
  static get properties() {
    return {
      record: { type: Object },
      media: { type: Object },
      loading: { type: Boolean },
      height: { type: String },
      hasMultipleImages: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.active = true;
    this.render = render.bind(this);
    this._injectModel("AppStateModel", "MediaModel");

    this.record = {};
    this.media = {};
    this.loading = false;
    this.height = '600px';
    this.hasMultipleImages = false;
  }

  async firstUpdated() {
    await this.AppStateModel.get();

    let selectedRecord = await this.AppStateModel.getSelectedRecord();
    if (selectedRecord)
      this._onSelectedRecordUpdate(selectedRecord);
  }

  /**
   * @method _onSelectedRecordMediaUpdate
   * @description from AppStateModel, called when a records media is selected
   *
   * @param {Object} media
   */
  _onSelectedRecordUpdate(e) {
    if( !e ) return;
    let {graph, clientMedia, selectedMedia, selectedMediaPage} = e;

    this.mediaType = utils.getMediaType(selectedMedia);
    if (this.mediaType !== "ImageList" && this.mediaType !== "ImageObject") return;

    this.loading = true;

    this.media = selectedMedia.clientMedia?.pages?.filter(media => media.page === selectedMediaPage)[0];
    // on first page load, selectedMediaPage is -1, so just show first page from clientMedia.images
    if( !this.media ) {
      this.media = selectedMedia.clientMedia.images;
    }

    this._renderImg();
  }

  async _renderImg() {
    if( this.media ) {
      // there could be gcs errors where only some of the images are available, or only the original
      let srcset = '';
      let src = this.media.large?.url || this.media.medium?.url || this.media.small?.url || '';

      if( this.media.small?.url ) srcset += `${this.media.small.url} ${this.media.small.size.width}w,`;
      if( this.media.medium?.url ) srcset += `${this.media.medium.url} ${this.media.medium.size.width}w,`;
      if( this.media.large?.url ) srcset += `${this.media.large.url} ${this.media.large.size.width}w,`;

      let size = await this.getImageSize(this.media.large || this.media.medium || this.media.small || this.media.original);
      if( Array.isArray(size) && size.length > 1 ) size = size[0];
      if( this.mediaType === 'ImageObject' ) {
        let maxHeight = 600;
        let optimalImageHeight = (size.height / size.width * window.innerWidth);
        this.height = optimalImageHeight > maxHeight ? maxHeight + 'px' : optimalImageHeight + 'px';
      } else {
        this.height = '600px';
      }

      let sizes = "600px";

      // add to img
      this.shadowRoot.querySelector("#img").srcset = srcset;
      this.shadowRoot.querySelector("#img").sizes = sizes;
      this.shadowRoot.querySelector("#img").src = src;
      this.shadowRoot.querySelector("#img").style.height = "600px";

      this.shadowRoot.querySelector('#img').addEventListener('load', () => {
        this.loading = false;
      });
    }
  }

  getImageSize(original) {
    if( original.size ) return original.size;
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = original.url;
      img.onload = () => {
        resolve(original.size = {
          height : img.naturalHeight, 
          width : img.naturalWidth
        }); 
      };
    });
  }

  destroy() {
    this.shadowRoot.querySelector("#img").srcset = '';
  }
}

customElements.define("app-image-viewer", AppImageViewer);
