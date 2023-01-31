const exec = require('./exec.js');
const config = require('./config.js');

class GcsCliWrapper {

  async init() {
    if( this.initialized ) return;
    if( this.initializing ) {
      await this.initializing;
      return;
    }

    this.initializing = new Promise(async (resolve, reject) => {
      await exec(`gcloud auth login --quiet --cred-file=${config.google.serviceAccountFile}`)
      await exec(`gcloud config set project ${config.google.project}`)

      this.initialized = true;
      resolve();
    });

    return this.initializing;
  }

  async copy(from, to) {
    await this.init();
    return exec(`gsutil cp ${from} ${to}`);
  }


}

module.exports = new GcsCliWrapper();