import { LitElement } from "lit";
// import AppSearchResult from "./app-search-result"
import render from "./app-search-grid-result.tpl.js";

/**
 * @class AppSearchGridResult
 * @description UI component class for displaying a item preview card
 *
 * @prop {String} id - Item id
 * If used, element will query the RecordModel for the item data.
 * @prop {Object} data - Data object containing item information
 * @prop {String} itemUrl - Url to item
 * @prop {String} thumbnailUrl - Thumbnail url
 * @prop {String} truncatedTitle - Titles over 38 characters will be truncated to fit a single line
 */
export class AppSearchGridResult extends Mixin(LitElement).with(LitCorkUtils) {
  static get properties() {
    return {
      id: { type: String, attribute: "data-itemid" },
      data: { type: Object },
      itemUrl: { type: String },
      thumbnailUrl: { type: String },
      truncatedTitle: { type: String },
      bounds: { type: Array },
      imageHeight: { type: Number },
    };
  }

  constructor() {
    super();
    this.active = true;
    this.render = render.bind(this);

    this.id = "";
    this.data = {};
    this.truncatedTitle = "";
    this.itemUrl = "";
    this.thumbnailUrl = "";
    this.hasRendered = false;
    this.bounds = [];
    this.imageHeight = 0;

    this._injectModel("RecordModel", "RecordVcModel");
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
    } else {
      this._getItem(this.id);
    }
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
    let res = await this.RecordModel.get(id);

    if (res.state !== "loaded") return;
    res = this.RecordVcModel.translate(res.payload);
    this.data.title = res.name;
    this.data.itemUrl = res["@id"];
    this.data.thumbnailUrl = res.collectionImg;
    this.itemUrl = res["@id"];
    this.thumbnailUrl = res.collectionImg;
    this.title = res.name;
    this._renderImage();
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
