## React-icons

﻿https://www.npmjs.com/package/react-icons﻿ 

﻿https://react-icons.github.io/react-icons/icons?name=gi﻿ 

使用React图标可以轻松地在React项目中包含流行图标，它利用ES6导入，允许您只包含项目正在使用的图标。

这个就是很多图标的集合（ant-design/font awesome/iconfont）使用不同的图标，从不同的库中引入即可。

使用量超过百万，基本生产环境没问题

```jsx
import { FaBeer } from "react-icons/fa";

function Question() {  return (    <h3>      Lets go for a <FaBeer />?    </h3>  );}
```



## react-hot-toast

使用量超过66万，生产环境基本没问题。这个库应该是基于 react hooks 高级版本，16 可能不支持。

﻿https://www.npmjs.com/package/react-hot-toast﻿ 

```jsx
import toast, { Toaster } from 'react-hot-toast';﻿
const notify = () => toast('Here is your toast.');﻿
const App = () => {  return (    <div>      <button onClick={notify}>Make me a toast</button>      <Toaster />    </div>  );};
```



```jsx
toast('Hello World', {  duration: 4000,  position: 'top-center',﻿
  // Styling  style: {},  className: '',﻿
  // Custom Icon  icon: '👏',﻿
  // Change colors of success/error/loading icon  iconTheme: {    primary: '#000',    secondary: '#fff',  },﻿
  // Aria  ariaProps: {    role: 'status',    'aria-live': 'polite',  },});﻿
toast.success('Successfully created!');
```



## React-spinners

﻿https://www.npmjs.com/package/react-spinners﻿ 

```jsx
import { useState, CSSProperties } from "react";import ClipLoader from "react-spinners/ClipLoader";﻿
const override: CSSProperties = {  display: "block",  margin: "0 auto",  borderColor: "red",};﻿
function App() {  let [loading, setLoading] = useState(true);  let [color, setColor] = useState("#ffffff");﻿
  return (    <div className="sweet-loading">      <button onClick={() => setLoading(!loading)}>Toggle Loader</button>      <input value={color} onChange={(input) => setColor(input.target.value)} placeholder="Color of the loader" />﻿
      <ClipLoader        color={color}        loading={loading}        cssOverride={override}        size={150}        aria-label="Loading Spinner"        data-testid="loader"      />    </div>  );}﻿
export default App;
```



## react-hook-form

﻿https://github.com/react-hook-form/react-hook-form﻿ 

下载量300万

是一个用于构建 React 表单的库。它可以帮助开发者简化表单验证和数据处理的流程。以下是一个使用 react-hook-form 的示例代码：

```jsx
import React from 'react';import { useForm } from 'react-hook-form'; function App() {  const { register, handleSubmit, errors } = useForm();   const onSubmit = data => {    console.log(data);  };   return (    <form onSubmit={handleSubmit(onSubmit)}>      <input        type="text"        name="firstName"        ref={register({ required: true })}      />      {errors.firstName && <span>此为必填项</span>}       <input        type="text"        name="lastName"        ref={register({ required: true })}      />      {errors.lastName && <span>此为必填项</span>}       <button type="submit">提交</button>    </form>  );} export default App;
```



这段代码使用了 react-hook-form 的 useForm 钩子来进行表单处理。通过 register 函数，我们可以将表单元素与表单验证规则进行关联。在 onSubmit 函数中，我们可以获取到经过验证的表单数据，在这里我们简单地将数据打印在控制台上。

在表单元素的 ref 属性中，我们使用了 { required: true } 这个验证规则，它表示输入框必填。如果输入框未填写内容，会在下方显示 "此为必填项" 的错误提示。

此外，还有很多其他实用的功能和钩子可以在 react-hook-form 中使用，如自定义验证规则、异步验证等。上述代码只是简单的示例，可以根据具体需求进行定制和扩展。