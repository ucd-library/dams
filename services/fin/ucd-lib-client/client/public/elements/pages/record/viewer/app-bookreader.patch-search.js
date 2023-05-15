module.exports = function patchSearch(BookReader) {
  BookReader.prototype.search = async function (term = "", overrides = {}) {
    /** @type {SearchOptions} */
    const defaultOptions = {
      goToFirstResult: false /* jump to the first result (default=false) */,
      disablePopup: false /* don't show the modal progress (default=false) */,
      suppressFragmentChange: false /* don't change the URL on initial load */,
      error: null /* optional error handler (default=null) */,
      success: null /* optional success handler (default=null) */,
    };
    const options = jQuery.extend({}, defaultOptions, overrides);
    this.suppressFragmentChange = options.suppressFragmentChange;
    this.searchCancelled = false;

    // strip slashes, since this goes in the url
    this.searchTerm = term.replace(/\//g, " ");

    if (!options.suppressFragmentChange) {
      this.trigger(BookReader.eventNames.fragmentChange);
    }

    // Add quotes to the term. This is to compenstate for the backends default OR query
    // term = term.replace(/['"]+/g, '');
    // term = '"' + term + '"';

    // Remove the port and userdir
    // const serverPath = this.server.replace(/:.+/, "");
    const serverPath = this.server;
    const baseUrl = `http://${serverPath}${this.searchInsideUrl}?`;

    // Remove subPrefix from end of path
    let path = this.bookPath;
    const subPrefixWithSlash = `/${this.subPrefix}`;
    if (
      this.bookPath.length - this.bookPath.lastIndexOf(subPrefixWithSlash) ==
      subPrefixWithSlash.length
    ) {
      path = this.bookPath.substr(
        0,
        this.bookPath.length - subPrefixWithSlash.length
      );
    }

    const urlParams = {
      item_id: this.bookId,
      doc: this.subPrefix,
      path,
      q: term,
    };

    // NOTE that the API does not expect / (slashes) to be encoded. (%2F) won't work
    const paramStr = $.param(urlParams).replace(/%2F/g, "/");

    const url = `${baseUrl}${paramStr}`;

    const callSearchResultsCallback = (searchInsideResults) => {
      if (this.searchCancelled) {
        return;
      }
      const responseHasError =
        searchInsideResults.error || !searchInsideResults.matches.length;
      const hasCustomError = typeof options.error === "function";
      const hasCustomSuccess = typeof options.success === "function";

      if (responseHasError) {
        hasCustomError
          ? options.error.call(this, searchInsideResults, options)
          : this.BRSearchCallbackError(searchInsideResults, options);
      } else {
        hasCustomSuccess
          ? options.success.call(this, searchInsideResults, options)
          : this.BRSearchCallback(searchInsideResults, options);
      }
    };

    this.trigger("SearchStarted", { term: this.searchTerm, instance: this });
    callSearchResultsCallback(
      await $.ajax({
        url: url,
        dataType: "jsonp",
        cache: true,
        beforeSend: (xhr) => {
          this.searchXHR = xhr;
        },
      })
    );
  };
  /**
   * @private
   * Goes to the page specified. If the page is not viewable, tries to load the page
   * FIXME Most of this logic is IA specific, and should be less integrated into here
   * or at least more configurable.
   * @param {number} matchIndex
   */
  BookReader.prototype._searchPluginGoToResult = async function (
    matchIndex,
    emitEvent = true
  ) {
    const match = this.searchResults?.matches[matchIndex];
    const book = this.book;
    const pageIndex = book.leafNumToIndex(match.par[0].page);
    const page = book.getPage(pageIndex);
    const onNearbyPage = Math.abs(this.currentIndex() - pageIndex) < 3;
    let makeUnviewableAtEnd = false;
    if (!page.isViewable) {
      const resp = await fetch(
        "/services/bookreader/request_page?" +
          new URLSearchParams({
            id: this.options.bookId,
            subprefix: this.options.subPrefix,
            leafNum: page.leafNum,
          })
      ).then((r) => r.json());

      for (const leafNum of resp.value) {
        book.getPage(book.leafNumToIndex(leafNum)).makeViewable();
      }

      // not able to show page; make the page viewable anyways so that it can
      // actually open. On IA, it has a fallback to a special error page.
      if (!resp.value.length) {
        book.getPage(pageIndex).makeViewable();
        makeUnviewableAtEnd = true;
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

    if (emitEvent) {
      dispatchEvent(
        new CustomEvent("BookReader:SearchGoToResult", {
          detail: {
            matchIndex: matchIndex,
          },
        })
      );
    }

    // Scroll/flash in the ui
    const $boxes = await poll(() => $(`rect.match-index-${match.matchIndex}`), {
      until: (result) => result.length > 0,
    });
    if ($boxes.length) {
      $boxes.css("animation", "none");
      $boxes[0].scrollIntoView({
        // Only vertically center the highlight if we're in 1up or in full screen. In
        // 2up, if we're not fullscreen, the whole body gets scrolled around to try to
        // center the highlight 🙄 See:
        // https://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move/11041376
        // Note: nearest doesn't quite work great, because the ReadAloud toolbar is now
        // full-width, and covers up the last line of the highlight.
        block:
          this.constMode1up == this.mode || this.isFullscreenActive
            ? "center"
            : "nearest",
        inline: "center",
        behavior: onNearbyPage ? "smooth" : "auto",
      });
      // wait for animation to start
      await new Promise((resolve) => setTimeout(resolve, 100));
      $boxes.removeAttr("style");
    }
  };
};
