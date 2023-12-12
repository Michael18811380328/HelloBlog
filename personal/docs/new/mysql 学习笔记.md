
# 黑马-MYSQL

原始教程链接: https://www.bilibili.com/video/BV1Kr4y1i7ru/?vd_source=2d5bdee7ea59486ed4aa4a9b10020224

### 1-01.MySQL课程介绍
Mysql 课程介绍：分成三大部分

* 基础 SQL 语言（函数、约束、事务、多表查询）
* 进阶部分（锁，跨表搜索，索引、优化，InnoDB）
* 运维实践（日志、分布式数据库集群、分库分表、读写分离）

全部知识点：

* 事务？事务的四大特征？事务的隔离级别？
* 内连接，左外连接？
* 存储引擎？InnoDB 和 MyISAM？索引是什么数据结构
* Mysql 执行计划？
* 什么情况索引失效？
* 回表查询？
* MVCC
* 主从复制，读写分离，分库分表




### 2-02. 基础-课程内容&数据库相关概念
基础部分内容：

* mysql 和 SQL 的概念
* 函数
* 约束
* 多表查询
* 事务

数据库：存储数据的仓库 database

数据库管理系统：Database management system 数据库管理软件

SQL：操作关系型数据库的语言




### 3-03. 基础-概述-MySQL安装及启动
mysql 下载安装和启动

不同操作系统下载和安装不同，教程中介绍了 Wins 安装过程，学会的部分不赘述

* GUI 开启服务：mysql 以服务的形式存在于 windows 中，可以打开服务，然后开启、暂停、关闭 mysql80 服务
* CLI 开启服务：\`net start mysql80\` or \`net stop mysql80\`

进入 mysql： mysql -u root -p

如果没有 mysql 命令，需要配置环境变量（把 mysql 的安装路径，复制到 windows 的环境变量中）




### 4-04. 基础-概述-数据模型
mysql 数据库是关系型数据库

关系型数据库：多张二维表，通过关联关系组成的数据库（主键和外键构成关联）




### 5-05. 基础-SQL-通用语法及分类
SQL 语法规则：

* 不区分大小写（建议大写）
* 以分号结尾（语句内部可以换行，空格，缩进增强可读性）
* 注释：# 

SQL 语句分类

* DDL：Definition 定义数据库对象（数据库，表，字段，视图）
* DML：Manipulation 操作语句（增删改）
* DQL：query 查询
* DCL：control 控制权限（用户权限，访问权限）




### 6-06. 基础-SQL-DDL-数据库操作
数据库定义语句

```sql
show databases;

create database if not exists hello default charset utf8mb4;

use hello;

# 查询当前所在的数据库的信息，如果当前没有进入数据库，那么返回 Null
select database();

drop database if exists hello;

```

默认字符集的区别 default charset

utf8：字符较少，不支持某些多字节表情和符号

utf8mb4：字符较多，优先使用这个字符集




### 7-07. 基础-SQL-DDL-表操作-创建&查询
表查询

```sql
show tables;

# 描述当前表的结构
desc test;

# 查询指定表的建表语句
show create table test;

```

新建表

```sql
create table novel_user(
   name varchar(255),
   id int(2) comment 'this is id auto increase',
   address varchar(64)
) comment 'this table is created for novel reader';

```

注意：字段和数据类型之间没有冒号，最后一个字段后面没有逗号

创建成功后，类似数据库，可以查看创建语句（也能看到评论）






### 8-08. 基础-SQL-DDL-数据类型及案例
字段数据类型，数值、字符串、日期三大类

### 数值

有符号：signed 表示可以取正负数

无符号：unsigned 只能取正数（自然数）

| 类型        | 范围       | 描述     |
| :-------- | :------- | :----- |
| tinyint   | 255      |        |
| smallint  | 65535    |        |
| mediumint | 2^16 - 1 |        |
| int       | 2^32 - 1 | 正数     |
| bigint    | 2^64 - 1 |        |
|           |          |        |
| float     |          | 单精度浮点数 |
| double    |          | 双进度浮点数 |
| decimal   | MD       | 小数值    |

例子

age tinyint signed, 年龄是正整数，小于255即可，例如 30

score double(4, 1), 分数可能是分数，精度是4位，分数是1为，例如 88.5

### 字符串

| 类型           | 大小    | 描述                  |
| :----------- | :---- | :------------------ |
| char         | 255   | 定长字符串，性能较好，占位多      |
| varchar      | 65535 | 变长字符串，性能较差（每次需计算长度） |
|              |       |                     |
| tinytext     | 255   | 短文本字符串              |
| text         | 65535 | 长文本字符串              |
| mediumtext   |       |                     |
| longtext     |       | 极大文本字符串             |
|              |       |                     |
| blob(类似text) |       | 二进制形式的数据            |

例子

username varchar(50),

gender char(1),

### 日期类型

| 类型        | 格式                  | 描述      |
| :-------- | :------------------ | :------ |
| date      | YYYY-MM-DD          | 日期      |
| time      | HH:MM:SS            | 时间；持续时间 |
| year      | YYYY                | 年       |
| datetime  | YYYY-MM-DD HH:MM:SS | 日期带时分秒  |
| timestamp | YYYY-MM-DD HH:MM:SS | 时间戳     |

例子

birthday date

### 整体案例

```
create table employee (
	id int,
	username varchat(10),
	nickname varchar(10),
	gender char(1),
	age tinyint signed,
	idcard char(18),
	entry_time date,
)

```

注意：字符串需要标明长度（10， 255）数值和时间已经有对应的格式，不需要标注长度。




### 9-09. 基础-SQL-DDL-表操作-修改&删除
表操作

```
# 增加字段
alter table employee add gender char(1) comment '男 女';

# 修改字段
alter table employee gender char(2) comment '男性 女性 未知';
alter table employee gender new_gender char(1);

# 删除字段
alter table employee gender;

# 表重命名
alter table employee rename to user;

# 删除表
drop table is exists user;

# 删除原表并重新建一个空表
truncate table user;

```

注意：删除表时，也会把全部的数据删除。




### 10-10. 基础-SQL-DDL小结
DDL 小结：

数据库操作

```sql
show databases;

create database novel;

use novel;

select database();

drop novel;

```

表操作

```sql
show tables;

create table user(
	username: varchar(50),
	id: int(4) comment 'id is auto increase',
	gender: char(1)
);

desc user;

show craete table user;

alter table user add/modify/change/drop xxx;

drop table user;

```




### 11-11. 基础-SQL-图形化界面工具DataGrip
使用命令行工具可以进行sql的操作，但是不是很方便。

所以可以使用图形化工具，进行点击的方式进行创建数据库，创建表，增加列增加记录等操作。

不同的图形化界面工具的效果基本一样。




### 12-12. 基础-SQL-DML-插入
Dml：Data manipulation language 数据操作语句，对数据库的表结构的数据记录，进行增删改。

本小节添加数据：可以给指定的字段添加数据。

```
insert into user (id，name) values (1，'mike'); 

```

也可以给全部字段添加数据，但是实际上这样用的比较少。如果某个表要新加一个字段，这样的语句就会不能用。


也可以一条 SQL 语句添加多个记录，只需要在后面用逗号进行隔开，就是批量添加数据。


注意


1 字段的顺序和添加数据的顺序应该一致。


2 添加数据必须满足字段的数据类型和数据范围。例如如果设置了年龄字段是正数，那么就不能添加一个负数的年龄，如果添加了会报错。


3 字符串和日期对象应该用引号进行包括。如果是用户自定义输入的语句，一定要进行转换，避免用户输入非法的 SQL语句执行sql输入这个在日常的开发中也之前遇过。




### 13-13. 基础-SQL-DML-更新和删除
更新数据，修改语句可以加 where 条件也可以不加，如果不加条件的话，修改的是整个表的全部数据（通常不这么写）。

```sql
Update user set name='Mike'，age=10 where id >= 10;

```

删除数据，如果不加 where 就是删除全部的行（通常不这么写）。

```sql
Delete from user where is is null

```




### 14-14. 基础-SQL-DML小结
增加数据，更新数据，删除数据的小结

```sql
 insert into novel set value;
 update novel set name='mike', age=10 where is 10;
 delete from novel where ID is 10;

```




### 15-15. 基础-SQL-DQL-基础查询
我们课程的数据还有我们资源的数据，当我们在访问官网的时候，这些数据都需要从数据库查询出来，然后在界面进行展示。所以 DQL 语句实际上是使用最多的情况。

```sql
select * from novel;
select name, price from novel;

```

加上 distinct 字段可以对查询的结果进行去重。

```sql
select distinct email from novel;

```




### 16-16. 基础-SQL-DQL-条件查询
加 where，主要是各种条件的判断。

包括比较运算符（>=, !=）和逻辑运算符(&& ||)，特殊的还有 between in like ilike null。

这里关键是实际的案例和后续的练习。




