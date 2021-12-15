## React 组件文档

### MarkdownViewer

MarkdownViewer 组件以只读模式显示 markdown 内容。

###### 使用方法

```
import MarkdownViewer from '@seafile/seafile-editor/dist/viewer/markdown-viewer';
···
···
···
<MarkdownViewer
   markdownContent={...} 
   showTOC={ true / false }
   onContentRendered={func}
   activeTitleIndex={number}
/>
```

###### 参数

| 参数名                                      | 类型   | 默认值 | 说明                                                         |
| ------------------------------------------- | ------ | ------ | ------------------------------------------------------------ |
| markdownContent                             | String | ''     | 要显示的 Markdown 内容                                       |
| showTOC                                     | bool   | false  | 是否显示 TOC                                                 |
| `onContentRendered(viewer: MarkdownViewer)` | func   | null   | 文档内容显示后会调用这个函数。父组件可以在此回调函数中获取 MarkdownViewer 的信息 |
| activeTitleIndex                            | number | null   | 要高亮显示的标题序列号（与 showTOC 配合使用）                |

###### 备注

MarkdownViewer 组件宽度为父亲元素的100%，MarkdownViewer 中带有 '.article' 样式类，所以 viewer 中的文本内容自带 editor 编辑器的文本样式，无需再外添加样式。



