# React 加载骨架(Loading Skeleton)

React 加载骨架(Loading Skeleton)是一个动画加载骨架组件，用于创建自动适应你应用程序的骨架屏幕。

https://github.com/dvtng/react-loading-skeleton

代码 3.7K stars 近期也在维护更新

## 安装

Npm

```bash
npm i react-loading-skeleton
```

## 基本使用

引入

```js
import Skeleton from 'react-loading-skeleton';
```

基本用法

```html
<Skeleton/>
```

主题使用`<SkeletonTheme>`组件，用户可以轻松的改变骨架的颜色。

```jsx
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

<SkeletonTheme color="#202020" highlightColor="#444">
  <p>
    <Skeleton	
      count={3} // 加载骨架五行
      duration={2} // 持续时间
      width={100}
      height={100}
      circle={true} // 圆形
     />
  </p>
</SkeletonTheme>;
```

## 示例

![img](https://assets.madewith.cn/storage/0/images/react/react-loading-skeleton-react-loading-skeleton.gif/w756)