
const {poll} = require('@internetarchive/bookreader/src/BookReader/utils.js');

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
    if ($boxes.length) {
      $boxes.css('animation', 'none');
      $boxes[0].scrollIntoView({
        // Only vertically center the highlight if we're in 1up or in full screen. In
        // 2up, if we're not fullscreen, the whole body gets scrolled around to try to
        // center the highlight 🙄 See:
        // https://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move/11041376
        // Note: nearest doesn't quite work great, because the ReadAloud toolbar is now
        // full-width, and covers up the last line of the highlight.
        block: this.constMode1up == this.mode || this.isFullscreenActive ? 'center' : 'nearest',
        inline: 'center',
        behavior: onNearbyPage ? 'smooth' : 'auto',
      });
      // wait for animation to start
      await new Promise(resolve => setTimeout(resolve, 100));
      $boxes.removeAttr("style");
    }
  };

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
