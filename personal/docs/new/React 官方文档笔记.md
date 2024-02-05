# React 官方文档笔记

2024-01 学习

在线文档链接：https://zh-hans.react.dev/learn/installation

中文文档下载：https://github.com/reactjs/zh-hans.react.dev

最新稳定版版本：[18.2.0 (June 14, 2022)](https://github.com/facebook/react/releases/tag/v18.2.0)

React 是一个 UI view 渲染框架，不处理数据管理和存储，这部分需要其他的库实现。



通过最新文档，分析现在自己需要学的东西，分析现在项目中需要改进的东西。





# 快速入门

官方已经默认使用 函数组件 + hook 实现组件内部状态，没有使用类组件。

Hook 比普通函数更为严格。你只能在你的组件（或其他 Hook）的 **顶层** 调用 Hook。如果你想在一个条件或循环中使用 `useState`，请提取一个新的组件并在组件内部使用它。

在简单的例子中，自上而下构建通常更简单；而在大型项目中，自下而上构建更简单。

如何进行功能开发？原型设计稿——静态组件——自身state完善——props 交互修改

# 安装

如果你想完全用 React 构建一个新的应用或网站，我们建议选择社区中流行的、由 React 驱动的框架。这些框架提供大多数应用和网站最终需要的功能，包括路由、数据获取和生成 HTML。

Next.js ：**[Next.js](https://nextjs.org/) 是一个全栈式的 React 框架**。它用途广泛，可以让你创建任意规模的 React 应用——可以是静态博客，也可以是复杂的动态应用。请查看 [Next.js 课程](https://nextjs.org/learn)。Next.js 团队已经同意与我们合作，研究、开发、集成和测试与框架无关的 React 前沿功能，如 [React 服务器组件](https://zh-hans.react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-march-2023#react-server-components)。官方推荐。其他的还有 remix、Gatsby 框架，使用不多。

我可以在没有框架的情况下使用 React 吗？你当然可以在没有框架的情况下使用 React——这就是 [将 React 用于你页面的一部分](https://zh-hans.react.dev/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page)。**但是，如果你要用 React 构建一个新的应用或网站，我们建议使用一个框架**。

# 描述 UI

默认值，默认值仅在缺少 `size` prop 或 `size={undefined}` 时生效。 但是如果你传递了 `size={null}` 或 `size={0}`，默认值将 **不** 被使用。

~~~js
function Avatar({ person, size = 100 }) {
  // ...
}
~~~

多层传值时，可以使用 ...props 展开语法，**请克制地使用展开语法。** 如果你在所有其他组件中都使用它，那就有问题了。 通常，它表示你应该拆分组件，并将子组件作为 JSX 传递。 接下来会详细介绍！

~~~js
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
~~~

如果你的组件里有很多的嵌套式三目条件表达式，则需要考虑通过提取为子组件来简化这些嵌套表达式。

- 依赖树表示 React 应用程序中的模块依赖关系。
- 构建工具使用依赖树来捆绑必要的代码以部署应用程序。
- 依赖树有助于调试大型捆绑包带来的渲染速度过慢的问题，以及发现哪些捆绑代码可以被优化。



# 添加交互











# 状态管理





# 脱围机制 Escape Hatches

使用非 react 内部方法，处理需要的功能（例如处理界面滚动，处理视频播放，需要使用原生 JS 实现）

~~~js
// video 元素
if (isPlaying) {
  ref.current.play();
} else {
  ref.current.pause();
}
~~~

实际上，不使用 React 的方法，如何实现其他功能？

1、组件属性？使用 useRef 存储

2、操作 DOM 节点（获取计算尺寸位置等）；当State变化时，操作 DOM 节点

在渲染时，尽量计算，不要使用新的 State（name = firstName + lastName）

React 不允许组件访问其他组件的 DOM 节点。甚至自己的子组件也不行 使用 forwardRef API 可以实现这个功能

~~~js
const MyInput = forwardRef((props, ref) => {
 return <input {...props} ref={ref} />;
});
~~~

没有依赖数组作为第二个参数，与依赖数组位空数组 [] 的行为是不一致的：

~~~js
useEffect(() => {
 // 这里的代码会在每次渲染后执行
});

useEffect(() => {
 // 这里的代码只会在组件挂载后执行
}, []);

useEffect(() => {
 //这里的代码只会在每次渲染后，并且 a 或 b 的值与上次渲染不一致时执行
}, [a, b]);
~~~

这部分写的比较啰嗦，确实案例和细节很多，有些专有名词比较多。

看了前4小节





## Hooks 相关

**请确保你已经为你的项目启用了 [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) 规则**。这在 React 项目中是必备的，同时能帮助你及早的捕获较为严重的 bug。我们推荐的 [`eslint-config-react-app`](https://www.npmjs.com/package/eslint-config-react-app) preset 中已经集成了该规则。



## TS 相关

这部分在 TS_hooks 根据需要学习

https://zh-hans.react.dev/learn/typescript

hooks：useState, useEffect, useCallback, useMomo, useContext

type interface 验证参数类型



## 实用工具

1、如果你有 HTML 需要移植到 JSX 中，你可以使用 [在线转换器](https://transform.tools/html-to-jsx)。这个网站也支持其他格式转换。



## 代码细节

1、JSX 中条件语句，官方建议加上括号

~~~html
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
~~~

2、在 React 中，通常使用 `onSomething` 命名代表事件的 props，使用 `handleSomething` 命名处理这些事件的函数。

~~~html
<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
~~~

3、react-scripts CLI 可以初始化项目，很多配置是内部设置的，例如 babelrc，如果自定义配置 都是不生效的。如果需要自定义，需要 npm eject 后。



## 官方全部API参考

https://zh-hans.react.dev/reference/react/memo

