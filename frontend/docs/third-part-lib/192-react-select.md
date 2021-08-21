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

```js
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

## 其他
