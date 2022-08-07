# React 全家桶入门教程

前面是基础课程（难度小，略过），后面是案例

目的

1. 巩固react基础知识，查漏补缺（熟悉的部分快进）
2. 学习相关的库的使用

https://study.163.com/course/courseMain.htm?courseId=1210995818 共计126课时，2021年1月出品

全部课程约38小时；7月24日前学了10小时。



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

从节点卸载组件

~~~js
ReactDOM.unmountComponentAtNode(document.getElementById('test'));
~~~

38 生命周期(旧)-组件挂载流程

39 生命周期(旧)-setState流程

40 生命周期(旧)-forceUpdate流程

41 生命周期(旧)-父组件render流程

42 总结生命周期(旧)

很简单

#### 43 对比新旧生命周期

新版本不推荐使用的三个生命周期函数（ComponnentWillMount, ComponentWillReceiveProps, ComponentWillUpdate）；以及新加入的两个生命周期函数(getDerivedStateFromProps, getSnapshotBeforeUpdate) 

为什么不推荐使用？过时的三个生命周期函数，经常造成误解滥用，可能造成bug。在 17版本中，可以使用，界面上提示警告。在 18 版本中异步渲染，不能直接使用这三个生命周期函数，必须加上 UNSAVE 前缀（React.lazy, React.Suspend）。



#### 44 getDerivedStateFromProps

这个生命周期函数是 componentWillReceiveProps 的替代，用于 props 变化造成组件 state 更新的情况。

这是一个静态方法，在组件render前，或者组件更新后都调用。

~~~js
static getDerivedStateFromProps(nextProps, prevState) {
  // 对比 nextProps 和 prevState 等，返回新的 state 或者 null
  // 这是静态方法，无法直接访问到实例对象的属性和状态（this）
  if (nextProps.name !== prevState.name) {
    prevState.name = nextProps.name;
  }
  return prevState;
}
~~~

派生状态会造成代码冗余，尽量避免使用。ComponentWillReceiveProps 只在父组件重新渲染时触发，getDerivedStateFromProps 在每次渲染前调用（包括内部setState）。

#### 45 getSnapshotBeforeUpdate

在渲染之前调用，可以获得 DOM 信息（例如元素滚动位置），返回值传给 componentDidUpdate 函数，用于处理滚动位置和动画。通常不使用。

~~~js
getSnapshotBeforeUpdate(prevProps, prevState) {
  if (prevProps.list.length < this.props.list.length) {
    const list = this.listRef.current;
    return list.scrollHeight - list.scrollTop;
  }
  return null;
}

// 当有新消息加入时，界面滚动位置不变
componentDidUpdate(prevProps, prevState, snapshot) {
  if (snapshot) {
    const list = this.listRef.current;
    list.scrollTop = list.scrollHeight - snapshot;
  }
}
~~~

#### 46 getSnapshotBeforeUpdate 举例

简化的案例

~~~js
getSnapshotBeforeUpdate() {
  return this.refs.list.scrollHeight;
}

componentDidUpdate(preProps, preState, height) {
  this.refs.list.scrollTop += this.refs.list.scrollHeight - height;
}
~~~

#### 47 总结生命周期(新)

初始化阶段：getDerivedStateFromProps render componentDidMount

更新阶段：getDerivedStateFromProps shouldComponentUpdate render getSnapshotBeforeUpdate componentDidUpdate

卸载阶段：componentWillUnmount

注：getDerivedStateFromProps 在首次加载和再次更新时，都会触发。



#### 48 DOM的diffing算法

对应面试题：React 中 key 的作用是什么？用来作为唯一标识，在 渲染过程中 diff 算法中，判断前后节点是否发生变化。如果Key变化了，那么直接渲染这个节点。如果 key 不变，那么递归比较这个节点内部的子节点。

使用 index 作为 key 可能存在问题，所以最好使用 id 作为 Key。如果在大型列表中，列表项越多，这个性能问题就越大（重新加载一个节点，还是重新加载全部的节点）

如果某些列表是静态的，为了方便，也可以使用 index 作为 key。

## 第三章 react-cli

#### 49 初始化react脚手架

React-create-app 使用和配置

#### 50 脚手架文件介绍-public

favicon

index.html

logo.png

Manifest.json 应用加壳配置文件

Robots.txt 爬虫协议文件

~~~html
// 这个表示 public 文件夹的路径
<link ref="icon" href="%PUBLIC_URL%/favicon.ico"/>

// 理想视口，用于移动端网页适配
<meta name="viewport" content="width=device-width, initial-scale=1">

// 安卓移动端 TAB 背景色（兼容性不好）
<meta name="theme-color" content="#000">

<meta name="description" content="this is test" />

// 苹果手机桌面快捷应用图标
<link rel="apple-touch-icon" href="%PUBLIC%/logo192.png" />

// 应用加壳规则
<link rel="manifest" href="%PUBLIC_URL%/manifest.json">
~~~

#### 51 脚手架文件介绍-src

reportWebVitals.js 页面性能分析工具

React.StrictMode 这个标签并不代表严格模式，而是处理 React 语法中的提示（例如使用了过时的 ref="test" 等）这个包裹在顶层标签下面即可。





一个简单的Hello组件

样式的模块化

vscode中react插件的安装

#### 组件化编码流程

组件化拆分流程

1、拆分组件：根据设计稿，思考拆分成多少部分

2、静态组件拆分：设置不同静态组件，同时 mock 数据

3、动态数据更新（状态属性，界面交互等）

从一个旧项目重构成 raect 项目，或者新项目，最好先从细节组件，公共组件做起。

拆分组件的原则：组件在界面上有明确的分界，组件有明确的名称（对应组件的功能或者位置）如果某个组件名称不合适，那么这个组件的功能和位置不合适，需要进一步拆分处理重构。

这个案例很简单，不详细说了



TodoList案例-静态组件

TodoList案例-动态初始化列表

TodoList案例-添加todo

TodoList案例-鼠标移入效果

TodoList案例-添加一个todo

TodoList案例-对props进行限制

TodoList案例-删除一个todo

TodoList案例-实现底部功能

TodoList案例-总结TodoList案例



React 开发插件

在 VScode 中加入插件，可以用快捷键搭建基本的架构

#### ID 的库
uuid 库比较大，可以使用 nanoid 产生随机的 ID，在性能要求不高的情况下可以用

#### defaultChecked

defaultChecked 可以初始化勾选状态，但是不支持后续 state 更改，实际工程中避免使用这个属性。实际中使用 checked = 处理选择或者不选择，还有一个半选择的图标（回去查一下）

checkbox 如果获取 event.target.value 可以获取到 on 始终是这个值，无意义

window.confirm 原生的弹出框，函数的返回值是用户的选择，用于简单的交互。这个会阻挡JS的执行，在不同浏览器中可能不美观，实际项目中没有使用。







## 第四章 react ajax

#### 65 脚手架配置代理-方法1

react 主要处理状态管理和界面渲染，没有包括网络请求功能。通常使用 axios 做网络请求（promise return ）。

~~~js
axios.get(url).then(res => {
  console.log(res.data);
}, err => {
  console.log(err);
});
~~~

如果本地服务端在 5000 端口，浏览器界面是 3000 端口，那么根据浏览器同源策略，会出现跨域的问题。

需要一个代理服务器，把5000返回的响应，转发到3000端口上面。

通常在 package.json 中设置代理，这样就能处理5000端口返回的数据了。这里表示先请求3000端口，如果没有的话找5000端口

~~~json
"proxy": "http://localhost:5000"
~~~

#### 66 脚手架配置代理-方法2

实际开发中，可能有不同的服务器提供多种服务，但是前端只有一个端口，所以也需要在服务端处理跨域的问题。

这个在 react 脚手架下可以这样配置，一个项目配置一次即可，不需要多次配置

~~~js
// setProxy.js 需要脚手架环境，不能改名字

// 这个库已经在 cra 中包含，不需要单独安装
const proxy = require('http-proxy-middleware'); 

module.exports = function(app) {
  app.use(
    // 这是中间件，表示判断api1的请求，发送到 5000 端口，然后改变源，并且替换到 api1
  	proxy('/api1', {
      target: 'http://localhost:5000',
      changeOrigin: true, // 服务器收到请求头中 Host 字段的值（可选）
      pathRewrite: {'^api1': ''},
    }),
    // 另一个中间件，处理另一个跨域的情况
    proxy('/api2', {
      target: 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: {'^api2': ''},
    })
  )
}
// 跨域也可以在服务端使用 cors 技术实现
~~~

#### 67 github搜索案例-静态组件

常用的固定的css最好放在 public 中，然后在 HTML 模板中插入

组件单独的 css 可以放在 src/css 路径下，在不同组件中引入

#### 68 github搜索案例-axios发送请求

~~~js
// 这是原来的写法，代码可读性较差
axios.get(url).then(res => {
  console.log(res.data);
  this.setState({ data: res.data });
}, err => {
  console.log(err);
});

// 这样回调函数更清晰，推荐这种写法
axios.get(url).then(
	res => {
    console.log(res.data);
    this.setState({
      data: res.data
    });
  },
  err => {
    console.log(err);
  },
);
~~~

#### github搜索案例-展示数据



#### 70 github搜索案例-完成案例

三目运算法可以嵌套使用

~~~jsx
<div>
	{
    isFirst ? <div>Welcome</div> :
    isLoading ? <Loading/> :
    isError ? <Error> :
    <List/>
  }
</div>
~~~

#### 71 消息订阅与发布-pubsub

Pubsub-js 是一个第三方库，publish-subscribe

~~~bash
npm install pubsub-js --save
~~~

~~~js
import PubSub from 'pubsub-js';

componentDidMount() {
  this.token = PubSub.subscribe('delete', function(message, data){
    console.log(message, data); 
  });
}

componentWillUnmount() {
  PubSub.unscribe(this.token);
}

// another component
PubSub.publish('delete', data);
~~~

#### 72 fetch发送请求

JS 底层通过 xhr 或者 fetch 发送请求。jQuery 和 axios 都是基于 xhr 发送请求。

问题：老版本浏览器不支持；实际上使用不多（原生XHR书写麻烦，axios 已经封装）。

fetch 关注分离：第一步先判断服务器是否连接，第二步再获取返回的数据

~~~js
fetch('/api1/search/users?q=test').then(
	response => {
    console.log('连接服务器成功');
    // 这里的返回值是 Promise 所以可以使用 then 处理
    return response.join();
  },
  error => {
    console.log('连接服务器失败');
  }
).then(
	response => {
    console.log('获取数据成功')
  },
  error => {
    console.log('获取数据失败')
  },
);
~~~





#### 73 总结github搜索案例

相关知识点：

1、设计状态要全面：例如一个列表，需要考虑初始的状况（欢迎词），网络请求中的状态（loading）数据加载后的状态（列表）数据为空的状态（空列表，还是渲染没有数据）。如果涉及网络请求，要考虑成功后的回调函数，失败后的回调函数，界面的提示等等。

2、ES6 解构赋值的重命名

~~~js
let obj = {a: {b : 1}};
const { a } = obj;
const { a: { b } } = obj; // 多重对象解构赋值
const { a: time } = obj; // 解构赋值变量重命名
~~~

3、消息订阅和发布

先订阅后发布；适合任何组件传参通信；需要在卸载时取消订阅

这里介绍的是第三方的订阅，实际项目中自定义的消息订阅，需要逐层传参，使用不变

4、fetch 发送请求（关注分离思想）

fetch 实际使用不多，了解即可，大部分情况使用 axios

axios 设计基于 XHR 原理，直接返回请求的数据。fetch 是浏览器原生的，不基于 XHR，先判断是否连通，然后获取数据。

~~~js
try {
  const res = await fetch(url); // 先判断服务器是否连通
  const data = await response.json(); // 然后从返回的 Promise 中拿到数据
  console.log(data);
} catch (e) {
  console.log(e);
}
~~~

## 第五章 react-router

#### 74 对SPA应用的理解

#### 75 对路由的理解

#### 76 前端路由原理

#### 77 路由的基本使用

#### 78 路由组件与一般组件

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

常用的开源组件库：material-UI  ant-design

教程版本时 4.8.2，项目中使用 2.x 版本，文档和实际代码可能有差异；注意更新。

#### 94 antd的基本使用

直接查阅官网，需要哪个使用哪个就行

注意版本：目前项目中使用 2 版本，正式4版本已经发布，配置参数有不少差距

#### 95 antd样式的按需引入

我们开始引入全部的CSS文件，实际上体积比较大（60kb），性能不好，最好使用按需引入

在 create-react-app 脚手架中，可以进行下面的配置

~~~bash
npm install react-app-rewired customize-cra babel-plugin-import
~~~

改写脚本命令

~~~json
"script": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
}
~~~

增加单独的配置文件 config-overrides.js （需要 customize-cra 库，处理自定义配置）

~~~js
module.exports = function override(config, env) {
  // 这里可以改写默认的 webpack 配置文件
  return config;
}
~~~

实际上改成这样

~~~js
const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
	fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  })
);
~~~

更改后，就不需要在组件内部单独引入对应的样式文件了

#### 96 antd 自定义主题

Ant-design 使用 less 作为样式文件，所以自定义样式，需要覆盖原来的样式文件。

~~~bash
npm install less less-loader
~~~

更改配置文件

~~~js
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
	fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // 注意：这里官网配置会报错，因为 lessLoader 版本更新了，参数更改了
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    	modifyVars: { '@primary-color': '#fff' },
    }
  }),
);
~~~




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

