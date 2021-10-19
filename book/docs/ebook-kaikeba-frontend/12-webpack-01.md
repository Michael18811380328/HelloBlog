# Day1 webpack配置概念

知识要点：清楚理解和掌握 webpack的配置、概念

文档：官⽅网站 https://webpack.js.org/

## 1.webpack简介

webpack is a module bundler (模块打包⼯工具)

Webpack是一个打包模块化 JavaScript 的工具，它会从入口模块出发，识别出源码中的模块化导入语句，递归地找出入口文件的所有依赖，将⼊口和其所有的依赖，打包到一个单独的文件中，是工程化、自动化思想在前端开发中的体现。

## 2.安装webpack

### 2.1-环境准备

nodeJs https://nodejs.org/en/

版本参考官⽹网发布的最新版本，新版本可以提升webpack的打包速度

### 2.2-全局安装 不推荐 

~~~bash
# 安装webpack V4+版本时，需要额外安装webpack-cli
npm install webpack webpack-cli -g
webpack -v
npm uninstall webpack webpack-cli -g
~~~

全局安装webpack，这会将你项⽬中的webpack锁定到指定版本，造成不同的项⽬中因为webpack依赖不同版本⽽而导致冲突，构建失败。

### 2.3-项⽬安装 推荐

~~~bash
npm install webpack webpack -D
~~~


~~~bash
# 安装最新的稳定版本
npm i -D webpack

# 安装指定版本
npm i -D webpack@<version>

# 安装最新的体验版本 可能包含bug,不要用于⽣生产环境
npm i -D webpack@beta

# 安装webpack V4+版本时，需要额外安装webpack-cli
npm i -D webpack-cli
~~~

### 2.4-检查安装
~~~bash
webpack -v 
# 可能出现报错：command not found 默认在全局环境中查找，全局环境下面没有安装 webpack

npx webpack -v
# npx帮助我们在项目中的node_modules⾥查找 webpack

./node_modules/.bin/webpack -v
# //到当前的node_modules模块里里指定webpack
~~~

### 3.启动webpack执⾏构建

1Chunk = 1bundle

chunk 是虚拟的代码块

bundle 是生成的资源⽂件 

1个chunk可以是多个模块组成的

模块：nodeJS⾥ 万物皆模块

entry 的数据类型：字符串、数组、对象。

字符串和数组的效果基本一样，最后都是单一入口。默认是字符串。

如果 entry 是数组: webpack会⾃动⽣生成另外⼀个入⼝模块，并将数组中的每个指定的模块加载进来，并将最后⼀个模块的 module.exports 作为入⼝模块 的module.exports导出。

如果 entry 是对象多键值，对应多个 chunk，才是多个打包，多页面应用。

### 3.1- webpack默认配置

- webpack默认⽀支持JS模块和JSON模块
- 支持CommonJS Es moudule AMD CMD等模块类型
- webpack4⽀持零配置使⽤,但是很弱，稍微复杂些的场景都需要 额外扩展

### 3.2- 准备执⾏构建

新建src⽂件夹，新建src/index.js、src/index.json、src/other.js

```js
// index.js
const json = require("./index.json"); //commonJS
import { add } from "./other.js"; //es module
console.log(json, add(2, 3));
```

index.json

```json
{
  "name": "JOSN"
}
```

```js
// other.js
export function add(n1, n2) {
  return n1 + n2;
}
```

### 3.3 执行构建

```bash
# npx⽅方式
npx webpack

# 写入 npm script
npm run build 

"scripts": {
  "build": "webpack"
},
```

修改package.json⽂件:

原理就是通过shell脚本在 node_modules/.bin⽬录下创建⼀个软链接。

### 3.4-构建成功

我们会发现⽬录下多出⼀个 dist ⽬录，⾥⾯有个 main.js ，这个⽂件是⼀个可执⾏的JavaScript⽂件，⾥⾯包含 webpackBootstrap 启动函数。

### 3.5-默认配置


```js
const path = require("path");
module.exports = {
  // 必填 webpack执⾏构建入⼝ 
  entry: "./src/index.js", 
  output: {
  	// 将所有依赖的模块合并输出到main.js 
    filename: "[name].[hash6].js",
  	// 输出⽂件的存放路路径，必须是绝对路路径
 		path: path.resolve(__dirname, "./dist")
	}
};
```

### 4.webpack配置核⼼心概念

零配置是很弱的，特定的需求，总是需要⾃⼰己进⾏配置

webpack有默认的配置⽂件，叫 webpack.config.js ，我们可以对这个⽂件进⾏修改，进⾏个性化配置

使⽤默认的配置⽂件:webpack.config.js

不使⽤⾃定义配置⽂件: ⽐如webpackconfig.js，可以通过-- config webpackconfig.js来指定webpack使⽤哪个配置⽂件来 执⾏构建

webpack.config.js配置基础结构

```js
module.exports = {
  entry: "./src/index.js", //打包入⼝⽂件
  output: "./dist", //输出结构
  mode: "production", //打包环境
  module: {
    rules: [ //loader模块处理
      {
        test: /\.css$/,
        use: "style-loader"
      }
    ]
  },
  //插件配置 
  plugins: [
    new HtmlWebpackPlugin()
  ]
};
```

### 4.1-entry:

指定webpack打包入⼝⽂件:Webpack 执⾏构建的第⼀步将从 Entry 开始，可抽象成输入

```js
//单入⼝ SPA，本质是个字符串 
entry:{
  main: './src/index.js'
}
// ==相当于简写=== entry:"./src/index.js"
```

```js
//多入⼝ entry是个对象
entry:{
  index:"./src/index.js",
  login:"./src/login.js"
}
```

### 4.2-output:

打包转换后的⽂件输出到磁盘位置:输出结果，在 Webpack 经过⼀系列处理并得出最终想要的代码后输出结果。

```js
output: {
  filename: "bundle.js",//输出⽂件的名称
  path: path.resolve(__dirname, "dist")//输出⽂件到
},

//多入⼝的处理
output: {
  filename: "[name][chunkhash:8].js",//利利⽤占位符， ⽂件名称不要重复
  path: path.resolve(__dirname, "dist")//输出⽂件到磁盘的⽬录，必须是绝对路路径
},
```
! 磁盘的⽬录，必须是绝对路径



### 4.3-mode

Mode⽤来指定当前的构建环境。设置mode可以⾃动触发webpack内置的函数，达到优化的效果。

production：DefinePlugin 中环境变量 process.env.NODE_ENV 设置为 production，启用 FlagDependencyUsagePlugin，FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurreneceOrderPlugin, SideEffectsPlugin TerserPlugin 插件。

development： DefinePlugin 中环境变量 process.env.NODE_ENV 设置为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。

none：不进行任何优化

NODE_ENV 不会自动设置 mode

开发阶段的开启会有利利于热更更新的处理，识别哪个模块变化

生产阶段的开启会有帮助模块压缩，处理副作⽤等⼀些功能





### 4.4-loader

Webpack 默认只⽀支持.json 和 .js模块 不⽀支持 不认识其他格式的模块

模块解析，模块转换器器，⽤于把模块原内容按照需求转换成新内容。

webpack是模块打包⼯工具，⽽而模块不仅仅是js，还可以是css，图⽚或者其他格式。

但是webpack默认只知道如何处理js和JSON模块，那么其他格式的模块处理，和处理⽅方式就需要loader了

常⻅的loader：style-loader, css-loader, less-loader, sass-loader, ts-loader, babel-loader, file-loader, eslint-loader 等等



### 4.5-moudle

模块，在 Webpack ⾥⼀切皆模块，⼀个模块对应着⼀个⽂件。 Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。

当webpack处理到不认识的模块时，需要在webpack中的module 处进⾏配置，当检测到是什什么格式的模块，使⽤什什么loader来处理。

```json
module:{
  rules:[
    {
      test:/\.xxx$/,//指定匹配规则 
      use:{
      	loader: 'xxx-load'//指定使⽤的loader
      }
    }
  ]
}
```

- loader: file-loader:处理静态资源模块，原理是把打包入⼝中识别出的资源模块，移动到输出⽬录，并且返回⼀个地址名称
- 使用场景: 就是当我们需要模块，仅仅是从源代码挪移到打包⽬录，就可以使⽤file-loader来处理，txt，svg，csv，excel，图⽚资源

```
 npm install file-loader -D
```

案例:

```js
module: {
  rules: [
    {
      test: /.(png|jpe?g|gif)$/, //use使⽤⼀个loader可以⽤对象，字符串，两个loader需要⽤数组
      use: {
        loader: "file-loader",
        // options额外的配置，⽐比如资源名称
        options: {
          // placeholder 占位符 [name]老资源模块的名称 [ext]⽼资源模块的后缀
          // https://webpack.js.org/loaders/file-loader#placeholders
          name: "[name]_[hash].[ext]",
          //打包后的存放位置
          outputPath: "images/"
        }
      }
    }
  ]
},
```


实例


```js
import pic from "./logo.png";
var img = new Image();
img.src = pic;
img.classList.add("logo");
var root = document.getElementById("root");
root.append(img);
```

处理字体 https://www.iconfont.cn/?spm=a313x.7781069.199 8910419.d4d0a486a

```css
//css
@font-face {
  font-family: "webfont";
  font-display: swap;
  src: url("webfont.woff2") format("woff2");
}

body {
  background: blue;
  font-family: "webfont" !important;
}
```

```js
//webpack.config.js
{
  test: /\.(eot|ttf|woff|woff2|svg)$/,
  use: "file-loader"
}
```

- url-loader 是 file-loader加强版本

url-loader内部使⽤了了file-loader,所以可以处理file-loader所有 的事情，但是遇到jpg格式的模块，会把该图⽚片转换成base64格 式字符串，并打包到js⾥。对⼩体积的图⽚片⽐比较合适，⼤图⽚片不 合适。

```bash
 npm install url-loader -D
```

案例：

```js
module: {
  rules: [
    {
      test: /\.(png|jpe?g|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          name: "[name]_[hash].[ext]",
          outputPath: "images/", //⼩于2048，才转换成base64
          limit: 2048
        }
      }
    }
  ]
},
```

样式处理:

Css-loader 分析css模块之间的关系，并合成⼀个css

Style-loader 会把css-loader⽣生成的内容，以style挂载到⻚⾯的heade部分

~~~bash
 npm install style-loader css-loader -D
~~~

```json
{
  test: /\.css$/,
  use: ["style-loader", "css-loader"]
}
```

```json
{
  test:/\.css$/,
  use:
    [
      {
        loader:"style-loader",
        options: {
          injectType: "singletonStyleTag" // 将所有的style标签合并成⼀个
        }
      },
      "css-loader"
    ]
}
```


Less样式处理

less-load 把less语法转换成css

```bash
 $ npm install less less-loader --save-dev
```

案例例: loader有顺序，从右到左，从下到上

```json
{
  test: /\.scss$/,
  use: ["style-loader", "css-loader", "less-loader"]
}
```

样式⾃动添加前缀:

https://caniuse.com/

Postcss-loader

```bash
npm i  postcss-loader autoprefixer -D
```

新建postcss.config.js

```json
//webpack.config.js
{
  test: /\.css$/,
  use: ["style-loader", "css-loader", "postcss-loader"]
},
```

```js
//postcss.config.js
module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: ["last 2 versions", ">1%"] 
    })
  ]
};
```

loader 处理webpack不⽀支持的格式⽂件，模块 ⼀个loader只处理⼀件事情

loader有执⾏顺序

### 5.Plugins

- 作⽤于webpack打包整个过程
- webpack的打包过程是有(⽣命周期概念)钩⼦

plugin 可以在webpack运⾏到某个阶段的时候，帮你做⼀些事情，类似于⽣生命周期的概念

扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改 变构建结果或做你想要的事情。

作⽤于整个构建过程



#### HtmlWebpackPlugin

htmlwebpackplugin会在打包结束后，⾃动生成⼀个html⽂件，并把打包⽣成的js模块引入到该html中。

```
 npm install --save-dev html-webpack-plugin
```

配置:

~~~txt
title: ⽤来⽣生成⻚页⾯的 title 元素

filename: 输出的 HTML ⽂件名，默认是 index.html, 也可以直 接配置带有⼦子⽬录。

template: 模板⽂件路路径，⽀支持加载器器，⽐比如 html!./index.html

inject: true | 'head' | 'body' | false ,注入所有的资 源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元 素的底部，'head' 将放置到 head 元素中。

favicon: 添加特定的 favicon 路路径到输出的 HTML ⽂件中。 minify: {} | false , 传递 html-minifier 选项给 minify 输出

hash: true | false, 如果为 true, 将添加⼀个唯⼀的 webpack 编译 hash 到所有包含的脚本和 CSS ⽂件，对于解除 cache 很有⽤。

cache: true | false，如果为 true, 这是默认值，仅仅在⽂件 修改之后才会发布⽂件。

showErrors: true | false, 如果为 true, 这是默认值，错误 信息会写入到 HTML ⻚页⾯中

chunks: 允许只添加某些块 (⽐比如，仅仅 unit test 块) chunksSortMode: 允许控制块在添加到⻚页⾯之前的排序⽅方式，⽀支持 的值:'none' | 'default' | {function}-default:'auto' excludeChunks: 允许跳过某些块，(⽐比如，跳过单元测试的块)
~~~

案例:

```js
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
```

```js
module.exports = {
  plugins: [
    new htmlWebpackPlugin({
      title: "My App",
      filename: "app.html",
      template: "./src/index.html"
    })
  ]
};
```

```html
//index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible"content="ie=edge" />
    <title><%= htmlWebpackPlugin.options.title %></title>
      </head>
   <body>
   	 <div id="root"></div>
   </body>
</html>
```

#### clean-webpack-plugin

用于清空 dist 中已有的文件

```bash
npm install --save-dev clean-webpack-plugin
```

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
```


```json
plugins: [
  new CleanWebpackPlugin()
]
```

笔记：

hash 目的是浏览器缓存

hash: 每次更新文件，全部的 bundle 名称都会更新

Chunkhash：如果一部分文件变化，那么与之相关的 bundle 的名称会更新，不变的 bundle 不会更新（适用于多入口的项目）

通常6位hash就没问题了，基本不会冲突

Michael18811380328 的界面中，使用 webpack 把 JS 部分打包一下；这样也顺便练习了

练习代码

~~~js
const path = require('path');
module.exports = {
  // 打包的上下文（项目打包的相对路径，通常使用默认的即可，不需要改动）
  // content: process.cwd(),
  entry: './src/index.js',
  // entry: ["./src/index.js", "./src/main.js"]
  // entry: { index: './src/index.js', other: './src/other.js' },
  output: {
    path: path.reolve(__dirname, "./dist"),
    filename: "[name]-[chunkhash:6]-[hash:6].js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader 从后向前解析
        // css loader 是把 CSS文件的内容加入到 js 模块中
        // style-loader 是把 js 中的代码，转换到 HTML 中 style 标签中(css in js)
        use: ["style-loader", "css-loader"]
      },
    ],
  },
};
~~~

output 中占位符

- Hash: 整个项目的 hash 值，每次构建一次，都会有新的 hash 
- chunkhash：根据不同的入口进行依赖解析，构建对应的 chunk, 生成对应的 hash。如果 entry 模块没有内容改动，则对应的 hash 不变
- name: 文件名，bundle 的文件名和入口的 key 一致

