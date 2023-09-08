### 01 产品需求分析

需求：做一个文章管理系统，技术栈为 express + nodejs + mongdb。整体项目是后端项目，前端界面实现功能为主，没有太多 CSS 实现。

原型图中有五个界面：注册、登录、首页、文章编辑、文章详情界面

- 注册：一个表单：用户名，密码，确认密码，注册按钮，跳转登录
- 登录：一个表单：用户名，密码，登录按钮，跳转注册
- 首页：上边 header：左侧是产品 LOGO，右边是用户头像（下拉菜单中有：设置，退出）中间是文章列表（序号，作者，标题，发布时间，编辑，删除等）底部是跳转（前一页，后一页，首页，尾页，共多少页等）
- 文章编辑：输入文章标题，文章内容，右下方是发布的按钮（也支持编辑已有的小说）头部的组件不变 Header 通用
- 文章详情：只读的界面，上面是题目，中间是作者和发布时间，下面是具体的内容。头部的组件不变 Header 通用

### 02 初始化 express + mongodb

数据库设计：包括两个数据库表，用户表；书籍表

使用 express-generator CLI 初始化项目结构（全局安装），需要全局安装 nodemon 可以保证 node 服务端热更新，创建使用 ejs 模板。

需要安装 mongoDB 服务器，在项目中建立链接（这里根据实际安装的数据库操作）。类似 mysql 链接的步骤。

model.js

~~~js
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var dbName = 'project';

// 封装数据库的连接方法
function connect(cb) {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.log(err);
    } else {
      let db = client.dn(dbName);
      cb && cb(db);
      client.close();
    }
  })
}

module.exports = { connect };
~~~

Routers.js 调用连接的方法

~~~js
var express = require('express');
var model = require('../model');
var router = expres.Router();

router.get('/', (req, res, next) => {
  model.connect((db) => {
    db.collection('users').find().toArray((err, res) => {
      console.log(res);
      res.render('index', { title: 'Demo' });
    });
  });
});

module.exports = routers;
~~~

### 课时3    注册功能

ejs 模板抽取公共部分，head.ejs

~~~ejs
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="/stylesheets/style.css" />
~~~

在页面模板中，使用 include 语法，即可使用公共部分代码

regist.ejs

~~~ejs
<html lang="en">
  <head>
    <title>注册</title>
    <%- include head %>
  </head>
  <body>
    <h3>
      注册页面
    </h3>
    <div>
      <form action="/user/regist" method="post">
        <input type="text" name="username" placeholder="请输入用户名">
        <input type="submit" name="" value="注册"/>
      </form>
    </div>
  </body>
</html>
~~~

路由部分增加

~~~js
// 注册页面
router.get('/regist', function(req, res, next) {
  const { username, password } = req.body;
  var data = {
    username, password
  };
  model.connect(function(db) {
    db.collection('users').insertOne(data, function(err, ret) {
      if (err) {
        console.log('注册失败')
        res.redirect('regist');
      }
    })
  });
  // 返回成功
  res.send(data);
});
~~~

### 课时4    登录功能

~~~js
// routers.js
router.post('./login', function(req, res, next) {
  var data = {
    username: req.body.username,
    password: req.body.password,
  };
  // TODO：数据有效性验证
  model.connect(function(db) {
    db.collection('users').fund(data).toArray(function(err, docs) {
      // 登录错误，重定向到登录页
      if (err) {
        logger.err(err);
        res.redirect('./login');
      } else {
        // 用户信息存在，重定向到首页
        if (docs.length > 0) {
          res.redirect('/');
        } else {
          // 用户信息不存在，重定向到登录页
          res.redirect('./login');
        }
      }
    }
  });
})
~~~

### 课时5  登录拦截 session

使用 express-session 保存登录信息（类似的是 token）

在入口中，添加中间件

~~~js
var session = require('express-session');

// 中间件：官方默认配置即可
app.use(session({
  secret: 'xzxzxz',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 1000 * 60 * 30, // 设置过期时间
  },
});
        
// 登录拦截
app.get('*', function(req, res, next) {
  // 从 session 中拿到用户名
  var username = req.ression.username;
  // 如果拿不到用户名，重定向到登录页
  if (path !== '/login' && path !== '/regist' && !username) {
    res.redirect('/login');
  }
  next();
})
~~~

然后，当用户成功登录后，增加 session

~~~js
router.post('./login', function(req, res, next) {
  var data = {
    username: req.body.username,
    password: req.body.password,
  };
  model.connect(function(db) {
    db.collection('users').fund(data).toArray(function(err, docs) {
      if (err) {
        logger.err(err);
        res.redirect('./login');
      } else {
        if (docs.length > 0) {
          // 新增：用户信息存储到 session 
          req.session.username = data.username;
          res.redirect('/');
        } else {
          res.redirect('./login');
        }
      }
    }
  });
})
~~~

### 课时6    退出登录

首先完成一个前端公共部分的 nav 导航栏

~~~ejs
<div>
  <a href="/">
  	<img src="/images/home.png" alt="首页">
  </a>
  <span>{% username %}</span>
  <a href="/write">写文章</a>
  <a href="/users/logout">退出</a>
</div>
~~~

首页引入导航栏（需要传参）

~~~ejs
<html>
	<head>
    <title>首页</title>
    <%- include head %>
  </head>
  <body>
    <%- include('nav', { username:username }) %>
  </body>
</html>
~~~

退出登录

~~~js
router.get('/login', function(req, res, next) {
  req.session.username = null;
  res.redirect('./login');
});
~~~

### 课时7    文章发布功能

Article.js

~~~js
// api 增加文章
router.post('/add', function(req, res, next) {
  const { title, content, username } = req.body;
  var data = {
    title,
    content,
    id: Date.now(),
    username: username || 'unknown',
  }
  model.connect(function(db) {
    db.collection('articles').insertOne(data, function(err, ret) {
      if (err) {
        console.log('publish error', err);
        res.redirect('/write');
      } else {
        res.redirect('/');
      }
    })
  })
});
~~~

对应页面模板

~~~ejs
<head>
  <title>写文章</title>
  <%- include head %>
</head>
<body>
  <%- inlcude('bar', { username: username }) %>
  <div class="article">
    <form action="/article/add">
      <input type="text" name="title" placeholder="请输入文章标题" value=""/>
      <textarea name="content"></textarea>
      <input type="submit" value="发布"/>
    </form>
  </div>
  <!-- 引入第三方编辑器插件 xheditor -->
  <script>
    $('#elm1').xheditor({
      tools: 'full',
      skin: 'default',
    });
  </script>
</body>

~~~

### 课时8    文章列表

正常的情况是，前端获取某一个页面的数据，不应该获取全部的文章

~~~ejs
<div class="list">
  <% list.map(function(item, index)) { %>
    <div class="row">
      <span>序号</span>
      <span>作者</span>
      <span>标题</span>
      <span>时间</span>
      <span>
        <a href="/edit">编辑</a>
        <a href="article/delete?id=<%-item.id%>&page=<%data.currrentPage%>">删除</a>
      </span>
    </div>
  <% }); %>

  <!-- 分页器 -->
  <div class="pages">
    <% for(let i = 0; i < data.total; i++) { %>
      <a href=""><%- i %></a>
    <% } %>
  </div>
</div>

~~~

~~~js
router.get('/', function(req, res, next) {
  var username = req.session.username || '';

  var data = {
    total: 0,
    curPage: 1,
    list: [],
  };
  var pageSize = 2;

  model.connect(function(db) {
    // 1 查询所有文章
    db.collection('articles').find().toArray(function(err, docs) {
      console.log('文章列表', err);
      var list = docs;
      list.map(function(ele, index) {
        ele['time'] = moment(ele.id).format('YYYY_MM_DD HH:mm:ss')
      })
      data.total = Math.ceil(docs.length / pageSize);
      // 2 查询当前页的文章列表
      model.connect(function(db) {
        db.collection('artilces').find().sort({ _id: -1 }).limit(pageSize).skip((page - 1) * pageSize)
      })
      data.list = docs;
      res.render('index', { username, data: data });
    })
  })
})

// 阅读文章，编辑文章
// 如果已有文件ID，就是编辑文章，如果没有文件 ID 那就是预览文章
router.get('/write', function(req, res, next) {
  // username, id, page
  model.connect(function(db) {

  })
  res.render('write', { username })
})

~~~

### 课时9    分页查询

### 课时10    删除文章
### 课时11    修改文章

~~~js
// 写文章
router.get('/write', function(req, res, next) {
  res.render('write', {});
});
~~~

### 课时12    文章详情页
### 课时13    文件上传

~~~js
// 文件上传，借用了第三方的工具实现前端上传
// 后端需要增加

router.post('/upload', function(req, res, next) {
  let form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    console.log(files);
    var file = files.filedata[0];
    // 这里把上传路径获取到
    var rs = fs.createReadStream(file.path);
    // 这是服务端存储的路径
    var newPath = '/uploads/' + file.originalFilename;
    var ws = fs.createWriteStream('./public' + newPath);
    // 然后把本地文件写入服务器？
  })
})

~~~

### 课时14    项目总结

