# 谈谈Node中的常见概念

在学习Node的过程中，我们要了解一些基础概念。

- 什么是Node
- 解决了哪些问题
- Node的特点
- 进程和线程，同步与异步，阻塞和非阻塞，以及Node中核心的(Event Loop)事件环的概念。

## 1.Node是什么?

Node.js是一个基于 Chrome V8 引擎的JavaScript运行环境(runtime)，Node不是一门语言，是让js运行在后端的运行时，并且不包括javascript全集，因为在服务端中不包含`DOM`和`BOM`，Node也提供了一些新的模块例如http，fs模块等。

Node.js 使用了`事件驱动`、`非阻塞式 I/O` 的模型，使其轻量又高效并且Node.js 的包管理器 npm，是全球最大的开源库生态系统。事件驱动与非阻塞IO后面我们会一一介绍。

## 2.Node解决了哪些问题?

Node在处理高并发，I/O密集场景有明显的性能优势

- 高并发，是指在同一时间并发访问服务器
- I/O密集指的是文件操作、网络操作、数据库，相对的有CPU密集，CPU密集指的是逻辑处理运算、压缩、解压、加密、解密

> Web主要场景就是接收客户端的请求读取静态资源和渲染界面，所以Node非常适合Web应用的开发。

## 3.进程与线程

进程是操作系统分配资源和调度任务的基本单位，线程是建立在进程上的一次程序运行单位，一个进程上可以有多个线程。

### 3.1 谈谈浏览器

- 用户界面-包括地址栏、前进/后退按钮、书签菜单等
- 浏览器引擎-在用户界面和呈现引擎之间传送指令(浏览器的主进程)
- 渲染引擎，也被称为浏览器内核(浏览器渲染进程)
- 一个插件对应一个进程(第三方插件进程)
- GPU提高网页浏览的体验(GPU进程)

> 由此可见浏览器是多进程的，并且从我们的角度来看我们更加关心浏览器渲染引擎

### 3.2 渲染引擎

渲染引擎内部是多线程的，内部包含两个最为重要的线程ui线程和js线程。这里要特别注意ui线程和js线程是互斥的，因为JS运行结果会影响到ui线程的结果。ui更新会被保存在队列中等到js线程空闲时立即被执行。

### 3.3 其他线程

- 浏览器事件触发线程(用来控制事件循环，存放setTimeout、浏览器事件、ajax的回调函数)
- 定时触发器线程(setTimeout定时器所在线程)
- 异步HTTP请求线程(ajax请求线程)

### 3.4 js单线程

javascript在最初设计时设计成了单线程，为什么不是多线程呢？如果多个线程同时操作DOM那岂不会很混乱？这里所谓的单线程指的是主线程是单线程的，所以在Node中主线程依旧是单线程的。


> 单线程特点是节约了内存，并且不需要在切换执行上下文。而且单线程不需要管锁的问题，这里简单说下锁的概念。例如下课了大家都要去上厕所，厕所就一个，相当于所有人都要访问同一个资源。那么先进去的就要上锁。而对于node来说。下课了就一个人去厕所，所以免除了锁的问题！

## 4.队列和栈

- 队列

```js
setTimeout(function(){
    console.log(1)
})
setTimeout(function(){
    console.log(2)
})
setTimeout(function(){
    console.log(3)
})

```

> 当设置定时器时，会将定时器对应的回调函数依次的放到队列中，执行时按照放置的顺序依次执行。

- 栈

```js
function stack(){
    console.log(1);
    fn1();
    function fn1(){
        console.log(2);
        fn2();
        function fn2(){
            console.log(3)
        }
    }
}
stack();

```

> 我们可以看到js是在全局的上下文中执行的，调用栈入栈的顺序是stack->fn1->fn2，当作用域销毁时先需要先销毁fn2->fn1->stack

## 5.浏览器中的Event Loop

- 1.所有同步任务都在主线程上执行，形成一个执行栈
- 2.主线程之外，还存在一个任务队列。只要异步任务有了运行结果，就在任务队列之中放置一个事件。
- 3.一旦执行栈中的所有同步任务执行完毕，系统就会读取任务队列，将队列中的事件放到执行栈中依次执行
- 4.主线程从任务队列中读取事件，这个过程是循环不断的

> 整个的这种运行机制又称为Event Loop(事件循环)

## 6.Node中的Event Loop

我们先来张图看看node是如何工作的

![node system](https://user-gold-cdn.xitu.io/2018/2/22/161b97adaf3aecd6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



- 1.我们写的js代码会交给v8引擎进行处理
- 2.代码中可能会调用nodeApi，node会交给libuv库处理
- 3.libuv通过阻塞i/o和多线程实现了异步io
- 4.通过事件驱动的方式，将结果放到事件队列中，最终交给我们的应用。

> 在libuv内部有这样一个事件环机制。在node启动时会初始化事件环

```
   ┌───────────────────────┐
┌─>│     timers(计时器)     │
|  |   执行setTimeout以及   |
|  |   setInterval的回调。  |
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     |
│  | 处理网络、流、tcp的错误 |
|  | callback              |
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle， prepare     │
|  |     node内部使用       |
│  └──────────┬────────────┘      
│  ┌──────────┴────────────┐       ┌───────────────┐ 
│  │       poll(轮询)      │       │   incoming:   │
|  | 执行poll中的i/o队列    | <─────┤  connections， │
|  | 检查定时器是否到时      |       │   data， etc.  |     
│  └──────────┬────────────┘       └───────────────┘    
│  ┌──────────┴────────────┐      
│  │      check(检查)      │
|  | 存放setImmediate回调   |
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    |
   │ 关闭的回调例如         |
   | sockect.on('close')   |
   └───────────────────────┘

```

> 这里每一个阶段都对应一个事件队列，当event loop执行到某个阶段时会将当前阶段对应的队列依次执行。当队列执行完毕或者执行的数量超过上线时，会转入下一个阶段。这里我们重点关注poll阶段

### 6.1 poll阶段

### 6.2 setTimeout 和 setImmediate

二者非常相似，但是二者区别取决于他们什么时候被调用.

- setImmediate 设计在poll阶段完成时执行，即check阶段；
- setTimeout 设计在poll阶段为空闲时，且设定时间到达后执行；但其在timer阶段执行 其二者的调用顺序取决于当前event loop的上下文，如果他们在异步i/o callback之外调用（在i/o内调用因为下一阶段为check阶段），其执行先后顺序是不确定的，需要看loop的执行前的耗时情况。

```js
setTimeout(function timeout () {
  console.log('timeout');
}，0);

setImmediate(function immediate () {
  console.log('immediate');
});

```

### 6.3 process.nextTick

nextTick并不属于事件循环的某个阶段，他的执行方式是在各个阶段切换的中间执行，来段恶心的代码

```js
setImmediate(function(){
    console.log(1);
    process.nextTick(function(){
        console.log(2);
    });
});
process.nextTick(function(){
    console.log(3);
    setImmediate(function(){
        console.log(4);
    })
});
// 3 1 4 2

```

> 这里就不解释了，如果你懂了，说明就明白nextTick的执行时机了！(nextTick不要递归调用，否则后面阶段的callback将无法执行)

## 7.宏任务和微任务

任务可分为宏任务和微任务

- macro-task(宏任务): setTimeout， setInterval， setImmediate， I/O
- micro-task(微任务): process.nextTick， 原生Promise(有些实现的promise将then方法放到了宏任务中)，Object.observe， MutationObserver

```js
process.nextTick > promise.then > setTimeout > setImmediate

```

> 通过上面的学习我们知道了任务的执行顺序，要注意的是Promise.then方法被定义在了nextTick之后执行

## 8 同步异步和阻塞非阻塞

同步异步取决于被调用者，阻塞非阻塞取决于调用者

- 阻塞调用是指调用结果返回之前，当前线程会被挂起。调用线程只有在得到结果之后才会返回。
- 非阻塞调用指在不能立刻得到结果之前，该调用不会阻塞当前线程。
