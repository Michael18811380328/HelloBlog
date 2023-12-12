# Linux 如何搭建 Apache 网站服务

**前言：**在 Internet 网络环境中，Web 服务无疑是最为流行的应用系统。有了 Web 站点，企业可以充分展示自己的产品、宣传自己的企业形象等等。Web 站点还可以提供与客户交流、电子商务交易平台等丰富的网络应用。接下来让我们一起来了解著名的 Web 网站服务——“Apache HTTP Server”的安装及 httpd 服务的基本配置。

**一、关于 Apache**

Apache 是广泛应用的 Web 应用系统之一，是开源软件项目的杰出代表，基于标准的 HTTP 网络协议提供网页浏览服务，在 Web 服务器领域中长期保持着超过半数的份额。Apache 服务器可以运行在 Linux、UNIX、Windows 等多种操作系统平台。

**1.Apache 的起源**

源于“A Patchy Server”，著名的开源 Web 服务软件 1995 年时，发布 Apache 服务程序的 1.0 版本其正式名称是“httpd”，一般 Apache 或 httpd，均指 Apache HTTP Server 由 Apache 软件基金会（ASF，Apache Software Foundation）负责管理和维护 AFS 的官方站点：http://httpd.apache.org/**2.Apache的主要特点**

开放源代码、跨平台应用支持多种网页编程语言模块化设计 、运行稳定、良好的安全性**3.Apache 的主要版本**

Apache 服务器目前包括 1.X 和 2.X 两个版本，并且对其分别进行维护。两个版本具有一定的差异，也具有各自的特性。

1.X 目前最高版本是 1.3，运行稳定

向下兼容性较好，但缺乏一些较新的功能

2.X 目前最高版本是 2.4

具有更多的功能特性

与 1.X 相比，配置管理风格存在较大差异

**二、安装 Apache（httpd）服务器**

Httpd 服务器的安装可以选用 RPM 包安装、源码编译安装两种方式，RPM 包安装相对比较简单、快速，但是在功能上存在一定的局限性，在实际的生产环境中，使用源码编译安装的方式要更加普遍。

**编译安装的优点：**

具有较大的自由度，功能可定制可及时获得最新的软件版本普遍适用于大多数 Linux 版本，便于移植使用**获得 Apache 服务器的源码包**

参考地址：http://httpd.apache.org/download.cgi（官网自己下载）我的云盘链接：https://pan.baidu.com/s/1ICTiuzWXqo-qbX2ipRXIdw提取码：a4cz复制链接并打开，输入提取码就可下载

**编译安装 httpd 服务器操作步骤：（如下图）**

![img](https://t10.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=2437490988%2C2504879088?w=640&h=426&s=F8211F76DE8A454B4063EDF90300903B)

**1.准备工作**

为避免发生端口冲突、程序冲突等现象，建议先卸载使用 RPM 方式安装的 httpd

查看是否安装：rpm -q httpd 卸载：rpm -e httpd --nodepsApache 的配置及运行需要 apr、pcre 等软件包的支持，因此需要先安装这些软件包，以便提供相应的库和头文件，确保 Apache 的安装顺利，我们称这些包为前提包，这些前提包在系统光盘中都有，所以我们可以采用 yum 或 RPM 安装。

Yum 安装：如果有网络直接安装，如果没有网络可以先挂载系统光盘，然后搭建一个本地 yum 仓库安装。如下图：

![img](https://t10.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=1677690453%2C1806088736?w=640&h=376&s=4D0A5430110E514D4E7501DA0000C0B1)

RPM 安装：挂载系统光盘，进入系统光盘挂载目录下的 Packages 目录，然后分别进行安装。如下图：

![img](https://t11.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=1857611011%2C2173728048?w=640&h=280&s=441A5430959949CA0E452CDA000080B2)

**2.源码编译安装**（前面有文章分享过源码安装的详细过程的，如果想了解的话可以在我的主页查找）

源码编译安装 httpd 服务的过程主要包含解包、配置、编译及安装。

**1）解包**（如下图）

将 httpd 源码包解压并释放到/usr/src 目录下，然后切换到解压后的源码目录（/usr/src/httpd-2.4.25）中。

![img](https://t11.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=4003019812%2C1280732440?w=640&h=228&s=C452C4389F714C034A7508D20000C0B2)

**2）配置**（如下图）

![img](https://t12.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=1566362933%2C1734355784?w=640&h=290&s=4452C43A9BC8454902D889DE0000C0B2)

根据服务器的实际应用需要，可以灵活设置不同的定制选项，如指定安装路径、启用字符集支持等。

上图所示配置中，各选项的含义如下：

--prefix：指定安装目录

--enable-so：启用动态加载模块支持，使 httpd 具备进一步扩展功能的能力

--enable-rewrite：启用网页地址重写功能，用于网站优化及目录迁移维护

--enable-charset-lite：启动字符集支持，以便支持使用各种字符集编码的网页

--enable-cgi：启用 CGI（Common Gateway Interface，公用网络接口）脚本程序支持，便于扩展网站的应用访问能力

**3）编译并安装**（如下图）

![img](https://t10.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=2459550618%2C1177264087?w=640&h=260&s=4018443093C979434E5D88D2000050B0)

**3.确认安装结果**

由于指定的安装目录为/usr/local/httpd，因此 httpd 服务的各种程序、模块、文件等都将复制到此目录下。（如下图）

![img](https://t10.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=2288736708%2C2330171639?w=640&h=152&s=C41A443AC5205D225A7D05DB000010B2)

如上图所示，主要目录的用途如下：

/usr/local/httpd/bin：存放 httpd 服务的各种执行程序文件，包括主程序 httpd、服务控制工具 apachectl 等工具/usr/local/httpd/cgi-bin：存放各种 CGI 程序文件/usr/local/httpd/logs：存放 httpd 服务的日志文件/usr/local/httpd/conf：存放 httpd 服务的各种配置文件，包括主配置文件 httpd.conf、增强配置子目录 extra 等/usr/local/httpd/htdocs：存放网页文档，包括默认首页文件 index.html 等/usr/local/httpd/modules：存放 httpd 服务的各种模块文件**4.优化执行路径**

通过源码编译安装的 httpd 服务，程序路径并不在默认的搜索路径中，为了使该服务在使用时更方便，可以为相关程序添加符号链接。这样当执行“httpd -v”命令（产看程序版本）是，就相当于执行“/usr/local/httpd/bin/httpd -v”。如下图：

![img](https://t10.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=157524408%2C200337907?w=640&h=131&s=C918C41A4D666F200CF564DA000080B2)

**5.启动服务**

由于是源码包编译安装，所以我们暂时不能用 systemctl 工具管理 httpd 服务（怎么添加 httpd 为系统服务，下个文档我们再一起了解），但现在我们可以使用 apachectl 工具来控制 httpd 服务。如下图：

![img](https://t12.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=3630112976%2C2428873486?w=640&h=220&s=5550CD3A9BE04C0316E9BDDB0100D0B1)

注：当启动或者关闭 httpd 服务时，提示的内容并不是报错，是因为我们还没有改配置文件中 Web 站点的完整主机名，它可以说是一个警告或者提示内容，可以忽略。

**6.测试**

在浏览器中，通过 IP 地址访问 httpd 服务器，将可以看到 Web 站点的页面内容。若使用的是 httpd 服务默认的首页，则页面会提示“It works”。如下图：

![img](https://t10.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=695322111%2C1586792313?w=640&h=160&s=459A5C32C9F058030EDCA0DE000090B1)

![img](https://t10.baidu.com/it/app=49&f=JPEG&fm=173&fmt=auto&u=3714080646%2C1515168799?w=640&h=293&s=18287532092B41200A55B0CB0000C0B2)

可以看到，httpd 服务器已经正常启动了。

关于 httpd 服务器的搭建，还有很多很多知识点需要了解，如：如何添加 httpd 为系统服务、如何修改 httpd 服务的配置文件、如何部署网页文档（不使用默认文档）、如何构建虚拟 Web 主机等等，以上只是一个简单的搭建，由于文档太长，关于 httpd 的其他知识点我们将分开来了解，这只是第一步。
