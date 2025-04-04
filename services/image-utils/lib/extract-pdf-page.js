const exec = require('./exec');
const fs = require('fs');
const path = require('path');
const config = require('./config');

async function run(pdfFile, page) {
  if( !fs.existsSync(pdfFile) ) {
    throw new Error('PDF file does not exist: '+pdfFile);
  }
  if( page === undefined || page === null ) {
    throw new Error('Page number is required');
  }

  // first make a tiff
  let filenameParts = path.parse(pdfFile);
  let outputFile = path.join(filenameParts.dir, filenameParts.base+'-'+page+'-tmp.tif');
  await exec(`convert -density ${config.workflow.pdfExtractDensity} ${pdfFile}[${page}] ${outputFile}`);
  
  return outputFile;
}

module.exports = run;