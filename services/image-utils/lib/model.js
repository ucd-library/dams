const gcs = require('./gcs.js');
const path = require('path');
const fs = require('fs-extra');
const ocr = require('./ocr.js');
const exec = require('./exec.js');
const {logger} = require('@ucd-lib/fin-service-utils');

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

  async runPdfToIaReaderPage(workflowId, page, opts={}) {
    let workflowInfo = await this.getWorkflowInfo(workflowId);
    
    let localFile = this.getLocalFile(workflowInfo);
    let dir = path.parse(localFile).dir;
    let sourceName = path.parse(localFile).name;

    await fs.mkdirp(dir);
    await gcs.getGcsFileObjectFromPath(workflowInfo.data.tmpGcsPath)
      .download({
        destination: localFile
      });

    // create the pageCount file when we run the first page
    // if( page+'' === '0' ) {
    //   let pageCount = await this.getNumPdfPages(localFile);
    //   let pageCountFile = path.join(dir, 'page-count.txt');
    //   await fs.writeFile(pageCountFile, pageCount+'');

    //   let gcsPath = 'gs://'+workflowInfo.data.gcsBucket+workflowInfo.data.finPath+'/ia/page-count.txt';

    //   await gcs.streamUpload(
    //     gcsPath,
    //     fs.createReadStream(pageCountFile)
    //   );

    //   await fs.unlink(pageCountFile);
    // }

    await this.imageToIaReader(localFile, page, opts);
    await fs.unlink(localFile);
        
    let files = await fs.readdir(dir);
    let resultFiles = [];

    for( let file of files ) {
      let fileInfo = path.parse(file);
      let dstName = `${sourceName}-${page}${fileInfo.ext}`;
      let uploadOpts = {};

      if( fileInfo.ext === '.djvu' ) {
        uploadOpts.contentType = 'text/xml';
      }

      // keep the ocr img file as is, if we are uploading all files.
      // this is only for debugging
      if( fileInfo.base.match(/-ocr-ready.*\.jpg$/) ) {
        dstName = file;
      }

      let gcsPath = 'gs://'+workflowInfo.data.gcsBucket+workflowInfo.data.finPath+'/'+workflowInfo.data.gcsSubpath+'/'+dstName;

      logger.info('Copying file from '+path.join(dir, file)+' to '+gcsPath);
      await gcs.streamUpload(
        gcsPath,
        fs.createReadStream(path.join(dir, file)),
        uploadOpts
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
    let aiImageDim = await imageMagick.getImageDimensions(aiImage.output);

    let iaImageInfo = path.parse(aiImage.output);
    await fs.writeFileSync(
      path.join(iaImageInfo.dir, iaImageInfo.name+'.json'), 
      JSON.stringify(aiImageDim)
    );

    logger.info('Running OCR for: '+ocrImage.output);
    let ocrResult = await ocr.ocr({filepath: ocrImage.output, output: 'hocr'});

    await hocrToDjvu(ocrResult.result, config.iaReader.ocrScale, aiImageDim);

    if( opts.keepTmpFiles !== true ) {
      await fs.unlink(ocrResult.result);
      await fs.unlink(ocrImage.output);
    }

    logger.info('ImageUtils.imageToIaReader() complete');
  }

  async finalizeAiReader(workflowId) {
    let workflowInfo = await this.getWorkflowInfo(workflowId);

    let baseGcsPath = 'gs://'+workflowInfo.data.gcsBucket+workflowInfo.data.finPath+'/'+workflowInfo.data.gcsSubpath;
    let files = await gcs.listFiles('gs://'+workflowInfo.data.gcsBucket+workflowInfo.data.finPath+'/'+workflowInfo.data.gcsSubpath);
    files = files[0];

    let iaManifest = {
      data : []
    };

    for( let file of files ) {
      let fileParts = path.parse(file.name);
      if( fileParts.base === 'manifest.json' ) continue;

      if( fileParts.ext === '.json' ) {
        let t = (await gcs.readFileToMemory(baseGcsPath+'/'+fileParts.base)).toString('utf-8');
        let pageData = JSON.parse(t);

        pageData.width = parseInt(pageData.width);
        pageData.height = parseInt(pageData.height);
        pageData.page = parseInt(fileParts.name.split('-').pop());
        pageData.path = '/fcrepo/rest'+workflowInfo.data.finPath+'/svc:gcs/'+file.bucket.name+'/'+workflowInfo.data.gcsSubpath+'/'+fileParts.name+'.jpg';
        iaManifest.data.push(pageData);
      }

    }

    if( iaManifest.data.length === 0 ) {
      console.log('No page files found.  Aborting');
      return;
    }

    iaManifest.data.sort((a,b) => {
      return a.page - b.page;
    });

    await gcs.getGcsFileObjectFromPath(baseGcsPath+'/manifest.json')
      .save(JSON.stringify(iaManifest), {
        contentType: 'application/json'
      });

    for( let file of files ) {
      let fileParts = path.parse(file.name);
      if( fileParts.ext === '.json' ) {
        await file.delete();
      }
    }
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