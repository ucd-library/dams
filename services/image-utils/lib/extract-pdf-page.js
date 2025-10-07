const exec = require('./exec');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const PTS_TO_DPI = 72;

async function getWidthInches(file) {
  // let {stdout, stderr} = await exec(`pdfinfo ${file} | awk '/^Pages:/ {print $2}'`);
  let {stdout, stderr} = await exec(`pdfinfo ${file}`);
  let lines = stdout.split('\n')
    .map(line => line.trim())
    .filter(line => line.match(/^Page size:/))
    .map(line => {
      const match = line.match(/(\d+\.?\d+?)\s+x\s+(\d+\.?\d+?)+\s+pts/);
      return match ? parseFloat(match[1]) : NaN;
    });

  return lines[0]/PTS_TO_DPI;
}


async function run(pdfFile, page) {
  if( !fs.existsSync(pdfFile) ) {
    throw new Error('PDF file does not exist: '+pdfFile);
  }
  if( page === undefined || page === null ) {
    throw new Error('Page number is required');
  }

  let widthInches = await getWidthInches(pdfFile);
  let density;

  if( typeof widthInches !== 'number' || isNaN(widthInches) || widthInches <= 0 ) {
    console.warn('Failed to get valid width for PDF', pdfFile, 'using default density', config.pdf.extractDensity);
    density = config.pdf.extractDensity;
  } else {
    density = config.pdf.tifResizeWidth/widthInches;
    console.log('Extracting PDF page', page, 'with density', density, 'for width', widthInches, 'inches');
  }

  // first make a tiff
  let filenameParts = path.parse(pdfFile);
  let outputFile = path.join(filenameParts.dir, filenameParts.base+'-'+page+'-tmp.tif');
  await exec(`convert -density ${density} ${pdfFile}[${page}] -resize ${config.pdf.tifResizeWidth}x  ${outputFile}`);
  
  return outputFile;
}

module.exports = run;