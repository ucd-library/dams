const { logger } = require('@ucd-lib/fin-service-utils');
const kubectl = require('./lib/kubectl.js');
const config = require('./lib/config.js');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class CollectionImportModel {

  constructor() {
    this.kubectl = kubectl;
    this.collectionOverlaysPath = path.join(kubectl.k8sTemplatePath, config.k8s.collectionImport.templateName, 'overlays');
  }

  getName(collection) {
    if( !collection.match(/^import-/) ) {
      collection = 'import-'+collection;
    }
    return collection;
  }

  async delete(collection) {
    collection = this.getName(collection);
    return kubectl.delete('job', collection);
  }

  async import(collection, opts={}) {
    console.log('import', collection, opts);
    let {exists, executed} = await this.exists(collection);
    
    if( !exists ) {
      throw new Error('Collection does not exist: '+collection);
    }

    if( executed ) {
      if( !opts.force ) {
        throw new Error('Collection already importing/imported: '+collection);
      }
      await kubectl.delete('job', collection);
    }

    let templates = null;
    if( config.k8s.platform === 'docker-desktop' ) {
      let yamlStr = await kubectl.corkKubeApply(
        path.join(kubectl.k8sTemplatePath, config.k8s.collectionImport.templateName), {
        'local-dev' : '',
        'dry-run' : '',
        'quiet' : '',
        'overlay' : collection
      });
      templates = yamlStr.split('---\n').map(t => yaml.load(t));

      // update storage class and host path for local dev
      let pvc = templates.find(t => t.kind === 'PersistentVolumeClaim');
      pvc.spec.storageClassName = 'hostpath';

      // let pv = templates.find(t => t.kind === 'PersistentVolume');
      // pv.spec.storageClassName = 'hostpath';
      // pv.spec.hostPath.path = path.join(config.k8s.collectionImport.localDevHostPath, collection);
    } else {
      templates = await kubectl.renderKustomizeTemplate(
        config.k8s.collectionImport.templateName, 
        collection
      );
    }

    let job = templates.find(t => t.kind === 'Job');
    let importer = job.spec.template.spec.containers.find(c => c.name === 'importer');

    if( config.k8s.collectionImport.image ) {
      importer.image = config.k8s.collectionImport.image;
    }

    let finHostEnv = importer.env.find(e => e.name === 'FIN_URL');
    finHostEnv.value = config.k8s.collectionImport.url || config.server.url;
  
    if( opts.ignoreBinarySync ) {
      importer.env.push({
        name : 'IGNORE_BINARY_SYNC',
        value : 'true'
      });
    }

    let promises = [];

    for( let template of templates ) {
      promises.push(kubectl.apply(template, {
        stdin:true,
        isJson: true
      }));
    }

    return Promise.all(promises);
  }

  async get(collection) {
    collection = this.getName(collection);
    let job = await kubectl.get('job', collection);
    job.logs = await kubectl.logs('job', collection);
    return job;
  }

  async exists(collection) {
    let executed = false;
    let exists = false;

    await this.kubectl.init();

    try {
      let job = await this.kubectl.get('job', this.getName(collection));
      if( job ) executed = true;
    } catch(e) {}

    exists = fs.existsSync(
      path.join(this.collectionOverlaysPath, collection)
    );

    return {exists, executed};
  }

  async list() {
    let appliedJobs = await kubectl.get('jobs');
    appliedJobs = appliedJobs.items;
    // console.log('appliedJobs', appliedJobs);
    appliedJobs = appliedJobs.filter(job => job.metadata.name.match(/^import-/));
    let appliedJobNames = appliedJobs.map(job => job.metadata.name.replace('import-', ''));
    for( let job of appliedJobs ) {
      job.logs = await kubectl.logs('job', job.metadata.name);
    }

    let availableJobs = fs.readdirSync(this.collectionOverlaysPath);
    availableJobs = availableJobs.filter(job => appliedJobNames.includes(job) === false);

    let volumes = await kubectl.get('pvc');
    volumes = volumes.items
      .map(volume => volume.metadata.name)
      .filter(volume => volume.match(/^import-/))
      .map(volume => volume.replace('import-', '').replace('-volume-claim', ''));
    
    return {
      applied : appliedJobs,
      available : availableJobs,
      volumes
    }
  }

}

const inst = new CollectionImportModel();
module.exports = inst;