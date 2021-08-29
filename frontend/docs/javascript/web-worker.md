# Web Worker 简介

## 为什么使用？

JS 是单线程，现在计算机很多都是多核CPU，不能很好利用多核的性能。所以 web worker 就是在主线程外，再增加一个线程，进行高性能计算和高延迟任务。

## 特点

主线程和 worker 线程不会干扰。两个线程需要通信形式传值。

worker 线程不会被主线程的 dom 事件干扰；worker 线程不能获取主线程的 DOM；无法读取本地的文件

主线程代码

~~~js
// 创建工作线程
var worker = new Worker('test.js');

// 主线程向 worder 发送消息
worker.postMessage('comment');
worker.postMessage({method: 'add', id: '888'});

// 主线程事件监听
workder.onmessage = (e) => {
  console.log(e.data);
  worker.postMessage('receive data success');
}

workder.onerror = (error) => {
  console.log(error.message);
}
~~~

worker 线程代码（使用 self）

~~~js
// 子线程的全局对象（self）
self.addEventListener('message', (e) => {
  console.log(e);
  let data = e.data;
  let type = data.type;
  // 根据不同的事件类型，执行不同的函数
  switch(type):
    case 'add':
    	self.postMessage('WORKER STARTED: ' + data.msg);
      break;
    case 'stop':
      self.postMessage('WORKER STOPPED: ' + data.msg);
      self.close(); // Terminates the worker.
      break;
    default:
      self.postMessage('Unknown command: ' + data.msg);
});
~~~

worker 内部加载脚本

~~~js
importScripts('test1.js', 'test2.js')
~~~

关闭 worker线程

~~~js
worker.terminate();

self.close();
~~~

## API

主线程

- Worker.onerror：指定 error 事件的监听函数。
- Worker.onmessage：指定 message 事件的监听函数，发送过来的数据在`Event.data`属性中。
- Worker.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
- Worker.postMessage()：向 Worker 线程发送消息。
- Worker.terminate()：立即终止 Worker 线程。

worker 线程

- self.name： Worker 的名字。该属性只读，由构造函数指定。
- self.onmessage：指定`message`事件的监听函数。
- self.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
- self.postMessage()：向产生这个 Worker 线程发送消息。
- self.close()：关闭 Worker 线程。
- self.importScripts()：加载 JS 脚本。




## 注意事项

- Worker 传值都是拷贝一份，不是传递指针，所以拷贝大文件需要注意性能
- 可以传递普通变量，也可以传递大文件 arrayBuffer blob



## 参考资料

https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API （MDN）

https://www.ruanyifeng.com/blog/2018/07/web-worker.html （主要参考）

https://wangdoc.com/javascript/bom/webworker.html （和第二个一样）

https://juejin.cn/post/6844903496550989837 （仅供参考）

