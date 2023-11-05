## 今日内容：

u 学习 offset 家族（理论）

检测盒子宽高：offsetWidth 和 offsetHeight

检测盒子距离左/上位置：offsetLeft 和 offsetTop

检测盒子的带有定位的父盒子：offsetParent

# 第 1 章 offset 家族

## 1.1 三大家族和一个事件对象

三大家族（offset/scroll/client）

事件对象/event （事件被触动时，鼠标和键盘的状态）（通过属性控制）

## 1.2 Offset 家族简介

offset 这个单词本身是--偏移，补偿，位移的意思。

js 中有一套方便的获取元素尺寸的办法就是 offset 家族；

offsetWidth 和 offsetHight 以及 offsetLeft 和 offsetTop 以及 offsetParent

共同组成了 offset 家族。

### 1.2.1 offsetWidth 和 offsetHight （检测盒子自身宽高+padding+border）

这两个属性，他们绑定在了所有的节点元素上。获取之后，只要调用这两个属性，我们就能够获取元素节点的宽和高。

offset 宽/高 = 盒子自身的宽/高 + padding +border；

offsetWidth = width+padding+border；

offsetHeight = Height+padding+border；

### 1.2.2 offsetLeft 和 offsetTop （检测距离父盒子有定位的左/上面的距离）

返回距离上级盒子（带有定位）左边 s 的位置

如果父级都没有定位则以 body 为准

offsetLeft 从父亲的 padding 开始算,父亲的 border 不算。

在父盒子有定位的情况下，offsetLeft == style.left(去掉 px)

### 1.2.3 offsetParent （检测父系盒子中带有定位的父盒子节点）

1、返回改对象的父级 （带有定位）

​ 如果当前元素的父级元素没有进行 CSS 定位 （position 为 absolute 或 relative，fixed）， offsetParent 为 body。

2、如果当前元素的父级元素中有 CSS 定位 （position 为 absolute 或 relative，fixed）， offsetParent 取最近的那个父级元素。

## 1.3 offsetLeft 和 style.left 区别

一、最大区别在于 offsetLeft 可以返回没有定位盒子的距离左侧的位置。

而 style.left 不可以

二、offsetTop 返回的是数字，而 style.top 返回的是字符串，除了数字外还带有单位：px。

三、offsetTop 只读，而 style.top 可读写。（只读是获取值，可写是赋值）

四、如果没有给 HTML 元素指定过 top 样式，则 style.top 返回的是空字符串。

Style.left 在 等号左边和右边还不一样（左边的时候是属性，右边的时候是值）

# 第 3 章 案例

### 1.7.1 焦点图

难点 1：先点亮盒子，然后移动图片。

2：移动图片的目标位置都是负值。

（负的图片的个数乘以图片的宽，到 0 之间）（负数）

​ 3：获取盒子的索引值，我们才能知道，ul 向右移动几张图片。

### 1.7.2 切换图

难点：1.为什么移动的图片是负值。（参看上面的案例难点 2）

2.为什么要计数器。

（我们需要一个值， 记录当前图片，方便后续操作）

3.为什么方法 1 里的 num--；方法 2 里面的 num++。

我们要看之前的图片，就要 num--，要看后面的图片就要 num++；

图片想左走显示后面的，图片向右走显示前面的。

# 第 1 章 内置对象

## 1.2 String

### 1.2.1 给索引查字符(charAt/charCodeAt)

1 charAt，获取相应位置字符（参数： 字符位置）

注释：字符串中第一个字符的下标是 0。如果参数 index 不在 0 与 string.length 之间，该方法将返回一个空字符串。

2 charCodeAt 获取相应位置字符编码（参数： 字符位置）

charAt()方法和 charCodeAt()方法用于选取字符串中某一位置上的单个字符

区别：charCodeAt()方法，它并不返回指定位置上的字符本身，而是返回该字符在 Unicode 字符集中的编码值。如果该位置没有字符，返回值为 NaN.

字符/字符编码 = Str.charAt/charCodeAt(索引值);

### 1.2.2 给字符查索引（indexOf/lastIndexOf）

1 indexOf，从前向后索引字符串位置（参数： 索引字符串）

从前面寻找第一个符合元素的位置

2 lastIndexOf，从后向前索引字符串位置（参数：索引字符串）

从后面寻找第一个符合元素的位置

找不到则返回 -1

索引值 = str.indexOf/lastIndexOf(想要查询的字符);

### 1.2.3 url 编码和解码（了解）

URI (Uniform ResourceIdentifiers,通用资源标识符)进行编码，以便发送给浏览器。有效的 URI 中不能包含某些字符，例如空格。而这 URI 编码方法就可以对 URI 进行编码，它们用特殊的 UTF-8 编码替换所有无效的字符，从而让浏览器能够接受和理解。

encodeURIComponent() 函数可把字符串作为 URI 组件进行编码

decodeURIComponent() 函数可把字符串作为 URI 组件进行解码

## 1.4 addEventListenner（兼容绑定、移除、原理）

​ 1.使用方法

​ 2.实现原理

​ 3.兼容性。

​ 5.移除事件

​ 1.bnt.onclick = null;

​ 2.btn.removeEventListener(...);

​ 3.btn.detachEvent(...);(attachEvent)
