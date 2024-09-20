import {logger} from '@ucd-lib/fin-service-utils';
import kubectl from './lib/kubectl.js'
import config from './lib/config.js'
import fs from 'fs';
import path from 'path';

class CollectionImportModel {

  constructor() {
    this.kubectl = new kubectl();
  }

  async delete(collection) {
    return kubectl.delete('job', collection);
  }

  async import(collection, opts={}) {
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
        '--local-dev' : '',
        '--debug' : '',
        '--output' : 'quiet',
        '--overlay' : collection
      });
      templates = yamlStr.split('---\n').map(t => yaml.load(t));

      // update storage class and host path for local dev
      let pvc = templates.find(t => t.kind === 'PersistentVolumeClaim');
      pvc.spec.storageClassName = 'hostpath';

      let pv = templates.find(t => t.kind === 'PersistentVolume');
      pv.spec.storageClassName = 'hostpath';
      pv.spec.hostPath.path = path.join(config.k8s.collectionImport.localDevHostPath, collection);
    } else {
      templates = await kubectl.renderKustomizeTemplate(
        config.k8s.collectionImport.templateName, 
        collection
      );
    }

    let job = templates.filter(t => t.kind === 'Job');
    let importer = job.spec.template.spec.containers.find(c => c.name === 'importer');
    if( config.k8s.collectionImport.image ) {
      importer.image = config.k8s.collectionImport.image;
    }

    let finHostEnv = importer.env.find(e => e.name === 'FIN_HOST');
    finHostEnv.value = config.k8s.collectionImport.url || config.server.url;
  
    importer.env.push({
      name : 'COLLECTION_NAME',
      value : collection
    });

    let promises = [];

    for( let template of templates ) {
      promises.push(kubectl.apply(template, {
        stdin:true,
        isJson: true
      }));
    }

    return Promise.all(promises);
  }

  get(collection) {
    return kubectl.get('job', collection);
  }

  async exists(collection) {
    let executed = false;
    let exists = false;

    await this.kubectl.init();

    let jobs = await this.kubectl.getJobs();
    for( let job of jobs ) {
      if( job.metadata.name === collection ) {
        executed = true;
        break;
      }
    }

    exists = fs.existsSync(
      path.join(kubectl.k8sTemplatePath, collection)
    );

    return {exists, executed};
  }

  async list() {
    let appliedJobs = await kubectl.getJobs();
    appliedJobs = appliedJobs.map(job => job.metadata.name.match(/^import-/));
    let availableJobs = fs.readdirSync(kubectl.k8sTemplatePath, config.k8s.collectionImport.templateName);
    
    return {
      applied : appliedJobs,
      available : availableJobs
    }
  }

}

const inst = new CollectionImportModel();
export default inst;