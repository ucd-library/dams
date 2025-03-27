import {
  BaseService, 
  // PayloadUtils
} from '@ucd-lib/cork-app-utils';
// import WorkflowStore from '../stores/WorkflowStore.js';

// let payloadUtils = new PayloadUtils({
//   idParts : ['path', 'text', 'itemId', 'bookId']
// });

class WorkflowService extends BaseService {

  constructor() {
    super();
    // this.store = WorkflowStore;

    this.FIN_SERVICE = 'svc:workflow';
  }

  async get(itemId) {
    // TODO
    // let ido = {path: id};

    // await this.request({
    //   url : pdf.clientMedia.pdf.manifest,
    //   checkCached : () => this.store.data.bookManifest.get(id),
    //   onUpdate : resp => {
    //     let payload = payloadUtils.generate(ido, resp);
    //     payload.src = pdf;
    //     payload.id = id;
    //     if( payload.payload ) {
    //       payload.payload = payload.payload.pages;
    //     }
    //     this.store.set(payload, this.store.data.bookManifest);
    //   }
    // })
  }

  async start(itemId) {
    // TODO
  }

  async getParams(itemId) {
    // TODO
  }

  async setParams(itemId, params) {
    // TODO
  }

}

const service = new WorkflowService();
export default service;