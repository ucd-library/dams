import { LitElement } from 'lit';
import {render, styles} from "./dams-collection-import.tpl.js";
import {Mixin, MainDomElement} from '@ucd-lib/theme-elements/utils/mixins';
import {LitCorkUtils} from '@ucd-lib/cork-app-utils';

import '../../lib/models/CollectionImportModel.js';

export default class DamsCollectionImport extends Mixin(LitElement)
  .with(MainDomElement, LitCorkUtils) {

  static get properties() {
    return {
      collectionList : {type: Array},
    }
  }

  // static get styles() {
  //   return styles();
  // }


  constructor() {
    super();

    this.collectionList = [];

    this.render = render.bind(this);
    this._injectModel('AppStateModel', 'CollectionImportModel');

    this.AppStateModel.get().then(e => this._onAppStateUpdate(e));

    setInterval(() => {
      this.refresh();
    }, 5000);
  }

  async _onAppStateUpdate(e) {
    if( e.page !== this.id ) return;

    await this.loadCollectionList();
  }

  updated() {
    for( let item of this.collectionList ) {
      if( item.state === 'running' || item.state === 'finished' ) {
        this._updateScroll(item.id);
      }
    }
  }

  async loadCollectionList() {
    this.logger.info('Loading collection list'); 
    let resp = await this.CollectionImportModel.list();

    if( resp.error ) {
      return;
    }
    resp = resp.payload;

    let list = [];

    resp.available.forEach(item => {
      if( resp.volumes.includes(item) ) {
        list.push({
          id : item,
          statusDetails : 'available (volume exists)',
          state : 'not-running',
          volume : true
        });
      } else {
        list.push({
          id : item,
          statusDetails : 'available',
          state : 'not-running'
        });
      } 
    });

    resp.applied.forEach(item => {
      this._wrapCollectionItem(item);
      list.push(item);
    });

    list.sort((a, b) => {
      if( a.id.toLowerCase() < b.id.toLowerCase() ) return -1;
      if( a.id.toLowerCase() > b.id.toLowerCase() ) return 1;
      return 0;
    });

    this.collectionList = list;
  }

  _wrapCollectionItem(item) {
    item.id = item.metadata.name.replace('import-', '');
    item.statusDetails = [];

    for( let key in item.status ) {
      if( typeof item.status[key] === 'object' ) {
        continue;
      } 
      item.statusDetails.push(key+'='+item.status[key]);
    }
    item.statusDetails = item.statusDetails.join(', ');

    if( item.status.active > 0 || item.status.ready > 0 ) {
      item.state = 'running';
    } else {
      item.state = 'finished';
    }
  }

  async _onCollectionImportClicked(id) {

    this.logger.info('Running collection import', id);
    let resp = await this.CollectionImportModel.start(id);
    this.logger.info('Collection import started', resp);
    this.loadCollectionList();
  }

  async _onForceStopClicked(id) {
    this.logger.info('Force stopping collection import', id);
    let resp = await this.CollectionImportModel.delete(id);
    this.logger.info('Collection import stopped', resp);
    this.loadCollectionList();
  }

  async _onRerunImportClicked(collection) {
    let ignoreBinarySync = this.querySelector(`input#ibs-input-${collection.id}`).checked;
    let id = collection.id;
    collection.state = 'removing';
    this.requestUpdate();

    this.logger.info('Rerunning collection import', id);
    let resp = await this.CollectionImportModel.delete(id);
    this.logger.info('Collection import stopped', resp);

    resp = await this.CollectionImportModel.start(id, {ignoreBinarySync});
    this.logger.info('Collection import started', resp);
    this.updateCollection(id);
  }

  async refresh() {
    for( let item of this.collectionList ) {
      if( item.state === 'running' ) {
        this.logger.info('Refreshing collection import', item.id);
        this.updateCollection(item.id);
      }
    }
  }

  async updateCollection(id) {
    this.logger.info('Updating collection', id);
    let resp = await this.CollectionImportModel.get(id);

    let item = resp.payload;
    this._wrapCollectionItem(item);

    let index = this.collectionList.findIndex(item => item.id === id);
    this.collectionList[index] = item;

    this.requestUpdate();
  }

  _updateScroll(collectionId) {
    let ele = this.querySelector(`pre.logs[collection-id="${collectionId}"][auto-scroll]`);
    if( !ele ) return;
    ele.scrollTop = ele.scrollHeight;
  }



}

customElements.define('dams-collection-import', DamsCollectionImport);