# 开课吧 React 面试题

### 1、key 是什么？有什么作用？

key 用于标记同级元素的唯一标示。作用是标识唯一性（渲染的时候是否重复渲染节点，如果是同一个元素，直接复用这个元素）；Fiber原来是一个链表结构，通过 key 的唯一性特性转换成一个 Map对象，方便读取Fiber节点（React源码）。

### 2、ref 是什么？创建的三种方式？怎样使用？

Ref目的是获取原生的DOM节点，进一步获取元素的尺寸，或者表单的值。

具体可以给某个HTML元素设置REF，直接获取DOM节点。或者给某个类组件设置REF，直接获取组件对象（然后获取内部的属性和方法）。

#### 创建REF

推荐 `this.refs = React.createRef()` 创建 REF，然后通过 current 获取DOM节点。

直接使用（例子）input

~~~jsx
this.nameInputRef = React.createRef();
let value = this.nameInputRef.current.value;

// <input type="text" ref={this.nameInputRef}/>
~~~

回调函数获取REF

~~~js
setRef = node => {
  this.ref = node;
}
// <input type="text" ref={this.setRef}>
~~~

内联函数在每次render都会创建一个匿名函数，重新设置REF，尽量减少使用。

~~~js
// <input type="text" ref={node => {this.ref = node;}>
~~~

不推荐使用字符串 this.refs.textInput 创建 REF，大量使用有性能问题。

实际项目可能三种方法都使用（有旧代码）所以三个都要会用。

#### 转发REF

类组件可以直接使用REF，函数组件不能直接使用，需要通过转换REF转发设置REF。

~~~jsx
// 函数组件需要通过REF转发后获取
const NewComponent = React.formardRef(FunctionComponent);
// render <NewComponent ...props ref={this.newRef}>
  
function FunctionComponent(props, ref) {
  return (
    <input ref={ref}/ type='text'>
  );
}
~~~

在HOC高阶函数中转发REF：包裹组件不能直接使用子组件的REF，所以需要使用 forwardRef 来转发一下，把内部的REF转发到包裹层外部的组件。使用高阶函数时，设置一个REF，this.inputRef.current 获取子组件的 ref。

~~~jsx
const hoc = WrapComponent => {
  React.forwardRef((props, ref) => {
    return (
      <div>
      	<WrapComponent {...props} innerRef={ref}/>
      </div>
    );
  });
}
~~~

在 HOOK 中的使用

~~~jsx
function Input(props) {
  const inpurRef = useRef(null);
  // inputRef.current.value 使用
  return (
  	<input type="text" ref={inputRef}/>
  );
}
~~~


总结：三种创建方式、两种转发REF的情况、一个在HOOK中使用情况（useRef）（记忆 321）

### 3、生命周期函数

#### 生命周期函数阶段

组件挂载、更新、卸载阶段。

挂载阶段：constructor 构造器、componentWillMount（过时了，不使用）、componentDidMount（发出请求，绑定事件，获取DOM节点尺寸）

更新阶段：shouldComponentUpdate、componentWillUpdate、componentDidUpdate、getDrivedStateFromProps、componentWillReceiveProps(过时了，不使用) 避免在其中setState

卸载阶段：componentWillUnmount（解绑事件，删除定时器等）

#### 新增和删除的生命周期

1、componentWillMount 在服务端处理请求，大规模并发请求不利于服务器，减少使用；

2、componentWillReceiveProps 避免使用，改成 static getDerivedStateFromProps(nextProps, prevState) 对比前后的不同，然后更新state（同时增加一个state）

~~~js
static getDerivedStateFromProps(props, state) {
  const { count } = this.state;
  return count > 5 { count: 0 } : null;
}
// 这是一个静态函数，用于替代componentWillReceiveProps
// 具体的实现原理（fiber内部）如果传入了这个函数，就从Props中生成state状态
// 然后将状态存储在实例中
const getDerivedStateFromProps = ctor.getDerivedStateFromProps;

if (typeof getDerivedStateFromProps === 'function') {
  applyDerivedStateFromProps(
  	workInProgress,
    ctor,
    getDerivedStateFromProps,
    newProps,
  );
  instance.state = workInProgress.memoizedState;
}

// 使用TS进行参数类型验证
function applyDerivedStateFromProps(
	 workInProgress: Fiber,
   ctor: any,
   getDerivedStateFromProps: (props: any, state: any) => any,
   nextProps: any
) {
  const prevState = workInProgress.memoizedState;
  const memoizedState = partialState === null || partialState === undifined ? prevState : Object.assign({}, prevState, partialState);
  // 如果更新后的状态不是空，那么使用新的state合并原始的state
  workInProgress.memoizedState = memoizedState;
}
~~~

3、componentWillUpdate 这个在组件更新前执行，避免使用。使用 getSnapshotBeforeUpdate 代替。

内部判断：如果有 getDirevedStateFromProps 或者 getSnapshotBeforeUpdate 就有新的生命周期函数。这两个函数不能和即将废弃的旧函数同时使用。

~~~js
const snapshot = instance.getSnapshotBeforeUpdate(
	finishedWork.elementType === finishedWork.type
    ? prevProps
    : resolveDefaultProps(finishedWork.type, prevProps),
  prevState
);
instance.__reactInternalSnapshotBeforeUpdate = snapshot;
~~~

4、其他

组件什么时候会更新？Props 变化、state 变化（setState）forceUpdate 触发

组件卸载？只执行一次 componentWillUnmount

~~~js
const instance = current.stateNode;
if (typeof instance.componentWillUnmount === 'function') {
  safelyCallComponentWillUnmount(current, instance);
}
~~~

### 4、事件系统

这里主要讲合成事件和原生事件的关系；合成事件对应的一个表。合成事件和异步操作的执行过程。

~~~tsx
// reactDOMComponent
function setInitialDOMProperties (
	tag: string,
  domElement: Element,
  rootContainerElement: Element | Document,
  nextProps: Object,
  isCustomComponentTag: boolean,
): void {
   for (const propKey in nextProps) {
     // 排除了原型链上的属性
     if (!nextProps.hasOwnProperty(propKey)) {
       continue;
     }
     const nextProp = nextProps[propKey];
     // nextProp 根据这个的数据类型，然后分别执行不同的操作
   }
}
~~~

### 5、setState描述

setState 可以传两个参数：第一个是 Object 或者 function，然后获取一个新的状态，然后和原来的状态合并后更新界面。第二个参数是更新界面后的回调函数。

setState 通常是异步执行的。如果在 setTimeout内部，那么就是同步执行的。

具体执行过程

~~~jsx
Component.prototype.setState = function(partialState, callback) {
  invariant(
    typeof partialState === 'object' ||
    	typeof partialState === 'function' ||
    	partialState == null,
    'setState(...): 描述文字',
  );
  // 进入队列
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

// 具体执行
enqueueUpdate(fiber, update);
scheduleUpdateOnFiver(fiber, expirationTime);
~~~

### 6、react组件通信（redux）

跨层级通信：context 跨越多个层级通信（redux）

React-Router location 可以使用 context 上下文传参

- Context 简介

React中，使用 context 实现组件跨层级传值

~~~txt
React.createContext();

React.Provider

React.contextType

React.Consumer
~~~

基本使用

~~~jsx
import React, {Component,useContext} from 'react';

const MyContext = React.createContext({});

class ClassChild extends Component {
  static contextType = MyContext;
	render() {
    const {color} = this.context;
    return (
    	<button>
        style={{color: color}}
      </button>
    );
  }
}
~~~

Context 可能会重复渲染：当Provider父组件进行重重复渲染时，可能在consumerszizujian 中重复渲染-传参如果是对象，那么每次对象更新都会重复渲染子组件。

解决方法：不传递对象，传递一个字符串等；或者把状态提升到父节点的state中

~~~jsx
this.state = {
  value: {key: 'test'}
};

render() {
  return (
    <Provider value={this.state.value}>
      <Toolbar/>
    </Provider>
  );
}
~~~



### 7、函数组件和类组件如何选择

没有HOOK的情况：函数组件主要展示功能，不支持复杂数据交互；类组件中支持state设置和其他数据交互等（无状态、无副作用）。

类组件缺点：组件之间复用状态很难；复杂组件维护较难；this指向问题。如果一个组件有上面的缺点，可以使用函数组件

有HOOK的情况：函数组件可以存储改变状态（useState useReducer）可以执行副作用复用逻辑（useEffect, useLayoutEffect, 自定义Hook等）

~~~js
// 自定义hook-必须以use开头
// 在函数中，不需要写render，直接使用State保存状态
function useClock() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    // didMount 阶段执行
    const timer = setInterval(() => {
      setDate(newDate());
    }, 1000);
    // UNmount阶段，清除定时器
    return () => clearInterval(timer);
  }, []);
  return date;
}
~~~

### 8、react性能优化

整理思路：减少JS运算，减少界面渲染，减少HTTP请求

- 减少JS运算：优化算法，减少时间复杂度
- 减少不必要的渲染：shouldComponentUpdate、PureComponent、React.memo（函数组件中实现PureComponent的功能） 
- 数据缓存：原生JS中使用cache缓存数据；HOOK中使用 useMemo useCallback 缓存函数

~~~js
function updateMemo<T>(
	nextCreate: () => T,
  deps: Array<mixed> | void | null,
): T {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memorizedState;
  //...
  const nextValue = nextCtrete();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}
~~~

- 函数对象尽量不要使用内联形式：每次执行，会创建一个新的对象，子组件中对比不同，会重新渲染子组件。

- 不要滥用 props context(redux传参)
- 长页面大图片懒加载
- 减少请求等

