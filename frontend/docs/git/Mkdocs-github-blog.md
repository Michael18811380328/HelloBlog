# 使用 Mkdocs 在 Github 上快速部署文章

2021-11-03

以考代练：如何安装；如何初始化；如何增加超链接；（如何部署到github）

博客较短；仅供参考



为项目编写文档，找到了一款叫 `MkDocs` 的工具。

`MkDocs` 架构简单，工具可以自动创建一个配置文件 `mkdocs.yml`，以及 `docs` 文件夹，通过简单的配置，在 `docs` 文件夹上添加 `markdown` 文件作为页面。完成后工具自带部署到 Github 上的功能，通过简单的设置，就可以轻松使用 GitPage 展示项目文档。
具体细节可以参考 MkDocs 官网文档：

[MkDocs 中文官网](https://markdown-docs-zh.readthedocs.io/zh_CN/latest/)

[MkDocs 英文官网](https://www.mkdocs.org/)

## MkDocs 安装

使用 `pip` 安装 mkdocs。

```shell
pip install mkdocs
```

安装完成后，可以检查以下 `MkDocs` 是否能正确安装

```shell
mkdocs --version
>> mkdocs, version 1.2.2 
# 2021年11月 1.2.2 版本
```

能看到版本号正常显示，即表示 MkDocs 工具以被正常安装完成。

## 创建文档项目

`MkDocs` 提供了 `mkdocs new <project name>` 命令创建文档项目。然而，在一般情况下，我们都是先在 GitHub 上创建了一个已有的项目，然后再为其添加相应的文档。这里有两个方法可以参考：

- 使用 `mkdocs new <project>` 来创建一个新文档项目，然后将其中的 `docs` 文件夹以及 `mkdocs.yml` 配置文件复制到项目根目录下。
- 直接创建一个 `mkdocs.yml` 和 `docs` 文件夹与项目根目录下。
  接下来，我们可以在 `docs` 目录下创建一个 `index.md` 文件，然后向其中添加一些内容，尝试运行一下看看文档项目是否能正常运行，具体方法如下：

```shell
mkdocs serve
```

等待工具运行，然后默认地址是 `http://127.0.0.1:8000` 我们通过浏览器打开，查看页面是否能正常显示。

## 超链接

`mkdocs` 的链接非常简单，直接使用 MarkDown 语法的连接即可，连接路径使用项目相对路径即可。
如果是图片，可以在 `docs` 文件夹向创建一个 `images` 的文件夹，引用的使用可以使用方法:

```markdown
![image](./images/image.jpg)
```

## 部署到 Github

`MkDocs` 部署到 Github 也非常简单，使用命令 `mkdocs gh-deploy` ，工具就会自动将相应内容推送到项目的 `gh-pages` 分支上，然后只需要在 Github 项目设置中选择好对应 GitPage 的分支，然后通过 `https://<user-name>.github.io/<project-name>` 访问即可。

