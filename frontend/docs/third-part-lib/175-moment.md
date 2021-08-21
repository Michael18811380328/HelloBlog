# 175 moment

## 用途

A JavaScript date library for parsing, validating, manipulating, and formatting dates.

可以把日期对象和日期字符串进行准换；标准时间和全球不同时区的转换（这个国际化项目中使用较多）

比较两个日期对象的相对时间；显示成不同的语言等

## 可靠性

4万星星，周下载量千万，代码可靠

## 官网链接

https://momentjs.com/

https://www.npmjs.com/package/moment

https://github.com/moment/moment

## 基本使用

详见官网文档

https://momentjs.com/docs/#/use-it/


```js
moment().format('MMMM Do YYYY, h:mm:ss a'); // August 18th 2021, 5:28:16 pm
moment("20111031", "YYYYMMDD").fromNow(); // 10 years ago
moment().format('LTS');  // 5:28:35 PM
```

## 其他

这个兼容了不同的时区，操作系统等等

相对于直接转换，这个增加了10倍的时间

所以不建议大批量转换时间（例如表格中时间的排序操作等）

