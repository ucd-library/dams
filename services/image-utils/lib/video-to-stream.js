const fs = require('fs-extra');
const config = require('./config');
const exec = require('./exec');
const path = require('path');

const convertScript = path.resolve(__dirname, 'ffmpeg', 'convert.sh');

async function run(videoFile, resolution) {
  if( !fs.existsSync(videoFile) ) {
    throw new Error('Video file does not exist: '+videoFile);
  }

  if( resolution ) {
    if( !config.video.allowedResolutions.includes(resolution) ) {
      throw new Error('Resolution not allowed: '+resolution);
    }
    console.log('Generating video stream for resolution: '+resolution);
    return exec(`${convertScript} ${videoFile} ${resolution}`, null, true);
  }

  console.log('No resolution provided, generating all resolutions: '+config.video.allowedResolutions.join(', '));
  return exec(`${convertScript} ${videoFile}`, null, true);
}

module.exports = run;