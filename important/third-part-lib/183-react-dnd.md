# 183 react-dnd

## 用途

react 拖拽组件

## 可靠性

下载量80万

## 官网链接

https://react-dnd.github.io/react-dnd/

https://www.npmjs.com/package/react-dnd

## 基本使用

npm install react-dnd react-dnd-html5-backend

```js
// Let's make <Card text='Write the docs' /> draggable!

import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './Constants'

/**
 * Your Component
 */
export default function Card({ isDragging, text }) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { text },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )
  return (
    <div ref={dragRef} style={{ opacity }}>
      {text}
    </div>
  )
}
```


Hooks API

useDrag
useDrop
useDragLayer
useDragDropManager

## 其他

主要使用高阶函数写的，所以这里需要熟练使用高阶函数

处理数据对象也要熟悉（数据传值）

拖拽层、释放层、整体的拖拽盒子
