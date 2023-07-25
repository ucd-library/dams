const {Command} = require('commander');
const program = new Command();
const api = require('@ucd-lib/fin-api');
const fs = require('fs-extra');
const path = require('path');
const CliConfig = api.CliConfig;

const CRAWL_PROPERTIES = [
  'http://www.w3.org/ns/ldp#contains', 'http://schema.org/hasPart'
]
const ARCHIVAL_GROUP = "http://fedora.info/definitions/v4/repository#ArchivalGroup";

program
  .command('remove <path>')
  .description('Crawl a collection and remove all references items')
  .action(async (finPath, options) => {
    await crawlAndRemove(finPath);
    await remove('/indirect-containers'+finPath);
    await remove(finPath);
  });

program
  .command('export <path>')
  .description('Crawl a collection and download all referenced items')
  .option('-l, --limit <number>', 'limit number of items returned')
  .action((finPath, options) => {
    exportCollection(finPath, options.limit)
  });


async function remove(finPath) {
  let t = Date.now();
  let resp = await api.delete({
    path: finPath,
    permanent : true,
    jwt : CliConfig.jwt
  });

  if( resp.last.statusCode === 404 ) {
    return console.log('Ignored Delete, container does not exist 404: ', finPath, (Date.now()-t)+'ms');
  }
  if( resp.last.statusCode !== 204 ) {
    throw new Error(`Failed to delete ${finPath}: ${resp.last.statusCode} ${resp.last.body}`);
  }

  console.log('Deleted: ', finPath, (Date.now()-t)+'ms');
}

async function exportCollection(finPath, limit) {
  let metadata = await getMetadata(finPath);
  if( typeof limit === 'string' ) {
    limit = parseInt(limit);
  }


  let graph = metadata.data['@graph'];
  if( !Array.isArray(graph) ) {
    graph = [graph];
  }

  let node = graph.find(node => node['@type'].includes('http://schema.org/Collection')) || {};
  parts = getValues(node, 'http://schema.org/hasPart')
    .filter(part => part.match(/(^info:fedora\/|\/fcrepo\/rest\/)/))
    .map(part => part.split('/fcrepo/rest').pop().replace(/^info:fedora/, ''));

  if( limit ) {
    parts = parts.slice(0, limit);
  }

  console.log('\nExporting the following collection parts: ', parts);
  parts.unshift(finPath);

  let collectionName = finPath.replace(/\/$/, '').split('/').pop();
  let rootDir = path.join(process.cwd(), collectionName); 
  let collectionDir = path.join(rootDir, 'collection');
  let itemDir = path.join(rootDir, 'items');

  await fs.mkdirp(collectionDir);
  await fs.mkdirp(itemDir);

  for( let part of parts ) {
    let fsRoot = itemDir;
    if( part.startsWith('/collection') ) {
      fsRoot = collectionDir;
    }

    await api.io.export.run({
      fcrepoPath: part,
      fsRoot,
      printConfig : false,
      ignoreTypeMappers : true
    });
  }


}



async function crawlAndRemove(finPath, crawled={}) {
  if( crawled[finPath] ) return;
  console.log('Crawling ', finPath);
  crawled[finPath] = true;

  let t = Date.now();
  let resp;
  try {
    resp = await getMetadata(finPath);
  } catch(e) {
    console.log(' -> Failed to get metadata: ', e.message);
    return;
  }
  console.log('  -> '+(Date.now()-t)+'ms');

  if( resp.isArchivalGroup && !finPath.startsWith('/collection') ) {
    await remove(finPath);
    return;
  }

  let finPaths = getCrawlProperties(resp.data);
  for( let finPath of finPaths ) {
    await crawlAndRemove(finPath, crawled);
  };
}

function getCrawlProperties(graph) {
  if( !graph ) return [];
  if( graph['@graph'] ) {
    graph = graph['@graph'];
  }
  if( !Array.isArray(graph) ) {
    graph = [graph];
  }

  let props = new Set();
  for( let node of graph ) {
    for( let prop of CRAWL_PROPERTIES ) {
      getValues(node, prop).forEach(value => {
        props.add(
          value.split('/fcrepo/rest').pop().replace(/^info:fedora/, '')
        );
      });
    }
  }

  return Array.from(props);
}

function getValues(node, prop) {
  if( !node[prop] ) return [];
  let value = node[prop];
  if( !Array.isArray(value) ) {
    value = [value];
  }
  return value.map(v => v['@id'] || v['@value'] || v);
}

async function getMetadata(finPath) {
  let resp = await api.get({
    path: finPath,
    jwt : CliConfig.jwt,
    fcBasePath : '/fin/rest'
  });

  if( resp.last.statusCode !== 200 ) {
    throw new Error(`Failed to get metadata for ${finPath}: ${resp.last.statusCode} ${resp.last.body}`);
  }

  let data = JSON.parse(resp.last.body);
  let isArchivalGroup = false;

  for( let node of data['@graph'] ) {
    let types = node['@type'] || [];
    if( !Array.isArray(types) ) types = [types];
    if( types.includes(ARCHIVAL_GROUP) ) {
      isArchivalGroup = true;
      break;
    }
  }

  return {data, isArchivalGroup};
}

program.parse(process.argv);