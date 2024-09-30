# element-plus

# Element Plus

基于 Vue 3，面向设计师和开发者的组件库

Element UI 是国内使用最广泛的 Vue2 组件库之一，而 Element Plus 是 Element UI 的升级版，基于 Vue3 和 TypeScript，提供了 70 多个易于使用的组件。

[https://element-plus.org/zh-CN/](https://element-plus.org/zh-CN/ "https://element-plus.org/zh-CN/")

[https://github.com/element-plus/element-plus](https://github.com/element-plus/element-plus "https://github.com/element-plus/element-plus")

[https://www.npmjs.com/package/element-plus](https://www.npmjs.com/package/element-plus "https://www.npmjs.com/package/element-plus")

### version

2.7.7 •&#x20;

### downloads

203,422&#x20;

### repository

github.com/element-plus/element-plus&#x20;

### homepage

element-plus.org/&#x20;

## default readme

Element Plus - A Vue.js 3 UI library

* 💪 Vue 3 Composition API

* 🔥 Written in TypeScript

## Getting Started

Alright, for you to get started if you are looking for making Element Plus
better you should keep reading. For developers that uses Element Plus to
develop your website you should go ahead visit Getting
Started.

* 中国大陆加速镜像站点

## Breaking change list

The first stable release of Element Plus suitable for use in production was
released on February 07, 2022. The APIs is stable right now, and here's also a
full list about how to get upgraded from Element
UI to Element Plus.

You can find the breaking change list here: Breaking Change
List.

### Migration Tool 🛠️

We have made a migration tool for you to migrate your project from Element
UI to Element Plus.

You can find the gogo code migration
tool here.

We have tested this on Vue Element Admin. You can find the transpiled code
here.

Element Plus 于 2020年9月发布第一个 Beta 版本，2022年2月发布第一个稳定版本 v2.0.0，目前基主要由社区开发者在维护。

以下是截止到 2023.12.9 的数据情况：

| 指标      | 数值                      |
| ------- | ----------------------- |
| Star    | 22k                     |
| NPM 周下载 | 155,168                 |
| Issue   | 1251(Open)+4682(Closed) |
| PR      | 397+6027                |
| 贡献者     | 540                     |
| 组件数     | 70                      |

​

https\://element-plus.org/zh-CN/component/

完整引入

```javascript
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```

按钮组件使用

```html
<template>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>

  <el-row class="mb-4">
    <el-button plain>Plain</el-button>
    <el-button type="primary" plain>Primary</el-button>
    <el-button type="success" plain>Success</el-button>
    <el-button type="info" plain>Info</el-button>
    <el-button type="warning" plain>Warning</el-button>
    <el-button type="danger" plain>Danger</el-button>
  </el-row>

  <el-row class="mb-4">
    <el-button round>Round</el-button>
    <el-button type="primary" round>Primary</el-button>
    <el-button type="success" round>Success</el-button>
    <el-button type="info" round>Info</el-button>
    <el-button type="warning" round>Warning</el-button>
    <el-button type="danger" round>Danger</el-button>
  </el-row>

  <el-row>
    <el-button :icon="Search" circle />
    <el-button type="primary" :icon="Edit" circle />
    <el-button type="success" :icon="Check" circle />
    <el-button type="info" :icon="Message" circle />
    <el-button type="warning" :icon="Star" circle />
    <el-button type="danger" :icon="Delete" circle />
  </el-row>
</template>

<script lang="ts" setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
</script>
```

​


