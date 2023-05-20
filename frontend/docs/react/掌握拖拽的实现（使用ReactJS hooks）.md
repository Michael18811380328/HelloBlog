# 掌握拖拽的实现（使用ReactJS hooks）

> 原文：[Mastering Drag & Drop using ReactJS hooks](https://link.zhihu.com/?target=https%3A//engineering.datorama.com/mastering-drag-drop-using-reactjs-hooks-fb58dc1f816f)

我介绍了通用的开源拖拽库，例如React-dnd和React-beautiful-dnd，并使用React类组件的方式构建了一个可拖拽组件。现在我要使用React Hooks实现拖拽，并制作一个可排序列表。

<iframe frameborder="0" allowfullscreen="" src="https://www.zhihu.com/video/1156580175243354112?autoplay=false&amp;useMSE=" style="display: block; width: 688px; height: 387px;"></iframe>

使用React hook完成的可排序列表

和以往一样，这里给出了完整的代码和用例。要使用这些示例代码，需安装[styled-components](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/styled-components)和[lodash](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/lodash)。

基本用例：

```js
import React from 'react';
import Draggable from './Draggble';

const App = () => {
  return (
    <div>
      <Draggable onDrag={console.log} id="uniqueId">
        <h2>Drag me</h2>
      </Draggable>
    </div>
  );
};
```

可拖拽组件：

```js
import React, {useState, useCallback, useMemo, useEffect} from 'react';

const POSITION = {x: 0, y: 0};

const Draggable = ({children, id, onDrag, onDragEnd}) => {
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION
  });
    
  const handleMouseDown = useCallback(({clientX, clientY}) => {
    setState(state => ({
      ...state,
      isDragging: true,
      origin: {x: clientX, y: clientY}
    }));
  }, []);
    
  const handleMouseMove = useCallback(({clientX, clientY}) => {
    const translation = {x: clientX - state.origin.x, y: clientY - state.origin.y};
        
    setState(state => ({
      ...state,
      translation
    }));
        
    onDrag({translation, id});
  }, [state.origin, onDrag, id]);
    
  const handleMouseUp = useCallback(() => {
    setState(state => ({
      ...state,
      isDragging: false
    }));
        
    onDragEnd();
  }, [onDragEnd]);
    
  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      setState(state => ({...state, translation: {x: 0, y: 0}}));
    }
  }, [state.isDragging, handleMouseMove, handleMouseUp]);
    
  const styles = useMemo(() => ({
    cursor: state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
    transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
    transition: state.isDragging ? 'none' : 'transform 500ms',
    zIndex: state.isDragging ? 2 : 1,
    position: state.isDragging ? 'absolute' : 'relative'
  }), [state.isDragging, state.translation]);
    
  return (
    <div style={styles} onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
};

export default Draggable;
```

可排序列表：

```js
import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {range, inRange} from 'lodash';
import Draggable from './Draggable';

const MAX = 5;
const HEIGHT = 80;

const App = () => {
  const items = range(MAX);
  const [state, setState] = useState({
    order: items,
    dragOrder: items, // items order while dragging
    draggedIndex: null
  });
    
  const handleDrag = useCallback(({translation, id}) => {
    const delta = Math.round(translation.y / HEIGHT);
    const index = state.order.indexOf(id);
    const dragOrder = state.order.filter(index => index !== id);
        
    if (!inRange(index + delta, 0, items.length)) {
      return;
    }
        
    dragOrder.splice(index + delta, 0, id);
        
    setState(state => ({
      ...state,
      draggedIndex: id,
      dragOrder
    }));
  }, [state.order, items.length]);
    
  const handleDragEnd = useCallback(() => {
    setState(state => ({
      ...state,
      order: state.dragOrder,
      draggedIndex: null
    }));
  }, []);
    
  return (
    <Container>
      {items.map(index => {
        const isDragging = state.draggedIndex === index;
        const top = state.dragOrder.indexOf(index) * (HEIGHT + 10);
        const draggedTop = state.order.indexOf(index) * (HEIGHT + 10);
                
        return (
          <Draggable
            key={index}
            id={index}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <Rect
              isDragging={isDragging}
              top={isDragging ? draggedTop : top}
            >
             {index}
            </Rect>
          </Draggable>
        );
      })}
    </Container>
  );
};

export default App;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const Rect = styled.div.attrs(props => ({
  style: {
    transition: props.isDragging ? 'none' : 'all 500ms'
  }
}))`
  width: 300px;
  user-select: none;
  height: ${HEIGHT}px;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${({top}) => 100 + top}px;
  left: calc(50vw - 150px);
  font-size: 20px;
  color: #777;
`;
```

## 可拖拽组件

mouseDown事件是我们组件的入口点——我们将鼠标位置{x, y}储存在state.origin下，并为mouseMove 和 mouseUp添加两个事件监听器。

在鼠标移动时，使用当前的鼠标位置计算鼠标的移动距离。

```js
const translation = {
    x: clientX - state.origin.x, 
    y: clientY - state.origin.y
  };
```

当用户松开鼠标按键（mouseUp），将事件监听器移除，并重置移动距离。

使用useMemo hook缓存组件的样式：

```js
const styles = useMemo(() => ({
    cursor: state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
    transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
    transition: state.isDragging ? 'none' : 'transform 500ms',
    zIndex: state.isDragging ? 2 : 1,
    position: state.isDragging ? 'absolute' : 'relative'
  }), [state.isDragging, state.translation]);
```

## 创建可排序列表

我们来用该可拖拽组件创建一个可排序列表。想法是依据一个数组对所有列表项进行定位，因此在数组中储存的是列表项的id。例如

```js
const order = [1, 0, 2, 3, 4];
```

表示第一个列表项（id为0）处于第二位。第二个列表项（id为1）位于第一位，等等。

每次拖拽事件触发时，我们获取元素的移动距离{x, y}和id。根据Y轴的位移重排数组。

为了让被拖拽列表项在拖拽过程时仍以原位置为基础计算位移，避免不必要的动画，我们使用了两个数组

**order**—被拖拽列表项在拖拽中使用它定位，在静止时所有列表项使用它定位。

**dragOrder**—在拖拽过程中，除了被拖拽列表项，其余列表项使用它定位。

```js
  const handleDrag = useCallback(({translation, id}) => {
    const delta = Math.round(translation.y / HEIGHT);
    const index = state.order.indexOf(id);
    const dragOrder = state.order.filter(index => index !== id);
  
    if (!inRange(index + delta, 0, items.length)) {
      return;
    }
  
    dragOrder.splice(index + delta, 0, id);
  
    setState(state => ({
      ...state,
      draggedIndex: id,
      dragOrder
    }));
  }, [state.order, items.length]);
```

可以看到在onDrag事件触发时，我们获取位移和列表项的id，这样我们可以计算下一步的dragOrder数组，并检查组件是否被放在合法的位置，即在0和列表项总数之间。

最后，在dragEnd事件触发时，更新order数组

```js
  const handleDragEnd = useCallback(() => {
    setState(state => ({
      ...state,
      order: state.dragOrder,
      draggedIndex: null
    }));
  }, []);
```

现在，我们已经说明了如何实现可拖放列表，还可以进一步改善用户体验和性能

要生成更平滑的动画（这样在松开鼠标时zIndex不会改变），需要在重置translation后，等待X ms才将isDragging标志位改为false。

在本例中我们处理的列表项高度是固定的，要使用动态的高度，可以将高度储存在一个引用map中，在计算定位时使用。

要改善性能，我们可以对handleDrag函数进行节流，例如每200ms计算一次新的dragOrder。

这就是如何用hook实现拖拽的简要解释。希望对你有帮助。Cheers! Shay
