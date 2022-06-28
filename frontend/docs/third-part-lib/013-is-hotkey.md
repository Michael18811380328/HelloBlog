# is-hotkey

## 用途

处理键盘输入（处理不同操作系统和键盘下的输入)


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

## 其他

单个输入或者普通输入，最好使用原生的 keyCode 判断

多个键输入，或者设计 command 这样的输入，再使用这个库（相对耗时）

## 源码分析

```js


/**
 * Constants. 常量
 */

// 判断是否是 MAC
const IS_MAC = (
  typeof window != 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform)
)

const MODIFIERS = {
  alt: 'altKey',
  control: 'ctrlKey',
  meta: 'metaKey',
  shift: 'shiftKey',
}

const ALIASES = {
  add: '+',
  break: 'pause',
  cmd: 'meta',
  command: 'meta',
  ctl: 'control',
  ctrl: 'control',
  del: 'delete',
  down: 'arrowdown',
  esc: 'escape',
  ins: 'insert',
  left: 'arrowleft',
  mod: IS_MAC ? 'meta' : 'control',
  opt: 'alt',
  option: 'alt',
  return: 'enter',
  right: 'arrowright',
  space: ' ',
  spacebar: ' ',
  up: 'arrowup',
  win: 'meta',
  windows: 'meta',
}

const CODES = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  control: 17,
  alt: 18,
  pause: 19,
  capslock: 20,
  escape: 27,
  ' ': 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  arrowleft: 37,
  arrowup: 38,
  arrowright: 39,
  arrowdown: 40,
  insert: 45,
  delete: 46,
  meta: 91,
  numlock: 144,
  scrolllock: 145,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  '\'': 222,
}

for (var f = 1; f < 20; f++) {
  CODES['f' + f] = 111 + f
}

/**
 * Is hotkey?
 */

function isHotkey(hotkey, options, event) {
  if (options && !('byKey' in options)) {
    event = options
    options = null
  }

  if (!Array.isArray(hotkey)) {
    hotkey = [hotkey]
  }

  const array = hotkey.map(string => parseHotkey(string, options))
  const check = e => array.some(object => compareHotkey(object, e))
  const ret = event == null ? check : check(event)
  return ret
}

function isCodeHotkey(hotkey, event) {
  return isHotkey(hotkey, event)
}

function isKeyHotkey(hotkey, event) {
  return isHotkey(hotkey, { byKey: true }, event)
}

/**
 * Parse.
 */

function parseHotkey(hotkey, options) {
  const byKey = options && options.byKey
  const ret = {}

  // Special case to handle the `+` key since we use it as a separator.
  hotkey = hotkey.replace('++', '+add')
  const values = hotkey.split('+')
  const { length } = values

  // Ensure that all the modifiers are set to false unless the hotkey has them.
  for (const k in MODIFIERS) {
    ret[MODIFIERS[k]] = false
  }

  for (let value of values) {
    const optional = value.endsWith('?') && value.length > 1;

    if (optional) {
      value = value.slice(0, -1)
    }

    const name = toKeyName(value)
    const modifier = MODIFIERS[name]

    if (value.length > 1 && !modifier && !ALIASES[value] && !CODES[name]) {
      throw new TypeError(`Unknown modifier: "${value}"`)
    }

    if (length === 1 || !modifier) {
      if (byKey) {
        ret.key = name
      } else {
        ret.which = toKeyCode(value)
      }
    }

    if (modifier) {
      ret[modifier] = optional ? null : true
    }
  }

  return ret
}

/**
 * Compare.
 */

function compareHotkey(object, event) {
  for (const key in object) {
    const expected = object[key]
    let actual

    if (expected == null) {
      continue
    }

    if (key === 'key' && event.key != null) {
      actual = event.key.toLowerCase()
    } else if (key === 'which') {
      actual = expected === 91 && event.which === 93 ? 91 : event.which
    } else {
      actual = event[key]
    }

    if (actual == null && expected === false) {
      continue
    }

    if (actual !== expected) {
      return false
    }
  }

  return true
}

/**
 * Utils.
 */

function toKeyCode(name) {
  name = toKeyName(name)
  const code = CODES[name] || name.toUpperCase().charCodeAt(0)
  return code
}

function toKeyName(name) {
  name = name.toLowerCase()
  name = ALIASES[name] || name
  return name
}

/**
 * Export.
 */

export default isHotkey

export {
  isHotkey,
  isCodeHotkey,
  isKeyHotkey,
  parseHotkey,
  compareHotkey,
  toKeyCode,
  toKeyName,
}


```
