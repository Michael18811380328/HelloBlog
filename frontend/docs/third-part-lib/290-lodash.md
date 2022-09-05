# 290 lodash

## 用途

常用函数和工具库

A modern JavaScript utility library delivering modularity, performance, & extras (提供模块化、性能和附加功能)

## 可靠性

3000万下载，5万星星

## 官网链接

https://lodash.com/

https://www.npmjs.com/package/lodash

https://github.com/lodash/lodash


## 基本使用

### 引入全部-引入部分

```js
// Load the full build.
var _ = require('lodash');

// Load the core build.
var _ = require('lodash/core');

// Load the FP build for immutable auto-curried iteratee-first data-last methods.
// 为不可变的自动柯里化 iteratee first data last 方法加载函数式编程构建。
var fp = require('lodash/fp');

// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');
```

## 其他

优点：功能强大，安全性没问题。核心功能 4KB 可以接受。

缺点：库比较大，如果只使用其中一个功能，可以只引入其中一部分，全部引入，网页加载时较慢。一部分功能已经在 ES6 的语法中实现。

FP 是什么：lodash/fp 模块通过导出一个 lodash 实例及其方法包装来生成不可变的自动柯里化 iteratee-first data-last 方法，从而促进了对函数式编程 (FP) 更友好的风格（参考：https://github.com/lodash/lodash/wiki/FP-Guide）

版本：有 1-4 几个大版本，使用 API 需要注意版本是否支持。

