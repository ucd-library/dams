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
};
