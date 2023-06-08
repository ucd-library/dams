import { LitElement } from "lit";
import render from "./app-media-download.tpl.js";

import CollectionInterface from "../../interfaces/CollectionInterface";
import MediaInterface from "../../interfaces/MediaInterface";

import config from "../../../lib/config";
import utils from "../../../lib/utils";
import bytes from "bytes";

export default class AppMediaDownload extends Mixin(LitElement).with(
  LitCorkUtils
) {
  static get properties() {
    return {
      defaultImage: { type: Boolean },
      formats: { type: Array },
      href: { type: String },
      archiveHref: { type: String },
      imageSizes: { type: Array },
      hasMultipleDownloadMedia: { type: Boolean },
      selectedMediaHasSources: { type: Boolean },
      fullSetCount: { type: Boolean },
      fullSetSelected: { type: Boolean },
      downloadOptions: { type: Array },
      showImageFormats: { type: Boolean },
      selectedRecordMedia: { type: Object },
      isMultimedia: { type: Boolean },
      zipConcatenatedPaths: { type: String },
    };
  }

  constructor() {
    super();

    this.render = render.bind(this);
    this.active = true;

    this.defaultImage = true;
    this.formats = [];
    this.href = "";
    this.archiveHref = "";
    this.imageSizes = [];
    this.hasMultipleDownloadMedia = false;
    this.selectedMediaHasSources = true;
    this.fullSetCount = 0;
    this.fullSetSelected = false;
    this.downloadOptions = [];
    this.showImageFormats = true;
    this.selectedRecordMedia = {};
    this.isMultimedia = false;
    this.zipConcatenatedPaths = "";

    this._injectModel(
      "AppStateModel",
      "MediaModel",
      "CollectionModel",
    );
  }

  async firstUpdated() {
    let selectedRecord = await this.AppStateModel.getSelectedRecord();
    if (selectedRecord) {
      this._onSelectedRecordUpdate(selectedRecord);
      // if (selectedRecord.selectedMedia) {
      //   this._onSelectedRecordMediaUpdate(selectedRecord.selectedMedia);
      // }
    }
  }

  _onSelectedRecordUpdate(record) {
    if (!record) return;

    let { graph, clientMedia, selectedMedia, selectedMediaPage} = record;    

    this.rootRecord = graph.root;
    this.selectedMedia = selectedMedia;
    let sources = [];

    let download = selectedMedia.clientMedia?.download?.url || selectedMedia.clientMedia.pages.filter(node => node.page === selectedMediaPage)[0]?.download?.url;
    this._setDownloadHref(download);

    // find out if the number of download options is greater than 1
    sources = this._getDownloadSources(record);

    this.hasMultipleDownloadMedia = sources.length > 1;
    if (this.hasMultipleDownloadMedia) {
      this.shadowRoot.querySelector("#single").checked = true;
      this.shadowRoot.querySelector("#fullset").checked = false;
    }

    this.fullSetSelected = false;

    // TODO build downloadOptions option dom, like _onSelectedRecordMediaUpdate() does
    if (sources.length === 0) {
      this.selectedMediaHasSources = false;
      return;
    }

    this.selectedMediaHasSources = true;
    this.fullSetCount = sources.length;
    // this.fullSetCount = this._getAllNativeDownloadSources().length;

    this.allSources = sources;
    this._onSelectedRecordMediaUpdate(selectedMedia)
  }

  _onSelectedRecordMediaUpdate(media) {
    this.selectedRecordMedia = media;

    let firstRecord =
      this.allSources.length > 1
        ? this.allSources.filter((s) => parseInt(s.record?.position) === 1)[0]
        : this.allSources[0];
    let isRoot = false;

    // build list based on selected page, or first page if root record is selected
    if( window.location.pathname === this.rootRecord ) { // }.selectedMedia["@id"]) {
      this.downloadOptions = [firstRecord];
      isRoot = true;
    } else if (Object.keys(this.selectedRecordMedia).length) {
      this.downloadOptions = [this.selectedRecordMedia];
    }

    this.isMultimedia = this.downloadOptions[0]?.fileFormat?.includes('video');
    if (this.isMultimedia) {
      this.shadowRoot.querySelector("#multimedia-format-label").innerHTML =
        this.downloadOptions[0].fileFormat;
        this.showImageFormats = false;
    }

    this.shadowRoot.querySelector("#downloadOptions").innerHTML =
      this.downloadOptions
        .map(
          (item, index) =>
            `<option value="${index}" ${index === 0 ? "selected" : ""}>${
              item.label || "Full Resolution"
            }</option>`
        )
        .join();
    this.shadowRoot.querySelector("#downloadOptions").value = "0";

    // this._setDownloadHref(isRoot ? firstRecord : this.selectedRecordMedia);
    let mediaType = utils.getMediaType(
      isRoot ? firstRecord : this.selectedRecordMedia
    );
    this._renderImgFormats(isRoot ? firstRecord : this.selectedRecordMedia);
  }

  _getDownloadSources(record, nativeImageOnly = false) {
    let sources = [];
    if (!record) return sources;

    record.clientMedia.mediaGroups.forEach((media) => {
        let mediaType = utils.getMediaType(media);
        if (
          mediaType !== "ImageList" &&
          (!media.fileFormat || !media.fileSize || !media.filename)
        )
          return;

        if (mediaType === "VideoObject") {
          sources = sources.concat(this._getVideoSources(media));
        } else if (mediaType === "AudioObject") {
          sources = sources.concat(this._getAudioSources(media));
        } else if (mediaType === "ImageObject") {
          this.showImageFormats = true;
          sources = sources.concat(this._getImageSources(media, true));
          this._renderImgFormats(media, null, "FR");
        } else if (mediaType === "ImageList") {
          this.showImageFormats = true;
          if( media.hasPart && !Array.isArray(media.hasPart) ) media.hasPart = [ media.hasPart ];
          (media.hasPart || []).forEach((img) => {
            let node = record.clientMedia.graph.filter(r => r['@id'] === img['@id'])[0];
            sources = sources.concat(
              this._getImageSources(node, nativeImageOnly)
            );
          });
        }
      });

    return sources;
  }

  _setDownloadHref(source) {
    if (!source) return;
    this.sourceType = source.type || this._getImageFormat(source); // stored for analytics
    this.href = source || source.clientMedia?.images?.original?.url;
  }

  /**
   * @method _getImageSources
   * @description the download sources list for image media
   *
   * @param {Object} imageRecord the image media
   * @param {Boolean} nativeImageOnly In the sources list, should only the native
   * image be returned or all available size options?
   *
   * @returns {Array}
   */
  _getImageSources(imageRecord, nativeImageOnly = false) {
    let format = this._getImageFormat(imageRecord);

    // if( nativeImageOnly ) {
    //   let width = Math.floor(imageRecord.clientMedia?.images?.original?.size?.width || imageRecord?.image?.width || 0);
    //   let height = Math.floor(imageRecord.clientMedia?.images?.original?.size?.height || imageRecord?.image?.height || 0);

    //   return [{
    //     record : imageRecord,
    //     type : 'image',
    //     src :  config.fcrepoBasePath+imageRecord['@id'],
    //     fileFormat : format,
    //     filename : imageRecord.filename || imageRecord.name,
    //     label : 'Full Resolution '+ width && height ? width+' x '+height+' px' : ''
    //   }]
    // }

    // let sources = [];

    let record = this.rootRecord; // .graph.index[imageRecord["@id"]];
    return [
      {
        record,
        type: "image",
        src: "/fcrepo/rest" + imageRecord["@id"],
        fileFormat: format,
        filename: record.filename || record.name,
        label: "Full Resolution",
      },
    ];

    // for( let size of config.imageDownload.sizes ) {
    //   let width = Math.floor(imageRecord.image.width * size.ratio);
    //   let height = Math.floor(imageRecord.image.height * size.ratio);
    //   let iiifSize = width+','+height;
    //   sources.push({
    //     record : imageRecord,
    //     type : 'image',
    //     src :  config.fcrepoBasePath+imageRecord['@id'],
    //     service : `/svc:iiif/full/${iiifSize}/0/default.`,
    //     originalFormat : format,
    //     imageType : size.imageType,
    //     filename : imageRecord.filename || imageRecord['@id'].split('/').pop(),
    //     label : size.label+' '+width+' x '+height+' px',
    //     width, height
    //   });
    // }

    return sources;
  }

  _getAudioSources(audioRecord) {
    return [
      {
        record: audioRecord,
        src: config.fcrepoBasePath + audioRecord["@id"],
        type: "audio",
        filename: audioRecord.filename || audioRecord["@id"].split("/").pop(),
        label:
          this._getTypeLabel(audioRecord) +
          (audioRecord.fileSize
            ? " (" + bytes(audioRecord.fileSize) + ") "
            : ""),
      },
    ];
  }

  _getVideoSources(videoRecord) {
    let sources = [
      {
        record: videoRecord,
        type: "video",
        src: config.fcrepoBasePath + videoRecord["@id"],
        filename: videoRecord.filename || videoRecord["@id"].split("/").pop(),
        label:
          this._getTypeLabel(videoRecord) +
          (videoRecord.fileSize
            ? " (" + bytes(videoRecord.fileSize) + ") "
            : ""),
      },
    ];

    let transcripts = videoRecord.transcript || [];
    if (!Array.isArray(transcripts)) transcripts = [transcripts];

    transcripts
      .filter((transcript) => transcript.error !== true)
      .forEach((transcript) => {
        sources.push({
          record: transcript,
          src: config.fcrepoBasePath + transcript["@id"],
          type: "transcript",
          filename: transcript.filename || transcript["@id"].split("/").pop(),
          label: this._getTypeLabel(transcript) + " (video transcript only)",
        });
      });

    return sources;
  }

  /**
   * @method _getTypeLabel
   * @description get a nice label for a media type.  Uses the encodingFormat or fileFormat, splits apart
   * mime type and takes second arg (part after slash).  Falls back on file extension if not encodingFormat
   * or fileFormat is provided.
   *
   * @param {Object} record file media record
   *
   * @returns {String}
   */
  _getTypeLabel(record) {
    let type = record.encodingFormat || record.fileFormat;
    if (type) return type.split("/").pop();
    return record["@id"].split("/").pop().split(".").pop();
  }

  /**
   * @method _onChangeDownloadOptions
   * @description bound to download options select element on-change event
   *
   * @param {Object} e
   */
  _onChangeDownloadOptions(e) {
    let source = this.downloadOptions[parseInt(e.currentTarget.value)];

    if (source.type === "image") {
      this._renderImgFormats(
        source.record,
        this.shadowRoot.querySelector("#format").value,
        source.imageType
      );
    }

    this._setDownloadHref(source);
  }

  /**
   * @method _renderImgFormats
   * @private
   * @description render image formats select element based of static format
   * list and additional native format if not in list and size is at
   * full resolution.
   */
  _renderImgFormats(imageRecord, selectedFormat, selectedSize) {
    let originalFormat = this._getImageFormat(imageRecord);
    if (!selectedFormat) selectedFormat = originalFormat;

    // let formats = config.imageDownload.formats.slice(0);
    // if( formats.indexOf(originalFormat) === -1 && selectedSize === 'FR' ) {

    let formats = [];
    if (originalFormat) formats.push(originalFormat);
    // }

    this.formats = formats;
    this.shadowRoot.querySelector("#format").innerHTML = "";

    this.formats.forEach((format) => {
      if (!format) return;
      let option = document.createElement("option");
      option.innerHTML = format; // + ((format === originalFormat && selectedSize === 'FR') ? ' (native)' : '');
      option.value = format;

      if (format === selectedFormat) {
        option.setAttribute("selected", "selected");
      }

      this.shadowRoot.querySelector("#format").appendChild(option);
    });

    if (!this.formats.length) this.showImageFormats = false;
  }

  /**
   * @method _getImageFormat
   * @description get the image format. Looks at the schema.org fileFormat parameter or falls back to the url
   *
   * @returns {String}
   */
  _getImageFormat(imageRecord) {
    if (!imageRecord.fileFormat) {
      imageRecord = imageRecord.clientMedia?.images?.original?.url;
    }
    if (!imageRecord) return;

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
    let selectedFormat = this.shadowRoot
      .querySelector("#format")
      .value.replace(/ .*/, "");
    let source =
      this.downloadOptions[
        parseInt(this.shadowRoot.querySelector("#downloadOptions").value)
      ];
    this._renderImgFormats(source.record, selectedFormat, source.imageType);
    this._setDownloadHref(source);
  }

  /**
   * @method _toggleMultipleDownload
   * @description bound to radio buttons click event
   */
  _toggleMultipleDownload() {
    this.fullSetSelected = this.shadowRoot.querySelector("#fullset").checked
      ? true
      : false;
    this._setZipPaths();
  }

  /**
   * @method _setZipPaths
   * @description set the fullset/zip form elements.
   */
  _setZipPaths() {
    let urls = [];
    this.zipName = this.rootRecord.name
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();

    let sources = this.allSources;
    // let sources = this._getAllNativeDownloadSources();

    for (let source of sources) {
      urls.push(source.src.replace('/fcrepo/rest', ''));
    }

    this.zipConcatenatedPaths = urls.join(',');
    this.zipPaths = urls;
    this.archiveHref = `/fin/archive?paths=${this.zipConcatenatedPaths}${this.zipName ? '&name='+this.zipName : ''}}`;
    // this.archiveHref = `/fin/archive${this.zipName ? '?name='+this.zipName : ''}}`;
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
