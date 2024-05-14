# redux笔记 

 原始表格链接：https://cloud.seatable.cn/dtable/external-links/8fef1366ff844618a82f/

 
## 0024 Redux 的设计思路


Redux 是用来处理状态管理的一个工具库

把对应的 actions 进行 dispatch

然后所有的状态都存放在 store 中

对全局进行一个统一的状态管理

参考链接：<https://www.zhihu.com/question/41312576> 



   
## 0037 Redux 的 reduce 函数为什么不能做异步操作


Redux 的设计理念：reducer函数是一个纯函数

redux 有三个主要的理念

1 state完全存储状态

2 不能直接更改，是state需要通过action来更改state

3 需要通过reduce函数纯函数来更改stake

正是这个设计的理念就决定了reducer 函数必须是一个纯函数，而不能返回一个 promise 或者 settimeout 等不确定的内容

`Next state = reducer(current state, action)`



   
## 0161 redux的具体操作


actions

reducer

store

update whole app





   
## 0163 React redux 的具体操作


mapStateToProps 把父组件的 state 作为 props 传递给子组件

<https://zhuanlan.zhihu.com/p/26648239> 





   
## 0362 Redux 中的 reducer 是什么


`reducer`是一个纯函数，以 `state` 和 `action` 为参数。

在`reducer`中，我们会跟踪接收到的操作类型，并根据它修改状态，返回一个新的状态对象。

```javascript
export default function appReducer(state = initialState, action) {

  // The reducer normally looks at the action type field to decide what happens
  
  switch (action.type) {
    // Do something here based on the different types of actions
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}

```



   
## 0363 Redux 实现了哪种模式


Redux 实现了[Flux 模式](https://www.zhihu.com/search?q=Flux%20%E6%A8%A1%E5%BC%8F&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3248392880%7D)，它是应用程序的可预测状态管理模式。

它通过引入**单向数据流**，和**状态的集中存储**，来帮助管理应用程序的状态。[了解更多](https://link.zhihu.com/?target=https%3A//www.newline.co/fullstack-react/30-days-of-react/day-18/%23%3A~%3Atext%3DFlux%2520is%2520a%2520pattern%2520for%2Cdefault%2520method%2520for%2520handling%2520data.)



   
## 0366 Redux和Mobx有什么区别


* Redux 是一种更简单、更有主见的状态管理库，它遵循严格的单向数据流，并提倡不变性。它需要更多的模板代码和显式更新，但与 React 的集成度很高。

* Mobx 提供的 API 更灵活、更直观，模板代码更少。它允许你直接修改状态，并自动跟踪变化以获得更好的性能。

在 Redux 和 Mobx 之间做出选择取决于具体需求和偏好

  