import { LitElement } from "lit";
import render from "./app-image-viewer-lightbox.tpl.js";

import "leaflet";
import "leaflet-iiif";

export default class AppImageViewer extends Mixin(LitElement).with(
  LitCorkUtils
) {
  properties() {
    return {
      bounds: { type: Array },
      maxImageSize: { type: Number },
      media: { type: Object },
      visible: { type: Boolean },
      loading: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.active = true;
    this.render = render.bind(this);

    this.bounds = null;
    this.maxImageSize = 2048;
    this.media = {};
    this.visible = false;
    this.loading = false;

    window.addEventListener("keyup", (e) => {
      if (this.visible && e.which === 27) this.hide();
    });

    this._injectModel("AppStateModel", "MediaModel");
  }

  async firstUpdated() {
    this.parentElement.removeChild(this);
    document.body.appendChild(this);

    const safeCoverNode = this.shadowRoot.querySelector("#safeCover");
    if (safeCoverNode) {
      this.shadowRoot.removeChild(safeCoverNode);
      document.body.appendChild(safeCoverNode);
    }

    let selectedRecord = await this.AppStateModel.getSelectedRecord();
    if (selectedRecord ) {
      this._onSelectedRecordUpdate(selectedRecord);
    }
  }

  /**
   * @method _onAppStateUpdate
   * @description bound to AppStateModel app-state-update event
   */
  _onAppStateUpdate(e) {
    if (e.showLightbox && !this.visible) {
      this.show();
    } else if (!e.showLightbox && this.visible) {
      this.hide();
    }
  }

  /**
   * @method _onSelectedRecordUpdate
   * @description from AppStateModel, called when a records media is selected
   *
   * @param {Object} media
   */
  _onSelectedRecordUpdate(e) {
    if( !e ) return;
    let {graph, clientMedia, selectedMedia, selectedMediaPage} = e;
    
    let currentMedia = this.record?.selectedMedia || {};
    if( currentMedia['@id'] === selectedMedia['@id'] && 
      selectedMediaPage === this.record?.selectedMediaPage ) {
      return;
    }

    this.record = e;
    if (this.visible) this.renderCanvas();
  }

  /**
   * @method show
   */
  async show() {
    this.visible = true;
    this.style.display = "block";
    // this.shadowRoot.querySelector('#safeCover').style.display = 'block';

    document.querySelector("fin-app").style.display = "none";
    document.body.style.overflow = "hidden";
    // window.scrollTo(0, 0);

    this.renderCanvas();

    setTimeout(() => {
      this.shadowRoot.querySelector("#nav")._resize();
      this.shadowRoot.querySelector("#nav").setFocus();
    }, 25);
  }

  /**
   * @method hide
   */
  async hide() {
    this.visible = false;
    this.AppStateModel.set({ showLightbox: false });
    this.style.display = "none";
    // this.shadowRoot.querySelector('#safeCover').style.display = 'none';
    document.body.style.overflow = "auto";
    document.querySelector("fin-app").style.display = "block";
  }

  /**
   * @method _loadImage
   * @description preload image and set bounds to image dimensions
   *
   * @param {String} url url of image to load
   *
   * @returns {Promise} resolves when image is loaded and bounds array has been set
   */
  //  _loadImage(url) {
  //   return new Promise((resolve, reject) => {
  //     var img = new Image();

  //     img.onload = () => {
  //       let res = [img.naturalHeight, img.naturalWidth];
  //       this.bounds = [[0,0], res];
  //       resolve();
  //     };

  //     img.src = url;
  //   });
  // }

  /**
   * @method renderCanvas
   * @description render leaflet canvas based on fedora id
   *
   */
  async renderCanvas() {
    if( !this.record ) return;

    this.loading = true;
    let {graph, clientMedia, selectedMedia, selectedMediaPage} = this.record;

    if (selectedMedia["@id"] === this.renderedMedia?.["@id"]) {
      return;
    }

    this.renderedMedia = selectedMedia.clientMedia.pages.filter(media => media.page === selectedMediaPage)[0];
    // on first page load, selectedMediaPage is -1, so just show first page from clientMedia.images
    if( !this.renderedMedia ) {
      this.renderedMedia = selectedMedia.clientMedia.images;
    }

    if (!this.viewer) {
      this.viewer = L.map(this.shadowRoot.querySelector("#viewer"), {
        center: [0, 0],
        crs: L.CRS.Simple,
        zoom: 0,
      });
    }
    
    if (this.currentLayer) {
      this.viewer.removeLayer(this.currentLayer);
    }

    if (this.renderedMedia.tiled) {
      let tiledUrl = this.renderedMedia.tiled.iiif + "/info.json";
      this.currentLayer = L.tileLayer.iiif(tiledUrl);
    } else {
      let original = this.renderedMedia.original;

      // we might not have size
      let size = await this.getImageSize(original);
      
      // determine the pixel dimensions of the image
      let imageWidthInPixels = parseInt(size.width);
      let imageHeightInPixels = parseInt(size.height);

      // calc the pixel dimensions based on the map's container size and the desired maximum dimensions
      let mapContainer = this.viewer.getContainer();
      let maxImageWidthInPixels = mapContainer.offsetWidth;
      let maxImageHeightInPixels = mapContainer.offsetHeight;

      // scale the image dimensions down if they exceed the maximum dimensions
      if (imageWidthInPixels > maxImageWidthInPixels || imageHeightInPixels > maxImageHeightInPixels) {
        let scaleFactor = Math.min(maxImageWidthInPixels / imageWidthInPixels, maxImageHeightInPixels / imageHeightInPixels);
        imageWidthInPixels *= scaleFactor;
        imageHeightInPixels *= scaleFactor;
      }
      let imageBounds = [[0, 0], [imageHeightInPixels, imageWidthInPixels]];

      // calc center of image
      let centerLat = (imageBounds[0][0] + imageBounds[1][0]) / 2;
      let centerLon = (imageBounds[0][1] + imageBounds[1][1]) / 2;

      // set the view of the map to center on the image and apply an appropriate zoom level
      let zoomLevel = 0; // Adjust as needed
      this.viewer.setView([centerLat, centerLon], zoomLevel);

      this.currentLayer = L.imageOverlay(original.url, imageBounds).addTo(this.viewer);
    }

    this.currentLayer.addTo(this.viewer);

    // listen to load event to stop spinner
    if( this.renderedMedia.tiled ) {
      this.currentLayer.on('load', function() {
        this.loading = false;
      });
    } else {      
      let imageElement = this.currentLayer.getElement();
      imageElement.addEventListener('load', () => {
        this.loading = false;
      });
    }

    // TODO this is a hack to get the viewer to resize correctly
    setTimeout(() => {
      this.viewer.invalidateSize();
    }, 1000);

    this.shadowRoot.querySelector('.leaflet-control-attribution').style.display = 'none';
    this.shadowRoot.querySelector(".leaflet-control-container").style.display = 'none';  
  }

  getImageSize(original) {
    if( original.size ) return original.size;

    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = original.url;
      img.onload = () => {
        resolve(original.size = {
          height : img.naturalHeight, 
          width : img.naturalWidth
        }); 
      };
    });
  }

  /**
   * @method _onCloseClicked
   * @description bound to view nav close event
   */
  _onCloseClicked() {
    // this.showLightbox = false;
    this.AppStateModel.set({ showLightbox: false });
  }

  /**
   * @method _onZoomInClicked
   * @description bound to view nav zoom-in event
   */
  _onZoomInClicked() {
    this.viewer.zoomIn();
  }

  /**
   * @method _onZoomOutClicked
   * @description bound to view nav zoom-out event
   */
  _onZoomOutClicked() {
    this.viewer.zoomOut();
  }
}

customElements.define("app-image-viewer-lightbox", AppImageViewer);
