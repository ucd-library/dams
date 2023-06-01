const { BaseModel } = require("@ucd-lib/cork-app-utils");
const RecordVcStore = require("../stores/RecordVcStore");
const config = require("../config");

class RecordVcModel extends BaseModel {
  constructor() {
    super();

    this.store = RecordVcStore;
    // this.EventBus.on('selected-record-update', e => this._onSelectedRecordUpdate(e));
    this.register("RecordVcModel");
  }

  /**
   * @method translate
   * @description listen for record search update events, transform data for ui and emit event to update
   *
   * @param {Object} e
   */
  translate(e) {
    let {graph, clientMedia, selectedMedia, selectedPageMedia} = e;

    if (graph && clientMedia) {
      let callNumber = "";

      if (graph.root && graph.root.identifier) {
        if (!Array.isArray(graph.root.identifier))
          graph.root.identifier = [graph.root.identifier];
          graph.root.identifier.forEach((id) => {
            let match = id.match(/[a-zA-Z]{1,2}-\d{3}/g);
            if (match) callNumber = match[0];
        });
      }

      let collectionId = '';
      if (graph.root.isPartOf) {
        if (!Array.isArray(graph.root.isPartOf)) {
          graph.root.isPartOf = [graph.root.isPartOf];
        }

        for( let part of graph.root.isPartOf ) {
          if( part['@id'].startsWith('/collection/') ) {
            collectionId = part['@id'];
            break;
          }
        }
      }

      let keywords = graph.root.about || [];
      if( !Array.isArray(keywords) ) keywords = [keywords];

      // translate collection and related nodes/items to ui model
      const item = {
        "@id": graph.root["@id"],
        name: graph.root.name,
        collectionId,
        collectionName: config.collectionLabels[collectionId] || '',
        clientMedia: clientMedia,
        date: graph.root.yearPublished,
        publisher: graph.root?.publisher?.name,
        keywords,
        callNumber,
        arkDoi: ["?"],
        fedoraLinks: ["?"],
        citationText: "?",
        graph,
      };

      // todo save translated data to store
      // todo this really will emit from this.store.setRecordSearchState() or similar
      // this.emit('record-vc-update', item);
      return item;
    }
  }
}

module.exports = new RecordVcModel();
