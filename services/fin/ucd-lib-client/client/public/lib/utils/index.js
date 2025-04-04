// TODO: find external library
const LANG_MAP = {
  en: "English",
  fr: "French",
};

class Utils {
  itemDisplayType = {
    imageList: "Image List",
    brOnePage: "Book Reader - 1 Page",
    brTwoPage: "Book Reader - 2 Page",
  };

  getYearFromDate(date) {
    if (!date) return "";
    date = date + "";

    date = date.match(/^(\d{4})/);
    if (!date) return "";
    return date[0];
  }

  /**
   * @method asArray
   * @description given a record object, return a key as an array.
   * If the key doesn't exist, the array will be empty.  Singletons will
   * be converted to single item arrays and keys that are already arrays
   * will be return as is.
   *
   * @param {Object} item most likely a JSON-LD record
   * @param {String} key key/attribute to access in item/record
   *
   * @return {Array}
   */
  asArray(item = {}, key) {
    let value = item[key] || [];
    return Array.isArray(value) ? value : [value];
  }

  formatNumberWithCommas(num) {
    try {
      num = typeof num === 'string' ? parseFloat(num) : num;
    } catch(e) {}
    if( isNaN(num) ) return num;
    return new Intl.NumberFormat('en-US').format(num);
  }

  /**
   * @method findMediaFromId
   * @description given a record object, use the id (@id) to return
   * the entire object
   *
   * @param {Array} record most likely a JSON-LD record
   * @param {String} id @id to access in item/record
   *
   * @return {Array}
   */
  findMediaFromId(record = [], id) {
    if (!Array.isArray(record)) return false;
    return record.filter((element) => element["@id"] === id);
  }

  /**
   * @method getMediaType
   * @description given a record object, return that record's media Type
   * (eg) =>
   *  imagelist, imageobject, streamingvideo, etc.
   *
   * @param {Array} record most likely a JSON-LD record
   *
   * @return {String}
   */
  getMediaType(record) {
    if (record.error) return null;
    let types = record["@type"] || [];

    if (types.includes("http://digital.ucdavis.edu/schema#ImageList")) {
      return "ImageList";
    } else if (types.includes("http://schema.org/ImageObject")) {
      return "ImageObject";
    } else if (
      types.includes("http://digital.ucdavis.edu/schema#StreamingVideo")
    ) {
      return "StreamingVideo";
    } else if (types.includes("http://schema.org/VideoObject")) {
      return "VideoObject";
    } else if (types.includes("http://schema.org/AudioObject")) {
      return "AudioObject";
    } else if (types.includes("http://digital.ucdavis.edu/schema#BagOfFiles")) {
      return "BagOfFiles";
    }

    if( record.fileFormat?.includes('image') && record.clientMedia?.images ) return "ImageObject";
    
    return null;
  }

  getThumbnailFromClientMedia(clientMedia={}) {
    let thumbnailUrl = "";
    let graph = clientMedia.graph;

    if( !clientMedia.mediaGroups ) return thumbnailUrl;

    for (const mediaGroup of clientMedia.mediaGroups) {
      if (mediaGroup.clientMedia?.images?.medium?.url) {
        thumbnailUrl = mediaGroup.clientMedia.images.medium.url;
        continue;
      }

      let mediaType = this.getMediaType(mediaGroup);
      if (mediaType === "ImageObject") {
        thumbnailUrl = "/fcrepo/rest" + mediaGroup["@id"];
      } else if (mediaType === "ImageList") {
        let firstImage = graph.filter(
          (g) => parseInt(g.position) === 1 && g.clientMedia
        )[0];
        thumbnailUrl = firstImage?.clientMedia?.images?.medium?.url;
      } else if (mediaType === "VideoObject") {
        // pull image from root node if exists
        let rootNode = graph.filter((g) => g["@id"] === clientMedia["id"])[0];
        if (rootNode) {
          thumbnailUrl = "/fcrepo/rest" + rootNode.image?.["@id"];
        }
      }
    }

    return thumbnailUrl;
  }

  getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  /**
   * @method getLanguage
   * @description given a language short char code, return nice label
   *
   * @param {String} lng language shot code
   *
   * @returns {String}
   */
  getLanguage(lng) {
    return LANG_MAP[lng];
  }

  countMediaItems(mediaObj) {
    if (!mediaObj) return false;
    let count = 0;
    for (let type in mediaObj) {
      if (type === "imageList") {
        mediaObj.imageList.forEach((item) => (count += item.hasPart.length));
      } else {
        count += mediaObj[type].length;
      }
    }
    return count;
  }

  flattenMediaList(mediaObj) {
    let array = [];

    Object.keys(mediaObj).forEach((key) => {
      mediaObj[key].forEach((element) => {
        // TODO: We don't really want to include the streaming video as a download option
        // Should we still include it on the thumbnails?
        //if ( this.getMediaType(element) !== 'StreamingVideo' ) {
        // Check and make sure you're only looping hasParts that belong to imageLists
        // We don't care about video hasParts right here, because these are just thumbnails
        if (element.hasPart && this.getMediaType(element) === "ImageList") {
          element.hasPart.forEach((el) => {
            array.push(el);
          });
        } else {
          array.push(element);
        }
        //}
      });
    });

    return array;
  }

  /**
   * @method getImages
   * @description given a record media object, get the media object images
   *
   * @return {Array}
   */
  getImages(mediaObj) {
    let array = [];

    for (let type in mediaObj) {
      if (type === "image") {
        array = array.concat(mediaObj[type]);
      } else if (type === "imageList") {
        array = array.concat(...mediaObj[type].map((item) => item.hasPart));
      }
    }

    return array;
  }

  organizeMediaList(mediaListArray) {
    return mediaListArray.sort((a, b) => {
      if (a.position > b.position) return 1;
      if (a.position < b.position) return -1;
      return 1;
    });
  }

  buildIaReaderPages(hasParts, clientMediaIndex) {
    let pages = [];
    if( !Array.isArray(hasParts) ) hasParts = [hasParts];
    hasParts.forEach((part, index) => {
      let record = clientMediaIndex[part["@id"]];

      // TODO some of the index graphs don't have clientMedia, so some pages missing
      if (!record?.clientMedia) {
        console.error("no clientMedia images for ", record);
        return;
      }
      let page = record.clientMedia.images;
      page.page = parseInt(record.position);
      pages.push(page);
    });

    pages.sort((a, b) => {
      if (a.page > b.page) return 1;
      if (a.page < b.page) return -1;
      return 1;
    });

    return { pages };
  }

  /**
   * @method getAppConfigCollectionGraph
   * @description given an id, get app_config collection graph if exists, or hit the API
   * 
   * @param {String} id
   * @param {Object} fcAppConfigModel reference to model
   */
  async getAppConfigCollectionGraph(id, fcAppConfigModel) {
    // let savedData = APP_CONFIG.fcAppConfig[`/application/ucd-lib-client${id.replace('/collection', '')}.jsonld.json`];
    // if( savedData ) return savedData;
    let savedData;
    try {
      savedData = await fcAppConfigModel.getCollectionAppData(id);  
    } catch( error ) {
      console.warn('Error getting app config collection graph for ' + id, error);
    }
    if( savedData && savedData.body ) return JSON.parse(savedData.body);
    
    return null;
  }

  /**
   * @method getAppConfigItemGraph
   * @description given an id, get app_config collection graph if exists, or hit the API
   * 
   * @param {String} id
   * @param {Object} fcAppConfigModel reference to model
   */
  async getAppConfigItemGraph(id, fcAppConfigModel) {
    // let savedData = APP_CONFIG.fcAppConfig[`/application/ucd-lib-client${id.replace('/item', '')}.jsonld.json`];
    // if( savedData ) return savedData;
    let savedData;
    try {
      savedData = await fcAppConfigModel.getItemAppData(id);  
    } catch( error ) {
      console.warn('Error getting app config item graph for ' + id, error);
    }
    if( savedData && savedData.body ) return JSON.parse(savedData.body);
    
    return null;     
  }  

  /**
   * @method getSubjectUrl
   * @description given a subject string, build search url 
   * 
   * @param {Object} recordModel
   * @param {String} subject
   * @returns {String} search url for subject
   */
  getSubjectUrl(recordModel, subject) {
    let searchDocument = recordModel.emptySearchDocument();
    let subjectFacet = '@graph.subjects.name';
    recordModel.appendKeywordFilter(searchDocument, subjectFacet, subject);
    return '/search/'+recordModel.searchDocumentToUrl(searchDocument);
  }

  /**
   * @method getCreatorUrl
   * @description given a creator string, build search url 
   * 
   * @param {Object} recordModel
   * @param {String} creator
   * @returns {String} search url for creator
   */
  getCreatorUrl(recordModel, creator) {
    let searchDocument = recordModel.emptySearchDocument();
    let creatorFacet = '@graph.creator.name';
    recordModel.appendKeywordFilter(searchDocument, creatorFacet, creator);
    return '/search/'+recordModel.searchDocumentToUrl(searchDocument);
  }
}

module.exports = new Utils();
