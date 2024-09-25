const exec = require('./exec.js');
const config = require('./config.js');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const { logger } = require('@ucd-lib/fin-service-utils');


let k8sTemplatePath = config.k8s.templatesRoot;

class KubectlWrapper {

  constructor() {
    this.initalized = false;
    this.k8sTemplatePath = k8sTemplatePath;
    this.init();
  }

  async init() {
    if( this.initalized ) return;

    if( config.k8s.enabled === false ) {
      logger.info('kubectl disabled');
      this.initalized = true;
      return;
    }


    if( config.k8s.platform === 'docker-desktop' ) {
      logger.info('kubectl initialized for local environment. /root/.kube should already be mounted');
      this.initalized = true;
      return;
    }

    if( this.initializing ) return this.initializing;

    this.initializing = new Promise(async (resolve, reject) => {  
      if( config.k8s.platform === 'gke' ) {
        try {
          await this._initGke();
        } catch(e) {
          return reject(e);
        }
      } else {
        return reject('Unsupported kubernetes platform: '+config.k8s.platform);
      }

      logger.info('kubectl initialized');
      this.initalized = true;
      this.initializing = null;
      resolve();
    });

    await this.initializing;
  }

  async _initGke() {
    logger.info('initializing kubectl for gke');

    await exec(`gcloud auth login --quiet --cred-file=${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

    await exec(`
      gcloud container clusters get-credentials ${config.k8s.cluster} \
        --zone ${config.k8s.region} \
        --project ${config.google.project}
    `);
  }

  async getClusters() {
    await this.init();
    let {stdout} = await exec('kubectl config get-clusters');
    return stdout.split('\n').filter((line) => line.trim() !== '');
  }

  async getPods() {
    await this.init();
    let {stdout} = await exec('kubectl get pods -o jsonpath-as-json="{.items[*].metadata.name}"');
    return JSON.parse(stdout);
  }

  async getServices() {
    await this.init();
    let {stdout} = await exec('kubectl get service -o jsonpath-as-json="{.items[*].metadata.name}"');
    return JSON.parse(stdout);
  }

  async getJobs() {
    await this.init();
    let {stdout} = await exec('kubectl get jobs -o jsonpath-as-json="{.items[*].metadata.name}"');
    return JSON.parse(stdout);
  }

  /**
   * @method setContext
   * @description Set the current kubernetes context (cluster name)
   * 
   * @param {String} context context to set 
   * @returns {Promise<String>}
   */
  async setContext(context) {
    await this.init();
    let {stdout} = await exec(`kubectl config use-context ${context}`);
    return stdout.trim();
  }

  /**
   * @method currentContext
   * @description Get the current kubernetes context
   * 
   * @returns {Promise<String>} current context
   */
  async currentContext() {
    await this.init();
    let {stdout} = await exec('kubectl config current-context');
    return stdout.trim();
  }

  /**
   * @method apply
   * @description Apply a kubernetes configuration.  Can be file or stdin. Stdin can be a 
   * json object or yaml string. Returns the json output of the apply command.
   * 
   * @param {String|Object} file file path or stdin contents 
   * @param {Object} opts flags to control input type 
   * @param {Boolean} opts.stdin true if file is configuration json or yaml string
   * @param {Boolean} opts.isJson true if file is json object.  If input file is json object,
   * it will be converted to yaml string without the need of this flag.
   * @returns {Promise<Object>}
   */
  async apply(file, opts={}  ) {
    await this.init();

    if( opts.isJson || typeof file === 'object' ) {
      file = yaml.dump(file);
    }

    let output = '';
    if ( opts.stdin ) {
      output = await this.exec(`kubectl apply -f - -o json`, {}, { input: file });
    } else {
      output = await this.exec(`kubectl apply -f ${file} -o json`);
    }

    return JSON.parse(output);
  }

  async exec(command, args={}, options) {
    let {stdout, stderr} = await exec(command, args, options);
    if( stderr ) {
      throw new Error(stderr);
    }
    return stdout;
  }

  async delete(type, name) {
    await this.init();
    return this.exec(`kubectl delete ${type} ${name}`);
  }

  async get(type, name) {
    await this.init();
    let config;

    if( !name ) {
      config = await this.exec(`kubectl get ${type} -o json`);
    } else {
      config = await this.exec(`kubectl get ${type} ${name} -o json`);
    }

    return JSON.parse(config);
  }

  async logs(type, name) {
    await this.init();
    try {
      return await this.exec(`kubectl logs ${type}/${name}`);
    } catch(e) {}
    return '';
  }

  /**
   * @method renderKustomizeTemplate
   * @description Get the kustomize template as a json object.  The template
   * can be in the base or overlay directory.
   * 
   * @param {String} template service template name
   * @param {String} overlay overlay name.  defaults to null which will use the base template.
   * @returns 
   */
  async renderKustomizeTemplate(template, overlay=null) {
    let templatePath;
    if( overlay ) {
      templatePath = path.join(k8sTemplatePath, template, 'overlays', overlay);

      // revert to base template if overlay does not exist
      if( !fs.existsSync(templatePath) ) {
        templatePath = null;
      }
    }

    if( !templatePath ) {
      templatePath = path.join(k8sTemplatePath, template, 'base');
    }

    let yamlStr = await this.exec(`kubectl kustomize ${templatePath}`);
    return yamlStr.split('---\n')
                  .map(t => yaml.load(t));
  }

  async corkKubeApply(template, flags={}) {
    await this.init();
    let flagStr = Object.keys(flags).map(key => {
      if( flags[key] === '' ) return `--${key}`;
      return `--${key} ${flags[key]}`;
    }).join(' ');
    return this.exec(`cork-kube apply ${flagStr} -- ${template}`);
  }

}

const instance = new KubectlWrapper();
module.exports = instance;