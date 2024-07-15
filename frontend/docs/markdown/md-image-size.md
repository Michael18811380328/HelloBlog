# MarkDown 图片大小问题

使用传统的 html 形式实现 markdown 图片样式简单处理。

MarkDown 里显示图片的方式可以引入 HTML 方法,
以 512×512 的 lena 图像为例,
直接以 MarkDown 插入图片的方法，图片就会靠在左侧，大小也不由自己决定：

```markdown
![lena](https://img-blog.csdn.net/20151129213701642)
```

其中<https://img-blog.csdn.net/20151129213701642>是本人上传的 lena 图像链接。

固定图片显示大小：

```html
<img
  src="https://img-blog.csdn.net/20151129213701642"
  width="256"
  height="256"
/>
```

其中 src 后面接的就是图像对象，width 和 height 设置的是显示图像的尺寸。

根据一定比例显示：

```html
<img
  src="https://img-blog.csdn.net/20151129213701642"
  width="50%"
  height="50%"
/>
```

其中 width 和 height 后面的 50%就是根据窗口的大小以一定的比例显示图片。值得一说的是，这种按照百分比显示方法，是以 width 方向为准，并保持纵横比的，换句话说，把设置 width 的部分去掉，height 的值改为任意百分比，显示的图像都是原图大小（个人觉得这根博客窗口有关，毕竟现实截面的宽度相对是固定的，而高度/长度却是变化着的）。因此用此方法的时候，可以把 height 设置缺省。(亲测，好用，==只设 width，可以维持原图比例==）

如：

```html
<img src="https://img-blog.csdn.net/20151129213701642" height="5%" />
```

是不是，还是原图的大小……

如果想给图像加个标注，可以这么做：

```html
<center>
  <img
    src="https://img-blog.csdn.net/20151129213701642"
    width="25%"
    height="25%"
  />
  Figure 1. Lena
</center>
```

如果想让图和标注间距离增大，可以这么做：

```
<center>
<img src="https://img-blog.csdn.net/20151129213701642" width="25%" height="25%" />
$ $
Figure 1. Lena
</center>12345
```

亲测，只设 width:

```
<center>
<img src="https://img-blog.csdn.net/20151129213701642" width="40%" />
Figure 1. Lena
</center>1234
```
