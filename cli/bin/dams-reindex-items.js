const {Command} = require('commander');
const program = new Command();
const api = require('@ucd-lib/fin-api');

const ROOT_PATH = '/item';

program
  .description('reindex all items')
  .action(() => {
    run()
  });

async function run() {
  let rootItems = await getRoot();
  let len = rootItems.length;
  let i = 0;
  for( let item of rootItems ) {
    i++;
    let resp = await reindexItem(item);
    console.log('Reindexing', i+' of '+len, item, resp.last.statusCode);
  }
}

async function reindexItem(item) {
  let resp = await api.get({
    path: item+'/svc:reindex?force=true&no-crawl=true'
  });
  return resp;
}

async function getRoot() {
  let resp = await api.get({
    headers : {
      'Accept' : 'application/ld+json'
    },
    path: ROOT_PATH
  });
  let rootItems = JSON.parse(resp.last.body)[0]['http://www.w3.org/ns/ldp#contains'];
  return rootItems.map(item => new URL(item['@id']).pathname.replace(/^\/fcrepo\/rest/, ''));
}




program.parse(process.argv);