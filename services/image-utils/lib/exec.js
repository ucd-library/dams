const {exec} = require('child_process');

function _exec(cmd, options={}, stream=false) {
  return new Promise((resolve, reject) => {
    if( !options ) options = {};
    if( !options.shell ) {
      options.shell = '/bin/bash'
    };

    if( stream === true) {
      const child = exec(cmd, options);
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);

      child.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Process exited with code ${code}`));
        } else {
          resolve();
        }
      });
    } else {
      exec(cmd, options, (error, stdout, stderr) => {
        if( error ) reject(error);
        else resolve({stdout, stderr});
      }); 
    }
  });
}

module.exports = _exec;