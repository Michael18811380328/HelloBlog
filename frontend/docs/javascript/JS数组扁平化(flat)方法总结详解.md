# JS数组扁平化(flat)方法总结详解

这篇文章主要介绍了JS数组扁平化(flat)方法总结详解，文中通过示例代码介绍的非常详细，对大家的学习或者工作具有一定的参考学习价值，,需要的朋友可以参考下

**需求**:多维数组=>一维数组

```
let ary = [1, [2, [3, [4, 5]]], 6];``let str = JSON.stringify(ary);
```

**第0种处理:直接的调用**

```
arr_flat = arr.flat(Infinity);
```

**第一种处理**

```
ary = str.replace(/(\[\]))/g, ``''``).split(``','``);
```

**第二种处理**

```
str = str.replace(/(\[\]))/g, ``''``);``str = ``'['` `+ str + ``']'``;``ary = JSON.parse(str);
```

**第三种处理：递归处理**

```
let result = [];``let fn = ``function``(ary) {``for``(let i = 0; i < ary.length; i++) }{``let item = ary[i];``if` `(Array.isArray(ary[i])){``fn(item);``} ``else` `{``result.push(item);``}``}``}
```

**第四种处理：用 reduce 实现数组的 flat 方法**

```
function` `flatten(ary) {``return` `ary.reduce((pre, cur) => {``return` `pre.concat(Array.isArray(cur) ? flatten(cur) : cur);``})``}``let ary = [1, 2, [3, 4], [5, [6, 7]]]``console.log(ary.MyFlat(Infinity))
```

**第五种处理：扩展运算符**

```
while` `(ary.some(Array.isArray)) {``ary = [].concat(...ary);``}
```

这是一个比较实用而且很容易被问到的问题，欢迎大家交流补充。