const {dataModels} = require('@ucd-lib/fin-service-utils');
const model = require('./model.js');
const {defaultEsApiGenerator} = dataModels;

module.exports = defaultEsApiGenerator(model);