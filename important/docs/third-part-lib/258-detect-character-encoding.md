# 258 detect-character-encoding

## 用途

Detect character encoding using ICU

## 可靠性

73星星，下载 2000，尽量不使用

## 官网链接

https://github.com/sonicdoe/detect-character-encoding

## 基本使用

```js
const fs = require('fs');
const detectCharacterEncoding = require('detect-character-encoding');

const fileBuffer = fs.readFileSync('file.txt');
const charsetMatch = detectCharacterEncoding(fileBuffer);

console.log(charsetMatch);
// {
//   encoding: 'UTF-8',
//   confidence: 60
// }
```

## 其他
