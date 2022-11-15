# 267 request

## 用途

便于发出 HTTP 请求

## 可靠性

25000星星，很可靠

## 官网链接

https://github.com/request/request

## 基本使用

支持最简单的 http 和 https 请求操作

```js
const request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
```

## 其他

自己的网络基础知识需要更新

作者不会进行破坏式的版本更新了

https://github.com/request/request/issues/3142

