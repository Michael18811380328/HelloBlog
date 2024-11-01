# Redis 概况

2021-08-31

### mysql 哪些情况下不适用？

1、当大量请求时（高并发，分布式集群），mysql 可能挡不住大量的并发请求，造成响应延迟或者宕机

2、当请求重复数据时（不经常变化的数据），频繁访问 mysql 造成性能浪费。

这两种情况下，mysql 无法满足需求，所以有了 redis

### redis 为什么可以解决这些问题？

redis 对 mysql 的数据做了一个缓存。

1、当大量请求时，直接在 Redis 上进行数据读写，没有对 mysql 进行任何操作，这样速度大大提升。当高速读写任务结束后，再一次性写入数据库持久层（目前是 30 分钟），然后再同步更新缓存，这样保证了效率和数据一致性。

2、当请求数据重复时，首次加载需要从 mysql 中获取，再次大量请求时，直接从 Redis 中获取即可，不需要访问 mysql，这样可以节省性能。

### redis 的基本概念

Redis 引入 NoSQL 技术，这是一种基于内存的数据库，并且提供一定的持久化功能。

Redis 和 MongoDB 是当前使用最广泛的 NoSQL，而就 Redis 技术而言，它的性能十分优越，可以支持每秒十几万此的读/写操作，其性能远超数据库，并且还支持集群、分布式、主从同步等配置，原则上可以无限扩展，让更多的数据存储在内存中，更让人欣慰的是它还支持一定的事务能力，这保证了高并发的场景下数据的安全和一致性。

- 存储 缓存 用的数据；
- 需要高速读/写的场合使用它快速读/写；

### Redis 下载安装到宿主机

从官网下载安装包（https://redis.io/download），或者使用 wget 命令下载

Download, extract and compile Redis with:

```bash
$ wget https://download.redis.io/releases/redis-6.2.5.tar.gz
$ tar xzf redis-6.2.5.tar.gz
$ cd redis-6.2.5
$ make
```

The binaries that are now compiled are available in the `src` directory. Run Redis with:

```bash
$ src/redis-server
```

You can interact with Redis using the built-in client:

```bash
$ src/redis-cli
redis> set foo bar
OK
redis> get foo
"bar"
```

注 1：mac 需要在 usr/local 目录下进行解压安装，需要 sudo 命令

注 2：如果 make 执行报错 xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun，说明缺少 XCode 软件，在终端执行 xcode-select --install 并安装。可能宿主机中可能有 redis，建议在 docker 内部安装 redis 镜像，这样不同版本不会干扰。

### Redis 下载安装到 docker

参考链接：https://www.runoob.com/docker/docker-install-redis.html

1、查看镜像 `docker search redis`

2、拉取镜像 `docker pull redis:latest` 需要 1 分钟。拉取镜像后，运行 `docker images` 查看是否下载

3、创建容器 `docker run -itd --name test-Michael-redis --port 6379:6379 redis` 这里自定义了容器的名称，端口映射到 6379，运行 `docker ps` 检查容器是否创建好

4、进入容器 `docker exec -it test-Michael-redis bash`

5、进入 redis，执行 `redis-cli` 进入内部，使用 set get 获取数据（也可以通过可视化的 TablePlus 进行操作，注意端口号，具体使用参考：https://blog.csdn.net/weixin_41697143/article/details/119904196）

6、使用 exit 退出容器，`docker stop docker-container-ID` 关闭当前容器

### nodeJS 和 Redis 的连接

很多教程中都是 Spring 和 Redis 的资料，我这里简单写一下 nodeJS 和 redis 的连接，详情参考 redis 官方网站

本地需要先启动 redis，然后新建一个 test.js 文件，并安装依赖 npm install redis

```js
var redis = require("redis"),
  config = require("../config"),
  dbConfig = config.redis,
  RDS_PORT = dbConfig.port, //端口号
  RDS_HOST = dbConfig.host, //服务器IP
  RDS_PWD = dbConfig.pass, //密码
  RDS_OPTS = { auth_pass: RDS_PWD },
  client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

// 事件触发回调函数
client.on("ready", function (res) {
  console.log("ready");
});

client.on("end", function (err) {
  console.log("end");
});

client.on("error", function (err) {
  console.log(err);
});

client.on("connect", function () {
  console.log("redis connect success!");
});

// 更改数据、获取数据（第三个参数是回调函数）
client.set("key", "value", redis.print);
client.get("key", redis.print);
```

### 详情参考链接

https://www.npmjs.com/package/redis

https://www.cnblogs.com/shaozhu520/p/10859276.html

https://zhuanlan.zhihu.com/p/37982685

https://zhuanlan.zhihu.com/p/59168140

https://www.cnblogs.com/rjzheng/p/9096228.html
