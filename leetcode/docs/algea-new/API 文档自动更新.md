# API 文档自动更新说明

很多时候代码改动，文档没有及时更新，需要单独花时间修改文档，比较麻烦，所以改成自动更新文档

调研：第三方库有 jsdoc 和 jsdoc-to-markdown，可以转换成 HTML（直接部署） 或者 Markdown 的文档

## 自动更新原理

使用第三方的库 jsdoc-to-markdown (https://github.com/jsdoc2md/jsdoc-to-markdown) 自动把代码中的注释，转换成 API 文档。

## 操作步骤

0、在 JS 代码中增加标准的注释（函数或者类注释）

1、切换到 api 分支，npm install 安装依赖。

2、执行 npm run build-api 创建新文档。如果提示错误，可能是注释或代码不规范不正确，根据提示信息修改即可。

3、手动调整：删除不需要的前面部分（目录），加上需要的说明。

## 注意事项

注意1：如果是全局 API，直接执行即可。如果是类中的静态函数或者实例函数的 API，需要在类名前增加注释，这样才能获取到函数。

~~~js
/**
 * Student class
 */
class Student {
  // 这样类中的注释才能被读取到
}
~~~

注意2：可能个别的函数顺序不正确，需要手动调整。

注意3：脚本

~~~js
"build-api": "./node_modules/jsdoc-to-markdown/bin/cli.js ./src/index.js > index.md",
~~~

示范代码
~~~js
/**
* HelloWorld类存储一位客人的名字，并打招呼。
*/
class HelloWorld {
 
  constructor(){
    this.firstName = '';
    this.lastName = '';
  }
  
  /**
  * 设置客人的姓名
  * @param {String} lastName 姓
  * @param {String} firstName 名
  */
  setName(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  /**
  * 获取客人的全名
  *
  * @return {String} 客人的姓名
  */
  getFullName(){
    return this.firstName + ' ' + this.lastName;
  }
  
  /**
  * 向客人打招呼
  *
  */
  sayHello(){
    console.log('Hello, ' + this.getFullName());
  }

  /**
  * 向客人打招呼
  *
  */
  sayHi(){
    console.log('Hi, ' + this.getFullName());
  }
}

~~~