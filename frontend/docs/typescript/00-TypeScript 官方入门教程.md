# TypeScript 官方入门教程

https://www.tslang.cn/docs/handbook/typescript-in-5-minutes.html

让我们使用TypeScript来创建一个简单的Web应用。

## 安装TypeScript

有两种主要的方式来获取TypeScript工具：

- 通过npm（Node.js包管理器）
- 安装Visual Studio的TypeScript插件

Visual Studio 2017和Visual Studio 2015 Update 3默认包含了TypeScript。 如果你的Visual Studio还没有安装TypeScript，你可以[下载](https://www.tslang.cn/#download-links)它。

针对使用npm的用户：

```
> npm install -g typescript
```

## 构建你的第一个TypeScript文件

在编辑器，将下面的代码输入到`greeter.ts`文件里：

```
function greeter(person) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);
```

## 编译代码

我们使用了`.ts`扩展名，但是这段代码仅仅是JavaScript而已。 你可以直接从现有的JavaScript应用里复制/粘贴这段代码。

在命令行上，运行TypeScript编译器：

```
tsc greeter.ts
```

输出结果为一个`greeter.js`文件，它包含了和输入文件中相同的JavsScript代码。 一切准备就绪，我们可以运行这个使用TypeScript写的JavaScript应用了！

接下来让我们看看TypeScript工具带来的高级功能。 给 `person`函数的参数添加`: string`类型注解，如下：

```
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);
```

## 类型注解

TypeScript里的类型注解是一种轻量级的为函数或变量添加约束的方式。 在这个例子里，我们希望 `greeter`函数接收一个字符串参数。 然后尝试把 `greeter`的调用改成传入一个数组：

```
function greeter(person: string) {
    return "Hello, " + person;
}

let user = [0, 1, 2];

document.body.innerHTML = greeter(user);
```

重新编译，你会看到产生了一个错误。

```
greeter.ts(7,26): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

类似地，尝试删除`greeter`调用的所有参数。 TypeScript会告诉你使用了非期望个数的参数调用了这个函数。 在这两种情况中，TypeScript提供了静态的代码分析，它可以分析代码结构和提供的类型注解。

要注意的是尽管有错误，`greeter.js`文件还是被创建了。 就算你的代码里有错误，你仍然可以使用TypeScript。但在这种情况下，TypeScript会警告你代码可能不会按预期执行。

## 接口

让我们开发这个示例应用。这里我们使用接口来描述一个拥有`firstName`和`lastName`字段的对象。 在TypeScript里，只在两个类型内部的结构兼容那么这两个类型就是兼容的。 这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 `implements`语句。

```
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);
```

## 类

最后，让我们使用类来改写这个例子。 TypeScript支持JavaScript的新特性，比如支持基于类的面向对象编程。

让我们创建一个`Student`类，它带有一个构造函数和一些公共字段。 注意类和接口可以一起共作，程序员可以自行决定抽象的级别。

还要注意的是，在构造函数的参数上使用`public`等同于创建了同名的成员变量。

```
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
```

重新运行`tsc greeter.ts`，你会看到生成的JavaScript代码和原先的一样。 TypeScript里的类只是JavaScript里常用的基于原型面向对象编程的简写。

## 运行TypeScript Web应用

在`greeter.html`里输入如下内容：

```
<!DOCTYPE html>
<html>
    <head><title>TypeScript Greeter</title></head>
    <body>
        <script src="greeter.js"></script>
    </body>
</html>
```

在浏览器里打开`greeter.html`运行这个应用！

可选地：在Visual Studio里打开`greeter.ts`或者把代码复制到TypeScript playground。 将鼠标悬停在标识符上查看它们的类型。 注意在某些情况下它们的类型可以被自动地推断出来。 重新输入一下最后一行代码，看一下自动补全列表和参数列表，它们会根据DOM元素类型而变化。 将光标放在 `greeter`函数上，点击F12可以跟踪到它的定义。 还有一点，你可以右键点击标识，使用重构功能来重命名。

这些类型信息以及工具可以很好的和JavaScript一起工作。 更多的TypeScript功能演示，请查看本网站的[起步](https://www.tslang.cn/samples/index.html)部分。

![Visual Studio picture](https://www.tslang.cn/assets/images/docs/greet_person.png)

# 01 上手TypeScript

## 安装TypeScript

有两种主要的方式来获取TypeScript工具：

- 通过npm（Node.js包管理器）
- 安装Visual Studio的TypeScript插件

Visual Studio 2017和Visual Studio 2015 Update 3默认包含了TypeScript。 如果你的Visual Studio还没有安装TypeScript，你可以[下载](https://www.tslang.cn/#download-links)它。

针对使用npm的用户：

```
> npm install -g typescript
```

## 构建你的第一个TypeScript文件

在编辑器，将下面的代码输入到`greeter.ts`文件里：

```typescript
function greeter(person) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);

// eg
function greeter(person) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);
```

## 编译代码

我们使用了`.ts`扩展名，但是这段代码仅仅是JavaScript而已。 你可以直接从现有的JavaScript应用里复制/粘贴这段代码。

在命令行上，运行TypeScript编译器：

```bash
tsc greeter.ts
```

输出结果为一个`greeter.js`文件，它包含了和输入文件中相同的JavsScript代码。 一切准备就绪，我们可以运行这个使用TypeScript写的JavaScript应用了！

接下来让我们看看TypeScript工具带来的高级功能。 给 `person`函数的参数添加`: string`类型注解，如下：

```
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);
```

## 类型注解

TypeScript里的类型注解是一种轻量级的为函数或变量添加约束的方式。 在这个例子里，我们希望 `greeter`函数接收一个字符串参数。 然后尝试把 `greeter`的调用改成传入一个数组：

```
function greeter(person: string) {
    return "Hello, " + person;
}

let user = [0, 1, 2];

document.body.innerHTML = greeter(user);
```

重新编译，你会看到产生了一个错误。

```
greeter.ts(7,26): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

类似地，尝试删除`greeter`调用的所有参数。 TypeScript会告诉你使用了非期望个数的参数调用了这个函数。 在这两种情况中，TypeScript提供了静态的代码分析，它可以分析代码结构和提供的类型注解。

要注意的是尽管有错误，`greeter.js`文件还是被创建了。 就算你的代码里有错误，你仍然可以使用TypeScript。但在这种情况下，TypeScript会警告你代码可能不会按预期执行。

## 接口

让我们开发这个示例应用。这里我们使用接口来描述一个拥有`firstName`和`lastName`字段的对象。 在TypeScript里，只在两个类型内部的结构兼容那么这两个类型就是兼容的。 这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 `implements`语句。

```
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);
```

## 类

最后，让我们使用类来改写这个例子。 TypeScript支持JavaScript的新特性，比如支持基于类的面向对象编程。

让我们创建一个`Student`类，它带有一个构造函数和一些公共字段。 注意类和接口可以一起共作，程序员可以自行决定抽象的级别。

还要注意的是，在构造函数的参数上使用`public`等同于创建了同名的成员变量。

```
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
```

重新运行`tsc greeter.ts`，你会看到生成的JavaScript代码和原先的一样。 TypeScript里的类只是JavaScript里常用的基于原型面向对象编程的简写。

## 运行TypeScript Web应用

在`greeter.html`里输入如下内容：

```
<!DOCTYPE html>
<html>
    <head><title>TypeScript Greeter</title></head>
    <body>
        <script src="greeter.js"></script>
    </body>
</html>
```

在浏览器里打开`greeter.html`运行这个应用！

可选地：在Visual Studio里打开`greeter.ts`或者把代码复制到TypeScript playground。 将鼠标悬停在标识符上查看它们的类型。 注意在某些情况下它们的类型可以被自动地推断出来。 重新输入一下最后一行代码，看一下自动补全列表和参数列表，它们会根据DOM元素类型而变化。 将光标放在 `greeter`函数上，点击F12可以跟踪到它的定义。 还有一点，你可以右键点击标识，使用重构功能来重命名。

这些类型信息以及工具可以很好的和JavaScript一起工作。 更多的TypeScript功能演示，请查看本网站的[起步](https://www.tslang.cn/samples/index.html)部分。

![Visual Studio picture](https://www.tslang.cn/assets/images/docs/greet_person.png)

# TS-Gulp

这篇快速上手指南将教你如何使用[Gulp](http://gulpjs.com/)构建TypeScript，和如何在Gulp管道里添加[Browserify](http://browserify.org/)， [uglify](http://lisperator.net/uglifyjs/)或[Watchify](https://github.com/substack/watchify)。 它还包涵了 [Babel](https://babeljs.io/)的功能，通过使用[Babelify](https://github.com/babel/babelify)。

这里假设你已经在使用[Node.js](https://nodejs.org/)和[npm](https://www.npmjs.com/)了。

# 创建简单工程

我们首先创建一个新目录。 命名为 `proj`，也可以使用任何你喜欢的名字。

```
mkdir proj
cd proj
```

我们将以下面的结构开始我们的工程：

```
proj/
   ├─ src/
   └─ dist/
```

TypeScript文件放在`src`文件夹下，经过TypeScript编译器编译生成的目标文件放在`dist`目录下。

下面让我们来创建这些文件夹：

```
mkdir src
mkdir dist
```

## 初始化工程

现在让我们把这个文件夹转换成npm包：

```
npm init
```

你将看到有一些提示操作。 除了入口文件外，其余的都可以使用默认项。 入口文件使用 `./dist/main.js`。 你可以随时在 `package.json`文件里更改生成的配置。

## 安装依赖项

现在我们可以使用`npm install`命令来安装包。 首先全局安装TypeScript和Gulp。 （如果你正在使用Unix系统，你可能需要使用 `sudo`命令来启动`npm install`命令行。）

```
npm install -g gulp-cli
```

然后安装`typescript`，`gulp`和`gulp-typescript`到开发依赖项。 [Gulp-typescript](https://www.npmjs.com/package/gulp-typescript)是TypeScript的一个Gulp插件。

```
npm install --save-dev typescript gulp gulp-typescript
```

## 写一个简单的例子

让我们写一个Hello World程序。 在 `src`目录下创建`main.ts`文件：

```
function hello(compiler: string) {
    console.log(`Hello from ${compiler}`);
}
hello("TypeScript");
```

在工程的根目录`proj`下新建一个`tsconfig.json`文件：

```
{
    "files": [
        "src/main.ts"
    ],
    "compilerOptions": {
        "noImplicitAny": true,
        "target": "es5"
    }
}
```

## 新建`gulpfile.js`文件

在工程根目录下，新建一个`gulpfile.js`文件：

```
var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});
```

## 测试这个应用

```
gulp
node dist/main.js
```

程序应该能够打印出“Hello from TypeScript!”。

# 向代码里添加模块

在使用Browserify前，让我们先构建一下代码然后再添加一些混入的模块。 这个结构将是你在真实应用程序中会用到的。

新建一个`src/greet.ts`文件：

```
export function sayHello(name: string) {
    return `Hello from ${name}`;
}
```

更改`src/main.ts`代码，从`greet.ts`导入`sayHello`：

```
import { sayHello } from "./greet";

console.log(sayHello("TypeScript"));
```

最后，将`src/greet.ts`添加到`tsconfig.json`：

```
{
    "files": [
        "src/main.ts",
        "src/greet.ts"
    ],
    "compilerOptions": {
        "noImplicitAny": true,
        "target": "es5"
    }
}
```

确保执行`gulp`后模块是能工作的，在Node.js下进行测试：

```
gulp
node dist/main.js
```

注意，即使我们使用了ES2015的模块语法，TypeScript还是会生成Node.js使用的CommonJS模块。 我们在这个教程里会一直使用CommonJS模块，但是你可以通过修改 `module`选项来改变这个行为。

# Browserify

现在，让我们把这个工程由Node.js环境移到浏览器环境里。 因此，我们将把所有模块捆绑成一个JavaScript文件。 所幸，这正是Browserify要做的事情。 更方便的是，它支持Node.js的CommonJS模块，这也正是TypeScript默认生成的类型。 也就是说TypeScript和Node.js的设置不需要改变就可以移植到浏览器里。

首先，安装Browserify，[tsify](https://www.npmjs.com/package/tsify)和vinyl-source-stream。 tsify是Browserify的一个插件，就像gulp-typescript一样，它能够访问TypeScript编译器。 vinyl-source-stream会将Browserify的输出文件适配成gulp能够解析的格式，它叫做[vinyl](https://github.com/gulpjs/vinyl)。

```
npm install --save-dev browserify tsify vinyl-source-stream
```

## 新建一个页面

在`src`目录下新建一个`index.html`文件：

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Hello World!</title>
    </head>
    <body>
        <p id="greeting">Loading ...</p>
        <script src="bundle.js"></script>
    </body>
</html>
```

修改`main.ts`文件来更新这个页面：

```
import { sayHello } from "./greet";

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}

showHello("greeting", "TypeScript");
```

`showHello`调用`sayHello`函数更改页面上段落的文字。 现在修改gulpfile文件如下：

```
var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var paths = {
    pages: ['src/*.html']
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["copy-html"], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("dist"));
});
```

这里增加了`copy-html`任务并且把它加作`default`的依赖项。 这样，当 `default`执行时，`copy-html`会被首先执行。 我们还修改了 `default`任务，让它使用`tsify`插件调用Browserify，而不是`gulp-typescript`。 方便的是，两者传递相同的参数对象到TypeScript编译器。

调用`bundle`后，我们使用`source`（vinyl-source-stream的别名）把输出文件命名为`bundle.js`。

测试此页面，运行`gulp`，然后在浏览器里打开`dist/index.html`。 你应该能在页面上看到“Hello from TypeScript”。

注意，我们为Broswerify指定了`debug: true`。 这会让 `tsify`在输出文件里生成`source maps`。 `source maps`允许我们在浏览器中直接调试TypeScript源码，而不是在合并后的JavaScript文件上调试。 你要打开调试器并在 `main.ts`里打一个断点，看看`source maps`是否能工作。 当你刷新页面时，代码会停在断点处，从而你就能够调试 `greet.ts`。

# Watchify，Babel和Uglify

现在代码已经用Browserify和tsify捆绑在一起了，我们可以使用Browserify插件为构建添加一些特性。

- Watchify启动Gulp并保持运行状态，当你保存文件时自动编译。 帮你进入到编辑-保存-刷新浏览器的循环中。
- Babel是个十分灵活的编译器，将ES2015及以上版本的代码转换成ES5和ES3。 你可以添加大量自定义的TypeScript目前不支持的转换器。
- Uglify帮你压缩代码，将花费更少的时间去下载它们。

## Watchify

我们启动Watchify，让它在后台帮我们编译：

```
npm install --save-dev watchify gulp-util
```

修改gulpfile文件如下：

```
var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var paths = {
    pages: ['src/*.html']
};

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
}

gulp.task("default", ["copy-html"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
```

共有三处改变，但是需要你略微重构一下代码。

1. 将`browserify`实例包裹在`watchify`的调用里，控制生成的结果。
2. 调用`watchedBrowserify.on("update", bundle);`，每次TypeScript文件改变时Browserify会执行`bundle`函数。
3. 调用`watchedBrowserify.on("log", gutil.log);`将日志打印到控制台。

(1)和(2)在一起意味着我们要将`browserify`调用移出`default`任务。 然后给函数起个名字，因为Watchify和Gulp都要调用它。 (3)是可选的，但是对于调试来讲很有用。

现在当你执行`gulp`，它会启动并保持运行状态。 试着改变 `main.ts`文件里`showHello`的代码并保存。 你会看到这样的输出：

```
proj$ gulp
[10:34:20] Using gulpfile ~/src/proj/gulpfile.js
[10:34:20] Starting 'copy-html'...
[10:34:20] Finished 'copy-html' after 26 ms
[10:34:20] Starting 'default'...
[10:34:21] 2824 bytes written (0.13 seconds)
[10:34:21] Finished 'default' after 1.36 s
[10:35:22] 2261 bytes written (0.02 seconds)
[10:35:24] 2808 bytes written (0.05 seconds)
```

## Uglify

首先安装Uglify。 因为Uglify是用于混淆你的代码，所以我们还要安装vinyl-buffer和gulp-sourcemaps来支持sourcemaps。

```
npm install --save-dev gulp-uglify vinyl-buffer gulp-sourcemaps
```

修改gulpfile文件如下：

```
var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
    pages: ['src/*.html']
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["copy-html"], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("dist"));
});
```

注意`uglify`只是调用了自己—`buffer`和`sourcemaps`的调用是用于确保sourcemaps可以工作。 这些调用让我们可以使用单独的sourcemap文件，而不是之前的内嵌的sourcemaps。 你现在可以执行 `gulp`来检查`bundle.js`是否被压缩了：

```
gulp
cat dist/bundle.js
```

## Babel

首先安装Babelify和ES2015的Babel预置程序。 和Uglify一样，Babelify也会混淆代码，因此我们也需要vinyl-buffer和gulp-sourcemaps。 默认情况下Babelify只会处理扩展名为 `.js`，`.es`，`.es6`和`.jsx`的文件，因此我们需要添加`.ts`扩展名到Babelify选项。

```
npm install --save-dev babelify babel-core babel-preset-es2015 vinyl-buffer gulp-sourcemaps
```

修改gulpfile文件如下：

```
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
    pages: ['src/*.html']
};

gulp.task('copyHtml', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['copyHtml'], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .transform('babelify', {
        presets: ['es2015'],
        extensions: ['.ts']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});
```

我们需要设置TypeScript目标为ES2015。 Babel稍后会从TypeScript生成的ES2015代码中生成ES5。 修改`tsconfig.json`:

```
{
    "files": [
        "src/main.ts"
    ],
    "compilerOptions": {
        "noImplicitAny": true,
        "target": "es2015"
    }
}
```

对于这样一段简单的代码来说，Babel的ES5输出应该和TypeScript的输出相似。

# JavaScript迁移

TypeScript不是存在于真空中。 它从JavaScript生态系统和大量现存的JavaScript而来。 将JavaScript代码转换成TypeScript虽乏味却不是难事。 接下来这篇教程将教你怎么做。 在开始转换TypeScript之前，我们假设你已经理解了足够多本手册里的内容。

# 设置目录

如果你在写纯JavaScript，你大概是想直接运行这些JavaScript文件， 这些文件存在于 `src`，`lib`或`dist`目录里，它们可以按照预想运行。

若如此，那么你写的纯JavaScript文件将做为TypeScript的输入，你将要运行的是TypeScript的输出。 在从JS到TS的转换过程中，我们会分离输入文件以防TypeScript覆盖它们。 你也可以指定输出目录。

你可能还需要对JavaScript做一些中间处理，比如合并或经过Babel再次编译。 在这种情况下，你应该已经有了如下的目录结构。

那么现在，我们假设你已经设置了这样的目录结构：

```
projectRoot
├── src
│   ├── file1.js
│   └── file2.js
├── built
└── tsconfig.json
```

如果你在`src`目录外还有`tests`文件夹，那么在`src`里可以有一个`tsconfig.json`文件，在`tests`里还可以有一个。

# 书写配置文件

TypeScript使用`tsconfig.json`文件管理工程配置，例如你想包含哪些文件和进行哪些检查。 让我们先创建一个简单的工程配置文件：

```
{
    "compilerOptions": {
        "outDir": "./built",
        "allowJs": true,
        "target": "es5"
    },
    "include": [
        "./src/**/*"
    ]
}
```

这里我们为TypeScript设置了一些东西:

1. 读取所有可识别的`src`目录下的文件（通过`include`）。
2. 接受JavaScript做为输入（通过`allowJs`）。
3. 生成的所有文件放在`built`目录下（通过`outDir`）。
4. 将JavaScript代码降级到低版本比如ECMAScript 5（通过`target`）。

现在，如果你在工程根目录下运行`tsc`，就可以在`built`目录下看到生成的文件。 `built`下的文件应该与`src`下的文件相同。 现在你的工程里的TypeScript已经可以工作了。

## 早期收益

现在你已经可以看到TypeScript带来的好处，它能帮助我们理解当前工程。 如果你打开像 [VS Code](https://code.visualstudio.com/)或[Visual Studio](https://visualstudio.com/)这样的编译器，你就能使用像自动补全这样的工具。 你还可以配置如下的选项来帮助查找BUG：

- `noImplicitReturns` 会防止你忘记在函数末尾返回值。
- `noFallthroughCasesInSwitch` 会防止在`switch`代码块里的两个`case`之间忘记添加`break`语句。

TypeScript还能发现那些执行不到的代码和标签，你可以通过设置`allowUnreachableCode`和`allowUnusedLabels`选项来禁用。

# 与构建工具进行集成

在你的构建管道中可能包含多个步骤。 比如为每个文件添加一些内容。 每种工具的使用方法都是不同的，我们会尽可能的包涵主流的工具。

## Gulp

如果你在使用时髦的Gulp，我们已经有一篇关于[使用Gulp](https://www.tslang.cn/docs/handbook/gulp.html)结合TypeScript并与常见构建工具Browserify，Babelify和Uglify进行集成的教程。 请阅读这篇教程。

## Webpack

Webpack集成非常简单。 你可以使用 `ts-loader`，它是一个TypeScript的加载器，结合`source-map-loader`方便调试。 运行：

```
npm install ts-loader source-map-loader
```

并将下面的选项合并到你的`webpack.config.js`文件里：

```
module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./dist/bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // Other options...
};
```

要注意的是`ts-loader`必须在其它处理`.js`文件的加载器之前运行。 你可以在[React和Webpack教程](https://www.tslang.cn/docs/handbook/react-&-webpack.html)里找到使用Webpack的例子。

# 转换到TypeScript文件

到目前为止，你已经做好了使用TypeScript文件的准备。 第一步，将 `.js`文件重命名为`.ts`文件。 如果你使用了JSX，则重命名为 `.tsx`文件。

第一步达成？ 太棒了! 你已经成功地将一个文件从JavaScript转换成了TypeScript!

当然了，你可能感觉哪里不对劲儿。 如果你在支持TypeScript的编辑器（或运行 `tsc --pretty`）里打开了那个文件，你可能会看到有些行上有红色的波浪线。 你可以把它们当做在Microsoft Word里看到的红色波浪线一样。 但是TypeScript仍然会编译你的代码，就好比Word还是允许你打印你的文档一样。

如果对你来说这种行为太随便了，你可以让它变得严格些。 如果，你 *不想*在发生错误的时候，TypeScript还会被编译成JavaScript，你可以使用`noEmitOnError`选项。 从某种意义上来讲，TypeScript具有一个调整它的严格性的刻度盘，你可以将指针拔动到你想要的位置。

如果你计划使用可用的高度严格的设置，最好现在就启用它们（查看[启用严格检查](https://www.tslang.cn/docs/handbook/migrating-from-javascript.html#getting-stricter-checks)）。 比如，如果你不想让TypeScript将没有明确指定的类型默默地推断为 `any`类型，可以在修改文件之前启用`noImplicitAny`。 你可能会觉得这有些过度严格，但是长期收益很快就能显现出来。

## 去除错误

我们提到过，若不出所料，在转换后将会看到错误信息。 重要的是我们要逐一的查看它们并决定如何处理。 通常这些都是真正的BUG，但有时必须要告诉TypeScript你要做的是什么。

### 由模块导入

首先你可能会看到一些类似`Cannot find name 'require'.`和`Cannot find name 'define'.`的错误。 遇到这种情况说明你在使用模块。 你仅需要告诉TypeScript它们是存在的：

```
// For Node/CommonJS
declare function require(path: string): any;
```

或

```
// For RequireJS/AMD
declare function define(...args: any[]): any;
```

最好是避免使用这些调用而改用TypeScript的导入语法。

首先，你要使用TypeScript的`module`标记来启用一些模块系统。 可用的选项有 `commonjs`，`amd`，`system`，and `umd`。

如果代码里存在下面的Node/CommonJS代码：

```
var foo = require("foo");

foo.doStuff();
```

或者下面的RequireJS/AMD代码：

```
define(["foo"], function(foo) {
    foo.doStuff();
})
```

那么可以写做下面的TypeScript代码：

```
import foo = require("foo");

foo.doStuff();
```

### 获取声明文件

如果你开始做转换到TypeScript导入，你可能会遇到`Cannot find module 'foo'.`这样的错误。 问题出在没有*声明文件*来描述你的代码库。 幸运的是这非常简单。 如果TypeScript报怨像是没有 `lodash`包，那你只需这样做

```
npm install -s @types/lodash
```

如果你没有使用`commonjs`模块模块选项，那么就需要将`moduleResolution`选项设置为`node`。

之后，你应该就可以导入`lodash`了，并且会获得精确的自动补全功能。

### 由模块导出

通常来讲，由模块导出涉及添加属性到`exports`或`module.exports`。 TypeScript允许你使用顶级的导出语句。 比如，你要导出下面的函数：

```
module.exports.feedPets = function(pets) {
    // ...
}
```

那么你可以这样写：

```
export function feedPets(pets) {
    // ...
}
```

有时你会完全重写导出对象。 这是一个常见模式，这会将模块变为可立即调用的模块：

```
var express = require("express");
var app = express();
```

之前你可以是这样写的：

```
function foo() {
    // ...
}
module.exports = foo;
```

在TypeScript里，你可以使用`export =`来代替。

```
function foo() {
    // ...
}
export = foo;
```

### 过多或过少的参数

有时你会发现你在调用一个具有过多或过少参数的函数。 通常，这是一个BUG，但在某些情况下，你可以声明一个使用 `arguments`对象的函数而不需要写出所有参数:

```
function myCoolFunction() {
    if (arguments.length == 2 && !Array.isArray(arguments[1])) {
        var f = arguments[0];
        var arr = arguments[1];
        // ...
    }
    // ...
}

myCoolFunction(function(x) { console.log(x) }, [1, 2, 3, 4]);
myCoolFunction(function(x) { console.log(x) }, 1, 2, 3, 4);
```

这种情况下，我们需要利用TypeScript的函数重载来告诉调用者`myCoolFunction`函数的调用方式。

```
function myCoolFunction(f: (x: number) => void, nums: number[]): void;
function myCoolFunction(f: (x: number) => void, ...nums: number[]): void;
function myCoolFunction() {
    if (arguments.length == 2 && !Array.isArray(arguments[1])) {
        var f = arguments[0];
        var arr = arguments[1];
        // ...
    }
    // ...
}
```

我们为`myCoolFunction`函数添加了两个重载签名。 第一个检查 `myCoolFunction`函数是否接收一个函数（它又接收一个`number`参数）和一个`number`数组。 第二个同样是接收了一个函数，并且使用剩余参数（`...nums`）来表示之后的其它所有参数必须是`number`类型。

### 连续添加属性

有些人可能会因为代码美观性而喜欢先创建一个对象然后立即添加属性：

```
var options = {};
options.color = "red";
options.volume = 11;
```

TypeScript会提示你不能给`color`和`volumn`赋值，因为先前指定`options`的类型为`{}`并不带有任何属性。 如果你将声明变成对象字面量的形式将不会产生错误：

```
let options = {
    color: "red",
    volume: 11
};
```

你还可以定义`options`的类型并且添加类型断言到对象字面量上。

```
interface Options { color: string; volume: number }

let options = {} as Options;
options.color = "red";
options.volume = 11;
```

或者，你可以将`options`指定成`any`类型，这是最简单的，但也是获益最少的。

### `any`，`Object`，和`{}`

你可能会试图使用`Object`或`{}`来表示一个值可以具有任意属性，因为`Object`是最通用的类型。 然而在这种情况下** `any`是真正想要使用的类型**，因为它是最*灵活*的类型。

比如，有一个`Object`类型的东西，你将不能够在其上调用`toLowerCase()`。

越普通意味着更少的利用类型，但是`any`比较特殊，它是最普通的类型但是允许你在上面做任何事情。 也就是说你可以在上面调用，构造它，访问它的属性等等。 记住，当你使用 `any`时，你会失去大多数TypeScript提供的错误检查和编译器支持。

如果你还是决定使用`Object`和`{}`，你应该选择`{}`。 虽说它们基本一样，但是从技术角度上来讲 `{}`在一些深奥的情况里比`Object`更普通。

## 启用严格检查

TypeScript提供了一些检查来保证安全以及帮助分析你的程序。 当你将代码转换为了TypeScript后，你可以启用这些检查来帮助你获得高度安全性。

### 没有隐式的`any`

在某些情况下TypeScript没法确定某些值的类型。 那么TypeScript会使用 `any`类型代替。 这对代码转换来讲是不错，但是使用 `any`意味着失去了类型安全保障，并且你得不到工具的支持。 你可以使用 `noImplicitAny`选项，让TypeScript标记出发生这种情况的地方，并给出一个错误。

### 严格的`null`与`undefined`检查

默认地，TypeScript把`null`和`undefined`当做属于任何类型。 这就是说，声明为 `number`类型的值可以为`null`和`undefined`。 因为在JavaScript和TypeScript里， `null`和`undefined`经常会导致BUG的产生，所以TypeScript包含了`strictNullChecks`选项来帮助我们减少对这种情况的担忧。

当启用了`strictNullChecks`，`null`和`undefined`获得了它们自己各自的类型`null`和`undefined`。 当任何值 *可能*为`null`，你可以使用联合类型。 比如，某值可能为 `number`或`null`，你可以声明它的类型为`number | null`。

假设有一个值TypeScript认为可以为`null`或`undefined`，但是你更清楚它的类型，你可以使用`!`后缀。

```
declare var foo: string[] | null;

foo.length;  // error - 'foo' is possibly 'null'

foo!.length; // okay - 'foo!' just has type 'string[]'
```

要当心，当你使用`strictNullChecks`，你的依赖也需要相应地启用`strictNullChecks`。

### `this`没有隐式的`any`

当你在类的外部使用`this`关键字时，它会默认获得`any`类型。 比如，假设有一个 `Point`类，并且我们要添加一个函数做为它的方法：

```
class Point {
    constructor(public x, public y) {}
    getDistance(p: Point) {
        let dx = p.x - this.x;
        let dy = p.y - this.y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }
}
// ...

// Reopen the interface.
interface Point {
    distanceFromOrigin(point: Point): number;
}
Point.prototype.distanceFromOrigin = function(point: Point) {
    return this.getDistance({ x: 0, y: 0});
}
```

这就产生了我们上面提到的错误 - 如果我们错误地拼写了`getDistance`并不会得到一个错误。 正因此，TypeScript有 `noImplicitThis`选项。 当设置了它，TypeScript会产生一个错误当没有明确指定类型（或通过类型推断）的 `this`被使用时。 解决的方法是在接口或函数上使用指定了类型的 `this`参数：

```
Point.prototype.distanceFromOrigin = function(this: Point, point: Point) {
    return this.getDistance({ x: 0, y: 0});
}
```

# React & Webpack

这篇指南将会教你如何将TypeScript和[React](https://reactjs.org/)还有[webpack](http://webpack.github.io/)结合在一起使用。

如果你正在做一个全新的工程，可以先阅读这篇[React快速上手指南](https://www.tslang.cn/samples/index.html)。

否则，我们假设已经在使用[Node.js](https://nodejs.org/)和[npm](https://www.npmjs.com/)。

# 初始化项目结构

让我们新建一个目录。 将会命名为 `proj`，但是你可以改成任何你喜欢的名字。

```
mkdir proj
cd proj
```

我们会像下面的结构组织我们的工程：

```
proj/
├─ dist/
└─ src/
   └─ components/
```

TypeScript文件会放在`src`文件夹里，通过TypeScript编译器编译，然后经webpack处理，最后生成一个`bundle.js`文件放在`dist`目录下。 我们自定义的组件将会放在 `src/components`文件夹下。

下面来创建基本结构：

```
mkdir src
cd src
mkdir components
cd ..
```

Webpack会帮助我们生成`dist`目录。

# 初始化工程

现在把这个目录变成npm包。

```
npm init
```

你会看到一些提示，放心地使用默认值就可以了。 当然，你也可以随时到生成的 `package.json`文件里修改。

# 安装依赖

首先确保已经全局安装了Webpack。

```
npm install -g webpack
```

Webpack这个工具可以将你的所有代码和可选择地将依赖捆绑成一个单独的`.js`文件。

现在我们添加React和React-DOM以及它们的声明文件到`package.json`文件里做为依赖：

```
npm install --save react react-dom @types/react @types/react-dom
```

使用`@types/`前缀表示我们额外要获取React和React-DOM的声明文件。 通常当你导入像 `"react"`这样的路径，它会查看`react`包； 然而，并不是所有的包都包含了声明文件，所以TypeScript还会查看 `@types/react`包。 你会发现我们以后将不必在意这些。

接下来，我们要添加开发时依赖[awesome-typescript-loader](https://www.npmjs.com/package/awesome-typescript-loader)和[source-map-loader](https://www.npmjs.com/package/source-map-loader)。

```
npm install --save-dev typescript awesome-typescript-loader source-map-loader
```

这些依赖会让TypeScript和webpack在一起良好地工作。 awesome-typescript-loader可以让Webpack使用TypeScript的标准配置文件 `tsconfig.json`编译TypeScript代码。 source-map-loader使用TypeScript输出的sourcemap文件来告诉webpack何时生成 *自己的*sourcemaps。 这就允许你在调试最终生成的文件时就好像在调试TypeScript源码一样。

注意我们安装TypeScript为一个开发依赖。 我们还可以使用 `npm link typescript`来链接TypeScript到一个全局拷贝，但这不是常见用法。

# 添加TypeScript配置文件

我们想将TypeScript文件整合到一起 - 这包括我们写的源码和必要的声明文件。

我们需要创建一个`tsconfig.json`文件，它包含了输入文件列表以及编译选项。 在工程根目录下新建文件`tsconfig.json`文件，添加以下内容：

```
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react"
    },
    "include": [
        "./src/**/*"
    ]
}
```

你可以在[这里](https://www.tslang.cn/docs/handbook/tsconfig-json.html)了解更多关于`tsconfig.json`文件的说明。

# 写些代码

下面使用React写一段TypeScript代码。 首先，在 `src/components`目录下创建一个名为`Hello.tsx`的文件，代码如下：

```
import * as React from "react";

export interface HelloProps { compiler: string; framework: string; }

export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;
```

注意这个例子使用了[无状态的功能组件](https://reactjs.org/docs/components-and-props.html#functional-and-class-components)，我们可以让它更像一点*类*。

```
import * as React from "react";

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}
```

接下来，在`src`下创建`index.tsx`文件，源码如下：

```
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);
```

我们仅仅将`Hello`组件导入`index.tsx`。 注意，不同于 `"react"`或`"react-dom"`，我们使用`Hello.tsx`的*相对路径* - 这很重要。 如果不这样做，TypeScript只会尝试在 `node_modules`文件夹里查找。

我们还需要一个页面来显示`Hello`组件。 在根目录 `proj`创建一个名为`index.html`的文件，如下：

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Hello React!</title>
    </head>
    <body>
        <div id="example"></div>

        <!-- Dependencies -->
        <script src="./node_modules/react/umd/react.development.js"></script>
        <script src="./node_modules/react-dom/umd/react-dom.development.js"></script>

        <!-- Main -->
        <script src="./dist/bundle.js"></script>
    </body>
</html>
```

需要注意一点我们是从`node_modules`引入的文件。 React和React-DOM的npm包里包含了独立的 `.js`文件，你可以在页面上引入它们，这里我们为了快捷就直接引用了。 可以随意地将它们拷贝到其它目录下，或者从CDN上引用。 Facebook在CND上提供了一系列可用的React版本，你可以在这里查看 [更多内容](https://reactjs.org/docs/cdn-links.html)。

# 创建一个webpack配置文件

在工程根目录下创建一个`webpack.config.js`文件。

```
module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
```

大家可能对`externals`字段有所疑惑。 我们想要避免把所有的React都放到一个文件里，因为会增加编译时间并且浏览器还能够缓存没有发生改变的库文件。

理想情况下，我们只需要在浏览器里引入React模块，但是大部分浏览器还没有支持模块。 因此大部分代码库会把自己包裹在一个单独的全局变量内，比如： `jQuery`或`_`。 这叫做“命名空间”模式，webpack也允许我们继续使用通过这种方式写的代码库。 通过我们的设置 `"react": "React"`，webpack会神奇地将所有对`"react"`的导入转换成从`React`全局变量中加载。

你可以在[这里](https://webpack.js.org/concepts)了解更多如何配置webpack。

# 整合在一起

执行：

```
webpack
```

在浏览器里打开`index.html`，工程应该已经可以用了！ 你可以看到页面上显示着“Hello from TypeScript and React!”