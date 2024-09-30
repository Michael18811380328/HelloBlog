# v-viewer

‌用于图片查看器，‌提供图片的缩放、‌旋转等操作，‌适用于需要展示大量图片或进行图片编辑的应用

# v-viewer&#x20;

### version

3.0.13 •&#x20;

### downloads

24,731&#x20;

### repository

github.com/mirari/v-viewer&#x20;

### homepage

github.com/mirari/v-viewer#readme&#x20;

## default readme

# v-viewer

Image viewer component for vue, supports rotation, scale, zoom and so on,
based on viewer.js

## v-viewer for vue2

## Quick Example

* directive

* component

* api

* thumbnail & source

* viewer callback

* custom toolbar

* filter images

* change images

中文文档：[https://mirari.cc/posts/vue3-viewer](https://mirari.cc/posts/vue3-viewer "https://mirari.cc/posts/vue3-viewer")

## Installation

Install from NPM

```
npm install v-viewer viewerjs
```

## Usage

To use v-viewer, simply import it and the css file, and call app.use()
to install.

The component, directive and api will be installed together in the global.

Two different API styles are both supported: Options API and Composition
API.

&#x20;  &#x20;

```
import { createApp } from 'vue'
import App from './App.vue'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
const app = createApp(App)
app.use(VueViewer)
app.mount('#app')
```

&#x20;  &#x20;

```
<template>
  <div>
    <!-- directive -->
    <div class="images" v-viewer>
      <img v-for="src in images" :key="src" :src="src">
    </div>
    <!-- component -->
    <viewer :images="images">
      <img v-for="src in images" :key="src" :src="src">
    </viewer>
    <!-- api -->
    <button type="button" @click="show">Click to show</button>
  </div>
</template>
<!-- Options API -->
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    data() {
      return {
        images: [
          "https://picsum.photos/200/200",
          "https://picsum.photos/300/200",
          "https://picsum.photos/250/200"
        ]
      }
    },
    methods: {
      show() {
        this.$viewerApi({
          images: this.images
        })
      }
    }
  })
</script>
<!-- Composition API -->
<!-- <script lang="ts" setup>
  import { api as viewerApi } from 'v-viewer'
  const images = [
    "https://picsum.photos/200/200",
    "https://picsum.photos/300/200",
    "https://picsum.photos/250/200"
  ]
  const show = () => {
    viewerApi({
      images
    })
  }
</script> -->
```

### Support UMD

#### Browser

&#x20;  &#x20;

```
<link href="//unpkg.com/viewerjs/dist/viewer.css" rel="stylesheet">
<script src="//unpkg.com/vue"></script>
<script src="//unpkg.com/viewerjs/dist/viewer.js"></script>
<script src="//unpkg.com/v-viewer/dist/index.umd.js"></script>
<script>
  app.use(VueViewer.default)
</script>
```

#### CommonJS

&#x20;  &#x20;

```
var VueViewer = require('VueViewer')
```

#### AMD

&#x20;  &#x20;

```
require(['VueViewer'], function (VueViewer) {});
```

### Usage of directive

Just add the directive v-viewer to any element, then all img elements in
it will be handled by viewer.

You can set the options like this: v-viewer="{inline: true}"

Get the element by selector and then use el.\$viewer to get the viewer
instance if you need.

&#x20;  &#x20;

```
<template>
  <div>
    <div class="images" v-viewer="{movable: false}">
      <img v-for="src in images" :src="src" :key="src">
    </div>
    <button type="button" @click="show">Show</button>
  </div>
</template>
<!-- Options API -->
<script lang="ts">
  import { defineComponent } from 'vue'
  import 'viewerjs/dist/viewer.css'
  import { directive as viewer } from "v-viewer"
  export default defineComponent({
    directives: {
      viewer: viewer({
        debug: true
      })
    },
    data() {
      return {
        images: [
          "https://picsum.photos/200/200",
          "https://picsum.photos/300/200",
          "https://picsum.photos/250/200"
        ]
      }
    },
    methods: {
      show () {
        const viewer = this.$el.querySelector('.images').$viewer
        viewer.show()
      }
    }
  })
</script>
<!-- Composition API -->
<!-- <script lang="ts" setup>
  import 'viewerjs/dist/viewer.css'
  import { directive as viewer } from "v-viewer"
  const vViewer = viewer({
    debug: true
  })
  const images = [
    "https://picsum.photos/200/200",
    "https://picsum.photos/300/200",
    "https://picsum.photos/250/200"
  ]
  const show = () => {
    const viewer = document.querySelector('.images').$viewer
    viewer.show()
  }
</script> -->
```

#### Directive modifiers

##### static

The viewer instance will be created only once after the directive binded.

If you're sure the images inside this element won't change again, use it to
avoid unnecessary re-render.

&#x20;  &#x20;

```
<div class="images" v-viewer.static="{inline: true}">
  <img v-for="src in images" :src="src" :key="src">
</div>
```

##### rebuild

The viewer instance will be updated by update method when the source
images changed (added, removed or sorted) by default.

If you encounter any display problems, try rebuilding instead of updating.

&#x20;  &#x20;

```
<div class="images" v-viewer.rebuild="{inline: true}">
  <img v-for="src in images" :src="src" :key="src">
</div>
```

### Usage of component

You can simply import the component and register it locally too.

&#x20;  &#x20;

```
<template>
  <div>
    <viewer :images="images"
            @inited="inited"
            class="viewer"
            ref="viewer"
            >
      <template #default="scope">
        <img v-for="src in scope.images" :src="src" :key="src">
        {{scope.options}}
      </template>
    </viewer>
    <button type="button" @click="show">Show</button>
  </div>
</template>
<!-- Options API -->
<script lang="ts">
  import { defineComponent } from 'vue'
  import 'viewerjs/dist/viewer.css'
  import { component as Viewer } from "v-viewer"
  export default defineComponent({
    components: {
      Viewer,
    },
    data() {
      return {
        images: [
          "https://picsum.photos/200/200",
          "https://picsum.photos/300/200",
          "https://picsum.photos/250/200"
        ]
      }
    },
    methods: {
      inited (viewer) {
        this.$viewer = viewer
      },
      show () {
        this.$viewer.show()
      }
    }
  })
</script>
<!-- Composition API -->
<!-- <script lang="ts" setup>
  import 'viewerjs/dist/viewer.css'
  import { component as Viewer } from "v-viewer"
  const images = [
    "https://picsum.photos/200/200",
    "https://picsum.photos/300/200",
    "https://picsum.photos/250/200"
  ]
  let $viewer:any = null
  const inited = (viewer) => {
    $viewer = viewer
  }
  const show = () => {
    $viewer.show()
  }
</script> -->
```

#### Component props

##### images

* Type: Array

##### trigger

* Type: Object

You can replace images with trigger, to accept any type of prop. when the
trigger changes, the component will re-render the viewer.

```
<viewer :trigger="externallyGeneratedHtmlWithImages">
  <div v-html="externallyGeneratedHtmlWithImages"/>
</viewer>
```

##### rebuild

* Type: Boolean

* Default: false

The viewer instance will be updated by update method when the source images
changed (added, removed or sorted) by default.

If you encounter any display problems, try rebuilding instead of updating.

&#x20;  &#x20;

```
<viewer
  ref="viewer"
  :options="options"
  :images="images"
  rebuild
  class="viewer"
  @inited="inited"
>
  <template #default="scope">
    <img v-for="src in scope.images" :src="src" :key="src">
    {{scope.options}}
  </template>
</viewer>
```

#### Component events

##### inited

* viewer: Viewer

Listen for the inited event to get the viewer instance, or use
this.refs.xxx.\$viewer.

### Usage of api

> Only available in modal mode.

You can call the function: this.\$viewerApi({options: {}, images: \[]}) to
show gallery without rendering the img elements yourself.

The function returns the current viewer instance.

&#x20;  &#x20;

```
<template>
  <div>
    <button type="button" class="button" @click="previewURL">URL Array</button>
    <button type="button" class="button" @click="previewImgObject">Img-Object Array</button>
  </div>
</template>
<!-- Options API -->
<script lang="ts">
  import { defineComponent } from 'vue'
  import 'viewerjs/dist/viewer.css'
  import { api as viewerApi } from "v-viewer"
  export default defineComponent({
    data() {
      return {
        sourceImageURLs: [
          'https://picsum.photos/200/200?random=1',
          'https://picsum.photos/200/200?random=2'
        ],
        sourceImageObjects: [
          {
            'src': 'https://picsum.photos/200/200?random=3',
            'data-source': 'https://picsum.photos/800/800?random=3'
          },
          {
            'src': 'https://picsum.photos/200/200?random=4',
            'data-source': 'https://picsum.photos/800/800?random=4'
          }
        ]
      }
    },
    methods: {
      previewURL () {
        // If you use the `app.use` full installation, you can use `this.$viewerApi` directly like this
        const $viewer = this.$viewerApi({
          images: this.sourceImageURLs
        })
      },
      previewImgObject () {
        // Or you can just import the api method and call it.
        const $viewer = viewerApi({
          options: {
            toolbar: true,
            url: 'data-source',
            initialViewIndex: 1
          },
          images: this.sourceImageObjects
        })
      }
    }
  })
</script>
<!-- Composition API -->
<!-- <script lang="ts" setup>
import 'viewerjs/dist/viewer.css'
import { api as viewerApi } from 'v-viewer'
const sourceImageURLs = [
  'https://picsum.photos/200/200?random=1',
  'https://picsum.photos/200/200?random=2'
]
const sourceImageObjects = [
  {
    src: 'https://picsum.photos/200/200?random=3',
    'data-source': 'https://picsum.photos/800/800?random=3'
  },
  {
    src: 'https://picsum.photos/200/200?random=4',
    'data-source': 'https://picsum.photos/800/800?random=4'
  }
]
const previewURL = () => {
  // If you use the `app.use` full installation, you can use `this.$viewerApi` directly like this
  const $viewer = this.$viewerApi({
    images: sourceImageURLs
  })
}
const previewImgObject = () => {
  // Or you can just import the api method and call it.
  const $viewer = viewerApi({
    options: {
      toolbar: true,
      url: 'data-source',
      initialViewIndex: 1
    },
    images: sourceImageObjects
  })
}
</script> -->
```

​

&#x20;          &#x20;


