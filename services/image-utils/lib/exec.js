const {exec} = require('child_process');
const {logger} = require('@ucd-lib/fin-service-utils');

function _exec(cmd, options={}) {
  return new Promise((resolve, reject) => {

    if( !options.shell ) {
      options.shell = '/bin/bash'
    };

    logger.info('Executing shell command: ', cmd, options);

    exec(cmd, options, (error, stdout, stderr) => {
      logger.debug('Executing shell command result: ', cmd, options, {error, stdout, stderr});

      if( error ) reject(error);
      else resolve({stdout, stderr});
    }); 
  });
}

module.exports = _exec;