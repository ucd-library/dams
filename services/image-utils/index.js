const express = require('express');
const { logger } = require('@ucd-lib/fin-service-utils');
const config = require('./lib/config.js');
const fs  = require('fs');

const app = express();

app.use(require('./controllers'));

app.listen(config.port || 3000, () => {
  logger.info('Image Utils Server started on port: '+config.port);
});