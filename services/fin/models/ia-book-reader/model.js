const {dataModels, logger, gc, config} = require('@ucd-lib/fin-service-utils');
const schema = require('./schema.json');
const clone = require('clone');
const {gcs} = gc;
const {FinEsDataModel} = dataModels;

class IaBookReader extends FinEsDataModel {

  constructor() {
    super('ia-book-reader');
    this.schema = schema;
    this.transformService = 'ia-book-reader-transform';
    this.expectGraph = false;
  }

  is(id) {
    if( id.match(/^\/item\//) ) return true;
    return false;
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
  async search(searchDocument, options={debug:false}, index) {
    if( !index ) index = this.readIndexAlias;
  }

  async update(json, index) {
    if( !index ) index = this.writeIndexAlias;

    // check the sha of the manifest to see if we need to update
    let results = await this.esSearch({
      from: 0,
      size: 1,
      query : {
        bool : {
          filter : [
            {term : {bookId : json.path}},
          ]
        }
      }
    }, {}, index);

    // if we have a result, check the hash
    if( results.hits.total.value > 0 ) {
      let page = results.hits.hits[0]._source;
      if( page && page._ && page._.iaManifestHash === json.iaManifestHash ) {
        logger.info(`ES Indexer skipping ${this.modelName} book update: ${json.path}.  Manifest hash has not changed.`);
        return {message: `ES Indexer skipping ${this.modelName} book update: ${json.path}.  Manifest hash has not changed.`};
      }
    }

    // fetch new data
    json.iaManifest = await this.fetchGcsData(json.iaManifest);

    // remove old pages
    await this.remove(json.path, index);

    let roles = await this.getAccessRoles({
      '@id' : json.archivalGroup
    });

    // index new pages
    let dbResponses = [];
    for( let page of json.iaManifest.data ) {
      page['@id'] = page.path.replace(/^\/fcrepo\/rest/, '');
      delete page.path;

      page.bookId = json.path;
      page.archivalGroup = json.archivalGroup;
      page.roles = roles;

      // set page metadata
      if( json._ ) {
        page._ = clone(json._);
      } else {
        page._ = {};
      }
      page._.iaManifestHash = json.iaManifestHash;

      let response = await this.client.index({
        index,
        id : page['@id'],
        body : page
      });

      dbResponses.push(response);
    }

    return {updates: dbResponses};
  }

  async remove(id, index) {
    if( !index ) index = this.writeIndexAlias;

    logger.info(`ES Indexer removing ${this.modelName} book: ${id} pages`);
    return await this.client.deleteByQuery({
      index,
      body : {
        query : {
          bool : {
            filter : [
              {term : {bookId : id}}
            ]
          }
        }
      }
    });
  }

  /**
   * @method fetchGcsData
   * @description given a workflow ia reader manifest, fetch the djvu page contents
   * 
   * @param {*} manifestUrl 
   * @returns 
   */
  async fetchGcsData(manifestUrl) {
    let iaManifest = await fetch(manifestUrl);
    iaManifest = await iaManifest.json();

    let fetchAll = new ParallelFetch(
      iaManifest.data.map(item => config.gateway.host+item.path.replace(/\.jpg$/, '.djvu'))
    );
    let pageData = await fetchAll.run();
    
    pageData.forEach((content, i) => {
      iaManifest.data[i].content = content;
    });

    return iaManifest;
  }

  async get() {
    throw new Error('not implemented for ia-book-reader');
  }

  async all() {
    throw new Error('not implemented for ia-book-reader');
  }

}

class ParallelFetch {

  constructor(urls, max=3) {
    this._max = max;
    this._urls = urls;
    this._cIndex = 0;
    this._results = [];
    
    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  run() {
    for( let i = 0; i < this._max; i++ ) {
      if( i === this._urls.length ) break;
      this._add(this._urls.shift());
    }

    return this._promise;
  }

  async _add(url) {
    this._cIndex++;
    let urlData = await fetch(url);
    this._results.push(await urlData.text());
    
    // check done
    if( this._results.length === this._urls.length ) {
      this._resolve(this._results);
    } else if( this._results.length < this._urls.length ) {
      this._add(this._urls.shift());
    }
  }
}

module.exports = new IaBookReader();