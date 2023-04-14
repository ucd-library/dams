const exec = require('./exec.js');
const config = require('./config.js');
const path = require('path');

// ptiff
// convert input.tif  -define tiff:tile-geometry=256x256 -compress jpeg 'ptif:output.tif'

class ImageMagickWrapper {

  constructor() {
    this.baseCmd = 'convert';
    this.preOpts = ['density'];
  }

  /**
   * @method prepareCmd
   * @description given input/output file names and ImageMagick options
   * prepare the actual cli command to run
   * 
   * @param {Object} files return from getFileNames() 
   * @param {Object} options most likely options from main config.js for operation
   * @returns {String}
   */
  prepareCmd(files, options) {
    let pre = [], post = [];

    for( let opt in options ) {
      if( this.preOpts.includes(opt) ) {
        pre.push('-'+opt+' '+options[opt])
      } else {
        post.push('-'+opt+' '+options[opt])
      }
    }

    return [this.baseCmd, ...pre, files.input, ...post, files.output].join(' ');
  }

  /**
   * @method getFileNames
   * @description get the input/output filenames for the ImageMagick command
   * give the inputFile, output product type (ocr or ai-reader) and the (optional) page number
   * if a pdf.
   * 
   * @param {String} inputFile input file (should by pdf or image file) 
   * @param {String} type What are you creating this image for: ia-reader or ocr
   * @param {String|Number} page if pdf, which page 
   * @returns {Object}
   */
  getFileNames(inputFile, type='', page='') {
    if( page === null || page === undefined ) {
      page = '';
    }

    if( !['ia-reader', 'ocr'].includes(type) ) {
      throw new Error('Unknown type: '+type);
    }

    let fileParts = path.parse(inputFile);

    if( page !== '' ) {
      inputFile = inputFile+'['+page+']'
      page = '-'+page;
    }

    let outputFile = path.join(fileParts.dir, fileParts.name+'-'+type+'-ready'+page+'.jpg');

    return {
      input: inputFile,
      output: outputFile
    }
  }


  async ocrReadyImage(file, page='') {
    let files = this.getFileNames(file, 'ocr', page);
    let cmd = this.prepareCmd(files, config.ocr.imageMagick);
    let {stdout, stderr} = await exec(cmd);
    return {input:file, output: files.output, cmd, stdout, stderr}
  }

  async iaReaderImage(file, page='') {
    let files = this.getFileNames(file, 'ia-reader', page);
    let cmd = this.prepareCmd(files, config.iaReader.imageMagick);
    let {stdout, stderr} = await exec(cmd);
    return {input:file, output: files.output, cmd, stdout, stderr}
  }

  async getImageDimensions(file) {
    let {stdout, stderr} = await exec(`identify -format "%wx%h" ${file}`);
    let [width, height] = stdout.trim().split('x');
    return {width, height};
  }
}

module.exports = new ImageMagickWrapper();