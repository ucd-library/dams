const fs = require('fs');
const path = require('path');
const {parseString} = require('xml2js');
const xmlbuilder = require('xmlbuilder');

function rootDjvu(imageDim, density=300) {
  const xml = xmlbuilder.create('OBJECT');
  xml.att('height', imageDim.height);
  xml.att('width', imageDim.width);
  xml.att('type', 'image/x.djvu');

  xml.ele('PARAM', {name: 'DPI', value: density})
  const mainColumn = xml.ele('HIDDENTEXT').ele('PAGECOLUMN');
  return {xml, mainColumn};
}

/**
 * @method run
 * @description convert hocr to djvu file
 * 
 * @param {String} hocrFile file path to hocr file 
 * @param {Number} scaleFactor scale factor between the ocr image and image used to
 *                 render inside the IA reader.  Default is 1.  Ex.  if the IA reader
 *                 image is 1/2 the size of the ocr image, then scaleFactor = 2.
 * @param {Object} imageDim contains the height/width of the image used to render
 * 
 * @returns 
 */
function run(hocrFile, scaleFactor=1, imageDim={}) {
  let fileInfo = path.parse(hocrFile);
  let djvuFile = path.join(fileInfo.dir, fileInfo.name + '.djvu');

  return new Promise((resolve, reject) => {
    let xml = fs.readFileSync(hocrFile);

    parseString(xml, (error, result) => {
      if( error ) return reject(error);

      const {xml, mainColumn} = rootDjvu(imageDim);

      for( let div of result.html.body ) {
        let page = div.div[0];
        if( !page.div ) continue;

        page.div.forEach(carea => {
          if( !carea.p ) return;
          
          let xmlRegion = mainColumn.ele('REGION');
          carea.p.forEach(par => {
            if( !par.span ) return;

            let xmlParagraph = xmlRegion.ele('PARAGRAPH');
            par.span.forEach(line => {
              if( !line.span ) return;

              let xmlLine = xmlParagraph.ele('LINE');
              line.span.forEach(word => {
                if( !word.$ ) return;
                if( !word.$.title ) return;

                let meta = word.$.title
                  .replace('bbox', '')
                  .split(';')
                  .map(item => item.trim())
                  .map(item => {
                    let bbox = item.split(' ')
                      .map((num) => Math.floor(parseInt(num)/scaleFactor))
                    
                    return [bbox[0], bbox[3], bbox[2], bbox[1]].join(',')
                  });

                let xconf = word.$.title.split(';')
                  .map(item => item.trim())
                  .find(item => item.startsWith('x_wconf'));
                if( !xconf ) xconf = '';

                xmlLine.ele('WORD', {
                  coords : meta[0],
                  'x-confidence' : xconf.replace('x_wconf ', '').trim()
                }, word._ || '');
              }); // line
            }) // paragraph
          }); // area
        }); // page
      }

      fs.writeFileSync(djvuFile, xml.end({pretty: true}))
      resolve(djvuFile);
    });
  });
}

module.exports = run;