const run = require('../lib/generate-image-products.js');

let [node, file, inputFile] = process.argv;

run(inputFile)
  .then((manifest) => {
    console.log(JSON.stringify(manifest, null, 2));
    process.exit(0);
  });