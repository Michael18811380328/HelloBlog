---
typora-root-url: F:\前端视频\资料笔记
---

## 7 JS面向对象高级

### 第一天 面向对象与数据类型

#### 0 基础知识

##### 0.1 基础知识复习

熟悉JS基本组成（ECMA3+DOM+BOM）、关键字、数据类型转换（简单复杂数据类型）、内置对象和方法（Array-String-Date-Boolean-Number）、DOM、BOM。

JS高级要求掌握ECMA3：除去H5和CSS3部分，其他都是ECMA3的内容。每个版本具体方法不需要记住，记住版本就行。移动端的浏览器都兼容。windows系统桌面应用只需要考虑ie浏览器兼容性，其他的浏览器一般会升级到最新的版本。

数据类型：基本类型（number-string-boolean）复合类型（object-function等）空类型（null-undefined）其中复合类型由基本类型和复合类型组合而成。

DOM树：要求随意挑选一个元素，可以访问周边相邻元素的node。DOM特效（改变样式） 



in语句：for in 循环：in判断某个对象是否包含某个属性

"name" in object 返回 Boolean



条件运算符（三目运算符）？：条件表达式。

创建对象表达式：new



##### 0.2 逻辑中断

使用||&&表示或与和的关系。||左边是真，不再计算右侧的表达式 a = a || 0；&&左边是假，不再判断右侧的表达式。



##### 0.3 delete运算符

返回boolean，删除是否成功

delete 变量+数组项+对象属性

~~~javascript
var o ={name:"张三"};
var arr =[1,2,3];
console.log(delete o.name);
//将name属性从o中移除（成功）
console.log(delete arr[1]);
//将数组中的第二个元素删除，该方法不会改变数组的长度。删除后是undefined
~~~

注意：delete在全局变量和局部变量中的区别

var num1 = 123——正式声明变量（标准的语法）

num2 = 456——全局变量（非标准语法，禁用，容易出现错误）

delete num1; false-不可删除

delete num2; true-可以删除（删除后，显示没有定义该变量）

delete——测试使用全局变量



##### 0.4 练习

练习：给定一个字符串（“aenevvlbkrituu“）输出某个字母的位置

方法一：字符串可以看做特殊的数组，直接使用循环-判断即可得到位置。

~~~javascript
var str = "adenfrbhvhfrfbhfrhbksw";
		console.log(typeof(str));
		for (var i = 0 ; i < str.length ; i++) {
			if (str[i] == "f") {
				console.log(i+1);
			}
          	if (i ==str.length) {
            	return -1;
          	}
		}
~~~

方法二：使用str.charAt(i) 方法，返回第i位置的字符串的内容

~~~javascript
var str = "adenfrbhvhfrfbhfrhbksw";
		console.log(typeof(str));
		console.log(str.charAt(0));
		for (var i = 0 ; i < str.length ; i++) {
			if (str.charAt(i) == "f") {
				console.log( i+1 );
			}
		}
~~~

两种方法对比：

方法一某些指定的参数超出有效值的范围，会返回undefined；方法二会返回一个空字符串；

方法一对于ie8之前的版本不兼容；方法二兼容全部浏览器（推荐使用方法二-封装成函数）。



#### 1.面向对象介绍

##### 1.1 面向对象定义

开发过程中，有对象可用就直接使用；如果没有对象，就自己封装一个对象（面向过程），以后开发方便（复用）；使用对象开发（jQuery）；组件化；

~~~javascript
//面向过程的封装（例如jQuery）
$（"<div></div>"）.appendTo(body); 
//在body内部创建一个div标签
$（body）.append("<div></div>");
~~~



##### 1.2 面向对象特性-重点

JS是一个基于对象的多范式的编程语言（多范式：编程方式，面向对象，面向过程，链式编程，函数编程，在JS中都有应用）JS 变量没有类型 数据有类型 支持多态性（不需要考虑多态性）

###### 1.2.1 抽象性

针对对象的核心属性，不在特定条件下不知道对象是什么。（对象非核心属性不关心，不能用部分属性还原整个对象，也没有必要还原整个对象。JSON对象——键值对的集合）

###### 1.2.2 封装性

封装性：数据和函数（属性和方法）封装成为对象，过程封装成为函数。

###### 1.2.3 继承性

某些属性和方法自己没有别人有，自己拿过来使用。继承是实现复用的手段；复用，重复利用，将已有代码修改之后自己使用。



JS中没有明确的继承方法和类（按照对象的理念实现对象的成员扩充）所以方法有很多。在C++中，继承具有模板（类），规定了一个对象具有的属性和方法，继承是类之间的继承（模板）。



方法一：混入法

~~~javascript
var o1 = {"name","Mike"};
var o2 = {"age",19};
function mix(x1,x2) {
  var k in x2;
  x1[k] = x2[k];
  //将o2中的对象混入到o1中
}
mix(o1,o2);
封装到JQ中称为extend函数。
~~~

##### 1.3 面向对象开发

详见代码



#### 2.调试工具使用

##### 2.1 谷歌浏览器

​	console控制台不仅可以输出数据，而且可以输入数据（控制页面）

​	调试工具的使用-通过调试工具熟悉不同对象的主要方法；

​	如果一个函数没有return表达式，默认就是return；在控制台的返回值是undefined。对于同样的代码，在不同的浏览器不同的版本结果不一定相同。函数声明不会输出结果，函数表达式则输出结果。

​	条件断点：在代码左侧右击鼠标，设置参数的条件执行（add conditional breakpoint），对于循环调试很方便。

​	network网络请求；timeliness渲染时间；Profiles性能处理。这三个不常用。

​	element-console-network这几个常用。

​	面试题目：音乐播放器：自动播放下一首歌曲（自己的想法：设置函数，从控制台输入地址播放下一首歌）

​	官方答案：audio的时间中有onended时间，触发函数，播放下一首，音乐地址通过数组传入。

##### 2.2 其他浏览器

​	火狐浏览器：使用3D效果分析其他网站的Z轴层叠效果—firebug调试工具（插件不支持当前版本浏览器）

​	ie浏览器：最后一行代码会自动执行（不能设置断点），如需调试，需要再写一行代码（加一个变量）；国内政府部门通常使用稳定版本的系统和浏览器（不会及时升级）所以说做的web需要保持兼容性。



#### 3.值类型和引用类型

这部分内容主要是概念和理解内容（需要记忆）。

引用类型包含复杂类型（主要区别是内存地址）电脑中输入显示的都是字符串数据。



##### 3.1 ASCII编码

ASCII编码方式主要表示数字、字母、符号、命令等，使用16进制表示。空格键（32位）0（48位）A（65位）a（97位）其他常用的符号数字都可以推。ASCII使用7个2进制编码表示。（实际在计算机中以一个字节——8个二进制编码存储）。

##### 3.2 Unicode编码

使用两字节表示（对于前边与ASCII重复的部分占用内存）



##### 3.3 UTF-8编码

统一转换格式编码，前边的编码和ASCII编码一致，汉字占用三个字节。

问题：一个字符占用多少字节存储？
回答：不同的编码方式占用不同的存储大小。
ASCII：占用一个字节；
双字节字符：与ASCII重合部分占用1个字符，独有字符占据2个字符；
Unicode：任何字符均占用2字节；
UTF-8：与ASCII重复的部分占用1个字节，中文占据三个字节（其他语言未知）

字节（byte）又称比特；字（word）是一个字符；位（一个字节占据8个位，位置，使用二进制表示，例如255 = 11111111（2））上下文：解析代码需要观察上下文的编程环境，相同的编码在word或在txt中是不一样的。同一句话在不同环境中不一样。



##### 3.4 JS定义变量

定义变量需要开辟内存空间，不同的数据类型(值类型和引用类型)占据不同的内存空间。

var num ; 声明变量，不开辟内存空间（只有名称没有内容）定义变量：有名称有内容

var num = 123; 值类型，占据3个字节。在32为操作系统中，最小的存储空间是4个字节。所以分配的内存就是4个字节。JS很特殊，凡是数字都是四个字节（使用科学计数法存储，所以0.1+0.2 != 0.3）。

var num = "123"; 值类型，占据3个字节，操作系统中分配最小单元是4个字节。

var num = [1,2,3]; 引用类型，数据和地址分开存放（JS中不完全是堆栈存放）

总结：值类型就是变量存储自身数据；引用类型就是变量中存储内存地址（函数数组）。

复习补充：ASCII码开始使用7个二进制位表示128个可能的字符（1950）；之后完善的ASCII使用一个字节（8个二进制位）表示256个字符。	

空对象和空数组的区别：空对象（null）表示声明一个对象（不包含指针）内部为空，空数组（[]）表示定义一个数组对象，数组内部是空的，数组的指针有，数组的方法length有。在内存图中可以表示。



### 第二天 数据拷贝与构造函数 

#### 1 引用类型存储
1.内存逻辑结构（值类型变量直接存储数据，引用类型变量存储数据地址；值类型复制有两份内存，引用类型浅拷贝有两个变量，只有一个内存位置；深拷贝的有两个独立的内存位置）。（逻辑图绘制）

变量赋值：值类型赋值：将内部数据全部复制一份进行赋值（在内存中占用两个数据副本）；引用类型赋值：将内存地址复制一份拷贝到另一个对象（在内存中占用一个数据副本）。问题：利用一个对象修改内存数据，会影响到其他数据存储。




#### 2 深拷贝浅拷贝（重点）

1.深拷贝：数据的所有引用都拷贝一份，数据在内存中完全独立。

浅拷贝：只针对当前对象的属性进行拷贝，对象的属性是引用类型，不考虑拷贝对象的属性。对象的属性共同指向原始的对象。

拷贝：将对象的数据复制一份。讨论深拷贝和浅拷贝的时候，一定保证对象的属性也是引用类型。

#### 3 代码封装

利用面向对象的思想，一般会让对象具有一个copy的方法，来完成自己的拷贝。设计函数时，需要考虑函数的参数和返回值。

将实现深拷贝的方法封装成函数：this表示在函数或方法中，调用该函数（方法）的对象。

深拷贝的思路：当对象中的参数是值类型，直接进行拷贝；当对象中的参数是引用类型，调用deepCopy函数进行拷贝，temp[k] = this[k].deepCopy 逐层进行拷贝方法。由于所有的对象都是这样的特征，直接写一个公共函数，每一个对象调用函数即可。

#### 4 对象的动态特性

一个对象需要属性，就可以利用对象.属性名 = 值的方式进行添加，只要赋值成功，对象的属性就增加了（JS特有）。 o.name = "Mike";

数组：有length属性的就是数组（string对象也有length属性？？）。

对象属性的两种访问形式（类似于数组中的下标）：

1. 点语法：o.name
2. 关联数组：o["string"] 属性的名字（必须是字符串）在mix方法中使用：

```javascript
function mix (obj1,obj2) {
	for (var k in obj2) {
	obj1 [k] = obj2 [k];
	}
}
```
给对象动态添加成员的时候，必须使用关联数组语法（不知道会添加什么成员，不知道什么时候添加）for-in循环。此时不能用点语法（不知道属性的具体名称和数量）。

关联数组的调用属性-使用方法——这种方法很诡异，见到后认识就行。

~~~javascript
console.log(o["name"]);//属性
o["sayHello"]();//方法

obj1[k]();//方法
console.log(o[k]);//属性
key(k)表示具体的方法或者属性
~~~

方括号当中存放的两类数据：字符串类型（需要引号）或变量（需要访问变量具体的值）。

如果一个对象中有方法function和属性，需要依次访问属性，执行方法，在for-in循环中，首先需要判断具体的typeof是否等于function。Instance of判断具体的属性



#### 5 函数参数数据类型

引用类型-值类型——作为函数参数传递的特性

重要：作为函数的参数，就是将参数的数据拷贝一份，传递给函数的定义中的参数。

函数在调用的时候，首先将实际参数中的数据拷贝一份；将数据复制到形式参数中，跳转到函数的定义中（函数体），之后正式进入函数内部，执行函数中的每一句话。

值类型作为函数的参数，复制一份到函数内部，函数的运算结果和之前的值无关；引用类型作为函数的参数（引用的地址），实际上内存中只有一个原始数据，函数可以改变外部的数据。

==对于引用类型，如果在函数中做赋值操作，数据的结果将与外界无关（局部作用域）；如果在函数中做引用操作（更改引用数据的操作），改变就与外界环境有关。==

函数执行需要占用内存，如果函数执行结束，数据没有被引用，函数占用的内存就会被释放。使用return返回的数据不会被释放。




#### 6 ==构造函数==

构造函数在面向对象语言中用来初始化数据，在JS中给对象添加属性，初始化属性。JS中new命令创建对象。

创建对象的过程（重要）
1. 代码：var p = new Person();
2. 运算符new创建了一个对象，类似于{}，是一个没有任何自定义的成员的对象（类似空对象）。
  区别：使用new创建对象，对象的类型就是创建它的构造函数名（Person类型）。使用{}无论如何都是Object类型——相当于Object类型。
3. 然后调用构造函数，为其（创建的对象）初始化成员。
  构造函数在调用的开始，赋值操作，this=刚刚创建的对象。因此在构造函数中this表示刚刚创建出来的对象。
4. 在构造函数中，利用构造函数的动态创建对象的方法，为对象添加成员（属性）。


   作业1：深拷贝与浅拷贝代码写三次
   作业2：构造函数执行过程画图写出来

```javascript
function Person(name,age,gender){
this.name = name;
this.age = age;
this.gender = gender;
}
var p = new Person("Mike",19,"female");
```


#### 7 异常与捕获

异常：程序在运行过程中出现的错误。我们会有特殊的假设，假设与真实的运行环境冲突（网断了），系统出现一个异常使其中断。异常：异常类型和具体信息。控制台报错中具体出现。如果出现异常，后面的代码停止执行。


如何处理异常？出现异常后继续执行；
常见的异常两大类：运行环境的多变性（404，浏览器不同）；语法错误（代码错误）-改代码；

当前讨论第一个问题

try-catch语法-尝试-捕获语法

~~~javascript
try{
可能出现的错误的代码
} catch（e）{
处理错误的语法
}
e表示error，错误信息对象；try方法对于语法错误无效（少写了括号）。当运行出现错误，不是语法错误，使用try-catch方法。这个方法在框架中使用，在正常开发过程中使用不多。
~~~

1. 如果try部分代码出现错误，try中代码执行中断，跳到catch中执行代码（catch可能记录程序日志以供调试）。执行catch部分代码后，继续执行程序块后面的代码，程序不会中途停止执行。

2. 如果try部分代码没有出现错误，执行try部分结束后，不执行catch部分代码，直接执行后续的代码。

检测异常-捕获异常-抛出异常

throw obj异常对象：1.throw是抛出异常的语法，其后跟一个对象，即错误消息对象。2.一般该对象使用“new Error（“错误信息”）”来创建，也支持任意的对象。结论：自定义函数中，其他人没有按照要求传入数据（数据类型不合法），抛出错误。



#### 8 绘制DOM树（重点）

DOM操作通常需要掌握40个方法（body共计200个方法）不使用浏览器，直接绘制dom树（节点和属性等）。

​	HTML很特殊：HTML与head之间没有文本节点，body与HTML之间没有文本节点；在其他两个标签之间都有文本节点（有文字，或回车都属于文本节点text）

​	使用childNodes和Attributes在浏览器的watch中查看DOM树结构——要求自己会画dom树。

~~~javascript
var html = document.write.html;
~~~

​	任何一个DOM树结构的结论：增删改查

​	一般DOM树结构：找到当前节点，访问父节点，访问子节点，访问属性节点，访问兄弟节点。

~~~javascript
背过！！！

子节点：childNodes
属性节点：attributes
前一个兄弟节点：previousSibling
父节点：parentNode
后一个兄弟节点：nextSibling
第一个属性节点：attributes[1]
最后一个子节点：lastChild or childNodes[childNodes.length - 1]
~~~



### 第三天 DOM树与原型

#### 1 DOM操作（重点）

##### 1.1 节点操作

操作DOM的方法很多，使用jQuery方法、原生JS代码都可以，将其中的区别记清楚，熟练使用一种方法的情况下再操作第二种方法（现在优先熟悉JQ操作方法）。增删改查（重点！！！）

###### 1. 寻找节点

~~~javascript
1.标准DOM——API
document.getElementById
docuemnt.getElementsByTagName
document.getELementsByName(input标签的name属性)
document.getElementsByClassName
document.qurrySelectorAll(浏览器兼容性)

2.亲属访问

3.属性获取
	getAttribute
	getAttributeNode
~~~

###### 2. 增加节点

2.1 创建节点

在console中输入document.create就会提示 所有创建元素。

~~~javascript
document.createElement 创建元素节点
document.createTextNode 创建文本节点
document.createAttribute 创建属性节点
innerHTML；
innerText；
cloneNode();
~~~

2.2  节点加入（文档树）

~~~javascript
appendChild 追加到结尾处
innerHTML
insertBefore 将元素插入到某一个元素的前面
//父元素.insertBefore(新元素，旧元素)
//将新元素插入到旧元素的前面（使用父元素调）
~~~

2.3 其他方法

~~~javascript
style操作
setAttribute(属性名，属性值)
~~~

###### 3. 删除节点

~~~javascript
removeChild
removeAttributeNode
~~~

###### 4. 修改节点

~~~javascript
//4.1 修改节点：删除节点后再加入

//4.2 修改样式
style.XXX = xxx;
setAttribute

//4.3 修改文本
innerHTML
innerText
节点操作
nodeValue

//4.4 修改属性
.xxx = vvv;
setAttribute
~~~



##### 1.2 属性操作

###### 1 nodeValue

nodeValue表示节点的值；nodeValue可以查询并修改节点的值。

###### 2 nodeName

nodeName表示节点的名字，所有节点都具有这个属性，一般元素节点使用这个属性。元素节点打印出来的元素名都是大写字母。nodeName可以查询节点的名称。所有文本节点的节点名字都是#text。

~~~javascript
console.log(document.body.nodeName);
// BODY
~~~

###### 3 nodeType

节点类型：1.元素节点、2.属性节点、3.文本节点；

了解：document.nodeType（9）;document.createDocumentFragment().nodeType;（10）

可以利用节点的类型（123）判断节点是什么节点。

###### 4 小结

nodeName用于标签节点；nodeValue用于文本节点；nodeType用于判断节点类型；



##### 1.3 常见的节点属性

nodeValue表示节点的值，一般文本节点才使用这个属性。

所有的节点都有该属性。

文本节点：所有文本节点的节点名字都是#text。


```javascript
		var txt = document.body.lastChild.nodeValue;
		console.log("|"+txt+"|");
		// 结果还有空行

		console.log(document.body.lastChild.innerHTML = "hi");
		//innerHTML可以输出到控制台不过不能在页面中显示
		//nodeValue改变body中的文本内容 

		document.body.lastChild.nodeValue = "hi";
		var div = document.createElement("div");
		div.innerHTML = "burglar";
		document.body.appendChild(div);

		// 属性节点与文本节点使用该属性得到什么？
		
		// 方法一：attributes[]根据属性节点的下标确定
		var attr1 = document.body.attributes[1];
		// 方法二：getAttributeNode("XXX");根据属性节点的名称查找；
		var attr2 = document.body.getAttributeNode("class");
```

##### 1.4 属性的增删改查

DOM树中的任何节点都可以增删改查


```javascript
节点选择
var div = document.querySelectorAll ("#dv")[0];
      
增加属性

	//方法一：使用setAttribute添加自定义属性（DOM-Core）
		div.setAttribute("value","main");
	//方法二：使用点语法添加标准 属性（HTML-DOM）
		div.className = "top";
	//使用点语法增加class必须用className（特殊）
		
	//方法三：使用DOM节点方法（了解）纯DOM-Core
		var attr = document.createAttribute("test");
		attr.nodeValue = "test";
		div.setAttributeNode(attr);

删除属性:
      
//方法一：removeAttribute
// 不能使用setAttribute，因为属性checked是一个单标签，只有一个参数，只能删除属性。
var ck = document.querySelectorAll("#ck")[0];
ck.removeAttribute("checked");

//方法二 纯DOM-core
var ck = document.querySelectorAll("#ck")[0];
var attr = ck.getAttributeNode("checked");
ck.removeAttributeNode(attr);

// 方法三 点语法
var ck = document.querySelectorAll("#ck")[0];
ck.checked = false;
// 注意：使用ck.checked = '';也可以实现非选中，将空字符串转换为false实现，这样消耗内存

      
修改属性-查询属性
set-get Attribute("XXX")
set-get AttributeNode
```



##### 1.5 综合练习-==表格==

要求五分钟内写对代码

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script>
		window.onload = function(){
			function c (tag){
				return document.createElement(tag);
			}
			var table = c("table");
			var tbody = c("tbody");
			table.appendChild(tbody);

			for (var i = 0 ; i < 4 ; i ++){
				var tr = c("tr");
				for (var j = 0 ; j < 3; j ++){
					var td = c("td");
					var txt = document.createTextNode(" ");
					td.appendChild(txt);
					tr.appendChild(td);

					td.width = 200;
					td.height = 50;
				}
				tbody.appendChild( tr );
			}
			table.setAttribute("border","1");
			document.body.appendChild(table);
		};
	</script>
</body>
</html>
~~~



#### 2.原型（难点）

##### 2.1 函数重复执行

JS是解释执行的语言，函数的重复执行会占用大量的内存（循环体内函数执行）。代码中重复执行的代码容易出现重复的对象。

同一个构造函数创建的两个对象，他们的方法是不一样的（使用函数创建方法，但是函数执行两次，是不一样的）。

传统的构造方法的定义方式会影响性能，容易造成多个对象有多个方法。我们应该将方法单独抽取出来，所有的对象共享这个方法（可以将方法写到外面，但是不容易管理，有安全隐患）。

~~~html
原因一：在开发中会引入各种框架和库，自定义的成员越多，出现命名冲突的机会越多。原则：尽量少暴露自己的自定义成员。

原因二：可能在开发中会有多个构造函数，每个构造函数有很多方法，就可能产生混乱，不容易维护。jquery10000行、angular35000行。

~~~

解决方案：任意一个对象会默认的连接到它的原型中。创建一个函数，会附带创建一个特殊的对象，该对象使用函数prototype引用，就是函数的原型属性。对象是函数的原型属性。

每一个有函数作为构造函数创建的对象，都会默认的连接到这个对象上。

在该对象访问一个方法或属性的时候，如果该对象中没有，就去默认的神秘对象（原型）中去查找。

~~~javascript
function Foo (){ }
	Foo.prototype.age = 19;
	var p = new Foo();
	console.log(p.age);
~~~



##### 2.2 构造函数不足

1.由于对象调用构造函数创建出来的，每一个对象在创建的时候，构造函数的子函数都会创建一次。

2.每一个对象都有一个独立的，不同的，但是功能逻辑一样的函数。{} != {}

3.在代码中，方法就会消耗性能，就会消耗内存。内存使用越多，性能损耗越大。代码不好。

4.最好的办法：==函数体放在构造函数之外== 在构造函数中只需要引用该函数。

~~~javascript
function sayHello(){}
function Foo(){
	this.say = sayHello;
}
~~~

5.会在开发中变得困难：引入框架危险；代码繁冗不好维护。解决办法：外面的函数不占用名字，在函数内部。

6.函数定义后，创建一个神秘对象。

7.如果当前函数没有这个方法，就到函数的原型中去找方法，一直向上找。

8.由构造函数创建出来的很多对象共享一个对象，就是构造函数.prototype

9.结论：只需要将共享的东西，会占用内存的东西放到构造函数.prototype中，所有的对象就会共享。

~~~JavaScript
function Foo (){}
Foo.prototype.sayHi = function(){
	console.log("...");
};
var f1 = new Foo();
var f2 = new Foo();
f1.sayHi === f2.sayHi;
~~~

##### 2.3 常见错误

###### 1.构造函数包含属性

构造函数.prototype中包含属性。

通常情况下原型对象中只有方法没有属性。如果在自定义函数中，需要预设一些固定值，可以使用这个方法。



###### 2.构造函数赋值

~~~javascript
function Person (){}
Person.prototype.name = "John";
var p1 = new Person();
var p2 = new Person();
p1.name = "Mike";
console.log(p1.name);
console.log(p2.name);
//结果是Mike and John
~~~

分析：如果访问数据，当前对象中如果没有该数据，就到构造函数的原型属性中去寻找；

如果赋值数据，当对象中有该数据的时候，就修改当前值；如果对象中没有该数据，那么就添加值。

p1当中有name属性，直接访问name属性Mike；p2中没有name属性，就到构造函数的原型属性中找到name，就是John。



##### 2.4 原型概念

###### 2.4.1 面向对象

​	类class：在JS中就是构造函数（利用对象的动态特征创建对象）；在传统的面向对象语言中，使用“类”定义模板，使用模板创建对象。在构造方法中， 也具有类似的功能，因此也称为类。在java中，最小的代码单位就是类。

​	实例（instance）与对象（object）：实例是某个构造函数创建出来的对象，我们称为XXX是构造函数的实例。实例就是对象，对象就是一个泛称。实例和对象是近义词（泛指特指）。

​	键值对、属性、方法：在JS中，键值对的集合称为对象；如果值为数据（非函数），就称该键值对为属性（property）；如果值为函数（方法），就称为方法（method）。

​	父类与子类：传统的面向对象语言中，使用类来实现继承，那么就有父类子类，又称为基类和派生类。在JS中，没有类，称为父对象，子对象，基对象和派生对象。java类似于用图纸造汽车。



###### 2.4.2 原型继承分析

​	神秘对象针对构造函数称为“原型属性”。神秘对象就是构造函数的原型属性，简称原型。神秘对象与构造函数所创建出来的对象具有默认的连接。

​	神秘对象针对构造函数创建出来的对象称为“原型对象”，简称原型。

​	原型有多个含义，根据上下文分析到底是原型属性还是原型对象。

​	对象继承自其原型：构造函数创建的对象继承自构造函数的原型属性==构造函数创建的对象继承自该对象的原型对象。

​	原型继承：构造函数所创建出来的对象与构造函数的原型属性表示的对象是两个不同的对象，但是原型中的成员可以直接被实例对象所使用= =实例对象直接“含有”原型中的成员= =>实例对象继承自原型= =>原型继承

凡是字面量对象都具有构造函数

{} Object构造函数
[] Array构造函数
function ...Function构造函数



##### 2.5 原型使用

目的：提高函数的复用性，实现继承

	1.利用对象的动态特征
	Person.prototype.XXX = vvv;
	2.利用直接替换
	Person.prototype = {
		sayHello：function(){},
		studyEnglish: function (){}
	};
会生成一个新的对象，占用一定内存

原型对象与继承的问题:如果利用构造函数创建第一个对象，之后利用直接替换改变了原型对象的方法，继续创建第二个对象。那么第一个对象指向原始的原型对象，第二个对象指向更改后的原型对象。如果使用对象的动态特征就不会产生这种情况（只有一个原型对象）。



### 第四天 原型链

主要内容：复习DOM、--proto--、原型继承、混合式继承、原型三角形图解、搜索原则、静态对象和实例对象。

#### 1.复习DOM

##### 1.1 删除子元素

~~~
简化API
node.removeChild(div);
标准API
var div = document.getElementById("..");
node.removeChild(div);
快捷写法
node.innerHTML = "";
~~~

##### 1.2 删除属性

~~~
var attrNode = node.getAttributeNode("..");
node.removeAttributeNode(attrNode);
简化API
node.removeAttribute("..");
~~~

##### 1.3 获取属性

~~~
var attrNode = node.getAttributeNode("..");
attrNode.nodeValue;
简化
node.getAttribute("..")
~~~

##### 1.4 总结

节点对象方法——标准API；属性值方法——简化API



#### 2.原型

##### 2.1 原型定义

原型可以实现方法的继承（构造函数中，创建对象，使用原型中的方法，节省内存）prototype

##### 2.2 原型属性

_ _ proto _ _（连写的双下划线）

早期访问原型只能使用构造函数访问，不能通过实例对象访问原型。___ _ proto _ ___是一个非标准的属性，可以通过实例对象引用原型（早期的IE浏览器不支持这个属性）

##### 2.3 查看原型的两种方法

​	构造函数查看原型：var o = new Person();

​	对象的方法：o._ _ proto _ _

​	Person.prototype === o._ _ proto _ _（全等）

##### 2.4 原型说明

1.神秘对象的默认属性：constructor（构造器），表示该原型与构造函数连接关系（看不见的连接关系）。

2.实际使用：访问原型：在开发中除非特殊要求，不要使用实例修改原型成员（个人不能修改集体的荣誉）。所以原型属性在实际开发过程中使用很少，原型属性在调试中很方便，可以查看具体的成员和方法。

3.早期的浏览器通过实例对象，怎样查看原型？通过实例对象——构造器constructor——原型

​	o.constructor.prototype 进行访问

4.如果给实例“继承自原型的属性”赋值，那么不会改变原型的属性，只会改变对象自己的属性。

~~~javascript
function Person (){ }
	Person.prototype.name = "test";
	var obj1 = new Person();
	var obj2 = new Person();
obj1.name = "test1";
console.log(obj1.name);
console.log(obj2.name);
//输出的分别是test1和test。

//分析：在对象的原型中新加入一个name属性，其默认值为test；对于obj1而言，直接给定obj1.name，实际上Person中没有属性name，就动态创建一个属性name = test1，所以输出结果就是test1；对于obj2而言，需要输出obj2.name，Person对象属性中没有name，就从Person对象的原型中寻找，找到属性name= test，所以输出test；
~~~

##### 2.5 原型细节

使用点语法给原型添加成员与直接替换修改原型对象有什么区别？

1. 原型指向发生了变化

2. 构造函数所创建的对象所继承的原型不同

3. 新增加的对象默认没有constructor属性

在使用替换的方式修改原型的时候，一般都会添加constructor属性。

~~~javascript
function Person(){
	Person.prototype = {
		constructor:Person
	};
}

//展开-拆解
function Person(){}
var o = {};

o.constructor = Person;
//对象的属性中存储着函数的内存地址

Person.prototype = o;
Person = 123；
~~~
#### 3.继承

##### 3.1 继承定义

继承：自己没有的属性和方法拿来使用。

##### 3.2 继承的形式

​	混合对象：使用mix方法，强制将一个对象的方法和属性加入到另一个对象中。——操作简单

​	原型继承：对象自身不添加属性，原型加入属性即可——方法可以复用

​	**结论**：将上述两种形式进行混合，利用mix方法将方法加入到构造函数的原型上，构造函数的实例具有新加入的方法，实现继承（代码很重要需要多次抄写）。

​	混合式继承简单描述。

##### 3.3 继承的操作

~~~javascript
//混合式继承的初级方法

		var Person = function () {
			// 构造函数创建对象
		};
		//新建一个对象（内含方法）
		var object = {
			run :function() {console.log("I can run");},
			eat :function() {console.log("I can eat noodles");}
		};
		//新建混合函数
		var extending = function (o1,o2){
			for (var k in o2){
				o1[k] = o2[k];
			}
		};
		//混合对象和构造函数原型
		extending (Person.prototype , object);

		//构造函数创建对象，调用方法
		var p1 = new Person();
		p1.run();
		p1.eat();

//混合式继承的高级方法
		
		var Student = function() {};
		Student.prototype.extend = function (o){
			for (var k in o ){
				this[k] = o[k];
			}
		};

		Student.prototype.extend({
			run :function() {console.log("hi");},
			eat :function() {console.log("I can eat dumplings");}
		});

		var q1 = new Student();
		q1.run();
		q1.eat();
~~~

##### 3.4 constructor

在构造函数内部还可能继续调用构造函数，此时不要使用原始函数名称（肯能被覆盖），使用this.construction 调用函数，这样可以避免冲突，在框架中使用大量的代码可能用到。

A 在构造函数内部创建对象时，使用this.constructor

B当原型被赋值后，在构造函数内增加constructor：对象名（Person），实际上传递的是内存地址，后续原型被赋值，不会影响对象的执行（不会报错）。



##### 3.5 静态成员与实例成员

1.静态成员表示的是静态方法和静态属性的概念，静态就是由构造函数所提供的。
2.实例成员：实例方法和实例属性，实例就是由构造函数所创建的对象。

一般工具型方法都由静态成员提供（框架），一般与实例对象有关的方法有实例成员提供。工具型方法类似于公共的共用的方法，实例性方法类似于某个对象的方法，不是普遍使用的方法。



##### 3.6 作业

1.构造函数的执行过程分析（使用文字将每一句话描述）

~~~javascript
function Person(){
    this.name = "TOM";
    this.sayHello = function() {
      console.log("..")；
    }
}
var p = new Person();

function Student(name,age){
    this.name =name;
    this.age = age;
}
Student.prorotype = {
    sayHello:function() {
      console.log("...")；
    }
}
var p = new Student("Mike",19);
~~~

2.自己定义DigTag构造函数，完成元素的添加，使用混合式原型继承。



##### 3.7 面试题

1.将字符串中特殊符号选出

​	遍历字符串，使用indexOf进行判断，输入对应的下标到新的数组中

~~~javascript
//自己的想法
var result = [];
var string1 = 'asdfghjk';
result.push(string1.indexOf('d'));
console.log(result);
//结果：2
~~~

2.逻辑中断

	foo = foo || bar;
	逻辑或：如果左边是真，整个表达式的值就是左边的值。JS中没有把转换为boolean，直接输出真的表达式。
函数参数中使用该方法兼容处理这个参数。

3.变量名提升

~~~javascript
function Person(){}
var p1 = new Person();
var p2 = new Person.prototype.costructor();
//两者的结构相同。
~~~

==将经典代码多次抄写（书上的代码），不断思考，就有很大进展==

对象字面量和JSON的关系:javascript对象表现形式。

json具体有两种说法：一种是传统的JSON对象，一种是符合json标准的严格的对象（属性名必须带双引号，表示字符串）。
var o = {"name":"Mike"};
JSON.parse('{"name":"Mike"}');
可以将JSON转化为对象输出（内部必须双引号包围属性）

$()的具体作用：

1. 内部是字符串：html的选择器
2. 内部是dom：包装成JQ对象
3. 内部是jq对象：便于操作对象

$('.c', $('#div')) ---> $('.c #div')子代选择器



#### 4.原型链

##### 4.1 原型与继承小结

1.原型定义

​	构造函数在创建的时候原型就被创建出来，内部可以添加任何属性和方法。构造函数创建出来的实例对象是继承自该原型对象的。实例对象使用属性或者方法时，首先到构造函数中寻找，如果找不到就到原型中去寻找。

2.原型使用：
​	利用点添加成员；直接替换添加成员

3.什么是原型继承

​	实例对象会默认联系到原型对象中；或者自己给原型赋值后，使用更改后的原型。实例对象是继承于原型对象的；开发方式：属性交给构造函数，方法交给原型。



4.如何实现原型继承

​	4.1 extern 混合继承方式 混入的方法给原型添加成员，实例对象就可以继承指定的方法。

​	4.2 直接替换原型对象
​	原型继承案例



~~~javascript
//实现一个自定义的集合（数组）自己设置类型
function Hello(){
  
}
Hello.prototype = [];
//这里利用直接替换原型的方法，改变原型的方法（改变成数组的方法）
Hello.prototype = new Array();
var hello = new Hello();
hello.push(123);
//自定义对象具有数组的方法和属性

//变形
Hello.prototype = Array.prototype;
//原始的方法，如果需要寻找数组中的方法，首先需要在[]中寻找，没结果之后去原型中寻找（两层）；下面的方法，直接在Array.prototype中寻找（一层），性能相对优化。但是题目要求是创建集合，这个集合需要有数组没有的方法（sum方法）。
Hello.prototype.sum = function(){};
//这里使用点语法，在原型上新增加方法
//避免修改内置原始对象（避免污染全局Array对象）及时性能增加，也需要添加中间层。
push-pop 末尾插入减少
shift-unshift 开头插入减少
join 连接数组中的每一项（成为一个字符串）
~~~

如果原型中没有需要的方法？

什么时候输出undefined或者方法报错？（对象中没有这个方法；数组中元素超过下标；定义变量没有声明类型）

##### 4.2 属性搜索原则

1.原型链——链状结构
2.属性搜索原则：对象在访问属性与方法的时候，首先在当前对象中查找，如果当前对象中存在该属性或者方法，停止查找，直接使用该属性和方法。如果对象没有该成员，在其原型对象中查找。如果原型链对象没有，属性输出undefined。Object.prototype()，调用方法就报错。

小结：

prototype：构造函数指向神秘对象；

_ _ proto _ _ 实例对象指向神秘对象；

神秘对象内部具有constructor（实例对象可以直接访问神秘对象）；

![构造函数三角形](/JS高级绘图/构造函数三角形.PNG)

![原型链](/JS高级绘图/原型链.PNG)



![原型链2](/JS高级绘图/原型链2.PNG)

![原型链题目](/JS高级绘图/原型链题目.PNG)

~~~javascript
//练习题
		//1
		function Person(){
			this.name = "Mike";
			this.sayHello = function(){

			}
		}
		var p = new Person();

		//2
		function Person2(){
			this.name = "John";
		}
		Person2.prototype.sayHello = function (){};
		var q = new Person2();

		//3
		function Person3(){
			this.name = "Amy";
		}
		Person3.prototype = {
			sayHello:function(){

			}
		};
		var r = new Person3();
~~~



![Person 构造函数](/JS高级绘图/Person 构造函数.png)

![constructor-prototype](/JS高级绘图/constructor-prototype.png)







---
typora-root-url: F:\前端视频\资料笔记\JS高级绘图\Function





### 第五天 对象的原型链

#### 1.原型

实例成员与静态成员

实例和静态的语义都来源于JAVA等编程语言；
构造函数就是JS中的类，类就是模板（使用图纸造汽车）。
跑——这个方法只有汽车可以使用，所以跑是汽车这个实例的方法，只能由实例使用的东西就是实例成员；这张图纸制造了多少量汽车，这个方法由图纸决定，就是由类或者构造函数提供的。由构造函数使用的东西成为静态成员。

JS是一个弱类型的语言：变量类型随时发生改变。JS的变量没有类型，但是数据有类型。
var num = 123;
num = {};
num = function(){};
num变量从数值型-对象-函数的变化。




为什么利用替换的方式修改原型需要添加constructor属性？
使用替换的方式会将原型中原始的constructor属性去掉，所以必须加上这个属性。 

实例--->constructor--->Person构造函数--->神秘对象
constructor是原型的默认属性，不能修改（不建议直接修改）。可以使用obj.constructor 在新建的对象上加入constructor属性，优先访问属性中的constructor。

原型是JS中独有的。

后面的递归和正则表达式是JS的另一大难点。

~~~javascript
function(){};
var o = {};
o.constructor = Person;
// o的属性中存储Person的内存地址；等价于下面
Person.prototype = o;

person = 123;
console.log(Person);
// --->123;
~~~



神秘对象就是原型对象（官方术语）

~~~javascript
function (name,age){
	this.name = name;
	this.age = age;
	}
Student.prototype = {
	sayHello:function(){
		console.log("hello");
		}
	};
var p = new Student("Mike",20);
/* 代码分析：
1.预解析：声明构造函数Student，同时创建原型对象Student.prototype。
2.执行7行代码：重新覆盖原型对象，原来的默认原型对象不再被指向。
3.创建对象，new Student，将对象的应用交给构造函数的this。
4.在构造函数内部，利用对象的动态特性给刚创建的对象提供属性name与age。*/
~~~



#### 2.Object-create方法

Object.create(object)获得new object.新对象的原型中有旧对象。

~~~javascript
var o = {
	sayHi:function(){
		console.log("hi");
    }
};
var o1 = Object.create(o);
//新对象o1的原型proto就是o
~~~

兼容性处理

如果浏览器不支持这个方法，不要修改内置的对象。（错误演示）
~~~javascript
if (!Object.create){
	Object.create = function(){}
}
~~~

系统部分内置属性不能使用for-in调出来（toString）

~~~javascript
//兼容性
function inherit( obj )
if (Object.create){
	//如果兼容直接使用
	return Object.create(obj);
} else {
	//如果不兼容，根据create的定义，新建构造函数，让函数的原型指向对象，输出新建的对象。
	function F(){};
	F.prototype = obj;
	return new F();
}
~~~



#### 3.原型链

##### 3.1 原型链概念

原型链作用：利用修改原型链的结构（增删改节点中的成员），使得实例对象可以使用整条原型链中的所有成员。

对象的原型链：凡是对象都有原型；原型也是对象。原型总可以找到下面的原型，构成一个对象的序列，就称该结构为原型链。

原型链结构：凡是使用构造函数创建出来的对象，并且没有利用赋值的方式修改原型，该对象保留默认的原型链。

当前对象-->构造函数.prototype-->Object.prototype--->null



##### 3.2 函数的原型链结构

任意的一个函数，都是相当于Function的实例，类似于{}与new Object的关系

1. 函数具有_ _ proto _ _的属性

2. 函数的构造函数是Function

3. 函数应该继承自Function.prototype

4. Function.prptotype 继承自 Object.prototype。

   ​

##### 3.3 函数的三角形结构

1. Object函数是Function的一个实例

2. Object作为对象是继承自Function.prototype的，Function.prototype继承自Object.prototype。

3. Function是自己的构造函数。

   ​



#### 4.function构造函数

##### 4.1 arguments

​	伪数组对象——它表示在函数调用的过程中传入的所有参数的集合。

​	只能做for循环，不能调用Array的方法（原型是Object）

​	在函数调用过程中，没有规定参数的个数和类型（JS灵活性很高），因此函数调用就具有灵活性。为了方便使用，在每一个函数调用过程中，函数代码体内部有一个默认的对象arguments，存储着实际传入的所有参数。

​	JS函数没有规定如何传参：定义函数不管是否写参数，写了多少个参数，调用的时候可以随意调用参数，可以传参或者不传参，参数个数任意。

​	在代码设计中，如果需要函数带有任意个参数的时候，一般就不带任何参数，所有的参数利用arguments来获取。




##### 4.2 字符串太长的处理

​	1. 字符串用+连接，将长字符串拆成短字符串，不同短字符串之间用引号包起来

​	2. 根据字符串的特性，将字符串用函数包起来。使用函数对象创建函数的时候，传入的参数必须是字符串，将这部分字符串使用函数包起来即可。

​	3. 在JS的ES6版本内，使用``表示可换行的字符串（浏览器兼容）。

​	4. 使用DOM操作，将字符串写入div中，这是div-display：none，使用last-child.NodeValue使用后删除div标签即可。



##### 4.3 函数的构造函数

​	Function

​	在JS中，使用Function可以实例化函数对象，也就是在JS中函数和普通对象一样，也是一个对象类型，函数是一等公民，有如下特权。

1. 函数是对象，具有对象动态特性

2. 函数是对象，可以使用构造函数创建函数

3. 函数是函数，可以创建其他对象

4. 函数可以限定变量作用域（唯一）

   ​

##### 4.4 函数是Function的实例

~~~javascript
var foo = new Function(arg0, arg1... argN, body);

//空函数≠空
function foo(){};
var foo = new Function();
~~~

1.Function中参数全部是字符串

2.该构造函数的作用，创建函数；

如果没有参数，表示创建一个空函数

如果有一个参数，表示函数体(body); 如果有多个参数，最后一个表示函数体，前面所有参数表示函数的参数(argN)



##### 4.5 练习

~~~javascript
// 练习一：创建一个打印一句话的函数
//传统
function foo(){
	console.log("hello");
}

//Function构造函数(功能等价)
var foo = new Function("console.log('hello');");

// 练习二：传入数字并打印

//传统
function foo(num){
	console.log(num);
}
foo(123);

var func = new Function("num","console.log(num);");
func(123);
~~~



### 第六天 作用域与闭包



#### 1. 创建函数

Object.create 返回一个原型继承自参数的对象。创建一个新对象，这个对象是原始对象的proto__

原型式继承：通过修改原型链的结构，使得实例对象可以使用整条原型链中的所有成员。



##### Function对比：

使用Function创建函数与原始创建函数的方法对比

Function使用字符串构建函数，就可以在程序运行过程中执行函数；以前的函数必须在初始情况就写好，再经过预解析，一步一步的执行；

var string = "[1,2,3,4]";

var arr = (new Fucntion('return'+string+';'))();

在Ajax中传输数据使用字符串JSON形式传递，new Function可以将字符串的数据转化为Array或者Object；new Function 最大的用处就在于这个。

同时，使用canvas绘制图像，将字符串构成的公式转化为其他对象进行处理。



##### eval函数

将字符串直接转化为函数代码，类似于new Function 直接运行。由于开放性,可能不安全，在代码调试过程中可以使用。所以现在规范JSON的文件形式中参数也需要使用引号括起来，使用JSON.pause等命令避免恶意代码。

```javascript
var array = eval("[1,2,3]");

eval("console.log('hello');");

如果内部是一个对象需要注意：

var array = eval("{name:"Mike",age:20}");

直接这样写会报错；

原因：在JS中有一个标记语法

语法：

名字：表示跳出多层循环；
```

标记语法的作用是跳出多层循环。如果一行代码中有冒号，就会解释成标记语言，如果一行代码中出现两个冒号，就会语法报错。

解决办法：将花括号用圆括号括起来表示一个表达式即可进行转换。

```javascript
var array = eval("({name:"Mike",age:20})");
var arr = [
[1,2,3,4],
[5,6,7,8],
[9,10,11,12]
];
//寻找元素7并返回
```


#### 2. 作用域

域表示范围，就是作用范围，一个名字在什么地方有效，在什么时候能使用。

##### 块级作用域

在其他编程语言中，块状的花括号构成的作用范围

##### 词法作用域

在JS中采用词法作用域（代码作用域），就是代码在编写过程中体现出来的作用范围。代码一旦写好后不用执行，作用范围就已经确定好了。这个就是词法作用域。

##### 词法作用域规则：

1. 函数允许访问函数外部的数据。

2. 整个代码结构中只有函数可以限定作用域。

3. 作用规则首先使用提升规则分析（预解析）。

4. 如果当前作用规则中有名字了，就不考虑外部的名字（上一次作用域的名字）。

练习

~~~javascript
var num1 = 123;
function foo1(){
	var num1 = 456;
	function foo2(){
		num1= 789;
		function foo3(){
			console.log( num1 );
		}
		foo3();
	}
	foo2();
}
foo1();
console.log( num1 );
~~~

#### 3. 作用域链

只有函数具有作用域结构。只要是代码就具有至少一个作用域，即全局作用域。凡是代码中有函数，那么这个函数就构成另一个作用域；如果函数内部嵌套函数，作用域也发生进一步嵌套，这样的作用域嵌套关系表示出来就是作用域链。（类似于HTML中的dom树结构）。

##### 绘制作用域链的步骤

1. 全局作用链是0级，将成员以方格的形式绘制。
2. 只有函数可以限制作用域，从函数中引入新链。
3. 函数的嵌套将会增加作用域链的级别。

##### 变量的访问规则：

1. 首先查看变量在几级作用域链上，查看当前链上是否有变量的定义与赋值，如果有就直接使用。
2. 如果没有赋值，在上一层链寻找直到找到。如果0级链没有，返回not defined.
3. 同级不同源的作用域链不能混合查找。

##### 补充：声明全局变量

1.声明变量使用var，如果不用var就是全局变量。
2.通常全局变量禁止使用，在任何的代码结构中可以使用这个语法，在代码维护过程中会有问题。如果必须使用，说明原因并写好注释。
3. 声明的全局变量在当前作用域和上一层作用域生效。

错误代码：

~~~javascript
function foo(){
	var i1 = 1 
	i2 = 2,
	i3 = 3,
	...
	//由于i1后边忘记加上逗号，导致i2i3都是全局变量，可能造成很大的麻烦。
}
~~~

#### 4. 函数的作用域

1.绘制完整的原型链结构（var p）

p --> Person.prototype -->Object.prototype --> null
Object构造函数：o --> Object.prototype-->null
Person是Function的实例，继承自Function.prototype.
Object是Function的实例，继承自Function.prototype
Function是Function创建出来的实例（涉及到底层语法，JS中不涉及原理）

##### 面试题

###### 1.数组的方法区别

getDate();返回月份的某一天
getYear();返回年份（20世纪返回两位数，1980返回80，其他世纪返回全部数字，2005）ECMA3后续版本不支持这个方法，支持getFullYeay();
getFullYeay();返回四位数的年份
+new Date();返回今天的日期和时间（+表示转化为数值型数据）

###### 2.new Array()

 相当于[ ]

	如果没有参数：创建一个空数组；
	如果有一个数字参数：创建一个长度相当于制定数字的数组，所有元素没有具体值（undefined）或者为0（浏览器版本不同）
	如果有一个非数字的参数：表示用该参数初始化数组。
	如果数组构造函数的参数是多个数据，就是对数组的初始化。

###### 3.cancat(...)

该方法会展开参数中的一级数组；
var arr = [1,2,3];
arr.concat(4, [5, 6,[7, 8]]);
arr --> [1, 2, 3, 4, 5, 6, [7, 8]];


##### 声明

1.变量名声明（标识符声明）：让JS解释器知道这个名字；名字没有与任何数据对应（原型链层级结构中不涉及具体的赋值）

2.函数的声明：函数的声明包含两部分：函数声明和函数表达式有区别：函数声明是单独写在一个结构中，不存在任何语句，逻辑结构判断结构中。

~~~
function f(){
	function func(){ }
	if (true){
		function fun2(){ }
	}
}
//首先函数声明，告诉JS解析器有这个名字存在，和变量的声明一样；之后告诉解析器，这个名字对应的具体函数体是什么。

var num = 1;
function num(){
	alert(num);
}
num();
~~~

分析：
1.预解析，提升函数名和变量名。首先提升变量名num，之后提升函数名num。函数名和变量名冲突。
2.执行代码：首先赋值num=1，num覆盖函数，alert--->num is not a function

区别
function foo(){}
var foo = function(){};

1.上面的语法是函数声明，可以提升函数名，在函数定义的上方可以调用函数。
2.下面的语法是函数表达式，函数名就是foo，函数名会提升，但是函数体不会提升。
3.函数表达式支持名字语法（名字是函数的一个默认属性）

var foo = function func(){ };

函数有一个属性name，表达的是函数名。只有带有名字的函数定义，才会有name属性。否则默认的属性值是''。函数表达式的name属性只允许在函数内部使用，IE8可以在外部访问（特例）。

##### **特殊情况**

同一段代码在不同的浏览器下执行结果不同

~~~javascript
if (true){
	function f1 (){
		console.log('true');
	}
} else {
	function f1(){
		console.log('false');
	}
}
f1();
~~~

在新版的Chrome上运行是true；在Safiri上运行是false；在IE-edge运行结果是undefined。目前的标准MDN是FF编写的，目前标准向FF靠拢。这段内容自己没弄明白不同浏览器的解析过程。



#### 5. 闭包

##### 1.闭包定义

闭包就是闭合包起来，是一个具有封闭包裹功能的一个结构，一个具有封闭的不对外公开的包裹结构或者空间。

在JS中函数可以构成闭包，一般函数是一个diamante结构的封闭结构，即包裹的特性。同时根据作用域规则，只允许函数访问外部的数据，外部无法访问函数内部的数据，就是封闭的对外不公开的特性。因此函数可以构成闭包（函数不是闭包结构）。

##### 2.基本的闭包结构

一般闭包的问题就是想办法间接得获取函数内部数据的使用权，那么我们就可以总结出一个基本的使用模型。

1. 写一个函数，函数内部嵌套一个新函数，返回这个新函数，用新函数获得函数内的数据。
2. 写一个函数，函数内定义一个对象，对象绑定多个方法（函数），返回对象，利用对象的方法访问函数内的数据。

##### 3.闭包作用

闭包不允许外界访问，间接访问闭包中的数据；函数可以构成闭包，需要访问到函数内部的数据。

~~~javascript
function foo(){
	var num = 123;
	return num;
}
var res = foo();
console.log( res );
//return 123
~~~

##### 4.闭包的性能问题
函数执行需要内存，函数中定义的变量会在函数执行结束后自动释放（回收）。凡是因为闭包结构，被引出的数据，如果还有变量引用这些数据的话，那么这些数据就不会被回收。

因此在使用闭包的时候，如果不使用某些数据了，一定要赋值null（释放内存）。
~~~javascript
var f =(function(){
	var num = 123;
	return function(){
		return num;
	};
})();
f = null;
//f引用着函数，函数引用变量num，因此在不使用该函数的时候写上f = null;

练习

//1 闭包的实现形式-姓名输入
function createPerson(){
	var __name__ = "";
	return {
		get_Name: function(){
			return __name__;
		},
		set_Name:function(){
			if(value.charAt( 0 )==='张'){
				__name__ = value;
			} else {
				throw new Error("姓氏出错");
			}
		}
	};
}

var p = new createPerson();

//2 闭包实现形式
function foo(){
	var num = Math.random();
	function func(){
		return num;
	}
	return func;
}
var f = foo();
//f可以直接访问num
var res1 = f();
var res2 = f();
console.log(res1 + '\n' + res2);

//3带有私有数据的函数
var func = function(){ }
function func(){}

var foo = (function(){
	//私有数据
	return function(){
	//可以使用私有的数据
	}；
})();


//练习4
function foo(){
	var num = Math.random();
	return {
		get_num: function(){
			return num;
		},
		set_num:function(value){
			num = value;
		}
	}
}
var o = foo();

var num = o.get_num();
console.log( num );

num = o.get_num();
console.log( num );

num = o.get_num();
console.log( num );


//练习五
var arr = [];
for( var i = 0; i < 10; i ++){
	arr.push( i );
}
for( var i = 0; i < 10; i ++){
	console.log( arr[ i ]);
}

//一般都是将变量的声明全部放到开始的位置，避免出现因为提升而造成的错误

var arr = [], i = 0;
for ( ; i < 10; i ++){
	arr.push( i );
}
for (i = 0 ; i < 10; i ++){
	console.log( arr[ i ]);
}

~~~
