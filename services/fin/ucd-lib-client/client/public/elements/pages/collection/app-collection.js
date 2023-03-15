import { LitElement} from 'lit';
import render from "./app-collection.tpl.js";
import JSONFormatter from 'json-formatter-js'

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
      items : { type : Array }, 
      yearPublished : { type : Number }, 
      highlightedItems : { type : Array },
      essync : { type : Object },
      watercolor : { type : String },
      displayData : { type : Array },
      selectedFilename : { type : String }
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
    this.items = [];
    this.yearPublished = 0;
    this.highlightedItems = [];
    this.essync = {};
    this.watercolor = 'rose';
    this.displayData = [];
    this.selectedFilename = '';

    this._injectModel('AppStateModel', 'CollectionModel', 'RecordModel', 'CollectionVcModel');
  }

  async firstUpdated() {
    this._onAppStateUpdate(await this.AppStateModel.get());
  }

  willUpdate() {
    // this._showAdminPanel();
    // could we check if this.adminRendered is false here to hide the admin section? or possibly recall the showAdmin function?
    if( !this.adminRendered && !this.collectionId ) {
      this.collectionId = window.location.pathname;
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
    if( e.location.path[0] !== 'collection') return;

    this.collectionId = e.location.fullpath; // ie '/collection/sherry-lehmann'
    // appStateUpdate already loads collection on route change
    // this._showAdminPanel();
    await this.CollectionModel.get(this.collectionId);
    await this._parseDisplayData();
    this._createEditor();
  }

  /**
   * @description _onCollectionVcUpdate, fired when collection viewController updates
   * @param {*} e 
   */
   _onCollectionVcUpdate(e) {
    if( e.state !== 'loaded' ) return;
    
    this.collectionId = e.payload.results.id;
    this.description = e.payload.results.description
    this.title = e.payload.results.title;
    this.thumbnailUrl = e.payload.results.thumbnailUrl;
    this.callNumber = e.payload.results.callNumber;
    this.keywords = e.payload.results.keywords;
    // this.items = e.payload.results.items[0];
    this.yearPublished = e.payload.results.yearPublished;
    // this.highlightedItems = e.payload.results.highlightedItems;
    
    this._showAdminPanel();

    // search highlighted collection items
    this.RecordModel.searchHighlighted(this.collectionId, true, true);
  }

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
   * @description _showAdminPanel, checks if user is an admin and populates admin section with data
   */
  async _showAdminPanel() {
    const user = APP_CONFIG.user;
    if( user && user.loggedIn && user.roles.includes('admin') ) {
      if( !this.adminRendered ) {
        const adminData = await this.CollectionModel.getAdminData(this.collectionId);
        if( adminData && adminData.response && adminData.response.status === 200 ) {
  
          const response = adminData.body;
          if( response && !this.adminRendered ) {
            this.essync = response.essync;
  
            this.shadowRoot.querySelector('.admin-content')
              .appendChild((new JSONFormatter(Object.values(this.essync)[0], 1)).render());
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
   * @description _parseDisplayData, get application container data to set collection specific display data (colors, highlighted items, etc)
   */
  async _parseDisplayData() {
    let displayData = await this.CollectionModel.getDisplayData(this.collectionId);
    if( displayData && displayData.body ) {
      this.displayData = JSON.parse(displayData.body);
      this.displayData.forEach(data => {
        if( data['http://digital.library.ucdavis.edu/schema/featured-image'] ) {
          this.thumbnailUrl = data['http://digital.library.ucdavis.edu/schema/featured-image'][0]['@id'];
        }
        if( data['http://digital.library.ucdavis.edu/schema/watercolor'] ) {
          this.watercolor = data['http://digital.library.ucdavis.edu/schema/watercolor'][0]['@value'];
        }

        if( data['@id'].indexOf('#featured-items') > -1 ) {
          this.highlightedItems = [];
          data['http://schema.org/url'].forEach(item => {
            this.highlightedItems.push({ '@id' : item['@id'] });
          });
        }
      });

      this.highlightedItems.forEach(item => {
        let matchedItem = this.displayData.filter(d => d['@id'] === item['@id'])[0];
        if( matchedItem ) {
          item['title'] = matchedItem['http://schema.org/description'][0]['@value'];
          item['thumbnailUrl'] = matchedItem['http://schema.org/image'][0]['@id'];
          item['itemUrl'] = '/item' + matchedItem['@id'].split('/item')[1];
        }
      });
    } else {
      this.displayData = [];
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

  async _onSave(e) {
    e.preventDefault();
    let editor = ace.edit(this.shadowRoot.querySelector('.display-editor-root'));
    this.displayData = JSON.parse(editor.getValue().replace(/\n|\t/g, ''));
    // await this.CollectionModel.saveDisplayData(this.collectionId, this.displayData);

    this._parseDisplayData();
  }

  async _onFileChange(e) {    
    this.selectedFilename = e.target.value.split('\\').pop();
    if( this.selectedFilename.length ) {

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