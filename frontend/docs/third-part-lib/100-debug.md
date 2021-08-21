# 100 debug

## 用途

Nodejs 中打印日志，也可以在浏览器中打印日志

默认的 console.log 只能打印错误信息和报错行数，debug 可以打印具体的模块，可以显示不同的颜色和样式

## 可靠性

github 9000星 周下载上亿，可以放心使用

## 官网链接

https://github.com/visionmedia/debug

https://www.npmjs.com/package/debug


## 基本使用


```js
var a = require('debug')('worker:a');
var b = require('debug')('worker:b');

function work() {
  a('doing lots of uninteresting work');
  setTimeout(work, Math.random() * 1000);
}

work();

function workb() {
  b('doing some work');
  setTimeout(workb, Math.random() * 2000);
}

workb();
```

在 node 中执行后，可以分别打印两个模块的日志（避免日志混乱，便于排查问题等）

## 其他

