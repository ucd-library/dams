const path = require('path');
const fs = require('fs-extra');
const exec = require('../lib/exec');
const config = require('../lib/config');
const hocrToDjvu = require('../lib/hocr-to-djvu');
const getImageDimensions = require('../lib/get-image-dimensions');
const extractPdfPage = require('../lib/extract-pdf-page');

const DESKEW_ANGLE_THRESHOLD = config.image.deskewAngleThreshold;
const WORD_COUNT_THRESHOLD = config.image.wordCountThreshold;
const WORD_CONFIDENCE_THRESHOLD = config.image.wordConfidenceThreshold;

const OCR_TO_LARGE_SCALE = 2;
const GEN_IMAGE_PRODUCTS = path.resolve(__dirname, '..', 'lib', 'generate-image-products.sh');
const GEN_IMAGE_FILENAMES = {
  smallImg : 'small.jpg',
  mediumImg : 'medium.jpg',
  largeImg : 'large.jpg',
  largeDeskewImg : 'large-deskew.jpg',
  ocrImg : 'ocr.jpg',
  ocrDeskewImg : 'ocr-deskew.jpg',
  ocr : 'ocr.hocr',
  ocrDeskew : 'ocr-deskew.hocr',
  tiledTif : 'tiled.tif',
  deskewAngle : 'deskew-angle.txt'
}

function analyzeWords(djvuFile) {
  let xml = fs.readFileSync(djvuFile, 'utf8');

  // parse xml and get word count
  let wordMatch = xml.match(/(x-confidence="\d+")/g);
  if (!wordMatch) {
    return { count: 0, avg: 0, median: 0, buckets: {}};
  }
  let count = wordMatch.length
  let sum = 0;
  let buckets = {};
  let all = [];

  wordMatch.forEach((match) => {
    let confidence = parseFloat(match.match(/"(\d+)"/)[1]);
    let hValue = parseInt(confidence / 10) * 10;
    if( !buckets[hValue] ) {
      buckets[hValue] = 0;
    }
    buckets[hValue]++;
    all.push(confidence);

    sum += confidence;
  });

  let middle = Math.floor(count / 2);
  let median = all.sort((a, b) => a - b)[middle];

  return {
    count,
    avg: sum / count,
    median,
    buckets,
  };
}

async function getDeskewAngle(filePath) {
  let page = '';
  if( filePath.endsWith('.tif') || filePath.endsWith('.tiff') ) {
    page = '[0]';
  }

  var {stdout} = await exec(`convert ${filePath}${page} -resize 2048x -deskew ${config.ocr.deskew} -verbose info:`);
  var angle = parseFloat(stdout.match(/deskew:angle: (-?\d+(\.\d+)?)/)[1]);
  return angle;
}

/**
 * @method run
 * @description This function will generate the image products for a given input image.
 * it will output the results to the output directory if provided, otherwise it will
 * output to the same directory as the input image. It will also generate a manifest
 * which is returned from the function.  The manifest will describe the image products
 * generated and their sizes as well as if the deskewed image was an improvement over
 * the original image.  However all images are saved to disk.
 * 
 * This function will generate the following image products:
 * - small.jpg
 * - medium.jpg
 * - large.jpg
 * - large-deskew.jpg
 * - ocr.djvu
 * - ocr-deskew.djvu
 * - tiled.tif
 * 
 * @param {*} inputImage 
 * @param {*} opts 
 * @returns 
 */
async function run(inputImage, opts={}) {
  let outputDir = opts.outputDir;
  if( !outputDir ) {
    outputDir = path.dirname(inputImage);
  }

  let orgInputImage = inputImage;
  let isPdf = false;

  // check if this is a pdf file, if so, extract the page to a temp tif file for processing
  if( path.parse(inputImage).ext === '.pdf' ) {
    console.log('Received pdf '+inputImage+'. Extracting page '+opts.page+' from pdf using density: '+config.pdf.extractDensity);
    inputImage = await extractPdfPage(inputImage, opts.page);
    isPdf = true;
  }

  let files = {};
  for( let key in GEN_IMAGE_FILENAMES ) {
    files[key] = path.join(outputDir, GEN_IMAGE_FILENAMES[key]);
  }

  await exec(GEN_IMAGE_PRODUCTS+' '+inputImage+' '+outputDir, {
    env : {DESKEW_THRESHOLD : config.ocr.deskew}
  }, true);

  let ocrImgDim = await getImageDimensions(files.ocrImg);
  let ocrDeskewImgDim = await getImageDimensions(files.ocrDeskewImg);

  if( opts.keepOcrImg !== true ) {
    fs.removeSync(files.ocrImg);
    fs.removeSync(files.ocrDeskewImg);
  }

  let djvuFile = await hocrToDjvu(files.ocr, OCR_TO_LARGE_SCALE, ocrImgDim, WORD_CONFIDENCE_THRESHOLD);
  let djvuDeskewFile = await hocrToDjvu(files.ocrDeskew, OCR_TO_LARGE_SCALE, ocrDeskewImgDim, WORD_CONFIDENCE_THRESHOLD);

  if( opts.keepHocr !== true ) {
    fs.removeSync(files.ocr);
    fs.removeSync(files.ocrDeskew);
  }
  
  let ocrImgStats = analyzeWords(djvuFile);
  let ocrDeskewImgStats = analyzeWords(djvuDeskewFile);
  
  let deskewAngle = await getDeskewAngle(inputImage, opts.page);

  let ocrStats = {
    deskewAngle,
    imDeskew: config.ocr.deskew,
    angleThreshold: DESKEW_ANGLE_THRESHOLD,
    wordCountThreshold: WORD_COUNT_THRESHOLD,
    wordConfidenceThreshold: WORD_CONFIDENCE_THRESHOLD,
    original : ocrImgStats,
    deskewed : ocrDeskewImgStats
  }

  let manifest = {
    outputDir,
    original : {
      file : orgInputImage,
      size : await getImageDimensions(orgInputImage, opts.page),
    },
    small : {
      file : files.smallImg,
      size : await getImageDimensions(files.smallImg),
    },
    medium : {
      file : files.mediumImg,
      size : await getImageDimensions(files.mediumImg),
    },
    tiled : {
      file : files.tiledTif,
      size : await getImageDimensions(files.tiledTif),
    },
    ocrStats,
  }

  if( opts.page !== undefined && opts.page !== null ) {
    manifest.page = parseInt(opts.page);
  }

  if( pickDeskewedImage(manifest) ) {
    manifest.large = {
      file : files.largeDeskewImg,
      size : await getImageDimensions(files.largeDeskewImg)
    }
    manifest.ocr = {
      file : djvuDeskewFile,
      size : manifest.large.size,
      imageSize: 'large'
    }

    ocrStats.selected = 'deskewed';
  } else {
    manifest.large = {
      file : files.largeImg,
      size : await getImageDimensions(files.largeImg)
    }
    manifest.ocr = {
      file : djvuFile,
      size : manifest.large.size,
      imageSize: 'large'
    }

    ocrStats.selected = 'original';
  }

  if( isPdf ) {
    manifest.extractDensity = config.pdf.extractDensity;
    delete manifest.original;
  }

  // remove the tmp tif file we created from the pdf
  // if( isPdf ) {
  //   fs.removeSync(inputImage);
  // }

  return manifest;
}

function pickDeskewedImage(manifest) {
  let deskewed = manifest.ocrStats.deskewed;
  let original = manifest.ocrStats.original;

  if( config.imagemagick?.deskew === false ) {
    return false;
  }

  let improvedWordCount = deskewed.count > original.count;
  let improvedMedian = deskewed.median >= original.median;
  let deskewAngle = manifest.ocrStats.deskewAngle;

  let aboveWordCountThreshold = deskewed.count > WORD_COUNT_THRESHOLD;
  let withinAngleThreshold = (DESKEW_ANGLE_THRESHOLD >= deskewAngle && 
                              deskewAngle >= DESKEW_ANGLE_THRESHOLD*-1);

  if( improvedWordCount && improvedMedian &&
      (withinAngleThreshold || aboveWordCountThreshold) ) {
    return true;
  }

  return false;
}

module.exports = run;