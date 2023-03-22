let {config} = require('@ucd-lib/fin-service-utils');

let env = process.env.CLIENT_ENV || 'dev';

let clientPackage = require('./client/public/package.json');

let clientPackageVersion = clientPackage.version;
if( process.env.APP_VERSION ) {
  clientPackageVersion = process.env.APP_VERSION;
}

config.client = {
  // TODO: move this to fcrepo
  title : 'UC Davis Library Digital Collections',
  description : 'The UC Davis Digital Collections is a locally developed digital repository that was designed to store and manage the digital assets of UC Davis. These Digital Collections are intended to increase access to previously undiscoverable digital assets held by the University Library.',

  appName : process.env.FIN_APP_NAME || 'ucd-lib-client',
  assets : (env === 'prod') ? 'dist' : 'public',
  appRoutes : ['about', 'collection', 'item', 'search', 'browse', 'collections', 'collection', 'components'],
  versions : {
    bundle : clientPackageVersion,
    loader : clientPackage.dependencies['@ucd-lib/cork-app-load'].replace(/^\D/, '')
  },

  env : {
    CLIENT_ENV : env,
    FIN_APP_VERSION : process.env.FIN_APP_VERSION || '',
    FIN_REPO_TAG : process.env.FIN_REPO_TAG || '',
    FIN_BRANCH_NAME : process.env.FIN_BRANCH_NAME || '',
    FIN_SERVER_REPO_HASH : process.env.FIN_SERVER_REPO_HASH || '',
    APP_VERSION : process.env.APP_VERSION || '',
    BUILD_NUM : process.env.BUILD_NUM || '',
    UCD_DAMS_REPO_BRANCH : process.env.UCD_DAMS_REPO_BRANCH || '',
    UCD_DAMS_REPO_TAG : process.env.UCD_DAMS_REPO_TAG || '',
    UCD_DAMS_REPO_SHA : process.env.UCD_DAMS_REPO_SHA || '',
    UCD_DAMS_DEPLOYMENT_SHA : process.env.UCD_DAMS_DEPLOYMENT_SHA || '',
    UCD_DAMS_DEPLOYMENT_BRANCH : process.env.UCD_DAMS_DEPLOYMENT_BRANCH || '',
    UCD_DAMS_DEPLOYMENT_TAG : process.env.UCD_DAMS_DEPLOYMENT_TAG || '',
    FIN_SERVER_IMAGE : process.env.FIN_SERVER_IMAGE || ''
  }
};

module.exports = config;