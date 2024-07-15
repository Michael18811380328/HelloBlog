# font-smoothing 优化文字抗锯齿

在css的body里最好加上 font-smoothing 属性，可以使页面上的字体抗锯齿，字体看起来会更清晰舒服，页面清晰。这个 CSS 直接写在全局通用样式表中，使用一次即可。

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

MDN：https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-smooth

