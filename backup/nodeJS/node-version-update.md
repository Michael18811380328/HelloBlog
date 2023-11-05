# Node 8 升级 12 存在 array.sort 表现不一致风险

各位小伙伴们，在最近的一次 Node 的升级中，发现 array.sort 表现很糟糕啊，又有很多问题的小明开始提问了：有哪些不一致的表现？为啥会出现这种情况，在自己写的代码中如何避免这种情况？

## 具体表现

业务中 arrray.sort 的 compareFunction 直接返回 a > b ，在 node 8 和 node 12 版本表现不一致

```js
const compare = (a, b) => {
  console.log("a:", a);
  console.log("b:", b);
  return a > b;
};

// node version < 11
[2, 1].sort(compare)[
  // a:2
  // b:1
  // output [1, 2]

  // node version >= 11
  (2, 1)
].sort(compare);
// a:1
// b:2
// output [2, 1]
```

https://github.com/nodejs/node/issues/24294

## 影响范围

node v11 更新的 v8 引擎 7.0 版本，从 node v8 / node v10 升级到 node v11 及以上时，存在 array.sort 表现不一致的风险

(浏览器端也存在同样风险，chrome V70 更新的 V8 7.0 版本，以及不同浏览器的底层 JS 引擎实现也可能不同)

## 具体原因

错误的使用了 array.sort 方法，在 ES 规范中只对 array.sort 的 compareFunction 返回小于 0，等于 0，和大于 0 的情况做了定义，没有对返回布尔值做定义，所以直接返回 a > b 是未定义行为

![](https://cdn.nlark.com/yuque/0/2021/png/276016/1632838418532-e2a2ca59-a923-44da-8f4a-07490b7ff4f2.png)

由于 Node v11 更新了 V8 引擎的版本，而 V8 在此次更新中更新了 array.sort 的排序算法 (由插入排序和快排的混合算法更改为 timesort 算法)，底层的实现发生变化，具体表现是 compareFunction 的对源数组的比较顺序发生了变化

![](https://cdn.nlark.com/yuque/0/2021/png/276016/1632838434393-f836b202-befd-4cc6-a897-1dbea03b1163.png)

![](https://cdn.nlark.com/yuque/0/2021/png/276016/1632838441502-e49e9c4a-0875-4cd6-9c22-731c8885cb25.png)

> 排序算法的更改参考 https://v8.dev/blog/array-sort (zh: https://s0v80dev.icopy.site/blog/array-sort)

> 不同浏览器也存在类似问题可参考 http://w3help.org/zh-cn/causes/SJ9013

## 正确用法

```js
// node any version
[2, 1]
  .sort((a, b) => a - b)
  [
    // output [1, 2]

    // node any version
    (2, 1)
  ].sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
// ouput [1, 2]
```

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
