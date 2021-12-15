## RVM

https://ruby-china.org/wiki/rvm-guide/

RVM 是一个命令行工具，可以提供一个便捷的多版本 Ruby 环境的管理和切换。

https://rvm.io/

如果你打算学习 Ruby / Rails, RVM 是必不可少的工具之一。

这里所有的命令都是再用户权限下操作的，任何命令最好都不要用 sudo.

## RVM 安装

```
$ gpg2 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
$ \curl -sSL https://get.rvm.io | bash -s stable
$ source ~/.bashrc
$ source ~/.bash_profile
```

修改 RVM 的 Ruby 安装源到 Ruby China 的 [Ruby 镜像服务器](https://cache.ruby-china.com/)，这样能提高安装速度

```
$ echo "ruby_url=https://cache.ruby-china.com/pub/ruby" > ~/.rvm/user/db
```

### Ruby 的安装与切换

列出已知的 Ruby 版本

```
rvm list known
```

安装一个 Ruby 版本

```
rvm install 2.2.0 --disable-binary
```

这里安装了最新的 2.2.0, `rvm list known` 列表里面的都可以拿来安装。

切换 Ruby 版本

```
rvm use 2.2.0
```

如果想设置为默认版本，这样一来以后新打开的控制台默认的 Ruby 就是这个版本

```
rvm use 2.2.0 --default 
```

查询已经安装的 ruby

```
rvm list
```

卸载一个已安装版本

```
rvm remove 1.8.7
```

## gemset 的使用

RVM 不仅可以提供一个多 Ruby 版本共存的环境，还可以根据项目管理不同的 gemset.

gemset 可以理解为是一个独立的虚拟 Gem 环境，每一个 gemset 都是相互独立的。

比如你有两个项目，一个是 Rails 2.3 一个是 `rails3. gemset` 可以帮你便捷的建立两套 Gem 开发环境，并且方便的切换。

gemset 是附加在 Ruby 语言版本下面的，例如你用了 1.9.2, 建立了一个叫 rails3 的 gemset,当切换到 1.8.7 的时候，rails3 这个 gemset 并不存在。

### 建立 gemset

```
rvm use 1.8.7
rvm gemset create rails23
```

然后可以设定已建立的 gemset 做为当前环境

### use 可以用来切换语言或者 gemset

前提是他们已经被安装 (或者建立)。并可以在 `list` 命令中看到。

```
rvm use 1.8.7
rvm use 1.8.7@rails23
```

然后所有安装的 Gem 都是安装在这个 gemset 之下。

### 列出当前 Ruby 的 gemset

```
rvm gemset list
```

### 清空 gemset 中的 Gem

如果你想清空一个 gemset 的所有 Gem, 想重新安装所有 Gem，可以这样

```
rvm gemset empty 1.8.7@rails23
```

### 删除一个 gemset

```
rvm gemset delete rails2-3
```

### 项目自动加载 gemset

RVM 还可以自动加载 gemset。 例如我们有一个 Rails 3.1.3 项目，需要 1.9.3 版本 Ruby，整个流程可以这样。

```
rvm install 1.9.3
rvm use 1.9.3
rvm gemset create rails313
rvm use 1.9.3@rails313
```

下面进入到项目目录，建立一个 `.rvmrc` 文件。

在这个文件里可以很简单的加一个命令：

```
rvm use 1.9.3@rails313
```

然后无论你当前 Ruby 设置是什么，cd 到这个项目的时候，RVM 会帮你加载 Ruby 1.9.3 和 rails313 gemset.

## 使用 RVM 快速部署 Nginx + Passenger

首先安装 Passenger

```
gem install passenger
```

然后使用 `passenger-install-nginx-module` 来安装 Nginx 和部署。

因为这一步需要 root 权限（因为要编译 Nginx）可以用 `rvmsudo` 这个东西（这个东西真是个好东西）。

```
rvmsudo passenger-install-nginx-module
```

然后会让你选择是下载 Nginx 源码自动编译安装，还是自己选择 Nginx 源码位置。

选择 Nginx 手动安装的可以添加别的编译参数，方便自定义编译 Nginx。

然后一路下载安装。默认的安装位置为 `/opt/nginx`.

然后看看 `nginx.conf`，都给你配置好了，只需要加上 root 位置（yourapp/public）就可以了。

当我第一次安装完成了，就惊呼，这也太爽了吧。

------

PS: RVM 是个好东西，做的很智能，（大部分）操作失败后会告诉你原因，然后告诉你需要安装哪些 Lib 等等，非常适合新手老手使用,简直是居家旅行必备良药。

## 其他选择

如果你不太喜欢 RVM 的风格，你也可以试试 [rbenv](https://github.com/sstephenson/rbenv), Ruby China 同样有一篇关于它的 Guide: [rbenv 实用指南](https://ruby-china.org/wiki/rbenv-guide)