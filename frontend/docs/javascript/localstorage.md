# JS缓存数据

这个技术主要使用到localStorage

一个页面的http请求次数能少点就少，这样大大提高用户体验。所以在一个页面发起一个请求，把所有数据都拿到后储存在缓存里面，你想用的时候再调用出来，这个是非常好的一个做法。

存在的问题：1、资源可能更改，从缓存中拿到的数据是否过时（设置强缓存还是协商缓存，确保数据真实性）？2、如果发起一个请求把所有资源都拿到，开始服务器压力是否很大，是否拿到了不需要的数据？首屏加载速度是否正常。

步骤如下：

这里考虑了 value 是字符串还是对象的情况

```js
//定义全局变量函数
var uzStorage = function () {
  return window.localStorage;
};

//定义全局变量u
var u = {};

//设置缓存
u.setStorage = function (key, v) {
  if (typeof v == 'object') {
    v = JSON.stringify(v);
    v = 'obj-' + v;
  } else {
    v = 'str-' + v;
  }
  var ls = uzStorage();
  if (ls) {
  ls.setItem(key, v);
  }
};

//获取缓存
u.getStorage = function (key) {
  var ls = uzStorage();
  if (ls) {
    var v = ls.getItem(key);
    if (!v) {
      return;
    }
    if (v.indexOf('obj-') === 0) {
      v = v.slice(4);
      return JSON.parse(v);
    } else if (v.indexOf('str-') === 0) {
      return v.slice(4);
    }
  }
};
```

