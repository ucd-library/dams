class CollectionVcModel {

  /**
   * @method renderCollection
   * @description transform data for ui
   *
   * @param {Object} e
   */
  renderCollection(e) {
    // translate collection and related nodes/items to ui model
    const rootNode = e.payload.root;

    let callNumber = "";
    if (rootNode.identifier) {
      if (!Array.isArray(rootNode.identifier)) {
        rootNode.identifier = [rootNode.identifier];
      }

      rootNode.identifier.forEach((id) => {
        let match = id.match(/[a-zA-Z]{1,2}-\d{3}/g);
        if (match) callNumber = match[0];
      });
    }

    let images;
    if( e.payload?.clientMedia?.mediaGroups ) {
      let groups = e.payload.clientMedia.mediaGroups;
      let group = groups.find(g => g['@type'].includes('ImageObject') || (g.filename || '').match(/\.(png|jpg)$/));
      if( group ) {
        images = group?.clientMedia?.images;
      }
    }

    const vcData = {
      id: rootNode["@id"],
      description: rootNode.description,
      title: rootNode.name,
      images,
      keywords: rootNode.keywords || [],
      callNumber,
      count: rootNode.itemCount,
      yearPublished: rootNode.yearPublished,
    };

    e.vcData = vcData;
  }
}

module.exports = new CollectionVcModel();
