const definition = require('./definition.js');

class ClientMedia {

  constructor(id, graph) {
    this.id = id;

    if( graph.node ) graph = graph.node; 
    if( graph['@graph'] ) graph = graph['@graph'];
    
    this.graph = graph;
    this.index = [];

    for( let node of graph ) {
      this.index[node['@id']] = node;
      if( !node._ ) node._ = {};
      node._.clientMedia = {};

      if( node['@id'] == id ) this.root = node;
    }

    if( !this.root ) {
      throw new Error('Root '+id+' not found in graph');
    }

    // parse() populates the mediaGroups array
    this.mediaGroups = [];
    this.parse();

    for( let i = 0; i < this.mediaGroups.length; i++ ) {
      let nodes = this.mediaGroups[i];

      // filter out nodes that don't have displayType or fileType
      let displayNodes = nodes.filter(node => node._.clientMedia.displayTypeIndex >= -1 && node._.clientMedia.fileTypeIndex >= -1);

      displayNodes.sort((a, b) => {
        let aCm = a._.clientMedia;
        let bCm = b._.clientMedia;

        if( aCm.displayTypeIndex < bCm.displayTypeIndex ) return -1;
        if( aCm.displayTypeIndex > bCm.displayTypeIndex ) return 1;

        if( aCm.fileTypeIndex < bCm.fileTypeIndex ) return -1;
        if( aCm.fileTypeIndex > bCm.fileTypeIndex ) return 1;

        return 0;
      });

      let mediaGroup = {
        nodes : displayNodes,
        display : null,
        downloads : [],
        indexedDownloads : [],        
      }
      this.mediaGroups[i] = mediaGroup;

      if( displayNodes.length ) {
        let clientMedia = displayNodes.filter(node => node.clientMedia && Object.keys(node.clientMedia).length > 0)[0];
        if( clientMedia ) {
          // TODO for now use first node with clientMedia, later need support for multiple media groups
          mediaGroup.display = clientMedia;
        } else {
          mediaGroup.display = displayNodes[0];
        }
      }

      displayNodes.forEach(node => {
        if( node._.clientMedia.displayType.match(/list$/i) ) {
          mediaGroup.indexedDownloads.push(node);
        }
        mediaGroup.downloads.push(node);
      });

    }

    // filter out entire mediaGroup if it doesn't have displayType or fileType
    this.mediaGroups = this.mediaGroups.filter(m => m.display);
  }

  getNode(node) {
    if( typeof node === 'string' ) {
      return this.index[node];
    }
    return this.index[node['@id']];
  }

  parse(node, crawled={}) {
    if( !node ) {
      node = this.root;
      // check if root node is media
      let mediaType = this.getMediaType(node);
      if( mediaType ) {
        this._crawlMedia(node);
        return;
      }
    }

    // make sure no cycles
    if( crawled[node['@id']] ) return;
    crawled[node['@id']] = true;

    definition.MEDIA_LINK.forEach(link => {
      if( !node[link] ) return;
      let nodes = Array.isArray(node[link]) ? node[link] : [node[link]];

      for( let child of nodes ) {
        this._crawlMedia(child);
      }
    });

    definition.CRAWL_LINKS.forEach(link => {
      if( !node[link] ) return;
      let nodes = node[link];
      for( let child of nodes ) {
        this.parse(child, crawled);
      }
    });
  }

  /**
   * @method _crawlMedia
   * @description given a associateMedia root node, crawl all child links
   * for related media and add to array
   * 
   * @param {Object|String} node node we are crawling
   * @param {Array} media array of all associated media for root media
   * @param {Object} crawled bookkeeping to make sure we don't crawl twice
   * @returns 
   */
  _crawlMedia(node, media, crawled={}) {
    node = this.getNode(node);

    if( !node ) return; // TODO remove, hack for /item/ark:/87293/d3tq5rj7p where jpg media _getNode() returns null object, is item structure wrong?

    if( !media ) {
      media = [];
      this.mediaGroups.push(media);
    }

    // make sure no cycles
    if( crawled[node['@id']] ) return;
    crawled[node['@id']] = true;

    // check if node is of media type
    let mediaType = this.getMediaType(node);
    if( mediaType ) {
      this.setCmTypes(node, mediaType);
      media.push(node);
    }

    // crawl child media links
    definition.MEDIA_LINK.forEach(link => {
      if( !node[link] ) return;
      let children = node[link];

      for( let child of children ) {
        this._crawlMedia(child, media, crawled);
      }
    });
  }

  /**
   * @method setCmTypes
   * @description some bookkeeping for sorting later on the various client media types and
   * index within display order
   * 
   * @param {Object} node 
   * @param {String} mediaType 
   */
   setCmTypes(node, mediaType) {
    node._.clientMedia.mediaType = mediaType;
    node._.clientMedia.displayType = this.getDisplayType(node);
    node._.clientMedia.fileType = this.getFileType(node, node._.clientMedia.displayType);

    node._.clientMedia.displayTypeIndex = definition.DISPLAY_ORDER.DISPLAY_TYPES.indexOf(node._.clientMedia.displayType);
    
    let fileTypeOrdering = definition.DISPLAY_ORDER.FILE_TYPES[node._.clientMedia.displayType];
    if( fileTypeOrdering ) {
      node._.clientMedia.fileTypeIndex = fileTypeOrdering.indexOf(node._.clientMedia.fileType);
    } else {
      node._.clientMedia.fileTypeIndex = 0;
    }
  }

  /**
   * @method getMediaType
   * @description get the media type for a node.  The media type is the actual
   * rdf @type string.
   * 
   * @param {Object} node 
   * @returns {String}
   */
  getMediaType(node) {
    let type = definition.MEDIA_TYPES.find(type => node['@type'].includes(type)) || '';
    return type.split(/(#|\/)/).pop();
  }

  /**
   * @method getDisplayType
   * @description get the display type for node.  Often this is a shorten
   * (and cleaned) version of the mediaType, but can fall back on hasMimeType
   * and encodingFormat
   * 
   * @param {Object} node  
   * @returns {String}
   */
  getDisplayType(node) {
    let mediaType = this.getMediaType(node);
    if( mediaType ) {
      let displayType = mediaType.replace(/(object|streaming)/ig, '').toLowerCase();
      if( displayType !== 'media' ) return displayType;
    }

    if( node.hasMimeType ) {
      parts = node.hasMimeType.split('/');
      if( parts.length ) return parts[0].toLowerCase();
    }

    if( node.encodingFormat ) {
      parts = node.encodingFormat.split('/');
      if( parts.length ) return parts[0].toLowerCase();
    }

    return '';
  }

  /**
   * @method getFileType
   * @description get the fileType for a node. this is used to sort within mediaTypes.
   * Often the file type is the file extension.  However this can be the hasMimeType
   * or encodingFormat mime types second param (after slash).  If the node is a list
   * media type, the first node in the hasPart list is used.
   * 
   * @param {*} node 
   * @param {*} displayType 
   * @returns 
   */
  getFileType(node, displayType) {
    // crawl for first item in list
    if( displayType.match('list') ) {

      let found = false;
      for( let link of definition.CRAWL_LINKS ) {
        if( !node[link] ) continue;
        if( !Array.isArray(node[link]) ) node[link] = [node[link]]; // make sure list is an array, hack for ark:/87287/d7xs9t with single hasPart
        node = this.getNode(node[link][0]);
        if( node ) {
          found = true;
          break;
        }
      }

      if( !found ) return '';
    }

    let parts;

    if( node.fileFormat ) {
      parts = node.fileFormat.split('/');
      if( parts.length ) return parts[1];
    }

    if( node.hasMimeType ) {
      parts = node.hasMimeType.split('/');
      if( parts.length ) return parts[1];
    }

    if( node.encodingFormat ) {
      parts = node.encodingFormat.split('/');
      if( parts.length ) return parts[1];
    }

    parts = node['@id'].split('/').pop().split('.');
    if( parts.length > 1 ) return parts.pop();

    if( node.filename ) {
      parts = node.filename.split('.');
      if( parts.length > 1 ) return parts.pop();
    }

    return '';
  }

}

module.exports = ClientMedia;