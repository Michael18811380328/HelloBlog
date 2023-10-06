# 带你深度解锁Webpack系列(优化篇)

[无名之苝](https://juejin.cn/user/3368559358523944/posts)

2020-03-1672,326阅读9分钟

[带你深度解锁Webpack系列(基础篇)](https://juejin.cn/post/6844904079219490830) 和 [带你深度解锁Webpack系列(进阶篇)](https://juejin.cn/post/6844904084927938567)，主要是讲解了 `Webpack` 的配置，但是随着项目越来越大，构建速度可能会越来越慢，构建出来的js的体积也越来越大，此时就需要对 `Webpack` 的配置进行优化。

本文罗列出了十多种优化方式，大家可以结合自己的项目，选择适当的方式进行优化。这些 `Webpack` 插件的源码我大多也没有看过，主要是结合 `Webpack` 官方文档以及项目实践，并且花了大量的时间验证后输出了本文，如果文中有错误的地方，欢迎在评论区指正。

鉴于前端技术变更迅速，祭出本篇文章基于 `Webpack` 的版本号:

```
复制代码├── webpack@4.41.5 
└── webpack-cli@3.3.10 
```

本文对应的项目地址(编写本文时使用)供参考：[github.com/YvetteLau/w…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FYvetteLau%2Fwebpack%2Ftree%2Fmaster%2Fwebpack-optimize)



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/9/170bae7ee866b278~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)



### 量化

有时，我们以为的优化是负优化，这时，如果有一个量化的指标可以看出前后对比，那将会是再好不过的一件事。

`speed-measure-webpack-plugin` 插件可以测量各个插件和`loader`所花费的时间，使用之后，构建时，会得到类似下面这样的信息：



![smp.jpeg](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/14/170d9bf274c164c1~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

对比前后的信息，来确定优化的效果。



[speed-measure-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fspeed-measure-webpack-plugin) 的使用很简单，可以直接用其来包裹 `Webpack` 的配置:

```
复制代码//webpack.config.js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const config = {
    //...webpack配置
}

module.exports = smp.wrap(config);
```

### 1.exclude/include

我们可以通过 `exclude`、`include` 配置来确保转译尽可能少的文件。顾名思义，`exclude` 指定要排除的文件，`include` 指定要包含的文件。

`exclude` 的优先级高于 `include`，在 `include` 和 `exclude` 中使用绝对路径数组，尽量避免 `exclude`，更倾向于使用 `include`。

```
复制代码//webpack.config.js
const path = require('path');
module.exports = {
    //...
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: ['babel-loader'],
                include: [path.resolve(__dirname, 'src')]
            }
        ]
    },
}
```

下图是我未配置 `include` 和配置了 `include` 的构建结果对比：



![include:exclude.jpeg](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/14/170d9bf279131194~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)



### 2. cache-loader

在一些性能开销较大的 `loader` 之前添加 `cache-loader`，将结果缓存中磁盘中。默认保存在 `node_modueles/.cache/cache-loader` 目录下。

首先安装依赖：

```
复制代码npm install cache-loader -D
```

`cache-loader` 的配置很简单，放在其他 `loader` 之前即可。修改`Webpack` 的配置如下:

```
复制代码module.exports = {
    //...
    
    module: {
        //我的项目中,babel-loader耗时比较长，所以我给它配置了`cache-loader`
        rules: [
            {
                test: /\.jsx?$/,
                use: ['cache-loader','babel-loader']
            }
        ]
    }
}
```

如果你跟我一样，只打算给 `babel-loader` 配置 `cache` 的话，也可以不使用 `cache-loader`，给 `babel-loader` 增加选项 `cacheDirectory`。



![cache-loader.jpeg](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/14/170d9bf279c1cd59~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)



`cacheDirectory`：默认值为 `false`。当有设置时，指定的目录将用来缓存 `loader` 的执行结果。之后的 `Webpack` 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 `Babel` 重新编译过程。设置空值或者 `true` 的话，使用默认缓存目录：`node_modules/.cache/babel-loader`。开启 `babel-loader`的缓存和配置 `cache-loader`，我比对了下，构建时间很接近。

### 3.happypack

由于有大量文件需要解析和处理，构建是文件读写和计算密集型的操作，特别是当文件数量变多后，`Webpack` 构建慢的问题会显得严重。文件读写和计算操作是无法避免的，那能不能让 `Webpack` 同一时刻处理多个任务，发挥多核 CPU 电脑的威力，以提升构建速度呢？

`HappyPack` 就能让 `Webpack` 做到这点，它把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。

首先需要安装 `happypack`:

```
复制代码npm install happypack -D
```

修改配置文件:

```
复制代码const Happypack = require('happypack');
module.exports = {
    //...
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: 'Happypack/loader?id=js',
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.css$/,
                use: 'Happypack/loader?id=css',
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules', 'bootstrap', 'dist')
                ]
            }
        ]
    },
    plugins: [
        new Happypack({
            id: 'js', //和rule中的id=js对应
            //将之前 rule 中的 loader 在此配置
            use: ['babel-loader'] //必须是数组
        }),
        new Happypack({
            id: 'css',//和rule中的id=css对应
            use: ['style-loader', 'css-loader','postcss-loader'],
        })
    ]
}
```

`happypack` 默认开启 `CPU核数 - 1` 个进程，当然，我们也可以传递 `threads` 给 `Happypack`。



![happypack.jpeg](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/14/170d9bf27caaa71c~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)



说明：当 `postcss-loader` 配置在 `Happypack` 中，必须要在项目中创建 `postcss.config.js`。

```
复制代码//postcss.config.js
module.exports = {
    plugins: [
        require('autoprefixer')()
    ]
}
```

否则，会抛出错误: `Error: No PostCSS Config found`

另外，当你的项目不是很复杂时，不需要配置 `happypack`，因为进程的分配和管理也需要时间，并不能有效提升构建速度，甚至会变慢。

### 4.thread-loader

除了使用 `Happypack` 外，我们也可以使用 `thread-loader` ，把 `thread-loader` 放置在其它 `loader` 之前，那么放置在这个 `loader` 之后的 `loader` 就会在一个单独的 `worker` 池中运行。

在 worker 池(worker pool)中运行的 loader 是受到限制的。例如：

- 这些 `loader` 不能产生新的文件。
- 这些 `loader` 不能使用定制的 `loader` API（也就是说，通过插件）。
- 这些 `loader` 无法获取 `webpack` 的选项设置。

首先安装依赖：

```
复制代码npm install thread-loader -D
```

修改配置:

```
复制代码module.exports = {
    module: {
        //我的项目中,babel-loader耗时比较长，所以我给它配置 thread-loader
        rules: [
            {
                test: /\.jsx?$/,
                use: ['thread-loader', 'cache-loader', 'babel-loader']
            }
        ]
    }
}
```

`thread-loader` 和 `Happypack` 我对比了一下，构建时间基本没什么差别。不过 `thread-loader` 配置起来为简单。

### 5.开启 JS 多进程压缩

虽然很多 `webpack` 优化的文章上会提及多进程压缩的优化，不管是 `webpack-parallel-uglify-plugin` 或者是 `uglifyjs-webpack-plugin` 配置 `parallel`。不过这里我要说一句，没必要单独安装这些插件，它们并不会让你的 `Webpack` 构建速度提升。

当前 `Webpack` 默认使用的是 `TerserWebpackPlugin`，默认就开启了多进程和缓存，构建时，你的项目中可以看到 `terser` 的缓存文件 `node_modules/.cache/terser-webpack-plugin`。

### 6.HardSourceWebpackPlugin

`HardSourceWebpackPlugin` 为模块提供中间缓存，缓存默认的存放路径是: `node_modules/.cache/hard-source`。

配置 `hard-source-webpack-plugin`，首次构建时间没有太大变化，但是第二次开始，构建时间大约可以节约 80%。

首先安装依赖:

```
复制代码npm install hard-source-webpack-plugin -D
```

修改 `webpack` 的配置：

```
复制代码//webpack.config.js
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
module.exports = {
    //...
    plugins: [
        new HardSourceWebpackPlugin()
    ]
}
```



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/14/170d9bf27e20fd0e~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)



用另外一个比较大的项目测试了下，配置了 `HardSourceWebpackPlugin`，构建时间从 8S 左右降到了 2S 左右。

[HardSourceWebpackPlugin文档中](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fhard-source-webpack-plugin) 列出了一些你可能会遇到的问题以及如何解决，例如热更新失效，或者某些配置不生效等。

### 7.noParse

如果一些第三方模块没有AMD/CommonJS规范版本，可以使用 `noParse` 来标识这个模块，这样 `Webpack` 会引入这些模块，但是不进行转化和解析，从而提升 `Webpack` 的构建性能 ，例如：`jquery` 、`lodash`。

[noParse](https://link.juejin.cn/?target=http%3A%2F%2Fwebpack.html.cn%2Fconfiguration%2Fmodule.html) 属性的值是一个正则表达式或者是一个 `function`。

```
复制代码//webpack.config.js
module.exports = {
    //...
    module: {
        noParse: /jquery|lodash/
    }
}
```

我当前的 `webpack-optimize` 项目中，没有使用 `jquery` 或者是 `lodash`。

因此新建一个项目测试，只引入 `jquery` 和 `loadsh`，然后配置 `noParse` 和不配置 `noParse`，分别构建比对时间。

配置`noParse` 前，构建需要 `2392ms`。配置了 `noParse` 之后，构建需要 `1613ms`。 如果你使用到了不需要解析的第三方依赖，那么配置 `noParse` 很显然是一定会起到优化作用的。

### 8.resolve

`resolve` 配置 `webpack` 如何寻找模块所对应的文件。假设我们确定模块都从根目录下的 `node_modules` 中查找，我们可以配置:

```
复制代码//webpack.config.js
const path = require('path');
module.exports = {
    //...
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
    }
}
```

需要记住的是，如果你配置了上述的 `resolve.moudles` ，可能会出现问题，例如，你的依赖中还存在 `node_modules` 目录，那么就会出现，对应的文件明明在，但是却提示找不到。因此呢，个人不推荐配置这个。如果其他同事不熟悉这个配置，遇到这个问题时，会摸不着头脑。

另外，`resolve` 的 `extensions` 配置，默认是 `['.js', '.json']`，如果你要对它进行配置，记住将频率最高的后缀放在第一位，并且控制列表的长度，以减少尝试次数。

本项目较小，因此测试时，此处优化效果不明显。

### 9.IgnorePlugin

`webpack` 的内置插件，作用是忽略第三方包指定目录。

例如: `moment` (2.24.0版本) 会将所有本地化内容和核心功能一起打包，我们就可以使用 `IgnorePlugin` 在打包时忽略本地化内容。

```
复制代码//webpack.config.js
module.exports = {
    //...
    plugins: [
        //忽略 moment 下的 ./locale 目录
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
}
```

在使用的时候，如果我们需要指定语言，那么需要我们手动的去引入语言包，例如，引入中文语言包:

```
复制代码import moment from 'moment';
import 'moment/locale/zh-cn';// 手动引入
```

`index.js` 中只引入 `moment`，打包出来的 `bundle.js` 大小为 `263KB`，如果配置了 `IgnorePlugin`，单独引入 `moment/locale/zh-cn`，构建出来的包大小为 `55KB`。

### 10.externals

我们可以将一些JS文件存储在 `CDN` 上(减少 `Webpack`打包出来的 `js` 体积)，在 `index.html` 中通过 `<script>` 标签引入，如:

```
复制代码<!DOCTYPE html>
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

我们希望在使用时，仍然可以通过 `import` 的方式去引用(如 `import $ from 'jquery'`)，并且希望 `webpack` 不会对其进行打包，此时就可以配置 `externals`。

```
复制代码//webpack.config.js
module.exports = {
    //...
    externals: {
        //jquery通过script引入之后，全局中即有了 jQuery 变量
        'jquery': 'jQuery'
    }
}
```

### 11.DllPlugin

有些时候，如果所有的JS文件都打成一个JS文件，会导致最终生成的JS文件很大，这个时候，我们就要考虑拆分 `bundles`。

`DllPlugin` 和 `DLLReferencePlugin` 可以实现拆分 `bundles`，并且可以大大提升构建速度，`DllPlugin` 和 `DLLReferencePlugin` 都是 `webpack` 的内置模块。

我们使用 `DllPlugin` 将不会频繁更新的库进行编译，当这些依赖的版本没有变化时，就不需要重新编译。我们新建一个 `webpack` 的配置文件，来专门用于编译动态链接库，例如名为: `webpack.config.dll.js`，这里我们将 `react` 和 `react-dom` 单独打包成一个动态链接库。

```
复制代码//webpack.config.dll.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        react: ['react', 'react-dom']
    },
    mode: 'production',
    output: {
        filename: '[name].dll.[hash:6].js',
        path: path.resolve(__dirname, 'dist', 'dll'),
        library: '[name]_dll' //暴露给外部使用
        //libraryTarget 指定如何暴露内容，缺省时就是 var
    },
    plugins: [
        new webpack.DllPlugin({
            //name和library一致
            name: '[name]_dll', 
            path: path.resolve(__dirname, 'dist', 'dll', 'manifest.json') //manifest.json的生成路径
        })
    ]
}
```

在 `package.json` 的 `scripts` 中增加:

```
复制代码{
    "scripts": {
        "dev": "NODE_ENV=development webpack-dev-server",
        "build": "NODE_ENV=production webpack",
        "build:dll": "webpack --config webpack.config.dll.js"
    },
}
```

执行 `npm run build:all`，可以看到 `dist` 目录如下，之所以将动态链接库单独放在 `dll` 目录下，主要是为了使用 `CleanWebpackPlugin` 更为方便的过滤掉动态链接库。

```
复制代码dist
└── dll
    ├── manifest.json
    └── react.dll.9dcd9d.js
```

`manifest.json` 用于让 `DLLReferencePlugin` 映射到相关依赖上。

修改 `webpack` 的主配置文件: `webpack.config.js` 的配置：

```
复制代码//webpack.config.js
const webpack = require('webpack');
const path = require('path');
module.exports = {
    //...
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist', 'dll', 'manifest.json')
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] //不删除dll目录
        }),
        //...
    ]
}
```

使用 `npm run build` 构建，可以看到 `bundle.js` 的体积大大减少。

修改 `public/index.html` 文件，在其中引入 `react.dll.js`

```
复制代码<script src="/dll/react.dll.9dcd9d.js"></script>
```

> 构建速度



![DllPlugin.jpeg](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/14/170d9bf27efef7f5~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)



> 包体积



![dll-size.jpeg](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/14/170d9bf2f995e7e2~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)



### 12.抽离公共代码

抽离公共代码是对于多页应用来说的，如果多个页面引入了一些公共模块，那么可以把这些公共的模块抽离出来，单独打包。公共代码只需要下载一次就缓存起来了，避免了重复下载。

抽离公共代码对于单页应用和多页应该在配置上没有什么区别，都是配置在 `optimization.splitChunks` 中。

```
复制代码//webpack.config.js
module.exports = {
    optimization: {
        splitChunks: {//分割代码块
            cacheGroups: {
                vendor: {
                    //第三方依赖
                    priority: 1, //设置优先级，首先抽离第三方模块
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1 //最少引入了1次
                },
                //缓存组
                common: {
                    //公共模块
                    chunks: 'initial',
                    name: 'common',
                    minSize: 100, //大小超过100个字节
                    minChunks: 3 //最少引入了3次
                }
            }
        }
    }
}
```

即使是单页应用，同样可以使用这个配置，例如，打包出来的 bundle.js 体积过大，我们可以将一些依赖打包成动态链接库，然后将剩下的第三方依赖拆出来。这样可以有效减小 bundle.js 的体积大小。当然，你还可以继续提取业务代码的公共模块，此处，因为我项目中源码较少，所以没有配置。



![splitChunks.jpeg](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/14/170d9bf31f45e7a4~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)



> runtimeChunk

`runtimeChunk` 的作用是将包含 `chunk` 映射关系的列表从 `main.js` 中抽离出来，在配置了 `splitChunk` 时，记得配置 `runtimeChunk`.

```
复制代码module.exports = {
    //...
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        }
    }
}
```

最终构建出来的文件中会生成一个 `manifest.js`。

#### 借助 webpack-bundle-analyzer 进一步优化

在做 `webpack` 构建优化的时候，`vendor` 打出来超过了1M，`react` 和 `react-dom` 已经打包成了DLL。

因此需要借助 `webpack-bundle-analyzer` 查看一下是哪些包的体积较大。

首先安装依赖：

```
复制代码npm install webpack-bundle-analyzer -D
```

使用也很简单，修改下我们的配置：

```
复制代码//webpack.config.prod.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
module.exports = merge(baseWebpackConfig, {
    //....
    plugins: [
        //...
        new BundleAnalyzerPlugin(),
    ]
})
```

`npm run build` 构建，会默认打开： `http://127.0.0.1:8888/`，可以看到各个包的体积：



![W1.jpeg](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/14/170d9bf330fb2a0b~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)



进一步对 `vendor` 进行拆分，将 `vendor` 拆分成了4个(使用 `splitChunks` 进行拆分即可)。

```
复制代码module.exports = {
    optimization: {
    concatenateModules: false,
    splitChunks: {//分割代码块
      maxInitialRequests:6, //默认是5
      cacheGroups: {
        vendor: {
          //第三方依赖
          priority: 1,
          name: 'vendor',
          test: /node_modules/,
          chunks: 'initial',
          minSize: 100,
          minChunks: 1 //重复引入了几次
        },
        'lottie-web': {
          name: "lottie-web", // 单独将 react-lottie 拆包
          priority: 5, // 权重需大于`vendor`
          test: /[\/]node_modules[\/]lottie-web[\/]/,
          chunks: 'initial',
          minSize: 100,
          minChunks: 1 //重复引入了几次
        },
        //...
      }
    },
  },
}
```

重新构建，结果如下所示：



![W2.jpeg](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/14/170d9bf36fcad19c~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)



### 13.webpack自身的优化

#### tree-shaking

如果使用ES6的`import` 语法，那么在生产环境下，会自动移除没有使用到的代码。

```
复制代码//math.js
const add = (a, b) => {
    console.log('aaaaaa')
    return a + b;
}

const minus = (a, b) => {
    console.log('bbbbbb')
    return a - b;
}

export {
    add,
    minus
}
复制代码//index.js
import {add, minus} from './math';
add(2,3);
```

构建的最终代码里，`minus` 函数不会被打包进去。

#### scope hosting 作用域提升

变量提升，可以减少一些变量声明。在生产环境下，默认开启。

另外，大家测试的时候注意一下，`speed-measure-webpack-plugin` 和 `HotModuleReplacementPlugin` 不能同时使用，否则会报错:



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/14/170d9bf389ae1379~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)



#### babel 配置的优化

如果你对 `babel` 还不太熟悉的话，那么可以阅读这篇文章：[不容错过的 Babel7 知识](https://juejin.cn/post/6844904008679686152)。

在不配置 `@babel/plugin-transform-runtime` 时，`babel` 会使用很小的辅助函数来实现类似 `_createClass` 等公共方法。默认情况下，它将被注入(`inject`)到需要它的每个文件中。但是这样的结果就是导致构建出来的JS体积变大。

我们也并不需要在每个 `js` 中注入辅助函数，因此我们可以使用 `@babel/plugin-transform-runtime`，`@babel/plugin-transform-runtime` 是一个可以重复使用 `Babel` 注入的帮助程序，以节省代码大小的插件。

因此我们可以在 `.babelrc` 中增加 `@babel/plugin-transform-runtime` 的配置。

```
复制代码{
    "presets": [],
    "plugins": [
        [
            "@babel/plugin-transform-runtime"
        ]
    ]
}
```

以上就是我目前为止使用到的一些优化，如果你有更好的优化方式，欢迎在评论区留言，感谢阅读。

看完这篇文之后，是时候去撸个脚手架了：[【中高级前端必备】手摸手教你撸一个脚手架](https://juejin.cn/post/6844903896163303438)

### 最后

如果本文对你有帮助的话，给本文点个赞吧。

> 关注公众号



![掘金使用](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/14/170d9bf3c5cff80b~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)



> 参考文档：

- [webpack优化的一些基本方法](https://juejin.cn/post/6844903974810681358)
- [模块(Module)](https://link.juejin.cn/?target=http%3A%2F%2Fwebpack.html.cn%2Fconfiguration%2Fmodule.html)
- [IgnorePlugin](https://link.juejin.cn/?target=http%3A%2F%2Fwebpack.html.cn%2Fplugins%2Fignore-plugin.html)
- [DllPlugin](https://link.juejin.cn/?target=http%3A%2F%2Fwebpack.html.cn%2Fplugins%2Fdll-plugin.html)
- [使用 Webpack 的 DllPlugin 提升项目构建速度](https://juejin.cn/post/6844903777296728072)
- [使用 HappyPack](https://link.juejin.cn/?target=http%3A%2F%2Fwww.xbhub.com%2Fwiki%2Fwebpack%2F4%E4%BC%98%E5%8C%96%2F4-3%E4%BD%BF%E7%94%A8HappyPack.html)
- [webapck4抽取公共模块“SplitChunksPlugin”](https://link.juejin.cn/?target=https%3A%2F%2Fwww.cnblogs.com%2Fxieqian%2Fp%2F10973039.html)
- [webpack之优化篇（四）：hard-source-webpack-plugin,webpack DllPlugin配置的代替方案](https://link.juejin.cn/?target=https%3A%2F%2Fblog.csdn.net%2Fhope_It%2Farticle%2Fdetails%2F102691300)