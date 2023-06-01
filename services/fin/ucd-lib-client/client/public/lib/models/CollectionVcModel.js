class CollectionVcModel {

  /**
   * @method _onCollectionUpdate
   * @description listen for record search update events, transform data for ui and emit event to update
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

    // TODO change to leverage clientMedia.images, however they're not building from the api yet for collections
    let images;
    if( e.payload?.clientMedia?.mediaGroups ) {
      let groups = e.payload.clientMedia.mediaGroups;
      let group = groups.find(g => g['@type'].includes('ImageObject') || (g.filename || '').match(/\.(png|jpg)$/));
      if( group ) {
        images = group.clientMedia.images;
      }
    }

    const vcData = {
      id: e.payload["@id"],
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
