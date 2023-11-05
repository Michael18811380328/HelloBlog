# CSS3(@media)判断手机横竖屏

原文出处：https://jingyan.baidu.com/article/455a9950aa8aaea16627788a.html

相似文章：[CSS之响应式Web设计（横屏/竖屏提醒）](https://blog.csdn.net/qq_16494241/article/details/50251703)

相信大家在使用phone/pad在浏览网页时都有这样的感受，横屏/竖屏看网页时，内容一致，但是排班和样式却大不一样；

这也是移动开发过程需要注意的地方，作为web开发人员需要尽可能优化用户体验，横、竖屏显示就是其中很关键的一项：

利用CSS3中@media媒体查询可以很轻易的实现横竖屏不同样式排版定义

举例：

```html
<!DOCTYPE html>
<html>  
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <style>
      @media all and (orientation : landscape) { 
        h2{
          color:red;    /*横屏时字体红色*/ 
        }
      }
      @media all and (orientation : portrait){ 
        h2{
          color:green;    /*竖屏时字体绿色*/
        } 
      }
    </style>
  </head>
  
  <body>
    <h2>
      jquerymobile 判断手机横屏竖屏
    </h2>
  </body>
 
</html>
```

![img](https://img-blog.csdnimg.cn/20190605155605462.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZWxlbl9qYWs=,size_16,color_FFFFFF,t_70)