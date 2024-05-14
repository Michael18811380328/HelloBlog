# Rxjs

周下载量 4000 万，star 30K，使用较多。https://rxjs.dev/

这是一个 JavaScript 的反应式扩展库（Reactive Extensions Library for JavaScript）。目前大版本更新到 7.8.1，实际项目中没有使用。

主要作用：把事件回调函数的形式，改成链式调用的形式。

RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code. This project is a rewrite of Reactive-Extensions/RxJS with better performance, better modularity, better debuggable call stacks, while staying mostly backwards compatible, with some breaking changes that reduce the API surface。

RxJS是一个使用Observables进行反应式编程的库，可以更容易地编写异步或基于回调的代码。该项目是对Reactive-Extensions/RxJS的重写，具有更好的性能、更好的模块化、更好的可调试调用堆栈，同时保持大部分向后兼容，并进行了一些突破性的更改，减少了API。它采用了订阅者模式，带有纯函数式编程的思想。

## 案例

默认事件监听和回调函数：

~~~js
document.addEventListener('click', () => console.log('Clicked!'));
~~~

使用 rxjs 去掉了回调函数（观察者模式）：

~~~js
import { fromEvent } from 'rxjs';

fromEvent(document, 'click').subscribe(() => console.log('Clicked!'));
~~~

复杂案例（这个库增加了很多新的概念和使用成本）

~~~js
import { fromEvent, throttleTime, scan } from 'rxjs';

fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    scan((count) => count + 1, 0)
  )
  .subscribe((count) => console.log(`Clicked ${count} times`));
~~~

这个库需要的时候再学习，目前没有实际使用。
