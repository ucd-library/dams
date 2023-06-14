const {Command} = require('commander');
const program = new Command();
const api = require('@ucd-lib/fin-api');
const fs = require('fs');
const path = require('path');
const CliConfig = api.CliConfig;

const CRAWL_PROPERTIES = [
  'contains', 'hasPart'
]
const ARCHIVAL_GROUP = "http://fedora.info/definitions/v4/repository#ArchivalGroup";

program
  .command('remove <path>')
  .description('Crawl a collection and remove all references items')
  .action((finPath, options) => {
    run(finPath)
  });


async function run(finPath) {
  let archiveGroups = await crawl(finPath);

  console.log('\nRemoving archive the following archival groups: ', archiveGroups);

  for( let archiveGroup of archiveGroups ) {
    let resp = await api.delete({
      path: archiveGroup,
      permanent : true,
      jwt : CliConfig.jwt
    });

    if( resp.last.statusCode !== 204 ) {
      throw new Error(`Failed to delete ${archiveGroup}: ${resp.last.statusCode} ${resp.last.body}`);
    }

    console.log('Deleted: ', archiveGroup);
  }

}

async function crawl(finPath, crawled={}, archiveGroups={}) {
  if( crawled[finPath] ) return;
  console.log('Crawling ', finPath);
  crawled[finPath] = true;

  let resp = await getMetadata(finPath);

  if( resp.isArchivalGroup ) {
    archiveGroups[finPath] = true;
  }
  
  if( resp.isArchivalGroup && !finPath.startsWith('/collection') ) {
    return Object.keys(archiveGroups);
  }

  let finPaths = getCrawlProperties(resp.data);
  for( let finPath of finPaths ) {
    await crawl(finPath, crawled, archiveGroups);
  }

  return Object.keys(archiveGroups);
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
        props.add(value.split('/fcrepo/rest').pop());
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
  let resp = await api.metadata({
    path: finPath,
    jwt : CliConfig.jwt,
    headers : {
      Accept : api.GET_JSON_ACCEPT.COMPACTED
    }
  });

  if( resp.last.statusCode !== 200 ) {
    throw new Error(`Failed to get metadata for ${finPath}: ${resp.last.statusCode} ${resp.last.body}`);
  }

  let data = JSON.parse(resp.last.body);
  let isArchivalGroup = false;
  let links = api.parseLinkHeader(resp.last.headers.link);

  if( links.type.find(link => link.url === ARCHIVAL_GROUP ) ) {
    isArchivalGroup = true;
  }

  return {data, isArchivalGroup};
}

program.parse(process.argv);