## How-does-HTTPS-Works-SSL-Explained.png

HTTPS = HTTP + SSL 在 http 基础上，加了一层安全套接层，位于 HTTP 和 TCP 协议之间。SSL 是独立于 HTTP 的协议，使用对称加密，实现数据安全和完整性验证，也可以用于 UDP 等，抓包后也有加密无法破解

![](https://michael18811380328.github.io/images/HTTP/How-does-HTTPS-Works-SSL-Explained.png)

## TCP-web.png

TCP 是 HTTP 下层的协议，把 HTTP 报文段封装成 TCP 报文段进行传输

![](https://michael18811380328.github.io/images/HTTP/TCP-web.png)

## Web-socket.png

http 是三次握手四次挥手，每次发送请求建立短链接；web-socket 建立一个长链接，适合聊天室或者多人协同等需求，服务端使用 express 中间层处理更合适

![](https://michael18811380328.github.io/images/HTTP/Web-socket.png)

## mysql-redis.png

![](https://michael18811380328.github.io/images/HTTP/mysql-redis.png)

## 计算机网络七层模型.jpg

计算机网络七层模型-四层模型-五层模型，从下到上是 物理层-数据链路层-网络层-运输层-应用层，下层给上层提供服务，上层包使用协议封装打包后传递给下层传输，细节参考计算机网络图片笔记

![](https://michael18811380328.github.io/images/HTTP/计算机网络七层模型.jpg)

