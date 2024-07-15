# babel-preset-env使用指南
## 文章概览

babel-preset-env是非常重要且常用的一个插件预设，掌握它的用法以及实现原理非常有必要。

本文主要内容包括：babel-preset-env是什么、入门实例、如何配置以支持特定版本的 node/浏览器、实现原理等。

## babel-preset-env简介

历史背景：为了让开发者能够尽早用上新的JS特性，babel团队开发了babel-preset-latest。这个preset比较特殊，它是多个preset的集合(es2015+)，并且随着ECMA规范的更新更增加它的内容。

比如，当前(2018.06.02)，它包含的preset包括：es2017、es1016、es2015。

到了明年，可能它包含的preset就包括：es2018、es2017、es2016、es2015。

随着时间的推移，babel-preset-latest 包含的插件越来越多，这带来了如下问题：

1. 加载的插件越来越多，编译速度会越来越慢；
2. 随着用户浏览器的升级，ECMA规范的支持逐步完善，编译至低版本规范的必要性在减少（比如ES6 -> ES5），多余的转换不单降低执行效率，还浪费带宽。

因为上述问题的存在，babel官方推出了babel-preset-env插件。它可以根据开发者的配置，按需加载插件。配置项大致包括：

1. 需要支持的平台：比如node、浏览器等。
2. 需要支持的平台的版本：比如支持node@6.1等。

默认配置的情况下，它跟 babel-preset-latest 是等同的，会加载从es2015开始的所有preset。

## 入门例子

首先，安装依赖。

```bash
npm install babel-cli --save-dev
npm install babel-preset-env --save-dev
```

创建 index.js。

```js
let foo = () => 'foo';
```

配置文件 .babelrc 如下，当前为默认配置。

```json
{
  "presets": [ "env" ]
}
```

运行转换命令

```bash
`npm bin`/babel index.js
```

转换结果如下：

```js
'use strict';

var foo = function foo() {
  return 'foo';
};
```

## 针对node版本的配置

前面提到，babel-preset-env 提供了更精细化的配置，以提升编译速度，同时减少代码冗余。

我们看下实际例子。假设当前有如下代码：

```js
// index.js
async function foo () {}
```

采用 babel-preset-env，默认配置下，输出的转换结果如下（具体内容不用关心，知道很长就行了）。

```js
"use strict";

var foo = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function foo() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
```

如果我们的代码是打算跑在node@8.9.3版本上，那上面的兼容代码就有点多余了，因为node@8.9.3已经支持了async/await。

修改下 .babelrc，加上配置参数"target"，它表示我们需要支持哪些平台+哪些版本。这里声明我们要支持的是node版本为8.9.3。

```json
{
  "presets": [
    ["env", {
      "targets": {
        "node": "8.9.3"
      }      
    }]
  ]
}
```

再次进行转码，结果如下。几乎没有变化，因为node最新版本支持 async/await，因此不需要额外的兼容代码。

```js
"use strict";

async function foo() {}
```

## 针对浏览器版本的配置

babel-preset-env 同样提供了对浏览器版本的配置能力。

### 支持特定版本的浏览器

假设我们的代码如下：

```jsx
let nick = '程序猿小卡';
let desc = `你好 ${nick}`;
```

如果只需要支持 IE11，那么可以这样配置。

```json
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": "ie 11"
      }      
    }]
  ]
}
```

如果只需要支持支持 Edge 16，那么可以这样配置

```json
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": "edge 16"
      }      
    }]
  ]
}
```

因为 IE 11 不支持模板字面量，而 Edge 16支持模板字面量，因此上面配置的转码结果是不同的，读者可以自行尝试。

### 支持特定版本范围的浏览器

大部分时候，我们要针对的都是特定范围的浏览器，比如 IE8+，那么，逐个指定是不现实的。好在 babel-preset-env 支持要支持的版本范围。

比如，我们需要支持 IE8+、chrome62+，那么可以这样配置：

```json
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": [ "ie >= 8", "chrome >= 62" ]
      }      
    }]
  ]
}
```

看下前面声明的范围涵盖了哪些浏览器。

```
$ `npm bin`/browserslist "ie >= 8, chrome >= 62"
chrome 66
chrome 65
chrome 64
chrome 63
chrome 62
ie 11
ie 10
ie 9
ie 8
```

对浏览器版本范围的配置，babel-preset-env 借助了 [browserslist](https://github.com/browserslist/browserslist) 这个库，还有更多的配置方式，可以自行探究。

## babel-preset-env实现原理

实现原理很简单。官方文档写的挺简洁的，挑重点大致翻译下。

1、首先，检测浏览器对JS特性的支持程度，比如通过通过 [compat-table](https://github.com/kangax/compat-table) 这样的外部数据。

2、将 JS特性 跟 特定的babel插件 建立映射，映射关系可以参考 [这里](https://github.com/babel/babel-preset-env/blob/master/data/plugin-features.js)。

3、stage-x 的插件不包括在内。

4、根据开发者的配置项，确定至少需要包含哪些插件。比如声明了需要支持 IE8+、chrome62+，那么，所有IE8+需要的插件都会被包含进去。

## 相关链接

https://babeljs.io/docs/plugins/preset-env/#how-it-works