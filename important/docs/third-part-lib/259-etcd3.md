# 259 etcd3

## 用途

etcd3 目标是基于协议缓冲区的 etcdv3 API 的高质量、生产就绪客户端。 这包括：

负载均衡
故障处理和重新连接
交易
软件事务内存
高级查询构建器
租赁管理
观察者
用户和角色模拟管理
选举
并且对于 TypeScript 消费者来说是类型安全的。 

## 可靠性

微软出版，应该没问题

https://github.com/microsoft/etcd3

## 官网链接

https://www.npmjs.com/package/etcd3

## 基本使用

```js
const { Etcd3 } = require('etcd3');
const client = new Etcd3();

(async () => {
  await client.put('foo').value('bar');

  const fooValue = await client.get('foo').string();
  console.log('foo was:', fooValue);

  const allFValues = await client.getAll().prefix('f').keys();
  console.log('all our keys starting with "f":', allFValues);

  await client.delete().all();
})();
```

## 其他

etcd 基本功能不太清楚，稍后简单了解（高可用的分布式键值(key-value)数据库，用于分布式系统部署）

可以参考：https://www.jianshu.com/p/f68028682192

etcd应用场景

etcd比较多的应用场景是用于服务发现，服务发现(Service Discovery)要解决的是分布式系统中最常见的问题之一，即在同一个分布式集群中的进程或服务如何才能找到对方并建立连接。

从本质上说，服务发现就是要了解集群中是否有进程在监听upd或者tcp端口，并且通过名字就可以进行查找和链接。

要解决服务发现的问题，需要下面三大支柱，缺一不可。

一个强一致性、高可用的服务存储目录。
基于Ralf算法的etcd天生就是这样一个强一致性、高可用的服务存储目录。

一种注册服务和健康服务健康状况的机制。
用户可以在etcd中注册服务，并且对注册的服务配置key TTL，定时保持服务的心跳以达到监控健康状态的效果。

一种查找和连接服务的机制。
通过在etcd指定的主题下注册的服务业能在对应的主题下查找到。为了确保连接，我们可以在每个服务机器上都部署一个proxy模式的etcd，这样就可以确保访问etcd集群的服务都能够互相连接。

