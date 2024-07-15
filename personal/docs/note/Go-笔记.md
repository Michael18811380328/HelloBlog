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

如果需要安装指定版本，改一下版本号 1.22.5

```text
# 下载Go二进制文件
wget https://dl.google.com/go/go1.15.6.linux-amd64.tar.gz
 
# 解压文件到/usr/local目录
sudo tar -C /usr/local -xzf go1.15.6.linux-amd64.tar.gz
 
# 设置环境变量
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.profile
source ~/.profile
 
# 验证安装
go version
```

​

  