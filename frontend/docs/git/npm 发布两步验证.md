# npm 两步验证

### 问题

近期发布版本时，在 cli `npm login`登录后，输入正确的用户名和密码，提示需要一个 Enter one-time password from your authenticator app，无法发包。

在网页上操作，登录时也需要输入临时的验证码（one-time password），无法登录。

### 当前配置

本地或者 web 端没有开启配置两步验证

https://docs.npmjs.com/configuring-two-factor-authentication#removing-2fa-on-the-web

本地查看是否支持两步验证

~~~bash
npm profile disable-2fa
Two factor authentication not enabled.
~~~

官方建议开启两步验证，但是本地经常发布版本，不希望使用两步验证（太麻烦）。根据官方文档，cli 登录都需要一个两步验证（为了安全），不能直接跳过两步验证。

For your security, npm may require additional verification to allow you to log in to your account. If you do not have [two-factor authentication](https://docs.npmjs.com/configuring-two-factor-authentication) enabled, you may be asked to verify yourself with a one-time password sent to the email address configured for your account.

### 解决方法

1、在网页端登录，然后会发一个验证码到邮箱中（可能6位数字），使用验证码可以正常登录。详见文档：

https://docs.npmjs.com/receiving-a-one-time-password-over-email

2、登录后，找到设置界面，获取 token （选择读写的权限）

3、在项目根目录中，或者用户根目录中，配置一下 .npmrc 后面的是获取的 token

~~~bash
//registry.npmjs.org/:_authToken=npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
~~~

具体参考：https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow

4、切换到项目中，直接运行 `npm publish` 即可发布版本（发版本不需要登录）；再次发版本时，直接执行4。

注：也可以在发版本时，在环境变量中增加 token，可以试一下 `export xxxxx && npm run build && npm publish`

如果安装私有库的代码，执行 npm install 也是正常的

