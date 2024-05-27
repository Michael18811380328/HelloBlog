# 第 1 章 对象和面向对象

## 1.1 For...in...

Var json = {“aaa”: 1,“bbb”: 2,“ccc”: 3,“ddd”: 4}

for(var key in json){

//key 代表 aaa,bbb.....等

//json[key]代表 1,2,3....等

}

# 第 2 章数组高级 API

## 2.1 学习 API 的方法

### 2.1.1 侧重点（四点）

调用者：谁调用的。 参数：有无，几个。

返回值：有无，什么类型。 功能：干什么用的。

## 2.2 Array 的内置方法

### 2.2.1 判断数组和转换数组。

Instanceof: 是一个关键字。 判断 A 是否是 B 类型。

布尔类型值 = A Instanceof B ;

Array.isArray() //HTML5 中新增 判断是不是数组

布尔类型值 = Array.isArray(变量) ;

调用者：Array 参数：变量(被检测值) 返回值：布尔类型

toString() //把数组转换成字符串，每一项用,分割

字符串 = 数组.toString();

valueOf() //返回数组对象本身

数组本身 = 数组.valueOf();

Join //根据每个字符把数组元素连起来变成字符串

字符串 = 数组.join(变量);

变量可以有可以没有。不写默认用逗号分隔，无缝连接用空字符串。

### 2.2.2 数组增删和换位置

push() //在数组最后面插入项，返回数组的长度

数组 1 改后的长度 = 数组 1.push(元素 1);

pop() //取出数组中的最后一项，返回最后一项

被删除的元素 = 数组 1.pop();

unshift() //在数组最前面插入项，返回数组的长度

数组 1 改后的长度 = 数组 1.unshift(元素 1);

shift() //取出数组中的第一个元素，返回最后一项

被删除的元素 = 数组 1.shift();

reverse() //翻转数组（原数组讲呗反转，返回值也是被反转后的数组）

反转后的数组 = 数组 1.reverse();

sort(); //给数组排序，返回排序后的数组。如何排序看参数。

从小到大排序后的数组 = 数组 1.sort(function(a,b){

​ return a-b;

});

无参：按照数组元素的首字符对应的 Unicode 编码值从小到大排列数组元素。

带参：必须为函数（回调函数--callback）。函数中带有两个参数，代表数组中的 前后元素。如果计算后（a-b），返回值为负数，a 排 b 前面。等于 0 不动。 返回值为正数，a 排 b 后面。

### 2.2.3 了解方法

concat() //把参数拼接到当前数组

新数组 = 数组 1.concat(数组 2);

slice() //从当前数组中截取一个新的数组，不影响原来的数组，参数 start 从 0 开始,end 从 1 开始

新数组 = 数组 1.slice(索引 1，索引 2);

splice()//删除或替换当前数组的某些项目，参数 start,deleteCount,options(要替换的项目)

新数组 = 数组 1.splice(起始索引，结束索引，替换内容);

indexOf()、lastIndexOf() //如果没找到返回-1

索引值 = 数组.indexOf/lastIndexOf(数组中的元素);

迭代方法 不会修改原数组

every()、filter()、forEach()、map()、some()

数组/boolean/无 = 数组.every/filter/forEach/map/some(

​ function(element,index,arr){

​ 程序和返回值；

}

);

//对数组中每一项运行以下函数，如果都返回 true，every 返回 true，如果有一项返回 false，则停止遍历 every 返回 false；不写默认返回 false

array.every(function(item,index,arr) {

})

//对数组中每一项运行以下函数，该函数返回结果是 true 的项组成的新数组
var arr = array.filter(function(item,index,arr) {
});
console.log(arr);

//遍历数组
array.forEach(function(item,index,arr){
});

//对数组中每一项运行以下函数，返回该函数的结果组成的新数组
var arr = array.map(function(item,index,arr) {
return "\"" + item + "\"";
})

//对数组中每一项运行以下函数，如果该函数对某一项返回 true，则 some 返回 true
var b = array.some(function(item,index,arr) {
if (item == "ww") {
return true;
}
return false;
});

### 2.2.5 练习

1.将一个字符串数组输出为|分割的形式，比如“刘备|张飞|关羽”。使用两种方式实现

2.将一个字符串数组的元素的顺序进行反转。["a","b","c","d"] à["d","c","b","a"]。使用两种种方式实现。提示：第 i 个和第 length-i-1 个进行交换

3.找到数组中每个字母出现的次数["c","a","z","a","a"]

4.工资的数组[1500,1200,2000,2100,1800],把工资超过 2000 的删除
