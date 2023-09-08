## NodeJS

#### 1. nodejs 中输入 bash 命令

需求：写一个nodejs 脚本，然后批量操作文件或者查询文件信息（使用bash命令）

~~~js
var process = require('child_process');

var command = "ls -al";

process.exec(command, function(err, stdout, stderr) {
  console.log(err);
  console.log(stdout);
  console.log(stderr);
});
~~~



## Python

#### 1 Django打包后样式

django模板样式：在开发模式下，直接通过 import 可以导入 CSS 文件。在生产环境下，会把相互的依赖关系分别打包，然后Django后端模板中需要插入对应的JS和CSS文件。这个本地开发测试不出来。（dev正常，build 后不正常的情况，可能是不同开发环境打包逻辑不一样）

本地环境下面，只显示项目的CSS，可能在生产环境下，项目中的CSS可能和第三方库的CSS冲突（类名冲突）

#### 2 Python序列解包

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



## 数据库

#### 事务处理

这是数据库中的术语：某一组操作时一个原子操作，如果中途无法执行，就回退到开始的状态，不能执行到一半。

实例：删除一个用户时，用户的各种信息分别在不同的表中存储，那么这组操作就包括多个删除 SQL 语句，就是一个 commit。例如删除用户的基本信息，用户的评论，用户的操作日志等。如果删除用户评论时，发现找不到这个用户，那么应该提示错误并回退到之前的状态，而不应该继续执行，或者执行一半。

```sql
START TRANSATION
DELETE FROM USERS WHERE user_id = 002;
DELETE FROM COMMENTS WHERE user_id = 002;
DELETE FROM OPERATIONS WHERE user_id = 002;
COMMIT;
```

#### nginx 入门参考

https://juejin.cn/post/6844904129987526663

https://zhuanlan.zhihu.com/p/34943332



## Bash

#### 1 ssh

ssh 用于登录远程主机，命令是 `用户名@远程主机的ip`，本地使用虚拟机测试，流程如下（这个适合虚拟机和宿主机的通信）

1、打开虚拟机，使用 ifconfig | grep 'inet' 查看虚拟机的IP地址（eg: 192.168.1.168）

2、在宿主机打开终端，使用 ssh michael@192.168.1.168 登录，然后输入虚拟机账户密码，即可进入

3、如果提示网络连接不上，可以查看局域网是否畅通，或者重启虚拟机（重新获取IP）

4、操作虚拟机（例如部署 python3 环境等）

5、退出时，执行 exit() 命令

（需要测试不在一个局域网下的主机是否可以远程登录）

man 命令（manual）可以查看一个命令的帮助文档： man git （git manual 文档）

移动端的键盘输入问题和切换界面问题；如果是一个界面内部的，不需要考虑；如果是新开的一个页面，需要考虑这个问题；目前的解决办法是，主动让 input 失去焦点，输入法自动关闭，再打开下一单页面（实际问题：移动端中，用户编辑过滤器时，先输入文本或者数字，移动端键盘打开，然后更改列，键盘没有及时关闭，样式错误）

笔记：input file 上传后，应该清空一个 input 的值(input.value = '')，这样再次上传同名文件是正常的。



#### 2 chmod

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

#### 3 tree

tree 命令可以显示显示当前项目的结构，通过参数设置不同的效果

~~~bash
# 显示英文名称
tree

# 显示中文名称（-N）
tree -N

# 显示全部文件（隐藏文件）
tree -a

# 过滤隐藏文件夹
tree -I "node_modules"

# 支持管道符和正则匹配
tree -I "node_modules|cache|test_*"

# 只看两级目录
tree -L 2

# 把当前目录下文件中文形式输出，并过滤图片文件，输出到 md 文件中
tree -N -I "*.svg|*.png|*.jpg|*.gif|*.xmind" > tree-res.md
~~~



## GIT

#### 2 git 命名规范

- commit 命名：每次commit，要标准和准确的描述做了什么，改了什么，删除了什么，新增了什么
- 分支命名：version/1.2.3（大版本分支），feature/login（新增特性分支简写feat）person/michael-an/bugfix-editor（个人分支）special/firefox-debug（特殊分支）前面是大类-后面是功能说明 hotfix（紧急修复分支）
- tag只能适用用稳定的版本

#### 3 安卓手机连接苹果电脑传文件

点击链接下载

android file transfer

然后连接安卓手机即可显示对应的文件

https://dl.google.com/dl/androidjumper/mtp/current/androidfiletransfer.dmg





### Event-loop

事件循环

JS 运行在浏览器，用户交互和JS脚本都可能执行，所以设置单线程。如果设置多线程，用户和JS脚本同时执行可能出问题。现在多核CPU的解决：使用HTML5中的 web worker 处理多线程问题。



### Mvc-mvp-mvvm

#### MVC 架构

model view controller 

View 是视图层，可以把数据显示在界面，用户直接和视图层交互；Controller 是控制器，主要处理界面的业务逻辑（打开关闭组件等）。Model 是数据层，主要存储底层数据（文件内容，表格信息）。

MVC通信是单向流：View 中用户交互会触发 Controller 控制器，Controller 处理用户输入改变 Model 数据层，数据层改变后会重新渲染 View 视图层。

用户可以与视图层交互，也可以通过URL等直接操作Controller（这是backbone的交互逻辑）

#### MVP 架构

Presenter 展现层，处理大部分的业务逻辑。View 视图层不会部署业务逻辑（根据Presenter被动渲染）。

View 和 Presenter 是双向通信，Presenter 和 Modal 是双向通信。View 和 Modal 不会直接通信。

#### MVVM 架构

将 MVP 架构中的 Presenter 改成 ViewModal。

特点：View 和 ModalView 双向绑定，View 更改后直接体现在 ModalView 中。

原始链接：http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html



### canvas

~~~html
<canvas id="can" width="500" height="500"></canvas>
~~~

~~~javascript
//常用方法
var can = document.getElementById('can');
var cvs = can.ContentText("2d");

cvs.moveTo(0,0);
cvs.lineTo(500,500);
cvs.stroke();
cvs.strokeWidth = 5;
cvs.lineStyle = "red";
cvs.closePath();
cvs.clearPath();

cvs.fillStyle = "blue";
cvs.fill();

cvs.strokeRest(0,0,200,200);
cvs.fillRect(200,200,100,100);
cvs.clearRect(0,0,cvs.width,cvs.height);

lineCap: butt square round
lineJoin: miter bevel round

//虚线
cvs.setLineDash([x,y,z,p]);
cvs.getLineDash();
cvs.lineDashOffset = 2;
//偏移量

//绘制汉字
strokeText();描边文字
fillText();填充汉字
textAlign = "left/right/center";
textBaseline = "top/bottom/middle";
//垂直对齐方式
~~~



### flex 布局

flex布局中，怎样在一个container中放置nav栏？

1.在京东PC端项目中，nav部分以一个独立的div进行布局（nav栏隐藏动画）

2.在京东移动端项目中，百分比布局，nav部分也是单独的div进行布局（左右排布使用row-col布局）

3.在休闲帮PC端项目中，使用bootstrap框架中，有预定的nav组件（bootstrap中spa组件需要加快熟悉）

4.在微金所移动端项目中，使用bootstrap框架，也分成两个container进行开发。



### git

s1:配置 用户名/邮箱/软件界面：

	git config --global  user.name 'xxx'  
	git config --global user.email "xxx@qq.com"
	
	右键-options-looks 设置git外观和显示

s2:记录开发过程

初始化仓库——工作区——暂存区——持久区

S3 远程服务器交互

远程代码库（码云，github）

设置：注册

重要：SSH公钥-不同电脑设置不同的key

生成公钥：在bash中生成ssh公钥（具体命令网站上有）生成一个方框图案。将bash中产生的代码复制到码云中。

github 秘钥和公钥产生在我的文档下面.ssh文件夹中。

S4 忽略文件

.gitignore 文件不生效原因：git 中已经包含的文件存在缓存，需要删除这部分本地缓存文件。bash 清空缓存后，可以正常忽略文件。

```bash
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```

### 操作系统

1.进程：当一个程序暂停时，需要将其现场信息作为断点保存起来，以便以后能从断点处继续执行。这样，在多道程序系统中需要一块特殊区域保存断点。因此程序的概念已不能如实地反映程序执行时的特征，需要一个更准确地描述程序执行状态的术语，这就是进程。

进程：描述程序运行状态（程序进展的程度）。进程是具有一定独立功能的程序段关于一个数据集合的一次运行活动。 

**2.** 进程组成

**①** 程序块：由指令代码组成，代码必须是纯代码，即在运行期间不修改自身。

**②** 数据块：进程执行时所需数据和工作单元以及开辟的工作区。

**③** 进程控制块（PCB）：一个数据结构，其中包含描述和管理进程所需全部信息。如进程标识、进程所属用户标识、进程状态、调度参数、现场信息和程序地址等。创建进程时建立PCB，撤消进程时收PCB。PCB是进程存在的惟一标志。 

3.程序与进程的本质区别在于程序是静态的，进程是动态的。

- 程序是指令及执行指令时所需数据的集合，可以长期保存在存储介质上；
- 进程具有创建性、运行性和消亡性。
- 进程和程序不是一一对应关系，一个程序可以对应多个进程。

CLI and GUI——Command Line Interface  and Graphical user interface

命令行界面（CLI）没有图形用户界面（GUI）那么方便用户操作。因为，命令行界面的软件通常需要用户记忆操作的命令，但是，由于其本身的特点，命令行界面要较图形用户界面节约计算机系统的资源。在熟记命令的前提下，使用命令行界面往往要较使用图形用户界面的操作速度要快。所以，图形用户界面的操作系统中，都保留着可选的命令行界面。



### 阻止事件冒泡

stopImmediatePropagation函数和stopPropagation函数的区别

event.stopImmediatePropagation() 方法阻止剩下的事件处理程序被执行。该方法阻止事件在 DOM 树中向上冒泡。停止当前节点，和所有后续节点的事件处理程序的运行。

stopPropagation 会阻止事件向上层元素冒泡。如果同一个元素绑定了多个事件（addEventListener），那么不会阻止其他事件的执行。

stopImmediatePropagation() 会阻止同层级事件的冒泡。

```js
div.addEventListener("click" , function(){
  alert("第一次执行");
  stopImmediatePropagation();
} , true);

div.addEventListener("click" , function(){
  alert("第二次执行");
} , true); 

// 点击div，第二次执行不会触发
```



### bash 中批量创建操作文件

需要调用 bash 的 API（创建删除目录，创建删除文件，循环，操作中增加变量的写法）

~~~bash
#!/bin/bash
for a in {1..10}
do
	mkdir test$a
done
~~~

使用 for-do-done 完成循环（for循环的条件在外面，注意是两个点）删除文件无法回退，注意脚本执行



#### 软件设计的冗余和性能分析

- 数据结构的冗余：设计某个字段时，考虑可能扩容，例如单选改成多选，那么就需要从字符串改成数组字符串。如果早期设计中，就设计数组，就不需要考虑兼容早期的代码了。这个还是看需求：如果需求确定，不经常更改，那么就可以考虑性能为主。如果需求经常变化，那么需要考虑冗余。
- 服务器和硬件层面的冗余：如果主服务器或者主磁盘在某个情况下跑满或者故障，那么需要另一套服务器（或者另一个程序）目前开发的应用还不需要考虑多个系统处理冗余（因为 dev 挂了就修复，内存满了就重启线上服务器，不需要考虑完全不挂的情况）



### 11 大公司和小公司区别

强哥：大公司也有很多低学历的人，只要能力足够，不担心学历问题（学历可以的）；上手了其他端的代码都能写，不要担心写不了后端的代码；自己有时间有规划慢慢来，一定有规划，选择比努力更重要；如果去搜狗这样的公司，自己的能力还能实现，毕竟岩哥可以过去；移动端；有几个项目经验，然后技术面试过了；基础+具体的业务功能；今年形势不太好，暂时不动；先找好下家再离职；自己看零散的代码和教程，也不总结，不分类，效果不佳；



### 12 软件工程的方法论

| 名称             | 定义                                                         | 优点                                                         | 缺点                                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| BDD 行为驱动开发 | 确定功能后，直接编辑完成行为的代码                           | 面向行为，项目整体的框架明确，MVC 层划分明确，适合大型项目，适合没有案例的项目（自上而下） | 可能代码有问题，没有对应的测试文件，后期需要补充测试，考虑边界情况等 |
| TDD 测试驱动开发 | 确定功能，编写测试用例，完成只能实现测试的代码，完善程序     | 代码健壮性强，针对性强（例如leetcode刷题，或者lodash工具库函数），适合模块化开发代码（自下而上） | 代码完成后，项目整体框架规范可能不一致，没有从顶层处理数据结构。编写测试耗时长。 |
| 瀑布流开发       | 类似BDD，有明确的开发流程：用户调研-产品需求-设计草图-编写代码-测试-上线-反馈与后续维护 | 适合大团队的明确分工，确定所有功能是否需要再动手，避免过程中由于产品需求变动，造成的代码返工等。 | 自上而下的开发，可能后续到测试阶段才发现不足，需要前期大量的会议论证等，需要前期明确的文档和需求 |
| 敏捷开发         | 直接面对用户，用户提出什么需求，就直接开发（二八定律，先不管代码的细节和极少数用户的情况） | 小步快跑，产品开发较快；适应于自驱力较强的开发者，程序员可以根据用户需求或者自己的体验直接开发功能 | 对于自驱力不强的程序员，没有明确的需求，就很难规范化开发。如果团队成员较多，开发效率并没有那么高。 |

实际上，一个公司可能使用多种开发方法；不同的开发团队（国外开放的理念，国内严格的等级），不同的项目需求，不同的时间限制等等，会采用不同的开发方法。

某一个项目，或者某个开发阶段，也可能有不同的开发方法。

总之：BDD和TDD可以对比，瀑布流开发和敏捷开发可以对比。人多或者情况复杂，需要规范明确，严格定义需要做什么。人员较少，时间紧张，那就优先开发出可视化的结果。

https://www.zhihu.com/question/19645396

https://baike.baidu.com/item/%E6%95%8F%E6%8D%B7%E8%BD%AF%E4%BB%B6%E5%BC%80%E5%8F%91/7108658

### 10 表单长度设计

如果是一个 toC 的产品，设计一个调查问卷或者表单，表单项最好不要太长。如果一个表单需要用户填写消耗5分钟以上，大部分用户都会没有耐心。如果是必填的项，那么用户可能随便填写，这样调查就失去了正确性。

所以需要根据用户的水平，确定表单的长度和深度，尽量让用户做选择题，而不是让用户做填空题，而且这样更便于用户填写，便于最后数据分析整理等。

如果表单确实很长，那么可以尝试分页显示，然后顶部显示进度条，表示用户填写了多少表单项。

界面加载过程类似：尽量减少加载时间，时间小于3S，界面显示 loading 图标。加载时间超过 5秒，最好显示进度条。如果已经确定加载的框架，只是需要后台返回数据，那么可以先显示骨架屏。

具体参考：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html

![骨架屏](https://res.wx.qq.com/wxdoc/dist/assets/img/progressiveLoad.722964c8.gif)
