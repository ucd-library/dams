const config = require('../config.js');
const { logger } = require('./logger.js');

/**
 * @class CaskClient
 * @description Thin HTTP client for the CaskFS service this app's
 * fcrepo-middleware shim resolves against (see docs/PORT-PLAN.md Phase 2).
 * CaskFS's ACL is username-keyed (config.cask.user), not Keycloak-role-keyed
 * - see docs/PORT-PLAN.md Phase 1 and dams-deployment/cmds/provision-cask-dev-access.sh
 * for the full explanation - so every request presents the same fixed
 * `x-user` identity regardless of the calling browser session.
 *
 * ARK-to-path resolution: CaskFS paths are not derived from the ARK (see
 * argonath's docs/cask-conventions.md "Item Identity") - the ARK only
 * exists as RDF data (a file's JSON-LD sidecar `@id`/`ark` property).
 * `resolvePath()` uses CaskFS's `/api/find?subject=` RDF-graph lookup
 * (already implemented server-side, unlike `/api/ld` which still 404s) to
 * go from an ARK-shaped subject URI to the file that carries it. This is a
 * working assumption pending confirmation with whoever owns the argonath
 * ingestion pipeline (see docs/PORT-PLAN.md's "Critical discovery"): it
 * assumes ingestion mints an RDF subject equal to the full fcrepo-style
 * path this app is resolving (item ark, or ark+child-binary-path), not just
 * the bare item ark.
 */
class CaskClient {

  constructor() {
    this.baseUrl = `${config.cask.url}${config.cask.pathPrefix}`;
  }

  /**
   * @method headers
   * @description Build the `x-user` header CaskFS's header-auth middleware
   * expects, presenting this server's fixed CaskFS identity.
   *
   * @returns {Object}
   */
  headers() {
    return { 'x-user': JSON.stringify({ username: config.cask.user }) };
  }

  /**
   * @method find
   * @description Query CaskFS's RDF graph for files matching the given
   * criteria (see CaskFS's `GET /api/find`).
   *
   * @param {Object} opts
   * @param {String} [opts.subject] subject URI to filter by
   * @param {Number} [opts.limit] max results to return
   *
   * @returns {Promise<Object>} `{totalCount, results}`
   */
  async find(opts={}) {
    let query = new URLSearchParams();
    if( opts.subject ) query.set('subject', opts.subject);
    if( opts.limit ) query.set('limit', String(opts.limit));

    let resp = await fetch(`${this.baseUrl}/api/find?${query}`, { headers: this.headers() });
    if( !resp.ok ) {
      throw new Error(`CaskFS find failed (${resp.status}): ${await resp.text()}`);
    }
    return resp.json();
  }

  /**
   * @method resolvePath
   * @description Resolve an RDF subject URI (an ARK, or an ARK plus a
   * child-binary path segment - see class doc) to the CaskFS file path that
   * carries it.
   *
   * @param {String} subject
   *
   * @returns {Promise<String|null>} the resolved file path, or null if no
   * file carries this subject
   */
  async resolvePath(subject) {
    let { results } = await this.find({ subject, limit: 1 });
    return results?.[0]?.filepath || null;
  }

  /**
   * @method getMetadata
   * @description Fetch CaskFS file metadata (`GET /api/fs/{path}?metadata=true`),
   * including the resolved on-disk CAS path (`fullPath`) the IIIF direct-mount
   * proxy target needs.
   *
   * @param {String} filePath CaskFS file path (as returned by `resolvePath()`)
   *
   * @returns {Promise<Object>}
   */
  async getMetadata(filePath) {
    let resp = await fetch(`${this.baseUrl}/api/fs${filePath}?metadata=true`, { headers: this.headers() });
    if( !resp.ok ) {
      throw new Error(`CaskFS metadata fetch failed (${resp.status}): ${await resp.text()}`);
    }
    return resp.json();
  }

  /**
   * @method fileUrl
   * @description Build the CaskFS URL for streaming a file's content
   * (`GET /api/fs/{path}`), for proxying non-IIIF binary/metadata reads.
   *
   * @param {String} filePath CaskFS file path
   *
   * @returns {String}
   */
  fileUrl(filePath) {
    return `${this.baseUrl}/api/fs${filePath}`;
  }

}

module.exports = new CaskClient();
