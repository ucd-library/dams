import {BaseStore, LruStore} from '@ucd-lib/cork-app-utils';

class BookReaderStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      state : {
        selectedPage : 0,
        selectedView : 'double',
      },
      bookManifest : new LruStore({name: 'bookreader.manifest', maxSize: 10}),
      ocrData : new LruStore({name: 'bookreader.ocr', maxSize: 50})
    };
    this.events = {
      BOOKREADER_STATE_UPDATE: 'bookreader-state-update'
    };
  }

  setState(prop, value) {
    this.data.state[prop] = value;
    this.emit(this.events.BOOKREADER_STATE_UPDATE, this.data.state);
  }

}

const store = new BookReaderStore();
export default store;