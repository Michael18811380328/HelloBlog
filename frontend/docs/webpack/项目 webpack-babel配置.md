# 配置说明

### 第三方依赖版本（dtable+editor）


~~~json
"babel-cli": "^6.26.0",
"babel-plugin-transform-runtime": "^6.23.0",
"babel-preset-env": "^1.7.0",
"babel-preset-es2015": "^6.24.1",
"babel-preset-react": "^6.24.1",
"babel-preset-stage-2": "^6.24.1",
"webpack": "4.29.6",
"webpack-cli": "^3.3.4",
"webpack-dev-server": "3.2.1",
"webpack-manifest-plugin": "2.0.4",
"workbox-webpack-plugin": "4.2.0"
~~~

需要注意高版本和低版本的兼容，还有 webpack-babel 不同版本的配置文件不同

### Script 脚本说明

~~~json
{
  "pub:lib": "export BABEL_ENV=node && ./node_modules/.bin/babel src --out-dir lib --copy-files",
  "pub:esm": "export BABEL_ENV=production && ./node_modules/.bin/babel src --out-dir es --copy-files",
  "pub:umd": "export BABEL_ENV=production && webpack --config ./config/webpack.config.pub.js",
  "pub:optimized": "rm es/settings.js es/i18n.js es/index.local.js && rm lib/settings.js lib/i18n.js lib/index.local.js",
  "prepublishOnly": "npm run pub:lib && npm run pub:esm && npm run pub:umd && npm run pub:optimized"
}
~~~

发布前，依次执行上面的四个脚本

- pub:lib 在 node 环境下 babel 编译代码到 lib 目录下
- pub:esm 在生产环境下 bebel 编译代码到 es 目录下
- pub:umd 在生产环境下 webpack 使用配置文件进行编译（入口出口在配置文件中）
- pub:optimized 删除本地配置文件和翻译文件

前两步应该兼容开发环境（node环境，web开发环境，web生产环境）

### Makefile 脚本说明

~~~makefile
dist: clean transpile postdist

clean:
	@echo '--> Cleaning dist'
	rm -rf dist/* 2> /dev/null
	@echo "\033[32;36m clean dist success \033[0m"

transpile:
	@echo "--> Compile dist"
	export NODE_ENV=production && node_modules/babel-cli/bin/babel.js src --out-dir dist
	@echo "\033[32;36m compile dist success \033[0m"

postdist:
	@echo "--> Copy css and remove settings.js"
	cp -r src/css dist && cp -r src/lib/css dist/lib && rm dist/settings.js
	@echo "\033[32;36m post dist success \033[0m"

.PHONY: transpile postdist clean
~~~

### babelrc 配置说明

editor

~~~json
{ 
  "presets": [
    "es2015",
    "react",
    "env",
    "stage-2"
  ],
  'plugins': [
    [
      'transform-runtime', 
      {
        'helpers': false,
        'polyfill': false,
        'regenerator': true,
        'moduleName': 'babel-runtime'
      }
    ]
  ]
}
~~~

Table

~~~js
{
  "env": {
    "test": {
      "presets": [["react-app", {"absoluteRuntime" : false, "BABEL_ENV" : "test"}]],
    },
    "development": {
      "presets": [["react-app", {"absoluteRuntime" : false, "BABEL_ENV" : "development"}]],
    },
    "production": {
      "presets": [["react-app", {"absoluteRuntime" : false, "BABEL_ENV" : "production"}]],
    },
    "node": {
      "presets": [
        [
          "@babel/env",
          {
            "loose": true,
            "shippedProposals": true,
            "modules": "commonjs",
          }
        ],
        "@babel/react"
      ],
      "plugins": [
        "@babel/plugin-proposal-export-default-from", 
        "@babel/plugin-proposal-export-namespace-from", 
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-transform-runtime",
      ]
    }
  }
}
~~~

TODO：未来专门弄一个文件学习 babel 及配置作用（基本会使用）

### webpack.config.pub.js 配置说明


~~~js
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production', 
  entry: {
    index: [
      require.resolve('./polyfills'),
      path.resolve(__dirname, '../src/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, "../dist/"),
    filename: 'seafile-dtable.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  externals: {
    react: {
      root: 'React',
      var: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
        root: 'ReactDOM',
        var: 'ReactDOM',
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
    },
    'prop-types': {
        root: 'PropTypes',
        var: 'PropTypes',
        commonjs: 'prop-types',
        commonjs2: 'prop-types',
        amd: 'prop-types',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: true,
            cacheDirectory: false,
          },
        }
      },
      { 
        test: /\.css$/, 
        use: ['style-loader','css-loader']
      },
      {
        test: /\.less$/,
        use:  [
          {loader: 'style-loader'},
          {loader: 'css-loader'}, 
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'images/[name]-[hash:8].[ext]',
        },
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      // This is only used in production mode
      new TerserPlugin({
        terserOptions: {
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          // Added for profiling in devtools
          keep_classnames: true,
          keep_fnames: true,
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        // Disabled on WSL (Windows Subsystem for Linux) due to an issue with Terser
        // https://github.com/webpack-contrib/terser-webpack-plugin/issues/21
        parallel: false,
        // Enable file caching
        cache: true,
        sourceMap: false,
      }),
    ],
  },
  node: {
    setImmediate: false,
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
} 
~~~

这是 webpack 配置文件，未来要学会

### 附录

babel-preset-env 说明：https://www.cnblogs.com/chyingp/p/understanding-babel-preset-env.html