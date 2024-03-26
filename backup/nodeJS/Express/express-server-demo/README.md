# backend-demo

express node server

## 服务端数据库配置项

在配置文件路径下，添加相关配置项（dtable_web_service_url 是 dtable web 启动的 url，注意端口号）

```config
{
  "host": "db",
  "user": "root",
  "password": "db_dev",
  "database": "",
  "port": 3306,
  "connection_limit": 10,
  "private_key": "M@O8VWUb81YvmtWLHGB2I_V7di5-@0p(MF*GrE!sIws23F$C",
  "dtable_web_service_url": "http://127.0.0.1:8000/"
}
```

## 发布并启动项目

1. `git pull origin master` 获取最新分支
2. `npm run build` 打包项目
3. `export DTABLE_SERVER_CONFIG='**/**.json' && node dist/src/index.js` 启动 server 服务

## 测试本地 api 接口

1. 在根目录下创建 config 文件夹
2. 在 config 文件夹下创建 config.json 文件，添加配置如下

```
{
  "host": "127.0.0.1",
  "user": "root",
  "password": "db_dev",
  "database": "dtable",
  "port": 3306,
  "private_key": "M@O8VWUb81YvmtWLHGB2I_V7di5-@0p(MF*GrE!sIws23F",
  "dtable_web_service_url": "http://127.0.0.1:8000/",
  "redis_host": "redis",
  "redis_port": 6379,
  "redis_password": ""
}
```

3. 运行 `npm run test-api`
