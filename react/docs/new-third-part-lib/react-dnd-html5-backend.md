# 184 react-dnd-html5-backend

## 用途

The officially supported HTML5 backend for React DnD. 

## 可靠性

## 官网链接

https://www.npmjs.com/package/react-dnd-html5-backend

https://react-dnd.github.io/react-dnd/docs/backends/html5


## 基本使用

```js
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default function MyReactApp() {
  return (
    <DndProvider backend={HTML5Backend}>
      /* your drag-and-drop application */
    </DndProvider>
  )
}
```

## 其他

和 183 联合使用
