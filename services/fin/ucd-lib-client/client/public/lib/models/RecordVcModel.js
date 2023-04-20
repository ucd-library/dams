const {BaseModel} = require('@ucd-lib/cork-app-utils');
const RecordVcStore = require('../stores/RecordVcStore');

class RecordVcModel extends BaseModel {

  constructor() {
    super();

    this.store = RecordVcStore;
    // this.EventBus.on('selected-record-update', e => this._onSelectedRecordUpdate(e));
    this.register('RecordVcModel');
  }

  /**
   * @method translate
   * @description listen for record search update events, transform data for ui and emit event to update
   * 
   * @param {Object} e 
   */
  translate(e) {
    if( e && e.clientMedia ) {

      let callNumber = '';
      if( e.root.identifier ) {
        if( !Array.isArray(e.root.identifier) ) e.root.identifier = [e.root.identifier];
        e.root.identifier.forEach(id => {
          let match = id.match(/[a-zA-Z]{1,2}-\d{3}/g);
          if( match ) callNumber = match[0];
        });  
      }

      // send back clientMedia.imageSizes graph record
      // let collectionImg = e.root.image['@id'];
      // if( collectionImg ) collectionImg = e.data['@graph'].filter(r => r['@id'] === collectionImg)[0];
      let collectionImg = e.clientMedia?.mediaGroups[0]?.display?.clientMedia?.imageSizes?.small?.url;

      // TODO hack, should we pull collectionImg from app container? for now just random image if not found
      if( !collectionImg ) {
        // TODO fix to check e.root.clientMedia instead of .image, however sometimes .clientMedia doesn't get added even though 
        //  it is in fuseki

        // collectionImg = e.data['@graph'].filter(r => r.filename && r.filename.indexOf(e.root.image['@id'].split('.').pop()) > 0)[0];
      }

      // TODO temp remove oac isPartOf records
      let collectionId;
      if( e.root.isPartOf ) {
        if( !Array.isArray(e.root.isPartOf) ) e.root.isPartOf = [e.root.isPartOf];
        e.root.isPartOf.forEach(ipo => {
          if( !ipo['@id'].includes('oac.cdlib.org') ) collectionId = ipo['@id'];
        });  
      }

      debugger;
      // translate collection and related nodes/items to ui model
      const item = {
        '@id' : e.root['@id'],
        name : e.root.name,
        collectionId,
        collectionName : e.root.creator?.name,
        collectionItemsCount : 42,
        collectionImg,
        clientMedia : e.clientMedia,
        date : e.root.yearPublished,
        publisher : e.root.publisher?.name,
        keywords : Array.isArray(e.root.about) ? e.root.about : [e.root.about] || [],
        callNumber,
        arkDoi : ['?'],
        fedoraLinks : ['?'],
        citationText : '?',
        root : e.root
      }

      // todo save translated data to store
      // todo this really will emit from this.store.setRecordSearchState() or similar
      // this.emit('record-vc-update', item); 
      return item;
    }
  }

}

module.exports = new RecordVcModel();