# **MySQL 数据库系统（安装）**

前言：Apache HTTP Server 作为优秀的 Web 服务器软件，提供了面向用户的前端应用功能。而在实际的企业网站平台中，为了提供更丰富、更强大的 Web 应用功能，往往还需要有后台数据库、网页编程语言等多种角色的支持。

一、MySQL 的编译安装

MySQL 是一个真正的多线程、多用户的 SQL 数据库服务，凭借其高性能、高可靠和易于使用的特性，称为服务器领域中最受欢迎的开源数据库系统。在 2008 年以前，MySQL 项目由 MySQL AB 公司进行开发、发布和支持，之后经历 Sun 公司收购 MySQL AB 公司，Oracle 公司收购 Sun 公司的过程，目前 MySQL 项目由 Oracle 公司负责运营和维护。

为了确保 MySQL 数据库功能的完整性、可定制性，一般采用源码编译的方式安装 MySQL 数据库系统。MySQL 5.X 系列版本的使用最为广泛，该版本的稳定性、兼容性都不错，下面将以 mysql-5.6.36.tar.gz 为例。（源码包官网可以下载）

**1.准备工作**

1）为了避免发生端口冲突、程序冲突等现象，建议先查询 MySQL 软件的安装情况，确认没有使用 RPM 方式安装 mysql-server、mysql 软件包，否则建议将其卸载。

2）然后安装光盘自带的 ncurses-devel 包，ncurses 是字符终端下屏幕控制的基本库。可能很多新开发的程序已经不再使用。假如要编译一些老的程序，还是会经常碰到，在 TTY 下登录主机上 MySQL 需要。如下图：

![img](https://t10.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=3780564582%2C343614640?w=640&h=79)

3）MySQL 5.X 系列版本需要 cmake 编译安装，所以先安装 cmake 包（从 cmake 官网可以下载源码包）。如下图：

![img](https://t10.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=3403508979%2C3556265257?w=566&h=91)

**2.创建运行用户**

为了加强数据库服务的权限控制，建议使用专门的运行用户，如 mysql。此用户不需要登录到系统，可以不创建宿主文件夹。如下：

[root@localhost ~]# **groupadd mysql**

[root@localhost ~]# **useradd -M -s /sbin/nologin mysql -g mysql**

**3.解包、配置、编译并安装**

将下载的 mysql 源码包解压，并切换到源码目录。从 MySQL 5.5 起，mysql 源码安装开始使用 cmake 了，设置源码编译配置脚本.如下图：

![img](https://t11.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=1515575701%2C3491399035?w=640&h=185&s=4F42D41085384C2354ED25DA000010B1)

上图配置命令中，各选项的含义如下：

-DCMAKE_INSTALL_PREFIX：指定将 MySQL 数据库程序安装到某目录下。-DSYSCONFDIR：指定初始化参数文件目录。-DDEFAULT_CHARSET：指定默认使用的字符集编码，如：utf-8-DDEFAULT_COLLATION：指定默认使用的字符集校对规则，utf8_general_ci 是适用于 utf-8 字符集的通用规则。-DWITH_EXTRA_CHARSETS：指定额外支持的其他字符集编码。配置项会根据实际环境而改变，并不是定死的，所以，当需要不同需求的时候可根据多方面查找，随机应变吧。

**4.安装后的其他调整**

1）对数据库目录进行权限设置，如下：

[root@localhost ~]# **chown -R mysql:mysql /usr/local/mysql**

2）建立配置文件

CentOS 7 系统下默认支持 MariaDB 数据库，因此系统默认的/etc/my.cnf 配置文件中是 MariaDB 的配置文件。而在 MySQL 源码目录中 support-file 文件夹下，提供了 MySQL 数据库默认的样本配置文件 my-default.cnf 文件，在启动 MySQL 数据库服务之前，需要先将原有的 my.cnf 文件替换为 MySQL 提供的配置文件内容。如下图：

![img](https://t11.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=2677853011%2C2307094119?w=640&h=262&s=4410CD309F807D4B40DDA0CE000080B2)

3）初始化数据库

为了能够正常使用 MySQL 数据库系统，应以运行用户 mysql 的身份执行初始化脚本 mysql_install_db，指定数据存放目录等。如下图：

![img](https://t10.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=2106227343%2C2428697646?w=640&h=132&s=0C0A5430C566653214D0C5DA010080B2)

4)设置环境变量

为了方便在任何目录下使用 mysql 命令，需要在/etc/profile 设置环境变量。（/etc/profile 这个文件是每个用户登录时都会运行的环境变量设置）如下图：

![img](https://t10.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=1955072607%2C2972640395?w=640&h=105)

也可以用 vim 编辑，结果都一样。

**5.添加 mysql 为系统服务**

若希望添加 mysqld 系统服务，以便通过 systemctl 进行管理，可以直接使用源码包中提供的服务脚本。找到 support-files 文件夹下的 mysql.server 脚本文件，将其复制到/usr/local/mysql/bin/目录下，并改名为 mysqld.sh，然后创建 mysql 系统服务的配置文件/usr/lib/systemd/system/mysqld.server,将其添加为 mysqld 系统服务。如下图：

![img](https://t12.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=1953862376%2C825964300?w=640&h=335&s=4D10C41295884D494854ECD30000C0B3)

这样，以后就可以使用 systemctl 工具来控制 MySQL 数据库服务了。若添加失败，可以使用“/usr/local/mysql/bin/mysqld.sh start/stop/restart”命令开启/关闭/重启数据库。结果都一样。

MySQL 服务器默认通过 TCP3306 端口提供服务。通过编辑/etc/my.cnf 配置文件中[mysqld]配置端的“port=3306”行，可以更改监听端口，后面我们在详细述说，还有如何使用数据库、如何对数据库用户授权等。

下面是我在做实验时的报错：

初始化报错，如下图：

![img](https://t10.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=1406495850%2C2212907859?w=640&h=77)

解决方法 ：安装 autoconf 库

输入命令

\#yum-y install autoconf //此包安装时会安装 Data:Dumper 模块，系统盘做 yum 源就可以，系统盘有

安装 autoconf 库，再运行就 ok 了

Autoconf 简介：由 Autoconf 生成的配置脚本在运行的时候不需要用户的手工干预；通常它们甚至不需要 通过给出参数以确定系统的类型。相反，它们对软件包可能需要的各种特征进行独立 的测试。（在每个测试之前，它们打印一个单行的消息以说明它们正在进行的检测， 以使得用户不会因为等待脚本执行完毕而焦躁。）因此，它们在混合系统或者从各种 常见 Unix 变种定制而成的系统中工作的很好。没有必要维护文件以储存由各个 Unix 变种 、各个发行版本所支持的特征的列表。
