# Python 操作 Mysql 数据库

2021-12-01

Python 标准数据库接口为 Python DB-API ，Python DB-API 为开发人员提供了数据库应用编程接口。

不同的数据库你需要下载不同的 DB API 模块，例如你需要访问 Oracle 数据库和 Mysql 数据，你需要下载 Oracle 和 Mysql 数据库模块。 DB-API 是一个规范，它定义了一系列必须的对象和数据库存取方式, 以便为各种各样的底层数据库系统和多种多样的数据库接口程序提供一致的访问接口 。Python 的 DB-API ，为大多数的数据库实现了接口，使用它连接各数据库后，就可以用相同的方式操作各数据库。

Python DB-API 使用流程：

- 引入 API 模块。
- 打开数据库连接。
- 执行 SQL 语句和存储过程。
- 关闭数据库连接。

## 什么是 Mysql db?

Mysql db 是用于 Python 链接 Mysql 数据库的接口，它实现了 Python 数据库 API 规范 V2.0，基于 Mysql API 上建立的。

## 如何安装 Mysql db?

为了用 DB-API 编写 Mysql 脚本，必须确保已经安装了 Mysql

```python



import Mysql db
```

如果执行后的输出结果如下所示，意味着你没有安装 Mysql db 模块：

```bash
Traceback (most recent call last):
  File "test.py", line 3, in <module>
    import mysql db
ImportError: No module named  Mysql db
```

安装 Mysql db，请访问 http://sourceforge.net/projects/ Mysql -python ，(Linux 平台可以访问：https://pypi.python.org/pypi/ Mysql -python)从这里可选择适合您的平台的安装包，分为预编译的二进制文件和源代码安装包。

如果您选择二进制文件发行版本的话，安装过程基本安装提示即可完成。如果从源代码进行安装的话，则需要切换到 Mysql db 发行版本的顶级目录，并键入下列命令:

```bash
$ gunzip  Mysql -python-1.2.2.tar.gz
$ tar -xvf  Mysql -python-1.2.2.tar
$ cd  Mysql -python-1.2.2
$ python setup.py build
$ python setup.py install
```

注意：请确保您有 root 权限来安装上述模块。

报错 1: 执行 sudo python setup.py build 出现问题(SSL 权限)

```bash
sudo python setup.py build
Downloading http://pypi.python.org/packages/source/d/distribute/distribute-0.6.28.tar.gz
urllib2.HTTPError: HTTP Error 403: SSL is required
```

可以参考 https://blog.csdn.net/bin642264643/article/details/91972480 直接在浏览器中访问这个链接进行下载。下载结束，并放在路径下，然后执行 python setup.py build

报错：出现下面的问题

```bash
running build
running build_py
copying  Mysql db/release.py -> build/lib.macosx-10.13-intel-2.7/ Mysql db
running build_ext
building '_ Mysql ' extension
cc -fno-strict-aliasing -fno-common -dynamic -arch x86_64 -arch i386 -g -Os -pipe -fno-common -fno-strict-aliasing -fwrapv -DENABLE_DTRACE -DMACOSX -DNDEBUG -Wall -Wstrict-prototypes -Wshorten-64-to-32 -DNDEBUG -g -fwrapv -Os -Wall -Wstrict-prototypes -DENABLE_DTRACE -arch i386 -arch x86_64 -pipe -Dversion_info=(1,2,4,'beta',4) -D__version__=1.2.4b4 -I/usr/local/ Mysql /include -I/System/Library/Frameworks/Python.framework/Versions/2.7/include/python2.7 -c _ Mysql .c -o build/temp.macosx-10.13-intel-2.7/_ Mysql .o
_ Mysql .c:44:10: fatal error: 'my_config.h' file not found
#include "my_config.h"
         ^~~~~~~~~~~~~
1 error generated.
error: command 'cc' failed with exit status 1
```

解决方法 1：

https://stackoverflow.com/questions/21638444/error-command-cc-failed-with-exit-status-1- Mysql db-installation-on-mac

```bash
The problem is unused arguments passed to compiler. Try this before running your build code:
export CFLAGS=-Qunused-arguments
export CPPFLAGS=-Qunused-arguments
```

使用上面的编译不处理啊啊！看一下最新的教程‘

可能是 python2.7.10 或者 3 版本的原因，因为本地现在两个版本都安装

可能是版本不对应， Mysql \_python-1.2.5-cp27-none-win_amd64.whl 支持 windows 版本或者 linux 系统，不支持 Mac 系统。

解决方法 2：

https://stackoverflow.com/questions/50864438/mac-pip-install- Mysql -python-unsuccessful

```bash
Installing of an older version of the Mysql worked for me:
brew remove  Mysql
brew install  Mysql @5.7
brew link --force  Mysql @5.7
pip install  Mysql -python
```

## 数据库连接

连接数据库前，请先确认以下事项：

- 您已经创建了数据库 TESTDB.
- 在 TESTDB 数据库中您已经创建了表 EMPLOYEE
- EMPLOYEE 表字段为 FIRST_NAME, LAST_NAME, AGE, SEX 和 INCOME。
- 连接数据库 TESTDB 使用的用户名为 "testuser" ，密码为 "test123",你可以可以自己设定或者直接使用 root 用户名及其密码， Mysql 数据库用户授权请使用 Grant 命令。
- 在你的机子上已经安装了 Python Mysql db 模块。
- 如果您对 sql 语句不熟悉，可以访问 [SQL 基础教程](https://www.runoob.com/sql/sql-tutorial.html)

### 实例：

以下实例链接 Mysql 的 TESTDB 数据库：

```python
import mysql db

# 打开数据库连接
db =  Mysql db.connect("localhost", "testuser", "test123", "TESTDB", charset='utf8' )

# 使用cursor()方法获取操作游标
cursor = db.cursor()

# 使用execute方法执行SQL语句
cursor.execute("SELECT VERSION()")

# 使用 fetchone() 方法获取一条数据
data = cursor.fetchone()

print "Database version : %s " % data

# 关闭数据库连接
db.close()
```

执行以上脚本输出结果如下：`Database version : 5.0.45`

## 创建数据库表

如果数据库连接存在，使用 execute()方法来为数据库创建表，如下所示创建表 EMPLOYEE：

```python 
import mysql db

# 打开数据库连接
db =  Mysql db.connect("localhost", "testuser", "test123", "TESTDB", charset='utf8' )

# 使用cursor()方法获取操作游标
cursor = db.cursor()

# 如果数据表已经存在使用 execute() 方法删除表。
cursor.execute("DROP TABLE IF EXISTS EMPLOYEE")

# 创建数据表SQL语句
sql = """CREATE TABLE EMPLOYEE (
         FIRST_NAME  CHAR(20) NOT NULL,
         LAST_NAME  CHAR(20),
         AGE INT,
         SEX CHAR(1),
         INCOME FLOAT )"""

cursor.execute(sql)

# 关闭数据库连接
db.close()
```

---

## 数据库插入操作

以下实例使用执行 SQL INSERT 语句向表 EMPLOYEE 插入记录：

```python
import Mysql db

# 打开数据库连接
db =  Mysql db.connect("localhost", "testuser", "test123", "TESTDB", charset='utf8' )

# 使用cursor()方法获取操作游标
cursor = db.cursor()

# SQL 插入语句
sql = """INSERT INTO EMPLOYEE(FIRST_NAME,
         LAST_NAME, AGE, SEX, INCOME)
         VALUES ('Mac', 'Mohan', 20, 'M', 2000)"""
try:
   # 执行sql语句
   cursor.execute(sql)
   # 提交到数据库执行
   db.commit()
except:
   # Rollback in case there is any error
   db.rollback()

# 关闭数据库连接
db.close()
```

以上例子也可以写成如下形式：

```python
import mysql db

# 打开数据库连接
db =  Mysql db.connect("localhost", "testuser", "test123", "TESTDB", charset='utf8' )

# 使用cursor()方法获取操作游标
cursor = db.cursor()

# SQL 插入语句
sql = "INSERT INTO EMPLOYEE(FIRST_NAME, \
       LAST_NAME, AGE, SEX, INCOME) \
       VALUES (%s, %s, %s, %s, %s )" % \
       ('Mac', 'Mohan', 20, 'M', 2000)
try:
   # 执行sql语句
   cursor.execute(sql)
   # 提交到数据库执行
   db.commit()
except:
   # 发生错误时回滚
   db.rollback()

# 关闭数据库连接
db.close()
```

### 实例：

以下代码使用变量向 SQL 语句中传递参数:

```
..................................
user_id = "test123"
password = "password"

con.execute('insert into Login values(%s, %s)' % \
             (user_id, password))
..................................
```

---

## 数据库查询操作

Python 查询 Mysql 使用 fetchone() 方法获取单条数据, 使用 fetchall() 方法获取多条数据。

- fetchone(): 该方法获取下一个查询结果集。结果集是一个对象
- fetchall():接收全部的返回结果行.
- rowcount: 这是一个只读属性，并返回执行 execute()方法后影响的行数。

### 实例：

查询 EMPLOYEE 表中 salary（工资）字段大于 1000 的所有数据：

```python 
import mysql db

# 打开数据库连接
db =  Mysql db.connect("localhost", "testuser", "test123", "TESTDB", charset='utf8' )

# 使用cursor()方法获取操作游标
cursor = db.cursor()

# SQL 查询语句
sql = "SELECT * FROM EMPLOYEE \
       WHERE INCOME > %s" % (1000)
try:
   # 执行SQL语句
   cursor.execute(sql)
   # 获取所有记录列表
   results = cursor.fetchall()
   for row in results:
      fname = row[0]
      lname = row[1]
      age = row[2]
      sex = row[3]
      income = row[4]
      # 打印结果
      print "fname=%s,lname=%s,age=%s,sex=%s,income=%s" % \
             (fname, lname, age, sex, income )
except:
   print "Error: unable to fecth data"

# 关闭数据库连接
db.close()
```

以上脚本执行结果如下：

```
fname=Mac, lname=Mohan, age=20, sex=M, income=2000
```

---

## 数据库更新操作

更新操作用于更新数据表的的数据，以下实例将 EMPLOYEE 表中的 SEX 字段为 'M' 的 AGE 字段递增 1：

```python 
import mysql db

# 打开数据库连接
db =  Mysql db.connect("localhost", "testuser", "test123", "TESTDB", charset='utf8' )

# 使用cursor()方法获取操作游标
cursor = db.cursor()

# SQL 更新语句
sql = "UPDATE EMPLOYEE SET AGE = AGE + 1 WHERE SEX = '%c'" % ('M')
try:
   # 执行SQL语句
   cursor.execute(sql)
   # 提交到数据库执行
   db.commit()
except:
   # 发生错误时回滚
   db.rollback()

# 关闭数据库连接
db.close()
```

---

## 删除操作

删除操作用于删除数据表中的数据，以下实例演示了删除数据表 EMPLOYEE 中 AGE 大于 20 的所有数据：

```python
import mysql db

# 打开数据库连接
db =  Mysql db.connect("localhost", "testuser", "test123", "TESTDB", charset='utf8' )

# 使用cursor()方法获取操作游标
cursor = db.cursor()

# SQL 删除语句
sql = "DELETE FROM EMPLOYEE WHERE AGE > %s" % (20) try:

# 执行SQL语句
cursor.execute(sql)

# 提交修改
db.commit() except:

# 发生错误时回滚

db.rollback()
# 关闭连接 db.close()
```

## 执行事务

事务机制可以确保数据一致性。

事务应该具有 4 个属性：原子性、一致性、隔离性、持久性。这四个属性通常称为 ACID 特性。

- 原子性（atomicity）。一个事务是一个不可分割的工作单位，事务中包括的诸操作要么都做，要么都不做。
- 一致性（consistency）。事务必须是使数据库从一个一致性状态变到另一个一致性状态。一致性与原子性是密切相关的。
- 隔离性（isolation）。一个事务的执行不能被其他事务干扰。即一个事务内部的操作及使用的数据对并发的其他事务是隔离的，并发执行的各个事务之间不能互相干扰。
- 持久性（durability）。持续性也称永久性（permanence），指一个事务一旦提交，它对数据库中数据的改变就应该是永久性的。接下来的其他操作或故障不应该对其有任何影响。

Python DB API 2.0 的事务提供了两个方法 commit 或 rollback。

### 实例：

```sql
# SQL删除记录语句
sql = "DELETE FROM EMPLOYEE WHERE AGE > %s" % (20)
try:
   # 执行SQL语句
   cursor.execute(sql)
   # 向数据库提交
   db.commit()
except:
   # 发生错误时回滚
   db.rollback()
```

对于支持事务的数据库， 在 Python 数据库编程中，当游标建立之时，就自动开始了一个隐形的数据库事务。

commit()方法游标的所有更新操作，rollback（）方法回滚当前游标的所有操作。每一个方法都开始了一个新的事务。

---

## 错误处理

DB API 中定义了一些数据库操作的错误及异常，下表列出了这些错误和异常:

| 异常              | 描述                                                                                                                                                                  |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Warning           | 当有严重警告时触发，例如插入数据是被截断等等。必须是 StandardError 的子类。                                                                                           |
| Error             | 警告以外所有其他错误类。必须是 StandardError 的子类。                                                                                                                 |
| InterfaceError    | 当有数据库接口模块本身的错误（而不是数据库的错误）发生时触发。 必须是 Error 的子类。                                                                                  |
| DatabaseError     | 和数据库有关的错误发生时触发。 必须是 Error 的子类。                                                                                                                  |
| DataError         | 当有数据处理时的错误发生时触发，例如：除零错误，数据超范围等等。 必须是 DatabaseError 的子类。                                                                        |
| OperationalError  | 指非用户控制的，而是操作数据库时发生的错误。例如：连接意外断开、 数据库名未找到、事务处理失败、内存分配错误等等操作数据库是发生的错误。 必须是 DatabaseError 的子类。 |
| IntegrityError    | 完整性相关的错误，例如外键检查失败等。必须是 DatabaseError 子类。                                                                                                     |
| InternalError     | 数据库的内部错误，例如游标（cursor）失效了、事务同步失败等等。 必须是 DatabaseError 子类。                                                                            |
| ProgrammingError  | 程序错误，例如数据表（table）没找到或已存在、SQL 语句语法错误、 参数数量错误等等。必须是 DatabaseError 的子类。                                                       |
| NotSupportedError | 不支持错误，指使用了数据库不支持的函数或 API 等。例如在连接对象上 使用.rollback()函数，然而数据库并不支持事务或者事务已关闭。 必须是 DatabaseError 的子类。           |

## 说明

关于 Mysql 的连接，经过摸索，建议正文修改一下，使用 Mysql 官方提供的连接器，我目前安装的 Mysql 是 8.0.12 版本，数据库安装完成后，可以安装“ Mysql -connector-python-8.0.12-py2.7-windows-x86-64bit”，当然了，要根据自己的操作系统和 python 版本以及位数进行选择，我是 win10 的 64 位，python2.7 的 64 位，故选择的上述插件，安装完成后，直接使用以下代码进行测试：

```python
# -*- coding:utf-8 -*-
import mysql .connector

# 打开数据库连接（请根据自己的用户名、密码及数据库名称进行修改）
cnn =  Mysql .connector.connect(user='root',passwd='root',database='testdb')

# 使用cursor()方法获取操作游标
cursor = cnn.cursor()

# 使用execute方法执行SQL语句
cursor.execute("SELECT VERSION()")

# 使用 fetchone() 方法获取一条数据
data = cursor.fetchone()
print "Database version : %s " % data

# 执行sql语句
cnn.close()
显示的结果应该如下：

Database version : 8.0.12
```

显示的结果应该如下：

```
Database version : 8.0.12
```

相关资源下载链接如下：

Python2.7（个人觉得这个版本语句兼容性高，适合入门）： https://blog.python.org/2018/05/python-2715-released.html

Mysql 8.0.12（请根据自己需要选择版本）：https://dev.mysql.com/downloads/installer/

Mysql 官方数据库连接器（请根据自己需要选择）：https://dev.mysql.com/downloads/connector/python/
