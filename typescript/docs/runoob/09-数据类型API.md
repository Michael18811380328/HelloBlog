## 09 数据类型 API

类似 JS，TS中不同数据类型也有对应的属性和方法。

下面这几部分介绍主要的API

## Number 对象

https://www.runoob.com/typescript/ts-number.html

执行强制类型转换，不是数字的直接返回NaN。

```ts
var num = new Number(value);
```

Number 对象属性，可以表示最大最小的值，一般不使用。

实例方法：

- toExponential() 转换成指数表示法
- toPrecious(value) 保留几位小数
- toFixed(value) 转换成数字，value表示保留的小数点个数，默认是0——number.toFixed( [digits] )
- toLocaleString(value) 转换成字符串，使用本地的字符串格式（法国德国）
- toString(value) 转换成字符串，value表示几进制


## 字符串对象

https://www.runoob.com/typescript/ts-string.html

```ts
var text = new String('hello');
```

实例属性： length 返回字符串的长度

实例方法：

- charAt() 返回N个字符

- charCodeAt() 返回N个字符对应的Unicode

- concat() 连接两个字符串

- indexOf() 获取出现的位置

- lastIndexOf() 获取最后出现的位置

- localeCompare() 比较两个字符串

- match() 正则匹配查找

- replace() 正则匹配替换

- search() 正则匹配搜索

- slice() 提取字符串的片段

- split() 分割成数组

- substring(start, end) 提取两个索引之间的字符串

- toLowerCase()

- toUpperCase()

