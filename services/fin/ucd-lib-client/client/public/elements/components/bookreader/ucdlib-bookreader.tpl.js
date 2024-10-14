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
      overflow: hidden;
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
    <div id="single-page"  @scroll="${this._onScroll}">
      <div id="single-page-scroll"></div>
    </div>
    <!-- <div id="double-page" ?hidden="${this.view !== 'double'}"> 
    </div> -->
  </div>
`;}