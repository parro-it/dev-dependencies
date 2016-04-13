'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('return an array of modules', function (t) {
	var result = (0, _2.default)();
	t.pass(Array.isArray(result));
});

(0, _ava2.default)('define new electron facade', function (t) {
	var result = (0, _2.default)();
	t.pass(result.indexOf('electron') !== -1);
});

(0, _ava2.default)('define deprecated exported modules', function (t) {
	var result = (0, _2.default)();
	t.pass(result.indexOf('app') !== -1);
});

(0, _ava2.default)('bring your own node builtins', function (t) {
	var result = (0, _2.default)();
	t.pass(result.indexOf('fs') === -1);
});
//# sourceMappingURL=node_modules/.cache/ava/63e004820b2b885402c9f7880ec47d5b.js.map