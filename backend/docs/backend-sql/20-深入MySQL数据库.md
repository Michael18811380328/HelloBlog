# 如何自学 MySQL 数据库

2021-07-23

## MySQL 知识体系

基础：

- sql 语句
- 表结构设计

调优：

- 索引、慢查询优化
- 配置参数调优

核心原理：

- InnoDb 存储引擎 （包括隔离级别、事务、锁、缓存池、回滚日志等等）
- Mysqld (包括连接管理、进程管理、查询缓存、查询优化、日志等等)

架构与运维：

- 用户与权限、安全
- 备份与恢复
- 日志
- 分布式与高可用

## MySQL 零基础图解

首先，学习基本的 SQL 语法。你就可以编写 SQL 语句了。推荐：W3Schools 的 [SQL 教程](https://link.zhihu.com/?target=http%3A//www.w3school.com.cn/sql/)。

其次，学习数据库的主要功能和使用方法，比如用户相关或者权限相关等等。

我推荐两本书：

一、《MySQL 必知必会》 这本书讲的非常全，从基本概念，到查询到插入新建表，用户的管理，都有具体的例子，非常适合没有任何基础的同学来学习 Mysql，总之这本书学习的方法就是：1、十分钟了解下数据库的基本概念 2、找到练手的数据库 3、对照着上面的内容去敲。本书里也有大量的内容是讲 sql 的，可以结合 w3c 的 sql 教程一起，有取舍地看。

二、《数据库系统概念》这本书是 dba 必看的。

看完这些并且实践+思考之后，可以算入门了。

## MySQL 深入学习

我推荐几本书（很多大神都这么推荐），《高性能 MySQL(第 3 版)》、 《MySQL 技术内幕(第 4 版)》，《MySQL 技术内幕 InnoDB 存储引擎》，《深入理解 MySQL》还有 Mysql 的官网。读完这些东西，再加些丰富的经验，理论上来讲就具备 DBA 的水平了。

十分推荐阅读[Planet MySQL](https://link.zhihu.com/?target=http%3A//planet.mysql.com/)上汇总的博客，特别是[Percona's MySQL & InnoDB performance and scalability blog](https://link.zhihu.com/?target=http%3A//www.percona.com/blog/).

我问你，面对一个并发量比较高的场景，如何配置 mysql 的连接数？

你可能会回答：“哦，就是调高 max_connection 的数值吧。”

那，你有没有思考过调到多少是最合适的呢？为什么这样设置就最合适呢？

也许你会回答：“恩我知道，可以看系统之前的 max\__used_\_connection 的数值，然后来设置。也可以调高 back_log 的值。”

那你有没有思考过，max_connection 连接数太高会有什么不好的影响呢？back_log 设置的太高有什么不好的地方呢？max_connect 的上限其实是取决于 mysql 能获得的文件描述符的数量，也就是说你就算设置成 10000，最后也是没用的，系统会根据机器的情况自动调低。

也许你会回答：“恩我知道，设置太高，会有系统开销...”

那你有没有思考过，这些开销具体是什么呢？是什么工作导致了需要这些内存开销？

也许你还会回答，在连接创建的时候，会立刻为它分配连接缓冲区以及查询缓冲区，这些都会吃内存。

那你有没有思考过，占据的资源具体是多少呢？取决于哪些因素呢？

如何自学 mysql? 你必须不断思考，才能在工作中面对具体场景的时候，非常淡定地推断：“哦，一定是这里出了问题。应该怎么怎么做。”

面对问题，拿出打破砂锅问到底的精神，先思考一番，给出自己的假设，不要着急地去找度娘，谷歌。思考过后，带着你的推断或者答案，大胆地去搜索吧！去看看别人的见解，去看看官方的描述！

这才是一个工程师应有的态度。

## 学习资料

### 电子书

我认为多看书还是有好处的。有些书值得反复看许多遍，有时候只看一遍无法深刻理解吸收，思考也不够充分。

**[电子书下载传送门](https://link.zhihu.com/?target=http%3A//www.notedeep.com/note/38/page/282)**

- 《mysql 必知必会》
- 《高性能 mysql 第三版》
- 《数据库系统概念》
- 《深入理解 MySQL》
- 《MySQL 性能调优与架构设计--全册》
- 《SQL Antipatterns》
- 《MySQL 技术内幕 InnoDB 存储引擎》

### 学习网站

[MySQL Tutorial - Learn MySQL Fast, Easy and Fun.](https://link.zhihu.com/?target=http%3A//www.mysqltutorial.org/)

可以快速，简单和有趣的学习 MySQL。以简单易懂的方式为您提供完整的 MySQL 教程。每个教程都有 SQL 脚本和可用屏幕截图的实际示例。

[mysql 学习资料 | mysql 深入学习笔记 深度笔记](https://link.zhihu.com/?target=http%3A//www.notedeep.com/note/38/page/282)

有很多 mysql 的资料可以看，还可以看网友做的学习笔记。

W3Schools [SQL 教程](https://link.zhihu.com/?target=http%3A//www.w3school.com.cn/sql/)

可以学习基础的 sql 语句

### 官方手册

无论英文好不好，看英文手册的能力是一定要有，也一定要培养的。

[mysql 官方手册：14 The InnoDB Storage Engine](https://link.zhihu.com/?target=https%3A//dev.mysql.com/doc/refman/5.6/en/innodb-storage-engine.html)

### 大牛博客

领域专家的博客是十分具有学习价值的，下面列举几个比较好的：

何登成的技术博客 [何登成的技术博客](https://link.zhihu.com/?target=http%3A//hedengcheng.com/)

淘宝丁奇 [追风刀·丁奇 - ITeye 技术网站](https://link.zhihu.com/?target=http%3A//dinglin.iteye.com/)

周振兴@淘宝 花名：苏普 [一个故事@MySQL DBA](https://link.zhihu.com/?target=http%3A//www.orczhou.com/)

阿里云数据库高级专家彭立勋为 MariaDB Foundation 正式成员，负责全球 Replication 模块相关补丁的 Review。彭立勋也成为首位被 MariaDB 基金会引入的中国程序员。[P.Linux Laboratory](https://link.zhihu.com/?target=http%3A//www.penglixun.com/)

[Planet MySQL](https://link.zhihu.com/?target=https%3A//planet.mysql.com/)

### 转行自学 MySQL 数据库

本人是个活生生的例子，大学学的仪器仪表专业，毕业前第一份实习工作是电路板测试。0 基础自学 mysql 和 linux，现任国内某公有云 mysql &&mongodb dba。

对于非计算机出身的我，大学只会 hello word 和跑马灯，期间过程确实非常曲折，分享下我的自学过程：

1、 自己在 windows 和 linux 上安装了 mysql，自学 linux 的基础知识，学习 mysql 的最基础的知识，即**怎么写 sql，存储过程，表的设计**等，从 0 到熟悉大概花了 3 个月 ，推荐**《mysql 入门很简单》**。

2、系统地较为深入地学习**mysql 的 sql 优化，备份和恢复，参数优化，架构优化，硬件层面的优化，高可用方案，复制技术**等等，这段时间你不一定能实际接触到这些，就像我当初那样，肯定没什么公司招一个小白。
我选择自己看书，推荐**《高性能 mysql》**，里面所有的章节都需要看一遍，以现在的水平肯定看不懂，但需要知道大概怎么回事，为后续的找 mysql 初级 dba 的工作打一个铺垫，这个过程大概也需要 3 个月。

3、 纸上得来终觉浅，完成以上两步，我开始准备**找一份 mysql 相关的工作**，而不是天天用着 excel 表格做着 select \* from table_sb 这样的工作。

当然我这么猥琐的人肯定不会裸辞，该画的电路板也一样画，业余时间开始投初级 mysql dba 的工作，并且不间断地学习，网上各种找 mysql 面试的相关题目（实际上我当时完全没有任何实战经验），陆续收到一些面试，凭借之前自学的 mysql 知识，开始胡乱吹牛逼，先混进去再说。

你不做 mysql 实际相关的工作，永远也不知道自己之前认知的 db 知识有多幼稚。

友情提示一点，一般公司都没有专职 dba 的，所以面试的时候一定要自信，其实你学了这么多，虽然毫无实战经验，理论知识很大概率比面试你的人牛逼，所以各种吹，我就这样真正进入初级 dba 的圈子（由于这时对 linux 还处于 cd ls 的水平，所以之前也根本没做过运维），这个边工作边找工作的过程又持续了 2 个月。

4、真正进入互联网，接触生产环境后，这是我进步最大的时候。
第一步需要**将之前所学真正地应用起来**，并且应用的过程中，再回头看之前的书籍，这时候需要真正去理解，而不是似是而非，一知半解。
这时再推荐**《高性能 mysql 第三版》**，全本再看一遍，这时需要全部看懂，另外还有**《mysql 技术内幕：innodb 存储引擎》**等等。
总之这段时间就需要**开始关注 mysql 一些细节**了，比如**db 故障处理，高可用，负载均衡**等等的具体实现了。
另外，**linux 的知识同步也要深入去学习**，至少会写 shell 脚本，常见的 linux 知识等，我在这花了 1 年多；

5、 dba 的工作一般是非常轻闲的，毕竟不是大公司，技术能力有限，该学的也学得差不多了，接触不到**海量数据，高并发**等比较锻炼人的场合，于是我又准备跳了。
于是来了公有云，现在每天运维万多个 db 实例，平均每天处理 5+个紧急 db 故障，几乎 mysql 会遇到的问题，感觉都遇到了，能感觉到技术实力和经验也在每天都在积累，在进步。
但是感觉还是欠缺了很多，**下一步就看你选择**了，是再去研究源代码，底层原理的东西多点，还是数据库运维和应用多一点，就比如业界姜承尧，何登成与叶金荣的区别。
由于我的历史原因，对 c++等几乎不懂，平时也用不到，所以看代码等事实际太累，于是我再去学 mongodb，接了公司 mongodb 运维的活，算是在广度上的一个扩展，万一哪天 mysql 不行了呢

6、 总之，对于 db 小白来说，最重要的一点就是，**学习的过程不能断**。
