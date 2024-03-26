# HappyPack多个进程处理loader-HappyPack优化构建(九)

#### 什么是HappyPack? 作用是什么？

Webpack是允许在NodeJS中的，它是单线程模型的，因此webpack在构建文件时，比如js，css，图片及字体时，它需要一个一个去解析和编译，不能同时处理多个任务。

特别当文件数量变多后，webpack构建慢的问题会显得更为严重。

因此HappyPack出现了，它能让webpack同时处理多个任务，它将任务分解给多个子进程去并发执行，子进程处理完成后再将结果发送给主进程中。

#### HappyPack的基本原理?

在webpack构建过程中，我们需要使用Loader对js，css，图片，字体等文件做转换操作，并且转换的文件数据量也是非常大的，且这些转换操作不能并发处理文件，而是需要一个个文件进行处理，HappyPack的基本原理是将这部分任务分解到多个子进程中去并行处理，子进程处理完成后把结果发送到主进程中，从而减少总的构建时间。

使用案例
安装依赖库

~~~bash
npm i -D happypack
~~~

webpack.config.js 配置如何使用 happypack
在plugin中配置happypack实例
在loader中使用 happypack 创建的进程


~~~js
// 引入HappyPack插件 
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
console.log("happyThreadPool:" + happyThreadPool)
// 构造出共享进程池，在进程池中包含 5 个子进程
// const happyThreadPool = HappyPack.ThreadPool({ size : 5 }) ;

module.exports = {
  mode: "development",
  // mode: "production",
  entry: {
    main: "./main.js"
    // lodash: './src/template/lodash.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  resolve: {
    // 定义路径别名
    alias: {
      "@": path.resolve(__dirname, "./"),
      // @src 代表 “工程目录/src”
      "@src": path.resolve(__dirname, "./src"),
      // @component 代表 “工程目录/src/components”
      "@component": path.resolve(__dirname, "./src/components")
    },
    // 指定第三方模块加载的路径，例如 jquery 、lodash等
    modules: ["node_modules", "./lib/components"],
    // 如果引入的文件没有后缀名，默认会优先去找 js文件，如果没有就去找 ts文件，如果没有就找json文件，依次类推，默认是 js
    extensions: [".js", ".ts", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 排除 node_modules 和 bower_components 下的文件
        exclude: /(node_modules|bower_components)/,
        use: {
          // loader: "babel-loader",
          loader: 'happypack/loader?id=babel',
          // options: {
          //   presets: [
          //     [
          //       "@babel/preset-env",
          //       {
          //         // 只引用使用了新特性 polyfill
          //         // useBuiltIns: 'usage'
          //       }
          //     ]
          //   ]
          // }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use: {
          loader: "file-loader",
          options: {
            esModule: false, // 这里设置为false
            outputPath: "fonts/", // 指定字体输入的文件夹，打包地址是 “/dist/fonts/字体文件”
            publicPath: "/fonts" // 指定字体的路径，即打包结果引入的地址是 "/fonts/字体文件名"
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'happypack/loader?id=image',
						// loader: "url-loader",
            // options: {
            //   esModule: false, // 这里设置为false
            //   outputPath: "images/", // 指定图片输入的文件夹， 打包地址是 “/dist/images/图片名字”
            //   publicPath: "/images", // 指定获取图片的路径，即打包结果引入的地址是 "/images/图片名字"
            //   // limit  (如果小于 8192字节 ，则转为base64，否则返回一个url地址)
            //   limit: 8192,
            //   name: "[name].[hash:8].[ext]" // 输入的图片名
            // }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        /**
         * loader 是从又向做执行
         * 1. 最先执行 sass-loader ，将 sass 文件转为css
         * 2. css-loader 将转换后的css文件转为 js模块
         * 3. style-loader 将 css 插入到HTML中的<style>标签中
         */
        use: [
          devMode
            ? {
                loader: "style-loader" // 将 JS 字符串生成为 style 节点
              }
            : MiniCssExtractPlugin.loader,
          {
            // loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
            loader: 'happypack/loader?id=css-pack' // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: "sass-loader" // 将 Sass 编译成 CSS
          }
        ]
        // 等价于
        // use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), //删除上次打包文件，默认目录'./dist'
    
    /****   使用HappyPack实例化    *****/
    new HappyPack({
      // 用唯一的标识符id来代表当前的HappyPack 处理一类特定的文件
      id: 'babel',
      // 使用共享进程池中的子进程去处理任务。
      // threadPool: happyThreadPool,
      // 如何处理.js文件，用法和Loader配置是一样的
      loaders: [{
        loader: 'babel-loader',
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                // 只引用使用了新特性 polyfill
                // useBuiltIns: 'usage'
              }
            ]
          ]
        }
      }]
    }),
    new HappyPack({
      id: 'image',
      // threadPool: happyThreadPool,
      loaders: [{
        loader: 'url-loader',
        options: {
          esModule: false, // 这里设置为false
          outputPath: "images/", // 指定图片输入的文件夹， 打包地址是 “/dist/images/图片名字”
          publicPath: "/images", // 指定获取图片的路径，即打包结果引入的地址是 "/images/图片名字"
          // limit  (如果小于 8192字节 ，则转为base64，否则返回一个url地址)
          limit: 8192,
          name: "[name].[hash:8].[ext]" // 输入的图片名
        }
      }]
    }),
    // 处理css文件
    new HappyPack({
      id: 'css-pack',
      // threadPool: happyThreadPool,
      loaders: [{
        loader: 'css-loader'
      }]
    })
  ],

};
~~~

#### 配置说明

happypack/loader?id=xx 紧跟的id=xxx,就是告诉happy-loader选择哪个happyPack的实列处理文件。

在plugin插件配置中新增了HappyPack的实列，作用是告诉HappyPack如何处理该文件

webpack配置问题：HappyPack: plugin for the loader ‘1’ could not be found？

用了 happypack 之后，不能在 rules 里面的相关 loader 中配置 options，相反只能在 happypack 插件中配置 options

