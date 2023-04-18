const model = require('../lib/model.js');

let [node, file, worflowId] = process.argv;


console.log(node, file, worflowId);
model.runVideoToStream(worflowId)
  .then(() => {
    console.log('done');
    process.exit(0);
  });