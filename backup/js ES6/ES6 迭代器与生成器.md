## 迭代器(Iterator)和生成器(Generator)

​ 用循环语句迭代数据时，必须要初始化一个变量来记录每一次迭代在数据集合中的位置，而在许多编程语言中，已经开始通过程序化的方式用迭代器对象返回迭代过程中集合的每一个元素

迭代器的使用可以极大地简化数据操作，于是 ES6 也向 JS 中添加了这个迭代器特性。新的数组方法和新的集合类型(如 Set 集合与 Map 集合)都依赖迭代器的实现，这个新特性对于高效的数据处理而言是不可或缺的，在语言的其他特性中也都有迭代器的身影：新的 for-of 循环、展开运算符(...)，甚至连异步编程都可以使用迭代器

本文将详细介绍 ES6 中的迭代器(Iterator)和生成器(Generator)

### 引入

下面是一段标准的 for 循环代码，通过变量 i 来跟踪 colors 数组的索引，循环每次执行时，如果 i 小于数组长度 len 则加 1，并执行下一次循环

```js
var colors = ["red", "green", "blue"];
for (var i = 0, len = colors.length; i < len; i++) {
  console.log(colors[i]);
}
```

虽然循环语句语法简单，但如果将==多个循环嵌套则需要追踪多个变量==，代码复杂度会大大增加，一不小心就错误使用了其他 for 循环的跟踪变量，从而导致程序出错。迭代器的出现旨在消除这种复杂性并减少循环中的错误

### 迭代器

迭代器是一种特殊对象，它具有一些专门为迭代过程设计的专有接口，所有的迭代器对象都有一个 next()方法，每次调用都返回一个结果对象。结果对象有两个属性：一个是 value，表示下一个将要返回的值；另一个是 done，它是一个布尔类型的值，当没有更多可返回数据时返回 true。迭代器还会保存一个内部指针，用来指向当前集合中值的位置，每调用一次 next()方法，都会返回下一个可用的值

如果在最后一个值返回后再调用 next()方法，那么返回的对象中属性 done 的值为 true，属性 value 则包含迭代器最终返回的值，这个返回值不是数据集的一部分，它与函数的返回值类似，是函数调用过程中最后一次给调用者传递信息的方法，如果没有相关数据则返回 undefined

下面用 ES5 的语法创建一个迭代器

```js
function createIterator(items) {
  var i = 0;
  return {
    next: function () {
      var done = i >= items.length;
      var value = !done ? items[i++] : undefined;
      return {
        done: done,
        value: value,
      };
    },
  };
}
var iterator = createIterator([1, 2, 3]);
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next()); // "{ value: 2, done: false }"
console.log(iterator.next()); // "{ value: 3, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"
// 之后的所有调用
console.log(iterator.next()); // "{ value: undefined, done: true }"
```

在上面这段代码中，createIterator()方法返回的对象有一个 next()方法，每次调用时，items 数组的下一个值会作为 value 返回。当 i 为 3 时，done 变为 true；此时三元表达式会将 value 的值设置为 undefined。最后两次调用的结果与 ES6 迭代器的最终返回机制类似，当数据集被用尽后会返回最终的内容

上面这个示例很复杂，而在 ES6 中，迭代器的编写规则也同样复杂，但 ES6 同时还引入了一个生成器对象，它可以让创建迭代器对象的过程变得更简单

### 生成器

生成器是一种返回迭代器的函数，通过 function 关键字后的星号(\*)来表示，函数中会用到新的关键字 yield。星号可以紧挨着 function 关键字，也可以在中间添加一个空格

```js
// 生成器
function* createIterator() {
  yield 1;
  yield 2;
  yield 3;
}
// 生成器能像正规函数那样被调用，但会返回一个迭代器
let iterator = createIterator();
console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3
```

在这个示例中，createlterator()前的星号表明它是一个生成器；yield 关键字也是 ES6 的新特性，可以通过它来指定调用迭代器的 next()方法时的返回值及返回顺序。生成迭代器后，连续 3 次调用它的 next()方法返回 3 个不同的值，分别是 1、2 和 3。生成器的调用过程与其他函数一样，最终返回的是创建好的迭代器

生成器函数最有趣的部分是，每当执行完一条 yield 语句后函数就会自动停止执行。举个例子，在上面这段代码中，执行完语句 yield 1 之后，函数便不再执行其他任何语句，直到再次调用迭代器的 next()方法才会继续执行 yield 2 语句。生成器函数的这种中止函数执行的能力有很多有趣的应用

使用 yield 关键字可以返回任何值或表达式，所以可以通过生成器函数批量地给迭代器添加元素。例如，可以在循环中使用 yield 关键字

```js
function* createIterator(items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i];
  }
}
let iterator = createIterator([1, 2, 3]);
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next()); // "{ value: 2, done: false }"
console.log(iterator.next()); // "{ value: 3, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"
// 之后的所有调用
console.log(iterator.next()); // "{ value: undefined, done: true }"
```

在此示例中，给生成器函数 createlterator()传入一个 items 数组，而在函数内部，for 循环不断从数组中生成新的元素放入迭代器中，每遇到一个 yield 语句循环都会停止；每次调用迭代器的 next()方法，循环会继续运行并执行下一条 yield 语句

生成器函数是 ES6 中的一个重要特性，可以将其用于所有支持函数使用的地方

【使用限制】

yield 关键字只可在生成器内部使用，在其他地方使用会导致程序抛出错误

```js
function *createIterator(items) {
    items.forEach(function(item) {
        // 语法错误
        yield item + 1;
    });
}
```

从字面上看，yield 关键字确实在 createlterator()函数内部，但是它与 return 关键字一样，二者都不能穿透函数边界。嵌套函数中的 return 语句不能用作外部函数的返回语句，而此处嵌套函数中的 yield 语句会导致程序抛出语法错误

【生成器函数表达式】

也可以通过函数表达式来创建生成器，只需在 function 关键字和小括号中间添加一个星号(\*)即可

```js
let createIterator = function* (items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i];
  }
};
let iterator = createIterator([1, 2, 3]);
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next()); // "{ value: 2, done: false }"
console.log(iterator.next()); // "{ value: 3, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"
// 之后的所有调用
console.log(iterator.next()); // "{ value: undefined, done: true }"
```

在这段代码中，createlterator()是一个生成器函数表达式，而不是一个函数声明。由于函数表达式是匿名的，因此星号直接放在 function 关键字和小括号之间。此外，这个示例基本与前例相同，使用的也是 for 循环

==不能用箭头函数来创建生成器==

==————————————==

【生成器对象的方法】

由于生成器本身就是函数，因而可以将它们添加到对象中。例如，在 ES5 风格的对象字面量中，可以通过函数表达式来创建生成器

```
var o = {
    createIterator: function *(items) {
            for (let i = 0; i < items.length; i++) {
                yield items[i];
            }
        }
};
let iterator = o.createIterator([1, 2, 3]);
```

也可以用 ES6 的函数方法的简写方式来创建生成器，只需在函数名前添加一个星号(\*)

```
var o = {
    *createIterator(items) {
            for (let i = 0; i < items.length; i++) {
                yield items[i];
            }
        }
};
let iterator = o.createIterator([1, 2, 3]);
```

这些示例使用了不同于之前的语法，但它们的功能实际上是等价的。在简写版本中，由于不使用 function 关键字来定义 createlterator()方法，因此尽管可以在星号和方法名之间留白，但还是将星号紧贴在方法名之前

【状态机】

生成器的一个常用功能是生成状态机

```
let state = function*(){
    while(1){
        yield 'A';
        yield 'B';
        yield 'C';
    }
}

let status = state();
console.log(status.next().value);//'A'
console.log(status.next().value);//'B'
console.log(status.next().value);//'C'
console.log(status.next().value);//'A'
console.log(status.next().value);//'B'
```

### 可迭代对象

可迭代对象具有 Symbol.iterator 属性，是一种与迭代器密切相关的对象。Symbol.iterator 通过指定的函数可以返回一个作用于附属对象的迭代器。在 ES6 中，所有的集合对象(数组、Set 集合及 Map 集合)和字符串都是可迭代对象，这些对象中都有默认的迭代器。ES6 中新加入的特性 for-of 循环需要用到可迭代对象的这些功能

[注意]由于生成器默认会为 Symbol.iterator 属性赋值，因此所有通过生成器创建的迭代器都是可迭代对象

一开始，我们曾提到过循环内部索引跟踪的相关问题，要解决这个问题，需要两个工具：一个是迭代器，另一个是 for-of 循环。如此一来，便不需要再跟踪整个集合的索引，只需关注集合中要处理的内容

for-of 循环每执行一次都会调用可迭代对象的 next()方法，并将迭代器返回的结果对象的 value 属性存储在一个变量中，循环将持续执行这一过程直到返回对象的 done 属性的值为 true。这里有个示例

```
let values = [1, 2, 3];
for (let num of values) {
    //1
    //2
    //3
    console.log(num);
}
```

这段 for-of 循环的代码通过调用 values 数组的 Symbol.iterator 方法来获取迭代器，这一过程是在 JS 引擎背后完成的。随后迭代器的 next()方法被多次调用，从其返回对象的 value 属性读取值并存储在变量 num 中，依次为 1、2 和 3，当结果对象的 done 属性值为 true 时循环退出，所以 num 不会被赋值为 undefined

如果只需迭代数组或集合中的值，用 for-of 循环代替 for 循环是个不错的选择。相比传统的 for 循环，for-of 循环的控制条件更简单，不需要追踪复杂的条件，所以更少出错

[注意]如果将 for-of 语句用于不可迭代对象、null 或 undefined 将会导致程序抛出错误

【访问默认迭代器】

可以通过 Symbol.iterator 来访问对象默认的迭代器

```
let values = [1, 2, 3];
let iterator = values[Symbol.iterator]();
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next()); // "{ value: 2, done: false }"
console.log(iterator.next()); // "{ value: 3, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"
```

在这段代码中，通过 Symbol.iterator 获取了数组 values 的默认迭代器，并用它遍历数组中的元素。在 JS 引擎中执行 for-of 循环语句时也会有类似的处理过程

由于具有 Symbol.iterator 属性的对象都有默认的迭代器，因此可以用它来检测对象是否为可迭代对象

```
function isIterable(object) {
    return typeof object[Symbol.iterator] === "function";
}
console.log(isIterable([1, 2, 3])); // true
console.log(isIterable("Hello")); // true
console.log(isIterable(new Map())); // true
console.log(isIterable(new Set())); // true
console.log(isIterable(new WeakMap())); // false
console.log(isIterable(new WeakSet())); // false
```

这里的 islterable()函数可以检查指定对象中是否存在默认的函数类型迭代器，而 for-of 循环在执行前也会做相似的检查

除了使用内建的可迭代对象类型的 Symbol.iterator，也可以使用 Symbol.iterator 来创建属于自己的迭代器

【创建可迭代对象】

默认情况下，开发者定义的对象都是不可迭代对象，但如果给 Symbol.iterator 属性添加一个生成器，则可以将其变为可迭代对象

```
let collection = {
    items: [],
    *[Symbol.iterator]() {
        for (let item of this.items) {
            yield item;
        }
    }
};
collection.items.push(1);
collection.items.push(2);
collection.items.push(3);
for (let x of collection) {
    //1
    //2
    //3
    console.log(x);
}
```

在这个示例中，先创建一个生成器(注意，星号仍然在属性名前)并将其赋值给对象的 Symbol.iterator 属性来创建默认的迭代器；而在生成器中，通过 for-of 循环迭代 this.items 并用 yield 返回每一个值。collection 对象默认迭代器的返回值由迭代器 this.items 自动生成，而非手动遍历来定义返回值

【展开运算符和非数组可迭代对象】

通过展开运算符(...)可以把 Set 集合转换成一个数组

```
let set = new Set([1, 2, 3, 3, 3, 4, 5]),
array = [...set];
console.log(array); // [1,2,3,4,5]
```

这段代码中的展开运算符把 Set 集合的所有值填充到了一个数组字面量里，它可以操作所有可迭代对象，并根据默认迭代器来选取要引用的值，从迭代器读取所有值。然后按照返回顺序将它们依次插入到数组中。Set 集合是一个可迭代对象，展开运算符也可以用于其他可迭代对象

```
let map = new Map([ ["name", "huochai"], ["age", 25]]),
array = [...map];
console.log(array); // [ ["name", "huochai"], ["age", 25]]
```

展开运算符把 Map 集合转换成包含多个数组的数组，Map 集合的默认迭代器返回的是多组键值对，所以结果数组与执行 new Map()时传入的数组看起来一样

在数组字面量中可以多次使用展开运算符，将可迭代对象中的多个元素依次插入新数组中，替换原先展开运算符所在的位置

```
let smallNumbers = [1, 2, 3],
bigNumbers = [100, 101, 102],
allNumbers = [0, ...smallNumbers, ...bigNumbers];
console.log(allNumbers.length); // 7
console.log(allNumbers); // [0, 1, 2, 3, 100, 101, 102]
```

创建一个变量 allNumbers，用展开运算符将 smallNumbers 和 bigNumbers 里的值依次添加到 allNumbers 中。首先存入 0，然后存入 small 中的值，最后存入 bigNumbers 中的值。当然，原始数组中的值只是被复制到 allNumbers 中，它们本身并未改变

由于展开运算符可以作用于任意可迭代对象，因此如果想将可迭代对象转换为数组，这是最简单的方法。既可以将字符串中的每一个字符(不是编码单元)存入新数组中，也可以将浏览器中 NodeList 对象中的每一个节点存入新的数组中

### 内建迭代器

迭代器是 ES6 的一个重要组成部分，在 ES6 中，已经默认为许多内建类型提供了内建迭代器，只有当这些内建迭代器无法实现目标时才需要自己创建。通常来说当定义自己的对象和类时才会遇到这种情况，否则，完全可以依靠内建的迭代器完成工作，而最常使用的可能是集合的那些迭代器

【集合对象迭代器】

在 ES6 中有 3 种类型的集合对象：数组、Map 集合与 Set 集合

为了更好地访问对象中的内容，这 3 种对象都内建了以下三种迭代器

```
entries() 返回一个迭代器，其值为多个键值对
values() 返回一个迭代器，其值为集合的值
keys() 返回一个迭代器，其值为集合中的所有键名
```

调用以上 3 个方法都可以访问集合的迭代器

**entries()迭代器**

每次调用 next()方法时，entries()迭代器都会返回一个数组，数组中的两个元素分别表示集合中每个元素的键与值。如果被遍历的对象是数组，则第一个元素是数字类型的索引；如果是 Set 集合，则第一个元素与第二个元素都是值(Set 集合中的值被同时作为键与值使用)；如果是 Map 集合，则第一个元素为键名

```
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ES6");
data.set("format", "ebook");
for (let entry of colors.entries()) {
    console.log(entry);
}
for (let entry of tracking.entries()) {
    console.log(entry);
}
for (let entry of data.entries()) {
    console.log(entry);
}
```

调用 console.log()方法后输出以下内容

```
[0, "red"]
[1, "green"]
[2, "blue"]
[1234, 1234]
[5678, 5678]
[9012, 9012]
["title", "Understanding ES6"]
["format", "ebook"]
```

在这段代码中，调用每个集合的 entries()方法获取一个迭代器，并使用 for-of 循环来遍历元素，且通过 console 将每一个对象的键值对输出出来

**values()迭代器**

调用 values()迭代器时会返回集合中所存的所有值

```
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ES6");
data.set("format", "ebook");
for (let value of colors.values()) {
    console.log(value);
}
for (let value of tracking.values()) {
    console.log(value);
}
for (let value of data.values()) {
    console.log(value);
}
```

调用 console.log()方法后输出以下内容

```
"red"
"green"
"blue"
1234
5678
9012
"Understanding ES6"
"ebook"
```

如上所示，调用 values()迭代器后，返回的是每个集合中包含的真正数据，而不包含数据在集合中的位置信息

**keys()迭代器**

keys()迭代器会返回集合中存在的每一个键。如果遍历的是数组，则会返回数字类型的键，数组本身的其他属性不会被返回；如果是 Set 集合，由于键与值是相同的，因此 keys()和 values()返回的也是相同的迭代器；如果是 Map 集合，则 keys()迭代器会返回每个独立的键

```
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ES6");
data.set("format", "ebook");
for (let key of colors.keys()) {
    console.log(key);
}
for (let key of tracking.keys()) {
    console.log(key);
}
for (let key of data.keys()) {
    console.log(key);
}
```

调用 console.log()方法后输出以下内容

```
0
1
2
1234
5678
9012
"title"
"format"
```

keys()迭代器会获取 colors、tracking 和 data 这 3 个集合中的每一个键，而且分别在 3 个 for-of 循环内部将这些键名打印出来。对于数组对象来说，无论是否为数组添加命名属性，打印出来的都是数字类型的索引；而 for-in 循环迭代的是数组属性而不是数字类型的索引

**不同集合类型的默认迭代器**

每个集合类型都有一个默认的迭代器，在 for-of 循环中，如果没有显式指定则使用默认的迭代器。数组和 Set 集合的默认迭代器是 values()方法，Map 集合的默认迭代器是 entries()方法。有了这些默认的迭代器，可以更轻松地在 for-of 循环中使用集合对象

```
let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ES6");
data.set("format", "print");
// 与使用 colors.values() 相同
for (let value of colors) {
    console.log(value);
}
// 与使用 tracking.values() 相同
for (let num of tracking) {
    console.log(num);
}
// 与使用 data.entries() 相同
for (let entry of data) {
    console.log(entry);
}
```

上述代码未指定迭代器，所以将使用默认的迭代器。数组、Set 集合及 Map 集合的默认迭代器也会反应出这些对象的初始化过程，所以这段代码会输出以下内容

```
"red"
"green"
"blue"
1234
5678
9012
["title", "Understanding ES6"]
["format", "print"]
```

默认情况下，如果是数组和 Set 集合，会逐一返回集合中所有的值。如果是 Map 集合，则按照 Map 构造函数参数的格式返回相同的数组内容。而 WeakSet 集合与 WeakMap 集合就没有内建的迭代器，由于要管理弱引用，因而无法确切地知道集合中存在的值，也就无法迭代这些集合了

【字符串迭代器】

自 ES5 发布以后，JS 字符串慢慢变得更像数组了，例如，ES5 正式规定可以通过方括号访问字符串中的字符(也就是说，text[0]可以获取字符串 text 的第一个字符，并以此类推)。由于方括号操作的是编码单元而非字符，因此无法正确访问双字节字符

```
var message = "A 𠮷 B" ;
for (let i=0; i < message.length; i++) {
    console.log(message[i]);
}
```

在这段代码中，访问 message 的 length 属性获取索引值，并通过方括号访问来迭代并打印一个单字符字符串，但是输出的结果却与预期不符

```
A




B
```

由于双字节字符被视作两个独立的编码单元，从而最终在 A 与 B 之间打印出 4 个空行

所幸，ES6 的目标是全面支持 Unicode，并且我们可以通过改变字符串的默认迭代器来解决这个问题，使其操作字符而不是编码单元。现在，修改前一个示例中字符串的默认迭代器，让 for-of 循环输出正确的内容

```
var message = "A 𠮷 B" ;
for (let c of message) {
    console.log(c);
}
```

这段代码输出以下内容

```
A

𠮷

B
```

这个结果更符合预期，通过循环语句可以直接操作字符并成功打印出 Unicode 字符

【NodeList 迭代器】

DOM 标准中有一个 NodeList 类型，document 对象中的所有元素都用这个类型来表示。对于编写 Web 浏览器环境中的 JS 开发者来说，需要花点儿功夫去理解 NodeList 对象和数组之间的差异。二者都使用 length 属性来表示集合中元素的数量，都可以通过方括号来访问集合中的独立元素。而在内部实现中，二者的表现非常不一致，因而会造成很多困扰

自从 ES6 添加了默认迭代器后，DOM 定义中的 NodeList 类型(定义在 HTML 标准而不是 ES6 标准中)也拥有了默认迭代器，其行为与数组的默认迭代器完全一致。所以可以将 NodeList 应用于 for-of 循环及其他支持对象默认迭代器的地方

```
var divs = document.getElementsByTagName("div");
for (let div of divs) {
    console.log(div.id);
}
```

在这段代码中，通过调用 getElementsByTagName()方法获取到 document 对象中所有 div 元素的列表，在 for-of 循环中遍历列表中的每一个元素并输出元素 ID，实际上是按照处理数组的方式来处理 NodeList 的

### 高级迭代器

迭代器的基础功能可以辅助完成很多任务，通过生成器创建迭代器的过程也很便捷，除了这些简单的集合遍历任务之外，迭代器也可以被用于完成一些复杂的任务

【给迭代器传递参数】

迭代器既可以用迭代器的 next()方法返回值，也可以在生成器内部使用 yield 关键字来生成值。如果给迭代器的 next()方法传递参数，则这个参数的值就会替代生成器内部上条 yield 语句的返回值。而如果要实现更多像异步编程这样的高级功能，那么这种给迭代器传值的能力就变得至关重要

```
function *createIterator() {
    let first = yield 1;
    let second = yield first + 2; // 4 + 2
    yield second + 3; // 5 + 3
}
let iterator = createIterator();
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next(4)); // "{ value: 6, done: false }"
console.log(iterator.next(5)); // "{ value: 8, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"
```

第一次调用 next()方法时无论传入什么参数都会被丢弃。由于传给 next()方法的参数会替代上一次 yield 的返回值，而在第一次调用 next()方法前不会执行任何 yield 语句，因此在第一次调用 next()方法时传递参数是毫无意义的

第二次调用 next()方法传入数值 4 作为参数，它最后被赋值给生成器函数内部的变量 first。在一个含参 yield 语句中，表达式右侧等价于第一次调用 next()方法后的下一个返回值，表达式左侧等价于第二次调用 next()方法后，在函数继续执行前得到的返回值。第二次调用 next()方法传入的值为 4，它会被赋值给变量 first，函数则继续执行。第二条 yield 语句在第一次 yield 的结果上加了 2，最终的返回值为 6

第三次调用 next()方法时，传入数值 5，这个值被赋值给 second，最后用于第三条 yield 语句并最终返回数值 8

【在迭代器中抛出错误】

除了给迭代器传递数据外，还可以给它传递错误条件。通过 throw()方法，当迭代器恢复执行时可令其抛出一个错误。这种主动抛出错误的能力对于异步编程而言至关重要，也能提供模拟结束函数执行的两种方法(返回值或抛出错误)，从而增强生成器内部的编程弹性。将错误对象传给 throw()方法后，在迭代器继续执行时其会被抛出

```
function *createIterator() {
    let first = yield 1;
    let second = yield first + 2; // yield 4 + 2 ，然后抛出错误
    yield second + 3; // 永不会被执行
}
let iterator = createIterator();
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next(4)); // "{ value: 6, done: false }"
console.log(iterator.throw(new Error("Boom"))); // 从生成器中抛出了错误
```

在这个示例中，前两个表达式正常求值，而调用 throw()方法后，在继续执行 let second 求值前，错误就会被抛出并阻止了代码继续执行。这个过程与直接抛出错误很相似，二者唯一的区别是抛出的时机不同

可以在生成器内部通过 try-catch 代码块来捕获这些错误

```
function *createIterator() {
    let first = yield 1;
    let second;
    try {
        second = yield first + 2; // yield 4 + 2 ，然后抛出错误
    } catch (ex) {
        second = 6; // 当出错时，给变量另外赋值
    }
    yield second + 3;
}
let iterator = createIterator();
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next(4)); // "{ value: 6, done: false }"
console.log(iterator.throw(new Error("Boom"))); // "{ value: 9, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"
```

在此示例中，try-catch 代码块包裹着第二条 yield 语句。尽管这条语句本身没有错误，但在给变量 second 赋值前还是会主动抛出错误，catch 代码块捕获错误后将 second 变量赋值为 6，下一条 yield 语句继续执行后返回 9

这里有一个有趣的现象调用 throw()方法后也会像调用 next()方法一样返回一个结果对象。由于在生成器内部捕获了这个错误，因而会继续执行下一条 yield 语句，最终返回数值 9

如此一来，next()和 throw()就像是迭代器的两条指令，调用 next()方法命令迭代器继续执行(可能提供一个值)，调用 throw()方法也会命令迭代器继续执行，但同时也抛出一个错误，在此之后的执行过程取决于生成器内部的代码

在迭代器内部，如果使用了 yield 语句，则可以通过 next()方法和 throw()方法控制执行过程，当然，也可以使用 return 语句返回一些与普通函数返回语句不太一样的内容

【生成器返回语句】

由于生成器也是函数，因此可以通过 return 语句提前退出函数执行，对于最后一次 next()方法调用，可以主动为其指定一个返回值。正如在其他函数中那样，可以通过 return 语句指定一个返回值。而在生成器中，return 表示所有操作已经完成，属性 done 被设置为 true；如果同时提供了相应的值，则属性 value 会被设置为这个值

```
function *createIterator() {
    yield 1;
    return;
    yield 2;
    yield 3;
}
let iterator = createIterator();
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"
```

这段代码中的生成器包含多条 yield 语句和一条 return 语句，其中 return 语句紧随第一条 yield 语句，其后的 yield 语句将不会被执行

在 return 语句中也可以指定一个返回值，该值将被赋值给返回对象的 value 属性

```
function *createIterator() {
    yield 1;
    return 42;
}
let iterator = createIterator();
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next()); // "{ value: 42, done: true }"
console.log(iterator.next()); // "{ value: undefined, done: true }"
```

在此示例中，第二次调用 next()方法时返回对象的 value 属性值为 42，done 属性首次设为 true；第三次调用 next()方法依然返回一个对象，只是 value 属性的值会变为 undefined。因此，通过 return 语句指定的返回值，只会在返回对象中出现一次，在后续调用返回的对象中，value 属性会被重置为 undefined

[注意]展开运算符与 for-of 循环语句会直接忽略通过 return 语句指定的任何返回值，只要 done 一变为 true 就立即停止读取其他的值。不管怎样，迭代器的返回值依然是一个非常有用的特性

【委托生成器】

在某些情况下，我们需要将两个迭代器合二为一，这时可以创建一个生成器，再给 yield 语句添加一个星号，就可以将生成数据的过程委托给其他生成器。当定义这些生成器时，只需将星号放置在关键字 yield 和生成器的函数名之间即可

```
function *createNumberIterator() {
    yield 1;
    yield 2;
}
function *createColorIterator() {
    yield "red";
    yield "green";
}
function *createCombinedIterator() {
    yield *createNumberIterator();
    yield *createColorIterator();
    yield true;
}
var iterator = createCombinedIterator();
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next()); // "{ value: 2, done: false }"
console.log(iterator.next()); // "{ value: "red", done: false }"
console.log(iterator.next()); // "{ value: "green", done: false }"
console.log(iterator.next()); // "{ value: true, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"
```

这里的生成器 createCombinedIterator()先后委托了另外两个生成器 createNumberlterator()和 createColorlterator()。仅根据迭代器的返回值来看，它就像是一个完整的迭代器，可以生成所有的值。每一次调用 next()方法就会委托相应的迭代器生成相应的值，直到最后由 createNumberlterator()和 cpeateColorlterator()创建的迭代器无法返回更多的值，此时执行最后一条 yield 语句并返回 true

有了生成器委托这个新功能，可以进一步利用生成器的返回值来处理复杂任务

```
function *createNumberIterator() {
    yield 1;
    yield 2;
    return 3;
}
function *createRepeatingIterator(count) {
    for (let i=0; i < count; i++) {
        yield "repeat";
    }
}
function *createCombinedIterator() {
    let result = yield *createNumberIterator();
    yield *createRepeatingIterator(result);
}
var iterator = createCombinedIterator();
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next()); // "{ value: 2, done: false }"
console.log(iterator.next()); // "{ value: "repeat", done: false }"
console.log(iterator.next()); // "{ value: "repeat", done: false }"
console.log(iterator.next()); // "{ value: "repeat", done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"
```

在生成器 createCombinedlterator()中，执行过程先被委托给了生成器 createNumberlterator()，返回值会被赋值给变量 result，执行到 return 3 时会返回数值 3。这个值随后被传入 createRepeatinglterator()作为它的参数，因而生成字符串"repeat"的 yield 语句会被执行三次

无论通过何种方式调用迭代器 next()方法，数值 3 都不会被返回，它只存在于生成器 createCombinedlterator()的内部。但如果想输出这个值，则可以额外添加一条 yield 语句

```
function *createNumberIterator() {
    yield 1;
    yield 2;
    return 3;
}
function *createRepeatingIterator(count) {
    for (let i=0; i < count; i++) {
        yield "repeat";
    }
}
function *createCombinedIterator() {
    let result = yield *createNumberIterator();
    yield result;
    yield *createRepeatingIterator(result);
}
var iterator = createCombinedIterator();
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next()); // "{ value: 2, done: false }"
console.log(iterator.next()); // "{ value: 3, done: false }"
console.log(iterator.next()); // "{ value: "repeat", done: false }"
console.log(iterator.next()); // "{ value: "repeat", done: false }"
console.log(iterator.next()); // "{ value: "repeat", done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"
```

此处新添加的 yield 语句显式地输出了生成器 createNumberlterator()的返回值。

[注意]yield*也可直接应用于字符串，例如 yield* "hello"，此时将使用字符串的默认迭代器

### 异步任务执行

生成器令人兴奋的特性多与异步编程有关，JS 中的异步编程有利有弊：简单任务的异步化非常容易；而复杂任务的异步化会带来很多管理代码的挑战。由于生成器支持在函数中暂停代码执行，因而可以深入挖掘异步处理的更多用法

执行异步操作的传统方式一般是调用一个函数并执行相应回调函数

```
let fs = require("fs");
fs.readFile("config.json", function(err, contents) {
    if (err) {
        throw err;
    }
    doSomethingWith(contents);
    console.log("Done");
});
```

调用 fs.readFile()方法时要求传入要读取的文件名和一个回调函数，操作结束后会调用该回调函数并检查是否存在错误，如果没有就可以处理返回的内容。如果要执行的任务很少，那么这样的方式可以很好地完成任务；如若需要嵌套回调或序列化一系列的异步操作，事情会变得非常复杂。此时，生成器和 yield 语句就派上用场了

【简单任务执行器】

由于执行 yield 语句会暂停当前函数的执行过程并等待下一次调用 next()方法，因此可以创建一个函数，在函数中调用生成器生成相应的迭代器，从而在不用回调函数的基础上实现异步调用 next()方法

```
function run(taskDef) {
    // 创建迭代器，让它在别处可用
    let task = taskDef();
    // 启动任务
    let result = task.next();
    // 递归使用函数来保持对 next() 的调用
    function step() {
        // 如果还有更多要做的
        if (!result.done) {
            result = task.next();
            step();
        }
    }
    // 开始处理过程
    step();
}
```

函数 run()接受一个生成器函数作为参数，这个函数定义了后续要执行的任务，生成一个迭代器并将它储存在变量 task 中。首次调用迭代器的 next()方法时，返回的结果被储存起来稍后继续使用。step()函数会检查 result.done 的值，如果为 false 则执行迭代器的 next()方法，并再次执行 step()操作。每次调用 next()方法时，返回的最新信息总会覆写变量 result。在代码的最后，初始化执行 step()函数并开始整个的迭代过程，每次通过检查 result.done 来确定是否有更多任务需要执行

借助这个 run()函数，可以像这样执行一个包含多条 yield 语句的生成器

```
run(function*() {
    console.log(1);
    yield;
    console.log(2);
    yield;
    console.log(3);
});
```

这个示例最终会向控制台输出多次调用 next()方法的结果，分别为数值 1、2 和 3。当然，简单输出迭代次数不足以展示迭代器高级功能的实用之处，下一步将在迭代器与调用者之间互相传值

【向任务执行器传递数据】

给任务执行器传递数据的最简单办法是，将值通过迭代器的 next()方法传入作为 yield 的生成值供下次调用。在这段代码中，只需将 result.value 传入 next()方法即可

```
function run(taskDef) {
    // 创建迭代器，让它在别处可用
    let task = taskDef();
    // 启动任务
    let result = task.next();
    // 递归使用函数来保持对 next() 的调用
    function step() {
        // 如果还有更多要做的
        if (!result.done) {
            result = task.next(result.value);
            step();
        }
    }
    // 开始处理过程
    step();
}
```

现在 result.value 作为 next()方法的参数被传入，这样就可以在 yield 调用之间传递数据了

```
run(function*() {
    let value = yield 1;
    console.log(value); // 1
    value = yield value + 3;
    console.log(value); // 4
});
```

此示例会向控制台输出两个数值 1 和 4。其中，数值 1 取自 yield 1 语句中回传给变量 value 的值；而 4 取自给变量 value 加 3 后回传给 value 的值。现在数据已经能够在 yield 调用间互相传递了，只需一个小小改变便能支持异步调用

【异步任务执行器】

之前的示例只是在多个 yield 调用间来回传递静态数据，而等待一个异步过程有些不同。任务执行器需要知晓回调函数是什么以及如何使用它。由于 yield 表达式会将值返回给任务执行器，所有的函数调用都会返回一个值，因而在某种程度上这也是一个异步操作，任务执行器会一直等待直到操作完成

下面定义一个异步操作

```
function fetchData() {
    return function(callback) {
        callback(null, "Hi!");
    };
}
```

本示例的原意是让任务执行器调用的所有函数都返回一个可以执行回调过程的函数，此处 fetchData()函数的返回值是一个可接受回调函数作为参数的函数，当调用它时会传入一个字符串"Hi!"作为回调函数的参数并执行。参数 callback 需要通过任务执行器指定，以确保回调函数执行时可以与底层迭代器正确交互。尽管 fetchData()是同步函数，但简单添加一个延迟方法即可将其变为异步函数

```
function fetchData() {
    return function(callback) {
        setTimeout(function() {
            callback(null, "Hi!");
        }, 50);
    };
}
```

在这个版本的 fetchData()函数中，让回调函数延迟了 50ms 再被调用，所以这种模式在同步和异步状态下都运行良好。只需保证每个要通过 yield 关键字调用的函数都按照与之相同的模式编写

理解了函数中异步过程的运作方式，可以将任务执行器稍作修改。当 result.value 是一个函数时，任务执行器会先执行这个函数再将结果传入 next()方法

```
function run(taskDef) {
    // 创建迭代器，让它在别处可用
    let task = taskDef();
    // 启动任务
    let result = task.next();
    // 递归使用函数来保持对 next() 的调用
    function step() {
        // 如果还有更多要做的
        if (!result.done) {
            if (typeof result.value === "function") {
                result.value(function(err, data) {
                    if (err) {
                        result = task.throw(err);
                        return;
                    }
                    result = task.next(data);
                    step();
                });
            } else {
                result = task.next(result.value);
                step();
            }
        }
    }
    // 开始处理过程
    step();
}
```

通过===操作符检査后，如果 result.value 是一个函数，会传入一个回调函数作为参数调用它，回调函数遵循 Node.js 有关执行错误的约定：所有可能的错误放在第一个参数(err)中，结果放在第二个参数中。如果传入了 err，意味着执行过程中产生了错误，这时通过 task.throw()正确输出错误对象；如果没有错误产生，data 被传入 task.next()作为结果储存起来，并继续执行 step()。如果 result.value 不是一个函数，则直接将其传入 next()方法

现在，这个新版的任务执行器已经可以用于所有的异步任务了。在 Node.js 环境中，如果要从文件中读取一些数据，需要在 fs.readFile()外围创建一个包装器(wrapper)，并返回一个与 fetchData()类似的函数

```
let fs = require("fs");
    function readFile(filename) {
        return function(callback) {
            fs.readFile(filename, callback);
        };
}
```

readFile()接受一个文件名作为参数，返回一个可以执行回调函数的函数。回调函数被直接传入 fs.readFile()方法，读取完成后会执行它

```
run(function*() {
    let contents = yield readFile("config.json");
    doSomethingWith(contents);
    console.log("Done");
});
```

在这段代码中没有任何回调变量，异步的 readFile()操作却正常执行，除了 yield 关键字外，其他代码与同步代码完全一样，只不过函数执行的是异步操作。所以遵循相同的接口，可以编写一些读起来像是同步代码的异步逻辑

当然，这些示例中使用的模式也有缺点，也就是不能百分百确认函数中返回的其他函数一定是异步的。着眼当下，最重要的是能理解任务执行过程背后的理论知识
