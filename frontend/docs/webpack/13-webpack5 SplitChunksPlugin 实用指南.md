# webpack5 SplitChunksPlugin 实用指南

[晓得迷路了](https://juejin.cn/user/2172290706715565/posts)

2018-09-16

25,734阅读8分钟

提到前端打包工具，毫无疑问想先到的是 webpack。但是前端发展地很快，时不时会有新东西出现，打包工具这边之前也出现 parcel 和 rollup。各种工具的碰撞，相互汲取优点，促进技术的发展。

webpack 从 4.x 开始支持了零配置的特性，同时对块打包也做了优化，`CommonsChunkPlugin`已经被移除了，现在是使用`optimization.splitChunks`代替。（**webpack5 splitChunks 配置和 webpack4 大体上一样**）

本文基于 webpack@5.74.0 实践。下面就开始介绍 splitChunks 的内容。

## 默认情况

`SplitChunksPlugin` 默认配置适用大部分场景。

打包默认情况下只会影响按需加载模块，因为对初始块也进行优化打包会影响 HTML 中的 script 标签数，增加请求数。

默认情况（webpack 的默认配置）下 webpack 会根据下述条件自动进行代码块分割：

- 共享模块（至少被引用 2次）或者 node_modules 模块
- 新代码块大于 20kb（min+gziped之前的体积）
- 按需加载块时的最大并行请求数将低于或等于 30
- 初始页面加载时的最大并行请求数将低于或等于 30

记住，默认情况下只有**按需加载**模块会根据上方条件进行打包优化。

接下来看些例子来理解默认情况的打包。

### 模块全部是同步引入

```jsx
jsx

复制代码// 示例 1.1
// App.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { sum } from 'lodash'
import './app.css'

console.log(sum)

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<div>SplitChunks</div>)
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fae150398f19402d954c2a36dcfd3343~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

默认情况只会影响按需加载模块，所以所有内容全部被打包到一起了。

### 有模块动态导入

这里首先使用符合 [ECMAScript 提案](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftc39%2Fproposal-dynamic-import) 的 import() 语法

```jsx
jsx

复制代码// 示例 1.2
// App.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import './app.css'
import(/* webpackChunkName: "async-lodash" */ 'lodash').then(component => {
  console.log(component)
})

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<div>SplitChunks</div>)
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6ff507e71074b0a840f02b50d7f525b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这里 lodash 使用动态导入，打包结果中可以看到 lodash 被单独打包了，因为默认情况下异步模块会被单独打包。

### react 按需加载

同样的我们试要 react 按需加载，使用 React.lazy 来实现按需加载

```jsx
jsx

复制代码// 示例 1.3
// Page1.jsx
import React from 'react'
import { sum } from 'lodash'

export default function() {
  return <div>{sum([1, 2])}</div>
}

// App.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  HashRouter,
  Routes,
  Route,
} from 'react-router-dom'

const Page1 = React.lazy(() => import("./component/Page1"))

const container = document.getElementById('app');
const root = createRoot(container);
root.render((
  <HashRouter>
    <React.Suspense fallback="loading">
      <Routes>
        <Route path="/" element={<Page1 />} />
      </Routes>
    </React.Suspense>
  </HashRouter>
))
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0264de5c4667469fa93712a7526e0c5e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

打包结果分析：生成了三个 JS 文件，main.js 显然对应 App.jsx，Page1 是异步引入的，单独打包，这边为啥生成了两个包。因为默认情况下 webpack 会对异步模块进行打包优化，lodash 又符合上述提到默认的 4 个条件，所以 lodash 也被单独打包了。

### lodash 按需加载

我们调整下 lodash 的引入，只引入 sum 模块。

```javascript
javascript

复制代码// Page1.jsx
// 示例 1.4
import React from 'react'
import sum from 'lodash/sum'

export default function() {
  return <div>{sum([1, 2])}</div>
}
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f6360858241415abe0829821bf35fcf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可以看到此时就两个文件，因为 `lodash/sum` 的文件大小小于 20kb，不会被单独打包。

### 共享模块打包

除了 node_modules 满足条件会被单独打包，共享模块也会，我们看下面例子：

```javascript
javascript

复制代码// Button2.jsx 保证文件大小大于 20kb
import React from 'react'
import { Button } from 'antd'
export default function() {
  return (
    <Button>111...</Button>
  )
}

// Page1.jsx
import React from 'react'
import Button2 from './Button'
import { sum } from 'lodash'

export default function() {
  return (
    <div>{sum([1, 2])}<Button2>1</Button2></div>
  )
}

// Page2.jsx
import React from 'react'
import Button2 from './Button'
import { sum } from 'lodash'

export default function(){
  console.log(sum([1, 2]))
  return (
    <div>
      <Button2 />
    </div>
  )
}

// App.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  HashRouter,
  Routes,
  Route,
} from 'react-router-dom'

const Page1 = React.lazy(() => import("./component/Page1"))
const Page2 = React.lazy(() => import("./component/Page2"))

const container = document.getElementById('app');
const root = createRoot(container);
root.render((
  <HashRouter>
    <React.Suspense fallback="loading">
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </React.Suspense>
  </HashRouter>
))
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1eb49eba13545a3be01e0244d9d5588~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

打包分析：main、Page1、Page2 各一个 JS 文件，共享模块 Button2 一个包，第三方库一个包。至于为啥共享模块和第三方库是分开打包的，是和 webpack 的默认配置有关，后面我们就可以看到默认配置。

### 初始和异步模块的公共库

最后在看一个场景，如果 App.jsx 中也使用到 lodash，此时会是什么情况。

```jsx
jsx

复制代码// 示例 1.6
// Page1.jsx
import React from 'react'
import { sum } from 'lodash'

export default function() {
  return <div>{sum([1, 2])}</div>
}

// App.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  HashRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { sum } from 'lodash'

console.log(sum)
const Page1 = React.lazy(() => import("./component/Page1"))

const container = document.getElementById('app');
const root = createRoot(container);
root.render((
  <HashRouter>
    <React.Suspense fallback="loading">
      <Routes>
        <Route path="/" element={<Page1 />} />
      </Routes>
    </React.Suspense>
  </HashRouter>
))
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6dc1b6d3da4c45d1ae1f010ec5362357~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可以看到 lodash 被打包到 main.js 中去了，异步模块和初始块都有的第三方库，会被打包在初始模块中。原因也很简单，Page1 加载前肯定会加载 App 模块，App 模块中有了 lodash，Page1 就直接可以使用 App 模块中的 lodash 了。

讲完了 webpack 默认情况下对打包块的优化，接下来看 splitChunks 配置项。

## 配置项

### 默认配置

webpack 5 splitChunks 默认配置如下，上面提到的默认情况下打包的条件（按需加载 + 满足 4 个默认打包条件）在下方配置中就可以体现。

```js
js

复制代码module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\/]node_modules[\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

- chunks: 表示哪些代码需要优化，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为 async
- minSize: 表示在压缩前的最小模块大小，默认为 20000
- minChunks: 表示被引用次数，默认为 1
- maxAsyncRequests: 按需加载时候最大的并行请求数，默认为 30
- maxInitialRequests: 一个入口最大的并行请求数，默认为 30
- enforceSizeThreshold：强制执行拆分的体积阈值
- cacheGroups: 缓存组。缓存组的属性除上面所有属性外，还有 test, priority, reuseExistingChunk
  - test: 用于控制哪些模块被这个缓存组匹配到
  - priority: 缓存组打包的先后优先级
  - reuseExistingChunk: 如果当前代码块包含的模块已经有了，就不在产生一个新的代码块

默认配置项基本就上面这些，其他还有如块名称 name，块名称连接符 automaticNameDelimiter 等配置，更多可查看[官网](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fsplit-chunks-plugin%2F%23optimizationsplitchunks)

我们重点来看下 chunks 和 cacheGroups。

### chunks

chunks 的取值是有 initial, async, all。默认情况下是 async，在本文第一部分已经介绍了它的表现，所以现在来看下其它两个的表现。

- initial 模块下只优化初始模块，也就是说 webpack 只会对初始模块做打包优化。
- all 模块下同时对初始模块和异步模块做打包优化。

#### initial

我们先来看下 initial 的打包表现，可对比上方示例 1.3 做对比

```jsx
jsx

复制代码// 示例 2.1
// Page1.jsx
import React from 'react'
import { sum } from 'lodash'

export default function() {
  return <div>{sum([1, 2])}</div>
}

// App.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  HashRouter,
  Routes,
  Route,
} from 'react-router-dom'

const Page1 = React.lazy(() => import("./component/Page1"))

const container = document.getElementById('app');
const root = createRoot(container);
root.render((
  <HashRouter>
    <React.Suspense fallback="loading">
      <Routes>
        <Route path="/" element={<Page1 />} />
      </Routes>
    </React.Suspense>
  </HashRouter>
))

// webpack.config.js
splitChunks: {
  chunks: 'initial'
}
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/787fed6287514b408ff0a6fd8113b113~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

打包分析：可以看到异步模块单独打成了一个包，初始模块打成了两个包：main 和 vendor，initial 模式下打包优化只在初始模块中作用。

在这边我们也可以试下 initial 共享模块的打包，单页面应用的初始模块只有一个，我们需要配置多入口才行。

```javascript
javascript

复制代码// 示例 2.2
// Button2.jsx 保证文件大小大于 20kb
import React from 'react'
import { Button } from 'antd'
export default function() {
  return (
    <Button>111...</Button>
  )
}

// Page3.jsx
import React from 'react'
import Button2 from './Button'

export default function() {
  return (
    <Button2>Page3</Button2>
  )
}

// Page4.jsx
import React from 'react'
import Button2 from './Button'

export default function() {
  return (
    <Button2>Page4</Button2>
  )
}

// App2.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  HashRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Page3 from './component/Page3.jsx'

const container = document.getElementById('app');
const root = createRoot(container);
root.render((
  <HashRouter>
    <React.Suspense fallback="loading">
      <Routes>
        <Route path="/" element={<Page3 />} />
      </Routes>
    </React.Suspense>
  </HashRouter>
))

// App2.jsx 同 App.jsx，把 Page3 换成 Page4

// webpack.config.js
module.exports = {
    entry: {
       app1: './App.jsx',
       app2: './App2.jsx',
    },
    ...,
    optimization: {
      splitChunks: {
         chunks: 'initial', 
      }
    }
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6da51fc4e1b2486d8707a74e0e3c00ed~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可以看到共享模块 Button2 被单独打包了。

我们也可以通过配置 optimization.splitChunks.cacheGroups.default: false 禁用 default 缓存组。

```js
js

复制代码// 示例 2.3
// webpack.config.js
splitChunks: {
  chunks: 'initial',
  cacheGroups: {
    default: false
  }
}
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f2e341273de4065a9d2d7675bd284b5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

我们可以看到默认配置中共享模块打包优化被禁用后，就有没有了 Button2 的单独打包。

讲完了 initial 模式下打包，最后讲下 all 模式下打包。

#### all

all 模式下初始块和异步模块都会按照配置做优化。举个例子，可对比上方示例 1.3、2.1 做对比

```jsx
jsx

复制代码// 示例 2.4
// Page1.jsx
import React from 'react'
import { sum } from 'lodash'

export default function() {
  return <div>{sum([1, 2])}</div>
}

// App.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  HashRouter,
  Routes,
  Route,
} from 'react-router-dom'

const Page1 = React.lazy(() => import("./component/Page1"))

const container = document.getElementById('app');
const root = createRoot(container);
root.render((
  <HashRouter>
    <React.Suspense fallback="loading">
      <Routes>
        <Route path="/" element={<Page1 />} />
      </Routes>
    </React.Suspense>
  </HashRouter>
))

// webpack.config.js
splitChunks: {
  chunks: 'all'
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afeb1fea304a445da1d8027edba61d0f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可以看到打包成了 4 个文件，初始模块的第三方库被单独打包了，异步模块的 lodash 也单独打包了。打包优化作用到了初始和异步模块。

### cacheGroups

使用 cacheGroups 可以自定义配置打包块。

```jsx
jsx

复制代码// 示例 2.5

// 其他文件同示例 2.4

// webpack.config.js
optimization: {
    chunks: 'all'
    splitChunks: {
      cacheGroups: {
        react: {
          test: /react-dom/
        }
      }
    }
  }
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f46d0fb2cc264b6ea103ce16f598bf88~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

对比示例 2.4，可以看到 react-dom 被单独打成包了，其他第三方在一个包。自定义打包块的默认优先级是 0，所有优先处理自定义打包。

## 提取第三方库

最后看下之前 CommonsChunkPlugin 常用的分离部分第三方库功能。这边你可以想一下怎么操作。

上面已经提到了设置 `chunks: initial || all` 都可以提取出第三方库。但是它是把所有第三库提取出来，所以我们在只提取 react 和 react-dom 的情况下，需要自定义一个 cacheGroup。

```js
js

复制代码// 示例 2.6
// webpack.config.js
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      react: {
          name: 'react',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
      }
    }
  }
}
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/890cf11736c54a618ca4487b4be42365~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可以看到我们新增了一个缓存组，只匹配 react 和 react-dom，所以达到了之前 CommonsChunkPlugin 的功能。

## optimization.runtimeChunk

最后提一下 runtimeChunk，通过`optimization.runtimeChunk: true`选项，webpack 会添加一个只包含运行时 (runtime) 额外代码块到每一个入口。（译注：这个需要看场景使用，会导致每个入口都加载多一份运行时代码）

## 总结

webpack5 默认情况下只对异步模块做打包优化，额外的打包必须满足 4 个条件（webpack 的默认配置，可修改）。根据需求可调整为只对初始模块做打包优化，或者初始和异步模块一起优化。同时可配置自己的打包规则。

简而言之：chunks 控制打包作用范围，其他控制打包规则。

webpack5 的 splitChunks 功能是比较强大的，不过推荐还是使用默认模式，或者提取一下第三方库。

## 参考材料

- [SplitChunksPlugin](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fsplit-chunks-plugin%2F%23splitchunkscachegroups)

