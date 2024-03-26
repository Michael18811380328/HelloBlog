# 192 react-select

## 用途

react 的选择器组件，支持同步和异步选择（请求结果）

## 可靠性

270万下载，经常使用

## 官网链接

https://www.npmjs.com/package/react-select


## 基本使用

```js
import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class App extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}
```

Props

Common props you may want to specify include:

```
autoFocus - focus the control when it mounts
className - apply a className to the control
classNamePrefix - apply classNames to inner elements with the given prefix
isDisabled - disable the control
isMulti - allow the user to select multiple values
isSearchable - allow the user to search for matching options
name - generate an HTML input with this name, containing the current value
onChange - subscribe to change events
options - specify the options the user can select from
placeholder - change the text displayed when no option is selected
value - control the current value
```

## 其他 react-select 获取内部类名

react-select 这个第三方组件，我需要项目内部定制一些样式。

但是界面点击时，很难通过鼠标直接获取界面上的元素节点的类名。

下面是偶然一次测试获取的类名

注意 react-select 的版本号对应，其中 `preCls` 是前缀

~~~html
<div class="css-kj6f9i-menu preCls__menu">
  <div class="css-11unzgr preCls__menu-list">
    <div class="css-1mhelce-option preCls__option preCls__option--is-focused" id="react-select-3-option-0" tabindex="-1">
      <div>可读写
        <div class="preCls-explanation">用户可以查看、修改表格。但是不能安装插件和共享表格。</div>
      </div>
    </div>
    <div class="css-fk865s-option preCls__option" id="react-select-3-option-1" tabindex="-1">
      <div>只读
        <div class="preCls-explanation">用户可以查看表格，但是不能修改。</div>
      </div>
    </div>
  </div>
</div>
~~~
