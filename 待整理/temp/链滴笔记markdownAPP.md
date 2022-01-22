# 链滴笔记，连接点滴


## 💡 简介

链滴笔记是一款开源的桌面端笔记应用，支持 Windows、Mac 和 Linux。


## ✨ 特性

- 为 Markdown 而生
  - 支持三种编辑模式
    - 所见即所得：对不熟悉 Markdown 的用户较为友好，熟悉 Markdown 的话也可以无缝使用
    - 即时渲染：对熟悉 Typora 的用户应该不会感到陌生，理论上这是最优雅的 Markdown 编辑方式
    - 分屏预览：适合大屏下的 Markdown 编辑
  - 支持数学公式、图表、流程图、甘特图、时序图、五线谱等
  - Markdown 文本格式化
  - 粘贴 HTML 自动转换为 Markdown
  - 配置 Markdown 解析渲染细节参数
    - 是否启用脚注支持
    - 是否启用 [ToC] 支持
    - 是否需要中西文间自动插入空格
    - 是否进行自动术语修正
    - 中文后跟英文逗号句号等标点是否自动替换为中文对应标点
    - 内联数学公式是否允许起始 $ 后紧跟数字
    - 数学公式引擎切换 MathJax、KaTeX
- WebDAV 挂载远程目录
- Double Shift 快速导航
- 全文搜索
- 明亮、暗黑两套主题
- 标签聚合分类 `TBD`
- 导出静态站点，内置多套主题 `TBD`

## 📸 截图

### 所见即所得

*所见即所得*模式对不熟悉 Markdown 的用户较为友好，熟悉 Markdown 的话也可以无缝使用。

[![vditor-wysiwyg](https://camo.githubusercontent.com/462843b50c3c9212026cebc290410925c745e455/68747470733a2f2f696d672e6861637061692e636f6d2f66696c652f323032302f30332f777973697779672d39346331336437382e676966)](https://camo.githubusercontent.com/462843b50c3c9212026cebc290410925c745e455/68747470733a2f2f696d672e6861637061692e636f6d2f66696c652f323032302f30332f777973697779672d39346331336437382e676966)

### 即时渲染

*即时渲染*模式对熟悉 Typora 的用户应该不会感到陌生，理论上这是最优雅的 Markdown 编辑方式。

[![vditor-ir](https://camo.githubusercontent.com/a528b63e1a3d7ec6987e2628984efa49cc0fa994/68747470733a2f2f696d672e6861637061692e636f6d2f66696c652f323032302f30332f69722d36643738346331662e676966)](https://camo.githubusercontent.com/a528b63e1a3d7ec6987e2628984efa49cc0fa994/68747470733a2f2f696d672e6861637061692e636f6d2f66696c652f323032302f30332f69722d36643738346331662e676966)

### 分屏预览

传统的*分屏预览*模式适合大屏下的 Markdown 编辑。

[![vditor-sv](https://camo.githubusercontent.com/e93a7623c3b5c45490416e078249092fd933f421/68747470733a2f2f696d672e6861637061692e636f6d2f66696c652f323032302f30332f73762d37373630353563652e676966)](https://camo.githubusercontent.com/e93a7623c3b5c45490416e078249092fd933f421/68747470733a2f2f696d672e6861637061692e636f6d2f66696c652f323032302f30332f73762d37373630353563652e676966)

### 明亮主题

[![light.png](https://camo.githubusercontent.com/8ef35ebadd9ff5b58d0b7edacc84a18d580a2d88/68747470733a2f2f696d672e6861637061692e636f6d2f66696c652f323032302f30332f6c696768742d34353538343735392e706e67)](https://camo.githubusercontent.com/8ef35ebadd9ff5b58d0b7edacc84a18d580a2d88/68747470733a2f2f696d672e6861637061692e636f6d2f66696c652f323032302f30332f6c696768742d34353538343735392e706e67)

### 暗黑主题

[![dark.png](https://camo.githubusercontent.com/8eff5f95651a314e6c0807b006064a0a15a6cb63/68747470733a2f2f696d672e6861637061692e636f6d2f66696c652f323032302f30332f6461726b2d33633761373465362e706e67)](https://camo.githubusercontent.com/8eff5f95651a314e6c0807b006064a0a15a6cb63/68747470733a2f2f696d672e6861637061692e636f6d2f66696c652f323032302f30332f6461726b2d33633761373465362e706e67)

### Markdown 配置

[![markdown.png](https://camo.githubusercontent.com/d6fcabb03446d824cbc1eeb515ece6c431bc7a1a/68747470733a2f2f696d672e6861637061692e636f6d2f66696c652f323032302f30332f6d61726b646f776e2d65303466613765652e706e67)](https://camo.githubusercontent.com/d6fcabb03446d824cbc1eeb515ece6c431bc7a1a/68747470733a2f2f696d672e6861637061692e636f6d2f66696c652f323032302f30332f6d61726b646f776e2d65303466613765652e706e67)

### 全文搜索

[![search.png](https://camo.githubusercontent.com/3ac981ce00d7c865e3ce18a9f5bee0077f20e7e6/68747470733a2f2f696d672e6861637061692e636f6d2f66696c652f323032302f30332f7365617263682d37626138616635662e706e67)](https://camo.githubusercontent.com/3ac981ce00d7c865e3ce18a9f5bee0077f20e7e6/68747470733a2f2f696d672e6861637061692e636f6d2f66696c652f323032302f30332f7365617263682d37626138616635662e706e67)

## 🛠️ 安装

### 安装包

- [GitHub](https://github.com/88250/liandi/releases)
- [码云](https://gitee.com/dl88250/liandi/releases)
- [本地下载](https://liandi.b3log.org/releases)

### 源码构建

1. 安装 Go、Node 环境
2. 运行项目根目录下的 build 脚本
3. 构建成功后将在 app/build 下生成安装包

如果你要修改源码，请按如下步骤搭建开发环境：

1. 在 kernel 目录下构建内核并启动
   - Windows：`go build -o kernel.exe && kernel.exe`
   - Mac：`go build -o kernel-darwin && ./kernel-darwin`
   - Linux：`go build -o kernel-linux && ./kernel-linux`
2. 在 app 目录下构建前端 `npm run dev` 并启动主进程 `npm run start`

## 🏗️ 技术架构

[![arch.png](https://camo.githubusercontent.com/6e3284bca7e02a4a516bc66f0d6277240dd22fd2/68747470733a2f2f696d672e6861637061692e636f6d2f66696c652f323032302f30312f2545392539332542452545362542422542342545372541432539342545382541452542302545362539452542362545362539452538342545352539422542452d39656331336364362e706e67)](https://camo.githubusercontent.com/6e3284bca7e02a4a516bc66f0d6277240dd22fd2/68747470733a2f2f696d672e6861637061692e636f6d2f66696c652f323032302f30312f2545392539332542452545362542422542342545372541432539342545382541452542302545362539452542362545362539452538342545352539422542452d39656331336364362e706e67)

- 通过 Electron 实现主进程，启动后拉起 golang 实现的内核进程
- 内核实现 WebSocket 服务端和主进程交互
- 内核实现 WebDAV 服务端和客户端
- 文件存取（包括操作本地文件）通过 WebDAV 客户端进行
- Markdown 文件启动和挂载时加载到内存实现全文搜索
- 通过 Vditor 编辑器实现 Markdown 所见即所得编辑模式

## 📜 文档

- [链滴笔记 - 一款桌面端笔记应用，支持 Windows、Mac 和 Linux](https://hacpai.com/article/1582274499427)
- [链滴笔记路线图](https://hacpai.com/article/1579786655216)

- https://github.com/88250/liandi/issues/new/choose)
