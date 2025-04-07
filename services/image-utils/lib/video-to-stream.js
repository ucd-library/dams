const fs = require('fs-extra');
const config = require('./config');
const exec = require('./exec');

const convertScript = path.resolve(__dirname, 'ffmpeg', 'convert.sh');

async function run(videoFile, resolution) {
  if( !fs.existsSync(videoFile) ) {
    throw new Error('Video file does not exist: '+videoFile);
  }
  if( !config.video.allowedResolutions.includes(resolution) ) {
    throw new Error('Resolution not allowed: '+resolution);
  }

  return exec(`${convertScript} ${localFile} ${resolution}`, null, true);
}

module.exports = run;