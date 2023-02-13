const {gc} = require('@ucd-lib/fin-node-utils');
const gcssyncConfig = require('./lib/config.js');

const {pubsub, gcs} = gc;

// TODO: wire up activemq to listen for messages from fcrepo

class GcsSync {

  constructor() {
    pubsub.on('message', message => this.onMessage(message));

    gcssyncConfig.loaded.then(config => {
      this.config = config.gcssync || {};
      this.config.containers.forEach(container => {
        container.bucket = container.bucket.replace('{{DATA_ENV}}', config.dataEnv);
        pubsub.listen(container.bucket);
      });
    });
  }

  async onMessage(message) {
    let container = this.config.containers.find(container => {
      if( container.bucket === message.attributes.bucketId ) {
        if( message.data.name.startsWith(container.basePath.replace(/^\//, '')) ) {
          return true;
        }
      }
      return false;
    });

    if( container && container.direction === 'gcs-to-fcrepo' ) {
      await gcs.syncToFcrepo('/'+message.data.name, container.bucket, {
        proxyBinary : container.proxyBinary,
        crawlChildren : false,
        basePath : container.basePath
      });
    }

    message.ack();
  }
}

new GcsSync();

// pubsub.on('message', (msg) => {
//   console.log('pubsub message', msg);
// });
// pubsub.listenToBucket('dams-client-products');