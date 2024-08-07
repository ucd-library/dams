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
      let group = groups.find(g => g.clientMedia?.images);
      if( group ) {
        images = group?.clientMedia?.images;
      }
    }

    if( rootNode.subjects && !Array.isArray(rootNode.subjects) ) rootNode.subjects = [rootNode.subjects];

    const vcData = {
      id: rootNode["@id"],
      description: rootNode.description,
      title: rootNode.name,
      images,
      subjects: rootNode.subjects || [],
      callNumber,
      count: rootNode.itemCount,
      yearPublished: rootNode.yearPublished,
    };

    e.vcData = vcData;
  }

    /**
   * @method renderCollections
   * @description transform data for ui from search results
   *
   * @param {Object} e
   */
    renderCollections(e) {
      // translate collection and related nodes/items to ui model
      let results = (e.payload.results || []);
      results.forEach(result => {
        let rootNode = result.root;

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
        if( result.clientMedia?.mediaGroups ) {
          let groups = result.clientMedia.mediaGroups;
          let group = groups.find(g => g.clientMedia?.images);
          if( group ) {
            images = group?.clientMedia?.images;
          }
        }
    
        const vcData = {
          id: rootNode["@id"],
          description: rootNode.description,
          title: rootNode.name,
          images,
          subjects: rootNode.subjects || [],
          callNumber,
          count: rootNode.itemCount,
          yearPublished: rootNode.yearPublished,
        };
    
        result.vcData = vcData;
      });
    }
}

module.exports = new CollectionVcModel();
