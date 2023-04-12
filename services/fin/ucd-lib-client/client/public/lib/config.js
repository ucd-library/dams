let rights = require('./rights');

let rightsMap = {};
for( var key in rights ) {
  rightsMap[key] =  rights[key].text;
}

module.exports = {
  fcrepoBasePath : '/fcrepo/rest',

  metadata : {
    title : 'UC Davis Digital Collections',
    description : 'The UC Davis Digital Collections is a locally developed digital repository that was designed to store and manage the digital assets of UC Davis. These Digital Collections are intended to increase access to previously undiscoverable digital assets held by the University Library.'
  },

  gaCode : 'UA-65988958-10',

  // used by image download selector
  // options for iiif service
  imageDownload : {
    sizes : [
      {
        label : 'Full Resolution',
        imageType : 'FR',
        ratio : 1
      },
      {
        label : 'Large',
        imageType : 'L',
        ratio : 0.75
      },
      {
        label : 'Medium',
        imageType : 'M',
        ratio : 0.5
      },
      {
        label : 'Small',
        imageType : 'S',
        ratio : 0.25
      }
    ],
    // pulling webp option due to loris issues
    // formats : ['png', 'jpg', 'webp']
    formats : ['png', 'jpg']
  },

  // facets to show on left side
  elasticSearch : {
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
  },

};
