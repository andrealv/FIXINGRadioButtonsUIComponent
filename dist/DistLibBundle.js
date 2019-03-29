/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 188);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var require;//! moment.js

;(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames(obj).length === 0);
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null,
            rfc2822         : false,
            weekdayMismatch : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.weekdayMismatch &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        ss : '%d seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1 (mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            }
            else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return isArray(this._months) ? this._months :
                this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort :
                this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate (y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date = new Date(y, m, d, h, M, s, ms);

        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        if (!m) {
            return isArray(this._weekdays) ? this._weekdays :
                this._weekdays['standalone'];
        }
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('k',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = require;
                __webpack_require__(185)("./" + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
            else {
                if ((typeof console !==  'undefined') && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
          0 :
          parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add      = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1 (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year': output = monthDiff(this, that) / 12; break;
            case 'month': output = monthDiff(this, that); break;
            case 'quarter': output = monthDiff(this, that) / 3; break;
            case 'second': output = (this - that) / 1e3; break; // 1000
            case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
            case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
            case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
            case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default: output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true;
        var m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect () {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
            case 'date':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }

        // 'date' is an alias for 'day', so it should be considered as such.
        if (units === 'date') {
            units = 'day';
        }

        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2 () {
        return isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ?
          (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
          locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add               = add;
    proto.calendar          = calendar$1;
    proto.clone             = clone;
    proto.diff              = diff;
    proto.endOf             = endOf;
    proto.format            = format;
    proto.from              = from;
    proto.fromNow           = fromNow;
    proto.to                = to;
    proto.toNow             = toNow;
    proto.get               = stringGet;
    proto.invalidAt         = invalidAt;
    proto.isAfter           = isAfter;
    proto.isBefore          = isBefore;
    proto.isBetween         = isBetween;
    proto.isSame            = isSame;
    proto.isSameOrAfter     = isSameOrAfter;
    proto.isSameOrBefore    = isSameOrBefore;
    proto.isValid           = isValid$2;
    proto.lang              = lang;
    proto.locale            = locale;
    proto.localeData        = localeData;
    proto.max               = prototypeMax;
    proto.min               = prototypeMin;
    proto.parsingFlags      = parsingFlags;
    proto.set               = stringSet;
    proto.startOf           = startOf;
    proto.subtract          = subtract;
    proto.toArray           = toArray;
    proto.toObject          = toObject;
    proto.toDate            = toDate;
    proto.toISOString       = toISOString;
    proto.inspect           = inspect;
    proto.toJSON            = toJSON;
    proto.toString          = toString;
    proto.unix              = unix;
    proto.valueOf           = valueOf;
    proto.creationData      = creationData;
    proto.year       = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear    = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month       = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week           = proto.weeks        = getSetWeek;
    proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
    proto.weeksInYear    = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date       = getSetDayOfMonth;
    proto.day        = proto.days             = getSetDayOfWeek;
    proto.weekday    = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear  = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset            = getSetOffset;
    proto.utc                  = setOffsetToUTC;
    proto.local                = setOffsetToLocal;
    proto.parseZone            = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST                = isDaylightSavingTime;
    proto.isLocal              = isLocal;
    proto.isUtcOffset          = isUtcOffset;
    proto.isUtc                = isUtc;
    proto.isUTC                = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix (input) {
        return createLocal(input * 1000);
    }

    function createInZone () {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar        = calendar;
    proto$1.longDateFormat  = longDateFormat;
    proto$1.invalidDate     = invalidDate;
    proto$1.ordinal         = ordinal;
    proto$1.preparse        = preParsePostFormat;
    proto$1.postformat      = preParsePostFormat;
    proto$1.relativeTime    = relativeTime;
    proto$1.pastFuture      = pastFuture;
    proto$1.set             = set;

    proto$1.months            =        localeMonths;
    proto$1.monthsShort       =        localeMonthsShort;
    proto$1.monthsParse       =        localeMonthsParse;
    proto$1.monthsRegex       = monthsRegex;
    proto$1.monthsShortRegex  = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays       =        localeWeekdays;
    proto$1.weekdaysMin    =        localeWeekdaysMin;
    proto$1.weekdaysShort  =        localeWeekdaysShort;
    proto$1.weekdaysParse  =        localeWeekdaysParse;

    proto$1.weekdaysRegex       =        weekdaysRegex;
    proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
    proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1 (format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports

    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function addSubtract$1 (duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1 (input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1 (input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1 () {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function clone$1 () {
        return createDuration(this);
    }

    function get$2 (units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44,         // a few seconds to seconds
        s : 45,         // seconds to minute
        m : 45,         // minutes to hour
        h : 22,         // hours to day
        d : 26,         // days to month
        M : 11          // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds]  ||
                seconds < thresholds.s   && ['ss', seconds] ||
                minutes <= 1             && ['m']           ||
                minutes < thresholds.m   && ['mm', minutes] ||
                hours   <= 1             && ['h']           ||
                hours   < thresholds.h   && ['hh', hours]   ||
                days    <= 1             && ['d']           ||
                days    < thresholds.d   && ['dd', days]    ||
                months  <= 1             && ['M']           ||
                months  < thresholds.M   && ['MM', months]  ||
                years   <= 1             && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize (withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return ((x > 0) - (x < 0)) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days         = abs$1(this._days);
        var months       = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' +
            (Y ? ymSign + Y + 'Y' : '') +
            (M ? ymSign + M + 'M' : '') +
            (D ? daysSign + D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? hmsSign + h + 'H' : '') +
            (m ? hmsSign + m + 'M' : '') +
            (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid        = isValid$1;
    proto$2.abs            = abs;
    proto$2.add            = add$1;
    proto$2.subtract       = subtract$1;
    proto$2.as             = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds      = asSeconds;
    proto$2.asMinutes      = asMinutes;
    proto$2.asHours        = asHours;
    proto$2.asDays         = asDays;
    proto$2.asWeeks        = asWeeks;
    proto$2.asMonths       = asMonths;
    proto$2.asYears        = asYears;
    proto$2.valueOf        = valueOf$1;
    proto$2._bubble        = bubble;
    proto$2.clone          = clone$1;
    proto$2.get            = get$2;
    proto$2.milliseconds   = milliseconds;
    proto$2.seconds        = seconds;
    proto$2.minutes        = minutes;
    proto$2.hours          = hours;
    proto$2.days           = days;
    proto$2.weeks          = weeks;
    proto$2.months         = months;
    proto$2.years          = years;
    proto$2.humanize       = humanize;
    proto$2.toISOString    = toISOString$1;
    proto$2.toString       = toISOString$1;
    proto$2.toJSON         = toISOString$1;
    proto$2.locale         = locale;
    proto$2.localeData     = localeData;

    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.23.0';

    setHookCallback(createLocal);

    hooks.fn                    = proto;
    hooks.min                   = min;
    hooks.max                   = max;
    hooks.now                   = now;
    hooks.utc                   = createUTC;
    hooks.unix                  = createUnix;
    hooks.months                = listMonths;
    hooks.isDate                = isDate;
    hooks.locale                = getSetGlobalLocale;
    hooks.invalid               = createInvalid;
    hooks.duration              = createDuration;
    hooks.isMoment              = isMoment;
    hooks.weekdays              = listWeekdays;
    hooks.parseZone             = createInZone;
    hooks.localeData            = getLocale;
    hooks.isDuration            = isDuration;
    hooks.monthsShort           = listMonthsShort;
    hooks.weekdaysMin           = listWeekdaysMin;
    hooks.defineLocale          = defineLocale;
    hooks.updateLocale          = updateLocale;
    hooks.locales               = listLocales;
    hooks.weekdaysShort         = listWeekdaysShort;
    hooks.normalizeUnits        = normalizeUnits;
    hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat        = getCalendarFormat;
    hooks.prototype             = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD',                             // <input type="date" />
        TIME: 'HH:mm',                                  // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW',                             // <input type="week" />
        MONTH: 'YYYY-MM'                                // <input type="month" />
    };

    return hooks;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(187)(module)))

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** @module B BaseObject*/

/**
 * Web Apps Javascript Distribution Library
 * Base implementation for the User Object
 *
 */
class BaseObject {

  constructor() {
    /**
         * Set of getProperty functions
         * the object key is the property name to be set/get
         *
         */
    this.getProperty = {
      width: (objName) => {
        return this.getElemFromName(objName).width();
      },
      height: (objName) => {
        return this.getElemFromName(objName).height();
      },
      x: (objName) => {
        var elem = this.getElemFromName(objName);
        // return Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[0], 10));  // elem.css('transform').split(',')[4])
        return elem.position().left;
      },
      y: (objName) => {
        var elem = this.getElemFromName(objName);
        //return Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[1], 10));  // elem.css('transform').split(',')[5])
        return elem.position().top;
      },
      Alpha: (objName) => {
        return this.getElemFromName(objName).css("opacity");
      },
      "Background color": (objName) => {
        return this.getElemFromName(objName).css("background-color");
      },
      "Horizontal scroll": (objName) => {
        return this.getElemFromName(objName).css("overflow-x");
      },
      "Vertical scroll": (objName) => {
        return this.getElemFromName(objName).css("overflow-y");
      },
      "Constraints": (objName) => {
        return [
          this.getElemFromName(objName).css("top"),
          this.getElemFromName(objName).css("right"),
          this.getElemFromName(objName).css("bottom"),
          this.getElemFromName(objName).css("left")
        ];
      },
      "Border color": (objName) => {
        return this.getElemFromName(objName).css("border-color");
      },
      "Border width": (objName) => {
        return this.getElemFromName(objName).css("border-width");
      },
      "Border radius": (objName) => {
        return this.getElemFromName(objName).css("border-radius");
      },
    };

    /**
     * Set of setProperty functions
     * the object key is the property name to be set/get
     *
     */
    this.setProperty = {
      width: (objName, value) => {
        this.getElemFromName(objName).css("width", value + "px");
      },
      height: (objName, value) => {
        this.getElemFromName(objName).css("height", value + "px");
      },
      x: (objName, value) => {
        var elem = this.getElemFromName(objName);
        //var yPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[1], 10)); // elem.css('transform').split(',')[5])
        var yPos = elem.position().top;
        // remove constraints
        this.removeConstraints(elem, "x");
        elem.css("transform", "translate(" + value + "px," + yPos + "px)");
      },
      y: (objName, value) => {
        var elem = this.getElemFromName(objName);
        //var xPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[0], 10)); // elem.css('transform').split(',')[4])
        var xPos = elem.position().left;
        // remove constraints if applied
        this.removeConstraints(elem, "y");
        elem.css("transform", "translate(" + xPos + "px," + value + "px)");
      },
      Alpha: (objName, value) => {
        this.getElemFromName(objName).css("opacity", value/100 );
      },
      "Background color": (objName, value) => {
        this.getElemFromName(objName).css("background-color", value);
      },
      "Horizontal scroll": (objName, value) => {
        this.getElemFromName(objName).css("overflow-x", "hidden");
        if (value) this.getElemFromName(objName).css("overflow-x", "scroll");
      },
      "Vertical scroll": (objName, value) => {
        this.getElemFromName(objName).css("overflow-y", "hidden");
        if (value) this.getElemFromName(objName).css("overflow-y", "scroll");
      },
      "Constraints": (objName, value) => {
        try {
          var elem = this.getElemFromName(objName);
          if ((value[0] == "top") || (value[0] == "bottom") ) {
            var xPos = elem.position().left;
            elem.css("transform", "translate(" + xPos + "px,0px)");
          } else {
            var yPos = elem.position().top;
            elem.css("transform", "translate(0px," + yPos + "px)");
          }
          // reset constraint to initial if value is null
          if (!value[1]) {
            elem.css(value[0], "initial");
          } else {
            elem.css(value[0], value[1] + "px");

            // check if stretch is needed
            if (elem.css("top") && elem.css("bottom")) elem.css("height", "auto");
            if (elem.css("right") && elem.css("left")) elem.css("width", "auto");
          }
        } catch (e) {
          console.log (e);
        } 
                
      },
      "Border color": (objName, value) => {
        this.getElemFromName(objName).css("border-color", value);
      },
      "Border width": (objName, value) => {
        this.getElemFromName(objName).css("border-width", value);
      },
      "Border radius": (objName, value) => {
        this.getElemFromName(objName).css("border-radius", value);
      }
    };
  }

  /**
    * Find model of provided objName to set property
    */
  setGenericProperty(objName, prop, value) {
    if (!objName || !prop) return;
    const elem = this.getElemFromName(objName);
    if (elem.length < 1) return;
    const model = elem.attr("class").split(" ").pop();
    if (model) {
      try {
        com.fc.JavaScriptDistLib[model].setProperty[prop](objName, value);
      } catch (err) {
        console.warn("Could not set " + prop + " to " + objName);
      }
    } else {
      try {
        this.setProperty[prop](objName, value);
      } catch (err) {
        console.warn("Could not set " + prop + " to " + objName);
      }
    }
  }

  /**
     * Remove all constraints if we move the object
     * @param objName
     * @param axis
     */
  removeConstraints(elem, axis) {
    if (elem.css("top") && axis == "y") elem.css("top", "");
    if (elem.css("left") && axis == "x") elem.css("left", "");
    if (elem.css("bottom") && axis == "y") elem.css("bottom", "");
    if (elem.css("right") && axis == "x") elem.css("right", "");
    // here restore the height and width params
    if (axis == "y") elem.css("height", elem.attr("original-height") + "px");
    else elem.css("width", elem.attr("original-width") + "px");
  }

  /**
     * Retrieves the element with a given object-name attribute
     * @param objName
     * @returns {*|jQuery|HTMLElement}
     */
  getElemFromName(objName) {
    return $("[obj-name= \"" + objName + "\"]");
  }

  /**
     * Generic removeGesture block implementation
     * @param objName
     * @param gesture
     */
  removeGesture (objName, gesture) {
    try {
      var elem = this.getElemFromName(objName);
      var gestureStr = this.gestureStr(gesture);
      return elem.unbind(gestureStr);
    } catch (e) {
      throw(e);
    }
  }
    
  animationStart(objName, animation, onCompleteCallback) {
    var elem = this.getElemFromName(objName);
    let duration = animation.duration*1000;
    let options = {duration: duration, complete: onCompleteCallback, queue: animation.id};

    switch(animation.type) {
    case "move":
      elem.animate({left: "+=" + animation.dX + "px", top: "+=" + animation.dY + "px"}, options);
      elem.dequeue(animation.id);
      break;
    case "scale":
      let newWidth = elem.width() * animation.dX;
      let newHeight = elem.height() * animation.dY;
      let leftDelta = (newWidth - elem.width()) / 2;
      let topDelta = (newHeight - elem.height()) / 2;
      elem.animate({width:newWidth+"px", height:newHeight+"px", left: "-="+leftDelta+"px", top: "-="+topDelta+"px"}, options);
      elem.dequeue(animation.id);
      break;
    case "rotate":
      let angle = animation.angle;
      let currAngle = 0;
      if( elem.attr("data-angle") ) {
        currAngle = elem.attr("data-angle");
      }
      let finalAngle = parseInt(currAngle) + parseInt(angle);
      elem.attr("data-angle", finalAngle);
      var left = elem.position().left;
      var top = elem.position().top;
                 
      let stepFunc = function(now) {
        elem.css({
          "transform":"rotate("+now+"deg)",
          "left": left+"px",
          "top": top+"px"
        });
      };
                 
      let completeFunc = function() {
        //hs:traaping before calling scrip's callback incase you want to do any post processing on the data
        onCompleteCallback();
      };
      options.step = stepFunc;
      options.complete = completeFunc;
      elem.animate({deg: finalAngle}, options);
      elem.dequeue(animation.id);
      break;
    case "fade":
      let alpha = (animation.alpha / 100);
      elem.animate({opacity:alpha}, options);
      elem.dequeue(animation.id);
      break;
    }
  }

  animationCancel(objName, animation) {
    var elem = this.getElemFromName(objName);
    elem.stop(animation.id, false, false);
  }

  animationStop(objName, animation) {
    var elem = this.getElemFromName(objName);
    elem.stop(animation.id, true, true);
  }

  animationStopAll(objName) {
    var elem = this.getElemFromName(objName);
    elem.stop();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BaseObject);




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(1);
// ES6 imports


class TextObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

  constructor(elemSelectorRef) {
    super();

    // Element selector
    this.elemSelectorRef = elemSelectorRef || "";

    var self = this;

    // Getting Text properties values

    this.getProperty = Object.assign(this.getProperty, {
      "Font size": (objName) => {
        return this.getTextElemFromName(objName).css("font-size");
      },
      Alpha: (objName) => {
        return this.getTextElemFromName(objName).css("opacity") * 100;
      },
      "Text Alignment": (objName) => {
        return this.getTextElemFromName(objName).css("text-align");
      },
      "Vertical Alignment": (objName) => {
        return this.getTextElemFromName(objName).css("vertical-align");
      },
      "Font style": (objName) => {
        return this.getTextElemFromName(objName).attr("fontStyle");
      },
      "Font family": (objName) => {
        return this.getTextElemFromName(objName).css("font-family");
      },
      "Background color": (objName) => {
        return this.getTextElemFromName(objName).css("background-color");
      },
      "Text color": (objName) => {
        return this.getTextElemFromName(objName).css("color");
      },
      Text: (objName) => {
        return this.getTextElemFromName(objName).html();
      }
    });

    this.setProperty = Object.assign(this.setProperty, {
      Text: (objName, value) => {
        this.getTextElemFromName(objName).html(value);
      },
      "Font size": (objName, value) => {
        if (String(value).includes("px")) {
          this.getTextElemFromName(objName).css("font-size", value);
        } else {
          this.getTextElemFromName(objName).css("font-size", value + "px");
        }
      },
      Alpha: (objName, value) => {
        this.getTextElemFromName(objName).css("opacity",value/100);
      },
      "Text Alignment": (objName, value) => {
        this.getTextElemFromName(objName).css("text-align",value.toLowerCase());
      },
      "Vertical Alignment": (objName, value) => {
        this.getTextElemFromName(objName).css("vertical-align",value.toLowerCase());
      },
      "Font style": (objName, value) => {
        let property = "font-style";
        if (value.toLowerCase() == "bold") {
          property = "font-weight";
        }
        this.getTextElemFromName(objName).css(property,value.toLowerCase());
        this.getTextElemFromName(objName).attr("fontStyle",value.toLowerCase());
      },
      "Font family": (objName, value) => {
        this.getTextElemFromName(objName).css("font-family",value.toLowerCase());
      },
      "Background color": (objName, value) => {
        this.getTextElemFromName(objName).css("background-color",value);
      },
      "Text color": (objName, value) => {
        this.getTextElemFromName(objName).css("color",value);
      }
    });
  }

  /**
     * Retrieves the text element with a given object-name attribute
     * @param objName
     * @returns {*|jQuery|HTMLElement}
     */
  getTextElemFromName (objName) {
    return $("[obj-name= \"" + objName + "\"]" + this.elemSelectorRef);
  }

  init ( elemSelectorRefValue) {
    this.elemSelectorRef = elemSelectorRefValue;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (TextObject);





/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(1);
/**
 * 
 */
/*global $ */

// ES6 imports


class ListGridObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {
  constructor() {

    super();
    this.objectNameMap = {};
    this.templateCell = {};
    this.configCallbacks = {};
    this.configHeightCallbacks = {};
    this.configWidthCallbacks = {};
    this.clickCallbacks = {};

    this.getProperty = Object.assign(this.getProperty, {
      "Show scrollbar": (obj) => {
        return obj.css("overflow-y");
      },
      "Horizontal separator thick": (obj) => {
        return obj.css("border-bottom-width");
      },
      "separator color": (obj) => {
        return obj.css("border-bottom-color");
      },
      "Highlight cell color": (obj) => {
        return obj.attr("cell-highlight-color");
      },
      "Highlight cell": (obj) => {
        // let ele = "[obj-name= \"" + objName + "\"]";
        return obj.attr("cell-highlight");
      },
      width: (obj) => {
        return obj.width();
      },
      height: (obj) => {
        return obj.height();
      },
      x: (obj) => {
        return obj.position().left;
      },
      y: (obj) => {
        return obj.position().top;
      },
      Alpha: (obj) => {
        return obj.css("opacity");
      },
      "Background color": (obj) => {
        return obj.css("background-color");
      },
      "Horizontal scroll": (obj) => {
        return obj.css("overflow-x");
      },
      "Vertical scroll": (obj) => {
        return obj.css("overflow-y");
      },
    });

    this.setProperty = Object.assign(this.setProperty, {
      "Show scrollbar": (obj, value) => {
        let overflow = "auto";
        if (value.toLowerCase() == "never") {
          document.styleSheets[0].addRule(".hide-scrolllbar::-webkit-scrollbar", "width: 0;");
          obj.addClass("hide-scrolllbar");
        } else {
          obj.removeClass("hide-scrolllbar");
          obj.css("overflow-y",overflow);
        }
      },
      "separator color": (obj, value) => {
        obj.find(".border-sep").css("background-color",value);
      },
      "Highlight cell color": (obj, value) => {
        obj.attr("cell-highlight-color",value);
        if (obj.attr("cell-highlight") == "YES") {
          obj.mouseenter(function() {
            $(this).css("background-color",value);
          }).mouseleave(function() {
            obj.css("background-color",obj.attr("cell-bg-color"));
          });
        } else {
          obj.unbind("mouseenter");
        }
      },
      "Highlight cell": (obj, value) => {
        if (value) {
          obj.attr("cell-highlight","YES");
          obj.mouseenter(function() {
            $(this).css("background-color",obj.attr("cell-highlight-color"));
          }).mouseleave(function() {
            $(this).css("background-color",obj.attr("cell-bg-color"));
          });
        } else {
          obj.attr("cell-highlight","NO");
          obj.unbind("mouseenter");
        }
      },
      width: (obj, value) => {
        var elem = $('[obj-name= "' + obj + '"]');
        $(elem).css("width", value + "px");
      },
      x: (obj, value) => {
        var elem = $('[obj-name= "' + obj + '"]');
        //var yPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[1], 10)); // elem.css('transform').split(',')[5])
        var yPos = elem.position().top;
        // remove constraints
        this.removeConstraints(elem, "x");
        elem.css("transform", "translate(" + value + "px," + yPos + "px)");
      },
      y: (obj, value) => {
        var elem = $('[obj-name= "' + obj + '"]');
        //var xPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[0], 10)); // elem.css('transform').split(',')[4])
        var xPos = elem.position().left;
        // remove constraints if applied
        this.removeConstraints(elem, "y");
        elem.css("transform", "translate(" + xPos + "px," + value + "px)");
      },

      "Horizontal scroll": (obj, value) => {
        obj.css("overflow-x", "hidden");
        if (value) obj.css("overflow-x", "scroll");
      },
      "Vertical scroll": (obj, value) => {
        obj.css("overflow-y", "hidden");
        if (value) obj.css("overflow-y", "scroll");
      }
    });
  }

  configureCells (objName, cellLength) {
    var parent = this;
    var index = 0;
    var ele = "[obj-name=\"" + objName + "\"]";
    
    this.saveTemplateCell(objName);
        
    for (let i=0;i<cellLength;i++) {
      let cellView = this.templateCell[objName].clone();
      //The elements are absolutely positioned. Change their 'top' attr
      //$(cellView).css("top",firstElement.height()*(i+1));
      //Change ID for these elements
      let firstCellId = parseInt(this.templateCell[objName].attr("id").replace("j_",""));
      $(cellView).attr("id","j_"+parseInt(firstCellId+i));
            
      //Now rename the children
      $(cellView).children().each(function () {
        index++;
        let currName = $(this).attr("obj-name");
        if( currName != undefined ) {
          let newId = currName + "_lceid_" + index;
          let newName = currName + "_lcename_" + index;
          $(this).attr("id", newId);
          $(this).attr("obj-name", newName);
          parent.objectNameMap[newId] = newName;
        }
      });

      $(cellView).attr("listindex", i);
      $(cellView).click( function() {
        // console.log("clicked ", $(this).attr("listindex"));
        parent.setContext($(this));
        //callback here
        let callback = parent.clickCallbacks[$(this).attr("obj-name")];
        if( callback != null ) {
          callback($(this), $(this).attr("listindex"));
        }
        parent.resetContext($(this));
      });

      $(ele).append(cellView);
    }
    
    $(ele).find(".ListViewCell").each(function () {
      let elem = $(this);
      if ($(elem).attr("cell-highlight") == "YES") {
        $(elem).mouseenter(function() {
          $(elem).attr("cell-bg-color",$(elem).css("background-color"));
          $(elem).css("background-color",$(elem).attr("cell-highlight-color"));
        }).mouseleave(function() {
          $(elem).css("background-color",$(elem).attr("cell-bg-color"));
        });
      }
    });

    $(ele).find(".GridViewCell").each(function () {
      let elem = $(this);
      if ($(elem).attr("cell-highlight") == "YES") {
        $(elem).mouseenter(function() {
          $(elem).attr("cell-bg-color",$(elem).css("background-color"));
          $(elem).css("background-color",$(elem).attr("cell-highlight-color"));
        }).mouseleave(function() {
          $(elem).css("background-color",$(elem).attr("cell-bg-color"));
        });
      }
    });

    //check scroll
    $(ele).removeClass("hide-scrolllbar");
    switch ($(ele).attr("show-scroll")) {
    case "always":
      $(ele).css("overflow-y","scroll");
      break;
    case "when scroll":
      $(ele).css("overflow-y","auto");
      break;
    case "never":
      document.styleSheets[0].addRule(".hide-scrolllbar::-webkit-scrollbar", "width: 0;");
      $(ele).addClass("hide-scrolllbar");

      break;
    }
        
  }

  //hs: returns true if saved, false if exists
  saveTemplateCell(objName) {
    var ele = "[obj-name=\"" + objName + "\"]";
    var firstElement = $(ele).children().eq(1);

    if( this.templateCell[objName] == null ) {
      this.templateCell[objName] = firstElement.clone();
      return true;
    }
    return false;
  }

  removeCell(cell) {
    cell.remove();
  }

  setContext(objName) {
    // console.log(objName);
    objName.children().each(function () {
      let currName = $(this).attr("obj-name");
      if( currName != undefined ) {
        let charIndex = currName.indexOf("_lcename_");
        if( charIndex != -1 ) {
          var newName = currName.substr(0, charIndex);
          $(this).attr("obj-name", newName);
        }
                
      }
    });
  }

  setClickCallback(objName, callback) {
    this.clickCallbacks[objName] = callback;
  }

  setConfigCallback(objName, callback) {
    this.configCallbacks[objName] = callback;
  }

  setConfigHeightCallback(objName, callback) {
    this.configHeightCallbacks[objName] = callback;
  }

  setConfigWidthCallback(objName, callback) {
    this.configWidthCallbacks[objName] = callback;
  }

  executeConfigCallback(objName, cell, position) {
    var ele = "[obj-name=\"" + objName + "\"]";
    var cellName = cell.attr("obj-name");
    //console.log("Cellname = " + cellName);
    let callback = this.configCallbacks[cellName];
    // console.log("callback = " + callback);
    if( callback!=undefined ) {
      callback(cell, position);
    }
  }

  executeConfigHeightCallback(objName, cell, position) {
    var ele = "[obj-name=\"" + objName + "\"]";
    var cellName = cell.attr("obj-name");
    let callback = this.configHeightCallbacks[cellName];
  
    if( callback!=undefined ) {
      //height value is coming from the configure height script
      let height = callback(cell, position);
      cell.css("height",height+'px');
    }
  }

  executeConfigWidthCallback(objName, cell, position) {
    var ele = "[obj-name=\"" + objName + "\"]";
    var cellName = cell.attr("obj-name");
    let callback = this.configWidthCallbacks[cellName];
  
    if( callback!=undefined ) {
      //width value is coming from the configure width script
      let width = callback(cell, position);
      cell.css("width",width+'px');
    }
  }

  resetContext(objName) {
    var parent = this;
    objName.children().each(function () {
      let currName = $(this).attr("obj-name");
      let currId = $(this).attr("id");

      if( currName != undefined ) {
        $(this).attr("obj-name", parent.objectNameMap[currId]);
      }
    });
  }

  removeAllCells(objName) {
    var parent = this;
    let ele = "[obj-name=\"" + objName + "\"]";
    $(ele).children().each(function (i) {
      $(this).remove();
    });
    parent.objectNameMap = {};
  }

  scrollTo (objName,cellNum,animated,selector) {
    let ele = "[obj-name=\"" + objName + "\"]";
    let scrollSpeed = 500;
    if (!animated) {
      scrollSpeed = 0;
    }
    $(ele).animate({
      scrollTop: $(ele).find("."+selector+":eq("+cellNum+")" ).offset().top}
      ,scrollSpeed);
  }

  isCellVisible (objName,cellNum,selector) {
    let ele = "[obj-name=\"" + objName + "\"]";
    let cell = $(ele).find("."+selector+":eq("+cellNum+")" );
    let contHeight = $(ele).height();
    //let contTop = $(ele).scrollTop();
    //let contBottom = contTop + contHeight;
    try {
      let elemTop = cell.offset().top - $(ele).offset().top;
      let elemBottom = elemTop + cell.height();
      return elemTop >= 0 && elemBottom <=contHeight;
    } catch (e) {
      console.error("Cell with index - "+cellNum + " does not exist");
      return false;
    }
    
  }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ListGridObject);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var af = moment.defineLocale('af', {
        months : 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
        monthsShort : 'Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
        weekdays : 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
        weekdaysShort : 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
        weekdaysMin : 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
        meridiemParse: /vm|nm/i,
        isPM : function (input) {
            return /^nm$/i.test(input);
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 12) {
                return isLower ? 'vm' : 'VM';
            } else {
                return isLower ? 'nm' : 'NM';
            }
        },
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Vandag om] LT',
            nextDay : '[Môre om] LT',
            nextWeek : 'dddd [om] LT',
            lastDay : '[Gister om] LT',
            lastWeek : '[Laas] dddd [om] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'oor %s',
            past : '%s gelede',
            s : '\'n paar sekondes',
            ss : '%d sekondes',
            m : '\'n minuut',
            mm : '%d minute',
            h : '\'n uur',
            hh : '%d ure',
            d : '\'n dag',
            dd : '%d dae',
            M : '\'n maand',
            MM : '%d maande',
            y : '\'n jaar',
            yy : '%d jaar'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal : function (number) {
            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de'); // Thanks to Joris Röling : https://github.com/jjupiter
        },
        week : {
            dow : 1, // Maandag is die eerste dag van die week.
            doy : 4  // Die week wat die 4de Januarie bevat is die eerste week van die jaar.
        }
    });

    return af;

})));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var arDz = moment.defineLocale('ar-dz', {
        months : 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        monthsShort : 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort : 'احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin : 'أح_إث_ثلا_أر_خم_جم_سب'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'في %s',
            past : 'منذ %s',
            s : 'ثوان',
            ss : '%d ثانية',
            m : 'دقيقة',
            mm : '%d دقائق',
            h : 'ساعة',
            hh : '%d ساعات',
            d : 'يوم',
            dd : '%d أيام',
            M : 'شهر',
            MM : '%d أشهر',
            y : 'سنة',
            yy : '%d سنوات'
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return arDz;

})));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var arKw = moment.defineLocale('ar-kw', {
        months : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
        monthsShort : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
        weekdays : 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort : 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'في %s',
            past : 'منذ %s',
            s : 'ثوان',
            ss : '%d ثانية',
            m : 'دقيقة',
            mm : '%d دقائق',
            h : 'ساعة',
            hh : '%d ساعات',
            d : 'يوم',
            dd : '%d أيام',
            M : 'شهر',
            MM : '%d أشهر',
            y : 'سنة',
            yy : '%d سنوات'
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 12  // The week that contains Jan 12th is the first week of the year.
        }
    });

    return arKw;

})));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var symbolMap = {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '0': '0'
    }, pluralForm = function (n) {
        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
    }, plurals = {
        s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
        m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
        h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
        d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
        M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
        y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
    }, pluralize = function (u) {
        return function (number, withoutSuffix, string, isFuture) {
            var f = pluralForm(number),
                str = plurals[u][pluralForm(number)];
            if (f === 2) {
                str = str[withoutSuffix ? 0 : 1];
            }
            return str.replace(/%d/i, number);
        };
    }, months = [
        'يناير',
        'فبراير',
        'مارس',
        'أبريل',
        'مايو',
        'يونيو',
        'يوليو',
        'أغسطس',
        'سبتمبر',
        'أكتوبر',
        'نوفمبر',
        'ديسمبر'
    ];

    var arLy = moment.defineLocale('ar-ly', {
        months : months,
        monthsShort : months,
        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'D/\u200FM/\u200FYYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ص|م/,
        isPM : function (input) {
            return 'م' === input;
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ص';
            } else {
                return 'م';
            }
        },
        calendar : {
            sameDay: '[اليوم عند الساعة] LT',
            nextDay: '[غدًا عند الساعة] LT',
            nextWeek: 'dddd [عند الساعة] LT',
            lastDay: '[أمس عند الساعة] LT',
            lastWeek: 'dddd [عند الساعة] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'بعد %s',
            past : 'منذ %s',
            s : pluralize('s'),
            ss : pluralize('s'),
            m : pluralize('m'),
            mm : pluralize('m'),
            h : pluralize('h'),
            hh : pluralize('h'),
            d : pluralize('d'),
            dd : pluralize('d'),
            M : pluralize('M'),
            MM : pluralize('M'),
            y : pluralize('y'),
            yy : pluralize('y')
        },
        preparse: function (string) {
            return string.replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            }).replace(/,/g, '،');
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 12th is the first week of the year.
        }
    });

    return arLy;

})));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var arMa = moment.defineLocale('ar-ma', {
        months : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
        monthsShort : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
        weekdays : 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort : 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'في %s',
            past : 'منذ %s',
            s : 'ثوان',
            ss : '%d ثانية',
            m : 'دقيقة',
            mm : '%d دقائق',
            h : 'ساعة',
            hh : '%d ساعات',
            d : 'يوم',
            dd : '%d أيام',
            M : 'شهر',
            MM : '%d أشهر',
            y : 'سنة',
            yy : '%d سنوات'
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 12th is the first week of the year.
        }
    });

    return arMa;

})));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var symbolMap = {
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩',
        '0': '٠'
    }, numberMap = {
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',
        '٠': '0'
    };

    var arSa = moment.defineLocale('ar-sa', {
        months : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        monthsShort : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ص|م/,
        isPM : function (input) {
            return 'م' === input;
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ص';
            } else {
                return 'م';
            }
        },
        calendar : {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'في %s',
            past : 'منذ %s',
            s : 'ثوان',
            ss : '%d ثانية',
            m : 'دقيقة',
            mm : '%d دقائق',
            h : 'ساعة',
            hh : '%d ساعات',
            d : 'يوم',
            dd : '%d أيام',
            M : 'شهر',
            MM : '%d أشهر',
            y : 'سنة',
            yy : '%d سنوات'
        },
        preparse: function (string) {
            return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
                return numberMap[match];
            }).replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            }).replace(/,/g, '،');
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    return arSa;

})));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var arTn = moment.defineLocale('ar-tn', {
        months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact : true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'في %s',
            past: 'منذ %s',
            s: 'ثوان',
            ss : '%d ثانية',
            m: 'دقيقة',
            mm: '%d دقائق',
            h: 'ساعة',
            hh: '%d ساعات',
            d: 'يوم',
            dd: '%d أيام',
            M: 'شهر',
            MM: '%d أشهر',
            y: 'سنة',
            yy: '%d سنوات'
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return arTn;

})));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var symbolMap = {
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩',
        '0': '٠'
    }, numberMap = {
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',
        '٠': '0'
    }, pluralForm = function (n) {
        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
    }, plurals = {
        s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
        m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
        h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
        d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
        M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
        y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
    }, pluralize = function (u) {
        return function (number, withoutSuffix, string, isFuture) {
            var f = pluralForm(number),
                str = plurals[u][pluralForm(number)];
            if (f === 2) {
                str = str[withoutSuffix ? 0 : 1];
            }
            return str.replace(/%d/i, number);
        };
    }, months = [
        'يناير',
        'فبراير',
        'مارس',
        'أبريل',
        'مايو',
        'يونيو',
        'يوليو',
        'أغسطس',
        'سبتمبر',
        'أكتوبر',
        'نوفمبر',
        'ديسمبر'
    ];

    var ar = moment.defineLocale('ar', {
        months : months,
        monthsShort : months,
        weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'D/\u200FM/\u200FYYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ص|م/,
        isPM : function (input) {
            return 'م' === input;
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ص';
            } else {
                return 'م';
            }
        },
        calendar : {
            sameDay: '[اليوم عند الساعة] LT',
            nextDay: '[غدًا عند الساعة] LT',
            nextWeek: 'dddd [عند الساعة] LT',
            lastDay: '[أمس عند الساعة] LT',
            lastWeek: 'dddd [عند الساعة] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'بعد %s',
            past : 'منذ %s',
            s : pluralize('s'),
            ss : pluralize('s'),
            m : pluralize('m'),
            mm : pluralize('m'),
            h : pluralize('h'),
            hh : pluralize('h'),
            d : pluralize('d'),
            dd : pluralize('d'),
            M : pluralize('M'),
            MM : pluralize('M'),
            y : pluralize('y'),
            yy : pluralize('y')
        },
        preparse: function (string) {
            return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
                return numberMap[match];
            }).replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            }).replace(/,/g, '،');
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 12th is the first week of the year.
        }
    });

    return ar;

})));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var suffixes = {
        1: '-inci',
        5: '-inci',
        8: '-inci',
        70: '-inci',
        80: '-inci',
        2: '-nci',
        7: '-nci',
        20: '-nci',
        50: '-nci',
        3: '-üncü',
        4: '-üncü',
        100: '-üncü',
        6: '-ncı',
        9: '-uncu',
        10: '-uncu',
        30: '-uncu',
        60: '-ıncı',
        90: '-ıncı'
    };

    var az = moment.defineLocale('az', {
        months : 'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split('_'),
        monthsShort : 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
        weekdays : 'Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə'.split('_'),
        weekdaysShort : 'Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən'.split('_'),
        weekdaysMin : 'Bz_BE_ÇA_Çə_CA_Cü_Şə'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[bugün saat] LT',
            nextDay : '[sabah saat] LT',
            nextWeek : '[gələn həftə] dddd [saat] LT',
            lastDay : '[dünən] LT',
            lastWeek : '[keçən həftə] dddd [saat] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s sonra',
            past : '%s əvvəl',
            s : 'birneçə saniyə',
            ss : '%d saniyə',
            m : 'bir dəqiqə',
            mm : '%d dəqiqə',
            h : 'bir saat',
            hh : '%d saat',
            d : 'bir gün',
            dd : '%d gün',
            M : 'bir ay',
            MM : '%d ay',
            y : 'bir il',
            yy : '%d il'
        },
        meridiemParse: /gecə|səhər|gündüz|axşam/,
        isPM : function (input) {
            return /^(gündüz|axşam)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'gecə';
            } else if (hour < 12) {
                return 'səhər';
            } else if (hour < 17) {
                return 'gündüz';
            } else {
                return 'axşam';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
        ordinal : function (number) {
            if (number === 0) {  // special case for zero
                return number + '-ıncı';
            }
            var a = number % 10,
                b = number % 100 - a,
                c = number >= 100 ? 100 : null;
            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return az;

})));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
    }
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'ss': withoutSuffix ? 'секунда_секунды_секунд' : 'секунду_секунды_секунд',
            'mm': withoutSuffix ? 'хвіліна_хвіліны_хвілін' : 'хвіліну_хвіліны_хвілін',
            'hh': withoutSuffix ? 'гадзіна_гадзіны_гадзін' : 'гадзіну_гадзіны_гадзін',
            'dd': 'дзень_дні_дзён',
            'MM': 'месяц_месяцы_месяцаў',
            'yy': 'год_гады_гадоў'
        };
        if (key === 'm') {
            return withoutSuffix ? 'хвіліна' : 'хвіліну';
        }
        else if (key === 'h') {
            return withoutSuffix ? 'гадзіна' : 'гадзіну';
        }
        else {
            return number + ' ' + plural(format[key], +number);
        }
    }

    var be = moment.defineLocale('be', {
        months : {
            format: 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_'),
            standalone: 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_')
        },
        monthsShort : 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
        weekdays : {
            format: 'нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу'.split('_'),
            standalone: 'нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота'.split('_'),
            isFormat: /\[ ?[Ууў] ?(?:мінулую|наступную)? ?\] ?dddd/
        },
        weekdaysShort : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
        weekdaysMin : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY г.',
            LLL : 'D MMMM YYYY г., HH:mm',
            LLLL : 'dddd, D MMMM YYYY г., HH:mm'
        },
        calendar : {
            sameDay: '[Сёння ў] LT',
            nextDay: '[Заўтра ў] LT',
            lastDay: '[Учора ў] LT',
            nextWeek: function () {
                return '[У] dddd [ў] LT';
            },
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return '[У мінулую] dddd [ў] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[У мінулы] dddd [ў] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'праз %s',
            past : '%s таму',
            s : 'некалькі секунд',
            m : relativeTimeWithPlural,
            mm : relativeTimeWithPlural,
            h : relativeTimeWithPlural,
            hh : relativeTimeWithPlural,
            d : 'дзень',
            dd : relativeTimeWithPlural,
            M : 'месяц',
            MM : relativeTimeWithPlural,
            y : 'год',
            yy : relativeTimeWithPlural
        },
        meridiemParse: /ночы|раніцы|дня|вечара/,
        isPM : function (input) {
            return /^(дня|вечара)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ночы';
            } else if (hour < 12) {
                return 'раніцы';
            } else if (hour < 17) {
                return 'дня';
            } else {
                return 'вечара';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(і|ы|га)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'M':
                case 'd':
                case 'DDD':
                case 'w':
                case 'W':
                    return (number % 10 === 2 || number % 10 === 3) && (number % 100 !== 12 && number % 100 !== 13) ? number + '-і' : number + '-ы';
                case 'D':
                    return number + '-га';
                default:
                    return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return be;

})));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var bg = moment.defineLocale('bg', {
        months : 'януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември'.split('_'),
        monthsShort : 'янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек'.split('_'),
        weekdays : 'неделя_понеделник_вторник_сряда_четвъртък_петък_събота'.split('_'),
        weekdaysShort : 'нед_пон_вто_сря_чет_пет_съб'.split('_'),
        weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'D.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY H:mm',
            LLLL : 'dddd, D MMMM YYYY H:mm'
        },
        calendar : {
            sameDay : '[Днес в] LT',
            nextDay : '[Утре в] LT',
            nextWeek : 'dddd [в] LT',
            lastDay : '[Вчера в] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 6:
                        return '[В изминалата] dddd [в] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[В изминалия] dddd [в] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'след %s',
            past : 'преди %s',
            s : 'няколко секунди',
            ss : '%d секунди',
            m : 'минута',
            mm : '%d минути',
            h : 'час',
            hh : '%d часа',
            d : 'ден',
            dd : '%d дни',
            M : 'месец',
            MM : '%d месеца',
            y : 'година',
            yy : '%d години'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
        ordinal : function (number) {
            var lastDigit = number % 10,
                last2Digits = number % 100;
            if (number === 0) {
                return number + '-ев';
            } else if (last2Digits === 0) {
                return number + '-ен';
            } else if (last2Digits > 10 && last2Digits < 20) {
                return number + '-ти';
            } else if (lastDigit === 1) {
                return number + '-ви';
            } else if (lastDigit === 2) {
                return number + '-ри';
            } else if (lastDigit === 7 || lastDigit === 8) {
                return number + '-ми';
            } else {
                return number + '-ти';
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return bg;

})));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var bm = moment.defineLocale('bm', {
        months : 'Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_Mɛkalo_Zuwɛnkalo_Zuluyekalo_Utikalo_Sɛtanburukalo_ɔkutɔburukalo_Nowanburukalo_Desanburukalo'.split('_'),
        monthsShort : 'Zan_Few_Mar_Awi_Mɛ_Zuw_Zul_Uti_Sɛt_ɔku_Now_Des'.split('_'),
        weekdays : 'Kari_Ntɛnɛn_Tarata_Araba_Alamisa_Juma_Sibiri'.split('_'),
        weekdaysShort : 'Kar_Ntɛ_Tar_Ara_Ala_Jum_Sib'.split('_'),
        weekdaysMin : 'Ka_Nt_Ta_Ar_Al_Ju_Si'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'MMMM [tile] D [san] YYYY',
            LLL : 'MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm',
            LLLL : 'dddd MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm'
        },
        calendar : {
            sameDay : '[Bi lɛrɛ] LT',
            nextDay : '[Sini lɛrɛ] LT',
            nextWeek : 'dddd [don lɛrɛ] LT',
            lastDay : '[Kunu lɛrɛ] LT',
            lastWeek : 'dddd [tɛmɛnen lɛrɛ] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s kɔnɔ',
            past : 'a bɛ %s bɔ',
            s : 'sanga dama dama',
            ss : 'sekondi %d',
            m : 'miniti kelen',
            mm : 'miniti %d',
            h : 'lɛrɛ kelen',
            hh : 'lɛrɛ %d',
            d : 'tile kelen',
            dd : 'tile %d',
            M : 'kalo kelen',
            MM : 'kalo %d',
            y : 'san kelen',
            yy : 'san %d'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return bm;

})));


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var symbolMap = {
        '1': '১',
        '2': '২',
        '3': '৩',
        '4': '৪',
        '5': '৫',
        '6': '৬',
        '7': '৭',
        '8': '৮',
        '9': '৯',
        '0': '০'
    },
    numberMap = {
        '১': '1',
        '২': '2',
        '৩': '3',
        '৪': '4',
        '৫': '5',
        '৬': '6',
        '৭': '7',
        '৮': '8',
        '৯': '9',
        '০': '0'
    };

    var bn = moment.defineLocale('bn', {
        months : 'জানুয়ারী_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split('_'),
        monthsShort : 'জানু_ফেব_মার্চ_এপ্র_মে_জুন_জুল_আগ_সেপ্ট_অক্টো_নভে_ডিসে'.split('_'),
        weekdays : 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার'.split('_'),
        weekdaysShort : 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি'.split('_'),
        weekdaysMin : 'রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি'.split('_'),
        longDateFormat : {
            LT : 'A h:mm সময়',
            LTS : 'A h:mm:ss সময়',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm সময়',
            LLLL : 'dddd, D MMMM YYYY, A h:mm সময়'
        },
        calendar : {
            sameDay : '[আজ] LT',
            nextDay : '[আগামীকাল] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[গতকাল] LT',
            lastWeek : '[গত] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s পরে',
            past : '%s আগে',
            s : 'কয়েক সেকেন্ড',
            ss : '%d সেকেন্ড',
            m : 'এক মিনিট',
            mm : '%d মিনিট',
            h : 'এক ঘন্টা',
            hh : '%d ঘন্টা',
            d : 'এক দিন',
            dd : '%d দিন',
            M : 'এক মাস',
            MM : '%d মাস',
            y : 'এক বছর',
            yy : '%d বছর'
        },
        preparse: function (string) {
            return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if ((meridiem === 'রাত' && hour >= 4) ||
                    (meridiem === 'দুপুর' && hour < 5) ||
                    meridiem === 'বিকাল') {
                return hour + 12;
            } else {
                return hour;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'রাত';
            } else if (hour < 10) {
                return 'সকাল';
            } else if (hour < 17) {
                return 'দুপুর';
            } else if (hour < 20) {
                return 'বিকাল';
            } else {
                return 'রাত';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    return bn;

})));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var symbolMap = {
        '1': '༡',
        '2': '༢',
        '3': '༣',
        '4': '༤',
        '5': '༥',
        '6': '༦',
        '7': '༧',
        '8': '༨',
        '9': '༩',
        '0': '༠'
    },
    numberMap = {
        '༡': '1',
        '༢': '2',
        '༣': '3',
        '༤': '4',
        '༥': '5',
        '༦': '6',
        '༧': '7',
        '༨': '8',
        '༩': '9',
        '༠': '0'
    };

    var bo = moment.defineLocale('bo', {
        months : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
        monthsShort : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
        weekdays : 'གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་'.split('_'),
        weekdaysShort : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
        weekdaysMin : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
        longDateFormat : {
            LT : 'A h:mm',
            LTS : 'A h:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm',
            LLLL : 'dddd, D MMMM YYYY, A h:mm'
        },
        calendar : {
            sameDay : '[དི་རིང] LT',
            nextDay : '[སང་ཉིན] LT',
            nextWeek : '[བདུན་ཕྲག་རྗེས་མ], LT',
            lastDay : '[ཁ་སང] LT',
            lastWeek : '[བདུན་ཕྲག་མཐའ་མ] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s ལ་',
            past : '%s སྔན་ལ',
            s : 'ལམ་སང',
            ss : '%d སྐར་ཆ།',
            m : 'སྐར་མ་གཅིག',
            mm : '%d སྐར་མ',
            h : 'ཆུ་ཚོད་གཅིག',
            hh : '%d ཆུ་ཚོད',
            d : 'ཉིན་གཅིག',
            dd : '%d ཉིན་',
            M : 'ཟླ་བ་གཅིག',
            MM : '%d ཟླ་བ',
            y : 'ལོ་གཅིག',
            yy : '%d ལོ'
        },
        preparse: function (string) {
            return string.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if ((meridiem === 'མཚན་མོ' && hour >= 4) ||
                    (meridiem === 'ཉིན་གུང' && hour < 5) ||
                    meridiem === 'དགོང་དག') {
                return hour + 12;
            } else {
                return hour;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'མཚན་མོ';
            } else if (hour < 10) {
                return 'ཞོགས་ཀས';
            } else if (hour < 17) {
                return 'ཉིན་གུང';
            } else if (hour < 20) {
                return 'དགོང་དག';
            } else {
                return 'མཚན་མོ';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    return bo;

})));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    function relativeTimeWithMutation(number, withoutSuffix, key) {
        var format = {
            'mm': 'munutenn',
            'MM': 'miz',
            'dd': 'devezh'
        };
        return number + ' ' + mutation(format[key], number);
    }
    function specialMutationForYears(number) {
        switch (lastNumber(number)) {
            case 1:
            case 3:
            case 4:
            case 5:
            case 9:
                return number + ' bloaz';
            default:
                return number + ' vloaz';
        }
    }
    function lastNumber(number) {
        if (number > 9) {
            return lastNumber(number % 10);
        }
        return number;
    }
    function mutation(text, number) {
        if (number === 2) {
            return softMutation(text);
        }
        return text;
    }
    function softMutation(text) {
        var mutationTable = {
            'm': 'v',
            'b': 'v',
            'd': 'z'
        };
        if (mutationTable[text.charAt(0)] === undefined) {
            return text;
        }
        return mutationTable[text.charAt(0)] + text.substring(1);
    }

    var br = moment.defineLocale('br', {
        months : 'Genver_C\'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
        monthsShort : 'Gen_C\'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
        weekdays : 'Sul_Lun_Meurzh_Merc\'her_Yaou_Gwener_Sadorn'.split('_'),
        weekdaysShort : 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
        weekdaysMin : 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'h[e]mm A',
            LTS : 'h[e]mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D [a viz] MMMM YYYY',
            LLL : 'D [a viz] MMMM YYYY h[e]mm A',
            LLLL : 'dddd, D [a viz] MMMM YYYY h[e]mm A'
        },
        calendar : {
            sameDay : '[Hiziv da] LT',
            nextDay : '[Warc\'hoazh da] LT',
            nextWeek : 'dddd [da] LT',
            lastDay : '[Dec\'h da] LT',
            lastWeek : 'dddd [paset da] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'a-benn %s',
            past : '%s \'zo',
            s : 'un nebeud segondennoù',
            ss : '%d eilenn',
            m : 'ur vunutenn',
            mm : relativeTimeWithMutation,
            h : 'un eur',
            hh : '%d eur',
            d : 'un devezh',
            dd : relativeTimeWithMutation,
            M : 'ur miz',
            MM : relativeTimeWithMutation,
            y : 'ur bloaz',
            yy : specialMutationForYears
        },
        dayOfMonthOrdinalParse: /\d{1,2}(añ|vet)/,
        ordinal : function (number) {
            var output = (number === 1) ? 'añ' : 'vet';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return br;

})));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    function translate(number, withoutSuffix, key) {
        var result = number + ' ';
        switch (key) {
            case 'ss':
                if (number === 1) {
                    result += 'sekunda';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'sekunde';
                } else {
                    result += 'sekundi';
                }
                return result;
            case 'm':
                return withoutSuffix ? 'jedna minuta' : 'jedne minute';
            case 'mm':
                if (number === 1) {
                    result += 'minuta';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'minute';
                } else {
                    result += 'minuta';
                }
                return result;
            case 'h':
                return withoutSuffix ? 'jedan sat' : 'jednog sata';
            case 'hh':
                if (number === 1) {
                    result += 'sat';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'sata';
                } else {
                    result += 'sati';
                }
                return result;
            case 'dd':
                if (number === 1) {
                    result += 'dan';
                } else {
                    result += 'dana';
                }
                return result;
            case 'MM':
                if (number === 1) {
                    result += 'mjesec';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'mjeseca';
                } else {
                    result += 'mjeseci';
                }
                return result;
            case 'yy':
                if (number === 1) {
                    result += 'godina';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'godine';
                } else {
                    result += 'godina';
                }
                return result;
        }
    }

    var bs = moment.defineLocale('bs', {
        months : 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
        monthsShort : 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
        weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
        weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd, D. MMMM YYYY H:mm'
        },
        calendar : {
            sameDay  : '[danas u] LT',
            nextDay  : '[sutra u] LT',
            nextWeek : function () {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedjelju] [u] LT';
                    case 3:
                        return '[u] [srijedu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay  : '[jučer u] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                        return '[prošlu] dddd [u] LT';
                    case 6:
                        return '[prošle] [subote] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[prošli] dddd [u] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'za %s',
            past   : 'prije %s',
            s      : 'par sekundi',
            ss     : translate,
            m      : translate,
            mm     : translate,
            h      : translate,
            hh     : translate,
            d      : 'dan',
            dd     : translate,
            M      : 'mjesec',
            MM     : translate,
            y      : 'godinu',
            yy     : translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return bs;

})));


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var ca = moment.defineLocale('ca', {
        months : {
            standalone: 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
            format: 'de gener_de febrer_de març_d\'abril_de maig_de juny_de juliol_d\'agost_de setembre_d\'octubre_de novembre_de desembre'.split('_'),
            isFormat: /D[oD]?(\s)+MMMM/
        },
        monthsShort : 'gen._febr._març_abr._maig_juny_jul._ag._set._oct._nov._des.'.split('_'),
        monthsParseExact : true,
        weekdays : 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
        weekdaysShort : 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
        weekdaysMin : 'dg_dl_dt_dc_dj_dv_ds'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM [de] YYYY',
            ll : 'D MMM YYYY',
            LLL : 'D MMMM [de] YYYY [a les] H:mm',
            lll : 'D MMM YYYY, H:mm',
            LLLL : 'dddd D MMMM [de] YYYY [a les] H:mm',
            llll : 'ddd D MMM YYYY, H:mm'
        },
        calendar : {
            sameDay : function () {
                return '[avui a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            nextDay : function () {
                return '[demà a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            lastDay : function () {
                return '[ahir a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            lastWeek : function () {
                return '[el] dddd [passat a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'd\'aquí %s',
            past : 'fa %s',
            s : 'uns segons',
            ss : '%d segons',
            m : 'un minut',
            mm : '%d minuts',
            h : 'una hora',
            hh : '%d hores',
            d : 'un dia',
            dd : '%d dies',
            M : 'un mes',
            MM : '%d mesos',
            y : 'un any',
            yy : '%d anys'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|è|a)/,
        ordinal : function (number, period) {
            var output = (number === 1) ? 'r' :
                (number === 2) ? 'n' :
                (number === 3) ? 'r' :
                (number === 4) ? 't' : 'è';
            if (period === 'w' || period === 'W') {
                output = 'a';
            }
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return ca;

})));


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var months = 'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split('_'),
        monthsShort = 'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'.split('_');
    function plural(n) {
        return (n > 1) && (n < 5) && (~~(n / 10) !== 1);
    }
    function translate(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':  // a few seconds / in a few seconds / a few seconds ago
                return (withoutSuffix || isFuture) ? 'pár sekund' : 'pár sekundami';
            case 'ss': // 9 seconds / in 9 seconds / 9 seconds ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'sekundy' : 'sekund');
                } else {
                    return result + 'sekundami';
                }
                break;
            case 'm':  // a minute / in a minute / a minute ago
                return withoutSuffix ? 'minuta' : (isFuture ? 'minutu' : 'minutou');
            case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'minuty' : 'minut');
                } else {
                    return result + 'minutami';
                }
                break;
            case 'h':  // an hour / in an hour / an hour ago
                return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
            case 'hh': // 9 hours / in 9 hours / 9 hours ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'hodiny' : 'hodin');
                } else {
                    return result + 'hodinami';
                }
                break;
            case 'd':  // a day / in a day / a day ago
                return (withoutSuffix || isFuture) ? 'den' : 'dnem';
            case 'dd': // 9 days / in 9 days / 9 days ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'dny' : 'dní');
                } else {
                    return result + 'dny';
                }
                break;
            case 'M':  // a month / in a month / a month ago
                return (withoutSuffix || isFuture) ? 'měsíc' : 'měsícem';
            case 'MM': // 9 months / in 9 months / 9 months ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'měsíce' : 'měsíců');
                } else {
                    return result + 'měsíci';
                }
                break;
            case 'y':  // a year / in a year / a year ago
                return (withoutSuffix || isFuture) ? 'rok' : 'rokem';
            case 'yy': // 9 years / in 9 years / 9 years ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'roky' : 'let');
                } else {
                    return result + 'lety';
                }
                break;
        }
    }

    var cs = moment.defineLocale('cs', {
        months : months,
        monthsShort : monthsShort,
        monthsParse : (function (months, monthsShort) {
            var i, _monthsParse = [];
            for (i = 0; i < 12; i++) {
                // use custom parser to solve problem with July (červenec)
                _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
            }
            return _monthsParse;
        }(months, monthsShort)),
        shortMonthsParse : (function (monthsShort) {
            var i, _shortMonthsParse = [];
            for (i = 0; i < 12; i++) {
                _shortMonthsParse[i] = new RegExp('^' + monthsShort[i] + '$', 'i');
            }
            return _shortMonthsParse;
        }(monthsShort)),
        longMonthsParse : (function (months) {
            var i, _longMonthsParse = [];
            for (i = 0; i < 12; i++) {
                _longMonthsParse[i] = new RegExp('^' + months[i] + '$', 'i');
            }
            return _longMonthsParse;
        }(months)),
        weekdays : 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
        weekdaysShort : 'ne_po_út_st_čt_pá_so'.split('_'),
        weekdaysMin : 'ne_po_út_st_čt_pá_so'.split('_'),
        longDateFormat : {
            LT: 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd D. MMMM YYYY H:mm',
            l : 'D. M. YYYY'
        },
        calendar : {
            sameDay: '[dnes v] LT',
            nextDay: '[zítra v] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[v neděli v] LT';
                    case 1:
                    case 2:
                        return '[v] dddd [v] LT';
                    case 3:
                        return '[ve středu v] LT';
                    case 4:
                        return '[ve čtvrtek v] LT';
                    case 5:
                        return '[v pátek v] LT';
                    case 6:
                        return '[v sobotu v] LT';
                }
            },
            lastDay: '[včera v] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[minulou neděli v] LT';
                    case 1:
                    case 2:
                        return '[minulé] dddd [v] LT';
                    case 3:
                        return '[minulou středu v] LT';
                    case 4:
                    case 5:
                        return '[minulý] dddd [v] LT';
                    case 6:
                        return '[minulou sobotu v] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'za %s',
            past : 'před %s',
            s : translate,
            ss : translate,
            m : translate,
            mm : translate,
            h : translate,
            hh : translate,
            d : translate,
            dd : translate,
            M : translate,
            MM : translate,
            y : translate,
            yy : translate
        },
        dayOfMonthOrdinalParse : /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return cs;

})));


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var cv = moment.defineLocale('cv', {
        months : 'кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав'.split('_'),
        monthsShort : 'кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш'.split('_'),
        weekdays : 'вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун'.split('_'),
        weekdaysShort : 'выр_тун_ытл_юн_кӗҫ_эрн_шӑм'.split('_'),
        weekdaysMin : 'вр_тн_ыт_юн_кҫ_эр_шм'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD-MM-YYYY',
            LL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
            LLL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
            LLLL : 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm'
        },
        calendar : {
            sameDay: '[Паян] LT [сехетре]',
            nextDay: '[Ыран] LT [сехетре]',
            lastDay: '[Ӗнер] LT [сехетре]',
            nextWeek: '[Ҫитес] dddd LT [сехетре]',
            lastWeek: '[Иртнӗ] dddd LT [сехетре]',
            sameElse: 'L'
        },
        relativeTime : {
            future : function (output) {
                var affix = /сехет$/i.exec(output) ? 'рен' : /ҫул$/i.exec(output) ? 'тан' : 'ран';
                return output + affix;
            },
            past : '%s каялла',
            s : 'пӗр-ик ҫеккунт',
            ss : '%d ҫеккунт',
            m : 'пӗр минут',
            mm : '%d минут',
            h : 'пӗр сехет',
            hh : '%d сехет',
            d : 'пӗр кун',
            dd : '%d кун',
            M : 'пӗр уйӑх',
            MM : '%d уйӑх',
            y : 'пӗр ҫул',
            yy : '%d ҫул'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-мӗш/,
        ordinal : '%d-мӗш',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return cv;

})));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var cy = moment.defineLocale('cy', {
        months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
        monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
        weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
        weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
        weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
        weekdaysParseExact : true,
        // time formats are the same as en-gb
        longDateFormat: {
            LT: 'HH:mm',
            LTS : 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[Heddiw am] LT',
            nextDay: '[Yfory am] LT',
            nextWeek: 'dddd [am] LT',
            lastDay: '[Ddoe am] LT',
            lastWeek: 'dddd [diwethaf am] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'mewn %s',
            past: '%s yn ôl',
            s: 'ychydig eiliadau',
            ss: '%d eiliad',
            m: 'munud',
            mm: '%d munud',
            h: 'awr',
            hh: '%d awr',
            d: 'diwrnod',
            dd: '%d diwrnod',
            M: 'mis',
            MM: '%d mis',
            y: 'blwyddyn',
            yy: '%d flynedd'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
        // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
        ordinal: function (number) {
            var b = number,
                output = '',
                lookup = [
                    '', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 'fed', // 1af to 10fed
                    'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed' // 11eg to 20fed
                ];
            if (b > 20) {
                if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
                    output = 'fed'; // not 30ain, 70ain or 90ain
                } else {
                    output = 'ain';
                }
            } else if (b > 0) {
                output = lookup[b];
            }
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return cy;

})));


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var da = moment.defineLocale('da', {
        months : 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split('_'),
        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
        weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
        weekdaysShort : 'søn_man_tir_ons_tor_fre_lør'.split('_'),
        weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY HH:mm',
            LLLL : 'dddd [d.] D. MMMM YYYY [kl.] HH:mm'
        },
        calendar : {
            sameDay : '[i dag kl.] LT',
            nextDay : '[i morgen kl.] LT',
            nextWeek : 'på dddd [kl.] LT',
            lastDay : '[i går kl.] LT',
            lastWeek : '[i] dddd[s kl.] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'om %s',
            past : '%s siden',
            s : 'få sekunder',
            ss : '%d sekunder',
            m : 'et minut',
            mm : '%d minutter',
            h : 'en time',
            hh : '%d timer',
            d : 'en dag',
            dd : '%d dage',
            M : 'en måned',
            MM : '%d måneder',
            y : 'et år',
            yy : '%d år'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return da;

})));


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    var deAt = moment.defineLocale('de-at', {
        months : 'Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort : 'Jän._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
        monthsParseExact : true,
        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
        weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY HH:mm',
            LLLL : 'dddd, D. MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[heute um] LT [Uhr]',
            sameElse: 'L',
            nextDay: '[morgen um] LT [Uhr]',
            nextWeek: 'dddd [um] LT [Uhr]',
            lastDay: '[gestern um] LT [Uhr]',
            lastWeek: '[letzten] dddd [um] LT [Uhr]'
        },
        relativeTime : {
            future : 'in %s',
            past : 'vor %s',
            s : 'ein paar Sekunden',
            ss : '%d Sekunden',
            m : processRelativeTime,
            mm : '%d Minuten',
            h : processRelativeTime,
            hh : '%d Stunden',
            d : processRelativeTime,
            dd : processRelativeTime,
            M : processRelativeTime,
            MM : processRelativeTime,
            y : processRelativeTime,
            yy : processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return deAt;

})));


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    var deCh = moment.defineLocale('de-ch', {
        months : 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort : 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
        monthsParseExact : true,
        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
        weekdaysShort : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY HH:mm',
            LLLL : 'dddd, D. MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[heute um] LT [Uhr]',
            sameElse: 'L',
            nextDay: '[morgen um] LT [Uhr]',
            nextWeek: 'dddd [um] LT [Uhr]',
            lastDay: '[gestern um] LT [Uhr]',
            lastWeek: '[letzten] dddd [um] LT [Uhr]'
        },
        relativeTime : {
            future : 'in %s',
            past : 'vor %s',
            s : 'ein paar Sekunden',
            ss : '%d Sekunden',
            m : processRelativeTime,
            mm : '%d Minuten',
            h : processRelativeTime,
            hh : '%d Stunden',
            d : processRelativeTime,
            dd : processRelativeTime,
            M : processRelativeTime,
            MM : processRelativeTime,
            y : processRelativeTime,
            yy : processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return deCh;

})));


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eine Minute', 'einer Minute'],
            'h': ['eine Stunde', 'einer Stunde'],
            'd': ['ein Tag', 'einem Tag'],
            'dd': [number + ' Tage', number + ' Tagen'],
            'M': ['ein Monat', 'einem Monat'],
            'MM': [number + ' Monate', number + ' Monaten'],
            'y': ['ein Jahr', 'einem Jahr'],
            'yy': [number + ' Jahre', number + ' Jahren']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    var de = moment.defineLocale('de', {
        months : 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort : 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
        monthsParseExact : true,
        weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
        weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
        weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY HH:mm',
            LLLL : 'dddd, D. MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[heute um] LT [Uhr]',
            sameElse: 'L',
            nextDay: '[morgen um] LT [Uhr]',
            nextWeek: 'dddd [um] LT [Uhr]',
            lastDay: '[gestern um] LT [Uhr]',
            lastWeek: '[letzten] dddd [um] LT [Uhr]'
        },
        relativeTime : {
            future : 'in %s',
            past : 'vor %s',
            s : 'ein paar Sekunden',
            ss : '%d Sekunden',
            m : processRelativeTime,
            mm : '%d Minuten',
            h : processRelativeTime,
            hh : '%d Stunden',
            d : processRelativeTime,
            dd : processRelativeTime,
            M : processRelativeTime,
            MM : processRelativeTime,
            y : processRelativeTime,
            yy : processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return de;

})));


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var months = [
        'ޖެނުއަރީ',
        'ފެބްރުއަރީ',
        'މާރިޗު',
        'އޭޕްރީލު',
        'މޭ',
        'ޖޫން',
        'ޖުލައި',
        'އޯގަސްޓު',
        'ސެޕްޓެމްބަރު',
        'އޮކްޓޯބަރު',
        'ނޮވެމްބަރު',
        'ޑިސެމްބަރު'
    ], weekdays = [
        'އާދިއްތަ',
        'ހޯމަ',
        'އަންގާރަ',
        'ބުދަ',
        'ބުރާސްފަތި',
        'ހުކުރު',
        'ހޮނިހިރު'
    ];

    var dv = moment.defineLocale('dv', {
        months : months,
        monthsShort : months,
        weekdays : weekdays,
        weekdaysShort : weekdays,
        weekdaysMin : 'އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި'.split('_'),
        longDateFormat : {

            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'D/M/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /މކ|މފ/,
        isPM : function (input) {
            return 'މފ' === input;
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'މކ';
            } else {
                return 'މފ';
            }
        },
        calendar : {
            sameDay : '[މިއަދު] LT',
            nextDay : '[މާދަމާ] LT',
            nextWeek : 'dddd LT',
            lastDay : '[އިއްޔެ] LT',
            lastWeek : '[ފާއިތުވި] dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'ތެރޭގައި %s',
            past : 'ކުރިން %s',
            s : 'ސިކުންތުކޮޅެއް',
            ss : 'd% ސިކުންތު',
            m : 'މިނިޓެއް',
            mm : 'މިނިޓު %d',
            h : 'ގަޑިއިރެއް',
            hh : 'ގަޑިއިރު %d',
            d : 'ދުވަހެއް',
            dd : 'ދުވަސް %d',
            M : 'މަހެއް',
            MM : 'މަސް %d',
            y : 'އަހަރެއް',
            yy : 'އަހަރު %d'
        },
        preparse: function (string) {
            return string.replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/,/g, '،');
        },
        week : {
            dow : 7,  // Sunday is the first day of the week.
            doy : 12  // The week that contains Jan 12th is the first week of the year.
        }
    });

    return dv;

})));


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }


    var el = moment.defineLocale('el', {
        monthsNominativeEl : 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split('_'),
        monthsGenitiveEl : 'Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου'.split('_'),
        months : function (momentToFormat, format) {
            if (!momentToFormat) {
                return this._monthsNominativeEl;
            } else if (typeof format === 'string' && /D/.test(format.substring(0, format.indexOf('MMMM')))) { // if there is a day number before 'MMMM'
                return this._monthsGenitiveEl[momentToFormat.month()];
            } else {
                return this._monthsNominativeEl[momentToFormat.month()];
            }
        },
        monthsShort : 'Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ'.split('_'),
        weekdays : 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
        weekdaysShort : 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
        weekdaysMin : 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'μμ' : 'ΜΜ';
            } else {
                return isLower ? 'πμ' : 'ΠΜ';
            }
        },
        isPM : function (input) {
            return ((input + '').toLowerCase()[0] === 'μ');
        },
        meridiemParse : /[ΠΜ]\.?Μ?\.?/i,
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendarEl : {
            sameDay : '[Σήμερα {}] LT',
            nextDay : '[Αύριο {}] LT',
            nextWeek : 'dddd [{}] LT',
            lastDay : '[Χθες {}] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 6:
                        return '[το προηγούμενο] dddd [{}] LT';
                    default:
                        return '[την προηγούμενη] dddd [{}] LT';
                }
            },
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendarEl[key],
                hours = mom && mom.hours();
            if (isFunction(output)) {
                output = output.apply(mom);
            }
            return output.replace('{}', (hours % 12 === 1 ? 'στη' : 'στις'));
        },
        relativeTime : {
            future : 'σε %s',
            past : '%s πριν',
            s : 'λίγα δευτερόλεπτα',
            ss : '%d δευτερόλεπτα',
            m : 'ένα λεπτό',
            mm : '%d λεπτά',
            h : 'μία ώρα',
            hh : '%d ώρες',
            d : 'μία μέρα',
            dd : '%d μέρες',
            M : 'ένας μήνας',
            MM : '%d μήνες',
            y : 'ένας χρόνος',
            yy : '%d χρόνια'
        },
        dayOfMonthOrdinalParse: /\d{1,2}η/,
        ordinal: '%dη',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4st is the first week of the year.
        }
    });

    return el;

})));


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var enAu = moment.defineLocale('en-au', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            ss : '%d seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return enAu;

})));


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var enCa = moment.defineLocale('en-ca', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'YYYY-MM-DD',
            LL : 'MMMM D, YYYY',
            LLL : 'MMMM D, YYYY h:mm A',
            LLLL : 'dddd, MMMM D, YYYY h:mm A'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            ss : '%d seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    return enCa;

})));


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var enGb = moment.defineLocale('en-gb', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            ss : '%d seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return enGb;

})));


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var enIe = moment.defineLocale('en-ie', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD-MM-YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            ss : '%d seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return enIe;

})));


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var enIl = moment.defineLocale('en-il', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    return enIl;

})));


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var enNz = moment.defineLocale('en-nz', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            ss : '%d seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return enNz;

})));


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var eo = moment.defineLocale('eo', {
        months : 'januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro'.split('_'),
        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec'.split('_'),
        weekdays : 'dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato'.split('_'),
        weekdaysShort : 'dim_lun_mard_merk_ĵaŭ_ven_sab'.split('_'),
        weekdaysMin : 'di_lu_ma_me_ĵa_ve_sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'D[-a de] MMMM, YYYY',
            LLL : 'D[-a de] MMMM, YYYY HH:mm',
            LLLL : 'dddd, [la] D[-a de] MMMM, YYYY HH:mm'
        },
        meridiemParse: /[ap]\.t\.m/i,
        isPM: function (input) {
            return input.charAt(0).toLowerCase() === 'p';
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'p.t.m.' : 'P.T.M.';
            } else {
                return isLower ? 'a.t.m.' : 'A.T.M.';
            }
        },
        calendar : {
            sameDay : '[Hodiaŭ je] LT',
            nextDay : '[Morgaŭ je] LT',
            nextWeek : 'dddd [je] LT',
            lastDay : '[Hieraŭ je] LT',
            lastWeek : '[pasinta] dddd [je] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'post %s',
            past : 'antaŭ %s',
            s : 'sekundoj',
            ss : '%d sekundoj',
            m : 'minuto',
            mm : '%d minutoj',
            h : 'horo',
            hh : '%d horoj',
            d : 'tago',//ne 'diurno', ĉar estas uzita por proksimumo
            dd : '%d tagoj',
            M : 'monato',
            MM : '%d monatoj',
            y : 'jaro',
            yy : '%d jaroj'
        },
        dayOfMonthOrdinalParse: /\d{1,2}a/,
        ordinal : '%da',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return eo;

})));


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
        monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

    var monthsParse = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
    var monthsRegex = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;

    var esDo = moment.defineLocale('es-do', {
        months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
        monthsShort : function (m, format) {
            if (!m) {
                return monthsShortDot;
            } else if (/-MMM-/.test(format)) {
                return monthsShort[m.month()];
            } else {
                return monthsShortDot[m.month()];
            }
        },
        monthsRegex: monthsRegex,
        monthsShortRegex: monthsRegex,
        monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
        monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
        monthsParse: monthsParse,
        longMonthsParse: monthsParse,
        shortMonthsParse: monthsParse,
        weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
        weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
        weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY h:mm A',
            LLLL : 'dddd, D [de] MMMM [de] YYYY h:mm A'
        },
        calendar : {
            sameDay : function () {
                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextDay : function () {
                return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastDay : function () {
                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastWeek : function () {
                return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'en %s',
            past : 'hace %s',
            s : 'unos segundos',
            ss : '%d segundos',
            m : 'un minuto',
            mm : '%d minutos',
            h : 'una hora',
            hh : '%d horas',
            d : 'un día',
            dd : '%d días',
            M : 'un mes',
            MM : '%d meses',
            y : 'un año',
            yy : '%d años'
        },
        dayOfMonthOrdinalParse : /\d{1,2}º/,
        ordinal : '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return esDo;

})));


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
        monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

    var esUs = moment.defineLocale('es-us', {
        months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
        monthsShort : function (m, format) {
            if (!m) {
                return monthsShortDot;
            } else if (/-MMM-/.test(format)) {
                return monthsShort[m.month()];
            } else {
                return monthsShortDot[m.month()];
            }
        },
        monthsParseExact : true,
        weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
        weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
        weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'MM/DD/YYYY',
            LL : 'MMMM [de] D [de] YYYY',
            LLL : 'MMMM [de] D [de] YYYY h:mm A',
            LLLL : 'dddd, MMMM [de] D [de] YYYY h:mm A'
        },
        calendar : {
            sameDay : function () {
                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextDay : function () {
                return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastDay : function () {
                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastWeek : function () {
                return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'en %s',
            past : 'hace %s',
            s : 'unos segundos',
            ss : '%d segundos',
            m : 'un minuto',
            mm : '%d minutos',
            h : 'una hora',
            hh : '%d horas',
            d : 'un día',
            dd : '%d días',
            M : 'un mes',
            MM : '%d meses',
            y : 'un año',
            yy : '%d años'
        },
        dayOfMonthOrdinalParse : /\d{1,2}º/,
        ordinal : '%dº',
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    return esUs;

})));


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
        monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

    var monthsParse = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
    var monthsRegex = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;

    var es = moment.defineLocale('es', {
        months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
        monthsShort : function (m, format) {
            if (!m) {
                return monthsShortDot;
            } else if (/-MMM-/.test(format)) {
                return monthsShort[m.month()];
            } else {
                return monthsShortDot[m.month()];
            }
        },
        monthsRegex : monthsRegex,
        monthsShortRegex : monthsRegex,
        monthsStrictRegex : /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
        monthsShortStrictRegex : /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
        monthsParse : monthsParse,
        longMonthsParse : monthsParse,
        shortMonthsParse : monthsParse,
        weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
        weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
        weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY H:mm',
            LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
        },
        calendar : {
            sameDay : function () {
                return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextDay : function () {
                return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastDay : function () {
                return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            lastWeek : function () {
                return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'en %s',
            past : 'hace %s',
            s : 'unos segundos',
            ss : '%d segundos',
            m : 'un minuto',
            mm : '%d minutos',
            h : 'una hora',
            hh : '%d horas',
            d : 'un día',
            dd : '%d días',
            M : 'un mes',
            MM : '%d meses',
            y : 'un año',
            yy : '%d años'
        },
        dayOfMonthOrdinalParse : /\d{1,2}º/,
        ordinal : '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return es;

})));


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            's' : ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
            'ss': [number + 'sekundi', number + 'sekundit'],
            'm' : ['ühe minuti', 'üks minut'],
            'mm': [number + ' minuti', number + ' minutit'],
            'h' : ['ühe tunni', 'tund aega', 'üks tund'],
            'hh': [number + ' tunni', number + ' tundi'],
            'd' : ['ühe päeva', 'üks päev'],
            'M' : ['kuu aja', 'kuu aega', 'üks kuu'],
            'MM': [number + ' kuu', number + ' kuud'],
            'y' : ['ühe aasta', 'aasta', 'üks aasta'],
            'yy': [number + ' aasta', number + ' aastat']
        };
        if (withoutSuffix) {
            return format[key][2] ? format[key][2] : format[key][1];
        }
        return isFuture ? format[key][0] : format[key][1];
    }

    var et = moment.defineLocale('et', {
        months        : 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
        monthsShort   : 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
        weekdays      : 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
        weekdaysShort : 'P_E_T_K_N_R_L'.split('_'),
        weekdaysMin   : 'P_E_T_K_N_R_L'.split('_'),
        longDateFormat : {
            LT   : 'H:mm',
            LTS : 'H:mm:ss',
            L    : 'DD.MM.YYYY',
            LL   : 'D. MMMM YYYY',
            LLL  : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd, D. MMMM YYYY H:mm'
        },
        calendar : {
            sameDay  : '[Täna,] LT',
            nextDay  : '[Homme,] LT',
            nextWeek : '[Järgmine] dddd LT',
            lastDay  : '[Eile,] LT',
            lastWeek : '[Eelmine] dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s pärast',
            past   : '%s tagasi',
            s      : processRelativeTime,
            ss     : processRelativeTime,
            m      : processRelativeTime,
            mm     : processRelativeTime,
            h      : processRelativeTime,
            hh     : processRelativeTime,
            d      : processRelativeTime,
            dd     : '%d päeva',
            M      : processRelativeTime,
            MM     : processRelativeTime,
            y      : processRelativeTime,
            yy     : processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return et;

})));


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var eu = moment.defineLocale('eu', {
        months : 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
        monthsShort : 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
        monthsParseExact : true,
        weekdays : 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
        weekdaysShort : 'ig._al._ar._az._og._ol._lr.'.split('_'),
        weekdaysMin : 'ig_al_ar_az_og_ol_lr'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'YYYY[ko] MMMM[ren] D[a]',
            LLL : 'YYYY[ko] MMMM[ren] D[a] HH:mm',
            LLLL : 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
            l : 'YYYY-M-D',
            ll : 'YYYY[ko] MMM D[a]',
            lll : 'YYYY[ko] MMM D[a] HH:mm',
            llll : 'ddd, YYYY[ko] MMM D[a] HH:mm'
        },
        calendar : {
            sameDay : '[gaur] LT[etan]',
            nextDay : '[bihar] LT[etan]',
            nextWeek : 'dddd LT[etan]',
            lastDay : '[atzo] LT[etan]',
            lastWeek : '[aurreko] dddd LT[etan]',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s barru',
            past : 'duela %s',
            s : 'segundo batzuk',
            ss : '%d segundo',
            m : 'minutu bat',
            mm : '%d minutu',
            h : 'ordu bat',
            hh : '%d ordu',
            d : 'egun bat',
            dd : '%d egun',
            M : 'hilabete bat',
            MM : '%d hilabete',
            y : 'urte bat',
            yy : '%d urte'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return eu;

})));


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var symbolMap = {
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹',
        '0': '۰'
    }, numberMap = {
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
        '۰': '0'
    };

    var fa = moment.defineLocale('fa', {
        months : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
        monthsShort : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
        weekdays : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
        weekdaysShort : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
        weekdaysMin : 'ی_د_س_چ_پ_ج_ش'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        meridiemParse: /قبل از ظهر|بعد از ظهر/,
        isPM: function (input) {
            return /بعد از ظهر/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'قبل از ظهر';
            } else {
                return 'بعد از ظهر';
            }
        },
        calendar : {
            sameDay : '[امروز ساعت] LT',
            nextDay : '[فردا ساعت] LT',
            nextWeek : 'dddd [ساعت] LT',
            lastDay : '[دیروز ساعت] LT',
            lastWeek : 'dddd [پیش] [ساعت] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'در %s',
            past : '%s پیش',
            s : 'چند ثانیه',
            ss : 'ثانیه d%',
            m : 'یک دقیقه',
            mm : '%d دقیقه',
            h : 'یک ساعت',
            hh : '%d ساعت',
            d : 'یک روز',
            dd : '%d روز',
            M : 'یک ماه',
            MM : '%d ماه',
            y : 'یک سال',
            yy : '%d سال'
        },
        preparse: function (string) {
            return string.replace(/[۰-۹]/g, function (match) {
                return numberMap[match];
            }).replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            }).replace(/,/g, '،');
        },
        dayOfMonthOrdinalParse: /\d{1,2}م/,
        ordinal : '%dم',
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12 // The week that contains Jan 12th is the first week of the year.
        }
    });

    return fa;

})));


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var numbersPast = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' '),
        numbersFuture = [
            'nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden',
            numbersPast[7], numbersPast[8], numbersPast[9]
        ];
    function translate(number, withoutSuffix, key, isFuture) {
        var result = '';
        switch (key) {
            case 's':
                return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
            case 'ss':
                return isFuture ? 'sekunnin' : 'sekuntia';
            case 'm':
                return isFuture ? 'minuutin' : 'minuutti';
            case 'mm':
                result = isFuture ? 'minuutin' : 'minuuttia';
                break;
            case 'h':
                return isFuture ? 'tunnin' : 'tunti';
            case 'hh':
                result = isFuture ? 'tunnin' : 'tuntia';
                break;
            case 'd':
                return isFuture ? 'päivän' : 'päivä';
            case 'dd':
                result = isFuture ? 'päivän' : 'päivää';
                break;
            case 'M':
                return isFuture ? 'kuukauden' : 'kuukausi';
            case 'MM':
                result = isFuture ? 'kuukauden' : 'kuukautta';
                break;
            case 'y':
                return isFuture ? 'vuoden' : 'vuosi';
            case 'yy':
                result = isFuture ? 'vuoden' : 'vuotta';
                break;
        }
        result = verbalNumber(number, isFuture) + ' ' + result;
        return result;
    }
    function verbalNumber(number, isFuture) {
        return number < 10 ? (isFuture ? numbersFuture[number] : numbersPast[number]) : number;
    }

    var fi = moment.defineLocale('fi', {
        months : 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
        monthsShort : 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
        weekdays : 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
        weekdaysShort : 'su_ma_ti_ke_to_pe_la'.split('_'),
        weekdaysMin : 'su_ma_ti_ke_to_pe_la'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD.MM.YYYY',
            LL : 'Do MMMM[ta] YYYY',
            LLL : 'Do MMMM[ta] YYYY, [klo] HH.mm',
            LLLL : 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
            l : 'D.M.YYYY',
            ll : 'Do MMM YYYY',
            lll : 'Do MMM YYYY, [klo] HH.mm',
            llll : 'ddd, Do MMM YYYY, [klo] HH.mm'
        },
        calendar : {
            sameDay : '[tänään] [klo] LT',
            nextDay : '[huomenna] [klo] LT',
            nextWeek : 'dddd [klo] LT',
            lastDay : '[eilen] [klo] LT',
            lastWeek : '[viime] dddd[na] [klo] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s päästä',
            past : '%s sitten',
            s : translate,
            ss : translate,
            m : translate,
            mm : translate,
            h : translate,
            hh : translate,
            d : translate,
            dd : translate,
            M : translate,
            MM : translate,
            y : translate,
            yy : translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return fi;

})));


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var fo = moment.defineLocale('fo', {
        months : 'januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
        monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
        weekdays : 'sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur'.split('_'),
        weekdaysShort : 'sun_mán_týs_mik_hós_frí_ley'.split('_'),
        weekdaysMin : 'su_má_tý_mi_hó_fr_le'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D. MMMM, YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Í dag kl.] LT',
            nextDay : '[Í morgin kl.] LT',
            nextWeek : 'dddd [kl.] LT',
            lastDay : '[Í gjár kl.] LT',
            lastWeek : '[síðstu] dddd [kl] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'um %s',
            past : '%s síðani',
            s : 'fá sekund',
            ss : '%d sekundir',
            m : 'ein minutt',
            mm : '%d minuttir',
            h : 'ein tími',
            hh : '%d tímar',
            d : 'ein dagur',
            dd : '%d dagar',
            M : 'ein mánaði',
            MM : '%d mánaðir',
            y : 'eitt ár',
            yy : '%d ár'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return fo;

})));


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var frCa = moment.defineLocale('fr-ca', {
        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        monthsParseExact : true,
        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin : 'di_lu_ma_me_je_ve_sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Aujourd’hui à] LT',
            nextDay : '[Demain à] LT',
            nextWeek : 'dddd [à] LT',
            lastDay : '[Hier à] LT',
            lastWeek : 'dddd [dernier à] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'dans %s',
            past : 'il y a %s',
            s : 'quelques secondes',
            ss : '%d secondes',
            m : 'une minute',
            mm : '%d minutes',
            h : 'une heure',
            hh : '%d heures',
            d : 'un jour',
            dd : '%d jours',
            M : 'un mois',
            MM : '%d mois',
            y : 'un an',
            yy : '%d ans'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
        ordinal : function (number, period) {
            switch (period) {
                // Words with masculine grammatical gender: mois, trimestre, jour
                default:
                case 'M':
                case 'Q':
                case 'D':
                case 'DDD':
                case 'd':
                    return number + (number === 1 ? 'er' : 'e');

                // Words with feminine grammatical gender: semaine
                case 'w':
                case 'W':
                    return number + (number === 1 ? 're' : 'e');
            }
        }
    });

    return frCa;

})));


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var frCh = moment.defineLocale('fr-ch', {
        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        monthsParseExact : true,
        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin : 'di_lu_ma_me_je_ve_sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Aujourd’hui à] LT',
            nextDay : '[Demain à] LT',
            nextWeek : 'dddd [à] LT',
            lastDay : '[Hier à] LT',
            lastWeek : 'dddd [dernier à] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'dans %s',
            past : 'il y a %s',
            s : 'quelques secondes',
            ss : '%d secondes',
            m : 'une minute',
            mm : '%d minutes',
            h : 'une heure',
            hh : '%d heures',
            d : 'un jour',
            dd : '%d jours',
            M : 'un mois',
            MM : '%d mois',
            y : 'un an',
            yy : '%d ans'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
        ordinal : function (number, period) {
            switch (period) {
                // Words with masculine grammatical gender: mois, trimestre, jour
                default:
                case 'M':
                case 'Q':
                case 'D':
                case 'DDD':
                case 'd':
                    return number + (number === 1 ? 'er' : 'e');

                // Words with feminine grammatical gender: semaine
                case 'w':
                case 'W':
                    return number + (number === 1 ? 're' : 'e');
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return frCh;

})));


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var fr = moment.defineLocale('fr', {
        months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
        monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
        monthsParseExact : true,
        weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin : 'di_lu_ma_me_je_ve_sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Aujourd’hui à] LT',
            nextDay : '[Demain à] LT',
            nextWeek : 'dddd [à] LT',
            lastDay : '[Hier à] LT',
            lastWeek : 'dddd [dernier à] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'dans %s',
            past : 'il y a %s',
            s : 'quelques secondes',
            ss : '%d secondes',
            m : 'une minute',
            mm : '%d minutes',
            h : 'une heure',
            hh : '%d heures',
            d : 'un jour',
            dd : '%d jours',
            M : 'un mois',
            MM : '%d mois',
            y : 'un an',
            yy : '%d ans'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
        ordinal : function (number, period) {
            switch (period) {
                // TODO: Return 'e' when day of month > 1. Move this case inside
                // block for masculine words below.
                // See https://github.com/moment/moment/issues/3375
                case 'D':
                    return number + (number === 1 ? 'er' : '');

                // Words with masculine grammatical gender: mois, trimestre, jour
                default:
                case 'M':
                case 'Q':
                case 'DDD':
                case 'd':
                    return number + (number === 1 ? 'er' : 'e');

                // Words with feminine grammatical gender: semaine
                case 'w':
                case 'W':
                    return number + (number === 1 ? 're' : 'e');
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return fr;

})));


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var monthsShortWithDots = 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_'),
        monthsShortWithoutDots = 'jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_');

    var fy = moment.defineLocale('fy', {
        months : 'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split('_'),
        monthsShort : function (m, format) {
            if (!m) {
                return monthsShortWithDots;
            } else if (/-MMM-/.test(format)) {
                return monthsShortWithoutDots[m.month()];
            } else {
                return monthsShortWithDots[m.month()];
            }
        },
        monthsParseExact : true,
        weekdays : 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
        weekdaysShort : 'si._mo._ti._wo._to._fr._so.'.split('_'),
        weekdaysMin : 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD-MM-YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[hjoed om] LT',
            nextDay: '[moarn om] LT',
            nextWeek: 'dddd [om] LT',
            lastDay: '[juster om] LT',
            lastWeek: '[ôfrûne] dddd [om] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'oer %s',
            past : '%s lyn',
            s : 'in pear sekonden',
            ss : '%d sekonden',
            m : 'ien minút',
            mm : '%d minuten',
            h : 'ien oere',
            hh : '%d oeren',
            d : 'ien dei',
            dd : '%d dagen',
            M : 'ien moanne',
            MM : '%d moannen',
            y : 'ien jier',
            yy : '%d jierren'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal : function (number) {
            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return fy;

})));


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var months = [
        'Am Faoilleach', 'An Gearran', 'Am Màrt', 'An Giblean', 'An Cèitean', 'An t-Ògmhios', 'An t-Iuchar', 'An Lùnastal', 'An t-Sultain', 'An Dàmhair', 'An t-Samhain', 'An Dùbhlachd'
    ];

    var monthsShort = ['Faoi', 'Gear', 'Màrt', 'Gibl', 'Cèit', 'Ògmh', 'Iuch', 'Lùn', 'Sult', 'Dàmh', 'Samh', 'Dùbh'];

    var weekdays = ['Didòmhnaich', 'Diluain', 'Dimàirt', 'Diciadain', 'Diardaoin', 'Dihaoine', 'Disathairne'];

    var weekdaysShort = ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'];

    var weekdaysMin = ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'];

    var gd = moment.defineLocale('gd', {
        months : months,
        monthsShort : monthsShort,
        monthsParseExact : true,
        weekdays : weekdays,
        weekdaysShort : weekdaysShort,
        weekdaysMin : weekdaysMin,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[An-diugh aig] LT',
            nextDay : '[A-màireach aig] LT',
            nextWeek : 'dddd [aig] LT',
            lastDay : '[An-dè aig] LT',
            lastWeek : 'dddd [seo chaidh] [aig] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'ann an %s',
            past : 'bho chionn %s',
            s : 'beagan diogan',
            ss : '%d diogan',
            m : 'mionaid',
            mm : '%d mionaidean',
            h : 'uair',
            hh : '%d uairean',
            d : 'latha',
            dd : '%d latha',
            M : 'mìos',
            MM : '%d mìosan',
            y : 'bliadhna',
            yy : '%d bliadhna'
        },
        dayOfMonthOrdinalParse : /\d{1,2}(d|na|mh)/,
        ordinal : function (number) {
            var output = number === 1 ? 'd' : number % 10 === 2 ? 'na' : 'mh';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return gd;

})));


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var gl = moment.defineLocale('gl', {
        months : 'xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro'.split('_'),
        monthsShort : 'xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays : 'domingo_luns_martes_mércores_xoves_venres_sábado'.split('_'),
        weekdaysShort : 'dom._lun._mar._mér._xov._ven._sáb.'.split('_'),
        weekdaysMin : 'do_lu_ma_mé_xo_ve_sá'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY H:mm',
            LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
        },
        calendar : {
            sameDay : function () {
                return '[hoxe ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
            },
            nextDay : function () {
                return '[mañá ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
            },
            nextWeek : function () {
                return 'dddd [' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
            },
            lastDay : function () {
                return '[onte ' + ((this.hours() !== 1) ? 'á' : 'a') + '] LT';
            },
            lastWeek : function () {
                return '[o] dddd [pasado ' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : function (str) {
                if (str.indexOf('un') === 0) {
                    return 'n' + str;
                }
                return 'en ' + str;
            },
            past : 'hai %s',
            s : 'uns segundos',
            ss : '%d segundos',
            m : 'un minuto',
            mm : '%d minutos',
            h : 'unha hora',
            hh : '%d horas',
            d : 'un día',
            dd : '%d días',
            M : 'un mes',
            MM : '%d meses',
            y : 'un ano',
            yy : '%d anos'
        },
        dayOfMonthOrdinalParse : /\d{1,2}º/,
        ordinal : '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return gl;

})));


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            's': ['thodde secondanim', 'thodde second'],
            'ss': [number + ' secondanim', number + ' second'],
            'm': ['eka mintan', 'ek minute'],
            'mm': [number + ' mintanim', number + ' mintam'],
            'h': ['eka horan', 'ek hor'],
            'hh': [number + ' horanim', number + ' horam'],
            'd': ['eka disan', 'ek dis'],
            'dd': [number + ' disanim', number + ' dis'],
            'M': ['eka mhoinean', 'ek mhoino'],
            'MM': [number + ' mhoineanim', number + ' mhoine'],
            'y': ['eka vorsan', 'ek voros'],
            'yy': [number + ' vorsanim', number + ' vorsam']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }

    var gomLatn = moment.defineLocale('gom-latn', {
        months : 'Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr'.split('_'),
        monthsShort : 'Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.'.split('_'),
        monthsParseExact : true,
        weekdays : 'Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son\'var'.split('_'),
        weekdaysShort : 'Ait._Som._Mon._Bud._Bre._Suk._Son.'.split('_'),
        weekdaysMin : 'Ai_Sm_Mo_Bu_Br_Su_Sn'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'A h:mm [vazta]',
            LTS : 'A h:mm:ss [vazta]',
            L : 'DD-MM-YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY A h:mm [vazta]',
            LLLL : 'dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]',
            llll: 'ddd, D MMM YYYY, A h:mm [vazta]'
        },
        calendar : {
            sameDay: '[Aiz] LT',
            nextDay: '[Faleam] LT',
            nextWeek: '[Ieta to] dddd[,] LT',
            lastDay: '[Kal] LT',
            lastWeek: '[Fatlo] dddd[,] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : '%s',
            past : '%s adim',
            s : processRelativeTime,
            ss : processRelativeTime,
            m : processRelativeTime,
            mm : processRelativeTime,
            h : processRelativeTime,
            hh : processRelativeTime,
            d : processRelativeTime,
            dd : processRelativeTime,
            M : processRelativeTime,
            MM : processRelativeTime,
            y : processRelativeTime,
            yy : processRelativeTime
        },
        dayOfMonthOrdinalParse : /\d{1,2}(er)/,
        ordinal : function (number, period) {
            switch (period) {
                // the ordinal 'er' only applies to day of the month
                case 'D':
                    return number + 'er';
                default:
                case 'M':
                case 'Q':
                case 'DDD':
                case 'd':
                case 'w':
                case 'W':
                    return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        },
        meridiemParse: /rati|sokalli|donparam|sanje/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'rati') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'sokalli') {
                return hour;
            } else if (meridiem === 'donparam') {
                return hour > 12 ? hour : hour + 12;
            } else if (meridiem === 'sanje') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'rati';
            } else if (hour < 12) {
                return 'sokalli';
            } else if (hour < 16) {
                return 'donparam';
            } else if (hour < 20) {
                return 'sanje';
            } else {
                return 'rati';
            }
        }
    });

    return gomLatn;

})));


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var symbolMap = {
            '1': '૧',
            '2': '૨',
            '3': '૩',
            '4': '૪',
            '5': '૫',
            '6': '૬',
            '7': '૭',
            '8': '૮',
            '9': '૯',
            '0': '૦'
        },
        numberMap = {
            '૧': '1',
            '૨': '2',
            '૩': '3',
            '૪': '4',
            '૫': '5',
            '૬': '6',
            '૭': '7',
            '૮': '8',
            '૯': '9',
            '૦': '0'
        };

    var gu = moment.defineLocale('gu', {
        months: 'જાન્યુઆરી_ફેબ્રુઆરી_માર્ચ_એપ્રિલ_મે_જૂન_જુલાઈ_ઑગસ્ટ_સપ્ટેમ્બર_ઑક્ટ્બર_નવેમ્બર_ડિસેમ્બર'.split('_'),
        monthsShort: 'જાન્યુ._ફેબ્રુ._માર્ચ_એપ્રિ._મે_જૂન_જુલા._ઑગ._સપ્ટે._ઑક્ટ્._નવે._ડિસે.'.split('_'),
        monthsParseExact: true,
        weekdays: 'રવિવાર_સોમવાર_મંગળવાર_બુધ્વાર_ગુરુવાર_શુક્રવાર_શનિવાર'.split('_'),
        weekdaysShort: 'રવિ_સોમ_મંગળ_બુધ્_ગુરુ_શુક્ર_શનિ'.split('_'),
        weekdaysMin: 'ર_સો_મં_બુ_ગુ_શુ_શ'.split('_'),
        longDateFormat: {
            LT: 'A h:mm વાગ્યે',
            LTS: 'A h:mm:ss વાગ્યે',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY, A h:mm વાગ્યે',
            LLLL: 'dddd, D MMMM YYYY, A h:mm વાગ્યે'
        },
        calendar: {
            sameDay: '[આજ] LT',
            nextDay: '[કાલે] LT',
            nextWeek: 'dddd, LT',
            lastDay: '[ગઇકાલે] LT',
            lastWeek: '[પાછલા] dddd, LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s મા',
            past: '%s પેહલા',
            s: 'અમુક પળો',
            ss: '%d સેકંડ',
            m: 'એક મિનિટ',
            mm: '%d મિનિટ',
            h: 'એક કલાક',
            hh: '%d કલાક',
            d: 'એક દિવસ',
            dd: '%d દિવસ',
            M: 'એક મહિનો',
            MM: '%d મહિનો',
            y: 'એક વર્ષ',
            yy: '%d વર્ષ'
        },
        preparse: function (string) {
            return string.replace(/[૧૨૩૪૫૬૭૮૯૦]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        // Gujarati notation for meridiems are quite fuzzy in practice. While there exists
        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Gujarati.
        meridiemParse: /રાત|બપોર|સવાર|સાંજ/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'રાત') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'સવાર') {
                return hour;
            } else if (meridiem === 'બપોર') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'સાંજ') {
                return hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 4) {
                return 'રાત';
            } else if (hour < 10) {
                return 'સવાર';
            } else if (hour < 17) {
                return 'બપોર';
            } else if (hour < 20) {
                return 'સાંજ';
            } else {
                return 'રાત';
            }
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6 // The week that contains Jan 6th is the first week of the year.
        }
    });

    return gu;

})));


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var he = moment.defineLocale('he', {
        months : 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
        monthsShort : 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
        weekdays : 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
        weekdaysShort : 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
        weekdaysMin : 'א_ב_ג_ד_ה_ו_ש'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [ב]MMMM YYYY',
            LLL : 'D [ב]MMMM YYYY HH:mm',
            LLLL : 'dddd, D [ב]MMMM YYYY HH:mm',
            l : 'D/M/YYYY',
            ll : 'D MMM YYYY',
            lll : 'D MMM YYYY HH:mm',
            llll : 'ddd, D MMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[היום ב־]LT',
            nextDay : '[מחר ב־]LT',
            nextWeek : 'dddd [בשעה] LT',
            lastDay : '[אתמול ב־]LT',
            lastWeek : '[ביום] dddd [האחרון בשעה] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'בעוד %s',
            past : 'לפני %s',
            s : 'מספר שניות',
            ss : '%d שניות',
            m : 'דקה',
            mm : '%d דקות',
            h : 'שעה',
            hh : function (number) {
                if (number === 2) {
                    return 'שעתיים';
                }
                return number + ' שעות';
            },
            d : 'יום',
            dd : function (number) {
                if (number === 2) {
                    return 'יומיים';
                }
                return number + ' ימים';
            },
            M : 'חודש',
            MM : function (number) {
                if (number === 2) {
                    return 'חודשיים';
                }
                return number + ' חודשים';
            },
            y : 'שנה',
            yy : function (number) {
                if (number === 2) {
                    return 'שנתיים';
                } else if (number % 10 === 0 && number !== 10) {
                    return number + ' שנה';
                }
                return number + ' שנים';
            }
        },
        meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
        isPM : function (input) {
            return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 5) {
                return 'לפנות בוקר';
            } else if (hour < 10) {
                return 'בבוקר';
            } else if (hour < 12) {
                return isLower ? 'לפנה"צ' : 'לפני הצהריים';
            } else if (hour < 18) {
                return isLower ? 'אחה"צ' : 'אחרי הצהריים';
            } else {
                return 'בערב';
            }
        }
    });

    return he;

})));


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var symbolMap = {
        '1': '१',
        '2': '२',
        '3': '३',
        '4': '४',
        '5': '५',
        '6': '६',
        '7': '७',
        '8': '८',
        '9': '९',
        '0': '०'
    },
    numberMap = {
        '१': '1',
        '२': '2',
        '३': '3',
        '४': '4',
        '५': '5',
        '६': '6',
        '७': '7',
        '८': '8',
        '९': '9',
        '०': '0'
    };

    var hi = moment.defineLocale('hi', {
        months : 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
        monthsShort : 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
        monthsParseExact: true,
        weekdays : 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
        weekdaysShort : 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
        weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
        longDateFormat : {
            LT : 'A h:mm बजे',
            LTS : 'A h:mm:ss बजे',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm बजे',
            LLLL : 'dddd, D MMMM YYYY, A h:mm बजे'
        },
        calendar : {
            sameDay : '[आज] LT',
            nextDay : '[कल] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[कल] LT',
            lastWeek : '[पिछले] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s में',
            past : '%s पहले',
            s : 'कुछ ही क्षण',
            ss : '%d सेकंड',
            m : 'एक मिनट',
            mm : '%d मिनट',
            h : 'एक घंटा',
            hh : '%d घंटे',
            d : 'एक दिन',
            dd : '%d दिन',
            M : 'एक महीने',
            MM : '%d महीने',
            y : 'एक वर्ष',
            yy : '%d वर्ष'
        },
        preparse: function (string) {
            return string.replace(/[१२३४५६७८९०]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        // Hindi notation for meridiems are quite fuzzy in practice. While there exists
        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
        meridiemParse: /रात|सुबह|दोपहर|शाम/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'रात') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'सुबह') {
                return hour;
            } else if (meridiem === 'दोपहर') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'शाम') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'रात';
            } else if (hour < 10) {
                return 'सुबह';
            } else if (hour < 17) {
                return 'दोपहर';
            } else if (hour < 20) {
                return 'शाम';
            } else {
                return 'रात';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    return hi;

})));


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    function translate(number, withoutSuffix, key) {
        var result = number + ' ';
        switch (key) {
            case 'ss':
                if (number === 1) {
                    result += 'sekunda';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'sekunde';
                } else {
                    result += 'sekundi';
                }
                return result;
            case 'm':
                return withoutSuffix ? 'jedna minuta' : 'jedne minute';
            case 'mm':
                if (number === 1) {
                    result += 'minuta';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'minute';
                } else {
                    result += 'minuta';
                }
                return result;
            case 'h':
                return withoutSuffix ? 'jedan sat' : 'jednog sata';
            case 'hh':
                if (number === 1) {
                    result += 'sat';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'sata';
                } else {
                    result += 'sati';
                }
                return result;
            case 'dd':
                if (number === 1) {
                    result += 'dan';
                } else {
                    result += 'dana';
                }
                return result;
            case 'MM':
                if (number === 1) {
                    result += 'mjesec';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'mjeseca';
                } else {
                    result += 'mjeseci';
                }
                return result;
            case 'yy':
                if (number === 1) {
                    result += 'godina';
                } else if (number === 2 || number === 3 || number === 4) {
                    result += 'godine';
                } else {
                    result += 'godina';
                }
                return result;
        }
    }

    var hr = moment.defineLocale('hr', {
        months : {
            format: 'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split('_'),
            standalone: 'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_')
        },
        monthsShort : 'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
        monthsParseExact: true,
        weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
        weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
        weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd, D. MMMM YYYY H:mm'
        },
        calendar : {
            sameDay  : '[danas u] LT',
            nextDay  : '[sutra u] LT',
            nextWeek : function () {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedjelju] [u] LT';
                    case 3:
                        return '[u] [srijedu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay  : '[jučer u] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                        return '[prošlu] dddd [u] LT';
                    case 6:
                        return '[prošle] [subote] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[prošli] dddd [u] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'za %s',
            past   : 'prije %s',
            s      : 'par sekundi',
            ss     : translate,
            m      : translate,
            mm     : translate,
            h      : translate,
            hh     : translate,
            d      : 'dan',
            dd     : translate,
            M      : 'mjesec',
            MM     : translate,
            y      : 'godinu',
            yy     : translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return hr;

})));


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');
    function translate(number, withoutSuffix, key, isFuture) {
        var num = number;
        switch (key) {
            case 's':
                return (isFuture || withoutSuffix) ? 'néhány másodperc' : 'néhány másodperce';
            case 'ss':
                return num + (isFuture || withoutSuffix) ? ' másodperc' : ' másodperce';
            case 'm':
                return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
            case 'mm':
                return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
            case 'h':
                return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');
            case 'hh':
                return num + (isFuture || withoutSuffix ? ' óra' : ' órája');
            case 'd':
                return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
            case 'dd':
                return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
            case 'M':
                return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
            case 'MM':
                return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
            case 'y':
                return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');
            case 'yy':
                return num + (isFuture || withoutSuffix ? ' év' : ' éve');
        }
        return '';
    }
    function week(isFuture) {
        return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
    }

    var hu = moment.defineLocale('hu', {
        months : 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
        monthsShort : 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
        weekdays : 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
        weekdaysShort : 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
        weekdaysMin : 'v_h_k_sze_cs_p_szo'.split('_'),
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'YYYY.MM.DD.',
            LL : 'YYYY. MMMM D.',
            LLL : 'YYYY. MMMM D. H:mm',
            LLLL : 'YYYY. MMMM D., dddd H:mm'
        },
        meridiemParse: /de|du/i,
        isPM: function (input) {
            return input.charAt(1).toLowerCase() === 'u';
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 12) {
                return isLower === true ? 'de' : 'DE';
            } else {
                return isLower === true ? 'du' : 'DU';
            }
        },
        calendar : {
            sameDay : '[ma] LT[-kor]',
            nextDay : '[holnap] LT[-kor]',
            nextWeek : function () {
                return week.call(this, true);
            },
            lastDay : '[tegnap] LT[-kor]',
            lastWeek : function () {
                return week.call(this, false);
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s múlva',
            past : '%s',
            s : translate,
            ss : translate,
            m : translate,
            mm : translate,
            h : translate,
            hh : translate,
            d : translate,
            dd : translate,
            M : translate,
            MM : translate,
            y : translate,
            yy : translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return hu;

})));


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var hyAm = moment.defineLocale('hy-am', {
        months : {
            format: 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_'),
            standalone: 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_')
        },
        monthsShort : 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
        weekdays : 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
        weekdaysShort : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
        weekdaysMin : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY թ.',
            LLL : 'D MMMM YYYY թ., HH:mm',
            LLLL : 'dddd, D MMMM YYYY թ., HH:mm'
        },
        calendar : {
            sameDay: '[այսօր] LT',
            nextDay: '[վաղը] LT',
            lastDay: '[երեկ] LT',
            nextWeek: function () {
                return 'dddd [օրը ժամը] LT';
            },
            lastWeek: function () {
                return '[անցած] dddd [օրը ժամը] LT';
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : '%s հետո',
            past : '%s առաջ',
            s : 'մի քանի վայրկյան',
            ss : '%d վայրկյան',
            m : 'րոպե',
            mm : '%d րոպե',
            h : 'ժամ',
            hh : '%d ժամ',
            d : 'օր',
            dd : '%d օր',
            M : 'ամիս',
            MM : '%d ամիս',
            y : 'տարի',
            yy : '%d տարի'
        },
        meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
        isPM: function (input) {
            return /^(ցերեկվա|երեկոյան)$/.test(input);
        },
        meridiem : function (hour) {
            if (hour < 4) {
                return 'գիշերվա';
            } else if (hour < 12) {
                return 'առավոտվա';
            } else if (hour < 17) {
                return 'ցերեկվա';
            } else {
                return 'երեկոյան';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'DDD':
                case 'w':
                case 'W':
                case 'DDDo':
                    if (number === 1) {
                        return number + '-ին';
                    }
                    return number + '-րդ';
                default:
                    return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return hyAm;

})));


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var id = moment.defineLocale('id', {
        months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des'.split('_'),
        weekdays : 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
        weekdaysShort : 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
        weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY [pukul] HH.mm',
            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /pagi|siang|sore|malam/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'pagi') {
                return hour;
            } else if (meridiem === 'siang') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'sore' || meridiem === 'malam') {
                return hour + 12;
            }
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 11) {
                return 'pagi';
            } else if (hours < 15) {
                return 'siang';
            } else if (hours < 19) {
                return 'sore';
            } else {
                return 'malam';
            }
        },
        calendar : {
            sameDay : '[Hari ini pukul] LT',
            nextDay : '[Besok pukul] LT',
            nextWeek : 'dddd [pukul] LT',
            lastDay : '[Kemarin pukul] LT',
            lastWeek : 'dddd [lalu pukul] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'dalam %s',
            past : '%s yang lalu',
            s : 'beberapa detik',
            ss : '%d detik',
            m : 'semenit',
            mm : '%d menit',
            h : 'sejam',
            hh : '%d jam',
            d : 'sehari',
            dd : '%d hari',
            M : 'sebulan',
            MM : '%d bulan',
            y : 'setahun',
            yy : '%d tahun'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return id;

})));


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    function plural(n) {
        if (n % 100 === 11) {
            return true;
        } else if (n % 10 === 1) {
            return false;
        }
        return true;
    }
    function translate(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':
                return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';
            case 'ss':
                if (plural(number)) {
                    return result + (withoutSuffix || isFuture ? 'sekúndur' : 'sekúndum');
                }
                return result + 'sekúnda';
            case 'm':
                return withoutSuffix ? 'mínúta' : 'mínútu';
            case 'mm':
                if (plural(number)) {
                    return result + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum');
                } else if (withoutSuffix) {
                    return result + 'mínúta';
                }
                return result + 'mínútu';
            case 'hh':
                if (plural(number)) {
                    return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
                }
                return result + 'klukkustund';
            case 'd':
                if (withoutSuffix) {
                    return 'dagur';
                }
                return isFuture ? 'dag' : 'degi';
            case 'dd':
                if (plural(number)) {
                    if (withoutSuffix) {
                        return result + 'dagar';
                    }
                    return result + (isFuture ? 'daga' : 'dögum');
                } else if (withoutSuffix) {
                    return result + 'dagur';
                }
                return result + (isFuture ? 'dag' : 'degi');
            case 'M':
                if (withoutSuffix) {
                    return 'mánuður';
                }
                return isFuture ? 'mánuð' : 'mánuði';
            case 'MM':
                if (plural(number)) {
                    if (withoutSuffix) {
                        return result + 'mánuðir';
                    }
                    return result + (isFuture ? 'mánuði' : 'mánuðum');
                } else if (withoutSuffix) {
                    return result + 'mánuður';
                }
                return result + (isFuture ? 'mánuð' : 'mánuði');
            case 'y':
                return withoutSuffix || isFuture ? 'ár' : 'ári';
            case 'yy':
                if (plural(number)) {
                    return result + (withoutSuffix || isFuture ? 'ár' : 'árum');
                }
                return result + (withoutSuffix || isFuture ? 'ár' : 'ári');
        }
    }

    var is = moment.defineLocale('is', {
        months : 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'),
        monthsShort : 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
        weekdays : 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'),
        weekdaysShort : 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
        weekdaysMin : 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY [kl.] H:mm',
            LLLL : 'dddd, D. MMMM YYYY [kl.] H:mm'
        },
        calendar : {
            sameDay : '[í dag kl.] LT',
            nextDay : '[á morgun kl.] LT',
            nextWeek : 'dddd [kl.] LT',
            lastDay : '[í gær kl.] LT',
            lastWeek : '[síðasta] dddd [kl.] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'eftir %s',
            past : 'fyrir %s síðan',
            s : translate,
            ss : translate,
            m : translate,
            mm : translate,
            h : 'klukkustund',
            hh : translate,
            d : translate,
            dd : translate,
            M : translate,
            MM : translate,
            y : translate,
            yy : translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return is;

})));


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var it = moment.defineLocale('it', {
        months : 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
        monthsShort : 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
        weekdays : 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_'),
        weekdaysShort : 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
        weekdaysMin : 'do_lu_ma_me_gi_ve_sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Oggi alle] LT',
            nextDay: '[Domani alle] LT',
            nextWeek: 'dddd [alle] LT',
            lastDay: '[Ieri alle] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[la scorsa] dddd [alle] LT';
                    default:
                        return '[lo scorso] dddd [alle] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : function (s) {
                return ((/^[0-9].+$/).test(s) ? 'tra' : 'in') + ' ' + s;
            },
            past : '%s fa',
            s : 'alcuni secondi',
            ss : '%d secondi',
            m : 'un minuto',
            mm : '%d minuti',
            h : 'un\'ora',
            hh : '%d ore',
            d : 'un giorno',
            dd : '%d giorni',
            M : 'un mese',
            MM : '%d mesi',
            y : 'un anno',
            yy : '%d anni'
        },
        dayOfMonthOrdinalParse : /\d{1,2}º/,
        ordinal: '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return it;

})));


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var ja = moment.defineLocale('ja', {
        months : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays : '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
        weekdaysShort : '日_月_火_水_木_金_土'.split('_'),
        weekdaysMin : '日_月_火_水_木_金_土'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY/MM/DD',
            LL : 'YYYY年M月D日',
            LLL : 'YYYY年M月D日 HH:mm',
            LLLL : 'YYYY年M月D日 dddd HH:mm',
            l : 'YYYY/MM/DD',
            ll : 'YYYY年M月D日',
            lll : 'YYYY年M月D日 HH:mm',
            llll : 'YYYY年M月D日(ddd) HH:mm'
        },
        meridiemParse: /午前|午後/i,
        isPM : function (input) {
            return input === '午後';
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return '午前';
            } else {
                return '午後';
            }
        },
        calendar : {
            sameDay : '[今日] LT',
            nextDay : '[明日] LT',
            nextWeek : function (now) {
                if (now.week() < this.week()) {
                    return '[来週]dddd LT';
                } else {
                    return 'dddd LT';
                }
            },
            lastDay : '[昨日] LT',
            lastWeek : function (now) {
                if (this.week() < now.week()) {
                    return '[先週]dddd LT';
                } else {
                    return 'dddd LT';
                }
            },
            sameElse : 'L'
        },
        dayOfMonthOrdinalParse : /\d{1,2}日/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                default:
                    return number;
            }
        },
        relativeTime : {
            future : '%s後',
            past : '%s前',
            s : '数秒',
            ss : '%d秒',
            m : '1分',
            mm : '%d分',
            h : '1時間',
            hh : '%d時間',
            d : '1日',
            dd : '%d日',
            M : '1ヶ月',
            MM : '%dヶ月',
            y : '1年',
            yy : '%d年'
        }
    });

    return ja;

})));


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var jv = moment.defineLocale('jv', {
        months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
        weekdays : 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
        weekdaysShort : 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
        weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY [pukul] HH.mm',
            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /enjing|siyang|sonten|ndalu/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'enjing') {
                return hour;
            } else if (meridiem === 'siyang') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'sonten' || meridiem === 'ndalu') {
                return hour + 12;
            }
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 11) {
                return 'enjing';
            } else if (hours < 15) {
                return 'siyang';
            } else if (hours < 19) {
                return 'sonten';
            } else {
                return 'ndalu';
            }
        },
        calendar : {
            sameDay : '[Dinten puniko pukul] LT',
            nextDay : '[Mbenjang pukul] LT',
            nextWeek : 'dddd [pukul] LT',
            lastDay : '[Kala wingi pukul] LT',
            lastWeek : 'dddd [kepengker pukul] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'wonten ing %s',
            past : '%s ingkang kepengker',
            s : 'sawetawis detik',
            ss : '%d detik',
            m : 'setunggal menit',
            mm : '%d menit',
            h : 'setunggal jam',
            hh : '%d jam',
            d : 'sedinten',
            dd : '%d dinten',
            M : 'sewulan',
            MM : '%d wulan',
            y : 'setaun',
            yy : '%d taun'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return jv;

})));


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var ka = moment.defineLocale('ka', {
        months : {
            standalone: 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
            format: 'იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს'.split('_')
        },
        monthsShort : 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
        weekdays : {
            standalone: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
            format: 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_'),
            isFormat: /(წინა|შემდეგ)/
        },
        weekdaysShort : 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
        weekdaysMin : 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendar : {
            sameDay : '[დღეს] LT[-ზე]',
            nextDay : '[ხვალ] LT[-ზე]',
            lastDay : '[გუშინ] LT[-ზე]',
            nextWeek : '[შემდეგ] dddd LT[-ზე]',
            lastWeek : '[წინა] dddd LT-ზე',
            sameElse : 'L'
        },
        relativeTime : {
            future : function (s) {
                return (/(წამი|წუთი|საათი|წელი)/).test(s) ?
                    s.replace(/ი$/, 'ში') :
                    s + 'ში';
            },
            past : function (s) {
                if ((/(წამი|წუთი|საათი|დღე|თვე)/).test(s)) {
                    return s.replace(/(ი|ე)$/, 'ის წინ');
                }
                if ((/წელი/).test(s)) {
                    return s.replace(/წელი$/, 'წლის წინ');
                }
            },
            s : 'რამდენიმე წამი',
            ss : '%d წამი',
            m : 'წუთი',
            mm : '%d წუთი',
            h : 'საათი',
            hh : '%d საათი',
            d : 'დღე',
            dd : '%d დღე',
            M : 'თვე',
            MM : '%d თვე',
            y : 'წელი',
            yy : '%d წელი'
        },
        dayOfMonthOrdinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
        ordinal : function (number) {
            if (number === 0) {
                return number;
            }
            if (number === 1) {
                return number + '-ლი';
            }
            if ((number < 20) || (number <= 100 && (number % 20 === 0)) || (number % 100 === 0)) {
                return 'მე-' + number;
            }
            return number + '-ე';
        },
        week : {
            dow : 1,
            doy : 7
        }
    });

    return ka;

})));


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var suffixes = {
        0: '-ші',
        1: '-ші',
        2: '-ші',
        3: '-ші',
        4: '-ші',
        5: '-ші',
        6: '-шы',
        7: '-ші',
        8: '-ші',
        9: '-шы',
        10: '-шы',
        20: '-шы',
        30: '-шы',
        40: '-шы',
        50: '-ші',
        60: '-шы',
        70: '-ші',
        80: '-ші',
        90: '-шы',
        100: '-ші'
    };

    var kk = moment.defineLocale('kk', {
        months : 'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split('_'),
        monthsShort : 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
        weekdays : 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
        weekdaysShort : 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
        weekdaysMin : 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Бүгін сағат] LT',
            nextDay : '[Ертең сағат] LT',
            nextWeek : 'dddd [сағат] LT',
            lastDay : '[Кеше сағат] LT',
            lastWeek : '[Өткен аптаның] dddd [сағат] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s ішінде',
            past : '%s бұрын',
            s : 'бірнеше секунд',
            ss : '%d секунд',
            m : 'бір минут',
            mm : '%d минут',
            h : 'бір сағат',
            hh : '%d сағат',
            d : 'бір күн',
            dd : '%d күн',
            M : 'бір ай',
            MM : '%d ай',
            y : 'бір жыл',
            yy : '%d жыл'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(ші|шы)/,
        ordinal : function (number) {
            var a = number % 10,
                b = number >= 100 ? 100 : null;
            return number + (suffixes[number] || suffixes[a] || suffixes[b]);
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return kk;

})));


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var symbolMap = {
        '1': '១',
        '2': '២',
        '3': '៣',
        '4': '៤',
        '5': '៥',
        '6': '៦',
        '7': '៧',
        '8': '៨',
        '9': '៩',
        '0': '០'
    }, numberMap = {
        '១': '1',
        '២': '2',
        '៣': '3',
        '៤': '4',
        '៥': '5',
        '៦': '6',
        '៧': '7',
        '៨': '8',
        '៩': '9',
        '០': '0'
    };

    var km = moment.defineLocale('km', {
        months: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split(
            '_'
        ),
        monthsShort: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split(
            '_'
        ),
        weekdays: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
        weekdaysShort: 'អា_ច_អ_ព_ព្រ_សុ_ស'.split('_'),
        weekdaysMin: 'អា_ច_អ_ព_ព្រ_សុ_ស'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm'
        },
        meridiemParse: /ព្រឹក|ល្ងាច/,
        isPM: function (input) {
            return input === 'ល្ងាច';
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ព្រឹក';
            } else {
                return 'ល្ងាច';
            }
        },
        calendar: {
            sameDay: '[ថ្ងៃនេះ ម៉ោង] LT',
            nextDay: '[ស្អែក ម៉ោង] LT',
            nextWeek: 'dddd [ម៉ោង] LT',
            lastDay: '[ម្សិលមិញ ម៉ោង] LT',
            lastWeek: 'dddd [សប្តាហ៍មុន] [ម៉ោង] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%sទៀត',
            past: '%sមុន',
            s: 'ប៉ុន្មានវិនាទី',
            ss: '%d វិនាទី',
            m: 'មួយនាទី',
            mm: '%d នាទី',
            h: 'មួយម៉ោង',
            hh: '%d ម៉ោង',
            d: 'មួយថ្ងៃ',
            dd: '%d ថ្ងៃ',
            M: 'មួយខែ',
            MM: '%d ខែ',
            y: 'មួយឆ្នាំ',
            yy: '%d ឆ្នាំ'
        },
        dayOfMonthOrdinalParse : /ទី\d{1,2}/,
        ordinal : 'ទី%d',
        preparse: function (string) {
            return string.replace(/[១២៣៤៥៦៧៨៩០]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return km;

})));


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var symbolMap = {
        '1': '೧',
        '2': '೨',
        '3': '೩',
        '4': '೪',
        '5': '೫',
        '6': '೬',
        '7': '೭',
        '8': '೮',
        '9': '೯',
        '0': '೦'
    },
    numberMap = {
        '೧': '1',
        '೨': '2',
        '೩': '3',
        '೪': '4',
        '೫': '5',
        '೬': '6',
        '೭': '7',
        '೮': '8',
        '೯': '9',
        '೦': '0'
    };

    var kn = moment.defineLocale('kn', {
        months : 'ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್'.split('_'),
        monthsShort : 'ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂ_ಅಕ್ಟೋ_ನವೆಂ_ಡಿಸೆಂ'.split('_'),
        monthsParseExact: true,
        weekdays : 'ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ'.split('_'),
        weekdaysShort : 'ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ'.split('_'),
        weekdaysMin : 'ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ'.split('_'),
        longDateFormat : {
            LT : 'A h:mm',
            LTS : 'A h:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm',
            LLLL : 'dddd, D MMMM YYYY, A h:mm'
        },
        calendar : {
            sameDay : '[ಇಂದು] LT',
            nextDay : '[ನಾಳೆ] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[ನಿನ್ನೆ] LT',
            lastWeek : '[ಕೊನೆಯ] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s ನಂತರ',
            past : '%s ಹಿಂದೆ',
            s : 'ಕೆಲವು ಕ್ಷಣಗಳು',
            ss : '%d ಸೆಕೆಂಡುಗಳು',
            m : 'ಒಂದು ನಿಮಿಷ',
            mm : '%d ನಿಮಿಷ',
            h : 'ಒಂದು ಗಂಟೆ',
            hh : '%d ಗಂಟೆ',
            d : 'ಒಂದು ದಿನ',
            dd : '%d ದಿನ',
            M : 'ಒಂದು ತಿಂಗಳು',
            MM : '%d ತಿಂಗಳು',
            y : 'ಒಂದು ವರ್ಷ',
            yy : '%d ವರ್ಷ'
        },
        preparse: function (string) {
            return string.replace(/[೧೨೩೪೫೬೭೮೯೦]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        meridiemParse: /ರಾತ್ರಿ|ಬೆಳಿಗ್ಗೆ|ಮಧ್ಯಾಹ್ನ|ಸಂಜೆ/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'ರಾತ್ರಿ') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'ಬೆಳಿಗ್ಗೆ') {
                return hour;
            } else if (meridiem === 'ಮಧ್ಯಾಹ್ನ') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'ಸಂಜೆ') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ರಾತ್ರಿ';
            } else if (hour < 10) {
                return 'ಬೆಳಿಗ್ಗೆ';
            } else if (hour < 17) {
                return 'ಮಧ್ಯಾಹ್ನ';
            } else if (hour < 20) {
                return 'ಸಂಜೆ';
            } else {
                return 'ರಾತ್ರಿ';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ನೇ)/,
        ordinal : function (number) {
            return number + 'ನೇ';
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    return kn;

})));


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var ko = moment.defineLocale('ko', {
        months : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
        monthsShort : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
        weekdays : '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
        weekdaysShort : '일_월_화_수_목_금_토'.split('_'),
        weekdaysMin : '일_월_화_수_목_금_토'.split('_'),
        longDateFormat : {
            LT : 'A h:mm',
            LTS : 'A h:mm:ss',
            L : 'YYYY.MM.DD.',
            LL : 'YYYY년 MMMM D일',
            LLL : 'YYYY년 MMMM D일 A h:mm',
            LLLL : 'YYYY년 MMMM D일 dddd A h:mm',
            l : 'YYYY.MM.DD.',
            ll : 'YYYY년 MMMM D일',
            lll : 'YYYY년 MMMM D일 A h:mm',
            llll : 'YYYY년 MMMM D일 dddd A h:mm'
        },
        calendar : {
            sameDay : '오늘 LT',
            nextDay : '내일 LT',
            nextWeek : 'dddd LT',
            lastDay : '어제 LT',
            lastWeek : '지난주 dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s 후',
            past : '%s 전',
            s : '몇 초',
            ss : '%d초',
            m : '1분',
            mm : '%d분',
            h : '한 시간',
            hh : '%d시간',
            d : '하루',
            dd : '%d일',
            M : '한 달',
            MM : '%d달',
            y : '일 년',
            yy : '%d년'
        },
        dayOfMonthOrdinalParse : /\d{1,2}(일|월|주)/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '일';
                case 'M':
                    return number + '월';
                case 'w':
                case 'W':
                    return number + '주';
                default:
                    return number;
            }
        },
        meridiemParse : /오전|오후/,
        isPM : function (token) {
            return token === '오후';
        },
        meridiem : function (hour, minute, isUpper) {
            return hour < 12 ? '오전' : '오후';
        }
    });

    return ko;

})));


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var symbolMap = {
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩',
        '0': '٠'
    }, numberMap = {
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',
        '٠': '0'
    },
    months = [
        'کانونی دووەم',
        'شوبات',
        'ئازار',
        'نیسان',
        'ئایار',
        'حوزەیران',
        'تەمموز',
        'ئاب',
        'ئەیلوول',
        'تشرینی یەكەم',
        'تشرینی دووەم',
        'كانونی یەکەم'
    ];


    var ku = moment.defineLocale('ku', {
        months : months,
        monthsShort : months,
        weekdays : 'یه‌كشه‌ممه‌_دووشه‌ممه‌_سێشه‌ممه‌_چوارشه‌ممه‌_پێنجشه‌ممه‌_هه‌ینی_شه‌ممه‌'.split('_'),
        weekdaysShort : 'یه‌كشه‌م_دووشه‌م_سێشه‌م_چوارشه‌م_پێنجشه‌م_هه‌ینی_شه‌ممه‌'.split('_'),
        weekdaysMin : 'ی_د_س_چ_پ_ه_ش'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        meridiemParse: /ئێواره‌|به‌یانی/,
        isPM: function (input) {
            return /ئێواره‌/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'به‌یانی';
            } else {
                return 'ئێواره‌';
            }
        },
        calendar : {
            sameDay : '[ئه‌مرۆ كاتژمێر] LT',
            nextDay : '[به‌یانی كاتژمێر] LT',
            nextWeek : 'dddd [كاتژمێر] LT',
            lastDay : '[دوێنێ كاتژمێر] LT',
            lastWeek : 'dddd [كاتژمێر] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'له‌ %s',
            past : '%s',
            s : 'چه‌ند چركه‌یه‌ك',
            ss : 'چركه‌ %d',
            m : 'یه‌ك خوله‌ك',
            mm : '%d خوله‌ك',
            h : 'یه‌ك كاتژمێر',
            hh : '%d كاتژمێر',
            d : 'یه‌ك ڕۆژ',
            dd : '%d ڕۆژ',
            M : 'یه‌ك مانگ',
            MM : '%d مانگ',
            y : 'یه‌ك ساڵ',
            yy : '%d ساڵ'
        },
        preparse: function (string) {
            return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
                return numberMap[match];
            }).replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            }).replace(/,/g, '،');
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12 // The week that contains Jan 12th is the first week of the year.
        }
    });

    return ku;

})));


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var suffixes = {
        0: '-чү',
        1: '-чи',
        2: '-чи',
        3: '-чү',
        4: '-чү',
        5: '-чи',
        6: '-чы',
        7: '-чи',
        8: '-чи',
        9: '-чу',
        10: '-чу',
        20: '-чы',
        30: '-чу',
        40: '-чы',
        50: '-чү',
        60: '-чы',
        70: '-чи',
        80: '-чи',
        90: '-чу',
        100: '-чү'
    };

    var ky = moment.defineLocale('ky', {
        months : 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
        monthsShort : 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
        weekdays : 'Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби'.split('_'),
        weekdaysShort : 'Жек_Дүй_Шей_Шар_Бей_Жум_Ише'.split('_'),
        weekdaysMin : 'Жк_Дй_Шй_Шр_Бй_Жм_Иш'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Бүгүн саат] LT',
            nextDay : '[Эртең саат] LT',
            nextWeek : 'dddd [саат] LT',
            lastDay : '[Кечээ саат] LT',
            lastWeek : '[Өткөн аптанын] dddd [күнү] [саат] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s ичинде',
            past : '%s мурун',
            s : 'бирнече секунд',
            ss : '%d секунд',
            m : 'бир мүнөт',
            mm : '%d мүнөт',
            h : 'бир саат',
            hh : '%d саат',
            d : 'бир күн',
            dd : '%d күн',
            M : 'бир ай',
            MM : '%d ай',
            y : 'бир жыл',
            yy : '%d жыл'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
        ordinal : function (number) {
            var a = number % 10,
                b = number >= 100 ? 100 : null;
            return number + (suffixes[number] || suffixes[a] || suffixes[b]);
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return ky;

})));


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            'm': ['eng Minutt', 'enger Minutt'],
            'h': ['eng Stonn', 'enger Stonn'],
            'd': ['een Dag', 'engem Dag'],
            'M': ['ee Mount', 'engem Mount'],
            'y': ['ee Joer', 'engem Joer']
        };
        return withoutSuffix ? format[key][0] : format[key][1];
    }
    function processFutureTime(string) {
        var number = string.substr(0, string.indexOf(' '));
        if (eifelerRegelAppliesToNumber(number)) {
            return 'a ' + string;
        }
        return 'an ' + string;
    }
    function processPastTime(string) {
        var number = string.substr(0, string.indexOf(' '));
        if (eifelerRegelAppliesToNumber(number)) {
            return 'viru ' + string;
        }
        return 'virun ' + string;
    }
    /**
     * Returns true if the word before the given number loses the '-n' ending.
     * e.g. 'an 10 Deeg' but 'a 5 Deeg'
     *
     * @param number {integer}
     * @returns {boolean}
     */
    function eifelerRegelAppliesToNumber(number) {
        number = parseInt(number, 10);
        if (isNaN(number)) {
            return false;
        }
        if (number < 0) {
            // Negative Number --> always true
            return true;
        } else if (number < 10) {
            // Only 1 digit
            if (4 <= number && number <= 7) {
                return true;
            }
            return false;
        } else if (number < 100) {
            // 2 digits
            var lastDigit = number % 10, firstDigit = number / 10;
            if (lastDigit === 0) {
                return eifelerRegelAppliesToNumber(firstDigit);
            }
            return eifelerRegelAppliesToNumber(lastDigit);
        } else if (number < 10000) {
            // 3 or 4 digits --> recursively check first digit
            while (number >= 10) {
                number = number / 10;
            }
            return eifelerRegelAppliesToNumber(number);
        } else {
            // Anything larger than 4 digits: recursively check first n-3 digits
            number = number / 1000;
            return eifelerRegelAppliesToNumber(number);
        }
    }

    var lb = moment.defineLocale('lb', {
        months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
        monthsParseExact : true,
        weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
        weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
        weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
        weekdaysParseExact : true,
        longDateFormat: {
            LT: 'H:mm [Auer]',
            LTS: 'H:mm:ss [Auer]',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm [Auer]',
            LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
        },
        calendar: {
            sameDay: '[Haut um] LT',
            sameElse: 'L',
            nextDay: '[Muer um] LT',
            nextWeek: 'dddd [um] LT',
            lastDay: '[Gëschter um] LT',
            lastWeek: function () {
                // Different date string for 'Dënschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
                switch (this.day()) {
                    case 2:
                    case 4:
                        return '[Leschten] dddd [um] LT';
                    default:
                        return '[Leschte] dddd [um] LT';
                }
            }
        },
        relativeTime : {
            future : processFutureTime,
            past : processPastTime,
            s : 'e puer Sekonnen',
            ss : '%d Sekonnen',
            m : processRelativeTime,
            mm : '%d Minutten',
            h : processRelativeTime,
            hh : '%d Stonnen',
            d : processRelativeTime,
            dd : '%d Deeg',
            M : processRelativeTime,
            MM : '%d Méint',
            y : processRelativeTime,
            yy : '%d Joer'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return lb;

})));


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var lo = moment.defineLocale('lo', {
        months : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
        monthsShort : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
        weekdays : 'ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
        weekdaysShort : 'ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
        weekdaysMin : 'ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'ວັນdddd D MMMM YYYY HH:mm'
        },
        meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
        isPM: function (input) {
            return input === 'ຕອນແລງ';
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ຕອນເຊົ້າ';
            } else {
                return 'ຕອນແລງ';
            }
        },
        calendar : {
            sameDay : '[ມື້ນີ້ເວລາ] LT',
            nextDay : '[ມື້ອື່ນເວລາ] LT',
            nextWeek : '[ວັນ]dddd[ໜ້າເວລາ] LT',
            lastDay : '[ມື້ວານນີ້ເວລາ] LT',
            lastWeek : '[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'ອີກ %s',
            past : '%sຜ່ານມາ',
            s : 'ບໍ່ເທົ່າໃດວິນາທີ',
            ss : '%d ວິນາທີ' ,
            m : '1 ນາທີ',
            mm : '%d ນາທີ',
            h : '1 ຊົ່ວໂມງ',
            hh : '%d ຊົ່ວໂມງ',
            d : '1 ມື້',
            dd : '%d ມື້',
            M : '1 ເດືອນ',
            MM : '%d ເດືອນ',
            y : '1 ປີ',
            yy : '%d ປີ'
        },
        dayOfMonthOrdinalParse: /(ທີ່)\d{1,2}/,
        ordinal : function (number) {
            return 'ທີ່' + number;
        }
    });

    return lo;

})));


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var units = {
        'ss' : 'sekundė_sekundžių_sekundes',
        'm' : 'minutė_minutės_minutę',
        'mm': 'minutės_minučių_minutes',
        'h' : 'valanda_valandos_valandą',
        'hh': 'valandos_valandų_valandas',
        'd' : 'diena_dienos_dieną',
        'dd': 'dienos_dienų_dienas',
        'M' : 'mėnuo_mėnesio_mėnesį',
        'MM': 'mėnesiai_mėnesių_mėnesius',
        'y' : 'metai_metų_metus',
        'yy': 'metai_metų_metus'
    };
    function translateSeconds(number, withoutSuffix, key, isFuture) {
        if (withoutSuffix) {
            return 'kelios sekundės';
        } else {
            return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
        }
    }
    function translateSingular(number, withoutSuffix, key, isFuture) {
        return withoutSuffix ? forms(key)[0] : (isFuture ? forms(key)[1] : forms(key)[2]);
    }
    function special(number) {
        return number % 10 === 0 || (number > 10 && number < 20);
    }
    function forms(key) {
        return units[key].split('_');
    }
    function translate(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        if (number === 1) {
            return result + translateSingular(number, withoutSuffix, key[0], isFuture);
        } else if (withoutSuffix) {
            return result + (special(number) ? forms(key)[1] : forms(key)[0]);
        } else {
            if (isFuture) {
                return result + forms(key)[1];
            } else {
                return result + (special(number) ? forms(key)[1] : forms(key)[2]);
            }
        }
    }
    var lt = moment.defineLocale('lt', {
        months : {
            format: 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_'),
            standalone: 'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split('_'),
            isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
        },
        monthsShort : 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
        weekdays : {
            format: 'sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį'.split('_'),
            standalone: 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_'),
            isFormat: /dddd HH:mm/
        },
        weekdaysShort : 'Sek_Pir_Ant_Tre_Ket_Pen_Šeš'.split('_'),
        weekdaysMin : 'S_P_A_T_K_Pn_Š'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'YYYY [m.] MMMM D [d.]',
            LLL : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
            LLLL : 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
            l : 'YYYY-MM-DD',
            ll : 'YYYY [m.] MMMM D [d.]',
            lll : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
            llll : 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
        },
        calendar : {
            sameDay : '[Šiandien] LT',
            nextDay : '[Rytoj] LT',
            nextWeek : 'dddd LT',
            lastDay : '[Vakar] LT',
            lastWeek : '[Praėjusį] dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'po %s',
            past : 'prieš %s',
            s : translateSeconds,
            ss : translate,
            m : translateSingular,
            mm : translate,
            h : translateSingular,
            hh : translate,
            d : translateSingular,
            dd : translate,
            M : translateSingular,
            MM : translate,
            y : translateSingular,
            yy : translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}-oji/,
        ordinal : function (number) {
            return number + '-oji';
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return lt;

})));


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var units = {
        'ss': 'sekundes_sekundēm_sekunde_sekundes'.split('_'),
        'm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
        'mm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
        'h': 'stundas_stundām_stunda_stundas'.split('_'),
        'hh': 'stundas_stundām_stunda_stundas'.split('_'),
        'd': 'dienas_dienām_diena_dienas'.split('_'),
        'dd': 'dienas_dienām_diena_dienas'.split('_'),
        'M': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
        'MM': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
        'y': 'gada_gadiem_gads_gadi'.split('_'),
        'yy': 'gada_gadiem_gads_gadi'.split('_')
    };
    /**
     * @param withoutSuffix boolean true = a length of time; false = before/after a period of time.
     */
    function format(forms, number, withoutSuffix) {
        if (withoutSuffix) {
            // E.g. "21 minūte", "3 minūtes".
            return number % 10 === 1 && number % 100 !== 11 ? forms[2] : forms[3];
        } else {
            // E.g. "21 minūtes" as in "pēc 21 minūtes".
            // E.g. "3 minūtēm" as in "pēc 3 minūtēm".
            return number % 10 === 1 && number % 100 !== 11 ? forms[0] : forms[1];
        }
    }
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        return number + ' ' + format(units[key], number, withoutSuffix);
    }
    function relativeTimeWithSingular(number, withoutSuffix, key) {
        return format(units[key], number, withoutSuffix);
    }
    function relativeSeconds(number, withoutSuffix) {
        return withoutSuffix ? 'dažas sekundes' : 'dažām sekundēm';
    }

    var lv = moment.defineLocale('lv', {
        months : 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
        monthsShort : 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
        weekdays : 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
        weekdaysShort : 'Sv_P_O_T_C_Pk_S'.split('_'),
        weekdaysMin : 'Sv_P_O_T_C_Pk_S'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY.',
            LL : 'YYYY. [gada] D. MMMM',
            LLL : 'YYYY. [gada] D. MMMM, HH:mm',
            LLLL : 'YYYY. [gada] D. MMMM, dddd, HH:mm'
        },
        calendar : {
            sameDay : '[Šodien pulksten] LT',
            nextDay : '[Rīt pulksten] LT',
            nextWeek : 'dddd [pulksten] LT',
            lastDay : '[Vakar pulksten] LT',
            lastWeek : '[Pagājušā] dddd [pulksten] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'pēc %s',
            past : 'pirms %s',
            s : relativeSeconds,
            ss : relativeTimeWithPlural,
            m : relativeTimeWithSingular,
            mm : relativeTimeWithPlural,
            h : relativeTimeWithSingular,
            hh : relativeTimeWithPlural,
            d : relativeTimeWithSingular,
            dd : relativeTimeWithPlural,
            M : relativeTimeWithSingular,
            MM : relativeTimeWithPlural,
            y : relativeTimeWithSingular,
            yy : relativeTimeWithPlural
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return lv;

})));


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var translator = {
        words: { //Different grammatical cases
            ss: ['sekund', 'sekunda', 'sekundi'],
            m: ['jedan minut', 'jednog minuta'],
            mm: ['minut', 'minuta', 'minuta'],
            h: ['jedan sat', 'jednog sata'],
            hh: ['sat', 'sata', 'sati'],
            dd: ['dan', 'dana', 'dana'],
            MM: ['mjesec', 'mjeseca', 'mjeseci'],
            yy: ['godina', 'godine', 'godina']
        },
        correctGrammaticalCase: function (number, wordKey) {
            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
        },
        translate: function (number, withoutSuffix, key) {
            var wordKey = translator.words[key];
            if (key.length === 1) {
                return withoutSuffix ? wordKey[0] : wordKey[1];
            } else {
                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
            }
        }
    };

    var me = moment.defineLocale('me', {
        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
        monthsParseExact : true,
        weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
        weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
        weekdaysParseExact : true,
        longDateFormat: {
            LT: 'H:mm',
            LTS : 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[danas u] LT',
            nextDay: '[sjutra u] LT',

            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedjelju] [u] LT';
                    case 3:
                        return '[u] [srijedu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay  : '[juče u] LT',
            lastWeek : function () {
                var lastWeekDays = [
                    '[prošle] [nedjelje] [u] LT',
                    '[prošlog] [ponedjeljka] [u] LT',
                    '[prošlog] [utorka] [u] LT',
                    '[prošle] [srijede] [u] LT',
                    '[prošlog] [četvrtka] [u] LT',
                    '[prošlog] [petka] [u] LT',
                    '[prošle] [subote] [u] LT'
                ];
                return lastWeekDays[this.day()];
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'za %s',
            past   : 'prije %s',
            s      : 'nekoliko sekundi',
            ss     : translator.translate,
            m      : translator.translate,
            mm     : translator.translate,
            h      : translator.translate,
            hh     : translator.translate,
            d      : 'dan',
            dd     : translator.translate,
            M      : 'mjesec',
            MM     : translator.translate,
            y      : 'godinu',
            yy     : translator.translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return me;

})));


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var mi = moment.defineLocale('mi', {
        months: 'Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea'.split('_'),
        monthsShort: 'Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki'.split('_'),
        monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,
        weekdays: 'Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei'.split('_'),
        weekdaysShort: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
        weekdaysMin: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY [i] HH:mm',
            LLLL: 'dddd, D MMMM YYYY [i] HH:mm'
        },
        calendar: {
            sameDay: '[i teie mahana, i] LT',
            nextDay: '[apopo i] LT',
            nextWeek: 'dddd [i] LT',
            lastDay: '[inanahi i] LT',
            lastWeek: 'dddd [whakamutunga i] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'i roto i %s',
            past: '%s i mua',
            s: 'te hēkona ruarua',
            ss: '%d hēkona',
            m: 'he meneti',
            mm: '%d meneti',
            h: 'te haora',
            hh: '%d haora',
            d: 'he ra',
            dd: '%d ra',
            M: 'he marama',
            MM: '%d marama',
            y: 'he tau',
            yy: '%d tau'
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return mi;

})));


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var mk = moment.defineLocale('mk', {
        months : 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
        monthsShort : 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
        weekdays : 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
        weekdaysShort : 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
        weekdaysMin : 'нe_пo_вт_ср_че_пе_сa'.split('_'),
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'D.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY H:mm',
            LLLL : 'dddd, D MMMM YYYY H:mm'
        },
        calendar : {
            sameDay : '[Денес во] LT',
            nextDay : '[Утре во] LT',
            nextWeek : '[Во] dddd [во] LT',
            lastDay : '[Вчера во] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 6:
                        return '[Изминатата] dddd [во] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[Изминатиот] dddd [во] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'после %s',
            past : 'пред %s',
            s : 'неколку секунди',
            ss : '%d секунди',
            m : 'минута',
            mm : '%d минути',
            h : 'час',
            hh : '%d часа',
            d : 'ден',
            dd : '%d дена',
            M : 'месец',
            MM : '%d месеци',
            y : 'година',
            yy : '%d години'
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
        ordinal : function (number) {
            var lastDigit = number % 10,
                last2Digits = number % 100;
            if (number === 0) {
                return number + '-ев';
            } else if (last2Digits === 0) {
                return number + '-ен';
            } else if (last2Digits > 10 && last2Digits < 20) {
                return number + '-ти';
            } else if (lastDigit === 1) {
                return number + '-ви';
            } else if (lastDigit === 2) {
                return number + '-ри';
            } else if (lastDigit === 7 || lastDigit === 8) {
                return number + '-ми';
            } else {
                return number + '-ти';
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return mk;

})));


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var ml = moment.defineLocale('ml', {
        months : 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split('_'),
        monthsShort : 'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split('_'),
        monthsParseExact : true,
        weekdays : 'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split('_'),
        weekdaysShort : 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
        weekdaysMin : 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split('_'),
        longDateFormat : {
            LT : 'A h:mm -നു',
            LTS : 'A h:mm:ss -നു',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm -നു',
            LLLL : 'dddd, D MMMM YYYY, A h:mm -നു'
        },
        calendar : {
            sameDay : '[ഇന്ന്] LT',
            nextDay : '[നാളെ] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[ഇന്നലെ] LT',
            lastWeek : '[കഴിഞ്ഞ] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s കഴിഞ്ഞ്',
            past : '%s മുൻപ്',
            s : 'അൽപ നിമിഷങ്ങൾ',
            ss : '%d സെക്കൻഡ്',
            m : 'ഒരു മിനിറ്റ്',
            mm : '%d മിനിറ്റ്',
            h : 'ഒരു മണിക്കൂർ',
            hh : '%d മണിക്കൂർ',
            d : 'ഒരു ദിവസം',
            dd : '%d ദിവസം',
            M : 'ഒരു മാസം',
            MM : '%d മാസം',
            y : 'ഒരു വർഷം',
            yy : '%d വർഷം'
        },
        meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if ((meridiem === 'രാത്രി' && hour >= 4) ||
                    meridiem === 'ഉച്ച കഴിഞ്ഞ്' ||
                    meridiem === 'വൈകുന്നേരം') {
                return hour + 12;
            } else {
                return hour;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'രാത്രി';
            } else if (hour < 12) {
                return 'രാവിലെ';
            } else if (hour < 17) {
                return 'ഉച്ച കഴിഞ്ഞ്';
            } else if (hour < 20) {
                return 'വൈകുന്നേരം';
            } else {
                return 'രാത്രി';
            }
        }
    });

    return ml;

})));


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    function translate(number, withoutSuffix, key, isFuture) {
        switch (key) {
            case 's':
                return withoutSuffix ? 'хэдхэн секунд' : 'хэдхэн секундын';
            case 'ss':
                return number + (withoutSuffix ? ' секунд' : ' секундын');
            case 'm':
            case 'mm':
                return number + (withoutSuffix ? ' минут' : ' минутын');
            case 'h':
            case 'hh':
                return number + (withoutSuffix ? ' цаг' : ' цагийн');
            case 'd':
            case 'dd':
                return number + (withoutSuffix ? ' өдөр' : ' өдрийн');
            case 'M':
            case 'MM':
                return number + (withoutSuffix ? ' сар' : ' сарын');
            case 'y':
            case 'yy':
                return number + (withoutSuffix ? ' жил' : ' жилийн');
            default:
                return number;
        }
    }

    var mn = moment.defineLocale('mn', {
        months : 'Нэгдүгээр сар_Хоёрдугаар сар_Гуравдугаар сар_Дөрөвдүгээр сар_Тавдугаар сар_Зургадугаар сар_Долдугаар сар_Наймдугаар сар_Есдүгээр сар_Аравдугаар сар_Арван нэгдүгээр сар_Арван хоёрдугаар сар'.split('_'),
        monthsShort : '1 сар_2 сар_3 сар_4 сар_5 сар_6 сар_7 сар_8 сар_9 сар_10 сар_11 сар_12 сар'.split('_'),
        monthsParseExact : true,
        weekdays : 'Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба'.split('_'),
        weekdaysShort : 'Ням_Дав_Мяг_Лха_Пүр_Баа_Бям'.split('_'),
        weekdaysMin : 'Ня_Да_Мя_Лх_Пү_Ба_Бя'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'YYYY оны MMMMын D',
            LLL : 'YYYY оны MMMMын D HH:mm',
            LLLL : 'dddd, YYYY оны MMMMын D HH:mm'
        },
        meridiemParse: /ҮӨ|ҮХ/i,
        isPM : function (input) {
            return input === 'ҮХ';
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ҮӨ';
            } else {
                return 'ҮХ';
            }
        },
        calendar : {
            sameDay : '[Өнөөдөр] LT',
            nextDay : '[Маргааш] LT',
            nextWeek : '[Ирэх] dddd LT',
            lastDay : '[Өчигдөр] LT',
            lastWeek : '[Өнгөрсөн] dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s дараа',
            past : '%s өмнө',
            s : translate,
            ss : translate,
            m : translate,
            mm : translate,
            h : translate,
            hh : translate,
            d : translate,
            dd : translate,
            M : translate,
            MM : translate,
            y : translate,
            yy : translate
        },
        dayOfMonthOrdinalParse: /\d{1,2} өдөр/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + ' өдөр';
                default:
                    return number;
            }
        }
    });

    return mn;

})));


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var symbolMap = {
        '1': '१',
        '2': '२',
        '3': '३',
        '4': '४',
        '5': '५',
        '6': '६',
        '7': '७',
        '8': '८',
        '9': '९',
        '0': '०'
    },
    numberMap = {
        '१': '1',
        '२': '2',
        '३': '3',
        '४': '4',
        '५': '5',
        '६': '6',
        '७': '7',
        '८': '8',
        '९': '9',
        '०': '0'
    };

    function relativeTimeMr(number, withoutSuffix, string, isFuture)
    {
        var output = '';
        if (withoutSuffix) {
            switch (string) {
                case 's': output = 'काही सेकंद'; break;
                case 'ss': output = '%d सेकंद'; break;
                case 'm': output = 'एक मिनिट'; break;
                case 'mm': output = '%d मिनिटे'; break;
                case 'h': output = 'एक तास'; break;
                case 'hh': output = '%d तास'; break;
                case 'd': output = 'एक दिवस'; break;
                case 'dd': output = '%d दिवस'; break;
                case 'M': output = 'एक महिना'; break;
                case 'MM': output = '%d महिने'; break;
                case 'y': output = 'एक वर्ष'; break;
                case 'yy': output = '%d वर्षे'; break;
            }
        }
        else {
            switch (string) {
                case 's': output = 'काही सेकंदां'; break;
                case 'ss': output = '%d सेकंदां'; break;
                case 'm': output = 'एका मिनिटा'; break;
                case 'mm': output = '%d मिनिटां'; break;
                case 'h': output = 'एका तासा'; break;
                case 'hh': output = '%d तासां'; break;
                case 'd': output = 'एका दिवसा'; break;
                case 'dd': output = '%d दिवसां'; break;
                case 'M': output = 'एका महिन्या'; break;
                case 'MM': output = '%d महिन्यां'; break;
                case 'y': output = 'एका वर्षा'; break;
                case 'yy': output = '%d वर्षां'; break;
            }
        }
        return output.replace(/%d/i, number);
    }

    var mr = moment.defineLocale('mr', {
        months : 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split('_'),
        monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split('_'),
        monthsParseExact : true,
        weekdays : 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
        weekdaysShort : 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
        weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
        longDateFormat : {
            LT : 'A h:mm वाजता',
            LTS : 'A h:mm:ss वाजता',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm वाजता',
            LLLL : 'dddd, D MMMM YYYY, A h:mm वाजता'
        },
        calendar : {
            sameDay : '[आज] LT',
            nextDay : '[उद्या] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[काल] LT',
            lastWeek: '[मागील] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future: '%sमध्ये',
            past: '%sपूर्वी',
            s: relativeTimeMr,
            ss: relativeTimeMr,
            m: relativeTimeMr,
            mm: relativeTimeMr,
            h: relativeTimeMr,
            hh: relativeTimeMr,
            d: relativeTimeMr,
            dd: relativeTimeMr,
            M: relativeTimeMr,
            MM: relativeTimeMr,
            y: relativeTimeMr,
            yy: relativeTimeMr
        },
        preparse: function (string) {
            return string.replace(/[१२३४५६७८९०]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'रात्री') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'सकाळी') {
                return hour;
            } else if (meridiem === 'दुपारी') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'सायंकाळी') {
                return hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 4) {
                return 'रात्री';
            } else if (hour < 10) {
                return 'सकाळी';
            } else if (hour < 17) {
                return 'दुपारी';
            } else if (hour < 20) {
                return 'सायंकाळी';
            } else {
                return 'रात्री';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    return mr;

})));


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var msMy = moment.defineLocale('ms-my', {
        months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
        weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
        weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
        weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY [pukul] HH.mm',
            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /pagi|tengahari|petang|malam/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'pagi') {
                return hour;
            } else if (meridiem === 'tengahari') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'petang' || meridiem === 'malam') {
                return hour + 12;
            }
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 11) {
                return 'pagi';
            } else if (hours < 15) {
                return 'tengahari';
            } else if (hours < 19) {
                return 'petang';
            } else {
                return 'malam';
            }
        },
        calendar : {
            sameDay : '[Hari ini pukul] LT',
            nextDay : '[Esok pukul] LT',
            nextWeek : 'dddd [pukul] LT',
            lastDay : '[Kelmarin pukul] LT',
            lastWeek : 'dddd [lepas pukul] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'dalam %s',
            past : '%s yang lepas',
            s : 'beberapa saat',
            ss : '%d saat',
            m : 'seminit',
            mm : '%d minit',
            h : 'sejam',
            hh : '%d jam',
            d : 'sehari',
            dd : '%d hari',
            M : 'sebulan',
            MM : '%d bulan',
            y : 'setahun',
            yy : '%d tahun'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return msMy;

})));


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var ms = moment.defineLocale('ms', {
        months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
        weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
        weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
        weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY [pukul] HH.mm',
            LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
        },
        meridiemParse: /pagi|tengahari|petang|malam/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'pagi') {
                return hour;
            } else if (meridiem === 'tengahari') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'petang' || meridiem === 'malam') {
                return hour + 12;
            }
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 11) {
                return 'pagi';
            } else if (hours < 15) {
                return 'tengahari';
            } else if (hours < 19) {
                return 'petang';
            } else {
                return 'malam';
            }
        },
        calendar : {
            sameDay : '[Hari ini pukul] LT',
            nextDay : '[Esok pukul] LT',
            nextWeek : 'dddd [pukul] LT',
            lastDay : '[Kelmarin pukul] LT',
            lastWeek : 'dddd [lepas pukul] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'dalam %s',
            past : '%s yang lepas',
            s : 'beberapa saat',
            ss : '%d saat',
            m : 'seminit',
            mm : '%d minit',
            h : 'sejam',
            hh : '%d jam',
            d : 'sehari',
            dd : '%d hari',
            M : 'sebulan',
            MM : '%d bulan',
            y : 'setahun',
            yy : '%d tahun'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return ms;

})));


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var mt = moment.defineLocale('mt', {
        months : 'Jannar_Frar_Marzu_April_Mejju_Ġunju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Diċembru'.split('_'),
        monthsShort : 'Jan_Fra_Mar_Apr_Mej_Ġun_Lul_Aww_Set_Ott_Nov_Diċ'.split('_'),
        weekdays : 'Il-Ħadd_It-Tnejn_It-Tlieta_L-Erbgħa_Il-Ħamis_Il-Ġimgħa_Is-Sibt'.split('_'),
        weekdaysShort : 'Ħad_Tne_Tli_Erb_Ħam_Ġim_Sib'.split('_'),
        weekdaysMin : 'Ħa_Tn_Tl_Er_Ħa_Ġi_Si'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Illum fil-]LT',
            nextDay : '[Għada fil-]LT',
            nextWeek : 'dddd [fil-]LT',
            lastDay : '[Il-bieraħ fil-]LT',
            lastWeek : 'dddd [li għadda] [fil-]LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'f’ %s',
            past : '%s ilu',
            s : 'ftit sekondi',
            ss : '%d sekondi',
            m : 'minuta',
            mm : '%d minuti',
            h : 'siegħa',
            hh : '%d siegħat',
            d : 'ġurnata',
            dd : '%d ġranet',
            M : 'xahar',
            MM : '%d xhur',
            y : 'sena',
            yy : '%d sni'
        },
        dayOfMonthOrdinalParse : /\d{1,2}º/,
        ordinal: '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return mt;

})));


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var symbolMap = {
        '1': '၁',
        '2': '၂',
        '3': '၃',
        '4': '၄',
        '5': '၅',
        '6': '၆',
        '7': '၇',
        '8': '၈',
        '9': '၉',
        '0': '၀'
    }, numberMap = {
        '၁': '1',
        '၂': '2',
        '၃': '3',
        '၄': '4',
        '၅': '5',
        '၆': '6',
        '၇': '7',
        '၈': '8',
        '၉': '9',
        '၀': '0'
    };

    var my = moment.defineLocale('my', {
        months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split('_'),
        monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
        weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
        weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
        weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),

        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm'
        },
        calendar: {
            sameDay: '[ယနေ.] LT [မှာ]',
            nextDay: '[မနက်ဖြန်] LT [မှာ]',
            nextWeek: 'dddd LT [မှာ]',
            lastDay: '[မနေ.က] LT [မှာ]',
            lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'လာမည့် %s မှာ',
            past: 'လွန်ခဲ့သော %s က',
            s: 'စက္ကန်.အနည်းငယ်',
            ss : '%d စက္ကန့်',
            m: 'တစ်မိနစ်',
            mm: '%d မိနစ်',
            h: 'တစ်နာရီ',
            hh: '%d နာရီ',
            d: 'တစ်ရက်',
            dd: '%d ရက်',
            M: 'တစ်လ',
            MM: '%d လ',
            y: 'တစ်နှစ်',
            yy: '%d နှစ်'
        },
        preparse: function (string) {
            return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return my;

})));


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var nb = moment.defineLocale('nb', {
        months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
        monthsShort : 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
        monthsParseExact : true,
        weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
        weekdaysShort : 'sø._ma._ti._on._to._fr._lø.'.split('_'),
        weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY [kl.] HH:mm',
            LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
        },
        calendar : {
            sameDay: '[i dag kl.] LT',
            nextDay: '[i morgen kl.] LT',
            nextWeek: 'dddd [kl.] LT',
            lastDay: '[i går kl.] LT',
            lastWeek: '[forrige] dddd [kl.] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'om %s',
            past : '%s siden',
            s : 'noen sekunder',
            ss : '%d sekunder',
            m : 'ett minutt',
            mm : '%d minutter',
            h : 'en time',
            hh : '%d timer',
            d : 'en dag',
            dd : '%d dager',
            M : 'en måned',
            MM : '%d måneder',
            y : 'ett år',
            yy : '%d år'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return nb;

})));


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var symbolMap = {
        '1': '१',
        '2': '२',
        '3': '३',
        '4': '४',
        '5': '५',
        '6': '६',
        '7': '७',
        '8': '८',
        '9': '९',
        '0': '०'
    },
    numberMap = {
        '१': '1',
        '२': '2',
        '३': '3',
        '४': '4',
        '५': '5',
        '६': '6',
        '७': '7',
        '८': '8',
        '९': '9',
        '०': '0'
    };

    var ne = moment.defineLocale('ne', {
        months : 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split('_'),
        monthsShort : 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split('_'),
        monthsParseExact : true,
        weekdays : 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split('_'),
        weekdaysShort : 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split('_'),
        weekdaysMin : 'आ._सो._मं._बु._बि._शु._श.'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'Aको h:mm बजे',
            LTS : 'Aको h:mm:ss बजे',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, Aको h:mm बजे',
            LLLL : 'dddd, D MMMM YYYY, Aको h:mm बजे'
        },
        preparse: function (string) {
            return string.replace(/[१२३४५६७८९०]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'राति') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'बिहान') {
                return hour;
            } else if (meridiem === 'दिउँसो') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'साँझ') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 3) {
                return 'राति';
            } else if (hour < 12) {
                return 'बिहान';
            } else if (hour < 16) {
                return 'दिउँसो';
            } else if (hour < 20) {
                return 'साँझ';
            } else {
                return 'राति';
            }
        },
        calendar : {
            sameDay : '[आज] LT',
            nextDay : '[भोलि] LT',
            nextWeek : '[आउँदो] dddd[,] LT',
            lastDay : '[हिजो] LT',
            lastWeek : '[गएको] dddd[,] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%sमा',
            past : '%s अगाडि',
            s : 'केही क्षण',
            ss : '%d सेकेण्ड',
            m : 'एक मिनेट',
            mm : '%d मिनेट',
            h : 'एक घण्टा',
            hh : '%d घण्टा',
            d : 'एक दिन',
            dd : '%d दिन',
            M : 'एक महिना',
            MM : '%d महिना',
            y : 'एक बर्ष',
            yy : '%d बर्ष'
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    return ne;

})));


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'),
        monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

    var monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
    var monthsRegex = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

    var nlBe = moment.defineLocale('nl-be', {
        months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
        monthsShort : function (m, format) {
            if (!m) {
                return monthsShortWithDots;
            } else if (/-MMM-/.test(format)) {
                return monthsShortWithoutDots[m.month()];
            } else {
                return monthsShortWithDots[m.month()];
            }
        },

        monthsRegex: monthsRegex,
        monthsShortRegex: monthsRegex,
        monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,
        monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,

        monthsParse : monthsParse,
        longMonthsParse : monthsParse,
        shortMonthsParse : monthsParse,

        weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
        weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
        weekdaysMin : 'zo_ma_di_wo_do_vr_za'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[vandaag om] LT',
            nextDay: '[morgen om] LT',
            nextWeek: 'dddd [om] LT',
            lastDay: '[gisteren om] LT',
            lastWeek: '[afgelopen] dddd [om] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'over %s',
            past : '%s geleden',
            s : 'een paar seconden',
            ss : '%d seconden',
            m : 'één minuut',
            mm : '%d minuten',
            h : 'één uur',
            hh : '%d uur',
            d : 'één dag',
            dd : '%d dagen',
            M : 'één maand',
            MM : '%d maanden',
            y : 'één jaar',
            yy : '%d jaar'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal : function (number) {
            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return nlBe;

})));


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'),
        monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

    var monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
    var monthsRegex = /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

    var nl = moment.defineLocale('nl', {
        months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
        monthsShort : function (m, format) {
            if (!m) {
                return monthsShortWithDots;
            } else if (/-MMM-/.test(format)) {
                return monthsShortWithoutDots[m.month()];
            } else {
                return monthsShortWithDots[m.month()];
            }
        },

        monthsRegex: monthsRegex,
        monthsShortRegex: monthsRegex,
        monthsStrictRegex: /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,
        monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,

        monthsParse : monthsParse,
        longMonthsParse : monthsParse,
        shortMonthsParse : monthsParse,

        weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
        weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
        weekdaysMin : 'zo_ma_di_wo_do_vr_za'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD-MM-YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[vandaag om] LT',
            nextDay: '[morgen om] LT',
            nextWeek: 'dddd [om] LT',
            lastDay: '[gisteren om] LT',
            lastWeek: '[afgelopen] dddd [om] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'over %s',
            past : '%s geleden',
            s : 'een paar seconden',
            ss : '%d seconden',
            m : 'één minuut',
            mm : '%d minuten',
            h : 'één uur',
            hh : '%d uur',
            d : 'één dag',
            dd : '%d dagen',
            M : 'één maand',
            MM : '%d maanden',
            y : 'één jaar',
            yy : '%d jaar'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
        ordinal : function (number) {
            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return nl;

})));


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var nn = moment.defineLocale('nn', {
        months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
        monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
        weekdays : 'sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
        weekdaysShort : 'sun_mån_tys_ons_tor_fre_lau'.split('_'),
        weekdaysMin : 'su_må_ty_on_to_fr_lø'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY [kl.] H:mm',
            LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
        },
        calendar : {
            sameDay: '[I dag klokka] LT',
            nextDay: '[I morgon klokka] LT',
            nextWeek: 'dddd [klokka] LT',
            lastDay: '[I går klokka] LT',
            lastWeek: '[Føregåande] dddd [klokka] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'om %s',
            past : '%s sidan',
            s : 'nokre sekund',
            ss : '%d sekund',
            m : 'eit minutt',
            mm : '%d minutt',
            h : 'ein time',
            hh : '%d timar',
            d : 'ein dag',
            dd : '%d dagar',
            M : 'ein månad',
            MM : '%d månader',
            y : 'eit år',
            yy : '%d år'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return nn;

})));


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var symbolMap = {
        '1': '੧',
        '2': '੨',
        '3': '੩',
        '4': '੪',
        '5': '੫',
        '6': '੬',
        '7': '੭',
        '8': '੮',
        '9': '੯',
        '0': '੦'
    },
    numberMap = {
        '੧': '1',
        '੨': '2',
        '੩': '3',
        '੪': '4',
        '੫': '5',
        '੬': '6',
        '੭': '7',
        '੮': '8',
        '੯': '9',
        '੦': '0'
    };

    var paIn = moment.defineLocale('pa-in', {
        // There are months name as per Nanakshahi Calendar but they are not used as rigidly in modern Punjabi.
        months : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
        monthsShort : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
        weekdays : 'ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ'.split('_'),
        weekdaysShort : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
        weekdaysMin : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
        longDateFormat : {
            LT : 'A h:mm ਵਜੇ',
            LTS : 'A h:mm:ss ਵਜੇ',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm ਵਜੇ',
            LLLL : 'dddd, D MMMM YYYY, A h:mm ਵਜੇ'
        },
        calendar : {
            sameDay : '[ਅਜ] LT',
            nextDay : '[ਕਲ] LT',
            nextWeek : '[ਅਗਲਾ] dddd, LT',
            lastDay : '[ਕਲ] LT',
            lastWeek : '[ਪਿਛਲੇ] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s ਵਿੱਚ',
            past : '%s ਪਿਛਲੇ',
            s : 'ਕੁਝ ਸਕਿੰਟ',
            ss : '%d ਸਕਿੰਟ',
            m : 'ਇਕ ਮਿੰਟ',
            mm : '%d ਮਿੰਟ',
            h : 'ਇੱਕ ਘੰਟਾ',
            hh : '%d ਘੰਟੇ',
            d : 'ਇੱਕ ਦਿਨ',
            dd : '%d ਦਿਨ',
            M : 'ਇੱਕ ਮਹੀਨਾ',
            MM : '%d ਮਹੀਨੇ',
            y : 'ਇੱਕ ਸਾਲ',
            yy : '%d ਸਾਲ'
        },
        preparse: function (string) {
            return string.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        // Punjabi notation for meridiems are quite fuzzy in practice. While there exists
        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Punjabi.
        meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'ਰਾਤ') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'ਸਵੇਰ') {
                return hour;
            } else if (meridiem === 'ਦੁਪਹਿਰ') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'ਸ਼ਾਮ') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ਰਾਤ';
            } else if (hour < 10) {
                return 'ਸਵੇਰ';
            } else if (hour < 17) {
                return 'ਦੁਪਹਿਰ';
            } else if (hour < 20) {
                return 'ਸ਼ਾਮ';
            } else {
                return 'ਰਾਤ';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    return paIn;

})));


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var monthsNominative = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_'),
        monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
    function plural(n) {
        return (n % 10 < 5) && (n % 10 > 1) && ((~~(n / 10) % 10) !== 1);
    }
    function translate(number, withoutSuffix, key) {
        var result = number + ' ';
        switch (key) {
            case 'ss':
                return result + (plural(number) ? 'sekundy' : 'sekund');
            case 'm':
                return withoutSuffix ? 'minuta' : 'minutę';
            case 'mm':
                return result + (plural(number) ? 'minuty' : 'minut');
            case 'h':
                return withoutSuffix  ? 'godzina'  : 'godzinę';
            case 'hh':
                return result + (plural(number) ? 'godziny' : 'godzin');
            case 'MM':
                return result + (plural(number) ? 'miesiące' : 'miesięcy');
            case 'yy':
                return result + (plural(number) ? 'lata' : 'lat');
        }
    }

    var pl = moment.defineLocale('pl', {
        months : function (momentToFormat, format) {
            if (!momentToFormat) {
                return monthsNominative;
            } else if (format === '') {
                // Hack: if format empty we know this is used to generate
                // RegExp by moment. Give then back both valid forms of months
                // in RegExp ready format.
                return '(' + monthsSubjective[momentToFormat.month()] + '|' + monthsNominative[momentToFormat.month()] + ')';
            } else if (/D MMMM/.test(format)) {
                return monthsSubjective[momentToFormat.month()];
            } else {
                return monthsNominative[momentToFormat.month()];
            }
        },
        monthsShort : 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
        weekdays : 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
        weekdaysShort : 'ndz_pon_wt_śr_czw_pt_sob'.split('_'),
        weekdaysMin : 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Dziś o] LT',
            nextDay: '[Jutro o] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[W niedzielę o] LT';

                    case 2:
                        return '[We wtorek o] LT';

                    case 3:
                        return '[W środę o] LT';

                    case 6:
                        return '[W sobotę o] LT';

                    default:
                        return '[W] dddd [o] LT';
                }
            },
            lastDay: '[Wczoraj o] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[W zeszłą niedzielę o] LT';
                    case 3:
                        return '[W zeszłą środę o] LT';
                    case 6:
                        return '[W zeszłą sobotę o] LT';
                    default:
                        return '[W zeszły] dddd [o] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'za %s',
            past : '%s temu',
            s : 'kilka sekund',
            ss : translate,
            m : translate,
            mm : translate,
            h : translate,
            hh : translate,
            d : '1 dzień',
            dd : '%d dni',
            M : 'miesiąc',
            MM : translate,
            y : 'rok',
            yy : translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return pl;

})));


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var ptBr = moment.defineLocale('pt-br', {
        months : 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
        monthsShort : 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
        weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
        weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
        weekdaysMin : 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY [às] HH:mm',
            LLLL : 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
        },
        calendar : {
            sameDay: '[Hoje às] LT',
            nextDay: '[Amanhã às] LT',
            nextWeek: 'dddd [às] LT',
            lastDay: '[Ontem às] LT',
            lastWeek: function () {
                return (this.day() === 0 || this.day() === 6) ?
                    '[Último] dddd [às] LT' : // Saturday + Sunday
                    '[Última] dddd [às] LT'; // Monday - Friday
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'em %s',
            past : 'há %s',
            s : 'poucos segundos',
            ss : '%d segundos',
            m : 'um minuto',
            mm : '%d minutos',
            h : 'uma hora',
            hh : '%d horas',
            d : 'um dia',
            dd : '%d dias',
            M : 'um mês',
            MM : '%d meses',
            y : 'um ano',
            yy : '%d anos'
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal : '%dº'
    });

    return ptBr;

})));


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var pt = moment.defineLocale('pt', {
        months : 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
        monthsShort : 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
        weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
        weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
        weekdaysMin : 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY HH:mm',
            LLLL : 'dddd, D [de] MMMM [de] YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Hoje às] LT',
            nextDay: '[Amanhã às] LT',
            nextWeek: 'dddd [às] LT',
            lastDay: '[Ontem às] LT',
            lastWeek: function () {
                return (this.day() === 0 || this.day() === 6) ?
                    '[Último] dddd [às] LT' : // Saturday + Sunday
                    '[Última] dddd [às] LT'; // Monday - Friday
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'em %s',
            past : 'há %s',
            s : 'segundos',
            ss : '%d segundos',
            m : 'um minuto',
            mm : '%d minutos',
            h : 'uma hora',
            hh : '%d horas',
            d : 'um dia',
            dd : '%d dias',
            M : 'um mês',
            MM : '%d meses',
            y : 'um ano',
            yy : '%d anos'
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal : '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return pt;

})));


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
                'ss': 'secunde',
                'mm': 'minute',
                'hh': 'ore',
                'dd': 'zile',
                'MM': 'luni',
                'yy': 'ani'
            },
            separator = ' ';
        if (number % 100 >= 20 || (number >= 100 && number % 100 === 0)) {
            separator = ' de ';
        }
        return number + separator + format[key];
    }

    var ro = moment.defineLocale('ro', {
        months : 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
        monthsShort : 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays : 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
        weekdaysShort : 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
        weekdaysMin : 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY H:mm',
            LLLL : 'dddd, D MMMM YYYY H:mm'
        },
        calendar : {
            sameDay: '[azi la] LT',
            nextDay: '[mâine la] LT',
            nextWeek: 'dddd [la] LT',
            lastDay: '[ieri la] LT',
            lastWeek: '[fosta] dddd [la] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'peste %s',
            past : '%s în urmă',
            s : 'câteva secunde',
            ss : relativeTimeWithPlural,
            m : 'un minut',
            mm : relativeTimeWithPlural,
            h : 'o oră',
            hh : relativeTimeWithPlural,
            d : 'o zi',
            dd : relativeTimeWithPlural,
            M : 'o lună',
            MM : relativeTimeWithPlural,
            y : 'un an',
            yy : relativeTimeWithPlural
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return ro;

})));


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
    }
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'ss': withoutSuffix ? 'секунда_секунды_секунд' : 'секунду_секунды_секунд',
            'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
            'hh': 'час_часа_часов',
            'dd': 'день_дня_дней',
            'MM': 'месяц_месяца_месяцев',
            'yy': 'год_года_лет'
        };
        if (key === 'm') {
            return withoutSuffix ? 'минута' : 'минуту';
        }
        else {
            return number + ' ' + plural(format[key], +number);
        }
    }
    var monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];

    // http://new.gramota.ru/spravka/rules/139-prop : § 103
    // Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
    // CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
    var ru = moment.defineLocale('ru', {
        months : {
            format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
            standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
        },
        monthsShort : {
            // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
            format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
            standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
        },
        weekdays : {
            standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
            format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
            isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
        },
        weekdaysShort : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
        weekdaysMin : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
        monthsParse : monthsParse,
        longMonthsParse : monthsParse,
        shortMonthsParse : monthsParse,

        // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
        monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

        // копия предыдущего
        monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

        // полные названия с падежами
        monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,

        // Выражение, которое соотвествует только сокращённым формам
        monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY г.',
            LLL : 'D MMMM YYYY г., H:mm',
            LLLL : 'dddd, D MMMM YYYY г., H:mm'
        },
        calendar : {
            sameDay: '[Сегодня, в] LT',
            nextDay: '[Завтра, в] LT',
            lastDay: '[Вчера, в] LT',
            nextWeek: function (now) {
                if (now.week() !== this.week()) {
                    switch (this.day()) {
                        case 0:
                            return '[В следующее] dddd, [в] LT';
                        case 1:
                        case 2:
                        case 4:
                            return '[В следующий] dddd, [в] LT';
                        case 3:
                        case 5:
                        case 6:
                            return '[В следующую] dddd, [в] LT';
                    }
                } else {
                    if (this.day() === 2) {
                        return '[Во] dddd, [в] LT';
                    } else {
                        return '[В] dddd, [в] LT';
                    }
                }
            },
            lastWeek: function (now) {
                if (now.week() !== this.week()) {
                    switch (this.day()) {
                        case 0:
                            return '[В прошлое] dddd, [в] LT';
                        case 1:
                        case 2:
                        case 4:
                            return '[В прошлый] dddd, [в] LT';
                        case 3:
                        case 5:
                        case 6:
                            return '[В прошлую] dddd, [в] LT';
                    }
                } else {
                    if (this.day() === 2) {
                        return '[Во] dddd, [в] LT';
                    } else {
                        return '[В] dddd, [в] LT';
                    }
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'через %s',
            past : '%s назад',
            s : 'несколько секунд',
            ss : relativeTimeWithPlural,
            m : relativeTimeWithPlural,
            mm : relativeTimeWithPlural,
            h : 'час',
            hh : relativeTimeWithPlural,
            d : 'день',
            dd : relativeTimeWithPlural,
            M : 'месяц',
            MM : relativeTimeWithPlural,
            y : 'год',
            yy : relativeTimeWithPlural
        },
        meridiemParse: /ночи|утра|дня|вечера/i,
        isPM : function (input) {
            return /^(дня|вечера)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ночи';
            } else if (hour < 12) {
                return 'утра';
            } else if (hour < 17) {
                return 'дня';
            } else {
                return 'вечера';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'M':
                case 'd':
                case 'DDD':
                    return number + '-й';
                case 'D':
                    return number + '-го';
                case 'w':
                case 'W':
                    return number + '-я';
                default:
                    return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return ru;

})));


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var months = [
        'جنوري',
        'فيبروري',
        'مارچ',
        'اپريل',
        'مئي',
        'جون',
        'جولاءِ',
        'آگسٽ',
        'سيپٽمبر',
        'آڪٽوبر',
        'نومبر',
        'ڊسمبر'
    ];
    var days = [
        'آچر',
        'سومر',
        'اڱارو',
        'اربع',
        'خميس',
        'جمع',
        'ڇنڇر'
    ];

    var sd = moment.defineLocale('sd', {
        months : months,
        monthsShort : months,
        weekdays : days,
        weekdaysShort : days,
        weekdaysMin : days,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd، D MMMM YYYY HH:mm'
        },
        meridiemParse: /صبح|شام/,
        isPM : function (input) {
            return 'شام' === input;
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'صبح';
            }
            return 'شام';
        },
        calendar : {
            sameDay : '[اڄ] LT',
            nextDay : '[سڀاڻي] LT',
            nextWeek : 'dddd [اڳين هفتي تي] LT',
            lastDay : '[ڪالهه] LT',
            lastWeek : '[گزريل هفتي] dddd [تي] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s پوء',
            past : '%s اڳ',
            s : 'چند سيڪنڊ',
            ss : '%d سيڪنڊ',
            m : 'هڪ منٽ',
            mm : '%d منٽ',
            h : 'هڪ ڪلاڪ',
            hh : '%d ڪلاڪ',
            d : 'هڪ ڏينهن',
            dd : '%d ڏينهن',
            M : 'هڪ مهينو',
            MM : '%d مهينا',
            y : 'هڪ سال',
            yy : '%d سال'
        },
        preparse: function (string) {
            return string.replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/,/g, '،');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return sd;

})));


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var se = moment.defineLocale('se', {
        months : 'ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu'.split('_'),
        monthsShort : 'ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov'.split('_'),
        weekdays : 'sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat'.split('_'),
        weekdaysShort : 'sotn_vuos_maŋ_gask_duor_bear_láv'.split('_'),
        weekdaysMin : 's_v_m_g_d_b_L'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'MMMM D. [b.] YYYY',
            LLL : 'MMMM D. [b.] YYYY [ti.] HH:mm',
            LLLL : 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm'
        },
        calendar : {
            sameDay: '[otne ti] LT',
            nextDay: '[ihttin ti] LT',
            nextWeek: 'dddd [ti] LT',
            lastDay: '[ikte ti] LT',
            lastWeek: '[ovddit] dddd [ti] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : '%s geažes',
            past : 'maŋit %s',
            s : 'moadde sekunddat',
            ss: '%d sekunddat',
            m : 'okta minuhta',
            mm : '%d minuhtat',
            h : 'okta diimmu',
            hh : '%d diimmut',
            d : 'okta beaivi',
            dd : '%d beaivvit',
            M : 'okta mánnu',
            MM : '%d mánut',
            y : 'okta jahki',
            yy : '%d jagit'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return se;

})));


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    /*jshint -W100*/
    var si = moment.defineLocale('si', {
        months : 'ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්'.split('_'),
        monthsShort : 'ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ'.split('_'),
        weekdays : 'ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා'.split('_'),
        weekdaysShort : 'ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන'.split('_'),
        weekdaysMin : 'ඉ_ස_අ_බ_බ්‍ර_සි_සෙ'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'a h:mm',
            LTS : 'a h:mm:ss',
            L : 'YYYY/MM/DD',
            LL : 'YYYY MMMM D',
            LLL : 'YYYY MMMM D, a h:mm',
            LLLL : 'YYYY MMMM D [වැනි] dddd, a h:mm:ss'
        },
        calendar : {
            sameDay : '[අද] LT[ට]',
            nextDay : '[හෙට] LT[ට]',
            nextWeek : 'dddd LT[ට]',
            lastDay : '[ඊයේ] LT[ට]',
            lastWeek : '[පසුගිය] dddd LT[ට]',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%sකින්',
            past : '%sකට පෙර',
            s : 'තත්පර කිහිපය',
            ss : 'තත්පර %d',
            m : 'මිනිත්තුව',
            mm : 'මිනිත්තු %d',
            h : 'පැය',
            hh : 'පැය %d',
            d : 'දිනය',
            dd : 'දින %d',
            M : 'මාසය',
            MM : 'මාස %d',
            y : 'වසර',
            yy : 'වසර %d'
        },
        dayOfMonthOrdinalParse: /\d{1,2} වැනි/,
        ordinal : function (number) {
            return number + ' වැනි';
        },
        meridiemParse : /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
        isPM : function (input) {
            return input === 'ප.ව.' || input === 'පස් වරු';
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'ප.ව.' : 'පස් වරු';
            } else {
                return isLower ? 'පෙ.ව.' : 'පෙර වරු';
            }
        }
    });

    return si;

})));


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var months = 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_'),
        monthsShort = 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_');
    function plural(n) {
        return (n > 1) && (n < 5);
    }
    function translate(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':  // a few seconds / in a few seconds / a few seconds ago
                return (withoutSuffix || isFuture) ? 'pár sekúnd' : 'pár sekundami';
            case 'ss': // 9 seconds / in 9 seconds / 9 seconds ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'sekundy' : 'sekúnd');
                } else {
                    return result + 'sekundami';
                }
                break;
            case 'm':  // a minute / in a minute / a minute ago
                return withoutSuffix ? 'minúta' : (isFuture ? 'minútu' : 'minútou');
            case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'minúty' : 'minút');
                } else {
                    return result + 'minútami';
                }
                break;
            case 'h':  // an hour / in an hour / an hour ago
                return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
            case 'hh': // 9 hours / in 9 hours / 9 hours ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'hodiny' : 'hodín');
                } else {
                    return result + 'hodinami';
                }
                break;
            case 'd':  // a day / in a day / a day ago
                return (withoutSuffix || isFuture) ? 'deň' : 'dňom';
            case 'dd': // 9 days / in 9 days / 9 days ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'dni' : 'dní');
                } else {
                    return result + 'dňami';
                }
                break;
            case 'M':  // a month / in a month / a month ago
                return (withoutSuffix || isFuture) ? 'mesiac' : 'mesiacom';
            case 'MM': // 9 months / in 9 months / 9 months ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'mesiace' : 'mesiacov');
                } else {
                    return result + 'mesiacmi';
                }
                break;
            case 'y':  // a year / in a year / a year ago
                return (withoutSuffix || isFuture) ? 'rok' : 'rokom';
            case 'yy': // 9 years / in 9 years / 9 years ago
                if (withoutSuffix || isFuture) {
                    return result + (plural(number) ? 'roky' : 'rokov');
                } else {
                    return result + 'rokmi';
                }
                break;
        }
    }

    var sk = moment.defineLocale('sk', {
        months : months,
        monthsShort : monthsShort,
        weekdays : 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
        weekdaysShort : 'ne_po_ut_st_št_pi_so'.split('_'),
        weekdaysMin : 'ne_po_ut_st_št_pi_so'.split('_'),
        longDateFormat : {
            LT: 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd D. MMMM YYYY H:mm'
        },
        calendar : {
            sameDay: '[dnes o] LT',
            nextDay: '[zajtra o] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[v nedeľu o] LT';
                    case 1:
                    case 2:
                        return '[v] dddd [o] LT';
                    case 3:
                        return '[v stredu o] LT';
                    case 4:
                        return '[vo štvrtok o] LT';
                    case 5:
                        return '[v piatok o] LT';
                    case 6:
                        return '[v sobotu o] LT';
                }
            },
            lastDay: '[včera o] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[minulú nedeľu o] LT';
                    case 1:
                    case 2:
                        return '[minulý] dddd [o] LT';
                    case 3:
                        return '[minulú stredu o] LT';
                    case 4:
                    case 5:
                        return '[minulý] dddd [o] LT';
                    case 6:
                        return '[minulú sobotu o] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'za %s',
            past : 'pred %s',
            s : translate,
            ss : translate,
            m : translate,
            mm : translate,
            h : translate,
            hh : translate,
            d : translate,
            dd : translate,
            M : translate,
            MM : translate,
            y : translate,
            yy : translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return sk;

})));


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var result = number + ' ';
        switch (key) {
            case 's':
                return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';
            case 'ss':
                if (number === 1) {
                    result += withoutSuffix ? 'sekundo' : 'sekundi';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'sekundi' : 'sekundah';
                } else if (number < 5) {
                    result += withoutSuffix || isFuture ? 'sekunde' : 'sekundah';
                } else {
                    result += 'sekund';
                }
                return result;
            case 'm':
                return withoutSuffix ? 'ena minuta' : 'eno minuto';
            case 'mm':
                if (number === 1) {
                    result += withoutSuffix ? 'minuta' : 'minuto';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'minuti' : 'minutama';
                } else if (number < 5) {
                    result += withoutSuffix || isFuture ? 'minute' : 'minutami';
                } else {
                    result += withoutSuffix || isFuture ? 'minut' : 'minutami';
                }
                return result;
            case 'h':
                return withoutSuffix ? 'ena ura' : 'eno uro';
            case 'hh':
                if (number === 1) {
                    result += withoutSuffix ? 'ura' : 'uro';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'uri' : 'urama';
                } else if (number < 5) {
                    result += withoutSuffix || isFuture ? 'ure' : 'urami';
                } else {
                    result += withoutSuffix || isFuture ? 'ur' : 'urami';
                }
                return result;
            case 'd':
                return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';
            case 'dd':
                if (number === 1) {
                    result += withoutSuffix || isFuture ? 'dan' : 'dnem';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'dni' : 'dnevoma';
                } else {
                    result += withoutSuffix || isFuture ? 'dni' : 'dnevi';
                }
                return result;
            case 'M':
                return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';
            case 'MM':
                if (number === 1) {
                    result += withoutSuffix || isFuture ? 'mesec' : 'mesecem';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'meseca' : 'mesecema';
                } else if (number < 5) {
                    result += withoutSuffix || isFuture ? 'mesece' : 'meseci';
                } else {
                    result += withoutSuffix || isFuture ? 'mesecev' : 'meseci';
                }
                return result;
            case 'y':
                return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';
            case 'yy':
                if (number === 1) {
                    result += withoutSuffix || isFuture ? 'leto' : 'letom';
                } else if (number === 2) {
                    result += withoutSuffix || isFuture ? 'leti' : 'letoma';
                } else if (number < 5) {
                    result += withoutSuffix || isFuture ? 'leta' : 'leti';
                } else {
                    result += withoutSuffix || isFuture ? 'let' : 'leti';
                }
                return result;
        }
    }

    var sl = moment.defineLocale('sl', {
        months : 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
        monthsShort : 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays : 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
        weekdaysShort : 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
        weekdaysMin : 'ne_po_to_sr_če_pe_so'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM YYYY',
            LLL : 'D. MMMM YYYY H:mm',
            LLLL : 'dddd, D. MMMM YYYY H:mm'
        },
        calendar : {
            sameDay  : '[danes ob] LT',
            nextDay  : '[jutri ob] LT',

            nextWeek : function () {
                switch (this.day()) {
                    case 0:
                        return '[v] [nedeljo] [ob] LT';
                    case 3:
                        return '[v] [sredo] [ob] LT';
                    case 6:
                        return '[v] [soboto] [ob] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[v] dddd [ob] LT';
                }
            },
            lastDay  : '[včeraj ob] LT',
            lastWeek : function () {
                switch (this.day()) {
                    case 0:
                        return '[prejšnjo] [nedeljo] [ob] LT';
                    case 3:
                        return '[prejšnjo] [sredo] [ob] LT';
                    case 6:
                        return '[prejšnjo] [soboto] [ob] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[prejšnji] dddd [ob] LT';
                }
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'čez %s',
            past   : 'pred %s',
            s      : processRelativeTime,
            ss     : processRelativeTime,
            m      : processRelativeTime,
            mm     : processRelativeTime,
            h      : processRelativeTime,
            hh     : processRelativeTime,
            d      : processRelativeTime,
            dd     : processRelativeTime,
            M      : processRelativeTime,
            MM     : processRelativeTime,
            y      : processRelativeTime,
            yy     : processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return sl;

})));


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var sq = moment.defineLocale('sq', {
        months : 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
        monthsShort : 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
        weekdays : 'E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
        weekdaysShort : 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
        weekdaysMin : 'D_H_Ma_Më_E_P_Sh'.split('_'),
        weekdaysParseExact : true,
        meridiemParse: /PD|MD/,
        isPM: function (input) {
            return input.charAt(0) === 'M';
        },
        meridiem : function (hours, minutes, isLower) {
            return hours < 12 ? 'PD' : 'MD';
        },
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Sot në] LT',
            nextDay : '[Nesër në] LT',
            nextWeek : 'dddd [në] LT',
            lastDay : '[Dje në] LT',
            lastWeek : 'dddd [e kaluar në] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'në %s',
            past : '%s më parë',
            s : 'disa sekonda',
            ss : '%d sekonda',
            m : 'një minutë',
            mm : '%d minuta',
            h : 'një orë',
            hh : '%d orë',
            d : 'një ditë',
            dd : '%d ditë',
            M : 'një muaj',
            MM : '%d muaj',
            y : 'një vit',
            yy : '%d vite'
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return sq;

})));


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var translator = {
        words: { //Different grammatical cases
            ss: ['секунда', 'секунде', 'секунди'],
            m: ['један минут', 'једне минуте'],
            mm: ['минут', 'минуте', 'минута'],
            h: ['један сат', 'једног сата'],
            hh: ['сат', 'сата', 'сати'],
            dd: ['дан', 'дана', 'дана'],
            MM: ['месец', 'месеца', 'месеци'],
            yy: ['година', 'године', 'година']
        },
        correctGrammaticalCase: function (number, wordKey) {
            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
        },
        translate: function (number, withoutSuffix, key) {
            var wordKey = translator.words[key];
            if (key.length === 1) {
                return withoutSuffix ? wordKey[0] : wordKey[1];
            } else {
                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
            }
        }
    };

    var srCyrl = moment.defineLocale('sr-cyrl', {
        months: 'јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар'.split('_'),
        monthsShort: 'јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.'.split('_'),
        monthsParseExact: true,
        weekdays: 'недеља_понедељак_уторак_среда_четвртак_петак_субота'.split('_'),
        weekdaysShort: 'нед._пон._уто._сре._чет._пет._суб.'.split('_'),
        weekdaysMin: 'не_по_ут_ср_че_пе_су'.split('_'),
        weekdaysParseExact : true,
        longDateFormat: {
            LT: 'H:mm',
            LTS : 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[данас у] LT',
            nextDay: '[сутра у] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[у] [недељу] [у] LT';
                    case 3:
                        return '[у] [среду] [у] LT';
                    case 6:
                        return '[у] [суботу] [у] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[у] dddd [у] LT';
                }
            },
            lastDay  : '[јуче у] LT',
            lastWeek : function () {
                var lastWeekDays = [
                    '[прошле] [недеље] [у] LT',
                    '[прошлог] [понедељка] [у] LT',
                    '[прошлог] [уторка] [у] LT',
                    '[прошле] [среде] [у] LT',
                    '[прошлог] [четвртка] [у] LT',
                    '[прошлог] [петка] [у] LT',
                    '[прошле] [суботе] [у] LT'
                ];
                return lastWeekDays[this.day()];
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'за %s',
            past   : 'пре %s',
            s      : 'неколико секунди',
            ss     : translator.translate,
            m      : translator.translate,
            mm     : translator.translate,
            h      : translator.translate,
            hh     : translator.translate,
            d      : 'дан',
            dd     : translator.translate,
            M      : 'месец',
            MM     : translator.translate,
            y      : 'годину',
            yy     : translator.translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return srCyrl;

})));


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var translator = {
        words: { //Different grammatical cases
            ss: ['sekunda', 'sekunde', 'sekundi'],
            m: ['jedan minut', 'jedne minute'],
            mm: ['minut', 'minute', 'minuta'],
            h: ['jedan sat', 'jednog sata'],
            hh: ['sat', 'sata', 'sati'],
            dd: ['dan', 'dana', 'dana'],
            MM: ['mesec', 'meseca', 'meseci'],
            yy: ['godina', 'godine', 'godina']
        },
        correctGrammaticalCase: function (number, wordKey) {
            return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
        },
        translate: function (number, withoutSuffix, key) {
            var wordKey = translator.words[key];
            if (key.length === 1) {
                return withoutSuffix ? wordKey[0] : wordKey[1];
            } else {
                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
            }
        }
    };

    var sr = moment.defineLocale('sr', {
        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
        monthsParseExact: true,
        weekdays: 'nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota'.split('_'),
        weekdaysShort: 'ned._pon._uto._sre._čet._pet._sub.'.split('_'),
        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
        weekdaysParseExact : true,
        longDateFormat: {
            LT: 'H:mm',
            LTS : 'H:mm:ss',
            L: 'DD.MM.YYYY',
            LL: 'D. MMMM YYYY',
            LLL: 'D. MMMM YYYY H:mm',
            LLLL: 'dddd, D. MMMM YYYY H:mm'
        },
        calendar: {
            sameDay: '[danas u] LT',
            nextDay: '[sutra u] LT',
            nextWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[u] [nedelju] [u] LT';
                    case 3:
                        return '[u] [sredu] [u] LT';
                    case 6:
                        return '[u] [subotu] [u] LT';
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return '[u] dddd [u] LT';
                }
            },
            lastDay  : '[juče u] LT',
            lastWeek : function () {
                var lastWeekDays = [
                    '[prošle] [nedelje] [u] LT',
                    '[prošlog] [ponedeljka] [u] LT',
                    '[prošlog] [utorka] [u] LT',
                    '[prošle] [srede] [u] LT',
                    '[prošlog] [četvrtka] [u] LT',
                    '[prošlog] [petka] [u] LT',
                    '[prošle] [subote] [u] LT'
                ];
                return lastWeekDays[this.day()];
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : 'za %s',
            past   : 'pre %s',
            s      : 'nekoliko sekundi',
            ss     : translator.translate,
            m      : translator.translate,
            mm     : translator.translate,
            h      : translator.translate,
            hh     : translator.translate,
            d      : 'dan',
            dd     : translator.translate,
            M      : 'mesec',
            MM     : translator.translate,
            y      : 'godinu',
            yy     : translator.translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return sr;

})));


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var ss = moment.defineLocale('ss', {
        months : "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split('_'),
        monthsShort : 'Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo'.split('_'),
        weekdays : 'Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo'.split('_'),
        weekdaysShort : 'Lis_Umb_Lsb_Les_Lsi_Lsh_Umg'.split('_'),
        weekdaysMin : 'Li_Us_Lb_Lt_Ls_Lh_Ug'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendar : {
            sameDay : '[Namuhla nga] LT',
            nextDay : '[Kusasa nga] LT',
            nextWeek : 'dddd [nga] LT',
            lastDay : '[Itolo nga] LT',
            lastWeek : 'dddd [leliphelile] [nga] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'nga %s',
            past : 'wenteka nga %s',
            s : 'emizuzwana lomcane',
            ss : '%d mzuzwana',
            m : 'umzuzu',
            mm : '%d emizuzu',
            h : 'lihora',
            hh : '%d emahora',
            d : 'lilanga',
            dd : '%d emalanga',
            M : 'inyanga',
            MM : '%d tinyanga',
            y : 'umnyaka',
            yy : '%d iminyaka'
        },
        meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
        meridiem : function (hours, minutes, isLower) {
            if (hours < 11) {
                return 'ekuseni';
            } else if (hours < 15) {
                return 'emini';
            } else if (hours < 19) {
                return 'entsambama';
            } else {
                return 'ebusuku';
            }
        },
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'ekuseni') {
                return hour;
            } else if (meridiem === 'emini') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'entsambama' || meridiem === 'ebusuku') {
                if (hour === 0) {
                    return 0;
                }
                return hour + 12;
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}/,
        ordinal : '%d',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return ss;

})));


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var sv = moment.defineLocale('sv', {
        months : 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
        monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
        weekdays : 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
        weekdaysShort : 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
        weekdaysMin : 'sö_må_ti_on_to_fr_lö'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY [kl.] HH:mm',
            LLLL : 'dddd D MMMM YYYY [kl.] HH:mm',
            lll : 'D MMM YYYY HH:mm',
            llll : 'ddd D MMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Idag] LT',
            nextDay: '[Imorgon] LT',
            lastDay: '[Igår] LT',
            nextWeek: '[På] dddd LT',
            lastWeek: '[I] dddd[s] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'om %s',
            past : 'för %s sedan',
            s : 'några sekunder',
            ss : '%d sekunder',
            m : 'en minut',
            mm : '%d minuter',
            h : 'en timme',
            hh : '%d timmar',
            d : 'en dag',
            dd : '%d dagar',
            M : 'en månad',
            MM : '%d månader',
            y : 'ett år',
            yy : '%d år'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(e|a)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'e' :
                (b === 1) ? 'a' :
                (b === 2) ? 'a' :
                (b === 3) ? 'e' : 'e';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return sv;

})));


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var sw = moment.defineLocale('sw', {
        months : 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split('_'),
        monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
        weekdays : 'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split('_'),
        weekdaysShort : 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
        weekdaysMin : 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[leo saa] LT',
            nextDay : '[kesho saa] LT',
            nextWeek : '[wiki ijayo] dddd [saat] LT',
            lastDay : '[jana] LT',
            lastWeek : '[wiki iliyopita] dddd [saat] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s baadaye',
            past : 'tokea %s',
            s : 'hivi punde',
            ss : 'sekunde %d',
            m : 'dakika moja',
            mm : 'dakika %d',
            h : 'saa limoja',
            hh : 'masaa %d',
            d : 'siku moja',
            dd : 'masiku %d',
            M : 'mwezi mmoja',
            MM : 'miezi %d',
            y : 'mwaka mmoja',
            yy : 'miaka %d'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return sw;

})));


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var symbolMap = {
        '1': '௧',
        '2': '௨',
        '3': '௩',
        '4': '௪',
        '5': '௫',
        '6': '௬',
        '7': '௭',
        '8': '௮',
        '9': '௯',
        '0': '௦'
    }, numberMap = {
        '௧': '1',
        '௨': '2',
        '௩': '3',
        '௪': '4',
        '௫': '5',
        '௬': '6',
        '௭': '7',
        '௮': '8',
        '௯': '9',
        '௦': '0'
    };

    var ta = moment.defineLocale('ta', {
        months : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
        monthsShort : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
        weekdays : 'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split('_'),
        weekdaysShort : 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split('_'),
        weekdaysMin : 'ஞா_தி_செ_பு_வி_வெ_ச'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, HH:mm',
            LLLL : 'dddd, D MMMM YYYY, HH:mm'
        },
        calendar : {
            sameDay : '[இன்று] LT',
            nextDay : '[நாளை] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[நேற்று] LT',
            lastWeek : '[கடந்த வாரம்] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s இல்',
            past : '%s முன்',
            s : 'ஒரு சில விநாடிகள்',
            ss : '%d விநாடிகள்',
            m : 'ஒரு நிமிடம்',
            mm : '%d நிமிடங்கள்',
            h : 'ஒரு மணி நேரம்',
            hh : '%d மணி நேரம்',
            d : 'ஒரு நாள்',
            dd : '%d நாட்கள்',
            M : 'ஒரு மாதம்',
            MM : '%d மாதங்கள்',
            y : 'ஒரு வருடம்',
            yy : '%d ஆண்டுகள்'
        },
        dayOfMonthOrdinalParse: /\d{1,2}வது/,
        ordinal : function (number) {
            return number + 'வது';
        },
        preparse: function (string) {
            return string.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        // refer http://ta.wikipedia.org/s/1er1
        meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
        meridiem : function (hour, minute, isLower) {
            if (hour < 2) {
                return ' யாமம்';
            } else if (hour < 6) {
                return ' வைகறை';  // வைகறை
            } else if (hour < 10) {
                return ' காலை'; // காலை
            } else if (hour < 14) {
                return ' நண்பகல்'; // நண்பகல்
            } else if (hour < 18) {
                return ' எற்பாடு'; // எற்பாடு
            } else if (hour < 22) {
                return ' மாலை'; // மாலை
            } else {
                return ' யாமம்';
            }
        },
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'யாமம்') {
                return hour < 2 ? hour : hour + 12;
            } else if (meridiem === 'வைகறை' || meridiem === 'காலை') {
                return hour;
            } else if (meridiem === 'நண்பகல்') {
                return hour >= 10 ? hour : hour + 12;
            } else {
                return hour + 12;
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    return ta;

})));


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var te = moment.defineLocale('te', {
        months : 'జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్'.split('_'),
        monthsShort : 'జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.'.split('_'),
        monthsParseExact : true,
        weekdays : 'ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం'.split('_'),
        weekdaysShort : 'ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని'.split('_'),
        weekdaysMin : 'ఆ_సో_మం_బు_గు_శు_శ'.split('_'),
        longDateFormat : {
            LT : 'A h:mm',
            LTS : 'A h:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY, A h:mm',
            LLLL : 'dddd, D MMMM YYYY, A h:mm'
        },
        calendar : {
            sameDay : '[నేడు] LT',
            nextDay : '[రేపు] LT',
            nextWeek : 'dddd, LT',
            lastDay : '[నిన్న] LT',
            lastWeek : '[గత] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s లో',
            past : '%s క్రితం',
            s : 'కొన్ని క్షణాలు',
            ss : '%d సెకన్లు',
            m : 'ఒక నిమిషం',
            mm : '%d నిమిషాలు',
            h : 'ఒక గంట',
            hh : '%d గంటలు',
            d : 'ఒక రోజు',
            dd : '%d రోజులు',
            M : 'ఒక నెల',
            MM : '%d నెలలు',
            y : 'ఒక సంవత్సరం',
            yy : '%d సంవత్సరాలు'
        },
        dayOfMonthOrdinalParse : /\d{1,2}వ/,
        ordinal : '%dవ',
        meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'రాత్రి') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'ఉదయం') {
                return hour;
            } else if (meridiem === 'మధ్యాహ్నం') {
                return hour >= 10 ? hour : hour + 12;
            } else if (meridiem === 'సాయంత్రం') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'రాత్రి';
            } else if (hour < 10) {
                return 'ఉదయం';
            } else if (hour < 17) {
                return 'మధ్యాహ్నం';
            } else if (hour < 20) {
                return 'సాయంత్రం';
            } else {
                return 'రాత్రి';
            }
        },
        week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 6th is the first week of the year.
        }
    });

    return te;

})));


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var tet = moment.defineLocale('tet', {
        months : 'Janeiru_Fevereiru_Marsu_Abril_Maiu_Juñu_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru'.split('_'),
        monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
        weekdays : 'Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu'.split('_'),
        weekdaysShort : 'Dom_Seg_Ters_Kua_Kint_Sest_Sab'.split('_'),
        weekdaysMin : 'Do_Seg_Te_Ku_Ki_Ses_Sa'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Ohin iha] LT',
            nextDay: '[Aban iha] LT',
            nextWeek: 'dddd [iha] LT',
            lastDay: '[Horiseik iha] LT',
            lastWeek: 'dddd [semana kotuk] [iha] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'iha %s',
            past : '%s liuba',
            s : 'minutu balun',
            ss : 'minutu %d',
            m : 'minutu ida',
            mm : 'minutu %d',
            h : 'oras ida',
            hh : 'oras %d',
            d : 'loron ida',
            dd : 'loron %d',
            M : 'fulan ida',
            MM : 'fulan %d',
            y : 'tinan ida',
            yy : 'tinan %d'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return tet;

})));


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var suffixes = {
        0: '-ум',
        1: '-ум',
        2: '-юм',
        3: '-юм',
        4: '-ум',
        5: '-ум',
        6: '-ум',
        7: '-ум',
        8: '-ум',
        9: '-ум',
        10: '-ум',
        12: '-ум',
        13: '-ум',
        20: '-ум',
        30: '-юм',
        40: '-ум',
        50: '-ум',
        60: '-ум',
        70: '-ум',
        80: '-ум',
        90: '-ум',
        100: '-ум'
    };

    var tg = moment.defineLocale('tg', {
        months : 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
        monthsShort : 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
        weekdays : 'якшанбе_душанбе_сешанбе_чоршанбе_панҷшанбе_ҷумъа_шанбе'.split('_'),
        weekdaysShort : 'яшб_дшб_сшб_чшб_пшб_ҷум_шнб'.split('_'),
        weekdaysMin : 'яш_дш_сш_чш_пш_ҷм_шб'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Имрӯз соати] LT',
            nextDay : '[Пагоҳ соати] LT',
            lastDay : '[Дирӯз соати] LT',
            nextWeek : 'dddd[и] [ҳафтаи оянда соати] LT',
            lastWeek : 'dddd[и] [ҳафтаи гузашта соати] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'баъди %s',
            past : '%s пеш',
            s : 'якчанд сония',
            m : 'як дақиқа',
            mm : '%d дақиқа',
            h : 'як соат',
            hh : '%d соат',
            d : 'як рӯз',
            dd : '%d рӯз',
            M : 'як моҳ',
            MM : '%d моҳ',
            y : 'як сол',
            yy : '%d сол'
        },
        meridiemParse: /шаб|субҳ|рӯз|бегоҳ/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'шаб') {
                return hour < 4 ? hour : hour + 12;
            } else if (meridiem === 'субҳ') {
                return hour;
            } else if (meridiem === 'рӯз') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === 'бегоҳ') {
                return hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 4) {
                return 'шаб';
            } else if (hour < 11) {
                return 'субҳ';
            } else if (hour < 16) {
                return 'рӯз';
            } else if (hour < 19) {
                return 'бегоҳ';
            } else {
                return 'шаб';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(ум|юм)/,
        ordinal: function (number) {
            var a = number % 10,
                b = number >= 100 ? 100 : null;
            return number + (suffixes[number] || suffixes[a] || suffixes[b]);
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1th is the first week of the year.
        }
    });

    return tg;

})));


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var th = moment.defineLocale('th', {
        months : 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
        monthsShort : 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_'),
        monthsParseExact: true,
        weekdays : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
        weekdaysShort : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'), // yes, three characters difference
        weekdaysMin : 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY เวลา H:mm',
            LLLL : 'วันddddที่ D MMMM YYYY เวลา H:mm'
        },
        meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
        isPM: function (input) {
            return input === 'หลังเที่ยง';
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ก่อนเที่ยง';
            } else {
                return 'หลังเที่ยง';
            }
        },
        calendar : {
            sameDay : '[วันนี้ เวลา] LT',
            nextDay : '[พรุ่งนี้ เวลา] LT',
            nextWeek : 'dddd[หน้า เวลา] LT',
            lastDay : '[เมื่อวานนี้ เวลา] LT',
            lastWeek : '[วัน]dddd[ที่แล้ว เวลา] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'อีก %s',
            past : '%sที่แล้ว',
            s : 'ไม่กี่วินาที',
            ss : '%d วินาที',
            m : '1 นาที',
            mm : '%d นาที',
            h : '1 ชั่วโมง',
            hh : '%d ชั่วโมง',
            d : '1 วัน',
            dd : '%d วัน',
            M : '1 เดือน',
            MM : '%d เดือน',
            y : '1 ปี',
            yy : '%d ปี'
        }
    });

    return th;

})));


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var tlPh = moment.defineLocale('tl-ph', {
        months : 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
        monthsShort : 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
        weekdays : 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
        weekdaysShort : 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
        weekdaysMin : 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'MM/D/YYYY',
            LL : 'MMMM D, YYYY',
            LLL : 'MMMM D, YYYY HH:mm',
            LLLL : 'dddd, MMMM DD, YYYY HH:mm'
        },
        calendar : {
            sameDay: 'LT [ngayong araw]',
            nextDay: '[Bukas ng] LT',
            nextWeek: 'LT [sa susunod na] dddd',
            lastDay: 'LT [kahapon]',
            lastWeek: 'LT [noong nakaraang] dddd',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'sa loob ng %s',
            past : '%s ang nakalipas',
            s : 'ilang segundo',
            ss : '%d segundo',
            m : 'isang minuto',
            mm : '%d minuto',
            h : 'isang oras',
            hh : '%d oras',
            d : 'isang araw',
            dd : '%d araw',
            M : 'isang buwan',
            MM : '%d buwan',
            y : 'isang taon',
            yy : '%d taon'
        },
        dayOfMonthOrdinalParse: /\d{1,2}/,
        ordinal : function (number) {
            return number;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return tlPh;

})));


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var numbersNouns = 'pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut'.split('_');

    function translateFuture(output) {
        var time = output;
        time = (output.indexOf('jaj') !== -1) ?
        time.slice(0, -3) + 'leS' :
        (output.indexOf('jar') !== -1) ?
        time.slice(0, -3) + 'waQ' :
        (output.indexOf('DIS') !== -1) ?
        time.slice(0, -3) + 'nem' :
        time + ' pIq';
        return time;
    }

    function translatePast(output) {
        var time = output;
        time = (output.indexOf('jaj') !== -1) ?
        time.slice(0, -3) + 'Hu’' :
        (output.indexOf('jar') !== -1) ?
        time.slice(0, -3) + 'wen' :
        (output.indexOf('DIS') !== -1) ?
        time.slice(0, -3) + 'ben' :
        time + ' ret';
        return time;
    }

    function translate(number, withoutSuffix, string, isFuture) {
        var numberNoun = numberAsNoun(number);
        switch (string) {
            case 'ss':
                return numberNoun + ' lup';
            case 'mm':
                return numberNoun + ' tup';
            case 'hh':
                return numberNoun + ' rep';
            case 'dd':
                return numberNoun + ' jaj';
            case 'MM':
                return numberNoun + ' jar';
            case 'yy':
                return numberNoun + ' DIS';
        }
    }

    function numberAsNoun(number) {
        var hundred = Math.floor((number % 1000) / 100),
        ten = Math.floor((number % 100) / 10),
        one = number % 10,
        word = '';
        if (hundred > 0) {
            word += numbersNouns[hundred] + 'vatlh';
        }
        if (ten > 0) {
            word += ((word !== '') ? ' ' : '') + numbersNouns[ten] + 'maH';
        }
        if (one > 0) {
            word += ((word !== '') ? ' ' : '') + numbersNouns[one];
        }
        return (word === '') ? 'pagh' : word;
    }

    var tlh = moment.defineLocale('tlh', {
        months : 'tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’'.split('_'),
        monthsShort : 'jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’'.split('_'),
        monthsParseExact : true,
        weekdays : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
        weekdaysShort : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
        weekdaysMin : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[DaHjaj] LT',
            nextDay: '[wa’leS] LT',
            nextWeek: 'LLL',
            lastDay: '[wa’Hu’] LT',
            lastWeek: 'LLL',
            sameElse: 'L'
        },
        relativeTime : {
            future : translateFuture,
            past : translatePast,
            s : 'puS lup',
            ss : translate,
            m : 'wa’ tup',
            mm : translate,
            h : 'wa’ rep',
            hh : translate,
            d : 'wa’ jaj',
            dd : translate,
            M : 'wa’ jar',
            MM : translate,
            y : 'wa’ DIS',
            yy : translate
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return tlh;

})));


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {


;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

    var suffixes = {
        1: '\'inci',
        5: '\'inci',
        8: '\'inci',
        70: '\'inci',
        80: '\'inci',
        2: '\'nci',
        7: '\'nci',
        20: '\'nci',
        50: '\'nci',
        3: '\'üncü',
        4: '\'üncü',
        100: '\'üncü',
        6: '\'ncı',
        9: '\'uncu',
        10: '\'uncu',
        30: '\'uncu',
        60: '\'ıncı',
        90: '\'ıncı'
    };

    var tr = moment.defineLocale('tr', {
        months : 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
        monthsShort : 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
        weekdays : 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
        weekdaysShort : 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
        weekdaysMin : 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[bugün saat] LT',
            nextDay : '[yarın saat] LT',
            nextWeek : '[gelecek] dddd [saat] LT',
            lastDay : '[dün] LT',
            lastWeek : '[geçen] dddd [saat] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s sonra',
            past : '%s önce',
            s : 'birkaç saniye',
            ss : '%d saniye',
            m : 'bir dakika',
            mm : '%d dakika',
            h : 'bir saat',
            hh : '%d saat',
            d : 'bir gün',
            dd : '%d gün',
            M : 'bir ay',
            MM : '%d ay',
            y : 'bir yıl',
            yy : '%d yıl'
        },
        ordinal: function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'Do':
                case 'DD':
                    return number;
                default:
                    if (number === 0) {  // special case for zero
                        return number + '\'ıncı';
                    }
                    var a = number % 10,
                        b = number % 100 - a,
                        c = number >= 100 ? 100 : null;
                    return number + (suffixes[a] || suffixes[b] || suffixes[c]);
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return tr;

})));


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    // After the year there should be a slash and the amount of years since December 26, 1979 in Roman numerals.
    // This is currently too difficult (maybe even impossible) to add.
    var tzl = moment.defineLocale('tzl', {
        months : 'Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar'.split('_'),
        monthsShort : 'Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
        weekdays : 'Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi'.split('_'),
        weekdaysShort : 'Súl_Lún_Mai_Már_Xhú_Vié_Sát'.split('_'),
        weekdaysMin : 'Sú_Lú_Ma_Má_Xh_Vi_Sá'.split('_'),
        longDateFormat : {
            LT : 'HH.mm',
            LTS : 'HH.mm.ss',
            L : 'DD.MM.YYYY',
            LL : 'D. MMMM [dallas] YYYY',
            LLL : 'D. MMMM [dallas] YYYY HH.mm',
            LLLL : 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
        },
        meridiemParse: /d\'o|d\'a/i,
        isPM : function (input) {
            return 'd\'o' === input.toLowerCase();
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'd\'o' : 'D\'O';
            } else {
                return isLower ? 'd\'a' : 'D\'A';
            }
        },
        calendar : {
            sameDay : '[oxhi à] LT',
            nextDay : '[demà à] LT',
            nextWeek : 'dddd [à] LT',
            lastDay : '[ieiri à] LT',
            lastWeek : '[sür el] dddd [lasteu à] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'osprei %s',
            past : 'ja%s',
            s : processRelativeTime,
            ss : processRelativeTime,
            m : processRelativeTime,
            mm : processRelativeTime,
            h : processRelativeTime,
            hh : processRelativeTime,
            d : processRelativeTime,
            dd : processRelativeTime,
            M : processRelativeTime,
            MM : processRelativeTime,
            y : processRelativeTime,
            yy : processRelativeTime
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    function processRelativeTime(number, withoutSuffix, key, isFuture) {
        var format = {
            's': ['viensas secunds', '\'iensas secunds'],
            'ss': [number + ' secunds', '' + number + ' secunds'],
            'm': ['\'n míut', '\'iens míut'],
            'mm': [number + ' míuts', '' + number + ' míuts'],
            'h': ['\'n þora', '\'iensa þora'],
            'hh': [number + ' þoras', '' + number + ' þoras'],
            'd': ['\'n ziua', '\'iensa ziua'],
            'dd': [number + ' ziuas', '' + number + ' ziuas'],
            'M': ['\'n mes', '\'iens mes'],
            'MM': [number + ' mesen', '' + number + ' mesen'],
            'y': ['\'n ar', '\'iens ar'],
            'yy': [number + ' ars', '' + number + ' ars']
        };
        return isFuture ? format[key][0] : (withoutSuffix ? format[key][0] : format[key][1]);
    }

    return tzl;

})));


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var tzmLatn = moment.defineLocale('tzm-latn', {
        months : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
        monthsShort : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
        weekdays : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
        weekdaysShort : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
        weekdaysMin : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[asdkh g] LT',
            nextDay: '[aska g] LT',
            nextWeek: 'dddd [g] LT',
            lastDay: '[assant g] LT',
            lastWeek: 'dddd [g] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'dadkh s yan %s',
            past : 'yan %s',
            s : 'imik',
            ss : '%d imik',
            m : 'minuḍ',
            mm : '%d minuḍ',
            h : 'saɛa',
            hh : '%d tassaɛin',
            d : 'ass',
            dd : '%d ossan',
            M : 'ayowr',
            MM : '%d iyyirn',
            y : 'asgas',
            yy : '%d isgasn'
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 12th is the first week of the year.
        }
    });

    return tzmLatn;

})));


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var tzm = moment.defineLocale('tzm', {
        months : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
        monthsShort : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
        weekdays : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
        weekdaysShort : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
        weekdaysMin : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS: 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[ⴰⵙⴷⵅ ⴴ] LT',
            nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
            nextWeek: 'dddd [ⴴ] LT',
            lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
            lastWeek: 'dddd [ⴴ] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
            past : 'ⵢⴰⵏ %s',
            s : 'ⵉⵎⵉⴽ',
            ss : '%d ⵉⵎⵉⴽ',
            m : 'ⵎⵉⵏⵓⴺ',
            mm : '%d ⵎⵉⵏⵓⴺ',
            h : 'ⵙⴰⵄⴰ',
            hh : '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
            d : 'ⴰⵙⵙ',
            dd : '%d oⵙⵙⴰⵏ',
            M : 'ⴰⵢoⵓⵔ',
            MM : '%d ⵉⵢⵢⵉⵔⵏ',
            y : 'ⴰⵙⴳⴰⵙ',
            yy : '%d ⵉⵙⴳⴰⵙⵏ'
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 12th is the first week of the year.
        }
    });

    return tzm;

})));


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js language configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var ugCn = moment.defineLocale('ug-cn', {
        months: 'يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر'.split(
            '_'
        ),
        monthsShort: 'يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر'.split(
            '_'
        ),
        weekdays: 'يەكشەنبە_دۈشەنبە_سەيشەنبە_چارشەنبە_پەيشەنبە_جۈمە_شەنبە'.split(
            '_'
        ),
        weekdaysShort: 'يە_دۈ_سە_چا_پە_جۈ_شە'.split('_'),
        weekdaysMin: 'يە_دۈ_سە_چا_پە_جۈ_شە'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY-MM-DD',
            LL: 'YYYY-يىلىM-ئاينىڭD-كۈنى',
            LLL: 'YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm',
            LLLL: 'dddd، YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm'
        },
        meridiemParse: /يېرىم كېچە|سەھەر|چۈشتىن بۇرۇن|چۈش|چۈشتىن كېيىن|كەچ/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (
                meridiem === 'يېرىم كېچە' ||
                meridiem === 'سەھەر' ||
                meridiem === 'چۈشتىن بۇرۇن'
            ) {
                return hour;
            } else if (meridiem === 'چۈشتىن كېيىن' || meridiem === 'كەچ') {
                return hour + 12;
            } else {
                return hour >= 11 ? hour : hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return 'يېرىم كېچە';
            } else if (hm < 900) {
                return 'سەھەر';
            } else if (hm < 1130) {
                return 'چۈشتىن بۇرۇن';
            } else if (hm < 1230) {
                return 'چۈش';
            } else if (hm < 1800) {
                return 'چۈشتىن كېيىن';
            } else {
                return 'كەچ';
            }
        },
        calendar: {
            sameDay: '[بۈگۈن سائەت] LT',
            nextDay: '[ئەتە سائەت] LT',
            nextWeek: '[كېلەركى] dddd [سائەت] LT',
            lastDay: '[تۆنۈگۈن] LT',
            lastWeek: '[ئالدىنقى] dddd [سائەت] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s كېيىن',
            past: '%s بۇرۇن',
            s: 'نەچچە سېكونت',
            ss: '%d سېكونت',
            m: 'بىر مىنۇت',
            mm: '%d مىنۇت',
            h: 'بىر سائەت',
            hh: '%d سائەت',
            d: 'بىر كۈن',
            dd: '%d كۈن',
            M: 'بىر ئاي',
            MM: '%d ئاي',
            y: 'بىر يىل',
            yy: '%d يىل'
        },

        dayOfMonthOrdinalParse: /\d{1,2}(-كۈنى|-ئاي|-ھەپتە)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '-كۈنى';
                case 'w':
                case 'W':
                    return number + '-ھەپتە';
                default:
                    return number;
            }
        },
        preparse: function (string) {
            return string.replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/,/g, '،');
        },
        week: {
            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ugCn;

})));


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
    }
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'ss': withoutSuffix ? 'секунда_секунди_секунд' : 'секунду_секунди_секунд',
            'mm': withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
            'hh': withoutSuffix ? 'година_години_годин' : 'годину_години_годин',
            'dd': 'день_дні_днів',
            'MM': 'місяць_місяці_місяців',
            'yy': 'рік_роки_років'
        };
        if (key === 'm') {
            return withoutSuffix ? 'хвилина' : 'хвилину';
        }
        else if (key === 'h') {
            return withoutSuffix ? 'година' : 'годину';
        }
        else {
            return number + ' ' + plural(format[key], +number);
        }
    }
    function weekdaysCaseReplace(m, format) {
        var weekdays = {
            'nominative': 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
            'accusative': 'неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу'.split('_'),
            'genitive': 'неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи'.split('_')
        };

        if (!m) {
            return weekdays['nominative'];
        }

        var nounCase = (/(\[[ВвУу]\]) ?dddd/).test(format) ?
            'accusative' :
            ((/\[?(?:минулої|наступної)? ?\] ?dddd/).test(format) ?
                'genitive' :
                'nominative');
        return weekdays[nounCase][m.day()];
    }
    function processHoursFunction(str) {
        return function () {
            return str + 'о' + (this.hours() === 11 ? 'б' : '') + '] LT';
        };
    }

    var uk = moment.defineLocale('uk', {
        months : {
            'format': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_'),
            'standalone': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_')
        },
        monthsShort : 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
        weekdays : weekdaysCaseReplace,
        weekdaysShort : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
        weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY р.',
            LLL : 'D MMMM YYYY р., HH:mm',
            LLLL : 'dddd, D MMMM YYYY р., HH:mm'
        },
        calendar : {
            sameDay: processHoursFunction('[Сьогодні '),
            nextDay: processHoursFunction('[Завтра '),
            lastDay: processHoursFunction('[Вчора '),
            nextWeek: processHoursFunction('[У] dddd ['),
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return processHoursFunction('[Минулої] dddd [').call(this);
                    case 1:
                    case 2:
                    case 4:
                        return processHoursFunction('[Минулого] dddd [').call(this);
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'за %s',
            past : '%s тому',
            s : 'декілька секунд',
            ss : relativeTimeWithPlural,
            m : relativeTimeWithPlural,
            mm : relativeTimeWithPlural,
            h : 'годину',
            hh : relativeTimeWithPlural,
            d : 'день',
            dd : relativeTimeWithPlural,
            M : 'місяць',
            MM : relativeTimeWithPlural,
            y : 'рік',
            yy : relativeTimeWithPlural
        },
        // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
        meridiemParse: /ночі|ранку|дня|вечора/,
        isPM: function (input) {
            return /^(дня|вечора)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ночі';
            } else if (hour < 12) {
                return 'ранку';
            } else if (hour < 17) {
                return 'дня';
            } else {
                return 'вечора';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(й|го)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'M':
                case 'd':
                case 'DDD':
                case 'w':
                case 'W':
                    return number + '-й';
                case 'D':
                    return number + '-го';
                default:
                    return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return uk;

})));


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var months = [
        'جنوری',
        'فروری',
        'مارچ',
        'اپریل',
        'مئی',
        'جون',
        'جولائی',
        'اگست',
        'ستمبر',
        'اکتوبر',
        'نومبر',
        'دسمبر'
    ];
    var days = [
        'اتوار',
        'پیر',
        'منگل',
        'بدھ',
        'جمعرات',
        'جمعہ',
        'ہفتہ'
    ];

    var ur = moment.defineLocale('ur', {
        months : months,
        monthsShort : months,
        weekdays : days,
        weekdaysShort : days,
        weekdaysMin : days,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd، D MMMM YYYY HH:mm'
        },
        meridiemParse: /صبح|شام/,
        isPM : function (input) {
            return 'شام' === input;
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'صبح';
            }
            return 'شام';
        },
        calendar : {
            sameDay : '[آج بوقت] LT',
            nextDay : '[کل بوقت] LT',
            nextWeek : 'dddd [بوقت] LT',
            lastDay : '[گذشتہ روز بوقت] LT',
            lastWeek : '[گذشتہ] dddd [بوقت] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s بعد',
            past : '%s قبل',
            s : 'چند سیکنڈ',
            ss : '%d سیکنڈ',
            m : 'ایک منٹ',
            mm : '%d منٹ',
            h : 'ایک گھنٹہ',
            hh : '%d گھنٹے',
            d : 'ایک دن',
            dd : '%d دن',
            M : 'ایک ماہ',
            MM : '%d ماہ',
            y : 'ایک سال',
            yy : '%d سال'
        },
        preparse: function (string) {
            return string.replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/,/g, '،');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return ur;

})));


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var uzLatn = moment.defineLocale('uz-latn', {
        months : 'Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr'.split('_'),
        monthsShort : 'Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek'.split('_'),
        weekdays : 'Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba'.split('_'),
        weekdaysShort : 'Yak_Dush_Sesh_Chor_Pay_Jum_Shan'.split('_'),
        weekdaysMin : 'Ya_Du_Se_Cho_Pa_Ju_Sha'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'D MMMM YYYY, dddd HH:mm'
        },
        calendar : {
            sameDay : '[Bugun soat] LT [da]',
            nextDay : '[Ertaga] LT [da]',
            nextWeek : 'dddd [kuni soat] LT [da]',
            lastDay : '[Kecha soat] LT [da]',
            lastWeek : '[O\'tgan] dddd [kuni soat] LT [da]',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'Yaqin %s ichida',
            past : 'Bir necha %s oldin',
            s : 'soniya',
            ss : '%d soniya',
            m : 'bir daqiqa',
            mm : '%d daqiqa',
            h : 'bir soat',
            hh : '%d soat',
            d : 'bir kun',
            dd : '%d kun',
            M : 'bir oy',
            MM : '%d oy',
            y : 'bir yil',
            yy : '%d yil'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 7th is the first week of the year.
        }
    });

    return uzLatn;

})));


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var uz = moment.defineLocale('uz', {
        months : 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
        monthsShort : 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
        weekdays : 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
        weekdaysShort : 'Якш_Душ_Сеш_Чор_Пай_Жум_Шан'.split('_'),
        weekdaysMin : 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'D MMMM YYYY, dddd HH:mm'
        },
        calendar : {
            sameDay : '[Бугун соат] LT [да]',
            nextDay : '[Эртага] LT [да]',
            nextWeek : 'dddd [куни соат] LT [да]',
            lastDay : '[Кеча соат] LT [да]',
            lastWeek : '[Утган] dddd [куни соат] LT [да]',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'Якин %s ичида',
            past : 'Бир неча %s олдин',
            s : 'фурсат',
            ss : '%d фурсат',
            m : 'бир дакика',
            mm : '%d дакика',
            h : 'бир соат',
            hh : '%d соат',
            d : 'бир кун',
            dd : '%d кун',
            M : 'бир ой',
            MM : '%d ой',
            y : 'бир йил',
            yy : '%d йил'
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return uz;

})));


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var vi = moment.defineLocale('vi', {
        months : 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
        monthsShort : 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
        monthsParseExact : true,
        weekdays : 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
        weekdaysShort : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
        weekdaysMin : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
        weekdaysParseExact : true,
        meridiemParse: /sa|ch/i,
        isPM : function (input) {
            return /^ch$/i.test(input);
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 12) {
                return isLower ? 'sa' : 'SA';
            } else {
                return isLower ? 'ch' : 'CH';
            }
        },
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM [năm] YYYY',
            LLL : 'D MMMM [năm] YYYY HH:mm',
            LLLL : 'dddd, D MMMM [năm] YYYY HH:mm',
            l : 'DD/M/YYYY',
            ll : 'D MMM YYYY',
            lll : 'D MMM YYYY HH:mm',
            llll : 'ddd, D MMM YYYY HH:mm'
        },
        calendar : {
            sameDay: '[Hôm nay lúc] LT',
            nextDay: '[Ngày mai lúc] LT',
            nextWeek: 'dddd [tuần tới lúc] LT',
            lastDay: '[Hôm qua lúc] LT',
            lastWeek: 'dddd [tuần rồi lúc] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : '%s tới',
            past : '%s trước',
            s : 'vài giây',
            ss : '%d giây' ,
            m : 'một phút',
            mm : '%d phút',
            h : 'một giờ',
            hh : '%d giờ',
            d : 'một ngày',
            dd : '%d ngày',
            M : 'một tháng',
            MM : '%d tháng',
            y : 'một năm',
            yy : '%d năm'
        },
        dayOfMonthOrdinalParse: /\d{1,2}/,
        ordinal : function (number) {
            return number;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return vi;

})));


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var xPseudo = moment.defineLocale('x-pseudo', {
        months : 'J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér'.split('_'),
        monthsShort : 'J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc'.split('_'),
        monthsParseExact : true,
        weekdays : 'S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý'.split('_'),
        weekdaysShort : 'S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát'.split('_'),
        weekdaysMin : 'S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[T~ódá~ý át] LT',
            nextDay : '[T~ómó~rró~w át] LT',
            nextWeek : 'dddd [át] LT',
            lastDay : '[Ý~ést~érdá~ý át] LT',
            lastWeek : '[L~ást] dddd [át] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'í~ñ %s',
            past : '%s á~gó',
            s : 'á ~féw ~sécó~ñds',
            ss : '%d s~écóñ~ds',
            m : 'á ~míñ~úté',
            mm : '%d m~íñú~tés',
            h : 'á~ñ hó~úr',
            hh : '%d h~óúrs',
            d : 'á ~dáý',
            dd : '%d d~áýs',
            M : 'á ~móñ~th',
            MM : '%d m~óñt~hs',
            y : 'á ~ýéár',
            yy : '%d ý~éárs'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return xPseudo;

})));


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var yo = moment.defineLocale('yo', {
        months : 'Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀'.split('_'),
        monthsShort : 'Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀'.split('_'),
        weekdays : 'Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta'.split('_'),
        weekdaysShort : 'Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá'.split('_'),
        weekdaysMin : 'Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb'.split('_'),
        longDateFormat : {
            LT : 'h:mm A',
            LTS : 'h:mm:ss A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY h:mm A',
            LLLL : 'dddd, D MMMM YYYY h:mm A'
        },
        calendar : {
            sameDay : '[Ònì ni] LT',
            nextDay : '[Ọ̀la ni] LT',
            nextWeek : 'dddd [Ọsẹ̀ tón\'bọ] [ni] LT',
            lastDay : '[Àna ni] LT',
            lastWeek : 'dddd [Ọsẹ̀ tólọ́] [ni] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'ní %s',
            past : '%s kọjá',
            s : 'ìsẹjú aayá die',
            ss :'aayá %d',
            m : 'ìsẹjú kan',
            mm : 'ìsẹjú %d',
            h : 'wákati kan',
            hh : 'wákati %d',
            d : 'ọjọ́ kan',
            dd : 'ọjọ́ %d',
            M : 'osù kan',
            MM : 'osù %d',
            y : 'ọdún kan',
            yy : 'ọdún %d'
        },
        dayOfMonthOrdinalParse : /ọjọ́\s\d{1,2}/,
        ordinal : 'ọjọ́ %d',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4 // The week that contains Jan 4th is the first week of the year.
        }
    });

    return yo;

})));


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var zhCn = moment.defineLocale('zh-cn', {
        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY/MM/DD',
            LL : 'YYYY年M月D日',
            LLL : 'YYYY年M月D日Ah点mm分',
            LLLL : 'YYYY年M月D日ddddAh点mm分',
            l : 'YYYY/M/D',
            ll : 'YYYY年M月D日',
            lll : 'YYYY年M月D日 HH:mm',
            llll : 'YYYY年M月D日dddd HH:mm'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' ||
                    meridiem === '上午') {
                return hour;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            } else {
                // '中午'
                return hour >= 11 ? hour : hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar : {
            sameDay : '[今天]LT',
            nextDay : '[明天]LT',
            nextWeek : '[下]ddddLT',
            lastDay : '[昨天]LT',
            lastWeek : '[上]ddddLT',
            sameElse : 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                case 'M':
                    return number + '月';
                case 'w':
                case 'W':
                    return number + '周';
                default:
                    return number;
            }
        },
        relativeTime : {
            future : '%s内',
            past : '%s前',
            s : '几秒',
            ss : '%d 秒',
            m : '1 分钟',
            mm : '%d 分钟',
            h : '1 小时',
            hh : '%d 小时',
            d : '1 天',
            dd : '%d 天',
            M : '1 个月',
            MM : '%d 个月',
            y : '1 年',
            yy : '%d 年'
        },
        week : {
            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return zhCn;

})));


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var zhHk = moment.defineLocale('zh-hk', {
        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY/MM/DD',
            LL : 'YYYY年M月D日',
            LLL : 'YYYY年M月D日 HH:mm',
            LLLL : 'YYYY年M月D日dddd HH:mm',
            l : 'YYYY/M/D',
            ll : 'YYYY年M月D日',
            lll : 'YYYY年M月D日 HH:mm',
            llll : 'YYYY年M月D日dddd HH:mm'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
                return hour;
            } else if (meridiem === '中午') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar : {
            sameDay : '[今天]LT',
            nextDay : '[明天]LT',
            nextWeek : '[下]ddddLT',
            lastDay : '[昨天]LT',
            lastWeek : '[上]ddddLT',
            sameElse : 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd' :
                case 'D' :
                case 'DDD' :
                    return number + '日';
                case 'M' :
                    return number + '月';
                case 'w' :
                case 'W' :
                    return number + '週';
                default :
                    return number;
            }
        },
        relativeTime : {
            future : '%s內',
            past : '%s前',
            s : '幾秒',
            ss : '%d 秒',
            m : '1 分鐘',
            mm : '%d 分鐘',
            h : '1 小時',
            hh : '%d 小時',
            d : '1 天',
            dd : '%d 天',
            M : '1 個月',
            MM : '%d 個月',
            y : '1 年',
            yy : '%d 年'
        }
    });

    return zhHk;

})));


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

//! moment.js locale configuration

;(function (global, factory) {
    true ? factory(__webpack_require__(0)) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var zhTw = moment.defineLocale('zh-tw', {
        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY/MM/DD',
            LL : 'YYYY年M月D日',
            LLL : 'YYYY年M月D日 HH:mm',
            LLLL : 'YYYY年M月D日dddd HH:mm',
            l : 'YYYY/M/D',
            ll : 'YYYY年M月D日',
            lll : 'YYYY年M月D日 HH:mm',
            llll : 'YYYY年M月D日dddd HH:mm'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour : function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
                return hour;
            } else if (meridiem === '中午') {
                return hour >= 11 ? hour : hour + 12;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar : {
            sameDay : '[今天] LT',
            nextDay : '[明天] LT',
            nextWeek : '[下]dddd LT',
            lastDay : '[昨天] LT',
            lastWeek : '[上]dddd LT',
            sameElse : 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd' :
                case 'D' :
                case 'DDD' :
                    return number + '日';
                case 'M' :
                    return number + '月';
                case 'w' :
                case 'W' :
                    return number + '週';
                default :
                    return number;
            }
        },
        relativeTime : {
            future : '%s內',
            past : '%s前',
            s : '幾秒',
            ss : '%d 秒',
            m : '1 分鐘',
            mm : '%d 分鐘',
            h : '1 小時',
            hh : '%d 小時',
            d : '1 天',
            dd : '%d 天',
            M : '1 個月',
            MM : '%d 個月',
            y : '1 年',
            yy : '%d 年'
        }
    });

    return zhTw;

})));


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var moment = module.exports = __webpack_require__(184);
moment.tz.load(__webpack_require__(183));


/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Core {

  constructor() {}

  /**
     * With the new ES6 Dist Lib this file is referenced as external script
     * here the default 'production style' exception handling is defined
     */
  handleExceptionNative (e) {
    console.warn("Exception: ", e);

    if (window.parent) {
      window.parent.com.fc.JavaScriptGenerator.handleExceptionNative(e);
    }
  }

  reset () {
    let thisObject = this;
    Object.keys(thisObject).forEach( function(key) {
      if ((typeof thisObject[key].reset) === "function") thisObject[key].reset();
      //console.log('type of:',typeof obj.reset);
    });
  }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (Core);

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class AnimationObject {

  constructor() {}

  animationMove(id, dX, dY, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "move";
    anim.dX = dX;
    anim.dY = dY;
    anim.duration = duration;
    return anim;
  }

  animationRotate(id, angle, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "rotate";
    anim.angle = angle;
    anim.duration = duration;
    return anim;
  }

  animationScale(id, dX, dY, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "scale";
    anim.dX = dX;
    anim.dY = dY;
    anim.duration = duration;
    return anim;
  }

  animationFade(id, alpha, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "fade";
    anim.alpha = alpha;
    anim.duration = duration;
    return anim;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AnimationObject);



/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ApplicationObject {

  constructor() {
    this.permissionResponseCallback = null;
  }

  configure(permissionResponseCallback) {
    this.permissionResponseCallback = permissionResponseCallback;
  }

  bringToForeground() {
    /*hs: not implementing this for now
    window.blur();
    setTimeout(window.focus, 0);
    */
  }

  sendToBackground() {
    /* hs: not implementing this for now.
    window.blur();
    */
  }

  getAppName() {
    return window.document.title;
  }

  quitApp() {
    window.close();
  }

  registerEvent(event, callback) {
  	switch(event) {
  		case 'start':
         console.log("Registering Started Event");
         $(window).ready(function() {
          if( callback != undefined ) {
            console.log("Application Started Event");
            callback();
          }
        });
  			break;
  		case 'in_background':
  			console.log("Registering background event");
        $(window).blur(function() {
           console.log("Application is in background");
           if( callback != undefined ) {
              callback();
           }
        });
        break;
  		case 'in_foreground':
        console.log("Registering foreground event");
        $(window).focus(function() {
           console.log("Application is in foreground");
           if( callback != undefined ) {
              callback();
           }
        });
  			break;
  		case 'back_button_press':
  			console.log("Registering back button press event");
        if (window.history && window.history.pushState) {
            window.history.pushState('forward', null, './#forward');
            $(window).on('popstate', function() {
              window.history.back();
              console.log("Back button event triggered");
              callback();
            });

        }
  			break;
  	}
  }

  requestPermissions() {
    //hs: in simulation we always return true for now.
    if(this.permissionResponseCallback!=null) {
      this.permissionResponseCallback(true);
    }
  }

  hasPermissionsBeenGranted() {
    return true;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ApplicationObject);

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Audio Library Module
*/

class AudioLibraryObject {

    constructor() {
        this.currAudio = null;
    }

    createAudioFromResource (url) {
        console.log (url);
        let audio = document.createElement("AUDIO");
        let source = document.createElement("source");
        audio.appendChild(source);
        audio.crossOrigin = 'anonymous';
        source.src = url;
        return audio;
    }

    createAudioFromUrl (url, successCallBack, failureCallBack) {

        let audio = document.createElement("AUDIO");
        let source = document.createElement("source");
        audio.appendChild(source);
        audio.crossOrigin = 'anonymous';
        source.src = url;
        audio.onloadstart = (e) => {
            successCallBack (audio);
        };

        audio.onerror = (e) => {
          console.log('createAudioFromUrl, load error', e);
          failureCallBack(e);
        }
    }

    getDuration (audio) {
        return audio.duration;
    }

    playAudio (audio, successCallBack) {
        audio.play();
        this.currAudio = audio;
        audio.onended = function(e) {
            successCallBack(e);
        };
    }

    playAudioFrom (audio,position,successCallBack) {
        audio.currentTime = position;
        audio.play();
        this.currAudio = audio;
        audio.onended = function(e) {
            successCallBack(e);
        };
    }

    play (audio) {
        try {
            this.currAudio.play();
        } catch (e) {
            console.log (e);
        } 
    }

    pause (audio) {
        try {
            this.currAudio.pause();
        } catch (e) {
            console.log (e);
        } 
    }

    stop (audio) {
         try {
            this.currAudio.pause();
            this.currAudio.currentTime = 0;
        } catch (e) {
            console.log (e);
        } 
        
    }


}

/* harmony default export */ __webpack_exports__["a"] = (AudioLibraryObject);

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class BluetoothObject {

  constructor() {
    this.devices = {};
  }

  configure(scansuccesscallback, scanfailcallback, 
      devicedisconnectcallback, characteristicchangecallback) {

    this.scansuccesscallback = scansuccesscallback;
    this.scanfailcallback = scanfailcallback;
    this.devicedisconnectcallback = devicedisconnectcallback;
    this.characteristicchangecallback = characteristicchangecallback;
  }

  scanStart(timeout) {
    let parent = this;
    return navigator.bluetooth.requestDevice({filters:[{services:[ 'heart_rate' ]}]})
    .then(device => {
      parent.devices[device.id] = {};
      parent.devices[device.id].type = 'heart_rate';
      parent.devices[device.id].bledevice = device;
      parent.devices[device.id].services = new Map();
      parent.devices[device.id].characteristics = new Map();
      parent.devices[device.id].formatMap = new Map();
      parent.scansuccesscallback(device.id);
    });
  }

  scanStop() {
  
  }

  getDeviceNameForAddress(deviceAddress) {
    if( this.devices[deviceAddress] != undefined ) {
      return this.devices[deviceAddress].bledevice.name;
    }
    else {
      return "";
    }
  }

  connectToDevice(deviceAddress, successcallback) {
    let device = this.devices[deviceAddress].bledevice;
    let parent = this;
    if( !device ) {
      failurecallback("Device not found!");
      return;
    }
    
    device.addEventListener('gattserverdisconnected', event => {
      parent.devicedisconnectcallback(deviceAddress);
    });

    device.gatt.connect()
      .then(server => {
        parent.devices[deviceAddress].server = server;
        successcallback();
      })
  }

  disconnectFromDevice(deviceAddress) {
    let device = this.devices[deviceAddress].bledevice;
    if (!device) {
      return;
    }
    console.log('Disconnecting from BLE Device...' + deviceAddress);
    if (device.gatt.connected) {
      device.gatt.disconnect();
    } else {
      console.log('BLE Device ' + deviceAddress + " already disconnected");
    }
  }

  async getServicesForDevice(deviceAddress, successcallback) {
    let parent = this;
    let device = this.devices[deviceAddress];
    let server = device.server;
    let servicesUUID = [];
    
    server.getPrimaryServices()
      .then(async services => {
          for(var i=0; i<services.length; i++ ) {
              var service = services[i];
              servicesUUID.push(service.uuid);
              device.services.set(service.uuid, service);
              let characteristics = await service.getCharacteristics();
              device.characteristics.set(service.uuid, characteristics);
          }
          console.log(servicesUUID);
          successcallback(servicesUUID);
      });
  }

  getCharacteristicsForService(deviceAddress, serviceUUID) {
    let parent = this;
    let device = this.devices[deviceAddress];
    let service = device.services.get(serviceUUID);
    let charUUID = [];

    let characteristics = device.characteristics.get(serviceUUID);
    for(var i=0; i<characteristics.length; i++ ) {
          var characteristic = characteristics[i];
          charUUID.push(characteristic.uuid);
    }
    console.log(charUUID);
    console.log(characteristics);
    return charUUID;
  }

  _getCharacteristic(deviceAddress, serviceUUID, characteristicUUID) {
    let device = this.devices[deviceAddress];
    let characteristics = device.characteristics.get(serviceUUID);
    for(let i=0; i<characteristics.length; i++ ) {
      let characteristic = characteristics[i];
      if( characteristic.uuid == characteristicUUID ) {
        return characteristic;
      }
    }
    return undefined;
  }

  _getFinalValue(format, value) {
    let finalValue = value;
    switch(format) {
      case "UINT8":
        finalValue = value.getUint8(0);
        break;
      case "INT8":
        finalValue = value.getInt8(0);
        break;
      case "UINT16":
        finalValue = value.getUint16(0);
        break;
      case "INT16":
        finalValue = value.getInt16(0);
        break;
      case "UINT32":
        finalValue = value.getUint32(0);
        break;
      case "INT32":
        finalValue = value.getInt32(0);
        break;
      case "FLOAT":
        finalValue = value.getFloat32(0);
        break;
    }
    return finalValue;
  }

  readCharacteristic(deviceAddress, serviceUUID, characteristicUUID, format, successcallback) {
    let device = this.devices[deviceAddress];
    device.formatMap.set(characteristicUUID, format);

    let characteristic = this._getCharacteristic(deviceAddress, serviceUUID, characteristicUUID);
    if( characteristic!= undefined ) {
      characteristic.readValue()
      .then(value => {
        let finalValue = _getFinalValue(format, value);
        successcallback(finalValue);
      });
    }
  }

  writeCharacteristic(deviceAddress, serviceUUID, characteristicUUID, format, value, 
    successcallback, failurecallback) {
    let characteristic = this._getCharacteristic(deviceAddress, serviceUUID, characteristicUUID);
    if( characteristic != undefined ) {

    switch(format) {
        case "UINT8":
          finalValue = Uint8Array.of(value);
          break;
        case "INT8":
          finalValue = Int8Array.of(value);
          break;
        case "UINT16":
          finalValue = Uint16Array.of(value);
          break;
        case "INT16":
          finalValue = Int16Array.of(value);
          break;
        case "UINT32":
          finalValue = Uint32Array.of(value);
          break;
        case "INT32":
          finalValue = Iint32Array.of(value);
          break;
        case "FLOAT":
          finalValue = Float32Array.of(value);
          break;
      }
      characteristic.writeValue(finalValue)
      .then(_ => {
        successcallback();
      })
      .catch(error => {
        failurecallback();
      });
    }

  }

  notifyCharacteristicChange(deviceAddress, serviceUUID, characteristicUUID, state) {
    let parent = this;
    let device = this.devices[deviceAddress];
    let characteristic = this._getCharacteristic(deviceAddress, serviceUUID, characteristicUUID);
    let format = device.formatMap.get(characteristicUUID);

    if( characteristic != undefined ) {
      if( state == true ) {
        characteristic.startNotifications()
        .then(characteristic => {
          characteristic.addEventListener('characteristicvaluechanged', event => {
            console.log("Data = " + event.target.value);
            if( parent.characteristicchangecallback != undefined) {
               let finalValue = parent._getFinalValue(format, event.target.value);
               parent.characteristicchangecallback(deviceAddress, serviceUUID, 
                characteristicUUID, finalValue);
            }
          });
        });  
      }
      else {
        characteristic.stopNotifications();
      }  
    }
    
  } 

}

/* harmony default export */ __webpack_exports__["a"] = (BluetoothObject);


/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(2);
// ES6 imports


class ButtonObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */] {

  constructor() {
    super(" .btn");

    const self = this;

    // Set default behaviours
    $(document).ready(function() {
      let buttonEls = $(".element.fc.Button");
      // console.log('ButtonObject, buttonEls: ', buttonEls);
      buttonEls.each((i, obj) => {
        // console.log('.element.fc.Button: ', obj);
        let elements = obj.getElementsByClassName("foreground");
        let image = (elements.length > 0) ? elements[0] : null;

        elements = obj.getElementsByClassName("highlight");
        let imageHighlight = (elements.length > 0) ? elements[0] : null;
        // if (imageHighlight) console.log('ButtonObject, imageHighlight element', imageHighlight);

        if (imageHighlight) {
          obj.onmousedown = () => {
            // console.log("onmousedown, button", obj.getAttribute("obj-name"));
            imageHighlight.style.display = "";
            image.style.display = "none";
          };
          obj.onmouseup = () => {
            // console.log("onmouseup, button", obj.getAttribute("obj-name"));
            image.style.display = "";
            imageHighlight.style.display = "none";
          };
        }
        else {
          let button = obj.getElementsByClassName("btn")[0];
          let color = button.style.backgroundColor;
          let invertedColor = self.invertColor(color);
          // console.log("Standard case, button color", color);

          obj.onmousedown = () => {
            // console.log("onmousedown, button", obj.getAttribute("obj-name"));
            button.style.backgroundColor = invertedColor;
          };
          obj.onmouseup = () => {
            // console.log("onmouseup or out, button", obj.getAttribute("obj-name"));
            button.style.backgroundColor = color;
          };
        }

      });
    });

    this.getProperty.Text = (objName) => {
      let buttonTextEl = this.getTextElemFromName(objName).find(".text");
      return buttonTextEl.html();
    };

    this.setProperty.Text = (objName, value) => {
      let buttonTextEl = this.getTextElemFromName(objName).find(".text");
      buttonTextEl.html(value);
    };

    this.setProperty["Text Alignment"] = (objName, value) => {
      let buttonEl = this.getTextElemFromName(objName);
      buttonEl.css("text-align", value.toLowerCase());
      buttonEl.css("justify-content", this.toFlex(value.toLowerCase()));
    };

    this.getProperty["Image"] = function(objName) {
      let elemSelector = self.getElemFromName(objName);
      let el = $(elemSelector).find("img");
      return el.get()[0];
    };

    this.setProperty["Image"] = function(objName, image) {

      // let elemSelector = '[obj-name="' + objName + '"]';
      // let elem = $('[obj-name="' + objName + '"]').find('img')
      // elem.attr('src', image.src);

      // getting the native element
      let $oldElem = $("[obj-name=\"" + objName + "\"]").find("img");
      let oldElem = $oldElem.get()[0]; // getting the native element

      // make a copy of the input image
      // this copy will replace the current immage
      let newElem = image.cloneNode();

      // copy all existing img attributes to the new element except src
      for (let i = 0; i < oldElem.attributes.length; i++)
      {
        let attribute = oldElem.attributes[i];
        if (! newElem.getAttribute(attribute.name))
          newElem.setAttribute(attribute.name, attribute.value);
      }
      $oldElem.replaceWith(newElem);
    };

    //Shadow Properties Setters
    this.setProperty["Horizontal Offset"] = (objName, value) => {
      let elemSelector = self.getElemFromName(objName);
      let hOffset = value + "px";
      $(elemSelector).attr("shadow-h-offset",value+"px");
      let vOffset = $(elemSelector).attr("shadow-v-offset");
      let blur = $(elemSelector).attr("shadow-blur");
      let spread = $(elemSelector).attr("shadow-spread");
      let color = $(elemSelector).attr("shadow-color");
      $(elemSelector).css("box-shadow" , `${hOffset} ${vOffset} ${blur} ${spread} ${color}`);
    };

    this.setProperty["Vertical Offset"] = (objName, value) => {
      let elemSelector = self.getElemFromName(objName);
      let hOffset = $(elemSelector).attr("shadow-h-offset");
      let vOffset = value + "px";
      $(elemSelector).attr("shadow-v-offset",value+"px");
      let blur = $(elemSelector).attr("shadow-blur");
      let spread = $(elemSelector).attr("shadow-spread");
      let color = $(elemSelector).attr("shadow-color");
      $(elemSelector).css("box-shadow" , `${hOffset} ${vOffset} ${blur} ${spread} ${color}`);
    };

    this.setProperty["Shadow Blur"] = (objName, value) => {
      let elemSelector = self.getElemFromName(objName);
      let hOffset = $(elemSelector).attr("shadow-h-offset");
      let vOffset = $(elemSelector).attr("shadow-v-offset");
      let blur = value + "px";
      $(elemSelector).attr("shadow-blur",value+"px");
      let spread = $(elemSelector).attr("shadow-spread");
      let color = $(elemSelector).attr("shadow-color");
      $(elemSelector).css("box-shadow" , `${hOffset} ${vOffset} ${blur} ${spread} ${color}`);
    };

    this.setProperty["Shadow Spread"] = (objName, value) => {
      let elemSelector = self.getElemFromName(objName);
      let hOffset = $(elemSelector).attr("shadow-h-offset");
      let vOffset = $(elemSelector).attr("shadow-v-offset");
      let blur = $(elemSelector).attr("shadow-blur");
      let spread = value + "px";
      $(elemSelector).attr("shadow-spread",value+"px");
      let color = $(elemSelector).attr("shadow-color");
      $(elemSelector).css("box-shadow" , `${hOffset} ${vOffset} ${blur} ${spread} ${color}`);
    };

    this.setProperty["Shadow Color"] = (objName, value) => {
      let elemSelector = self.getElemFromName(objName);
      let hOffset = $(elemSelector).attr("shadow-h-offset");
      let vOffset = $(elemSelector).attr("shadow-v-offset");
      let blur = $(elemSelector).attr("shadow-blur");
      let spread = $(elemSelector).attr("shadow-spread");
      let color = value;
      $(elemSelector).attr("shadow-color",value);
      $(elemSelector).css("box-shadow" , `${hOffset} ${vOffset} ${blur} ${spread} ${color}`);
    };

    this.setProperty["Text Decoration"] = (objName, value) => {
      let elemSelector = self.getElemFromName(objName);
      $(elemSelector).find(".btn").css("text-decoration",value);
    };

    this.setProperty["Text Decoration Color"] = (objName, value) => {
      let elemSelector = self.getElemFromName(objName);
      $(elemSelector).find(".btn").css("text-decoration-color",value);
    };

    //Shadow Properties getters
    this.getProperty["Horizontal Offset"] = function(objName) {
      let elemSelector = self.getElemFromName(objName);
      return $(elemSelector).attr("shadow-h-offset");
    };

    this.getProperty["Vertical Offset"] = function(objName) {
      let elemSelector = self.getElemFromName(objName);
      return $(elemSelector).attr("shadow-v-offset");
    };

    this.getProperty["Shadow Blur"] = function(objName) {
      let elemSelector = self.getElemFromName(objName);
      return $(elemSelector).attr("shadow-blur");
    };

    this.getProperty["Shadow Spread"] = function(objName) {
      let elemSelector = self.getElemFromName(objName);
      return $(elemSelector).attr("shadow-spread");
    };

    this.getProperty["Shadow Color"] = function(objName) {
      let elemSelector = self.getElemFromName(objName);
      return $(elemSelector).attr("shadow-color");
    };

    this.getProperty["Text Decoration"] = function(objName) {
      let elemSelector = self.getElemFromName(objName);
      return $(elemSelector).find(".btn").css("text-decoration");
    };

    this.getProperty["Text Decoration Color"] = function(objName) {
      let elemSelector = self.getElemFromName(objName);
      return $(elemSelector).find(".btn").css("text-decoration-color");
    };
  }

  toFlex(align) {
    if (align === "left")
      return "flex-start";
    else if (align === "right")
      return "flex-end";
    else
      return "center";
  }

  invertColor(color) {
    // console.log('invertColor input:', color);
    let rgbin = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (!rgbin)
      rgbin = color.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (!rgbin) {
      console.error("invertColor: unable to detect color");
      return rgbin;
    }
    if (rgbin.length === 4)
      rgbin.splice(0, 1);
    else
      return color;
    let rgbout = [];
    for (let col of rgbin) {
      let val = parseInt(col);
      rgbout.push(parseInt(val*.7));
    }

    let result = `rgb(${rgbout[0]}, ${rgbout[1]}, ${rgbout[2]})`;
    if (rgbout[3]) {
      result = `rgba(${rgbout[0]}, ${rgbout[1]}, ${rgbout[2]}, ${rgbout[3]})`;
    }
    return result;
  }

  touchmove_x_y(elemSelector, callback){
    $(elemSelector).on("mousedown touchstart", function(event) {
      $(document.body).on("mousemove touchmove", function(touchmove){
        var ose = $(document.body).offset();
        var mousemove = touchmove.type === "mousedown"||touchmove.type === "touchstart",
          pageX = mousemove ? touchmove.targetTouches[0].clientX : touchmove.clientX - ose.left,
          pageY = mousemove ? touchmove.targetTouches[0].clientY : touchmove.clientY - ose.top;
        if(pageX<0 ||pageY<0){
          pageX = 0;
          callback(pageX,pageY);
        }else{
          callback(pageX,pageY);
        }

      });
      $(document.body).on("mouseup touchend", function(release){
        $(document.body).off("mousemove touchmove"),
        $(document.body).off("mousedown touchstart");
      });
    });
  }

  longclick_ev(elemSelector,callback){
    var timeout_id = 0,
      hold_time = 500;
    $(elemSelector).on("mousedown touchstart",function(e) {
      e.stopPropagation();
      timeout_id = setTimeout(function(){
        callback();
      },hold_time);
    }).bind("mouseup mouseleave touchend", function(ev) {
      clearTimeout(timeout_id);
    });
  }

  getElemFromName (objName) {
    return $("[obj-name= \"" + objName + "\"]");
  }
}
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ButtonObject);


/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Camera Library Module
*/

class CameraLibraryObject {

    constructor() {
        
    }

    showCameraInPictureMode (callback) {
      console.warn("Camera ( Picture Mode )not supported in HTML5 mode.");
      callback();
    }

    showCameraInVideoMode (callback) {
      console.warn("Camera ( Video Mode ) not supported in HTML5 mode.");
      callback();    
    } 

    takePicture (callback) {
      console.warn("Camera ( Take Picture ) not supported in HTML5 mode.");
      callback();    
    } 

}

/* harmony default export */ __webpack_exports__["a"] = (CameraLibraryObject);

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Camera View Module */

class CameraViewObject {

    constructor() {
        
    }

    link (obj,camType) {
      //Ignore camType as HTML5 as only one
      let ele = '[obj-name= "' + obj + '"]';
      $(ele).children().remove(); //remove all children
      let video = document.createElement('video');
      video.width = $(ele).width();
      video.height = $(ele).height();
      $(ele).append(video);
      // Get access to the camera!
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
          window.localStream = stream;
          video.src = window.URL.createObjectURL(stream);
          video.play();
        });
      }

    } 

    unlink (obj) {
      let ele = '[obj-name= "' + obj + '"]';
      try {
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
      } catch (e) {
        let error = new Error("No video playing to stop.");
        error.name = "CameraViewException";
        throw error;
      }
      
    }

}

/* harmony default export */ __webpack_exports__["a"] = (CameraViewObject);

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Created on 23/11/2017 */

class ClockObject {

  constructor() {
    this.chronoCounter = 0;
    this.chronoCallback = null;
    this.alarmId = null;
    this.namedAlarmCallback = null;
    this.datePicker = null;
    this.dateRangePicker = null;
    this.selectedDate = "";
    this.dateSelectedCallback = null;

    this.timePicker = null;
    this.selectedTime = "";
    this.timeSelectedCallback = null;
  }



  createTimer (interval,repeats) {
    let timerVar = setInterval(function(){ 
    },interval);

    return [timerVar,interval,repeats];

  }

  startTimer (timer,callback) {

    let count = 0; // Counter
    let timerVar = timer[0];
    let interval = timer[1] * 1000; //Convert to ms
    let repeats = timer[2];

    //Clear the above created one
    clearInterval(timerVar);

    timerVar = setInterval(function(){ 
      callback(timerVar);

      if (++count === repeats) {
        clearInterval(timerVar);
        $(`#timer-${timer[0]}`).attr("timer-status",false);
      }

    },interval);
    $("body").append(`<input id = "timer-${timer[0]}" value = "${timerVar}" type = "hidden" />`); // keeping the reference of the new ID
    $(`#timer-${timer[0]}`).attr("timer-status",true);
  }

  stopTimer (timer) {
    let timerId = $(`#timer-${timer[0]}`).val();
    clearInterval(timerId);
    $(`#timer-${timer[0]}`).attr("timer-status",false);
  }

  isTimerComplete (timer) {
    let result = $(`#timer-${timer[0]}`).attr("timer-status");
    
    if (result == "true") {
      return false;
    }
    return true;
    
  }

  /* Chrono */
  createChrono () {
    this.timeBegan = null;
    this.timeStopped = null;
    this.stoppedDuration = 0;
    this.chronoId = null;

    return this.chronoId;
  }

  startChrono (callback) {
    var self = this;
    this.chronoCallback = callback;

    if (this.timeBegan === null) {
      this.timeBegan = new Date();
    }

    if (this.timeStopped !== null) {
      this.stoppedDuration += (new Date() - this.timeStopped);
    }

    this.chronoId = setInterval(function() {
      var currentTime = new Date()
        , timeElapsed = new Date(currentTime - self.timeBegan - self.stoppedDuration)
        , hour = timeElapsed.getUTCHours()
        , min = timeElapsed.getUTCMinutes()
        , sec = timeElapsed.getUTCSeconds()
        , ms = timeElapsed.getUTCMilliseconds();
      self.chronoCounter = (min < 1 ? sec : min*60+sec) + "."+ 
      (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
      callback(this.chronoId);
    },1);
    
  }

  chronoTimeElapsed () {
    return this.chronoCounter;
  }

  stopChrono () {
    clearInterval(this.chronoId);
    this.stoppedDuration = 0;
    this.timeBegan = null;
    this.timeStopped = null;
  }

  pauseChrono () {
    this.timeStopped = new Date();
    clearInterval(this.chronoId);
  }

  resumeChrono () {
    this.startChrono(this.chronoCallback);
  }

  /* Alarms */
  createAlarm (time,repeat) {
    return [time,repeat];
  }

  scheduleAlarm (alarm, callback) {

    let self = this;
    let scheduledTime = alarm[0];
    this.alarmId = setInterval(function(){
      let currTime = new Date();
      if (currTime.toString() == scheduledTime.toString()) {
        clearInterval(self.alarmId);
        callback(self.alarmId);
      }
    },1000);

  }

  removeAlarm (alarm) {
    clearInterval(this.alarmId);
  }

  createAlarmWithName(name, time, callback) {
    let parent = this;

    let alarmId = setInterval(function() {
      let currTime = new Date();
      if (currTime.toString() == time.toString()) {
        clearInterval(alarmId);
        callback(name);
      }
    },1000);
  }

  /* Date and Time Picker */
  pickDate () {
    let parent = this;
    if (!parent.datePicker) {
      parent.datePicker =
      $(`<div id="modal" class="modal fade pickerModal">
        <div class="modal-dialog-sm" style = "position:relative;background:#fff;width:300px; margin:0 auto;padding:25px;padding-left:30px;">
        <div id="datepicker" style = "margin-bottom:20px;"></div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Select</button>
            <span id = "action-btn-container">
            </span>
        </div>
        </div>`);
      $(parent.datePicker).find("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+100",
        onSelect: function (dateText) {
          parent.selectedDate = $(parent.datePicker).find("#datepicker").datepicker("getDate");
        }
      });
    }
    return new Promise((resolve) => {
      $(parent.datePicker).find(".btn").click(function (e) {
        parent.selectedDate = $(parent.datePicker).find("#datepicker").datepicker("getDate");
        if (parent.selectedDate != undefined) {
          // $(parent.datePicker).find("#datepicker").datepicker("destroy");
          $(parent.datePicker).modal("hide");
          resolve(parent.selectedDate);
        }
      });

      $(parent.datePicker).on("hidden.bs.modal", function () {
        // $(parent.datePicker).find("#datepicker").datepicker("destroy");
        $(parent.datePicker).modal("hide");
      });

      $(parent.datePicker).modal("show");
      $(parent.datePicker).find("#datePicker").datepicker("setDate", new Date());
    });
    
  }

  pickTime () {
    let parent = this;
    return new Promise((resolve) => {
      parent.timePicker =
        $(`<div id="modal" class="modal fade pickerModal">
        <div class="modal-dialog-sm" style = "position:relative;background:#fff;width:300px; margin:0 auto;padding:25px;padding-left:30px;">
          <div id="timepicker" style = "margin-bottom:20px;"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Select</button>
            <span id = "action-btn-container">
            </span>
          </div>
        </div>`);
      $(parent.timePicker).find("#timepicker").timepicker({
        controlType: "select",
        showButtonPanel: false,
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        stepMinute: 15,
        oneLine: true,
        timeFormat: "hh:mm tt",
        onSelect: function (time) {
          parent.selectedTime = $(parent.timePicker).find("#timepicker").datetimepicker("getDate");
        }
      });
      $(parent.timePicker).find(".btn").click(function (e) {
        parent.selectedTime = $(parent.timePicker).find("#timepicker").datetimepicker("getDate");
        // if (callback) callback(parent.selectedTime);
        $(parent.timePicker).modal("hide");
        resolve(parent.selectedTime);
      });
      $(parent.timePicker).find("#timepicker").datetimepicker("setDate", new Date());
      $(parent.timePicker).modal("show");
    });
  }


  pickDateRange (start, end) {
    let parent = this;
    if (!parent.dateRangePicker) {
      parent.dateRangePicker =
      $(`<div id="modal" class="modal fade pickerModal">
      <div class="modal-dialog-sm" style = "position:relative;background:#fff;width:300px; margin:0 auto;padding:25px;padding-left:30px;">
          <div id="datepickerrange" style = "margin-bottom:20px;"></div>
          <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal">Select</button>
              <span id = "action-btn-container">
              </span>
          </div>
      </div>`);
    }
    $(parent.dateRangePicker).find("#datepickerrange").datepicker({
      changeMonth: true,
      changeYear: true,
      minDate: start,
      maxDate: end,
      yearRange: start.getFullYear() + ":" + end.getFullYear(),
      onSelect: function (dateText) {
        parent.selectedDate = $(parent.dateRangePicker).find("#datepickerrange").datepicker("getDate");
      }
    });
    return new Promise((resolve) => {

      $(parent.dateRangePicker).find(".btn").click(function (e) {
        parent.selectedDate = $(parent.dateRangePicker).find("#datepickerrange").datepicker("getDate");
        if (parent.selectedDate != undefined) {
          $(parent.datePicker).find("#datepicker").datepicker("destroy");
          $(parent.dateRangePicker).modal("hide");
          resolve(parent.selectedDate);
        }
      });

      $(parent.dateRangePicker).on("hidden.bs.modal", function () {
        $(parent.dateRangePicker).find("#datepickerrange").datepicker("destroy");
        $(parent.dateRangePicker).modal("hide");
      });

      $(parent.dateRangePicker).modal("show");
      $(parent.dateRangePicker).find("#datepickerrange").datepicker("setDate", new Date());

    });
  }

}

/* harmony default export */ __webpack_exports__["a"] = (ClockObject);



/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Created by Ravish on 1/05/2017 */

// ES6 imports

class ColourLibraryObject {

  constructor() {}

  getColourFromText (str) {
    return str;
  }

  getRgbFromColour (colour) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colour);
    let arr = [];
    arr.push(parseInt(result[1], 16));
    arr.push(parseInt(result[2], 16));
    arr.push(parseInt(result[3], 16));
    return arr;
  }

  getColourFromHsv (h,s,v) {
    let rgb = this.hsvToRgb(h,s,v);
    let hex = this.rgbToHex (rgb[0],rgb[1],rgb[2]);
    return hex;
  }

  getHsvFromColour (colour) {
    let rgb = this.getRgbFromColour(colour);
    let hsv = this.rgb2hsv (rgb[0],rgb[1],rgb[2]);
    return hsv;
  }

  isColourDark (colour) {
    let luma = this.getLuma (colour);
    if (luma < this.getLumaTreshold()) {
      return true;
    }
  }

  isColourLight (colour) {
   let luma = this.getLuma (colour);
   if (luma > this.getLumaTreshold()) {
      return true;
    }
  }

  getLuma (colour) {
    let c = colour.substring(1);  // strip #
    let rgb = parseInt(c, 16);   // convert rrggbb to decimal
    let r = (rgb >> 16) & 0xff;  // extract red
    let g = (rgb >>  8) & 0xff;  // extract green
    let b = (rgb >>  0) & 0xff;  // extract blue

    return 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  }

  getLumaTreshold () {
    return 150;
  }

  getReadabilityTreshold () {
    return 120;
  }

  getLuminosity (colour) {
    return this.getLuma(colour);
  }

  rgb2hsv () {
    let rr, gg, bb,
      r = arguments[0] / 255,
      g = arguments[1] / 255,
      b = arguments[2] / 255,
      h, s,
      v = Math.max(r, g, b),
      diff = v - Math.min(r, g, b),
      diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };

    if (diff == 0) {
      h = s = 0;
    } else {
      s = diff / v;
      rr = diffc(r);
      gg = diffc(g);
      bb = diffc(b);

      if (r === v) {
        h = bb - gg;
      }else if (g === v) {
        h = (1 / 3) + rr - bb;
      }else if (b === v) {
        h = (2 / 3) + gg - rr;
      }
      if (h < 0) {
        h += 1;
      }else if (h > 1) {
        h -= 1;
      }
    }
    return [
      Math.round(h * 360),
      Math.round(s * 100),
      Math.round(v * 100)
    ];
  }

  hsvToRgb (h, s, v) {
    let r, g, b;
    let i;
    let f, p, q, t;
     
    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));
     
    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;
     
    if(s == 0) {
      // Achromatic (grey)
      r = g = b = v;
      return [
        Math.round(r * 255), 
        Math.round(g * 255), 
        Math.round(b * 255)
      ];
    }
     
    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
     
    switch(i) {
      case 0:
        r = v;
        g = t;
        b = p;
      break;
     
      case 1:
        r = q;
        g = v;
        b = p;
      break;
     
      case 2:
        r = p;
        g = v;
        b = t;
      break;
     
      case 3:
        r = p;
        g = q;
        b = v;
      break;
     
      case 4:
        r = t;
        g = p;
        b = v;
      break;
     
      default: // case 5:
        r = v;
        g = p;
        b = q;
    }
     
    return [
      Math.round(r * 255), 
      Math.round(g * 255), 
      Math.round(b * 255)
    ];
  }

  componentToHex(c) {
    let hex = Math.round(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  isColour (colour) {
    let result  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colour);
    return result;
  }

  mixColour (c1,c2,ratio) {
    return this.blendColours(c1,c2,ratio);
  }

  isReadableOn (c1,c2) {
    let luma1 = this.getLuma (c1);
    let luma2 = this.getLuma (c2);
    let diff = Math.abs(luma2 - luma1);
    console.log (luma1,luma2,diff);
    if (diff > this.getReadabilityTreshold()) {
      return true;
    }
  }

  blendColours(c1, c2, percentage) {
    // check input
    c1 = c1 || '#000000';
    c2 = c2 || '#ffffff';
    percentage = percentage || 0.5;

    // 1: validate input, make sure we have provided a valid hex
    if (c1.length != 4 && c1.length != 7)
      throw new error('colours must be provided as hexes');

    if (c2.length != 4 && c2.length != 7)
      throw new error('colours must be provided as hexes');    

    if (percentage > 1 || percentage < 0)
      throw new error('percentage must be between 0 and 1');


    // 2: check to see if we need to convert 3 char hex to 6 char hex, else slice off hash
    //      the three character hex is just a representation of the 6 hex where each character is repeated
    //      ie: #060 => #006600 (green)
    if (c1.length == 4)
      c1 = c1[1] + c1[1] + c1[2] + c1[2] + c1[3] + c1[3];
    else
      c1 = c1.substring(1);
    if (c2.length == 4)
      c2 = c2[1] + c2[1] + c2[2] + c2[2] + c2[3] + c2[3];
    else
      c2 = c2.substring(1);

    console.log('valid: c1 => ' + c1 + ', c2 => ' + c2);

    // 3: we have valid input, convert colors to rgb
    c1 = [parseInt(c1[0] + c1[1], 16), parseInt(c1[2] + c1[3], 16), parseInt(c1[4] + c1[5], 16)];
    c2 = [parseInt(c2[0] + c2[1], 16), parseInt(c2[2] + c2[3], 16), parseInt(c2[4] + c2[5], 16)];

    console.log('hex -> rgba: c1 => [' + c1.join(', ') + '], c2 => [' + c2.join(', ') + ']');

    // 4: blend
    let c3 = [ 
      (1 - percentage) * c1[0] + percentage * c2[0], 
      (1 - percentage) * c1[1] + percentage * c2[1], 
      (1 - percentage) * c1[2] + percentage * c2[2]
    ];

    console.log('c3 => [' + c3.join(', ') + ']');

    // 5: convert to hex
    c3 = '#' + this.componentToHex(c3[0]) + this.componentToHex(c3[1]) + this.componentToHex(c3[2]);

    console.log(c3);

    // return hex
    return c3;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (ColourLibraryObject);

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Stub for connio object
** Created by Harish Shanthi Kumar on 16/12/2016
*/

class ConnioObject extends com.fc.JavaScriptDistLib.ConnioCore {

  constructor() {
    super();
    this.MQTTClient = null,
    this.MQTTMessageRecvCallback =  null
  }

  configureMQTT() {
    let parent = this;
    if ( !this.MQTTClient ) {
      try {
        if( this.config.BaseURL === '' || this.config.KEY === '' || this.config.Secret === '' ) {
          console.log("Please go to File -> Connio Properties and set credentials.");
        }

        if( this.config.MQTTHost !== '' && this.config.MQTTPort !== '' && this.config.MQTTCientID !== '' &&
          this.config.MQTTUsername !== '' && this.config.MQTTPassword !== '' && this.config.App !== '' ) {
          this.MQTTClient = new Paho.MQTT.Client(this.config.MQTTHost, this.config.MQTTPort, this.config.MQTTCientID);
          // set callback handlers
          this.MQTTClient.onConnectionLost = function(responseObject) {
            parent.handleMQTTConnectionLost(responseObject);
          };
          this.MQTTClient.onMessageArrived = function(message) {
            parent.handleMQTTMessage(message);
          };
        }
        else {
          console.log("Please go to File -> Connio Properties and set credentials.");
        }
      }
      catch(e) {
        console.log("Some of the properties are missing. Go to File->Connio Properties");
      }
    }

  }
  //HS: Deploy Alert!! All runtime objects needs to be reset here!
  reset() {
    this.MQTTClient = null;
    this.MQTTMessageRecvCallback = null;
  }

  connioStartTrackingPropertyChanges(callback) {
    this.configure();
    this.configureMQTT();
    this.MQTTMessageRecvCallback = callback;
    this.connio_mqtt_connect();
  }

  connioStopTrackingPropertyChanges() {
    this.connio_mqtt_disconnect();
  }


  connioReadData(device, successcallback, failurecallback) {
    let parent = this;
    this.configure();
    let url = this.config.BaseURL + "/data/devices/" + device;
    $.ajax(
      {
        url: url,
        type: 'GET',
        headers: {
          "Authorization": "Basic " + btoa(this.config.KEY + ":" + this.config.Secret)
        },
        success: (response) => {
          successcallback(response);
        },
        error: (xhr, code, msg) => {
          failurecallback(msg);
          console.log("Could not read data.");
        }
      });
  }

  connionGetValue(data, valueType, propertyName) {
    this.configure();
    let properties = data.properties;
    if( (properties !== undefined) && (properties.length>0) ) {
      for(let i=0; i<properties.length; i++) {
        let property = properties[i];
        let qname = property.descriptors.qname;

        if( qname.indexOf(propertyName) !== -1)  {
          let value = property.value[valueType];
          if( value!==undefined ) {
            return value;
          }
        }
      }
    }
    return "";
  }

  connioGetDeviceName(data, id) {
    this.configure();
    let devices = data.results;
    try {
      for(let i=0; i<devices.length; i++) {
        let device = devices[i];
        if( device.id === id ) {
          return device.name;
        }
      }
    }
    catch(e) {

    }

    return "";
  }

  connioGetDeviceLocation(data, id) {
    this.configure();
    let devices = data.results;
    try {
      for(let i=0; i<devices.length; i++) {
        let device = devices[i];
        if( (device.id === id) || (device.name === id) ) {
          let locationObj = {lat: device.location.geo.lat, lng: device.location.geo.lon};
          return locationObj;
        }
      }
    }
    catch(e) {
    }

    return "";
  }

  connioWriteData(device, value, property, successcallback, failurecallback) {
    let parent = this;
    this.configure();
    let url = this.config.BaseURL + "/data/devices/" + device + "/properties/" + property;
    let data = {};
    data.dps = [];
    let val = {};
    val.t = new Date().toISOString();
    val.v = value;
    data.dps.push(val);

    $.ajax(
      {
        url: url,
        type: 'POST',
        headers: {
          "Authorization": "Basic " + btoa(this.config.KEY + ":" + this.config.Secret),
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        dataType: "json",
        data: JSON.stringify(data),
        success: function (response) {
          successcallback(response);
        },
        error: function(xhr, code, msg) {
          failurecallback(msg);
          console.log("Could not write data.");
        }
      });
  }

  connioExecuteMethod(device, method, data, successcallback, failurecallback) {
    this.configure();
  }

  connioReadHistorical(device, property, timeStart, timeEnd, descending, limit, successcallback, failurecallback) {
    let parent = this;
    this.configure();
    let url = this.config.BaseURL + "/data/devices/" + device + "/properties/" + property + "?";

    if( descending ) {
      let sorting = (descending ? "-" : "") + "source.time";
      url += "sort=" + sorting;
    }
    else {
      url += "sort=-source.time";
    }

    if( limit ) {
      url += "&limit=" + limit;
    }

    if (timeStart && timeEnd) {
      url += "&q=source.time:(" + timeStart.toISOString() + "+TO+" + timeEnd.toISOString() + ")";
    }

    $.ajax(
      {
        url: url,
        type: 'GET',
        headers: {
          "Authorization": "Basic " + btoa(this.config.KEY + ":" + this.config.Secret)
        },
        success: (response) => {
          let timeList = jsonPath(response, "$.results[:].t");
          let valueList = jsonPath(response, "$.results[:].v");
          let formattedTimeList = [];
          for (let i=0;i<timeList.length;i++) {
            formattedTimeList.push(com.fc.JavaScriptDistLib.TimeLibrary.dateFormat(new Date (timeList[i]),'MMM-d HH:mm a'));
          }
          timeList.reverse();
          formattedTimeList.reverse();
          successcallback(formattedTimeList, valueList);
        },
        error: (xhr, code, msg) => {
          failurecallback(msg);
          console.log("Could not read historical.");
        }
      });
  }

  connio_mqtt_connect() {
    console.log("Connecting to Connio MQTT...");
    let parent = this;
    try {
      this.MQTTClient.connect( {
        onSuccess: function() {
          console.log("Connected to Connio MQTT...");
          parent.subscribeToTopic();
        },
        userName : this.config.MQTTUsername,
        password : this.config.MQTTPassword,
        keepAliveInterval: 25,
        timeout: 60,
        useSSL: true
      });
    }
    catch(e) {
      console.log("Connio MQTT connection failed.")
    }
  }

  connio_mqtt_disconnect() {
    console.log("Disconnecting Connio MQTT...");
    this.MQTTClient.disconnect();
  }

  subscribeToTopic() {
    console.log("Subscribing to topic...");
    let parent = this;
    let subscribeOptions = {
      qos: 0,  // QoS
      invocationContext: {foo: true},
      onSuccess: (context) => {
        parent.handleMQTTSubscribeSuccess(context);
      },
      onFailure: (context) => {
        parent.handleMQTTSubscribeFailed(context);
        console.log("Could not subscribe to topic");
      },
      timeout: 10
    };

    this.MQTTClient.subscribe(this.config.MQTTTopic, subscribeOptions);
  }

  handleMQTTConnectionLost(responseObject) {
    console.log("Connection Lost: " + responseObject.errorMessage);
  }

  handleMQTTSubscribeSuccess(context) {
    console.log("Subscribe success");
  }

  handleMQTTSubscribeFailed(context) {
    console.log("Subscribe failed");
  }

  handleMQTTMessage(message) {
    //console.log("Connio MQTT Message Arrived: " + message.destinationName + " " + message.payloadString);
    if( this.MQTTMessageRecvCallback ) {
      let messageArray = message.destinationName.split("/");
      this.MQTTMessageRecvCallback(messageArray[4], messageArray[6], message.payloadString);
    }
  }

  ConnioConfigException(snappMessage, msg) {
    this.name = "ConnioConfigException";
    this.snappMessage = snappMessage;
    //custom message from smapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }

  ConnioNetworkException(snappMessage, msg) {
    this.name = "ConnioNetworkException";
    this.snappMessage = snappMessage;
    //custom message from smapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }


  ConnioMQTTException(snappMessage, msg) {
    this.name = "ConnioMQTTException";
    this.snappMessage = snappMessage;
    //custom message from smapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ConnioObject);

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(1);
/**
 * Created by lorenzo on 05/04/17.
 */



class ContainerObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

  constructor() {

    super(" .container");
  }
}

// ES6 exports

/* harmony default export */ __webpack_exports__["a"] = (ContainerObject);


/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class DeviceObject {

  constructor() {
    var self = this;
    try {
      navigator.getBattery().then(function(battery) {
        self.batteryInfo = battery;
      });
    } catch (e) {
      this.batteryInfo = {};
    }
  }

  getBatteryPercentage () {
    return this.batteryInfo.level * 100;
  }

  getBatteryStatus () {
    return this.batteryInfo.charging;
  }

  monitorBatterylevel (battery,callback) {
    navigator.getBattery().then(function(b) {
      b.addEventListener('levelchange', function() {
        if ((b.level * 100) < battery) {
          callback(b.level*100);
        }
      });
    });
  }

}

/* harmony default export */ __webpack_exports__["a"] = (DeviceObject);

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Ravish S on 21/11/17.
*/

class DialogObject {
    
    constructor() {
        this.closeText = "Close";
        this.actionText = "Button";
        this.dialog = null;
    }

    create (title,message) {
        this.dialog = 
            $(`<div id="modal" class="modal fade">
                <div class="modal-dialog-sm" style = "position:relative;background:#fff;margin:50px;">
                     
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">${title}</h4>
                    </div>
                    <div class="modal-body">
                        <p>${message}</p>                
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default cancel-btn" data-dismiss="modal">${this.closeText}</button>
                        <span id = "action-btn-container">
                        </span>
                    </div>
                </div>    
            `);
        return this.dialog;
    }

    addCancelBtn (title,dialog) {
       this.closeText = title.replace(/'/g,"");
    } 

    addBtn (title,dialog) {
        title = title.replace(/'/g,"");
        let button = '<button type="button" class="btn btn-primary action-btn">'+title+'</button>';
        $(this.dialog).find("#action-btn-container").append(button);
    }

    show (dialog,success) {
        $(dialog).modal('show');
        $(dialog).find(".cancel-btn").text(this.closeText);
        //$(dialog).find(".action-btn").text(this.actionText);
        $(dialog).find(".action-btn").click(function(e) {
            $(dialog).modal('hide');
            success($(this).html());
        });
    }

}

/* harmony default export */ __webpack_exports__["a"] = (DialogObject);

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class DictionaryObject {

  constructor() {}

  createEmptyDictionary () {
    var dict = {};
    return dict;
  }

  createDictionary(key, value) {
    var dict = {};
    for (var i=0; i < key.length; i++){
      dict[key[i]] = value[i];
    }
    return dict;
  }

  removeAllKeys (dictionary) {
    for( var key in dictionary ) {
      delete dictionary[key];
    }
    return dictionary;
  }

  getKeys (dictionary) {
    var keys = [];
    for( var key in dictionary ) {
      keys.push(key);
    }
    return keys;
  }

  getDictValue (dictionary,key) {
    if( dictionary != undefined ) {
      var value = dictionary[key];
      return  (value==undefined) ? null : value;
    }
    return null;
  }

  setDictValue (dictionary,key,value) {
    if( dictionary != undefined ) {
      dictionary[key] = value;  
    }
  }

  removeDictKey (dictionary,key) {
    if( dictionary != undefined ) {
      delete dictionary[key];  
    }
  }

  conatinedInDict (dictionary,key) {
    if( dictionary != undefined ) {
      return (dictionary[key] != undefined ) ? true : false;  
    }
    else {
      return false;
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (DictionaryObject);

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DocuSignObject {

  constructor() {
    this.config = {
      baseUrl: "",
      apiUrl: "",
      userId: "",
      password: "",
      integratorKey: "",
      demo: ""
    };
  }

  configure(config) {
    let properties;
    if (config) {
      properties = JSON.parse(config);
      if (properties) {
        let demo = properties.api.demo;

        if( demo == "true" ) {
          this.config.baseUrl = "https://demo.docusign.net/restapi/v2";
        } 
        else {
          this.config.baseUrl =  "https://www.docusign.net/restapi/v2";
        }
        this.config.userId = properties.api.userId;
        this.config.password = properties.api.password;
        this.config.integratorKey = properties.api.integratorKey;
      }
    }
  }

  createRecipent(role, name, email, clientId) {
    var recipent = {};
    recipent.role = role;
    recipent.name = name;
    recipent.email = email;
    recipent.clientId = clientId;
    return recipent;
  }

  addFieldToRecipient(recipent, key, value) {
    recipent[key] = value;
  }

  async createSigningLinkFromTemplate(templateId, recipent, redirectUrl, successcallback, failurecallback) {
    try {
      // #1 get the base url
      let setupResponse = await this.setup();
      if(setupResponse!=undefined) {
        this.config.apiUrl = this._getDefaultLoginAccount(setupResponse.loginAccounts).baseUrl;
        console.log(this.config.apiUrl);
        // #2 create envelope
        let createEnvelopeResponse = await this.createEnvelopeFromTemplate(templateId, recipent);
        if( createEnvelopeResponse!=undefined ) {
          let envelopeId = createEnvelopeResponse.envelopeId;
          console.log(envelopeId);
          // #3 create signing link
          let signingResponse = await this.createSigningLinkFromEnvelope(envelopeId, recipent, redirectUrl);
          if( signingResponse!=undefined ) {
            let signingUrl = signingResponse.url;
            console.log(signingUrl);
            successcallback(signingUrl);
          }
        }
      }
    }
    catch (error) {
      console.log(error.responseText);
      failurecallback(error.responseText);
    } 
  }

  async setup() {
    return await $.ajax({
      url: this.config.baseUrl + "/login_information?api_password=true",
      type: "GET",
      headers: {
        "X-DocuSign-Authentication": JSON.stringify({"Username":this.config.userId,"Password":this.config.password,"IntegratorKey": this.config.integratorKey}),
        "Content-Type": "application/json"
      }
    });
  }

  async createEnvelopeFromTemplate(templateId, recipent) {
    var data = 
      {
        "status": "sent",
        "templateId": templateId,
        "templateRoles": [
          {
            "clientUserId": recipent.clientId,
            "email": recipent.email,
            "name": recipent.name,
            "roleName": recipent.role,
            "tabs": {
              "textTabs":[]
            }
          }
        ]
      };
      
    for (var key in recipent) {
      if (recipent.hasOwnProperty(key)) {
        var val = recipent[key];
        var textEntry = {
          "tabLabel" : key,
          "value": val
        };
        data.templateRoles[0].tabs.textTabs.push(textEntry);
      }
    }
      
    return await $.ajax({
      url: this.config.apiUrl + "/envelopes",
      type: "POST",
      headers: {
        "X-DocuSign-Authentication": JSON.stringify({"Username":this.config.userId,"Password":this.config.password,"IntegratorKey": this.config.integratorKey}),
        "Content-Type": "application/json"
      },
      dataType: "json",
      data: JSON.stringify(data)
    });
  }

  async createSigningLinkFromEnvelope(envelopeId, recipent, redirectUrl) {
    let data = 
      {
        "returnUrl": redirectUrl,
        "authenticationMethod": "None",
        "email": recipent.email,
        "userName": recipent.name,
        "clientUserId": recipent.clientId
      };
    return await $.ajax({
      url: this.config.apiUrl + "/envelopes/" + envelopeId + "/views/recipient",
      type: "POST",
      headers: {
        "X-DocuSign-Authentication": JSON.stringify({"Username":this.config.userId,"Password":this.config.password,"IntegratorKey": this.config.integratorKey}),
        "Content-Type": "application/json"
      },
      dataType: "json",
      data: JSON.stringify(data)
    });
  }

  getSigningEventFromUrl(url) {
    let parseString = "?event=";
    let index = url.indexOf(parseString);
    if( index > 0 ) {
      return url.substring(index+parseString.length);
    }
    return "";
  }

  _getDefaultLoginAccount(accounts) {
    for( var i=0; i<accounts.length; i++) {
      if(accounts[i].isDefault == "true") {
        return accounts[i];
      }
    }
  }
}

// export class to a global variable for use of the JavaScriptDistLib (only)
var com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = com.fc.JavaScriptDistLib || {};
com.fc.JavaScriptDistLib.DocuSign = DocuSignObject;
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (DocuSignObject);

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(1);
/**
 * DrawView Module
 */

// ES6 imports


class DrawViewObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

  constructor() {
    super();
    const self = this;
    this.drawView = [];
        
    $(document).ready(function() {
      $(".element.fc.DrawViewContainer").each(function (obj) {
        let objName = $(this)[0].getAttribute("obj-name");                
        self.initDrawView(objName);
      });
    });

    this.getProperty = Object.assign(this.getProperty, {
      "Alpha": (objName) => {
        return $(this.getEleByObjName(objName)).css("opacity") * 100;
      },

      "Background color": (objName) => {
        return $(this.getEleByObjName(objName)).css("background-color");
      },

      "Pen Color": (objName) => {
        return this.drawView[objName].penColor;
      },

      "Pen Width": (objName) => {
        return this.drawView[objName].maxWidth;
      }
    });

    this.setProperty = Object.assign(this.setProperty, {
      "Alpha": (objName, value) => {
        $(this.getEleByObjName(objName)).css({"opacity": value / 100});
      },

      "Background color": (objName, value) => {
        $(this.getEleByObjName(objName)).css({"background": value});
        this.drawView[objName].backgroundColor = value;
      },

      "Pen Color": (objName, value) => {
        this.drawView[objName].penColor = value;
      },

      "Pen Width": (objName, value) => {
        this.drawView[objName].maxWidth = value;
      }
    });
  }

   
  initDrawView (objName) {
    const self = this;

    let ele = this.getEleByObjName(objName);
    
    let width = $(ele).attr("width");
    let height = $(ele).attr("height");
    //let ratio = width / height;
    $(ele).attr("width",width);
    $(ele).attr("height",height);
    ele.getContext("2d").scale(1, 1);

    this.drawView[objName] = new SignaturePad(ele, {
      maxWidth: $(ele).attr("max-width"),
      penColor: $(ele).attr("pen-color"),
      backgroundColor:$(ele).attr("bg-color")
    });

    if ($(ele).attr("bg-image")) {
      const img = this.getBackgroundImage($(ele).attr("bg-image"));
      this.setBackgroundImage(this.drawView[objName], img, width, height);
    }
  }

  onStrokeStart (obj,callback) {
    this.drawView[obj].onBegin = function() {
      callback();
    };
  }

  onStrokeEnd (obj,callback) {
    this.drawView[obj].onEnd = function() {
      callback();
    };
  }

  getSvg(obj) {
    let dataURI =  this.drawView[obj].toDataURL("image/svg+xml");
    let svg = atob(dataURI.replace(/data:image\/svg\+xml;base64,/, ""));
    return svg;
  }

  getImage(obj) {
    let canvas = this.getEleByObjName(obj);
    var imageUrl= canvas.toDataURL();
    let img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    return img;
  }

  getBackgroundImage(url) {
    // returns the background of draw view
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    return img;
  }

  setBackgroundImage(view, img, w, h) {
    view._canvas.getContext("2d").drawImage(img, 0, 0, w, h);
  }

  clear(obj) {
    this.drawView[obj].clear();
    try {
      const canvas = $("[obj-name=" + obj + "]").find("canvas");
      if (canvas.attr("bg-image")) {
        const img = this.getBackgroundImage(canvas.attr("bg-image"));
        this.setBackgroundImage(
          this.drawView[obj], img, canvas.attr("width"), canvas.attr("height"));
      }
    } catch (err) {
      console.error("Could not restore background image");
    }
  }

  getEleByObjName (obj) {
    let parentEle = "[obj-name=\"" + obj + "\"]";
    let canvas = $(parentEle).find("canvas")[0];
    return canvas;
  }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (DrawViewObject);

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class EventListenersLibrary {

  constructor() {
    this.listenersMap = {};
    this.librariesMap = {};
  }

  register(id, lib, method) {
    if (!this.listenersMap[id]) {
      this.listenersMap[id] = {};
    }
    this.listenersMap[id][this.getInstance(lib)] = method;
  }

  invoke(id, instance, args) {
    if (this.listenersMap[id] && this.listenersMap[id][instance]) {
      return this.listenersMap[id][instance].apply(this, args);
    }
  }

  mapLib(name, instance) {
    this.librariesMap[name] = instance;
  }

  getInstance(lib) {
    return this.librariesMap[lib];
  }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (EventListenersLibrary);

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class FireBaseObject {

    constructor() {
        this.regToken = null;
        this.tokenRefreshCallback = null;
        this.messageReceivedCallback = null;
    }

    configure(properties) {
        if ( !('serviceWorker' in window.parent.navigator) ) {
            console.log("Firebase push messaging is not supported by this browser.");
            return;
        }
        console.log("firebase init script");

        const self = this;
        const prop = JSON.parse(properties);

        const config = {
            apiKey: prop['api-key'].text,
            projectId: prop['project-id'].text,
            messagingSenderId: prop['project-number'].text
        };
        const usePublicVapidKey = prop["public-vapid-key"].text;

        const firebase = this.getFirebase();
        let initialized = true;
        try {
            firebase.app();
        }
        catch (e) {
            initialized = false;
        }
        if (!initialized) {
            console.log('Initializing firebase app.');
            firebase.initializeApp(config);
            const messaging = firebase.messaging();

            console.log('Registering service worker ...');
            window.parent.navigator.serviceWorker
                .register('firebase-messaging-sw.js?messagingSenderId=' + config.messagingSenderId, {scope: "firebase-cloud-messaging-push-scope"})
                .then(
                    registration => {
                        messaging.useServiceWorker(registration);
                        console.log('Service worker registered');
                        self.onServiceWorkerRegistered();
                    },
                    err => console.log('firebase-messaging registration failed: ', err)
                );
            messaging.usePublicVapidKey(usePublicVapidKey);
        }
        else {
            // firebase initialized, registering the callbacks
            self.onServiceWorkerRegistered();
        }

        // messaging.requestPermission()
        //     .then(() => messaging.getToken())
        //     .then(token => {
        //         console.log('registration token: ', token);
        //         self.regToken = token;
        //     });
    }

    getFirebase() {
        let fb;
        if (typeof firebase === 'undefined')
            fb = window.parent.firebase;
        else
            fb = firebase;
        return fb;
    }

    onServiceWorkerRegistered() {
        console.log('Firebase, registering snap callbacks.');
        const self = this;
        const firebase = this.getFirebase();
        const messaging = firebase.messaging();

        messaging.requestPermission()
            .then(() => messaging.getToken())
            .then(token => {
                console.log('registration token: ', token);
                self.regToken = token;
            });

        messaging.onTokenRefresh( () => {
            console.log('TokenRefresh received. ', payload);
            messaging.getToken()
                .then( refreshedToken => {
                    console.log('Refreshed registration token: ', refreshedToken);
                    self.regToken = refreshedToken;
                    self.tokenRefreshCallback(refreshedToken);
                })
                .catch(
                    err => console.log('Unable to retrieve refreshed token ', err)
                );
        });

        messaging.onMessage( payload => {
            console.log('Message received. ', payload);
            self.messageReceivedCallback(payload.from, payload);
        });

        window.parent.navigator.serviceWorker.addEventListener('message', event => {
            const payload = event.data;
            console.log('Received a message from service worker: ', payload);
            if (payload.type && payload.type === 'web-push-message') {
                self.messageReceivedCallback('', payload);
            }
        });
    }

    onRegTokenRefresh(callback) {
        this.tokenRefreshCallback = callback;
    }

    onMessageReceived(callback) {
        this.messageReceivedCallback = callback;
    }


    onRegTokenRefreshLegacy(callback) {
        const messaging = firebase.messaging();
        const self = this;

        messaging.onTokenRefresh(() => {
            messaging.getToken()
                .then(refreshedToken => {
                        self.regToken = refreshedToken;
                        callback(refreshedToken);
                    },
                    err => console.log('Unable to retrieve refreshed token ', err)
                );
        });
    }

    onMessageReceivedLegacy(callback) {
        const messaging = fb.messaging();

        messaging.onMessage( payload => {
            console.log('Message received. ', payload);
            callback(payload.from, payload);
        });
    }

    getRefreshedToken() {
        return this.regToken;
    }

  getUniqueDeviceId () {
    //hs: cardcoding for now.
    var deviceId = localStorage.getItem("firebase_unique_device_id");
    if( deviceId == undefined ) {
      deviceId = this.uuidv4();
      localStorage.setItem("firebase_unique_device_id", deviceId);
    }
    return deviceId;
  }

  uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

}

/* harmony default export */ __webpack_exports__["a"] = (FireBaseObject);



/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(1);
/**
 * Created by Luca Latini on 24/04/17.
 */

// ES6 imports


class GaugeObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {


    constructor() {
        super();

        const self = this;
        this.gauge = [];

        $(document).ready(function() {
            //setTimeout( function() {
            $('.element.fc.Gauge').each(function (obj) {
                let objName = $(this)[0].getAttribute('obj-name');
                self.gauge[objName] = self.init(objName);
                //    self.graph[objName].unload();    this is used to hide the Graph when the preview has been loaded
            });
            //   }, 1000);
        });

        this.getProperty = Object.assign(this.getProperty, {
            'Alpha': (objName) => {
                return $(this.getGaugeElemFromName(objName)).css('opacity') * 100;
            },

            'Background color': (objName) => {
                return $(this.getGaugeElemFromName(objName)[0]).css("background-color");
            },

            'Current Value': (objName) => {
               return this.gauge[objName].data()[0].values[0].value;
            },

            'Maximum Value': (objName) => {
                return this.gauge[objName].internal.config.gauge_max;
            },

            'Minimum Value': (objName) => {
                return this.gauge[objName].internal.config.gauge_min;
            },

            'track color': (objName) => {
                var elemSelector = '[obj-name="' + objName + '"]';
                return d3.selectAll(elemSelector + ' path.c3-chart-arcs-background').style('fill');

            },

            'pointer color': (objName) => {
                return d3.selectAll(this.getGaugeElemFromName(objName)).select('path.c3-arc-data').style('fill');

            },

            'track width': (objName) => {
                return this.gauge[objName].internal.config.gauge_width;

            }

        });

        this.setProperty = Object.assign(this.setProperty, {
            'Alpha': (objName, value) => {
                d3.selectAll(this.getGaugeElemFromName(objName)).style('opacity', value/100)


            },

            'Background color': (objName, value) => {
                var elemSelector = '[obj-name="' + objName + '"]';
                $(elemSelector + ' svg').css("background-color",value);


            },

            'Current Value': (objName, value) => {
                this.gauge[objName].load({columns: [['data', value]]});
                var el = this.gauge[objName];
               // this.gauge[objName] = this.gaugeRender(objName)


            },

            'Maximum Value': (objName, value) => {
                this.gauge[objName].internal.config.gauge_max = value;
                var gaugeData = this.gauge[objName].data();
                var gaugeCurrVal = gaugeData[0].values[0].value;
                this.gauge[objName].load({columns: [['data', gaugeCurrVal]]});

            },

            'Minimum Value': (objName, value) => {

                this.gauge[objName].internal.config.gauge_min = value;
                var gaugeData = this.gauge[objName].data();
                var gaugeCurrVal = gaugeData[0].values[0].value;
                this.gauge[objName].load({columns: [['data', gaugeCurrVal]]});
            },

            'track color': (objName, value) => {
                var elemSelector = '[obj-name="' + objName + '"]';
                d3.selectAll(elemSelector + ' path.c3-chart-arcs-background').style('fill', value)


            },

            'pointer color': (objName, value) => {
                d3.selectAll(this.getGaugeElemFromName(objName)).select('path.c3-arc-data').style('fill', value);


            },

            'track width': (objName, value) => {
                this.gauge[objName].internal.config.gauge_width = value;
                var gaugeData = this.gauge[objName].data();
                var gaugeCurrVal = gaugeData[0].values[0].value;
                this.gauge[objName].load({columns: [['data', gaugeCurrVal]]});

            }
        });

    }

    getGaugeElemFromName (objName) {
        return this.getElemFromName(objName).find('#fcGauge');
    }

    init(objName) {

        var $is = this.getGaugeElemFromName(objName)[0];
        var ele = $is;

        //    this.$el.css({
        //      "opacity": this.getGaugeElemFromName(objName)[0].getAttribute('opacity')
        //});


        var bg = this.getProperty["Background color"](objName);
        var gaugeMin = this.getGaugeElemFromName(objName)[0].getAttribute('gaugeMin');
        var gaugeMax = this.getGaugeElemFromName(objName)[0].getAttribute('gaugeMax');
        var gaugeVal = this.getGaugeElemFromName(objName)[0].getAttribute('gaugeVal');
        var gaugeTrackWidth = this.getGaugeElemFromName(objName)[0].getAttribute('gaugeTrackWidth');
        var gaugeTrackColor = this.getProperty["track color"](objName);
        var gaugePointerColor = this.getProperty["pointer color"](objName);

        const self = this;

        // let gaugeRender2 = function(objName) {
        //
        //     if (self.gauge[objName]) {
        //         bg = self.getProperty["Background color"](objName);
        //         gaugeMin = self.getProperty["Minimum Value"](objName);
        //         gaugeMax = self.getProperty["Maximum Value"](objName);
        //         gaugeVal = self.getProperty["Current Value"](objName);
        //         gaugeTrackColor = self.getProperty["track color"](objName);
        //         gaugePointerColor = self.getProperty["pointer color"](objName );
        //         self.setProperty["pointer color"](objName, gaugePointerColor);
        //         self.setProperty["track color"](objName, gaugeTrackColor);
        //     }
        // };

        this.getGaugeElemFromName(objName).css({
            "background-color": bg
        });


        var gauge = c3.generate({
            bindto:$is,
            data: {
                columns: [
                    ['data', gaugeVal]
                ],
                type: 'gauge',
                color: function (color, d) {
                        return self.getProperty["pointer color"](objName) == 'none' ? color : self.getProperty["pointer color"](objName);
            }
            },
            oninit: function() {
                d3.select(ele).selectAll('path.c3-chart-arcs-background').style("fill", self.getProperty["track color"](objName));
            },
            gauge: {
                min: gaugeMin,
                max: gaugeMax,
                width: gaugeTrackWidth, // for adjusting arc thickness,
                expand: true,
                startingAngle:0,
                label: {
                    format: function(value, ratio) {
                        return "";
                    },
                    show: false
                },

            },
            color: {
                pattern: [gaugePointerColor]
            },
            size: {
                height: self.getProperty["height"](objName) / 2,
                width: self.getProperty["width"](objName)
            },
            tooltip: {
                show: false
            }
        });

        return gauge;


    }

    // animationStart(objName, animation, onCompleteCallback) {
    //     if (animation.type === 'scale') {
    //         let duration = animation.duration*1000;
    //         let options = {duration: duration, complete: onCompleteCallback, queue: animation.id};
    //         let elemDiv = this.getElemFromName(objName);
    //         let elemSvg = $('[obj-name="'+objName+'"] svg');
    //         let newWidth = elemDiv.width() * animation.dX;
    //         let newHeight = elemDiv.height() * animation.dY;
    //         let leftDelta = (newWidth - elemDiv.width()) / 2;
    //         let topDelta = (newHeight - elemDiv.height()) / 2;
    //         var zoom = elemDiv[0].style.transform +' scaleX('+animation.dX+') scaleY('+animation.dY+')';
    //         elemDiv.animate({'transform': zoom}, options);
    //         //
    //         //  newWidth = elemSvg.width() * animation.dX;
    //         //  newHeight = elemSvg.height() * animation.dY;
    //         //  leftDelta = (newWidth - elemSvg.width()) / 2;
    //         //  topDelta = (newHeight - elemSvg.height()) / 2;
    //         // elemSvg.animate({width:newWidth+'px', height:newHeight+'px', left: '-='+leftDelta+'px', top: '-='+topDelta+'px'}, options);
    //         // elemDiv.dequeue(animation.id);
    //         elemDiv.dequeue(animation.id);
    //     }
    //     else  super.animationStart(objName, animation, onCompleteCallback)
    // };
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (GaugeObject);

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Google Fit implementation
** Created by Harish Shanthi Kumar on 06/08/2018
*/

class GoogleFitObject {
  //Supported devices are heart_rate, blood_pressure, glucometer, spo2
  constructor() {
    this.authToken = null;
    this.dataSourceIdMap = {};
    this.scopeMap = {};
    this.dataSourceIdMap["com.google.step_count.delta"] = "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps";
    this.dataSourceIdMap["com.google.calories.expended"] = "derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended";
    this.dataSourceIdMap["com.google.distance.delta"] = "derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta";
    this.dataSourceIdMap["com.google.heart_rate.bpm"] = "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm";
    this.dataSourceIdMap["com.google.weight"] = "derived:com.google.weight:com.google.android.gms:merge_weight";
    this.dataSourceIdMap["com.google.blood_pressure"] = "derived:com.google.blood_pressure:com.google.android.gms:merged";

    this.scopeMap["com.google.heart_rate.bpm"] = "https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.body.write";
    this.scopeMap["com.google.weight"] = "https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.body.write";
    this.scopeMap["com.google.blood_pressure"] = "https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.blood_pressure.write";

  }

  configure(config) {
  }

  configureAuth(authLostCallback) {
    this.authLostCallback = authLostCallback;
  }

  authorize(dataTypes, clientId, clientSecret, redirectURL, successcallback, failurecallback) {
    let self = this;
    
    let url = "https://accounts.google.com/o/oauth2/v2/auth?client_id="+clientId+"&redirect_uri="+redirectURL+"&scope=https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.body.write https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.blood_pressure.write&response_type=code";
    let authWindow = window.open(url, 'authWindow', 'height=600,width=450');
    
    if (window.focus) {
      authWindow.focus();
    }
    try {
      let timer = setInterval(function(){
        let urlParams = new URLSearchParams(authWindow.location.search);
        let payload = {
          "grant_type":"authorization_code",
          "client_id":clientId,
          "client_secret":clientSecret,
          "code":urlParams.get('code'),
          "redirect_uri":redirectURL
        };
        if(urlParams.get('code')) {

          var settings = {
            "crossDomain": true,
            "url": "https://www.googleapis.com/oauth2/v4/token",
            "headers": {
              "content-type": "application/x-www-form-urlencoded"
            },
            "data": payload
          }

          $.post(settings).done(function (response) {
            self.authToken = response.access_token;
            self._setToken(self.authToken);
            successcallback();
            authWindow.close();
            clearInterval(timer);
          },function(e) {
            clearInterval(timer);
          });
        }
      },500);
    } catch (e) {
      clearInterval(timer);
      failurecallback();
    }
  }

  deAuthorize() {
    this._resetToken();
  }

  isAuthorized() {
    return (this._getToken() != undefined) ? true : false;
  }

  isAvailable() {
    return true;
  }

  async readHistoricalData(startDate, endDate, dataTypes, successcallback, failurecallback) {

    let parent = this;
    let reqDataTypes = [];
    
    if( dataTypes.length <= 0 )
      return;
    
    if( startDate == null ) {
      startDate = new Date();
    }
    startDate.setHours(0,0,0,0);

    if( endDate == null ) {
      endDate = new Date();
    }
    endDate.setHours(24, 0, 0, 0);

    let reqHeaders = {"Authorization": "Bearer "+this._getToken(), "Content-Type" : "application/json"};
    var reqBody = {
        "aggregateBy": reqDataTypes,
        "bucketByTime": { "durationMillis": 86400000 },
        "startTimeMillis": startDate.getTime(),
        "endTimeMillis": endDate.getTime()
    };
    
    var historicalDataMap = {};
    var historicalData = [];

    for( let i=0; i<dataTypes.length; i++) {
      reqDataTypes = [];
      reqDataTypes.push({
        "dataSourceId":parent.dataSourceIdMap[dataTypes[i]]
      });
      reqBody["aggregateBy"] = reqDataTypes;
      try {
        let resp = await parent._readHistorical(reqHeaders, reqBody);
        let data = parent._parseHistoricalData(resp);
        
        for (let day=0; day<data.length; day++) {
          let dailyCapsule = data[day];
          let startdate = dailyCapsule["startdate"];
          if( !historicalDataMap.hasOwnProperty(startdate) ) {
              historicalDataMap[startdate] = dailyCapsule;
          }
          else {
            for (var key in dailyCapsule) {
              if (dailyCapsule.hasOwnProperty(key)) {
                if( key != "startDate") {
                  historicalDataMap[startdate][key] = dailyCapsule[key];
                }
              }
            }
          }
        }
      }
      catch(e) {
        console.log(e.responseJSON)
        let errorCode = e.responseJSON.error.code;
        if (errorCode != 403) {
          failurecallback(e.responseJSON);
          return;
        }
      }
      
    }

    for( let startdate in historicalDataMap) {
      historicalData.push( historicalDataMap[startdate]);
    }
    successcallback(historicalData);
    //console.log(historicalData);
  }

  async _readHistorical(reqHeaders, reqBody) {
    return $.ajax(
    {
      url: "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      type: "POST",
      headers: reqHeaders,
      data: JSON.stringify(reqBody)
    }); 
  }

  readTodayData(dataType, successcallback, failurecallback) {

    let parent = this;
    let startDate = new Date();
    startDate.setHours(0,0,0,0);
    let endDate = new Date();
    endDate.setHours(24,0,0,0);

    let reqBody = {
      "aggregateBy": [{
        "dataSourceId":parent.dataSourceIdMap[dataType]
      }],
      "bucketByTime": { "durationMillis": 86400000 },
      "startTimeMillis": startDate.getTime(),
      "endTimeMillis": endDate.getTime()
    };

    let reqHeaders = {"Authorization": "Bearer "+this._getToken(), "Content-Type" : "application/json"};

    $.ajax(
    {
      url: "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      type: "POST",
      headers: reqHeaders,
      data: JSON.stringify(reqBody),
      success: function (response) {
        try {
          let bucket = response.bucket[0]; 
          let point = bucket.dataset[0].point[0];
          let todayData = {};
          todayData["startdate"] = bucket.startTimeMillis;
          todayData["enddate"] = bucket.endTimeMillis;
          parent._populateFields(todayData, point);
          successcallback(todayData);
        }
        catch(e) {
          failurecallback(e);
        }
      },
      error: function(xhr, code, msg) {
        failurecallback(code + ': '+ msg);
      }
    }); 
  }

  async recordSample(dataType, data, successcallback, failurecallback) {
    let self = this;
    let scope = this.scopeMap[dataType];
    
    //writing is currently only supported for hr, weight and bp
    if( scope == undefined ) {
      failurecallback("Unsupported recording type. Currently only HR, Weight and BP supported");
      return;
    }

    try {
      var dataSource = await this._getDataSource(dataType);
      if( dataSource == undefined) {
        dataSource = await this._createDataSource(dataType);
      }
      console.log(dataSource);
      if( dataSource != undefined ) {
        let response = await this._recordSample(dataSource, data);
        successcallback();
      }
      else {
        failurecallback("Could not record sample");
      }
      
    }
    catch(e) {
      console.log(e);
      failurecallback(e);
    }
  }
  
  async _getDataSource(dataType) {
    let reqHeaders = {"Authorization": "Bearer "+this._getToken(), "Content-Type" : "application/json"};    
    
    try {
      let dataSource = await $.ajax({
        url: "https://www.googleapis.com/fitness/v1/users/me/dataSources/raw:"+dataType+":SnapClinical",
        type: 'GET',
        headers: reqHeaders
      });
      return dataSource;
    }
    catch(e) {
      return undefined;
    }
    
  }

  async _createDataSource(dataType) {
    let fields = this._getFields(dataType);

    let reqHeaders = {"Authorization": "Bearer "+this._getToken(), "Content-Type" : "application/json"};

    let reqBody = {
      "dataStreamName": "SnapClinical",
      "type": "raw",
      "application": {
        "detailsUrl": "http://snapclinical.com",
        "name": "SnapClinical",
        "version": "1"
      },
      "dataType": {
        "name": dataType,
        "field": fields
       }
    };
    try {
      let dataSource = await $.ajax({
        url: "https://www.googleapis.com/fitness/v1/users/me/dataSources",
        type: 'POST',
        headers: reqHeaders,
        data: JSON.stringify(reqBody)
      });
      return dataSource;
    }
    catch(e) {
      return undefined;
    }
  }

  async _recordSample(dataSource, sample) {
    var currDate = new Date();
    var timeStampMillis = currDate.getTime();
    var timeStampNanosStart = timeStampMillis * 1000000;
    var timeStampNanosEnd = timeStampNanosStart+1;

    let reqHeaders = {"Authorization": "Bearer "+this._getToken(), "Content-Type" : "application/json"};
    let values = this._getSampleValues(dataSource.dataType.name, sample);
    let reqBody = {
      
     "minStartTimeNs": timeStampNanosStart,
     "maxEndTimeNs": timeStampNanosEnd,
     "dataSourceId": dataSource.dataStreamId,
     "point": [
      {
       "startTimeNanos": timeStampNanosStart,
       "endTimeNanos": timeStampNanosEnd,
       "dataTypeName": dataSource.dataType.name,
       "value": values
      }
     ]
    };
    let dataType = dataSource.dataType.name;
  
    let response = await $.ajax({
        url: "https://www.googleapis.com/fitness/v1/users/me/dataSources/raw:"+dataType+":SnapClinical/datasets/" +timeStampNanosStart + "-" + timeStampNanosEnd,
        type: 'PATCH',
        headers: reqHeaders,
        data: JSON.stringify(reqBody)
    });
    return response;
  }

  _getFields(dataType) {
    let fields = [];

    if( dataType == "com.google.heart_rate.bpm") {
      let fieldHr = {
        "name": "bpm",
        "format": "floatPoint",
        "optional": false
      };
      fields.push(fieldHr);
    }
    else if( dataType == "com.google.weight") {
      let fieldWeight = {
        "name": "weight",
        "format": "floatPoint",
        "optional": false
      };
      fields.push(fieldWeight);
    }
    else if( dataType == "com.google.blood_pressure") {
      let fieldSystolic = {
        "name": "systolic",
        "format": "floatPoint",
        "optional": false
      };
      let fieldDiastolic = {
        "name": "diastolic",
        "format": "floatPoint",
        "optional": false
      };
      fields.push(fieldSystolic);
      fields.push(fieldDiastolic);
    }
    return fields;
  }

  _getSampleValues(dataType, sample) {
    let values = [];

    if( dataType == "com.google.heart_rate.bpm") {
      let hr = sample["hr"];

      let value = {
        "fpVal": hr
      };
      values.push(value);
    }
    else if( dataType == "com.google.weight") {
      let weight = sample["weight"];

      let value = {
        "fpVal": weight
      };
      values.push(value);
    }
    else if( dataType == "com.google.blood_pressure") {
      let systolic = sample["systolic"];
      let diastolic = sample["diastolic"];

      let value1 = {
        "fpVal": systolic
      };
      let value2 = {
        "fpVal": diastolic
      }

      values.push(value1);
      values.push(value2);
    }
    return values;
  }
  
  _populateFields(data, point) {
   
    if( point != undefined ) {
      //fields["startdate"] = point.startTimeNanos / 1000;
      //fields["enddate"] = point.endTimeNanos / 1000;
      if( point.dataTypeName == "com.google.step_count.delta") {
        let value = point.value[0].intVal;
        data["steps"] = value;
      }
      else if( point.dataTypeName == "com.google.calories.expended") {
        let value = point.value[0].fpVal;
        data["calories"] = Math.round(value);
      }
      else if( point.dataTypeName == "com.google.distance.delta") {
        let value = point.value[0].fpVal / 1000; //meters to kms
        data["distance"] = value.toFixed(2);
      }
      else if( point.dataTypeName == "com.google.heart_rate.summary") {
        this._setStatsData(data, "hr", point, 0, true);
      }
      else if( point.dataTypeName == "com.google.weight.summary") {
        this._setStatsData(data, "weight", point, 0, false);
      }
      else if( point.dataTypeName == "com.google.blood_pressure.summary") {
        this._setStatsData(data, "bp_systolic", point, 0, true);
        this._setStatsData(data, "bp_diastolic", point, 3, true);
      }
    } 
  }

  _parseHistoricalData(data) {
    let historicalCapsule = [];
    try {
      for(let i=0; i<data.bucket.length; i++) {
        let bucket = data.bucket[i];
        let dailyCapsule = {};
        dailyCapsule["startdate"] = bucket.startTimeMillis;
        dailyCapsule["enddate"] = bucket.endTimeMillis;
        for(let j=0; j<bucket.dataset.length; j++) {
            let dataset = bucket.dataset[j];
            let point = dataset.point[0];
            this._populateFields(dailyCapsule, point);
        }
        historicalCapsule.push(dailyCapsule);
      }
    }
    catch(e) {
    }
    return historicalCapsule;
  }

  _setStatsData(data, field, point, offset, roundOff) {
      let average = point.value[offset].fpVal;
      let max = point.value[offset+1].fpVal;
      let min = point.value[offset+2].fpVal;

      data[field + "_average"] = (roundOff == true) ? Math.round(average) : average.toFixed(2);
      data[field + "_max"] = (roundOff == true) ? Math.round(max) : max.toFixed(2);
      data[field + "_min"] = (roundOff == true) ? Math.round(min) : min.toFixed(2);
  }

  _setToken(token) {
    sessionStorage.setItem("token", token);
  }

  _getToken() {
    return sessionStorage.getItem("token");
  }

  _resetToken() {
    sessionStorage.removeItem('token');
  }
}
// export class to a global variable for use of the JavaScriptDistLib (only)
var com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = com.fc.JavaScriptDistLib || {};
com.fc.JavaScriptDistLib.GoogleFit = GoogleFitObject;
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (GoogleFitObject);


/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(1);
/**
 * Created by Luca Latini on 19/04/17.
 */

// ES6 imports


class GraphContainerObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {


    constructor() {
        super();
        // this.this.getGraphElemFromName(objName)Ref = this.getGraphElemFromName(objName)Ref || '';
        const self = this;
        this.graph = [];
        this.graphData = {};
        this.graphDataCallback = null;
        this.labelTransformCallbackMap = {};

        $(document).ready(function() {
            //setTimeout( function() {
                $('.element.fc.GraphContainer').each(function (obj) {
                    let objName = $(this)[0].getAttribute('obj-name');
                    let chartData = {};
                    chartData.columns = [['x', 10, 20, 30, 40, 50],['fcData', 10, 20, 30, 40, 50]]
                    chartData.unload = true;
                    self.graph[objName] = self.init(chartData, objName);
                //    self.graph[objName].unload();    this is used to hide the Graph when the preview has been loaded
                });
         //   }, 1000);
        });

        this.getProperty = Object.assign(this.getProperty, {
            'BG Color': (objName) => {
                return this.getGraphElemFromName(objName).css('background-color');
            },

            'Type': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('graphType');
            },
            'Legends': (objName) => {
               // let val = d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-legend-item').style("visibility") == 'visible'? true : false ;
               // return val;
                return this.getGraphElemFromName(objName)[0].getAttribute('legendShow') === 'true'
            },

            'Grid': (objName) => {
               // let val = d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-grid').style('visibility') == 'visible'? true : false ;
              //  return val;
                return this.getGraphElemFromName(objName)[0].getAttribute('gridShow') === 'true'
            },

            'X Axis Text': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').html();
            },

            'Y Axis Text': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('text').html();
            },

            'X Axis Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('path').style("stroke");
            },

            'Y Axis Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('path').style("stroke");
            },

            'X Axis Text Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style("fill");
            },

            'Y Axis Text Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style("fill");
            },

            'X Axis Line Width': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('path').style("stroke-width");
            },

            'Y Axis Line Width': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('path').style("stroke-width");
            },

            'Legend Text': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('text.c3-axis-x-label').style("stroke");
            },

            'Fill Alpha': (objName) => {
                let type = this.getProperty["Type"](objName);
                if (type == 'line')
                    return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('.c3-area ').style('opacity') * 100;
                else return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-bars ').selectAll('path').style('opacity') * 100;
            },

            'Fill Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('.c3-area ').style('fill');
            },

            'Bar Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-bar').selectAll('path').style('fill');
            },

            'Line Width': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-lines').selectAll('path').style("stroke-width");
            },

            'Line Circle Color': (objName) => {
                    return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').style("fill");
            },

            'Line Filled': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('linePlotDrawfilled') === 'true';
            },

            'Smooth Line': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('linePlotSmoothline') === 'true';
            },

            'Circle Radius': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').attr('r');
            },

            'Draw Line Values': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('drawLineValues') === 'true';
            },

            'Draw Values': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('drawBarValues') === 'true';
            },

            'Axis Font Size': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style('font-size');
            },

            'X Axis Culling': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('xAxisCulling') === 'true';
            }
        });

        this.setProperty = Object.assign(this.setProperty, {

            'BG Color': (objName, value) => {
                this.getGraphElemFromName(objName).css('background-color',value);
            },

            'Type': (objName, value) => {
                this.getGraphElemFromName(objName).attr('graphType', value);
                this.graph[objName].transform(value);
            },

            'Legends': (objName, value) => {
                let show = 'visible';
                if (!value)
                    show = 'hidden';
                this.getGraphElemFromName(objName).attr('legendShow', value)
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-legend-item').style("visibility", show);
            },

            'Grid': (objName, value) => {
                let show = 'visible';
                if (!value)
                    show = 'hidden';
                this.getGraphElemFromName(objName).attr('gridShow', value)
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-grid').style('visibility',show);
            },

            'X Axis Text': (objName, value) => {
                this.graph[objName].axis.labels({x: value});
            },

            'Y Axis Text': (objName, value) => {
                this.graph[objName].axis.labels({y: value});
            },

            'X Axis Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('path').style("stroke", value);
            },

            'Y Axis Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('path').style("stroke", value);
            },

            'X Axis Text Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style("fill", value);
            },

            'Y Axis Text Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style("fill", value);
            },

            'X Axis Line Width': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('path').style("stroke-width", value);
            },

            'Y Axis Line Width': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('path').style("stroke-width", value);
            },

            'Legend Text': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('text.c3-axis-x-label').style("stroke", value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('text.c3-axis-y-label').style("stroke", value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-legend-item').selectAll('text').style("stroke", value);
            },

            'Fill Alpha': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('.c3-area ').style('opacity',value/100);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-bars ').selectAll('path').style('opacity',value/100);
            },

            'Fill Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('.c3-area ').style('fill',value);
            },

            'Bar Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-bar').selectAll('path').style('fill',value)
            },

            'Line Width': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-lines').selectAll('path').style("stroke-width", value);
            },

            'Line Circle Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').style("stroke", value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').style("fill", value);
            },

            'Circle Radius': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').attr('r',value);
            },

            'Draw Line Values': (objName, value) => {
                let show = 'visible';
                if (!value)
                    show = 'hidden';
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-text').selectAll('text').style("visibility", show);
            },

            'Draw Values': (objName, value) => {
                this.setProperty["Draw Line Values"](objName, value);
            },

            'Axis Font Size': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style('font-size',value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style('font-size',value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('text.c3-text').style('font-size',value);
            },

            'Line Filled': (objName, value) => {
                if (value)
                    this.graph[objName].transform('area');
                else
                    this.graph[objName].transform('line');
                this.getGraphElemFromName(objName).attr('linePlotDrawfilled', value)
            },

            'Smooth Line': (objName, value) => {
                if (value)
                    this.graph[objName].transform('area-spline');
                else
                    this.graph[objName].transform('area');
                this.getGraphElemFromName(objName).attr('linePlotSmoothline', value)
            },
            'X Axis Culling': (objName, value) => {
                this.getGraphElemFromName(objName).attr('xAxisCulling', value)
            },
        });
    }

    getGraphElemFromName (objName) {
        return this.getElemFromName(objName).find('#fcLine');
    }
    
    createChartWithList(objName,xArr,yArr,name) {

        let graphData = this.graphData[objName];
        if( graphData == undefined ) {
            graphData = {};
        }

        let graph = this.graph[objName];
        let xAxisData = ['x'];
        let yAxisData = [name];

        if( yArr!=null ) {

            let populateXAxis = false;

            if( xArr!=null ) {
                for(let xIndex=0; xIndex<xArr.length; xIndex++) {
                    xAxisData.push(xArr[xIndex]);
                }
            }
            else {
                populateXAxis = true;
            }


            for(let i=0; i<yArr.length; i++) {
                yAxisData.push(yArr[i]);
                if( populateXAxis )
                    xAxisData.push(i);
            }

            graphData['x'] = xAxisData;
            graphData[name] = yAxisData;
            this.graphData[objName] = graphData;
        
        } else { throw this.graphException(e); }
    }

    addChartTransition(objName,x,y) {

        let graph = this.graph[objName];
        let graphData = this.graphData[objName];

        if( graphData == undefined )
            return;
        
        let chartData = {};
        chartData.columns = [];
        let existingCols = ['fcData'];

        for (var key in graphData) {
           if (graphData.hasOwnProperty(key)) {
             existingCols.push(key);
             chartData.columns.push(graphData[key]);
           }
        }
        
        graph.load({
          columns:chartData.columns,
          unload: true
        });
        
        /*
        let updatedGraph = setTimeout(function () {
            graph.flush();
        }, x);
    
        return updatedGraph;
        */
    }

    addValuesToChart(objName,xVal,yVal,name) {

        let graph = this.graph[objName];

        let xAxisArr = graph.categories();
        xAxisArr.push(xVal);
        let yAxisArr = [];
        
        let chartData = {};
        chartData.columns = [];

        for (let i=0;i<graph.data().length;i++) {
            let data = [graph.data()[i].id];
            for (let j=0;j<graph.data()[i].values.length;j++) {
                data.push(graph.data()[i].values[j].value);
            }
            if (graph.data()[i].id == name) {
                data.push(yVal);
            }
            yAxisArr.push(data);
        }
        for (let i=0;i<graph.data().length;i++) {
            if (graph.data()[i].id != name) {
                let newArr = [name];
                newArr.push(yVal);
                yAxisArr.push(newArr);    
            }
        }
        
        chartData.columns = yAxisArr;
        chartData.categories = xAxisArr;
        chartData.unload = true;
    
        return graph.load(chartData);
    }

    onDataSelected (objName,callback) {
        this.graphDataCallback = callback;
    }

    setLabelTransformFunc(objName, callback) {
        this.labelTransformCallbackMap[objName] = callback;
    }

    graphException(snappMessage, msg) {
        this.name = "GraphException";
        this.snappMessage = snappMessage;
        //custom message from snapp.
        this.message = msg || snappMessage;
        this.stack = (new Error()).stack;
    }

    init(chartData, objName) {
        let ele = this.getGraphElemFromName(objName)[0];
        let graphType  = ele.getAttribute('graphType');
        let circleColor = '';
        if (graphType !== 'bar') {
            circleColor = this.getProperty["Line Circle Color"](objName);
        }
        let fillAlpha;
        let fillColor = graphType == 'bar' ? this.getProperty["Bar Color"](objName) : this.getProperty["Fill Color"](objName);
        let linePlotWidth = graphType == 'line' ? this.getProperty["Line Width"](objName) : '';
        let axisFontSize = this.getProperty["Axis Font Size"](objName);
        let xAxisLabelText = this.getProperty["X Axis Text"](objName);
        let yAxisLabelText = this.getProperty["Y Axis Text"](objName);
        let xAxisColor = this.getProperty["X Axis Color"](objName);
        let yAxisColor = this.getProperty["Y Axis Color"](objName);
        let xAxisTextColor = this.getProperty["X Axis Text Color"](objName);
        let yAxisTextColor = this.getProperty["Y Axis Text Color"](objName);
        let xAxisLineWidth = this.getProperty["X Axis Line Width"](objName);
        let yAxisLineWidth = this.getProperty["Y Axis Line Width"](objName);
        let legendTextColor = this.getProperty["Legend Text"](objName);
        let drawLineValues = this.getProperty["Draw Line Values"](objName);
        let drawBarValues = this.getProperty["Draw Values"](objName);
        let legendShow = this.getProperty["Legends"](objName);
        let gridShow = this.getProperty["Grid"](objName);
        let circleRadius = graphType == 'line' ? this.getProperty["Circle Radius"](objName) : '';
        let fillBarAlpha;
        let chartType;
        let xAxisCulling = this.getProperty["X Axis Culling"](objName);

        if (graphType == 'line') {
            if (ele.getAttribute('linePlotSmoothline') == 'true') {
                if (ele.getAttribute('linePlotDrawfilled') == 'true')
                    chartType = "area-spline";
                else
                    chartType = "spline";
            } else {
                if (ele.getAttribute('linePlotDrawfilled') == 'true')
                    chartType = "area";
                else
                    chartType = "line";
            }
        } else {
            //BAR
            chartType = "bar";
        }

        const self = this;

        let lineInit = function(objName) {

            if (self.graph[objName]) {
                ele = self.getGraphElemFromName(objName)[0];
                graphType  = self.getProperty["Type"](objName);
                circleColor = '';
                if (graphType !== 'bar') {
                    circleColor = ele.getAttribute('circleColor');
                }
                fillAlpha = ele.getAttribute('fillLineAlpha');
                fillColor = graphType == 'bar' ? self.getProperty["Bar Color"](objName) : self.getProperty["Fill Color"](objName);
                linePlotWidth = graphType == 'line' ? self.getProperty["Line Width"](objName): '';
                axisFontSize = self.getProperty["Axis Font Size"](objName);
                xAxisLabelText = self.getProperty["X Axis Text"](objName);
                yAxisLabelText = self.getProperty["Y Axis Text"](objName);
                xAxisColor = self.getProperty["X Axis Color"](objName);
                yAxisColor = self.getProperty["Y Axis Color"](objName);
                xAxisTextColor = self.getProperty["X Axis Text Color"](objName);
                yAxisTextColor = self.getProperty["Y Axis Text Color"](objName);
                xAxisLineWidth = self.getProperty["X Axis Line Width"](objName);
                yAxisLineWidth = self.getProperty["Y Axis Line Width"](objName);
                legendTextColor = self.getProperty["Legend Text"](objName);
                drawLineValues = self.getProperty["Draw Line Values"](objName);
                drawBarValues = self.getProperty["Draw Values"](objName);
                legendShow = self.getProperty["Legends"](objName);
                gridShow = self.getProperty["Grid"](objName);
                circleRadius = graphType == 'line' ? self.getProperty["Circle Radius"](objName) : '';
                fillBarAlpha = ele.getAttribute('fillBarAlpha');

            }

            d3.select(ele).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style("fill", xAxisTextColor);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style("fill", yAxisTextColor);
            d3.select(ele).selectAll('text.c3-axis-x-label').style("stroke", legendTextColor);
            d3.select(ele).selectAll('text.c3-axis-y-label').style("stroke", legendTextColor);
            d3.select(ele).selectAll('g.c3-legend-item').selectAll('text').style("stroke", legendTextColor);
            d3.select(ele).selectAll('g.c3-texts').selectAll('text').style("fill", legendTextColor);
            d3.select(ele).selectAll('g.c3-axis-x').selectAll('path').style("stroke", xAxisColor);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('path').style("stroke", yAxisColor);
            d3.select(ele).selectAll('g.c3-axis-x').selectAll('g.tick').selectAll('line').style("stroke", xAxisColor);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('g.tick').selectAll('line').style("stroke", yAxisColor);
            d3.select(ele).selectAll('g.c3-axis-x').selectAll('path').style("stroke-width", xAxisLineWidth);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('path').style("stroke-width", yAxisLineWidth);

            if (legendShow) {
                d3.select(ele).selectAll('text.c3-axis-x-label').style("visibility", 'visible');
                d3.select(ele).selectAll('text.c3-axis-y-label').style("visibility", 'visible');
                d3.select(ele).selectAll('g.c3-legend-item').style("visibility", 'visible');
            } else {
                d3.select(ele).selectAll('g.c3-legend-item').style("visibility", 'hidden');
            }

            
            //Draw Values
            if (graphType != 'bar') {
                if (drawLineValues)
                    d3.select(ele).selectAll('g.c3-chart-text').selectAll('text').style("visibility", 'visible');
                else
                    d3.select(ele).selectAll('g.c3-chart-text').selectAll('text').style("visibility", 'hidden');
            }

            if (graphType == 'bar') {
                if (drawBarValues)
                    d3.select(ele).selectAll('g.c3-chart-text').selectAll('text').style("visibility", 'visible');
                else
                    d3.select(ele).selectAll('g.c3-chart-text').selectAll('text').style("visibility", 'hidden');
            }
            setTimeout( function() {
                d3.select(ele).selectAll('circle').style("stroke", circleColor);
                d3.select(ele).selectAll('circle').style("fill", circleColor);
            },100);
            d3.select(ele).selectAll('g.c3-chart-lines ').selectAll('path').style('opacity', 1);
            d3.select(ele).selectAll('.c3-area ').style('fill', fillColor);
            d3.select(ele).selectAll('.c3-shape ').style('stroke', fillColor);
            d3.select(ele).selectAll('path.c3-line').style('stroke-width', linePlotWidth);
            //Bar
            d3.select(ele).selectAll('g.c3-chart-bars ').selectAll('path').style('opacity', fillBarAlpha);
            d3.select(ele).selectAll('g.c3-chart-bar').selectAll('path').style('fill', fillColor);
            //Font Size
            d3.select(ele).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style('font-size', axisFontSize);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style('font-size', axisFontSize);
            d3.select(ele).selectAll('text.c3-text').style('font-size', axisFontSize);
        };

        this.getGraphElemFromName(objName).css({
            "background-color": this.getProperty["BG Color"](objName)
        });

        let graph = c3.generate({
            bindto: ele,
            data: {
                columns: chartData.columns,
                labels: {
                    format: function(v, id, i, j) {
                        let labelTransformCallback = self.labelTransformCallbackMap[objName];
                        if( labelTransformCallback!=undefined )
                            return labelTransformCallback(id, v);
                        return v;
                    }
                },
                type: chartType,
                colors: {
                    Data : fillColor
                },
                x: 'x',
                onclick: function(e) { 
                    self.graphDataCallback(e.id,e.x,e.value);
                }
            },
            size: {
                width: parseInt(this.getElemFromName(objName)[0].style['width'], 10),
                height: parseInt(this.getElemFromName(objName)[0].style['height'], 10)
            },
            color: {
                pattern: [fillColor]
            },
            onrendered: function () {
                try {
                    lineInit(objName);
                }  catch (e) {
                    console.log (e);
                }
            },
            point: {r:circleRadius},
            transition: {
                duration: 0
            },
            grid: {
                x : {
                    show:gridShow
                },
                y: {
                    show:gridShow   
                }
            },
            axis: {
                x: {
                    type: 'category',
                    // categories: ['1', '2','3','4','5'],
                    // min:0,
                    tick: {
                        culling:xAxisCulling
                    },
                    label: {
                        text: xAxisLabelText
                    }
                },
                y: {
                    label: {
                        text: yAxisLabelText
                    },
                    tick: {
                        culling:true,
                        format: d3.format('.0f')
                    }
                }
            }
        });
        

        return graph;
    }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (GraphContainerObject);

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_grid_common_list_grid_common_module_js__ = __webpack_require__(3);
/**
 */
/*global $ */

// ES6 imports


class GridViewObject extends __WEBPACK_IMPORTED_MODULE_0__list_grid_common_list_grid_common_module_js__["a" /* default */] {
  constructor() {

    super();
    

    this.setProperty = Object.assign(this.setProperty, {

      "height": (obj, value) => {
        try {
          if (obj.hasClass("GridViewCell")) {
            obj.each(function(i) {
              $(this).css("height",value+"px");
              $(this).css("top",value*(i));
            });  
          }
        } catch (e) {
          //GridView
          var elem = $('[obj-name= "' + obj + '"]');
          $(elem).css("height",value+"px");
        }

      },

      Alpha: (obj, value) => {
        try {
          if (obj.hasClass("GridViewCell")) {
            obj.each(function(i) {
              $(this).css("opacity", value/100 );
            });  
          }
        } catch (e) {
          //Gridview
          var elem = $('[obj-name= "' + obj + '"]');
          $(elem).css("opacity", value/100 );
        }
      },
      "Background color" : (obj, value) => {
        try {
          if (obj.hasClass("GridViewCell")) {
            obj.each(function(i) {
              $(this).attr("cell-bg-color",value);
              $(this).css("background-color", value);
            });  
          }
        } catch (e) {
          //Gridview
          var elem = $('[obj-name= "' + obj + '"]');
          $(elem).css("background-color", value);
        }

      },
    });
  }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (GridViewObject);

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* HealthKit implementation*/

class HealthKitObject {
  
  constructor() {
    
  }

  authorize(dataTypes, successcallback, failurecallback) {
    successcallback();
  }

  isAvailable() {
    return false;
  }


  readHistoricalData(startDate, endDate, dataTypes, successcallback, failurecallback) {

    let parent = this;
    let reqDataTypes = [];
    
    if( dataTypes.length <= 0 )
      return;
    
    if( startDate == null ) {
      startDate = new Date();
    }
    startDate.setHours(0,0,0,0);

    if( endDate == null ) {
      endDate = new Date();
    }
    endDate.setHours(24, 0, 0, 0);
    
    let numDays = this.daysDiff(startDate,endDate);
    
    var retVal = [];
    
    try {
      for (var i=0;i<numDays;i++) {
        let newDate = new Date(startDate.getTime() + i*24*60*60*1000);
        retVal[i] = {"startdate" : newDate};
        for (var j=0;j<dataTypes.length;j++) {
          
          if (dataTypes[i] = "apple.step_count.delta") {
            retVal[i].steps = Math.floor(Math.random()*(15000-5000+1)+5000);
          }

          if (dataTypes[i] = "com.apple.distance.delta") {
            retVal[i].distance = Math.floor(Math.random()*(10-2+1)+2);
          }

          if (dataTypes[i] = "com.apple.calories.expended") {
            retVal[i].calories = Math.floor(Math.random()*(2500-1500+1)+1500);
          }

          if (dataTypes[i] = "com.apple.weight") {
            retVal[i].weight = Math.floor(Math.random()*(75-70+1)+70);
          }

          if (dataTypes[i] = "com.apple.heart_rate.bpm") {
            retVal[i].hr = Math.floor(Math.random()*(180-50+1)+50);
          }

          if (dataTypes[i] = "com.apple.blood_pressure") {
            retVal[i].bp_systolic = Math.floor(Math.random()*(140-110+1)+50);
            retVal[i].bp_diastolic = Math.floor(Math.random()*(100-80+1)+50);
          }
          
        }
      }
      successcallback (retVal);
    } catch (e) {
      failurecallback (e);
    }

  }

  daysDiff (date1,date2) {
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  
  recordSample(dataType, data, successcallback, failurecallback) {
    successcallback();
  }

}
// export class to a global variable for use of the JavaScriptDistLib (only)
var com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = com.fc.JavaScriptDistLib || {};
com.fc.JavaScriptDistLib.HealthKit = HealthKitObject;
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (HealthKitObject);


/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(1);
// ES6 imports


class ImageObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

  constructor() {
    super(" image");

    var self = this;

    // this.getProperty['Image'] = function(objName) {
    //   return this.getElemFromName(objName).attr('src');
    // };

    this.getProperty["Image"] = function(objName) {
      let elemSelector = self.getElemFromName(objName);
      let el = $(elemSelector).find("img");
      return el.get()[0];
    };

    this.getProperty["Scaling"] = function(objName) {
      return self.getElemFromName(objName).attr("scale-type");
    };

    // this.setProperty['Image'] = function(objName, value) {
    //     let elemSelector = '[obj-name="' + objName + '"]';
    //     let elem = $(elemSelector);
    //     elem.find('img').attr('src',value);
    // };

    this.setProperty["Image"] = function(objName, image) {

      // let elemSelector = '[obj-name="' + objName + '"]';
      // let elem = $('[obj-name="' + objName + '"]').find('img')
      // elem.attr('src', image.src);

      // getting the native element
      let $oldElem = $("[obj-name=\"" + objName + "\"]").find("img");
      let oldElem = $oldElem.get()[0]; // getting the native element

      // make a copy of the input image
      // this copy will replace the current immage
      let newElem = image.cloneNode();

      // copy all existing img attributes to the new element except src
      for (let i = 0; i < oldElem.attributes.length; i++)
      {
        let attribute = oldElem.attributes[i];
        if (! newElem.getAttribute(attribute.name))
          newElem.setAttribute(attribute.name, attribute.value);
      }
      $oldElem.replaceWith(newElem);
    };

    this.setProperty["Scaling"] = function(objName, value) {
      let elemSelector = "[obj-name=\"" + objName + "\"]";
      let elem = $(elemSelector);
            
      switch (value) {
      case "stretch":
        $(elemSelector + " img").css("width","inherit");
        $(elemSelector + " img").css("height","inherit");
        $(elemSelector + " img").attr("scale-type","stretch");
        break;
      case "fit":
        $(elemSelector + " img").css("width","inherit");
        $(elemSelector + " img").css("height","initial");
        $(elemSelector + " img").attr("scale-type","fit");
        break;
      case "crop":
        $(elemSelector + " img").css("width","initial");
        $(elemSelector + " img").css("height","initial");
        $(elemSelector + " img").attr("scale-type","crop");
        break;
      }
    };
  }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ImageObject);



/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(1);
// ES6 imports


class ImageLibrary {

    constructor() {}

    // static createImageFromUrl(url, successCallBack) {
    //     successCallBack (url);
    // }

    createImageFromUrl(url, successCallBack, failureCallBack) {
        let img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = url;

        img.onload = (e) => {
            successCallBack (e.srcElement);
            // successCallBack (img);
        };

        img.onerror = (e) => {
          console.log('createImageFromUrl, losd error', e);
          failureCallBack(e);
        }
    }

    createImageFromResource(resourceUrl) {
        let img = new Image();
        img.crossOrigin = "anonymous";
        img.src = resourceUrl;
        return img;
    }

    /* async getWidth (image) {

        let img = new Image();
        // img.onload = this.getWidthAndHeight;

        img.src = image;
        let load = () => {
          return new Promise( (resolve,reject) => {
            img.onload = resolve;
          });
        };
        let event = await load();
        console.log('async getWidth, check:', event);

        let width = event.srcElement.width;
        console.log('async getWidth, width:', width);
        return width;

        // let img = document.createElement('img');
        // img.setAttribute('src', image);
        // let width = img.getAttribute('width');
        // return width;
    } */


    // getWidth (image) {
    //   let img = new Image();
    //   img.src = image;
    //   let width = img.width;
    //   return width;
    // }

    getWidth (image) {
        return image.width;
    }

    // getHeight (image) {
    //   let img = new Image();
    //   img.src = image;
    //   let height = img.height;
    //   return height;
    // }

    getHeight (image) {
        return image.height;
    }

    // isImage (image) {
    //     let img = new Image();
    //     img.src = image;
    //     let width = img.width;
    //     if (width > 0) {
    //         return true;
    //     }
    //     return false;
    // }

    isImage (image) {
        let name = image.constructor.name;
        if ( name === 'HTMLImageElement')
            return true;
        else
            return false;
    }

    // applyFilter (image, effect, obj) {
    //   let elemSelector = '[obj-name="'+obj+'"]';
    //   let elem = $(elemSelector + ' img');
    //   switch (effect) {
    //     case "B&W":
    //       $(elem).css('filter','grayscale(1)');
    //       break;
    //     case "SEPIA":
    //       $(elem).css('filter','sepia(1)');
    //       break;
    //   }
    //   return image;
    // }

    applyFilter (image, effect) {
        let clonedImage = image.cloneNode();
        // let clonedImage = image;
        switch (effect) {
            case "B&W":
                $(clonedImage).css('filter','grayscale(1)');
            break;
            case "SEPIA":
                $(clonedImage).css('filter','sepia(1)');
            break;
        }
        return clonedImage;
    }

    // resize (image,width,height,obj) {
    //     let elemSelector = '[obj-name="'+obj+'"]';
    //     let elem = $(elemSelector + ' img');
    //     $(elem).width(width);
    //     $(elem).height(height);
    //     return image;
    // }

    // resize (image, width, height) {
    //   // let elemSelector = '[obj-name="'+obj+'"]';
    //   // let elem = $(elemSelector + ' img');
    //   let elem = image;
    //   $(elem).width(width);
    //   $(elem).height(height);
    //   return image;
    // }

    resize (image, width, height) {

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        let newImage = new Image();
        newImage.crossOrigin = "anonymous";


        if (image.width > 0) {
          ctx.drawImage(image, 0, 0, width, height);
          let imageData = canvas.toDataURL("image/png");
          newImage.src = imageData;
        }
        else {
          image.onload = () => {
            ctx.drawImage(image, 0, 0, width, height);
            let imageData = canvas.toDataURL("image/png");
            newImage.src = imageData;
          }
        }
        return newImage;
    }

    isImageEqual (image1,image2) {
        // let firstImage = new Image();
        // let secondImage = new Image();
        // firstImage.src = image1;
        // secondImage.src = image2;
        let firstImage = image1;
        let secondImage = image2;
        if (this.getBase64Image(firstImage) === (this.getBase64Image(secondImage))) {
            return true;
        }
    }

    clone (image) {
        let clonedImage = image.cloneNode();
        return clonedImage;
    }


    getBase64Image(img) {
        // img.crossOrigin = "Anonymous";
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        let dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    getAverageColourFromImage (image, success) {
        // let img = new Image ();
        // img.src = image;
        let img = image;
        let colour = this.getAverageRGB (img, 5);
        success (colour);
    }

    getAverageRGB(imgEl, size) {

        // imgEl.crossOrigin = "Anonymous";

        let blockSize = size, // only visit every <size> pixels
            defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = {r:0,g:0,b:0},
            count = 0;
        
        if (!context) {
            return defaultRGB;
        }
        
        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
        
        context.drawImage(imgEl, 0, 0);
    
        try {
            data = context.getImageData(0, 0, width, height);
        } catch(e) {
            /* security error, img on diff domain */
            return defaultRGB;
        }
        
        length = data.data.length;
        
        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
        }
        
        // ~~ used to floor values
        rgb.r = ~~(rgb.r/count);
        rgb.g = ~~(rgb.g/count);
        rgb.b = ~~(rgb.b/count);
        
        return 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
    }

    getPrimaryColour (image, success) {
        // let img = new Image ();
        // img.src = image;
        let img = image;
        // img.crossOrigin = "Anonymous";
        let ele = $(img);
        var colorThief = new ColorThief();
        let palette = colorThief.getPalette(img, 2);
        let primaryColour = 'rgb('+palette[0][0]+','+palette[0][1]+','+palette[0][2]+')';
        success (primaryColour);
    }

    getSecondaryColour (image, success) {
        // let img = new Image ();
        // img.src = image;
        let img = image;
        // img.crossOrigin = "Anonymous";
        let ele = $(img);
        var colorThief = new ColorThief();
        let palette = colorThief.getPalette(img, 2);
        let secondaryColour = 'rgb('+palette[1][0]+','+palette[1][1]+','+palette[1][2]+')';
        success (secondaryColour);
    }

    ImageException(msg) {
        let error = new Error(msg);
        error.name = "ImageException";
        throw error;
    }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ImageLibrary);



/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class JsonObject {

    constructor() {
    }

    parseJSONDataForPath(data, path) {
        let jsonObject = {};
        if (typeof(data) == 'string') {
            try {
                jsonObject = JSON.parse(data);
            }
            catch (e) {
            }
        }
        else if (typeof(data) == 'object') {
            jsonObject = data;
        }
        let jsonPathObject = jsonPath(jsonObject, path);
        //=== is very important. Otherwise 0 will be treated as false as well.
        if (jsonPathObject === false) {
            jsonObject = null;
            return jsonObject;
        }
        else {
            return jsonPathObject;
        }
    }

    parseJSONDataWithCallback(data, successcallback, failurecallback) {
        let jsonObject = {};
        if (typeof(data) == 'string') {
            try {
                jsonObject = JSON.parse(data);
                successcallback(jsonObject);
            }
            catch (e) {
                failurecallback(e);
            }
        }
        else if (typeof(data) == 'object') {
            successcallback(data);
        }
        else {
            failurecallback("Not a valid JSON");
        }
    }

    parseJSONData(data) {
        let jsonObject = {};
        if (typeof(data) == 'string') {
            try {
                jsonObject = JSON.parse(data);
            }
            catch (e) {
                //e['snappMessage'] = 'The input data does not seem a JSON object';
                //throw (e);
            }
            return jsonObject;
        }
        else if (typeof(data) == 'object') {
            return data;
        }
        else {
            return jsonObject;
        }
    }

    isValidJSON(data) {
        let jsonObject = {};
        if (typeof(data) == 'string') {
            try {
                jsonObject = JSON.parse(data);
                return true;
            }
            catch (e) {
                return false;
            }
        }
        else if (typeof(data) == 'object') {
            return true;
        }
        else {
            return false;
        }
    }

    covertToJSON(data) {
        // return this.parseJSONData(data);
        return JSON.stringify(data);
    }

    setObject(value, path, object) {

        let paths = jsonPath(object, path, {resultType: 'PATH'});

        if (paths === false) {
            return;
        }
        // now we have an array of the paths in the object matching the given expression,
        // like:
        // [
        //   "$['store']['book'][0]['author']",
        //   "$['store']['book'][1]['author']",
        //   "$['store']['book'][2]['author']",
        //   "$['store']['book'][3]['author']"
        // ]
        for (let path of paths) {

            let obj = object;
            let prop = object;
            let propName;

            // get the property referred by the path
            let re = /\['?(.*?)'?\]/g; // same as: let re = new RegExp('\\[\'?(.*?)\'?\\]', 'g');
            let propArray;
            while (propArray = re.exec(path)) {
                obj = prop;
                propName = propArray[1];
                prop = prop[propName];
            }
            if (propName) {
                obj[propName] = value;
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (JsonObject);



/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(2);
  // ES6 imports


class LabelObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */] {

  constructor() {
    super(" .label");
    // this.elemSelectorRef = elemSelectorRef || '';
    var self = this;

    this.getProperty = Object.assign(this.getProperty, {
      Text: (objName) => {
        let textFormat = this.getTextElemFromName(objName)[0].getAttribute("textFormat");
        if (textFormat == "Plain Text") {
          return this.getTextElemFromName(objName)[0].getAttribute("plain_text");
        } else return this.getTextElemFromName(objName).html();
      },
      "Max lines": (objName) => {
        return this.getElemFromName(objName).css("-webkit-line-clamp");
      },
      "vertical scroll": (objName) => {
        if (this.getTextElemFromName(objName).css("overflow") == "auto") {
          return "YES";
        } else {
          return "NO";
        }
      }
    });
    this.setProperty = Object.assign(this.setProperty, {
      Text: (objName, value) => {
        let textFormat = this.getTextElemFromName(objName)[0].getAttribute("textFormat");
        if (textFormat == "Plain Text") {
          this.getTextElemFromName(objName).attr("plain_text", value);
          // var data = $('<div>').text(value.replace(RegExp('\\\\n', 'g'), '\n').replace(RegExp('\\\\t', 'g'), '\t')).html().replace(/\n/g,"<br />").replace(/\t/g,"&nbsp;");
          // this.getTextElemFromName(objName).html(data);
          var data = $("<div>").html(value);
          this.getTextElemFromName(objName).html($(data).text());
        } else  {
          this.getTextElemFromName(objName).html(value.replace(RegExp("\\\\n|\\\\t|\\\\r|\\\\r\\\\n", "g"), ""));
        }
      },
      "Max lines": (objName, value) => {
        var elemSelector2 = "[obj-name= \"" + objName + "\"]";
        if (value > 0) {
          $(elemSelector2 + " div.label").css({
            "overflow": "hidden",
            "text-overflow": "ellipsis",
            "display": "-webkit-box",
            "-webkit-line-clamp": value.toString(),
            "-webkit-box-orient": "vertical",
            "height": "auto",
            "padding": "0"
          });
        } else {
          $(elemSelector2 + " div.label").css({
            "text-overflow": "clip",
            "display": "",
            "-webkit-line-clamp": "0",
            "-webkit-box-orient": "",
            "padding": "inherit"
          });
        }
      },
      "vertical scroll": (objName, value) => {
        var elemSelector2 = "[obj-name= \"" + objName + "\"]";
        if (value == "YES") {
          $(elemSelector2 + " div.label").css({
            "overflow": "auto",
            "display": "block"
          });
        } else {
          $(elemSelector2 + " div.label").css({
            "overflow": "hidden"
          });
        }
      }
    });

  }

  /**
   * Computes the height needed to display the whole source
   * @param source        Text String we want to the needed height of
   * @param width
   * @param fontFamily
   * @param fontSize      Font size can be passed as a string like 14px or a number like 14
   * @returns {number}
   */
  getTextHeight(source, width, fontFamily, fontSize) {
    let font = String(fontSize).replace("px", "") + "px" + " " + fontFamily;
    let span = document.createElement("span");

    span.style.font = font;
    span.style.width = width + "px";
    span.style.display = "block";    // Needed to make the text wrap to different lines
    span.style.lineHeight = 1;
    span.innerHTML = source;
    
    // Have to add to the Dom to compute the Height
    document.body.appendChild(span);
    let height = span.offsetHeight;
    document.body.removeChild(span);
    return height;
  }

  //
  //this.getProperty['Max lines'] = function(objName) {
  //    return this.getElemFromName(objName).css('-webkit-line-clamp');
  //};
  //
  //this.setProperty['Max lines'] = function(objName, value) {
  //    var elemSelector2 = '[obj-name= "' + objName + '"]';
  //    $(elemSelector2 + ' div.label').css({
  //      'overflow': 'hidden',
  //      'text-overflow': 'ellipsis',
  //      'display': '-webkit-box',
  //      '-webkit-line-clamp': value.toString(),
  //      '-webkit-box-orient': 'vertical',
  //      'height': 'auto',
  //      'padding':'0'
  //});
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (LabelObject);

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Code generator for list object
** Created by Harish Shanthi Kumar on 09/12/2016
*/

// ES6 imports

class ListsObject {

  constructor() {}

  listAdd (list,item) {
    return list.push(item);
  }

  listContains (list,item) {
    return (list.indexOf(item) > -1) ? true : false;
  }

  listAppend (list1,list2) {
    return list1.concat(list2);
  }

  listCheck (list) {
    return (list instanceof Array) ? true: false;
  }

  listEmpty (list) {
    return list.length = 0;
  }

  listOrder (list,order) {
    list.sort(function(a, b){
      if( order == "ASCENDING" ) {
        return a-b;
      }
      else {
        return b-a;
      }
    });
  }

  //Define custom exceptions pertaining to network module here.
  ListsUnsupportedRequest (msg) {
    let error = new Error(msg);
    error.name = 'ListsUnsupportedRequest';
    //error.snappMessage = "something?";
    throw error;
  }

  //Define custom exceptions pertaining to network module here.
  ListsNetworkException (msg) {
    let error = new Error(msg);
    error.name = 'ListsNetworkException';
    //error.snappMessage = "something?";
    throw error;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ListsObject);

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_grid_common_list_grid_common_module_js__ = __webpack_require__(3);
/**
 * Created by Ravi on 18/07/2017
 */
/*global $ */

// ES6 imports


class ListViewObject extends __WEBPACK_IMPORTED_MODULE_0__list_grid_common_list_grid_common_module_js__["a" /* default */] {
  constructor() {

    super();

    this.setProperty = Object.assign(this.setProperty, {
      "height": (obj, value) => {
        try {
          if (obj.hasClass("ListViewCell")) {
            obj.each(function(i) {
              $(this).css("height",value+"px");
              $(this).css("top",value*(i));
            });  
          }
        } catch (e) {
          //Listview
          var elem = $("[obj-name= \"" + obj + "\"]");
          $(elem).css("height",value+"px");
        }

      },
      "Horizontal separator thick": (obj, value) => {
        obj.find(".border-sep").css("height",value+"px");
      },
      
      Alpha: (obj, value) => {
        
        try {
          if (obj.hasClass("ListViewCell")) {
            obj.each(function(i) {
              $(this).css("opacity", value/100 );
            });  
          }
        } catch (e) {
          //Listview
          var elem = $("[obj-name= \"" + obj + "\"]");
          $(elem).css("opacity", value/100 );
        }
      },
      "Background color" : (obj, value) => {
        
        try {
          if (obj.hasClass("ListViewCell")) {
            obj.each(function(i) {
              $(this).attr("cell-bg-color",value);
              $(this).css("background-color", value);
            });  
          }
        } catch (e) {
          //Listview
          var elem = $("[obj-name= \"" + obj + "\"]");
          $(elem).css("background-color", value);
        }

      }
    });
  }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ListViewObject);

/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Location Module
** Created by Harish Shanthi Kumar on 18/14/2017
*/
class LocationObject {
  
  	constructor() {
  		this.watchID = null;
  		this.lastKnownLocation = {lat: 41.9028, lng: 12.4964};
  	}

	locationCreate (lat,lng) {
	  var locationObj = {lat: lat, lng: lng};
	  return locationObj;
	}

	locationCreateFull(lat, lng, altitude, speed) {
	  var locationObj = {lat: lat, lng: lng, altitude: altitude, speed: speed};
	  return locationObj;
	}

	locationCreateHere() {
		var locationObj = {lat: 0.0, lng: 0.0};
		return locationObj;
	}

	locationGetLatitude(loc) {
		return loc.lat;
	}

	locationGetLongitude(loc) {
		return loc.lng;
	}

	locationGetAltitude(loc) {
		return loc.altitude;
	}

	locationGetSpeed(loc) {
		return loc.speed;
	}

	locationGetDistance(loc1, loc2) {
	  var p = 0.017453292519943295;    // Math.PI / 180
	  var c = Math.cos;
	  var a = 0.5 - c((loc2.lat - loc1.lat) * p)/2 + 
	          c(loc1.lat * p) * c(loc2.lat * p) * 
	          (1 - c((loc2.lng - loc1.lng) * p))/2;
	  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
	}

	createLocationFromText(text, successCallback, errorCallback) {
		console.log ("createLocationFromText " + text);
		var locationArr = text.split(",");
		if( locationArr.length == 2 ) {
			console.log (locationArr);
			var latitude = locationArr[0];
			var longitude = locationArr[1];
			var locationObj = {lat: latitude, lng: longitude};
			successCallback (locationObj);
		}
		else {
			errorCallback ("Invalid Location");
		}
	}

	locationStartTrack(precision, successCallback) {
		var self = this;
		var locCallback = function(position) {
			var locationObj = {lat: position.coords.latitude, lng: position.coords.longitude};
			self.lastKnownLocation = locationObj;
			successCallback(locationObj);
		}
		this.watchID = navigator.geolocation.watchPosition(locCallback);
	}

	locationStopTrack() {
		navigator.geolocation.clearWatch(this.watchID);
	}

	locationCheckGPS() {
		return navigator.geolocation;
	}

	createLocationFromHere () {
		return this.lastKnownLocation;
	}
}

/* harmony default export */ __webpack_exports__["a"] = (LocationObject);



/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(1);


class MapViewObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {
  
  constructor() {
    super(" map view");
    const self = this;
    this.maps = [];
    this.markers = [];
    this.getProperty = Object.assign(this.getProperty, {
      "API key": (objName) => {
        return this.getGraphElemFromName(objName)[0].getAttribute("google-map-api-key");
      },
      "Show User Location": (objName) => {
        return this.getGraphElemFromName(objName)[0].getAttribute("show-user-location");
      }
    });
    this.setProperty = Object.assign(this.setProperty, {
      "API key": (objName, value) => {
        this.getGraphElemFromName(objName).attr("google-map-api-key", value);
      },
      "Show User Location": (objName, value) => {
        this.getGraphElemFromName(objName).attr("show-user-location", value);
      }
    });
  }

  reset() {
   
  }

  onMapReady (obj,callback) {
    let mapContainerChildLen = $("[obj-name= \"" + obj + "\"]").find("#mapContainer").children().length;
    if (mapContainerChildLen > 0) {
      callback();
    }
  }

  mapViewSetZoom(mapName, zoom) {
    return this.maps[mapName].setZoom(zoom);
  }

  toggleMapUserInteraction(mapName, interaction) {
    var options = {
      draggable: false,
      scrollwheel: false,
      panControl: false,
      zoom: this.maps[mapName].getZoom(),
    };
    if (interaction) {
      var options = {
        draggable: true,
        scrollwheel: true,
        panControl: true,
        zoom: this.maps[mapName].getZoom(),
      };
    }
    var newOptions = this.maps[mapName].setOptions(options);
    return newOptions;
  }

  createMarkerWithImage(image, label) {
    var marker = {};
    var ref = new google.maps.Marker({ title: label, icon: image });
    marker.ref = ref;
    this.markers.push(marker);
    return marker;
  }

  setLocationForMarker(marker, location) {
    var latlng = new google.maps.LatLng(location.lat, location.lng);
    marker.ref.setPosition(latlng);
  }

  addMarkerToMap(mapName, marker) {
    marker.mapName = mapName;
    marker.ref.setMap(this.maps[mapName]);
    this.centerMarkers(mapName);
  }

  setMarkerLabel(text, marker) {
    return marker.ref.setTitle(text);
  }

  setMarkerImage(image, marker) {
    return marker.ref.setIcon(image);
  }

  removeMarker(marker) {
    marker.ref.setMap(null);
    var index = this.markers.indexOf(marker);
    if (index >= 0) {
      this.markers.splice( index, 1 );
    }
    this.centerMarkers(marker.mapName);
  }

  mapViewSetLocation(mapName, location, animation) {
    var latlng = new google.maps.LatLng(location.lat, location.lng);
    this.maps[mapName].setCenter(latlng);
  }

  centerMarkers(mapName) {
    var bounds = new google.maps.LatLngBounds();
    for(var i=0; i<this.markers.length; i++) {
      bounds.extend(this.markers[i].ref.getPosition());
    }

    this.maps[mapName].setCenter(bounds.getCenter());
    this.maps[mapName].fitBounds(bounds);
    this.maps[mapName].setZoom(this.maps[mapName].getZoom()-1);
  }

  MapException(snappMessage, msg) {
    this.name = "MapException";
    this.snappMessage = snappMessage;
    //custom message from snapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MapViewObject);




/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Code generator for the Math Library object
 ** Created by Oscar Rangel on 7/12/2016
 */

 // ES6 imports

class MathLibraryObject {

  constructor() {}

  toNumber (num) {
    if (this.isNumber(num)) {
        return Number(num);
    }
    return null;
  }

  isNumber (o) {
    return ! isNaN(o-0) && o !== null && o !== "" && o !== false && o !== true;
  }

  mathCompare (num1, comp, num2) {
    switch (comp) {
      case "EQ":
        return this.toNumber(num1) == this.toNumber(num2);
      case "NEQ":
        return this.toNumber(num1) != this.toNumber(num2);
      case "LT":
        return this.toNumber(num1) < this.toNumber(num2);
      case "LTE":
        return this.toNumber(num1) <= this.toNumber(num2);
      case "GT":
        return this.toNumber(num1) > this.toNumber(num2);
      case "GTE":
        return this.toNumber(num1) >= this.toNumber(num2);
      default:
        return false;
    }
  }

  mathMinMax (num1, comp, num2) {
    switch (comp) {
      case "MIN":
        return Math.min(this.toNumber(num1), this.toNumber(num2));
      case "MAX":
        return Math.max(this.toNumber(num1), this.toNumber(num2));
      default:
        return 0;
    }
  }

  mathMinMaxList (comp, list) {
     switch (comp) {
        case "MIN":
          return Math.min(...list);
        case "MAX":
          return Math.max(...list);
        default:
          return 0;
     }
  }

   mathMinMaxDict (comp, dict) {
    let arr = Object.values(dict)
    switch (comp) {
        case "MIN":
            return Math.min(...arr);
        case "MAX":
            return Math.max(...arr);
        default:
            return 0;
     }
  }

  mathModulo (num1, comp, num2) {
    switch (comp) {
      case "MODULO":
        return this.toNumber(num1)%this.toNumber(num2);
      case "QUOTIENT":
        return Math.floor(this.toNumber(num1)/this.toNumber(num2));
      default:
        return 0;
    }
  }

  mathConversionRadDeg (comp, num) {
    switch (comp) {
      case "DEGTORAD":
        return this.toNumber(num) * (Math.PI/180);
      case "RADTODEG":
        return this.toNumber(num) * (180/Math.PI);
      default:
        return 0;
    }
  }

  mathRoundPrecision (num,percision) {
    return Math.round(this.toNumber(num) * Math.pow(10, this.toNumber(percision))) / Math.pow(10, this.toNumber(percision))
  }

  //Define custom exceptions
}

/* harmony default export */ __webpack_exports__["a"] = (MathLibraryObject);

/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Motion Module
*/

class MotionObject {

    constructor() {
        this.interval = null;
    }

    start (interval,callback) {
        
        this.interval = setInterval(function(){ 
            window.addEventListener('deviceorientation', function(event) {
                console.log ("event fired");
                callback(event);
            });
        }, interval*1000); //MS
        
    }

    stop () {
        try {
            clearInterval(this.interval);
        } catch (e) {
            console.error ("Not capturing Orientation event");
        }
    }

    getX (motion) {
        return motion.beta;
    }

    getY (motion) {
        return motion.gamma;
    }

    getZ (motion) {
        return motion.alpha;
    }

    onPhoneShaken (callback) {
        window.addEventListener('deviceorientation', function(event) {
            console.log ("event fired - shake");
            callback();
        });
    }


}

/* harmony default export */ __webpack_exports__["a"] = (MotionObject);

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class NetworkObject {

  constructor() {}

  createHTTPRequest (url, method) {
    let request = {};
    let protocol = url.split(':')[0];
    if( (method === 'GET' || method === 'POST' || method === 'PUT' || method === 'DELETE') &&
        (protocol === 'http' || protocol === 'https') ) {
      request.url = url;
      request.method = method;
      request.headers = {};
      request.data = {};
      return request;
    }
    else {
      this.HTTPUnsupportedRequest("We support basic http/https operations.<br>Request type can be one of GET/POST/PUT or DELETE");
      return request;
    }
  }

  addHTTPHeader (request, key , value) {
    request.headers[key] = value;
  }

  addHTTPParams (request, key, value) {
    request.data[key] = value;
  }

  setHTTPBody (request, body) {
    if( typeof body == 'object' ) {
      request.data = JSON.stringify(body);
    }
    else if (typeof body == 'string') {
      request.data = body;
    }
    else {
      request.data = "";
      throw new IllegalArgumentException("Body can be currently only of type string or json");
    }
  }

  setDataType (request, type) {
    request.dataType = type;
  }

  setProxyState (request, state) {
    request.proxy = state;
  }

  sendHTTPRequest (request, successcallback, failurecallback) {
    // let url = this.getSanitizedURL(request); // use to use the proxy
    let url = request.url;
    let method = request.method;
    let data = request.data;
    let dataType = request.dataType;
    let headers = request.headers;
    let parent = this;

    $.ajax(
      {
        url: url,
        type: method,
        headers: headers,
        dataType: dataType,
        data: data,
        success: function (response) {
          successcallback(response);
        },
        error: function(xhr, code, msg) {
          failurecallback(code + ': '+ msg);
        }
      });
  }

  getSanitizedURL (request) {
    let proxyUrl = "https://iot.snapp.click:8443/"; // backup 1337
    let isProxyRequired = true; //default is proxy required
    let url = request.url;

    if( (request.proxy != undefined) && (request.proxy === false) ) {
      isProxyRequired = false;
    }

    let sanitizedUrl = url;
    if (isProxyRequired) {
      // url = url.replace(/^.+:\/\//, ""); //Removes all possible protocols - NOTE: not needed with the latest proxy implementation
      sanitizedUrl = proxyUrl + url;
      return sanitizedUrl;
    } else {
      return url;
    }
  }

  //Define custom exceptions pertaining to network module here.

  HTTPUnsupportedRequest (msg) {
    let error = new Error(msg);
    error.name = 'HTTPUnsupportedRequest';
    //error.snappMessage = "something?";
    throw error;
  }

  //Define custom exceptions pertaining to network module here.
  HTTPNetworkException (msg) {
    let error = new Error(msg);
    error.name = 'HTTPNetworkException';
    //error.snappMessage = "something?";
    throw error;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (NetworkObject);


/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Notification Module
*/

class NotificationObject {

  constructor() {
    this.notificationCallBack = null;
    this.notifications = [];
  }

  configure(callback) {
    this.notificationCallBack = callback;
  }

  create (title, text) {
    let notification = {};
    notification["title"] = title;
    notification["bodytext"] = text;
    this.notifications.push(notification);
    return notification;
  }

  getTitle (notification) {
    return notification["title"];
  }

  getText (notification) {
    return notification["bodytext"];
  }

  schedule (time, notification) {
    let self = this;
    let scheduledTime = time;
    notification["timerid"] = setInterval(function(){
      let currTime = new Date();
      if (currTime.toString() == scheduledTime.toString()) {
        self.notify(notification);
        clearInterval(notification["timerid"]);
      }
    },1000);
  }

  cancel (notification) {
    this.cancelNotification(notification);
  }

  cancelAll () {
    let self = this;
    self.notifications.forEach(function (notification) {
      self.cancelNotification(notification);
    });
  }

  cancelNotification(notification) {
    if( notification!= undefined ) {
      clearInterval(notification["timerid"]);
      if( notification["notobject"]!=undefined ) {
        notification["notobject"].close();
        notification["notobject"] = null;
      }
    }
  }

  notify (notification) {
    let self = this;
        
    if (!("Notification" in window)) {
      console.error("Notification not supported");
    }
    else if (Notification.permission === "granted") {
      self.displayNotification(notification);
    }
    else if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          self.displayNotification(notification);
        }
      });
    }
  }

  displayNotification(notification) {
    let self = this;
    let title = notification["title"].replace(/'/g,"");
    let bodyText = notification["bodytext"].replace(/'/g,"");

    notification["notobject"] = new Notification(title, { body: bodyText, 
      requireInteraction: true});
    notification["notobject"].onclick = function(event) {
      event.preventDefault();
      this.close();
      if( self.notificationCallBack!=null )
        self.notificationCallBack(notification);
    };
  }

}

var com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = com.fc.JavaScriptDistLib || {};
com.fc.JavaScriptDistLib.Notification = NotificationObject;

/* harmony default export */ __webpack_exports__["a"] = (NotificationObject);

/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(1);
/**
 * PageView Module Module
 /*global $ 
*/



class PageViewObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {
  constructor() {
    
    super();
    const self = this;
    this.slider = [];
    this.slideChangeCallback = null;
    this.scrollCallback = null;

    $(document).ready(function() {
      $(".snapp-html5.fc.PageView").each(function () {
        let objName = $(this)[0].getAttribute("obj-name");
        let el = $(this);
        $(this).find(".PageView").remove();
        self.slider[objName] = $(this).bxSlider(self.getSliderOptions(el));
        $(this).children().css("opacity",1);
      });
    });

  }

  getSliderOptions (ele) {
    
    let animation = $(ele)[0].getAttribute("page-transition-animation");
    let circular = $(ele)[0].getAttribute("page-circular");
    let indicators = $(ele)[0].getAttribute("show-indicators");

    //Options
    let circularSlides = false;
    if (circular == "YES") {
      circularSlides = true;
    }

    let transitionType = "horizontal";
    let transitionSpeed = 500;

    if (animation == "scroll") {
      transitionType = "horizontal";
      transitionSpeed = 500;
    }

    if (animation == "fade") {
      transitionType = "fade";
      transitionSpeed = 500;
    }

    if (animation == "none") {
      transitionSpeed = 0;
    }

    let showPager = true;
    if (indicators == "NO") {
      showPager = false;
    }

    return {
      "infiniteLoop": circularSlides,
      "mode": transitionType,
      "speed":transitionSpeed,
      "pager": showPager
    };

  }

  scrollToPage (obj,page,animated) {
    this.slider[obj].goToSlide(page,animated);    
  }

  getCurrentPage (obj) {
    return this.slider[obj].getCurrentSlide();
  }

  getPages (obj) {
    let sliderArr = [];
    sliderArr.push(this.slider[obj][0]);
    return sliderArr;
  }

  setPages (obj,pages) {
    // add new item(s) to the slider
    let ele = "[obj-name= '" + obj + "']";
    for (let i=0;i<pages.length;i++) {
      $(ele).append("<div class='PageViewPage'></div>");
    }

    // get the current slide
    let currentSlide = this.slider[obj].getCurrentSlide();
    // reload the instance
    let options = this.getSliderOptions(ele);
    options.startSlide = currentSlide;
    this.slider[obj].reloadSlider(options);
    $(ele).find(".PageViewPage:eq("+currentSlide+")").css("opacity",1);
  }

  onPageChange (obj,callback) {
    this.slideChangeCallback = callback;
    let ele = "[obj-name= '" + obj + "']";
    let options = this.getSliderOptions(ele);
    options.onSlideAfter = function($slideElement, oldIndex, newIndex) {
      callback && callback(newIndex);
    };
    this.slider[obj].reloadSlider(options);
    $(".element.fc.PageView").each(function () {
      $(this).children().css("opacity",1);
    });
  }

  onPageScroll (obj,callback) {
    let ele = "[obj-name= '" + obj + "']";
    let options = this.getSliderOptions(ele);
    options.onSlideAfter = function($slideElement) {
      callback($slideElement[0].offsetLeft);
    };
    this.slider[obj].reloadSlider(options);
    $(".element.fc.PageView").each(function () {
      $(this).children().css("opacity",1);
    });
  }

  refresh (obj) {
    const self = this;
    this.slider[obj].destroySlider(); 
    $(".snapp-html5.fc.PageView").each(function () {
      let objName = $(this)[0].getAttribute("obj-name");
      let el = $(this);
      $(this).find(".PageView").remove();
      self.slider[objName] = $(this).bxSlider(self.getSliderOptions(el));
      $(this).children().css("opacity",1);
    });
    this.onPageChange(obj,this.slideChangeCallback);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (PageViewObject);

/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Phone Library Module
*/

class PhoneObject {

  constructor() {}

  call (number,successCallback,erorCallback) {
    let link = document.createElement("a");
    link.href = "tel:"+number;
    link.click();
    successCallback(); //Telephony callback?
  }

  composeSms () {
    let link = document.createElement("a");
    link.href = "sms: ";
    link.click();
  }

  sendSms (numbers,body) {
    let link = document.createElement("a");
    link.href = "sms:+"+numbers+"?body="+body;
    link.click(); 
  }

  composeEmail () {
    let link = document.createElement("a");
    link.href = "mailto: ";
    console.log (link);
    link.click();  
  }

  sendEmail (to,cc,bcc,subject,message) {
    let link = document.createElement("a");
    link.href = "mailto:"+to+"?subject="+subject+"&cc="+cc+"&bcc="+bcc+"&body="+message;
    console.log (link);
    link.click();    
  }

}

/* harmony default export */ __webpack_exports__["a"] = (PhoneObject);



/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* QR Code Scanner implementation
** Created by Harish Shanthi Kumar on 30/05/2018
*/

class QRCodeScannerObject {
  
  constructor() {
  }

  configure(scanSuccessCallback, scanFailedCallback) {
    //hs: common across all devices. These are events 
    this.scanSuccessCallback = scanSuccessCallback;
    this.scanFailedCallback = scanFailedCallback;
  }

  
  scan() {
    let parent = this;
    let dummyData = {invitecode: "123456789"};
    this.scanSuccessCallback(JSON.stringify(dummyData));
  }

}
// export class to a global variable for use of the JavaScriptDistLib (only)
var com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = com.fc.JavaScriptDistLib || {};
com.fc.JavaScriptDistLib.QRCodeScanner = QRCodeScannerObject;
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (QRCodeScannerObject);

/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(1);
/**
 * Created by Luca Latini on 27/03/17.
 */

// ES6 imports


class ScreenObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

  constructor(elemSelectorRef) {
    super();
    const self = this;
    $(document).ready(function() {
      setTimeout( function() {
        let firstScreen = $(".element.fc.Screen");
        let object_name = firstScreen[0].getAttribute("obj-name");
        let callbackScreen = "show" + object_name;
        if (self.screenDict[callbackScreen]) {
          history.pushState({"view": `${object_name}`}, `${object_name}`, `${object_name}`);
          self.screenDict[callbackScreen]();
        }
      }, 50);
    });

    // Element selector
    this.elemSelectorRef = elemSelectorRef || "";

    // Getting Text properties values

    this.getProperty = Object.assign(this.getProperty, {
      "Background image": (objName) => {
        let img = new Image();
        // img.src = this.getScreenElemFromName(objName).css('background-image');
        let imgEl = this.getScreenElemFromName(objName).find("img");
        img.src = imgEl.attr("src");
        return img;
      },
      x: (objName) => { return 0; }, // some properties of the base-object has been overwritten because
      y: (objName) => { return 0; }  // html5 must have the same behaviour of the android and ios platforms
    });

    this.setProperty = Object.assign(this.setProperty, {
      "Background color": (objName, value) => {
        this.getScreenElemFromName(objName).css({
          "background-color": value,
          "background-image": "",
          "background-size": "",
          "background-repeat": ""
        });
      },
      "Background image": (objName, image) => {
        let imgEl = this.getScreenElemFromName(objName).find("img");
        imgEl.attr("src", image.src);
        //  this.getScreenElemFromName(objName).css({
        //     'background-image': "url('" + image.src + "')",
        //     'background-size': 'contain',
        //     'background-color': '',
        //     'background-repeat': 'no-repeat'
        // });
      },
      width: (objName, value) => {},
      height: (objName, value) => {},
      x: (objName, value) => {},
      y: (objName, value) => {},

      "Loader Visible":(objName, value) => {
        var ele = this.getScreenElemFromName(objName);
        if (value) {
          var overlayColor = $(ele).attr("overlay-color");
          var spinnerUrl = $(ele).attr("spinner-url");
          $(ele).append("<div class = 'spinner-overlay' style = 'background:"+overlayColor+";position:absolute;top:0;left:0;width:100%;height:100%;text-align:center;z-index:1;'><img src = '"+spinnerUrl+"' style = 'position: relative;top: 50%;transform: translateY(-50%);'/></div>");
        } else {
          $(ele).find(".spinner-overlay").remove();
        }
      }
    });

    this.screenDict = {};
  }

  /**
     * Retrieves the screen element with a given object-name attribute
     * @param objName
     * @returns {*|jQuery|HTMLElement}
     */
  getScreenElemFromName (objName) {
    return $("[obj-name= \"" + objName + "\"]" + this.elemSelectorRef);
  }

  init ( elemSelectorRefValue) {
    this.elemSelectorRef = elemSelectorRefValue;
  }

  screenPopInit () {
    const self = this.screenDict;
    window.addEventListener("popstate", function (e) {
      let currentScreen = $(".HTML5-deploy-wrapper .Screen:visible");
      let currentScreenName = currentScreen[0].getAttribute("obj-name");
      let callbackScreen =  "back" + currentScreenName;
      if (self[callbackScreen]) {
        history.pushState({"view": currentScreenName}, currentScreenName, currentScreenName);
        self[callbackScreen]();
      }  else {
        currentScreen.hide();
        $("[obj-name=\"" + e.state.view + "\"]").show();
      }
    });
  }
  screenOrientationInit () {
    const self = this.screenDict;
    window.addEventListener( "orientationchange", function( e ) {
      let currentScreen = $(".HTML5-deploy-wrapper .Screen:visible");
      let currentScreenName = currentScreen[0].getAttribute("obj-name");
      let callbackScreen = "orientation" + currentScreenName;
      if (self[callbackScreen]) {
        let getOrientation = "";
        switch(window.orientation) {
        case -90:
        case 90:
          getOrientation = "landscape";
          break;
        default:
          getOrientation = "portrait";
          break;
        }
        self[callbackScreen](getOrientation);
      }
    });
  }

  displayScreenWithName(screenName) {
    //Close all dialogs
    this.closeDialogs();
    let currentScreen = $(".HTML5-deploy-wrapper .Screen:visible");
    let showScreen = $("[obj-name=\"" + screenName + "\"]");
    if (showScreen.length) {
      currentScreen.hide();
      showScreen.show();
      history.pushState({"view": "${showScreen}"}, "${showScreen}", "${showScreen}");
      currentScreen.triggerHandler("hide");
      showScreen.triggerHandler("show");
    }      
  }

  closeDialogs () {
    //Closes all dialogs used.
    $(".modal").modal('hide');
  }

}

/* harmony default export */ __webpack_exports__["a"] = (ScreenObject);



/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(1);
/**
 * Shapes Module
 */

// ES6 imports


class ShapeObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {
        super();
        const self = this;
        
        this.getProperty = Object.assign(this.getProperty, {
            'Alpha': (objName) => {
                return $(this.getEleByObjName(objName)).css('opacity') * 100;
            },

            'Background color': (objName) => {
                return $(this.getEleByObjName(objName)).css("background-color");
            },

            'Stroke Color': (objName) => {
               return self.getElemFromName(objName).css("border-color");
            },

            'Stroke Width': (objName) => {
                return self.getElemFromName(objName).css("border-width");
            },

            'Stroke Radius': (objName) => {
                return self.getElemFromName(objName).css("border-radius");
            }
        });

        this.setProperty = Object.assign(this.setProperty, {
            'Alpha': (objName, value) => {
               $(this.getEleByObjName(objName)).css("opacity", value / 100);
            },

            'Background color': (objName, value) => {
                let parentEle = '[obj-name="' + objName + '"]';
                $(parentEle).css("background-color", value);
            },

            'Fill Color': (objName, value) => {
                $(this.getEleByObjName(objName)).css("background-color", value);
            },

            'Stroke Color': (objName, value) => {
                $(this.getEleByObjName(objName)).css("border-color", value);
            },

            'Stroke Width': (objName, value) => {
                $(this.getEleByObjName(objName)).css("border-width", value);
            },

            'Stroke Radius': (objName, value) => {
                $(this.getEleByObjName(objName)).css("border-radius", value);
            },
            'type' : (objName,value) => {
                if (value == "rectangle") {
                    $(this.getEleByObjName(objName)).removeClass('ellipse');
                    $(this.getEleByObjName(objName)).addClass('rectangle');
                    $(this.getEleByObjName(objName)).css('height','inherit'); 
                } else if (value == "ellipse") {
                    $(this.getEleByObjName(objName)).removeClass('rectangle');
                    $(this.getEleByObjName(objName)).addClass('ellipse');
                    $(this.getEleByObjName(objName)).css('height','inherit');

                } else {
                    // $(this.getEleByObjName(objName)).removeClass('ellipse');
                    // $(this.getEleByObjName(objName)).css('height','initial'); // Collapse the rect
                    // $(this.getEleByObjName(objName)).css('border-radius',0); // reset border radius
                }
            }
        });
    }
    

    getEleByObjName (obj) {
        let parentEle = '[obj-name="' + obj + '"]';
        let ele = $(parentEle).find(".wrapper")[0];
        return ele;
    }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ShapeObject);

/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(2);
// ES6 imports


class SliderObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */] {

  constructor() {
    super(".Slider");

    var self = this;

    $(document).ready(function() {
      $(".element.fc.Slider").each(function (obj) {
        var ele = $(this).find("#fcSlider")[0];
        $(this).find(".range-bar").remove();
        new Powerange(ele, {
          "hideRange": true,
          "min":$(ele).attr("min"),
          "max":$(ele).attr("max"),
          "start":$(ele).attr("curpos")
        });
        var sliderpos = ($(ele).attr("curpos")/$(ele).attr("max"))*100;
        $(this).find(".range-bar").find(".range-quantity").css("width",sliderpos+"%");
        let offset = 0;
        sliderpos > 65 ? offset = 20 : offset = 0;
        $(this).find(".range-bar").find(".range-handle").css("left", "calc(" + sliderpos +"% - " + offset + "px)");
        $(this).find("#fcSlider").attr("value",sliderpos);

        //Track
        $(this).find(".range-bar").css("background-color", $(ele).attr("track-color"));
        $(this).find(".range-quantity").css("background-color", $(ele).attr("selection-color"));

        //Left & right icons
        if ($(ele).attr("left-icon")) {
          $(this).find(".range-min").css({
            "background-image": "url(" + $(ele).attr("left-icon") + ")"
          });
        }
        if ($(ele).attr("right-icon")) {
          $(this).find(".range-max").css({
            "background-image": "url(" + $(ele).attr("right-icon") + ")"
          });
        }
        if ($(ele).attr("thumb-icon")) {
          $(this).find(".range-handle").addClass("custom");
          $(this).find(".range-handle").css({
            "background-image": "url(" + $(ele).attr("thumb-icon") + ")"
          });
        }

        //BG and selection images
        if ($(ele).attr("bg-image")) {
          const self = this;
          let imgSize = "4px";
          const img = new Image();
          img.src = $(ele).attr("bg-image");
          img.onload = function() {
            imgSize = this.height > 25 ? "25%" : "4px";
            $(self).find(".range-bar").css("height", imgSize);
            if (this.height > 25) {
              $(self).find(".range-handle").css("top", "4px");
              $(self).find(".range-max").css("padding-top", this.height / 2);
              $(self).find(".range-min").css("padding-top", this.height / 2);
            }
          };
          $(this).find(".range-bar").css({
            "background-image": "url(" + $(ele).attr("bg-image") + ")",
            "background-repeat": "no-repeat",
            "background-size": "100% 100%",
            "background-color": "transparent",
            "border-radius": "0"
          });
          // disable all colors to show picture
          $(this).find(".range-quantity").css("background-color", "transparent");

        }
        if ($(ele).attr("selection-image")) {
          $(this).find(".range-quantity").css({
            "background-image": "url(" + $(ele).attr("selection-image") + ")"
          });   
        }

        // on change update curpos
        $(ele).change(function() {
          $(ele).attr("curpos", $(ele).val());
        });
      });
    });

    this.getProperty = Object.assign(this.getProperty, {
      "Current value": (objName) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        return $(ele).find("#fcSlider").attr("curpos");
      },
      "Minimum value": (objName) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        return $(ele).find("#fcSlider").attr("min");
      },
      "Maximum value": (objName) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        return $(ele).find("#fcSlider").attr("max");
      },
      "Left icon": (objName) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        return $(ele).find(".range-min").css("background-image");
      },
      "Right icon": (objName) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        return $(ele).find(".range-max").css("background-image");
      },
      "Thumb icon": (objName) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        return $(ele).find(".range-handle").css("background-image");
      },
      "Background color": (objName) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        return $(ele).find(".range-bar").css("background-color");
      },
      "Selection color": (objName) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        return $(ele).find(".range-quantity").css("background-color");
      },
      "Background image": (objName) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        return $(ele).find(".range-bar").css("background-image");
      },
      "Selection image": (objName) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        return $(ele).find(".range-quantity").css("background-image");
      },
    });
    this.setProperty = Object.assign(this.setProperty, {
      "Current value": (objName, value) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        var max = $(ele).find("#fcSlider").attr("max");
        var currval = (value/max)*100;
        $(ele).find(".range-bar").find(".range-quantity").css("width",currval+"%");
        let offset = 0;
        currval > 65 ? offset = 20 : offset = 0;
        $(ele).find(".range-bar").find(".range-handle").css("left", "calc(" + currval +"% - " + offset + "px)");
        //$(ele).find("#fcSlider").val(value).trigger('change');
        $(ele).find("#fcSlider").attr("curpos",value);
      },
      "Minimum value": (objName,value) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        $(ele).find("#fcSlider").attr("min",value);
      },
      "Maximum value": (objName,value) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        $(ele).find("#fcSlider").attr("max",value);
      },
      "Left icon": (objName,value) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        $(ele).find(".range-min").css({
          "background-image": "url(" + $(value).attr("src") + ")"
        });
      },
      "Right icon": (objName,value) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        $(ele).find(".range-max").css({
          "background-image": "url(" + $(value).attr("src") + ")"
        });
      },
      "Thumb icon": (objName,value) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        $(ele).find(".range-handle").addClass("custom");
        $(ele).find(".range-handle").css({
          "background-image": "url(" + $(value).attr("src") + ")",
          "background-color":"transparent",
          "border-radius":0,
          "background-size":"contain",
          "background-repeat":"no-repeat",
          "background-position":"center center",
          "box-shadow":"none"
        });
      },
      "Background color": (objName,value) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        $(ele).find(".range-bar").css("background-color", value);
      },
      "Selection color": (objName,value) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        $(ele).find(".range-quantity").css("background-color", value);
      },
      "Background image": (objName,value) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        const self = this;
        let imgSize = "4px";
        const img = new Image();
        img.src = $(value).attr("src");
        img.onload = function() {
          imgSize = this.height > 25 ? "25%" : "4px";
          $(self).find(".range-bar").css("height", imgSize);
          if (this.height > 25) {
            $(self).find(".range-handle").css("top", "4px");
            $(self).find(".range-max").css("padding-top", this.height / 2);
            $(self).find(".range-min").css("padding-top", this.height / 2);
          }
        };
        $(ele).find(".range-bar").css({
          "background-image": "url(" + $(value).attr("src") + ")",
          "background-repeat": "no-repeat",
          "background-size": "100% 100%",
          "background-color": "transparent",
          "border-radius": "0"
        });
      },
      "Selection image": (objName,value) => {
        var ele = "[obj-name= \"" + objName + "\"]";
        $(ele).find(".range-quantity").css({
          "background-image": "url(" + $(value).attr("src") + ")"
        });
      },
      "Text": (objName, value) => {
        // do nothing
      }
    });

  }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (SliderObject);

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Smart Devices implementation
** Created by Harish Shanthi Kumar on 01/13/2017
*/

class SmartDevicesObject {
  //Supported devices are heart_rate, blood_pressure, glucometer, spo2
  constructor() {
    //devices
    this.device_type_hrm = "hrm";
    this.device_type_pulse_oximeter = "spo2";
    this.device_type_glucometer = "bg";
    this.device_type_blood_pressure = "bp";
    this.device_type_pedometer = "pedometer";
    
    //hs: ble characteristics of various supported devices
    this.hrm_service_uuid = "0000180d-0000-1000-8000-00805f9b34fb";
    this.pulse_oximeter_service_uuid = "00001822-0000-1000-8000-00805f9b34fb";
    this.fora_spo2_service_uuid = "00001523-1212-efde-1523-785feabcd123";
    this.fora_spo2_characteristic_uuid = "00001524-1212-efde-1523-785feabcd123";
    this.supported_services = [
      this.hrm_service_uuid,
      this.pulse_oximeter_service_uuid,
      this.fora_spo2_service_uuid
    ];

    //hs: Dummy Pedometer simulation
    this.pedometer_simulation_address = "aa:bb:cc:dd:ee";
    this.pedometer_simulation_name = "Pedometer";
    this.pedometer_simulation_protocol = "protocol_internal_pedometer";
    this.pedometer_simulation_timer = undefined;
    this.pedometer_simulation_daily_step_count = 0;
    this.pedometer_simulation_incremental_step_count = 10;
    this.pedometer_simulation_interval = 10000;
    this.pedometer_simulation_default_recordcount = 7;
    
    //hs: active device map
    this.devices = {};
  }

  configure(config) {
  }

  configureDevices(deviceFoundCallback, deviceDisconnectedCallback, deviceDataChangedCallback) {
    //hs: common across all devices. These are events 
    this.deviceFoundCallback = deviceFoundCallback;
    this.deviceDisconnectedCallback = deviceDisconnectedCallback;
    this.deviceDataChangedCallback = deviceDataChangedCallback;
  }

  
  startDiscovery(timeout) {
    let parent = this;

    //hs: pedeometer simulation
    setTimeout( function() {
        parent.devices[parent.pedometer_simulation_address] = {};
        parent.devices[parent.pedometer_simulation_address].type = parent.device_type_pedometer;
        parent.devices[parent.pedometer_simulation_address].name = parent.pedometer_simulation_name;
        parent.devices[parent.pedometer_simulation_address].address = parent.pedometer_simulation_address;
        if( parent.deviceFoundCallback!=undefined )
          parent.deviceFoundCallback(parent.pedometer_simulation_address, parent.pedometer_simulation_name);
    }, 100);

    let options = {
      filters: [
        {services: ["heart_rate"]},
        {services: [0x1822]},
        {services: [0x1809]},
        {services: ["636f6d2e-6a69-7561-6e2e-504f56313100"]},
        {services: ["00001523-1212-efde-1523-785feabcd123"]}
      ]
    };
    return navigator.bluetooth.requestDevice(options)
      .then(device => {
        parent.devices[device.id] = {};
        parent.devices[device.id].bledevice = device;
        parent.devices[device.id].name = device.name;
        parent.devices[device.id].characteristics = new Map();
        parent.deviceFoundCallback(device.id, device.name);
      });
  }

  stopDiscovery() {
    //hs: web bluetooth is dialog based discovery. Cancel option is there
    //in the dialog itself. Nothing to do here.
  }

  getDeviceNameForAddress(deviceAddress) {
    if( this.devices[deviceAddress] != undefined ) {
      return this.devices[deviceAddress].name;
    }
    else {
      return "";
    }
  }

  getDeviceTypeForAddress(deviceAddress) {
    if( this.devices[deviceAddress] != undefined ) {
      return this.devices[deviceAddress].type;
    }
    else {
      return "";
    }
  }

  connectToDevice(deviceAddress, successcallback, failurecallback) {
    let device = this.devices[deviceAddress].bledevice;
    let parent = this;
    if( !device ) {
      //hs: check if device is non ble
      if( this.devices[deviceAddress].type == this.device_type_pedometer ) {
        successcallback();
        this._startPedometerSimulation();
      }
      else {
        failurecallback("Device not found!");  
      }
      return;
    }
    
    device.addEventListener("gattserverdisconnected", event => {
      parent.deviceDisconnectedCallback(deviceAddress);
    });

    device.gatt.connect()
      .then(server => server.getPrimaryServices())
      .then(services => {
        console.log(services);
        var service = services[0];
        for(var i=0; i<services.length; i++) {
          var service = services[i];
          if (this.supported_services.indexOf(service.uuid)!=-1) {
            service = services[i];
            break;
          }
        }
        var characteristicString = this._getRequiredCharacteristics(service);
        service.getCharacteristic(characteristicString)
          .then(characteristic => { 
            console.log(characteristic);
            parent.devices[deviceAddress].characteristics.set(characteristic.uuid, characteristic);
            parent._startNotifications(deviceAddress, characteristic.uuid);
            successcallback();
          })
          .catch(error => { 
            console.log(error);
            failurecallback(error);
          });
      });  
  }

  _getRequiredCharacteristics(service) {
    //hs: we could also return multiple characteristics for a primary
    //service in future.
    let id = service.device.id;
    switch(service.uuid) {
    case this.hrm_service_uuid:
      this.devices[id].type = this.device_type_hrm;
      return "heart_rate_measurement";
    case this.pulse_oximeter_service_uuid:
      this.devices[id].type = this.device_type_pulse_oximeter;
      return "plx_continuous_measurement";
    case this.fora_spo2_service_uuid:
      this.devices[id].type = this.device_type_pulse_oximeter;
      return this.fora_spo2_characteristic_uuid;
      return; 
    }
  }

  disconnectFromDevice(deviceAddress) {
    let device = this.devices[deviceAddress].bledevice;
    if (!device) {
      if( this.devices[deviceAddress].type == this.device_type_pedometer ) {
        this.deviceDisconnectedCallback(deviceAddress);
        this._stopPedeometerSimulation();
      }
      return;
    }
    console.log("Disconnecting from BLE Device..." + deviceAddress);
    if (device.gatt.connected) {
      device.gatt.disconnect();
    } else {
      console.log("BLE Device " + deviceAddress + " already disconnected");
    }

  }

  readDataFromDevice(deviceAddress) {
    //hs: every device needs a different trigger to spit out different data.
    //we decide this based on characteristic for now.
    let device = this.devices[deviceAddress];
    var characteristic = device.characteristics.get(this.fora_spo2_characteristic_uuid);
    if( characteristic!= undefined ) {
      this._requestForaPulseOximeterData(deviceAddress);  
    }
  }

  readHistoricalData(deviceAddress, recordCount, successcallback, failurecallback) {
    var historicalData = [];
    if((this.devices[deviceAddress] == undefined) && 
      (deviceAddress == this.pedometer_simulation_address)) {
        this._createPedometerDeviceSimulation();
    }
    if( this.devices[deviceAddress].type == this.device_type_pedometer ) {
      historicalData = this._populateDummyPedometerReadings(recordCount);
      successcallback(historicalData);
    }
    else {
      failurecallback("Not supported yet for this device");
    }
  }

  readHistoricalDataSync(deviceAddress, recordCount) {
    var historicalData = [];
    if((this.devices[deviceAddress] == undefined) && 
      (deviceAddress == this.pedometer_simulation_address)) {
        this._createPedometerDeviceSimulation();
    }
    if( this.devices[deviceAddress].type == this.device_type_pedometer ) {
      historicalData = this._populateDummyPedometerReadings(recordCount);
    }
    return historicalData;
  }

  _populateDummyPedometerReadings(recordCount) {
    var historicalData = [];
    if(recordCount < 0 )
        recordCount = this.pedometer_simulation_default_recordcount;
      
    var currDate = new Date();
    for(var i=0; i<recordCount; i++) {
      var data = {};
      var entryDate = new Date();
      entryDate.setDate(currDate.getDate()-i);
      data.timestamp = entryDate.getTime();
      data.daily_step_count = this._getRandomInt(5000, 10000);
      historicalData.push(data);
    }
    return historicalData;
  }

  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  _createPedometerDeviceSimulation() {
    this.devices[this.pedometer_simulation_address] = {};
    this.devices[this.pedometer_simulation_address].type = this.device_type_pedometer;
    this.devices[this.pedometer_simulation_address].name = this.pedometer_simulation_name;
    this.devices[this.pedometer_simulation_address].address = this.pedometer_simulation_address;
  }

  _parseHeartRate(value) {
    // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
    value = value.buffer ? value : new DataView(value);
    let flags = value.getUint8(0);
    let rate16Bits = flags & 0x1;
    let result = {};
    let index = 1;
    if (rate16Bits) {
      result.heart_rate = value.getUint16(index, /*littleEndian=*/true);
      index += 2;
    } else {
      result.heart_rate = value.getUint8(index);
      index += 1;
    }
    let contactDetected = flags & 0x2;
    let contactSensorPresent = flags & 0x4;
    if (contactSensorPresent) {
      result.contact_detected = !!contactDetected;
    }
    let energyPresent = flags & 0x8;
    if (energyPresent) {
      result.energy_expanded = value.getUint16(index, /*littleEndian=*/true);
      index += 2;
    }
    let rrIntervalPresent = flags & 0x10;
    if (rrIntervalPresent) {
      let rrIntervals = [];
      for (; index + 1 < value.byteLength; index += 2) {
        rrIntervals.push(value.getUint16(index, /*littleEndian=*/true));
      }
      result.rr_interval = rrIntervals;
    }
    return result;
  }

  _parsePulseOximeterData(value) {
    let index = 0;
    value = value.buffer ? value : new DataView(value);
    let flags = value.getUint8(index);
    index++;
    var result = {};
    result.oxygen = value.getUint16(index, /*littleEndian=*/true);
    index += 2;
    result.heart_rate = value.getUint16(index, /*littleEndian=*/true);
    index+=2;
    return result;
  }

  _requestForaPulseOximeterData(deviceAddress) {
    // encode the command.
    var dataBuffer = new ArrayBuffer(8);
    var writeData = new DataView(dataBuffer);
    writeData.setUint8(0, 0x51); //Start sequence
    writeData.setUint8(1, 0x49); //CMD: Read real time data
    writeData.setUint8(2, 0x00); //Payload:0
    writeData.setUint8(3, 0x00); //Payload:1
    writeData.setUint8(4, 0x00); //Payload:2
    writeData.setUint8(5, 0x00); //Payload:3
    writeData.setUint8(6, 0xA3); //End sequence
    var checkSum = 0x00;
    for(var i=0; i<writeData.byteLength-1; i++) {
      checkSum += writeData.getUint8(i);
    }
    writeData.setUint8(7, checkSum);
    
    this._writeCharacteristicValue(deviceAddress, this.fora_spo2_characteristic_uuid, writeData);
  }

  _parseForaPulseOximeterData(value) {
    value = value.buffer ? value : new DataView(value);
    var command = value.getUint8(1);
    var result = {};
    switch(command) {
    case 0x49://real time data
      result.oxygen = value.getUint16(2, /*littleEndian=*/true);
      result.heart_rate = value.getUint8(5);
      return result;
    case 0x24: //device info
      result.device_model = value.getUint16(2, /*littleEndian=*/true);
      return result;
    }
    return null;
  }

  _getCharacteristic(deviceAddress, characteristicUuid){
    let device = this.devices[deviceAddress];
    if (!device) {
      return null;
    }
    let characteristic = device.characteristics.get(characteristicUuid);
    return characteristic;
  }
  
  _readCharacteristicValue(deviceAddress, characteristicUuid) {
    let characteristic = this._getCharacteristic(deviceAddress, characteristicUuid);
    if( characteristic ) {
      return characteristic.readValue();
    }
  }

  _writeCharacteristicValue(deviceAddress, characteristicUuid, value) {
    let characteristic = this._getCharacteristic(deviceAddress, characteristicUuid);
    if( characteristic!=null ) {
      return characteristic.writeValue(value);  
    }
  }
  
  _startNotifications(deviceAddress, characteristicUuid) {
    let characteristic = this._getCharacteristic(deviceAddress, characteristicUuid);
    if( characteristic!=null ) {
      let parent = this;
      console.log("Registering for data change events on " + characteristicUuid);
      characteristic.startNotifications()
        .then(characteristic => {
          characteristic.addEventListener("characteristicvaluechanged", event => {
            var deviceType = this.devices[deviceAddress].type;
            var retData;

            switch(deviceType) {
            case this.device_type_hrm:
              retData = parent._parseHeartRate(event.target.value);
              console.log("Heart Rate = " + retData.heart_rate);
              break;
            case this.device_type_pulse_oximeter:
              if( characteristicUuid == this.fora_spo2_characteristic_uuid ) {
                retData = parent._parseForaPulseOximeterData(event.target.value);
              }
              else {
                retData = parent._parsePulseOximeterData(event.target.value);
                console.log("Oxygen = " + retData.oxygen + " Heart Rate = " + retData.heart_rate);  
              }
              break;
            }
            if( retData!=null ) {
              parent.deviceDataChangedCallback(deviceAddress, retData);
            }
            
          });
        });   
    }
  }

  _stopNotifications(deviceAddress, characteristicUuid) {
    let characteristic = this._getCharacteristic(deviceAddress, characteristicUuid);
    // Returns characteristic to remove characteristicvaluechanged event
    // handlers in the resolved promise.
    if( characteristic!=null ) {
      return characteristic.stopNotifications()
        .then(() => characteristic);  
    }
  }

  _startPedometerSimulation() {
    console.log("Starting pedometer simulation");
    let parent = this;
    this.pedometer_simulation_timer = setInterval(function() {
      parent.pedometer_simulation_daily_step_count += parent.pedometer_simulation_incremental_step_count;
      var pedometerData = {};
      pedometerData.daily_step_count = parent.pedometer_simulation_daily_step_count;
      parent.deviceDataChangedCallback(parent.pedometer_simulation_address, pedometerData);
    },parent.pedometer_simulation_interval);
  }

  _stopPedeometerSimulation() {
     console.log("Stopping pedometer simulation");
    if( this.pedometer_simulation_timer!=undefined ) {
      clearInterval(this.pedometer_simulation_timer);
    }
  }
}
// export class to a global variable for use of the JavaScriptDistLib (only)
var com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = com.fc.JavaScriptDistLib || {};
com.fc.JavaScriptDistLib.SmartDevices = SmartDevicesObject;
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (SmartDevicesObject);


/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snapclinical__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snapclinical___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_snapclinical__);


class SnapClinicalObject {
  constructor() {
    this.config = {
      baseUrl: "",
      username: "",
      password: "",
      userid: "",
      frontEndKey: "",
      enableOauth: true,
      contextPath: undefined
    };
    this.explicitEnvironmentSet = false;
  }

  configure(config) {
    let properties;
    if (config) {
      properties = JSON.parse(config);
    }
    else if (!this.config.BaseURL) {
      let snapClinicalSO = Creator.currentProject.serviceModel.getServiceObject("SnapClinical");
      properties = snapClinicalSO.attributes.attrs;
    }
    if (properties) {
      let baseUrl = properties.api.url;
      if(baseUrl){
        this.config.baseUrl = properties.api.url;
      }else{
        this.config.baseUrl =  "https://staging.snapclinical.net:8443";
      }
      this.config.frontEndKey = properties.api.frontEndKey;
      this.config.username = properties.api.username;
      this.config.password = properties.api.password;
      this.config.userid = properties.api.userid;
    }
  }

  /**
   * change the configuration if the Based Token Auth property is enabled
   * @param _properties
   */
  configureAuthentication(_properties) {
    let properties = _properties ? JSON.parse(_properties): null;
    if (properties) {
      let auth = properties.api && properties.api.authentication;
      let contextPath = {
        oauth: "snap-oauth",
        snap: "snap-api",
        flowable: "flow-api"
      };
      if (auth === "Basic Auth") {
        this.config.enableOauth = false;
        contextPath.flowable = "flowable-task";
      }
      this.config.contextPath = contextPath;
      __WEBPACK_IMPORTED_MODULE_0_snapclinical__["client"].enableOauth = this.config.enableOauth;
      __WEBPACK_IMPORTED_MODULE_0_snapclinical__["client"].contextPath = this.config.contextPath;
    }
  }

  setEnvironmentVariables(baseUrl, frontEndKey){
    if( baseUrl!=undefined && frontEndKey!=undefined ) {
      this.config.baseUrl = baseUrl;
      __WEBPACK_IMPORTED_MODULE_0_snapclinical__["client"].apiBaseUrl = baseUrl;
      __WEBPACK_IMPORTED_MODULE_0_snapclinical__["client"].frontEndKey = frontEndKey;
      this.explicitEnvironmentSet = true;  
    }
  }

  snapClinicalConfigure(username, password, userid, frontEndKey, baseUrl){
    this.config.username = username;
    this.config.password = password;
    this.config.userid = userid;
    //set only if a call to setEnvironmentVariables has not been called
    
    __WEBPACK_IMPORTED_MODULE_0_snapclinical__["user"].accountName = username;
    __WEBPACK_IMPORTED_MODULE_0_snapclinical__["user"].password = password;
    __WEBPACK_IMPORTED_MODULE_0_snapclinical__["client"].personalId = userid;
    //if setEnvironmentVariables is explicitly called earlier; we don't set these values from
    //properties. On other hand if we don't explicitly set; the values from properties
    //get picked up
    if(this.explicitEnvironmentSet == false) {  
      this.config.baseUrl = baseUrl;
      __WEBPACK_IMPORTED_MODULE_0_snapclinical__["client"].frontEndKey = frontEndKey;
      __WEBPACK_IMPORTED_MODULE_0_snapclinical__["client"].apiBaseUrl = baseUrl;
    }
  }

  /**
   * @deprecated
   * @param processDefKey
   * @param qualifier
   * @param successcallback
   * @param failurecallback
   * @return {Promise<void>}
   */
  async snapClinicalcreateNewInstanceAndGetFirstTask(processDefKey, qualifier, successcallback, failurecallback) {
    console.warn("snapClinicalcreateNewInstanceAndGetFirstTask is deprecated");

    let taskData;
    try {
      taskData = await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["flowService"].createNewInstanceAndGetFirstTask(processDefKey, qualifier);
    }
    catch(e) {
      console.error("Error in createNewInstanceAndGetFirstTask");
      console.error(e);
      failurecallback(e);
      return;
    }
    let vars, flds, outcms;
    vars = flds = outcms = [];

    if (taskData) {
      vars = taskData.variables;
      flds = taskData.fields;
      outcms = taskData.outcomes;
    }
    successcallback(vars, flds, outcms);
  }

  /**
   * @deprecated
   * @param processDefKey
   * @param successcallback
   * @param failurecallback
   * @return {Promise<void>}
   */
  async snapClinicalGetNextTaskOnProcess(processDefKey, successcallback, failurecallback) {
    console.warn("snapClinicalGetNextTaskOnProcess is deprecated");
    let taskData;
    try {
      taskData = await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["flowService"].getNextTask(processDefKey, []);
    }
    catch(e) {
      console.error("Error in GetNextTaskOnProces");
      console.error(e.message);
      failurecallback(e.message);
      return;
    }
    let vars, flds, outcms;
    vars = flds = outcms = [];

    if (taskData) {
      vars = taskData.variables;
      flds = taskData.fields;
      outcms = taskData.outcomes;
    }
    successcallback(vars, flds, outcms);
  }

  /**
   * @deprecated
   * @param variables
   * @param fields
   * @param outcomes
   * @param successcallback
   * @param failurecallback
   * @return {Promise<void>}
   */
  async snapClinicalSaveTaskVariables(variables, fields, outcomes, successcallback, failurecallback) {
    console.warn("snapClinicalSaveTaskVariables is deprecated");
    try {
      await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["flowService"].saveVariables(variables, fields || [], outcomes);
    }
    catch(e) {
      console.error("Error in SaveTaskVariables");
      console.error(e);
      failurecallback(e);
      return;
    }
    successcallback();
  }

  /**
   * @deprecated
   * @param successcallback
   * @param failurecallback
   * @return {Promise<void>}
   */
  async snapClinicalMoveToNextTask(successcallback, failurecallback) {
    console.warn("snapClinicalMoveToNextTask is deprecated");
    let taskData;
    try {
      taskData = await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["flowService"].moveToNextTask();
      console.error("snapClinicalMoveToNextTask::got response");
      if( taskData != null ) {
        // console.log("snapClinicalMoveToNextTask variables" ,taskData.variables);
        // console.log("snapClinicalMoveToNextTask fields" ,taskData.fields);
        // console.log("snapClinicalMoveToNextTask outcomes", taskData.outcomes);
      }
      else {
        console.warn("snapClinicalMoveToNextTask NULL, this means the flow process ends.");
      }
    }
    catch(e) {
      console.error("Error in MoveToNextTask");
      console.error(e);
      failurecallback(e);
      return;
    }
    let vars, flds, outcms;
    vars = flds = outcms = [];

    if (taskData) {
      vars = taskData.variables;
      flds = taskData.fields;
      outcms = taskData.outcomes;
    }
    successcallback(vars, flds, outcms);
  }

  /**
   * Start a new process or resume my existing tasks
   *
   * @param {Object} processData      - object containing process definition,  lookup and initial values for the process
   *                                    see more info on SDk related method
   *
   * @param successcallback
   * @param failurecallback
   * @return {Promise<Array<Object>>}  returns an array of task objects in the form:
   *                                    {processInstanceId: NNNNN, variables: [], formProperties: [], fields: [], ...}
   */
  async startProcess(processData, successCallback, failureCallback) {

    let taskData = [];
    try {
      taskData = await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["snapClinicalApiService"].startNewOrResumeProcess(processData);
    }
    catch(e) {
      console.warn("Error in snapClinical.startProcess", e);
      failureCallback(e);
      return;
    }

    successCallback(taskData);
  }

  /**
   * Helper function to set a form outcome (by name) into a task variable.
   * This will add (or override) an outcome property to the task, corresponding to one of the available
   * outcomes defined in the task itself.
   *
   * @param {Object} taskData       - Object representing the target task to update
   * @param {String} outcomeName    - Name of the outcome to set. This has to be one of the names listed in the
   *                                  {taskData}.formData.outcomes array.
   */
  setOutcomeByName(taskData, outcomeName) {
    if (taskData && taskData.formData && taskData.formData.outcomes) {
      let selectedOutcome;
      for (var i=0; i < taskData.formData.outcomes.length; i++) {
        if (taskData.formData.outcomes[i].name === outcomeName) {
          selectedOutcome = taskData.formData.outcomes[i];
          break;
        }
      }
      if (selectedOutcome) {
        taskData = Object.assign(taskData, {outcome: selectedOutcome});
      } else {
        console.warn("setOutcomeByName: Outcome name not found in the formData");
      }
    }
  }

  /**
   * Completes the provided task and get new tasks
   *
   * @param {Object} taskData  object representing the task to be completed. The object is in the form:
   *                           {
   *                             "taskId": 196677,
   *                             "formkey": "myFormKey",
   *                             "processVariables": [
   *                               {
   *                                 "name": "initiator   userStatus   switchToProcess",
   *                                 "type": "integer",
   *                                 "value": "some value for the variable",
   *                                 "valueUrl": "https://staging.snapclinical.net:8443/ ... ",
   *                                 "scope": "local"
   *                               }
   *                             ],
   *                              "formProperties": [
   *                               {
   *                                 "id": "templateType  outcomeAndFieldMapping  infoText  title",
   *                                 "name": "some name",
   *                                 "type": "date",
   *                                 "value": "some value for this property",
   *                                 "enumValues": [
   *                                    {
   *                                     "id": "some id - can be null for the outcomes",
   *                                     "name": "some name or outcome value"
   *                                   }
   *                                 ]
   *                               }
   *                             ],
   *                              "formData": {
   *                               "id": "some id",
   *                               "key": "some key for this Form",
   *                               "fields": [
   *                                 {
   *                                   "id": "some id",
   *                                   "name": "some name",
   *                                   "fieldType": "FormField",
   *                                   "type": "multi-line-text",
   *                                   "value": "some value",
   *                                   "expression": "some expression",
   *                                   "optionType": "some option type",
   *                                   "hasEmptyValue": false,
   *                                   "options": [
   *                                     {
   *                                       "id": "some id - can be null for the outcomes",
   *                                       "name": "some name or outcome value"
   *                                     }
   *                                   ]
   *                                 }
   *                               ],
   *                               "outcomes": [
   *                                 {
   *                                   "id": "some id - can be null for the outcomes",
   *                                   "name": "some name or outcome value"
   *                                 }
   *                               ]
   *                             }
   *
   *                                provided info will update the task information before completing the task
   * @param successcallback
   * @param failurecallback
   * @return {Promise<Array<Object>>}   returns an array containing all active user tasks within the same process instance
   *                                    of the task being completed (and related to the same user completing it)
   *                                    returned items in the array are in the form:
   *                                    {processInstanceId: NNNNN, variables: [], formProperties: [], fields: [], ...}
   */

  async completeTaskAndGetNext(taskData, successCallback, failureCallback) {


    let taskToBeUpdated = {};
    let nextTasksData = [];

    /**   task object to be passed to the SDK call:
     *  {
          "taskId": "some Id",
          "formDefinitionId": "form id",
          "processVariables": [
            {
              "name": "initiator   userStatus   switchToProcess",
              "type": "integer",
              "value": "some value for the variable",
              "valueUrl": "https://staging.snapclinical.net:8443/ ... ",
              "scope": "local"
            }
          ],
          "fields": [
            {
              "id": "some id",
              "value": "some value for the field"
            }
          ],
          "outcome": {
            "id": "some id - can be null for the outcomes",
            "name": "some name or outcome value"
          }
        }
     */
    if (taskData.taskId) taskToBeUpdated.taskId = taskData.taskId;
    if (taskData.formData && taskData.formData.id) taskToBeUpdated.formDefinitionId = taskData.formData.id;
    if (taskData.processVariables) taskToBeUpdated.processVariables = taskData.processVariables;
    if (taskData.formData && taskData.formData.fields) taskToBeUpdated.fields = taskData.formData.fields.map( x => ({"id": x.id, "value": x.value}));
    if (taskData.outcome) taskToBeUpdated.outcome = taskData.outcome;

    try {
      nextTasksData = await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["snapClinicalApiService"].completeAndGetNext(taskToBeUpdated);
    }
    catch(e) {
      console.warn("Error in snapClinical.completeTaskAndGetNext", e);
      failureCallback(e);
      return;
    }

    successCallback(nextTasksData);
  }

  /**
   * Get all Active Tasks for the current user with lookup Criteria
   *
   * @param {Object} lookupData           - object defining lookup criteria in the form:
   *          {
   *            "processDefinitionKey": "processKeyValue",
   *            "processDefinitionId": "processKeyValue:NNN:MMM",
   *            "processDefinitionKeyLike": "processKeyLikeValue"
   *            "queryVariables": [
   *               {
   *                  "name": "variableName",
   *                  "value": "variableValue",
   *                  "operation": "equals",
   *                  "type" : "string"
   *               }
   *             ]
   *          }
   *
   * @param successcallback
   * @param failurecallback
   * @return {Promise<Array<Object>>}  returns an array of task objects in the form:
   *                                    {processInstanceId: NNNNN, variables: [], formProperties: [], fields: [], ...}
   */
  async getActiveTasks(lookupData, successCallback, failureCallback) {

    let resultTaskList = [];
    try {
      resultTaskList = await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["snapClinicalApiService"].getActiveTasks(lookupData);
    }
    catch(e) {
      console.warn("Error in snapClinical.getActiveTasks", e);
      failureCallback(e);
      return;
    }

    successCallback(resultTaskList);
  }

  /**
   * Executes an action on a given task.
   *
   * @param {Object} actionData         - object defining the action to be performed.
   *                                    The object can have the following structure: <code>
   *                                    {
   *                                      "taskId": "someId",
   *                                      "action": "complete" | "claim" | "delegate" | "resolve",
   *                                      "variables": [ {
   *                                          "name" : "variableName",
   *                                          "value" : "variableValue",
   *                                          "valueUrl" : "http://...",
   *                                          "type" : "string"
   *                                          }
   *                                      ],
   *                                      "assignee": "userWhoClaimsOrToDelegateTo"
   *                                    }
   *                                    </code>
   *                                    property taskId and action are mandatory.
   * @param successcallback
   * @param failurecallback
   * @return {Promise<Object>}    returns a result object.
   */
  async taskAction(actionData, successCallback, failureCallback) {

    let result;
    try {
      result = await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["snapClinicalApiService"].taskAction(actionData);
    }
    catch(e) {
      console.warn("Error in snapClinical.taskAction", e);
      failureCallback(e);
      return;
    }

    successCallback(result);
  }

  async fetch(url, method, body, successCallback, failureCallback) {

    let result;

    try {
      let response;
      response = await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["client"].fetch(url, method, null, body, null);
      result = await response.json();
      if (response.status === 200) {
        successCallback(result);
        return;
      }
      else {
        failureCallback(result);
        return;
      }
    }
    catch(e) {
      console.warn("Error in snapClinical.fetch", e);
      failureCallback(e);
      return; 
    }
    
  }

  async logout(successCallback, failureCallback) {
    try {
      let response = await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["oauthService"].revokeToken();
      __WEBPACK_IMPORTED_MODULE_0_snapclinical__["client"].tokenObj = null;
      if (response === 200) {
        successCallback(response);
        return;
      }
      else {
        failureCallback(response);
        return;
      }
    }
    catch(e) {
      console.warn("Error in snapClinical.logout", e);
      failureCallback(e);
      return;
    }
  }

}
// export class to a global variable for use of the JavaScriptDistLib (only)
var com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = com.fc.JavaScriptDistLib || {};
com.fc.JavaScriptDistLib.SnapCinical = SnapClinicalObject;
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (SnapClinicalObject);


/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class StorageObject {

  constructor() {}

  add (key,value) {
    return localStorage.setItem(key,JSON.stringify(value));
  }

  remove (key) {
    return localStorage.removeItem(key);
  }

  clear (key) {
    return localStorage.clear();
  }

  getValue (key) {
    let value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch(err) {
        return value;
      }
    }
  }

  getAllKeys () {
    return Object.keys(localStorage);
  }

  //Define custom exceptions pertaining to storage module here.
}

/* harmony default export */ __webpack_exports__["a"] = (StorageObject);


/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * System Module Module
*/


class SystemObject  {

    constructor() {
    }

    getCountry () {
        // $.getJSON('https://ipinfo.io', function(data){
        //     console.log (data.country);
        //     return data.country;
        // });
    }

    showToast (text,durationType) {
        let duration = 5000;
        if (durationType == "LONG") {
            duration = 10000;
        }
        toastr.options.closeButton = true;
        toastr.info(text, {timeOut: duration});
    }

    launchBrowser (url) {
        window.open(url);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (SystemObject);

/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(2);
// ES6 imports




class TextLibraryObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */]{

  constructor(){
    super(" TextLibraryObject");
  }

  textComparison (text1, comp, text2) {
    // checking text variables to prevent issues
    if (text1 == null) text1 = "";
    if (text2 == null) text2 = "";
    switch (comp) {
    case "LESS":
      return text1.toString() < text2.toString();
    case "EQUAL":
      return text1.toString() == text2.toString();
    case "GREATER":
      return text1.toString() > text2.toString();
    default:
      return false;
    }
  }

  textTrim(text){
    return text.toString().trim().replace(/&nbsp;/g, "").replace(/\<br\s*[\/]?>/gi, "");
  }

  textChangeCase(text, comp) {
    switch (comp) {
    case "UPPERCASE":
      return text.toString().toUpperCase();
    case "LOWERCASE":
      return text.toString().toLowerCase();
    default:
      return "";
    }
  }

  textSubstring(text, from, length){
    return text.toString().substring(Number(from),Number(from) + Number(length));
  }


  textContains(string, substring) {
    return ((string.toString().indexOf(substring)) !== -1);
  }

  textIndexOf(string, substring) {
    return string.toString().indexOf(substring);
  }

  textSplitAt(text, index) {
    return [text.toString().substring(0, Number(index)), text.toString().substring(Number(index))];
  }

  textSplitWith(string, separator) {
    return string.toString().split(separator.toString());
  }

  textReplace(textFrom, textTo, textSource){
    var returnText = textSource.toString();
    while (returnText.indexOf(textFrom.toString()) !== -1){
      returnText = returnText.toString().replace(textFrom.toString(),textTo.toString());
    }
    return returnText;
  }

  isText(text) {
    return (typeof text === "string" || text instanceof String);
  }

  convertToText(data) {
    if( data!=undefined || data!=null ) {
      if( jQuery.isXMLDoc( data ) ) {
        return  (new XMLSerializer()).serializeToString(data);
      }
      else if( jQuery.isArray( data ) || (data instanceof RegExp) )  {
        return data.toString();
      }
      else if( typeof data == "string" ) {
        return data;
      }
      else {
        if (data.humanize) return data.humanize();
        return JSON.stringify(data);
      }  
    }
    return null;
  }

  /**
     * Converts the text input to a new regular expression, adding the modifier if it exists
     * @param text
     * @param modifier
     * @returns {RegExp}
     */
  convertToRegExp(text, modifier) {
    try {
      return  modifier && modifier != ""? new RegExp(text, modifier): new RegExp(text);
    } catch(e) {
      console.log("convertToRegExp failed", e);
      return null;
    }
  }

  /**
     * returns true if the string matches the pattern, false otherwise
     * @param regex
     * @param text
     * @returns {Boolean}
     */
  textMatchWithRegex(regex, text) {
    try {
      // var _regex = modifier && modifier != ""? new RegExp(regex, modifier): regex;
      return regex.test(text);
    } catch(e) {
      console.log("textMatchWithRegex failed", e);
      return false;
    }
  }

  /**
     * returns a new string where the specified values that match the regular expression are replaced
     * @param from
     * @param regex
     * @param source
     * @returns {String}
     */
  textReplaceWithRegex(from, regex, source) {
    try {
      // var _regex = modifier && modifier != ""? new RegExp(regex, modifier): regex;
      return source.replace(regex, from);
    } catch(e) {
      console.log("textReplaceWithRegex failed", e);
      return source;
    }
  }
}
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (TextLibraryObject);

/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(2);
// ES6 imports


class TextAreaObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */] {

  constructor() {
    super(" textarea.textView");
    var self = this;
    this.getProperty = Object.assign(this.getProperty, {
      Text: (objName) => {
        return this.getElemFromName(objName).find(".textView").val();
      },
      "Max chars": (objName) => {
        return this.getElemFromName(objName).find(".textView").attr("maxlength");
      },
      "Enabled": (objName) => {
        let result = this.getElemFromName(objName).find(".textView").attr("disabled");
        return !result;
      },
      "Input type": (objName) => {
        return this.getElemFromName(objName).find(".textView").attr("type");
      },
      "Border color": (objName) => {
        return this.getElemFromName(objName).find(".textView").css("border-color");
      },
      "Border Type": (objName) => {
        return this.getElemFromName(objName).find(".textView").css("box-shadow");
      },
      "Border width": (objName) => {
        return this.getElemFromName(objName).find(".textView").css("border-width");
      },
      "Border radius": (objName) => {
        return this.getElemFromName(objName).find(".textView").css("border-radius");
      },
      Placeholder: (objName) => {
        return this.getElemFromName(objName).find(".textView").attr("placeholder");
      }
    });
    this.setProperty = Object.assign(this.setProperty, {
      Text: (objName, value) => {
        this.getElemFromName(objName).find(".textView").val(value);
      },
      "Max chars": (objName,value) => {
        this.getElemFromName(objName).find(".textView").attr("maxlength",value);
      },
      "Enabled": (objName,value) => {
        this.getElemFromName(objName).find(".textView").attr("disabled",!value);
      },
      "Border color": (objName,value) => {
        this.getElemFromName(objName).find(".textView").css("border-color",value);
      },
      "Border Type": (objName,value) => {                
        let borderColor = this.getElemFromName(objName).find(".textView").css("border-color");
        if (value == "raised") {
          this.getElemFromName(objName).find(".textView").css({
            "box-shadow":"2px 5px 20px "+borderColor
          });
        } else if (value == "sunken") {
          this.getElemFromName(objName).find(".textView").css({
            "box-shadow":"inset 2px 5px 20px "+borderColor
          });
        } else {
          this.getElemFromName(objName).find(".textView").css({
            "box-shadow":"none"
          });
        }
      },
      "Border width": (objName,value) => {
        this.getElemFromName(objName).find(".textView").css("border-width",value);
      },
      "Border radius": (objName,value) => {
        this.getElemFromName(objName).find(".textView").css("border-radius",value);
      },
      Placeholder: (objName, value) => {
        this.getElemFromName(objName).find(".textView").attr("placeholder",value);
      }
    });

  }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (TextAreaObject);

/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(2);
// ES6 imports


class TextboxObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */] {

  constructor() {
    super(" .textView");
    var self = this;
    this.getProperty = Object.assign(this.getProperty, {
      Text: (objName) => {
        return this.getElemFromName(objName).find(".textView").val();
      },
      "Max chars": (objName) => {
        return this.getElemFromName(objName).find(".textView").attr("maxlength");
      },
      "Password chars": (objName) => {
        let type = this.getElemFromName(objName).find(".textView").attr("type");
        if (type == "password") {
          return true;
        }
        return false;
      },
      "Enabled": (objName) => {
        let result = this.getElemFromName(objName).find(".textView").attr("disabled");
        return !result;
      },
      "Input type": (objName) => {
        return this.getElemFromName(objName).find(".textView").attr("type");
      },
      "Border color": (objName) => {
        return this.getElemFromName(objName).find(".textView").css("border-color");
      },
      "Border Type": (objName) => {
        return this.getElemFromName(objName).find(".textView").css("box-shadow");
      },
      "Border width": (objName) => {
        return this.getElemFromName(objName).find(".textView").css("border-width");
      },
      "Border radius": (objName) => {
        return this.getElemFromName(objName).find(".textView").css("border-radius");
      },
      Placeholder: (objName) => {
        return this.getElemFromName(objName).find(".textView").attr("placeholder");
      }
    });
    this.setProperty = Object.assign(this.setProperty, {
      Text: (objName, value) => {
        this.getElemFromName(objName).find(".textView").val(value);
      },
      "Max chars": (objName,value) => {
        this.getElemFromName(objName).find(".textView").attr("maxlength",value);
      },
      "Password chars": (objName,value) => {
        let type = "text";
        if (value) {
          type = "password";
        }
        this.getElemFromName(objName).find(".textView").attr("type",type);
      },
      "Enabled": (objName,value) => {
        this.getElemFromName(objName).find(".textView").attr("disabled",!value);
      },
      "Input type": (objName,value) => {
        var inputType = "text";
        switch (value) {
        case "numeric":
          inputType = "number";
          break;
        case "email":
          inputType = "email";
          break;
        }
        this.getElemFromName(objName).find(".textView").attr("type",inputType);
      },
      "Border color": (objName,value) => {
        this.getElemFromName(objName).find(".textView").css("border-color",value);
      },

      "Border Type": (objName,value) => {                
        let borderColor = this.getElemFromName(objName).find(".textView").css("border-color");
        if (value == "raised") {
          this.getElemFromName(objName).find(".textView").css({
            "box-shadow":"2px 5px 20px "+borderColor
          });
        } else if (value == "sunken") {
          this.getElemFromName(objName).find(".textView").css({
            "box-shadow":"inset 2px 5px 20px "+borderColor
          });
        } else {
          this.getElemFromName(objName).find(".textView").css({
            "box-shadow":"none"
          });
        }
      },
      "Border width": (objName,value) => {
        this.getElemFromName(objName).find(".textView").css("border-width",value);
      },
      "Border radius": (objName,value) => {
        this.getElemFromName(objName).find(".textView").css("border-radius",value);
      },
      Placeholder: (objName, value) => {
        this.getElemFromName(objName).find(".textView").attr("placeholder",value);
      }
    });

  }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (TextboxObject);

/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_timezones__ = __webpack_require__(189);
/**
 * Created by Oscar Rangel on 21/12/16.
*/



class TimeLibraryObject {

  constructor() {}

  createTime (time) {

    return new Date (time);
  }

  createTimeNow () {
    return new Date();
  }

  createTimeFromTimestamp (timestamp) {
    return new Date(Number(timestamp));
  }

  createTimestampFromTime (time) {
    return new Date(time).getTime();
  }


  addPadding (number, digits) {
    let value = number > 0 ? number : -number;
    while (value.toString().length < digits) {
      value = "0" + value;
    }
    return value;
  }

  textFromTime (time, op) {
    var dateTime = new Date(time);
    switch(op) {
    case "ISO_1":
      var H = this.addPadding(dateTime.getHours(), 2);
      var M = this.addPadding(dateTime.getMinutes(), 2);
      var s = this.addPadding(dateTime.getSeconds(), 2);
      var ms = this.addPadding(dateTime.getMilliseconds(), 3);
      var m = this.addPadding(dateTime.getMonth()+1, 2);
      var d = this.addPadding(dateTime.getDate(), 2);
      var y = this.addPadding(dateTime.getFullYear(), 4);

      let offsetSign = (dateTime.getTimezoneOffset() > 0) ? "-" : "+";

      let offsetH = this.addPadding(Math.trunc(dateTime.getTimezoneOffset() / 60), 2);
      let offsetM = this.addPadding(dateTime.getTimezoneOffset() % 60, 2);

      return `${y}-${m}-${d}T${H}:${M}:${s}.${ms}${offsetSign}${offsetH}${offsetM}`;

    case "DATE_TIME_12":
      var H = dateTime.getHours();
      var M = this.addPadding(dateTime.getMinutes(),2);
      var m = this.addPadding(dateTime.getMonth()+1,2);
      var d = this.addPadding(dateTime.getDate(),2);
      var y = this.addPadding(dateTime.getFullYear(),4);
      var a = H >= 12 ? "PM" : "AM";
      H = H % 12;
      H = H ? H : 12; // the hour '0' should be '12'
      // if (H.toString().length == 1) {
      //   H = "0" + H;
      // }
      H = this.addPadding(H,2);
      return H + ":" + M + " " + a + " " + d + "/" + m + "/" + y;

    case "DATE_TIME_12_US":
      var H = dateTime.getHours();
      var M = this.addPadding(dateTime.getMinutes(),2);
      var m = this.addPadding(dateTime.getMonth()+1,2);
      var d = this.addPadding(dateTime.getDate(),2);
      var y = this.addPadding(dateTime.getFullYear(),4);
      var a = H >= 12 ? "PM" : "AM";
      H = H % 12;
      H = H ? H : 12; // the hour '0' should be '12'
      H = this.addPadding(H,2);

      return H + ":" + M + " " + a + " " + m + "/" + d + "/" + y;

    case "DATE_TIME_24":
      var H = this.addPadding(dateTime.getHours(),2);
      var M = this.addPadding(dateTime.getMinutes(),2);
      var m = this.addPadding(dateTime.getMonth()+1,2);
      var d = this.addPadding(dateTime.getDate(),2);
      var y = this.addPadding(dateTime.getFullYear(),4);
      
      return H + ":" + M + " " + d + "/" + m + "/" + y;

    case "DATE_TIME_24_US":
      var H = this.addPadding(dateTime.getHours(),2);
      var M = this.addPadding(dateTime.getMinutes(),2);
      var m = this.addPadding(dateTime.getMonth()+1,2);
      var d = this.addPadding(dateTime.getDate(),2);
      var y = this.addPadding(dateTime.getFullYear(),4);
      
      return H + ":" + M + " " + m + "/" + d + "/" + y;

    case "TIME_12":
      var H = dateTime.getHours();
      var M = this.addPadding(dateTime.getMinutes(),2);
      var a = H >= 12 ? "PM" : "AM";
      H = H % 12;
      H = H ? H : 12; // the hour '0' should be '12'
      H = this.addPadding(H,2);

      return H + ":" + M + " " + a;

    case "TIME_24":
      var H = this.addPadding(dateTime.getHours(),2);
      var M = this.addPadding(dateTime.getMinutes(),2);
      return H + ":" + M;

    case "DATE":
      var m = this.addPadding(dateTime.getMonth()+1,2);
      var d = this.addPadding(dateTime.getDate(),2);
      var y = this.addPadding(dateTime.getFullYear(),4);
      return d + "/" + m + "/" + y;

    case "DATE_US":
      var m = this.addPadding(dateTime.getMonth()+1,2);
      var d = this.addPadding(dateTime.getDate(),2);
      var y = this.addPadding(dateTime.getFullYear(),4);
      return m + "/" + d + "/" + y;

    default:
      return "";
    }
  }

  elapsedComponent (timestamp, num) {
    return Math.floor(timestamp/num);
  }

  elapsedComponentsFromTime (time, components) {
    var dateTime = new Date(time.getTime());
    var dateZeroTime = new Date(0);
    var y = dateTime.getUTCFullYear() - dateZeroTime.getUTCFullYear();
    var m = dateTime.getUTCMonth() - dateZeroTime.getUTCMonth();
    var d = dateTime.getUTCDate() - dateZeroTime.getUTCDate();
    var h = dateTime.getUTCHours() - dateZeroTime.getUTCHours();
    var M = dateTime.getUTCMinutes() - dateZeroTime.getUTCMinutes();
    var s = dateTime.getUTCSeconds() - dateZeroTime.getUTCSeconds();

    switch(components) {
    case "S":
      return [s];
    case "SM":
      return [ M, s ];
    case "SMH":
      return [ h, M, s ];
    case "SMHD":
      return [ d, h, M, s ];
    case "SMHDM":
      return [ m, d, h, M, s ];
    case "SMHDMY":
      return [ y, m, d, h, M, s ];
    default:
      return [];
    }
  }

  componentsFromTime (time, components) {
    var dateTime = new Date(time);
    switch(components) {
    case "S":
      return [dateTime.getSeconds()];
    case "SM":
      return [
        dateTime.getSeconds(),
        dateTime.getMinutes()
      ];
    case "SMH":
      return [
        dateTime.getSeconds(),
        dateTime.getMinutes(),
        dateTime.getHours()
      ];
    case "SMHD":
      return [
        dateTime.getSeconds(),
        dateTime.getMinutes(),
        dateTime.getHours(),
        dateTime.getDate()
      ];
    case "SMHDM":
      return [
        dateTime.getSeconds(),
        dateTime.getMinutes(),
        dateTime.getHours(),
        dateTime.getDate(),
        dateTime.getMonth()+1
      ];
    case "SMHDMY":
      return [
        dateTime.getSeconds(),
        dateTime.getMinutes(),
        dateTime.getHours(),
        dateTime.getDate(),
        dateTime.getMonth()+1,
        dateTime.getFullYear()
      ];
    default:
      return [];
    }
  }

  numberDayOfWeekFromDate (time) {
    var dateTime = new Date(time);
    if (dateTime.getDay() == 0) return 7;
    return dateTime.getDay();

  }

  stringDayOfWeekFromDate (time) {
    var dateTime = new Date(time);
    var ar = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
    return ar[dateTime.getDay()];
  }

  createTimeInterval ( sec, min, hou, day, mon, yea) {
    return [
      sec,
      min,
      hou,
      day,
      mon,
      yea
    ];
  }

  addIntervalFromTime (time, timeInt) {
    // console.log (time + timeInt);
    // if (timeInt.constructor !== Array || timeInt.length != 6){
    //     return new Date(time);
    // }
    // var elap = this.componentsFromTime(time, "SMHDMY");
    // console.log (elap);
    // var year = elap[0] + Number(timeInt[5]);
    // var month = (elap[1] - 1) + Number(timeInt[4]);
    // var day = elap[2] + Number(timeInt[3]);
    // var hours = elap[3] + Number(timeInt[2]);
    // var min =elap[4] + Number(timeInt[1]);
    // var sec = elap[5] + Number(timeInt[0]);
    // return new Date(year, month, day, hours, min, sec);
    var retTime = new Date(time);
    retTime.setSeconds(retTime.getSeconds() + Number(timeInt[0]));
    retTime.setMinutes(retTime.getMinutes() + Number(timeInt[1]));
    retTime.setHours(retTime.getHours() + Number(timeInt[2]));
    retTime.setDate(retTime.getDate() + Number(timeInt[3]));
    retTime.setMonth(retTime.getMonth() + Number(timeInt[4]));
    retTime.setFullYear(retTime.getFullYear() + Number(timeInt[5]));
    return retTime;
  }

  subtractIntervalFromTime (time, timeInt) {
    // if (timeInt.constructor !== Array || timeInt.length != 6){
    //     return time;
    // }
    // var elap = this.componentsFromTime(time, "SMHDMY");
    // var year = elap[0] - Number(timeInt[5]);
    // var month = (elap[1] - 1) - Number(timeInt[4]);
    // var day = elap[2] - Number(timeInt[3]);
    // var hours = elap[3] - Number(timeInt[2]);
    // var min =elap[4] - Number(timeInt[1]);
    // var sec = elap[5] - Number(timeInt[0]);
    // return new Date(year, month, day, hours, min, sec);
    var retTime = new Date(time);
    retTime.setSeconds(retTime.getSeconds() - Number(timeInt[0]));
    retTime.setMinutes(retTime.getMinutes() - Number(timeInt[1]));
    retTime.setHours(retTime.getHours() - Number(timeInt[2]));
    retTime.setDate(retTime.getDate() - Number(timeInt[3]));
    retTime.setMonth(retTime.getMonth() - Number(timeInt[4]));
    retTime.setFullYear(retTime.getFullYear() - Number(timeInt[5]));
    return retTime;
  }

  dateFormat (dateObj,format) {
    var keys = {
      "yyyy": "1",
      "yy":"2",
      "y":"3",
      "MMMM":"4",
      "MMM":"5",
      "MM":"6",
      "M":"7",
      "dd":"8",
      "d":"9",
      "EEEE":"10",
      "EEE":"11",
      "HH":"12",
      "H":"13",
      "hh":"14",
      "h":"15",
      "mm":"16",
      "m":"17",
      "ssss":"18",
      "ss":"19",
      "s":"20",
      "a":"21"
    };

    var result = format;
    var fullyear = dateObj.getFullYear();
    var year2dgt = String(fullyear % 100);
    var month = String(dateObj.getMonth() + 1);
    var monthLit = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ][dateObj.getMonth()];
    var day = String(dateObj.getDate());
    var weekday = String(dateObj.getDay());
    var weekdayLit = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ][dateObj.getDay()];
    var min = String(dateObj.getMinutes());
    var hour24 = String(dateObj.getHours());
    var hour12 = (Number(dateObj.getHours()) % 12).toString();
    var sc= String(dateObj.getSeconds());
    var msec = String(dateObj.getMilliseconds());
    var am_pm = (Number(dateObj.getHours()) >= 12)?"PM":"AM";

    // generate escape code
    var escChar = "%";
    while (format.search(escChar)>=0) escChar += "%";

    if (year2dgt.length==1) year2dgt = "0" + year2dgt;
    if (month.length==1) month = "0" + month;
    if (day.length==1) day = "0" + day;
    if (min.length==1) min = "0" + min;
    if (hour24.length==1) hour24 = "0" + hour24;
    if (hour12.length==1) hour12 = "0" + hour12;
    if (sc.length==1) sc = "0" + sc;
    if (msec.length==1) msec = "00" + msec;
    if (msec.length==2) msec = "0" + msec;

    if (Number(hour12) == 0) hour12 = "12";

    var escapeKey = function(string,key) {
      return string.replace(key, escapedKey(key));
    };
    var escapedKey = function(key) {
      return escChar + keys[key] + escChar;
    };
    var isolateKeys = function(format) {
      var isolated = format;

      isolated = escapeKey(isolated,"yyyy");
      isolated = escapeKey(isolated,"yy");
      isolated = escapeKey(isolated,"y");
      isolated = escapeKey(isolated,"MMMM");
      isolated = escapeKey(isolated,"MMM");
      isolated = escapeKey(isolated,"MM");
      isolated = escapeKey(isolated,"M");
      isolated = escapeKey(isolated,"dd");
      isolated = escapeKey(isolated,"d");
      isolated = escapeKey(isolated,"EEEE");
      isolated = escapeKey(isolated,"EEE");
      isolated = escapeKey(isolated,"HH");
      isolated = escapeKey(isolated,"H");
      isolated = escapeKey(isolated,"hh");
      isolated = escapeKey(isolated,"h");
      isolated = escapeKey(isolated,"mm");
      isolated = escapeKey(isolated,"m");
      isolated = escapeKey(isolated,"ssss");
      isolated = escapeKey(isolated,"ss");
      isolated = escapeKey(isolated,"s");
      isolated = escapeKey(isolated,"a");
      return isolated;
    };

    result = isolateKeys(result);

    result = result.replace(escapedKey("yyyy"),fullyear);
    result = result.replace(escapedKey("yy"),year2dgt);
    result = result.replace(escapedKey("y"),Number(fullyear));

    result = result.replace(escapedKey("MMMM"),monthLit);
    result = result.replace(escapedKey("MMM"),monthLit.substr(0,3));
    result = result.replace(escapedKey("MM"),month);
    result = result.replace(escapedKey("M"),Number(month));

    result = result.replace(escapedKey("dd"),day);
    result = result.replace(escapedKey("d"),Number(day));

    result = result.replace(escapedKey("EEEE"),weekdayLit);
    result = result.replace(escapedKey("EEE"),weekdayLit.substr(0,3));

    result = result.replace(escapedKey("HH"),hour24);
    result = result.replace(escapedKey("H"),Number(hour24));

    result = result.replace(escapedKey("hh"),hour12);
    result = result.replace(escapedKey("h"),Number(hour12));

    result = result.replace(escapedKey("mm"),min);
    result = result.replace(escapedKey("m"),Number(min));

    result = result.replace(escapedKey("ssss"),msec);

    result = result.replace(escapedKey("ss"),sc);
    result = result.replace(escapedKey("s"),Number(sc));

    result = result.replace(escapedKey("a"),am_pm);

    return result;
  }

  getTimeFromTimezone (tz) {
    return new Date().toLocaleString("en-US", {timeZone: tz});
  }

  pickTimezone () {
    let parent = this;
    const timezones = new __WEBPACK_IMPORTED_MODULE_0__common_timezones__["a" /* TimeZones */]().getList() || [];
    let htmlList = "";
    for (let line of timezones) {
      htmlList += "<div class=\"timezone-elem\" style=\"cursor:pointer\">" + line + "</div>";
    }
    let _selected = "";
    return new Promise((resolve) => {
      parent.timezonePicker =
      $(`<div id="modal" class="modal fade pickerModal">
        <div class="modal-dialog-sm" style = "position:relative;background:#fff;width:300px; margin:0 auto;padding:25px;padding-left:30px;">
          <div id="timezonelist"></div>
      </div>`);
      $(parent.timezonePicker).find("#timezonelist").append(htmlList);
      $(parent.timezonePicker).find(".timezone-elem").click(function (e) {
        _selected = e.target ? e.target.innerText : "";
        if (_selected) {
          $(parent.timezonePicker).modal("hide");
          resolve(_selected);
        }
      });
      $(parent.timezonePicker).modal("show");
    });
  }


}

/* harmony default export */ __webpack_exports__["a"] = (TimeLibraryObject);

/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Ravish S on 16/10/17.
*/

class VideoLibraryObject {

    constructor() {}

    createVideoFromResource (url) {
        let vid = document.createElement("VIDEO");
        let source = document.createElement("source");
        vid.appendChild(source);
        vid.crossOrigin = 'anonymous';
        source.src = url;
        return vid;
    }

    createVideoFromUrl (url, successCallBack, failureCallBack) {
        let vid = document.createElement("VIDEO");
        let source = document.createElement("source");
        vid.appendChild(source);
        vid.crossOrigin = 'anonymous';
        source.src = url;
        console.log (vid);
        vid.onloadeddata = (e) => {
            successCallBack (vid);
        };

        vid.onerror = (e) => {
          console.log('createVideoFromUrl, load error', e);
          failureCallBack(e);
        }
    }

    getDuration (video) {
        return video.duration;
    }

    playVideo (video, successCallBack) {
        video.play();
        video.onended = function(e) {
            successCallBack(e);
        };
    }

    playVideoFrom (video,position,successCallBack) {
        video.currentTime = position;
        video.play();
        video.onended = function(e) {
            successCallBack(e);
        };
    }


}

/* harmony default export */ __webpack_exports__["a"] = (VideoLibraryObject);

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(1);
// ES6 imports


class VideoObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {
        super('');

        var self = this;

        this.setProperty = Object.assign(this.setProperty, {
            'Video': (objName, value) => {
                console.log (value);
                let elemSelector = '[obj-name="' + objName + '"]';
                $(elemSelector).html(value);
            },
        });

    }

    getElemFromObj(objName) {
        let elemSelector = '[obj-name="' + objName + '"]';
        let elem = $(elemSelector).find('video');
        console.log (elem);
        return elem;
    }
    play (objName) {
        let elem = this.getElemFromObj(objName);
        $(elem).get(0).play();
    }

    pause (objName) {
        let elem = this.getElemFromObj(objName);
        $(elem).get(0).pause();  
    }

    stop (objName) {
        let elem = this.getElemFromObj(objName);
        $(elem).get(0).pause();
        $(elem).get(0).currentTime = 0;
    }

    getElapsedTime (objName) {
        let elem = this.getElemFromObj(objName);
        return $(elem).get(0).currentTime;
    }

    getVolume (objName) {
        let elem = this.getElemFromObj(objName);
        return $(elem).get(0).volume;   
    }

    setVolume (objName,vol) {
        let elem = this.getElemFromObj(objName);
        return $(elem).get(0).volume = vol; 
    }

    playFromPosition (objName,pos) {
        let elem = this.getElemFromObj(objName);
        $(elem).get(0).currentTime = pos;
        $(elem).get(0).play();
    }

    skipToPosition (objName,pos) {
        let elem = this.getElemFromObj(objName);
        $(elem).get(0).currentTime = pos;
    }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (VideoObject);



/***/ }),
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(1);
// ES6 imports


class WebViewObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {
        super(' web view');
        var self = this;
        this.callback = null;
        this.interceptTimer = null;

        this.setProperty['URL'] = function(objName, value) {
            let elem =  $('[obj-name= "' + objName + '"]');
            $(elem).find('iframe').attr('src',value);
            self.startUrlIntercept(objName);
        };

        this.getProperty['URL'] = function(objName) {
            let elem =  $('[obj-name= "' + objName + '"]');
            return $(elem).find('iframe').attr('src');        
        };

        this.setProperty['intercept-domain'] = function(objName, value) {
          let elem =  $('[obj-name= "' + objName + '"]');
          $(elem).find('iframe').attr('intercept-domain',value);
          self.startUrlIntercept(objName);
        };

        this.getProperty['intercept-domain'] = function(objName) {
            let elem =  $('[obj-name= "' + objName + '"]');
            return $(elem).find('iframe').attr('intercept-domain');      
        };
    }

    refresh (objName) {
        let elem =  $('[obj-name= "' + objName + '"]');
        let url = $(elem).find('iframe').attr('src');
        $(elem).find('iframe').attr('src',url);
    }

    setDomainInterceptCallback(objName, callback) {
        this.callback = callback;
        this.startUrlIntercept(objName);
    }

    startUrlIntercept(objName) {
        let self = this;
        if (self.interceptTimer!=null ) {
            clearInterval(self.interceptTimer);
            self.interceptTimer = null;
        }
        let elem =  $('[obj-name= "' + objName + '"]');
        let iframe = $(elem).find('iframe').get(0);
        let interceptDomain = this.getProperty['intercept-domain'](objName);
        //This function is called for scenarios which are short lived ( oAuth / Web URL Intersept )
        // Since load is the only available event in this case, using a timer for 100ms
        try {
            self.interceptTimer = setInterval(function(){ 
                let url = iframe.contentWindow.location.href;
                let hostname = $('<a>').prop('href', url).prop('hostname');
                if( interceptDomain!=undefined && hostname!=undefined ) {
                    if( hostname.indexOf(interceptDomain)!=-1 ) {
                        if( self.callback!=null ) {
                            self.callback(url);    
                        }
                        clearInterval(self.interceptTimer);
                        self.interceptTimer = null;
                    }
                }
            },100);
        } catch (e) {

        }
    }


    WebViewException(msg) {
      let error = new Error(msg);
      error.name = "WebViewException";
      throw error;
    }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (WebViewObject);



/***/ }),
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(1);
/**
 * Widget Canvas Module Module
*/



class WidgetCanvasObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {
        super();

        this.getProperty = Object.assign(this.getProperty, {
            'Accept widgets': (objName) => {
            
            } 
        });

        this.setProperty = Object.assign(this.setProperty, {

            'Accept widgets': (objName, value) => {
                
            }
        });

    }

}

/* harmony default export */ __webpack_exports__["a"] = (WidgetCanvasObject);

/***/ }),
/* 183 */
/***/ (function(module, exports) {


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//! moment-timezone.js
//! version : 0.5.23
//! Copyright (c) JS Foundation and other contributors
//! license : MIT
//! github.com/moment/moment-timezone

(function (root, factory) {
	"use strict";

	/*global define*/
	if (typeof module === 'object' && module.exports) {
		module.exports = factory(__webpack_require__(0)); // Node
	} else if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));                 // AMD
	} else {
		factory(root.moment);                        // Browser
	}
}(this, function (moment) {
	"use strict";

	// Do not load moment-timezone a second time.
	// if (moment.tz !== undefined) {
	// 	logError('Moment Timezone ' + moment.tz.version + ' was already loaded ' + (moment.tz.dataVersion ? 'with data from ' : 'without any data') + moment.tz.dataVersion);
	// 	return moment;
	// }

	var VERSION = "0.5.23",
		zones = {},
		links = {},
		names = {},
		guesses = {},
		cachedGuess;

	if (!moment || typeof moment.version !== 'string') {
		logError('Moment Timezone requires Moment.js. See https://momentjs.com/timezone/docs/#/use-it/browser/');
	}

	var momentVersion = moment.version.split('.'),
		major = +momentVersion[0],
		minor = +momentVersion[1];

	// Moment.js version check
	if (major < 2 || (major === 2 && minor < 6)) {
		logError('Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js ' + moment.version + '. See momentjs.com');
	}

	/************************************
		Unpacking
	************************************/

	function charCodeToInt(charCode) {
		if (charCode > 96) {
			return charCode - 87;
		} else if (charCode > 64) {
			return charCode - 29;
		}
		return charCode - 48;
	}

	function unpackBase60(string) {
		var i = 0,
			parts = string.split('.'),
			whole = parts[0],
			fractional = parts[1] || '',
			multiplier = 1,
			num,
			out = 0,
			sign = 1;

		// handle negative numbers
		if (string.charCodeAt(0) === 45) {
			i = 1;
			sign = -1;
		}

		// handle digits before the decimal
		for (i; i < whole.length; i++) {
			num = charCodeToInt(whole.charCodeAt(i));
			out = 60 * out + num;
		}

		// handle digits after the decimal
		for (i = 0; i < fractional.length; i++) {
			multiplier = multiplier / 60;
			num = charCodeToInt(fractional.charCodeAt(i));
			out += num * multiplier;
		}

		return out * sign;
	}

	function arrayToInt (array) {
		for (var i = 0; i < array.length; i++) {
			array[i] = unpackBase60(array[i]);
		}
	}

	function intToUntil (array, length) {
		for (var i = 0; i < length; i++) {
			array[i] = Math.round((array[i - 1] || 0) + (array[i] * 60000)); // minutes to milliseconds
		}

		array[length - 1] = Infinity;
	}

	function mapIndices (source, indices) {
		var out = [], i;

		for (i = 0; i < indices.length; i++) {
			out[i] = source[indices[i]];
		}

		return out;
	}

	function unpack (string) {
		var data = string.split('|'),
			offsets = data[2].split(' '),
			indices = data[3].split(''),
			untils  = data[4].split(' ');

		arrayToInt(offsets);
		arrayToInt(indices);
		arrayToInt(untils);

		intToUntil(untils, indices.length);

		return {
			name       : data[0],
			abbrs      : mapIndices(data[1].split(' '), indices),
			offsets    : mapIndices(offsets, indices),
			untils     : untils,
			population : data[5] | 0
		};
	}

	/************************************
		Zone object
	************************************/

	function Zone (packedString) {
		if (packedString) {
			this._set(unpack(packedString));
		}
	}

	Zone.prototype = {
		_set : function (unpacked) {
			this.name       = unpacked.name;
			this.abbrs      = unpacked.abbrs;
			this.untils     = unpacked.untils;
			this.offsets    = unpacked.offsets;
			this.population = unpacked.population;
		},

		_index : function (timestamp) {
			var target = +timestamp,
				untils = this.untils,
				i;

			for (i = 0; i < untils.length; i++) {
				if (target < untils[i]) {
					return i;
				}
			}
		},

		parse : function (timestamp) {
			var target  = +timestamp,
				offsets = this.offsets,
				untils  = this.untils,
				max     = untils.length - 1,
				offset, offsetNext, offsetPrev, i;

			for (i = 0; i < max; i++) {
				offset     = offsets[i];
				offsetNext = offsets[i + 1];
				offsetPrev = offsets[i ? i - 1 : i];

				if (offset < offsetNext && tz.moveAmbiguousForward) {
					offset = offsetNext;
				} else if (offset > offsetPrev && tz.moveInvalidForward) {
					offset = offsetPrev;
				}

				if (target < untils[i] - (offset * 60000)) {
					return offsets[i];
				}
			}

			return offsets[max];
		},

		abbr : function (mom) {
			return this.abbrs[this._index(mom)];
		},

		offset : function (mom) {
			logError("zone.offset has been deprecated in favor of zone.utcOffset");
			return this.offsets[this._index(mom)];
		},

		utcOffset : function (mom) {
			return this.offsets[this._index(mom)];
		}
	};

	/************************************
		Current Timezone
	************************************/

	function OffsetAt(at) {
		var timeString = at.toTimeString();
		var abbr = timeString.match(/\([a-z ]+\)/i);
		if (abbr && abbr[0]) {
			// 17:56:31 GMT-0600 (CST)
			// 17:56:31 GMT-0600 (Central Standard Time)
			abbr = abbr[0].match(/[A-Z]/g);
			abbr = abbr ? abbr.join('') : undefined;
		} else {
			// 17:56:31 CST
			// 17:56:31 GMT+0800 (台北標準時間)
			abbr = timeString.match(/[A-Z]{3,5}/g);
			abbr = abbr ? abbr[0] : undefined;
		}

		if (abbr === 'GMT') {
			abbr = undefined;
		}

		this.at = +at;
		this.abbr = abbr;
		this.offset = at.getTimezoneOffset();
	}

	function ZoneScore(zone) {
		this.zone = zone;
		this.offsetScore = 0;
		this.abbrScore = 0;
	}

	ZoneScore.prototype.scoreOffsetAt = function (offsetAt) {
		this.offsetScore += Math.abs(this.zone.utcOffset(offsetAt.at) - offsetAt.offset);
		if (this.zone.abbr(offsetAt.at).replace(/[^A-Z]/g, '') !== offsetAt.abbr) {
			this.abbrScore++;
		}
	};

	function findChange(low, high) {
		var mid, diff;

		while ((diff = ((high.at - low.at) / 12e4 | 0) * 6e4)) {
			mid = new OffsetAt(new Date(low.at + diff));
			if (mid.offset === low.offset) {
				low = mid;
			} else {
				high = mid;
			}
		}

		return low;
	}

	function userOffsets() {
		var startYear = new Date().getFullYear() - 2,
			last = new OffsetAt(new Date(startYear, 0, 1)),
			offsets = [last],
			change, next, i;

		for (i = 1; i < 48; i++) {
			next = new OffsetAt(new Date(startYear, i, 1));
			if (next.offset !== last.offset) {
				change = findChange(last, next);
				offsets.push(change);
				offsets.push(new OffsetAt(new Date(change.at + 6e4)));
			}
			last = next;
		}

		for (i = 0; i < 4; i++) {
			offsets.push(new OffsetAt(new Date(startYear + i, 0, 1)));
			offsets.push(new OffsetAt(new Date(startYear + i, 6, 1)));
		}

		return offsets;
	}

	function sortZoneScores (a, b) {
		if (a.offsetScore !== b.offsetScore) {
			return a.offsetScore - b.offsetScore;
		}
		if (a.abbrScore !== b.abbrScore) {
			return a.abbrScore - b.abbrScore;
		}
		return b.zone.population - a.zone.population;
	}

	function addToGuesses (name, offsets) {
		var i, offset;
		arrayToInt(offsets);
		for (i = 0; i < offsets.length; i++) {
			offset = offsets[i];
			guesses[offset] = guesses[offset] || {};
			guesses[offset][name] = true;
		}
	}

	function guessesForUserOffsets (offsets) {
		var offsetsLength = offsets.length,
			filteredGuesses = {},
			out = [],
			i, j, guessesOffset;

		for (i = 0; i < offsetsLength; i++) {
			guessesOffset = guesses[offsets[i].offset] || {};
			for (j in guessesOffset) {
				if (guessesOffset.hasOwnProperty(j)) {
					filteredGuesses[j] = true;
				}
			}
		}

		for (i in filteredGuesses) {
			if (filteredGuesses.hasOwnProperty(i)) {
				out.push(names[i]);
			}
		}

		return out;
	}

	function rebuildGuess () {

		// use Intl API when available and returning valid time zone
		try {
			var intlName = Intl.DateTimeFormat().resolvedOptions().timeZone;
			if (intlName && intlName.length > 3) {
				var name = names[normalizeName(intlName)];
				if (name) {
					return name;
				}
				logError("Moment Timezone found " + intlName + " from the Intl api, but did not have that data loaded.");
			}
		} catch (e) {
			// Intl unavailable, fall back to manual guessing.
		}

		var offsets = userOffsets(),
			offsetsLength = offsets.length,
			guesses = guessesForUserOffsets(offsets),
			zoneScores = [],
			zoneScore, i, j;

		for (i = 0; i < guesses.length; i++) {
			zoneScore = new ZoneScore(getZone(guesses[i]), offsetsLength);
			for (j = 0; j < offsetsLength; j++) {
				zoneScore.scoreOffsetAt(offsets[j]);
			}
			zoneScores.push(zoneScore);
		}

		zoneScores.sort(sortZoneScores);

		return zoneScores.length > 0 ? zoneScores[0].zone.name : undefined;
	}

	function guess (ignoreCache) {
		if (!cachedGuess || ignoreCache) {
			cachedGuess = rebuildGuess();
		}
		return cachedGuess;
	}

	/************************************
		Global Methods
	************************************/

	function normalizeName (name) {
		return (name || '').toLowerCase().replace(/\//g, '_');
	}

	function addZone (packed) {
		var i, name, split, normalized;

		if (typeof packed === "string") {
			packed = [packed];
		}

		for (i = 0; i < packed.length; i++) {
			split = packed[i].split('|');
			name = split[0];
			normalized = normalizeName(name);
			zones[normalized] = packed[i];
			names[normalized] = name;
			addToGuesses(normalized, split[2].split(' '));
		}
	}

	function getZone (name, caller) {
		
		name = normalizeName(name);

		var zone = zones[name];
		var link;

		if (zone instanceof Zone) {
			return zone;
		}

		if (typeof zone === 'string') {
			zone = new Zone(zone);
			zones[name] = zone;
			return zone;
		}

		// Pass getZone to prevent recursion more than 1 level deep
		if (links[name] && caller !== getZone && (link = getZone(links[name], getZone))) {
			zone = zones[name] = new Zone();
			zone._set(link);
			zone.name = names[name];
			return zone;
		}

		return null;
	}

	function getNames () {
		var i, out = [];

		for (i in names) {
			if (names.hasOwnProperty(i) && (zones[i] || zones[links[i]]) && names[i]) {
				out.push(names[i]);
			}
		}

		return out.sort();
	}

	function addLink (aliases) {
		var i, alias, normal0, normal1;

		if (typeof aliases === "string") {
			aliases = [aliases];
		}

		for (i = 0; i < aliases.length; i++) {
			alias = aliases[i].split('|');

			normal0 = normalizeName(alias[0]);
			normal1 = normalizeName(alias[1]);

			links[normal0] = normal1;
			names[normal0] = alias[0];

			links[normal1] = normal0;
			names[normal1] = alias[1];
		}
	}

	function loadData (data) {
		addZone(data.zones);
		addLink(data.links);
		tz.dataVersion = data.version;
	}

	function zoneExists (name) {
		if (!zoneExists.didShowError) {
			zoneExists.didShowError = true;
				logError("moment.tz.zoneExists('" + name + "') has been deprecated in favor of !moment.tz.zone('" + name + "')");
		}
		return !!getZone(name);
	}

	function needsOffset (m) {
		var isUnixTimestamp = (m._f === 'X' || m._f === 'x');
		return !!(m._a && (m._tzm === undefined) && !isUnixTimestamp);
	}

	function logError (message) {
		if (typeof console !== 'undefined' && typeof console.error === 'function') {
			console.error(message);
		}
	}

	/************************************
		moment.tz namespace
	************************************/

	function tz (input) {
		var args = Array.prototype.slice.call(arguments, 0, -1),
			name = arguments[arguments.length - 1],
			zone = getZone(name),
			out  = moment.utc.apply(null, args);

		if (zone && !moment.isMoment(input) && needsOffset(out)) {
			out.add(zone.parse(out), 'minutes');
		}

		out.tz(name);

		return out;
	}

	tz.version      = VERSION;
	tz.dataVersion  = '';
	tz._zones       = zones;
	tz._links       = links;
	tz._names       = names;
	tz.add          = addZone;
	tz.link         = addLink;
	tz.load         = loadData;
	tz.zone         = getZone;
	tz.zoneExists   = zoneExists; // deprecated in 0.1.0
	tz.guess        = guess;
	tz.names        = getNames;
	tz.Zone         = Zone;
	tz.unpack       = unpack;
	tz.unpackBase60 = unpackBase60;
	tz.needsOffset  = needsOffset;
	tz.moveInvalidForward   = true;
	tz.moveAmbiguousForward = false;

	/************************************
		Interface with Moment.js
	************************************/

	var fn = moment.fn;

	moment.tz = tz;

	moment.defaultZone = null;

	moment.updateOffset = function (mom, keepTime) {
		var zone = moment.defaultZone,
			offset;

		if (mom._z === undefined) {
			if (zone && needsOffset(mom) && !mom._isUTC) {
				mom._d = moment.utc(mom._a)._d;
				mom.utc().add(zone.parse(mom), 'minutes');
			}
			mom._z = zone;
		}
		if (mom._z) {
			offset = mom._z.utcOffset(mom);
			if (Math.abs(offset) < 16) {
				offset = offset / 60;
			}
			if (mom.utcOffset !== undefined) {
				mom.utcOffset(-offset, keepTime);
			} else {
				mom.zone(offset, keepTime);
			}
		}
	};

	fn.tz = function (name, keepTime) {
		if (name) {
			if (typeof name !== 'string') {
				throw new Error('Time zone name must be a string, got ' + name + ' [' + typeof name + ']');
			}
			this._z = getZone(name);
			if (this._z) {
				moment.updateOffset(this, keepTime);
			} else {
				logError("Moment Timezone has no data for " + name + ". See http://momentjs.com/timezone/docs/#/data-loading/.");
			}
			return this;
		}
		if (this._z) { return this._z.name; }
	};

	function abbrWrap (old) {
		return function () {
			if (this._z) { return this._z.abbr(this); }
			return old.call(this);
		};
	}

	function resetZoneWrap (old) {
		return function () {
			this._z = null;
			return old.apply(this, arguments);
		};
	}

	fn.zoneName = abbrWrap(fn.zoneName);
	fn.zoneAbbr = abbrWrap(fn.zoneAbbr);
	fn.utc      = resetZoneWrap(fn.utc);

	moment.tz.setDefault = function(name) {
		if (major < 2 || (major === 2 && minor < 9)) {
			logError('Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js ' + moment.version + '.');
		}
		moment.defaultZone = name ? getZone(name) : null;
		return moment;
	};

	// Cloning a moment should include the _z property.
	var momentProperties = moment.momentProperties;
	if (Object.prototype.toString.call(momentProperties) === '[object Array]') {
		// moment 2.8.1+
		momentProperties.push('_z');
		momentProperties.push('_a');
	} else if (momentProperties) {
		// moment 2.7.0
		momentProperties._z = null;
	}

	// INJECT DATA

	return moment;
}));


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 4,
	"./af.js": 4,
	"./ar": 11,
	"./ar-dz": 5,
	"./ar-dz.js": 5,
	"./ar-kw": 6,
	"./ar-kw.js": 6,
	"./ar-ly": 7,
	"./ar-ly.js": 7,
	"./ar-ma": 8,
	"./ar-ma.js": 8,
	"./ar-sa": 9,
	"./ar-sa.js": 9,
	"./ar-tn": 10,
	"./ar-tn.js": 10,
	"./ar.js": 11,
	"./az": 12,
	"./az.js": 12,
	"./be": 13,
	"./be.js": 13,
	"./bg": 14,
	"./bg.js": 14,
	"./bm": 15,
	"./bm.js": 15,
	"./bn": 16,
	"./bn.js": 16,
	"./bo": 17,
	"./bo.js": 17,
	"./br": 18,
	"./br.js": 18,
	"./bs": 19,
	"./bs.js": 19,
	"./ca": 20,
	"./ca.js": 20,
	"./cs": 21,
	"./cs.js": 21,
	"./cv": 22,
	"./cv.js": 22,
	"./cy": 23,
	"./cy.js": 23,
	"./da": 24,
	"./da.js": 24,
	"./de": 27,
	"./de-at": 25,
	"./de-at.js": 25,
	"./de-ch": 26,
	"./de-ch.js": 26,
	"./de.js": 27,
	"./dv": 28,
	"./dv.js": 28,
	"./el": 29,
	"./el.js": 29,
	"./en-au": 30,
	"./en-au.js": 30,
	"./en-ca": 31,
	"./en-ca.js": 31,
	"./en-gb": 32,
	"./en-gb.js": 32,
	"./en-ie": 33,
	"./en-ie.js": 33,
	"./en-il": 34,
	"./en-il.js": 34,
	"./en-nz": 35,
	"./en-nz.js": 35,
	"./eo": 36,
	"./eo.js": 36,
	"./es": 39,
	"./es-do": 37,
	"./es-do.js": 37,
	"./es-us": 38,
	"./es-us.js": 38,
	"./es.js": 39,
	"./et": 40,
	"./et.js": 40,
	"./eu": 41,
	"./eu.js": 41,
	"./fa": 42,
	"./fa.js": 42,
	"./fi": 43,
	"./fi.js": 43,
	"./fo": 44,
	"./fo.js": 44,
	"./fr": 47,
	"./fr-ca": 45,
	"./fr-ca.js": 45,
	"./fr-ch": 46,
	"./fr-ch.js": 46,
	"./fr.js": 47,
	"./fy": 48,
	"./fy.js": 48,
	"./gd": 49,
	"./gd.js": 49,
	"./gl": 50,
	"./gl.js": 50,
	"./gom-latn": 51,
	"./gom-latn.js": 51,
	"./gu": 52,
	"./gu.js": 52,
	"./he": 53,
	"./he.js": 53,
	"./hi": 54,
	"./hi.js": 54,
	"./hr": 55,
	"./hr.js": 55,
	"./hu": 56,
	"./hu.js": 56,
	"./hy-am": 57,
	"./hy-am.js": 57,
	"./id": 58,
	"./id.js": 58,
	"./is": 59,
	"./is.js": 59,
	"./it": 60,
	"./it.js": 60,
	"./ja": 61,
	"./ja.js": 61,
	"./jv": 62,
	"./jv.js": 62,
	"./ka": 63,
	"./ka.js": 63,
	"./kk": 64,
	"./kk.js": 64,
	"./km": 65,
	"./km.js": 65,
	"./kn": 66,
	"./kn.js": 66,
	"./ko": 67,
	"./ko.js": 67,
	"./ku": 68,
	"./ku.js": 68,
	"./ky": 69,
	"./ky.js": 69,
	"./lb": 70,
	"./lb.js": 70,
	"./lo": 71,
	"./lo.js": 71,
	"./lt": 72,
	"./lt.js": 72,
	"./lv": 73,
	"./lv.js": 73,
	"./me": 74,
	"./me.js": 74,
	"./mi": 75,
	"./mi.js": 75,
	"./mk": 76,
	"./mk.js": 76,
	"./ml": 77,
	"./ml.js": 77,
	"./mn": 78,
	"./mn.js": 78,
	"./mr": 79,
	"./mr.js": 79,
	"./ms": 81,
	"./ms-my": 80,
	"./ms-my.js": 80,
	"./ms.js": 81,
	"./mt": 82,
	"./mt.js": 82,
	"./my": 83,
	"./my.js": 83,
	"./nb": 84,
	"./nb.js": 84,
	"./ne": 85,
	"./ne.js": 85,
	"./nl": 87,
	"./nl-be": 86,
	"./nl-be.js": 86,
	"./nl.js": 87,
	"./nn": 88,
	"./nn.js": 88,
	"./pa-in": 89,
	"./pa-in.js": 89,
	"./pl": 90,
	"./pl.js": 90,
	"./pt": 92,
	"./pt-br": 91,
	"./pt-br.js": 91,
	"./pt.js": 92,
	"./ro": 93,
	"./ro.js": 93,
	"./ru": 94,
	"./ru.js": 94,
	"./sd": 95,
	"./sd.js": 95,
	"./se": 96,
	"./se.js": 96,
	"./si": 97,
	"./si.js": 97,
	"./sk": 98,
	"./sk.js": 98,
	"./sl": 99,
	"./sl.js": 99,
	"./sq": 100,
	"./sq.js": 100,
	"./sr": 102,
	"./sr-cyrl": 101,
	"./sr-cyrl.js": 101,
	"./sr.js": 102,
	"./ss": 103,
	"./ss.js": 103,
	"./sv": 104,
	"./sv.js": 104,
	"./sw": 105,
	"./sw.js": 105,
	"./ta": 106,
	"./ta.js": 106,
	"./te": 107,
	"./te.js": 107,
	"./tet": 108,
	"./tet.js": 108,
	"./tg": 109,
	"./tg.js": 109,
	"./th": 110,
	"./th.js": 110,
	"./tl-ph": 111,
	"./tl-ph.js": 111,
	"./tlh": 112,
	"./tlh.js": 112,
	"./tr": 113,
	"./tr.js": 113,
	"./tzl": 114,
	"./tzl.js": 114,
	"./tzm": 116,
	"./tzm-latn": 115,
	"./tzm-latn.js": 115,
	"./tzm.js": 116,
	"./ug-cn": 117,
	"./ug-cn.js": 117,
	"./uk": 118,
	"./uk.js": 118,
	"./ur": 119,
	"./ur.js": 119,
	"./uz": 121,
	"./uz-latn": 120,
	"./uz-latn.js": 120,
	"./uz.js": 121,
	"./vi": 122,
	"./vi.js": 122,
	"./x-pseudo": 123,
	"./x-pseudo.js": 123,
	"./yo": 124,
	"./yo.js": 124,
	"./zh-cn": 125,
	"./zh-cn.js": 125,
	"./zh-hk": 126,
	"./zh-hk.js": 126,
	"./zh-tw": 127,
	"./zh-tw.js": 127
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 185;

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("snapClinical", [], factory);
	else if(typeof exports === 'object')
		exports["snapClinical"] = factory();
	else
		root["snapClinical"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "user", function() { return user; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processService", function() { return processService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "taskService", function() { return taskService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formService", function() { return formService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flowService", function() { return flowService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "snapClinicalApiService", function() { return snapClinicalApiService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "oauthService", function() { return oauthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_User__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_ProcessService__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_TaskService__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_FormService__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_FlowService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_SnapClinicalApiService__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_OauthService__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utility_Version__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "client", function() { return __WEBPACK_IMPORTED_MODULE_0__Client__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return __WEBPACK_IMPORTED_MODULE_1__helpers_User__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ProcessService", function() { return __WEBPACK_IMPORTED_MODULE_2__services_ProcessService__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TaskService", function() { return __WEBPACK_IMPORTED_MODULE_3__services_TaskService__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FormService", function() { return __WEBPACK_IMPORTED_MODULE_4__services_FormService__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FlowService", function() { return __WEBPACK_IMPORTED_MODULE_5__services_FlowService__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SnapClinicalApiService", function() { return __WEBPACK_IMPORTED_MODULE_6__services_SnapClinicalApiService__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "OauthService", function() { return __WEBPACK_IMPORTED_MODULE_7__services_OauthService__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Version", function() { return __WEBPACK_IMPORTED_MODULE_8__utility_Version__["a"]; });










/** @type {User} */
const user = new __WEBPACK_IMPORTED_MODULE_1__helpers_User__["a" /* default */]();

/** @type {ProcessService} */
const processService = new __WEBPACK_IMPORTED_MODULE_2__services_ProcessService__["a" /* default */]();

/** @type {TaskService} */
const taskService = new __WEBPACK_IMPORTED_MODULE_3__services_TaskService__["a" /* default */]();

/** @type {FormService} */
const formService = new __WEBPACK_IMPORTED_MODULE_4__services_FormService__["a" /* default */]();

/** @type {FlowService} */
const flowService = new __WEBPACK_IMPORTED_MODULE_5__services_FlowService__["a" /* default */]();

/** @type {SnapClinicalApiService} */
const snapClinicalApiService = new __WEBPACK_IMPORTED_MODULE_6__services_SnapClinicalApiService__["a" /* default */]();

/** @type {OauthService} */
const oauthService = new __WEBPACK_IMPORTED_MODULE_7__services_OauthService__["a" /* default */]();



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return client; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src__ = __webpack_require__(0);



/**
 * Client is the base class that is used for setting system wide information about
 * connection, device, and general SDK settings.
 */
class Client {

    /**
     * Constructor
     *
     */
    constructor() {
        this._config = {
            apiBaseUrl: undefined,
            basicCredentials: undefined,
            tokenObj: undefined,
            personalId: undefined,
            frontEndKey: undefined,
            oauthId: 'snapClinicalClient',
            oauthPw: 'secret',
            enableOauth: false,
            contextPath: {
                oauth: 'snap-oauth', // ':8081/snap-oauth'
                snap: 'snap-api',// ':9090/snap-api',
                flowable: 'flowable-task'//':9999/flow-api'
            },
            ports: {
                oauth: '', //'8443',// '8081',
                snap: '', //'8443',// '9090',
                flowable: '' // '8443', //'9999'
            }
        };
    }

    /**
     * Gets the apiBaseUrl
     *
     * @type {string} - Current apiBaseUrl - the base url for api client requests
     */
    get apiBaseUrl() {
        return this._config.apiBaseUrl;
    }

    /**
     * Sets the apiBaseUrl
     *
     * @param {string} url
     */
    set apiBaseUrl(url) {
        let data = url;
        if (typeof data !== 'string') {
            throw new Error('Error : apiBaseUrl must be a string');
        }
        if (data[data.length - 1] === '/') {
            data = data.slice(0, -1);
        }
        this._config.apiBaseUrl = data;
    }

    /**
     * Gets the basicCredentials - the credential string for Basic Authentication
     *
     * @type {string} - Current apiBaseUrl
     */
    get basicCredentials() {
        return this._config.basicCredentials;
    }

    /**
     * Sets the basicCredentials
     *
     * @param {string} credentials
     */
    set basicCredentials(credentials) {
        this._config.basicCredentials = credentials;
    }

    /**
    * Gets the configuration information
    *
    * @type {Object} - the information in a key value object
    * @property {String} config.apiBaseUrl - url
    * @property {String} config.basicCredentials - the credential string for Basic Authentication
    */
    get config() {
        return this._config;
    }

    /**
     * Sets the configuration for Clinical6
     *
     * @param {Object} data - the information in a key value object
     * @property {String} config.apiBaseUrl - url
     * @property {String} config.basicAuthentication - the credential string for Basic Authentication
     */
    set config(data) {
        Object.assign(this._config, data);
    }

    /**
     * Gets the personalId
     *
     * @type {Object} - Current personalId
     */
    get personalId() {
      return this._config.personalId;
    }

    /**
     * Sets the personalId
     *
     * @param {Object} personalId
     */
    set personalId(personalId) {
      this._config.personalId = personalId;
    }

    /**
     * Gets the frontEndKey
     *
     * @type {Object} - Current frontEndKey
     */
    get frontEndKey() {
      return this._config.frontEndKey;
    }

    /**
     * Sets the frontEndKey
     *
     * @param {Object} frontEndKey
     */
    set frontEndKey(frontEndKey) {
      this._config.frontEndKey = frontEndKey;
    }

    /**
     * Gets oauth
     */
    get enableOauth() {
        return this._config.enableOauth;
    }
  
    /**
     * Enable/Disable oauth 
     * @param {Boolean}value
     */
    set enableOauth(value) {
        this._config.enableOauth = value;
    }

    /**
     * Gets the token object
     * containing access_token, token_type, refresh_token, expires_in, scope
     * @type {Object} - current tokenObj
     */
    get tokenObj(){
        return this._config.tokenObj
    }

    /**
     * Sets the tokenObj
     * 
     * @param {Object} tokenObj
     */
    set tokenObj(tokenObj){
        this._config.tokenObj = tokenObj
    }

    /**
     * Gets the oauth id string
     * 
     * @type {String} - current oauthId
     */
    get oauthId() {
        return this._config.oauthId;
    }

    /**
     * Sets the oauth id
     * 
     * @param {String} oauthId
     */
    set oauthId(value) {
        this._config.oauthId = value;
    }

    /**
     * Gets the oauth password string
     * 
     * @type {String} - current oauthPw
     */
    get oauthPw() {
        return this._config.oauthPw;
    }

    /**
     * Sets the oauth password
     * 
     * @param {String} oauthPw
     */
    set oauthPw(value) {
        this._config.oauthPw = value;
    }

    /**
     * Gets the contextPath object
     * containing oauth, snap, flowable context paths string
     * @type {Object} - current contextPath
     */
    get contextPath(){
        return this._config.contextPath
    }

    /**
     * Sets the contextPath object containing oauth, snap and flowable context paths 
     * 
     * @param {Object} contextPath
     */
    set contextPath(contextPath){
        this._config.contextPath = contextPath
    }

    /**
     * Gets the ports object
     * containing oauth, snap, flowable ports
     * @type {Object} - current ports
     */
    get ports(){
        return this._config.ports
    }

    /**
     * Sets the ports object containing oauth, snap and flowable ports
     * 
     * @param {Object} ports
     */
    set ports(ports){
        this._config.ports = ports
    }

  /**
     * Send HTTP request to API
     *
     * @param {!String} url       - Path to the endpoint starting with '/'
     * @param {?String} [method]  - HTTP Method (DELETE|GET|POST|PUT)
     * @param {?Object} [params]  - Key/Value list of url parameters
     * @param {?Object} [body]    - a Blob, BufferSource, FormData, URLSearchParams, or USVString object
     *                              In case of a json body, this can be created with something like:
     *                              new Blob(body, {type : 'application/json'});
     * @param {?Object} [headers] - Key/Value list of headers. If not present it default to `{
     *                                'Accept' : 'application/json',
     *                              }`
     * @return {Promise}          - Resolves on HTTP 200. Rejects on all else.
     */
    async fetch(url, method = 'GET', params = {}, body = undefined, headers) {
        // Determine if method is valid
        if ((['POST', 'PUT', 'PATCH'].indexOf(method.toUpperCase()) !== -1) && !body) {
            throw new Error('fetch error: invalid PUT/POST/PATCH request, no data given');
        }

        // Initialize parameters
        let fetchParams = new URLSearchParams();
        for (let key in params) {
            fetchParams.append(key, params[key]);
        }
        const fetchParamsString = fetchParams.toString();

        // Initialize headers

        // Default headers
        let fetchHeaders = headers;
        if (!fetchHeaders)
            fetchHeaders = {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            };

        if (this._config.enableOauth) {
            if (!this._config.tokenObj) {
                // get a valid token if it doesn't exist
                if (__WEBPACK_IMPORTED_MODULE_0__src__["user"]._accountName && __WEBPACK_IMPORTED_MODULE_0__src__["user"]._password) {
                    await this.getToken(__WEBPACK_IMPORTED_MODULE_0__src__["user"]._accountName, __WEBPACK_IMPORTED_MODULE_0__src__["user"]._password);
                    fetchHeaders['Authorization'] = 'Bearer '+ this._config.tokenObj.access_token; 
                }
            } else {
                // Add the Bearer Authentication header
                fetchHeaders['Authorization'] = 'Bearer '+ this._config.tokenObj.access_token;
            }
        } else {
            // Add the Basic Authentication header
            if (this._config.basicCredentials)
                fetchHeaders['Authorization'] = 'Basic '+ this._config.basicCredentials;
        }   

        let requestData = {
            method: method,
            headers: new Headers(fetchHeaders),
            mode: 'cors',
            cache: 'default',
            body: body
        };

        let ports = '';
        if (url.indexOf(`/${this._config.contextPath.oauth}/`) > -1 && this._config.ports.oauth)
            ports = `${this._config.ports.oauth}`;
        else if (url.indexOf(`/${this._config.contextPath.flowable}`) > -1 && this._config.ports.flowable)
            ports = `${this._config.ports.flowable}`;
        else if (url.indexOf(`/${this._config.contextPath.snap}`) > -1 && this._config.ports.snap)
            ports = `${this._config.ports.snap}`;

        const fetchUrl = this._config.apiBaseUrl + ports + url +
            (fetchParamsString.length > 0 ? '?' + fetchParamsString : '');

        let fetchRequest = new Request(fetchUrl, requestData);

        if (this._config.enableOauth){
            // use oauth 
            const response = await fetch(fetchRequest)
            const responseStatus = response.status || 0;

            if (responseStatus === 401 && this._config.tokenObj){
                // in case token expired try to refresh it
                const json = await response.json();
                const tokenExpiredMsg = "Access token expired: " + this._config.tokenObj.access_token;
                if (json.error === 'invalid_token' && json.error_description === tokenExpiredMsg){
                    return await this.tokenOnExpired(fetchUrl, requestData)
                }
            } else {
                return response;
            } 
        } else {
            return fetch(fetchRequest);
        }
    }

    /**
     * get a valid token
     * @param {*} username 
     * @param {*} password 
     */
    async getToken(username, password){
        // refresh the token
        try {
            await __WEBPACK_IMPORTED_MODULE_0__src__["oauthService"].getToken(username, password);
        } catch (e) {
            throw(e);
        }
    }

    /**
     * refresh the token and fetch again
     * @param {*} fetchUrl 
     * @param {*} requestData 
     */
    async tokenOnExpired(fetchUrl, requestData){
        // refresh the token
        let res = await __WEBPACK_IMPORTED_MODULE_0__src__["oauthService"].refreshToken(this._config.tokenObj.refresh_token)
        // set the new token
        requestData.headers.set("Authorization", 'Bearer '+ this._config.tokenObj.access_token)
        let fetchRequest = new Request(fetchUrl, requestData)
        // refetch the request
        return fetch(fetchRequest);
    }

}

const client = new Client();

// export default Client;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Model representing a user profile.
 */
class BaseModel {
    /**
     * @param {Object}          response            - JSON formatted response of base object.
     * @param {String|Number}   response.id         - The base ID value
     */
    constructor(response = {}) {
        const _response = response['data'] || response;

        /** @type {String} */
        this._id = _response.id;
        this._response = _response;

        // Add any other fields in the response
        // for (let prop in _response) {
        //     this['_' + prop] = _response[prop];
        // }
    }

    /**
     * Gets the id
     *
     * @type {String}
     */
    get id() {
        return this._id;
    }

    /**
     * Sets the id
     *
     * @param {String} id
     */
    set id(id) {
        this._id = id;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (BaseModel);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hasAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hasCredentials; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isA; });
/* unused harmony export isDate */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isRequired; });
/* unused harmony export isValid */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return validate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hasPersonalId; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(1);


/**
 * If there is no token, a message is returned.
 * @param  {String}  msg - Message to return if validation fails
 * @return {String}      - A message if the validation fails and is blank if it passes
 */
function hasCredentials(msg = 'requires Basic Authentication credentials') { return (__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].basicCredentials) ? '' : msg; }

/**
 * If the value is not a date, a message is returned.
 * @param  {Object}  date - The target value to see if it is a date.
 * @param  {String}  msg  - Message to return if validation fails
 * @return {String}       - A message if the validation fails and is blank if it passes
 */
function isDate(date, msg = 'requires valid date') { return (Date.parse(date)) ? '' : msg; }

/**
 * If the required item does not exist, a message is returned.
 * @param  {Object}  p   - The target value to see if it exists, to be
 *                         Must contain a { key: value } to be the target of validation
 * @param  {String}  msg - Message to return if validation fails
 * @return {String}      - A message if the validation fails and is blank if it passes
 */
function isRequired(p, msg = 'is not defined') {
    return Object.keys(p)
        .map(key => ({ key, value: p[key] }))
        .filter(obj => (obj.value === null || obj.value === undefined))
        .map(value => `${value.key} ${msg}`)
        .join(' and ');
}

/**
 * If the parameter is not of primitive type 'type', a message is returned.
 * @param  {Object}  p    - The target value to see if the type exists.
 *                          Must contain a { key: value } to be the target of validation
 * @param  {Object}  type - The type is the class the target is an instance of (example Array, String, etc.).
 * @param  {String}  msg  - Message to return if validation fails
 * @return {String}       - A message if the validation fails and is blank if it passes
 */
function isA(p, type, msg = 'is not a') {
    if (isRequired(p).length > 0) { return ''; }
    return Object.keys(p)
        .map(key => ({ key, value: p[key] }))
        .filter(obj => ((typeof type !== 'function' && typeof obj.value !== type)
            || (typeof obj.value === 'object' && !(obj.value instanceof type))))
        .map(value => `${value.key} ${msg} ${type}`).join(' and ');
}

/**
 * If the parameter does not have the attribute, a message is returned
 * @param  {Object}  p             - The target value to see if it has attributes
 *                                   Must contain a { key: value } to be the target of validation
 * @param  {String}  attributeName - Must be a string to validate p
 * @param  {String}  msg           - Message to return if validation fails
 * @return {String}                - A message if the validation fails and blank if it passes
 */
function hasAttribute(p, attributeName, msg = 'does not have') {
    if (isRequired(p).length > 0) { return ''; }
    return Object.keys(p)
        .map(key => ({ key, value: p[key] }))
        .filter(obj => !{}.hasOwnProperty.call(obj.value, attributeName))
        .map(value => `${value.key} ${msg} ${attributeName}`)
        .join(' and ');
}

/**
 * If the boolean statement is false, return a message, otherwise return an empty string
 * @param  {Boolean} booleanStatement - Any boolean statement that should be true
 * @param  {String}  msg              - Message to return if validation fails
 * @return {String}                   - A message if the validation fails and blank if it passes
 */
function isValid(booleanStatement, msg = 'is not true') { return (booleanStatement) ? '' : msg; }

/**
 * Checks if the client has stored personalId information
 * @param  {String}  msg           - Message to return if validation fails
 * @return {String}                - A message if the validation fails and blank if it passes
 */
function hasPersonalId(msg = 'requires personalId') { return (__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId) ? '' : msg; }

/**
 * Loops through each validation item and throws an error if something fails (a message exists)
 * @param  {String}    module  - The location that calls this method.
 * @param  {...Object} results - An array of functions to test.
 */
function validate(module, ...results) {
    const uniqueResults = results.filter(result => result);
    if (uniqueResults.length > 0) {
        const messages = uniqueResults.join(' and ');
        throw new Error(`${module} error: ${messages}`, module);
    }
}

// Original, substitued methods, TODO: remove

/**
 * If the required item does not exist, a message is returned.
 * @param  {Object}  p    - The target value to see if it exists.
 * @param  {String}  msg - Message to return if validation fails
 * @return {String}      - A message if the validation fails and is blank if it passes
 */
function isRequiredOrig(p, msg = 'is not defined') {
    return Object.keys(p)
        .map(key => ({ key, value: p[key] }))
        .filter(obj => !obj.value)
        .map(value => `${value.key} ${msg}`)
        .join(' and ');
}







/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(2);


/**
 * Model representing a process definition.
 */
class Form extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */]{
    /**
     * @param {Object}  response                        - JSON formatted response of process definition.
     * @param {String}  response.id                     - The process definition ID value
     */
    constructor(response = {}) {
        super(response);
    }

    /**
     * Gets the formKey
     *
     * @type {String}
     */
    get formKey() {
        return this._response.formKey;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Form);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form__ = __webpack_require__(4);


/**
 * Model representing a process definition.
 */
class FormModel extends __WEBPACK_IMPORTED_MODULE_0__Form__["a" /* default */] {
    /**
     * @param {Object}  response            - JSON formatted response of a form model.
     *                  response.id         - The form model ID value
     */
    constructor(response) {
        super(response);
    }

    /**
     * Gets the fields
     *
     * @type {Array}
     */
    get fields() {
        return this._response.fields;
    }

    /**
     * Gets the outcomes
     *
     * @type {Array}
     */
    get outcomes() {
        return this._response.outcomes;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (FormModel);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_User__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Client__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src__ = __webpack_require__(0);




/**
 * Helper class representing a user MobileUser.
 */
// class User extends aggregate(UserModel, Helper) {
class User extends __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */] {

    /**
     * Constructor for helper class representing a MobileUser
     *
     * @param {Object} json - response from server
     */
    constructor(json = {}) {
        super(json);

        this.updateAuthenticatedUser();
    }

    /**
     * Sets the accountName
     *
     * @param {string} name
     */
    set accountName(name) {
        super.accountName = name;

        this.updateCredentials();
    }

    /**
     * Sets the password
     *
     * @param {string} pwd
     */
    set password(pwd) {
        super.password = pwd;

        this.updateAuthenticatedUser();
    }

    /**
     * User Authentication based on client configuration
     */
    updateAuthenticatedUser() {
        if (__WEBPACK_IMPORTED_MODULE_1__Client__["a" /* client */].enableOauth)
            this.resetToken();
        else
            this.updateCredentials();
    }

    updateCredentials() {
        if (this._accountName && this._password) {
            __WEBPACK_IMPORTED_MODULE_1__Client__["a" /* client */].basicCredentials = window.btoa(this._accountName + ':' + this._password);
        }
    }

    /**
     * reset token if user has new credentials 
     */
    resetToken(){
        if (this._accountName && this._password) {
            __WEBPACK_IMPORTED_MODULE_1__Client__["a" /* client */].tokenObj = null;
        }
    }

    /**
     * Sets the personalId
     *
     * @param {string} personalId
     */
    set personalId(personalId) {
        super.personalId = personalId;

        __WEBPACK_IMPORTED_MODULE_1__Client__["a" /* client */].personalId = personalId;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (User);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(2);


/**
 * Model representing a user profile.
 */
class UserModel extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */]{

    /**
     * @param {Object}  response                        - JSON formatted response of a user profile.
     *                  response.account_name           - Account name (usually a number)
     *                  response.password               - Account password
     *                  response.email                  - The email address
     *                  response.personal_id            - The email address
     */
    constructor(response) {
        super(response);

        /** @type {String} */
        this._accountName = this._response['account_name'];

        /** @type {String} */
        this._password = this._response['password'];

        /** @type {String} */
        this._email = this._response['email'];

        /** @type {String} */
        this._email = this._response['personal_id'];
    }

    /**
     * Gets the accountName
     *
     * @type {string}
     */
    get accountName() {
        return this._accountName;
    }

    /**
     * Sets the accountName
     *
     * @param {string} name
     */
    set accountName(name) {
        this._accountName = name;
    }

    /**
     * Gets the email
     *
     * @type {string}
     */
    get personalId() {
        return this._personalId;
    }

    /**
     * Sets the personalId
     *
     * @param {string} personalId
     */
    set personalId(personalId) {
        this._personalId = personalId;
    }

    /**
     * Sets the password
     *
     * @param {string} pwd
     */
    set password(pwd) {
        this._password = pwd;
    }

    /**
     * Gets the email
     *
     * @type {string}
     */
    get email() {
        return this._email;
    }

    /**
     * Sets the password
     *
     * @param {string} email
     */
    set email(email) {
        this._email = email;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (UserModel);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_ProcessDefinition__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_ProcessInstance__ = __webpack_require__(11);






/**
 * Service handling Process specific endpoints.
 *
 */
class ProcessService {

    constructor() {}

    /**
     * Gets the Latest Process Definition with the give Process Definition key
     *
     * @param  {String} processDefKey           - Process Definition key
     * @throws {Error}                          - If missing credential or missing required parameters
     * @return {Promise<ProcessDefinition>}     - Promise returning a ProcessDefinition object
     *
     * @example
     * import { processService } from 'snapClinical';
     * processService.getLastProcessDefinition('SnapClinicalDemo3')
     *
     */
    async getLastProcessDefinition(processDefKey) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getLastProcessDefinition',
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["e" /* isRequired */])({processDefKey}),
            // isA(processDefKey, 'string')
        );

        const params = {
            key : processDefKey,
            size : 5,
            sort : 'version',
            order : 'desc'
        };

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/process-api/repository/process-definitions`, 'GET', params)
            .then( resp => resp.json() )
            .then( response => {
                // Return the top most project definition process definition
                // console.log('getLastProcessDefinition - response:', response);
                if (response.data && Array.isArray(response.data))
                    if ( response.data.length > 0 )
                        return new __WEBPACK_IMPORTED_MODULE_3__models_ProcessDefinition__["a" /* default */](response.data[0]);
                    else
                        return null;
                else throw new Error ( 'getLastProcessDefinition failed', response );
            });
    }

    /**
     * Gets the Last Process Instance with the given Process Definition Id
     *
     * @param  {String} procDefID               - Process Definition Id
     * @throws {Error}                          - If missing credential or missing required parameters
     * @return {Promise<ProcessInstance>}       - Promise returning a ProcessInstance object
     *
     */
    async queryLastProcessInstance(procDefID) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.queryLastProcessInstance',
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["e" /* isRequired */])({procDefID}),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["c" /* hasPersonalId */])()
        );

        const body = JSON.stringify({
            'processDefinitionId': procDefID,
            'includeProcessVariables': 'true',
            'variables':
                [
                    {
                        'name': 'initiator',
                        'value': __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId,
                        'operation': 'equals'
                    }
                ]
        });

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/process-api/query/process-instances`, 'POST', null, body)
            .then( resp => resp.json() )
            .then( response => {
                // console.log('queryLastProcessInstances - response:', response);
                if (response.data && Array.isArray(response.data))
                    if ( response.data.length > 0 )
                        return new __WEBPACK_IMPORTED_MODULE_4__models_ProcessInstance__["a" /* default */](response.data[0]);
                    else
                        return null;
                else throw new Error ( 'queryLastProcessInstance returned empty data', response );
            });
    }

    /**
     * Starts a New Process Instance with the given Process Definition Id
     *
     * @param  {String} procDefID               - Process Definition Id
     * @throws {Error}                          - If missing credential or missing required parameters
     * @return {Promise<ProcessInstance>}       - Promise returning a ProcessInstance object
     *
     */
    async startNewProcessInstance(procDefID) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.startNewProcessInstance',
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["e" /* isRequired */])({procDefID}),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["c" /* hasPersonalId */])()
        );

        const body = JSON.stringify({
            'processDefinitionId':procDefID,
            'businessKey':'myBusinessKey',
            'returnVariables': 'true',
            'variables': [
                {
                    'name': 'initiator',
                    'type': 'string',
                    'value': __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId,
                    'scope': 'local'
                },
                {
                    'name': 'frontEndKey',
                    'type': 'string',
                    'value': __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].frontEndKey,
                    'scope': 'local'
                }
            ]
        });

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/process-api/runtime/process-instances`, 'POST', null, body)
            .then( resp => resp.json() )
            .then( response => {
                console.log('startNewProcessInstance - response:', response);
                if (response.id) {
                    return new __WEBPACK_IMPORTED_MODULE_4__models_ProcessInstance__["a" /* default */](response);
                } else if (response.errorCode) {
                    throw new Error(response.errorCode.toString());
                } else {
                    return null;
                }
            });
    }

    /**
     * Queries Historic Process Instances with the given Process Definition Id and returns the most recent one
     *
     * @param  {String} procDefID               - Process Definition Id
     * @param  {Object} query                   - Query data
     * @throws {Error}                          - If missing credential or missing required parameters
     * @return {Promise<ProcessInstance>}       - Promise returning a ProcessInstance object
     *
     */
    async queryHistoricProcessInstances(procDefID, query) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.queryHistoricProcessInstances',
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["e" /* isRequired */])({procDefID}),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["c" /* hasPersonalId */])(),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["d" /* isA */])({query}, Array)
        );
        for (let queryElement of query) {
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.queryHistoricProcessInstances',
                Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["a" /* hasAttribute */])({queryElement}, 'name'),
                Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["a" /* hasAttribute */])({queryElement}, 'value'),
                Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["a" /* hasAttribute */])({queryElement}, 'operation')
            );
        }

        const params = {
            size : 50,
            order : 'asc'
        };

        let variables = [
            {
                'name': 'initiator',
                'value': __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId,
                'operation': 'equals'
            }
        ];
        // add query to variables
        if (query) variables = variables.concat(query);

        const body = JSON.stringify({
            'processDefinitionId': procDefID,
            'includeProcessVariables': 'true',
            'variables': variables
        });

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/process-api/query/historic-process-instances`, 'POST', params, body)
            .then( resp => resp.json() )
            .then( response => {
                // console.log('queryHistoricProcessInstances - response:', response);
                if (response.data && Array.isArray(response.data) && response.data.length > 0){

                    // here return the list of variables
                    let historicProcessInstances = [];
                    for (let instance of response.data) {
                        historicProcessInstances.push(new __WEBPACK_IMPORTED_MODULE_4__models_ProcessInstance__["a" /* default */](instance));
                    }
                    return historicProcessInstances;
                }
                else throw new Error ( 'queryHistoricProcessInstances returned empty data', response );
            });
    }

    /**
     * Save Process variables for a given Process Instance
     *
     * @param  {String} procInstID          - Process Instance Id
     * @param  {Array} variables            - Array of variables
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Boolean>}           - Promise returning a Boolean
     *
     * @example
     * The array of Variables needs to be in the following format:
     * [
     *  {
     *    'name': 'variablename',
     *    'type': 'variabletype',
     *    'value': 'variablevalue',
     *    'scope': 'local'
     *  }
     * ]
     *
     */
    async saveProcessVariables(procInstID, variables) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.startNewProcessInstance',
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["e" /* isRequired */])({procInstID}),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["d" /* isA */])({variables}, Array)
        );
        for (let variable of variables) {
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.saveFormProperties',
                Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["a" /* hasAttribute */])({variable}, 'name'),
                Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["a" /* hasAttribute */])({variable}, 'type'),
                Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["a" /* hasAttribute */])({variable}, 'value'),
                Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["a" /* hasAttribute */])({variable}, 'scope')
            );
        }
        const body = JSON.stringify(variables);

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/process-api/runtime/process-instances/${procInstID}/variables`, 'PUT', null, body)
            .then( response => {
                // console.log('saveProcessVariable:', response);
                if (response.status === 201) { // 201 Created
                    return response.json();
                }
                else throw new Error ('Save Process Variable failed', response );
            });
    }

    async getAllFormFieldsValues(procInstID) {
      Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.startNewProcessInstance',
        Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["b" /* hasCredentials */])(),
        Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["e" /* isRequired */])({procInstID}),
      );
      const formInstances = await __WEBPACK_IMPORTED_MODULE_1__index__["formService"].getFormInstances(procInstID);
      let formFields = [];

      for (let form of formInstances) {
        let instanceFields = await __WEBPACK_IMPORTED_MODULE_1__index__["formService"].getFormInstanceFieldsByInstanceId(form.id);
        if (form !== null) formFields = formFields.concat(instanceFields.fields);
      }

      return formFields;

    }
}

/* harmony default export */ __webpack_exports__["a"] = (ProcessService);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(2);


/**
 * Model representing a process definition.
 */
class ProcessDefinition extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */]{
    /**
     * @param {Object}  response                        - JSON formatted response of process definition.
     * @param {String}  response.id                     - The process definition ID value
     */
    constructor(response = {}) {
        super(response);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ProcessDefinition);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(2);


/**
 * Model representing a process definition.
 */
class ProcessInstanceModel extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {
    /**
     * @param {Object}  response                        - JSON formatted response of process definition.
     * @param {String}  response.id                     - The process definition ID value
     */
    constructor(response = {}) {
        super(response);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ProcessInstanceModel);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_Task__ = __webpack_require__(13);




/**
 * Service handling Task specific endpoints.
 *
 */
class TaskService {

    constructor() {
    }

    /**
     * Gets the Taskf from the given Process Definition Id
     *
     * @param  {Number} procInstID          - Process Definition Id
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Task>}              - Promise returning a Task object
     *
     */
    async getTask(procInstID) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getTask', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({procInstID}));

        const params = {
            processInstanceId : procInstID,
            includeProcessVariables : true
        };

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/process-api/runtime/tasks`, 'GET', params)
            .then( resp => resp.json() )
            .then( response => {
                // console.log('getTask - response:', response);
                if (response.data && Array.isArray(response.data))
                    if (response.data.length > 0 )
                        return new __WEBPACK_IMPORTED_MODULE_2__models_Task__["a" /* default */](response.data[0]);
                    else
                        return null;
                else throw new Error ( 'getTask returned empty data', response );
            });
    }

    /**
     * Performs a specific action on a Task
     *
     * @param  {Number} taskId          - Task Id
     * @param  {String} action          - action identifier to be perfomed on the task, like 'claim'
     * @throws {Error}                  - If missing credential or missing required parameters
     * @return {Promise<Boolean>}       - Promise returning true when action completes successfully
     *
     */
    async action(taskId, action) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.action', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["c" /* hasPersonalId */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({taskId, action}));

        const body = JSON.stringify({
            'action' : action,
            'assignee' : __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId
        });


        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/process-api/runtime/tasks/` + taskId.toString(), 'POST', null, body)
            .then( response => {

                // console.log('Task action - response:', response);
                if (response.status === 200) {
                    return true;
                }
                else throw new Error ('Task action failed', response );
            });
    }

}

/* harmony default export */ __webpack_exports__["a"] = (TaskService);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(2);



/**
 * Model representing a task.
 */
class TaskModel extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {
    /**
     * @param {Object} response                   - JSON formatted response of a task instance.
     * @param {Number} response.id                - The profile ID value

     */
    constructor(response = {}) {
        super(response);
    }

    /**
     * Gets the name
     *
     * @type {String}
     */
    get name() {
        return this._response['name'];
    }

    /**
     * Gets the taskDefinitionKey
     *
     * @type {String}
     */
    get taskDefinitionKey() {
        return this._response['taskDefinitionKey'];
    }

    /**
     * Gets the formKey
     *
     * @type {String}
     */
    get formKey() {
        return this._response['formKey'];
    }

    /**
     * Gets the process Instance Variables
     *
     * @type {Array}
     */
    get procInstVars() {
        return this._response['variables'];
    }
}

/* harmony default export */ __webpack_exports__["a"] = (TaskModel);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_Form__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_FormModel__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_Base__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__index__ = __webpack_require__(0);







/**
 * Service handling the Form endpoints
 */
class FormService {

    constructor() {
    }

    /**
     * Gets the Form data, including the variables, from the given Task Id
     *
     * @param  {Number} taskId          - Task Id
     * @throws {Error}                  - If missing credential or missing required parameters
     * @return {Promise<Form>}          - Promise returning a Form object
     *
     */
    getFormProperties(taskId) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getFormProperties',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({taskId})
        );

        const params = {
            taskId : taskId
        };

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/process-api/form/form-data`, 'GET', params)
            .then( resp => resp.json() )
            .then( response => {
                // Return the top most project definition process definition
                // console.log('getFormProperties - response:', response);
                return new __WEBPACK_IMPORTED_MODULE_2__models_Form__["a" /* default */](response);
            });
    }

    /**
     * Gets the Form data, including the fields, from the given Deployment Id and Form Key
     *
     * @param  {String} deploymentId    - Deployment Id
     * @param  {String} formKey         - Form Key
     * @throws {Error}                  - If missing credential or missing required parameters
     * @return {Promise<FormModel>}     - Promise returning a Form object
     *
     */
    getFormFields(deploymentId, formKey) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getFormFields',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({deploymentId, formKey})
        );

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/process-api/repository/deployments/${deploymentId}/resourcedata/form-${formKey}.form`, 'GET')
            .then( resp => resp.json() )
            .then( response => {
                // Return the top most project definition process definition
                // console.log('getFormProperties - response:', response);
                return new __WEBPACK_IMPORTED_MODULE_3__models_FormModel__["a" /* default */](response);
            });
    }


    /**
    * Gets the Form Instance data, including the fields, from the given Task Id, Process Instance Id and Form Key
    *
    * @param  {Number|String} taskId               - Task Id
    * @param  {Number|String} processInstanceId    - Process Instance Id
    * @param  {String} formKey                     - Form Definition Key
    * @throws {Error}                              - If missing credential or missing required parameters
    * @return {Promise<FormModel>}                 - Promise returning a Form object
    *
    */
    getFormInstanceFields(taskId, processInstanceId, formKey) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getFormInstanceFields',
          Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
          Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({taskId, processInstanceId, formKey})
        );

        const body = JSON.stringify({
          'taskId': taskId,
          'processInstanceId': processInstanceId,
          'formDefinitionKey': formKey
        });

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/form-api/form/form-instance-model`, 'POST', null, body)
        .then( resp => resp.json() )
        .then( response => {
          // Return the form model
          // console.log('getFormProperties - response:', response);
          return new __WEBPACK_IMPORTED_MODULE_3__models_FormModel__["a" /* default */](response);
        });
    }


    /**
     * Gets the Form Instance data, including the fields, from the given Form Instance Id
     *
     * @param  {Number|String} formInstanceId       - Form Instance Id
     * @throws {Error}                              - If missing credential or missing required parameters
     * @return {Promise<FormModel>}                 - Promise returning a Form object
     *
     */
    getFormInstanceFieldsByInstanceId(formInstanceId) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getFormInstanceFieldsByInstanceId',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({formInstanceId})
        );

        const body = JSON.stringify({
            'formInstanceId': formInstanceId
        });

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/form-api/form/form-instance-model`, 'POST', null, body)
            .then( resp => resp.json() )
            .then( response => {
                // Return the form model
                // console.log('getFormProperties - response:', response);
                return new __WEBPACK_IMPORTED_MODULE_3__models_FormModel__["a" /* default */](response);
            });
    }


    /**
    * Gets all Form Instances from the given Process Instance Id
    *
    * @param  {Number|String} processInstanceId    - Process Instance Id
    * @throws {Error}                              - If missing credential or missing required parameters
    * @return {Promise<Array<any>>}                 - Array of instances
    *
    */
    getFormInstances(processInstanceId) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getFormInstancesForProcessInstanceId',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({processInstanceId})
        );

        const body = JSON.stringify({
            'processInstanceId': processInstanceId
        });

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/form-api/query/form-instances?size=9999`, 'POST', null, body)
        .then( resp => resp.json() )
        .then( response => {
            // Return an array of form instances
            console.log('getFormInstancesForProcessInstanceId - response:', response);


            // filter out the list to remove duplicates
            var cleaned = new Array ();
            var formIdAdded = {};

            for (var i=0, c=0; i<response.data.length; i++) {
                let el = response.data[i];
                let formId = el['formDefinitionId'];
                if (formIdAdded[formId] == undefined) {
                    cleaned[c] = el;
                    formIdAdded[formId] = {
                        ts: el['submittedDate'],
                        c: c
                    };
                    c++;
                } else if (formIdAdded[formId]['ts'] < el['submittedDate']){
                    cleaned[formIdAdded[formId]['c']] = el;
                    formIdAdded[formId]['ts'] = el['submittedDate'];
                }
            };

            return cleaned.slice(0);
        });
    }


  /**
     * Creates a Form Instance data for a given Task Id, Process Instance Id, Form Key and fields
     *
     * @param  {Number|String} taskId               - Task Id
     * @param  {String} formKey                     - Form Definition Key
     * @param  {Number|String} processInstanceId    - Process Instance Id (optional)
     * @param  {Array} fields                       - fields, an array of objects each with id and value fields, for example
     *                                                [ { id: 'someid', value: 'somevalue' } ]
     * @throws {Error}                              - If missing credential or missing required parameters
     * @return {Promise<Boolean>}                   - Promise returning true if
     *
     */
    createFormInstance(taskId, formKey, processInstanceId, fields) { // , parentDeploymentId) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.createFormInstance',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({taskId, formKey, fields}),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({fields}, Array)
        );
        for (let field of fields) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.createFormInstance',
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({field}, 'id'),
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({field}, 'value')
            );
        }

        //remap the fields into an hashmap variables object
        const variables = {};
        fields.forEach(field => (variables[field.id] = field.value));

        let bodyObj = {
            'taskId': taskId,
            'formDefinitionKey': formKey,
            'variables': variables
        };
        if (processInstanceId) bodyObj['processInstanceId'] = processInstanceId;
        const body = JSON.stringify(bodyObj);


        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/form-api/form/form-instances`, 'POST', null, body)
            .then( response => {
                if (response.status === 201 || response.status === 200) { // 201 Created
                    return true;
                }
                else throw new Error ('Create Instance Fields failed', response );
            });
    }

    /**
     * Updates a Form Instance data for a given Task Id, Process Instance Id, Form Key and fields
     *
     * @param  {Number|String} taskId               - Task Id
     * @param  {String} formKey                     - Form Definition Key
     * @param  {Number|String} processInstanceId    - Process Instance Id (optional)
     * @param  {Array} fields                       - fields, an array of objects each with id and value fields, for example
     *                                                [ { id: 'someid', value: 'somevalue' } ]
     * @throws {Error}                              - If missing credential or missing required parameters
     * @return {Promise<Boolean>}                   - Promise returning true if
     *
     */
    updateFormInstance(taskId, formKey, processInstanceId, fields) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.updateFormInstance',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({taskId, formKey, fields}),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({fields}, Array)
        );
        for (let field of fields) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.updateFormInstance',
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({field}, 'id'),
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({field}, 'value')
            );
        }

        //remap the fields into an hashmap variables object
        const variables = {};
        fields.forEach(field => (variables[field.id] = field.value));

        let bodyObj = {
            'taskId': taskId,
            'formDefinitionKey': formKey,
            'variables': variables
        };
        if (processInstanceId) bodyObj['processInstanceId'] = processInstanceId;
        const body = JSON.stringify(bodyObj);

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/form-api/form/form-instances`, 'PUT', null, body)
            .then( response => {
                if (response.status === 200 || response.status === 204) { // 204 No Content
                    return true;
                }
                else throw new Error ('Update Instance Fields failed', response );
            });
    }

    /**
     * Save Form Outcome for a given Process Instance and formKey
     *
     * @param  {String} procInstID          - Process Instance Id
     * @param  {String} outcome             - Value of the outcome variable
     *                                        a name selected among the form outcome array
     * @param  {String} formKey             - Form Definition Key
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Boolean>}           - Promise returning a Boolean
     *
     * @example
     * A new Variable will be created:
     * [
     *  {
     *    'name': 'form_formKey_outcome',
     *    'type': 'string',
     *    'value': 'outcome',
     *    'scope': 'local'
     *  }
     * ]
     *
     */
    async saveFormOutcome(procInstID, outcome, formKey) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.saveFormOutcome',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({outcome}, {formKey}),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({outcome}, String),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({formKey}, String)
        );

        const variables = [
            {
            'name': `form_${formKey}_outcome`,
            'type': 'string',
            'value': outcome,
            'scope': 'local'
        }];

        return __WEBPACK_IMPORTED_MODULE_5__index__["processService"].saveProcessVariables(procInstID, variables);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (FormService);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utility_ArrayUtility__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_FormModel__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__index__ = __webpack_require__(0);









/**
 * Service handling the overal Flow Service
 *
 */
class FlowService {

    constructor() {
        this._lastProcessDef = undefined;
        this._lastProcessInst = undefined;
        this._task = undefined;
        this._processDefKey = undefined;
    }
    /**
     * Gets the current process Definition Key
     *
     * @type {String}
     */
    get processDefKey() {
      return this._processDefKey;
    }

    /**
     * Sets the current process Definition Key
     *
     * @param {String} defKey
     */
    set processDefKey(defKey) {
      this._processDefKey = defKey;
    }

    /**
     * Gets the current task
     *
     * @type {String|Number}
     */
    get task() {
        return this._task;
    }

    /**
     * Sets the current task
     *
     * @param {String|Number} task
     */
    set task(task) {
        this._task = task;
    }


    /**
     * Gets the next Task for a given Process Definition Key
     *
     * @param  {String} processDefKey       - Process Definition Key
     * @param  {Object} qualifier           - Object used to check if the current user is qualified for the flow
     *                                        This input needs to be in the following format:
     *
     *     {
     *       'name': 'somename',
     *       'value': 'somevalue,
     *       'operation': 'equals'|'notEquals'|'equalsIgnoreCase'|'notEqualsIgnoreCase'|
     *                    'lessThan'|'greaterThan'|'lessThanOrEquals'|'greaterThanOrEquals'|'like'
     *     }
     *
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Object>}            - Promise returning an object with the variables, form fields and outcomes
     *                                        specified for the current task. The output object is as follows:
     *
     *     {
     *       variables: [
     *           {
     *               'id': 'someid',
     *               'name': 'somename',
     *               'type': 'string'|'short'|'integer'|'long'|'double'|'boolean'|'date',
     *               'value': somevalue,
     *               'readable': true|false,
     *               'writable': true|false,
     *               'required': true|false,
     *               'datePattern': 'somedatepattern',
     *               'enumValues': [ some array of enum Values like
     *                    {
     *                       'id': 'someid',
     *                       'name': 'somename'
     *                    },
     *                    ...
     *                ]
     *           },
     *           ...
     *       ],
     *       fields: [
     *           {
     *               'fieldType': 'FormField'|'ExpressionFormField'|'OptionFormField',
     *               'id': 'someid',
     *               'name': 'somename',
     *               'type': 'text'|'multi-line-text'|'integer'|'decimal'|'date'|'boolean'|'hyperlink'|
     *                       'expression'|'radio-buttons'|'dropdown',
     *               'value': 'somevalue',
     *               'required': true|false,
     *               'readOnly': true|false,
     *               'overrideId': true|false,
     *               'placeholder': 'someplaceholder',
     *               'params': {
     *                      'minLength': 'somevalue',
     *                      'maxLength': 'somevalue',
     *                      'regexPattern': 'someregex',
     *                      'mask': 'somemask'
     *                   },
     *               'layout': 'somelayout'
     *           },
     *           ...
     *       ],
     *       outcomes: [
     *           {
     *               'id': 'someid',       can be null
     *               'name': 'somename',   outcome value
     *           },
     *           ...
     *       ]
     *     }
     *
     *
     */
    async getNextTask(processDefKey, qualifier) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getNextTask', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["c" /* hasPersonalId */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({processDefKey}));
        const lastProcessDef = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].getLastProcessDefinition(processDefKey);
        if (!lastProcessDef)
            throw new Error('Could not find the Process Definition Key');
        this._lastProcessDef = lastProcessDef;
        this.processDefKey = processDefKey;
        // console.log('FlowService, getNextTask latestProcessDef:', latestProcessDef);

        // Check if the user has already started the flow
        let lastProcessInst = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].queryLastProcessInstance(lastProcessDef.id);
        // console.log('FlowService, getNextTask lastProcessInst:', lastProcessInst);

        if (!lastProcessInst) {
            /* Deprecated
            // Check if the user is qualified for the process
            const qualified = this.checkQualification(qualifier);
            if (qualified) {
                try {
                    lastProcessInst = await processService.startNewProcessInstance(lastProcessDef.id);
                    console.log('FlowService getNextTask BE SURE THAT WE TEST THIS');
                } catch(error) {
                    throw error;
                };
            }
            else
                throw Error ('User not qualified for the flow process');
             **/
            lastProcessInst = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].startNewProcessInstance(lastProcessDef.id);
        }
        this._lastProcessInst = lastProcessInst;

        return this.getNextTaskAndFormData();
    }

  /**
   * Same as getNextTask, but it doesn't reuse an old session
   * @param processDefKey
   * @param qualifier
   * @return {Promise.<Object>}
   */
  async createNewInstanceAndGetFirstTask(processDefKey, qualifier) {
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.createNewInstanceAndGetFirstTask', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["c" /* hasPersonalId */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({processDefKey}));

      const lastProcessDef = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].getLastProcessDefinition(processDefKey);
      if (!lastProcessDef)
        throw new Error('Could not find the Process Definition Key');
      this._lastProcessDef = lastProcessDef;
      this.processDefKey = processDefKey;

      /* Deprecated
      // Check if the user is qualified for the process
      const qualified = this.checkQualification(qualifier);

      if (qualified) {
        lastProcessInst = await processService.startNewProcessInstance(lastProcessDef.id);
        console.log('FlowService createNewInstanceAndGetFirstTask BE SURE THAT WE TEST THIS');
      }
      else
        throw Error ('User not qualified for the flow process');
      */

      let lastProcessInst = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].startNewProcessInstance(lastProcessDef.id);

      this._lastProcessInst = lastProcessInst;

      return this.getNextTaskAndFormData();
    }


    /**
     * Gets the next Task using the stored last Process Instance
     *
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Object>}            - Promise returning an object with three arrays of objects:
     *                                        variables (form properties),
     *                                        fields (form fields)
     *                                        outcomes (form buttons)
     *                                        See getNextTask method for more information on the object format.
     *
     */
    async getNextTaskAndFormData() {
        const lastProcessInst = this._lastProcessInst;
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getTaskAndFormData', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({lastProcessInst}) );

        const task = await __WEBPACK_IMPORTED_MODULE_4__index__["taskService"].getTask(lastProcessInst.id);
        if (!task) {
            // This process instance has no active tasks, returning null
            console.log('FlowService ' + __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId + ' get last process instance:  returning null values');
            return null;
        }
        this._task = task;

        const procVariables = task.procInstVars;

        await __WEBPACK_IMPORTED_MODULE_4__index__["taskService"].action(task.id, 'claim');
        // console.log('FlowService, getTaskAndFormData action claim');
        console.log('FlowService ' + __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId + ' claims task ' + task.name);

        const formVariables = await __WEBPACK_IMPORTED_MODULE_4__index__["formService"].getFormProperties(task.id);

        let formData = new __WEBPACK_IMPORTED_MODULE_3__models_FormModel__["a" /* default */]({ fields:[], outcomes:[] });

        if (task.formKey) {
            formData = await __WEBPACK_IMPORTED_MODULE_4__index__["formService"].getFormInstanceFields(task.id, lastProcessInst.id, task.formKey);
            // console.log('FlowService  formkey: '+ task.formKey + ' - fields: ' + JSON.stringify(formData.fields) + ' - variables: ' + JSON.stringify(procVariables));

           if ( formData.fields && formData.fields.length > 0 && procVariables && procVariables.length > 0) {

                // getting the list of Fields with null value that potentially can be setted by a process variable
                let listOfFieldsIds = formData.fields
                    .filter(el => (!el.value && el.type !== 'expression' && el.type !== 'hyperlink'))
                    .map( el => ({id: el.id}) );

                // console.log('FlowService list of fields to be setted:  ' + JSON.stringify(listOfFieldsIds))

                // getting the list of ProcVariables with valid value and matching ids
                let sublistOfProcVariables = procVariables
                    .filter( el1 => listOfFieldsIds.find( el2 => el1.name === el2.id ))
                    .map(el => FlowService.mapVariablesToFields(el));

                // console.log('FlowService list of variables with matching ids:  ' + JSON.stringify(sublistOfProcVariables))

                // updating the null values of the Fields matchimg with valid variables
                formData.fields.forEach( el => {
                    let i = sublistOfProcVariables.findIndex(el2 => el.id === el2.id);
                    if (i > -1)
                        el.value = sublistOfProcVariables[i].value;
                });

                // console.log('FlowService list of Fields updated:  ' + JSON.stringify(formData.fields))

            }

        }

        return {
            id: task.id,
            name: task.name,
            processInstanceId: lastProcessInst.id,
            definitionKey: task.taskDefinitionKey,
            formKey: task.formKey,
            variables: formVariables._response['formProperties'],
            fields: formData.fields,
            outcomes: formData.outcomes
        };
    }

    /**
     * *** Deprecated ***
     * Checks if the current user is qualified for executing the process identified by the current Process Definition
     *
     * @param  {Object} qualifier           - Object used to check if the current user is qualified for the flow
     *                                        This input needs to be in the following format:
     *
     *     {
     *       'name': 'somename',
     *       'value': 'somevalue,
     *       'operation': 'equals'|'notEquals'|'equalsIgnoreCase'|'notEqualsIgnoreCase'|
     *                    'lessThan'|'greaterThan'|'lessThanOrEquals'|'greaterThanOrEquals'|'like'
     *     }
     *
     * @return {Promise<Boolean>}            - Promise returning an Boolean indicating if the user is qualified
     *
     */
    async checkQualification (qualifier) {
        const lastProcessDef = this._lastProcessDef;
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getTaskAndFormData', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({lastProcessDef, qualifier}) );

        const processInstances = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].queryHistoricProcessInstances(lastProcessDef.id, qualifier);
        // logic to check if the user is qualified
        let qualified = false;
        if (processInstances.length > 0) qualified = true;
        console.log('FlowService, getNextTask qualified:', qualified);
        return qualified;
    }

    /**
     * Save variables, fields and outcome (single string value) for the current TaskId
     *
     * @param  {Array} variables            - Array of variables (formProperties)
     * @param  {Array} fields               - Array of fields (fields in the Form)
     * @param  {String} outcome             - outcome name selected among the form outcome array
     * @throws {Error}                      - If missing credential or missing required parameters
     *
     * @example
     * The array of Variables needs to be in the following format:
     *
     *   [
     *        {
     *            id: 'variablename',
     *            name: 'something', (optional)
     *            type: 'string',
     *            value: null,
     *            readable: true,
     *            writable: true,
     *            required: false,
     *            datePattern: null,
     *            enumValues: []
     *       },
     *       ...
     *   ]
     */
    async saveVariables(variables, fields, outcome) {
        const lastProcessInst = this._lastProcessInst;
        const task = this._task;
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.saveVariables',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({variables, fields, lastProcessInst, task}),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({variables}, Array),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({fields}, Array)
        );

        // SAVE fields
        // Note: the /form/form-instance-model does not properly handle the readOnly property, which is always true
        // const filteredFields = fields.filter(el => (el.readOnly !== undefined) ? !el.readOnly && el.value : el.value);
        // const filteredFields = fields.filter(el => el.value && (el.type !== 'expression') && (el.type !== 'hyperlink'));

        // handle also 'false' on booleans
        const filteredFields = fields.filter(el => (el.type == 'boolean') || (el.value && (el.type !== 'expression') && (el.type !== 'hyperlink')));

        if (filteredFields.length > 0)
            await __WEBPACK_IMPORTED_MODULE_4__index__["formService"].updateFormInstance(task.id, task.formKey, lastProcessInst.id,  filteredFields);

        // SAVE variables
        // map input variables and fields in a format like
        // [
        //     {
        //         'name': 'variablename',
        //         'type': 'variabletype',
        //         'value': 'variablevalue',
        //         'scope': 'local'
        //     },
        //     ...
        // ]
        let mappedVariables = variables
            .filter( el => (el.writable !== undefined) ? el.writable && el.value : el.value )
            .map( el => ({name: el.id, type: el.type, value: el.value, scope: 'local'}) );

        if (outcome && task.formKey) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.saveVariables',
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({outcome}, String)
            );

            mappedVariables.push(
                {
                    'name': `form_${task.formKey}_outcome`,
                    'type': 'string',
                    'value': outcome,
                    'scope': 'local'
                });

        }

        const mappedFields = filteredFields
            .map( el => FlowService.mapFieldsToVariables(el));
        // Remove the common elements, taking the fields elements as
        // Join the two arrays and remove duplicates, the fields elements take the precedence
        const processVariables = Object(__WEBPACK_IMPORTED_MODULE_2__utility_ArrayUtility__["a" /* union */])(mappedVariables, mappedFields, (x, y) => x.name === y.name );

        if (processVariables.length > 0)
            await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].saveProcessVariables(lastProcessInst.id, processVariables);
    }

    /**
     * Moves to the next Task using the stored last Process Instance
     *
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Object>}            - Promise returning an object with three arrays of objects:
     *                                        variables (form properties),
     *                                        fields (form fields)
     *                                        outcomes (form buttons)
     *                                        See getNextTask method for more information on the object format.
     *
     */
    async moveToNextTask() {
        const lastProcessInst = this._lastProcessInst;
        const task = this._task;
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getTaskAndFormData', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({lastProcessInst, task}) );

        await __WEBPACK_IMPORTED_MODULE_4__index__["taskService"].action(task.id, 'complete');
        // console.log('FlowService, moveToNextTask action complete');
        console.log('FlowService   ' + __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId + ' completes task ' + task.name);

        return this.getNextTaskAndFormData();
    }

    /**
     * Helper method used to map a field object into an object that can be stored as a variable
     *
     * @param  {Object} el          - Field object
     * @return {Object}             - Variable object
     *
     */
    static mapFieldsToVariables(el) {
        let type = el.type;
        if (type === 'text') type = 'string';
        if (type === 'multi-line-text') type = 'string';
        if (type === 'integer') type = 'long';
        if (type === 'decimal') type = 'double';
        let value = el.value;
        if (type === 'boolean') {
            if (value === 'true') value = true;
            if (value === 'false') value = false;
        }
        return {
            name: el.id,
            type: type,
            value: value,
            scope: 'local'
        }
    }

    /**
     * Helper method used to map a variable object into an object that can be stored as a field value
     *
     * @param  {Object} el          - Variable object
     * @return {Object}             - Field object
     *
     */
    static mapVariablesToFields(el) {
        let value = el.value;
        let type = el.type;
        if (type === 'boolean') {
            if (value === 'true') value = true;
            if (value === 'false') value = false;
        }
        return {
            id: el.name,
            value: value,
        }
    }


}

/* harmony default export */ __webpack_exports__["a"] = (FlowService);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return union; });
/* unused harmony export unique */
/* unused harmony export arrayToObject */
/**
 * http://stackoverflow.com/a/13319168
 * arr1 and arr2 are arrays of any length; eqFn is a function which
 * can compare two items and return true if they're equal and false otherwise
 * @param {Array} arr1 - Array of any length
 * @param {Array} arr2 - Array of any length
 * @param {Function<Boolean>} eqFn - Function which returns a Boolean
 */
function union(arr1, arr2, eqFn) {
    return unique(arr1.concat(arr2), eqFn);
}

/* // Note, original from http://stackoverflow.com/a/13319168
function union(arr1, arr2, equalityFunc) {
    let union = arr1.concat(arr2);

    for (let i = 0; i < union.length; i++) {
        for (let j = i+1; j < union.length; j++) {
            if (equalityFunc(union[i], union[j])) {
                union.splice(j, 1);
                j--;
            }
        }
    }
    return union;
}
*/

/**
 * Returns an array with unique values given the Eq Function
 * @param {Array} arr - Array that may contain duplicates
 * @param {Function<Boolean>} eqFn - A function that returns a Boolean
 */
function unique(arr, eqFn) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (eqFn(arr[i], arr[j])) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

/**
 * Convert the Array to an object
 *
 * @param  {Array}  _array    - The array to convert to an object
 * @param  {Object} [options] - Options on how to conver the array
 * @return {Object}           - The resulting object from the array
 */
function arrayToObject(_array, options = undefined) {
    const _obj = {};
    let i = 0;
    _array.forEach((obj) => {
        const key = (options && options.key) ? obj[options.key] : obj.id || ++i;
        if (key !== undefined && key !== null) {
            _obj[key] = obj;
        }
    });
    return _obj;
}




/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__ = __webpack_require__(3);



/**
 * Service handling Process specific endpoints.
 *
 */

class SnapClinicalApiService {

  constructor() {
  }

  /**
   * Start a new process or resume my existing tasks (no task claim)
   *
   * @param {Object} processData          - Object containing lookup criteria and initializations
   * @throws {Error}                      - If missing credential or missing required parameters
   * @return {Promise<Object>}            - List of tasks extended with all related information such as form, etc...
   *
   * @example
   * snapClinicalApiService.startNewOrResumeProcess(
   *          {
   *            "forceNewProcessInstance": true | false,
   *            "processDefinitionKey": "processKeyValue",
   *            "processDefinitionId": "processKeyValue:NNN:MMM",
   *            "message": "someMessage",
   *            "businessKey": "someBusinessKeyValue",
   *            "tenantId": "someTenantIdValue",
   *            "processVariables": [
   *                {
   *                "name" : "variableName",
   *                "value" : "variableValue",
   *                "valueUrl" : "http://...",
   *                "type" : "string"
   *                }
   *             ],
   *             "queryVariables": [
   *               {
   *                  "name": "variableName",
   *                  "value": "variableValue",
   *                  "operation": "equals",
   *                  "type" : "string"
   *               }
   *             ]
   *          }
   *        );
   */
  async startNewOrResumeProcess(processData) {
    Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])(this.constructor.name + ".startNewOrResumeProcess",
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({processData}),
      ( !processData.hasOwnProperty("processDefinitionKey") &&
        !processData.hasOwnProperty("processDefinitionId") &&
        !processData.hasOwnProperty("message")) ? "key value missing" : "");

    if (!processData.processVariables) processData.processVariables = [];
    
    if (! processData.processVariables.find( v => (v.name == "frontEndKey"))) {
      processData.processVariables.push({
        "name" : "frontEndKey",
        "value" : __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].frontEndKey,
        "type" : "string"
      });
    }

    const body = JSON.stringify(processData);

    let response = await __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/snap-api/get-new-or-resume-process`, "POST", null, body);

    if (response.status === 200) { // 200 OK
      return response.json();
    }
    // else throw new Error("startNewOrResumeProcess failed", response);
    else {
        let json = await response.json();
        throw new Error("startNewOrResumeProcess failed,\nerror message: " + json.message);
    }
  }

  /**
   * Claim & complete task and get next tasks within the same process instance.
   * This method is to be used to progress within a given process from one user task to the next.
   *
   * @param {Object} taskData           - Object containing all required info to complete task
   * @return {Promise<*|Promise<*>|PromiseLike<T>|Promise<T>>}
   *
   * @example
   * snapClinicalApiService.completeAndGetNext(
   *        {
   *          "taskId": "someId",
   *          "formDefinitionId": "form id",
   *          "processVariables" : [
   *                {
   *                "name" : "variableName",
   *                "value" : "variableValue",
   *                "valueUrl" : "http://...",
   *                "type" : "string"
   *                }
   *            ],
   *          "fields" : [
   *                {
   *                "id" : "fieldId",
   *                "value" : "fieldValue"
   *                }
   *            ],
   *          "outcome" : {
   *                "id":null,
   *                "name":"Next"
   *            }
   *        }
   * );
   */
  async completeAndGetNext(taskData) {
    Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])(this.constructor.name + ".completeAndGetNext",
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({taskData}),
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({taskData},"taskId"),
      // hasAttribute({taskData},"formDefinitionId"),
    );

    const body = JSON.stringify(taskData);

    let response = await __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/snap-api/complete-and-get-next`, "POST", null, body);

    if (response.status === 200) { // 200 OK
        return response.json();
      }

    else {
      let json = await response.json();
      throw new Error("completeAndGetNext failed,\nerror message: " + json.message);
      }
  }


  /**
   * Executes an action on a given task.
   * @param {Object} actionData         - object defining the action to be performed.
   *                                    The object can have the following structure: <code>
   *                                    {
   *                                      "taskId": "someId",
   *                                      "action": "complete" | "claim" | "delegate" | "resolve",
   *                                      "variables": [ {
   *                                          "name" : "variableName",
   *                                          "value" : "variableValue",
   *                                          "valueUrl" : "http://...",
   *                                          "type" : "string"
   *                                          }
   *                                      ],
   *                                      "assignee": "userWhoClaimsOrToDelegateTo"
   *                                    }
   *                                    </code>
   *                                    property taskId and action are mandatory.
   *
   * @return {Promise<any>}
   *
   * @example
   *    import {client} from "snapClinical";
   *
   *    client.apiBaseUrl = "http://test.com";
   *    client.basicCredentials = "basic authentication string";
   *
   *    const actionData = {
   *        "taskId": "someId",
   *        "action":"complete",
   *        "variables": [
   *          {
   *              "name": "VariableName",
   *              "value": "VariableValue",
   *              "type": "string"
   *          }
   *        ]
   *      };
   *
   *    try {
   *      await snapClinicalApiService.taskAction(taskData);
   *    }
   *    catch(e) {
   *      console.error("task Action thown an error:", e);
   *    }
   *
   *
   */
  async taskAction(actionData) {
    Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])(this.constructor.name + ".taskAction",
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({actionData}),
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({actionData},"action")
    );

    const body = JSON.stringify(actionData);

    let response = await __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/snap-api/task-action`, "POST", null, body);

    if (response.status === 200) { // 200 OK
      return response.json();
    }
    else {
      let json = await response.json();
      throw new Error("taskAction failed,\nerror message: " + json.message);
    }
  }

  /**
   * Get my active tasks. Tasks can be filtered using various lookup criteria.
   * @param {Object} lookupData           - object defining lookup criteria in the form:
   *```
   *          {
   *            "processDefinitionKey": "processKeyValue",
   *            "processDefinitionId": "processKeyValue:NNN:MMM",
   *            "processDefinitionKeyLike": "processKeyLikeValue"
   *            "processVariables": [
   *               {
   *                  "name": "variableName",
   *                  "value": "variableValue",
   *                  "operation": "equals",
   *                  "type" : "string"
   *               }
   *             ]
   *          }
   *          ```
   * @return {Promise<any>}             - list of task items
   * @example
   *    import {client} from "snapClinical";
   *
   *    client.apiBaseUrl = "http://test.com";
   *    client.basicCredentials = "basic authentication string";
   *
   *    const lookupData = {
   *        "processDefinitionKey": "someKey",
   *        "queryVariables": [
   *          {
   *              "name": "VariableName",
   *              "value": "VariableValue",
   *              "operation": "equals",  // not yet implemented
   *              "type": "string"
   *          }
   *        ]
   *      };
   *
   *    try {
   *      var result = await snapClinicalApiService.getActiveTasks(lookupData);
   *    }
   *    catch(e) {
   *      console.error("getActiveTasks thown an error:", e);
   *    }
   *
   *
   */
  async getActiveTasks(lookupData) {
    Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])(this.constructor.name + ".getActiveTasks",
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({lookupData})
    );

    const body = JSON.stringify(lookupData);

    let response = await __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.flowable}/snap-api/get-tasks`, "POST", null, body);

    if (response.status === 200) { // 200 OK
      return response.json();
    }
    else {
      let json = await response.json();
      throw new Error("getActiveTasks failed,\nerror message: " + json.message);
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SnapClinicalApiService);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__ = __webpack_require__(3);



/**
 *  Service for hanlding token based authiencation
 */
class OauthService {
    constructor(){ }

    /**
     * get the access token by passing in the username and password
     * each token as 1 hour expiration
     * @param {*} username  
     * @param {*} password 
     */
    async getToken(username, password){
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getToken', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({username, password}));
        const fetchHeaders = {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization': `Basic ${btoa(`${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].oauthId}:${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].oauthPw}`)}`
        };

        const requestData = {
            method: "POST",
            headers: new Headers(fetchHeaders),
            mode: 'cors',
            cache: 'default',
            body: {}
        };

        const params = {
            client_id: 'snapClinicalClient',
            grant_type: 'password',
            username,
            password,
        }

        let fetchParams = new URLSearchParams();
        for (let key in params) {
            fetchParams.append(key, params[key]);
        }
        const fetchParamsString = fetchParams.toString();

        let url = `/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.oauth}/oauth/token`;
        let ports = '';
        if (url.indexOf(__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.oauth) > -1 && __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].ports.oauth)
            ports = `${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].ports.oauth}`;

        const fetchUrl = __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].apiBaseUrl + ports + url +  (fetchParamsString.length > 0 ? '?' + fetchParamsString : '');
        const fetchRequest = new Request(fetchUrl, requestData); 

        let response = await fetch(fetchRequest);

        if (response.status === 200) { // 200 OK
            let json = await response.json();
            __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].tokenObj = json;
            return json;
        }
        else {
            let json = await response.json();
            throw new Error("getToken failed,\nerror message: " + json.message);
        }
    }
    /**
     * refresh the token once expired
     * @param {*} refresh_token 
     */
    async refreshToken(refresh_token){
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.refreshToken', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({refresh_token}));

        const params = {
            refresh_token: refresh_token,
            grant_type: "refresh_token"
        }

        const fetchHeaders = {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization': `Basic ${btoa(`${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].oauthId}:${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].oauthPw}`)}`
        };

        let response = await __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/${__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].contextPath.oauth}/oauth/token`, "POST", params,  {}, fetchHeaders);
        if (response.status === 200) { // 200 OK
            let json = await response.json();
            __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].tokenObj = json;
            return json;
        }
        else {
            let json = await response.json();
            throw new Error("refreshToken failed,\nerror message: " + json.message);
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (OauthService);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Print current lib version on the console log
 */
class Version {
    /**
     * Prints the current lib version on the console log
     */
    static print() {
        console.log("snapClinical JS SDK Version: " + "1.2.1" );
    }

    /**
     * Return the current lib version
     * @return (String)     - the current js sdk library version
     */
    static get() {
        return ("snapClinical JS SDK Version: " + "1.2.1" );
    }

}


/* harmony default export */ __webpack_exports__["a"] = (Version);

/***/ })
/******/ ]);
});

/***/ }),
/* 187 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__JavascriptDistLib_core_js__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objects_base_object_base_object_module_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objects_label_label_module_js__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__objects_button_button_module_js__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__objects_network_network_module_js__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__objects_json_json_module_js__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__objects_connio_connio_module_js__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__objects_animation_animation_module_js__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__objects_screen_screen_module_js__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__objects_dictionary_dictionary_module_js__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__objects_textLibrary_textLibrary_module_js__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__objects_image_image_module_js__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__objects_imageLibrary_imageLibrary_module_js__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__objects_container_container_module_js__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__objects_location_location_module_js__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__objects_mathLibrary_mathLibrary_module_js__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__objects_lists_lists_module_js__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__objects_application_application_module_js__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__objects_graphview_graphview_module_js__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__objects_storage_storage_module_js__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__objects_gauge_gauge_module_js__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__objects_webview_webview_module_js__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__objects_colourLibrary_colourLibrary_module_js__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__objects_timeLibrary_timeLibrary_module_js__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__objects_mapview_mapview_module_js__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__objects_textbox_textbox_module_js__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__objects_slider_slider_module_js__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__objects_videoview_videoview_module_js__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__objects_videoLibrary_videoLibrary_module_js__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__objects_snapclinical_snapclinical_module_js__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__objects_dialog_dialog_module_js__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__objects_bluetooth_bluetooth_module_js__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__objects_gridview_gridview_module_js__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__objects_clock_clock_module_js__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__objects_listview_listview_module_js__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__objects_motion_motion_module_js__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__objects_notification_notification_module_js__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__objects_audioLibrary_audioLibrary_module_js__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__objects_smartdevices_smartdevices_module_js__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__objects_camera_camera_module_js__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__objects_cameraview_cameraview_module_js__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__objects_phone_phone_module_js__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__objects_widgetcanvas_widgetcanvas_module_js__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__objects_system_system_module_js__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__objects_pageview_pageview_module_js__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__objects_firebase_firebase_module_js__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__objects_qrcodescanner_qrcodescanner_module_js__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__objects_docusign_docusign_module_js__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__objects_device_device_module_js__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__objects_list_grid_common_list_grid_common_module_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__objects_googlefit_googlefit_module_js__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__objects_drawview_drawview_module_js__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__objects_healthkit_healthkit_module_js__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__objects_textarea_textarea_module_js__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__objects_shape_shape_module_js__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__objects_eventLibrary_eventlisteners_module_js__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56_moment_timezone__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56_moment_timezone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_56_moment_timezone__);
// ES6 imports

























































// External libraries


var distLib = new __WEBPACK_IMPORTED_MODULE_0__JavascriptDistLib_core_js__["a" /* default */]();
distLib.BaseObject = new __WEBPACK_IMPORTED_MODULE_1__objects_base_object_base_object_module_js__["a" /* default */]();
distLib.Animation = new __WEBPACK_IMPORTED_MODULE_7__objects_animation_animation_module_js__["a" /* default */]();
distLib.Button = new __WEBPACK_IMPORTED_MODULE_3__objects_button_button_module_js__["a" /* default */]();
distLib.Connio = new __WEBPACK_IMPORTED_MODULE_6__objects_connio_connio_module_js__["a" /* default */]();
distLib.Container = new __WEBPACK_IMPORTED_MODULE_13__objects_container_container_module_js__["a" /* default */]();
distLib.Dictionary = new __WEBPACK_IMPORTED_MODULE_9__objects_dictionary_dictionary_module_js__["a" /* default */]();
distLib.Image = new __WEBPACK_IMPORTED_MODULE_11__objects_image_image_module_js__["a" /* default */]();
distLib.ImageLibrary = new __WEBPACK_IMPORTED_MODULE_12__objects_imageLibrary_imageLibrary_module_js__["a" /* default */]();
distLib.JSON = new __WEBPACK_IMPORTED_MODULE_5__objects_json_json_module_js__["a" /* default */]();
distLib.Label = new __WEBPACK_IMPORTED_MODULE_2__objects_label_label_module_js__["a" /* default */]();
distLib.ListLibrary = new __WEBPACK_IMPORTED_MODULE_16__objects_lists_lists_module_js__["a" /* default */]();
distLib.Location = new __WEBPACK_IMPORTED_MODULE_14__objects_location_location_module_js__["a" /* default */]();
distLib.MathLibrary = new __WEBPACK_IMPORTED_MODULE_15__objects_mathLibrary_mathLibrary_module_js__["a" /* default */]();
distLib.GraphContainer = new __WEBPACK_IMPORTED_MODULE_18__objects_graphview_graphview_module_js__["a" /* default */]();
distLib.Network = new __WEBPACK_IMPORTED_MODULE_4__objects_network_network_module_js__["a" /* default */]();
distLib.Screen = new __WEBPACK_IMPORTED_MODULE_8__objects_screen_screen_module_js__["a" /* default */]();
distLib.TextLib = new __WEBPACK_IMPORTED_MODULE_10__objects_textLibrary_textLibrary_module_js__["a" /* default */]();
distLib.Application = new __WEBPACK_IMPORTED_MODULE_17__objects_application_application_module_js__["a" /* default */]();
distLib.Storage = new __WEBPACK_IMPORTED_MODULE_19__objects_storage_storage_module_js__["a" /* default */]();
distLib.Gauge = new __WEBPACK_IMPORTED_MODULE_20__objects_gauge_gauge_module_js__["a" /* default */]();
distLib.WebContainer = new __WEBPACK_IMPORTED_MODULE_21__objects_webview_webview_module_js__["a" /* default */]();
distLib.ColourLibrary = new __WEBPACK_IMPORTED_MODULE_22__objects_colourLibrary_colourLibrary_module_js__["a" /* default */]();
distLib.TimeLibrary = new __WEBPACK_IMPORTED_MODULE_23__objects_timeLibrary_timeLibrary_module_js__["a" /* default */]();
distLib.MomentLibrary = __WEBPACK_IMPORTED_MODULE_56_moment_timezone__;
distLib.MapContainer = new __WEBPACK_IMPORTED_MODULE_24__objects_mapview_mapview_module_js__["a" /* default */]();
distLib.Textbox = new __WEBPACK_IMPORTED_MODULE_25__objects_textbox_textbox_module_js__["a" /* default */]();
distLib.Slider = new __WEBPACK_IMPORTED_MODULE_26__objects_slider_slider_module_js__["a" /* default */]();
distLib.VideoView = new __WEBPACK_IMPORTED_MODULE_27__objects_videoview_videoview_module_js__["a" /* default */]();
distLib.VideoLibrary = new __WEBPACK_IMPORTED_MODULE_28__objects_videoLibrary_videoLibrary_module_js__["a" /* default */]();
distLib.SnapClinical = new __WEBPACK_IMPORTED_MODULE_29__objects_snapclinical_snapclinical_module_js__["a" /* default */]();
distLib.Clock = new __WEBPACK_IMPORTED_MODULE_33__objects_clock_clock_module_js__["a" /* default */]();
distLib.Dialog = new __WEBPACK_IMPORTED_MODULE_30__objects_dialog_dialog_module_js__["a" /* default */]();
distLib.Bluetooth = new __WEBPACK_IMPORTED_MODULE_31__objects_bluetooth_bluetooth_module_js__["a" /* default */]();
distLib.GridView = new __WEBPACK_IMPORTED_MODULE_32__objects_gridview_gridview_module_js__["a" /* default */]();
distLib.ListView = new __WEBPACK_IMPORTED_MODULE_34__objects_listview_listview_module_js__["a" /* default */]();
distLib.AudioLibrary = new __WEBPACK_IMPORTED_MODULE_37__objects_audioLibrary_audioLibrary_module_js__["a" /* default */]();
distLib.Motion = new __WEBPACK_IMPORTED_MODULE_35__objects_motion_motion_module_js__["a" /* default */]();
distLib.SmartDevices = new __WEBPACK_IMPORTED_MODULE_38__objects_smartdevices_smartdevices_module_js__["a" /* default */]();
distLib.Notification = new __WEBPACK_IMPORTED_MODULE_36__objects_notification_notification_module_js__["a" /* default */]();
distLib.CameraLibrary = new __WEBPACK_IMPORTED_MODULE_39__objects_camera_camera_module_js__["a" /* default */]();
distLib.Camera = new __WEBPACK_IMPORTED_MODULE_40__objects_cameraview_cameraview_module_js__["a" /* default */]();
distLib.Phone = new __WEBPACK_IMPORTED_MODULE_41__objects_phone_phone_module_js__["a" /* default */]();
distLib.WidgetCanvas = new __WEBPACK_IMPORTED_MODULE_42__objects_widgetcanvas_widgetcanvas_module_js__["a" /* default */]();
distLib.System = new __WEBPACK_IMPORTED_MODULE_43__objects_system_system_module_js__["a" /* default */]();
distLib.PageView = new __WEBPACK_IMPORTED_MODULE_44__objects_pageview_pageview_module_js__["a" /* default */]();
distLib.FireBase = new __WEBPACK_IMPORTED_MODULE_45__objects_firebase_firebase_module_js__["a" /* default */]();
distLib.QRCodeScanner = new __WEBPACK_IMPORTED_MODULE_46__objects_qrcodescanner_qrcodescanner_module_js__["a" /* default */]();
distLib.DocuSign = new __WEBPACK_IMPORTED_MODULE_47__objects_docusign_docusign_module_js__["a" /* default */]();
distLib.Device = new __WEBPACK_IMPORTED_MODULE_48__objects_device_device_module_js__["a" /* default */]();
distLib.ListGridCommon = new __WEBPACK_IMPORTED_MODULE_49__objects_list_grid_common_list_grid_common_module_js__["a" /* default */]();
distLib.GoogleFit = new __WEBPACK_IMPORTED_MODULE_50__objects_googlefit_googlefit_module_js__["a" /* default */]();
distLib.DrawViewContainer = new __WEBPACK_IMPORTED_MODULE_51__objects_drawview_drawview_module_js__["a" /* default */]();
distLib.HealthKit = new __WEBPACK_IMPORTED_MODULE_52__objects_healthkit_healthkit_module_js__["a" /* default */]();
distLib.Textarea = new __WEBPACK_IMPORTED_MODULE_53__objects_textarea_textarea_module_js__["a" /* default */]();
distLib.Shape = new __WEBPACK_IMPORTED_MODULE_54__objects_shape_shape_module_js__["a" /* default */]();
distLib.EventListeners = new __WEBPACK_IMPORTED_MODULE_55__objects_eventLibrary_eventlisteners_module_js__["a" /* default */]();

// setting the global variable
com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = distLib;

/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TimeZones {
  getList() {
    return ["Africa/Abidjan\n",
      "Africa/Accra\n",
      "Africa/Addis_Ababa\n",
      "Africa/Algiers\n",
      "Africa/Asmera\n",
      "Africa/Bamako\n",
      "Africa/Bangui\n",
      "Africa/Banjul\n",
      "Africa/Bissau\n",
      "Africa/Blantyre\n",
      "Africa/Brazzaville\n",
      "Africa/Bujumbura\n",
      "Africa/Cairo\n",
      "Africa/Casablanca\n",
      "Africa/Conakry\n",
      "Africa/Dakar\n",
      "Africa/Dar_es_Salaam\n",
      "Africa/Djibouti\n",
      "Africa/El_Aaiun\n",
      "Africa/Freetown\n",
      "Africa/Gaborone\n",
      "Africa/Harare\n",
      "Africa/Johannesburg\n",
      "Africa/Kampala\n",
      "Africa/Khartoum\n",
      "Africa/Kigali\n",
      "Africa/Kinshasa\n",
      "Africa/Lagos\n",
      "Africa/Lagos\n",
      "Africa/Libreville\n",
      "Africa/Lome\n",
      "Africa/Luanda\n",
      "Africa/Lubumbashi\n",
      "Africa/Lusaka\n",
      "Africa/Malabo\n",
      "Africa/Maputo\n",
      "Africa/Maseru\n",
      "Africa/Mbabane\n",
      "Africa/Mogadishu\n",
      "Africa/Monrovia\n",
      "Africa/Nairobi\n",
      "Africa/Ndjamena\n",
      "Africa/Niamey\n",
      "Africa/Nouakchott\n",
      "Africa/Ouagadougou\n",
      "Africa/Porto-Novo\n",
      "Africa/Sao_Tome\n",
      "Africa/Tripoli\n",
      "Africa/Tunis\n",
      "Africa/Windhoek\n",
      "America/Anchorage\n",
      "America/Anguilla\n",
      "America/Antigua\n",
      "America/Araguaina\n",
      "America/Argentina/Buenos_Aires\n",
      "America/Argentina/Catamarca\n",
      "America/Argentina/Cordoba\n",
      "America/Argentina/Jujuy\n",
      "America/Argentina/La_Rioja\n",
      "America/Argentina/Mendoza\n",
      "America/Argentina/Rio_Gallegos\n",
      "America/Argentina/San_Juan\n",
      "America/Argentina/Tucuman\n",
      "America/Argentina/Ushuaia\n",
      "America/Aruba\n",
      "America/Asuncion\n",
      "America/Bahia\n",
      "America/Barbados\n",
      "America/Belem\n",
      "America/Belize\n",
      "America/Boa_Vista\n",
      "America/Bogota\n",
      "America/Campo_Grande\n",
      "America/Cancun\n",
      "America/Caracas\n",
      "America/Cayenne\n",
      "America/Cayman\n",
      "America/Chicago\n",
      "America/Chihuahua\n",
      "America/Costa_Rica\n",
      "America/Cuiaba\n",
      "America/Denver\n",
      "America/Dominica\n",
      "America/Edmonton\n",
      "America/El_Salvador\n",
      "America/Fortaleza\n",
      "America/Godthab\n",
      "America/Grand_Turk\n",
      "America/Grenada\n",
      "America/Guadeloupe\n",
      "America/Guatemala\n",
      "America/Guayaquil\n",
      "America/Guyana\n",
      "America/Halifax\n",
      "America/Havana\n",
      "America/Hermosillo\n",
      "America/Indianapolis\n",
      "America/Jamaica\n",
      "America/La_Paz\n",
      "America/Lima\n",
      "America/Los_Angeles\n",
      "America/Maceio\n",
      "America/Managua\n",
      "America/Manaus\n",
      "America/Martinique\n",
      "America/Mazatlan\n",
      "America/Merida\n",
      "America/Mexico_City\n",
      "America/Miquelon\n",
      "America/Monterrey\n",
      "America/Montevideo\n",
      "America/Montreal\n",
      "America/Montserrat\n",
      "America/Nassau\n",
      "America/New_York\n",
      "America/Noronha\n",
      "America/Panama\n",
      "America/Paramaribo\n",
      "America/Phoenix\n",
      "America/Port-au-Prince\n",
      "America/Porto_Velho\n",
      "America/Port_of_Spain\n",
      "America/Puerto_Rico\n",
      "America/Puerto_Rico\n",
      "America/Rankin_Inlet\n",
      "America/Regina\n",
      "America/Rio_Branco\n",
      "America/Santo_Domingo\n",
      "America/Sao_Paulo\n",
      "America/St_Johns\n",
      "America/St_Kitts\n",
      "America/St_Lucia\n",
      "America/St_Thomas\n",
      "America/St_Vincent\n",
      "America/Tegucigalpa\n",
      "America/Tijuana\n",
      "America/Toronto\n",
      "America/Tortola\n",
      "America/Vancouver\n",
      "America/Virgin\n",
      "America/Whitehorse\n",
      "America/Winnipeg\n",
      "America/Yellowknife\n",
      "Arctic/Longyearbyen\n",
      "Asia/Aden\n",
      "Asia/Almaty\n",
      "Asia/Amman\n",
      "Asia/Anadyr\n",
      "Asia/Aqtau\n",
      "Asia/Aqtobe\n",
      "Asia/Ashgabat\n",
      "Asia/Baghdad\n",
      "Asia/Bahrain\n",
      "Asia/Baku\n",
      "Asia/Bangkok\n",
      "Asia/Beirut\n",
      "Asia/Bishkek\n",
      "Asia/Brunei\n",
      "Asia/Calcutta\n",
      "Asia/Choibalsan\n",
      "Asia/Chongqing\n",
      "Asia/Colombo\n",
      "Asia/Damascus\n",
      "Asia/Dhaka\n",
      "Asia/Dubai\n",
      "Asia/Dushanbe\n",
      "Asia/Gaza\n",
      "Asia/Hong_Kong\n",
      "Asia/Hovd\n",
      "Asia/Irkutsk\n",
      "Asia/Istanbul\n",
      "Asia/Jakarta\n",
      "Asia/Jakarta\n",
      "Asia/Jayapura\n",
      "Asia/Jerusalem\n",
      "Asia/Kabul\n",
      "Asia/Kamchatka\n",
      "Asia/Karachi\n",
      "Asia/Katmandu\n",
      "Asia/Krasnoyarsk\n",
      "Asia/Kuala_Lumpur\n",
      "Asia/Kuwait\n",
      "Asia/Macao\n",
      "Asia/Magadan\n",
      "Asia/Manila\n",
      "Asia/Muscat\n",
      "Asia/Nicosia\n",
      "Asia/Novosibirsk\n",
      "Asia/Omsk\n",
      "Asia/Oral\n",
      "Asia/Phnom_Penh\n",
      "Asia/Phnom_Penh\n",
      "Asia/Pyongyang\n",
      "Asia/Qatar\n",
      "Asia/Qyzylorda\n",
      "Asia/Rangoon\n",
      "Asia/Riyadh\n",
      "Asia/Seoul\n",
      "Asia/Singapore\n",
      "Asia/Taipei\n",
      "Asia/Tashkent\n",
      "Asia/Tbilisi\n",
      "Asia/Tehran\n",
      "Asia/Thimphu\n",
      "Asia/Tokyo\n",
      "Asia/Ujung_Pandang\n",
      "Asia/Ulaanbaatar\n",
      "Asia/Vientiane\n",
      "Asia/Vladivostok\n",
      "Asia/Yakutsk\n",
      "Asia/Yekaterinburg\n",
      "Asia/Yerevan\n",
      "Atlantic/Azores\n",
      "Atlantic/Bermuda\n",
      "Atlantic/Canary\n",
      "Atlantic/Cape_Verde\n",
      "Atlantic/Faeroe\n",
      "Atlantic/Madeira\n",
      "Atlantic/Reykjavik\n",
      "Atlantic/South_Georgia\n",
      "Atlantic/Stanley\n",
      "Atlantic/St_Helena\n",
      "Australia/Canberra\n",
      "Australia/North\n",
      "Australia/NSW\n",
      "Australia/Queensland\n",
      "Australia/South\n",
      "Australia/Tasmania\n",
      "Australia/Victoria\n",
      "Australia/West\n",
      "Chile/Continental\n",
      "Europe/Amsterdam\n",
      "Europe/Andorra\n",
      "Europe/Athens\n",
      "Europe/Belgrade\n",
      "Europe/Berlin\n",
      "Europe/Bratislava\n",
      "Europe/Brussels\n",
      "Europe/Bucharest\n",
      "Europe/Budapest\n",
      "Europe/Chisinau\n",
      "Europe/Copenhagen\n",
      "Europe/Dublin\n",
      "Europe/Gibraltar\n",
      "Europe/Guernsey\n",
      "Europe/Helsinki\n",
      "Europe/Isle_of_Man\n",
      "Europe/Jersey\n",
      "Europe/Kaliningrad\n",
      "Europe/Kiev\n",
      "Europe/Lisbon\n",
      "Europe/Ljubljana\n",
      "Europe/London\n",
      "Europe/Luxembourg\n",
      "Europe/Madrid\n",
      "Europe/Malta\n",
      "Europe/Mariehamn\n",
      "Europe/Minsk\n",
      "Europe/Monaco\n",
      "Europe/Moscow\n",
      "Europe/Oslo\n",
      "Europe/Paris\n",
      "Europe/Podgorica\n",
      "Europe/Prague\n",
      "Europe/Riga\n",
      "Europe/Rome\n",
      "Europe/Samara\n",
      "Europe/San_Marino\n",
      "Europe/Sarajevo\n",
      "Europe/Skopje\n",
      "Europe/Sofia\n",
      "Europe/Stockholm\n",
      "Europe/Tallinn\n",
      "Europe/Tirane\n",
      "Europe/Vaduz\n",
      "Europe/Vatican\n",
      "Europe/Vienna\n",
      "Europe/Vilnius\n",
      "Europe/Warsaw\n",
      "Europe/Zagreb\n",
      "Europe/Zurich\n",
      "Indian/Antananarivo\n",
      "Indian/Chagos\n",
      "Indian/Christmas\n",
      "Indian/Cocos\n",
      "Indian/Comoro\n",
      "Indian/Kerguelen\n",
      "Indian/Mahe\n",
      "Indian/Maldives\n",
      "Indian/Mauritius\n",
      "Indian/Mayotte\n",
      "Indian/Reunion\n",
      "Pacific/Auckland\n",
      "Pacific/Chatham\n",
      "Pacific/Efate\n",
      "Pacific/Enderbury\n",
      "Pacific/Fakaofo\n",
      "Pacific/Fiji\n",
      "Pacific/Fiji\n",
      "Pacific/Funafuti\n",
      "Pacific/Galapagos\n",
      "Pacific/Guadalcanal\n",
      "Pacific/Guam\n",
      "Pacific/Honolulu\n",
      "Pacific/Kiritimati\n",
      "Pacific/Kosrae\n",
      "Pacific/Nauru\n",
      "Pacific/Niue\n",
      "Pacific/Norfolk\n",
      "Pacific/Noumea\n",
      "Pacific/Palau\n",
      "Pacific/Pitcairn\n",
      "Pacific/Ponape\n",
      "Pacific/Port_Moresby\n",
      "Pacific/Rarotonga\n",
      "Pacific/Saipan\n",
      "Pacific/Samoa\n",
      "Pacific/Tahiti\n",
      "Pacific/Tarawa\n",
      "Pacific/Tongatapu\n",
      "Pacific/Truk\n",
      "Pacific/Wallis\n",
      "Pacific/Yap\n",
      "US/Samoa"];
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TimeZones;


/***/ })
/******/ ]);