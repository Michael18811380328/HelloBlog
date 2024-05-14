# 265 mysql

## 用途

nodeJS 连接 mysql 数据库的工具

## 官网链接

https://github.com/mysqljs/mysql

https://www.npmjs.com/package/mysql

## 基本使用

```js
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();
```

## 其他

内容很多，这是中间件必不可少的部分，需要仔细看文档
