# React笔记 
 
## 0001 Vue和react当中的key是什么意思？有什么作用？


便于在虚拟DOM中进行 diff 的前后比较，如果 Key 相同的话，这两个节点就可以不用更换，直接复用原来的节点，所以Key 需要用某一个固定的值，例如 ID 或者 column key 这样来表示，不能用 index 来表示。
这样进行列表渲染可以优化性能



   
## 0018 React 中 setState 什么时候是同步的，什么时候是异步的


默认是异步执行的，先向下执行代码，然后统一合并 newState 并执行

如果已经在异步代码中了，例如 setTimeout 那么执行就是同步的



   
## 0019 setState 输出和使用


setState 就是更新 state 固定的方法



   
## 0024 Redux 的设计思路


Redux 是用来处理状态管理的一个工具库


把对应的actions进行dispatch

然后所有的状态都存放在store中

对全局进行一个统一的状态管理

大型项目当中使用比较多



   
## 0032 虚拟dom和真实dom的性能对比


从原理上讲，虚拟dom最后也是调用的浏览器的API，对浏览器节点的进行操作。

单独操作一个节点的性能：虚拟DOM性能不如直接操作真实 DOM。

在实际的框架当中，很多框架都采用了虚拟dom的技术来实现，dom的操作，这样就使得开发者，可以不用直接接触浏览器的dom的操作，大大减少了工作量，如果业务量很多的话，使用虚拟dom进行操作是完全可以实现的。（类似于汇编语言和高级语言的差距，汇编确实快，但是工作量很大）

虚拟dom的关键技术是用了diff算法，针对两个前后的dom tree 进行对比，这个在现代浏览器当中，消耗的时间是比较小的是可以接受的。

性能的比较, 需要分场合,看具体的数据量和整体的时间，很难同时满足时间复杂度和空间复杂度。



   
## 0037 Redox的reduce函数为什么不能做异步操作


Relax的设计理念就是reducer函数是一个纯函数

redux 有三个主要的理念

1 state完全存储状态

2 不能直接更改，是state需要通过action来更改state

3 需要通过reduce函数纯函数来更改stake

正是这个设计的理念就决定了reducer 函数必须是一个纯函数，而不能返回一个 promise 或者 settimeout 等不确定的内容


Next state = reducer(current state, action)



   
## 0040 在 react 中为什么 prop 是只读的


1、react 的设计理念是单向数据流，就是从父组件传递 props 给子组件，所以说这个 this.props 是不可更改的

2、如果子组件想要更改父组件传递的prop，是通过回调函数来更改父组件的state，然后父组件重新渲染，传递给子组件的propose就会变化，实现子组件和父组件的通信



   
## 0062 Redux 中 reducer 为什么是一个纯函数


重复题目





   
## 0066 es6代码转换成es5代码的实现思路是什么


通过 babel 转换

es6 string -> es6 AST babel -> es5 AST -> es5 string 执行



   
## 0078 VUE React 父子组件的生命周期函数执行顺序


父子组件执行生命周期函数的过程，就是 DOM 节点树从上到下执行渲染的过程。

先外到内（开始渲染），再内到外（渲染结束）。

更新阶段也是类似的。找到需要更新的某个父节点，然后从上到下执行更新。

这个和事件冒泡和事件捕获需要区分。



   
## 0088 react-router 当中link标签和a标签的区别是什么


<https://blog.csdn.net/zhangwenok/article/details/127207814> 

最后渲染的DOM节点都是 a 标签

Link 和 Router 经常组合使用，点击 Link 不会发生全部页面跳转，只进行页面部分跳转和刷新，优化了性能（diff 算法判断渲染的部分），页面部分刷新，用户视觉效果良好

a 标签就是普通的跳转，整个页面需要刷新，用户视觉效果不好



   
## 0097 React-VUE 的diff算法，从n^3优化到n具体原理是什么


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

function CustomTextInput(props) { return \<div>\</div> }

子组件通过回调函数形式把自身的Ref传给父组件

```javascript
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

类组件中可以直接创建

函数组件中怎么创建，使用forward ref 创建

在高阶组建中可以使用forward方法创建

在 hook 中可以使用user F来创建

记忆方法是321

转发 ref

高阶函数中的ref

hooks中的软ref



   
## 0152 生命周期函数的每一个阶段，新增的和删除的生命周期函数


组建挂载阶段，组建更新阶段，组建卸载阶段
废弃的三个函数和新增的两个函数
   
## 0153 组件什么时候更新？


forceupdate什么时候使用
props state 更新时渲染组件
如何避免没有用处的渲染？ Pure component should component update memo
   
## 0154 Set state有几个函数？分别是同步的还是异步的，具体怎么执行


第一个参数是对象，新更新的状态

第二个是回调函数



   
## 0155 react组件传值有几种方法


第1种从上到下使用props和state是
第2种使用refs或者回调函数，从下向上
第3种在react router当中使用location或者context
第4种使用redux或mobx进行传承

   
## 0156 函数式组件和类组件的区别怎么选择


函数式组件和类组件的主要区别
类组件比较复杂，有着status和生命周期函数，不能使用hooks适合一个比较复杂的组件或者顶层组件，这个各种生命周期函数使用较多的情况
函数式组件比较简单，没有生命周期函数，使用hooks来模拟生命周期函数，适合状态比较简单的若干个情况
整体的性能没有太大差距
   
## 0157 Use state 的具体，use effect


Use state 表示初始化状态

Use effect对应三个生命周期函数

ComponentDidMount component will a mount component did update

这里最好补充一个具体的案例



   
## 0158 React项目性能优化


第一网络请求优化（包括图片懒加载）
第二原生js的优化，包括算法，缓存，从时间和空间分析
第三，react 组件 方面的优化 减少不必要的渲染，有三种方法。 Should component update pure component reactmemo
第4种对于移动端分片渲染或者列表渲染
   
## 0159 react and react-dom 的具体区别


React 是框架的主要功能，只要用到 jsx 或者 Component 等属性，就需要引入

react-dom 是操作 dom 的工具，例如想把某个react组件挂载到根节点上，或者找到某个节点，可以使用这个库



   
## 0160 组件如何复用


可以实现组件的嵌套和高阶组件
高建组件需要使用forwardref实现或者在获取自组件
   
## 0161 redux的具体操作


actions

reducer

store

update whole app





   
## 0163 React redux 的具体操作


mapStateToProps 把父组件的 state 作为 props 传递给子组件

<https://zhuanlan.zhihu.com/p/26648239> 





   
## 0164 React root的具体使用


useState

useEffect

useRefs



   
## 0165 UseMemo 和 useCallback 区别


概括：memo、useMemo、useCallBack主要用于避免React Hooks中的重复渲染，作为性能优化的一种手段，三者需要组合并结合场景使用。

### React.memo()

如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在`React.memo`中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。[React memo官方文档](https://link.zhihu.com/?target=https%3A//zh-hans.reactjs.org/docs/react-api.html%23reactmemo)

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

useCallBack和useMemo唯一的区别是：useMemo返回的是传入的回调函数的执行结果（dom或者返回值），useCallBack返回的是传入的回调函数。本质上就是useMemo的语法糖。

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

### 参考链接

<https://juejin.cn/post/7107943235099557896> 

<https://zhuanlan.zhihu.com/p/545578633> 

<https://blog.csdn.net/weixin_45269534/article/details/131416114> 



  