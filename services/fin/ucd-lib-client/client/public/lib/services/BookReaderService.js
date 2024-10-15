import {BaseService, PayloadUtils} from '@ucd-lib/cork-app-utils';
import BookReaderStore from '../stores/BookReaderStore.js';

let payloadUtils = new PayloadUtils({
  idParts : ['path', 'text']
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

  async search(itemId, query) {
    let ido = {path: itemId, text: query};
    let id = payloadUtils.getKey(ido);

    await this.request({
      url : '/api/page-search/ia',
      qs : {
        item_id : itemId,
        q : query
      },
      checkCached : () => this.store.data.search.get(id),
      onUpdate : resp => {
        this.store.set(payloadUtils.generate(ido, resp), this.store.data.search)
      }
    });

    return this.store.data.search.get(id);
  }

}

const service = new BookReaderService();
export default service;