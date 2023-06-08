import { LitElement } from "lit";
import render from "./dams-item-card.tpl.js";
import "@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon";

/**
 * @class DamsItemCard
 * @description UI component class for displaying a item preview card
 *
 * @prop {String} id - Item id
 * If used, element will query the RecordModel for the item data.
 * @prop {Object} data - Data object containing item information
 * @prop {String} itemUrl - Url to item
 * @prop {String} thumbnailUrl - Thumbnail url
 * @prop {String} truncatedTitle - Titles over 38 characters will be truncated to fit a single line
 */
export default class DamsItemCard extends Mixin(LitElement).with(LitCorkUtils) {
  static get properties() {
    return {
      id: { type: String, attribute: "data-itemid" },
      // record: { type: Object },
      data: { type: Object },
      itemUrl: { type: String },
      thumbnailUrl: { type: String },
      truncatedTitle: { type: String },
      mediaType: { type: String },
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.id = "";
    // this.record = {};
    this.data = {};
    this.truncatedTitle = "";
    this.itemUrl = "";
    this.thumbnailUrl = "";
    this.mediaType = "";

    this._injectModel("RecordModel");
  }

  /**
   * @method willUpdate
   * @description Lit lifecycle method called when element is updated.
   * @param {Map} props - Properties that have changed.
   */
  willUpdate(props) {
    if (this.data.id) {
      this.itemUrl = this.data.id;
      this.thumbnailUrl = this.data.thumbnailUrl;
      this.mediaType = this.data.mediaType;
      if (this.data.mediaType === "Image") {
        this.mediaType = "image";
      } else if (this.data.mediaType === "Video") {
        this.mediaType = "video";
      } else if (this.mediaType === "Audio") {
        this.mediaType = "audio";
      } else {
        this.mediaType = "imageList";
      }
    } else {
      this._getItem(this.id);
    }

    this._truncateTitle();
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

    this._truncateTitle();
  }

  /**
   * @method _getItem
   * @description Fetches item data from RecordModel
   * @param {String} id - Item id to fetch
   */
  async _getItem(id) {
    await this.RecordModel.get(id);
  }

  /**
   * @method _truncateTitle
   * @description Truncates titles over 38 characters to fit a single line
   */
  _truncateTitle() {
    if (this.data && this.data.title && this.data.title.length > 38) {
      this.truncatedTitle = this.data.title.substring(0, 34) + "...";
    } else if (this.data && this.data.title) {
      this.truncatedTitle = this.data.title;
    }
  }
}

customElements.define("dams-item-card", DamsItemCard);
