import config from './config.js';
import fetch from 'node-fetch';

class ServiceAccountAuth {

  constructor() {
    this.cachedToken = null;
  }

  /**
   * @method getServiceAccountToken
   * @description Get a service account token from fin
   */
  async getServiceAccountToken() {
    if( this.cachedToken ) {
      return this.cachedToken;
    }

    let resp = await this.loginServiceAccount(config.serviceAccount.name, config.serviceAccount.secret);
    if( resp.status === 200 ) {
      this.cachedToken = resp.body.access_token;
      setTimeout(() => this.cachedToken = null, 1000*60*60*12);
      return this.cachedToken;
    }

    let body = resp.body;
    if( typeof body === 'object' ) {
      body = JSON.stringify(body, null, 2);
    }
    throw new Error('Failed to get service account token: '+config.serviceAccount.username+'. '+resp.status+' '+body);
  }

  async loginServiceAccount(username, secret) {
    let apiResp = await fetch(config.oidc.baseUrl+'/protocol/openid-connect/token', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type : 'password',
        client_id : config.oidc.clientId,
        client_secret : config.oidc.secret,
        username : username,
        password : secret,
        scope : config.oidc.scopes
      })
    });

    let json = await apiResp.json();

    return {
      body : json,
      status : apiResp.status
    }
  }
}

const inst = new ServiceAccountAuth();
export default inst;