'use strict';

var defaultProps = require('./ast-properties');
var objectKeys = Object.keys || require('object-keys');
var assign = require('object-assign');

module.exports = function createWhitelist (options) {
    var opts = assign({}, options);
    var typeName, i, len;
    var keys = objectKeys(defaultProps);
    var result = {};
    for (i = 0, len = keys.length; i < len; i += 1) {
        typeName = keys[i];
        result[typeName] = defaultProps[typeName].concat(opts.extra);
    }
    return result;
};
