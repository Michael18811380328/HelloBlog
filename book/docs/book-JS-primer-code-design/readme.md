# JavaScript高级程序设计（红宝书）

注：现在看的第三版，ES5 和 ES6 不支持。这部分参考其他书籍。



## 第一章 JavaScript 简介

JS 设计之初为网页交互的程序语言。

主要包括 ECMAScript、BOM、DOM 三部分。

ES分为多个版本，不同浏览器支持不同版本的ES，2021年大部分浏览器支持 ES6（但是少数平台不支持，例如Windows 企业微信内置Chrome53，部分ES6不支持）。不同浏览器执行 JS 的效果可能不同。



## 第二章 在 HTML 中使用 JavaScript 

HTML 中使用JS，可以在HTML内部嵌入，或者是外部文件导入（使用 src 属性指向外部的资源，推荐这个写法，便于 HTML 和 JS 分别维护）。外部的JS可以是自己服务器上的脚本，也支持其他服务器上的脚本，此时要注意是否安全。

不同框架下，可能按照功能模块完成，所以 Vue 和 JSX 看起来混合写入了 HTML 和  JS。

默认 HTML 中按照从上到下的顺序执行 JS 脚本（不使用 defer 和 async 的情况下）。一般把 script 放在最后，先渲染DOM，再执行JS。

script 标签：

async 表示异步下载，异步执行，执行的顺序可能变化（适用于外部资源）。因为异步下载，执行顺序不确定，所以避免异步脚本的互相干扰，避免异步脚本直接更改DOM。

defer 表示立即下载，但是按照上下文顺序正常执行（适用于外部资源）。

noscript 标签可以在不支持JS的浏览器显示；支持JS的浏览器不显示。



## 第三章 基本概念

判断类型：typeof 是操作符（类似加号减号），不是函数，所以后面的括号不是必须的，下面两种写法都是正确的。

~~~js
typeof(a)
typeof a
~~~

数值：默认情况下，会把小数点后面6个0的浮点数，转换成科学计数法显示。数值范围：通常不需要监测超出范围。如果执行极大或者极小的计算，可以使用 isFinite 函数判断是否越界。数值转换：Number(null) 返回 0。parseInt(‘string’, 基数) 把某个变量按照基数进制转换成数值；最好带基数，避免十六进制和八进制的转换。

字符串：length 返回字符串的长度（如果字符串中有双字节字符，\u03a3，那么 length 属性返回的可能不正确）字符串转换可以使用 toString 和 String。但是 Null 没有第一个方法，最好使用 String() 进行转换。

字符串的比较：实际上不是按照字母表比较，而是按照字符串对应的每个字符编码值进行比较。如果必须比较，那么可以把英文字母转换成大写和小写再比较。比较时（排序）需要注意数据类型和类型转换。

null == undefined 但是 null !== undefined，最好使用全等号



循环：数组有顺序，对象没有顺序，所以 for-in 循环后的结果，可能在不同浏览器内显示不同。有顺序的变量不能使用对象存储。

多层循环中（for循环）可以使用 label 标注不同的循环，然后内部 break 或者 continue 可以明确到不同层级的循环（内循环的结束标签对应外部的 label）如果层级复杂，建议使用注释标明，避免多层嵌套。

~~~js
var num = 0; 
outermost: 
for (var i=0; i < 10; i++) { 
  for (var j=0; j < 10; j++) { 
    if (i == 5 && j == 5) { 
      break outermost; 
    } 
    num++; 
  } 
} 
alert(num); //55
~~~

函数

推荐函数最好返回值（类似严格的TS验证，必须返回一个固定数据类型的值）如果不返回值或者数据类型变化，那么调试函数比较麻烦。

函数中可以使用 arguments 伪数组获取函数的参数（这是一个引用类型）函数的参数个数没有限制，最好是明确的函数参数，而且参数最好小于3个。如果函数参数很多，超过20行，那么这个函数应该拆分成不同的小函数，便于维护。

JS 中没有函数的重载（名称相同的函数，后一个会覆盖前一个）可以通过检测函数的传参，判断函数的功能。这样最好拆分成多个函数



小结：

- ECMAScript 中的基本数据类型包括 Undefined、Null、Boolean、Number 和 String。 

- 与其他语言不同，ECMScript 没有为整数和浮点数值分别定义不同的数据类型，Number 类型可用于表示所有数值。

- ECMAScript 中也有一种复杂的数据类型，即 Object 类型，该类型是这门语言中所有对象的基础类型。

- 严格模式为这门语言中容易出错的地方施加了限制。

- ECMAScript 提供了很多与 C 及其他类 C 语言中相同的基本操作符，包括算术操作符、布尔操作符、关系操作符、相等操作符及赋值操作符等。

- ECMAScript 从其他语言中借鉴了很多流控制语句，例如 if 语句、for 语句和 switch 语句等。ECMAScript 中的函数与其他语言中的函数有诸多不同之处。

- 无须指定函数的返回值，因为任何函数都可以在任何时候返回任何值。未指定返回值的函数返回的是一个特殊的 undefined 值。

- ECMAScript 中也没有函数签名的概念，因为其函数参数是以一个包含零或多个值的数组的形式传递的。由于不存在函数签名的特性，ECMAScript 函数不能重载。

- 可以向 ECMAScript 函数传递任意数量的参数，并且可以通过 arguments 对象来访问这些参数。






## 第四章 变量、作用域和内存问题 

**变量**

JS 变量可以在生命周期内的值和数据类型的变化

JS 不能直接访问内存

JS 分为基本类型和引用类型。基本类型存放在栈中，引用类型存放在堆中。复制基本类型和引用类型不同，基本类型直接拷贝一份，引用类型只拷贝一个指针，原变量和新变量都指向同一个内存地址。作为函数参数传递时，也遵循上面的原则（参数是对象的指针，函数内部更改对象，会更改原始的对象）函数内部更改对象的指针时，那么就变成一个局部对象了。

监测类型：typeof 判断简单类型 instanceof 判断复杂类型（或者使用 Array.isArray 判断数组，注意兼容性）

**作用域**

全局环境和函数环境，构成了全局作用域和函数作用域（局部作用域）。访问一个对象的属性时，通常会递归作用域链，直到找到这个属性为止。

var 创建的变量没有块级作用域，let const 创建的变量有块级作用域。所以在循环中尽量使用 let，现在尽量避免使用 var 定义变量。

**GC**

GC：找出不使用的变量，然后释放。这个函数间隔执行。技术：标记清除，进入作用域时创建标记，退出作用域时清除标记。定时器会判断没有编辑的内存可以清除，实现 GC。

管理内存：避免内存溢出；一旦数据不再使用，最好设置为 null，解除引用，让其脱离执行环境。下次 GC 可以被回收。

**小结**

JavaScript 变量可以用来保存两种类型的值：基本类型值和引用类型值。基本类型的值源自以下 5种基本数据类型：Undefined、Null、Boolean、Number 和 String。基本类型值和引用类型值具有以下特点：

- 基本类型值在内存中占据固定大小的空间，因此被保存在栈内存中；从一个变量向另一个变量复制基本类型的值，会创建这个值的一个副本；

- 引用类型的值是对象，保存在堆内存中；包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针；从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终都指向同一个对象；


- 确定一个值是哪种基本类型可以使用 typeof 操作符，而确定一个值是哪种引用类型可以使用instanceof 操作符。

所有变量（包括基本类型和引用类型）都存在于一个执行环境（也称为作用域）当中，这个执行环境决定了变量的生命周期，以及哪一部分代码可以访问其中的变量。以下是关于执行环境的几点总结：

- 执行环境有全局执行环境（也称为全局环境）和函数执行环境之分；

- 每次进入一个新执行环境，都会创建一个用于搜索变量和函数的作用域链；

- 函数的局部环境不仅有权访问函数作用域中的变量，而且有权访问其包含（父）环境，乃至全局环境；

- 全局环境只能访问在全局环境中定义的变量和函数，而不能直接访问局部环境中的任何数据；

- 变量的执行环境有助于确定应该何时释放内存。

JavaScript 是一门具有自动垃圾收集机制的编程语言，开发人员不必关心内存分配和回收问题。可以对 JavaScript 的垃圾收集例程作如下总结。

- 离开作用域的值将被自动标记为可以回收，因此将在垃圾收集期间被删除。

- “标记清除”是目前主流的垃圾收集算法，这种算法的思想是给当前不使用的值加上标记，然后再回收其内存。

- 另一种垃圾收集算法是“引用计数”，这种算法的思想是跟踪记录所有值被引用的次数。JavaScript引擎目前都不再使用这种算法；但在 IE 中访问非原生 JavaScript 对象（如 DOM 元素）时，这种算法仍然可能会导致问题。当代码中存在循环引用现象时，“引用计数”算法就会导致问题。

- 解除变量的引用不仅有助于消除循环引用现象，而且对垃圾收集也有好处。为了确保有效地回收内存，应该及时解除不再使用的全局对象、全局对象属性以及循环引用变量的引用。



## 第五章 引用类型

#### 对象

使用对象的属性前，可以先判断对象的属性是否存在。获取对象的属性：点语法，中括号语法。点语法适用于大部分情况，中括号语法适合属性是变量的情况。

#### 数组

使用数组的构造函数 new Array 创建数组：如果传参是数字，那么新建一个长度是N的数组，其他情况都是新建第一项是变量的数组。

数组的 length 不是只读的，可以设置这个属性，改变数组（增加的项是 undefined，删除直接类似 pop）这个可以处理 redo undo 的情况，如果存储的操作大于N，那么设置数组的 length = N，把后面多的操作删除掉。

判断数组：Array.isArray 

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

call(this, arg1, arg2) Apply(this, [args]) 作用：对象不需要和方法耦合，一个对象可以调用另一个对象的方法

#### Number

toFixd 可以自动四舍五入，适合处理货币

toExponenial 可以返回数字的指数表示法

#### String

charAt charCodeAt slice substring substr

indexOf lastIndexOf trim toLowerCase toUpperCase 

match(类似正则的 exec) search(类似正则的test方法) split

#### Window

全局对象

encodeURI 主要处理空格 decodeURI 

encodeURIComponent 主要处理全部的符号并进行转义 decodeURIComponent

#### 小结

对象在 JavaScript 中被称为引用类型的值，而且有一些内置的引用类型可以用来创建特定的对象，

- 引用类型与传统面向对象程序设计中的类相似，但实现不同；

- Object 是一个基础类型，其他所有类型都从 Object 继承了基本的行为；

- Array 类型是一组值的有序列表，同时还提供了操作和转换这些值的功能；

- Date 类型提供了有关日期和时间的信息，包括当前日期和时间以及相关的计算功能；

- RegExp 类型是 ECMAScript 支持正则表达式的一个接口，提供了最基本的和一些高级的正则表达式功能。

- Function 函数实际上是 Function 类型的实例，因此函数也是对象；而这一点正是 JavaScript 最有特色的地方。由于函数是对象，所以函数也拥有方法，可以用来增强其行为。

因为有了基本包装类型，所以 JavaScript 中的基本类型值可以被当作对象来访问。三种基本包装类型分别是：Boolean、Number 和 String。以下是它们共同的特征：

- 每个包装类型都映射到同名的基本类型；
- 在读取模式下访问基本类型值时，就会创建对应的基本包装类型的一个对象，从而方便了数据操作；
- 操作基本类型值的语句一经执行完毕，就会立即销毁新创建的包装对象。

在所有代码执行之前，作用域中就已经存在两个内置对象：Global 和 Math。在大多数 ECMAScript实现中都不能直接访问 Global 对象；不过，Web 浏览器实现了承担该角色的 window 对象。全局变量和函数都是 Global 对象的属性。Math 对象提供了很多属性和方法，用于辅助完成复杂的数学计算任务。





# 未整理笔记

### 8.1 window 对象

#### 全局作用域

全局变量不能通过delete删除，而直接在window上定义的的属性可以(定义在window上面的属性在使用结束后需要释放，避免内存泄漏)

```js
var age =29;
window.color ="red";
console.log(delete window.age); //在IE<9时抛出错误，在其他浏览器中返回false
console.log(delete window.color); //在IE>9时抛出错误，在其他浏览器中返回true
```

使用 var 语句添加的window属性有一个名为[[Configurable]]的特性，这个特性的值被设置为 false，所以无法通过delete删除。

另外，尝试访问未声明的变量会抛出错误，但是通过查询window对象，可以知道某个可能未声明的变量是否存在。

```js
var newValue = oldValue; //这里会报错，因为oldValue未定义
var newValue = window.oldValue;  //不会报错，因为这是一次属性查询，值为undefined
```

#### 间歇调用和超时调用

```js
var timeoutId = setTimeout(function() {
	console.log('hello') 
},1000);
//返回一个数值id，这是唯一标识符，用他来取消调用

clearTimeout(timeoutId);

var intervalId = setInterval(function(){
  console.log("hello");
},1000);

clearInterval(intervalID);
// 使用定时器后，需要清除定时器(在React中使用定时器时可以绑定到对象的属性上面)
```

在开发环境下，很少真正的使用间歇调用setInterval，因为后一个间歇调用可能会在前一个间歇调用结束之前启动。

#### 系统对话框

alert(),confirm(),prompt() 

这三个方法打开的对话框都是同步和模态的。也就是说，显示这些对话框的时候代码会停止执行。

通常不会直接使用这三个API，而是用过 toaster 等温和的提示，这样不会阻断当前代码执行。

#### location对象

location.replace() 这个方法只接受一个参数，即要导航到的URL,结果会导致浏览器位置的改变，但是不会生成浏览记录。 

location.reload() 如果不传递任何参数，页面就会以最有效的方式重新加载。也就是说，如果页面自上次请求以来并没有改变过，页面就会从浏览器缓存中重新加载。如果要强制从服务器重新加载。需要输入参数true。

#### navigator对象

#### screen对象

#### history对象

history.go(-1)//后退一页

history.go(+1)//前进一页

history.go("baidu.com")//返回到历史记录中包含该字符串的第一个位置





### 10.1 结点层次k

#### 10.1.1 Node类型

文档结点document是每个文档的根节点，document只有唯一子节点元素。 
每个结点都有一个nodeType属性，用于表明节点的类型。

~~~js
document.getElementsByTagName('html')[0].nodeType
~~~

节点的有12个类型，分别由1-12这12个数字表示。 

例：Node.ELEMENT_NODE这个值为1。(IE中无效，因为IE没有公开Node类型的构造函数，所以为了跨浏览器兼容，还是将nodeType于相应的数值进行比较)

childNodes
每个结点都有一个childNodes属性，其中保存着一个Nodelist对象，Nodelist是一个伪数组，用于保存一组有序的结点，可以通过位置来访问这些结点。(并非Array实例，他是基于DOM结构动态执行查询的结果)

注意 
在DOM中childNodes共5个节点类型：Element，Text，Attr，Comment，CDATASection。可用childNodes[i].nodeType == ELEMENT 对childNodes进行过滤.

```js
document.getElementsByTagName('html')[0].childNodes;  //类数组对象，保存一组有序的节点
document.getElementsByTagName('html')[0].childNodes[0];
document.getElementsByTagName('html')[0].childNodes.item(0);
document.getElementsByTagName('html')[0].childNodes.length;
document.getElementsByTagName('html')[0].childNodes[0].nextSibling;
document.getElementsByTagName('html')[0].childNodes[1].previousSibling;

function convertToArray(nodes){
  //将childNodes转化为数组
  var array = null;
  try {
    array = Array.prototype.slice.call(nodes, 0);
    // call 直接将节点转化成数组的方法不熟悉
  } catch(error) {
    array = new Array();
    for (var i = 0,len = nodes.length; i < len; i++) {
      array.push(nodes[i]);
    }
  }
  return array;
}

function convertToArray(nodes) {
  let array = null;
  try {
    array = Array.prototype.slice.call(nodes, 0);
  } catch(error) {
    array = new Array();
    for (let i = 0; i < nodes.length; i++) {
      array.push(nodes[i]);
    }
  }
  return array;
}
// 使用ES6将类数组转化成数组
```

操作结点

`someNode.appendChild(newNode) `

注意：如果传入的结点已经是该文档的一部分，那结果就是将该结点从原来的位置转移到新的位置，DOM树可以看成是由一系列指针连接起来的，但任何DOM结点也不能同时出现在文档的多个位置

~~~js
someNode.insertBefore(newNode,someNodeChildNode)
someNode.replaceChild(newNode,someNodeChildNode)
someNode.removeChild(someNodeChildNode) 
~~~

在使用replaceChild的时候，该结点的所有关系指针都会从被他替换的结点复制过来，尽管从技术上讲，被替换的结点还在文档中，但是他在文档中已经没有自己的位置(removeChild也如此)

someNode.cloneNode(true/false)
normalize()

操作的都是某个结点的子节点(使用parentNode属性).但是并不是所有结点都有子节点，如果在不支持子节点的节点上调用上述方法会报错。

#### 10.1.2 Document类型

在浏览器中document对象是HTMLDocument(继承自Document类型)的一个实例，表示整个html页面 

- document.getElementById('id') 
- document.getElementsByTagName("tag") 
- document.getElementsByName('name')

后两个返回的是HTMLCollection对象和childNodes一样==会跟随当前文档内容的更新而更新==.

document.write() 在页面加载过程中则与writeln一致，如果加载完成后使用则会重写页面
document.writeln()

#### 10.1.3 Element类型

~~~js
element.attributes

getAttribute
setAttribute
removeAttribute
~~~

前2个多在自定义属性中使用

包含一个NamedNodeMap,与childNodes一样，也是一个动态的集合。 

element.attributes往往在遍历元素的特性时使用，如下，遍历元素特性，并将其构造成 

name="value",name="value"的形式.

```js
function outputAttributes(element){
  var pairs = new Array(),
      attrName,
      attrValue,
      i,
      len;
  for (i = 0,len=element.attributes.length; i < len; i++) {
    attrName = element.attributes[i].nodeName;
    attrValue = element.attributes[i].nodeValue;
    pairs.push(attrName + "=\"" + attrValue + "\"");
  }
  return pairs.join(",");
}
```

#### 10.1.4 Text类型

document.createTextNode()

#### 10.1.8 Document Fragment

DOM规定文档片段 document fragment是一种“轻量级”的文档，虽然不能把它直接添加到文档中，但是可以把它当成仓库使用。主要用来暂时存储Nodes，用于复制粘贴节点，或者保存上一步的节点。



### 10.2 DOM操作技术

```js
var divs = document.getElementsByTagName('div');
for (var i = 0; i < divs.length; i++) {
  var div = document.createElement("div");
  // document.body.appendChild(div);
  // 界面上有很多div节点，这样做会导致界面卡死
}
```

以上代码，i永远也不会等于divs.length, 因为每次比较时，都将会对现有的div元素进行查询，因此每次div.length会随着i一起递增，永不相等。 

因此要想迭代Nodelist及其近亲NamedNodeMap和HTMLCollection,则==必须考虑到这三者都是动态的集合==，会实时更新。所以，我们因该尽量减少对这三者的访问，而是将其值用变量缓存起来。

总结

~~~js
document.getElementById('id'); //只可以通过document调用
document.getElementsByTagName('tag');//只可以通过document调用

document.getElementsByName('name')  //可以通过document与所有的html元素调用
node.getElementByName('name');

document.getElementsByClassName('class');//可以通过document与所有的html元素调用
node.getElementByClassName('class');
~~~
