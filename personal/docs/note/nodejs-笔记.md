# nodejs笔记 
 
## 0025 浏览器和node中的事件循环


浏览器主要的同步和异步操作是 set time out 和 set interval

主线程执行完后会执行任务队列当中的 set time out和 set interval

node 当中是 event loop 主要分为宏任务和微任务，执行完一个宏任务，就会执行相应的微任务



   
## 0094 vue 事件代理和元素绑定事件


类似React的原生事件和合成事件



   
## 0192 Express 中 app.use 和 app.all 区别


<https://expressjs.com/en/4x/api.html> 

### app.use

app.use(\[path,] callback \[, callback...])

Mounts the specified [middleware](https://expressjs.com/guide/using-middleware.html) function or functions at the specified path: the middleware function is executed when the base of the requested path matches `path`.

在指定路径上挂载指定的中间件函数或函数:当请求路径的基与path匹配时，执行中间件函数。

请求路径中的第一部分只要与 /register 相等即可，并不要求请求路径pathname完全匹配

### app.all

app.all(path, callback \[, callback ...])

This method is like the standard [app.METHOD()](https://expressjs.com/en/4x/api.html#app.METHOD) methods, except it matches all HTTP verbs.

这个方法类似于标准的app.METHOD()方法，除了它匹配所有HTTP动词。

就是 GET post delete put 都会走这个路由，请求路径pathname必须和 /xxx 完全匹配



   
## 0193 Express 中间件是什么？原理是什么


### 中间件定义

中间件的本质就是一个函数，在收到请求和返回相应的过程中做一些我们想做的事情。

### 中间件作用

执行任何代码。

修改请求和响应对象。

终结请求-响应循环。

调用堆栈中的下一个中间件。

### 中间件基本原理

实际上中间件就是一个堆栈，包括很多处理的中间件函数。

当请求发送到服务器 request，服务器取出中间件，并创建一个运行环境，使用中间件处理请求（例如验证 token）。

然后把这个请求返回 next() 执行堆栈中下一个中间件——逐步迭代过程。

伪代码如下

```
// 这个中间件带路径，表示满足 '*' 才能访问
app.use('*', (request, response, next) => {
	if （request.token）{
		let result = checkJWT(request.token);
		if (result) {
			return next();
		}
	}
	return res.status(401).send('Token is invalid');
})

```

因此，中间件的执行顺序很重要。

<https://juejin.cn/post/6844903573663416334> 



   
## 0195 Express 常用中间件有哪些？




* body-parser 第三方中间件，用于解析post数据
* cookie-parser 第三方中间件，用于处理cookie
* cookie-session 第三方中间件，用于处理session
* bcrypt 第三方中间件，用于加密
* passport 第三方中间件，用于鉴权
* passport-jwt 第三方中间件，用于jwt鉴权
* ejs 模板引擎



   
## 0198 bodyParser 作用是什么


用于处理 POST 请求的格式，JSON格式，或者默认的 application/x-www-form-urlencoded 解析器，限制最大的数据量

```javascript
// create application/json parser
app.use(bodyParser.json({ limit: '100mb' }));

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }));

```





   
## 0200 connect-multiparty 有什么作用？


connect-multiparty 这个中间件用于上传文件

前端用multipart/form-data的形式上传数据，后端通过中间件 connect-multipary 接收。

注意，接收结果req.files是一个对象，包含POST上传的参数和一个临时文件，文件一般在/tmp目录下，可以将文件移动到指定位置。

参考 

```javascript
import multipart from 'connect-multiparty';

const multipartMiddleware = multipart();

router.post(`/doc_uuid/`, multipartMiddleware, callback);

```

<https://blog.csdn.net/dreamer2020/article/details/52076391> 



   
## 0201 一个 express + web socket 项目架构


### 项目架构

这个 express cli 可以创建默认的项目架构，默认项目架构可以满足大部分需求

#### 实际架构

```
./src
├── _bin
│   └── www 启动脚本（初始化 express 服务器，创建 web-socket 服务，文件自动保存服务，监听事件并写入日志）
├── api
│   └── sea-server-api 请求后端的API，获取 token，获取上传下载链接，上传下载文件
├── app 全局 express 实例入口文件，处理POST请求格式，跨域，登录验证，路由，错误返回
├── dao 数据库操作
│   └── operation-log 将操作日志写入数据库，获取当前 doc 悬挂的 operations
├── db-helper 数据库工具函数（数据库配置，创建连接池，执行查询，断开连接）
├── loggers
│   └── index 日志打印工具函数（设置日志路径，日志级别）
├── middleware 中间件
│   ├── auth 登录验证 jwtToken
│   ├── cors 跨域
├── config 配置文件（数据库配置，服务器地址，端口号等）
├── constants 常量：服务器的基本 API 配置，最大缓存的操作数量
├── utils
│   ├── index 工具函数（文件目录操作，时间转换，解析 URL）
│   └── slate-utils 批量执行操作并更新最后修改人
├── route 服务端路由组件（文件内容和协作人的路由）
用户管理
├── controllers ——不同路由执行的操作（具体操作在 managers 中实现）核心逻辑
│   └── user-controller 客户端请求用户，返回当前 doc 中的协作人
├── managers
│   └── users-manager 用户管理组件
文件管理（核心）
├── controllers ——不同路由执行的操作（具体操作在 managers 中实现）核心逻辑
│   ├── document-controller GET 和 POST 分别对应文档获取和保存
├── managers
│   ├── document-manager（文档对象管理器，全部文档的保存，更新，获取，新建）
├── models
│   └── document 一个文档对象（包括自身属性和基本操作）
操作管理（核心）
├── managers
│   ├── operations-manager 操作管理（操作管理器对象存储1000条近期记录，其他的操作写入数据库，然后支持获取服务器和客户端的差距的操作-丢失获取）
web-socket 服务（核心）
└── wss
    ├── auth ws-jwt 登录认证
    ├── index web-socket 服务器主程序（用户进入房间，用户离开房间，更新文档，同步文档，断开连接，服务器错误处理等）
    └── io-helper ws-工具函数（离开进入房间，广播错误信息等）

```



   
## 0203 nodejs 中输入 bash 命令


需求：写一个nodejs 脚本，然后批量操作文件或者查询文件信息（使用bash命令）

使用内置的 child_process 可以执行 bash 命令

```javascript
var process = require('child_process');

var command = "ls -al";

process.exec(command, function(err, stdout, stderr) {
  console.log(err);
  console.log(stdout);
  console.log(stderr);
});

```



   
## 0384 express 如何实现跨域


设置跨域

```javascript
const express = require('express');
const app = express();

// cross origin
app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Content-Type', 'application/json;charset=utf-8');
	next();
});

```



  