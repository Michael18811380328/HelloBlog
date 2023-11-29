## typescript + react hooks 练习

链接：https://react.docschina.org/learn/typescript

### package.json

先安装 React 库

```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "链接：https://react.docschina.org/learn/typescript",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Michael An",
  "license": "ISC",
  "dependencies": {
    "react": "^18.2.0"
  }
}

```

### 01-内联 props.tsx

```ts
import React from 'react';

function MyButton({ title }: { title: string }) {
  return (
    <button>{title}</button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>欢迎来到我的应用</h1>
      <MyButton title="我是一个按钮" />
    </div>
  );
}

```

### 02-接口 props.tsx

```ts
import React from 'react';

interface MyButtonProps {
  title: string;
  disabled: boolean;
};

function MyButton({ title, disabled }: MyButtonProps) {
  return (
    <button disabled={disabled}>{title}</button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton title="我是一个禁用按钮" disabled={true}/>
    </div>
  );
}

```


### 03-useState.tsx

```ts
import React, { useState } from 'react';

export default function Demo() {

  // 隐式声明，推断类型为 boolean
  const [ flag, setFlag ] = useState(false);

  // 显式设置类型为 boolean
  const [ enable, setEnable ] = useState<boolean>(false);

  // 联合类型（字符串）
  type Status = 'loading' | 'success' | 'error';
  const [ init, setInit ] = useState<Status>('loading');

  // 联合类型（对象）
  type ResponseStatus = 
  | { code: 200, text: 'success' }
  | { code: 400, text: 'error' }
  | { code: 403, text: 'permission denied' }
  | { code: 500, text: 'internal error' }
  
  const [ response, setResponse ] = useState<ResponseStatus>({ code: 200, text: 'success' });

  return (
    <div>03-useState-tsx</div>
  )
}

```


### 04-useReducer.tsx


```ts
// React hooks useReducer 从 redux 中借鉴，是 useState 的复杂情况
// 在一个组件内部可以模拟 dispatch action —— reducer —— update state 
// 可以参考 https://blog.csdn.net/Jas3000/article/details/124168218
// 这里只练习 ts + useReducer

import React, { useReducer } from 'react';

// Reducer State 的类型声明
interface State {
  count: number
};

const initState: State = { count: 0 };

// dispatch action 的类型声明
type CounterAction = 
| { type: 'reset' }
| { type: 'setCount'; value: State["count"] }
| { type: 'add'; value: State["count"] }

// 设置了 reducer 函数的参数类型，返回值类型 
function stateReducer(state: State, action: CounterAction): State {
  switch (action.type) {
    case 'reset': {
      return initState;
    }
    case 'setCount': {
      return { ...state, count: action.value };
    }
    case 'add': {
      return { ...state, count: state.count + 1 };
    }
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  // 在 iniiState 上设置类型
  const [ state, dispatch ] = useReducer<State>(stateReducer, initState);

  const add = () => dispatch({type: 'add'});
  const addFive = () => dispatch({type: 'setCount', value: state.count + 5});
  const reset = () => dispatch({type: 'reset'});

  return (
    <div>
      <h1>欢迎来到我的计数器</h1>
      <p>计数： {state.count}</p>
      <button onClick={add}>加</button>
      <button onClick={addFive}>加 5</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}

```

### 05-useContext.tsx

```ts
// useContext 使用上下文，避免组件 props 多层级传参

import React, { useContext, createContext, useState } from 'react';

// 设置主题的类型
type Theme = "light" | "dark" | "default";

// 创建主题上下文，并用类型验证
const ThemeContext = createContext<Theme | null>('default');

// 这里封装一个“获取主题”的函数，便于下层函数使用
const useGetTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    // 这个 hook 会在运行时检查 context 是否存在，并在不存在时抛出一个错误。
    throw new Error("useGetComplexObject must be used within a Provider");
  }
  return theme;
}

export default function App() {
  // 顶层组件设置主题色
  const [ theme, setTheme ] = useState<Theme>('default');
  // 通过 ThemeContext.provider 设置到顶层
  return (
    <ThemeContext.provider value={theme}>
      <div className="buttons">
        <button onClick={() => setTheme('dark')}>变暗</button>
        <button onClick={() => setTheme('lignt')}>变亮</button>
        <button onClick={() => setTheme('system')}>系统默认颜色</button>
      </div>
      <MyComponent />
    </ThemeContext.provider>
  );
}

function MyComponent() {
  // 下层组件直接从 Context 中拿到主题色
  const theme = useGetTheme();
  // 或者不使用 useGetTheme 函数，直接使用下面的语法
  // const theme = useContext(ThemeContext);
  return (
    <div>
      <p>当前主题：{theme}</p>
    </div>
  )
}

```

### 06-useMemo.tsx

```ts
import React, { useMemo } from 'react';

function filterTodos(todos: [], tabs: []): [] {
  // filter logic
  return [];
}

interface AppProps {
  todos: [];
  tabs: [];
};

export function App({todos, tabs}: AppProps) {
  // useMemo 记忆化存储，默认从第一个参数中获取数据（filterTodos），当第二个数据变化时，再次从第一个参数中获取数据
  // 类似 shouldComponentUpdate 判断组件是否更新
  const visibleTodos = useMemo(() => filterTodos(todos, tabs), [todos, tabs]);
  return (
    <span>
      {visibleTodos.map(item => String(item))}
    </span>
  );
}

// 官方含义
// useMemo 会从函数调用中创建/重新访问记忆化值，只有在第二个参数中传入的依赖项发生变化时，才会重新运行该函数。
// 函数的类型是根据第一个参数中函数的返回值进行推断的，如果希望明确指定，可以为这个钩子提供一个类型参数以指定函数类型。

```

### 07-useCallback.tsx

```ts
import React, { useState, useCallback } from 'react';

function App({ todos }: { todos: [] }) {
  const filtersTodos = useCallback(() => {}, [todos]);
  return (
    <span>
      {filtersTodos.map(item => String(item))}
    </span>
  );
}

function Demo() {
  const [value, setValue] = useState<string>('');

  // 在 ts 非严格模式下，可以不使用类型注解
  // 在 ts 严格模式下，使用 useCallback 需要为回调函数中的参数添加类型注解
  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setValue(event.currentTarget.value);
    },
    [setValue]
  );

  return (
    <>
      <input value={value} onChange={onChange} />
      <p>值： {value}</p>
    </>
  );
}

export { App, Demo };

```

### 08-React内置类型.tsx

```ts
// 写 TS 时，我们可以手写类型，也可以使用 @types/react 提供了一整套常用类型
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts

// 01 DOM event 事件类型
import React, { useState } from 'react';

function App01() {
  const [ value, setValue ] = useState<string>('');
  // 给一个函数传参，参数是 DOM 合成事件
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }
  // 如果需要确定某一个事件的类型，可以把鼠标放在上面，显示事件对应的具体类型。
  // 如果不需要显示详细的类型，可以使用 React.SyntheticEvent 类型，这是所有事件的基类型。
  return (
    <>
      <input value={value} onChange={handleChange} />
      <p>值： {value}</p>
    </>
  );
}

// 02 React.children 类型验证，可以使用 React.ReactNode, React.ReactElement 两种方式验证
// ReactNode 包括 ReactDOM 节点 + js(string number)基本类型
// ReactElement 只包括 ReactDOM 节点
// 注意：你不能使用 TypeScript 来描述子元素是某种类型的 JSX 元素，所以你不能使用类型系统来描述一个只接受 <li> 子元素的组件。

interface App2Props {
  title: string;
  children: React.ReactNode; // dom + number + string
};

interface App3Props {
  title: string;
  children: React.ReactElement; // dom
}

// 03 React.CSSProperties 样式类型验证
interface HeaderProps {
  title: string;
  style: React.CSSProperties;
};


export { App01, App2Props, App3Props, HeaderProps };

```
