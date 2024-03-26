# react-lazy-load

React Lazy Load 是一个易于使用的 React 组件，它可以帮助您以可预测的方式延迟加载内容。它很快，您还可以在滚动容器中使用组件，例如带有滚动条的div。它将被自动找到。

库周下载量 10 万，可以稳定使用。

### 基本使用

~~~js
import React from 'react';
import LazyLoad from 'react-lazy-load';

const MyComponent = () => (
  <div>
    <LazyLoad height={762}>
      <img src='http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg' />
    </LazyLoad>
  </div>
)
~~~

### 参考文档

https://www.npmjs.com/package/react-lazy-load

https://segmentfault.com/a/1190000016038748

