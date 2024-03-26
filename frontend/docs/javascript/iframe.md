# 父子 iframe 传值

2021-11-03

最近项目中有个页面中使用到 iframe，涉及到不同 iframe 的传值等操作，踩坑不少，简单记录一下。

外部的页面称为父页面，内部嵌入的 iframe 称为子页面。一个父页面中可以嵌入多个子页面。不同子页面之间称为兄弟页面。

任务需要：父获取子的属性、子获取父的属性。



## 父获取子的属性

首先界面中的 iframe 需要设置不同的 ID，这样父组件中，可以通过 document.getElementById 等获取对应的 iframe。


~~~html
<iframe id="test1" title="detail1" src='http://www.baidu.com'></iframe>
<iframe id="test2" title="detail2" src='http://www.xxx.com'></iframe>
~~~



## 子获取父的属性

子 iframe 中获取父元素的变量，使用 window.parent 可以获取父页面的 DOM 节点，然后获取对应的属性。

例如，这里获取父窗体的属性是否是移动端

~~~js
const parentWin = window.parent;
return parentWin.window.isMobile
~~~

或者获取父页面中其他的DOM节点

~~~js
const parentWin = window.parent;
parentWin.getElementsByTagName("div")[0]
~~~



## 子获取当前 iframe 的属性

需求：界面中有 N 个 iframe，某个 iframe 需要获取自己是第几个 iframe，然后改变内部的属性。

那么我们可以使用 iframe.contentWindow == window 来判断。

首先获取父页面，然后找到全部的 iframe 并循环，如果某个 iframe.contentWindow == window ,那么就可以获取对应的标识。

~~~js
var a = parent.document.getElementsByTagName("IFRAME");
for(var i = 0; i < a.length; i++) {
  if(a[i].contentWindow == window){
 		// a[i]是当前的页面
    // 那么可以获取对应的属性
	}
}
~~~

具体我们可以操作：界面中两个 iframe 如下

~~~html
<iframe id="test1" title="detail1" src='http://www.baidu.com'></iframe>
<iframe id="test2" title="detail2" src='http://www.xxx.com'></iframe>
~~~

我们就可以根据下面的语句判断当前的 iframe 是哪一个（如果是 test1，那么显示XXX，如果是 test2，那么显示XXX）

~~~js
(typeof (window) !== 'undefined' && (window.parent.document.getElementById('test1').contentWindow == window)) 
~~~

## 父子之间通信

一个 window postMessage，另一个监听 message 事件，这样就可以通信
~~~js
window.postMessage(message, targetOrigin, [transfer]);
// window 是发送消息的iframe
// message 是发送的消息（可以是字符串）
// targetOrgin 是目标的 iframe，或者是通配符 *
// transfer 可选，是一串和 message 同时传递的 Transferable 对象。

~~~

例子：一个窗口（https://www.baidu.com）发出事件

~~~js
window.postMessage('hello', 'www.sina.com');
~~~

另一个窗口（www.sina.com）监听事件

~~~js
window.addEventListener('message', function (e) {
  if (e.origin !== "https://www.baidu.com") {
    return;
  }
  console.log(e.data);
});
~~~

具体参考：https://www.runoob.com/js/met-win-postmessage.html

## 注意

1、iframe 在加载状态发生变化时会发生 onreadystatechange 事件，可以通过这个事件改变界面的其他属性。

2、外部的样式和内部的样式完全不起作用，如果更改样式，需要改变单页面的样式，不能通过父子页面的样式继承。
