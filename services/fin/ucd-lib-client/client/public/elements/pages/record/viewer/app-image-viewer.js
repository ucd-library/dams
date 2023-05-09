// import {PolymerElement} from "@polymer/polymer/polymer-element"
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
    let selectedRecordMedia = await this.AppStateModel.getSelectedRecordMedia();
    if (selectedRecordMedia)
      this._onSelectedRecordMediaUpdate(selectedRecordMedia, true);
  }

  _onAppStateUpdate(e) {
    if (
      !e.selectedRecordMedia ||
      e.selectedRecord?.index[e.location.pathname]["@id"] !==
        e.selectedRecordMedia["@id"]
    ) {
      let selectedRecordMedia = e.selectedRecord.index[e.location.pathname];
      this._onSelectedRecordMediaUpdate(selectedRecordMedia);
    }
  }

  /**
   * @method _onSelectedRecordMediaUpdate
   * @description from AppStateInterface, called when a records media is selected
   *
   * @param {Object} media
   */
  _onSelectedRecordMediaUpdate(media) {
    if (!media) return;
    let getMediaType = utils.getMediaType(media);
    if (getMediaType !== "ImageList" && getMediaType !== "ImageObject") return;

    if (
      this.media["@id"] !==
        this.AppStateModel.locationElement.location.pathname &&
      this.AppStateModel.locationElement.location.pathname.indexOf(
        "/media/images/"
      ) < 0
    )
      return;
    this.media = media;
    this._renderImg();
  }

  _renderImg() {
    if (this.media.hasPart && this.media.hasPart.length > 0) {
      this.media.image = this.media.hasPart[0].image;
    }
    this.loading = true;

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
    this.loading = false;
  }
}

customElements.define("app-image-viewer", AppImageViewer);
