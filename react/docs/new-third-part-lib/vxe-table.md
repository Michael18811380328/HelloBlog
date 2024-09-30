# vxe-table

基于Vue的table配置组件，‌提供强大的表格功能，‌包括数据展示、‌排序、‌筛选等。‌

# vxe-table&#x20;

### version

4.6.18 •&#x20;

### downloads

23,550&#x20;

### repository

github.com/x-extends/vxe-table&#x20;

### homepage

vxetable.cn/&#x20;

## default readme

​

# vxe-table

简体中文 | 繁體中文 | English

​

一个基于 vue 的 PC
端表单/表格组件，支持增删改查、虚拟树、列拖拽、懒加载、快捷菜单、数据校验、打印导出、表单渲染、自定义模板、渲染器、JSON 配置式...

* 设计理念&#x20;

  * 面向现代浏览器，高效的简洁 API 设计

  * 模块化表格、按需加载

  * 为单行编辑表格而设计，支持增删改查及更多扩展，强大的功能的同时兼具性能

​

## 功能点

* &#x20;基础表格

* &#x20;配置式表格

* &#x20;斑马线条纹

* &#x20;多种边框

* &#x20;单元格样式

* &#x20;列宽拖动

* &#x20;最小/最大高度

* &#x20;自适应宽高

* &#x20;固定列

* &#x20;多级表头

* &#x20;表尾数据

* &#x20;高亮行或列

* &#x20;序号

* &#x20;单选框

* &#x20;复选框

* &#x20;排序

* &#x20;多字段排序

* &#x20;筛选

* &#x20;合并单元格

* &#x20;合并表尾

* &#x20;导入/导出/打印

* &#x20;显示/隐藏列

* &#x20;拖拽/自定义列排序

* &#x20;加载中

* &#x20;格式化内容

* &#x20;自定义插槽 - 模板

* &#x20;快捷菜单

* &#x20;展开行

* &#x20;工具栏

* &#x20;虚拟树

* &#x20;增删改查

* &#x20;数据校验

* &#x20;数据代理

* &#x20;键盘导航

* &#x20;渲染器

* &#x20;虚拟滚动

* &#x20;虚拟合并

* &#x20;CSS 变量主题

* &#x20;(企业版) 单元格区域选取

* &#x20;(企业版) 单元格复制/粘贴

* &#x20;(企业版) 单元格查找和替换

* &#x20;(企业版) 全键盘操作

## 安装

```text
npm install vxe-table
```

```text
​    import { createApp } from 'vue'
​    import VXETable from 'vxe-table'
​    import 'vxe-table/lib/style.css'
​    
​    createApp(App).use(VXETable).mount('#app')
```

### CDN

使用第三方 CDN 方式记得锁定版本号，避免受到非兼容性更新的影响 &#x20;
不建议将第三方的 CDN 地址用于正式环境，因为该连接随时都可能会失效

```text
​    <!-- 引入样式 -->
​    <link rel="stylesheet" href="https://unpkg.com/vxe-table/lib/style.css">
​    <!-- 引入脚本 -->
​    <script src="https://unpkg.com/xe-utils"></script>
​    <script src="https://unpkg.com/vxe-table"></script>
```

## 示例

```text
<template>
​      <div>
​        <vxe-table :data="tableData">
​          <vxe-column type="seq" title="Seq" width="60"></vxe-column>
​          <vxe-column field="name" title="Name"></vxe-column>
​          <vxe-column field="role" title="Role"></vxe-column>
​          <vxe-colgroup title="Group1">
​            <vxe-column field="sex" title="Sex"></vxe-column>
​            <vxe-column field="address" title="Address"></vxe-column>
​          </vxe-colgroup>
​        </vxe-table>
​      </div>
​    </template>
​    
​    <script lang="ts" setup>
​    import { ref } from 'vue'
​    
    const tableData = ref([
      { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', address: 'Shenzhen' },
      { id: 10002, name: 'Test2', role: 'Test', sex: 'Man', address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', address: 'Shanghai' }
    ])
    </script>
```

## 在线文档

[https://vxetable.cn/](https://vxetable.cn/ "https://vxetable.cn/")

## 运行项目

安装依赖

​

&#x20;   npm run update

启动本地调试

&#x20;  &#x20;
​    npm run serve

编译打包，生成编译后的目录：es,lib

&#x20;  &#x20;
​    npm run lib

​

​

&#x20;          &#x20;


