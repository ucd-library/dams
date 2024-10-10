import { html, css } from 'lit';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }

    ucdlib-icon {
      max-width: 24px;
      max-height: 24px;
      width: 24px;
      height: 24px;
    }

    .nav-bar {
      display: flex;
    }

    .page-toggle {
      display: flex;
    }

    .page-toggle,
    .zoom-controls,
    .expand-toggle {
      cursor: pointer;
      background-color: var(--color-aggie-blue-80);
      border-radius: 50%;
      display: inline-block;
      width: 50px;
      height: 50px;
      margin: .2rem;
    }



    .page-toggle ucdlib-icon,
    .zoom-controls ucdlib-icon,
    .expand-toggle ucdlib-icon {
      margin: auto;
      fill: white;
      margin-top: 12px;
    }

    
  `;

  return [elementStyles];
}

export function render() { 
return html`
  <div class="nav-bar">
    <div @click="${this._onToggleBookView}" class="page-toggle">
      <ucdlib-icon
        icon="ucdlib-dams:fa-book-open"
        ?hidden="${!this.brSinglePage}">
      </ucdlib-icon>
      <ucdlib-icon style="display: none"
        icon="ucdlib-dams:page-single"
        ?hidden="${this.brSinglePage}"
        class="single-page-book">
      </ucdlib-icon>
    </div>

    <div
      class="zoom-controls"
      @click="${this._onBRZoomOutClicked}"
      ?hidden="${!this.brFullscreen}">
      <ucdlib-icon icon="ucdlib-dams:fa-minus"></ucdlib-icon>
    </div>
    <div
      class="zoom-controls"
      @click="${this._onBRZoomInClicked}"
      ?hidden="${!this.brFullscreen}">
      <ucdlib-icon icon="ucdlib-dams:fa-plus"></ucdlib-icon>
    </div>

    <div class="expand-toggle"
      @click="${this._onExpandBookView}"
      ?hidden="${this.brFullscreen}">
      <ucdlib-icon
        icon="ucdlib-dams:fa-up-right-and-down-left-from-center"
      ></ucdlib-icon>
    </div>
    <div class="expand-toggle"
      @click="${this._onCollapseBookView}">
      <ucdlib-icon icon="ucdlib-dams:fa-down-left-and-up-right-to-center"></ucdlib-icon>
    </div>

    <!--
    <div ?hidden="${this.brFullscreen}">
      <app-share-btn></app-share-btn>
    </div>
    -->
  </div>

`;}