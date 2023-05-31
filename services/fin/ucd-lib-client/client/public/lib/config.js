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
          return 'collection: ' + APP_CONFIG.collectionLabels[value];
        }
        return 'collection: ' + value;
      }
    },
    '@graph.fileFormat' : {
      label : 'File Format',
      type : 'facet',
      valueMap : (value) => {
        if ( value.match(/^video\/(.*)/i) ) {
          return 'format: Video ('+value.match(/^video\/(.*)/)[1]+')';
        }
        if( value.match(/^image\/(.*)/i) ) {
          return 'format: Image ('+value.match(/^image\/(.*)/)[1]+')';
        }
        if( value === 'application/pdf' ) {
          return 'format: PDF';
        }
        if( value.match(/(\w*)\/(.*)/) ) {
          let match = value.match(/(\w*)\/(.*)/);
          return 'format: '+match[1]+' ('+match[2]+')';
        }
        return 'format: '+value;
      }
    },
    '@graph.creator.name' : {
      label : 'Creator',
      type : 'facet',
      valueMap : (value) => {
        return 'creator: '+value;
      }
    },
    '@graph.about.name.raw' : {
      label : 'Subject',
      type : 'facet',
      typeahead : 'abouts',
      valueMap : (value) => {
        return 'subject: '+value;
      }
    },
    '@graph.yearPublished' : {
      label : 'Published',
      type : 'range'
    },
    // 'node.license.@id' : {
    //   label : 'Rights',
    //   type : 'facet',
    //   valueMap : rightsMap
    // },
    // '@graph.type.raw' : {
    //   label : 'Type',
    //   type : 'facet',
    //   typeahead: 'type',
    //   ignore : ['CreativeWork', 'MediaObject'],
    //   valueMap : value => value.replace(/(.)([A-Z])/g, '$1 $2')
    // }
  },

  textFields : {
    record : ['@graph.name', '@graph.description', '@graph.identifier', '@graph.about', '@graph.keywords', '@graph.alternativeHeadline', '@graph.indexableContent'],
    collection : ['@graph.name', '@graph.description', '@graph.about', '@graph.keywords']
  },
  
  // max number of facets filter options
  maxFacetCount : 50
}

module.exports = config;