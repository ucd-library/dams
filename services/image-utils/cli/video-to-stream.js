const model = require('../lib/model.js');

let [node, file, worflowId, part] = process.argv;
let partsDef = ['360p', '480p', '720p', '1080p'];

if( part === undefined ) {
  part = process.env.CLOUD_RUN_TASK_INDEX;
}

if( part !== undefined ) {
  part = parseInt(part);
  if( part >= partsDef.length ) {
    console.error('Invalid part index', part);
    process.exit(1);
  }
  part = partsDef[part];
}

model.runVideoToStream(worflowId, part)
  .then(() => {
    console.log('done');
    process.exit(0);
  });