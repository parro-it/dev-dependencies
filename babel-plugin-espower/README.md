babel-plugin-espower
================================

Babel plugin for power-assert.

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Dependency Status][depstat-image]][depstat-url]
[![License][license-image]][license-url]


DESCRIPTION
---------------------------------------

`babel-plugin-espower` is a [Babel](https://babeljs.io/) plugin for [power-assert](https://github.com/power-assert-js/power-assert).

`power-assert` provides descriptive assertion messages for your tests, like this.

```
  1) ES6 demo Destructuring and TemplateLiteral:

      AssertionError:   # test/demo_test.js:7

  assert(`${ alice.name } and ${ bob.name }` === `bob and alice`)
         |   |     |             |   |       |   |
         |   |     |             |   |       |   "bob and alice"
         |   |     |             |   "bob"   false
         |   |     "alice"       Object{name:"bob"}
         |   Object{name:"alice"}
         "alice and bob"

  --- [string] `bob and alice`
  +++ [string] `${ alice.name } and ${ bob.name }`
  @@ -1,13 +1,13 @@
  -bob and alice
  +alice and bob
```

Pull-requests, issue reports and patches are always welcomed. See [power-assert](https://github.com/power-assert-js/power-assert) project for more documentation.


INSTALL
---------------------------------------

```
$ npm install --save-dev babel-plugin-espower
```


CAUTION
---------------------------------------

Babel6 is incompatible with Babel5. For Babel 5 or lower, you need to use the 1.x release of babel-plugin-espower.

```
$ npm install --save-dev babel-plugin-espower@1.1.0
```


HOW TO USE
---------------------------------------


### via [.babelrc](https://babeljs.io/docs/usage/babelrc/)

```javascript
{
  "presets": [
    ...
  ],
  "plugins": [
    "babel-plugin-espower"
  ]
}
```

```
$ babel /path/to/test/some_test.js > /path/to/build/some_test.js
```

For example, with `babel-register` module and `.babelrc` above, you can run mocha without code generation steps.

```
$ $(npm bin)/mocha --require babel-register test/some_test.js
```


### via [Babel API](https://babeljs.io/docs/usage/api/)

```javascript
var babel = require('babel-core');
var jsCode = fs.readFileSync('/path/to/test/some_test.js');
var transformed = babel.transform(jsCode, {
    presets: [...],
    plugins: ['babel-plugin-espower']
});
console.log(transformed.code);
```


### via [Babel Require Hook](https://babeljs.io/docs/usage/require/)

```javascript
require('babel-register')({
    presets: [...],
    plugins: ['babel-plugin-espower']
});
```

For example, with `babel_hook.js` above, you can run mocha without code generation steps.

```
$ $(npm bin)/mocha --require ./babel_hook /path/to/test/demo_test.js
```


### with [babelify](https://github.com/babel/babelify)

```javascript
var fs = require('fs');
var browserify = require('browserify');
var babelify = require('babelify');
var glob = require('glob'),
browserify({ entries: glob.sync('./test/*_test.js'), debug: true })
  .transform(babelify.configure({
      presets: [...],
      plugins: ['babel-plugin-espower']
  }))
  .bundle()
  .on('error', function (err) { console.log('Error : ' + err.message); })
  .pipe(fs.createWriteStream('all_test.js'));
```

```
$ $(npm bin)/browserify -d -e ./test/*_test.js -t [ babelify --presets ... --plugins babel-plugin-espower ]
```


### with [babelify](https://github.com/babel/babelify) and [gulp](http://gulpjs.com/)

```javascript
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var glob = require('glob'),
gulp.task('build_test', function() {
    var files = glob.sync('./test/*_test.js');
    var b = browserify({entries: files, debug: true});
    b.transform(babelify.configure({
        presets: [...],
        plugins: ['babel-plugin-espower']
    }));
    return b.bundle()
        .pipe(source('all_test.js'))
        .pipe(gulp.dest('./build'));
});
```


### with [babelify](https://github.com/babel/babelify) and [Karma](https://karma-runner.github.io)

```javascript
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'browserify'],
    files: [
      "test/**/*.js"
    ],
    preprocessors: {
      "test/**/*.js": "browserify"
    },
    browserify: {
      debug: true,
      transform: [
        [
          'babelify', {
            presets: [...],
            plugins: ['babel-plugin-espower']
          }
        ]
      ]
    },
    // ...
```


EXAMPLE
---------------------------------------


For given test file `test/demo_test.js` below,

```javascript
import assert from 'power-assert';

describe('ES6 demo', () => {

    it('Destructuring and TemplateLiteral', () => {
        let [alice, bob] = [ { name: 'alice' }, { name: 'bob' } ];
        assert(`${alice.name} and ${bob.name}` === `bob and alice`);
    });

    it('ArrowFunctionExpression and SpreadElement', () => {
        let seven = 7, ary = [4, 5];
        assert(seven === ((v, i) => v + i)(...[...ary]));
    });

    it('Enhanced Object Literals', () => {
        let name = 'bobby';
        assert.deepEqual({
            name,
            [ `${name}'s greet` ]: `Hello, I'm ${name}`
        }, null);
    });

});
```

prepare `babel_hook.js` to transform tests.

```javascript
{
  "presets": [
    ...
  ],
  "plugins": [
    "babel-plugin-espower"
  ]
}
```

Run `mocha` with `--require babel-register` option. You will see the power-assert output appears.

```
$ $(npm bin)/mocha --require babel-register test/demo_test.js

  ES6 demo
    1) Destructuring and TemplateLiteral
    2) ArrowFunctionExpression and SpreadElement
    3) Enhanced Object Literals


  0 passing
  3 failing

  1) ES6 demo Destructuring and TemplateLiteral:

      AssertionError:   # test/demo_test.js:7

  assert(`${ alice.name } and ${ bob.name }` === `bob and alice`)
         |   |     |             |   |       |   |
         |   |     |             |   |       |   "bob and alice"
         |   |     |             |   "bob"   false
         |   |     "alice"       Object{name:"bob"}
         |   Object{name:"alice"}
         "alice and bob"

  --- [string] `bob and alice`
  +++ [string] `${ alice.name } and ${ bob.name }`
  @@ -1,13 +1,13 @@
  -bob and alice
  +alice and bob

      at Context.<anonymous> (test/demo_test.js:19:28)

  2) ES6 demo ArrowFunctionExpression and SpreadElement:

      AssertionError:   # test/demo_test.js:12

  assert(seven === ((v, i) => v + i)(...[...ary]))
         |     |   |                    |   |
         |     |   |                    |   [4,5]
         |     |   9                    [4,5]
         7     false

  [number] ((v, i) => v + i)(...[...ary])
  => 9
  [number] seven
  => 7

      at Context.<anonymous> (test/demo_test.js:29:28)

  3) ES6 demo Enhanced Object Literals:
     AssertionError:   # test/demo_test.js:17

  assert.deepEqual({name,[`${ name }'s greet`]: `Hello, I'm ${ name }`}, null)
                   |      |   |                 |              |
                   |      |   |                 |              "bobby"
                   |      |   "bobby"           "Hello, I'm bobby"
                   |      "bobby's greet"
                   Object{name:"bobby","bobby's greet":"Hello, I'm bobby"}

      at Context.<anonymous> (test/demo_test.js:40:29)
```


CUSTOMIZE
---------------------------------------

### var plugin = createEspowerPlugin(babel, [options])

You can customize assertion patterns via [Babel API](https://babeljs.io/docs/usage/api/),

```javascript
var babel = require('babel-core');
var createEspowerPlugin = require('babel-plugin-espower/create');
var jsCode = fs.readFileSync('/path/to/test/some_test.js');
var transformed = babel.transform(jsCode, {
    presets: [...],
    plugins: [
        createEspowerPlugin(babel, {
            patterns: [
                'assert.isNull(object, [message])',
                'assert.same(actual, expected, [message])',
                'assert.near(actual, expected, delta, [message])'
            ]
        })
    ]
});
console.log(transformed.code);
```

or via [Require Hook](https://babeljs.io/docs/usage/require/).

```javascript
var createEspowerPlugin = require('babel-plugin-espower/create');
require('babel-register')({
    presets: [...],
    plugins: [
        createEspowerPlugin(babel, {
            patterns: [
                'assert.isNull(object, [message])',
                'assert.same(actual, expected, [message])',
                'assert.near(actual, expected, delta, [message])'
            ]
        })
    ]
});
```

#### options

| type     | default value       |
|:---------|:--------------------|
| `object` | objects shown below |

Configuration options for `babel-plugin-espower`. If not passed, default options will be used (return value of `defaultOptions()` with default `visitorKeys`, `astWhiteList`, `path`, `sourceRoot` and `sourceMap`. `visitorKeys` is value of `babel.types.VISITOR_KEYS`. `astWhiteList` is value of `babel.types.BUILDER_KEYS`. `path` is filename passed to babel. `sourceRoot` is be return value of `process.cwd()`, `sourceMap` is babel's internal SourceMap object).

```javascript
{
    patterns: [
        'assert(value, [message])',
        'assert.ok(value, [message])',
        'assert.equal(actual, expected, [message])',
        'assert.notEqual(actual, expected, [message])',
        'assert.strictEqual(actual, expected, [message])',
        'assert.notStrictEqual(actual, expected, [message])',
        'assert.deepEqual(actual, expected, [message])',
        'assert.notDeepEqual(actual, expected, [message])',
        'assert.deepStrictEqual(actual, expected, [message])',
        'assert.notDeepStrictEqual(actual, expected, [message])'
    ],
    visitorKeys: babel.types.VISITOR_KEYS,
    astWhiteList: babel.types.BUILDER_KEYS,
    sourceRoot: process.cwd(),
    path: file.opts.filename,
    sourceMap: file.opts.inputSourceMap
}
```


CHANGELOG
---------------------------------------
See [CHANGELOG](https://github.com/power-assert-js/babel-plugin-espower/blob/master/CHANGELOG.md)


AUTHOR
---------------------------------------
* [Takuto Wada](https://github.com/twada)


CONTRIBUTORS
---------------------------------------
* [James Talmage (jamestalmage)](https://github.com/jamestalmage)


LICENSE
---------------------------------------
Licensed under the [MIT](http://twada.mit-license.org/2015-2016) license.


[npm-url]: https://npmjs.org/package/babel-plugin-espower
[npm-image]: https://badge.fury.io/js/babel-plugin-espower.svg

[travis-url]: https://travis-ci.org/power-assert-js/babel-plugin-espower
[travis-image]: https://secure.travis-ci.org/power-assert-js/babel-plugin-espower.svg?branch=master

[depstat-url]: https://gemnasium.com/power-assert-js/babel-plugin-espower
[depstat-image]: https://gemnasium.com/power-assert-js/babel-plugin-espower.svg

[license-url]: http://twada.mit-license.org/2015-2016
[license-image]: https://img.shields.io/badge/license-MIT-brightgreen.svg
