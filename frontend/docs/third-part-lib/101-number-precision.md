# 101 number-precision

## 用途

小数精确计算（默认JS浮点数会计算错误）

## 可靠性

星标3000，使用量每周不到1万。应该是使用 JS 进行数学运算的人比较少

## 官网链接

https://github.com/nefe/number-precision

https://www.npmjs.com/package/number-precision


## 基本使用


```js
import NP from 'number-precision'
NP.strip(0.09999999999999998); // = 0.1
NP.plus(0.1, 0.2);             // = 0.3, not 0.30000000000000004
NP.plus(2.3, 2.4);             // = 4.7, not 4.699999999999999
NP.minus(1.0, 0.9);            // = 0.1, not 0.09999999999999998
NP.times(3, 0.3);              // = 0.9, not 0.8999999999999999
NP.times(0.362, 100);          // = 36.2, not 36.199999999999996
NP.divide(1.21, 1.1);          // = 1.1, not 1.0999999999999999
NP.round(0.105, 2);            // = 0.11, not 0.1
```

## 其他

如果同时大量进行数学运算，性能不好
