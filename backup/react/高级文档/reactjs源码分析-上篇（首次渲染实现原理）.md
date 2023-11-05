# [reactjs 源码分析-上篇（首次渲染实现原理）](http://purplebamboo.github.io/2015/09/15/reactjs_source_analyze_part_one/)

reactjs 是目前比较火的前端框架，但是目前并没有很好的解释原理的项目。reactjs 源码比较复杂不适合初学者去学习。所以本文通过实现一套简易版的 reactjs，使得理解原理更加容易。

所有实例源码都托管在 github。[点这里](https://github.com/purplebamboo/little-reactjs)里面有分步骤的例子，可以一边看一边运行例子。

这个帖子是 2015 年，需要考虑是否符合最新的版本，知识是否过时

## 前言

前端的发展特别快，经历过 jQuery 一统天下的工具库时代后，现在各种框架又开始百家争鸣了。angular，ember，backbone，vue，avalon，ploymer 还有 reactjs，作为一个前端真是稍不留神就感觉要被淘汰了，就在去年大家还都是 angularjs 的粉丝，到了今年又开始各种狂追 reactjs 了。前端都是喜新厌旧的，不知道最后这些框架由谁来一统天下，用句很俗的话说，这是最好的时代也是最坏的时代。作为一个前端，只能多学点，尽量多的了解他们的原理。

reactjs 的代码非常绕，对于没有后台开发经验的前端来说看起来会比较吃力。其实 reactjs 的核心内容并不多，主要是下面这些：

- 虚拟 dom 对象(Virtual DOM)
- 虚拟 dom 差异化算法（diff algorithm）
- 单向数据流渲染（Data Flow）
- 组件生命周期
- 事件处理

下面我们将一点点的来实现一个简易版的 reactjs，实现上面的那些功能，最后用这个 reactjs 做一个 todolist 的小应用，看完这个，或者跟着敲一遍代码。希望让大家能够更好的理解 reactjs 的运行原理。

## 入门

我们先从渲染 hello world 开始吧。

我们看下面的代码：

```jsx
<script type="text/javascript">
  React.render('hello world',document.getElementById("container"))
</script>

/**
对应的html为

<div id="container"></div>


生成后的html为：

<div id="container">
    <span data-reactid="0">hello world</span>
</div>

*/
```

假定这一行代码,就可以把`hello world`渲染到对应的 div 里面。

我们来看看我们需要为此做些什么：

```jsx
//component类，用来表示文本在渲染，更新，删除时应该做些什么事情
function ReactDOMTextComponent(text) {
  //存下当前的字符串
  this._currentElement = "" + text;
  //用来标识当前component
  this._rootNodeID = null;
}

//component渲染时生成的dom结构
ReactDOMTextComponent.prototype.mountComponent = function (rootID) {
  this._rootNodeID = rootID;
  return (
    '<span data-reactid="' + rootID + '">' + this._currentElement + "</span>"
  );
};

//component工厂  用来返回一个component实例
function instantiateReactComponent(node) {
  if (typeof node === "string" || typeof node === "number") {
    return new ReactDOMTextComponent(node);
  }
}

React = {
  nextReactRootIndex: 0,
  render: function (element, container) {
    var componentInstance = instantiateReactComponent(element);
    var markup = componentInstance.mountComponent(React.nextReactRootIndex++);
    $(container).html(markup);
    //触发完成mount的事件
    $(document).trigger("mountReady");
  },
};
```

代码分为三个部分：

1. React.render 作为入口负责调用渲染
2. 我们引入了 component 类的概念，ReactDOMTextComponent 是一个 component 类定义，定义对于这种`文本类型`的节点，在渲染，更新，删除时应该做什么操作，这边暂时只用到渲染，另外两个可以先忽略
3. instantiateReactComponent 用来根据 element 的类型（现在只有一种 string 类型），返回一个 component 的实例。其实就是个类工厂。

nextReactRootIndex 作为每个 component 的标识 id，不断加 1，确保唯一性。这样我们以后可以通过这个标识找到这个元素。

可以看到我们把逻辑分为几个部分，主要的渲染逻辑放在了具体的 componet 类去定义。React.render 负责调度整个流程，这里是调用 instantiateReactComponent 生成一个对应 component 类型的实例对象，然后调用此对象的 mountComponent 获取生成的内容。最后写到对应的 container 节点中。

可能有人问，这么 p 大点功能，有必要这么复杂嘛，别急。往下看才能体会这种分层的好处。

## 引入基本 elemetnt

我们知道 reactjs 最大的卖点就是它的虚拟 dom 概念，我们一般使用`React.createElement`来创建一个虚拟 dom 元素。

虚拟 dom 元素分为两种，一种是浏览器自带的基本元素比如 div p input form 这种，一种是自定义的元素。

> 这边需要说一下我们上节提到的文本节点，它不算虚拟 dom，但是 reacjs 为了保持渲染的一致性。文本节点是在外面包了一层 span 标记，也给它配了个简化版 component（ReactDOMTextComponent）。

这节我们先讨论浏览器的基本元素。

在 reactjs 里，当我们希望在 hello world 外面包一层 div,并且带上一些属性，甚至事件时我们可以这么写：

```jsx
//演示事件监听怎么用
function hello() {
  alert("hello");
}
var element = React.createElement(
  "div",
  { id: "test", onclick: hello },
  "click me"
);
React.render(element, document.getElementById("container"));

/**

//生成的html为：

<div data-reactid="0" id="test">
    <span data-reactid="0.0">click me</span>
</div>
//点击文字，会弹出hello的对话框
*/
```

上面使用`React.createElement`创建了一个基本元素，我们来看看简易版本`React.createElement`的实现：

```jsx
//ReactElement就是虚拟dom的概念，具有一个type属性代表当前的节点类型，还有节点的属性props
//比如对于div这样的节点type就是div，props就是那些attributes
//另外这里的key,可以用来标识这个element，用于优化以后的更新，这里可以先不管，知道有这么个东西就好了
function ReactElement(type, key, props) {
  this.type = type;
  this.key = key;
  this.props = props;
}

React = {
  nextReactRootIndex: 0,
  createElement: function (type, config, children) {
    var props = {},
      propName;
    config = config || {};
    //看有没有key，用来标识element的类型，方便以后高效的更新，这里可以先不管
    var key = config.key || null;

    //复制config里的内容到props
    for (propName in config) {
      if (config.hasOwnProperty(propName) && propName !== "key") {
        props[propName] = config[propName];
      }
    }

    //处理children,全部挂载到props的children属性上
    //支持两种写法，如果只有一个参数，直接赋值给children，否则做合并处理
    var childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = $.isArray(children) ? children : [children];
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }
      props.children = childArray;
    }

    return new ReactElement(type, key, props);
  },
  render: function (element, container) {
    var componentInstance = instantiateReactComponent(element);
    var markup = componentInstance.mountComponent(React.nextReactRootIndex++);
    $(container).html(markup);
    //触发完成mount的事件
    $(document).trigger("mountReady");
  },
};
```

createElement 只是做了简单的参数修正，最终返回一个 ReactElement 实例对象也就是我们说的虚拟元素的实例。

> 这里注意 key 的定义，主要是为了以后更新时优化效率，这边可以先不管忽略。

好了有了元素实例，我们得把他渲染出来，此时 render 接受的是一个 ReactElement 而不是文本，我们先改造下 instantiateReactComponent：

```jsx
function instantiateReactComponent(node) {
  //文本节点的情况
  if (typeof node === "string" || typeof node === "number") {
    return new ReactDOMTextComponent(node);
  }
  //浏览器默认节点的情况
  if (typeof node === "object" && typeof node.type === "string") {
    //注意这里，使用了一种新的component
    return new ReactDOMComponent(node);
  }
}
```

我们增加了一个判断，这样当 render 的不是文本而是浏览器的基本元素时。我们使用另外一种 component 来处理它渲染时应该返回的内容。这里就体现了工厂方法 instantiateReactComponent 的好处了，不管来了什么类型的 node，都可以负责生产出一个负责渲染的 component 实例。这样 render 完全不需要做任何修改，只需要再做一种对应的 component 类型（这里是 ReactDOMComponent）就行了。

所以重点我们来看看`ReactDOMComponent`的具体实现：

```jsx
//component类，用来表示文本在渲染，更新，删除时应该做些什么事情
function ReactDOMComponent(element) {
  //存下当前的element对象引用
  this._currentElement = element;
  this._rootNodeID = null;
}

//component渲染时生成的dom结构
ReactDOMComponent.prototype.mountComponent = function (rootID) {
  //赋值标识
  this._rootNodeID = rootID;
  var props = this._currentElement.props;
  var tagOpen = "<" + this._currentElement.type;
  var tagClose = "</" + this._currentElement.type + ">";

  //加上reactid标识
  tagOpen += " data-reactid=" + this._rootNodeID;

  //拼凑出属性
  for (var propKey in props) {
    //这里要做一下事件的监听，就是从属性props里面解析拿出on开头的事件属性的对应事件监听
    if (/^on[A-Za-z]/.test(propKey)) {
      var eventType = propKey.replace("on", "");
      //针对当前的节点添加事件代理,以_rootNodeID为命名空间
      $(document).delegate(
        '[data-reactid="' + this._rootNodeID + '"]',
        eventType + "." + this._rootNodeID,
        props[propKey]
      );
    }

    //对于children属性以及事件监听的属性不需要进行字符串拼接
    //事件会代理到全局。这边不能拼到dom上不然会产生原生的事件监听
    if (
      props[propKey] &&
      propKey != "children" &&
      !/^on[A-Za-z]/.test(propKey)
    ) {
      tagOpen += " " + propKey + "=" + props[propKey];
    }
  }
  //获取子节点渲染出的内容
  var content = "";
  var children = props.children || [];

  var childrenInstances = []; //用于保存所有的子节点的componet实例，以后会用到
  var that = this;
  $.each(children, function (key, child) {
    //这里再次调用了instantiateReactComponent实例化子节点component类，拼接好返回
    var childComponentInstance = instantiateReactComponent(child);
    childComponentInstance._mountIndex = key;

    childrenInstances.push(childComponentInstance);
    //子节点的rootId是父节点的rootId加上新的key也就是顺序的值拼成的新值
    var curRootId = that._rootNodeID + "." + key;
    //得到子节点的渲染内容
    var childMarkup = childComponentInstance.mountComponent(curRootId);
    //拼接在一起
    content += " " + childMarkup;
  });

  //留给以后更新时用的这边先不用管
  this._renderedChildren = childrenInstances;

  //拼出整个html内容
  return tagOpen + ">" + content + tagClose;
};
```

我们增加了虚拟 dom reactElement 的定义，增加了一个新的 componet 类 ReactDOMComponent。
这样我们就实现了渲染浏览器基本元素的功能了。

对于虚拟 dom 的渲染逻辑，本质上还是个递归渲染的东西，reactElement 会递归渲染自己的子节点。可以看到我们通过 instantiateReactComponent 屏蔽了子节点的差异，只需要使用不同的 componet 类，这样都能保证通过 mountComponent 最终拿到渲染后的内容。

另外这边的事件也要说下，可以在传递 props 的时候传入{onClick:function(){}}这样的参数，这样就会在当前元素上添加事件，代理到 document。由于 reactjs 本身全是在写 js，所以监听的函数的传递变得特别简单。

> 这里很多东西没有考虑，比如一些特殊的类型 input select 等等，再比如 img 不需要有对应的 tagClose 等。这里为了保持简单就不再扩展了。另外 reactjs 的事件处理其实很复杂，实现了一套标准的 w3c 事件。这里偷懒直接使用 jQuery 的事件代理到 document 上了。

## 自定义元素

上面实现了基本的元素内容，我们下面实现自定义元素的功能。

随着前端技术的发展浏览器的那些基本元素已经满足不了我们的需求了，如果你对[webcomponents](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)有一定的了解，就会知道人们一直在尝试扩展一些自己的标记。

reactjs 通过虚拟 dom 做到了类似的功能，还记得我们上面 element.type 只是个简单的字符串，如果是个类呢？如果这个类恰好还有自己的生命周期管理，那扩展性就很高了。

> 如果对生命周期等概念不是很理解的，可以看看我以前的另一片文章：[javascript 组件化](http://www.html-js.com/article/2760)

我们看下 reactjs 怎么使用自定义元素：

```jsx
var HelloMessage = React.createClass({
  getInitialState: function () {
    return { type: "say:" };
  },
  componentWillMount: function () {
    console.log("我就要开始渲染了。。。");
  },
  componentDidMount: function () {
    console.log("我已经渲染好了。。。");
  },
  render: function () {
    return React.createElement(
      "div",
      null,
      this.state.type,
      "Hello ",
      this.props.name
    );
  },
});

React.render(
  React.createElement(HelloMessage, { name: "John" }),
  document.getElementById("container")
);

/**
结果为：

html:
<div data-reactid="0">
    <span data-reactid="0.0">say:</span>
    <span data-reactid="0.1">Hello </span>
    <span data-reactid="0.2">John</span>
</div>

console:
我就要开始渲染了。。。
我已经渲染好了。。。

*/
```

`React.createElement`接受的不再是字符串，而是一个 class。

`React.createClass`生成一个自定义标记类，带有基本的生命周期：

- getInitialState 获取最初的属性值 this.state
- componentWillmount 在组件准备渲染时调用
- componentDidMount 在组件渲染完成后调用

对 reactjs 稍微有点了解的应该都可以明白上面的用法。

我们先来看看 React.createClass 的实现：

```jsx
//定义ReactClass类,所有自定义的超级父类
var ReactClass = function(){
}
//留给子类去继承覆盖
ReactClass.prototype.render = function(){}



React = {
  nextReactRootIndex:0,
  createClass:function(spec){
    //生成一个子类
    var Constructor = function (props) {
      this.props = props;
      this.state = this.getInitialState ? this.getInitialState() : null;
    }
    //原型继承，继承超级父类
    Constructor.prototype = new ReactClass();
    Constructor.prototype.constructor = Constructor;
    //混入spec到原型
    $.extend(Constructor.prototype,spec);
    return Constructor;

  },
  createElement:function(type,config,children){
    ...
  },
    render:function(element,container){
      ...
    }
    }
```

可以看到 createClass 生成了一个继承 ReactClass 的子类，在构造函数里调用 this.getInitialState 获得最初的 state。

> 为了演示方便,我们这边的 ReactClass 相当简单，实际上原始的代码处理了很多东西，比如类的 mixin 的组合继承支持,比如 componentDidMount 等可以定义多次，需要合并调用等等，有兴趣的去翻源码吧，不是本文的主要目的，这里就不详细展开了。

我们这里只是返回了一个继承类的定义，那么具体的 componentWillmount，这些生命周期函数在哪里调用呢。

看看我们上面的两种类型就知道，我们是时候为自定义元素也提供一个 componet 类了，在那个类里我们会实例化 ReactClass，并且管理生命周期，还有父子组件依赖。

好，我们老规矩先改造 instantiateReactComponent

```jsx
function instantiateReactComponent(node) {
  //文本节点的情况
  if (typeof node === "string" || typeof node === "number") {
    return new ReactDOMTextComponent(node);
  }
  //浏览器默认节点的情况
  if (typeof node === "object" && typeof node.type === "string") {
    //注意这里，使用了一种新的component
    return new ReactDOMComponent(node);
  }
  //自定义的元素节点
  if (typeof node === "object" && typeof node.type === "function") {
    //注意这里，使用新的component,专门针对自定义元素
    return new ReactCompositeComponent(node);
  }
}
```

很简单我们增加了一个判断，使用新的 component 类形来处理自定义的节点。我们看下
ReactCompositeComponent 的具体实现:

```jsx
function ReactCompositeComponent(element) {
  //存放元素element对象
  this._currentElement = element;
  //存放唯一标识
  this._rootNodeID = null;
  //存放对应的ReactClass的实例
  this._instance = null;
}

//用于返回当前自定义元素渲染时应该返回的内容
ReactCompositeComponent.prototype.mountComponent = function (rootID) {
  this._rootNodeID = rootID;
  //拿到当前元素对应的属性值
  var publicProps = this._currentElement.props;
  //拿到对应的ReactClass
  var ReactClass = this._currentElement.type;
  // Initialize the public class
  var inst = new ReactClass(publicProps);
  this._instance = inst;
  //保留对当前comonent的引用，下面更新会用到
  inst._reactInternalInstance = this;

  if (inst.componentWillMount) {
    inst.componentWillMount();
    //这里在原始的reactjs其实还有一层处理，就是  componentWillMount调用setstate，不会触发rerender而是自动提前合并，这里为了保持简单，就略去了
  }
  //调用ReactClass的实例的render方法,返回一个element或者一个文本节点
  var renderedElement = this._instance.render();
  //得到renderedElement对应的component类实例
  var renderedComponentInstance = instantiateReactComponent(renderedElement);
  this._renderedComponent = renderedComponentInstance; //存起来留作后用

  //拿到渲染之后的字符串内容，将当前的_rootNodeID传给render出的节点
  var renderedMarkup = renderedComponentInstance.mountComponent(
    this._rootNodeID
  );

  //之前我们在React.render方法最后触发了mountReady事件，所以这里可以监听，在渲染完成后会触发。
  $(document).on("mountReady", function () {
    //调用inst.componentDidMount
    inst.componentDidMount && inst.componentDidMount();
  });

  return renderedMarkup;
};
```

实现并不难，ReactClass 的 render 一定是返回一个虚拟节点(包括 element 和 text)，这个时候我们使用 instantiateReactComponent 去得到实例，再使用 mountComponent 拿到结果作为当前自定义元素的结果。

应该说本身自定义元素不负责具体的内容，他更多的是负责生命周期。具体的内容是由它的 render 方法返回的虚拟节点来负责渲染的。

本质上也是递归的去渲染内容的过程。同时因为这种递归的特性，父组件的 componentWillMount 一定在某个子组件的 componentWillMount 之前调用，而父组件的 componentDidMount 肯定在子组件之后，因为监听 mountReady 事件，肯定是子组件先监听的。

> 需要注意的是自定义元素并不会处理我们 createElement 时传入的子节点，它只会处理自己 render 返回的节点作为自己的子节点。不过我们在 render 时可以使用 this.props.children 拿到那些传入的子节点，可以自己处理。其实有点类似 webcomponents 里面的 shadow dom 的作用。

上面实现了三种类型的元素，其实我们发现本质上没有太大的区别，都是有自己对应 component 类来处理自己的渲染过程。

大概的关系是下面这样。

![结构图](https://img.alicdn.com/tps/TB1NPA_JpXXXXcVXXXXXXXXXXXX-1024-768.jpg)

于是我们发现初始化的渲染流程都已经完成了。

## 结语

整个初次渲染的流程基本就分析完毕了。看看我们目前的进展，事件监听做了，虚拟 dom 有了。基本的组件生命周期也有了。我们这个小玩具已经可以简单跑跑了。下篇文章我们将一起去实现 reactjs 的更新机制，看看它最核心的 diff 算法是怎么回事。
