# 103 socket-io client

## 用途

socket 协议介绍：https://socket.io/docs/v4/

主要用于 socket 服务器和浏览器（或者 socket 客户端）的通信

Socket.IO is a library that enables real-time, bidirectional and event-based communication between the browser and the server. It consists of: a Node.js server and a Javascript client library for the browser (which can be also run from Node.js）

WebSocket is a communication protocol which provides a full-duplex and low-latency channel between the server and the browser. More information can be found [here](https://en.wikipedia.org/wiki/WebSocket).

## 可靠性

400多万下载，9000颗星，可以稳定使用

## 官网链接

https://socket.io/docs/v4/client-initialization/

https://github.com/socketio/socket.io-client

https://www.npmjs.com/package/socket.io-client

## 基本使用

官网案例

server 端

~~~js
const socket = new WebSocket("ws://localhost:3000");

socket.onopen = () => {
  socket.send("Hello!");
};

socket.onmessage = (data) => {
  console.log(data);
};
~~~

客户端

~~~js
const socket = io("ws://localhost:3000");

socket.on("connect", () => {
  // either with send()
  socket.send("Hello!");

  // or with emit() and custom event names
  socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
});

// handle the event sent with socket.send()
socket.on("message", data => {
  console.log(data);
});

// handle the event sent with socket.emit()
socket.on("greetings", (elem1, elem2, elem3) => {
  console.log(elem1, elem2, elem3);
});
~~~

服务端可以是原生的 http-server 也可以支持其他的框架（详见：https://socket.io/docs/v4/server-initialization/）

实际使用


```js
import io from 'socket.io-client';

// 初始化客户端（配置参数）
this.socket = io(commentSocket, {
  reconnect: true,
  query: { 'comment_uuid': commentUuid }
});

// 事件驱动，这里设置不同事件的回调函数
this.socket.on('connect', () => { this.onConnected(); }); 
this.socket.on('reconnect', (data) => { this.onReconnect(data); }); 
this.socket.on('reconnecting', (data) => { this.onReconnecting(data); }); 
this.socket.on('disconnect', (data) => { this.onDisconnect(data); });

// 下面是自定义事件（用于聊天室的评论更新、通知更新、共享资源）
this.socket.on('update-comment', (operation, version) => this.onUpdateComment(operation, version));
this.socket.on('new-notification', (notification) => this.onNewNotification(notification));
this.socket.on('comment-share-changed', () => this.onCommentShareChanged());

// refresh borwer
window.onbeforeunload = () => this.close();

// 链接服务器
connect() {
  this.socket.open();
}

// 关闭服务器，并发出消息 leave
close() {
  this.socket.emit('leave room');
}

// 已连接的回调函数
onConnected() {
  /* eslint-disable */
  debug('connected to server');

  // 进入聊天室
  this.socket.emit('join-room', this.commentUuid, this.accessToken, (msg) => {

    // 判断聊天室进入是否成功
    if (msg.status) {
      debug('join room success.');
      this.tableStore.dispatchConnectState('connect', msg);
    } else {
      debug('join room failed.');
      this.socket.disconnect();
      this.tableStore.dispatchConnectState('connect-error', msg);
    }
  });
}

// 再次连接
onReconnect(data) {
  debug('reconnect.');
  this.dispatchConnectState('reconnect');
}

// 正在连接中
onReconnecting(attemptNumber) {
  debug('reconnecting.', attemptNumber);
  this.dispatchConnectState('reconnecting', attemptNumber);
}

// 自定义事件的回调函数
onUpdateComment(operation, version) {
  this.executeRemoteOperation(JSON.parse(operation), version);
}

onNewNotification(notification) {
  debug('Received new notification from server: %s' + notification.toString());
  this.tableStore.onNewNotification(JSON.parse(notification));
}

onCommentShareChanged() {
  debug('Received comment share signal from server');
  this.tableStore.onCommentShareChanged();
}

// 链接断开（3秒后重新链接）
onDisconnect(data) {
  this.dispatchConnectState('disconnect');
  if (data === 'io server disconnect') {
    setTimeout(() => {
      this.connect();
    }, 3000);
  }
}

发送通知
sendOperation(operation, callback) {
  let commentUuid = this.commentUuid;
  this.socket.emit('update-comment', commentUuid, operation, (msg) => {
    callback && callback(msg);  // reconnect
  });
}
```

## 其他

