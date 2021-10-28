# 开发说明

## 初始化环境

博客基于 python 的 mkdocs 构建工具，所以需要 python3 环境。

创建并初始 python3 虚拟环境，安装依赖

```bash
source ./VirtualEnv/py3-env/bin/activate
pip install -r requirements.txt
```

在虚拟环境内部，切换到项目文件夹下面

## 半自动生成目录

在 bash 下执行

~~~bash
./file.sh
~~~

可以自动生成不同子项目的目录

然后手动拷贝到不同子项目的 mkdock.yml 文件中（需要改进）

## 自动编译博客

在 bash 下执行

~~~bash
./build.sh
~~~

等待1分钟，博客都从 md 编译成 HTML 文件。如果界面提示错误，根据错误信息修改配置文件（通常是某文件找不到等）

## 自动迁移博客

在 bash 下执行

~~~bash
./move.sh
~~~

将编译的博客，迁移到发布的代码仓库中。

使用 http-server 查看整体界面效果。

使用 git 上线或者发布到自己的服务器

## 报错处理

1、执行 source ./VirtualEnv/py3-env/bin/activate 报错

如果没有虚拟环境 virtualEnv，可以先本地安装。详情参考

virtual 官方英文文档：https://virtualenv.pypa.io/en/latest/

廖雪峰中文文档：https://www.liaoxuefeng.com/wiki/1016959663602400/1019273143120480

或者安装其他 python 虚拟环境

---

2、执行 pip install 报错

```bash
command "python setup.py egg_info" failed with error code 1 in /private/tmp/p
```

尽量不要在宿主机直接安装，在虚拟环境中安装比较好，这样不同的项目不会互相影响。

---

3、执行 bash 脚本报错

注：如果执行脚本提示没有权限，那么需要更改脚本执行的权限。

~~~bash
chmod 755 ./build.sh
~~~

不同脚本文件的功能和注意事项，详见文件内部注释。




## 参考文档

https://mkdocs.zimoapps.com/

https://markdown-docs-zh.readthedocs.io/zh_CN/latest/

https://blog.csdn.net/wirelessqa/article/details/78173401

https://www.jianshu.com/p/9f618689954a

https://blog.csdn.net/u011324454/article/details/79076885

https://blog.csdn.net/u011092188/article/details/64123561
