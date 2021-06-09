## 开发说明

1、建议开启 python 3虚拟环境

```bash
source ./VirtualEnv/py3-env/bin/activate
```

2、在虚拟环境内部，切换到子项目文件夹下面（mkdocs.yml）

3、编辑文档

如果改动文件名，或者增删文件，需要更新目录结构

4、开启本地服务器。测试正常后，编译HTML界面

~~~bash
./build.sh
~~~

5、切换到根目录，使用 http-server 再次测试一下编译后整体界面效果。

6、执行 move.sh 迁移脚本，迁移编译后的文件到 View 仓库，然后 push 到 github 上面，即可显示编译后的界面。

注：如果执行脚本是，提示没有权限，那么需要更改脚本执行的权限，chmod 755 ./build.sh （mac）

## 快速建立目录(yml)

1、读取目录

```bash
cd ./book/docs
# 如果有子目录，那么不能使用这个命令，这里需要优化
ls -a >> res.md
```

2、执行脚本，转换成需要的格式

```bash
cd ../../
./file.sh >> res2.md
```

脚本内部含义：逐行读取文件，并且读取到屏幕上面

todo: 直接把转换后的格式写入到 mkdocs.yml 中

```bash
#!/bin/bash
cat ./book/docs/res.md | while read line
do
  echo "- '$line': '/docs/$line'"
done
```

3、将 res2.md 复制到 mkdocs 中，调整格式和缩进

todo: 全部操作使用脚本实现

4、清理临时文件


## todo 

- 不同的子项目内容分类优化

- 不同平台互相引流

- 不同子项目设置不同的样式

- 相关文档整理说明


## 报错处理

执行 pip install mkdocs 报错

command "python setup.py egg_info" failed with error code 1 in /private/tmp/p

注意：不要直接在 Mac 上面安装，需要设置虚拟环境，然后在虚拟环境中安装比较好，这样不同的项目不会互相影响。


## 参考文档

https://mkdocs.zimoapps.com/

https://markdown-docs-zh.readthedocs.io/zh_CN/latest/

https://blog.csdn.net/wirelessqa/article/details/78173401

https://www.jianshu.com/p/9f618689954a

https://blog.csdn.net/u011324454/article/details/79076885

https://blog.csdn.net/u011092188/article/details/64123561
