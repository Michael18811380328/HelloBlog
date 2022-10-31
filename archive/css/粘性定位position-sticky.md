# css粘性定位position：sticky

前言：position:sticky是css定位新增属性；可以说是相对定位relative和固定定位fixed的结合；它主要用在对scroll事件的监听上；简单来说，在滑动过程中，某个元素距离其父元素的距离达到sticky粘性定位的要求时(比如top：100px)；position:sticky这时的效果相当于fixed定位，固定到适当位置。

简述：默认是relative定位，达到某个条件时，fixed固定定位。

设置position:sticky同时给一个(top,bottom,right,left)之一即可

~~~css
#sticky-nav {
  position : sticky ;
  top : 100px ;
}
~~~

使用条件：
1、父元素不能overflow:hidden或者overflow:auto属性。

2、必须指定top、bottom、left、right4个值之一，否则只会处于相对定位

3、父元素的高度不能低于sticky元素的高度

4、sticky元素仅在其父元素内生效

例子：粘性的Nav。界面默认开始时处于相对定位。当这个元素滚动到top是100px的时候（页面顶部），就粘性固定定位到顶部。

css代码：

~~~css
html body {
  height: 100vh;
  width: 100%
}

h1 {
  height: 200px;
  position: relative;
  background-color: lightblue;
}

h1:after {
  content: '';
  position: absolute;
  top: 100px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: red;
}

#sticky-nav {
  position: sticky;
  /*position: absolute;*
  left: 0;*/
  top: 100px;
  width: 100%;
  height: 80px;
  background-color: yellowgreen;
}

.scroll-container {
  height: 600px;
  width: 100%;
  background-color: lightgrey;
}
~~~


html代码：

~~~html
<h1>高200px;距顶部100px</h1>
<div id="sticky-nav">这是一个tab切换栏，给sticky定位top=100px</div>
<p class="scroll-container">发生滚动</p>
<p class="scroll-container" style="background:lightgoldenrodyellow;">发生滚动</p>
~~~
项目中遇到的坑：

先来看看各大内核对position:sticky的支持情况

安卓端不支持这个属性，慎重使用

问题描述：
在一个小程序开发项目中；tabs组件使用了粘性定位，其中有tab栏的切换；tab栏底部是大段列表内容list-container内容的展示；其中展示内容有click事件(或者说是touch事件);ios以及pc浏览器中对点击的测试是正常的；但在安卓手机中！！！！我的天，点击穿透了！！并且，尝试去掉list-container中的item的点击跳转，发现tab切换的点击没有了反应，事件消失了！！！

设置断点，查看事件流的走向：首先事件捕获-->目标节点tab-->事件冒泡；这个泡居然冒到了container-list中的item。。。简直噩梦
大致的项目结构：

html结构：

~~~html
<div class="service-wrap">
  <tab>这是tab切换</tab>
  <div class="list-container">
    <!--for循环有很多item-->
    <item></item>
    <item></item>
  </div>
</div>
~~~

解决办法：
1.在使用组件库的tab时，外层套一个div，防止点击穿透和不正常的事件流走向，或者（一个治标不治本的方法，具体看业务场景）

2.组件库的样式无法改，sticky作为tab组件的行内样式，因为我使用这个tab时是直接在viewpoint的顶部的，这是完全可以用fixed达到效果。我在调用类的外部设置了position:fixed !import；样式最高优先级去覆盖了组件库中的定位样式，就正常了。

一点想法：

position:sticky对安卓的兼容简直让人想哭，目前手机端的用户非常多，要做到兼顾，由于安卓系统对sticky粘性定位的惨淡支持；如果业务场景可以用其它定位解决，那就还是不要用sticky吧。。。。留下心酸的泪水。。。。

原文链接：https://blog.csdn.net/qq_35585701/article/details/81040901

