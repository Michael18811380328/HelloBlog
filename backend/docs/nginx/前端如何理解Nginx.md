# 前端该如何理解Nginx

[小杜杜](https://juejin.cn/user/703321119406919/posts)

2022-04-0481,778阅读8分钟

大家好，我叫小杜杜，作为一名小前端，只需要好好写代码，至于部署相关的操作，我们通常接触不到，正所谓专业的人干专业的事，我们在工作中并不需要去配置，但这并不代表不需要了解，相信大家都多多少少听过**nginx**，所以今天就聊聊，还请大家多多支持～

![Nginx (1).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd0a614838ac4aafb10f0275a32ab130~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## Nginx是什么？

`Nginx` (engine x) 是一个**轻量级、高性能的HTTP**和**反向代理服务器**,同时也是一个**通用代理服务器**(TCP/UDP/IMAP/POP3/SMTP),最初由俄罗斯人Igor Sysoev编写。

简单的说：

- `Nginx`是一个拥有高性能HTTP和反向代理服务器，其特点是`占用内存少`，`并发能力强`，并且在现实中，nginx的并发能力要比在同类型的网页服务器中表现要好
- `Nginx`专为`性能优化`而开发，最重要的要求便是`性能`，且十分注重效率，有报告nginx能支持高达50000个并发连接数

## 正向代理和反向代理

Nginx 是一个反向代理服务器，那么反向代理是什么呢？我们先看看什么叫做正向代理

**正向代理**：局域网中的电脑用户想要直接访问网络是不可行的，只能通过代理服务器（Server）来访问，这种代理服务就被称为正向代理。

就好比我们俩在一块，直接对话即可，但如果我和你分隔两地，我们要想对话，必须借助一个通讯设备（如：电话）来沟通，那么这个通讯设备就是"代理服务器"，这种行为称为“正向代理”

那么反向代理是什么呢？

**反向代理**：客户端无法感知代理，因为客户端访问网络不需要配置，只要把请求发送到反向代理服务器，由**反向代理服务器去选择目标服务器**获取数据，然后再返回到客户端，此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器地址，隐藏了真实服务器IP地址。

在正向代理中，我向你打电话，你能看到向你打电话的电话号码，由电话号码知道是我给你打的，那么此时我用`虚拟电话`给你打过去，你看到的不再是我的手机号，而是`虚拟号码`,你便不知道是我给你打的，这种行为变叫做"反向代理"。

在以上述的例子简单的说下：

- 正向代理：我通过我的手机（proxy Server）去给你打电话，相当于**我和我的手机**是一个整体，与你的手机（Server）是分开的
- 反向代理：我通过我的手机（proxy Server）通过软件转化为虚拟号码去给你打电话，此时相当于**我的手机和你的手机**是一个整体，和我是分开的

## 负载均衡

**负载均衡**：是高可用网络基础架构的关键组件，通常用于将工作**负载分布到多个服务器**来提高网站、应用、数据库或其他服务的性能和可靠性。

如果没有负载均衡，客户端与服务端的操作通常是：**客户端请求服务端，然后服务端去数据库查询数据，将返回的数据带给客户端**：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b03812eb40b047be8052ee9288f6798e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

但随着客户端越来越多，数据，访问量飞速增长，这种情况显然无法满足，我们从上图发现，客户端的请求和相应都是通过服务端的，那么我们加大服务端的量，让多个服务端分担，是不是就能解决这个问题了呢？

但此时对于客户端而言，他去访问这个地址就是固定的，才不会去管那个服务端有时间，你只要给我返回出数据就OK了，所以我们就需要一个“管理者“，将这些服务端找个老大过来，客户端直接找老大，再由老大分配谁处理谁的数据，从而减轻服务端的压力，而这个”老大“就是**反向代理服务器**，而端口号就是这些服务端的工号。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6c634ec69f54d5ab76644d8dd78b0c2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

像这样，当有15个请求时，反向代理服务器会平均分配给服务端，也就是各处理5个，这个过程就称之为：**负载均衡**

## 动静分离

当客户端发起请求时，正常的情况是这样的：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f9e589ff2224234ad1413e4c4c58cce~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

就好比你去找客服，一般先是先说一大堆官方的话，你问什么，他都会这么说，那么这个就叫**静态资源（可以理解为是html，css）**

而回答具体的问题时，每个回答都是不同的，而这些不同的就叫做**动态资源（会改变，可以理解为是变量）**

在未分离的时候，可以理解为每个客服都要先说出官方的话，在打出具体的回答，这无异加大了客服的工作量，所以为了更好的有效利用客服的时间，我们把这些官方的话分离出来，找个机器人，让他代替客服去说，这样就减轻了客服的工作量。

也就是说，我们将动态资源和静态资源分离出来，交给不同的服务器去解析，这样就加快了解析的速度，从而降低由单个服务器的压力

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a91e7a373df14e90891e6f4f62a629d7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## 安装 Nginx

关于 nginx 如何安装，这里就不做过多的介绍了，感兴趣的小伙伴看看这篇文章：[【Linux】中如何安装nginx](https://link.juejin.cn/?target=https%3A%2F%2Fblog.csdn.net%2Fyujing1314%2Farticle%2Fdetails%2F97267369)

这里让我们看看一些常用的命令：

- 查看版本：`./nginx -v`
- 启动：`./nginx`
- 关闭：`./nginx -s stop`(推荐) 或 `./nginx -s quit`
- 重新加载nginx配置：`./nginx -s reload`

## Nginx 的配置文件

配置文件分为三个模块：

- 全局块：从配置文件开始到events块之间，主要是设置一些**影响nginx服务器整体运行的配置指令**。（按道理说：并发处理服务的配置时，值越大，可支持的并发处理量越多，但此时会受到硬件、软件等设备等的制约）
- events块：影响**nginx服务器与用户的网络连接**，常用的设置包括是否开启对多workprocess下的网络连接进行序列化，是否允许同时接收多个网络连接等等
- http块：如反向代理和负载均衡都在此配置

## location 的匹配规则

共有四种方式：

```js
js

location[ = | ~ | ~* | ^~ ] url {
    
    }
```

- `=` ：`精确匹配`，用于**不含正则表达式**的url前，要求字符串与url**严格匹配**，完全相等时，才能停止向下搜索并处理请求
- `^~`：用于**不含正则表达式**的url前，要求ngin服务器找到表示**url和字符串匹配度最高**的location后，立即使用此location处理请求，而不再匹配
- `~` ：`最佳匹配`，用于表示url**包含正则表达式**，并且**区分**大小写。
- `~*`：与`~`一样，只是**不区分**大小写

注意：

- 如果 `url` 包含正则表达式，则不需要` ~` 作为开头表示
- nginx的匹配具有`优先顺序`，一旦匹配上就会立马退出，不再进行向下匹配

# 玩转 React Hooks 小册

小册链接：[《玩转 React Hooks》](https://juejin.cn/book/7230622711905517605?utm_source=course_list)

知其然，知其所以然。React Hooks 带来的全新机制让人耳目一新，因为它拓展了 React 的开发思路，为 React 开发者提供了一种更方便、更简洁的选择。

在引入 Hooks 的概念后，函数组件既保留了原本的简洁，也具备了状态管理、生命周期管理等能力，在原来 Class 组件所具备的能力基础上，还解决了 Class 组件存在的一些代码冗余、逻辑难以复用等问题。**因此，在如今的 React 中，Hooks 已经逐渐取代了 Class 的地位，成了主导。**

而且，Hooks 相对于 Class 而言，更容易上手，其`简洁性、逻辑复用性`等特性深受开发者喜爱，可谓是`前端界的"流量明星"`，不止 React，Vue 3.0 、Preact、Solid.js 等框架也都选择加入 Hooks 的大家庭，前端的日常工作也在趋向于 Hooks 开发。

因此，掌握好 React Hooks 是非常有必要的一件事。本小册会通过基础篇、原码篇、实践篇 **`三大方向`** 探讨 Hooks，从原码的角度探寻 React 的奥秘。

除此之外，小册会以 React Hooks 为核心，同时穿插其他知识，如 TS、Jest、Fiber 等核心知识，并包含 React v18 的并发、数据撕裂等概念，最后结合 Hooks 写一个简易版 react-redux 和 Form 表单，通过其设计思想，助你在面试中脱颖而出。

小册整体设计如下`思维导图`所示：

![玩转hooks.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5261b6a18b944ac94cfcbebac0b246a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## End

关于具体的配置可以参考：[写给前端的nginx教程](https://juejin.cn/post/7052952117425733663)

### 其他好文

- [一篇让你完全够用TS的指南](https://juejin.cn/post/7088304364078497800)
- [🔥花一个小时，迅速了解ES6~ES12的全部特性](https://juejin.cn/post/7068935394191998990)
- [10分钟，打造一个专属于你的cli](https://juejin.cn/post/7063657010885034020)
- [通过开水果店，帮你全面了解package.json文件的作用](https://juejin.cn/post/7077805900055969823)
- [打造开箱即用的 react 移动端框架](https://juejin.cn/post/7052204193968291870)