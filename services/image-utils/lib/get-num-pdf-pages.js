/**
 * @method getNumPdfPages
 * @description wrapper around pdfinfo to get number of pages in a pdf
 * 
 * @param {String} file path to pdf file 
 * @returns {Promise}
 */
async function getNumPdfPages(file) {
  // let {stdout, stderr} = await exec(`pdfinfo ${file} | awk '/^Pages:/ {print $2}'`);
  let {stdout, stderr} = await exec(`pdfinfo ${file}`);
  let lines = stdout.split('\n')
    .map(line => line.trim())
    .filter(line => line.match(/^Pages:/))
    .map(line => parseInt(line.replace(/^Pages:\s+/, '')));

  return lines[0];
}

module.exports = getNumPdfPages;
