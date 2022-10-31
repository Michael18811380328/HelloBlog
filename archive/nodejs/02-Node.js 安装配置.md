# 02-Node.js 安装配置-20210711

本安装教程以 Node.js v4.4.3 LTS(长期支持版本)版本为例。

可以根据不同平台系统选择你需要的 Node.js 安装包。

**注意：**Linux 上安装 Node.js 需要安装 Python 2.6 或 2.7 ，不建议安装 Python 3.0 以上版本。



## Mac OS 上安装

你可以通过以下两种方式在 Mac OS 上来安装 node：

- 1、在官方下载网站下载 pkg 安装包，直接点击安装即可。

- 2、使用 brew 命令来安装：

  ```
  brew install node
  ```

### 版本管理工具 nvm 

  强烈建议使用nvm(Node Version Manager) ，nvm是 Nodejs 版本管理器，它让我们方便的对切换Nodejs 版本。

  nvm 介绍：[使用 nvm 管理不同版本的 node 与 npm](https://www.runoob.com/w3cnote/nvm-manager-node-versions.html)

  在 MAC 上安装使用 **brew install nvm**, 其中 brew 是 Homebrew。

  安装 nvm 后可能会出现 **zsh: command not found: nvm**，使用以下命令来安装：

  ```bash
  curl -o- [https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh](https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh) | bash [[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh
  ```

  使用

  ```bash
  nvm ls-remote 查看有哪些node版本可以安装
  nvm 用于管理node 版本
  nvm list 查看当前所有的node 版本
  nvm install v10.13.0 安装指定的版本，安装多版本
  nvm use —delete-prefix 10.13.0 使用nvm use切换到指定的版本
  nvm current 查看当前node版本
  nvm alias default <version> 命令来指定一个默认的node版本
  ```

### 版本管理工具 n

~~~bash
n
# 现在本机安装三个版本，通过键盘选择使用的版本
node/8.16.0
node/12.18.4
node/14.16.1
~~~
