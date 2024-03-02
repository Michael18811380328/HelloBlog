
# MYSQL

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

其他参考资料：

> <https://www.runoob.com/mysql/mysql-tutorial.html> 




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
desc users;

# 查询指定表的建表语句
show create table users;

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

```sql
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
drop table if exists user;

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

show create table user;

alter table user add/modify/change/drop xxx;

drop table user;

```




### 11-11. 基础-SQL-图形化界面工具DataGrip
使用命令行工具可以进行sql的操作，但是不是很方便。

所以可以使用图形化工具，进行点击的方式进行创建数据库，创建表，增加列增加记录等操作。

不同的图形化界面工具的效果基本一样。




### 12-12. 基础-SQL-DML-插入
Dml：Data manipulation language 数据操作语句，对数据库的表结构的数据记录，进行增删改。

添加数据：可以给指定的字段添加数据。

```sql
insert into user (id，name) values (1，'mike'); 

```

也可以给全部字段添加数据，但是实际上这样用的比较少。如果某个表要新加一个字段，这样的语句就会不能用。

也可以一条 SQL 语句添加多个记录，只需要在后面用逗号进行隔开，就是批量添加数据。

注意

1 字段的顺序和添加数据的顺序应该一致。

2 添加数据必须满足字段的数据类型和数据范围。例如如果设置了年龄字段是正数，那么就不能添加一个负数的年龄，如果添加了会报错。

3 字符串和日期对象，应该用引号。如果是用户自定义输入的语句，一定要进行转换，避免用户输入非法的 SQL语句执行sql注入（安全问题），这个在日常的开发中也之前遇过。




### 13-13. 基础-SQL-DML-更新和删除
更新数据，修改语句可以加 where 条件也可以不加。

如果不加条件的话，修改的是整个表的全部数据（通常不这么写）。

```sql
update user set name='Mike'，age=10 where id >= 10;

```

删除数据，如果不加 where 就是删除全部的行（通常不这么写）。

```sql
delete from user where id is null

```




### 14-14. 基础-SQL-DML小结
增加数据，更新数据，删除数据的小结

```sql
 insert into novel set value;
 
 update novel set name='mike', age=10 where id is 10;
 
 delete from novel where id is 10;

```




### 15-15. 基础-SQL-DQL-基础查询
当我们在访问官网时，数据都需要从数据库查询出来，然后在界面进行展示。所以 DQL 语句是使用最多的情况。

查询包括多个部分。

基本查询。

条件查询。where

聚合函数。count max min avg sum

分组查询。group by

排序查询。order by

分页查询。limit

```sql
select * from novel;

select name, price from novel;

```

加上 distinct 字段，可以对查询的结果进行去重。

```sql
select distinct email from novel;

```




### 16-16. 基础-SQL-DQL-条件查询
1、加 where 条件，主要是各种条件的判断。

包括比较运算符（>=, !=）和逻辑运算符(&& ||)，特殊的还有 between in like ilike null。

```sql
Select xxx from user where age in（18, 20, 40）;
 
Select xxx from user where age between 10 and 20;

```

2、可以使用 like + 通配符来查询字符串，支持单个匹配还是任意匹配。

> LIKE 子句是在 MySQL 中用于在 WHERE 子句中进行模糊匹配的关键字。它通常与通配符一起使用，用于搜索符合某种模式的字符串。如果没有使用百分号 %, LIKE 子句与等号 = 的效果是一样的。参考：<https://www.runoob.com/mysql/mysql-like-clause.html> 

% 表示任意个字符串匹配

\_ 表示一个字符串匹配

COLLATE utf8mb4_general_ci; 表示不区分大小写

```sql
# 查找昵称以 Peter 结尾的用户
select * from users where nickname like '%Peter';

# 查找昵称是 王某某的用户
select * from users where nickname like '王__';

# 查找昵称以 peter 开始，不区分大小写的用户
select * from users where nickname like 'peter%' COLLATE utf8mb4_general_ci;

```

3、其他类似正则表达式

\[]：表示括号内所列字符中的一个。指定一个字符、字符串或范围，要求所匹配对象为它们中的任一个。




### 17-17. 基础-SQL-DQL-聚合函数
聚合函数。将一列数据作为一个整体进行纵向计算。

```
Select 聚合函数(字段) From table

```

注意所有的null，不参与函数的运算。

 Count

 Max

 Min

 Avg

Sum

例子

```sql
select count(id) from employee;

select max(age) from employee;

select min(age) from employee;

select avg(salary) from employee;

select sum(car_number) from employee;

```




### 18-18. 基础-SQL-DQL-分组查询
分组查询 group by 基本语法

```sql
select 分组字段，fn（分组字段） from table [where 分组前的条件过滤] group by 分组字段 [having 分组后的过滤条件]

```

1、where 是分组前的过滤条件；having 是分组后的过滤条件。

2、where 不能使用聚合函数；having 中可以使用聚合函数。

3、执行的顺序：where 过滤，分组聚合函数，having 过滤。

4、查询的字段一般是分组字段，以及用聚合函数操作的分组字段，其他字段查询结果无意义。

实例：

```sql
# 1 根据性别分组，统计男性和女性员工的个数
select gender, count(*) from employee group by gender;

# 2 根据性别分组，计算男性和女性员工的年龄平均值和最大值
select gender, avg(age), max(age) from employee group by gender;

# 3 查询年龄小于45岁的员工，并根据住址分组
select address, count(*) from employee where age < 45 group by address;

# 4 查询年龄小于45岁的员工，并根据住址分组，返回住址大于 3 的分组
select address, count(*) from employee where age < 45 group by address having count(*) > 3;

# 可以使用别名，避免两次计算 count
select address, count(*) as address_count from employee where age < 45 group by address having address_count > 3;

```

> 其他参考：<https://www.runoob.com/mysql/mysql-group-by-statement.html> 
>
> groupby 通常和聚合函数一起使用，对分组后的数据进行汇总操作

实例2：

```sql
# 把评论表中按照用户名分类，然后统计每一个用户的评论数量
select username, count(*) from comments group by username;

```




### 19-19. 基础-SQL-DQL-排序查询
排序 order by

基本语法，`ASC` 表示升序（默认），`DESC` 表示降序。

```sql
select column1, column2 from product order by column1 DESC, column2 ASC;

```

如果存在多列排序，只有第一列相同，才使用第二列进行排序。实际上，主要对数字排序，或者对名称排序（字符串）

```sql
# 1 单列排序
select name, price from product order by price ASC;

# 2 多列排序
select name, price from product order by price ASC, rate DESC;

# 3 使用组合后的名称排序
SELECT price * rate AS discounted_price FROM product ORDER BY discounted_price;

# 4 处理 NULL 值 (NULLS FIRST 或 NULLS LAST)
select * from product order by price ASC NULLS LAST;

# 5 处理字符集排序

# 如果默认字符集是 gbk 汉字编码字符集，直接排序。
select * from users order by nickname;

# 如果字符集是 utf-8 需要先转换成 gbk 再排序。
select * from users order by convert(nickname using gbk);

```

> 参考：<https://www.runoob.com/mysql/mysql-order-by.html> 




### 20-20. 基础-SQL-DQL-分页查询
分页查询 limit

```sql
select name from comments limit 开始索引，查询个数

```

注意

1. 开始索引 =（页码-1）\* 每一页个数
2. limit 是 mysql 特有的词语，oracle 没有
3. 如果开始索引是0 可以直接省略不写

```sql
# 案例：查找第一页数据和查找第二页数据（每页20个评论）

select * from comments limit 0, 20；

select * from comments limit 20, 20；

```




### 21-21. 基础-SQL-DQL-案例练习
5个实际案例，重在练习

```sql
# 1、查询年龄 20， 21， 22， 23 岁女员工的信息
select * from employee where gender = '女' and age in(20, 21, 22, 23);


# 2、查询男，20-40岁之间，姓名是三个字的员工信息
select * from employee where gender = '男' and (age between 20 and 40) and name like '___';


# 3、查询：年龄小于60岁，男性和女性的人数
select gender, count(*) from employee where age < 60 group by gender;


# 4、查询：年龄小于35岁的男性的姓名和年龄，结果需要按照年龄和入职时间排序
select name, age from employee where age <= 35 order by age asc, entrydate desc;


# 5、查询：男性、年龄 20-40岁，按照年龄升序和入职时间升序，返回前5个
select * from employee where gender = '男' and (age between 20 and 40) order by age asc, entrydate desc limit 5;

```

实际项目中

1、明确查询需求：先把程序需要处理的实际问题，使用自然语言描述出来

2、把基础 SQL 写出来

3、然后一步步增加条件




### 22-22. 基础-SQL-DQL-执行顺序
sql 书写顺序和执行顺序是不一样的

书写顺序通常是

```sql
select 字段名称
from 表名
where 过滤条件
group by 分组条件
having 分组后的过滤条件
order by 排序字段
limit 分页参数

```

执行顺序，主要用来处理别名

```sql
from table as table1
where table1.age > 10
group by name having age < 30
select name，count(name)
order by salary asc
limit 20,10

```

如果前一个执行阶段使用了别名 as xxx，后一个执行条件才能使用别名，这就是执行顺序解决的实际情况

案例

```sql
select name, age from employee as e where e.age > 15 order by age asc;

select e.name, e.age from employee as e where e.age > 15 order by age asc;

```




### 23-23. 基础-SQL-DQL小结
小结，SQL 书写顺序和主要用途

```sql
SELECT
	字段列表 AS 别名
FROM 
	数据库表名
WHERE
	条件列表（> = < <> like between...and... in() and or）
GROUP BY
	分组字段
HAVING
	分组后过滤
ORDER BY
	排序字段（ASC DESC）
LIMIT
	分页参数（开始索引，每页数量）


```




### 24-24. 基础-SQL-DCL-用户管理
data control language 数据控制语句，用于管理数据库用户，控制用户访问数据库的权限。

数据库的用户在 mysql 这个数据库中存放

可以增加用户，更改用户，删除用户

通常使用用户名+主机两个字段验证

一般普通的开发人员用不到，这个只有数据库管理人员使用

默认新建的角色没有任何权限

```sql
# 查询
use mysql;
select * from user;

# 创建 mike 主机名为 localhost 密码是 123456
create user 'mike'@'localhost' identified by '123456';

# 修改
alter user 'mike'@'localhost' identified with mysql_naitve_password BY '654321';

alter user 'julia'@'%' identified with mysql_native_password BY 'JULIA';

# 删除
drop user 'mike'@'localhost';

```

注意：主机名可以使用通配符，或者本机 localhost，或者网络上的某个主机




### 25-25. 基础-SQL-DCL-权限控制
可以设置某个用户对于某个数据库和某个表的权限

可以使用通配符表示全部数据库和全部表（实际上不会这样做）

可以查询权限和删除权限

关键字是 grant

MYSQL 定义的权限：

* ALL 全部权限 ALL PRIVILEGES
* SELECT
* INSERT
* UPDATE
* DELETE
* ALTER 修改表
* DROP 删除数据库、数据库表、视图
* CREATE

案例

```sql
# 删除
drop user 'mike'@'localhost';

# 查询
show grants for 'mike'@'%';

# 授予 mike novel 全部数据表的权限
grant all on novel.* to 'mike'@'%';

# 撤销权限
revoke all on novel.* from 'mike'@'主机名';

```




### 26-26. 基础-SQL-DCL小结
DCL 分为

* 用户管理:设置某个用户可以访问数据库软件
* 权限管理:设置某个用户访问的具体数据库和表的权限

DCL 了解即可

```sql
create user 'mike'@'localhost' identified by '1234';

alter user 'mike'@'localhost' identified with mysql_native_password by '4321';

drop user 'mike'@'localhost';

grant all on novel.comments to 'julia'@'*';

revoke all on novel.comments from 'julia'@'*';

```

**DQL语法是基础的重点，务必全部掌握**




### 27-27. 基础-函数-字符串函数
#### 函数

这里指的是 mysql 内置函数，不需要我们手写函数，需要知道内置函数的使用。

函数分为：字符串函数、数值函数、日期函数、逻辑函数（流程函数）

#### 字符串函数

可以更新数据库表中的字符串信息

```sql
# 拼接字符串
concat(str1, str2, str3) 
lower
upper

# 左右补齐
lpad
rpad

trim
# 截取字符串
substring(str, start, length) 

```

#### 案例

1、原来表格中序号都是12345，现在需要在前面补0

这里使用变量 worknumber 即可，不需要先select

```sql
update employee set worknumber = lpad(worknumber, 5, "0");

```

2、原来username中大小写都有，现在都需要转换成小写，也可以使用相关函数

```sql
update employee set username = lower(username);

```

3、综合

```sql
select concat('Mike', ' ', 'John');

select upper('Hello');

select lower('Hello');

select lpad('01', 5, '-'); # ---01

select rpad('01', 5, '-'); # 01---

select substring('Hello world', 1, 5); # Hello

select trim(' Hello ');

```




### 28-28. 基础-函数-数值函数
### 数值函数

```sql
ceil();
floor();
mod(x, y);
rand();
round(x, y) # x 进行四舍五入，小数点后 y 位有效数字

```

实例

```sql
select ceil(1.2);
select floor(1.2);
select mod(9, 4);
select rand();
select round(2.345, 1);

```

案例：生成一个6位数的随机验证码，使用三个函数

```sql
select lpad(round(rand() * 100000, 0), 6, '0');

```




### 29-29. 基础-函数-日期函数
### 日期函数

```sql
curdate();

curtime();

now();

year(date);

month(date);

day(date);

date_add(date, interval expr type) # 增加时间

datediff(date1, date2)

```

实际案例

```sql
select year(now()), month(now()), day(now());

select date_add(now(), INTERVAL 70 DAY); # 现在的时间增加70天

select datediff('2021-12-01', '2021-10-01');

```

获取公司入职三年内的员工，全体女员工，并按照倒序排列

```sql
select name, datediff(currdate(), entrydate) as 'entrydays' from employee order by entrydays desc;

```

TODO：时区设置

实际问题：mysql 服务器设置的默认市区是 System 系统时间，如果 mysql 中设置的时间是伦敦时区，那么如果在东八区运行的服务，就可能产生不一样的时间。

```sql
SELECT @@global.time_zone;

SELECT @@session.time_zone; 

-- 现在这个会报错，看一下是为什么
-- Query 1 ERROR at Line 5: : Unknown or incorrect time zone: 'Asia/Shanghai'
-- 可能是数据库系统表中缺少对应的时区字段
SET time_zone = 'Asia/Shanghai';

```

参考：<https://blog.csdn.net/weixin_44816664/article/details/132766459> 




### 30-30. 基础-函数-逻辑函数
实际上是逻辑函数

if 

ifnull

case when then when then else end

```sql
if (value, result1, result2) # 类似 value ? result1 : result2

ifnull(result1, result2) # 类似 result1 || result2; 这里 result1 可以是空字符串

case when val1 then res1 when val2 when res2 else res3 end;

```

实际案例

```sql
select if(false, 'OK', 'Error');

select ifnull('OK', 'Default');

select ifnull('', 'default');

select ifnull(null, 'Default');

```

复杂案例：从员工表中查找员工，如果是北京，改写成一线城市，其他的是二线城市

```sql
select 
	name,
	case address when '北京' then '一线城市' else '二线城市' end
from employee;


select 
	name,
	(case address when '北京' then '一线城市' when '上海' then '一线城市' else '二线城市' end) as '工作地址'
from employee;

```




### 31-31. 基础-函数-小结
字符串函数

数学函数

日期函数

逻辑函数（流程函数）

```
concat
lower
upper
lpad
rpad
trim
substring

ceil
floor
mod
rand
round

curdate
curtime
now
year
month
day
date_add
datediff

if
ifnull
case...when...then...else...end

```




### 32-32. 基础-约束-概述
### 约束的概念

约束：设置一定的规范，约束限制表中的字段的数据。

约束的目的：数据正确性、有效性、完整性

约束分类

* 非空约束 NOT NULL
* 唯一约束（身份证，手机号）UNIQUE
* 主键约束 PRIMARY KEY，一行数据唯一标识，非空且唯一
* 外键约束 FOREIGN KEY，让两个表建立联系，保证数据一致性完整性
* 默认约束 DEFAULT
* 检查约束 CHECK

约束作用于具体字段，在创建或者修改表时，增加约束




### 33-33. 基础-约束-演示
### 常用约束条件演示

用户表的需求

| 字段名      | 含义   | 类型          | 约束条件      | 约束关键字                       |
| :------- | :--- | :---------- | :-------- | :-------------------------- |
| id       | 唯一标识 | int         | 主键，自增长    | PRIMARY_KEY, AUTO_INCREMENT |
| username |      | varchar(10) | 唯一，不为空    | NOT NULL,UNIQUE             |
| age      |      | int         | 检查 0——100 | CHECK                       |
| status   |      | char(1)     | 默认值为 ‘1’  | DEFAULT                     |
| gender   |      | char(1)     | 无         |                             |

建表语句

```sql
CREATE TABLE user (
	id int primary key auto_increment comment '主键',
	username varchar(10) not null unique,
	age int check( age > 0 && age <= 100 ),
	status char(1) default '1',
	gender char(1),
) comment 'user information by michael an';

```

插入数据验证

```sql
# id 自动生成，不需要插入
INSERT INTO user(username, age, status, gender) values ('tom', 20, '1', '1'),  ('tom2', 22, '1', '1');

# 如果 name 是空，执行错误（但是 ID 已经自增长，使用了这个序号）
INSERT INTO user(username, age, status, gender) values (null, 20, '1', '1');
INSERT INTO user(username, age, status, gender) values ('Tony', -20, '1', '1');

```

如果图形化界面，通常有对应的 GUI 可以勾选并设置字段的约束条件




### 34-34. 基础-约束-外键约束
### 外键约束

外键：保证了两张表的完整性和一致性，建立表的联系。父表中更新某些数据，子表中原始的数据不会自动更新，所以需要外键。如果没有外键，那么多个表互相独立，不方便管理，就失去了 mysql 的意义。

外键约束：在父表和子表中，都设置主键，然后把父表的主键，作为子表的外键，就实现了外键约束。这个过程需要建立约束的 SQL 语句。

语句

```sql
ALTER TABLE 子表 ADD CONSTRAINT 外键名称 FOREIGN KEY (子表中的外键) REFERENCES 主表(主表的主键);

ALTER TABLE 子表 DROP FOREIGN KEY 外键名称；

```

案例

```sql
# 创建部门表（父表）
create table dept (
	id int auto_increment primary key,
	name varchar(10) not null
) comment '部门表，父表';

# 增加部门
insert into dept(name) values('产品部'), ('销售部'), ('行政部');

# 创建员工表（子表）
create table emp(
	id int auto_increment primary key,
	name varchar(50) not null unique,
	age int(2) check(age > 0 && age < 100),
	job varchar(20),
	salary int,
	entrydate date,
	manager_id int,
	dept_id int comment '部门ID，需要设置成外键'
) comment '员工表，字表';

# 增加员工
insert into emp(id, name, age, job, salary, entrydate, manager_id, dept_id) values ('1', 'mike', 20, 'saler', 20000, '2022-01-01', 1, 1);

# 创建部门表和员工表的外键约束
alter table emp add constraint emp_dept_foreign_key foreign key (dept_id) references dept(id);

# 建立约束后，如果在主表内删除 id 但是子表中使用了这个 id, 那么会显示删除错误，SQL 语句不能执行

# 删除部门表和员工表的外键约束
alter table emp drop foreign key emp_dept_foreign_key;

```




### 35-35. 基础-约束-外键删除更新行为
设置两个表外键约束后，如果涉及到父表的删除和更新行为，那么有三种规则可以选择

* No action 或者 restrict: 不允许更改数据，这是默认的行为
* cascade: 父表删除行，子表中 cascade 级联操作，删除对应的数据，子表中也删除对应的行；更新数据时可以联动更新。
* set null: 父表删除行，子表中把对应的数据设置成 null ——前提是这个外键允许设置为 null
* set default：Innodb 不支持，不用学

```sql
xxx on update cascade on delete cascade;

alter table 子表名 add constraint 外键名称 foreign key （子表中的外键名） references 父表名（父表主键）on update cascade on delete cascade;

```

如果是图形化界面，直接点击可以设置 update rule delete rule

<img width="477" src="https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1703395096577.png" />




### 36-36. 基础-约束-小结
约束条件

* 不为空 not null
* 唯一 unique
* 主键约束 auto_increment primary key
* 外键约束 foreign key 
* 默认约束 default
* 检查约束 check




### 37-37. 基础-多表查询-多表关系介绍
### 第五章 多表查询

这部分内容较多，包括

多表关系

多表查询

内连接

外连接

自连接

子查询

实际案例

### 三种多表关系

两个数据库表之间有三种关系

**1、一对多，就是用户表和评论表**

一个用户有多个评论，但是每一个评论只能有一个用户。那么此时用户就是父表，评论就是子表，可以建立连接关系。

一个学生在一个班级，一个班级中有很多学生。那么班级就是父表，用户就是子表，可以建立连接关系。

**2、多对多，就是用户表和图书表**

一个用户可以拥有多个电子图书，同时每一本电子书可以被不同用户学习。此时需要新建一个中间表，分别设置用户表和图书表的外键。（user_book 用户图书关系表）

**3、一对一，就是用户表和用户详情表**

如果某一个单表（用户）字段特别多，包括很多信息，那么通常会做单表拆分，拆成多个表格。例如用户的基本信息表，用户受教育信息表，用户家庭情况表等。这些表中，ID 都是唯一的，就是一对一的关系。此时需要设置一个外键，并设置外键唯一，即可解决一对一的关系。

**总之：复杂的产品结构，先分析业务需求，拆分成不同模块，清楚逻辑关系，再完成 SQL 语句。**

（例如淘宝的购物车表，商品表，库存表等）（小说阅读器的用户表，图书表，评论表）

#### 案例

一对多的情况，已经在主键和外键部分演示过了，这里主要学习 多对多 和 一对一 的情况。

多对多的案例（学生和课程的对应关系）

```sql
# 学生表
create table student(
  id int auto_increment primary key,
  name varchar(10),
  number varchar(10) comment '学号',
);

insert into student values(null, 'Mike', '001'), (null, 'John', '002'), (null, 'To', '003');

# 课程表
create table course(
  id int auto_increment primary key,
  name varchar(10),
);

insert into course values(null, 'Java'), (null, 'PHP'), (null, 'JS');

# 多对多关系，创建关联表
create table student_course(
  id int auto_increment primary key,
  studentid int not null,
  courseid int not null,
  # 创建外键和两个表的关联关系
  constraint fk_courseid foreign key(courseid) references course (id),
  constraint fk_studentid foreign key(studentid) references student (id),
) comment '学生课程中间表';

insert into student_course values(null, 1, 1), (null, 1, 2), (null, 1, 3);

```

一对一的关系（用户表和用户详情表的关系）

用户表存放基础字段，用户详情表存放某个领域字段，以提升存储的查询效率。

解决：一个表中插入外键，并设置外键唯一（unique）

```sql
create table user_basic(
  id int auto_increment primary key,
  name varchar(10),
  age int,
  gender char(1),
) comment '用户基本信息表';

create table user_detail(
  id int auto_increment primary key,
  degree varchar(20),
  major varchar(50),
  # 外键
  userid int unique comment '用户ID',
  constraint fk_userid foreign key (userid) references user_basic(id);
) comment '用户详情信息表';

```




### 38-38. 基础-多表查询-概述
多表查询概述

> 笛卡尔积：两个集合的乘积

这样获取的就是两个表的笛卡尔积，就是每一项相乘的结果，不是我们需要的数据。我们需要根据主键和外键相同的字段的结果，不是把每一项都乘积。

```sql
# 这样获取的就是两个表的笛卡尔积
select * from table1, table2;

# 下面改进后，可以返回正确的值
select * from table1, table2 where table1.dept_id = dtable2.id;

```

如果有用户只存在于第一个表，不在交集中，那么这样就会漏掉这部分用户（例如新来的同事，还没有分配到部门中），那么就需要外连接实现（左外连接，或者右外连接）



多表查询分类：



\- 内连接（上面的案例）

\- 左外连接 39

\- 右外连接 40

\- 自连接 41

\- 子查询 43




### 39-39. 基础-多表查询-内连接
内连接，表示两个数据库表的交集，两种语法

```sql
# 隐式内连接
select * from table1, table2 where table1.dept_id = table2.id;

# 显式内连接
select * from table1 inner join table2 on table1.dept_id = table2.id;

```

隐式内连接实例

```sql
select employee.name, department.name from employee, department where employee.dept_id = department.id;

select e.name, d.name from employee e, department d where e.dept_id = d.id;
# 注意：如果使用别名，后续 where 也需要使用别名，全名无效

```

显式内连接 实例

```sql
select e.name, d.name from emp e inner join dept d on e.dept_id = d.id;

```




### 40-40. 基础-多表查询-外连接
外连接：两个表的交集 + 一个表的全部信息

分为左外连接和右外连接，实际上左外连接使用较多。左外连接和右外连接可以互相转换（实现相同功能），例如下面的查询语句结果是等价的。

```sql
select * from table1 left [outer] join table2 on 条件;

select * from table2 right [outer] join table1 on 条件;

```

实际案例：

```sql
# 查询员工表的全部信息 + 所在部门表的信息
select e.*, d.name from employee as e left outer join department as d on e.dept_id = d.id;

# 查询部门表的全部信息 + 所有的员工的信息
select d.*, e.* from employee as e right outer join department as d on e.dept_id = d.id;

# 上面也可以转换成左连接(两个表调换顺序)，实现相同的效果
select d.*, e.* from department as d left join employee as e on e.dept_id = d.id;

```




### 41-41. 基础-多表查询-自连接
自连接：一个表的连接关系。

自连接可以支持内连接，也可以支持外连接。

使用语法：

```sql
SELECT * FROM TABLE1 A, TABLE1 B WHERE A.NAME = B.BOSS_NAME; 

```

实际案例：员工表中，找到用户和对应的领导关系并输出。

```sql
# 内连接查询领导和员工对应的信息
select a.name '员工', b.name '领导' from emp a, emp b where a.manager_id = b.id;

```

如果需要查询结果包括顶层领导（即 manager_id is null），那么需要左外连接实现

```sql
select a.name '员工', b.name '领导' from emp a left join emp b on a.manager_id = b.id;

```




### 42-42. 基础-多表查询-联合查询 union
联合查询：就是把两个 SQL 语句查询两个表（并列查询关系），如果结果的列一样(列数一样，字段类型一样)，直接合并到一起。

不去重就使用 union all，去重就使用 union

```sql
SELECT city FROM customers
UNION
SELECT city FROM suppliers;

```

实际案例

```sql
select * from employee1 where salary < 10000
union all
select * from employee2 where age > 40;

```

> 参考链接：<https://www.runoob.com/mysql/mysql-union-operation.html> 




### 43-43. 基础-多表查询-子查询介绍
子查询：一个 select 语句嵌套另一个 select 语句，嵌套查询

子查询外部的 sql 语句，可以是 select insert update delete 语句。内部的查询语句是 select 。

根据子查询结果的分类（4）：

* 一行一列（就是一个值）：标量子查询
* 多行：行子查询
* 多列：列子查询
* 多行多列：表子查询




### 44-44. 基础-多表查询-标量子查询
标量子查询：查询结果是一个值的情况。

先把查询需求，拆分成两个查询语句，然后再实现子查询结构

```sql
# 查询销售部员工的全部信息
select id from dept where name = '销售部';
select * from emp where dept_id = '20';

select * from emp where dept = (select id from dept where name = '销售部');

select * from emp where entry_date > (select entry_date from emp where name = 'Mike');

```




### 45-45. 基础-多表查询-列子查询
列子查询：子查询返回的结果是一列

常用操作符：in, not in, any, some, all 不能直接使用 max 等函数处理。some = any 

```sql
# 需求1：查询销售部或者技术部全部员工信息

select id from dept where name = '销售部' or name = '技术部';

select * from emp where empt_id in (2, 4);

# 组合起来就是
select * from emp where empt_id in (select id from dept where name = '销售部' or name = '技术部');

```

实例2

```sql
# 查询比财务部全部人员工资都高的人, 分成三步实现

select id from dept where id = '财务部';

select salary from emp where dept_id = (select id from dept where id = '财务部');

select * from emp where salary > all (select salary from emp where dept_id = (select id from dept where id = '财务部'));

# 查询比财务部全部人员任意一个工资高的人, 需要把 all 改成 any 或者 some
select * from emp where salary > any (select salary from emp where dept_id = (select id from dept where id = '财务部'));

```




### 46-46. 基础-多表查询-行子查询
行子查询：

子查询结果是一行的情况

```sql
select * from table2 where (字段1， 字段2) =（select 字段1， 字段2 from table1）

```

```sql
# 需求：查询与小明薪资和领导相同的其他员工

select salary, managerid from emp where name = 'Mike'; # 10000, 3

select * from emp where salary = 10000 and managerid = '3';

# 换一种写法
select * from emp where (salary, managerid) = (10000, '3');

# 结合第一句的查询结果，写成一句 sql
select * from emp where (salary, managerid) = (select salary, managerid from emp where name = 'Mike');

```




### 47-47. 基础-多表查询-表子查询
表子查询，在行子查询的基础上，增加多行即可，变成 in

```sql
select * from table2 where (字段1， 字段2) in（select 字段1， 字段2 from table1）

```

需求1：查询与 Tom Mike 薪资和领导相同的其他员工（结合上一节的案例）

```sql
select * from emp where (salary, managerid) in (select salary, managerid from emp where name = 'Mike' or name = 'Tom');

```

需求2：一个表的表子查询，继续作为另一个 sql 查询的表

```sql
select * from emp where entrydate > '2022';

select * from (select * from emp where entrydate > '2022') AS e left join dept AS d ON e.dept_id = d.id;

```




### 48-48. 基础-多表查询-练习1
根据需求完成案例练习（多表查询）

#### 准备

需要三个表：员工表、部门表、薪资等级表。

员工表和部门表是已有的表。部门表有主键，员工表有对应的外键。

其中薪资等级表，表示不同阶段薪资员工的等级。薪资登记表和其他的表没有关联的外键。

```sql
create table salgrade (
	grade int comment '评级，例如12345',
	losal int comment 'low sale 下限',
	hisal int comment 'high sale 上限',
) comment '薪资登记表';

insert into salgrade values (1, 0, 10000);
insert into salgrade values (2, 10000, 50000);
insert into salgrade values (3, 50000, 100000);

```

#### 案例1

需求：查询员工姓名、年龄、部门（需要隐式内连接）

表：员工表 emp、部门表 dept

连接条件：emp.dept_id = dept.id

```sql
select e.name, e.age, d.name from emp e, dept d where e.dept_id = d.id;

```

#### 案例2

需求：查询员工姓名、年龄、部门（需要显式内连接）年龄小于 30岁

表：员工表 emp、部门表 dept

连接条件：emp.dept_id = dept.id

```sql
select e.name, e.age, d.name from emp e inner join dept d on e.dept_id = d.id where e.age < 30;

```

#### 案例3

需求 查询非空部门的 ID 和名称（部门必须有人），注意 distinct

表：员工表 emp、部门表 dept

连接条件：emp.dept_id = dept.id

```sql
select distinct d.name, d.id from emp e, dept d where e.dept_id = d.id;

```

#### 案例4

需求 查询年龄大于40岁的员工，以及归属的部门信息

表：员工表 emp、部门表 dept

连接条件：emp.dept_id = dept.id

```sql
select e.*, d.name from emp as e left join dept as d on e.dept_id = d.id where e.age > 40;

```

#### 案例5

需求 查询所有员工的工资级别

表：员工表 emp 薪资等级表 salgrade

连接条件：无外键，所以 emp.salary > salgrade.losal and emp.salary \<= salgrade.hisal

```sql
select e.*, s.level from emp e, salgrade s where e.salary > s.losal and e.salary <= s.hisal;

# 优化语句
select e.*, s.level from emp e, salgrade s where e.salary between e.salary and s.hisal;

```




### 49-49. 基础-多表查询-练习2
根据需求完成案例练习（多表查询）7 个案例

#### 案例6

查询研发部所有员工信息和工资等级

表 emp dept salgrade

```sql
select e.*, d.name, s.level from emp e, dept d, salgrade s where (e.dept_id = d.id) and (e.salary between s.losal and s.hisal) and (d.name = '研发部');

# 如果条件比较多，可以格式化一下
select
	e.*,
	d.name,
	s.level
from
	emp e,
	dept d,
	salgrade s
where (e.dept_id = d.id)
	and (e.salary between s.losal and s.hisal)
	and (d.name = '研发部');

```

#### 案例7

查询研发部员工的平均工资

表：emp, dept

```sql
select avg(e.salary) from emp e, dept d where emp.dept_id = d.id and d.name = '研发部';

```

#### 案例8

查询工资比 Mike 高的员工信息

表 emp

```sql
# 第一步获取 mike 的工资，然后联合查询
select e.salary from emp e where e.name = 'Mike';

select * from emp e where e.salary > (select e.salary from emp e where e.name = 'Mike');

```

#### 案例9

查询比平均工资高的员工信息

表 emp

```sql
# 第一步获取平均工资
select avg(salary) from emp;

select * from emp where emp.salary > (select avg(salary) from emp);

```

#### 案例10

查询低于本部门平均工资的员工信息

表 emp

```sql
# 查询某部门的平均工资
select avg(e.salary) from emp e where e.dept_id = 1;

# 查询本部门低于平均工资的员工信息
select * from emp e2 where e2.salary < (select avg(e1.salary) from emp e1 where e1.dept_id = e2.dept_id);

```

#### 案例11

查询所有部门信息，并统计部门的人数

```sql
# 查询某一个部门的人数（类似案例10）
select count(*) from emp e1 where e1.dept_id = 1;

select d.id, d.name, (select count(*) from emp where emp.dept_id = d.id) '部门人数' from dept d;

```

#### 案例12

多对多的查询情况（学生和选课表）

查询所有学生的选课情况

表 student course 是多对多，所以有中间表 student_course

连接条件 student 和 course 有主键，student_course 有外键

查询条件 student.id = student_course.student_id, sourse.id = student_course.course_id

```sql
select s.name, c.name from student s, course c, student_course sc where s.id = sc.student_id and c.id = sc.course_id;

```




### 50-50. 基础-多表查询-小结
#### 多表关系

* 一对多：多的一方设置外键，关联到少的一方的主键。例如用户和评论表。
* 多对多：专门建立中间表，存放两个外键，关联到两个主表的主键。例如学生和选课表。
* 一对一：设置一个表外键（UNIQUE 确保一对一），关联到主表的主键。例如用户表和用户受教育表。

#### 多表查询

1、内连接：查询两个表交集（inner join）

隐式 (table1，table2 where)：select \* from table1, table2 where table1.id = table2.id 

显式（table1 inner join table2, on）: select \* from table1 inner join table2 on table1.id = table2.id 

2、外连接：查询两个表并集（left join/right join）

3、自连接：select \* from table1 as a, table1 as b where ...

4、子查询：select 多层嵌套。根据查询结果分成：标量子查询、列子查询、行子查询、表子查询








### 51-51. 基础-事务-简介
事务介绍

事务操作

事务四大特性（考点）

并发事务造成3个问题

事务隔离的四个级别

#### 事务概述

事务是一组操作的集合，是一个最小的不可分割的工作单位，事务可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行。

MySQL 事务主要用于处理操作量大，复杂度高的数据。事务是一组SQL语句的执行，它们被视为一个单独的工作单元。

事务用来管理 **insert、update、delete** 语句。

> 其他参考：<https://www.runoob.com/mysql/mysql-transaction.html> 

案例：两个人银行卡转账，第一个人账户减少，第二个人账户增加，这是一个事务

默认 mysql 是自动提交事务（执行一个 DML 语句，mysql 会立即隐式提交事务）




### 52-52. 基础-事务-操作演示
实际案例：转账操作：

```sql
# 1 查询 mike 用户存在，且余额大于1000; 查询 amy 用户存在
select * from account where name = 'mike' and money > 1000;
select * from account where name = 'amy'; 

# 2 mike 账户减少1000
update account set money = money - 1000 where name = 'mike';

# 3 amy 账户增加1000
update account set money = money + 1000 where name = 'amy';

```

设置事务的提交方式，然后执行 SQL，执行正确就提交事务，执行错误就回滚事务。

```sql
# 第一种方法：设置当前会话的事务
SELECT @@autocommit;
SET @@autocommit = 0;

# 第二章方法：
start transaction;

commit;

rollback;

```

那么增加了事务后的转账操作

```sql
start transaction;

# 1 查询 mike 用户存在，且余额大于1000（todo）
select﻿ ﻿*﻿ ﻿from﻿ account ﻿where﻿ name ﻿=﻿ ﻿'mike'﻿;

﻿
# 2 mike 账户减少1000
update﻿ account ﻿set﻿ money ﻿=﻿ money ﻿-﻿ ﻿1000﻿ ﻿where﻿ name ﻿=﻿ ﻿'Mike'﻿;

﻿
# 3 amy 账户增加1000
update﻿ account ﻿set﻿ money ﻿=﻿ money ﻿+﻿ ﻿1000﻿ ﻿where﻿ name ﻿=﻿ ﻿'Amy'﻿;


# 如果执行成功，提交事务
commit﻿;

# 如果执行失败（mike 金额小于1000，扣款失败），不提交事务
rollback﻿;

```




### 53-53. 基础-事务-四大特性ACID
事务是必须满足4个条件（ACID）：

原子性（**A**tomicity，或称不可分割性）：事务是不可分割的最小操作单元。要么全部成功，要么全部失败。

一致性（**C**onsistency）：所有的操作执行结果一致，要么执行成功，要么执行失败。事务完成后，底层数据要么全部更新，要么全部不变。

隔离性（**I**solation，又称独立性）：数据库系统提供的隔离系统，保证并发的事务可以正常运行。

持久性（**D**urability）：事务一旦提交或者回滚，默认直接写入硬盘，就是写入持久层（硬盘上的文件）。




### 54-54. 基础-事务-并发事务问题
事务并发，可能造成3个问题，所以使用事务隔离级别避免这三个问题

并发状态下，不同事务读取数据库时，可能存在冲突或者错误。

* 脏读：一个事务读取到另一个事务没有提交的数据
* 不可重复读：A事务读取一个数据，B事务修改了数据，A事务读取同一个数据，数据不同。
* 幻读：A事务查询行不存在，B事务插入了一行，A事务继续插入行报错，A事务查询航但是不存在，出现行的幻读。

![](https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1703988216105.png)




### 55-55. 基础-事务-并发事务演示及隔离级别
有四种事务隔离级别

![](https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1703988539332.png)

```
查看事务隔离级别
select @@transaction_isolation;

设置事务隔离级别
set [session|global] transaction isolation level [repeatable read] 上面四选一

```

4、串行化：并发事务时，只允许一个事务操作（类似加锁，性能比较差）

默认 mysql 的事件隔离级别不需要修改 

事务隔离级别越高，安全性越好，性能越低。安全性最好的性能最差；安全性不太好的性能好。




### 56-56. 基础-事务-小结
1、事务是一组操作的集合，事务内的操作可以全部执行成功，否则全部执行失败。

2、事务操作

start transaction 开启事务

commit 提交事务

rollback 回滚事务

3、事务的四大特征

原子性

一致性

隔离性

持久性

4、事务并发问题：脏读、不可重复读、幻读

5、事务隔离级别：读取未提交、读取已提交（oracle）、重复读（mysql）、序列化






### 57-57. 基础篇总结
基础篇知识框架

```
MYSQL 概述

SQL 语法（DCL，DQL，DML）

函数（文本函数、数学函数、日期函数）

约束（外键约束，非空约束，唯一约束）

多表查询（内连接，外连接，子查询）

事务（属性，原子性，一致性，隔离性，持久性）

```

要求：掌握基本 SQL 概念，可以使用基本的增删改查语句。（不考虑性能问题）




### 58-01. 进阶-课程介绍
mysql 进阶篇的主要内容

* 存储引擎-innoDB
* 索引
* SQL 优化
* 视图、存储过程、触发器
* 锁
* mysql 管理




### 59-02. 进阶-存储引擎-MySQL体系结构
MYSQL 服务器内部体系结构，分成四层：

客户端中（PHP python Ruby）调用第一层的API完成交互

1、连接层：mysql 的 API，支持用户登录验证，权限验证，连接限制、缓存、内存检查等。

2、服务层：mysql 服务器的核心功能，SQL 接口、SQL 解析器、缓存、SQL 查询优化器、函数

3、引擎层：mysql 服务器和存储引擎进行通信，不同存储引擎有不同的功能（内存、索引、存储管理）

4、存储层：把数据写入到文件系统中，完成与存储引擎的交互





![](https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1704153556510.png)




### 60-03. 进阶-存储引擎-简介
引擎：mysql 存储数据、建立索引、查询更新数据的底层实现方式。存储引擎基于表结构，也称为表类型。一个数据库中不同表可以选择不同的存储引擎。

```sql
# 查询建表语句
show create table account;

# 创建表，指定存储引擎类型（或者使用默认的 innodb）
create table emp (
	id int,
	name varchar(10)
) engine=INNODB 


# 查询当前支持的引擎和特征
show engines;

```

其他的引擎：MyISAM Memory






### 61-04. 进阶-存储引擎-InnoDB介绍
存储引擎的特点

InnoDB: 当前 mysql 使用的高性能和高可靠性的存储引擎，三个特点：

1、支持事务：DML 操作遵循 ACID 模型（插入、更新、删除）（ACID 原子性，一致性、隔离性、持久性）

2、支持外键（外键约束，保证数据完整性和正确性）

3、支持行级锁（提高并发访问性能）

对应磁盘的 xxx.ibd 文件，文件存储表结构、数据、索引

InnoDB 逻辑存储结构：TableSpace Segment Extent(每一个1M) Page（每一个16k） Row 五层




### 62-05. 进阶-存储引擎-MyISAM和Memory
本节介绍另外两个存储引擎：MyISAM Memory

#### MyISAM

不支持事务、不支持外键、不支持行锁。支持表锁，访问速度快。分成三个文件存储表结构信息、表数据、表索引。

#### Memory

在内存中存放，只能存放临时数据和缓存，默认是哈希索引，只有 sdi 文件，存储表的结构

![](https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1704201477556.png)




### 63-06. 进阶-存储引擎-选择
MYSQL 这里学三种存储引擎。

* 默认使用 InnoDB 存储引擎（实际使用最多）
* MyISAM 是早期的引擎，现在被 MongoDB 替代，详细课程 <https://www.bilibili.com/video/BV1bJ411x7mq/?> 
* Memory 被 redis 替代，详细课程 <https://www.bilibili.com/video/BV1cr4y1671t/> 

这些都是单独的课程和内容，内容也比较多，后续有机会再学

如何选择存储引擎？根据应用的特点选择合适的引擎。如果应用系统复杂，可以选择多种引擎（一个表对应一个引擎，一个数据库中可以对应多个引擎）

下面是三个引擎的具体对比，后两个了解即可。

![](https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1704192458018.png)




### 64-07. 进阶-存储引擎-小结
存储引擎小结：

1、MYSQL 服务器四层体系结构：连接层、服务层、引擎层、存储层

2、存储引擎介绍

```sql
show engines;

craete table emp() engine=INNODB;

```

3、innodb 相对于 MyIsam 的优点：支持外键、支持事务、支持行级锁

4、存储引擎使用：innodb 对于数据和事务要求较高的核心业务，其他的引擎用于日志等非核心业务（实际使用其他数据库完成）




### 66-09. 进阶-索引-概述
参考链接：<https://www.runoob.com/mysql/mysql-index.html> 

#### 为什么使用索引

当数据量比较大时，查询原始表速度较慢，增加索引后可以大大加快查询速度。

索引实际上就是一个指针，指向真实的数据，执行 DQL 语句时，不需要查询原始表，查询索引表即可获取数据。

#### 怎样建立索引

在一个数据库表中，选择 where 查询的一列或者多列，作为索引的列。类似从数组中遍历一个数据，和从对象中映射一个数据，索引就是对象的键。

语句：在 students 表中的 name 字段，建立一个索引，索引名称是 idx_name。

```sql
CREATE INDEX idx_name ON students (name);

```

#### 索引的问题

索引实际是一个表，建立索引页需要一定时间。索引表自身也会占用一些空间，所以索引不是越多越好。

当原始表中增删改一些数据，对应索引表也需要更改数据（使查询加快，但是增删改变慢）。




### 121-64. 进阶-锁-介绍
基本情况：

当多条语句执行时，为了避免同时更改一个数据，mysql 设置了锁。

当某一个语句执行时，先锁定当前的表或者行，执行耗时。期间其他的语句执行时，发现对象是锁定的，所以暂停执行。当第一个语句执行完成，解锁，后续的语句才能执行。这就是锁的基本概念。

存在的问题和优化（例如慢查询）：某些语句执行时会锁定整个表，这样就会阻塞其他语句执行，造成查询慢等情况。这种情况可以增加索引，让表锁变成行锁，加快查询的速度。




