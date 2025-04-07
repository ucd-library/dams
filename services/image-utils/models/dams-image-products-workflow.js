const generateImageProducts = require('./generate-image-products');
const gcs = require('../lib/gcs');
const fs = require('fs-extra');
const path = require('path');
const config = require('../lib/config');

const COPY_KEYS = {
  small : {name: 'small.jpg', contentType: 'image/jpeg'},
  medium : {name: 'medium.jpg', contentType: 'image/jpeg'},
  large : {name: 'large.jpg', contentType: 'image/jpeg'},
  ocr : {name: 'ocr.djvu', contentType: 'text/xml'},
  tiled : {name: 'tiled.tif', contentType: 'image/tiff'}
};

/**
 * @method run
 * @description run the entire dams image product generation workflow. This is 
 * a wrapper around the generateImageProducts function, adding the ability to
 * download a file from a tmp gcs bucket and upload the generated files to provided
 * gcs bucket as well as the manifest file.
 * 
 * In production, the opts.workflowInfo path and optional opts.page number should be 
 * passed. 
 * 
 * In local development, the opts.inputImage path can be passed to test and
 * set the opts.noUpload flag to true to skip the upload step.  Setting these two flags
 * will remove all gcs dependencies.
 * 
 * For a hybrid 'reprocess for production locally' workflow.  Pass an artificial 
 * opts.workflowInfo object with a opts.inputImage path and the (optional) opts.page number 
 * to process.  This will allow the workflow to run locally and generate the image products 
 * as well as upload to production gcs bucket but skip the step for fetching form a tmp bucket.  
 * For this to work, make sure you set the following properties in the opts.workflowInfo object:
 * 
 * - workflowInfo.data.gcsBucket - gcs bucket to upload the image products to
 * - workflowInfo.data.finPath - fcrepo path of the original image (without the /fcrepo/rest)
 * - workflowInfo.data.gcsSubpath - normally 'images' for this workflow
 * 
 * @param {Object} opts 
 * @param {String} opts.inputImage Optional. Path to the input image. If not provided, the
 *                 input image will be downloaded from the workflowInfo.data.tmpGcsPath path in the
 *                 workflowInfo object.  Used for debugging or local workflows.
 * @param {String|Object} opts.workflowInfo DAMS workflow info object. This is a JSON object that contains
 *                 the workflow information.  This is used to get the gcs bucket(s) to download/upload
 *                 the image products.  This can be a string or an object. If a string is provided, it
 *                 will be treated as workflowId and the workflow info will be fetched from the tmp bucket
 * @param {Number} opts.page Optional. The page number to process. This is used to get the correct
 *                 page from a pdf file.
 * @param {Boolean} opts.noUpload Optional. If true, the generated files will not be uploaded to gcs.
 */
async function run(opts={}) {
  let {inputImage, workflowInfo, page} = opts;

  if( !workflowInfo && !inputImage ) {
    throw new Error('No workflow info or input image provided');
  }

  if( typeof workflowInfo === 'string' ) {
    workflowInfo = await gcs.readFileToMemory(
      'gs://'+path.join(config.workflow.gcsBuckets.tmp, workflowId, 'workflow.json'));
       

    if( !fs.existsSync(workflowInfo) ) {
      throw new Error('Workflow info file does not exist: '+workflowInfo);
    }
    workflowInfo = JSON.parse(fs.readFileSync(workflowInfo, 'utf8'));
  }

  // if an input image is not provided, use the tmpGcsPath to download it
  if( !inputImage ) {
    inputImage = workflowInfo.data.tmpGcsPath.replace('gs://', config.tmpDir+'/');
    console.log('Downloading input image '+workflowInfo.data.tmpGcsPath+' to '+inputImage);
    await fs.mkdirp(path.parse(inputImage).dir);
    await gcs.getGcsFileObjectFromPath(workflowInfo.data.tmpGcsPath)
      .download({
        destination: inputImage
      })
  }

  console.log('Processing image: '+inputImage+' page '+page);

  // base gcs path we will use to upload the image products
  let baseGcsPath;
  if( opts.noUpload !== true ) {
    baseGcsPath = 'gs://'+path.join(
      workflowInfo.data.gcsBucket, 
      workflowInfo.data.finPath, 
      workflowInfo.data.gcsSubpath
    );
  }

  // run the main image product generation process
  let manifest = await generateImageProducts(inputImage, opts);

  if( !workflowInfo ) {
    console.log('No workflow info provided, skipping dams manifest manipulation');
    return {manifest};
  }

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
  manifest.original.url = '/fcrepo/rest'+workflowInfo.data.finPath;
  delete manifest.original.file; // don't need this reference, already in the DAMS

  // add DAMS accessible URLs
  for( let key in COPY_KEYS ) {
    // reference url for application
    manifest[key].url = '/fcrepo/rest'+workflowInfo.data.finPath+
      '/svc:gcs/{{BUCKET}}/'+workflowInfo.data.gcsSubpath+page+'/'+COPY_KEYS[key].name;

    // gcs path for uploading
    let gcsPath = baseGcsPath+page+COPY_KEYS[key].name;

    let filePath = manifest[key].file;
    // cleanup the file path from the manifest, we don't need it after upload
    // the url will be used to get the file
    delete manifest[key].file;

    // check if we want to upload the file or not
    if( opts.noUpload === true ) {
      continue;
    }

    console.log('Uploading to GCS: '+manifest[key].file+' to '+gcsPath);
    await gcs.streamUpload(
      gcsPath,
      fs.createReadStream(filePath),
      {contentType : COPY_KEYS[key].contentType}
    );
  }

  // add IIIF service url for tiled.tif
  manifest.tiled.iiif = '/fcrepo/rest'+workflowInfo.data.finPath+'/svc:iiif/'+
    workflowInfo.data.gcsSubpath+page+'/tiled.tif';

  // split the ocr stats from the manifest
  let ocrStats = manifest.ocrStats;
  delete manifest.ocrStats;

  if( opts.noUpload === true ) {
    return {manifest, ocrStats};
  }

  console.log('Uploading manifest to GCS: '+baseGcsPath+page+'/manifest.json');
  await gcs.getGcsFileObjectFromPath(baseGcsPath+page+'/manifest.json')
    .save(JSON.stringify(manifest), {
      contentType: 'application/json',
      metadata: {
        'fin-bucket-template' : 'BUCKET'
      }
    });

  console.log('Uploading ocr stats to GCS: '+baseGcsPath+page+'/ocr-stats.json');
  await gcs.getGcsFileObjectFromPath(baseGcsPath+page+'/ocr-stats.json')
    .save(JSON.stringify(ocrStats), {
      contentType: 'application/json'
    });

  return {manifest, ocrStats};
}

module.exports = run;