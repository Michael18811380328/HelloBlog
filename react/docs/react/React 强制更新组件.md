# React 强制更新组件

通常组件的更新是 state 或者 props 改变造成的，有时候数据没有改变，如何强制更新组件？

如果 render() 方法依赖于其他数据，则可以调用 forceUpdate() 强制让组件重新渲染。

调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。

但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法。如果标记发生变化，React 仍将只更新 DOM。

通常你应该避免使用 forceUpdate()，尽量在 render() 中使用 this.props 和 this.state。

~~~jsx
class menu extends React.Component {
  
  // 第一次加载组件调用
  componentDidMount = () => {
    this.getInfo(this.props.xxx);
    this.hasInfo();
  }
  
  // 每次接收到新props调用
  componentWillReceiveProps = (nextProps) => {
    if (nextProps !== this.props) {
      this.getInfo(nextProps);
      this.haveInfo();
    }
  }
  
  // 强制更新组件
  update = () => {
    this.forceUpdate();
  }
  
  render() {
    return (<div></div>);
  }
}
~~~

