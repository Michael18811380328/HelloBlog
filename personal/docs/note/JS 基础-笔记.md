# JS 基础笔记 
 
## 0003 防抖和节流的区别，自己写代码实现


防抖表示某一个事件多次高频触发之后，等时间结束后的几百毫秒再触发函数

节流表示当某一个事件高频触发之后，每隔几百毫秒触发一次函数

一般运用于界面滚动等时间触发比较频繁的

```javascript
/*
 * @des                               防抖函数
 * @param  {Number}    delay          延迟时间（ms），不传默认200ms
 * @param  {Function}  callback       回调函数
 * @param  {Boolen}    false          触发时是否立即执行一次，默认不执行
 * @return {Function}                 A new debounce function
 */

```

```javascript
const debounce = (callback, delay = 200, im = false) => {
  let timeoutID = null
  return function() {
    // 第一次触发时是否立即执行
    if (im && !timeoutID) {
      callback.apply(this, arguments)
    }
    // 避免开启过多计时器
    if (timeoutID) clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      // 借用外部第一个普通函数的this和arguments对象
      callback.apply(this, arguments)
      // 执行后将timeoutID置为null
      timeoutID = null
    }, delay)
  }
}

/*
 * @des                               节流函数
 * @param  {Number}    delay          延迟时间（ms），不传默认200ms
 * @param  {Function}  callback       回调函数
 * @param  {Boolen}    false          触发时是否立即执行第一次，默认不执行
 * @return {Function}                 A new throttle function
 */
const throttle = (callback, delay = 200, im = false) => {
  let timeoutID = null
  return function() {
    // 第一次触发时是否立即执行
    if (im && !timeoutID) {
      // 立即执行
      callback.apply(this, arguments)
      // 执行后立即关闭
      im = false
    }
    if (!timeoutID) {
      timeoutID = setTimeout(() => {
        // 外部第一个普通函数this和arguments对象
        callback.apply(this, arguments)
        // 执行后将timeoutID置为null
        timeoutID = null
      }, delay)
    }
  }
}

```



   
## 0004 Set和map的区别方法


Set是一个类数组，可以 add delete has


Map是一个类对象，可以 get set has delete


这两个用于处理某一个没有特定含义的对象或者数组，例如可以用来数据去重复


没有数组的复杂的API，所以说不是很方便存储实际的数据



   
## 0007 es6的语法有什么新特点？


特点比较多

1 let const 变量声明，块级作用域

2 async await 对于 promise 一步函数的优化，避免了回调地狱

3 数组的新方法 includes Array.isArray 

4 类取代了构造函数 new Class



   
## 0008 SetTimeOut Promise async await 的区别


这个也涉及到宏任务和微任务

setTimeout

Promise(resolve, reject)

async function() { await xxx() }



   
## 0009 Async和await如何实现同步和异步？


如果函数内部有异步操作，使用 async await 表示异步函数。

当代码执行到 await 一行时，需要等异步操作返回结果后，再继续向下执行，例如

```
  async fn() {
    try {
      let res1 = await this.api.getUser();
      let res2 = await this.api.getUser();
      let res3 = await this.api.getUser();
    } catch (error) {
      console.log(error);
    }
  }

```



   
## 0010 异步函数执行结果，任务队列或for循环


```
for (var i = 0; i < 10; i ++ ) {
	setTimeout(() => console.log(i), 0);
}

```

这里考察的是打印什么？因为 console 或者函数内部是异步执行的，那么先循环10次后，i 变成10，就打印10个10

改变方法是 var 改成 let，变量作用域不同

```
for (let i = 0; i < 10; i ++ ) {

	setTimeout(() => console.log(i), 0);

}

```



   
## 0011 高维数组降维、去重、排序


arr.flat(Infinity) 实现高维数组降维，或者手动实现递归降维

去重 new Set（）

排序 sort 实现

官方实现：Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>{ return a-b })



   
## 0012 JS 异步有几个方法？优缺点


setTimeout

setInterval

Promise.then

async await



   
## 0013 Promise 构造函数是同步执行还是异步执行，那么 then 方法呢


Promise 中代码是同步执行的，then 是异步执行的？



   
## 0014 如何实现一个 new 创建类


手写一个 new ？



   
## 0021 判断数组的三种方法；方法的区别


第1种 Object.prototype.toString.call(val) 

第2种 instanceof

第3种 Array.isArray

第1种 把变量转换成对象，然后把对象调用转换成字符串。这样可以处理各种类型的数据结果进行判断，是否是数组，兼容性比较好，但是判断代码比较繁琐。

```
Object.prototype.toString.vall({}) == '[object Object]'
Object.prototype.toString.vall([]) == '[object Array]'

```

第2种 instance of 判断传入的对象或数组的原型上是否有对应的 array or object

```
[] instanceof Array == true
[] instanceof Object == true

```

第三种是ES5新加的语法。这个语法比较简单，但是存在兼容问题

```
Array.isArray([])

```



   
## 0023 观察者模式和订阅发布者模式


订阅发布者模式，需要有一个中介对象，来处理整体的订阅和发布；这个对象支持复用

观察者模式不需要中介，只是两个对象之间的观察与被观察；

如果是少数组件关系简单，那么可以使用观察者模式即可完成功能。

如果是多个组件关系复杂，互相发送消息监听事件，那么使用订阅发布者模式更合适——简化代码。



   
## 0027 声明变量的几个关键词和区别


var 声明变量直接绑定在全局作用当中，直接通过 window.x 可以获取对应的值。

let const 声明的变量都在局部的作用域中, 并没有绑定到全局变量当中，所以在全局变量上无法访问对应的变量。

全名

let: 允许你声明一个作用域被限制在块级中的变量、语句或者表达式 let 绑定不受变量提升的约束，这意味着let声明不会被提升到当前，该变量处于从块开始到初始化处理的"暂存死区"。

var: 声明变量的作用域限制在其声明位置的上下文中，而非声明变量总是全局的, 由于变量声明（以及其他声明）总是在任意代码执行之前处理的，所以在代码中的任意位置声明变量总是等效于在代码开头声明。

const 声明创建一个值的只读引用 (即指针)，

这里就要介绍下 JS 常用类型: String、Number、Boolean、Array、Object、Null、Undefined。其中基本类型有 Undefined、Null、Boolean、Number、String，保存在栈中；复合类型 有 Array、Object ，保存在堆中； 基本数据当值发生改变时，那么其对应的指针也将发生改变，故造成 const申明基本数据类型时，再将其值改变时，将会造成报错， 例如 const a = 3 ; a = 5 时 将会报错；但是如果是复合类型时，如果只改变复合类型的其中某个Value项时， 将还是正常使用；



   
## 0030 两个数组合并成另一个数组


数组的遍历、去重、排序等，或者 concat 方法



   
## 0031 异步函数编程题


Set time out 当中对于 var let 的区别

Set time out 函数的第3个参数会作为回调函数的第一个函数传入。



   
## 0033 闭包内部执行函数


闭包内部无法访问到全局变量，所以只能打印当前函数对应的函数名称。


实际当中开发当中使用的情况不多。



   
## 0034 闭包打印变量


闭包中可以有局部的内容，然后进行打印也可以直接新生成声明变量，然后再进行打印



   
## 0035 浏览器的缓存读取原则


浏览器有几种缓存

cookie

session

localStorage

这些分别有什么特点，然后存储什么样的数据？

<https://zhuanlan.zhihu.com/p/581426460> 



   
## 0041 闭包的作用域，和函数中变量的提升


在一个函数内部变量声明的话，会提升到函数的开头，但是不会赋值，所以打印会出现 undefined 

```
function fn() {
	console.log(a);
	let a = 10;
}

```

函数内部直接访问的是函数作用域中的变量，如果没有找到这个属性的话，就是访问全局变量下的一个属性，所以说需要看 console.log 的结果是函数作用域，还是全局作用域。



   
## 0042 如何实现sleep函数？


核心思路是写一个sleep函数，参数是n表示时间，内部返回一个new promise，然后reserve reject Reserve当中设置一个set time out实现延迟执行

Sleep函数外部可以使用then或者async await实现具体的下一步操作

```javascript
function sleep(fn, times) {
	return new Promise(() => {
	    setTimeout(() => fn(), times)
	})
}

```



   
## 0043 使用sort函数直接对数组进行排序的结果


sort 函数，如果不传递任何函数，默认会把比较的前两项都转换成字符串，进行比较，然后不同的数字，首先转换成字符串，进行 UTF-16 的比较，所以说这个比较的结果不一定是真实的结果



   
## 0046 一个对象写入length和数组的方法能否变成数组？


如果对象写入数组的 length 长度，然后写入 push 和 pop 的方法，是可以变成一个伪数组

但是和真实的数组不一样

push方法的核心 推入一个具体的元素，同时 length+1。

如果默认对象的 length 是一个固定的值，然后继续执行 push pop 操作，只会在后面的元素上面加入，前面的引用都是 null 



   
## 0048 call和apply的区别是什么？性能怎么样


call 和 aplly 作用都是一个对象，使用另一个对象的方法

其中 apply 传入的是一个数组或者伪数组，call 是传入多个参数作为使用函数的参数

call 由于传入的是多个参数，性能比 apply 稍微好一点（需要解析数组或者伪数组）



   
## 0051 Object.defineProperty 怎么使用？


<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty> 

Object.defineProperty 用于给对象增加或者更改一个新的属性（可以读写，可以只读），例如

实际开发中使用不多

```
const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false
});

object1.property1 = 77;
// Throws an error in strict mode

console.log(object1.property1);
// Expected output: 42

```



   
## 0055 一个简单对象转换成数组去掉非法值


遍历对象的键值对，然后判断键是否是有效的数字，parsent isNaN 然后放在数组中即可



   
## 0056 设计题设计一个对象具有很多的方法。可以进行链式调用


类似中间件的设置原则，对象中的方法，对这个对象进行操作后，返回这个对象

执行对象的方法时，是原地算法（迭代对象的属性）并返回这个对象

```
class Person()class Person {

  constructor(props) {
    this.name = props.name;
    this.age = props.age;
    this.value = props.value || 0;
  }

  sayHello = () => {
    console.log('Hello ' + this.name);
    return this;
  }

  sayHi = () => {
    console.log('Hi ' + this.name);
    return this;
  }

  add = (number) => {
    this.value = this.value + parseInt(number);
    return this;
  }

  delete = (number) => {
    this.value = this.value - parseInt(number);
    return this;
  }

  getValue = () => {
    console.log(this.value);
    return this;
  }
}

let p = new Person({ name: 'Mike', age: 20, value: 10 });
p.sayHello().sayHi();
p.add(4).add(20).delete(10).getValue();

```

 



   
## 0058 箭头函数和普通函数的区别是什么？构造函数又是什么


普通函数 普通的函数

构造函数 ES5用来创建一个组件，es6 使用类进行创建，函数名需要大写

箭头函数 ES6 中类中的箭头函数，改变了实例中 this 的指向。默认 this 指向调用方法的对象，使用 箭头函数，可以让 this 始终指向原始的类（进一步获取其中的属性和方法）



   
## 0064 Promise.finally()如何实现


Promise 执行后，可能 res 或者 catch 之后都会执行 finally 部分的代码

原理是这样的，实际源码不清楚



   
## 0065 获取对象的属性点语法和中括号语法，哪个更好


点语法效率稍微高一些，因为点语法，直接获取属性。中括号需要进行变量转换，转换成字符串，然后在获取属性。



   
## 0069 如何把字符串的大小写转换


最好的办法是一句话，正则转换或者使用循环数组的方式，如果是大写转换成小写，否则转换成大写的形式

let result = '';

for (let i = 0; i \< str.lenght; i++) {

  if (str\[i].isLower) {

  result += str\[i].toUpper();

} else {

  result += str\[i].toLower();

}

}



   
## 0072 for 和 forEach 性能差距


性能：数量级较小时，两者性能差距不大（JS 计算相对耗时较小）10万次计算也就是若干毫秒

for 比 forEach 性能略好，因为 forEach 循环时，实际还有上下文引用栈（item index array）需要存储较多数据



   
## 0075 获取数组中第1个和第1万个项的时间


JS 的数组实际上是对象，那么获取第1个和第10000个，都是通过对象的索引实现查找的，耗时基本相同。

其他语言中数组是真实的数组，获取的时间不一样。



   
## 0076 对象的属性转换


JS 对象的属性，只能使用 字符串 或者 Symbol

如果设置其他为对象的属性，那么先转换成字符串 toString 然后进行变成对象的属性

Symbol 处理魔法字符串的问题，生成唯一的一个字符串便于处理对象的属性

```
let key = Symbol('Mike')
let dict = {};
dict[key] = 20;

```



   
## 0077 旋转数组


把数组中前N个元素移动到最后

就是数组 slice 和 concat 操作的结合

```
array.slice(k).concat(array.slice(0, k))

```



   
## 0079 input 处理防抖和中文输入


防抖：键盘事件结束300ms后，再触发对应的提交函数-或者搜索函数，避免频繁输入造成的搜索性能下降

处理中文输入：onCompositionStart 等事件，等 end 后就是中文输入结束，此时再处理输入框中的内容



   
## 0080 Promise.all 原理


Promise.all() 中全部请求返回结果后，才能执行后续的操作，适合很多个请求并行执行

Promise.race() 赛跑，多个请求中，任意一个执行结束，就完成后续的操作

类似数组中 every 和 some 的逻辑



   
## 0083 let var const 区别


ES3 还是 ES6

声明常量还是变量；

是否有块级作用域；

性能差距不大；



   
## 0084 函数连续执行 add(1)(2)(3, 4)


函数 currying 实现

关键是返回值是函数，需要测试，看的不太懂

```javascript
    function currying(fn, length) {
      length = length || fn.length;
      return function(...args) {
        return args.length >= length ? fn.apply(this.args) : currying(fn.bind(this, ...args), length - args.length);
      }
    }

```



   
## 0086 判断一个网址是否是正确的


使用 new URL() 构造函数传参，然后捕获错误，就能判断是否正常了



   
## 0089 Promise.race() 如何实现


多个 Promise 执行，只要有一个返回，那么立即执行后面的代码



   
## 0090 实现模糊查询并关键词高亮


第一输入时防抖

第二查询是同步还是异步？是否需要网络请求？

是否通过记忆化查找

高量结果主要使用正则表达式进行处理。满足某个搜索条件，使用正则进行替换，替换后使用 span className="highlight" 包裹一下，显示高亮的背景色即可



   
## 0092 找出一个DOM节点，所有父节点的ID


获取当前节点，然后 while 循环，对每一个父节点判断 ID

```
while (dom) {
  console.log(dom.id);
  dom = dom.parentNode;
  if (!dom) return;
}

```



   
## 0095 实现一个深拷贝考虑对象的自引用


深拷贝对象时，如果存在互相引用，也就是深拷贝一个图

每次拷贝一个节点，把节点存储在字典中，下次遍历到节点，就不需要拷贝了，这样实现了深拷贝



   
## 0098 函数传参过程中深复制和浅复制


函数传参过程中，普通变量直接复制，对象是浅复制

函数内部可以实现原地算法，直接在参数的基础上修改



   
## 0100 console.log 同步的还是异步的？怎么进行调试和set time out是什么关系


console.log 是同步执行的

如果打印的是对象（引用类型数据），首次只打印指针，当从控制台中展开对象时，才显示对象的详情，可能数据不一致的问题

解决：

1、直接在代码中打断点，这样分析到的数据是最真实的

2、把对象转换成字符串打印，这样会输出当时的真实的值

setTimeout 是明确的异步执行，也就是先执行主线程，执行后再执行任务队列中的代码。



   
## 0105 Apply和call的区别


参数不一样，一个传递的是数组，一个传递的是多个参数，实际功能一样

function.apply(obj1, \[para1, para2]);

function.call(obj1, para1, para2);

<https://www.w3school.com.cn/js/js_function_apply.asp> 



   
## 0106 事件流和event loop是什么


<https://juejin.cn/post/7020328988715270157> 

事件队列和事件循环



   
## 0108 自己如何实现promise？


<https://juejin.cn/post/6844903625769091079> 

通过 promise 的基本使用，说明这是一个类，并且有 then 方法

```
let p = new Promise();
p.then(() => {}, () => {})

```

参考链接，简化版本的代码如下（不考虑链式调用，finally, Promise.all）





   
## 0132 import 导入命令


```javascript
import { fn1, fn2, fn3 } from 'lodash';
import { fn1, fn2, fn3 as $ } from 'lodash';
import { * as lodash } from 'lodash';
// 如果一个模块对外暴露很多的方法，可以使用第一行的命令引入几个方法
// 可以使用第二行的几个命令，把其中的几个方法封装成对象 （$）然后调用其中的某个方法 $.fn1 $.fn2 使用
// 第三个是直接把全部的方法封装成一个对象，然后调用对象的方法
// 这个写法适应于函数式编程（对外暴露很多函数，然后使用测试很方便）

```



   
## 0144 JS上下文执行栈和闭包


几个概念把，esc、上下文：作用域链，AO/VO，this。esc存储执行的上下文

主要是创建和执行。假设有一个A函数，过程是这样的创建全局执行上下文、压入esc、全局上下文初始化、执行A函数、创建A函数执行上下文，压入esc，A函数上下文初始化，这个初始化过程是这样的：创建作用域链、emm我上面提漏了一个A函数被创建全局上下文被保存到scope中的过程，是复制scpoe创建作用域链,用arguments创建活动对象，初始化活动对于，将活动对象压入链顶，执行完毕，上下文弹出。

“但是全局上下文一直在栈底，而VO和AO的确认，我感觉是取决是是否可访问的。”

“而闭包就是上下文链中上下文scope被销毁了，但因为保持了对scope中某个变量的引用，这应该就是你上面说的回收原理的根节点实现的这个东西把，导致没销毁干净，留存在了内存中，完成了闭包”



   
## 0146 列举数组常用的10个方法？


增加减少插入

pop

push

shift

unshift

slice

splice

查找

includes

indexOf

lastIndexOf

find

some

any

遍历数组

map

forEach

reduce

和字符串转化

join



   
## 0147 事件绑定有哪些情况


某一个节点绑定事件，或者全局绑定事件（document.addeventListener）

适合于不同场景

打开通常在某一个按钮，那么就在节点绑定事件

关闭可能在全屏点击，那么就在 document 绑定事件

事件冒泡和事件捕获，顺序分别是从内部到外部，和从外部到内部



   
## 0148 iframe.contentDocument 和 iframe.contentWindow


非重点题目

1、这两个都是通过 iframe 获取内部的 document，兼容性不一样，参考下面

<https://stackoverflow.com/questions/17197084/difference-between-contentdocument-and-contentwindow-javascript-iframe-frame-acc> 

<https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#scripting> 

iframe.contentDocument || iframe.contentWindow.document

2、如何监听 iframe 下载完成？默认使用这个方法

原理：当执行下载后，循环判断 iframe 的下载状态是否完成；如果完成，移除 iframe，然后执行回调函数

```javascript
let iframe = document.createElement('iframe');
iframe.src = path;
iframe.style.display = 'none';
document.body.appendChild(iframe);
const timer = setInterval(() => {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    if (iframeDoc.readyState == 'complete' || iframeDoc.readyState == 'interactive') {
        document.body.removeAttribute(iframe);
        clearInterval(timer);
        resolve('success');
    }
}, 1000);

```

如果高频触发函数（\<1000），可能有 iframe 多次创建并卸载，然后 iframe.contentWindow 是 null 报错的情况，可能性较小。最好在循环外部判断一下是否存在，或者尽量避免使用这个函数。



   
## 0149 script 脚本阻塞下载问题


非重点题目

项目中遇到一个问题：

默认下载图片通过 iframe ，然后302重定向下载完毕。当初始化加载10多个JS脚本时，界面用户点击下载图片 iframe 下载，那么下载时显示跨域，无法下载

查阅资料：浏览器并行下载时，script 下载执行会阻塞其他操作，所以造成图片下载失败。

解决：首先避免大量并行下载脚本，从根源上减少script的代码量。然后可以在界面初始化完成后，异步下载这部分脚本，避免脚本和其他功能互相干扰。

<https://www.dandelioncloud.cn/article/details/1509921575058092034> 

<https://blog.csdn.net/caihaijiang/article/details/6666520> 

<https://stackoverflow.com/questions/1869095/dns-lookup-vs-http-parallel-downloads/1869126#1869126> 



   
## 0171 数组的reduce是什么？第2个参数是什么意思？


```
[1,2,4,5].reduce((a, b) => a + b, 0)

```

reduce 第一个参数是函数，表示对每一项执行的函数，返回值作为下一个项计算的基础值

第二个参数是初始值，表示初始是0



   
## 0172 0.1+0.2为什么不等于0.3？具体项目中怎么处理？


因为 JS 是弱类型语言，存储使用 64 位浮点数，这个都是基于二进制存储的（浮点数），可能就是2的多少次方。小数点是基于10进制存储的。

十进制和二进制转换过程中，会出现精度丢失，然后 JS 加法的时候需要进制转换，造成了这个问题

解决的办法

1、因为前面的部分正确，只有后面末尾不正确，那么使用 toFixed 处理即可，可以解决简单的运算

```
+(0.1 + 0.2).toFixed(1)

```

2、可以使用第三方的库 number precious

3、未来 ES 新的提案中支持大数字和精确计算，参考：<https://zhuanlan.zhihu.com/p/225490777> 

实际场景：

1、科研运算，使用 number-precious

2、金融运算（两位小数），先转换成分，然后计算，计算后再换成元



   
## 0177 原生拖拽事件有哪些？怎样传递数据


1、如何设置拖拽对象：设置 div draggable 属性

2、被拖动的元素有哪些事件：dragstart drag dragend 三个事件，分别对应开始拖动，拖动中（高频），拖动结束

3、被释放的元素有哪些事件：dragenter dragover dragleave drop 四个事件

4、从桌面拖动到浏览器的事件：没有 dragstart dragend 事件

5、如何通过拖拽传递数据：

5.1 当一个元素被拖动时，ondragstart, 设置 e.datatransfer.setDate 设置数据

5.2 当元素在另一个对象上释放时，onDrop 事件，获取 e.datatransfer.files 拿到数据，这里可能是某个文件数组，或者是某个字符串。如果是拖动桌面文件并上传到浏览器，那么获取 files 数组（文件路径），然后通过 FileReader 对象，浏览器读取到文件内容，进一步实现上传。



   
## 0180 阻止事件冒泡的两个方法


stopImmediatePropagation 函数和 stopPropagation 函数的区别



event.stopImmediatePropagation() 方法阻止剩下的事件处理程序被执行。该方法阻止事件在 DOM 树中向上冒泡。停止当前节点，和所有后续节点的事件处理程序的运行。



stopPropagation 会阻止事件向上层元素冒泡。如果同一个元素绑定了多个事件（addEventListener），那么不会阻止其他事件的执行。



stopImmediatePropagation() 会阻止同层级事件的冒泡。

```javascript
div.addEventListener("click" , function(){
  alert("第一次执行");
  stopImmediatePropagation();
} , true);

div.addEventListener("click" , function(){
  alert("第二次执行");
} , true); 

// 点击div，第二次执行不会触发

```



   
## 0181 ES6 之前使用 prototype 实现继承


Object.create() 会创建一个 “新” 对象，然后将此对象内部的 \[\[Prototype]] 关联到你指定的对象（Foo.prototype）。Object.create(null) 创建一个空 \[\[Prototype]] 链接的对象，这个对象无法进行委托。

```
function Foo(name) {
  this.name = name;
}

Foo.prototype.myName = function () {
  return this.name;
}

// 继承属性，通过借用构造函数调用
function Bar(name, label) {
  Foo.call(this, name);
  this.label = label;
}

// 继承方法，创建备份
Bar.prototype = Object.create(Foo.prototype);

// 必须设置回正确的构造函数，要不然在会发生判断类型出错
Bar.prototype.constructor = Bar;

 // 必须在上一步之后
Bar.prototype.myLabel = function () {
  return this.label;
}

var a = new Bar("a", "this is label");

a.myName(); // "a"
a.myLabel(); // "this is label"

```



   
## 0185 promise 的特性、优缺点，内部是如何实现的


Promise基本特性

* 1、Promise有三种状态：pending(进行中)、fulfilled(已成功)、rejected(已失败)
* 2、Promise对象接受一个回调函数作为参数,  该回调函数接受两个参数，分别是成功时的回调resolve和失败时的回调reject；另外resolve的参数除了正常值以外，  还可能是一个Promise对象的实例；reject的参数通常是一个Error对象的实例。
* 3、then方法返回一个新的Promise实例，并接收两个参数onResolved(fulfilled状态的回调)；onRejected(rejected状态的回调，该参数可选)
* 4、catch方法返回一个新的Promise实例
* 5、finally方法不管Promise状态如何都会执行，该方法的回调函数不接受任何参数
* 6、Promise.all()方法将多个多个Promise实例，包装成一个新的Promise实例，该方法接受一个由Promise对象组成的数组作为参数(Promise.all()方法的参数可以不是数组，但必须具有Iterator接口，且返回的每个成员都是Promise实例)，注意参数中只要有一个实例触发catch方法，都会触发Promise.all()方法返回的新的实例的catch方法，如果参数中的某个实例本身调用了catch方法，将不会触发Promise.all()方法返回的新实例的catch方法
* 7、Promise.race()方法的参数与Promise.all方法一样，参数中的实例只要有一个率先改变状态就会将该实例的状态传给Promise.race()方法，并将返回值作为Promise.race()方法产生的Promise实例的返回值
* 8、Promise.resolve()将现有对象转为Promise对象，如果该方法的参数为一个Promise对象，Promise.resolve()将不做任何处理；如果参数thenable对象(即具有then方法)，Promise.resolve()将该对象转为Promise对象并立即执行then方法；如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为fulfilled，其参数将会作为then方法中onResolved回调函数的参数，如果Promise.resolve方法不带参数，会直接返回一个fulfilled状态的 Promise 对象。需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event  loop）的结束时执行，而不是在下一轮“事件循环”的开始时。
* 9、Promise.reject()同样返回一个新的Promise对象，状态为rejected，无论传入任何参数都将作为reject()的参数


```
function myPromise(constructor){
  let self=this;
  self.status="pending" //定义状态改变前的初始状态 
  self.value=undefined;//定义状态为resolved的时候的状态 
  self.reason=undefined;//定义状态为rejected的时候的状态 
  
  function resolve(value){
    //两个==="pending"，保证了了状态的改变是不不可逆的 
    if(self.status==="pending"){
      self.value=value;
      self.status="resolved"; 
    }
  }
  
  function reject(reason){
     //两个==="pending"，保证了了状态的改变是不不可逆的
     if(self.status==="pending"){
        self.reason=reason;
        self.status="rejected"; 
      }
  }
  
  //捕获构造异常 
  try{
      constructor(resolve,reject);
  }catch(e){
    reject(e);
    } 
}

myPromise.prototype.then=function(onFullfilled,onRejected){ 
  let self=this;
  switch(self.status){
    case "resolved": onFullfilled(self.value); break;
    case "rejected": onRejected(self.reason); break;
    default: 
  }
}

// 测试
var p=new myPromise(function(resolve,reject){resolve(1)}); 
p.then(function(x){console.log(x)})
//输出1

```



   
## 0196 eventBus 实现原理？源码实现？


原理：事件绑定和派发。预先全局声明一个事件和对应的处理函数，然后在另一个地方出发事件，执行函数。

使用场景：用于不同层级的组件执行函数，例如两个相隔较远的前端组件执行函数，不能使用 props，可以使用这个方案。

实现代码

```javascript
// 这个可以基本实现事件派发
class EventBus {

  eventMap = {};

  subscribe(key, fn) {
    this.eventMap[key] = fn;
  }

  dispatch(key, ...params) {
    let fn = this.eventMap[key];
    if (fn) {
      return fn(...params);
    }
  }
}

let eventBus = new EventBus();
eventBus.subscribe('onclick', (a, b) => { console.log(a, b) });
eventBus.dispatch('onclick', 1, 2);

// 上面代码的不足，一个事件只能对应一个函数，不能对应多个函数
// 下面是多个函数的版本

class EventBus {
  subscribers = {};

  subscribe(type, handler) {
    if (!this.subscribers[type]) {
      this.subscribers[type] = [];
    }

    const handlers = this.subscribers[type];
    handlers.push(handler);

    return () => {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    };
  }

  dispatch(type, ...data) {
    const handlers = this.subscribers[type];
    if (Array.isArray(handlers)) {
      handlers.forEach(handler => handler(...data));
    }
  }
}

```



   
## 0340 正则表达式的特殊符号区别


对比 \`/^\[a-z0-9]\[a-z]+$/\`和 \`/^\[a-z0-9]\[a-z]\*$/\`的区别？

也就是 + 和 \* 的区别

星号表示：匹配前面的子表达式零次或多次。

加号表示：匹配前面的子表达式一次或多次。

点表示：匹配除换行符 \\n 之外的任何单字符。

详细参考：<https://www.runoob.com/regexp/regexp-syntax.html> 

这些知识点都记过，最好熟练使用。



   
## 0352 jsonp


jsonp: jsonp的核心原理是利用script标签没有同源限制的方式，可以发送跨域的get请求（只能发送get请求）。

script标签中的src属性将请求参数和当前请求的回调函数名拼接在链接上。

最终由服务端接收到请求之后拼接成前端可执行的字符串的形式返回。

这个结果字符串最终会在前端的script标签中解析并执行。




   
## 0354 export 有多少情况


<https://developer.mozilla.org/zh-CN/docs/web/javascript/reference/statements/export> 

<https://zh-hans.react.dev/learn/importing-and-exporting-components> 

组件的导出方式决定了其导入方式。默认导出和具名导出。

| 语法     | 导出语句                                | 导入语句                                  |
| :----- | :---------------------------------- | :------------------------------------ |
| 导出默认组件 | export default function Button() {} | import Button from './Button.js';     |
| 导出具名组件 | export function Button() {}         | import { Button } from './Button.js'; |



   
## 0262 字符串的编码格式有哪些


### 字符编码问题

常见字符串的编码格式：ASCII 码，Unicode，UTF-8 编码，GB2312 编码，这几个的区别

前端和编码相关的函数：escape() encodeURI() encodeURIComponent() 和对应的三个解密函数，区别和适应情况

四种类型编码简单理解：

\- ASCII 码是最早的英文和控制码对应的编码，0-127，需要记住大写A-Za-z对应的编码范围(065到090，097到122) 不支持中文

\- Unicode：因为 ASCII 无法表示各种编码，所以出现了 Unicode，大概有几万，可以代表世界上很多的语言表情符号等等，有对应的官方介绍全部的编码，也有不少的标准

\- UTF-8：是 Unicode 的一个类似子集，也有 UTF-16 UTF-32 等编码。文件声明部分会写 coding=utf-8

\- GB2313 是简体字的编码，还有繁体字等等，前端使用不多

前端三个字符串转换函数和加密函数：因为浏览器 URL 中不允许某些特殊符号，所以需要把特殊符号转换成编码，例如 ; 等

根据 MDN 介绍和知乎高赞总结：

\- escape 转义字符串，不推荐使用，未来可能废弃

\- encodeURI 转义特殊字符串（不转换某些符号，例如 http\:// 不转换）

\- encodeURIComponennt 转义特殊字符串（特殊符号全部转换，例如 http\:// 会转换）

\- 具体使用：我们在发送请求时，URL 中可能有参数含有特殊符号（例如文件名用户名等用户输入）需要使用 encodeURIComponent 转义，然后拼接成 URL

<https://www.zhihu.com/question/21861899> 

<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/escape> 

<https://www.cnblogs.com/luckyuns/p/6396701.html> 

<https://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html> 



   
## 0265 es6 中扩展字符串，深拷贝还是浅拷贝


扩展运算符可以复制数组或者对象。

如果数组的每一项是引用类型，那么不会深复制，只会复制指向数组的指针。所以不能使用扩展运算符对数组或者对象进行深拷贝（深拷贝数组使用 deepcopy）。



   
## 0268 JSON 的几种格式？主要方法


JSON 的三种格式

  1 普通的数值、字符串、布尔值（很少使用）

  2 对象（双引号，最后一个键值对不能加逗号）

  3 数组（数组每一项可以是简单或者复杂的数据结构）

  常用方法：

  JSON.parse 把 JSON 转换成 JS

  JSON.stringify 把 JS 数据类型转换成 JSON（字符串）



   
## 0269 搜索框3个英文开始搜索，一个中文开始搜索？


使用下面的函数，根据字符串的 unicode，判断是字母，符号，还是汉字，然后返回实际占用的字节个数。

```javascript
export const getValueLength = (str) => {
  var code, len = 0;
  for (var i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code === 10) { //solve enter problem
      len += 2;
    }
    else if (code < 0x007f) {
      len += 1;
    }
    else if (code >= 0x0080 && code <= 0x07ff) {
      len += 2;
    }
    // 汉字 unicode 9968到40869
    else if (code >= 0x0800 && code <= 0xffff) {
      len += 3;
    }
  }
  return len;
};

```

统一码（Unicode），也叫万国码、单一码，由统一码联盟开发，是计算机科学领域里的一项业界标准，包括字符集、编码方案等。统一码是为了解决传统的字符编码方案的局限而产生的，它为每种语言中的每个字符设定了统一并且唯一的二进制编码，以满足跨语言、跨平台进行文本转换、处理的要求。



   
## 0271 中文输入法 onChange 事件处理


问题：输入中文时，会频繁触发 onChange 事件，如果事件绑定了搜索函数（API）性能很差

处理：连续输入中文过程中，不向服务器搜索；完成输入后，发送请求向服务器搜索（类似节流函数）

使用 compositionStart 和 compositionEnd 事件，处理中文输入的开始和结束

注意 Chrome 浏览器的兼容性问题

```javascript
let isComposition = false
const isChrome = navigator.userAgent.indexOf('Chrome') > -1
 
const Input = () => {

  const handleComposition = (e) => {
    if (e.type === 'compositionend') {
      isComposition = false
      if (isChrome) {
        handleChange(e)
      }
    } else {
      isComposition = true
    }
  }
  
  const handleChange = (e) => {
    if (!isComposition) {
      const inputValue = e.target.value
      console.log(inputValue) // send API request
    }
  }
  
  return (
    <input
      type="text"
      onCompositionStart={handleComposition}
      onCompositionEnd={handleComposition}
      onChange={handleChange}
    />
  )
}
 
export default Input

```

参考链接：<https://blog.csdn.net/xjun0812/article/details/128440372> 



   
## 0307 JS 数据类型


基本类型：Number、Boolean、String、null、undefined

引用类型：Object，对象子类型（Array，Function）

symbol（ES6 新增的）: 表示独一无二的值，主要用于对象的属性，避免属性冲突，避免魔法字符串。

```javascript
let s = Symbol();
let obj = {};
obj.s = 10;

```

BigInt（ES2020） 它提供了一种方法来表示大于 `2^53 - 1` 的整数，详见另一个知识点

参考链接

<https://juejin.im/post/5b2b0a6051882574de4f3d96>

<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures>



   
## 0327 BigInt 是什么？


BigInt（ES2020） 它提供了一种方法来表示大于 `2^53 - 1` 的整数（大于 9007 1992 5474 0991）

可以用在一个整数字面量后面加 `n` 的方式定义一个 `BigInt` ，如：`10n`，或者调用函数 `BigInt()`（但不包含 `new` 运算符）并传递一个整数值或字符串值。

```
typeof 1n === "bigint"; // true
typeof BigInt("1") === "bigint"; // true

```

BigInt 在某些方面类似于 Number ，但是也有几个关键的不同点：不能用于 Math 对象中的方法；不能和任何 Number 实例混合运算，两者必须转换成同一种类型。在两种类型来回转换时要小心，因为 `BigInt` 变量在转换成 Number 变量时可能会丢失精度。

参考链接

<https://developer.mozilla.org/zh-CN/docs/Glossary/BigInt> 

实际项目还没有用到这么大的数字



   
## 0308 0.1 + 0.2 === 0.3 ?


JavaScirpt 使用 Number 类型来表示数字（整数或浮点数），遵循 IEEE 754 标准，通过 64 位来表示一个数字（1 + 11 + 52）

\- 1 符号位，0 表示正数，1 表示负数 s

\- 11 指数位（e）

\- 52 尾数，小数部分（即有效数字）

最大安全数字：Number.MAX_SAFE_INTEGER = Math.pow(2, 53) - 1，转换成整数就是 16 位，所以 0.1 === 0.1，是因为通过 toPrecision(16) 去有效位之后，两者是相等的。

在两数相加时，会先转换成二进制，0.1 和 0.2 转换成二进制的时候尾数会发生无限循环，然后进行对阶运算，JS 引擎对二进制进行截断，所以造成精度丢失。

所以总结：精度丢失可能出现在进制转换和对阶运算中

<https://juejin.im/post/5b90e00e6fb9a05cf9080dff>



   
## 0309 js 加载时 async、defer 的区别


如果依赖其他脚本和 DOM 结果，使用 defer，先下载完所有defer再依次执行

如果与 DOM 和其他脚本依赖不强时，使用 async，先下载完先执行

<https://mp.weixin.qq.com/s/pw5lfFeNagmjFj45ygl2dQ> 

<https://zhuanlan.zhihu.com/p/622763093> 



   
## 0310 如何判断一个对象是不是空对象


判断对象是否为空

```javascript
Object.keys(obj).length === 0

```

```javascript
// jquery

/**
 * Check whether the object is empty.
 * The true will be returned if the "obj" is invalid.
 * @param {object} obj
 * @returns bool
 */
const isEmptyObject = (obj) => {
  let name;
  // eslint-disable-next-line
  for (name in obj) {
    return false;
  }
  return true;
};

```



   
## 0311 怎么加事件监听，两种


onclick 和 addEventListener 对比



   
## 0312 原型链和原型链的继承


标准答案

什么是原型链：当对象查找一个属性的时候，如果没有在自身属性中找到，那么就会查找自身的原型，如果原型还没有找到，那么会继续查找原型的原型，直到找到 Object.prototype 的原型时，此时原型为 null，查找停止。 这种通过原型链接的逐级向上的查找链，被称为原型链。

什么是原型继承：一个对象可以使用另外一个对象的属性或者方法，就称之为继承。具体是通过将这个对象的原型设置为另外一个对象，这样根据原型链的规则，如果查找一个对象属性且在自身不存在时，就会查找另外一个对象，相当于一个对象可以使用另外一个对象的属性和方法了。

实际案例，class App extents React.Component 这样 APP 对象可以使用 Component 原型链的属性和方法

<https://zhuanlan.zhihu.com/p/35790971> 

其他补充：

所有普通的 \[\[Prototype]] 链最终都会指向内置的 Object.prototype，其包含了 JavaScript 中许多通用的功能

为什么能创建 “类”，借助一种特殊的属性：所有的函数默认都会拥有一个名为 prototype 的共有且不可枚举的属性，它会指向另外一个对象，这个对象通常被称为函数的原型

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.constructor = Person;

```

\- 在发生 new 构造函数调用时，会将创建的新对象的 \[\[Prototype]] 链接到 Person.prototype 指向的对象，这个机制就被称为原型链继承

\- 方法定义在原型上，属性定义在构造函数上

\- 首先要说一下 JS 原型和实例的关系：每个构造函数 （constructor）都有一个原型对象（prototype），这个原型对象包含一个指向此构造函数的指针属性，通过 new 进行构造函数调用生成的实例，此实例包含一个指向原型对象的指针，也就是通过 \[\[Prototype]] 链接到了这个原型对象

\- 然后说一下 JS 中属性的查找：当我们试图引用实例对象的某个属性时，首先查找实例对象上是否有这个属性，如果没有找到，就去构造这个实例对象的构造函数的 prototype 所指向的对象上去查找，如果还找不到，就从这个 prototype 对象所指向的构造函数的 prototype 原型对象上去查找

\- 什么是原型链：这样逐级查找形似一个链条，且通过 \[\[Prototype]] 属性链接，所以被称为原型链

\- 什么是原型链继承，类比类的继承：当有两个构造函数 A 和 B，将一个构造函数 A 的原型对象的，通过其 \[\[Prototype]] 属性链接到另外一个 B 构造函数的原型对象时，这个过程被称之为原型继承。



   
## 0313 数组常用 API


基础知识点

```
push

pop

splice

slice

shift

unshift

sort

find

findIndex

forEach

map

filter

reduce

toString

valudOf

includes

indexOf

lastIndexOf

some

any

every

```



   
## 0314 变量提升


函数在运行的时候，会首先创建执行上下文，然后将执行上下文入栈，然后当此执行上下文处于栈顶时，开始运行执行上下文。

在创建执行上下文的过程中会做三件事：创建变量对象，创建作用域链，确定 this 指向

其中创建变量对象的过程中，首先会为 arguments 创建一个属性，值为 arguments，然后会扫码 function 函数声明，创建一个同名属性，值为函数的引用，接着会扫码 var 变量声明，创建一个同名属性，值为 undefined，这就是变量提升



   
## 0321 快速的让一个数组乱序


乱序数组

```javascript
let arr = [1,2,3,4,5,6,7,8,9,10];

arr.sort(function(){
    return Math.random() - 0.5;
});

```



   
## 0382 URLSearchParams 是什么


<https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams> 

URLSearchParams 是 JS 内置对象

可以取代 qs 第三方库，管理查询字符串

```javascript
var paramsString = "q=URLUtils.searchParams&topic=api";
var searchParams = new URLSearchParams(paramsString);

for (let p of searchParams) {
  console.log(p);
}

searchParams.has("topic") === true; // true
searchParams.get("topic") === "api"; // true
searchParams.getAll("topic"); // ["api"]
searchParams.get("foo") === null; // true

searchParams.append("topic", "webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"

searchParams.set("topic", "More webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"

searchParams.delete("topic");
searchParams.toString(); // "q=URLUtils.searchParams"

```



   
## 0386 如何判断一个对象或者数组是空


判断对象是否为空

```javascript
Object.keys(obj).length === 0;

JSON.stringify(obj).length === 2;
```

判断数组是否为空，直接判断长度即可（已知参数必须为数组的前提）

   
## 0391 Event.isTrusted 是什么


Event 接口的 **isTrusted** 属性是一个只读属性，它是一个布尔值。

当事件是由用户真实行为生成的时候，这个属性的值为 `true` 

而当事件是由脚本创建、修改、通过 EventTarget.dispatchEvent() 派发的时候，这个属性的值为 `false` 。

   
## 0393 dbClick 不支持 IOS 设备怎么办


iOS 兼容性问题，不支持 dbClick 事件，可以用两次单击事件模拟双击事件。

```javascript
  onMobileDoubleClick = (event) => {
    // 清空之前的定时器（200内点击，清空第一次的定时器）
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    // 如果是JS模拟事件，直接返回
    if (!event.isTrusted) {
      return;
    }

    // 获取当前点击的坐标
    const { pageX, pageY } = event;

    // 如果已经点了一次（等待第二次点击）
    if (this.isWaitingForDoubleClick) {
      this.isWaitingForDoubleClick = false;

      // 判断前后两次点击的位置，如果点击同一个位置，就认为是双击
      const diffX = Math.abs(pageX - this.prevPosition.x);
      const diffY = Math.abs(pageY - this.prevPosition.y);
      if (diffX < 5 && diffY < 5) {
        this.onCellDoubleClick(event);
      }
    } else {
      // 如果刚开始点击，记录下第一次的位置
      this.prevPosition = { x: pageX, y: pageY };
      event.stopPropagation();
      this.isWaitingForDoubleClick = true;

      // 如果 200ms 内没有再次点击，那么清空第一次的点击事件，就认为是单击
      this.timer = setTimeout(() => {
        this.isWaitingForDoubleClick = false;
      }, 200);
    }
  }
```


   
## 0411 setSelectionRange


setSelectionRange 可以从一个被 focused 的 input 元素中选中特定范围的内容。

例如下面选中 input 中的第2-5个字符

```javascript
input.setSelectionRange(2,5);
```


  