'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _trim2 = require('lodash/trim');

var _trim3 = _interopRequireDefault(_trim2);

var _sliceAnsi = require('slice-ansi');

var _sliceAnsi2 = _interopRequireDefault(_sliceAnsi);

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates an array of strings split into groups the length of size.
 * This function works with strings that contain ASCII characters.
 *
 * wrapText is different from would-be "chunk" implementation
 * in that whitespace characters that occur on a chunk size limit are trimmed.
 *
 * @param {string} subject
 * @param {number} size
 * @returns {Array}
 */

exports.default = function (subject, size) {
    var chunks = undefined,
        subjectSlice = undefined;

    subjectSlice = subject;

    chunks = [];

    do {
        chunks.push((0, _sliceAnsi2.default)(subjectSlice, 0, size));

        subjectSlice = (0, _trim3.default)((0, _sliceAnsi2.default)(subjectSlice, size));
    } while ((0, _stringWidth2.default)(subjectSlice));

    return chunks;
};

module.exports = exports['default'];
//# sourceMappingURL=wrapString.js.map
