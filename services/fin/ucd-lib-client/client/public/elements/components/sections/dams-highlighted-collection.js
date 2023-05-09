import { LitElement } from "lit";
import render from "./dams-highlighted-collection.tpl.js";

/**
 * @class DamsHighlightedCollection
 * @description Homepage UI component class for displaying a page section higlighting a collection.
 *
 * @prop {Object} collection - A featured collection from the FcAppConfigModel.
 * @prop {Boolean} imageRight - Should the image be on the right or left?
 */
export default class DamsHighlightedCollection extends Mixin(LitElement).with(
  LitCorkUtils
) {
  static get properties() {
    return {
      collection: { type: Object },
      collectionId: { type: String, attribute: "collection-id" },
      imageRight: { type: Boolean, attribute: "image-right" },
      _collectionTitle: { type: String, attribute: "collection-title" },
      _imgSrc: { type: String, attribute: "img-src" },
      _collectionDesc: { type: String, attribute: "collection-desc" },
      _itemCt: { type: Number, attribute: "item-ct" },
      _href: { type: String },
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.collection = {};
    this.imageRight = false;
    this._collectionTitle = "";
    this._imgSrc = "";
    this._collectionDesc = "";
    this._itemCt = 0;
    this._href = "";

    this._injectModel("CollectionModel", "CollectionVcModel");
  }

  /**
   * @method willUpdate
   * @description Lit lifecycle method called when element is updated.
   * @param {Map} props - Properties that have changed.
   */
  willUpdate(props) {
    if (Object.keys(this.collection).length) {
      if (this.collection.label) {
        this._collectionTitle = this.collection.label;
      } else if (this.collection.associatedMedia.name) {
        this._collectionTitle = this.collection.associatedMedia.name;
      }
      if (this.collection.description) {
        this._collectionDesc = this.collection.description;
      } else if (this.collection.associatedMedia.description) {
        this._collectionDesc = this.collection.associatedMedia.description;
      }
      this._imgSrc = this.collection.thumbnailUrl
        ? this.collection.thumbnailUrl
        : this.collection.associatedMedia.thumbnailUrl;
      this._itemCt = this.collection.associatedMedia.recordCount;
      this._href = this.collection.associatedMedia["@id"];
    } else if (this.collectionId) {
      this._getCollection(this.collectionId);
    }
  }

  async _getCollection(id) {
    await this.CollectionModel.get(id);
  }

  _onCollectionVcUpdate(e) {
    if (e.state !== "loaded" || e.payload.results.id === this.id) return;

    // this.collection = e.payload.results;
    this._imgSrc = this.collection.thumbnailUrl;
    this._collectionTitle = this.collection.title;
    this.itemCt = e.payload.results.count;
    this.href = this.collection.id;
    // TODO description if _collectionDesc is empty
    //  also image and title need to be populated
  }
}

customElements.define("dams-highlighted-collection", DamsHighlightedCollection);
