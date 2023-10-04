# webpack如何设置devServer启动项目为https协议

最近使用另一个第三方库 @zxing/library 需要 https 开发环境才能使用，默认 webpack-dev-server 开启的是 http 协议，所以需要改一下配置，才能调试这个功能。

如果不清楚 http 和 https 的关系，可以先查一下其他资料。

## 1、改动 webpack 配置

很简单，我们只需要改webpack的devServer的其中一项配置，即可实现启动项目的时候，默认是https协议

~~~
devServer: {
	host: '0.0.0.0',
	port: 8080,
	https: true, // 设置默认使用 https
}
~~~

如果上面的更改后无效，那么继续调整环境变量

## 2、更改环境变量

~~~bash
npm i cross-env -D
~~~

更改启动脚本

~~~diff
- "start": "node scripts/start.js",
+ "start-https": "cross-env HTTPS=true REACT_APP_ENV=development node scripts/start.js"
~~~

## 3、解决浏览器安全链接报错

如果我们重新启动 webpack-dev-server 后，打开谷歌浏览器，默认会提示如下报错

~~~
您的连接不是私密连接 攻击者可能会试图从 localhost 窃取您的信息（例如：密码、通讯内容或信用卡信息）。了解详情 NET::ERR_CERT_INVALID
~~~

我们可以参考这里的方案，让谷歌浏览器不报错 https://blog.csdn.net/m15345704381/article/details/130760324 或者我本地开另一个浏览器，不会提示安全问题，也可以解决这个问题。

## 参考资料

https://blog.csdn.net/dclnet/article/details/96316401

https://blog.csdn.net/Boale_H/article/details/109264808