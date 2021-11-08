## 第五节 webpack 配置优化2

2021-10-30

### tree shaking

被清除的代码具有下面特征：代码不会到达，不会被执行；变量不会用到；代码执行只会影响不用的变量。

#### css 摇树

~~~bash
npm install glob-all purify-css purifycss-webpack --save-dev
~~~

增加下面的插件

~~~js
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob');

plugins: [
  new PurifyCSS({
    paths: glob.stnc([
      path.resolve(__dirname, './src/*.index.html'),
    	path.resolve(__dirname, './src/*.js'),
    ])
  })
]
~~~

HTML 中可能直接导入 css 文件，JS 中可能 import css，所以这里要处理两次

#### JS 摇树

JS 摇树只支持 es module import 方式，不支持 commonJS require 的方式引入

这个不需要额外的插件，直接在 webpack 中更改配置即可

~~~js
optimization: {
  usedExports: true
}
~~~

同时需要设置 mode 是 production 才生效（生产模式默认开启，不需要单独配置）

可以在 package.json 中设置 sideEffects 处理副作用，设置不需要摇树的部分（其他JS需要摇树，这个不需要摇树）

~~~json
{
  "sideEffects": [*.css, '@babel/polyfill']
}
~~~

### 代码分割 code splitting

SPA 中，打包只生成一个 bundle.js 代码体积变大，不利于下载

MPA 中，如果多个页面使用公共模块，那么可以把公共模块抽离出来，单独打包，下载一次即可，避免重复下载（例如第三方工具库等）所以需要代码分割。

如果只使用一个包，那么加载时间较长，不利于使用浏览器多线程缓存；同时第三方工具库频繁打包也不需要。

~~~js
optimization: {
  splitChunks: {
    chunks: "all", // 公共部分分离成单独的文件
  }
}
~~~

全部的配置（通常使用默认值即可）

~~~js
splitChunks = {
  chunks: "all | async | initial",
  minSize: 30000,
  maxSize: 0,
  minChunks: 1,
  maxAsyncRequests: 5,
  maxInitialRequests: 3,
  automaticNameDelimiter: '-',
  name: true,
  
  // 缓存设置
  cacheGroups: {
    // 第一个文件：直接把 node_module 部分打包成一个包
    vendors: {
      test: /[\\/]node_module[\\/]/,
      name: 'divide',
      priority: -10,
    },
    // 第二个文件：
    other: {
      chunks: "initial",
      test: /react|lodash/,
      name: 'other',
      minSize: 30000,
      minChunks: 1,
    },
    default: {
      minChunks: 2,
      priority: -20,
      reuseExistingChunk: true,
    }
  }
}
~~~

### HappyPack 使用多进程打包

将任务分解成多个子进程并发执行，子进程处理完成后转给主进程，适应于多核 CPU。

如果打包任务较少，那么使用 happyPack 反而需要拆分合并，这样更耗时。

~~~bash
npm install -D happypack
~~~

~~~js
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

rules: [
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      {
        // loader 对应一个 ID
        loader: "happypack/loader?id=css"
      }
    ]
  },
]

plugins: [
  new HappyPack({
    id: 'css',
    loaders: ['style-loader', 'css-loader'],
  })
]
~~~

### HardSource 优化

在 webpack5 中，可以使用 HardSourceWebpackPlugin 优化（硬件优化）配置简单

可以提供中间缓存，二次构建时间缩短

~~~js
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const plugins = [
  new HardSourceWebpackPlugin(),
];
~~~

### DLL 优化

Dll 是动态链接库（实际上就是缓存）

可以把一部分稳定的第三方（react）依赖单独打包，然后提高打包速度。如果需要导入的模块存在于 dll 中，就不需要再次打包这个模块，直接从 dll 中获取即可。

实际上是做缓存，会提升 webpack 打包的速度，不会减少构建后的代码体积。

使用两个插件

dllPlugin: 用于打包出单独的 DLL 文件

DllReferencePlugin: 用于在配置文件中引入 DLLPlugin 插件打包好的 DLL 文件

webpack 通过 DllReferencePlugin 获取 react 有哪些对应的文件，dll-plugin 可以生成 dll 动态库文件。下次构建时，检查依赖，如果有对应的 dll 文件，不需要重新构建，减少构建时间。

~~~js
new webpack.DllReferencePlugin({
  manifest: path.resolve(__dirname, "./dll/react-manifest.json")
}),
new DllPlugin({
  path: path.join(__dirname, "./dll", "[name]-manifest.json"),
  name: "react",
}),
~~~

Manifest.json 描述了对应的 dll 包括了哪些模块，ID 和路径。

然后在 HTML 中需要把 DLL 文件导入.



### 分析打包后的模块关系

Webpack-bundle-analyzer

~~~bash
npm install -D webpack-bundle-analyzer
~~~

~~~js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin.

plugins: [
  new BundleAnalyzerPlugin(),
]
~~~

### 分析打包时间

可以分析不同打包过程的依赖时间

Speed-measure-webpack-plugin

~~~js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const config = {};

module.exports = smp.wrap(config);
~~~

### 作用域提升

分析模块之间的依赖关系，尽量把模块放在同一个函数中

~~~js
optimization: {
  concatenateModules: true,
}
~~~



### 优化实例

优化前的时间消耗

~~~js
 SMP  
General output time took 48.86 secs

 SMP  Plugins
TerserPlugin took 0.249 secs

 SMP  Loaders
babel-loader took 39.008 secs
modules with no loaders took 35.55 secs
css-loader took 18.89 secs
url-loader took 3.008 secs
style-loader, and css-loader took 0.101 secs

Hash: 4bc99a3d86b94b976911
Version: webpack 4.29.6
Time: 48862ms
Built at: 2021/11/01 上午10:27:27
~~~

打包时间为 48s

可以发现主要的耗时在 babel-loader css-loader 



优化后，使用多线程打包（从 49 优化到 41秒，可能是电脑性能，或者只优化了一部分代码，一部分 with no loaders）

~~~js
 SMP  
General output time took 40.76 secs

 SMP  Plugins
HappyPlugin took 0.148 secs
TerserPlugin took 0.143 secs

 SMP  Loaders
happypack took 36.9 secs
modules with no loaders took 20.73 secs
css-loader took 0.914 secs
url-loader took 0.799 secs

Hash: 4bc99a3d86b94b976911
Version: webpack 4.29.6
Time: 40908ms
Built at: 2021/11/01 上午10:42:14
~~~

使用硬件加速后，可能和已有的插件冲突，反而时间更长了，所以不使用这个插件

https://www.npmjs.com/package/hard-source-webpack-plugin

