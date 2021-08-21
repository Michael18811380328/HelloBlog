# 004 autoprefixer

## 用途

部分 css 代码需要兼容不同版本的浏览器（或者早期版本的浏览器），这个库设置在 webpack 打包文件中，可以根据配置文件自动加上 css 的前缀，便于对应的浏览器正确显示样式。

例如，为早期的谷歌浏览器加上 -webkit- 前缀

不同项目支持的浏览器版本不一样，通常这里需要传入支持的浏览器的版本号

## 可靠性

下载量千万，谷歌推特阿里使用

## 官网链接

https://twitter.com/autoprefixer

https://github.com/postcss/autoprefixer

https://www.npmjs.com/package/autoprefixer

## 基本使用

webpack post-css loader

```json
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  }
}
```

postcss.config.js

```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}

```

## 其他

中文参考：

https://www.zhihu.com/question/28622861

https://zhuanlan.zhihu.com/p/95162754
