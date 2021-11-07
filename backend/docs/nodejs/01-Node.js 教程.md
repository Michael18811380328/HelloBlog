# 01-Node.js 教程-20210711

简单的说 Node.js 就是运行在服务端的 JavaScript，是一个基于Chrome JavaScript 运行时建立的一个平台。

Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。

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

打开终端，键入node进入命令交互模式，可以输入一条代码语句后立即执行并显示结果，例如：

```
$ node
> console.log('Hello World!');
Hello World!
```
