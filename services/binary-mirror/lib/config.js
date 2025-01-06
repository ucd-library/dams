const env = process.env;
import fs from 'fs';
import dotenv from 'dotenv';

// load custom .env file if it exists in environment variables
// this is really useful for k8s environments where individual 
// env variables from secrets are verbose and hard to manage
let envPath = '/etc/fin/.env';
if( process.env.FIN_ENV_FILE ) {
  envPath = process.env.FIN_ENV_FILE;
}
if( fs.existsSync(envPath) && fs.lstatSync(envPath).isFile() ) {
  if( ['info', 'debug'].includes(process.env.LOG_LEVEL) ) {
    console.log(`Loading environment variables from ${envPath}`);
  }
  dotenv.config({ path: envPath });
}


const config = {

  port : env.PORT || 3000,

  fcrepoHost : env.FCREPO_HOST || 'https://digital.ucdavis.edu',

  rootDir : env.ROOT_DIR || '/opt/dams-mirror',
  etagPath : env.ETAG_PATH || 'etags',
  dataPath : env.DATA_PATH || 'data',

  messageSecret : env.MESSAGE_SECRET,

  oidc : {
    baseUrl : env.OIDC_BASE_URL,
    clientId : env.OIDC_CLIENT_ID,
    secret : env.OIDC_SECRET,
    scopes : env.OIDC_SCOPES || 'roles openid profile email'
  },

  serviceAccount : {
    name : env.SERVICE_ACCOUNT_NAME,
    secret : env.SERVICE_ACCOUNT_SECRET
  }

}

export default config;