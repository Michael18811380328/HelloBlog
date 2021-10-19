# Webpack-Day2

讲师的技术细节和配置讲的一般，课程翻车两次，最后一定以官网配置为准，最好自己实践一下

Style-loader 的配置可能更改了，一切以官方文档为准，不用版本需要参考不同的官方文档

~~~json
{
  test: /\.less$/,
  use: [
    {
      loader: "style-loader",
      options: {
        esModule: true, // css modules
      }
    },
    {
      loader: "css-loader",
      options: {
        modules: true,
      }
    },
    "less-loader"
  ],
}
~~~

详见 github.com/webpack-contrib/css-loader 默认 modules 属性是 false（为了性能），可以设置 true 把CSS单独模块化（便于调试）。



主要内容：

- CSS 的常见 loader，postCSS 做浏览器兼容
- 文件的 loader（字体、图片）
- HTML 插件（html-webpack-plugin）
- sourceMap——帮助我们在开发时进行调试（显示报错位置）生产环境不开启 sourceMap，开发环境默认开启（cheap-inline-source-map）不显示 source-map。线上避免暴露源代码。
- webpack-dev-server 本地开发服务器-socket 实现热更新

### post-css

作用：自动兼容早期浏览器

安装依赖

~~~bash
npm install -D postcss-loader autoprefixer
~~~

更改 CSS 文件的 loader

~~~json
{
  test: /\.css$/,
  use: ["style-loader", "css-loader", "postcss-loader"]
}
~~~

需要写一个单独的配置文件 postcss.config.js

第一个表示兼容各大浏览器最近的两个大版本浏览器，第二个值市场占有率大于1%的浏览器

require('autoprefixer') 引入的是一个对象（方法），所以直接传递一个对象

~~~js
module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ["last 2 versions", ">1%"]
    })
  ]
};

// 或者写成一般形式
const autoprefixer = require("autoprefixer");
autoprefixer({
  overrideBrowerslist: ["last 2 versions", ">1%"]
})
~~~

### File-loader

作用：把文件（模块）从源代码部分，移动到打包的目录

通常是字体图标 txt svg cvs 大图片等文件

~~~js
import pic from './images/logo.png';

// 实际上 pic 就是文件的路径
var img = new Image();
img.src = pic;
var root = document.getElementById('Root');
root.append(img);
~~~

那么我们需要使用 file-loader

~~~json
{
  test: /\.(png|jpe?g|tiff|gif)$/,
  use: {
    loader: "file-loader",
    options: {
      name: "[name]-[hash:6].[ext]"
    }
  }
}
~~~

Url-loader 和 file-loader 功能类似，主要支持 limit 参数，不同大小的文件使用不同的处理方法

小体积的图片资源可以转换成 base64 然后直接写入 js 文件

~~~json
{
  test: /\.(png|tiff)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: "[name]-[hash:12].[ext]",
      outputPath: "images/",
      limit: 2 * 1024,
    }
  }
}
~~~

### HTML-webpack-plugin 

插件，用于把源代码中 HTML 更改移动到打包目录中

~~~json
{
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "用于传参的部分"
      template: "./src/index.html",
      filename: "index.html",
    })
  ]
}
~~~

模板是源目录中的文件，支持 cjs 进行传参，适用于多个 HTML 传参，filename 是转换后的文件名

### source-map

是否显示打包后的不同文件的依赖关系

默认生产环境下面不显示（为了性能，源代码保密），开发环境下面显示（为了调试方便）

~~~json
{
  devtool: "source-map"
}
~~~

### devServer

开启本地开发服务器，便于调试

~~~json
{
  devServer: {
    contentBase: path.resolved(__dirname, "./dist"), // 本地项目目录
    open: true, // 是否自动打开浏览器
    port: 8080,
  }
}
~~~

### Mini-css-extract

插件，用于抽取 css 到单独的文件中。使用插件时，需要改变 css loader 

~~~json
{
  rules: {
    test: '/\.css$',
    use: [
      MiniCssExtractPlugin.loader, // 不使用 style-loader
      {
        loader: "css-loader",
        options: {
          modules: true,
        }
      }
    ]
  },
  // ...
 	plugins: [
    new MiniCSSExtract({
      filename: "[name].css"
    })
  ],
}
~~~



原始课程笔记（结构比较乱）

作业:

webpack⽀持第三⽅字体!!!!!!!

- loader: file-loader:处理静态资源模块：原理是把打包⼊⼝中识别出的资源模块，移动到输出⽬录，并且返回⼀个地址名称

使用场景:就是当我们需要模块，仅仅是从源代码挪移到打包⽬录， 就可以使⽤file-loader来处理，txt，svg，csv，excel，图⽚资 源啦等等

```
npm install file-loader -D
```

案例:

```js
module: {
  rules: [
    {
      test: /\.(png|jpe?g|gif)$/, //use使⽤⼀个loader可以⽤对象，字符串串，两个loader需要⽤数组
      use: {
        loader: "file-loader",
        // options额外的配置，⽐比如资源名称
        options: {
          // placeholder 占位符 [name]老资源模块的名称
          // [ext]老资源模块的后缀
          // https://webpack.js.org/loaders/file-loader#placeholders
          name: "[name]_[hash].[ext]", //打包后的存放位置
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

- url-loader file-loader加强版本

url-loader内部使⽤了file-loader,所以可以处理file-loader所有 的事情，但是遇到jpg格式的模块，会把该图⽚转换成base64格 式字符串串，并打包到js里。对⼩小体积的图⽚⽐比较合适，⼤大图⽚不 合适。

```
 npm install url-loader -D
```

案例;

```js
module: {
  rules: [
    {
      test: /\.(png|jpe?g|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          name: "[name]_[hash].[ext]",
          outputPath: "images/", //⼩小于2048，才转换成base64
          limit: 2048
        } }
    } ]
},
```


样式处理:

Css-loader 分析css模块之间的关系，并合成⼀个css Style-loader 会把css-loader⽣成的内容，以style挂载到⻚⾯的

heade部分

~~~bash
npm install style-loader css-loader -D
~~~



```js
{
  test: /\.css$/,
    use: ["style-loader", "css-loader"]

}

{
  test:/\.css$/,
    use:[{
      loader:"style-loader",
      options: {
        injectType: "singletonStyleTag" // 将所 有的style标签合并成⼀个
      }
    },"css-loader"]
}
```

- Less样式处理：less-loader 把less语法转换成css

```
 $ npm install less less-loader --save-dev
```

案例: loader有顺序，从右到左，从下到上

```json
{
  test: /\.scss$/,
  use: ["style-loader", "css-loader", "less-loader"]
}
```

样式⾃自动添加前缀:

https://caniuse.com/

Postcss-loader

```bash
 npm i  postcss-loader autoprefixer -D
```

新建postcss.config.js

```js
//webpack.config.js
{
  test: /\.css$/,
  use: ["style-loader", "css-loader", "postcss-
loader"]
},
```
```js
//postcss.config.js
module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: ["last 2 versions",">1%"] })
  ]
};
```

loader 处理webpack不⽀持的格式⽂件，模块 ⼀个loader只处理⼀件事情
 loader有执行顺序

5.Plugins

作⽤于webpack打包整个过程 webpack的打包过程是有(⽣命周期概念)钩⼦子

plugin 可以在webpack运行到某个阶段的时候，帮你做⼀些事情， 类似于⽣命周期的概念



扩展插件，在 Webpack 构建流程中的特定时机注⼊扩展逻辑来改 变构建结果或做你想要的事情。

作⽤于整个构建过程

HtmlWebpackPlugin

htmlwebpackplugin会在打包结束后，⾃自动⽣成⼀个html⽂件，并 把打包⽣成的js模块引⼊到该html中。

```
 npm install --save-dev html-webpack-plugin
```

配置:

~~~md
title: ⽤来⽣成⻚⾯的 title 元素
 filename: 输出的 HTML ⽂件名，默认是 index.html, 也可以直 接配置带有⼦子⽬录。
 template: 模板⽂件路路径，⽀持加载器器，⽐比如 html!./index.html
 inject: true | 'head' | 'body' | false ,注⼊所有的资 源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元 素的底部，'head' 将放置到 head 元素中。
 favicon: 添加特定的 favicon 路路径到输出的 HTML ⽂件中。 minify: {} | false , 传递 html-minifier 选项给 minify 输出
 hash: true | false, 如果为 true, 将添加⼀个唯⼀的 webpack 编译 hash 到所有包含的脚本和 CSS ⽂件，对于解除 cache 很有⽤。
 cache: true | false，如果为 true, 这是默认值，仅仅在⽂件 修改之后才会发布⽂件。
 showErrors: true | false, 如果为 true, 这是默认值，错误 信息会写⼊到 HTML ⻚⾯中
 chunks: 允许只添加某些块 (⽐比如，仅仅 unit test 块) chunksSortMode: 允许控制块在添加到⻚⾯之前的排序⽅式，⽀持 的值:'none' | 'default' | {function}-default:'auto' excludeChunks: 允许跳过某些块，(⽐比如，跳过单元测试的块)
~~~

案例:

```
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-
plugin");
```



```js
module.exports = {
  ...
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
    <meta name="viewport" content="width=device-
width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible"
content="ie=edge" />
    <title><%= htmlWebpackPlugin.options.title %>
</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

#### clean-webpack-plugin

```
 npm install --save-dev clean-webpack-plugin
```

```js
const { CleanWebpackPlugin } = require("clean-
webpack-plugin");
```

```
plugins: [
    new CleanWebpackPlugin()
]
```

#### mini-css-extract-plugin

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
{
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, "css-loader"]
}
```

```js
new MiniCssExtractPlugin({
  filename: "[name][chunkhash:8].css"
})
```

chunk:⼀个⼊⼝肯定是⼀个chunk，但是⼀个chunk不⼀定只有 ⼀个依赖

webpack5.x 减少hash的概念 Contenthash

## 6.sourceMap

源代码与打包后的代码的映射关系，通过sourceMap定位到源代 码。

在dev模式中，默认开启，关闭的话 可以在配置⽂件里 

```
devtool:"none"
```

devtool的介绍:https://webpack.js.org/configuration/devtool#d evtool

eval:速度最快,使⽤eval包裹模块代码,

source-map: 产⽣.map⽂件

cheap:较快，不包含列列信息

Module:第三⽅模块，包含loader的sourcemap(⽐比如jsx to js ， babel的sourcemap)

inline: 将.map作为DataURI嵌⼊，不单独⽣成.map⽂件 配置推荐:

## WebpackDevServer

- 提升开发效率的利利器器
  每次改完代码都需要重新打包⼀次，打开浏览器器，刷新⼀次，很麻烦,我们可以安装使⽤webpackdevserver来改善这块的体验
- 安装

devtool:"cheap-module-eval-source-map",// 开发环境配置

//线上不推荐开启
 devtool:"cheap-module-source-map", // 线上⽣成配置

```
npm install webpack-dev-server -D
```

配置 修改下package.json

在webpack.config.js配置:

启动

```
 npm run server
```

启动服务后，会发现dist⽬录没有了，这是因为devServer把打包后 的模块不会放在dist⽬录下，⽽是放到内存中，从⽽提升速度

- 本地mock,解决跨域: 联调期间，前后端分离，直接获取数据会跨域，上线后我们使⽤

nginx转发，开发期间，webpack就可以搞定这件事 启动⼀个服务器，mock⼀个接⼝:

~~~json
// npm i express -D
"scripts": {
  "server": "webpack-dev-server"
},
devServer: {
  contentBase: "./dist",
  open: true,
  port: 8081
},
~~~

```js
// 创建⼀个server.js 修改scripts "server":"node server.js"
//server.js

const express = require('express')
const app = express()
app.get('/api/info', (req,res)=>{
  res.json({
    name:'开课吧',
    age:5, msg:'欢迎来到开课吧学习前端⾼高级课程'
  })
})

app.listen('9092')
//node server.js
http://localhost:9092/api/info
```

项⽬中安装axios⼯具

```
//npm i axios -D
```

//index.js

```js
import axios from 'axios'
axios.get('http://localhost:9092/api/info').then(res
=>{
    console.log(res)
})
```

会有跨域问题

修改webpack.config.js 设置服务器代理

```json
proxy: {
  "/api": {
    target: "http://localhost:9092"
  }
}
```

修改index.js

```js
axios.get("/api/info").then(res => {
  console.log(res);
});
```

### Hot Module Replacement (HMR:热模块 替换)



- 不⽀持抽离出的css 我们要使⽤css-loader 启动hmr

~~~js
devServer: {
  contentBase: "./dist",
    open: true,
      hot:true, //即便便HMR不⽣效，浏览器器也不⾃自动刷新，就开启hotOnly hotOnly:true
},
~~~

配置⽂件头部引⼊webpack

```js
//const path = require("path");
//const HtmlWebpackPlugin = require("html-webpack-plugin");
//const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
```

在插件配置处添加:

```js
plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
```

案例:

//index.js

```
import "./css/index.css";

var btn = document.createElement("button");
btn.innerHTML = "新增";
document.body.appendChild(btn);

btn.onclick = function() {
  var div = document.createElement("div");
  div.innerHTML = "item";
  document.body.appendChild(div);
};
```

```css
//index.css
div:nth-of-type(odd) {
  background: yellow;
}
```



注意启动HMR后，css抽离会不⽣效，还有不⽀持contenthash， chunkhash

处理js模块HMR 需要使⽤module.hot.accept来观察模块更新 从⽽更新

案例:

```js
//counter.js
function counter() {
  var div = document.createElement("div");
  div.setAttribute("id", "counter");
  div.innerHTML = 1;
  div.onclick = function() {
    div.innerHTML = parseInt(div.innerHTML, 10) + 1;
  };
  document.body.appendChild(div);
}
export default counter;
```

//number.js

```js
function number() {
  var div = document.createElement("div");
  div.setAttribute("id", "number");
  div.innerHTML = 13000;
  document.body.appendChild(div);
}
export default number;
```



//index.js

```js
import counter from "./counter";
import number from "./number";
counter();
number();

if (module.hot) {
  module.hot.accept("./b", function() {
   document.body.removeChild(document.getElementById("number"));
    number();
  });
}
```

### Babel处理ES6

官⽅⽹网站:https://babeljs.io/ 

中⽂⽹网站:https://www.babeljs.cn/

Babel是JavaScript编译器，能将ES6代码转换成ES5代码，让我们 开发过程中放⼼使⽤JS新特性⽽不⽤担⼼兼容性问题。并且还可以 通过插件机制根据需求灵活的扩展。



Babel在执行编译的过程中，会从项⽬根⽬录下的 .babelrc JSON ⽂件中读取配置。没有该⽂件会从loader的options地⽅读取配 置。

#### 测试代码

```js
//index.js
const arr = [new Promise(() => {}), new Promise(()
=> {})];
arr.map(item => {
  console.log(item);
});
```

#### 安装

~~~bash
npm i babel-loader @babel/core @babel/preset-env -D
~~~

 1.babel-loader是webpack 与 babel的通信桥梁梁，不会做把es6转成

es5的⼯作，这部分⼯作需要⽤到@babel/preset-env来做 2.@babel/preset-env里包含了es，6，7，8转es5的转换规则

Ecma 5 6 7 8... 草案(评审通过的，还有未通过的) ⾯向未来的
 env是babel7之后推行的预设插件
 env{




ecma 5 ecma 6 ecma 7 ecma 8 。。。 }

Webpack.config.js

通过上⾯的⼏步 还不够，默认的Babel只⽀持let等⼀些基础的特性 转换，Promise等⼀些还有转换过来，这时候需要借助 @babel/polyfill，把es的新特性都装进来，来弥补低版本浏览器中 缺失的特性

```json
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"]
    }
  }
}
```

#### @babel/polyfill

以全局变量的⽅式注⼊进来的。windows.Promise，它会造成全局 对象的污染

```
 npm install --save @babel/polyfill
```

//index.js 顶部
 import "@babel/polyfill";

按需加载，减少冗余

会发现打包的体积⼤大了很多，这是因为polyfill默认会把所有特性注 ⼊进来，假如我想我⽤到的es6+，才会注⼊，没⽤到的不注⼊，从 ⽽减少打包的体积，可不可以呢

当然可以 修改Webpack.config.js


```js
options: {
  [
    presets: [
    "@babel/preset-env",
    {
    targets: {
    edge: "17",
    firefox: "60",
    chrome: "67",
    safari: "11.1"
    },
    corejs: 2,//新版本需要指定核⼼库版本
    useBuiltIns: "usage"//按需注⼊ 
}
]
]
}
```

useBuiltIns选项是babel 7的新功能，这个选项告诉babel如何 配置@babel/polyfill。 它有三个参数可以使⽤: 1entry: 需要 在webpack的⼊⼝⽂件里import "@babel/polyfill"⼀
 次。 babel 会根据你的使⽤情况导⼊垫⽚，没有使⽤的功能不会被 导⼊相应的垫⽚。 2usage: 不需要import，全⾃自动检测，但是要 安装@babel/polyfill。(试验阶段) 3false: 如果你import "@babel/polyfill" ，它不会排除掉没有使⽤的垫⽚，程序体积会 庞⼤大。(不推荐)

请注意: usage 的行为类似 babel-transform-runtime，不会造成 全局污染，因此也会不会对类似 Array.prototype.includes() 进行 polyfill。

扩展:
 babelrc⽂件: 新建.babelrc⽂件，把options部分移⼊到该⽂件中，就可以了



```
//.babelrc
{
 presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          edge: "17",
          firefox: "60",
          chrome: "67",
          safari: "11.1"
},
 corejs: 2, //新版本需要指定核⼼库版本 useBuiltIns: "usage" //按需注⼊

} ]

] }

//webpack.config.js
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel-loader"
}
```

### 配置React打包环境 安装



```
npm install react react-dom --save
```

编写react代码:



```js
//index.js
import React, { Component } from "react";
import ReactDom from "react-dom";
class App extends Component {
  render() {
    return <div>hello world</div>;
  }
}
```

```
ReactDom.render(<App />,
document.getElementById("app"));
```

安装babel与react转换的插件:
 npm install --save-dev @babel/preset-react

在babelrc⽂件里添加:

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1",
          "Android":"6.0"
        },
        "useBuiltIns": "usage", //按需注⼊
      }
    ],
    "@babel/preset-react"
  ]
}

```
如果是库的作者的话，提供模块的时候代码怎么打包的?
构建速度会越来越慢，怎么优化
扩展:
多⻚⾯打包通⽤⽅案
```json
entry:{
  index:"./src/index",
  list:"./src/list",
  detail:"./src/detail"
}

new htmlWebpackPlugins({
  title: "index.html",
  template: path.join(__dirname, "./src/index/index.html"),
  filename:"index.html",
  chunks:[index]
})
```
1.⽬录结构调整 src

index

index.js

index.html list

index.js

index.html detail

index.js

index.html
 2.使⽤ glob.sync 第三⽅库来匹配路径

```
npm i glob -D
const glob = require("glob")
```

```js
//MPA多⻚⾯打包通⽤⽅案
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  return {
    entry,
    htmlWebpackPlugins
  }; 
};
```

```

```



```js
const { entry, htmlWebpackPlugins } = setMPA();
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname,"./src/*/index.js"));
  entryFiles.map((item, index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js$/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(
      new htmlWebpackPlugin({
        title: pageName,
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true
      })
    ); 
  });
  return {
    entry,
    htmlWebpackPlugins
  }; 
};


const { entry, htmlWebpackPlugins } = setMPA();
module.exports = {
  entry,
  output:{
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js"
  }
  plugins: [
  // ...
  ...htmlWebpackPlugins//展开数组 
 	]
}
```

## 扩展

### @babel/plugin-transform-runtime

当我们开发的是组件库，⼯具库这些场景的时候，polyfill就不适合 了，因为polyfill是注⼊到全局变量，window下的，会污染全局环 境，所以推荐闭包⽅式:@babel/plugin-transform-runtime，它 不会造成全局污染

安装

```
npm install --save-dev @babel/plugin-transform-
runtime
npm install --save @babel/runtime
```



修改配置⽂件:注释掉之前的presets，添加plugins

```js
options: {
    presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          edge: "17",
          firefox: "60",
          chrome: "67",
          safari: "11.1"
        },
        useBuiltIns: "usage",
        corejs: 2
} ]
  ],
"plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      } ]
] }
```

### ⽂件监听

```
轮询判断⽂件的最后编辑时间是否变化，某个⽂件发⽣了变化，并
不会⽴刻告诉监听者，先缓存起来
```

webpack开启监听模式，有两种

1.启动webpack命令式 带上--watch 参数，启动监听后，需要⼿手动刷新浏览器

```
scripts:{
    "watch":"webpack --watch"
```

}

2.在配置⽂件里设置 watch:true

~~~js
watch: true, //默认false,不开启 //配合watch,只有开启才有作⽤
  watchOptions: {
    //默认为空，不监听的⽂件或者⽬录，⽀持正则
    ignored: /node_modules/, 
      //监听到⽂件变化后，等300ms再去执行行，默认300ms,
    aggregateTimeout: 300, //判断⽂件是否发⽣变化是通过不停的询问系统指定⽂件有没有变化，默认每秒问1次 
    poll: 1000 //ms 轮询 1s查看1次
  }
}
~~~
