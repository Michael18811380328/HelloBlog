# npm 两步验证

#### 问题

cli 登录后，输入正确的用户名和密码，还需要一个 Enter one-time password from your authenticator app

在网页上操作，也需要输入临时的验证码

#### 当前配置

本地或者web端没有配置两步验证（https://docs.npmjs.com/configuring-two-factor-authentication#removing-2fa-on-the-web）

~~~bash
npm profile disable-2fa
Two factor authentication not enabled.
~~~

For your security, npm may require additional verification to allow you to log in to your account. If you do not have [two-factor authentication](https://docs.npmjs.com/configuring-two-factor-authentication) enabled, you may be asked to verify yourself with a one-time password sent to the email address configured for your account.

https://docs.npmjs.com/receiving-a-one-time-password-over-email

根据文档，发布或者登录都需要一个两步验证（为了安全）。基本不能直接跳过两步验证，直接发布版本。

#### 解决方法

1、尝试每次登录都从邮箱获取验证码

2、本地使用 APP 发送验证码，详情参考这个文档

https://www.cnblogs.com/corleone113/p/12116334.html

这两个办法还没有尝试。目前就是这样。

官网上有 token，这个是基于两步验证后配置的，不确定能否使用 https://www.npmjs.cn/cli/token/







解决：在项目根目录中，或者全局用户的根目录中，配置一下 .npmrc 

~~~bash
//registry.npmjs.org/:_authToken=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
~~~

Npm token 在官网上获取

~~~js
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
~~~

具体参考：https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow

或者直接在环境变量中输入 export 你的 token && npm publish

注意：token 只需要设置一次；发布版本时，不需要登录，直接发布即可

