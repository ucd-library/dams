const pg = require('pg');
const redirects = require('./map.json');
const env = process.env;
const TABLE = 'v1_port.redirects';

const client = new pg.Client({
  user: env.PGUSER || 'postgres',
  host: env.PGHOST || 'localhost',
  database: env.PGDATABASE ||'fcrepo',
  port: env.PGPORT || 5432
});

async function insertRedirect(source, destination) {
  if( !source || !destination ) {
    throw new Error(`Invalid source or destination: ${source}, ${destination}`);
  }

  let resp = await client.query(`select * from ${TABLE} where source = $1`, [source]);
  if (resp.rows.length > 0) {
    console.log(`Redirect already exists for ${source}`);
    return;
  }
  resp = await client.query(`insert into ${TABLE} (source, destination) values ($1, $2)`, [source, destination]);
  if (resp.rowCount > 0) {
    console.log(`Inserted ${TABLE} from ${source} to ${destination}`);
  } else {
    console.error(`Failed to insert ${TABLE} from ${source} to ${destination}`);
  }
}

let errors = [];
async function main() {
  await client.connect();
  for (let source in redirects) {
    let destination = redirects[source];
    try {
      await insertRedirect(source, destination);
    } catch (err) {
      console.error(`Error inserting ${TABLE} from ${source} to ${destination}: ${err}`);
      errors.push({ source, destination, err });
    }
  }
  console.log(`Done!`);
  await client.end();
}

main()
.then(() => {
  if (errors.length > 0) {
    console.error(`Errors occurred during insertion:`);
    errors.forEach(error => {
      console.error(`Source: ${error.source}, Destination: ${error.destination}, Error: ${error.err}`);
    });
  } else {
    console.log(`No errors occurred during insertion.`);
  }

  console.log({
    errors: errors.length,
    redirects: Object.keys(redirects).length
  })
}).catch(err => { 
  console.error(err);
  client.end();
});