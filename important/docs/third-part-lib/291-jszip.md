# 291 zipjs

## 用途

JSZip is a javascript library for creating, reading and editing .zip files, with a lovely and simple API.

## 可靠性

300万下载，7000颗星星

## 官网链接

https://stuk.github.io/jszip/

https://www.npmjs.com/package/jszip

## 基本使用

```js
var zip = new JSZip();

zip.file("Hello.txt", "Hello World\n");

var img = zip.folder("images");
img.file("smile.gif", imgData, {base64: true});

zip.generateAsync({type:"blob"}).then(function(content) {
  // see FileSaver.js
  saveAs(content, "example.zip");
});

/*
Results in a zip containing
Hello.txt
images/
    smile.gif
*/
```

## 其他

可以把字符串内容，或者多媒体文件，压缩成 zip，然后下载到本地。可以在浏览器中使用，也可以在 node 环境中使用。

也可以编辑或者读取 zip 文件

这是 CSDN 自己博客的链接，介绍更详细，https://blog.csdn.net/weixin_41697143/article/details/89027238
