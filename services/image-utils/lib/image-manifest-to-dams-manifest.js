const config = require('./config');
const utils = require('./workflow-service-utils');

function run(manifest, workflowInfo, page) {
  // remove the outputDir from the manifest, we don't need it
  delete manifest.outputDir;

  // add the original image path to the manifest
  if( page !== undefined && page !== null ) {
    manifest.page = parseInt(page);
    page = '/'+page;
  } else {
    page = '';
  }

  // update the manifest with workflow info
  if( manifest.original ) {
    manifest.original.url = '/fcrepo/rest'+workflowInfo.data.finPath;
    delete manifest.original.file; // don't need this reference, already in the DAMS
  }

  let baseGcsPath = utils.getGcsBasePath(workflowInfo);

  // add DAMS accessible URLs
  for( let key in config.image.products ) {
    // reference url for application
    manifest[key].url = '/fcrepo/rest'+workflowInfo.data.finPath+
      '/svc:gcs/{{BUCKET}}/'+workflowInfo.data.gcsSubpath+page+'/'+config.image.products[key].name;

    // gcs path for uploading
    manifest[key].gcsPath = baseGcsPath+page+'/'+config.image.products[key].name;
  }

  // add IIIF service url for tiled.tif
  manifest.tiled.iiif = '/fcrepo/rest'+workflowInfo.data.finPath+'/svc:iiif/'+
  workflowInfo.data.gcsSubpath+page+'/tiled.tif';

  return manifest;
}

module.exports = run;