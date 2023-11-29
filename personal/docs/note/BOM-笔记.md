# BOM笔记 
 
## 0022 重绘和回流是什么；如何进行优化


#### 浏览器的渲染原理

1、把 html 解析DOM树，然后再加上css进行渲染树，然后在渲染到界面上

#### Repaint reflow

2、Repaint 不改变界面元素的几何位置，只是改变一些样式上的属性，例如透明度，颜色，背景色

3、重流 reflow 改变了dom节点的排序以及界面的相对位置

Repaint 不一定造成reflow，Reflow一定会造成repaint。优先更改 css 代码促进 repaint，可以减少界面中性能的消耗

#### 优化

浏览器如何优化？减少dom操作，获取dom尺寸以及改变dom尺寸的方法。具体的是 width height，offsetTop,scrollTop clientTop 

getComputedStyle: 获取指定元素的 CSS 样式 <https://www.runoob.com/jsref/jsref-getcomputedstyle.html> 这个方法有两个参数 getComputedStyle(dom, 伪类)，和 dom.style 的区别：<https://www.runoob.com/w3cnote/window-getcomputedstyle-method.html> 

```
let styleObj = window.getComputerStyle(dom) 
// 返回值是驼峰变量 { width, backgroundColor, cssFloat } 因为 float 是 JS 保留字，所以改了

```

getBondingClientRect: 返回元素相对视口的大小和位置 <https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect> 

```
let rect = getBoundingClientRect();

x : 146
y : 50
width : 440
height : 240
top : 50
right : 586
bottom : 290
left : 146

```

css如何优化？减少不必要的层级，减少通配符，使用硬件加速（GPU加速）详见这篇博客

<https://zhuanlan.zhihu.com/p/404656386?utm_medium=social&utm_oi=27091277971456>  

减少 dom 操作次数，可以改成批量操作 dom 放入 fragment，最后操作整个 fragment



   
## 0028 Cookie 和 token 的区别


Cookie是存放在本地浏览器当中，每一次发出请求都会带上cookie,容易造成劫持 csrf 攻击


token 是服务端生成的一个令牌，前端可以根据需要在请求当中，在请求头中加入token。


Cookie的泄露会造成CSRF攻击。
对于XSS攻击，两个都不会影响

SQL 注入：这个主要工具数据库，在服务端远程执行 SQL 



   
## 0101 浏览器生成界面的过程？


就是输入URL到网站展示的全过程，不赘述



   
## 0138 浏览器渲染参数说明


浏览器性能监控

![](https://cloud.seatable.cn/workspace/32/asset/37d9be94-36c7-4add-8e78-fdf8564d701b/images/auto-upload/image-1678695177582.png)

浏览器渲染分析

![](https://cloud.seatable.cn/workspace/32/asset/37d9be94-36c7-4add-8e78-fdf8564d701b/images/auto-upload/image-1678695164428.png)

**网站的基本指标 参数评估**

![](https://cloud.seatable.cn/workspace/32/asset/37d9be94-36c7-4add-8e78-fdf8564d701b/images/auto-upload/image-1678699590779.jpeg)

| 指标              | 描述                     | Good    | Poor     | Percentile |

\| ----------------- \| ------------------------ \| ------- \| -------- \| ---------- \|

| 加载性能（LCP）   | 显示最大内容元素所需时间 | ≤2500ms | ＞4000ms | 75         |

| 交互性（FID）     | 首次输入延迟时间         | ≤100ms  | >300ms   | 75         |

| 视觉稳定性（CLS） | 累计布局偏移             | ≤0.1    | >0.25    | 75         |

![](https://cloud.seatable.cn/workspace/32/asset/37d9be94-36c7-4add-8e78-fdf8564d701b/images/auto-upload/image-1678695170862.png)

实时性能监控，主要参数是 CPU 使用率，JS 堆内存，DOM 节点数，用来判断内存问题和界面问题

![](https://cloud.seatable.cn/workspace/32/asset/37d9be94-36c7-4add-8e78-fdf8564d701b/images/auto-upload/image-1678695183957.png)



   
## 0139 常见 web 性能指标


个人想法：

常见web性能指标比较多，参考：<https://blog.csdn.net/u012961419/article/details/124748721> 

我在项目中使用的有：首屏加载时间，FTP 每秒帧速率，日常解决代码内存溢出，界面卡顿等问题分析

1、优化首屏时间：减少 HTTP 请求数量，打包 js 和 CSS，减少媒体文件的数量大小格式，使用 CDN；SSR 服务端渲染；移动端分片加载渲染数据；图片懒加载；使用图片缩略图（需后端支持）；首页渲染骨架屏

2、代码性能分析：分析代码的问题（代码的时间和空间复杂度），还是数据的问题（脏数据，大数据等），多次测量取平均值，分析什么造作会造成问题，具体到某个函数或者某个渲染阶段，然后定位问题，项目实例如下：

（例如数据比较多，某个用户500多列，上万行数据）

（例如在循环体内部，进行大量的 DOM 和 JS 操作）

（例如使用 n2 的算法实现查找等，改进成 n\* logN）

（界面卡顿，可能是 JS 计算造成，或者 DOM 渲染造成，或者动画加载卡顿等）





   
## 0141 dom树是怎么生成的


浏览器是多进程架构，而其中有一个渲染进程，负责页面的渲染和js脚本的执行。而在渲染进程中有一个HTML解析器，然后渲染进程用类似 stream 流管道那种接字节，流将它解析为dom

——类似从URL输入到渲染界面的过程

浏览器解析过程，浏览器拿到 HTML 后，从上到下一行一行解析语法，例如解析到 css 或者 js 文件，那么判断同步脚本还是异步脚本，然后一遍下载 css 和 js 脚本，然后继续解析。解析过程是 字符串变成 DOM 树结构。

例如 span 标签，然后就解析成一个 span 节点（对象），然后设置节点的属性（title）设置节点的子节点和父节点，这样依次解析完，就完成一个 dom 树。

dom 树 + css 就是 render tree 渲染树，类似 PS 中多个图层，然后图层实现栅格化，3D转换成2D，这部分需要显卡计算，然后显示成二维的平面网页效果。 



   
## 0143 v8垃圾回收


首先js因为是单线程，垃圾回收会占用主线程，导致页面卡顿，所以需要一个算法或者说策略，而v8采用的是分代式回收，而垃圾回收在堆中分成了很多部分用作不同的作用，回收主要表现在新老生代上，新生代就活得短一点的对象，老生代就活得长一点的对象。

在新生代里有一个算法，将新生代分成了两个区，一个 from,一个TO，每次经过 Scavenge 会将 from 区中的没引用的销毁，然后活着的 to 区**调换位置**，反复如此，当经过一次 acavange 后就会晋升的老生代还有个条件就是TO区的内存超过多少了也会晋升。

而老生代，采用**标记清除和标记整理**，但标记清除会造成内存不连续，所以会有标记整理取解决掉内存碎片，就是清理掉边界碎片。

为什么TO超过25%要晋升老生代？标记清除是怎么清除的？

第一个问题是为了不影响后续FORM空间的分配，第二个问题垃圾回收会构建一个根列表，从根节点去访问那些变量，可访问到位活动，不可就是垃圾



   
## 0251 浏览器自动跳转到另一个页面的问题


浏览器自动跳转问题

总结一下问题的解决过程

因为页面跳转，默认想到的是 JS window.open 或者 HTML A 标签，报错误导了方向，恰好近期改动了这部分JS代码

1、首先用户反馈，这个是公式引用报错，把自己绕到了链接公式 roolup 这部分功能，一直排查是否是 JS 的问题。

2、测试不同的浏览器，都会自动刷新。所以排除浏览器的兼容性问题。然后通过 console.log 保留日志分析，这个数据基本正常。

3、开始判断是用户行为，还是 JS 代码逻辑问题。设置一个定时器，自动更改 JS 代码，然后不出错。证明 JS 链接公式没问题，主要问题在用户点击。

4、逐步排查点击事件，然后不是当前组件，而是内部的选择器组件中的问题。把点击事件的默认行为改掉，就不出错了。但是内部的选择是公共组件，其他使用公共组件的地方是正常的，最好不改动公共组件。

5、找到使用这个组件的地方，外部为了样式，加了一个 Form，然后点击事件触发了表单提交，页面就刷新了。

6、更改：把 Form 改成 DIV 就不会跳转了。

总结：默认界面跳转也可能是这个问题（无意中的表单提交）



   
## 0252 TAB 跳转实现有两种方法


HTML 设置 button 或者 input，浏览器会自动 TAB——这是浏览器默认的做法，效果比较灵活。

JS ，然后通过 state 控制状态，设置 currentTab，然后设置对应的样式，这样可以记录上一次的位置（这种需要把浏览器默认的 TAB 事件去掉，例如界面中还有其他的button，那么点击 Tab 还会触发按钮的交互改变）。问题：如果界面中按钮的数量是动态变化的，就需要动态计算 currentTab，这样比较麻烦。



   
## 0258 如何避免前端缓存


缓存的原理：当浏览器请求资源文件时，优先检查本地是否有相同的资源，如果有资源就不需要请求服务器了。

生产环境下避免缓存方法，给固定的资源加上时间戳。

静态资源：如果是一次性的变化，直接加一个随机数 ?v=xxx 即可（全局样式 and-design）

静态资源：如果是经常变化，可以加一个 ?t={{ version }} 通过后端传参，设置不同版本下静态资源自动更新，避免缓存影响界面效果（翻译文件）

前端文件：webpack 打包时，给 bundle 加入一个随机数，当代码更新后，然后 html 请求不同的 JS 和 CSS file，就相当于避免了浏览器缓存。



   
## 0264 window.postMessage 有什么作用


### 跨域与 window.postMessage()

跨域：协议不同、域名不同、端口号不同，会产生跨域。跨域：不同域之间不能访问 cookie、localStorage，不能操作 DOM，不能发送请求(无法向非同源地址发送 AJAX 请求)等。可能在多层 iframe 中出现，或者页面新打开一个窗口等。

解决跨域方法：

1、如果主域和子域是同一个公司维护，那么设置 document.domain 

2、跨文档通信 window.postMessage() ，父窗口向子窗口发送消息，子窗口监听message事件。

```javascript
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

```

3、JSONP: 网页通过添加一个\`\<script>元素\`，向服务器请求 JSON 数据，服务器收到请求后，将数据放在一个指定名字的回调函数的参数位置传回来

4、CORS (cross origin resource share 跨域资源共享) 需要前端请求加入参数，后端配置 Access-Control-Allow-Origin 

参考链接：

<https://blog.csdn.net/qq_38128179/article/details/84956552> 



   
## 0278 前端如何下载多个文件？


#### 1、前端最多并行下载多少文件？

谷歌浏览器 118 版本允许并行下载 10个文件，超出 10个后就不会直接下载，其他主流浏览器也是类似的。

老版本浏览器并行下载数量更少。

#### 2、如果下载超10个，解决的方法有哪些？

方法1：前端使用延迟函数，间隔下载（目前表格下载20个文件，使用这个方案）

```javascript
function sleep() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

async function downLoadResult(fileName, resultStr) {
  await sleep();
  const blob = new Blob([resultStr], {
    type: "text/plain;charset=utf-8"
  });
  const objectURL = URL.createObjectURL(blob);
  const aTag = document.createElement('a');
  aTag.href = objectURL;
  aTag.download = fileName + "-笔记.md";
  aTag.click();
  URL.revokeObjectURL(objectURL);
}

```

方法2：前端使用 JSzip 打包，把很多小文件打包成大文件下载。

<https://www.npmjs.com/package/jszip> 

```javascript
const zip = new JSZip();

zip.file("Hello.txt", "Hello World\n");
zip.file("note.md", "This is note for nodejs");

zip.generateAsync({type:"blob"}).then(function(content) {
    // see FileSaver.js
    saveAs(content, "example.zip");
});

// Results in a zip containing
/*
Hello.txt
note.md
*/

```

方法3：后端实现打包，前端直接访问 URL 下载。



  