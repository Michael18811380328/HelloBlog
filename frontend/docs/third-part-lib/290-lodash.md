# 290 lodash

## 用途

常用函数和工具库

A modern JavaScript utility library delivering modularity, performance, & extras.

## 可靠性

3000万下载，5万星星

## 官网链接

https://lodash.com/

https://www.npmjs.com/package/lodash

https://github.com/lodash/lodash


## 基本使用

```js
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');

// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');
```

## 其他

这个库比较大，如果只使用其中一个功能，可以只引入其中一部分，全部引入，网页加载时较慢。
