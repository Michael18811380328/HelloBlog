# Webpack-Day3

2021-10-27

## 本地开发服务

### 前端跨域设置代理 proxy

问题：前后端分离开发时，后端还没有写好代码，前端只能自己搭建一个临时服务器。如果临时的服务器和 webpack-dev-server 的端口不一致，那么会出现跨域的问题，所以需要解决，可以设置代理。

后端会给出接口文档和联调日期；前端在联调前，需要独立开发；上线后使用 nginx 处理跨域。

只要 UI 给出交稿日期，对接完成，前端就可以开始工作。

~~~js
// 使用 express mock 数据，服务器端口号 8080 
const express = require('express');
const app = express();

app.get("api/comment", (req, res) => {
  res.json({
    data: 'hi'
  })
})

app.listen("8080")
// 然后在终端中直接 node 执行这个文件，即可开启本地临时服务器
~~~

那么我们可以在 webpack 设置中更改 proxy 属性：遇到 /api 开头的请求就转发到 8080 端口

~~~json
{
  devServer: {
    contentBase: "./dist",
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
      }
    },
    port: 8000,
  }
}
~~~

然后在前端 js 请求中，需要改成

~~~js
import axios from "axios";

axios.get("/api/comment").then((res) => {
  console.log(res);
});
~~~

### mockServer

上面的方法，需要写临时的后端代码，工作量较大。实际可以直接 mock 服务器，使用 webpack 钩子

~~~json
{
  devServer: {
    contentBase: "./dist",
    open: true,
    proxy: {
      "./api": {
        target: "http://localhost:8080",
      }
    },
    before(app, server) {
      app.get("api/comment", (req, res) => {
        res.json({ data: "hello" });
      })
    }
  },
  port: 8000,
}
~~~

这样发出请求后，在前处理的钩子中，直接把这个请求拦截并返回数据，就模拟了服务器。

### HMR 热模块替换

hot module replacement 首先在浏览器中点击交互，更改代码后，浏览器刷新，但是已有的交互不消失，直接改变颜色或者内容；在调节样式时很方便。

配置文件头部引入 webpack，然后更改配置：

~~~json
const webpack = require('webpack');

{
  devServer: {
    contentBase: "./dist",
    open: true,
    hot: true,
    hotOnly: true, // 开启 HMR
  },
  plugin: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new webpack.HotModuleReplacementPlugin(), // 开启 HMR
  ],
}
~~~

#### CSS 的 HMR

MiniCssExtractPlugin 在开发阶段，可能和 webpackDevServer 的 hot 热启动冲突。当更改了样式后，不会自动刷新界面中的颜色。此时把这个 mini 去掉，改成默认的 style-loader 即可实现。

注意：

- HMR热模块更新用于开发环境，抽取CSS插件用于生产环境，设置不同的 webpack 配置。

- HMR 不支持 chunkHash contentHash （chunkHash 用于 JS 模块名称，contentHash 用于 css  模块名称）

#### JS 的 HMR

原理：通过 module.hot.accept 来观察模块更新，然后直接更新节点（下面代码是原理）

~~~js
import number from "./number";
import comment from "./comment";

// 导入两个模块并初始化
number();
comment();

// 如果支持模块更新
if (module.hot) {
  // 如果观察到模块更新
  module.hot.accept('./b', function() {
    document.body.removeChild(document.getElementById("number"));
    number();
  });
}
~~~

实际使用 loader 实现 JS 的 HMR（React hot loader, Vue loader），不需要自己手写 JS HMR

## ES6 处理

### babel

babel 是 JS 的编译器（语法转换器）

Babel 处理 ES6（最新版本是 7.15，一切以最新版本为准，https://babeljs.io/）

~~~bash
npm install -D @babel/core @babel/preset-env
~~~

可以直接在 webpack.config.js 中设置
~~~json
{
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
    ]
  }
}
~~~

### pollyfill

问题：Babel 可以转换箭头函数，但无法转换 Promise，需要使用垫片 polyfill （ES6+的规范库）

polyfill 不会转换语法，只是加一个垫片（没有 Promise 就在前面预设一个函数）转换功能是 @babel/core 中的部分

垫片（polyfill）不是编译器，不会更改代码；就是在编译前定义一个 Promise 绑定在 window 上。优点可以支持不同的语法，适合实际生产项目；缺点：会污染全局环境，不适合在组件库中使用。

组件库可以使用 @babel/plugin-transform-runtime 闭包形式，不会污染全局环境（具体参考官网）

~~~bash
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
~~~

垫片如果全部使用，支持的语法较多，那么会大大增加打包后的大小，所以需要按需加载。

### 按需加载

tip：VS code 中，ctrl + shift + O 查找函数名

按需加载后的配置

~~~json
{
  test: /\.js$/,
  exclude: /node_mpodules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: [
        [
          "@babel/preset-env",
          {
            target: {
              edge: "17",
              firefox: "60",
              chrome: "67",
              safari: "11.1"
            },
            corejs: 2, // 新版本需要指定核心库版本
            useBuiltIns: "usage", // 按需加载 polyfill
          }
        ]
      ], 
    }
  }
}
~~~

useBuiltIns 可以支持 "usage" "entry" "false" 三个属性

”usage" 不需要在文件中 import，需要手动安装 "@babel/polyfill"

也可以单独写在 .babelrc 中

~~~json
{
  presets: [
    [
      "@babel/preset-env",
      {
        target: {
          edge: "17",
          firefox: "60",
          chrome: "67",
          safari: "11.1"
        },
        corejs: 2, // 新版本需要指定核心库版本
        useBuiltIns: "usage", // 按需加载 polyfill
      }
    ]
  ]
}
~~~

Babel 中的 stage-0 stage-2 等已经过时了，现在直接使用 @babel/preset-env 即可

其他的教程或者项目需要注意版本

## 配置 react 打包环境

~~~bash
npm install react react-dom --save
~~~

使用 @babel/preset-react，在 babelrc 中

~~~json
{
  presets: [
    [
      "@babel/preset-env",
      {
        target: {
          edge: "17",
          firefox: "60",
          chrome: "67",
          safari: "11.1"
        },
        corejs: 2, // 新版本需要指定核心库版本
        useBuiltIns: "usage", // 按需加载 polyfill
      }
    ],
    "@babel/preset-react"
  ]
}
~~~

注：以上配置适应于 7 版本；不适用于 6 版本



## 原始课程笔记

作业:

webpack⽀支持第三⽅方字体 第⼆个作业，实现vue开发环境的配置

loader: file-loader:处理理静态资源模块
 loader: file-loader 原理理是把打包⼊口中识别出的资源模块，移动到输出⽬目录，并且返回⼀个地址名称

所以我们什什么时候⽤file-loader呢? 场景:就是当我们需要模块，仅仅是从源代码挪移到打包⽬目录，就可以使⽤file-loader来处理理，

txt，svg，csv，excel，图⽚片资源啦等等 npm install file-loader -D

案例:

```json
module: {
    rules: [


{
 test: /\.(png|jpe?g|gif)$/, //use使⽤⼀个loader可以⽤对象，字符串串，两个loader需要⽤数组



use: {
 loader: "file-loader",
 // options额外的配置，⽐比如资源名称 options: {

// placeholder 占位符 [name]⽼老老资源模块的名称
 // [ext]⽼老老资源模块的后缀
 // https://webpack.js.org/loaders/file-loader#placeholders name: "[name]_[hash].[ext]",
 //打包后的存放位置
 outputPath: "images/"

} }

} ]

},
```


```js
import pic from "./logo.png";
var img = new Image();
img.src = pic;
img.classList.add("logo");
var root = document.getElementById("root");
root.append(img);
```

处理理字体 https://www.iconfont.cn/?spm=a313x.7781069.1998910419.d4d0a486a

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

### url-loader file-loader加强版本

url-loader内部使⽤了了file-loader,所以可以处理理file-loader所有的事情，但是遇到jpg格式的模块， 会把该图⽚片转换成base64格式字符串串，并打包到js⾥里里。对⼩小体积的图⽚片⽐比较合适，⼤大图⽚片不不合 适。

```
  npm install url-loader -D
```

案例;

样式处理理:

Css-loader 分析css模块之间的关系，并合成⼀个css
 Style-loader 会把css-loader⽣成的内容，以style挂载到⻚页⾯面的heade部分

```
  npm install style-loader css-loader -D
module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
```

name: "[name]_[hash].[ext]", outputPath: "images/", //⼩小于2048，才转换成base64 limit: 2048

} }

} ]

},



```
{
  test: /\.css$/,
  use: ["style-loader", "css-loader"]
```

}

```
{
  test:/\.css$/,
    use:[{
      loader:"style-loader",
      options: {
```

injectType: "singletonStyleTag" // 将所有的style标签合并成⼀个 }

```
    },"css-loader"]
}
```

Less样式处理理
 less-load 把less语法转换成css

```
  $ npm install less less-loader --save-dev
```

案例: loader有顺序，从右到左，从下到上

样式⾃自动添加前缀:

https://caniuse.com/

Postcss-loader

```
  npm i  postcss-loader autoprefixer -D
```

新建postcss.config.js //webpack.config.js

```
{
  test: /\.scss$/,
  use: ["style-loader", "css-loader", "less-loader"]
```

}



```
{
  test: /\.css$/,
  use: ["style-loader", "css-loader", "postcss-loader"]
```

},

```
//postcss.config.js
module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: ["last 2 versions", ">1%"]
```

}) ]

};

loader 处理理webpack不不⽀支持的格式⽂文件，模块 ⼀个loader只处理理⼀件事情
 loader有执⾏行行顺序

5.Plugins

作⽤于webpack打包整个过程 webpack的打包过程是有(⽣命周期概念)钩⼦子

plugin 可以在webpack运⾏行行到某个阶段的时候，帮你做⼀些事情，类似于⽣命周期的概念 扩展插件，在 Webpack 构建流程中的特定时机注⼊扩展逻辑来改变构建结果或做你想要的事情。 作⽤于整个构建过程

HtmlWebpackPlugin

htmlwebpackplugin会在打包结束后，⾃自动⽣成⼀个html⽂文件，并把打包⽣成的js模块引⼊到该html 中。

```
  npm install --save-dev html-webpack-plugin
```

配置:



title: ⽤来⽣成⻚页⾯面的 title 元素
 filename: 输出的 HTML ⽂文件名，默认是 index.html, 也可以直接配置带有⼦子⽬目录。
 template: 模板⽂文件路路径，⽀支持加载器器，⽐比如 html!./index.html
 inject: true | 'head' | 'body' | false ,注⼊所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
 favicon: 添加特定的 favicon 路路径到输出的 HTML ⽂文件中。
 minify: {} | false , 传递 html-minifier 选项给 minify 输出
 hash: true | false, 如果为 true, 将添加⼀个唯⼀的 webpack 编译 hash 到所有包含的脚本和 CSS ⽂文件，对于解除 cache 很有⽤。
 cache: true | false，如果为 true, 这是默认值，仅仅在⽂文件修改之后才会发布⽂文件。 showErrors: true | false, 如果为 true, 这是默认值，错误信息会写⼊到 HTML ⻚页⾯面中 chunks: 允许只添加某些块 (⽐比如，仅仅 unit test 块)
 chunksSortMode: 允许控制块在添加到⻚页⾯面之前的排序⽅方式，⽀支持的值:'none' | 'default' | {function}-default:'auto'
 excludeChunks: 允许跳过某些块，(⽐比如，跳过单元测试的块)

案例:

```js
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
 ...
  plugins: [
    new htmlWebpackPlugin({
      title: "My App",
      filename: "app.html",
      template: "./src/index.html"
```

}) ]

};

```
//index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
<div id="root"></div>
```



```
  </body>
</html>
```

clean-webpack-plugin

```
  npm install --save-dev clean-webpack-plugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
```

...

```
plugins: [
    new CleanWebpackPlugin()
```

]

mini-css-extract-plugin

```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
{
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, "css-loader"]
```

}

})

```
new MiniCssExtractPlugin({
  filename: "[name][chunkhash:8].css"
```

chunk:⼀个⼊口肯定是⼀个chunk，但是⼀个chunk不不⼀定只有⼀个依赖 

webpack5.x 减少hash的概念 Contenthash

6.sourceMap

源代码与打包后的代码的映射关系，通过sourceMap定位到源代码。 在dev模式中，默认开启，关闭的话 可以在配置⽂文件⾥里里

```
  devtool:"none"
```

devtool的介绍:https://webpack.js.org/configuration/devtool#devtool eval:速度最快,使⽤eval包裹模块代码,
 source-map: 产⽣ .map ⽂文件
 cheap:较快，不不包含列列信息
 Module:第三⽅方模块，包含loader的sourcemap(⽐比如jsx to js ，babel的sourcemap) inline: 将 .map 作为DataURI嵌⼊，不不单独⽣成 .map ⽂文件

配置推荐:

WebpackDevServer

提升开发效率的利利器器 每次改完代码都需要重新打包⼀次，打开浏览器器，刷新⼀次，很麻烦,我们可以安装使⽤

webpackdevserver来改善这块的体验 安装

```
   npm install webpack-dev-server -D
```

配置 修改下package.json

devtool:"cheap-module-eval-source-map",// 开发环境配置

//线上不不推荐开启
 devtool:"cheap-module-source-map", // 线上⽣成配置



```
"scripts": {
    "server": "webpack-dev-server"
```

},

在webpack.config.js配置:

启动

```
  npm run server
```

启动服务后，会发现dist⽬目录没有了了，这是因为devServer把打包后的模块不不会放在dist⽬目录下，⽽而是放 到内存中，从⽽而提升速度

本地mock,解决跨域: 前后端分离

前端和后端是可以并⾏行行开发的，
 前端会依赖后端的接⼝口 先给接⼝口⽂文档，和接⼝口联调⽇日期的 我们前端就可以本地mock数据，不不打断⾃自⼰己的开发节奏

开发y⼀个项⽬目 进⼊⼀个项⽬目组 评审会议
 多⽅方介⼊
 多⽅方给出⽇日期 UI给出的⽇日期=你开始coding的时间点 服务端的接⼝口

```
有多少个⻚页⾯面
接⼝口数量量
字段
给出接⼝口⽂文档时间点
devServer: {
    contentBase: "./dist",
    open: true,
    port: 8081
```

},



mock数据

是否有字段的变化 接⼝口的变化 ⼀定要同步

成⽴立项⽬目组

⼤大家坐在⼀块

联调期间，前后端分离，直接获取数据会跨域，上线后我们使⽤nginx转发，开发期间，webpack就可 以搞定这件事

启动⼀个服务器器，mock⼀个接⼝口:

项⽬目中安装axios⼯工具

// npm i express -D
 // 创建⼀个server.js 修改scripts "server":"node server.js"

//server.js

```
const express = require('express')
const app = express()
app.get('/api/info', (req,res)=>{
    res.json({
```

name:'开课吧',
 age:5, msg:'欢迎来到开课吧学习前端⾼高级课程'

}) })

```
app.listen('9092')
//node server.js
http://localhost:9092/api/info
//npm i axios -D
```

//index.js

```
import axios from 'axios'
axios.get('http://localhost:9092/api/info').then(res=>{
    console.log(res)
})
```

会有跨域问题



修改webpack.config.js 设置服务器器代理理

```
proxy: {
      "/api": {
        target: "http://localhost:9092"
      }
```

}

修改index.js

Hot Module Replacement (HMR:热模块替换) 不不⽀支持抽离出的css 我们要使⽤css-loader

启动hmr

```
axios.get("/api/info").then(res => {
  console.log(res);
```

});

devServer: {
 contentBase: "./dist",
 open: true,
 hot:true, //即便便HMR不不⽣效，浏览器器也不不⾃自动刷新，就开启hotOnly hotOnly:true

},

配置⽂文件头部引⼊webpack

```
//const path = require("path");
//const HtmlWebpackPlugin = require("html-webpack-plugin");
//const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
```

在插件配置处添加:



```json
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

```js
import "./css/index.css";


var btn = document.createElement("button"); btn.innerHTML = "新增"; document.body.appendChild(btn);

btn.onclick = function() {
  var div = document.createElement("div");
  div.innerHTML = "item";
  document.body.appendChild(div);
};
```

//index.css

```css
div:nth-of-type(odd) {
  background: yellow;
```

}

注意启动HMR后，css抽离会不不⽣效，还有不不⽀支持contenthash，chunkhash

处理理js模块HMR 需要使⽤module.hot.accept来观察模块更更新 从⽽而更更新

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
```

}

### Babel处理理ES6

官⽅方⽹网站:https://babeljs.io/ 中⽂文⽹网站:https://www.babeljs.cn/

Babel是JavaScript编译器器，能将ES6代码转换成ES5代码，让我们开发过程中放⼼心使⽤JS新特性⽽而不不⽤担 ⼼心兼容性问题。并且还可以通过插件机制根据需求灵活的扩展。

Babel在执⾏行行编译的过程中，会从项⽬目根⽬目录下的 .babelrc JSON⽂文件中读取配置。没有该⽂文件会从 loader的options地⽅方读取配置。

测试代码



//index.js

```JS
const arr = [new Promise(() => {}), new Promise(() => {})];
arr.map(item => {
  console.log(item);
```

});

安装

npm i babel-loader @babel/core @babel/preset-env -D
 1.babel-loader是webpack 与 babel的通信桥梁梁，不不会做把es6转成es5的⼯工作，这部分⼯工作需要⽤到

@babel/preset-env来做 2.@babel/preset-env⾥里里包含了了es，6，7，8转es5的转换规则

Ecma 5 6 7 8... 草案(评审通过的，还有未通过的) ⾯面向未来的
 env是babel7之后推⾏行行的预设插件
 env{

ecma 5 ecma 6 ecma 7 ecma 8 。。。 }

Webpack.config.js

```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"]
    }
```

} }



通过上⾯面的⼏几步 还不不够，默认的Babel只⽀支持let等⼀些基础的特性转换，Promise等⼀些还有转换过 来，这时候需要借助@babel/polyfill，把es的新特性都装进来，来弥补低版本浏览器器中缺失的特性

@babel/polyfill

以全局变量量的⽅方式注⼊进来的。windows.Promise，它会造成全局对象的污染 npm install --save @babel/polyfill

//index.js 顶部
 import "@babel/polyfill";

按需加载，减少冗余

会发现打包的体积⼤大了了很多，这是因为polyfill默认会把所有特性注⼊进来，假如我想我⽤到的es6+，才 会注⼊，没⽤到的不不注⼊，从⽽而减少打包的体积，可不不可以呢

当然可以 修改Webpack.config.js

options: {
 [

presets: [

} ]

] }

```js
"@babel/preset-env",
{
  targets: {
    edge: "17",
    firefox: "60",
    chrome: "67",
    safari: "11.1"
```

},
 corejs: 2,//新版本需要指定核⼼心库版本 useBuiltIns: "entry"//按需注⼊



useBuiltIns 选项是 babel 7 的新功能，这个选项告诉 babel 如何配置 @babel/polyfill 。 它有三 个参数可以使⽤: 1entry: 需要在 webpack 的⼊口⽂文件⾥里里 import "@babel/polyfill" ⼀
 次。 babel 会根据你的使⽤情况导⼊垫⽚片，没有使⽤的功能不不会被导⼊相应的垫⽚片。 2usage: 不不需要

import ，全⾃自动检测，但是要安装 @babel/polyfill 。(试验阶段) 3false: 如果你 import "@babel/polyfill" ，它不不会排除掉没有使⽤的垫⽚片，程序体积会庞⼤大。(不不推荐)

请注意: usage 的⾏行行为类似 babel-transform-runtime，不不会造成全局污染，因此也会不不会对类似 Array.prototype.includes() 进⾏行行 polyfill。

扩展:
 babelrc⽂文件: 新建.babelrc⽂文件，把options部分移⼊到该⽂文件中，就可以了了

//.babelrc

```
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
 corejs: 2, //新版本需要指定核⼼心库版本 useBuiltIns: "usage" //按需注⼊

} ]

] }
```


```js
//webpack.config.js
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel-loader"
```

}



### 配置React打包环境 安装

```
  npm install react react-dom --save
```

编写react代码:

//index.js

```js
import React, { Component } from "react";
import ReactDom from "react-dom";
class App extends Component {
  render() {
    return <div>hello world</div>;
  }
}
ReactDom.render(<App />, document.getElementById("app"));
```

安装babel与react转换的插件:
 npm install --save-dev @babel/preset-react

在babelrc⽂文件⾥里里添加:

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

"useBuiltIns": "usage", //按需注⼊ }

],


    "@babel/preset-react"


]



}

```
如果是库的作者的话，提供模块的时候代码怎么打包的?
构建速度会越来越慢，怎么优化
扩展:
多⻚页⾯面打包通⽤⽅方案
entry:{
  index:"./src/index",
  list:"./src/list",
  detail:"./src/detail"
```

}

```json
new htmlWebpackPlugins({
  title: "index.html",
  template: path.join(__dirname, "./src/index/index.html"),
  filename:"index.html",
  chunks:[index]
```

})

1.⽬目录结构调整 src

index

index.js

index.html list

index.js

index.html detail

index.js

index.html
 2.使⽤ glob.sync 第三⽅方库来匹配路路径

```
npm i glob -D
const glob = require("glob")
```



//MPA多⻚页⾯面打包通⽤⽅方案

```js
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  return {
    entry,
    htmlWebpackPlugins
```

}; };

```js
const { entry, htmlWebpackPlugins } = setMPA();
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));
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


}) );

}); return {

entry,


    htmlWebpackPlugins


}; };


const { entry, htmlWebpackPlugins } = setMPA();




```js
module.exports = {
  entry,
  output:{
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js"
}
 plugins: [

// ...

...htmlWebpackPlugins//展开数组 ]

}
```

### Hash chunkhash contenthash 3者的区别

main-1d9cc22e

扩展

@babel/plugin-transform-runtime

当我们开发的是组件库，⼯工具库这些场景的时候，polyfill就不不适合了了，因为polyfill是注⼊到全局变量量， window下的，会污染全局环境，所以推荐闭包⽅方式:@babel/plugin-transform-runtime，它不不会造 成全局污染

安装

修改配置⽂文件:注释掉之前的presets，添加plugins

```
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
options: {
    presets: [
```

[



```
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
```

} ]

```
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
```

} ]

] }

⽂文件监听

轮询判断⽂文件的最后编辑时间是否变化，某个⽂文件发⽣了了变化，并不不会⽴立刻告诉监听者，先缓存起来 webpack开启监听模式，有两种

1.启动webpack命令式 带上--watch 参数，启动监听后，需要⼿手动刷新浏览器器

```
scripts:{
    "watch":"webpack --watch"
```

}

2.在配置⽂文件⾥里里设置 watch:true

watch: true, //默认false,不不开启 //配合watch,只有开启才有作⽤ watchOptions: {

//默认为空，不不监听的⽂文件或者⽬目录，⽀支持正则 ignored: /node_modules/,



//监听到⽂文件变化后，等300ms再去执⾏行行，默认300ms,
 aggregateTimeout: 300, //判断⽂文件是否发⽣变化是通过不不停的询问系统指定⽂文件有没有变化，默认每秒问1次 poll: 1000 //ms

}

轮询 1s查看1次

