# 00-react-ant-design介绍

2021-08-31

`antd-mobile` 是 [Ant Design](http://ant.design) 的移动规范的 React 实现，服务于蚂蚁及口碑无线业务。

~~~html
<div class="pic-plus">
  <img width="160" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg">
  <span>+</span>
  <img width="160" src="https://t.alipayobjects.com/images/rmsweb/T16xRhXkxbXXXXXXXX.svg">
</div>

<style>
.pic-plus > * {
  display: inline-block;
  vertical-align: middle;
}
.pic-plus {
  margin: 40px 0;
}
.pic-plus span {
  font-size: 30px;
  color: #aaa;
  margin: 0 40px;
}
</style>
~~~

## 特性和优势

- UI 样式高度可配置，拓展性更强，轻松适应各类产品风格
- 基于 React Native 的 iOS / Android / Web 多平台支持，组件丰富、能全面覆盖各类场景 (antd-mobile-rn)
- 提供 "组件按需加载" / "Web 页面高清显示" / "SVG Icon" 等优化方案，一体式开发
- 使用 TypeScript 开发，提供类型定义文件，支持类型及属性智能提示，方便业务开发
- 全面兼容 react / preact

## 适用场景

- 适合于中大型产品应用
- 适合于基于 react / preact / react-native 的多终端应用
- 适合不同 UI 风格的高度定制需求的应用

## 快速上手

### 1. 创建一个项目

可以是已有项目，或者是使用 [dva](https://github.com/dvajs/dva) / create-react-app 新创建的空项目，你也可以从 [官方示例](https://github.com/ant-design/antd-mobile-samples/tree/master/rn-web) 脚手架里拷贝并修改

> 参考更多[官方示例集](https://github.com/ant-design/antd-mobile-samples)，或者你可以利用 React 生态圈中的 [各种脚手架](https://github.com/enaqx/awesome-react#boilerplates)

### 2. 安装

```bash
$ npm install antd-mobile --save
```

### 3. 使用

入口页面 (html 或 模板) 相关设置：

> 引入 [FastClick](https://github.com/ftlabs/fastclick) 并且设置 html `meta` (更多参考 [#576](https://github.com/ant-design/ant-design-mobile/issues/576))
>
> 引入 Promise 的 fallback 支持 (部分安卓手机不支持 Promise)

```html
<!DOCTYPE html>
<html>
<head>
  <!-- set `maximum-scale` for some compatibility issues -->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
  <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
  <script>
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }
    if(!window.Promise) {
      document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
    }
  </script>
</head>
<body></body>
</html>
```

组件使用实例：

```jsx
import { Button } from 'antd-mobile';
ReactDOM.render(<Button>Start</Button>, mountNode);
```

引入样式：

```jsx
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
```

##### 按需加载

**注意：强烈推荐使用。**

下面两种方式都可以**只加载**用到的组件，选择其中一种方式即可。

- 使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)（推荐）。

   ```js
   // .babelrc or babel-loader option
   {
     "plugins": [
       ["import", { libraryName: "antd-mobile", style: "css" }] // `style: true` 会加载 less 文件
     ]
   }
   ```

   然后只需从 antd-mobile 引入模块即可，无需单独引入样式。

   ```jsx
   // babel-plugin-import 会帮助你加载 JS 和 CSS
   import { DatePicker } from 'antd-mobile';
   ```

- 手动引入

   ```jsx
   import DatePicker from 'antd-mobile/lib/date-picker';  // 加载 JS
   import 'antd-mobile/lib/date-picker/style/css';        // 加载 CSS
   // import 'antd-mobile/lib/date-picker/style';         // 加载 LESS
   ```

##### 更多增强 (非必须):

> 基于 antd-mobile 的自定义 UI 库：[web-custom-ui](https://github.com/ant-design/antd-mobile-samples/tree/master/web-custom-ui) / [web-custom-ui-pro](https://github.com/ant-design/antd-mobile-samples/tree/master/web-custom-ui-pro)

## 体积

- 按需加载：只需引入业务中需要的组件即可，未 import 进来的组件不会打包进来。
- <p>`./dist/antd-mobile.min.js`的文件<a href="https://ant-design.github.io/ant-design-analysis/" target="_blank">大小及依赖分析</a></p>


## 链接

- [首页](https://mobile.ant.design/)
- [开发者文档](http://github.com/ant-design/ant-design-mobile/blob/master/development.zh-CN.md)
- [React 模块](http://github.com/react-component)
