import { LitElement} from 'lit';
import render from "./app-collection.tpl.js";
import {Mixin, MainDomElement} from '@ucd-lib/theme-elements/utils/mixins';
import { LitCorkUtils } from '@ucd-lib/cork-app-utils';

import "@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon";

import "../../components/cards/dams-item-card";
import '../../components/citation';

import user from '../../../lib/utils/user.js';
import utils from '../../../lib/utils/index.js';

class AppCollection extends Mixin(LitElement) 
  .with(MainDomElement, LitCorkUtils) {

  static get properties() {
    return {
      collectionId : { type : String },
      // adminRendered : { type : Boolean },
      description : { type : String },
      title : { type : String },
      thumbnailUrl : { type : String },
      thumbnailUrlOverride : { type : String },
      callNumber : { type : String },
      keywords : { type : Array },    
      items : { type : Number }, 
      yearPublished : { type : Number }, 
      highlightedItems : { type : Array },
      savedItems : { type : Array },
      dbsync : { type : Object },
      watercolor : { type : String },
      displayData : { type : Array },
      // isAdmin : { type : Boolean },
      isUiAdmin : { type : Boolean },
      editMode : { type : Boolean },
      itemCount : { type : Number },
      collectionSearchHref : {type: String},
      citationRoot: { type: Object },
      itemDefaultDisplay: { type: String },
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.active = true;

    this.appDataLoaded = false;
    this.reset();

    this._injectModel('AppStateModel', 'CollectionModel', 'RecordModel', 'FcAppConfigModel', 'SeoModel');
  }

  async firstUpdated() {
    this._onAppStateUpdate(await this.AppStateModel.get());
    this._onCollectionUpdate(await this.CollectionModel.get(this.AppStateModel.location.pathname));
  }

  /**
   * @method _onAppStateUpdate
   * @description on the App update, the state is determined and by checking
   * the location
   * 
   * @param {Object} e 
   */
   async _onAppStateUpdate(e) {
    if( this.AppStateModel.location.page !== 'collection' ) {
      this.reset();
      return;
    }
    if( this.collectionId === e.location.fullpath ) return;
    this.reset();

    this.collectionId = e.location.fullpath;

    await this._parseDisplayData();
    this._onCollectionUpdate(await this.CollectionModel.get(e.location.fullpath));
  }

  /**
   * @method _onCollectionUpdate
   * @description fired when collection updates
   * 
   * @param {Object} e 
   */
   async _onCollectionUpdate(e) {
    if( e.state !== 'loaded' ) return;
    if( this.AppStateModel.location.page !== 'collection' ) return;

    let searchObj = this.RecordModel.emptySearchDocument();
    this.RecordModel.appendKeywordFilter(searchObj, '@graph.isPartOf.@id', e.vcData.id);
    this.collectionSearchHref = '/search/'+this.RecordModel.searchDocumentToUrl(searchObj);

    this.collectionId = e.vcData.id;

    this.description = e.vcData.description
    this.title = e.vcData.title;
    
    this.thumbnailUrl = e.vcData.images?.medium?.url || e.vcData.images?.original?.url || ''; 
    
    this.callNumber = e.vcData.callNumber;
    this.keywords = (e.vcData.keywords || [])
      .map(keyword => {
        let searchObj = this.RecordModel.emptySearchDocument();
        this.RecordModel.appendKeywordFilter(searchObj, '@graph.keywords', keyword);
        return {
          label : keyword,
          href : '/search/'+this.RecordModel.searchDocumentToUrl(searchObj)
        }
      });
    this.items = e.vcData.count;
    this.yearPublished = e.vcData.yearPublished;
    
    this.citationRoot = e.payload.root;

    if( this.appDataLoaded && !this.savedItems.length ) {
      this.getLatestItems();
    }

    this._updateDisplayData();
  }

  async getLatestItems() {
    // default to most recent items by year published descending    
    let highlightedItems = await this.RecordModel.getRecentItems(this.collectionId, this.itemCount);
    if( highlightedItems.response.ok && highlightedItems.body.results.length ) {
      this.highlightedItems = highlightedItems.body.results.map((item, index) => {
        return {
          '@id' : item['@graph'][0]['@id'],
          description : item['@graph'][0].name,
          position : index+1,
          image : item['@graph'][0].thumbnailUrl
        };
      });
    }
  }

  reset() {
    this.collectionId = '';
    // this.adminRendered = false;
    this.description = '';
    this.title = '';
    this.thumbnailUrl = '';
    this.thumbnailUrlOverride = '';
    this.callNumber = '';
    this.keywords = [];    
    this.items = 0;
    this.yearPublished = 0;
    this.highlightedItems = [];
    this.savedItems = [];
    this.dbsync = {};
    this.watercolor = 'rose';
    this.displayData = [];
    // this.isAdmin = user.hasRole('admin');
    this.isUiAdmin = user.canEditUi();
    this.editMode = false;
    this.itemCount = 6;
    this.citationRoot = {};
    this.itemDefaultDisplay = 'Book Reader - 2 Page'; // one, list.. for admin pref on BR display type for items in this collection
  }

  /**
   * @method _onDefaultRecordSearchUpdate
   * @description fired from default search
   * 
   * @param {Object} e 
   */
  _onDefaultRecordSearchUpdate(e) {
    if( e.state !== 'loaded' || this.highlightedItems.length ) return;

    if( e.payload && e.payload.results ) {
      this.highlightedItems = e.payload.results.map((rg, index) => {
        return {
          '@id' : rg.root['@id'],
          description : rg.root.name,
          position : index+1,
          image : '' // rg.root.image.url
        };
      })
    }

    this._updateDisplayData();
  }

  _onItemDisplayChange(e) {
    this.itemCount = parseInt(e.target.value);
    
    let itemInputs = document.querySelectorAll('.item-ark-input');
    itemInputs.forEach((input, index) => {
      if( index+1 > this.itemCount ) {
        input.value = '';
      }
    });

    this._updateDisplayData();
  }

  /**
   * @method _onEditClicked
   * @description admin ui, edit button click event
   * 
   * @param {Object} e 
   */
  _onEditClicked(e) {
    if( !this.isUiAdmin ) return;
    this.editMode = true;
  }

  /**
   * @method _onSaveClicked
   * @description admin ui, save button click event
   * 
   * @param {Object} e 
   */
  async _onSaveClicked(e) {
    if( !this.isUiAdmin ) return;

    this.editMode = false;

    // TODO how to handle validation that all 6 featured items are populated? or more like how to alert user

    // parse highlighted items
    this.savedItems = [];
    let newSavedItems = [];
    let itemInputs = document.querySelectorAll('.item-ark-input');
    itemInputs.forEach((input, index) => {
      if( input.value ) {
        newSavedItems.push({
          '@id' : input.value,
          position : index+1
        });
      }
    });
    this.savedItems = [...newSavedItems];
    
    this._updateDisplayData();
    let featuredImage = document.querySelector('#file-upload').files[0];
    await this.FcAppConfigModel.saveCollectionDisplayData(this.collectionId, this.displayData);
    if( featuredImage ) {
      await this.FcAppConfigModel.saveCollectionFeaturedImage(this.collectionId, featuredImage);
    }
    
    this.requestUpdate(); 
    this.AppStateModel.setLocation(this.collectionId);
    // this._parseDisplayData();
  }

  /**
   * @method _onCancelEditClicked
   * @description admin ui, cancel editing button click event
   * 
   * @param {Object} e 
   */
  _onCancelEditClicked(e) {
    if( !this.isUiAdmin ) return;
    this.editMode = false;
  }

  /**
   * @method _onWatercolorChanged
   * @description admin ui, change to featured image watercolor
   * 
   * @param {Object} e 
   */
  _onWatercolorChanged(e) {
    if( !this.isUiAdmin ) return;
    this.watercolor = e.target.classList[0];
    this._updateDisplayData();
  }

  /**
   * @description _parseDisplayData, get application container data to set collection specific display data (watercolors, highlighted items, featured image)
   */
  async _parseDisplayData() {
    this.savedItems = [];

    let savedDisplayData = await this.FcAppConfigModel.getAdminData(this.collectionId);

    // let savedDisplayData = await utils.getAppConfigCollectionGraph(this.collectionId, this.FcAppConfigModel);
    if( !savedDisplayData ) {
      this.appDataLoaded = true;
      return;
    }

    savedDisplayData = savedDisplayData.body['@graph'];

    let watercolor = savedDisplayData.filter(d => d['@id'].indexOf('/application/#') > -1)[0];
    if( watercolor ) {
      this.watercolor = watercolor['css'];
    }

    let graphRoot = savedDisplayData.filter(d => d['@id'].indexOf('/application/ucd-lib-client') > -1)[0];
    if( !graphRoot ) {
      this.appDataLoaded = true;
      return;
    }

    // featured items
    let items = graphRoot['exampleOfWork'];
    if( items ) {
      if( !Array.isArray(items) ) items = [items];
      
      items.forEach((item, index) => {
        this.savedItems.push({
          '@id' : '/item' + item.split('/item')?.[1],
          position : index+1
        });  
      });
    }
    this.highlightedItems = [...this.savedItems];
    if( !this.savedItems.length ) this.getLatestItems();

    // featured image
    if( graphRoot['thumbnailUrl']?.split('/fcrepo/rest')?.[1] ) {
      this.thumbnailUrlOverride = '/fcrepo/rest'+ graphRoot['thumbnailUrl'].split('/fcrepo/rest')[1];
    }

    // itemCount
    this.itemCount = graphRoot['http://digital.library.ucdavis.edu/schema/itemCount'];
    if( !(this.itemCount >= 0) ) this.itemCount = 6;
    // hack for checkboxes occasionally not being selected
    if( this.itemCount === 0 ) this.querySelector('#zero').checked = true; 
    if( this.itemCount === 3 ) this.querySelector('#three').checked = true;
    if( this.itemCount === 6 ) this.querySelector('#six').checked = true;

    this.itemDefaultDisplay = graphRoot['itemDefaultDisplay'] || this.itemDefaultDisplay;
    if( this.itemDefaultDisplay === 'Book Reader - 2 Page' ) this.querySelector('#two').checked = true;
    if( this.itemDefaultDisplay === 'Book Reader - Single Page' ) this.querySelector('#one').checked = true;
    if( this.itemDefaultDisplay === 'Image List' ) this.querySelector('#list').checked = true;

    this.appDataLoaded = true;
    this._updateDisplayData();
    this.requestUpdate();
  }

  _updateDisplayData() {
    this.displayData = {
      "@context" : {
        "@vocab" : "http://schema.org/",
        "@base" : "info:fedora/application/collection",
        "fedora" : "http://fedora.info/definitions/v4/repository#",
        "ldp" : "www.w3.org/ns/ldp#",
        "schema" : "http://schema.org/",
        "ucdlib" : "http://digital.library.ucdavis.edu/schema/",
        "xsd" : "http://www.w3.org/2001/XMLSchema#",
        "collection" : {
          "@type" : "@id",
          "@id" : "ucdlib:collection"
        },
        "watercolors" : {
          "@type" : "@id",
          "@id" : "ucdlib:watercolors"
        },
        "foreground" : {
          "@type" : "xsd:text",
          "@id" : "ucdlib:foreground"
        },
        "background" : {
          "@type" : "xsd:text",
          "@id" : "ucdlib:background"
        },
        "ldp:membershipResource" : {
          "@type" : "@id"
        },
        "ldp:hasMemberRelation" : {
          "@type" : "@id"
        }
      },
      "@id" : `info:fedora/application/ucd-lib-client${this.collectionId}`,
      "watercolors" : [
        {
          "@id" : `info:fedora/application/#${this.watercolor}`,
          "css" : this.watercolor,
          "foreground" : "",
          "background" : ""
        }
      ],
      "name" : this.title,
      isPartOf : [{'@id' : 'info:fedora'+this.collectionId}],
      "thumbnailUrl" : {
          "@id" : `info:fedora/application/ucd-lib-client${this.collectionId}/featuredImage.jpg`
      },
      "ucdlib:itemCount" : this.itemCount,
      "ucdlib:itemDefaultDisplay" : this.itemDefaultDisplay,
      "exampleOfWork" : this.savedItems
    };
  }

  async _onFileChange(e) {  
    let selectedFilename = e.target.value.split('\\').pop();
    if( !selectedFilename.length ) return;

    
    // replace current thumbnail with new image
    let file = e.target.files[0];
    document.querySelector('.featured-image').style.backgroundImage = 'url('+window.URL.createObjectURL(file)+')';
  }
  
}

customElements.define('app-collection', AppCollection);