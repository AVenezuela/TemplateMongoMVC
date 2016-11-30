//Extensões js de string
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
}
String.prototype.ltrim = function () {
    return this.replace(/^\s+/, "");
}
String.prototype.rtrim = function () {
    return this.replace(/\s+$/, "");
}
String.prototype.lpad = function (padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}
String.prototype.rpad = function (padString, length) {
    var str = this;
    while (str.length < length)
        str = str + padString;
    return str;
}
//Fim Extensões js de string

/*
centraliza o elemento na tela
como usar:
$(elemento).center();
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) { define(['jquery'], factory); }
    else { factory(window.jQuery); }
}
(function ($) {
    $.fn.numeric = function (config, callback, hasOnChange) {
        if (typeof config === "boolean") { config = { decimal: config, negative: true, decimalPlaces: -1} } config = config || {};
        if (typeof config.negative == "undefined") { config.negative = true }
        var decimal = config.decimal === false ? "" : config.decimal || ".";
        var negative = config.negative === true ? true : false;
        var decimalPlaces = typeof config.decimalPlaces == "undefined" ? -1 : config.decimalPlaces; callback = typeof callback == "function" ? callback : function () { };
        hasOnChange = (hasOnChange);
        return this.data("numeric.hasonchange", hasOnChange).data("numeric.decimal", decimal).data("numeric.negative", negative).data("numeric.callback", callback).data("numeric.decimalPlaces", decimalPlaces).keypress($.fn.numeric.keypress).keyup($.fn.numeric.keyup).blur($.fn.numeric.blur)
    };
    $.fn.numeric.keypress = function (e) {
        var decimal = $.data(this, "numeric.decimal");
        var negative = $.data(this, "numeric.negative");
        var decimalPlaces = $.data(this, "numeric.decimalPlaces");
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 && this.nodeName.toLowerCase() == "input") { return true }
        else if (key == 13) { return false } var allow = false;
        if (e.ctrlKey && key == 97 || e.ctrlKey && key == 65) { return true }
        if (e.ctrlKey && key == 120 || e.ctrlKey && key == 88) { return true }
        if (e.ctrlKey && key == 99 || e.ctrlKey && key == 67) { return true }
        if (e.ctrlKey && key == 122 || e.ctrlKey && key == 90) { return true }
        if (e.ctrlKey && key == 118 || e.ctrlKey && key == 86 || e.shiftKey && key == 45) { return true }
        if (key < 48 || key > 57) {
            var value = $(this).val();
            if ($.inArray("-", value.split("")) !== 0 && negative && key == 45 && (value.length === 0 || parseInt($.fn.getSelectionStart(this), 10) === 0)) { return true }
            if (decimal && key == decimal.charCodeAt(0) && $.inArray(decimal, value.split("")) != -1) { allow = false }
            if (key != 8 && key != 9 && key != 13 && key != 35 && key != 36 && key != 37 && key != 39 && key != 46) { allow = false } else {
                if (typeof e.charCode != "undefined") {
                    if (e.keyCode == e.which && e.which !== 0) {
                        allow = true;
                        if (e.which == 46) { allow = false }
                    }
                    else
                        if (e.keyCode !== 0 && e.charCode === 0 && e.which === 0) { allow = true }
                }
            }
            if (decimal && key == decimal.charCodeAt(0)) {
                if ($.inArray(decimal, value.split("")) == -1) { allow = true } else { allow = false }
            }
        } else {
            allow = true;
            if (decimal && decimalPlaces > 0) {
                var dot = $.inArray(decimal, $(this).val().split(""));
                if (dot >= 0 && $(this).val().length > dot + decimalPlaces) { allow = false }
            }
        } return allow
    }; $.fn.numeric.keyup = function (e) {
        var val = $(this).val();
        if (val && val.length > 0) {
            var carat = $.fn.getSelectionStart(this); var selectionEnd = $.fn.getSelectionEnd(this); var decimal = $.data(this, "numeric.decimal"); var negative = $.data(this, "numeric.negative"); var decimalPlaces = $.data(this, "numeric.decimalPlaces");
            if (decimal !== "" && decimal !== null) {
                var dot = $.inArray(decimal, val.split("")); if (dot === 0) { this.value = "0" + val; carat++; selectionEnd++ }
                if (dot == 1 && val.charAt(0) == "-") { this.value = "-0" + val.substring(1); carat++; selectionEnd++ } val = this.value
            }
            var validChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "-", decimal]; var length = val.length;
            for (var i = length - 1; i >= 0; i--) {
                var ch = val.charAt(i);
                if (i !== 0 && ch == "-") { val = val.substring(0, i) + val.substring(i + 1) }
                else
                    if (i === 0 && !negative && ch == "-") { val = val.substring(1) }
                var validChar = false; for (var j = 0; j < validChars.length; j++) {
                    if (ch == validChars[j]) { validChar = true; break }
                }
                if (!validChar || ch == " ") { val = val.substring(0, i) + val.substring(i + 1) }
            }
            var firstDecimal = $.inArray(decimal, val.split(""));
            if (firstDecimal > 0) {
                for (var k = length - 1; k > firstDecimal; k--) {
                    var chch = val.charAt(k);
                    if (chch == decimal) { val = val.substring(0, k) + val.substring(k + 1) }
                }
            }
            if (decimal && decimalPlaces > 0) {
                var dot = $.inArray(decimal, val.split(""));
                if (dot >= 0) { val = val.substring(0, dot + decimalPlaces + 1); selectionEnd = Math.min(val.length, selectionEnd) }
            }
            this.value = val; $.fn.setSelection(this, [carat, selectionEnd])
        }
    };
    $.fn.numeric.blur = function () {
        var decimal = $.data(this, "numeric.decimal");
        var callback = $.data(this, "numeric.callback");
        var negative = $.data(this, "numeric.negative");
        var val = this.value;
        var hasOnChange = $.data(this, "numeric.hasonchange")
        if (val !== "") {
            var re = new RegExp("^" + (negative ? "-?" : "") + "\\d+$|^" + (negative ? "-?" : "") + "\\d*" + decimal + "\\d+$");
            if (!re.exec(val)) { callback.apply(this) }
        }
        if (hasOnChange) {            
            $(this).change();
        }
    };
    $.fn.removeNumeric = function () {
        return this.data("numeric.decimal", null).data("numeric.negative", null).data("numeric.callback", null).data("numeric.decimalPlaces", null)
.unbind("keypress", $.fn.numeric.keypress).unbind("keyup", $.fn.numeric.keyup).unbind("blur", $.fn.numeric.blur)
    };
    $.fn.getSelectionStart = function (o) {
        if (o.type === "number") { return undefined }
        else
            if (o.createTextRange && document.selection) {
                var r = document.selection.createRange().duplicate(); r.moveEnd("character", o.value.length);
                if (r.text == "") return o.value.length; return Math.max(0, o.value.lastIndexOf(r.text))
            }
            else { try { return o.selectionStart } catch (e) { return 0 } }
    };
    $.fn.getSelectionEnd = function (o) {
        if (o.type === "number") { return undefined }
        else
            if (o.createTextRange && document.selection) {
                var r = document.selection.createRange().duplicate(); r.moveStart("character", -o.value.length); return r.text.length
            }
            else
                return o.selectionEnd
        }; $.fn.setSelection = function (o, p) {
            if (typeof p == "number") { p = [p, p] }
            if (p && p.constructor == Array && p.length == 2) {
                if (o.type === "number") { o.focus() }
                else
                    if (o.createTextRange) {
                        var r = o.createTextRange(); r.collapse(true);
                        r.moveStart("character", p[0]); r.moveEnd("character", p[1] - p[0]); r.select()
                    }
                    else {
                        o.focus(); try {
                            if (o.setSelectionRange) { o.setSelectionRange(p[0], p[1]) }
                        } catch (e) { }
                    }
            }
        }
    }));

jQuery.fn.center = function () {
    //this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
                                                $(window).scrollLeft()) + "px");
    return this;
}

jQuery.fn.blink = function (times, speed, element) {
    element = element || this;

    if ((times > 0) || (times < 0)) {
        if (this.hasClass("blink"))
            this.removeClass("blink");
        else
            this.addClass("blink");
    }

    clearTimeout(function () {
        this.blink(times, speed, this);
    });

    if ((times > 0) || (times < 0)) {
        setTimeout(function () {
            element.blink(times, speed, element);
        }, speed);
        times -= .5;
    }
}

/**
 * Load a url into a element
 */
jQuery.fn.loadAndAppend = function (url, params, callback) {
    var selector, type, response,
		self = this,
		off = url.indexOf(" ");

    if (off > -1) {
        selector = stripAndCollapse(url.slice(off));
        url = url.slice(0, off);
    }

    // If it's a function
    if (jQuery.isFunction(params)) {

        // We assume that it's the callback
        callback = params;
        params = undefined;

        // Otherwise, build a param string
    } else if (params && typeof params === "object") {
        type = "POST";
    }

    // If we have elements to modify, make the request
    if (self.length > 0) {
        jQuery.ajax({
            url: url,

            // If "type" variable is undefined, then "GET" method will be used.
            // Make value of this field explicit since
            // user can override it through ajaxSetup method
            type: type || "GET",
            dataType: "html",
            data: params
        }).done(function (responseText) {

            // Save response for use in complete callback
            response = arguments;

            self.append(selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

				// Otherwise use the full result
				responseText);

            // If the request succeeds, this function gets "data", "status", "jqXHR"
            // but they are ignored because response was set above.
            // If it fails, this function gets "jqXHR", "status", "error"
        }).always(callback && function (jqXHR, status) {
            self.each(function () {
                callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
            });
        });
    }

    return this;
};

/*!
  SerializeJSON jQuery plugin.
  https://github.com/marioizquierdo/jquery.serializeJSON
  version 2.7.2 (Dec, 2015)
  Copyright (c) 2012, 2015 Mario Izquierdo
  Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
  and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) { // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') { // Node/CommonJS
        var jQuery = require('jquery');
        module.exports = factory(jQuery);
    } else { // Browser globals (zepto supported)
        factory(window.jQuery || window.Zepto || window.$); // Zepto supported on browsers as well
    }

}(function ($) {
    "use strict";

    // jQuery('form').serializeJSON()
    $.fn.serializeJSON = function (options) {
        var f, $form, opts, formAsArray, serializedObject, name, value, _obj, nameWithNoType, type, keys;
        f = $.serializeJSON;
        $form = this; // NOTE: the set of matched elements is most likely a form, but it could also be a group of inputs
        opts = f.setupOpts(options); // calculate values for options {parseNumbers, parseBoolens, parseNulls, ...} with defaults

        // Use native `serializeArray` function to get an array of {name, value} objects.
        formAsArray = $form.serializeArray();
        f.readCheckboxUncheckedValues(formAsArray, opts, $form); // add objects to the array from unchecked checkboxes if needed

        // Convert the formAsArray into a serializedObject with nested keys
        serializedObject = {};
        $.each(formAsArray, function (i, obj) {
            name = obj.name; // original input name
            value = obj.value; // input value
            _obj = f.extractTypeAndNameWithNoType(name);
            nameWithNoType = _obj.nameWithNoType; // input name with no type (i.e. "foo:string" => "foo")
            type = _obj.type; // type defined from the input name in :type colon notation
            if (!type) type = f.tryToFindTypeFromDataAttr(name, $form); // type defined in the data-value-type attr
            f.validateType(name, type, opts); // make sure that the type is one of the valid types if defined

            if (type !== 'skip') { // ignore elements with type 'skip'                
                keys = f.splitInputNameIntoKeysArray(nameWithNoType);
                if (opts.containsInName == "" || keys[0].indexOf(opts.containsInName) > -1) {
                    value = f.parseValue(value, name, type, opts); // convert to string, number, boolean, null or customType
                    f.deepSet(serializedObject, keys, value, opts);
                }
            }
        });
        return serializedObject;
    };

    // Use $.serializeJSON as namespace for the auxiliar functions
    // and to define defaults
    $.serializeJSON = {

        defaultOptions: {
            checkboxUncheckedValue: undefined, // to include that value for unchecked checkboxes (instead of ignoring them)

            parseNumbers: false, // convert values like "1", "-2.33" to 1, -2.33
            parseBooleans: false, // convert "true", "false" to true, false
            parseNulls: false, // convert "null" to null
            parseAll: false, // all of the above
            parseWithFunction: null, // to use custom parser, a function like: function(val){ return parsed_val; }

            customTypes: {}, // override defaultTypes
            defaultTypes: {
                "string": function (str) { return String(str); },
                "number": function (str) { return Number(str); },
                "boolean": function (str) { var falses = ["false", "null", "undefined", "", "0"]; return falses.indexOf(str) === -1; },
                "null": function (str) { var falses = ["false", "null", "undefined", "", "0"]; return falses.indexOf(str) === -1 ? str : null; },
                "array": function (str) { return JSON.parse(str); },
                "object": function (str) { return JSON.parse(str); },
                "auto": function (str) { return $.serializeJSON.parseValue(str, null, null, { parseNumbers: true, parseBooleans: true, parseNulls: true }); }, // try again with something like "parseAll"
                "skip": null // skip is a special type that makes it easy to ignore elements
            },

            useIntKeysAsArrayIndex: false, // name="foo[2]" value="v" => {foo: [null, null, "v"]}, instead of {foo: ["2": "v"]}

            containsInName: "" //get only objects that contains this string on name
        },

        // Merge option defaults into the options
        setupOpts: function (options) {
            var opt, validOpts, defaultOptions, optWithDefault, parseAll, f;
            f = $.serializeJSON;

            if (options == null) { options = {}; }   // options ||= {}
            defaultOptions = f.defaultOptions || {}; // defaultOptions

            // Make sure that the user didn't misspell an option
            validOpts = ['containsInName', 'checkboxUncheckedValue', 'parseNumbers', 'parseBooleans', 'parseNulls', 'parseAll', 'parseWithFunction', 'customTypes', 'defaultTypes', 'useIntKeysAsArrayIndex']; // re-define because the user may override the defaultOptions
            for (opt in options) {
                if (validOpts.indexOf(opt) === -1) {
                    throw new Error("serializeJSON ERROR: invalid option '" + opt + "'. Please use one of " + validOpts.join(', '));
                }
            }

            // Helper to get the default value for this option if none is specified by the user
            optWithDefault = function (key) { return (options[key] !== false) && (options[key] !== '') && (options[key] || defaultOptions[key]); };

            // Return computed options (opts to be used in the rest of the script)
            parseAll = optWithDefault('parseAll');
            return {
                checkboxUncheckedValue: optWithDefault('checkboxUncheckedValue'),

                parseNumbers: parseAll || optWithDefault('parseNumbers'),
                parseBooleans: parseAll || optWithDefault('parseBooleans'),
                parseNulls: parseAll || optWithDefault('parseNulls'),
                parseWithFunction: optWithDefault('parseWithFunction'),

                typeFunctions: $.extend({}, optWithDefault('defaultTypes'), optWithDefault('customTypes')),

                useIntKeysAsArrayIndex: optWithDefault('useIntKeysAsArrayIndex'),
                containsInName: optWithDefault('containsInName')
            };
        },

        // Given a string, apply the type or the relevant "parse" options, to return the parsed value
        parseValue: function (valStr, inputName, type, opts) {
            var f, parsedVal;
            f = $.serializeJSON;
            parsedVal = valStr; // if no parsing is needed, the returned value will be the same

            if (opts.typeFunctions && type && opts.typeFunctions[type]) { // use a type if available
                parsedVal = opts.typeFunctions[type](valStr);
            } else if (opts.parseNumbers && f.isNumeric(valStr)) { // auto: number
                parsedVal = Number(valStr);
            } else if (opts.parseBooleans && (valStr === "true" || valStr === "false")) { // auto: boolean
                parsedVal = (valStr === "true");
            } else if (opts.parseNulls && valStr == "null") { // auto: null
                parsedVal = null;
            }
            if (opts.parseWithFunction && !type) { // custom parse function (apply after previous parsing options, but not if there's a specific type)
                parsedVal = opts.parseWithFunction(parsedVal, inputName);
            }

            return parsedVal;
        },

        isObject: function (obj) { return obj === Object(obj); }, // is it an Object?
        isUndefined: function (obj) { return obj === void 0; }, // safe check for undefined values
        isValidArrayIndex: function (val) { return /^[0-9]+$/.test(String(val)); }, // 1,2,3,4 ... are valid array indexes
        isNumeric: function (obj) { return obj - parseFloat(obj) >= 0; }, // taken from jQuery.isNumeric implementation. Not using jQuery.isNumeric to support old jQuery and Zepto versions

        optionKeys: function (obj) { if (Object.keys) { return Object.keys(obj); } else { var key, keys = []; for (key in obj) { keys.push(key); } return keys; } }, // polyfill Object.keys to get option keys in IE<9


        // Fill the formAsArray object with values for the unchecked checkbox inputs,
        // using the same format as the jquery.serializeArray function.
        // The value of the unchecked values is determined from the opts.checkboxUncheckedValue
        // and/or the data-unchecked-value attribute of the inputs.
        readCheckboxUncheckedValues: function (formAsArray, opts, $form) {
            var selector, $uncheckedCheckboxes, $el, dataUncheckedValue, f;
            if (opts == null) { opts = {}; }
            f = $.serializeJSON;

            selector = 'input[type=checkbox][name]:not([disabled])';
            $uncheckedCheckboxes = $form.find(selector).add($form.filter(selector));
            $uncheckedCheckboxes.each(function (i, el) {
                $el = $(el);
                dataUncheckedValue = $el.attr('data-unchecked-value');
                if (dataUncheckedValue) { // data-unchecked-value has precedence over option opts.checkboxUncheckedValue
                    formAsArray.push({ name: el.name, value: dataUncheckedValue });
                } else {
                    if (!f.isUndefined(opts.checkboxUncheckedValue)) {
                        formAsArray.push({ name: el.name, value: $el[0].checked });
                    }
                }
            });
        },

        // Returns and object with properties {name_without_type, type} from a given name.
        // The type is null if none specified. Example:
        //   "foo"           =>  {nameWithNoType: "foo",      type:  null}
        //   "foo:boolean"   =>  {nameWithNoType: "foo",      type: "boolean"}
        //   "foo[bar]:null" =>  {nameWithNoType: "foo[bar]", type: "null"}
        extractTypeAndNameWithNoType: function (name) {
            var match;
            if (match = name.match(/(.*):([^:]+)$/)) {
                return { nameWithNoType: match[1], type: match[2] };
            } else {
                return { nameWithNoType: name, type: null };
            }
        },

        // Find an input in the $form with the same name,
        // and get the data-value-type attribute.
        // Returns nil if none found. Returns the first data-value-type found if many inputs have the same name.
        tryToFindTypeFromDataAttr: function (name, $form) {
            var escapedName, selector, $input, typeFromDataAttr;
            escapedName = name.replace(/(:|\.|\[|\]|\s)/g, '\\$1'); // every non-standard character need to be escaped by \\
            selector = '[name="' + escapedName + '"]';
            $input = $form.find(selector).add($form.filter(selector));
            typeFromDataAttr = $input.attr('data-value-type'); // NOTE: this returns only the first $input element if multiple are matched with the same name (i.e. an "array[]"). So, arrays with different element types specified through the data-value-type attr is not supported.
            return typeFromDataAttr || null;
        },

        // Raise an error if the type is not recognized.
        validateType: function (name, type, opts) {
            var validTypes, f;
            f = $.serializeJSON;
            validTypes = f.optionKeys(opts ? opts.typeFunctions : f.defaultOptions.defaultTypes);
            if (!type || validTypes.indexOf(type) !== -1) {
                return true;
            } else {
                throw new Error("serializeJSON ERROR: Invalid type " + type + " found in input name '" + name + "', please use one of " + validTypes.join(', '));
            }
        },


        // Split the input name in programatically readable keys.
        // Examples:
        // "foo"              => ['foo']
        // "[foo]"            => ['foo']
        // "foo[inn][bar]"    => ['foo', 'inn', 'bar']
        // "foo[inn[bar]]"    => ['foo', 'inn', 'bar']
        // "foo[inn][arr][0]" => ['foo', 'inn', 'arr', '0']
        // "arr[][val]"       => ['arr', '', 'val']
        splitInputNameIntoKeysArray: function (nameWithNoType) {
            var keys, f;
            f = $.serializeJSON;
            keys = nameWithNoType.split('['); // split string into array
            keys = $.map(keys, function (key) { return key.replace(/\]/g, ''); }); // remove closing brackets
            if (keys[0] === '') { keys.shift(); } // ensure no opening bracket ("[foo][inn]" should be same as "foo[inn]")
            return keys;
        },

        // Set a value in an object or array, using multiple keys to set in a nested object or array:
        //
        // deepSet(obj, ['foo'], v)               // obj['foo'] = v
        // deepSet(obj, ['foo', 'inn'], v)        // obj['foo']['inn'] = v // Create the inner obj['foo'] object, if needed
        // deepSet(obj, ['foo', 'inn', '123'], v) // obj['foo']['arr']['123'] = v //
        //
        // deepSet(obj, ['0'], v)                                   // obj['0'] = v
        // deepSet(arr, ['0'], v, {useIntKeysAsArrayIndex: true})   // arr[0] = v
        // deepSet(arr, [''], v)                                    // arr.push(v)
        // deepSet(obj, ['arr', ''], v)                             // obj['arr'].push(v)
        //
        // arr = [];
        // deepSet(arr, ['', v]          // arr => [v]
        // deepSet(arr, ['', 'foo'], v)  // arr => [v, {foo: v}]
        // deepSet(arr, ['', 'bar'], v)  // arr => [v, {foo: v, bar: v}]
        // deepSet(arr, ['', 'bar'], v)  // arr => [v, {foo: v, bar: v}, {bar: v}]
        //
        deepSet: function (o, keys, value, opts) {
            var key, nextKey, tail, lastIdx, lastVal, f;
            if (opts == null) { opts = {}; }
            f = $.serializeJSON;
            if (f.isUndefined(o)) { throw new Error("ArgumentError: param 'o' expected to be an object or array, found undefined"); }
            if (!keys || keys.length === 0) { throw new Error("ArgumentError: param 'keys' expected to be an array with least one element"); }

            key = keys[0];

            // Only one key, then it's not a deepSet, just assign the value.
            if (keys.length === 1) {
                if (key === '') {
                    o.push(value); // '' is used to push values into the array (assume o is an array)
                } else {
                    o[key] = value; // other keys can be used as object keys or array indexes
                }

                // With more keys is a deepSet. Apply recursively.
            } else {
                nextKey = keys[1];

                // '' is used to push values into the array,
                // with nextKey, set the value into the same object, in object[nextKey].
                // Covers the case of ['', 'foo'] and ['', 'var'] to push the object {foo, var}, and the case of nested arrays.
                if (key === '') {
                    lastIdx = o.length - 1; // asume o is array
                    lastVal = o[lastIdx];
                    if (f.isObject(lastVal) && (f.isUndefined(lastVal[nextKey]) || keys.length > 2)) { // if nextKey is not present in the last object element, or there are more keys to deep set
                        key = lastIdx; // then set the new value in the same object element
                    } else {
                        key = lastIdx + 1; // otherwise, point to set the next index in the array
                    }
                }

                // '' is used to push values into the array "array[]"
                if (nextKey === '') {
                    if (f.isUndefined(o[key]) || !$.isArray(o[key])) {
                        o[key] = []; // define (or override) as array to push values
                    }
                } else {
                    if (opts.useIntKeysAsArrayIndex && f.isValidArrayIndex(nextKey)) { // if 1, 2, 3 ... then use an array, where nextKey is the index
                        if (f.isUndefined(o[key]) || !$.isArray(o[key])) {
                            o[key] = []; // define (or override) as array, to insert values using int keys as array indexes
                        }
                    } else { // for anything else, use an object, where nextKey is going to be the attribute name
                        if (f.isUndefined(o[key]) || !f.isObject(o[key])) {
                            o[key] = {}; // define (or override) as object, to set nested properties
                        }
                    }
                }

                // Recursively set the inner object
                tail = keys.slice(1);
                f.deepSet(o[key], tail, value, opts);
            }
        }

    };

}));