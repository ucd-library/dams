const fs = require('fs');
const path = require('path');
const {parseString} = require('xml2js');
const xmlbuilder = require('xmlbuilder');

function rootDjvu() {
  const xml = xmlbuilder.create('OBJECT');
  xml.ele('PARAM', {name: 'foo', value: 'bar'})
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
 * @returns 
 */
function run(hocrFile, scaleFactor=1) {
  let fileInfo = path.parse(hocrFile);
  let djvuFile = path.join(fileInfo.dir, fileInfo.name + '.djvu');

  return new Promise((resolve, reject) => {
    let xml = fs.readFileSync(hocrFile);

    parseString(xml, (error, result) => {
      if( error ) return reject(error);

      const {xml, mainColumn} = rootDjvu();

      for( let div of result.html.body ) {
        let page = div.div[0];

        page.div.forEach(carea => {
          
          let xmlRegion = mainColumn.ele('REGION');
          carea.p.forEach(par => {
            let xmlParagraph = xmlRegion.ele('PARAGRAPH');
            par.span.forEach(line => {
              let xmlLine = xmlParagraph.ele('LINE');
              line.span.forEach(word => {
                
                let meta = word.$.title
                  .replace('bbox', '')
                  .split(';')
                  .map(item => item.trim())
                  .map(item => {
                    return item.split(' ').map(num => Math.floor(parseInt(num)/scaleFactor)).join(',')
                  });

                xmlLine.ele('WORD', {
                  coords : meta[0],
                  'x-confidence' : meta[1].replace('x_wconf ', '')
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