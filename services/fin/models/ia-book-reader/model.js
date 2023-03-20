const {ElasticSearchModel, logger, gc, config} = require('@ucd-lib/fin-service-utils');
const {gcs} = gc;

class IaBookReader extends ElasticSearchModel {

  constructor() {
    super('ia-book-reader');
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
    

    let roles = await this.getEsRoles({
      '@id' : json.archivalGroup
    });

    for( let page of json.iaManifest.data ) {
      page['@id'] = page.path.replace(/^\/fcrepo\/rest/, '');
      delete page.path;

      page.bookId = json.path;
      page.archivalGroup = json.archivalGroup;
      page.roles = roles;

      await this.client.index({
        index,
        id : page['@id'],
        body : page
      });
    }
  }

  async remove(id, index) {
    if( !index ) index = this.writeIndexAlias;

    logger.info(`ES Indexer removing ${this.moduleName} book: ${id} pages`);
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

  async checkMd5(id, index) {
    let results = this.esSearch(
      {
        from: 0,
        size: 1,
        query: {
          bool : {
            should : [
              {term : {'@graph.identifier.raw' : id.replace(this.pathRegex, '')}},
              {term: {'@graph.@id': id}}
            ]
          }
        }
      }, 
      {_source_excludes},
      index
    )
  }

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