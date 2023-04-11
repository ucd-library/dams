const { config } = require('@ucd-lib/fin-service-utils');

const OCR_TO_IA_BOOK_SCALE = 4;
const IA_BOOK_SIZE = 1024;
const env = process.env;

config.ocr = {

  imageMagick : {
    density : 300,
    alpha : 'remove',
    fill : 'black',
    fuzz : '30% +opaque "#FFFFFF"',
    deskew : '40%',
    // trim : '+repage',
    filter : 'catrom',
    // 'sigmoidal-contrast' : '10,50%',
    quality : 100,
    resize : (IA_BOOK_SIZE*OCR_TO_IA_BOOK_SCALE)+'x',
  }
}

config.iaReader = {
  ocrScale : OCR_TO_IA_BOOK_SCALE,

  imageMagick : {
    density : config.ocr.imageMagick.density,
    deskew : config.ocr.imageMagick.deskew,
    quality : 90,
    resize : IA_BOOK_SIZE+'x',
    alpha : config.ocr.imageMagick.alpha,
  }
}

config.imageSizes = {
  outputFormat : 'jpg',
  sizes : {
    small : {
      imageMagick : {
        resize : Math.floor(IA_BOOK_SIZE/8)+'x',
        quality : 90,
      }
    },
    medium : {
      imageMagick : {
        resize : Math.floor(IA_BOOK_SIZE/2)+'x',
        quality : 90,
      }
    },
    large : {
      imageMagick : {
        resize : IA_BOOK_SIZE+'x',
        quality : 90,
      }
    }
  }
}

config.port = env.PORT || 3000;

config.workflow = {
  rootPath : env.WORKFLOW_ROOT_PATH || '/workflow',
  gcsBuckets : {
    products : env.GOOGLE_CLOUD_WORKFLOW_BUCKET || 'dams-client-products',
    tmp : env.GOOGLE_CLOUD_WORKFLOW_TMP_BUCKET || 'dams-workflow-tmp-space'
  }
}

module.exports = config;