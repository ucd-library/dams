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
      callNumber : { type : String },
      keywords : { type : Array },    
      items : { type : Number }, 
      yearPublished : { type : Number }, 
      highlightedItems : { type : Array },
      dbsync : { type : Object },
      watercolor : { type : String },
      displayData : { type : Array },
      isAdmin : { type : Boolean },
      editMode : { type : Boolean }
    };
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.active = true;

    this.collectionId = '';
    this.adminRendered = false;
    this.description = '';
    this.title = '';
    this.thumbnailUrl = '';
    this.callNumber = '';
    this.keywords = [];    
    this.items = 0;
    this.yearPublished = 0;
    this.highlightedItems = [];
    this.dbsync = {};
    this.watercolor = 'rose';
    this.displayData = [];
    this.isAdmin = false;
    this.editMode = false;

    this._injectModel('AppStateModel', 'CollectionModel', 'RecordModel', 'CollectionVcModel', 'FcAppConfigModel');
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

    this.collectionId = e.location.fullpath;

    await this.CollectionModel.get(this.collectionId);
    await this._parseDisplayData();
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
    // this.highlightedItems = e.payload.results.highlightedItems;
    

    // TODO pull from app container, otherwise default to most recent 3 items by year published descending    
    let highlightedItems = await this.RecordModel.getRecentItems(this.collectionId, 3);
    if( highlightedItems.response.ok && highlightedItems.body.results.length ) {
      this.highlightedItems = highlightedItems.body.results.map(item => {
        return {
          title : item['@graph'][0].name,
          thumbnailUrl : item['@graph'][0].thumbnailUrl,
          itemUrl : item['@graph'][0]['@id']
        };
      });
    }

    this._showAdminPanel();

    // search highlighted collection items
    // this.RecordModel.searchHighlighted(this.collectionId, true, true);
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
      this.highlightedItems = e.payload.results.map(rg => {
        return {
          title : rg.root.name,
          thumbnailUrl : rg.root.image.url,
          itemUrl : rg.root['@id']
        };
      })
    }
  }

  /**
   * @method _onEditClicked
   * @description admin ui, edit button click event
   * 
   * @param {Object} e 
   */
  _onEditClicked(e) {
    this.editMode = true;
  }

  /**
   * @method _onSaveClicked
   * @description admin ui, save button click event
   * 
   * @param {Object} e 
   */
  async _onSaveClicked(e) {
    // TODO save to fcrepo container
    //   also how to handle validation that all 6 featured items are populated? or more like how to alert user
    debugger;
    console.log(JSON.stringify(this.displayData))


    // TODO still 400 bad requests depending on content, and when accepted it wipes out all the references to 
    //  other resources in fcrepo

    let res = await this.FcAppConfigModel.saveCollectionDisplayData(this.collectionId, this.displayData);
    console.dir(res)

    // TODO close admin ui
  }

  /**
   * @method _onCancelEditClicked
   * @description admin ui, cancel editing button click event
   * 
   * @param {Object} e 
   */
  _onCancelEditClicked(e) {
    this.editMode = false;
  }

  /**
   * @method _onWatercolorChanged
   * @description admin ui, change to featured image watercolor
   * 
   * @param {Object} e 
   */
  _onWatercolorChanged(e) {
    this.watercolor = e.target.classList[0];
    /*
    let savedWatercolor = this.displayData.filter(d => d['@id'].indexOf('/application/#') > -1)[0];
    if( savedWatercolor ) {
      savedWatercolor['http://schema.org/css'][0]['@value'] = this.watercolor;
      savedWatercolor['@id'] = savedWatercolor['@id'].split('#')[0] + '#' + this.watercolor;
    } else {
      // TODO handle creating graph to save to app container
    }
    */
    
    let savedWatercolor = this.displayData['graph'].filter(g => g['@id'].indexOf('/application/#') > -1)[0];
    if( savedWatercolor ) {
      savedWatercolor.css = this.watercolor;
      savedWatercolor['@id'] = savedWatercolor['@id'].split('#')[0] + '#' + this.watercolor;
    } else {
      // TODO handle creating graph to save to app container

    }
    

  }

  /**
   * @description _showAdminPanel, checks if user is an admin and populates admin section with data
   */
  async _showAdminPanel() {
    const user = APP_CONFIG.user;
    if( user && user.loggedIn && user.roles.includes('admin') ) {
      this.isAdmin = true;
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
    } else {
      this.shadowRoot.querySelector('.admin-heading').style.display = 'none';
      this.shadowRoot.querySelector('.admin-content').style.display = 'none';
    }
  }

  /**
   * @description _parseDisplayData, get application container data to set collection specific display data (watercolors, highlighted items, featured image)
   */
  async _parseDisplayData() {

    /*
    let displayData = await this.FcAppConfigModel.getCollectionAppData(this.collectionId);
    if( displayData && displayData.body ) {
      this.displayData = JSON.parse(displayData.body);
      debugger;
      let watercolor = this.displayData.filter(d => d['@id'].indexOf('/application/#') > -1)[0];
      if( watercolor ) {
        this.watercolor = watercolor['http://schema.org/css'][0]['@value']
      }
    }
    */
    
    this.displayData = APP_CONFIG.fcAppConfig[`/application/ucd-lib-client${this.collectionId}${this.collectionId.replace('/collection', '')}.jsonld.json`]
    if( this.displayData ) {
      // watercolor
      let watercolor = this.displayData['graph'].filter(g => g['@id'].indexOf('/application/#') > -1)[0];
      if( watercolor ) {
        this.watercolor = watercolor.css;
      }
      // TODO
      // featured items
      // featured image
    } else {
      // TODO make object to post to fcrepo?
    }
    
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
    if( selectedFilename.length ) {

      let file = this.shadowRoot.querySelector('#file-upload').files[0];
      await fetch(`/fcrepo/rest/application/ucd-lib-client${this.collectionId}/featuredImage.jpg`, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'image/jpg',
        },
        body: file,
        duplex: 'half'
      });
    }
  }
  
}

customElements.define('app-collection', AppCollection);