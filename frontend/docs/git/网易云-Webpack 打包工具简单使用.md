# Webpack 打包工具简单使用

网易云课堂

课程链接：

https://study.163.com/course/courseMain.htm?courseId=1004724031&_trace_c_p_k2_=1104e3d9ab4a4d969e7b387fb5863a48

注意：这个课程是 2017年出版，是 webpack 版本 3。这个课程仅作为简单复习，了解概念等即可。

现在是 2021年，webpack 5.80 版本，具体细节参考官方文档：https://webpack.docschina.org/guides/getting-started/

### 课时1 详细介绍webpack工具的相关基础知识

为什么使用 webpack? 这需要从前端性能优化说起。一个界面中，如果 HTML 中有多个 style 和 script 标签，那么需要进行多次网络请求，性能较差。我们可以把多个 JS 或者 CSS 文件打包成一个 CSS 或者 JS 文件，这样前端只需要请求1次即可，性能得到优化。

同时，打包过程中，根据不同的 loader，例如 uglyfy 可以把不需要的部分删除，或者丑化代码，减少代码量，同样性能得到优化。

Webpack 定义: 是一个前端资源加载、打包工具，将根据模块的依赖关系，进行静态分析，并依据规则生成对应的静态资源。（可以把一个图状的依赖结构，包括 dependencies）打包成简单的几个 JS 文件（static assets）

### 课时2 搭建webpack的打包的开发环境

在 3 版本中，全局安装 webpack

~~~bash
sudo npm install webpack -g
webpack -v
webpack 1.js bundle.js
~~~

这样就把 1.js 打包成 bundle.js (如果是配置文件，需要设置一个或者多个入口文件进行打包)

不同 JS 文件内部互相依赖（module.exports = {}, require('path')）webpack 进行语法分析后，可以获取不同文件的依赖关系。

### 课时3 打包多个相互依赖的js文件过程

==可以通过模块的导入导出功能，创建不同模块的依赖关系树，然后进行打包。==

一个模块（文件）可以 export 很多变量，import { } 需要使用大括号

一个模块只能 export default 一个变量（类），import 后面直接加这个类名即可

export 和 export default 的区别，参考 https://www.cnblogs.com/fanyanzhao/p/10298543.html

### 课时4 利用工具打包 css 文件

Css 之间没有明显的依赖关系，所以通过 loader 进行加载打包

~~~bash
npm install css-loader style-loader
~~~

Css-loader 可以把 js 中 import xxx.css 这样的依赖关系整理出来

style-loader 可以把 HTML 中的 style 标签整理出来

还有其他的 sass less loader 对应相关的样式文件

通常在 webpack 配置文件中设置，需要考虑 loader 的顺序，否则无法生效

~~~js
{
  test: /\.css$/,
    loader: ExtractTextPlugin.extract(
      Object.assign(
        {
          fallback: {
            loader: require.resolve('style-loader'),
            options: {
              hmr: false,
            },
          },
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: shouldUseSourceMap,
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebookincubator/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
          ],
        },
        extractTextPluginOptions
      )
    ),
   // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
},
~~~

### 课时5 如何打包样式文件

单文件，可以直接在 css require 中使用 loader 打包，实际不会这样使用

~~~js
require('!style-loader!css-loader!./srtle.css');
document.write('test');
~~~

实际上需要在配置文件中批量处理，使用正则表达式匹配文件，然后加入对应的 loader

~~~js
module.exports = {
  entey: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ],
  },
  devServer: {
    port: 8001,
  },
};
~~~

服务端环境

webpack 是打包工具

本地需要一个服务器，就是 webpack-dev-server 把打包的文件放在本地的服务器上

早期的代码，需要把 webpack 编译和 webpack-dev-server 运行服务器分别写成两个命令

~~~json
{
  "scripts": {
    'start': 'webpack-dev-server --entry ./src/index.js --output-file ./dist/bundle.js',
    'build': 'webpack --watch',
  },
  "dependencies": {
    'react': '',
  },
  "devDependencies": {
    "css-loader": '',
    "style-loader": '',
    'webpack-dev-server': '',
  },
}
~~~
