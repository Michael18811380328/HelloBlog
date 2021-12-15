# 腾讯面试四问，Are you OK?

## 引言

一朋友刚面了腾讯音乐（TME）前端开发岗位（两年经验），本瓜撰文记之。以期同各面试人分享交流~

自评面试难度：🌕🌕🌕🌕🌑

话不多说，直接看题！我相信一定有你想要的！

- 注：好的面试流程通常以聊天的方式进行，题目是连续的。此处抽出核心四问，其间附带的小问题一笔带过，不做赘述。

## 页面通信

> ❝
>
> 问题一：从页面 A 打开一个新页面 B，B 页面关闭（包括意外崩溃），如何通知 A 页面？

炸看这一题，以为讲的是 html 页面通信。页面通信不太熟了吗，不就

1. url 传参吗；
2. 同域的情况下本地缓存也可以存值传递；

真的是这样吗？还有没有其它？

再仔细审题。要求是：新打开的 B 页面关闭（包括意外崩溃）如何传回给 A 页面。

所以题目应拆分为：

1. B 页面正常关闭，B 页面如何通知 A 页面（涉及参数回传、参数监听）；
2. B 页面意外崩溃，比如线程直接被杀死，如何通知 A 页面（涉及监听页面崩溃）；

我们应该分别作答。

### B 页面正常关闭

**1.** 首先要回答出页面关闭时会触发的事件是什么？

页面关闭时先执行window.onbeforeunload，然后执行 window.onunload

我们可以在 window.onbeforeunload 或 window.onunload 里面设置回调。

**2.** 然后回答如何传参？

最先想到的是：用 window.open 方法跳转到一个已经打开的页面（A页面），url 上可以挂参传递信息。

这里，如果你不清楚如何跳转到一个已经打开的页面，可以参考[这篇](https://blog.csdn.net/u013910340/article/details/90406674)，本质就是设置页面名即可。

**在 chrome 浏览器下会报错**`“Blocked popup during beforeunload.”`

在 MDN 里找到了解释：HTML规范指出在此事件中调用window.alert()，window.confirm()以及window.prompt()方法，可能会失效。[Window: beforeunload event](https://developer.mozilla.org/zh-CN/docs/Web/Events/beforeunload)

**在火狐浏览器下不会报错**，可以正常打开 A 页面。

**3.** 成功传参后，A 页面是如何监听 URL 的？

onhashchange 是为您排忧解难。[Window: hashchange event](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/hashchange_event)：当URL的片段标识符更改时，将触发hashchange事件 (跟在＃符号后面的URL部分，包括＃符号)

如果你传参是以 A.html?xxx 的形式，那就需要监听 window.location.href。具体如何做呢？留个小作业吧！😀

**4.** 针对以上，本瓜做了一个 Demo，还是亲自得动手！本地服务 By [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)。

// 页面 A

```
<html>
<head>
</head>
<body>
    <div>这是 A 页面</div>
    <button onclick="toB()">点击打开 B 页面</button>
    <script>
        window.name = 'A' // 设置页面名
        function toB() {
            window.open("B.html", "B") // 打开新页面并设置页面名
        }
        window.addEventListener('hashchange', function () {// 监听 hash
            alert(window.location.hash)
        }, false);
    </script>
</body>
</html>
复制代码
```

// 页面 B

```
<html>
<head>
</head>
<body>
    <div>这是 B 页面</div>
    <script>
        window.onbeforeunload = function (e) {
            window.open('A.html#close', "A") // url 挂参 跳回到已打开的 A 页面
            return '确定离开此页吗？';
        }
    </script>
</body>
</html>
复制代码
```

效果展示

![img](https://user-gold-cdn.xitu.io/2020/7/29/17398b005ae4cd06?imageslim)

其实传参也可以通过**本地缓存传参**，A 页面设置监听,在 B 页面设置 loacalStorage，本瓜亲测可行。

```
// A.html
window.addEventListener("storage", function (e) {// 监听 storage
            alert(e.newValue);
        });
// B.html
window.onbeforeunload = function (e) {
            localStorage.setItem("name","close");
            return '确定离开此页吗？';
        }
复制代码
```

好啦！这便是新页面被正常关闭情况下的传值问题的解答。如果页面是意外崩溃掉了呢？

### B 页面意外崩溃

B 页面意外崩溃，JS 都不会运行了，还如何将通知 A 页面呢？

早有大神给出了建议：[Logging Information on Browser Crashes？](http://jasonjl.me/blog/2015/06/21/taking-action-on-browser-crashes/)

简单来说就是：在网页 onload 事件设置一个 pending 状态，beforeunload 事件下改变这个 pending 状态为 exit，如果二次访问这个页面，onload 里获取的状态是 pending,则判断网页上一次发生 Crash，否则为正常关闭。

但是这个状态存在 sessionStorage 里面合适吗？如果用户关闭了页面，sessionStorage 值就会丢失。[Window.sessionStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)

那么还有什么别的方法吗？

答：我们可以使用 Service Worker 来实现网页崩溃的监控（也许你听说过 Web worker，二者区别你知道吗？挖个坑🕳，之后在填。）。

1. Service Worker 有自己独立的工作线程，与网页区分开，网页崩溃了，Service Worker 一般情况下不会崩溃；
2. Service Worker 生命周期一般要比网页还要长，可以用来监控网页的状态；
3. 网页可以通过 navigator.serviceWorker.controller.postMessage API 向掌管自己的 Service Worker 发送消息。

具体实现是采用**心跳检测**的方式实现：

1. 页面 B 每 5S 给自己的 Service Worker 发送一次心跳，记录一个状态 running 并更新时间戳。正常关闭的时候通知 Service Worker 清除这个状态。
2. 如果网页 Crash 了，running 将不会被清除，且时间戳也不会再更新。Service Worker 每 10s 查看一遍时间戳，如果发现“状态是 running 且 时间戳有一段时间未更新了”，则说明这个网页 B 发生崩溃了。

代码实现（可直接在本地贴了测）：

// B 页面

```
<html>
<head>
</head>
<body>
    <div>这是 B crash 页面</div>
    <button onclick='handleCrash()'>点击我使页面崩溃</button>
    <script>
        function handleCrash(){
            var total="";  
            for (var i=0;i<1000000;i++)  
            {  
                var dom = document.createElement('span');
                dom.innerHTML="崩溃";
                document.getElementsByTagName("body")[0].appendChild(dom)
            }  
        }
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js', {
                scope: './'
            }).then(function (registration) {
                if (navigator.serviceWorker.controller !== null) {
                    let HEARTBEAT_INTERVAL = 5 * 1000; // 每五秒发一次心跳
                    let sessionId = "uuid()";
                    let heartbeat = function () {
                        console.log("页面发送 state:running") // running
                        navigator.serviceWorker.controller.postMessage({
                            type: 'running',
                            id: sessionId,
                            data: {} // 附加信息，如果页面 crash，上报的附加数据
                        });
                    }
                    window.addEventListener("beforeunload", function () {
                        console.log("页面发送 state:clear") // clear
                        navigator.serviceWorker.controller.postMessage({
                            type: 'clear',
                            id: sessionId
                        });
                    });
                    setInterval(heartbeat, HEARTBEAT_INTERVAL);
                    heartbeat();
                }
            }).catch(function (error) {
                // Something went wrong during registration. The service-worker.js file
                // might be unavailable or contain a syntax error.
            });
        } else {
            // The current browser doesn't support service workers.
        }
    </script>
</body>
</html>
复制代码
```

// service-worker.js

```
const CHECK_CRASH_INTERVAL = 10 * 1000; // 每 10s 检查一次
const CRASH_THRESHOLD = 15 * 1000; // 15s 超过15s没有心跳则认为已经 crash
const pages = {}
let timer

function checkCrash() {
  const now = Date.now()
  for (var id in pages) {
    let page = pages[id]
    if ((now - page.t) > CRASH_THRESHOLD) {
      // 上报 crash
      console.log("页面发生崩溃")
      delete pages[id]
    }
  }
  if (Object.keys(pages).length == 0) {
    clearInterval(timer)
    timer = null
  }
}

this.addEventListener('message', (e) => {
  console.log("service worker 接收", e.data.type)
  const data = e.data;
  if (data.type === 'running') { // 正常心跳
    pages[data.id] = {
      t: Date.now()
    }
    if (!timer) {
      timer = setInterval(function () {
        checkCrash()
      }, CHECK_CRASH_INTERVAL)
    }
  } else if (data.type === 'clear') {
    delete pages[data.id]
  }
})
复制代码
```

效果展示：

![img](https://user-gold-cdn.xitu.io/2020/7/29/1739979ff2874792?imageslim)

我们可以看到利用 service-worker 线程和页面之间的心跳检测可以得出页面是否崩溃。拿到崩溃结果，再传回给 A 页面就行了（小作业：可自行体验通过 service-worker 回传参数）。

## DOM 监听

> ❝
>
> 问题二：自己如何实现 Vue 的数据监听，能检测到 DOM 新增加绑定的属性吗？

知道 Vue2 原理的小伙伴都知道，数据双向绑定主要依赖于 Object.defineproperty() 对数据的劫持，它有 get 和 set 方法，可以监听对象属性的读取和设置。

嗯，很好，知道这一步，你获得了下一环节的被提问机会。

### Object.defineproperty() 可以监听 DOM 属性吗？

Object.defineproperty() 监测的目标是对象，Dom 元素的属性集合[dom.attributes]也为对象，所以当然可以。

其中要注意的是： style 属性，它是一个属性集合。那么，它的子属性也能被监听吗？

敲黑板！我们需回答出 Object.defineproperty() 的不足：

1. 无法监听数组的变化： 数组的这些方法是无法触发set的:push, pop, shift, unshift,splice, sort, reverse。Vue 中能监听是因为对这些方法进行了重写（hack）。
2. 只能监听属性，而不是监听对象本身，需要对对象的每个属性进行遍历。对于原本不在对象中的属性难以监听。Vue 中使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性。

哎呀，官方其实早已作出说明。[检测变化的注意事项](https://cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项)

### 如何监听一个新创建的属性呢？

看完上一小节，这里答案显而易见：手动对新创建的属性进行监听。

- Vue.set 原理：

当一个数据为响应式时，vue 会给该数据添加一个__ob__属性，因此可以通过判断target对象是否存在__ob__属性来判断target是否是响应式数据。当target是非响应式数据时，我们就按照普通对象添加属性的方式来处理；当target对象是响应式数据时，我们将target的属性key也设置为响应式并手动触发通知其属性值的更新；

```
defineReactive(ob.value, key, val)
ob.dep.notify()
复制代码
```

此节结尾，本瓜再抛一两个问题吧：

1. 你能手写发布订阅者模式吗？用 ES5、ES6 都 ok 吗？
2. Vue3 为什么改为用 Proxy 监听数据，你能说出个条条框框？

## 懒加载

> ❝
>
> 问题三：懒加载除了滚轮监听还有什么？

我知道你知道：懒加载的核心：不在可视区域的资源可以延迟加载。

你非常棒，知道可以使用监听滚轮，甚至还知道采用节流来防止函数被高频触发。

还有其它吗？

### 除了监听滚轮，还有呢？

- 交叉观察者

利用[IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)接口 (从属于Intersection Observer API) 提供了一种异步观察目标元素与其祖先元素或顶级文档视窗(viewport)交叉状态的方法。祖先元素与视窗(viewport)被称为根(root)。

当子元素与父元素发生交叉，则表示进入可视区域啦。

```
const box = document.querySelector('.box');
const imgs = document.querySelectorAll('.img');

const observer = new IntersectionObserver(entries => {
    // 发生交叉目标元素集合
    entries.forEach(item => {
        // 判断是否发生交叉
        if (item.isIntersecting) {
            // 替换目标元素Url
            item.target.src = item.target.dataset.src;
            // 取消监听此目标元素
            observer.unobserve(item.target);
        }
    });
}, {
    root: box, // 父级元素
    rootMargin: '20px 0px 100px 0px' // 设置偏移 我们可以设置在目标元素距离底部100px的时候发送请求
});

imgs.forEach(item => {
    // 监听目标元素
    observer.observe(item);
});
复制代码
```

你还知道其他实现懒加载的方法吗？

## 首屏加载

> ❝
>
> 问题四：首屏加载时间如何计算？

首先，咱得明白什么是“首屏加载”时间。

答：用户能够看到第一屏区域内所有元素加载完的时间就是“首屏加载”时间。一个页面的“总加载时间”（onload）一定大于等于“首屏加载”时长。

通常需要考虑首屏时间的页面，都是因为在首屏位置内放入了较多的图片资源。

而图片资源处理是异步的，会先将图片长宽应用于页面排版，然后随着收到图片数据由上至下绘制显示的。并且浏览器对每个页面的TCP连接数限制，使得并不是所有图片都能立刻开始下载和显示。

所以我们需要获取首屏内最后一张图片加载完的时间（绑定首屏内所有图片的 load 事件），然后减去 navigationStart 时间，则为“首屏加载”时间。

```
首屏位置调用 API 开始统计 -> 绑定首屏内所有图片的 load 事件 -> 页面加载完后判断图片是否在首屏内，找出加载最慢的一张 -> 首屏时间
复制代码
```

### 白屏时间计算？

白屏时间 = 开始渲染时间(首字节时间+HTML下载完成时间)+头部资源加载时间。

```
// PerformanceTiming
performance.timing.responseStart - performance.timing.navigationStart

// or 在 chrome 高版本下

(chrome.loadTimes().firstPaintTime - chrome.loadTimes().startLoadTime)*1000
复制代码
```

### 用户可操作时间(即 document.ready)

```
performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
复制代码
```

### onload 总下载时间？

```
performance.timing.loadEventEnd - performance.timing.navigationStart
复制代码
```

## 小结

### 再深一步

其实上面的问题说难不难，说简单也确实不简单。面试官需要的答案总是比你能回答的要再更深一步。不用太多，只一步。

只知道“旧页面传值给新页面”，不够！需要知道：如何处理“新页面回传给旧页面且考虑新页面崩溃情况”？

只知道“Object.defineproperty()”，不够！需要知道：如何监控 DOM 新属性的增加？

只知道“懒加载的滚动监听”，不够！需要知道：懒加载的其它实现方式呢？

只知道“PerformanceTiming API”，不够！需要知道：具体是如何做差，各监控指标的差异在哪，图片资源加载到底如何计时？

呜呼！这算“面试造火箭，工作拧螺丝” 吗？

未必！这些问题在实际工作中是极大可能遇到的，本瓜之前就用过监听本地缓存。PerformanceTiming 更是性能监控的良方，都是为了做出更好的 Web 服务，为什么拒绝呢？

### 产生疑问

也许我们习惯了业务编码，也许我们习惯了面向搜索引擎，也许我们习惯了CV，也许我们习惯了不去思考......但我们是程序员，不是程序机器。机器可以不用产生疑惑，人却需要不断产生疑惑！

### 求赞

朋友，都看到这里了，还不点个赞吗？

码文不易，拒绝白嫖。

同时也欢迎交流哈~

我是掘金安东尼，人不狠，话也多。期待与你同行！