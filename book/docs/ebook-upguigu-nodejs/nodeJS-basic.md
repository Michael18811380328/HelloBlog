# NodeJS 基础

尚硅谷视频是2018年的，基于 nodeJS 6 版本（两天课程）

2021-10-31——2021-11-05学习，nodeJS 主要是 12-16版本，可能部分功能不一样，最后以官网为准。

## 01.Window 命令行

cmd 介绍（终端 shell）

Windows 目录系统介绍（注意是反斜杠）

~~~txt
C:\Users\Michael
~~~

常用指令，和 linux 相同的指令（cd ），不一样的如下

~~~txt
dir === ls 
md === mkdir
rd === rm
打开其他盘，直接 D:
直接输入文件名 hello.txt 就用默认程序可以打开文件
~~~

环境变量：path：我们打开一个文件或者程序，需要先进入指定的盘和文件夹内部，很麻烦。我们希望在全局的环境中可以直接打开这个文件或者程序。那么就设置环境变量，相当于把这个文件的链接，设置在全局环境中。例如：

~~~txt
path: c:\Program\cmd.exe;d:\Program/java.exe;c:\User\Desktop\test.txt
~~~

操作：计算机属性-高级系统设置-环境变量-用户环境变量-更改 path 的属性（格式是分号隔开的路径）-保存

改完环境变量，需要重启 CMD 窗口。当我们在 cmd 输入命令时，首先在当前目录下找这个文件。如果找不到，在环境变量中找文件。如果还找不到就报错。

我们可以将经常访问的程序，添加到 path，就可以在任意位置访问了

## 02.进程和线程

进程：计算机中独立的运行环境；不同进程使用不同的内存空间；进程为程序的运行提供环境（可能进程内部没有程序运行，cpu 是0，进程挂起）；相当于车间

线程：计算机中最小的计算单位；负责执行进程中的程序；相当于车间中的工人

单线程：一个任务由一个人完成（一个CPU）JS

多线程：一个任务由多个人完成（多个CPU）Java 等语言

为什么浏览器 JS 是单线程？因为浏览器渲染引擎和 JS V8 引擎可能同时修改页面（DOM或者CSS，多线程会混乱）所以是单线程执行

## 03.node简介

JS 操作浏览器；NodeJS 后端服务器和系统交互

NodeJS 是能够在服务器端运行JS的运行环境。使用 V8 引擎开发，事件驱动（异步操作）；非阻塞，异步 I/O模式提高性能。

NodeJS 发展史（了解）：创建者 Ryan Dahl 是纽约罗彻斯特大学数学系博士，2006年退学后到智力去旅行，然后做码农赚钱；此时 Ruby on Rails 很火，但是有性能问题（所以很多和 Ruby Rails 类似）

node 版本（了解）：从 0.x 直接跳到 4.0 版本；大版本中，偶数版本是稳定版，奇数版本是开发版（所以现在从 16 升级到18版本，17版本是测试开发的）

网络请求步骤：用户发出请求，服务器接受请求，服务器查询数据库并获取数据，服务器发出响应。后端可以提高服务端的代码，可以提高服务器的带宽，但是和数据库 i/o 的速度是有限的，高并发会阻塞。

传统服务器是多线程的，每一个请求发出，会开辟一个线程，然后请求数据库（磁盘），同时这个线程保留；磁盘I/O后，这个线程会发出响应，客户端收到。当高并发时，服务器开启多个线程，但是 i/o 时间较慢，会造成多线程阻塞，服务器性能下降。

nodeJS 是单线程，但是在后台拥有一个 I/O 线程池，没有上述多线程阻塞的问题，最初为了解决服务器端多线程i/o阻塞问题（webJS）；最后功能越来越多，改名为 nodeJS（node节点可以不断扩展）。

因为是单线程，性能还也有局限性；现在高并发处理还是 Java 等语言，除非 NodeJS 多服务器分布式（nodeJS服务器成本比较低，所以可以做多个服务器）。现在在服务器端的应用（例如淘宝），主要做中间层渲染HTML页面 SSR（JAVA后端实现数据库交互）。nodeJS 作者也提到 Go 语言服务器的性能更高。

主要用途：web Rest-API；多人游戏；多客户端及时通信（socket-io）跨域；服务端请求等

## 04.使用node执行js文件

可以在 cmd 中输入 node 打开交互式窗口，然后输入代码（注：测试可以输入 es6 的代码）

可以在本地编写好 test.js 然后运行 node test.js 执行对应的代码（类似 Python 执行）通常采用后一种执行方法

## 05.node整合IDE

在 VSCode 中，编写好 JS 代码，直接点击左侧的运行按钮，选择 nodeJS 即可运行。其他 IDE 基本类似，设置不同的运行程序即可。

## 06.模块化简介

模块化有助于后期维护，代码复用等；模块化对于后期的维护比较好；

模块化的问题：模块化有顺序（可能引入模块的先后和模块有关；某些插件必须后面引入）

ECMAScript 的缺陷：没有模块系统；没有官方的规范（缺乏官方管理系统）；标准库较少（jquery react 都不是官方的库）；没有标准接口。

commonJS：为了让代码在各个平台上都能正常运行，所以制定了 commonjs 规范（cjs）。主要包括：模块引用（require('./math.js')）；模块定义（单独的JS文件，exports 导出内部变量，exports.x = 100）；模块标识。

每一个模块有一个自己的作用域（类似函数作用域）；在模块内部定义的变量，不会在全局环境中访问到；所以希望暴露的函数必须 exports 出去。

## 07.模块化详解

nodeJS 中通过 require 导入外部的模块；可以传递一个文件的路径（相对路径必须以 . 或者 .. 开头）作为参数，node 会自动导入外部模块。require 引入模块后，函数返回一个对象（就是引入的模块）。

模块标识：就是如何引入模块。可以分为 NodeJS 引擎原生的核心模块（fs, os）或者文件中自己定义的模块。原生的模块直接引入即可；文件模块需要加上相对路径。

全局对象：浏览器中是 window，NodeJS 是 global。全局创建的变量和函数都挂载在 global 上。nodejs 最好是模块化，避免全局中挂载。

执行模块时，实际上就是把模块包裹成一个函数，那么就有了函数的特性。

~~~js
console.log(arguments); // 当前模块包裹的函数的参数伪数组
console.log(arguments.callee) // 当前执行的函数对象
console.log(arguments.callee + '') // 当前执行的函数对象（转换成字符串）
~~~

实际上的函数

~~~js
function (exports, require, module, __filename, __dirname) {
  // 文件内部代码
}
~~~

~~~md
// 五个实参含义
exports // 导出的参数 exports.x = 10;
require // 导入的模块
module // 当前的模块，exports 是 module 的属性 exports === module.exports
__filename // 文件的绝对路径
__dirname // 文件所在目录的绝对路径
~~~

## 08.exports 和 module.exports

通过上面的模块化，Exports 是 module 的一个属性，exports === module.exports

因为模块是对象，属于引用类型，那么直接更改某一个值是相同的，下面等价

~~~js
exports.x = 10;
module.exports.x = 10;
~~~

但是不能整体替换，下面的不相等，第一个导出无效

~~~js
exports = { x: 10 }
module.exports = { x: 10 }
~~~

exports 只能使用点语法暴露内部变量

module.exports 可以通过点语法，或者直接输出对象，所以用这个就行。

~~~js
module.exports = {
  name: 10,
  age: 20,
  fn: function() {
    console.log('hi');
  }
};
~~~

## 09.包简介

包 commonJS 规定我们可以将一组模块放在一起，形成一组工具（实际就是一个文件夹）

组成：包结构（各种文件）+包描述文件（说明书，package.json）

常见文件：bin lib src doc test

Package.json 中常见属性（不赘述）name describe version dependencies

## 10.npm简介

node package manager 包管理工具

~~~txt
npm search lodash
npm remove lodash
npm install lodash --save
npm install less-loader --save-dev
npm install vue-cli -G
~~~

## 11.配置cnpm

https://npmmirror.com/

国内访问 npm 比较慢，所以可以同时安装 cnpm，和 npm 不冲突，不同项目使用不同的安装方式（使用时用 cnpm）更新发布版本时使用 npm

## 12.node搜索包的流程

默认会在当前目录下面找 node_modules 寻找需要的包；如果没有找到，那么会一直递归到根目录寻找这个包。

---

前面的是准备工作，后面正式 nodeJS 介绍（一节课很少的内容）

## 13.Buffer缓冲区

JS 原生数组性能较差（实际是对象索引存储，不是连续的内存空间）；传统数组不能存储多媒体文件（二进制文件）所以引入了 buffer

Buffer 类似数组，每一个项是16进制的两位数，表示内存中一个字节。Buffer 通过底层 C++ 申请连续内存空间。

```js
var buf = Buffer.from('string');
// 把字符串转换成二进制（unicode）
// 查看占用的内存空间（如果是英文字符，一个字符占用一个字节）
// 如果是中文汉字，一个字符占用三个字节
// 每一个字节的两位数是十六进制的 00 - ff 对应二进制的 00000000 11111111 (0-255)
```

`buf.length`; 表示占用内存的大小

str.length 表示字符串的长度

其他的属性和方法在官网上都有

`Buffer.alloc` 创建一个指定长度的二进制流（并初始化为00）

`Buffer.allocUnsafe` 创建一个指定长度的不安全的二进制流（不初始化00）使用已有内存——可能有以前的敏感数据。不初始化的过程性能更好。推荐使用 Buffer.alloc 方法。

可以通过下标改变 buffer 的数据（不能超过256，超过后存储的不正确）

buf[0] = 10;

buf[1] = 0xaa;

超过下标长度改变二进制，不会报错，但是不会写入

console.log(buf[1]) 在控制台输出的数值都是10进制数 170，或者转换成16进制的字符串输出。console.log(buf[1].toString(16))

Buffer 创建后，是连续的内存空间，长度不能变化（JS 中的 array 长度可以变化）如果长度可以变化，那么对应的内存就是不连续的，性能不好（可能需要指针指向新的内存地址）

`buf.toString()` 即可转换成字符串

其他的 API 见官网文档。实际上我们很少直接使用 buffer，主要了解创建的原理。

## 14.同步文件写入

fs——file system

服务器的本质就是把服务器的代码发送给浏览器，所以文件操作是必须的

文件的操作都分成两种方式：同步或者异步。

同步操作会阻塞 JS 的执行，需要当前操作执行后，再执行下面的代码。

异步操作需要传入一个 cb 函数，执行完成后，调用回调函数。

同步方法带一个 sync，异步没有带。

下面是简单的同步的例子（实际上就是三步：打开文件、写入文件、关闭文件（释放内存））

~~~js
var fs = require('fs');

var fd = fs.openSync('test.md', "w");
fs.writeSync(fd, "hello world");
fs.closeSync(fd);
~~~

API

~~~md
fs.openSync(path, flags, mode)

path 是打开文件的路径（相对或者绝对路径）
Flags 表示打开的模式（r, w）字符串
mode 设置文件的操作权限（通常不传参）
返回值是一个数字表示（fd）类似于定时器的返回值，便于操作打开的文件
~~~

~~~md
fs.writeSync(fd, content, [start-position], [encoding-type])

fd 是操作的文件（数字）
content 是写入的字符串
start-position 是写入的起始位置（这个位置前面的写入0）
encoding 是编码（默认是 utf-8）
~~~

## 15.异步的文件写入

同步代码会阻塞后面的程序执行。如果出错，不好排查处理（阻止后面程序执行），可读性较好

异步代码不会阻塞后面程序执行，出错都在回调函数中处理，nodejs 基本是异步的。

~~~js
var fs = require('fs');

fs.open("hello.md", "w", function(err, fd) {
  if (err) {
    console.err(err);
  } else {
    fs.write(fd, 'this is content', function(err) {
      if (err) {
        console.log(err);
      } else {
        fs.close(fd, function(err) {
          if (err) console.log(err);
        })
      }
    })
  }
})
~~~

## 16.简单文件写入

上面写入和读取文件的操作需要三步：打开，写入，关闭，操作复杂。我们可以一步写入：

~~~js
fs.writeFile(file, data, [options], cb);
fs.writeFileSync(file, data, [options]);
~~~

- file 表示写入文件的路径 string/buffer，可以是绝对路径或者相对路径

- data 是写入的数据（字符串或者流） string/buffer/uint8Array

- Options 是写入的设置 object: encoding: 'utf-8', mode: '0o666', flag: 'w'
  - encoding: 如果data是 buffer，那么格式只能是 utf-8 忽略选项
  - flag 表示打开文件的模式：r 表示只读，w 表示写入，a 表示追加（不存在会创建文件）其他模式使用较少。fs.writeFile 如果是 'w' 就会覆盖原始的文件！！！
- cb 是回调函数，只有一个参数 err

~~~js
var fs = require('fs');
fs.writeFile('test.md', '这是写入的内容', { flag: 'w' }, function(err) {
  if (err) console.log(err);
});
~~~

## 17.流式文件写入

如果是大的多媒体文件（流式文件）一次性读取写入，可能速度比较慢，内存溢出。

同步写入，异步写入，简单写入都不适合。

所以有专门的方法处理流式文件（创建一个管道）

~~~js
fs.createReadStream(path, [options]);
fs.createWriteStream(path, [options]);
~~~

创建写入流后，可以多次写入文件

~~~js
var fs = require('fs');

var ws = fs.createWriteStream('test.md');
ws.write('test');
ws.write('a');

// 流对象可以添加 open close 事件，监听流的打开和关闭
// on 表示事件触发多次回调函数
// once 表示事件触发一次回调函数（触发后销毁，性能更高）

ws.once('open', function() {
  console.log('stream is open');
});

ws.once('close', function() {
  console.log('stream is close');
});

// 关闭流（不能使用 ws.close 关闭）
ws.end();
// end 是发送端全部执行后才关闭，close 是接收端直接关闭，可能还有没有发送的文件
~~~

on 是绑定长期的事件

once 是绑定一次执行的事件（打开文件）

## 18.简单文件读取

读取文件四种方法：同步文件读取，异步文件读取，简单文件读取，流式文件读取

`fs.readFile(path, options, cb)`

~~~js
fs.readFile('./test.md', {flag: 'r'}, (err, data) => {
  if (err) console.log(err);
  console.log(data);
  // 这里默认读取的结果都是 Buffer（如果需要转换成 string，手动转换）
  // 因为很多文件都是流模式，所以需要使用流
});
~~~

## 19.流式文件读取

~~~js
var fs = require('fs');

var rs = fs.createReadStream('test.png');
// 我们还需要一个可写流来接受读取到的文件内容
var ws = fs.createWriteStream('new.png');

rs.once('open', function() {
  console.log('open read stream');
});

rs.once('close', function() {
  console.log('close read stream');
  // 数据读取完毕，关闭可写流
  ws.end();
});

ws.once('open', () => {
  console.log('write stream open');
});

ws.once('close', () => {
  console.log('write stream close');
});

// 如果需要读取可读流中的数据，需要给可读流绑定一个 data 事件，就开始自动读取数据
// 每一次最大读到 65532 个字节的长度，然后开始下一个读取
rs.on('data', function (data) {
  console.log(data.length);
});
~~~

上面这样写太麻烦，需要监听不同的事件，其实可以使用简单的方法

~~~js
var fs = require('fs');

var rs = fs.createReadStream();
var ws = fs.createWriteStream();
rs.pipe(ws);
~~~

直接将可读流和可写流连接起来，即可自动读写

问题：如果读取多个文件，然后写入一个文件，怎么处理呢？

## 20.fs模块的其他方法

对性能有要求的时候，使用异步；如果没有要求，使用同步即可；具体看文件大小。

#### existsSync 验证路径

验证路径是否存在（异步方法废弃了）

~~~js
fs.existsSync(path);

var isExists = fs.existsSYnc('test.mp3');
~~~

#### Stat 获取文件信息

~~~js
fs.stat(path, cb)
fs.statSync(path)

fs.stat("test.ts", function(err, stat) {
  if (err) console.log(err);
  console.log(stat);
});
~~~

其中返回值 stat 是一个对象，拥有下面的属性和方法

~~~js
stats.isFile()
stats.isDirectory()
stats.isBlockDevice()
stats.isSocket()

stats.mode
stats.ino
~~~

#### unlink 删除文件

（取消文件和磁盘的连接）

~~~js
fs.unlink(path, cb)
fs.unlinkSync(path)
~~~

#### readdir 列出文件

~~~js
fs.readdir(path, [options], cb)
fs.readdirSync(path, [options])

fs.readdir(path, { encoding: 'utf-8' }, (err, files) => {
  console.log(files);
  // files 是字符串数组，每一项是文件或者文件夹的名字
});
~~~

#### truncate 截断文件

将文件修改成指定字节的大小（从第一个到 len 个）

~~~js
fs.truncate(path, len, cb);
fs.truncateSync(path, len);

// 注意：len 是字节，截取前 len 个字节；如果截断中文，最后一个汉字可能截取到一半
~~~

#### mkdir 创建目录

~~~js
fs.mkdir(path, [mode], cb);
fs.mkdirSync(path, [mode]);

fs.mkdirSync('test');
~~~

#### rmdir 删除目录

~~~js
fs.rmdir(path, cb)
fs.rmdirSync(path)
~~~

#### Rename 重命名文件或者目录

~~~js
fs.rename(oldPath, newPath, cb)
fs.renameSync(oldPath, newPath)
~~~

#### Watch 监控文件的更改写入

（会轮询，默认5S，消耗性能）

~~~js
fs.watchFile(filename, [options], listener)

options: {
  persistent: true, // 当文件正在被监视时，进程是否继续运行
  interval: 5007 // 每隔多少毫秒轮询一次
}
listener: 当文件发生变化时，回调函数会执行

fs.watchFile('./test.md', { interval: 1000 }, (curr, prev) => {
  // curr 和 prev 也是 stat 对象
  console.log(curr.mtime - prev.mtime);
  console.log(curr.size - prev.size);
});
~~~

其他方法

~~~js
fs.chmod(path, mode, callback)
fa.chmodSync(path, mode)
fs.appendFile(file, data, [options], callback)
fs.appendFileSync(file, data, [options])
~~~

