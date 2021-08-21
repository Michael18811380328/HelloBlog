# 007 dom-helpers

## 用途

代码很少，模块化的 IE9 的 dom 操作方法

因为 IE 浏览器的 DOM 方法和其他的不同，如果需要兼容旧浏览器，那么需要写两套代码

这个库用来解决这个问题

```js
if (document.addEventListener) {
  return (node, eventName, handler, capture) => {
    node.addEventListener(eventName, handler, capture || false)
  }
} 
else if (document.attachEvent) {
  return (node, eventName, handler) => {
    node.attachEvent('on' + eventName, handler)
  }
}
```

## 可靠性

300个星星，下载量超过 600万，基本没问题

## 官网链接

https://www.npmjs.com/package/dom-helpers

https://github.com/react-bootstrap/dom-helpers


## 基本使用

实际项目中没有用到

## 其他
