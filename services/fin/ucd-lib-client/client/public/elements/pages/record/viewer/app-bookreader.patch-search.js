
const {poll} = require('@internetarchive/bookreader/src/BookReader/utils.js');
const { DragScrollable } = require('@internetarchive/bookreader/src/BookReader/DragScrollable.js');

module.exports = function patchSearch(BookReader) {
  /**
   * @private
   * Goes to the page specified. If the page is not viewable, tries to load the page
   * FIXME Most of this logic is IA specific, and should be less integrated into here
   * or at least more configurable.
   * @param {number} matchIndex
   */
  BookReader.prototype._searchPluginGoToResult = async function (matchIndex) {
    const match = this.searchResults?.matches[matchIndex];
    const book = this.book;
    const pageIndex = book.leafNumToIndex(match.par[0].page);
    const page = book.getPage(pageIndex);
    const onNearbyPage = Math.abs(this.currentIndex() - pageIndex) < 3;
    let makeUnviewableAtEnd = false;
    if (!page.isViewable) {
      const resp = await fetch('/services/bookreader/request_page?' + new URLSearchParams({
        id: this.options.bookId,
        subprefix: this.options.subPrefix,
        leafNum: page.leafNum,
      })).then(r => r.json());
  
      for (const leafNum of resp.value) {
        book.getPage(book.leafNumToIndex(leafNum)).makeViewable();
      }
  
      // not able to show page; make the page viewable anyways so that it can
      // actually open. On IA, it has a fallback to a special error page.
      if (!resp.value.length) {
        book.getPage(pageIndex).makeViewable();
        makeUnviewableAtEnd = true;
      }
  
      // Trigger an update of book
      this._modes.mode1Up.mode1UpLit.updatePages();
      if (this.activeMode == this._modes.mode1Up) {
        await this._modes.mode1Up.mode1UpLit.updateComplete;
      }
    }
    /* this updates the URL */
    if (!this._isIndexDisplayed(pageIndex)) {
      this.suppressFragmentChange = false;
      this.jumpToIndex(pageIndex);
    }
  
    // Reset it to unviewable if it wasn't resolved
    if (makeUnviewableAtEnd) {
      book.getPage(pageIndex).makeViewable(false);
    }

    // Scroll/flash in the ui
    const $boxes = await poll(() => $(`rect.match-index-${match.matchIndex}`), { until: result => result.length > 0 });
    if ($boxes && $boxes.length && this.isFullscreenActive) {
      $boxes.css('animation', 'none');
      $boxes[0].scrollIntoView({
        // mod by ucd-lib, actually don't scroll to center in 1up because page is already centered
        // Only vertically center the highlight if we're in 1up or in full screen. In
        // 2up, if we're not fullscreen, the whole body gets scrolled around to try to
        // center the highlight 🙄 See:
        // https://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move/11041376
        // Note: nearest doesn't quite work great, because the ReadAloud toolbar is now
        // full-width, and covers up the last line of the highlight.
        block: this.isFullscreenActive ? 'center' : 'nearest',
        inline: 'center',
        behavior: onNearbyPage ? 'smooth' : 'auto',
      });
      // wait for animation to start
      await new Promise(resolve => setTimeout(resolve, 100));
      $boxes.removeAttr("style");
    }
  };

  BookReader.prototype.switchMode = function (
    mode,
    {
      suppressFragmentChange = false,
      init = false,
      pageFound = false
    } = {}
  ) {
    // Skip checks before init() complete
    if (this.init.initComplete) {
      if (mode === this.mode) {
        return;
      }
      if (!this.canSwitchToMode(mode)) {
        return;
      }
    }
  
    this.trigger(BookReader.eventNames.stop);
  
    this.prevReadMode = this.getPrevReadMode(this.mode);
  
    if (this.mode != mode) {
      this.activeMode.unprepare?.();
    }
  
    this.mode = mode;
  
    // reinstate scale if moving from thumbnail view
    if (this.pageScale !== this.reduce) {
      this.reduce = this.pageScale;
    }
  
    // $$$ TODO preserve center of view when switching between mode
    //     See https://bugs.edge.launchpad.net/gnubook/+bug/416682
  
    // XXX maybe better to preserve zoom in each mode
    if (this.constMode1up == mode) {
      _prepareMode1Up(this._modes.mode1Up);
    } else if (this.constModeThumb == mode) {
      this.reduce = this.quantizeReduce(this.reduce, this.reductionFactors);
      this._modes.modeThumb.prepare();
    } else {
      this._modes.mode2Up.prepare();
    }
  
    if (!(this.suppressFragmentChange || suppressFragmentChange)) {
      this.trigger(BookReader.eventNames.fragmentChange);
    }
    const eventName = mode + 'PageViewSelected';
    this.trigger(BookReader.eventNames[eventName]);
  
    this.textSelectionPlugin?.stopPageFlip(this.refs.$brContainer);
  };

  /**
 * Flip the right page over onto the left
 */
  BookReader.prototype.right = async function() {
    if ('rl' != this.pageProgression) {
      await this.next();
    } else {
      await this.prev();
    }
  };

  /**
   * Flip the left page over onto the right
   */
  BookReader.prototype.left = async function() {
    if ('rl' != this.pageProgression) {
      await this.prev();
    } else {
      await this.next();
    }
  };

  BookReader.prototype.next = async function({triggerStop = true} = {}) {
    if (this.constMode2up == this.mode) {
      if (triggerStop) this.trigger(BookReader.eventNames.stop);
      await this._modes.mode2Up.mode2UpLit.flipAnimation('next');
    } else {
      if (this.firstIndex < this.book.getNumLeafs() - 1) {
        this.jumpToIndex(this.firstIndex + 1);
      }
    }
  };
  
  BookReader.prototype.prev = async function({triggerStop = true} = {}) {
    const isOnFrontPage = this.firstIndex < 1;
    if (isOnFrontPage) return;
  
    if (this.constMode2up == this.mode) {
      if (triggerStop) this.trigger(BookReader.eventNames.stop);
      await this._modes.mode2Up.mode2UpLit.flipAnimation('prev');
    } else {
      if (this.firstIndex >= 1) {
        this.jumpToIndex(this.firstIndex - 1);
      }
    }
  };

  function _prepareMode1Up(mode) {
    const startLeaf = mode.br.currentIndex();
    mode.$brContainer
      .empty()
      .css({ overflow: 'hidden' })
      .append(mode.$el);

    // override so that page size can be max possible width/height
    mode.mode1UpLit.renderPage = function(page) {
      return _mode1UpRenderPage(page, mode.mode1UpLit);
    };

    mode.mode1UpLit.computePageTops = _computePageTops;

    // Need this in a setTimeout so that it happens after the browser has _actually_
    // appended the element to the DOM
    setTimeout(async () => {
      if (!mode.everShown) {

        mode.mode1UpLit.initFirstRender(startLeaf);
        mode.everShown = true;
        mode.mode1UpLit.requestUpdate();
        await mode.mode1UpLit.updateComplete;
        new DragScrollable(mode.mode1UpLit, {
          preventDefault: true,
          dragSelector: '.br-mode-1up__visible-world',
          // Only handle mouse events; let browser/interact.js handle touch
          dragstart: 'mousedown',
          dragcontinue: 'mousemove',
          dragend: 'mouseup',
        });
      }
      mode.mode1UpLit.jumpToIndex(startLeaf);
      setTimeout(() => {
        // Must explicitly call updateVisibleRegion, since no
        // scroll event seems to fire.
        mode.mode1UpLit.updateVisibleRegion();
      });
    });
    mode.br.updateBrClasses();
  }

  function _computePageTops(pages, spacing) {
    // calc height of images in inches.. get max height and width of images
    // container width/height in px
    const widthOffset = this.offsetWidth;
    const heightOffset = this.offsetHeight;

    // hack to scale up spacing for smaller screens
    let diffFrom700 = 700 - widthOffset;
    if( widthOffset < 700 ) {
      spacing = spacing + (diffFrom700 * 0.005);
    }

    // image width/height in px
    // loop pages array and get min height that a width will fit in container
    let minHeight = 9999;
    pages.forEach(page => {
      let width = page.width;
      let height = page.height;
      let widthRatio = widthOffset / width;
      let heightRatio = heightOffset / height;
      let scaleRatio = Math.min(widthRatio, heightRatio);
      if( height * scaleRatio < minHeight ) {
        minHeight = height * scaleRatio;
      }
    });

    let pageHeightInches = minHeight / this.coordSpace.screenDPI;

    const result = {};
    let top = spacing;
    for (const page of pages) {
      result[page.index] = top;
      top += pageHeightInches + spacing;
    }
    return result;
  }

  function _mode1UpRenderPage(page, litElement) {
    /*
    // try 1
    // broken, in combination with computePageTops and app-bookreader-viewer height resizing
    // adjust width/height to be max possible width/height possible in container
    const wToR = litElement.coordSpace.worldUnitsToRenderedPixels;
    const wToV = litElement.coordSpace.worldUnitsToVisiblePixels;
    const containerWidth = litElement.coordSpace.visiblePixelsToWorldUnits(litElement.htmlDimensionsCacher.clientWidth);

    // image width/height in px
    const width = wToR(page.widthInches);
    const height = wToR(page.heightInches);
    
    // container width/height in px
    const widthOffset = litElement.offsetWidth - 15;
    const heightOffset = litElement.offsetHeight - 15;
 
    // calc max width/height possible
    let widthRatio = widthOffset / width;
    let heightRatio = heightOffset / height;
    let scaleRatio = Math.min(widthRatio, heightRatio);
    
    const left = Math.max(litElement.SPACING_IN, (containerWidth - (page.widthInches * scaleRatio)) / 2);

    // pageTops updated above in _computePageTops()
    const top = litElement.pageTops[page.index];

    const transform = `translate(${wToR(left)}px, ${wToR(top)}px)`;
    
    const pageContainerEl = litElement.createPageContainer(page)
      .update({
        dimensions: {
          width: width * scaleRatio,
          height: height * scaleRatio,
          top: 0,
          left: 0,
        },
        reduce: page.width / wToV(page.widthInches),
      }).$container[0];

    pageContainerEl.style.transform = transform;
    pageContainerEl.classList.toggle('BRpage-visible', litElement.visiblePages.includes(page));
    return pageContainerEl;
    */

    // try 2
    // in combination with computePageTops and app-bookreader-viewer height resizing
    // find min height where width will fit in container
    let minHeight = 9999;
    (page.book?.br?.data || []).forEach(page => {
      let width = page[0].width;
      let height = page[0].height;
      let widthRatio = litElement.offsetWidth / width;
      let heightRatio = litElement.offsetHeight / height;
      let scaleRatio = Math.min(widthRatio, heightRatio);
      if( height * scaleRatio < minHeight ) {
        minHeight = height * scaleRatio;
      }
    });

    const wToR = litElement.coordSpace.worldUnitsToRenderedPixels;
    const wToV = litElement.coordSpace.worldUnitsToVisiblePixels;
    const containerWidth = litElement.coordSpace.visiblePixelsToWorldUnits(litElement.htmlDimensionsCacher.clientWidth);

    // image width/height in px
    let width = wToR(page.widthInches);
    let height = wToR(page.heightInches);

    if( height > minHeight ) {
      height = minHeight;
      width = wToR(page.widthInches) * (minHeight / wToR(page.heightInches));
    }
    
    // container width/height in px
    const widthOffset = litElement.offsetWidth;
    const heightOffset = litElement.offsetHeight;
 
    // calc max width/height possible
    let widthRatio = widthOffset / width;
    let heightRatio = heightOffset / height;
    let scaleRatio = Math.min(widthRatio, heightRatio);
    
    const left = Math.max(litElement.SPACING_IN / 2, (containerWidth - (page.widthInches * scaleRatio)) / 2);

    // pageTops is updated above in _computePageTops()
    const top = litElement.pageTops[page.index];

    const transform = `translate(${wToR(left)}px, ${wToR(top)}px)`;
    
    const pageContainerEl = litElement.createPageContainer(page)
      .update({
        dimensions: {
          width: width * scaleRatio,
          height: height * scaleRatio,
          top: 0,
          left: 0,
        },
        reduce: page.width / wToV(page.widthInches),
      }).$container[0];

    pageContainerEl.style.transform = transform;
    pageContainerEl.classList.toggle('BRpage-visible', litElement.visiblePages.includes(page));
    return pageContainerEl;
  }

  class UcdBookReader extends BookReader {
    /**
     * @methods updateFromParams
     * @description hack for injecting our getPageText function into the instantiated
     * TextSelectPlugin instance.  TextSelectionPlugin is scoped within the text_selection.js 
     * module, so we can override.  It's instantiated in the BookReader.init() process.  After
     * the BookReader.textSelectionPlugin is set, BookReader.updateFromParams() is called while
     * still in the init() process.  Sooo, we are using this opportunity to inject our hack function
     * AFTER init() set textSelectionPlugin but before the init() calls createPageContainer() for 
     * the first couple pages. updateFromParams is our lucky function for this.  
     * 
     */
    updateFromParams(params) {
      if( !this.ucdHackedGetPageText ) {
        this.textSelectionPlugin.getPageText = this.getPageText.bind(this.textSelectionPlugin);
        this.ucdHackedGetPageText = true;
      }
      super.updateFromParams(params);
    }

    /**
     * @param {number} index
     * @returns {Promise<HTMLElement|undefined>}
     */
    async getPageText(index) {
      const cachedEntry = this.pageTextCache.entries.find(x => x.index == index);
      if (cachedEntry) {
        return cachedEntry.response;
      }
      const res = await $.ajax({
        type: "GET",
        url: this.options.singlePageDjvuCallback(index),
        dataType: this.options.jsonp ? "jsonp" : "html",
        cache: true,
        error: (e) => undefined,
      });
      try {
        const xmlDoc = $.parseXML(res);
        const result = xmlDoc && $(xmlDoc).find("OBJECT")[0];
        this.pageTextCache.add({ index, response: result });
        return result;
      } catch (e) {
        return undefined;
      }
    }
  }

  return UcdBookReader;
};
