# 017 qrcode.react

## 用途

react 生成二维码组件

## 可靠性

作者是 Paul O’Shannessy，为 reactJS 和 Facebook 贡献代码，可靠性很高。

25000 星号，30万下载

## 官网链接

https://github.com/zpao/qrcode.react

https://www.npmjs.com/package/qrcode.react

## version 1.0 基本使用(2020)

项目中目前使用 1.0.0 版本，基本使用如下。使用 QRCode 类，直接传参 value = string 即可生成二维码。

这是主要使用的版本

```js
var React = require('react');
var QRCode = require('qrcode.react');

React.render(
  <QRCode value="http://facebook.github.io/react/" />,
  mountNode
);
```

## version 3.0 基本使用(2022)

最新版本是 3.0 版本，推荐使用生成 svg 或者 canvas 格式的二维码，主要例子：

SVG

~~~js
import ReactDOM from 'react-dom';
import {QRCodeSVG} from 'qrcode.react';

ReactDOM.render(
  <QRCodeSVG value="https://reactjs.org/" />,
  document.getElementById('mountNode')
);
~~~

canvas

~~~js
import ReactDOM from 'react-dom';
import {QRCodeCanvas} from 'qrcode.react';

ReactDOM.render(
  <QRCodeCanvas value="https://reactjs.org/" />,
  document.getElementById('mountNode')
);
~~~

不推荐直接使用 `<QRCode value="https://reactjs.org/" renderAs="canvas" />`这样的形式

主要 props

### Available Props

| prop            | type                         | default value |
| --------------- | ---------------------------- | ------------- |
| `value`         | `string`                     |               |
| `renderAs`      | `string` (`'canvas' 'svg'`)  | `'canvas'`    |
| `size`          | `number`                     | `128`         |
| `bgColor`       | `string` (CSS color)         | `"#FFFFFF"`   |
| `fgColor`       | `string` (CSS color)         | `"#000000"`   |
| `level`         | `string` (`'L' 'M' 'Q' 'H'`) | `'L'`         |
| `includeMargin` | `boolean`                    | `false`       |
| `imageSettings` | `object` (see below)         |               |

### imageSettings

| field      | type      | default value     |
| ---------- | --------- | ----------------- |
| `src`      | `string`  |                   |
| `x`        | `number`  | none, will center |
| `y`        | `number`  | none, will center |
| `height`   | `number`  | 10% of `size`     |
| `width`    | `number`  | 10% of `size`     |
| `excavate` | `boolean` | `false`           |

