const gcs = require('./gcs.js');
const path = require('path');
const fs = require('fs-extra');
const ocr = require('./ocr.js');
const exec = require('./exec.js');
const {logger, RDF_URIS} = require('@ucd-lib/fin-service-utils');

const imageMagick = require('./image-magick.js');
const config = require('./config.js');
const hocrToDjvu = require('./hocr-to-djvu.js');

class ImageUtils {

  constructor() {
    this.IMAGE_TYPES = ['.jpeg', '.png', '.tiff', '.jpg', '.tif', '.gif', '.bmp', '.webp'];
    this.TMP_DIR =  process.env.WORKFLOW_TMP_DIR || '/workflow';
    fs.mkdirp(this.TMP_DIR);
  }

  getLocalFile(workflowInfo) {
    return workflowInfo.data.tmpGcsPath.replace('gs://', this.TMP_DIR);
  }

  /**
   * @method getNumPagesService
   * 
   * @param {*} workflowId 
   */
  async getNumPagesService(workflowId) {
    let workflowInfo = await this.getWorkflowInfo(workflowId);

    let localFile = this.getLocalFile(workflowInfo);
    let dir = path.parse(localFile).dir;

    await fs.mkdirp(dir);
    await gcs.getGcsFileObjectFromPath(workflowInfo.data.tmpGcsPath)
      .download({
        destination: localFile
      })

    let pageCount = 0;

    if( localFile.match(/\.pdf$/) ) {
      pageCount = await this.getNumPdfPages(localFile);
    } else {
      pageCount = await this.getNumImgListPages(localFile, workflowInfo);
    }

    await fs.remove(dir);

    return pageCount;
  }

  async runToIaReaderPage(workflowId, page, opts={}) {
    let workflowInfo = await this.getWorkflowInfo(workflowId);
    
    let localFile = this.getLocalFile(workflowInfo);
    let dir = path.parse(localFile).dir;
    let sourceName = path.parse(localFile).name;

    await fs.mkdirp(dir);
    await gcs.getGcsFileObjectFromPath(workflowInfo.data.tmpGcsPath)
      .download({
        destination: localFile
      });

    if( !localFile.match(/\.pdf$/) ) {
      let node = await this.getNodeFromJsonLdFile(localFile, workflowInfo.data.finPath);
      if( !node ) throw new Error('Failed to find main node in jsonld file: '+localFile);

      let pageParts, pageName, pageDir, gcsTmpPagePath;

      if( node[RDF_URIS.PROPERTIES.HAS_PART] ) {
        page = node[RDF_URIS.PROPERTIES.HAS_PART][parseInt(page)];
        pageParts = page['@id'].split('/');
        pageName = pageParts.pop();
        pageDir = pageParts.pop();
        gcsTmpPagePath = 'gs://'+path.join(workflowInfo.data.tmpGcsBucket, pageDir, pageName);
      
      } else {
        // use file list of hasPart is not provided
        let files = (await gcs.listFiles(workflowInfo.data.tmpGcsPath))[0];
        let pageCount = 0;

        for( let file of files ) {
          if( this.IMAGE_TYPES.includes(path.parse(file.name).ext) ) {
            if( pageCount === parseInt(page) ) {
              pageName = file.name.split('/').pop();
              gcsTmpPagePath = 'gs://'+path.join(workflowInfo.data.tmpGcsBucket, file.name);
              break;
            }
            pageCount++;
          }
        }
      }

      await fs.unlink(localFile);
      localFile = path.join(this.TMP_DIR, pageName);
      sourceName = path.parse(pageName).name;
      dir = path.parse(localFile).dir;

      await gcs.getGcsFileObjectFromPath(gcsTmpPagePath)
      .download({
        destination: localFile
      });

      await this.imageToIaReader(localFile, null, opts);

    } else {
      await this.imageToIaReader(localFile, page, opts);
    }

    
    await fs.unlink(localFile);
        
    let files = await fs.readdir(dir);
    let resultFiles = [];

    for( let file of files ) {
      let fileInfo = path.parse(file);

      let dstName = `${sourceName}-${page}${fileInfo.ext}`;
      if( !localFile.match(/\.pdf$/) ) {
        dstName = `${sourceName}${fileInfo.ext}`;
      }

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

  async runVideoToStream(workflowId) {
    let workflowInfo = await this.getWorkflowInfo(workflowId);
    
    let localFile = this.getLocalFile(workflowInfo);
    let dir = path.parse(localFile).dir;
    let sourceName = path.parse(localFile).name;

    await fs.mkdirp(dir);
    await gcs.getGcsFileObjectFromPath(workflowInfo.data.tmpGcsPath)
      .download({
        destination: localFile
      });

    let {stdout, stderr} = await exec(`${__dirname}/ffmpeg/convert.sh ${localFile}`);

    await fs.unlink(localFile);
        
    dir = path.join(dir, 'stream');
    let files = await fs.readdir(dir);
    let resultFiles = [];

    for( let file of files ) {
      let uploadOpts = {};
      let gcsPath = 'gs://'+workflowInfo.data.gcsBucket+workflowInfo.data.finPath+'/'+workflowInfo.data.gcsSubpath+'/'+file;

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

  async getNumImgListPages(file, workflowInfo={}) {
    if( !workflowInfo.data ) workflowInfo.data = {};
    let node = await this.getNodeFromJsonLdFile(file, workflowInfo.data.finPath);

    let pageCount = 0;
    if( !node ) return pageCount;

    if( node[RDF_URIS.PROPERTIES.HAS_PART] ) {
      return (node[RDF_URIS.PROPERTIES.HAS_PART] || []).length;
    }

    let files = (await gcs.listFiles(workflowInfo.data.tmpGcsPath))[0];
    files.forEach(file => {
      if( this.IMAGE_TYPES.includes(path.parse(file.name).ext) ) pageCount++;
    });

    return pageCount;
  };

  async getNodeFromJsonLdFile(file, finPath) {
    let jsonld = JSON.parse(await fs.readFile(file, 'utf8'));
    if( jsonld['graph'] ) jsonld = jsonld['graph'];
    if( !Array.isArray(jsonld) ) jsonld = [jsonld];

    return jsonld.find(n => n['@id'] === 'info:fedora'+finPath || n['@id'] === '');
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
      data : [],
      hashes : {}
    };

    for( let file of files ) {
      let fileParts = path.parse(file.name);
      iaManifest.hashes[fileParts.base] = file.metadata.md5Hash;
    }

    for( let file of files ) {
      let fileParts = path.parse(file.name);
      if( fileParts.base === 'manifest.json' ) continue;

      if( fileParts.ext === '.json' ) {
        let t = (await gcs.readFileToMemory(baseGcsPath+'/'+fileParts.base)).toString('utf-8');
        let pageData = JSON.parse(t);

        // lookup the md5 hashes for file
        pageData.md5Hashes = {
          jpg : iaManifest.hashes[fileParts.name+'.jpg'],
          djvu : iaManifest.hashes[fileParts.name+'.djvu']
        };

        pageData.width = parseInt(pageData.width);
        pageData.height = parseInt(pageData.height);
        pageData.page = parseInt(fileParts.name.split('-').pop());
        pageData.path = '/fcrepo/rest'+workflowInfo.data.finPath+'/svc:gcs/'+file.bucket.name+'/'+workflowInfo.data.gcsSubpath+'/'+fileParts.name+'.jpg';
        iaManifest.data.push(pageData);
      }
    }

    delete iaManifest.hashes;

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
      if( fileParts.base === 'manifest.json' ) continue;

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