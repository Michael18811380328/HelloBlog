# 带你深度解锁Webpack系列(进阶篇)

掘金

[无名之苝](https://juejin.cn/user/3368559358523944/posts)

2020-03-0947,221阅读15分钟

三篇长文，带你解锁 `Webpack` ，希望读完这三篇文章，你能够对 `webpack` 的各项配置有一个更为清晰的认识。

本文是第二篇，如果你还没有阅读[《带你深度解锁Webpack系列(基础篇)》](https://juejin.cn/post/6844904079219490830)，建议阅读之后，再继续阅读本文。

本文会引入更多的 `webpack` 配置，如果文中有任何错误，欢迎在评论区指正，我会尽快修正。 `webpack` 优化部分放在了下一篇。

推荐大家参考本文一步一步进行配置，不要总是想着找什么最佳配置，掌握之后，根据自己的需求配置出来的，就是最佳配置。

本文对应的项目地址(编写本文时使用) 供参考：[github.com/YvetteLau/w…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FYvetteLau%2Fwebpack%2Ftree%2Fmaster%2Fwebpack-second)



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/9/170bae7ee866b278~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



### 1. 静态资源拷贝

有些时候，我们需要使用已有的JS文件、CSS文件（本地文件），但是不需要 `webpack` 编译。例如，我们在 `public/index.html` 中引入了 `public` 目录下的 `js` 或 `css` 文件。这个时候，如果直接打包，那么在构建出来之后，肯定是找不到对应的 `js` / `css` 了。

> `public` 目录结构

```
复制代码├── public
│   ├── config.js
│   ├── index.html
│   ├── js
│   │   ├── base.js
│   │   └── other.js
│   └── login.html
```

现在，我们在 `index.html` 中引入了 `./js/base.js`。

```
复制代码<!-- index.html -->
<script src="./js/base.js"></script>
```

这时候，我们 `npm run dev`，会发现有找不到该资源文件的报错信息。

对于这个问题，我们可以手动将其拷贝至构建目录，然后在配置 `CleanWebpackPlugin` 时，注意不要清空对应的文件或文件夹即可，但是如若这个静态文件时不时的还会修改下，那么依赖于手动拷贝，是很容易出问题的。

不要过于相信自己的记性，依赖于手动拷贝的方式，大多数人应该都有过忘记拷贝的经历，你要是说你从来没忘过。



![050a81c7-59e4-4596-b08f-62cefce353d0.jpg](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/9/170bae7eedad0932~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



幸运的是，`webpack` 为我们这些记性不好又爱偷懒的人提供了好用的插件 [CopyWebpackPlugin](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fplugins%2Fcopy-webpack-plugin%2F)，它的作用就是将单个文件或整个目录复制到构建目录。

首先安装一下依赖：

```
复制代码npm install copy-webpack-plugin -D
```

修改配置(当前，需要做的是将 `public/js` 目录拷贝至 `dist/js` 目录)：

```
复制代码//webpack.config.js
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    //...
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'public/js/*.js',
                to: path.resolve(__dirname, 'dist', 'js'),
                flatten: true,
            },
            //还可以继续配置其它要拷贝的文件
        ])
    ]
}
```

此时，重新执行 `npm run dev`，报错信息已经消失。

这里说一下 `flatten` 这个参数，设置为 `true`，那么它只会拷贝文件，而不会把文件夹路径都拷贝上，大家可以不设置 `flatten` 时，看下构建结果。

另外，如果我们要拷贝一个目录下的很多文件，但是想过滤掉某个或某些文件，那么 `CopyWebpackPlugin` 还为我们提供了 `ignore` 参数。

```
复制代码//webpack.config.js
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    //...
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'public/js/*.js',
                to: path.resolve(__dirname, 'dist', 'js'),
                flatten: true,
            }
        ], {
            ignore: ['other.js']
        })
    ]
}
```

例如，这里我们忽略掉 `js` 目录下的 `other.js` 文件，使用 `npm run build` 构建，可以看到 `dist/js` 下不会出现 `other.js` 文件。 `CopyWebpackPlugin` 还提供了很多其它的参数，如果当前的配置不能满足你，可以查阅文档进一步修改配置。

### 2.ProvidePlugin

`ProvidePlugin` 在我看来，是为懒人准备的，不过也别过度使用，毕竟全局变量不是什么“好东西”。`ProvidePlugin` 的作用就是不需要 `import` 或 `require` 就可以在项目中到处使用。

`ProvidePlugin` 是 `webpack` 的内置插件，使用方式如下：

```
复制代码new webpack.ProvidePlugin({
  identifier1: 'module1',
  identifier2: ['module2', 'property2']
});
```

默认寻找路径是当前文件夹 `./**` 和 `node_modules`，当然啦，你可以指定全路径。

`React` 大家都知道的，使用的时候，要在每个文件中引入 `React`，不然立刻抛错给你看。还有就是 `jquery`, `lodash` 这样的库，可能在多个文件中使用，但是懒得每次都引入，好嘛，一起来偷个懒，修改下 `webpack` 的配置:

```
复制代码const webpack = require('webpack');
module.exports = {
    //...
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            Component: ['react', 'Component'],
            Vue: ['vue/dist/vue.esm.js', 'default'],
            $: 'jquery',
            _map: ['lodash', 'map']
        })
    ]
}
```

这样配置之后，你就可以在项目中随心所欲的使用 `$`、`_map`了，并且写 `React` 组件时，也不需要 `import` `React` 和 `Component` 了，如果你想的话，你还可以把 `React` 的 `Hooks` 都配置在这里。

另外呢，`Vue` 的配置后面多了一个 `default`，这是因为 `vue.esm.js` 中使用的是 `export default` 导出的，对于这种，必须要指定 `default`。`React` 使用的是 `module.exports` 导出的，因此不要写 `default`。

另外，就是如果你项目启动了 `eslint` 的话，记得修改下 `eslint` 的配置文件，增加以下配置：

```
复制代码{
    "globals": {
        "React": true,
        "Vue": true,
        //....
    }
}
```

当然啦，偷懒要有个度，你要是配一大堆全局变量，最终可能会给自己带来麻烦，对自己配置的全局变量一定要负责到底。



![u=2243033496,1576809017&fm=15&gp=0.jpg](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/9/170bae7ef26d2ca3~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



### 3.抽离CSS

CSS打包我们前面已经说过了，不过呢，有些时候，我们可能会有抽离CSS的需求，即将CSS文件单独打包，这可能是因为打包成一个JS文件太大，影响加载速度，也有可能是为了缓存(例如，只有JS部分有改动)，还有可能就是“我高兴”：我想抽离就抽离，谁也管不着。

不管你是因为什么原因要抽离CSS，只要你有需求，我们就可以去实现。

首先，安装 `loader`:

```
复制代码npm install mini-css-extract-plugin -D
```

> `mini-css-extract-plugin` 和 `extract-text-webpack-plugin` 相比:

1. 异步加载
2. 不会重复编译(性能更好)
3. 更容易使用
4. 只适用CSS

修改我们的配置文件：

```
复制代码//webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
            //个人习惯将css文件放在单独目录下
            //publicPath:'../'   //如果你的output的publicPath配置的是 './' 这种相对路径，那么如果将css文件放在单独目录下，记得在这里指定一下publicPath 
        })
    ],
    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader, //替换之前的 style-loader
                    'css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')({
                                        "overrideBrowserslist": [
                                            "defaults"
                                        ]
                                    })
                                ]
                            }
                        }
                    }, 'less-loader'
                ],
                exclude: /node_modules/
            }
        ]
    }
}
```

现在，我们重新编译：`npm run build`，目录结构如下所示:

```
复制代码.
├── dist
│   ├── assets
│   │   ├── alita_e09b5c.jpg
│   │   └── thor_e09b5c.jpeg
│   ├── css
│   │   ├── index.css
│   │   └── index.css.map
│   ├── bundle.fb6d0c.js
│   ├── bundle.fb6d0c.js.map
│   └── index.html
```

前面说了最好新建一个 `.browserslistrc` 文件，这样可以多个 `loader` 共享配置，所以，动手在根目录下新建文件 (`.browserslistrc`)，内容如下（你可以根据自己项目需求，修改为其它的配置）:

```
复制代码last 2 version
> 0.25%
not dead
```

修改 `webpack.config.js`：

```
复制代码//webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    //...
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css' 
        })
    ],
    module: {
        rules: [
            {
                test: /\.(c|le)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')()
                                ]
                            }
                        }
                    }, 'less-loader'
                ],
                exclude: /node_modules/
            },
        ]
    }
}
```

要测试自己的 `.browserlistrc` 有没有生效也很简单，直接将文件内容修改为 `last 1 Chrome versions` ，然后对比修改前后的构建出的结果，就能看出来啦。

可以查看更多[browserslistrc]配置项([github.com/browserslis…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbrowserslist%2Fbrowserslist))

更多配置项，可以查看[mini-css-extract-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fmini-css-extract-plugin)

#### 将抽离出来的css文件进行压缩

使用 `mini-css-extract-plugin`，`CSS` 文件默认不会被压缩，如果想要压缩，需要配置 `optimization`，首先安装 `optimize-css-assets-webpack-plugin`.

```
复制代码npm install optimize-css-assets-webpack-plugin -D
```

修改webpack配置：

```
复制代码//webpack.config.js
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    //....
    plugins: [
        new OptimizeCssPlugin()
    ],
}
```

注意，这里将 `OptimizeCssPlugin` 直接配置在 `plugins` 里面，那么 `js` 和 `css` 都能够正常压缩，如果你将这个配置在 `optimization`，那么需要再配置一下 `js` 的压缩(开发环境下不需要去做CSS的压缩，因此后面记得将其放到 `webpack.config.prod.js` 中哈)。

配置完之后，测试的时候发现，抽离之后，修改 `css` 文件时，第一次页面会刷新，但是第二次页面不会刷新 —— 好嘛，我平时的业务中用不着抽离 `css`，这个问题搁置了好多天(准确来说是忘记了)。

3月8号再次修改这篇文章的时候，正好看到了 `MiniCssExtractPlugin.loader` 对应的 `option` 设置，我们再次修改下对应的 `rule`。

```
复制代码module.exports = {
    rules: [
        {
            test: /\.(c|le)ss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true,
                    }
                },
                //...
            ],
            exclude: /node_modules/
        }
    ]
}
```



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/9/170bae7ef4ea39dd~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



### 4.按需加载

很多时候我们不需要一次性加载所有的JS文件，而应该在不同阶段去加载所需要的代码。`webpack`内置了强大的分割代码的功能可以实现按需加载。

比如，我们在点击了某个按钮之后，才需要使用使用对应的JS文件中的代码，需要使用 `import()` 语法：

```
复制代码document.getElementById('btn').onclick = function() {
    import('./handle').then(fn => fn.default());
}
```

`import()` 语法，需要 `@babel/plugin-syntax-dynamic-import` 的插件支持，但是因为当前 `@babel/preset-env` 预设中已经包含了 `@babel/plugin-syntax-dynamic-import`，因此我们不需要再单独安装和配置。

直接 `npm run build` 进行构建，构建结果如下：



![WechatIMG1121.jpeg](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/9/170bae7ef6dc0875~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



`webpack` 遇到 `import(****)` 这样的语法的时候，会这样处理：

- 以**** 为入口新生成一个 `Chunk`
- 当代码执行到 `import` 所在的语句时，才会加载该 `Chunk` 所对应的文件（如这里的1.bundle.8bf4dc.js）

大家可以在浏览器中的控制台中，在 `Network` 的 `Tab页` 查看文件加载的情况，只有点击之后，才会加载对应的 `JS` 。

### 5.热更新

1. 首先配置 `devServer` 的 `hot` 为 `true`
2. 并且在 `plugins` 中增加 `new webpack.HotModuleReplacementPlugin()`

```
复制代码//webpack.config.js
const webpack = require('webpack');
module.exports = {
    //....
    devServer: {
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() //热更新插件
    ]
}
```

我们配置了 `HotModuleReplacementPlugin` 之后，会发现，此时我们修改代码，仍然是整个页面都会刷新。不希望整个页面都刷新，还需要修改入口文件：

1. 在入口文件中新增:

```
复制代码if(module && module.hot) {
    module.hot.accept()
}
```

此时，再修改代码，不会造成整个页面的刷新。



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/9/170bae7ef7c6718b~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



### 6.多页应用打包

有时，我们的应用不一定是一个单页应用，而是一个多页应用，那么如何使用 `webpack` 进行打包呢。为了生成目录看起来清晰，不生成单独的 `map` 文件。

```
复制代码//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:6].js'
    },
    //...
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html' //打包后的文件名
        }),
        new HtmlWebpackPlugin({
            template: './public/login.html',
            filename: 'login.html' //打包后的文件名
        }),
    ]
}
```

如果需要配置多个 `HtmlWebpackPlugin`，那么 `filename` 字段不可缺省，否则默认生成的都是 `index.html`，如果你希望 `html` 的文件名中也带有 `hash`，那么直接修改 `fliename` 字段即可，例如: `filename: 'login.[hash:6].html'`。

生成目录如下:

```
复制代码.
├── dist
│   ├── 2.463ccf.js
│   ├── assets
│   │   └── thor_e09b5c.jpeg
│   ├── css
│   │   ├── index.css
│   │   └── login.css
│   ├── index.463ccf.js
│   ├── index.html
│   ├── js
│   │   └── base.js
│   ├── login.463ccf.js
│   └── login.html
```

看起来，似乎是OK了，不过呢，查看 `index.html` 和 `login.html` 会发现，都同时引入了 `index.f7d21a.js` 和 `login.f7d21a.js`，通常这不是我们想要的，我们希望，`index.html` 中只引入 `index.f7d21a.js`，`login.html` 只引入 `login.f7d21a.js`。

`HtmlWebpackPlugin` 提供了一个 `chunks` 的参数，可以接受一个数组，配置此参数仅会将数组中指定的js引入到html文件中，此外，如果你需要引入多个JS文件，仅有少数不想引入，还可以指定 `excludeChunks` 参数，它接受一个数组。

```
复制代码//webpack.config.js
module.exports = {
    //...
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './public/login.html',
            filename: 'login.html', //打包后的文件名
            chunks: ['login']
        }),
    ]
}
```

执行 `npm run build`，可以看到 `index.html` 中仅引入了 `index` 的 `JS` 文件，而 `login.html` 中也仅引入了 `login` 的 `JS` 文件，符合我们的预期。



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/9/170bae7f6f69cfb5~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



### 7.resolve 配置

`resolve` 配置 `webpack` 如何寻找模块所对应的文件。`webpack` 内置 `JavaScript` 模块化语法解析功能，默认会采用模块化标准里约定好的规则去寻找，但你可以根据自己的需要修改默认的规则。

1. modules

`resolve.modules` 配置 `webpack` 去哪些目录下寻找第三方模块，默认情况下，只会去 `node_modules` 下寻找，如果你我们项目中某个文件夹下的模块经常被导入，不希望写很长的路径，那么就可以通过配置 `resolve.modules` 来简化。

```
复制代码//webpack.config.js
module.exports = {
    //....
    resolve: {
        modules: ['./src/components', 'node_modules'] //从左到右依次查找
    }
}
```

这样配置之后，我们 `import Dialog from 'dialog'`，会去寻找 `./src/components/dialog`，不再需要使用相对路径导入。如果在 `./src/components` 下找不到的话，就会到 `node_modules` 下寻找。

1. alias

`resolve.alias` 配置项通过别名把原导入路径映射成一个新的导入路径，例如：

```
复制代码//webpack.config.js
module.exports = {
    //....
    resolve: {
        alias: {
            'react-native': '@my/react-native-web' //这个包名是我随便写的哈
        }
    }
}
```

例如，我们有一个依赖 `@my/react-native-web` 可以实现 `react-native` 转 `web`。我们代码一般下面这样:

```
复制代码import { View, ListView, StyleSheet, Animated } from 'react-native';
```

配置了别名之后，在转 web 时，会从 `@my/react-native-web` 寻找对应的依赖。

当然啦，如果某个依赖的名字太长了，你也可以给它配置一个短一点的别名，这样用起来比较爽，尤其是带有 `scope` 的包。

1. extensions

适配多端的项目中，可能会出现 `.web.js`, `.wx.js`，例如在转web的项目中，我们希望首先找 `.web.js`，如果没有，再找 `.js`。我们可以这样配置:

```
复制代码//webpack.config.js
module.exports = {
    //....
    resolve: {
        extensions: ['web.js', '.js'] //当然，你还可以配置 .json, .css
    }
}
```

首先寻找 `../dialog.web.js` ，如果不存在的话，再寻找 `../dialog.js`。这在适配多端的代码中非常有用，否则，你就需要根据不同的平台去引入文件(以牺牲了速度为代价)。

```
复制代码import dialog from '../dialog';
```

当然，配置 `extensions`，我们就可以缺省文件后缀，在导入语句没带文件后缀时，会自动带上`extensions` 中配置的后缀后，去尝试访问文件是否存在，因此要将高频的后缀放在前面，并且数组不要太长，减少尝试次数。如果没有配置 `extensions`，默认只会找对对应的js文件。

1. enforceExtension

如果配置了 `resolve.enforceExtension` 为 `true`，那么导入语句不能缺省文件后缀。

1. mainFields

有一些第三方模块会提供多份代码，例如 `bootstrap`，可以查看 `bootstrap` 的 `package.json` 文件：

```
复制代码{
    "style": "dist/css/bootstrap.css",
    "sass": "scss/bootstrap.scss",
    "main": "dist/js/bootstrap",
}
```

`resolve.mainFields` 默认配置是 `['browser', 'main']`，即首先找对应依赖 `package.json` 中的 `brower` 字段，如果没有，找 `main` 字段。

如：`import 'bootstrap'` 默认情况下，找得是对应的依赖的 `package.json` 的 `main` 字段指定的文件，即 `dist/js/bootstrap`。

假设我们希望，`import 'bootsrap'` 默认去找 `css` 文件的话，可以配置 `resolve.mainFields` 为:

```
复制代码//webpack.config.js
module.exports = {
    //....
    resolve: {
        mainFields: ['style', 'main'] 
    }
}
```

### 8.区分不同的环境

目前为止我们 `webpack` 的配置，都定义在了 `webpack.config.js` 中，对于需要区分是开发环境还是生产环境的情况，我们根据 `process.env.NODE_ENV` 去进行了区分配置，但是配置文件中如果有多处需要区分环境的配置，这种显然不是一个好办法。

更好的做法是创建多个配置文件，如: `webpack.base.js`、`webpack.dev.js`、`webpack.prod.js`。

- `webpack.base.js` 定义公共的配置
- `webpack.dev.js`：定义开发环境的配置
- `webpack.prod.js`：定义生产环境的配置

[webpack-merge](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwebpack-merge) 专为 `webpack` 设计，提供了一个 `merge` 函数，用于连接数组，合并对象。

```
复制代码npm install webpack-merge -D
复制代码const merge = require('webpack-merge');
merge({
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {a: 1}
        ]
    },
    plugins: [1,2,3]
}, {
    devtool: 'none',
    mode: "production",
    module: {
        rules: [
            {a: 2},
            {b: 1}
        ]
    },
    plugins: [4,5,6],
});
//合并后的结果为
{
    devtool: 'none',
    mode: "production",
    module: {
        rules: [
            {a: 1},
            {a: 2},
            {b: 1}
        ]
    },
    plugins: [1,2,3,4,5,6]
}
```

`webpack.config.base.js` 中是通用的 `webpack` 配置，以 `webpack.config.dev.js` 为例，如下：

```
复制代码//webpack.config.dev.js
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');

module.exports = merge(baseWebpackConfig, {
    mode: 'development'
    //...其它的一些配置
});
```

然后修改我们的 `package.json`，指定对应的 `config` 文件：

```
复制代码//package.json
{
    "scripts": {
        "dev": "cross-env NODE_ENV=development webpack-dev-server --config=webpack.config.dev.js",
        "build": "cross-env NODE_ENV=production webpack --config=webpack.config.prod.js"
    },
}
```

你可以使用 `merge` 合并，也可以使用 `merge.smart` 合并，`merge.smart` 在合并`loader`时，会将同一匹配规则的进行合并，`webpack-merge` 的说明文档中给出了详细的示例。

### 9.定义环境变量

很多时候，我们在开发环境中会使用预发环境或者是本地的域名，生产环境中使用线上域名，我们可以在 `webpack` 定义环境变量，然后在代码中使用。

使用 `webpack` 内置插件 `DefinePlugin` 来定义环境变量。

`DefinePlugin` 中的每个键，是一个标识符.

- 如果 `value` 是一个字符串，会被当做 `code` 片段
- 如果 `value` 不是一个字符串，会被`stringify`
- 如果 `value` 是一个对象，正常对象定义即可
- 如果 `key` 中有 `typeof`，它只针对 `typeof` 调用定义

```
复制代码//webpack.config.dev.js
const webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            DEV: JSON.stringify('dev'), //字符串
            FLAG: 'true' //FLAG 是个布尔类型
        })
    ]
}
复制代码//index.js
if(DEV === 'dev') {
    //开发环境
}else {
    //生产环境
}
```



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/9/170bae7f724b6757~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



### 10.利用webpack解决跨域问题

假设前端在3000端口，服务端在4000端口，我们通过 `webpack` 配置的方式去实现跨域。

首先，我们在本地创建一个 `server.js`：

```
复制代码let express = require('express');

let app = express();

app.get('/api/user', (req, res) => {
    res.json({name: '刘小夕'});
});

app.listen(4000);
```

执行代码(`run code`)，现在我们可以在浏览器中访问到此接口: `http://localhost:4000/api/user`。

在 `index.js` 中请求 `/api/user`，修改 `index.js` 如下:

```
复制代码//需要将 localhost:3000 转发到 localhost:4000（服务端） 端口
fetch("/api/user")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

我们希望通过配置代理的方式，去访问 4000 的接口。

#### 配置代理

修改 `webpack` 配置:

```
复制代码//webpack.config.js
module.exports = {
    //...
    devServer: {
        proxy: {
            "/api": "http://localhost:4000"
        }
    }
}
```

重新执行 `npm run dev`，可以看到控制台打印出来了 `{name: "刘小夕"}`，实现了跨域。

大多情况，后端提供的接口并不包含 `/api`，即：`/user`，`/info`、`/list` 等，配置代理时，我们不可能罗列出每一个api。

修改我们的服务端代码，并重新执行。

```
复制代码//server.js
let express = require('express');

let app = express();

app.get('/user', (req, res) => {
    res.json({name: '刘小夕'});
});

app.listen(4000);
```

尽管后端的接口并不包含 `/api`，我们在请求后端接口时，仍然以 `/api` 开头，在配置代理时，去掉 `/api`，修改配置:

```
复制代码//webpack.config.js
module.exports = {
    //...
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    }
}
```

重新执行 `npm run dev`，在浏览器中访问： `http://localhost:3000/`，控制台中也打印出了`{name: "刘小夕"}`，跨域成功，

### 11.前端模拟数据

> 简单数据模拟

```
复制代码module.exports = {
    devServer: {
        before(app) {
            app.get('/user', (req, res) => {
                res.json({name: '刘小夕'})
            })
        }
    }
}
```

在 `src/index.js` 中直接请求 `/user` 接口。

```
复制代码fetch("user")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

> 使用 mocker-api mock数据接口

mocker-api 为 REST API 创建模拟 API。在没有实际 REST API 服务器的情况下测试应用程序时，它会很有用。

1. 安装 [mocker-api](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fmocker-api):

```
复制代码npm install mocker-api -D
```

1. 在项目中新建mock文件夹，新建 mocker.js.文件，文件如下:

```
复制代码module.exports = {
    'GET /user': {name: '刘小夕'},
    'POST /login/account': (req, res) => {
        const { password, username } = req.body
        if (password === '888888' && username === 'admin') {
            return res.send({
                status: 'ok',
                code: 0,
                token: 'sdfsdfsdfdsf',
                data: { id: 1, name: '刘小夕' }
            })
        } else {
            return res.send({ status: 'error', code: 403 })
        }
    }
}
```

1. 修改 `webpack.config.base.js`:

```
复制代码const apiMocker = require('mocker-api');
module.export = {
    //...
    devServer: {
        before(app){
            apiMocker(app, path.resolve('./mock/mocker.js'))
        }
    }
}
```

这样，我们就可以直接在代码中像请求后端接口一样对mock数据进行请求。

1. 重启 `npm run dev`，可以看到，控制台成功打印出来 `{name: '刘小夕'}`
2. 我们再修改下 `src/index.js`，检查下POST接口是否成功

```
复制代码//src/index.js
fetch("/login/account", {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: "admin",
        password: "888888"
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

可以在控制台中看到接口返回的成功的数据。

进阶篇就到这里结束啦，最后一篇是优化篇，下周一带上小板凳和瓜子来约。



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/9/170bae92e83c51e3~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



### 最后

如果本文对你有帮助的话，给本文点个赞吧。

[带你深度解锁Webpack系列(优化篇)](https://juejin.cn/post/6844904093463347208)

