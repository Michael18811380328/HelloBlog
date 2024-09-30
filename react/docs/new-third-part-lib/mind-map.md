# mind-map

[https://github.com/wanglin2/mind-map](https://github.com/wanglin2/mind-map "https://github.com/wanglin2/mind-map")

star 5K

中文名：思绪思维导图。一个简单&强大的 Web 思维导图。

仓库名称：wanglin2/mind-map
截止发稿星数: 4225 (今日新增:16)
仓库语言: Vue
仓库开源协议：MIT License

#### 引言

> wanglin2/mind-map 是一个功能强大的 Web 思维导图。它提供了一个自定义、操作简便且强大的 Web 思维导图。

#### 仓库描述

wanglin2/mind-map 是一个功能强大的 Web 思维导图。它提供了一个自定义、操作简便且强大的 Web 思维导图。

#### 案例

在线思维导图Mac 客户端Windows 客户端Linux 客户端

#### 客观评测或分析

wanglin2/mind-map 因其强大的功能、可定制性和易用性而受到广泛赞誉。它被认为是创建交互式和信息丰富的思维导图的出色工具。

#### 使用建议

要使用 wanglin2/mind-map，可以：

1. 安装 npm 包：npm install simple-mind-map

2. 在您的 HTML 中包含脚本：\<script src="node\_modules/simple-mind-map/dist/index.js">\</script>

3. 创建一个 div 元素作为思维导图容器

4. 实例化思维导图：const mindMap = new MindMap({ el: containerElement });

#### 结论

wanglin2/mind-map 是一个功能齐全且易于使用的 Web 思维导图，非常适合各种场景。其可定制性和插件支持使其成为开发人员和用户的理想选择。

```text
<div id="mindMapContainer"></div>
```

```text
import MindMap from "simple-mind-map";

const mindMap = new MindMap({
  el: document.getElementById("mindMapContainer"),
  data: {
    data: {
      text: "根节点",
    },
    children: [],
  },
});
```

​


