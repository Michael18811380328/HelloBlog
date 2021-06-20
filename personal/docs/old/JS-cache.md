## 前言

一个页面的http请求次数能少点就少，这样大大提高用户体验。所以再一个页面发起一个请求，把所有数据都拿到后储存在缓存里面，你想用的时候再调用出来，这个是非常好的一个做法。

但是这样有个明显的问题：界面初始化时，把所有的数据都请求下来，这样对服务器的查询性能有影响。

应该是需要什么数据，然后再请求什么数据。

同时，数据更新后，无法及时更新 localStorage 中的数据。

## 正文
这个技术主要使用到localStorage
一个页面的http请求次数能少点就少，这样大大提高用户体验。所以在一个页面发起一个请求，把所有数据都拿到后储存在缓存里面，你想用的时候再调用出来，这个是非常好的一个做法。
步骤如下：
```js
//定义全局变量函数
var uzStorage = function () {
  var ls = window.localStorage;
  return ls;
};

```

```js
//定义全局变量u
var u = {};
```
```js
//设置缓存
u.setStorage = function (key, value) {
  var v = value;
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
```
```js
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
