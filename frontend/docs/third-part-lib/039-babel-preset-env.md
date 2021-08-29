# @babel/preset-env

开发中使用的库

## 用途

babel 预设：设置转换后的 JS 代码需要满足什么版本等

## 官网链接

https://babeljs.io/docs/en/babel-preset-env

## 基本使用

~~~json

{
  "presets": [
    ["@babel/preset-env", { "targets": "defaults" }]
  ]
}

{
  "targets": {
    "chrome": "58",
    "ie": "11"
  }
}

~~~


## 其他

