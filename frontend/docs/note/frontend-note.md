# 前端笔记

==学习要把不会的学会，学懂，而不是把会的重复100遍==

- [x] HTMLtoCanvas 第三方库学习；canvas.toDataUrl('image/png', 1.0)  配置：allowTaint taintTest allowCORS 等。主要使用场景：统计中 canvas 导出生成 PNG，主页看板娘的 canvas 拍照显示成 png 的功能。

- [x] react 中强制更新组件，this.forceUpdate() 尽量避免使用，最好使用 state 或者 props 数据驱动更新



####  0 循环中异步函数

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



#### 1 flex 和 inline-flex 

类似 block 和 inline-block，前缀的 inline 是相对于父盒子而言，是行内元素还是块级元素。flex 都表示内部是伸缩盒子。

Inline-flex 存在的问题：如果不同子盒子的高度不同（例如有的有文字，有的没有文字），都设置了 inline-flex 那么整理的高度就不一定对齐。解决方法：vertical-align: middle 设置到父元素上面（具体应用：移动端链接列对齐）

Flex 细节参考：

https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

https://www.ruanyifeng.com/blog/2015/07/flex-examples.html



#### 3 FileReader

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

大文件分片上传（详见开课吧项目笔记）思路

- 先把 file 异步读取到(fs.readAs)

- 然后切片成 chunks (files.slice(current, current + chunkLength))
- 然后前端生成一个 hash (三种方法，idle，布隆过滤器) 不熟悉，再看一下文档
- 然后 chunks.map() 给每一个分片name加上hash，调用APU并上传。根据上传的chunks数量，设置进度条。
- 上传后，需要后端协同处理（根据文件的 hash 确定文件唯一性，然后根据 chunk 的 index，把多个文件片段合并并存储）

其他情况思路：

- 很多小文件上传（目前没有好办法，尝试压缩，本地用JSZip 或者gzip等格式）；
- 网络很差（经常中断）前端后端需要查询是否某个片段已经上传，来确定是否重新上传等
- 拖拽文件上传，复制粘贴上传（需要调用前端的事件获取文件）



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





#### 7 pointer-events 和点击穿透

有时候，我们会遇到界面中多个图层重叠的问题，下面图层绑定函数，上面的图层显示 UI 效果。我们希望点击事件，可以穿透上层 DIV 然后触发下层 DIV 的函数。

那么可以设置 'pointer-events: none' 表示上层的点击事件是无效的。

还可以避免 hover visited 的效果（我们想改变一个链接的显示状况，避免出现 visited 后的蓝色边框）

其他的属性主要用在 svg 上面

详情参考：https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events



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

如果不能使用，可以断开连接，重新开启手机的开发者 USB 调试模式。



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





#### 17 stringify 函数

作用：把JS对象或者数组，转换成JSON格式

参数：value是必选参数，表示需要转换的对象或者数组；replacer 是可选参数，表示把对象转换成JSON的转换函数，可以选择null；space 表示JSON的缩进或者空格（数字表示空格数量，或者非数字\t）

```
JSON.stringify(value[, replacer[, space]])
```



#### 18 parseInt  函数

parseInt(number, index) 

函数作用：把一个变量转换成整数

参数：第一个是传入的变量，第二个是转换的进制（可选参数），默认是10进制。'2' 转换1进制是 NaN，’3‘ 转换为2进制是 NaN 

如果什么也不传，那么也返回 NaN







#### 26 textarea 的高度自动变化

- 默认加载时，设置高度是固定的（100px）然后溢出不显示
- 点击编辑后，根据内容设置高度，然后设置溢出显示滚动条，这样方便编辑

缺陷：点击编辑后，外部整体的高度会被撑开，可能有其他的问题



#### 27 谷歌浏览器版本

这里是全部的谷歌浏览器版本，用于排查某一个版本的问题

2011-2020 主要版本：https://sourceforge.net/projects/osxportableapps/files/Chromium/

https://www.applex.net/downloads/google-chrome-for-mac.25/history

http://www.chromium.org/getting-involved/dev-channel



#### 28 Windows 微信版本问题

微信全部版本及发布时间：https://weixin.qq.com/cgi-bin/readtemplate?lang=zh_CN&t=weixin_faq_list&head=true

早期版本中（3.0.0及之前）微信内核是 chrome 53 不支持很多 ES6 的语法，所以需要兼容

最新版本中（3.3.5及之后）微信内核变化后，支持 ES6 语法（不支持开发者工具，不确定内核的具体版本号）

3.0.0 之间到 3.3.5 之后的版本，没有逐一测试兼容性

早期版本的调试步骤参考：https://www.yuque.com/wuchendi/fe/winwechat 具体需要下载一个 dev 的包，然后可以打开调试台



### 学会的

#### 1 array.reduce

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





#### 8 polyfill 作用

polyfill 英文翻译：垫片；计算机中指的是"补丁"

为什么使用：老版本浏览器需要较早的语法才能使用（IE11不能使用Object.assign）所以需要通过 babel 把高级语法转换成低级语法。我们可以设置需要支持的浏览器版本（例如使用babel 转换到 es3 还是 ES5 版本）。早期的版本需要更多代码，如果不想兼容 ie 678 那么可以节省不少代码。

垫片（补丁）分类：@babel/preset-env @babel/runtime @babel/folyfill @babel/transform-runtime 和 core-js 库，详见官网

补丁使用方法：手动、半自动、全自动。1、手动：根据需求，安装对应的第三方库（Object.assign = require('object-assign')）不利于维护。2、半自动：根据webpack覆盖率：preset-env 根据预设的环境打补丁（https://github.com/browserslist/browserslist）在配置文件中设置 corejs和targets版本，即可打包对应版本的代码。3、自动：polyfill.io 这个库可以根据浏览器的 UA 自动判断不同版本的代码并处理  https://polyfill.io/v3/ 。chrome 会不处理，IE 会转换。参考链接：https://zhuanlan.zhihu.com/p/71640183



#### 7 React

Props 和 子组件更新：如果一个子组件的 state 是父组件的 props 计算出来，那么当父组件的 props 变化后，子组件必须更改 state。否则界面无法更改成最新的状态。

setState 在react合成事件(onClick)和JS代码中是异步的；在原生JS事件（addeventListener）和定时器中是同步的、第一个参数可以是对象，或者是一个函数（返回新的state对象）。

componentDidUpdate 阶段，React 组件重新渲染，但是真实 DOM 的 redraw 还没有完成，所以更改 top 不会产生动画。设置CSS无效。解决：setTimeout 后，DOM 主线程的 redraw 已经执行完，新增的行真实 DOM 已经渲染到界面上，更改 top 值，render tree 重新生成，动画效果可以显示（其他CSS样式类似）。行排序动画遇到这个坑（在 componentDidUpdate 阶段设置 top ，动画无效）参考：https://blog.csdn.net/huangpin815/article/details/80023480



