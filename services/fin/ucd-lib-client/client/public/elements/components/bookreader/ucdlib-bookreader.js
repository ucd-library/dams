import { css, LitElement } from 'lit';
import {render, styles} from "./ucdlib-bookreader.tpl.js";
import { Mixin, LitCorkUtils } from '@ucd-lib/cork-app-utils';

import "./ucdlib-bookreader-page.js";

export default class UcdlibBookreader extends Mixin(LitElement)
  .with(LitCorkUtils) {
  
  static get properties() {
    return {
      book : { type: String },
      bookViewData : { type: Object },
      pages : { type: Array },
      page : { type: Number },
      view : { type: String },
      height : { type: Number },
      fullscreen : { type: Boolean }
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this._injectModel('BookReaderModel');
    this.bookViewData = {};
    this.debug = false;

    this.pageBuffer = 5;

    // make sure if you change this you update the css property --transition-duration
    // to HALF the value of this.animationTime
    this.animationTime = 0.5; // seconds

    this.pageElements = 3;
    this.pages = [];

    this._onResize = this._onResize.bind(this);
    
    this.render = render.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this._onResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._onResize);
  }

  firstUpdated() {
    this.pagesEle = this.shadowRoot.querySelector('#single-page-scroll');
    this.renderPages();
  }

  updated(props) {
    if( props.has('height') ) {
      this._updateHeight();
    }
    if( props.has('bookViewData') ) {
      this.renderPages();
    }
  }

  _onBookreaderStateUpdate(e) {
    if( e.selectedBook !== this.book ) {
      this.book = e.selectedBook;
    }

    if( e.bookViewData ) {
      if( this.bookViewData?.id !== e.bookViewData.id ) {
        this.bookViewData = e.bookViewData;
        this._updateHeight();
      }
    }

    this.setPage(e.selectedPage);
    this.setView(e.selectedView);
  }

  _updateHeight() {
    this.style.height = this.height+'px';
    this.shadowRoot.querySelector('#single-page').style.height = this.height+'px';
    // this.shadowRoot.querySelector('#double-page').style.height = this.height+'px';
    this._renderPageSizes();
  }

  _renderPageSizes() {
    if( !this.bookViewData?.pages ) return;
    if( !this.height ) return;

    let readerWidth = this.offsetWidth;
    let readerHeight = this.height;
    this.bookViewData.pages.forEach(page => {
      if( this.view === 'single' ) {
        this._renderPageSizeSingle(readerHeight, readerWidth, page)
      } else if( this.view === 'double' ) {
        this._renderPageSizeDouble(readerHeight, readerWidth, page)
      }
    });

    this._updatePagesPanel();
  }

  _updatePagesPanel() {
    if( this.view === 'single' && this.bookViewData?.pages) {
      this.shadowRoot.querySelector('#single-page-scroll').style.overflow = 'auto';
      this.shadowRoot.querySelector('#single-page-scroll').style.height = this.height*this.bookViewData.pages.length+'px';
    } else {
      this.shadowRoot.querySelector('#single-page-scroll').style.overflow = 'hidden';
      this.shadowRoot.querySelector('#single-page-scroll').style.height = this.height+'px';
    }
  }

  _setPageDimensions(readerHeight, readerWidth, page) {
    let width = page.width;
    let height = page.height;

    readerHeight = readerHeight - (this.pageBuffer*2);

    let isLandscape = (width/height > 1);
    let newHeight, newWidth, ratio, ratioDimension;

    if( isLandscape ) {
      ratioDimension = 'width';
      ratio = readerWidth / width;
      newWidth = readerWidth;     
      newHeight = height * ratio;

      if( newHeight > readerHeight ) {
        ratioDimension = 'height';
        ratio = readerHeight / height;
        newHeight = readerHeight;
        newWidth = width * ratio;
      }
    } else {
      ratioDimension = 'height';
      ratio = readerHeight / height;
      newHeight = readerHeight;
      newWidth = width * ratio;

      if( newWidth > readerWidth ) {
        ratioDimension = 'width';
        ratio = readerWidth / width;
        newWidth = readerWidth;
        newHeight = height * ratio;
      }
    }

    page.renderRatioDimension = ratioDimension;
    page.renderRatio = ratio;
    page.renderHeight = Math.floor(newHeight);
    page.renderWidth = Math.floor(newWidth);
  }

  _renderPageSizeSingle(readerHeight, readerWidth, page) {
    let realReaderHeight = readerHeight;
    this._setPageDimensions(readerHeight, readerWidth, page);
    page.renderOffsetTop = (realReaderHeight*page.index)+this.pageBuffer;
    page.renderOffsetLeft = 0;

    if( this.renderedRatioDimension === 'height' ) {
      page.renderOffsetTop += Math.floor((realReaderHeight - page.renderHeight) / 2)+this.pageBuffer;
    } else {
      page.renderOffsetLeft += Math.floor((readerWidth - page.renderWidth) / 2);
    }
  }

  _renderPageSizeDouble(readerHeight, readerWidth, page) {
    // even pages are on the right
    // odd pages are on the left 
    let isRight = page.index % 2 === 0;

    this._setPageDimensions(readerHeight, readerWidth/2, page);
    page.renderOffsetTop = 0;

   
    page.renderOffsetLeft = Math.round(readerWidth/2);
    page.renderOffsetLeft = isRight ? readerWidth/2 : 0;
  }

  setPage(page) {
    if( this.page === page ) return;
    this.lastPage = this.page;
    this.page = page;

    // handle animation if we are only moving one page
    if( this.view === 'single' ) {
      let scrollTop = this.shadowRoot.querySelector('#single-page').scrollTop;
      let buffer = Math.floor(this.height/4);
      let pageData = this.bookViewData.pages[page];

      if( pageData.renderOffsetTop < scrollTop || 
          pageData.renderOffsetTop+pageData.renderHeight > scrollTop+this.height ) {
        
        if( Math.abs(page-this.lastPage) > 1 ) {
          this.shadowRoot.querySelector('#single-page').scrollTop = this.page * this.height;
        } else {
          this.shadowRoot.querySelector('#single-page').scrollTo({
            top: this.page * this.height, // Replace 500 with the vertical scroll position
            left: 0,
            behavior: 'smooth'
          });
        }
      }
    }

    this._renderPageSizes();
    this.renderPages();
  }

  renderPages(animate=true) {
    let currentPages = [];

    if( this.view === 'single' ) {
      for( let i = this.page-1; i <= this.page+1; i++ ) {
        if( i < 0 || i >= this.bookViewData.pages.length ) {
          continue;
        }
        currentPages.push(i);
        let pageEle = this.pages.find(p => p.index === i);
        if( pageEle ) continue;

        let ele = document.createElement('ucdlib-bookreader-page');
        ele.setAttribute('page', i);
        ele.bookData = this.bookViewData;
        ele.debug = this.debug;
        ele.buffer = this.pageBuffer;
        this.pagesEle.appendChild(ele);
        this.pages.push({index: i, ele});
      }

      
    } else if( this.view === 'double' ) {
      let isEven = this.page % 2 === 0;

      // check if this should be animated
      let visiblePages = [];
      let nextPages = [];
      let prevPages = [];
      if( this.lastPage % 2 === 0 ) {
        visiblePages = [this.lastPage-1, this.lastPage];
        nextPages = [this.lastPage+1, this.lastPage+2];
        prevPages = [this.lastPage-2, this.lastPage-3];
      } else {
        visiblePages = [this.lastPage, this.lastPage+1];
        nextPages = [this.lastPage+2, this.lastPage+3];
        prevPages = [this.lastPage-1, this.lastPage-2];
      }
      

      let isAnimateNext = nextPages.includes(this.page);
      let isAnimatePrev = prevPages.includes(this.page);

      let cssOrder = [
        ['page-left-prev'],
        ['page-right-prev'],
        ['page-left'],
        ['page-right'],
        ['page-left-next'],
        ['page-right-next']
      ]

      if( (isAnimateNext || isAnimatePrev) && animate) {
        this._animateDoublePage({isAnimateNext, isAnimatePrev, cssOrder});
        return;
      }

      // right page
      if( isEven ) {
        for( let i = this.page-3; i <= this.page+2; i++ ) {
          currentPages.push(i);
        }
      // left page
      } else {
        for( let i = this.page-2; i <= this.page+3; i++ ) {
          currentPages.push(i);
        }
      }

      let cssIndex = 0;
      currentPages.forEach(i => {
        if( i < 0 || i >= this.bookViewData.pages.length ) {
          cssIndex++;
          return;
        }
        let pageEle = this.pages.find(p => p.index === i);
        if( pageEle ) {
          this._updateCss(pageEle.ele, cssOrder[cssIndex]);
          pageEle.cssIndex = cssIndex;
          return cssIndex++;
        }

        let ele = document.createElement('ucdlib-bookreader-page');
        ele.setAttribute('page', i);
        this._updateCss(ele, cssOrder[cssIndex]);
        ele.bookData = this.bookViewData;
        ele.debug = this.debug;
        ele.buffer = this.pageBuffer;
        this.pagesEle.appendChild(ele);
        this.pages.push({
          index: i, 
          ele, 
          cssIndex,
          isNext : cssOrder[cssIndex].includes('next'),
          isPrev : cssOrder[cssIndex].includes('prev')
        });
        cssIndex++;
      });
    }

    for( let i = this.pages.length-1; i >= 0; i-- ) {
      let page = this.pages[i];
      if( currentPages.indexOf(page.index) === -1 ) {
        page.ele.remove();
        this.pages.splice(i, 1);
      }
    }
  }

  _animateDoublePage(props) {
    this.BookReaderModel.setAnimating(true);

    this.logger.info('animate double page start', props);
    if( props.isAnimateNext ) {
      props.cssOrder.forEach(css => css.push('animate-next-start'));
    } else if( props.isAnimatePrev ) {
      props.cssOrder.forEach(css => css.push('animate-prev-start'));
    }

    if( window.debugAnimate ) debugger;

    this.pages.forEach(page => {
      this._updateCss(page.ele, props.cssOrder[page.cssIndex]);
    });

    if( window.noAnimate ) return;

    setTimeout(() => {
      this.logger.info('animate double page middle', props);
      this.pages.forEach(page => {
        if( props.isAnimateNext ) {
          page.ele.classList.remove('animate-next-start');
          page.ele.classList.add('animate-next-end');
        } else if( props.isAnimatePrev ) {
          page.ele.classList.remove('animate-prev-start');
          page.ele.classList.add('animate-prev-end');
        }
      });

      setTimeout(() => {
        this.logger.info('animate double page end', props);
        this.renderPages(false);
        this.BookReaderModel.setAnimating(false);
      }, (this.animationTime/2)*1000);
    }, (this.animationTime/2)*1000);
  }

  _updateCss(ele, classList) {
    ele.classList = '';
    classList.forEach(name => ele.classList.add(name));
  }

  setView(view) {
    if( this.view === view ) return;
    this.view = view;
    this._renderPageSizes();
    this.renderPages();
  }

  _onScroll(e) {
    if( this.scrollTimeout ) {
      return;
    }
    
    this.scrollTimeout = setTimeout(() => {
      this.scrollTimeout = null;
      this._updatePageFromScroll();
    }, 200);
  }

  _onResize() {
    if( this.resizeTimeout ) {
      return;
    }
    
    this.resizeTimeout = setTimeout(() => {
      this._renderPageSizes();
    }, 100);
  }

  _updatePageFromScroll() {
    let scrollTop = this.shadowRoot.querySelector('#single-page').scrollTop;
    let page = Math.round(scrollTop / this.height);
  
    if( this.page === page ) return;
    // cheat.  this will trick the setPage method into not scrolling
    this.page = page;
    this.renderPages();
    this.BookReaderModel.setPage(page);
    this.logger.info('change page from scroll', {current: this.page, to: page});
  };

}

customElements.define('ucdlib-bookreader', UcdlibBookreader);