# nodeJS 获取前端高频词

最近在看英文文献，无奈各种生词比较多，每次看一段就需要不断查词典，很烦人。

所以，我想把出现的高频生词先找出来，统一查好，这样阅读就更快了。

废话不多说，直接上代码



### 1、准备一篇英文文章

我找到一篇介绍 ECMA6 的文章 **leanpub-auto-the-road-to-ecmascript-6**

原始网页：https://leanpub.com/understandinges6/read#leanpub-auto-the-road-to-ecmascript-6 

文件大小：587KB，我已经转存到本地（也可以直接爬取网页）

### 2、读取文件内容，转换成字符串

~~~js
function getFile(filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) console.log(err);
    if (data) {
      // data is array buffer, so use toString to transfer to string
      return data.toString();
    }
  });
}
~~~

### 3、处理字符串，获取高频词

~~~js
// 获取高频词
function getFrequence(str) {
  // 删除特殊符号（只保留字母数字）
  str = str.replace(/[^A-Za-z0-9\s]/ig, '').replace(/[\n+]/ig, '');
  // 转换成数组
  var arr = str.split(' ');
  var obj = {};
  arr.forEach((item) => {
    let key = item.toLowerCase();
    if (!obj[key]) {
      obj[key] = 1;
    } else {
      obj[key] = obj[key] + 1;
    }
  });
  // 获取出现次数最多的几个情况
  var arr2 = [];
  for (let key in obj) {
    let times = obj[key];
    // 这个参数可以调整（现在统计出现次数超过10次的单词）
    if (times > 10) {
      arr2.push({ times, key });
    }
  }
  arr2.sort((a, b) => a.times > b.times ? -1 : 1);

  var arr3 = [];
  arr2.forEach(item => {
    arr3.push(item.key);
    // arr3.push(item.times); 
    // 统计次数需要这个代码，如果仅仅是背单词就不需要这个代码
    arr3.push('\n');
  });
  return arr3.join(' ');
}
~~~

### 4、将高频词写入外部文件中

~~~js
function writeFile(str) {
  fs.writeFile('./result.txt', str, function(err){ 
    if (err) {
      console.log('write file error');
    } else {
      console.log('write file success');
    }
  });
}
~~~

前面的是语法词语，这部分略过（因为这部分字符长度较短，可以直接根据长度过滤这部分词汇）

~~~md
 the 5155 
 to 2361 
 a 1951 
 is 1637 
 and 1384 
 of 1366 
 in 1319 
 that 983 
 an 816 
 this 796 
~~~

后面的就是高频专业英语单词，这部分就需要我们熟练记忆啦

~~~md
 call 177 
 string 176 
 promise 174 
 arrays 172 
 also 171 
 second 169 
 key 165 
 argument 160 
 objects 159 
 result 154 
 any 153 
 functions 148 
 into 147 
 two 146 
 properties 145 
 arguments 142 
 variable 139 
 passed 137 
 syntax 136 
 instance 135 
 inside 134 
 prototype 131 
~~~

如果未来需要读英文书籍或者文档，那么首先用这个工具获取高频词，然后学习吧！

### 思考

1、直接使用node爬虫爬取界面，然后爬取多个主流网页，这样获取的高频词库就比较统计意义，不受极端值的影响了。

2、调用词典的 API，然后把生词查出来，或者写到在线的单词本中？

百度词典可以获取翻译的 API

https://developer.baidu.com/wiki/index.php?title=%E5%B8%AE%E5%8A%A9%E6%96%87%E6%A1%A3%E9%A6%96%E9%A1%B5/%E7%99%BE%E5%BA%A6%E7%BF%BB%E8%AF%91/%E7%99%BE%E5%BA%A6%E8%AF%8D%E5%85%B8api%E4%BB%8B%E7%BB%8D&oldid=16877

