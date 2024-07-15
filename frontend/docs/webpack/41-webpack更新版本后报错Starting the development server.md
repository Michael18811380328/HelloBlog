# Starting the development server 报错和解决

create time 2024-04-12

last modify time 2024-04-12

## 问题描述

最近某个项目开发环境升级后，运行 npm start 后无法启动项目，终端始终显示 Starting the development server...，浏览器 localhost: 3000 界面显示空白。

~~~bash
> node scripts/start.js
Starting the development server...
~~~

错误截图

## 问题分析

因为近期升级了环境，那么大概率是 webpack 或者 webpack-dev-server 的问题，具体升级的开发环境是 webpack4 升级到 webpack5，版本号为：

~~~js
"webpack"*: "^5.64.4",
"webpack-dev-server"*: "^4.6.0",
~~~

查阅各种资料，有下面几个问题需要注意：

### 问题1 3000 端口占用

Webpack-dev-server 默认在 3000 端口开启服务，如果其他服务已经在 3000 端口启动，那么会出现端口冲突，造成这个项目的 dev-server 无法启动。

此时需要先查看 3000 端口是否占用，可以使用 lsof 命令查看：

~~~bash
lsof -i:3000
~~~

如果有其他服务占用端口，会显示具体的服务和信息，如下。调试时可以关闭这个服务。

~~~
COMMAND   PID    USER   FD   TYPE DEVICE                 SIZE/OFF NODE   NAME
node    63036 michael   26u  IPv4 0xji89182a14fd8b3      0t0      TCP    *:hbci (LISTEN)
~~~

我本地没有其他服务占用 3000 端口，应该是其他问题。

### 问题2 环境变量 sourcemap 配置

项目升级后，没有设置 GENERATE_SOURCEMAP 属性

可以添加一个 .env 文件，配置环境变量，或者在 npm 脚本中设置环境变量

~~~bash
GENERATE_SOURCEMAP=false
~~~

### 问题3 项目的入口函数

更改后，我的终端 webpack-dev-server 可以正常启动了，但是浏览器中还是空白的。

查看控制台，HTML 渲染正常，但是 JS 没有挂载到 root 根节点，问题定位到入口函数。

这个项目是一个 UI 组件库。生产环境下是一个入口（index.js），开发环境是另一个入口（index2.js），所以需要配置两个入口文件，然后根据环境不同，使用不同的入口函数。

路径文件中增加配置项 path.js

~~~js
appIndexJs: resolveModule(resolveApp, 'src/index'),
applocalIndexJs: resolveModule(resolveApp, 'src/index2'),
~~~

webpack 根据环境设置入口

~~~js
entry: [
  isEnvDevelopment ? paths.applocalIndexJs : paths.appIndexJs,
]
~~~

此时 entry 就正常了

### 问题4 模块循环引用

早期代码存在存在循环引用，其中两个模块对外暴露很多函数，不同函数互相引用，造成循环引用。

从代码层面，我先解决了循环引用的问题，这样也便于后面单元测试和模块的维护。

从 webpack 打包构建层面，可以使用 CircularDependencyPlugin 避免循环引用的问题，配置如下。

~~~js
const CircularDependencyPlugin = require('circular-dependency-plugin');

plugins: [
  new CircularDependencyPlugin({
    exclude: /node_modules/,
    include: /src/,
    failOnError: false,
    allowAsyncCycles: false,
    cwd: process.cwd(),
  }),
],
~~~

### 问题5 模块 splitChunk 问题

早期项目是一个 UI 项目，为了使用方便，使用了按需加载的语法实现，避免将全部 UI 项目引入到项目中。所以早期的代码如下：

~~~js
optimization: {
  splitChunks: {
    chunks: 'all',
    name: false,
  },
  runtimeChunk: {
    name: entrypoint => `runtime-${entrypoint.name}`,
  },
}
~~~

根据实际情况，在开发环境下不需要按需加载，在生产环境下需要按需加载，那么加入判断

~~~js
optimization: {
  splitChunks: isEnvProduction ? {
    chunks: 'all',
    name: false,
  } : false,
  runtimeChunk: isEnvProduction ? {
    name: entrypoint => `runtime-${entrypoint.name}`,
  } : false,
}
~~~

修改后，再次运行 npm start，终端显示正常，浏览器中打开 localhost: 3000 项目可以正常启动。

## 反思

1、webpack 注意版本号，网上很多博客可能是 3.x 或者 4.x 的版本，这样造成配置文件不合适。

2、webpack 插件很多很多，后续还是要多学习。

3、几年前刚开始学习计算机，自己看到 webpack 配置一头雾水，现在大概知道主要配置，能解决一些常见问题了，确实需要不断积累和应用。

## 参考链接

webpack 官方的插件文档

https://webpack.docschina.org/plugins/

https://webpack.docschina.org/awesome-webpack/#Webpack-Plugins

splitTrunk 配置和功能

https://juejin.cn/post/6844903680307625997

https://juejin.cn/post/6844904195737255943
