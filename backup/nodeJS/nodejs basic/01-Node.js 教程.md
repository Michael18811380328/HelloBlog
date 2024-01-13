# 01-Node.js 教程-20210711

简单的说 Node.js 就是运行在服务端的 JavaScript，是一个基于 Chrome JavaScript 运行时建立的一个平台。

Node.js 是一个事件驱动 I/O 服务端 JavaScript 环境，基于 Google 的 V8 引擎，V8 引擎执行 Javascript 的速度非常快，性能非常好。

不同版本可能有差异。

### 脚本模式

```js
console.log("Hello World");
```

保存该文件，文件名为 helloworld.js， 并通过 node 命令来执行：

```bash
node helloworld.js
```

### 交互模式

打开终端，键入 node 进入命令交互模式，可以输入一条代码语句后立即执行并显示结果，例如：

```
$ node
> console.log('Hello World!');
Hello World!
```
