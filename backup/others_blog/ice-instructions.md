# 飞冰使用教程

## 前言

ICE 是 Alibaba 淘宝内部的一个开元脚手架，它的初始化脚手架我们称为模板，它提供了很多可复用代码片段(区块)，根据区块进行代码复用，可以大大节省开发时间，提高开发效率。

ICE 提供了以下这些功能：
1、模板自定义创建 2、区块可视化组装 3、 布局自定义生成 4、物料自定义接入 5、 项目仪表盘插件化

个人推荐（尽量使用官方提供的模板和物料）

## D2 Admin

D2 Admin 是一套管理系统脚手架，ICE 推荐的 Vue 物料当中比较好的一个模板。这个是我们这篇文章讲的重点。

## 正文

下面开始讲如何使用 ice 提供的 D2 Admin。

## 安装

安装我们通过 ICE 推出的 Iceworks 来快速安装我们的项目，目前支持 macOS 和 Windows 两大平台。下载链接[Iceworks](https://alibaba.github.io/ice/iceworks)
下载完成后，看下面两个图，进行想对应的操作：
<img src="https://00feng00.github.io/img/iceworker-use-saying-1.jpg">
<img src="https://00feng00.github.io/img/iceworker-use-saying-2.jpg">
然后我们在项目里面可以看到类似以下的文件目录：

```
├─ dev
│  └─ snippets 帮助开发的代码片段
├─ docs 文档
├─ public 静态资源
├─ src
│  ├─ assets 资源
│  ├─ components 组件
│  ├─ i18n 多国语
│  ├─ layout 布局
│  ├─ libs 通用库
│  ├─ menu 菜单
│  ├─ mock 模拟数据
│  ├─ pages 页面
│  ├─ plugin 插件
│  ├─ router 路由
│  ├─ store 全局状态
│  ├─ App.vue
│  ├─ main.js
│  └─ setting.js 设置
├─ tests 单元测试
├─ .env 环境变量
├─ .env.development 环境变量 开发环境
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .postcssrc.js
├─ LICENSE
├─ README.md
├─ babel.config.js
├─ jest.config.js
├─ package.json
└─ vue.config.js 配置文件
```

## 运行

安装完成后，在 Iceworks 里面运行项目，就可以看到类似下面这样的界面：（只是类似，因为还需要修改的）
<img src="https://00feng00.github.io/img/ice_admin_bg.jpg">

## 注意

如果是前端进行开发，个人建议把依赖删掉，然后自己进行安装，步骤如下：
1、删除 node_modules 这个文件夹(最好使用命令行删除，不然有可能安装失败，有可能)
2、执行命令 npm install
这样做的好处，自己对整个项目的结构很清晰，然后就可以按照自己的想法来操作了。
如果是后端进行开发，个人建议使用 Iceworks 这个 GUI (Graphical User Interface，简称 GUI，又称图形用户接口)来进行操作。因为一旦遇到问题，解决起来有那么一点点难度（虽然也不难，但是影响开发效率）。

## 开发

当你看到项目已经可以跑起来了，肯定已经有一定的信心来进行开发了，下面我们讲如何开发。
首先第一步，把官方提供的模板的骨架进行小小的修改：
1、修改浏览器标题、图标
根目录找到 public 文件夹，里面有两个 html 文件，第一个是加载中页面，一个是兼容移动端页面，我们在第一个 imdex 文件进行修改。
修改这 4 个地方：

```
    <link rel="icon" href="<%= BASE_URL %>logo.png">
    <title>数据中心管理后台</title>
    <div class="d2-app-loading-sub-title">欢迎使用 数据中心管理后台等在为您加载中。。。</div>
    <div class="d2-app-loading-sub-info">如果很久很久都没有加载成功，请清空缓存重新加载页面</div>
```

说明:一个是修改图标（新增图标在 public 文件夹里面添加相对应的图片），一个是修改标题，下面这两个是修改文案提示。

---

下面开始进入项目开发了:
开始讲内容前，首先讲一下，每一个页面切换都是由路由控制的，因此我们要重点看的有三个文件，router 文件夹里面的 index.js、routerConfig.js、 menuConfig.js，为什么这么说呢。我们在做页面跳转，tab 跳转，菜单点击跳转都需要操作到这三个文件。
注意注意，前方高能，一定要看，一定要看。
后端进行开发建议使用 Iceworks 提供的功能进行相对应的操作，这样就可以不需要考虑那么多复杂的关系。前端进行开发，直接在 pages 添加新文件夹，然后在 routerConfig.js、menuConfig.js 添加对应的关系就可以了，具体代码如下：

```json
  {
    path: '/demo2',
    layout: HeaderAside,
    component: Demo2,
  }
```

```json
{
  "name": "测试",
  "icon": "folder-o",
  "children": [
    {
      "name": "demo1",
      "path": "/demo1",
      "children": [
        {
          "name": "demo1",
          "path": "/demo1"
        },
        {
          "name": "demo2",
          "path": "/demo2"
        }
      ]
    }
  ]
}
```

page 里面的目录结构如下：
<img src="https://00feng00.github.io/img/ice-add-component.jpg">

```
// index.js文件
import Demo2 from './Demo2'
export default Demo2
```

index.js 是暴露文件出口，具体页面逻辑在 vue 文件实现，如果页面比较复杂，可以把页面分成多个组件进行开发，组件放在 components 里面

——————————————————————————————————————————————————
基础的已经讲得差不多了，应该可以进行正常的开发了，最后我们说一下，如果要修改项目的配置，应该怎么操作：
步骤如下：
1、如果要使用一些新的插件，可以在 main.js 引入
2、找到 store 文件夹里面的 modules 里面的 d2admin.js，在这里，我们可以把共用的方法放到这里，比如登录，权限管理等。
3、找到根目录 vue.config.js 这个文件，我们可以在这个文件配置一些设置

```
  // 路径根据自己实际进行修改
  const baseUrl = '/console/'
  module.exports = {
    devServer: {
      publicPath: baseUrl // 和 baseUrl 保持一致
    },
    outputDir: 'E:/d2Admin/dist',
  }
```

## 后记

到这里 Ice 的使用基本就这些了，当然啦，还有一些进阶的操作，大家可以自行研究。
最后推荐几个插件:[V-Chart](https://v-charts.js.org/#/) [D2-crud](https://github.com/d2-projects/d2-crud) [Icon](https://alibaba.github.io/ice/component/foundationsymbol#%E7%A4%BA%E4%BE%8B%E5%9B%BE%E6%A0%87) [xlsx](https://d2-projects.github.io/d2-admin-doc/zh/sys-plugins/data-export.html#%E6%B3%A8%E5%86%8C%E6%8F%92%E4%BB%B6)

上面写的这些是让大家快速入门 ICE D2 Admin,这些知识 D2 Admin 其中一小块，如果还想了解更多。[D2](https://d2-projects.github.io/d2-admin-doc/zh/learn-guide/)
