import { BaseService } from '@ucd-lib/cork-app-utils';
import WorkflowStore from '../stores/WorkflowStore.js';
class WorkflowService extends BaseService {

  constructor() {
    super();
    this.store = WorkflowStore;

    this.FIN_SERVICE = '/svc:workflow';
  }

  async get(imageUrl) {
    return await this.request({
      url : imageUrl + this.FIN_SERVICE,
      checkCached : () => null,
      onLoading : null,
      onLoad : null,
      onError : null
    })
  }

  async start(imageUrl) {
    return await this.request({
      url : imageUrl + this.FIN_SERVICE + '/image-products',
      fetchOptions : {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ 'force': true })
      },
      checkCached : () => null,
      onLoading : null,
      onLoad : null,
      onError : null
    })
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