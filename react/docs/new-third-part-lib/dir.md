# 前端常用第三方库介绍

这是常用的第三方库说明

注意事项：第三方库注意版本差异。例如 react-dnd 当前已经是8，实际项目使用 2。react-qrcode 当前版本是3，实际项目使用1。那么官方文档和实际 API 就对不上了，需要注意！

查阅已有笔记和其他文档时，也需要注意版本对应。

因为种种原因，实际项目使用的版本，不一定是稳定版，不一定是最新版（不同库的兼容问题等，更新最新版后需要重构代码等），所以根据实际情况分析。

- [ ] 不同的文档可以完善（中文）
- [ ] 最好按照使用频率排序
- [ ] 其他文档可以统一维护到这里



1 常用的组件工具库（reactstrap, lodash）

100 不常用库

200 开发依赖的库（babel）

300-不推荐的库（star 较少，或者长期没有维护等）——这部分直接删除即可



下面的序号可能没有更新

| 序号 | 名称                                                         | 使用环境 | 使用频率 | 用途                                                         | 其他说明                                                     |
| ---- | ------------------------------------------------------------ | -------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 001  | "@antv/g2": "4.0.12",                                        | 生产     | 中       | 统计图                                                       |                                                              |
| 002  | "react-image-lightbox": "0.0.9",                             | 生产     | 中       | 多张图片预览                                                 |                                                              |
| 003  | "antd-mobile": "^2.3.1",                                     | 生产     | 中       | 移动端 UI 组件库                                             | 按需加载                                                     |
| 004  | "autoprefixer": "^9.5.1",                                    | 生产     | 中       | 自动增加 css 前缀，兼容不同版本浏览器                        | 不同项目配置不同的版本                                       |
| 005  | "axios": "^0.19.0",                                          | 生产     | 高       | 发送请求，是 promise 的封装                                  | 功能组件                                                     |
| 006  | "deep-copy": "^1.4.2",                                       | 生产     | 高       | 深拷贝引用类型变量                                           | 功能组件，大量使用存在性能问题                               |
| 007  | "dom-helpers": "^5.1.3",                                     | 生产     | 低       | 兼容 ie9 的 DOM 操作方法                                     |                                                              |
| 008  | "glamor": "^2.20.40",                                        | 生产     | 中       | css-in-js 直接在JS中写入css的样式                            |                                                              |
| 009  | "html2canvas": "^1.0.0-rc.7",                                | 生产     | 中       | HTML 网页转换成截图                                          |                                                              |
| 010  | "i18next": "^17.0.13",                                       | 生产     | 低       | 翻译                                                         |                                                              |
| 011  | "i18next-browser-languagedetector": "^3.0.3",                | 生产     | 低       | 翻译插件                                                     |                                                              |
| 012  | "i18next-xhr-backend": "^3.1.2",                             | 生产     | 低       | 翻译（从后端获取数据）                                       |                                                              |
| 013  | "is-hotkey": "^0.1.4",                                       | 生产     | 高       | 键盘事件兼容不同操作系统                                     |                                                              |
| 014  | "keymirror": "^0.1.1",                                       | 生产     | 低       | 创建键和值相等的对象                                         |                                                              |
| 015  | "lodash.throttle": "4.1.1",                                  | 生产     | 高       | lodash 的节流函数接口                                        |                                                              |
| 016  | "promise": "^8.0.3",                                         | 生产     | 低       | 文件上传异步转换成同步操作                                   |                                                              |
| 017  | "qrcode.react": "^1.0.0",                                    | 生产     | 中       | react 二维码生成器                                           |                                                              |
| 018  | "raf": "3.4.1",                                              | 生产     | 中       | 动画效果                                                     |                                                              |
| 022  | "react-is-deprecated": "^0.1.2",                             | 生产     | 低       | 弃用的 proptypes                                             |                                                              |
| 024  | "react-sweet-progress": "^1.1.2",                            | 生产     | 低       | 进度条的UI组件                                               |                                                              |
| 025  | "reactstrap": "8.9.0",                                       | 生产     | 高       | UI 库                                                        |                                                              |
| 026  | "reselect": "^4.0.0",                                        | 生产     | 低       | 基于 redux 的选择器组件                                      |                                                              |
| 027  | "ron-react-autocomplete": "^4.0.9",                          | 生产     | 低       | Autocomplete component for React.                            |                                                              |
| 028  | "shallowequal": "^1.1.0",                                    | 生产     | 中       | 浅比较两个对象是否相等                                       |                                                              |
| 030  | "whatwg-fetch": "^3.0.0"                                     | 生产     | 中       | window.fetch 的便携版                                        |                                                              |
| 031  | "@babel/cli": "^7.4.4",                                      | 开发     | 低       | babel 执行的命令行的 CLI                                     |                                                              |
| 032  | "@babel/plugin-proposal-class-properties": "^7.4.4",         | 开发     | 低       | Below is a class with four class properties which will be transformed. | This https://babeljs.io/docs/en/babel-plugin-proposal-class-properties |
| 033  | "@babel/plugin-proposal-export-default-from": "^7.5.2",      | 开发     | 低       | Compile export default to ES2015                             | https://babeljs.io/docs/en/babel-plugin-proposal-export-default-from |
| 034  | "@babel/plugin-proposal-export-namespace-from": "^7.5.2",    | 开发     | 低       | Compile export namespace to ES2015                           | https://babeljs.io/docs/en/babel-plugin-proposal-export-namespace-from |
| 035  | "@babel/plugin-proposal-object-rest-spread": "^7.5.2",       | 开发     | 低       | Compile object rest and spread to ES5                        | https://babeljs.io/docs/en/babel-plugin-proposal-object-rest-spread |
| 036  | "@babel/plugin-transform-member-expression-literals": "^7.2.0", | 开发     | 低       | Ensure that reserved words are quoted in property accesses   | https://babeljs.io/docs/en/babel-plugin-transform-member-expression-literals |
| 037  | "@babel/plugin-transform-property-literals": "^7.2.0",       | 开发     | 低       | Ensure that reserved words are quoted in object property keys | https://babeljs.io/docs/en/babel-plugin-transform-property-literals |
| 038  | "@babel/plugin-transform-runtime": "^7.4.4",                 | 开发     | 低       | Externalise references to helpers and builtins, automatically polyfilling your code without polluting globals | https://babeljs.io/docs/en/babel-plugin-transform-runtime    |
| 039  | "@babel/preset-env": "^7.4.5",                               | 开发     | 低       | babel 预设编译后的JS代码的环境                               |                                                              |
| 040  | "@babel/preset-react": "^7.0.0",                             | 开发     | 低       | babel 编译 react 预设的库                                    |                                                              |
| 041  | "@svgr/webpack": "4.1.0",                                    | 开发     | 低       | svg 文件loader                                               | https://www.npmjs.com/package/@svgr/webpack                  |
| 044  | "babel-eslint": "10.0.1",                                    | 开发     | 中       | babel 代码规范检查                                           | https://www.npmjs.com/package/eslint-plugin-babel            |
| 045  | "babel-jest": "^24.8.0",                                     | 开发     | 低       | Babel jest plugin                                            | https://www.npmjs.com/package/babel-jest                     |
| 046  | "babel-loader": "8.0.5",                                     | 开发     | 高       | This package allows transpiling JavaScript files using Babel and webpack. | https://www.npmjs.com/package/babel-loader                   |
| 047  | "babel-plugin-named-asset-import": "^0.3.2",                 | 开发     | 低       | babel 插件                                                   |                                                              |
| 048  | "babel-preset-react-app": "^9.0.0",                          | 开发     | 中       | This package includes the Babel preset used by Create React App. | https://www.npmjs.com/package/babel-preset-react-app         |
| 049  | "camelcase": "^5.2.0",                                       | 开发     | 中       | Convert a dash/dot/underscore/space separated string to camelCase or PascalCase: foo-bar → fooBar | https://www.npmjs.com/package/camelcase                      |
| 050  | "case-sensitive-paths-webpack-plugin": "2.2.0",              | 开发     | 中       | 这个 Webpack 插件强制所有必需模块的整个路径与磁盘上实际路径的确切大小写匹配。 使用此插件有助于缓解在 OSX 上工作的开发人员（不遵循严格的路径区分大小写）与其他开发人员或运行其他需要正确大小写路径的操作系统的构建框发生冲突的情况。 | https://www.npmjs.com/package/case-sensitive-paths-webpack-plugin |
| 051  | "css-loader": "^3.0.0",                                      | 开发     | 中       | css 加载器                                                   |                                                              |
| 052  | "debug": "^4.1.1",                                           | 开发     | 中       | A tiny JavaScript debugging utility modelled after Node.js core's debugging technique. Works in Node.js and web browsers. | https://www.npmjs.com/package/debug                          |
| 053  | "dotenv": "6.2.0",                                           | 开发     | 中       | Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology. | https://www.npmjs.com/package/dotenv                         |
| 054  | "dotenv-expand": "4.2.0",                                    | 开发     | 中       | Dotenv-expand adds variable expansion on top of dotenv. If you find yourself needing to expand environment variables already existing on your machine, then dotenv-expand is your tool. | https://www.npmjs.com/package/dotenv-expand                  |
| 055  | "enzyme": "^3.10.0",                                         | 开发     | 中       | Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output. | https://www.npmjs.com/package/enzyme                         |
| 056  | "enzyme-adapter-react-16": "^1.14.0",                        | 开发     | 中       | 对 react 功能组件测试，Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output. You can also manipulate, traverse, and in some ways simulate runtime given the output. | https://www.npmjs.com/package/enzyme-adapter-react-16        |
| 057  | "eslint": "^5.16.0",                                         | 开发     | 高       | 代码格式检查                                                 | https://www.npmjs.com/package/eslint                         |
| 058  | "eslint-config-react-app": "^4.0.1",                         | 开发     | 中       | eslint 针对 react 的插件                                     |                                                              |
| 059  | "eslint-loader": "2.1.2",                                    | 开发     | 中       | eslint 加载器                                                |                                                              |
| 060  | "eslint-plugin-flowtype": "2.50.1",                          | 开发     | 中       | https://www.npmjs.com/package/eslint-plugin-flowtype         | ESLint 的流类型 linting 规则。                               |
| 061  | "eslint-plugin-import": "2.16.0",                            | 开发     | 中       | 该插件旨在支持 ES6+ 导入/导出语法的 linting，并防止文件路径和导入名称拼写错误的问题。 | https://www.npmjs.com/package/eslint-plugin-import           |
| 062  | "eslint-plugin-jsx-a11y": "6.2.1",                           | 开发     | 中       | 用于 JSX 元素可访问性规则的静态 AST 检查器。                 | https://www.npmjs.com/package/eslint-plugin-jsx-a11y         |
| 064  | "eslint-plugin-react-hooks": "^1.5.0",                       | 开发     | 中       | This ESLint plugin enforces the Rules of Hooks.              | https://www.npmjs.com/package/eslint-plugin-react-hooks      |
| 067  | "html-webpack-plugin": "4.0.0-beta.5",                       | 开发     | 中       | 简化创建 HTML 文件以服务于打包的插件                         | https://www.npmjs.com/package/html-webpack-plugin            |
| 068  | "identity-obj-proxy": "3.0.0",                               | 开发     | 中       | 使用 ES6 代理的身份对象。 用于测试简单的 webpack 导入。 例如，您可以告诉 Jest 将此对象模拟为导入的 CSS 模块； 那么您在导入的样式对象上的所有 className 查找都将按原样返回。 | https://www.npmjs.com/package/identity-obj-proxy             |
| 069  | "is-wsl": "^1.1.0",                                          | 开发     | 中       | 如果您需要解决 WSL 中未实现或有问题的功能，这会很有用。 支持 WSL 1 和 WSL 2。 | https://www.npmjs.com/package/is-wsl                         |
| 071  | "jest-environment-jsdom-fourteen": "0.1.0",                  | 开发     | 中       | jest 插件，可以在观察模式下，选择特定的单元测试执行，已经部署到个人项目中 | https://www.npmjs.com/package/jest-watch-typeahead           |
| 072  | "jest-resolve": "24.7.1",                                    | 开发     | 中       | 说明文档和 jest 在一个界面上                                 | https://www.npmjs.com/package/jest-resolve                   |
| 073  | "jest-watch-typeahead": "0.3.0",                             | 开发     | 中       | Filter your tests by file name or test name                  | https://www.npmjs.com/package/jest-watch-typeahead           |
| 074  | "less": "^3.10.3",                                           | 开发     | 中       | less 样式                                                    | The dynamic stylesheet language. http://lesscss.org.         |
| 075  | "less-loader": "^5.0.0",                                     | 开发     | 中       | less 加载器                                                  |                                                              |
| 076  | "mini-css-extract-plugin": "0.5.0",                          | 开发     | 中       | css 按需加载（把CSS提取到不同的JS文件中）                    | https://www.npmjs.com/package/mini-css-extract-plugin        |
| 077  | "optimize-css-assets-webpack-plugin": "5.0.1",               | 开发     | 中       | A Webpack plugin to optimize \ minimize CSS assets.          | https://www.npmjs.com/package/optimize-css-assets-webpack-plugin |
| 078  | "pnp-webpack-plugin": "1.2.1",                               | 开发     | 中       | Webpack 的即插即用解析器                                     | https://www.npmjs.com/package/pnp-webpack-plugin             |
| 079  | "postcss-flexbugs-fixes": "^4.1.0",                          | 开发     | 中       | PostCSS plugin This project tries to fix all of flexbug's issues. | https://www.npmjs.com/package/postcss-flexbugs-fixes         |
| 080  | "postcss-loader": "^3.0.0",                                  | 开发     | 中       | postcss 加载器                                               |                                                              |
| 081  | "postcss-normalize": "7.0.1",                                | 开发     | 中       | PostCSS Normalize lets you use the parts of normalize.css or sanitize.css that you need from your browserslist. | https://www.npmjs.com/package/postcss-normalize              |
| 082  | "postcss-preset-env": "6.6.0",                               | 开发     | 中       | CSS 兼容不用版本早期的浏览器。PostCSS Preset Env lets you convert modern CSS into something most browsers can understand, determining the polyfills you need based on your targeted browsers or runtime environments. | https://www.npmjs.com/package/postcss-preset-env             |
| 083  | "postcss-safe-parser": "4.0.1",                              | 开发     | 中       | PostCSS 的容错 CSS 解析器，它将发现和修复语法错误，能够解析任何输入。 | https://www.npmjs.com/package/postcss-safe-parser            |
| 084  | "react": "^16.8.6",                                          | 开发     | 高       | react                                                        |                                                              |
| 085  | "react-app-polyfill": "^1.0.1",                              | 开发     | 中       | This package includes polyfills for various browsers.        | https://www.npmjs.com/package/react-app-polyfill             |
| 086  | "react-dev-utils": "^9.0.1",                                 | 开发     | 中       | This package includes some utilities used by Create React App. | https://www.npmjs.com/package/react-dev-utils                |
| 087  | "react-dom": "^16.8.6",                                      | 开发     | 高       | react-dom 和 HTML 元素操作工具                               |                                                              |
| 088  | "resolve": "1.10.0",                                         | 开发     | 中       | 实现节点 require.resolve() 算法，以便您可以异步和同步地代表文件 require.resolve() | https://www.npmjs.com/package/resolve                        |
| 089  | "sass-loader": "^7.1.0",                                     | 开发     | 中       | sass 加载器                                                  |                                                              |
| 090  | "semver": "6.0.0",                                           | 开发     | 中       | npm 的语义版本器                                             | https://www.npmjs.com/package/semver                         |
| 091  | "style-loader": "^0.23.1",                                   | 开发     | 中       | 样式加载器                                                   |                                                              |
| 092  | "terser-webpack-plugin": "^1.2.3",                           | 开发     | 中       | This plugin uses terser to minify your JavaScript. 压缩JS    | https://www.npmjs.com/package/terser-webpack-plugin          |
| 093  | "ts-pnp": "1.1.2",                                           | 开发     | 中       | https://www.npmjs.com/package/semver                         | npm 的语义版本器                                             |
| 094  | "url-loader": "^2.0.0",                                      | 开发     | 中       | loader for transforms files into base64 URIs.                | https://www.npmjs.com/package/url-loader                     |
| 095  | "webpack": "4.29.6",                                         | 开发     | 高       | webpack 打包工具                                             | https://www.npmjs.com/package/webpack                        |
| 096  | "webpack-cli": "^3.3.4",                                     | 开发     | 高       | webpack 命令行工具                                           | https://www.npmjs.com/package/webpack-cli                    |
| 097  | "webpack-dev-server": "3.2.1",                               | 开发     | 高       | webpack 开发环境打包服务器                                   | https://www.npmjs.com/package/webpack-dev-server             |
| 098  | "webpack-manifest-plugin": "2.0.4",                          | 开发     | 低       | 生成资源清单的插件                                           | https://www.npmjs.com/package/webpack-manifest-plugin        |
| 099  | "workbox-webpack-plugin": "4.2.0"                            | 开发     | 中       |                                                              | https://www.npmjs.com/package/workbox-webpack-plugin https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin |
| 100  | "debug": "^4.1.1",                                           | node     | 高       | node 打印日志                                                |                                                              |
| 101  | "number-precision": "^1.3.2",                                | 生产     | 中       | 小数精确计算                                                 | 数字精确计算，大量使用有性能问题                             |
| 102  | "slugid": "^2.0.0",                                          | 生产     | 低       | 生成 UUID                                                    |                                                              |
| 103  | "socket.io-client": "^2.3.0"                                 | node     | 高       | websocket 客户端                                             |                                                              |
| 109  | "@testing-library/jest-dom": "^4.2.4",                       | 开发     | 低       | 您想使用 jest 编写测试来断言有关 DOM 状态的各种事情。 作为该目标的一部分，您希望避免这样做时出现的所有重复模式。 检查一个元素的属性，它的文本内容，它的 css 类，你可以命名它。 | https://www.npmjs.com/package/@testing-library/jest-dom      |
| 110  | "@testing-library/react": "^9.4.0",                          | 开发     | 中       | 简单而完整的 React DOM 测试实用程序，鼓励良好的测试实践。    | https://www.npmjs.com/package/@testing-library/react         |
| 111  | "@testing-library/user-event": "^7.2.1",                     | 开发     | 中       | 以与用户相同的方式触发事件                                   | https://www.npmjs.com/package/@testing-library/user-event    |
| 133  | "fs-extra": "^8.1.0",                                        | node     | 中       | fs 的高级版本                                                | https://www.npmjs.com/package/fs-extra                       |
| 165  | "@reach/router": "^1.2.0",                                   | 生产     | 中       | react-router 的增强版                                        |                                                              |
| 166  | "resumablejs": "^1.1.13",                                    | 生产     | 低       | 大文件分块上传下载                                           |                                                              |
| 167  | "chart.js": "^2.9.3",                                        | 生产     | 中       | 前端 canvas 绘图                                             |                                                              |
| 168  | "classnames": "^2.2.6",                                      | 生产     | 中       | 组合 HTML 中的类名                                           |                                                              |
| 169  | "copy-to-clipboard": "^3.0.8",                               | 生产     | 中       | 复制内容到剪切板                                             |                                                              |
| 170  | "faker": "^4.1.0",                                           | 生产     | 中       | 模拟请求假数据                                               |                                                              |
| 171  | "immutability-helper": "^3.0.0",                             | 生产     | 低       | react 中不可变元素复制的库                                   |                                                              |
| 172  | "konva": "3.2.0",                                            | 生产     | 低       | canvas 在线图形编辑工具                                      |                                                              |
| 173  | "MD5": "^1.3.0",                                             | 生产     | 中       | 生成字符串对应的 md5 加密结果                                |                                                              |
| 174  | "merge": "^1.2.1",                                           | 生产     | 低       | 合并对象（Object.assign）                                    |                                                              |
| 175  | "moment": "^2.22.2",                                         | 生产     | 中       | 时间转换显示                                                 | 时间处理                                                     |
| 176  | "object-assign": "4.1.1",                                    | 生产     | 低       | 兼容早期浏览器中的 Object.assign                             |                                                              |
| 177  | "prismjs": "^1.15.0",                                        | 生产     | 中       | 代码片段高亮                                                 |                                                              |
| 178  | "prop-types": "^15.6.2",                                     | 生产     | 中       | 类型验证（react)                                             |                                                              |
| 179  | "react": "^16.8.6",                                          | 生产     | 中       | react 框架，应该是开发环境                                   |                                                              |
| 180  | "react-chartjs-2": "^2.8.0",                                 | 生产     | 中       | react 组件库（实现 chartjs 的功能）                          |                                                              |
| 181  | "react-codemirror": "^1.0.0",                                | 生产     | 中       | 代码预览编辑高亮                                             |                                                              |
| 182  | "react-cookies": "^0.1.0",                                   | 生产     | 低       | react 实现的 cookie 管理                                     | 代码没有开源，下载较少，不推荐使用                           |
| 183  | "react-dnd": "^2.6.0",                                       | 生产     | 高       | 拖拽组件                                                     |                                                              |
| 184  | "react-dnd-html5-backend": "^2.6.0",                         | 生产     | 高       | 拖拽组件                                                     |                                                              |
| 186  | "react-i18next": "^10.12.2",                                 | 生产     | 中       | 翻译                                                         |                                                              |
| 187  | "react-image-lightbox": "^5.1.0",                            | 生产     | 中       | 图片预览工具                                                 |                                                              |
| 188  | "react-konva": "16.8.6",                                     | 生产     | 低       | react+canvas 绘图工具                                        |                                                              |
| 189  | "react-mentions": "^3.0.2",                                  | 生产     | 中       | react 组件 评论 @                                            |                                                              |
| 190  | "react-moment": "^0.7.9",                                    | 生产     | 低       | react 组件库（实现 moment 的功能）                           |                                                              |
| 191  | "react-responsive": "^6.1.2",                                | 生产     | 高       | 媒体查询响应式开发（css）                                    |                                                              |
| 192  | "react-select": "^3.1.0",                                    | 生产     | 高       | react 选择器组件                                             |                                                              |
| 195  | "sw-precache-webpack-plugin": "0.11.4",                      | 开发     | 低       | SWPrecacheWebpackPlugin 是一个 webpack 插件，用于使用 service worker 缓存外部项目依赖项。 它将使用 sw-precache 生成一个 Service Worker 文件并将其添加到您的构建目录中。 | https://www.npmjs.com/package/sw-precache-webpack-plugin     |
| 196  | "unified": "^7.0.0",                                         | 生产     | 中       | AST 转换器                                                   |                                                              |
| 197  | "url-parse": "^1.4.3",                                       | 生产     | 中       | Url 对象转换工具                                             |                                                              |
| 198  | "vfile": "^3.0.0",                                           | 生产     | 低       | 解析序列化转换数据                                           |                                                              |
| 199  | "video.js": "^7.4.1",                                        | 生产     | 中       | 视频播放器                                                   |                                                              |
| 200  | "watermark-dom": "^1.0.0",                                   | 生产     | 中       | 生成背景的水印                                               |                                                              |
| 203  | "@typescript-eslint/eslint-plugin": "^2.2.0",                | 开发     | 中       | An ESLint plugin which provides lint rules for TypeScript codebases. | https://www.npmjs.com/package/@typescript-eslint/eslint-plugin |
| 204  | "@typescript-eslint/parser": "^2.2.0",                       | 开发     | 中       | An ESLint parser which leverages TypeScript ESTree to allow for ESLint to lint TypeScript source code. | https://www.npmjs.com/package/@typescript-eslint/parser      |
| 219  | "eslint-plugin-react": "^7.16.0",                            | 开发     | 中       | React specific linting rules for ESLint                      | https://www.npmjs.com/package/eslint-plugin-react            |
| 221  | "file-loader": "^1.1.11",                                    | 开发     | 中       | The file-loader resolves import/require() on a file into a url and emits the file into the output directory. | https://www.npmjs.com/package/file-loader                    |
| 243  | "resolve-url-loader": "3.1.0",                               | 开发     | 低       | https://www.npmjs.com/package/resolve-url-loader             | 这个 webpack 加载器允许你拥有一个分布式的 SCSS 文件集，以及与这些 SCSS 文件共存的资源。 |
| 251  | "webpack-bundle-tracker": "^0.4.3",                          | 开发     | 低       | 将有关 webpack 编译过程的一些统计信息吐出到文件中。          | https://www.npmjs.com/package/webpack-bundle-tracker         |
| 255  | "connect-multiparty": "^2.2.0",                              | 生产     | 低       | 上传文件的中间件                                             |                                                              |
| 256  | "csv": "^5.3.2",                                             | 生产     | 中       | nodeJS 中数据类型和 csv 转换器                               |                                                              |
| 257  | "date-format": "2.1.0",                                      | 生产     | 低       | nodeJS 日期对象转换成字符串                                  |                                                              |
| 258  | "detect-character-encoding": "^0.8.0",                       | 生产     | 低       | Detect character encoding using ICU                          |                                                              |
| 259  | "etcd3": "^1.1.0",                                           | 生产     | 低       | 分布式集群部署 etcd3                                         |                                                              |
| 260  | "express": "^4.16.3",                                        | 生产     | 中       | 中间层服务器                                                 |                                                              |
| 261  | "express-rate-limit": "^5.1.3",                              | 生产     | 中       | 请求次数限制                                                 |                                                              |
| 262  | "iconv-lite": "^0.5.1",                                      | 生产     | 中       | 字符串不同格式转码                                           |                                                              |
| 263  | "jsonwebtoken": "^8.5.1",                                    | 生产     | 中       | 服务端 JWT 登录验证                                          |                                                              |
| 264  | "log4js": "^4.5.1",                                          | node     | 高       | nodeJS 日志工具                                              |                                                              |
| 265  | "mysql": "^2.17.1",                                          | 生产     | 中       | mysql 的 nodeJS 工具                                         |                                                              |
| 266  | "redis": "^2.8.0",                                           | 生产     | 中       | nodeJS 的 redis                                              |                                                              |
| 267  | "request": "^2.88.0",                                        | 生产     | 中       | http 网络请求工具                                            |                                                              |
| 268  | "response-time": "2.3.2",                                    | 生产     | 低       | HTTP 响应时间 nodejs 和 express 联合使用                     |                                                              |
| 269  | "socket.io": "^2.2.0",                                       | 生产     | 高       | socket 服务端程序                                            |                                                              |
| 270  | "uuid": "^3.3.2"                                             | 生产     | 高       | 生成 UUID                                                    |                                                              |
| 271  | "@babel/core": "^7.5.0",                                     | 开发     | 中       | babel 核心代码（编译es6）                                    | https://babeljs.io/docs/en/babel-core                        |
| 272  | "@babel/node": "^7.5.0",                                     | 开发     | 低       | babel-node 是一个 CLI，其工作方式与 Node.js CLI 完全相同，它的额外好处是在运行之前使用 Babel 预设和插件进行编译。 | https://babeljs.io/docs/en/babel-node                        |
| 273  | "@babel/plugin-transform-modules-commonjs": "^7.5.0",        | 开发     | 低       | This plugin transforms ES2015 modules to CommonJS            | https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs |
| 274  | "@babel/register": "^7.4.4",                                 | 开发     | 低       | babel require hook                                           | https://www.npmjs.com/package/@babel/register                |
| 275  | "@babel/runtime": "^7.8.3",                                  | 开发     | 中       | contains Babel modular runtime helpers and a version of regenerator-runtime | https://babeljs.io/docs/en/babel-runtime                     |
| 276  | "babel-register": "^6.26.0",                                 | 开发     | 低       | The require hook will bind itself to node's require and automatically compile files on the fly. | https://www.npmjs.com/package/babel-register                 |
| 277  | "clean-webpack-plugin": "3.0.0",                             | 开发     | 低       | A webpack plugin to remove/clean your build folder(s).       | https://www.npmjs.com/package/clean-webpack-plugin           |
| 278  | "form-data": "^2.5.1",                                       | 开发     | 低       | A library to create readable "multipart/form-data" streams. Can be used to submit forms and file uploads to other web applications. | https://www.npmjs.com/package/form-data                      |
| 279  | "jest": "^24.9.0",                                           | 开发     | 高       | 单元测试工具                                                 | https://www.npmjs.com/package/jest                           |
| 280  | "nodemon": "2.0.7",                                          | 开发     | 低       | nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. | https://www.npmjs.com/package/nodemon                        |
| 281  | "rimraf": "3.0.2",                                           | 开发     | 低       | The UNIX command rm -rf for node.                            | https://www.npmjs.com/package/rimraf                         |
| 282  | "supertest": "^4.0.2",                                       | 开发     | 低       | HTTP assertions made easy via superagent.                    | npmjs.com/package/supertest                                  |
| 286  | "webpack-merge": "5.7.3",                                    | 开发     | 低       | webpack-merge - Merge designed for Webpack                   | https://www.npmjs.com/package/webpack-merge                  |
| 287  | "webpack-node-externals": "2.5.2"                            | 开发     |          |                                                              |                                                              |
| 290  | “lodash”                                                     | 生产     | 高       | JS 工具库                                                    |                                                              |
| 291  | "jszip"                                                      | node     | 中       | zip文件压缩编辑解压                                          |                                                              |

