# **MySQL数据库系统（安装）**

前言：Apache HTTP Server 作为优秀的Web服务器软件，提供了面向用户的前端应用功能。而在实际的企业网站平台中，为了提供更丰富、更强大的Web应用功能，往往还需要有后台数据库、网页编程语言等多种角色的支持。

一、MySQL的编译安装

MySQL是一个真正的多线程、多用户的SQL数据库服务，凭借其高性能、高可靠和易于使用的特性，称为服务器领域中最受欢迎的开源数据库系统。在2008年以前，MySQL项目由MySQL AB公司进行开发、发布和支持，之后经历Sun公司收购MySQL AB公司，Oracle公司收购Sun公司的过程，目前MySQL项目由Oracle公司负责运营和维护。

为了确保MySQL数据库功能的完整性、可定制性，一般采用源码编译的方式安装MySQL数据库系统。MySQL 5.X 系列版本的使用最为广泛，该版本的稳定性、兼容性都不错，下面将以mysql-5.6.36.tar.gz为例。（源码包官网可以下载）

**1.准备工作**

1）为了避免发生端口冲突、程序冲突等现象，建议先查询MySQL软件的安装情况，确认没有使用RPM方式安装mysql-server、mysql软件包，否则建议将其卸载。

2）然后安装光盘自带的ncurses-devel包，ncurses是字符终端下屏幕控制的基本库。可能很多新开发的程序已经不再使用。假如要编译一些老的程序，还是会经常碰到，在TTY下登录主机上MySQL需要。如下图：

![img](https://t10.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=3780564582%2C343614640?w=640&h=79)

3）MySQL 5.X 系列版本需要cmake编译安装，所以先安装cmake包（从cmake官网可以下载源码包）。如下图：

![img](https://t10.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=3403508979%2C3556265257?w=566&h=91)

**2.创建运行用户**

为了加强数据库服务的权限控制，建议使用专门的运行用户，如mysql。此用户不需要登录到系统，可以不创建宿主文件夹。如下：

[root@localhost ~]# **groupadd mysql**

[root@localhost ~]# **useradd -M -s /sbin/nologin mysql -g mysql**

**3.解包、配置、编译并安装**

将下载的mysql源码包解压，并切换到源码目录。从MySQL 5.5 起，mysql源码安装开始使用cmake了，设置源码编译配置脚本.如下图：

![img](https://t11.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=1515575701%2C3491399035?w=640&h=185&s=4F42D41085384C2354ED25DA000010B1)

上图配置命令中，各选项的含义如下：

-DCMAKE_INSTALL_PREFIX：指定将MySQL数据库程序安装到某目录下。-DSYSCONFDIR：指定初始化参数文件目录。-DDEFAULT_CHARSET：指定默认使用的字符集编码，如：utf-8-DDEFAULT_COLLATION：指定默认使用的字符集校对规则，utf8_general_ci是适用于utf-8字符集的通用规则。-DWITH_EXTRA_CHARSETS：指定额外支持的其他字符集编码。配置项会根据实际环境而改变，并不是定死的，所以，当需要不同需求的时候可根据多方面查找，随机应变吧。

**4.安装后的其他调整**

1）对数据库目录进行权限设置，如下：

[root@localhost ~]# **chown -R mysql:mysql /usr/local/mysql**

2）建立配置文件

CentOS 7系统下默认支持MariaDB数据库，因此系统默认的/etc/my.cnf配置文件中是MariaDB的配置文件。而在MySQL源码目录中support-file文件夹下，提供了MySQL数据库默认的样本配置文件my-default.cnf文件，在启动MySQL数据库服务之前，需要先将原有的my.cnf文件替换为MySQL提供的配置文件内容。如下图：

![img](https://t11.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=2677853011%2C2307094119?w=640&h=262&s=4410CD309F807D4B40DDA0CE000080B2)

3）初始化数据库

为了能够正常使用MySQL数据库系统，应以运行用户mysql的身份执行初始化脚本mysql_install_db，指定数据存放目录等。如下图：

![img](https://t10.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=2106227343%2C2428697646?w=640&h=132&s=0C0A5430C566653214D0C5DA010080B2)

4)设置环境变量

为了方便在任何目录下使用mysql命令，需要在/etc/profile设置环境变量。（/etc/profile这个文件是每个用户登录时都会运行的环境变量设置）如下图：

![img](https://t10.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=1955072607%2C2972640395?w=640&h=105)

也可以用vim编辑，结果都一样。

**5.添加mysql为系统服务**

若希望添加mysqld系统服务，以便通过systemctl进行管理，可以直接使用源码包中提供的服务脚本。找到support-files文件夹下的mysql.server脚本文件，将其复制到/usr/local/mysql/bin/目录下，并改名为mysqld.sh，然后创建mysql系统服务的配置文件/usr/lib/systemd/system/mysqld.server,将其添加为mysqld系统服务。如下图：

![img](https://t12.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=1953862376%2C825964300?w=640&h=335&s=4D10C41295884D494854ECD30000C0B3)

这样，以后就可以使用systemctl工具来控制MySQL数据库服务了。若添加失败，可以使用“/usr/local/mysql/bin/mysqld.sh start/stop/restart”命令开启/关闭/重启数据库。结果都一样。

MySQL服务器默认通过TCP3306端口提供服务。通过编辑/etc/my.cnf配置文件中[mysqld]配置端的“port=3306”行，可以更改监听端口，后面我们在详细述说，还有如何使用数据库、如何对数据库用户授权等。

下面是我在做实验时的报错：

初始化报错，如下图：

![img](https://t10.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=1406495850%2C2212907859?w=640&h=77)

解决方法 ：安装autoconf库

输入命令

\#yum-y install autoconf //此包安装时会安装Data:Dumper模块，系统盘做yum源就可以，系统盘有

安装autoconf库，再运行就ok了

Autoconf简介：由Autoconf生成的配置脚本在运行的时候不需要用户的手工干预；通常它们甚至不需要 通过给出参数以确定系统的类型。相反，它们对软件包可能需要的各种特征进行独立 的测试。（在每个测试之前，它们打印一个单行的消息以说明它们正在进行的检测， 以使得用户不会因为等待脚本执行完毕而焦躁。）因此，它们在混合系统或者从各种 常见Unix变种定制而成的系统中工作的很好。没有必要维护文件以储存由各个Unix变种 、各个发行版本所支持的特征的列表。