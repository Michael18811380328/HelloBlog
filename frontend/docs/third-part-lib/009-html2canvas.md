# 009 html2canvas

## 用途

对网页 HTML 截图（HTML转换成canvas，然后保存为图片）。屏幕截图基于DOM，因此可能无法100%准确地反映真实情况。可以截取屏幕一部分，可以截取全部网页。

## 原理

脚本将遍历加载它的页面的DOM。它收集所有元素的信息，然后使用这些元素来构建页面的表示。实际上，它不是基于一个页面的文字来构建的，而是基于它的一个页面的表示。因此，它只能正确地呈现它理解的属性，这意味着有许多CSS属性不起作用。

## 可靠性

周下载70万，2万星星

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

## 综合案例

~~~jsx
import html2canvas from 'html2canvas';

onCapture = () => {
  html2canvas(document.querySelector("#map-container"), {
    allowTaint: true,
    taintTest: true,
    useCORS: true,
    ignoreElements: (element) => {
      if (CAPTURE_IGNORE_CLASS_LIST.includes(element.className)) {
        return true;
      }
    }
  }).then(canvas => {
    const captureContainer = document.createElement('div');
    captureContainer.className = 'map-capture';
    
    const downLoadLink = document.createElement('a');
    downLoadLink.className = 'download-link';
    captureContainer.appendChild(downLoadLink);
    captureContainer.appendChild(canvas);
    document.querySelector('.dtable-map-plugin').appendChild(captureContainer);

    document.querySelector('.map-capture').appendChild(canvas);
    this.convertCanvasToImage(canvas);
  });
}

convertCanvasToImage = (canvas) => {
  const src = canvas.toDataURL("image/png", 1);
  const link = document.querySelector('.download-link');
  link.href = src;
  link.download = 'map.png';
  link.click();
  document.querySelector('.map-capture').remove();
}
~~~

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

- 局限：html2canvas 可以通过纯JS对浏览器端经行截屏，但截图的精确度还有待提高，部分css不可识别，所以在canvas中不能完美呈现原画面样式
- 注意版本号：现在正式版本号 1.4，避免使用测试版本；版本号和文档是否对应等问题
- canvas 污染：canvas 可以导入外部域 crossorigin 的图片或者 svg，那么外部图片的数据可能污染 canvas，叫做污染。

## 链接

官网: http://html2canvas.hertzen.com/

github: https://github.com/niklasvh/html2canvas

配置：http://html2canvas.hertzen.com/configuration

文档：http://html2canvas.hertzen.com/documentation

https://www.jianshu.com/p/6a07e974a7e8

https://www.jianshu.com/p/9615ee8224b0
