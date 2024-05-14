# 260 express

## 用途

快速、独立、简约的 Web 框架。

## 可靠性

5w stars

这个是中间层常用的框架，未来需要深度学习

## 官网链接

https://expressjs.com/

https://github.com/expressjs/express

https://www.npmjs.com/package/express

## 基本使用

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

## 其他

稳健的路由
专注于高性能
超高的测试覆盖率
HTTP 帮助程序（重定向、缓存等）
查看系统支持 14+ 模板引擎
内容协商
可执行以快速生成应用程序

## 脚手架

https://expressjs.com/en/starter/generator.html


项目架构

```js
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

```
