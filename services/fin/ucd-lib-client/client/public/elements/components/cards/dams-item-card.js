import { LitElement } from "lit";
import render from "./dams-item-card.tpl.js";
import "@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon";

/**
 * @class DamsItemCard
 * @description UI component class for displaying a item preview card
 *
 * @prop {Object} item - An object describing a DAMS item.
 * If used, element will set all subsequent properties with data from items object.
 * @prop {String} imgSrc - The item thumbnail src.
 * @prop {String} cardTitle - The title of the item.
 * @prop {Number} itemCt - The total number of items in the items.
 * @prop {String} href - Link to the item landing page.
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
    // if ( props.has('item') && this.item['@id'] ) {
    //   if ( this.item.associatedMedia ) {
    //     this.imgSrc = this.item.thumbnailUrl ? this.item.thumbnailUrl : this.item.associatedMedia.thumbnailUrl;
    //     this.cardTitle = this.item.label ? this.item.label : this.item.associatedMedia.name;
    //     this.itemCt = this.item.associatedMedia.recordCount;
    //     this.href = this.item.associatedMedia['@id'];
    //   } else {
    //     this.imgSrc = this.item.thumbnailUrl;
    //     this.cardTitle = this.item.name;
    //     this.itemCt = this.item.recordCount;
    //     this.href = this.item['@id'];
    //   }
    // }
    if (
      (this.id && Object.keys(this.data).length === 0) ||
      this.id !== this.data.itemUrl
    ) {
      this._getItem(this.id);
    }

    this._truncateTitle();
  }

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

  // _onRecordUpdate(e) {
  //   if ( e.state !== 'loaded' || e.payload.root.id !== this.id ) return;

  //   let vcRecord = this.RecordVcModel.translate(e.payload);
  //   debugger;
  //   this.data.title = vcRecord.name;
  //   this.data.itemUrl = this.id;
  //   this.data.thumbnailUrl = vcRecord.collectionImg;
  //   this.itemUrl = this.id;
  //   this.thumbnailUrl = vcRecord.collectionImg;
  //   this._truncateTitle();
  // }

  _truncateTitle() {
    if (this.data && this.data.title && this.data.title.length > 38) {
      this.truncatedTitle = this.data.title.substring(0, 34) + "...";
    } else if (this.data && this.data.title) {
      this.truncatedTitle = this.data.title;
    }
  }
}

customElements.define("dams-item-card", DamsItemCard);
