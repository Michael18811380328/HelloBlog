# TS+JEST 单元测试配置文件说明

最近在做一个 JS + TS 项目，使用 JEST 做测试，我本地的配置文件如下

~~~json
module.exports = {
  roots: [
    '<rootDir>/test',
  ],
  testRegex: 'test/(.+)\\.test\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.[jt]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

~~~

## 参数简单说明

- roots 测试文件的位置（字符串或者数组）
- testRegex 测试文件匹配的文件格式（正则表达式）这里匹配 .test.jsx .test.tsx 的文件
- transform 转换器（编译器）：是一个对象，key 是正则表达式（满足的文件），值是采用的编译器（转换器）ts-test 这个库
- moduleFileExtensions 这个是支持的文件类型



## 参数具体说明

### roots `[array<string>]`

Default: `["<rootDir>"]`

Jest用于搜索文件的目录的路径列表

A list of paths to directories that Jest should use to search for files in.

There are times where you only want Jest to search in a single sub-directory (such as cases where you have a `src/` directory in your repo), but prevent it from accessing the rest of the repo.

Note: While `rootDir` is mostly used as a token to be re-used in other configuration options, `roots` is used by the internals of Jest to locate **test files and source files**. This applies also when searching for manual mocks for modules from `node_modules` (`__mocks__` will need to live in one of the `roots`).

Note: By default, `roots` has a single entry `<rootDir>` but there are cases where you may want to have multiple roots within one project, for example `roots: ["<rootDir>/src/", "<rootDir>/tests/"]`.



### testRegex ` [string | array<string>]`

Default: `(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$`

Jest用于检测测试文件的模式

The pattern or patterns Jest uses to detect test files. 

By default it looks for `.js`, `.jsx`, `.ts` and `.tsx` files inside of `__tests__` folders, as well as any files with a suffix of `.test` or `.spec` (e.g. `Component.test.js` or `Component.spec.js`). It will also find files called `test.js` or `spec.js`. See also [`testMatch` [array\]](https://jestjs.io/docs/en/configuration#testmatch-arraystring), but note that you cannot specify both options.

The following is a visualization of the default regex:

```bash
├── __tests__
│   └── component.spec.js # test
│   └── anything # test
├── package.json # not test
├── foo.test.js # test
├── bar.spec.jsx # test
└── component.js # not test
```

Note: `testRegex` will try to detect test files using the **absolute file path**, therefore, having a folder with a name that matches it will run all the files as tests



### transform` [object<string, pathToTransformer | [pathToTransformer, object]>]`

Default: `{"\\.[jt]sx?$": "babel-jest"}`

A map from regular expressions to paths to transformers. A transformer is a module that provides a synchronous function for transforming source files. 

从正则表达式到转换器的路径的映射。 转换器是提供同步功能以转换源文件的模块。例如，如果您希望能够在节点尚不支持的模块或测试中使用新的语言功能，则可以插入许多将JavaScript的未来版本编译为当前版本的编译器之一。 

For example, if you wanted to be able to use a new language feature in your modules or tests that aren't yet supported by node, you might plug in one of many compilers that compile a future version of JavaScript to a current one. Example: see the [examples/typescript](https://github.com/facebook/jest/blob/master/examples/typescript/package.json#L16) example or the [webpack tutorial](https://jestjs.io/docs/en/webpack).

Examples of such compilers include:

- [Babel](https://babeljs.io/)
- [TypeScript](http://www.typescriptlang.org/)
- [async-to-gen](http://github.com/leebyron/async-to-gen#jest)
- To build your own please visit the [Custom Transformer](https://jestjs.io/docs/en/tutorial-react#custom-transformers) section

You can pass configuration to a transformer like `{filePattern: ['path-to-transformer', {options}]}` For example, to configure babel-jest for non-default behavior, `{"\\.js$": ['babel-jest', {rootMode: "upward"}]}`

*Note: a transformer is only run once per file unless the file has changed. During the development of a transformer it can be useful to run Jest with `--no-cache` to frequently [delete Jest's cache](https://jestjs.io/docs/en/troubleshooting#caching-issues).*

*Note: when adding additional code transformers, this will overwrite the default config and `babel-jest` is no longer automatically loaded. If you want to use it to compile JavaScript or Typescript, it has to be explicitly defined by adding `{"\\.[jt]sx?$": "babel-jest"}` to the transform property. See [babel-jest plugin](https://github.com/facebook/jest/tree/master/packages/babel-jest#setup)*



### moduleFileExtensions` [array<string>]`

Default: `["js", "json", "jsx", "ts", "tsx", "node"]`

An array of file extensions your modules use. If you require modules without specifying a file extension, these are the extensions Jest will look for, in left-to-right order.

We recommend placing the extensions most commonly used in your project on the left, so if you are using TypeScript, you may want to consider moving "ts" and/or "tsx" to the beginning of the array.

模块使用的文件扩展名数组。 如果您需要模块而未指定文件扩展名，则这些是Jest将按从左到右的顺序查找的扩展名。

我们建议将项目中最常用的扩展名放在左侧，因此，如果您使用的是TypeScript，则可能需要考虑将“ ts”和/或“ tsx”移动到数组的开头。



## 参考文档

https://jestjs.io/docs/en/configuration