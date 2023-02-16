const gcs = require('./gcs.js');
const path = require('path');
const fs = require('fs-extra');
const ocr = require('./ocr.js');
const exec = require('./exec.js');
const {logger} = require('@ucd-lib/fin-service-utils');
const uuid = require('uuid/v4');
const crypto = require('crypto');
const {PassThrough} = require('stream');

const imageMagick = require('./image-magick.js');
const config = require('./config.js');
const hocrToDjvu = require('./hocr-to-djvu.js');

class ImageUtils {

  constructor() {
    this.TMP_DIR =  process.env.WORKFLOW_TMP_DIR || '/workflow';
  }

  unzip(file) {

  }

  getLocalFile(workflowInfo) {
    return workflowInfo.data.tmpGcsPath.replace('gs://', this.TMP_DIR);
  }

  /**
   * @method initPdfToIaReaderWorkflow
   * @description Setup the process of converting a pdf to IA Reader images and
   * ocr.  This function will, create a workflow directory in the provided bucket
   * and stream pdf there.
   * 
   * @param {*} pdfStream 
   */
  async getNumPdfPagesService(workflowId) {
    let workflowInfo = await this.getWorkflowInfo(workflowId);

    let localFile = this.getLocalFile(workflowInfo);
    let dir = path.parse(localFile).dir;

    await fs.mkdirp(dir);
    await gcs.getGcsFileObjectFromPath(workflowInfo.data.tmpGcsPath)
      .download({
        destination: localFile
      })

    let pageCount = await this.getNumPdfPages(localFile);

    await fs.remove(dir);

    return pageCount;
  }

  async runPdfToIaReaderPage(workflowId, page) {
    let workflowInfo = await this.getWorkflowInfo(workflowId);
    
    let localFile = this.getLocalFile(workflowInfo);
    let dir = path.parse(localFile).dir;
    let sourceName = path.parse(localFile).name;

    await fs.mkdirp(dir);
    await gcs.getGcsFileObjectFromPath(workflowInfo.data.tmpGcsPath)
      .download({
        destination: localFile
      })

    await this.imageToIaReader(localFile, page);
    await fs.unlink(localFile);
        
    let files = await fs.readdir(dir);
    let resultFiles = [];

    for( let file of files ) {
      let fileInfo = path.parse(file);
      let dstName = `${sourceName}-${page}${fileInfo.ext}`;

      let gcsPath = 'gs://'+workflowInfo.data.gcsBucket+workflowInfo.data.finPath+'/ia/'+dstName;

      logger.info('Copying file from '+path.join(dir, file)+' to '+gcsPath);
      await gcs.streamUpload(
        gcsPath,
        fs.createReadStream(path.join(dir, file))
      );

      resultFiles.push(gcsPath);
    }
    
    await fs.remove(dir);

    return resultFiles;
  }


  async cleanupWorkflow(workflowId) {
    await gcs.cleanFolder(config.workflow.gcsBuckets.tmp, workflowId);
  }

  async getWorkflowInfo(workflowId) {
    let workflowInfo = await gcs.readFileToMemory('gc://'+path.join(config.workflow.gcsBuckets.tmp, workflowId, 'workflow.json'));
    return JSON.parse(workflowInfo);
  }

  /**
   * @method getNumPdfPages
   * @description wrapper around pdfinfo to get number of pages in a pdf
   * 
   * @param {String} file path to pdf file 
   * @returns {Promise}
   */
  async getNumPdfPages(file) {
    let {stdout, stderr} = await exec(`pdfinfo ${file} | awk '/^Pages:/ {print $2}'`);
    return parseInt(stdout.trim());
  }


  async imageToIaReader(file, page, opts={}) {
    let localFile = await this.toLocalFile(file);

    logger.info('Generating OCR Ready Image for: '+localFile);
    let ocrImage = await imageMagick.ocrReadyImage(localFile, page);

    logger.info('Generating IA Reader Image for: '+localFile);
    let aiImage = await imageMagick.iaReaderImage(localFile, page);

    logger.info('Running OCR for: '+ocrImage.output);
    let ocrResult = await ocr.ocr({filepath: ocrImage.output, output: 'hocr'});

    await hocrToDjvu(ocrResult.result, config.iaReader.ocrScale);

    await fs.unlink(ocrResult.result);
    await fs.unlink(ocrImage.output);

    logger.info('ImageUtils.imageToIaReader() complete');
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