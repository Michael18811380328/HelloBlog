# 040 babel/preset-react

开发中使用的库

## 用途

处理 react 的预设，包括下面的插件（编译jsx）

This preset always includes the following plugins:

@babel/plugin-syntax-jsx
@babel/plugin-transform-react-jsx
@babel/plugin-transform-react-display-name
And with the development option:

Classic runtime adds:

@babel/plugin-transform-react-jsx-self
@babel/plugin-transform-react-jsx-source
Automatic runtime (since v7.9.0) adds the functionality for these plugins automatically when the development option is enabled. If you have automatic runtime enabled, adding @babel/plugin-transform-react-jsx-self or @babel/plugin-transform-react-jsx-source will error.

## 官网链接

https://babeljs.io/docs/en/babel-preset-react

## 基本使用

```json

{
  "presets": ["@babel/preset-react"]
}

{
  "presets": [
    [
      "@babel/preset-react",
      {
        "pragma": "dom", // default pragma is React.createElement (only in classic runtime)
        "pragmaFrag": "DomFrag", // default is React.Fragment (only in classic runtime)
        "throwIfNamespace": false, // defaults to true
        "runtime": "classic" // defaults to classic
        // "importSource": "custom-jsx-library" // defaults to react (only in automatic runtime)
      }
    ]
  ]
}

```
## 其他

