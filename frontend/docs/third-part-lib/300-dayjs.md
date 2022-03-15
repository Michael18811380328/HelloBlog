# Dayjs

周下载量 750万

星星 38K

官网链接：https://dayjs.fenxianglu.cn/category/

### 简介

Day.js 是一个极简的 JavaScript 库，它解析、验证、操作和显示现代浏览器的日期和时间，具有很大程度上与 Moment.js 兼容的 API。 如果您使用 Moment.js，那么您已经知道如何使用 Day.js。

因为 Moment 库太大了，会让打包后的代码体积过大，所以使用 DayJS （2kb）来代替 Moment。

主要的特点：

```
dayjs().startOf('month').add(1, 'day').set('year', 2018).format('YYYY-MM-DD HH:mm:ss');
```

- 🕒 Familiar Moment.js API & patterns 与 moment API相似，使用方便
- 💪 Immutable 不可更改数据
- 🔥 Chainable 函数链式调用
- 🌐 I18n support 支持国际化
- 📦 2kb mini library 代码体积小
- 👫 All browsers supported 支持全部主流浏览器



### API

It's easy to use Day.js APIs to parse, validate, manipulate, and display dates and times. 解析、处理、校验、增减、展示时间和日期

```js
dayjs('2018-08-08') // parse 解析时间字符串（字符串转换成时间对象）

dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A') // display 展示（时间对象转换成规定格式字符串）

dayjs().set('month', 3).month() // get & set 获取，设置（获取时间对象的月，或者改变月）

dayjs().add(1, 'year') // manipulate 增减（时间对象增减）

dayjs().isBefore(dayjs()) // query 查询比较 （判断两个时间）
```

📚[API Reference](https://day.js.org/docs/en/parse/parse)

### I18n

Day.js has great support for internationalization. But none of them will be included in your build unless you use it.Day.js 支持国际化。但除非手动加载，多国语言默认是不会被打包到工程里的。

```js
import 'dayjs/locale/es' // load on demand 按需加载

dayjs.locale('es') // use Spanish locale globally 全局使用西班牙语格式

dayjs('2018-05-05').locale('zh-cn').format()
// use Chinese Simplified locale in a specific instance 在这个特殊案例中使用中文格式
```

📚[Internationalization](https://day.js.org/docs/en/i18n/i18n)

### Plugin

A plugin is an independent module that can be added to Day.js to extend functionality or add new features.

插件是一些独立的程序，可以给 Day.js 增加新功能和扩展已有功能

插件可以使核心包体积减小，根据特定需求处理（时间格式化国际化占用比较多）

```js
import advancedFormat from 'dayjs/plugin/advancedFormat' // load on demand 按需加载

dayjs.extend(advancedFormat) // use plugin 使用格式

dayjs().format('Q Do k kk X x') // more available formats
```



### 练习

~~~js
// npm istall dayjs
import dayjs from 'dayjs';

// 基本语法
let now = dayjs();
let day1 = dayjs('2018-04-04T16:00:00.000');
let dayStr = dayjs().format('YYYY-MM-DD');
let dayMonth = dayjs().set('month', 3).month();
dayjs().add(1, 'month');
dayjs().isBefore(dayjs());

// 国际化
import 'dayjs/locale/es';
import 'dayjs/locale/zh-cn';

dayjs.locale('es');
dayjs('2022-01-01').locale('zh-cn').format('YYYY-MM-DD');
~~~

