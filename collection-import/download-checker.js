const os = require('os');
const fs = require('fs');
const path = require('path');

let HOST = process.env.HOST || 'https://dev.dams.library.ucdavis.edu';
let ROOT = process.env.ROOT || '/fcrepo/rest/item';
let ROOT_DATA_DIR = path.join(__dirname, 'download-checker-data');

if( !fs.existsSync(ROOT_DATA_DIR) ) {
  fs.mkdirSync(ROOT_DATA_DIR);
}

let currentPathFile = path.join(ROOT_DATA_DIR, 'current-path');
let crawlIndexFile = path.join(ROOT_DATA_DIR, 'crawl-index.json');
let errorFile = path.join(ROOT_DATA_DIR, 'errors');

if( !fs.existsSync(errorFile) ) {
  fs.writeFileSync(errorFile, '');
}

let CONFIG_FILE = path.join(os.homedir(), '.fccli');
let CONFIG = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
if( !CONFIG.jwt[HOST] ) {
  console.error(`No JWT for ${HOST}`);
  process.exit(1);
}
let token = CONFIG.jwt[HOST];

async function head(url) {
  return await fetch(url, {
    method: 'HEAD',
    headers: {
      'Accept': 'application/ld+json',
      'Authorization': `Bearer ${token}`
    }
  });
}

async function getNode(url) {
  let t = new Date().getTime();
  let resp = await fetch(url, {
    headers: {
      'Accept': 'application/ld+json',
      'Authorization': `Bearer ${token}`
    }
  }).catch(e => {
    console.error('Error fetching ', url, e);
    console.error(' - Time: ', new Date().getTime() - t);
    process.exit(1);
  });
  let json = await resp.json();
  if( json['@graph'] ) {
    json = json['@graph'];
  }
  if( !Array.isArray(json) ) {
    json = [json];
  }
  return json.find(node => (node['@type'] || []).includes('http://www.w3.org/ns/ldp#Container'));
}

async function getContains(path) {
  let url = `${HOST}${path}`;
  let json = await getNode(url);
  if( !json ) return [];

  return json['http://www.w3.org/ns/ldp#contains'] || [];
}

async function crawl(path) {
  if( path.match(/\.[a-z0-9]+$/) ) {
    console.log('Checking ', path);
    let resp = await head(HOST+path);
    let valid = await isBinary(resp.headers);
    if( !valid ) {
      fs.appendFileSync(errorFile, path+'\n');
      console.error(' - Invalid binary');
    } else {
      console.log(' - Valid binary');
    }
    return;
  }

  console.log('Crawling ', path);
  let contains = await getContains(path);

  if( path === ROOT ) {
    fs.writeFileSync(crawlIndexFile, JSON.stringify(contains));
  } else {
    fs.writeFileSync(currentPathFile, path);
  }

  for( let child of contains ) {
    await crawl(new URL(child['@id']).pathname);
  }
}

function parseLinkHeader(link) {
  if( !link ) return [];
  link = link.split(',')
    .map(l => l.trim())
    .map(l => {
      let [url, rel] = l.split(';');
      url = url.replace(/^<(.+)>$/, '$1');
      rel = rel.replace(/rel="(.+)"/, '$1').trim();
      return {url, rel};
    }
  );
  return link;
}

function getLinkHeaderTypes(headers) {
  let links = headers.get('link');
  return parseLinkHeader(links)
    .filter(link => link.rel === 'type')
    .map(link => link.url);
}

function isBinary(headers) {
  let types = getLinkHeaderTypes(headers);
  return types.includes('http://fedora.info/definitions/v4/repository#Binary');
}


(async function() {
  if( fs.existsSync(currentPathFile) ) {
    let currentPath = fs.readFileSync(currentPathFile, 'utf8');
    let rootContains = JSON.parse(fs.readFileSync(crawlIndexFile, 'utf8'));

    console.log('Resuming crawl from ', currentPath)

    let found = false;
    let c = 0;
    for( let child of rootContains ) {
      if( !found && currentPath.startsWith(new URL(child['@id']).pathname) ) {
        found = true;
      }
      if( !found ) continue;

      await crawl(new URL(child['@id']).pathname);
    }

  } else {
    crawl(ROOT);
  }
})();
