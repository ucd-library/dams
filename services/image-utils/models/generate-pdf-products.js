const path = require('path');
const fs = require('fs-extra');
const utils = require('../lib/workflow-service-utils');
const generateImageProducts = require('./generate-image-products');
const getNumPdfPages = require('../lib/get-num-pdf-pages');
const imgManifestToDamsManifest = require('../lib/image-manifest-to-dams-manifest');
const config = require('../lib/config');
const gcs = require('../lib/gcs');

async function run(opts={}) {
  let {inputFile, workflowInfo} = opts;

  let numPages = await getNumPdfPages(inputFile);
  let dir = path.dirname(inputFile);
  let pages = [];
  let stats = [];

  for( let i = 0; i < numPages; i++ ) {
    let _opts = Object.assign({
      page: i, 
      outputDir : opts.outputDir ? path.join(opts.outputDir, i+'') : path.join(dir, i+'')
    }, opts);

    let resp = await generateImageProducts(inputFile, _opts);
    if( opts.logOutput ) {
      console.log(JSON.stringify(resp, null, 2));
    }

    stats.push(resp.ocrStats);
    delete resp.ocrStats;
    pages.push(resp);
  }

  if( opts.noUpload ) {
    return {pages, stats};
  }

  let baseGcsPath = utils.getGcsBasePath(workflowInfo);


  for( let i = 0; i < numPages; i++ ) {
    let page = pages[i];
    let pageNum = i;
    
    let manifest = imgManifestToDamsManifest(page, workflowInfo, pageNum);
    let ocrStats = stats[i];

    for( let key in config.image.products ) {
      let filePath = manifest[key].file;
      let gcsPath = manifest[key].gcsPath;
      delete manifest[key].file;
      delete manifest[key].gcsPath;
  
      console.log('Uploading file to GCS: '+filePath+' to '+gcsPath);
      await gcs.streamUpload(
        gcsPath,
        fs.createReadStream(filePath),
        {contentType : config.image.products[key].contentType}
      );
    }

    let gcsPath = baseGcsPath+'/'+pageNum;

    console.log('Uploading manifest to GCS: '+gcsPath+'/manifest.json');
    await gcs.getGcsFileObjectFromPath(gcsPath+'/manifest.json')
      .save(JSON.stringify(manifest), {
        contentType : 'application/json'
      });

    console.log('Uploading ocr stats to GCS: '+gcsPath+'/ocr-stats.json');
    await gcs.getGcsFileObjectFromPath(gcsPath+'/ocr-stats.json')
      .save(JSON.stringify(ocrStats), {
        contentType: 'application/json'
      });
  }

  console.log('Uploading final manifest to GCS: '+baseGcsPath+'/manifest.json');
  await gcs.getGcsFileObjectFromPath(baseGcsPath+'/manifest.json')
    .save(JSON.stringify({pages}), {
      contentType : 'application/json'
    });

}

module.exports = run;