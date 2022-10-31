## Simple App

### 实验目的

1. 学会使用 Node 编写简单的前端应用。

### 操作步骤

（1）新建一个目录

```bash
$ mkdir simple-app-demo
$ cd simple-app-demo
```

（2）在该目录下，新建一个`package.json`文件。

```bash
$ npm init -y
```

`package.json`是项目的配置文件。

（3）安装`jquery`、`webpack`、`webpack-cli`这三个模块。

```bash
$ npm install -S jquery
$ npm install -S webpack webpack-cli
```

打开`package.json`文件，会发现`jquery`、`webpack`和`webpack-cli`都加入了`dependencies`字段，并且带有版本号。

（4）在项目根目录下，新建一个网页文件`index.html`。

```html
<html>
  <body>
    <h1>Hello World</h1>
    <script src="bundle.js"></script>
  </body>
</html>
```

（5）在项目根目录下，新建一个脚本文件`app.js`。

```javascript
const $ = require('jquery');
$('h1').css({ color: 'red'});
```

上面代码中，`require`方法是 Node 特有的模块加载命令。

（6）打开`package.json`，在`scripts`字段里面，添加一行。

```javascript
"scripts": {
  "build": "webpack --mode production ./app.js -o ./bundle.js",
  "test": "...."
},
```

（7） 在项目根目录下，执行下面的命令，将脚本打包。

```bash
$ npm run build
```

执行完成，可以发现项目根目录下，新生成了一个文件`bundle.js`。

（8）浏览器打开`index.html`，可以发现`Hello World`变成了红色。

### 练习

1. 修改样式，将标题变为蓝色，然后重新编译生成打包文件。


## REST API

### 实验目的

1. 熟悉 REST API 的基本用法

### 操作步骤

（1） 命令行进入`demos/rest-api-demo`目录，执行下面的命令。

```bash
$ npm install -S json-server
```

（2） 在项目根目录下，新建一个 JSON 文件`db.json`。

这里的JSON相当于数据库，不同的键表示不同的路径。使用GET方法可以获取数据，使用POST方法可以新增数据（数据体需要`x-www-form-urlencoded`编码，否则无法增加这个数据，例如评论）。

这里的数据表的列名是用户可选择的，MYSQL中的列名有必选项和可选项，这样会返回不同的结果。

```javascript
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

（3） 打开`package.json`，在`scripts`字段添加一行。

```javascript
"scripts": {
  "server": "json-server db.json",
  "test": "..."
},
```

（4） 命令行下执行下面的命令，启动服务。

```bash
$ npm run server
```

（5）打开 Chrome 浏览器的 Postman 应用。依次向`http://127.0.0.1:3000/posts`、`http://127.0.0.1:3000/posts/1`发出`GET`请求，查看结果。

（6）向`http://127.0.0.1:3000/comments`发出`POST`请求。注意，数据体`Body`要选择`x-www-form-urlencoded`编码，然后依次添加下面两个字段。

```javascript
body: "hello world"
postId: 1
```

发出该请求后，再向`http://127.0.0.1:3000/comments`发出`GET`请求，查看结果。

get请求可以看到新增加的一些评论（数据项）

（7） 向`http://127.0.0.1:3000/comments/2`发出`PUT`请求，数据体`Body`要选择`x-www-form-urlencoded`编码，然后添加下面的字段。

```javascript
body: "hello react"
```

发出该请求后，再向`http://127.0.0.1:3000/comments`发出`GET`请求，查看结果。

这样已有的评论就被更改了

（8）向`http://127.0.0.1:3000/comments/2`发出`delete`请求。

发出该请求后，再向`http://127.0.0.1:3000/comments`发出`GET`请求，查看结果。



## Express

### 实验目的

1. 学会 Express 搭建 Web 应用的基本用法。

### 操作步骤

（1）进入`demos/express-demo`目录，命令行执行下面的命令，安装依赖。

```bash
$ cd demos/express-demo
$ npm install
```

（2）打开`app1.js`，尝试看懂这个脚本。

```javascript
var express    = require('express');
var app        = express();
```

上面代码调用`express`，生成一个 Web 应用的实例。

```javascript
var router = express.Router();

router.get('/', function(req, res) {
  res.send('<h1>Hello World</h1>');
});

app.use('/home', router);
```

上面代码新建了一个路由对象，该对象指定访问根路由（`/`）时，返回`Hello World`。然后，将该路由加载在`/home`路径，也就是说，访问`/home`会返回`Hello World`。

`router.get`方法的第二个参数是一个回调函数，当符合指定路由的请求进来，会被这个函数处理。该函数的两个参数，`req`和`res`都是Express 内置的对象，分别表示用户的请求和 Web 服务器的回应。`res.send`方法就表示服务器回应所送出的内容。

```javascript
var port = process.env.PORT || 8080;

app.listen(port);
console.log('Magic happens on port ' + port);
```

上面代码指定了外部访问的端口，如果环境变量没有指定，则端口默认为`8080`。最后两行是启动应用，并输出一行提示文字。

（3）在命令行下，启动这个应用。

```bash
$ node app1.js
```

浏览器访问`localhost:8080/home`，看看是否输出`Hello World`。

然后，命令行下按 Ctrl + C，退出这个进程。



（4）通过环境变量，自定义启动端口。

假定我们指定必须启动在`7070`端口，命令行可以这样操作。

```bash
# Linux & Mac
$ PORT=7070 node app1.js

# windows cmd / (git cmd)
$ set PORT=7070
$ node app1.js

# windows powershell
$ $env:PORT=7070
$ node app1.js
```

浏览器就可以访问`localhost:7070/home`了。

然后，命令行下按 Ctrl + C，退出这个进程。

==思考题：Node 应用能否直接在`80`端口启动？==

不能直接在80或者82端口启动，可以在3000，8000， 8008， 8080端口启动。

可能是监听 < 1024 的端口要 root 权限；执行 sudo PORT=80 node app1.js 即可启动80端口

~~~js
server.listen(80, '127.0.0.1', () => {
        console.log('server is running');
    });
~~~

（5）打开`app2.js`，查看新增的那个路由。

```javascript
router.get('/:name', function(req, res) {
  res.send('<h1>Hello ' + req.params.name + '</h1>');
});
```

上面代码新增了一个路由，这个路由的路径是一个命名参数`:name`，可以从`req.params.name`拿到这个传入的参数。

在命令行下，启动这个应用。

```bash
$ node app2.js
```

浏览器访问`localhost:8080/home/张三`，看看是否输出`Hello 张三`。

然后，命令行下按 Ctrl + C，退出这个进程。



（6）打开`app3.js`，先查看页面头部新增的两行代码。

```javascript
// 新增代码...
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
```

上面代码中，`body-parser`模块的作用，是对`POST`、`PUT`、`DELETE`等 HTTP 方法的数据体进行解析。`app.use`用来将这个模块加载到当前应用。有了这两句，就可以处理`POST`、`PUT`、`DELETE`等请求了。

下面查看新增的那个路由。

```javascript
router.post('/', function (req, res) {
  var name = req.body.name;
  res.json({message: 'Hello ' + name});
});
```

上面代码表示，如果收到了`/`路径（实际上是`/home`路径）的`POST`请求，先从数据体拿到`name`字段，然后返回一段 JSON 信息。

在命令行下，启动这个应用。

```bash
$ node app3.js
```

然后，在 Chrome 浏览器的 Postman 插件里面，向`http://127.0.0.1:8080/home`发出一个`POST`请求。数据体的编码方法设为`x-www-form-urlencoded`，里面设置一个`name`字段，值可以随便取，假定设为`Alice`。也就是说，发出这样一个请求。

```
POST /home HTTP/1.1
Host: 127.0.0.1:8080
Content-Type: application/x-www-form-urlencoded

name=Alice
```

如果一切正常，服务器会返回一段 JSON 信息。

```javascript
{
  "message": "Hello Alice"
}
```



（7）打开`app4.js`，查看在所有路由之前新增的那个函数。

```javascript
var router = express.Router();

// 新增的代码
router.use(function(req, res, next) {
  console.log('There is a requesting.');
  next();
});

router.get('/', function(req, res) {
  // ...
```

`router.use`的作用是加载一个函数。这个函数被称为中间件，作用是在请求被路由匹配之前，先进行一些处理。上面这个中间件起到 logging 的作用，每收到一个请求，就在命令行输出一条记录。请特别注意，这个函数内部的`next()`，它代表下一个中间件，表示将处理过的请求传递给下一个中间件。这个例子只有一个中间件，就进入路由匹配处理（实际上，`bodyparser`、`router`本质都是中间件，整个 Express 的设计哲学就是不断对 HTTP 请求加工，然后返回一个 HTTP 回应）。

### 练习

1. 请增加一个中间件，服务器每次收到用户请求，会在服务器的控制台打印出收到请求的时间。

2. URL 的查询字符串，比如`localhost:8080?name=Alice`里面的`name`，可以用`req.query.name`拿到。请修改一个路由，使之可以收到查询字符串，然后输出`'Hello ' + req.query.name`。

~~~js
router.use(function(req, res, next) {
  console.log('-----------------------------------');
  console.log('This is next interval to get Timer');
  let time = new Date();
  console.log('发出请求的时间是' + time);
  console.log('-----------------------------------');
  next();
});

// req.query可以获取查询中的参数（实际不能明文传递密码）
router.get('/', function(req, res) {
  console.log("用户名：" + req.query.name + "  密码：" + req.query.pwd);
  // console.log(req.query);
  res.send('<h1>Hello World</h1>');
});
~~~
