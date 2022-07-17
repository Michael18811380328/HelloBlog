# React 全家桶入门教程

前面是基础课程（难度小，略过），后面是案例

目的

1. 巩固react基础知识，查漏补缺（熟悉的部分快进）
2. 学习相关的库的使用

https://study.163.com/course/courseMain.htm?courseId=1210995818 共计126课时，2021年1月出品

### 第一章 React 基础

#### 01 react简介

React 是构建用户界面的框架。

前端工作包括：发送请求，处理数据，展示数据（使用DOM展现）。发出请求（ajax）、处理数据（算法优化，过滤排序算法）、渲染界面（React 将 JS 数据渲染成 HTML 视图的库）

React 只处理展示数据（把 state 转换成 DOM）。不管前两部分。

原生 JS 缺点：操作 DOM繁琐，性能较差（JS 直接操作 DOM，浏览器进行大量的重拍重绘）；jQuery 比较重，代码量很大；原生JS没有组件化方案，代码复用很低。

React 框架优点：组件化（提高组件复用率）、声明式开发；便于 ReactNative 进行移动端开发；虚拟 DOM 和 Diff 算法高性能。



#### 02 hello-react案例

- react.js React 核心库
- React-dom.js React 操作 DOM 的库
- babel.js 把ES6转换成ES5,把 JSX 转换成 JS

注意

1. HTML 引入顺序不能错
2. Script 这个 type （实际上不会这样写）
3. 内部是 JSX，不需要加引号（不是字符串 dom = '';）

~~~jsx
<script type="text/babel">
	let dom = <div></div>;
</script>
~~~



#### 03 虚拟DOM的两种创建方式

创建虚拟 DOM，可以使用 JSX 字面量（优先），或者使用 React API 创建。

~~~jsx
const VDOM = React.createElement('h1', {id: 'test'}, 'Hi');
ReactDOM.render(VDOM, document.getElementById('root'));

const vDOM2 = <div></div>;
~~~



#### 04 虚拟DOM与真实DOM

虚拟DOM就是 jsx 语法中创建的虚拟 DOM，真实 DOM 就是原生 JS 创建的 DOM。

~~~jsx
let virtualDOM = <div></div>;
let trueDOM = document.getElementById('test');
~~~

虚拟 DOM 特点：

1. 本质是一个对象（Object）
2. 虚拟DOM属性较少，真实DOM属性较多（例如尺寸和样式相关的API）因为虚拟DOM是 React 内部使用，所以不需要真实DOM上那么多的属性。操作虚拟DOM也更轻量化。
3. 最终 React 会把虚拟DOM，转换成真实DOM，渲染到浏览器中。



#### 05 jsx语法规则

jsx：javascript+XML 比传统的 HTML 严格，例如标签必须闭合；不能随便写自定义的标签。XML早期用于前后端传递数据的格式，可以使用XML或者JSON（JSON 可以 parse stringify 和字符串进行转换，主要使用后一种进行传输）。

JSX 语法规则

1. 虚拟DOM直接写标签DIV，不需要加引号（不是字符串）
2. 标签DIV内的 JS 表达式使用 大括号 {}
3. 使用 className 代替 class 类名
4. 样式使用 style = {{padding: 100}}
5. 只能有一个根标签
6. 标签必须闭合（自闭合或者成对）
7. 标签：小写字母表示HTML标签，大写字母开头表示组件（需要引入）如果没有HTML标签或者组件，那么react会报错。



#### 06 jsx小练习

JS 表达式是什么？和 JS 语句（代码）不一样

- 表达式：等号右侧的是表达式，也就是说这一段代码会输出一个结果（a, a + b, foo(a, b), arr.map(), function test() {} ）都是表达式。let a = 表达式;
- 语句：if for while switch 等语句结构，不会返回结果，这部分不能在 JSX 中使用

所以，三目运算法可以使用，if 判断无法使用

~~~jsx
<div>
	{
    arr.map((item) => {
      return (
      	<span key={item.id}>{item.value}</span>
      );
    })
  }
</div>
~~~

### 第二章 React 面向组件编程

#### 07 组件与模块

组件：界面中某个功能对应的代码

模块化；组件化；工程化

模块化：JS 封装成不同的部分；大型项目拆分成不同的模块，提高复用性

组件化：React组件拆分成不同的部分（根据功能拆分），拆分 JSX css JS 等



#### 08 开发者工具的安装

react 开发调试工具（Component 可以查看组件层级和 state props 等属性，Profiers 查看页面性能）

profiler 记录网站的性能（加载时间）



#### 09 函数式组件

~~~jsx
function Demo() {
  console.log(this);
  // 在函数组件中，经过babel编译后，是严格模式，所以 this 是 undefined
  return <span></span>;
}
ReactDOM.render(<Demo/>, document.getElementById('root'));
// ReactDOM.render 执行过程
// 1. 解析第一个参数，找到组件定义 Demo（函数组件）
// 2. 调用 Demo 函数，将返回值 虚拟 DOM 转换成真实 DOM
// 3. 解析第二个参数，将真实DOM渲染到页面上
~~~



#### 10 ES6 类

~~~js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  speak = () => {
    console.log(this.name + String(this.age));
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
  speak = () => {
    console.log(this.name + this.age + this.grade);
  }
}

const p1 = new Person('Bing', 10);
p1.speak();
const s1 = new Strudent("Andy", 20, 3);
s2.speak();
~~~



#### 11 类式组件

~~~jsx
class MyComponent extends React.Component {
  render() {
    return (
    	<span>test</span>
    );
  }
}

// <MyComponent />
~~~

遇到标签后，React 解析到是一个类，执行 new MyComponent 创建类的实例对象，调用 render 方法返回虚拟 DOM，然后渲染到页面上作为真实DOM节点。



2.2 state



#### 12-14 state 入门

state 是状态机，通过更新状态驱动页面更新

~~~jsx
class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHot: false,
    };
  }
  render() {
    return (<span></span>);
  }
}
~~~

原生事件绑定

~~~js
let dom = document.getElementById('btn1');
dom.addEventListener('click', () => {
  console.log('click btn1');
});

let dom2 = document.getElementById('btn2');
dom2.onClick = () => {
  console.log('click btn2');
}
~~~

React 中通常不直接获取DOM

~~~jsx
let dom = (<div onClick={this.onClick}></div>);
    
onClick = (e) => {
  console.log(1);
}
~~~



#### 15 类中方法中的this

#### 16 解决类中this指向问题

#### 17 setState的使用

react 中的函数需要绑定this（bind 或者 箭头函数），改变state 需要通过 setState 改变。

#### 18 state的简写方式

#### 19 总结state

18-19 state 中绑定 this 可以通过 bind 或者 箭头函数实现。因为界面调用的是原型对象上的函数，state 状态在实例对象上，所以需要通过改变 this 的方法，获取到实例对象上的属性。state 的简写：可以不放在构造器中，直接放在类中。简单组件可以这样使用，复杂组件为了明确状态和属性，最好放在 constructor 构造器中实现。



#### 21使用展开运算符批量传递 props

展开运算符使用

- 可以直接展开数组（复制数组）
- 不能直接展开对象；如果是 React 组件中传 props 可以使用展开运算符
- 在函数中可以表示不确定的参数，实现循环或者递归运算

~~~js
function sum(...numbers) {
  return numbers.reduce((pre, curr) => {
    return pre + curr;
  }, 0);
}

sum(1,2,3,4);
~~~

~~~jsx
let obj = { name: 'a', age: 19 };

// props 较多可以这样写，大括号并不是对象，是 jsx 的语法糖
<MyComponent {...obj}/>

// console.log(...obj); 不能直接展开对象打印到原生JS中
~~~

#### 22 限制 props 类型

使用 PropTypes 和 defaultProps 限制数据类型和默认值

#### 23 props 简写形式

#### 24 构造器

constructor 不是必须的，主要用于声明状态和绑定函数（bind）

~~~js
constructor (props) {
  super(props); // 实现继承
  this.state = {
    isFinished: false,
  };
  this.isChecked = React.createRef();
  this.fn = this.fn.bind(this); // 通常使用箭头函数
}
~~~

#### 25 函数式组件使用 props

函数式组件可以使用 props，hook 中可以使用 setEffect 设置状态，也可以限制数据类型。

~~~jsx
function Persion(props) {
  const { name, age } = props;
  return <span>{name}</span>;
}

Person.defaultProps = {
  age: 20,
};

<Person name={'Tom'} />
~~~





2.4 refs

#### 27字符串形式的ref

ref 在 react 中，就类似原生 JS 中的 ID，通过 ref 可以直接获取到对应的 DOMS。组件内的元素可以通过 ref 来标识自己。ref 创建有三种形式：字符串形式创建，回调函数创建，createRef 创建三种。最新 react 推荐使用第三种创建 refs。

使用字符串形式创建：创建使用 ref="test"，获取属性使用 this.refs 复数形式（一个组件内部有很多 refs）

~~~js
this.refs.input1
this.refs.input2
this.refs.input3
~~~



#### 28 回调形式的ref

使用字符串形式创建 ref，react 官方不推荐这种写法（后期会废弃）性能比较差

推荐使用 createRefs 或者 回调函数创建 refs

~~~jsx
<input ref={(node) => this.input1 = node} />
<input ref={c => this.input2 = c}/>
~~~



#### 29 回调ref中调用次数的问题

如果回调函数直接写在 JSX 中，每次 render 都会调用两次。所以，回调函数可以放在类的方法中。React 官方说这两种方法的性能差异不大。

~~~jsx
<input ref={this.setRef}/>

setRef = (node) => {
  this.input2 = node;
}
~~~



#### 30createRef的使用

~~~js
this.inputRef = React.createRef();

let a = this.inputRef.current.value;

<input ref={this.inputRef} />
~~~



#### 31 总结ref

三种创建 ref 的方法对比，官方推荐第三种，工作中推荐后两种，实际哪种方便用哪种。







#### 32 react中的事件处理

react 中通过 onClick 绑定事件（事件处理函数）：使用合成事件，不是原生事件，为了更好的兼容性。事件通过时间委托方式处理（委托给组件最外层的元素）——为了更高效（如果再底层监听事件，那么需要很多事件监听函数，在上层只需要一个事件监听函数）。可以通过 event.target 获取到触发事件的对象

#### 33 非受控组件

表单通过 ref 获取输入内容，就是非受控组件（用户输入过程中，react不会获取到输入的内容）切勿过度使用refs

使用状态提升可以处理 ref 较多的情况

下面是传统表单，点击按钮后，会自动获取 username 和 password，然后提交到 action 网址中。

~~~html
<form action="www.baidu.com">
  username: <input type="text" name="username"/>
  password: <input type="password" name="password"/>
  <button>login</button>
</form>
~~~

#### 34 受控组件

~~~jsx
<input onChange={this.save("username")}/>
<input onChange={this.save("password")}/>

save = (type) => {
  // 这里返回一个函数，就是高阶函数
  // 首次加载时，返回这个函数。当 onChange 触发时，执行内部回调函数
  return (event) => {
    // console.log(event.target.value, type);
    this.setState({
      [type]: event.target.value
    });
  }
}
~~~

#### 35 高阶函数-函数柯里化

高阶函数：参数是一个函数，或者返回值是一个函数的函数，就是高阶函数（Promsise, setTimeout, reduce）

函数 carry-function 柯里化：函数返回值是函数，可以继续链式调用。多次接收参数，最后统一调用。

~~~js
function sum(a) {
  return (b) => {
    return (c) => {
      return a + b + c;
    }
  }
}

const result = sum(1)(2)(3);
~~~

#### 36 不用柯里化的写法

~~~jsx
<input onChange={e => this.save('username', e.target.value)}/>
  
save = (type, value) => {
  this.setState({
    [type]: value,
  });
}
~~~

#### 37 引出生命周期

从节点写在组件

~~~js
ReactDOM.unmountComponentAtNode(document.getElementById('test'));
~~~



生命周期(旧)-组件挂载流程

生命周期(旧)-setState流程

生命周期(旧)-forceUpdate流程

生命周期(旧)-父组件render流程

总结生命周期(旧)

对比新旧生命周期

getDerivedStateFromProps

getSnapshotBeforeUpdate

getSnapshotBeforeUpdate举例

总结生命周期(新)



DOM的diffing算法



## 第三章 react-cli



初始化react脚手架

脚手架文件介绍-public

脚手架文件介绍-src

一个简单的Hello组件

样式的模块化

vscode中react插件的安装

组件化编码流程

TodoList案例-静态组件

TodoList案例-动态初始化列表

TodoList案例-添加todo

TodoList案例-鼠标移入效果

TodoList案例-添加一个todo

TodoList案例-对props进行限制

TodoList案例-删除一个todo

TodoList案例-实现底部功能

TodoList案例-总结TodoList案例

脚手架配置代理-方法1

脚手架配置代理-方法2

## 第四章 react ajax

github搜索案例-静态组件

github搜索案例-axios发送请求

github搜索案例-展示数据

github搜索案例-完成案例

消息订阅与发布技-pubsub

## 第五章 react-router

fetch发送请求

总结github搜索案例

对SPA应用的理解

对路由的理解

前端路由原理

路由的基本使用

路由组件与一般组件

NavLink的使用

封装NavLink组件

Switch的使用

解决样式丢失问题

路由的模糊匹配与严格匹配

Redirect的使用

嵌套路由

向路由组件传递params参数

向路由组件传递search参数

向路由组件传递state参数

总结路由参数

push与repalce

编程式路由导航

withRouter的使用

BrowserRouter与HashRouter



## 第六章 react-ui

antd的基本使用

antd样式的按需引入

antd自定义主题




## 第七章 redux

redux简介

redux工作流程

求和案例-纯react版

求和案例-redux精简版

求和案例-redux完整版

求和案例-异步action版

对react-redux的理解

连接容器组件与UI组件

react-redux基本使用

优化1-简写mapDispatch

优化2-Provider组件的使用

优化3-整合UI组件与容器组件

数据共享-编写Person组件

数据共享-编写Person组件的reducer

数据共享-完成数据共享

纯函数

redux开发者工具

最终版

项目打包运行

## 扩展

扩展1-setState

扩展2-lazyLoad

扩展3-stateHook

扩展4-EffectHook

扩展5-RefHook

扩展6-Fragment

扩展7-Context

扩展8-PureComponent

扩展9-renderProps

扩展10-ErrorBoundary

组件间通信方式总结

