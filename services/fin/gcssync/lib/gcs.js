const api = require('@ucd-lib/fin-api');
const {RDF_URIS, config, logger} = require('@ucd-lib/fin-service-utils');
const {Storage} = require('@google-cloud/storage');
const crypto = require('crypto');

// For more information on ways to initialize Storage, please see
// https://googleapis.dev/nodejs/storage/latest/Storage.html


// Creates a client using Application Default Credentials
const storage = new Storage();

class GcsWrapper {

  constructor() {
    this.JSON_LD_EXTENTION = '.jsonld.json';

    // omit these properties for jsonld stored in gcs
    this.OMIT = [
      'http://www.w3.org/ns/ldp#PreferMembership',
      'http://www.w3.org/ns/ldp#PreferContainment',
      'http://fedora.info/definitions/fcrepo#PreferInboundReferences',
      'http://fedora.info/definitions/fcrepo#ServerManaged'
    ]
  }

  /**
   * @method syncToGcs
   * @description given base fin path, sync all child (contains) containers to gcs
   * 
   * @param {String} finPath
   * @param {String} gcsBucket
   * 
   * @return {Promise}
   */
  async syncToGcs(finPath, gcsBucket) {
    let gcsFile = 'gs://'+gcsBucket+finPath;
    let fcrepoContainer = await this.syncContainerToGcs(finPath, gcsFile);

    if( !Array.isArray(fcrepoContainer) ) {
      fcrepoContainer = [fcrepoContainer];
    }

    for( let node of fcrepoContainer ) {
      if( !node[RDF_URIS.PROPERTIES.CONTAINS] ) continue;

      for( let child of node[RDF_URIS.PROPERTIES.CONTAINS] ) {
        let childFinPath = child['@id'].split(api.getConfig().fcBasePath)[1];
        await this.syncToGcs(childFinPath, gcsBucket);
      }
    }
  }

  async syncToFcrepo(finPath, gcsBucket, ignoreRootFile=false) {
    let gcsPath = 'gs://'+gcsBucket+finPath;

    let {files, folders} = await this.getGcsFilesInFolder(gcsPath);

    // group together files and folders with there metadata
    let grouping = {};

    // set all folders first
    for( let folder of folders ) {
      let name = folder.replace(/\/$/, '').split('/').pop();
      grouping[name] = {
        path : '/'+folder,
        dir: true
      }
    }

    // find a files that are not metadata and match to files/folders.
    for( let file of files ) {
      if( file.name.endsWith(this.JSON_LD_EXTENTION) ) continue;
      let name = file.name.split('/').pop();

      if( grouping[name] ) {
        grouping[name].metadata = file;
      } else {
        // check to see if there is a jsonld file for this file
        let metadataFilename = name+this.JSON_LD_EXTENTION;
        let metadataFile = files.find(file => file.name.endsWith('/'+metadataFilename));

        if( metadataFile ) {
          grouping[name] = {
            path : '/'+file.name,
            file : file,
            metadata : metadataFile
          }
        } else {
          grouping[name] = {
            path : '/'+file.name,
            file : file,
            metadata : metadataFile
          }
        }        
      }
    }

    // now put all files
    for( let item in grouping ) {
      if( grouping[item].dir === true ) continue;
      
      await this.syncBinaryToFcrepo(grouping[item]);
    }

    // finally loop through all folders
    for( let item in grouping ) {
      if( grouping[item].dir !== true ) continue;
      
      if( grouping[item].metadata ) {
        await this.syncContainerToFcrepo(grouping[item]);
      }

      await this.syncToFcrepo(grouping[item].path, gcsBucket, true);
    }


    // let gcsMetadata = await this.getGcsFileMetadata(gcsFile);
    
    // // is the gcsmetadata a file?
    // if( !gcsMetadata.name.endsWith('/') ) {

    // }

    // let fcrepoContainer = await this.getFcrepoContainer(fcrepoPath);
    // gcsFile = await this.getGcsFileMetadata(gcsFile);

    // // if md5 match, return
    // if( this.isMd5Match(fcrepoContainer, gcsFile) ) {
    //   return;
    // }
  }

  /**
   * @method syncContainerToGcs
   * @description check if md5 hash of fcrepo file matches md5 hash of gcs file
   * 
   * @returns {Object} fcrepo container
   */
  async syncContainerToGcs(finPath, gcsFile) {
    // fetch the fcrepo container
    let fcrepoContainer = await this.getFcrepoContainer(finPath);
    
    // look for a binary node in fcrepo response
    let binaryNode = api.io.utils.getGraphNode(fcrepoContainer, RDF_URIS.TYPES.BINARY);

    // if binary, stream upload to gcs
    if( binaryNode ) {
      await this.syncBinaryToGcs(finPath, fcrepoContainer, gcsFile);
    } else {
      await this.syncMetadataToGcs(finPath, gcsFile);
    }

    return fcrepoContainer;
  }

  /**
   * @method syncBinaryToGcs
   * @description sync binary to gcs.  This will sync the /fcr:metadata as well
   * 
   * @param {String} finPath
   * @param {Object} fcrepoContainer fcrepo fcr:metadata response for binary 
   * @param {Object} gcsFile 
   */
  async syncBinaryToGcs(finPath, fcrepoContainer, gcsFile) {
    let gcsMetadata = await this.getGcsFileMetadata(gcsFile);

    let binaryNode = api.io.utils.getGraphNode(fcrepoContainer, RDF_URIS.TYPES.BINARY);

    if( this.isBinaryMd5Match(binaryNode, gcsMetadata) ) {
      logger.info('md5 match, ignoring sync', finPath, gcsFile);
    } else {
      logger.info('syncing container to gcs', finPath, gcsFile);

      // stream upload to gcs
      let result = await api.get({
        path : finPath,
        writeStream : this.getGcsFileObjectFromPath(gcsFile).createWriteStream({
          contentType : binaryNode[RDF_URIS.PROPERTIES.HAS_MIME_TYPE][0]['@value'],
          metadata : {
            contentDisposition : 'attachment; filename="'+binaryNode[RDF_URIS.PROPERTIES.FILENAME][0]['@value']+'"'
          }
        }),
        host : config.fcrepo.host,
        superuser : true,
        directAccess : true
      });
      if( result.last.statusCode !== 200 ) {
        throw new Error('Error streaming upload to gcs: '+result.last.statusCode);
      }
    }

    // // no remove the binary node from the fcrepo container
    // // all other nodes will be uploaded as jsonld and have a new md5 hash property
    // let index = fcrepoContainer.findIndex(node => node === binaryNode);
    // fcrepoContainer.splice(index, 1);

    await this.syncMetadataToGcs(finPath+'/fcr:metadata', gcsFile+this.JSON_LD_EXTENTION);
  }

  async syncBinaryToFcrepo(item) {
    let gcsFile = 'gs://'+item.file.metadata.bucket+'/'+item.file.name;

    // check md5 hash
    let fcrepoContainer;
    let binaryNode;
    try {
      fcrepoContainer = await this.getFcrepoContainer(item.path+'/fcr:metadata');
      binaryNode = fcrepoContainer.find(node => node['@type'].includes(RDF_URIS.TYPES.BINARY));
    } catch(e) {}
    

    if( !this.isBinaryMd5Match(binaryNode, item.file.metadata) ) {
      logger.info('syncing binary to fcrepo', item.path, gcsFile);

      let result = await api.put({
        path : item.path,
        body : item.file.createReadStream(),
        headers : {
          'Content-Type' : item.file.metadata.contentType,
          'Content-Disposition' : item.file.metadata.contentDisposition,
          digest : 'md5='+Buffer.from(item.file.metadata.md5Hash, 'base64').toString('hex')
        },
        host : config.fcrepo.host,
        partial : true,
        superuser : true,
        directAccess : true
      });

      if( result.last.statusCode >= 400 ) {
        throw new Error('Error streaming upload to fcrepo: '+result.last.statusCode);
      }
    } else {
      logger.info('md5 match, ignoring sync', item.path, gcsFile)
    }

    
    if( !item.metadata ) return;

    gcsFile = 'gs://'+item.file.metadata.bucket+'/'+item.metadata.name;
    fcrepoContainer = null;

    try {
      fcrepoContainer = await this.getFcrepoContainer(item.path+'/fcr:metadata', true);
      fcrepoContainer = JSON.stringify(fcrepoContainer);
    } catch(e) {}

    if( !this.isMetadataMd5Match(fcrepoContainer, item.metadata.metadata) ) {
      logger.info('syncing binary metadata to fcrepo', item.path+'/fcr:metadata', gcsFile);

      let result = await api.put({
        path : item.path+'/fcr:metadata',
        body : item.metadata.createReadStream(),
        partial : true,
        headers : {
          'Content-Type' : api.RDF_FORMATS.JSON_LD
        },
        host : config.fcrepo.host,
        superuser : true,
        directAccess : true
      });

      if( result.last.statusCode >= 400 ) {
        throw new Error('Error streaming upload to fcrepo: '+result.last.statusCode);
      }
    } else {
      logger.info('md5 match, ignoring sync', item.path+'/fcr:metadata', gcsFile)
    }
  }

  async syncContainerToFcrepo(item) {
    let gcsFile = 'gs://'+item.metadata.metadata.bucket+'/'+item.metadata.name;
    let fcrepoContainer = null;

    try {
      fcrepoContainer = await this.getFcrepoContainer(item.path, true);
      fcrepoContainer = JSON.stringify(fcrepoContainer);
    } catch(e) {}

    if( !this.isMetadataMd5Match(fcrepoContainer, item.metadata.metadata, true) ) {
      logger.info('syncing container to fcrepo', item.path, gcsFile);

      let result = await api.put({
        path : item.path,
        body : item.metadata.createReadStream(),
        host : config.fcrepo.host,
        headers : {
          'Content-Type' : api.RDF_FORMATS.JSON_LD
        },
        superuser : true,
        directAccess : true
      });

      if( result.last.statusCode !== 201 ) {
        throw new Error('Error streaming upload to fcrepo: '+result.last.statusCode+': '+result.last.body);
      }
    } else {
      logger.info('md5 match, ignoring sync', item.path, gcsFile)
    }
  }

  /**
   * @method syncMetadataToGcs
   * @description sync fcrepo fcr:metadata or container to gcs
   * 
   * @param {String} finPath path to fcrepo resource 
   * @param {Object} fcrepoContainer graph for container
   * @param {String} gcsFile full gcs file path
   * 
   * @returns {Promise}
   */
  async syncMetadataToGcs(finPath, gcsFile) {
    let gcsMetadata = await this.getGcsFileMetadata(gcsFile);

    let fcrepoContainer = await this.getFcrepoContainer(finPath, true);

    let fileContent = JSON.stringify(fcrepoContainer);
    if( this.isMetadataMd5Match(fileContent, gcsMetadata) ) {
      logger.info('md5 match, ignoring sync', finPath, gcsFile);
      return;
    }

    logger.info('syncing container to gcs', finPath, gcsFile);
    
    // upload file to gcs
    await this.getGcsFileObjectFromPath(gcsFile).save(fileContent, {
      contentType : 'application/json'
    });
  }

  /**
   * @method getFilesInFolder
   * @description get files in a gcs folder
   * 
   * @param {String} bucketName 
   * @param {String} folderName 
   * @returns 
   */
  async getGcsFilesInFolder(gcsFile) {
    const bucket = storage.bucket(gcsFile.split('/')[2]);
    let folderName = gcsFile.split('/').slice(3).join('/');

    if( folderName && !folderName.endsWith('/') ) {
      folderName += '/';
    }

    let response = await bucket.getFiles({
      prefix : folderName,
      delimiter : '/',
      autoPaginate: false
    });

    return {
      files : response[0],
      folders : response[2].prefixes || []
    }
  }


  getGcsFileObjectFromPath(gcsFile) {
    return storage.bucket(gcsFile.split('/')[2])
      .file(gcsFile.split('/').slice(3).join('/'));
  }

  async getGcsFileMetadata(gcsFile) {
    if( typeof gcsFile === 'string') {
      gcsFile = this.getGcsFileObjectFromPath(gcsFile);

      try {
        gcsFile = (await gcsFile.getMetadata())[0];
      } catch(e) {
        return null;
      }
    }
    return gcsFile;
  }

  /**
   * @method getFcrepoContainer
   * 
   * @param {String} finPath 
   * @param {String} storageFormat should the container have server managed triples removed as well as 
   *                  the root uri replaced with info:fedora 
   * @returns 
   */
  async getFcrepoContainer(finPath, storageFormat=false) {
    let headers = {};

    if( storageFormat ) {
      headers = {
        Prefer : `return=representation; omit="${this.OMIT.join(' ')}"`
      }
    }

    let response = await api.metadata({
      path: finPath,
      headers,
      host : config.fcrepo.host,
      superuser : true,
      directAccess : true
    });

    if( response.last.statusCode !== 200 ) {
      throw new Error('Unable to get fcrepo container: '+finPath);
    }

    let container = JSON.parse(response.last.body);
    if( storageFormat ) {
      let baseUrl = config.fcrepo.host+api.getConfig().fcBasePath;

      for( let node of container ) {
        if( !node['@id'] ) continue;
        if( !node['@id'].startsWith(baseUrl) ) continue;
        node['@id'] = node['@id'].replace(baseUrl, 'info:fedora');
      }
    }

    return container;
  }

  isBinaryMd5Match(fcrepoContainer, gcsFile) {
    if( !fcrepoContainer || !gcsFile ) return false;

    if( !fcrepoContainer[RDF_URIS.PROPERTIES.HAS_MESSAGE_DIGEST] ) return false;

    let md5 = fcrepoContainer[RDF_URIS.PROPERTIES.HAS_MESSAGE_DIGEST].find(item => item['@id'].startsWith('urn:md5:'));
    
    let md5Base64 = Buffer.from(md5['@id'].replace(/^urn:md5:/, ''), 'hex').toString('base64');

    if( md5Base64 === gcsFile.md5Hash ) {
      return true;
    }
    return false;
  }

  isMetadataMd5Match(fileContent, gcsFile) {
    if( !fileContent || !gcsFile ) return false;

    let md5 = crypto.createHash('md5');
    md5.update(fileContent);
    md5 = md5.digest('base64');

    if( md5 === gcsFile.md5Hash ) {
      return true;
    }
    return false;
  }

}

const gcs = new GcsWrapper();
// gcs.syncToGcs('/item', 'dams-client-products');
// gcs.syncContainerToGcs('/item/ark:/pets/ashley', 'gcs://dams-client-products/item/ark:/pets/ashley');
// gcs.syncToFcrepo('/item', 'dams-client-products');
gcs.syncToFcrepo('/item/ark:/87287/d7dw8t', 'dams-client-products');