const exec = require('./exec.js');
const config = require('./config.js');
const path = require('path');
const fs = require('fs-extra');

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

  // async iaReaderImage(file, page='') {
  //   let files = this.getFileNames(file, 'ia-reader', page);
  //   let cmd = this.prepareCmd(files, config.iaReader.imageMagick);
  //   let {stdout, stderr} = await exec(cmd);
  //   return {input:file, output: files.output, cmd, stdout, stderr}
  // }

  // extract images from pdf

  // get page you want
  // pdftk PUG-GRB-vol4.pdf cat 1 output grb-1.pdf

  // convert to jpg
  // get pdf density
  // identify -units PixelsPerInch -format '%[fx:int(resolution.x)]\n' grb-1.pdf

  // get image dimensions
  // getImageDimensions()

  // calculate density flag
  // new density = (resize/dx)*original desity

  // extract to tiff
  // convert -density [new density] [single page pdf] -resize [resize]x tmp.tif

  // convert to ptiff
  // convert tmp.tif -define tiff:tile-geometry=256x256 -compress JPEG 'ptif:output.tif'

  async getImageDimensions(file, page) {
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

  async getPxPerInch(file, page) {
    if( page !== undefined ) {
      file = file+'['+page+']';
    }

    let {stdout, stderr} = await exec(`identify -units PixelsPerInch -format '%[fx:int(resolution.x)]' ${file}`);
    return parseInt(stdout.trim());
  }

  getNewDensity(originalDensity, originalWidth, newWidth) {
    let newDensity = Math.round((newWidth/originalWidth) * originalDensity);
    if( newDensity < originalDensity ) return originalDensity;
    return newDensity;
  }

  /**
   * @method pdfPageToTiff
   * @description convert a single page of a pdf to a image.  Extract the page from the pdf, correctly,
   * is hard.  This hacky process seems to work where we scale the requested width and density based
   * on the original pdf dimensions and density.
   * 
   * @param {String} file pdf file 
   * @param {Number} page page number 
   * @param {Number} width image width 
   * @param {Object} additonalOpts key/value pairs of ImageMagick options 
   * @returns {String} output file location
   */
  async pdfPageToTiff(file, page, width=1000, additonalOpts={}) {
    if( !additonalOpts.outputFormat ) throw new Error('outputFormat is required');
    if( typeof page === 'string' ) {
      page = parseInt(page.replace(/\//g, ''));
    }

    let outputBaseName = additonalOpts.outputBaseName || path.parse(file).name;

    let outputFile = path.join(path.parse(file).dir, outputBaseName+'-'+page+'.'+additonalOpts.outputFormat);
    let output = additonalOpts.output || '';

    let density = additonalOpts.density || 72;

    delete additonalOpts.output;
    delete additonalOpts.outputBaseName;
    delete additonalOpts.outputFormat;
    delete additonalOpts.density;
    delete additonalOpts.resize;

    let opts = [];
    for( let opt in additonalOpts ) {
      opts.push('-'+opt+' '+additonalOpts[opt]);
    }
    opts = opts.join(' ');

    let pdfPageDensity = await this.getPxPerInch(file, page);
    let dimensions = await this.getImageDimensions(file, page);
    let newDensity = this.getNewDensity(pdfPageDensity, dimensions.width, width);

    // first make a tiff
    let tmpTiff = path.join(path.parse(file).dir, outputBaseName+'-'+page+'-tmp.tif');
    await exec(`convert -density ${newDensity} ${file}[${page}] -resize ${width}x ${tmpTiff}`);

    // now convert to output file from tiff
    await exec(`convert -density ${density} ${tmpTiff} -density ${density} ${opts} ${output}${outputFile}`);
    await fs.unlink(tmpTiff);
    
    return outputFile;
  }

}

module.exports = new ImageMagickWrapper();