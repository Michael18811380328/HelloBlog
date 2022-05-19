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

## 实际案例

~~~json
{
  "name": "formik-example-basic",
  "version": "0.1.0",
  "description": "This example demonstrates how to use Formik in it's most basic way",
  "main": "index.js",
  "dependencies": {
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-scripts": "3.4.1",
    "formik": "latest"
  },
  "prettier": {
    "trailingComma": "es5",
    "singleQuote": true,
    "semi": true
  }
}

~~~

Demo-01

~~~js
import React from 'react';
import ReactDOM from 'react-dom';
// 引入表单组件
import { Formik, Field, Form } from 'formik';

const Basic = () => (
  <div>
    <h1>Sign Up</h1>
    <Formik
      // 设置每一个项的初始值
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      // 设置回调函数（点击提交按钮后）
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <label htmlFor="firstName">First Name</label>
        <Field id="firstName" name="firstName" placeholder="Jane" />

        <label htmlFor="lastName">Last Name</label>
        <Field id="lastName" name="lastName" placeholder="Doe" />

        <label htmlFor="email">Email</label>
        <Field id="email" name="email" placeholder="jane@acme.com" type="email"/>
        
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);

ReactDOM.render(<Basic />, document.getElementById('root'));
~~~

demo-02

~~~js
import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

const initialValues = {
  friends: [
    {
      name: '',
      email: '',
    },
  ],
};

const InviteFriends = () => (
  <div>
    <h1>Invite friends</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {/* 这里使用匿名函数，处理数组项 */}
      {({ values }) => (
        <Form>
          <FieldArray name="friends">
            {/* 这里三个函数，移除插入新的值 */}
            {({ insert, remove, push }) => (
              <div>
                {values.friends.length > 0 &&
                  values.friends.map((friend, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`friends.${index}.name`}>Name</label>
                        <Field
                          name={`friends.${index}.name`}
                          placeholder="Jane Doe"
                          type="text"
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <label htmlFor={`friends.${index}.email`}>Email</label>
                        <Field
                          name={`friends.${index}.email`}
                          placeholder="jane@acme.com"
                          type="email"
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ name: '', email: '' })}
                >
                  Add Friend
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Invite</button>
        </Form>
      )}
    </Formik>
  </div>
);

ReactDOM.render(<InviteFriends />, document.getElementById('root'));
~~~
