# React笔记 

 原始表格链接：https://cloud.seatable.cn/dtable/external-links/59b453a8639945478de2/

 
## 0001 Vue和react当中的key是什么意思？有什么作用？


便于在虚拟DOM中进行 diff 的前后比较，如果 Key 相同的话，这两个节点就可以不用更换，直接复用原来的节点，所以Key 需要用某一个固定的值，例如 ID 或者 column key 这样来表示，不能用 index 来表示。
这样进行列表渲染可以优化性能



   
## 0018 React 中 setState 什么时候是同步的，什么时候是异步的


默认是异步执行的，先向下执行代码，然后统一合并 newState 并执行

如果已经在异步代码中了，例如 setTimeout 那么执行就是同步的



   
## 0032 虚拟dom和真实dom的性能对比


从原理上讲，虚拟dom最后也是调用的浏览器的API，对浏览器节点的进行操作。

单独操作一个节点的性能：虚拟DOM性能不如直接操作真实 DOM。

在实际的框架当中，很多框架都采用了虚拟dom的技术来实现，dom的操作，这样就使得开发者，可以不用直接接触浏览器的dom的操作，大大减少了工作量，如果业务量很多的话，使用虚拟dom进行操作是完全可以实现的。（类似于汇编语言和高级语言的差距，汇编确实快，但是工作量很大）

虚拟dom的关键技术是用了diff算法，针对两个前后的dom tree 进行对比，这个在现代浏览器当中，消耗的时间是比较小的是可以接受的。

性能的比较, 需要分场合,看具体的数据量和整体的时间，很难同时满足时间复杂度和空间复杂度。



   
## 0040 在 react 中为什么 prop 是只读的


1、react 的设计理念是单向数据流，就是从父组件传递 props 给子组件，所以说 this.props 不可更改

2、如果子组件想要更改父组件传递的 prop，是通过回调函数来更改父组件的 state，然后父组件重新渲染，传递给子组件的 props 就会变化，实现子组件和父组件的通信



   
## 0066 es6代码转换成es5代码的实现思路是什么


通过 babel 转换

es6 string -> es6 AST babel -> es5 AST -> es5 string 执行



   
## 0078 React 父子组件的生命周期函数执行顺序


父子组件执行生命周期函数的过程，就是 DOM 节点树从上到下执行渲染的过程。

先外到内（开始渲染），再内到外（渲染结束）。

更新阶段也是类似的。找到需要更新的某个父节点，然后从上到下执行更新。

这个和事件冒泡和事件捕获需要区分。



   
## 0088 react-router 中 link 标签和 a 标签的区别是什么


<https://blog.csdn.net/zhangwenok/article/details/127207814> 

最后渲染的DOM节点都是 a 标签

Link 和 Router 经常组合使用，点击 Link 不会发生全部页面跳转，只进行页面部分跳转和刷新，优化了性能（diff 算法判断渲染的部分），页面部分刷新，用户视觉效果良好

a 标签就是普通的跳转，整个页面需要刷新，用户视觉效果不好



   
## 0097 React-VUE 的 diff 算法，从 n^3 优化到 n，具体原理是什么


1、Diff 算法介绍

<https://juejin.cn/post/7020595059095666724#heading-5> 

三种不同类型的节点对比：

1.1 树：只比较同一层节点是否相同。如果相同直接复用，如果不同，直接去掉这个节点，使用新的节点

1.2 组件：比较组件的类型：如果内容一样，但是类型不一样，也是直接去组件，渲染新的组件

1.3 元素：类似很多叶子节点列表。这一层级实现插入、移动、删除，使用 DFS 比较

2、DIFF 算法 O(N ^ 3) ：如果新建一个 DOM 树，理论上复杂度是N，但是创建 DOM 的性能开支很大，所以要复用节点，避免全部创建树。复用节点，需要对比前后两个 Fiber 树结构，实际上就是N个节点的增加，删除，改变。类似 leetcode 两个字符串转换，使用动态规划算法+记忆化检索，时间复杂度是 N^2，树结构是 N^3。详情参考下面的博客

<https://juejin.cn/post/6892671384976097287> 

<https://juejin.cn/post/6844903901443915784> 

经典 diff 算法：<https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf> 

React 的算法改成了O(N) ：假设全部的元素节点的 key 是唯一的（用户设置渲染列表的 key 是唯一的），那么比较前后树的差异，就不需要比较整个树，就直接用过 key 进行匹配。如果一致就复用原来的Key，如果不一致，那么创建新的节点，这样优化了时间复杂度。



   
## 0102 react 的生命周期函数新加了哪些方法？


getDerivedStateFromProps 替代 componentWillReceiveProps 和 componentWillMount

getSnapshotBeforeUpdate 替代 componentWillUpdate

因为原来有副作用，最好的解决方法是状态维护在合适的位置



   
## 0131 React 代码分割和懒加载


使用 import 进行模块化，webpack 可以进行代码打包和摇树

使用 Suspense lazy section 进行代码分割

React.lazy 可以处理动态引入，会在代码首次渲染时，自动导入包含子组件的包；在加载时，Suspense组件可以显示loading做到优雅降级。

问题：生产中没有使用过，导入的组件 Component 是 Promise 需要 resolve 一个 \`default\` export 的 React 组件（这里怎么处理，实际中需要试验使用）。

```javascript
let A = React.lazy(() => import('./Component'));

function B() {
  return (
    <Suspense callback={<div>Loading...</div>}>
      <A/>
    </Suspense>
  );
}

```



   
## 0133 React.createRef() 是什么


#### 类组件

class myComponent extends React.Component

为原生DOM添加Ref

```javascript
<input ref={this.inputRef} />

this.inputRef = React.createRef();

this.inputRef.current

// 获取对应的DOM结构

```

最新的ref可以这样使用。首先在DOM节点上绑定处理函数，然后在构造器内部创建REf，使用的时候获取熟悉的current就是对应的DOM元素。React内部，已经处理了不同生命周期函数ref的加载和优化：初始化阶段创建 current，组件卸载前将Ref变成Null，DidMount 和 DidUpdate 阶段更新对应的 ref。

#### 函数组件

添加 Ref：不能直接添加，需要使用 forwardRef，或者将函数组件转成类组件

```javascript
function CustomTextInput(props) { return <div></div> }

```

子组件通过回调函数形式把自身的Ref传给父组件

```html
// children
<input ref={this.props.innerInputRef} />

// father
<Son innerInputRef={ele => this.sonInputRef = ele } />

```

不推荐使用字符串形式声明 ref

```
<input ref="inputRef"/>

this.refs.inoutRef.focus();

```



   
## 0134 componentWillReceiveProps 废弃和解决


在 React 16 版本后，componentWillReceiveProps 不安全将要废弃，所以使用 getDerivedStateFromProps 从 Props获取派生的State。getDerivedStateFromProps (derived 派生的)。

原来的生命周期函数中，对比了这次的Props和上次的Props，如果不同，那么重新处理数据或者渲染界面

现在的逻辑：需要将上一次的 Props 保存在 state 中，当新的 props 传来时，对比新的 Props 和旧的state，并进行数据处理。

注意几点不同：

* getDerivedStateFromProps 是静态方法，所以内部无法获取到 this，无法使用 this.setState 改变状态，可以直接返回一个对象
* 这个生命周期函数不满足条件时，必须返回 null
* 生命周期函数不能直接调用类中的方法。如果必须使用，可以使用全局的方法。

```javascript
// 旧语法，不推荐
componentWillReceiveProps(nextProps) {
  if (nextProps.id !== this.props.id) {
    // do something, setState
    let res = this.fn();
    this.setState({
      id: nextProps.id,
    });
  }
}

// 推荐
// 构造器中加入 prevPropsList 这个状态，然后初始值 prevPropsList: this.props.list
static getDerivedStateFromProps(nextProps, prevState) {
  // Note we need to store prevPropsList and prevFilterText to detect changes.
  if (nextProps.list !== prevState.prevPropsList) {
    let res = fn();
    return {
      prevPropsList: nextProps.list,
    };
  }
  // 这个生命周期函数不满足条件时，必须返回 null
  return null;
}

```

raect报错解决，componentWillReceivePorps 将要废弃，那么使用 getDerivedStateFromPorps 获取props的更新，然后重新设置state，然后再ComponentDidUpdate 阶段处理新数据。



   
## 0285 React hook 函数嵌套问题


实际问题：useMemo 内部动态计算 dom 树，使用 useRef 获取 dom 节点，但是函数不支持嵌套

不允许嵌套原因：hook 函数设计之初就是纯函数，状态机，一个参数返回一个结果，如果两个 hook 函数嵌套，就不是纯函数概念，可能互相影响等。

```
// ❌ React Hook "useState" is called conditionally. 
// React Hooks must be called in the exact same order in every component render.

```

解决办法：因为函数式组件不适合处理复杂的 DOM 计算，那么既然现在需求变了，然后改成 Class，使用 createRef 获取 dom 节点并进行计算。



   
## 0162 原生事件合成事件


原生事件指的是js中原始的事件。合成事件是指react中的时间。
<https://xiaozhuanlan.com/topic/5924103867> 
阻止事件冒泡的三个方法
Stop immediate preparation是什么意思。表示阻止当前事件的冒泡，以及这个dom身上的其他的所有事件的冒泡



   
## 0151 ref 的三种创建方式，怎么使用


Rem的三种创建方式

* 类组件中可以直接创建
* 函数组件中怎么创建，使用 forwardRef 创建
* 在高阶组件中可以使用 forward 方法创建
* 在 hook 中可以使用 useRef 来创建

转发 ref

高阶函数中的ref

hooks中的软ref



   
## 0152 生命周期函数的每一个阶段，新增的和删除的生命周期函数


组建挂载阶段，组建更新阶段，组建卸载阶段

废弃的三个函数和新增的两个函数

hooks 时代，上面的内容过时了，使用 useEffect 可以实现类似的功能



   
## 0153 组件什么时候更新？


避免频繁使用 forceupdate，会渲染组件
props state 更新时渲染组件
如何避免没有用处的渲染？ PureComponent shouldComponentUpdate React.memo



   
## 0154 setState有几个参数？同步还是异步？


setState 有两个参数，分别是同步的还是异步的，具体怎么执行

第一个参数是对象，新更新的状态

第二个是回调函数，是异步执行的（组件状态更新后，再执行这个函数）



   
## 0155 react组件传值有几种方法


这里使用原生实现，不考虑状态管理库

第1种从上到下使用props和state是

第2种使用refs或者回调函数，从下向上

第3种在react router当中使用location或者context

   
## 0156 函数式组件和类组件的区别怎么选择


函数式组件和类组件的主要区别

类组件比较复杂，有着status和生命周期函数，不能使用hooks适合一个比较复杂的组件或者顶层组件，这个各种生命周期函数使用较多的情况

函数式组件比较简单，没有生命周期函数，使用hooks来模拟生命周期函数，适合状态比较简单的若干个情况

整体的性能没有太大差距



   
## 0157 useState 和 useEffect 具体使用


useState 状态管理 = setState

useEffect 对应三个生命周期函数: componentDidMount componentWillUnmount componentDidUpdate



   
## 0158 React 项目性能优化


第一网络请求优化（包括图片懒加载）


第二原生js的优化，包括算法，缓存，从时间和空间分析


第三，react 组件 方面的优化 减少不必要的渲染，有三种方法。 Should component update pure component reactmemo


第4种对于移动端分片渲染或者列表渲染



   
## 0159 react and react-dom 的具体区别


React 是框架的主要功能，只要用到 jsx 或者 Component 等属性，就需要引入

react-dom 是操作 dom 的工具，例如想把某个react组件挂载到根节点上，或者找到某个节点，可以使用这个库

官方：<https://react.docschina.org/reference/react-dom> 

当前项目中，主要的内置方法如下

```javascript
import ReactDOM from 'react-dom';

// 把组件挂载到某个 DOM 节点内部
ReactDOM.render(<App/>, document.getElementById('wrapper'));

// 把组件从某个节点上卸载
ReactDOM.unmountComponentAtNode(widgetWrapper);

// 可以在渲染元素时将元素渲染到网页中的指定位置(例如 APP 渲染到根节点，对话框渲染到遮罩节点)
ReactDOM.createPortal(this.props.children, this.el);
    
// 可以获取 类式组件 实例对应的浏览器 DOM 节点(此 API 将在未来的 React 主要版本中被移除)
// https://react.docschina.org/reference/react-dom/findDOMNode#alternatives
ReactDOM.findDOMNode(this.headerCell);

```



   
## 0160 组件如何复用


可以实现组件的嵌套和高阶组件

高阶组件需要使用 forwardRef 实现，或者再获取自组件



   
## 0164 React hooks 的具体使用


useState

useEffect

useRefs

这个范围比较广，这里要求明白常用的主要作用，具体细节可以单独搞



   
## 0165 UseMemo 和 useCallback 区别


主要用于避免组件或者函数重复渲染

作为性能优化的一种手段，三者需要组合并结合场景使用。

### React.memo()

如果组件在相同 props 的情况下，渲染相同的结果，那么你可以通过将其包装在`React.memo`中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。[React memo官方文档](https://link.zhihu.com/?target=https%3A//zh-hans.reactjs.org/docs/react-api.html%23reactmemo)

与Class Component中的PureComponent类似，在React Hooks中，可以通过memo来避免组件的重复渲染。

参考：<https://zhuanlan.zhihu.com/p/545578633> 

### useMemo

> 把“创建”函数和依赖项数组作为参数传入`useMemo`，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。[React useMemo文档](https://link.zhihu.com/?target=https%3A//zh-hans.reactjs.org/docs/hooks-reference.html%23usememo)

useMemo的用法和useEffect的用法类似，它需要接收两个参数。

1. 第一个参数要求为一个function，function需要return一个变量
2. 第二个参数为一个数组，和useEffect类似，作为第一个参数的依赖项数组

它的功能可以理解为：

在检测到依赖项数组中的变量发生变化时，重新执行传入的function，并返回传入function执行后的结果。

```javascript
import { useMemo, useState } from "react";

function Demo() {
  const [name, setName] = useState('Michael');

  // useMemo 用来缓存：第一个参数是函数，第二个参数是变量数组
  // 当第二个参数不变时，不重新计算函数（返回上一次的缓存结果）
  const description = useMemo(() => {
    return (
      <span>{`my name is ${name}, age is${Math.random()}`}</span>
    );
  }, [name]);

  return (
    <div>
      <button onClick={() => setName('Mike')}></button>
      <span>{name}</span>
      <span>{description}</span>
    </div>
  );
}

export default Demo;

```

### useCallBack

useCallBack：useMemo的语法糖

> 把内联回调函数及依赖项数组作为参数传入`useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如`shouldComponentUpdate`）的子组件时，它将非常有用。[React useCallBack官方文档](https://link.zhihu.com/?target=https%3A//zh-hans.reactjs.org/docs/hooks-reference.html%23usecallback)

useCallBack和useMemo唯一的区别是：useMemo返回的是传入的回调函数的执行结果（dom或者返回值），

useCallBack返回的是传入的回调函数。

本质上就是useMemo的语法糖。

```javascript
import { useContext, memo } from "react";

function Parent() {

  const [age, setAge] = useState(10);

  // 我们只需要使用useCallBack保护一下父组件中传入子组件的那个函数（toChildFun函数）保证它不会在没有必要的情况下返回一个新的内存地址就好了。
  // 返回一个函数
  const toChildFun = useContext(() => {
    // 需要传入子组价的函数
  }, []);

  return (
    <div>
      <button onClick={() => useState(age => age + 1)}></button>
      {/* 这样父组件传参的函数就不会更新 */}
      <Child fun={toChildFun}></Child>
    </div>
  );
}

const Child = memo((fun) => {
  return <div onClick={fun}></div>
});

```

### 总结

1. memo与class组件中的pureComponent类似，通过props浅比较来判断组件需不需要重新渲染
2. useMemo、useCallBack通过浅比较依赖数组项中的变量，判断对应变量/function需不需要重新生成
3. useMemo、useCallBack不要滥用，需要结合具体场景

React.memo 避免不同组件更新后，避免频繁更新，用于组件中的渲染（类似 shouldComponentUpdate）

React.useCallback 用于组件内部 state update 后，避免内部函数重新计算

### 参考链接

<https://juejin.cn/post/7107943235099557896> 

<https://zhuanlan.zhihu.com/p/545578633> 

<https://blog.csdn.net/weixin_45269534/article/details/131416114> 



   
## 0202 高阶组件传参和渲染


如果存在高阶组件或者多层组件，如果父组件 props 发生变化，那么造成子组件的 卸载-再次加载，原始的状态就不能保存（例如 react-dnd 库）

解决思路是：把需要变化的状态，保存到父组件的属性 this.height，不是 state，子组件加载，通过回调函数获取父组件的属性 this.height，这样就能避免全部子组件重新渲染。

​

原文如下：

问题描述：整体容器是可拖拽容器，每一个子元素打开菜单后，其他的不能打开菜单。

如果直接父组件设置 state，那么由于高阶组件的关系，每一个子组件都会重新渲染，已经打开菜单的就会关闭，不行。

所以，在父组件中设置属性；当一个子组件打开下拉菜单后，父组件设置false。其他菜单打开前，需要判断父组件的属性是否满足，这样不会造成子组件的频繁渲染，性能也较好。

总结：react-dnd 或者高阶组件，可以存储属性，然后传递函数获取属性这样的方式传参。react 中尽量使用属性（避免全部子组件渲染）；然后考虑使用 state 状态。

使用 react-dnd 时，如果一个父组件的状态改变，那么下面的子组件会全部改变，不会走 react 生命周期函数中更新的部分。

这样就造成一些问题：例如 web 项目文件夹，点击菜单，会造成整个文件夹组件全部重新渲染，图片会出现闪动。

react-dnd 使用了高阶组件，可能在 render 时，重新计算了组件，那么势必会去掉原来的组件，并使用新的组件，这样原来的组件自然不会走 componentWillMount 等生命周期函数。

未来使用时，需要注意拖拽内容尽可能少，内部不要有图片或者其他请求的部分，减少性能损耗。

   
## 0350 你知道哪些 React hooks


* `useState`：用于管理功能组件中的状态。

* `useEffect`：用于在功能组件中执行副作用，例如从服务器获取数据，或监听订阅事件。

* `useContext`：用于访问功能组件内的 React 上下文的值。

* `useRef`：用于创建对跨渲染持续存在的元素或值的可变引用。

* `useCallback`：用于记忆函数以防止不必要的重新渲染。

* `useMemo`：用于记忆值，使用缓存减少昂贵的计算，来提高性能。

* `useReducer`：用于通过  reducer函数管理状态

* `useLayoutEffect`：与useEffect类似，但效果在所有DOM突变后同步运行。

这些 hooks 提供了强大的工具来管理状态、处理副作用，以及重用 React 功能组件中的逻辑。

   
## 0358 什么是虚拟DOM


虚拟 DOM 是 React 中的一个概念，其中创建实际 DOM（文档对象模型）的轻量级虚拟，表示并将其存储在内存中。它是一种用于优化 Web 应用程序性能的编程技术。

当 React 组件的数据或状态发生更改时，虚拟 DOM 会被更新，而不是直接操作真实 DOM。然后，虚拟 DOM 计算组件的先前状态和更新状态之间的差异，称为“比较”过程。

一旦识别出差异，React 就会高效地仅更新真实 DOM 的必要部分，以反映更改。这种方法最大限度地减少了实际 DOM 操作的数量，并提高了应用程序的整体性能。

通过使用 [虚拟 DOM](https://www.zhihu.com/search?q=%E8%99%9A%E6%8B%9F%20DOM&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3248392880%7D)，React 提供了一种创建动态和交互式用户界面的方法，同时确保最佳效率和渲染速度。



   
## 0359 useState 是什么


`useState`返回一个状态值和一个更新它的函数。

在初始渲染期间，返回的状态与作为第一个参数传递的值匹配。该`setState`函数用于更新状态。它采用新的状态值作为参数，并对组件的重新渲染进行排队。该`setState`函数还可以接受回调函数作为参数，该函数将之前的状态值作为参数。[了解更多](https://link.zhihu.com/?target=https%3A//react.dev/reference/react/useState)



   
## 0360 useEffect 是什么


`useEffect` 钩子允许在功能组件中执行副作用。 在功能组件的主体（即 React 渲染阶段）中不允许使用突变、订阅、定时器、日志记录和其他副作用。这可能会导致混乱的错误和用户界面的不一致。

因此，建议使用 useEffect。传递给 useEffect 的函数将在呈现提交到屏幕后执行，或者如果您将依赖关系数组作为第二个参数传递，那么每当其中一个依赖关系发生变化时，该函数就会被调用。

```javascript
useEffect(() => {
  // send ajax request
  console.log('Logging something');
  
  // handle event
}, [])

```



   
## 0361 useEffect  如何跟踪功能组件的卸载


通常，`useEffect` 创建的资源需要在组件离开屏幕前进行清理或重置，例如订阅或计时器标识符。 

为此，传递给 `useEffect` 的函数可以返回一个清理函数。清理函数将在组件从用户界面移除之前运行，以防止内存泄漏。

此外，如果组件渲染多次（通常是这种情况），则会在执行下一个效果之前清理前一个效果。

```javascript
useEffect(() => {

  function handleChange(value) {
    setValue(value);
  }
  
  SomeAPI.doFunction(id, handleChange);

  return function cleanup() {
    SomeAPI.undoFunction(id, handleChange);
  };
})

```



   
## 0371 useRef 是什么


`useRef` 返回一个可修改的 ref 对象，即一个属性。

该对象的当前值由传递的参数初始化。

返回的对象将在组件的整个生命周期内持续存在，不会因呈现而改变。

通常的使用情况是以命令式方式访问后代对象。

也就是说，我们可以使用 ref 明确地引用 DOM 元素。

```javascript
const App = () => {
  const inputRef = useRef(null);

  const buttonClick = () => {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={buttonClick}>Focus on input tag</button>
    </>
  )
}

```



   
## 0367 useMemo 是什么


用于缓存和记忆计算结果。计算结果。`useMemo` 仅在任何依赖项的值发生变化时才会重新计算记忆值。这种优化有助于避免昂贵的计算。

对于第一个参数，函数接受一个执行计算的回调，对于第二个参数，函数接受一个依赖关系数组，只有当至少一个依赖关系发生变化时，函数才会重新执行计算。

```javascript
const memoValue = useMemo(() => computeFunc(paramA, paramB), [paramA, paramB]);

```



   
## 0368 useCallback 是什么


`useCallback` 钩子将返回，回调函数的记忆化版本，只有当其中一个依赖项的值发生变化时，回调才会发生变化。 

这在将回调传递给子组件时，非常有用，可以防止不必要的渲染。

```javascript
const callbackValue = useCallback(() => computeFunc(paramA, paramB), [paramA, paramB]);

```



   
## 0364 Mobx 实现哪种模式


Mobx 实现了[观察者模式](https://www.zhihu.com/search?q=%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3248392880%7D)，也称为发布-订阅模式。[了解更多](https://link.zhihu.com/?target=https%3A//www.patterns.dev/posts/observer-pattern)

Mobx 提供了类似`observable`和的装饰器`computed`来定义可观察的状态和反应函数。用action修饰的动作用于修改状态，确保跟踪所有更改。

Mobx 还提供自动依赖跟踪、不同类型的反应、对反应性的细粒度控制，以及通过 [mobx-react 包](https://www.zhihu.com/search?q=mobx-react%20%E5%8C%85&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3248392880%7D)与 React 无缝集成。

总体而言，Mobx 通过根据可观察状态的变化，自动执行更新过程，来简化状态管理。



   
## 0365 如何访问Mobx状态下的变量


可以通过使用装饰器 `observable` 将变量定义为可观察来访问状态中的变量

```javascript
import { observable, computed } from 'mobx';

class MyStore {
  @observable myVariable = 'Hello Mobx';

  @computed get capitalizedVariable() {
    return this.myVariable.toUpperCase();
  }
}

const store = new MyStore();
console.log(store.capitalizedVariable); // Output: HELLO MOBX

store.myVariable = 'Hi Mobx';
console.log(store.capitalizedVariable); // Output: HI MOBX

```

在本例中，`myVariable` 使用 `observable` 装饰器定义为可观测变量。然后就可以使用 `store.myVariable` 访问该变量。对 `myVariable` 所做的任何更改都会自动触发依赖组件或反应的更新。[了解更多](https://link.zhihu.com/?target=https%3A//mobx.js.org/actions.html)



   
## 0369 useMemo 和 useCallback 有什么区别


`useMemo`用于记忆计算结果，而`useCallback`用于记忆函数本身。

* `useMemo`如果依赖项未更改，则缓存计算值并在后续渲染时返回该值。
* `useCallback`缓存函数本身并返回相同的实例，除非依赖项已更改。



   
## 0370 什么是React上下文


React Context 是一项功能，它提供了一种在组件树中传递数据的方法，而无需在每一层手动传递 props。

它允许您创建一个全局状态，树中的任何组件都可以访问该状态，无论其位置如何。

当您需要在多个未通过 props 直接连接的组件之间共享数据时，上下文就非常有用。

React Context API 由三个主要部分组成：

1. createContext（创建上下文）： 该函数用于创建新的上下文对象。
2. Context.Provider： 该组件用于为上下文提供值。它封装了需要访问该值的组件。
3. Context.Consumer 或 useContext 钩子： 该组件或钩子用于从上下文中获取值。它可以在上下文提供者的任何组件中使用。

通过使用 React Context，可以避免 props 透传（通过多级组件传递props），并在更高层次上轻松管理状态，从而使代码更有条理、更高效。[了解更多](https://link.zhihu.com/?target=https%3A//react.dev/learn/passing-data-deeply-with-context)

在典型的 React 应用程序中，数据是使用 props 从上到下（从父组件到子组件）传递的。但是，这种使用方法对于某些类型的 props（例如全局属性 语言、界面主题）来说可能过于繁琐，因为这些 props 必须传递给应用程序中的许多组件。

上下文提供了一种在组件间共享此类数据的方法，而无需明确地将 props 传递到树的每一层。 树的每一级传递 props。当上下文值发生变化时，调用 useContext 的组件总是会被重新渲染。上下文值发生变化时，调用 useContext 的组件总是会被重新渲染。如果重新渲染组件的成本很高，可以使用 [memoization](https://www.zhihu.com/search?q=memoization&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3248392880%7D) 对其进行优化。

```javascript
const App = () => {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ color: theme.palette.primary.main }}>
      Some div
    </div>
  );
}

```



   
## 0372 什么是自定义钩子


自定义钩子是一种允许您在不同组件之间重复使用逻辑的功能。它是一种封装可重用逻辑的方法，以便在多个组件之间轻松共享和重用。自定义钩子是通常以 \*use \* 开头的函数，可在需要时调用其他钩子。

自定义钩子的规则

* 钩子名称以 "use "开头。
* 如有需要，请使用现有钩子。
* 不要有条件地调用钩子。
* 将可重复使用的逻辑提取到自定义钩子中。
* 自定义钩子必须是纯函数。
* 自定义钩子可以返回值或其他钩子。
* 以描述性的方式命名自定义钩子。

```javascript
import { useEffect } from 'react';

export const useClickOutside = ({ currDOM, onClickOutside }, deps) => {
  useEffect(() => {
    const onMousedown = (event) => {
      if (currDOM && event && currDOM.contains(event.target)) {
        return;
      }
      onClickOutside && onClickOutside(event);
    };
    document.addEventListener('mousedown', onMousedown);
    return () => {
      document.removeEventListener('mousedown', onMousedown);
    };

  // eslint-disable-next-line
  }, deps || []);
};

```



   
## 0374 什么是 linters


Linters 是用于检查源代码是否存在潜在错误、错误、风格不一致和可维护性问题的工具。它们帮助执行编码标准并确保整个代码库的代码质量和一致性。

Linters 的工作原理是扫描源代码并将其与一组预定义的规则或指南进行比较。这些规则可以包括语法和格式约定、最佳实践、潜在错误和代码异味。当 linter 发现违反规则时，它会生成警告或错误，突出显示需要注意的特定行或多行代码。

使用 linter 可以带来几个好处：

1. 代码质量：Linter 有助于识别和防止潜在的错误、代码异味和反模式，从而提高代码质量。

2. 一致性：Linter 强制执行编码约定和风格指南，确保整个代码库的格式和代码结构一致，即使多个开发人员正在处理同一个项目时也是如此。

3. 可维护性：通过尽早发现问题并促进良好的编码实践，linter 有助于代码的可维护性，使理解、修改和扩展代码库变得更容易。

4. 效率：Linter 可以通过自动化代码审查流程并在常见错误在开发或生产过程中引起问题之前发现它们，从而节省开发人员的时间。

一些流行的 linter 包括用于 JavaScript 的 ESLint 以及用于 CSS 的 Stylelint

   
## 0454 VUE VS React 对比


React 和 VUE 对比

* 语法格式： vue 是单独的文件格式，一个文件包括了 js css HTML 全部，React 通常是 jsx 格式，JS 和 HTML 写在一个文件中，严格意义是 JSX，会通过 React 转换成JS代码，样式部分通过外部 css 文件控制（或者 less sass，下同）

* 数据流：React 是单向数据流，上层组件通过 state 存储数据，通过 props 传递给下层组件，下层组件不能更改上层组件的数据，通过回调函数或者 redux 等状态管理工具，改变数据，触发组件的局部更新。Vue 早期版本双向数据流，新版本单向数据流。

* 使用场景：react 起源于国外 Facebook，国外公司使用多（阿里巴巴很多项目都是 ts + react）。VUE 作者 Evan You 主要是国内使用。对应的第三库类似。

* React-native 构建原生应用，实现一套代码多种应用；react 类式代码便于和 ts 结合使用

* react 需要使用 PureComponent 或者 shouldComponentUpdate 手动进行 props 对比，否则可能造成大量不必要的重复渲染。VUE setter 和 getter 中已经处理了这部分逻辑。

相同点：

* 虚拟DOM，Diff 算法：

* 响应式和组件化

* key 的作用：渲染时复用之前的 dom 节点，减少性能开销（key 唯一性确保 map 查找节点）

* 这两个是核心库，路由和全局状态管理交给相关的库。(vue-router、vuex、react-router、redux）；构建工具：create-react-app or vue-cli&#x20;

项目如何选择框架？

* 根据团队人员熟练程度，根据已有项目的兼容情况

* 小项目使用 vue，大项目使用 react；国际化项目使用 react；国内项目使用 vue；react 和对应的类型控制，团队人多时便于合作；vue 写法比较灵活，如果注释不完善，可能理解有一定困难。

其他参考：<https://juejin.cn/post/6844903668446134286>

   
## 0467 React 细节


Props 和 子组件更新：如果一个子组件的 state 是父组件的 props 计算出来，那么当父组件的 props 变化后，子组件必须更改 state。否则界面无法更改成最新的状态。最佳方案：store 和 view 完全分离，React jsx 只负责渲染组件。

setState 在react 合成事件 (onClick) 和JS代码中是异步的；在原生JS事件（addeventListener）和定时器中是同步的、第一个参数可以是对象，或者是一个函数（返回新的state对象）。

componentDidUpdate 阶段，React 组件重新渲染，但是真实 DOM 的 redraw 还没有完成，所以更改 top 不会产生动画。设置CSS无效。解决：setTimeout 后，DOM 主线程的 redraw 已经执行完，真实 DOM 已经渲染到界面上，更改 top 值，render tree 重新生成，动画效果可以显示（其他CSS样式类似）。行排序动画遇到这个坑（在 componentDidUpdate 阶段设置 top ，动画无效）参考：<https://blog.csdn.net/huangpin815/article/details/80023480>

react 中强制更新组件，this.forceUpdate() 尽量避免使用，最好使用 state 或者 props 数据驱动更新，这样符合 react 的设计思路

   
## 0662 useImperativeHandle 是什么？


useImperativeHandle，结合forwardRef 实现父组件调子组件的属性和方法

[https://react.docschina.org/reference/react/useImperativeHandle](https://react.docschina.org/reference/react/useImperativeHandle "https://react.docschina.org/reference/react/useImperativeHandle")

[https://juejin.cn/post/7074761729753743373](https://juejin.cn/post/7074761729753743373 "https://juejin.cn/post/7074761729753743373")

待学习

​

  