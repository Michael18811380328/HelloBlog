# 第四节 react-webpack 配置优化1

以考代练（2021-10-28）

1. webpack 有几个优化配置项（6个默写），具体作用，怎么配置，有没有副作用（简述）？
2. CSS 如何进行优化（4点默写）生产环境和开发环境分别使用哪些优化？
3. 不同环境如何使用不同的配置文件，需要哪些库（2个），分别是什么作用？


## 优化配置

### Include 缩小文件范围

loader 会匹配全部的文件，遍历不必要的文件时，造成性能损耗

使用 test include exclude 配置项，缩小 loader 的处理范围

~~~js
include: path.resolve(__dirname, "./src"),
exclude: "/node_modules/",
~~~

可以在每一个 loader 上都设置 includes 缩小文件范围

### 优化 resolve.modules

Resolve.modules 用于 webpack 在什么目录下面查找第三方模块。如果在当前的目录中没有找到，那么会向上级目录递归查找，这样相对耗时。我们可以手动设置路径。

~~~json
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, "./node_modules")]
  }
}
~~~

### 优化 resolve.alias 

通常语法是 `import react from 'react'` ，这个会从 react 中查找 index.js 在什么位置。

Resolve.alias 可以将原来的路径，映射成一个直接导入路径，加快读取包的速度。

react 中有两套规范的代码 cjs 和 UMD 不同的模块化的代码，我们可以指定需要的文件。

具体的例子

~~~js
module.exports = {
  resolve: {
    alias: {
      "@": [path.resolve(__dirname, "./node_modules/css")],
      react: "./node_modules/react/umd"
    }
  }
}
~~~

主要消耗时间是 loader，这部分消耗时间较少，优化效果不明显

### 优化 resolve.extensions 配置

extensions 主要管理文件的后缀，直接 import 即可导入，不需要加上 js 后缀

但是滥用这个属性，需要 webpack 去查找各种的文件格式，最好只使用一两种

~~~js
resolve.extensions: ['.js', '.json', '.ts']
~~~

导入语句尽量带上文件后缀（性能和效率平衡）

### 使用 external 优化静态资源 CDN

例如 jquery 放在 CDN 上，从而减少打包后文件的大小，所以不需要把 jquery 打包到 bundle 内部，就可以使用 externals

~~~js
module.exports = {
  externals: {
    'jquery': "jQuery",
    'lodash': "_"
  }
};
~~~

线上使用了 CDN，所以全局有 jQuery 这个全局对象，然后这里映射到 jquery 变量，在模块中可以正常使用。

~~~js
import $ from 'jquery';
~~~

本地开发还需要 npm install jquery 操作，在 HTML 模板中需要引入 CDN

### 使用静态资源路径 publicPath(CDN)

~~~js
output: {
  path: path.resolve(__dirname, "./dist"),
  filename: "[name].js",
  publicPath: 'https://cdn.test.com/assets'
}
~~~

可以把打包后的 bundle 放在 cdn 上面，便于用户就近访问（前提是公司有 CDN 服务器，需要运维同事协同上传处理）

然后在模板中可以直接使用 CDN 的链接

~~~html
<script src="https://cdn.test.com/assets/main.js"></script>
~~~

## CSS  文件的处理

### 基本 loader (sass less)

~~~bash
npm install less less-loader --save-dev
~~~

~~~json
{
  test: /\.less$/,
  use: [
    "style-loader",
    {
      loader: "css-loader",
      options: {},
    }
    "less-loader",
    "postcss-loader"
  ]
}
~~~

### 使用 postcss 自动补齐浏览器前缀

~~~bash
npm install postcss-loader autoprefixer --save-dev
~~~

~~~js
module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowsersList: [
        "last 2 versions",
        ">1%"
      ]
    })
  ]
}
~~~

默认 css 会打包到 js 中的，这样 js 内容就比较大。我们希望单独生成 css 的打包文件，可以并行下载 css 和 js 提高页面加载效率。

### 抽离 css 使用 MiniCssExtractPlugin 

~~~bash
npm install mini-css-extract-plugin -D
~~~

~~~js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// plugin 需要更改一下
{
  test: /\.scss$/,
  use: [
    MiniCssExtractPlugin.loader,
    "css-loader",
    "postcss-loader",
    "sass-loader"
  ],
}
  
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name]_[contenthash:6].css",
      chunkFilename: "[id].css"
    })
  ]
~~~

### 压缩 css

使用第三方库：Optimize-css-assets-webpack-plugin、cssnano

~~~bash
npm install cssnano optimize-css-assets-webpack-plugin --save-dev
~~~

~~~js
const OptimizeCSSAssetsPlugin = require("optimise-css-assets-webpack-plugin");

new OptimiseCSSAssetsPlugin({
  cssProcessor: require("cssnano"), // 压缩css
  cssProcessorOptions: {
    discardComments: {
      removeAll: true
    }
  }
});
~~~

### 压缩 HTML

html-webpack-plugin 实现压缩 HTML 

~~~js
new htmlWebpackPlugin({
  title: '测试页面',
  template: "./index.html",
  filename: "index.html",
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    minifyCSS: true
  }
})
~~~

## 不同打包环境的配置

Webpack 配置实际上需要三个文件：基础配置，生产配置，开发配置。不同情况下打包配置不同。所以在学习插件和 loader 时需要明确适合什么情况下的打包配置等。

方法一：使用两个 package 脚本

需要一个 merge 的包，会把基础配置和生产配置合并起来的包

~~~bash
npm install webpack-merge --save-dev
~~~

~~~js
const merge = require("webpack-merge");
const baseConfig = require("./webapck.base.js");
const devConfig = {
  // 开发配置
  mode: "development",
  devtool: "cheap-inline-source-map",
};

module.exports = merge(baseConfig, devConfig);
~~~

~~~json
{
  "scripts": {
    "dev": "webpack-dev-server --config ./webpack.dev.js",
    "build": "webpack --config ./webpack.prod.js"
  }
}
~~~

方法二：使用一个脚本，脚本传参设置打包模式

~~~json
"build": "webpack --env.production --config webpack.dev.js"
~~~

~~~js
const baseConfig = require('./webpack.base.js');
const devConfig = require('./webpack.dev.js');
const proConfig = require('./webpack.pro.js');
const merge = require('webpack-merge');

module.exports = (env) => {
  if (env && env.production) {
    return merge(baseConfig, proConfig);
  } else {
    return merge(baseConfig, devConfig);
  }
};
~~~

这样写，可能在 windows 上路径不正确（操作系统的不兼容问题）

可以使用 cross-env 解决

~~~json
"build": "cross-env NODE_ENV=test webpack --config webpack.test.js"
~~~

~~~js
process.env.NODE_ENV 获取参数
~~~

VUE-CLI 具体配置见官网

Cli.vuejs.org

