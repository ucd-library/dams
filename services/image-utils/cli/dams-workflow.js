#! /usr/bin/env node

const {Command} = require('commander');
const program = new Command();
const pkg = require('../package.json');

program
  .name('dams-workflow')
  .version(pkg.version)
  .command('process-image', 'Process image or pdf page')
  .command('process-video', 'Process video file')
  .command('process-pdf', 'Process all pages of a pdf file')
  .command('get-num-pdf-pages', 'Get number of pages in a PDF file')

program.parse(process.argv);