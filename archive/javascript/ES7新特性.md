# 盘点ES7、ES8、ES9、ES10新特性

从 ECMAScript 2016（ES7）开始，版本发布变得更加频繁，每年发布一个新版本，好在每次版本的更新内容并不多，本文会细说这些新特性，尽可能和旧知识相关联，帮你迅速上手这些特性。

## ES7

### 1.Array.prototype.includes()方法

重点：==字符串和数组都可以使用includes方法==

在 ES6 中我们有 String.prototype.includes() 可以查询给定字符串是否包含一个字符，而在 ES7 中，我们在数组中也可以用 Array.prototype.includes 方法来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回true，否则返回false。

```js
const arr = [1, 3, 5, 2, '8', NaN, -0]
arr.includes(1) // true
arr.includes(1, 2) // false 该方法的第二个参数表示搜索的起始位置，默认为0
arr.includes('1') // false
arr.includes(NaN) // true
arr.includes(+0) // true
```

不足之处：这个方法内部需要遍历数组，大量使用includes的性能不好

在ES7之前想判断数组中是否包含一个元素，有如下两种方法，但都不如includes来得直观：

- indexOf()

indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

```js
if (arr.indexOf(el) !== -1) {
  // ...
}
```

不过这种方法有两个缺点，一是不够语义化，要先找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。

```js
[NaN].indexOf(NaN)// -1
```

- find() 和 findIndex()

数组实例的find方法，用于找出第一个符合条件的数组成员。另外，这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。

```js
[1, 4, -5, 10].find((n) => n < 0) // -5
[1, 5, 10, 15].findIndex(function(value) {
  return value > 9;
}) // 2
[NaN].findIndex(y => Object.is(NaN, y)) // 0
```

### 2.求幂运算符 **

在ES7中引入了指数运算符，具有与Math.pow()等效的计算结果

```js
console.log(2**10);// 输出1024
console.log(Math.pow(2, 10)) // 输出1024
```

## ES8

### 1.Async/Await

我们都知道使用Promise能很好地解决回调地狱的问题，但如果处理流程比较复杂的话，那么整段代码将充斥着then，语义化不明显，代码不能很好地表示执行流程，那有没有比Promise更优雅的异步方式呢？

假如有这样一个使用场景：需要先请求a链接，等返回信息之后，再请求b链接的另外一个资源。下面代码展示的是使用fetch来实现这样的需求，fetch被定义在window对象中，它返回的是一个Promise对象

```js
fetch('https://blog.csdn.net/').then(response => {
  console.log(response)
  return fetch('https://juejin.im/')
}).then(response => {
  console.log(response)
}).catch(error => {
  console.log(error)
});
```

虽然上述代码可以实现这个需求，但语义化不明显，代码不能很好地表示执行流程。基于这个原因，ES8引入了async/await，这是JavaScript异步编程的一个重大改进，提供了在不阻塞主线程的情况下使用同步代码实现异步访问资源的能力，并且使得代码逻辑更加清晰。

PS: 函数需要使用 async 说明异步函数，内部异步的操作使用await语句说明，函数执行到这一步就会暂停，等异步函数执行后返回结果（通常需要使用返回结果），然后执行后面的操作。

```js
async function foo () {
  try {
    let response1 = await fetch('https://blog.csdn.net/')
    console.log(response1)
    let response2 = await fetch('https://juejin.im/')
    console.log(response2)
  } catch (err) {
    console.error(err)
  }
}
foo();
```

通过上面代码，你会发现整个异步处理的逻辑都是使用同步代码的方式来实现的，而且还支持try catch来捕获异常，这感觉就在写同步代码，所以是非常符合人的线性思维的。需要强调的是，**await 不可以脱离 async 单独使用**，await 后面一定是Promise 对象，如果不是会自动包装成Promise对象。

根据MDN定义，**async是一个通过异步执行并隐式返回Promise作为结果的函数**。

```js
async function foo () {
  return 'Michael An'
}

foo().then(val => {
  console.log(val) // Michael An
});
```

上述代码，我们可以看到调用async 声明的 foo 函数返回了一个Promise对象，等价于下面代码：

```js
async function foo () {
  return Promise.resolve('Michael An')
}
foo().then(val => {
  console.log(val) // Michael An
})

```

Promise.resolve() 具体的API需要熟悉

### 2.Object.values()，Object.entries()

ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。ES8引入了跟Object.keys配套的Object.values和Object.entries，作为遍历一个对象的补充手段，供for...of循环使用。

Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

```js
const obj = { foo: 'bar', baz: 42 };
Object.values(obj) // ["bar", 42]
const obj = { 100: 'a', 2: 'b', 7: 'c' };
Object.values(obj) // ["b", "c", "a"]
```

需要注意的是，**如果属性名为数值的属性，是按照数值大小，从小到大遍历的**，因此返回的顺序是b、c、a。

Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。这个特性我们后面介绍ES10的Object.fromEntries()还会再提到。

```js
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj) // [ ["foo", "bar"], ["baz", 42] ]
const obj = { 10: 'xxx', 1: 'yyy', 3: 'zzz' };
Object.entries(obj); // [['1', 'yyy'], ['3', 'zzz'], ['10': 'xxx']]
```

PS：数组是特殊的对象，所以上面的三个方法可以遍历数组的键值对；Object.keys(arr) Object.values(arr) Object.entries(arr) 这三个API是Object对象上的原型方法，不是arr obj 上面的实例方法。获取的是对象自身的、可遍历的属性集合。

### 3.String padding

String 新增了两个实例函数 String.prototype.padStart 和 String.prototype.padEnd，允许将空字符串或其他字符串添加到原始字符串的开头或结尾。我们先看下使用语法：

```js
String.padStart(targetLength,[padString])
```

- targetLength(必填):当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
- padString(可选):填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断，此参数的缺省值为 " "。

```js
'x'.padStart(4, 'ab') // 'abax'
'x'.padEnd(5, 'ab') // 'xabab'
```

有时候我们处理日期、金额的时候经常要格式化，这个特性就派上用场：

```js
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

### 4.Object.getOwnPropertyDescriptors()

ES5 的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象（descriptor）。ES8 引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象。

```js
const obj = {
  name: 'Michael An',
  get bar () {
    return 'abc'
  }
}
console.log(Object.getOwnPropertyDescriptors(obj))
```

得到如下结果：

~~~js
name:
  value: "Michael An"
  writable: true
  enumerable: true
  configurable: true
  __proto__: Object
bar:
  get: ƒ bar()
  set: undefined
  enumerable: true
  configurable: true
  __proto__: Object
__proto__: Object
~~~

该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。我们来看个例子：

```js
const source = {
  set foo (value) {
    console.log(value)
  },
  get bar () {
    return 'Michael An'
  }
}
const target1 = {}
Object.assign(target1, source)
console.log(Object.getOwnPropertyDescriptor(target1, 'foo'))
```

上面代码中，source对象的foo属性的值是一个赋值函数，Object.assign方法将这个属性拷贝给target1对象，结果该属性的值变成了undefined。这是因为**Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法**。

这时，Object.getOwnPropertyDescriptors()方法配合Object.defineProperties()方法，就可以实现正确拷贝。

```js
const source = {
  set foo (value) {
    console.log(value)
  },
  get bar () {
    return 'Michael An'
  }
}
const target2 = {}
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source))
console.log(Object.getOwnPropertyDescriptor(target2, 'foo'))

```

## ES9新特性

### 1.for await of

for of方法能够遍历具有Symbol.iterator接口的同步迭代器数据，但是不能遍历异步迭代器。 ES9新增的for await of可以用来遍历具有Symbol.asyncIterator方法的数据结构，也就是异步迭代器，且会等待前一个成员的状态改变后才会遍历到下一个成员，相当于async函数内部的await。现在我们有三个异步任务，想要实现依次输出结果，该如何实现呢？

```js
// for of遍历
function Gen (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(time)
    }, time)
  })
}
async function test () {
  let arr = [Gen(2000), Gen(100), Gen(3000)]
  for (let item of arr) {
    console.log(Date.now(), item.then(console.log))
  }
}
test()

```

得到如下结果：

上述代码证实了for of方法不能遍历异步迭代器，得到的结果并不是我们所期待的，于是for await of就粉墨登场啦！

```js
function Gen (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(time)
    }, time)
  })
}
async function test () {
  let arr = [Gen(2000), Gen(100), Gen(3000)]
  for await (let item of arr) {
    console.log(Date.now(), item)
  }
}
test()
// 1575536194608 2000
// 1575536194608 100
// 1575536195608 3000

```

使用for await of遍历时，会等待前一个Promise对象的状态改变后，再遍历到下一个成员。



### 2.Object Rest Spread

ES6中添加的最意思的特性之一是spread操作符。你不仅可以用它替换cancat()和slice()方法，使数组的操作(复制、合并)更加简单，还可以在数组必须以拆解的方式作为函数参数的情况下，spread操作符也很实用。

```js
const arr1 = [10, 20, 30];
const copy = [...arr1]; // 复制
console.log(copy);    // [10, 20, 30]
const arr2 = [40, 50];
const merge = [...arr1, ...arr2]; // 合并
console.log(merge);    // [10, 20, 30, 40, 50]
console.log(Math.max(...arr));    // 30 拆解
```

ES9通过向对象文本添加扩展属性进一步扩展了这种语法。他可以将一个对象的属性拷贝到另一个对象上，参考以下情形:

```js
const input = {
  a: 1,
  b: 2,
  c: 1
}
const output = {
  ...input,
  c: 3
}
console.log(output) // {a: 1, b: 2, c: 3}
```

上面代码可以把 input 对象的数据都添加到 output 对象中，需要注意的是，**如果存在相同的属性名，只有最后一个会生效**。

```js
const input = {
  a: 1,
  b: 2
}
const output = {
  ...input,
  c: 3
}
input.a='Michael An'
console.log(input,output) // {a: "Michael An", b: 2} {a: 1, b: 2, c: 3}
```

上面例子中，修改input对象中的值，output并没有改变，说明扩展运算符拷贝一个对象（类似这样obj2 = {...obj1}），**实现只是一个对象的浅拷贝**。值得注意的是，如果属性的值是一个对象的话，该对象的引用会被拷贝：

```js
const obj = {x: {y: 10}};
const copy1 = {...obj};    
const copy2 = {...obj}; 
obj.x.y='Michael An'
console.log(copy1,copy2) // x: {y: "Michael An"} x: {y: "Michael An"}
console.log(copy1.x === copy2.x);    // → true
```

copy1.x 和 copy2.x 指向同一个对象的引用，所以他们严格相等。

我们再来看下 Object rest 的示例：

```js
const input = {
  a: 1,
  b: 2,
  c: 3
}
let { a, ...rest } = input
console.log(a, rest) // 1 {b: 2, c: 3}
```

当对象 key-value 不确定的时候，把必选的 key 赋值给变量，用一个变量收敛其他可选的 key 数据，这在之前是做不到的。注意，**rest属性必须始终出现在对象的末尾**，否则将抛出错误。

### 3.Promise.prototype.finally()

Promise.prototype.finally() 方法返回一个Promise，在promise执行结束时，无论结果是fulfilled或者是rejected，在执行then()和catch()后，都会执行finally指定的回调函数。

```js
fetch('https://www.google.com')
  .then((response) => {
    console.log(response.status);
  })
  .catch((error) => { 
    console.log(error);
  })
  .finally(() => { 
    document.querySelector('#spinner').style.display = 'none';
  });
```

无论操作是否成功，当您需要在操作完成后进行一些清理时，finally()方法就派上用场了。这为指定执行完promise后，无论结果是fulfilled还是rejected都需要执行的代码提供了一种方式，**避免同样的语句需要在then()和catch()中各写一次的情况**。

### 4.新的正则表达式特性

ES9为正则表达式添加了四个新特性，进一步提高了JavaScript的字符串处理能力。这些特点如下:

- s (dotAll) 标志
- 命名捕获组
- Lookbehind 后行断言
- Unicode属性转义

#### （1）s(dotAll)flag

正则表达式中，点（.）是一个特殊字符，代表任意的单个字符，但是有两个例外。一个是四个字节的 UTF-16 字符，这个可以用u修饰符解决；另一个是行终止符,如换行符(\n)或回车符(\r),这个可以通过ES9的s(dotAll)flag，在原正则表达式基础上添加s表示:

```js
console.log(/foo.bar/.test('foo\nbar')) // false
console.log(/foo.bar/s.test('foo\nbar')) // true
```

那如何判断当前正则是否使用了 dotAll 模式呢？

```js
const re = /foo.bar/s // Or, `const re = new RegExp('foo.bar', 's');`.
console.log(re.test('foo\nbar')) // true
console.log(re.dotAll) // true
console.log(re.flags) // 's'
```

#### （2）命名捕获组

在一些正则表达式模式中，使用数字进行匹配可能会令人混淆。例如，使用正则表达式/(\d{4})-(\d{2})-(\d{2})/来匹配日期。因为美式英语中的日期表示法和英式英语中的日期表示法不同，所以很难区分哪一组表示日期，哪一组表示月份:

```js
const re = /(\d{4})-(\d{2})-(\d{2})/;
const match= re.exec('2019-01-01');
console.log(match[0]);    // → 2019-01-01
console.log(match[1]);    // → 2019
console.log(match[2]);    // → 01
console.log(match[3]);    // → 01
```

ES9引入了命名捕获组，允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用。

```js
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = re.exec('2019-01-01');
console.log(match.groups);          // → {year: "2019", month: "01", day: "01"}
console.log(match.groups.year);     // → 2019
console.log(match.groups.month);    // → 01
console.log(match.groups.day);      // → 01
```

上面代码中，“命名捕获组”在圆括号内部，模式的头部添加“问号 + 尖括号 + 组名”（?），然后就可以在exec方法返回结果的groups属性上引用该组名。

命名捕获组也可以使用在replace()方法中，例如将日期转换为美国的 MM-DD-YYYY 格式：

```js
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
const usDate = '2018-04-30'.replace(re, '$<month>-$<day>-$<year>')
console.log(usDate) // 04-30-2018
```

#### （3）Lookbehind 后行断言

JavaScript 语言的正则表达式，只支持先行断言，不支持后行断言，先行断言我们可以简单理解为"先遇到一个条件，再判断后面是否满足"，如下面例子：

```js
let test = 'hello world'
console.log(test.match(/hello(?=\sworld)/))
// ["hello", index: 0, input: "hello world", groups: undefined]
```

但有时我们想判断前面是 world 的 hello，这个代码是实现不了的。在 ES9 就支持这个后行断言了：

```js
let test = 'world hello'
console.log(test.match(/(?<=world\s)hello/))
// ["hello", index: 6, input: "world hello", groups: undefined]
```

**(?<…)是后行断言的符号，(?..)是先行断言的符号**，然后结合 =(等于)、!(不等)、\1(捕获匹配)。

#### （4）Unicode属性转义

ES2018 引入了一种新的类的写法\p{...}和\P{...}，允许正则表达式匹配符合 Unicode 某种属性的所有字符。比如你可以使用\p{Number}来匹配所有的Unicode数字，例如，假设你想匹配的Unicode字符㉛字符串:

```js
const str = '㉛';
console.log(/\d/u.test(str));    // → false
console.log(/\p{Number}/u.test(str));     // → true
```

同样的，你可以使用\p{Alphabetic}来匹配所有的Unicode单词字符:

```js
const str = 'ض';
console.log(/\p{Alphabetic}/u.test(str));     // → true
// the \w shorthand cannot match ض
console.log(/\w/u.test(str));    // → false
```

同样有一个负向的Unicode属性转义模板 \P{...}

```js
console.log(/\P{Number}/u.test('㉛'));    // → false
console.log(/\P{Number}/u.test('ض'));    // → true
console.log(/\P{Alphabetic}/u.test('㉛'));    // → true
console.log(/\P{Alphabetic}/u.test('ض'));    // → false
```

除了字母和数字之外，Unicode属性转义中还可以使用其他一些属性。



## ES10新特性

### 1.Array.prototype.flat()

多维数组是一种常见的数据格式，特别是在进行数据检索的时候。将多维数组打平是个常见的需求。通常我们能够实现，但是不够优雅。

flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

```js
newArray = arr.flat(depth) // depth是指定要提取嵌套数组的结构深度，默认值为 1	
```

接下来我们看两个例子：

```js
const numbers1 = [1, 2, [3, 4, [5, 6]]]
console.log(numbers1.flat())// [1, 2, 3, 4, [5, 6]]
const numbers2 = [1, 2, [3, 4, [5, 6]]]
console.log(numbers2.flat(2))// [1, 2, 3, 4, 5, 6]
```

上面两个例子说明flat 的参数没有设置，取默认值 1，也就是说只扁平化第一级；当 flat 的参数大于等于 2，返回值就是 [1, 2, 3, 4, 5, 6] 了。

### 2.Array.prototype.flatMap()

有了flat方法，那自然而然就有Array.prototype.flatMap方法，flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。从方法的名字上也可以看出来它包含两部分功能一个是 map，一个是 flat（深度为1）。

```js
let arr = [1, 2, 3]
console.log(arr.map(item => [item * 2]).flat()) // [2, 4, 6]
console.log(arr.flatMap(item => [item * 2])) // [2, 4, 6]
```

实际上flatMap是综合了map和flat的操作，所以**它也只能打平一层**。

### 3.Object.fromEntries()

Object.fromEntries 这个新的API实现了与 Object.entries 相反的操作。这使得根据对象的 entries 很容易得到 object。

```js
const object = { x: 23, y: 24 };
const entries = Object.entries(object); // [['x', 23], ['y', 24]]
const result = Object.fromEntries(entries); // { x: 23, y: 24 }
```

ES2017引入了Object.entries, 这个方法可以将对象转换为数组,这样对象就可以使用数组原型中的众多内置方法，比如map, filter、reduce，举个例子，我们想提取下列对象obj中所有value大于21的键值对，如何操作呢？

```js
// ES10之前
const obj = {
  a: 21,
  b: 22,
  c: 23
}
console.log(Object.entries(obj)) // [['a',21],["b", 22],["c", 23]]
let arr = Object.entries(obj).filter(([a, b]) => b > 21) // [["b", 22],["c", 23]]
let obj1 = {}
for (let [name, age] of arr) {
  obj1[name] = age
}
console.log(obj1) // {b: 22, c: 23}
```

上例中得到了数组arr，想再次转化为对象，就需要手动写一些代码来处理，但是有了Object.fromEntries()就很容易实现

```js
// 用Object.fromEntries()来实现
const obj = {
  a: 21,
  b: 22,
  c: 23
}
let res = Object.fromEntries(Object.entries(obj).filter(([a, b]) => b > 21))
console.log(111, res) // {b: 22, c: 23}
```

### 4.String.trimStart 和 String.trimEnd

移除开头和结尾的空格，之前我们用正则表达式来实现，现在ES10新增了两个新特性，让这变得更简单！

trimStart() 方法从字符串的开头删除空格，trimLeft()是此方法的别名。

```js
let str = ' 前端工匠 '
console.log(str.length) // 6
str = str.trimStart()
console.log(str.length) // 5
let str1 = str.trim() // 清除前后的空格
console.log(str1.length) // 4
str.replace(/^\s+/g, '') // 也可以用正则实现开头删除空格
```

trimEnd() 方法从一个字符串的右端移除空白字符，trimRight 是 trimEnd 的别名。

```js
let str = ' Michael An '
console.log(str.length) // 6
str = str.trimEnd()
console.log(str.length) // 5
let str1 = str.trim() //清除前后的空格
console.log(str1.length) // 4
str.replace(/\s+$/g, '') // 也可以用正则实现右端移除空白字符
```

### 5.String.prototype.matchAll

如果一个正则表达式在字符串里面有多个匹配，现在一般使用g修饰符或y修饰符，在循环里面逐一取出。

```js
function collectGroup1 (regExp, str) {
  const matches = []
  while (true) {
    const match = regExp.exec(str)
    if (match === null) break
    matches.push(match[1])
  }
  return matches
}
console.log(collectGroup1(/"([^"]*)"/g, `"foo" and "bar" and "baz"`))
// [ 'foo', 'bar', 'baz' ]
```

值得注意的是，如果没有修饰符 /g, .exec() 只返回第一个匹配。现在通过ES9的String.prototype.matchAll方法，可以一次性取出所有匹配。

```js
function collectGroup1 (regExp, str) {
  let results = []
  for (const match of str.matchAll(regExp)) {
    results.push(match[1])
  }
  return results
}
console.log(collectGroup1(/"([^"]*)"/g, `"foo" and "bar" and "baz"`))
// ["foo", "bar", "baz"]

```

上面代码中，由于string.matchAll(regex)返回的是遍历器，所以可以用for...of循环取出。

### 6.try…catch

在ES10中，try-catch语句中的参数变为了一个可选项。以前我们写catch语句时，必须传递一个异常参数。这就意味着，即便我们在catch里面根本不需要用到这个异常参数也必须将其传递进去

```js
// ES10之前
try {
  // tryCode
} catch (err) {
  // catchCode
}
```

这里 err 是必须的参数，在 ES10 可以省略这个参数：

```js
// ES10
try {
  console.log('Foobar')
} catch {
  console.error('Bar')
}
```

### 7.BigInt

JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示的，这使得 JavaScript 不适合进行科学和金融方面的精确计算。二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回Infinity。

```js
// 超过 53 个二进制位的数值，无法保持精度
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true
// 超过 2 的 1024 次方的数值，无法表示
Math.pow(2, 1024) // Infinity
```

现在ES10引入了一种新的数据类型 BigInt（大整数），来解决这个问题。BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。

创建 BigInt 类型的值也非常简单，只需要在数字后面加上 n 即可。例如，123 变为 123n。也可以使用全局方法 BigInt(value) 转化，入参 value 为数字或数字字符串。

```js
const aNumber = 111;
const aBigInt = BigInt(aNumber);
aBigInt === 111n // true
typeof aBigInt === 'bigint' // true
typeof 111 // "number"
typeof 111n // "bigint"
```

如果算上 BigInt，JavaScript 中原始类型就从 6 个变为了 7 个。

- Boolean
- Null
- Undefined
- Number
- String
- Symbol (new in ECMAScript 2015)
- BigInt (new in ECMAScript 2019)

### 8.Symbol.prototype.description

我们知道，Symbol 的描述只被存储在内部的 [[Description]]，没有直接对外暴露，我们只有调用 Symbol 的 toString() 时才可以读取这个属性：

```js
Symbol('desc').description;  // "desc"
Symbol('').description;      // ""
Symbol().description;        // undefined
```

### 9.Function.prototype.toString()

ES2019中，Function.toString()发生了变化。之前执行这个方法时，得到的字符串是去空白符号的。而现在，得到的字符串呈现出原本源码的样子：

```js
function sum(a, b) {
  return a + b;
}
console.log(sum.toString());
// function sum(a, b) {
//  return a + b;
// }
```
