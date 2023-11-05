## React 操作元素的 API

React 中，JSX 标签会转换成原生的 JavaScript 代码。所以，可以使用 JSX 标签创建组件，也可以使用 React 提供的 API 创建组件。

下面是常见的元素操作和组件操作的 API

### 1、创建元素 createElement

```js
// API 具有三个参数
// 第一个是元素的类型（必选）
// 第二个是元素的属性
// 第三个是元素的子节点
var React = require("react");

let dom = React.createElement(type, [props], [children]);
let dom2 = React.createElement(
  "div",
  { className: "wrapper" },
  dom,
  React.createElement("hr")
);
// 快捷创建元素
// React.createElement('div') === React.DOM.div()
```

### 2、复制 cloneElement

参数和 createElement 一致

```js
let div = React.createElement("div");
let dom3 = React.cloneElement(div, { className: "wrapper" }, dom);
```

### 3、验证 isValidElement

```js
function checkValid() {
  let div = React.createElement("div");
  React.isValidElement(div); // true;
  let div2 = document.getElementById("wrapper");
  React.isValidElement(div2); // false
}
```

### 4、组件操作 API（Component class）

创建组件：createClass() 创建并返回一个组件类，内部需要实现 render 方法

```js
let App = React.createClass({
  displayName: "App",
  render: function () {
    let hr = React.createElement("hr");
    let h2 = React.createElement("h2", null, this.props.children);
    return React.createElement("div", null, h2, hr);
  },
});
```

现在就返回一个 APP 的类（组件）大型组件需要单独写，class App extends React.Component，如果是小组件，没有复杂方法，可以使用这个 API

这几个主要的区别：https://www.zhihu.com/question/27602269/answer/40168594

基本上，使用 JSX 可以完成上面 API 的工作
