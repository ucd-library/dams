const {Command, Option} = require('commander');
const program = new Command();

let run = require('../lib/video-to-stream');
let workflow = require('../models/dams-video-to-stream');
let config = require('../lib/config');

program
  .description('Convert video to streaming format')
  .option('-f, --input-file <file>', 'input file')
  .addOption(new Option('-r, --resolution <resolution>', 'resolution').choices(config.video.allowedResolutions))
  .option('-i, --workflow-id <id>', 'Running from DAMS workflow')
  .action(async (opts={}) => {
    // if( !opts.resolution && process.env.CLOUD_RUN_TASK_INDEX ) {
    //   opts.resolution = config.video.allowedResolutions[process.env.CLOUD_RUN_TASK_INDEX];
    //   console.log('Using CLOUD_RUN_TASK_INDEX='+process.env.CLOUD_RUN_TASK_INDEX+' for resolution: '+opts.resolution);
    //   opts.resolution = process.env.CLOUD_RUN_TASK_INDEX;
    // }

    if( opts.workflowId ) {
      await workflow({
        resolution : opts.resolution,
        workflowId : opts.workflowId
      })
    } else {
      await run(opts.inputFile, opts.resolution); 
    }

    process.exit(0);
  });

program.parse(process.argv);