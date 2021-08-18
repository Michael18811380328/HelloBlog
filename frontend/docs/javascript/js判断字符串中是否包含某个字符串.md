# js 判断字符串中是否包含某个字符 

通常我们需要判断某个字符串，是否含有某个字符或者子字符串，可以使用下面几个方法实现。

### 方法一: indexOf()  

~~~js
string.indexOf(searchvalue,fromindex)
~~~

第一个参数是搜索的值，第二个【可选】参数是开始搜索的位置

```js
var str = "123";
console.log(str.indexOf("3"));  // 2
console.log(str.indexOf("4"));  // -1
```

indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。

如果要检索的字符串值没有出现，则该方法返回 -1。

注：如果在第一个字符出现，那么返回 0。搜索值对大小写敏感。



### 方法二: search() 

~~~js
string.search(searchvalue)
~~~

```js
var str = "123";
console.log(str.search("3"));  // 2
```

search() 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。

返回值是数字。如果没有找到任何匹配的子串，则返回 -1。



### 方法三:match()

~~~js
string.match(regexp)
~~~

```js
var str = "123345";
var reg = RegExp(/3|2/g);
str.match(reg) // ['2', '3', '3']
```

match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配（返回数组），或者返回 null。

如果 regexp 没有标志 g，那么 match() 方法就只能在 stringObject 中执行一次匹配。



### 方法四:test() 

~~~js
RegExpObject.test(string)
~~~

```js
var str = "123";
var reg = RegExp(/3/);
console.log(reg.test(str)); // true

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
   document.write("移动")
} else {
   document.write("PC")
}
```

test() 方法用于检索字符串中指定的值。返回 true 或 false。



### 方法五:exec()

~~~js
RegExpObject.exec(string)
~~~

```js
var str = "123";
var reg = RegExp(/3/);
if(reg.exec(str)){
    // 包含        
}
```

exec() 方法用于检索字符串中的正则表达式的匹配。返回值类似 match，返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。



### 方法六:includes()

```js
string.includes(searchvalue, start)
```

```js
var str = "123";
str.includes('1'); // true
str.includes('4'); // false
```

includes() 方法用于检索字符串中是否存在子字符串。返回值是 true 或者 false。

注：对大小写敏感。可以处理 indexOf 是 0 的情况。ES6的语法，部分浏览器不兼容。



### 小结

indexOf  includes 是字符串的方法，简单通用，都是两个参数，结果分别是数值和布尔值。如果对位置敏感，使用 indexOf，如果对位置不敏感，使用 includes。不使用匹配多个的情况

search match 也是字符串的方法，支持搜索字符串或者正则表达式。search 返回数值，match 返回数组，适合查找全部满足条件结果。

test exec 是正则对象的方法，和前几个用法不同。test 返回布尔值，exec 返回数组，适合查找满足全部满足的情况。



### 参考资料

https://www.w3school.com.cn/jsref/jsref_indexOf.asp

http://www.w3school.me/jsref/jsref-string-includes.html

https://www.runoob.com/jsref/jsref-match.html

https://www.runoob.com/jsref/jsref-search.html

https://www.runoob.com/jsref/jsref-exec-regexp.html