## Dreamweaver CS4 学习

### DW CS4 基础

#### 1 网站设计思路

静态网页类似于PS 插入不同的图层和对象

对象：表单 表格 多媒体 flash  JS
代码输入+对象输入

定义站点：站点：一个存放网页或者网站文档的位置，随时保持文件链接的位置（类似于PR素材库）网站需要按照文件地址调用文件素材，文件地址变换后及时更新。本地站点和远程站点（服务器）。在站点放置相关文件，DW直接访问相关文件制作网页（音乐图片）把一个网页另存为得到一个HTML文件和一个文件夹（本地站点）

站点中文件存放分类合理：图片、flash、css、JS、文本文件



#### 4 网页管理

创建网页、设置属性、预览网页、网站规范
页面属性、文字属性、标题和编码属性、跟踪图像设计页面

		网页制作规范
			网站目录站点安排
			（层次少逻辑清晰）
			common
					css/js/php/include public files 
				content
					feedback 
				image
					public images including menu button 
				media
					flv/avi/quicktime media file
				temp
					分类整理好的文件
				root menu 
					index.html or main.html 
						index.html 桥梁页面 跳转或者meta标签
						
			文件命名
				less characters more meaning
					小写字母+数字+下划线
						Chinese character and space and other signals can't read by some servers 
						use more English and have specific means 
				picture file name rule
					head
						divide and feature 
							banner(AD) logo menu button bg(background)
					body
						specific meaning 
					banner_university.png
					
			文件头代码
				website feature title author meta（关键字标签）
				<head>
				<!-- The website is made by Michael An in 2017-->
					作者版权注释
				<title>The first website </title>
				<meta http-equiv="Content-Type" content="text/html ;charset=gb2312">
					设置字符集字体代码
				<mate name="author" content="website@qq.com">
					网站介绍
				<mate name="description"content="How to use Dreamweaver to build a website"
				<mate name="keywords" content="DW,website">
				<link href="style/style.css" rel="stylesheet" tpte="text/css">
					网页CSS规范
				</head>
				
			5 HTML
	        HTML 是标记语言，不是程序语言 不需要编译
	        分类：标题、文本、图像、表格、超链接
	        预览HTML：word；explorer；DW
	        
	        编写HTML
			在DW中边编写边运行
				需要实际教程操作学习
			快速标签选择器
				源代码面板
			标签选择器
				标签检查器
				
		简单的图片结构直接可视化编辑，复杂的多图层网页最好使用代码，JavaScript也是代码实现，所以现在尝试使用代码和框架


#### 6 文本

文本分类：短文本直接输入；中等复制粘贴；大文件word直接导入

特殊符号，换行输入，动态日期输入（显示当时时间）
文本编辑的其他属性类似于office（可视化编辑部分）




	7 图片
		图片分类
			GIF:256颜色，适合大面积统一色彩图像，适合动画
			jpg:（有损jpeg），颜色丰富，网页中使用压缩可能存在失真
			png：保留原始的矢量和图层
			
		图像占位符 alt
			在添加最终图像之前将图像占位符放置在区域内部
		图像属性
			类似于office调整图像情况
			调整位置大小、裁剪、亮度对比度饱和度等
		图像的Alt属性
			鼠标指针移动到相应位置，出现相应说明文字
				进阶版JS 鼠标移到区域后出现下拉菜单等情况
			鼠标移走文字消失
				使用两张图片
					原始图片和替换图片
		<img srt="URL" alt="word" title="name" width=200 border=10 />
		banner_university.jpg
	
	8 多媒体
		传统多媒体
			音频 视频 flash
				插入音频-用户可以控制音乐
				music
					打开页面自动加载视频或者音频
					使用JS插入背景音乐
					音乐常用mp3或者rm格式
					通常使用Windows media player进行视频或者音频播放
					在H5中使用audio标签直接进行添加
				swf
					flash动画文件较小，适合在网络上使用
					通常插入 Adobe flash player 进行播放
					现在已经被JS取代（video标签直接插入）
				flv
					flash 视频 视频文件极小
					所以说部分浏览器必须安装flash播放器才支持使用
	程序语言
		href
			hyberlink reference 超链接应用 后边加文件的URL
			加入 CSS样式配置文件 不用直接在原始代码中写入格式，直接用css写好，用地址引用格式；类似的JS也可以表达式、函数、方法
		src——文件路径
			picture file hyberlink grammar
			including file location+file name+file width and height
			<img src="image/banner_travel.jpg" width="1366" height="912" />
	
	9 超链接
		超链接=指针
		分类
			绝对路径链接
				直接从网站地址链接URL
			相对路径链接
				描述本网页和目标对象的相关关系
			命令锚链接
				类似于目录，按住CTRL点击页码，自动跳转到对应的页面
				首先设置命令锚点
					创建锚链接
			图像超链接
				整个图片超链接
				热区超链接：点击部分图片产生超链接
		导航条超链接
			图像Alt属性+超链接
			
		超链接检查修复工具
		
	chapter 10 chart form table
		类似于word中插入表格和编辑
		表格中插入图像（表格）嵌套
		整体表格的属性和单元格的属性
### DW CS4 中级

	11 框架
		框架
			在窗口的左侧或者上边设置导航区或者目录
			在右下方设置页面主体区域
			点击不同的菜单，主体区域出现不同的文件（超链接)
			框架定义：在一个界面显示多个不同的文件
			
		框架集和单独的框架
			frames and frameset
			frames=several frame+frameset
			框架集：设置不同的框架的数量、大小、位置、属性
			单个框架放置单个网页
			可以理解成网页的嵌套
			
		优缺点
			结构清晰；不同单框架具有独立滚动条（用户可以独立滚动)
				类似于excel分栏设置（四个区域）
			浏览器刷新不需要所有页面刷新
			搜索引擎遍历所有框架困难
			部分早期浏览器不支持
			
		框架的嵌套
			框架的嵌套类似于PS的图层组
			树状结构设计框架
			
		框架的整体布局
		
	第十二章 AP-DIV
		创建AP层
			插入div标签
			<div class="news"> <p>text</p> </div>
			<div style="color:#00FF00"><p>text</p></div>
			
	第十三章 CSS
		CSS是什么
			网页内容和样式分开的工具
			统一样式使用，减小网页
		语法
			规则（CSS对象）
				自定义的类
					使用.red 定义某一段为红色样式
				HTML 标签
					统一编辑 <p></P> 或者<h1></h1>
				CSS选择器
					选择 a:link 表示超链接部分样式
					选择：#mystyle  表示包含“mystyle”字符的样式
			声明
				内容的具体格式：Font Width 
		应用形式
			外部形式
				以css后缀文件存储在整个html站点中
					整个网站使用相同的CSS确保样式一致性
					修改便捷
			内部形式
				以style形式存放在head部分
	
		CSS应用属性
			类型属性（文字）
				文字大小、字体、样式、颜色
			背景属性
				背景颜色和图像
			区块属性
				文字间距和对齐方式
			方框属性
				方框在页面中的位置（文本区域大小位置、与边界的距离）
			边框属性
				元素周围的边框（边框的宽度颜色样式）
			列表属性
				列表项目符号、位置
			定位属性
				层的大小、位置、可见性、溢出方式、剪辑
			设计时间样式表
				显示查看多个样式表
				查看同一网页内容应用不同的外部样式表
				模板：文本、表单、超链接等
				
	第十四章 表单
		表单：用户与网站信息交互
			服务器端：使用CGI、JSP、ASP等应用程序处理数据
			前端和后端衔接的地方
		表单属性
			表单名称
				使用JS控制表单
			表单数据传输方法
				get
					将值增加到请求该页面的URL中
				post
					在信息正文中发送表单数据
				区别是什么？
				
			服务器反馈方式
				目标；_blank 服务器采用采用新窗口打开
					您的数据有误；您还有一项未提交
			MIME类型
				application/x-www-form-urlencode
		表单元素
			文本字段
				用户名+密码
			隐藏域
				用户无法看到隐藏域
					用户浏览网页时间-用户浏览网页比例-用户单击鼠标的位置
					分析用户属性
					
			单选框和复选框
			列表或者下拉菜单
			图像域
				将图像设置为按钮（图像添加超链接和鼠标事件 return:false;）
			文件域
				将一个文件附加到正在提交的表单中
					上传照片和邮件附件
			按钮
				使用JS设置动作:类似于office中的VBA
				<input type="button" >
### DW CS4 高级

	第十五章 行为
		行为是什么？
			动态响应用户操作，改变当前页面效果或者执行特定任务（动作）
			某一事件发生后，某对象发生某个动作
		行为组成
			对象
				图像、文本、多媒体、表单
			事件
				与用户相关或者无关的各种事件（鼠标移动单击）
				Onclick OnDbclick
				OnKeydown OnKeyup
				OnError 界面发生错误时触发这个事件
				OnLoad OnUnload 用户下载完成后 或者关闭网页时触发事件
			动作
				产生的动态效果：图片转化，链接改变，多媒体
				
		行为分类
			内置行为
				弹出信息框或者提交表单
				打开浏览器新窗口（例如网站广告）
				调用JS
				检查表单
					OnBlur
						用户填写完单个表单进行验证
					OnSubmit
						用户提交表单时对多个文本域数据进行验证
				检查插件
					用户是否安装Adobe flash player插件
				检查浏览器版本-跳转到不同的网页
				控制flash或者shockwave
			外挂行为
				Extention Manager
					官网下载
				改变网页的颜色
				
	第十六章 Ajax-Spry
		阿贾克斯：Asynchronous Javascript And XML 异步JS和XML交互技术
		Ajax 不更新全部网页信息的情况下，使用JS调用服务器部分数据，动态更新网站的部分信息，省流量，用户体验好。（例如浮动的汇率和股价）
		Ajax：数据异步传输
			使用XHTML和CSS标准化呈现
			使用文档对象模型DOM实现动态显示和交互
			使用XML和XSLT进行数据交换和处理
			使用XMLHTTPREquest进行异步数据读取
			使用JS绑定处理所有数据
		Spry
			实现Ajax的框架
			组件
				验证文本域组件（文本框）
					文本信息不符合最大最小字符出现提示信息
						标题字数需要在10-20字之间
				验证文本区域区域组件
				验证选择组件-单选复选
			菜单栏
				水平布局垂直布局
		Spry显示数据
			定义XML数据集
			创建Spry区域
			创建Spry重复区域
			创建重复列表
			创建Spry表格
			
		Spry效果
			Spry向页面中添加多种视觉效果，无需刷新即可显示
				不同效果适应于不同的标签
			增大-收缩-变形
				address/dd/div/dl/dt/form/img/menu 标签
			显示-隐藏
				除去applet/body/iframe/object/tr/tbody/th 外的所有标签
			晃动
				address/h1/img/div/menu/pre/table
			
	第20章 DW模板
		网站不同页面风格设计一致
		不同页面效果转换流畅，流量节省
		更新网页只需替代之前模板
		个人创建模板
		关键——分析下载已有模板
		搜集整理修改原始素材
		库项目:一个项目设置独立的素材库
			
	第22章 网站测试与发布
		网站测试种类
			浏览器兼容性检查
			网站链接进行检查
			清理HTML标签
			检查语法错误
			上传本地文件到服务器上
			
		网站测试方法
			直接DW测试浏览器兼容性（ie内核或者非IE内核）
			使用站点报告
			检查HTML标签（错误遗漏）
			
		网站发布
			实质就是将网页上传到服务器的过程
			1.创建远程站点
			2.与远程站点建立连接
			3.上传文件
			
	第23章 Web标准
		web标准
			W3C组织下成立
			网页组成部分：结构、表现、行为
				内容：网站页面传输的真实有用的信息（数据文档图片）
				结构：标题段落，章节列表（文章拥有逻辑性层次性）
				表现：改变外观的东西（字体颜色背景修饰）
			结构化标准语言：XML-XHTML
			表现标准语言：CSS
			行为标准语言：W3C DOM ECMAScript
			使用div和css实现表现和结构分离
			标准
		制作流程
			目标：div+css 顶部标题 中部三列分栏
			1.建立规范XHTML文档
			2.创建层div，给层命名。
			3.给文字和层设置CSS格式
		标准检验
			http://validator.w3.org/
			http://jigsaw.w3.org/css-validator


### DW CS4 实际应用上

#### 2 常用浏览器

	IE 火狐 谷歌 Safari(apple) 欧朋 五个浏览器
	谷歌浏览器和IE浏览器速度快，市场份额大
	浏览器作用：将代码渲染成网页
#### 3 浏览器内核

	IE
		trident 内核
	firefox
		Gecko内核:代码完全公开，开源
		
	Safari:Webkit内核
			android 默认浏览器
	chrome:
		chromium Blink 内核（2013前是webkit）
	opera
		presto 内核:现在已经是谷歌内核


#### 15 文档类型

	！DOCTYPE html 表示H5版本
	UTF-8 字符集
		头文件：meta charset="UTF-8"
#### 24 锚点设置

	锚点用途：单个长网页定位到某部分（例如百度百科）
	实质：一个网页内部超链接
	定义链接位置
		原始位置：定义属性id=锚点名称
			<p id="human">text</p>
		超链接：href=#锚点名称
			<a href="#human" >text </a>
	注意事项：#不要落下 锚点名称有实际含义
	class:主要是一类元素（标签）统一使用相同的样式
	id：锚点，主要调用JS进行控制行为等
#### 25 base标签

	<a>属性 
		target="_blank" 在新的窗口打开外部链接网页
		target="_self"在当前窗口打开外部链接网站 默认
	特点：单标签；位于head部分，属于全局标签
	解决问题：网页中链接太多，每次添加_blank 很繁琐，统一在head写入base 
	语法：<head> <base target="_blank" /> </head>
#### 26 特殊符号

	某些符号是代码中固定单词，需要特殊符号
	&nbsp；空格
		&lt &gt &copy 大于小于版权
	其他特殊符号使用时候查询
	注意：结尾有分号
#### 28 文件路径

	相对路径和绝对路径
	相对路径
		同级、上级(../)、下级(/)
			<img src="../image/banner_flower.jpg">
	绝对路径
		本地路径：一般不能用（文件的绝对位置）
		服务器的绝对地址
#### 30 列表标签组

	无序列表（常用）
	两个标签
		<ul>
		<li>text</li>
		<li>text</li>
		<li>text</li>
		</ul>
	无序列表注意事项
		ul 与li 直接相连，ul标签内部不能含有其他标签
		li标签内部可以有完整的结构
		li标签的格式可以用CSS修改（text-decoration）
		
	有序列表
		使用ol代替ul，注意事项不变
		
	自定义列表
		三个标签
		dl 是标签 内部是一个dt和若干dd 
		dl 城市分区 dt 北京市 dd 朝阳区 dd 丰台区

**小结：单标签：img hr br base**



### DW CS4 实际应用下

	设计原则
		面向对象设计
			用户需要什么功能就设计什么功能
			不一定面面俱到，效果美观合理
		需要设计人员设计网页，市场人员分析需求，测试人员反馈bug，运营人员后端人员反馈实际问题（不断修改不断完善）
	网站分类
		传统公司严谨布局
		现代公司灵活布局
		未来统一web标准布局
	实际流程
div+css
		设计图分析
			LOGO、banner、导航区、内容区、页脚区
		布局分析
			分栏布局，层结构划分
		配色分析
			从设计图稿中提取各区域和字体的颜色
			在FW中切图
				颜色较少变化不大用gif
				颜色丰富banner使用jpeg
		DW制作
			定义站点
			创建层
			添加内容
				图像-背景图层
			设置超链接
			添加CSS样式表


2.HTML（45分钟）
	常见标签
		&nbsp；空格
		h1-h6六级标题 
		p段落 
		strong 加粗
		em 斜体
		通常使用css优化，可以同时使用
##### 表单学习

早期的结构、样式、行为不分离。

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<h3 align="center">2018.1.13学习</h3>
	<h3 align="center">新增表单属性26</h3>
  
	用户名：&nbsp;<input type="text" placeholder="please input user names"/><br /><br />
	<!-- 灰色的提示文本H5新增，占位符，用户输入过程中自动消失 -->
  
	用户名：<input type="text" autofocus="autofocus" /><br /><br />
	<!-- autofocus 自动获得焦点（光标 -->
  
	上传单个文件：<input type="file" /><br /><br />
	上传多个文件：<input type="file" multiple="multiple" /><br /><br />
	<!-- multiple表示可以上传多个文件 -->
  
	<input type="submit" />
	<input type="reset" /><br /><br />
	<h3 align="center" >autocomplete自动记录完成27</h3>
	<!-- 提交一次表单之后记录保留表单（个人电脑记录信息）-->
	<!-- 注意事项：
	1.首先需要form与submit操作
	2.需要增加name命名 -->
	<form action="">
		请输入账号 <input type="text" autocomplete="autocomplete" name="username" accesskey="s" /><br /><br />
		请输入密码 <input type="password" autocomplete="off" name="username2" maxlength="6" required="required" accesskey="p" /> <br /><br />
		autocomplete 属性 on-off 默认为on <br /><br />
		<input type="submit" /> <br /><br />
		required=内容不能为空（不同浏览器显示不一样）
		accesskey=按住alt+其他键 光标直接定位到特定的表单中
	</form>
	<hr /><br /><br />
	<h3 align="center" >综合练习 学生档案</h3>
  
	<form action="">
		<fieldset>
			<legend>学生档案</legend>
			<label>name: <input type="text" placeholder="please input your name" /></label><br /><br />
			mobile: <input type="number" /><br /><br />
			email: <input type="email" /><br /><br />
			college: <input type="text" palceholder="please choose colleges" list="college"/>
			<datalist id="college">
				<option>java</option>
				<option>C++</option>
				<option>PHP</option>
				<option>design</option>
			</datalist>
			<br /><br />
			birthday: <input type="date" /><br /><br />
			grades: <input type="number" /><br /><br />
			<input type="submit" />
			<input type="reset" />
		</fieldset>
	</form>
</body>
</html>
~~~

##### 多媒体插入

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<h3>多媒体标签</h3>
	通过第三方视频软件平台，直接调用视频地址（节省网站空间）<br /><br />
	<embed src="" ></embed><br /><br />
	<!-- 直接从视频网站中复制粘贴到embed中 -->
  
	<audio src="media/Germany.mp3" autoplay="autoplay" controls="controls" loop="-1"></audio>
	autoplay 自动播放；controls 显示控制按钮 ；loop 循环次数 （-1表示无限循环）
	针对不同浏览器兼容性使用不同格式的音乐（ogg-mp3-wav）<br /> <br />
	<audio controls autoplay>
		<source src="mp3" />
		<source src="ogg" />
		您的浏览器不支持声音输出
	</audio>
	<!-- embed适合于大视频-其他网站调用；video适合于小视频ogg-mp4-webM视频三种形式 -->
	<video src="media/documentary.mp4" autoplay controls width="1000" /></video>
	本地（服务器）视频使用video标签命令
</body>
</html>
~~~

##### 熟练表单

```html
<h3 align="center" >datalist and input using</h3>
	<br />
	<br />
	<input type="text" value="please enter" list="star" />
	<datalist id="star" >
		<option>APPLE</option>
		<option>ORANGE</option>
		<option>BANANA</option>
		<option>BARBEQUE</option>
	</datalist>
	<br />
表单（单选框）下拉菜单
```

表单练习

```html
<fieldset align="center" >
		<legend>user information</legend>
		<input type="text" value="vacant" /><br /><br />
		<input type="password" value="I know" maxlength="6"/><br /><br />
		<input type="submit" />
</fieldset>

	<!-- input 新增属性 -->
	<fieldset>
		<legend>new input type</legend>
		<form action="XXX.php">
			please input your email address<input type="email" /><br /><br />
			please input your phone number<input type="number" /><br /><br />
			please input network address<input type="address" /><br /><br />
			please search <input type="search" />
			<!-- 普通的文字写错必须一个一个删除，搜索框直接点击错号就能全部删除 -->
          
			you can control volumn <input type="range" />
			
			please choose color<input type="color" />
          
			<!-- time-date-week-datetime 其他标签在官网查询最新标签-->
			<input type="submit" />
          
	</fieldset>
```

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>

</head>
<body>
	<h3 align="center" >2018.1.13学习</h3>
	<h3 align="center" >新增表单属性26</h3>
	用户名：&nbsp;<input type="text" placeholder="please input user names"/><br /><br />
	<!-- 灰色的提示文本H5新增，占位符，用户输入过程中自动消失 -->
	用户名：<input type="text" autofocus="autofocus" /><br /><br />
	<!-- autofocus 自动获得焦点（光标 -->
	上传单个文件：<input type="file" /><br /><br />
	上传多个文件：<input type="file" multiple="multiple" /><br /><br />
	<!-- multiple表示可以上传多个文件 -->
	<input type="submit" />
	<input type="reset" /><br /><br />
	<h3 align="center" >autocomplete自动记录完成27</h3>
	<!-- 提交一次表单之后记录保留表单（个人电脑记录信息）-->
	<!-- 注意事项：
	1.首先需要form与submit操作
	2.需要增加name命名 -->
	<form action="">
		请输入账号 <input type="text" autocomplete="autocomplete" name="username" accesskey="s" /><br /><br />
		请输入密码 <input type="password" autocomplete="off" name="username2" maxlength="6" required="required" accesskey="p" /> <br /><br />
		autocomplete 属性 on-off 默认为on <br /><br />
		<input type="submit" /> <br /><br />
		required=内容不能为空（不同浏览器显示不一样）
		accesskey=按住alt+其他键 光标直接定位到特定的表单中
	</form>
	<hr /><br /><br />
	<h3 align="center" >综合练习 学生档案</h3>
	<form action="">
		<fieldset>
			<legend>学生档案</legend>
			<label>name: <input type="text" placeholder="please input your name" /></label><br /><br />
			mobile: <input type="number" /><br /><br />
			email: <input type="email" /><br /><br />
			college: <input type="text" palceholder="please choose colleges" list="college"/>
			<datalist id="college">
				<option>java</option>
				<option>C++</option>
				<option>PHP</option>
				<option>design</option>
			</datalist>
			<br /><br />
			birthday: <input type="date" /><br /><br />
			grades: <input type="number" /><br /><br />
			<input type="submit" />
			<input type="reset" />
		</fieldset>
	</form>
</body>
</html>
~~~

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
	<mate charset="UTF-8">
	<base target="_blank">
	<title>
	This is the first website of Bingo
	</title>
	<!--快速导入HTML5的方法需要加载插件-->
</head>
<body>
	<h3>The weather get warmer</h3>
	<br />
	<p> how <strong> to </strong> &lt;get a word&gt;</p>
	<br />
	<h4><a href="content/plan.txt">time plan</a></h4>
	<br />
	<a href="https://www.baidu.com" > 
		<img src="image/banner_travel.jpg" title="travel" alt="that is a picture" width="520" border="5"/>
	</a>
	<hr />
	<img src="image/banner_skin.jpg" title="skin" alt="this is a picture!" width="520" />
	<hr />
	<a href="media/seven.flv">
		<h4>seven</h4>
	</a>
	<!-- 为什么flv文件在浏览器中无法执行必须以下载形式执行 -->
	<br />
	<img src="https://i0.hdslb.com/bfs/archive/d8ef7d12866152d85b8a853504fd697f0c58727e.jpg@440w_220h.webp" title="girl" alt="The website is not good enough and please press F5 to refresh!" width="600"/>
	<br />
	<hr />
	<h3>A new Table of students<h3>
		<table width="500" height="300" border="3">
			<tr>
				<td>姓名</td>
				<td>年龄</td>
				<td>学历</td>
			</tr>
			<tr>
				<td>小王</td>
				<td>&nbsp;</td>
				<td>本科</td>
			</tr>
			<tr>
				<td>小李</td>
				<td>&nbsp;</td>
				<td>硕士</td>
			</tr>
		</table>
	<img src="https://i0.hdslb.com/bfs/archive/90020ee23d5f7b19be085d4907bfd517539b82ad.jpg@440w_220h.webp" title="girl" alt="The website is not good enough and please press F5 to refresh!" width="600"/>
	<br />
<body>
</html>
~~~
