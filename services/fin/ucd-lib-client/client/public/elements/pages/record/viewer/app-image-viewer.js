import { LitElement } from "lit";
import "@polymer/paper-spinner/paper-spinner-lite";
import render from "./app-image-viewer.tpl.js";

import utils from "../../../../lib/utils";

export default class AppImageViewer extends Mixin(LitElement).with(
  LitCorkUtils
) {
  static get properties() {
    return {
      record: { type: Object },
      media: { type: Object },
      loading: { type: Boolean },
      height: { type: Number },
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
    this.height = 600;
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
    let {graph, clientMedia, selectedMedia, selectedPageMedia} = e;

    let getMediaType = utils.getMediaType(selectedMedia);
    if (getMediaType !== "ImageList" && getMediaType !== "ImageObject") return;

    this.loading = true;
    this.media = selectedMedia;
    this._renderImg();
  }

  _renderImg() {
    if (this.media.hasPart && this.media.hasPart.length > 0) {
      this.media.image = this.media.hasPart[0].image;
    }

    if (this.media.clientMedia?.images) {
      let srcset = `
        ${this.media.clientMedia.images.small.url} ${this.media.clientMedia.images.small.size.width}w,
        ${this.media.clientMedia.images.medium.url} ${this.media.clientMedia.images.medium.size.width}w,
        ${this.media.clientMedia.images.large.url} ${this.media.clientMedia.images.large.size.width}w,
        ${this.media.clientMedia.images.original.url} ${this.media.clientMedia.images.original.size.width}w
      `;

      let sizes = "600px";

      // add to img
      this.shadowRoot.querySelector("#img").srcset = srcset;
      this.shadowRoot.querySelector("#img").sizes = sizes;
      this.shadowRoot.querySelector("#img").style.height = "600px";
    }
    requestAnimationFrame(() => {
      this.loading = false;
    });
  }
}

customElements.define("app-image-viewer", AppImageViewer);
