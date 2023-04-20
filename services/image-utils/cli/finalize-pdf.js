const model = require('../lib/model.js');

let [node, file, worflowId] = process.argv;

model.finalizePdf(worflowId)
  .then(() => {
    console.log('done');
    process.exit(0);
  });