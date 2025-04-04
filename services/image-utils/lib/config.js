const env = process.env;

let params = {};
if( env.GOOGLE_CLOUD_WORKFLOW_PARAMS ) {
  try {
    params = JSON.parse(env.GOOGLE_CLOUD_WORKFLOW_PARAMS);
    console.log('Parsed GOOGLE_CLOUD_WORKFLOW_PARAMS', params);
  } catch(e) {
    console.warn('Failed to parse GOOGLE_CLOUD_WORKFLOW_PARAMS', env.GOOGLE_CLOUD_WORKFLOW_PARAMS);
  }
} else {
  console.log('GOOGLE_CLOUD_WORKFLOW_PARAMS not set');
}

const config = Object.assign({
  tmpDir : env.WORKFLOW_TMP_DIR || '/workflow',

  port : env.PORT || 3000,

  workflow : {
    rootPath : env.WORKFLOW_ROOT_PATH || '/workflow',
    gcsBuckets : {
      products : env.GOOGLE_CLOUD_WORKFLOW_BUCKET || 'dams-client-products',
      tmp : env.GOOGLE_CLOUD_WORKFLOW_TMP_BUCKET || 'dams-prod-workflow-tmp-space'
    },
    pdfExtractDensity : env.PDF_DENSITY || 900,
  }
}, params);


// if( params.imagemagick?.deskew === false ) {
//   console.log('Ignoring ImageMagick deskew step');
//   delete config.ocr.imageMagick.deskew;
// }


module.exports = config;