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

1、将 HTML 转换成 canvas，并增加到 body 后面

```js
html2canvas(document.body).then(function(canvas) {
    document.body.appendChild(canvas);
});
```

2、将 HTML 转换成 canvas，然后使用原生 API 转换成 png 并下载

~~~html
<div id="capture" style="padding: 10px; background: #f5da55">
  <h4 style="color: #000; ">Hello world!</h4>
</div>
~~~

~~~js
// 把 HTML 转换成 canvas
html2canvas(document.querySelector("#capture")).then(canvas => {
  
  // 下载需要创建一个A标签
  let a = document.createElement('a');

  // canvas 转换成 png 图片
  a.href = canvas.toDataURL('image/png', 1.0);
  // https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL
  // canvas.toDataURL(type, encoderOptions);
  // 第一个参数是图片类型，默认是 png, 可以设置 jpg 谷歌支持 webp
  // 第二个参数是图片质量，取值范围是 0-1

  // 然后设置下载图片的名称
  a.download = 'test.png';

  // 触发A标签点击事件，下载
  a.click();
});
~~~

这样就可以把 HTML 转换成 canvas，导出为 png 下载

## 其他

### 配置说明

这个方法的第一个参数是 canvas 的DOM节点，第二个是对象（配置项）具体使用

~~~js
html2canvas(content, {
  allowTaint: true, // 允许污染，参考 https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_enabled_image
  taintTest: true, // 在渲染前测试图片
  useCORS: true, // 使用跨域(当allowTaint为true时这段代码没用)
})
~~~

### 注意点

- 局限：html2canvas可以通过纯JS对浏览器端经行截屏，但截图的精确度还有待提高，部分css不可识别，所以在canvas中不能完美呈现原画面样式
- 注意版本号：现在正式版本号 1.3.2，避免使用测试版本；版本号和文档是否对应等问题
- canvas 污染：canvas 可以导入外部域 crossorigin 的图片或者 svg，那么外部图片的数据可能污染 canvas，叫做污染。

### 参考链接

官网全部配置项：http://html2canvas.hertzen.com/configuration

https://www.jianshu.com/p/6a07e974a7e8

https://www.jianshu.com/p/9615ee8224b0

