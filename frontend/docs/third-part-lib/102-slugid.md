# 102 slugid

## 用途

A node.js module for generating v4 UUIDs and encoding them into 22 character URL-safe base64 slug representation 

生成 V4 版本的UUID并压缩成 22 位

## 可靠性

59个星星

使用两万

## 官网链接

https://www.npmjs.com/package/slugid

https://github.com/taskcluster/slugid


## 基本使用


```js
var slugid = require('slugid');

// Generate URL-safe base64 encoded UUID version 4 (random)
var slug = slugid.v4();

// Get UUID on the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
var uuid = slugid.decode(slug);

// Compress to slug again
assert(slug == slugid.encode(uuid));
```

## 其他

项目中主要使用这个生成行的 id。行数量级是 10万以上，所以需要避免行ID严格不同

其他的 ID 可以手写随机数函数生成（数量级不超过100）

或者，能否把长链接压缩成短链接，便于复制粘贴
