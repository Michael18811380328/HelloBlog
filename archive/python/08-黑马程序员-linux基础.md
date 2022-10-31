# 黑马程序员

2021-08-30

## 第一天 Linux基本入门

操作系统：OS operation system。操作系统就是应用软件和底层硬件沟通的桥梁。应用软件不能直接在硬件上运行。操作系统允许多个应用同时运行。在Java虚拟机上可以运行单独的程序，不能运行多个程序（嵌入式开发）。

Unix 系统目录结构：树状结构。根目录是/。 /user/local/home

### 常用指令

输出文件

~~~bash
# > >> 表示把结果输出保存到文件中
# 第一个是覆盖原始文件，第二个是添加在原始文件后面
ls -al > readme.txt
ls -al >> warning.md
~~~

前后翻页

~~~bash
# 按住F或者B前翻页或者后翻页，forward-back 
f b 
~~~

查看编辑文件

~~~bash
cat a.md
more a.md
vi a.md
vim a.md
~~~

连接文件：cat 打开后将结果输出到TXT文件中

~~~bash
cat 1.txt 2.txt > xxx.txt
~~~

管道符

管道符 将前一个命令的结果存放在管道中，然后使用后一个命令处理。并不是所有的命令都可以使用管道符。管道符通常和查找过滤 grep 组合，将一个结果通过管道过滤并找到另一个指定的命令。

一行之内只能使用一个管道符。如果想要同时输入两个命令，可以使用分号隔开（很少这样写）。

~~~bash
ls -alh | cat
# 将 list 内容放到管道中，使用 cat 进行阅读（更方便，不需要另存为文件）。
~~~

tree 列出文件（显示当前文件夹下的文档结构）

-N 表示输出中文

~~~bash
tree -N -a
~~~

### 相对路径和绝对路径

写路径时，如果不知道文件夹下的文件，可以点击两次TAB就会显示全部的文件。

~~~bash
cd - # 回到上一次的目录中（只有一次）
cd ~ # 回到home目录中
cd / # 回到根目录中

mkdir a # create a folder
mkdir a/b/c -p # 如果没有a-b文件夹，直接直接创建多个层级下面的文件夹。
~~~

#### grep 查找文件内容

查找字符串，支持正则表达式

~~~bash
# 在xxx.txt 文件内部查找 test 字符串
grep 'test' xxx.txt

grep '^ntfs$' 1.txt
# 查询以这个字符串开头和结尾的内容
~~~

#### find 查找文件名

搜索文件：grep 是从文件内部进行检索；find是检索文件名

~~~bash
find ./ -name '*vim*'
# 查找 在./目录下 查找文件名 文件名中包含 vim

find ./ -size +10M -size -100M
# 在这个目录下面查找文件大于10M，小于100MB的文件
~~~

#### tar

打包解包

~~~bash
tar -cvf test.tar *.py
# 将当前的py文件打包成为 test.tar
tar -xvf test.tar
# 将 test.tar 解压缩在当前路径中
~~~

#### gz 压缩解压缩  重点

~~~bash
tar -zcvf test.tar.gz *.py
tar -zxvf test.tar.gz

tar -jcvf test.tar.bz2 *.py
tar -jxvf test.tar.bz2

zip test.zip *.py
unzip test.zip

# zip file is largest, so we use gz instead.
~~~

#### which

which ls 查看命令所在的原始路径（每一个命令对应一个文件）

#### 日期

cal 日历：calinder 显示日历 cal -y 2018 > data.txt

data 日期：显示当前的时间



### 系统相关命令

#### ps

process 查看进程信息 把进程显示一次

~~~bash
ps -aux 
# all process
~~~

#### top 

将进程实时显示在编辑器中

#### htop

top 加强版本

#### kill

消灭进程 kiss  -9 9822(PIN) 强制杀死

shutdown 关机

shutdown -h now 立刻关机

reboot 重启



df -h 整个硬盘的使用情况

du -h 当前文件夹大小

ifconfig 查看当前网络信息

ifconfig ens33 192.16.7.139 改网卡的ip地址

ping 可以查看局域网是否通畅 查看电脑的系统和虚拟机的网络是否连通

ifconfig | grep 172



和用户相关的命令；多用户，多任务操作系统 Ubuntu



##### SSH 

ssh username@172.16.7.139 远程登录另一台电脑:用户名@ip地址

这样可以在宿主机上操作虚拟机的内容 之后输入另一台电脑的密码就行。如果公司的服务器坏了，可以远程连接服务器进行修理。



sudo useradd newadmin -m 

创建一个账户和对应的一个文件夹（用户名和文件名相同）

sudo passwd newadmin 更改/设置某个用户的密码



sudo -s 以超级管理员权限登录 

sudo ifconfig ... 在原始账户中使用超级管理员权限登录

创建用户时，默认会创建一个群组。这个群组的文件对于外部的使用者权限不同（只读、修改等）

~~~bash
sudo groupadd YYY
sudo groupdel YYY
~~~

cat /etc/group 可以查看群组， 或者 groupmod 多点几次tab就可以查看所有群组信息。 

不同用户的创建和切换，管理员的切换 sudo -s。

给某个群组添加用户（了解）

sudo usermod -a -G 群组名 用户名 (usermodify) 默认创建的成员没有 sudo 的群组，所以没有sudo的权限。创建后需要将这个新的成员添加到sudo群组中，这样就可以使用sudo的权限去管理文件。

~~~bash
sudo usermod -a -G adm Michael
sudo usermod -a -G sudo Michael
# 将用户添加到sudo和adm群组中
~~~

##### 修改文件的权限

ls 可以查看文件的权限（十位）：1+3+3+3 文件和文件夹具有不同的权限

~~~bash
- rw- rw- r--
# 文件 文件owner权限 同组成员权限 其他用户权限

d rwx rwx r--
# 文件夹 directiry

r 读
w 写
x 可执行（程序）
~~~

这里的用户分为三类（user group others）

chmod u=rwx 2.py

chmod u=r, g=r,o=r 1.py

不同权限可以使用不同的数字表示 chmod 137 2.py 就是改变不同权限成员的读写权限。（可执行x=1， 读 r=4, 写w=2）表示拥有者可以1（执行文件），群组成员可以3（可执行，可写），其他人可以7（可读可写可执行）。

##### VIM 编辑器常用命令

在命令模式下

~~~bash
yy 复制
4yy 复制当前行到下面第四行的内容
dd 删除
2dd 删除到下面两行的内容（剪切=删除）
d0 行首到当前光标
D 剪切光标后面这一行的内容
p 粘贴
i 光标前面插入（I 在行首插入）
a 光标后面加入（A 在行末尾插入）
o 新建一行 （O 在上一行新建一行）
hjkl 表示四个方向键（和上下左右一样）一般用户jk上下翻页
HML（head middle last）光标跳转到当前的屏幕的上边，中间，下面
Ctrl + F 向下翻1页 front
Ctrl + B 想上翻1页 before
20G 到20行代码
1G 到开头
G 到结尾
u 撤销
Ctrl + R 反撤销
~~~



## ubuntu 下载软件

1. 修改国内镜像配置

ubuntu 默认下载的是官网的信息，不是清华大学的镜像站下载地址（更新源、镜像源）。

先备份之前的文件

~~~bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup
~~~

首先设置Ubuntu的更新地址（默认从美国下载软件比较慢），阿里网易清华163都可以设置镜像源。

~~~bash
vi /etc/apt/sources.list
# 编辑下载源配置
sudo apt-get update
# 开始更新源（网速，大约40MB）

sudo apt-get install XXX软件
# 大部分软件都可以找到

# 安装 sl 软件，小火车软件
sudo apt-get install sl

sudo apt-get source package

sudo apt-get clean && sudo apt-get autoclean
# 清理不用的安装包
~~~

镜像源需要对应版本 16.04 LTS

清华大学镜像源
https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/

Ubuntu 的软件源配置文件是 /etc/apt/sources.list。将系统自带的该文件做个备份，将该文件替换为下面内容，即可使用 TUNA 的软件源镜像

查看 /proc/version 查看Ubuntu版本号，选择合适的版本号进行更改

~~~bash
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-security main restricted universe multiverse
~~~

### 常见服务器

ftp 文件传输协议服务器，可以便捷的从本机向虚拟机传输文件。安装 file-zilla 软件。
Samba 文件下载协同编辑

在Linux编译运行C语言
编写 c 语言文件，gcc 编译C语言，执行out文件，即可在终端中执行C程序。
