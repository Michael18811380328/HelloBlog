# 268 response-time

## 用途

响应时间

测试 NodeJS 中 http 响应的时间，属于中间件

## 可靠性

400星星

下载量20万

是 express 团队制作的

## 官网链接

https://github.com/expressjs/response-time

https://www.npmjs.com/package/response-time

## 基本使用

```js
var express = require('express')
var responseTime = require('response-time')

var app = express()

app.use(responseTime())

app.get('/', function (req, res) {
  res.send('hello, world!')
})
```

## 其他

该模块创建了一个中间件，用于记录 HTTP 服务器中请求的响应时间。 “响应时间”在此处定义为从请求进入此中间件到将标头写出到客户端所经过的时间。

Response time for Node.js servers.

This module creates a middleware that records the response time for requests in HTTP servers. The "response time" is defined here as the elapsed time from when a request enters this middleware to when the headers are written out to the client.
