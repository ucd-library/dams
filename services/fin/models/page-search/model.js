const {
  dataModels,
  logger,
  gc,
  config,
} = require("@ucd-lib/fin-service-utils");
const schema = require("./schema.json");
const clone = require("clone");
const { gcs } = gc;
const crypto = require("crypto");
const { parseString } = require("xml2js");
const { FinEsDataModel } = dataModels;
const workflowUtils = require("../workflows.js");

class PageSearch extends FinEsDataModel {
  constructor() {
    super("page-search");
    this.schema = schema;

    // use the workflow utils to define which workflows this model should
    // bind to.
    this.workflowConfig = workflowUtils.AUTO_WORKFLOWS;
    this.bindToWorkflows = [];

    for (let workflow in this.workflowConfig) {
      if (this.workflowConfig[workflow].pageSearch) {
        this.bindToWorkflows.push(workflow);
      }
    }

    this.transformService = "page-search-transform";
    this.expectGraph = false;
  }

  is(id, types = [], workflows = []) {
    let workflow = workflows.find((workflow) =>
      this.bindToWorkflows.includes(workflow)
    );
    if (workflow) {
      return true;
    }
    return false;
  }

  getWorkflowConfig(workflows = []) {
    let workflow = workflows.find((workflow) =>
      this.bindToWorkflows.includes(workflow)
    );
    if (workflow) return this.workflowConfig[workflow];
    return null;
  }

  /**
   * @description search the elasticsearch collections using the ucd dams
   * search document.
   *
   * @param {Object} SearchDocument
   * @param {Boolean} options.debug will return searchDocument and esBody in result
   *
   * @returns {Promise} resolves to search result
   */
  async search(searchDocument, index) {
    if (!index) index = this.readIndexAlias;

    let id = searchDocument.id;
    let query = {
      bool: {
        should: [
          { term: { "@graph.identifier": id } },
          { term: { "@graph.@id": id } },
          { term: { "@id": id } },
        ],
        must: {
          multi_match: {
            query: searchDocument.text,
            fields: "@graph.content",
          },
        },
      },
    };

    let results = await this.esSearch(
      {
        from: 0,
        size: searchDocument.limit || 100,
        sort: searchDocument.sort || "_score",
        query,
        highlight: {
          fields: {
            "@graph.content": {},
          },
        },
      },
      {},
      index
    );

    return results.hits.hits.map((item) => {
      item._source.highlight = item.highlight;
      return item._source;
    });
  }

  async iaSearch(searchDocument, index) {
    if (!searchDocument.limit) searchDocument.limit = 5000;
    let results = await this.search(searchDocument, index);
    let transformedResults = [];

    for (let result of results) {
      (await this.iaSearchResultTransform(result)).forEach((word) =>
        transformedResults.push(word)
      );
    }

    return {
      ia: searchDocument.id,
      q: searchDocument.text,
      indexed: true,
      matches: transformedResults,
    };
  }

  iaSearchResultTransform(result) {
    return new Promise((resolve, reject) => {
      let terms = new Set();
      for (let key in result.highlight) {
        for (let match of result.highlight[key]) {
          (match.match(/<em>(.*)<\/em>/g) || [])
            .map((word) => word.replace(/<\/?em>/g, ""))
            .forEach((word) => terms.add(word));
        }
      }

      let matchWords = Array.from(terms).map((term) => new RegExp(term, "i"));

      let node = result["@graph"][0];
      parseString(node.content, (error, result) => {
        let words = [];

        let pageData = {
          width: parseInt(result?.OBJECT?.$?.width),
          height: parseInt(result?.OBJECT?.$?.height),
          page: parseInt(node.position),
        };

        result?.OBJECT?.HIDDENTEXT?.forEach((item) => {
          item?.PAGECOLUMN?.forEach((column) => {
            column?.REGION?.forEach((region) => {
              region?.PARAGRAPH?.forEach((paragraph) => {
                paragraph?.LINE?.forEach((line) => {
                  line?.WORD?.forEach((word) => {
                    if (!word._) return;

                    for (let re of matchWords) {
                      if (re.test(word._)) {
                        words.push(this.transformIaMatch(word, line, pageData));
                      }
                    }
                  });
                });
              });
            });
          });
        });

        resolve(words);
      });
    });
  }

  transformIaMatch(word, line, pageData) {
    let text = line.WORD.map((item) => {
      if (!item._) return "";
      if (item._ === word._) return `{{{${item._}}}}`;
      return item._;
    }).join(" ");

    let [top, right, bottom, left] = word.$.coords
      .split(",")
      .map((item) => parseInt(item));

    return {
      text,
      par: [
        {
          l: left,
          t: top,
          r: right,
          b: bottom,
          page: pageData.page,
          boxes: [
            {
              l: left,
              t: top,
              r: right,
              b: bottom,
              page: pageData.page,
            },
          ],
          page_width: pageData.width,
          page_height: pageData.height,
        },
      ],
    };
  }

  /**
   * @method update
   * @description Page search has a one to many relationship with the page search index.
   * This method will update all pages for a given container.  See _updatePage() description
   * for details on how a single page is updated.
   *
   * @param {Object} json
   * @param {String} index
   * @returns {Promise}
   */
  async update(json, index) {
    if (!index) index = this.writeIndexAlias;

    // fetch new data
    let node = json["@graph"][0];
    let manifest = await fetch(node.manifest);
    manifest = await manifest.json();
    delete node.manifest;

    // if this is single page, standardize to array
    if (!manifest.pages) {
      manifest = { pages: [manifest] };
    }

    let roles = await this.getAccessRoles({
      "@id": json["@id"],
    });
    json.roles = roles;

    // index pages
    let dbResponses = [];
    for (let page of manifest.pages) {
      if (!page.ocr) {
        let message = `ES Indexer skipping ${this.modelName} update: ${node["@id"]}.  no ocr data for page.`;
        logger.info(message);
        dbResponses.push({ message });
        continue;
      }

      dbResponses.push(await this._updatePage(json, page, index));
    }

    return { updates: dbResponses };
  }

  /**
   * @method _updatePage
   * @description update a single page in the page search index.  Each container could have
   * multiple pages, so we need to update each page individually.  And we want to be smart,
   * not updating ALL pages if only some metadata has changed that doesn't affect the search.
   * So both page metadata hashes and ocr file content hashes are used to determine if we
   * need to update the page.
   *
   * @param {Object} json jsonld graph for the page
   * @param {Object} pageManifest page manifest object from the images workflow
   * @param {Object} index update index
   * @returns
   */
  async _updatePage(json, pageManifest, index) {
    json = clone(json);

    let node = json["@graph"][0];
    let hashMetadata = Object.assign({}, node);
    delete hashMetadata._;

    // create a sha hash of the json object
    let pageMetadataHash = crypto
      .createHash("sha256")
      .update(JSON.stringify(hashMetadata))
      .digest("base64");

    // position is set by container data, should be base 1.  If not set,
    // use the page number from the manifest, which uses base 0
    if (pageManifest.page !== undefined) {
      node.position = pageManifest.page + 1;
    }
    if (node.position === undefined) {
      node.position = (pageManifest.page || 0) + 1;
    }
    node.identifier = node["@id"] + "/" + node.position;

    node.clientMedia = {
      images: pageManifest,
    };
    node.pageMetadataHash = pageMetadataHash;

    // get the gcs path of the page
    let parts = pageManifest.ocr.url.split("/svc:gcs/")[1].split("/");
    let bucket = parts.shift();
    let path = parts.join("/");
    let gcsPath = `gs://${bucket}${node["@id"]}/${path}`;

    // check the sha of the manifest to see if we need to update
    let results = await this.esSearch(
      {
        from: 0,
        size: 1,
        query: {
          bool: {
            filter: [{ term: { "@graph.identifier": node.identifier } }],
          },
        },
      },
      {},
      index
    );

    let pageMetadata = await gcs.getGcsFileMetadata(gcsPath);

    if (!pageMetadata) {
      let message = `ES Indexer skipping ${this.modelName} update: ${node["@id"]}.  ocr page not found in gcs: ${gcsPath}`;
      logger.info(message);
      return { message };
    }

    // if we have a result, check the hashes
    let exists = results.hits.total.value > 0;
    if (exists) {
      let currentGraph = results.hits.hits[0]._source;
      let currentNode = currentGraph ? currentGraph["@graph"] : null;
      if (currentNode.length) currentNode = currentNode[0];

      if (currentNode.pageMetadataHash === pageMetadataHash) {
        if (
          currentNode &&
          currentNode.clientMedia &&
          currentNode.clientMedia.ocrHash === pageMetadata.md5Hash
        ) {
          let message = `ES Indexer skipping ${this.modelName} update: ${node["@id"]}.  OCR data and metadata hashes have not changed.`;
          logger.info(message);
          return { message };
        }
      }
    }

    // fetch the ocr data
    node.clientMedia.ocrHash = pageMetadata.md5Hash;
    node.content = await gcs.loadFileIntoMemory(gcsPath);

    // remove old page
    if (exists) {
      try {
        await this.client.delete({
          index,
          id: node.identifier,
        });
      } catch (e) {
        logger.warn("failed to remove page", e);
      }
    }

    let response = await this.client.index({
      index,
      id: node.identifier,
      body: json,
    });

    return response;
  }

  async remove(id, index) {
    if (!index) index = this.writeIndexAlias;

    logger.info(`ES Indexer removing ${this.modelName}: ${id} page(s)`);
    return await this.client.deleteByQuery({
      index,
      refresh: true,
      body: {
        query: {
          bool: {
            filter: [{ term: { "@graph.@id": id } }],
          },
        },
      },
    });
  }

  async get() {
    throw new Error("not implemented for ia-book-reader");
  }

  async all() {
    throw new Error("not implemented for ia-book-reader");
  }

  getDefaultIndexConfig(schema) {
    let indexConfig = super.getDefaultIndexConfig(schema);
    let analysis = indexConfig.body.settings.analysis;
    // add custom analyzer for page search
    if (!analysis.filter) {
      analysis.filter = {};
    }
    if (!analysis.char_filter) {
      analysis.char_filter = {};
    }
    if (!analysis.analyzer) {
      analysis.analyzer = {};
    }

    analysis.char_filter.djvu_xml = {
      type: "pattern_replace",
      pattern: "<[^>]*>",
      replacement: "",
      flags: "CASE_INSENSITIVE",
    };

    analysis.filter.djvu_xml = {
      type: "stop",
      ignore_case: true,
      stopwords: [
        "_english_",
        "xml",
        "object",
        "param",
        "hiddentext",
        "pagecolumn",
        "region",
        "paragraph",
        "line",
        "word",
      ],
    };

    analysis.analyzer.djvu_xml = {
      // tokenizer: 'xml',
      type: "stop",
      char_filter: ["djvu_xml"],
      filter: ["lowercase", "stop"],
    };

    return indexConfig;
  }
}

module.exports = new PageSearch();
