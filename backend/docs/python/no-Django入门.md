# Django 入门

#### 1 Django 安装和配置

为避免 Python 版本冲突，依然使用 visual env 来开发，安装 Django 仅需要一条 pip 命令即可搞定`pip install django`。

查看安装版本 Django-1.10.3-final-0

> ~$ python
> \>>> import django
> \>>> django.VERSION
> (1, 10, 3, u'final', 0)

Django 从项目搭建，到 ORM，再到服务的部署，集成了一套自己的 shell 命令，第一个要用到的命令就是`django-admin.py`，让我们来看看 Django 都有哪些功能或者命令

> 1. django-admin **check** [app_label [app_label ...]]
>    检查项目完整性

1. django-admin **compilemessages**
   把.po 文件编译成.mo
2. django-admin **createcachetable**
   为数据库创建缓存表
3. django-admin **dbshell**
   进入到数据库的命令行，何种数据库依据 setting 文件的 ENGINE 选项
4. django-admin **diffsettings**
   查看 setting 文件的差异
5. django-admin **dumpdata** [app_label[.ModelName] [app_label[.ModelName] ...]]
   导出数据库数据，可以导出成为 json 文件
6. django-admin **flush**
   清空数据库数据
7. django-admin **inspectdb** [table [table ...]]
   指定某个数据库表，生成 models.py 文件
8. django-admin **loaddata** fixture [fixture ...]
   导入数据库文件到数据库中，可以从 json 文件导入
9. django-admin **makemessages**
   创建国际化文件
10. django-admin **makemigrations** [app_label [app_label ...]]
    按照指定 app 的 model 生成数据库同步文件，一般放在 app 下面的 migrations 文件夹
11. django-admin **migrate** [app_label] [migration_name]
    同步 Django 模型和数据库
12. django-admin **runserver** [addrport]
    启动 Django 自带的服务器，需指定 IP 和端口号，默认为 127.0.0.1:8000
13. django-admin **shell**
    --interface {ipython,bpython,python}, -i {ipython,bpython,python}
    进入 Python 交互界面，例如 Python
14. django-admin **showmigrations** [app_label [app_label ...]]
    查看 model 和数据库交互的同步脚本
15. django-admin **sqlflush**
    查看 flush 命令的 sql 脚本
16. django-admin **sqlmigrate** app_label migration_name
    查看 migrate 操作的 sql 脚本
17. django-admin **sqlsequencereset** app_label [app_label ...]
    查看对指定 app 进行 sequence 重置的 sql 脚本
18. django-admin **squashmigrations** app_label [start_migration_name] migration_name
19. django-admin **startapp** name [directory]
    创建 app，可以自定义文件夹位置，默认创建一系列的 models.py，views.py 文件
20. django-admin **startproject** name [directory]
    创建 Django 项目工程
21. django-admin **test** [test_label [test_label ...]]
    执行 app 的测试程序
22. django-admin **testserver** [fixture [fixture ...]]
    启动服务器，对导入服务器的数据进行测试
23. python manage.py **changepassword** [<username>]
    修改后台管理员密码
24. python manage.py **createsuperuser**
    创建管理员账户

manage.py 存在于每个 Django 工程根目录下面，可以在工程目录下直接使用`manage.py`命令，代替`django-admin`。

#### 2 创建新项目

> DjangoProj $ django-admin startproject MyBlog
> DjangoProj $ cd MyBlog

MyBlog $ tree

工程目录结构

工程根目录下会有一个同名的目录，这个目录存放的是一些全局的配置文件，每一个都很重要，settings.py 存放 app、数据源、模板以及中间件等配置信息，urls.py 存放的是整个网站 url 信息，实现接收响应，wsgi.py 配合服务器的配置。

#### 3 创建一个 app

> MyBlog $ python manage.py startup welcome

![img](https://upload-images.jianshu.io/upload_images/2683501-773f96b5eceb82b3.png?imageMogr2/auto-orient/strip|imageView2/2/w/226/format/webp)

app 目录结构

工程目录下多了一个文件夹 welcome，这时候可以使用我们熟悉的 pycharm 来编辑代码了

- 首先编辑 app 目录下的视图文件 views.py

```python
# views.py
# -*- coding:utf-8 -*-
from django.http import HttpResponse

def index(request):
    return HttpResponse(u'欢迎!')
```

request 和 response 这个不陌生吧，这个程序有点类似 Java 里面的 servlet。

- 编辑与视图关联的 urls.py 文件，这个文件起到路由转发的作用，其本身就是管理一个列表

```python
# urls.py
# -*- coding:utf-8 -*-
from django.conf.urls import url
from django.contrib import admin
from welcome import views as welcome_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),    #管理员页面入口
    url(r'^$', welcome_views.index),     #网站首页

]
```

- 最后把新创建的 app 注册到 settings.py 中

```python
# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'welcome'
]
```

运行内置服务器即可构建最简单的网站

> MyBlog $ python manage.py runserver 127.0.0.1:8080

![img](https://upload-images.jianshu.io/upload_images/2683501-fbc34ed65fa2780b.png?imageMogr2/auto-orient/strip|imageView2/2/w/452/format/webp)

欢迎首页

#### 2 使用数据库并实现 MVC

确保 MySQL 客户端已安装，如果没加入 paths 可以用以下方法

> 1. 针对全局用户
>    ~$ sudo touch /etc/paths.d/mysql
>    root 下面编辑文件，加入路径/usr/local/mysql/bin
> 2. 针对单个用户
>    ~$ vim ~/.bash_profile
>    加入 export PATH=/usr/local/mysql/bin:$PATH 并 source 使其生效

```python
# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'welcome',
    'BlogUser'
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',  # mysql.connector.django
        'NAME': 'test',
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```
