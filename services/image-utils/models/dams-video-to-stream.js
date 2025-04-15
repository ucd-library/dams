const fs = require('fs-extra');
const config = require('../lib/config');
const videoToStream = require('../lib/video-to-stream');

/**
 * @function run
 * @description Convert video to streaming format.  If a workflowInfo is provided,
 * video will be downloaded from GCS, converted, and uploaded back to GCS.  
 * 
 * Note, the playlist.m3u8 file is static in the ffmpeg dir and is copied when the 
 * 1080p video is created. 
 * 
 * @param {Object} opts 
 * @param {String} opts.videoFile Path to the input video file.  If a workflowInfo is provided,
 *                 this will be the path to the downloaded video file.
 * @param {String} opts.resolution Resolution of the video to convert to.
 * @param {Object|String} opts.workflowInfo DAMS workflow info object. This is a JSON object that contains
 *                 the workflow information.  This is used to get the gcs bucket(s) to download/upload
 *                 the video.  This can be a string or an object. If a string is provided, it
 *                 will be treated as workflowId and the workflow info will be fetched from the tmp bucket.
 * @returns {Promise}
 */
async function run(opts={}) {
  let {videoFile, resolution, resolutionIndex, workflowInfo} = opts;
  
  if( typeof workflowInfo === 'string' ) {
    workflowInfo = await gcs.readFileToMemory(
      'gs://'+path.join(config.workflow.gcsBuckets.tmp, workflowId, 'workflow.json'));
    workflowInfo = JSON.parse(workflowInfo.toString('utf8'));
  }

  if( !videoFile ) {
    videoFile = workflowInfo.data.tmpGcsPath.replace('gs://', config.tmpDir+'/');
    console.log('Downloading input image '+workflowInfo.data.tmpGcsPath+' to '+videoFile);
    await fs.mkdirp(path.parse(videoFile).dir);
    await gcs.getGcsFileObjectFromPath(workflowInfo.data.tmpGcsPath)
      .download({
        destination: videoFile
      })
  }

  if( resolution === undefined && resolutionIndex !== undefined ) {
    resolution = config.video.allowedResolutions[resolutionIndex];
    if( !resolution ) {
      throw new Error('Unknown resolution index: '+resolutionIndex);
    }
  }

  // this function checks if the video file exists and is valid resolution
  await videoToStream(videoFile, resolution);

  // await fs.unlink(videoFile);

  dir = path.join(dir, 'stream');
  let files = await fs.readdir(dir);
  let resultFiles = [];

  for( let file of files ) {
    let uploadOpts = {};
    let gcsPath = 'gs://'+workflowInfo.data.gcsBucket + 
      workflowInfo.data.finPath + '/' + 
      workflowInfo.data.gcsSubpath + '/' +
      file;

    logger.info('Copying file from '+path.join(dir, file)+' to '+gcsPath);
    await gcs.streamUpload(
      gcsPath,
      fs.createReadStream(path.join(dir, file)),
      uploadOpts
    );

    resultFiles.push(gcsPath);
  }
  
  // await fs.remove(dir);

  return resultFiles;
}

module.exports = run;