const hdt = require('hdt');
const path = require('path');
const fs = require('fs');

const file = process.argv[2];

(async function() {
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
})();