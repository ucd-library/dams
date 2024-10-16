import {BaseModel} from '@ucd-lib/cork-app-utils';
import BookReaderService from '../services/BookReaderService.js';
import BookReaderStore from '../stores/BookReaderStore.js';

class BookReaderModel extends BaseModel {

  constructor() {
    super();

    this.store = BookReaderStore;
    this.service = BookReaderService;
    this.service.model = this;
    this.xmlParser = new DOMParser();
      
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

  /**
   * @method setSearchActive
   * @description set the search to active (search overlay)
   * 
   * @param {Boolean} active 
   */
  setSearchActive(active) {
    this.store.setState('searchActive', active);
  }

  setSelectedBook(id, record) {
    this.clearSearch();
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
    let index, image, ocrUrl, imageUrl, height, width, originalHeight, originalWidth, scale;
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
      scale = width / originalWidth;
      return {height, width, imageUrl, scale, ocrUrl, index, originalHeight, originalWidth};
    });

    this.store.setState('bookViewData', bookViewData);
  }

  async getOcrData(page, itemId) {
    return this.service.getOcrData(page.ocrUrl, itemId, page.index);
  }

  async search(itemId, bookItemId, query) {
    this.clearSearch();
    return this.service.search(itemId, bookItemId, query);
  }

  async clearSearch() {
    this.store.setState('searchResults', null);
  }

  getSearchResults(itemId, page) {
    let searchResults = this.store.data.state.searchResults;
    if( !searchResults || searchResults.itemId !== itemId ) {
      return {results: [], itemId, page, text: ''};
    }

    let results = searchResults.payload[page];
    return {results: results || [], itemId, page, text: searchResults.text};
  }

  getBookViewPage(itemId, page) {
    let bookData = this.store.data.state.bookViewData
    if( !bookData || bookData?.id !== itemId ) {
      this.logger.error('could not find book data for page', itemId, page);
      return null;
    }

    let pageData = bookData.pages.find(i => i.index === page);
    if( !pageData ) {
      this.logger.error('could not find page data for page', itemId, page);
      return null;
    }

    return pageData;
  }

  parsePageWords(xml, itemId, page) {
    let xmlDoc = this.xmlParser.parseFromString(xml, "text/xml");
    let ocrData = [];

    // let o = xmlDoc.querySelector('OBJECT');
    // let height = parseInt(o.getAttribute('height'));
    // let width = parseInt(o.getAttribute('width'));

    let bookData = this.store.data.state.bookViewData
    if( !bookData || bookData?.id !== itemId ) {
      this.logger.error('could not find book data for page', itemId, page);
      return ocrData;
    }

    let pageData = bookData.pages.find(i => i.index === page);
    if( !pageData ) {
      this.logger.error('could not find page data for page', page, bookData);
      return ocrData;
    }

    let {scale} = pageData;

    xmlDoc.querySelectorAll('WORD').forEach(word => {
      var [left, bottom, right, top] = word
        .getAttribute('coords')
        .split(',')
        .map(v => parseInt(v));

      word = {
        // fullResBbox : {
        //   left : left * (1+scale),
        //   bottom : bottom * (1+scale),
        //   right : right * (1+scale),
        //   top : top * (1+scale)
        // },
        bbox: {left, bottom, right, top, scale},
        text : word.textContent
      }

      ocrData.push(word);
    });

    return ocrData
  }
}

const model = new BookReaderModel();
export default model;