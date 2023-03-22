import { html } from 'lit';

export default function render() {
return html`

<style>
  :host {
    display: block;
    position: relative;
    box-sizing: border-box;
  }

  [hidden] {
    display: none !important;
  }

  .wrapper {
    /* display: flex; */
    /* flex-direction: column; */
    /* min-height:250px; */
  }

  #bagoffiles {
    text-align: center;
  }

  #bagoffiles iron-icon {
    width: 100%;
    height: 100%;
    max-width: 150px;
    max-height: 150px;
    color: var(--color-grey);
  }

  iron-pages {
    /* flex: 1; */
    min-height: 250px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  img {
    max-width: 100%;
  }

  app-bookreader-viewer.fullscreen {
    background-color: white;
    position: fixed;
    padding: 0px;
    margin: 0px;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

</style>

<div class="wrapper">
  <app-image-viewer-lightbox id="lightbox"></app-image-viewer-lightbox>

  <iron-pages selected="${this.mediaType}" attr-for-selected="id" selected-attribute="visible">
    <!-- <app-360-image-viewer id="360"></app-360-image-viewer> -->
    <div id="bagoffiles">
      <iron-icon icon="fin-icons:various-outline-stacked" ?hidden="${this.bagOfFilesImage}"></iron-icon>
      <img src="${this.bagOfFilesImage}" ?hidden="${!this.bagOfFilesImage}" />
    </div>
    <app-image-viewer id="image"></app-image-viewer>
    <app-bookreader-viewer id="bookreader" .fullscreen="${this.brFullscreen}" .bookData="${this.bookData}"></app-bookreader-viewer>
    <app-video-viewer id="video"></app-video-viewer>
    <app-audio-viewer id="audio"></app-audio-viewer>
  </iron-pages>

  <app-media-viewer-nav 
    .isBookReader="${this.isBookReader}"
    .hideZoom="${this.mediaType === 'bookreader' || this.mediaType === 'video'}"
    @zoom-in="${this._onZoomIn}" 
    @br-bookview-toggle="${this._onToggleBookView}"
    @br-expand-view="${this._onExpandBookView}"
    @br-collapse-view="${this._onCollapseBookView}"
    @br-zoom-in="${this._onBRZoomIn}" 
    @br-zoom-out="${this._onBRZoomOut}">
  </app-media-viewer-nav>
</div>

`;}