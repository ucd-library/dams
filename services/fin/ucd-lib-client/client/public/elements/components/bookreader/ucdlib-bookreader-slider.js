import { LitElement } from 'lit';
import {render, styles} from "./ucdlib-bookreader-slider.tpl.js";
import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';

export default class UcdlibBookreaderSlider extends Mixin(LitElement)
.with(LitCorkUtils) {

  static get properties() {
    return {
      maxPage : { type: Number },
      selectedPage : { type: Number },
      width : { type: Number },
      searchResults : { type: Array },
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

    window.addEventListener('resize', this._onResize.bind(this));
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
    this.searchResults = [];
  }

  _calculatePages() {
    let trackRect = this.track.getBoundingClientRect();
    this.pageWidth = trackRect.width / this.maxPage;
    this.pages = Array.from({ length: (this.maxPage+1) }, (_, i) => i * this.pageWidth);
  }

  _onResize(e) {
    this.width = this.offsetWidth || 1;
    this._calculatePages();
    this.updateSearchResults(this.searchResults);
    this.handle.style.left = `${this.pages[this.selectedPage]}px`;  
  }

  _onMoveStart(e) {
    e.preventDefault();
    
    window.addEventListener('mouseup', this._onMoveEnd);
    window.addEventListener('touchend', this._onMoveEnd);
    window.addEventListener('mousemove', this._onMove);
    window.addEventListener('touchmove', this._onMove);    
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

    // update handle position (between 0 and max track width)
    newLeft = Math.max(0, Math.min(newLeft, trackRect.width));

    // calc new selected page
    let newPage = Math.floor((newLeft / trackRect.width) * this.maxPage);
    if( newPage !== this.selectedPage ) {
      this.selectedPage = newPage;
    }

    let closestPage = this.pages.reduce((prev, curr) => 
      Math.abs(curr - newLeft) < Math.abs(prev - newLeft) ? curr : prev
    );

    // if 2page mode, need to flip to odd pages only. if even page, need to flip to next page
    if( pageIncrement === 2 && this.selectedPage % 2 === 0 ) {
      // debugger;
      let match = this.pages.findIndex(page => page === closestPage);
      if( match !== -1 ) {
        closestPage = this.pages[match+1] || this.pages[match-1]; // if last page, go back one
        this.selectedPage = this.pages[match+1] ? this.selectedPage+1 : this.selectedPage-1;
      }
    }

    // update handle position
    this.handle.style.left = `${closestPage}px`;    
  }

  _onMoveEnd(e) {
    e.preventDefault();

    this._onMove(e);
    this.isDragging = false;
    this.BookReaderModel.setPage(this.selectedPage);

    window.removeEventListener('mouseup', this._onMoveEnd);
    window.removeEventListener('touchend', this._onMoveEnd);
    window.removeEventListener('touchmove', this._onMove);
    window.removeEventListener('mousemove', this._onMove);
  }

  _onDragEnd(e) {
    e.preventDefault();

    this._onMove(e);
    this.isDragging = false
    this.BookReaderModel.setPage(this.selectedPage);
  }

  updateSearchResults(searchResults=[]) {
    // update slider with indicators of matches
    let searchIndicatorsDiv = this.shadowRoot.querySelector('.search-indicators');
    if( !searchIndicatorsDiv ) return;

    searchIndicatorsDiv.innerHTML = '';
    this.searchResults = searchResults;

    // clear all event listeners
    let indicators = searchIndicatorsDiv.querySelectorAll('.indicator');
    (indicators || []).forEach(indicator => {
      indicator.removeEventListener('click');
    });

    searchResults.forEach(result => {
      let pageNumber = result.page || 0;
      let indicator = document.createElement('div');
      indicator.classList.add('indicator');
      indicator.style.left = `${(this.pages[pageNumber-1] || 0) - 4}px`;

      let searchQuery = document.createElement('div');
      searchQuery.classList.add('search-query');

      let main = document.createElement('main');
      let mainText = result.text || '';
      if( mainText.indexOf('{{{') !== -1 && mainText.indexOf('}}}') !== -1 ) {
        mainText = mainText.replace('{{{', '<mark>').replace('}}}', '</mark>');
      }
      main.innerHTML = mainText;

      let footer = document.createElement('footer');
      footer.innerText = `Page ${pageNumber}`;

      searchQuery.appendChild(main);
      searchQuery.appendChild(footer);
      indicator.appendChild(searchQuery);

      // add event listener to click/touch of indicator
      indicator.addEventListener('click', e => {
        let pageIncrement = this.BookReaderModel.store?.data?.state?.selectedView === 'double' ? 2 : 1;
        if( pageIncrement === 2 && pageNumber % 2 === 0 ) {
          pageNumber -= 1;
        }
        this.BookReaderModel.setPage(pageNumber-1);
      });

      searchIndicatorsDiv.appendChild(indicator);
    });
  }

}

customElements.define('ucdlib-bookreader-slider', UcdlibBookreaderSlider);