# @babel/preset-env 使用

## 使用目的

根据不同的生产环境，对应不同的 JS 语法规范，然后把这部分语法规范传递给 babel 进行转换。用来处理浏览器兼容性，node 环境兼容性，不同环境下都可以运行最新的 JS 语法。

> `@babel/preset-env` is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This both makes your life easier and JavaScript bundles smaller!

@babel/preset-env 是一个智能预设，允许使用最新的 JavaScript 语法，而无需微观管理目标环境所需的语法转换（以及可选的浏览器 polyfill），让你工作更轻松，也让打包后的 JavaScript bundle 更小（根据不同目标环境，打成不同的包）！

## 转换案例

转换前代码

~~~js
var fn = (num) => num + 2;
~~~

例如在 chrome 60 中，我们发现转换后的代码仍然是箭头函数，因为Chrome60已经实现了箭头函数语法，所以不会转换成ES5的函数定义语法。

~~~
"browserslist": [
    "chrome 60"
]
~~~

~~~js
"use strict";

var fn = num => num + 2;
~~~

把Chrome60改成Chrome38，代码是ES5的函数定义语法，因为Chrome38不支持箭头函数语法。

~~~
"browserslist": [
    "chrome 38"
]
~~~

~~~js
"use strict";

var fn = function fn(num) {
  return num + 2;
};
~~~

@babel/preset-env可以通过browserslist针对目标环境不支持的语法进行语法转换，那么也可以对目标环境不支持的特性API进行部分引用呢？这样我们就不用把完整的polyfill全部引入到最终的文件里，可以大大减少体积。

## 基本配置

### targets

转换后的目标浏览器，该参数项可以取值为字符串、字符串数组或对象，不设置的时候取默认值空对象{}。该参数项的写法与browserslist是一样的，下面是一个例子

~~~js
module.exports = {
  presets: [["@babel/env", {
    targets: {
      "chrome": "58",
      "ie": "11"
    }
  }]],
  plugins: []
}
~~~

### useBuiltIns

preset-env 如何处理垫片 polyfills。

useBuiltIns项取值可以是"usage" 、 "entry" 或 false。如果该项不进行设置，则取默认值false。

在我们没有配置该参数项，或是取值为false的时候，polyfill 会全部引入到最终的代码里。

useBuiltIns取值为"entry"或"usage"的时候，会根据配置的目标环境找出需要的polyfill进行部分引入。这意味着核心js将相对于文件本身进行解析，并且需要可访问。

babel.config.json

~~~js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "corejs": "3.22"
      }
    ]
  ]
}
~~~

.browserslistrc

~~~
> 0.25%
not dead
~~~

### Corejs

此选项仅在与useBuiltIns:usage 或 entry一起使用时有效，并确保@babel/preset-env注入您的核心 js 版本支持的polyfill。建议指定次要版本，否则“3”将被解释为“3.0”，可能不包括最新功能的polyfill。

取默认值或2的时候，Babel转码的时候使用的是core-js@2版本（即core-js2.x.x）。因为某些新API只有core-js@3里才有，例如数组的flat方法，我们需要使用core-js@3的API模块进行补齐，这个时候我们就把该项设置为3。

需要注意的是，corejs取值为2的时候，需要安装并引入core-js@2版本，或者直接安装并引入polyfill也可以。如果corejs取值为3，必须安装并引入core-js@3版本才可以，否则Babel会转换失败。

### modules

这个参数项的取值可以是"amd"、"umd" 、 "systemjs" 、 "commonjs" 、"cjs" 、"auto" 、false。在不设置的时候，取默认值"auto"。

该项用来设置是否把ES6的模块化语法改成其它模块化语法。

我们常见的模块化语法有两种：（1）ES6的模块法语法用的是import与export；（2）commonjs模块化语法是require与module.exports。

在该参数项值是'auto'或不设置的时候，会发现我们转码前的代码里import都被转码成require了。

如果我们将参数项改成false，那么就不会对ES6模块化进行更改，还是使用import引入模块。

使用ES6模块化语法有什么好处呢。在使用Webpack一类的打包工具，可以进行静态分析，从而可以做tree shaking等优化措施。



## 参考

https://zhuanlan.zhihu.com/p/394782898

https://babeljs.io/docs/babel-preset-env

https://www.npmjs.com/package/@babel/preset-env