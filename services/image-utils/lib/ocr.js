const exec = require('./exec.js');
const path = require('path');

class TesseractWrapper {


  async ocr(opts) {
    // see: https://github.com/tesseract-ocr/tesseract/wiki/Command-Line-Usage
    if( !opts.args ) opts.args = '-l eng --psm 1 --oem 3';
    if( !opts.output ) opts.output = 'txt'; // options are: txt, hocr, pdf
    if( !opts.filepath ) throw new Error('File path required');
  
    let {name, dir} = path.parse(opts.filepath);
    let command = `tesseract ${opts.filepath} ${name} ${opts.args} ${opts.output}`;
    let response = await exec(command, {cwd: dir});
    
    return {
      result : path.join(dir, name+opts.output),
      stdout : response.stdout,
      stderr : response.stderr,
      command,
      options : opts
    }
  }

}

module.exports = new TesseractWrapper();