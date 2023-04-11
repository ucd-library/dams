const {config} = require('@ucd-lib/fin-service-utils');
const ioUtils = require('@ucd-lib/fin-api/lib/io/utils.js');
const fetch = require('node-fetch');

const BINARY = 'http://fedora.info/definitions/v4/repository#Binary';
const ARCHIVAL_GROUP = 'http://fedora.info/definitions/v4/repository#ArchivalGroup';

const IA_READER_WORKFLOW = 'book-to-ia-reader';
const STREAMING_VIDEO_WORKFLOW = 'video-to-stream';

module.exports = async function(path, graph, headers, utils) {
  let item = {};

  let container = utils.get(path, graph);
  let gitsource = utils.getByType(ioUtils.TYPES.GIT_SOURCE, graph);

  if( !container ) {
    throw new Error('unknown container: '+path);
  }
  
  utils.init(item, container);  

  // if( !utils.isType(container, 'http://fedora.info/definitions/v4/repository#Resource') ) {
  //   throw new Error('invalid type');
  // }
  
  utils.ns({
    "ldp" : "http://www.w3.org/ns/ldp#",
    "fedora" : "http://fedora.info/definitions/v4/repository#",
    "fast": "http://id.worldcat.org/fast/",
    "lcna": "http://id.loc.gov/authorities/names/",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "schema": "http://schema.org/",
    "ucdlib": "http://digital.ucdavis.edu/schema#",
    "premis" : "http://www.loc.gov/premis/rdf/v1#",
    "ebucore" : "http://www.ebu.ch/metadata/ontologies/ebucore/ebucore#"
  });

  await utils.add({
    attr : 'name',
    value : ['schema', 'name']
  });

  await utils.add({
    attr : 'audio',
    value : ['schema', 'audio'],
    type: 'id'
  });

  await utils.add({
    attr : 'about',
    value : ['schema', 'about'],
    type : 'id'
  });

  await utils.add({
    attr : 'alternativeHeadline',
    value : ['schema', 'alternativeHeadline']
  });

  await utils.add({
    attr : 'associatedMedia',
    value : ['schema', 'associatedMedia'],
    type : 'id'
  });

  await utils.add({
    attr : 'caption',
    value : ['schema', 'caption'],
    type : 'id'
  });

  await utils.add({
    attr : 'contentSize',
    value : ['schema', 'contentSize']
  });

  await utils.add({
    attr : 'createdBy',
    value : ['fedora', 'createdBy']
  });

  await utils.add({
    attr : 'creator',
    value : ['schema', 'creator'],
    type : 'id'
  });

  await utils.add({
    attr : 'datePublished',
    value : ['schema', 'datePublished']
  });
  
  await utils.add({
    attr : 'description',
    value : ['schema', 'description']
  });

  await utils.add({
    attr : 'encodesCreativeWork',
    value : ['schema', 'encodesCreativeWork'],
    type : 'id'
  });

  await utils.add({
    attr : 'encodingFormat',
    value : ['schema', 'encodingFormat']
  });

  await utils.add({
    attr : 'fileFormat',
    value : ['ebucore', 'hasMimeType']
  });

  await utils.add({
    attr : 'filename',
    value : ['ebucore', 'filename']
  });

  await utils.add({
    attr : 'fileSize',
    value : ['premis', 'hasSize'],
    type : 'number'
  });

  await utils.add({
    attr : 'hasPart',
    value : ['schema', 'hasPart'],
    type : 'id'
  });

  await utils.add({
    attr : 'mainEntity',
    value : ['schema', 'mainEntity'],
    type : 'id'
  });

  await utils.add({
    attr : 'identifier',
    value : ['schema', 'identifier']
  });

  await utils.add({
    attr : 'image',
    value : ['schema', 'image'],
    type : 'id'
  });

  await utils.add({
    attr : 'isPartOf',
    value : ['schema', 'isPartOf'],
    type : 'id'
  });

  await utils.add({
    attr : 'keywords',
    value : ['schema', 'keywords']
  });

  await utils.add({
    attr : 'language',
    value : ['schema', 'inLanguage']
  });

  await utils.add({
    attr : 'lastModified',
    value : ['fedora', 'lastModified'],
    type : 'date'
  });

  await utils.add({
    attr : 'lastModifiedBy',
    value : ['fedora', 'lastModifiedBy']
  });

  await utils.add({
    attr : 'license',
    value : ['schema', 'license'],
    type : 'id'
  });

  await utils.add({
    attr : 'material',
    value : ['schema', 'material']
  });

  await utils.add({
    attr : 'parent',
    value : ['fedora', 'hasParent'],
    type : 'id'
  });

  // await utils.add({
  //   attr : 'contains',
  //   value : ['ldp', 'contains'],
  //   type : 'id'
  // });

  await utils.add({
    attr : 'position',
    value : ['schema', 'position']
  });

  await utils.add({
    attr : 'publisher',
    value : ['schema', 'publisher'],
    type : 'id'
  });

  await utils.add({
    attr : 'textIndexable',
    value : ['ucdlib', 'textIndexable'],
    type : 'boolean'
  });

  await utils.add({
    attr : 'thumbnailUrl',
    value : ['schema', 'thumbnailUrl'],
    type : 'id'
  });

  await utils.add({
    attr: 'transcript',
    value: ['schema', 'transcript'],
    type: 'id'
  });

  await utils.add({
    attr : 'video',
    value : ['schema', 'video'],
    type: 'id'
  });

  await utils.add({
    attr : 'videoFrameSize',
    value : ['schema', 'videoFrameSize']
  });

  await utils.add({
    attr : 'videoQuality',
    value : ['schema', 'videoQuality']
  });

  await utils.add({
    attr : 'workExample',
    value : ['schema', 'workExample'],
    type : 'id'
  });

  utils.stripFinHost(item);
  await utils.setImage(item);
  await utils.setIndexableContent(item);

  utils.setYearFromDate(item);

  item._ = {};
  if( !item.clientMedia ) {
    item.clientMedia = {};
  }

  utils.stripFinHost(headers)

  if( headers.link ) {
    if( headers.link['archival-group'] ) {
      item._['archival-group'] = headers.link['archival-group'].map(item => item.url);
      item._.graphId = item._['archival-group'][0];
    } else if( headers.link.type && 
      headers.link.type.find(item => item.rel === 'type' && item.url === ARCHIVAL_GROUP) ) {
      item._['archival-group'] = item['@id'];
      item._.graphId = item['@id'];
    }

    // check for completed ia reader workflow
    if( headers.link.workflow ) {
      let iaReaderSupport = headers.link.workflow.find(item => IA_READER_WORKFLOW === item.type);
      if( iaReaderSupport ) {
        let workflowInfo = await fetch(getGatewayUrl(iaReaderSupport.url));
        workflowInfo = await workflowInfo.json()

        item.clientMedia.iaReader = {
          manifest : config.fcrepo.root+item['@id'] + '/svc:gcs/'+workflowInfo.data.gcsBucket+'/'+workflowInfo.data.gcsSubpath+'/manifest.json'
        }
      }

      let streamVideoSupport = headers.link.workflow.find(item => STREAMING_VIDEO_WORKFLOW === item.type);
      if( streamVideoSupport ) {
        let workflowInfo = await fetch(getGatewayUrl(streamVideoSupport.url));
        workflowInfo = await workflowInfo.json()

        item.clientMedia.streamingVideo = {
          manifest : config.fcrepo.root+item['@id'] + '/svc:gcs/'+workflowInfo.data.gcsBucket+'/'+workflowInfo.data.gcsSubpath+'/playlist.m3u8'
        }
      }
    }
  }

  // only add if there is content
  if( Object.keys(item.clientMedia).length === 0 ) {
    delete item.clientMedia;
  }

  if( !item._.graphId && item['@type'].includes(BINARY) ) {
    item._.graphId = item['@id'];
  }

  if( gitsource ) {
    item._.source = {};
    for( let attr in gitsource ) {
      if( !attr.startsWith(ioUtils.GIT_SOURCE_PROPERTY_BASE) ) continue;
      item._.source[attr.replace(ioUtils.GIT_SOURCE_PROPERTY_BASE, '')] = gitsource[attr][0]['@value'] || gitsource[attr][0]['@id'];
    }
    item._.source.type = 'git';
  }

  graph = {
    '@id' : item._.graphId,
    '@graph' : [item],
  };
  delete item._.graphId;

  return graph;
}

function getGatewayUrl(url='') {
  if( url.startsWith('http') ) {
    url = new URL(url);
    return config.gateway.host+url.pathname+url.search;
  } else if( url.startsWith('/fcrepo/rest') ) {
    return config.gateway.host+url;
  }
  return config.gateway.host+'/fcrepo/rest'+url;
}