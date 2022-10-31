# 理解ES6的 Iterator 、Iterable 、 Generator

[![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/22/15fe29066edb99ba~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)](https://link.juejin.cn?target=https%3A%2F%2Fuser-images.githubusercontent.com%2F17233090%2F33112922-a8f5a4dc-cf90-11e7-8466-5d7f3d8177b1.png)

## 什么是迭代器(Iterator)？

满足[迭代器协议](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FIteration_protocols%23%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%8D%8F%E8%AE%AE)的对象。
 [迭代器协议](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FIteration_protocols%23%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%8D%8F%E8%AE%AE):    对象的`next`方法是一个无参函数，它返回一个对象，该对象拥有`done`和`value`两个属性：

- ```
  done
  ```

  (

  ```
  boolean
  ```

  ):        

  - 如果迭代器已经经过了被迭代序列时为`true`。这时`value`可能描述了该迭代器的返回值。
  - 如果迭代器可以产生序列中的下一个值，则为`false`。这等效于连同`done`属性也不指定。

- `value`: 迭代器返回的任何 JavaScript值。`done`为`true`时可省略。

ES5实现一个简单的迭代器：

```javascript
function createIterator(items) {
    var i = 0;

    return {
        next: function() {

            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;

            return {
                done: done,
                value: value
            };
        }
    };
}

var iterator = createIterator([1, 2, 3]);

console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 2, done: false }"
console.log(iterator.next());           // "{ value: 3, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"
// 之后的所有调用
console.log(iterator.next());           // "{ value: undefined, done: true }"复制代码
```

## 什么是可迭代对象(Iterable)？

满足[可迭代协议](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FIteration_protocols%23%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%8D%8F%E8%AE%AE)的对象是可迭代对象。
 [可迭代协议](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FIteration_protocols%23%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%8D%8F%E8%AE%AE):    对象的`[Symbol.iterator]`值是一个无参函数，该函数返回一个迭代器。

在ES6中，所有的集合对象（`Array`、 `Set` 与 `Map`）以及`String`、`arguments`都是可迭代对象，它们都有默认的迭代器。

可迭代对象可以在以下语句中使用：

- [for...of循环](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FStatements%2Ffor...of)

```javascript
for (let value of ['a', 'b', 'c']) {
  console.log(value);
}
// "a"
// "b"
// "c"复制代码
```

- [扩展运算符](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2FSpread_operator)

```css
[...'abc'];   // ["a", "b", "c"]
console.log(...['a', 'b', 'c']);   // ["a", "b", "c"]复制代码
```

- [yield*](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Fyield*)

```scss
function* gen() {
  yield* ['a', 'b', 'c'];
}

gen().next(); // { value: "a", done: false }复制代码
```

- [解构赋值](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2FDestructuring_assignment)

```css
let [a, b, c] = new Set(['a', 'b', 'c']);
a;   // 'a'复制代码
```

## 理解 [for...of](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FStatements%2Ffor...of) 循环

`for...of`接受一个可迭代对象（Iterable），或者能被强制转换/包装成一个可迭代对象的值（如'abc'）。遍历时，`for...of`会获取可迭代对象的`[Symbol.iterator]()`，对该迭代器逐次调用next()，直到迭代器返回对象的`done`属性为`true`时，遍历结束，不对该value处理。

`for...of`循环实例：

```css
var a = ["a","b","c","d","e"];

for (var val of a) {
    console.log( val );
}
// "a" "b" "c" "d" "e"复制代码
```

转换成普通for循环示例，等价于上面`for...of`循环：

```js
var a = ["a","b","c","d","e"];

for (var val, ret, it = a[Symbol.iterator]();
    (ret = it.next()) && !ret.done;
) {
    val = ret.value;
    console.log( val );
}
// "a" "b" "c" "d" "e"复制代码
```

## 使迭代器可迭代

在[什么是迭代器](https://link.juejin.cn?target=)部分，我们自定义了一个简单的生成迭代器的函数`createIterator`，但并该函数生成的迭代器并没有实现可迭代协议，所以不能在`for...of`等语法中使用。可以为该对象实现可迭代协议，在`[Symbol.iterator]`函数中返回该迭代器自身。

```javascript
function createIterator(items) {
    var i = 0;

    return {
        next: function () {

            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;

            return {
                done: done,
                value: value
            };
        },
        [Symbol.iterator]: function () { return this }
    };
}

var iterator = createIterator([1, 2, 3]);
console.log(...iterator)复制代码
```

## 

## 什么是生成器(Generator)？

### 生成器函数

[生成器函数（GeneratorFunction）](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FStatements%2Ffunction*)是能返回一个[生成器（generator）](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FGenerator)的函数。生成器函数由放在    function 关键字之后的一个星号（ * ）来表示，并能使用新的 yield 关键字。

```javascript
function *aGeneratorfunction(){
  yield 1
  yield 2
  yield 3
};

var aGeneratorObject = aGeneratorfunction()
// 生成器对象
aGeneratorObject.toString()   // "[object Generator]"复制代码
```

### [生成器对象既是迭代器，又是可迭代对象](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FIteration_protocols%23%E7%94%9F%E6%88%90%E5%99%A8%E5%AF%B9%E8%B1%A1%E5%88%B0%E5%BA%95%E6%98%AF%E4%B8%80%E4%B8%AA%E8%BF%AD%E4%BB%A3%E5%99%A8%E8%BF%98%E6%98%AF%E4%B8%80%E4%B8%AA%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%AF%B9%E8%B1%A1)

```scss
function *aGeneratorfunction(){
  yield 1
  yield 2
  yield 3
};

var aGeneratorObject = aGeneratorfunction()

// 满足迭代器协议，是迭代器
aGeneratorObject.next()   // {value: 1, done: false}
aGeneratorObject.next()   // {value: 2, done: false}
aGeneratorObject.next()   // {value: 3, done: false}
aGeneratorObject.next()   // {value: undefined, done: true}

// [Symbol.iterator]是一个无参函数，该函数执行后返回生成器对象本身（是迭代器），所以是可迭代对象
aGeneratorObject[Symbol.iterator]() === aGeneratorObject   // true

// 可以被迭代
var aGeneratorObject1 = aGeneratorfunction()
[...aGeneratorObject1]   // [1, 2, 3]复制代码
```

### 在生成器中return

遍历返回对象的`done`值为`true`时迭代即结束，不对该`value`处理。

```vbnet
function *createIterator() {
  yield 1;
  return 42;
  yield 2;
}

let iterator = createIterator();
iterator.next();   // {value: 1, done: false}
iterator.next();   // {value: 42, done: true}
iterator.next();   // {value: undefined, done: true}复制代码
```

`done`值为true时迭代即结束，迭代不对该value处理。所以对这个迭代器遍历，不会对值42处理。

```js
let iterator1 = createIterator();
console.log(...iterator);   // 1复制代码
```

## 添加`[Symbol.iterator]`使`Object`可迭代

根据[可迭代协议](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FIteration_protocols)，给`Object`的原型添加`[Symbol.iterator]`，值为返回一个对象的无参函数，被返回对象符合迭代器协议。

```css
Object.prototype[Symbol.iterator] = function () {
  var i = 0
  var items = Object.entries(this)
  return {
    next: function () {
      var done = (i >= items.length);
      var value = !done ? items[i++] : undefined;

      return {
          done: done,
          value: value
      };
    }
  }
}

var a = {
  name: 'Jimmy',
  age: 18,
  job: 'actor'
}

console.log(...a)   // [ 'name', 'Jimmy' ] [ 'age', 18 ] [ 'job', 'actor' ]复制代码
```

使用生成器简化代码：

```css
Object.prototype[Symbol.iterator] = function* () {
  for (const key in this) {
    if (this.hasOwnProperty(key)) {
      yield [key, this[key]];
    }
  }
}

var a = {
  name: 'Jimmy',
  age: 18,
  job: 'actor'
}

console.log(...a)   // [ 'name', 'Jimmy' ] [ 'age', 18 ] [ 'job', 'actor' ]复制代码
```

## 生成器委托 [yield*](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Fyield*)

```javascript
function* g1() {
  yield 1;
  yield 2;
}

function* g2() {
  yield* g1();
  yield* [3, 4];
  yield* "56";
  yield* arguments;
}

var generator = g2(7, 8);
console.log(...generator);   // 1 2 3 4 "5" "6" 7 8复制代码
```

## 最后一个例子

分析下面这段代码：

```js
function* fibs() {
  var a = 0;
  var b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

var [first, second, third, fourth, fifth, sixth] = fibs();
console.log(first, second, third, fourth, fifth, sixth);复制代码
```

在这段代码里，`fibs`是一个生成无限长的斐波那契数列的生成器，`[a, b] = [b, a + b]`是利用解构赋值的交换赋值写法（=赋值是从右到左计算，所以先计算右侧`a+b`，然后才结构，所有有交换赋值的效果），写成生成有限长的数组的ES5写法如下：

```js
function fibs1(n) {
  var a = 0;
  var b = 1;
  var c = 0;
  var result = []
  for (var i = 0; i < n; i++) {
    result.push(a);
    c = a;
    a = b;
    b = c + b;
  }

  return result;
}

console.log(fibs1(6))   // [0, 1, 1, 2, 3, 5]复制代码
```

而第一段代码里，就是从`fibs()`迭代器（生成器是迭代器的子集）中解构出前六个值，代码示例如下：

```js
function* fibs2(n) {
  var a = 0;
  var b = 1;
  for (var i = 0; i < n; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

console.log(...fibs2(6))复制代码
```

## 为什么要使用迭代器、生成器，有什么好处？

...还没想清楚

以上，有很多个人理解的部分，欢迎纠错(*￣︶￣)

参考：

- [你不懂JS：ES6与未来](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fgetify%2FYou-Dont-Know-JS%2Fblob%2F1ed-zh-CN%2Fes6%20%26%20beyond%2Fch3.md)
- [Understanding ECMAScript 6:第八章 迭代器与生成器](https://link.juejin.cn?target=https%3A%2F%2Fsagittarius-rev.gitbooks.io%2Funderstanding-ecmascript-6-zh-ver%2Fcontent%2Fchapter_8.html)
- [MDN：迭代协议](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FIteration_protocols)
- [MDN：迭代器和生成器](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FGuide%2FIterators_and_Generators)
- [完全理解Python迭代对象、迭代器、生成器](https://link.juejin.cn?target=https%3A%2F%2Ffoofish.net%2Fiterators-vs-generators.html)
- [深入浅出ES6（六）：解构 Destructuring](https://link.juejin.cn?target=http%3A%2F%2Fwww.infoq.com%2Fcn%2Farticles%2Fes6-in-depth-destructuring)



作者：豆腐脑
链接：https://juejin.cn/post/6844903513080725518
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。