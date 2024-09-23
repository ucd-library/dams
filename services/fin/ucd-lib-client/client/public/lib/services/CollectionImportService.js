import {BaseService} from '@ucd-lib/cork-app-utils';
import CollectionImportStore from '../stores/CollectionImportStore.js';
import payload from '../utils/payload.js';

class CollectionImportService extends BaseService {

  constructor() {
    super();
    this.store = CollectionImportStore;
    this.basePath = '/api/collection-import';
  }

  async list() {
    let id = 'list';

    await this.checkRequesting(
      id, this.store.data.list,
      () => this.request({
        url : this.basePath,
        onUpdate : this.store.set(id, this.data.list)
      })
    );

    return this.store.data.list.get(id);
  }

}

const service = new CollectionImportService();
export default service;