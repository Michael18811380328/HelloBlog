# Go笔记 

 原始表格链接：https://cloud.seatable.cn/dtable/external-links/59b453a8639945478de2/

 
## 0477 go build 安装依赖443


下载 github 上的依赖无效，需要换成国内的源

```text
go env -w GOPROXY=https://goproxy.cn,direct
```

​

   
## 0478 linux 或者 docker 安装 go 环境


执行下面的命令安装

如果需要安装指定版本，改一下版本号 1.22.5 尽量装新版，旧版可能有各种问题

```text
# 下载Go二进制文件
wget https://dl.google.com/go/go1.22.5.linux-amd64.tar.gz
 
# 解压文件到/usr/local目录
sudo tar -C /usr/local -xzf go1.22.5.linux-amd64.tar.gz
 
# 设置环境变量
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.profile
source ~/.profile
 
# 验证安装
go version
```

如果已经装了旧版，例如 1.17，一定要先卸载旧版，然后再安装新版，不能直接安装，否则会出错

如果使用 tar 包安装，直接删除安装目录即可

```text
which go
# /usr/local/go/bin/go
sudo rm -rf /usr/local/go
```

如果使用 brew 安装，则使用 brew 卸载

```text
brew uninstall go
```

​

   
## 0704 go 常用 web server 框架


常用的服务器框架：

|        | gin                                                                                                                                       | beego                                                                                             | echo                                                                                                    | martini                                                                                                                |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| github | [https://github.com/gin-gonic/gin](https://github.com/gin-gonic/gin "https://github.com/gin-gonic/gin")                                   | [https://github.com/beego/beego](https://github.com/beego/beego "https://github.com/beego/beego") | [https://github.com/labstack/echo](https://github.com/labstack/echo "https://github.com/labstack/echo") | [https://github.com/go-martini/martini](https://github.com/go-martini/martini "https://github.com/go-martini/martini") |
| stars  | 77                                                                                                                                        | 30                                                                                                | 29                                                                                                      | 11                                                                                                                     |
| 介绍     | Gin is a HTTP web framework written in Go (Golang). It features a Martini-like API with much better performance -- up to 40 times faster. | beego is an open-source, high-performance web framework for the Go programming language.          | High performance, minimalist Go web framework                                                           | Classy web framework for Go                                                                                            |
|        | Gin是一个用Go（Golang）编写的HTTP web框架。它采用了类似Martini的API，性能更好，速度快40倍。                                                                             | beego是Go编程语言的开源、高性能web框架。                                                                         | 高性能、极简主义的Go web框架                                                                                       | Go的经典web框架，现在废弃不建议使用，改成 Gin 框架                                                                                         |

这里仅了解主要框架，不具体使用和学习

学习和使用这些的基础，需要熟悉 golang 语法，同时熟悉服务器知识，目前暂时不具备

PS：martini 马提尼酒，gin 金酒

  