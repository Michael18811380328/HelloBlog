# 270 uuid

## 用途

For the creation of RFC4122 UUIDs

## 可靠性

10000 星星

适应于浏览器或者服务器

## 官网链接

https://www.npmjs.com/package/uuid

https://github.com/uuidjs/uuid

## 基本使用

```js
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```

## 其他

可以生成不同类型的 ID

uuid.NIL	The nil UUID string (all zeros)	New in uuid@8.3

uuid.parse()	Convert UUID string to array of bytes	New in uuid@8.3

uuid.stringify()	Convert array of bytes to UUID string	New in uuid@8.3

uuid.v1()	Create a version 1 (timestamp) UUID	

uuid.v3()	Create a version 3 (namespace w/ MD5) UUID	

uuid.v4()	Create a version 4 (random) UUID	

uuid.v5()	Create a version 5 (namespace w/ SHA-1) UUID	

uuid.validate()	Test a string to see if it is a valid UUID	New in uuid@8.3

uuid.version()	Detect RFC version of a UUID	New in uuid@8.3
