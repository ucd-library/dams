
const {Command} = require('commander');
const program = new Command();

let utils = require('../lib/workflow-service-utils');

program
  .description('Finalize a pdf workflow.  Used in GC workflow.')
  .argument('<id>', 'workflow id')
  .action(async (id) => {
    let result = await utils.finalizePdfWorkflow(id);
    console.log(result);
    process.exit(0);
  });

program.parse(process.argv);