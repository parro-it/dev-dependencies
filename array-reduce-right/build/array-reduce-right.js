(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.reduceRight = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * array-reduce-right
 *   Array#reduceRight ponyfill for older browsers
 *   (Ponyfill: A polyfill that doesn't overwrite the native method)
 * 
 * https://github.com/twada/array-reduce-right
 *
 * Copyright (c) 2015 Takuto Wada
 * Licensed under the MIT license.
 *   http://twada.mit-license.org/
 */
'use strict';

var slice = Array.prototype.slice;

module.exports = function reduceRight (ary, callback /*, initialValue*/) {
    if (ary.reduceRight) {
        return ary.reduceRight.apply(ary, slice.apply(arguments).slice(1));
    }
    if ('function' !== typeof callback) {
        throw new TypeError(callback + ' is not a function');
    }
    var t = Object(ary), len = t.length >>> 0, k = len - 1, value;
    if (arguments.length >= 3) {
        value = arguments[2];
    } else {
        while (k >= 0 && !(k in t)) {
            k--;
        }
        if (k < 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        value = t[k--];
    }
    for (; k >= 0; k--) {
        if (k in t) {
            value = callback(value, t[k], k, t);
        }
    }
    return value;
};

},{}]},{},[1])(1)
});

