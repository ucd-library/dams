import { html, css } from 'lit';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }

    .slider {
      display: block;
      position: relative;
      height: 20px;
      top: -22px;

      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently */
    }

    #track {
      position: relative;
      width: 100%;
      height: 8px;
      background-color: #ccc;
      border-radius: 10px;
      cursor: pointer;
    }

    #handle {
      background: #022851;
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%; 
      top: -5px;
      margin-left: -9px;
      z-index: 6;
      border: none;
    }

  `;

  return [elementStyles];
}

export function render() { 
return html`
  <div class="slider">
    <div id="track">
      <div id="handle"  
        @mousedown="${this._onMoveStart}"
        @touchstart="${this._onMoveStart}">
     </div>
    </div>
  </div>

`;}