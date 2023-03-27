import { LitElement } from 'lit';
import render from "./dams-collection-card.tpl.js";

/**
 * @class DamsCollectionCard
 * @description UI component class for displaying a collection preview card
 * 
 * @prop {Object} collection - An object describing a DAMS collection. 
 * If used, element will set all subsequent properties with data from collections object.
 * @prop {String} imgSrc - The collection thumbnail src.
 * @prop {String} cardTitle - The title of the collection.
 * @prop {Number} itemCt - The total number of items in the collections.
 * @prop {String} href - Link to the collection landing page.
 */
export default class DamsCollectionCard extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      collection: {type: Object},
      id: {type: String, attribute: 'data-id'},
      imgSrc: {type: String, attribute: 'img-src'},
      cardTitle: {type: String, attribute: 'card-title'},
      itemCt: {type: Number, attribute: 'item-ct'},
      href: {type: String},
      darkBg: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
 
    this.collection = {};
    this.id = "";
    this.imgSrc = "";
    this.cardTitle = "";
    this.itemCt = 0;
    this.href = "";
    this.darkBg = false;

    this._injectModel('CollectionModel', 'CollectionVcModel');
  }

  /**
   * @method willUpdate
   * @description Lit lifecycle method called when element is updated.
   * @param {Map} props - Properties that have changed.
   */
  willUpdate(props) {
    if ( (this.id && Object.keys(this.collection).length === 0) || (this.id && this.collection.id !== this.id) ) { 
      this._getCollection(this.id);
    } else if ( this.collection && this.collection.id ) {
      if ( this.collection.associatedMedia ) {
        this.imgSrc = this.collection.thumbnailUrl ? this.collection.thumbnailUrl : this.collection.associatedMedia.thumbnailUrl;
        this.cardTitle = this.collection.title ? this.collection.title : this.collection.associatedMedia.name;
        this.itemCt = this.collection.associatedMedia.recordCount; // TODO should we use associatedMedia still? or VC
        this.href = this.collection.associatedMedia.id;
      } else {
        this.imgSrc = this.collection.thumbnailUrl;
        this.cardTitle = this.collection.title;
        this.itemCt = this.collection.count;
        this.href = this.collection.id;
      }
      this.darkBg = props.has('darkBg');
    }
  }

  async _getCollection(id) {
    await this.CollectionModel.get(id);
  }

  _onCollectionVcUpdate(e) {
    if ( e.state !== 'loaded' || e.payload.results.id !== this.id ) return;

    this.collection = e.payload.results;
    this.imgSrc = this.collection.thumbnailUrl;
    this.cardTitle = this.collection.title;
    this.itemCt = e.payload.results.count;
    this.href = this.collection.id;
  }
}

customElements.define('dams-collection-card', DamsCollectionCard);
