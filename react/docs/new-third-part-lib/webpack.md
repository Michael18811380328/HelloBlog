
# webpack 


### version
5.93.0 • 


### downloads
26,491,544 


### repository
github.com/webpack/webpack 


### homepage
github.com/webpack/webpack 


## default readme

# webpack

Webpack is a module bundler. Its main purpose is to bundle JavaScript files
for usage in a browser, yet it is also capable of transforming, bundling, or
packaging just about any resource or asset.

## Table of Contents

  1. Install
  2. Introduction
  3. Concepts
  4. Contributing
  5. Support


## Install

Install with npm:


​    
    npm install --save-dev webpack

Install with yarn:


​    
    yarn add webpack --dev

## Introduction

Webpack is a bundler for modules. The main purpose is to bundle JavaScript
files for usage in a browser, yet it is also capable of transforming,
bundling, or packaging just about any resource or asset.

**TL;DR**

  * Bundles [ES Modules](https://www.2ality.com/2014/09/es6-modules-final.html), [CommonJS](http://wiki.commonjs.org/), and [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) modules (even combined).
  * Can create a single bundle or multiple chunks that are asynchronously loaded at runtime (to reduce initial loading time).
  * Dependencies are resolved during compilation, reducing the runtime size.
  * Loaders can preprocess files while compiling, e.g. TypeScript to JavaScript, Handlebars strings to compiled functions, images to Base64, etc.
  * Highly modular plugin system to do whatever else your application requires.

### Get Started

Check out webpack's quick [**Get
Started**](https://webpack.js.org/guides/getting-started) guide and the [other
guides](https://webpack.js.org/guides/).

### Browser Compatibility

Webpack supports all browsers that are
[ES5-compliant](https://kangax.github.io/compat-table/es5/) (IE8 and below are
not supported). Webpack also needs `Promise` for `import()` and
`require.ensure()`. If you want to support older browsers, you will need to
[load a polyfill](https://webpack.js.org/guides/shimming/) before using these
expressions.

## Concepts

### [Plugins](https://webpack.js.org/plugins/)

Webpack has a [rich plugin interface](https://webpack.js.org/plugins/). Most
of the features within webpack itself use this plugin interface. This makes
webpack very **flexible**.

Name | Description  
---|---  
[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) | Extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.  
[compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin) | Prepares compressed versions of assets to serve them with Content-Encoding  
[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) | Simplifies creation of HTML files (`index.html`) to serve your bundles  
[pug-plugin](https://github.com/webdiscus/pug-plugin) | Renders Pug files to HTML, extracts JS and CSS from sources specified directly in Pug.  

### [Loaders](https://webpack.js.org/loaders/)

Webpack enables the use of loaders to preprocess files. This allows you to
bundle **any static resource** way beyond JavaScript. You can easily [write
your own loaders](https://webpack.js.org/api/loaders/) using Node.js.

Loaders are activated by using `loadername!` prefixes in `require()`
statements, or are automatically applied via regex from your webpack
configuration.

#### Files

Name | Status | Install Size | Description  
---|---|---|---  
[val-loader](https://github.com/webpack-contrib/val-loader) | [![val-npm](https://camo.githubusercontent.com/215439951fe0f82380ed33989013f7ae9debec95e4a89a0519dde4a690ab5629/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f76616c2d6c6f616465722e737667)](https://camo.githubusercontent.com/215439951fe0f82380ed33989013f7ae9debec95e4a89a0519dde4a690ab5629/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f76616c2d6c6f616465722e737667) | [![val-size](https://camo.githubusercontent.com/cb4a7a3caa3dfa5ebde604ec225d05427488196f3ae7b63b3b84c2cdaabef080/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d76616c2d6c6f61646572)](https://camo.githubusercontent.com/cb4a7a3caa3dfa5ebde604ec225d05427488196f3ae7b63b3b84c2cdaabef080/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d76616c2d6c6f61646572) | Executes code as module and considers exports as JS code  

#### JSON

Name | Status | Install Size | Description  
---|---|---|---  
[![](https://camo.githubusercontent.com/a34467dd05fc677a55b93dc97edabc578073852babf469b25b000a93ece5e9bd/68747470733a2f2f776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f636f666665657363726970742e737667)](https://github.com/awnist/cson-loader) | [![cson-npm](https://camo.githubusercontent.com/4ec3bdbd8e571e2497ba5eeb39b2ae8e0bec7a09cb5988989699fecdc916fa1c/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f63736f6e2d6c6f616465722e737667)](https://camo.githubusercontent.com/4ec3bdbd8e571e2497ba5eeb39b2ae8e0bec7a09cb5988989699fecdc916fa1c/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f63736f6e2d6c6f616465722e737667) | [![cson-size](https://camo.githubusercontent.com/aa16b86bc97c8b5296a61d7ca3980fcf6b56991a8a85f3b45fda6ca062a32336/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d63736f6e2d6c6f61646572)](https://camo.githubusercontent.com/aa16b86bc97c8b5296a61d7ca3980fcf6b56991a8a85f3b45fda6ca062a32336/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d63736f6e2d6c6f61646572) | Loads and transpiles a CSON file  

#### Transpiling

Name | Status | Install Size | Description  
---|---|---|---  
[![](https://camo.githubusercontent.com/ede64026fa876e19e59577b7a1601229a6fcd7875c29e1a3705569a1e4a8f1af/68747470733a2f2f776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f626162656c2d31302e737667)](https://github.com/babel/babel-loader) | [![babel-npm](https://camo.githubusercontent.com/5a46fd7b957af3aba9e1daecc881fa93662b015acdf7e7eae6a57cad9437afc5/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f626162656c2d6c6f616465722e737667)](https://camo.githubusercontent.com/5a46fd7b957af3aba9e1daecc881fa93662b015acdf7e7eae6a57cad9437afc5/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f626162656c2d6c6f616465722e737667) | [![babel-size](https://camo.githubusercontent.com/795882f17cfbff4f668a221a02686ca289c5b2d762651828c6eb1dc273c015da/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d626162656c2d6c6f61646572)](https://camo.githubusercontent.com/795882f17cfbff4f668a221a02686ca289c5b2d762651828c6eb1dc273c015da/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d626162656c2d6c6f61646572) | Loads ES2015+ code and transpiles to ES5 using [Babel](https://github.com/babel/babel)  
[![](https://raw.githubusercontent.com/microsoft/TypeScript-Website/f407e1ae19e5e990d9901ac8064a32a8cc60edf0/packages/typescriptlang-org/static/branding/ts-logo-128.svg)](https://github.com/TypeStrong/ts-loader) | [![type-npm](https://camo.githubusercontent.com/91ec0f4139a80e15cec401ab8f15993d9ed1f9bee7673c5772439e25048c6663/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f74732d6c6f616465722e737667)](https://camo.githubusercontent.com/91ec0f4139a80e15cec401ab8f15993d9ed1f9bee7673c5772439e25048c6663/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f74732d6c6f616465722e737667) | [![type-size](https://camo.githubusercontent.com/c3f10f6618ebacdd05f49b3cabe1faeef5014684297ccb2c7668085d301a7203/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d74732d6c6f61646572)](https://camo.githubusercontent.com/c3f10f6618ebacdd05f49b3cabe1faeef5014684297ccb2c7668085d301a7203/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d74732d6c6f61646572) | Loads TypeScript like JavaScript  
[![](https://camo.githubusercontent.com/a34467dd05fc677a55b93dc97edabc578073852babf469b25b000a93ece5e9bd/68747470733a2f2f776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f636f666665657363726970742e737667)](https://github.com/webpack-contrib/coffee-loader) | [![coffee-npm](https://camo.githubusercontent.com/284ab86a73d9021933a347052e964afb9734cecdea3ca32d2a0f058cb6592b39/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f636f666665652d6c6f616465722e737667)](https://camo.githubusercontent.com/284ab86a73d9021933a347052e964afb9734cecdea3ca32d2a0f058cb6592b39/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f636f666665652d6c6f616465722e737667) | [![coffee-size](https://camo.githubusercontent.com/6ce9575958ee3cefa2f140fa7f67f8a822109daa29aef9f9762546cfb4ab4985/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d636f666665652d6c6f61646572)](https://camo.githubusercontent.com/6ce9575958ee3cefa2f140fa7f67f8a822109daa29aef9f9762546cfb4ab4985/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d636f666665652d6c6f61646572) | Loads CoffeeScript like JavaScript  

#### Templating

Name | Status | Install Size | Description  
---|---|---|---  
[![](https://camo.githubusercontent.com/231a6856fe56d95e8582e1bb388b5118f6a5745a75e6e56277e610428df7c22b/68747470733a2f2f776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f68746d6c352d322e737667)](https://github.com/webpack-contrib/html-loader) | [![html-npm](https://camo.githubusercontent.com/25daa7e38495bedc1f6227d2de7d0cdc9b7904a503536fbda2bc9fdecbb0bedf/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f68746d6c2d6c6f616465722e737667)](https://camo.githubusercontent.com/25daa7e38495bedc1f6227d2de7d0cdc9b7904a503536fbda2bc9fdecbb0bedf/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f68746d6c2d6c6f616465722e737667) | [![html-size](https://camo.githubusercontent.com/08418d8eeffbe445c3d504e54c3968e41259e621110a967bb3061d83eeb84bdf/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d68746d6c2d6c6f61646572)](https://camo.githubusercontent.com/08418d8eeffbe445c3d504e54c3968e41259e621110a967bb3061d83eeb84bdf/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d68746d6c2d6c6f61646572) | Exports HTML as string, requires references to static resources  
[![](https://camo.githubusercontent.com/2f97fe060fc80d9587cdca6f52b40a22ee6db01d46a233ac6cd0bdb1fb49fb4e/68747470733a2f2f63646e2e7261776769742e636f6d2f7075676a732f7075672d6c6f676f2f6d61737465722f5356472f7075672d66696e616c2d6c6f676f2d5f2d636f6c6f75722d3132382e737667)](https://github.com/pugjs/pug-loader) | [![pug-npm](https://camo.githubusercontent.com/586d941c1b55a8a302c18c9725d884dcac274a83bd2d0d14c64daa76037a66ce/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7075672d6c6f616465722e737667)](https://camo.githubusercontent.com/586d941c1b55a8a302c18c9725d884dcac274a83bd2d0d14c64daa76037a66ce/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7075672d6c6f616465722e737667) | [![pug-size](https://camo.githubusercontent.com/e761bfa298cc176e2a6a32b82a3903425c5dfcfc9b8a21076cf6a10b339f5162/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d7075672d6c6f61646572)](https://camo.githubusercontent.com/e761bfa298cc176e2a6a32b82a3903425c5dfcfc9b8a21076cf6a10b339f5162/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d7075672d6c6f61646572) | Loads Pug templates and returns a function  
[![](https://camo.githubusercontent.com/2f97fe060fc80d9587cdca6f52b40a22ee6db01d46a233ac6cd0bdb1fb49fb4e/68747470733a2f2f63646e2e7261776769742e636f6d2f7075676a732f7075672d6c6f676f2f6d61737465722f5356472f7075672d66696e616c2d6c6f676f2d5f2d636f6c6f75722d3132382e737667)](https://github.com/webdiscus/pug-loader) | [![pug3-npm](https://camo.githubusercontent.com/63136247c0b86fd54f854646dce7520b109514432d1aa4ff1e23e5237700e0a6/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f407765626469736375732f7075672d6c6f616465722e737667)](https://camo.githubusercontent.com/63136247c0b86fd54f854646dce7520b109514432d1aa4ff1e23e5237700e0a6/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f407765626469736375732f7075672d6c6f616465722e737667) | [![pug3-size](https://camo.githubusercontent.com/e61a68c33b79bf4753bd97c2e9839c5ae908bce051d57343ff9247f6a2e707e6/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d407765626469736375732f7075672d6c6f61646572)](https://camo.githubusercontent.com/e61a68c33b79bf4753bd97c2e9839c5ae908bce051d57343ff9247f6a2e707e6/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d407765626469736375732f7075672d6c6f61646572) | Compiles Pug to a function or HTML string, useful for use with Vue, React, Angular  
[![](https://camo.githubusercontent.com/ed73fc33b19d04d484f5ce6034c0e2f0b88cdae310a119c32d97e599a91af435/68747470733a2f2f776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f6d61726b646f776e2e737667)](https://github.com/peerigon/markdown-loader) | [![md-npm](https://camo.githubusercontent.com/17b290f046052afa7a40766d3ed97726f8df40653407199117a8e9408886e50e/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6d61726b646f776e2d6c6f616465722e737667)](https://camo.githubusercontent.com/17b290f046052afa7a40766d3ed97726f8df40653407199117a8e9408886e50e/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6d61726b646f776e2d6c6f616465722e737667) | [![md-size](https://camo.githubusercontent.com/3b635fa8c22092d4dada5a062748910eccfc1e7f2c05d67edae3b3e3cc497692/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d6d61726b646f776e2d6c6f61646572)](https://camo.githubusercontent.com/3b635fa8c22092d4dada5a062748910eccfc1e7f2c05d67edae3b3e3cc497692/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d6d61726b646f776e2d6c6f61646572) | Compiles Markdown to HTML  
[![](https://camo.githubusercontent.com/558e9152d23bbf1688058be8290dc2b85f6a1748f39c2d962feb849346f633c5/68747470733a2f2f706f737468746d6c2e6769746875622e696f2f706f737468746d6c2f6c6f676f2e737667)](https://github.com/posthtml/posthtml-loader) | [![posthtml-npm](https://camo.githubusercontent.com/20bfe742ae24cbdf1fa40c9a4bea2a79008bd9717aad3dff12aa4eddbc45d80a/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f706f737468746d6c2d6c6f616465722e737667)](https://camo.githubusercontent.com/20bfe742ae24cbdf1fa40c9a4bea2a79008bd9717aad3dff12aa4eddbc45d80a/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f706f737468746d6c2d6c6f616465722e737667) | [![posthtml-size](https://camo.githubusercontent.com/870011bdb2c345d6573139968eebee59628001367a862045868acbbcb8d892c7/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d706f737468746d6c2d6c6f61646572)](https://camo.githubusercontent.com/870011bdb2c345d6573139968eebee59628001367a862045868acbbcb8d892c7/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d706f737468746d6c2d6c6f61646572) | Loads and transforms a HTML file using [PostHTML](https://github.com/posthtml/posthtml)  
[![](https://camo.githubusercontent.com/789ff7fff20eb66bc18bab6907cddcb5e1990eec9c4e9e58a51a449fcb6af960/68747470733a2f2f776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f68616e646c65626172732d312e737667)](https://github.com/pcardune/handlebars-loader) | [![hbs-npm](https://camo.githubusercontent.com/49d7322418a1d177c278585696b2ff06d51c86e86fc179af77533e3bb6ad9cf0/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f68616e646c65626172732d6c6f616465722e737667)](https://camo.githubusercontent.com/49d7322418a1d177c278585696b2ff06d51c86e86fc179af77533e3bb6ad9cf0/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f68616e646c65626172732d6c6f616465722e737667) | [![hbs-size](https://camo.githubusercontent.com/947ac098e59ae53f9ba070e5bad9ec401ee955c2f55598fbc2325b0cce24e12e/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d68616e646c65626172732d6c6f61646572)](https://camo.githubusercontent.com/947ac098e59ae53f9ba070e5bad9ec401ee955c2f55598fbc2325b0cce24e12e/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d68616e646c65626172732d6c6f61646572) | Compiles Handlebars to HTML  

#### Styling

Name | Status | Install Size | Description  
---|---|---|---  
[`<style>`](https://github.com/webpack-contrib/style-loader) | [![style-npm](https://camo.githubusercontent.com/7e8cf9ff0aa0b32d3f5d0988938c42a58dcfba276a823c755a6fcbc83f235fc4/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7374796c652d6c6f616465722e737667)](https://camo.githubusercontent.com/7e8cf9ff0aa0b32d3f5d0988938c42a58dcfba276a823c755a6fcbc83f235fc4/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7374796c652d6c6f616465722e737667) | [![style-size](https://camo.githubusercontent.com/22dae6e5b50825a0461dbc50601923566b7cc3b7338ba65ed35d0c8adabb9a12/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d7374796c652d6c6f61646572)](https://camo.githubusercontent.com/22dae6e5b50825a0461dbc50601923566b7cc3b7338ba65ed35d0c8adabb9a12/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d7374796c652d6c6f61646572) | Add exports of a module as style to DOM  
[![](https://camo.githubusercontent.com/9d08be3d87c3a30d784c9f5cf676a12b71940880daae956533d51b7427859e18/68747470733a2f2f776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f6373732d332e737667)](https://github.com/webpack-contrib/css-loader) | [![css-npm](https://camo.githubusercontent.com/04f35cb0757c4831260560931acdff134731fc1c5a9f73d2f07db99e335c283c/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6373732d6c6f616465722e737667)](https://camo.githubusercontent.com/04f35cb0757c4831260560931acdff134731fc1c5a9f73d2f07db99e335c283c/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6373732d6c6f616465722e737667) | [![css-size](https://camo.githubusercontent.com/984e6055c731b42240b603955f4337abf56a3f990a5de2b92036e6ac66b6ee49/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d6373732d6c6f61646572)](https://camo.githubusercontent.com/984e6055c731b42240b603955f4337abf56a3f990a5de2b92036e6ac66b6ee49/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d6373732d6c6f61646572) | Loads CSS file with resolved imports and returns CSS code  
[![](https://camo.githubusercontent.com/b7dc60c792379111d5f08f313e963cb3b39c1c9593c8f957d2eb9967f75f3488/68747470733a2f2f776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f6c6573732d36332e737667)](https://github.com/webpack-contrib/less-loader) | [![less-npm](https://camo.githubusercontent.com/350dedbf74e5f13c9c764b6221ed32d95764d6d64b764165b50b0a2690880b65/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6c6573732d6c6f616465722e737667)](https://camo.githubusercontent.com/350dedbf74e5f13c9c764b6221ed32d95764d6d64b764165b50b0a2690880b65/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6c6573732d6c6f616465722e737667) | [![less-size](https://camo.githubusercontent.com/97e0761f3e3e4f5305d43eeb21aa87e5d458cc7deae537c9644dd6bf056f8d9f/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d6c6573732d6c6f61646572)](https://camo.githubusercontent.com/97e0761f3e3e4f5305d43eeb21aa87e5d458cc7deae537c9644dd6bf056f8d9f/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d6c6573732d6c6f61646572) | Loads and compiles a LESS file  
[![](https://camo.githubusercontent.com/bbf525b64d25de2bc0cd8fca2b21875a538b64f8e8d37f2ee9bfd9817df5a267/68747470733a2f2f776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f736173732d312e737667)](https://github.com/webpack-contrib/sass-loader) | [![sass-npm](https://camo.githubusercontent.com/91faedaf94c51793a58adeccfc92da42ecfdb312ce219fe602b45a6a4f4ebccb/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f736173732d6c6f616465722e737667)](https://camo.githubusercontent.com/91faedaf94c51793a58adeccfc92da42ecfdb312ce219fe602b45a6a4f4ebccb/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f736173732d6c6f616465722e737667) | [![sass-size](https://camo.githubusercontent.com/0ab7815d4ab338b51027a8b5cbe1ab7cb60f7b3c963c5f8e76c82a3bcc089d26/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d736173732d6c6f61646572)](https://camo.githubusercontent.com/0ab7815d4ab338b51027a8b5cbe1ab7cb60f7b3c963c5f8e76c82a3bcc089d26/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d736173732d6c6f61646572) | Loads and compiles a Sass/SCSS file  
[![](https://camo.githubusercontent.com/bb54ae8780a5f5dd106459fa8a7a03bf163a080555f246a6e71e138b8bb1273e/68747470733a2f2f776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f7374796c75732e737667)](https://github.com/shama/stylus-loader) | [![stylus-npm](https://camo.githubusercontent.com/e0f1b9c43ae299a241e3f1e3069ae7d5c2539654d066a2f691643fed10d89386/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7374796c75732d6c6f616465722e737667)](https://camo.githubusercontent.com/e0f1b9c43ae299a241e3f1e3069ae7d5c2539654d066a2f691643fed10d89386/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7374796c75732d6c6f616465722e737667) | [![stylus-size](https://camo.githubusercontent.com/971519653815e80eb636efc9dd56b7f95787ed455417529db82359cca6f6612c/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d7374796c75732d6c6f61646572)](https://camo.githubusercontent.com/971519653815e80eb636efc9dd56b7f95787ed455417529db82359cca6f6612c/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d7374796c75732d6c6f61646572) | Loads and compiles a Stylus file  
[![](https://camo.githubusercontent.com/a24ae8bfcb1712d70a205a1406d3c3a7bd0d46fb1af8b7d7bd3c37f4dd9bfe71/68747470733a2f2f776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f706f73746373732e737667)](https://github.com/postcss/postcss-loader) | [![postcss-npm](https://camo.githubusercontent.com/514e245adf0b3746317d88420ea660728d5a184f0baacbb0444139df81c56722/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f706f73746373732d6c6f616465722e737667)](https://camo.githubusercontent.com/514e245adf0b3746317d88420ea660728d5a184f0baacbb0444139df81c56722/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f706f73746373732d6c6f616465722e737667) | [![postcss-size](https://camo.githubusercontent.com/b6486623f8c0e8a3dbf937ed3f6ca47bcf19fecf4950b82a550ce13ccc29574b/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d706f73746373732d6c6f61646572)](https://camo.githubusercontent.com/b6486623f8c0e8a3dbf937ed3f6ca47bcf19fecf4950b82a550ce13ccc29574b/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d706f73746373732d6c6f61646572) | Loads and transforms a CSS/SSS file using [PostCSS](https://postcss.org)  

#### Frameworks

Name | Status | Install Size | Description  
---|---|---|---  
[![](https://camo.githubusercontent.com/32fa06f422484eb75a34e8426467c7257c67a97481d31cef279d28b085fd3fa5/68747470733a2f2f776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f7675652d392e737667)](https://github.com/vuejs/vue-loader) | [![vue-npm](https://camo.githubusercontent.com/dad5c852c813fda4369cca4afa9ace7f69c8bf9acddfb339fed7c5835f93c0da/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7675652d6c6f616465722e737667)](https://camo.githubusercontent.com/dad5c852c813fda4369cca4afa9ace7f69c8bf9acddfb339fed7c5835f93c0da/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7675652d6c6f616465722e737667) | [![vue-size](https://camo.githubusercontent.com/5e2435b2f79e6189584035e9f323d260be37cabc805f41d5bdbac20ef31a501f/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d7675652d6c6f61646572)](https://camo.githubusercontent.com/5e2435b2f79e6189584035e9f323d260be37cabc805f41d5bdbac20ef31a501f/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d7675652d6c6f61646572) | Loads and compiles Vue Components  
[![](https://camo.githubusercontent.com/104a30b15b21a163cbc27a9abd6d8d673c5f24a25a3bdc22dc791f9b545344db/68747470733a2f2f776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f706f6c796d65722e737667)](https://github.com/webpack-contrib/polymer-webpack-loader) | [![polymer-npm](https://camo.githubusercontent.com/6a9175fa4ef59a1400495254ff4977dc4ef5c4b47e748b42a931930242b41def/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f706f6c796d65722d7765627061636b2d6c6f616465722e737667)](https://camo.githubusercontent.com/6a9175fa4ef59a1400495254ff4977dc4ef5c4b47e748b42a931930242b41def/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f706f6c796d65722d7765627061636b2d6c6f616465722e737667) | [![polymer-size](https://camo.githubusercontent.com/da520e2a5a19e6b9635d6d4a05fd340050f480fbca4d34d0ed08a5ecb306d9dc/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d706f6c796d65722d7765627061636b2d6c6f61646572)](https://camo.githubusercontent.com/da520e2a5a19e6b9635d6d4a05fd340050f480fbca4d34d0ed08a5ecb306d9dc/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d706f6c796d65722d7765627061636b2d6c6f61646572) | Process HTML & CSS with preprocessor of choice and `require()` Web Components like first-class modules  
[![](https://camo.githubusercontent.com/7119d53d5e27c6dfcab4c2760bf9a16ee37d2474a7186326892e6e2a6c284f87/68747470733a2f2f776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f616e67756c61722d69636f6e2d312e737667)](https://github.com/TheLarkInn/angular2-template-loader) | [![angular-npm](https://camo.githubusercontent.com/934cac8b7cac22bfad971691c8e64b2d28d8f62209e8720e8f4032de0ccd1e3d/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f616e67756c6172322d74656d706c6174652d6c6f616465722e737667)](https://camo.githubusercontent.com/934cac8b7cac22bfad971691c8e64b2d28d8f62209e8720e8f4032de0ccd1e3d/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f616e67756c6172322d74656d706c6174652d6c6f616465722e737667) | [![angular-size](https://camo.githubusercontent.com/1ed9869b9362bf20f04d3f5d92e1dc4faa84435b2915deb648f9e676c5240017/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d616e67756c6172322d74656d706c6174652d6c6f61646572)](https://camo.githubusercontent.com/1ed9869b9362bf20f04d3f5d92e1dc4faa84435b2915deb648f9e676c5240017/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d616e67756c6172322d74656d706c6174652d6c6f61646572) | Loads and compiles Angular 2 Components  
[![](https://camo.githubusercontent.com/ace7c2a6eb9b03ba209a66c7ebf8ba50fe28483c1bd5cbeb447a79b87373725c/68747470733a2f2f776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f72696f742e737667)](https://github.com/riot/webpack-loader) | [![riot-npm](https://camo.githubusercontent.com/494aee811b4f42b14e5e733bb964d9d08f55ecedba6a3cbf2dc9fa047bf3cd80/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f72696f742d7461672d6c6f616465722e737667)](https://camo.githubusercontent.com/494aee811b4f42b14e5e733bb964d9d08f55ecedba6a3cbf2dc9fa047bf3cd80/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f72696f742d7461672d6c6f616465722e737667) | [![riot-size](https://camo.githubusercontent.com/ef987644e75db583aa74fd6a1385fce389e1f7850039eef4ca77afe84309efc4/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d72696f742d7461672d6c6f61646572)](https://camo.githubusercontent.com/ef987644e75db583aa74fd6a1385fce389e1f7850039eef4ca77afe84309efc4/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d72696f742d7461672d6c6f61646572) | Riot official webpack loader  
[![](https://camo.githubusercontent.com/f15ecc909a3f62a49ded8cb772760a038c1a44b4ead2f400458852ed97e8b2b0/68747470733a2f2f776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f7376656c74652d312e737667)](https://github.com/sveltejs/svelte-loader) | [![svelte-npm](https://camo.githubusercontent.com/5274bc10932f5dee62481e653666e23fc0e94c398e446e34aad7911ecd034847/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7376656c74652d6c6f616465722e737667)](https://camo.githubusercontent.com/5274bc10932f5dee62481e653666e23fc0e94c398e446e34aad7911ecd034847/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7376656c74652d6c6f616465722e737667) | [![svelte-size](https://camo.githubusercontent.com/c09187ba94c89cbadcd8ec22dfa501bc851118ce88a3ce25d91066acfb9b7dcb/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d7376656c74652d6c6f61646572)](https://camo.githubusercontent.com/c09187ba94c89cbadcd8ec22dfa501bc851118ce88a3ce25d91066acfb9b7dcb/68747470733a2f2f7061636b61676570686f6269612e636f6d2f62616467653f703d7376656c74652d6c6f61646572) | Official Svelte loader  

### Performance

Webpack uses async I/O and has multiple caching levels. This makes webpack
fast and incredibly **fast** on incremental compilations.

### Module Formats

Webpack supports ES2015+, CommonJS and AMD modules **out of the box**. It
performs clever static analysis on the AST of your code. It even has an
evaluation engine to evaluate simple expressions. This allows you to **support
most existing libraries** out of the box.

### [Code Splitting](https://webpack.js.org/guides/code-splitting/)

Webpack allows you to split your codebase into multiple chunks. Chunks are
loaded asynchronously at runtime. This reduces the initial loading time.

### [Optimizations](https://webpack.js.org/guides/production-build/)

Webpack can do many optimizations to **reduce the output size of your
JavaScript** by deduplicating frequently used modules, minifying, and giving
you full control of what is loaded initially and what is loaded at runtime
through code splitting. It can also make your code chunks **cache friendly**
by using hashes.

## Contributing

**We want contributing to webpack to be fun, enjoyable, and educational for
anyone, and everyone.** We have a [vibrant
ecosystem](https://medium.com/webpack/contributors-guide/home) that spans
beyond this single repo. We welcome you to check out any of the repositories
in [our organization](https://github.com/webpack) or [webpack-contrib
organization](https://github.com/webpack-contrib) which houses all of our
loaders and plugins.

Contributions go far beyond pull requests and commits. Although we love giving
you the opportunity to put your stamp on webpack, we also are thrilled to
receive a variety of other contributions including:

  * [Documentation](https://github.com/webpack/webpack.js.org) updates, enhancements, designs, or bugfixes
  * Spelling or grammar fixes
  * README.md corrections or redesigns
  * Adding unit, or functional tests
  * Triaging GitHub issues -- especially determining whether an issue still persists or is reproducible.
  * [Searching #webpack on twitter](https://twitter.com/search?q=webpack) and helping someone else who needs help
  * Teaching others how to contribute to one of the many webpack's repos!
  * [Blogging, speaking about, or creating tutorials](https://github.com/webpack-contrib/awesome-webpack) about one of webpack's many features.
  * Helping others in our webpack [gitter channel](https://gitter.im/webpack/webpack).

To get started have a look at our [documentation on
contributing](https://github.com/webpack/webpack/blob/main/CONTRIBUTING.md).

If you are worried or don't know where to start, you can **always** reach out
to [Sean Larkin (@TheLarkInn) on Twitter](https://twitter.com/thelarkinn) or
simply submit an issue and a maintainer can help give you guidance!

We have also started a series on our [Medium
Publication](https://medium.com/webpack) called [The Contributor's Guide to
webpack](https://medium.com/webpack/contributors-guide/home). We welcome you
to read it and post any questions or responses if you still need help.

_Looking to speak about webpack?_ We'd **love** to review your talk
abstract/CFP! You can email it to webpack [at] opencollective [dot] com and we
can give pointers or tips!!!

### Creating your own plugins and loaders

If you create a loader or plugin, we would <3 for you to open source it, and
put it on npm. We follow the `x-loader`, `x-webpack-plugin` naming convention.

## Support

We consider webpack to be a low-level tool used not only individually but also
layered beneath other awesome tools. Because of its flexibility, webpack isn't
always the _easiest_ entry-level solution, however we do believe it is the
most powerful. That said, we're always looking for ways to improve and
simplify the tool without compromising functionality. If you have any ideas on
ways to accomplish this, we're all ears!

If you're just getting started, take a look at [our new docs and concepts
page](https://webpack.js.org/concepts/). This has a high level overview that
is great for beginners!!

Looking for webpack 1 docs? Please check out the old
[wiki](https://github.com/webpack/docs/wiki/contents), but note that this
deprecated version is no longer supported.

If you want to discuss something or just need help, [here is our Gitter
room](https://gitter.im/webpack/webpack) where there are always individuals
looking to help out!

If you are still having difficulty, we would love for you to post a question
to [StackOverflow with the webpack
tag](https://stackoverflow.com/tags/webpack). It is much easier to answer
questions that include your webpack.config.js and relevant files! So if you
can provide them, we'd be extremely grateful (and more likely to help you find
the answer!)

If you are twitter savvy you can tweet #webpack with your question and someone
should be able to reach out and help also.

If you have discovered a 🐜 or have a feature suggestion, feel free to create
an issue on GitHub.

### License

[![FOSSA
Status](https://camo.githubusercontent.com/6c6614ada8deeda352b2927d0769d9a5cefb589102a18bad534ab3c8d9984973/68747470733a2f2f6170702e666f7373612e696f2f6170692f70726f6a656374732f67697425324268747470732533412532462532466769746875622e636f6d2532467765627061636b2532467765627061636b2e7376673f747970653d6c61726765)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fwebpack%2Fwebpack?ref=badge_large)

