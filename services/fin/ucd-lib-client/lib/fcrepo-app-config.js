const config = require("../config.js");
const api = require("@ucd-lib/fin-api");
const { ActiveMqClient, logger } = require("@ucd-lib/fin-service-utils");

const { ActiveMqStompClient } = ActiveMqClient;
const CONTAINS = "http://www.w3.org/ns/ldp#contains";
const BINARY = "http://fedora.info/definitions/v4/repository#Binary";
const MIME_TYPE =
  "http://www.ebu.ch/metadata/ontologies/ebucore/ebucore#hasMimeType";

const graphUtils = api.io.utils;

api.setConfig({
  host: config.fcrepo.host,
  basePath: config.fcrepo.root,
  directAccess: true,
});

class AppConfig {
  constructor() {
    this.activemq = new ActiveMqStompClient(config.client.appName);
    this.activemq.onMessage((e) => this.handleMessage(e));
    this.activemq.connect({ queue: "/topic/fcrepo" });
    this.ROOT_PATH = "/application/" + config.client.appName;
    this.config = {};
    this.reload(true);
  }

  handleMessage(msg) {
    let id = msg.headers[this.activemq.ACTIVE_MQ_HEADER_ID];

    if (!id.match(this.ROOT_PATH)) return;

    // debounce reloads
    if (this.reloadTimeout) clearTimeout(this.reloadTimeout);

    this.reloadTimeout = setTimeout(async () => {
      this.reloadTimeout = null;
      logger.info("Reloading app config", this.ROOT_PATH);
      this.reload();
    }, 2000);
  }

  async reload(first) {
    if (first === true) await this.waitUntil();
    this.config = await this.crawl("/application/" + config.client.appName);
  }

  async waitUntil() {
    if (!this.fcrepoPromise) {
      this.fcrepoPromise = new Promise((resolve, reject) => {
        this.fcrepoResolve = resolve;
      });
    }

    api
      .head({
        path: "/",
        superuser: true,
        directAccess: true,
      })
      .then(async (resp) => {
        if (resp.data.statusCode === 200) {
          if (typeof this.fcrepoResolve === "function") {
            this.fcrepoResolve();
          }
          this.fcrepoPromise = null;
          this.fcrepoResolve = null;
        } else {
          await sleep(2000);
          this.waitUntil();
        }
      });

    return this.fcrepoPromise;
  }

  async crawl(path, ldp = {}) {
    path = this.cleanPath(path);
    if (ldp[path]) return ldp;

    let response = await api.metadata({
      path,
      headers: {
        accept: api.GET_JSON_ACCEPT.COMPACTED,
        prefer: api.GET_PREFER.REPRESENTATION_OMIT_SERVER_MANAGED,
      },
    });
    if (response.data.statusCode !== 200) return ldp;

    response = this.graphToArray(response.data.body);
    ldp[path] = { graph: response.graph };

    // now get the full version to crawl
    response = await api.metadata({
      path,
      headers: {
        accept: api.GET_JSON_ACCEPT.COMPACTED,
      },
    });
    let { graph, context } = this.graphToArray(response.data.body);

    let firstNode = graphUtils.getGraphNode(
      graph,
      new RegExp(path + "$"),
      context
    );
    if (firstNode && graphUtils.isNodeOfType(firstNode, BINARY, context)) {
      let mimeType = graphUtils.getPropAsString(firstNode, MIME_TYPE, context);
      if (mimeType && !Array.isArray(mimeType)) mimeType = [mimeType];

      if (mimeType && mimeType.find((item) => item === "application/json")) {
        response = await api.get({ path });
        if (response.data.statusCode === 200) {
          try {
            ldp[path].body = JSON.parse(response.data.body);
          } catch (e) {
            logger.error("Error parsing json", path, e);
          }
        }
      }
    }

    if (ldp[path].graph.length === 0 && !ldp[path].body) {
      delete ldp[path];
    }

    for (let node of graph) {
      // clean local ids
      if (node["@id"]) node["@id"] = this.cleanPath(node["@id"]);
      let contains = graphUtils.getPropAsString(node, CONTAINS, context);
      if (!contains) continue;
      if (!Array.isArray(contains)) contains = [contains];

      for (let child of contains) {
        await this.crawl(child, ldp);
      }
    }

    return ldp;
  }

  graphToArray(graph) {
    if (typeof graph === "string") {
      graph = JSON.parse(
        graph.replaceAll(`"${config.fcrepo.host}/fcrepo/rest`, '"')
      );
    }
    let context = graph["@context"] || {};
    if (graph["@graph"]) graph = graph["@graph"];

    if (!Array.isArray(graph)) {
      if (Object.keys(graph).length === 0) {
        graph = [];
      } else {
        graph = [graph];
      }
    }
    return { context, graph };
  }

  cleanPath(path) {
    if (path.match(api.getConfig().fcBasePath)) {
      path = path.split(api.getConfig().fcBasePath)[1];
    }
    return path;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = new AppConfig();
