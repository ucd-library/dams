const fs = require('fs');
const path = require('path');

let redirects = require('./map.json');
let csv = [['v1_path', 'v2_ark']];
let lengths = {};
for( let key in redirects ) {
  let len = key.split('/').length;
  if( !lengths[len] ) {
    lengths[len] = 0;
    console.log(key)
  }
  lengths[len]++;
  csv.push([key, redirects[key]]);
} 
fs.writeFileSync(
  path.join(__dirname, 'redirects.csv'),
  csv.map(row => row.join(',')).join('\n')
);
console.log(lengths)