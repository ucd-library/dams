const { config } = require('@ucd-lib/fin-service-utils');

const OCR_TO_IA_BOOK_SCALE = 2;
const IA_BOOK_SIZE = 1024;
const env = process.env;

let params = {};
if( env.GOOGLE_CLOUD_WORKFLOW_PARAMS ) {
  params = JSON.parse(env.GOOGLE_CLOUD_WORKFLOW_PARAMS);
}

config.ocr = {
  outputFormat : 'jpg',
  imageMagick : {
    density : 300,
    alpha : 'remove',
    fill : 'black',
    // setting this too high will cause the image to be too dark
    fuzz : '80% +opaque "#FFFFFF"',
    deskew : '40%',
    // trim : '+repage',
    filter : 'catrom',
    layers : 'flatten',
    // 'sigmoidal-contrast' : '10,50%',
    quality : 100,
    resize : (IA_BOOK_SIZE*OCR_TO_IA_BOOK_SCALE)+'x',
  }
}

if( params.imagemagick?.deskew === false ) {
  console.log('Ignoring ImageMagick deskew step');
  delete config.ocr.imageMagick.deskew;
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
  sizes : {
    small : {
      outputFormat : 'jpg',
      imageMagick : {
        resize : Math.floor(IA_BOOK_SIZE/4)+'x',
        quality : 90,
        alpha : config.ocr.imageMagick.alpha,
        layers : 'flatten'
      }
    },
    medium : {
      outputFormat : 'jpg',
      imageMagick : {
        resize : Math.floor(IA_BOOK_SIZE/2)+'x',
        quality : 90,
        alpha : config.ocr.imageMagick.alpha,
        layers : 'flatten'
      }
    },
    large : {
      ocrScale : OCR_TO_IA_BOOK_SCALE,
      outputFormat : 'jpg',
      imageMagick : {
        resize : IA_BOOK_SIZE+'x',
        deskew : config.ocr.imageMagick.deskew,
        fill : config.ocr.imageMagick.fill,
        alpha : config.ocr.imageMagick.alpha,
        quality : 90,
        layers : 'flatten'
      }
    },
    tiled : {
      minSize : 1000 * 1000 * 2, // 2mb
      output : 'ptif:',
      outputFormat : 'tif',
      imageMagick : {
        define : 'tiff:tile-geometry=256x256',
        compress : 'JPEG',
        alpha : 'remove',
        resize : '3072x',
        quality : 90,
        layers : 'flatten'
      }
    }
  }
}

config.port = env.PORT || 3000;

config.workflow = {
  rootPath : env.WORKFLOW_ROOT_PATH || '/workflow',
  gcsBuckets : {
    products : env.GOOGLE_CLOUD_WORKFLOW_BUCKET || 'dams-client-products',
    tmp : env.GOOGLE_CLOUD_WORKFLOW_TMP_BUCKET || 'dams-prod-workflow-tmp-space'
  },
  params
}

module.exports = config;