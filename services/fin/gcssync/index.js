// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// For more information on ways to initialize Storage, please see
// https://googleapis.dev/nodejs/storage/latest/Storage.html


// Creates a client using Application Default Credentials
const storage = new Storage();


// access a bucket 
const bucket = storage.bucket('dams-client-products');

(async () => {
  // list files in a bucket
  let files = (await bucket.getFiles({
    prefix : 'foo/',
    delimiter : '/'
  }))[0];
  console.log(files.length);

  // get sha256 hash of gcs file
  for( let file of files ) {
    const hash = (await file.getMetadata())[0];
    console.log(hash);
  }

  // loop files in gcs response and check if file is folder
  for( let file of files ) {
    const isFolder = file.name.endsWith('/');
    console.log(isFolder);
  }

  // check if gcs file is folder
  for( let file of files ) {
    const isFolder = file.name.endsWith('/');
    console.log(isFolder);
  }

})();
