# [H5]<video>标签的poster属性图片铺满整个屏幕

在用<video>标签的时候发现图片不能平铺整个屏幕，后来查了一下需要用到object-fit属性
 从MDN上查到的属性内容如下：
 **`object-fit`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 属性指定[可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)的内容应该如何适应到其使用的高度和宽度确定的框。

![img](https:////upload-images.jianshu.io/upload_images/15328979-a6d8090a08df61ae.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

MDN上object-fit属性.png



设置成fill平铺就可以了，代码如下：



```css
video{
    width:100%;
    height:100%;
    object-fit:fill;  
}
```

参考网址https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit



2人点赞



[HTML]()





作者：废柴码农
链接：https://www.jianshu.com/p/05272b1303b6
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。