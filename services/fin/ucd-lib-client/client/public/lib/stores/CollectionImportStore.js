import {BaseStore, LruStore} from '@ucd-lib/cork-app-utils';

class CollectionImportStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      list : new LruStore({name: 'collection-import-list', max: 1}),
    };
    this.events = {};
  }

}

const store = new CollectionImportStore();
export default store;