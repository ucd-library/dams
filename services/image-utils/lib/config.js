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

// config.iaReader = {
//   ocrScale : OCR_TO_IA_BOOK_SCALE,

//   imageMagick : {
//     density : config.ocr.imageMagick.density,
//     deskew : config.ocr.imageMagick.deskew,
//     quality : 90,
//     resize : IA_BOOK_SIZE+'x',
//     alpha : config.ocr.imageMagick.alpha,
//   }
// }

config.imageSizes = {
  outputFormat : 'jpg',
  sizes : {
    small : {
      imageMagick : {
        resize : Math.floor(IA_BOOK_SIZE/4)+'x',
        quality : 90,
        deskew : config.ocr.imageMagick.deskew,
        alpha : config.ocr.imageMagick.alpha
      }
    },
    medium : {
      imageMagick : {
        resize : Math.floor(IA_BOOK_SIZE/2)+'x',
        quality : 90,
        deskew : config.ocr.imageMagick.deskew,
        alpha : config.ocr.imageMagick.alpha
      }
    },
    large : {
      ocrScale : OCR_TO_IA_BOOK_SCALE,
      imageMagick : {
        resize : IA_BOOK_SIZE+'x',
        density : config.ocr.imageMagick.density,
        alpha : config.ocr.imageMagick.alpha,
        deskew : config.ocr.imageMagick.deskew,
        quality : 90,
      }
    },
    tiled : {
      minSize : 1000 * 1000 * 10, // 10mb
      output : 'ptif:',
      outputFormat : 'tif',
      imageMagick : {
        define : 'tiff:tile-geometry=256x256',
        compress : 'jpeg',
        resize : '4096x',
        quality : 100
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