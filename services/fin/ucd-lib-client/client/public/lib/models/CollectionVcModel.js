const { BaseModel } = require("@ucd-lib/cork-app-utils");
const CollectionVcStore = require("../stores/CollectionVcStore");

class CollectionVcModel extends BaseModel {
  constructor() {
    super();

    this.store = CollectionVcStore;
    this.EventBus.on("collection-update", (e) => this._onCollectionUpdate(e));
    this.register("CollectionVcModel");
  }

  /**
   * @method _onCollectionUpdate
   * @description listen for record search update events, transform data for ui and emit event to update
   *
   * @param {Object} e
   */
  async _onCollectionUpdate(e) {
    if (e.state === "loaded") {
      // translate collection and related nodes/items to ui model
      const rootNode = e.payload["@graph"].filter(
        (g) => g["@id"] === e.payload["@id"]
      )[0];

      // e.payload.node.shift();
      // todo this will come from admin application storage pref
      // let highlightedCollections = [];
      // for( let i = 1; i < 7 && e.payload.node.length > i; i++ ) {
      //   highlightedCollections.push({
      //     id : e.payload.node[i]['@id'],
      // title : e.payload.node[i].?,
      // thumbnailUrl : e.payload.node[i].?,
      // });
      // }

      let callNumber = "";
      if (rootNode.identifier) {
        if (!Array.isArray(rootNode.identifier))
          rootNode.identifier = [rootNode.identifier];
        rootNode.identifier.forEach((id) => {
          let match = id.match(/[a-zA-Z]{1,2}-\d{3}/g);
          if (match) callNumber = match[0];
        });
      }

      // TODO change to leverage clientMedia.images, however they're not building from the api yet
      let thumbnailUrl;
      if (
        e.payload["@graph"] &&
        e.payload["@graph"][0]?.image &&
        e.payload["@graph"][0]?.image
      ) {
        // @graph.image.@id ?
        thumbnailUrl = "/fcrepo/rest" + e.payload["@graph"][0]?.image["@id"];
      }

      const collection = {
        id: e.payload["@id"],
        description: rootNode.description,
        title: rootNode.name,
        thumbnailUrl,
        keywords: rootNode.keywords || [],
        callNumber,
        count: rootNode.itemCount,
        yearPublished: rootNode.yearPublished,
        // highlightedCollections
      };

      e.payload.results = collection;

      // todo save translated data to store
      // todo this really will emit from this.store.setRecordSearchState() or similar
      this.emit("collection-vc-update", e);
    }
  }
}

module.exports = new CollectionVcModel();
