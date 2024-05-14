# 008 glamor(魅力)

## 用途

css-in-js

在 JS 代码中，使用 css 语法，

## 可靠性

下载量10万，星星3000，基本使用没问题

这个使用需要和项目中已有的样式统一。这样写，适合特殊的组件需要特殊定制样式，通用的样式不合适。

## 官网链接

https://www.npmjs.com/package/glamor

https://github.com/threepointone/glamor

## 基本使用

```js
import { css } from 'glamor'

// make css rules
let rule = css({
  color: 'red',
  ':hover': {
    color: 'pink'
  },
  '@media(min-width: 300px)': {
    color: 'green',
    ':hover': {
      color: 'yellow'
    }
  }
})

// add as data attributes
<div {...rule} {...another}>
  zomg
</div>

// or as classes
<div className={`${rule} ${another}`}>
  zomg
</div>

// merge rules for great justice
let mono = css({
  fontFamily: 'monospace'
})

let bolder = css({
  fontWeight: 'bolder'
})

<div {...css(mono, bolder)}>
  bold code!
</div>
```

## 其他

具体的 css 写法类似 sass 的语法。

如果在 jsx 中，把 html css js 完全混合在一起，看起来不方便
