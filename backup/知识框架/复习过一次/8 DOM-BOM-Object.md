#### DOM

##### 1.DOM 介绍

DOM 是文档对象模式，分为 XML 和 HTML 两种类型 DOM。当前学习 HTML 的 DOM。

HTML DOM 是使用 JS 操作和访问文档的标准和方法，是中立于平台和语言的接口（API 应用程序接口），它允许程序和脚本动态地访问和更新文档的内容、结构和样式。

##### 2.node 节点

节点分类（节点树）：文档节点（document）、元素节点（element node-——HTML）、文本节点（txt）、属性节点（href）、注释节点。节点元素内容可以修改，可以增加或者减少节点。

节点之间的关系（parent-child-brother）sibing（同胞节点）分析不同节点的关系。

根节点是 HTML，叶节点是末端的 node（没有子节点）。

注意：元素节点不包含内部的文本节点，使用 innerHTML 的方法获得内部的文本节点。

##### 3.DOM 方法

HTML 中每一个 element 是一个 object，方法是执行的动作（增加删除节点），属性是获得的值（innerHTML）

常用方法

获取元素：document.getElementById（"banner"）;（TagName）（ClassName）

获得属性：document.getAttribute（）；

设置属性：document.setAttribute（）；

下面的之前都加上 document

插入新的子节点：appendChild（node）

移除子节点：removeChild（node）

替换子节点：replaceChild（node）

在指定子节点前插入新的子节点：insertBefore（node）

创建元素节点：createElement（）

创建属性节点：createAttribute（）

创建文本节点：createTextNode（）

##### 4.DOM 属性

4.1 常用属性

获得内部文本：innerHTML

获得属性：attributes

获得子节点：childNode

获得父节点：parentNode

4.2 节点名称的属性（node Name 属性）

文档节点：#document

元素节点：与元素名称相同

属性节点：与属性名称相同

文本节点：#text

4.3 节点值的属性（node Value 属性）

元素节点值的属性：null 或者 undefined

属性节点值的属性：属性自身

文本节点值的属性：文本自身

```html
<html>
  <body>
    <p id="intro">Hello World!</p>

    <script type="text/javascript">
      x = document.getElementById("intro");
      document.write(x.firstChild.nodeValue);
      document.wrute(x.firstChild.nodeName);
    </script>
  </body>
</html>

//Hello World //#text
```

4.4 节点的类型（node type）

元素（1）属性（2）文本（3）注释（8）文档（9）

##### 5.DOM 修改

5.1 改变 HTML 内容——innerHTML= "context";

5.2 改变 CSS 样式——document.getElementById("para").style.color="blue";

5.3 创建新的 HTML 元素

五步：创建新的元素节点-创建新的文本节点（如果有文本）-链接新建的元素节点和文本节点-寻找已有的元素节点-链接新的元素节点和找到的元素节点。

```html
<div id="d1">
  <p id="p1">This is a paragraph.</p>
  <p id="p2">This is another paragraph.</p>
</div>

<script>
  // 改变HTML内容
  document.getElementById("p1").innerHTML = "Bingo";
  // 改变HTML样式
  document.getElementById("p1").style.color = "red";

  // 创建标签、创建节点、链接标签和节点
  var para = document.createElement("div");
  var node = document.createTextNode("this is HTML DOM");
  para.appendChild(node);

  //将已经创建好的内容增加到已有的文本中
  var bingo = document.getElementById("p1");
  bingo.appendChild(para);

  //直接创建元素节点（br元素节点内部无文本节点）
  var br = document.createElement("br");
  //直接链接原始元素节点和新建元素节点
  bingo.appendChild(br);
</script>
```

5.4 DOM：通过事件更改内容

通过事件，调用函数，改变样式和内容。

```html
<body>
  <!-- 通过点击按钮，执行函数，更改页面背景颜色 -->
  <input
    type="button"
    onClick="changeColor()"
    value="change background color"
  />
  <br />
  <input
    type="button"
    onClick="changeButtonColor()"
    value="change button color"
    id="button1"
  />
  <script>
    //使用数组定义颜色 i是全局变量
    var array = ["red", "blue", "pink", "yellow", "brown"];
    var i = 0;

    //改变全局背景颜色
    function changeColor() {
      document.body.style.backgroundColor = "lavender";
    }

    //改变按钮文字颜色，循环执行按钮
    function changeButtonColor() {
      document.getElementById("button1").style.color = array[i];
      i++;
    }
  </script>
</body>
```

5.5 删除元素

必须找到子元素和父元素，这样才能删除元素。（找到 P 类中的 new 子元素并删除）

```javascript
var child = getElementByClass("p");
var child = getElementById("new");
parent.removeChild(child);
```

注：删除一个元素必须清楚它的父元素，如果不清楚，可以使用 parentNode 查找父元素

```javascript
child.parentNode.removeChild(child);
```

替换元素也需要查找子元素和父元素，使用 replaceChild（newChild ,oldChild）方法替换元素。

##### 6.DOM 事件

用户触发事件：鼠标移动点击、输入提交表单、触发按钮

onclick/onmouseover /onmouseout /onmousedown/onmouseup

浏览器触发事件：页面图片加载、表单提交 onload onunload onchange

##### 7.DOM 数组

document.getElementByClass 或者 document.getElementByTagName 可以获得一系列对象构成的数组。通过选择数组的具体下标可以更改特定的对象。

var array = document.getElementByTagName("p");

document.write(array[2].innerHTML);

特殊情况：访问根节点

document.documentElement 全部文档

document.body 文档的主体

```javascript
document.write(document.body.innerHTML);
//输入文档中全部内容
```

#### BOM

##### 1.BOM

BOM（browser object model）浏览器对象模型：浏览器和 JavaScript 交互的方法和属性

##### 2.window

2.1 window 对象

浏览器窗口就是 window 对象，其中**全局函数**是 window 对象的方法，**全局变量**时 window 对象的属性。

DOM 也是 window 的属性：var a = window.document.getElementById("para");

2.2 window 尺寸

```javascript
var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var h=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
兼容不同浏览器（ie9+，其他四种浏览器）——（ie5-8后两种兼容）
window尺寸不包括工具栏和滚动条
```

2.3 window 方法

```javascript
window.open();
window.close();
window.moveTo();
移动窗口;
window.resizeTo();
改变窗口的尺寸;
```

##### 3.screen

可以说省略 window，直接写 screen。方法：screen.availWidth screen.availHeight（可以访问的屏幕高度宽度）

##### 4.location

location 对象用于获得当前页面的地址（URL），并将浏览器重新定向到新的页面。

location.hostname 返回 web 主机的域名

locaton.pathname 返回当前页面的路径和文件名

location.port 返回 web 主机的端口

location.protocal 返回所使用的 web 协议（HTTP 或者 https）

location.href 返回当前页面的整个 URL

location.assign(URL) 加载新的文档

##### 5.history

浏览器的历史（可以省略 window 前缀）

类似于浏览器中的前进和后退按钮。用于保护用户隐私，这个对象有一定限制。

history.back( )

history.forward( )

##### 6.navigator

浏览器的信息（浏览器的版本和信息等）

注：navigator 对象的信息可能误导，不应该用于检测浏览器的版本。navigator 的数据可能被浏览器使用者更改，浏览器无法报告晚于浏览器发布的新的操作系统。

navigator 可以嗅探不同的浏览器（不同浏览器支持不同的对象，可以使用对象来检测浏览器）

##### 7.time

计时事件：设定一个时间间隔，在这个时间之后执行函数。**触发器**：点击按钮；页面加载等。

var t = setTimeout("程序语句",毫秒 )；开始计时

clearTimeout(t)；结束计时

```html
<input type="button" onclick="time()" value="开始计时" id="input1" />
<input type="button" onclick="timeend()" value="结束计时" id="input2" />
<script>
  var t;
  var i = 0;
  function time() {
    t = setTimeout("changeColor()", 1000);
    // 一秒后执行函数changeColor
  }
  function changeColor() {
    var arr = ["red", "green", "blue", "purple", "black", "brown", "white"];
    document.body.style.backgroundColor = arr[i];
    i++;
  }
  function timeend() {
    clearTimeout(t);
  }
</script>
```

递归计时器（每隔一秒执行一次函数）

```html
<h2 id="para">时间开始</h2>
<input type="button" onclick="change()" value="开始" />
<script>
  var i = 0;
  var t;
  function change() {
    document.getElementById("para").innerHTML = i;
    i++;
    var t = setTimeout("change()", 1000);
  }
  //注意setTimeout函数中参数代码需要加引号！
  //setTimeout自身就是根据时间执行，使用函数递归相当于循环，不需要继续使用for循环。
  //函数不需要设置返回值，直接自己调用自己即可，每一秒调用一次函数。
</script>
```

##### 8.cookies

cookie 是浏览器在本地的缓存，为了下一次访问网页快速设置的加密的数据（包括用户的账号和密码等敏感信息）所以部分浏览器清除 cookie 或者禁止使用 cookies（单复数均可以）删除 cookies 会减慢浏览器的访问速度。如果网速很好就可以删除 cookies，如果网速不好不建议删除全部 cookies（重新加载网页很慢）。

cookies 与 HTML5 中的存储机制相关，分为 local storage 和 session storage 两种。具体操作在网站上有详细介绍-需要的时候再学习这部分内容。

#### Object

##### 1.对象的属性方法

object 的基本内容在视频教程中已经详细讲授，在此简单回顾：JavaScript 中所有事物都是对象，重点学习 array-string-function 等对象，以上都属于内建对象，用户可以自定义对象。对象是具有方法和属性的特殊的数据类型。

##### 2.创建对象

方法一：定义并创建对象（对象较少）；

```javascript
var person = new Object();
person.age = "16";
//或者下面的形式
person = { age: "16" };
```

方法二：使用函数定义对象，然后创建新的对象实例（很多对象，常用方法）。

```javascript
function Person(name, age, color) {
  //定义对象的属性
  this.name = name;
  this.age = age;
  this.color = color;

  //定义对象的方法
  this.changeName = changeName;
  function changeName(name) {
    this.name = name;
  }
  //或者下面的方式定义方法-匿名函数
  this.changeName = function (name) {
    this.name = name;
  };
}

创建对象;
var myFriend = new Person("Bill", 12, "red");
```

##### 3.Number 对象

计算：JavaScript 中的数字不分具体类型，整数和小数都可以输入，较大和较小的数使用科学计数法表示。小数精确计算可能不正确，所以不建议小数直接计算或者比较大小。如果数字是 0 开头，JS 默认按照 8 进制存储数值。

number 对象的属性和方法可以查阅资料（常用的是数值转换）toString（）

##### 4.String 对象——重点

string.length 表示字符串的长度；

string.toUpperCase（）；表示将文本转化为大写形式；

string.indexOf（）；记录字符串中某个字符出现的索引；

match（）；字符串中内容和给定内容是否匹配；

replace（）；替换字符串；

字符串的方法有 30 多个，实际需要的时候查询（现在有个印象）

##### 5.Date 对象

日期对象用于处理日期和时间

日期对象的方法有 30 多个，以下为常用的方法：

Date（）；返回当日的日期和时间

getTime（）；返回从 1970 年至今的时间（毫秒）

setFullYear（year,month,day）；设置当前时间

显示星期，显示时间等

##### 6.Array 对象——重点

数组对象很重要！面试常考！===要求熟记下面的所有方法===

###### 6.0 array 属性

array.length 数组的长度

array.prototype 添加数组的属性和方法

###### 6.1 concat 连接

把数组和参数，数组和数组，多个数组连接

arr1.concat(4,5); 将 arr1 与参数 4,5 连接

arr1.concat(arr2,arr3);将数组 123 连接

###### 6.2 join 放入

join 将数组转化为字符串（separater）

arr1.join(.); 将数组 1 中元素连接成一个字符串，使用括号后的参数作为分隔符

###### 6.3 pop 删除最后

删除并输出数组的最后一个元素（数组的长度减少 1）数组 pop 爆炸了，最后一个元素删除了。

```JavaScript
document.write(arr.pop())
```

###### 6.4 push 增加最后

arr.push(num1,num2);

在数组最后增加一个元素（数组的长度增加）

pop 和 push 说明数组的特点：先进后出

###### 6.5 reverse 翻转

arr.reverse(); 翻转整个数组

###### 6.6 shift 删除最前

shift 删除并返回数组的第一个元素，数组对象的长度会变化（直接新建一个数组对象）。如果数组是空的，返回 undefined。shift 和 pop 的区别。

###### 6.7 slice 返回指定位置元素

arr1.slice(start,end)

start：必须有，从数组哪个下标开始选择（如果是负数，就是从尾部向前选择）

end：可以有，表示数组结束处的下标（不包括下标这个元素）

返回一个新的数组，原始数组不改变。

arr.slice(2,5) 返回 arr[2],arr[3],arr[4]

###### 6.8 sort 排序

arr.sort(function)

function 可以选择，必须是数组。默认空值表示按照字母顺序进行排序。排序在原始的数组进行排序，不会产生新的数组。

注意：数字排序

如果直接使用 sort（）就是将数字转化为字符串进行排序（并不是按数值排序）；实际上需要使用 sortNumber 函数。

arr.sort(sortNumber) 按照数值从小到大排序

###### 6.9 splice 删除增加元素

arr.splice(index,how many, item)

index:删除的位置，负数表示从后向前计算

how many：删除的数量，如果是 0，不删除，直接在这个位置增加元素

item：在某个位置增加的元素

splice 方法会直接改动数组。

返回值：删除的数组元素

###### 6.10 toString 返回字符串

返回值与没有参数的 join 方法相同

###### 6.11 unshift 增加最前

和 push 方法类似。

unshift（item）；方法在数组开始增加一个元素，返回值是数组的长度。

兼容性：ie 浏览器不兼容

##### 8.Math 对象

属性（常见的数学特殊数字）

E、LN2、LN10、LOG2E、LOG10E、PI、SORT2

方法（常用的算术计算方法）

max-min-abs-ceil-floor-exp-log-三角函数-random-power(x,y)-round-sqrt
