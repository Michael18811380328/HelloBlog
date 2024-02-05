# 01 React Hooks 入门教程（阮一峰）

https://www.ruanyifeng.com/blog/2019/09/react-hooks.html

日期： 2019年9月1日

函数式组件是一个纯函数，不应该有任何的副作用，应该直接把数据渲染成 HTML ，函数的返回值就是 HTML。那么各种副作用操作，就需要 hooks 实现副作用。

这里介绍四个常用 hooks

- useState 处理状态
- useContext 处理上下文传参（跨组件传参）
- useReducer 处理 redux 的 action 和 dispatch
- useEffect 处理生命周期函数（didMount, dIdpdate）
- 自定义 hooks

useState 处理组件内部状态，外部共享的状态使用 redux 管理，注意：状态名称和更改函数名称一致。如果状态较多，名称尽量具体有意义，避免冲突。

~~~jsx
import React, { useState } from 'react';

export default function Button () {
  const [text, setText] = useState('click me');
  
 	function onClick() {
    setText('Thanks')
  } 
  
  return (
    <button onClick={onClick}>{text}</button>
  );
}
~~~

处理上下文（跨组件传参，主要用于顶级组件把全局设置，例如背景色，当前使用者，语言设置等传递给全部叶子组件，叶子组件引入 useContext(Appcontext) 即可拿到顶层组件的设置，不需要把顶层组件挂载到全局变量上）

~~~jsx
import React, { useContext } from 'react';

// 顶层组件上下文
const AppContext = React.createContext({});

// 子组件
const Navbar = () => {
  const { username } = useContext(Appcontext);
  return (
    <div className="navBar">{username}</div>
  );
}

// 顶层组件
function App() {
  return (
  	<AppContext.Provider value={{ username: 'Mike'}}>
    	<div>
      	<Navbar/>
      </div>
    </AppContext.Provider>
  );
}
~~~

useReducer 类似 redux，让组件的 store 和 UI 层解耦，可以实现 redux 的基本功能

~~~jsx
import React, { useReducer } from "react";

const myReducer = (state, action) => {
  switch(action.type): {
    case('add'):
      return {
        ...state,
        count: state.count + 1,
      }
    case('remove'):
      return {
        ...state,
        count: state.count - 1,
      }
    default: {
      return state;
    }
  }
}

function App() {
  const [state, dispatch] = useReducer(myReducer, { count: 0 });
  return (
  	<>
    	<button onClick={() => dispatch({ type: 'add' })}>increase</button>
      <button onClick={() => dispatch({ type: 'remove' })}>decrease</button>
      <p>result is {state.count}</p>
    </>
  );
}
~~~

useEffect 是 componentDidMount 和 componentDidUpdate 和 componentWIllUnmount 的组合，用于首次加载后，或者组件更新后，处理网络请求，或者处理 DOM 尺寸计算等。不同操作，最好分开写成不同的 useEffect。useEffect 第一个参数是函数，包括具体执行的操作（副作用），第二个参数是数组 [] 可选参数，当这个数组内容变化后，再执行函数的操作。

~~~jsx
import React, { useState, useEffect } from "react";

// 子组件，渲染用户的详情（需要查询服务端数据）
const Person = ({ personId }) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  
  // 初始加载用户信息，或者用户 ID 变化后重新加载信息
  useEffect(() => {
    setLoading(true);
    fetch('http://www.api.com/person').then(res => {
      return res.json();
    }).then(data => {
      setPerson(data);
      setLoading(false);
    });
  }, [personId]);
  
  if (loading || !person) {
    return <span>...</span>
  }
  return (
  	<div>
    	<p>{person.name}</p>
      <p>{person.height}</p>
    </div>
  );
}

// 父组件，实现切换用户信息
function App() {
  const [personId, setPersonId] = useState("1");
  return (
    <div className="App">
      <Person personId={personId} />
      <div>
        Show:
        <button onClick={() => setPersonId("1")}>Luke</button>
        <button onClick={() => setPersonId("2")}>C-3PO</button>
      </div>
    </div>
  );
}
~~~

自定义 hook，可以把多个 hook 拼接成一起，例如把上面的 person 和 loading 拼接到一起，封装成函数组件

~~~jsx
import React, { useState } from 'react';

export default function usePerson(personId) {
  const [loading, setLoading] = useState(true);
  const [person, usePerson] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch('xxx').then(res => {
      return res.json();
    }).then(data => {
      const { person } = data;
      setPseson(person);
      setLoading(false);
    })
  },[personId]);

  return [loading, person];
}
~~~

那么就可以使用这个自定义 hook 

~~~jsx
import usePerson from './usePerson';

export default function App(personId) {
  const [loading, person] = usePerson(personId);
  if (loading) {
    return <><>
  }
  return (
    <div>{person.name}</div>
  )
};

~~~

