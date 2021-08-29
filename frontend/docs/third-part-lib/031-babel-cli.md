# 031 @bable/cli

开发中使用的库

## 用途

babel 内置的一个 CLI，可以在命令行编译文件


## 官网链接

https://www.npmjs.com/package/@babel/cli

## 基本使用

在命令行执行（或者在webpack中写入）

可以把 script.js 从 es6 转换成 es5 的格式

~~~bash
npm install --save-dev @babel/core @babel/cli

npx babel script.js --watch --out-file script-compiled.js
~~~

具体参考：https://babeljs.io/docs/en/babel-cli

## 其他

需要和 babel/core 一起使用
