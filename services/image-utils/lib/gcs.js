const exec = require('./exec.js');
const config = require('./config.js');
const {Storage} = require('@google-cloud/storage');

const storage = new Storage();
class GcsWrapper {

  constructor() {
    this.client = storage;
  }

  getGcsFileObjectFromPath(gcsFile) {
    return storage.bucket(gcsFile.split('/')[2])
      .file(gcsFile.split('/').slice(3).join('/'));
  }

  readFileToMemory(gcsFile) {
    return new Promise((resolve, reject) => {
      let file = this.getGcsFileObjectFromPath(gcsFile);
      file.download((err, contents) => {
        if( err ) return reject(err);
        resolve(contents);
      });
    });
  }

  streamUpload(gcsFile, stream, opts) {
    return new Promise((resolve, reject) => {
      let file = this.getGcsFileObjectFromPath(gcsFile);
      let writeStream = file.createWriteStream(opts);
      stream.pipe(writeStream);

      writeStream.on('error', reject);
      writeStream.on('finish', resolve);
    });
  }

  /**
   * @method listFiles
   * @description list files in a gcs folder
   */
  listFiles(gcsPath) {
    let bucket = gcsPath.split('/')[2];
    let folder = gcsPath.split('/').slice(3).join('/');

    return storage.bucket(bucket).getFiles({
      prefix: folder+'/',
      delimiter: '/',
      autoPaginate: false
    });
  }

  /**
   * @method cleanFolder
   * @description remove all files in a gcs folder
   * 
   */
  cleanFolder(bucket, folder) {
    // ensure proper folder format
    folder = folder.replace(/\/$/, '').replace(/^\//, '')+'/';

    return storage.bucket(bucket).deleteFiles({
      force: true,
      prefix: folder
    });
  }


}

module.exports = new GcsWrapper();