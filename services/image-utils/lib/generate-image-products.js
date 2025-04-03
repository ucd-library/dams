const path = require('path');
const fs = require('fs-extra');
const exec = require('./exec');
const hocrToDjvu = require('./hocr-to-djvu');

const DESKEW_ANGLE_THRESHOLD = 1.1;
const WORD_COUNT_THRESHOLD = 100;
const OCR_TO_LARGE_SCALE = 2;
const GEN_IMAGE_PRODUCTS = path.join(__dirname, 'generate-image-products.sh');
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

async function getImageDimensions(file, page) {
  if( page !== undefined ) {
    file = file+'['+page+']';
  }

  let {stdout, stderr} = await exec(`identify -format "%wx%h " ${file}`);
  let sizes = stdout.trim().split(' ').map(size => {
    let [width, height] = size.split('x');
    return {width, height};
  })
  if( sizes.length === 1 ) {
    return sizes[0];
  }
  return sizes;
}

async function getDeskewAngle(filePath, page=0) {
  var {stdout} = await exec(`convert ${filePath} -resize 2048x -deskew 40% -verbose info:`);
  var angle = parseFloat(stdout.match(/deskew:angle: (-?\d+(\.\d+)?)/)[1]);
  return angle;
}

async function run(inputImage, outputDir='') {
  if( !outputDir ) {
    outputDir = path.dirname(inputImage);
  }

  let files = {};
  for( let key in GEN_IMAGE_FILENAMES ) {
    files[key] = path.join(outputDir, GEN_IMAGE_FILENAMES[key]);
  }

  let {stdout} = await exec(GEN_IMAGE_PRODUCTS+' '+inputImage+' '+outputDir);

  let ocrImgDim = await getImageDimensions(files.ocrImg);
  let ocrDeskewImgDim = await getImageDimensions(files.ocrDeskewImg);

  let djvuFile = await hocrToDjvu(files.ocr, OCR_TO_LARGE_SCALE, ocrImgDim);
  let djvuDeskewFile = await hocrToDjvu(files.ocrDeskew, OCR_TO_LARGE_SCALE, ocrDeskewImgDim);
  
  let ocrImgStats = analyzeWords(djvuFile);
  let ocrDeskewImgStats = analyzeWords(djvuDeskewFile);
  
  let deskewAngle = await getDeskewAngle(inputImage);

  let ocrStats = {
    deskewAngle,
    angleThreshold: DESKEW_ANGLE_THRESHOLD,
    wordCountThreshold: WORD_COUNT_THRESHOLD,
    original : ocrImgStats,
    deskewed : ocrDeskewImgStats
  }

  let manifest = {
    original : {
      file : inputImage,
      size : await getImageDimensions(inputImage),
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

  if( ocrDeskewImgStats.count > ocrImgStats.count && 
      ocrDeskewImgStats.median >= ocrImgStats.median && 
      ((DESKEW_ANGLE_THRESHOLD >= deskewAngle && deskewAngle >= DESKEW_ANGLE_THRESHOLD*-1) || 
        ocrDeskewImgStats.count > WORD_COUNT_THRESHOLD ) ) {
    manifest.large = {
      file : files.largeDeskewImg,
      size : await getImageDimensions(files.largeDeskewImg)
    }
    manifest.ocr = {
      file : djvuDeskewFile,
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
      imageSize: 'large'
    }

    ocrStats.selected = 'original';
  }

  return manifest;
}

module.exports = run;