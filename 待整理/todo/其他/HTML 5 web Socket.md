## HTML 5 web Socket

websocket 建立在单个TCP协议上的全双工通讯的协议。不需要经过传统的三次握手，直接一次握手就可以进行数据传送。

浏览器通过 JS 向服务器建立 websocket 连接的请求，连接建立后就可以通过TCP直接连接交换数据。

首先创建 Socket 对象，这个对象具有下面的属性和方法。

~~~js
let Socket = new WebSocket(url, [protocol]);
// [protocol] 表示可选择的子协议

// 属性
Socket.readyState = 0; // 类似于ajax请求的四个阶段
Socket.bufferedAmount // 已经被send放入正在队列中等待传输，但是还没有发出的 UTF-8 文本字节数。

// methods
Socket.send();
Socket.close();

// event
Socket.onopen
Socket.onmessage
Socket.onerror
Socket.onclose

~~~



~~~js
function WebSOcket() {
  if ("WebSocket" in window) {
    alert('brower is ok');
    let ws = new WebSocket("ws://localhost:9998/echo");
    ws.onopen = function() {
      ws.send('send message');
    };
    ws.onmessage = function(event) {
      let received_msg = event.data;
      console.log(received_msg);
    }
    ws.onclose = function() {
      console.log("websocket is close");
    }
    else {
      console.log("your browser is too old");
    }
  }
}
~~~

在服务器端需要创建一个websocket的服务，需要在Python环境支持

```bash
git clone http://github.com/google/pywebsocket.git
# 开启端口号
```

WebSocket 优点：

其他特点包括：

（1）建立在 TCP 协议之上，服务器端的实现比较容易。

（2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

（3）数据格式比较轻量，性能开销小，通信高效。

（4）可以发送文本，也可以发送二进制数据。

（5）没有同源限制，客户端可以与任意服务器通信。

（6）协议标识符是`ws`（如果加密，则为`wss`），服务器网址就是 URL。

HTML 连接不足：HTML基于单向请求数据。浏览器需要不断向服务器发起请求，询问数据是否进行更新。在websocket中，当连接建立后，服务器可以向浏览器发送数据，避免浏览器频繁请求数据。