const config = require('./config');
const gcs = require('./gcs');
const path = require('path');
const fs = require('fs-extra');


/**
 * @class WorkflowServiceUtils
 * @description Utility class for workflow.  Contains methods for interacting
 * with gcs; both the tmp and final buckets.
 */
class WorkflowServiceUtils {

  /**
   * @method getWorkflowInfo
   * @description Get workflow information from GCS given a workflow ID.
   * 
   * @param {String} workflowId 
   * @returns 
   */
  async getWorkflowInfo(workflowId) {
    let workflowInfo = await gcs.readFileToMemory(
      'gs://'+path.join(config.workflow.gcsBuckets.tmp, workflowId, 'workflow.json')
    );
    return JSON.parse(workflowInfo);
  }

  getLocalFile(workflowInfo) {
    return workflowInfo.data.tmpGcsPath.replace('gs://', config.tmpDir+'/');
  }

  getGcsBasePath(workflowInfo) {
    return 'gs://'+path.join(
      workflowInfo.data.gcsBucket, 
      workflowInfo.data.finPath, 
      workflowInfo.data.gcsSubpath
    );
  }

  /**
   * @method fetchTmpFile
   * @description Fetch the main file to be processed from the tmp GCS bucket.
   * Return the files local path.
   * 
   * @param {String} workflowId 
   * @returns 
   */
  async fetchTmpFile(workflowId) {
    let workflowInfo = await this.getWorkflowInfo(workflowId);
  
    let localFile = this.getLocalFile(workflowInfo);
    let dir = path.parse(localFile).dir;
  
    await fs.mkdirp(dir);
    await gcs.getGcsFileObjectFromPath(workflowInfo.data.tmpGcsPath)
      .download({
        destination: localFile
      })
  
    return localFile;
  }

  /**
   * @method finalizePdfWorkflow
   * @description Finalize the PDF workflow by concatenating all the page manifests into a single
   * root manifest.
   * 
   * @param {String} workflowId 
   * @returns {Promise}
   */
  async finalizePdfWorkflow(workflowId) {
    let workflowInfo = await this.getWorkflowInfo(workflowId);
    let baseGcsPath = 'gs://'+workflowInfo.data.gcsBucket+workflowInfo.data.finPath+'/'+workflowInfo.data.gcsSubpath;

    let files = await gcs.listFiles(baseGcsPath, {subfolders: true});
    files = files[0];
  
    let iaManifest = {
      pages : []
    };


    let re = new RegExp('images\/([0-9]+)\/manifest.json');
    for( let file of files ) {
      let fileParts = path.parse(file.name);
      if( !re.test(file.name) ) continue;
      if( fileParts.base !== 'manifest.json' ) continue;

      logger.info('concating gs://'+file.metadata.bucket+'/'+file.name);

      let t = (await gcs.readFileToMemory('gs://'+file.metadata.bucket+'/'+file.name)).toString('utf-8');
      let pageData = JSON.parse(t);
      iaManifest.pages.push(pageData);
    }

    if( iaManifest.pages.length === 0 ) {
      logger.warn('No page files found.  Aborting');
      return iaManifest;
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

    return iaManifest;
  }
}

const inst = new WorkflowServiceUtils();
module.exports = inst;