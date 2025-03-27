import {BaseModel} from '@ucd-lib/cork-app-utils';
import WorkflowService from '../services/WorkflowService.js';
// import WorkflowStore from '../stores/WorkflowStore.js';

class WorkflowModel extends BaseModel {

  constructor() {
    super();

    // this.store = WorkflowStore;
    this.service = WorkflowService;
    this.service.model = this;
      
    this.register('WorkflowModel');
  }

  async get(itemId) {
    return this.service.get(itemId);
  }

  async start(itemId) {
    return this.service.start(itemId);
  }

  async getParams(itemId) {
    return this.service.getParams(itemId);
  }

  async setParams(itemId, params) {
    return this.service.setParams(itemId, params);
  }

}

const model = new WorkflowModel();
export default model;