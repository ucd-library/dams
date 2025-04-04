#! /usr/bin/env node

const {Command} = require('commander');
const program = new Command();
const pkg = require('../package.json');

program
  .name('dams-workflow')
  .version(pkg.version)
  .command('process-image', 'Process image or pdf page')

program.parse(process.argv);