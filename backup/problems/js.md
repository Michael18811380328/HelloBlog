由于 immutable 中的数据转换时是哈希，List 对象的size = 1;(实际内存中应该是undefined 和 Text)。这里需要serialize就会出现错误。解决方案：转化成JSON对象，再进行serialize即可避免这个问题。

哈希表：实际底层语言设计数据存储时，会分配较多内存进行存储。如果数据进行扩容，内存可以直接增加。所以底层的内存分配是。对于List等数据结构，可能实际的size和显示的size不是一样的。

对于三个栏目，中间宽度固定，两侧宽度变化；


##### 8.网络协议

一个完整 HTTP 具体过程（TCP 协议，不讨论 websockets 协议）

域名解析——发起 TCP 三次握手——建立 TCP 连接后发起 http 请求——服务器响应 http 请求并给浏览器发送数据——浏览器得到解析 html，继续请求 html 中的其他资源——浏览器渲染页面并呈现给用户。继续了解 websockets 的具体过程。

WebSockets：一个在 TCP 连接上进行的全双工通信渠道的协议。TCP 情况下浏览器发起请求，WebSockets 情况下服务器主动性更强（专业术语不会表达，可以主动请求？）

HTTP 协议、HTTPS 协议、websocket 协议都是在 TCP/IP 协议基础上进行。



##### 9.JS 插件模板

chart.js 制作图表的 JS 插件

react-select 制作下拉菜单


lodash.js
lodash是一套工具库，内部封装了很多字符串、数组、对象等常见数据类型的处理函数。
现在用于比较两个数组或者对象是否相等。
https://www.lodashjs.com/docs/4.17.5.html
https://blog.csdn.net/qq_35414779/article/details/79077618

Immutable.JS
JavaScript中的不可变集合
Immutable.js提供了很多持久化不可变数据结构，包括： List, Stack, Map, OrderedMap, Set, OrderedSet以及Record。


https://github.com/gatsbyjs/gatsby
这是一个 React 中在JS中编写CSS的仓库；


bug: ajax 发出 get 请求出现跨域问题：
解决一：使用jquery 进行发送请求，使用 dataType:"jsonp",可以解决跨域的问题。请求返回的结果是json。出现语法错误。需要服务器端设置返回的结果。使用 jsonp 可以解决同源策略，但是服务器返回的结果仍然是json。需要使用函数类型包起来——前提是服务器和浏览器互相信任（不会发出错误的代码）。

##### 11、待学习


前端常用工具 grunt fis 搭建工具
https://www.cnblogs.com/chyingp/category/560724.html

LCS 算法说明
https://blog.csdn.net/so_geili/article/details/53737001

移动端适配
https://segmentfault.com/a/1190000011586301

Promise实现原理(https://www.w3cschool.cn/ecmascript/3uge1q5v.html)
ES6 https://www.w3cschool.cn/ecmascript/1myl1q5e.html

Mina 框架：自己的小程序一定要上线，就算做一个计算器出来也需要上线

XHR CSRF/XSRF

Promise对象——https://www.w3cschool.cn/ecmascript/3uge1q5v.html

浏览器和移动设备兼容性

熟练使用各种调试、抓包工具

熟悉nodejs或者其他后端语言Python

前端工程化、前后端分离，组件化开发

前端自动化构建工具（如webpack）fis3

https://www.webpackjs.com/concepts/

在JS中使用session Storage 和 cookies 保存 token值？

Hybrid App 微信小程序

bind(this)
在ES5中不需要写 bind, 在 ES6 中需要加入bind；ES6中也可以使用箭头函数绑定this。


常用工具库

chroma.js 工具库
JavaScript library for all kinds of color manipulations
http://gka.github.io/chroma.js
https://github.com/gka/chroma.js
比较复杂的色温，色调，随机色彩对比等都可以实现；

mdx-deck
MDX-based presentation decks https://jxnblk.com/mdx-deck
支持使用markdown语法输入处理网页界面；

Awesome macOS open source applications
MAC 系统开源软件
https://github.com/serhii-londar/open-source-mac-os-apps/blob/master/README.md

