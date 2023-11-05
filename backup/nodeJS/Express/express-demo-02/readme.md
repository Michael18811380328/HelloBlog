# express 案例

npm install 安装相关的依赖

我们先准备一个表

+------+------------+-------+--------+------+-------+----------+
| id | createTime | phone | mobile | name | brief | comments |
+------+------------+-------+--------+------+-------+----------+
| 1 | NULL | NULL | NULL | Mike | NULL | NULL |
| 2 | NULL | 12345 | NULL | Amy | NULL | NULL |
| 3 | NULL | 12345 | NULL | Tony | NULL | NULL |
| 5 | NULL | 54321 | NULL | Judy | NULL | NULL |
+------+------------+-------+--------+------+-------+----------+

然后开启数据库

如果 mysql 打不开，执行一下 sudo chown -R mysql /usr/local/mysql/data

然后执行 nodemon express 开启后端服务器

打开浏览器，访问 localhost:3000 测试登录界面

### 根据 ID 查询用户信息（get）

当我们输入 http://localhost:3000/user/5

界面返回

{"status":200,"message":[{"name":"Judy","phone":"54321"}]}

此时可以进行前端渲染

### 删除用户信息（delete）

### 增加用户信息（post）

用户登录验证

### 修改用户信息

## 前端设计

现在后端做好了，前端可以写一个界面请求一下数据

后端单独测试可以运行，前端也可以

后端部署在 localhost：3000 上，前端是本地的文件，发送请求会跨域？？？
