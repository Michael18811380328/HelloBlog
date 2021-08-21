# Socket.IO

Socket.IO 是一个基于 web-socket 通信的库，可以在浏览器和服务器之间实现实时、双向和基于事件的通信。 

包括：Node.js 服务器和浏览器的 Javascript 客户端库。

可以将 Socket.IO 客户端视为 WebSocket API 的“小型”包装器。



## 主要用途

- 实时分析：将数据推送到客户端，以实时计数器、图表或日志的形式表示。
- 即时消息和聊天：Socket.IO 的“Hello world”是一个只需几行代码的聊天应用程序。
- 二进制流：从 1.0 开始，可以来回发送任何 blob：图像、音频、视频。
- 文档协作：允许用户同时编辑文档并查看彼此的更改。

Microsoft Office 使用，性能没问题



## 案例：聊天室

链接：https://socket.io/get-started/chat

In this guide we’ll create a basic chat application. It requires almost no basic prior knowledge of Node.JS or Socket.IO, so it’s ideal for users of all knowledge levels.

### Introduction

使用其他框架（LAMP php）写一个聊天应用比较难，sockets 天然可以解决这种实时的聊天系统，双向的通信系统问题（即服务端可以给客户端发送消息）。

Writing a chat application with popular web applications stacks like LAMP (PHP) has normally been very hard. It involves polling the server for changes, keeping track of timestamps, and it’s a lot slower than it should be.

Sockets have traditionally been the solution around which most real-time chat systems are architected, providing a bi-directional communication channel between a client and a server.

This means that the server can *push* messages to clients. Whenever you write a chat message, the idea is that the server will get it and push it to all other connected clients.

### The web framework

使用 express 作为后端

The first goal is to set up a simple HTML webpage that serves out a form and a list of messages. We’re going to use the Node.JS web framework `express` to this end. Make sure [Node.JS](https://nodejs.org/) is installed.

First let’s create a `package.json` manifest file that describes our project. I recommend you place it in a dedicated empty directory (I’ll call mine `chat-example`).

```json
{
  "name": "socket-chat-example",
  "version": "0.0.1",
  "description": "my first socket.io app",
  "dependencies": {}
}
```

Now, in order to easily populate the `dependencies` property with the things we need, we’ll use `npm install`:

```bash
npm install express@4
```

Once it’s installed we can create an `index.js` file that will set up our application.

这是服务端代码（使用 express 搭建应用，使用路由 / 打开默认的 index.html 页面，在 3000 端口开启 HTTP 服务）

```js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
```

This means that it:

- Express initializes `app` to be a function handler that you can supply to an HTTP server (as seen in line 4).
- We define a route handler `/` that gets called when we hit our website home.
- We make the http server listen on port 3000.

可以在终端运行 node.js 并打开浏览器访问  localhost: 3000

If you run `node index.js` you should see the following. And if you point your browser to `http://localhost:3000`.

### Serving HTML

So far in `index.js` we’re calling `res.send` and passing it a string of HTML. Our code would look very confusing if we just placed our entire application’s HTML there, so instead we’re going to create a `index.html` file and serve that instead.

如果直接从后端返回 html 文件就太复杂了，所以使用路由取代

Let’s refactor our route handler to use `sendFile` instead.

```js
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
```

Put the following in your `index.html` file:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Socket.IO chat</title>
    <style>
      body { margin: 0; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }

      #form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
      #input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
      #input:focus { outline: none; }
      #form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }

      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages > li { padding: 0.5rem 1rem; }
      #messages > li:nth-child(odd) { background: #efefef; }
    </style>
  </head>
  <body>
    <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" autocomplete="off" /><button>Send</button>
    </form>
  </body>
</html>
```

If you restart the process (by hitting Control+C and running `node index.js` again) and refresh the page it should look like this:

### Integrating Socket.IO

Socket.IO is composed of two parts(分成客户端和服务端两部分):

- A server that integrates with (or mounts on) the Node.JS HTTP Server [socket.io](https://github.com/socketio/socket.io)
- A client library that loads on the browser side [socket.io-client](https://github.com/socketio/socket.io-client)

During development, `socket.io` serves the client automatically for us, as we’ll see, so for now we only have to install one module:

```bash
npm install socket.io
```

That will install the module and add the dependency to `package.json`. Now let’s edit `index.js` to add it:

```js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
```

Notice that I initialize a new instance of `socket.io` by passing the `server` (the HTTP server) object. Then I listen on the `connection` event for incoming sockets and log it to the console.

Now in index.html add the following snippet before the `</body>` (end body tag):

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
</script>
```

That’s all it takes to load the `socket.io-client`, which exposes an `io` global (and the endpoint `GET /socket.io/socket.io.js`), and then connect.

本地的JS路径（node_modules/socket.io/client-dist/socket.io.js）

If you would like to use the local version of the client-side JS file, you can find it at `node_modules/socket.io/client-dist/socket.io.js`.

Notice that I’m not specifying any URL when I call `io()`, since it defaults to trying to connect to the host that serves the page.

If you now restart the process (by hitting Control+C and running `node index.js` again) and then refresh the webpage you should see the console print “a user connected”.

Try opening several tabs, and you’ll see several messages.

Each socket also fires a special `disconnect` event:

```js
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
```

Then if you refresh a tab several times you can see it in action.

### Emitting events

The main idea behind Socket.IO is that you can send and receive any events you want, with any data you want. Any objects that can be encoded as JSON will do, and [binary data](https://socket.io/blog/introducing-socket-io-1-0/#binary) is supported too.

Let’s make it so that when the user types in a message, the server gets it as a `chat message` event. The `script` section in `index.html` should now look as follows:

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();

  var form = document.getElementById('form');
  var input = document.getElementById('input');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });
</script>
```

And in `index.js` we print out the `chat message` event:

```js
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});
```

The result should be like the following video:



### Broadcasting

The next goal is for us to emit the event from the server to the rest of the users.

In order to send an event to everyone, Socket.IO gives us the `io.emit()` method.

```js
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

// This will emit the event to all connected sockets
```

If you want to send a message to everyone except for a certain emitting socket, we have the `broadcast` flag for emitting from that socket:

```js
io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});
```

In this case, for the sake of simplicity we’ll send the message to everyone, including the sender.

```js
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
```

And on the client side when we capture a `chat message` event we’ll include it in the page. The *total* client-side JavaScript code now amounts to:

```html
<script>
  var socket = io();

  var messages = document.getElementById('messages');
  var form = document.getElementById('form');
  var input = document.getElementById('input');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });

  socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
</script>
```

And that completes our chat application, in about 20 lines of code! This is what it looks like:

### Homework

Here are some ideas to improve the application:

- Broadcast a message to connected users when someone connects or disconnects（当某人连接或者退出时，需要向全体广播）.
- Add support for nicknames（支持昵称，传参）.
- Don’t send the same message to the user that sent it. Instead, append the message directly as soon as he/she presses enter.（本人自己的消息，直接发到本地，socket 不向自己发送消息）
- Add “{user} is typing” functionality.（用户输入的时候，显示）
- Show who’s online.（用户登录后，存储在数组中，并实时向全体广播）
- Add private messaging.（增加私信，token？还是直接传参的时候设置）
- Share your improvements!

### Getting this example

You can find it on GitHub [here](https://github.com/socketio/chat-example).

```
git clone https://github.com/socketio/chat-example.git
```

