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
    this.initPdfToIaReaderWorkflow = this.initPdfToIaReaderWorkflow.bind(this);
  }

  unzip(file) {

  }

  /**
   * @method initPdfToIaReaderWorkflow
   * @description Setup the process of converting a pdf to IA Reader images and
   * ocr.  This function will, create a workflow directory in the provided bucket
   * and stream pdf there.
   * 
   * @param {*} pdfStream 
   */
  async initPdfToIaReaderWorkflow(pdfStream, filename, metadata) {
    let workflowInfo = await this.initWorkflow(pdfStream, filename, metadata);

    // TODO: check if sha256 match, if so, no-op unless force flag is set

    let pageCount = await this.getNumPdfPages(workflowInfo.localFile);

    workflowInfo.pageCount = pageCount;
    workflowInfo.metadata = metadata;
    workflowInfo.workflowMetadatafile = 'gs://'+path.join(config.workflow.gcsBuckets.products, metadata['fin-path'], 'ia', 'workflow.json');

    // write workflow file to both products folder and tmp folder
    await gcs.client.bucket(config.workflow.gcsBuckets.tmp)
      .file(path.join(workflowInfo.id, 'workflow.json'))
      .save(JSON.stringify(workflowInfo), {
        contentType : 'application/json'
      });

    await gcs.client.bucket(config.workflow.gcsBuckets.products)
      .file(path.join(metadata['fin-path'].replace(/^\//, ''), 'ia', 'workflow.json'))
      .save(JSON.stringify(workflowInfo), {
        contentType : 'application/json'
      });

    // this step only needed to read the number of pdf pages
    await fs.remove(workflowInfo.dir);

    return workflowInfo;
  }

  async runPdfToIaReaderPage(workflowId, page) {
    let workflowInfo = await this.getWorkflowInfo(workflowId);

    await fs.mkdirp(workflowInfo.dir);
    await gcs.getGcsFileObjectFromPath(workflowInfo.tmpGcsPath)
      .download({
        destination: workflowInfo.localFile
      })

    await this.imageToIaReader(workflowInfo.localFile, page);
    await fs.unlink(workflowInfo.localFile);
        
    let files = await fs.readdir(workflowInfo.dir);
    let sourceName = path.parse(workflowInfo.filename).name;
    let resultFiles = [];

    for( let file of files ) {
      let fileInfo = path.parse(file);
      let dstName = `${sourceName}-${page}${fileInfo.ext}`;

      logger.info('Copying file from '+path.join(workflowInfo.dir, file)+' to '+workflowInfo.productGcsFolder+'/ia/'+dstName);
      gcs.streamUpload(
        workflowInfo.productGcsFolder+'/ia/'+dstName,
        fs.createReadStream(path.join(workflowInfo.dir, file))
      );

      resultFiles.push(workflowInfo.productGcsFolder+'/ia/'+dstName);
    }
    
    await fs.remove(workflowInfo.dir);

    return resultFiles;
  }

  /**
   * @method initWorkflow
   * @description given a file stream and filename, this function will create a
   * a unique id for the workflow, create a directory in the tmp bucket, and
   * stream the file to the local directory for reading and processing.
   * 
   * @param {*} fileStream 
   * @param {*} filename 
   * @returns 
   */
  async initWorkflow(fileStream, filename, metadata) {
    let localFsStream = new PassThrough();
    let gcsStream = new PassThrough();
    let shaStream = new PassThrough();

    fileStream.pipe(localFsStream);
    fileStream.pipe(gcsStream);
    fileStream.pipe(shaStream);


    let id = uuid();
    let dir = path.join(config.workflow.rootPath, id);
    await fs.mkdirp(dir);

    let gcsPath = 'gs://'+path.join(config.workflow.gcsBuckets.tmp, id, filename);
    let localFile = path.join(dir, filename);

    let gcsPromise = gcs.streamUpload(gcsPath, gcsStream);
    let localFsPromise = this.writeFileStream(localFile, localFsStream);

    let hash = crypto.createHash('sha256');
    shaStream.on('data', (chunk) => hash.update(chunk));

    await Promise.all([gcsPromise, localFsPromise]);

    let sha256 = hash.digest('hex');

    return {
      id, 
      dir, 
      filename,
      tmpGcsPath: gcsPath,
      productGcsFolder : 'gs://'+path.join(config.workflow.gcsBuckets.products, metadata['fin-path']),
      localFile, 
      sha256
    };
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

  /**
   * @method writeFileStream
   * @description promise wrapper around a write stream
   * 
   * @param {String} filePath fs path to write to
   * @param {Object} stream file stream to write
   * @returns 
   */
  writeFileStream(filePath, stream) {
    return new Promise((resolve, reject) => {
      let writeStream = fs.createWriteStream(filePath)
        .on('close', resolve)
        .on('error', reject);
      stream.pipe(writeStream);
    });
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