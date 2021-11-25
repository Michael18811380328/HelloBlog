## 更好用的前端 npm link 工具-yalc

在组件依赖开发中，我的项目作为依赖库没方法独自间接运行，须要依赖进别的我的项目执行，这时候最罕用的形式就是`npm link`。但用`npm link`引入的依赖因为资源文件不在我的项目下，`webpack`不会对其做预编译，导致理论构建或者运行时会报错，此时如果间接将文件复制进依赖目录则能失常运行。对于这样的状况，意外的碰到了一个很适宜的解决方案——yalc。

### Yalc

`yalc` 能够在本地将`npm包`模仿公布，将公布后的资源寄存在一个全局存储中。而后能够通过`yalc`将包增加进须要援用的我的项目中。

这时候`package.json`的依赖表中会多出一个`file:.yalc/...`的依赖包，这就是`yalc`创立的非凡援用。同时也会在我的项目根目录创立一个`yalc.lock`确保援用资源的一致性。因而，测试完我的项目还须要执行删除`yalc`包的操作，能力失常应用。

整个过程绝对于`npm link`会更加繁琐一些，要通过发包、增加依赖，完结后也须要做革除操作，但也正因而才防止了`npm link`的一些问题。

### 装置

```
NPM:
npm i yalc -g

Yarn:
yarn global add yalc
```

### 公布依赖

在所开发的依赖我的项目下执行公布操作

```
yalc publish
```

此时如果存在`npm 生命周期`脚本：`prepublish`、`prepare`、`prepublishOnly`、`prepack`、`preyalcpublish`，会按此程序逐个执行。如果存在：`postyalcpublish`、`postpack`、`publish`、`postpublish`，也会按此程序逐个执行。

想要齐全禁用脚本执行须要应用

```
yalc publish --no-scripts
```

此时就曾经将依赖公布到本地了。

### 增加依赖

进入到我的项目执行

```
yalc add 我的项目名
```

能够看到我的项目中增加了`yalc.lock`文件，`package.json`对应的包名会有个地址为`file:.yalc/`结尾的我的项目。
也能够应用

```
yalc add 我的项目名@版本号
```

将版本锁定，防止因为本地新包推送产生影响。

`--dev`将依赖增加进`dependency`中。`--pure`不会影响`package.json`文件。

除此之外，还能应用`link`形式援用依赖包。

```
yalc add 我的项目名 --link
```

### 更新依赖

当有新批改的包须要公布时，应用推送命令能够疾速的更新所有依赖

```
yalc publish --push
```

或是简写

```
yalc push
```

### 移除依赖

```
yalc remove 我的项目名
```

或是移除所有

```
yalc remove --all
```