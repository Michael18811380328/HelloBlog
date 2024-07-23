# 269 socket.io

## 用途

Realtime application framework (Node.JS server)

socket.io

Socket.IO 支持基于事件的实时双向通信。 它包括：

一个 Node.js 服务器（这个存储库）
浏览器的 Javascript 客户端库（或 Node.js 客户端）

## 可靠性

50000颗星，经常使用

聊天室或者多人协作使用这个库，与客户端需要一起使用

## 官网链接

https://www.npmjs.com/package/socket.io

https://github.com/socketio/socket.io


## 基本使用

```js
const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', client => {
  client.on('event', data => { /* … */ });
  client.on('disconnect', () => { /* … */ });
});

server.listen(3000);
```

## 其他
