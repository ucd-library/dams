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
      '@graph.publisher.name' : {
        label : 'Collection',
        type : 'facet',
        valueMap : (value) => {
          // let collection = APP_CONFIG.collections.find(c => c['@id'] === value);
          // if( collection && collection.name ) return collection.name;
          // return value;
          return 'collection: '+value;
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

  // browse-by side images
  browseByImages : {
    subjectPage : [
      {
        page : 1,
        leftImgUrl : '/images/watercolors/watercolor-lug-D211_5_38-left-white.png',
        rightImgUrl : '/images/watercolors/watercolor-lehmann-d76p4c-right-white.png'
      },
      {
        page : 2,
        leftImgUrl : '/images/watercolors/watercolor-eastman-B-1614-left-white.png',
        rightImgUrl : '/images/watercolors/watercolor-eastman-B-1614-right-white.png'
      }
    ],
    creatorPage : [
      {
        page : 1,
        leftImgUrl : '/images/watercolors/watercolor-campbell-mc022_2_40-left-white.png',
        rightImgUrl : '/images/watercolors/watercolor-eastman-P-2214-right-white.png'
      },
      {
        page : 2,
        leftImgUrl : '/images/watercolors/watercolor-everest-d3d02x-left-white.png',
        rightImgUrl : '/images/watercolors/watercolor-greene-D192_6_141-right-white.png'
      }
    ],
    formatPage : [
      {
        page : 1,
        leftImgUrl : '/images/watercolors/watercolor-027-Willow_Slough-left-white.png',
        rightImgUrl : '/images/watercolors/watercolor-d3b979-036-left-white.png'
      },
      {
        page : 2,
        leftImgUrl : '/images/watercolors/watercolor-d3dt26-221-right-white.png',
        rightImgUrl : '/images/watercolors/watercolor-d3031v-1962-right-white.png'
      }
    ]
  }
};
