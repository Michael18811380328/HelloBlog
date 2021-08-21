# 009 html2canvas

## 用途

对网页 HTML 截图（HTML转换成canvas，然后保存为图片）

可以截取一部分，可以截取全部网页

## 可靠性

周下载70万，2万星星

## 官网链接

https://www.npmjs.com/package/html2canvas

https://github.com/niklasvh/html2canvas

https://html2canvas.hertzen.com/

## 基本使用

```js
html2canvas(document.body).then(function(canvas) {
    document.body.appendChild(canvas);
});
```

## 其他
