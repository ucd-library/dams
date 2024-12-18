import express from 'express';
import fs from 'fs';
import path from 'path';
import config from './lib/config.js';
import fetch from 'node-fetch';
import auth from './lib/auth.js';

const app = express();
const ETAG_PATH = path.join(config.rootDir, config.etagPath);
const DATA_PATH = path.join(config.rootDir, config.dataPath);

app.get('*', async (req, res) => {
  let etag = req.headers['if-match'] || req.query.etag;

  if (!etag) {
    res.status(400).send('ETag is required');
    return;
  }

  try {
    let fcrepoPath = decodeURIComponent(req.path);
    console.log('Requesting file: '+fcrepoPath+' with ETag:', etag);
    await streamFile(fcrepoPath, etag, res);
  } catch (error) {
    res.status(500).send('Error fetching file');
  }
});

async function streamFile(fcrepoPath, etag, res) {
  let filePath = path.join(DATA_PATH, fcrepoPath);
  let etagPath = path.join(ETAG_PATH, fcrepoPath);

  if( fs.existsSync(filePath) && fs.existsSync(etagPath) ) {
    let fileEtag = fs.readFileSync(etagPath, 'utf8');
    if (etag === fileEtag) {
      res.sendFile(filePath);

      // Update the etag file modification time
      fs.utimesSync(etagPath, new Date(), new Date());
      return;
    }
  }

  try {
    let fetchHeaders = {
      'Authorization': 'Bearer ' + await auth.getServiceAccountToken(),
    };
    let response = await fetch(fcrepoPath, { headers: fetchHeaders });

    if (response.ok) {
      response.headers.forEach((value, name) => {
        res.setHeader(name, value);
      });

      response.body.pipe(res);
      const dest = fs.createWriteStream(filePath);
      response.body.pipe(dest)
        .on('finish', () => {
          fs.writeFileSync(etagPath, etag);
        });
    } else {
      res.status(response.status).send(response.statusText);
    }
  } catch (error) {
    res.status(500).send('Error fetching file');
  }

}

app.listen(config.port, () => {
  console.log(`Binary mirror listening on port ${config.port}`);
});