const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const validate = require('../../services/fin/models/validate.js');

let host = 'https://dev.dams.library.ucdavis.edu';
let allItems = host+'/all-items.txt';

class ItemValidator {

  constructor() {
    this.cacheDir = path.join(process.cwd(), '.cache');
    if( !fs.existsSync(this.cacheDir) ) {
      fs.mkdirSync(this.cacheDir);
    }
  }

  async run() {
    let queries = await this.getItemQueries();
    await this.getItems(queries);
    await this.validateAll();
  }

  async validate(json) {
    try {
      let resp = await validate.validateItem(json, host);
      console.log(json['@id'], resp);
    } catch(e) {
      console.log('Error validating item: '+json['@id']);
      console.log(e);
    }
  }

  async validateAll() {
    // sleep for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    let files = fs.readdirSync(this.cacheDir);
    for( let file of files ) {
      if( !file.match(/\.json$/) ) continue;
      let data = this.getCacheFile(file);
      if( !data ) continue;
      try {
        await this.validate(JSON.parse(data));
      } catch(e) {
        console.log('Error parsing file: '+file);
        console.log(e);
      }
    }
  }

  async getItems(queries) {
    console.log('Getting items: '+queries.length);
    for( let query of queries ) {
      let id = new URL(query);
      id = id.pathname.replace(/\/api\/item\//, '').replace(/[\/:]/g, '-');
      let cacheFile = this.getCacheFile(id+'.json');
      if( cacheFile ) {
        continue
      }


      let resp = await fetch(query);
      let json = await resp.json();
      this.setCacheFile(id+'.json', JSON.stringify(json, null, '  '));
    }
  }

  async getItemQueries() {
    let cacheFile = this.getCacheFile('all-items.txt');
    if( cacheFile ) {
      return cacheFile.split('\n').map(line => line.trim().replace(host, host+'/api'));
    }
    let resp = await fetch(allItems);
    let text = await resp.text();
    this.setCacheFile('all-items.txt', text);
    return text.split('\n').map(line => line.trim().replace(host, host+'/api'));
  }

  getCacheFile(name) {
    let file = path.join(this.cacheDir, name);
    if( !fs.existsSync(file) ) return null;
    return fs.readFileSync(file, 'utf-8');
  }

  setCacheFile(name, data) {
    let file = path.join(this.cacheDir, name);
    fs.writeFileSync(file, data);
  }

}

const inst = new ItemValidator();
inst.run();