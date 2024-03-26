# React 学习笔记目录

待更新

未来可以做一个入口，然后包括这些全部的工具，便于后续使用测试。

早期其他的库的 demo 做过一次，最好整理一下，应该在 third-party-lib，这部分最好统一编译后放在博客入口中。

~~~txt
├── react-data-grid 网格数据
├── react-dnd 拖拽组件
│   ├── react-dnd-DragLayer 拖拽层
│   ├── react-dnd-DragSource 拖拽源
│   ├── react-dnd-DropTarget 拖拽目标
├── react-mentions @提醒
├── react-motion 动画效果
├── react-other-lib
│   ├── Create-React-App React CLI
│   ├── React Image Lightbox 预览图片
│   ├── React使用axios进行ajax操作 axios发出请求
│   ├── React快捷输入
│   ├── React点击事件改变DOM方法
│   ├── TS-React-Webpack
│   ├── gojs-react
│   ├── jsx语法
│   ├── react+graphql实现github dashboard
│   ├── react-axios
│   ├── react-lazy-load 懒加载
│   └── react-redux redux实现状态转换
├── react-response 响应式屏幕
├── react-router 路由
├── react-select 选择器组件
├── react-transition-group 动画过渡效果
├── reactstrap UI 组件库
├── res
├── slate-react Slate 富文本库
├── tic-tac-toe 官网案例
├── 中文文档
│   ├── 2-10 状态提升：把公共状态提升到父组件，状态驱动组件更新
│   ├── 2-11 组合 vs 继承：不同组件组合形成大组件，基本不会使用到继承（直接继承React.Component即可）
│   ├── 2-4 组件 & Props：父子组件传值的方式（减少不必要的性能）
│   ├── 2-5 State & 生命周期：生命周期函数内部处理不同的事件；不同state
│   ├── 2-6 事件处理：事件回调函数；事件监听；eventBus全局响应
│   ├── 2-7 条件渲染：三目运算符渲染部分组件
│   ├── 2-8 列表 & Keys：列表渲染需要加上key，提升性能
│   ├── 2-9 表单：label + Input Submit 如果是复杂的表单，需要对应多个状态，或者使用REF获取内容
├── 英文文档（没有看）
├── 高级文档
│   ├── React FAQ
│   ├── React PureComponent 使用指南：纯组件，内部已经实现了shouldComponentUpdate函数，注意简单数据和复杂对象的识别，主要使用在叶组件中，优化性能。
│   ├── React 的 PureComponent 与 Component（优化性能）
│   ├── React 各种bug 会实时更新
│   ├── React 高阶组件（一个组件中，参数是一个组件，返回值是一个组件，对原始组件进行封装处理）
│   ├── React 中的事件处理
│   ├── React-Design Principles：设计原理
│   ├── React-Hooks：useState useEffect：在函数组件中使用CLASS的方法和state
│   ├── React-Suspense的实现与探讨
│   ├── React-advanced-guides
│   ├── React-高阶API
│   ├── React.Component
│   ├── ReactChildren：父组件传递到子组件的部分，可以遍历渲染，可以判断个数等
│   ├── React事件：把原生事件封装后显示
│   ├── React数据流：自顶向下的数据流
│   ├── React获取尺寸：通过REF获取DOM元素，然后获取尺寸（注意是否能获取到REF元素）
│   ├── React新生命周期--getDerivedStateFromProps（componentWillReceiveProps的替代静态方法）
│   ├── Refs & DOM（获取DOM节点）
│   ├── getDerivedStateFromProps的使用
│   ├── react 中通过ref获取高阶（HOC）子组件实例的解决方案
│   ├── react 项目结构及编码规范
│   ├── reactjs源码分析-上篇（首次渲染实现原理）
│   └── reactjs源码分析-下篇（更新机制实现原理）：DIFF算法
└── 中文文档（关键）
  ├── 0 目录
  ├── 3-1 无障碍辅助功能：色彩搭配，盲人阅读器
  ├── 3-2 代码打包分割：webpack 设置多个入口文件，不同文件解析压缩不同
  ├── 3-3 Context
  ├── 3-4 错误边界：Error boundary 监测内部组件的报错信息，并显示错误提示界面
  ├── 3-5 Refs 转发：父组件获取子组件的DOM节点
  ├── 3-6 Fragments
  ├── 3-7 高阶组件：组件的参数是组件，返回值是封装好的另一个组件
  ├── 3-8 与第三方库协同：jquery
  ├── 3-9 深入 JSX：语法，展开符号
  ├── 3-10 Optimizing Performance：性能优化
  ├── 3-11 Portals
  ├── 3-12 Profiler API
  ├── 3-13 不使用 ES6
  ├── 3-14 不使用 JSX 的 React
  ├── 3-15 协调：DIFF 算法
  ├── 3-16 Refs and the DOM
  ├── 3-17 Render Props
  ├── 3-18 静态类型检查
  ├── 3-19 严格模式
  ├── 3-20 使用 PropTypes 进行类型检查
  ├── 3-21 非受控组件
  ├── 3-22 Web Components
  ├── 4-1 React 顶层 API
  ├── 4-2 React.Component
  ├── 4-3 ReactDOM
  ├── 4-4 ReactDOMServer
  ├── 4-5 DOM 元素
  ├── 4-6 合成事件
  ├── 4-7 Test Utilities
  ├── 4-8 Test Renderer
  ├── 4-9 JavaScript 环境要求
  ├── 4-10 React 术语词汇表
  ├── 5-1 Hook 简介
  ├── 5-2 Hook 概览
  ├── 5-3 使用 State Hook
  ├── 5-4 使用 Effect Hook
  ├── 5-5 Hook 规则
  ├── 5-6 自定义 Hook
  ├── 5-7 Hook API 索引
  ├── 5-8 Hooks FAQ
  ├── 6-1 测试概览
  ├── 6-2 测试技巧
  ├── 6-3 测试环境
  ├── 7-1 AJAX and APIs
  ├── 7-2 Babel，JSX 及构建过程
  ├── 7-3 传递函数给组件
  ├── 7-4 组件状态
  ├── 7-5 样式与 CSS
  ├── 7-6 项目文件结构
  ├── 7-7 Virtual DOM 及内核
~~~

其他经常使用的工具库

~~~bash
npm install react-router-dom localforage match-sorter sort-by
~~~

