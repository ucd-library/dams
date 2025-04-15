const {Command} = require('commander');
const program = new Command();
const path = require('path');

let run = require('../lib/get-num-pdf-pages');

program
  .description('Get number of pages in a pdf file')
  .argument('<file>', 'input file')
  .action(async (file) => {
    let result = await run(file);
    console.log(result);
    process.exit(0);
  });

program.parse(process.argv);