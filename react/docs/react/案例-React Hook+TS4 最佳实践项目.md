# React+Hook+TS 最佳实践-仿 Jira项目

2023-03

学习内容来源：[React + React Hook + TS 最佳实践-慕课网](https://coding.imooc.com/class/482.html)

博客原始链接：https://iseeu.blog.csdn.net/article/details/132747686

## 说明

这个是我看到的一个练手项目的笔记。没有接触过“Jira”这个产品。

## 目录

一、项目起航：项目初始化与配置

二、React 与 Hook 应用：实现项目列表

三、TS 应用：JS神助攻 - 强类型

四、JWT、用户认证与异步请求

五、CSS 其实很简单 - 用 CSS-in-JS 添加样式

六、用户体验优化 - 加载中和错误状态处理

七、Hook，路由，与 URL 状态管理

八、用户选择器与项目编辑功能

九、深入React 状态管理与Redux机制

十、用 react-query 获取数据，管理缓存

十一、看板页面及任务组页面开发

十二、自动化测试

## 第三方依赖版本

相对原教程，在学习开始时采用的是当前最新版本：

~~~
react & react-dom	^18.2.0
react-router & react-router-dom	^6.11.2
antd	^4.24.8
@commitlint/cli & @commitlint/config-conventional	^17.4.4
eslint-config-prettier	^8.6.0
husky	^8.0.3
lint-staged	^13.1.2
prettier	2.8.4
json-server	0.17.2
craco-less	^2.0.0
@craco/craco	^7.1.0
qs	^6.11.0
dayjs	^1.11.7
react-helmet	^6.1.0
@types/react-helmet	^6.1.6
react-query	^6.1.0
@welldone-software/why-did-you-render	^7.0.1
@emotion/react & @emotion/styled	^11.10.6
~~~

具体配置、操作和内容会有差异，“坑”也会有所不同。。。

## 一、项目初始化与配置

1.项目初始化 —— create-react-app
2.格式化 —— Prettier
3.提交规范 —— commitlint
4.Mock —— json-server

### 1.项目初始化 —— cra

~~~bash
npx create-react-app jira --template typescript
~~~


baseUrl 配置
~~~
{
  "compilerOptions": {
    "baseUrl": "./src",
    ...
  }
  ...
}
~~~


重新配置后，若是项目已启动，则需要重启才能生效

### 2.格式化 —— Prettier

这里没有使用 react 提供的默认的 eslint，而是使用 prettier 会覆盖掉冲突的原有 eslint 规则。具体操作如下：

为确保所有项目参与人员统一格式化代码，项目中引入 Prettier 依赖

~~~
npm install --save-dev --save-exact prettier
~~~

Prettier 中文网 · Prettier 是一个“有态度”的代码格式化工具——https://www.prettier.cn/

创建配置文件：`.prettierrc.json`

~~~
{}
~~~

创建格式化忽略文件：`.prettierignore`

~~~bash
# Ignore artifacts:\nbuild\ncoverage
~~~


prettierignore 直接输入以下内容：

~~~
# Ignore artifacts:
build
coverage
~~~

为了使格式化操作在每次提交代码时（pre-commit）自动执行，需要安装依赖：husky & lint-staged

~~~bash
npx mrm@2 lint-staged
~~~


执行这行命令会同时安装 husky 和 lint-stage，并自动配置 `package.json: "prepare": "husky install"` 生成 .husky/pre-commit 和 .husky/_/husky.sh 文件，免除了手动配置

>  Pre-commit Hook · Prettier 中文网——https://www.prettier.cn/docs/precommit.html

为避免 prettier 与项目原有 eslint 的冲突，还需要安装依赖：eslint-config-prettier

~~~bash
npm install --save-dev eslint-config-prettier
~~~


在 package.json 的 eslint 配置尾部添加 "prettier" (若有 eslintrc 单独配置文件，同)：

~~~
  ...
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "prettier"
    ]
  },
  ...
~~~


prettier 会覆盖掉冲突的原有 eslint 规则

- [Prettier 和 ESLint 冲突解决方案 eslint-config-prettier eslint-plugin-prettier - 彭成刚 - 博客园](https://www.cnblogs.com/pengchenggang/p/16033168.html)

步骤完成后，尝试改动一些代码（比如随机删去tsx文件的几个换行），进行一次代码提交，提交信息随意尝试，查看提交后代码是否被格式化还原之前正常格式

### 3.提交规范 —— commitlint

接下来规范 commit message:

~~~
npm install --save-dev @commitlint/config-conventional @commitlint/cli
~~~


生成 commitlint.config.js，并配置内容:

~~~js
module.exports = { 
  extends: [
    '@commitlint/config-conventional'
  ]
};
~~~


激活 husky

~~~
npx husky install
~~~

在 husky 中添加 hook —— commit-msg

~~~bash
# bash
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
~~~

>  windows 的 cmd 或 powershell 中会报错，具体可参考：[【已解决】npx husky add 执行失败](https://iseeu.blog.csdn.net/article/details/129238475)

经过这一步后，代码提交如果不规范就会提交失败啦，结果日志如下：

~~~
> git -c user.useConfigOnly=true commit --quiet --allow-empty-message --file -
[34m→[39m No staged files match any configured task.
⧗   input: 我掐指一算，这次提交会报错
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg hook exited with code 1 (error)
~~~

具体提交规范可参考文章：

[【笔记】项目优化代码提交规范 —— commitlint+husky](https://iseeu.blog.csdn.net/article/details/129241273)

- [commitlint - Lint commit messages](https://commitlint.js.org/#/)

- [conventional-changelog/commitlint: 📓 Lint commit messages](https://github.com/conventional-changelog/commitlint)details/129241273)

  

### 4.Mock —— json-server

  一般开发过程中，前后端是并行的，这就意味着前端开发时是没有接口调用的，这时就涉及到了 Mock 的问题，不同方案对比可参考：

[【笔记】不同 Mock 方案的对比及选择](https://iseeu.blog.csdn.net/article/details/129242566)

这里选用 json-server

~~~
npm i -g json-server
~~~

创建数据源文件

~~~bash
mkdir __json_server_mock__
cd ./__json_server_mock__

# bash
touch db.json
~~~


在 package.json 中新增 scripts 配置：

~~~
  "scripts": {
    "json-server": "json-server __json_server_mock__/db.json -w -p 3001"
  },
~~~

项目启动默认在 3000 端口，因此把 json-server 端口改为其他: 3001

命令行中输入以下命令启动 json-server：

~~~
npm run json-server
~~~

> 接下来可以自行尝试 json-server 的妙用，可参考：[【笔记】json-server实战](https://iseeu.blog.csdn.net/article/details/112726099)

项目初始化和配置完成，可以进行后续正式开发了。



## 二、React-hook 搜索展示组件

这里实现一个搜索并展示结果列表的组件

### 1.新建文件

- 项目列表组件（入口组件）：src\screens\ProjectList\index.jsx

~~~js
import { SearchPanel } from "./components/SearchPanel"
import { List } from "./components/List"

export const ProjectListScreen = () => {
  return (
    <div>
      <SearchPanel/>
      <List/>
    </div>
  )
}
~~~

- 列表组件：src\screens\ProjectList\components\List.jsx

~~~js
export const List = () => {
  return (
  	<table></table>
  )
}
~~~

- 搜索组件：src\screens\ProjectList\components\SearchPanel.jsx

~~~js
import { useEffect, useState } from "react"

export const SearchPanel = () => {

  // 搜索参数（名称，用户ID）
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  
  // 用户列表
  const [users, setUsers] = useState([])
  
  // 搜索列表
  const [list, setList] = useState([])

  useEffect(() => {
    // 从后端获取搜索的结果，并写入 list 状态中
    fetch('').then(async res => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [param])

  return (
  	<form>
      <div>
        {/* setParam(Object.assign({}, param, { name: evt.target.value })) */}
        <input type="text" value={param.name} onChange={evt => setParam({
          ...param,
          name: evt.target.value
        })}/>
        <select value={param.personId} onChange={evt => setParam({
          ...param,
          personId: evt.target.value
        })}>
          <option value="">负责人</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
    </form>
  )
}
~~~

> vscode 在 JS 文件中不会自动补全 HTML标签可参考：[【小技巧】vscode 在 JS 文件中补全 HTML标签](https://iseeu.blog.csdn.net/article/details/129254994)

### 2.状态提升

由于 `list` 和 `param` 涉及两个不同组件，因此需要将这两个 `state` 提升到他们共同的父组件中，子组件通过解构 `props` 使用:

- `list` 由 `List` 消费；
- `list` 根据 `param` 获取；
- `param` 由 `SearchPanel` 消费；

按照数据库范式思维，project、users 各自单独一张表、而 list 只是关联查询的中间产物，hard 模式中通过 project 只能得到 users 的主键，即 personId，需要根据 personId 再去获取 personName，因此 users 也需要做状态提升。

为了 **`DRY`** 原则，将接口调用URL中的 `http://host:port` 提取到项目全局环境变量 中：

`.env`

~~~
REACT_APP_API_URL=http://online.com
~~~

`.env.development`

~~~
REACT_APP_API_URL=http://localhost:3001
~~~

`webpack` 环境变量识别规则的理解——根据不同 webpack 版本和配置决定。

- 执行 `npm run start` 时，`webpack` 读取 `.env.development` 中的环境变量；
- 执行 `npm run build` 时，`webpack` 读取 `.env` 中的环境变量；

### 3.工具函数

常用工具方法统一放到 `utils/index.js` 中

- 由于在fetch传参过程中，多个可传参数单只传一个，那么空参需要过滤(过滤过程中考虑到 `0` 是有效参数，因此特殊处理)：

~~~js
// 判断变量是否是 false
export const isFalsy = val => {
  return val === 0 ? false : !val;
}

// 删除某个对象中的空属性
export const cleanObject = obj => {
  // 在函数里，不可用直接赋值的方式改变传入的引用类型变量
  const res = { ...obj }
  Object.keys(res).forEach(key => {
    const val = res[key]
    if (isFalsy(val)) {
      delete res[key]
    }
  })
  return res
}
~~~

> - [Falsy - MDN Web 文档术语表：Web 相关术语的定义 | MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)

- 在url后拼参时，参数较多会显得繁琐，因此引入 `qs`  [qs - npm](https://www.npmjs.com/package/qs)

经过前面两步，状态提升并使用 `cleanObject` 和 `qs` 处理参数后，源码如下：

~~~js
import { SearchPanel } from "./components/SearchPanel";
import { List } from "./components/List";
import { useEffect, useState } from "react";
import { cleanObject } from "utils";
import * as qs from 'qs'

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  
  const [param, setParam] = useState({ name: "", personId: "", });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  // 通过输入的名称和用户，查询到列表内容（实时查询）
  useEffect(() => {
    fetch(
      // name=${param.name}&personId=${param.personId}
      `${apiUrl}/projects?${qs.stringify(cleanObject(param))}`
    ).then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [param]);

  // 查询用户列表
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};

~~~

- `src\screens\ProjectList\components\List.jsx`

~~~js
export const List = ({ users, list }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((user) => user.id === project.personId)?.name || "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

~~~

- `src\screens\ProjectList\components\SearchPanel.jsx`

~~~js
export const SearchPanel = ({ users, param, setParam }) => {
  return (
    <form>
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(evt) =>
            setParam({
              ...param,
              personId: evt.target.value,
            })
          }
        >
          <option value="">负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

~~~

- `src\App.tsx`

~~~js
import { ProjectListScreen } from "screens/ProjectList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ProjectListScreen />
    </div>
  );
}

export default App;
~~~

### 4.自定义 Hook

Custom Hook 可是代码复用利器

- useMount：生命周期模拟 —— componentDidMount

~~~js
export const useMount = cb => {
  useEffect(() => cb(), [])
}
~~~

正常情况下 useEffect 只执行一次，但是 react@v18 严格模式下 useEffect 默认执行两遍，具体详见：[【已解决】react@v18 严格模式下 useEffect 默认执行两遍](https://iseeu.blog.csdn.net/article/details/129303728)

- useDebounce：防抖

~~~js
/**
 * @param { 值 } val 
 * @param { 延时：默认 1000 } delay 
 * @returns 在某段时间内多次变动后最终拿到的值（delay 延迟的是存储在队列中的上一次变化）
 */
export const useDebounce = (val, delay = 1000) => {

  const [tempVal, setTempVal] = useState(val)

  useEffect(() => {
    // 每次在 val 变化后，设置一个定时器
    const timeout = setTimeout(() => setTempVal(val), delay)
    
    // 每次在上一个 useEffect 处理完以后再运行（useEffect 的天然功能即是在运行结束的 return 函数中清除上一个（同一） useEffect）
    return () => clearTimeout(timeout)
  }, [val, delay])

  return tempVal
}

// 日常案例，对比理解

// const debounce = (func, delay) => {
//   let timeout;
//   return () => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(function () {
//       func()
//     }, delay)
//   }
// }

// const log = debounce(() => console.log('call'), 5000)
// log()
// log()
// log()
//   ...5s
// 执行！

// debounce 原理讲解：
// 0s ---------> 1s ---------> 2s --------> ...
//     这三个函数是同步操作，它们一定是在 0~1s 这个时间段内瞬间完成的；
//     log()#1 // timeout#1
//     log()#2 // 发现 timeout#1！取消之，然后设置timeout#2
//     log()#3 // 发现 timeout#2! 取消之，然后设置timeout#3
//             // 所以，log()#3 结束后，就只有最后一个 —— timeout#3 保留
~~~

拓展学习：[【笔记】深度理解并 js 手写不同场景下的防抖函数](https://iseeu.blog.csdn.net/article/details/129306248)

- 使用了 `Custom Hook` 后的 `src\screens\ProjectList\index.js`(`lastParam` 定义在紧挨 `param` 后)

~~~js

// 对 param 进行防抖处理
const lastParam = useDebounce(param)
const [list, setList] = useState([]);

useEffect(() => {
  fetch(
    // name=${param.name}&personId=${param.personId}
    `${apiUrl}/projects?${qs.stringify(cleanObject(lastParam))}`
  ).then(async (res) => {
    if (res.ok) {
      setList(await res.json());
    }
  });
}, [lastParam]);

useMount(() => {
  fetch(`${apiUrl}/users`).then(async (res) => {
    if (res.ok) {
      setUsers(await res.json());
    }
  });
});
~~~

这样便可 `1s` 内再次输入不会触发对 `projects` 的 `fetch` 请求

拓展学习：[【笔记】Custom Hook](https://blog.csdn.net/qq_32682301/article/details/129383541)



## 三、TS 应用- 强类型

### 1.TS 的必要性

作为正常人，我们在开发过程中难免会犯以下错误：

~~~
变量名写错
参数少传、多传
数组或对象变量层次弄错
相对 JS 在运行时（runtime）才会发现错误，TS 可以帮助我们在 静态代码 中及时定位错误，将 弱类型 的 JS 转为 强类型 的 TS 能够极大地降低我们编码过程中的误码率
~~~

### 2.代码更改

将项目中 src 下 js 文件后缀改为 ts，jsx 文件后缀改为 tsx，并对文件代码做如下修改：

~~~
有参数的组件使用 interface 声明参数类型
公用类型的可以导出+引入
不明确类型的显性赋予 unknow 类型 (严格版 any)
不确定参数是否会传的使用 ?: 赋予类型
用泛型来规范类型
~~~

- `src\utils\index.ts`

~~~ts
import { useEffect, useState } from "react";

export const isFalsy = (val: unknown) => (val === 0 ? false : !val);

// 在函数里，不可用直接赋值的方式改变传入的引用类型变量，清空一个对象的空属性
export const cleanObject = (obj: object) => {
  const res = { ...obj };
  Object.keys(res).forEach((key) => {
    // 忽略下一行的类型检查
    //@ts-ignore 
    const val = res[key];
    if (isFalsy(val)) {
      //@ts-ignore
      delete res[key];
    }
  });
  return res;
};

export const useMount = (cbk: () => void) => useEffect(() => cbk(), []);

/**
 * @param { 值 } val
 * @param { 延时：默认 1000 } delay
 * @returns 在某段时间内多次变动后最终拿到的值（delay 延迟的是存储在队列中的上一次变化）
 */
export const useDebounce = <V>(val: V, delay: number = 1000) => {
  // V 泛型，表示传入与返回类型相同
  
  const [tempVal, setTempVal] = useState(val);

  useEffect(() => {
    // 每次在 val 变化后，设置一个定时器
    const timeout = setTimeout(() => setTempVal(val), delay);
    // 每次在上一个 useEffect 处理完以后再运行（useEffect 的天然功能即是在运行结束的 return 函数中清除上一个（同一） useEffect）
    return () => clearTimeout(timeout);
  }, [val, delay]);

  return tempVal;
};

~~~

- `src\screens\ProjectList\index.jsx`

~~~ts
import { SearchPanel } from "./components/SearchPanel";
import { List } from "./components/List";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import * as qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  // 对 param 进行防抖处理
  const lastParam = useDebounce(param);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(
      // name=${param.name}&personId=${param.personId}
      `${apiUrl}/projects?${qs.stringify(cleanObject(lastParam))}`
    ).then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [lastParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
~~~

- `src\screens\ProjectList\components\List.jsx`

~~~tsx
import { User } from "./SearchPanel";

interface Project {
  id: string;
  name: string;
  personId: string;
  star: boolean;
  organization: string;
}

interface ListProps {
  users: User[];
  list: Project[];
}

export const List = ({ users, list }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            {/* undefined.name */}
            <td>
              {users.find((user) => user.id === project.personId)?.name || "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
~~~

- `src\screens\ProjectList\components\SearchPanel.jsx`

~~~tsx
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
}
interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <form>
      <div>
        {/* setParam(Object.assign({}, param, { name: evt.target.value })) */}
        <input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(evt) =>
            setParam({
              ...param,
              personId: evt.target.value,
            })
          }
        >
          <option value="">负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

~~~

- `src\App.tsx`

~~~tsx
import "./App.css";
import { ProjectListScreen } from "screens/ProjectList";

function App() {
  return (
    <div className="App">
      <ProjectListScreen />
    </div>
  );
}

export default App;
~~~

- [【实战】用 Custom Hook + TS泛型实现 useArray](https://blog.csdn.net/qq_32682301/article/details/129382797)



## 四、JWT、用户认证与异步请求

### 1.login

增加登录的页面和逻辑

- 新建文件：`src\screens\login\index.tsx`：

~~~tsx
import { FormEvent } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export const Login = () => {
  const login = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (res) => {
      if (res.ok) {
        // 登录成功
      }
    });
  };

  // HTMLFormElement extends Element (子类型继承性兼容所有父类型)
  // (鸭子类型：duck typing: 面向接口编程 而非 面向对象编程)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
    const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};

~~~

`src\App.tsx` 中引入:

~~~ts
import "./App.css";
import { Login } from "screens/login";

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
~~~

目前页面点击登录 404，下一步配置 `json-server` 中间件，使其可以模拟 非 restful 接口

### 2.middleware of json-server

json-server 中间件，模拟请求和返回数据

- 新建文件：`__json_server_mock__\middleware.js`：

~~~js
module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "user" && req.body.password === "123") {
      return res.status(200).json({
        user: {
          token: "token123",
        },
      });
    } else {
      return res.status(400).json({ message: "用户名或者密码错误" });
    }
  }
  next();
};
~~~

- 配置 `package.json` 中 `json-server` 的 `script`：

~~~json
"json-server": "json-server __json_server_mock__/db.json -w -p 3001 --middlewares ./__json_server_mock__/middleware.js"
~~~

- 配置完后重新启动 `json-server` ,输入中间件预置用户名和密码即可正常访问（200），否则（400：bad request）

### 3.jira-dev-tool（imooc-jira-tool）

[jira-dev-tool - npm](https://www.npmjs.com/package/jira-dev-tool)

- 首先确认 git 工作区 clean，安装 jira-dev-tool（imooc-jira-tool）
- 引入到 `src\index.tsx`

~~~jsx
import { loadDevTools } from "jira-dev-tool";

loadDevTools(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
~~~

问题1: 安装 jira-dev-tool（imooc-jira-tool）后启动项目[联调](https://so.csdn.net/so/search?q=联调&spm=1001.2101.3001.7020)可能会出现的问题

- 报错：`request (TypeError: Failed to fetch). This is probably not a problem with Mock Service Worker. There is likely an additional logging output above.`
- 解决：npx msw init ./public/ --save

问题二: 由于 jira-dev-tool 已经两年没有更新了，且依赖 react@“^16.0.0”, 若要继续使用，在 npm i 时会有如下报错：

~~~
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! 
npm ERR! While resolving: jira@0.1.0
npm ERR! Found: react@18.2.0
npm ERR! node_modules/react
npm ERR!   react@"^18.2.0" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^16.0.0" from jira-dev-tool@1.7.61       
npm ERR! node_modules/jira-dev-tool
npm ERR!   jira-dev-tool@"^1.7.61" from the root project      
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry       
npm ERR! this command with --force or --legacy-peer-deps      
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR!
npm ERR! For a full report see:
npm ERR! C:\...\npm-cache\_logs\2023-03-08T09_11_24_998Z-eresolve-report.txt

npm ERR! A complete log of this run can be found in:
npm ERR! C:\...\npm-cache\_logs\2023-03-08T09_11_24_998Z-debug-0.log

~~~

解决方案一：

- 删掉文件 yarn.lock，以及package.json 中的 `"jira-dev-tool": "^1.7.61",` 部分，jira-dev-tool 手动安装

解决方案二（推荐）

- 使用 `yarn` 代替 `npm i`

使用

开发者工具用 MSW 以 Service Worker 为原理实现了"分布式后端"。后端逻辑处理后，以localStorage为数据库进行增删改查操作。浏览器上安装了一个独立的后端服务和数据库，再也不受任何中心化服务的影响 点击’清空数据库’便可以重置后端服务。可以精准地控制 HTTP请求的时间、失败概率、失败规则

Service Worker + localStorage虽然本质上与传统后端服务并不同，但丝毫不会影响前端开发

其他具体操作可见文档以及接下来的操作：[jira-dev-tool - npm](https://www.npmjs.com/package/jira-dev-tool)

[Service Worker API - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)

安装好后进入`/login`,请求login接口，可以看到状态码后带有（from service worker）字样即成功连接：

### 4.JWT原理与auth-provider实现

注册一个新用户

- 修改：

  ```
  src\screens\login\index.tsx
  ```

  - 调用接口 `login` 改为 `register`；
- 按钮 **登录** 改为 **注册**

注册一个新用户 jira（密码：jira），接口返回：

~~~json
{
  "user": {
    "id": 2087569429,
    "name": "jira",
    "token": "MjA4NzU2OTQyOQ=="
  }
}
~~~

token 即是 JWT(JSON Web Tokens) 的产物

> - [JSON Web Tokens - jwt.io](https://jwt.io/)

auth-provider

修改 `src\screens\ProjectList\components\SearchPanel.tsx`，为 `User` 新增 `token`:

~~~ts
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string; // 新增字段
}
~~~

新建 `src\auth-provider.ts`：

模拟第三方服务

```js
// 在真实环境中，如果使用了 firebase 这种第三方 auth 服务的话，本文件不需要开发者开发

import { User } from "screens/ProjectList/components/SearchPanel"

const localStorageKey = '__auth_provider_token__'
const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey)

// 处理用户响应——存储到浏览器本地
export const handleUserResponse = ({user} : { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

// 登录逻辑
export const login = (data: { username: string, password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    } else {
      return Promise.reject(data)
    }
  });
}

// 注册逻辑
export const register = (data: { username: string, password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    } else {
      return Promise.reject(data)
    }
  });
}

// 登出逻辑-直接更改本地配置
export const logout = async () => window.localStorage.removeItem(localStorageKey)
```

细节点：

函数定义时，值前添加 async 使其返回一个 Promise 对象

回调函数入参和回调函数内有且只有一个函数调用且它的入参与回调函数入参一致，该回调函数可直接简写为其内部的函数调用且不带参（这是函数式编程-PointFree的一种应用）：

~~~js
const login = (form: AuthForm) => {
  return auth.login(form).then(user => setUser(user));
}
const login = (form: AuthForm) => {
  return auth.login(form).then(setUser);
}
~~~

### 5.useContext(user,login,register,logout)

上下文组件

新建 `src\context\auth-context.tsx`：

~~~tsx
import React, { ReactNode, useState } from "react"
import * as auth from 'auth-provider'
import { User } from "screens/ProjectList/components/SearchPanel"

// 表单授权接口（auth）
interface AuthForm {
  username: string,
  password: string
}

// 授权上下文（包括登录，注册，登出接口）
const AuthContext = React.createContext<{
  user: User | null,
  login: (form : AuthForm) => Promise<void>,
  register: (form : AuthForm) => Promise<void>,
  logout: () => Promise<void>,
} | undefined>(undefined)

AuthContext.displayName = 'AuthContext'

// 提供授权组件（参数是 children）
export const AuthProvider = ({children}:{children: ReactNode}) => {
  // 这里要考虑到初始值的类型与后续值类型，取并组成一个泛型
  const [user, setUser] = useState<User | null>(null)

  const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
  const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
  const logout = () => auth.logout().then(() => setUser(null))

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }}/>
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 中使用')
  }
  return context
}
~~~

新建 `src\context\index.tsx`：

~~~ts
import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

export const AppProvider = ({children}:{children: ReactNode}) => {
  return (
  	<AuthProvider>
      {children}
    </AuthProvider>
  )
}
~~~

在项目中使用 `AppProvider`，修改 `src\index.tsx`：

~~~ts
import { AppProvider } from "context";

loadDevTools(() => {
  root.render(
    // <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
    // </React.StrictMode>
  );
});
~~~

修改 `src\screens\login\index.tsx`，调用 `useAuth` 中的 `login`，并使用之前注册的账号 `jira(jira)` 验证：

~~~tsx
import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

export const Login = () => {
  const {login, user} = useAuth()
  // HTMLFormElement extends Element (子类型继承性兼容所有父类型)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {...};
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {user ? <div>登录成功，用户名{user?.name}</div> : null}
      </div>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
~~~

### 6.用useAuth切换登录与非登录状态

将 **登录态** 页面和 **非登录态** 页面分别整合（过程稀碎。。）：

- 新建文件夹及下面文件：`unauthenticated-app`
- `index.tsx`

```tsx
import { useState } from "react";
import { Login } from "./login";
import { Register } from "./register";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      {isRegister ? <Register /> : <Login />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </div>
  );
};

```

- `login.tsx`（把 `src\screens\login\index.tsx` 剪切并更名）

~~~ts
import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

export const Login = () => {
  const { login, user } = useAuth();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
    const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};

~~~

- `register.tsx`（把 `src\screens\login\index.tsx` 剪切并更名，代码中 `login` 相关改为 `register`）

~~~ts
import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

export const Register = () => {
  const { register, user } = useAuth();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
    const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
    register({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  );
};

~~~

- 删掉目录：`src\screens\login`
- 新建文件：`authenticated-app.tsx`

~~~ts
import { useAuth } from "context/auth-context";
import { ProjectList } from "screens/ProjectList";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectList />
    </div>
  );
};
~~~

- 修改 `src\App.tsx`（根据是否可以获取到 `user` 信息，决定展示 **登录态** 还是 **非登录态** 页面）

~~~ts
import { AuthenticatedApp } from "authenticated-app";
import { useAuth } from "context/auth-context";
import { UnauthenticatedApp } from "unauthenticated-app";
import "./App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
~~~

查看页面，尝试功能：切换登录/注册，正常/登录：login 正常，但是 projects 和 users 接口 401（A token must be provided） F12 控制台查看 __auth_provider_token__ (Application - Storage - Local Storage - http://localhost:3000)：注册：正常，默认直接登录（同登录，存储 `user`）

### 7.用fetch抽象通用HTTP请求方法，增强通用性

- 新建：`src\utils\http.ts`

~~~ts
import qs from "qs";
import * as auth from 'auth-provider'

const apiUrl = process.env.REACT_APP_API_URL;

interface HttpConfig extends RequestInit {
  data?: object,
  token?: string
}

export const http = async (funcPath: string, { data, token, headers, ...customConfig }: HttpConfig) => {
  const httpConfig = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }

  if (httpConfig.method.toUpperCase() === 'GET') {
    funcPath += `?${qs.stringify(data)}`
  } else {
    httpConfig.body = JSON.stringify(data || {})
  }

  // axios 和 fetch 不同，axios 会在 状态码 不为 2xx 时，自动抛出异常，fetch 需要 手动处理
  return window.fetch(`${apiUrl}/${funcPath}`, httpConfig).then(async res => {
    if (res.status === 401) {
      // 自动退出 并 重载页面
      await auth.logout()
      window.location.reload()
      return Promise.reject({message: '请重新登录！'})
    }
    const data = await res.json()
    if (res.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

~~~

类型定义思路：按住 Ctrl ，点进 fetch，可见：`fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;`，因此第二个参数即为 RequestInit 类型，但由于有自定义入参，因此自定义个继承 RequestInit 的类型

customConfig 会覆盖前面已有属性

需要手动区别 get 和 post 不同的携参方式

axios 和 fetch 不同，axios 会在 状态码 不为 2xx 时，自动抛出异常，fetch 需要 手动处理

留心 Authorization (授权)不要写成 Authentication (认证)，否则后面会报401，且很难找出问题所在

### 8.用useHttp管理JWT和登录状态，保持登录状态

- 为了使请求接口时能够自动携带 token 定义 useHttp: `src\utils\http.ts`

~~~ts
export const http = async (
  funcPath: string,
  { data, token, headers, ...customConfig }: HttpConfig = {} // 参数有 默认值 会自动变为 可选参数
) => {...}

export const useHttp = () => {
  const { user } = useAuth()
  // TODO 学习 TS 操作符
  return (...[funcPath, customConfig]: Parameters<typeof http>) => http(funcPath, { ...customConfig, token: user?.token })
}
~~~

- 函数定义时参数设定 **默认值**，该参数即为 **可选参数**
- 参数可以解构赋值后使用 rest 操作符降维，实现多参
- `Parameters` 操作符可以将函数入参类型复用

- 在 `src\screens\ProjectList\index.tsx` 中使用 `useHttp`(部分原有代码省略)：

~~~ts
import { useHttp } from "utils/http";

export const ProjectList = () => {
  const client = useHttp()

  useEffect(() => {
    // React Hook "useHttp" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.
    client('projects', { data: cleanObject(lastParam)}).then(setList)
    // React Hook useEffect has a missing dependency: 'client'. Either include it or remove the dependency array.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastParam]); 

  useMount(() => client('users').then(setUsers));

  return (...);
};

~~~

useHttp 不能在 useEffect 的 callback 中直接使用，否则会报错：React Hook "useHttp" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.，建议如代码中所示使用（client 即 携带 token 的 http 函数）

依赖中只有 lastParam ，会警告：React Hook useEffect has a missing dependency: 'client'. Either include it or remove the dependency array.，但是添加 client 会无法通过相等检查并导致无限的重新渲染循环。（当前代码中最优解是添加 eslint 注释，其他可参考但不适用：https://www.cnblogs.com/chuckQu/p/16608977.html）

- 检验成果：登录即可见 `projects` 和 `users` 接口 `200`，即正常携带 `token`，但是当前页面刷新就会退出登录（`user` 初始值为 `null`），接下来优化初始化 `user`(`src\context\auth-context.tsx`)：

~~~ts
import { http } from "utils/http";
import { useMount } from "utils";

interface AuthForm {...}

const initUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    // 由于要自定义 token ，这里使用 http 而非 useHttp
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  ...
  useMount(() => initUser().then(setUser))
  return (...);
};
~~~

思路分析：定义 `initUser` ，并在 `AuthProvider` 组件 挂载时调用，以确保只要在 `localStorage` 中存在 `token`（未登出或清除），即可获取并通过预设接口 `me` 拿到 `user` ，完成初始化

至此为止，注册登录系统（功能）闭环

### 9.TS的联合类型、Partial和Omit介绍

联合类型：type1 | type2

交叉类型：type1 & type2

类型别名： type typeName = typeValue

类型别名在很多情况下可以和 interface 互换，但是两种情况例外：

~~~
typeValue 涉及交叉/联合类型
typeValue 涉及 Utility Types (工具类型)
~~~

TS 中的 typeof 用来操作类型，在静态代码中使用（JS 的 typeof 在代码运行时(runtime)起作用），最终编译成的 JS 代码不会包含 typeof 字样

Utility Types(工具类型) 的用法：用泛型的形式传入一个类型（typeName 或 typeof functionName）然后进行类型操作

常用 Utility Types ：

- Partial：将每个子类型转换为可选类型

~~~ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};
~~~

- `Omit`：删除父类型中的指定子类型并返回新类型

~~~ts
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
~~~

案例：

~~~ts
type Person = {
  name: string,
  age: number,
  job: {
    salary: number
  }
}

const CustomPerson: Partial<Person> = {}
const OnlyJobPerson: Omit<Person, 'name' | 'age'> = { job: { salary: 3000 } }
~~~

### 10.TS 的 [Utility](https://so.csdn.net/so/search?q=Utility&spm=1001.2101.3001.7020) Types-Pick、Exclude、Partial 和 Omit 实现

- `Pick`：经过 泛型约束 生成一个新类型（理解为子类型？）

~~~ts
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
~~~

- `Exclude`： 如果 `T` 是 `U` 的子类型则返回 `never` 不是则返回 `T`

~~~ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;

~~~

- `keyof`：索引类型查询操作符(对于任何类型 `T`，`keyof T`的结果为 `T` 上已知的公共属性名的联合。)

~~~ts
let man: keyof Person
// 相当于 let man: 'name' | 'age' | 'job'
// keyof Man === 'name' | 'age' | 'job' // true ???
~~~

`T[K]`：索引访问操作符（需要确保类型变量 `K extends keyof T`）

`in`：遍历

`extends`：泛型约束

`TS` 在一定程度上可以理解为：类型约束系统



——看到这里——



## 五、用 CSS-in-JS 添加样式

### 1.antd+emotion

~~~~bash
npm i antd --force
~~~~

- `jira-dev-tool` 依赖树中包含 antd，可尝试不安装直接使用
- 鉴于 `jira-dev-tool` 长时间没有更新，依赖树有较多问题，建议清理 `node_modules`，执行 `npm i --force` 重新安装依赖

- 在 `src\index.tsx` 中引入 `antd.less`（一定要在 `jira-dev-tool` 之后引入，以便后续修改主题样式能够覆盖到 `jira-dev-tool`）

```js
import { loadDevTools } from "jira-dev-tool";
import 'antd/dist/antd.less'
```

##### 安装 craco

为对 `create-react-app` 进行自定义配置，需要安装 `craco` 和它的子依赖 `craco-less`:

```bash
npm i @craco/craco --force
npm i -D craco-less --force
```

https://4x.ant.design/docs/react/use-with-create-react-app-cn#高级配置

- 按文档中，替换 `package.json` 中脚本指令

~~~diff
"scripts": {
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "test": "react-scripts test",
+   "start": "craco start",
+   "build": "craco build",
+   "test": "craco test",
}
~~~

项目根目录下新建文件 `craco.config.js`，复制文档中对应部分代码，并配置需要修改的主题变量：

~~~js
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': 'rgb(0, 82, 204)', '@font-size-base': '16px' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

~~~

- `npm start` 重新启动项目

##### antd 组件替换原生组件

- 先修改登录页面 `src\unauthenticated-app\login.tsx`:

~~~js
import { useAuth } from "context/auth-context";
import { Form, Button, Input } from "antd"

export const Login = () => {
  const { login, user } = useAuth();
  const handleSubmit = (values: { username: string, password: string }) => {
    login(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">登录</Button>
      </Form.Item>
    </Form>
  );
};


~~~

- 查看页面效果，并尝试 **登录** 功能
- 修改注册页面 `src\unauthenticated-app\register.tsx`:

~~~js
import { useAuth } from "context/auth-context";
import { Form, Button, Input } from "antd"

export const Register = () => {
  const { register, user } = useAuth();
  const handleSubmit = (values: { username: string, password: string }) => {
    register(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">注册</Button>
      </Form.Item>
    </Form>
  );
};

~~~

- 从登录页切换到注册页，查看页面效果，并尝试 **注册** 功能
- 接下来修改 `src\unauthenticated-app\index.tsx`：



~~~ts
import { useState } from "react";
import { Login } from "./login";
import { Register } from "./register";
import { Card, Button } from 'antd';

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (<Card style={{ display: 'flex', justifyContent: 'center' }}>
      {isRegister ? <Register /> : <Login />}
      <Button type='primary' onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "登录" : "注册"}
      </Button>
    </Card>
  );
};

~~~

现在较之前页面好看多了

- 修改 `src\screens\ProjectList\components\List.tsx`(部分未改动省略)：

~~~ts
import { Table } from "antd";
import { User } from "./SearchPanel";
...
export const List = ({ users, list }: ListProps) => {
  return <Table pagination={false} columns={[{
    title: '名称',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name)
  }, {
    title: '负责人',
    render: (text, project) => <span>{users.find((user) => user.id === project.personId)?.name || "未知"}</span>
  }]} dataSource={list}></Table>
};


~~~

localeCompare 可排序中文字符
在引入 antd 的 Table 后，先不给 columns 属性赋值，而是先赋值 dataSource，然后将鼠标放于 columns 上，这时便可见：
(property) TableProps<Project>.columns?: ColumnsType<Project> | undefined
TS 的类型推断起作用了：

通过 list 的值类型为 Project[] ，推断出 dataSource?: RcTableProps<RecordType>['data'] 中 data 类型为 Project[]
推断出 dataSource?: RcTableProps<RecordType>['data'] 中 RecordType 类型为 Project[]
推断出 columns 类型为 (property) TableProps<Project>.columns?: ColumnsType<Project> | undefined

- 修改 `src\screens\ProjectList\components\SearchPanel.tsx`

~~~js
import { Form, Input, Select } from "antd";
...
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form>
      <Input
        type="text"
        value={param.name}
        onChange={(evt) =>
          setParam({
            ...param,
            name: evt.target.value,
          })
        }
      />
      <Select
        value={param.personId}
        onChange={value =>
          setParam({
            ...param,
            personId: value,
          })
        }
      >
        <Select.Option value="">负责人</Select.Option>
        {users.map((user) => (
          <Select.Option key={user.id} value={user.id}>
            {user.name}
          </Select.Option>
        ))}
      </Select>
    </Form>
  );
};

~~~

### 2.CSS-in-JS

CSS-in-JS 不是指某一个具体的库，是指组织CSS代码的一种方式，代表库有 styled-component 和 emotion

(1)传统CSS的缺陷

①缺乏模块组织
传统的JS和CSS都没有模块的概念，后来在JS界陆续有了 CommonJS 和 ECMAScript Module，CSS-in-JS可以用模块化的方式组织CSS，依托于JS的模块化方案，比如：

~~~js
// button1.ts
import styled from '@emotion/styled'

export const Button = styled.button`
  color: turquoise;
`


// button2.ts
import styled from '@emotion/styled'
export const Button = styled.button`
  font-size: 16px;
`
~~~

②缺乏作用域

传统的CSS只有一个全局作用域，比如说一个class可以匹配全局的任意元素。随着项目成长，CSS会变得越来越难以组织，最终导致失控。CSS-in-JS可以通过生成独特的选择符，来实现作用域的效果

~~~js
const css = styleBlock => {
  const className = someHash(styleBlock);
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .${className} {
      ${styleBlock}
    }
  `;
  document.head.appendChild(styleEl);
  return className;
};
const className = css(`
  color: red;
  padding: 20px;
`); // 'c23j4'


~~~

③隐式依赖，让样式难以追踪

比如这个CSS样式：

~~~css
.target .name h1 {
  color: red
}

body #container h1 {
  color: green
}
~~~

④没有变量

传统的CSS规则里没有变量，但是在 CSS-in-JS 中可以方便地控制变量

~~~
const Container = styled.div(props => ({
  display: 'flex',
  flexDirection: props.column && 'column'
}))
~~~

⑤CSS选择器与HTML元素耦合

~~~
.target .name h1 {
  color: red
}

body #container h1 {
  color: green
}
~~~

如果你想把 h1 改成h2，必须要同时改动 CSS 和 HTML。而在CSS-in-JS中，HTML和CSS是结合在一起的，易于修改

(2)Emotion 介绍
Emotion 是目前最受欢迎的 CSS-in-JS 库之一，它还对 React 作了很好的适应，可以方便地创建 styled component，也支持写行内样式：

~~~
/** @jsx jsx */
import { jsx } from '@emotion/react'

render(
  <div
    css={{
      backgroundColor: 'hotpink',
      '&:hover': {
        color: 'lightgreen'
      }
    }}
  >
    This has a hotpink background.
  </div>
)

~~~

这种写法比起React自带的style的写法功能更强大，比如可以处理级联、伪类等style处理的不了的情况

### 3.emotion & 登录注册页美化

##### 全局样式

- 编辑 `src\App.css` 清除原有样式，填入如下内容：

~~~css
html {
  /* rem em */
  /* em 相对于父元素的 font-size */
  /* rem 相对于根元素的 font-size，r root */
  /* 浏览器默认 font-size 16px */
  /* 16px * 62.5% = 10px */
  /* 1rem === 10px */
  font-size: 62.5%;
}

html body #root .App {
  min-height: 100vh;
}

~~~

删掉文件 `src\index.css` 并去掉在 `src\index.tsx` 中的引用，后续全局样式都在 `src\App.css` 中添加

##### 安装 emotion

~~~js
npm i @emotion/react @emotion/styled --force

~~~

##### 原生标签使用 emotion

编辑 `src\unauthenticated-app\index.tsx`(部分原有内容省略)

```js
...
import { Card, Button } from "antd";
import styled from "@emotion/styled";

export const UnauthenticatedApp = () => {
  ...
  return (
    <Container>
      <Card>
        ...
      </Card>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
`

```

##### antd 标签使用 emotion

继续编辑 `src\unauthenticated-app\index.tsx`(部分原有内容省略)

~~~js
...
import { Card, Button } from "antd";
import styled from "@emotion/styled";

export const UnauthenticatedApp = () => {
  ...
  return (
    <Container>
      <ShadowCard>
        ...
      </ShadowCard>
    </Container>
  );
};

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0,0,0,0.1) 0 0 10px;
  text-align: center; 
`
...

~~~



##### 进一步美化

新建 `src\assets`，将预置 svg 文件放入(left.svg、logo.svg、right.svg)

继续编辑 `src\unauthenticated-app\index.tsx`(部分原有内容省略)：切换文案修改并使用 `link` 类型 `button`；添加 logo、标题和背景图

~~~js
...
import { Card, Button, Divider } from "antd";
import styled from "@emotion/styled";
import left from 'assets/left.svg'
import logo from 'assets/logo.svg'
import right from 'assets/right.svg'

export const UnauthenticatedApp = () => {
  ...
  return (
    <Container>
      <Header/>
      <Background/>
      <ShadowCard>
        <Title>
          {isRegister ? '请注册' : '请登录'}
        </Title>
        {isRegister ? <Register /> : <Login />}
        <Divider/>
        <Button type="link" onClick={() => setIsRegister(!isRegister)}>
          切换到{isRegister ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
        </Button> 
      </ShadowCard>
    </Container>
  );
};

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed; // 背景图片是否会随着页面滑动
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem), calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`
...

~~~

### 4.用Grid和Flexbox布局优化项目列表页面

编辑 `src\authenticated-app.tsx`

~~~js
import styled from "@emotion/styled";
import { useAuth } from "context/auth-context";
import { ProjectList } from "screens/ProjectList";

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 */

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>Logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Nav>Nav</Nav>
      <Main>
        <ProjectList />
      </Main>
      <Aside>Aside</Aside>
      <Footer>Footer</Footer>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem; // 3行每行高度（fr 单位是一个自适应单位，表示剩余空间中所占比例）
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  /* grid-gap: 10rem; // 每部分之间的间隔 */
  height: 100vh;
`;

// grid-area 用来给 grid 子元素起名字
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
  /* height: calc(100vh - 6rem); */
`;
const Nav = styled.nav`
  grid-area: nav;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  grid-area: footer;
`;

~~~

grid 和 flex 各自的应用场景

1.要考虑，是一维布局 还是 二维布局

一般来说，一维布局用flex，二维布局用grid
2.是从内容出发还是从布局出发？

从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
从内容出发，用flex
从布局出发，用grid

- [CSS Grid: Holy Grail Layout | DigitalOcean](https://www.digitalocean.com/community/tutorials/css-css-grid-holy-grail-layout)

### 5.使用 emotion 自定义样式组件

> 区别于 `react` 的功能组件 `emotion` 组件我们称其为 **样式组件**

新建 `src\components\lib.tsx`(emotion 自定义样式组件库):

~~~js
import styled from '@emotion/styled'

export const Row = styled.div<{
  gap?: number | boolean,
  butween?: boolean,
  marginBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.butween ? 'space-between' : undefined };
  margin-bottom: ${ props => props.marginBottom + 'rem' };
  > * {
    /* 直接子元素强制控制样式 */
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${ props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined };
  }
`

~~~

### 6.完善项目列表页面样式

编辑 `src\screens\ProjectList\components\SearchPanel.tsx`（使用`Form.Item`、 `emotion` 的 `css` 属性）:

~~~js

// /** @jsx jsx */
// import { jsx } from '@emotion/react'
/** @jsxImportSource @emotion/react */
...
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: '2rem', '>*': '' }} layout="inline">
      <Form.Item>
        <Input placeholder='项目名' ... />
      </Form.Item>
      <Form.Item>
        <Select>...</Select>
      </Form.Item>
    </Form>
  );
};

~~~

在使用 emotion 的 css 属性时 需要注意，由于 React 17 的自动导入破坏了 @emotion 自身运行时的支持，从而将导致 emotion 的 jsx 运行时导入后未使用，也就无法使用 emotion 的 css 属性将 /** @jsx jsx */ 改为 /** @jsxImportSource @emotion/react */ 即可
截止2023.05.04，官方文档中依旧是 /** @jsx jsx */ 的导入方式：Emotion – The css Prop

### 7.遗留问题处理

```
src\utils\index.ts
```

解开 `@ts-ignore` "封印"的报错

~~~ts
...
export const isVoid = (val: unknown) => val === undefined || val === null || val === ''

export const cleanObject = (obj: { [key: string]: unknown }) => {
  const res = { ...obj };
  Object.keys(res).forEach((key) => {
    const val = res[key];
    if (isVoid(val)) {
      delete res[key];
    }
  });
  return res;
};  

export const useMount = (cbk: () => void) =>
  useEffect(() => {
    // TODO 依赖项里加上callback 会造成无限循环，这个和 useCallback 以及 useMemo 相关
    cbk();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
...

~~~

object 类型涵盖很广(function、new RegExp('')…)，若只是想用键值对的形式可以使用上面所示的形式 { [key: string]: unknown }
若 val = res[key] 的值是 false 或是 false 的字面量，isFalsy 也会识别，然后就会有 bug，比如 checked，visible 等



## 六、用户体验优化 - 加载中和错误状态处理

#### 1.给页面添加 Loading 和 Error 状态，增加页面友好性

修改 `src\screens\ProjectList\index.tsx`（新增 loading 状态 和 请求错误提示）（部分未修改内容省略）：

~~~ts
...
import { Typography } from "antd";

export const ProjectList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  ...

  useEffect(() => {
    setIsLoading(true)
    // React Hook "useHttp" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.
    client("projects", { data: cleanObject(lastParam) }).then(setList)
      .catch(error => {
        setList([])
        setError(error)
      })
      .finally(() => setIsLoading(false));
    // React Hook useEffect has a missing dependency: 'client'. Either include it or remove the dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastParam]);

  ...

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List loading={isLoading} users={users} dataSource={list} />
    </Container>
  );
};

...

~~~

修改 `src\screens\ProjectList\components\List.tsx`（`ListProps` 继承 `TableProps`, `Table` 的属性（[透传](https://so.csdn.net/so/search?q=透传&spm=1001.2101.3001.7020)））（部分未修改内容省略）：

~~~ts

import { Table, TableProps } from "antd";
...

interface ListProps extends TableProps<Project> {
  users: User[];
}

// type PropsType = Omit<ListProps, 'users'>
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={...}
      { ...props }
    ></Table>
  );
};


~~~

> 为方便后续在组件外再次配置 `Table` 的属性（透传），直接让 `ListProps` 继承 `TableProps`, `TableProps` 单独抽出到 `props`

#### 2.用高级 Hook-useAsync 统一处理 Loading 和 Error 状态

新建 `src\utils\use-async.ts` (统一对 **异步状态** 和 **请求数据** 的管理)：

~~~ts
import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'ready' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'ready',
  data: null,
  error: null
}

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const setData = (data: D) => setState({
    data,
    stat: 'success',
    error: null
  })

  const setError = (error: Error) => setState({
    error,
    stat: 'error',
    data: null
  })

  // run 来触发异步请求
  const run = (promise: Promise<D>) => {
    if(!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据')
    }
    setState({...state, stat: 'loading'})
    return promise.then(data => {
      setData(data)
      return data
    }).catch(error => {
      setError(error)
      return error
    })
  }

  return {
    isReady: state.stat === 'ready',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    ...state
  }
}

~~~

修改 `src\screens\ProjectList\components\List.tsx` (将 `Project` 导出，以便后续引用)（部分未修改内容省略）：

修改 `src\screens\ProjectList\index.tsx` （部分未修改内容省略）：

- 删去之前 `loading` 和 `error` 相关内容；
- 删去 `client` 异步请求 `then` 及后续操作；
- 使用 `useAsync` 统一处理 **异步状态** 和 **请求数据**；

~~~ts
...
import { List, Project } from "./components/List";
...
import { useAsync } from "utils/use-async";

export const ProjectList = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  // 对 param 进行防抖处理
  const lastParam = useDebounce(param);
  const client = useHttp();
  const { run, isLoading, error, data: list } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(lastParam) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastParam]);

  useMount(() => client("users").then(setUsers));

  return (
    <Container>
      ...
      <List loading={isLoading} users={users} dataSource={list || []} />
    </Container>
  );
};
...

~~~

新建 `src\utils\project.ts` (单独处理 Project 数据的异步请求)：

~~~ts
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useEffect } from "react";
import { Project } from "screens/ProjectList/components/List";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result
}

~~~

新建 `src\utils\use-users.ts` (单独处理 User 数据的异步请求)：

~~~ts
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useEffect } from "react";
import { User } from "screens/ProjectList/components/SearchPanel";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result
}

~~~

再次修改 `src\screens\ProjectList\index.tsx` （部分未修改内容省略）：

- `Project` 和 `User` 数据获取分别单独抽离

~~~ts
import { SearchPanel } from "./components/SearchPanel";
import { List } from "./components/List";
import { useState } from "react";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/use-users";

export const ProjectList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  // 对 param 进行防抖处理后接入请求
  const { isLoading, error, data: list } = useProjects(useDebounce(param));
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};
...

~~~

#### 3.登录注册页面 Loading 和 Error 状态处理，与 Event Loop 详解

列表页的 异步状态 弄完，接下来是登录注册页了

修改 src\unauthenticated-app\index.tsx（新增 error 状态处理，将 error j监听操作 交给 登录注册页）：

~~~ts
...
import { Card, Button, Divider, Typography } from "antd";
...

export const UnauthenticatedApp = () => {
  ...
  const [error, setError] = useState<Error | null>(null);
  return (
    <Container>
      ...
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        { error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null }
        {isRegister ? <Register onError={setError}/> : <Login onError={setError}/>}
        <Divider />
        ...
      </ShadowCard>
    </Container>
  );
};
...

~~~

修改 `src\unauthenticated-app\login.tsx`（传入 `onError` 并在异步操作后 `catch` 中使用）：

~~~ts
...
export const Login = ({onError}: { onError: (error: Error) => void }) => {
  ...
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values).catch(e => onError(e))
  };
  ...
};
...

~~~

同理修改 `src\unauthenticated-app\register.tsx`：

~~~ts
...
export const Register = ({onError}: { onError: (error: Error) => void }) => {
  ...
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values).catch(e => onError(e))
  };
  ...
};
...
~~~

使用非预设用户名密码检验：没反应。。。但是控制台打印出了刚输入的用户名和密码。。。

通过登录的调用链可以找到 导致这个问题的原因：src\auth-provider.ts

!res.ok 时，返回了 Promise.reject(data) ，而 data 是请求入参，这显然不是预想的效果（注册同理），修改这部分为 Promise.reject(await res.json())
修改后再次检验，成了！

Promise.catch 固然好用，但接下来换个思路，使用 try..catch 并引出 Event Loop。

先修改 src\unauthenticated-app\login.tsx 试试水：

~~~ts
...
export const Login = ({onError}: { onError: (error: Error) => void }) => {
  ...
  const handleSubmit = (values: { username: string; password: string }) => {
    try {
      // login(values).catch(e => onError(e))
      login(values);
    } catch(e: Error | any) {
      onError(e)
    }
  };
  ...
};
...

~~~

控制台输出正常，但是界面没有效果。。。

问题出在 login 是异步操作，程序中会优先执行同步操作，然后才会异步操作，所以 onError 优先执行，并没有拿到后端返回的报错信息

再次修改 src\unauthenticated-app\login.tsx （使用 async await 处理异步操作）：
————————————————

~~~ts
...
export const Login = ({onError}: { onError: (error: Error) => void }) => {
  ...
  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      // login(values).catch(e => onError(e))
      await login(values);
    } catch(e: Error | any) {
      onError(e)
    }
  };
  ...
};
...

~~~

这样便正常啦!

接下来给注册页新增确认密码功能

修改 `src\unauthenticated-app\register.tsx` （新增确认密码的 `Form.Item` 和 相关处理逻辑）：

~~~ts
...
export const Register = ({onError}: { onError: (error: Error) => void }) => {
  const { register, user } = useAuth();
  const handleSubmit = ({ cpassword, ...values }: { username: string, password: string, cpassword: string }) => {
    if (cpassword === values.password) {
      register(values).catch(e => onError(e));
    } else {
      onError(new Error('请确认两次的输入密码相同'))
      return
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder="确认密码" type="password" id="cpassword" />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type="primary">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

~~~

再接着为 登录注册页 添加异步状态 `Loading` 的处理：

~~~ts
...
import { useAsync } from "utils/use-async";

export const Login = ({onError}: { onError: (error: Error) => void }) => {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync()

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      // login(values).catch(e => onError(e))
      await run(login(values))
    } catch(e: Error | any) {
      onError(e)
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      ...
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
...

~~~

检验一下，没有效果，但是控制台抛出 400 错误了，排查一下

try..catch 中的 onError 没接收到，唯一的变数就是这个 run 了
查看一下，果然报错被 run 内部消化了，没有正常抛出（将 catch 到的 error throw 或是用 Promise.reject 包裹返回都是可以的，建议使用后者）
修改 src\utils\use-async.ts：

~~~ts
...
export const useAsync = <D>(initialState?: State<D>) => {
  ...
  // run 来触发异步请求
  const run = (promise: Promise<D>) => {
    ...
    return promise
      .then(...)
      .catch((error) => {
        // catch 会消化异常，如果不主动抛出，外面是接收不到异常的
        setError(error);
        // return error; // 原代码
        // throw error;
        return Promise.reject(error);
      });
  };
  ...
};

~~~

检验一下，正常 catch 并 展示报错信息

try…catch only works for runtime errors (try…catch 只能处理有效代码之中的异常)
try…catch works synchronously(try…catch 只能处理同步代码之中的异常)
问题是解决了，但这样 try…catch 还是有些拖泥带水的感觉，继续优化：

修改 src\utils\use-async.ts（增加是否抛出异常的配置，来合理化逻辑）：
————————————————

~~~ts
...
const defaultConfig = {
  throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = {...defaultConfig, ...initialConfig}
  ...

  // run 来触发异步请求
  const run = (promise: Promise<D>) => {
    ...
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        // catch 会消化异常，如果不主动抛出，外面是接收不到异常的
        setError(error);
        return config.throwOnError ? Promise.reject(error) : error;
      });
  };
  ...
};

~~~

修改 `src\unauthenticated-app\login.tsx` （传入 `{ throwOnError: true }`）：

~~~ts
...
export const Login = ({onError}: { onError: (error: Error) => void }) => {
  ...
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })
  ...
};
...

~~~

同理修改 `src\unauthenticated-app\register.tsx` ：

~~~ts
...
export const Register = ({onError}: { onError: (error: Error) => void }) => {
  ...
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleSubmit = async ({ cpassword, ...values }: { username: string, password: string, cpassword: string }) => {
    if (cpassword === values.password) {
      try {
        await run(register(values))
      } catch (e: Error | any) {
        onError(e)
      }
    } else {
      onError(new Error('请确认两次的输入密码相同'))
      return
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      ...
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

~~~

最后收尾，修改 `src\unauthenticated-app\index.tsx` （切换登录和注册时，`error` 清空）：

~~~ts
...
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  return (
    <Container>
      ...
      <ShadowCard>
        ...
        <Button type="link" onClick={() => { setIsRegister(!isRegister); setError(null) }}>
          切换到{isRegister ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
        </Button>
      </ShadowCard>
    </Container>
  );
};
...

~~~

检验效果，完美！

拓展学习（引用自：[高薪之路—前端面试精选集-慕课专栏](https://www.imooc.com/read/68)）

js 是单线程的，异步在 js 中是反直觉的存在

判断打印顺序：

~~~js
console.log('script start')
setTimeout(function(){
  console.log('setTimeout');
},0);
new Promise(function(resolve){
  console.log('promise1');
  resolve();
  console.log('promise2');
}).then(function(){
  console.log('promise then');
});
console log('script end');

script start
promise1
promise2
script end
promise then
setTimeout
~~~

因为JavaScript中有2种任务：

宏任务(macro-task)：同步 script(整体代码)，setTimeout 回调函数，setlnterval 回调函数，l/O，Ul rendering;
微任务(micro-task)：process.nextTick，Promise 回调函数， Object.observe，MutationObserver
其执行的顺序是这样的:

首先 JavaScript 引擎会执行一个宏任务，注意这个宏任务一般是指主干代码本身，也就是目前的同步代码；
执行过程中如果遇到微任务，就把它添加到微任务任务队列中；
宏任务执行完成后，立即执行当前微任务队列中的微任务，直到微任务队列被清空；
微任务执行完成后，开始执行下一个宏任务；
如此循环往复，直到宏任务和微任务被清空。

#### 4.用useAsync获取用户信息

修改 `src\components\lib.tsx`（新增全屏 Loading 组件 和 全屏 Error 展示组件）：

~~~ts
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

...
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FullPageLoading = () => <FullPage>
  <Spin size="large"/>
</FullPage>

export const FullPageErrorFallback = ({error}: {error: Error | null}) => <FullPage>
  <DevTools/>
  <Typography.Text type="danger">{error?.message}</Typography.Text>
</FullPage>

~~~

> - 为了展示报错信息的同时，DevTools 依旧展示，需要引入

修改 `src\context\auth-context.tsx`（使用 `useAsync` 改造，并新增全屏 `Loading` 组件 和 全屏 `Error` 展示组件）（部分未修改内容省略）：

~~~ts
...
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

...

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 这里要考虑到初始值的类型与后续值类型，取并组成一个泛型
  // const [user, setUser] = useState<User | null>(null);
  const { data: user, error, isLoading, isReady, isSuccess, isError, run, setData: setUser } = useAsync<User | null>()

  ...

  useMount(() => run(initUser()));

  if (isReady || isLoading) {
    return <FullPageLoading/>
  }

  if (isError) {
    return <FullPageErrorFallback error={error}/>
  }

  return (...);
};
...

~~~

#### 5.实现 Error Boundaries，捕获边界错误

修改 `src\unauthenticated-app\index.tsx`（新增一个“[抛出异常](https://so.csdn.net/so/search?q=抛出异常&spm=1001.2101.3001.7020)”按钮）：

~~~ts
...
export const UnauthenticatedApp = () => {
  ...
  return (
    <Container>
      <Header />
      <Background />
      <Button onClick={() => {
        throw new Error('点击抛出一个异常')
      }}>抛出异常</Button>
      <ShadowCard>...</ShadowCard>
    </Container>
  );
};
...

~~~

修改 `src\authenticated-app.tsx`（新增一个变量展示它不存在的一个属性）：

~~~ts
...
export const AuthenticatedApp = () => {
  ...
  const value: any = undefined;
  ...
  return (
    <Container>
      { value.notExist }
      ...
    </Container>
  );
};
...

~~~

编译代码并全局安装推荐的 `serve` 库，然后启动并访问：

~~~bash
npm run build
yarn global add serve
serve -s build
~~~

点击“抛出异常”按钮：

测试环境：页面展示抛出异常
生产环境：页面不变，控制台抛出异常
登录后：

测试环境：页面展示异常信息
生产环境：页面空白，控制台打印出异常信息
这两种异常对比可看出：在渲染阶段出现未被捕获的异常，整个组件树都会被卸载（错误的展示内容比空白内容更可怕）

错误边界 – React
接下来写一个错误边界捕获组件 —— 新建：src\components\error-boundary.tsx：

~~~ts
import React, { ReactNode } from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement

// children: ReactNode
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender: FallbackRender}>, { error: Error | null }> {
  state = { error: null }

  // 当子组件抛出异常，这里会接受到并更改 state
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    return error ? fallbackRender({ error }) : children
  }
}

~~~

如果一个 class 组件中定义了 static getDerivedStateFromError() 或 componentDidCatch() 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界
React.PropsWithChildren 是 React 中的一个 Utility Types (工具类型) 类型处理器，将传入属性以类似 Object.assign 的方式合并:
type PropsWithChildren<P = unknown> = P & { children?: ReactNode | undefined };
修改：src\App.tsx(使用错误边界组件 ErrorBoundary 包裹，并将异常展示在 FullPageErrorFallback 中)：

~~~ts
...
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";

function App() {
  ...
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
       {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}
...

~~~

重新编译代码并重启serve,然后访问：

```bash
npm run build
serve -s build
12
```

手动抛出错误还是原样，渲染异常导致的边界错误被截获并展示！

```bash
Cannot read property 'notExist' of undefined
```

测试结束后清除以下两个文件中的测试内容（“抛出异常”按钮 和 “value”）：

- `src\unauthenticated-app\index.tsx`
- `src\authenticated-app.tsx`



## 7-12节后续的笔记

这次没有整理完，这是后面笔记的链接，整体笔记细节很多

https://iseeu.blog.csdn.net/article/details/132747686
