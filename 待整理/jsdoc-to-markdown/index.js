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
  *
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

  sayHi(){
    console.log('Hi, ' + this.getFullName());
  }
}
