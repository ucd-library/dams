const model = require('../lib/model.js');

let [node, file, localFile] = process.argv;

model.getNumPdfPages(localFile)
  .then(result => {
    console.log(result);
    process.exit(0);
  });