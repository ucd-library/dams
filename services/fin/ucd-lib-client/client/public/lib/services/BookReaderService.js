import {BaseService, PayloadUtils} from '@ucd-lib/cork-app-utils';
import BookReaderStore from '../stores/BookReaderStore.js';

let payloadUtils = new PayloadUtils({
  idParts : ['path', 'text', 'itemId', 'bookId']
});

class BookReaderService extends BaseService {

  constructor() {
    super();
    this.store = BookReaderStore;

    this.FIN_SERVICE = 'svc:gcs';
  }

  async loadPdfManifest(id, pdf) {
    let ido = {path: id};
    id = payloadUtils.getKey(ido);

    await this.request({
      url : pdf.clientMedia.pdf.manifest,
      checkCached : () => this.store.data.pdfManifest.get(id),
      onUpdate : resp => {
        let payload = payloadUtils.generate(ido, resp);
        payload.src = pdf;
        this.store.set(payload, this.store.data.bookManifest);
      }
    })
  }

  async getOcrData(url, itemId, page) {
    let ido = {path: url};
    let id = payloadUtils.getKey(ido);

    await this.request({
      url,
      checkCached : () => this.store.data.ocrData.get(id),
      onUpdate : resp => {
        resp.payload = this.model.parsePageWords(resp.payload, itemId, page);
        this.store.set(payloadUtils.generate(ido, resp), this.store.data.ocrData)
      }
    })

    return this.store.data.ocrData.get(id);
  }

  async search(itemId, bookId, query) {
    let ido = {itemId, bookId, text: query};
    let id = payloadUtils.getKey(ido);

    let pageLookupCache = {};

    await this.request({
      url : '/api/page-search/ia',
      qs : {
        item_id : bookId,
        q : query
      },
      checkCached : () => {
        let searchResults = this.store.data.state.searchResults;
        if( searchResults?.id === id ) {
          return searchResults;
        }
        return this.store.data.state.searchResults;
      },
      onUpdate : resp => {    
        if( resp.payload ) {
          let byPage = {};

          // update matches to be matches[0] for entire array
          (resp.payload.matches || []).forEach(match => {
            let text = match.text;
            if( Array.isArray(match.par) && match.par.length > 0 ) {
              match.par = match.par[0];
            }
            match.par.text = text;
            match.par.regex = (text.match(/{{{(.*?)}}}/g) || [])
              .map(str => str.replace('{{{', '').replace('}}}', ''))
              .map(str => new RegExp(str, 'gi'));

            if( match.par.boxes ) delete match.par.boxes;

            if( !byPage[match.par.page-1] ) {
              byPage[match.par.page-1] = [];
              pageLookupCache[match.par.page] = this.model.getBookViewPage(itemId, match.par.page);
            }
            byPage[match.par.page-1].push(match.par);
          });
  
          resp.payload = byPage;
        }    
        this.store.setState('searchResults', payloadUtils.generate(ido, resp));
      }
    });

    return this.store.data.state.searchResults;
  }

}

const service = new BookReaderService();
export default service;