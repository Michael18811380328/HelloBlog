## 前端笔记

==学习要把不会的学会，学懂，而不是把会的重复100遍==

###  1 循环中异步函数

循环 forEach map 中，如果有异步函数，需要异步函数的结果，怎么实现？

我们写一个node异步读取文件的例子，熟悉一下 async 的语法

~~~js
var fs = require('fs');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

var asyncReadFile = async function (){
  var f1 = await readFile('/tmp/b.sh');
  var f2 = await readFile('/tmp/a.sh');
  console.log(f1.toString(), f2.toString());
};
~~~


循环中使用异步方式，有两种方法

第一个：改成 for 循环，内部使用 async await 实现——这个方式更好

~~~js
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  for (let doc of docs) {
    await db.post(doc);
  }
}
~~~

第二种：使用 Promise.all 实现

~~~js
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));
  let results = await Promise.all(promises);
}

// 或者使用下面的写法
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));
  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
}
~~~

参考链接：http://www.ruanyifeng.com/blog/2015/05/async.html

### 2 在线学习平台

正则表达式，这里循序渐进给出几个题目：https://regexone.com/lesson/repeating_characters

正则表达式查询：https://regexr.com/

SQL 语法学习 https://sqlzoo.net/wiki/SQL_Tutorial

### 3 FileReader

普通文件上传

~~~js
function fn(files) {
  if (files.length) {
    // 优化：如果上传多文件，可以使用循环上传（上传多文件 input multiple 有一部分浏览器不支持，移动端和打开的APP有关）
    for (let file of files) {
      let reader = new FileReader();
      // 不同类型的文件，使用不同的编码上传（readAsText, readAsDataURL）
      // 通常根据文件名后缀判断文件类型，更严格的方法是根据文件开头的编码判断（文件后缀和真实文件类型可能不一样）
      if (/.txt/.test(file.type)) {
        // txt file
        reader.onload = function() {
          console.log(this.result);
        }
        reader.readAsText(file);
      }
      else if (/.png/.test(file.type)) {
        // image file
        reader.onload = function() {
          console.log('success');
        }
        reader.readAsDataURL(file);
      }
    }    
  }
}
~~~

大文件分片上传思路（详见开课吧笔记）

- 先把 file 异步读取到 JS 内存中 (fs.readFile)
- 类数组切片成 chunks (files.slice(current, current + chunkLength))
- 前端生成一个 hash (三种方法，idle，布隆过滤器) 
- 然后 chunks.map() 给每一个分片name加上hash，调用 API 并上传，根据上传的chunks数量，设置进度条。
- 上传后，需要后端协同处理（根据文件的 hash 确定文件唯一性，然后根据 chunk 的 index 进行排序，把多个文件片段合并后，存储到数据库）
- 特殊：如果丢失分片，类似网络请求丢包处理思路（断点续传或者重传）前端再次传递分片

其他情况思路：

- 很多小文件上传（本地JS压缩成一个文件，本地用 JSZip 或者 gzip 等格式，然后后端收到再解包）；
- 网络很差（经常中断）前端后端需要查询是否某个片段已经上传，来确定是否重新上传等（断点续传）
- 拖拽文件上传，复制粘贴上传（需要调用前端的事件获取文件，监听 DIV 的 drag drop 事件，然后从 event 中获取文件）



### 4 高阶组件 react-dnd 传参

问题描述：整体容器是可拖拽容器，每一个子元素打开菜单后，其他的不能打开菜单。

如果直接父组件设置 state，那么由于高阶组件的关系，每一个子组件都会重新渲染，已经打开菜单的就会关闭，不行。

所以，在父组件中设置属性；当一个子组件打开下拉菜单后，父组件设置false。其他菜单打开前，需要判断父组件的属性是否满足，这样不会造成子组件的频繁渲染，性能也较好。

总结：react-dnd 或者高阶组件，可以存储属性，然后传递函数获取属性这样的方式传参。

react 中尽量使用属性（避免全部子组件渲染）；然后考虑使用 state 状态。

使用 react-dnd 时，如果一个父组件的状态改变，那么下面的子组件会全部改变，不会走 react 生命周期函数中更新的部分。

这样就造成一些问题：例如 web 项目文件夹，点击菜单，会造成整个文件夹组件全部重新渲染，图片会出现闪动。

react-dnd 使用了高阶组件，可能在 render 时，重新计算了组件，那么势必会去掉原来的组件，并使用新的组件，这样原来的组件自然不会走 componentWillMount 等生命周期函数。

未来使用时，需要注意拖拽内容尽可能少，内部不要有图片或者其他请求的部分，减少性能损耗。



### 5 exec

获取一个字符串中满足条件的全部子字符串（exec） reg.exec(str) 这里的 reg 需要先设置好，不能每次新建

如果有满足的结果，那么继续循环查看下一个；否则返回 null

~~~js
var str = "我今年25岁明年26岁后年27岁前年24岁";
var reg=/\d+/g;
var tmp;
while (tmp = reg.exec(str)) {
  console.log(tmp[0])
}
~~~

一共有6种方法（看字符串中是否有指定的子字符串）具体看另一篇笔记（判断字符串中是否包含某个字符串）

- str.indexOf() return index
- str.includes() return boolean
- str.search(str) return index
- str.match(str) return array or null
- reg.test(str) return boolean
- reg.exec(str) return array or null

#### 字符串查找的 6 个 API

`indexOf / lastIndexOf` 返回满足的第一个或者最后一个的索引，未找到返回 -1

~~~js
// str.indexOf(str) === number
'Hello'.indexOf('e') === 1
'Hello'.lastIndexOf('l') === 3
~~~

`includes` 返回布尔值

~~~js
// str.includes(str) === bool
'Hello'.includes('lo') === true
~~~

`str.search(str | regexp)` 返回满足条件的字符的索引

~~~js
// str.search(str|reg) === number
'Hello'.search('e') === 1
'Hello'.search(/ll/) === 2
~~~

`str.match(str | regexp)`

字符串和正则的返回值不同

~~~js
'Helo Hello'.match('Hel') // ['Hel', index: 0, input: 'Helo Hello', groups: undefined]
'Helo Hello'.match(/HEL/ig) // ['Hel', 'Hel']
~~~

`str.matchAll(str | reg)` 注意：返回值是一个迭代器，可以使用for…of…，扩展符(…)或Array.from() 处理

~~~js
const str = 'hello javascript hello css';
console.log(Array.from(str.matchAll(/hello/g)));
// ['hello', index: 0, input: 'hello javascript hello css', groups: undefined],
// ['hello', index: 17, input: 'hello javascript hello css', groups: undefined],
~~~

`regexp.test(str)`

~~~js
/hel/ig.test('Hello') === true
~~~

`regexp.exec(str)`

~~~js
/hel/ig.exec('Hello') === ['Hel', index: 0, input: 'Hello', groups: undefined]
~~~

小结：

- indexOf lastIndexOf includes 是一组，字符串中找另一个字符串

- search match 是字符串的方法，可以传字符串或者正则，一个返回 index，一个返回具体的结果

- test 和 exec 是正则表达式的方法，返回布尔值或者具体的结果

- match 和 exec 返回值一致，参数和方法换位

### 7 MVC 架构的好处

MVC架构的好处：model 是数据层，View 是视图层，Controller 是控制层。

在实际项目中，model 是界面中实际的数据，例如上传的图片和行的信息。view 是界面中显示的按钮和控件，以及控制这些控件的 react 状态。Controller 是接口和API。如果一个引用做到 MVC 完全分离，然后不同模块完全分离，如果需要改动某个模块，或者界面样式，或者数据层，都不会影响其他的部分。

例如，我们想把界面中的按钮改成输入框，那么直接更改 View 层即可，不需要改动 Model 层。如果项目的耦合性很强，可能数据划分不是很清楚。



### 9 requestAnimationFrame

为什么使用：默认的动画使用 setInterval 处理，然后浏览器渲染的频率是 60 次每秒，所以代码如下。

~~~js
this.timer = setInterval(() => {
  fn();
}, 1000 / 60);

// 停止动画
clearInterval(this.timer);
~~~

这样写，JS 实际执行的间隔，和浏览器渲染重排的时间不一定完全吻合，性能可能不好。

所以我们引入了 requestAnimationFrame，这样可以让JS执行的时间和浏览器渲染的时间一致，性能增加。

~~~js
function fn() {
  // 动画逻辑 this.div.left = this.div.left + 10
  if (time < 2000) {
    this.timer = requestAnimationFrame(fn);
  	// 两秒内，动画函数内部循环执行动画
  }
}
fn();

// 也可以外部强制关闭动画（键盘鼠标事件触发）
cancel = () => {
  cancelAnimationFrame(this.timer);
}
~~~

~~~js
startAnimation = () => {
  render();
  requestAnimFrame(startAnimation);
}
~~~

参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame、https://www.jianshu.com/p/fa5512dfb4f5、http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html、https://javascript.ruanyifeng.com/htmlapi/requestanimationframe.html

在某些老电脑上，requestAnimationFrame 是 60Hz 进行渲染，那么就是 16.67ms渲染一次，部分设备会卡，可以手动设置渲染时间。（参考：http://zhangchen915.com/index.php/archives/675/  阿里程序员）

~~~js
class AnimationFrame {
  constructor(fps = 60, animate) {
    this.requestID = 0;
    this.fps = fps;
    this.animate = animate;
  }

  start() {
    let then = performance.now();
    const interval = 1000 / this.fps;
    const tolerance = 0.1;

    const animateLoop = (now) => {
      this.requestID = requestAnimationFrame(animateLoop);
      const delta = now - then;

      if (delta >= interval - tolerance) {
        then = now - (delta % interval);
        this.animate(delta);
      }
    };
    this.requestID = requestAnimationFrame(animateLoop);
  }

  stop() {
    cancelAnimationFrame(this.requestID);
  }
}
~~~



### 12 移动端真机调试

真机和电脑连接，打开 USB 调试模式，打开最新版本的谷歌浏览器。

电脑上打开谷歌浏览器，访问 chrome://inspect/#devices，即可进行基本的调试功能。

如果不能使用，可以断开连接，重新开启手机的开发者 USB 调试模式。



### 14 HTML 设置夜间模式

可以直接使用CSS媒体查询 perfers-color-scheme 判断当前用户是否将系统的主体色设置成暗色或者亮色。属性：light dart no-perference 偏好。

~~~css
@media (perfers-color-scheme: light) {
  body {
    background-color: white;
  }
}
@media (perfers-color-scheme: dark) {
  body {
    background-color: black;
  }
}
@media (perfers-color-scheme: no-perference) {
  body {
    background-color: white;
  }
}
~~~

也可以使用 JS 进行媒体查询，然后设置全局属性，通过类名更改样式

~~~js
const mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')

if (mode && mode.matches) { 
  document.body.classList.add('dark'); 
} 
// 监听主题切换事件 
mode && mode.addEventListener('change', e => { 
  if (e.matches) { 
    document.body.classList.add('dark-bg'); 
  } else { 
    document.body.classList.remove('dark-bg');  
  } 
});
~~~

参考：https://www.zhihu.com/question/437949548

https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme

https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia



### 15 lodash思考 

lodash 的主要目的是封装了对象和数组的一些方法，主要功能和原生方法一致。类似于 Jquery 操作 DOM，lodash 操作 object array。主要适应于 ES3 的代码。在 ES6 中，API已经实现了很多方法。所以一般情况不需要使用这个库。主要使用的地方就是 throttle 节流函数，deepcopy 深复制对象等。可以不需要求数组的差集，数组均分等操作。

其他：如果一个状态不是常用的状态，那么不需要把状态直接传递到底层组件，可以传递一个函数，底层组件增删改查获取属性（或者使用 redux 的设计思路）。



### 17 stringify 函数

作用：把JS对象或者数组，转换成JSON格式

参数：value是必选参数，表示需要转换的对象或者数组；replacer 是可选参数，表示把对象转换成JSON的转换函数，可以选择null；space 表示JSON的缩进或者空格（数字表示空格数量，或者非数字\t）

```js
JSON.stringify(value[, replacer[, space]])
```





### 18 parseInt  函数

parseInt(number, index) 

函数作用：把一个变量转换成整数

参数：第一个是传入的变量，第二个是转换的进制（可选参数），默认是10进制。'2' 转换1进制是 NaN，’3‘ 转换为2进制是 NaN 

如果什么也不传，那么也返回 NaN

例题： `[1,2,3].map(parseInt)`，结果是 `[1, NaN, NaN]`



### 19 正则表达式问题

使用构造函数创建正则表达式，如果传参有特殊符号，可能报错 ’invalid-regular-expression‘

解决：先把字符串中的特殊符号转义，然后创建正则表达式

~~~js
// The special symbols should not be used as wildcards in regular expressions, need to be escaped into normal symbols
const escapeRegExp = (value) => {
  if (typeof value !== 'string') return '';
  return value.replace(/[.\\[\]{}()|^$?*+]/g, '\\$&');
};

let value = '[]'
let reg = new RegExp(escapeRegExp(value), 'ig');
console.log(reg); // /\[\]/gi
~~~



### 26 textarea 的高度自动变化

- 默认加载时，设置高度是固定的（100px）然后溢出不显示
- 点击编辑后，根据内容设置高度，然后设置溢出显示滚动条，这样方便编辑

缺陷：点击编辑后，外部整体的高度会被撑开，可能有其他的问题



### 29 arguments.callee 使用

使用转转反侧法计算两个数的最大公约数时，看到这样一个代码

~~~js
function gcd(a, b) {
    if (a % b === 0) {
        return b;
    }
    return arguments.callee(b, a % b);
}
console.log(gcd(28, 12)); // 4
console.log(gcd(7890, 123456)); // 6
console.log(gcd(5, 13)); // 1 （公约数为1说明两数互质）
~~~

其中 arguments.callee 不会经常使用，这个属性未来可能废弃，查询资料如下：

Arguments 表示函数的参数。arguments 有一个属性 cellee 表示函数参数的指针（指向当前的函数）那么这样写相当于递归调用函数。这样写的好处：如果函数名变化后，函数内部的代码不需要改动（arguments.callee），主要在递归调用函数中使用。

例子：我们使用这个优化一下斐波那契函数：

原函数递归调用

~~~js
function factorial(num){
  if (num <= 1) {         
    return 1;     
  } else {         
    return num * factorial(num - 1);
  } 
}
~~~

使用 arguements.callee 的函数
~~~js
function factorial(num){    
  if (num <=1) {         
    return 1;     
  } else {
    return num * arguments.callee(num - 1);
  } 
}
~~~

这个方法在 eslint 中弃用，原因：访问 arguments 是个很昂贵的操作，因为它是个很大的对象，每次递归调用时都需要重新创建，影响浏览器的性能，还会影响闭包。





### 35 React 代码用户体验优化

- 输入框，对话框打开后自动聚焦（如果是原生的输入框，设置ref，聚焦；如果是合成组件，直接使用组件的autofocus聚焦），点击esc关闭对话框等
- 表单内部点击 Tab 可以进行跳转
- 使用 title 属性，alt 属性进行标识



### 38 VScode 清除多余空行

需要选择正则按钮，然后全局替换：使用正则表达式 ^\s*(?=\r?$)\n 

```js
^\s*(?=\r?$)\n
```



### 40 中文输入法

手机输入法中，大部分都是 229 无法直接监听符号或者字母（后退正常）其他键已经被输入法封装了，所以Keycode无效。

PC端中如果是中文输入法，那么键盘事件监听到的字母键 keycode 也是 229，这个也需要注意。



### 42 setTimeout 循环打印

《你不知道的JS》第一部分第五章——闭包。经典的案例如下


```js
for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000)
}
```

这个会打印出10个10，如何解决？

可以使用ES6的 let 形成块级作用域，这样可以正常打印

```js
for (let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i + 1);
  }, i)
}
```

或者使用 IIEF 创建临时的作用域，然后使用中间变量 j 缓存一下

```js
for (var i = 0; i < 10; i++) {
  (function() {
    var j = i;
    setTimeout(function() {
      console.log(j + 1);
    }, j)
  })();
}
```

如果改成一个变量，可以把变量 i 作为参数，传入到 IEFF 中立即执行（创建了临时的函数作用域实现）

```js
for (var i = 0; i < 10; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j + 1);
    }, j)
  })(i);
}
```

### 43 移动端点击事件

移动端点击事件
1、click 会延迟 200-300ms 。默认移动端双击屏幕会放大缩小浏览器，所以 click 后会判断是否点击两次。默认的 dbClick 时间会去掉。

2、移动端执行的是 touch 事件。touchstart, touchmove touchend 三个事件后，再触发 click 。如果已经监听 touch 事件，那么需要把默认的 click 事件去掉。时间对象 e 包括了很多点击的属性

3、touch 对应的手势事件

- 点按 touchstart touchend 间隔很小
- 长按 touchstart touchend 间隔很大，且没有 touchmove 事件
- 单指上划（下划）左右滑 touchstart touchend 间隔很大，有 touchmove 事件，然后通过移动的位置，判断滑动的方向

~~~js
endX = firstTouch.pageX;
endY = firstTouch.pageY;
//x方向移动大于y方向的移动，并且x方向的移动大于25个像素，表示在向左侧滑动
if (Math.abs(endX - startX) >= Math.abs(endY - startY) && startX - endX >= 25){
    handler.call(this, e);
}
~~~

https://www.jianshu.com/p/997b23232bb8

https://juejin.cn/post/6844903569141809166

https://juejin.cn/post/6844903506311118856




### 44 git log 改成简化版本的 git lg

https://luolei.org/better-git-log/#comments

git log 改成简化版本的 git log 加入下面的软连接配置

~~~bash
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
~~~



### 46 TS 细节

//@ts-ignore 作用是忽略下一行的 TS 类型检查。类似 // eslint disable next line 是一个跳过格式检查的方法，可以处理少数代码问题，不推荐大量使用。

留心 Authorization (授权)不要写成 Authentication (认证)



### 其他

高阶组件中设置 ref {withRef:true} 主要用在 i18n 或者 Redux 等高阶函数中；

批量下载打包文件（首先请求到下载列表，然后每一个文件使用ajax下载并设置成blob，使用ZipJS写入压缩包对象，然后使用SaveAs保存到本地文档），如果是node环境或者本地内容，直接省略前两步，可能存在的问题，部分文件下载失败处理，大文件是否分片下载等；

python 内置的 SimpleHttpServer 本地开发服务器（可以调试 index.html）；


i18n 的基础配置和使用。

1. Axios 两个配置 baseURL 和 headers 含义
2. Es6 iteraror 迭代器，实际使用不多，主要是对可遍历对象进行循环（array, set map string 等）
5. 项目看懂5个文件

   - [x] universalAPI 这是 dtable-web 对应的接口，包括大部分API，使用 appToken。可能会继续调用 dtable-db 的接口（归档视图）。获取上传链接的三种情况：表单上传图片链接；表单上传普通背景图片链接；表格上传图片或文件链接。然后再调用上传图片即可（data parent_dir）。提交表单的五个参数（table_name page_id row_data, linked_rows, new_linked_rows）。

   - [x] dtable-serverAPI 是 dtable-server 的接口，少量的API，使用 accessToken。sql 查询
   - [x] mediator 中介模式，把 dtable-web 传递到界面的多个参数，转换成 window.dtable 便于调用
   - [x] Mobile-common-header 移动端通用标题组件
   - [x] Mobile-mask 移动端遮罩组件
   - [x] 保存逻辑：表格界面中，行展开，大部分情况都是发送 OP 对行进行增删改。增加链接是直接的 API，没有支持 OP。其他界面中，行展开操作后，直接发送 API 请求，返回成功后，刷新界面的数据（表格数据多，其他界面数据少，所以性能满足）。



## 学会的

### 1 array.reduce

reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。reduce() 可以作为一个高阶函数，用于函数的 compose。

**注意:** reduce() 对于空数组是不会执行回调函数的。长度是0或者1需要注意。

```js
// array.reduce(function(total, currentValue, currentIndex, arr), initialValue)

let fn = (total, sum) => {
  return total + sum;
}
let arr = [1,2,3,4,5];
console.log(arr.reduce(fn, 0)); // 15，原始数组不改变
```

使用 reduce 实现 map 的功能





### 5 For-in 和 for-of

官方文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of

传统的 for 循环有局限性，forEach 和 map 适应数组的循环，所以有了for in 和 for of 循环。

for...of... 循环：可以循环可枚举对象（数组，对象，Map， set， 伪数组，构造器等），循环获取内部元素，可以使用break跳出，不能循环可枚举对象原型链上的属性和方法。

for...in... 可以循环数组的项，以及对象上的函数等（包括原型链上的函数），使用前需要注意

结论：遍历数组优先使用 for forEach map 处理，遍历对象优先使用 for...of... 获取对象的属性



### 6 数字格式设置

`Intl.NumberFormat(locale, option).format(10000);`

这个内置方法，可以把一个数字转换成不同格式的货币，分隔符，单位，有效数字等。

第一个参数是 locale 语言，例如传入德国，那么小数点和逗号是相反的设置。

第二个参数是 option 可选参数，配置对象。对象的属性有 style currency unit 可以设置货币数字分隔符等。





### 4 React

Props 和 子组件更新：如果一个子组件的 state 是父组件的 props 计算出来，那么当父组件的 props 变化后，子组件必须更改 state。否则界面无法更改成最新的状态。最佳方案：store 和 view 完全分离，React jsx 只负责渲染组件。

setState 在react合成事件(onClick)和JS代码中是异步的；在原生JS事件（addeventListener）和定时器中是同步的、第一个参数可以是对象，或者是一个函数（返回新的state对象）。

componentDidUpdate 阶段，React 组件重新渲染，但是真实 DOM 的 redraw 还没有完成，所以更改 top 不会产生动画。设置CSS无效。解决：setTimeout 后，DOM 主线程的 redraw 已经执行完，新增的行真实 DOM 已经渲染到界面上，更改 top 值，render tree 重新生成，动画效果可以显示（其他CSS样式类似）。行排序动画遇到这个坑（在 componentDidUpdate 阶段设置 top ，动画无效）参考：https://blog.csdn.net/huangpin815/article/details/80023480

react 中强制更新组件，this.forceUpdate() 尽量避免使用，最好使用 state 或者 props 数据驱动更新



### 7 React 性能优化

React中，性能优化的目标是减少不必要的渲染

内置方法：使用 shouldComponentUpdate 判断 state props 变化时，是否更新组件；使用 PureComponent 设置纯组件，如果是纯组件，那么组件内部自动浅对比 props 然后进行渲染，这个PureComponent 会继承到子组件中，所以需要在叶节点中使用这个组件。如果是函数组件使用 React.memo() 优化（实际没用到）。

手动优化：减少父组件向子组件的不必要的Props；减少State的使用，尽量使用属性，避免不必要的渲染；如果是引用类型，那么需要 clone 复制新对象，实现组件更新。



### 8 Ref 是 null 的 bug

有些情况下，this.ref.current 是 null，无法直接获取DOM节点。通常问题的原因是，在界面初始化时，还没有渲染这个节点，所以DOM获取不到，获取到的是 null。通常在事件回调函数中调用是没问题的，但是在 render 或者 DidMount 阶段中获取可能获取不到。



### 9 setState 传递对象和函数

setState 执行是异步的，如果传递对象，可能会产生错误.

如果频繁调用这个函数，那么后一个执行时，获取的 this.state.count 是错误的，结果就错误了

~~~js
this.setState({
  count: this.state.count + 1,
});
~~~

可以改成传一个函数，每次获取最新的state，这样计数就是正确的

~~~js
this.setState((state) => {
  return {
    count: state + 1
  }
});
~~~



### 27 谷歌浏览器版本

这里是全部的谷歌浏览器版本，用于排查某一个版本的问题

2011-2020 主要版本：https://sourceforge.net/projects/osxportableapps/files/Chromium/

https://www.applex.net/downloads/google-chrome-for-mac.25/history

http://www.chromium.org/getting-involved/dev-channel



### 28 Windows 微信版本问题

微信全部版本及发布时间：https://weixin.qq.com/cgi-bin/readtemplate?lang=zh_CN&t=weixin_faq_list&head=true

- 早期版本中（3.0.0及之前）微信内核是 chrome 53 不支持很多 ES6 的语法，所以需要兼容
- 3.0.0 之间到 3.3.5 之后的版本，没有逐一测试兼容性
- 最新版本中（3.3.5及之后）微信内核变化后，支持 ES6 语法（不支持开发者工具，不确定内核的具体版本号）

早期版本的调试步骤参考：https://www.yuque.com/wuchendi/fe/winwechat 具体需要下载一个 dev 的包，然后可以打开调试台

最新的 windows 微信版本支持 ES6，所以不需要做兼容处理



### 39 React PureComponent

PureComponent 和 Component 的主要区别：内部实现了shouldComponentUpdate这个生命周期方法（如果props相同，组件不更新），适应于视图层显示界面（数据简单处理，或者不包括数据处理）。这里只会对 Props 进行浅对比，如果是复杂对象会出错。这个会影响到子组件的对比，所以最好使用在显示界面（不会继续向下传递数据流）。






### 40 VUE VS React 对比

* 语法格式： vue 是单独的文件格式，一个文件包括了 js css HTML 全部，React 通常是 jsx 格式，JS 和 HTML 写在一个文件中，严格意义是 JSX，会通过 React 转换成JS代码，样式部分通过外部 css 文件控制（或者 less sass，下同）
* 数据流：React 是单向数据流，也就是上层组件通过 state 存储数据，通过 props 传递给下层组件，下层组件不能直接更改上层组件的数据，通常通过回调函数或者 redux 等状态管理工具，改变整体的数据，触发组件的局部更新。Vue 早期双向数据流？
* 使用场景：react 起源于国外 Facebook，所以大部分国外公司使用，VUE 作者 Evan You 主要是国内使用。其他对应的第三库也是类似的。国内，阿里巴巴很多项目都是 ts + react。
* React-native 构建原生应用，实现一套代码多种应用；react 类式代码便于和 ts 结合使用
* react 需要使用 PureComponent 或者 shouldComponentUpdate 手动进行 props 对比，否则可能造成大量不必要的重复渲染。VUE setter 和 getter 中已经处理了这部分逻辑。

相同点：

* 虚拟DOM，Diff 算法：
* 响应式和组件化
* key 的作用：再次渲染时，快速复用之前的 dom 节点，减少性能开销（key 唯一性确保 map 查找节点）
* 这两个是核心库，路由和全局状态管理交给相关的库。(vue-router、vuex、react-router、redux）；构建工具：create-react-app or vue-cli 

项目如何选择框架？

* 根据团队人员熟练程度，根据已有项目的兼容情况
* 小项目使用 vue 大项目使用 react；国际化项目使用 react；国内项目使用 vue；react 和对应的类型控制，团队人多时便于合作；vue 写法比较灵活，如果注释不完善，可能理解有一定困难。

<https://juejin.cn/post/6844903668446134286>



### 1 nginx 入门参考

https://juejin.cn/post/6844904129987526663

https://zhuanlan.zhihu.com/p/34943332



### 2 安卓手机连接苹果电脑传文件

点击链接下载

android file transfer

然后连接安卓手机即可显示对应的文件

https://dl.google.com/dl/androidjumper/mtp/current/androidfiletransfer.dmg





### 3 Event-loop

事件循环

JS 运行在浏览器，用户交互和JS脚本都可能执行，所以设置单线程。如果设置多线程，用户和JS脚本同时执行可能出问题。现在多核CPU的解决：使用HTML5中的 web worker 处理多线程问题。



### 4 flex 布局

flex布局中，怎样在一个container中放置nav栏？

1.在京东PC端项目中，nav部分以一个独立的div进行布局（nav栏隐藏动画）

2.在京东移动端项目中，百分比布局，nav部分也是单独的div进行布局（左右排布使用row-col布局）

3.在休闲帮PC端项目中，使用bootstrap框架中，有预定的nav组件（bootstrap中spa组件需要加快熟悉）

4.在微金所移动端项目中，使用bootstrap框架，也分成两个container进行开发。



### 5 移动端的键盘输入问题和切换界面问题

移动端的键盘输入问题和切换界面问题；如果是一个界面内部的，不需要考虑；如果是新开的一个页面，需要考虑这个问题；目前的解决办法是，主动让 input 失去焦点，输入法自动关闭，再打开下一单页面（实际问题：移动端中，用户编辑过滤器时，先输入文本或者数字，移动端键盘打开，然后更改列，键盘没有及时关闭，样式错误）

### 6 input file 上传后清空文件

笔记：input file 上传后，应该清空一个 input 的值(input.value = '')，这样再次上传同名文件是正常的。



### 8 大公司和小公司区别

强哥：大公司也有很多低学历的人，只要能力足够，不担心学历问题（学历可以的）；上手了其他端的代码都能写，不要担心写不了后端的代码；自己有时间有规划慢慢来，一定有规划，选择比努力更重要；如果去搜狗这样的公司，自己的能力还能实现，毕竟岩哥可以过去；移动端；有几个项目经验，然后技术面试过了；基础+具体的业务功能；今年形势不太好，暂时不动；先找好下家再离职；自己看零散的代码和教程，也不总结，不分类，效果不佳；



#### 2 本地不同项目调试问题

- 本地浏览器支持跨域操作（后端服务和前端页面不在一个端口，但是需要请求登录）：更改本地浏览器配置。可以设置 webpack 支持代理，但是设置后无效，可能和 webpack 版本有关，所以直接使用命令行打开浏览器（增加参数打开）参考：https://blog.csdn.net/qq_41541368/article/details/104035074 扩展：直接写一个脚本，电脑开机后直接命令行执行，打开对应的程序，不需要手动双击每一个程序

~~~js
open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/seafile/workroom/chrome-config

open /Applications/Google\ Chrome.app && open /Applications/Typora.app 
~~~

- 如果本地调试两个前端项目，一个项目需要使用另一个项目打包后的文件，可以直接写一个脚本，然后复制这个打包后的文件到另一个文件夹下面（npm link 也可以实现，但是可能存在缓存问题等等），所以写了这个联调脚本。本地联调测试脚本

~~~js
"move": "npm run prepublishOnly && mv -f /dtable/es /Users/seafile/workroom/dev/dtable-/dtable-web/frontend/node_modules/@seafile/dtable",
~~~

#### 3 本地调试 server 项目跨域问题

问题：本地开发 dtable-web 和 dtable-server 项目时，打开表格界面，127.0.0.1:5000 端口显示跨域。

思考：以往都不会出现跨域问题，近期没有改动配置。

解决过程：先查看 dtable-web 和 dtable-server 的日志（dtable-server 中显示编译错误）本质上：因为在 docker 外部环境执行 npm install，dtable-server 某些第三方依赖库使用C语言编译，没有编译到 docker 内部（即使安装其他第三方库，也会影响已有的这个特殊的库）。所以造成 server 无法编译，服务不正常。nginx 反向代理服务器已经处理了跨域，但是已有服务没起来，所以界面显示的是跨域（找不到对应的服务）。

最后解决：在 docker 内部删除 node_modules 然后重新 npm install 开启服务，正常使用。

总结：界面的报错不一定是真实的原因，需要查看日志。nginx 需要多了解。

### op 执行逻辑

服务器 Op 执行时的函数，最好不依赖全局变量。处理 OP 正常情况的逻辑，也有处理异常情况的逻辑（状态机模式），什么时候发出什么指令，本地或者服务器出现问题怎么操作等等。
