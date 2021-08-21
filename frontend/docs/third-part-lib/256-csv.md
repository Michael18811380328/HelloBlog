# 256 csv

## 用途

这是一个功能齐全的 CSV 解析工具，完全在您的浏览器上运行。 没有数据离开您的计算机！ 还可以使用它来学习如何使用我们的软件包并以交互方式测试各种选项。

This is a full-featured CSV parsing tool running entirely on your browser. No data leave your computer ! Use it also to learn how to use our packages and to test the various options interactively.

## 可靠性

3000星星

## 官网链接

https://csv.js.org/

https://github.com/adaltas/node-csv

## 基本使用

链式编程，用于 nodeJS 输入输出解析 csv 文件

```js
// Import the package main module
const csv = require('csv')
// Use the module
csv
// Generate 20 records
.generate({
  delimiter: '|',
  length: 20
})
// Parse the records
.pipe(csv.parse({
  delimiter: '|'
}))
// Transform each value into uppercase
.pipe(csv.transform(function(record){
   return record.map(function(value){
     return value.toUpperCase()
   });
}))
// Convert the object into a stream
.pipe(csv.stringify({
  quoted: true
}))
// Print the CSV stream to stdout
.pipe(process.stdout)
```

## 其他

有下面四个子库，可以使用一部分

csv-generate

Write random and user-defined strings, objects and arrays

csv-parse

Read CSV strings and buffers and write object and arrays

stream-transform

Read and write objects and arrays

csv-stringify

Read object and arrays and write CSV strings

