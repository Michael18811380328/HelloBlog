# 03 从 Class 迁移到 Hook

https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#from-classes-to-hooks

### 生命周期方法要如何对应到 Hook？

- `constructor`：函数组件不需要构造函数。你可以通过调用 [`useState`](https://zh-hans.legacy.reactjs.org/docs/hooks-reference.html#usestate) 来初始化 state。如果计算的代价比较昂贵，你可以传一个函数给 `useState`。
- `getDerivedStateFromProps`：改为 [在渲染时](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops) 安排一次更新。
- `shouldComponentUpdate`：详见 [下方](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#how-do-i-implement-shouldcomponentupdate) `React.memo`.
- `render`：这是函数组件体本身。
- `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`：[`useEffect` Hook](https://zh-hans.legacy.reactjs.org/docs/hooks-reference.html#useeffect) 可以表达所有这些(包括 [不那么](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#can-i-skip-an-effect-on-updates) [常见](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#can-i-run-an-effect-only-on-updates) 的场景)的组合。
- `getSnapshotBeforeUpdate`，`componentDidCatch` 以及 `getDerivedStateFromError`：目前还没有这些方法的 Hook 等价写法，但很快会被添加。

### 有类似实例变量的东西吗？

有！[`useRef()`](https://zh-hans.legacy.reactjs.org/docs/hooks-reference.html#useref) Hook 不仅可以用于 DOM refs。「ref」 对象是一个 `current` 属性可变且可以容纳任意值的通用容器，类似于一个 class 的实例属性。

你可以在 `useEffect` 内部对其进行写入:

~~~js
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  // ...
}
~~~

如果我们只是想设定一个循环定时器，我们不会需要这个 ref（`id` 可以是在 effect 本地的），但如果我们想要在一个事件处理器中清除这个循环定时器的话这就很有用了：

~~~js
  // ...
  function handleCancelClick() {
    clearInterval(intervalRef.current);
  }
  // ...
~~~

从概念上讲，你可以认为 refs 就像是一个 class 的实例变量。除非你正在做 [懒加载](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily)，否则避免在渲染期间设置 refs —— 这可能会导致意外的行为。相反的，通常你应该在事件处理器和 effects 中修改 refs。

### 我应该使用单个还是多个 state 变量？

如果你之前用过 class，你或许会试图总是在一次 `useState()` 调用中传入一个包含了所有 state 的对象。如果你愿意的话你可以这么做。这里有一个跟踪鼠标移动的组件的例子。我们在本地 state 中记录它的位置和尺寸：

```js
function Box() {
  const [state, setState] = useState({ left: 0, top: 0, width: 100, height: 100 });
  // ...
}
```

现在假设我们想要编写一些逻辑以便在用户移动鼠标时改变 `left` 和 `top`。注意到我们是如何必须手动把这些字段合并到之前的 state 对象的：

```js
// ...
  useEffect(() => {
    function handleWindowMouseMove(e) {
      // 展开 「...state」 以确保我们没有 「丢失」 width 和 height      setState(state => ({ ...state, left: e.pageX, top: e.pageY }));    }
    // 注意：这是个简化版的实现
    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, []);
  // ...
```

这是因为当我们更新一个 state 变量，我们会 *替换* 它的值。这和 class 中的 `this.setState` 不一样，后者会把更新后的字段 *合并* 入对象中。

如果你还怀念自动合并，你可以写一个自定义的 `useLegacyState` Hook 来合并对象 state 的更新。然而，**我们推荐把 state 切分成多个 state 变量，每个变量包含的不同值会在同时发生变化。**

举个例子，我们可以把组件的 state 拆分为 `position` 和 `size` 两个对象，并永远以非合并的方式去替换 `position`：

```js
function Box() {
  const [position, setPosition] = useState({ left: 0, top: 0 });  
  const [size, setSize] = useState({ width: 100, height: 100 });

  useEffect(() => {
    function handleWindowMouseMove(e) {
      setPosition({ left: e.pageX, top: e.pageY });    }
    // ...
```

把独立的 state 变量拆分开还有另外的好处。这使得后期把一些相关的逻辑抽取到一个自定义 Hook 变得容易，比如说:

```js
function Box() {
  const position = useWindowPosition();  const [size, setSize] = useState({ width: 100, height: 100 });
  // ...
}

function useWindowPosition() {  const [position, setPosition] = useState({ left: 0, top: 0 });
  useEffect(() => {
    // ...
  }, []);
  return position;
}
```

注意看我们是如何做到不改动代码就把对 `position` 这个 state 变量的 `useState` 调用和相关的 effect 移动到一个自定义 Hook 的。如果所有的 state 都存在同一个对象中，想要抽取出来就比较难了。

把所有 state 都放在同一个 `useState` 调用中，或是每一个字段都对应一个 `useState` 调用，这两方式都能跑通。当你在这两个极端之间找到平衡，然后把相关 state 组合到几个独立的 state 变量时，组件就会更加的可读。

### 如何获取上一轮的 props 或 state？

在以下两种场景下，你可以能会需要获取上一轮的 props 或 state。

有时，你需要获取之前的 props 来 **进行副作用的清理**。例如，你可能有这样一个副作用，依赖 `userId` props 来订阅 socket。如果 `userId` 发生了变化，你需要取消 **之前** `userId` 的订阅，再进行后续订阅。这种情况下，你无需做额外操作即可实现：

```js
useEffect(() => {
  ChatAPI.subscribeToSocket(props.userId);
  return () => ChatAPI.unsubscribeFromSocket(props.userId);
}, [props.userId]);
```

在上述示例中，如果 `userId` 从 `3` 变为 `4`，`ChatAPI.unsubscribeFromSocket(3)` 将会优先运行，然后才会执行 `ChatAPI.subscribeToSocket(4)`。这种情况下，你没必要获取之前的 `userId`，因为清理函数将在闭包中捕获它，

我们之前曾建议使用 `usePrevious` 的自定义 Hook 来保持前值。然后，我们发现大多数用例，都属于上述两种场景。如果你的用例与上述两种情况不同，你可以在 [Ref 中对该值进行存储](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables) 并在需要时手动更新它。注意，应避免在渲染过程中读取和更新 refs，因为这使得你组件的行为难以预测，且难以理解。

### 为什么我会在我的函数中看到陈旧的 props 和 state ？

组件内部的任何函数，包括事件处理函数和 effect，都是从它被创建的那次渲染中被「看到」的。例如，考虑这样的代码：

```js
function Example() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}
```

如果你先点击「Show alert」然后增加计数器的计数，那这个 alert 会显示**在你点击『Show alert』按钮时**的 `count` 变量。这避免了那些因为假设 props 和 state 没有改变的代码引起问题。

如果你刻意地想要从某些异步回调中读取 *最新的* state，你可以用 [一个 ref](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables) 来保存它，修改它，并从中读取。

最后，你看到陈旧的 props 和 state 的另一个可能的原因，是你使用了「依赖数组」优化但没有正确地指定所有的依赖。举个例子，如果一个 effect 指定了 `[]` 作为第二个参数，但在内部读取了 `someProp`，它会一直「看到」 `someProp` 的初始值。解决办法是要么移除依赖数组，要么修正它。 这里介绍了 [你该如何处理函数](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies)，而这里介绍了关于如何减少 effect 的运行而不必错误的跳过依赖的 [一些常见策略](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often)。

> 注意
>
> 我们提供了一个 [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) ESLint 规则作为 [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) 包的一部分。它会在依赖被错误指定时发出警告，并给出修复建议。

### 我该如何实现 `getDerivedStateFromProps`？

尽管你可能 [不需要它](https://zh-hans.legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)，但在一些罕见的你需要用到的场景下（比如实现一个 `<Transition>` 组件），你可以在渲染过程中更新 state 。React 会立即退出第一次渲染并用更新后的 state 重新运行组件以避免耗费太多性能。

这里我们把 `row` prop 上一轮的值存在一个 state 变量中以便比较：

```js
function ScrollView({row}) {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [prevRow, setPrevRow] = useState(null);

  if (row !== prevRow) {
    // Row 自上次渲染以来发生过改变。更新 isScrollingDown。
    setIsScrollingDown(prevRow !== null && row > prevRow);
    setPrevRow(row);
  }

  return `Scrolling down: ${isScrollingDown}`;
}
```

初看这或许有点奇怪，但渲染期间的一次更新恰恰就是 `getDerivedStateFromProps` 一直以来的概念。

### 我该如何测量 DOM 节点？

获取 DOM 节点的位置或是大小的基本方式是使用 [callback ref](https://zh-hans.legacy.reactjs.org/docs/refs-and-the-dom.html#callback-refs)。每当 ref 被附加到一个另一个节点，React 就会调用 callback。

```js
function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {    if (node !== null) {      setHeight(node.getBoundingClientRect().height);    }  }, []);
  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>      
			<h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}
```

在这个案例中，我们没有选择使用 `useRef`，因为当 ref 是一个对象时它并不会把当前 ref 的值的 *变化* 通知到我们。使用 callback ref 可以确保 [即便子组件延迟显示被测量的节点](https://codesandbox.io/s/818zzk8m78) (比如为了响应一次点击)，我们依然能够在父组件接收到相关的信息，以便更新测量结果。

注意到我们传递了 `[]` 作为 `useCallback` 的依赖列表。这确保了 ref callback 不会在再次渲染时改变，因此 React 不会在非必要的时候调用它。

在此示例中，当且仅当组件挂载和卸载时，callback ref 才会被调用，因为渲染的 `<h1>` 组件在整个重新渲染期间始终存在。如果你希望在每次组件调整大小时都收到通知，则可能需要使用 [`ResizeObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver) 或基于其构建的第三方 Hook。

如果你愿意，你可以 [把这个逻辑抽取出来作为](https://codesandbox.io/s/m5o42082xy) 一个可复用的 Hook:

```js
function MeasureExample() {
  const [rect, ref] = useClientRect();  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      {rect !== null &&
        <h2>The above header is {Math.round(rect.height)}px tall</h2>
      }
    </>
  );
}

function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
```



## 性能优化

### 在依赖列表中省略函数是否安全？

一般来说，不安全。

```js
function Example({ someProp }) {
  function doSomething() {
    console.log(someProp);  
  }

  useEffect(() => {
    doSomething();
  }, []); // 不安全（它调用的 `doSomething` 函数使用了 `someProp`）
}
```

要记住 effect 外部的函数使用了哪些 props 和 state 很难。这也是为什么 **通常你会想要在 effect \*内部\* 去声明它所需要的函数。** 这样就能容易的看出那个 effect 依赖了组件作用域中的哪些值：

```js
function Example({ someProp }) {
  useEffect(() => {
    function doSomething() {
      console.log(someProp);    
    }
    doSomething();
  }, [someProp]); // ✅ 安全（我们的 effect 仅用到了 `someProp`）
}
```

如果这样之后我们依然没用到组件作用域中的任何值，就可以安全地把它指定为 `[]`：

```js
useEffect(() => {
  function doSomething() {
    console.log('hello');
  }
  doSomething();
}, []); // ✅ 在这个例子中是安全的，因为我们没有用到组件作用域中的 *任何* 值
```

根据你的用例，下面列举了一些其他的办法。

> 注意
>
> 我们提供了一个 [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) ESLint 规则作为 [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) 包的一部分。它会帮助你找出无法一致地处理更新的组件。

让我们来看看这有什么关系。

如果你指定了一个 [依赖列表](https://zh-hans.legacy.reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect) 作为 `useEffect`、`useLayoutEffect`、`useMemo`、`useCallback` 或 `useImperativeHandle` 的最后一个参数，它必须包含回调中的所有值，并参与 React 数据流。这就包括 props、state，以及任何由它们衍生而来的东西。

**只有** 当函数（以及它所调用的函数）不引用 props、state 以及由它们衍生而来的值时，你才能放心地把它们从依赖列表中省略。下面这个案例有一个 Bug：

```js
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  async function fetchProduct() {
    const response = await fetch('http://myapi/product/' + productId);
    // 使用了 productId prop    
    const json = await response.json();
    setProduct(json);
  }

  useEffect(() => {
    fetchProduct();
  }, []); // 无效，因为 `fetchProduct` 使用了 `productId`  // ...
}
```

**推荐的修复方案是把那个函数移动到你的 effect \*内部\***。这样就能很容易的看出来你的 effect 使用了哪些 props 和 state，并确保它们都被声明了：

```js
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // 把这个函数移动到 effect 内部后，我们可以清楚地看到它用到的值。    
    async function fetchProduct() {      
    const response = await fetch('http://myapi/product/' + productId);      
      const json = await response.json();      
      setProduct(json);    
    }
    fetchProduct();
  }, [productId]); // ✅ 有效，因为我们的 effect 只用到了 productId  // ...
}
```

这同时也允许你通过 effect 内部的局部变量来处理无序的响应：

```js
  useEffect(() => {
    let ignore = false;    
    async function fetchProduct() {
      const response = await fetch('http://myapi/product/' + productId);
      const json = await response.json();
      if (!ignore) setProduct(json);    
    }
    fetchProduct();
    return () => { ignore = true };  
  }, [productId]);
```

我们把这个函数移动到 effect 内部，这样它就不用出现在它的依赖列表中了。

**如果出于某些原因你 \*无法\* 把一个函数移动到 effect 内部，还有一些其他办法：**

- **你可以尝试把那个函数移动到你的组件之外**。那样一来，这个函数就肯定不会依赖任何 props 或 state，并且也不用出现在依赖列表中了。
- 如果你所调用的方法是一个纯计算，并且可以在渲染时调用，你可以 **转而在 effect 之外调用它，** 并让 effect 依赖于它的返回值。
- 万不得已的情况下，你可以 **把函数加入 effect 的依赖但 \*把它的定义包裹\*** 进 [`useCallback`](https://zh-hans.legacy.reactjs.org/docs/hooks-reference.html#usecallback) Hook。这就确保了它不随渲染而改变，除非 *它自身* 的依赖发生了改变：

```js
function ProductPage({ productId }) {
  // 用 useCallback 包裹以避免随渲染发生改变  
  const fetchProduct = useCallback(() => {    
    // ... Does something with productId ...  
  }, [productId]); 
  // useCallback 的所有依赖都被指定了
  return <ProductDetails fetchProduct={fetchProduct} />;
}

function ProductDetails({ fetchProduct }) {
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]); // ✅ useEffect 的所有依赖都被指定了
  // ...
}
```

注意在上面的案例中，我们 **需要** 让函数出现在依赖列表中。这确保了 `ProductPage` 的 `productId` prop 的变化会自动触发 `ProductDetails` 的重新获取。

### 如果我的 effect 的依赖频繁变化，我该怎么办？

有时候，你的 effect 可能会使用一些频繁变化的值。你可能会忽略依赖列表中 state，但这通常会引起 Bug：

```js
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // 这个 effect 依赖于 `count` state    
    }, 1000);
    return () => clearInterval(id);
  }, []); // Bug: `count` 没有被指定为依赖
  return <h1>{count}</h1>;
}
```

传入空的依赖数组 `[]`，意味着该 hook 只在组件挂载时运行一次，并非重新渲染时。但如此会有问题，在 `setInterval` 的回调中，`count` 的值不会发生变化。因为当 effect 执行时，我们会创建一个闭包，并将 `count` 的值被保存在该闭包当中，且初值为 `0`。每隔一秒，回调就会执行 `setCount(0 + 1)`，因此，`count` 永远不会超过 1。

指定 `[count]` 作为依赖列表就能修复这个 Bug，但会导致每次改变发生时定时器都被重置。事实上，每个 `setInterval` 在被清除前（类似于 `setTimeout`）都会调用一次。但这并不是我们想要的。要解决这个问题，我们可以使用 [`setState` 的函数式更新形式](https://zh-hans.legacy.reactjs.org/docs/hooks-reference.html#functional-updates)。它允许我们指定 state 该 *如何* 改变而不用引用 *当前* state：

```js
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ 在这不依赖于外部的 `count` 变量    
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ 我们的 effect 不使用组件作用域中的任何变量
  return <h1>{count}</h1>;
}
```

（`setCount` 函数的身份是被确保稳定的，所以可以放心的省略掉）

此时，`setInterval` 的回调依旧每秒调用一次，但每次 `setCount` 内部的回调取到的 `count` 是最新值（在回调中变量命名为 `c`）。

在一些更加复杂的场景中（比如一个 state 依赖于另一个 state），尝试用 [`useReducer` Hook](https://zh-hans.legacy.reactjs.org/docs/hooks-reference.html#usereducer) 把 state 更新逻辑移到 effect 之外。[这篇文章](https://adamrackis.dev/state-and-use-reducer/) 提供了一个你该如何做到这一点的案例。 **`useReducer` 的 `dispatch` 的身份永远是稳定的** —— 即使 reducer 函数是定义在组件内部并且依赖 props。

万不得已的情况下，如果你想要类似 class 中的 `this` 的功能，你可以 [使用一个 ref](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables) 来保存一个可变的变量。然后你就可以对它进行读写了。举个例子：

```js
function Example(props) {
  // 把最新的 props 保存在一个 ref 中 
  const latestProps = useRef(props);  
  useEffect(() => {    
    latestProps.current = props;  
  });
  
  useEffect(() => {
    function tick() {
      // 在任何时候读取最新的 props      
      console.log(latestProps.current);    
    }

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []); // 这个 effect 从不会重新执行}
```

仅当你实在找不到更好办法的时候才这么做，因为依赖于变更会使得组件更难以预测。如果有某些特定的模式无法很好地转化成这样，[发起一个 issue](https://github.com/facebook/react/issues/new) 并配上可运行的实例代码以便，我们会尽可能帮助你。

### 我该如何实现 `shouldComponentUpdate`?

你可以用 `React.memo` 包裹一个组件来对它的 props 进行浅比较：

```js
const Button = React.memo((props) => {
  // 你的组件
});
```

这不是一个 Hook 因为它的写法和 Hook 不同。`React.memo` 等效于 `PureComponent`，但它只比较 props。（你也可以通过第二个参数指定一个自定义的比较函数来比较新旧 props。如果函数返回 true，就会跳过更新。）

`React.memo` 不比较 state，因为没有单一的 state 对象可供比较。但你也可以让子节点变为纯组件，或者 [用 `useMemo` 优化每一个具体的子节点](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#how-to-memoize-calculations)。

### 如何记忆计算结果？

[`useMemo`](https://zh-hans.legacy.reactjs.org/docs/hooks-reference.html#usememo) Hook 允许你通过「记住」上一次计算结果的方式在多次渲染的之间缓存计算结果：

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

这行代码会调用 `computeExpensiveValue(a, b)`。但如果依赖数组 `[a, b]` 自上次赋值以来没有改变过，`useMemo` 会跳过二次调用，只是简单复用它上一次返回的值。

记住，传给 `useMemo` 的函数是在渲染期间运行的。不要在其中做任何你通常不会在渲染期间做的事。举个例子，副作用属于 `useEffect`，而不是 `useMemo`。

**你可以把 `useMemo` 作为一种性能优化的手段，但不要把它当做一种语义上的保证。**未来，React 可能会选择「忘掉」一些之前记住的值并在下一次渲染时重新计算它们，比如为离屏组件释放内存。建议自己编写相关代码以便没有 `useMemo` 也能正常工作 —— 然后把它加入性能优化。（在某些取值必须 *从不* 被重新计算的罕见场景，你可以 [惰性初始化](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily) 一个 ref。）

方便起见，`useMemo` 也允许你跳过一次子节点的昂贵的重新渲染：

```js
function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
}
```

注意这种方式在循环中是无效的，因为 Hook 调用 [不能](https://zh-hans.legacy.reactjs.org/docs/hooks-rules.html) 被放在循环中。但你可以为列表项抽取一个单独的组件，并在其中调用 `useMemo`。

### 如何惰性创建昂贵的对象？

如果依赖数组的值相同，`useMemo` 允许你 [记住一次昂贵的计算](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#how-to-memoize-calculations)。但是，这仅作为一种提示，并不 *保证* 计算不会重新运行。但有时候需要确保一个对象仅被创建一次。

**第一个常见的使用场景是当创建初始 state 很昂贵时：**

```js
function Table(props) {
  // ⚠️ createRows() 每次渲染都会被调用
  const [rows, setRows] = useState(createRows(props.count));
  // ...
}
```

为避免重新创建被忽略的初始 state，我们可以传一个 **函数** 给 `useState`：

```js
function Table(props) {
  // ✅ createRows() 只会被调用一次
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}
```

React 只会在首次渲染时调用这个函数。参见 [`useState` API 参考](https://zh-hans.legacy.reactjs.org/docs/hooks-reference.html#usestate)。

**你或许也会偶尔想要避免重新创建 `useRef()` 的初始值。**举个例子，或许你想确保某些命令式的 class 实例只被创建一次：

```js
function Image(props) {
  // ⚠️ IntersectionObserver 在每次渲染都会被创建
  const ref = useRef(new IntersectionObserver(onIntersect));
  // ...
}
```

`useRef` **不会** 像 `useState` 那样接受一个特殊的函数重载。相反，你可以编写你自己的函数来创建并将其设为惰性的：

```js
function Image(props) {
  const ref = useRef(null);

  // ✅ IntersectionObserver 只会被惰性创建一次
  function getObserver() {
    if (ref.current === null) {
      ref.current = new IntersectionObserver(onIntersect);
    }
    return ref.current;
  }

  // 当你需要时，调用 getObserver()
  // ...
}
```

这避免了我们在一个对象被首次真正需要之前就创建它。如果你使用 Flow 或 TypeScript，你还可以为了方便给 `getObserver()` 一个不可为 null 的类型。

### Hook 会因为在渲染时创建函数而变慢吗？

不会。在现代浏览器中，闭包和类的原始性能只有在极端场景下才会有明显的差别。

除此之外，可以认为 Hook 的设计在某些方面更加高效：

- Hook 避免了 class 需要的额外开支，像是创建类实例和在构造函数中绑定事件处理器的成本。
- **符合语言习惯的代码在使用 Hook 时不需要很深的组件树嵌套**。这个现象在使用高阶组件、render props、和 context 的代码库中非常普遍。组件树小了，React 的工作量也随之减少。

传统上认为，在 React 中使用内联函数对性能的影响，与每次渲染都传递新的回调会如何破坏子组件的 `shouldComponentUpdate` 优化有关。Hook 从三个方面解决了这个问题。

- [`useCallback`](https://zh-hans.legacy.reactjs.org/docs/hooks-reference.html#usecallback) Hook 允许你在重新渲染之间保持对相同的回调引用以使得 `shouldComponentUpdate` 继续工作：

  ```js
  // 除非 `a` 或 `b` 改变，否则不会变
  const memoizedCallback = useCallback(() => {  doSomething(a, b);
  }, [a, b]);
  ```

- [`useMemo`](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#how-to-memoize-calculations) Hook 使得控制具体子节点何时更新变得更容易，减少了对纯组件的需要。

- 最后，[`useReducer`](https://zh-hans.legacy.reactjs.org/docs/hooks-reference.html#usereducer) Hook 减少了对深层传递回调的依赖，正如下面解释的那样。

### 如何避免向下传递回调？

我们已经发现大部分人并不喜欢在组件树的每一层手动传递回调。尽管这种写法更明确，但这给人感觉像错综复杂的管道工程一样麻烦。

在大型的组件树中，我们推荐的替代方案是通过 context 用 [`useReducer`](https://zh-hans.legacy.reactjs.org/docs/hooks-reference.html#usereducer) 往下传一个 `dispatch` 函数：

```js
const TodosDispatch = React.createContext(null);

function TodosApp() {
  // 提示：`dispatch` 不会在重新渲染之间变化  const [todos, dispatch] = useReducer(todosReducer);
  return (
    <TodosDispatch.Provider value={dispatch}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}
```

`TodosApp` 内部组件树里的任何子节点都可以使用 `dispatch` 函数来向上传递 actions 到 `TodosApp`：

```js
function DeepChild(props) {
  // 如果我们想要执行一个 action，我们可以从 context 中获取 dispatch。  const dispatch = useContext(TodosDispatch);
  function handleClick() {
    dispatch({ type: 'add', text: 'hello' });
  }

  return (
    <button onClick={handleClick}>Add todo</button>
  );
}
```

总而言之，从维护的角度来这样看更加方便（不用不断转发回调），同时也避免了回调的问题。像这样向下传递 `dispatch` 是处理深度更新的推荐模式。

注意，你依然可以选择将应用的 *state* 作为 props（更显明确）向下传递或者使用 context（对很深的更新而言更加方便）向下传递。如果你选择使用 context 来向下传递 state，请使用两种不同的 context 类型传递 state 和 dispatch —— 由于 `dispatch` context 永远不会变，因此读取它的组件不需要重新渲染，除非这些组件也需要用到应用程序的 state。

### 如何从 `useCallback` 读取一个经常变化的值？

> 注意
>
> 我们推荐 [在 context 中向下传递 `dispatch`](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down) 而非在 props 中使用独立的回调。下面的方法仅仅出于文档完整性考虑，以及作为一条出路在此提及。

在某些罕见场景中，你可能会需要用 [`useCallback`](https://zh-hans.legacy.reactjs.org/docs/hooks-reference.html#usecallback) 记住一个回调，但由于内部函数必须经常重新创建，记忆效果不是很好。如果你想要记住的函数是一个事件处理器并且在渲染期间没有被用到，你可以 [把 ref 当做实例变量](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables) 来用，并手动把最后提交的值保存在它当中：

```js
function Form() {
  const [text, updateText] = useState('');
  const textRef = useRef();

  useEffect(() => {
    textRef.current = text; // 把它写入 ref  });

  const handleSubmit = useCallback(() => {
    const currentText = textRef.current; // 从 ref 读取它    alert(currentText);
  }, [textRef]); // 不要像 [text] 那样重新创建 handleSubmit

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}
```

这是一个比较麻烦的模式，但这表示如果你需要的话你可以用这条出路进行优化。如果你把它抽取成一个自定义 Hook 的话会更加好受些：

```js
function Form() {
  const [text, updateText] = useState('');
  // 即便 `text` 变了也会被记住:
  const handleSubmit = useEventCallback(() => {    alert(text);
  }, [text]);

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}

function useEventCallback(fn, dependencies) {  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}
```

无论如何，我们都 **不推荐使用这种模式** ，只是为了文档的完整性而把它展示在这里。相反的，我们更倾向于 [避免向下深入传递回调](https://zh-hans.legacy.reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down)。

## 底层原理

### React 是如何把对 Hook 的调用和组件联系起来的？

React 保持对当前渲染中的组件的追踪。多亏了 [Hook 规范](https://zh-hans.legacy.reactjs.org/docs/hooks-rules.html)，我们得知 Hook 只会在 React 组件中被调用（或自定义 Hook —— 同样只会在 React 组件中被调用）。

每个组件内部都有一个「记忆单元格」列表。它们只不过是我们用来存储一些数据的 JavaScript 对象。当你用 `useState()` 调用一个 Hook 的时候，它会读取当前的单元格（或在首次渲染时将其初始化），然后把指针移动到下一个。这就是多个 `useState()` 调用会得到各自独立的本地 state 的原因。
