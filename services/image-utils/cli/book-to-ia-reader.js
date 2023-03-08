const model = require('../lib/model.js');

let [node, file, worflowId, page] = process.argv;

if( page === undefined ) {
  page = process.env.CLOUD_RUN_TASK_INDEX;
}

let opts = {
  keepTmpFiles : false
}

console.log(node, file, worflowId, page, opts);
model.runToIaReaderPage(worflowId, page, opts)
  .then(() => {
    console.log('done');
    process.exit(0);
  });