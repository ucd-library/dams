let rights = require('./rights');
let config = APP_CONFIG;

let rightsMap = {};
for( var key in rights ) {
  rightsMap[key] =  rights[key].text;
}

config.fcrepoBasePath = '/fcrepo/rest';

// facets to show on left side
config.elasticSearch = {
  facets : {
    '@graph.isPartOf.@id' : {
      label : 'Collection',
      type : 'facet',
      valueMap : (value) => {
        if( APP_CONFIG.collectionLabels[value] ) {
          return 'Collection: ' + APP_CONFIG.collectionLabels[value];
        }
        return 'Collection: ' + value;
      }
    },
    '@graph.fileFormatSimple' : {
      label : 'File Format',
      type : 'facet'
    },
    '@graph.creator.name' : {
      label : 'Creator',
      type : 'facet',
      valueMap : (value) => {
        return 'Creator: '+value;
      }
    },
    '@graph.subjects.name' : {
      label : 'Subject',
      type : 'facet',
      typeahead : 'abouts',
      valueMap : (value) => {
        return 'Subject: '+value;
      }
    },
    '@graph.yearPublished' : {
      label : 'Date Published',
      type : 'range'
    }
  },

  textFields : {
    record : ['name.punctuation_insensitive', '@graph.description', '@graph.identifier', '@graph.about', '@graph.keywords', '@graph.alternativeHeadline', '@graph.indexableContent'],
    collection : ['name', '@graph.description', '@graph.about', '@graph.keywords']
  },
  
  // max number of facets filter options
  maxFacetCount : 50
}

module.exports = config;