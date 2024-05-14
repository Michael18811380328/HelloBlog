# crypto-js

JavaScript library of crypto standards. 加密库

## Install

```bash
npm install crypto-js
```

### Usage

```js
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
...
console.log(SHA256("Message"));
```

Including all libraries, for access to extra methods:

```js
var CryptoJS = require("crypto-js");
console.log(CryptoJS.HmacSHA1("Message", "Key"));
```

### Browser Usage

Modular include:

```js
require.config({
    packages: [
        {
            name: 'crypto-js',
            location: 'path-to/bower_components/crypto-js',
            main: 'index'
        }
    ]
});
 
require(["crypto-js/aes", "crypto-js/sha256"], function (AES, SHA256) {
    console.log(SHA256("Message"));
});
```

Including all libraries, for access to extra methods:

```js
// Above-mentioned will work or use this simple form
require.config({
    paths: {
        'crypto-js': 'path-to/bower_components/crypto-js/crypto-js'
    }
});
 
require(["crypto-js"], function (CryptoJS) {
    console.log(CryptoJS.HmacSHA1("Message", "Key"));
});
```

### Usage without RequireJS

```html
<script type="text/javascript" src="path-to/bower_components/crypto-js/crypto-js.js"></script>
<script type="text/javascript">
    var encrypted = CryptoJS.AES(...);
    var encrypted = CryptoJS.SHA256(...);
</script> 
```

## API

See: https://code.google.com/p/crypto-js

### AES Encryption

#### Plain text encryption

```js
var CryptoJS = require("crypto-js");
 
// Encrypt
var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
 
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
var plaintext = bytes.toString(CryptoJS.enc.Utf8);
 
console.log(plaintext);
```

#### Object encryption

```js
var CryptoJS = require("crypto-js");
 
var data = [{id: 1}, {id: 2}]
 
// Encrypt
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123');
 
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
 
console.log(decryptedData);
```

## 案例

最近在使用Cookies加密保存数据的时候，接触到crypto，使用还算简单，在这里记录一下。

可以在这个GitHub的https://github.com/brix/crypto-js上下载该js，它可以单独引入所需要加密方式的js；也可以引入一个crypto-js.js 这个文件，它相当于引入了所有的加密方式，我使用的就是后者一次引入所有的加密文件，这个文件也不是很大，还可以接受。

因为我的需求是加密可逆，具有一定的安全性(对安全性要求并不是特别高)，所以使用DES或AES即可，我用的是AES：

```js
function getAesString(data,key,iv){//加密
  var key = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);
  var encrypted = CryptoJS.AES.encrypt(data,key, {
    iv:iv,
    mode:CryptoJS.mode.CBC,
    padding:CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();    //返回的是base64格式的密文
}

function getDAesString(encrypted,key,iv){//解密
  var key = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);
  var decrypted = CryptoJS.AES.decrypt(encrypted,key, {
    iv:iv,
    mode:CryptoJS.mode.CBC,
    padding:CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);     
}

function getAES(data){ //加密
  var key  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';  //密钥
  var iv   = '1234567812345678';
  var encrypted =getAesString(data,key,iv); //密文
  var encrypted1 =CryptoJS.enc.Utf8.parse(encrypted);
  return encrypted;
}

function getDAes(data){//解密
  var key  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';  //密钥
  var iv   = '1234567812345678';
  var decryptedStr =getDAesString(data,key,iv);
  return decryptedStr;
}
```

key和iv我们都可以更换，但是需要保证的是加解密的key和iv保持一致
