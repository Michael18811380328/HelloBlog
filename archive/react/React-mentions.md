# React-mentions 库介绍

最近需要做一个类似微博评论功能@用户的功能，手写JS的效率很低，所以使用 React-mentions 库实现这个功能。看了一下网上没中文介绍，所以自己看完英文介绍简单总结一个中文介绍。

## 使用

### 1、安装

npm 安装

```bash
npm install react-mentions --save
```

### 2、导入

The package exports two React components for rendering the mentions textarea:

可以使用两个React组件来渲染 textarea

```js
import { MentionsInput, Mention } from 'react-mentions';
```

`MensionsInput ` 父组件是主要的渲染输入框（textarea），内部有一个或者多个 `Mension` 子组件，每一个子组件代表特定的提及的数据对象（用户、问题、模板变量等，使用不同的提示符号）。例如：

```jsx
<MentionsInput value={this.state.value} onChange={this.handleChange}>
  <Mention
    trigger="@"
    data={this.props.users}
    renderSuggestion={this.renderUserSuggestion}
  />
  <Mention
    trigger="#"
    data={this.requestTag}
    renderSuggestion={this.renderTagSuggestion}
  />
</MentionsInput>
```

更多链接请点击：https://github.com/signavio/react-mentions/tree/master/demo/src/examples

## 配置

### 1、父组件

MentionsInput 支持下面的 props：

| Props 名称            | 类型                                                    | Default value  | Description                                                  |
| --------------------- | ------------------------------------------------------- | -------------- | ------------------------------------------------------------ |
| value                 | string                                                  | `''`           | 输入框的内容                                                 |
| onChange              | function (event, newValue, newPlainTextValue, mentions) | empty function | 输入框变化的回调函数                                         |
| singleLine            | boolean                                                 | `false`        | 渲染一个单下划线的输入框还是一个 textarea。                  |
| onBlur                | function (event, clickedSuggestion)                     | empty function | 输入框失去焦点回调函数                                       |
| allowSpaceInQuery     | boolean                                                 | false          | 查询关键词中间是否支持空格                                   |
| suggestionsPortalHost | DOM Element                                             | undefined      | Render suggestions into the DOM in the supplied host element. |
| inputRef              | React ref                                               | undefined      | ref 可以获取DOM元素                                          |

### 2、子组件

每一个数据源都使用 Mention 子组件，具有下面的 props 配置

| Prop name        | Type                                                         | Default value                               | Description                                                  |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------ |
| trigger          | regexp or string                                             | `'@'`                                       | Defines the char sequence upon which to trigger querying the data source  触发器，很重要 |
| data             | array or function (search, callback)                         | `null`                                      | An array of the mentionable data entries (objects with `id` & `display` keys, or a filtering function that returns an array based on a query parameter  一个数组或者一个过滤函数，可以根据一个查询参数返回一个数组的函数，很重要 |
| renderSuggestion | function (entry, search, highlightedDisplay, index, focused) | `null`                                      | Allows customizing how mention suggestions are rendered (optional)    可选参数，允许自定义如何渲染文本建议 |
| markup           | string                                                       | `'@[__display__](__id__)'`                  | A template string for the markup to use for mentions 用于标记的模板字符串（用于@用户） |
| displayTransform | function (id, display)                                       | returns `display`                           | Accepts a function for customizing the string that is displayed for a mention 自定义字符串来设置提醒（例如使用 foo 代替 @） |
| regex            | RegExp                                                       | automatically derived from `markup` pattern | Allows providing a custom regular expression for parsing your markup and extracting the placeholder interpolations (optional) |
| onAdd            | function (id, display)                                       | empty function                              | Callback invoked when a suggestion has been added (optional) 当建议选项被添加后的回调函数 |
| appendSpaceOnAdd | boolean                                                      | `false`                                     | Append a space when a suggestion has been added (optional) 当候选人被添加后，加入一个空格（默认不加入） |

如果data参数中传入一个函数，这个函数的第一个参数是当前的搜索函数，第二个参数是回调函数。回调函数可以异步提供结果（如果用户的输入发生变化，回调函数可以多次调用，更新候选人菜单）。

## 样式

组件支持行内样式，外联样式等。如果你想使用CSS，只需要在父组件上设置一个 className ，所有的DOM组件都会加上这个前缀。

## 源码

下面是源码链接

github 链接：https://github.com/signavio/react-mentions

npm 链接：https://www.npmjs.com/package/react-mentions

## 思路

刚开始自己手动写这个功能的思路（基于React框架）：

~~~txt
1、捕获textarea区域的输入事件，当 event.target.keyCode 是对应的键（例如@时），打开一个下拉菜单。

2、继续捕获用户输入，将当前@后面输入的字符获取到，调用后端API搜索符合条件的用户，将获取的结果数组展示到下拉菜单中。如果没有结果下拉菜单中显示”没有找到这个用户“。

3、如果用户继续输入，重复步骤二；如果用户点击菜单中某个选项，调用后端API将这个用户的信息发送即可，关闭下拉菜单。

~~~

难点：如果@多人，使用字符串切割关键词可能出现问题；如果用户频繁输入删除，需要大量后端请求（现在没有设置缓存）性能不佳。



# 英文文档


A React component that let's you mention people in a textarea like you are used to on Facebook or Twitter.

Install the _react-mentions_ package via npm:

```
npm install react-mentions --save
```

The package exports two React components for rendering the mentions textarea:

```javascript
import { MentionsInput, Mention } from 'react-mentions'
```

`MentionsInput` is the main component rendering the textarea control. It takes one or multiple `Mention` components as its children. Each `Mention` component represents a data source for a specific class of mentionable objects, such as users, template variables, issues, etc.

Example:

```jsx
<MentionsInput value={this.state.value} onChange={this.handleChange}>
  <Mention
    trigger="@"
    data={this.props.users}
    renderSuggestion={this.renderUserSuggestion}
  />
  <Mention
    trigger="#"
    data={this.requestTag}
    renderSuggestion={this.renderTagSuggestion}
  />
</MentionsInput>
```

You can find more examples here: [demo/src/examples](https://github.com/signavio/react-mentions/tree/master/demo/src/examples)

## Configuration

The `MentionsInput` supports the following props for configuring the widget:

| Prop name             | Type                                                    | Default value  | Description                                                                            |
| --------------------- | ------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------- |
| value                 | string                                                  | `''`           | The value containing markup for mentions                                               |
| onChange              | function (event, newValue, newPlainTextValue, mentions) | empty function | A callback that is invoked when the user changes the value in the mentions input       |
| singleLine            | boolean                                                 | `false`        | Renders a single line text input instead of a textarea, if set to `true`               |
| onBlur                | function (event, clickedSuggestion)                     | empty function | Passes `true` as second argument if the blur was caused by a mousedown on a suggestion |
| allowSpaceInQuery     | boolean                                                 | false          | Keep suggestions open even if the user separates keywords with spaces.                 |
| suggestionsPortalHost | DOM Element                                             | undefined      | Render suggestions into the DOM in the supplied host element.                          |
| inputRef              | React ref                                               | undefined      | Accepts a React ref to forward to the underlying input element                         |

Each data source is configured using a `Mention` component, which has the following props:

| Prop name        | Type                                                         | Default value                               | Description                                                                                                                                            |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| trigger          | regexp or string                                             | `'@'`                                       | Defines the char sequence upon which to trigger querying the data source                                                                               |
| data             | array or function (search, callback)                         | `null`                                      | An array of the mentionable data entries (objects with `id` & `display` keys, or a filtering function that returns an array based on a query parameter |
| renderSuggestion | function (entry, search, highlightedDisplay, index, focused) | `null`                                      | Allows customizing how mention suggestions are rendered (optional)                                                                                     |
| markup           | string                                                       | `'@[__display__](__id__)'`                  | A template string for the markup to use for mentions                                                                                                   |
| displayTransform | function (id, display)                                       | returns `display`                           | Accepts a function for customizing the string that is displayed for a mention                                                                          |
| regex            | RegExp                                                       | automatically derived from `markup` pattern | Allows providing a custom regular expression for parsing your markup and extracting the placeholder interpolations (optional)                          |  |
| onAdd            | function (id, display)                                       | empty function                              | Callback invoked when a suggestion has been added (optional)                                                                                           |
| appendSpaceOnAdd | boolean                                                      | `false`                                     | Append a space when a suggestion has been added (optional)                                                                                             |

If a function is passed as the `data` prop, that function will be called with the current search query as first, and a callback function as second argument. The callback can be used to provide results asynchronously, e.g., after fetch requests. (It can even be called multiple times to update the list of suggestions.)

## Styling

_react-mentions_ supports css, css modules, and inline styles. It is shipped with only some essential inline style definitions and without any css. Some example inline styles demonstrating how to customize the appearance of the `MentionsInput` can be found at [demo/src/examples/defaultStyle.js](https://github.com/signavio/react-mentions/blob/master/demo/src/examples/defaultStyle.js).

If you want to use css, simply assign a `className` prop to `MentionsInput`. All DOM nodes rendered by the component will then receive class name attributes that are derived from the base class name you provided.

If you want to avoid global class names and use css modules instead, you can provide the automatically generated class names as `classNames` to the `MentionsInput`. See [demo/src/examples/CssModules.js](https://github.com/signavio/react-mentions/blob/master/demo/src/examples/CssModules.js) for an example of using _react-mentions_ with css modules.

You can also assign `className` and `style` props to the `Mention` elements to define how to highlight the mentioned words.

