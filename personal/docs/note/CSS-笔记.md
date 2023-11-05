# CSS笔记 
 
## 0039 BfC是什么？有什么作用？怎么生成？


EMC表示块级上下文

怎样触发，可以使用 position absolute或者overflow hidden来触发

主要的作用。生成的内部元素和外部元素之间的样式互不干扰，可以避免内部元素和外部元素的margin互相重叠

也可以解决元素之间造成副组件的高度塌陷问题



   
## 0052 如何实现一个DIV居中


三种

```
display: flex;
align-itmes: center;
justify-content: center;

position: absolute;
y: 50%
x: 50%;
transform: translate(-50%, -50%)

display: grid
align-itmes: center;
justify-content: center;

```

扩展，怎样实现文本居中？



   
## 0057 Css 中 opacity 0 visibility hidden display none 区别


opacity: 0 透明，但是还占位（可以设置具体的透明度）

visibility: hidden 元素不可见，会占据页面上的元素（只能设置是否显示）

display: none 不显示，不占位



   
## 0060 Max width 和 width 区别


width 用于默认宽度，

max-width 用于小屏幕下设置最大宽度（可以使用JS设置宽度）

特殊：当 width 已经使用 important 标注后，可以使用 max-width 处理实际宽度



   
## 0063 无缝轮播图怎么实现


基本思路是：设置一个数组存放全部的图片，然后设置定时器，循环获取数组中的元素即可

可以参考 <https://zhuanlan.zhihu.com/p/151897269> 

或者是把全部的图片渲染成一个横轴很长的列表，然后设置 transLateY 改变相对位移（增加动画效果），定时器改变位移。设置最后一张图片和第一张图片一样，然后跳转实现无缝轮播的效果。



   
## 0068 Retina屏幕1像素的问题


### 1px 问题

在一些 `Retina屏幕` 的机型上，移动端页面的 1px 会变得很粗，呈现出不止 1px 的效果。原因很简单——CSS 中的 1px 并不能和移动设备上的 1px 划等号。它们之间的比例关系有一个专门的属性来描述：

window.devicePixelRatio = 物理像素 / CSS像素

如果这是2，这就意味着设置的 1px CSS 像素，在这个设备上实际会用 2 个物理像素单元来进行渲染，所以实际看到的一定会比 1px 粗一些。

这是 css 兼容性问题

### 解决1：伪元素先放大后缩小 transform scale0.5 来解决

先放大、后缩小：在目标元素的后面追加一个 ::after 伪元素，让这个元素布局为 absolute 之后、整个伸展开铺在目标元素上，然后把它的宽和高都设置为目标元素的两倍，border值设为 1px。接着借助 CSS 动画特效中的放缩能力，把整个伪元素缩小为原来的 50%。此时，伪元素的宽高刚好可以和原有的目标元素对齐，而 border 也缩小为了 1px 的二分之一，间接地实现了 0.5px 的效果。

```
#container[data-device="2"] {
    position: relative;
}

#container[data-device="2"]::after{
      position:absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      content:"";
      transform: scale(0.5);
      transform-origin: left top;
      box-sizing: border-box;
      border: 1px solid #333;
    }
}


```

### 解决2：viewport 缩放来解决

界面整体改变缩放

\<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">

这里针对像素比为2的页面，把整个页面缩放为了原来的1/2大小。这样，本来占用2个物理像素的 1px 样式，现在占用的就是标准的一个物理像素。根据像素比的不同，这个缩放比例可以被计算为不同的值，用 js 代码实现如下：

```
const scale = 1 / window.devicePixelRatio;
// 这里 metaEl 指的是 meta 标签对应的 Dom

metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);

```



   
## 0073 BFC 和其他几个布局方式


常见布局格式 Block Inline Grid Flex Table

1、Block 块级 默认 div 布局，从上到下布局

2、Inline 行内 默认文本 span 布局

3、Flex 栅格布局 用于对齐，每行每列分布多少

4、Grid 网格布局 使用较少，主要是表格内部，可能存在 margin padding 不好调整

5、Table 布局，局限比较多（可能某些 margin padding 不好调试），是默认的表格布局



   
## 0112 Css中制作动画有哪些？


transform变形，包括 rotate，translate，skills，scratch metrics

Transition转换

Animation 动画



   
## 0129 pointer-events 和点击穿透


有时候，我们会遇到界面中多个图层重叠的问题，下面图层绑定函数，上面的图层显示 UI 效果。我们希望点击事件，可以穿透上层 DIV 然后触发下层 DIV 的函数。



那么可以设置 'pointer-events: none' 表示上层的点击事件是无效的。



还可以避免 hover visited 的效果（我们想改变一个链接的显示状况，避免出现 visited 后的蓝色边框）



其他的属性主要用在 svg 上面



详情参考：https\://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events



   
## 0135 flex 和 inline-flex 的区别


类似 block 和 inline-block，前缀的 inline 是相对于父盒子而言，是行内元素还是块级元素。flex 都表示内部是伸缩盒子。

Inline-flex 存在的问题：如果不同子盒子的高度不同（例如有的有文字，有的没有文字），都设置了 inline-flex 那么整理的高度就不一定对齐。解决方法：vertical-align: middle 设置到父元素上面（具体应用：移动端链接列对齐）

Flex 细节参考：

https\://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

https\://www.ruanyifeng.com/blog/2015/07/flex-examples.html



   
## 0137 css 使用 3D 渲染原理


参考这篇文章：

<https://zhuanlan.zhihu.com/p/404656386?utm_medium=social&utm_oi=27091277971456> 

1、3D 效果的原理：一个复杂的3D效果，是由很多定点和面组成的。首先在三维空间创建很多点，每三个点可以构成一个平面或者曲面。每一个曲面填充特定的颜色或者图案后，构成一个 3D 模型。普通的3D模型有几万个点和面构成。

2、3D 转换成 2D——光栅化：3D模型如果需要显示在屏幕（平面）上，需要算法转换（光栅化）。个人理解原理是，一个3D模型，发光后通过一个光栅，投影到平面上，就是转换后的效果。这个计算不是很复杂，但是点集很多，需要大量计算（所以使用GPU计算）

3、GPU 和 CPU 计算特点：CPU 适合计算复杂的串行计算，GPU 适合计算简单的大量并行计算（渲染视频，渲染3D效果，加密货币计算哈希值等）所以 3D 栅格化算法使用的 GPU 加速实现。

4、浏览器渲染3D，使用 GPU 加速，具体的 CSS 操作：css 中，如果使用 opacity, transform: translate3D 等属性，会自动触发 GPU 渲染（在原来的基础上，渲染一个新的图层，然后图形栅格化，叠加到原始图层上，实现最终效果）

5、CSS 3D 加速的优缺点：优点是减轻CPU的计算压力；缺点是可能多消耗一些内存，数据的传输也消耗一些时间（从内存读取到显卡的时间）

可以使用 will-change 强制硬件加速，参考下面：

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change> 

<https://juejin.cn/post/6844904111842787341> 

硬件加速：硬件加速意味着 GPU 会通过代替 CPU 做一些负荷比较大的事情，来协助浏览器快速渲染页面，当CSS操作使用硬件加速的时候，通常会使页面渲染速度加快。



   
## 0145 flex布局


控制内部元素和控制容器，而flex布局对于容器的控制是基于轴这个概念的，而flex中的轴分为：

父元素：主轴、垂直轴、换行轴；主轴指的就是元素排列的方向轴，reverse控制方向

```
display: flex;
flex-direction: column | row | column-reverse | row-reverse;
justify-content: center | start | end;
align-items: center | start | end | space-between | space-around;
flex-wrap: nowrap|wrap|wrap-reverse; 是否换行

```

子元素

```
flex: 1 1 auto;
flex-basis: number|auto| 一个长度单位或者一个百分比，规定灵活项目的初始长度
flex-shrink: number 收缩量

```

说明：

flex 伸缩布局；外部是容器，内部是具体的元素。

容器上设置 display:flex，然后主轴和交叉轴分别设置居中 justify-content: center, align-items: center 实现元素的水平垂直居中。也可以设置 left right flex-start flex-end space-between space-around 等值。轴的方向 flex-direction： column | row。

内部子元素，设置 flex: 0 1 auto。这是缩写（flex-grow, flex-shrink, flex-basic）三个值的缩写，分别表示，是否伸长，是否收缩，初始尺寸。默认是不能伸长，可以收缩，初始宽度自动。



   
## 0176 JS 让页面实现全屏效果


页面全屏：

设置当前的顶层组件，width 100% height 100% 即可

网页全屏：

RequestFullscreen()

ExitFullscreen()

```
       document.getElementById("fullScreen").onclick=function(){
          if(document.documentElement.RequestFullScreen){
            document.documentElement.RequestFullScreen();
          }
          //兼容火狐
          console.log(document.documentElement.mozRequestFullScreen)
          if(document.documentElement.mozRequestFullScreen){
            document.documentElement.mozRequestFullScreen();
          }
          //兼容谷歌等可以webkitRequestFullScreen也可以webkitRequestFullscreen
          if(document.documentElement.webkitRequestFullScreen){
            document.documentElement.webkitRequestFullScreen();
          }
          //兼容IE,只能写msRequestFullscreen
          if(document.documentElement.msRequestFullscreen){
            document.documentElement.msRequestFullscreen();
          }
       }
       document.getElementById("noFullScreen").onclick=function(){
          if(document.exitFullScreen){
            document.exitFullscreen()
          }
          //兼容火狐
          console.log(document.mozExitFullScreen)
          if(document.mozCancelFullScreen){
            document.mozCancelFullScreen()
          }
          //兼容谷歌等
          if(document.webkitExitFullscreen){
            document.webkitExitFullscreen()
          }
          //兼容IE
          if(document.msExitFullscreen){
            document.msExitFullscreen()
          }

```

参考链接：<https://blog.csdn.net/jgujgu/article/details/122818678> 

全屏后的样式

```
:-webkit-full-screen { }
:-moz-full-screen { }
:-ms-fullscreen { }
:fullscreen { }

```



   
## 0197 sticky 是什么样式？


sticky 粘性布局

常用在 nav 顶部吸顶操作

1 如果不满足条件，是相对定位 relative

2 如果满足条件，是固定定位 fixed

当界面滚动位置超过 100px 后，设置 div 固定在界面顶部。如果界面滚动位置不超过100px时，设置定位是 relative。当然 CSS 实现更方便。

MDN: 元素根据正常文档流进行定位，然后相对它的_最近滚动祖先_（nearest scrolling ancestor）和 [containing block](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Containing_block)（最近块级祖先 nearest block-level ancestor），包括 table-related 元素，基于 `top`、`right`、`bottom` 和 `left` 的值进行偏移。偏移值不会影响任何其他元素的位置。 该值总是创建一个新的[层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)（stacking context）。注意，一个 sticky 元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的 `overflow` 是 `hidden`、`scroll`、`auto` 或 `overlay` 时），即便这个祖先不是最近的真实可滚动祖先。这有效地抑制了任何“sticky”行为.

使用 JS 也可以实现。

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/position> 

<https://juejin.cn/post/6844903848369192974> 

自己写的案例

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      padding: 0;
      margin: 0;
    }
    html, body {
      height: 100%;
      width: 100%;
    }
    /* 外部盒子高度较小，设置可以滚动 */
    .father {
      height: 100%;
      overflow: auto;
    }
    .other, .child {
      height: 300px;
      width: 300px;
      margin: 0 auto;
      text-align: center;
    }
    /* 内部的元素按照默认的顺序排列，高度超出外部的盒子，可以上下滚动 */
    .other {
      background-color: greenyellow;      
    }
    /* 设置其中一个内部元素 sticky，默认是 relative 相对定位，当滚动到距离顶部 top: 0，然后变成固定定位，吸附在顶部显示 */
    .child {
      background-color: aqua;
      /* 关键 */
      position: sticky;
      top: 0px;
    }
  </style>
</head>
<body>
  <div class="father">
    <div class="other">这是始终滚动的部分</div>
    <div class="other">这是始终滚动的部分</div>
    <div class="child">这部分吸附在顶部</div>
    <div class="other">这是始终滚动的部分</div>
    <div class="other">这是始终滚动的部分</div>
  </div>
</body>
</html>

```



   
## 0206 grid 布局是什么？


<https://www.runoob.com/cssref/css-pr-grid.html> 

还有个人的博客

<https://michael18811380328.github.io/frontend/site/css/Grid%E5%B8%83%E5%B1%80/> 



   
## 0246 white-space 是什么


white-space 用来处理空格的显示方式，通常用来处理省略号显示，以及多个空格显示问题。

浏览器渲染网页的两个规则：把空格换行符都当做自动换行，会把多个空格渲染成一个空格显示。

* white-space: nowrap; 表示超出的部分不换行，一行内部显示
* white-space: pre-wrap; 正常换行，多个空格保留，不会自动转换成一个空格
* white-space: pre; 多个空格保留，不会自动转换成一个空格; 超出部分不换行

参考链接

<https://www.w3school.com.cn/cssref/pr_text_white-space.asp> 

<https://www.zhangxinxu.com/wordpress/2021/07/css-white-space-nowrap/> 



   
## 0247 如何实现文本超出显示省略号


使用下面的css

```
.text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

```

overflow: hidden; 表示超出部分隐藏；

text-overflow: ellipsis; 表示文本超出部分，显示省略号；

white-space: nowrap; 段落不换行，一行展示；



   
## 0250 grid 中 gap 怎么使用


gap属性是用来设置网格行与列之间的间隙，该属性是 row-gap() 和 column-gap 的简写形式。

设置网格行与列之间的间隙

使用场景：flex grid 布局中支持，block table 中不支持这个属性。这个属性应该使用在父元素上。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    /* 基本样式 */
    * {
      margin: 0;
      padding: 0;
    }
    .container {
      width: 300px;
      border: 1px solid #ccc;
    }
    .container>div {
      border: 1px solid greenyellow;
    }

    /* grid 布局 */
    .container {
      display: grid;
      gap: 20px;
      grid-template-columns: 50px 50px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
  </div>
</body>
</html>

[object Object]

```

参考

<https://www.runoob.com/cssref/css3-pr-gap.html>﻿

[﻿https://developer.mozilla.org/zh-CN/docs/Web/CSS/gap﻿](<https://developer.mozilla.org/zh-CN/docs/Web/CSS/gap﻿>) 

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/row-gap> 

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-gap> 



  