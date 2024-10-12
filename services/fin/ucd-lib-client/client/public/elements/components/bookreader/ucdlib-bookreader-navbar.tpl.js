import { html, css } from 'lit';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }

    .br-nav-bar {
      display: flex;
      align-items: center;
    }

    ucdlib-icon {
      height: 35px;
      width: 35px;
      max-height: 35px;
      max-width: 35px;
      cursor: pointer;
    }

    ucdlib-bookreader-slider {
      height: 60px;
      flex: 1;
      padding-right: 1.5rem;
      padding-left: 10px;
    }

    .br-currentpage-override {
      color: #022851;
      font-size: 0.9rem;
      font-weight: bold;
    }

  `;

  return [elementStyles];
}

export function render() { 
return html`
  <div class="br-nav-bar">
    <ucdlib-bookreader-slider></ucdlib-bookreader-slider>
    <div id="prev" @click="${this._prevPage}">
      <ucdlib-icon icon="ucdlib-dams:fa-caret-left"></ucdlib-icon>
    </div>

    <span class="br-currentpage-override">${this.selectedPage+1} of ${this.numPages}</span>

    <div id="next" style="width: 25px;" @click="${this._nextPage}">
      <ucdlib-icon icon="ucdlib-dams:fa-caret-right"></ucdlib-icon>
    </div>
  </div>

`;}