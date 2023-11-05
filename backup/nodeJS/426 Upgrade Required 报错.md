# ERR! 426 Upgrade Required, when I interact with the npm registry

## 解决方法

更新 node 版本到 14.18.0 以上，可以参考：https://www.jianshu.com/p/e6d3f7110a60

然后升级 npm 的版本到最新

```bash
npm install -g npm@latest
npm config set registry https://registry.npmjs.org/
```

下面是详细的英文描述及原因

When I try to publish a new package to npm or try to logout, I get the following error message:

```
npm ERR! code E426
npm ERR! 426 Upgrade Required
```

原因：2021 年 10 月 4 日后，npm 网站和 npm registry 必须使用 TLS 安全套接层 1.2 版本，所以需要升级对应版本

> Beginning October 4, 2021, all connections to npm websites and the npm registry—including for package installation—must use TLS 1.2 or higher.

[Source](https://github.blog/2021-08-23-npm-registry-deprecating-tls-1-0-tls-1-1/)

What I did:

- upgrade Node (0) to its current recommended version: 14.18.0 LTS
- upgrade npm with `npm install -g npm@latest`

In my case, I had to manually set the registry to use https instead of http as well:

- `npm config set registry https://registry.npmjs.org/`

---

(0) When using nvm, that's what you need to do:

```
nvm install 14.18.0
nvm use 14.18.0
nvm alias default 14.18.0
```

## 参考链接

https://stackoverflow.com/questions/69448082/err-426-upgrade-required-when-i-interact-with-the-npm-registry
