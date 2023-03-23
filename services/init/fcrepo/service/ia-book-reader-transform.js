const {config, RDF_URIS, gc} = require('@ucd-lib/fin-service-utils');
const fetch = require('node-fetch');
const {gcs} = gc;

const IA_READER_WORKFLOW = 'book-to-ia-reader';

module.exports = async function(path, graph, headers, utils) {

  let archivalGroup = '';
  let iaManifest = null;
  let iaManifestHash = null;
  let item = {};

  let container = utils.get(path, graph);
  utils.init(item, container);  
  utils.stripFinHost(item);
  utils.stripFinHost(headers);

  if( headers.link ) {
    if( headers.link['archival-group'] ) {
      archivalGroup = headers.link['archival-group'].map(item => item.url)[0];
    } else if( headers.link.type && 
      headers.link.type.find(item => item.rel === 'type' && item.url === RDF_URIS.TYPES.ARCHIVAL_GROUP) ) {
      archivalGroup = item['@id'];
    }

    // check for completed ia reader workflow
    if( headers.link.workflow ) {
      let iaReaderSupport = headers.link.workflow.find(item => IA_READER_WORKFLOW === item.type);
      if( iaReaderSupport ) {
        let workflowInfo = await fetch(config.gateway.host+config.fcrepo.root+iaReaderSupport.url);
        workflowInfo = await workflowInfo.json();

        iaManifest = config.gateway.host+config.fcrepo.root+item['@id'] + '/svc:gcs/' + workflowInfo.data.gcsBucket+'/'+workflowInfo.data.gcsSubpath+'/manifest.json'
        

        
        iaManifestHash = await gcs.getGcsFileMetadata('gs://'+workflowInfo.data.gcsBucket+item['@id']+'/'+workflowInfo.data.gcsSubpath+'/manifest.json');
        if( iaManifestHash ) {
          iaManifestHash = iaManifestHash.md5Hash;
        }
      }
    }
  }

  if( !iaManifest ) {
    throw new Error('container does not have ia-reader manifest: '+path);
  }

  return {
    archivalGroup,
    iaManifest,
    iaManifestHash,
    path
  }
}