# @babel/plugin-transform-runtime 说明

### 问题来源

Babel 通过 babel-preset-env 的配置，把 es6 的语法转换成 es5。

具体转换过程就是在每一个模块前面增加转换函数。

但样这做存在一个问题。在我们正常的前端工程开发的时候，少则几十个js文件，多则上千个。如果每个文件里都使用了class类语法，那会导致每个转换后的文件上部都会注入这些相同的函数声明。这会导致我们用构建工具打包出来的包非常大。

那么怎么办？一个思路就是，我们把这些函数声明都放在一个npm包里，需要使用的时候直接从这个包里引入到我们的文件里。这样即使上千个文件，也会从相同的包里引用这些函数。通过webpack这一类的构建工具打包的时候，我们只会把使用到的npm包里的函数引入一次，这样就做到了复用，减少了体积。

@babel/runtime就是上面说的这个npm包，@babel/runtime把所有语法转换会用到的辅助函数都集成在了一起。这么多辅助函数要一个个记住并手动引入，平常人是做不到的，我也做不到。

### 解决问题

@babel/plugin-transform-runtime有三大作用，其中之一就是自动移除语法转换后内联的辅助函数（inline Babel helpers），使用@babel/runtime/helpers里的辅助函数来替代。这样就减少了我们手动引入的麻烦。

直接更改配置文件 Babel.config.js

```js
{
    "presets": [
      "@babel/env"
    ],
    "plugins": [
      "@babel/plugin-transform-runtime"
    ]
  }
```

### plugin-transform-runtime 作用

@babel/plugin-transform-runtime有三大作用：

1.自动移除语法转换后内联的辅助函数（inline Babel helpers），使用@babel/runtime/helpers里的辅助函数来替代；

2.当代码里使用了core-js的API，自动引入@babel/runtime-corejs3/core-js-stable/，以此来替代全局引入的core-js/stable;

3.当代码里使用了Generator/async函数，自动引入@babel/runtime/regenerator，以此来替代全局引入的regenerator-runtime/runtime；

作用2和3其实是在做API转换，对内置对象进行重命名，以防止污染全局环境。

### 配置项

默认配置

```
"plugins": [
"@babel/plugin-transform-runtime"
]
```
基本配置
```js
  { 
    "plugins": [
      [
        "@babel/plugin-transform-runtime",
        {
          "helpers": true,
          "corejs": false,
          "regenerator": true,
          "useESModules": false,
          "absoluteRuntime": false,
          "version": "7.0.0-beta.0"
        }
      ]
    ]
  }
```

参数说明：

#### helpers

该项是用来设置是否要自动引入辅助函数包，这个我们当然要引入了，这是@babel/plugin-transform-runtime的核心用途。该项取值是布尔值，我们设置为true，其默认值也是true，所以也可以省略不填。

#### corejs和regenerator

这两项是用来设置是否做API转换以避免污染全局环境，regenerator取值是布尔值，corejs取值是false、2和3。这个上一节已经讲过了，在前端业务项目里，我们一般对corejs取false，即不对Promise这一类的API进行转换。而在开发JS库的时候设置为2或3。regenerator取默认的true就可以。

#### useESModules

该项用来设置是否使用ES6的模块化用法，取值是布尔值。默认是fasle，在用webpack一类的打包工具的时候，我们可以设置为true，以便做静态分析。

#### absoluteRuntime

该项用来自定义@babel/plugin-transform-runtime引入@babel/runtime/模块的路径规则，取值是布尔值或字符串。没有特殊需求，我们不需要修改，保持默认false即可。

#### version

该项主要是和@babel/runtime及其进化版@babel/runtime-corejs2、@babel/runtime-corejs3的版本号有关系，这三个包我们只需要根据需要安装一个。我们把安装的npm包的版本号设置给version即可。例如，在上节的babel14例子里，安装的@babel/runtime-corejs3版本是^7.10.4，那么配置项version也取'^7.10.4'。 其实该项不填取默认值就行，目前填写版本号主要是可以减少打包体积。

另外，在Babel6版本，该插件还有两个配置选项polyfill和useBuiltIns，在v7版本已经移除了，大家不需要再使用。

### 参考

https://zhuanlan.zhihu.com/p/394783228

https://zhuanlan.zhihu.com/p/394783727

https://zhuanlan.zhihu.com/p/394783900