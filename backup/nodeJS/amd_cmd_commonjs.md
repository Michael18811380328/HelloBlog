# 谈谈 AMD、CMD、CommonJS 的区别和差异？

## 前言

AMD、CMD、CommonJS 是目前最常用的三种模块化书写规范，该篇文章主要是来介绍这些规范以及分析三种规范之前的差别。

## AMD

AMD 是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"，AMD 的具体实现是 RequireJs，它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行

AMD 也采用 require 加载模块，加载两个参数, 第一个参数为需要加载的模块，第二个参数为回调函数，等模块加载完成后回调函数才会运行。

```js
require(["math"], function (math) {
  math.add(2, 3);
});
```

AMD 由于是异步加载，浏览器不会发生假死，所以比较适合浏览器环境

## CMD

CMD 即 Common Module Definition 通用模块定义，玉伯实现 SeaJS 时遵循他提出的 CMD 规范。在 CMD 规范中，一个模块就是一个文件。
示例：

```js
define(function (require, exports, module) {
  // 模块代码
});
```

require 是可以把其他模块导入进来的一个参数;而 exports 是可以把模块内的一些属性和方法导出的;module 是一个对象，上面存储了与当前模块相关联的一些属性和方法。

AMD 和 CMD 的区别：

- AMD 是依赖关系前置,在定义模块的时候就要声明其依赖的模块;
- CMD 是按需加载依赖就近,只有在用到某个模块的时候再去 require

示例：

```js
// CMD
define(function(require, exports, module) {
  var a = require('./a')
  a.doSomething()
  // 此处略去 100 行
  var b = require('./b') // 依赖可以就近书写
  b.doSomething()
  // ...
})

// AMD 默认推荐的是
define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
  a.doSomething()
  // 此处略去 100 行
  b.doSomething()
  ...
})
```

## CommonJs

CommonJS 是服务器端模块的规范，node.js 的模块系统，就是参照 CommonJS 规范实现的。

CommonJS 定义的模块分为:{模块引用(require)} {模块定义(exports)} {模块标识(module)}

require()用来引入外部模块；exports 对象用于导出当前模块的方法或变量，唯一的导出口；module 对象就代表模块本身。

示例：

```js
// sum.js
exports.add = function (a, b) {
  return a + b;
};
// index.js
var math = require("sum");
math.add(2, 3); // 5
```

CommonJs 更适用于服务端，因为服务器端一般采用同步加载文件，也就是说需要某个模块，服务器端便停下来，等待它加载再执行。但是浏览器不行，采用 CommonJs 规范来加载模块非常容易造成假死状态，因此浏览器更需要异步加载模块。

## 总结

AMD 与 CMD、CommonJS 的区别与优缺点：

- CommonJs 主要针对服务端，AMD/CMD 主要针对浏览器端
- AMD/CMD 区别，虽然都是并行加载 js 文件，但还是有所区别，AMD 是预加载，在并行加载 js 文件同时，还会解析执行该模块（因为还需要执行，所以在加载某个模块前，这个模块的依赖模块需要先加载完成）；而 CMD 是懒加载，虽然会一开始就并行加载 js 文件，但是不会执行，而是在需要的时候才执行
- AMD 优点：加载快速，尤其遇到多个大文件，因为并行解析，所以同一时间可以解析多个文件
- AMD 缺点：并行加载，异步处理，加载顺序不一定，可能会造成一些困扰，甚至为程序埋下大坑
- CMD 优点：因为只有在使用的时候才会解析执行 js 文件，因此，每个 JS 文件的执行顺序在代码中是有体现的，是可控的
- CMD 缺点：执行等待时间会叠加。因为每个文件执行时是同步执行（串行执行），因此时间是所有文件解析执行时间之和，尤其在文件较多较大时，这种缺点尤为明显。

## 相关链接

- [Javascript 模块化编程（二）：AMD 规范](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)
- [理解前端模块化（CommonJs,AMD 和 CMD）](https://www.php.cn/js-tutorial-360130.html)
- [使用 AMD、CommonJS 及 ES Harmony 编写模块化的 JavaScript](https://justineo.github.io/singles/writing-modular-js/)
