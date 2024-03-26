# 网易项目webpack配置解析

create time 2020-01-01

last modify time 2024-04-12

课程 webpack 版本是4

学习目标：自己可以看懂90%的配置文件，并自定义plugin和loader

## 01 环境与目录

环境分类：开发、测试、生产

开发环境：增加开发服务器操作

测试环境：测试环境和生产环境很接近

生产环境：增加 tree-shaking devtool(source-map)操作(压缩操作) 

不同模式下对应不同的文件：

- 开发环境下 npm run dev => dev.config.js；
- 生产环境下 npm run build => prod.config.js。

实际操作时，有一个 base.config.js 是基础默认配置，不同环境都会执行，运行时会执行多个脚本。

`npm run build` 实际执行了什么操作？

~~~bash
node build.js

# 内部脚本：使用 webpack 打包（webpack.pro.js）进行打包
# webpack.base.js 与 webpack.pro.js 合并
# 从 config 中拿出 index.js 和 pro.env 中的环境变量
~~~

package.json

~~~json
{
 	"scripts": {
    "start": "npm run dev",
    "test": "npm run unit && npm run e2e",
    "lint": "eslint --ext .js src test/unit test/e2e/specs",
    "build": "node build/build.js",
    "build-online": "node build/build.js online",
    "css": "sass --watch --scss --no-cache --unix-newlines src:src -t compressed",
  }
}
~~~

Build.js （这是网易项目中自定义的build脚本）

~~~js
'use strict';

// 执行检查版本函数
require('./check-versions')();

// 设置node环境是生产环境
process.env.NODE_ENV = 'production';

// 默认的创建环境是空
process.env.BUILD_MODE = '';

// 判断传参：如果传参是在线模式，那么把创建环境设置为在线（把terminal中的参数变成全局变量使用）
if (!!process.argv[2] && process.argv[2] === 'online') {
  process.env.BUILD_MODE = 'online';
}

// 下面是基本的第三方库
const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackDllConfig = require('./webpack.dll.config');

// 开始加载 loading 动画
const snipper = ora('building for production...');
snipper.start();

// dll 打包函数
function buildDll() {
  return new Promise((resolve, reject) => {

    // 使用webpack开始编译webpack 本身是一个方法 webpack(config);
    // 第一个参数是配置对象，第二个参数是回调函数
    webpack(webpackDllConfig, (err, stats) => {
      // 编译结束后，停止loading
      spinner.stop();
      
      // 抛出编译的错误
      if (err) throw err;
      
      // 控制台输出编译的结果（配置）
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, // if ts-loader, it is true
        chunk: false,
        chunkModules: false,
      }) + '\n\n');
      
      // 如果编译成功，但是有错误，那么显示错误
      if (stats.hasErrors()) {
        console.log(chalk.red('Build failed with errors.\n'));
        // Promise 抛出拒绝
        reject();
        // 退出进程
        process.exit();
      }
      
      // 如果编译成功，提示成功文本
      console.log(chalk.cyan('Build complete.\n'));
      console.log(chalk.yellow('Tip: build files are meant to be served over an HTTP server.\n Opening index.html over file:// will not work.\n'));
      resolve();
    });
  });
}

// build 打包函数
// 不同的 build 使用不同配置文件，其他配置类似（打印日志）
function buildProject(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      spinner.stop();      
      if (err) throw err;
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + '\n\n');
    });
    // 处理异常基本相同
    if (stats.hasErrors()) {
      console.log(chalk.red('Build failed with errors.\n'));
      reject();
      process.exit(1);
    }
    console.log(chalk.cyan('Build complete.\n'));
    resolve();
  });
}

// 脚本开始运行
// 01 删除默认的dist目录（清空打包环境）
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err;

  // 02 判断模式，开始编译
  // 在线模式
  if (process.env.BUILD_MODE === 'online') {
    // 首先编译DLL，执行上面的函数
    buildDll().then(() => {
      // 引入生产环境配置
      return require('./webpack.prod.conf');
    }).then((config) => {
      // 使用生产环境配置编译项目
      return buildProject(config);
    });
  }
  // 测试模式（测试环境配置）
  else {
    buildDll().then(() => {
      return require('./webpack.test.conf');
    }).then((config) => {
      return buildProject(config);
    });
  }
});
~~~

使用第三方插件创建的build.js 也差不多，@vue/cli 创建的build脚本。

在命令行中输入 webpack config.js 和执行 node build.js 并在JS文件中使用的效果是一样的。

代码中，webpack 本质上是一个方法。

~~~js
const webpack = require('webpack');

webpack(config);
~~~

打包过程是异步的，所以先进行DLL打包，然后再引入生产环境配置，进行下一步打包。

build 脚本：导入配置文件，调用webpack打包方法进行打包

build.js

~~~js
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) {
    throw err;
  }
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw err;
    }
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n');
    if (stats.hasError()) {
      console.log(chalk.red('Build failed with errors'));
      process.exit(1);
    }
    console.log(chalk.cyan('Build complete.'));
  });
});
~~~

prod 脚本中，有一个webpack-merge 方法，可以合并多个脚本 

配置的本质就是一个对象，merge就是合并多个对象

webpack.prod.conf.js

~~~js
const path = require('path');
const utils = require('utils');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const merge = require('webpack-merge');

const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');

const env = require('../config/prod.env');

// 如果构建模式不是Online构建，那么设置环境变量的发布环境，为测试环境

// merge 方法用于合成配置文件（基本配置和build配置文件）
const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true,
    })
  },
  devtool: false,
  output: {
    path: config.build-assetsRoot,
    filename: utils.aeestsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunk: {
      //
    }
  }
})
~~~



## 02 常用 loader 和插件

常用插件 plugins，下面依次介绍

- webpack.DefinePlugin 在打包阶段定义全局变量
- webpack.HashedModuledsPlugin 保持 module.id 稳定
- webpack.NoEmitOnErrorsPlugin 屏蔽错误
- webpack.providePlugin 提供插件库
- copy-webpack-plugin 可以帮助拷贝内容

全部的插件官方文档：https://v4.webpack.docschina.org/plugins/

### webpack.DefinePlugin 

指定当前的环境变量（打包阶段定义全局变量）

可以使用 webpack --env production 通过命令行的形式传参，或者使用这个对象指定当前的环境变量是开发环境还是生产环境，在业务代码中获取到当前的环境变量。

~~~js
// --env process.env 无法在业务代码中拿到（所以要初始化定义环境，把用户输入的环境放在node中）
plugins: [
  // 定义环境（测试环境还是生产环境，不需要每次指定，--env 比较麻烦）
  new webpack.DefinePlugin({
    'process.env': env,
  }),
]
~~~

prod.env.js 简化版

~~~js
'use strict';
module.exports = {
  NODE_ENV: '"production"',
  publish_env: '"online"'
};
~~~

### webpack.DllReferencePlugin

~~~js
plugins: [
  // DllReferencePlugin 将打包输出的内容 映射关系放置到项目中，在打包的时候，忽略这些文件
  new webpack.DllReferencePlugin({
    context: path.join(__dirname, '..'),
    manifest: require('./vendor-manifest.json')
  }),
]
~~~

### MiniCssExtractPlugin

官方推荐使用mini-css-extract-plugin插件来打包css文件（从css文件中提取css代码到单独的文件中，对css代码进行代码压缩等）。

~~~js
plugins: [
  // extract css into its own file
  new MiniCssExtractPlugin({
    filename: utils.assetsPath('css/[name].[contenthash].css')
  }),
]
~~~

### ModuleConcatenationPlugin

过去 webpack 打包时的一个取舍是将 bundle 中各个模块单独打包成闭包。这些打包函数使你的 JavaScript 在浏览器中处理的更慢。相比之下，一些工具像 Closure Compiler 和 RollupJS 可以提升(hoist)或者预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度。

~~~js
plugins: [
  // enable scope hoisting
  new webpack.optimize.ModuleConcatenationPlugin(),
]
~~~

### webpack.HashedModuleIdsPlugin

保持模块的 module.id 稳定

该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境。

如何判断一个文件是新的还是旧的（浏览器读取新文件，还是读取缓存文件），就根据文件后面的hash值判断。所以webpack打包输出的文件中就增加了哈希值。

~~~js
const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true,
    })
  },
  devtool: false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
  },
  plugins: [
    // keep module.id stable when vender modules does not change
    // 如果 static 路径下面的第三方库文件没有改变，那么不需要重新打包这部分代码
    new webpack.HashedModuleIdsPlugin(),
  ],
});
~~~

### webpack.NoEmitOnErrorsPlugin

如果代码出现问题，webpack 默认不会继续编译，显示错误。

这个插件可以继续编译并让浏览器显示（操作更友好）。

~~~js
  plugins: [    
    // webpack.NoEmitOnErrorsPlugin 屏蔽错误
    new webpack.NoEmitOnErrorsPlugin(),
  ],
~~~

### webpack.providePlugin 提供第三方库

如果我们在全局中使用某些库，例如jquery，可以使用这个插件

base.conf.js

对于 axios jquery 等通用组件，每个组件都需要 import，可以只用这个插件。直接在这里定义，不需要在不同组件中全局定义，定以后可以打包到环境中。

~~~js
plugins: [
  new webpack.ProvidePlugin({
    Regular: 'Regular',
    $: 'jquery',
    axios: 'axios',
  }),
  ...utils.htmlPlugin(),
  new HappyPack({
    id: 'happybabel',
    loader: ['babel-loader?cacheDirectory=true'],
    threadPool: happyThreadPool,
  }),
]
~~~

### copy-webpack-plugin 可以帮助拷贝内容

这个插件不是自带的，需要安装

~~~js
const CopyWebpackPlugin = require('copy-webpack-plugin');

plugins: [
  // copy-webpack-plugin 可以帮助拷贝内容
  // 直接把一部分 static 的代码拷贝到打包后的目录中（不需要手动 mv 命令）
  // webpack 只会处理打包的模块，例如static中有100张图片，可以使用这个插件
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../static'),
      to: config.dev.assetsSubDirectory,
      ignore: ['.*'],
    }
  ])
],
~~~

## 03 优化打包的内容

### DLL优化

~~~js
plugins: [
  new webpack.DllReferencePlugin({
    manifest: require("./dll/vender-manifest.json")
  })
]
~~~

什么是DLL优化？我们需要用第三方库，不会修改第三方库的内容，每次webpack打包会处理第三方库代码。既然第三方库代码不变，我们可以先把第三方库代码处理了，放在一边，然后下一次打包不需要再次处理这部分代码，直接使用。

~~~js
import $ from 'jquery';
import _ from 'lodash';
~~~

webpack.dll.js

~~~js
const webpack = require('webpack');

module.exports = {
  entry: {
    vender:['jquery', 'lodash']
  },
  output: {
    path: __dirname + '/dll',
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: __dirname + '/dll/[name]-manifest.json',
      name: '[name]_library'
    })
  ]
};
~~~

bash 打包第三方库

~~~bash
webpack --config webpack.dll.js
~~~

输出 vender.dll.js

然后在webpack配置文件中增加这个文件

~~~js
plugins: [
  new webpack.DllReferencePlugin({
    manifest: require("./dll/vender-manifest.js")
  })
]
~~~

使用 webpack 继续打包项目代码

### HappyPack

~~~js
const happyPack = require('happypack');

// 配置连接池，容量等于CPU的个数（适合多核CPU并行打包）
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});

module: {
  rules: [
    {
      test: /\.js$/,
      use: [
        {
          loader: 'happypack/loader?id=happybabel'
        }
      ]
    }
  ]
},
plugins: [
  new HappyPack({
    // 这里的ID和上面的ID必须相同，否则报错
    id: 'happybabel',
    loaders: ['babel-loader?cacheDirectory=true'],
    threadPool: happyThreadPool,
  }),
  // 支持其他类型文件的编译
  new HappyPack({
    // 这里的ID和上面的ID必须相同，否则报错
    id: 'happybabel',
    loaders: ['scss-loader?cacheDirectory=true'],
    threadPool: happyThreadPool,
  })
]
~~~

如果项目较小，打包编译的时间反而更多

因为这里使用多进程，调用进程也消耗时间

所以文件组件较少时，使用 Happypack 可能增加打包时间。

如果大型项目，那么使用这个可以节省很多时间。

这是一个第三方库，需要单独安装到dev中

## 04 webpack 自定义插件

项目中打包简化：可变性配置：通过编写响应的操作函数；

Myloader.js 自定义增加插件（使用正则替换代码中的字符，类似于AST，抽象语法树，类似中间件的语法）开发的时候，我们使用 static 中的图片，生产环境中需要使用 www.baidu.com 中的图片，所以可以自定义一个插件替换开发环境中的变量。

~~~js
module.exports = function(context) {
  context.replace('bind', 'on');
  return context;
}
~~~

使用

~~~js
const require('./myplugin');

module: {
  rules: [
    {
      test: /\.js$/,
      // loader: 'babel-loader'
      use: [
        { loader: 'babel-loader' },
        { loader: './myloader.js' },
      ]
    }
  ]
}
~~~

index.js 插件就是监听 webpack 的生命周期函数，并在合适的时候处理代码

~~~js
const fs = require('fs');
const path = require('path');

module.exports = a;

function a () {
  
}

a.prototype.apply = function(compiler) {
  compiler.hooks.done.tap('changeStitic', function(compilation) {
    let context = compiler.options.context;
    let publickPath = path.resolve(context, 'dist');
    compilation.toJson().assets.forEach((ast) => {
      const filePath = path.resolve(publickPath, ast.name);
      fs.readFile(filepath, function(err, file) {
        var newcontext = file.toString().replace('./static', 'www.baidu.com');
        fs.writeFile(filePath, newcontext, function() {})
      });
    })
  })
}
~~~

make 周期需要处理很多编译的配置，新手不好做，done 周期直接操作编译后的文件，相对简单

## 总结

如果对模块内容批量进行处理：loader 是首选方案；

如果要加入特殊的功能：可以自定义增加插件 plugin；

loader 是对某一类文件进行处理（css-loader sass-loader）

plugin 是监听到 webpack 的某个过程（make）执行的一个操作（webpack插件系统的生命周期）

