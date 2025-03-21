const fs = require('fs');
const path = require('path');

let redirects = require('./map.json');
let lengths = {};
for( let key in redirects ) {
  let len = key.split('/').length;
  if( !lengths[len] ) {
    lengths[len] = 0;
    console.log(key)
  }
  lengths[len]++;
} 

console.log(lengths)