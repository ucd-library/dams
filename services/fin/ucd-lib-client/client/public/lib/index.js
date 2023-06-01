let {Registry} = require('@ucd-lib/cork-app-utils');

const models =  {
  AuthModel : require('./models/AuthModel'),
  AppStateModel : require('./models/AppStateModel'),
  RecordModel : require('./models/RecordModel'),
  RecordVcModel : require('./models/RecordVcModel'),
  SearchVcModel : require('./models/SearchVcModel'),
  CollectionModel : require('./models/CollectionModel'),
  MediaModel : require('./models/MediaModel'),
  CitationModel : require('./models/CitationsModel'),
  SeoModel : require('./models/SeoModel'),
  FiltersModel : require('./models/FiltersModel'),
  FcAppConfigModel : require('./models/FcAppConfigModel'),
  BrowseByModel : require('./models/BrowseByModel')
};

Registry.ready();

module.exports = models;