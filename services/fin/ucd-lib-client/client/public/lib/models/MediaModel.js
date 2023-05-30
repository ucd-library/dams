const {BaseModel} = require('@ucd-lib/cork-app-utils');
const config = require('../config');
const utils = require('../utils/index');
const MediaService = require('../services/MediaService');
const MediaStore = require('../stores/MediaStore');

const IMAGE_LIST = 'http://digital.ucdavis.edu/schema#ImageList';
const IMAGE_LIST_360 = 'http://digital.ucdavis.edu/schema#ImageList360';

class MediaModel extends BaseModel {
  
  constructor() {
    super();

    this.TYPES = {
      IMAGE_LIST, IMAGE_LIST_360
    };

    this.service = MediaService;
    this.store = MediaStore;

    this.register('MediaModel');
  }

  /**
   * @method downloadMediaZip
   * @description save a collections display data
   * 
   * @param {String} name optional name for archive
   * @param {Array} urls array of fcrepo image urls to download
   * 
   * @returns {Promise} resolves to api response
   */
  async downloadMediaZip(name='', urls=[]) {
    return await this.service.downloadMediaZip(name, urls);
  }

  async getManifest(url) {
    let state = this.store.data.manifest[url];

    if( !state ) {
      await this.service.getManifest(url);
    } else if( state.state === this.store.STATE.LOADING ) {
      await state.request;
    } 

    return this.store.data.manifest[url];
  }


}

module.exports = new MediaModel();