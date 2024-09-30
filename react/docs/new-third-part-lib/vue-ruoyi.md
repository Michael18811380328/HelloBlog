# vue-ruoyi

若依是基于Spring Boot的快速开发平台，它提供了一套完整的解决方案，包括数据模型、用户权限、工作流、任务调度等功能。若依前端UI框架支持Vue.js，这意味着你可以使用Vue.js来开发前端界面，并与后端的若依平台进行交互。

这个库国内小厂使用多，在 npm 上没有

```text
npm install vue-ruoyi --save
```

```javascript
// main.js 或其他入口文件
import Vue from 'vue'
import App from './App.vue'
import RuoYi from 'vue-ruoyi'
 
Vue.use(RuoYi)
 
new Vue({
  render: h => h(App),
}).$mount('#app')
```

```text
<template>
  <ruo-yi-component></ruo-yi-component>
</template>
 
<script>
export default {
  // ...
}
</script>
```

​


