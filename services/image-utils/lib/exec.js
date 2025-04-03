const {exec} = require('child_process');

function _exec(cmd, options={}, logger) {
  return new Promise((resolve, reject) => {

    if( !options.shell ) {
      options.shell = '/bin/bash'
    };

    exec(cmd, options, (error, stdout, stderr) => {
      if( error ) reject(error);
      else resolve({stdout, stderr});
    }); 
  });
}

module.exports = _exec;