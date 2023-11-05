### JQ 第一天 选择器

#### 1. JQ 介绍

##### 1.1 JQ 概述

JQuery 是 JavaScript 的一个库 library，DOM、事件处理、动画、Ajax 等更便捷（有一个容易使用的 API），兼容多浏览器。学会使用 jQuery，掌握常用 API，使用 jQuery 实现常用的效果，匿名函数自调用熟练使用。

JavaScript 缺点：代码多，寻找对象不方便；兼容性问题；实现简单的动画效果很麻烦（animate）；JS 注册事件会被覆盖，add Event listener 可以让事件不覆盖，存在兼容性问题。

jQuery 版本：整体上分为 1-2-3 版本；1 版本兼容 ie 6-8（下载 jQuery1 最后版本即可使用）百度京东都使用 jQuery；淘宝国内前端最牛（自己的框架）。

jQuery 分类：分为未压缩和压缩版本：学习编写代码时使用未压缩版本，实际工作中使用压缩版本（节省流量）。未压缩版本包含注释等，和压缩版本功能操作完全相同。

##### 1.2 JQ 优点

实现盒子消失事件，内部文字更改 JS 代码：

```html
<body>
  <input type="button" id="btn1" value="start" />
  <input type="button" id="btn2" value="word" />
  <div></div>
  <div></div>
  <div></div>
  <script>
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var divs = document.getElementsByTagName("div");
    btn1.onclick = function () {
      for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = "block";
        // div预设为none（隐藏）按钮触发事件——显示div
      }
    };
    btn2.onclick = function () {
      for (var j = 0; j < divs.length; j++) {
        divs[j].innerText = "MineCrift";
      }
    };
  </script>
  <!-- 出现的问题：getElementsByTagName 是复数elements。
	参数i与j正确使用。非参数（style）使用“block”表示 
  	在JS中，如果部分代码不严格（缺少分号或者引号）仍然可以执行，对自己的要求：严格规范代码，日常不管是打字还是写代码，在完全正确的基础上再提高速度。-->
</body>
```

jQuery 优点：

​ 不使用 for 循环（隐式迭代：自动后台遍历对象，不需要操作者遍历）；

​ 找对象方便（标签-类-ID，选择器很多）；

​ 兼容性很好（版本 1 兼容 ie 早期浏览器）；

​ 注册事件不会覆盖（一个按钮两个事件）；

​ 动画效果很好实现（show(time);）动画效果很多（支持自定义动画）。

```javascript
//入口函数第一种写法
$(document).ready(function () {
  $("#btn1").click(function () {
    $("div").show(1000);
  });
  $("#btn2").click(function () {
    $("div").text("hello");
  });
});
```

##### 1.3 入口函数

入口函数：确保页面加载完毕后，执行代码。

JS 入口函数：window.onload = function () {代码块}； 如果 JS 代码放在内容之前使用入口函数。

jQuery 入口函数：

第一种写法（上）

第二种如下：$(function() { 程序块 } );

JS 入口函数比 jQuery 函数执行慢：（JS 入口函数等待页面全部内容加载完毕才执行，JQ 入口函数等页面中的文字部分加载完毕就执行，页面中的图片可以慢慢加载）。

##### 1.4 JQ 对象

DOM 对象：使用 JavaScript 获得的对象就是 JavaScript 对象（DOM 对象）

JQ 对象：使用 jQuery 获得的对象就是 JQ 对象（$("div")）

```javascript
var $div = $("div");
// $div就是一个变量，使用$说明是一个JQ对象
```

JQ 对象是 JS 对象的一个集合，是一个伪数组，里面存放了很多 JS 对象。DOM 对象需要一个一个去操作（遍历），JQ 对象直接操作 DOM 的集合，增添新的方法。

JQ 的方法和 JS 的方法不能互相使用（使用 jQuery 将 JS 代码封装，封装后的方法和之前的方法是不一样）。JQ 对象是一个伪数组，如果取出伪数组中的某个对象（$var[0]）就是一个 DOM 对象，就可以使用 DOM 对象的方法。伪数组——没有数组的方法，有 JQ 自己的方法（类似数组可以取出元素）

```javascript
var $div = $("div");
$div[0].setAttribute("name", "Mike");
//将伪数组（JQ对象）中第一项（DOM objecy）取出，就可以使用DOM的setAttribute()方法。
```

DOM 对象转化为 JQ 对象：用钱包起来

```javascript
var cloth = document.getElementById("clothes");
//cloth当前是一个DOM对象
$(cloth).text("hello");
//$（cloth）转化为JQ对象，具有JQ的方法。
```

JQ 对象转化为 JS 对象：直接用伪数组的方法，取出伪数组中的第 n 个元素；也可以调用 get（n）方法；这两个对象及不同的方法不能混淆。

##### 1.5 $符号

$就是一个函数（使用 typeof 查看）

$ == jQuery——有三个用途：

```javascript
// $+function：入口函数
$(function () {
  codes;
});

// $+object :将DOM对象转化为JQ对象
$(this);

// $+标签（标签、类、ID索引）寻找某类某个对象
$("div");
```

#### 2. JQ 选择器

##### 2.1 通用选择器

jQuery 选择器与 CSS 选择器通用（交集、并集、子代、后代选择器等）

并集：逗号隔开；

交集：无间隔；

子代：大于号；

后代：直接一个空格。

##### 2.2 过滤选择器

（JQ 中特有的选择器）类似于伪类选择器：

```javascript
$("div:first") ===选择第一个元素
first last even odd
eq(参数) gt(参数) lt(参数)
eq等于 gt大于 lt小于 这里指的是伪数组的下标（从0开始）
```

表单选择器

伪类选择器

表单对象属性选择器：enabled disabled（不可选择不可点击） checked（多选） selected 单选；

$("div:disabled")

##### 2.3 筛选选择器

```javascript
筛选选择器类似于方法：
$("div")
children("li") 子类选择器
find("li");后代选择器
siblings("li");查找兄弟节点（不包括自己）
parent();查找父亲
eq(2);查找下标为2的对象
next()找下一个兄弟
prev()找上一个兄弟
```

适用于在匿名函数中，用 this 作为指针，之后使用筛选选择器的方法查找对象。

##### 2.4 链式编程

在 jQuery 中 JQ 方法可以一直使用下去（使用一个方法，返回的还是 JQ 对象）

```javascript
$(this).next().slideDown(200).parent().siblings().children("div").slideUp(200);
this是一个JQ对象
JQ的邻近对象向下滑动；临近对象的父亲的兄弟的儿子中的div向上滑动。（this和div是堂兄弟）
this是一个JQ对象，不用加入引号；div是寻找的一个标签，需要加入引号。
```

##### 2.5 练习

案例 1：下拉菜单的制作：onmouseover 显示菜单

JQuery**事件特殊性**：JS 中 on mouse over 和 on mouse out 事件作用于对象及其后代元素；在 JQ 中，使用 on mouse enter 和 on mouse leave 事件，只作用于这个对象，当鼠标经过后代元素不会触发事件。

在 JS 中 on mouse enter 和 on mouse leave 部分浏览器不兼容。当用户经过一级菜单，会触发二级菜单显示；当用户经过一级菜单下面的二级菜单，事件不会重复发生。这两个事件是对应使用的。

案例 2：手风琴垂直案例（四个 ul 下各有 li，当鼠标经过 ul 显示对应的 li，其他的 li 隐藏）

案例 3：淘宝案例（中间 16 个图，四周 16 个文字描述，使用鼠标经过移除，设置图片隐藏显示）

注意：jQuery 不会报错！！所以代码写的一定要仔细。以后尽量避免写中文注释（中文输入法可能制造错误）。

大部分错误是找不到对象，对象是否添加引号，JS 对象还是 JQ 对象的问题（JS 方法还是 JQ 方法）。命名 class、ID、$注意规范性和逻辑性（如果面对大网站各种标签类别索引满天飞，寻找更需要细心）

事件没有注册（function 不规范）或者链式编程语句出现问题。中间使用 console.log 或者 alert 进行调试（或者打断点）。查看 jQuery 对象的长度（伪数组）是否和预期一致。如果找不到对象，那么还是新建一个长度为 0 的 JQ 对象，方法仍然成立，所以不会报错。DOM 事件操作不熟悉，现在进展有点 bug。

```html
JQ方法： hide(time); show(time); text("word");
设置样式：css("样式名称","属性值") css("backgroundColor","pink");
$("div").css("backgroundColor","red");
index（）；返回当前元素在所有兄弟元素（伪数组）中的索引，可以查看某个li在整体上排列次序
```

### JQ 第二天 常见方法

JQ 操作：属性，样式，动画，节点等（10 个常用方法，20 个一般方法）

##### 2.1 样式操作

###### 2.1.1 CSS 操作

修改单个样式：.css("name","value");

修改多个样式：.css({name1:value1; name2:value2;}); 选择一个对象

获取样式（字体大小）：.css("name");

注意：获取样式中，如果有多个对象样式不一致，获取的样式是第一个对象的样式（默认所有对象的样式一样，增加样式隐式迭代）。

###### 2.1.2 class 操作

新加一个类：.addClass("name");

​ 批量修改样式（预设类样式，在选定的元素中加入样式，改变选中对象的样式）；新加类不会改变预设类；

```javascript
$("input")
  .eq(1)
  .click(function () {
    $("li").addClass("basic");
  });
//注册事件：单击第一个按钮，给li添加basic类别
//如果添加多个类，不同类的样式有所区别，实际的样式按照CSS优先级进行判断。如果优先级一致，先加入的类中的样式是最后的样式。
```

减少一个类：removeClass("name");

判断类别有无：hasClass("name");

​ 判断某个对象是否存在一个类（返回 boolean 值），如果存在则进行下一步操作。

切换类别：toggleClass("name");

​ 判断一个对象是否存在一个类，如果有就删除，如果没有就添加类别。

```html
<head>
	<style>
	.firstnumber {
		background-color: red;
	}
	</style>
</head>
<body>
	<ul>
		<li>A</li>
		<li>B</li>
		<li>C</li>
		<li>D</li>
	</ul>
	<p>E</p>
	<p>F</p>
	<input type="button" value="press">
	<script src="jQuery/jquery-1.12.4.min.js"></script>
	<script>
		//选择P增加类，改变样式
		$(function(){
			$("p").addClass("firstnumber");
		});
		//通过按钮事件，切换类，切换样式
		$("input").click(function (){
			$("p").toggleClass("firstnumber");
		});
		//选择标签改变样式
		$("li").eq(0).css("color","red");
		//选择标签输出样式
		console.log($("li").eq(3).css("fontSize"));
	</script>
</body>
</html>
```

###### 2.1.3 TAB 栏练习

要点：创建事件-选择的对象添加类，兄弟对象移除类；

```html
<script>
  $(function () {
    //窗口函数
    $("li").mouseenter(function () {
      //注册鼠标进入事件
      $(this).addClass("liout").siblings().removeClass("liout");
      //当前对象增加类，兄弟对象移除类
      var inx = $(this).index();
      //提取当前索引
      $("div").eq(inx).addClass("in").siblings().removeClass("in");
      //对应索引的div改变样式
    });
  });
</script>
```

##### 2.2 属性操作

###### 2.2.1 attr 操作

方法的语法类似于改变 css（attr 改变属性值）

改变单个属性：.attr("name","value");

改变多个属性：.attr（{object}）;

​ object 格式：name:value, name2, value2;

查询属性：.attr("name");~~~

```html
案例：练习改变图片的样式（改变title，alt，src）——美女相册
1.调用jQuery，给定入口函数。 2.注册鼠标点击事件。
3.鼠标点击后更改图片的src（将a中href给到src中）
4.鼠标点击后更改文本内容（将a中title给到text中）
5.return：false；取消a标签超链接属性
```

###### 2.2.2 prop 方法操作

对于部分属性值为 boolean 的情况，使用 attr 获取改变属性可能出现 bug（jQuery 自带 bug）；此时使用 prop 方法获取改变 boolean 属性值，具体语法与 attr 语法类似。主要对象是表单中的 checked/selected/disabled 等属性。

##### 2.3 动画操作

###### 2.3.1 默认动画

三组默认动画效果：参数为时间（1000ms）或文本（fast-slow-normal），常用时间作为参数。

​ 显示隐藏：hide()-show()（如果不加入参数，不会显示动画效果）

​ 滑入划出：slideDown -slideUp -slideToggle（切换滑入划出效果）——导航栏菜单动画效果

​ 淡入淡出：fadeIn、fadeOut、fadeToggle（常用）——京东轮播图动画效果

```javascript
案例：京东轮播图jQuery实现
1.分析动画：点击左右按钮，某个图片显示，其他图片隐藏。点击下方原点对应图片隐藏显示。设置小圆点a增加不同的src参数，给定默认first-child显示（display：hidden）block；
2.点击左右按钮，下一个或者上一个图片显示。当已经到达边界点，使用if判断（if index == 7）{index = 0；}。使用$("li").eq(index).fadeIn().siblings().fadeOut();
3.点击圆点，传入圆点的this指针，将此图片的位置获取，index（），对应的图片显示，其他图片不显示。
```

###### 2.3.2 自定义动画

animate（）；四个参数（第一个必须有）

​ 参数 1：{width：“800px” } 传入变化的效果，引号可以有可以没有。

​ 参数 2：2000（ms）动画时间

​ 参数 3：执行效果：默认 swing（秋千），linear

​ 参数 4：回调函数（动画执行完执行函数）

```javascript
案例：手风琴（横向）jQuery效果
1.当鼠标经过某个对象，使用动画效果实现宽度变化，其他siblings宽度减小。
2.鼠标退出这个对象，所有的对象的宽度都恢复默认值（mouseenter——mouseleave)
```

###### 2.3.3 动画队列

当某一个对象执行多个动画，每个动画都有自己的时间并依次执行（动画队列）。

如果前一个效果没有执行完，后一个不开始执行效果（类似于链式编程）。

好处：动画先后顺序不会打乱。

坏处：当用户频繁创建事件执行动画，前期动画没有及时停下来很麻烦。

###### 2.3.4 停止动画

stop（）；执行后所有动画停止，放在即将执行的一个动画前。

$("div").stop().slideDown(1000); 停止之前所有动画，开始执行滑入动画。

stop 有两个参数（了解）：清除动画队列；是否跳转到动画最后的效果。

###### 2.3.5 H5 新操作

注意：音频视频是 H5 内容，JQ 部分不支持。使用 get（attribute）获得标签的属性。

```javascript
var index = $(this).index();
$("video").get(index).load();
$("video").get(index).play();
```

##### 2.4 节点操作

使用 JS 动态创建节点（并添加属性）较复杂

```javascript
var div = getElementsByTagName("div");
var a = createElement();
div.appendChild(a);
a.setAttribute("href","www.taobao.com");
a.innerHTML = "淘宝网链接"；
```

###### 2.4.1 创建节点

创建 JQ 对象

```javascript
var $li = $("<www.baidu.com>");
```

###### 2.4.2 添加节点

将 JQ 对象添加到已知元素中

A.append（B）;在 A 对象的子元素后面加入 B

A.appendTo（B）；在 B 对象的子元素后面加入 A

A.prepend（B）；在 A 对象的子元素前面加入 B

A.prependTo（B）；在 B 对象的子元素前面加入 A

A.after（B）；把 B 添加到 A 元素之后

A.before（B）；把 B 添加到 A 元素之前

```html
案例：城市选择
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      select {
        width: 100px;
      }
    </style>
  </head>
  <body>
    <h1>城市列表</h1>
    <select name="src-city" id="city-before" multiple size="3">
      <option value="1">Tokyo</option>
      <option value="2">Beijing</option>
      <option value="3">London</option>
    </select>
    <div>
      <button id="btn1">&gt;&gt;</button>
      <button id="btn2">&lt;&lt;</button>
      <button id="btn3">&gt;</button>
      <button id="btn4">&lt;</button>
    </div>
    <br />
    <select name="end-city" id="city-after" multiple size="3"></select>
    <script src="jQuery/jquery-1.12.4.min.js"></script>

    <script>
      //将选框1全部option放到2中
      $(function () {
        $("#btn1").click(function () {
          $("#city-before>option").appendTo("#city-after");
        });
      });
      //将选框2全部option放到1中
      $(function () {
        $("#btn2").click(function () {
          $("#city-after>option").appendTo("#city-before");
        });
      });
      //将选框1中选中的部分放到2中
      $(function () {
        $("#btn3").click(function () {
          $("#city-before>option:selected").appendTo("#city-after");
        });
      });
      //将选框2中选中的部分放到1中
      $(function () {
        $("#btn4").click(function () {
          $("#city-after>option:selected").appendTo("#city-before");
        });
      });
    </script>
  </body>
</html>
```

###### 2.4.3 清空节点

.empty(); 清空节点内部文字（innerHTML = “ ”；）。

###### 2.4.4 删除节点

.remove( )；

###### 2.4.5 克隆节点

.clone( )；克隆事件是深复制（将内部参数和节点都复制）（复制节点）

参数：true 可以复制内部的事件；false 不可以复制内部的事件 默认是 false

```html
弹幕练习
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      div {
        width: 1000px;
        position: relative;
        margin: 0 auto;
      }
      ul {
        list-style: none;
        position: absolute;
        float: left;
        text-decoration: none;
      }
      video {
        position: absolute;
        float: left;
      }
      ul {
        font-size: 30px;
        color: white;
      }
      h1 {
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h1>视频弹幕</h1>
    <nav>
      <div>
        <video src="video/1.mp4" controls autoplay></video>
        <ul id="ul">
          <li></li>
        </ul>
      </div>
    </nav>
    <input type="text" id="txt" />
    <input type="button" id="btn" value="发送弹幕" />

    <script src="jQuery/jquery-1.12.4.min.js"></script>
    <script>
      $(function () {
        $("#btn").click(function () {
          if ($("#txt").val().trim().length == 0) {
            return;
          }
          $("<li></li>").text($("#txt").val()).prependTo("#ul");
          $("#txt").val("");
        });
      });
    </script>
  </body>
</html>
```

### JQ 第三天 事件

#### 1.特殊方法

##### 1.1 val

获取 value 属性（input 标签中）。使用 attr 获取属性也可以，使用 val 更合适。后面添加参数可以改变 value 的属性值（textarea 的属性也可以使用此方法）。focus 文本框获得焦点；blur 文本框失去焦点。

```javascript
$("#txt").focus(function() {
  if ($(this).val() === "ABC") {
    $(this).val() = "";
  } else{
    $(this).val() = "ABC";
  }
});
//当文本框获取焦点执行函数：当文本框内容是ABC时，将文本框内容清空；否则文本框内部填入ABC字符串。
```

##### 1.2 html 和 text

html（）；获取子标签及内容 = innerHTML

text（）；获取内容 = innerText（注意 innerText 对于低版本火狐不兼容）

##### 1.3 width 和 height

直接获得对象的宽度和高度——通常获取当前窗口的宽度高度

使用.css("width") 方法可以获得 width，结果是字符串“200px”；

使用.width 方法结果是数值：200（更便捷）（height 同理）

```javascript
$(window).resize(function (){
  cosole.log($(window).width);
});
//当窗口发生变化就执行函数（window是一个对象，不需要加引号）
//如果对象是div，只计算width，不包括padding、margin、border的宽度。
	.innerWidth()计算padding+width
	.outerWidth()计算padding+width+border
	.outerWidth(true) 计算Padding+margin+border+width
后三种情况通常不使用。
```

##### 1.4 scrollTop 和 scrollLeft

卷曲的高度和宽度（滚动栏移动的宽度和高度）

```javascript
//案例：header栏固定定位
$(function() {
		$(window).scroll(function() {
				if ($(window).scrollTop（） > $(".top").height() + 10) {
					$(".nav").addClass("fixed");
					$(".main").css("margin-top",$('#nav').height() + 10);
				} else {
					$(".nav").removeClass("fixed");
					$(".main").css("margin-top",10);
				}
		});
});
// 当滚动栏滚动事件发生执行函数，当卷曲的高度大于.top的高度时。给导航栏固定定位，同时给主页增加margin-top属性
```

##### 1.5 offSet 和 position

offset：计算对象相对于 document 的位置；

position：计算对象相对于父元素（子绝父相）的位置（使用多）

输出结果是一个对象（可以查看 width 和 height 属性）

$("span").position().left

#### 2.JQ 事件

##### 2.1 delegate 事件注册

​ 事件注册-解绑-触发等（了解）

​ 早期使用 bind 方法，多个事件可以执行同一个动作（在老代码中可能出现）。缺点：方法对于已有对象有效，对于新加的对象没有效果。

​ delegate：委托事件：给父元素注册事件（div），最终由父元素的子元素执行（p）。对于新增元素也可以使用。通常自己执行的事件属于简单事件（click）

​ $("div").delegate("p","click",function(){};)

​ 参数：执行对象，事件类型；执行函数。

​ （点击 p 标签-事件冒泡到 div 标签-div 执行委托事件-p 执行事件）

​ 好处：动态创建的对象可以响应事件；如果子元素很多，统一放在父元素上执行；缺点：delegate 只能执行委托事件，不能执行简单事件，不能自己注册事件。

##### 2.2 on 事件注册

**on 方法**——重点

on 方法可以处理简单事件和委托事件

```
简单事件：on("click",function())
委托事件：on ("click","p",function (){};)——相当于bind和delegate方法组合
<div><p>案例</p></div>

事件执行顺序：首先执行对象自己的事件（p）执行div委托事件（div-p）执行div的事件（冒泡效果）

表格案例：点击按钮：删除表格全部；删除一列数据；增加一列数据。
删除一列数据：$(this).parent().parent().remove();
```

##### 2.3 off 移除事件

解绑事件-移除事件——off 方法

.off("mouseenter"); 如果填写参数表示移除某个事件，如果不填写参数表示全部移除事件。

触发事件：.trigger(); 相当于 click（）；

```javascript
$("p").trigger("click");
```

事件机制：on——off——trigger。

##### 2.4 JQ 事件对象

类似于 JS 事件对象（DOM event），对 JS 进行封装。

```txt
事件对象：事件的状态：（鼠标、键盘、按钮的状态）
x = event.clientX;
y = event.clientY;
事件发生时，获取鼠标的位置（事件是点击鼠标）
<body onmousedown="function(){};">
```

JQ 事件对象（对于不同浏览器兼容很好）：

```javascript
screenX 距离屏幕原点的相对位置（左上角）
clientX 距离页面左上角的位置（忽略滚动条）
pageX 距离页面顶端的左上角位置（包含滚动条）

event.keycode 按下键盘代码
event.data 存储绑定事件时传递的附加数据

event.data 在on方法中使用。on（）；有四个参数，分别是事件名称（click）；执行对象（p）；传输对象（var）；回调函数（function（e））；
$("div").on("click","p",var, function(e){
  console.log(e.data);
  //获取传入参数的具体数据，var是实参，e是形参；实际上很少用；
});
```

#### 3.特殊事件

##### 3.1 阻止事件冒泡

return false； 阻止事件冒泡；阻止浏览器的默认行为；

event.preventDefault(); 阻止传入浏览器的默认行为（跳转网页）

event.stopPropagation();阻止事件冒泡（事件从下到上依次发生）

##### 3.2 节流阀

keydown 的 bug：按住按键不放就会一直触发事件，使用节流阀处理（按键不返回原始值不会下一次触发）

```javascript
var flag = true;
function1 (){
  if (flag){
    代码执行
    flag = false;
  }
}
function2 (){
  取消代码执行
  flag = true;
}
```

##### 3.3 delay

动画暂停效果：

```javascript
.slide(300).delay(800).fadeIn(400);
//动画延迟执行效果（用在提示框中，用户看到3秒后提示框消失）
```

##### 3.4 链式编程

方法返回 JQ 对象后才能继续执行链式编程；通常情况下，设置性操作可以实行链式编程；获得性操作不可以实行链式编程（获得属性的名称）通过返回值判断能都进行链式编程。

##### 3.5 淘宝好评练习

要求：鼠标经过五角星改变成实心五角星，当鼠标移出五角星恢复为空心五角星，当点击五角星，五角星变色，而且一直保持不变。使用文字就可以表现实心五角星和空心五角星。
prevAll 前面所有兄弟；nextAll 后面所有兄弟；鼠标单击后加入类。

```html
<body>
  <div>
    <ul id="txt">
      <li>☆</li>
      <li>☆</li>
      <li>☆</li>
      <li>☆</li>
      <li>☆</li>
    </ul>
  </div>
  <script src="jQuery/jquery-1.12.4.min.js"></script>
  <script>
    // 定义内容（实心和空心五角星）
    var shixin = "★";
    var kongxin = "☆";
    console.log(shixin + kongxin); //测试五角星显示情况
    // 1.鼠标经过文字，当前文字及之前文字改变为实心，后面的兄弟改变为空心。
    $(function () {
      $("li").on("mouseenter", function () {
        $(this).text(shixin).prevAll().text(shixin);
        $(this).nextAll().text(kongxin);
      });
    });
    // 2.鼠标离开文字，所有文字变成空心。
    $(function () {
      $("ul").on("mouseleave", function () {
        $("li").text(kongxin);
        $("li.current").text(shixin).prevAll().text(shixin);
        $("li.current").nextAll().text(kongxin);
      });
    });
    // 3.鼠标单击某个文字，增加类（这个类之前的文字变成实心）
    $(function () {
      $("li").on("click", function () {
        $(this).addClass("current").siblings().removeClass();
      });
    });
    //这串代码完全是自己写出来的，没有参考任何笔记。自己的jquery学的很灵活！加油！
  </script>
</body>
```

##### 3.6 end 方法

end（）；方法应用于链式编程中间，可以返回开始的 JQ 对象；如果分开写逻辑更清楚。
each（）；显示迭代
案例：设置 10 个不同透明度的盒子

```javascript
// 传统方法：for循环
for (var i = 1; i < $("li").length; i++)
  $("li").eq(i).css("opacity", "(i+1)/10");
```

```javascript
//each 方法：
$("li").each(function (index, element) {
  $(element).css("opacity", "(index+1)/10");
});
```

遍历 JQ 对象，使用 for 循环或者 each 方法。

##### 3.7 $冲突

如果其他框架中的$与JavaScript中冲突，将JS应用JQ的代码放在后边，释放控制权。
var $$ = $.noConflict();
使用$$作为$的代替品即可
如果直接使用 jQuery 也可以实现$的功能。

##### 3.8 练习

练习：固定导航栏

```javascript
$(function () {
  $(window).scroll(function () {
    if ($(window).scrollTop > $(".top").height() + 10) {
      $(".nav").addClass("fixed");
      $(".main").css("margin-top", $("#nav").height() + 10);
    } else {
      $(".nav").removeClass("fixed");
      $(".main").css("margin-top", 10);
    }
  });
});
```

练习：事件对象

```javascript
function down(event) {
  var x = event.clientX;
  var y = event.clientY;
  console.log(x);
  console.log(y);
  var a = event.screenX;
  var b = event.screenY;
  console.log(a);
  console.log(b);
}
```

### JQ 第四天 插件原型

#### 1.插件

插件：将一部分功能封装起来使得 JQ 更灵活使用。调用 jQuery，调用插件，在函数中使用插件中的方法。

##### 1.1 color 插件

JQ 自身不支持颜色变化，使用 color 插件（16 进制颜色）

##### 1.2 lazy-load 插件

对于长网页（电商界面，4000px），向下滚动后加载图片，可以节省时间。通常放在 HTML 代码后面。

第一步：加载 JQ 库及 lazy-load 插件

第二步：将 HTML 中图片代码中 src 改成 data-original，路径保持不变，在图片中统一添加类

第三步：在 JQ 中 $(".lazy").lazyload(); 即可执行

##### 1.3 UI 插件

通常使用 bootstrap 完成，部分公司也使用 UI 插件完成。UI 插件功能强大，网站有具体介绍。

第一步：引入 JQ 库，引入 JQ.UI.js 和 JQ.UI.css（link href-url）

​ 可拖动效果：$("div").draggable({handle:"p"})；

​ 可排序效果：针对父元素 ul 设置，子元素 li 可以排序；opacity：0.3；

​ 边框可改变：Resizable：({handle:e s}) 东部南部边框可以改动

##### 1.4 WS 风格包

附加：webstrom 风格改变

#### 2.原型

一个对象的方法并不在对象中，而在对象的原型中。如果对象具有某个方法，直接使用；如果对象没有这个方法，就在原型链上寻找这个方法（或者属性）。

Array.prototype.sayHi = function () { };

同理，JQ 对象在原型上也可以加入方法（自定义方法）不推荐直接更改对象的原型

jQuery.prototype.sayHi = function () { };

$.fn.sayHi = function() {};

如果需要链式编程，在封装时候设置 return this；原型中的 this 就是这个对象。

#### 3.练习

手风琴案例封装插件

传入参数：手风琴的颜色（一个数组），手风琴的宽度（width）

定义入口函数——参数合理性检验——寻找对象——注册事件

如果用户预设背景为商店 banner，传入的数组是空数组，也有手风琴的效果。

color = color || [ ];

width = width || 0;

手风琴常规：

```javascript
$(function () {
  // 1给定li背景颜色
  var colors = ["red", "blue", "yellow", "green", "purple"];
  console.log($(colors));
  var $li = $("#cor-ul li");

  $li.each(function (index, e) {
    $(e).css("backgroundColor", colors[index]);
  });
  // 2注册鼠标经过事件
  $li.mouseenter(function () {
    $(this)
      .stop()
      .animate({ width: 800 })
      .$(this)
      .siblings()
      .stop()
      .animate({ width: 100 });
  });
  // 3注册鼠标移除事件
  $li.mouseleave(function () {
    $li.stop().animate({ width: 240 });
  });
  // 4封装（参数）
});
```

手风琴封装函数：

```javascript
		$(function(){
			// 1给定li背景颜色
			var colors = ["red","blue","yellow","green","purple"];

			$.fn.accordion = function(array,widths){
				//array是颜色数组，widths是每一个琴键的宽度
				//计算大琴键的宽度
				var $maxwidth = 1200-widths*(array.length-1);
				console.log($maxwidth);

				//使用each方法进行遍历（不同下标使用不同数组颜色）
				$(this).each(function(index,e){
					$(e).css("backgroundColor",array[index]);
				});
				// 2注册鼠标经过事件
				$(this).mouseenter(function (){
					$(this).stop().animate({width:$maxwidth})；
					$(this).siblings().stop().animate({width:widths});
				});
				// 3注册鼠标移除事件
				$(this).mouseleave(function (){
					$("li").stop().animate({width:240});
				});
				// 4封装（参数）
			};
			// 5 执行封装函数
			$("#cor-ul li").accordion(colors,200);
		});
```
