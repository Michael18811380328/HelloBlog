# 如何把一个 React+js 项目重构成一个 TS 的项目

## 问题

如今，越来越多的项目将 JavaScript 代码迁移到 TypeScript，TS 是一种静态类型语言，能够提高项目的可读性、可维护性和健壮性。然而，大规模迁移是一项复杂的任务，从 JavaScript 迁移到 TypeScript 有两种选择：

**（1）混合迁移：** 逐个文件迁移，修复类型错误，然后重复，直到迁移完整项目。allowJS 配置选项允许 TypeScript 和 JavaScript文件同时存于项目中，这使得这种方法成为可能！在混合迁移策略中，不必暂停开发，可以逐个文件逐步迁移。虽然，在大规模项目上，这个过程可能需要很长时间。

**（2) 整体迁移：** 将 JavaScript 或部分 TypeScript 项目并将其完全转换。需要添加一些 any类型和@ts-ignore注释，以便项目编译无误，但随着时间的推移，可以用更具描述性的类型替换它们。



## 方法 ts-migrate

https://www.npmjs.com/package/ts-migrate

ts-migrate 是一个工具库，可以把前端项目迁移到 ts 语法。直接运行 `npx ts-migrate 文件夹 ` 即可进行转换。注意：迁移整个项目时间可能很长。

~~~bash
npm install --save-dev ts-migrate
npx -p ts-migrate -c "ts-migrate-full <folder>"

# 把 JS 文件重命名成 ts 文件
npm run ts-migrate --rename <project-dir>

# 把 JS 文件迁移到 ts 文件
npm run ts-migrate --migrate <project-dir>
~~~

如果只迁移部分文件，使用 `--sources` 进行部分迁移。

~~~bash
# Run everything on a sub-directory
npx ts-migrate-full /path/to/your/project --sources "some/components/**/*"
~~~

注意：ts-migrate 无法自动修复 TS 问题，它会留下带有错误详细信息的 @ts-expect-error 注释。虽然 ts-migrate 在需要的地方将类型放入变量，但仍然需要将 any 类型更改为特定类型**。**



## 实际操作

### 实例1、单文件迁移

尝试在一个 demo 项目中把一个 JS 代码，重构成 TS 代码（只有一个文件，ts 转换成 js）

本地新建一个 demo 文件夹，npm init，写入 example.js 文件（模拟类型变换的情况，这里JS可以正常执行）

~~~js
// wrong-type-assignment
let age = 17;

age = "seventeen";

// assign-to-const
const color = "blue";

color = "red";

// add-conversions
function sum(a, b) {
  return a + b;
}

// declare-missing-class-properties
class Point {
  distance(point) {
    const dx = this.x - point.x;
    const dy = this.y - point.y;
    return Math.hypot(dx, dy);
  }
}
~~~

安装依赖并执行迁移命令

~~~bash
cd demo
npm install --save-dev ts-migrate
npx ts-migrate-full ./
~~~

然后控制台出现一些说明和选项，就可以进行转换

~~~
Welcome to TS Migrate! :D

This script will migrate a frontend folder to a compiling (or almost compiling) TS project.

It is recommended that you take the following steps before continuing...

1. Make sure you have a clean git slate. Run `git status` to make sure you have no local changes that may get lost. Check in or stash your changes, then re-run this script.
2. Check out a new branch for the migration. For example, `git checkout -b --ts-migrate` if you're migrating several folders or `git checkout -b --ts-migrate-.` if you're just migrating ./.
3. Make sure you're on the latest, clean master. `git fetch origin master && git reset --hard origin/master`
4. Make sure you have the latest npm modules installed. `npm install` or `yarn install`

If you need help or have feedback, please file an issue on Github!

Continue? (y/N) y

Set a custom path for the typescript compiler. (It's an optional step. Skip if you don't need it. Default path is ./node_modules/.bin/tsc.): 
Your default tsc path is ./node_modules/.bin/tsc.

[Step 1 of 4] Initializing ts-config for the "./"...
Config file created at /Users/michael/Desktop/demo/tsconfig.json
fatal: not a git repository (or any of the parent directories): .git
/Users/michael/desktop/demo

[Step 2 of 4] Renaming files from JS/JSX to TS/TSX and updating project.json\...

Renaming 1 JS/JSX files in /Users/michael/Desktop/demo...
Done.
fatal: not a git repository (or any of the parent directories): .git
/Users/michael/desktop/demo

[Step 3 of 4] Fixing TypeScript errors...

TypeScript version: 5.2.2
Initialized tsserver project in 17ms.
Start...
[strip-ts-ignore] Plugin 1 of 14. Start...
[strip-ts-ignore] Finished in 5ms.
[hoist-class-statics] Plugin 2 of 14. Start...
[hoist-class-statics] Finished in 1ms.
[react-props] Plugin 3 of 14. Start...
[react-props] Finished in 1ms.
[react-class-state] Plugin 4 of 14. Start...
[react-class-state] Finished in 1ms.
[react-class-lifecycle-methods] Plugin 5 of 14. Start...
[react-class-lifecycle-methods] Finished in 1ms.
[react-default-props] Plugin 6 of 14. Start...
[react-default-props] Finished in 1ms.
[react-shape] Plugin 7 of 14. Start...
[react-shape] Finished in 1ms.
[declare-missing-class-properties] Plugin 8 of 14. Start...
[declare-missing-class-properties] Finished in 217ms.
[member-accessibility] Plugin 9 of 14. Start...
[member-accessibility] Finished in 1ms.
[explicit-any] Plugin 10 of 14. Start...
[explicit-any] Finished in 30ms.
[add-conversions] Plugin 11 of 14. Start...
Error: [add-conversions][example.ts] Error:
 Error: Debug Failure.
    at visitEachChildOfSpreadAssignment (/Users/michael/Desktop/demo/node_modules/typescript/lib/typescript.js:87823:19)
    at Object.visitEachChild (/Users/michael/Desktop/demo/node_modules/typescript/lib/typescript.js:86810:35)
    at visit (/Users/michael/Desktop/demo/node_modules/ts-migrate-plugins/build/src/plugins/add-conversions.js:66:41)
    at /Users/michael/Desktop/demo/node_modules/ts-migrate-plugins/build/src/plugins/add-conversions.js:57:9
    at transformation (/Users/michael/Desktop/demo/node_modules/typescript/lib/typescript.js:111380:16)
    at transformNodes (/Users/michael/Desktop/demo/node_modules/typescript/lib/typescript.js:111388:72)
    at Object.transform (/Users/michael/Desktop/demo/node_modules/typescript/lib/typescript.js:143683:20)
    at Object.run (/Users/michael/Desktop/demo/node_modules/ts-migrate-plugins/build/src/plugins/add-conversions.js:26:30)
    at migrate (/Users/michael/Desktop/demo/node_modules/ts-migrate-server/build/src/migrate/index.js:63:46)
    at async Object.handler (/Users/michael/Desktop/demo/node_modules/ts-migrate/build/cli.js:138:26)
[add-conversions] Finished in 11ms.
[eslint-fix] Plugin 12 of 14. Start...
Error occurred in eslint-fix plugin:  No ESLint configuration found in /Users/michael/Desktop/demo.
[eslint-fix] Finished in 1ms.
[ts-ignore] Plugin 13 of 14. Start...
[ts-ignore] Finished in 1ms.
[eslint-fix] Plugin 14 of 14. Start...
Error occurred in eslint-fix plugin:  No ESLint configuration found in /Users/michael/Desktop/demo.
[eslint-fix] Finished in 1ms.
Finished in 267ms, for 14 plugin(s).
Writing 1 updated file(s)...
Wrote 1 updated file(s) in 1ms.
~~~

如果执行后，会把 JS 文件变成 TS 文件（原来的 JS 文件不存在）。如果需要保留原始的文件，最好先备份一下。

ts-migrate 无法自动修复 TS 问题，它会留下带有错误详细信息的 @ts-expect-error 注释。

~~~ts
// wrong-type-assignment
let age = 17;

// @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
age = "seventeen";

// assign-to-const
const color = "blue";

// @ts-expect-error TS(2588): Cannot assign to 'color' because it is a constant.
color = "red";

// add-conversions
function sum(a: any, b: any) {
  return a + b;
}

// declare-missing-class-properties
class Point {
  x: any;
  y: any;
  distance(point: any) {
    const dx = this.x - point.x;
    const dy = this.y - point.y;
    return Math.hypot(dx, dy);
  }
}
~~~

### 实例2、迁移工具函数库

尝试把 leetcode 全部的 JS 代码，重构成 TS 代码（有多个文件，也包括测试代码等）。

可以迁移成功，这个工具大部分转换成 any 类型，不会识别成 number string 等类型，不支持复杂的转换，需要后续大量人工分析类型，还有很多报错需要手动处理。 `// @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message` 

### 实例3、迁移前端组件库

尝试把小说阅读器全部的 JS 项目（1.0版本），重构成 TS 项目

这个项目是基于 Create-react-app 脚手架搭建的，可以直接参考 https://create-react-app.dev/docs/adding-typescript/ 给已有项目增加配置，安装依赖。

然后使用 ts-migrate 进行重命名，手动增加类型判断等。

## 参考链接

- 使用第三方库 ts-migrate 迁移：https://www.51cto.com/article/754200.html

- 手动配置 ts-json 和 webpack 迁移前端项目：https://geek-docs.com/typescript/typescript-basic/j_46_migrating-from-javascript-to-typescript.html

## 问题和解决

1、如果执行 `npx ts-migrate-full ./    ` 出现某个路径找不到，检查一下 ts-migrate 的安装路径是否正确，或者转换的文件是否正确。建议直接在 git 项目中安装，然后执行。