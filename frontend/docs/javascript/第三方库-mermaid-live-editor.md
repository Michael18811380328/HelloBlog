# mermaid-live-editor 

一款流程图工具（TS+JS）

教程：https://mermaid.js.org/intro/

源码：https://github.com/mermaid-js/mermaid-live-editor 目前 3.7K stars 

在线演示：https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNpVkM9qhEAMxl8l5NTC-gIeCl1t97Klhe7N2UPQ6Azr_GGMLIv67h2VQptTku-Xj_BNWPuGMce29_daUxS4lMpBqteq0NEMYmm4Qpa9zCcWsN7xY4bj08nDoH0IxnXPO39cISim84oxiDbutuxSsd1_Op6hrM4UxIfrX-Vy9zO8VeZLJ_v_io6crt6rlvKWspoiFBQ3BA9oOVoyTXp_WjcKRbNlhXlqG25p7EWhcktCaRT__XA15hJHPmD0Y6cxefZDmsbQkHBpqItkfxFujPj4seezxbT8AEAgYho

Mermaid 是一个基于 Javascript 的图表绘制工具，通过解析类 [Markdown](https://so.csdn.net/so/search?q=Markdown&spm=1001.2101.3001.7020) 的文本语法来实现图表的创建和动态修改。Mermaid 诞生的主要目的是让文档的更新能够及时跟上开发进度。

国内博文链接：https://blog.csdn.net/qq_42818403/article/details/122599306 这里介绍了很多类型的图

关键的问题：单独的语法和格式

~~~
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
~~~

