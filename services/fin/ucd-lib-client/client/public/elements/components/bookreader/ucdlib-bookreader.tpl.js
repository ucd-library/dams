import { html, css } from 'lit';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }

    ucdlib-bookreader-slider,
    ucdlib-bookreader-navbar {
      width: 60%;
      margin: 0 auto;
    }

    #single-page {
      overflow: auto;
      position: relative;
    }

    #single-page-scroll {
      position: relative;
    }
    
    #single-page ucdlib-bookreader-page {
      position: absolute;
    }
  `;

  return [elementStyles];
}

export function render() { 
return html`

  <div id="page-container">
    <div id="single-page" ?hidden="${this.view !== 'single'}" @scroll="${this._onScroll}">
      <div id="single-page-scroll">
        <ucdlib-bookreader-page 
          view-index="-1"
          current-page="${this.page}" 
          .bookData="${this.bookViewData}"
          .debug=${this.debug}>
        </ucdlib-bookreader-page>
        <ucdlib-bookreader-page 
          view-index="0" 
          current-page="${this.page}" 
          .bookData="${this.bookViewData}"
          .debug=${this.debug}>
        </ucdlib-bookreader-page>
        <ucdlib-bookreader-page 
          view-index="1" 
          current-page="${this.page}" 
          .bookData="${this.bookViewData}"
          .debug=${this.debug}>
        </ucdlib-bookreader-page>
      </div>
    </div>
    <div id="double-page" ?hidden="${this.view !== 'double'}"> 
    </div>
  </div>

  <ucdlib-bookreader-slider></ucdlib-bookreader-slider>
  <ucdlib-bookreader-navbar></ucdlib-bookreader-navbar>
`;}