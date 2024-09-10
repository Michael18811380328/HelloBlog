# Resize Observer 介绍及原理浅析

参考链接：

https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver

https://cloud.tencent.com/developer/article/2187663

## 问题引出

某些功能，需要在界面元素的尺寸变化时，响应另一个操作。例如浏览器水平宽度变化时，内部排列元素的数量和大小也需要变化。

如果是单纯的 css 效果，可以使用媒体查询处理，不同的屏幕尺寸下css怎么变化。

如果是JS效果变化，传统的方案是监听 window.resize 事件，然后进一步获取监听元素的尺寸变化（getBoundingClientRect 、getComputedStyle）进行下一步处理。

## Resize Observer 

ResizeObserver 接口监视 Element 边界尺寸的变化。

`ResizeObserver` 避免了通过回调函数调整大小时，通常创建的无限回调循环和循环依赖项。它只能通过在后续的帧中处理 DOM 中更深层次的元素来做到这一点。如果它的实现遵循规范，则应在绘制前和布局后调用 resize 事件。

- [`ResizeObserver.disconnect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver/disconnect)

  取消特定观察者目标上所有对 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 的监听。

- [`ResizeObserver.observe()`](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver/observe)

  开始对指定 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 的监听。

- [`ResizeObserver.unobserve()`](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver/unobserve)

  结束对指定 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 的监听。

## 案例

~~~js
const h1Elem = document.querySelector("h1");
const pElem = document.querySelector("p");
const divElem = document.querySelector("body > div");
const slider = document.querySelector('input[type="range"]');
const checkbox = document.querySelector('input[type="checkbox"]');

divElem.style.width = "600px";

slider.addEventListener("input", () => {
  divElem.style.width = `${slider.value}px`;
});

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.contentBoxSize) {
      // Firefox implements `contentBoxSize` as a single content rect, rather than an array
      const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;

      h1Elem.style.fontSize = `${Math.max(
        1.5,
        contentBoxSize.inlineSize / 200,
      )}rem`;
      pElem.style.fontSize = `${Math.max(
        1,
        contentBoxSize.inlineSize / 600,
      )}rem`;
    } else {
      h1Elem.style.fontSize = `${Math.max(
        1.5,
        entry.contentRect.width / 200,
      )}rem`;
      pElem.style.fontSize = `${Math.max(1, entry.contentRect.width / 600)}rem`;
    }
  }

  console.log("Size changed");
});

resizeObserver.observe(divElem);

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    resizeObserver.observe(divElem);
  } else {
    resizeObserver.unobserve(divElem);
  }
});

~~~

## 在 React 中使用

为了避免在 React render中多次声明 ResizeObserver 实例，我们可以把实例化过程放在 useLayoutEffect 或 useEffect 中。并且在非 SSR 场景中，我们应该尽量使用 useLayoutEffect 而不是 useEffect。

useLayoutEffect 和 useEffect 的最大差别在于执行时机的不同，useEffect 会在浏览器绘制完成之后调用，而 useLayoutEffect 则会在 React 更新 dom 之后，浏览器绘制之前执行，并且会阻塞后面的绘制过程，因此适合在 useLayoutEffect 中进行更改布局、及时获取最新布局信息等操作。

下面是一个实际的 react 案例。

~~~js
useLayoutEffect(() => {
  // 先获取 dom 节点（监听的对象）
  const currentContainer = containerRef.current;

  // 页面缩放后的回调函数（改变容器的宽度）
  const handleResize = () => {
		setContainerWidth(currentContainer.offsetWidth);
  };

  // 新建缩放观察对象，传入对应的回调函数
  const resizeObserver = new ResizeObserver(handleResize);
  
  // 首次加载，观察对应的容器
	resizeObserver.observe(currentContainer);

  // 组件卸载时，去掉观察事件
  return () => {
		resizeObserver.unobserve(currentContainer);
  };
}, []);
~~~

