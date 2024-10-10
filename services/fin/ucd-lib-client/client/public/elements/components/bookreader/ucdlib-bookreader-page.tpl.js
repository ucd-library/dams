import { html, css } from 'lit';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
      position: absolute;
    }

    span.word {
      display: inline-block;
      position: absolute;
      color: red;
    }
  `;

  return [elementStyles];
}

export function render() { 
return html`

<div ?hidden="${!this.debug}">
  <div>Page: ${this.pageData.index}</div>
  <div>Width/height: ${this.pageData.width}x${this.pageData.height}</div>
  <div>Rendered offset top/left: ${this.pageData.renderOffsetTop}x${this.pageData.renderOffsetLeft}</div>
  <div>Rendered width/height: ${this.pageData.renderWidth}x${this.pageData.renderHeight}</div>
  <div>Render ratio: ${this.pageData.renderRatio}</div>
  <div>Render ratio dimension: ${this.pageData.renderRatioDimension}</div>
</div> 

<img ?hidden="${this.debug}" src="${this.pageData?.imageUrl}" alt="">

${this.ocrData.map((word, i) => html`
  <span class="word" style="bottom: ${word.bottom}px; right: ${word.right}px; top: ${word.top}px; left: ${word.left}px; font-size: ${word.fontSize}px">${word.text}</span>
`)}

`;}