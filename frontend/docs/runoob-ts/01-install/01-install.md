
## 01 安装和编译

## 安装

~~~bash
npm install -g typescript
tsc -v
~~~

## 编译

Then we use tsc to compile ts into js

~~~bash
touch 01-install.ts
tsc 01-install.ts
node 01.install.js
~~~

### 编译多个文件

我们可以同时编译多个 ts 文件

~~~bash
tsc 01.ts 02.ts 03.ts
~~~

### 编译配置

--module 载入扩展模块

--target 设置ECMA版本 `tsc test.ts --target es6` 可以把代码编译成ES6版本

--declaration 编译成 js 同时生成一个 .d.ts 扩展名的文件

--removeComments 删除文件的注释

--out 编译多个文件并合并到一个输出的文件

--sourcemap 生成一个 sourcemap (.map) 文件。sourcemap 是一个存储源代码与编译代码对应位置映射的信息文件。

--module noImplicitAny 在表达式和声明上有隐含的 any 类型时报错

--watch 在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。（动态编译，ts文件变化后自动编译）

