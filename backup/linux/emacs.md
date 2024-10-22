# Emacs 的用法

## 通用命令

- 帮助：C-h C-h
- 退出 Emacs：C-x C-c
- 退出一个正在运行的命令：C-g（比如某条命令迟迟没有响应，或者取消输入到一半的命令，实质是退出当前 buffer，回到前一个 buffer）
- 执行命令：M-x
- 文本自动换行：M-q

## 光标的移动

### 自然单位的移动

- 向下滚动一屏：C-v
- 向上滚动一屏：M-v
- 重绘屏幕：C-l（将光标所在位置放到屏幕中央）
- 向上一行：C-p（previous）
- 向下一行：C-n（next）
- 向左移一个字符：C-b（backward）（如果是行首，就移到上一行行尾）
- 向右移一个字符：C-f（forward）（如果是行尾，就移到上一行行尾）
- 移动到行首：C-a
- 移动到行尾：C-e
- 移动到文件开头：M-<
- 移动到文件结尾：M->
- 向上移动一段：C-up or C-down
- 移动整个词：C-left or C-right

### 词法单位的移动

- 向前移动一个词：M-f
- 向后移动一个词：M-b
- 移动到上一句的句首：M-a
- 移动到下一句的句尾：M-e

### 数字参数（用于重复）

C-u 用于接受数字参数。

- 向前移动 8 个字符：C-u 8 C-f
- 将光标所在位置，在屏幕上提升 8 行：C-u 8 C-v
- 将光标所在位置，在屏幕上下移 8 行：C-u 8 M-v

## 插入与删除（INSERTING AND DELETING）

插入 8 个同样的字符：C-u 8 \*，这将会插入 **\*\*\*\***。

- <DEL> 删除光标前的一个字符
- C-d 删除光标后的一个字符

注意,“移除（kill）”和“删除（delete）”的不同在于被移除的东西可以被重新插入（在任何位置），而被删除的就不能使用相同的方法重新插入了（不过可以通过撤销一个删除命令来做到，后文会提到）。【实际上，移除掉的东西虽然看起来“消失”了，但实际上被 Emacs 记录了下来，因此还可以找回来；而删除掉的东西虽然也可能还在内存里，但是已经被 Emacs“抛弃”了，所以就找不回来了。】重新插入被移除的文字称为“召回（yank）”。一般而言，那些可能消除很多文字的命令会把消除掉的文字记录下来（它们被设定成了“可召回”），而那些只消除一个字符或者只消除空白的命令就不会记录被消除的内容（自然你也就无法召回了）。

重新插入被移除的文字恢复的动作称为“召回（yanking）”。（就好像把别人从你身边移走的东西又猛力地拉回来。）你可以在你删除文字的地方召回，也可以在别的地方召回，还可以多次召回同样的文字以得到它的多个拷贝。很多其它的编辑器把移除和召回叫做“剪切”和“粘贴” （详情可见 Emacs 使用手册里的术语表）。

粘贴：C-y

如果你一次连按了好几下 C-k，那么所有被移除的行会被存储在一起，只要一个 C-y 就可以把它们都召回。

C-y 可以召回最近一次移除的内容，那如何召回前几次移除的内容呢？它们当然没有丢，你可以用 M-y 来召回它们。在用 C-y 召回最近移除的文字之后，紧接着再按 M-y 就可以召回再前一次被移除的内容，再按一次 M-y 又可以召回再上一次的……连续使用 M-y 直到找到你想要召回的东西，然后什么也不用做，继续编辑就行了。

如果连续按 M-y 很多次，你可能会回到起始点，也就是最近移除的文字。【看得出这实际上是一个环。】

## 搜索和替换

- C-s 向前搜索，将光标移动到下一个选中的位置
- C-r 向后搜索，将光标移动到下一个选中的位置
- M-% 搜索和替换，会要求输入搜索的文本和替换的文本，然后按‘space’表示接受替换，鼠标移到下一处，‘n’表示跳过本次替换，鼠标移到下一处，按‘!’替换所有处。

## 撤销（UNDO）

如果你修改了一段文字，又觉得改得不好，可以用 undo 命令进行撤销：C-/。

通常 C-/ 会消除一个命令所造成的所有改变；如果你在一行中连续多次地使用 C-/，你会把以前的命令也依次撤销。

C-_ 也是撤销命令；它的作用跟 C-/ 一样，但是它比较容易多次输入。在某些终端上，输入 C-/ 实际上向 Emacs 发送的是 C-_ 。另外， C-x u 和 C-/ 完全一样，但是按起来有些麻烦。

数字参数对于 C-/ 、 C-\_ 和 C-x u 的意义是执行撤销的重复次数。

## 剪切和粘贴

- 选中某段字符：C-space 指定起点，然后移动光标。再一次 C-space 取消选中。
- C-w 剪切当前选中的区段
- C-k 剪切从光标到“行尾”间的字符
- M-k 剪切从光标到“句尾”间的字符
- M-w 复制选中的区段
- M-y 将粘贴的区段，替换成倒数第二次剪切的内容
- C-y 粘贴
- M-<DEL> 剪切光标前的一个词
- M-d 剪切光标后的一个词

## 文件（FILE）

- C-x C-f <文件名>：打开指定文件
- C-x C-s ：储存这个文件
- C-x C-w ：另存为
- C-x k：放弃当前修改，不保存退出当前缓存区

## 缓冲区（BUFFER）

默认打开的缓存区：Message 和 Scratch。“_Messages_”缓冲区也没有对应文件，这个缓冲区里存放的都是在 Emacs 底部出现的消息。

- C-x C-b 列出缓冲区
- C-x 1 离开缓冲区列表
- C-x right 打开邻近的缓冲
- C-x left 打开邻近的缓冲
- C-x b <缓存区名> 打开指定缓存区
- C-x s 保存多个缓冲区

不管存在多少缓冲区，任何时候都只能有一个“当前”缓冲区，也就是你正在编辑的这个。如果你想编辑其它的缓冲区，就必须“切换”过去。上面讲过，用 C-x C-f 是一种办法。不过还有一个更简单的办法，那就是用 C-x b。用这条命令，你必须输入缓冲区的名称。

> > 通过输入 C-x C-f foo <Return> 创建一个名为“foo”的文件。
> > 然后输入 C-x b TUTORIAL.cn <Return> 回到这里。

大多数情况下，缓冲区与跟其对应的文件是同名的（不包括目录名），不过这也不是绝对的。用 C-x C-b 得到的缓冲区列表总是显示缓冲区名。

缓冲区未必有对应文件。显示缓冲区列表的缓冲区（叫做“_Buffer List_”）就是这样。这个 TUTORIAL.cn 缓冲区起初没有对应的文件，但是现在有了，因为在前一节你输入了 C-x C-s ， 将它保存成了一个文件。

## 多窗格（MULTIPLE WINDOWS）

- C-x 0 : 关闭活动窗格
- C-x 1 : 关闭除了当前窗格之外的所有窗格
- C-x 2 : 将当前窗格垂直分隔成两个窗格
- C-x 3 : 将当前窗格水平分隔成两个窗格
- 输入 C-x 4 C-f，紧跟着输入一个文件名，再用 <Return> 结束。可以看到你指定的文件出现在下方的窗格中，同时光标也跳到了那里。
- C-x o : 将光标切换到下一个窗格
- C-M-v：滚动另一个窗格（同时按住 Ctrl+Alt）

当你在一个窗格中编辑，但用另一个窗格作为参考的时候，C-M-v 是很有用的命令。无需离开被选中的窗格，你就可以用 C-M-v 命令滚动另外一个窗格中的文字。【比如翻译和校对就很适合用这种方式进行。】

C-M-v 是一个 CONTROL-META 组合键。如果你有 META （或 Alt）键的话，可以同时按住 CONTROL 和 META 键并输入 v。CONTROL 和 META 键先按哪个都可以，因为它们只是用来“修饰（modify）”你输入的字符的。如果你并没有 META 键，你也可以用 ESC 来代替，不过这样的话就要注意按键顺序了：你必须先输入 ESC ，然后再输入 CONTROL-v。CONTROL-ESC v 是没用的，因为 ESC 本身是一个字符键，而不是一个修饰键（modifier key）。

> > （在上方窗格里）输入 C-x 1 关掉下方窗格。

> > 输入 C-x o 回到上方的窗格，然后再用 C-x 1 关掉下方窗格。

## 多窗口（MULTIPLE FRAMES）

Emacs 可以创建多个窗口。窗口由许多窗格以及菜单、滚动条、回显区等组成。在图形界面下，多个窗口可以同时显示出来。在文本终端中，只能同时显示一个窗口。

> > 输入 M-x make-frame <Return>。

可以看到一个新的窗口出现在了你的屏幕上。

你可以在新的窗口里做最初的窗口里可以做的任何事情。第一个窗口没有什么特
别的。

> > 输入 M-x delete-frame <Return>.

这个命令将会关闭选中的窗口。

你也可以通过图形系统来关闭某个窗口（通常是在窗口上面的某个角落里的一个“X”按钮）。如果你关闭的是 Emacs 进程的最后一个窗口， Emacs 将会退出。
