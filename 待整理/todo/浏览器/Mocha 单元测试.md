## Mocha 单元测试

阮一峰笔记 2019-3-16

### 0、说明

Mocha可以在**浏览器环境**或者**Node环境**中进行单元测试，适应于**JS**测试。主要目的是测试单个函数的运行情况，确保大项目的正确运行。单元测试属于黑盒测试（函数的原理还需要进行白盒测试）。测试的结果最好验证数据类型和数值是否符合要求。在seafile-js 中主要测试请求-响应是否符合需要。

### 1、安装

~~~bash
git clone https://github.com/ruanyf/mocha-demos.git
cd mocha-demos
npm install

npm install --global mocha
# 全局安装测试
~~~

### 2、测试脚本

测试脚本：用来测试源代码的脚本（测试 = 源代码+测试脚本）

~~~js
// add.js
function add(x, y) {
  return x + y;
}
module.exports = add;
~~~

通常情况下，测试脚本需要与原始文件名相同，后缀为 .test.js

~~~js
// add.test.js
var add = require('./add.js');
var expect = require('chai').expect;

// descrie 测试套件——一组相关的测试，是一个函数。第一个参数是测试的名称（字符串），第二个参数是测试的函数（实际执行）
describe('add function', function(){
  // it 测试用例 一个单独的测试，是单元测试的最小单位。两个参数：第一个是名称，第二个是实际的执行函数
  if('1+1', function(){
    expect(add(1, 1).to.be.equal(2);
  });
});

~~~

### 3、断言库

断言库：判断源码执行结果和预期结果是否一致，如果不一致抛出错误。

一个测试用例（it）可以有多个断言。Mocha 需要引入外部的断言库 chai。

如果一个测试用例中没有断言，那么函数执行不会报错，测试会通过。

~~~js
var expect = require('chai').expect;
~~~

~~~js
// 相等
expect(4, 5).to.be.not.equal(10);
expect(foo).to.be.deep.equal({bar: 'bar'});

// 布尔值 true
expect('Mike').to.be.ok;

// 数据类型
expect({foo, 'foo'}).to.be.an('object');
expect(foo).to.be.an.instanceof(Foo);

// 包含
expect([1,2,3]).to.include(2);
expect('foobae').to.contain('foo');

// 匹配正则表达式
expect('foolbar').to.match(/^foo/);

// 头部是expect方法，尾部是断言方法 equal a ok match include contain
~~~

#### 4、Mocha 单元测试

~~~bash
mocha add.test.js
# 通常情况下回自动查找test文件
mocha
mocha file1 file2 file3
# 单元测试默认会执行下面一层的测试用例，深层的单元测试不会继续执行

mocha --recursive 
# 测试子目录下面的全部测试用例
~~~

### 5、测试文件通配符

~~~bash
mocha spec/{my, awesome}.js
# 执行 my.js 和 awesome.js 
# 这部分功能在小型单元测试中不会使用（只有一个测试文件）
~~~

### 6、命令行参数

~~~bash
mocha --help
mocha --reporter spec
# 测试的格式是默认的spec

npm install --save-dev mochawesome
mocha --reporter mochawesome
# 测试结果的格式的HTML形式

mocha --growl 
# 测试结果显示在桌面

mocha --watch
# 监视模式（测试脚本变化后，自动运行Mocha测试）

mocha --bail 
# 暂停模式（如果一个测试不通过，后面的测试终止运行）

mocha --grep "1+1"
# 选择性测试 只测试测试用例中包含这个字符串的测试
~~~

#### 7、配置文件

~~~js
--reporter tap
--resursive
--growl
// mocha.opts
~~~

将第六条中的命令行参数单独放在一个文件中，执行mocha会自动检测配置文件

### 8、ES6测试

需要将 ES6 或 coffeeScript TypeScript 转换成为 ES5才能进行测试