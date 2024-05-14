# CSDN React 博客文档链接

这部分是 CSDN 上本人整理总结的 React 相关文档，点击可以直接跳转。

## [React ref is null 错误解决](https://blog.csdn.net/weixin_41697143/article/details/107618019)

React 中通常使用 state 状态驱动，对于 DOM 尺寸和界面动画等，通常使用 Ref 获取对应的节点并操作。
最近遇到一个问题，REF 已经绑定，但是是 NULL，获取不到对应的 DOM 元素，React ref.current is null，这里分析如何排查问题和解决问题。



## [React 的 PureComponent 与 Component 区别](https://blog.csdn.net/weixin_41697143/article/details/104551377)

在 React 中，Component 和 PureComponent 有一些区别，官方的解释如下：React.Component is the base class for React components when they are defined using ES6 classes。主要是渲染纯组件和普通组件。纯组件：当 props 变化时组件自动进行一次浅对比，类似的函数组件也是类似的。



## [Vue和React中生命周期和钩子函数](https://blog.csdn.net/weixin_41697143/article/details/80978695)

生命周期和钩子函数是两个重要的概念，这里简单列举对比了生命周期函数。



## [Create React App 自动创建 SPA 项目](https://blog.csdn.net/weixin_41697143/article/details/103215620)

Create React App is an officially supported way to create single-page React applications. It offers a modern build setup with no configuration。Create React App 是官方推荐的创建SPA的库。不需要任何的配置，直接完成创建打包。



## [React 与 VUE 数据传输对比](https://blog.csdn.net/weixin_41697143/article/details/102806849)

React中主要使用组件进行数据传输，组件的数据存储在props和state中，进行自上而下单向数据传递。父子组件的传值，关键是理解 React 的状态驱动，以及子组件向父组件传值的三种方式。



## [React-mentions 基本使用](https://blog.csdn.net/weixin_41697143/article/details/96875130)

最近需要做一个类似微博评论功能@用户的功能，手写JS的效率很低，所以使用 React-mentions 库实现这个功能。看了一下网上没中文介绍，所以自己看完英文介绍简单总结一个中文介绍。



## [React中使用LocalStorage用户登录](https://blog.csdn.net/weixin_41697143/article/details/98479748)

localStorage 通常用来存储服务器发送的一些数据或者用户自定义数据。localStorage 中的键值对总是以字符串的形式存储。 (意味着数值类型会自动转化为字符串类型)。

与 cookie 相比，localStorage 的存储量较大（cookie只有2k，只能存放字符串），下面介绍如何使用 localStorage 存储、获取、使用数据。



## [React-Router 学习](https://blog.csdn.net/weixin_41697143/article/details/89027067)

React-router 解决问题：UI与URL解耦

问题：原始同一个界面内部使用 a 进行跳转，不同界面中使用 # hash 跳转。如果在React框架下，对于SPA，需要获取界面的 hash 再判断界面中加载什么部分（setState），这样效率低下，UI 与 URL 不分离。
解决：首先使用`<Link to={path}>`作为超链接，点击后界面URL



## [Can't call setState (or forceUpdate) on an unmounted component ——React 内存泄漏问题处理](https://blog.csdn.net/weixin_41697143/article/details/88687133)

不能对于一个已经卸载的组件上使用setState改变状态，这将会造成应用的内存泄漏。

如果在react组件中设置了定制器或者在dom上绑定了事件，卸载组件时未清除定时器或未清除事件，或者在已经卸载的组件中设置setState，都会导致内存泄漏。解决方法：在componentWillUNmount 阶段中取消所有的异步任务（例如：SetState操作）。



## [Warning: setState(...): Can only update a mounted or mounting component 报错分析](https://blog.csdn.net/weixin_41697143/article/details/81839869)

在react中，前端通常需要向服务器发起异步请求，而在使用react的时候，如果这个组件最初加载的时候就发起这个异步请求，然后在返回结果中进行setState({})，这时候有可能会遇到这个警告：Warning: setState(...): Can only update a mounted or mounting component。



## [react框架如何优化代码(性能)？](https://blog.csdn.net/weixin_41697143/article/details/81840818)

render需要用到的属性放在state和props中。

减少 setstate：setstate会增加render的次数，从而影响性能。如果涉及到与视图层无关的属性，直接当做class实例的属性，而不是state的状态。这样改变这个属性不会造成页面重新的渲染。

浏览器的repaint和reflow会影响到性能。回流一定是重绘，重绘不一定是回流。所以减少不必要的回流和重绘。



## [React中获取元素位置](https://blog.csdn.net/weixin_41697143/article/details/82810451)

React框架使用虚拟DOM代替真实的DOM来优化性能，使用props和state进行属性传递。所以说在react中直接获取DOM元素的位置是不合理的（不利于性能）。那么使用下面的API：

`document.documentElement.getBoundingClientRect`



## [React Event 事件系统](https://blog.csdn.net/weixin_41697143/article/details/82810571)

React 标准化了事件对象，因此在不同的浏览器中都会有相同的属性。


组件createClass后创建的是许多方法组成的对象。组件中使用的方法分为React自有的方法与用户定义的方法。其中React自有方法是组件生命周期中的方法，如：render、componentWillUpdate、componentDidMount等。用户自定义的方法可以起符合JS命名规范的方法就可以。



## [propTypes 数据类型检验](https://blog.csdn.net/weixin_41697143/article/details/83589965)

在 react 中，不同组件通过props进行单向传值；不同值类型可能造成不必要的麻烦。

在 JS 中，不同的数据类型可能存在强制数据类型转换。这些问题在写代码的时候不容易发现，如果界面中出现了数据类型的问题，不好找到问题的原因。所以，引入propTypes，对于引入的props数据类型。



## [React 受控组件](https://blog.csdn.net/weixin_41697143/article/details/84447925)

React 受控组件：在原生的HTML中，`input（type=‘text’） textarea select` 三个元素的内部的属性可以随着用户的输入变化。react 中使用 state 控制属性的变化，将原生的受控组件和 react 中 state 结合。



## [React 状态提升](https://blog.csdn.net/weixin_41697143/article/details/84447991)

react是一个数据单向传值的框架，子组件不能直接给父组件传值。

如果内部多个子组件共同使用相同的数据，并且互相影响。那么可以将这部分共有的数据存放在父组件的属性中，将handleChange作为props传递给子组件。不同子组件会更改福钻进的某个参数，这部分参数会影响其他子组件的行为。确保父组件内部的数据改变会改变子组件的属性。



## [React 理念与开发流程](https://blog.csdn.net/weixin_41697143/article/details/84448049)


静态界面：使用props进行单向数据传递，从顶向下进行数据传递，不需要使用state。

动态界面：使用props进行从上到下传递（repoID），state进行组件内部的数据产生和传递（comment）。简单界面使用从上到下的开发过程，复杂界面使用从下到上的开发流程。尽量减少state使用：确定state的使用位置，确定使用state的组件。



## [React 避免重新渲染-性能优化](https://blog.csdn.net/weixin_41697143/article/details/84847655)

React框架运行的原理：界面受到数据驱动，state 和 props 的改动会造成界面的改动。其中，state 是自身的属性，props 是父组件提供的参数。如果界面内容很多，很小的数据变化会造成界面的重绘，那么造成性能的浪费。下面从几个方面总结一下如何避免重新渲染。



## [如何学习React框架](https://blog.csdn.net/weixin_41697143/article/details/85211109)

学习react前需要有基本的 html+css+js 的 基础。如何学习 React 框架及相关知识。



## [React 高阶 API 学习](https://blog.csdn.net/weixin_41697143/article/details/85212664)

React 官方内置的高级 API 和主要使用场景。



## [React-select 基本功能学习](https://blog.csdn.net/weixin_41697143/article/details/87632085)

在 React 中的选择框主要使用 React-select，See react-select.com for live demos and comprehensive docs.



## [设置 cookie 用户信息](https://blog.csdn.net/weixin_41697143/article/details/88019260)

说明：cookie 用于在本地存储浏览器的信息。当浏览器发送请求时，将cookie共同发送到请求中。服务器可以获取当前用户信息。document.cookie 即可获取界面中的 cookies。cookie 数据类型是字符串，需要将字符串转化成对象的形式获取对应的属性。



## [React中loading界面处理](https://blog.csdn.net/weixin_41697143/article/details/81837145)

设置loading界面，如果用户网络状况一般，或者用户执行请求操作频繁，可以让用户减少等待时间，有利于提升用户体验。那么具体怎样实现loading界面呢？方案一：在react框架中，根据组件的生命周期，在componentdidmount进行判断。



## [Ant design mobile Actionsheet 组件的思考和改进](https://blog.csdn.net/weixin_41697143/article/details/104669017)

使用蚂蚁金服的 ant-design React UI 组件库的移动端组件时，最近遇到一个问题的改进和思考。



## [package.json scripts 脚本使用指南](https://blog.csdn.net/weixin_41697143/article/details/104029573)

Node 开发离不开 npm，而脚本功能是 npm 最强大、最常用的功能之一。本文介绍如何使用 npm 脚本（npm scripts）。npm 允许在package.json文件里面，使用scripts字段定义脚本命令。



## [JS 判断元素父子关系](https://blog.csdn.net/weixin_41697143/article/details/103631213)

如果界面元素很多，如何判断当前点击的元素，和某个元素是否有父子关系？

可以看到有20个DIV在嵌套。如果界面发生一个点击事件，在document 监听到这个点击事件，怎样判断点击位于哪个父元素下面？原生JS中可以使用 dom.contains(dom) 来判断是否。



## [fetchMetadata: sill mapToRegistry 报错 create-react-app 执行慢的解决方法](https://blog.csdn.net/weixin_41697143/article/details/102885261)

使用 create-react-app 库进行 React 项目初始化时，有时候会显示网络问题造成无法安装。

问题原因：执行 create-react-app 会安装相关依赖（react react-dom react-scripts 等）。如果是默认的配置，那么使用国外的 npm 源进行安装。

解决方案：把 npm 的源改成国内淘宝的源。



## [React data grid](https://blog.csdn.net/weixin_41697143/article/details/89556630)

主要功能：界面显示 Excel 预览，可以将一个对象或者 json 格式化成为界面。



## [Warning: A component is changing an uncontrolled input of type text to be controlled 报错分析](https://blog.csdn.net/weixin_41697143/article/details/89374791)

Warning: A component is changing an uncontrolled input of type text to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa).

在 React 框架中会报这样的错误，受控组件和非受控组件的分析。



## [报错 Preset files are not allowed to export objects 处理](https://blog.csdn.net/weixin_41697143/article/details/91491250)

在使用 webpack 和 babel 编译 react项目时，会报 Preset files are not allowed to export objects 错误。查阅资料，主要是不同版本的 babel 不能兼容使用(版本6和版本7不兼容)。



## [GG-Editor介绍-在线绘图软件](https://blog.csdn.net/weixin_41697143/article/details/88181212)

在浏览器中预览编辑复杂图形时，推荐一个 GG-editor 插件。这个插件基于 React 框架，使用方便，可以创建编辑思维导图、流程图、拓扑图等图形。
