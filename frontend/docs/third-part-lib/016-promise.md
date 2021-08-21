# 016 promise

## 用途

nodeJS 异步读取文件时，fs.readFileSync 是异步的，然后会写成回调函数

后续的处理需要在回调函数中完成，代码看起来很臃肿

这个库把回调函数变成了链式调用

## 可靠性

下载百万，2000星星

## 官网链接

https://www.promisejs.org/

https://github.com/then/promise

https://www.npmjs.com/package/promise


## 基本使用

```js
// npm install promise
var Promise = require('promise');

var readFile = Promise.denodeify(require('fs').readFile);
// now `readFile` will return a promise rather than
// expecting a callback

function readJSON(filename, callback){
  // If a callback is provided, call it with error as the
  // first argument and result as the second argument,
  // then return `undefined`. If no callback is provided,
  // just return the promise.
  return readFile(filename, 'utf8')
    .then(JSON.parse)
    .nodeify(callback);
}
```

## 其他

目前项目中没有使用，主要在 node 环境下面使用
