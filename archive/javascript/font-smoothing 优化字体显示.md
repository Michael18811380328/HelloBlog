# font-smoothing 优化整个网页

在css的body里最好加上 font-smoothing 属性。 这个属性可以使页面上的字体抗锯齿，使用后字体看起来会更清晰舒服。加上之后就顿时感觉页面清晰了。

这个 CSS 直接写在通用样式表中，使用一次即可

### 代码实例

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

