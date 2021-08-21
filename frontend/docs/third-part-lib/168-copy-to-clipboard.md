# 168 copy-to-clipboard

## 用途

拷贝文本到剪切板上（兼容不同浏览器）

## 可靠性

下载量上万，和其他库基本没有冲突，放心使用

## 官网链接

https://www.npmjs.com/package/copy-to-clipboard

https://github.com/sudodoki/copy-to-clipboard#readme

## 基本使用

```js
import copy from 'copy-to-clipboard';

copy('Text');

// Copy with options
copy('Text', {
  debug: true,
  message: 'Press #{key} to copy',
});
```

## 其他
