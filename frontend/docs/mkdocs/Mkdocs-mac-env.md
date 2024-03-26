# Mac 安装 mkdocs 的环境搭建

2021-11-03

这是个人安装环境遇到的问题总结

最近做一个静态博客网站，使用 mkdocs 这个框架，后端使用 python 构建，折腾了好久才安装成功。下面把安装过程的问题简单总结一下，特别注意环境工具版本问题。

### 环境说明

我本地是 mac 环境，已经安装 node npm python3 wget virtualEnv n nvm 等工具，作用分别如下：

~~~txt
node
Python2
python3
~~~

其他工具

~~~txt
wget 下载脚本工具(或者brew)
npm JS库下载工具（或者yarn）
pip python库下载工具
virtualENV python环境构建工具（切换2-3）
n (nvm) node版本切换工具
~~~

具体这些工具的安装和注意事项不说了，可以到对应的博客查看。

### node 版本

mkdocs 需要 node 老版本。

我本地默认的 node 版本是 12 ，可以安装 mkdocs ，但是始终无法安装插件。我切换到 8 版本进行安装，具体操作如下：

使用 n 或者 nvm 等 node 版本工具管理版本并进行安装。

~~~bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
~~~

然后把 node 版本切换到早期版本（否则后期可能遇到 mkdocs 版本不对应，无法安装等）

### python 版本

一定在 python3 虚拟环境中搭建！！！

需要新建 python3 的虚拟环境（我默认使用 python 2.7.10 的环境，后期各种报错，material 这个材质包无法正常安装）。

使用 virtualEnv 管理虚拟环境，然后新建一个 py3 的环境。

使用 source /bin/activate 启动环境。Mac安装gitbook，卡在Installing GitBook 3.2.3

现在环境基本搭建好，开始安装 mkdocs 

### 安装 mkdocs

需要 [Python](https://www.python.org/) 和 [pip](http://pip.readthedocs.org/en/latest/installing.html) 来安装 MkDocs . 可以通过以下命令查看是否安装了上述依赖

```bash
python --version
pip --version
```

MkDocs 支持 Python 2.6, 2.7, 3.3 和 3.4。强烈建议使用 python3 环境安装。

使用 pip 安装 `mkdocs` :

```bash
pip install mkdocs
```

`mkdocs`已经安装到你的系统. 运行 `mkdocs help` 以检查是否正确安装.

```bash
$ mkdocs --help
mkdocs [help|new|build|serve|gh-deploy] {options}
```

### 创建项目

创建一个新项目

```bash
mkdocs new my-project
cd my-project
```

下面开启服务

~~~bash
mkdocs serve

INFO    -  Building documentation... 
INFO    -  Cleaning site directory 
[I 201127 10:39:05 server:335] Serving on http://127.0.0.1:8000
~~~

### 配置信息说明

博客的各种配置文件在 mkdocs.yml 中进行设置，下面进行简单的说明

~~~yml
# 网站配置（网站名、作者）
site_name: Michael Blog
site_author: Michael
site_url: https://michael18811380328.git

# 博客的路径（根目录下面新建对应的目录， 通常是DOCS）
docs_dir: ./docs

# github上对应的仓库和路径
repo_name: xxx
repo_url: xxx

# 版权显示
copyright: xxx

# 项目样式包（我这里使用自定义的 material包）可以设置图标、logo、页面色调（palette）
theme:
  name: material
  # icon:
  logo: assets/logo32_32.png
  favicon: assets/favicon.ico
  # features:
    # - tabs
  palette:
    primary: deep orange
    accent:

# 插件（我使用了搜索和折叠子页面插件）可选
plugins:
  - search # necessary for search to work
  - awesome-pages

# 自定义部分（社交的链接）可选
extra:
  social:
    - icon: fontawesome/brands/github
      link: https://github.com/scripts/

# 扩展（可选）
markdown_extensions:
  - markdown.extensions.admonition
  - markdown.extensions.attr_list
  - markdown.extensions.codehilite:
      guess_lang: true
  - markdown.extensions.def_list
  - markdown.extensions.footnotes
  - markdown.extensions.meta
  - markdown.extensions.toc:
      permalink: true
      toc_depth: "1-4"

# 文件树
nav:
  - Home: README.md
  - Data structure: data-structure.md
  - Base: base.md
  - Output: output.md
  - Utils: utils.md
~~~

上面这些配置可以使用其他的配置

### 参考链接

https://www.mkdocs.org/user-guide/styling-your-docs/

https://squidfunk.github.io/mkdocs-material/customization/

https://www.pythonsky.cn/technical-talk/233.html

https://github.com/nvm-sh/nvm#installing-and-updating

https://www.cnblogs.com/gaozejie/p/10689742.html

https://www.jianshu.com/p/622ad36ee020

https://www.pythonsky.cn/technical-talk/233.html

https://www.jianshu.com/p/c75381320b8a

https://www.cnblogs.com/princesong/p/11133310.html

https://www.jianshu.com/p/622ad36ee020

https://www.jianshu.com/p/c75381320b8a

https://www.baidu.com/s?ie=UTF-8&wd=Installing%20GitBook%203.2.3

https://markdown-docs-zh.readthedocs.io/zh_CN/latest/
