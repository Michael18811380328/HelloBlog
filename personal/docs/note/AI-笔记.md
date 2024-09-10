# AI笔记 

 原始表格链接：https://cloud.seatable.cn/dtable/external-links/59b453a8639945478de2/

 
## 0690 日常前端工作中，使用了哪些AI？


Codeium

Monica

中文的 文心一言

CHATGPT 3.5

   
## 0691 项目中使用了哪些 AI？


项目中 AI 主要是后端实现具体逻辑，或者是调用外部大模型，前端目前在 AI 技术上进行集成

1、AI 助手，赋能传统软件：原来的逻辑是用户需要直接点击按钮，或者进行复杂操作，统计数据。现在我们写了一些 AI 助手，根据用户的自然语言描述，使用开源大模型，然后转换成对应的代码，执行对应的 API 或者功能（统计某人本周的任务，统计表格整体的信息，以统计图形式展现出来），实现了传统软件赋能。

2、AI 搜索，增强搜索范围：这是内部实现的一个 Go 服务，前端调用实现 AI 搜索。关键是文本的分词和分析等，然后计算不同文档的匹配度。zincsearch 基础上改动的。替换了原来的 es 搜索，需要的资源更少 [https://github.com/zincsearch/zincsearch](https://github.com/zincsearch/zincsearch "https://github.com/zincsearch/zincsearch")

3、AI 识别，智能管理图片：识别发票图片，然后进行填写，避免用户手动录入数据。我们内部的技术实现调用了某某的图片识别接口（还有其他身份证，驾照，发票识别等等）市场上有一些开源的工具，例如前端的 tesseract 可以进行识别，但是准确率不是很高，所以我们使用了其他的 AI 接口。

​

  