# H5+CSS笔记 

 原始表格链接：https://cloud.seatable.cn/dtable/external-links/59b453a8639945478de2/

 
## 0039 BfC是什么？有什么作用？怎么生成？


EMC表示块级上下文

怎样触发，可以使用 position absolute或者overflow hidden来触发

主要的作用。生成的内部元素和外部元素之间的样式互不干扰，可以避免内部元素和外部元素的margin互相重叠

也可以解决元素之间造成副组件的高度塌陷问题



   
## 0052 如何实现一个DIV居中


块级元素三种居中方法

```css
display: flex;
align-itmes: center;
justify-content: center;


position: absolute;
y: 50%
x: 50%;
transform: translate(-50%, -50%);


display: grid
align-itmes: center;
justify-content: center;

```

实现文本居中

```css
height: 20px;
line-height: 20px;
text-align: center;

```



   
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

```css
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

```html
<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no"/>

```

这里针对像素比为2的页面，把整个页面缩放为了原来的1/2大小。这样，本来占用2个物理像素的 1px 样式，现在占用的就是标准的一个物理像素。根据像素比的不同，这个缩放比例可以被计算为不同的值，用 js 代码实现如下：

```javascript
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


有时候，我们会遇到界面中多个图层重叠的问题，下面图层绑定函数，上面的图层显示 UI 效果，希望点击事件，可以穿透上层 DIV 然后触发下层 DIV 的函数。

那么可以设置 `pointer-events: none` ，表示上层的点击事件是无效的。

还可以避免 hover visited 的效果（我们想改变一个链接的显示状况，避免出现 visited 后的蓝色边框）

其他的属性主要用在 svg 上面

详情参考：<https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events>



   
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



   
## 0210 canvas 有哪些方法


HTML 插入 canvas

```html
<canvas id="can" width="500" height="500"></canvas>

```

具体方法

```javascript
//常用方法
var can = document.getElementById('can');
var cvs = can.ContentText("2d");

cvs.moveTo(0,0);
cvs.lineTo(500,500);
cvs.stroke();
cvs.strokeWidth = 5;
cvs.lineStyle = "red";
cvs.closePath();
cvs.clearPath();

cvs.fillStyle = "blue";
cvs.fill();

cvs.strokeRest(0,0,200,200);
cvs.fillRect(200,200,100,100);
cvs.clearRect(0,0,cvs.width,cvs.height);

lineCap: butt square round
lineJoin: miter bevel round

//虚线
cvs.setLineDash([x,y,z,p]);
cvs.getLineDash();
cvs.lineDashOffset = 2;
//偏移量

//绘制汉字
strokeText('描边文字');
fillText('填充汉字');
textAlign = "left/right/center";
textBaseline = "top/bottom/middle";
//垂直对齐方式

```



   
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



   
## 0339 rem 布局是什么


<https://www.runoob.com/w3cnote/px-em-rem-different.html> 

* px是固定的单位长度（像素），一旦设置了就无法随页面的大小而适应改变。
* em是相对长度单位，比px更具灵活性，em的长度是相对于父元素
* rem的长度是相对于根元素，也就是html的字体大小

如果不需要兼容多种分辨率的设备，直接使用 px 固定写法即可。如果兼容多种设备，尺寸都是字体的倍数，那么可以使用 rem 等单位。



   
## 0396 HTML 用户体验优化


* 输入框，对话框打开后自动聚焦（如果是原生的输入框，设置ref，点击 tab 聚焦；点击 enter 进行编辑；如果是合成组件，直接使用组件的autofocus聚焦），点击 esc 关闭对话框等

* 表单内部表单项点击 Tab 可以进行跳转到下一个表单项

* 使用 title 属性（解释图标的含义），alt 属性进行标识（解释图片的含义）

   
## 0246 white-space 是什么


white-space 用来处理空格的显示方式，通常用来处理省略号显示，以及多个空格显示问题。

浏览器渲染网页的两个规则：把空格换行符都当做自动换行，会把多个空格渲染成一个空格显示。

* white-space: nowrap; 表示超出的部分不换行，一行内部显示
* white-space: pre-wrap; 正常换行，多个空格保留，不会自动转换成一个空格
* white-space: pre; 多个空格保留，不会自动转换成一个空格; 超出部分不换行

参考链接

<https://www.w3school.com.cn/cssref/pr_text_white-space.asp> 

<https://www.zhangxinxu.com/wordpress/2021/07/css-white-space-nowrap/> 



   
## 0698 input color 原生 HTML 选择颜色


在网页中，可能会让用户选择颜色，进行自定义（文字颜色、背景色），有两种方案实现

1、react-color 第三方库实现

2、HTML input type=color 颜色选择器实现：这个依靠浏览器内置的颜色选择器实现的效果，最新版谷歌，火狐，Safari 都支持这个功能（选择组件的样式不一样）。好处是简单已操作，缺点是不同的浏览器实现组件效果不一样。

参考：[https://www.w3school.com.cn/jsref/dom\_obj\_color.asp](https://www.w3school.com.cn/jsref/dom_obj_color.asp "https://www.w3school.com.cn/jsref/dom_obj_color.asp")

```html
<input type="color" id="myColor" onchange="onChange()"/>
```

可以主动获取，或者被动获取颜色的值 input.value

```javascript
    function myFunction() {
      // click button to trigger this fn
      var x = document.getElementById("myColor").value;
    }

    function onChange(e) {
      var x = document.getElementById("myColor").value;
    }
```

​

   
## 0699 input range 原生 HTML 选择范围


[https://www.w3school.com.cn/jsref/dom\_obj\_range.asp](https://www.w3school.com.cn/jsref/dom_obj_range.asp "https://www.w3school.com.cn/jsref/dom_obj_range.asp")

这是 H5 新加的属性

HTML，这里注意 min max step 值，拖动后，可以改变 value，监听 onChange 可以获取实时的 value

```html
<input type="range" id="myInput" onchange="onChange()" min="0" max="100" step="10" value="20"/>
```

方法 stepUp stepDown，设置 dom 的 value

```javascript
document.getElementById("myInput").stepDown(50);
document.getElementById("myInput").stepUp(100);
```

自定义背景色和样式

```css
    input[type="range"]::-webkit-slider-runnable-track {
      background: yellow;
    }
    input[type="range"]::-webkit-slider-thumb {
      background: blue;
    }
```

​

   
## 0701 input week 原生 HTML 选择周


[https://www.w3school.com.cn/jsref/dom\_obj\_week.asp](https://www.w3school.com.cn/jsref/dom_obj_week.asp "https://www.w3school.com.cn/jsref/dom_obj_week.asp")

可以获取选择的周，例如  2024-W40

周实际使用的不多

```html
<input type="week" id="myInput" onchange="onChange()" />
```

```javascript
    function onChange(e) {
      var x = document.getElementById("myInput").value;
      console.log(x);
    }
```

​

   
## 0703 input time 原生 HTML 选择时间


可以选择时间，唯一不足就是视觉上不太好看

```html
<input type="time" id="myInput" onchange="onChange()" />
```

<img src="https://cloud.seatable.cn/workspace/32/asset/e82c7317-556e-45c4-8b5d-092331cd8977/images/auto-upload/image-1725610838357.png" alt="undefined" title="undefined" width="281" height="394" />

   
## 0705 原生 AbortController 中断请求


需求：在一个单页面中，存在多个图库视图，点击第一个加载很多图片，点击第二个，需要取消第一个的全部加载，然后直接加载第二个的图片。如果使用 img 标签，请求会直接发出去，然后无法直接通过 JS 阻止请求发出。

解决：

**AbortController** 接口表示一个控制器对象，允许你根据需要中止一个或多个 Web 请求。你可以使用 [AbortController()](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/AbortController "AbortController()") 构造函数创建一个新的 `AbortController` 对象。使用 [AbortSignal](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal) 对象可以完成与异步操作的通信。

[https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController "https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController")

```javascript
// 有两个按钮，下载和取消。点击下载后，发出请求；点击取消，如果还在下载中，那么就取消请求

// 1、点击下载按钮，开始下载中断控制器对象，就终止下载
downloadBtn.addEventListener("click", fetchVideo);

// 2、点击取消按钮，如果存在 
abortBtn.addEventListener("click", () => {
  if (controller) {
    controller.abort();
    console.log("中止下载");
  }
});

// 下载函数
function fetchVideo() {
  // 新建一个控制器对象，然后放在全局属性中
  controller = new AbortController();
  const signal = controller.signal;
  // 下载时，第二个参数传递控制器对象（便于中断控制）
  fetch(url, { signal })
    .then((response) => {
      console.log("下载完成", response);
    })
    .catch((err) => {
      console.error(`下载错误：${err.message}`);
    });
}
```

​

   
## 0247 如何实现文本超出显示省略号


使用下面的 css

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

这个可以用于文本的内容超出省略号，也能用于 span 元素超出的省略号。如果不显示省略号，看一下父节点的宽度是否合适。如果父节点的宽度大于子节点宽度，那么自然不显示省略号。



   
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

```

参考

<https://www.runoob.com/cssref/css3-pr-gap.html>﻿

[﻿https://developer.mozilla.org/zh-CN/docs/Web/CSS/gap﻿](<https://developer.mozilla.org/zh-CN/docs/Web/CSS/gap﻿>) 

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/row-gap> 

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-gap> 



   
## 0301 如何不让用户选择文本


1、设置 user-select：none 可以不让普通用户选择文本。

2、高级百度文库：实现不能复制的技术，可能是先实现 dom 节点，然后 htmltocanvas 转换成 canvas 避免了浏览器打开复制文本内容。

3、界面增加水印，避免用户用其他软件文字识别等。

理论上，只要是显示在屏幕上的内容，并可以通过摄像截图转换成图片，那么必然可以提取文本，这个是 JS 层面无法实现的。



   
## 0316 改变 placeholder 的字体颜色大小


这个方法也就在 PC 端可以，移动端兼容性不太好

```css
input::-webkit-input-placeholder { 
    font-size:14px;
    color: #333;
}

input::-moz-placeholder { 
    font-size:14px;
    color: #333;
}

input:-ms-input-placeholder { 
    font-size:14px;
    color: #333;
}

```



   
## 0317 audio 和 video 在 ios 和 andriod 中无法自动播放


原因：因为各大浏览器都为了节省流量，做出了优化，在用户没有行为动作时（交互）不予许自动播放；

```html
/* 音频，写法一 */
<audio src="music/bg.mp3" autoplay loop controls>你的浏览器还不支持哦</audio>

/* 音频，写法二 */
<audio controls="controls"> 
    <source src="music/bg.ogg" type="audio/ogg"></source>
    <source src="music/bg.mp3" type="audio/mpeg"></source>
    优先播放音乐bg.ogg，不支持在播放bg.mp3
</audio>

```

js

```javascript
// JS绑定自动播放（监听点击事件，播放音乐）
$(window).one('touchstart', function(){
    music.play();
})

// 微信兼容处理
document.addEventListener("WeixinJSBridgeReady", function () {
    music.play();
}, false);

//小结
//1.audio元素的autoplay属性在IOS及Android上无法使用，在PC端正常；
//2.audio元素没有设置controls时，在IOS及Android会占据空间大小，而在PC端Chrome是不会占据任何空间；
//3.注意不要遗漏微信的兼容处理，需要引用微信JS；

```

这个问题实际没有遇到过



   
## 0320 消除 transition 闪屏


消除 transition 闪屏

```css
.css {
  -webkit-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
}

```

过渡动画（在没有启动硬件加速的情况下）会出现抖动的现象， 以上的解决方案只是改变视角来启动硬件加速的一种方式；启动硬件加速的另外一种方式：

```css
.css {
  -webkit-transform: translate3d(0,0,0);
  -moz-transform: translate3d(0,0,0);
  -ms-transform: translate3d(0,0,0);
  transform: translate3d(0,0,0);
}

```

启动硬件加速最常用的方式：translate3d、translateZ、transform、opacity

属性/过渡动画（需要动画执行的过程中才会创建合成层，动画没有开始或结束后元素还会回到之前的状态）

will-change 属性（这个比较偏僻），一般配合opacity与translate使用（而且经测试，除了上述可以引发硬件加速的属性外，其它属性并不会变成复合层）。参考：<https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change> 弊端：硬件加速会导致 CPU 性能占用量过大，电池电量消耗加大 ；因此尽量避免泛滥使用硬件加速。



   
## 0323 有哪些 meta 标签


常用

```html
<!-- 设置缩放 -->
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui" />

<!-- 可隐藏地址栏，仅针对IOS的Safari（注：IOS7.0版本以后，safari上已看不到效果） -->
<meta name="apple-mobile-web-app-capable" content="yes" />

<!-- 仅针对IOS的Safari顶端状态条的样式（可选default/black/black-translucent ） -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" />

<!-- IOS中禁用将数字识别为电话号码/忽略Android平台中对邮箱地址的识别 -->
<meta name="format-detection"content="telephone=no, email=no" />

```

其他

```html
<!-- 启用360浏览器的极速模式(webkit) -->
<meta name="renderer" content="webkit">

<!-- 避免IE使用兼容模式 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name="HandheldFriendly" content="true">

<!-- 微软的老式浏览器 -->
<meta name="MobileOptimized" content="320">

<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">

<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">

<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">

<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">

<!-- UC应用模式 -->
<meta name="browsermode" content="application">

<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">

<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">

```



   
## 0387 打印网页没有颜色怎么处理


CSS属性`print-color-adjust`：设置用户代理可以做什么，以优化该元素在输出设备上的外观。默认情况下，浏览器可以根据输出设备的类型和能力，对元素的外观进行任何必要和审慎的调整。

print-color-adjust: economy; // 经济节省的。表示允许对元素进行它认为适当和谨慎的调整，以便为它被渲染的设备优化输出，在打印时，浏览器可能会选择不使用所有的背景图像，并调整文本颜色，以确保对比度最适合在白纸上阅读，作为默认情况，可能造成无法打印颜色。

print-color-adjust: exact; //准确。该元素的内容是经过特别精心设计的，以重要的方式使用颜色、图像和样式，基本保证原始样式打印。

参考：<https://juejin.cn/post/7244788137410347063> 

```css
@media print{
  *{
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}

```



   
## 0409 如何通过 JS 控制 CSS 动画停止


设置一个界面动画的暂停和继续（JS 点击按钮，动画暂停或者显示）

```css
div {
  animation-play-state: paused;
  animation-play-state: running;
  -webkit-animation-play-state: paused; /* Safari 和 Chrome */
}
```

```javascript
openAnimation = () => {
  this.inputRef.current.style.animationPlayState = "running";
};

closeAnimation = () => {
  this.inputRef.current.style.animationPlayState = "paused";
};
```


   
## 0410 background-size 有哪些


background-size 表示背景图片的尺寸：可以使用 px/%/container/cover

* PX 是绝对尺寸

* % 是相对于 div 的尺寸

* container 表示背景铺满 div，但是不够的地方是黑色的，背景图片可以完全显示在 div 上面。

* cover 表示背景铺满 div 并且可能超出，一部分背景图片显示不全。通常使用 cover 属性，适合所有的屏幕。

   
## 0415 sass 怎么使用


[https://www.sass.hk/guide/](https://www.sass.hk/guide/ "https://www.sass.hk/guide/")

目前项目中使用不多


   
## 0416 less 怎么使用


[https://lesscss.cn/usage/](https://lesscss.cn/usage/ "https://lesscss.cn/usage/")

小说阅读器项目中，使用了 less 语法，vscode 自动编译成 css 文件进行引入

如果项目需要使用，可以在 loader 中配置 less-loader 进行编译输出

   
## 0431 浏览器如何获取当前地址信息


BOM 中有一个地理位置的 API

navigator.geolocation.getCurrentPosition(onSuccess, onError, options) 可以获取当前的位置

参考 MDN：[https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation "https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation")

可以实时监听当前设备的位置，watchPosition() clearWatch() 对应的回调函数获取实时的位置

原理：浏览器获取设备的 GPS 定位信息，或者获取网络供应商 ISP 的位置。因为获取地理位置需要一定时间，所以函数是异步执行的，在回调函数中获取位置。

在《JavaScript权威指南》犀牛书 22章第一节中有详细使用介绍

```javascript
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

// 返回当前的经度纬度，定位精度（有些设别还有海拔和速度）
function success(pos) {
  var crd = pos.coords;
  console.log("Your current position is:");
  console.log("Latitude : " + crd.latitude);
  console.log("Longitude: " + crd.longitude);
  console.log("More or less " + crd.accuracy + " meters.");
}

function error(err) {
  console.warn("ERROR(" + err.code + "): " + err.message);
}

navigator.geolocation.getCurrentPosition(success, error, options);
```

实际问题：

某些设备无法获取位置：某些浏览器可能不支持，或者设置了不允许地理位置定位，那么需要改动浏览器配置信息才能获取到。通常手机上换几个浏览器，点击允许访问位置，可以获取到上面的信息。

这个在特定的功能会使用（例如根据当前位置，模拟打卡，或者地图选点）。

   
## 0433 常用的动画效果有哪些？


这里有动画效果：[https://enjoycss.com/1npo](https://enjoycss.com/1npo "https://enjoycss.com/1npo")

   
## 0436 如何设置夜间模式


可以直接使用CSS媒体查询 perfers-color-scheme 判断当前用户是否将系统的主体色设置成暗色或者亮色。属性：light dart no-perference 偏好。

```css
@media (perfers-color-scheme: light) {
  body {
    background-color: white;
  }
}
@media (perfers-color-scheme: dark) {
  body {
    background-color: black;
  }
}
@media (perfers-color-scheme: no-perference) {
  body {
    background-color: white;
  }
}
```

也可以使用 JS 进行媒体查询，然后设置全局属性，通过类名更改样式

```javascript
const mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')

if (mode && mode.matches) { 
  document.body.classList.add('dark'); 
}

// 监听主题切换事件 
mode && mode.addEventListener('change', e => { 
  if (e.matches) { 
    document.body.classList.add('dark-bg'); 
  } else { 
    document.body.classList.remove('dark-bg');  
  } 
});
```

参考：

[https://www.zhihu.com/question/437949548](https://www.zhihu.com/question/437949548 "https://www.zhihu.com/question/437949548")

[https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme "https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme")

[https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia "https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia")

   
## 0451 textarea 的高度自动变化


* 默认加载时，设置高度是固定的（100px）然后溢出不显示

* 点击编辑后，根据内容设置高度，然后设置溢出显示滚动条，这样方便编辑

缺陷：点击编辑后，外部整体的高度会被撑开，可能有其他的问题

这里也可以参考 react-textarea 这个库，实现一部分样式

​

   
## 0483 如何实现显示省略号


<img src="https://cloud.seatable.cn/workspace/32/asset/e82c7317-556e-45c4-8b5d-092331cd8977/images/auto-upload/image-1720493831869.png" alt="undefined" title="undefined" width="627" height="150" />

需求1：如何实现名字很长，1行显示，结尾显示省略号？

```css
.text-ellipsis {
    width: 100px; /* 设置宽度 */
    height: 30px; /* 设置高度 */
    line-height: 30px; /* 设置行高，‌确保文本垂直居中 */
    overflow: hidden; /* 隐藏超出部分 */
    white-space: nowrap; /* 防止换行 */
    text-overflow: ellipsis; /* 显示省略号 */
}
```

需求2：如何实现名字很长，2行显示，结尾显示省略号？

-webkit-line-clamp: 2; 垂直显示2行

```css
.ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word; /* 确保长单词或URL能够正确换行 */
}
```

需求3：如何实现名字很长，中间显示省略号？这里使用 JS 实现效果

```javascript
let text = 'asdfghjkl999999999999999999999999.pdf';
if (text.length > 5) {
    text = text.slice(0, 5) + '...' + text.slice(-5); // 截断字符串，中间添加省略号
}
// 'asdfg...9.pdf'
```

需求4：如何实现文件含有标签，名字较长时，中间显示省略号？

容器总宽度= 文件标签宽度 + 文件名宽度

文件名 = 文件名前半部分 + 省略号 + 文件名后半部分

css 设置显示两行

```css
.container {
  display: inline-block;
  max-width: 100%;
  /* 这里 N 行文本的高度 */
  height: 34px;
}

.tags {
    display: inline-block;
}

.file-name {
  display: inline-block;
  -webkit-box-orient: vertical; /* 内部纵向排列 */
  word-wrap: break-word;
}
```

JS 计算省略号的位置和新名称

```javascript
// 给定文件名和字体字号，计算实际显示的宽度（计算文件名实际的长度，大量使用存在性能问题）  
getTextRenderWidth = (text, font) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font || '14px Arial';
    const metrics = context.measureText(text);
    return metrics.width;
  };

// 给定文件名，计算渲染后的文件名
// 例如：格点模式下文字应该占据两行方案.txt，返回 格点模式下文字...方案.txt
  getRenderedText = (dirent) => {
    // 这里获取容器的宽度 * 2，如果是N行文本，那么就是宽度 * N
    const containerWidth = 230;
    
    // 计算文件标签占用的宽度（每一个是 16px, 左右之间重叠 8px）
    let tagRenderWidth = 0;
    if (dirent.file_tags && dirent.file_tags.length > 0) {
      if (dirent.file_tags.length === 1) {
        tagRenderWidth = 16;
      } else {
        tagRenderWidth = 16 + (dirent.file_tags.length - 1) * 8;
      }
    }
    
    // 计算实际文件名的最大宽度 = 容器宽度 - 标签宽度
    let remainWidth = containerWidth - tagRenderWidth;

    // 计算文件名全部渲染后的长度
    let nameRenderWidth = this.getTextRenderWidth(dirent.name);
    let showName = '';
    
    // 如果文件名实际渲染后的长度，大于容器宽度，那么显示省略号
    if (nameRenderWidth > remainWidth) {
      
      // 需求是：省略号位于中间（后面有两个文字+文件后缀），那么可以计算文件后缀的位置，然后计算后面的名字，和前面的名字
      let dotIndex = dirent.name.lastIndexOf('.');
      let frontName = dirent.name.slice(0, dotIndex - 2);
      let backName = dirent.name.slice(dotIndex - 2);
        
      // 后面的名称是文件后缀名，通常是 2-5个英文，.c .cpp .xmind 很少出现特别长的文件名，所以这里完全显示（不考虑自定义的极端后缀名）

      // 计算后缀前面显示几个字符，如果是英文宽度是1，中文宽度是2，那么这里要求最后的英文数量不超过20，中文数量不超过10，这是经验值
      //（理论上可以循环中计算每一个子字符串的渲染后的长度，但是性能不好）
      let sum = 0;
      for (let i = 0; i < frontName.length; i++) {
        // Use charCodeAt(i) > 127 to check Chinese and English.
        // English and symbols occupy 1 position, Chinese and others occupy 2 positions.
        frontName.charCodeAt(i) > 127 ? (sum = sum + 2 ) : (sum = sum + 1);
        // When sum position exceeds 20, back string will not be displayed.
        if (sum > 20) {
          frontName = frontName.slice(0, i) + '...';
          break;
        }
      }
      // 最后就是 前10个汉字（或者前20个字母）+ 省略号 + 后两个字符 + 文件后缀名
      showName = frontName + backName;
    } else {
      showName = dirent.name;
    }
    return showName;
  };
```

​

  