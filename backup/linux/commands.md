# bash 命令一览

### alias

`alias`用来为命令建立别名。

```bash
alias cp="cp -R"
alias mkdir="mkdir -p"
```

`unalias`用来解除别名。

```bash
# 列出现有别名
$ alias ls ll
alias ls='ls --color=auto'
alias ll='ls -l --color=auto'
# 增加一个别名
$ alias llrt='ls -lrt --color=auto'

# 解除别名
$ unalias llrt
```

### bind

显示可绑定的操作，以及已经绑定的快捷键。

```bash
$ bind -P
```

显示可绑定的操作。

```bash
$ bind -l
```

自定义绑定的键。

```bash
 .bash_profile (or, more accurately, in my global bash settings file) I use:
# make cursor jump over words
bind '"\e[5C": forward-word'    # control+arrow_right
bind '"\e[5D": backward-word'   # control+arrow_left

# make history searchable by entering the beginning of command
# and using up and down keys
bind '"\e[A": history-search-backward'  # arrow_up
bind '"\e[B": history-search-forward'   # arrow_down
```

### cat

cat 命令用来将一个或多个文件的内容，显示在标准输出。

```bash
$ cat file1 file2
```

参数-n 表示输出带行号。

### chgrp

chgrp 命令改变文件的群组。

### chmod

chmod 命令用来改变文件的权限。

用户类型

- u - user
- g - group
- a - all

权限类型

- r - read
- w - write
- x - execute

```bash
$ chmod u+x myfile
$ chmod g+rxw myfile
$ chmod ga-wx myfile

$ chmod 777 myfile
$ chmod 755 myfile
```

### chown

chown 命令改变文件的所有者。

### command

有时候，脚本中有与系统命令同名的函数，`command`命令指定使用系统命令。

```bash
#!/bin/bash
# Create a wrapper around the command ls
ls () {
  command ls -lh
}
ls
```

上面代码中，如果函数`ls`里面，如果没有`command`命令，就会形成函数`ls`调用自身的无限循环。

### cp

cp 命令用来复制文件。

```bash
$ cp source target
```

参数-R 用来递归复制目录。

```bash
$ cp -R dir1 dir2
```

### cut

将字符串按照指定符号切分。

```bash
INPUT='someletters_12345_moreleters.ext'
SUBSTRING=$(echo $INPUT| cut -d'_' -f 2)
# 输出12345
echo $SUBSTRING
```

### echo

echo 命令用于将参数显示在标准输出上。

```bash
$ echo joe
joe
$ echo "joe"
joe
```

上面两个命令都将 Joe 显示在标准输出，引号（包括单引号）默认不起作用。

如果要输出引号，需要用反斜杠转义。

```bash
$ echo \"joe\"
"joe"
```

参数-e 表示不输出换行符。

参数-n 表示解释特殊符号。

```bash
echo -e "joe\tjoe\njoe"
joe	joe
joe
```

### egrep

egrep 命令与 grep 命令类似，但可以使用正则表达式。

```bash
$ egrep "apple|orange" myfile.txt
```

### exit

exit 命令用来退出当前脚本。

### export

export 命令用于将脚本中的变量，输出到当前 Shell。

### fg

fg 命令将后台进程放到前台。

### file

file 命令用来查看文件类型。

```bash
$ file Default.png
Default.png: PNG image data, 640 x 1136, 8-bit/color RGB, non-interlaced
```

### find

find 命令用来按照指定条件搜索文件或目录。

```bash
# 格式
$ find where-to-look [what-to-do]

# -name 从当前目录中，按照文件名查找文件。
$ find . -name "*.txt"

# -iname 文件名的大小写不敏感
$ find . -iname "*.txt"

# -type 只查找文件，不查找目录。
# f表示文件，d表示目录
$ find . -iname \*book\*.txt" -type f

# -maxdepth 查找当前目录及下面一层目录
$ find . -maxdepth 2 -type d

# -empty 搜索当前目录下的空目录
$ find . -type d -empty

# -size 当前目录下，大小在100K以上的文件
$ find . -name "*.txt" -size +100K

# -size 当前目录下，大小在50K到100K以上的文件
$ find . -size +50K -size -100K

# -mtime 24小时内，修改过的文件
$ find . -size +50K -size -100K -mtime 0

# -delete 删除指定文件
$ find . -name '.DS_Store' -type f -delete
$ find . -name '*.zip' -type f -delete

# -exec 执行其他命令
$ find ./docs -name '*.md' -exec grep 'static' {} \;
```

find 命令默认搜索子目录。

### grep

grep 命令用来在文件中搜索指定文本。

```bash
# 输出指定文件中，包括关键字的行
$ grep apple myfile.txt

# -v 输出不包含搜索词的行
$ grep -v the tempfile

# -n 输出内容包括行号
$ grep -n apple myfile.txt

# -R 递归搜索指定目录及其子目录
$ grep apple -R .

# --exclude-dir  排除指定目录
$ grep apple --exclude-dir="spec"

# -E 使用正则搜索
$ grep -E "apple|orange" -R .

# -C 显示上下文（指定上下的行数）
$ grep apple -R . -C 1
```

参数-A 表示显示搜索结果+后面（After）的行，参数-B 表示显示搜索结果+前面（Before）的行，参数-C 表示显示搜索结果+前后（Context）的行。

```bash
$ grep -A1 apple myfile.txt  # return lines with the match, as well as 1 after
$ grep -B2 apple myfile.txt  # return lines with the match, as well as 2 before
$ grep -C3 apple myfile.txt  # return lines with the match, as well as 3 before and after.
```

参数-c：输出匹配的行数。

参数--color 表示搜索结果高亮显示。

参数-e 表示正则搜索。

```bash
$ grep -e apples? -r dir/
```

参数--exclude-dir=dir 指定搜索时排除在外的目录。

参数-F 表示对于使用字面量处理搜索字符，不将其当作正则。

参数-h：在多文件搜索中，不输出文件名。

参数-H 表示同时输出文件名。

参数-i 表示搜索时忽略大小写。

参数-I 表示忽略二进制文件。

参数-l（--files-with-matches）表示只输出文件名，不输出匹配的行。这能加快搜索速度，因为 grep 一旦在一个文件中找到第一个匹配的行，就不再向下搜索了。

参数-L：输出不匹配的文件名。

参数-P：表示可以使用正则表达式。

```bash
$ cat login.txt | grep -P '(?<=abc)\s(?=def)'
```

参数-n 表示搜索结果包含行号。

参数-r 表示递归搜索。

```bash
$ grep -r 'string' dir/
# 如果不支持-r参数，可以用下面的命令
$ find dir/ -type f -exec grep -H 'string' {} +
```

参数-v：显示所有不匹配该模式的行。

### groups

groups 命令查看当前用户所属的群组。

### head

head 命令用来查看文件头部的内容。

```bash
$ head myfile.txt      # print the first 10 lines of the file
$ head -1 myfile.txt   # print the first line of the file
$ head -50 myfile.txt  # print the first 50 lines of the file
```

head 命令可以查看多个文件。

```bash
$ head -2 hello.txt kitty.txt
==> hello.txt <==
hello
hello

==> kitty.txt <==
kitty
kitty
```

查看所有文件的头部。

```bash
$ head *
```

### history

history 命令显示了过去输入的 500 条命令。

```bash

$ history

# 执行特定编号的命令
$ !100

# 搜索某些命令
$ history | grep “BLOW”

# 分屏查看
$ history | less

```

### locate

locate 用来在整个文件系统（从根目录开始）搜索某个文件。

```bash
$ locate -i mybook
```

locate 命令区分大小写，i 参数表示大小写不敏感。

locate 命令通过预先生成的数据库搜索，所以速度很快，缺点是搜索不到刚刚生成的文件。

- n 指定结果数，比如 n 10 表示只返回 10 条结果。
- r 进行正则搜索，将文件名解释为正则表达式。

### mkdir

mkdir 命令用来新建目录。

参数-p 用来遇到已存在的目录时不报错。

### nmap

nmap 命令用于扫描网络端口。

```bash
$ nmap 192.168.1.0/24
```

上面命令扫描本地网络 254 个 IP 地址，返回哪些 IP 地址是可以 ping 的，以及它们打开的端口是什么。

### passwd

passwd 命令用来改变密码。

### ps

ps 命令显示进程信息。

```bash
$ ps -A   # show all process info
$ ps -fA  # show all process info (verbose)
```

### pstree

pstree 以树状形式显示进程树。

### read

read 命令将用户输入读入变量。

```bash
$ read x
```

### rename

为文件批量改名。

```bash

$ rename [-v -n -f] <pcre> <files>

```

- v 在标准输出显示改名过程
- n 模拟显示改名的结果，并不实际改名
- f 覆盖同名文件
- <pcre> 代表 Perl-compatible regular expression (PCRE)，即改名的正则表达式，形式为's/old-name/new-name/'

```bash

$ rename 's/\.jpeg$/\.jpg/' *.jpeg

# 小写改成大写
$ rename 'y/A-Z/a-z/' *

$ rename -v 's/img_(\d{4})\.jpeg$/dan_$1\.jpg/' *.jpeg

```

### rm

rm 命令用来删除文件或目录。

参数-r 表示递归删除。

参数-f 表示强制删除，即忽视警告。

### sed

sed 命令主要用于文本替换和删除行。

### source

Bash 运行脚本文件，会新建一个 Shell。它与原有 Shell 之间没有通信。

```bash
$ cat ./test_src.sh
#!/usr/bin/env bash

myvariable=54
echo $myvariable
```

在当前 Shell 运行上面的脚本，脚本中的变量便不存在了。

```bash
$ ./test_src.sh
54
$ echo $myvariable
```

source 命令就用来让脚本文件运行在当前 Shell。

```bash
$ source ./test_src.sh
54
$ echo $myvariable
54
```

source 命令可以用一个点代替。

```bash
$ . ./test_src.sh
54
```

### tar

tar 命令用于将多个文件打包成一个文件。

```bash
tar -c -f destination.tar file1.txt file2.txt file3.txt
```

上面代码中，c 选项表示新建，f 选项表示文件，目的文件 destination 实际上是 f 选项的参数。几乎所有的 tar 命令用法，都需要带有 c 和 f 两个参数。

### tcpdump

tcpdump 命令在链接层过滤每个网络数据包，能够网络上的所有通信。它是 Berkeley Packet Filters 的命令行界面。

### top

top 输出系统当前状态。

### uname

`uname`命令输出当前操作系统的信息。

```bash
$ uname
Linux

# -a 参数输出详细信息
$ uname -a
Linux myHost 3.16.0-4-amd64 #1 SMP Debian 3.16.7-ckt11-1+deb8u6 (2015-11-09) x86_64 GNU/Linux
```

### which

which 命令输出当前 shell 命令对应的命令行程序。

```bash
$ which bash
/bin/bash
```

### who

who 命令显示当前登录的用户。
