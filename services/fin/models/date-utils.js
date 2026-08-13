const edtfPkg = require('edtf');
const edtf = edtfPkg.default;
const parseEdtf = edtfPkg.parse;

const DEFAULT_UNCERTAINTY_YEARS = 5;
const DEFAULT_APPROXIMATE_PREFIX = 'circa';
const DEFAULT_UNCERTAIN_SUFFIX = 'uncertain';

const WIDENABLE_PRECISIONS = new Set(['uncertain', 'approximate', 'uncertain-approximate']);

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

// edtf.js sets one bit per masked digit: bits 0-3 are the year's 4 digits,
// bits 4-5 the month's 2 digits, bits 6-7 the day's 2 digits
const YEAR_DIGITS_MASK = 0b00001111;
const MONTH_DIGITS_MASK = 0b00110000;
const DAY_DIGITS_MASK = 0b11000000;

/**
 * @class DateUtils
 * @description helpers for parsing schema:datePublished values (plain years, ISO dates,
 * or EDTF Level 0/1 expressions) into the year-range fields used for search indexing/filtering,
 * and for rendering a human-readable display string for the parsed date.
 */
class DateUtils {

  /**
   * @method parsePublishedDate
   * @description parse a raw datePublished value into an unwidened year range, precision
   * qualifier, and the raw component values needed to render a display string. Falls back to
   * extracting a bare 4-digit year when the value isn't valid EDTF (e.g. legacy free-text dates).
   *
   * @param {String|Array} raw raw schema:datePublished value
   *
   * @returns {Object|null} {startYear, endYear, precision, type, values, unspecified} or null
   * if no year could be determined
   */
  parsePublishedDate(raw) {
    if( !raw ) return null;
    if( Array.isArray(raw) ) raw = raw[0];
    if( typeof raw !== 'string' ) return null;

    let value = raw.trim();
    if( !value ) return null;

    let parsed, computed;
    try {
      parsed = parseEdtf(value, {level: 1});
      if( parsed.type === 'Interval' && parsed.values.some(v => v == null) ) {
        // open-ended intervals ("1885/", "/1893") compute incorrect bounds in edtf.js today
        throw new Error('open-ended intervals not supported');
      }
      computed = edtf(value, {level: 1});
    } catch(e) {
      return this._legacyFallback(value);
    }

    let startYear = new Date(computed.min).getUTCFullYear();
    let endYear = new Date(computed.max).getUTCFullYear();

    if( !Number.isFinite(startYear) || !Number.isFinite(endYear) || startYear > endYear ) {
      return this._legacyFallback(value);
    }

    return {
      startYear, endYear,
      precision : this._precisionFor(parsed, startYear, endYear),
      type : parsed.type,
      values : parsed.values,
      unspecified : parsed.unspecified || 0
    };
  }

  /**
   * @method computeDateFields
   * @description apply uncertainty widening (for circa/uncertain dates) and build the final
   * set of fields to store on an item/collection for search indexing and display.
   *
   * @param {Object} parsedDate result of {@link parsePublishedDate}
   * @param {Object} [opts={}]
   * @param {Number} [opts.uncertaintyYears] number of years to pad an uncertain/approximate date by, on each side
   * @param {Boolean} [opts.uncertaintyYearsExplicit] whether uncertaintyYears came from an actual
   * item/collection override rather than the silent global default - controls both whether
   * "(±N years)" is shown in the display string, and whether the search range gets widened at
   * all (with no override, we don't know how fuzzy a "circa"/"uncertain" date really is, so
   * the safer default is to only make it searchable at its exact cataloged year), see
   * {@link isUncertaintyYearsExplicit}
   * @param {String} [opts.approximatePrefix] word used before an approximate date, eg "circa"
   * @param {String} [opts.uncertainSuffix] word used after an uncertain date, eg "uncertain"
   *
   * @returns {Object} {yearPublished, yearPublishedStart, yearPublishedEnd, datePrecision, dateDisplay}
   */
  computeDateFields(parsedDate, opts={}) {
    let {startYear, endYear, precision} = parsedDate;
    let uncertaintyYears = Number.isFinite(opts.uncertaintyYears) ? opts.uncertaintyYears : DEFAULT_UNCERTAINTY_YEARS;

    let dateDisplay = this._formatDisplay(parsedDate, uncertaintyYears, opts);

    // the display string above uses the original (unwidened) year(s) - circa/uncertain dates
    // still show their cataloged year, the widening only affects what's searchable, and only
    // applies at all once someone has actually defined how wide "fuzzy" should be
    if( WIDENABLE_PRECISIONS.has(precision) && opts.uncertaintyYearsExplicit ) {
      startYear -= uncertaintyYears;
      endYear += uncertaintyYears;
    }

    return {
      // yearPublished stays a plain scalar, populated only when start/end agree (a single
      // knowable year) so existing display/sort/citation code that reads it as one value
      // keeps working unchanged. A real range/circa/unspecified-digit date has no single
      // correct year, so yearPublished is left null and only the start/end fields are set.
      yearPublished : startYear === endYear ? startYear : null,
      yearPublishedStart : startYear,
      yearPublishedEnd : endYear,
      datePrecision : precision,
      dateDisplay
    };
  }

  /**
   * @method resolveUncertaintyYears
   * @description resolve the circa/uncertain widening window: item override, falling back to the
   * item's collection override, falling back to the global default.
   *
   * @param {Object} item flattened item/collection object being transformed
   * @param {Object} [collection] flattened parent collection object, if known
   *
   * @returns {Number}
   */
  resolveUncertaintyYears(item, collection) {
    if( Number.isFinite(item?.dateUncertaintyYears) ) return item.dateUncertaintyYears;
    if( Number.isFinite(collection?.dateUncertaintyYears) ) return collection.dateUncertaintyYears;
    return DEFAULT_UNCERTAINTY_YEARS;
  }

  /**
   * @method isUncertaintyYearsExplicit
   * @description whether the circa/uncertain widening window came from an actual
   * ucdlib:dateUncertaintyYears property on the item or its collection, rather than the silent
   * global default. Controls whether "(±N years)" is shown in the display string at all - a
   * cataloger who never set the property shouldn't see an implementation detail like the default.
   *
   * @param {Object} item flattened item/collection object being transformed
   * @param {Object} [collection] flattened parent collection object, if known
   *
   * @returns {Boolean}
   */
  isUncertaintyYearsExplicit(item, collection) {
    return Number.isFinite(item?.dateUncertaintyYears) || Number.isFinite(collection?.dateUncertaintyYears);
  }

  /**
   * @method resolveApproximatePrefix
   * @description resolve the word shown before an approximate date (eg "circa 1962"): item
   * override, falling back to the item's collection override, falling back to the built-in default.
   *
   * @param {Object} item flattened item/collection object being transformed
   * @param {Object} [collection] flattened parent collection object, if known
   *
   * @returns {String}
   */
  resolveApproximatePrefix(item, collection) {
    return item?.approximateDateLabel || collection?.approximateDateLabel || DEFAULT_APPROXIMATE_PREFIX;
  }

  /**
   * @method resolveUncertainSuffix
   * @description resolve the word shown after an uncertain date (eg "1962 (uncertain)"): item
   * override, falling back to the item's collection override, falling back to the built-in default.
   *
   * @param {Object} item flattened item/collection object being transformed
   * @param {Object} [collection] flattened parent collection object, if known
   *
   * @returns {String}
   */
  resolveUncertainSuffix(item, collection) {
    return item?.uncertainDateLabel || collection?.uncertainDateLabel || DEFAULT_UNCERTAIN_SUFFIX;
  }

  _formatDisplay(parsedDate, uncertaintyYears, opts={}) {
    let {startYear, endYear, precision, type, values, unspecified} = parsedDate;

    if( type === 'Interval' ) {
      return `${startYear}–${endYear}`;
    }

    if( precision === 'unspecified-decade' ) {
      return `${startYear}s`;
    }
    if( precision === 'unspecified-century' ) {
      return `${this._ordinal(Math.floor(startYear / 100) + 1)} century`;
    }
    if( precision === 'unspecified-range' ) {
      return `${startYear}–${endYear}`;
    }

    let monthMasked = (unspecified & MONTH_DIGITS_MASK) !== 0;
    let dayMasked = (unspecified & DAY_DIGITS_MASK) !== 0;
    let hasMonth = values.length >= 2 && !monthMasked;
    let hasDay = values.length >= 3 && !dayMasked;

    let base;
    if( hasDay ) {
      base = `${MONTH_NAMES[values[1]]} ${values[2]}, ${values[0]}`;
    } else if( hasMonth ) {
      base = `${MONTH_NAMES[values[1]]} ${values[0]}`;
    } else {
      base = `${values[0]}`;
    }

    // "uncertain" and "±N years" are mutually exclusive: once a real widening window is
    // defined, showing it is more useful than the generic "uncertain" word, never both at once
    let yearsSuffix = opts.uncertaintyYearsExplicit ? `±${uncertaintyYears} years` : null;
    let uncertainWord = yearsSuffix || opts.uncertainSuffix || DEFAULT_UNCERTAIN_SUFFIX;

    if( precision === 'uncertain' ) {
      return `${base} (${uncertainWord})`;
    }
    if( precision === 'approximate' ) {
      let prefix = opts.approximatePrefix || DEFAULT_APPROXIMATE_PREFIX;
      return yearsSuffix ? `${prefix} ${base} (${yearsSuffix})` : `${prefix} ${base}`;
    }
    if( precision === 'uncertain-approximate' ) {
      let prefix = opts.approximatePrefix || DEFAULT_APPROXIMATE_PREFIX;
      return `${prefix} ${base} (${uncertainWord})`;
    }

    return base;
  }

  _ordinal(n) {
    let suffixes = ['th', 'st', 'nd', 'rd'];
    let v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  _precisionFor(parsed, startYear, endYear) {
    if( parsed.type === 'Interval' ) return 'range';
    if( parsed.uncertain && parsed.approximate ) return 'uncertain-approximate';
    if( parsed.approximate ) return 'approximate';
    if( parsed.uncertain ) return 'uncertain';

    if( parsed.unspecified && (parsed.unspecified & YEAR_DIGITS_MASK) !== 0 && startYear !== endYear ) {
      let span = endYear - startYear;
      if( span === 9 ) return 'unspecified-decade';
      if( span === 99 ) return 'unspecified-century';
      return 'unspecified-range';
    }

    return 'exact';
  }

  _legacyFallback(value) {
    let match = value.match(/-?\d{4}/);
    if( !match ) return null;
    let year = parseInt(match[0], 10);
    return {startYear: year, endYear: year, precision: 'exact', type: 'Date', values: [year], unspecified: 0};
  }

  /**
   * @method useDateRangeFields
   * @description whether search/aggregation code should query yearPublishedStart/yearPublishedEnd
   * instead of the legacy scalar yearPublished. Off by default so a collection/item can be
   * reindexed with the new fields populated without immediately changing search behavior;
   * flip USE_DATE_RANGE_FIELDS=true once reindexing is complete everywhere it's needed.
   * Same env var name as the ucd-lib-client service's config, since both need to agree.
   *
   * @returns {Boolean}
   */
  useDateRangeFields() {
    return process.env.USE_DATE_RANGE_FIELDS === 'true';
  }

}

module.exports = new DateUtils();
