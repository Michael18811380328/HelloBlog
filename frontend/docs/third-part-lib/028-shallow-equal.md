# 028 shallowequal

## 用途

对象浅对比相等

比较两个对象的键是否相等，两个对象的每一个键对应的属性，是否全等

适合于两个对象的属性都是简单类型的情况，或者复杂类型，指向一个内存地址的情况

## 可靠性

150 星星，50万人使用

## 官网链接

https://github.com/dashed/shallowequal

https://www.npmjs.com/package/shallowequal

## 基本使用

```js
const shallowequal = require("shallowequal");

const object = { user: "fred" };
const other = { user: "fred" };

object == other;
// → false

shallowequal(object, other);
// → true
```

## 其他

```js
module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (Object.is(objA, objB)) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && !Object.is(valueA, valueB))) {
      return false;
    }
  }

  return true;
};
```
