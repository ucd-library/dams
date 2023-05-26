import { LitElement} from 'lit';
import render from "./app-collection.tpl.js";
import JSONFormatter from 'json-formatter-js'

import "@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon";

import "../../components/cards/dams-item-card";
import '../../components/citation';

import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/keybinding-vim";

class AppCollection extends Mixin(LitElement) 
    .with(LitCorkUtils) {

  static get properties() {
    return {
      collectionId : { type : String },
      adminRendered : { type : Boolean },
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
      isAdmin : { type : Boolean },
      isUiAdmin : { type : Boolean },
      editMode : { type : Boolean },
      itemDisplayCount : { type : Number }
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.active = true;

    this.reset();

    this._injectModel('AppStateModel', 'CollectionModel', 'RecordModel', 'CollectionVcModel', 'FcAppConfigModel', 'SeoModel');
  }

  async firstUpdated() {
    this._onAppStateUpdate(await this.AppStateModel.get());
  }

  willUpdate() {
    // this._showAdminPanel();
    // could we check if this.adminRendered is false here to hide the admin section? or possibly recall the showAdmin function?
    if( !this.adminRendered && !this.collectionId ) {
      // this.collectionId = window.location.pathname;
    } else if( !this.adminRendered && this.collectionId ) {
      this._showAdminPanel();
    }
  }

  /**
   * @method _onAppStateUpdate
   * @description on the App update, the state is determined and by checking
   * the location
   * 
   * @param {Object} e 
   */
   async _onAppStateUpdate(e) {
    if( e.location.path[0] !== 'collection' && this.collectionId === e.location.fullpath ) return;
    this.reset();

    this.collectionId = e.location.fullpath;

    await this._parseDisplayData();
    await this.CollectionModel.get(this.collectionId);
    
    this._createEditor();
  }

  /**
   * @description _onCollectionVcUpdate, fired when collection viewController updates
   * @param {*} e 
   */
   async _onCollectionVcUpdate(e) {
    if( e.state !== 'loaded' ) return;
    
    this.collectionId = e.payload.results.id;
    this.description = e.payload.results.description
    this.title = e.payload.results.title;
    this.thumbnailUrl = e.payload.results.thumbnailUrl;
    this.callNumber = e.payload.results.callNumber;
    this.keywords = e.payload.results.keywords;
    this.items = e.payload.results.count;
    this.yearPublished = e.payload.results.yearPublished;

    // try to load from app container first
    if( !this.savedItems.length ) {
      // default to most recent 3 items by year published descending    
      let highlightedItems = await this.RecordModel.getRecentItems(this.collectionId, 3);
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

    this._showAdminPanel();

    // search highlighted collection items
    // this.RecordModel.searchHighlighted(this.collectionId, true, true);

    this._updateDisplayData();
  }

  reset() {
    this.collectionId = '';
    this.adminRendered = false;
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
    this.isAdmin = (APP_CONFIG.user?.loggedIn && APP_CONFIG.user?.roles?.includes('admin'));
    this.isUiAdmin = (APP_CONFIG.user?.loggedIn && APP_CONFIG.user?.roles?.includes('ui-admin'));
    this.editMode = false;
    this.itemDisplayCount = 6;
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
    this.itemDisplayCount = parseInt(e.target.value);
    
    let itemInputs = this.shadowRoot.querySelectorAll('.item-ark-input');
    itemInputs.forEach((input, index) => {
      if( index+1 > this.itemDisplayCount ) {
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

    // TODO how to handle validation that all 6 featured items are populated? or more like how to alert user

    // parse highlighted items
    this.savedItems = [];
    let newSavedItems = [];
    let itemInputs = this.shadowRoot.querySelectorAll('.item-ark-input');
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
    let featuredImage = this.shadowRoot.querySelector('#file-upload').files[0];
    await this.FcAppConfigModel.saveCollectionDisplayData(this.collectionId, this.displayData, featuredImage);
    
    this.editMode = false;

    this.requestUpdate(); 
    // TODO for some reason this.savedItems isn't updating the view, even with requestUpdate()
    //  so the ordering doesn't update until page load
    // this._onAppStateUpdate(await this.AppStateModel.get()); // also doesn't work
    this.AppStateModel.setLocation(this.collectionId);
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
   * @description _showAdminPanel, checks if user is an admin and populates admin section with data
   */
  async _showAdminPanel() {
    if( !this.isAdmin ) return;
    if( !this.adminRendered ) {
      const adminData = await this.CollectionModel.getAdminData(this.collectionId);
      if( adminData && adminData.response && adminData.response.status === 200 ) {

        const response = adminData.body;
        if( response && !this.adminRendered ) {
          this.dbsync = response.dbsync;

          this.shadowRoot.querySelector('.admin-content')
            .appendChild((new JSONFormatter(Object.values(this.dbsync)[0], 1)).render());
          this.adminRendered = true;
          this.shadowRoot.querySelector('.admin-heading').style.display = '';
          this.shadowRoot.querySelector('.admin-content').style.display = '';  
        }
      }
    }
  }

  /**
   * @description _parseDisplayData, get application container data to set collection specific display data (watercolors, highlighted items, featured image)
   */
  async _parseDisplayData() {
    // not sure if we'll have transform service to always create same jsonld structure
    // for now just parse out values and set consistent structure
    // try to load from app_config
    let savedDisplayData = APP_CONFIG.fcAppConfig[`/application/ucd-lib-client${this.collectionId}${this.collectionId.replace('/collection', '')}.jsonld.json`];
    if( savedDisplayData ) {
      // watercolor
      let watercolor = savedDisplayData['graph'].filter(g => g['@id'].indexOf('/application/#') > -1)[0];
      if( watercolor ) {
        this.watercolor = watercolor.css;
      }

      // featured items
      let graphRoot = savedDisplayData['graph'].filter(d => d['@id'] === '/application'+this.collectionId)[0];
      if( graphRoot ) {
        let items = graphRoot.exampleOfWork;
        if( items ) {
          if( !Array.isArray(items) ) items = [items];
          items.forEach(item => {
            let match = savedDisplayData['graph'].filter(d => d['@id'] === item)[0];
            if( match ) {
              this.savedItems.push({
                '@id' : match['@id'],
                position : match['http://schema.org/position']
              });
            }
          });

          this.savedItems.sort((a,b) => a.position - b.position);
          console.log('this.savedItems line 306 _parseDisplayData', this.savedItems);
        }
      
        // featured image
        this.thumbnailUrlOverride = '/fcrepo/rest'+ graphRoot.thumbnailUrl;

        // itemDisplayCount
        this.itemDisplayCount = graphRoot['http://digital.library.ucdavis.edu/schema/itemCount'];
      }    

    } else {
      // otherwise ping fcrepo
      try {
        savedDisplayData = await this.FcAppConfigModel.getCollectionAppData(this.collectionId);      
      } catch(e) {
        console.error(e);
        return;
      }

      if( savedDisplayData && savedDisplayData.body ) {
        savedDisplayData = JSON.parse(savedDisplayData.body);
        let watercolor = savedDisplayData.filter(d => d['@id'].indexOf('/application/#') > -1)[0];
        if( watercolor ) {
          this.watercolor = watercolor['http://schema.org/css'][0]['@value'];
        }

        // TODO
        // featured items
        
        // featured image

        // itemDisplayCount

      }
    }
    
    this._updateDisplayData();
  }

  _updateDisplayData() {
    this.displayData = JSON.parse(`
      {
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
      "@id" : "collection/${this.collectionId.replace('/collection/', '')}",
      "watercolors" : [
        {
          "@id" : "info:fedora/application/#${this.watercolor}",
          "css" : "${this.watercolor}",
          "foreground" : "",
          "background" : ""
        }
      ],
      "name" : "${this.title}",
      "thumbnailUrl" : {
          "@id" : "info:fedora/application/ucd-lib-client${this.collectionId}/featuredImage.jpg"
      },
      "ucdlib:itemCount" : ${this.itemDisplayCount},
      "exampleOfWork" : 
        ${JSON.stringify(this.savedItems)}
    }`);
  }

  /**
   * @description _createEditor, creates ace-build editor for changing display preferences
   */
  _createEditor() {
    let editor = ace.edit(this.shadowRoot.querySelector('.display-editor-root'));
    // let type = 'Admin Display Preferences'; // editorRoot.getAttribute('type');
    editor.renderer.attachToShadowRoot();
    // editor.setValue(assetDefs.textSearchFields[type].join('\n'));
    editor.setValue(JSON.stringify(this.displayData, null, '\t'));
    editor.getSession().on('change', () => {
      // let values = editor.getValue()
      //   .split('\n')
      //   .map(item => item.trim())
      //   .filter(item => item);
      // assetDefs.textSearchFields[type] = values;
      // window.localStorage.setItem('textSearchFields', JSON.stringify(assetDefs.textSearchFields));
    });
  }

  // async _onSave(e) {
  //   e.preventDefault();
  //   let editor = ace.edit(this.shadowRoot.querySelector('.display-editor-root'));
  //   this.displayData = JSON.parse(editor.getValue().replace(/\n|\t/g, ''));
  //   // await this.CollectionModel.saveDisplayData(this.collectionId, this.displayData);

  //   this._parseDisplayData();
  // }

  async _onFileChange(e) {  
    let selectedFilename = e.target.value.split('\\').pop();
    if( !selectedFilename.length ) return;
  
    // replace current thumbnail with new image
    let file = e.target.files[0];
    this.shadowRoot.querySelector('.featured-image').style.backgroundImage = 'url('+window.URL.createObjectURL(file)+')';
  }
  
}

customElements.define('app-collection', AppCollection);