const path = require('path');
const generateImageProducts = require('./generate-image-products');
const getNumPdfPages = require('../lib/get-num-pdf-pages');

async function run(opts={}) {
  let inputFile = opts.inputFile;

  let numPages = await getNumPdfPages(inputFile);
  let dir = path.dirname(inputFile);

  for( let i = 0; i < numPages; i++ ) {
    let _opts = Object.assign({
      page: i, 
      outputDir : path.join(dir, i+'')
    }, opts);

    let resp = await generateImageProducts(inputFile, _opts);
    console.log(resp);
  }

}

module.exports = run;