import {BaseModel} from '@ucd-lib/cork-app-utils';
import CollectionImportService from '../services/CollectionImportService.js';
import CollectionImportStore from '../stores/CollectionImportStore.js';

class CollectionImportModel extends BaseModel {

  constructor() {
    super();

    this.store = CollectionImportStore;
    this.service = CollectionImportService;
      
    this.register('CollectionImportModel');
  }

  list() {
    return this.service.list();
  }

  start(collection) {
    return this.service.start(collection);
  }

}

const model = new CollectionImportModel();
export default model;