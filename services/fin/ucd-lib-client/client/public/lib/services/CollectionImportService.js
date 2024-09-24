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
    let ido = {action: 'list'};
    let id = payload.getKey(ido);

    await this.checkRequesting(
      id, this.store.data.list,
      () => this.request({
        url : this.basePath,
        onUpdate : resp => this.store.set(
          payload.generate(ido, resp), 
          this.store.data.list
        )
      })
    );

    return this.store.data.list.get(id);
  }

}

const service = new CollectionImportService();
export default service;
