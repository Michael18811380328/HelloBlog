## ReferenceError: primordials is not defined 报错和解决

### 问题来源

今天使用一个老项目（2020年前）时，执行 `npm install` 报错，显示如下

~~~js
const { Math, Object, Reflect } = primordials;
ReferenceError: primordials is not defined
~~~

刚开始以为是网络问题，或者是第三方库冲突，尝试切换网络问题还存在，查资料如下

### 问题原因

第三方库 gulp 和 nodejs 版本不兼容。老项目中 gulp 版本还是 3.x ，需要node 11 之前的环境。我本地 node 环境已经是 16 18 20 了，所以不兼容造成。具体的原因如下：

> ## Origin of the problem
>
> This issue stems from the fact that `gulp@3.9.1` [depends](https://github.com/gulpjs/gulp/blob/v3.9.1/package.json#L47) on `graceful-fs@^3.0.0` which monkeypatches Node.js `fs` module.
>
> This used to work with Node.js until version 11.15 (which is a [version](https://nodejs.org/en/about/releases/) from a development branch and shouldn't be used in production).
>
> [`graceful-fs@^4.0.0`](https://github.com/isaacs/node-graceful-fs#v4) does not monkeypatch Node.js `fs` module anymore, which makes it compatible with Node.js > 11.15 (tested and working with versions 12, 14, 16, 18 and 20).
>
> Note that this is not a perennial solution but it helps when you don't have the time to update to `gulp@^4.0.0`.

其他开发者也遇到了类似的问题。

因为这个是老项目，短时间也没有时间和精力去重构代码，更新 gulp 版本等，所以我找到几个解决办法

### 解决方案1 切换node早期版本

可以使用 node 版本管理工具，把 nodeJS 切换到早期的版本（12之前），然后进行项目开发。

优点：不需要改动项目代码和配置，直接改变本地环境。

缺点：如果本地开发多个项目，或者不同成员同时开发，可能切换环境比较繁琐，不能解决根本问题。

### 解决方案2

使用修复代码，安装 graceful-fs 4.2.11 版本。

如果是 npm 工具，更改 package.json，增加 preinstall 脚本，重新执行 npm install。我目前使用这个办法。

~~~diff
"scripts": {
+   "preinstall": "npx npm-force-resolutions",
    "build": "rc-tools run build",
}

+ "overrides": {
+	 "graceful-fs": "^4.2.11"
+ },
~~~

如果是 pnpm 或者 yarn 工具，参考这个帖子：https://stackoverflow.com/questions/55921442/how-to-fix-referenceerror-primordials-is-not-defined-in-node-js

### 解决方案3 更新 gulp 版本

根本问题还是 gulp 和 node 版本不兼容，最终解决办法就是升级 gulp 版本到最新的稳定版。

### 参考链接

https://stackoverflow.com/questions/55921442/how-to-fix-referenceerror-primordials-is-not-defined-in-node-js

https://github.com/react-component/calendar
