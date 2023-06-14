#! /usr/bin/env node

const {Command} = require('commander');
const program = new Command();
const pkg = require('../package.json');

program
  .name('dams')
  .version(pkg.version)
  .command('hdt-to-label', 'Convert HDT file to labels.jsonld.json')
  .command('collection', 'DAMS collection utils')

program.parse(process.argv);