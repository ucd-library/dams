import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-bookreader-slider.tpl.js";
import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';

export default class UcdlibBookreaderSlider extends Mixin(LitElement)
.with(LitCorkUtils) {

  static get properties() {
    return {
      maxPage : { type: Number },
      selectedPage : { type: Number },
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

    this._reset();

    this._windowResizeListener = this._onResize.bind(this);
    this._onMove = this._onMove.bind(this);
    this._onMoveStart = this._onMoveStart.bind(this);
    this._onMoveEnd = this._onMoveEnd.bind(this);
  }

  firstUpdated() {
    this.track = this.shadowRoot.getElementById('track');
    this.handle = this.shadowRoot.getElementById('handle');

    this._calculatePages();

    if( this.handle ) {
      this.handle.addEventListener('mousedown', () => this.isDragging = true);
      this.handle.addEventListener('touchstart', () => this.isDragging = true);
      this.handle.addEventListener('mouseup', () => this._onDragEnd.bind(this));
      this.handle.addEventListener('touchend', this._onDragEnd.bind(this));
    }
  }

  _onBookreaderStateUpdate(e) {
    this.selectedPage = e.selectedPage || 0;
    this.maxPage = (e.bookViewData?.pages?.length || 1) - 1;
    this._calculatePages();

    // TODO update slider position with new page
  }

  _reset() {
    this.maxPage = 0;
    this.selectedPage = 0;
    this.width = this.offsetWidth;
  }

  _calculatePages() {
    let trackRect = this.track.getBoundingClientRect();
    this.pageWidth = trackRect.width / this.maxPage;
    this.pages = Array.from({ length: this.maxPage }, (_, i) => i * this.pageWidth);
  }

  _onResize(e) {
    this.width = this.offsetWidth || 1;
    this._calculatePages();
  }

  _onMoveStart(e) {
    e.preventDefault();
    let slider = this.shadowRoot.querySelector('.slider');
    if( !slider ) return;

    slider.addEventListener('mousemove', this._onMove);
    slider.addEventListener('mouseup', this._onMoveEnd);
    slider.addEventListener('touchmove', this._onMove);
    slider.addEventListener('touchend', this._onMoveEnd);
  }

  _onClickTrack(e) {
    this._onMove(e);
    this._onDragEnd(e);
  }

  _onMove(e) {
    e.preventDefault();
    
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
    if( newPage !== this.selectedPage ) {
      this.selectedPage = newPage;
    }
  }

  _onMoveEnd(e) {
    e.preventDefault();
    let slider = this.shadowRoot.querySelector('.slider');
    if( !slider ) return;

    slider.removeEventListener('mousemove', this._onMove);
    slider.removeEventListener('mouseup', this._onMoveEnd);
    slider.removeEventListener('touchmove', this._onMove);
    slider.removeEventListener('touchend', this._onMoveEnd);
  }

  _onDragEnd(e) {
    this.isDragging = false

    this.BookReaderModel.setPage(this.selectedPage);
  }

}

customElements.define('ucdlib-bookreader-slider', UcdlibBookreaderSlider);