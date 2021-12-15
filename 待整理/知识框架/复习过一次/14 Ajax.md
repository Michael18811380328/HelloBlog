#### Ajax（w3c-school）

异步JavaScript and XML：在不加载整个页面的情况下，异步更新页面上的部分内容，不是编程语言。

实际用途：搜索框的建议列表。

XHR：XML Http request



##### 1.XHR创建

创建XMLHttprequest对象（ie7以后所有浏览器均兼容）（ie6之前：ActiveXObject对象兼容）

~~~html
检测浏览器兼容性代码：
var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
~~~



##### 2.XHR请求

XHR对象用于浏览器向服务器发送请求，

###### GET

xmlhttp.open("GET","text.txt",true);

请求的类型：“GET”或者“POST”方法

文件在服务器上的位置URL

true（异步）-false（同步）  

xml.http.send();

将请求发送到服务器（仅用于POST）

~~~html
get和post的区别：
get更简单更快捷，大部分情况下能使用。

post在下面三种情况更合适：
1.无法使用缓存文件（更新服务器上的文件或者数据库）
2.向服务器发送大量数据（post没有数据量限制）
3.发送包含未知字符的用户输入
~~~

###### POST

~~~javascript
xmlhttp.open("POST","demo-post.asp",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded);
xmlhttp.send("fname=Bill&lname=Gates");

//setRequestHeader（header,value） 方法
//向请求添加HTTP的头的名称和值
~~~

异步：JavaScript不需要等待服务器的响应，而是：在等待服务器响应时执行其他脚本；当响应就绪后对响应进行处理。

如果使用同步，JavaScript程序必须等待服务器响应就绪才继续执行。如果服务器繁忙或者缓慢，应用程序就会停止或者挂起（小型的请求可以使用同步sync）。



##### 3.XHR响应

如需获得来自服务器的响应，使用XMLHttprequest 的两种属性：

###### 3.1 responseText

如果来自服务器的响应并非XML，使用responseText属性即可（返回字符串）。

~~~javascript
document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
~~~

###### 3.2 responseXML

responseXML需要进行解析（XML语法）

~~~html
xmlDoc=xmlhttp.responseXML;
txt="";
x=xmlDoc.getElementsByTagName("ARTIST");
for (i=0;i<x.length;i++) {
  txt=txt + x[i].childNodes[0].nodeValue + "<br />";
  }
document.getElementById("myDiv").innerHTML=txt;
~~~



##### 4.XHR执行状态

当请求从浏览器发送出去后，我们需要执行一些基于异步响应的任务。当执行状态（ready State）发生改变，就会触发onreadystatechange事件。

XHR对象的三个属性：

1.onreadystatechange——存储函数，当XMR的执行状态发生变化就会调用函数。

2.readyState：执行状态（0-4，表示执行的五步）

3.status：执行结果（200或者404）OK或者没找到对应的文件。

当readyState == 4 && states == 200 响应执行

~~~javascript
xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readystate == 4 && xmlhttp.states == 200) {
		document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
		//返回的文件类型不是XML文件，属于Text类型String文件
	}
}
~~~

当网页中有多个Ajax请求，使用Callback函数处理（直接调用一个函数）

~~~html
<html>
<head>
    <script type="text/javascript">
        // 第一步：新建XHR对象
        var xmlhttp;
		// 浏览器兼容性检查
        function loadXMLDoc(url,cfunc) {	
	    	if (window.XMLHttpRequest) {
	        // code for IE7+, Firefox, Chrome, Opera, Safari
	          xmlhttp=new XMLHttpRequest();}
	        else {
	        // code for IE6, IE5
	          xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	         }
	    // 第二步：XHR请求
	        xmlhttp.onreadystatechange = cfunc;
	        xmlhttp.open("GET",url,true);
	        xmlhttp.send();
        }
        // 第四步：XHR执行状况判断（构建Callback函数）
        function myFunction()
        {
        loadXMLDoc("/ajax/test1.txt",function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          	// 第三步：XHR响应返回Text
            document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
            }
          });
        }
    </script>
</head>

<body>
    <div id="myDiv"><h2>Let AJAX change this text</h2></div>
    <!-- 通过触发按钮异步执行 -->
    <button type="button" onclick="myFunction()">通过 AJAX 改变内容</button>
</body>
</html>
~~~

##### 5.Ajax高级

使用Ajax和数据库进行交互，以及ASP和PHP服务器的通信（PHP更常用）。



#### Ajax入门（传智播客）

##### 1.网络传输协议

charles服务器端用于抓包

常用的几个网络协议，服务器和浏览器之间的关系介绍（请求响应request-response）

浏览器和服务器之间多次请求响应完成网页的实际数据传输和渲染。（首先请求HTML，之后根据HTML页面中的链接等请求其他文件js+css，继续请求多媒体jpg，最后渲染DOM树，详见浏览器执行过程分析）。浏览器端Apache是主流的服务器软件。



请求(request)：请求行、请求头(headers)、请求主体；

响应(response)：状态行、响应头、响应主体；

请求行：请求方式（get-post）、服务器地址、协议及版本（HTTP-1.1）

请求头：

​	主要是用户浏览器的相关信息（user-agent）

​	浏览器类型版本、语言编码、文件类型（accept-encoding：accept）

​	支持压缩文件传输、响应编码（200成功，403 Apache Tomcat forbid，404 not found）

​	文件类型（content-type：text/css）

注意：文件名后缀不能代表真实的内容，需要根据实际情况判断文件类型。文件的传输全部都是字符串，content-type决定执行的方法。



##### 2.Ajax

异步：JS与XML异步执行——异步（同一时间执行多个代码）

XHR：XML-Http-Request: 浏览器的内建对象，用于在后台与服务器进行数据交互。在不刷新网页的基础上实现部分数据更新。类似其他对象，XMLHttpRequest也具有一些方法和属性。

get和post的差别
get 方法没有必要加入content-type（没有传输数据）；post方法可有可无（如果send=null就没有必要设置content-type）content-type的目的就是说明浏览器想服务器发送内容的数据类型。如果没有发送数据（或者NULL）完全没有必要声明数据类型。post有请求主体，get没有请求主体（Form data）。post有内容形式，get没有内容形式（content-type）

小结：所有内容都是通过request-response方式传输，HTML负责。

xhr.states
states=200；如果发生错误（php错误）readystate仍然会变成200，执行函数。

同步和异步的差别：设置ajax可以执行同步或者异步，推荐执行异步（多行代码同时执行），不会因为请求响应过程，导致页面的其他代码不执行。



##### 3.参数

post方法：需要设置content-type，将传输的数据放置在send后边，是用&隔开的键值对；

get方法：不需要设置content-type，send(null)，数据放在get的地址后面，使用？符号间隔
两种方法可以起到同样的异步数据传输效果。

当然，在php后端需要设置不同的属性。

xhr.readyState参数（0-4）
0 请求未开始
1 open已经调用
2 接收到请求头信息
3 接收到响应主体
4 响应完成



##### 4 API

```javascript
xhr.open("get","URL",true) 发起请求
xhr.setRequestHeader(content-type)设置请求头
xhr.send()发送请求主体
xhr.send("键值对")post
xhr.send(Null)get
xhr.onreadystatechange = function(){}监听响应
xhr.status 响应码 200
xhr.statusText 响应信息 OK
xhr.getAllResponseHeaders()获得全部响应头信息
xhr.getResponseHeader("key")获得指定头信息
xhr.responseText/xhr.responseXML 响应主体
```
面试题：Ajax中get和post方法的区别？
1.get：没有请求主体，xhr.send(null),在URL地址后加入请求参数。
2.post：有请求主体，xhr.sned(键值对)，需要设置content-type。
3.get效率更高，应用更多，大小不能超过4k；post方法没有数据大小限制。