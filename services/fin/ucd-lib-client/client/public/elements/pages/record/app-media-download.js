import { LitElement } from "lit";

import render from "./app-media-download.tpl.js";

import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';

import config from "../../../lib/config";
import utils from "../../../lib/utils";
import bytes from "bytes";

export default class AppMediaDownload extends Mixin(LitElement).with(
  LitCorkUtils
) {
  static get properties() {
    return {
      defaultImage : { type: Boolean },
      formats : { type: Array },
      sources : { type: Array },
      href : { type: String },
      archiveHref : { type: String },
      imageSizes : { type: Array },
      hasMultipleDownloadMedia : { type: Boolean },
      selectedMediaHasSources : { type: Boolean },
      fullSetCount : { type: Boolean },
      fullSetSelected : { type: Boolean },
      downloadOptions : { type: Array },
      showImageFormats : { type: Boolean },
      selectedRecordMedia : { type: Object },
      isMultimedia : { type: Boolean },
      showDownloadLabel : { type: Boolean },
      zipConcatenatedPaths : { type: String },
      isTwoPageView : { type: Boolean },
      downloadAllMedia : { type: Boolean },
    };
  }

  constructor() {
    super();

    this.render = render.bind(this);
    this.active = true;

    this.defaultImage = true;
    this.formats = [];
    this.sources = [];
    this.href = "";
    this.archiveHref = "";
    this.imageSizes = [];
    this.hasMultipleDownloadMedia = false;
    this.selectedMediaHasSources = true;
    this.fullSetCount = 0;
    this.fullSetSelected = false;
    this.downloadOptions = [];
    this.showImageFormats = false;
    this.selectedRecordMedia = {};
    this.isMultimedia = false;
    this.zipConcatenatedPaths = "";
    this.isTwoPageView = false;
    this.downloadAllMedia = false;

    this._injectModel(
      "AppStateModel",
      "MediaModel",
      "CollectionModel",
    );
  }

  async firstUpdated() {
    let selectedRecord = await this.AppStateModel.getSelectedRecord();
    if (selectedRecord) this._onSelectedRecordUpdate(selectedRecord);    
  }

  _onSelectedRecordUpdate(record) {
    if( !record ) return;

    let { graph, clientMedia, selectedMedia, selectedMediaPage } = record;    

    this.rootRecord = graph.root;
    this.selectedMedia = selectedMedia;
    this.clientMedia = clientMedia;
    this.graphIndex = graph.index;
    this.selectedMediaPage = selectedMediaPage;

    this.sources = this._getDownloadSources();

    // set single/zip download hrefs
    this._setDownloadHref(this.sources);

    this.hasMultipleDownloadMedia = this.sources.length > 1;
    if( this.hasMultipleDownloadMedia ) {
      this.shadowRoot.querySelector("#single").checked = true;
      this.shadowRoot.querySelector("#fullset").checked = false;
    }

    this.fullSetSelected = false;

    if( this.sources.length === 0 ) {
      this.selectedMediaHasSources = false;
      return;
    }

    this.selectedMediaHasSources = true;
    this.fullSetCount = this.sources.length;

    this._onSelectedRecordMediaUpdate(selectedMedia)
  }

  _onSelectedRecordMediaUpdate(media) {
    this.selectedRecordMedia = media;
    this.downloadOptions = [this.selectedRecordMedia];
    this.isMultimedia = this.downloadOptions[0]?.fileFormat?.includes('video');

    if( this.isMultimedia ) {
      let download = this.downloadOptions[0];
      this.shadowRoot.querySelector("#multimedia-format-label").innerHTML = download.fileFormatSimple + ' (' + bytes(download.fileSize).toLowerCase() + ')';
        this.showImageFormats = false;
    } else {
      // check if the only main source with pages is pdf,
      // if so then just show archive download options instead of single page
      let imageList = this.clientMedia.mediaGroups.filter(m => m['@shortType'].includes('ImageList'))[0];
      let pdf = this.clientMedia.mediaGroups.filter(m => m.clientMedia?.pdf && 
                                                         m.clientMedia?.pages?.length && 
                                                         m.clientMedia?.download?.[0]?.label === 'pdf')[0];

      if( !imageList && pdf ) {
        this.showDownloadLabel = true;
        // this._noSinglePageDownload();
        this._renderDownloadSingleFormat();
        return;
      }
    }

    this._renderDownloadAllFormats();
    this._renderDownloadSingleFormat();
  }

  /**
   * @method brPageChange
   * 
   * @description bookreader page change event. set download sources to 2 pages if 2 page view, 
   *  otherwise set to single page at currentPage
   * @param {Object}} detail page change detail, page number and if single page or 2 page view 
   */
  // async brPageChange(detail) { 
  //   let { currentPage, onePageMode } = detail;

  //   let record = await this.AppStateModel.getSelectedRecord();
  //   if (!record) return;

  //   let { clientMedia, selectedMedia } = record;

  //   this.brCurrentPage = currentPage;
  //   let pages;
  //   let imageList = clientMedia.mediaGroups.filter(m => m['@shortType'].includes('ImageList'))[0];
  //   if( imageList ) {
  //     pages = imageList.clientMedia.pages;
  //   } else {
  //     pages = selectedMedia.clientMedia.pages;
  //   }

  //   if( onePageMode ) {
  //     // set download href to single page
  //     let href = pages[currentPage - 1]?.download?.url;  
  //     this.isTwoPageView = false;
  //     if( !href ) {
  //       // no download besides pdf for selected page, show all files download with options
  //       // this._noSinglePageDownload();
  //       this._renderDownloadSingleFormat();
  //     } else {
  //       this.href = href;
  //     }
  //   } else {
  //     this.isTwoPageView = true;      

  //     // set download href to 2 pages for archive download option
  //     let image1 = pages[currentPage - 1]?.download?.url?.replace('/fcrepo/rest', '');
  //     let image2 = pages[currentPage]?.download?.url?.replace('/fcrepo/rest', '');
  //     let urls = [];
  //     if( image1 ) urls.push(image1);
  //     if( image2 ) urls.push(image2);
  //     if( urls.length ) {
  //       this._setZipPaths(urls);
  //     } else {
  //       // no download besides pdf for selected page, show all files download with options
  //       // this._noSinglePageDownload();
  //       this._renderDownloadSingleFormat();
  //     }
  //   }
  // }

  _noSinglePageDownload() {
    this.zipName = this.rootRecord.name
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();
    this.archiveHref = '/fin/archive?paths=' + this.sources.map(s => s.url.replace('/fcrepo/rest', '')).join(',') + (this.zipName ? '&name='+this.zipName : '');

    this.downloadAllMedia = true;
    let formats = [];
    this.sources.forEach((source) => {
      let format = source.url.split('.').pop();
      if( !formats.includes(format) ) {
        formats.push(format);
      }
    });

    this.shadowRoot.querySelector("#media-format-label").innerHTML = 'image' + ' (' + formats.join(', ') + ')';
  }

  /**
   * @method _getDownloadSources
   * @description get all client media download sources
   *
   * @returns {Array} sources 
   */
  _getDownloadSources() {
    let sources = [];
    this.clientMedia.mediaGroups.forEach((media) => {
      if( media.clientMedia?.download ) {
        media.clientMedia.download.forEach((download) => {
          sources.push(download);
        });
      }
    });
    return sources;
  }

  /**
   * @method _setDownloadHref
   * @description set the download sourceType and href for single and fullset download options
   * @param {Array} sources the download source(s)
   */
  _setDownloadHref(sources=[]) {
    if (!sources.length) return;
    
    this.href = '';
    this.archiveHref = '';

    let allFiles = this.shadowRoot.querySelector('#fullset').checked;
    let imageList = this.clientMedia.mediaGroups.filter(m => m['@shortType'].includes('ImageList'))[0];
    let firstMediaDownload = this.clientMedia.mediaGroups[0]?.clientMedia?.download?.[0]?.url;

    if( allFiles || this.isTwoPageView ) {
      // build zip download url
      this.zipName = this.rootRecord.name
        .replace(/[^a-zA-Z0-9]/g, "-")
        .toLowerCase();
      this.archiveHref = '/fin/archive?paths=' + sources.map(s => s.url.replace('/fcrepo/rest', '')).join(',') + (this.zipName ? '&name='+this.zipName : '');
    } else if( this.AppStateModel.location.fullpath === this.rootRecord['@id'] ) {
      // first image from imageList if exists, or mediaObject first download
      this.href = imageList?.clientMedia?.download?.[0]?.url || firstMediaDownload;
    } else {
      // get image from selected page
      let page = this.selectedMediaPage || 0;
      this.href = imageList?.clientMedia?.download?.[page]?.url || firstMediaDownload;
    }
  }

  /**
   * @method _renderDownloadSingleFormat
   * @private
   * @description render image formats for single page images, ie "Image (png)"
   */
  _renderDownloadSingleFormat() {
    let formats = [];
    let singlePdf = false;
    this.sources.forEach((source) => {
      let format = source.label || source.url.split('.').pop();
      // if( formats.includes(format) ) {
      // } else 
      if( !formats.includes(format) && format !== 'pdf') {
        formats.push(format);
      }
      if( format === 'pdf' ) {
        singlePdf = true;
      }
    });

    if( singlePdf && formats.length > 0 ) singlePdf = false; 

    let fileSize = this.sources.find(s => s.url === this.href)?.fileSize;
    this.showDownloadLabel = true;
    let imageLabel = singlePdf ? 'pdf ' : '';
    if( formats.length ) imageLabel += formats.join(', ') + ' ';
    if( fileSize ) imageLabel += '(' + bytes(fileSize).toLowerCase() + ')';

    this.shadowRoot.querySelector("#media-format-label").innerHTML = imageLabel;
  }

  /**
   * @method _renderDownloadAllFormats
   * @private
   * @description render image formats if download media exists for images and pdf
   * also render All Files image format if only images exist for download media (ie not image + pdf)
   */
  _renderDownloadAllFormats() {
    let formats = [];
    let hasPdf = false;
    this.sources.forEach((source) => {
      let format = source.label || source.url.split('.').pop();
      if( format === 'pdf' ) hasPdf = true;
      let matchedFileType = formats.filter(f => f.format === format)[0];

      if( matchedFileType ) {
        // update fileSize
        matchedFileType.fileSize += source.fileSize;
      } else {
        formats.push({
          format,
          fileSize : source.fileSize
        });
      }
    });

    if( hasPdf && formats.length > 1 ) {
      // show dropdown to select pdf vs image
      this.showImageFormats = true;
      this.shadowRoot.querySelector("#format").innerHTML = '';
      
      formats.forEach((format) => {
        let option = document.createElement("option");
        let label = format.format;
        if( format.fileSize ) label += ' (' + bytes(format.fileSize).toLowerCase() + ')';
        option.innerHTML = label;
        option.value = format.format;
        this.shadowRoot.querySelector("#format").appendChild(option);
      });
      this.showDownloadLabel = false;
    } else {
      this.showDownloadLabel = true;
    
      let imageLabel = '';
      if( formats.length ) imageLabel += formats.map(f => f.format).join(', ') + ' ';
      imageLabel += '(' + (bytes(formats.reduce(((a, r) => a + r.fileSize), 0))||'').toLowerCase() + ')';
      
      this.shadowRoot.querySelector("#media-format-label").innerHTML = imageLabel;
      this.shadowRoot.querySelector("#media-all-format-label").innerHTML = imageLabel;      
    }
  }

  /**
   * @method _getImageFormat
   * @description get the image format. Looks at the schema.org fileFormat parameter or falls back to the url
   *
   * @returns {String}
   */
  _getImageFormat(imageRecord) {
    if (!imageRecord || !imageRecord.url) return;

    // get the graph record for the image
    imageRecord = this.graphIndex[imageRecord.url.split('/fcrepo/rest')[1]]; 

    if( !imageRecord ) return;
    
    let originalFormat = (
      imageRecord.fileFormat ||
      imageRecord["@id"]?.split(".").pop() ||
      imageRecord?.split('.').pop() ||
      ""
    )
      .replace(/.*\//, "")
      .toLowerCase();
    // hack
    if (originalFormat === "jpeg") originalFormat = "jpg";
    return originalFormat;
  }

  /**
   * @method _onFormatSelected
   * @private
   * @description when a format is selected, render the download button.
   */
  _onFormatSelected() {
    let selectedFormat = this.shadowRoot.querySelector("#format").value;
    let sources = this.sources.filter(s => s.label === selectedFormat);
    this._setZipPaths(sources.map(s => s.url.replace('/fcrepo/rest', '')));
  }

  /**
   * @method _toggleMultipleDownload
   * @description bound to radio buttons click event
   */
  _toggleMultipleDownload() {
    this.fullSetSelected = this.shadowRoot.querySelector("#fullset").checked
      ? true
      : false;
    
    let selectedFormat = this.shadowRoot.querySelector("#format").value;
    let sources = this.sources.filter(s => s.label === selectedFormat || !selectedFormat);
    let urls = [];

    if( this.fullSetSelected ) {
      this.showDownloadLabel = false;
    } else {
      this.showDownloadLabel = true;
    }
    
    if( this.brCurrentPage && !this.fullSetSelected ) {
      // bookreader and viewing single page, need to get 1/2 pages for zip
      sources = this.sources.filter(s => s.label !== 'pdf');
      let image1;
      if( this.brCurrentPage > 1 ) {
        image1 = sources[this.brCurrentPage - 1]?.url?.replace('/fcrepo/rest', '');
      }
      let image2 = sources[this.brCurrentPage]?.url?.replace('/fcrepo/rest', '');
      if( image1 ) urls.push(image1);
      if( image2 && this.isTwoPageView ) urls.push(image2);
    } else {
      urls = sources.map(s => s.url.replace('/fcrepo/rest', ''));
    }
    
    this._setZipPaths(urls);
  }

  /**
   * @method _setZipPaths
   * @description set the zip url based on mutlipage bookreader selected page
   */
  _setZipPaths(urls=[]) {
    this.zipName = this.rootRecord.name
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();

    if( !urls.length ) return;

    this.zipConcatenatedPaths = urls.join(',');
    this.zipPaths = urls;

    // this.shadowRoot.querySelector("#format") to get current format, match to url label?
    this.archiveHref = `/fin/archive?paths=${this.zipConcatenatedPaths}${this.zipName ? '&name='+this.zipName : ''}}`;
  }

  /**
   * @method _onDownloadFullSetClicked
   * @description bound to download set button click event
   */
  async _onDownloadFullSetClicked(e) {
    // this.shadowRoot.querySelector("#downloadZip").submit();
    // let res = await this.MediaModel.downloadMediaZip(this.zipName, this.zipPaths);

    // METHOD 0: just a get request, which works with zipConcatenatedPaths
    // TODO other methods below for post requests have other issues

    // e.preventDefault();

    // METHOD 1: formdata
    // TODO setting content type breaks the request if using formData, the content type is multipart formdata which the bodyparser doesn't handle
    // const formData = new FormData();
    // formData.append('name', this.zipName);
    // formData.append('paths', JSON.stringify(this.zipPaths));
    // const request = new XMLHttpRequest();
    // request.open('POST', this.archiveHref);
    // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    // request.send(formData);


    // METHOD 2: xmlhttprequest vanilla with .onload
    // TODO this uses the blob api, works, but doesn't show download in progress until everything is returned from the server
    // const request = new XMLHttpRequest();
    // request.open('POST', this.archiveHref);

    //  TODO also trying just JSON.stringifying this.zipPaths instead of passing FormData, 
    //   which downloads all the media in the api call but isn't handled by browser
    // request.responseType = 'blob';
    // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    // request.onload = (e) => {
    //   var blob = e.currentTarget.response;
    //   var contentDispo = e.currentTarget.getResponseHeader('Content-Disposition');
    //   // https://stackoverflow.com/a/23054920/
    //   var fileName = contentDispo.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1];

    //   var a = document.createElement('a');
    //   a.href = window.URL.createObjectURL(blob);
    //   a.download = fileName;
    //   a.dispatchEvent(new MouseEvent('click'));
    // }

    // request.send(JSON.stringify(this.zipPaths));


    // METHOD 3: fetch api with blob streaming
    // const res = await fetch(this.archiveHref, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(this.zipPaths),
    //   duplex: 'half',
    // });

    // // const reader = res.body.getReader();
    // const blob = await res.blob();
    // const newBlob = new Blob([blob]);

    // const blobUrl = window.URL.createObjectURL(newBlob);

    // const link = document.createElement('a');
    // link.href = blobUrl;
    // link.setAttribute('download', this.zipName + '.zip');
    // document.body.appendChild(link);
    // link.click();
    // link.parentNode.removeChild(link);

    // // clean up Url
    // window.URL.revokeObjectURL(blobUrl);

    let path = this.rootRecord["@id"].replace(config.fcrepoBasePath, "");
    gtag("event", "download", {
      event_category: "fullset",
      event_label: path,
      value: 1,
    });
  }

  /**
   * @method _onDownloadClicked
   * @description bound to download button click event, record analytics
   */
  _onDownloadClicked() {
    let path = this.href.replace(config.fcrepoBasePath, "");

    gtag("event", "download", {
      event_category: this.sourceType,
      event_label: path,
      value: 1,
    });
  }
}

customElements.define("app-media-download", AppMediaDownload);
