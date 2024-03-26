# create-react-app入门教程

create time 2019-01-01

last modify time 2024-04-12

`Create React App`是官方出的一个构建`React`单页面应用的脚手架工具。它本身集成了`Webpack`，并配置了一系列内置的`loader`和默认的npm的脚本，可以很轻松的实现零配置就可以快速开发React的应用。

[官网文档](https://facebook.github.io/create-react-app/docs/documentation-intro)

## Quick Start

### 全局安装

```sh
# 全局安装
npm install -g create-react-app

# 构建一个my-app的项目
npx create-react-app my-app
```

## 公共目录

公共目录里面的内容不会被webpack进行处理，仅仅会拷贝到最终生成的项目的根目录下。

### HTML模板修改

在`public`目录中有个`index.html`是单页面应用的基本模板，所有react生成的代码都会注入到此HTML中。所以此处可以添加一些cdn脚本或者全局的html。

### 添加全局的资源（图片、字体、svg、视频等）

在公共目录下，你可以放字体文件、图片、svg等文件，访问这些文件最好添加 `%PUBLIC_URL%`作为根目录。

## 环境变量

巧妙的使用环境变量可以帮我们在项目中区分开生产环境还是编译环境，从而执行不同的代码。

### 添加自定义环境变量文件`.env`

项目根目录下创建`.env`文件，文件内部添加 `key=value`的配置可以直接应用于项目的编译中。

```sh
REACT_APP_NOT_SECRET_CODE=abcdef
```

> Note: 如果创建自定义的环境变量必须以`REACT_APP_`开头.

### 在项目中使用环境变量

在项目中可以直接用`process.env.XXX`访问我们的自定义的环境变量。比如：

- js中使用

```js
render() {
  return (
    <div>
      <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      <form>
        <input type="hidden" defaultValue={process.env.REACT_APP_NOT_SECRET_CODE} />
      </form>
    </div>
  );
}
```

再比如：判断是否是生产环境

```js
if (process.env.NODE_ENV !== 'production') {
  analytics.disable();
}
```

## 配合TypeScript

第一种方式：创建项目的时候直接配置好`TypeScript`.

```sh
npx create-react-app my-app --typescript
```

第二种方式：为现有的React项目添加`TypeScript`

```sh
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

## 配置代理

### `package.json`配置代理

配置简单代理，直接在package.json文件中添加proxy节点即可：

```json
{
  ...
  "proxy": "http://localhost:4000",
  ...
}
```

### 自定义配置代理

第一步：安装 `http-proxy-middleware`

```sh
$ npm install http-proxy-middleware --save
```

第二步：创建： `src/setupProxy.js` 添加如下内容:

~~~js
const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:5000/' }));
};
~~~

## HTTPS托管静态站

有时候需要用HTTPS进行调试相关结构，所以需要把静态站也做成HTTPS的，那么以下配置：

配置`HTTPS`的环境变量为`true`然后再用`npm start`启动`dev server`就是HTTPS的了。

```sh
HTTPS=true npm start
```

浏览器可能有安全警告，不用管，直接测试，enjoy it！

## 分析包结构的大小

`Source map explorer`可以帮助我们分析代码最终打包的`bundles`的代码来自哪里

安装：

```sh
npm install --save source-map-explorer
```

添加分析脚本到`package.json`的`scripts`中：

```diff
   "scripts": {
+    "analyze": "source-map-explorer build/static/js/main.*",
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test",
```

那么就可以运行以下命令进行分析最终打包的情况了：

```sh
npm run build
npm run analyze
```

说明：此时 webpack 需要开启 sourcemap 配置才能正常使用。如果没有开启 sourcemap 则无法分析。
