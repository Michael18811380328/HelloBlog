# rollup打包工具基础配置使用详解

## 使用详解

### 前言

**Rollup官方解析：** Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library（库） 或应用程序

**webpack官方解析：** webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。(webpack存在大量引导代码和模块函数)

> vue框架源码是使用Rollup进行打包的，而且rollup和webpack相比更适用于框架的开发，打包后的代码可读性更高。

**使用Rollup的开源项目：** - vue - vuex - vue-router

使用webpack的项目： - ElementUI - mint-ui - vue-cli

从上面使用场景可以大概分析出，Rollup 偏向应用于js库，webpack 偏向应用于前端工程，UI 库。

如果你的应用场景中只是 js 代码，希望做 ES 转换，模块解析，可以使用 Rollup。 如果你的场景中涉及到 css、html，涉及到复杂的代码拆分合并，建议使用 webpack。

### 介绍

- esModule打包器
- 将项目中散落的小模块打包成整块的代码，让划分的小模块可以更好地运行在浏览器环境和nodejs环境
- 作用： 与webpack非常类似
- 对比： Rollup相对于webpack更小巧，webpack可以完成项目中各种工程化的需求，而Rollup仅仅是一款ESM（ESmodule）打包器，没有任何其它的功能。 例如，webpack中有HMR（热替换功能），Rollup中没有
- Rollup的意义： 提供一个充分利用ESM各项特性的高效打包器。利用ESmodule的各种特性构建出结构比较扁平，性能比较出众的类库。

### 注意点

1. type字段的产生用于定义package.json文件和该文件所在目录根目录中.js文件和无拓展名文件的处理方式。值为'module'则当作es模块处理；值为'commonjs'则被当作commonJs模块处理。
2. 目前node默认的是如果pacakage.json没有定义type字段，则按照commonJs规范处理。
3. node官方建议包的开发者明确指定package.json中type字段的值。
4. 无论package.json中的type字段为何值，.mjs的文件都按照es模块来处理，.cjs的文件都按照commonJs模块来处理。

> 执行build的时候，因为rollup.config.js使用的是es模块语法，package.json不声明type值为module，会报错，或者把rollup.config.js改成rollup.config.mjs再执行。


### 安装

初始化项目包：npm init

安装 rollup：npm i rollup -D

创建 rollup 配置文件：rollup.config.js

```js
// rollup.config.js
export default {
  input: "", // 入口
  output: {}, // 出口
  external: [], // 外部依赖的配置
  plugins: [], // 各种插件使用的配置
  global: {}, // 全局变量的配置
};
```

### 使用

### input

入口的配置字段为 input

### 单入口配置

单个入口的配置只需要为 input 指定一个入口文件即可

```js
export default {
  input:'./src/main.js', // 入口文件
  output:{
    file:'./dist/bundle.js', // 输出文件
    format: 'es', // 输出格式 amd / es / cjs / iife / umd / system
    name:'func',  // 当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...
    sourcemap:true  // 生成bundle.js.map文件，方便调试
  }
}
```

### 多入口配置

多个入口配置需要将导出的配置设置为数组，数组的项为一个对象，每一个对象都可以单独配置。

```js
export default [
  {
    input:'./src/main.js', // 入口文件
    output:{
      file:'./dist/bundle.js', // 输出文件
      format: 'es', // 输出格式 amd / es / cjs / iife / umd
      name:'func',  // 当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...
      sourcemap:true  // 生成bundle.js.map文件，方便调试
    }
  },
  {
    input:'./src/main2.js',
    output:{
      file:'./dist/bundle2.js',
      format: 'es',
      name:'func',
      sourcemap:true
    }
  },
]
```

### output

出口的配置字段为 output，一个出口时output使用对象形式，多个出口使用数组形式。

- file：出口的地址以及打包的名字
- format：打包的格式，格式分为五种分别为：amd / es / cjs / iife / umd
- name：当 format 为 iife 和 umd 时必须提供，将作为全局变量挂在window(浏览器环境)下
- sourcemap：生成 main.map.js 文件，方便调试
- banner：为打包好的文件添加注释，注释的位置在整个文件的首行
- footer：为打包好的文件添加注释，注释的位置在整个文件的尾行
- intro：为打包好的文件添加注释，注释的位置在打包数据内容的头部
- outro：为打包好的文件添加注释，注释的位置在打包数据内容的末尾

> banner、footer、intro、outro 可以不用配置在出口中。

### 单出口配置

```js
export default {
  input:'./src/main.js', // 入口
  output: {
    file:'./dist/bundle.js', // 出口
    format: 'es',
    name:'func',
    sourcemap:true,
    banner: '// qqqqq',
  },
}
```

### 多出口配置

```js
export default {
  input:'./src/main.js', // 入口
  output: [
    {
      file:'./dist/bundle.js', // 出口
      format: 'es',
      name:'func',
      sourcemap:true,
      banner: '// qqqqq',
    },
    {
      file:'./dist/bundle2.js', // 出口
      format: 'es',
      name:'func',
      sourcemap:true,
      banner: '// cccc',
    },
  ]
}
```

### external

需要保持某些库外部引用状态，这时需要使用 external 属告诉 rollup.js 哪些是外部的类库，不需要将这些外部类库进行打包。

确保外部化处理不想打包进库的依赖。

```js
import resolve from "@rollup/plugin-node-resolve";

export default {
  input:'./src/main.js', // 入口
  output: {
    file:'./dist/bundle.js', // 出口
    format: 'es',
    name:'func',
    sourcemap:true,
    banner: '// qqqqq',
  },
  plugins: [resolve()],
  external: ["the-answer"],
}
```

**main.js 源文件代码**

```js
import answer from 'the-answer';

console.log('answer', answer)
```

**未保持外部引入打包后代码**

```js
var index = 42;

console.log('answer', index);
```

**保持外部引入打包后代码**

```js
import answer from 'the-answer';

console.log('answer', answer);
```

### plugins

### node模块的引用

> 在某些时候，项目可能取决于从NPM安装到node_modules文件夹中的软件包。 与Webpack和Browserify等其他捆绑软件不同，Rollup不知道如何开箱即用、如何处理这些依赖项，因此需要添加一些插件配置。
> rollup.js编译源码中的模块引用默认只支持 ES6+的模块方式import/export。然而大量的npm模块是基于CommonJS模块方式，这就导致了大量 npm 模块不能直接编译使用，导致打包报错。所以辅助rollup.js编译支持 npm模块和CommonJS模块方式的插件就应运而生。

```text
npm install @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-json --save-dev
```

- @rollup/plugin-node-resolve 插件允许我们加载第三方模块
- @rollup/plugin-commonjs 插件将它们转换为ES6版本
- @rollup/plugin-json 支持导入json，没有 json 插件的支持我们在导入 json 文件时会报错

```js
// rollup.config.js 配置
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input:'./src/main.js', // 入口
  output: {
    file:'./dist/bundle.js', // 出口
    format: 'es',
  },
  plugins: [
    commonjs({
      include: /node_modules/
    }),
    json(),
    resolve()
  ],
}
```

**使用第三方库 lodash**

```js
// npm install lodash

// main.js引入lodash
import _ from 'lodash';

console.log(_.concat([1, 2], 3, [4, 5]));
```

> 执行npm run build 后会看到打包后的文件多了很多内容，这些代码就是ladash的代码，被打包整合进来了。

**补充**

如果不想第三方库被打包进来，而可以在外面引入，配合使用的话，可以在`rollup.config.js`中配置 `external: ['lodash']`。

### 支持别名

安装`@rollup/plugin-alias`插件，插件提供了为模块起别名的功能。

```js
npm i @rollup/plugin-alias --save-dev
// rollup.config.js 配置

import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import alias from "@rollup/plugin-alias";
import path from 'path'
import { fileURLToPath } from 'url';

// __filename包含当前模块文件的绝对路径
const __filename = fileURLToPath(import.meta.url);

/**
内部变量:

ES6 模块应该是通用的，同一个模块不用修改，就可以用在浏览器环境和服务器环境。为了达到这个目标，Node.js 规定 ES6 模块之中不能使用 CommonJS 模块的特有的一些内部变量。

首先，就是this关键字。ES6 模块之中，顶层的this指向undefined；CommonJS 模块的顶层this指向当前模块，这是两者的一个重大差异。

其次，以下这些顶层变量在 ES6 模块之中都是不存在的。

arguments
require
module
exports
__filename
__dirname

* 通过使用某些函数创建一个自定义__dirname变量来修复“__dirname is not defined in ES module scope”错误。
* 该变量就像全局变量一样工作，直接包含文件当前工作的完整路径。
* __dirname包含当前模块文件目录的绝对路径。
*/
const __dirname = path.dirname(__filename);

const pathResolve = (p) => path.resolve(__dirname, p);

export default {
  input:'./src/main.js', // 入口
  output: {
    file:'./dist/bundle.js', // 出口
    format: 'es',
    name:'func',
  },
  plugins: [
    commonjs({
      include: /node_modules/
    }),
    json(),
    resolve(),
    alias({
      resolve: [".jsx", ".js"], // 可选，默认情况下这只会查找 .js 文件或文件夹
      entries: {
        "@": pathResolve("src"),
        _: __dirname,
      },
    }),
  ],
  external: ['lodash', 'jquery'],
}
// main.js中使用别名

import { name } from '@/modules/myModule';
console.log('hello ' + name);
```

### 代码压缩

使用`@rollup/plugin-terser`进行打包代码压缩。

```js
npm i @rollup/plugin-terser --save-dev
// rollup.config.js 配置
import terser from '@rollup/plugin-terser';

export default {
  plugins: [
    terser(),
  ],
}
```

### 开启本地服务器 & 热更新

- `rollup-plugin-serve` 开启本地服务器
- `rollup-plugin-livereload` 开启热更新，实时刷新页面

```js
npm i rollup-plugin-serve rollup-plugin-livereload --save-dev
// rollup.config.js 配置
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

export default {
  plugins: [
    serve({ 
      open: true, // 是否打开浏览器
      contentBase: "./", // 入口 html 文件位置
      historyApiFallback: true, // 设置为 true 返回 index.html 而不是 404
      host: "localhost", // 
      port: 3000 // 端口号
    }),
    livereload(),
  ],
}
```

`package.json`文件配置启动脚本命令

```json
{
  "scripts": {
    "dev": "rollup -cw"
  },
}
```

`index.html`文件中引入`bundle.js`打包文件

```html
<script src="./dist/bundle.js"></script>
```

### eslint

`@rollup/plugin-eslint` 使用代码检查功能

```text
npm i @rollup/plugin-eslint --save-dev
```

需要创建`.eslintrc`文件配置 eslint 规则

1、使用`.eslintrc.js`文件格式，如果`package.json`中配置`"type": "module"`，则需要更改文件后缀名为`.eslintrc.cjs`。

```js
// .eslintrc.cjs
module.exports = {
  "root": true,
  "parserOptions": {
    "ecmaVersion": 6,       // 支持es6
    "sourceType": "module"  // 使用 es6 模块化
  },
  "env": { // 设置环境
    "browser": true,   // 支持浏览器环境： 能够使用window上的全局变量
    "node": true       // 支持服务器环境:  能够使用node上global的全局变量
  },
  "extends": "eslint:recommended", // 使用 eslint 推荐的默认规则 https://cn.eslint.org/docs/rules/
  "globals": {  // 声明使用的全局变量, 这样即使没有定义也不会报错了
    "$": "readonly" // $ 只读变量
  },
  "rules": {  // eslint检查的规则  0 忽略 1 警告 2 错误
    "no-console": 0,    // 不检查 console
    "eqeqeq": 1,    // 用 == 而不用 === 就警告
    "no-alert": 2 // 不能使用 alert
  }
}
```

2、使用`.eslintrc.json`文件格式

```text
// .eslintrc.json
{
  "root": true,
  "parserOptions": {
    "ecmaVersion": 6,       // 支持es6
    "sourceType": "module"  // 使用 es6 模块化
  },
  "env": { // 设置环境
    "browser": true,   // 支持浏览器环境： 能够使用window上的全局变量
    "node": true       // 支持服务器环境:  能够使用node上global的全局变量
  },
  "extends": "eslint:recommended", // 使用 eslint 推荐的默认规则 https://cn.eslint.org/docs/rules/
  "globals": {  // 声明使用的全局变量, 这样即使没有定义也不会报错了
    "$": "readonly" // $ 只读变量
  },
  "rules": {  // eslint检查的规则  0 忽略 1 警告 2 错误
    "no-console": 0,    // 不检查 console
    "eqeqeq": 1,    // 用 == 而不用 === 就警告
    "no-alert": 2 // 不能使用 alert
  }
}
```

在`rollup.config.js`中配置eslint插件

```js
// rollup.config.js
import eslint from "@rollup/plugin-eslint";

export default {
  plugins: [
    eslint({
      include: ['src/**/*.js'] // 需要检查的部分
    })
  ],
}
```

ESLint 支持几种格式的配置文件：

- JavaScript - 使用 .eslintrc.js 然后输出一个配置对象。
- YAML - 使用 .eslintrc.yaml 或 .eslintrc.yml 去定义配置的结构。
- JSON - 使用 .eslintrc.json 去定义配置的结构，ESLint 的 JSON 文件允许 JavaScript 风格的注释。
- (弃用) - 使用 .eslintrc，可以使 JSON 也可以是 YAML。
- package.json - 在 package.json 里创建一个 eslintConfig属性，在那里定义你的配置。

如果同一个目录下有多个配置文件，ESLint 只会使用一个。优先级顺序如下：

1. .eslintrc.js
2. .eslintrc.yaml
3. .eslintrc.yml
4. .eslintrc.json
5. .eslintrc
6. package.json

### tree-shaking

tree shaking是rollup提出的，这也是rollup一个非常重要的feature，那什么是tree shaking，rollup的解释是在构建代码时，在使用ES6模块化的代码中，会对你的代码进行静态分析，只打包使用到的代码。这样的好处是减少代码的体积。

与 Webpack 不同的是，Rollup 不仅仅针对模块进行依赖分析，它的分析流程如下：

1. 从入口文件开始，组织依赖关系，并按文件生成 Module
2. 生成抽象语法树（Acorn），建立语句间的关联关系
3. 为每个节点打标，标记是否被使用
4. 生成代码（MagicString+ position）去除无用代码

### 设置环境变量NODE_ENV

### windows

set NODE_ENV=production

```json
"scripts": {
    "build": "set NODE_ENV=production && rollup -c",
    "dev": "set NODE_ENV=development && rollup -wc",
}
```

### linux & mac

export NODE_ENV=production

```json
"scripts": {
    "dev": "NODE_ENV=development rollup -wc",
    "build": "NODE_ENV=production rollup -c",
}
```

### 跨平台设置

依赖 cross-env 模块

```
npm install -D cross-env
"scripts": {
    "dev": "cross-env NODE_ENV=development rollup -wc",
    "build": "cross-env NODE_ENV=production rollup -c",
}
```

**根据环境配置插件**

```js
const NODE_ENV = process.env.NODE_ENV; // 环境变量
const isProd = NODE_ENV === 'production';

let envPlugins = []
if (isProd) {
  envPlugins = [
    terser(),
  ]
} else {
  envPlugins = [
    serve({ 
      open: true, // 是否打开浏览器
      contentBase: "./", // 入口 html 文件位置
      historyApiFallback: true, // 设置为 true 返回 index.html 而不是 404
      host: "localhost", // 
      port: 3000 // 端口号
    }),
    livereload(),
  ]
}

export default {
  plugins: [
    ...envPlugins,
  ],
}
```

### 参考链接

https://zhuanlan.zhihu.com/p/608457915

https://zhuanlan.zhihu.com/p/340255085

https://juejin.cn/post/6968839519353176077

https://juejin.cn/post/6844903596970999815

[模块化规范](https://link.zhihu.com/?target=http%3A//huangxuan.me/js-module-7day/%23/)

[模块化系列](https://link.zhihu.com/?target=https%3A//www.qiufeng.blue/webpack/module.html%23es-modules)

[seajs-模块化历史讨论](https://link.zhihu.com/?target=https%3A//github.com/seajs/seajs/issues/588)