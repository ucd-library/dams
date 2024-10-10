import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-bookreader-slider.tpl.js";
import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';

export default class UcdlibBookreaderSlider extends Mixin(LitElement)
.with(LitCorkUtils) {

  static get properties() {
    return {
      minPage : { type: Number },
      maxPage : { type: Number },
      currentPage : { type: Number },
      width : { type: Number }
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this._injectModel('BookReaderModel');

    this.minPage = 1;
    this.maxPage = 25;
    this.currentPage = 1;
    this.width = this.offsetWidth;

    this._windowResizeListener = this._onResize.bind(this);
    this._onMove = this._onMove.bind(this);
    this._onMoveStart = this._onMoveStart.bind(this);
    this._onMoveEnd = this._onMoveEnd.bind(this);

    // document.addEventListener('mousemove', this._onMove);
    // document.addEventListener('mouseup', this._onMoveEnd);
    // document.addEventListener('touchmove', this._onMove);
    // document.addEventListener('touchend', this._onMoveEnd);
  }

  firstUpdated() {
    this.track = this.shadowRoot.getElementById('track');
    this.handle = this.shadowRoot.getElementById('handle');
    this._calculatePages();
  }

  _calculatePages() {
    let trackRect = this.track.getBoundingClientRect();
    this.pageWidth = trackRect.width / this.maxPage;
    this.pages = Array.from({ length: this.maxPage }, (_, i) => i * this.pageWidth);
  }

  _onResize(e) {
    this.width = this.offsetWidth || 1;
  }

  _onMoveStart(e) {
    e.preventDefault();
    document.addEventListener('mousemove', this._onMove);
    document.addEventListener('mouseup', this._onMoveEnd);
    document.addEventListener('touchmove', this._onMove);
    document.addEventListener('touchend', this._onMoveEnd);
  }

  _onMove(e) {
    e.preventDefault();
    
    // TODO fix index, first/second page showing only first page
    // TODO handle click on scrollbar, not just drag
    // ONLY UPDATE IMAGE WHEN CLICK OR WHEN DRAG END
    

    let trackRect = this.track.getBoundingClientRect();
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let newLeft = clientX - trackRect.left;

    // update handle position
    newLeft = Math.max(0, Math.min(newLeft, trackRect.width));

    let closestPage = this.pages.reduce((prev, curr) => 
      Math.abs(curr - newLeft) < Math.abs(prev - newLeft) ? curr : prev
    );

    this.handle.style.left = `${closestPage}px`;
    
    // calc new position
    let newPage = Math.floor((newLeft / trackRect.width) * this.maxPage);
    if( newPage !== this.currentPage ) {
      this.currentPage = newPage;
      console.log('on page: ', this.currentPage);
      this.BookReaderModel.setPage(this.currentPage);
    }    
  }

  _onMoveEnd(e) {
    e.preventDefault();
    document.removeEventListener('mousemove', this._onMove);
    document.removeEventListener('mouseup', this._onMoveEnd);
    document.removeEventListener('touchmove', this._onMove);
    document.removeEventListener('touchend', this._onMoveEnd);
  }

}

customElements.define('ucdlib-bookreader-slider', UcdlibBookreaderSlider);