# is-hotkey

## 用途

处理键盘输入（不同操作系统和键盘下的输入)


## 可靠性

200颗星星，下载量20万

## 官网链接

https://www.npmjs.com/package/is-hotkey

https://github.com/ianstormtaylor/is-hotkey

## 基本使用

```js
import isHotkey from 'is-hotkey'
 
function onKeyDown(e) {
  if (isHotkey('mod+s', e)) {
    ...
  }
}
```

支持一次渲染

```js
import isHotkey from 'is-hotkey'
 
const isSaveHotkey = isHotkey('mod+s')
 
function onKeyDown(e) {
  if (isSaveHotkey(e)) {
    ...
  }
}
```

## 其他

单个输入或者普通输入，最好使用原生的 keyCode 判断

多个键输入，或者设计 command 这样的输入，再使用这个库（相对耗时）
