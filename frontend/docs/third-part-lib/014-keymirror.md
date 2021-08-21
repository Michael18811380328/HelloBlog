# 014 keymirror

## 用途

创建一个键和值相等的对象（这个函数直接复制过来就行）

创建一个对象的简单实用程序，其键被镜像为值。 react/lib/keyMirror 的独立端口。

## 可靠性

300个星星，用的人18万，直接复制 react 源码对外暴露

## 官网链接

https://www.npmjs.com/package/keymirror

https://github.com/STRML/keyMirror

## 基本使用

```js
var keyMirror = require('keymirror');
var COLORS = keyMirror({blue: null, red: null});
```

## 其他

源码
```js
/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror = function(obj) {
  var ret = {};
  var key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = key;
    }
  }
  return ret;
};

```


I sometimes use this with lodash - use the following upon your first use of lodash to mix it in:

```js
var _ = require('lodash');
_.mixin({keyMirror: require('keymirror')});
// Can now be used as _.keyMirror(object)
```
