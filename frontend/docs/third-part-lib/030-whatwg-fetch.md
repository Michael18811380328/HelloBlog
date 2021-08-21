# 030 whatwg-fetch

## 用途

fetch 函数的改进版

window.fetch polyfill
The fetch() function is a Promise-based mechanism for programmatically making web requests in the browser. This project is a polyfill that implements a subset of the standard Fetch specification, enough to make fetch a viable replacement for most uses of XMLHttpRequest in traditional web applications.

## 可靠性

百万使用

25000 星星

## 官网链接

https://www.npmjs.com/package/whatwg-fetch

https://github.com/github/fetch


## 基本使用

```js
import 'whatwg-fetch'

window.fetch(...)


fetch('/users.json')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
  
```

## 其他
