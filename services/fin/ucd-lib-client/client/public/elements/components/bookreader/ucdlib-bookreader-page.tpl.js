import { html, css } from 'lit';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
      position: absolute;
      backface-visibility: hidden;
      transform-style: preserve-3d;
      --transition-duration: 0.25s;
    }

    :host(.page-left-prev) {
      z-index: 10;
      visibility: hidden;
    }
    
    :host(.page-right-prev) {
      z-index: 10;
      transform: rotateY(-180deg);
      transform-origin: left;
      visibility: hidden;
    }

    :host(.page-left) {
      z-index: 50;
    }

    :host(.page-right) {
      z-index: 50;
    }

    :host(.page-left-next) {
      z-index: 10;
      transform-origin: right;
      transform: rotateY(-180deg);
    }

    :host(.page-right-next) {
      z-index: 10;
      visibility: hidden;
    }

    /* animate next */

    :host(.page-left.animate-next-start) {
      z-index: 10;
    }

    :host(.page-right.animate-next-start) {
      transform: rotateY(90deg);
      transform-origin: left;
      transition: transform var(--transition-duration);
      transition-timing-function: ease-in;
    }

    :host(.page-left-next.animate-next-start) {
      transform: rotateY(-90deg);
    }

    :host(.page-right-next.animate-next-start) {
      visibility: visible;
       z-index: 15;
    }

    :host(.page-right.animate-next-end) {
      transform: rotateY(-90deg);
    }

    :host(.page-left-next.animate-next-end) {
      z-index: 50;
      transition: transform var(--transition-duration);
      transform: rotateY(0deg);
      transition-timing-function: ease-out;
    }

    :host(.page-right-next.animate-next-end) {
      visibility: visible;
       z-index: 15;
    }


    /* animate prev */

    :host(.page-left.animate-prev-start) {
      z-index: 50;
      transform: rotateY(-90deg);
      transform-origin: right;
      transition: transform var(--transition-duration);
      transition-timing-function: ease-in;
    }

    :host(.page-right.animate-prev-start) {
      z-index: 10;
    }

    :host(.page-right-prev.animate-prev-start) {
      transform: rotateY(-90deg);
      z-index: 50;
      visibility: visible;
    }

    :host(.page-left-prev.animate-prev-start) {
      visibility: visible;
      z-index: 15;
    }

    :host(.page-left.animate-prev-end) {
      transform: rotateY(-90deg);
    }

    :host(.page-right.animate-prev-end) {
      z-index: 10;
    }

    :host(.page-right-prev.animate-prev-end) {
      z-index: 50;
      transition: transform var(--transition-duration);
      transform: rotateY(0deg);
      transition-timing-function: ease-out;
      visibility: visible;
    }

    :host(.page-left-prev.animate-prev-end) {
      visibility: visible;
      z-index: 15;
    }
    

    span.word {
      display: inline-block;
      position: absolute;
      color: red;
      border: 1px solid red;
      cursor: text;
      pointer-events: all;
    }

    img {
      user-select: none;
      pointer-events: auto;
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
  <span class="word" style="bottom: ${word.bottom}px; right: ${word.right}px; top: ${word.top}px; left: ${word.left}px; line-height: ${word.fontSize}px; letter-spacing: ${word.letterSpacing}; font-size: ${word.fontSize}px">${word.text}</span>
`)}

`;}