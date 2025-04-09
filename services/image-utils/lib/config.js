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
    pdfExtractDensity : env.PDF_DENSITY || 600,
  },

  pdf : {
    extractDensity : parseInt(env.PDF_DENSITY || 600),
    tifResizeWidth : parseInt(env.TIF_RESIZE_WIDTH || 3072),
  },

  ocr : {
    deskew : '40%'
  },

  image : {
    deskewAngleThreshold : parseFloat(env.DESKEW_ANGLE_THRESHOLD || 1.1),
    wordCountThreshold : parseInt(env.WORD_COUNT_THRESHOLD || 100),
    wordConfidenceThreshold : parseFloat(env.WORD_CONFIDENCE_THRESHOLD || 50),
  
    products : {
      small : {name: 'small.jpg', contentType: 'image/jpeg'},
      medium : {name: 'medium.jpg', contentType: 'image/jpeg'},
      large : {name: 'large.jpg', contentType: 'image/jpeg'},
      ocr : {name: 'ocr.djvu', contentType: 'text/xml'},
      tiled : {name: 'tiled.tif', contentType: 'image/tiff'}
    }
  },

  video : {
    allowedResolutions : [
      '360p', '480p', '720p', '1080p'
    ]
  }
}, params);


// if( params.imagemagick?.deskew === false ) {
//   console.log('Ignoring ImageMagick deskew step');
//   delete config.ocr.imageMagick.deskew;
// }


module.exports = config;