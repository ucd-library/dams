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
    }
    window.addEventListener('mouseup', () => this._onDragEnd.bind(this));
    window.addEventListener('touchend', this._onDragEnd.bind(this));
  }

  _onBookreaderStateUpdate(e) {
    this.selectedPage = e.selectedPage || 0;
    this.maxPage = (e.bookViewData?.pages?.length || 1) - 1;
    this._calculatePages();

    // update slider position with new page
    let newLeft = this.pages[this.selectedPage];
    this.handle.style.left = `${newLeft}px`;
  }

  _reset() {
    this.maxPage = 0;
    this.selectedPage = 0;
    this.width = this.offsetWidth;
  }

  _calculatePages() {
    let trackRect = this.track.getBoundingClientRect();
    this.pageWidth = trackRect.width / this.maxPage;
    this.pages = Array.from({ length: (this.maxPage+1) }, (_, i) => i * this.pageWidth);
  }

  _onResize(e) {
    this.width = this.offsetWidth || 1;
    this._calculatePages();
  }

  _onMoveStart(e) {
    e.preventDefault();
    
    window.addEventListener('mouseup', this._onMoveEnd);
    window.addEventListener('touchend', this._onMoveEnd);

    let slider = this.shadowRoot.querySelector('.slider');
    if( !slider ) return;

    slider.addEventListener('mousemove', this._onMove);
    slider.addEventListener('touchmove', this._onMove);    
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

    let pageIncrement = this.BookReaderModel.store?.data?.state?.selectedView === 'double' ? 2 : 1;
    // TODO update page based on increment, so odd number of pages from start
    // debugger;
    // newLeft = px from left of page
    // closestPage = nearest newLeft of page using this.pages.. TODO increment by 1 if pageIncrement is 2 AND page is odd?

    
    // update handle position (between 0 and max track width)
    newLeft = Math.max(0, Math.min(newLeft, trackRect.width));

    let closestPage = this.pages.reduce((prev, curr) => 
      Math.abs(curr - newLeft) < Math.abs(prev - newLeft) ? curr : prev
    );

    // TODO handle after setting this.selectedPage = newPage ?
    // if( pageIncrement === 2 && this.selectedPage % 2 !== 0 ) {
    //   let match = this.pages.findIndex(page => page === closestPage);
    //   if( match !== -1 ) {
    //     closestPage = this.pages[match+1];
    //   }
    // }

    this.handle.style.left = `${closestPage}px`;

    
    // calc new position
    let newPage = Math.floor((newLeft / trackRect.width) * this.maxPage);
    if( newPage !== this.selectedPage ) {
      // TODO this need to be fixed..?
      // if( pageIncrement === 2 && this.selectedPage % 2 !== 0 ) {        
      // } else {
        this.selectedPage = newPage;
      // }
    }
  }

  _onMoveEnd(e) {
    e.preventDefault();

    this._onMove(e);
    this.isDragging = false;
    this.BookReaderModel.setPage(this.selectedPage);

    window.removeEventListener('mouseup', this._onMoveEnd);
    window.removeEventListener('touchend', this._onMoveEnd);

    let slider = this.shadowRoot.querySelector('.slider');
    if( !slider ) return;

    slider.removeEventListener('touchmove', this._onMove);
    slider.removeEventListener('mousemove', this._onMove);
  }

  _onDragEnd(e) {
    e.preventDefault();

    this._onMove(e);
    this.isDragging = false
    this.BookReaderModel.setPage(this.selectedPage);
  }

}

customElements.define('ucdlib-bookreader-slider', UcdlibBookreaderSlider);