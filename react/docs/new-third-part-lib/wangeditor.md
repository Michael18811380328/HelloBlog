# wangeditor

这是一个富文本编辑器组件，‌适用于需要用户输入文本并格式化的场景。‌

[https://www.npmjs.com/package/@wangeditor/editor](https://www.npmjs.com/package/@wangeditor/editor "https://www.npmjs.com/package/@wangeditor/editor")

开源 Web 富文本编辑器，开箱即用，配置简单。支持 JS Vue React 。

* [文档](https://www.wangeditor.com/)

[www.wangeditor.com/](https://www.wangeditor.com/)

[github.com/wangeditor-team/wangEditor](https://github.com/wangeditor-team/wangEditor)

18K stars

```text
npm i @wangeditor/editor
```

```javascript
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar } from '@wangeditor/editor'

// 创建编辑器
const editor = createEditor({
  selector: '#editor-container'
})
// 创建工具栏
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container'
})



```

​


