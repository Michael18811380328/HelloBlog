# React 18 超全升级指南

## 升级步骤

1、确定升级版本号。从 16-17 变化较小，17-18 变化较大。建议逐步升级。

2、已有项目代码拆分。小项目不需要拆分，大项目最好拆分成多个小项目，便于调试分别升级等。

3、升级 react 和 react-dom 版本，升级 react-router, react-dnd, react-rudux 等官方第三方库。

4、保留核心代码，注释插件，第三方库等进行测试。

5、逐步升级插件，第三方库（ant-design），并更新依赖版本。

6、整体联调，测试整个项目版本。

如果存在多个子项目，依赖关系层级很多，先整理依赖树，从依赖树的叶子结点（例如 lodash 等工具库，UI 库）进行升级，然后升级核心组件。



具体参考这篇短文（React17 升级到 React18 介绍）：https://juejin.cn/post/7078511027091931167

## 升级

使用 `yarn` 要安装最新的 `React 18`：

```bash
yarn add react react-dom
```

## 变更

### createRoot

`React 18` 提供了两个根 API，我们称之为 `Legacy Root API` 和 `New Root API`。

- `Legacy root API`： 即 `ReactDOM.render`。这将创建一个以“遗留”模式运行的 `root`，其工作方式与 `React 17` 完全相同。使用此 API 会有一个警告，表明它已被弃用并切换到 `New Root API`。
- `New Root API`： 即 `createRoot`。 这将创建一个在 `React 18` 中运行的 `root`，它添加了 `React 18` 的所有改进并允许使用并发功能。

我们以 `Vite + TS` 作为脚手架启动项目。项目启动后你会在控制台中看到一个警告：

![1.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/296c6e0a7abc4e9e996ca65c4c07fe14~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

也就意味着你可以直接将项目升级到 `React 18` 版本而不会直接造成 `break change`。因为它仅仅给予了一个警告，并且在整个 `18` 版本中都为可用兼容状态，并保持着 `React 17` 版本的特性。

为什么要这样做呢？ 因为仅仅为项目升级的话比较干脆利落，遇见一个地方改一个地方，无历史包袱。但是 `React` 组件生态非常庞大，很多组件会用到 `ReactDOM.render` 直接渲染，比如常见 UI 库中的 `Modal.confirm` 类似的 API，这时就需要一个版本的周期让这些生态组件升级上来。

```js
// React 17
import ReactDOM from 'react-dom';
const container = document.getElementById('app');
// 装载
ReactDOM.render(<App tab="home" />, container);
// 卸载
ReactDOM.unmountComponentAtNode(container);


// React 18
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);
// 装载
root.render(<App tab="home" />);
// 卸载
root.unmount();
```

还不得不说 `createRoot` API 和 `Vue3` 的 `createApp` 形式一模一样。

FAQ: 在 `TypeScript`， `createRoot` 中参数 `container` 可接收 `HTMLElement` ，但不能为空。使用要么断言，要么加判断吧~

### 服务端渲染

#### hydrateRoot

如果的应用使用带注水的服务端渲染，请升级 `hydrate` 到 `hydrateRoot`

```js
const root = hydrateRoot(container, <App tab="home" />);
// 这里无需执行 root.render
```

在此版本中，也改进了 `react-dom/serverAPI` 以完全支持服务器上的 `Suspense` 和流式 `SSR`。作为这些更改的一部分，将弃用旧的 `Node` 流式 `API`，它不支持服务器上的增量 `Suspense` 流式传输。

- `renderToNodeStream` => `renderToPipeableStream`
- 新增 `renderToReadableStream` 以支持 `Deno`
- 继续使用 `renderToString` (对 `Suspense` 支持有限)
- 继续使用 `renderToStaticMarkup` (对 `Suspense` 支持有限)

### setState 同步/异步

这是 `React` 此次版本中最大的破坏性更新，并且**无法向下兼容**。

`React` 中的批处理简单来说就是将多个状态更新合并为一次重新渲染，以获得更好的性能，在 `React 18` 之前，`React` 只能在组件的生命周期函数或者合成事件函数中进行批处理。默认情况下，`Promise`、`setTimeout` 以及原生事件中是不会对其进行批处理的。如果需要保持批处理，则可以用 `unstable_batchedUpdates` 来实现，但它不是一个正式的 API。

`React 18` 之前：

```js
function handleClick() {
  setCount(1);
  setFlag(true);
  // 批处理：会合并为一次 render
}

function handleClick() {
  Promise.resolve().then(() => {
    setCount(2);
  });
  setFlag(false);
  // 同步模式：会执行两次 render
  // 并且在 setCount 后，在 setFlag 之前能通过 Ref 获取到最新的 count 值
}
```

在 `React 18` 上面的第二个例子只会有一次 `render`，因为所有的更新都将自动批处理。这样无疑是很好的提高了应用的整体性能。**不过以下例子会在 `React 18` 中执行两次 render**：

```js
async function handleClick() {
  await setCount(2);
  setFlag(false);
  // React 18：会执行两次 render
}
```

### flushSync

如果我想在 `React 18` 退出批处理该怎么做呢？官方提供了一个 API `flushSync`。

`flushSync<R>(fn: () => R): R` 它接收一个函数作为参数，并且允许有返回值。

```js
function handleClick() {
  flushSync(() => {
    setCount(3);
  });
  // 会在 setCount 并 render 之后再执行 setFlag
  setFlag(true);
}
```

注意：**`flushSync` 会以函数为作用域，函数内部的多个 `setState` 仍然为批量更新**，这样可以精准控制哪些不需要的批量更新：

```js
function handleClick() {
  flushSync(() => {
    setCount(3);
    setFlag(true);
  });
  // setCount 和 setFlag 为批量更新，结束后
  setLoading(false);
  // 此方法会触发两次 render
}
```

这种方式会比 `React 17` 及以前的方式更优雅的颗粒度控制 `rerender`。

`flushSync` 再某些场景中非常有用，比如在点击一个表单中点击保存按钮，并触发子表单关闭，并同步到全局 `state`，状态更新后再调用保存方法：

子表单：

```js
js

export default function ChildForm({ storeTo }) {
  const [form] = Form.useForm();

  // 当前组件卸载时将子表单的值同步到全局
  // 若要触发父组件同步 setState，必须使用 useLayoutEffect
  useLayoutEffect(() => {
    return () => {
      storeTo(form.getFieldsValue());
    };
  }, []);

  return (
    <Form form={form}>
      <Form.Item name="email">
        <Input />
      </Form.Item>
    </Form>
  );
}
```

外部容器：

```jsx
<div
  onClick={() => {
    // 触发子表单卸载关闭
    flushSync(() => setVisible(false));
    // 子表单值更新到全局后，触发保存方法，可以保证 onSave 获取到最新填写的表单值
    onSave();
  }}
>
  保存
</div>
<div>{visible && <ChildForm storeTo={updateState} />}</div>
```

不过 `unstable_batchedUpdates` 在 `React 18` 中将继续保留整个版本，因为许多开源库用了它。

### 已卸载组件更新状态警告

我们在正常开发时难免会出现以下错误：

![2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/802ea605e2394982b644d6ff824a86b2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这个警告被广泛误解并且有些误导。原本旨在针对如下场景：

```js
js

useEffect(() => {
  function handleChange() {
    setState(store.getState());
  }
  store.subscribe(handleChange);
  return () => store.unsubscribe(handleChange);
}, []);
```

如果您忘记了 `unsubscribe` 效果清理中的调用，则会发生内存泄漏。在实践中，上述情况并不常见。这在我们的代码中更为常见：

```js
js

async function handleSubmit() {
  setLoading(true);
  // 在我们等待时组件可能会卸载
  await post('/some-api');
  setLoading(false);
}
```

在这里，警告也会触发。但是，在这种情况下，**警告具有误导性**。

这里没有实际的内存泄漏，`Promise` 会很快 `resolve`，之后它可以被垃圾回收。为了抑制这个警告，我们可能会写很多 `isMounted` 无用的判断，会使代码变得更加复杂。

在 `React 18` 中这个警告已经被移除掉了。

### 组件返回 null

在 `React 17` 中，如果组件在 `render` 中返回了 `undefined`，`React` 会在运行时抛出一个错误：

```js
js

function Demo() {
  return undefined;
}
```

![3.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e262eb92c9f344d29236c7b79b7c4ce9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这里我们可以把 `undefined` 换成 `null`，程序将继续运行。此行为的目的是帮助用户发现意外忘记 `return` 语句的常见问题。对于 `React 18` 的 `Suspense fallback` 会出现 `undefined` 而不报错从而导致出现不一致。

现在类型系统和 `Eslint` 都非常健壮可以很好避免这类低级错误，因此 `React 18` 不再检查因返回 `undefined` 而导致崩溃。

### StrictMode

> 从 React 17 开始，React 会自动修改控制台方法，例如 console.log() 在第二次调用生命周期函数时使日志静音。但是，在某些可以使用变通方法的情况下，它可能会导致不良行为。

这这种行为在 `React 18` 中已经移除，如果安装了 `React DevTools > 4.18.0`，那么第二次渲染期间的日志现在将以柔和的颜色显示在控制台中。

![4.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e78285c702f343d1a453c0f7cc2c3635~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## 新 API

### useSyncExternalStore

`useSyncExternalStore` 经历了一次修改，由 `unstable_useMutableSource` 改变而来，用于订阅外部数据源。主要帮助有外部 `store` 需求的开发者解决撕裂问题。

一个监听 `innerWidth` 变化的 `hook` 最简单例子：

```tsx
tsx

import { useMemo, useSyncExternalStore } from 'react';

function useInnerWidth(): number {
  // 保持 subscribe 固定引用，避免 resize 监听器重复执行
  const [subscribe, getSnapshot] = useMemo(() => {
    return [
      (notify: () => void) => {
        // 真实情况这里会用到节流
        window.addEventListener('resize', notify);
        return () => {
          window.removeEventListener('resize', notify);
        };
      },
      // 返回 resize 后需要的快照
      () => window.innerWidth,
    ];
  }, []);
  return useSyncExternalStore(subscribe, getSnapshot);
}
tsx

function WindowInnerWidthExample() {
  const width = useInnerWidth();

  return <p>宽度: {width}</p>;
}
```

Demo 地址：[codesandbox.io/s/usesyncex…](https://link.juejin.cn?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Fusesyncexternalstore-demo-q47kyn)

`React` 自身 `state` 已经原生的解决的并发特性下的撕裂(tear) 问题。`useSyncExternalStore` 主要对于框架开发者，比如 `redux`，它在控制状态时可能并非直接使用的 `React` 的 `state`，而是自己在外部维护了一个 `store` 对象，脱离了 `React` 的管理，也就无法依靠 `React` 自动解决撕裂问题。因此 `React` 对外提供了这样一个 API。

目前 `React-Redux 8.0` 已经基于 `useSyncExternalStore` 实现。

### useInsertionEffect

`useInsertionEffect` 的工作原理大致 `useLayoutEffect` 相同，只是此时无法访问 `DOM` 节点的引用。

因此推荐的解决方案是使用这个 `Hook` 来插入样式表（或者如果你需要删除它们，可以引用它们）：

```js
js

function useCSS(rule) {
  useInsertionEffect(() => {
    if (!isInserted.has(rule)) {
      isInserted.add(rule);
      document.head.appendChild(getStyleForRule(rule));
    }
  });
  return rule;
}
function Component() {
  let className = useCSS(rule);
  return <div className={className} />;
}
```

### useId

`useId` 是一个 API，用于在客户端和服务器上生成唯一 ID，同时避免水合不匹配。使用示例：

```js
js

function Checkbox() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>选择框</label>
      <input type="checkbox" name="sex" id={id} />
    </div>
  );
}
```

## Concurrent（并发） 模式

`Concurrent` 模式是一组 `React` 的新功能，可帮助应用保持响应，并根据用户的设备性能和网速进行适当的调整，该模式通过使渲染可中断来修复阻塞渲染限制。在 `Concurrent` 模式中，`React` 可以同时更新多个状态。

通常，当我们更新 `state` 的时候，我们会期望这些变化立刻反映到屏幕上。我们期望应用能够持续响应用户的输入，这是符合常理的。但是，有时我们会期望更新延迟响应在屏幕上。在 `React` 中实现这个功能在之前是很难做到的。`Concurrent` 模式提供了一系列的新工具使之成为可能。

### Transition

在 `React 18` 中，引入的一个新的 API `startTransition`，主要为了能在大量的任务下也能保持 UI 响应。这个新的 API 可以通过将特定更新标记为“过渡”来显着改善用户交互。

概览：

```js
js

import { startTransition } from 'react';

// 紧急：显示输入的内容
setInputValue(input);

// 标记回调函数内的更新为非紧急更新
startTransition(() => {
  setSearchQuery(input);
});
```

简单来说，就是被 `startTransition` 回调包裹的 `setState` 触发的渲染 被标记为不紧急渲染，这些渲染可能被其他紧急渲染所抢占。

一般情况下，我们需要通知用户后台正在工作。为此提供了一个带有 `isPending` 转换标志的 `useTransition`，`React` 将在状态转换期间提供视觉反馈，并在转换发生时保持浏览器响应。

```js
js

import { useTransition } from 'react';

const [isPending, startTransition] = useTransition();
```

该 `isPending` 值在转换挂起时为 `true`，这时可以在页面中放置一个加载器。

普通情况下：

![5.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a25327e5f6a4ff2a4a509adf4165477~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

使用 `useTransition` 表现：

![6.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d8f5d745d4d4b37a24bea01e0f47129~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

我们可以使用 `startTransition` 包装任何要移至后台的更新，通常，这些类型的更新分为两类：

1. **渲染缓慢**：这些更新需要时间，因为 `React` 需要执行大量工作才能转换 UI 以显示结果
2. **网络慢**：这些更新需要时间，因为 `React` 正在等待来自网络的一些数据。这个方式与 `Suspense` 紧密集成

网络慢场景：一个列表页，当我们点击 “下一页”，现存的列表立刻消失了，然后我们看到整个页面只有一个加载提示。可以说这是一个“不受欢迎”的加载状态。**如果我们可以“跳过”这个过程，并且等到内容加载后再过渡到新的页面，效果会更好**。

这里我们结合 `Suspense` 做加载边界处理：

```js
js

import React, { useState, useTransition, Suspense } from 'react';
import { fetchMockData, MockItem } from './utils';
import styles from './DemoList.module.less';

const mockResource = fetchMockData(1);

export default function DemoList() {
  const [resource, setResource] = useState(mockResource);
  const [isPending, startTransition] = useTransition();

  return (
    <Suspense fallback="加载中">
      <UserList resource={resource} />
      <button
        className={styles.button}
        type="button"
        onClick={() =>
          startTransition(() => {
            setResource(fetchMockData(2));
          })
        }
      >
        下一页
      </button>
      {isPending && <div className={styles.loading}>加载中</div>}
    </Suspense>
  );
}

function UserList({ resource }: UserListProps) {
  const mockList = resource.read();
  return (
    <div className={styles.list}>
      {mockList.map((item) => (
        <div key={item.id} className={styles.row}>
          <div className={styles.col}>{item.id}</div>
          <div className={styles.col}>{item.name}</div>
          <div className={styles.col}>{item.age} 岁</div>
        </div>
      ))}
    </div>
  );
}
```

结果展示：

![7.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/edba6a77d3b34886a3963ea240abe9f0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

Demo 地址：[codesandbox.io/s/usetransi…](https://link.juejin.cn?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Fusetransition-request-demo-wgedzw)

#### 把 `Transition` 融合到应用的设计系统

`useTransition` 是非常常见的需求。几乎所有可能导致组件挂起的点击或交互操作都需要使用 `useTransition`，以避免意外隐藏用户正在交互的内容。

这可能会导致组件存在大量重复代码。通常**建议把 `useTransition` 融合到应用的设计系统组件中**。例如，我们可以把 `useTransition` 逻辑抽取到我们自己的 `<Button>` 组件：

```js
js

function Button({ children, onClick }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      onClick();
    });
  }

  return (
    <button onClick={handleClick} disabled={isPending}>
      {children} {isPending ? '加载中' : null}
    </button>
  );
}
```

FAQ： `useTransition` 有个可选参数，可以设定超时时间 `timeoutMs`，但目前的 TS 类型没有开放。

### useDeferredValue

返回一个延迟响应的值，这通常用于在具有基于用户输入立即渲染的内容，以及需要等待数据获取的内容时，保持接口的可响应性。

```js
js

import { useDeferredValue } from 'react';

const deferredValue = useDeferredValue(value);
```

从介绍上来看 `useDeferredValue` 与 `useTransition` 是否感觉很相似呢？

- 相同：`useDeferredValue` 本质上和内部实现与 `useTransition` 一样都是标记成了延迟更新任务。
- 不同：`useTransition` 是把更新任务变成了延迟更新任务，而 `useDeferredValue` 是产生一个新的值，这个值作为延时状态。

那它和 `debounce` 有什么区别呢？

`debounce` 即 `setTimeout` 总是会有一个固定的延迟，而 `useDeferredValue` 的值只会在渲染耗费的时间下滞后，在性能好的机器上，延迟会变少，反之则变长。

## 结语

以上是本次 `React` 所升级的大致内容，主要围绕着并发模式而展开。赶快提前准备起来发布正式版后升级吧~

