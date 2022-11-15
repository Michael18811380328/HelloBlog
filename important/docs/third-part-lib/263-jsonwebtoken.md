# 263 jsonwebtoken

## 用途

JWT 在 nodeJS 的实现（服务器端登录验证）

## 可靠性

1w星星

## 官网链接

https://www.npmjs.com/package/jsonwebtoken

https://github.com/auth0/node-jsonwebtoken


## 基本使用

```js
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
```

## 其他

JWT 入门教程：https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html

传统用户登录：用户发送用户名和密码，然后服务器验证后，生成 session 返回到客户端，客户端放在 cookie 中。

客户端再次请求时，带着这个 cookie 中的 session——id 服务端直接验证即可。

存在的问题：如果服务器集群，那么 session 不能共享。

解决方法1：将 session 写入持久层，这样每次不同的服务器需要向持久层请求，有性能问题。

解决方法2：使用 JWT，返回给用户一个 Token，然后用户请求时携带 token，然后 Token 设置过期时间即可

token 可以设置过期时间，可以再次加密等（Token中不携带敏感信息）
