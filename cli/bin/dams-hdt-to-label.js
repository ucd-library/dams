const {Command} = require('commander');
const program = new Command();
const fs = require('fs');
const path = require('path');
const hdt = require('hdt');

program
  .argument('<path>')
  .description('convert hdt file to labels.jsonld.json')
  .action((file, options) => {
    run(file)
  });

async function run(file) {
  console.log('file', file);
  let hdtDoc = await hdt.fromFile(file);

  let jsonld = [{
    '@id' : '',
    '@context' : {
      ucdlib: 'http://digital.ucdavis.edu/schema#' 
    },
    '@type' : ['ucdlib:LabelService', 'ucdlib:Service'],
  }]

  let result = await hdtDoc.searchTriples();
  for( let quad of result.triples ) {
    jsonld.push({
      '@id' : quad.subject.value,
      [quad.predicate.value] : quad.object.value
    });
  }
  
  let fileInfo = path.parse(file);
  fs.writeFileSync(
    path.join(fileInfo.dir, 'labels.jsonld.json'),
    JSON.stringify(jsonld, null, 2)
  );
}

program.parse(process.argv);