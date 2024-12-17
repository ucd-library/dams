const env = process.env;

const config = {

  port : env.PORT || 3000,

  mirrorHost : env.MIRROR_HOST || 'https://digital.ucdavis.edu',

  rootDir : env.ROOT_DIR || '/opt/dams-mirror',
  etagPath : env.ETAG_PATH || 'etags',
  dataPath : env.DATA_PATH || 'data',

  oidc : {
    baseUrl : env.OIDC_BASE_URL,
    clientId : env.OIDC_CLIENT_ID,
    secret : env.OIDC_SECRET,
    scopes : env.OIDC_SCOPES
  },

  serviceAccount : {
    name : env.SERVICE_ACCOUNT_NAME,
    secret : env.SERVICE_ACCOUNT_SECRET
  }

}

module.exports = config;