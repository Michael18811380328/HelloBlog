# JS 红宝书
## 00 介绍
全称：JavaScript高级程序设计笔记（红宝书）

注：电子书还是第三版，ES6 不支持，注意知识时效性。

第一次学习大概在 2019 年，第二次学习在 2024年。

电子书链接：[https://cloud.seafile.com/f/54ee4bd82cb4440cbed4/](https://cloud.seafile.com/f/54ee4bd82cb4440cbed4/ "https://cloud.seafile.com/f/54ee4bd82cb4440cbed4/")


## 01 JavaScript 简介
JS 早期时网页交互的程序语言，包括 ECMAScript、BOM、DOM 三部分。

ES分为多个版本，不同浏览器支持不同版本的ES，2021年大部分浏览器支持 ES6（但是少数平台不支持，例如Windows 老版本企业微信内置Chrome53，部分ES6不支持，2022年微信内置的 Chrome 已经升级，支持新语法）。不同浏览器执行 JS 的效果可能不同（浏览器兼容性）。


## 02-在HTML中使用 JavaScript
JS可以是自己服务器写的，也支持其他服务器上的脚本，需要注意是否安全，是否资源路径更改。

不同前端框架下，可能按照功能模块集成，所以 Vue 和 JSX 看起来混合了 HTML 和  JS。

默认 HTML 中按照从上到下的顺序执行 JS 脚本（不使用 defer 和 async 的情况下）。一般把 script 放在最后，先渲染DOM，再执行JS。

script 标签属性：

* async 表示异步下载，异步执行，执行的顺序可能变化（适用于外部资源）。因为异步下载，执行顺序不确定，所以避免异步脚本的互相干扰，避免异步脚本直接更改DOM。

* defer 表示立即下载，但是按照上下文顺序正常执行（适用于外部资源）。

noscript 标签可以在不支持JS的浏览器显示；支持JS的浏览器不显示。


## 03-基本概念
#### 判断类型

typeof 是操作符（类似加号减号），不是函数，所以后面的括号不是必须的，下面两种写法都是正确的。

```
typeof(a)
```

#### 数值

数值：默认情况下，会把小数点后面6个0的浮点数，转换成科学计数法显示。

数值范围：通常不需要监测超出范围。如果执行极大或者极小的计算，可以使用 isFinite 函数判断是否越界。

数值转换：Number(null) 返回 0。parseInt(‘string’, 基数) 把某个变量按照基数进制转换成数值；最好带基数，避免十六进制和八进制的转换。

#### 字符串

字符串：length 返回字符串的长度（如果字符串中有双字节字符，\u03a3，那么 length 属性返回的可能不正确）字符串转换可以使用 toString 和 String。但是 Null 没有第一个方法，最好使用 String() 进行转换。

字符串的比较：实际上不是按照字母表比较，而是按照字符串对应的每个字符编码值进行比较。如果必须比较，那么可以把英文字母转换成大写和小写再比较。比较时（排序）需要注意数据类型和类型转换。

null == undefined 但是 null !== undefined，最好使用全等号

#### 循环

数组循环有顺序，对象循环结果没有顺序，所以 for-in 循环后的结果，可能在不同浏览器内显示不同，需要注意。有顺序的变量不能使用对象存储。其他同事的代码，可能还有类似的问题，使用对象存储，然后 for-in 遍历。

多层循环中（for循环）可以使用 label 标注不同的循环，然后内部 break 或者 continue 可以明确到不同层级的循环（内循环的结束标签对应外部的 label）如果层级复杂，建议使用注释标明，避免多层嵌套。

```
var num = 0; 
```

#### 函数

推荐：函数有返回值（类似严格的TS验证，必须返回一个固定数据类型的值）如果不返回值或者数据类型变化，那么调试函数比较麻烦（原地函数除外）。纯函数和原地函数的取舍。

函数中可以使用 arguments 伪数组获取函数的参数（引用类型）函数的参数个数没有限制，最好是明确的函数参数，而且参数最好小于3个（复杂函数写清楚参数注释）。如果函数参数很多，超过20行，那么这个函数应该拆分成不同的小函数，便于维护。

JS 中没有函数的重载（名称相同的函数，后一个会覆盖前一个）可以通过检测函数的传参，判断函数的功能。这样最好拆分成多个函数。

​

小结：

* ECMAScript 中的基本数据类型包括 Undefined、Null、Boolean、Number 和 String。&#x20;

* ECMScript 没有为整数和浮点数值分别定义不同的数据类型，Number 类型可用于表示所有数值。

* ECMAScript 中也有一种复杂的数据类型，即 Object 类型，该类型是这门语言中所有对象的基础类型。

* 严格模式为这门语言中容易出错的地方施加了限制。

* ECMAScript 提供了很多与 C 及其他类 C 语言中相同的基本操作符，包括算术操作符、布尔操作符、关系操作符、相等操作符及赋值操作符等。

* ECMAScript 从其他语言中借鉴了很多流控制语句，例如 if 语句、for 语句和 switch 语句等。ECMAScript 中的函数与其他语言中的函数有诸多不同之处。

* 无须指定函数的返回值，因为任何函数都可以在任何时候返回任何值。未指定返回值的函数返回的是一个特殊的 undefined 值。

* ECMAScript 中也没有函数签名的概念，因为其函数参数是以一个包含零或多个值的数组的形式传递的。由于不存在函数签名的特性，ECMAScript 函数不能重载。

* 可以向 ECMAScript 函数传递任意数量的参数，并且可以通过 arguments 对象来访问这些参数。

​


## 04-变量、作用域和内存
变量

JS 变量可以在生命周期内的值和数据类型的变化

JS 不能直接访问内存

JS 分为基本类型和引用类型。基本类型存放在栈中，引用类型存放在堆中。复制基本类型和引用类型不同，基本类型直接拷贝一份，引用类型只拷贝一个指针，原变量和新变量都指向同一个内存地址。作为函数参数传递时，也遵循上面的原则（参数是对象的指针，函数内部更改对象，会更改原始的对象）函数内部更改对象的指针时，那么就变成一个局部对象了。

监测类型：typeof 判断简单类型 instanceof 判断复杂类型（或者使用 Array.isArray 判断数组，注意兼容性）

作用域

全局环境和函数环境，构成了全局作用域和函数作用域（局部作用域）。访问一个对象的属性时，通常会递归作用域链，直到找到这个属性为止。

var 创建的变量没有块级作用域，let const 创建的变量有块级作用域。所以在循环中尽量使用 let，现在尽量避免使用 var 定义变量。

GC

GC：找出不使用的变量，然后释放。这个函数间隔执行。技术：标记清除，进入作用域时创建标记，退出作用域时清除标记。定时器会判断没有编辑的内存可以清除，实现 GC。

管理内存：避免内存溢出；一旦数据不再使用，最好设置为 null，解除引用，让其脱离执行环境。下次 GC 可以被回收。

小结

JavaScript 变量可以用来保存两种类型的值：基本类型值和引用类型值。基本类型的值源自以下 5种基本数据类型：Undefined、Null、Boolean、Number 和 String。基本类型值和引用类型值具有以下特点：

* 基本类型值在内存中占据固定大小的空间，因此被保存在栈内存中；从一个变量向另一个变量复制基本类型的值，会创建这个值的一个副本；

* 引用类型的值是对象，保存在堆内存中；包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针；从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终都指向同一个对象；

* 确定一个值是哪种基本类型可以使用 typeof 操作符，而确定一个值是哪种引用类型可以使用instanceof 操作符。

所有变量（包括基本类型和引用类型）都存在于一个执行环境（也称为作用域）当中，这个执行环境决定了变量的生命周期，以及哪一部分代码可以访问其中的变量。以下是关于执行环境的几点总结：

* 执行环境有全局执行环境（也称为全局环境）和函数执行环境之分；

* 每次进入一个新执行环境，都会创建一个用于搜索变量和函数的作用域链；

* 函数的局部环境不仅有权访问函数作用域中的变量，而且有权访问其包含（父）环境，乃至全局环境；

* 全局环境只能访问在全局环境中定义的变量和函数，而不能直接访问局部环境中的任何数据；

* 变量的执行环境有助于确定应该何时释放内存。

JavaScript 是一门具有自动垃圾收集机制的编程语言，开发人员不必关心内存分配和回收问题。可以对 JavaScript 的 GC 作如下总结。

* 离开作用域的值将被自动标记为可以回收，因此将在垃圾收集期间被删除。

* “标记清除”是目前主流的垃圾收集算法，这种算法的思想是给当前不使用的值加上标记，然后再回收其内存。

* 另一种垃圾收集算法是“引用计数”，这种算法的思想是跟踪记录所有值被引用的次数。JavaScript引擎目前都不再使用这种算法；但在 IE 中访问非原生 JavaScript 对象（如 DOM 元素）时，这种算法仍然可能会导致问题。当代码中存在循环引用现象时，“引用计数”算法就会导致问题。

* 解除变量的引用不仅有助于消除循环引用现象，而且对垃圾收集也有好处。为了确保有效地回收内存，应该及时解除不再使用的全局对象、全局对象属性以及循环引用变量的引用。

​


## 05-引用类型
​

#### 对象

使用对象的属性前，可以先判断对象的属性是否存在。获取对象的属性：点语法，中括号语法。点语法适用于大部分情况，中括号语法适合属性是变量的情况。

#### 数组

使用数组的构造函数 new Array 创建数组：如果传参是数字，那么新建一个长度是N的数组，其他情况都是新建第一项是变量的数组。

数组的 length 不是只读的，可以设置这个属性，改变数组（增加的项是 undefined，删除直接类似 pop）这个可以处理 redo undo 的情况，如果存储的操作大于N，那么设置数组的 length = N，把后面多的操作删除掉。

判断数组：Array.isArray&#x20;

数组的排序 sort 会把数组的每一项转换成字符串进行比较（所以直接调用排序就不正确0,1,10,15,5）

#### Data

日期的 API 通常会因为地区不同，输出的结果不同。所以还是使用 moment 处理不同的时间显示。

getFullYear getMonth getDate 返回年月日（月份需要加1）

### Regexp

reg.exec() 获取第一个满足正则表达式的数组（或者没有匹配的null）

Reg.test() 测试一个字符串是否满足正则表达式，返回布尔值

#### Function

函数实际上是一个对象，函数名就是指向对象的指针；一个函数可以有多个函数名（指针）

函数声明 （function fn）和 函数表达式（let a = function()）前者可以做到变量提升，提升到作用域的顶部，那么中间可以直接调用这个函数；函数表达式不会提升（只会提升 a 变量，所以调用函数就会报错）

arguments 是函数内部的伪数组，存储了全部的参数（可以直接获取），同时有一个属性 callee 指向这个函数。function = arguemts.callee 可以用过这种形式，实现函数的递归调用（内部逻辑不会和函数名绑定，避免更改函数名）严格模式下不能使用这种写法。

call(this, arg1, arg2) Apply(this, \[args]) 作用：对象不需要和方法耦合，一个对象可以调用另一个对象的方法

#### Number

toFixd 可以自动四舍五入，适合处理货币

toExponenial 可以返回数字的指数表示法

#### String

charAt charCodeAt slice substring substr

indexOf lastIndexOf trim toLowerCase toUpperCase&#x20;

match(类似正则的 exec) search(类似正则的test方法) split

#### Window

全局对象

encodeURI 主要处理空格 decodeURI&#x20;

encodeURIComponent 主要处理全部的符号并进行转义 decodeURIComponent

#### 小结

对象在 JavaScript 中被称为引用类型的值，而且有一些内置的引用类型可以用来创建特定的对象，

* 引用类型与传统面向对象程序设计中的类相似，但实现不同；

* Object 是一个基础类型，其他所有类型都从 Object 继承了基本的行为；

* Array 类型是一组值的有序列表，同时还提供了操作和转换这些值的功能；

* Date 类型提供了有关日期和时间的信息，包括当前日期和时间以及相关的计算功能；

* RegExp 类型是 ECMAScript 支持正则表达式的一个接口，提供了最基本的和一些高级的正则表达式功能。

* Function 函数实际上是 Function 类型的实例，因此函数也是对象；而这一点正是 JavaScript 最有特色的地方。由于函数是对象，所以函数也拥有方法，可以用来增强其行为。

因为有了基本包装类型，所以 JavaScript 中的基本类型值可以被当作对象来访问。三种基本包装类型分别是：Boolean、Number 和 String。以下是它们共同的特征：

* 每个包装类型都映射到同名的基本类型；

* 在读取模式下访问基本类型值时，就会创建对应的基本包装类型的一个对象，从而方便了数据操作；

* 操作基本类型值的语句一经执行完毕，就会立即销毁新创建的包装对象。

在所有代码执行之前，作用域中就已经存在两个内置对象：Global 和 Math。在大多数 ECMAScript实现中都不能直接访问 Global 对象；不过，Web 浏览器实现了承担该角色的 window 对象。全局变量和函数都是 Global 对象的属性。Math 对象提供了很多属性和方法，用于辅助完成复杂的数学计算任务。


## 08-window
​

### 8.1 window 对象

#### 全局作用域

全局变量不能通过delete删除，而直接在window上定义的的属性可以(定义在window上面的属性在使用结束后需要释放，避免内存泄漏)

```
var age =29;
```

使用 var 语句添加的window属性有一个名为\[\[Configurable]]的特性，这个特性的值被设置为 false，所以无法通过delete删除。

另外，尝试访问未声明的变量会抛出错误，但是通过查询window对象，可以知道某个可能未声明的变量是否存在。

```
var newValue = oldValue; //这里会报错，因为oldValue未定义
```

#### 间歇调用和超时调用

```
var timeoutId = setTimeout(function() {
```

在开发环境下，很少真正的使用间歇调用setInterval，因为后一个间歇调用可能会在前一个间歇调用结束之前启动。

#### 系统对话框

alert(),confirm(),prompt()

这三个方法打开的对话框都是同步和模态的。也就是说，显示这些对话框的时候代码会停止执行。

通常不会直接使用这三个API，而是用过 toaster 等温和的提示，这样不会阻断当前代码执行。

#### location对象

location.replace() 这个方法只接受一个参数，即要导航到的URL,结果会导致浏览器位置的改变，但是不会生成浏览记录。&#x20;

location.reload() 如果不传递任何参数，页面就会以最有效的方式重新加载。也就是说，如果页面自上次请求以来并没有改变过，页面就会从浏览器缓存中重新加载。如果要强制从服务器重新加载。需要输入参数true。

#### navigator对象

#### screen对象

#### history对象

```
history.go(-1)//后退一页
```

​


## 09-客户端检测
客户端检测：客户端检测浏览器并兼容；实际使用不多

早期各种浏览器和版本众多，各种兼容性问题层出不穷，所以需要做客户端监测，处理这部分兼容性问题。如果开发基于主流的 Chrome 最新版，不考虑兼容历史浏览器，客户端检测做的就比较少了。目前项目中，需要检测 MAC 还是 WIndows，移动端，微信内置浏览器这几个（其他浏览器检测不多）

原则：优先使用通用的方法，不到万不得已，不要写兼容的代码（其他的算法或者设计也是这样）

检测方法：

* 能力检测

* 怪癖检测

* 浏览器检测

## 能力监测

不是识别具体的浏览器，而是识别浏览器是否有某个 API。只要判断浏览器是否支持某个 API，就给出解决方案。

注意：一个能力和另一个能力不一定匹配。用哪个能力就检测哪一个能力。

```
function isHostMethod(obj, property) {
```

## 怪癖检测

检测浏览器存在什么特殊行为（例如 Safari 3 会枚举被隐藏的属性）

```
var hasEnumShadowQuick = function() {
```

## 用户代理检测

电子欺骗：浏览器通过在用户代理中加入错误的信息，来欺骗服务器（例如爬虫模拟浏览器发送请求）

用户代理种类繁多，UserAgent 可以识别内核版本、浏览器种类、操作系统、操作系统的具体版本，移动设备，游戏设别等。小公司通常不会处理各种各样的用户代理。详细代码100 行，用时再找。

​

​

​


## 10-DOM
​

### 10.1 结点层次

#### 10.1.1 Node类型

文档结点document是每个文档的根节点，document只有唯一子节点元素。&#x20;

每个结点都有一个nodeType属性，用于表明节点的类型。

```
document.getElementsByTagName('html')[0].nodeType
```

节点的有12个类型，分别由1-12这12个数字表示。&#x20;

例：Node.ELEMENT\_NODE这个值为1。(IE中无效，因为IE没有公开Node类型的构造函数，所以为了跨浏览器兼容，还是将nodeType于相应的数值进行比较)

childNodes
每个结点都有一个childNodes属性，其中保存着一个Nodelist对象，Nodelist是一个伪数组，用于保存一组有序的结点，可以通过位置来访问这些结点。(并非Array实例，他是基于DOM结构动态执行查询的结果)

注意&#x20;
在DOM中childNodes共5个节点类型：Element，Text，Attr，Comment，CDATASection。可用childNodes\[i].nodeType == ELEMENT 对childNodes进行过滤.

```
document.getElementsByTagName('html')[0].childNodes;  //类数组对象，保存一组有序的节点
```

操作结点

someNode.appendChild(newNode)

注意：如果传入的结点已经是该文档的一部分，那结果就是将该结点从原来的位置转移到新的位置，DOM树可以看成是由一系列指针连接起来的，但任何DOM结点也不能同时出现在文档的多个位置

```
someNode.insertBefore(newNode,someNodeChildNode)
```

在使用replaceChild的时候，该结点的所有关系指针都会从被他替换的结点复制过来，尽管从技术上讲，被替换的结点还在文档中，但是他在文档中已经没有自己的位置(removeChild也如此)

someNode.cloneNode(true/false)
normalize()

操作的都是某个结点的子节点(使用parentNode属性).但是并不是所有结点都有子节点，如果在不支持子节点的节点上调用上述方法会报错。

#### 10.1.2 Document类型

在浏览器中document对象是HTMLDocument(继承自Document类型)的一个实例，表示整个html页面&#x20;

* document.getElementById('id')&#x20;

* document.getElementsByTagName("tag")&#x20;

* document.getElementsByName('name')

后两个返回的是HTMLCollection对象和childNodes一样==会跟随当前文档内容的更新而更新==.

document.write() 在页面加载过程中则与writeln一致，如果加载完成后使用则会重写页面
document.writeln()

#### 10.1.3 Element类型

```
element.attributes
```

前2个多在自定义属性中使用

包含一个NamedNodeMap,与childNodes一样，也是一个动态的集合。&#x20;

element.attributes往往在遍历元素的特性时使用，如下，遍历元素特性，并将其构造成&#x20;

name="value",name="value"的形式.

```
function outputAttributes(element){
```

#### 10.1.4 Text类型

document.createTextNode()

#### 10.1.8 Document Fragment

DOM规定文档片段 document fragment是一种“轻量级”的文档，虽然不能把它直接添加到文档中，但是可以把它当成仓库使用。主要用来暂时存储Nodes，用于复制粘贴节点，或者保存上一步的节点。

### 10.2 DOM操作技术

```
var divs = document.getElementsByTagName('div');
```

以上代码，i永远也不会等于divs.length, 因为每次比较时，都将会对现有的div元素进行查询，因此每次div.length会随着i一起递增，永不相等。&#x20;

因此要想迭代Nodelist及其近亲NamedNodeMap和HTMLCollection,则==必须考虑到这三者都是动态的集合==，会实时更新。所以，我们因该尽量减少对这三者的访问，而是将其值用变量缓存起来。

总结

```
document.getElementById('id'); //只可以通过document调用
```

​


## 11-choose
​

### 11.1 选择符

document.querySelector() 查找符合标准的的第一个元素

document.querySelectorAll() 查找符合标准的全部元素的集合

括号中填写 css 选择器，比 getElementBy 更广泛。

​

### 11.2 元素遍历

获取当前元素的父亲、儿子、兄弟元素。

对于元素间的空格，IE9及之前的版本不会返回文本节点，而其他所有浏览器都会返回文本节点。这样就导致了==使用childNodes与firstChild等属性时的行为不一致==。为了弥补这一差异，而同时又保证DOM规范不变，Element Traversal 规范新定义了一组属性。

```
childElementCount //返回子元素(不包括文本节点和注释)的个数
```

​

### 11.3 HTML5 新特性

新增 getElementsByClassName('class')&#x20;

接收一个参数，即一个包含一或多个类名的字符串， 返回带有指定类的所以样元素的NodeList。传入多个类名时，类名的先后顺序不重要。

​

#### 11.3.1 classList

新增 classList 获取某一个元素的类名列表(数组)

```
var div = document.getElementById('div'); //获取元素
```

以往删除一个类名需要如上述代码所示。&#x20;

现在使用下面的简化代码

```
document.getElementById('#wrap').classList.add("main-panel", "mx-1");
```

属性

classList.length 获取当前类名的个数

方法&#x20;

* add('main-panel') 增加n个类名。如果类名已经存在，则不会继续添加(不报错)&#x20;

* contains(value) 判断元素是否具有这个类名，返回布尔值

* remove(value) 删除一个类名，如果类名不存在，不会报错

* toggle(value) 切换一个类名(增减类名)

* item(1) 获取某一个类名(通常直接获取全部类的数组)

​

#### 11.3.2 焦点管理

元素获得焦点的方式有页面加载，用户输入、在代码中使用focus()方法。&#x20;

document.activeElement：这个属性会始终引用DOM中当前获得了焦点的元素。默认情况下，文档刚刚加载完成，指向的是body元素，加载期间为null。&#x20;

document.hasFocus()：用于确定文档是否获得了焦点。

插入标记 innerHTML属性 outerHTML属性 insertAdjacentHTML方法

### 11.4 专有扩展

children属性
由于IE9之前的版本与其他浏览器在处理文本节点中的空白符时有差异，因此出现了children属性。这个属性是HTMLCollection的实例，只包含元素中同样还是元素的子节点。除此之外与childNodes没有什么区别。

contains()方法
出发点：在实际开发中，经常需要知道某个节点是不是另外一个节点的后代。&#x20;
调用contains()方法的应该是祖先节点，这个方法接收一个参数，也就是要检测的后代节点。返回布尔值。

插入文本
innerText 属性
textContent属性
outerText属性

#### 表单的基础知识

##### 获取表单

通过id等方式找到；通过document.forms获取文档对象上所有的表单。

##### 提交表单

用户点击提交按钮或者图像按钮的时候，就会提交表单。&#x20;

\<input type="image" src="./ionic.png">

只要表单上存在提交按钮或者图像按钮，那么在相应表单拥有焦点的时候，按下回车键就可以提交表单。（textarea是例外，会换行）&#x20;

以上述方式提交时，会首先出发submit事件。我们可以通过阻止这个事件的默认行为就可以取消表单提交。

```
var testForm = document.getElementsByClassName('test-form')[0];
```

##### 重置表单

使用type为reset的input或者button可以创建重置按钮，点击会触发reset事件。 一样可以阻止也可以以编程方式触发。与submit不同，reset会触发reset事件。

##### 表单字段

使用原生的DOM方法访问表单元素，每个表单都有elements属性，该属性是表单中所有表单元素的集合。&#x20;
这个elements集合是一个有序列表。另外如果给表单元素添加了name属性，则该元素也会以name暴露给elements集合。&#x20;

所以可以同时以位置和name特性访问。&#x20;
注：如果多个表单元素name相同，则返回一个NodeList。

##### 表单方法

每个表单元元素都有focus()与blur()这两个方法。html5为表单字段新增了一个autofocus属性。&#x20;
\<input type="text" name="first-name" autofocus>

注：在组件 Input 中，这个属性不能直接更改，需要获取内部的ref，然后设置focus。在早期，没有readonly方法，因此可以调用blur()方法来创建只读字段。

##### 表单事件

blur
focus
change 失去焦点且value的值改变时触发&#x20;

注意：blur与change事件在不同浏览器中触发顺序不同。

​

#### 样式

HTML中定义样式的方式有3种：\<link>引入外部样式表文件，使用\<style>元素定义嵌入式样式,以及使用style特性定义针对特定元素的样式。

访问元素的样式
style属性 任何支持style特性的HTML元素在JavaScript中都有一个对应的style属性。包含着通过HTML的style特性指定的所有样式信息，但不包含与外部样式表或嵌入样式表经层叠而来的样式。

计算的样式 getComputedStyle&#x20;
可以获取来自3者的所有计算后得到的样式,但是只读，不可写。&#x20;
getComputedStyle(div).color&#x20;
document.defaultView\.getComputedStyle(div).color&#x20;
getComputedStyle即是window的方法，也是document.defaultView的方法。接收2个参数，第一个为目标元素，第二个为伪类。

操作样式表&#x20;
document.styleSheets包含通过\<link>与\<style>定义的样式表

元素大小
偏移量offset dimension&#x20;
包括元素在屏幕上占用的所有可见的空间，元素的可见大小由其高度和宽度决定，包括所有的内边距，滚动条和边框大小(不包括外边距)。&#x20;
offsetHeight
offsetWidth
offsetLeft
offsetTop&#x20;
其中，offsetTop与offsetLeft与包含元素有关，包含元素的引用保存在offsetParent属性中。&#x20;
offsetParent属性不一定与parentNode的值相等。例如，元素的offsetParent是作为其祖先元素的元素，因为
是在DOM层次中距
最近的一个具有大小的元素。

```
//想要获取某个元素在页面上的偏移量，需要将这个元素的偏移量与其offsetParent的偏移量相加，循环到根元素
```

客户区大小

client dimension&#x20;
元素的客户区大小指的是元素内容及其内边距所占据的空间大小。

clientWidth
clientHeight
滚动大小 scroll dimension

scrollHeight //在没有滚动调到情况下，元素内容的总高度
scrollWidth
scrollLeft
scrollTop

元素大小 getBoundingClientRect

​

遍历
document.NodeIterator&#x20;
document.createTreeWalker(root,NodeFilter.SHOW\_ELEMENT,filter,false)&#x20;

这两个方法现在使用不多

另外还有两个方法：nextNode() previousNode()

TreeWalker
TreeWalker是NodeIterator的高级版本。并额外提供了5种方法。

parentNode()
firstChild()
lastChild()
nextSibling()
previousSibling()

范围

document.createRange() 在创建范围的时候，内部会为这个范围创建一个文档片段，范围所属的全部节点都被添加到了这个文档的片段之中。


## 22-高级用法
深入讲解了一些 JavaScript 中较复杂的模式，包括函数柯里化（currying）、部分函数应用和动态函数。这一章还讨论了如何创建自定义的事件框架和使用 ECMAScript 5 创建防篡改对象。

### 22.1 高级函数

##### 22.1.1 类型检测

typeof，instanceof 并非完全可靠。解决办法，利用 Object.prototype.toString.call(value)

##### 22.1.2 作用域构造函数

```
function Person(name,age,job){ 
```

##### 22.1.3 惰性载入函数

问题
因为浏览器之间行为的差异，多数 JavaScript 代码包含了大量的if语句，将执行引导到正确的代码中。 每次调用时，都要多浏览器所支持的能力仔细检查，但是如果支持则一直支持，没必要每次都进行能力检查。

解决方案：惰性载入

第一种：在第一次调用的过程中，将函数覆盖为另外一个合适的方式执行的函数，这样任何对原函数的调用都不要再进过执行的分支了。

```
function createXHR(){
```

第二种：在声明函数时就指定适当的函数，但是在代码首次加载时会损失一点性能。

```
var createXHR = (function(){
```

##### 22.1.4 函数绑定

```
var handler = {
```

##### 22.1.5 函数柯里化

用于创建已经设置好了一个或者多个参数的函数。

```
function curry(fn){
```

### 22.2 防篡改对象

22.2.1 不可扩展对象

22.2.2 密封的对象

22.2.3 冻结的对象

分别对应下面三个例子

```
Object.preventExtensions(person);  // person这个对象禁止扩展
```

### 22.3 高级定时器

除了主 JS 线程外，还有一个需要在进程下一次空闲时执行的代码队列。在JavaScript中没有任何代码是立刻执行的， 当进程一旦空闲则尽快执行。

##### 22.3.1 重复的定时器

setInterval()的问题在于，定时器代码，可能在代码再次添加到队列之前，还没有完成执行，结果导致定时器代码运行好几次，而且之间没有停顿。

幸好，JavaScript引擎足够聪明，能够避免这个问题。

当使用setInterval()时，仅当没有该定时器的任何其他代码实例时，才将定时器代码添加到队列中。

这确保了定时器代码加入到队列中的最小时间间隔为指定间隔。

因此这样的重复定时器有两个问题：某些间隔会被跳过；多个定时器的代码执行之间的间隔可能会比预期小。

为了解决以上问题，可以采用链式setTimeout()调用

```
setTimeout(function () {
```

以上方式的好处在于，在前一个定时器代码执行完之前，不会向队列插入新的定时器代码，确保不会有任何缺失的间隔。而且，可以保证在下一次定时器代码执行之前，至少等待指定的间隔，避免了连续的运行。

##### 22.3.2 yieldng processes

长时间运行脚本的限制，如果代码运行超过特定的时间或者特定的语句数量就不让它继续执行。 主要产生原因有：过长的，过深嵌套的函数调用或者是进行大量处理的循环。

数组分块

```
function chunk(array,process,context) { //如果想原array不被修改，可以使用array.concat()
```

##### 22.3.3 函数节流

浅谈javascript的函数节流 基本思想：某些代码不可以在没有间断的情况连续重复执行。

```
function throttle(method,context){
```

### 22.4 自定义事件

事件是一种叫做观察者的设计模式。观察者模式主要由两类对象组成：主体和观察者。

主体负责发布事件，同时观察者通过订阅这些事件来观察主体。

自定义事件背后的概念是创建一个管理事件的对象，让其他对象监听那些事件。

```
function EventTarget(){
```

### 22.5 拖放

```
var DragDrop = function () {
```

​


## 23-离线应用与客户端存储
讨论了如何检测应用离线以及在客户端机器中存储数据的各种技术。先从受到最广泛支持的特性 cookie 谈起，继而介绍了新兴的客户端存储技术，如 Web Storage 和 IndexedDB。


## 24-最佳实践
​

### 24.1 可维护性

* 可维护性：可理解性、直观性、可适应性、可扩展性、可调试性。

* 代码约定：可读性 、注释，合理的缩进、有意义的变量和函数命名。一般命名规则：变量名应该为名词；函数名应该动词开始。

* 松散耦合：解耦html、css、JavaScript、解耦应用逻辑与事件处理程序

* 编程实践：尊重对象所有权（如果你不负责创建或者维护某个对象，那么就别对他们进行修改）、避免全局变量、避免与null进行比较、使用常量（将数据从应用逻辑中分离出来，以方便修改与国际化）

### 24.2 性能

#### 24.2.1 注意作用域

避免全局查找：访问全局变量，总是要比访问局部变量慢，因为需要遍历作用域链。我们可以将多次使用的全局变量存储于局部变量。

#### 24.2.2 选择正确的算法

避免不必要的属性查找&#x20;

使用变量和数组要比访问对象的属性更有效率，后者是一个O(n)的操作

优化循环 减值迭代

简化终止条件 简化循环体

避免双重解释–避免出现需要按照JavaScript来解释的字符串

#### 24.2.3 最小化语句数

多个变量声明；使用数组和对象字面量创建（这个因人而异，我觉得分开写比较好，ES6 出来后需要使用 let const 区分）。

```
// bad
```

#### 24.2.4 优化DOM交互

最小化更新

使用文档碎片 Fragment

使用 innerHTML ：当把 innerHTML设置为某个值时，后台会创建一个html解析器，然后使用内部的DOM调用来创建DOM结构；而非基于JavaScript的DOM调用。

使用事件代理

注意HTMLCollection：任何时候要访问HTMLCollection，都会在文档上进行一次查询，最小化访问HTMLCollection 可以极大的改进性能。发生以下情况时，会返回HTMLCollection：进行了对getElementsByTagName()的调用；获取了元素的childNodes属性；获取的元素的attributes属性；访问了特殊的集合，如document.forms,document.images。

#### 24.2.5 事件流

事件流描述的是从页面中接收事件的顺序。IE的事件流是事件冒泡流，Netscape的事件流是事件捕获流。&#x20;

事件冒泡：嵌套最深的结点最先接收事件。&#x20;

事件捕获：document 对象最先接收事件。

##### DOM0级事件处理程序

将一个函数赋值给一个事件处理程序属性。以这种方式添加的事件处理程序会在冒泡阶段被处理。

```
document.getElementById('myButton').onclick = function(){
```

注意，在这些代码运行以前不会指定事件处理程序，因此如果这些代码在页面中位于按钮后面，就有可能在一段时间内怎么单击都没有反应。&#x20;

使用DOM0级方法指定的事件处理程序被认为是元素的方法。因此，这时候的事件处理程序是在元素的作用域中运行，换句话说，程序中的this引用当前元素。

##### DOM2级事件处理程序

addEventListener与removeEventListener：使用DOM2级方法的好处在于可以为同一个事件添加多个事件处理程序。 使用addEventListener添加的事件处理程序，只能用removeEventListener删除，且匿名函数无法删除。

##### IE事件处理程序

IE实现了与DOM中类似的两个方法：attachEvent() 与detachEvent() 只接受2个参数，IE只提供冒泡流。 与DOM0级方法的主要区别在于事件处理程序的作用域。

在使用attachEvent()方法的情况下，事件处理程序会在全局作用域中运行，此时this等于window。

```
document.getElementById('myButton').attachEvent("onclick",function(){
```

同时，IE的事件处理程序不是以添加他们的顺序执行，而是以相反的顺序被触发。&#x20;

在Javascript中定义一个函数，有两种写法： function foo() { } 和 var foo = function () { }&#x20;

两种写法完全等价。但是在解析的时候，前一种写法会被解析器自动提升到代码的头部，因此违背了函数应该先定义后使用的要求，所以建议定义函数时，全部采用后一种写法。

​

#### 24.2.6 内存与性能

在每个对象上绑定事件，即会增加dom的访问次数，而且也会大大增加event对象，造成内存占用。所以想要提高性能，就会用到委托事件。&#x20;

建立在冒泡机制之上的事件委托技术，可以有效的减少事件处理程序的数量，能够大大的提高性能，减少内存消耗。&#x20;

在两种情况下，需要注意移除事件处理程序，第一种就是从文档中移除带有事件处理程序的元素时，第二种情况是卸载页面的时候。

利用事件委托实现事件在HTML页面中的可配置

注意：DOM 更改 ID 时需要同步更改 JS 中的 ID

```
var list = document.getElementById("mylinks");
```

事件模拟

事件模拟分为：&#x20;

* UIEvents&#x20;

* MouseEvents&#x20;

* MutationEvents 突变事件

* HTMLEvents

```
var btn = document.getElementById("myButton");
```

​


