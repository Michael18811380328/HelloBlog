// demo 01
// 单一职责原则：一个函数或者一个组件做好一件事情
// 开放封闭原则：对新扩展开放，对修改封闭
// 下面是不好的例子
let checkType = function(str, type) {
  let reg;
  switch (type) {
    case 'email':
      reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-])+$/;
      break;
    case 'mobile':
      reg = /^1[3|4|5|7|8][0-9]{9}$/;
      break;
    case 'tel':
      reg = /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/;
      break;
    default:
      return true;
    return reg.test(str);
  }
}

// 这个函数可以判断输入的字符串是否满足正则表达式
// 不足之处：
// 1、如果需要新增加一个类别，那么需要改变函数内部结构（违反了开放封闭原则）
// 2、如果某一个组件只需要判断一个类型，那么其他类型是多余的（造成不必要的开销）

// 建议的方法是，给这个API增加一个扩展接口
let checkType = (function() {
  let rules = {
    email(str) {
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    },
    mobile(str) {
      return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
    }
  };
  return {
    check(str, type) {
      return rules[type] ? rules[type](str) : false;
    },
    addRule(type, fn) {
      rules[type] = fn;
    }
  }
})();

checkType.addRule('money',function (str) {
  return /^[0-9]+(.[0-9]{2})?$/.test(str);
});
console.log(checkType.check('18.36','money'));

// 下面是23种设计模式：代码看的多了才能感受到不同的设计模式的具体使用。
// 学习了设计模式，自己要尝试去使用。
