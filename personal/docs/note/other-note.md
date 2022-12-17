## 网络





#### 2 本地不同项目调试问题

- 本地浏览器支持跨域操作（后端服务和前端页面不在一个端口，但是需要请求登录）：更改本地浏览器配置。可以设置 webpack 支持代理，但是设置后无效，可能和 webpack 版本有关，所以直接使用命令行打开浏览器（增加参数打开）参考：https://blog.csdn.net/qq_41541368/article/details/104035074 扩展：直接写一个脚本，电脑开机后直接命令行执行，打开对应的程序，不需要手动双击每一个程序

~~~js
open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/seafile/workroom/chrome-config

open /Applications/Google\ Chrome.app && open /Applications/Typora.app 
~~~

- 如果本地调试两个前端项目，一个项目需要使用另一个项目打包后的文件，可以直接写一个脚本，然后复制这个打包后的文件到另一个文件夹下面（npm link 也可以实现，但是可能存在缓存问题等等），所以写了这个联调脚本。本地联调测试脚本

~~~js
"move": "npm run prepublishOnly && mv -f /Users/seafile/Desktop/code-seafile/dtable/es /Users/seafile/workroom/dev/dtable-dev/data/dev/dtable-web/frontend/node_modules/@seafile/dtable",
~~~



#### 3 本地调试 server 项目跨域问题

问题：本地开发 dtable-web 和 dtable-server 项目时，打开表格界面，127.0.0.1:5000 端口显示跨域。

思考：以往都不会出现跨域问题，近期没有改动配置。

解决过程：先查看 dtable-web 和 dtable-server 的日志（dtable-server 中显示编译错误）本质上：因为在 docker 外部环境执行 npm install，dtable-server 某些第三方依赖库使用C语言编译，没有编译到 docker 内部（即使安装其他第三方库，也会影响已有的这个特殊的库）。所以造成 server 无法编译，服务不正常。nginx 反向代理服务器已经处理了跨域，但是已有服务没起来，所以界面显示的是跨域（找不到对应的服务）。

最后解决：在 docker 内部删除 node_modules 然后重新 npm install 开启服务，正常使用。

总结：界面的报错不一定是真实的原因，需要查看日志。nginx 需要多了解。



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

django模板样式：在开发模式下，直接通过 import 可以导入 CSS 文件。在生产环境下，会把相互的依赖关系分别打包，然后Django后端模板中需要插入对应的JS和CSS文件。这个本地开发测试不出来。（本地环境下正常，在线环境下面不正常的情况）

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





## Bash

#### 1 ssh

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

tree 命令可以显示显示当前项目的结构，通过参数设置不同的效果；其他配置用到再查

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

#### 1 git cherry-pick 

问题原因：想把一个分支上的一个或者几个 commits 提交到另一个分支上面。比如把 1.5 分支上的后续修复 commit 提交到 master 分支上。但是不需要把全部的 1.5 分支的全部 commits 放在 master 上，可以使用这个命令。下面是操作过程

~~~bash
git fetch origin 1.5 && git checkout 1.5
git log
~~~

查看提交日志，然后找出某一个或者某几个 hash

~~~txt
commit d60da5d351f0c629ae3655afb9c07c38216a8be9
Author: Michael An <2331806369@qq.com>
Date:   Fri Feb 19 16:01:34 2021 +0800

    fix group no rows bug (#2150)
~~~

然后切换到master上面，进行 cherry-pick 摘樱桃

~~~bash
git checkout master
git cherry-pick d60da5d351f0c629ae3655afb9c07c38216a8be9 # 把这一个commit放到master
git cherry-pick A-hash B-hash # 把两个hash之间的全部Commits放到master分支
~~~

这样master上就有了1.5分支上的几个commit了。

参考：http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html

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





后面部分废弃笔记

### jquery 废弃笔记

1. DOM方法：

   html——获得（设置）对象的html

   text——获得（设置）对象的文本值

   empty——清空对象内容

   remove——移除这个对象

   A.append(B) 

   A.appendTo(B)

   A.prepend(B)

   A.prependTo(B)

   addClass-removeClass-toggleClass-hasClass

2. 改变样式：

   css（键值对，获得200px） width height(获得200) 增减类名

3. 动画：

   show-hide fadeIn-fadeOut slideUp-slideDown 

   animation(动画名称，等待时间，linear，回调函数)

   stop（停止当前动画）用于动画队列

4. 事件：

   on-简单事件 $('div').on('click',function(){回调函数})

   delegate-委托事件：事件触发器和执行者不同

5. 插件和扩展：

   bootstrap插件，zepto扩展


### ajax in jquery


~~~javascript
// 第一步，创建ajax对象
var ajax = new XMLHttpRequest();

// 第二步，选择方式（get-post）
open(method,url,async);

// 第三步：（post）设置请求头和请求数据
ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
send(string);

// 设置请求头，发送请求报文在send方法中使用（考点：post方法和get方法的区别：get方法在url中传输数据，post需要单独传递数据。post方法可以传输更多数据，传输特殊符号，传输账号密码。当服务器无缓存可以使用post方法。其他情况使用get方法更快捷简单。）responseText responseXML 响应报文（string或者XML响应数据）

// 第四步: 当请求成功后，获取请求结果
event.onreadytstatechange(res) = function(){
	if(status === 200 && readyState === 4){
		// callback function
		var text = res;
	}
}
~~~



传输的文件：文本 xml html json文件

优点：传统的ajax方法，在不同的浏览器操作不同。JQ进行很好的封装，可以兼容不同的浏览器。


01 load 方法：把请求到的数据直接放入对应元素内部

~~~javascript
$(selector).load(url,[data],[function(){
	callback function;]
});

url:必选参数，希望加载的url
data:可选参数，与请求一起发送的键值对
callback:可选回调函数

$("#conatiner").load("demo.txt");

demo.txt 中的内容是html代码（<p>Hello world</p>）

~~~

回调函数三个参数说明：responseTxt（请求结果） statusTxt（请求状态） xhr（XMLHttpRequest对象）

注意：在load方法中，不管请求是否成功，请求结束后都会执行回调函数。

~~~javascript
$("#button").click(function(){
	$("#div1").load("demo.txt",function(responseTxt,statusTxt,xhr){
		if(statusTxt == "success"){
			alert("external content load successfully!");
			//外部内容加载成功
		}
		if(statusTxt == "error"){
			alert("Error" + xhr.status + ":" + xhr.statusTxt);
			//报错信息：请求状态
		}
	});
});
~~~

02 ajax.get()方法

get方法可以返回缓存的数据；post方法不会返回缓存的数据，常用于连同请求一起发送数据。

~~~javascript
$("#button").click(function(){
	$.get("demo.php",function(data,status){
		alert("数据"+data+"/n状态"+data);
	});
});
<?php
	echo "this is some text in PHP";
?>
~~~
03 ajax.post()方法

~~~javascript
$("#button").click(function(){
	$.post("demo_post.php",
		{
			name:"Trump",
			age:50
		},
		function(data,status){
			alert("数据"+data);	
		}
	});
});

将数据（键值对）发送到php，php根据发送的数据进行返回，最后执行回调函数
~~~
~~~php
<?php
	$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
	$age = isset($_POST['age']) ? htmlspecialcharts($_POST['age']) : '';
	echo 'Dear' . $name;
	echo 'Your age is ' . $age;
?>
~~~

04 $.ajax()方法 该方法用于其他方法不能完成的请求

~~~javascript
$.ajax({键值对})
url:"demo.php",success:function(){回调函数},error:function(){},complete:function(){},data:{键值对},type:"GET",xhr 其他键值对共计20个，可以查询

~~~



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

#### s0:下载安装

	在git官网上进行下载和安装

#### s1:配置

用户名/邮箱/软件界面：

	git config --global  user.name 'Michael An'  
	
	git config --global user.email "xxx@qq.com"
	
	右键-options-looks 设置git外观和显示，

#### s2:记录开发过程

初始化仓库——工作区——暂存区——持久区

01 初始化仓库，git init 此时项目文件夹中出现.git文件夹（隐藏）存放版本库

02 在项目文件夹中创建文件，git statue 查看当前状态


03 git add

04 git commit -m 'test commit'


05 git log git log --oneline 一行内显示

06 clear 清空界面

07 git checkout 撤回错误代码 回退到缓存区或者工作区（撤回上一步文件操作）

08 git reset 回退到历史的某个版本

09 git diff 查看变化的地方

#### S3 远程服务器交互

远程代码库（码云，github）

设置：注册

重要：SSH公钥-不同电脑设置不同的key

生成公钥：在bash中生成ssh公钥（具体命令网站上有）生成一个方框图案。将bash中产生的代码复制到码云中。

git clone 粘贴代码 项目的代码就克隆到本地文件夹了
git push 将本地变化推送到服务器
git pull  将服务器变化更新到本地

码云：1822852997@qq.com

github 秘钥和公钥产生在我的文档下面.ssh文件夹中。

#### S4 忽略文件

.gitignore 文件不生效原因：git 中已经包含的文件存在缓存，需要删除这部分本地缓存文件。bash 清空缓存后，可以正常忽略文件。

```bash
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```


#### Bash 命令

```bash
ls > readme.txt
ls >> readme.txt

表示将这个命令输出的结果存储在一个文件中(如果没有就新建这个文件)，第一个表示直接覆盖原始文件，第二个表示在这个文件中追加内容。
```

可以直接对npm的运行日志进行输出。把代码中的warning进行输出，这样可以避免终端界面大量输出。

### 操作系统

1.进程：当一个程序暂停时，需要将其现场信息作为断点保存起来，以便以后能从断点处继续执行。这样，在多道程序系统中需要一块特殊区域保存断点。因此程序的概念已不能如实地反映程序执行时的特征，需要一个更准确地描述程序执行状态的术语，这就是进程。

进程：描述程序运行状态（程序进展的程度）。进程是具有一定独立功能的程序段关于一个数据集合的一次运行活动。 

**2.** 进程组成

**①** 程序块：由指令代码组成，代码必须是纯代码，即在运行期间不修改自身。

**②** 数据块：进程执行时所需数据和工作单元以及开辟的工作区。

**③** 进程控制块（**PCB**）：一个数据结构，其中包含描述和管理进程所需全部信息。如进程标识、进程所属用户标识、进程状态、调度参数、现场信息和程序地址等。创建进程时建立**PCB**，撤消进程时收**PCB**。**PCB**是进程存在的惟一标志。 

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



### 12 穷人思维

- 优先做长期的事情（例如健身、长期技能锻炼，避免做短视的事情）
- 磨刀不误砍柴工：爬另一座高山时必须先下山；磨刀期间可能收入减少，后续效果很好
- 稀缺性把握：每天的时间精力优先，优先做重要的事情，做饭刷剧等不做
- 摆脱传统环境的影响：家人为了省电不开空调；为了省钱不去医院
- 弹性原则：给自己留出空余时间，做自身发展的事情；给自己留出足够金钱，做需要提升的事情
- 上游思维：从本源解决问题，防患于未然，上游解决问题的成本最低。

