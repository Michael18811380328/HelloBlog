## word-break:break-all和word-wrap:break-word的区别

这篇文章发布于 2015年11月19日，星期四，00:04，归类于 [CSS相关](https://www.zhangxinxu.com/wordpress/category/css/)。 阅读 98094 次, 今日 6 次 [20 条评论](https://www.zhangxinxu.com/wordpress/2015/11/diff-word-break-break-all-word-wrap-break-word/#comments)

by [zhangxinxu](https://www.zhangxinxu.com/) from [https://www.zhangxinxu.com](https://www.zhangxinxu.com/)
本文地址：https://www.zhangxinxu.com/wordpress/?p=5061

### 一、CSS是门重经验重积累的学科

下面这张截图是我转发一篇`z-index`相关文章时候的评论，因为我加了一句“学习了”，在我看来其实很正常的，因为我确实不知道`opacity`和`transform`等新属性会影响元素的`z-index`。

![关于CSS学习](https://image.zhangxinxu.com/image/blog/201511/2015-11-18_221626.png)

CSS的学习，就我个人看来，是有别于JavaScript这张传统程序语言的学习的。本身属性就多，值也多，不同属性在一起表现也不一样，不同属性和不同类型的HTML标签在一起又不一样，再加上兼容性差异和[未定义行为](https://www.zhangxinxu.com/wordpress/2015/04/understand-web-front-undefined-behavior/)。就像是很多个不确定因素，有着无穷多的组合和可能性。掌握这些不确定性，看书是绝对不够的，一定是要多多实践，多多思考，多多积累。对于底层机理的理解，也是需要一定的天赋的。

因此，就是自己很多年一直与CSS密切打交道，学习它，也有很多不知道的，理解不透彻，或者说因为要学习和思考的东西太多，还来不及估计到一些属性或者声明。

比方说本文要介绍的`word-break:break-all`和`word-wrap:break-word`, 虽然都有使用，都照过面，实际上，却一直没有机会能够好好看看这两个到底有什么区别，各个浏览器的兼容性如何，等等。换句话说，就是深入理解。

### 二、了解word-break属性

[MDN上](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break)展示的语法为：

```kotlin
/* 关键字值 */
word-break: normal; 
word-break: break-all; 
word-break: keep-all;

/* 全局值 */
word-break: inherit;
word-break: initial;
word-break: unset;
```

几个关键字值的含义如下：

- **normal**

  使用默认的换行规则。

- **break-all**

  允许任意非CJK(Chinese/Japanese/Korean)文本间的单词断行。

- **keep-all**

  不允许CJK(Chinese/Japanese/Korean)文本中的单词换行，只能在半角空格或连字符处换行。非CJK文本的行为实际上和`normal`一致。

其中，`break-all`这个值所有浏览器都支持。但是`keep-all`就不这样了，虽然有一定的发展和进步 – Chrome44正式支持了，~~但是，iOS下的Safari8/9都还不支持（下表黄绿色的表示不支持`keep-all`）。换句话说，基本上现在移动端还不适合使用`word-break:keep-all`~~.

**更新于2018-01-09**
今天再看[兼容性](https://caniuse.com/word-break/embed)，发现喜人：

![word-break兼容性表](https://image.zhangxinxu.com/image/blog/201801/2018-01-09_004101.png)

上面的兼容性数据最小面那行文字很有意思：

> Chrome, Safari and other WebKit/Blink browsers also support the unofficial `break-word` value which is treated like `word-wrap: break-word`.

翻译成简体中文就是：

> Chrome, Safari以及其他WebKit/Blink浏览器还支持~~费~~非官方标准的`break-word`值，其表现就和`word-wrap: break-word`一样。

OK，另外一个男主角登场了，`word-wrap`.

### 三、了解word-wrap属性

[MDN上](https://developer.mozilla.org/en-US/docs/Web/CSS/word-wrap)展示的语法为：

```css
/* 关键字值 */
word-wrap: normal;
word-wrap: break-word;

/* 全局值 */
word-wrap: inherit;
word-wrap: initial;
word-wrap: unset;
```

几个关键字值的含义如下：

- **normal**

  就是大家平常见得最多的正常的换行规则。

- **break-word**

  一行单词中实在没有其他靠谱的换行点的时候换行。

`word-wrap`属性其实也是很有故事的，之前由于和`word-break`长得太像，难免会让人记不住搞混淆，晕头转向，于是在CSS3规范里，把这个属性的名称给改了，叫做：`overflow-wrap`. 哎呀，这个新属性名称显然语义更准确，也更容易区别和记忆。

但是呢，恕我赵某咳两声，也就Chrome/Safari等WebKit/Blink浏览器支持。

所以，虽然换了个好看好用的新名字，为了兼容使用，目前，还是乖乖使用`word-wrap`吧。[兼容性](https://caniuse.com/wordwrap/embed)见下表（黄绿色的表示不支持`overflow-wrap`新的标准属性的）：

![overflow-wrap兼容性](https://image.zhangxinxu.com/image/blog/201801/2018-01-09_004351.png)

### 四、回归重点，word-break:break-all和word-wrap:break-word的区别

尼玛，说这两个声明不是兄弟都没人信，都有`word`都有`break`，位置都还一样，一个有2个`break`, 一个有2个`word`, 妥妥儿的用来迷惑大家的。我是花了好多年才没有把这两个记混淆，之前，每次用到都要查一下，晕死人的要~

![img](https://image.zhangxinxu.com/image/emtion/dizzy.gif)

这两个声明都能是连续英文字符换行，那区别在哪里呢？

您可以狠狠地点击这里：[word-break:break-all和word-wrap:break-word的区别demo](https://www.zhangxinxu.com/study/201511/word-break-break-all-word-wrap-break-word.html)

会发现类似下图的效果：
![word-break:break-all和word-wrap:break-word的区别截图](https://image.zhangxinxu.com/image/blog/201511/2015-11-18_233948.png)

可以发现，`word-break:break-all`正如其名字，所有的都换行。毫不留情，一点空隙都不放过。而`word-wrap:break-word`则带有怜悯之心，如果这一行文字有可以换行的点，如空格，或CJK(Chinese/Japanese/Korean)(中文/日文/韩文)之类的，则就不打英文单词或字符的主意了，让这些换行点换行，至于对不对齐，好不好看，则不关心，因此，很容易出现一片一片牛皮癣一样的空白的情况。

OK, 应该很容易get这个tips的。

至于如何记忆这两个CSS声明呢？

首字母走起：wbba(微博吧), wwbw(我五百万).

### 五、结束语，扯下word-spacing和white-space

`word-spacing`是单词之间间距的，`white-space`是字符是否换行显示的。

OK，困了，不展开了。