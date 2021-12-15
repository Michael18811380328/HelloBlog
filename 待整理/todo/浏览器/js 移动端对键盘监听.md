# js 移动端对键盘监听

[![img](https://cdn2.jianshu.io/assets/default_avatar/15-a7ac401939dd4df837e3bbf82abaa2a8.jpg)](https://www.jianshu.com/u/335ff1319aeb)

[旅行木匠](https://www.jianshu.com/u/335ff1319aeb)关注

0.3362018.12.14 12:36:58字数 187阅读 4,366

iphoneX 微信页面下 拉起键盘后关闭键盘，原键盘区域还存在

### 解决办法

js 没有办法对手机软键盘直接进行监听的

那是否可以对 input 失去焦点进行监听
搜一了一个[MDN Web 文档](https://developer.mozilla.org/zh-CN/docs/Web/Events)，发现
focus 和 blur 不会冒泡，而 focusin 和 focusout 可以支持冒泡，加事件代理，当触发 focusout 事件后滚一下



```js
window.addEventListener('focusout', () => {
  window.scrollTo(0, 0);
});
```

测试后发现 ios 可以监听到 focusout 事件，而 android 在键盘收起后，input 仍处于焦点状态，无法触发 focusout 事件
添加 resize 事件后 发现 android 在唤起键盘收起键盘后 window.innerHeight 会有改变，而 ios 不会

js 移动端对键盘监听



```js
if (/Android/gi.test(navigator.userAgent)) {
  const innerHeight = window.innerHeight;
  window.addEventListener('resize', () => {
    const newInnerHeight = window.innerHeight;
    if (innerHeight > newInnerHeight) {
      // 键盘弹出事件处理
    } else {
      // 键盘收起事件处理
    }
  });
} else {
  window.addEventListener('focusin', () => {
    // 键盘弹出事件处理
  });
  window.addEventListener('focusout', () => {
    // 键盘收起事件处理
  });
}
```