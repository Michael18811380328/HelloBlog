# [js中通过Object.prototype.toString方法----精确判断对象的类型](https://www.cnblogs.com/bq-med/p/8796836.html)

在 JavaScript 里使用 typeof 来判断数据类型，只能区分基本类型，即 “number”，”string”，”undefined”，”boolean”，”object”，“function”，“symbol” (ES6新增)七种。

**对于数组、null、对象来说，其关系错综复杂，使用 typeof 都会统一返回 “object” 字符串。**

要想区别对象、数组、函数单纯使用 typeof 是不行的，JavaScript中,通过Object.prototype.toString方法，判断某个对象值属于哪种内置类型。

在介绍Object.prototype.toString方法之前，我们先把toString()方法和Object.prototype.toString.call()方法进行对比。

### toString()方法和Object.prototype.toString.call()方法对比

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
var arr=[1,2];

//直接对一个数组调用toString()
arr.toString();// "1,2"

//通过call指定arr数组为Object.prototype对象中的toString方法的上下文
Object.prototype.toString.call(arr); //"[object Array]"
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

Object.prototype中的toString方法是确实被继承下来了，但是很多东西总不会一层不变，作为儿子的数组重写了toString方法，所以直接调用数组对象上面的toString方法调用到的实际是重写后的方法，并不是Object.prototype中的toString方法。

应用场景：如果没有应用场景讲这个也没啥用了，那到底有啥用呢？

Object.prototype对象上的toString方法可以用来判断数据类型

```
Object.prototype.toString.call(arr); //"[object Array]"  判断是否是数组
```

而重写后的toString方法可以把对象转换成字符串，还可以把数值转换成不同进制的数

```
[1,2].toString();// "1,2"  得到字符串

(10).toString(2);//10进制转2进制 1010 ，如果1.toString(2)会报错，因为js会认为.是数字的小数点而不是调用符号
```

#### 为什么toString会有不同的作用呢？

其实，这里面就涉及到**js原型及原型链**的相关知识

```
var arr=[1,2,3];
Object.prototype.toString.call(arr);
Array.prototype.toString.call(arr);
```

来看一下效果：

![img](https://images2018.cnblogs.com/blog/624465/201804/624465-20180411165840492-1237868102.png)

看到这里大家都应该明白了，其实只有`Object.prototype`上的`toString`才能用来进行复杂数据类型的判断。

简单解释一些原型链的概念：

我们都知道js中的对象都继承自`Object`，所以当我们在某个对象上调用一个方法时，会先在该对象上进行查找，如果没找到则会进入对象的原型（也就是`.prototype`）进行查找，如果没找到，同样的也会进入对象原型的原型进行查找，直到找到或者进入原型链的顶端`Object.prototype`才会停止。

所以，当我们使用`arr.toString()`时，不能进行复杂数据类型的判断，因为它调用的是`Array.prototype.toString`，虽然`Array`也继承自`Object`，但js在`Array.prototype`上重写了`toString`，而我们通过`toString.call(arr)`实际上是通过原型链调用了`Object.prototype.toString`。

 

### 精确判断对象的类型

JavaScript 中一切都是对象，任何都不例外，对所有值类型应用 Object.prototype.toString.call() 方法结果如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
console.log(Object.prototype.toString.call(123));    //[object Number]
console.log(Object.prototype.toString.call('123'));    //[object String]
console.log(Object.prototype.toString.call(undefined));    //[object Undefined]
console.log(Object.prototype.toString.call(true));    //[object Boolean]
console.log(Object.prototype.toString.call({}));    //[object Object]
console.log(Object.prototype.toString.call([]));    //[object Array]
console.log(Object.prototype.toString.call(function(){}));    //[object Function]
console.log(Object.prototype.toString.call(null));    //[[object Null]]
```