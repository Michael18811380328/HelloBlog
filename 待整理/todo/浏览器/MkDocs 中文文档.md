# MkDocs

Markdown 项目文档工具. 本文档翻译自官网[mkdocs](http://www.mkdocs.org/). 本文档托管于 [Github](https://github.com/chengsu/markdown-docs-zh/).

------

## 概述

MkDocs 是一个用于创建项目文档的 **快速**, **简单** , **完美华丽** 的静态站点生成器. 文档源码使用 Markdown 来撰写, 用一个 YAML 文件作为配置文档.

------

**MkDocs 仍处于开发阶段.**

我们正在快速成长, 但是文档仍然需要完善, 软件本身也有一些不完善的地方. 1.0 版本计划在未来几周内发布.

------

#### 任意托管.

构建完全的静态 HTML 站点 , 可以将它托管到 GitHub pages, Amazon S3 等任意地方.

#### 大量主题.

默认包含大量美观的主题. 可以从 bootstrap, readthedocs 和 12 款 bootswatch 主题中选择.

#### 即时预览.

内建的开发服务器使你在撰写文档的时候就即时预览. 它甚至能在保存更改时自动载入, 只需刷新浏览器就可以查看更改.

#### 易于配置.

可以配置文档主题.

#### 交叉索引.

使用 MkDocs 链接语法创建交叉索引.

------

## 安装

需要 [Python](https://www.python.org/) 和 Python package manager [pip](http://pip.readthedocs.org/en/latest/installing.html) 来安装 MkDocs . 可以通过以下命令查看是否安装了上述依赖:

```
$ python --version
Python 2.7.2
$ pip --version
pip 1.5.2
```

MkDocs 支持 Python 2.6, 2.7, 3.3 和 3.4.

使用 pip 安装 `mkdocs` :

```
$ pip install mkdocs
```

`mkdocs`已经安装到你的系统. 运行 `mkdocs help` 以检查是否正确安装.

```
$ mkdocs help
mkdocs [help|new|build|serve|gh-deploy] {options}
```

------

## 开始

输入以下命令以开始一个新项目.

```
$ mkdocs new my-project
$ cd my-project
```

我们看一下已经创建的初始化项目.

![The initial MkDocs layout](https://markdown-docs-zh.readthedocs.io/zh_CN/latest/img/initial-layout.png)

有一个配置文件 `mkdocs.yml`, 和一个包含文档源码的 `docs` 文件夹. 在 `docs` 文件夹里包含了一个名为 `index.md` 的文档.

MkDocs 包含了一个内建的服务器以预览当前文档. 控制台切换当前目录到 `mkdocs.yml` 配置文件相同文件夹, 输入 `mkdocs serve` 命令以启动内建服务器:

```
$ mkdocs serve
Running at: http://127.0.0.1:8000/
```

在浏览器中打开 http://127.0.0.1:8000/ , 你将看到以下页面:

![The MkDocs live server](https://markdown-docs-zh.readthedocs.io/zh_CN/latest/img/screenshot.png)

内建服务器支持在配置文件,文档目录或主题发生改变时自动载入并重新生成文档.

编辑 `docs/index.md` 文件并保存. 刷新浏览器你将看到文档被同步更新.

现在可以开始编辑配置文件 `mkdocs.yml` 了. 把 `site_name` 改成其他内容并保存文档.

![Editing the config file](https://markdown-docs-zh.readthedocs.io/zh_CN/latest/img/initial-config.png)

刷新浏览器你将看到网页标题已发生改变.

![The site_name setting](https://markdown-docs-zh.readthedocs.io/zh_CN/latest/img/site-name.png)

## 添加页面

编辑 `doc/index.md` 文档, 将默认标题改为 `MkLorum`, 刷新浏览器即可看到标题变化.

现在为文档添加第二个页面:

```
$ curl 'jaspervdj.be/lorem-markdownum/markdown.txt' > docs/about.md
```

要为文档添加导航条, 只需在配置文件中添加导航条需要的标题和排序即可:

```
site_name: MkLorum
pages:
- [index.md, Home]
- [about.md, About]
```

刷新浏览器即可看到 `Home` 和 `About` 导航栏目.

## 配置主题

可以在配置文件中修改文档主题. 在 `mkdocs.yml` 中添加如下内容:

```
site_name: MkLorum
pages:
- [index.md, Home]
- [about.md, About]
theme: readthedocs
```

刷新浏览器即可看到 ReadTheDocs 主题已被应用.

![Screenshot](https://markdown-docs-zh.readthedocs.io/zh_CN/latest/img/readthedocs.png)

## 站点生成

我们现在已经可以发布 `MkLorum` 文档了. 通过以下命令生成文档.

```
$ mkdocs build
```

该命令创建了一个 `site` 新目录. 可以通过以下命令浏览该目录内容:

```
$ ls site
about css fonts img index.html js
```

注意源码被分别输出为 `index.html` 和 `about/index.html`. 主题中的其他文件也被复制到了 `site` 目录中.

如果你使用 `git` 等版本控制系统, 你可能不希望提交构建之后的文档到版本库. 在 `.gitignore` 中添加 `site/` 即可忽略该目录.

```
$ echo "site/" >> .gitignore
```

如果你使用其他版本控制系统则需要查阅相关文档以确定如何忽略指定目录.

一段时间后, 可能有文件被从源码中移除了, 但是相关的文档仍残留在 `site` 目录中. 在构建命令中添加 `--clean` 参数即可移除这些文档.

```
$ mkdocs build --clean
```

## 发布

MkDocs 生成的文档只包含静态文件, 因此你可以将文档部署到任意地方. [GitHub project pages](https://help.github.com/articles/creating-project-pages-manually) 和 [Amazon S3](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html) 是不错的选择. 只需上传 `site` 目录到你需要发布的位置即可.





- [Docs](https://markdown-docs-zh.readthedocs.io/zh_CN/latest/) »
-  

- 用户指南 »
-  

- 撰写文档
- [ Edit on GitHub](https://github.com/chengsu/markdown-docs-zh/)

------

# 撰写文档

如何撰写 markdown 源码并安排目录结构.

------

## 目录结构

文档是普通的 Markdown 文件, 放到项目目录里. 通常目录以 `docs` 命名, 和 `mkdocs.yml` 配置文件一起放置于项目的顶级目录中.

最简单的项目目录结构可能是这样的:

```
mkdocs.yml
docs/
    index.md
```

默认项目主页是 `index`. Markdown 源码文件的后缀可以是以下任意一种: `markdown`, `mdown`, `mkdn`, `mkd`, `md`.

你可以创建多个 markdown 文件以创建多页文档:

```
mkdocs.yml
docs/
    index.md
    about.md
    license.md
```

文档目录结构决定着生成的文档的 URLs . 如果采用如上目录结构, 生成的 URLs 将会如下所示:

```
/
/about/
/license/
```

你也可以根据需要将 Markdown 文件放到多级目录.

```
docs/
    index.md
    user-guide/getting-started.md
    user-guide/configuration-options.md
    license.md
```

多级目录将生成多级 URLs, 如下所示:

```
/
/user-guide/getting-started/
/user-guide/configuration-options/
/license/
```

## 链接

MkDocs 可以使用 Markdown 超链接语法来创建链接.

#### 内部超链接

创建内部超链接只需使用 Markdown 超链接语法, 包含目标 Markdown 文档的相对路径即可.

```
Please see the [project license](license.md) for further details.
```

当运行 MkDocs 构建工具时, 超链接将指向相应的 HTML 页面.

你可以通过点击链接以在新编辑器窗口中打开目标 Markdown 文档.

如果目标文档在另一个目录中, 确保超链接中正确包含了相对路径.

```
Please see the [project license](../about/license.md) for further details.
```

你可用通过锚链接以定位到目标文档的特定部分. 生成的 HTML 将正确转换路径部分, 而不会去改变锚链接部分.

```
Please see the [project license](about.md#license) for further details.
```

## 图片和多媒体

除了 Markdown 文件, 你可以在文档中包含其他文件, 这些文件将在你构建文档时被复制到指定位置. 可以包含图片和其他多媒体.

例如, 如果你的文档需要包含一个 [GitHub pages CNAME file](https://help.github.com/articles/setting-up-a-custom-domain-with-pages#setting-the-domain-in-your-repo) 和 一张 PNG 图片, 你可以安排目录结构如下:

```
mkdocs.yml
docs/
    CNAME
    index.md
    about.md
    license.md
    img/
        screenshot.png
```

要包含图片到你的源码文档, 只需使用 Markdown 语法:

```
Cupcake indexer is a snazzy new project for indexing small cakes.

![Screenshot](img/screenshot.png)

*Above: Cupcake indexer in progress*
```

图片链接将在构建时被嵌入, 如果使用了 Markdown 编辑器, 你还可以实时预览.

## Markdown 扩展

MkDocs 支持以下 Markdown 扩展.

#### 表格

以下是一个简单的表格:

```
First Header | Second Header | Third Header
------------ | ------------- | ------------
Content Cell | Content Cell  | Content Cell
Content Cell | Content Cell  | Content Cell
```

可以在起始和结束位置添加管道到表格:

```
| First Header | Second Header | Third Header |
| ------------ | ------------- | ------------ |
| Content Cell | Content Cell  | Content Cell |
| Content Cell | Content Cell  | Content Cell |
```

可以在分隔符行添加冒号已指定每一列的对其方式:

```
First Header | Second Header | Third Header
:----------- | :-----------: | -----------:
Left         | Center        | Right
Left         | Center        | Right
```

#### 代码块

以三个以上 ` （反引号）开始一行, 并在结束位置以相同数目的反引号 ` （反引号）开始一行即可包含一个代码块:

```
​```
Fenced code blocks are like Stardard
Markdown regular code blocks, except that
theye not indented and instead rely on a
start and end fence lines to delimit the code
block.
```





- [Docs](https://markdown-docs-zh.readthedocs.io/zh_CN/latest/) »
-  

- 用户指南 »
-  

- 文档样式
- [ Edit on GitHub](https://github.com/chengsu/markdown-docs-zh/)

------

# 配置主题

如何配置主题.

------

## 内建主题

#### Bootstrap

![Bootstrap](http://bootstrapdocs.com/v2.3.1/docs/assets/img/examples/bootstrap-example-fluid.png)

#### Read the Docs

![ReadTheDocs](https://docs.readthedocs.org/en/latest/_images/screen_mobile.png)

#### The bootswatch themes

![Amelia](http://bootswatch.com/amelia/thumbnail.png)

![Cerulean](http://bootswatch.com/cerulean/thumbnail.png)

![Cosmo](http://bootswatch.com/cosmo/thumbnail.png)

![Cyborg](http://bootswatch.com/cyborg/thumbnail.png)

![Flatly](http://bootswatch.com/flatly/thumbnail.png)

![Journal](http://bootswatch.com/journal/thumbnail.png)

![Readable](http://bootswatch.com/readable/thumbnail.png)

![Simplex](http://bootswatch.com/simplex/thumbnail.png)

![Slate](http://bootswatch.com/slate/thumbnail.png)

![Spacelab](http://bootswatch.com/spacelab/thumbnail.png)

![United](http://bootswatch.com/united/thumbnail.png)

![Yeti](http://bootswatch.com/yeti/thumbnail.png)

## 自定义主题

自定义主题最少只需要一个 `base.html` 模板文件就可以了. 模板目录应当被放置到与 `mkdocs.yml` 配置文件相同目录下. 在 `mkdocs.yml` 文件中指定 `theme_dir` 选项为包含 `base.html` 文件的目录即可. 例如, 如下目录结构:

```
mkdocs.yml
docs/
    index.md
    about.md
custom_theme/
    base.html
    ...
```

你需要配置自定义主题目录选项:

```
theme_dir: 'custom_theme'
```

如果和 `theme` 选项结合使用, 自定义主题可以用于替换内建主题的特定部分. 例如, 上述目录结构如果你设置了 `theme: mkdocs` , 那么 `base.html` 将替换主题中的相应文件, 而其他的则保持不变. 这在你希望对主题进行小调整时是十分有用的.

最简单的 `base.html` 结构如下:

```
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    {{ content }}
  </body>
</html>
```

`mkdocs.yml` 中指定的每一页的文档内容使用 `{{ content }}` 标签来插入. 可以像处理普通 HTML 文档一样导入样式表和脚本. 相应的, 导航栏和内容列表可以通过 `nav` 和 `toc` 对象自动生成和包含. 如果你想设计自定义的主题, 最好从修改 [内建主题](https://github.com/tomchristie/mkdocs/tree/master/mkdocs/themes) 开始.





# 配置

所有配置参数.

------

## 简介

项目配置在 `mkdocs.yml` 文件中设置.

配置文件中至少应包含 `site_name` 选项. 其余选项都是可选的.

## 项目信息

### site_name

这个是 **必须的**, 代表用于项目文档的主标题. 例如:

```
site_name: Mashmallow Generator
```

渲染主题时该选项将作为 `site_name` 环境变量传递.

### site_url

设置站点的 URL. 这将添加带有规范的 URL 的 link 标签到 HTML 头部.

**默认值**: `null`

### repo_url

如果设置了该项, 每个页面将会添加一个链接到你的 GitHub 或 Bitbucket 版本库.

```
repo_url: https://github.com/example/repository/
```

**默认值**: `null`

### repo_name

如果设置了该项, 每个页面将会添加一个链接到你的 GitHub 或 Bitbucket 版本库.

**默认值**: `'GitHub'` 或 `'Bitbucket'` 如果 `repo_url` 匹配相应域名, 否则为 `null`

### site_description

设置站点描述. 这将这 HTML 头部添加一个 meta 标签.

**默认值**: `null`

### site_author

设置站点作者. 这将这 HTML 头部添加一个 meta 标签.

**默认值**: `null`

### site_favicon

设置 favicon . 需要将 `favicon.ico` 放到 `docs/` 目录, 配置文件将如下所示:

```
site_favicon: favicon.ico
```

**默认值**: `null`

### copyright

设置站点版权信息.

**默认值**: `null`

### google_analytics

设置 Google 站点分析工具.

```
google_analytics: ['UA-36723568-3', 'mkdocs.org']
```

**默认值**: `null`

## 目录结构

### pages

该选项设置需要生成的页面范围.

该选项为一个列表. 列表中的每一行用一个字符串列表表示一个页面. 第一个字符串代表源文件的路径, 应为相对于 `docs_dir` 的路径. 其余字符串代表导航条中的页面标题.

下面的例子将在构建阶段生成三个页面:

```
pages:
- ['index.md', 'Introduction']
- ['user-guide.md', 'User Guide']
- ['about.md', 'About']
```

假定 `docs_dir` 采用默认值 `docs`, 则构建阶段源文件的路径分别为 `docs/index.md`, `docs/user-guide.md` 和 `docs/about.md`.

如果你有大量项目文档, 你需要用导航头部来按目录来组织你的导航. 你可以在 page 选项中包含一个额外的字符串来表示导航头部, 如下所示:

```
pages:
- ['index.md', 'Introduction']
- ['user-guide/creating.md', 'User Guide', 'Creating a new Mashmallow project']
- ['user-guide/api.md', 'User Guide', 'Mashmallow API guide']
- ['user-guide/configuration.md', 'User Guide', 'Configuring Mashmallow']
- ['about/license.md', 'About', 'License']
```

## 构建目录

### theme

设置站点主题, 查看可用的主题 [文档样式](https://markdown-docs-zh.readthedocs.io/zh_CN/latest/user-guide/styling-your-docs/).

**默认值**: `'mkdocs'`

### theme_dir

设置自定义主题. 这可以是相对目录, 相对于你的配置文件位置来解析该路径, 也可以是绝对路径.

查看 [文档样式](https://markdown-docs-zh.readthedocs.io/zh_CN/latest/user-guide/styling-your-docs/#custom-themes) 了解自定义主题.

**默认值**: `null`

### docs_dir

设置包含 markdown 源码的目录. 这可以是相对目录, 相对于你的配置文件位置来解析该路径, 也可以是绝对路径.

**默认值**: `'docs'`

### site_dir

设置生成的 HTML 和其他文件所在目录. 这可以是相对目录, 相对于你的配置文件位置来解析该路径, 也可以是绝对路径.

**默认值**: `'site'`

**Note**: 如果你使用了版本控制系统, 通常不希望 *构建输出* 文件被提交到版本库, 而只需要对 *源码* 进行版本控制. 例如, 如果使用 `git` , 你可以添加以下代码到 `.gitignore` 文件:

```
site/
```

如果使用其他版本控制系统请参阅相应的文档以排除特定目录.

### extra_css

设定主题所需的额外的样式文件.

**默认值**: 默认情况下 `extra_css` 将包含 `docs_dir` 目录下的样式文件, 如果没有找到则为 `[]` (空表).

### extra_javascript

设定主题所需的额外的脚本文件.

**默认值**: 默认情况下 `extra_javascript` 将包含 `docs_dir` 目录下的脚本文件, 如果没有找到则为 `[]` (空表).

## 预览控制

### use_directory_urls

设置文档中的链接类型.

下表表明了 `use_directory_urls` 设置为 `true` 和 `false` 情况下文档中的 URLs 的不同.

| Source file  | Generated HTML       | use_directory_urls=true | use_directory_urls=false |
| ------------ | -------------------- | ----------------------- | ------------------------ |
| index.md     | index.html           | /                       | /index.html              |
| api-guide.md | api-guide/index.html | /api-guide/             | /api-guide/index.html    |
| about.md     | about/index.html     | /about/                 | /about/index.html        |

默认的 `use_directory_urls=true` 选项能生成用户友好的 URLs, 通常情况下你不应该修改默认选项.

替代选项在你需要直接在文件系统中打开文档, 并保持链接正确时很有用, 因为它创建的链接直接指向目标 *文件* 而不是目标 *文件夹*.

**默认值**: `true`

### dev_addr

设置运行 `mkdocs serve` 时的链接地址. 这使得你可以使用其他端口, 也可以使用 `0.0.0.0` 地址使你可以用本地网络访问.

所有的设置都可以通过命令行设置, 例如:

```
mkdocs serve --dev-addr=0.0.0.0:80  # Run on port 80, accessible over the local network.
```

**默认值**: `'127.0.0.1:8000'`

## 格式化选项

### markdown_extensions

MkDocs 使用 [Python Markdown](http://pythonhosted.org/Markdown/) 转化 Markdown 文件为 HTML 文档. Python Markdown 支持大量格式化页面的 [扩展](http://pythonhosted.org/Markdown/extensions/index.html). 该选项使你可以使用 MkDocs 默认扩展之外的扩展 (`meta`, `toc`, `tables`, 和 `fenced_code`).

例如, 激活 [SmartyPants typography extension](https://pypi.python.org/pypi/mdx_smartypants) 扩展, 设置如下:

```
markdown_extensions: [smartypants]
```

**默认值**: `[]`