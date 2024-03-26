# React 常用术语含义

在 React 中文平台上看到这些术语表，结合自身的理解，简单描述一下含义。

注：当前 react 版本是 18.2 版本

| 术语                    | 译文            |
| ----------------------- | --------------- |
| Declarative             | 声明式          |
| Component               | 组件            |
| Stateful Component      | 有状态组件      |
| controlled components   | 受控组件        |
| uncontrolled components | 非受控组件      |
| render                  | 渲染            |
| Application             | 应用            |
| External Plugins        | 外部插件        |
| Third Plugins           | 第三方插件      |
| syntax                  | 语法            |
| Embedding Expressions   | 嵌入表达式: JSX 中把 html 嵌入 jsx 中的写法     |
| Attributes              | 属性            |
| Elements                | 元素            |
| Functional Components   | 函数式组件      |
| function component      | 函数组件        |
| Class Components        | class 组件      |
| Composition             | 组合            |
| Inheritance             | 继承            |
| Lifecycle               | 生命周期        |
| Handling Events         | 事件处理        |
| Conditional Rendering   | 条件渲染        |
| Operator                | 运算符          |
| reuse                   | 复用            |
| mock                    | 设计稿；设计手稿（测试模拟数据，mock data）        |
| callback                | 回调函数        |
| shallow rendering       | 浅层渲染        |
| deprecated              | 废弃            |
| Legacy                  | 过时            |
| Cross-Cutting Concerns  | 横切关注点      |
| HOC                     | 高阶函数（HOC） |
| higher-order-component  | 高阶函数        |
| Reconciliation          | 协调            |
| local state             | 内部 state      |
| asserts                 | 断言            |
| reusable                | 可复用          |
| Vendor Prefix           | 浏览器引擎      |
| fallback                | 降级            |
| derived state           | 派生状态        |
| breaking change         | 破坏性更改      |
| function signature      | 函数签名        |
| escape hatches          | 应急方案        |





## 常见术语

### Props

Properties 父组件给子组件通信，传递的参数或者属性

### state

当前组件维护在自身内部的状态，状态驱动

### ref

Refrence 通过 ref 可以获取真实 DOM 节点。创建三种 REF 的方法（字符串形式，回调函数形式，React.createRef）。

### context

:warning: 上下文，参考：https://react.docschina.org/docs/context.html 如果有些 props 需要传递很多层，可以通过 context 跨越层级传递（类似 Provider Cumtomer 概念）

### portal

:warning: 入口，参考：https://zh-hans.reactjs.org/docs/portals.html#gatsby-focus-wrapper 通常组件挂载到最近的父组件上，这个 portal 可以把组件挂载到任意的组件上。对于组件多层级很使用（例如下拉框需要弹出到对话框外部，那么尝试把下拉框挂载到另一个根组件上）可以把对话框单独挂载到对话框层级（modal-portal 中）

### fragments

文档碎片，用于包裹多个 JSX 片段。render 函数只允许有一个根标签

### bundle

包；捆，表示 webpack 打包工具把代码打包成若干包


## 其他术语

### Tick

做标记，打对勾（文档中：这里标记一下，类似 Note）

| 术语             | 含义                                                         |
| ---------------- | ------------------------------------------------------------ |
| package          | 包，这个重点只第三方依赖的包（package.json）                 |
| Create React App | 创建 react 的 CLI（内置了 webpack 和 babel 打包开发工具），简称 cra |
| Consumer         | 消费者，用于 redux 中消费 state 的组件                                                             |
| Provider         | 提供者，用于 redux 中提供 state 的组件                                                            |
| PropTypes        | Props 类型验证                                               |
| Hook             | 钩子（类组件 state 和生命周期函数的简化语法）用于函数式组件 useEffect 简化类组件                                          |
| Promise          | 承诺，处理异步数据，可以传参 resolve reject 表示接受或者拒绝异步数据，async await 是语法糖                                           |
| polyfill         | 垫片，主要处理兼容性问题，babel-preset-env 等处理不同版本的浏览器，兼容早期数据等                                                |
| Mixins           | 混入，在装饰器中使用，把一个类中的方法混入另一个类，react 官方不推荐，redux 中通过 connect 把一个组件混入另一个组件                      |
| Web Components   | 实现组件复用的另一个方式（类似React框架）谷歌出品的一个工具，基于类的继承和创建，详见参考，也可以和 react 结合使用                    |
| wrapper          | wrapper 包裹层，可以挂载某一个 raect 组件的根节点                                                             |
| Fiber            | React 核心算法      |
| Mutation         | 改变，突变。在 DIFF 算法中，两个 Tree key 不一致时产生的 mutation 改变，然后需要卸载旧组件，然后重新新建新组件。 |


### Fiber 算法介绍

这个介绍了 fiber 算法和 reconciliation 算法，写的不错，自己稍后看一下
https://github.com/acdlite/react-fiber-architecture

- reconciliation：The algorithm React uses to diff one tree with another to determine which parts need to be changed. React 使用的算法将一棵树与另一棵树进行比较，以确定需要更改哪些部分。
- Reconciliation is the algorithm behind what is popularly understood as the "virtual DOM." A high-level description goes something like this: when you render a React application, a tree of nodes that describes the app is generated and saved in memory. This tree is then flushed to the rendering environment — for example, in the case of a browser application, it's translated to a set of DOM operations. When the app is updated (usually via setState), a new tree is generated. The new tree is diffed with the previous tree to compute which operations are needed to update the rendered app.
- Reconciliation 是被普遍理解为“虚拟 DOM”的算法。一个高级描述是这样的：当你渲染一个 React 应用程序时，一个描述应用程序的节点树被生成并保存在内存中。然后将该树刷新到渲染环境——例如，在浏览器应用程序的情况下，它被转换为一组 DOM 操作。当应用程序更新时（通常通过 setState），会生成一个新树。新树与之前的树进行比较，以计算更新渲染应用程序所需的操作。

传统的 reconciliation 算法是 diff tree，react fiber 架构把 tree-diff 改成了 link-node diff——这个在 react 16 中核心优化。


### 参考链接

术语表：https://github.com/reactjs/zh-hans.reactjs.org/issues/2

阮一峰 ES6 装饰器（mixin）:https://es6.ruanyifeng.com/#docs/decorator

Web Component 官方介绍：https://developer.mozilla.org/zh-CN/docs/Web/Web_Components

Web Component 其他博客：https://zhuanlan.zhihu.com/p/268732230

