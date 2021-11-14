# Emoji 简介

## 一、含义

Emoji 是可以插入文字的图形符号。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017041301.png)

它是一个日语词，`e`表示“絵”，`moji`表示“文字”。连在一起，就是“絵文字”。  

Emoji 在上个世纪90年代，由日本电信商引入服务，最早用于在短消息之中插入表情。2007年，苹果公司的 iPhone 支持了 Emoji，导致它在全世界范围的流行。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017041303.jpg)

## 二、Unicode 标准化

早期的 Emoji 是将一些特定的符号组合替换成图片，比如将`:)`替换成`😃`。这种方法很难标准化，能够表达的范围也有限。

2010年，Unicode 开始为 Emoji 分配码点。也就是说，现在的 Emoji 符号就是一个文字，它会被渲染为图形。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017041302-1.jpg)

由于越来越受欢迎，Emoji 的国际标准在 2015 年出台，目前已经是 5.0 版了。

> - Emoji 1.0：2015年8月
> - Emoji 2.0：2015年11月
> - Emoji 3.0：2016年6月
> - Emoji 4.0：2016年11月
> - Emoji 5.0 (beta)：2017年3月

 截止2017年4月，列入 Unicode 的 Emoji 共有[2389个](http://www.unicode.org/emoji/charts/full-emoji-list.html)。

## 三、渲染实现

Unicode 只是规定了 Emoji 的码点和含义，并没有规定它的样式。举例来说，码点`U+1F600`表示一张微笑的脸，但是这张脸长什么样，则由各个系统自己实现。

因此，当我们输入这个 Emoji 的时候，并不能保证所有用户看到的都是同一张脸。如果用户的系统没有实现这个 Emoji 符号，用户就会看到一个没有内容的方框，因为系统无法渲染这个码点。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017041305.jpg)

目前，[苹果系统](http://emojipedia.org/apple/)、[安卓系统](http://emojipedia.org/google/)、[Twitter](https://twitter.github.io/twemoji/preview.html)、[Github](https://gist.github.com/rxaviers/7360908)、[Facebook](http://emojipedia.org/facebook/) 都有自己的 Emoji 实现。

## 四、使用方式

Emoji 虽然是文字，但是无法书写，必须使用其他方法插入文档。

（1）最简单的方法当然是复制/粘贴，你可以到 [getEmoji.com](http://getemoji.com) 选中一个 Emoji 贴在自己的文档即可。

（2）另一种方法是通过码点输入 Emoji。以 HTML 网页为例，将码点`U+1F600`写成 HTML 实体的形式`&#128512;`（十进制）或`&#x1F600;`，就可以插入网页。码点到这个[页面](http://emojipedia.org/facebook/http://emojipedia.org/facebook/)查询。

（3）JavaScript 输入 Emoji，可以使用 [node-emoji](https://www.npmjs.com/package/node-emoji) 这个库。

~~~html
<blockquote><pre><code class="language-javascript">

var emoji = require('node-emoji');

// 返回 coffee 的 Emoji
emoji.get('coffee'); 

// 返回文字标签对应的 Emoji
// https://www.webpagefx.com/tools/emoji-cheat-sheet/
emoji.get(':fast_forward:');

// 将文字替换成 Emoji
emoji.emojify('I :heart: :coffee:!');

// 随机返回一个 Emoji 
emoji.random();

// 查询 Emoji
// 返回结果是一个数组 
emoji.search('cof');

</code></pre></blockquote>
~~~

（4）还可以通过 [CSS](https://afeld.github.io/emoji-css/) 插入 Emoji。

~~~html
<blockquote>
  <pre>
  	<code class="language-markup">
			&lt;link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet"&gt;
			&lt;i class="em em-baby"&gt;&lt;/i&gt;
		</code>
	</pre>
</blockquote>
~~~

## 五、Emoji 组合

Unicode 除了使用单个码点表示 Emoji，还允许多个码点组合表示一个 Emoji。

其中的一种方式是“零宽度连接符”（ZERO WIDTH JOINER，缩写 ZWJ）`U+200D`。举例来说，下面是三个 Emoji 的码点。

> - U+1F468：男人
> - U+1F469：女人
> - U+1F467：女孩

上面三个码点使用`U+200D`连接起来，`U+1F468 U+200D U+1F469 U+200D U+1F467`，就会显示为一个 Emoji 👨‍👩‍👧，表示他们组成的家庭。如果用户的系统不支持这种方法，就还是显示为三个独立的 Emoji 👨👩👧。

## 六、趣闻

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017041304.jpg)

根据 [emojitracker](http://emojitracker.com/) 的调查，全世界最流行的 emoji，第一名是笑出眼泪 😂 ，第二名是红心❤️。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017041306.jpg)

日历的 Emoji 📅（U+1F4C5） 在苹果系统之中，一律是7月17日。这是苹果公司发布 iCal 的日子。有人戏称这个日子是“世界 Emoji 日”。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017041307.jpg)

## 七、参考链接

- 阮一峰老师的博客

- [Emoji - Wikipedia](https://en.wikipedia.org/wiki/Emoji)
- [The Definitive Guide to Emoji Domains](https://www.dnacademy.com/emoji-domains)

## 八、项目中实际遇到的问题

实际项目中，可能遇到用户编辑的文本中有表情（例如用户评论，用户博客等），可能出现两个问题

1、前端请求时，后端报 500 错误，无法保存评论

~~~md
(1366, "Incorrect string value: '\\xF0\\x9F\\x98\\x84\\n...' for column `xxx`.`xxx`.`xxx` at row 1")
~~~

可能是后端配置中，mysql 中不支持和字符集（通常是 utf-8 这里需要支持 utf8mb4）

~~~json
DATABASES = {
  'default': {
    'ENGINE': 'mysql',
    'NAME': 'db_test',
    'USER': 'root',
    'PASSWORD': 'xxxxxxxx',
    'HOST': 'db',
    'PORT': '3306',
  }
}
~~~

加入一个 options 配置（不同数据库根据实际情况）

~~~json
'OPTIONS': {
  'charset': 'utf8mb4',
  'use_unicode': True,
  'connect_timeout': 60,
}
~~~

这样请求就发出成功了，response status 200

2、从后端读取到的评论中，不显示表情

排除了问题1，证明写入是正常的，那么可能是数据库中评论字段的数据类型不合适，需要更改数据库表，示例：

~~~sql
ALTER TABLE `blog` CHANGE `comment` `comment_info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL;
~~~

uft8 最大字符编码是 3 字节，如果遇到4字节的字符就保存显示不正确（例如表情和某些生僻字），所以这里要使用 utf8mb4 编码（most bytes 4）一般情况下使用 utf8 比较节省空间，参考：https://www.cnblogs.com/cuiqq/p/11045487.html

