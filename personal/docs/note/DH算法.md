# DH算法

DH 算法(Diffie-Hellman) 是一种密钥交换协议，它可以让双方在不泄漏密钥的情况下协商出一个密钥来。

DH算法基于数学原理，比如小明和小红想要协商一个密钥，可以这么做：

小明先选一个素数和一个底数，例如，素数p=23，底数g=5（底数可以任选），再选择一个秘密整数a=6，计算A=g^a mod p=8，告诉小红：p=23，g=5，A=8；

小红收到小明发来的p，g，A后，也选一个秘密整数b=15，然后计算B=g^b mod p=19，告诉小明：B=19；

小明自己计算出s=B^a mod p=2，小红也自己计算出s=A^b mod p=2，因此，最终协商的密钥s为2。

在这个过程中，密钥2并不是小明告诉小红的，也不是小红告诉小明的，而是双方协商计算出来的。第三方只能知道p=23，g=5，A=8，B=19，由于不知道双方选的秘密整数a=6和b=15，因此无法计算出密钥2。

简化的原理：私钥是 x, y，公钥是 `g^{x*y}(mod p)`

DH 算法是一个不安全的秘钥共享网络协议，无法避免中间人攻击。

用 nodejs crypto 模块，实现DH算法如下：

~~~js
const crypto = require('crypto');

// xiaoming's keys:
var ming = crypto.createDiffieHellman(512);
var ming_keys = ming.generateKeys();

var prime = ming.getPrime();
var generator = ming.getGenerator();

console.log('Prime: ' + prime.toString('hex'));
console.log('Generator: ' + generator.toString('hex'));

// xiaohong's keys:
var hong = crypto.createDiffieHellman(prime, generator);
var hong_keys = hong.generateKeys();

// exchange and generate secret:
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);

// print secret:
console.log('Secret of Xiao Ming: ' + ming_secret.toString('hex'));
console.log('Secret of Xiao Hong: ' + hong_secret.toString('hex'));
~~~

运行后，可以得到如下输出：

~~~bash
$ node dh.js 
Prime: a8224c...deead3
Generator: 02
Secret of Xiao Ming: 695308...d519be
Secret of Xiao Hong: 695308...d519be
~~~

注意每次输出都不一样，因为素数的选择是随机的。

## 参考链接

https://www.liaoxuefeng.com/wiki/1022910821149312/1023025778520640

https://www.zhihu.com/question/274142856
