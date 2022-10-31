import React from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function Box() {

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: 'BOX',
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  // 第一个参数 isDragging 表示拖动的状态(bool)
  // 第二个参数 drag 是拖动组件的 ref
  // 第三个参数 dragPreview 是可选参数，拖动组件的预览
  // This is optional. The dragPreview will be attached to the dragSource by default 
  return (
    <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1}}>
        {/* The drag ref marks this node as being the "pick-up" node */}
        <div role="Handle" ref={drag} />
    </div>
  )
}

function Bucket() {

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'BOX',
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  // 两个参数
  // 第一个是释放的状态（能否释放，是否经过）
  // 第二个是释放的 ref
  // 需要看一下，hook 能否在普通的 类组件 中使用
  // 目前查到的资料，不能直接在 class 中使用 hook 所以能否转换成函数化组件？

  return (
    <div
      ref={drop}
      role={'Dustbin'}
      style={{ backgroundColor: isOver ? 'red' : 'white' }}
    >
      {canDrop ? 'Release to drop' : 'Drag a box here'}
    </div>
  )
}

// 最外层使用这个组件包裹（外层拖拽层）
function Board() {
  return <DndProvider backend={HTML5Backend}></DndProvider>
}
