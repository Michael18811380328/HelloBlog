# background-image背景图片拉伸平铺

~~~html
<div style="width: 10%;height: 40px;background-image: url('../images/titleProject.png');filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale');-moz-background-size:100% 100%;background-size:100% 100%;text-align: center;vertical-align: middle;margin-left:-40px"><span style="padding-right:20%;color: white">选填项</span></div>
~~~

效果：


使用的背景图片：



实现方法主要是：
1，

filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale');

2，
-moz-background-size:100% 100%;background-size:100% 100%;

该方法目前以兼容80%的浏览器，可以放心使用！
————————————————
版权声明：本文为CSDN博主「MajorMayer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/MajorMayer/article/details/50669000