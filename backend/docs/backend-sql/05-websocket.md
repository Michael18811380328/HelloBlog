# Websocket 概念

2021-12-02

### 为什么使用 websocket?

传统的网络协议是 HTTP，适用于客户端发出请求，服务端响应。

如果服务端想主动发出消息（例如推送通知事件），或者多个客户端通过服务端协同（协同编辑等），需要通过 http 轮询，定期发出 HTTP 请求更新数据，HTTP 协议不满足要求。

### WebSockets 有什么特点？

WebSockets 可以解决上面的问题。首次握手后，服务端和客户端可以互相发送消息，这样服务端可以主动发送消息，协同编辑时，某一个客户端发出更改消息，然后服务器广播到全部客户端，实现协同编辑的功能。

### 具体实现

现在各种浏览器都支持 WebSockets 协议。

理论上，服务器上部署一个 WebSockets 的服务，客户端进行连接即可实现。常见是 nodeJS 实现是 socket.io（在另外的文档中介绍）

下面是主要的代码和操作

1、新建一个项目（存放客户端和服务端的代码），安装服务端的依赖

```bash
npm init
npm install nodejs-websocket --save
```

2、新建 server.js 服务器代码

```js
var ws = require("nodejs-websocket");

// 创建服务器
var server = ws
  .createServer(function (socket) {
    // 事件名称为text(读取字符串时，就叫做text)，读取客户端传来的字符串
    var count = 1;
    socket.on("text", function (str) {
      // 在控制台输出前端传来的消息
      console.log(str);
      //向前端回复消息
      socket.sendText("服务器端收到客户端端发来的消息了！" + count++);
    });
  })
  .listen(3000);
```

启动服务端

```bash
node server.js
```

3 创建客户端 index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script
      src="./client.js"
      type="text/javascript"
      charset="utf-8"
      async
      defer
    ></script>
  </body>
</html>
```

引入 client.js

```js
// webSocket 是浏览器中的对象，在 node 环境中不存在（报错）
var ws = new WebSocket("ws://localhost:3000/");

ws.onopen = function (evt) {
  console.log("Connection open ...");
  ws.send("Hello WebSockets!");
};

ws.onmessage = function (evt) {
  console.log("Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function (evt) {
  console.log("Connection closed.");
};
```

在这里监听不同的事件，对应不同的回调函数

在浏览器中打开 index.html 执行 client.js 当连接成功后，浏览器中显示 "Connection open ..." ，浏览器发送给服务器 "Hello WebSockets!"，在 terminal 中打印日志 "Hello WebSockets!"，基本操作成功。

### 参考链接

https://www.ruanyifeng.com/blog/2017/05/websocket.html

https://www.cnblogs.com/chtzz/p/10741241.html
