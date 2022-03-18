# Formik

Build forms in React, without the tears.

官方链接：https://github.com/jaredpalmer/formik

## React 中表单已有的问题

在 React 框架中，状态驱动数据流，如果表单项比较多，需要对每一个表单项，单独设置一个 state，然后设置对应的回调函数。

如果有特别多的表单，那么需要特别多的状态和回调函数，代码很多。

Formik 就是解决这个问题的库

## 如何使用

导入 `import { Formik, Field, Form } from 'formik';` 具体使用类似表单

在表单中设置一个提交按钮，点击后，触发 Formik 的回调函数，即可提交表单。

具体见两个案例说明。

## 使用情况

github 30K 星星，使用 18K，功能和稳定性没问题

缺点：简单的表单控件，样式不是很美观，其他功能不是很丰富

