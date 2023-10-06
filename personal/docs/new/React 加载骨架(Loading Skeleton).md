# React 加载骨架(Loading Skeleton)

React 加载骨架(Loading Skeleton)是一个动画加载骨架组件，用于创建自动适应你应用程序的骨架屏幕。

https://github.com/dvtng/react-loading-skeleton

代码 3.5K stars 近期也在维护更新

## 安装

Npm

```
npm i react-loading-skeleton
```

## 基本使用

引入

```js
import Skeleton from 'react-loading-skeleton';
```

基本用法

```html
<Skeleton/> // 简单的单行骨架
<Skeleton count={5}/> // 五行加载骨架
```

主题

使用`<SkeletonTheme>`组件，用户可以轻松的改变骨架的颜色。

```jsx
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

<SkeletonTheme color="#202020" highlightColor="#444">
  <p>
    <Skeleton count={3} />
  </p>
</SkeletonTheme>;
```

持续时间

```
<Skeleton duration={2} />
```

宽高

```
<Skeleton width={100}  height={100} />
```

圆形

```
<Skeleton circle={true} height={50} width={50} />
```

## 示例

![img](https://assets.madewith.cn/storage/0/images/react/react-loading-skeleton-react-loading-skeleton.gif/w756)