# 开课吧 01 React 组件化

2021-10

视频看到 41：04 后续视频教程没有看

这个课程需要有一定 React 基础（create-react-app）

## 高阶组件 HOC

高阶组件很麻烦，为什么使用呢？为了提高组件的复用性；

下面是HOC的常见写法

~~~jsx
function Child(props) {
  return <div>test</div>
}

// 高阶组件（参数是一个组件，返回值是一个组件）
const foo = Component => props => {
  return (
    <div>
      <Component {...props} />
    </div>
  );
}

const Foo = foo();

export default class HocPage extends React.Component {
  render() {
    return (
      <div>
        <Foo></Foo>
      </div>
    );
  }
}
~~~

在 ES7 中，可以简化：使用装饰器模式简化

~~~bash
npm install -D @babel/plugin-proposal-decorators
~~~

增加配置 config-overrides.js

~~~js
const { addDecoratorsLegacy } = require("customize-cra");

module.exports = override(
	...,
  addDecoratorsLegacy()
);
~~~

config-overrides.js 的全部配置如下：

~~~js
const { 
  override,
  fixBabelImports,
  addDecoratorsLegacy
} = require("customize-cra");

module.exports = override(
	fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  }),
  addDecoratorsLegacy()
);
~~~

在组件中

~~~jsx
@foo
class Child extends React.Component {
  render() {
    return <div>test</div>;
  }
}

@foo
@foo1
@foo2
class Child extends React.Component {
  render() {
    return <div>test</div>;
  }
}
// 这里表示使用多个高阶组件包裹两次的Child


// 高阶组件（参数是一个组件，返回值是一个组件）
const foo = Component => props => {
  return (
    <div>
      <Component {...props} />
    </div>
  );
}
~~~

HOC 注意事项：不要在render阶段使用HOC；

## 组件化（ant-design）

在 ant-design 中使用高阶组件优化代码

例如在表单提交时，传统的做法是给每一个表单项都绑定一个 state 和回调函数，然后提交时获取不同的state。如果表单项很多，这样的代码量会很多，不好维护。使用官方提供的高阶组件。

~~~jsx
import {Form, Imput, Icon, Button} from 'antd';

@Form.create({})
class FormPage extends Component {
  
  submit = () => {
    console.log('submit');
    console.log(this.props); // 高阶组件中传递的函数
    const { getFieldsValue, getFieldValue, validateFields } = this.props.form;
    getFieldsValue();
    getFieldValue('name');
    validateFields((err, values) => {
      if (err) {
        console.log(err);
      } else {
        console.log('success');
        // submit
      }
    });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form>
        <Form.Item>
          {getFieldDecorator('name', {rules: [nameRules]})(
            <Input placehoulder="please input name" />
          )}
        </Form.Item>
        <Form.Item>
        	<Input type="password" placehoulder="please input pwd" />
        </Form.Item>
      </Form>
    );
  }
}
~~~

具体的说明在 ant-design 中详细说明

getFieldDecorator 和表单进行双向绑定

getFieldsValue 获取全部表单的值

 getFieldValue 获取某个表单的值

validateFields 表单输入验证（正则）

未看：传送门实现