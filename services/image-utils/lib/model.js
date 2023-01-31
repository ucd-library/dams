const gcs = require('./gcs.js');
const path = require('path');
const fs = require('fs-extra');
const ocr = require('./ocr.js');
const exec = require('./exec.js');
const {logger} = require('@ucd-lib/fin-service-utils');

const imageMagick = require('./image-magick.js');
const config = require('./config.js');

class ImageUtils {

  unzip(file) {

  }


  async pdfPageToIaReader(file, page) {
    let localFile = await this.toLocalFile(file);


  }

  imagesToIaReader() {

  }

  async imageToIaReader(file, page, opts={}) {
    let localFile = await this.toLocalFile(file);

    logger.info('Generating OCR Ready Image for: '+localFile);
    let ocrImage = await imageMagick.ocrReadyImage(localFile, page);

    logger.info('Generating IA Reader Image for: '+localFile);
    let aiImage = await imageMagick.iaReaderImage(localFile, page);

    logger.info('Running OCR for: '+ocrImage.output);
    let ocrResult = await ocr.ocr({filepath: ocrImage.output, output: 'hocr'});

    // we copied the file in from gcs
    if( localFile !== file && opts.keepOriginal !== true ) {
      logger.info('Removing local file: '+localFile);
      await fs.unlink(localFile);
    }

    if( opts.copyToGcs ) {
      let fcrPath = file.replace(config.workflow.rootPath, '').replace(/^\//, '');
      let fileParts = path.parse(fcrPath);
      
      let basePath = 'gs://'+path.join(config.workflow.gcsBucket, fileParts.dir);

      logger.info('Copying files to gcs: '+basePath+' from '+config.workflow.rootPath);
      await gcs.copy(config.workflow.rootPath, basePath);
    }

    logger.info('ImageUtils.imageToIaReader() complete');
  }

  /**
   * @method getNumPdfPages
   * @description Get the number of pages in a pdf file using shell pdfinfo.
   * 
   * @param {String} file 
   */
  async getNumPdfPages(file) {
    let localFile = await this.toLocalFile(file);
    let {stdout} = await exec(`pdfinfo ${file} | awk '/^Pages:/ {print $2}'`);
    
    // we copied the file in from gcs
    if( localFile !== file ) {
      await fs.unlink(localFile);
    }

    return parseInt(stdout);
  }

  /**
   * @method toLocalFile
   * @description If the file is located on gcs, copy to local space
   * 
   */
  async toLocalFile(file) {
    if( file.match(/^gs:\/\//) ) {
      let fileParts = path.parse(file);
      localFile = path.join(config.workflow.rootPath, fileParts.base);
      await gcs.copy(file, localFile);
      return localFile;
    }

    return file;
  }

}

module.exports = new ImageUtils();