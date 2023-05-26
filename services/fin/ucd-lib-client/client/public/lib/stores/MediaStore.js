const {BaseStore} = require('@ucd-lib/cork-app-utils');
const clone = require('clone');

class MediaStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      byId : {},
      // by collection id
      defaultSearch : {},
      search : {
        state : this.STATE.INIT
      }
    }

    this.events = {
      // COLLECTION_VC_UPDATE : 'collection-vc-update',
    }

  }

  /*
  getRecord(id) {
    let parts = id.split('/').filter(p => p !== '');
    for( let i = parts.length-1; i >= 0; i-- ) {
      let pid = '/'+parts.join('/');
      if( this.data.byId[pid] ) {
        return this.data.byId[pid];
      }
      parts.splice(i, 1);
    }
    return null;
  }

  setRecordLoading(id, promise) {
    this._setRecordState({
      state: this.STATE.LOADING, 
      id,
      request : promise
    });
  }

  setRecordLoaded(id, payload) {
    this._setRecordState({
      state: this.STATE.LOADED,
      rootId : payload.id,
      payload, id
    });
  }

  setRecordError(id, error) {
    this._setRecordState({
      state: this.STATE.ERROR,   
      error, id
    });
  }

  _setRecordState(state) {
    this.data.byId[state.id] = state;
    if( state.rootId ) {
      this.data.byId[state.rootId] = state;
    }
    this.emit(this.events.RECORD_UPDATE, state);
  }
  */
}

module.exports = new MediaStore();