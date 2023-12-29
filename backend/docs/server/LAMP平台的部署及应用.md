# **LAMP 平台的部署及应用**

前言：LAMP 架构是目前成熟的企业网站应用模式之一，指的是协同工作的一整套系统和相关软件，能够提供动态 Web 站点服务及其应用开发环境。LAMP 是一个缩写词，具体包括 Linux 操作系统、Apache 网站服务、MySQL 数据库服务器、PHP（或 Perl、Python）网页编程语言。

**一、LAMP 概述**

**1.LAMP 平台的构成组件**

在 LAMP 平台的四个构成组件中，每个组件都承担着关键的作用，经过十几年的发展，各组件间的兼容性得到了不断的完善，协作能力和稳定性也不断增强，可以构建出非常优秀的 web 应用系统。

l **Linux**操作系统：作为 LAMP 架构的基础，提供用于支撑 web 站点的操作系统，能够与其他三个组件提供更好的稳定性、兼容性（AMP 组件也支持 Windows、UNIX 等操作系统）

l **Apache**网站服务器：作为 LAMP 架构的前端，是一款功能强大、稳定性好的 web 服务器程序，该服务器直接面向用户提供网站访问，发送网页、图片等文件内容。

l **MySQL**数据库服务器：作为 LAMP 架构的后端，是一款流行的开源关系数据库系统。在企业网站、业务系统等应用中，各种账户信息、产品信息、客户资料、业务数据等都可以存储到 MySQL 数据库，其他程序可以通过 SQL 语句来查询、更改这些信息。

l **PHP/Perl/Python**网页编程语言：作为三种开发动态网页的编程语言，负责解释动态网页文件，并提供 web 应用程序的开发和运行环境。其中，PHP 是一种被广泛应用的开放源代码的多用途脚本语言，它可以嵌入到 HTML 中，尤其适合于 web 应用的开发。

**2.LAMP 平台的应用优势**

构成 LAMP 平台的四个组件，每个组件都经历了数十年之久的企业应用的考验，各自都是同类软件中的佼佼者，从而成为典型的黄金搭档，其主要的优势体现在以下几个方面：

l **成本低廉：**各组件都是开放源代码的软件，可以自由获得和免费使用，在技术上和许可证方面没有太严格的限制，大大降低了企业的实施成本

l **可定制：**拥有大量的额外组件和可扩展功能的模块，能过满足大部分企业应用的定制要求，甚至可以自行开发、添加新功能

l **易于开发：**基于 LAMP 平台的动态网站中，页面代码简洁，与 HTML 标记语言的结合度非常好，即使是非专业的程序员也能够轻松读懂乃至修改网页代码

l **方便易用：**PHP、Perl 等属于解释性语言，开发的各种 web 程序不需要编译，方便进行移植使用。整套的网站项目程序，通常只要复制到网站目录中，就可以直接访问

l **安全和稳定：**得益于开源的优势，大量的程序员在关注并持续改进 LAMP 平台的各个组件，发现问题能够很快得到解决。LAMP 架构已经经历了数十年的长期验证，安全性、稳定性方面表现的也非常优秀

**3.LAMP 平台的安装顺序**

在构建 LAMP 平台时，各组件的安装顺序依次为：Linux、Apache、MySQL、PHP。其中 Apache 和 MySQL 的安装没有严格的顺序，而 PHP 环境的安装一般放到最后，负责沟通 web 服务器和数据库系统以协同工作。

**二、部署 LAMP 平台**

**1.搭建 Apache 网站服务环境**

详细见：Linux 如何搭建 Apache 网站服务（一）

**2.搭建 MySQL 数据库环境**

详细见：如何搭建 MySQL 数据库系统

**3.搭建 PHP 运行环境（这里重点讲述 PHP 的搭建）**

**PHP 概念：**

PHP 即 Hypertext Preprocessor（超文本预处理语言）的缩写，是一种服务器端的 HTML 嵌入式脚本语言。PHP 的语法混合了 C、Java、Perl 及部分自创的新语法，拥有更好的网页执行速度，更重要的是 PHP 支持绝大多数流行的数据库，在数据库的操作功能十分强大，而且能够支持 UNIX、Windows、Linux 等多种操作系统。

**PHP 环境的搭建：**

PHP 项目最初由 Rasums Lerdor 在 1994 年创建，1995 年发布第一个版本 PHP 1.0。下面是以稳定版源码包 php-5.5.38.tar.gz 为例进行安装，该版本可以从 PHP 官方站点下载。

**1）准备工作**

为了避免发生冲突等现象，如果存在 RPM 方式安装的 php，建议先将 RPM 安装的 PHP 及相关依赖包卸载，并安装前提包 zlib-devel 和 libxml2-devel 包。如下图：

![img](https://pics5.baidu.com/feed/9213b07eca8065384a7e212269f8d540ad348211.jpeg@f_auto?token=eb1e3dfec7d0db7947a5847461c30559&s=01B24C32858958E810D0D1CE000080B3)

**2）安装扩展工具库**

在实际企业应用中，一部分基于 PHP 开发的 web 应用系统会需要额外的扩展工具，如数据加密工具 libmcrypt、mhash、mcrypt 等。安装 PHP 软件包之前应先安装好这些扩展工具程序。

**a.安装 libmcrypt**

![img](https://pics6.baidu.com/feed/72f082025aafa40f84114b0f5541774b79f01933.jpeg@f_auto?token=54a313b8dc1133f33ce7d035edff853f)

**b.安装 mhash**

![img](https://pics2.baidu.com/feed/71cf3bc79f3df8dc008ec5d13334068f461028ed.jpeg@f_auto?token=82f7db9fe2a911315a24005f3e64a59c)

**c.安装 mcrypt**

![img](https://pics3.baidu.com/feed/63d0f703918fa0ece6898063dab22dea3d6ddb39.jpeg@f_auto?token=2d83b60daea63941ebb70b9a1006407c&s=19A85532CD34EC0154F50DDE0000B0B2)

**3）编译安装 PHP**

**a.解包**

将 PHP 源码包解压。如下图：

![img](https://pics0.baidu.com/feed/1f178a82b9014a902e9ec8f754524d16b21bee87.jpeg@f_auto?token=a3b63fbb0a81b8e6aaf4cbd3ecb8e85a)

**b.配置**

在定制 PHP 的配置项时，最关键的是要指定 httpd、mysqld 的安装路径，以便添加相关支持设置，使 LAMP 各组件协同工作；除此之外，还可以指定安装路径、启用多字节支持、加密扩展支持等。如下图：

![img](https://pics2.baidu.com/feed/4afbfbedab64034f8d85781952e60d350a551d0b.jpeg@f_auto?token=071ba98aa6b13ce3094f8c21d9f233cd&s=15805D32C5746C2044D141C20000A0B2)

上图配置命令中，各选项的含义如下：

l **--prefix：**指定将 PHP 程序安装到哪个目录下，如/usr/local/php5

l **--with-mcrypt：**加载数据加密等扩展工具支持

l **--with-apxs2：**设置 Apache HTTP Server 提供的 apxs 模块支持程序的文件位置

l **--with-mysql：**设置 MySQL 数据库服务程序的安装位置

l **--with-mysqli：**添加 mysqli 扩展支持

l **--with-config-file-path：**设置 PHP 的配置文件 php.ini 将要存放得位置

l **--enable-mbstring：**启用多字节字符串功能，以便支持中文等代码

**c.编译及安装**

![img](https://pics6.baidu.com/feed/94cad1c8a786c91757c44542341804cb3ac757ab.jpeg@f_auto?token=877718eff2208fab3d49c78680b8c24e)

编译的过程可能会需要较长时间，需要耐心等待，若期间未出现错误，那么 PHP 程序的安装过程就基本完成了。接下来需要做的是对 LAMP 组件环境进行适当的配置，并验证是否能够协同工作。

**三、设置 LAMP 组件环境**

设置 LAMP 组件环境，主要包括对 PHP 的配置文件 php.ini、Apache 的配置文件 httpd.conf 的调整。前者用来确定 PHP 的运行参数，后者用来加载 libphp5.so 模块，以便支持 PHP 网页。

**1.调整 PHP 的配置文件 php.ini**

**1）php.ini 的建立及基本设置**

安装好 PHP 软件包以后，服务器并不会自动创建 php.ini 配置文件，但在源码目录下提供了两个样例配置文件，分别对应于开发环境、生产环境。选择其中一个样例文件，并复制到 PHP 的配置文件目录/usr/local/php5 下，并改名为 php.ini。在 php.ini 配置文件中，以分号开头的内容表示注释信息。如下图：

![img](https://pics3.baidu.com/feed/b812c8fcc3cec3fd4582332e2bada03b869427d3.jpeg@f_auto?token=91519ea772f49a2781d0ce9ab9f3de39&s=3D225532C5E45D031E49B4CF000080B3)

通过修改 php.ini 文件中的配置内容，可以控制 PHP 网页的执行特性，如：是否允许用户上传文件、设置上传文件的大小、设置默认使用的字符集、加载额外的扩展模块等。如果没有特别的要求，**可以直接沿用默认的配置，不做任何更改。**如下图：

![img](https://pics3.baidu.com/feed/0d338744ebf81a4c154041312b0f145d242da686.jpeg@f_auto?token=e1dcd14efdc9dcb1a3eebc66779db26d&s=08A2E81283C070EA48750CCE0000E0B3)

**2）添加 ZendGuardLoader 优化模块**

该模块是 Zend 公司开发的，其目的是为了提高 PHP 程序的执行效率，优化页面加速。若需要加密 PHP 代码以限制未经授权的分发，还可以购买该公司的 ZendGuard 软件。

ZendGuardLoader 优化模块使用于 PHP5.3 到 PHP5.6 系列版本，该模块可以从 Zend 公司的官方站点下载。若使用 PHP5.2 系列版本，应改用较早的 ZendOptimizer。

**为 PHP 安装及添加 ZendGuardLoader 模块支持的过程如下：**

将下载的 ZendGuardLoader 包解压，并将源代码目录下的模块文件复制到 PHP 程序的模块文件夹。如下图：

![img](https://pics5.baidu.com/feed/50da81cb39dbb6fd7d92ec4df501df1c962b37bd.jpeg@f_auto?token=0454ba240ba337d7b4fde2a67f44c162&s=04B2CC32C5664D2048D129DE0000C0B2)

然后修改 php.ini 配置文件，添加加载及启用 ZendGuardLoader.so 模块的配置语句。如下图：

![img](https://pics3.baidu.com/feed/f11f3a292df5e0fe60119373a04540ac5edf7265.jpeg@f_auto?token=38d1d139c711e0b4ffa7cf550e87c7b1&s=0492EC32CD64DD030AD044D10000D0B2)

**2.httpd.conf 配置调整**

要使 httpd 服务器支持 PHP 页面解析功能，需要通过 LoadModule 配置项加载 PHP 程序的模块文件，并通过 AddType 配置项添加对“.php”类型网页文件的支持。除此之外，还应修改 DirectoryIndex 配置行，添加 index.php 配置项，以识别常见的 PHP 首页文件。如下图：

![img](https://pics3.baidu.com/feed/f3d3572c11dfa9ece28333399ff58307918fc11d.jpeg@f_auto?token=7188bb83fdc114e78e16062b1c034883&s=F092ED3A81E079031ED885CB0000A0B2)

**三、测试 LAMP 协同工作**

下面分别从 PHP 网页的解析、通过 PHP 页面访问 MySQL 数据库**两个方面进行测试。**

**1.测试 PHP 网页能否正确显示**

编写一个“.php”格式的测试网页文件，使用 PHP 内建的“phpinfo()”函数显示服务器的 PHP 环境信息，PHP 代码应包括在“<?php ...?>”标记之间。将测试网页文件放置到网站根目录下。如下图：

![img](https://pics7.baidu.com/feed/c2cec3fdfc039245ce8c91fe7bb1d0c67d1e252b.jpeg@f_auto?token=af2f8bd4a2d8685872bea68193b1c512&s=BC8A5D324D224D204A7504DB0000C0B2)

然后通过浏览器访问测试网页，通过域名或 ip 地址访问都可以。若能看到 PHP 程序的版本号、配置命令、运行变量等信息，则表示此 web 服务器可以正常显示 PHP 网页；**若还能看到 Zend 引擎相关信息，则表示 ZendGuardLoader 模块也已成功启用**。如下图：

![img](https://pics0.baidu.com/feed/562c11dfa9ec8a132635165f0a26e58ba0ecc008.jpeg@f_auto?token=bb30721a4af2a5fff7b5f121e4b03263&s=D3948B2838DED4C804307CD90200C0B0)

**2.测试 PHP 网页能否访问 MySQL 数据库**

编写一个测试网页文件 test.php，添加简单的数据库操作命令，用于验证与 MySQL 服务器的连接、查询等操作。其中，**“mysqli_connect()”函数用于连接 MySQL 数据库，需要指定目标主机地址，以及授权访问的用户、密码。**如下图：

![img](https://pics5.baidu.com/feed/4b90f603738da977b4d6ba7a4d748c1d8718e394.jpeg@f_auto?token=7578df19a6f31d78f842918e8c73efbf&s=F4924D32C7746C200854D5C20000E0B2)

通过浏览器访问测试网页，使用域名或 ip 地址访问都可以。若能看到成功连接的提示信息（如下图），则表示能够通过 PHP 网页访问 MySQL 数据库。当使用了错误的用户名、密码或因为“mysqli-connect()”函数未运行而导致的失败时，执行时将会报错。

![img](https://pics4.baidu.com/feed/f703738da9773912976dc335053cf21c377ae2c1.jpeg@f_auto?token=fa061630ba1fb3d11c3d071bcb51cc93&s=1DA87C320D2245200AD5A5DA0000C0B2)

下篇文档再分享 LAMP 架构应用实例。
