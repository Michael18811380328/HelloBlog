# 笔记

==学习要把不会的学会，学懂，而不是把会的重复100遍==

#### 0 思考：复杂问题的思维方式：

自己传统的思维方式，通常是线性的，想要一步到位的思维方式，面对复杂问题，不可能直接求解

（从小的思维方式，主要是线性思路，或者分治思路（二分思路），近期学会了回溯思路，滑动窗口思路）递推思路不多（动态规划思路）

很多问题，类似傅里叶变换，需要时间转换到频率，积分后，再转换成时间，才能计算出结果。

所以，复杂问题要理清思路，逐步推理，使用茶壶算法（动态规划的递推公式），这样才能实现。

平时多练习逻辑思维（逻辑与现实经济等）

#### 1、flex 和 inline-flex 

类似 block 和 inline-block，前缀的 inline 是相对于父盒子而言，是行内元素还是块级元素。flex 都表示内部是伸缩盒子。

Inline-flex 存在的问题：如果不同子盒子的高度不同（例如有的有文字，有的没有文字），都设置了 inline-flex 那么整理的高度就不一定对齐。解决方法：vertical-align: middle 设置到父元素上面（具体应用：移动端链接列对齐）

Flex 细节参考：

https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

https://www.ruanyifeng.com/blog/2015/07/flex-examples.html


#### 2、双指针算法

使用条件：有序数组（无序数组先排序）。

分类：快慢指针和对撞指针。对撞指针用于小船载人问题；快慢指针用于判断链表中是否有环，排序数组去重操作等。

判断链表中是否有环，也可以使用对象唯一性判断；

排序数组去重操作，可以使用一次循环，然后splice操作；或者使用对象唯一性操作；或者使用 set 操作（后两种较复杂，适应于无序数组的去重）。两数之和、两数乘积之和，回文字符串等都可以使用双指针算法。

数组中指针用法：for循环数组，一个是当前的i，设置另一个指针pointer，这样可以指向不同的数组，进行处理

快慢指针

~~~js
let a = head.next;
let b = head.next.next;
while (a.next) {
  a = a.next;
  b = b.next.next;
}
// 需要预处理next下一个节点是否存在等
~~~

#### 3 FileReader

~~~js
function fn(files) {
  if (files.length) {
    let file = files[0];
    let reader = new FileReader();
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
~~~

#### 4 常见的web攻击

- XSS：cross site scripting 跨站脚本攻击；有漏洞的网站运行攻击者的脚本命令。可以利用虚假表单获取个人信息。利用 JS 获取用户的cookie值。被害者在不知情的情况下，帮助攻击者发送恶意请求（显示伪造的文章或者图片，显示伪造的网页登录情况）。例子：被攻击的A网站中，通过URL传值，获取登录用户名。那么攻击者在URL中设置自己的攻击脚本，获取cookie等信息。`localhost:3000/?id=<script>alert('1')</script>` 进一步执行远程脚本 `localhost:3000/?id=<script src="http://www.baidu.com/index.js"></script>` 获取信息。
- CSRF、点击劫持、OS注入、请求劫持、DDOS
- SQL注入：用户在提交数据时（用户名密码），可能把非法的用户名（例如某一段SQL语句）提交到服务器。服务器在查找数据库时，`select * from db where username is XXX ` 把非法的SQL执行，造成数据损失等。避免方法：永远不要相信用户的输入；对用户的输入进行校验和转换；不要使用超级管理员权限执行某些操作等。

XSS 解决方法，避免把用户传递的变量，直接和 HTML 拼接，然后执行。

解决：将用户的输入通过下面函数转换成合法的HTML，先创建文本节点，然后在获取内部HTML

~~~js
HTMLescape: function(html) {
  return document.createElement('div')
    .appendChild(document.createTextNode(html))
    .parentNode
    .innerHTML;
}
~~~

然后把生成的HTML，使用 `<a href="://www.baidu.com"> + str + </a>` 包起来，这样就避免了XSS


#### 5 exec 

获取一个字符串中满足条件的全部子字符串（exec） reg.exec(str) 这里的 reg 需要先设置好，不能每次新建

如果有满足的结果，那么继续循环查看下一个；否则返回 null

~~~js
var str = "我今年25岁明年26岁后年27岁前年24岁";
var reg=/\d+/g;
var tmp;
while(tmp = reg.exec(str)){
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


#### 6 Django

django模板样式：在开发模式下，直接通过 import 可以导入 CSS 文件。在生产环境下，会把相互的依赖关系分别打包，然后Django后端模板中需要插入对应的JS和CSS文件。这个本地开发测试不出来。（本地环境下正常，在线环境下面不正常的情况）

本地环境下面，只显示项目的CSS，可能在生产环境下，项目中的CSS可能和第三方库的CSS冲突（类名冲突）

#### 7 pointer-events 和点击穿透

有时候，我们会遇到界面中多个图层重叠的问题，下面图层绑定函数，上面的图层显示 UI 效果。我们希望点击事件，可以穿透上层 DIV 然后触发下层 DIV 的函数。

那么可以设置 'pointer-events: none' 表示上层的点击事件是无效的。

还可以避免 hover visited 的效果（我们想改变一个链接的显示状况，避免出现 visited 后的蓝色边框）

其他的属性主要用在 svg 上面

详情参考：https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events

#### 8 团队中的问题以及解决方法

一个子项目中，不同子项目互相干扰，冲突的解决办法

- 整体上：制定统一的规范（接口规范，UI规范等）
- 不同的子项目使用不同的前缀（CSS，公共组件）
- 不同的同事水平不一样，那么按照中等的水平作为整体的标准（react hook- typescript等）

#### 9 requestAnimationFrame

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

#### 10 raf 库

requestAnimationFrame 的 polyfill（简化操作，处理浏览器兼容性）

https://github.com/chrisdickinson/raf#readme

~~~js
const raf = require('raf')

function callback() {
  // animation function
}

var handle = raf(callback);
handle();
raf.cancel(handle);
~~~

#### 11 跨域与 window.postMessage()

参考链接：https://blog.csdn.net/qq_38128179/article/details/84956552

跨域：协议不同、域名不同、端口号不同，会产生跨域。跨域：不同域之间不能访问 cookie、localStorage，不能操作 DOM，不能发送请求(无法向非同源地址发送 AJAX 请求)等。可能在多层 iframe 中出现，或者页面新打开一个窗口等。

解决跨域方法：

1、如果主域和子域是同一个公司维护，那么设置 document.domain 

2、跨文档通信 window.postMessage() ，父窗口向子窗口发送消息，子窗口监听message事件。

~~~js
// father url is test.com
let sonWindow = window.open('http://baidu.com', 'title');

// 父窗口向子窗口发送消息
sonWindow.postMessage('这是信息', 'http://baidu.com');

// 子窗口监听message事件，获取消息
window.addEventListener('message', (e) => {
  // e.source === 'test.com'
  // e.origin === 'baidu.com'
  // e.data === '这是信息'
});
~~~

3、JSONP: 网页通过添加一个`<script>元素`，向服务器请求 JSON 数据，服务器收到请求后，将数据放在一个指定名字的回调函数的参数位置传回来

4、CORS (cross origin resource share 跨域资源共享) 需要前端请求加入参数，后端配置 Access-Control-Allow-Origin 


#### 12 移动端真机调试

真机和电脑连接，打开 USB 调试模式，打开最新版本的谷歌浏览器。

电脑上打开谷歌浏览器，访问 chrome://inspect/#devices，即可进行基本的调试功能。

#### 13 扩展运算符复制数组

扩展运算符可以复制数组或者对象。如果数组的每一项是引用类型，那么不会深复制，只会复制指向数组的指针。所以不能使用扩展运算符对数组或者对象进行深拷贝（深拷贝最好使用 deepcopy）。

#### 14 HTML 设置夜间模式

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



#### 15 lodash思考 

lodash 的主要目的是封装了对象和数组的一些方法，主要功能和原生方法一致。类似于 Jquery 操作 DOM，lodash 操作 object array。主要适应于 ES3 的代码。在 ES6 中，API已经实现了很多方法。所以一般情况不需要使用这个库。主要使用的地方就是 throttle 节流函数，deepcopy 深复制对象等。可以不需要求数组的差集，数组均分等操作。

其他：如果一个状态不是常用的状态，那么不需要把状态直接传递到底层组件，可以传递一个函数，底层组件增删改查获取属性。


#### 16 ssh

ssh 用于登录远程主机，命令是 `用户名@远程主机的ip`，本地使用虚拟机测试，流程如下（这个适合虚拟机和宿主机的通信）

1、打开虚拟机，使用 ifconfig | grep 'inet' 查看虚拟机的IP地址（eg: 192.168.1.168）

2、在宿主机打开终端，使用 ssh michael@192.168.1.168 登录，然后输入虚拟机账户密码，即可进入

3、如果提示网络连接不上，可以查看局域网是否畅通，或者重启虚拟机（重新获取IP）

4、操作虚拟机（例如部署 python3 环境等）

5、退出时，执行 exit() 命令

（需要测试不在一个局域网下的主机是否可以远程登录）

尝试使用联想电脑连接无线，然后开启服务器；使用mac链接手机热点，看能否SSH正常登录一下——SSH 需要在同一个局域网中进行处理。现在报错 22 端口没有开放，稍后继续尝试；两台电脑需要预先设置支持远程登录。

man 命令（manual）可以查看一个命令的帮助文档： man git （git manual 文档）

笔记：移动端的键盘输入问题和切换界面问题；如果是一个界面内部的，不需要考虑；如果是新开的一个页面，需要考虑这个问题；目前的解决办法是，主动让 input 失去焦点，输入法自动关闭，再打开下一单页面（实际问题：移动端中，用户编辑过滤器时，先输入文本或者数字，移动端键盘打开，然后更改列，键盘没有及时关闭，样式错误）

笔记：input file 上传后，应该清空一个 input 的值(input.value = '')，这样再次上传同名文件是正常的。


#### stringify 函数

作用：把JS对象或者数组，转换成JSON格式

参数：value是必选参数，表示需要转换的对象或者数组；replacer 是可选参数，表示把对象转换成JSON的转换函数，可以选择null；space 表示JSON的缩进或者空格（数字表示空格数量，或者非数字\t）

```
JSON.stringify(value[, replacer[, space]])
```



#### parseInt  函数

parseInt(number, index) 

函数作用：把一个变量转换成整数

参数：第一个是传入的变量，第二个是转换的进制（可选参数），默认是10进制。'2' 转换1进制是 NaN，’3‘ 转换为2进制是 NaN 

如果什么也不传，那么也返回 NaN



#### 序列解包

序列解包是 python3 的语法糖，可以批量进行复制或者解包

~~~python
# 简单赋值
x, y = 1, 2

# x, y 调换顺序
x, y = y, x

# 斐波那契数列中求和
x, y = y, x + y

# 获取剩余部分（*表示）
x, y, *z = 1, 2, 3, 4, 5 # z [3, 4, 5]
x, *y, z = 1, 2, 3, 4, 5 # y [2, 3, 4]
x, *y, z = 1, 2 # x 是1，z 是2， y是空列表
~~~

复杂情况

~~~python
(a, b), (c, d) = (1, 2), (3, 4)

s = 'ABCDEFG'
while s:
  x, *s = s
  print(x, s)
  
# result 
A ['B', 'C', 'D', 'E', 'F', 'G', 'H']
B ['C', 'D', 'E', 'F', 'G', 'H']
C ['D', 'E', 'F', 'G', 'H']
D ['E', 'F', 'G', 'H']
E ['F', 'G', 'H']
F ['G', 'H']
G ['H']
H []
~~~

参考链接：https://blog.csdn.net/yilovexing/article/details/80576788

本质上，python 变量存储的不是值，而是内存地址。这个操作是把引用的内存地址直接交换。



git 命名规范——自己提交时注意

- commit 命名：每次commit，要标准和准确的描述做了什么，改了什么，删除了什么，新增了什么
- 分支命名：version/1.2.3（大版本分支），feature/login（新增特性分支简写feat）person/michael-an/bugfix-editor（个人分支）special/firefox-debug（特殊分支）前面是大类-后面是功能说明 hotfix（紧急修复分支）
- tag只能适用用稳定的版本



### chmod

change mode :用户对文件的权限的命令

主要用于 bash 可执行脚本的使用

chmod 755 hello

更改权限后，这样就可以执行了

文件执行时，第一行是执行的环境设置（下面第一个是node，第二个是bash）

~~~js
#!/usr/bin/env node
console.log('hello world');
~~~

~~~bash
#!/bin/bash
echo "build start------"
cd book && mkdocs build
~~~



茶壶问题：首先建立一个简单的模型，解决一个简单的问题。如果一个复杂的问题，那么首先判断能否化解成一个简单的问题，然后化解成一个简单的问题，然后递推计算出原始的答案。

例子：react-dnd 按照官方的模板，掌握了这个后，然后把已有的问题转换成现在的问题。



#### 代码组件重构

原因：一个组件功能低耦合高内聚。如果一个组件功能繁杂，代码量很大，不便于管理，那么应该进行重构。

步骤：

1、理解功能：把当前组件的代码读懂，并理清不同的功能和界面匹配

2、划分重构边界：根据功能确定划分的部分（功能分类，还是界面分类），然后把不同的核心代码分开

3、迁移核心代码到不同子组件，优先调试小组件，并测试核心代码和传参正确性（import部分直接全部复制）

4、迁移类型检验，删除无用代码

5、重新整理类名，函数名等；微调内部结构。

6、最后判断预期效果是否达成。如果没有达到预期效果，或者重构后仍然有问题，需要重新开始前面步骤。



#### 发包之前检查

1、自动检查：运行单元测试（集成测试）如果有；运行代码检查（eslint 可选）

2、如果是React项目，可以打开浏览器，看控制台是否报错，界面样式和是否正常

3、如果有时间，从上一个版本到当前版本的新提交对应的功能，着重手动测试一下

4、以上无误后，发新版



#### 前端请求注意

- 请求成功：不应该直接使用 res.data 的内容，避免后端更改返回值。最好先通过 Modal 新建一个返回对象，规范一下返回的情况。
- 请求失败：处理各种错误（界面提示）提示的消息应该和真实错误一致；不能都归结为网络错误或者不存在，只要是前端可以识别的错误，都不要使用 errorBoundary 来捕获错误。
- 请求权限：注意用户的权限（由其是表单等多种权限用户登录的情况）



自己有一个良好的习惯，现在需要重新找回来，==那就是不断 review 自己的代码，不断抄写自己的代码==。

这样可以找出无意的拼写错误，还能根据后面新增的逻辑和功能，优化自己已有的代码和功能。



#### review 代码流程

1. 自动化测试通过（单元测试通过，格式检查通过）
2. 浏览器界面打开，使用过程中，操作正常，控制台无报错
3. 特殊情况界面不会崩溃（用户不输入，或者错误输入时，界面不崩溃，最好有友好的提示）
4. 代码中无 console.log 或者无用注释，无中文
5. 代码名称检查（变量名、函数名等，符合驼峰，意义明确不混淆）
6. 可选：算法优化；性能优化等



#### 有序数组转换成等高的二叉搜索树

等高的二叉搜索树，那么根节点必然是数组中中位数。数组已经排序，那么使用递归的思路直接将排序的有序数组转换成二叉搜索树，基本思路如下：

~~~js
function transArrayToBST (arr) {
  // 辅助函数
  const trans = (start, end) => {
    if (start > end) {
      return null;
    }
    if (start === end) {
      return new TreeNode(arr[start]);
    }
    // start < end 递归
    let mid = Math.floor((start + end) / 2);
    const midNode = new TreeNode(arr[mid]);
    midNode.left = trans(start, mid - 1);
    midNode.right = trans(mid + 1, end);
    return midNode;
  }
  return trans(0, arr.length - 1);
}
~~~



### 学会的

#### 1、array.reduce

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



#### 5 回溯算法小结

核心代码：循环数组，然后把当前项一次放到临时数组中，然后判断临时数组是否满足条件。如果满足条件，直接放到结果数组中。如果不满足条件，如果没有达到条件，那么进一步回溯。如果超过条件，那么返回，继续循环下一个条件。

~~~js
if (tmp.length > K || sum(tmp) > K) {
 	let item = [...tmp];
  list.push(item);
  return;
}

for (let i = start; i < end; i++) {
  tmp.push(arr[i]);
  backtrack(tmp, list);
  tmp.pop(arr[i]);
}
~~~

注意点：目标数组中使用允许重复，全部样本中是否有重复的对象。

备注：如果要求全部样本中没有重复的对象，尽量避免使用 array.includes 判断 tmp 中是否存在另一个元素，这样算法复杂度较差。最好使用对象索引判断一下，减少复杂度。

应用：大部分排列组合问题、硬币找零问题（不能使用贪心算法）

#### 6 动态规划小结（初级）

核心代码：当前的结果可以使用前面的结果表示。那么获取初始状态，以及获取递推公式，然后执行一次循环，即可算出N次结果的值。

~~~js
f(n) = F(a * f(n - 1) + b * f(n - 2) +);
~~~

动态规划的实质是，把一个实际问题，转换成数学的递推公式（通项公式），然后使用排列组合或者递推的方式计算结果。

应用：斐波那契函数、打家劫舍问题，背包问题，复杂排列组合问题

难点：把一个实际问题，转换成数学的递推公式

例子：排列组合数据量较大时，回溯方法内存溢出，使用DP解决

~~~js
var fn = (nums, target) => {
  nums.sort((a, b) => b - a);
  let dp = [];
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 1; i <= target; i++) {
    let tmp = 0;
    // 这里可以优化
    nums.forEach(num => {
      if (i - num >= 0) {
        tmp += dp[i - num];
      }
    });
    dp [i] = tmp;
  }
  return dp[target];
}
~~~

动态规划处理最大子序和（给定一个数组，求最大自序和）

1. 一个数组最大的自序和，那么等于每一个项结尾的自序和的最大值

maxList = [max1, max2, max3,,, maxn];
Math.max(...maxList)

2. 每一个项为结尾的最大自序和，可能是当前的 nums[i] 或者是 f(n - 1) + nums[i]

~~~js
function fn(nums) {
  let tmp = 0;
  let maxList = [];
  for (let i = 0; i < nums.length; i++) {
    tmp = Math.max(tmp + nums[i], nums[i]);
    maxList.push(tmp);
  }
  return Math.max(...maxList);
}
~~~

#### 8 polyfill 作用

polyfill 英文翻译：垫片；计算机中指的是"补丁"

为什么使用：老版本浏览器需要较早的语法才能使用（IE11不能使用Object.assign）所以需要通过 babel 把高级语法转换成低级语法。我们可以设置需要支持的浏览器版本（例如使用babel 转换到 es3 还是 ES5 版本）。早期的版本需要更多代码，如果不想兼容 ie 678 那么可以节省不少代码。

垫片（补丁）分类：@babel/preset-env @babel/runtime @babel/folyfill @babel/transform-runtime 和 core-js 库，详见官网

补丁使用方法：手动、半自动、全自动。1、手动：根据需求，安装对应的第三方库（Object.assign = require('object-assign')）不利于维护。2、半自动：根据webpack覆盖率：preset-env 根据预设的环境打补丁（https://github.com/browserslist/browserslist）在配置文件中设置 corejs和targets版本，即可打包对应版本的代码。3、自动：polyfill.io 这个库可以根据浏览器的 UA 自动判断不同版本的代码并处理  https://polyfill.io/v3/ 。chrome 会不处理，IE 会转换。参考链接：https://zhuanlan.zhihu.com/p/71640183

#### 7 React

Props 和 子组件更新：如果一个子组件的 state 是父组件的 props 计算出来，那么当父组件的 props 变化后，子组件必须更改 state。否则界面无法更改成最新的状态。

setState 在react合成事件(onClick)和JS代码中是异步的；在原生JS事件（addeventListener）和定时器中是同步的、第一个参数可以是对象，或者是一个函数（返回新的state对象）。

componentDidUpdate 阶段，React 组件重新渲染，但是真实 DOM 的 redraw 还没有完成，所以更改 top 不会产生动画。设置CSS无效。解决：setTimeout 后，DOM 主线程的 redraw 已经执行完，新增的行真实 DOM 已经渲染到界面上，更改 top 值，render tree 重新生成，动画效果可以显示（其他CSS样式类似）。行排序动画遇到这个坑（在 componentDidUpdate 阶段设置 top ，动画无效）参考：https://blog.csdn.net/huangpin815/article/details/80023480

#### 16 git cherry-pick 

问题原因：想把一个分支上的一个或者几个 commits 提交到另一个分支上面。比如把 1.5 分支上的后续修复 commit 提交到 master 分支上。但是不需要把全部的 1.5 分支的全部 commits 放在 master 上，可以使用这个命令。下面是操作过程

~~~bash
git fetch origin 1.5 && git checkout 1.5
git log
~~~

查看提交日志，然后找出某一个或者某几个 hash

~~~txt
commit 62ede8d524ba78ec3a6b427a4dc3f7cfef12dba3 (HEAD -> master, origin/master, origin/HEAD)
Author: Michael An <2331806369@qq.com>
Date:   Fri Feb 19 22:19:31 2021 +0800

    fix color popover (#2151)

commit d60da5d351f0c629ae3655afb9c07c38216a8be9
Author: Michael An <2331806369@qq.com>
Date:   Fri Feb 19 16:01:34 2021 +0800

    fix group no rows bug (#2150)

commit a24fa659140b47736dc46d0000964c86e0fb9f17
~~~

然后切换到master上面，进行 cherry-pick 摘樱桃

~~~bash
git checkout master
git cherry-pick d60da5d351f0c629ae3655afb9c07c38216a8be9 # 把这一个commit放到master
git cherry-pick A-hash B-hash # 把两个hash之间的全部Commits放到master分支
~~~

这样master上就有了1.5分支上的几个commit了。

参考：http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html
