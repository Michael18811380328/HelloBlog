#### 1 常见的web攻击

- XSS：cross site scripting 跨站脚本攻击；有漏洞的网站运行攻击者的脚本命令。可以利用虚假表单获取个人信息。利用 JS 获取用户的cookie值。被害者在不知情的情况下，帮助攻击者发送恶意请求（显示伪造的文章或者图片，显示伪造的网页登录情况）。例子：被攻击的A网站中，通过URL传值，获取登录用户名。那么攻击者在URL中设置自己的攻击脚本，获取cookie等信息。`localhost:3000/?id=<script>alert('1')</script>` 进一步执行远程脚本 `localhost:3000/?id=<script src="http://www.baidu.com/index.js"></script>` 获取信息。
- CSRF、点击劫持、OS注入、请求劫持、DDOS
- SQL注入：用户在提交数据时（用户名密码），可能把非法的用户名（例如某一段SQL语句）提交到服务器。服务器在查找数据库时，`select * from db where username is XXX ` 把非法的SQL执行，造成数据损失等。避免方法：永远不要相信用户的输入；对用户的输入进行校验和转换；不要使用超级管理员权限执行某些操作等。

XSS 解决方法，避免把用户传递的变量，直接和 HTML 拼接，然后执行。

解决：将用户的输入通过下面函数转换成合法的HTML，先创建文本节点，然后在获取内部HTML

~~~js
HTMLescape: function(html) {
  return document.createElement('div')
    .appendChild(document.createTextNode(html))
    .parentNode
    .innerHTML;
}
~~~

然后把生成的HTML，使用 `<a href="://www.baidu.com"> + str + </a>` 包起来，这样就避免了XSS

#### 6 Django

django模板样式：在开发模式下，直接通过 import 可以导入 CSS 文件。在生产环境下，会把相互的依赖关系分别打包，然后Django后端模板中需要插入对应的JS和CSS文件。这个本地开发测试不出来。（本地环境下正常，在线环境下面不正常的情况）

本地环境下面，只显示项目的CSS，可能在生产环境下，项目中的CSS可能和第三方库的CSS冲突（类名冲突）

#### 3 ssh

ssh 用于登录远程主机，命令是 `用户名@远程主机的ip`，本地使用虚拟机测试，流程如下（这个适合虚拟机和宿主机的通信）

1、打开虚拟机，使用 ifconfig | grep 'inet' 查看虚拟机的IP地址（eg: 192.168.1.168）

2、在宿主机打开终端，使用 ssh michael@192.168.1.168 登录，然后输入虚拟机账户密码，即可进入

3、如果提示网络连接不上，可以查看局域网是否畅通，或者重启虚拟机（重新获取IP）

4、操作虚拟机（例如部署 python3 环境等）

5、退出时，执行 exit() 命令

（需要测试不在一个局域网下的主机是否可以远程登录）

尝试使用联想电脑连接无线，然后开启服务器；使用mac链接手机热点，看能否SSH正常登录一下——SSH 需要在同一个局域网中进行处理。现在报错 22 端口没有开放，稍后继续尝试；两台电脑需要预先设置支持远程登录。

man 命令（manual）可以查看一个命令的帮助文档： man git （git manual 文档）

笔记：移动端的键盘输入问题和切换界面问题；如果是一个界面内部的，不需要考虑；如果是新开的一个页面，需要考虑这个问题；目前的解决办法是，主动让 input 失去焦点，输入法自动关闭，再打开下一单页面（实际问题：移动端中，用户编辑过滤器时，先输入文本或者数字，移动端键盘打开，然后更改列，键盘没有及时关闭，样式错误）

笔记：input file 上传后，应该清空一个 input 的值(input.value = '')，这样再次上传同名文件是正常的。

#### 4 Python序列解包

序列解包是 python3 的语法糖，可以批量进行复制或者解包

~~~python
# 简单赋值
x, y = 1, 2

# x, y 调换顺序
x, y = y, x

# 斐波那契数列中求和
x, y = y, x + y

# 获取剩余部分（*表示）
x, y, *z = 1, 2, 3, 4, 5 # z [3, 4, 5]
x, *y, z = 1, 2, 3, 4, 5 # y [2, 3, 4]
x, *y, z = 1, 2 # x 是1，z 是2， y是空列表
~~~

复杂情况

~~~python
(a, b), (c, d) = (1, 2), (3, 4)

s = 'ABCDEFG'
while s:
  x, *s = s
  print(x, s)
  
# result 
A ['B', 'C', 'D', 'E', 'F', 'G', 'H']
B ['C', 'D', 'E', 'F', 'G', 'H']
C ['D', 'E', 'F', 'G', 'H']
D ['E', 'F', 'G', 'H']
E ['F', 'G', 'H']
F ['G', 'H']
G ['H']
H []
~~~

参考链接：https://blog.csdn.net/yilovexing/article/details/80576788

本质上，python 变量存储的不是值，而是内存地址。这个操作是把引用的内存地址直接交换。

#### 5 chmod

change mode :用户对文件的权限的命令

主要用于 bash 可执行脚本的使用

chmod 755 hello

更改权限后，这样就可以执行了

文件执行时，第一行是执行的环境设置（下面第一个是node，第二个是bash）

~~~js
#!/usr/bin/env node
console.log('hello world');
~~~

~~~bash
#!/bin/bash
echo "build start------"
cd book && mkdocs build
~~~

#### 6 git cherry-pick 

问题原因：想把一个分支上的一个或者几个 commits 提交到另一个分支上面。比如把 1.5 分支上的后续修复 commit 提交到 master 分支上。但是不需要把全部的 1.5 分支的全部 commits 放在 master 上，可以使用这个命令。下面是操作过程

~~~bash
git fetch origin 1.5 && git checkout 1.5
git log
~~~

查看提交日志，然后找出某一个或者某几个 hash

~~~txt
commit 62ede8d524ba78ec3a6b427a4dc3f7cfef12dba3 (HEAD -> master, origin/master, origin/HEAD)
Author: Michael An <2331806369@qq.com>
Date:   Fri Feb 19 22:19:31 2021 +0800

    fix color popover (#2151)

commit d60da5d351f0c629ae3655afb9c07c38216a8be9
Author: Michael An <2331806369@qq.com>
Date:   Fri Feb 19 16:01:34 2021 +0800

    fix group no rows bug (#2150)

commit a24fa659140b47736dc46d0000964c86e0fb9f17
~~~

然后切换到master上面，进行 cherry-pick 摘樱桃

~~~bash
git checkout master
git cherry-pick d60da5d351f0c629ae3655afb9c07c38216a8be9 # 把这一个commit放到master
git cherry-pick A-hash B-hash # 把两个hash之间的全部Commits放到master分支
~~~

这样master上就有了1.5分支上的几个commit了。

参考：http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html