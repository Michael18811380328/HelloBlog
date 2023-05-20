## 第三方工具 LOCALFORAGE

改进的离线存储，文档：https://localforage.docschina.org/

```js
// 通过 localStorage 设置值
localStorage.setItem('key', JSON.stringify('value'));
```

localForage 是一个 JavaScript 库，通过简单类似 `localStorage` API 的异步存储来改进你的 Web 应用程序的离线体验。它能存储多种类型的数据，而不仅仅是字符串。localForage 有一个优雅降级策略，若浏览器不支持 IndexedDB 或 WebSQL，则使用 localStorage。

~~~js
// 通过 localForage 完成同样功能——异步写法
localforage.setItem('key', 'value').then(callback);

// localForage 同样支持回调函数——同步写法
localforage.setItem('key', 'value', callback);
~~~



