const model = require('../lib/model.js');

let [node, file, worflowId] = process.argv;

model.processImage(worflowId)
  .then(() => {
    console.log('done');
    process.exit(0);
  });