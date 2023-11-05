# Node 下 LDAP 基本介绍

2021-10-28

## LDAP 入门

首先 LDAP 是一种通讯协议，LDAP 支持 TCP/IP。协议就是标准，并且是抽象的。在这套标准下，AD（Active Directory）是微软出的一套实现。

那 AD 是什么呢？暂且把它理解成是个数据库。也有很多人直接把 LDAP 说成数据库(可以把 LDAP 理解成存储数据的数据库)。像是其他数据库一样，LDAP 也是有 client 端和 server 端。server 端是用来存放资源，client 端用来操作增删改查等操作。

而我们通常说的 LDAP 是指运行这个数据库的服务器。可以简单理解 AD =LDAP 服务器＋ LDAP 应用。

那 LDAP 这种数据库有什么特殊的呢？我们知道，像 MySQL 数据库，数据都是按记录一条条记录存在表中。而 LDAP 数据库，是树结构的，数据存储在叶子节点上。看看下面的比喻：

假设你要树上的一个苹果（一条记录），你怎么告诉它的位置呢？当然首先要说明是哪一棵树（dc，相当于 MYSQL 的 DB），然后是从树根到那个苹果所经过的所有“分叉”（ou），最后就是这个苹果的名字（uid，相当于 MySQL 表主键 id）。好了！这时我们可以清晰的指明这个苹果的位置了。就这样就可以描述清楚“树结构”上的一条记录了。

说一下 LDAP 里如何定义一个记录的位置吧。

```txt
树（dc=ljheee)
分叉（ou=bei,ou=xi,ou= dong）
苹果（cn=redApple）
```

好了，redApple 的位置出来了：

     dn:cn=honglv,ou=bei,ou=xi,ou=dong,dc=ljheee

其中 dn 标识一条记录，描述了一条数据的详细路径。

咦!有人疑问，为什么 ou 会有多个值？你想想，从树根到达苹果的位置，可能要经过好几个树杈，所有 ou 可能有多个值。关于 dn 后面一长串，分别是 cn，ou,dc；中间用逗号隔开。

总结一下 LDAP 树形数据库如下：

dn ：一条记录的详细位置

dc ：一条记录所属区域 (哪一颗树)

ou ：一条记录所属组织 （哪一个分支）

cn/uid：一条记录的名字/ID (哪一个苹果名字)

LDAP 目录树的最顶部就是根，也就是所谓的“基准 DN"。

为什么要用 LDAP 目录树来存储数据，用 MySQL 不行吗，为什么非要搞出一个树形的数据库呢？

这是因为用树形结构存储数据，查询效率更高（具体为什么，可以看一下关系型数据库索引的实现原理——B 树/B+树）。在某些特定的场景下，使用树形数据库更理想。比如：需要储存大量的数据，而且数据不是经常更改，需要很快速的查找。

把它与传统的关系型数据库相比，LDAP 除了快速查找的特点，它还有很多的运用场景，比如域验证等。

## LDAP java 编程操作

我们可以用 JDBC （Java 数据库连接，Java Database Connectivity），操作 MySQL 数据库，进行对数据的增删改查。同样，LDAP 树形数据库，也可以通过 JDBC 方式；除此之外，还可以用 JNDI 的方式（Java Naming and Directory Interface，Java 命名和目录接口，更推荐），因为树形可以看做是目录，树结构的枝杈相当于目录的层级。

还有 LDAP 数据库展示数据也是树形的，ApacheDirectoryStudio 下载地址

http://download.csdn.net/download/ljheee/10145654

Java 命名和目录接口（了解）

```java
import com.xxx.csb.ldap.config.LdapConfiguration;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Hashtable;
import javax.naming.*;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;

public class LdapJNDI {

  @Autowired
  LdapConfiguration ldapConfiguration;

  public void JNDILookup() {
    String rootFilter = "o=xxx.com,o=isp";
    String filter = "(&(smart-type=E1)(smart-status=1))";
    String filter = "(&(smart-type=E1)(uid=00012047))";
    String username = "uid=USER_NAME,ou=Authorization,ou=People,o=cc.com,o=isp";//xxx为申请的对接账户
    String password = "PASSW";

    Hashtable env = new Hashtable();
    env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");//设置连接LDAP的实现工厂
    env.put(Context.PROVIDER_URL, "ldap://172.16.32.19:389/" + rootFilter);// 指定LDAP服务器的主机名和端口号
    env.put(Context.SECURITY_AUTHENTICATION, "simple");//给环境提供认证方法,有SIMPLE、SSL/TLS和SASL
    env.put(Context.SECURITY_PRINCIPAL, username);//指定进入的目录识别名DN
    env.put(Context.SECURITY_CREDENTIALS, password); //进入的目录密码
    env.put("filter",filter);
    DirContext ctx = null;

    try {
      // 得到初始目录环境的一个引用
      ctx = new InitialDirContext(env);
      //The search base entry 'uid=00012047,ou=Internal,ou=People,o=xxx.com,o=isp' does not exist]; remaining name 'uid=00012047,ou=Internal'
      Attributes attrs = ctx.getAttributes("uid=00012047,ou=Internal,ou=People");//获取到一个人员，
      NamingEnumeration bindings = ctx.listBindings("ou=Internal,ou=People");//列举 内部人员
      while (bindings.hasMore()) {
        Binding bd = (Binding)bindings.next();
        System.out.println(bd.getName() + ": " + bd.getObject());
      }
    } catch (javax.naming.AuthenticationException e) {
      System.out.println("认证失败");
      e.printStackTrace();
    } catch (Exception e) {
      System.out.println("认证出错：");
      e.printStackTrace();
    }finally {
      if (ctx != null) {
        try {
          ctx.close();
        } catch (NamingException e) {
          e.printStackTrace();
        }
      }
    }
  }

  public static void main(String[] args) {
    LdapJNDI ldapJNDI = new LdapJNDI();
    ldapJNDI.JNDILookup();
  }
}
```

最后总结一下：

1、LDAP 的结构用树来表示，而不是用表。正因为这样，就不能用 SQL 语句了。

2、LDAP 写入较慢，查询较快，提供了静态数据的快速查询方式。

4、Client/server 模型，Server 用于存储数据，Client 提供操作目录信息树的工具。

5、LDAP 是一种开放 Internet 标准，LDAP 协议是跨平台的 Interent 协议。

## ldap node 客户端操作

node ldap client

github 连接：https://github.com/ymyang/node-ldap

```bash
npm install node-ldap
```

```js
var LdapClient = RedisClient("node-ldap");

var client = new LdapClient({
  ldapUrl: "ldap://192.168.1.81:389",
  userDn: "administrator@yliyun.com",
  password: "yliyun@123",
});

// 用户认证
client
  .auth("administrator@yliyun.com", "yliyun@123")
  .then(function () {
    console.log("success");
  })
  .catch(function (err) {
    console.error(err);
  });

// 搜索部门
client
  .searchOU("cn=Users,dc=yliyun,dc=com")
  .then(function (ous) {
    console.log(ous);
  })
  .catch(function (err) {
    console.error(err);
  });

// 搜索群组
client
  .searchGroup("cn=Users,dc=yliyun,dc=com")
  .then(function (groups) {
    console.log(groups);
  })
  .catch(function (err) {
    console.error(err);
  });

// 搜索用户
client
  .searchUser("cn=Users,dc=yliyun,dc=com")
  .then(function (users) {
    console.log(users);
  })
  .catch(function (err) {
    console.error(err);
  });

// 搜索
client
  .search({
    base: "dc=yliyun,dc=com",
    scope: "sub", // 默认为'one'
    paged: "true", // 默认为true
    filter: "(objectclass=organizationalUnit)",
  })
  .then(function (rows) {
    console.log(rows);
  })
  .catch(function (err) {
    console.error(err);
  });

// 断开连接
client.disconnect();
```

## node.js 下 LDAP 查询实践案例

https://www.cnblogs.com/kongxianghai/p/4847265.html

目标：

从一个 LDAP Server 获取 uid=kxh 的用户数据

LDAP 地址为：ldap://10.233.21.116:389

在工程根目录中，先 npm 一个 LDAP 的访问库 ldpajs npm install ldapjs

```js
var ldap = require("ldapjs");

//创建LDAP client，把服务器url传入
var client = ldap.createClient({
  url: "ldap://10.203.24.216:389",
});

//创建LDAP查询选项
//filter的作用就是相当于SQL的条件
var opts = {
  filter: "(uid=kxh)", //查询条件过滤器，查找uid=kxh的用户节点
  scope: "sub", //查询范围
  timeLimit: 500, //查询超时
};

//将client绑定LDAP Server
//第一个参数：是用户，必须是从根节点到用户节点的全路径
//第二个参数：用户密码
client.bind(
  "uid=supbind,cn=users,dc=tiger,dc=com",
  "123456",
  function (err, res1) {
    //开始查询
    //第一个参数：查询基础路径，代表在查询用户信心将在这个路径下进行，这个路径是由根节开始
    //第二个参数：查询选项
    client.search("DC=tiger,DC=com", opts, function (err, res2) {
      //查询结果事件响应
      res2.on("searchEntry", function (entry) {
        //获取查询的对象
        var user = entry.object;
        var userText = JSON.stringify(user, null, 2);
        console.log(userText);
      });

      res2.on("searchReference", function (referral) {
        console.log("referral: " + referral.uris.join());
      });

      //查询错误事件
      res2.on("error", function (err) {
        console.error("error: " + err.message);
        //unbind操作，必须要做
        client.unbind();
      });

      //查询结束
      res2.on("end", function (result) {
        console.log("search status: " + result.status);
        //unbind操作，必须要做
        client.unbind();
      });
    });
  }
);
```

参考资料

filter 语法：http://www.ldapexplorer.com/en/manual/109010000-ldap-filter-syntax.htm

ldapjs：https://www.npmjs.com/package/ldapjs

https://blog.csdn.net/ljheee/article/details/78746037?utm_source=copy

https://blog.csdn.net/weixin_34208283/article/details/89375085

https://www.cnblogs.com/kongxianghai/p/4847265.html
