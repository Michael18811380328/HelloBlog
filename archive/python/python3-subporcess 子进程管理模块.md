# python3. subporcess 子进程管理模块

原文链接：https://blog.csdn.net/weixin_42547344/article/details/80894760

简要说明: 有需要用到python调用外部程序命令的同学们, 那么你们请一定选择subprocess库,它给我们工作带来极大的方便也许我这么解释不正确, 还是用官方的话来说吧 

> <subporcess 模块允许你产生新的进程，并且可以把输入，输出， 错误 直接连接到管道，最后获取结果，python也有俩个比较功能不是那么太全的内置模块<os.system, os.spawn..>`等这些，总之这家伙的出现就是代替那些的，这俩天正用它写了一个小东西，
<!--  -->
    有必要记录下过程.
    <英文好的同志:  官方文档 >

### 18.1.0

用法介绍:

在python2.x的用法和python3.x有所不一样，本文将介绍基于python3.x版 subprocess简要用法，3x中增加了一些新的特性，如果保留与旧版本兼容，看管还是参阅旧版API.

3x.中增加了新的方法，例如 subprocess.run()方法. 此方法作用:  使用参数运行命令并返回完整的进程实例

subprocess.run(*popenargs, input=None, timeout=None, check=False, **kwargs)
此调用方式返回CompletedProcess实例，和直接Popen 差不多，实现是一样的，实际也是调用Popen，与Popen构造函数大致相同，例如:
```python
In: subprocess.run(["ls", "-l", "/dev/null"] 
    #执行ls -l /dev/null 命令
Out: CompletedProcess(args=['ls', '-l', '/dev/null'], returncode=0)
    #ponpenargs: 命令行参数，类型为list 或 str，返回CompletedProcess实例
    #returncode: 执行完子进程状态，通常返回状态为0则表明它已经运行完毕,弱值为负值"-N",表明子进程被终止.
ponpenargs: 命令行参数，类型为list 或 str，返回CompletedProcess实例
    #returncode: 执行完子进程状态，通常返回状态为0则表明它已经运行完毕,弱值为负值"-N",表明子进程被终止.

Out: subprocess.run(["ls", "-l", "/dev/null"], stdout=subprocess.PIPE, stderr=subprocess.PIPE
```

上述介绍新版本特性，再看下通常的一些用法：

列举一些基本用法:

subprocess.call():  方法call父进程等待子进程完成，返回退出信息。

subprocess.check_call(): 方法check_call父进程等待子进程完成，返回0，唯一不同区别，它会检查退出信息，如果returncode 不为0，则引发 subprocess.CallProcessError。

subprocess.check_output(): 方法check_output 父进程等待子进程完成，返回子进程向标准输出的输出结果，它和check_call 同样会检查退出信息，如returncode 不为0，则引发 subprocess.CallProcessError。

最主要还是讲subprocess.Popen() 附上源码，Popen的构造函数

```python
def __init__(self, args, bufsize=-1, executable=None,
             stdin=None, stdout=None, stderr=None,
             preexec_fn=None, close_fds=_PLATFORM_DEFAULT_CLOSE_FDS,
             shell=False, cwd=None, env=None, universal_newlines=False,
             startupinfo=None, creationflags=0,
             restore_signals=True, start_new_session=False,
             pass_fds=(), *, encoding=None, errors=None):
```
举个小例子：
```python
In [31]: import shlex
In [32]: command_line
Out[32]: '/bin/vikings -input eggs.txt -output "spam spam.txt" -cmd "echo \'$MONEY\'"'
In [33]: args = shlex.split(command_line)
In [34]: print(args)
['/bin/vikings', '-input', 'eggs.txt', '-output', 'spam spam.txt', '-cmd', "echo '$MONEY'"]
p = subprocess.Popen(args=args)
```
    shlex: POSIX模式下的一个解析命令行参数模块

特别注意一点，shell中是由空白分割，例如这里的-input 和 参数 eggs.txt 将单独放到列表元素里，而在shel中使用时需要引用或者反斜杠转义参数。

在POSIX模式上shell=True，shell默认为/bin/sh，如果args默认是一个字符串，则该字符串指定通过shell方式执行命令，这意味着该字符串的格式必须与shell下输入的格式一致。

在3.x 中 提供上下文管理，通过with语句支持Popen对象作为上下文管理，在退出时，关闭文件描述符，并等待进程。

In [35]: with subprocess.Popen(['ifconfig'], stdout=subprocess.PIPE) as proc:
    ...:     log.write(proc.stdout.read()) 
在python3.6中更改: ResourceWarning 如果子进程仍在运行，Popen析够函数会发出警告.

### 18.1.1

异常情况：程序在执行中，子进程中引发异常将在父进程中提示，并且异常对象会有一个额外属性调用，child_traceback() ，此方法来自子进程回朔信息。

最常见的异常:

~~~md
OSError:  尝试执行一个不存在的命令或者文件引发此异常

ValueError:  Popen中使用无效的参数调用，引发异常

CalledProcessError: 如果子进程返回非0的状态码，会引发此异常 <check_all，check_output>

TimeoutExpired: 作用于超时参数引发，例如: 如果在退出之前超时，Popen.communicate() 则引发异常

所有异常均继承自 SubprocessError 基类.
~~~

### 18.1.1

Popen对象详解

Popen 类的实例具有一下方法:

Popen.poll (): 检查子进程是否已终止，设置并返回returncode属性，否则返回None

Popen.wait (timeout=None): 等待子进程终止，设置并返回returncode属性，如果进程在超时间隔内没有终止，则引发TimeoutExpried异常，可捕获次异常重新等待。<注意: 这将使用时死锁stdout=PIPE或者stderr=PIPE和子进程结果输出到管道，使它阻止等待os缓冲器接受更多数据，使用：Popen.communicate() 可避免这种情况

Popen.communicate(input=None, timeout=None):  与子进程交互，将数据发送到"管道"stdin，然后从stdout 或者 stderr中读取全部数据，再然后等待进程终止，communicate()返回一个元组，在文本模式下打开流，则数据是则数据是str，否则是Bytes  ****PS返回形式:(stdout_data, stderr_date)

我们如果想要将数据发送到sitdin，这么可以干，在创建Popen对象时候，传入stdin=subprocess.PIPE  |  stdout=subprocess.PIPE  | stderr=subprocess.PIPE  输入 | 输出 | 错误信息

这里再说一个重点，若进程超时没有终止，捕获TimeoutExpired异常重新通信不会丢失任何输出结果

如超时，子进程不会自动终止，因此为了清理残留子进程，可以这么做

```python
proc = subprocess.Popen(...)

try:
    outs, errs = proc.communicate(timeout=15)

except TimeoutExpired:
    proc.kill()
    outs, errs = proc.communicate()
```

又要说一下，这种方式，读取的数据缓存在内存中，如果数据量很大，建议不要使用这种这种方式，还好在3.x版中增加了超时选项

~~~md
Popen.send_signal (signal): 向子进程发送信号，<注意： windows 上的为 terminate()>

Popen.terminate (): 停止子进程，<注意： windows 上调用Win32 API TerminateProcess()>

Popen.kill (): 杀死子进程

Popen.args (): 传递给Popen的参数，可以是列表 或者 字符串

Popen.stdin(): 如果stdin 参数是PIPE，返回可写流对象，如果指定encoding等参数为True，怎是文本流，否则字节流，如果stdin的参数不是PIPE，返回None

Popen.stdout (): 如果stdin 参数是PIPE，从流中读取子进程标准输出，如果指定encoding等参数为True，怎是文本流，否则字节流，如果stdin的参数不是PIPE，返回None

Popen.stdout (): 如果stdin 参数是PIPE，从流中读出子进程错误输出，如果指定encoding等参数为True，怎是文本流，否则字节流，如果stdin的参数不是PIPE，返回None

Popen.pid (): 返回子进程ID ，PS: (如果将shell=True，则是生成shell的进程ID) 

Popen.returncode ():  返回子进程的状态码.

~~~

其他用法更具自己需求可自行查看官方文档，边看边试..

至此，自己用到subprocess基本用法总结完了，记录一下，记忆犹新，很好用的一个模块，come on ..   对，用到这个童鞋，可以在看看shlex模块，很简单的一个命令行解析模块，配合使用更便捷。
