# React Fiber 性能优化（内部试讲）

司徒正美

React 早期的优化都是停留于 JS 层面（vdom 的 create/diff），诸如减少组件的复杂度（Stateless），减少向下 diff 的规模(SCU)，减少 diff 的成本(immutable.js)，当然，也有例外，比如针对老式的 IE 的 LazyDOMTree。 到 React16，则升级到浏览器渲染机制层面, 在 patch 上取得了突破。众所周知，浏览器是单线程。想象一下，如果有两个线程，一个线程要对这节点进行移除，一个要对它进行样式操作。线程是并发的，无法决定顺序，这样页面的效果是不可控的。换单线程则简单可控，但 JS 执行与视图渲染与资原加载与事件回调是如何调度呢，于是有了 EventLoop 这种东西。

![img](https://pic4.zhimg.com/80/v2-6629f0023a8d415e7179bb795bf5ee87_1440w.jpg)

EventLoop 是非常复杂的，但有一个要点，你一下子分配它许多任务，它的处理速度就下降。如果你把相同的任务放在一起，它就速度就上去（如 className 代替多个 dom.style.xxx=yyy, fragment 代替多个节点插入）。一下子创建 10000 个 DIV，并设置随机 innerHTML，随机背景，它在 chrome 都会卡好久。如果打散，每隔 60ms 处理当中的 100 个，分 10 分次处理，则页面很流畅。

```js
//一下了吃进10000个DIV by 司徒正美
function randomHexColor() {
  //随机生成十六进制颜色
  return (
    "#" + ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
  );
}
setTimeout(function () {
  var k = 0;
  var root = document.getElementById("root");
  for (var i = 0; i < 10000; i++) {
    k += new Date() - 0;
    var el = document.createElement("div");
    el.innerHTML = k + Math.random();
    root.appendChild(el);
    el.style.cssText = "background:" + randomHexColor() + ";height:30px;";
  }
}, 3000);
```

![img](https://pic3.zhimg.com/80/v2-723dcef6810d316e6b55ef5b87175b52_1440w.jpg)

```js
//by 司徒正美
var root = document.getElementById("root");
function randomHexColor() {
  //随机生成十六进制颜色
  return (
    "#" + ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
  );
}
setTimeout(function () {
  function loop(n) {
    var k = 0;
    for (var i = 0; i < 100; i++) {
      k += new Date() - 0;
      var el = document.createElement("div");
      el.innerHTML = k + Math.random();
      root.appendChild(el);
      el.style.cssText = "background:" + randomHexColor() + ";height:30px;";
    }
    if (n) {
      setTimeout(function () {
        loop(n - 1);
      }, 40);
    }
  }
  loop(100);
}, 3000);
```

![img](https://pic2.zhimg.com/80/v2-8c0b6bbac98f0f08f2c0067c7876ff85_1440w.jpg)

![img](https://pic2.zhimg.com/80/v2-3a058ed41538b2f64bbe4fec75b54ff1_1440w.jpg)

React16 的优化思想就是基于这点。由于 Fiber 调度算法分成两个阶段，第一个阶段创建 DOM，实例，执行 willXXX 轻量 hook，并且标记它的各种可能任务（sadeEffect）.第二个阶段才执行它们。这时它会优先进行 DOM 插入或移动操作，然后才是属性样式操作，didXXX 重型 hook，ref。

其中先操作 DOM，再设置属性就是一个非常大的优化。DOM 插入移除变成批处理了，样式属性也变成批处理的。

当然这是同步模式下的超级优化。更绝的是异步模式的时间分片。上面已经说了 EventLoop 在繁忙状态下会让页面卡顿低效。于是需要一个时间调度器。浏览器刚好实现一个 requestIdleCallback。requestIdleCallback 根据参数的不同，可以在限度时间内安排一定量的 JS 任务，从而不影响视图渲染/事件回调; 也可以强制在浏览器不断更新视图的瞎忙中，强制中断这个行为，立即安插进我们 React JS 逻辑。

正因为有了这个神器。我们在 requestIdleCallback 的回调中加入一个 WorkLoop 的方法，它每接触一个 fiber 时，就判定一下当前时间，看否有空闲时间让它进行 beginWork 操作（相当于刚才的第一个阶段，设置 dom, instance, willXXX），没有就把它放进列队中。把控制权让渡给视图渲染。下次 requestIdleCallback 唤起时，从列队将刚才那个 fiber 取出来，执行 beginWork。

2018 年

Michael 笔记：

为什么使用 Fiber 结构：因为原来的性能不太好，同时操作大量 DOM 会卡顿；Fiber 优化性能；

Fiber 调度算法：第一步创建 DOM 元素，第二部批量属性操作（批处理速度大于单独的属性加载）
