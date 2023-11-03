## mysql 支持emoji表情储存

### 一、前言

有个 API 是评论相关，然后实际用户评论中包含表情，界面中无法显示 emoji 表情。

emoji 表情发送失败，原因是数据库不能存储emoji表情，需要修改mysql的配置，将字符类型修改为 utf8mb4。

### 二、原理
mysql的 utf-8 编码的一个字符最多3个字节，但是一个 emoji 表情为4个字节，所以utf-8不支持储存emoji表情，但是utf-8的超集utf8mb4一个字符最多能有4个字节，所以能够支持emoji的表情存储。

linux中mysql配置文件为my.cnf。
```
[root@iZmenZ ~]# whereis my.cnf
my: /etc/my.cnf
```

### 三、修改mysql的配置文件
找到/etc/mysql路径下有my.cnf文件，添加如下的配置：
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

然后重启mysql的服务：
```
[root@iZenZ ~]# service mysqld restart
Redirecting to /bin/systemctl restart mysqld.service
```

然后就OK
