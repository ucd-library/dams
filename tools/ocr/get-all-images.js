const fetch = require('node-fetch');
const {XMLParser} = require('fast-xml-parser');
const pg = require('pg');
const { it } = require('node:test');
const parser = new XMLParser();

const HOST = process.env.DAMS_HOST || 'https://digital.ucdavis.edu';

const client = new pg.Client({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  port: process.env.DB_PORT || 5432,
});
client.connect();

async function itemInDB(finId) {
  let sql = `SELECT fin_id FROM crawled WHERE fin_id = $1`;
  let res = await client.query(sql, [finId]);
  if( res.rows.length > 0 ) {
    return true;
  }
  return false;
}

async function insertItem(finId, pages) {
  console.log('Inserting item:', finId);
  for( let i = 0; i < pages; i++ ) {
    let sql = `INSERT INTO media (fin_id, page) VALUES ($1, $2)`;
    try {
      await client.query(sql, [finId, i]);
    } catch(e) {}
  }
}

async function getRootSitemap(host) {
  let sitemap = await fetch(`${host}/sitemap.xml`);
  let text = await sitemap.text();
  let parsed = parser.parse(text);
  if (parsed.sitemapindex && parsed.sitemapindex.sitemap) {
    return parsed.sitemapindex.sitemap;
  }
  return text;
}

async function getItems(url) {
  let sitemap = await fetch(url);
  let text = await sitemap.text();
  let parsed = parser.parse(text);
  if( !Array.isArray(parsed.urlset.url) ) {
    return [parsed.urlset.url.loc];
  }
  return parsed.urlset.url.map(url => url.loc);
}

async function getItemMedia(url) {
  url = new URL(url);
  let urlpathname = url.pathname;
  if( await itemInDB(url.pathname) ) {
    // console.log('Item already in DB:', url.pathname);
    return;
  }

  url = `${url.origin}/api${url.pathname}`;
  let item;

  try {
    item = await fetch(url);
  } catch(e) {
    console.log('Error fetching item:', url);
    return;
  }

  let graph = await item.json();
  let media = graph['@graph'].filter(item => {
    return item['@type'] && 
      item['@type'].includes('http://fedora.info/definitions/v4/repository#Binary') &&
      item.filename && item.filename.match((/\.jpg|\.tif|\.png|\.pdf|\.tiff|\.jpeg$/i));
  })
  .map(item => item['@id']);

  for( let i = 0; i < media.length; i++ ) {
    if( media[i].match(/\.pdf$/) ) {
      let manifest = await fetch(HOST+'/fcrepo/rest'+media[i]+'/svc:gcs/dams-client-media-prod/images/manifest.json');
      manifest = await manifest.json();
      try {
        media[i] = {id: media[i], pages: manifest.pages.length};
      } catch(e) {
        console.log('Error getting pages for pdf:', media[i]);
        media[i] = {id: media[i], pages: 1};
      }
    } else {
      media[i] = {id: media[i], pages: 1};
    }
  }

  for( let m of media ) {
    await insertItem(m.id, m.pages);
  }

  await client.query(`INSERT INTO crawled (fin_id) VALUES ($1)`, [urlpathname]);
}

async function run(host) {
  let sitemap = await getRootSitemap(host);
  for(let i = 0; i < sitemap.length; i++) {
    let url = sitemap[i].loc;
    let items = await getItems(url);
    for( let item of items ) {
      await getItemMedia(item);
    }
  }
}

run(HOST);