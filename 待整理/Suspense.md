### Suspense

```js
// 传统代码问题：首次加载全部组件，造成渲染树的依赖关系比较复杂，首次加载内容较多
// 解决：使用 React.lazy() 按照需要加载组件（数据获取到再渲染组件）
// 然后 Suspense 是 React.lazy 的配套语法（在懒加载过程中，顶层显示一个 fallback loading 状态）
const AComponent = React.lazy(() => import('./AComponent'));
const BComponent = React.lazy(() => import('./BComponent'));

function MyComponent () {
  return (
    <Suspense fallback={<div><Loading/></div>}>
      <section>
        <AComponent/>
        <BComponent/>
      </section>
    </Suspense>
  );
}
```

### `React.Suspense`

`React.Suspense` 可以指定加载指示器（loading indicator），以防其组件树中的某些子组件尚未具备渲染条件。在未来，我们计划让 `Suspense` 处理更多的场景，如数据获取等。你可以在 [我们的路线图](https://zh-hans.reactjs.org/blog/2018/11/27/react-16-roadmap.html) 了解这一点。

如今，懒加载组件是 `<React.Suspense>` 支持的唯一用例：

```
// 该组件是动态加载的
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // 显示 <Spinner> 组件直至 OtherComponent 加载完成
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

它已被收录在了我们的[代码分割指南](https://zh-hans.reactjs.org/docs/code-splitting.html#reactlazy)中。请注意，`lazy` 组件可以位于 `Suspense` 组件树的深处——它不必包装树中的每一个延迟加载组件。最佳实践是将 `<Suspense>` 置于你想展示加载指示器（loading indicator）的位置，而 `lazy()` 则可被放置于任何你想要做代码分割的地方。

> 注意
>
> 对于已经展示给用户的内容来说，在切换回去时，展示加载指示器可能会让人困惑。有时，在准备新的 UI 时，展示 “旧” 的 UI 可能会更加友好。要做到这一点，你可以使用新的 transition API [`startTransition`](https://zh-hans.reactjs.org/docs/react-api.html#starttransition) 和 [`useTransition`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usetransition) 来将标记更新为 transitions，同时避免意外的兜底方案。

#### 

### `React.lazy`

`React.lazy()` 允许你定义一个动态加载的组件。这有助于缩减 bundle 的体积，并延迟加载在初次渲染时未用到的组件。

你可以在[代码分割文档](https://zh-hans.reactjs.org/docs/code-splitting.html#reactlazy)中学习如何使用它。查阅[此文章](https://medium.com/@pomber/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d)可以了解更多用法细节。

```
// 这个组件是动态加载的
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

请注意，渲染 `lazy` 组件依赖该组件渲染树上层的 `<React.Suspense>` 组件。这是指定加载指示器（loading indicator）的方式。