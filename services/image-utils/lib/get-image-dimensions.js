const exec = require('./exec');

async function getImageDimensions(file, page) {
  if( page !== undefined ) {
    file = file+'['+page+']';
  }

  let {stdout, stderr} = await exec(`identify -format "%wx%h " ${file}`);
  let sizes = stdout.trim().split(' ').map(size => {
    let [width, height] = size.split('x');
    return {width, height};
  })
  if( sizes.length === 1 ) {
    return sizes[0];
  }
  return sizes;
}

module.exports = getImageDimensions;