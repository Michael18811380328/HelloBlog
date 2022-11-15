# SVG 避免锯齿

最近遇到一个项目，svg 图标较大的情况下边缘平滑，显示较小时候，界面有一些锯齿和模糊。查阅资料如下

这里放两个图



## 解决方案

1、UI：制作 svg 时，需要让不同图层或路径，和网格线对齐（可能需要 sketch 和 Adobe Illustrator 导出）

2、前端：更改 svg 渲染模式，在 svg 标签中，加入 `shape-rendering` 属性

~~~html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100" height="100" shape-rendering="optimizeSpeed 或 crispEdges 或 geometricPrecision">
~~~

## 具体原因

stackoverflow 有人遇到这个问题：使用 svg 绘制两条线，path 是对应的路径，其中第一条是 1px，边缘显示清晰，第二条显示2px，边缘是虚的。代码中设置的宽度是相同的。原文如下：

> ### how to handle SVG pixel snapping
>
> I am trying to render two svg lines using path element. The first line has 1px width and it is sharp The second line has 2px width and it is blurred
> The stroke-width is the same for both. How to fix this
>
> ```
> <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
>  <path style="stroke-width:1;stroke:red;opacity:1;" d="M  300.5  250 L  300.5 300 "></path>
>  <path style=" stroke-width:1;stroke:red;opacity:1;" d="M  350    250 L  350  300  "></path> 
> </svg>
> ```

高赞回答如下

默认情况下，整数坐标映射到像素正方形的交点。 因此，宽度为 1 的水平/垂直线以像素行之间的边界为中心，并延伸到两侧像素的一半。设置了 0.5 的偏移量使线条变得清晰。

修复问题，可以在第二行坐标上添加 0.5，或者使用样式 `shape-rendering：crispEdges`。 请注意，crisperEdges 可防止抗锯齿，因此水平/垂直线条清晰，但有角度的线条看起来是块状的。

stroke-width=1 也不是有效的 CSS 语法，第一个需要改成 stroke-width: 1

>Mainly it's the 0.5 offset that makes the line sharp. [By default, integer coordinates map to the intersections of the pixel squares. So a width-1 horizontal/vertical line is centered on the boundary between pixel rows and extends half way into the pixels on either side.](http://cairographics.org/FAQ/#sharp_lines)
>
>So to fix the second line either add 0.5 to the co-ordinates or use the style `shape-rendering: crispEdges`. Note that [crispEdges](http://www.w3.org/TR/SVG/painting.html#ShapeRenderingProperty) prevents antialiasing so horizonal/vertical lines are crisp but angled lines look blocky.
>
>Also stroke-width=1 is not valid CSS syntax. The first example stroke-width: 1 has it right.

查阅 MDN，svg 渲染模式如下，我也总结了使用场景

- 默认 auto：浏览器自动权衡渲染速度、平滑度、精确度。默认是倾向于精确度，而非平滑度和速度。

- optimizeSpeed：偏向渲染速度，浏览器会关闭反锯齿模式。（速度快，适合界面快速加载，适合低配置）
- crispEdges：偏向更加清晰锐利的边缘的渲染。浏览器在渲染的时候会关闭反锯齿模式，且会让线条的位置和宽度和显示器边缘对齐。（增加锐度，适合棱角分明的图标，例如直线，长方形等）
- geometricPrecision：偏向渲染平滑的曲线。（增加平滑，适合曲线，圆形图标等）

如果一个图标同时有曲线和直线，根据实际效果取舍。

## 参考资料

- https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/shape-rendering
- https://stackoverflow.com/questions/38618134/svg-is-sharp-and-clear-but-font-is-blurry-even-with-font-smoothing-set-to-none?r=SearchResults
- https://stackoverflow.com/questions/19558454/how-to-handle-svg-pixel-snapping?r=SearchResults

