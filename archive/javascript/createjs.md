## 新手写createjs时容易遇到的坑（持续更新）

新手写createjs一定会遇到很多的坑，下面我来讲下常见的坑和解决方法，大家可以经常来看看这篇文章，本人会持续更新！

1.按钮的alpha值不能为0:

在做flash的时候很多人会弄一个alpha值为0的按钮放在图片上代替图片按钮点击，以减少项目的大小。但是在createjs中所有对象 alpha为0时都不受任何鼠标事件影响。不过解决起来也非常容易，alpha设为%1（0.01）就可以了（设置hitArea也可以，而且更方便）。

2.项目中有使用引导层 必须在初始化中写上createjs.MotionGuidePlugin.install();

这个就不用多说了 如果项目中的动画有用到引导层 初始化的时候加上这句话就可以了。

3.项目中使用音乐时 必须在加载时写上loader.installPlugin(createjs.Sound);

这个也不多解释同上。

4.用到mouseOver事件的时候需要加一句stage.enableMouseOver();要让移动端支持createjs的点击等鼠标事件时需要加上createjs.Touch.enable(stage);

5.js function 内部的this指向和as3是不一样的，需要额外保存this。

```
xx.addEventListener(``"click"``,``function` `(){``  ``this``.xxxx()``//这是错误的``})``var` `_this = ``this``;``xx.addEventListener(``"click"``,``function` `(){``  ``_this.xxxx()``//这是正确的``})
```

6.跨域错误（一般错误信息中有显示cross-domain都是跨域错误，新手常发生在点击和加载的时候，我不说很多新手甚至不知道这是跨域错误），先排查地址是不是在线上或者本地环境中的，地址是http或者https开头就是在线上，local开头就是本地模拟环境，file开头就是以文件模式打开，chrome会默认阻止访问本地图片，所以file开头就会跨域。排除环境问题，如果还是跨域就让后台改权限。如果排除环境问题，点击的时候还是跨域，那就这么处理，如果是animateCC就在上面盖一层alpha为1%的元件，如果是线上点击跨域就这么写：

var hitArea = new createjs.Shape();   

hitArea.graphics.beginFill("#000").drawRect(0,0,100,100);//这里的大小为图片大小，请自己调整

bitmap.hitArea = hitArea;

7.图片的名字不能与原件类链接名相同 （后缀名不同也算相同）,fla的名字不能和元件的类链接名相同，不然new对象的时候会new成别的对象，从而显示错误或者什么都不显示。

8.效率方面的优化，注重项目加载速度时多用矢量 注重项目体验与动画流畅时多用位图，现因为国产旧手机多对矢量支持不好，特别是安卓，还是多用位图吧，png用工具优化，推荐使用https://tinypng.com/，如果硬要用矢量，或者滤镜，或者叠加模式，可以使用SpriteSheetBuilder类优化，详细教程[点击这里](http://www.ajexoop.com/wordpress/?p=938)。

9.CC生成的对象不能用createjs的方法继承，需要特殊继承。

10.tween在MoiveClip的timeline的运行会从毫秒计算变成帧计算，如wait（1）-帧 ，wait（1000）-毫秒。

11.animateCC如果要使用资源整合sprite表功能，请把png和jpg分开，因为不分开会很大（flashcc没有这个功能所以别用），动画素材的整合大小不要大于1000*1000，因为createjs的bug，整合拆分也算作整合的大小，然而图片越大性能越差，最后整合就会比不整合卡很多（但是也不能不整合，小图片多了，就算开多线程加载，加载速度也很慢），不动的素材，比如背景图可以稍微大点，但注意也不能太大，任何素材太大都会被浏览器强制缩小，如果必须要大图，就拆成几个小图，下面是推荐设置：

![20190808112726.png](https://www.ajexoop.com/ueditor/php/upload/image/20190808/1565234907657271.png)

animateCC2019以后的纹理设置推荐参数

![QQ图片20200826161003.png](https://www.ajexoop.com/ueditor/php/upload/image/20200826/1598429458653112.png)

12.createjs侦听点击事件是会穿透的，也就是在上面掩盖东西是无效的，不过也有办法解决，在掩盖对象上面放一个空的点击侦听就可以了。

13.动画过多微信上切换程序后切回会掉帧，某些版本手机会出现，某些版本微信会直接关掉浏览器再打开就不会掉帧，当然这不是createjs的原因，因为css动画也会出现这个问题，是整个浏览器的帧频掉了（如果有大佬发现什么可以解决这个bug的方法请留言，谢谢，不过貌似最近微信修复了这个BUG）

14.如果出现无法跳帧，把MC的autoReset设置为false就好了，如果还不行setTimeout延时跳帧或者把跳帧代码写到第二帧。

(一般无法跳帧是MC还未初始化完成就跳帧导致的，这种情况一般是延时跳帧setTimeout就可以了，也有一种情况是跳帧的时候mc还不在舞台上，alpha值为0，visible为false，等原件不能呈现的情况，如果是这种情况那就设置MC的autoReset为false就可以了)

15.使用animateCC项目间粘贴资源的时候，如果有类链接，需要重新赋予一遍，否则不会被导出。

16.使用animateCC做遮罩层的时候，遮罩层只能有一个元件，并元件内部不能有元件动画，不能有超过一帧，否则会被提示 不支持的功能:遮罩中有多帧符号。

17.graphics在使用moveTo lineTo时如果异步画线需要重新设置样式

比如：

```
  ``var` `shape = ``new` `createjs.Shape();``  ``container.addChild(shape);``  ``shape.graphics.setStrokeStyle(2).beginStroke(``"#000000"``);``  ``shape.graphics.moveTo(0,0);``  ``shape.graphics.lineTo(100,100);``  ``shape.graphics.lineTo(200,150);``  ``shape.graphics.lineTo(300,50);
```

这样是对的 可以只设置一个style然后不停的lineTo下去，但是如果setTimeout或者click后再画就不行了，比如：

```
  ``var` `shape = ``new` `createjs.Shape();``  ``container.addChild(shape);``  ``shape.graphics.setStrokeStyle(2).beginStroke(``"#000000"``);``  ``shape.graphics.moveTo(0,0);``  ``shape.graphics.lineTo(100,100);``  ``shape.graphics.lineTo(200,150);``  ``shape.graphics.lineTo(300,50);` `  ``setTimeout(``function` `(){``//    shape.graphics.lineTo(400,300);//这里直接lineTo虽然颜色不会变但是粗细就变了，不知道是不是createjs的BUG``    ``shape.graphics.setStrokeStyle(2).beginStroke(``"#000000"``);``//这样重新设置样式后就没问题了``    ``shape.graphics.moveTo(300,50);``    ``shape.graphics.lineTo(400,300);``  ``},2000)
```

18.直接使用animateCC发布功能导出sprite图，图与图之间会有1像素间隔，有时候会在项目图片的边框上出现底色，

解决办法：animateCC发布设置-》sprite表-》jpeg设置-》最大大小设置为1 也就是说jpg图不融合sprite，png没关系，因为png是透明的，没有底色。

19.项目图片模糊，多半是移动端没有做2倍像素，PC端多半是自适应出问题了，详细教程可以看：

[面向canvas，更加简单的自适应方式](http://www.ajexoop.com/wordpress/?p=524)

[再讲讲自适应-移动端自适应](http://www.ajexoop.com/wordpress/?p=507)

[关于自适应的那点事](http://www.ajexoop.com/wordpress/?p=123)
20.一段时间点狂点click事件会掉帧，换成mousedown就好了。

21.animateCC软件中图片模糊。

右键库里的图片，把允许平滑关掉（关掉后缩放可能会出现锯齿，这个是CC的情况，因为原来flash的机制是这样的，canvas项目导出后是不会有的）

![QQ图片20170802111252.png](http://www.ajexoop.com/wordpress/wp-content/uploads/2016/03/QQ%E5%9B%BE%E7%89%8720170802111252.png)

22.在animateCC做补间的时候，先把图片或者矢量变成影片剪辑再做，不然导出的代码量会变大，还有可能会出问题。

23.在animateCC遮罩里做补间时，由于animateCC为了兼容，对象都是放在时间轴addTween而不是addChild，所以会出现一大堆矢量代码，如果有代码洁癖的，可以把这个功能用代码写，而不用animateCC。

24.使用createjs.Ticker.timingMode =  createjs.Ticker.RAF会使程序快很多，但是帧频会变得不可控。使用createjs.Ticker.timingMode =  createjs.Ticker.RAF_SYNCHED;时注意FPS设置的比预期高一点，比如你要帧频30就要设置成32。因为RAF的机制一但30到不了他就降级，30的下一级就是20,会造成程序慢很多。

25.animateCC不支持滤镜缓动，如果要使用滤镜缓动需要自己写代码，比如这样：

```
<!DOCTYPE html>``<``html``>``<``head``>``  ``<``meta` `charset``=``"UTF-8"``>``  ``<``title``></``title``>``</``head``>``<``body``>``<``canvas` `id``=``"canvas"` `width``=``"600"` `height``=``"400"``></``canvas``>``<``script` `src``=``"createjs-1.0.0.min.js"``></``script``>``<``script``>``  ``var canvas = document.getElementById("canvas");``  ``var stage = new createjs.Stage(canvas)//不用stagegl也行就是慢点``//  var stage = new createjs.StageGL(canvas)//用stagegl性能会好不少 但是会有背景色 需要自己拿底遮``  ``var shape = new createjs.Shape();``  ``shape.graphics.beginFill("#ff0000")``  ``shape.graphics.drawRect(0,0,250,120);``  ``shape.graphics.endFill();``  ``stage.addChild(shape);``  ``shape.x = 100;``  ``shape.y = 100;``  ``var blurFilter = new createjs.BlurFilter(5, 5, 1);``  ``shape.filters = [blurFilter];``  ``createjs.Tween.get(blurFilter).to({'blurX':40,'blurY':40},2000)``  ``createjs.Ticker.framerate = 60;``  ``createjs.Ticker.addEventListener("tick",function (){``    ``stage.update();``    ``shape.cache(-40, - 40, 250 + 80, 120 + 80);``  ``})``</``script``>``</``body``>``</``html``>
```

26.stagegl能大幅度提升性能，但是须要避免使用矢量，遮罩，滤镜，叠加方式等，因为使用这些stagegl须要不停的cache，这样对性能的消耗非常大（实在要用，使用SpriteSheetBuilder渲染后使用）

27.如果再使用animateCC2018或者苹果系统使用animate时出现Uncaught ReferenceError: lib is not defined的错误，请看这篇文章

[animateCC2018及苹果使用animateCC使用须知（必看）](http://www.ajexoop.com/wordpress/?p=862)
28.如果显示对象上的子集过多，会造成createjs的点击变卡，解决办法1：新建1个shape来点击，2：用hitarea定义点击对象且该对象的子集也不能很多，可以使用shape，3：改用touch事件,4点击对象cache（需要保证对象内部不会变）

29.如果要在animateCC的第一帧上写代码，且这个movieclip只有一帧，也需要在第一帧上加this.stop()，不然上面的代码会不停的调用（createjs1.0版本的bug，2015版本没有）。

30.之前flash中的元件的name等于他影片剪辑的名称，但是canvas项目并不是，canvas项目影片剪辑的名称只是他父对象的一个属性而已，并不包括名称，也就是并不能用if(e.target.name==xx)这样来判断，也不能用getChildByName来获取。

31.stagegl中使用cache运行遮罩，滤镜，叠加模式时，需要套一层container，在container上cache。

32.animateCC中如果使用滤镜变化（就是滤镜数值不同，或者从无到有），animateCC是不会导出滤镜的，这时候很容易让人有种无法跳帧的错觉，其实不是无法跳帧，是根本没有导出有关滤镜的代码，这么做的原因是为了保护性能，那怎么解决这个问题呢？很简单，就是把滤镜做成一张图片放进去就好了。

33.想要滤镜，alpha只在父容器应用而不在子容器应用，把父容器cache一下就好了（容器alpha后子容器的不透明度会叠加，造成整个显示对象不透明度不同的情况，设置cache可以解决）

34.项目莫名在30帧上不去或者莫名卡的的时候，看看是不是开了省电模式，很多时候关掉省电模式帧频又能上去。

35.在animateCC中，as3项目的图片平滑，在html5项目中并不起作用，createjs也没有直接提供平滑的api，但是我们可以自己做，参考：http://www.ajexoop.com/wordpress/?p=1167

\36. var loader = new createjs.LoadQueue(true); 加载大量素材时必须启用xhr模式，也就是参数里面写true，否则加载时间过长会报错。

37.在使用DOMElement的时候，如果dom会超过屏幕本身，请在dom外面加个div容器，并限制它的宽度，不然会出现自适应问题，设置如下：

```
<``style``>``  ``*{``    ``margin: 0;``    ``padding: 0;``  ``}``  ``body{``    ``overflow-x:hidden;``  ``}``  ``.ui-con{``    ``width: 750px;height:1334px;overflow: hidden;position: absolute;pointer-events: none;``  ``}``  ``.code{``    ``position: absolute;left: -999px;pointer-events: auto;``  ``}``</``style``>``<``div` `class``=``"ui-con"``>``  ``<``img` `id``=``"code"` `src``=``"images/code.png"` `class``=``"code"``>``</``div``>``<``canvas` `id``=``"canvas"` `width``=``"750"` `height``=``"1334"` `></``canvas``>``<!--上面代码中img就是需要设置成DOMElement的dom对象，div就是他的容器，css我设置了长宽，使它不超出限制，以防止自适应出问题，除此我还拿掉了他的鼠标响应以防止canvas的鼠标响应失效-->
```

38.如果你要在animateCC中写代码，并访问根容器就访问这个对象exportRoot，exportRoot相当于as3的root。

39.如果你的显示对象是用animateCC做的，你可以用mc.nominalBounds.width,mc.nominalBounds.height来访问长宽，但是只能访问不能控制，也就是只读的。

40.操作bitmap时，很多api需要在bitmap的image已经加载完成的情况下使用，所以万一你出现了与你预期不同的情况，多半是image还没有加载完成，你可以这样解决：

```
var` `bitmap = ``new` `createjs.Bitmap(``"xxx/xx.jpg"``);``bitmap.image.onload = ``function` `(){``  ``//在这里写操作逻辑，或者写好操作逻辑在这里调用``}
```

41.在animateCC里使用组件功能时报jquery的错，就多刷新保存几下。

42.animateCC中组件操作代码和一般对象操作代码完全不一样，详细打开animateCC的代码片段参阅(其实常用的代码，代码片段里都有，代码片段的位置参考下图)。

![QQ图片20181129175312.png](https://www.ajexoop.com/ueditor/php/upload/image/20181129/1543485272842355.png)

43.如果要操作animateCC元件中子元件的坐标与大小，请设置好这个点（按Q可以设置），这个点相当于代码中的注册点regX，regY，createjs的默认注册点在左上角，而animateCC在中间，这个要记住。还有子元件在animateCC中，坐标是根据左上角来算的，但是发布后代码是根据注册点加位置算的坐标，这个很容易搞错。

![QQ图片20181213150439.png](https://www.ajexoop.com/ueditor/php/upload/image/20181213/1544684729554072.png)

44.有部分素材或者动画显示不出来？看看是不是打散和资源合并sprite表功能一起用了。如果是选择其中一个，推荐选择合并sprite表，然后把打散的资源转位图（这里是推荐，具体还要看项目）

45.项目需要加载多个fla的时候，需要区分命名空间，2018只需要区分adobeid（不会弄就不要弄多个fla，放在一个fla中）

![QQ图片20190116140627.jpg](https://www.ajexoop.com/ueditor/php/upload/image/20190116/1547619682554699.jpg)

46.连续画图需要闭合路径，圆需要额外的重置绘制点，具体做法看下面代码，详细解释看文章：http://www.ajexoop.com/wordpress/?p=477

```
stage.addEventListener(``"stagemousedown"``,``function` `(event){``  ``shape.graphics.drawCircle(event.rawX,event.rawY,10).closePath();``  ``shape.graphics.drawCircle(0,0,0).closePath();``});
```

47.animateCC的canvas项目中，遮罩层上的元件是不能通过代码用元件名控制的，而是用mask，mask_1这个名字获取控制（神奇的设定）

48.不要用resize事件来判断浏览器长宽，因为很多设备resize之后浏览器长宽变化是会延时的，解决办法为要不延时判断，要不一直判断比如定时器（这个bug不是createjs的坑，是手机浏览器的坑）

49.在使用shape绘图的时候不要再drawXXX中赋值坐标，而是在drawXXX中参数选择0,0 然后在x y当中赋值坐标。详细解释文章：http://www.ajexoop.com/wordpress/?p=1310

50.如果元件要命名，一定要在所有关键帧上都命名，并且要命名一模一样，不然不仅有时候代码会调用不到，还会出现画面一闪的bug。

![QQ图片20190908152402.png](https://www.ajexoop.com/ueditor/php/upload/image/20190908/1567927460367007.png)

51.animateCC有时候会出现发布后的素材大小和编辑的时候不一致，或者说之前删掉的素材又出现了。这个bug是animateCC的，至今原因不明，替换素材的时候有几率产生，估计是animateCC缓存的资源并没有被替换造成的，如果出现这个bug，你新建一个fla把素材全部考过去重新发布就可以了，如果不确定是不是这个原因，你可以先用这个方法测一下，素材是否恢复。

52.LoadQueue的setMaxConnections方法可以开启多线程加载，加快加载速度，但是用setMaxConnections开启多线程加载的时候，必须让maintainScriptOrder=false，否则多线程还是不会开启。

53.把显示对象设置cursor = "pointer"或者直接使用ButtonHelp会自动给canvas的css设置cursor:"pointer",会在移动端造成整个canvas闪一下，设置createjs.Touch.enable(stage) 可以修复这个bug，如果遇到createjs.Touch.enable(stage) 不能设置的时候（比如需要在dom层滚动），把cursor 设置为"auto"，反正移动端不需要手型指针。

54.canvas或者图片宽高超过4000左右就会出问题，特别是canvas不是说舞台设置不超过4000就没事，需要计算手机的分辨率。比如你的anCC或canvas设置是720*2800，看似没有超，但是如果是全面屏手机宽度是1125，自适应后分辨率就会变为1125*4375，就超过了，这也是为什么有些人会出现有些手机不能显示有些手机可以显示的bug。那么解决呢？如果图片超过了就切开来再组合，如果是canvas超过了，需要做长图效果，就用内部的滑动逻辑（我博客有封装好的-》MoveControl）

55.如果要在ancc里直接做拖拽，需要强制关闭他的自适应，加入自己的自适应，详情点击：http://www.ajexoop.com/wordpress/?p=1423

56.由于createjs是在初始化的时候根据设备选择侦听方式的，所以你浏览器从pc切换移动端，或者从移动端切换pc的时候千万记得刷新一下，否则有关点击的事件都会失效。

57.在animateCC2018以上版本的时候，元件中有运行代码的情况下，单帧必须写上this.stop();多帧必须写上运行代码只运行一遍的逻辑（不然你的代码会被运行成千上万遍）。

58.animateCC2019以上中的，发布设置=》图像设置=》分辨率 设置为1，详细看问题11。

59.canvas内不能留有通道，也就是说，必须把素材塞满整个canvas（其实最简单的办法就弄张跟canvas一样大的图片放进canvas里），不然会卡。

60.舞台大小不能超过750*1489，超过了某些机子会卡，如果素材很长，那就在canvas内部做滚动。

61.使用xhr模式加载，preloadjs不会判断是否缓存，一定会下载，需要自己写逻辑去判断，preload可以预加载dom的资源，但是dom的资源先加载后，preload的资源还会继续加载，所以需要用preload预加载的童鞋，需要确定好先后顺序。



这上面很多坑，本人都是花了很长时间才解决的，你们看完后马上就能解决，可以省下很多很多时间，所以多看看，最好背下来，特别是红字部分的！

