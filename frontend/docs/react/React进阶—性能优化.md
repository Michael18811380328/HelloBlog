# [React进阶—性能优化](https://segmentfault.com/a/1190000008925295)

## React性能优化思路

软件的性能优化思路就像生活中去看病，大致是这样的：

1. 使用工具来分析性能瓶颈（找病根）
2. 尝试使用优化技巧解决这些问题（服药）
3. 使用工具测试性能是否确实有提升（疗效确认）

### React性能优化的特殊性

看过《高性能JavaScript》这本书的小伙伴都知道，JavaScipt的语言特性、数据结构和算法、浏览器机理、网络传输等都可能导致性能问题。同样是web实现，跟传统的技术（如原生js、jQuery）相比, react的性能优化有什么不同呢？

使用jQuery时，要考虑怎么使用选择器来提高元素查找效率、不要在循环体内进行DOM操作、使用事件委托呀等等。到了React这里，这些东西好像都用不上了。是的，因为React有一个很大的不同点，它实现了虚拟DOM，并且接管了DOM的操作。你不能直接去操作DOM来改变UI，你只能通过改变数据源（props和state）来驱动UI的变化。

说起React的性能分析，还得从它的生命周期和渲染机制说起：

#### React组件生命周期

![图片描述](https://segmentfault.com/img/bVLyCB?w=2803&h=2945)

当 props 和 state 发生变化时，React会根据shouldComponentUpdate方法来决定是否重新渲染整个组件。

#### React组件树渲染机制

![图片描述](https://segmentfault.com/img/bVLBVL?w=1164&h=742)

父亲组件的props 和 state发生变化时，它和它的子组件、孙子组件等所有后代组件都会重新渲染。

------

综上所述，可以得出React的性能优化就是围绕shouldComponentUpdate方法（SCU）来进行的，无外乎两点：

1. **缩短SCU方法的执行时间(或者不执行)。**
2. **没必要的渲染，SCU应该返回false。**

## React 性能分析工具

### Web通用工具：Chrome DevTools

最常用到的是Chrome DevTools的Timeline和Profiles。

- Timeline工具栏提供了对于在装载你的Web应用的过程中，时间花费情况的概览，这些应用包括处理DOM事件, 页面布局渲染或者向屏幕绘制元素。
- 通过Timeline发现是脚本问题时，使用Profiles作进一步分析。Profiles可以提供更加详细的脚本信息。

### React特色工具：Perf

[Perf](https://facebook.github.io/react/docs/perf.html) 是react官方提供的性能分析工具。Perf最核心的方法莫过于`Perf.printWasted(measurements)`了，该方法会列出那些没必要的组件渲染。很大程度上，React的性能优化就是干掉这些无谓的渲染。

有童鞋开发了Chrome扩展程序“React Perf”（[戳这里](https://chrome.google.com/webstore/detail/react-perf/hacmcodfllhbnekmghgdlplbdnahmhmm)）。相比自己在代码中插入Perf方法进行分析，这个小工具更加灵活方便，墙裂推荐！

## 案例分析：TodoList

TodoList的功能很简单，就是对待办事项进行增加和删除操作：
![图片描述](https://segmentfault.com/img/bVLBOY?w=460&h=708)

```jsx
import React, {PropTypes, Component} from 'react';

class TodoItem extends Component {

  static propTypes = {
    deleteItem: PropTypes.func.isRequired,
    item: PropTypes.shape({
      text: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  };

deleteItem = ()=>{
  let id = this.props.item.id;
  this.props.deleteItem(id);
};

render() {
  return (
    <div>
      <button style={{width: 30}} onClick={this.deleteItem}>X</button>
      &nbsp;
      <span>{this.props.item.text}</span>
    </div>
  );
}

}

class Todos extends Component {

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      items: this.props.initialItems,
      text: '',
    };
  }

  static propTypes = {
    initialItems: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired).isRequired,
  };

addTask = (e)=> {
  e.preventDefault();
  this.setState({
    items: [{id: ID++, text: this.state.text}].concat(this.state.items),
    text: '',
  });
};

deleteItem = (itemId)=> {
  this.setState({
    items: this.state.items.filter((item) => item.id !== itemId),
  });
};

render() {
  return (
    <div>
      <h1>待办事项</h1>
      <form onSubmit={this.addTask}>
        <input value={this.state.text} onChange={(v)=>{this.setState({text:v.target.value});}}/>
        <button>添加</button>
      </form>
      {this.state.items.map((item) => {
        return (
          <TodoItem key={item.id}
            item={item}
            deleteItem={this.deleteItem}/>
        );
      })}
    </div>
  );
}
}

let ID = 0;
const items = [];
for (let i = 0; i < 1000; i++) {
  items.push({id: ID++, text: '事项' + i});
}

class TodoList extends Component {
  render() {
    return (
      <Todos initialItems={items}/>
    );
  }
}

export default TodoList;
```

**在待办事项输入框里输入一个字母**，接下来我们以这个行为为例来进行性能分析和优化。

### 第一次优化

使用Chrome开发者工具的Timeline记录下这个过程：
![clipboard.png](https://segmentfault.com/img/bVLBSD?w=1994&h=1268)

重点关注出现的红色块，代表这个行为存在性能问题。从上图我们可以看出，耗时的`Event(keypress)`长条花了98.8ms,其中98.5ms用于脚本处理，可见脚本问题是罪魁祸首。

接着，我们使用Profiles来进一步分析脚本问题：
![clipboard.png](https://segmentfault.com/img/bVLBSX?w=1480&h=488)

对Total Time进行降序排列，发现耗时最长的是dispatchEvent，来自react源码。这时，我们就可以确定是react这一层出现了性能问题。

嗯，轮到Perf出场了：
![clipboard.png](https://segmentfault.com/img/bVLBUk?w=1764&h=350)

上图表示，有1000次不必要的渲染发生在TodoItem组件上.

打开react面板，我们来看看组件的层次和相应的state、props值：
![clipboard.png](https://segmentfault.com/img/bVLBUZ?w=1748&h=1158)

TodoItem是Todos的子组件，当我们在输入框输入字母“s”时，Todos的state值发生改变时，文章开头所说的react的渲染机制导致Todos下的1000个TodoItem组件都会重新渲染一次。但是，TodoItem的展现其实没有任何变化。
从代码中，我们可以看出，TodoItem组件展现只跟props（deleteItem、item）相关。props没有变化，TodoItem就没必要渲染。

所以，我们应该优化下TodoItem的SCU方法：

```
class TodoItem extends Component {
    
    ...
    
    //在props没有变化的时候返回false，不重新渲染
    shouldComponentUpdate(nextState,nextProps) {
        if(this.props.item == nextProps.item && this.props.deleteItem == nextProps.deleteItem){
            return false;
        }
        return true;
    }

    render() {
       ... 
    }

}
```

(PS: TodoItem中的SCU方法，使用的是浅比较，也可以使用PureComponent代替。实际项目中，往往需要使用复杂的深比较，可以考虑使用[Immutable.js](https://facebook.github.io/immutable-js/))

验证下优化效果，使用Perf测试，发现1000个多余的渲染被干掉了！
再次使用Timeline分析，`Event(keypress)`耗时从98.5ms降到了26.49ms，性能提升了2.7倍：
![clipboard.png](https://segmentfault.com/img/bVLBYw?w=1514&h=892)

疗效还不错！

### 第二次优化

通过SCU返回false，我们避免了无谓的渲染。但是，我们还是调用了1000次TodoItem的SCU方法，这也是一笔不小的性能开支。

是否可以不用调用呢？通过合理地规划组件粒度，可以做到：

```jsx
//将增加待办事项抽象成一个组件
class AddItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      text:""
    };
  }

  static PropTypes = {
    addTask:PropTypes.func.isRequired
  };

addTask = (e)=>{
  e.preventDefault();
  this.props.addTask(this.state.text);
};

render(){
  return (
    <form onSubmit={this.addTask}>
      <input value={this.state.text} onChange={(v)=>{this.setState({text:v.target.value});}}/>
      <button>添加</button>
    </form>
  );

}
}

class Todos extends Component{
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.initialItems,
    };
  }

  static propTypes = {
    initialItems: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired).isRequired,
  };

addTask = (text)=>{
  this.setState({
    items: [{id: ID++, text:text}].concat(this.state.items),
    text: '',
  });
};

deleteItem = (itemId)=>{
  this.setState({
    items: this.state.items.filter((item) => item.id !== itemId),
  });
};

render() {
  return (
    <div>
      <h1>待办事项V3</h1>
      <AddItem addTask={this.addTask}/>
      {this.state.items.map((item) => {
        return (
          <TodoItem key={item.id}
            item={item}
            deleteItem={this.deleteItem}/>
        );
      })}
    </div>
  );
}
}
```

把增加待办事项抽象成一个AddItem组件。这样一来，组件树从原来的
![clipboard.png](https://segmentfault.com/img/bVLB03?w=612&h=430)

变成

![clipboard.png](https://segmentfault.com/img/bVLB04?w=700&h=470)

输入信息时触发变化的text这个state值，被下放到AddItem组件来管理，因此不会导致兄弟组件（TodoItem）的重新渲染。

再次运行Timeline测试，这时`Event(keypress)`耗时从26.49ms降到了7.98ms,性能提升了2.3倍：
![clipboard.png](https://segmentfault.com/img/bVLB1R?w=1268&h=872)

至此，性能优化完毕~