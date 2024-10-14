import {BaseModel} from '@ucd-lib/cork-app-utils';
import BookReaderService from '../services/BookReaderService.js';
import BookReaderStore from '../stores/BookReaderStore.js';

class BookReaderModel extends BaseModel {

  constructor() {
    super();

    this.store = BookReaderStore;
    this.service = BookReaderService;
      
    this.register('BookReaderModel');
  }

  getState() {
    return this.store.data.state;
  }

  /**
   * @method setPage
   * @description set the current page to render.  if 'double' view
   * is selected, sets the current page to the left most page
   * 
   * @param {Number} page 
   */
  setPage(page) {
    if( this.isAnimating() ) return;
    this.store.setState('selectedPage', page);
  }

  /**
   * @method setView
   * @description set the current view to render.  either 'single' or 'double'
   * 
   * @param {String} view 
   */
  setView(view) {
    if( this.isAnimating() ) return;
    this.store.setState('selectedView', view);
  }

  /**
   * @method setAnimating
   * @description are we currently animating between pages?
   * 
   * @param {Boolean} animating 
   */
  setAnimating(animating) {
    this.store.setState('animating', animating);
  }

  isAnimating() {
    return this.store.data.state.animating;
  }

  /**
   * @method setFullscreen
   * @description set the current fullscreen state
   * 
   * @param {Boolean} fullscreen 
   */
  setFullscreen(fullscreen) {
    this.store.setState('fullscreen', fullscreen);
  }

  setSelectedBook(id, record) {
    this.store.setState('selectedBook', id);
    if( record ) {
      this.loadBookFromItemRecord(record);
    } else {
      // TODO: load from client media model
      this.logger.error('no record provided to setSelectedBook. TODO: load from client media model');
    }
  }

  async loadBookFromItemRecord(record) {
    let id = record.clientMedia.id;
    let imageList = record.clientMedia?.mediaGroups?.find(item => item?.['@shortType'].includes('ImageList'));
    let pdf = record.clientMedia?.mediaGroups?.find(item => item?.fileFormatSimple === 'pdf');

    if( imageList ) {
      this.store.set(
        {id, payload: imageList.clientMedia.pages, state: this.store.STATE.LOADED, src: imageList}, 
        this.store.data.bookManifest
      );
    } else if( pdf ) {
      await this.service.loadPdfManifest(id, pdf);
    } else {
      this.logger.error('no valid media found for book', record.clientMedia.id);
      return;
    }

    let manifest = this.store.data.bookManifest.get(id);
    let index, image, ocrUrl, imageUrl, height, width, originalHeight, originalWidth;
    let bookViewData = {
      id,
      totalHeight : 0,
      pages : null
    }

    bookViewData.pages = manifest.payload.map(page => {
      index = page.page-1;
      image = page[page.ocr.imageSize];
      ocrUrl = page.ocr.url;
      imageUrl = image.url;

      height = parseInt(image.size.height);
      width = parseInt(image.size.width);
      originalHeight = parseInt(page.original.size.height);
      originalWidth = parseInt(page.original.size.width);
      return {height, width, imageUrl, ocrUrl, index, originalHeight, originalWidth};
    });

    this.store.setState('bookViewData', bookViewData);
  }

  async getOcrData(page) {
    return this.service.getOcrData(page.ocrUrl);
  }
}

const model = new BookReaderModel();
export default model;