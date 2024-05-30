const keycloak = require('/fin/services/node-utils/lib/keycloak.js');
const fs = require('fs');
const path = require('path');

const CONFIG_FILE = path.join(os.homedir(), '.fccli');

(async function() {
  let token = await keycloak.getServiceAccountToken();
  let content = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  content.jwt[content.host] = token;
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(content, null, 2));

  console.log('Token saved');  
})();