## 使用 nvm 管理不同版本的 node 与 npm

### 分类

在我们的日常开发中经常会遇到这种情况：手上有好几个项目，每个项目的需求不同，进而不同项目必须依赖不同版的 NodeJS 运行环境。如果没有一个合适的工具，这个问题将非常棘手。

[nvm](https://github.com/creationix/nvm) 应运而生，nvm 是 Mac 下的 node 管理工具，有点类似管理 Ruby 的 rvm，如果需要管理 Windows 下的 node，官方推荐使用 [nvmw](https://github.com/hakobera/nvmw) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows)。不过，nvm-windows 并不是 nvm 的简单移植，他们也没有任何关系。但下面介绍的所有命令，都可以在 nvm-windows 中运行。



## nvm 与 n 的区别

node 版本管理工具还有一个是 TJ大神的 [n](https://github.com/tj/n) 命令，n 命令是作为一个 node 的模块而存在，而 nvm 是一个独立于 node/npm 的外部 shell 脚本，因此 n 命令相比 nvm 更加局限。

由于 npm 安装的模块路径均为 **/usr/local/lib/node_modules**，当使用 n 切换不同的 node 版本时，实际上会共用全局的 node/npm 目录。 因此不能很好的满足『按不同 node 版本使用不同全局 node 模块』的需求。



## 卸载全局安装的 node/npm

在官网下载的 node 安装包，运行后会自动安装在全局目录，使用过程中经常会遇到一些**权限问题**，所以推荐按照以下方法卸载全局安装的 node/npm。

首先，打开你 Finder，按 **shift+command+G**，打开前往文件夹的窗口，分别输入下列目录进去之后删除 **node** 和 **node_modules** 相关的文件和文件夹:

- 打开 **/usr/local/lib**，删除 **node** 和 **node_modules** 相关的文件和文件夹
- 打开 **/usr/local/include**，删除 **node** 和 **node_modules** 相关的文件和文件夹
- 如果你是使用的 **brew install node** 安装的 NodeJS，那么你还需要在终端中执行 **brew uninstall node** 命令来卸载
- 检查你的个人主文件夹下面的所有的 **local**、**lib** 以及 **include** 文件夹，并且删除所有与 **node** 和 **node_modules** 相关的文件以及文件夹
- 打开 **/usr/local/bin** 并删除 **node** 可执行文件

你可能还需要在你的终端中输入一些额外的指令：

```bash
sudo rm /usr/local/bin/npm
sudo rm /usr/local/share/man/man1/node.1
sudo rm /usr/local/lib/dtrace/node.d
sudo rm -rf ~/.npm
sudo rm -rf ~/.node-gyp
sudo rm /opt/local/bin/node
sudo rm /opt/local/include/node
sudo rm -rf /opt/local/lib/node_modules
```



## Windows 安装

首先最重要的是：一定要卸载已安装的 NodeJS，否则会发生冲突。然后下载 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) 最新安装包，直接安装即可。



## OS X/Linux 安装

与 Windows 不同，我们并不一定要先卸载原有的 NodeJS。当然我们推荐还是先卸载掉比较好。另外，你还需要 C++ 编译器，Linux 发行版一般不用担心，像 Ubuntu 都可以直接用 **build-essential** 套件，OS X 的话，可以用 **X-Code** 的命令行工具。运行这个命令即可：

```
xcode-select --install
```

在 Linux 中：（如果是 Debian 发行版）

```
sudo apt-get install build-essential
```

然后我们可以使用

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```

或者

```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```

从远程下载 **install.sh** 脚本并执行。注意这个版本年数字 **v0.33.0** 会随着项目开发而变化。随时通过[官方最新安装命令](https://github.com/creationix/nvm#install-script)来检查最新安装版本是有好处的。



## 安装多版本 node/npm

例如，我们要安装4.2.2版本，可以用如下命令：

```
nvm install 4.2.2
```

nvm 遵守[语义化版本](http://semver.org/lang/zh-CN/)命名规则。例如，你想安装最新的 **4.2** 系列的最新的一个版本的话，可以运行：

```
nvm install 4.2
```

nvm 会寻找 **4.2.x** 中最高的版本来安装。

你可以通过以下命令来列出远程服务器上所有的可用版本：

```
nvm ls-remote
```

Windows 的话，就是：

```
nvm ls available
```



## 在不同版本间切换

每当我们安装了一个新版本 Node 后，全局环境会自动把这个新版本设置为默认。

nvm 提供了 **nvm use** 命令。这个命令的使用方法和 **install** 命令类似。

例如，切换到 **4.2.2**：

```
nvm use 4.2.2
```

切换到最新的 **4.2.x**：

```
nvm use 4.2
```

切换到 iojs：

```
nvm use iojs-v3.2.0
```

切换到最新版：

```
nvm use node
```

每次执行切换的时候，系统都会把 node 的可执行文件链接放到特定版本的文件上。

我们还可以用 nvm 给不同的版本号设置别名：

```
nvm alias awesome-version 4.2.2
```

我们给 **4.2.2** 这个版本号起了一个名字叫做 **awesome-version**，然后我们可以运行：

```
nvm use awesome-version
```

下面这个命令可以取消别名：

```
nvm unalias awesome-version
```

另外，你还可以设置 **default** 这个特殊别名：

```
nvm alias default node
```



## 列出已安装实例

```
nvm ls
```

## 在项目中使用不同版本的 Node

我们可以通过创建项目目录中的 **.nvmrc** 文件来指定要使用的 Node 版本。之后在项目目录中执行 **nvm use** 即可。**.nvmrc** 文件内容只需要遵守上文提到的语义化版本规则即可。另外还有个工具叫做 [avn](https://github.com/wbyoung/avn)，可以自动化这个过程。



## 在多环境中，npm该如何使用呢？

每个版本的 Node 都会自带一个不同版本的 npm，可以用 **npm -v** 来查看 npm 的版本。全局安装的 npm 包并不会在不同的 Node 环境中共享，因为这会引起兼容问题。它们被放在了不同版本的目录下，例如 **~/.nvm/versions/node//lib/node_modules** 这样的目录。这刚好也省去我们在 Linux 中使用 **sudo** 的功夫了。因为这是用户的主文件夹，并不会引起权限问题。

但问题来了，我们安装过的 npm 包，都要重新再装一次？幸运的是，我们有个办法来解决我们的问题，运行下面这个命令，可以从特定版本导入到我们将要安装的新版本 Node：

```
nvm install v5.0.0 --reinstall-packages-from=4.2
```



## 其他命令

直接运行特定版本的 Node

```
nvm run 4.2.2 --version
```

在当前终端的子进程中运行特定版本的 Node

```
nvm exec 4.2.2 node --version
```

确认某个版本Node的路径

```
nvm which 4.2.2
```

安装 Node 的其他实现，例如 iojs（一个基于 ES6 的 Node 实现，现在已经和 Node 合并）

```
nvm install iojs-v3.2.0
```

快捷命令：

- **nvm install node** 安装最新版 Node
- **nvm install iojs** 安装最新版 iojs
- **nvm install unstable** 安装最新不稳定版本的 Node

> 原文链接：http://bubkoo.com/2017/01/08/quick-tip-multiple-versions-node-nvm/





# Mac OS 下 NVM 的安装与使用

#### nvm，node，npm之间的区别。

> 1. nvm：nodejs 版本管理工具。一个 nvm 可以管理很多 node 版本和 npm 版本。
> 2. nodejs：在项目开发时的所需要的代码库
> 3. npm：nodejs 包管理工具。在安装的 nodejs 的时候，npm 也会跟着一起安装，它是包管理工具。npm 管理 nodejs 中的第三方插件

#### nvm、nodejs、npm的关系：

nvm 管理 nodejs 和 npm 的版本。npm 可以管理 nodejs 的第三方插件。

#### 安装 nvm

##### 安装命令：

```ruby
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

or Wget:

```ruby
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

**注意后面的“v0.33.8”这是nvm的版本号，当前最新版本是v0.33.8**
*详见：[https://github.com/creationix/nvm/blob/master/README.md](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Fcreationix%2Fnvm%2Fblob%2Fmaster%2FREADME.md)*

**安装完成后关闭终端，重新打开终端**输入 nvm 验证一下是否安装成功，当出现“`Node Version Manager`”时，说明已安装成功。

如果在新的终端输入 nvm 时提示：`command not found: nvm`，有可能是以下原因之一：

- 你的系统可能缺少一个 .bash_profile 文件，你可以创建一个此文件（可通过`vi`或`vim`命令），打开复制粘贴以下代码（*安装nvm成功后终端的最好3行代码*）进去，保存，然后再次运行安装命令；

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

**注意：如果你安装了 oh my zsh ，需要在 .zshrc 文件去添加以上配置信息，（一般安装成功都会自动写入这个文件最底部）如下图示：**

- 你可能需要重新打开一个 terminal 窗口或标签页

如果上面没有解决问题，打开你的 .bash_profile 文件，并添加以下代码：
`source ~/.bashrc`，更改完记得保存更改哦😁😁😁



#### nvm 常用命令

- `nvm install stable` ## 安装最新稳定版 node，当前是node v9.5.0 (npm v5.6.0)
- `nvm install ` ## 安装指定版本，可模糊安装，如：安装v4.4.0，既可nvm install v4.4.0，又可nvm install 4.4
- `nvm uninstall ` ## 删除已安装的指定版本，语法与install类似
- `nvm use ` ## 切换使用指定的版本node
- `nvm ls` ## 列出所有安装的版本
- `nvm ls-remote` ## 列出所有远程服务器的版本（官方node version list）
- `nvm current` ## 显示当前的版本
- `nvm alias  ` ## 给不同的版本号添加别名
- `nvm unalias ` ## 删除已定义的别名
- `nvm reinstall-packages ` ## 在当前版本 node 环境下，重新全局安装指定版本号的 npm 包