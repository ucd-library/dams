const {Command} = require('commander');
const program = new Command();
const path = require('path');
const fs = require('fs');

let run = require('../models/dams-image-products-workflow');

program
  .description('Process image or pdf page')
  .option('-f, --input-file <file>', 'input file')
  .option('-p, --page <number>', 'page number')
  .option('-i, --workflow-id <id>', 'workflow id')
  .option('-d, --workflow-data-file <file>', 'path to workflow data file')
  .option('-o, --output-dir <dir>', 'output directory')
  .option('-n, --no-upload', 'do not upload to gcs')
  .option('-l, --log-output', 'log the output manifest and stats')
  .action(async (opts={}) => {
    if( !opts.page && process.env.CLOUD_RUN_TASK_INDEX ) {
      console.log('Using CLOUD_RUN_TASK_INDEX as page: '+process.env.CLOUD_RUN_TASK_INDEX);
      opts.page = process.env.CLOUD_RUN_TASK_INDEX;
      opts.pageFromCloudRunTaskIndex = true;
    }

    if( opts.workflowDataFile ) {
      if( !path.isAbsolute(opts.workflowDataFile) ) {
        opts.workflowDataFile = path.join(process.cwd(), opts.workflowDataFile);
      }
      if( !fs.existsSync(opts.workflowDataFile) ) {
        throw new Error('Workflow data file does not exist: '+opts.workflowDataFile);
      }
      opts.workflowInfo = JSON.parse(fs.readFileSync(opts.workflowDataFile), 'utf8');
    }

    if( opts.workflowId ) {
      opts.workflowInfo = opts.workflowId;
      delete opts.workflowId;
    }

    if( opts.inputFile ) {
      if( !path.isAbsolute(opts.inputFile) ) {
        opts.inputFile = path.join(process.cwd(), opts.inputFile);
      }
      if( !fs.existsSync(opts.inputFile) ) {
        throw new Error('Input file does not exist: '+opts.inputFile);
      }
      opts.inputImage = path.resolve(opts.inputFile);
      delete opts.inputFile;
    }

    if( opts.upload === false ) {
      opts.noUpload = true;
      delete opts.upload;
    }

    let result = await run(opts);
    if( opts.logOutput ) {
      console.log(JSON.stringify(result, null, 2));
    }

    console.log('done');
    process.exit(0);
  });

program.parse(process.argv);