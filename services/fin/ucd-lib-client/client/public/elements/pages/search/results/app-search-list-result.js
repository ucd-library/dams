import { LitElement } from "lit";

import AppSearchResult from "./app-search-result";
import render from "./app-search-list-result.tpl.js";

/**
 * @class AppSearchListResult
 * @description UI component class for displaying a item preview card
 *
 * @prop {String} id - Item id
 * If used, element will query the RecordModel for the item data.
 * @prop {Object} data - Data object containing item information
 * @prop {String} itemUrl - Url to item
 * @prop {String} thumbnailUrl - Thumbnail url
 * @prop {String} title - Title
 * @prop {String} date - Date of digitization
 * @prop {String} collection - Collection item belongs to
 * @prop {String} format - Item format
 */
export class AppSearchListResult extends Mixin(LitElement).with(LitCorkUtils) {
  static get properties() {
    return {
      id: { type: String, attribute: "data-itemid" },
      data: { type: Object },
      itemUrl: { type: String },
      thumbnailUrl: { type: String },
      title: { type: String },
      date: { type: String },
      collection: { type: String },
      format: { type: String },
    };
  }

  constructor() {
    super();
    this.active = true;
    this.render = render.bind(this);

    this.id = "";
    this.data = {};
    this.itemUrl = "";
    this.thumbnailUrl = "";
    this.title = "";
    this.date = "";
    this.collection = "";
    this.format = "";

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
    this.data.date = res.date;
    this.data.collection = res.collection;
    this.data.format = res.format;
    this.itemUrl = res["@id"];
    this.thumbnailUrl = res.collectionImg;
    this.title = res.name;
    this.date = res.date;
    this.collection = res.collection;
    this.format = res.format;
  }
}

customElements.define("app-search-list-result", AppSearchListResult);
