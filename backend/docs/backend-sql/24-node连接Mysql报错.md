# node 连接 Mysql 报错 ER_NOT_SUPPORTED_AUTH_MODE

2021-12-01

https://www.cnblogs.com/jing-tian/p/11688073.html

## 报错信息

本人系统安装的是 mysql-installer-community-8.0.18.0.msi 这个版本，然后我本地使用 node-mysql 去连接数据库。

test.js 文件

```js
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost", //本机地址
  user: "root", //用户
  password: "123456", //密码
  port: "3306", //端口号
  database: "test", //要连接的数据库
});

connection.connect();

var sql = "SELECT * FROM table1"; //查询table1表的所有数据

connection.query(sql, function (err, result) {
  if (err) {
    console.log("[SELECT ERROR] - ", err.message);
    return;
  }

  console.log("--------------------------SELECT----------------------------");
  console.log(result);
  console.log(
    "------------------------------------------------------------\n\n"
  );
});

connection.end();
```

运行 node test.js

```bash
F:\All Project\test\node>node test.js
[SELECT ERROR] -  ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```

报错 [SELECT ERROR] - ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

## 报错原因

mysql8.0 以上加密方式，Node 还不支持。

## 解决方案

谷歌查到了这个答案，和我报错的步骤基本一样，按照这个进行操作，登录 mysql 使用这个

https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

```sql
mysql> alter user 'root'@'localhost' identified with mysql_native_password by '123456';
Query OK, 0 rows affected (0.27 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.08 sec)
```

再次运行

```bash
F:\All Project\test\node>node test.js
--------------------------SELECT----------------------------
[ RowDataPacket {
    id: '1',
    name: 'Google',
    url: 'https://www.google.com',
    alexa: '1',
    country: 'USA' },
  RowDataPacket {
    id: '3',
    name: 'Facebook',
    url: 'https://www.facebook.com',
    alexa: '3',
    country: 'USA' },
  RowDataPacket {
    id: '4',
    name: '微博',
    url: 'https://www.weibo.com',
    alexa: '4',
    country: 'CN' } ]
------------------------------------------------------------
```

成功获得数据。
