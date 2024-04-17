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

      let subjects = root.subjects || [];
      if( !Array.isArray(subjects) ) subjects = [subjects];

      let images;
      if( e.payload?.clientMedia?.mediaGroups ) {
        let groups = e.payload.clientMedia.mediaGroups;
        let group = groups.find(g => g['@type'].includes('ImageObject') || (g.filename || '').match(/\.(png|jpg)$/));
        if( group ) {
          images = group.clientMedia?.images;
        } else if( groups[0]?.clientMedia?.images ) {
          images = groups[0].clientMedia.images;
        }
      }

      // translate collection and related nodes/items to ui model
      const vcData = {
        "@id": root["@id"],
        name: root.name,
        collectionId,
        collectionName: config.collectionLabels[collectionId] || '',
        clientMedia: clientMedia,
        images,
        date: root.yearPublished || 'Undated',
        description: root.description || '',
        publisher: root?.publisher?.name,
        subjects,
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
