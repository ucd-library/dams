import { LitElement } from "lit";

// import AppSearchResult from "./app-search-result"
import render from "./app-search-grid-result.tpl.js";

import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';

/**
 * @class AppSearchGridResult
 * @description UI component class for displaying a item preview card
 *
 * @prop {String} id - Item id
 * If used, element will query the RecordModel for the item data.
 * @prop {Object} data - Data object containing item information
 * @prop {String} itemUrl - Url to item
 * @prop {String} thumbnailUrl - Thumbnail url
 * @prop {String} title - Item title
 */
export class AppSearchGridResult extends Mixin(LitElement).with(LitCorkUtils) {
  static get properties() {
    return {
      id: { type: String, attribute: "data-itemid" },
      data: { type: Object },
      itemUrl: { type: String },
      thumbnailUrl: { type: String },
      title: { type: String },
      bounds: { type: Array },
      imageHeight: { type: Number },
      mediaType: { type: String }
    };
  }

  constructor() {
    super();
    this.active = true;
    this.render = render.bind(this);

    this.id = "";
    this.data = {};
    this.title = "";
    this.itemUrl = "";
    this.thumbnailUrl = "";
    this.bounds = [];
    this.imageHeight = 0;
    this.mediaType = '';

    this._injectModel("RecordModel");
  }

  /**
   * @method firstUpdated
   * @description Lit lifecycle method called when element is updated.
   * @param {Map} props - Properties that have changed.
   */
  firstUpdated(props) {
    if (this.data.id) {
      this.title = this.data.title;
      this.itemUrl = this.data.id;
      this.thumbnailUrl = this.data.thumbnailUrl;
      if (this.thumbnailUrl) this._renderImage();
      if (this.data.mediaType === "Image") {
        this.mediaType = "image";
      } else if (this.data.mediaType === "Video") {
        this.mediaType = "video";
      } else if (this.mediaType === "Audio") {
        this.mediaType = "audio";
      } else {
        this.mediaType = "imageList";
        let imageCount = this.data.format?.[0]?.split(' ')[0];
        if( imageCount && parseInt(imageCount) < 2 ) {
          this.mediaType = 'image';
        }
      }
    } else {
      this._getItem(this.id);
    }
  }

  async _onRecordUpdate(e) {
    if (e.state !== "loaded" || e.id !== this.id) return;

    this.record = e.vcData;
    if( this.record.images ) {
      let images = this.record.images;
      this.thumbnailUrl = images.medium ? images.medium.url : images.original.url;
    }
    this.title = this.record.name;
    this.itemUrl = this.record['@id'];
    this.id = this.record['@id'];
    this._renderImage();
  }

  /**
   * @method _loadImage
   * @description preload image and set bounds to image dimensions
   *
   * @param {String} url url of image to load
   *
   * @returns {Promise} resolves when image is loaded and bounds array has been set
   */
  _loadImage(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();

      img.onload = () => {
        let res = [img.naturalHeight, img.naturalWidth];
        this.bounds = [[0, 0], res];
        resolve();
      };

      img.src = url;
    });
  }

  /**
   * @method _getItem
   * @description Fetches item data from RecordModel
   * @param {String} id - Item id to fetch
   */
  async _getItem(id) {
    this._onRecordUpdate(await this.RecordModel.get(id));
  }

  async _renderImage() {
    await this._loadImage(this.thumbnailUrl);

    let img = this.shadowRoot.querySelector("#img");
    let width = img.width || 1;
    let imageHeight = this.bounds[1][0];
    let imageWidth = this.bounds[1][1];
    let ratio = imageHeight / imageWidth;
    let height = width * ratio;
    this.imageHeight = height;
    this.dispatchEvent(new CustomEvent("rendered", { detail: this }));
  }
}

customElements.define("app-search-grid-result", AppSearchGridResult);
