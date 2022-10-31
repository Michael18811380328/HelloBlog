# DOMException: Failed to execute 'querySelectorAll' on 'Document' is not a valid selector 报错处理

## 问题过程

今天开发过程中，遇到一个报错信息：

react-dom.production.min.js:5058 DOMException: Failed to execute 'querySelectorAll' on 'Document': '0bb64d67-b455-4130-9b73-55eda6a1975c8Buu-link-ellipsis' is not a valid selector.

截图1

字面意思是：querySelectorAll 函数报错，这个不是一个有效的选择器。我在界面中，打开控制台，可以找到这个 ID 是'0bb64d67-b455-4130-9b73-55eda6a1975c8Buu-link-ellipsis' 的 DOM 元素，但是为什么报错呢？

## 问题原因

查了一下资料，MDN 上有明确解释：HTML中的ID不能以数字开头

截图2

截图3

>  **注意：**使用除 [ASCII](https://developer.mozilla.org/zh-CN/docs/Glossary/ASCII) 字母、数字、`_`、`-` 和 `.` 以外的字符可能会造成兼容性问题，因为 HTML 4 中不允许使用它们。虽然这个限制在 [HTML5](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML5) 中被解除了，但为兼容性考虑 ID 应该以字母开头。



## 解决方法

我原来直接把后端传来的 ID 作为元素的ID，但是后端 slug 创建的 ID 可能是字母开头，所以前端 HTML 的节点，对应某些第三方库，可能出错。可以直接使用字母开头的 ID，这样就正常了。

## 参考链接

https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/id

https://www.runoob.com/jsref/prop-html-id.html

https://www.w3school.com.cn/tags/att_standard_id.asp

https://blog.csdn.net/weixin_34111790/article/details/93976227