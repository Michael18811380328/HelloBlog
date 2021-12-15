# Ruby标准开发环境部署

![img](https://csdnimg.cn/release/blogv2/dist/pc/img/reprint.png)

[weixin_34239169](https://blog.csdn.net/weixin_34239169) 2014-09-11 19:29:00 ![img](https://csdnimg.cn/release/blogv2/dist/pc/img/articleReadEyes.png) 73 ![img](https://csdnimg.cn/release/blogv2/dist/pc/img/tobarCollect.png) 收藏

文章标签： [ruby](https://www.csdn.net/tags/MtTaEg0sNTE2MjAtYmxvZwO0O0OO0O0O.html) [python](https://www.csdn.net/tags/MtjaQg4sNDk0LWJsb2cO0O0O.html) [运维](https://www.csdn.net/tags/MtTaEg0sMDQyNTMtYmxvZwO0O0OO0O0O.html)

版权

##### 工程师小C的小店[我也想开通小店](https://mp.csdn.net/console/MyShop)

[![img](https://csdn-test-oss.oss-cn-beijing.aliyuncs.com/images/20210402024431.jpeg)Python编程三剑客：Python编程从入门到实践第2版+快速上手第2版+极客编程（套装共3册）*作者：[美\] 埃里克·马瑟斯（Eric Matthes）**出版社：人民邮电出版社**好评：100.0%* *销售量：37**￥149*](javascript:;)[更多](javascript:;)

## Ruby环境安装

> 有时候用到了ruby，所以整理出来标准的ruby安装流程，这里并没有采用tar包安装，诸多不便，所以这样一份标准部署流程，已加入部署流程里，整理出来

### 安装依赖

```
yum groupinstall -y 'development tools'
```

### 安装RVM

> 这个一共ruby管理工具，可以管理不同版本的ruby，同时还可以使用ruby源来安装软件。

```
    curl -L get.rvm.io | bash -s stable



    source /etc/profile.d/rvm.sh
更换淘宝ruby mirror源



sed -i 's!ftp.ruby-lang.org/pub/ruby!ruby.taobao.org/mirrors/ruby!' /usr/local/rvm/config/db



 



rvm list rubies    #列出系统当前安装可用版本



rvm reload        #重新读取rvm配置文件



rvm install ruby-2.1.0    #安装指定ruby版本



 



# Usage: rvm use [version] --default



rvm use 2.1.0 --default
```

### gemset

> RVM的虚拟环境，概念类似于python中的virtualenv，具体介绍请移步[virtualenv](http://my.oschina.net/songmingming/blog/225667)

```
# Usage: rvm gemset [create/use] [name]



# Create a new gemset using the default Ruby interpreter (2.1.0)



# Run: rvm use [version] if you wish to work with another



创建虚拟环境myapp



rvm gemset create myapp



 



使用虚拟环境



rvm gemset use    myapp



 



使用指定的ruby版本创建虚拟环境



# Usage: rvm use [version]@[name] --create



rvm use 2.1.0@myapp --create



 



清空虚拟环境



# Usage: rvm gemset empty [name]



rvm gemset empty myapp



 



删除虚拟环境



# Usage: rvm gemset delete [name]



rvm gemset delete myapp
```

> 更多关于RVM的请查看这里 https://www.digitalocean.com/community/tutorials/how-to-use-rvm-to-manage-ruby-installations-and-environments-on-a-vps

### GEM

> 类似CentOS下的yum，用来安装各种Ruby软件。这个是需要你装好Ruby，才会有的工具。

```
gem -v ：查看版本



gem update --system ：升級RubyGems的版本



gem install gem_name 安裝某個应用



gem list ：列出安裝的应用



gem update gem_name：更新指定gem



gem update ：更新所有你安裝的Gems



gem install -v x.x.x gemname ：安裝特定版本



gem uninstall gem_name ：卸载



 



# 国内的环境你懂的，换成taobao的ruby源



$ gem source -r https://rubygems.org/



$ gem source -a https://ruby.taobao.org
```

### app

> 完成了上述步骤之后，就可以直接来安装

```
$ gem install rails



然后测试安装是否正确



 



$ rails -v



Rails 3.2.13
```

转载于:https://my.oschina.net/songmingming/blog/312584

相关资源：[成功搭建*Ruby*运行*环境*为您展开*Ruby*体验大门-其它代码类资源-CSDN...](https://download.csdn.net/download/weixin_38719475/12224914?spm=1001.2101.3001.5697)