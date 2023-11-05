## mysql 支持 emoji 表情储存

### 一、前言

有个 API 是评论相关，然后实际用户评论中包含表情，界面中无法显示 emoji 表情。

emoji 表情发送失败，原因是数据库不能存储 emoji 表情，需要修改 mysql 的配置，将字符类型修改为 utf8mb4。

### 二、原理

mysql 的 utf-8 编码的一个字符最多 3 个字节，但是一个 emoji 表情为 4 个字节，所以 utf-8 不支持储存 emoji 表情，但是 utf-8 的超集 utf8mb4 一个字符最多能有 4 个字节，所以能够支持 emoji 的表情存储。

linux 中 mysql 配置文件为 my.cnf。

```
[root@iZmenZ ~]# whereis my.cnf
my: /etc/my.cnf
```

### 三、修改 mysql 的配置文件

找到/etc/mysql 路径下有 my.cnf 文件，添加如下的配置：

```
[client]
default-character-set=utf8mb4

[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
init_connect='SET NAMES utf8mb4'

[mysql]
default-character-set=utf8mb4
```

然后重启 mysql 的服务：

```
[root@iZenZ ~]# service mysqld restart
Redirecting to /bin/systemctl restart mysqld.service
```

然后就 OK
