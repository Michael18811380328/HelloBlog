# 理解CommonJS、AMD、CMD三种规范

这三个规范都是为Js模块化加载而生的，使模块能够按需加载，使系统同庞杂的代码得到组织和管理。模块化的管理代码使多人开发得到了更好的合作。

## 一、CommonJS

是一种为JS的表现指定的规范，它希望js可以运行在任何地方，更多的说的是==服务端模块规范，同步加载模块==，Node.js采用了这个规范。
核心思想：一个单独文件就是一个模块，通过require方法来同步加载要依赖的模块，然后通过extports或则module.exports来导出需要暴露的接口。

```js
require("module");
require("../file.js");
exports.doStuff = function() {};
module.exports = someValue;
```

优点：服务器端模块重用，NPM中模块包多，有将近20万个。

缺点：加载模块是同步的，只有加载完成后才能执行后面的操作，也就是当要用到该模块了，现加载现用，不仅加载速度慢，而且还会导致性能、可用性、调试和跨域访问等问题。Node.js主要用于服务器编程，加载的模块文件一般都存在本地硬盘，加载起来比较快，不用考虑异步加载的方式，因此,CommonJS规范比较适用。然而，这并不适合在浏览器环境，同步意味着阻塞加载，浏览器资源是异步加载的，因此有了AMD CMD解决方案。

实现：服务器端的 Node.js；Browserify，浏览器端的 CommonJS 实现，可以使用 NPM 的模块，但是编译打包后的 文件体积可能很大；modules-webmake，类似Browserify，还不如 Browserify 灵活；wreq，Browserify 的前身；



## 二、AMD

鉴于浏览器的特殊情况，又出现了一个规范，这个规范呢可以==实现异步加载依赖模块，并且会提前加载==那就是AMD规范。

其核心接口是：define(id?, dependencies?, factory) ，它要在声明模块的时候指定所有的依赖 dependencies ，并且还要当做形参传到factory 中，对于依赖的模块提前执行，依赖前置。

```js
define("module", ["dep1", "dep2"], function(d1, d2) {
  return someExportedValue;
});
require(["module", "../file"], function(module, file) { /* ... */ });
```

优点：在浏览器环境中异步加载模块；并行加载多个模块；

缺点：开发成本高，代码的阅读和书写比较困难，模块定义方式的语义不顺畅；不符合通用的模块化思维方式，是一种妥协的实现；

实现：RequireJS； curl；



## 三、CMD

Common Module Definition 规范和 AMD 很相似，尽量保持简单，并与 CommonJS 和 Node.js 的 Modules 规范保持了很大的==兼容性==。

```js
define(function(require, exports, module) {
  var $ = require('jquery');
  var Spinning = require('./spinning');
  exports.doSomething = ...
  module.exports = ...
})
```

优点：依赖就近，延迟执行 可以很容易在 Node.js 中运行；

缺点：依赖 SPM 打包，模块的加载逻辑偏重；

实现：Sea.js ；coolie



Michael 笔记：

打包模式分三种：CommonJS AMD CMD

使用：主要在 webpack 打包中进行区分，不同模式在不同环境下按需加载（设置打包环境是浏览器还是node环境）

CommonJS 主要用于 nodeJS，同步加载

AMD 是异步模块规范，主要用于浏览器加载；

CMD 是兼容性模块规范



## 文章参考

[AMD (中文版)](https://link.zhihu.com/?target=https%3A//github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88))

[Webpack 中文指南](https://link.zhihu.com/?target=https%3A//github.com/mopacha/webpack-handbook)

[模块系统 | Webpack 中文指南](https://link.zhihu.com/?target=http%3A//zhaoda.net/webpack-handbook/module-system.html)