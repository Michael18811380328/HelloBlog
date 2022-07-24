# 开课吧 React 预习笔记

- 01 react-create-app 功能、react/react-dom 的功能，webpack 入口文件配置等等
- 02 jsx 语法；CSS模块化的实现
- 03 函数化组件和类组件；函数化组件可以通过hook实现生命周期函数和状态
- 04 setState 的参数，同步和异步的情况
- 05 生命周期函数
- 06 组件复合
- 07 redux
- 08 react-redux
- 09 react-router
- 10 pureComponent 纯组件，实现state的浅比较；
- 11 hook useState useEffect
- 12 自定义hook和注意事项（两个）useName 自定义Hook
- 13 useMemo useCallback API 只有满足特定条件，才执行内部的函数，返回结果（不会在state变化时，执行全部的操作）


### 第5课 生命周期函数

React 17 废弃的生命周期函数

componentWillMount

componentWillUpdate

componentWillReceiveProps

新的生命周期函数

static getDerivedStateFromProps

static getSnapshotBeforeUpdate


新函数和旧函数不能同时使用。旧函数可以先加上 UNSAVE 前缀:

```sh
npx react-codemod rename-unsafe-lifecycles <path>
```

getDerivedStateFromProps: 这个用于取代 componentWillReceiveProps 可以从上一个 props 中计算出新的state并重新 setState。

getSnapshotBeforeUpdate(prevProps, prevState) 在 render 之后，在 componentDidUpdate 之前。可以在组件发生更改之前从 DOM 中捕获信息（滚动位置等）。

返回值就传递给 componentDidUpdate（prevProps, prevState, snapshot）函数中


### 第6课 组件复合

组件复合（组件嵌套使用，高阶组件）父组件给子组件 children 中，可以是直接的JSX或者字符串，也可以传一个对象（属性包括字符串，JSX，函数）子组件中使用 children.obj 获取对应的属性即可

### 第7课 redux

首先 let store = createStore(reducer); 创建一个 store。

其中 reducer 是更新 store 的函数。reducer(state, action) 根据 action 对象的更新 state。在具体的组件中引入 store。

通过 store.getState 获取状态。通过 store.dispatch({type: 'ADD'}) 触发 action，改变 store 中的状态（state）。

可以在组件中订阅 state 的变化的回调函数（didmount 阶段）。

store.dispatch(() => {回调函数中，this.forceUpdate()  组件强制更新。}) 这样一个周期实现。不同组件可以订阅不同的状态和触发不同的回调函数。

~~~js
// redux，状态管理工具
// 适应于大量变化的数据+状态需要共享（用于处理由于状态提升，造成顶级组件中 state 非常多难以维护的情况）
// 流程：reducer(current state) -> redux(store) -> view -> dispatch -> action(change state) -> reducer
// npm install redux --save
// 如果是某个组件内部的状态，那么不需要使用 redux 进行状态管理

// demo 累加器

// store ReduxStore.js
import { createStore } from 'redux';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "ADD":
      return state + 1
    case 'MINUS':
      return state - 1
    default:
      return state
  }
}

const store = createStore(counterReducer);

export default store;
~~~


reduxPage
~~~js
import React from 'react';
import store from '../store/ReduxStore';

class ReduxPage extends React.Component {

  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  add = () => {
    store.dispatch({ type: "ADD" });
  }

  minus = () => {
    store.dispatch({ type: 'MINUS' });
  }

  render() {
    console.log(store);
    return (
      <p>{store.getState()}</p>
    );
  }
}

export default ReduxPage;
~~~

或者在顶级组件中监听事件并更新全部的内容

在 index 中订阅状态变更

~~~js
import store from './store/reduxStore';

const render = () => {
  ReactDOM.render(
    <App/>,
    document.getElementById('#root')
  );
}
render();
store.subscribe(render);

~~~

操作要点

- createStore 创建 store
- reducer 初始化 state
- getState 获取 state
- dispatch 提交更新
- subscribe 变更订阅

### 第8课 react-redux

Provider 包裹APP顶层组件，使得全局可以直接使用Store `<Provider store={store}><App/></Provider>` connect 在子组件中获取 store。

`connect(connectStatetoProps, connectDispatchToProps)(Component);` 其中第二个括号中是组件。

第一个括号中传递两个参数（state2Props, dispatch2props，分别表示把state 和 dispatch 映射到 prop 中）

这样，在子组件中，不需要直接使用 store.getState 和 store.dispatch 传值，直接使用 `{ state, dispatch } = this.props` 获取即可。

dispatch 可以更改成一个对象，存储多个对应的函数。redux 适合其他库，react-redux 专门用于react 中使用状态。connect 是一个高阶组件。

~~~js
// npm install react-redux --save
// provider 提供 store
// connect 提供数据变更操作

import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('#root')
);

// 获取状态数据
import React from 'react';
import { connect } from 'react-redux';

class ReactReduxPage extends React.Component {
  render() {
    const { num, add, minus } = this.props;
    return (
      <div></div>
    );
  }
}

const mapStateToProps = state => {
  return {
    num: state,
  };
};

const mapDispatchToProps = {
  add: () => {
    return { type: 'add' };
  },
  minus: () => {
    return { type: 'minus' };
  }
};

// 高阶组件
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReactReduxPage);

// 参数1：state映射
// 参数2：事件映射

~~~


### 第9课

Router 组件进行包裹，Link 表示跳转的链接，Route 是根据不同URL进行跳转（可以精确匹配，可以进行传参），参数中 children > component > render 。

可以使用 switch 包裹一组 Router 实现选择其中一个进行渲染，主要用于404错误界面的处理。

~~~js
// npm install react-router-dom --save

import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

export default class Text extends React.Component {
  render() {
    return (
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户</Link>
        <Route
          exact
          path='/'
          // children={() => <span></span>}
          component={HomePage}
          // render={() => <hr/>}
        />
        <Route
          path="/user"
          component={UserPage}
        />
      </Router>
    );
  }
}
~~~

子组件是唯一的：children > component > render
exact 表示精确匹配
`<Switch></Stitch>` 表示选择，只能选择一个情况，这样可以处理404的情况（前边几个都不满足，最后一个Route path 不传参，显示空页面的提醒）
Link 实质是山A标签；route会根据URL的不同，跳转到不同的子页面（组件）中
当然，这部分python-urls（Django）模板已经实现了传参

### 第10课 pureComponent

pureComponent 实现了 shouldComponentUpdate

实现了数据的浅对比，适合于UI展示界面

最终减少界面render优化性能

~~~js

import React from 'react';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      data: {
        num: 0
      }
    };
  }
  // setState({ counter++ })
  // setState({ data.num++ })
}

// 内部逻辑实现
function shallowEqual(objA: mixed, objB: mixed): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
   return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(objb, keysA[i]) ||
      !Object.is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }
  return true;
}
~~~


### 第11课

~~~js
import React, { useState } from 'react';

export default function HookPage(props) {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}></button>
  );
}

// 更新后的组件（可以大大简化代码）
// 可以尝试把一个类组件优化成一个Hook组件
export default function Page2(props) {
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    document.title = `test ${count}`;
  }, [count]);
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
}
~~~


### 第12课 自定义 hook

函数组件中使用 Hook 实现状态和生命周期函数

~~~jsx
import React，{ useState, useEffect } from 'react';

export function Test(props) {
  const [data, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    // return 这里表示 componentWillUnmount 阶段
    return () => clearInterval(timer);
  }, []);
  // 这里第二个参数表示 componentDidMount 更新触发的条件
  // 如果不加的话，每次组件更新都会触发内部代码执行
  // 现在是空数组，那么在 componentDidMount 阶段都会执行
  return (
  	<div>{date.toLocalTimeString()}</div>
  );
}
~~~

useEffect 函数相当于：componentDidMount componentDidMount componentWillUnmount 生命周期函数。


hook 注意事项：

- 只能在函数外层调用，不能再条件、循环、子函数中使用
- 只能在 react 函数组件、或者自定义 Hook 中使用。不能直接在 原生JS中使用 Hook。

自定义Hook：

~~~js
function useClock() {
  const [ data, setData ] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
     	let date = new Date();
      setData(date);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return data;
}
~~~

### 第13课 useMemo useCallback

useMemo

~~~js
const date = useMemo(() => {
  return new Date();
  // 只有time改变后，这里才重新执行
  // 其他state变化，这里不会重新执行
}, [time]);

// date 作为参数传递给子组件
~~~

useCallback

~~~jsx
const fn = useCallback(() => {
  return new Date();
}, [time]);

<Child fn={fn}/>
~~~

这两个API参数相同：第一个参数是回调函数，第二个是判断条件。

这两个API可以转换：useCallback(fn, deps)  === useMemo(() => fn, deps);
