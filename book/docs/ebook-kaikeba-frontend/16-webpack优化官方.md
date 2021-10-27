# webpack性能优化 优化开发体验

这部分对应视频教程中 456 三节，原始笔记比较乱。

这三节视频较长，讲师水平一般，根据实际情况学习。



#### 优化开发体验

提升效率；优化构建速度；优化使⽤体验

#### 优化输出质量

优化要发布到线上的代码，减少⽤户能感知到的加载时间；提升代码性能，性能好，执⾏就快

缩⼩小⽂文件范围

Loader 优化loader配置

test include exclude三个配置项来缩小 loader 的处理范围 推荐 include

```js
include: path.resolve(__dirname, "./src"),
```

#### 优化 resolve.modules 配置

resolve.modules ⽤于配置 webpack 去哪些⽬录下寻找第三⽅模块，默认是\['node_modules']

寻找第三⽅模块，默认是在当前项⽬目⽬目录下的node_modules⾥面去找，如果没有找到，就会去上⼀级目录../node_modules找，再没有会去../../node_modules中找，以此类推，和Node.js的模块寻找机制很类似。

如果我们的第三⽅模块都安装在了了项⽬根目录下，就可以直接指明这个路径。

#### 优化 resolve.alias 配置

resolve.alias配置通过别名来将原导入路径映射成⼀个新的导⼊路径

拿react为例，我们引⼊入的react库，⼀般存在两套代码

cjs 采⽤commonJS规范的模块化代码，umd 已经打包好的完整代码，没有采⽤模块化，可以直接执⾏

默认情况下，webpack会从⼊口⽂件 ./node_modules/bin/react/index 开始递归解析和处理依赖的文件。我们可以直接指定⽂件，避免这处的耗时。

```js
module.exports={
  resolve:{
    modules: [path.resolve(__dirname, "./node_modules")]
  }
}
```

```js
alias: {
  "@": path.join(__dirname, "./pages"),
  "react": path.resolve(__dirname, "./node_modules/react/umd/react.production.min.js"),
  "react-dom": path.resolve( __dirname, "./node_modules/react-dom/umd/react-dom.production.min.js")
}
```

#### 优化 resolve.extensions

配置 resolve.extensions 在导入语句没带文件后缀时，webpack 会⾃自动带上后缀后，去尝试查找文件是否存在。

默认值:

```
extensions:['.js','.json','.jsx','.ts']
```

后缀尝试列表尽量的小

导入语句尽量量的带上后缀。

使⽤ externals 优化 cdn 静态资源：公司有cdn:静态资源有部署到cdn 有链接了了

我的bundle⽂件⾥，就不⽤打包进去这个依赖了，体积会小

我们可以将⼀些JS⽂文件存储在 CDN 上(减少 Webpack 打包出来的 js 体积)，在 index.html 中通过标签引入，如:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="root">root</div>
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
</body>
</html>
```

我们希望在使⽤时，仍然可以通过 import 的⽅式去引⽤(如 import $ from 'jquery' )，并且希望 webpack 不会对其进⾏打包，此时就可以配置 externals 。

```js
//webpack.config.js
module.exports = {
  //...
  externals: {
    //jquery通过script引⼊入之后，全局中即有了了 jQuery 变量量 'jquery': 'jQuery'
  }
}
```

使⽤静态资源路路径publicPath(CDN) CDN通过将资源部署到世界各地，使得⽤户可以就近访问资源，加快访问速度。要接入CDN，需要把⽹网⻚页的静态资源上传到CDN服务上，在访问这些资源时，使⽤CDN服务提供的URL。

咱们公司得有cdn服务器器地址 确保静态资源⽂文件的上传与否

css⽂文件的处理 使⽤less或者sass当做css技术栈

```bash
$ npm install less less-loader --save-dev
```

使⽤postcss为样式⾃自动补⻬齐浏览器器前缀 <https://caniuse.com/>

```bash
npm i  postcss-loader autoprefixer -D
```

新建postcss.config.js 


```js
// webpack.config.js
output: {
  publicPath: '//cdnURL.com', //指定存放JS⽂文件的CDN地址
}
  {
    test: /\.less$/,
      use: ["style-loader", "css-loader", "less-loader"]
  }

  module.exports = {
    plugins: [
      require("autoprefixer")({
        overrideBrowserslist: ["last 2 versions", ">1%"]
      }) 
    ]
  };
```

##index.less

```less

body { div {

    display: flex;
    border: 1px red solid;
  }


}

```

webpack.config.js
```js

{
  test: /\.less$/,
  include: path.resolve(__dirname, "./src"),
  use: [
    "style-loader",
    {
      loader: "css-loader",
      options: {}
    },
    "less-loader",
    "postcss-loader"



] },
```

如果不做抽取配置，我们的 css 是直接打包进 js ⾥里里⾯面的，我们希望能单独⽣生成 css ⽂文件。 因为单独⽣生 成css,css可以和js并⾏下载，提⾼高页⾯加载效率

借助MiniCssExtractPlugin 完成抽离css

```
npm install mini-css-extract-plugin -D
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 {
   test: /\.scss$/,



use: \[
 // "style-loader", // 不再需要style-loader，⽤MiniCssExtractPlugin.loader
```

代替

```
MiniCssExtractPlugin.loader,

```

"css-loader", // 编译css "postcss-loader", "sass-loader" // 编译scss

] },

```js
plugins: [
   new MiniCssExtractPlugin({
     filename: "css/[name]_[contenthash:6].css",
     chunkFilename: "[id].css"
   })
]
```

#### 压缩css

借助 optimize-css-assets-webpack-plugin

借助cssnano

安装

 npm install cssnano -D

```js
// npm i optimize-css-assets-webpack-plugin -D
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

new OptimizeCSSAssetsPlugin({
 cssProcessor: require("cssnano"), //引⼊入cssnano配置压缩选项 cssProcessorOptions: {
    discardComments: { removeAll: true }
  }

})

// 压缩HTML 借助html-webpack-plugin

new htmlWebpackPlugin({ title: "京东商城",


      template: "./index.html",
      filename: "index.html",
      minify: {
// 压缩HTML⽂文件
 removeComments: true, 
 // 移除HTML中的注释 
 collapseWhitespace: true, 
 // 删除空⽩白符与换⾏符 
 minifyCSS: true 
 // 压缩内联css

} }),
```

development vs Production模式区分打包 npm install webpack-merge -D

案例

```js
const merge = require("webpack-merge")
const commonConfig =  require("./webpack.common.js")
const devConfig = {


... 
}
module.exports = merge(commonConfig,devConfig)
//package.js
"scripts":{
  "dev":"webpack-dev-server --config ./build/webpack.dev.js",
  "build":"webpack --config ./build/webpack.prod.js"
}

```

基于环境变量量区分

借助cross-env

```bash
npm i cross-env -D

```

package⾥里里⾯面配置命令脚本，传⼊入参数

在webpack.config.js⾥里里拿到参数 process.env.NODE_ENV

tree Shaking

webpack2.x开始⽀支持 tree shaking概念，顾名思义，"摇树"，清除⽆无⽤ css,js(Dead Code) Dead Code ⼀般具有以下⼏几个特征

代码不会被执⾏，不可到达 代码执⾏的结果不会被⽤到 代码只会影响死变量量(只写不读)
 Js tree shaking只⽀支持ES module的引⼊入⽅式!!!!,

```json
##package.json
"test": "cross-env NODE_ENV=test webpack --config ./webpack.config.test.js",

```

//外部传⼊入的全局变量量 module.exports = (env)=>{

```js
  if(env && env.production){
    return merge(commonConfig,prodConfig)
  }else{
    return merge(commonConfig,devConfig)



} }
```

//外部传⼊入变量量
 scripts:" --env.production"

#### Css tree shaking

```js
// npm i glob-all purify-css purifycss-webpack --save-dev
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
plugins:[
// 清除⽆无⽤ css new PurifyCSS({

paths: glob.sync(\[
 // 要做 CSS Tree Shaking 的路路径⽂文件
 path.resolve(\_\_dirname, './src/\*.html'), // 请注意，我们同样需要对 html ⽂文件进⾏ tree shaking
 path.resolve(\_\_dirname, './src/\*.js')

]) 
})

]
```
#### JS tree shaking

只⽀支持import⽅式引⼊入，不⽀支持commonjs的⽅式引⼊入 案例:

//expo.js

```js
export const add = (a, b) => {
  return a + b;
};

export const minus = (a, b) => {
  return a - b;
};

//index.js

import { add } from "./expo";
add(1, 2);
//webpack.config.js

```

optimization: {
 usedExports: true // 哪些导出的模块被使⽤了了，再做打包
}

只要mode是production就会⽣生效，develpoment的tree shaking是不⽣生效的，因为webpack为了了 ⽅便便你的调试


可以查看打包后的代码注释以辨别是否⽣生效。
⽣生产模式不需要配置，默认开启


副作⽤

#### 代码分割 code Splitting

单页⾯应⽤spa: 打包完后，所有页⾯只⽣生成了了⼀个bundle.js


  代码体积变⼤大，不利利于下载
  没有合理利利⽤浏览器器资源


多页⾯应⽤mpa: 如果多个页⾯引⼊入了了⼀些公共模块，那么可以把这些公共的模块抽离出来，单独打包。公共代码只需要


下载⼀次就缓存起来了了，避免了了重复下载。


//package.json
 "sideEffects":false //正常对所有模块进⾏tree shaking , 仅⽣生产模式有效，需要配合 usedExports

或者 在数组⾥里里⾯面排除不需要tree shaking的模块 "sideEffects":\['\*.css','@babel/polyfill']

```js
import _ from "lodash";
console.log(_.join(['a','b','c','']))

```

假如我们引⼊入⼀个第三⽅的⼯具库，体积为1mb，⽽而我们的业务逻辑代码也有1mb，那么打包出来的体积⼤大 ⼩小会在2mb


导致问题:
 体积⼤大，加载时间⻓长
 业务逻辑会变化，第三⽅⼯具库不会，所以业务逻辑⼀变更更，第三⽅⼯具库也要跟着变。


其实code Splitting概念 与 webpack并没有直接的关系，只不过webpack中提供了了⼀种更更加⽅便便的⽅法 供我们实现代码分割

基于<https://webpack.js.org/plugins/split-chunks-plugin/>

```json
optimization: {
  splitChunks: {
    chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为⼀个单独的⽂文件
  },
},

optimization: {
  splitChunks: {
    chunks: 'async',//对同步 initial，异步 async，所有的模块有效 all minSize: 30000,//最⼩小尺⼨寸，当模块⼤大于30kb
    maxSize: 0,//对模块进⾏⼆二次分割时使⽤，不推荐使⽤
    minChunks: 1,//打包⽣生成的chunk⽂文件最少有⼏几个chunk引⽤了了这个模块
    maxAsyncRequests: 5,//最⼤大异步请求数，默认5
    maxInitialRequests: 3,//最⼤大初始化请求书，⼊入⼝口⽂文件同步请求，默认3
    automaticNameDelimiter: '-',//打包分割符号
    name: true,//打包后的名称，除了了布尔值，还可以接收⼀个函数function
    cacheGroups: {//缓存组
      vendors: {
        test: /\[\\\\/]node_modules\[\\\\/]/, name:"vendor", // 要缓存的 分隔出来的 chunk 名称 
        priority: -10//缓存组优先级 数字越⼤大，优先级越⾼高
      }, other:{
        chunks: "initial", // 必须三选⼀: "initial" | "all" | "async"(默认就是
        test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk, name:"other",
        async)
        minSize: 30000,
        minChunks: 1,
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true//可设置是否重⽤该chunk
      } 
    }
  } 
}
```

使⽤下⾯面配置即可:

Scope Hoisting

作⽤域提升(Scope Hoisting)是指 webpack 通过 ES6 语法的静态分析，分析出模块之间的依赖关 系，尽可能地把模块放到同⼀个函数中。下⾯面通过代码示例来理解:

打包后， hello.js 的内容和 index.js 会分开
 通过配置 optimization.concatenateModules=true\`:开启 Scope Hoisting

optimization:{ //帮我们⾃自动做代码分割 splitChunks:{

chunks:"all",//默认是⽀支持异步，我们使⽤all }

}

// hello.js

```
export default 'Hello, Webpack';
// index.js
import str from './hello.js';
console.log(str);

```

```
// webpack.config.js
module.exports = {
    optimization: {
        concatenateModules: true
    }

```

};

我们发现hello.js内容和index.js的内容合并在⼀起了了!所以通过 Scope Hoisting 的功能可以让 Webpack 打包出来的代码⽂文件更更⼩小、运⾏的更更快。

使⽤⼯具量量化

speed-measure-webpack-plugin:可以测量量各个插件和 loader 所花费的时间

webpack-bundle-analyzer:分析webpack打包后的模块依赖关系:

```
npm i speed-measure-webpack-plugin -D
//webpack.config.js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

```

const config = { //...webpack配置

```
}
module.exports = smp.wrap(config);
npm install webpack-bundle-analyzer -D
const BundleAnalyzerPlugin = require('webpack-bundle-
analyzer').BundleAnalyzerPlugin;
module.exports = merge(baseWebpackConfig, {

```

//....

```
    plugins: [
        //...
        new BundleAnalyzerPlugin(),
    ]

```

})

启动webpack 构建，会默认打开⼀个窗⼝口 

DllPlugin插件打包第三⽅类库 优化构建性能

Dll动态链接库 其实就是做缓存 .dll⽂文件称为动态链接库，在windows系统会经常看到. 百度百科:<https://baike.baidu.com/item/.dll/2133451?fr=aladdin>

项⽬目中引⼊入了了很多第三⽅库，这些库在很⻓长的⼀段时间内，基本不会更更新，打包的时候分开打包来提升 打包速度，⽽而DllPlugin动态链接库插件，其原理就是把⽹网⻚页依赖的基础模块抽离出来打包到dll⽂文件中， 当需要导⼊入的模块存在于某个dll中时，这个模块不再被打包，⽽而是去dll中获取。

动态链接库只需要被编译⼀次，项⽬目中⽤到的第三⽅模块，很稳定，例如react,react-dom，只要 没有升级的需求

webpack已经内置了了对动态链接库的⽀支持 DllPlugin:⽤于打包出⼀个个单独的动态链接库⽂文件

DllReferencePlugin:⽤于在主要的配置⽂文件中引⼊入DllPlugin插件打包好的动态链接库⽂文件 新建webpack.dll.config.js⽂文件，打包基础模块

我们在 index.js 中使⽤了了第三⽅库 react 、 react-dom ，接下来，我们先对这两个库先进⾏打包。

```js
const path = require("path");
const { DllPlugin } = require("webpack");
module.exports = {
  mode: "development",
  entry: {
    react: ["react", "react-dom"] //! node_modules?
  },
  output: {
    path: path.resolve(__dirname, "./dll"),
    filename: "[name].dll.js",
    library: "react"
  }, plugins: \[
  new DllPlugin({
  // manifest.json⽂文件的输出位置
  path: path.join(\_\_dirname, "./dll", "\[name]-manifest.json"), // 定义打包的公共vendor⽂文件对外暴暴露露的函数名
    name: "react"
}) ]
};
```
在package.json中添加
 "dev:dll": "webpack --config ./build/webpack.dll.config.js",

运⾏

```bash
  npm run dev:dll
```

你会发现多了了⼀个dll⽂文件夹，⾥里里边有dll.js⽂文件，这样我们就把我们的React这些已经单独打包了了

dll⽂文件包含了了⼤大量量模块的代码，这些模块被存放在⼀个数组⾥里里。⽤数组的索引号为ID,通过变量量讲 ⾃自⼰己暴暴露露在全局中，就可以在window.xxx访问到其中的模块
 Manifest.json 描述了了与其对应的dll.js包含了了哪些模块，以及ID和路路径。

接下来怎么使⽤呢?

要给web项⽬目构建介⼊入动态链接库，需要完成以下事情: 将⽹网⻚页依赖的基础模块抽离，打包到单独的动态链接库，⼀个动态链接库是可以包含多个模块的。


  当需要导⼊入的模块存在于某个动态链接库中时，不要再次打包，直接使⽤构建好的动态链接库即
  可。
  页⾯依赖的所有动态链接库都需要被加载。

```js
##webpack.dev.config.js
new DllReferencePlugin({
  manifest: path.resolve(__dirname,"./dll/react-manifest.json")
}),
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>webpack</title>
    <link href="css/main_e2bf39.css" rel="stylesheet"></head>
  <body>
    <div id="app"></div>
    <script type="text/javascript" src="react.dll.js"></script>
    <script type="text/javascript" src="js/main_142e6c.js"></script>
  </body>
</html>
```

⼿手动添加使⽤，体验不好，这⾥里里推荐使⽤add-asset-html-webpack-plugin插件帮助我们做这个事情。 安装⼀个依赖 npm i add-asset-html-webpack-plugin ，它会将我们打包后的 dll.js ⽂文件注⼊入到我们⽣生成的 index.html 中.在 webpack.base.config.js ⽂文件中进⾏更更改。

运⾏:

npm run dev

这个理解起来不费劲，操作起来很费劲。所幸，在Webpack5中已经不⽤它了了，⽽而是 ⽤ HardSourceWebpackPlugin ，⼀样的优化效果，但是使⽤却及其简单

  提供中间缓存的作⽤
  ⾸首次构建没有太⼤大的变化
  第⼆二次构建时间就会有较⼤大的节省

```js
new AddAssetHtmlWebpackPlugin({
 filepath: path.resolve(\_\_dirname, '../dll/react.dll.js') // 对应的 dll ⽂文件路路径
}),

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const plugins = [new HardSourceWebpackPlugin()]
```


使⽤ happypack 并发执⾏任务

运⾏在 Node.之上的Webpack是单线程模型的，也就是说Webpack需要⼀个⼀个地处理任务，不能同 时处理多个任务。 Happy Pack 就能让Webpack做到这⼀点，它将任务分解给多个⼦进程去并发执 ⾏，⼦进程处理完后再将结果发送给主进程。从⽽而发挥多核 CPU 电脑的威⼒力力。


npm i -D happypack

```js
var happyThreadPool = HappyPack.ThreadPool({ size: 5 });
//const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
// webpack.config.js
rules: [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "happypack/loader?id=babel"
      }
    ]
  },
  {
    test: /\.css$/,
    include: path.resolve(__dirname, "./src"),
    use: ["happypack/loader?id=css"]
  },
]

//在plugins中增加
plugins:[
  new HappyPack({
    // ⽤唯⼀的标识符id，来代表当前的HappyPack是⽤来处理⼀类特定的⽂文件 id:'babel',
    // 如何处理.js⽂文件，⽤法和Loader配置中⼀样 loaders:\['babel-loader?cachedirectory'],
    threadPool: happyThreadPool,
  }),
  new HappyPack({
    id: "css",
    loaders: ["style-loader", "css-loader"]
  }),
]

// ⼀个loader对应⼀个id
```

<https://github.com/webpack-contrib/mini-css-extract-plugin/issues/273>

https://github.com/amireh/happypack/issues/242

