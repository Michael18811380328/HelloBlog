# Chrome 开发者工具简单使用

## 1.如何打开开发者工具

- 按 F12 调出/右键检查
- Window 快捷键 Ctrl+Shift+i；Mac option + command + i

## 2.开发者工具初步介绍

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824150514238-995100185.png)

chrome 开发者工具最常用的四个功能模块：元素（ELements）、控制台（Console）、源代码（Sources），网络（Network）。

- 元素（Elements）：用于查看或修改 HTML 元素的属性、CSS 属性、监听事件、断点等。css 可以即时修改，即时显示。大大方便了开发者调试页面
- 控制台（Console）：控制台一般用于执行一次性代码，查看 JavaScript 对象，查看调试日志信息或异常信息。还可以当作 Javascript API 查看用。例如我想查看 console 都有哪些方法和属性，我可以直接在 Console 中输入"console"并执行~
- 源代码（Sources）：该页面用于查看页面的 HTML 文件源代码、JavaScript 源代码、CSS 源代码，此外最重要的是可以调试 JavaScript 源代码，可以给 JS 代码添加断点等。
- 网络（Network）：网络页面主要用于查看 header 等与网络连接相关的信息。

### 2.1 元素（Elements）

- 查看元素的代码：点击左上角的箭头图标（或按快捷键 Ctrl+Shift+C）进入选择元素模式，然后从页面中选择需要查看的元素，然后可以在开发者工具元素（Elements）一栏中定位到该元素源代码的具体位置

- 查看元素的属性：定位到元素的源代码之后，可以从源代码中读出改元素的属性。如下图中的 class、src、width 等属性的值。

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824152125415-1903673792.png)

- 当然从源代码中读到的只是一部分显式声明的属性，要查看该元素的所有属性，可以在右边的侧栏中查看：

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824152251828-1165185317.png)

- 修改元素的代码与属性：点击元素，然查看右键菜单，可以看到 chrome 提供的可对元素进行的操作：包括编辑元素代码（Edit as HTML）、修改属性（Add attribute、Edit attribute）等。选择 Edit as HTML 选项时，元素进入编辑模式，可以对元素的代码进行任意的修改。当然，这个修改也仅对当前的页面渲染生效，不会修改服务器的源代码，故而这个功能也是作为调试页面效果而使用。

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824153106311-1814967738.png)

- 查看元素的 CSS 属性：在元素的右边栏中的 styles 页面可以查看该元素的 CSS 属性，这个页面展示该元素原始定义的 CSS 属性以及从父级元素继承的 CSS 属性。从这个页面还可以查到该元素的某个 CSS 特性来自于那个 CSS 文件，使编码调试时修改代码变得非常方便。

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824153409326-1077314215.png)

- 在 Styles 页旁边，有一个 Computed 页面，这个页面展示该元素经过计算之后的所有 CSS 属性，即最后浏览器渲染页面时使用的属性。属性的计算由浏览器自动进行，是浏览器渲染页面的一个必不可少的过程。

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824155224456-1531357156.png)

- 修改元素的 CSS 属性：在元素的 Styles 页面，可以对元素的 CSS 属性进行修改，甚至删除原有、添加新属性。不过，这些修改，仅对当前浏览器的页面展示生效，不会修改 CSS 源代码。所以在这里进行 CSS 属性的修改一般用来调整和完善元素的渲染效果。

- 给元素添加断点：在元素的右键菜单中选择断点选项（Break on…），选中之后，当元素被修改（通常是被 JS 代码修改）时，页面加载会暂停，然后可以查看该元素的属性。

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824155513070-1229108833.png)

- 元素断点添加之后，可以在右侧栏的 DOM Breakpoints 页面中看到，这个页面可以看到当前网页的所有元素断点。

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824155618812-1232552964.png)

- 查看元素的监听事件：元素的右边栏的 Event Listener 页面，可以查看到该元素的所有监听事件。在开发中，尤其是维护其他人的代码时，会出现不了解元素对应的监听事件，这个时候，可以在这个页面中找到。这个页面不仅能看到对应的事件函数，还可以定位该函数所在的 JS 文件以及在该文件中的具体位置（行数），大大提高开发维护的效率。

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824155758208-2045739706.png)

### 2.2 控制台（Console）

- 查看 JS 对象的及其属性：
  ![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824161404838-1024109695.png)

- 执行 JS 语句：
  ![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824161501401-1027526289.png)

- 查看控制台日志：当网页的 JS 代码中使用了 console.log()函数时，该函数输出的日志信息会在控制台中显示。日志信息一般在开发调试时启用，而当正式上线后，一般会将该函数去掉

### 2.3 源代码（Source）

- 查看文件：在源代码（Source）页面可以查看到当前网页的所有源文件。在左侧栏中可以看到源文件以树结构进行展示。 ![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824161840569-376035490.png)
- 添加断点：在源代码左边有行号，点击对应行的行号，就好给改行添加上一个断点（再次点击可删除断点）。右键点击断点，在弹出的菜单中选择 Edit breakpoint 可以给该断的添加中断条件。

​ ![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824161955443-2023920334.png)

- 中断调试：添加断点后，当 JS 代码运行到断点时会中断（对于添加了中断条件的断点在符合条件时中断），此时可以将光标放在变量上查看变量的

- 也可以在右边的侧栏上查看：

​ ![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824162231340-917833140.png)

- 在右侧变量上方，有继续运行、单步跳过等按钮，可以在当前断点后，逐行运行代码，或者直接让其继续运行。

​ _![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824162313728-98694350.png)_

### 2.4 网络（Network）

#### 基本功能

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824162657334-1762341005.png)

那我就按照从左到右的顺序来写啦~

- ![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824162719196-1156474310.png)：记录按钮 处于打开状态时会在此面板进行网络连接的信息记录，关闭后则不会记录。
- ![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824162746778-827981360.png)：清除按钮 清除当前的网络连接记录信息。（点击一下就能清空）
- ![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824162810119-979271078.png)：捕获截屏 记录页面加载过程中一些时间点的页面渲染情况，截图根据可视窗口截取，如下图所示。

_![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824162902773-1673653969.png)_

- ![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824162925039-1864034518.png)：过滤器 能够自定义筛选条件，找到自己想要资源信息，如下图所示。

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824162945960-300844444.png)

也可以是一些指定条件
指定条件有哪些？

domain：资源所在的域，即 url 中的域名部分。如 domain:api.github.com

has-response-header：资源是否存在响应头，无论其值是什么。如 has-response-header：Access-Control-Allow-Origin

is：当前时间点在执行的请求。当前可用值：running

larger-than：显示大于指定值大小规格的资源。单位是字节(B),但是 K(kB)和 M(MB)也是可以的~ 如 larger-than:150K

method：使用何种 HTTP 请求方式。如 GET

mime-type：也写作 content-type，是资源类型的标识符。如 text/html

scheme：协议规定。如 HTTPS

set-cookie-name：服务器设置的 cookies 名称

set-cookie-value：服务器设置的 cookies 的值

set-cookie-domain：服务器设置的 cookies 的域

status-code：HTTP 响应头的状态码

- ![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824163013483-1490909242.png)：显示详细信息

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824163054972-835147608.png)

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824163106773-288306886.png)

- ![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824163121256-394789081.png)：显示时间流

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824163145249-442278281.png)

能够根据时间，查看对应时间下 浏览器请求的资源信息

- ![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824163206011-209234690.png)：是否保留日志

  当选择保留日志，重新加载 url 当前界面时，之前请求显示的资源信息，会保留下来，不会清空的哟~

- ![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824163226893-1504363441.png)：是否进行缓存

  当打开开发者工具时生效，打开这个开关，则页面资源不会存入缓存，可以从 Status 栏的状态码看文件请求状态。

- ![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824163250374-973968006.png)：_设置模拟限速，如下图所示。_

  ![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824163305150-1712298288.png)

  设置限速可以模拟处于各种网络环境下的不同用户访问本页面的情况。

#### 主题内容

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824163318846-1163816291.png)

下列介绍中，前者为名词解释，后者为举例

- Name/Pat：资源名称以及 URL 路径 （main.css）

- Method：Http 请求方法 (GET 或者 POST)

- status/Text：Http 状态码/文字解释 （200，ok）

- Type ：请求资源的 MIME 类型，MIME 是 Multipurpose Internet Mail Extensions (html,css,js 等)

- Initiator：解释请求是怎么发起的，有四种可能的值

  ```
  1.Parser  ：请求是由页面的html解析时发送
  2.Redirect：请求是由页面重定向发送
  3.script  ：请求是由script脚本处理发送
  4.other   ：请求是由其他过程发送的，比如页面里的Link链接点击
  ```

- size/content：size 是响应头部和响应体结合的大小，content 是请求解码后的大小

#### 请求响应

点击某个具体请求后的界面，如下图所示：

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824163559022-7195183.png)

一共分为四个模块：

- Headers

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824163619221-788444025.png)

Header 面板列出资源的请求 url、HTTP 方法、响应状态码、请求头和响应头及它们各自的值、请求参数等等

- Preview：预览面板，用于资源的预览。

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824163633829-308751915.png)

- Response：响应信息面板包含资源还未进行格式处理的内容

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824163653214-199059264.png)

- Timing：资源请求的详细信息花费时间

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824163706487-68370069.png)

#### 右键菜单

对某请求右键，出现页面如下图所示。

![img](https://images2018.cnblogs.com/blog/1377691/201808/1377691-20180824163726896-210095204.png)

- Copy Request Headers：复制 HTTP 请求头到系统剪贴板
- Copy Response Headers：复制 HTTP 响应头到系统剪贴板
- Copy Response：复制 HTTP 响应内容到系统剪贴板
- Copy as
  cURL：将网络请求作为一个 curl 的命令字符复制到系统剪贴板(curl 是一种开源的命令行工具和库，用于配合 url 语法进行数据传输)
- Copy All as HAR：将网络请求记录信息以 HAR 格式复制到系统剪贴板(what is HAR file)
- Save as HAR with Content：将资源的所有的网络信息保存到 HAR 文件中(.har 文件)
- Clear Browser Cache：清除浏览器缓存
- Clear Browser Cookies：清除浏览器 cookies
- Open in Sources Panel：当前选中资源在 Sources 面板打开
- Open Link in New Tab：在新 tab 打开资源链接
- Copy Link Address：复制资源 url 到系统剪贴板
