# 我的 REACT 2015 之路

这是阿里巴巴核心前端成员的 2015 年 react 总结。

首先要感谢 React，拯救了我的第一个职业倦怠期，自 2014 年带着 React 在蚂蚁必定能有所作为的执念来到这里，经过 2015 一年惊心动魄的历程，期间基本没精力写文章，在小伙伴们的帮助下到如今终于开花结果，回想 2015，感激而庆幸。

## 业务特点

经典的冰山理论：

![img](https://img.alicdn.com/tps/TB1waVoJVXXXXaBXFXXXXXXXXXX-1678-1218.jpg)

中后台系统繁多，前端人员严重不足

## 应用方案

采用全栈开发模式，人人都是前端，而前端专业团队提供基础前端架构与基础设施

![img](https://img.alicdn.com/tps/TB1BLFaJVXXXXX0XFXXXXXXXXXX-854-942.png)

## 前端架构

根据公司的技术特点（java 开发为主）提出了基于 React（class based es6） 的前端架构

![img](https://img.alicdn.com/tps/TB1EPZ.JFXXXXacaXXXXXXXXXXX-1100-1098.png)

### 组件

在组件方面形成了 [antd](http://ant.design/)/[antm](https://blog.yiminghe.me/2016/05/13/react-at-2015/被和谐)/[react-component](http://github.com/react-component) 的三驾马车

![img](https://img.alicdn.com/tps/TB1Ff.7JFXXXXbdaXXXXXXXXXXX-1886-1396.png)

其中定位各有侧重

|        | react-component | antd               |
| :----- | :-------------- | :----------------- |
| 定位   | 提供底层功能    | 完善的套件         |
| 样式   | 提供参考样式    | 统一的设计规范     |
| 配置   | 强大，复杂      | 精简               |
| 文档   | 高阶，复杂      | 精美，面向初级用户 |
| 扩展性 | 高              | 低                 |

[antd](http://ant.design/) 目前有 50+ 基础组件，特点包括： 实用主义，小而美，统一交互，完善动画等。

![img](https://img.alicdn.com/tps/TB1bFRuJVXXXXcdXpXXXXXXXXXX-1602-1058.png)

而正在进行中的 antm 则力图在 mobile web, react-native 领域有所作为:

![img](https://img.alicdn.com/tps/TB19CA9JFXXXXaQaXXXXXXXXXXX-1526-1406.png)

### 工具

基于 webpack babel koa anyproxy 封装了简单易用的 [ant-tool](http://github.com/ant-tool)，涵盖了开发流程的各个方面：

![img](https://img.alicdn.com/tps/TB1vctcJVXXXXbjXVXXXXXXXXXX-1238-612.png)

### 应用架构

探索适合蚂蚁业务的应用架构 roof，包含两层含义

首先是一个轻量级的 roof 核心数据绑定功能，满足大部分的一般应用。

![img](https://img.alicdn.com/tps/TB1UrVjJVXXXXXsXVXXXXXXXXXX-1212-830.png)

其次是对于复杂业务由 roof 精心挑选社区的优秀类库组合形成推荐的应用架构，包括

![img](https://img.alicdn.com/tps/TB1z28sJVXXXXbHXpXXXXXXXXXX-1922-736.png)

![img](https://img.alicdn.com/tps/TB18iBIJVXXXXXeXXXXXXXXXXXX-1774-938.png)

## 业务结合

如今 antd 已覆盖蚂蚁金服全部前端系统的 40%, 中台新系统覆盖率接近 100%，取得了良好效果：

整体反馈良好，在 [蚂蚁技术年度盛典](https://blog.yiminghe.me/2016/05/13/react-at-2015/被和谐) 中获得点赞前10，对于一个纯前端项目十分难得。

## 集团合作

antd 在淘宝，天猫，钉钉，阿里云等兄弟公司也多有直接应用，其宝贵反馈对 antd 的完善起到了重要作用。

对于有自己鲜明设计特点的团队，基于 react-component 各自搭建了具备自己特色的 UI 框架，其宝贵反馈对 react-component 的完善起到了重要作用. 例如

[http://uxco.re](http://uxco.re/)

## 分享

2015 我们在 D2, [QCON](https://speakerdeck.com/yiminghe/antd-at-qcon2016), [合作公司饿了么](https://blog.yiminghe.me/2016/05/13/react-at-2015/speakerdeck.com/yiminghe/react-based-architecture) 都有分享和交流，思维碰撞激发了新的方向。

更有幸前往 facebook 参加 f8，和 react 核心开发 ben 当面交流，之后线上交流感觉更加顺畅了.

![img](https://img.alicdn.com/tps/TB1j4pCJVXXXXcOXXXXXXXXXXXX-600-400.jpg)

## 外部发展

antd 发布一年后在国内外社区有了广泛的影响力

![img](https://img.alicdn.com/tps/TB1c.E8JFXXXXbaaXXXXXXXXXXX-1770-1002.png)

不仅在国内积累了不少 [忠实用户](https://github.com/ant-design/ant-design/issues/477)，国外也开始了使用和 [关注](http://waywardmonkeys.org/2016/03/14/finding-a-user-interface-library/)。

pr:

![img](https://img.alicdn.com/tps/TB1wh4XJVXXXXcpXVXXXXXXXXXX-1398-978.png)

推广：

![img](https://img.alicdn.com/tps/TB1kcXyJVXXXXXPXpXXXXXXXXXX-1584-436.png)

对于 react-component 基础组件更是数不胜数。

这对 antd 的完善和团队的激励起到了重要作用.

## react 上游

我们在开发组件过程中遇到诸多问题，反馈 react 后也得到了核心团队的积极回应，[patch](https://github.com/facebook/react/pulls?utf8=&q=yiminghe) 大多也得以合并主干。

![img](https://img.alicdn.com/tps/TB1I6BbJVXXXXbjXVXXXXXXXXXX-1024-418.png)

## 接下来的路

未来我们除了对 antd 承诺的持续投入，将依靠 antm 发力移动时代，依托 react-native 提高移动端的前端体验，在应用架构／工具方面紧跟社区进展，将最好的东西带给我们的业务，同时将我们业务遇到的问题，创新抽象反馈社区。

最后期待同大家的合作和交流。