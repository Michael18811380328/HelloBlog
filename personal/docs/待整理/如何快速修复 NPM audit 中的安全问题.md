# 如何快速修复 NPM audit 中的安全问题

问题描述：一个老前端项目中，npm audit 反馈 Dependencies 中反馈了不少安全问题，有很多的 high 或者 critical 问题需要修复。

项目简介：大约是5年前的项目，react 版本是 16, webpack 是 3 版本，axios 是 0.x 版本。当时使用 create-react-app 初始化项目，后期经过 npm eject 暴露了配置并更改过。现在5年过去了，这些第三方库很多存在安全问题需要修复。

查阅资料并多次试错，我实现的步骤如下：

## 1、找到有安全问题的第三方库

可以在项目中运行 `npm audit` 查看当前项目存在的安全问题，例如下面的 minimist 库中存在 原型污染（Prototype Pollution）问题，这是一个 Moderate 中等的漏洞。

[![npm audit log](https://img-blog.csdnimg.cn/img_convert/60e95ea10795c0edbcd9fcaa205be4df.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--ibe-g_vG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://imgur.com/hVdQfxs.jpg)

如果代码托管在 github，github 官方安全政策也会提示这些安全漏洞

[![github security alert](https://img-blog.csdnimg.cn/img_convert/fe7fc590031507bc1101128c4c38f160.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--eecOQPaH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://imgur.com/2Tqelpk.jpg)

## 2、脚手架项目整体升级

如果使用 cra 脚手架的项目，且没有运行过 npm run eject，操作比较简单，直接更新到最新的版本，然后重新执行 npm install 即可解决大部分的 dev 安全问题。但是我这个项目已经运行过 npm run eject，如果大型重构（例如直接升级 react webpack jest 等到最新版本），那么耗时很多，且容易产生各种问题。

如果在 github 托管的代码，也可以直接在 github 通知中，自动提交的 PR 中进行修复。
![在这里插入图片描述](https://img-blog.csdnimg.cn/72ed6b11dc67411ea63a5aa4018ca142.png#pic_center)
## 3、运行 npm update

运行 `npm update` 可以直接自动更新项目中依赖的第三方库。然后删除 package-lock.json 并重新安装依赖。

~~~bash
npm update
rm -rf ./node-modules && rm -rf package-lock.json
npm install
~~~

这个操作可以把依赖关系升级到下一个稳定版本，并且这些库可能已经修复了可传递依赖关系的版本。

这个操作执行后，已经把大部分第三方依赖升级到最新版本，可以解决一半的警告问题。

## 4、运行 `npm audit fix `

可能项目中运行 `npm audit` 还会提示某些问题，那么需要运行 `npm audit --fix` 去自动修复安全问题。

这个操作会更新第三方依赖的次级版本，并修复问题，例如把 webpack-dev-server 3.1.0 更新到 3.5.5 版本。通常运行后，代码不会出现问题。当全部执行后，建议最好启动一下项目，看是否满足要求。我本地更新后，项目基本可以跑通，然后检查一下，各种功能基本合适。

## 5、运行 `npm audit fix --force`

:warning: 注意，大型项目运行这个命令可能风险，小项目运行后基本正常。

这个命令会强制修复全部的可修复安全问题，如果第三方依赖大版本升级后，可能存在很多破坏性的兼容问题。

例如 react react-dev-utils webpack webpack-dev-server 等库，大版本更新后，直接项目无法启动，全是报错。

所以这个命令需要慎重，建议手动分析主要第三方库的版本，然后渐进式升级，每次升级并调试。

如果是 axios lodash deep-copy 这种工具库，基本升级没问题，这种放心升级。

~~~diff
- "axios": "^0.19.2",
+ "axios": "1.4.0",
~~~

如果是 react-dev-uitls，webpack-dev-server 开发依赖库，这种大版本差距很大，需要调整配置。

~~~diff
- "react-dev-utils": "10.1.0",
+ "react-dev-utils": "12.0.1",

- "resolve-url-loader": "3.1.1",
+ "resolve-url-loader": "3.1.5",

- "terser-webpack-plugin": "2.3.4",
+ "terser-webpack-plugin": "^2.3.8",

- "webpack-dev-server": "3.10.1",
+ "webpack-dev-server": "3.11.3",
~~~

webpackDevServer.config.js 改动如下

~~~diff
-     app.use(noopServiceWorkerMiddleware());
+     app.use(noopServiceWorkerMiddleware('/'));
~~~

webpack.config.js 改动如下
~~~diff
- const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
- const typescriptFormatter = require('react-dev-utils/typescriptFormatter');

- isEnvDevelopment && new WatchMissingNodeModulesPlugin(paths.appNodeModules),

- formatter: isEnvProduction ? typescriptFormatter : undefined,
+ formatter: undefined,
~~~

调整之后本地还有些问题，然后在 stack-overflow 上找到对应的解决方案，并逐步解决就行。

经过修复后，确实还有一些第三方库存在安全问题，但是这部分官方也没有修复，所以这部分需要等第三方库修复并更新版本。如果问题严重，第三方库不更新，那么就更换第三方库，或者自己 fork 过来改动。

![在这里插入图片描述](https://img-blog.csdnimg.cn/9c44e605806449fa81c9a78c5682f5b3.png#pic_center)

## 参考资料

How to fix Security Vulnerabilities in NPM Dependencies in 3 Minutes

原始链接：https://dev.to/viveknayyar/fixing-security-vulnerabilities-in-npm-dependencies-in-less-than-3-mins-2p5g

感谢原作者[@vivek-nayyar](https://hackernoon.com/u/vivek-nayyar)