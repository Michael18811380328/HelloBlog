## react-lazy-load 库说明

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

### 基本原理

为什么要做图片懒加载？如果一个网页很长，初始网页就加载全部的图片，下载图片比较慢，也给服务器带来很多压力。所以解决的办法就是滚动到某个位置后，然后再加载这个位置的图片。适应于内容很多的长网页的实现，例如画廊等。

技术实现：

1、默认把 img 标签的 src 设置一个空，或者是示意图，这样可以从缓存中获取，或者请求比较小。

2、计算当前图片是否在网页视口中，也就是计算图片距离网页顶部的位置，和当前滚动位置，和屏幕高度。

3、监听界面垂直滚动事件（节流监听），当某个图片开始进入网页内部（或者即将进入网页内部），那么设置成真实的 src，向服务器发出请求，界面显示图片，就实现了图片的懒加载。

### 参考文档

https://www.npmjs.com/package/react-lazy-load

https://segmentfault.com/a/1190000016038748

