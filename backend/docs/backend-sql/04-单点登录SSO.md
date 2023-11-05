# 单点登录（SSO）简介

2021-11-03

原始链接：https://www.jianshu.com/p/75edcc05acfd

Michael 笔记：

1、一个系统登录流程：用户进入系统——未登录——跳转登录界面——用户名和密码发送——服务器端验证后，设置一个 cookie 发送到浏览器，设置一个 session 存放在服务器——用户再次请求（带上 cookie）——服务器验证 cookie 和 session 匹配后，就可以进行业务了。

2、多个系统登录：如果一个大公司有很多系统，a.seafile.com, b.seafile.com,c.seafile.com。这些系统都需要登录，如果用户在不同系统间登录需要多次输入密码，用户体验很不好。所以使用 SSO (single sign on) 单点登录实现。

3、相同域名，不同子域名下的单点登录：在浏览器端，根据同源策略，不同子域名的 cookie 不能共享。所以设置 SSO 的域名为根域名。SSO 登录验证后，子域名可以访问根域名的 cookie，即可完成校验。在服务器端，可以设置多个子域名 session 共享（Spring-session）

4、不同域名下的单点登录：CAS 流程：用户登录子系统时未登录，跳转到 SSO 登录界面，成功登录后，SSO 生成一个 ST （service ticket ）。用户登录不同的域名时，都会跳转到 SSO，然后 SSO 带着 ST 返回到不同的子域名，子域名中发出请求验证 ST 的正确性（防止篡改请求）。验证通过后即可完成不同的业务。

# 背景

在企业发展初期，企业使用的系统很少，通常一个或者两个，每个系统都有自己的登录模块，运营人员每天用自己的账号登录，很方便。

但随着企业的发展，用到的系统随之增多，运营人员在操作不同的系统时，需要多次登录，而且每个系统的账号都不一样，这对于运营人员

来说，很不方便。于是，就想到是不是可以在一个系统登录，其他系统就不用登录了呢？这就是单点登录要解决的问题。

单点登录英文全称 Single Sign On，简称就是 SSO。它的解释是：**在多个应用系统中，只需要登录一次，就可以访问其他相互信任的应用系统。**

![img](https://upload-images.jianshu.io/upload_images/12540413-48718192a6802ec2.png?imageMogr2/auto-orient/strip|imageView2/2/w/558/format/webp)

image

如图所示，图中有 4 个系统，分别是 Application1、Application2、Application3、和 SSO。Application1、Application2、Application3 没有登录模块，而 SSO 只有登录模块，没有其他的业务模块，当 Application1、Application2、Application3 需要登录时，将跳到 SSO 系统，SSO 系统完成登录，其他的应用系统也就随之登录了。这完全符合我们对单点登录（SSO）的定义。

# 技术实现

在说单点登录（SSO）的技术实现之前，我们先说一说普通的登录认证机制。

![img](https://upload-images.jianshu.io/upload_images/12540413-8cfaf1ba9956573f.png?imageMogr2/auto-orient/strip|imageView2/2/w/578/format/webp)

image

如上图所示，我们在浏览器（Browser）中访问一个应用，这个应用需要登录，我们填写完用户名和密码后，完成登录认证。这时，我们在这个用户的 session 中标记登录状态为 yes（已登录），同时在浏览器（Browser）中写入 Cookie，这个 Cookie 是这个用户的唯一标识。下次我们再访问这个应用的时候，请求中会带上这个 Cookie，服务端会根据这个 Cookie 找到对应的 session，通过 session 来判断这个用户是否登录。如果不做特殊配置，这个 Cookie 的名字叫做 jsessionid，值在服务端（server）是唯一的。

## 同域下的单点登录

一个企业一般情况下只有一个域名，通过二级域名区分不同的系统。比如我们有个域名叫做：a.com，同时有两个业务系统分别为：app1.a.com 和 app2.a.com。我们要做单点登录（SSO），需要一个登录系统，叫做：sso.a.com。

我们只要在 sso.a.com 登录，app1.a.com 和 app2.a.com 就也登录了。通过上面的登陆认证机制，我们可以知道，在 sso.a.com 中登录了，其实是在 sso.a.com 的服务端的 session 中记录了登录状态，同时在浏览器端（Browser）的 sso.a.com 下写入了 Cookie。那么我们怎么才能让 app1.a.com 和 app2.a.com 登录呢？这里有两个问题：

- Cookie 是不能跨域的，我们 Cookie 的 domain 属性是 sso.a.com，在给 app1.a.com 和 app2.a.com 发送请求是带不上的。
- sso、app1 和 app2 是不同的应用，它们的 session 存在自己的应用内，是不共享的。

![img](https://upload-images.jianshu.io/upload_images/12540413-ddff3256817e357b.png?imageMogr2/auto-orient/strip|imageView2/2/w/783/format/webp)

image

那么我们如何解决这两个问题呢？针对第一个问题，sso 登录以后，可以将 Cookie 的域设置为顶域，即.a.com，这样所有子域的系统都可以访问到顶域的 Cookie。**我们在设置 Cookie 时，只能设置顶域和自己的域，不能设置其他的域。比如：我们不能在自己的系统中给 baidu.com 的域设置 Cookie。**

Cookie 的问题解决了，我们再来看看 session 的问题。我们在 sso 系统登录了，这时再访问 app1，Cookie 也带到了 app1 的服务端（Server），app1 的服务端怎么找到这个 Cookie 对应的 Session 呢？这里就要把 3 个系统的 Session 共享，如图所示。共享 Session 的解决方案有很多，例如：Spring-Session。这样第 2 个问题也解决了。

同域下的单点登录就实现了，**但这还不是真正的单点登录。**

## 不同域下的单点登录

同域下的单点登录是巧用了 Cookie 顶域的特性。如果是不同域呢？不同域之间 Cookie 是不共享的，怎么办？

这里我们就要说一说 CAS 流程了，这个流程是单点登录的标准流程。

![img](https://upload-images.jianshu.io/upload_images/12540413-041b3228c5e865e8.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

cas_flow_diagram

上图是 CAS 官网上的标准流程，具体流程如下：

1. 用户访问 app 系统，app 系统是需要登录的，但用户现在没有登录。
2. 跳转到 CAS server，即 SSO 登录系统，**以后图中的 CAS Server 我们统一叫做 SSO 系统。** SSO 系统也没有登录，弹出用户登录页。
3. 用户填写用户名、密码，SSO 系统进行认证后，将登录状态写入 SSO 的 session，浏览器（Browser）中写入 SSO 域下的 Cookie。
4. SSO 系统登录完成后会生成一个 ST（Service Ticket），然后跳转到 app 系统，同时将 ST 作为参数传递给 app 系统。
5. app 系统拿到 ST 后，从后台向 SSO 发送请求，验证 ST 是否有效。
6. 验证通过后，app 系统将登录状态写入 session 并设置 app 域下的 Cookie。

至此，跨域单点登录就完成了。以后我们再访问 app 系统时，app 就是登录的。接下来，我们再看看访问 app2 系统时的流程。

1. 用户访问 app2 系统，app2 系统没有登录，跳转到 SSO。
2. 由于 SSO 已经登录了，不需要重新登录认证。
3. SSO 生成 ST，浏览器跳转到 app2 系统，并将 ST 作为参数传递给 app2。
4. app2 拿到 ST，后台访问 SSO，验证 ST 是否有效。
5. 验证成功后，app2 将登录状态写入 session，并在 app2 域下写入 Cookie。

这样，app2 系统不需要走登录流程，就已经是登录了。SSO，app 和 app2 在不同的域，它们之间的 session 不共享也是没问题的。

**有的同学问我，SSO 系统登录后，跳回原业务系统时，带了个参数 ST，业务系统还要拿 ST 再次访问 SSO 进行验证，觉得这个步骤有点多余。他想 SSO 登录认证通过后，通过回调地址将用户信息返回给原业务系统，原业务系统直接设置登录状态，这样流程简单，也完成了登录，不是很好吗？**

**其实这样问题时很严重的，如果我在 SSO 没有登录，而是直接在浏览器中敲入回调的地址，并带上伪造的用户信息，是不是业务系统也认为登录了呢？这是很可怕的。**

# 总结

单点登录（SSO）的所有流程都介绍完了，原理大家都清楚了。总结一下单点登录要做的事情：

- **单点登录（SSO 系统）是保障各业务系统的用户资源的安全 。**
- **各个业务系统获得的信息是，这个用户能不能访问我的资源。**
- **单点登录，资源都在各个业务系统这边，不在 SSO 那一方。 用户在给 SSO 服务器提供了用户名密码后，作为业务系统并不知道这件事。 SSO 随便给业务系统一个 ST，那么业务系统是不能确定这个 ST 是用户伪造的，还是真的有效，所以要拿着这个 ST 去 SSO 服务器再问一下，这个用户给我的 ST 是否有效，是有效的我才能让这个用户访问。**
