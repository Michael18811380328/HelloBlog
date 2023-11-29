# React 17 事件处理新特性

React 16 升级到 React 17 后，事件处理发生变化，详情如下：

### 1、React 17 中绑定的位置变化

React 16：React 事件绑定的位置是真实的 document 节点，如果页面中存在多个 React 应用，那么所有事件都会发到文档的 document 节点，这样不同的 React 应用可能干扰。

React 17: 事件绑定都在当前 React 树的根节点（虚拟节点）。这样不同的 react 应用事件不会干扰。

### 2、事件处理过程

在React16中：对document的事件委托都委托在冒泡阶段，当事件冒泡到document之后触发绑定的回调函数，在回调函数中重新模拟一次 **捕获-冒泡** 的行为，所以React事件中的`e.stopPropagation()`无法阻止原生事件的捕获和冒泡，因为原生事件的捕获和冒泡已经执行完了。

在React17中：对React应用根DOM容器的事件委托分别在捕获阶段和冒泡阶段。即：

- 当根容器接收到捕获事件时，先触发一次React事件的捕获阶段，然后再执行原生事件的捕获传播。**所以React事件的捕获阶段调用`e.stopPropagation()`能阻止原生事件的传播。**

- 当根容器接受到冒泡事件时，会触发一次React事件的冒泡阶段，此时原生事件的冒泡传播已经传播到根了，**所以React事件的冒泡阶段调用`e.stopPropagation()`不能阻止原生事件向根容器的传播，但是能阻止根容器到页面顶层 document 的传播。**

### 3、去掉事件池

React 16: 在 setTimeout 中是异步操作，可以使用 e.persist() 保持原有时间，然后在异步操作中获取事件的属性

React 17：去掉了事件池，直接可以调用

### 4、scroll 事件不再冒泡

React 16: scroll 事件冒泡到上层节点，可能影响其他 React 应用。

React 17 去掉这部分的事件冒泡。

## 参考链接

https://zhuanlan.zhihu.com/p/380941094

https://juejin.cn/post/7164583106920316941

https://zh-hans.legacy.reactjs.org/blog/2020/08/10/react-v17-rc.html#no-event-pooling

https://zh-hans.legacy.reactjs.org/docs/legacy-event-pooling.html