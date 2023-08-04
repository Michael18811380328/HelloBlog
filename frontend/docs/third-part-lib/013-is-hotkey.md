# is-hotkey

## 用途

轻量级捕获键盘事件，支持MAC或者传统键盘事件。可以根据不同的事件触发不同的函数(保存或者提交)。

处理键盘输入（处理不同操作系统和键盘下的输入


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

## 性能优化

推荐这种写法，节省性能（这样一个快捷键执行一次）

```js
import isHotkey from 'is-hotkey'
 
const isSaveHotkey = isHotkey('mod+s')

// others
isHotkey('mod+a')
isHotkey('Control+S')
isHotkey('cmd+opt+d')
itHotkey('Meta+DownArrow')
itHotkey('cmd+down')
 
function onKeyDown(e) {
  if (isSaveHotkey(e)) {
    ...
  }
}
```


~~~js
// 直接使用
import isHotkey from 'is-hotkey';

handleKeyDown = (event) => {
  if (isHotkey('mod+s', e)) {
    this.autoSave();
  }
  else if (isHotkey('esc', e)) {
    this.quit();
  }
}

// 批量使用
import isHotkey from 'is-hotkey'

const isSaveHotkey = isHotkey('mod+s');
const isEnterHotkey = isHotkey('enter');

function onKeyDown(e) {
  if (isSaveHotkey(e)) {
    ...
  }
}
~~~

现在更新到 0.2.0 版本

链接：[http://npm.taobao.org/package/is-hotkey](http://npm.taobao.org/package/is-hotkey)

## 其他

单个输入或者普通输入，最好使用原生的 keyCode 判断

多个键输入，或者设计 command 这样的输入，再使用这个库（相对耗时）
