# JS Bridge

## 1、问题来源

现在很多开发都是 hybrid 混合式开发，也就是一套代码，同时实现 web Android ios 开发。那么需要 JS 调用原生 Java android 的接口，或者 Java 调用 JS 的方法。JS bridge 是实现的方案之一，例如 react native。小程序比较特殊，也是 JS 调用原生环境的 API。

## 2、JS bridge 功能

让 JS 调用 Java 的接口，Java 调用 JS 的接口，互相调用

## 3、实现原理：

Java 调用 JS 的接口：因为 JS 是解释性语言，也就是输入 JS 代码即可执行，那么 Java 可以在 JS context 上下文中，类似执行 JS 代码，evaluateJavascript 来执行JS代码，并且可以获取返回值执行回调

JS 调用 Java 接口：

3.1 JS 请求时，写入特殊的字段，Java 实现特定字段拦截并返回结果，正常字段放行的策略

3.2 Java 把接口注入 Windows 或者 context 对象中，JS 调用全局变量中的方法

代码链接：﻿https://github.com/lzyzsd/JsBridge﻿ 

参考博客：﻿https://juejin.cn/post/6936814903021797389﻿ 

