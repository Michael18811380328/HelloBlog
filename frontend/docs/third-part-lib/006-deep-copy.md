# 006 deep-copy

## 用途

深复制对象和数组

## 可靠性

github 上面 34个星号，每周下载超出 10 万。这个使用需要考虑。

## 官网链接

https://www.npmjs.com/package/deep-copy

https://github.com/simov/deep-copy

## 基本使用

使用简单，直接传入对象或者数组，然后返回深拷贝的对象和数组

```js
var dcopy = require('deep-copy')

// deep copy object
var copy = dcopy({a: {b: [{c: 5}]}})

// deep copy array
var copy = dcopy([1, 2, {a: {b: 5}}])

```

## 其他

复杂的对象和数组，深拷贝后占用内存较大。如果数据量较大，需要考虑性能问题，是否有必要深拷贝整个数组或者对象。



# deepcopy （类似的库）

还有一个 deepcopy 类似，暂时先放在下面

## 用途

复制数据（各种数据类型深拷贝，支持自定义拷贝等，arrayBuffer，dataView）

## 可靠性

119 颗星，每周下载 15万，这个使用需要考虑。

## 官网链接

https://www.npmjs.com/package/deepcopy

https://github.com/sasaplus1/deepcopy.js

https://sasaplus1.github.io/deepcopy.js/benchmark

## 基本使用


```js
const src = {
  desserts: [
    { name: 'cake'      },
    { name: 'ice cream' },
    { name: 'pudding'   }
  ]
};

const dist = deepcopy(src);
src.desserts = null;
console.log(dist);

```

## 其他

这个同样存在性能问题
