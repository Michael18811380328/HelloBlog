# Network note

### 1 应用层网络协议

1. DHCP 动态主机配置协议：在计算机网络中，新加入的主机通过 DHCP 服务自动获取 IP 等配置信息。基于下层的 UDP 协议（不可靠连接）。获取地址阶段，租约过半阶段，租约到期阶段，在不同阶段发送不同的报文等。

2. DNS 域名系统：域名的原理，域名解析规则，根域名，顶级域名等划分。原理：主机和本地域名服务器使用递归方式解析，本地域名服务器和其他域名使用迭代方式解析。域名缓存存在过期时间，到期后，需要重新解析。不同域名不同情况下，本地域名服务器发出的请求次数。

3. FTP 是文件传输协议，存在两个链接，控制链接和数据链接。控制链接在会话阶段始终保持，主要沟通 FTP 的报文。数据链接只有在传输文件时，才进行链接，传输结束后，断开链接。FTP 用户可以设置文件的格式，以及存取文件的权限。WWW 之前，FTP 应用非常广。

详细的协议参考计算机网络课件。

### 2 常见的web攻击

- XSS：cross site scripting 跨站脚本攻击；有漏洞的网站运行攻击者的脚本命令。可以利用虚假表单获取个人信息。利用 JS 获取用户的cookie值。被害者在不知情的情况下，帮助攻击者发送恶意请求（显示伪造的文章或者图片，显示伪造的网页登录情况）。
	- 例子：被攻击的A网站中，通过URL传值，获取登录用户名。那么攻击者在URL中设置自己的攻击脚本，获取cookie等信息。`localhost:3000/?id=<script>alert('1')</script>` 进一步执行远程脚本 `localhost:3000/?id=<script src="http://www.baidu.com/index.js"></script>` 获取信息。
	- XSS 解决方法，避免把用户传递的变量，直接和 HTML 拼接，然后执行。解决：将用户的输入通过下面函数转换成合法的HTML，先创建文本节点，然后在获取内部HTML。然后把生成的HTML，使用 `<a href="://www.baidu.com"> + str + </a>` 包起来，这样就避免了XSS
	

~~~js
HTMLescape: function(html) {
  return document.createElement('div')
    .appendChild(document.createTextNode(html))
    .parentNode
    .innerHTML;
}
~~~

- SQL注入：用户在提交数据时（用户名密码），可能把非法的用户名（例如某一段SQL语句）提交到服务器。服务器在查找数据库时，`select * from db where username is XXX ` 把非法的SQL执行，造成数据损失等。避免方法：永远不要相信用户的输入；对用户的输入进行校验和转换；不要使用超级管理员权限执行某些操作等。
- CSRF
- 点击劫持
- OS注入
- 请求劫持
- DDOS

开课吧笔记有两节安全的课程，可以参考

#### 2 本地不同项目调试问题

- 本地浏览器支持跨域操作（后端服务和前端页面不在一个端口，但是需要请求登录）：更改本地浏览器配置。可以设置 webpack 支持代理，但是设置后无效，可能和 webpack 版本有关，所以直接使用命令行打开浏览器（增加参数打开）参考：https://blog.csdn.net/qq_41541368/article/details/104035074 扩展：直接写一个脚本，电脑开机后直接命令行执行，打开对应的程序，不需要手动双击每一个程序

~~~js
open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/seafile/workroom/chrome-config

open /Applications/Google\ Chrome.app && open /Applications/Typora.app 
~~~

- 如果本地调试两个前端项目，一个项目需要使用另一个项目打包后的文件，可以直接写一个脚本，然后复制这个打包后的文件到另一个文件夹下面（npm link 也可以实现，但是可能存在缓存问题等等），所以写了这个联调脚本。本地联调测试脚本

~~~js
"move": "npm run prepublishOnly && mv -f /dtable/es /Users/seafile/workroom/dev/dtable-/dtable-web/frontend/node_modules/@seafile/dtable",
~~~



#### 3 本地调试 server 项目跨域问题

问题：本地开发 dtable-web 和 dtable-server 项目时，打开表格界面，127.0.0.1:5000 端口显示跨域。

思考：以往都不会出现跨域问题，近期没有改动配置。

解决过程：先查看 dtable-web 和 dtable-server 的日志（dtable-server 中显示编译错误）本质上：因为在 docker 外部环境执行 npm install，dtable-server 某些第三方依赖库使用C语言编译，没有编译到 docker 内部（即使安装其他第三方库，也会影响已有的这个特殊的库）。所以造成 server 无法编译，服务不正常。nginx 反向代理服务器已经处理了跨域，但是已有服务没起来，所以界面显示的是跨域（找不到对应的服务）。

最后解决：在 docker 内部删除 node_modules 然后重新 npm install 开启服务，正常使用。

总结：界面的报错不一定是真实的原因，需要查看日志。nginx 需要多了解。





## 学会的

### SMTP 和 POP3 和 IMAP 的区别

相同点：这三个都是运行在邮件服务器的服务（例如QQ邮件服务器，163邮件服务器等）

SMTP 服务：处理发送邮件。如果发件人和收件人是同一个域（都是163自己的域），那么直接转；如果不是同一个域（163发给QQ），首先要进行 DNS 查询，然后找到 host 并发送。

POP3 和 IMAP ：处理接受邮件。POP3 比较旧，IMAP 较新。

POP3：本地读到邮件后，邮件从服务器上删除，邮件进行本地编辑。如果多个终端链接服务器有问题。

IMAP：本地读到邮件后，邮件不会从服务器上删除。

详情参考：https://www.zhihu.com/question/24605584

这个和前端关联不大，了解即可


### RestAPI 与 GraphQL

简单和同事分享了两种网络技术协议，REST API 和 GraphQL。

restAPI 是早期的协议。在网络请求中，url 中表示请求的资源名称，请求的方法对应数据库的增删改查操作（回想一下常见的四种请求方法，get post delete put 的特点，以及 head option 请求方法）。这样的好处是 URL 直接关注资源，不需要关注怎么操作资源，目前项目大部分使用这个协议。

GraphQL是新一代的协议。每一个请求都类似 POST 请求，前端把需要的参数通过 POST 类似 JSON 发给后端，然后后端根据需要的参数返回给前端（后端需要查询）。好处：URL固定的，不会频繁变化。很多资源可以在一个 Query 中获取，这样服务器并行请求压力较小。服务器无需返回不需要的字段（前端需要用户姓名，后端会查询一次数据库，把用户很多信息拿到并返回）。这个也有不足，需要设置很多的查询和错误处理（前端查询两个参数，一个出错，怎么返回；数据量较大，传输更加消耗时间——网络良好的情况下不需要考虑这个）。


### 区别：vps 云服务器 物理服务器

物理服务器：真实的服务器，用于大企业，可靠性比较高，需要专人维护。内部维护比较安全稳定（例如金融电力通信行业）。

vps: Virtual Private Server（虚拟私有服务器），一般架设在云端，有固定的带宽，个人博客可以搭建在这里。企业的网站不适宜搭建。

云服务器：是 vps 的加强版，带宽可变，国内主要是华为云，阿里云，国外是亚马逊。

### docker 和 K8S 的关系：docker and kubernetes

#### Docker

Docker 是轻量级的环境部署工具，相对传统虚拟机，占用资源少，可以提供若干个独立的环境部署不同的服务，架构是 image-container 从镜像创建不同的容器，然后在容器中执行操作，创建服务。不同容器共用底层硬件资源，数据层不互相影响。

![](https://cloud.seatable.cn/workspace/32/asset/37d9be94-36c7-4add-8e78-fdf8564d701b/images/auto-upload/image-1673947884286.jpeg)

![](https://cloud.seatable.cn/workspace/32/asset/37d9be94-36c7-4add-8e78-fdf8564d701b/images/auto-upload/image-1673947892816.jpeg)

docker 只适用于单机部署环境，对于集群部署服务，文件管理等需要下面的 k8s.

#### k8s

k8s 是一个集群环境-cluster，包括一个 Master 主节点和很多 Node 工作节点。

Master 主节点：负责调度管理不同的 Node 节点，提供了对外的接口 API，对内的控制器 Controller，Node 节点之间的调度，以及 etcd 存储系统。

Node 工作节点：每一个工作节点，运行了 Docker 创建容器的工具，创建了多个 POD 进程（独立的服务）还有其他的支持模块，例如 proxy 代理，日志模块，搜索模块等。

![](https://cloud.seatable.cn/workspace/32/asset/37d9be94-36c7-4add-8e78-fdf8564d701b/images/auto-upload/image-1673946428894.jpg)

![](https://cloud.seatable.cn/workspace/32/asset/37d9be94-36c7-4add-8e78-fdf8564d701b/images/auto-upload/image-1673946438393.jpg)

参考链接

<https://juejin.cn/post/6952331691524358174> 

<https://juejin.cn/post/6844903943051411469> 

<https://zhuanlan.zhihu.com/p/53260098> 


