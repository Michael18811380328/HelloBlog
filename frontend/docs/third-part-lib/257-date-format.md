# 257 date-format

## 用途

NodeJS 中吧日期对象转换成字符串的工具

## 可靠性

50颗星，使用300万

## 官网链接

https://github.com/nomiddlename/date-format

https://www.npmjs.com/package/date-format


## 基本使用

```js
var format = require('date-format');
format(); //defaults to ISO8601 format and current date.
format(new Date());
format('hh:mm:ss.SSS', new Date());
```

## 其他
