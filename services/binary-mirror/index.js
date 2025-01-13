import express from 'express';
import fs from 'fs';
import path from 'path';
import config from './lib/config.js';
import fetch from 'node-fetch';
import auth from './lib/auth.js';
import crypto from 'crypto';

const app = express();
const ETAG_PATH = path.join(config.rootDir, config.etagPath);
const DATA_PATH = path.join(config.rootDir, config.dataPath);

app.get('*', async (req, res) => {
  let message = req.query.m;
  let iv = req.query.k;

  if( !message || !iv ) {
    res.status(400).send('m and k parameters are required');
    return;
  }

  try {
    message = decryptMessage(config.messageSecret, { iv, encryptedMessage: message });
  } catch (error) {
    console.error('Error decrypting message:', error);
    res.status(400).send('Invalid message');
    return;
  }
  let { etag, expires } = message;

  if (!etag) {
    res.status(400).send('ETag is required');
    return;
  }
  if (Date.now() > expires) {
    res.status(400).send('Link has expired');
    return;
  }
  if( !message.path ) {
    res.status(400).send('Path is required');
    return;
  }

  try {
    console.log('File request: '+message.path+' with ETag:', etag);
    await streamFile(message.path, etag, res);
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).send('Error fetching file');
  }
});

function decryptMessage(secret, encryptedData) {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.alloc(32);
  key.write(secret, 0, 32);
  const iv = Buffer.from(encryptedData.iv, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData.encryptedMessage, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return JSON.parse(decrypted);
}

async function streamFile(fcrepoPath, etag, res) {
  let filePath = path.join(DATA_PATH, fcrepoPath);
  let etagPath = path.join(ETAG_PATH, fcrepoPath);

  if( fs.existsSync(filePath) && fs.existsSync(etagPath) ) {
    let fileEtag = fs.readFileSync(etagPath, 'utf8');
    if (etag === fileEtag) {
      console.log('Cache hit: '+fcrepoPath+' with ETag:', etag);
      res.sendFile(filePath);

      // Update the etag file modification time
      fs.utimesSync(etagPath, new Date(), new Date());
      return;
    }
  }


  let url = config.fcrepoHost+fcrepoPath;
  console.log('Requesting file: '+url+' with ETag:', etag);

  let fetchHeaders = {
    'Authorization': 'Bearer ' + await auth.getServiceAccountToken(),
  };

  let response = await fetch(url, { headers: fetchHeaders });

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.mkdirSync(path.dirname(etagPath), { recursive: true });

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

}

app.listen(config.port, () => {
  console.log(`Binary mirror listening on port ${config.port}`);
});