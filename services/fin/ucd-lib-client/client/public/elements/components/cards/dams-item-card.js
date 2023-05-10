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
      data: { type: Object },
      itemUrl: { type: String },
      thumbnailUrl: { type: String },
      truncatedTitle: { type: String },
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.id = "";
    this.data = {};
    this.truncatedTitle = "";
    this.itemUrl = "";
    this.thumbnailUrl = "";

    this._injectModel("RecordModel", "RecordVcModel");
  }

  /**
   * @method willUpdate
   * @description Lit lifecycle method called when element is updated.
   * @param {Map} props - Properties that have changed.
   */
  willUpdate(props) {
    if (
      (this.id && Object.keys(this.data).length === 0) ||
      this.id !== this.data.itemUrl
    ) {
      this._getItem(this.id);
    }

    this._truncateTitle();
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
    this._truncateTitle();
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
