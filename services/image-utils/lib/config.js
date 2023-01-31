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
    trim : '+repage',
    filter : 'catrom',
    // 'sigmoidal-contrast' : '10,50%',
    quality : 100,
    resize : (IA_BOOK_SIZE*OCR_TO_IA_BOOK_SCALE)+'x\\>',
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

config.workflow = {
  rootPath : env.WORKFLOW_ROOT_PATH || '/workflow',
  gcsBucket : env.GOOGLE_CLOUD_WORKFLOW_BUCKET || 'dams-client-products'
}

module.exports = config;