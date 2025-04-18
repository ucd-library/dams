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
    return workflowInfo.data.tmpGcsPath.replace('gs://', this.TMP_DIR+'/');
  }

  /**
   * @method getNumPagesService
   * @description
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

  /**
   * @method getNumPdfPages
   * @description wrapper around pdfinfo to get number of pages in a pdf
   * 
   * @param {String} file path to pdf file 
   * @returns {Promise}
   */
  async getNumPdfPages(file) {
    // let {stdout, stderr} = await exec(`pdfinfo ${file} | awk '/^Pages:/ {print $2}'`);
    let {stdout, stderr} = await exec(`pdfinfo ${file}`);
    let lines = stdout.split('\n')
      .map(line => line.trim())
      .filter(line => line.match(/^Pages:/))
      .map(line => parseInt(line.replace(/^Pages:\s+/, '')));

    return lines[0];
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

  async runVideoToStream(workflowId, resolution) {
    console.log('runVideoToStream', workflowId, resolution);
    let workflowInfo = await this.getWorkflowInfo(workflowId);
    
    let localFile = this.getLocalFile(workflowInfo);
    let dir = path.parse(localFile).dir;
    let sourceName = path.parse(localFile).name;

    await fs.mkdirp(dir);
    await gcs.getGcsFileObjectFromPath(workflowInfo.data.tmpGcsPath)
      .download({
        destination: localFile
      });

    let {stdout, stderr} = await exec(`${__dirname}/ffmpeg/convert.sh ${localFile} ${resolution}`);

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
    let workflowInfo = await gcs.readFileToMemory('gs://'+path.join(config.workflow.gcsBuckets.tmp, workflowId, 'workflow.json'));
    return JSON.parse(workflowInfo);
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


  async processImage(workflowId, page) {
    let workflowInfo = await this.getWorkflowInfo(workflowId);
    let opts = workflowInfo.data.options || {};
    
    let baseGcsPath = 'gs://'+path.join(workflowInfo.data.gcsBucket, workflowInfo.data.finPath, workflowInfo.data.gcsSubpath);    

    let manifest = {};

    if( page !== undefined && page !== null ) {
      manifest.page = parseInt(page);
      page = '/'+page;
    } else {
      page = '';
    }

    let localFile = this.getLocalFile(workflowInfo);
    let dir = path.parse(localFile).dir;

    try {
      
      // let sourceName = path.parse(localFile).name;

      await fs.mkdirp(dir);
      await gcs.getGcsFileObjectFromPath(workflowInfo.data.tmpGcsPath)
        .download({
          destination: localFile
        });

      if( !localFile.match(/\.pdf$/) ) {
        manifest.original = {
          url : '/fcrepo/rest'+workflowInfo.data.finPath,
          size : await imageMagick.getImageDimensions(localFile)
        }
      }

      let sizesManifest = await this.generateImageSizes(localFile, page, workflowInfo, opts);

      // let people know which file we are using for ocr size
      let ocrManifest = await this.generateOcrFile(localFile, page, workflowInfo, config.imageSizes.sizes.large.ocrScale, opts);
      ocrManifest.ocr.size = sizesManifest.large.size;
      ocrManifest.ocr.imageSize = 'large';

      let tiledManifest;
      if( page === '' || page === '/0' ) {
        tiledManifest = await this.generateTiledImage(localFile, page, workflowInfo, opts);
      }
      if( !tiledManifest ) tiledManifest = {};

      manifest = Object.assign(manifest, sizesManifest, ocrManifest, tiledManifest);
      manifest.workflowParams = config.workflow.params;

      // TODO: setting metadata here doesn't seem to work.  Need to test.
      // Possibly need to use the setMetadata() method, however below is in documentation :(

      await gcs.getGcsFileObjectFromPath(baseGcsPath+page+'/manifest.json')
        .save(JSON.stringify(manifest), {
          contentType: 'application/json',
          metadata: {
            'fin-bucket-template' : 'BUCKET'
          }
        });
    } catch(e) {
      logger.error('process image failed', e);
    }

    // cleanup
    await fs.remove(dir);


    logger.info('ImageUtils.imageToIaReader() complete');
  }

  /**
   * @method generateImageSizes
   * 
   * @param {*} workflowId 
   */
  async generateImageSizes(localFile, page, workflowInfo, opts) {
    let manifest = {};
    let isPdf = localFile.match(/\.pdf$/);

    try {

      let baseGcsPath = 'gs://'+workflowInfo.data.gcsBucket+workflowInfo.data.finPath+'/'+workflowInfo.data.gcsSubpath+page;

      // compress image to jpeg
      for( let size in config.imageSizes.sizes ) {
        if( size === 'tiled' ) continue;
        let sizeConfig = config.imageSizes.sizes[size];
        let dstName = size+'.'+sizeConfig.outputFormat;
        
        let sizeFile = await this.runImageMagickCommand(localFile, page, size, sizeConfig);

        manifest[size] = {
          url : '/fcrepo/rest'+workflowInfo.data.finPath+'/svc:gcs/{{BUCKET}}/'+workflowInfo.data.gcsSubpath+page+'/'+dstName,
          size : await imageMagick.getImageDimensions(sizeFile)
        }

        let gcsPath = baseGcsPath+'/'+dstName;
        logger.info('Copying file from '+sizeFile+' to '+gcsPath);
        
        let uploadOpts = {
          contentType : 'image/'+sizeConfig.outputFormat
        };
        await gcs.streamUpload(
          gcsPath,
          fs.createReadStream(path.join(sizeFile)),
          uploadOpts
        );
      }
    } catch(e) {
      logger.error('Error generating image sizes: '+e);
      throw e;
    }

    return manifest;
  }

  async generateOcrFile(localFile, page, workflowInfo, ocrScale, opts={}) {
    logger.info('Generating OCR Ready Image for: '+localFile);

    let ocrImage = await this.runImageMagickCommand(localFile, page, 'ocr', config.ocr);
    // let ocrImage = await imageMagick.ocrReadyImage(localFile, page.replace(/\//g, ''));
    let ocrImageDim = await imageMagick.getImageDimensions(ocrImage);
  
    logger.info('Running OCR for: '+ocrImage);
    let ocrResult = await ocr.ocr({filepath: ocrImage, output: 'hocr'});

    let djvuFile = await hocrToDjvu(ocrResult.result, ocrScale, ocrImageDim);

    await fs.unlink(ocrResult.result);
    await fs.unlink(ocrImage);

    // keep the ocr img file as is, if we are uploading all files.
    // this is only for debugging

    let gcsPath = 'gs://'+workflowInfo.data.gcsBucket+workflowInfo.data.finPath+'/'+workflowInfo.data.gcsSubpath+page+'/ocr.djvu';

    logger.info('Copying file from '+djvuFile+' to '+gcsPath);
    let uploadOpts = {contentType : 'text/xml'};
    await gcs.streamUpload(
      gcsPath,
      fs.createReadStream(djvuFile),
      uploadOpts
    );

    logger.info('ImageUtils.ocrFile() complete');

    return {
      ocr : {
        url : '/fcrepo/rest'+workflowInfo.data.finPath+'/svc:gcs/{{BUCKET}}/'+workflowInfo.data.gcsSubpath+page+'/ocr.djvu',
      }
    }
  }

  async generateTiledImage(localFile, page, workflowInfo, opts={}) {
    let stats = fs.statSync(localFile);

    if( stats.size < config.imageSizes.sizes.tiled.minSize ) {
      logger.info('Skipping tiled image generation for '+localFile+' because it is too small.');
      return;
    }

    let dstName = 'tiled.'+config.imageSizes.sizes.tiled.outputFormat;
    let baseGcsPath = 'gs://'+workflowInfo.data.gcsBucket+workflowInfo.data.finPath+'/'+workflowInfo.data.gcsSubpath+page

    let sizeFile = await this.runImageMagickCommand(localFile, page, 'tiled', config.imageSizes.sizes.tiled);

    let gcsPath = baseGcsPath+'/'+dstName;
    logger.info('Copying file from '+sizeFile+' to '+gcsPath);
    
    let uploadOpts = {
      contentType : 'image/'+config.imageSizes.sizes.tiled.outputFormat
    };
    await gcs.streamUpload(
      gcsPath,
      fs.createReadStream(path.join(sizeFile)),
      uploadOpts
    );

    return {
      tiled : {
        url : '/fcrepo/rest'+workflowInfo.data.finPath+'/svc:gcs/{{BUCKET}}/'+workflowInfo.data.gcsSubpath+page+'/'+dstName,
        iiif : '/fcrepo/rest'+workflowInfo.data.finPath+'/svc:iiif/'+workflowInfo.data.gcsSubpath+page+'/'+dstName,
        size : await imageMagick.getImageDimensions(sizeFile)
      }
    }
  }

  async finalizePdf(workflowId) {
    let workflowInfo = await this.getWorkflowInfo(workflowId);
    let baseGcsPath = 'gs://'+workflowInfo.data.gcsBucket+workflowInfo.data.finPath+'/'+workflowInfo.data.gcsSubpath;

    let files = await gcs.listFiles(baseGcsPath, {subfolders: true});
    files = files[0];
  
    let iaManifest = {
      pages : []
    };

    // for( let file of files ) {
    //   let fileParts = path.parse(file.name);
    //   iaManifest.hashes[fileParts.base] = file.metadata.md5Hash;
    // }
    let re = new RegExp('images\/([0-9]+)\/manifest.json');
    for( let file of files ) {
      let fileParts = path.parse(file.name);
      if( !re.test(file.name) ) continue;
      if( fileParts.base !== 'manifest.json' ) continue;

      logger.info('concating gs://'+file.metadata.bucket+'/'+file.name);

      let t = (await gcs.readFileToMemory('gs://'+file.metadata.bucket+'/'+file.name)).toString('utf-8');
      let pageData = JSON.parse(t);

      // lookup the md5 hashes for file
      // pageData.md5Hashes = {
      //   jpg : iaManifest.hashes[fileParts.name+'.jpg'],
      //   djvu : iaManifest.hashes[fileParts.name+'.djvu']
      // };

      // pageData.width = parseInt(pageData.width);
      // pageData.height = parseInt(pageData.height);
      // pageData.page = parseInt(fileParts.name.split('-').pop());
      // pageData.path = '/fcrepo/rest'+workflowInfo.data.finPath+'/svc:gcs/{{BUCKET}}/'+workflowInfo.data.gcsSubpath+'/'+fileParts.name+'.jpg';
      iaManifest.pages.push(pageData);
    }

    // delete iaManifest.hashes;

    if( iaManifest.pages.length === 0 ) {
      logger.warn('No page files found.  Aborting');
      return;
    }

    iaManifest.pages.sort((a,b) => {
      return a.page - b.page;
    });

    await gcs.getGcsFileObjectFromPath(baseGcsPath+'/manifest.json')
      .save(JSON.stringify(iaManifest), {
        contentType: 'application/json',
        metadata: {
          'fin-bucket-template' : 'BUCKET'
        }
      });

    // for( let file of files ) {
    //   let fileParts = path.parse(file.name);
    //   if( fileParts.base === 'manifest.json' ) continue;

    //   if( fileParts.ext === '.json' ) {
    //     await file.delete();
    //   }
    // }
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

  /**
   * @method runImageMagickCommand
   * @description Run the imageMagick command for the given size.  This hides the fact that
   * pdfs are handled differently than images
   * 
   * @param {String} localFile file to convert 
   * @param {Number} page optional.  if pdf 
   * @param {String} outputBaseName base name for output file 
   * @param {Object} sizeConfig size configuration 
   * @returns {Promise}
   */
  async runImageMagickCommand(localFile, page, outputBaseName, sizeConfig) {
    let isPdf = localFile.match(/\.pdf$/);
    let sizeFile;

    if( isPdf ) {
      let opts = {
        outputFormat : sizeConfig.outputFormat,
        output : sizeConfig.output,
        outputBaseName : outputBaseName
      };

      let width = -1;
      for( let key in sizeConfig.imageMagick ) {
        if( key === 'resize' ) {
          width = parseInt(sizeConfig.imageMagick[key].replace('x', ''));
          continue;
        }
        opts[key] = sizeConfig.imageMagick[key];
      }

      sizeFile = await imageMagick.pdfPageToTiff(localFile, page, width, opts);
    } else {
      let fileInfo = path.parse(localFile);
      sizeFile = path.join(fileInfo.dir, outputBaseName+'.'+sizeConfig.outputFormat);

      // hack for tif files
      if( fileInfo.ext === '.tif' || fileInfo.ext === '.tiff' ) {
        localFile += '[0]';
      }

      let files = {
        input : localFile,
        output : sizeConfig.output ? sizeConfig.output+sizeFile : sizeFile
      }

      let cmd = imageMagick.prepareCmd(files, sizeConfig.imageMagick);
      logger.info('Running imagemagick command: '+cmd);
      let {stdout, stderr} = await exec(cmd);
      logger.info('Imagemagick command output: '+cmd, {stdout, stderr});
    }

    return sizeFile;
  }

}

module.exports = new ImageUtils();