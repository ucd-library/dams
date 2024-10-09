let {config} = require('@ucd-lib/fin-service-utils');

let env = process.env.CLIENT_ENV || 'dev';

let clientPackage = require('./client/public/package.json');

let clientPackageVersion = clientPackage.version;
if( process.env.APP_VERSION ) {
  clientPackageVersion = process.env.APP_VERSION;
}

config.client = {
  // TODO: move this to fcrepo
  title : 'UC Davis Library Digital Collections',
  description : 'The UC Davis Digital Collections is a locally developed digital repository that was designed to store and manage the digital assets of UC Davis. These Digital Collections are intended to increase access to previously undiscoverable digital assets held by the University Library.',

  appName : process.env.FIN_APP_NAME || 'ucd-lib-client',
  assets : (env === 'prod') ? 'dist' : 'public',
  appRoutes : ['about', 'item', 'search', 'browse', 'collections', 'collection', 'components'],
  versions : {
    bundle : clientPackageVersion,
    loader : clientPackage.dependencies['@ucd-lib/cork-app-load'].replace(/^\D/, '')
  },

  env : {
    CLIENT_ENV : env,
    FIN_APP_VERSION : process.env.FIN_APP_VERSION || '',
    FIN_REPO_TAG : process.env.FIN_REPO_TAG || '',
    FIN_BRANCH_NAME : process.env.FIN_BRANCH_NAME || '',
    FIN_SERVER_REPO_HASH : process.env.FIN_SERVER_REPO_HASH || '',
    APP_VERSION : process.env.APP_VERSION || '',
    BUILD_NUM : process.env.BUILD_NUM || '',
    UCD_DAMS_REPO_BRANCH : process.env.UCD_DAMS_REPO_BRANCH || '',
    UCD_DAMS_REPO_TAG : process.env.UCD_DAMS_REPO_TAG || '',
    UCD_DAMS_REPO_SHA : process.env.UCD_DAMS_REPO_SHA || '',
    UCD_DAMS_DEPLOYMENT_SHA : process.env.UCD_DAMS_DEPLOYMENT_SHA || '',
    UCD_DAMS_DEPLOYMENT_BRANCH : process.env.UCD_DAMS_DEPLOYMENT_BRANCH || '',
    UCD_DAMS_DEPLOYMENT_TAG : process.env.UCD_DAMS_DEPLOYMENT_TAG || '',
    FIN_SERVER_IMAGE : process.env.FIN_SERVER_IMAGE || ''
  },
  logger : {
    logLevel : process.env.CLIENT_LOG_LEVEL || 'warn',
    logLevels : process.env.CLIENT_LOG_LEVELS ? JSON.parse(process.env.CLIENT_LOG_LEVELS) : {},
    reportErrors : {
      enabled : process.env.CLIENT_ERROR_REPORTING_ENABLED === 'true',
      url : process.env.CLIENT_ERROR_REPORTING_URL || '',
      key : process.env.CLIENT_ERROR_REPORTING_KEY || '',
      customAttributes : {
        appName : 'dams',
        appOwner : 'digital'
      }
    }
  },

  featuredImages : [
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/amerine-menu-d73035.jpg",
      itemName : "B.O.A.C. Dinner Service",
      collectionName : "Amerine (Maynard) Menu Collection",
      itemLink : "/item/ark:/87287/d73035",
      collectionLink : "/collection/ark:/87287/d79c7b"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/amerine-menu-d7r91d.jpg",
      itemName : "Air France - Paris-Washington",
      collectionName : "Amerine (Maynard) Menu Collection",
      itemLink : "/item/ark:/87287/d7r91d",
      collectionLink : "/collection/ark:/87287/d79c7b"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/amerine-menu-d7xp58.jpg",
      itemName : "Comité National des Vins de France: A Tasting of French Red Wines",
      collectionName : "Amerine (Maynard) Menu Collection",
      itemLink : "/item/ark:/87287/d7xp58",
      collectionLink : "/collection/ark:/87287/d79c7b"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/amerine-menu-d7xp6n.jpg",
      itemName : "Japan Air",
      collectionName : "Amerine (Maynard) Menu Collection",
      itemLink : "/item/ark:/87287/d7xp6n",
      collectionLink : "/collection/ark:/87287/d79c7b"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/BioAg-AR_012_1478.jpg",
      itemName : "Early Types Deep Tillage Tools, California",
      collectionName : "Department of Biological and Agricultural Engineering Photographs",
      itemLink : "/item/ark:/87293/d3ns0m251",
      collectionLink : "/collection/ag_eng"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/BioAg-AR_012_570.jpg",
      itemName : "General Purpose Barn",
      collectionName : "Department of Biological and Agricultural Engineering Photographs",
      itemLink : "/item/ark:/87293/d3vd6p84d",
      collectionLink : "/collection/ag_eng"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/eastman-B-1076.jpg",
      itemName : "Thompson Lake",
      collectionName : "Eastman's Originals Collection",
      itemLink : "/item/ark:/13030/tf1r29n5v8",
      collectionLink : "/collection/eastman"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/eastman-B-1107.jpg",
      itemName : "Early Day Logging",
      collectionName : "Eastman's Originals Collection",
      itemLink : "/item/ark:/13030/tf7t1nb3p0",
      collectionLink : "/collection/eastman"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/eastman-C-726.jpg",
      itemName : "Pelicans",
      collectionName : "Eastman's Originals Collection",
      itemLink : "/item/ark:/13030/tf138nb09d",
      collectionLink : "/collection/eastman"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/eastman-P-0459.jpg",
      itemName : "Logging in 1895",
      collectionName : "Eastman's Originals Collection",
      itemLink : "/item/ark:/13030/tf4p3004rm",
      collectionLink : "/collection/eastman"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/eastman-T-2094.jpg",
      itemName : "Rodeo + Races",
      collectionName : "Eastman's Originals Collection",
      itemLink : "/item/ark:/13030/tf200003s0",
      collectionLink : "/collection/eastman"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/greene-D192_7_079.jpg",
      itemName : "Photo album p. 39, Traful River",
      collectionName : "Greene, Henry Dart Papers",
      itemLink : "/item/ark:/87293/d3kj54",
      collectionLink : "/collection/greene-papers"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/greene-D192_7_087.jpg",
      itemName : "Photo album p. 42, Mar del Plata",
      collectionName : "Greene, Henry Dart Papers",
      itemLink : "/item/ark:/87293/d3pb50",
      collectionLink : "/collection/greene-papers"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/henchey-d3cb3f.jpg",
      itemName : "Hydraulic Mines, Scales, Sierra County, California, SV-1164",
      collectionName : "Henchey (Paul L.) Photographs",
      itemLink : "/item/ark:/87293/d3cb3f",
      collectionLink : "/collection/henchey"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/henchey-d3gm7n.jpg",
      itemName : "Lodge and Cabins built in 1860's",
      collectionName : "Henchey (Paul L.) Photographs",
      itemLink : "/item/ark:/87293/d3gm7n",
      collectionLink : "/collection/henchey"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/hunt-D104_1_13.jpg",
      itemName : "511. Costa Rica: coconut palms near Port Limon",
      collectionName : "Hunt (Thomas Forsyth) Papers",
      itemLink : "/item/ark:/87293/d37t99",
      collectionLink : "/collection/hunt"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/hunt-D104_1_50.jpg",
      itemName : "548. Costa Rica: beneficio at Mata Redonda belonging to Miguel Guisginiani",
      collectionName : "Hunt (Thomas Forsyth) Papers",
      itemLink : "/item/ark:/87293/d3g74q",
      collectionLink : "/collection/hunt"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/irrigation-700-A-a-249.jpg",
      itemName : "Water Pouring Over Sweet Water Dam After Raising about 1911. California.",
      collectionName : "Department of Irrigation Photographs",
      itemLink : "/item/ark:/87293/d37n2x",
      collectionLink : "/collection/irrigation"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/irrigation-700-A-a-329-2.jpg",
      itemName : "Don Pedro Dam, spillway crest (2 neg.)",
      collectionName : "Department of Irrigation Photographs",
      itemLink : "/item/ark:/87293/d3k19g",
      collectionLink : "/collection/irrigation"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/lehmann-d74s4s.jpg",
      itemName : "Christmas Catalog 1969",
      collectionName : "Sherry Lehmann Wine Catalogs",
      itemLink : "/item/ark:/87287/d74s4s",
      collectionLink : "/collection/sherry-lehmann"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/lehmann-d7hg6v.jpg",
      itemName : "Annual Winter Sale 1952",
      collectionName : "Sherry Lehmann Wine Catalogs",
      itemLink : "/item/ark:/87287/d7hg6v",
      collectionLink : "/collection/sherry-lehmann"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/lehmann-d7mm2n.jpg",
      itemName : "Holiday 1997: Season's Greetings from Sherry-Lehmann",
      collectionName : "Sherry Lehmann Wine Catalogs",
      itemLink : "/item/ark:/87287/d7mm2n",
      collectionLink : "/collection/sherry-lehmann"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/lug-D211_22_43.jpg",
      itemName : "Arden Villa",
      collectionName : "Lug and Can Label Collection",
      itemLink : "/item/ark:/87293/d3tm7240c",
      collectionLink : "/collection/lug_labels"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/lug-D211_37_3.jpg",
      itemName : "Mariposa",
      collectionName : "Lug and Can Label Collection",
      itemLink : "/item/ark:/87293/d31z41w7c",
      collectionLink : "/collection/lug_labels"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/lug-D211_38_56.jpg",
      itemName : "BoLo",
      collectionName : "Lug and Can Label Collection",
      itemLink : "/item/ark:/87293/d3mw28h94",
      collectionLink : "/collection/lug_labels"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/lug-D211_38_68.jpg",
      itemName : "R-C",
      collectionName : "Lug and Can Label Collection",
      itemLink : "/item/ark:/87293/d32v2cd49",
      collectionLink : "/collection/lug_labels"
    },  
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/NVWL_report_spring_1991_page4.jpg",
      itemName : "Napa Valley Wine Library Report, Spring 1991",
      collectionName : "Napa Valley Wine Library Reports",
      itemLink : "/item/ark:/87287/d7mt0z",
      collectionLink : "/collection/nvwl"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/NVWL_Slide_24.jpg",
      itemName : "Inglenook Vineyard, Rutherford, Napa County: Napa Valley",
      collectionName : "Wait (Frona Eunice) Lantern Slides of California Wine Country",
      itemLink : "/item/ark:/87293/d34j0b194",
      collectionLink : "/collection/lantern_slides"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/NVWL_Slide_30.jpg",
      itemName : "Inglenook Vineyard, Rutherford, Napa County: Vineyard and Carriage House",
      collectionName : "Wait (Frona Eunice) Lantern Slides of California Wine Country",
      itemLink : "/item/ark:/87293/d3c24qr6h",
      collectionLink : "/collection/lantern_slides"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/punjabis-d33k6h-1989.jpg",
      itemName : "Vancouver Sikh Parade",
      collectionName : "Pioneering Punjabis Digital Archive",
      itemLink : "/item/ark:/87293/d33k6h",
      collectionLink : "/collection/pioneering-punjabis"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/punjabis-d3mw2r.jpg",
      itemName : "Birdseye View of Maryville",
      collectionName : "Pioneering Punjabis Digital Archive",
      itemLink : "/item/ark:/87293/d3mw2r",
      collectionLink : "/collection/pioneering-punjabis"
    },
    {
      imageUrl : "/fcrepo/rest/application/ucd-lib-client/default-images/featured/slater-d3m09f-180.jpg",
      itemName : "France versus United States at Colombes",
      collectionName : "Slater (Colby E. \"Babe\") Collection",
      itemLink : "/item/ark:/87293/d3m09f",
      collectionLink : "/collection/slater"
    }
  ]
};

module.exports = config;