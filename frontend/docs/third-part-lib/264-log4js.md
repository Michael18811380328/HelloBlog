# 264 log4js

## 用途

nodeJS 日志输出工具

用于调试不同级别的日志（警告，日志，错误等）

## 可靠性

大量使用，可靠

## 官网链接

https://log4js-node.github.io/log4js-node/

https://www.npmjs.com/package/log4js

https://github.com/log4js-node/log4js-node

## 基本使用

```js
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug"; // default level is OFF - which means no logs at all.
logger.debug("Some debug messages");
```

## 其他

彩色控制台记录到 stdout 或 stderr
文件附加程序，可根据文件大小或日期进行可配置的日志滚动
SMTP 附加程序
GELF 附加程序
Loggly appender
Logstash UDP 附加程序
logFaces（UDP 和 HTTP）附加程序
TCP appender（当你有多个服务器但想要集中日志记录时很有用）
用于连接/快速服务器的记录器
可配置的日志消息布局/模式
不同日志类别的不同日志级别（将应用程序日志的某些部分设为 DEBUG，其他部分仅为 ERRORS 等）
内置支持使用节点核心的集群模块进行日志记录
第三方 InfluxDB appender
