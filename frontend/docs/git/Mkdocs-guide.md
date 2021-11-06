# MkDocs 快速入门

2021-11-03

> 本文选自 [《了不起的Markdown》](https://item.jd.com/53603123487.html)，作者：毕小烦

MkDocs 是一个用 Python 开发的静态站点生成器工具，它可以非常简单快速的创建项目文档。MkDocs 的文档源码使用 Markdown 编写，配置文件使用 YAML 编写，可以一键编译成静态站点。

很多开源的项目文档都使用 MkDocs 编写，因此我们非常有必要学习一下。

环境

- 支持 macOS/Linux/Windows
- 安装 Python: 2.7.8 +

安装

```
$ pip install mkdocs
```

查看 mkdocs 版本

```
$ mkdocs -V
mkdocs, version 0.16.3
```

或

```bash
$ pip show mkdocs
Name: mkdocs
Version: 0.16.3
Summary: Project documentation with Markdown.
Home-page: http://www.mkdocs.org
Author: Tom Christie
Author-email: tom@tomchristie.com
License: BSD
Location: /Library/Python/2.7/site-packages
Requires: tornado, Jinja2, click, Markdown, PyYAML, livereload
```

查看 mkdocs 帮助

```
$ mkdocs --help
Usage: mkdocs [OPTIONS] COMMAND [ARGS]...

  MkDocs - Project documentation with Markdown.

Options:
  -V, --version  Show the version and exit.
  -q, --quiet    Silence warnings
  -v, --verbose  Enable verbose output
  -h, --help     Show this message and exit.

Commands:
  build      Build the MkDocs documentation(构建 MkDocs 文档)
  gh-deploy  Deploy your documentation to GitHub Pages(把文档部署到 Github Pages)
  json       Build the MkDocs documentation to JSON files...(把 MkDocs 文档构建成 JSON 文件)
  new        Create a new MkDocs project(创建一个新的项目)
  serve      Run the builtin development server(启动一个内置的开发服务)
```

升级

```
$ pip install -U mkdocs
```

卸载

```
$ pip uninstall mkdocs
```

# 快速开始

## 创建项目

```bash
# STEP 1.创建一个新的 MkDocs 项目
$ mkdocs new bixiaofan
INFO    -  Creating project directory: bixiaofan
INFO    -  Writing config file: bixiaofan/mkdocs.yml
INFO    -  Writing initial docs: bixiaofan/docs/index.md

# STEP 2. 切换到项目中
$ cd bixiaofan/

# STEP 3. 查看项目结构
$ tree
.
├── docs  # mardown 源码放到 docs 中
│   └── index.md
└── mkdocs.yml # 配置文件

1 directory, 2 files

# 查看 docs/index.md，index.md 是默认的首页
$ cat docs/index.md
# Welcome to MkDocs

For full documentation visit [mkdocs.org](http://mkdocs.org).

## Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs help` - Print this help message.

## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.

# 查看配置文件 mkdocs.yml
$ cat mkdocs.yml
site_name: My Docs
```

## 启动服务

```
$ mkdocs serve
INFO    -  Building documentation...
INFO    -  Cleaning site directory
[I 170923 08:07:03 server:283] Serving on http://127.0.0.1:8000
[I 170923 08:07:03 handlers:60] Start watching changes
[I 170923 08:07:03 handlers:62] Start detecting changes
[I 170923 08:07:13 handlers:133] Browser Connected: http://127.0.0.1:8000/
```

在浏览器中打开 [http://127.0.0.1:8000](http://127.0.0.1:8000/) ，启动效果如下图所示：

![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcxMDA4MTAxMTE0MTc3)

服务器启动后，当配置文件、文档目录或主题发生改变时，服务器就会自动加载变更并生成新的文档。

小贴示：

服务器默认地址为 127.0.0.1:8000 ，如果端口被占用怎么办呢？

当然也支持自定义地址，使用下面这命令：

mkdocs serve --dev-addr=127.0.0.1:8888

或

mkdocs serve -a 127.0.0.1:9999

## 添加页面

MkDocs 中一个 Markdown 文档渲染后就是一个页面，因此如果我们想添加一个页面，就需要先在 docs 目录下添加一个 Markdown 文件，文件的后缀名可以是 md、markdown 、mdown、 mkdn 、mkd。

实例演示：

STEP 1. 在 docs 目录中添加 [test.md](http://test.md/)

```
# 查看项目结构
$ tree
.
├── docs
│   ├── index.md
│   └── test.md
└── mkdocs.yml
```

说明：

docs 的目录结构对应着生成页面的 URL，本例中对应的 URL 是：

```
http://127.0.0.1:8000/
http://127.0.0.1:8000/test/
12
```

STEP 2. 修改配置文件 mkdocs.yml

```
site_name: Markdown实用指南
pages:
- 首页: index.md
- 测试: test.md
```

说明：

- [index.md](http://index.md/) 是默认的首页
- [test.md](http://test.md/) 是新增页面

效果如下图所示：

![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcxMDA4MTAxMTQ2MDky)

小贴示：

文件名暂不支持中文，文件路径中也不要有中文。

## 配置主题

MkDocs 的主题是可以配置的，默认主题是 mkdocs。

前面的例子中 mkdocs.yml 文件也可以配置成这样：

```
site_name: Markdown实用指南
pages:
- 首页: index.md
- 测试: test.md

theme: mkdocs
123456
```

如果想切换成别的主题，只要更改 theme 的值就可了。

如：

```
site_name: Markdown实用指南
pages:
- 首页: index.md
- 测试: test.md

theme: readthedocs
```

效果如下图所示：

![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcxMDA4MTAxMjA4MTI5)

主题分为内置主题、第三方主题和自定义主题，内置主题如上所述，直接配置主题名就可以了；如果是第三方主题，就需要先安装主题再进行配置了；自定义主题有点难度本文暂不介绍。

## 生成站点

如果想发布项目，需要先构建项目，生成一个静态资源站点。

```
$ mkdocs build
```

构建完成后的项目结构如下：

```
$ tree
.
├── docs
│   ├── index.md
│   └── test.md
├── mkdocs.yml
└── site  # 构建后生成的目录
    ├── css
    │   ├── highlight.css
    │   ├── theme.css
    │   └── theme_extra.css
    ├── fonts
    │   ├── fontawesome-webfont.eot
    │   ├── fontawesome-webfont.svg
    │   ├── fontawesome-webfont.ttf
    │   └── fontawesome-webfont.woff
    ├── img
    │   └── favicon.ico
    ├── index.html
    ├── js
    │   ├── highlight.pack.js
    │   ├── jquery-2.1.1.min.js
    │   ├── modernizr-2.8.3.min.js
    │   └── theme.js
    ├── mkdocs
    │   ├── js
    │   │   ├── lunr.min.js
    │   │   ├── mustache.min.js
    │   │   ├── require.js
    │   │   ├── search-results-template.mustache
    │   │   ├── search.js
    │   │   └── text.js
    │   └── search_index.json
    ├── search.html
    ├── sitemap.xml
    └── test
        └── index.html
```

构建完成后的资源全部放到了 site 目录下。

小贴示：

1. 使用 mkdocs build --clean 可以在构建时清理一些残留资源。
2. site 需要部署到 webserver 上才能正常运行。

## 发布项目

site 目录就是我们要发布的项目，我们可以把 site 部署到任意的地方，如： GitHub project pages。

