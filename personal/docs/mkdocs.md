## mkdocs 配置说明

~~~yml
site_name: Michale An Blog
site_author: Michael An

pages:
- 首页: index.md
- 进程与线程: 1.md
- UUID: 2.md

# 这是一个二级导航
nav:
- Home: 'index.md'
- User Guide:
    - '原地算法': 'in-place.md'
    - '二分算法': 'part-two.md'
- Learn:
    - '双指针': 'double-pointer.md'
    - '分治算法': 'diverce.md'
    - '聚类算法': 'K-means.md'
- About:
    - 'License': 'process-and-thread.md'
    - 'Release Notes': 'uuid.md'

# https://mkdocs.zimoapps.com/user-guide/ 详细资料可以参考这里

docs_dir: ./docs

copyright: Copyright &copy; TEST


# site_url: https://michael18811380328.github.io/blog/
# repo_name: blog
# repo_url: https://github.com/Michael18811380328/blog


theme: material
# readthedocs
# mkdocs
# material

# https://github.com/squidfunk/mkdocs-material
# 这个主题需要自定义 pip 安装
# 其他的主题参考 https://github.com/mkdocs/mkdocs/wiki/MkDocs-Themes

# theme:
#   name: material
#   # icon:
#   logo: assets/logo32_32.png
#   # features:
#     # - tabs
#   palette:
#     primary: deep orange
#     accent:


# plugins:
#   - search # necessary for search to work
#   - awesome-pages

# # Customization
# extra:
#   social:
#     - icon: fontawesome/brands/github
#       link: https://github.com/Michael18811380328/blog

# # Extensions
# markdown_extensions:
#   - markdown.extensions.admonition
#   - markdown.extensions.attr_list
#   - markdown.extensions.codehilite:
#       guess_lang: true
#   - markdown.extensions.def_list
#   - markdown.extensions.footnotes
#   - markdown.extensions.meta
#   - markdown.extensions.toc:
#       permalink: true
#       toc_depth: "1-4"

~~~
