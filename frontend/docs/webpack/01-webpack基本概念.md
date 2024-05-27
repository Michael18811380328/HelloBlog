# webpack 主要概念

create time 2019-01-01

last modify time 2024-04-12

官网文档链接：https://webpack.docschina.org/concepts/plugins/

webpack 静态文件打包：首先构建一个依赖图（dependency graph），然后生成一个或者多个包（bundle）。

### 入口（entry）

这里表示 webpack 构建依赖图的开始的文件（通常是 src/index.js）

~~~js
// webpack-config.js 这里指定了入口文件是 test.js
module.exports =
  entry: './src/test.js'
};
~~~

https://webpack.docschina.org/concepts/entry-points/

入口配置简单：入口配置分为单页面和多页面：

通常一个 SPA 项目使用一个入口文件；

如果功能复杂，实际是多个页面，后端根据不同路由进入不同的界面，那么可以设置多个入口文件（多个入口可以复用组件）。

~~~js
module.exports = {
  entry: './src/index.js'
};

module.exports = {
  entry: {
    main: './src/main.js',
    share: './src/share.js',
    form: './src/form/form-edit.js'
  }
};
~~~

### 出口（output）

表示打包后的文件的输出位置（默认是./dist/main.js），可以输出多个打包文件

~~~js
// webpack-config.js
const path = require('path'); // 这里是nodeJS的文件模块，可以获取本地文件的路径

// 设置输出的文件路径是 根路径+dist；输出的一个打包文件是 test.bundle.js
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'test.bundle.js',
  },
};
~~~

### loader

webpack 默认可以打包 js json 文件，但是对于 css less sass ts 等文件不能直接打包。loader 可以对不同文件进行预处理，并转换成有效的模块。需要在 module-rules 添加 loader（注意路径）。

Loader 参数有两个：

- test 是正则表达式，可以匹配不同类型的文件（根据文件名的后缀匹配文件）注：正则表达式不能加入引号。
- use 是一个数组，表示对于不同类型的文件使用不同的 loader，一步一步进行处理。

loader 针对常见的文件都有对应的loader。

~~~js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'test.bundle.js',
  },
  module: {
    // 这里表示：正则匹配到的 txt 结尾的文件，使用 raw-loader 预处理一下（转换）
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  }
};
~~~

### 插件（plugin）

loader 可以解决不同文件的处理方法，plugin 可以支持更多功能，例如配置环境变量，或者新生成一个文件（目前没有用到）。插件很多很复杂，目的是解决loader无法解决的事情。

```js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'test.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  },
  plguins: [
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
};
// 这个插件的作用是，生成一个 index.html 文件，并自动注入打包好的 bundle.js 文件。
```

### 模式 mode

默认是 production、还有 development 或者 none。这个设置后不需要变化（通常不用none）。

## 总结

webpack 主要概念：bundle、block、entry、output、loader、plugin、mode
