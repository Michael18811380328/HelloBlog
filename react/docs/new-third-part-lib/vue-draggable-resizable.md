# vue-draggable-resizable

这是一个Vue2的可拖动和可调整大小的元素组件，‌允许开发者创建可拖动和可调整大小的元素，‌适用于需要用户交互和界面自定义的场景

### version

3.0.0 •&#x20;

### downloads

26,148&#x20;

### repository

github.com/mauricius/vue-draggable-resizable&#x20;

### homepage

github.com/mauricius/vue-draggable-resizable&#x20;

# VueDraggableResizable 3

> Vue Component for draggable and resizable elements.

If you are looking for the version 1 of the component, it is available on the
v1 branch.

## Table of Contents

* Features

* Live Playground

* Install and basic usage

  * Props

  * Events

  * Styling

* Contributing

* License

### Features

* No dependencies

* Use draggable, resizable or both

* Define handles for resizing

* Restrict size and movement to parent element

* Snap element to custom grid

* Restrict drag to vertical or horizontal axis

* Maintain aspect ratio

* Touch enabled

* Use your own classes

* Provide your own markup for handles

Register the component globally

```text
npm install --save vue-draggable-resizable
```

基本使用

```javascript
​    // main.js
​    import { createApp } from 'vue'
​    import VueDraggableResizable from 'vue-draggable-resizable'
​    import App from './App.vue'
​    
​    createApp(App)
​      .component("vue-draggable-resizable", VueDraggableResizable)
​      .mount('#app')
```

```javascript
    // App.vue
    <template>
      <div style="height: 500px; width: 500px; border: 1px solid red; position: relative;">
        <vue-draggable-resizable :w="100" :h="100" :parent="true">
          <p>Hello! I'm a flexible component. You can drag me around and you can resize me.</p>
        </vue-draggable-resizable>
      </div>
    </template>
```

```text
    <style>
    @import "vue-draggable-resizable/style.css";
    </style>
```

You may now use the component in your markup. The component itself does not include any CSS. You'll need to include it

separately in your \`App.vue\`:

​

​


