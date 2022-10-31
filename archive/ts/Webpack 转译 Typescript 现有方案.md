# Webpack 转译 Typescript 现有方案

## 现有方案

### 1. [awesome-typescript-loader](https://www.npmjs.com/package/awesome-typescript-loader)

- **这个 npm 包好久不更新了，而且类型检查的时候会有遗漏，所以不推荐使用**

### 2. [ts-loader](https://www.npmjs.com/package/ts-loader) + [babel-loader](https://www.npmjs.com/package/babel-loader) + [fork-ts-checker-webpack-plugin](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin)

- 这种方案，当 webpack 编译的时候，ts-loader 会调用 typescript（所以本地项目需要安装 typescript），然后 typescript 运行的时候会去读取本地的 tsconfig.json 文件。
- 默认情况下，ts-loader 会进行 **转译** 和 **类型检查，**每当文件改动时，都会重新去 **转译** 和 **类型检查**，当文件很多的时候，就会特别慢，影响开发速度。所以需要使用 fork-ts-checker-webpack-plugin ，开辟一个单独的线程去执行类型检查的任务，这样就不会影响 webpack 重新编译的速度。
- fork-ts-checker-webpack-plugin 这个插件要求最低 Node.js 6.11.5，webpack 4，TypeScript 2.1 和可选的 ESLint 6（其本身要求最低 Node.js 8.10.0）。

#### webpack 配置方法一

- 使用并行化构建提升速度（thread-loader），对于 webpack 4+ 来说，速度提升好像不是很明显

webpack.config.js

```javascript
const cpus = require('os').cpus().length;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  module: {
    rules: [
      // 单进程
      //{
      // test: /\.tsx?$/, 
      // 默认情况下，ts-loader 会进行转译和类型检查
      // 因为是单进程，所以 webpack 可以收集到错误信息，并通过 dev-server 反馈到浏览器
      // 但这也导致了 webpack 构建速度极慢
      // use:['ts-loader']
      //},

      // 多进程
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {loader: 'cache-loader'},
          {
            loader: 'thread-loader',
            options: {
              workers: cpus - 1,
            },
          },
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              // 关闭类型检查，即只进行转译
              // 类型检查交给 fork-ts-checker-webpack-plugin 在别的的线程中做
              // transpileOnly: true,
              // 如果设置了 happyPackMode 为 true
              // 会隐式的设置 transpileOnly: true
              happyPackMode: true
              // 如果是 vue 应用，需要配置下这个
              // appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: ['happypack/loader?id=js'],
        exclude: [/node_modules/, /(.|_)min\.js$/],
        // include: [
        //     path.resolve(__dirname, "src")
        // ],
      }
    ],
  },
  plugins: [
    // fork 一个进程进行检查
    new ForkTsCheckerWebpackPlugin({
      // async 为 false，同步的将错误信息反馈给 webpack，如果报错了，webpack 就会编译失败
      // async 默认为 true，异步的将错误信息反馈给 webpack，如果报错了，不影响 webpack 的编译
      // async: false,
      // eslint: false,
      checkSyntacticErrors: true
    })
  ]
};

```

tsconfig.json

```json
{
  "compilerOptions": {
    //"module": "commonjs",
    "target": "es5",
    /* 'react' 模式下，ts 会将 tsx 编译成 jsx 后再将 jsx 编译成 js*/
    /* 'preserve' 模式下：TS 会将 tsx 编译成 jsx 后，不再将 jsx 编译成 js，保留 jsx */
    /* 保留 jsx 时，就需要在 ts-loader 前面配置 babel-loader 去处理 jsx */
    /* 换句话说：只有想要用 babel-laoder 的时候，才需要设置这个值 */
    "jsx": "preserve",
  },
}

```



#### webpack 配置方法二

- 编译 ts/tsx 文件时，不使用并行化构建（thread-loader）

```javascript
const cpus = require('os').cpus().length;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              // 关闭类型检查，即只进行转译
              // 类型检查交给 fork-ts-checker-webpack-plugin 在别的的线程中做
              transpileOnly: true,
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: ['happypack/loader?id=js'],
        exclude: [/node_modules/, /(.|_)min\.js$/],
        // include: [
        //     path.resolve(__dirname, "src")
        // ],
      }
    ],
  },
  plugins: [
    // fork 一个进程进行检查
    new ForkTsCheckerWebpackPlugin({
      // async 为 false，同步的将错误信息反馈给 webpack，如果报错了，webpack 就会编译失败
      // async 默认为 true，异步的将错误信息反馈给 webpack，如果报错了，不影响 webpack 的编译
      // async: false,
      // eslint: false,
      checkSyntacticErrors: true
    })
  ]
};

```

tsconfig.json

```json
{
  "compilerOptions": {
    //"module": "commonjs",
    "target": "es5",
    /* 'react' 模式下，ts 会将 tsx 编译成 jsx 后再将 jsx 编译成 js*/
    /* 'preserve' 模式下：TS 会将 tsx 编译成 jsx 后，不再将 jsx 编译成 js，保留 jsx */
    /* 保留 jsx 时，就需要在 ts-loader 前面配置 babel-loader 去处理 jsx */
    /* 换句话说：只有想要用 babel-laoder 的时候，才需要设置这个值 */
    "jsx": "preserve",
  },
}

```



### 3. [babel-loader](https://www.npmjs.com/package/babel-loader) + [@babel/preset-typescript](https://www.npmjs.com/package/@babel/preset-typescript)

- 这种方案，当 webpack 编译的时候，**babel-loader 会读取 .babelrc 里的配置，**不会调用 typescript（所以本地项目无需安装 typescript），不会去检查类型
- 但是 tsconfig.json 是需要配置的，因为需要在开发代码时，让 idea 提示错误信息

webpack.config,js

```javascript
rules: [
  {
    test:/\.(tsx?|jsx?)$/,
    // 默认会调用 @babel/core 
    use:'babel-loader'
  }
]

```

.babelrc

```javascript
{
  "presets": [
    "@babel/preset-env"
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}

```



## 常见问题



### awesome-typescript-loader 与 ts-loader 的主要区别

- awesome-typescript-loader 不需要安装额外的插件，可以通过内置的 CheckerPlugin 插件，把类型检查放在独立的进程中执行
- **编译时间对比：**
- 如果都是用默认配置的话，awesome-typescript-loader 的速度相对快一些
- 如果都设置了禁止类型检查的选项，ts-loader 的速度相对快一些
- 如果都设置了禁止类型检查的选项并且将类型检查放到独立的进程中执行，awesome-typescript-loader 相对快一些



### 并行构建不再适合新版本的 webpack 了

It's possible to parallelise your builds. Historically this was useful from a performance perspective with webpack 2 / 3. [With webpack 4+ there appears to be significantly less benefit and perhaps even cost.](https://blog.johnnyreilly.com/2018/12/you-might-not-need-thread-loader.html)
But if that's what you want to do, there's two ways to achieve this: [happypack](https://github.com/amireh/happypack) and [thread-loader](https://github.com/webpack-contrib/thread-loader). Both should be used in combination with [fork-ts-checker-webpack-plugin](https://github.com/Realytics/fork-ts-checker-webpack-plugin) for typechecking.)

- 并行化构建有两种方式： [happypack](https://github.com/amireh/happypack) 和 [thread-loader](https://github.com/webpack-contrib/thread-loader)
- **并行化构建对于 webpack 2/3 的性能有明显的提升，使用 webpack 4+时，速度提升的收益似乎要少得多。**



### 使用了 TypeScript，为什么还需要 Babel

- 大部分已存项目依赖了 babel
- 有些需求/功能需要 babel 的插件去实现（如：按需加载）
- babel 有非常丰富的插件，它的生态发展得很好
- babel 7 之前：需要前面两种方案来转译 TS
- babel 7 之后：babel 直接移除 TS，转为 JS，这使得它的编译速度飞快



### 为什么用了 ts-loader 后，还要使用 babel-loader

- ts-loader 是不会读取 .babelrc 里的配置，即无法使用 babel 系列的插件，所以直接使用 ts-loader 将 ts/tsx 转成 js ，就会出现垫片无法按需加载、antd 无法按需引入的问题。所以需要用 ts-loader 把 ts/tsx 转成 js/jsx，然后再用 babel-loader 去调用 babel 系列插件，编译成最终的 js。



### 如何选择转译方案

- 想要在**旧的项目**中使用 TS，可以考虑使用 [ts-loader](https://www.npmjs.com/package/ts-loader) + [fork-ts-checker-webpack-plugin](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin)。**新的项目**中可以考虑使用 [@babel/preset-typescript](https://www.npmjs.com/package/@babel/preset-typescript) 。前一种方案默认多了类型检查这个功能。



### 如果在使用 [babel-loader](https://www.npmjs.com/package/babel-loader) + [@babel/preset-typescript](https://www.npmjs.com/package/@babel/preset-typescript) 这种方案时，也想要类型检查，该怎么做

package.json

```json
{
  "scripts": {
     // 再开一个 npm 脚本自动检查类型
    "type-check": "tsc --watch",
  },
    "devDependencies": {
      "@babel/cli": "^7.4.4",
      "@babel/core": "^7.4.5",
      "@babel/plugin-proposal-class-properties": "^7.4.4",
      "@babel/plugin-proposal-object-rest-spread": "^7.4.4",
      "@babel/preset-env": "^7.4.5",
      "@babel/preset-typescript": "^7.3.3",
      "typescript": "^3.5.2"
    }
}

```

tsconfig.json

```json
{
  "compilerOptions": {
    // 不生成文件，只做类型检查
         "noEmit": true,                      
  },
}

```



### 使用 [@babel/preset-typescript](https://www.npmjs.com/package/@babel/preset-typescript) 需要注意的地方

**有四种语法在 babel 中是无法编译的**

- namespace：不要再用了，已经过时了。改用标准的 ES6 module（`import`/`export`），在[推荐的 tslint 规则](https://github.com/palantir/tslint/blob/21358296ad11a857918b45e6a9cc628290dc3f96/src/configs/recommended.ts#L89)中也建议不要使用 namesapce。

```typescript
namespace Person{
    const name = 'abc';
}

```

- 类型断言：改用 as 来断言类型（但是在 demo 中试了下，好像没报错，不知道是不是可以正常编译了）。

```typescript
interface Person {
    name: string;
    age: number
}

let p1 = {age: 18} as Person;
console.log(p2.name);

let p2 = <Person>{age: 18};
console.log(p3.name);

```

- 常量枚举

```typescript
const enum Sex {
    man,
    woman
}

```

- 历史遗留风格的 import/export 语法：`import xxx= require(…)` 和 `export = xxx`。



### Typescript 官方转向 ESLint 的原因

- TSLint 执行规则的方式存在一些架构问题，从而影响了性能，而修复这些问题会破坏现有规则；
- ESLint 的性能更好并且使用者较多



### 使用了 TypeScript，为什么还需要 ESLint

- TS 主要是用来做类型检查和语言转换的，顺带一小部分的语法检查
- ESLint 主要是用来检查代码风格和语法错误的



### 使用 `npx create-react-app xxx --typescript` 可以快速创建 TS 项目



## 三种方案的配置 Demo

- [**webpack-translate-typescript-demo**](https://github.com/yjdjiayou/webpack-translate-typescript-demo)



## 参考

[**[译] TypeScript 和 Babel**](https://juejin.im/post/6844903792865984520)

[**使用@babel/preset-typescript取代awesome-typescript-loader和ts-loader**](https://www.cnblogs.com/vvjiang/p/12057811.html)

[**build-performance**](https://webpack.docschina.org/guides/build-performance/)

[**https://segmentfault.com/q/1010000019545436**](https://segmentfault.com/q/1010000019545436)

