const model = require('../lib/model.js');

let [node, file, worflowId, page] = process.argv;

if( page === undefined ) {
  page = process.env.CLOUD_RUN_TASK_INDEX;
}

console.log(node, file, worflowId, page);
model.runPdfToIaReaderPage(worflowId, page)
  .then(() => {
    console.log('done');
    process.exit(0);
  });