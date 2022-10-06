# `<video>`标签的poster属性图片铺满整个屏幕

在用`<video>`标签的时候发现图片不能平铺整个屏幕，后来查了一下需要用到object-fit属性
 从MDN上查到的属性内容如下：

 **`object-fit`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 属性指定[可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)的内容应该如何适应到其使用的高度和宽度确定的框。

MDN上object-fit属性.png

设置成fill平铺就可以了，代码如下：

```css
video{
    width:100%;
    height:100%;
    object-fit:fill;  
}
```

参考网址 https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit

