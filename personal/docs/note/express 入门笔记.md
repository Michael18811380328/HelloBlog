## 腾讯云 express 基础入门

腾讯云介绍：https://study.163.com/course/introduction.htm?courseId=1006174010#/courseDetail?tab=1 


课程目标：启动基本服务端，服务端和数据库对接；服务端和前端界面对接

#### 1、框架准备和安装

本地下载 nodejs 和 express 并创建项目；部署云数据库MYSQL和云主机（云服务器），express 本地架构如下

```
api
routers
config
views
src

```

#### 2、ejs 和页面

npm install ejs 支持 ejs 语法

然后新建 index.ejs 文件，使用 \<%  %> 进行传参

```html
<head>
  <title><%=title %></title>
</head>

```

\<% code %> 把变量作为代码片段执行

\<%= html %> 把变量转换成 HTML 输出

\<%- string %> 把变量转换成字符串输出

主函数 app.js

```javascript
const path = require('path');
const express = require('express');

const app = express();

// body 解析中间件
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 视图函数处理
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 静态文件处理（css, js, imgs, fonts）中间件
app.use(express.static('src'));

// 页面路由处理
const routers = require('./routers/index');
app.use('/', routers);

// 接口路由处理
const add = require('./api/add');
app.user('/api', add);

const server = app.listen(8080, function() {
  console.log('server is running');
});

```

路由函数 routers.js （根路径）

```javascript
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: "Hello Express" });
});

module.exports = routers;

```

#### 3、mysql 和接口

config.json

```
{
  "host": "",
  "port": "3309",
  "user": "",
  "password": "",
  "database": ""
}

```

app 接口函数

```javascript
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('./config/config.json');

router.post('', function(req, res) {
  const connection = mysql.createConnection(config);
  connection.connect();
  var name = req.body.name || '';
  var sql = "INSERT into user values (" + "''," + connection.escape(name) + ")";
  connection.query(sql, function(err, rows, fields) {
    res.send({
      status: true,
      data: rows,
      message: 'success',
    });
  });
  connection.end();
});

module.exports = router;

```

接口文档：

* URL
* 类型 POST
* 参数
* 返回值

#### 4、cvm 云服务器启动和部署

代码需要部署到云服务器上

那么需要 cvm 系统安装（ubuntu centOS）nodejs 等，都需要命令行工具，yum 工具等操作

ftp 文件上传工具：vs-ftp-d very secure FTP deamon

pm2 工具安装（类似于 nodemon 工具）

域名购买等


