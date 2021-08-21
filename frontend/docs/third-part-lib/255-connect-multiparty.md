# 255 connect-multiparty

## 用途

connect middleware for multiparty.

multiparty 的中间件

仅用于上传文件的中间件，用后最好删除临时文件

## 可靠性

300颗星，用的不多

## 官网链接

https://www.npmjs.com/package/connect-multiparty

## 基本使用

```js
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

app.post('/upload', multipartMiddleware, function(req, resp) {
  console.log(req.body, req.files);
  // don't forget to delete all req.files when done
});
```

## 其他

我实际上建议不要使用这个模块。 直接使用多方 API 更干净。

这个中间件会在你的服务器上创建临时文件并且永远不会清理它们。 因此，您不应将此中间件添加到所有路由中； 仅适用于您要接受上传的那些。 在这些端点中，请务必删除所有临时文件，即使是您不使用的文件。


I actually recommend against using this module. It's cleaner to use the multiparty API directly.

This middleware will create temp files on your server and never clean them up. Thus you should not add this middleware to all routes; only to the ones in which you want to accept uploads. And in these endpoints, be sure to delete all temp files, even the ones that you don't use.
