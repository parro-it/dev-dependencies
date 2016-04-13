'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('return an array of modules', function (t) {
  return t.pass(Array.isArray(_2.default));
});
(0, _ava2.default)('define new electron facade', function (t) {
  return t.pass(_2.default.indexOf('electron') !== -1);
});
(0, _ava2.default)('define deprecated exported modules', function (t) {
  return t.pass(_2.default.indexOf('app') !== -1);
});
(0, _ava2.default)('bring your own node builtins', function (t) {
  return t.pass(_2.default.indexOf('fs') === -1);
});
//# sourceMappingURL=node_modules/.cache/ava/f63a5a1864f6655fcdccd7b04d3aaa3d.js.map