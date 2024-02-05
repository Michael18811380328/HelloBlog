# Taro 框架入门教学视频

千锋教育出品这个教程 https://www.bilibili.com/video/BV1W7411v7LU ，比系统学习文档更快捷（文档可能很多用不上）2020 年初，以最新官方文档为准

官方博客参考资料

- Taro实践 - TOPLIFE小程序 开发体验 https://juejin.cn/post/6844903632991682567
- 为何我们要用 React 来写小程序 - Taro 诞生记 https://juejin.cn/post/6844903624938635272
- 多端统一开发框架 - Taro https://juejin.cn/post/6844903617951072264

## 01 taro介绍

微信小程序 = VUE的模板语法+React状态管理，后续其他各大厂家小程序很多，但是标准语法不一样，气人

Taro 框架是京东凹凸实验室制作，目标是用一套代码，编译出各种小程序（微信、支付宝、抖音、百度小程序）

特点：使用 JSX 语法，支持组件化开发，支持 TS SASS 等语言。

## 02 Taro 项目创建

核心逻辑：把 JSX 语法（内部叫Nerv语法）转换成 AST，然后根据不同的打包配置，编译成不同的小程序（另一个例子，babel 把 es6 编译成 es5，taro 把 jsx 编译成 wxml wxss 等文件）。

~~~bash
# 全局安装脚手架 @taro/cli
sudo npm install @taro/cli -G

# 创建项目
taro init Project

# 创建单页面
taro create --name login

# 编译成不同的小程序
npm run dev:wxapp
npm run dev:alipay
~~~

自定义本地配置：如果是 H5 编译，本地开发的配置文件在 /config/index.js，可以更改本地开发服务器配置（类似webpack_dev_server）

~~~js
h5: {
  devServer: {
    port: 8080,
    host: 'localhost',
  }
}
~~~

## 03 项目结构

编译成小程序的操作过程；把 dist 目录导入微信官方的小程序管理软件中即可。

taro 项目目录说明（主要是 src pages index 下面的结构、样式、设置文件）。app.js 和 app.css 是项目入口文件和样式。pages 下面每一个文件夹和对应的组件代表一个页面；可以在内部设置不同的子组件，components 中可以增加公共的组件和样式等。

config 是配置目录：index.js 是默认配置；dev.js 是开发环境配置；prod.js 是生产环境配置。

package.json 是项目依赖和脚本

project.config.json 是小程序的配置



## 04 生命周期函数和 state

基本的生命周期函数和 state 类似 react 组件，功能类似，不赘述

针对小程序新增的生命周期函数

~~~js
state = {
  
};

componentDidShow() {
  
}

componentDidHide() {
  
}
~~~

## 05 props

类似 react 中的 props

~~~jsx
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from "@tarojs/components";

class Child extends Component {
  render () {
    let { text } = this.props;
    return (
    	<View>{text}</View>
    );
  }
}
~~~

## 06 路由的传参和配置

在 react 中，使用 react-router 实现路由功能。小程序中自带路由功能，所以不需要使用 react-router 引入单独的库。

~~~js
config = {
  pages: [
    'pages/index/index',
    'pages/login/login',
  ],
  window: {
    backfroundTextStyle: 'light',
  }
}
~~~

在代码中实现跳转页面的功能，在 URL 中加入查询字符串，页面传参。然后在目的界面可以获取传入的参数了。

下面是新增的API，根据最新官方文档

~~~js
// 定位到某个页面（有历史记录）
Taro.navigateTo({
  url: "/pages/index/index?id=1&username=index"
});

// 重定向到某个页面（没有历史记录）
Taro.redirectTo({
  url: '/pages/index/index'
}).then()

// 切换页脚的 tab 
Taro.switchTab({url: '/pages/'}).then()

// 向上返回到层
Taro.navigateBack({
  delta: 2
});

// 获取当前的页面栈（决定返回几层）
Taro.getCurrentPages().length;
~~~

~~~js
componentDidMount() {
  let id = this.$router.params.id;
}
~~~

## 07 模块化和导入导出

使用 import 和 export 进行模块导入导出

资源文件（图片）也需要使用  import 导入，不支持使用直接的图片链接，否则小程序不显示图片。

## 08 条件渲染和列表渲染

和 react 一样；条件渲染就是三目运算符；列表渲染就是数组渲染



## 09 事件与运行时环境

大驼峰写法，和React一致

事件回调函数中，前面几个是传递的参数，最后一个是事件对象（这个日常的代码中经常会遇到，一个函数在不同地方使用，传递的函数不一样）

~~~js
handleClick = (name, event) => {
  //
}

render() {
  return (
  	<View className="index">
    	<Button onClick={this.handleClick.bind(this, name)} />
    </View>
  );
}
~~~

运行时环境，类似 nodeJS 获取运行时的变量（需要看文档）

~~~js
const h5 = process.env.TARO_ENV;

if (h5) {
  // 网页中需要打开弹框
} else {
  // 微信小程序不需要弹框
}
~~~

## 10 案例——问答模块

这个案例类似 React 组件，简单了解一下即可

详细是自己的案例。

