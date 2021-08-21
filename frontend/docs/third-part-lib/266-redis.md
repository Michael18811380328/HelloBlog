# 266 redis

## 用途

nodejs 版本 redis 客户端

## 可靠性

## 官网链接

https://redis.js.org/

https://www.npmjs.com/package/redis

https://github.com/NodeRedis/node-redis

## 基本使用

```js
const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

client.set("key", "value", redis.print);
client.get("key", redis.print);
```

## 其他

Connection and other Events
client will emit some events about the state of the connection to the Redis server.

"ready"
client will emit ready once a connection is established. Commands issued before the ready event are queued, then replayed just before this event is emitted.

"connect"
client will emit connect as soon as the stream is connected to the server.

"reconnecting"
client will emit reconnecting when trying to reconnect to the Redis server after losing the connection. Listeners are passed an object containing delay (in ms from the previous try) and attempt (the attempt #) attributes.

"error"
client will emit error when encountering an error connecting to the Redis server or when any other in Node Redis occurs. If you use a command without callback and encounter a ReplyError it is going to be emitted to the error listener.

So please attach the error listener to Node Redis.

"end"
client will emit end when an established Redis server connection has closed.

"warning"
client will emit warning when password was set but none is needed and if a deprecated option / function / similar is used.
