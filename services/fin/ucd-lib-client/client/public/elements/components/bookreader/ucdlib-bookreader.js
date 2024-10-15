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
      maxHeight : { type: Number, attribute: 'max-height' },
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

    // TODO: don't change from 0
    this.pageBuffer = 0;

    // make sure if you change this you update the css property --transition-duration
    // to HALF the value of this.animationTime
    this.animationTime = 0.5; // seconds

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
    this.rerender({full: true, animate: false});
  }

  updated(props) {
    if( props.has('maxHeight') ) {
      this._updateHeight();
    }
    if( props.has('bookViewData') ) {
      this.rerender({full: true, animate: false});
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
    this.style.height = this.maxHeight+'px';
    this.shadowRoot.querySelector('#single-page').style.height = this.maxHeight+'px';
    this.rerender({full: true, animate: false});
  }


  /**
   * @method rerender
   * @description rerender the book reader.  This will update the current pages.  If the 
   * view or height has changed, use opts.full = true to recalculate all page sizes then
   * render the current pages.  Use opts.animate = false to disable animations.
   * 
   * @param {Object} opts
   * @param {Boolean} opts.full run full rerender, recalculating all page sizes
   * @param {Boolean} opts.animate animate transitions between pages (default true)
   * @returns 
   */
  rerender(opts={}) {
    if( !this.bookViewData?.pages ) return;
    if( !this.maxHeight ) return;

    if( this.lastRendered &&
        this.lastRendered.view === this.view &&
        this.lastRendered.page === this.page &&
        this.lastRendered.maxHeight === this.maxHeight &&
        this.lastRendered.bookViewDataId === this.bookViewData.id &&
        this.lastRendered.width === this.offsetWidth &&
        this.lastRendered.full === opts.full ) {
      return;
    }

    if( opts.full ) {
      this._renderAllPageSizes(opts);
    }

    this._renderCurrentPages(opts);

    // because pages (elements) are already in view, just there offset/size is
    // updated, we need to make sure the elements are poked to update 
    this.pages.forEach(page => page.ele._updatePageData());

    this.lastRendered = {
      full: opts.full,
      view: this.view,
      page: this.page,
      maxHeight: this.maxHeight,
      width: this.offsetWidth,
      bookViewDataId: this.bookViewData.id
    }
  }

  /**
   * @method _renderAllPageSizes
   * @description render all pages based on view and size. updates page container
   * element as well.
   */
  _renderAllPageSizes() {
    // render pages based on view and size
    let readerWidth = this.offsetWidth;
    let readerHeight = this.maxHeight;
    this.renderedHeight = readerHeight;
    
    let renderedMaxHeight = 0;
    let renderedWidthRatioMaxHeight = 0;
    let heightRatioCount = 0;


    this.bookViewData.pages.forEach(page => {
      if( this.view === 'single' ) {
        this._renderPageSizeSingle(readerHeight, readerWidth, page)
      } else if( this.view === 'double' ) {
        this._renderPageSizeDouble(readerHeight, readerWidth, page)
      }

      if( page.renderRatioDimension === 'height' || !page.isLandscape) {
        heightRatioCount++;
      }

      if( page.renderHeight > renderedMaxHeight ) {
        renderedMaxHeight = page.renderHeight;
      }
      if( page.isLandscape && page.renderHeight > renderedWidthRatioMaxHeight ) {
        renderedWidthRatioMaxHeight = page.renderHeight;
      }
    });

    if( heightRatioCount > 0 ) {
      let percentOver = heightRatioCount / this.bookViewData.pages.length;
      if( percentOver < 0.2 ) {
        renderedMaxHeight = renderedWidthRatioMaxHeight;
      }
    }

    // update the height of the page container based on the max page height since it's smaller
    // than the widget height
    if( renderedMaxHeight && renderedMaxHeight < this.maxHeight ) {
      this.renderedHeight = renderedMaxHeight;

      this.bookViewData.pages.forEach(page => {
        if( this.view === 'single' ) {
          this._renderPageSizeSingle(renderedMaxHeight, readerWidth, page)
        } else if( this.view === 'double' ) {
          this._renderPageSizeDouble(renderedMaxHeight, readerWidth, page)
        }
      });
    }

    this.style.height = this.renderedHeight+'px';
    this.shadowRoot.querySelector('#single-page').style.height = this.renderedHeight+'px';

    if( this.view === 'single' && this.bookViewData?.pages) {
      this.shadowRoot.querySelector('#single-page-scroll').style.height = this.renderedHeight*this.bookViewData.pages.length+'px';
      this.shadowRoot.querySelector('#single-page-scroll').style.overflow = 'auto';
    } else {
      this.shadowRoot.querySelector('#single-page-scroll').style.height = this.renderedHeight+'px';
      this.shadowRoot.querySelector('#single-page-scroll').style.overflow = 'hidden';
    }
  }

  /**
   * @method _setPageDimensions
   * @description calculate the dimensions of a page based on given height and width
   * 
   * @param {*} readerHeight 
   * @param {*} readerWidth 
   * @param {*} page 
   */
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
    page.isLandscape = isLandscape;
  }

  /**
   * @method _renderPageSizeSingle
   * @description render top/left offset of a single page
   * 
   * @param {Number} readerHeight available height for page
   * @param {Number} readerWidth available width for page
   * @param {Object} page page object
   */
  _renderPageSizeSingle(readerHeight, readerWidth, page) {
    let realReaderHeight = readerHeight;
    this._setPageDimensions(readerHeight, readerWidth, page);
    page.renderOffsetTop = (realReaderHeight*page.index)+this.pageBuffer;
    page.renderOffsetLeft = 0;

    if( page.renderRatioDimension === 'width' ) {
      page.renderOffsetTop += Math.floor((realReaderHeight - page.renderHeight) / 2)+this.pageBuffer;
    } else {
      page.renderOffsetLeft += Math.floor((readerWidth - page.renderWidth) / 2);
    }
  }

  /**
   * @method _renderPageSizeDouble
   * @description render top/left offset of a double page
   * 
   * @param {Number} readerHeight available height for page 
   * @param {Number} readerWidth available width for page
   * @param {Object} page page object
   */
  _renderPageSizeDouble(readerHeight, readerWidth, page) {
    // even pages are on the right
    // odd pages are on the left 
    let isRight = page.index % 2 === 0;

    this._setPageDimensions(readerHeight, readerWidth/2, page);
    page.renderOffsetTop = 0;

    let midPoint = Math.floor(readerWidth/2);
    page.renderOffsetLeft = isRight ? midPoint : midPoint - page.renderWidth;
  }

  /**
   * @method setPage
   * @description set the current page to render
   * 
   * @param {Number} page 
   * @returns 
   */
  setPage(page) {
    if( this.page === page ) return;
    this.lastPage = this.page;
    this.page = page;

    // handle animation if we are only moving one page
    if( this.view === 'single' ) {
      let scrollTop = this.shadowRoot.querySelector('#single-page').scrollTop;
      let pageData = this.bookViewData.pages[page];

      if( pageData.renderOffsetTop < scrollTop || 
          pageData.renderOffsetTop+pageData.renderHeight > scrollTop+this.renderedHeight ) {
        
        if( Math.abs(page-this.lastPage) > 1 ) {
          this.shadowRoot.querySelector('#single-page').scrollTop = this.page * this.renderedHeight;
        } else {
          this.shadowRoot.querySelector('#single-page').scrollTo({
            top: this.page * this.renderedHeight, // Replace 500 with the vertical scroll position
            left: 0,
            behavior: 'smooth'
          });
        }
      }
    }

    this.rerender();
  }

  /**
   * @method setView
   * @description set the current view to render.  either 'single' or 'double'
   * 
   * @param {*} view 
   * @returns 
   */
  setView(view) {
    if( this.view === view ) return;
    this.view = view;

    // hide pages while we update size/position
    this.shadowRoot.querySelector('#single-page-scroll').style.display = 'none';

    // render current pages based on new view
    this.rerender({full: true, animate: false});

    // show pages now that they are updated
    this.shadowRoot.querySelector('#single-page-scroll').style.display = 'block';

    // if single view, make sure we are scrolled to the current page
    if( this.view === 'single' && this.bookViewData.pages ) {
      let currentPage = this.bookViewData.pages[this.page];
      this.shadowRoot.querySelector('#single-page').scrollTop = currentPage.renderOffsetTop;
    }
  }

  /**
   * @method _renderCurrentPages
   * @description render the current pages based on the current view and page.
   * This does not update the page sizes, only the ensures the current pages are
   * in view and have proper css classes/styles applied based on position.  Position/sizes
   * are determined by the _renderAllPageSizes method.
   * 
   * @param {Object} opts
   * @param {Boolean} opts.animate animate transitions between pages (default true) 
   * @returns 
   */
  _renderCurrentPages(opts={}) {
    if( !this.bookViewData.pages ) return;
    let currentPages = [];

    if( opts.animate === undefined ) {
      opts.animate = true;
    }

    if( this.view === 'single' ) {
      for( let i = this.page-1; i <= this.page+1; i++ ) {
        if( i < 0 || i >= this.bookViewData.pages.length ) {
          continue;
        }
        currentPages.push(i);
        let pageEle = this.pages.find(p => p.index === i);
        if( pageEle ) {
          pageEle.ele.className = '';
          continue;
        }

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

      if( (isAnimateNext || isAnimatePrev) && opts.animate) {
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

  /**
   * @method _animateDoublePage
   * @description animate the transition between double pages.  This will add css classes
   * to the current pages to animate them out of view.
   * 
   * @param {Object} props
   * @param {Boolean} props.isAnimateNext is the next page being animated
   * @param {Boolean} props.isAnimatePrev is the prev page being animated
   * @param {Array} props.cssOrder array of css classes to apply to each page 
   */
  _animateDoublePage(props) {
    this.BookReaderModel.setAnimating(true);

    this.logger.info('animate double page start', props);
    if( props.isAnimateNext ) {
      props.cssOrder.forEach(css => css.push('animate-next-start'));
    } else if( props.isAnimatePrev ) {
      props.cssOrder.forEach(css => css.push('animate-prev-start'));
    }

    this.pages.forEach(page => {
      this._updateCss(page.ele, props.cssOrder[page.cssIndex]);
    });

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
        this._renderCurrentPages({animate: false});
        this.BookReaderModel.setAnimating(false);
      }, (this.animationTime/2)*1000);
    }, (this.animationTime/2)*1000);
  }

  /**
   * @method _updateCss
   * @description helper for updating css classes on an element.
   * Clears all classes and adds the given list.
   * 
   * @param {Element} ele 
   * @param {Array} classList 
   */
  _updateCss(ele, classList) {
    ele.classList = '';
    classList.forEach(name => ele.classList.add(name));
  }

  // _onScroll(e) {
  //   if( this.view !== 'single' ) return;

  //   if( this.scrollTimeout ) {
  //     return;
  //   }
    
  //   this.scrollTimeout = setTimeout(() => {
  //     this.scrollTimeout = null;
  //     this._updatePageFromScroll();
  //   }, 200);
  // }

  _onResize() {
    if( this.resizeTimeout ) {
      return;
    }
    
    this.resizeTimeout = setTimeout(() => {
      this.resizeTimeout = null;
      this.rerender({full: true, animate: false});
    }, 100);
  }

  // _updatePageFromScroll() {
  //   let scrollTop = this.shadowRoot.querySelector('#single-page').scrollTop;
  //   let page = Math.round(scrollTop / this.height);
  
  //   if( this.page === page ) return;
  //   // cheat.  this will trick the setPage method into not scrolling
  //   this.page = page;
  //   this._renderCurrentPages({animate: false});
  //   this.BookReaderModel.setPage(page);
  //   this.logger.info('change page from scroll', {current: this.page, to: page});
  // };

}

customElements.define('ucdlib-bookreader', UcdlibBookreader);