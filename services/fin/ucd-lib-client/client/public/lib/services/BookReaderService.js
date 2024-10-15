import {BaseService, PayloadUtils} from '@ucd-lib/cork-app-utils';
import BookReaderStore from '../stores/BookReaderStore.js';

let payloadUtils = new PayloadUtils({
  idParts : ['path', 'text', 'itemId']
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

  async getOcrData(url) {
    let ido = {path: url};
    let id = payloadUtils.getKey(ido);

    await this.request({
      url,
      checkCached : () => this.store.data.ocrData.get(id),
      onUpdate : resp => {
        this.store.set(payloadUtils.generate(ido, resp), this.store.data.ocrData)
      }
    })

    return this.store.data.ocrData.get(id);
  }

  async search(itemId, bookItemId, query) {
    let ido = {path: bookItemId, itemId, text: query};
    let id = payloadUtils.getKey(ido);

    await this.request({
      url : '/api/page-search/ia',
      qs : {
        item_id : bookItemId,
        q : query
      },
      checkCached : () => {
        let searchResults = this.store.data.state.searchResults;

        if( searchResults?.path !== bookItemId || searchResults?.text !== query ){
          this.store.setState('searchResults', null);
        }
        return this.store.data.state.searchResults;
      },
      onLoad: (result) => {
        // update matches to be matches[0] for entire array
        (result.body.matches || []).forEach(match => {
          match.par = match.par?.[0];
          if( match.par?.[0] ) delete match.par[0];
        });
        return result;
      },
      onUpdate : resp => {        
        this.store.setState('searchResults', payloadUtils.generate(ido, resp));

      }
    });

    return this.store.data.state.searchResults;
  }

}

const service = new BookReaderService();
export default service;