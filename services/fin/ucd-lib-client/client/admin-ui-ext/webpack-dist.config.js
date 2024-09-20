const webpack = require('webpack');

let configs = require('@ucd-lib/cork-app-build').dist({
  // root directory, all paths below will be relative to root
  root : __dirname,
  entry : 'public/elements/dams-collection-import.js',
  // folder where bundle.js and ie-bundle.js will be written
  dist : '../../../admin-ui/dist/js',
  clientModules : 'public/node_modules',
  outputFile : 'dams-admin-ui-ext.js'
});

if( !Array.isArray(configs) ) configs = [configs];

// add .xml and .csl loading support
configs.forEach((config, index) => {
  config.output.publicPath = '/js/'
  config.output.chunkFilename = '[name]-[chunkhash].'+config.output.filename;
});

module.exports = configs[0];