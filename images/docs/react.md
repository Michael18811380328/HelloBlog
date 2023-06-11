## MVVM.jpg

React 架构，Model-ViewModel-View 三层架构。Model 是完全的数据层，View 是视图层，ViewModel 是视图和数据层沟通的中间层。中间层和数据层之间可以通过 API 或者 websocket 通信，中间层和视图层之间使用 React 单向数据流，然后事件监听和回调函数形式更改数据层。

![](https://michael18811380328.github.io/images/react/MVVM.jpg)

## Typescript.png

TS 目前使用就是函数的参数类型验证，高级用法泛型等不常用

![](https://michael18811380328.github.io/images/react/Typescript.png)

## react-redux.png

UI 组件不处理 store 部分的更新，容器组件和 redux 处理了mapStateToProps 把容器组件的 state 映射到 UI 组件的 Props 中。获取状态使用 getState，更新状态使用 dispatchAction 发出状态即可。

![](https://michael18811380328.github.io/images/react/react-redux.png)

## react-timeline.png

React 技术栈学习阶段, 这是 react 学习周期，从 ES5 到 webpack, ES6, react-router, redux 不同阶段

![](https://michael18811380328.github.io/images/react/react-timeline.png)

## react生命周期函数.jpg

这是旧版的生命周期函数（16版）图例。
 生命周期函数分成三个部分：组件第一次加载，组件更新，组件卸载阶段，这三个阶段分别对应哪几个生命周期函数。
 componentDidMount 用于获取网络请求，当 forceUpdate，props 更新，state 更新时，分别触发哪些生命周期函数。在 render 阶段中不能 setState 对应这两个函数中也不能执行 setState。

![](https://michael18811380328.github.io/images/react/react生命周期函数.jpg)

## react生命周期函数.png

React 新生命周期函数，从 react 16 到 react 18 版本，去掉了三个函数 componentWillMount componentWillUpdate componentWillReceiveProps，增加了两个函数 getDerivedStateFromProps, getSnapshotBeforeUpdate，新增这两个使用较少。这两个函数是静态函数 static 

![](https://michael18811380328.github.io/images/react/react生命周期函数.png)

## redux.png

传统React是直接更改 State，然后不同组件维护不同的 State，公共State维护在顶层组件中。redux 的原理是把公共 State 维护在 redux 中，然后每一个组件 getState 获取属性，然后 dispatch（action）发出事件，统一更新状态，更新后，全部组件重新渲染，实现了 State 单独维护的目的。

![](https://michael18811380328.github.io/images/react/redux.png)

## vue-react.png

![](https://michael18811380328.github.io/images/react/vue-react.png)

