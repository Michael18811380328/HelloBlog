# Shadowsocks 的用法

Shadowsocks 简称 SS，是轻量代理应用服务端。在 VPS 上搭建 SS 服务端，可支持在 android、iPhone、window、macos 多平台上使用。

Linux 环境安装客户端

```bash
$ sudo pip install shadowsocks
```

启动客户端。

```bash
$ sslocal -s server_ip -p server_port  -l 1080 -k password -t 600 -m aes-256-cfb
# 或者
$ sslocal -s ip  -p  port -k "password"
# 或者
$ sslocal -c /etc/shadowsocks/config.json
```

上面代码中，-s 表示服务 IP, -p 指的是服务端的端口，-l 是本地端口默认是 1080（可以替换成任何端口号，只需保证端口不冲突）, -k 是密码（要加""）, -t 超时默认 300,-m 是加密方法默认 aes-256-cfb，

客户端配置项。

- 服务器：填写 服务器 IP 地址或域名
- 远程端口： 填写 服务器端口
- 本地端口：1080
- 密码： 填写密码
- 加密方法：选择一种加密方法

Android 使用方法：在 Google Play 里搜索“影梭”或者“ShadowSocks”安装。

window 客户端使用开源项目 shadowsocks-r。
