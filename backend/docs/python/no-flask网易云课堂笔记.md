# Flask 课程笔记

课程介绍：网易云课堂视频课程；2020年学习前两章并总结笔记如下（然后旧视频下架了）

2022年新的课程链接：https://study.163.com/course/courseMain.htm?courseId=1004091002

学习目标：熟悉 python 环境搭建和基本语法，了解 flask 的设计原理，可以做一个简单项目；有能力可以对接一个前后端项目。

练习项目（知乎）：用户注册、用户登录、搜索文章、发布文章、增加评论。

数据库设计：需要用户表，文章表，评论表，支持不同数据的增删改查。

## 第0章 安装开发环境

#### 安装 python

MacOS: 自带 python 2.7 开发环境，在控制台输入 python，或者 `python xxx.py` 即可执行

Windows：没有 Python 环境。需要下载安装，配置环境变量（`python pip easy-install`）这里需要设置 python 的环境变量和 pip 的环境变量，打开计算机-属性-高级属性-设置环境变量-增加环境变量, 名称是 PATH 属性是文件路径 `C:/Python27;C:/Python27/Scripts`，设置环境变量后，在 cmd 中可以查看 python 和 pip 的版本号，验证安装。

#### 安装虚拟环境 virtualenv

不同项目依赖的 python 版本不同，依赖第三方库不同，所以需要不同的 python 虚拟环境，虚拟环境会避免版本冲突。不同的虚拟环境中安装不同的 flask 的版本和库，相互独立不会干扰。

安装虚拟环境

~~~bash
sudo pip install virtualenv
mkdir test
cd test
virtualenv flask-env
~~~

Windows 激活虚拟环境

~~~bash
cd flask-dev/scripts
activate
pip install -r dependencies.txt
deactivate
~~~

Mac 激活虚拟环境

~~~bash
source ~/Virtualenv/flask-env/bin/activate
pip install -r dependencies.txt
deactivate
~~~

#### 安装 flask

falsk 版本兼容问题：教程是 0.12.2 现在安装的是 1.1.1，版本；可能部分代码不兼容，需要实际调试

~~~bash
source ~/Virtualenv/flask-env/bin/activate
pip install flask
~~~

测试版本号（监测安装正常）
~~~python
import flask
print flask.__version__
# 1.1.1
~~~

#### 安装 IDE

可以使用 pycharm https://www.jetbrains.com.cn/pycharm/ sublime Vscode 

虚拟环境和 flask 已经配置完毕

## 第一章 URLs 和 View(视图)

### 第一课 hello flask

1. 第一次创建项目的时候，需要添加虚拟环境（在pycharm）选择虚拟环境中的 python 执行文件

2. flask 代码基本结构解释

~~~python
#coding=utf-8
# python 2需要设置语言utf-8

# 从Flask框架中导入这个类
from flask import Flask

# 初始化对象，需要传参
app = Flask(__name__)

# 装饰器 @开头，位于函数的上面
# 是URL视图函数的映射
# 127.0.0.1:5000 会映射到下面的函数
@app.route('/')
def hello_world():
    return 'Hello Michael An!'

@app.route('/index')
def index_page():
    return 'Hello Index Page'

# 入口程序：启动一个应用程序，接受用户的请求（eventlistener）
if __name__ == '__main__':
    app.run()

~~~

### 第二课 debug 

app.run(debug=True) 可以打开调试模式

可以项目热加载（修改python文件才行，JS文件修改后不会热加载）；可以出现问题后在页面中看到报错详情

### 外部配置文件

新建配置文件 config.py，加入大写的参数

~~~python
DEBUG = True
# SECRET_KEY
~~~

在主文件中引入配置文件，使用配置

main.py

~~~python
import config
app.config.from_object(config)
~~~

### 第3课 URL 传参

可以在URL中传参

~~~python
@app.route('/page/<number>')
def change_page(number):
	return 'change page to %s' % number
~~~

参数需要放在尖括号中，视图函数中参数和原始参数相同。

### 第4课 URL反转

可以在一个视图函数中，传入其他视图函数，返回对应的URL

使用 url_for 内置函数

用途：页面重定向；HTML中A链接

~~~python
from flask import Flask, url_for
import config
app = Flask(__name__)
app.config.from_object(config)

@app.route('/')
def hello_world():
    print url_for('handle_index')
    print url_for('change_page', number = 20)
    return 'Hello World!'

@app.route('/index')
def handle_index():
    return 'index page'

@app.route('/page/<number>')
def change_page(number):
    return 'this is %s' % number

if __name__ == '__main__':
    app.run()

~~~

注意：运行flask后，需要点击左下角的关闭按钮，才能关闭当前的本地服务器。否则关闭软件后，本地服务器还在运行，可能影响其他的本地服务器。


### 第5课 页面重定向和跳转

实际使用:用户未登录时，跳转（重定向）到登录界面

~~~python
#coding=utf-8
from flask import Flask, redirect, url_for
app = Flask(__name__)

@app.route('/')
def hello_world():
    return redirect(url_for('login'))
    # return redirect('/login/')
    # return 'Hello World!'
    # 如果是固定的URL，那么视图函数中的路径更改后，重定向会错误
    # 使用url_for动态获取视图函数的跳转位置

@app.route('/login/')
def login():
    return 'This is login page, please login'

# we can use cookie to check user login state in the future
@app.route('/question/<id>')
def question(id):
    if id == '1':
        return 'Your question is 1, This is question page'
    else:
        return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)

~~~


## 第二章 Jinja2模板

### 第一课 模板渲染和传参

模板放在 templates 路径下

导入模板：render_template 函数；注意：不需要写templates文件夹的路径，直接写入口文件

模板传参：render_template 函数中第二个参数进行传参；在模板中使用变量需要 {{ 参数 }}

### 第二课 模板中访问属性和字典

访问模型中的属性或者字典。使用点语法或者中括号可以获取值

### 第三课 条件语句

~~~jinja2
{% if user %}
	<p>{{ user.name }}</p>
	<p>注销</p>
{% else %}
	<p>登录</p>
	<p>注册</p>
{% endif %}
~~~

and or not 逻辑操作

### 第四课 循环语句

#### 遍历字典

python 中遍历字典和 JS 不同

~~~python
user = {
    'name': 'Mike',
    'age': 18
}
for k, v in user.items():
    print k
    print v
~~~

Jinja2 模板中的使用

其他的遍历和python一样， 使用 items() keys() values() iteritems() itrtkeys() itervalues() 迭代器遍历

~~~jinja2
<dl>
<% for key, value, in my_dict.iteritems() %>
<dt>{{ key|e }}</dt>
<dd>{{ value|e }}</dd>
<% endfor %>
</dl>
~~~

#### 遍历列表

没有值的情况

~~~jinja2
<ul>
{% for user in users %}
<li>{{ user.name }}</li>
{% else %}
<li>no users found</li>
{% endfor %}
</ul>
~~~

小案例：四大名著的渲染
