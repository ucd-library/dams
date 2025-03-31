const fetch = require('node-fetch');
const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const hocrToDjvu = require('./hocr-to-djvu.js');


const DAMS_HOST = process.env.DAMS_HOST || 'https://digital.ucdavis.edu';
const DAMS_FCREPO_BASE = DAMS_HOST + '/fcrepo/rest';
const ROOT_DIR = process.env.ROOT_DIR || path.join(process.cwd(), 'files');

if( fs.existsSync(ROOT_DIR) ) {
  fs.readdirSync(ROOT_DIR).forEach(file => {
    fs.unlinkSync(path.join(ROOT_DIR, file));
  });
}
fs.mkdirSync(ROOT_DIR, { recursive: true });


analyzeOcr('/item/ark:/87287/d7wg68/media/images/d7wg68-000.jpg');

async function analyzeOcr(finId) {
  let filePath = path.join(ROOT_DIR, path.parse(finId).base);
  let noDeskewfile = 'nodeskew-'+path.parse(finId).name+'.jpg';
  let noDeskewfilePath = path.join(ROOT_DIR, noDeskewfile);
  let files = {
    image : filePath,
    ocr : filePath + '.hocr',
    noDeskew : noDeskewfilePath,
    noDeskewOcr : noDeskewfilePath + '.hocr',
  }

  // grab tif 
  await saveToDisk(`${DAMS_FCREPO_BASE}${finId}`, files.image);
  await saveToDisk(`${DAMS_FCREPO_BASE}${finId}/svc:gcs/dams-client-media-prod/images/ocr.djvu`, files.ocr);
  
  // get degress rotation from skew
  var angle = parseFloat(await getDeskewAngle(filePath));

  // grab current hocr file & get word count
  let skewOcrStats = analyzeWords(fs.readFileSync(files.ocr, 'utf8'));

  // run ocr no skew
  console.log(`Running magick on ${finId} with no skew...`);
  await _exec(`magick -density 300 ${filePath}[0] -alpha remove -fill black -fuzz 80% +opaque "#FFFFFF" -filter catrom -layers flatten -quality 100 -resize 2048x ${files.noDeskew}`);
  console.log(`Running OCR on ${files.noDeskew}...`);
  await _exec(`tesseract ${files.noDeskew} ${noDeskewfile} --dpi 300 -l eng --psm 1 --oem 3 hocr`);
  fs.copyFileSync(path.join(process.cwd(), noDeskewfile+'.hocr'), files.noDeskewOcr);
  fs.unlinkSync(path.join(process.cwd(), noDeskewfile+'.hocr'))
  
  let djvuFile = await hocrToDjvu(files.noDeskewOcr, 1, {height: 2048, width: 2048});
  let ocrStats = analyzeWords(fs.readFileSync(djvuFile, 'utf8'));

  console.log(`OCR stats for ${finId}:`);
  console.log(`  Deskew angle: ${angle} degrees`);
  console.log(`  Skewed: ${skewOcrStats.count} words, average confidence ${skewOcrStats.avg}`);
  console.log(`  No skew: ${ocrStats.count} words, average confidence ${ocrStats.avg}`);
}

function analyzeWords(xml) {
  // parse xml and get word count
  let wordMatch = xml.match(/(x-confidence="\d+")/g);
  if (!wordMatch) {
    return { count: 0, avg: 0 };
  }
  let count = wordMatch.length
  let sum = 0;

  wordMatch.forEach((match) => {
    let confidence = parseFloat(match.match(/"(\d+)"/)[1]);
    sum += confidence;
  });

  return {
    count: count,
    avg: sum / count
  };
}

async function saveToDisk(url, filePath) {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.statusText}`);
  }

  const fileStream = fs.createWriteStream(filePath);

  await new Promise((resolve, reject) => {
    response.body.pipe(fileStream);
    response.body.on('error', reject);
    fileStream.on('finish', resolve);
  });

  console.log(`${url} saved to ${filePath}`);
}

async function getDeskewAngle(filePath) {
  var {stdout} = await _exec(`magick ${filePath} -deskew 40% -verbose info:`);
  var angle = parseFloat(stdout.match(/deskew:angle: (-?\d+(\.\d+)?)/)[1]);
  return angle;
}

async function _exec(cmd) {
  return new Promise((resolve, reject) => {
    console.log(`Running command: ${cmd}`);
    exec(cmd, {shell: '/bin/bash'}, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error`, error);
        return reject(error);
      }
      resolve({stdout, stderr});
    });
  });
}