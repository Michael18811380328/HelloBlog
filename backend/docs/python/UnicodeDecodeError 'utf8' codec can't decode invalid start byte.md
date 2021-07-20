# UnicodeDecodeError: 'utf8' codec can't decode byte 0x80 in position 3131: invalid start byte

**一、产生问题的原因**

在我使用python读取文本列表后，然后再读取每个文件的内容产生了上面的错误，

如果你是在Mac上写的代码，肯定是将.DS_store文件也读到列表里了，才产生的错误。

**二、解决方法**

通过终端cd到你的那个目录，然后ls -a .DS_store，查看文件是否真的存在，rm .DS_store之后，问题解决。

 

[附stackover flow链接](https://stackoverflow.com/questions/38518023/unicodedecodeerror-utf8-codec-cant-decode-byte-0x80-in-position-3131-invali)

 

![img](https://img2018.cnblogs.com/blog/879421/202001/879421-20200105201636342-1207020454.png)


Mac OS上使用Python3读取文件过程中出现了UnicodeDecodeError: 'utf-8' codec can't decode byte 0x80 in position 3131: invalid start byte情况。

原因是：OS X系统在文件夹中存在隐藏文件.DS_Store文件，影响了文件读取。

.DS_Store是Mac OS保存文件夹的自定义属性的隐藏文件，如文件的图标位置或背景色。

解决办法是：使用命令行进入当读取文件所在文件夹，删除.DS_Store文件。

1. 使用命令ls -a可以查看到.DS_Store文件

2. rm .DS_Store。

https://blog.csdn.net/qq_34149581/article/details/83418047
