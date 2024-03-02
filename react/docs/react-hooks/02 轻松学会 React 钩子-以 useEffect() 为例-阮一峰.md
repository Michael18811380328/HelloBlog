# 02 轻松学会 hook：以 useEffect() 为例

https://www.ruanyifeng.com/blog/2020/09/react-hooks-useeffect-tutorial.html

**钩子（hook）就是 React 函数组件的副效应解决方案，用来为函数组件引入副效应。** 函数组件的主体只应该用来返回组件的 HTML 代码，所有的其他操作（副效应）都必须通过钩子引入。

useEffect 对应三个生命周期函数，那么三个生命周期函数中实现的功能，都可以在这里实现

~~~js
useEffect(() => {
  // 对应 componentDidMount 阶段，用于发送网络请求，或者输入
  axios('xxx');
  timer = setTimeout(() => {}, 1000);
  return () => {
    // 对应 componentWillUnmount 阶段，清除事件监听等操作
    clearTimeout(timer);
  }
  // 对应 componentDidUpdate 阶段，如果 props.name 变化后，重新执行上面的函数
}, [props.name])
~~~

useEffect 中对应的事件应该根据功能分开处理，就像上面的写法是不规范的，应该用下面的写法

~~~js
function App() {
  // 第一个状态
  const [varA, setVarA] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => setVarA(varA + 1), 1000);
    return () => clearTimeout(timeout);
  }, [varA]);

  // 第二个状态
  const [varB, setVarB] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => setVarB(varB + 2), 2000);
    return () => clearTimeout(timeout);
  }, [varB]);

  return <span>{varA}, {varB}</span>;
}
~~~
