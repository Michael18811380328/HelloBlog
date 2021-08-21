# 262 iconv-lite

## 用途

JS 字符串编码转换

Pure JS character encoding conversion
No need for native code compilation. Quick to install, works on Windows, Web, and in sandboxed environments.

Used in popular projects like Express.js (body_parser), Grunt, Nodemailer, Yeoman and others.
Faster than node-iconv (see below for performance comparison).

Intuitive encode/decode API, including Streaming support.

In-browser usage via browserify or webpack (~180kb gzip compressed with Buffer shim included).
Typescript type definition file included.

React Native is supported (need to install stream module to enable Streaming API).

## 可靠性

2000星星，下载 2000万

主要是 nodeJS 使用

## 官网链接

https://www.npmjs.com/package/iconv-lite

https://github.com/ashtuchkin/iconv-lite

## 基本使用

```js
var iconv = require('iconv-lite');

// Convert from an encoded buffer to a js string.
str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');

// Convert from a js string to an encoded buffer.
buf = iconv.encode("Sample input string", 'win1251');

// Check if encoding is supported
iconv.encodingExists("us-ascii")
```

## 其他
