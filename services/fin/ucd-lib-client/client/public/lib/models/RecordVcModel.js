const config = require("../config");

class RecordVcModel {
  
  /**
   * @method renderRecord
   * @description transform data for ui
   *
   * @param {Object} e
   */
  renderRecord(e) {
    let {root, clientMedia, data} = e.payload;

    if (root && clientMedia) {
      let callNumber = "";

      if (root && root.identifier) {
        if (!Array.isArray(root.identifier))
          root.identifier = [root.identifier];
          root.identifier.forEach((id) => {
            let match = id.match(/[a-zA-Z]{1,2}-\d{3}/g);
            if (match) callNumber = id; // match[0];
        });
      }

      let collectionId = '';
      if (root.isPartOf) {
        if (!Array.isArray(root.isPartOf)) {
          root.isPartOf = [root.isPartOf];
        }

        for( let part of root.isPartOf ) {
          if( part['@id'].startsWith('/collection/') ) {
            collectionId = part['@id'];
            break;
          }
        }
      }

      let keywords = root.about || [];
      if( !Array.isArray(keywords) ) keywords = [keywords];

      // translate collection and related nodes/items to ui model
      const vcData = {
        "@id": root["@id"],
        name: root.name,
        collectionId,
        collectionName: config.collectionLabels[collectionId] || '',
        clientMedia: clientMedia,
        date: root.yearPublished,
        publisher: root?.publisher?.name,
        keywords,
        callNumber,
        arkDoi: ["?"],
        fedoraLinks: ["?"],
        citationText: "?",
        // building these in the ui for now since the links change as different media is selected
        // arkDoi,
        // fedoraLinks,
        root,
      };

      e.vcData = vcData;
    }
  }
}

module.exports = new RecordVcModel();
