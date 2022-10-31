## webpack 第六节

2021-10-31

### webpack 构建基本原理

实际上打包后的文件 bundle 就是一个自执行函数。

函数的前半部分是启动器（描述不同模块的依赖关系）

~~~js
(function (modules) {
  var installedModules = {};
  // 定义一个内置的 require 函数，替换原来的导入模块
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = (installedModules[moduleId] = {
      i: moduleId,
      1: false,
      exports: {}
    });
    modules[moduleId].call(
    	module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    module.1 = true;
    return module.exports;
  }
}
return __webpack_require__((__webpack_require__.s = "./index.js"));
// ...
)
~~~

函数的后半部分是一个对象，键是模块的路径，值是模块的具体代码。

~~~js
{
  "./a.js": function(module, exports) {
    eval(
   	 '// import a from "./a";\n\nconsole.log("hello")\n\n//#sourceURL=webpack:///./index.js?'
    );
  }
}
~~~

webpack 实现了 `__webpack_require__` 的内部函数实现模块化，把代码缓存到 installedModules 中。代码内部的 require 被替换成 `__webpack_require__`

然后 webpack 通过 import 找出不同模块的依赖关系（依赖树）并进行构建转换

loader 是对不同树节点的处理；plugin 是统一对树节点做处理（例如摇树）

### 简单实现一个 webpack

webpack 构建过程

1. 读取配置文件（需要配置入口和出口）
2. 分析模块依赖关系
   1. 通过 fs 读取文件，通过 babel.parser 进行语法解析，转换成 AST，分析内容
   2. 获取依赖关系和源码，把源码编译转换成可以执行的代码
   3. 从入口文件递归遍历全部模块执行 1-2
3. 把 AST 转换成对象（键是文件路径，值是处理好的代码内容）
4. 创建 bundle.js，增加启动器函数，处理 module exports require，浏览器可以执行

~~~js
// bundle.js(浏览器直接解析)
const options = require("./webpack.config.js");
const Webpack = require("./lib/webpack.js");

new Webpack(options).run();
~~~

我们自己写一个 webpack

需要 babel 库（词法解析语法解析；转换 AST）

~~~bash
npm install @babel/parser @babel/traverse --save
~~~

~~~js
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

module.exports = class Webpack {
  // 将变量存放在构造器中
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
  }
  
  run() {
    const info = this.parse(this.entry);
    this.modules.push(info);
    // 循环时，始终往 this.modules 中 push，实现广度优先遍历
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i];
      const { dependencies } = item;
      if (dependencies) {
        // 递归转换依赖的模块
        for (let j in dependencies) {
          this.modules.push(this.parse(dependencies[j]));
        }
      }
    }
    const obj = {};
    this.modules.forEach(item => {
    	obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code,
      };
    });
    console.log(this.modules);
  }
  
  parse(entryFilePath) {
    // 读取文件内容
    const content = fs.readFileSync(entryFilePath, "utf-8");
    
    // 词法解析成 AST
    const ast = parser.parse(content, {
      sourceType: "module"
    });
    
    // 路径转换（AST节点分成两类，一种是导入的节点，一种是代码内容节点）
    traverse(ast, {
      // 处理导入声明的节点
      ImportDeclaration({ node }) {
        // 我们需要把模块中的相对路径，转换成根路径的相对路径
        // './utils.js' => './src/utils.js'
        // 就是把入口文件的路径和模块的相对路径拼在一起，使用 path.join 即可
        const newPathName = path.join(
        	path.dirname(entryFile),
          node.source.value
        );
        // 将路径的对应关系写入对象
        dependencies[node.source.value] = newPathName;
      },
    });
    
		// 异步处理
    transformFromAst(ast, null, {
      presets: ["@babel/preset-env"],
    });
    
    return {
      entryFile,
      dependencies,
      code,
    }
  }
  
  // 处理 require module exports
  // main.js => dist/main.js
  file(code) {
    const filePath = path.join(this.output,path, this.output.xxx)
    const newCode = JSON.stringify(code);
    const bundle = `
			(function(graph) {
				function require(module) {
					function reRequire(relativePath) {
						graph[module].dependencies[relativePath];
          }
					var exports = {}
					(function(code) {
						eval(code);	
        	})(reRequire, exports, graph[module].code);
					return exports;
        }
				require('${this.entry}');
      })(${newCode});
		`;
    fs.writeFileSync(filePath, bundle, "utf-8");
  }
}

~~~

这里转换文档在 babel 官网上有介绍

transformFromAst 基本用法

~~~js
const parsedAst = babel.parse(sourceCode, {
  parserOpts: allowReturnOutsideFunction: true
});
babel.transformAst(parsedAst, sourceCode, options, {
  function(err, result) {
    const { code, map, ast } = result;
  }
});
~~~

需要把代码转换成浏览器可以识别的，需要 babel/core and babel/preset-env

~~~js
const babel = require("@babel/core");

const { code } = babel.transformFromAst(Ast, null, {
  presets: ["@babel/preset-env"]
});
~~~























### 自定义 loader

在 webpack 上面有具体的编写 loader 或者 plugin 的教程

loader 是一个声明式函数（不能用箭头函数）；需要获取对象，处理后并返回（原地算法）

~~~js
module.exports = function(obj) {
  // 一定要返回这个对象（多个loader有顺序）
  return obj.replace('hello', 'hi');
}
~~~

可以通过 query属性获取 loader 配置文件的传参

最好使用官方给出的 this.callback 函数，返回这个对象

~~~js
const loaderUtils = require("loader-utils");

module.exports = function(source) {
  const options = loaderUtils.getOptions(this);
  const result = source.replace('hello', 'hi');
  this.callback(null, result);
}
~~~

~~~ts
this.callback(
	err: Error | null,
  contemt: string | Buffer,
  sourceMap?: SourceMap,
  meta?: any
);
~~~

如果是自定义的loader，需要在 webpack 配置路径

~~~js
resolveLoader: {
  modules: ["node_modules", "./loader"],
}
  
rules: [
  {
    test: /\.js$/,
    use: [
      "replaceLoader",
      {
        loader: "replaceLoaderAsync",
        options: {
          name: "all"
        }
      }
    ]
  }
]
~~~

如果是 style-loader

~~~js
module.exports = function(source) {
  return `
		const ele = document.createElement('style');
		ele.innerHtml = ${JSON.stringify(source)};
		document.head.appendChild(ele);
	`;
}
~~~

### 自定义 plugin

比 loader 复杂，在官网上也可以找到

（plugin是一个类，需要包含 apply 函数，接受参数 compiler）

事件驱动，发布订阅

